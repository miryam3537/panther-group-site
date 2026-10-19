-- Testimonials for the public page. Safe to run more than once.
-- Existing rows are kept. The six current recommendations are inserted only
-- when the table is empty.
--
-- If Authentication has exactly one user, leave the value below empty.
select set_config('panther.admin_uid', '', false);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  body text not null,
  rating int not null default 5 check (rating between 1 and 5),
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.testimonials (name, role, body, rating, display_order)
select *
from (
  values
    (
      'המכון למצוות התלויות בארץ',
      null::text,
      'נהנינו מאוד מהשירות, האיכות, הדייקנות של פנתר. החל משלב השליחה לדפוס ועד לתוצר המוגמר של הגליונות וכן של שאר הדפסות מודעות רחוב וכו''. יישר כח לר'' אריאל על השירות הנפלא!',
      5::int,
      1::int
    ),
    (
      'מרכז זרעים',
      null,
      'יש לציין שגם בזמני לחץ החברה שלכם עמדה להביא את המוצר האיכותי בזמן, ולאורך כל הדרך לתת ייעוץ ועזרה שהלקוח יקבל את המיטב. תודה לכם!',
      5,
      2
    ),
    (
      'שושנה עטיה',
      'איגוד עמלי תורה',
      'ברצוננו להמליץ על פנתר — שירות ואכפתיות לאורך כל הדרך. דאגה כאילו אנחנו הלקוחות היחידים. תודה על שירות נפלא ועל יחס אישי!!',
      5,
      3
    ),
    (
      'נחמה פרסום',
      null,
      'אנחנו מאד מרוצים מהעבודה המדויקת והאכפתית של דפוס פנתר. בכל פעם מחדש ביצעו את העבודה על הצד הטוב ביותר במקצועיות ובאדיבות. יישר כוח!',
      5,
      4
    ),
    (
      'שלמה',
      'מנהל MAYCAR השכרת רכבים',
      'ברצוננו להמליץ בחום על הטיפול המסור, המהיר והאדיב של חברת פנתר. רצינו להדגיש שהמחירים מאוד הוגנים. השתמשנו במספר שירותים שונים, ושמחנו מאוד לאורך כל הדרך.',
      5,
      5
    ),
    (
      'חברת חכמני 26 בע"מ',
      null,
      'אני ממליץ בחום על פנתר — קיבלתי שירות אישי מהיר ומקצועי, בנוסף למחיר ללא תחרות!! רוצו לקבל הצעת מחיר — לא תתחרטו!',
      5,
      6
    )
) as seed(name, role, body, rating, display_order)
where not exists (select 1 from public.testimonials);

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

  alter table public.testimonials enable row level security;
  revoke all on table public.testimonials from public, anon, authenticated;
  grant select on table public.testimonials to anon, authenticated;
  grant insert, update, delete on table public.testimonials to authenticated;

  drop policy if exists panther_testimonials_select on public.testimonials;
  drop policy if exists panther_testimonials_admin on public.testimonials;

  create policy panther_testimonials_select
    on public.testimonials
    for select
    to anon, authenticated
    using (true);

  execute format(
    'create policy panther_testimonials_admin on public.testimonials for all to authenticated using ((select auth.uid() = %L::uuid)) with check ((select auth.uid() = %L::uuid))',
    admin_uid,
    admin_uid
  );
end
$mig$;
