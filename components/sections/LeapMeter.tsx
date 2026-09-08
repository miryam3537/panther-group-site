"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";

/* ── Continuous count-up hook ─────────────────────────────────
   Counts from 0 → target over `duration` seconds,
   pauses 1.5 s at the top, then resets and repeats.
   Each metric uses a different `delay` so they don't sync up. */
function useCountUp(target: number, duration: number, delay: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTs: number | null = null;
    let frame: number;

    function loop(ts: number) {
      if (startTs === null) startTs = ts + delay * 1000;
      const elapsed = ts - startTs;

      if (elapsed < 0) {
        frame = requestAnimationFrame(loop);
        return;
      }

      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        frame = requestAnimationFrame(loop);
      } else {
        // Pause at peak, then restart
        setTimeout(() => {
          startTs = null;
          setCount(0);
          frame = requestAnimationFrame(loop);
        }, 1500);
      }
    }

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, delay]);

  return count;
}

/* ── Metric counter cell ──────────────────────────────────────── */
function MetricCounter({
  prefix = "",
  target,
  suffix = "",
  label,
  duration,
  delay,
}: {
  prefix?: string;
  target: number;
  suffix?: string;
  label: string;
  duration: number;
  delay: number;
}) {
  const count = useCountUp(target, duration, delay);
  return (
    <div className="text-right">
      <p className="text-4xl font-black tabular-nums text-accent">
        {prefix}{count}{suffix}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-white/30">{label}</p>
    </div>
  );
}

/* ── Scrolling live chart path (900 px wide, naturally rising) ── */
const CHART_PATH =
  "M 0 175 C 20 172, 40 168, 60 165 " +
  "C 80 162, 100 170, 120 158 " +
  "C 140 146, 160 150, 180 140 " +
  "C 200 130, 220 135, 240 120 " +
  "C 260 105, 280 110, 300 95 " +
  "C 320 80, 340 85, 360 70 " +
  "C 380 55, 400 60, 420 45 " +
  "C 440 30, 460 35, 480 25 " +
  "C 500 15, 520 20, 540 12 " +
  "C 560 5, 580 8, 600 10 " +
  "C 620 12, 640 8, 660 5 " +
  "C 680 8, 700 5, 720 8 " +
  "C 740 12, 760 8, 780 5 " +
  "C 800 8, 820 5, 840 8 " +
  "C 860 5, 880 8, 900 5";

/* ── Main component ───────────────────────────────────────────── */
export function LeapMeter() {
  return (
    <section className="relative overflow-hidden bg-[#070707] py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20" dir="rtl">

          {/* ── Left: Headline + metrics ── */}
          <div className="text-right">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/25">
              נתוני צמיחה אמיתיים
            </p>

            <h2 className="text-5xl font-black leading-[1.05] text-white sm:text-6xl">
              הצמיחה
              <br />
              לא עוצרת.
            </h2>

            {/* Continuous metric counters */}
            <div className="mt-12 flex gap-10">
              <MetricCounter
                prefix="+"
                target={340}
                suffix="%"
                label="נוכחות"
                duration={2.2}
                delay={0}
              />
              <MetricCounter
                prefix="×"
                target={3}
                suffix=""
                label="לידים"
                duration={1.6}
                delay={0.5}
              />
              <MetricCounter
                prefix="+"
                target={89}
                suffix="%"
                label="מותג"
                duration={1.9}
                delay={1.1}
              />
            </div>

            <a
              href="/contact"
              className="btn-cta mt-12 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-accent-hover hover:scale-105"
            >
              אנחנו נוביל את הזינוק שלך «
            </a>
          </div>

          {/* ── Right: Live chart card ── */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            {/* Header row */}
            <div className="mb-5 flex items-center justify-between" dir="ltr">
              <span className="text-[11px] font-semibold text-white/30">
                Performance Index
              </span>
              {/* LIVE badge */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold tracking-widest text-emerald-400">
                  LIVE
                </span>
              </div>
            </div>

            {/* Scrolling chart — clipped viewport */}
            <div className="relative overflow-hidden rounded-xl" style={{ height: 200 }}>
              {/* Horizontal grid lines (static, behind) */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 200"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0" y1={y} x2="400" y2={y}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Scrolling line — two copies side-by-side for seamless loop */}
              <svg
                viewBox="0 0 1800 200"
                style={{
                  width: 1800,
                  height: 200,
                  animation: "chart-scroll 12s linear infinite",
                }}
                aria-hidden="true"
              >
                {/* Copy 1 */}
                <path
                  d={CHART_PATH}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Copy 2 — offset 900px to the right */}
                <path
                  d={CHART_PATH}
                  transform="translate(900, 0)"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
