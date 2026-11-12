"use client";

import { useRef, type ReactNode } from "react";
import { revealOnScroll } from "@/lib/animations/gsap";
import { useGsapEffect } from "@/lib/animations/hooks";

/**
 * Wraps content in a scroll-triggered fade-and-rise. Content is fully visible
 * for reduced-motion users (the helper returns early without touching styles).
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapEffect(ref, (el) => revealOnScroll(el, { delay }), [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
