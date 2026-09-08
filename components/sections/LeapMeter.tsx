"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

const METRICS = [
  { big: "340", unit: "%", label: "צמיחה בנוכחות הדיגיטלית" },
  { big: "×3",  unit: "",  label: "יותר לידים איכותיים"      },
  { big: "89",  unit: "%", label: "שיפור בזיהוי המותג"        },
];

/* Simple scroll-reveal — numbers appear as section enters view */
export function LeapMeter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-black py-24 lg:py-32">
      <Container>

        {/* ── Header ── */}
        <div className="mb-16 text-right">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-accent/50">
            מה המספרים אומרים
          </p>
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            לקוחות פנתר
            <br />
            <span className="text-accent">מרגישים את ההבדל.</span>
          </h2>
        </div>

        {/* ── 3 metric columns separated by thin lines ── */}
        <div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="px-0 py-10 text-right sm:px-10 sm:py-0 first:sm:pr-0 last:sm:pl-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              }}
            >
              {/* The big number */}
              <p className="text-[5rem] font-black leading-none tracking-tighter text-white sm:text-[4.5rem] lg:text-[5.5rem]">
                {m.big}
                {m.unit && (
                  <span className="text-[2.5rem] text-accent">{m.unit}</span>
                )}
              </p>

              {/* Accent line */}
              <div
                className="mt-5 h-[3px] rounded-full bg-accent"
                style={{
                  width: visible ? (i === 0 ? "3.5rem" : i === 1 ? "2.5rem" : "3rem") : "0",
                  transition: `width 0.6s ease ${0.3 + i * 0.15}s`,
                }}
              />

              {/* Label */}
              <p className="mt-4 text-sm leading-snug text-white/40">{m.label}</p>
            </div>
          ))}
        </div>

        {/* ── Footer row ── */}
        <div className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20" dir="rtl">
            * מבוסס על נתוני לקוחות אמיתיים לאחר 6 חודשי עבודה עם פנתר
          </p>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:scale-105 active:scale-95"
          >
            אנחנו נוביל את הזינוק שלך «
          </Link>
        </div>

      </Container>
    </section>
  );
}
