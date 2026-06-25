import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-accent" role="contentinfo">
      <Container className="py-12 lg:py-16">
        {/*
          RTL 3-column grid:
          Col 1 (RIGHT)  → Logo + description
          Col 2 (CENTER) → Navigation links
          Col 3 (LEFT)   → Contact info box
        */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* ── Col 1: Logo + description ── */}
          <div className="text-right">
            <Link href="/" aria-label={`${siteConfig.name} — דף הבית`}>
              <span className="text-3xl font-black text-white">
                {siteConfig.name}
              </span>
              <p className="mt-0.5 text-sm font-medium text-white/70">
                {siteConfig.tagline}
              </p>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              {siteConfig.description}
            </p>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="text-right">
            <h3 className="text-sm font-bold text-white">ניווט</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 underline-offset-2 transition-colors hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/75 underline-offset-2 transition-colors hover:text-white hover:underline"
                >
                  הצעת מחיר
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 3: Contact info ── */}
          <div className="text-right">
            <h3 className="text-sm font-bold text-white">יצירת קשר</h3>
            <div className="mt-4 rounded-xl bg-black/25 p-4">
              <p className="text-sm font-semibold text-white">
                {siteConfig.name}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  טלפון:&nbsp;{siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  מייל:&nbsp;{siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/60">
          © {year}&nbsp;{siteConfig.name} פרסום. כל הזכויות שמורות.
        </div>
      </Container>
    </footer>
  );
}
