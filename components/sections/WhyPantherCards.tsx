"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Letter stagger helper ─────────────────────────────────── */

/**
 * Splits text into individual letter <span>s.
 * Each span gets a CSS custom property --char-delay so the CSS
 * calc() can drive the animation-delay without any inline JS timing.
 *
 * baseDelay: seconds after which the first letter of this card starts.
 * cardDelay + 0.6s (card duration) = baseDelay
 */
function StaggeredTitle({
  text,
  baseDelay,
}: {
  text: string;
  baseDelay: number;
}) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter-stagger"
          style={
            {
              "--char-delay": `${(baseDelay + i * 0.05).toFixed(2)}s`,
              "--char-index": i,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ─── Cards component ───────────────────────────────────────── */

export function WhyPantherCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.2 } // trigger when 20% of the grid is in view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cards-container mt-12 grid gap-6 md:grid-cols-3${isVisible ? " is-visible" : ""}`}
    >
      {/* Card 1 — animates at 0.10s; letters start at 0.75s */}
      <div className="card-stagger card-d1 flex flex-col items-center rounded-3xl bg-accent p-10 text-center shadow-lg shadow-accent/20">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white">
          <StaggeredTitle text="מעטפת מלאה" baseDelay={0.75} />
        </h3>
        <p className="mt-2 text-sm text-white/80">פתרון שלם מהתכנון ועד הביצוע</p>
      </div>

      {/* Card 2 — animates at 0.35s; letters start at 1.00s */}
      <div className="card-stagger card-d2 flex flex-col items-center rounded-3xl bg-accent p-10 text-center shadow-lg shadow-accent/20">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-white">
          <StaggeredTitle text="מחירים הוגנים" baseDelay={1.0} />
        </h3>
        <p className="mt-2 text-sm text-white/80">תמחור שקוף ותחרותי לכל תקציב</p>
      </div>

      {/* Card 3 — animates at 0.60s; letters start at 1.25s */}
      <div className="card-stagger card-d3 flex flex-col items-center rounded-3xl border-2 border-gray-200 p-10 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-black">
          <StaggeredTitle text="זמינות גבוהה" baseDelay={1.25} />
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          מענה מהיר
          <br />
          תמיד כאן בשבילך
        </p>
      </div>
    </div>
  );
}
