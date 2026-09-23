import { useEffect, useRef } from "react";
import { animate, spring, stagger, remove } from "animejs";

/**
 * Checks whether the user has requested reduced motion.
 * Always returns false in SSR/Node environments safely.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface SpringEasingFunction {
  (t: number): number;
  solve: (t: number) => number;
  solverDuration: number;
  settlingDuration: number;
}

/**
 * Creates a spring easing function that preserves explicit animation duration
 * instead of having Anime.js v4 override duration with settlingDuration.
 */
export function createSpringEase(bounce: number, duration: number): SpringEasingFunction {
  const s = spring({ bounce, duration });
  const easeFn = (t: number) => (t === 0 || t === 1 ? t : s.solve(t * s.solverDuration));
  easeFn.solve = (t: number) => s.solve(t);
  easeFn.solverDuration = s.solverDuration;
  easeFn.settlingDuration = s.settlingDuration;
  return easeFn;
}

/**
 * Athletic spring configuration tailored for martial arts energy:
 * Snappy, punchy, and responsive (400ms - 550ms, balanced bounce).
 */
export const ATHLETIC_SPRING = createSpringEase(0.28, 520);
export const BUTTON_SPRING = createSpringEase(0.45, 340);

/**
 * Cleans up inline transform and opacity styles so Tailwind hover effects
 * and responsive layout stay completely unaffected once animations complete.
 */
export function cleanAnimationStyles(element: HTMLElement | null) {
  if (!element) return;
  element.style.removeProperty("transform");
  element.style.removeProperty("opacity");
  element.style.removeProperty("will-change");
}

const activeSpringElements = new WeakMap<HTMLElement, { originalTransition: string }>();

/**
 * Tactile spring micro-interaction for CTA button presses/clicks.
 * Gives immediate physical feedback matching the punchy martial arts style.
 * Safely handles rapid repeated presses without corrupting CSS transitions.
 */
export function triggerButtonSpring(target: HTMLElement | null) {
  if (!target || prefersReducedMotion()) return;
  if (
    target.hasAttribute("disabled") ||
    target.getAttribute("aria-disabled") === "true"
  ) {
    return;
  }

  // If a spring is already running on this element, cancel it without losing the original transition
  const existing = activeSpringElements.get(target);
  let originalTransition = "";
  if (existing) {
    remove(target);
    originalTransition = existing.originalTransition;
  } else {
    originalTransition = target.style.transition;
    activeSpringElements.set(target, { originalTransition });
  }

  // Temporarily clear inline transition so CSS doesn't fight rAF updates
  target.style.transition = "none";
  target.style.willChange = "transform";

  animate(target, {
    scale: [0.96, 1],
    duration: 320,
    ease: BUTTON_SPRING,
    onComplete: () => {
      const state = activeSpringElements.get(target);
      if (state) {
        if (state.originalTransition) {
          target.style.transition = state.originalTransition;
        } else {
          target.style.removeProperty("transition");
        }
        activeSpringElements.delete(target);
      } else {
        target.style.removeProperty("transition");
      }
      target.style.removeProperty("transform");
      target.style.removeProperty("will-change");
    },
  });
}

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  onReveal: (element: HTMLElement, isReducedMotion: boolean) => (() => void) | void;
}

/**
 * Intersection Observer hook for scroll-triggered entrance choreography.
 * Triggers cleanly once when scrolled into view, respecting prefers-reduced-motion.
 * Automatically cleans up in-flight animations on unmount.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  onReveal,
}: ScrollRevealOptions) {
  const elementRef = useRef<T | null>(null);
  const onRevealRef = useRef(onReveal);
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const isReduced = prefersReducedMotion();

    if (isReduced) {
      // With reduced motion, trigger reveal immediately with no-motion flag
      cleanupRef.current = onRevealRef.current(el, true);
      return () => {
        cleanupRef.current?.();
      };
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      cleanupRef.current = onRevealRef.current(el, false);
      return () => {
        cleanupRef.current?.();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            cleanupRef.current = onRevealRef.current(entry.target as HTMLElement, false);
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanupRef.current?.();
    };
  }, [threshold, rootMargin, once]);

  return elementRef;
}

export { animate, spring, stagger, remove };
