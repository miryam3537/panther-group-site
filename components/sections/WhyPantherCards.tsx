"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    num: "01",
    title: "מעטפת מלאה",
    desc: "מיתוג, הפקה, ופרסום — הכל תחת קורת גג אחת. אתם מתמקדים בעסק, אנחנו מטפלים בשאר.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "מחירים הוגנים",
    desc: "תמחור שקוף וישיר, ללא הפתעות. תקציב קטן או גדול — אנחנו מוצאים פתרון.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "זמינות גבוהה",
    desc: "מענה אישי ומהיר בכל שלב. אנחנו שותפים אמיתיים לדרך — לא ספקים חד-פעמיים.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WhyPantherCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-14 grid gap-px bg-gray-200 sm:grid-cols-3"
    >
      {cards.map((card, i) => (
        <div
          key={card.num}
          className="bg-white px-8 py-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(24px)",
            transitionDelay: `${i * 120}ms`,
          }}
        >
          {/* Number */}
          <span className="block font-black text-[4.5rem] leading-none text-gray-100 select-none" aria-hidden="true">
            {card.num}
          </span>

          {/* Icon + Title */}
          <div className="mt-3 flex items-center gap-3 text-right">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {card.icon}
            </span>
            <h3 className="text-xl font-black text-black">{card.title}</h3>
          </div>

          {/* Divider */}
          <div className="mt-5 h-px w-10 bg-accent" />

          {/* Description */}
          <p className="mt-4 text-base leading-relaxed text-gray-500">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}
