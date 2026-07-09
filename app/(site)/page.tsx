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


export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const { data: services } = await supabase
    .from("services")
    .select("slug, title, description")
    .order("sort_order");

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
      <section className="bg-background py-20 lg:py-28 overflow-hidden">
        <style>{`
          @keyframes galleryMarquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .gallery-track {
            animation: galleryMarquee 22s linear infinite;
          }
          .gallery-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <Container>
          <div className="flex items-end justify-between mb-10">
            <Link
              href="/gallery"
              className="text-sm font-medium text-accent transition-colors hover:underline"
              aria-label="לכל הגלריה"
            >
              לכל הגלריה &#8592;
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-accent">עבודות שביצענו</p>
              <h2 className="title-pulse title-pulse-d05 mt-1 text-3xl font-bold text-foreground sm:text-4xl">
                הגלריה שלנו
              </h2>
            </div>
          </div>
        </Container>

        {/* Full-width marquee strip — no side padding */}
        <div className="overflow-hidden w-full">
          <div className="gallery-track flex w-max">
            {[...galleryCategories, ...galleryCategories, ...galleryCategories, ...galleryCategories].map((cat, i) => (
              <Link
                key={`${cat.slug}-${i}`}
                href={`/gallery/${cat.slug}`}
                className="group relative h-56 w-80 shrink-0 overflow-hidden border-l border-border/40 bg-card last:border-r transition-opacity hover:opacity-90"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-card via-border/40 to-card" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-base font-bold text-white transition-colors group-hover:text-accent">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
