"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Phone, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { navItems, siteConfig } from "@/lib/site";

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
        fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center
        rounded-full bg-accent text-white shadow-lg
        transition-all duration-300 hover:bg-orange-600 hover:scale-110 active:scale-95
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <BackToTop />

      <footer className="bg-accent" dir="rtl" role="contentinfo">
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 lg:gap-12">

            {/* Col 1 — Logo */}
            <div className="flex flex-col items-start gap-2">
              <Link href="/" aria-label={`${siteConfig.name} — דף הבית`}>
                <Image
                  src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
                  alt={siteConfig.name}
                  width={280}
                  height={168}
                  className="h-20 w-auto object-contain lg:h-24"
                />
              </Link>
              <p className="text-xs text-white/60">{siteConfig.tagline}</p>
            </div>

            {/* Col 2 — Nav */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                ניווט
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contact */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                צור קשר
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="py-4">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between" dir="rtl">
              <p className="text-xs text-white/40">
                © {year} {siteConfig.name} פרסום. כל הזכויות שמורות.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  מדיניות פרטיות
                </Link>
                <span className="text-white/20">·</span>
                <Link
                  href="/accessibility"
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  הצהרת נגישות
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
