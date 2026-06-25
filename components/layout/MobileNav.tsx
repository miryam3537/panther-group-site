"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "סגור תפריט" : "פתח תפריט"}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-accent"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">{open ? "סגור תפריט" : "פתח תפריט"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background px-6 py-6"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-base text-muted transition-colors hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button href="/contact" className="w-full">
                בואו נדבר
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
