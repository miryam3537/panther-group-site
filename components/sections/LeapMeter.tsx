"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

const STAGES = [
  { height: 15, label: "לוגו ב-Word",     emoji: "📄", isTarget: false },
  { height: 30, label: "דף פייסבוק",      emoji: "📘", isTarget: false },
  { height: 48, label: "מיתוג בסיסי",     emoji: "🎨", isTarget: false },
  { height: 65, label: "קמפיין ראשון",    emoji: "📢", isTarget: false },
  { height: 82, label: "מותג מוכר",       emoji: "⭐", isTarget: false },
  { height: 100, label: "עם פנתר 🐆",    emoji: "🚀", isTarget: true  },
];

export function LeapMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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

        {/* Bar Chart */}
        <div className="mx-auto max-w-2xl">
          {/* Labels row */}
          <div className="mb-2 flex justify-between px-1 text-[11px] font-semibold">
            <span className="text-white/30">רמת הזינוק שלך</span>
            <span className="text-accent/70">הפוטנציאל עם פנתר ←</span>
          </div>

          {/* Chart */}
          <div className="flex h-56 items-end justify-center gap-2 sm:gap-3 rounded-2xl border border-white/6 bg-white/[0.02] p-4">
            {STAGES.map((stage, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-sm sm:text-base">{stage.emoji}</span>
                <div className="relative w-full flex-1 flex items-end overflow-hidden rounded-t-lg">
                  <div
                    className={`w-full rounded-t-lg ${stage.isTarget ? "bg-accent" : "bg-zinc-700/80"}`}
                    style={{
                      height: visible ? `${stage.height}%` : "0%",
                      transition: `height 0.9s cubic-bezier(0.34, 1.0, 0.64, 1) ${i * 110}ms`,
                      boxShadow: stage.isTarget && visible ? "0 0 24px rgba(249,115,22,0.6)" : undefined,
                    }}
                  />
                </div>
                <span className="text-center text-[9px] sm:text-[10px] leading-tight text-white/35 max-w-[52px]">
                  {stage.label}
                </span>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="mt-3 flex justify-between px-2 text-[11px]">
            <span className="text-white/25">↑ אתה כאן</span>
            <span className="text-accent/60">↑ אנחנו לוקחים אותך לכאן</span>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="text-lg font-black text-white">מוכנים לזינוק? 🚀</p>
            <a
              href="/contact"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(249,115,22,0.4)] transition-all hover:bg-accent-hover hover:scale-105"
            >
              התחל את הזינוק שלך «
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
