import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems, siteConfig } from "@/lib/site";

function PantherLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${siteConfig.name} — דף הבית`}
    >
      {/* Text: RTL — name on right, tagline below */}
      <div className="flex flex-col items-end leading-none">
        <span className="text-2xl font-black tracking-wide text-accent">
          {siteConfig.name}
        </span>
        <span className="mt-0.5 text-[11px] font-medium tracking-widest text-accent/60">
          {siteConfig.tagline}
        </span>
      </div>

      {/* Panther icon — simplified big-cat face silhouette */}
      <svg
        viewBox="0 0 44 44"
        className="h-10 w-10 shrink-0 text-accent"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Left ear */}
        <path d="M9 17 C9 13 12 5 16 6 C13 10 13 15 13 17 Z" />
        {/* Right ear */}
        <path d="M35 17 C35 13 32 5 28 6 C31 10 31 15 31 17 Z" />
        {/* Head */}
        <ellipse cx="22" cy="24" rx="14" ry="13" />
        {/* Eyes — darker cutouts */}
        <ellipse cx="16" cy="21" rx="2.8" ry="3.2" fill="#080808" />
        <ellipse cx="28" cy="21" rx="2.8" ry="3.2" fill="#080808" />
        {/* Muzzle */}
        <ellipse cx="22" cy="29" rx="5" ry="3.5" fill="#080808" opacity="0.35" />
        {/* Nose tip */}
        <ellipse cx="22" cy="28" rx="2" ry="1.5" fill="#080808" opacity="0.6" />
      </svg>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-md">
      <Container>
        {/*
          RTL flex layout:
          first child → RIGHT (Logo)
          middle child → CENTER (Nav)
          last child → LEFT (CTA + MobileNav)
        */}
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo — RIGHT in RTL */}
          <PantherLogo />

          {/* Nav — CENTER (desktop only) */}
          <nav className="hidden lg:block" aria-label="ניווט ראשי">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Mobile Toggle — LEFT in RTL */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center rounded-full border border-accent px-5 py-2.5 text-sm font-bold text-accent transition-all hover:bg-accent hover:text-white lg:inline-flex"
            >
              להצעת מחיר &#171;&#171;
            </Link>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
