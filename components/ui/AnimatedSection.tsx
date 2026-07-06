"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
  /** Trigger only once (default: true) */
  once?: boolean;
  as?: React.ElementType;
}

/**
 * Wraps any block in a scroll-triggered entrance animation.
 * Defaults to a subtle fade-up. Pass custom `variants` for other effects.
 */
export function AnimatedSection({
  children,
  className,
  variants = fadeUp,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  const MotionTag = motion(Tag as "div");

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}
