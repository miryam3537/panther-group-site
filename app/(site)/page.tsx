import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/sections/Hero";
import { CategoryNavBar } from "@/components/sections/CategoryNavBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhyPantherCards } from "@/components/sections/WhyPantherCards";
import { AutoScroll } from "@/components/ui/AutoScroll";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/* ── Placeholder data (will be replaced by Supabase queries) ── */

const galleryCategories = [
  { title: "מיתוג ופרסום", slug: "branding" },
  { title: 'הפקות וקד"מ', slug: "promotions" },
  { title: "הפקות אירועים", slug: "events" },
];

const blogPosts = [
  {
    id: 1,
    title: "5 טיפים לשיפור מיתוג העסק שלך",
    excerpt:
      "מיתוג חזק הוא הבסיס לכל עסק מצליח. הנה 5 כלים פרקטיים שיעזרו לך לבנות זהות מותג בלתי נשכחת.",
    date: "15 בינואר 2026",
    slug: "branding-tips",
  },
  {
    id: 2,
    title: "הפקת אירועים בעידן הדיגיטל",
    excerpt:
      "כיצד שילוב כלים דיגיטליים בהפקת אירועים יכול להגדיל את החשיפה ולשפר את חוויית המשתתפים.",
    date: "8 בינואר 2026",
    slug: "events-digital-age",
  },
  {
    id: 3,
    title: "למה לוחות פרסום עדיין עובדים ב-2026",
    excerpt:
      "בעולם הדיגיטלי, פרסום חוצות נשאר אחד האמצעים האפקטיביים ביותר להגעה לקהל מקומי.",
    date: "2 בינואר 2026",
    slug: "outdoor-advertising-2026",
  },
];


type GalleryImg = { id: string; url: string; category: string };

function GalleryCard({ img }: { img: GalleryImg }) {
  return (
    <Link
      href={`/gallery/${img.category}`}
      className="group relative mx-px h-60 w-60 shrink-0 overflow-hidden ring-1 ring-white/5 transition-all duration-300 hover:ring-accent/50 hover:scale-[1.03]"
    >
      <img
        src={img.url}
        alt={CATEGORY_LABELS[img.category] ?? img.category}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-3">
        <span className="rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30">
          {CATEGORY_LABELS[img.category] ?? img.category}
        </span>
      </div>
    </Link>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  branding: "מיתוג ופרסום",
  promotions: 'הפקות וקד"מ',
  events: "הפקות אירועים",
  signage: "שילוט למוסדות",
  digital: "מדיה ודיגיטל",
  boards: "לוחות פרסום",
};

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const [{ data: services }, { data: galleryImages }] = await Promise.all([
    supabase.from("services").select("slug, title, description").order("sort_order"),
    supabase.from("gallery_images").select("id, url, category").limit(60),
  ]);

  return (
    <>
      <AutoScroll />

      {/* ────────────── 1. Hero ────────────── */}
      <Hero />

      {/* ────────────── 1b. Category Nav ────────────── */}
      <CategoryNavBar services={services ?? []} />

      {/* ────────────── 2. Why Panther ────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <h2 className="title-pulse w-full text-center text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
            למה עסקים בוחרים{" "}
            <span className="text-accent">פנתר?</span>
          </h2>

          <div className="mt-10 flex justify-center">
            <Link
              href="/methodology"
              className="pulse-glow inline-flex items-center rounded-2xl bg-accent px-10 py-5 text-lg font-black text-white shadow-xl shadow-accent/40 transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 sm:px-14 sm:py-6 sm:text-xl"
            >
              רוצים לזנק? הכירו את השיטה של פנתר &#187;&#187;
            </Link>
          </div>

          <WhyPantherCards />
        </Container>
      </section>

      {/* ────────────── 3. Services ────────────── */}
      <ServicesPreview />

      {/* ────────────── 4. Gallery Preview ────────────── */}
      <section className="relative bg-zinc-950 py-20 lg:py-28 overflow-hidden">
        {/* Faint logo watermark */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-[0.04]"
          style={{ backgroundImage: "url('https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png')" }}
        />
        <style>{`
          @keyframes marqueeL {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeR {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .track-left  { animation: marqueeL 22s linear infinite; will-change: transform; }
          .track-right { animation: marqueeR 26s linear infinite; will-change: transform; }
          .track-left:hover, .track-right:hover { animation-play-state: paused; }
        `}</style>

        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,90,0,0.07),transparent)]" />

        <Container>
          <div className="flex items-end justify-between mb-12">
            <Link
              href="/gallery"
              className="group flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-3"
              aria-label="לכל הגלריה"
            >
              לכל הגלריה
              <span className="transition-transform group-hover:-translate-x-1">&#8592;</span>
            </Link>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent/80">עבודות שביצענו</p>
              <h2 className="title-pulse title-pulse-d05 mt-1 text-3xl font-black text-white sm:text-4xl">
                הגלריה שלנו
              </h2>
            </div>
          </div>
        </Container>

        {galleryImages && galleryImages.length > 0 ? (() => {
          const mid = Math.ceil(galleryImages.length / 2);
          const row1 = galleryImages.slice(0, mid);
          const row2 = galleryImages.slice(mid);
          const safeRow2 = row2.length > 0 ? row2 : row1;
          return (
            <div className="flex flex-col gap-px">
              {/* Row 1 — left */}
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-zinc-950 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
                <div className="flex w-max track-left">
                  {[...row1, ...row1].map((img, i) => (
                    <GalleryCard key={`r1-${img.id}-${i}`} img={img} />
                  ))}
                </div>
              </div>
              {/* Row 2 — right (opposite direction) */}
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-zinc-950 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
                <div className="flex w-max track-right">
                  {[...safeRow2, ...safeRow2].map((img, i) => (
                    <GalleryCard key={`r2-${img.id}-${i}`} img={img} />
                  ))}
                </div>
              </div>
            </div>
          );
        })() : (
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-zinc-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
            <div className="flex w-max track-left">
              {[...Array(6)].flatMap(() => galleryCategories).map((cat, i) => (
                <Link
                  key={`${cat.slug}-${i}`}
                  href={`/gallery/${cat.slug}`}
                  className="group relative mx-px h-56 w-72 shrink-0 overflow-hidden bg-zinc-900 ring-1 ring-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">{cat.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ────────────── 5. Blog Preview ────────────── */}
      <section className="border-t border-border bg-background py-20 lg:py-28">
        <Container>
          <div className="flex items-end justify-between">
            <Link
              href="/blog"
              className="text-sm font-medium text-accent transition-colors hover:underline"
              aria-label="לכל המאמרים"
            >
              לכל המאמרים &#8592;
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-accent">מהבלוג שלנו</p>
              <h2 className="title-pulse title-pulse-d10 mt-1 text-3xl font-bold text-foreground sm:text-4xl">
                מאמרים אחרונים
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50"
              >
                <time
                  dateTime={post.date}
                  className="text-xs text-muted"
                >
                  {post.date}
                </time>
                <h3 className="mt-3 text-base font-bold text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-accent hover:underline"
                >
                  קרא עוד &#8592;
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ────────────── 6. Contact Form ────────────── */}
      <ContactForm />
    </>
  );
}
