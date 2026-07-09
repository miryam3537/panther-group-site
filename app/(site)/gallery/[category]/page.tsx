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

/* Layout pattern repeats every 5 items — creates visual rhythm */
function getItemClass(index: number): string {
  const pos = index % 5;
  if (pos === 0) return "col-span-2 row-span-2";
  if (pos === 3) return "col-span-2";
  return "";
}

function getAspectClass(index: number): string {
  const pos = index % 5;
  if (pos === 0) return "aspect-square";
  if (pos === 3) return "aspect-[16/7]";
  return "aspect-[4/3]";
}

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

      {/* ── Editorial masonry grid ── */}
      <section className="bg-black pb-24 pt-2">
        <Container>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {placeholderImages.map((n, i) => (
              <div
                key={n}
                className={`group relative overflow-hidden rounded-xl bg-zinc-900 ${getItemClass(i)} ${getAspectClass(i)}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at ${i % 2 === 0 ? "top right" : "bottom left"}, hsl(30,70%,25%) 0%, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/8" />
                <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-semibold text-white/80">תמונה {n}</p>
                </div>
                <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
