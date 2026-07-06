"use client";

import { useEffect } from "react";

/**
 * Invisible component: mounts on the homepage and smoothly scrolls
 * to the #services section after a 2-second delay (letting the Hero
 * animation finish first).
 */
export function AutoScroll() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
