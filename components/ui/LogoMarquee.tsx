"use client";

// Placeholder logos — text-based with styled boxes until real logos are added via Supabase/admin
const LOGOS = [
  "לקוח מוביל",
  "מותג פרמיום",
  "חברה גדולה",
  "עסק מצליח",
  "רשת ארצית",
  "מיזם בינלאומי",
  "יזם מוביל",
  "מותג ידוע",
];

export function LogoMarquee() {
  // Duplicate the array to create seamless loop
  const items = [...LOGOS, ...LOGOS];

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
