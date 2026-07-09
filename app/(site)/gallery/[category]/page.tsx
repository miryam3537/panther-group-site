import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";

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

  const supabase = await createServerSupabaseClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("id, url")
    .eq("category", category)
    .order("display_order", { ascending: true });

  const imgs = images ?? [];

  return (
    <>
      {/* ── Hero header ── */}
      <section className="relative overflow-hidden bg-black py-16 lg:py-24">
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
          {imgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-white/3 py-24 text-center">
              <p className="text-sm text-white/30">אין תמונות בקטגוריה זו עדיין</p>
            </div>
          ) : (
            <>
              {/* תמונה ראשית — רוחב מלא */}
              <div className="group relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={imgs[0].url}
                  alt={title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* שורת תמונות קטנות */}
              {imgs.length > 1 && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {imgs.slice(1).map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900"
                    >
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-accent/10" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
