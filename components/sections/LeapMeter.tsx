"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

const LEVELS = [
  { pct: 12, label: "לוגו ב-Word", emoji: "📄" },
  { pct: 30, label: "דף פייסבוק", emoji: "📘" },
  { pct: 52, label: "מיתוג בסיסי", emoji: "🎨" },
  { pct: 74, label: "קמפיין ראשון", emoji: "📢" },
  { pct: 91, label: "מותג מוכר", emoji: "⭐" },
  { pct: 100, label: "עם פנתר 🐆", emoji: "🚀" },
];

export function LeapMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [barPct, setBarPct] = useState(0);
  const [activePct] = useState(12); // "where the client is now" — default low

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate bar: first goes to activePct fast, then jumps to 100 after a pause
  useEffect(() => {
    if (!visible) return;
    let raf: number;
    let start: number | null = null;

    // Phase 1: fill to activePct (0.5s)
    const phase1Duration = 500;
    function phase1(ts: number) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / phase1Duration, 1);
      setBarPct(Math.round(p * activePct));
      if (p < 1) raf = requestAnimationFrame(phase1);
      else {
        // Pause 600ms, then jump to 100
        setTimeout(() => {
          start = null;
          const phase2Duration = 900;
          function phase2(ts2: number) {
            if (!start) start = ts2;
            const p2 = Math.min((ts2 - start) / phase2Duration, 1);
            const eased = 1 - Math.pow(1 - p2, 3); // ease-out cubic
            setBarPct(Math.round(activePct + eased * (100 - activePct)));
            if (p2 < 1) raf = requestAnimationFrame(phase2);
          }
          raf = requestAnimationFrame(phase2);
        }, 600);
      }
    }
    raf = requestAnimationFrame(phase1);
    return () => cancelAnimationFrame(raf);
  }, [visible, activePct]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#050505] py-20 lg:py-28" dir="rtl">
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <span className="text-sm font-bold text-accent">מד הזינוק של פנתר</span>
            <span className="text-base">🐆</span>
          </div>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            איפה העסק שלך עכשיו —
            <br />
            <span className="text-accent">לאן הוא יכול להגיע?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/40">
            רוב העסקים תקועים בשלב הראשון. פנתר לוקחת אותך כל הדרך.
          </p>
        </div>

        {/* Bar track */}
        <div className="mx-auto max-w-2xl">
          <div className="relative h-6 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
            {/* Fill */}
            <div
              className="absolute inset-y-0 right-0 rounded-full transition-none"
              style={{
                width: `${barPct}%`,
                background: barPct >= 90
                  ? "linear-gradient(90deg, #f97316, #fbbf24, #f97316)"
                  : "linear-gradient(90deg, #f97316cc, #f97316)",
                boxShadow: barPct >= 90 ? "0 0 20px rgba(249,115,22,0.6)" : undefined,
                backgroundSize: "200% 100%",
                animation: barPct >= 90 ? "shimmer-slide 1.4s ease-in-out infinite" : undefined,
              }}
            />
            {/* Glow dot at end */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-[0_0_10px_rgba(249,115,22,0.9)] transition-none"
              style={{ right: `calc(${100 - barPct}% - 8px)` }}
            />
          </div>

          {/* Level markers */}
          <div className="relative mt-3 flex justify-between px-1">
            {LEVELS.map((lvl) => (
              <div
                key={lvl.pct}
                className="flex flex-col items-center gap-1"
                style={{ opacity: barPct >= lvl.pct ? 1 : 0.3, transition: "opacity 0.4s ease" }}
              >
                <span className="text-base sm:text-lg">{lvl.emoji}</span>
                <span className="hidden text-[10px] font-semibold text-white/50 sm:block text-center leading-tight max-w-[60px]">
                  {lvl.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA below bar */}
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="text-lg font-black text-white">
              {barPct < 90
                ? `${barPct}% — יש לאן לגדול 💪`
                : "🚀 100% — ברוכים הבאים לזינוק עם פנתר!"}
            </p>
            {barPct >= 90 && (
              <a
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:scale-105"
              >
                התחל את הזינוק שלך «
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
