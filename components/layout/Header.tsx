"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/95 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-lg"
          : "border-border/50 bg-background/90 backdrop-blur-md",
      ].join(" ")}
    >
      <Container>
        <div
          className={[
            "flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14 lg:h-16" : "h-20 lg:h-24",
          ].join(" ")}
        >
          {/* Logo — RIGHT in RTL */}
          <Link href="/" aria-label={`${siteConfig.name} — דף הבית`}>
            <Image
              src="https://gwyeuaywrngqnkpfdecc.supabase.co/storage/v1/object/public/HOMEPAJE/LOGO5.png"
              alt={siteConfig.name}
              width={280}
              height={168}
              className={[
                "w-auto object-contain transition-all duration-300",
                scrolled ? "h-12 lg:h-14" : "h-20 lg:h-24",
              ].join(" ")}
              priority
            />
          </Link>

          {/* Nav — CENTER (desktop only) */}
          <nav className="hidden lg:block" aria-label="ניווט ראשי">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "text-base font-medium transition-colors",
                        isActive
                          ? "text-accent border-b-2 border-accent pb-0.5"
                          : "text-muted hover:text-accent",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + Mobile Toggle — LEFT in RTL */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center rounded-full border border-accent px-5 py-2.5 text-base font-bold text-accent transition-all hover:bg-accent hover:text-white lg:inline-flex"
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
