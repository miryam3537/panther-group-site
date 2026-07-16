import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata: Metadata = { title: "שירותים" };

type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

export default async function ServicesPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  // Fallback to static data if DB fails
  const servicesData: Service[] = error || !data?.length
    ? [
        { id: "1", slug: "branding",   title: "מיתוג ופרסום",   description: "בניית זהות מותג חדה ומיצוב שמבדיל אתכם מהמתחרים.", image_url: null, sort_order: 1 },
        { id: "2", slug: "promotions", title: 'הפקות וקד"מ',    description: 'הפקות קד"מ שיוצרות buzz — חוויות מותג בלתי נשכחות.', image_url: null, sort_order: 2 },
        { id: "3", slug: "events",     title: "הפקות אירועים",  description: "מכנסים, ימי גיבוש, טקסים וכנסים — מהתחלה ועד הסוף.", image_url: null, sort_order: 3 },
        { id: "4", slug: "signage",    title: "שילוט למוסדות",  description: "שילוט פנימי וחיצוני — עיצוב, ייצור והתקנה.", image_url: null, sort_order: 4 },
        { id: "5", slug: "digital",    title: "מדיה ודיגיטל",   description: "ניהול רשתות חברתיות, קמפיינים ממומנים ושיווק תוכן.", image_url: null, sort_order: 5 },
        { id: "6", slug: "boards",     title: "לוחות פרסום",    description: "עיצוב וייצור לוחות פרסום, שלטי חוצות ובאנרים.", image_url: null, sort_order: 6 },
      ]
    : data;

  return (
    <>
      {/* ── Page header ── */}
      <section className="relative overflow-hidden bg-black py-20 text-right lg:py-28">
        <div className="pointer-events-none absolute -top-32 left-0 h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl" />
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent/80">
            מה שאנחנו עושים
          </p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            כל השירותים{" "}
            <span className="text-accent">במקום אחד</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            פנתר מציעה מגוון שירותי פרסום ושיווק — מהתכנון ועד הביצוע, הכל
            תחת קורת גג אחת.
          </p>
        </Container>
      </section>

      {/* ── Service sections ── */}
      {servicesData.map((service, index) => {
        const isDark = index % 2 === 0;
        const isReversed = index % 2 !== 0;
        const num = String(index + 1).padStart(2, "0");

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`border-t ${isDark ? "border-white/5 bg-black" : "border-black/5 bg-white"}`}
          >
            <Container>
              <div
                className={`grid items-center gap-8 py-16 lg:grid-cols-5 lg:gap-12 lg:py-24 ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* ── Image — 3 of 5 columns ── */}
                <div className={`lg:col-span-3 ${isReversed ? "lg:col-start-3" : ""}`}>
                  <div className={`group relative aspect-video w-full overflow-hidden rounded-2xl ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}>
                    {service.image_url ? (
                      <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0"
                          style={isDark ? {
                            backgroundImage: `radial-gradient(ellipse at ${isReversed ? "bottom left" : "top right"}, hsl(30,65%,22%) 0%, transparent 60%), linear-gradient(160deg,#1a1a1a,#0d0d0d)`,
                          } : {
                            backgroundImage: `radial-gradient(ellipse at ${isReversed ? "bottom left" : "top right"}, hsl(30,80%,88%) 0%, transparent 60%), linear-gradient(160deg,#f5f5f5,#e8e8e8)`,
                          }}
                        />
                        <span className={`absolute bottom-4 left-6 select-none text-[7rem] font-black leading-none ${isDark ? "text-white/5" : "text-black/5"}`}>
                          {num}
                        </span>
                        <div className="absolute left-5 top-5 h-8 w-px bg-accent/50" />
                        <div className="absolute left-5 top-5 h-px w-8 bg-accent/50" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/6" />
                  </div>
                </div>

                {/* ── Text — 2 of 5 columns ── */}
                <div
                  className={`lg:col-span-2 text-right ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  dir="rtl"
                >
                  <span className={`select-none text-[4rem] font-black leading-none ${isDark ? "text-white/6" : "text-black/6"}`}>
                    {num}
                  </span>
                  <div className="-mt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">מחלקה</p>
                    <h2 className={`mt-2 text-3xl font-black sm:text-4xl ${isDark ? "text-white" : "text-black"}`}>
                      {service.title}
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-muted" : "text-gray-500"}`}>
                      {service.description}
                    </p>
                    <div className="my-6 h-px w-16 bg-accent/40" />
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/gallery/${service.slug}`}
                        className={`btn-cta inline-flex items-center rounded-full border px-6 py-3 text-sm font-bold transition-all hover:border-accent hover:text-accent ${isDark ? "border-white/15 text-white" : "border-black/20 text-black"}`}
                      >
                        לגלריה שלנו «
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-cta inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
                      >
                        להצעת מחיר «
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <ContactForm />
    </>
  );
}
