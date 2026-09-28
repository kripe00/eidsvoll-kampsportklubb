"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { 
  Compass, 
  ShieldCheck, 
  Activity, 
  Dumbbell, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  ChevronRight, 
  User, 
  Users, 
  Baby, 
  Flame, 
  Calendar 
} from "lucide-react";

interface SportSelectorProps {
  id?: string;
}

type AgeChoice = "voksen" | "barn_6_9" | "barn_10_13";

export function SportSelector({ id = "finn-kampsport" }: SportSelectorProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAge, setSelectedAge] = useState<AgeChoice | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const resetQuiz = () => {
    setStep(1);
    setSelectedAge(null);
    setSelectedGoal(null);
  };

  const handleSelectAge = (age: AgeChoice) => {
    setSelectedAge(age);
    setSelectedGoal(null);
    setStep(2);
  };

  const handleSelectGoal = (goal: string) => {
    setSelectedGoal(goal);
    setStep(3);
  };

  // Determine recommendation key, category, and discipline
  const getRecommendation = () => {
    if (selectedAge === "barn_6_9") {
      const category = "Barneparti 1 (6-9 år)";
      if (selectedGoal === "allround") {
        return {
          rec: t.veiviser.recommendations.kidsCombo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
          icon: <Baby className="w-8 h-8 text-primary" />,
        };
      }
      return {
        rec: t.veiviser.recommendations.kidsBjj,
        category,
        discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
        footwear: "barbent",
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      };
    }

    if (selectedAge === "barn_10_13") {
      const category = "Barneparti 2 (10-13 år)";
      if (selectedGoal === "disiplin" || selectedGoal === "striking") {
        return {
          rec: t.veiviser.recommendations.kidsMuayThai,
          category,
          discipline: "Muay Thai / Thaiboksing",
          footwear: "barbent",
          icon: <Flame className="w-8 h-8 text-primary" />,
        };
      }
      if (selectedGoal === "allround") {
        return {
          rec: t.veiviser.recommendations.kidsCombo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
          icon: <Users className="w-8 h-8 text-primary" />,
        };
      }
      return {
        rec: t.veiviser.recommendations.kidsBjj,
        category,
        discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
        footwear: "barbent",
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      };
    }

    // Adult / Youth (14+)
    const category = "Voksen / Ungdom (fra 14 år)";
    switch (selectedGoal) {
      case "striking":
        return {
          rec: t.veiviser.recommendations.muayThai,
          category,
          discipline: "Muay Thai / Thaiboksing",
          footwear: "barbent",
          icon: <Activity className="w-8 h-8 text-primary" />,
        };
      case "fitness":
        return {
          rec: t.veiviser.recommendations.crosstrening,
          category,
          discipline: "Crosstrening (CT)",
          footwear: "rene_innesko",
          icon: <Dumbbell className="w-8 h-8 text-primary" />,
        };
      case "bevegelighet":
        return {
          rec: t.veiviser.recommendations.yoga,
          category,
          discipline: "Yoga (Yinsaya Yoga)",
          footwear: "barbent",
          icon: <Sparkles className="w-8 h-8 text-primary" />,
        };
      case "combo":
        return {
          rec: t.veiviser.recommendations.combo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
          icon: <Compass className="w-8 h-8 text-primary" />,
        };
      case "selvforsvar":
      default:
        return {
          rec: t.veiviser.recommendations.bjj,
          category,
          discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
          footwear: "barbent",
          icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        };
    }
  };

  const recommendationData = step === 3 ? getRecommendation() : null;

  return (
    <section id={id} className="py-14 sm:py-20 md:py-24 bg-card/60 text-foreground border-b border-border/40 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>{t.veiviser.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-tight mb-3">
            {t.veiviser.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {t.veiviser.subtitle}
          </p>

          {/* Step Progress Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? "w-10 bg-primary" : "w-6 bg-muted"}`} />
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? "w-10 bg-primary" : "w-6 bg-muted"}`} />
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 3 ? "w-10 bg-primary" : "w-6 bg-muted"}`} />
          </div>
        </div>

        {/* STEP 1: Age Selection */}
        {step === 1 && (
          <div className="space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t.veiviser.stepIndicator.replace("{current}", "1").replace("{total}", "2")}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                {t.veiviser.step1Title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                {t.veiviser.step1Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <button
                type="button"
                onClick={() => handleSelectAge("voksen")}
                className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {t.veiviser.ageAdultTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {t.veiviser.ageAdultDesc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectAge("barn_6_9")}
                className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {t.veiviser.ageKids1Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {t.veiviser.ageKids1Desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectAge("barn_10_13")}
                className="group p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {t.veiviser.ageKids2Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {t.veiviser.ageKids2Desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Goal Selection */}
        {step === 2 && (
          <div className="space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t.veiviser.stepIndicator.replace("{current}", "2").replace("{total}", "2")}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                {t.veiviser.step2Title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                {t.veiviser.step2Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {selectedAge === "voksen" ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleSelectGoal("selvforsvar")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalSelfDefenseTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalSelfDefenseDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("striking")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalStrikingTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalStrikingDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("fitness")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalFitnessTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalFitnessDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("bevegelighet")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalFlexibilityTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalFlexibilityDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("combo")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalComboTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalComboDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleSelectGoal(selectedAge === "barn_6_9" ? "leken" : "selvforsvar")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalKidsPlayTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalKidsPlayDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("disiplin")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalKidsDisciplineTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalKidsDisciplineDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoal("allround")}
                    className="group p-4 sm:p-5 rounded-2xl bg-card border border-border/70 hover:border-primary/60 hover:bg-muted/30 transition-all text-left flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.veiviser.goalKidsAllroundTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t.veiviser.goalKidsAllroundDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-start">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
              >
                ← {t.veiviser.backButton}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Dynamic Recommendation Card */}
        {step === 3 && recommendationData && (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-card border-2 border-primary/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Top glow decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              {/* Recommendation Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-border/50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 shadow-inner">
                    {recommendationData.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block">
                      {t.veiviser.recommendationBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                      {recommendationData.rec.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-muted text-foreground border border-border/70">
                    {recommendationData.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                    {recommendationData.footwear === "rene_innesko"
                      ? t.veiviser.footwearIndoor
                      : t.veiviser.footwearBarefoot}
                  </span>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-3 mb-6">
                <p className="text-sm sm:text-base font-semibold text-primary">
                  {recommendationData.rec.tagline}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {recommendationData.rec.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="bg-muted/30 border border-border/60 rounded-2xl p-4 sm:p-5 mb-6 space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" />
                  {t.veiviser.benefitsTitle}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {recommendationData.rec.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule hint */}
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground mb-6 bg-background/50 border border-border/50 rounded-xl p-3">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">{t.veiviser.scheduleHintTitle}</strong> {recommendationData.rec.scheduleInfo}
                </span>
              </div>

              {/* All-access reassurance note */}
              <div className="text-xs text-muted-foreground bg-primary/5 border border-primary/15 rounded-xl p-3 mb-6 leading-relaxed">
                {t.veiviser.allAccessNote}
              </div>

              {/* CTA Action Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:flex-1">
                  <ProveukeModal
                    defaultDiscipline={recommendationData.discipline}
                    defaultCategory={recommendationData.category}
                    trigger={
                      <Button
                        size="lg"
                        spring={true}
                        className="w-full h-13 px-6 text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/25"
                      >
                        <span className="truncate">{t.veiviser.ctaButton}</span>
                        <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                      </Button>
                    }
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={resetQuiz}
                  className="w-full sm:w-auto h-13 px-5 text-xs sm:text-sm font-bold rounded-xl border-border/80 hover:bg-muted"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.veiviser.restartButton}
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
