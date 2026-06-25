import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-black">
      {/* Orange radial glow — bottom-left (where the car/arrow will be) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 28% 110%, rgba(249,115,22,0.35) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Large orange upward arrows / triangles — background decoration */}
      <div
        className="pointer-events-none absolute bottom-0 left-[22%] -translate-x-1/2"
        aria-hidden="true"
      >
        <svg
          width="280"
          height="560"
          viewBox="0 0 100 200"
          className="opacity-80"
        >
          {/* Back arrow (slightly offset, lighter) */}
          <polygon points="60,10 105,200 15,200" fill="#f97316" opacity="0.4" />
          {/* Front arrow */}
          <polygon points="50,0 95,200 5,200" fill="#f97316" opacity="0.75" />
        </svg>
      </div>

      {/* Secondary glow on right edge */}
      <div
        className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[92vh] items-center py-20">
        {/*
          RTL grid: first column → RIGHT (text), second column → LEFT (image)
          On mobile: stacked, text first (top)
        */}
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-4">
          {/* ── Text column — RIGHT in RTL ── */}
          <div className="text-right">
            <h1 className="text-[clamp(4rem,10vw,7.5rem)] font-black leading-none tracking-tighter text-white">
              <span className="block">זינוק</span>
              <span className="block">לעסק</span>
              <span className="block text-accent">מנצח</span>
            </h1>

            <p className="mt-6 text-base font-medium text-muted sm:text-lg">
              מיתוג ופרסום&nbsp;&bull;&nbsp;הפקות אירועים&nbsp;&bull;&nbsp;מדיה
              דיגיטל
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
              <Link
                href="/gallery"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
              >
                לגלריה
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
              >
                להצעת מחיר &#171;&#171;
              </Link>
            </div>
          </div>

          {/* ── Image column — LEFT in RTL ── */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-15"
              style={{
                background:
                  "radial-gradient(circle at center, #f97316 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Image placeholder — will be replaced with next/image */}
            <div className="relative z-10 aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <svg
                  className="h-12 w-12 text-accent/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" strokeLinecap="round" />
                </svg>
                <p className="text-center text-xs text-muted">
                  תמונת Hero
                  <br />
                  (תוחלף בתמונת רכב/מוצר אמיתית)
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
