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
  "https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/panterhome.jpg";

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden"
      style={{
        backgroundImage: `url('${BG_IMAGE}')`,
        backgroundSize: "cover",
        /* Keep the van on the left; leave room for text on the right */
        backgroundPosition: "28% center",
      }}
    >
      {/* Light overlays — keep photo bright, soft shade only behind text */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/45 via-black/15 to-transparent"
        aria-hidden="true"
      />

      {/* Soft orange warmth — bottom-left near the van */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 28% 110%, rgba(249,115,22,0.18) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-[92vh] items-center justify-start py-20">
        {/* Right side in RTL — clears the van on the left */}
        <motion.div
          className="w-full max-w-md text-right sm:max-w-lg lg:max-w-xl lg:ps-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-[clamp(3.25rem,8vw,6.5rem)] font-black leading-none tracking-tighter text-white">
            <motion.span className="block" variants={staggerItem}>זינוק</motion.span>
            <motion.span className="block" variants={staggerItem}>לעסק</motion.span>
            <motion.span className="block text-accent" variants={staggerItem}>מנצח</motion.span>
          </h1>

          <motion.p
            className="mt-5 text-base font-medium text-white/85 sm:text-lg"
            variants={staggerItem}
          >
            מיתוג ופרסום&nbsp;&bull;&nbsp;הפקות אירועים&nbsp;&bull;&nbsp;מדיה דיגיטל
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start"
            variants={staggerItem}
          >
            <motion.div {...tapScale} className="sm:order-2">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover sm:w-auto"
              >
                להצעת מחיר &#171;&#171;
              </Link>
            </motion.div>

            <motion.div {...tapScale} className="sm:order-1">
              <Link
                href="/gallery"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-colors hover:border-accent hover:text-accent sm:w-auto"
              >
                לגלריה
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
