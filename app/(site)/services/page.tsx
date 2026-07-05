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
      {/* Page header */}
      <section className="bg-black py-16 text-right">
        <Container>
          <p className="text-sm font-medium text-accent">מה שאנחנו עושים</p>
          <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
            כל השירותים <span className="text-accent">במקום אחד</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            פנתר מציעה מגוון שירותי פרסום ושיווק — מהתכנון ועד הביצוע, הכל
            תחת קורת גג אחת.
          </p>
        </Container>
      </section>

      {servicesData.map((service, index) => {
        const isDark = index % 2 === 0;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={isDark ? "bg-black" : "bg-white"}
          >
            <Container>
              <div className="grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16">
                {/* Text block */}
                <div className="text-right">
                  <h2 className={`text-3xl font-black sm:text-4xl ${isDark ? "text-white" : "text-black"}`}>
                    {service.title}
                  </h2>
                  <p className={`mt-4 leading-relaxed ${isDark ? "text-muted" : "text-gray-600"}`}>
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
                  >
                    לפרטים ולהצעת מחיר &#171;&#171;
                  </Link>
                </div>

                {/* Image */}
                <div className={isDark ? "lg:order-first" : ""}>
                  <div className={`relative aspect-video w-full overflow-hidden rounded-3xl border ${isDark ? "border-border bg-card" : "border-gray-200 bg-gray-100"} flex items-center justify-center`}>
                    {service.image_url ? (
                      <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className={`mx-auto mb-3 h-16 w-16 rounded-full ${isDark ? "bg-accent/15" : "bg-accent/10"} flex items-center justify-center`}>
                          <span className="text-2xl text-accent">✦</span>
                        </div>
                        <p className={`text-xs ${isDark ? "text-muted" : "text-gray-400"}`}>
                          תמונה / תלת-ממד
                          <br />
                          (placeholder)
                        </p>
                      </div>
                    )}
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
