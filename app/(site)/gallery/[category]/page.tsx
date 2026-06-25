import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";

const categoryNames: Record<string, string> = {
  branding: "מיתוג ופרסום",
  promotions: 'הפקות וקד"מ',
  events: "הפקות אירועים",
  signage: "שילוט למוסדות",
  digital: "מדיה ודיגיטל",
  boards: "לוחות פרסום",
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

  // Placeholder grid — will be replaced with Supabase query
  const placeholderImages = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <>
      <section className="bg-black py-20 lg:py-28">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted" aria-label="breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">
              דף הבית
            </Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-accent transition-colors">
              גלריה
            </Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          <h1 className="text-right text-4xl font-black text-accent sm:text-5xl">
            {title}
          </h1>

          {/* Image grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderImages.map((n) => (
              <div
                key={n}
                className="aspect-video overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-muted">תמונה {n}</p>
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
