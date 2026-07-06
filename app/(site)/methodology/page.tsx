"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  scaleIn,
} from "@/lib/animations";

/* ─── Data ──────────────────────────────────────────────────── */

const launchSteps = [
  {
    title: "הבנת השוק",
    desc: "בדיקת נתונים מעמיקה לגילוי הנקודה עליה אתם עומדים.",
  },
  {
    title: "בניית אסטרטגיה",
    desc: "תכנון מחושב ובניית מהלך שיווקי עם מסר מדויק וקולע לעסק שלכם.",
  },
  {
    title: "ביצוע בפועל",
    desc: "כתיבה שיווקית מדויקת, קריאטיבית, יצירת ויז'ואל — עיצוב תופס שמדבר ישירות ללב.",
  },
  {
    title: "נקודת זינוק",
    desc: "יציאה לאוויר העולם עם פרסום במקומות הנכונים, קבלת לידים חמים, הגדלת מכירות.",
  },
];

const layers = [
  {
    num: "01",
    title: "אסטרטגיה",
    desc: "חשיבה מקדימה לתכנון תהליך המהלך השיווקי. בלעדיה — יש עיצוב יפה, אבל אין תוצאות בשטח.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "קריאייטיב",
    desc: "רעיון מבודל, קונספט, דימויים, כיוונים חדשים שיגרמו ללקוח לעצור ולהגיד: «וואו, זה מה שאני רוצה».",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "עיצוב",
    desc: "ביצוע מדויק, מקצועי, שמכבד את העסק ומשרת את המטרה. שלושת השכבות יחד — מותג שאי אפשר לפספס.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

const workSteps = [
  {
    num: "01",
    title: "מיפוי קהל היעד",
    desc: "למי אתם מוכרים? מה הלקוח מחפש? למה שהוא יבחר בכם? שאלות שמדייקות מענה לצורך ומשקפות מי קהל היעד שירצה לרכוש את המוצר.",
  },
  {
    num: "02",
    title: "זיקוק הבידול",
    desc: "בדיקת מתחרים, מיצוב בשוק, משוב מלקוחות מרוצים. יצירת בידול — למה דווקא לבוא אליכם, בצורה חזקה שתשאיר אתכם תמיד על המפה.",
  },
  {
    num: "03",
    title: "בניית מהלך שיווקי",
    desc: "כתיבת תוכן חד, מסר שיווקי עוצמתי, קריאיטיב המתאים לעסק שלכם ומציג את הערך ללקוחות בצורה ברורה.",
  },
  {
    num: "04",
    title: "וידאו — 7 שניות של רושם",
    desc: "פתיחה חזקה, מסר חד, אמירה ברורה. וידאו שתופס את הלקוח מרגע הצפייה הראשון. אין שני לרושם ראשוני!",
  },
  {
    num: "05",
    title: "בחירת פלטפורמות פרסום",
    desc: "לא מפרסמים היכן שהכי זול — מפרסמים היכן שזה נכון. בודקים נתונים, בוחרים את מקומות הפרסום המדויקים לעסק שלכם.",
  },
];

const benefits = [
  "פגישת אסטרטגיה מעמיקה",
  "רעיונות מוצלחים ומבודלים",
  "חומרים שמדברים בדיוק ללקוח",
  "פרסום בערוצים בהם נמצא קהל היעד",
  "זמינות, מענה ואחריות מלאה על התהליך",
];

/* ─── Page ───────────────────────────────────────────────────── */

export default function MethodologyPage() {
  return (
    <>
      {/* ── 1. Page Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black pb-24 pt-32 text-right">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 100%, rgba(249,115,22,0.3) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mr-0 ml-auto lg:mr-auto lg:ml-0"
          >
            <motion.p
              variants={staggerItem}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-accent/70"
            >
              השיטה של פנתר
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              מובילים לעסק{" "}
              <span className="text-accent">מנצח</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
            >
              יש לכם חלום לגדול. הדרך להפוך למותג נחשק מתחילה בנקודה אחת —
              אסטרטגיה חדה, ביצוע מנצח. זו השיטה שלנו.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-10">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-orange-600"
                >
                  להצעת מחיר &#171;&#171;
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── 2. The Launch Point (4 pillars) ─────────────────── */}
      <section className="bg-white py-20 lg:py-28 text-right">
        <Container>
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              נקודת הזינוק של העסק
            </p>
            <h2 className="title-pulse title-pulse-d07 mt-2 text-3xl font-black text-black sm:text-4xl lg:text-5xl">
              הנוסחה לעסק מצליח = <span className="text-accent">מיקוד</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              לעצור, לבדוק את הנתונים המשתנים בשטח, ולהקיף את המכלול בראיה
              קדימה דרך אסטרטגיה מדויקת. זו המיומנות שלנו.
            </p>
          </AnimatedSection>

          <motion.div
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {launchSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-right"
              >
                <span className="text-4xl font-black text-accent/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-black text-black">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── 3. The 3 Layers ──────────────────────────────────── */}
      <section className="bg-black py-20 lg:py-28 text-right">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-1/2 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at left center, #f97316 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
              הסוד שמאחורי כל מותג מנצח
            </p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              3 שכבות של מותג{" "}
              <span className="text-accent">מנצח</span>
            </h2>
          </AnimatedSection>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {layers.map((layer) => (
              <motion.div
                key={layer.num}
                variants={staggerItem}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 text-right"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(249,115,22,0.15) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <span className="text-5xl font-black text-accent/15">{layer.num}</span>
                  <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-accent transition-all group-hover:border-accent/40 group-hover:bg-accent/15">
                    {layer.icon}
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-white">{layer.title}</h3>
                  <p className="mt-3 text-base leading-loose text-white/60">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── 4. The 5 Work Steps ──────────────────────────────── */}
      <section className="bg-background py-20 lg:py-28 text-right">
        <Container>
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              תהליך העבודה שלנו
            </p>
            <h2 className="mt-2 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              5 שלבים לנקודת{" "}
              <span className="text-accent">ההצלחה</span> שלכם
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              לפני כל עיצוב, מודעה או קמפיין — יש שלב בסיס להצלחה. פגישת
              אסטרטגיה שבה כל חלקי הפאזל מתבהרים מול העיניים.
            </p>
          </AnimatedSection>

          <div className="mt-14 space-y-0">
            {workSteps.map((step, i) => (
              <AnimatedSection key={step.num} variants={fadeUp} threshold={0.1}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Vertical connector line */}
                  {i < workSteps.length - 1 && (
                    <div className="absolute right-[1.4rem] top-12 bottom-0 w-px bg-border" />
                  )}

                  {/* Number badge */}
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-sm font-black text-accent">
                    {step.num}
                  </div>

                  {/* Content */}
                  <div className="pt-1 pb-2">
                    <h3 className="text-xl font-black text-foreground sm:text-2xl">{step.title}</h3>
                    <p className="mt-2 text-base leading-loose text-muted max-w-2xl sm:text-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Why Panther ───────────────────────────────────── */}
      <section className="bg-black py-20 lg:py-28 text-right">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — text */}
            <AnimatedSection variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                למה לבחור פנתר?
              </p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                אנחנו לא משווקים.{" "}
                <span className="text-accent">אנחנו בונים מהלכים.</span>
              </h2>
              <p className="mt-5 text-lg leading-loose text-white/65">
                לכל עסק יש DNA משלו. אנו מתאימים לכל עסק אסטרטגיה, מסר ושפה
                שלא דומים לשום דבר אחר בשוק. זו הסיבה שהלקוחות שלנו לא
                «נראים אותו דבר» — כל לקוח ייחודי בפני עצמו.
              </p>

              <motion.div
                className="mt-10"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors hover:bg-orange-600"
                >
                  התחילו עכשיו &#171;&#171;
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Right — benefits list */}
            <motion.ul
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
                  variants={staggerItem}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 px-6 py-4 text-right"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-base font-medium text-white/85 sm:text-lg">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* ── 6. Final CTA ─────────────────────────────────────── */}
      <section className="bg-accent py-20 text-center">
        <Container>
          <AnimatedSection variants={scaleIn}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              אסטרטגיה חדה. ביצוע מנצח.
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              התחלה נכונה היא סוד ההצלחה!
            </h2>
            <p className="mt-4 text-lg text-white/85 sm:text-xl">
              יחד יוצרים את המחר של העסק שלכם.
            </p>
            <motion.div
              className="mt-10 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
            >
              <Link
                href="/contact"
                className="rounded-full bg-white px-10 py-4 text-sm font-black text-accent shadow-xl transition-opacity hover:opacity-90"
              >
                צרו קשר עכשיו &#171;&#171;
              </Link>
            </motion.div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
