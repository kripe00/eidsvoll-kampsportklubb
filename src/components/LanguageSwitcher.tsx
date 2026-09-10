"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/types";
import { ChevronDown, Globe } from "lucide-react";

interface LanguageOption {
  code: Locale;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

export function LanguageSwitcher({ className = "", isMobile = false }: { className?: string; isMobile?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div className={`flex items-center gap-2 pt-3 border-t border-border/40 ${className}`}>
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5 mr-2">
          <Globe className="w-3.5 h-3.5" />
          Språk / Language:
        </span>
        <div className="flex items-center gap-1.5">
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.code.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-background/80 hover:bg-muted text-foreground text-xs font-bold transition-all"
        aria-label="Velg språk / Choose language"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="tracking-wider">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase">{lang.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
