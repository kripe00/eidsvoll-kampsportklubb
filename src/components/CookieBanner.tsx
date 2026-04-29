"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: "granted" | "denied") => {
    localStorage.setItem("cookieConsent", status);
    setIsVisible(false);
    
    // Dispatch custom event to notify AnalyticsWrapper
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: status }));
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-6 left-6 z-[100] max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-500",
    )}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-black tracking-tight text-foreground uppercase italic">
              Vi bryr oss om <span className="text-primary not-italic">ditt personvern</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
            Vi bruker informasjonskapsler (cookies) for å forstå hvordan nettsiden brukes, 
            slik at vi kan forbedre brukeropplevelsen for våre medlemmer. 
            Vi deler aldri data med tredjeparter for annonsering.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => handleConsent("granted")}
            className="flex-1 bg-primary text-white font-bold uppercase tracking-tight h-11"
          >
            Aksepter alle
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleConsent("denied")}
            className="flex-1 text-muted-foreground hover:text-foreground hover:bg-slate-50 font-medium text-xs tracking-tight h-11"
          >
            Kun nødvendige
          </Button>
        </div>
      </div>
    </div>
  );
}
