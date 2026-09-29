"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import { 
  Clock, 
  MapPin, 
  Shirt, 
  Footprints, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Coffee
} from "lucide-react";

interface FirstTrainingGuideProps {
  id?: string;
}

export function FirstTrainingGuide({ id = "forste-trening" }: FirstTrainingGuideProps) {
  const { t } = useLanguage();

  return (
    <section id={id} className="py-14 sm:py-20 md:py-24 bg-muted/15 text-foreground border-b border-border/40 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{t.forsteTrening.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-tight mb-4">
            {t.forsteTrening.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            {t.forsteTrening.subtitle}
          </p>
        </div>

        {/* 4-Step Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* STEP 1: Oppmøte */}
          <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-black flex items-center justify-center border border-primary/25">
                  1
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{t.forsteTrening.badgeArrival}</span>
                </div>
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
                {t.forsteTrening.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {t.forsteTrening.step1Desc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border/40 text-xs font-semibold text-primary">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{t.forsteTrening.step1Highlight}</span>
            </div>
          </div>

          {/* STEP 2: Bekledning */}
          <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-black flex items-center justify-center border border-primary/25">
                  2
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                  <Shirt className="w-3.5 h-3.5 text-primary" />
                  <span>{t.forsteTrening.badgeClothing}</span>
                </div>
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
                {t.forsteTrening.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.forsteTrening.step2Desc}
              </p>
            </div>
          </div>

          {/* STEP 3: Matter & Skotøy */}
          <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-black flex items-center justify-center border border-primary/25">
                  3
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                  <Footprints className="w-3.5 h-3.5 text-primary" />
                  <span>{t.forsteTrening.badgeFootwear}</span>
                </div>
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
                {t.forsteTrening.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {t.forsteTrening.step3Desc}
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="font-semibold text-foreground text-xs">{t.forsteTrening.step3BarefootTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.forsteTrening.step3BarefootDesc}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="font-semibold text-foreground text-xs">{t.forsteTrening.step3ShoesTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.forsteTrening.step3ShoesDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Låneutstyr & Trygghet */}
          <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-black flex items-center justify-center border border-primary/25">
                  4
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Låneutstyr</span>
                </div>
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2">
                {t.forsteTrening.step4Title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.forsteTrening.step4Desc}
              </p>
            </div>
          </div>

        </div>

        {/* Dedicated Parents Lounge Feature Card */}
        <div className="mb-12 sm:mb-16 bg-card border border-primary/20 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0">
            <Coffee className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">
                {t.forsteTrening.parentsLoungeTitle}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Peisestue
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t.forsteTrening.parentsLoungeDesc}
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
              {t.forsteTrening.actionCardTitle}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t.forsteTrening.actionCardDesc}
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <ProveukeModal 
              trigger={
                <Button
                  size="lg"
                  spring={true}
                  className="w-full sm:w-auto h-13 px-8 text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20"
                >
                  <span>{t.forsteTrening.actionCardCta}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              }
            />
          </div>
        </div>

      </div>
    </section>
  );
}
