"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import {
  staggerContainer,
  staggerItem,
  slideInLeft,
  scaleIn,
  tapScale,
} from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-black">
      {/* Orange radial glow — bottom-left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 28% 110%, rgba(249,115,22,0.35) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Large orange upward arrows / triangles — background decoration */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-[22%] -translate-x-1/2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        aria-hidden="true"
      >
        <svg width="280" height="560" viewBox="0 0 100 200" className="opacity-80">
          <polygon points="60,10 105,200 15,200" fill="#f97316" opacity="0.4" />
          <polygon points="50,0 95,200 5,200" fill="#f97316" opacity="0.75" />
        </svg>
      </motion.div>

      {/* Secondary glow on right edge */}
      <div
        className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[92vh] items-center py-20">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-4">

          {/* ── Text column — RIGHT in RTL ── */}
          <motion.div
            className="text-right"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Headline — each word staggers in */}
            <h1 className="text-[clamp(4rem,10vw,7.5rem)] font-black leading-none tracking-tighter text-white">
              <motion.span className="block" variants={staggerItem}>זינוק</motion.span>
              <motion.span className="block" variants={staggerItem}>לעסק</motion.span>
              <motion.span className="block text-accent" variants={staggerItem}>מנצח</motion.span>
            </h1>

            <motion.p
              className="mt-6 text-base font-medium text-muted sm:text-lg"
              variants={staggerItem}
            >
              מיתוג ופרסום&nbsp;&bull;&nbsp;הפקות אירועים&nbsp;&bull;&nbsp;מדיה דיגיטל
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-end gap-4"
              variants={staggerItem}
            >
              <motion.div {...tapScale}>
                <Link
                  href="/gallery"
                  className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
                >
                  לגלריה
                </Link>
              </motion.div>

              <motion.div {...tapScale}>
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
                >
                  להצעת מחיר &#171;&#171;
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Image column — LEFT in RTL ── */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-15"
              style={{
                background:
                  "radial-gradient(circle at center, #f97316 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Image placeholder */}
            <motion.div
              className="relative z-10 aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <svg
                  className="h-12 w-12 text-accent/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" strokeLinecap="round" />
                </svg>
                <p className="text-center text-xs text-muted">
                  תמונת Hero
                  <br />
                  (תוחלף בתמונת רכב/מוצר אמיתית)
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
