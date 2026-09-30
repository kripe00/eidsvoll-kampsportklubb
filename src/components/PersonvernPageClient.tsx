"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ShieldCheck, Cookie, FileText, UserCheck, Mail, ArrowRight, Settings } from "lucide-react";
import { Button } from "./ui/button";

export function PersonvernPageClient() {
  const { t, locale } = useLanguage();
  const p = t.personvern;
  const [consentStatus, setConsentStatus] = useState<string | null>(null);

  useEffect(() => {
    const updateConsent = () => {
      if (typeof window !== "undefined") {
        setConsentStatus(localStorage.getItem("cookieConsent"));
      }
    };
    updateConsent();

    window.addEventListener("cookieConsentUpdated", updateConsent);
    return () => window.removeEventListener("cookieConsentUpdated", updateConsent);
  }, []);

  const handleOpenCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openCookieBanner"));
    }
  };

  const cookiesList = [
    {
      category: p.necessaryCategory,
      name: "cookieConsent",
      purpose: locale === "no"
        ? "Lagrer ditt samtykkevalg for informasjonskapsler."
        : locale === "en"
        ? "Stores your cookie consent choice."
        : locale === "pl"
        ? "Zapisuje Twój wybór dotyczący zgody na pliki cookie."
        : "Зберігає ваш вибір щодо файлів cookie.",
      expiry: "localStorage (1 år / year)",
      isNecessary: true,
    },
    {
      category: p.necessaryCategory,
      name: "locale",
      purpose: locale === "no"
        ? "Husker ditt valgte språk på nettsiden."
        : locale === "en"
        ? "Remembers your preferred language on the website."
        : locale === "pl"
        ? "Zapamiętuje wybrany przez Ciebie język strony."
        : "Запам'ятовує обрану вами мову сайту.",
      expiry: "localStorage",
      isNecessary: true,
    },
    {
      category: p.necessaryCategory,
      name: "ekk_chat_session_id",
      purpose: locale === "no"
        ? "Anonym identifikator for rate-limiting og spam-beskyttelse i chatten."
        : locale === "en"
        ? "Anonymous identifier for rate limiting and spam protection in chat."
        : locale === "pl"
        ? "Anonimowy identyfikator do ochrony przed spamem na czacie."
        : "Анонімний ідентифікатор для захисту від спаму в чаті.",
      expiry: "localStorage (30 min)",
      isNecessary: true,
    },
    {
      category: p.analyticsCategory,
      name: "_ga, _ga_*",
      purpose: locale === "no"
        ? "Google Analytics 4: Samler anonym, aggregert statistikk over besøk og sidevisninger for å forbedre nettsiden."
        : locale === "en"
        ? "Google Analytics 4: Collects anonymous, aggregated statistics on page visits to improve the website."
        : locale === "pl"
        ? "Google Analytics 4: Zbiera anonimowe, zagregowane statystyki odwiedzin w celu ulepszania strony."
        : "Google Analytics 4: Збирає анонімну, узагальнену статистику відвідувань для покращення сайту.",
      expiry: "2 år / years",
      isNecessary: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-muted/20 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>GDPR & ePrivacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            {p.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {p.subtitle}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-4 font-mono">
            {p.lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 max-w-4xl pt-12 space-y-12">
        
        {/* 1. Behandlingsansvarlig */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {p.controllerTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {p.controllerText}
          </p>
        </div>

        {/* 2. Informasjonskapsler (Cookies) */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {p.cookiesTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {p.cookiesIntro}
          </p>

          {/* Current Status Box */}
          <div className="bg-muted/40 border border-border/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                {p.currentConsentStatus}
              </span>
              <span className="text-sm font-black text-foreground">
                {consentStatus === "granted"
                  ? p.consentGranted
                  : consentStatus === "denied"
                  ? p.consentDenied
                  : p.consentNotSet}
              </span>
            </div>
            <Button
              onClick={handleOpenCookieSettings}
              variant="outline"
              size="sm"
              className="gap-2 font-bold text-xs rounded-lg border-primary/40 hover:bg-primary/10"
            >
              <Settings className="w-3.5 h-3.5" />
              {p.changeConsentButton}
            </Button>
          </div>

          {/* Cookies Table */}
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-muted/60 text-foreground font-bold border-b border-border/60">
                <tr>
                  <th className="p-3 sm:p-3.5">{p.cookieTableCategory}</th>
                  <th className="p-3 sm:p-3.5">{p.cookieTableName}</th>
                  <th className="p-3 sm:p-3.5">{p.cookieTablePurpose}</th>
                  <th className="p-3 sm:p-3.5">{p.cookieTableExpiry}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-muted-foreground">
                {cookiesList.map((c, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-3.5 font-medium whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${c.isNecessary ? "bg-slate-200 dark:bg-slate-800 text-foreground" : "bg-primary/10 text-primary"}`}>
                        {c.category}
                      </span>
                    </td>
                    <td className="p-3 sm:p-3.5 font-mono text-foreground whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="p-3 sm:p-3.5 leading-relaxed">
                      {c.purpose}
                    </td>
                    <td className="p-3 sm:p-3.5 whitespace-nowrap">
                      {c.expiry}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Kontaktskjema og prøveuke */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {p.formsTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {p.formsText}
          </p>
        </div>

        {/* 4. Dine rettigheter */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {p.rightsTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {p.rightsText}
          </p>
        </div>

        {/* 5. Kontaktinformasjon */}
        <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
              {p.contactTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
            {p.contactText}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:kontakt@kampsporteidsvoll.no"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              <span>kontakt@kampsporteidsvoll.no</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:+4797610229"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted/80 transition-colors"
            >
              <span>+47 976 10 229</span>
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
