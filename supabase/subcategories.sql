-- תתי מחלקות: שם ותמונת רקע. אפשר להריץ יותר מפעם אחת.
-- שמות ותמונות שכבר נשמרו לא נדרסים. הקישור (slug) נשאר קבוע.
--
-- If Authentication has exactly one user, leave the value below empty.
select set_config('panther.admin_uid', '', false);

create table if not exists public.service_subcategories (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  slug text not null,
  title text not null,
  image_url text,
  sort_order int not null default 0,
  unique (service_slug, slug)
);

insert into public.service_subcategories (service_slug, slug, title, sort_order)
select *
from (
  values
    ('branding', 'branding-business', 'מיתוג לעסקים', 1),
    ('branding', 'branding-institutions', 'מיתוג למוסדות', 2),
    ('promotions', 'gifts', 'מתנות', 1),
    ('print', 'stationery', 'ניירת', 1),
    ('print', 'books', 'ספרים וחוברות', 2),
    ('print', 'silk', 'משי', 3),
    ('print', 'sublimation', 'סובלימציה', 4),
    ('print', 'embroidery', 'רקמה', 5),
    ('digital', 'landing-pages', 'דפי נחיתה', 1),
    ('digital', 'websites', 'אתרים', 2),
    ('digital', 'animated-banners', 'באנרים מונפשים', 3),
    ('signage', 'signage-business', 'עסקים', 1),
    ('signage', 'signage-institutions', 'מוסדות', 2),
    ('signage', 'synagogues', 'בתי כנסת', 3),
    ('distribution', 'mailbox', 'הפצה תיבות דואר', 1),
    ('distribution', 'door-hangers', 'הפצת תלי דלת', 2),
    ('posters', 'synagogue-boards', 'לוחות פרסום בבית כנסת', 1),
    ('posters', 'building-boards', 'לוחות בבניינים', 2),
    ('posters', 'urban-boards', 'לוחות במרחב העירוני', 3)
) as seed(service_slug, slug, title, sort_order)
on conflict (service_slug, slug) do nothing;

do $mig$
declare
  admin_uid uuid;
  user_count int;
  override text := btrim(coalesce(current_setting('panther.admin_uid', true), ''));
begin
  if override <> '' then
    if override !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      raise exception 'panther.admin_uid is not a valid UUID. Paste NEXT_PUBLIC_ADMIN_UID.';
    end if;
    admin_uid := override::uuid;
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

  alter table public.service_subcategories enable row level security;
  revoke all on table public.service_subcategories from public, anon, authenticated;
  grant select on table public.service_subcategories to anon, authenticated;
  grant insert, update, delete on table public.service_subcategories to authenticated;

  drop policy if exists panther_subcategories_select on public.service_subcategories;
  drop policy if exists panther_subcategories_admin on public.service_subcategories;

  create policy panther_subcategories_select
    on public.service_subcategories
    for select
    to anon, authenticated
    using (true);

  execute format(
    'create policy panther_subcategories_admin on public.service_subcategories for all to authenticated using ((select auth.uid() = %L::uuid)) with check ((select auth.uid() = %L::uuid))',
    admin_uid,
    admin_uid
  );
end
$mig$;
