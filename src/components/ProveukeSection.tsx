"use client";

import { ProveukeModal } from "./ProveukeModal";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Activity, Dumbbell, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ProveukeSection() {
  const { t, locale } = useLanguage();

  return (
    <section id="proveuke" className="py-24 bg-muted/20 text-foreground border-y border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-3">
            {t.proveuke.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-6">
            {t.proveuke.title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t.proveuke.description}
          </p>
        </div>

        {/* 4 Sport Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: BJJ */}
          <div className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/40 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-foreground mb-2 tracking-tight">
              BJJ (Jiu-Jitsu)
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {locale === "uk"
                ? "Офіційний клуб Checkmat. Gi та no-gi для дітей, молоді та дорослих."
                : locale === "pl"
                ? "Oficjalny klub Checkmat. Gi oraz no-gi dla dzieci, młodzieży i dorosłych."
                : locale === "en"
                ? "Official Checkmat team. Both gi and no-gi for kids, youth, and adults."
                : "Offisiell Checkmat-klubb. Både gi og no-gi for barn, ungdom og voksne."}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
              {t.proveuke.card1Title}
            </span>
          </div>

          {/* Card 2: Muay Thai */}
          <div className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/40 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-foreground mb-2 tracking-tight">
              Muay Thai
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {locale === "uk"
                ? "Тайський бокс з акцентом на техніку, силу та витривалість."
                : locale === "pl"
                ? "Strukturalny boks tajski z naciskiem na technikę, siłę i kondycję."
                : locale === "en"
                ? "Structured thaiboxing focusing on technique, power, and cardio endurance."
                : "Strukturert thaiboksing med fokus på teknikk, styrke og kondisjon."}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
              {t.proveuke.card2Title}
            </span>
          </div>

          {/* Card 3: Crosstrening */}
          <div className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/40 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-foreground mb-2 tracking-tight">
              {locale === "uk" ? "Крос-тренінг" : locale === "pl" ? "Trening siłowy" : locale === "en" ? "Cross Training" : "Crosstrening"}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {locale === "uk"
                ? "Функціональна сила та витривалість для будь-якого рівня."
                : locale === "pl"
                ? "Funkcjonalna siła i wytrzymałość dostosowana do każdego poziomu."
                : locale === "en"
                ? "Functional strength and conditioning tailored to each individual level."
                : "Funksjonell styrke og utholdenhet tilpasset eget nivå i eget sal."}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
              {t.proveuke.card3Title}
            </span>
          </div>

          {/* Card 4: Yoga */}
          <div className="bg-card border border-border/60 rounded-xl p-6 hover:border-primary/40 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-foreground mb-2 tracking-tight">
              Yinsaya Yoga
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {locale === "uk"
                ? "Гнучкість та відновлення для розвитку рухливості та запобігання травмам."
                : locale === "pl"
                ? "Mobilność i regeneracja budująca elastyczność i zapobiegająca kontuzjom."
                : locale === "en"
                ? "Mobility and recovery that builds flexibility and prevents injuries."
                : "Bevegelighet og restitusjon som bygger smidighet og forebygger skader."}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
              {t.proveuke.card3Title}
            </span>
          </div>

        </div>

        {/* Action Box matching site design */}
        <div className="bg-card border border-border/60 rounded-2xl p-8 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h4 className="text-xl font-bold text-foreground mb-1">
              {locale === "uk"
                ? "Бажаєте спробувати бойові мистецтва з нами?"
                : locale === "pl" 
                ? "Chcesz spróbować sztuk walki z nami?" 
                : locale === "en" 
                ? "Want to try martial arts with us?" 
                : "Ønsker du å prøve kampsport hos oss?"}
            </h4>
            <p className="text-muted-foreground text-xs">
              {locale === "uk"
                ? "Запишіться на безкоштовний пробний період, щоб отримати підтвердження та розклад."
                : locale === "pl"
                ? "Zapisz się na bezpłatny okres próbny, aby otrzymać potwierdzenie i grafik."
                : locale === "en"
                ? "Sign up for a free trial to receive confirmation and schedule details."
                : "Meld deg på for uforpliktende prøveperiode for å motta bekreftelse og timeplaninformasjon."}
            </p>
          </div>
          <div className="shrink-0">
            <ProveukeModal 
              trigger={
                <Button className="font-bold px-7 py-6 text-sm rounded-lg uppercase tracking-wider">
                  {t.proveuke.ctaButton}
                </Button>
              } 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
