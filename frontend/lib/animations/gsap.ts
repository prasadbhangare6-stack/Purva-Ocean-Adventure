"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP animation utilities. Use GSAP selectively: scroll reveals, text entrance,
 * image reveal and the preloader. Simple hover/focus transitions stay in CSS.
 *
 * Every helper:
 *  - returns early when the user prefers reduced motion (content stays visible),
 *  - returns a cleanup function so components can unmount safely,
 *  - animates only transform/opacity/clip-path for performance.
 */

let registered = false;

export function registerGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const EASE = "power3.out";

/** Fade and rise an element (or children) into place when it enters the viewport. */
export function revealOnScroll(target: Element | Element[], options: { delay?: number; stagger?: number } = {}) {
  if (prefersReducedMotion()) return () => {};
  registerGsap();

  const tween = gsap.fromTo(
    target,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      scrollTrigger: { trigger: target, start: "top 85%", once: true },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Line-by-line text entrance (pass already-split element nodes). */
export function textEntrance(target: Element | Element[], options: { delay?: number } = {}) {
  if (prefersReducedMotion()) return () => {};
  registerGsap();

  const tween = gsap.fromTo(
    target,
    { opacity: 0, yPercent: 40 },
    { opacity: 1, yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.08, delay: options.delay ?? 0 },
  );
  return () => tween.kill();
}

/** Image reveal using a clip-path wipe. Pairs with ImageContainer. */
export function imageReveal(target: Element, options: { delay?: number } = {}) {
  if (prefersReducedMotion()) return () => {};
  registerGsap();

  const tween = gsap.fromTo(
    target,
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.4,
      ease: "expo.out",
      delay: options.delay ?? 0,
      scrollTrigger: { trigger: target, start: "top 88%", once: true },
    },
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Subtle scale-down on the image of a card when it is hovered (desktop pointers only). */
export function cardHoverScale(target: Element) {
  if (prefersReducedMotion()) return () => {};
  registerGsap();
  const enter = () => gsap.to(target, { scale: 1.04, duration: 0.8, ease: EASE });
  const leave = () => gsap.to(target, { scale: 1, duration: 0.8, ease: EASE });
  target.addEventListener("pointerenter", enter);
  target.addEventListener("pointerleave", leave);
  return () => {
    target.removeEventListener("pointerenter", enter);
    target.removeEventListener("pointerleave", leave);
    gsap.killTweensOf(target);
  };
}
