"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

const METRICS = [
  { value: "+340%", label: "נוכחות דיגיטלית" },
  { value: "×3",    label: "לידים איכותיים"  },
  { value: "+89%",  label: "זיהוי המותג"     },
];

export function LeapMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#060606] py-24 lg:py-32">
      {/* Ambient orange glow — right side where chart lives */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_75%_55%,rgba(249,115,22,0.055),transparent)]" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20" dir="rtl">

          {/* ── Left: Text + metrics ── */}
          <div className="text-right">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-accent/60">
              הזינוק של פנתר
            </p>
            <h2 className="text-4xl font-black leading-[1.1] text-white sm:text-5xl">
              העסק שלך
              <br />
              <span className="text-accent">לפני ואחרי.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/35">
              עסקים שעובדים עם פנתר לא סתם &quot;נראים טוב&quot; — הם צומחים.
              זה מה שהנתונים מראים.
            </p>

            {/* Metric counters */}
            <div className="mt-10 flex gap-8">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className="text-right"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.6s ease ${0.4 + i * 0.15}s, transform 0.6s ease ${0.4 + i * 0.15}s`,
                  }}
                >
                  <p className="text-3xl font-black text-accent">{m.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-white/30">{m.label}</p>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="btn-cta mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(249,115,22,0.28)] transition-all hover:bg-accent-hover hover:scale-105"
            >
              אנחנו נוביל את הזינוק שלך «
            </a>
          </div>

          {/* ── Right: SVG Line chart ── */}
          <div className="relative">
            {/* Top labels */}
            <div className="mb-3 flex justify-between px-1 text-[11px] font-semibold" dir="ltr">
              <span className="text-white/20">לפני פנתר</span>
              <span className="text-accent/50">עם פנתר ◆</span>
            </div>

            {/* Chart card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.018] p-5">
              <svg
                viewBox="0 0 400 200"
                className="w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Before area gradient */}
                  <linearGradient id="lm-before-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="rgba(120,120,120,0.12)" />
                    <stop offset="100%" stopColor="rgba(120,120,120,0)"    />
                  </linearGradient>
                  {/* After area gradient */}
                  <linearGradient id="lm-after-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="rgba(249,115,22,0.28)" />
                    <stop offset="100%" stopColor="rgba(249,115,22,0)"    />
                  </linearGradient>
                  {/* Orange line glow */}
                  <filter id="lm-glow" x="-20%" y="-50%" width="140%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y}
                    stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}

                {/* ── BEFORE area + line ── */}
                <path
                  d="M 0 155 C 40 153, 80 158, 130 154 C 155 152, 168 156, 185 153 L 185 200 L 0 200 Z"
                  fill="url(#lm-before-grad)"
                />
                <path
                  d="M 0 155 C 40 153, 80 158, 130 154 C 155 152, 168 156, 185 153"
                  fill="none"
                  stroke="rgba(140,140,140,0.4)"
                  strokeWidth="1.8"
                />

                {/* ── "Panther moment" dashed divider ── */}
                <line x1="185" y1="10" x2="185" y2="200"
                  stroke="rgba(249,115,22,0.18)" strokeWidth="1" strokeDasharray="4 4" />

                {/* ── AFTER area — fades in ── */}
                <path
                  d="M 185 153 C 215 125, 255 82, 295 48 C 330 22, 368 10, 400 7 L 400 200 L 185 200 Z"
                  fill="url(#lm-after-grad)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.6s ease 0.7s",
                  }}
                />

                {/* ── AFTER line — draws itself ── */}
                <path
                  d="M 185 153 C 215 125, 255 82, 295 48 C 330 22, 368 10, 400 7"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#lm-glow)"
                  style={{
                    strokeDasharray: 320,
                    strokeDashoffset: visible ? 0 : 320,
                    transition: "stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                  }}
                />

                {/* Glowing dot at the end */}
                <circle
                  cx="400" cy="7" r="5"
                  fill="#f97316"
                  filter="url(#lm-glow)"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.3s ease 1.5s",
                  }}
                />

                {/* Start dot */}
                <circle cx="0" cy="155" r="3" fill="rgba(140,140,140,0.5)" />
              </svg>

              {/* "Panther moment" badge */}
              <div
                className="pointer-events-none absolute left-[44%] top-4 -translate-x-1/2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) translateX(-50%)" : "translateY(8px) translateX(-50%)",
                  transition: "opacity 0.4s ease 0.9s, transform 0.4s ease 0.9s",
                }}
              >
                <span className="whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[9px] font-bold text-accent/80">
                  הצטרפות לפנתר
                </span>
              </div>

              {/* Month labels */}
              <div className="mt-2 flex justify-between px-1 text-[9px] text-white/15" dir="ltr">
                <span>ינואר</span>
                <span>אפריל</span>
                <span>יולי</span>
                <span>דצמבר</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
