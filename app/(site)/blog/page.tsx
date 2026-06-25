import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "בלוג" };

// Placeholder posts — will be replaced with Supabase query
const posts = [
  {
    slug: "branding-tips",
    title: "5 טיפים לשיפור מיתוג העסק שלך",
    excerpt:
      "מיתוג חזק הוא הבסיס לכל עסק מצליח. הנה 5 כלים פרקטיים שיעזרו לך לבנות זהות מותג בלתי נשכחת.",
    date: "15 בינואר 2026",
  },
  {
    slug: "events-digital-age",
    title: "הפקת אירועים בעידן הדיגיטל",
    excerpt:
      "כיצד שילוב כלים דיגיטליים בהפקת אירועים יכול להגדיל את החשיפה ולשפר את חוויית המשתתפים.",
    date: "8 בינואר 2026",
  },
  {
    slug: "outdoor-advertising-2026",
    title: "למה לוחות פרסום עדיין עובדים ב-2026",
    excerpt:
      "בעולם הדיגיטלי, פרסום חוצות נשאר אחד האמצעים האפקטיביים ביותר להגעה לקהל מקומי.",
    date: "2 בינואר 2026",
  },
  {
    slug: "signage-institutions",
    title: "שילוט חכם — איך לבחור שלט לעסק שלך",
    excerpt:
      "שלט טוב הוא הפנים של העסק. מדריך מקיף לבחירת שילוט שמושך לקוחות ומשדר מקצועיות.",
    date: "20 בדצמבר 2025",
  },
  {
    slug: "social-media-tips",
    title: "ניהול רשתות חברתיות — מה עובד ב-2026",
    excerpt:
      "אלגוריתמים משתנים, הרגלי הצריכה משתנים — אבל יש כמה עקרונות שתמיד עובדים. הנה מה שחשוב.",
    date: "12 בדצמבר 2025",
  },
  {
    slug: "event-production-checklist",
    title: "צ'קליסט הפקת אירועים — 30 דברים לא לשכוח",
    excerpt:
      "מרשימת קולות ועד תיאום לוגיסטי — הצ'קליסט המלא שיבטיח שהאירוע שלך יצא מושלם.",
    date: "5 בדצמבר 2025",
  },
];

export default function BlogPage() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <div className="text-right">
          <p className="text-sm font-medium text-accent">הידע שלנו, בחינם</p>
          <h1 className="mt-2 text-4xl font-black text-foreground sm:text-5xl">
            הבלוג
          </h1>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50"
            >
              {/* Cover placeholder */}
              <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-border/40" />

              <time className="text-xs text-muted">{post.date}</time>
              <h2 className="mt-2 text-right text-base font-bold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-right text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex self-end text-sm font-medium text-accent hover:underline"
              >
                קרא עוד &#8592;
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
