import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { CategoryGalleryGrid } from "@/components/ui/CategoryGalleryGrid";
import { ViewCounter } from "@/components/ui/ViewCounter";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { serviceSubcategories } from "@/lib/site";

const categoryNames: Record<string, string> = {
  branding:     "מיתוג ופרסום",
  promotions:   'הפקות וקד"מ',
  events:       "הפקות אירועים",
  print:        "דפוס",
  digital:      "מדיה ודיגיטל",
  signage:      "שילוט",
  distribution: "הפצה",
  posters:      "הדבקת מודעות",
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const subcats = serviceSubcategories[category] ?? [];
  const subTitle = subcats.find((s) => s.slug === subcategory)?.title ?? subcategory;
  const catTitle = categoryNames[category] ?? category;
  return { title: `גלריה — ${catTitle} / ${subTitle}` };
}

export default async function SubcategoryGalleryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  const subcats = serviceSubcategories[category] ?? [];
  const subTitle = subcats.find((s) => s.slug === subcategory)?.title ?? subcategory;
  const catTitle = categoryNames[category] ?? "גלריה";

  const supabase = await createServerSupabaseClient();

  const [{ data: serviceData }, { data: images }] = await Promise.all([
    supabase.from("services").select("image_url, description").eq("slug", category).single(),
    supabase
      .from("gallery_images")
      .select("id, url")
      .eq("category", category)
      .eq("subcategory", subcategory)
      .order("display_order", { ascending: true }),
  ]);

  const heroImageUrl = serviceData?.image_url ?? null;
  const imgs = images ?? [];

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-zinc-950">
        {heroImageUrl && (
          <Image src={heroImageUrl} alt={catTitle} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 px-6 pt-7 lg:px-12">
          <div className="flex items-center justify-between">
            <Link
              href={`/gallery/${category}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md transition-all hover:border-accent/60 hover:text-accent sm:px-5 sm:py-2.5"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              חזרה ל{catTitle}
            </Link>
            <nav className="hidden items-center gap-2 text-xs text-white/30 sm:flex" aria-label="breadcrumb" dir="rtl">
              <Link href="/" className="transition-colors hover:text-white/60">דף הבית</Link>
              <span>/</span>
              <Link href="/gallery" className="transition-colors hover:text-white/60">גלריה</Link>
              <span>/</span>
              <Link href={`/gallery/${category}`} className="transition-colors hover:text-white/60">{catTitle}</Link>
              <span>/</span>
              <span className="text-white/60">{subTitle}</span>
            </nav>
          </div>
        </div>

        {/* Title block */}
        <div className="absolute inset-x-0 bottom-12 px-6 lg:px-12" dir="rtl">
          <Container>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-10 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{catTitle}</p>
            </div>
            <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl lg:text-6xl">{subTitle}</h1>
          </Container>
        </div>
      </section>

      {/* ── Gallery grid ── */}
      <section id="gallery" className="bg-[#080808] pb-24 pt-10">
        <Container>
          <div className="mb-8 flex items-center justify-between" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 rounded-full bg-accent" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">עבודות נבחרות</h2>
            </div>
            <div className="flex items-center gap-2">
              {imgs.length > 0 && (
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/30">
                  {imgs.length} פרויקטים
                </span>
              )}
              <ViewCounter id={`${category}-${subcategory}`} />
            </div>
          </div>

          {imgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] py-28 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <svg className="h-6 w-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-sm text-white/25">אין תמונות בתת-מחלקה זו עדיין</p>
            </div>
          ) : (
            <CategoryGalleryGrid images={imgs} isBranding={false} />
          )}

          {/* CTA */}
          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-8 py-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent/70">מעוניינים בפרויקט דומה?</p>
            <p className="text-xl font-black text-white">בואו נדבר על הפרויקט שלכם</p>
            <Link
              href="/contact"
              className="btn-cta mt-2 inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
            >
              להצעת מחיר «
            </Link>
          </div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
