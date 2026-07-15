import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/sections/Hero";
import { CategoryNavBar } from "@/components/sections/CategoryNavBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhyPantherCards } from "@/components/sections/WhyPantherCards";
import { AutoScroll } from "@/components/ui/AutoScroll";
import { GalleryCycler } from "@/components/ui/GalleryCycler";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/* ── Placeholder data (will be replaced by Supabase queries) ── */

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
      <section className="relative overflow-hidden bg-zinc-950 py-16 lg:py-24">
        {/* Ambient orange glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,90,0,0.06),transparent)]" />

        <Container>
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent/70">
              עבודות שביצענו
            </p>
            <h2 className="title-pulse text-4xl font-black text-white sm:text-5xl">
              הגלריה שלנו
            </h2>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              כל פרויקט הוא סיפור — של מותג, של אירוע, של רגע שנשאר.
            </p>
          </div>

          {/* Grid of fixed slots — images cycle every second */}
          <GalleryCycler images={galleryImages ?? []} />

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent"
            >
              לצפייה בכל הפרויקטים
              <span className="transition-transform group-hover:-translate-x-1">←</span>
            </Link>
          </div>
        </Container>
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
