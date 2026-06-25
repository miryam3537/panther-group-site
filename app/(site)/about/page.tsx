import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "אודות" };

const stats = [
  { value: "10+", label: "שנות ניסיון" },
  { value: "500+", label: "פרויקטים שהושלמו" },
  { value: "200+", label: "לקוחות מרוצים" },
  { value: "6", label: "תחומי התמחות" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text — RIGHT in RTL */}
            <div className="text-right">
              <p className="text-sm font-medium text-accent">הסיפור שלנו</p>
              <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
                אנחנו <span className="text-accent">פנתר</span>
              </h1>
              <p className="mt-5 leading-relaxed text-muted">
                פנתר פרסום נוסדה מתוך אמונה אחת פשוטה: כל עסק — קטן או גדול —
                ראוי לשיווק ופרסום ברמה הגבוהה ביותר. אנחנו מביאים מומחיות,
                יצירתיות ותוצאות מדידות לכל לקוח.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                עם ניסיון של מעל עשור בתחום, ביצענו מאות פרויקטים לעסקים
                מכל הסקטורים — ממסעדות ועד מוסדות חינוך, מחברות הייטק ועד
                עסקים משפחתיים.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
              >
                צרו קשר &#171;&#171;
              </Link>
            </div>

            {/* Image — LEFT in RTL */}
            <div className="aspect-video overflow-hidden rounded-3xl border border-border bg-card flex items-center justify-center">
              <p className="text-xs text-muted">תמונת צוות (placeholder)</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-accent py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-background py-20 lg:py-28">
        <Container>
          <h2 className="text-right text-3xl font-black text-foreground sm:text-4xl">
            הערכים <span className="text-accent">שלנו</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "מקצועיות ללא פשרות",
                text: "כל פרויקט מקבל את מלוא תשומת הלב והמומחיות שלנו, ללא קשר לגודלו.",
              },
              {
                title: "שקיפות מלאה",
                text: "מחיר ברור, לוחות זמנים מוגדרים, ותקשורת פתוחה לאורך כל הדרך.",
              },
              {
                title: "תוצאות מדידות",
                text: "אנחנו לא מוכרים חלומות — אנחנו מתחייבים לתוצאות שאפשר למדוד ולראות.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-7 text-right"
              >
                <h3 className="text-lg font-black text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
