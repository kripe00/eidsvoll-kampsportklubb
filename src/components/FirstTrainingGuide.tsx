"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import { 
  Clock, 
  MapPin, 
  Shirt, 
  Droplet, 
  Footprints, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
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
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {t.forsteTrening.step2Desc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border/40 text-xs font-semibold text-primary">
              <Droplet className="w-4 h-4 shrink-0" />
              <span>{t.forsteTrening.step2Highlight}</span>
            </div>
          </div>

          {/* STEP 3: Fottøyregler (High Visibility Highlight - spans 2 cols on md+) */}
          <div className="md:col-span-2 bg-card border-2 border-primary/30 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-black flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  {t.forsteTrening.step3FootwearBadge}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t.forsteTrening.badgeFootwear}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground mb-2">
              {t.forsteTrening.step3Title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {t.forsteTrening.step3Desc}
            </p>

            {/* Split Footwear Rule Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mat Sports: Barefoot */}
              <div className="p-4 sm:p-5 rounded-xl bg-muted/40 border border-border/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {t.forsteTrening.step3BarefootTitle}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.forsteTrening.step3BarefootDesc}
                </p>
              </div>

              {/* Crosstrening: Indoor Shoes */}
              <div className="p-4 sm:p-5 rounded-xl bg-muted/40 border border-border/80">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {t.forsteTrening.step3ShoesTitle}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.forsteTrening.step3ShoesDesc}
                </p>
              </div>
            </div>
          </div>

          {/* STEP 4: Låneutstyr & Trygghet (spans 2 cols on md+) */}
          <div className="md:col-span-2 bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-full bg-primary/15 text-primary text-sm font-black flex items-center justify-center border border-primary/25">
                  4
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  {t.forsteTrening.step4Title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {t.forsteTrening.step4Desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t.forsteTrening.step4Highlight}</span>
              </div>
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

      </div>
    </section>
  );
}
