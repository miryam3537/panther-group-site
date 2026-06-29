"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";

const categories = [
  {
    id: "branding",
    title: "מיתוג ופרסום",
    desc: "זהות מותג, לוגו, חומרי פרסום",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    id: "promotions",
    title: 'הפקות וקד"מ',
    desc: "פרומושן, אירועי מכירות, buzz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    id: "events",
    title: "הפקות אירועים",
    desc: "כנסים, אירועי חברה, טקסים",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    id: "signage",
    title: "שילוט למוסדות",
    desc: "שלטי חוץ ופנים, תמרור מוסדי",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    id: "digital",
    title: "מדיה ודיגיטל",
    desc: "סושיאל, אתרים, קמפיינים",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.959 8.959 0 013 12c0-1.536.38-2.984 1.043-4.253" />
      </svg>
    ),
  },
  {
    id: "boards",
    title: "לוחות פרסום",
    desc: "שלטי חוצות, מסכי LED, פרגולות",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export function CategoryNavBar() {
  return (
    <section className="bg-black py-12 lg:py-16">
      <Container>
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
            המחלקות שלנו
          </p>
          <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
            בחר תחום — נזניק אותך קדימה
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services#${cat.id}`}
              className="
                group relative flex flex-col items-center gap-3 overflow-hidden
                rounded-2xl border border-white/8 bg-white/4 px-4 py-6 text-center
                transition-all duration-300
                hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/10
                hover:shadow-lg hover:shadow-accent/20
                active:scale-95 active:duration-75
              "
            >
              {/* Glow bg on hover */}
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(249,115,22,0.18) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Icon */}
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-accent/70 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:text-accent">
                {cat.icon}
              </span>

              {/* Text */}
              <span className="relative z-10 flex flex-col gap-1">
                <span className="text-sm font-black leading-tight text-white transition-colors group-hover:text-accent">
                  {cat.title}
                </span>
                <span className="hidden text-[11px] leading-snug text-white/40 transition-colors group-hover:text-white/70 lg:block">
                  {cat.desc}
                </span>
              </span>

              {/* Arrow */}
              <span className="relative z-10 mt-auto text-xs text-white/20 transition-all duration-300 group-hover:translate-x-[-3px] group-hover:text-accent">
                &#171;&#171;
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
