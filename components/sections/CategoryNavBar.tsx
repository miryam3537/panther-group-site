"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { services } from "@/lib/site";

export function CategoryNavBar() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  function handleEnter(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    setHoveredId(id);
    const el = e.currentTarget;
    const parent = navRef.current;
    if (!parent) return;
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - parentRect.left,
      width: elRect.width,
    });
  }

  return (
    <div className="relative border-b border-white/8 bg-[#0a0a0a]">
      <Container>
        <div className="flex items-center justify-between gap-3 py-2.5">

          {/* CTA — LEFT in RTL */}
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-accent px-5 py-2 text-xs font-bold text-white shadow-md shadow-accent/30 transition-all duration-150 hover:bg-accent-hover active:scale-95"
          >
            להצעת מחיר &#171;&#171;
          </Link>

          {/* Category pills — RIGHT in RTL, scrollable on mobile */}
          <div
            ref={navRef}
            className="relative flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto"
            onMouseLeave={() => setHoveredId(null)}
            style={{ scrollbarWidth: "none" }}
          >
            {/* Sliding highlight pill */}
            <span
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-accent/15 transition-all duration-200 ease-out"
              style={{
                left: pillStyle.left,
                width: hoveredId ? pillStyle.width : 0,
                height: "calc(100% - 4px)",
                opacity: hoveredId ? 1 : 0,
              }}
              aria-hidden="true"
            />

            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                onMouseEnter={(e) => handleEnter(e, service.id)}
                className={`
                  relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold
                  transition-all duration-150
                  active:scale-95
                  ${
                    hoveredId === service.id
                      ? "text-accent"
                      : "text-white/55 hover:text-accent"
                  }
                `}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Left fade mask — indicates more items on mobile */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
