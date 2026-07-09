import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

const categoryNames: Record<string, string> = {
  branding: "מחלקת מיתוג ופרסום",
  promotions: 'מחלקת הפקות וקד"מ',
  events: "מחלקת הפקות אירועים",
  signage: "מחלקת שילוט למוסדות",
  digital: "מחלקת מדיה ודיגיטל",
  boards: "מחלקת לוחות פרסום",
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return { title: categoryNames[category] ?? "גלריה" };
}

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const title = categoryNames[category] ?? "גלריה";

  const placeholderImages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      {/* ── Hero header ── */}
      <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <Container>
          <nav
            className="mb-8 flex items-center gap-2 text-xs text-muted"
            aria-label="breadcrumb"
            dir="rtl"
          >
            <Link href="/" className="transition-colors hover:text-accent">דף הבית</Link>
            <span className="text-border">/</span>
            <Link href="/gallery" className="transition-colors hover:text-accent">גלריה</Link>
            <span className="text-border">/</span>
            <span className="text-white/60">{title}</span>
          </nav>

          <div className="flex items-end justify-between gap-4" dir="rtl">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">גלריה</p>
              <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl lg:text-6xl">{title}</h1>
            </div>
            <Link
              href="/gallery"
              className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent"
            >
              ← חזרה לגלריה
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Gallery grid ── */}
      <section className="bg-black pb-24 pt-2">
        <Container>
          {/* תמונה ראשית — רוחב מלא */}
          <div className="group relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-zinc-900">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: "radial-gradient(ellipse at top right, hsl(30,70%,25%) 0%, transparent 65%), linear-gradient(135deg, #1c1c1c, #0a0a0a)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-sm font-semibold text-white/70">תמונה 1</p>
            </div>
          </div>

          {/* שורת תמונות קטנות */}
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {placeholderImages.slice(1).map((n, i) => (
              <div
                key={n}
                className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at ${i % 2 === 0 ? "top right" : "bottom left"}, hsl(30,70%,20%) 0%, transparent 70%), linear-gradient(135deg, #1c1c1c, #0a0a0a)`,
                  }}
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-accent/10" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold text-white/80">תמונה {n}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
