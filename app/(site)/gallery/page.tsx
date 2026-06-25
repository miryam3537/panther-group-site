import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "גלריה" };

const categories = [
  { slug: "branding", title: "מיתוג ופרסום", count: 12 },
  { slug: "promotions", title: 'הפקות וקד"מ', count: 18 },
  { slug: "events", title: "הפקות אירועים", count: 24 },
  { slug: "signage", title: "שילוט למוסדות", count: 9 },
  { slug: "digital", title: "מדיה ודיגיטל", count: 15 },
  { slug: "boards", title: "לוחות פרסום", count: 11 },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-black py-20 lg:py-28">
        <Container>
          <div className="text-right">
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              לא צריך מילים —{" "}
              <span className="text-accent">הגלריה הנבחרת!</span>
            </h1>
            <p className="mt-3 text-muted">
              תוצאות אמיתיות מעבודות שביצענו ללקוחותינו
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/gallery/${cat.slug}`}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/60"
              >
                {/* Placeholder — replaced with next/image */}
                <div className="absolute inset-0 bg-gradient-to-br from-card via-border/30 to-black" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/0 transition-all group-hover:bg-accent/10" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="text-lg font-bold text-white transition-colors group-hover:text-accent">
                    {cat.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-white/50">
                    {cat.count} תמונות
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
