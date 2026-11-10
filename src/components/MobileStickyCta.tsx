"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ProveukeModal } from "./ProveukeModal";
import { ArrowRight } from "lucide-react";

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
            className="w-full h-14 px-4 rounded-xl bg-slate-950 text-white font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl border border-white/15 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
            aria-label={t.stickyCta.ariaLabel}
          >
            <span className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="truncate">{t.stickyCta.text}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 ml-2" />
          </button>
        }
      />
    </div>
  );
}
