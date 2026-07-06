"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { navItems, siteConfig } from "@/lib/site";

/* ── Back-to-Top button ─────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="חזרה לראש העמוד"
      className={`
        fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center
        rounded-full bg-black/70 text-white shadow-lg backdrop-blur-sm
        transition-all duration-300 hover:bg-black hover:scale-110 active:scale-95
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <BackToTop />

      <footer className="bg-accent" role="contentinfo">

        {/* ── Main content ── */}
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 md:grid-cols-3 lg:gap-20">

            {/* Col 1 — Logo + description */}
            <div className="text-right">
              <Link href="/" aria-label={`${siteConfig.name} — דף הבית`}>
                <span className="text-3xl font-black tracking-tight text-white">
                  {siteConfig.name}
                </span>
                <p className="mt-1 text-sm font-medium text-white/65">
                  {siteConfig.tagline}
                </p>
              </Link>
              <p className="mt-5 max-w-xs text-sm font-normal leading-loose text-white/70">
                {siteConfig.description}
              </p>
            </div>

            {/* Col 2 — Navigation */}
            <div className="text-right">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                ניווט
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-normal text-white/75 transition-all duration-200 hover:text-white"
                    >
                      <span className="block h-px w-0 bg-white transition-all duration-200 group-hover:w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 text-sm font-normal text-white/75 transition-all duration-200 hover:text-white"
                  >
                    <span className="block h-px w-0 bg-white transition-all duration-200 group-hover:w-4" />
                    הצעת מחיר
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 — Contact box */}
            <div className="text-right">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                יצירת קשר
              </h3>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm lg:p-8">
                <p className="text-base font-semibold text-white">
                  {siteConfig.name}
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  <a
                    href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
                    className="group flex items-center justify-end gap-3 text-sm font-normal text-white/75 transition-all duration-200 hover:text-white"
                  >
                    <span className="text-right">{siteConfig.phone}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all duration-200 group-hover:bg-white/20">
                      <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </a>

                  <div className="border-t border-white/10" />

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center justify-end gap-3 text-sm font-normal text-white/75 transition-all duration-200 hover:text-white"
                  >
                    <span className="break-all text-right">{siteConfig.email}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all duration-200 group-hover:bg-white/20">
                      <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </a>
                </div>

                <Link
                  href="/contact"
                  className="btn-cta mt-6 flex w-full items-center justify-center rounded-xl bg-white/15 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/25"
                >
                  שלחו לנו הודעה &#171;&#171;
                </Link>
              </div>
            </div>

          </div>
        </Container>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10">
          <Container className="py-5">
            <p className="text-center text-xs font-normal text-white/50">
              © {year}&nbsp;{siteConfig.name} פרסום. כל הזכויות שמורות.
            </p>
          </Container>
        </div>

      </footer>
    </>
  );
}
