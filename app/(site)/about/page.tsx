"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  scaleIn,
} from "@/lib/animations";

// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // ease-out expo
      setCount(Math.floor(eased * end));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: 10,  suffix: "+", label: "שנות ניסיון" },
  { value: 500, suffix: "+", label: "פרויקטים שהושלמו" },
  { value: 200, suffix: "+", label: "לקוחות מרוצים" },
  { value: 6,   suffix: "",  label: "תחומי התמחות" },
];

const values = [
  {
    num: "01",
    title: "מקצועיות ללא פשרות",
    text: "כל פרויקט מקבל את מלוא תשומת הלב והמומחיות שלנו, ללא קשר לגודלו.",
  },
  {
    num: "02",
    title: "שקיפות מלאה",
    text: "מחיר ברור, לוחות זמנים מוגדרים, ותקשורת פתוחה לאורך כל הדרך.",
  },
  {
    num: "03",
    title: "תוצאות מדידות",
    text: "אנחנו לא מוכרים חלומות — אנחנו מתחייבים לתוצאות שאפשר למדוד ולראות.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black py-24 lg:py-36">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Accent blob */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[130px]" />

        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Text — slides from right (RTL right side) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="text-right"
              dir="rtl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                הסיפור שלנו
              </p>
              <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
                אנחנו{" "}
                <span className="text-accent">פנתר</span>
              </h1>
              {/* Accent rule */}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-[3px] w-10 rounded-full bg-accent" />
                <div className="h-[3px] w-6 rounded-full bg-accent/40" />
                <div className="h-[3px] w-3 rounded-full bg-accent/20" />
              </div>
              <p className="mt-6 text-base leading-relaxed text-white/45">
                פנתר פרסום נוסדה מתוך אמונה אחת פשוטה: כל עסק — קטן או גדול —
                ראוי לשיווק ופרסום ברמה הגבוהה ביותר. אנחנו מביאים מומחיות,
                יצירתיות ותוצאות מדידות לכל לקוח.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/30">
                עם ניסיון של מעל עשור בתחום, ביצענו מאות פרויקטים לעסקים
                מכל הסקטורים — ממסעדות ועד מוסדות חינוך, מחברות הייטק ועד
                עסקים משפחתיים.
              </p>
              <Link
                href="/contact"
                className="btn-cta mt-8 inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
              >
                צרו קשר &#171;&#171;
              </Link>
            </motion.div>

            {/* Image — slides from left (RTL left side) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Offset accent frame */}
              <div className="absolute -bottom-3 -left-3 right-3 top-3 rounded-3xl border border-accent/30" />
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="relative aspect-video overflow-hidden rounded-3xl"
              >
                <Image
                  src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/ABOUT.png"
                  alt="צוות פנתר"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Stats ── */}
      <section className="relative overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="flex flex-col items-center bg-[#0d0d0d] px-8 py-16 text-center"
            >
              <p className="text-6xl font-black text-white lg:text-7xl">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={1400 + i * 200}
                />
              </p>
              <div className="mt-4 h-[2px] w-8 rounded-full bg-accent/50" />
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          {/* Header */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-12 text-right"
            dir="rtl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent/70">
              מה שמניע אותנו
            </p>
            <h2 className="mt-3 text-4xl font-black text-black sm:text-5xl">
              הערכים{" "}
              <span className="text-accent">שלנו</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl border border-black/8 bg-[#fafafa] p-8 text-right"
                dir="rtl"
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {/* Hover accent glow */}
                <div className="absolute inset-0 bg-accent/0 transition-all duration-500 group-hover:bg-accent/[0.03]" />
                {/* Watermark number */}
                <span className="select-none text-[5.5rem] font-black leading-none text-black/[0.04]">
                  {v.num}
                </span>
                <div className="relative z-10 -mt-6">
                  <div className="mb-4 h-[2px] w-8 rounded-full bg-accent" />
                  <h3 className="text-lg font-black text-black">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/50">
                    {v.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <ContactForm />
    </>
  );
}
