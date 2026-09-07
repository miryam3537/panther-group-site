import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Card3D } from "@/components/ui/Card3D";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "גלריה" };

const CATEGORIES = [
  { slug: "branding",     title: "מיתוג ופרסום" },
  { slug: "promotions",   title: 'הפקות וקד"מ' },
  { slug: "events",       title: "הפקות אירועים" },
  { slug: "print",        title: "דפוס" },
  { slug: "digital",      title: "מדיה ודיגיטל" },
  { slug: "signage",      title: "שילוט" },
  { slug: "distribution", title: "הפצה" },
  { slug: "posters",      title: "הדבקת מודעות" },
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
      <section className="relative bg-[#080808] py-20 lg:py-28 overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Container>
          {/* Header */}
          <div className="text-right" dir="rtl">
            <div className="flex items-center gap-3 justify-end">
              <h1 className="text-4xl font-black text-white sm:text-5xl">
                לא צריך מילים —{" "}
                <span className="text-accent">הגלריה הנבחרת!</span>
              </h1>
              <div className="h-[2px] w-10 rounded-full bg-accent hidden sm:block" />
            </div>
            <p className="mt-3 text-white/40 text-sm">
              תוצאות אמיתיות מעבודות שביצענו ללקוחותינו
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryData.map((cat, idx) => (
              <Card3D key={cat.slug}>
              <Link
                href={`/gallery/${cat.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-zinc-900 transition-[border-color] duration-300 hover:border-accent/50"
              >
                {/* Background image or empty state */}
                {cat.coverUrl ? (
                  <Image
                    src={cat.coverUrl}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx < 3}
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                ) : (
                  <>
                    {/* Colorful empty state with shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent" />
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="shimmer-slide absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[5rem] font-black text-white/[0.06] select-none leading-none">
                        {cat.title.charAt(0)}
                      </span>
                    </div>
                  </>
                )}

                {/* Gradient overlay — light, lets image breathe */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Hover color wash */}
                <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/8" />

                {/* Top-right number badge */}
                <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <span className="text-[10px] font-bold tabular-nums text-white/50">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <h2 className="text-lg font-black text-white transition-colors duration-300 group-hover:text-accent leading-tight">
                      {cat.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-white/40">
                      {cat.count > 0 ? `${cat.count} תמונות` : "בקרוב"}
                    </p>
                  </div>

                  {/* Arrow icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent/20">
                    <svg className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Accent bottom border glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              </Card3D>
            ))}
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
