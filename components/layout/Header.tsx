import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems, siteConfig } from "@/lib/site";

function PantherLogo() {
  return (
    <Link href="/" aria-label={`${siteConfig.name} — דף הבית`}>
      <Image
        src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
        alt={siteConfig.name}
        width={280}
        height={168}
        className="h-20 w-auto object-contain lg:h-24"
        priority
      />
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
        <div className="flex h-20 items-center justify-between lg:h-24">
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
