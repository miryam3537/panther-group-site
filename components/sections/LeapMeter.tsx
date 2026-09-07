"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";

const STAGES = [
  { height: 15, label: "לוגו ב-Word",     emoji: "📄", isTarget: false },
  { height: 30, label: "דף פייסבוק",      emoji: "📘", isTarget: false },
  { height: 48, label: "מיתוג בסיסי",     emoji: "🎨", isTarget: false },
  { height: 65, label: "קמפיין ראשון",    emoji: "📢", isTarget: false },
  { height: 82, label: "מותג מוכר",       emoji: "⭐", isTarget: false },
  { height: 100, label: "עם פנתר",        emoji: "🚀", isTarget: true  },
];

export function LeapMeter() {
  const ref    = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  /* ── Intersection Observer ─────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* ── Draw SVG trend line after bars have animated (~900 ms) ────── */
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => drawTrendLine(), 950);
    return () => clearTimeout(timeout);
  }, [visible]);

  function drawTrendLine() {
    const svg = svgRef.current;
    if (!svg) return;

    /* container metrics */
    const container = svg.closest(".bar-container") as HTMLElement | null;
    if (!container) return;
    const cW = container.clientWidth;
    const cH = container.clientHeight;
    svg.setAttribute("width",  String(cW));
    svg.setAttribute("height", String(cH));
    svg.setAttribute("viewBox", `0 0 ${cW} ${cH}`);

    /* bar column width including gap (gap-3 = 12px between 6 items) */
    const n    = STAGES.length;
    const gap  = 12;
    const barW = (cW - gap * (n - 1)) / n;

    /* RTL: stage index 0 (rightmost in DOM) is the shortest bar.
       DOM order: index 0 = "לוגו ב-Word" on the right, index 5 = "עם פנתר" on the left.
       We want the trend line left→right to go from tall (stage 5) to short (stage 0). */
    const points = STAGES.map((stage, i) => {
      /* DOM LTR position of column i (leftmost = index 5 = "עם פנתר") */
      const domIdx = n - 1 - i; // we reversed with flex-row-reverse
      const cx = domIdx * (barW + gap) + barW / 2;
      const cy = cH - (stage.height / 100) * cH;
      return { cx, cy };
    });

    /* Build smooth polyline */
    const d = points
      .map((p, i) => (i === 0 ? `M ${p.cx},${p.cy}` : `L ${p.cx},${p.cy}`))
      .join(" ");

    /* Remove old path if any */
    svg.innerHTML = "";

    /* Glow filter */
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#f97316");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("filter", "url(#glow)");
    path.setAttribute("opacity", "0.8");

    /* Dash-draw animation */
    const len = (path.getTotalLength?.() ?? 600).toString();
    path.setAttribute("stroke-dasharray", len);
    path.setAttribute("stroke-dashoffset", len);
    path.style.transition = "stroke-dashoffset 1s ease-out";
    svg.appendChild(path);

    /* Dots at each bar top */
    points.forEach((p) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(p.cx));
      circle.setAttribute("cy", String(p.cy));
      circle.setAttribute("r",  "3");
      circle.setAttribute("fill", "#f97316");
      circle.setAttribute("filter", "url(#glow)");
      circle.style.opacity = "0";
      circle.style.transition = "opacity 0.4s ease 0.9s";
      svg.appendChild(circle);
      requestAnimationFrame(() => { circle.style.opacity = "1"; });
    });

    /* Trigger dash animation */
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050505] py-20 lg:py-28"
      dir="rtl"
    >
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container>
        {/* ── Header ──────────────────────────────────────────────── */}
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

        {/* ── Chart ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-2xl">

          {/* Legend row */}
          <div className="mb-3 flex justify-between text-[11px] font-semibold">
            <span className="text-white/40">רמת הזינוק שלך</span>
            <span className="text-accent">הפוטנציאל עם פנתר ◀</span>
          </div>

          {/* Bar chart — bars grow upward from the bottom.
              flex-row-reverse so RTL stage 1 (shortest) is on the right */}
          <div className="relative bar-container h-64" dir="ltr">
            {/* SVG trend line overlay */}
            <svg
              ref={svgRef}
              className="pointer-events-none absolute inset-0 z-10"
              style={{ overflow: "visible" }}
            />

            <div className="flex flex-row-reverse items-end h-full gap-3">
              {STAGES.map((stage, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 flex-1 h-full justify-end"
                >
                  {/* Bar column wrapper — gives bars a fixed vertical space to grow in */}
                  <div className="relative w-full flex-1 flex items-end min-h-0">
                    <div
                      className={`w-full rounded-t-lg ${
                        stage.isTarget
                          ? "bg-accent"
                          : "bg-zinc-700 hover:bg-zinc-600"
                      } transition-none`}
                      style={{
                        height: visible ? `${stage.height}%` : "0%",
                        transition: `height 0.8s cubic-bezier(0.34, 1.0, 0.64, 1) ${i * 100}ms`,
                        boxShadow: stage.isTarget
                          ? "0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.2)"
                          : undefined,
                      }}
                    />
                  </div>

                  {/* Emoji above label */}
                  <span className="text-base leading-none mt-1">{stage.emoji}</span>
                  <span className="text-[9px] text-white/40 text-center leading-tight max-w-[52px]">
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow labels below chart */}
          <div className="mt-3 flex justify-between text-[10px] text-white/30">
            <span>← אנחנו לוקחים אותך לכאן</span>
            <span>אתה כאן →</span>
          </div>

          {/* ── CTA ─────────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-lg font-black text-white">
              מוכן לזינוק האמיתי? 🚀
            </p>
            <p className="text-sm text-white/40 max-w-xs">
              בואו ניקח את העסק שלך מהשלב שבו אתה נמצא — ועד לשיא.
            </p>
            <a
              href="/contact"
              className={`mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-500 hover:scale-105 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transition: "opacity 0.6s ease 1.1s, transform 0.6s ease 1.1s, background-color 0.2s, transform 0.2s",
              }}
            >
              התחל את הזינוק שלך «
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
