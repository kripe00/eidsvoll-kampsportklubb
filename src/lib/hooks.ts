"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Registers a window keydown listener for the Escape key while `enabled` is true.
 */
export function useEscapeKey(enabled: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onEscape]);
}

/**
 * Observes an element with IntersectionObserver and tracks whether it is in the viewport.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {
    threshold: 0.3,
    rootMargin: "-50px 0px -50px 0px",
  }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
