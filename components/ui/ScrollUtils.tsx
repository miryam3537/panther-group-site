"use client";

import { useEffect, useState } from "react";

export function ScrollUtils() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed left-0 top-0 z-[300] h-[3px] bg-accent shadow-[0_0_8px_rgba(249,115,22,0.7)] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* ── Back to Top Button ── */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="חזרה למעלה"
        className={[
          "fixed bottom-8 left-6 z-[200] flex h-12 w-12 items-center justify-center rounded-full",
          "border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md",
          "transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110",
          showTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}
