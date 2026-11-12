"use client";

import { useEffect, useState, type RefObject } from "react";

/** Tracks the user's reduced-motion preference and updates live if it changes. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Runs a GSAP setup function against a ref and cleans up on unmount.
 * The setup function must return a cleanup function (see lib/animations/gsap.ts).
 */
export function useGsapEffect(
  ref: RefObject<Element | null>,
  setup: (el: Element) => (() => void) | void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cleanup = setup(el);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
