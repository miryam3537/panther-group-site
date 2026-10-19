-- Panther agency — enable Row Level Security
-- Run once in Supabase: SQL Editor → New query → paste → Run.
--
-- If Authentication has exactly one user, leave the value below empty.
-- If there are several users, paste NEXT_PUBLIC_ADMIN_UID from .env.local.
select set_config('panther.admin_uid', '', false);

-- ---------------------------------------------------------------------------
-- Admin check + RLS policies
-- ---------------------------------------------------------------------------
do $mig$
declare
  admin_uid uuid;
  user_count int;
  override text := btrim(coalesce(current_setting('panther.admin_uid', true), ''));
  tbl text;
  pol text;
begin
  if override <> '' then
    if override !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      raise exception 'panther.admin_uid is not a valid UUID. Paste NEXT_PUBLIC_ADMIN_UID.';
    end if;
    admin_uid := override::uuid;
    if not exists (select 1 from auth.users where id = admin_uid) then
      raise exception 'No Auth user with this id. Check NEXT_PUBLIC_ADMIN_UID.';
    end if;
  else
    select count(*) into user_count from auth.users;
    if user_count = 0 then
      raise exception 'No users in Authentication. Create the admin user, then run this script again.';
    elsif user_count > 1 then
      raise exception 'More than one Auth user. Paste NEXT_PUBLIC_ADMIN_UID into set_config at the top, then run again.';
    else
      select id into admin_uid from auth.users;
    end if;
  end if;

  -- Public site content: anyone may read, only the admin may write.
  foreach tbl in array array['services', 'gallery_images', 'client_logos', 'testimonials']
  loop
    if to_regclass('public.' || tbl) is null then
      raise notice 'Skipping missing table %', tbl;
      continue;
    end if;

    execute format('alter table public.%I enable row level security', tbl);
    execute format('revoke all on table public.%I from public, anon, authenticated', tbl);
    execute format('grant select on table public.%I to anon, authenticated', tbl);
    execute format('grant insert, update, delete on table public.%I to authenticated', tbl);

    for pol in
      select policyname
      from pg_policies
      where schemaname = 'public'
        and tablename = tbl
        and policyname not like 'panther_%'
    loop
      execute format('drop policy %I on public.%I', pol, tbl);
    end loop;

    execute format('drop policy if exists %I on public.%I', 'panther_' || tbl || '_select', tbl);
    execute format('drop policy if exists %I on public.%I', 'panther_' || tbl || '_admin', tbl);

    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      'panther_' || tbl || '_select',
      tbl
    );
    execute format(
      'create policy %I on public.%I for all to authenticated using ((select auth.uid() = %L::uuid)) with check ((select auth.uid() = %L::uuid))',
      'panther_' || tbl || '_admin',
      tbl,
      admin_uid,
      admin_uid
    );
  end loop;

  -- Leads hold names and phone numbers. Visitors may only submit a row.
  -- They cannot read, edit, or delete. Only the admin can.
  if to_regclass('public.leads') is not null then
    alter table public.leads enable row level security;
    revoke all on table public.leads from public, anon, authenticated;
    grant insert (name, phone, email, message) on table public.leads to anon;
    grant select, insert, update, delete on table public.leads to authenticated;

    for pol in
      select policyname
      from pg_policies
      where schemaname = 'public'
        and tablename = 'leads'
        and policyname not like 'panther_%'
    loop
      execute format('drop policy %I on public.leads', pol);
    end loop;

    drop policy if exists panther_leads_insert on public.leads;
    drop policy if exists panther_leads_admin on public.leads;

    create policy panther_leads_insert
      on public.leads
      for insert
      to anon
      with check (
        char_length(name) between 1 and 200
        and char_length(phone) between 1 and 40
        and (email is null or char_length(email) <= 320)
        and (message is null or char_length(message) <= 5000)
      );

    execute format(
      'create policy panther_leads_admin on public.leads for all to authenticated using ((select auth.uid() = %L::uuid)) with check ((select auth.uid() = %L::uuid))',
      admin_uid,
      admin_uid
    );
  else
    raise notice 'Skipping missing table leads';
  end if;

  -- Any other table in public stays closed to the API until it has its own policy.
  for tbl in
    select c.relname
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and c.relrowsecurity = false
  loop
    execute format('alter table public.%I enable row level security', tbl);
    execute format('revoke all on table public.%I from public, anon, authenticated', tbl);
    raise notice 'Locked extra public table (no API access): %', tbl;
  end loop;

  -- Storage: visitors open images by their public link.
  -- They cannot list every file in a bucket. Only the admin can upload or delete.
  if to_regclass('storage.objects') is not null then
    for pol in
      select distinct p.policyname
      from pg_policies p
      join storage.buckets b on b.public
      where p.schemaname = 'storage'
        and p.tablename = 'objects'
        and p.cmd = 'SELECT'
        and (
          coalesce(p.qual, 'true') in ('true', '(true)')
          or coalesce(p.qual, '') ~* b.name
        )
    loop
      execute format('drop policy if exists %I on storage.objects', pol);
    end loop;

    drop policy if exists panther_storage_public_read on storage.objects;
    drop policy if exists panther_storage_admin_insert on storage.objects;
    drop policy if exists panther_storage_admin_update on storage.objects;
    drop policy if exists panther_storage_admin_delete on storage.objects;

    execute format(
      'create policy panther_storage_admin_insert on storage.objects for insert to authenticated with check (bucket_id in (''gallery'', ''client-logos'') and (select auth.uid() = %L::uuid))',
      admin_uid
    );
    execute format(
      'create policy panther_storage_admin_update on storage.objects for update to authenticated using (bucket_id in (''gallery'', ''client-logos'') and (select auth.uid() = %L::uuid)) with check (bucket_id in (''gallery'', ''client-logos'') and (select auth.uid() = %L::uuid))',
      admin_uid,
      admin_uid
    );
    execute format(
      'create policy panther_storage_admin_delete on storage.objects for delete to authenticated using (bucket_id in (''gallery'', ''client-logos'') and (select auth.uid() = %L::uuid))',
      admin_uid
    );
  end if;

  drop function if exists public.is_panther_admin();

  for pol in
    select p.oid::regprocedure as func
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'rls_auto_enable'
  loop
    execute format('revoke all on function %s from public, anon, authenticated', pol);
  end loop;

  raise notice 'RLS is on. Admin user: %', admin_uid;
end
$mig$;

-- Confirm: this query must return zero rows.
select c.relname as table_without_rls
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind = 'r'
  and c.relrowsecurity = false;

-- Policies that are now active.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
