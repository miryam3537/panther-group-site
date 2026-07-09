import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "גלריה" };

const CATEGORIES = [
  { slug: "branding", title: "מיתוג ופרסום" },
  { slug: "promotions", title: 'הפקות וקד"מ' },
  { slug: "events", title: "הפקות אירועים" },
  { slug: "signage", title: "שילוט למוסדות" },
  { slug: "digital", title: "מדיה ודיגיטל" },
  { slug: "boards", title: "לוחות פרסום" },
];

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch first image + count per category
  const categoryData = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const { data, count } = await supabase
        .from("gallery_images")
        .select("url", { count: "exact" })
        .eq("category", cat.slug)
        .order("display_order", { ascending: true })
        .limit(1);

      return {
        ...cat,
        coverUrl: data?.[0]?.url ?? null,
        count: count ?? 0,
      };
    })
  );

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
            {categoryData.map((cat) => (
              <Link
                key={cat.slug}
                href={`/gallery/${cat.slug}`}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/60"
              >
                {cat.coverUrl ? (
                  <Image
                    src={cat.coverUrl}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-card via-border/30 to-black" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-accent/0 transition-all group-hover:bg-accent/10" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="text-lg font-bold text-white transition-colors group-hover:text-accent">
                    {cat.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-white/50">
                    {cat.count > 0 ? `${cat.count} תמונות` : "בקרוב"}
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
