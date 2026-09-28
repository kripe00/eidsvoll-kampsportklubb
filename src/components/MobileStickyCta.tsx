"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ProveukeModal } from "./ProveukeModal";
import { ArrowRight, Sparkles } from "lucide-react";

export function MobileStickyCta() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const isPastHero = window.scrollY > 350;
      setVisible(isPastHero);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const rafId = window.requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-4 right-[84px] sm:right-[88px] md:hidden z-30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <ProveukeModal
        trigger={
          <button
            type="button"
            className="w-full h-14 px-4 rounded-2xl bg-gradient-to-r from-primary via-primary to-blue-600 text-primary-foreground font-extrabold text-xs sm:text-sm shadow-xl shadow-primary/30 border border-white/15 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
            aria-label={t.stickyCta.ariaLabel}
          >
            <span className="flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 shrink-0 text-white animate-pulse" />
              <span className="truncate">{t.stickyCta.text}</span>
            </span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        }
      />
    </div>
  );
}
