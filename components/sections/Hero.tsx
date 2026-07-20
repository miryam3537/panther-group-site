"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import {
  staggerContainer,
  staggerItem,
  tapScale,
} from "@/lib/animations";

const BG_IMAGE =
  "https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/Gemini_Generated_Image_38g6mc38g6mc38g6.png";

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden"
      style={{
        backgroundImage: `url('${BG_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft overlay — lighter so the photo stays bright, text still readable */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/45 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Orange radial glow — bottom-left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 28% 110%, rgba(249,115,22,0.30) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[92vh] items-center py-20">
        <div className="w-full">

          {/* ── Text — centered or right-aligned in RTL ── */}
          <motion.div
            className="mx-auto max-w-2xl text-right"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-[clamp(4rem,10vw,7.5rem)] font-black leading-none tracking-tighter text-white">
              <motion.span className="block" variants={staggerItem}>זינוק</motion.span>
              <motion.span className="block" variants={staggerItem}>לעסק</motion.span>
              <motion.span className="block text-accent" variants={staggerItem}>מנצח</motion.span>
            </h1>

            <motion.p
              className="mt-6 text-base font-medium text-white/70 sm:text-lg"
              variants={staggerItem}
            >
              מיתוג ופרסום&nbsp;&bull;&nbsp;הפקות אירועים&nbsp;&bull;&nbsp;מדיה דיגיטל
            </motion.p>

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

        </div>
      </Container>
    </section>
  );
}
