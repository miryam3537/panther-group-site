"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
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

        {/* ── Main content: 2 columns + CTA ── */}
        <Container className="py-16 lg:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20">

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

              {/* CTA button — scrolls to contact form */}
              <Link
                href="/#contact"
                className="btn-cta mt-8 inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
              >
                שלחו לנו הודעה &#171;&#171;
              </Link>
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
