"use client";

import Image from "next/image";

export type LogoItem = {
  id: string;
  name: string;
  image_url: string;
};

// Fallback placeholder text when no logos uploaded yet
const PLACEHOLDER_LOGOS = [
  "לקוח מוביל",
  "מותג פרמיום",
  "חברה גדולה",
  "עסק מצליח",
  "רשת ארצית",
  "מיזם בינלאומי",
  "יזם מוביל",
  "מותג ידוע",
];

interface Props {
  logos?: LogoItem[];
}

export function LogoMarquee({ logos }: Props) {
  const hasRealLogos = logos && logos.length > 0;

  if (!hasRealLogos) {
    // Fallback: text placeholders — 4 copies ensures no empty gap
    const items = [...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS];
    return (
      <section className="overflow-hidden border-y border-white/6 bg-[#060606] py-10">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25">מותגים שבחרו בנו</p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#060606] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#060606] to-transparent" />
          <div className="flex w-max animate-marquee gap-8">
            {items.map((logo, i) => (
              <div
                key={i}
                className="flex h-14 w-36 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] px-4 text-sm font-semibold text-white/30 transition-colors hover:border-accent/30 hover:text-white/50"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Real logos — 4 copies ensures seamless loop with no empty gap
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="overflow-hidden border-y border-white/6 bg-[#060606] py-10">
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25">מותגים שבחרו בנו</p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#060606] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#060606] to-transparent" />

        {/* Marquee track */}
        <div className="flex w-max animate-marquee gap-8">
          {items.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white px-5 transition-all hover:border-accent/40 hover:shadow-md hover:shadow-accent/10"
              title={logo.name}
            >
              <Image
                src={logo.image_url}
                alt={logo.name}
                width={130}
                height={64}
                className="h-12 w-auto max-w-[130px] object-contain transition-opacity opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
