"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }

    const handleOpen = () => {
      setIsVisible(true);
    };

    window.addEventListener("openCookieBanner", handleOpen);
    return () => window.removeEventListener("openCookieBanner", handleOpen);
  }, []);

  const handleConsent = (status: "granted" | "denied") => {
    localStorage.setItem("cookieConsent", status);
    setIsVisible(false);
    
    // Dispatch custom event to notify AnalyticsWrapper and any listeners
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: status }));
  };

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies / Informasjonskapsler"
      className={cn(
        "fixed bottom-6 left-6 z-[100] max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-500",
      )}
    >
      <div className="bg-card rounded-2xl shadow-2xl border border-border/60 p-6 md:p-8 space-y-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-black tracking-tight text-foreground uppercase">
              Cookies & <span className="text-primary">Personvern</span>
            </h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed font-light">
            {t.cookie.text}
          </p>
          <div>
            <Link
              href="/personvern"
              onClick={() => setIsVisible(false)}
              className="text-xs text-primary hover:underline font-medium inline-block"
            >
              {t.cookie.readMore} &rarr;
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => handleConsent("granted")}
            className="flex-1 bg-primary text-white font-bold uppercase tracking-tight text-xs h-10"
          >
            {t.cookie.accept}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConsent("denied")}
            className="flex-1 text-muted-foreground hover:text-foreground font-medium text-xs tracking-tight h-10"
          >
            {t.cookie.decline}
          </Button>
        </div>
      </div>
    </div>
  );
}
