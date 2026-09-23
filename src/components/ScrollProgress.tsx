"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

/**
 * Sleek, GPU-accelerated scroll progression bar.
 * Uses native CSS scroll-driven animation where supported (120fps compositor thread),
 * paired with a rock-solid requestAnimationFrame JS fallback for full cross-browser support.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId: number | null = null;

    const calculateProgress = () => {
      const el = document.scrollingElement || document.documentElement;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        el.scrollTop ||
        (document.body ? document.body.scrollTop : 0) ||
        0;
      const scrollHeight = Math.max(
        el.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body ? document.body.scrollHeight : 0
      );
      const clientHeight = window.innerHeight || el.clientHeight || 0;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        return 0;
      }

      return Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    };

    const updateBar = () => {
      rafId = null;
      if (!bar) return;
      const progress = calculateProgress();
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateBar);
      }
    };

    // Calculate immediately on mount or route update
    updateBar();

    // Re-verify after navigation scroll reset / layout settlement
    const settleTimeout1 = setTimeout(updateBar, 100);
    const settleTimeout2 = setTimeout(updateBar, 300);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    document.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("load", onScrollOrResize, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        onScrollOrResize();
      });
      if (document.documentElement) {
        resizeObserver.observe(document.documentElement);
      }
      if (document.body) {
        resizeObserver.observe(document.body);
      }
    }

    return () => {
      clearTimeout(settleTimeout1);
      clearTimeout(settleTimeout2);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      document.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", onScrollOrResize);
      resizeObserver?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute bottom-0 left-0 right-0 h-[3.5px] w-full bg-slate-900/10 dark:bg-white/10 pointer-events-none select-none z-50 overflow-hidden",
        className
      )}
    >
      <div
        ref={barRef}
        className="scroll-progress-fill h-full w-full bg-gradient-to-r from-blue-600 via-primary to-cyan-400 will-change-transform shadow-[0_0_10px_rgba(59,130,246,0.9),0_0_4px_rgba(34,211,238,0.9)]"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "0% 50%",
        }}
      />
    </div>
  );
}
