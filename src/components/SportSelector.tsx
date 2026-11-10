"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, RotateCcw, ChevronRight } from "lucide-react";

interface SportSelectorProps {
  id?: string;
}

type AgeChoice = "voksen" | "barn_6_9" | "barn_10_13";

export function SportSelector({ id = "finn-kampsport" }: SportSelectorProps) {
  const { t, locale } = useLanguage();
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

  const getRecommendation = () => {
    if (selectedAge === "barn_6_9") {
      const category = "Barneparti 1 (6-9 år)";
      if (selectedGoal === "allround") {
        return {
          rec: t.veiviser.recommendations.kidsCombo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
        };
      }
      return {
        rec: t.veiviser.recommendations.kidsBjj,
        category,
        discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
        footwear: "barbent",
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
        };
      }
      if (selectedGoal === "allround") {
        return {
          rec: t.veiviser.recommendations.kidsCombo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
        };
      }
      return {
        rec: t.veiviser.recommendations.kidsBjj,
        category,
        discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
        footwear: "barbent",
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
        };
      case "fitness":
        return {
          rec: t.veiviser.recommendations.crosstrening,
          category,
          discipline: "Crosstrening (CT)",
          footwear: "rene_innesko",
        };
      case "bevegelighet":
        return {
          rec: t.veiviser.recommendations.yoga,
          category,
          discipline: "Yoga (Yinsaya Yoga)",
          footwear: "barbent",
        };
      case "combo":
        return {
          rec: t.veiviser.recommendations.combo,
          category,
          discipline: "BJJ & Muay Thai (Begge kampsporter)",
          footwear: "barbent",
        };
      case "selvforsvar":
      default:
        return {
          rec: t.veiviser.recommendations.bjj,
          category,
          discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
          footwear: "barbent",
        };
    }
  };

  const recommendationData = step === 3 ? getRecommendation() : null;
  const cleanAllAccessNote = t.veiviser.allAccessNote.replace(/^💡\s*/, "");

  const disciplinesShowcase = [
    {
      num: "01",
      title: "Brasiliansk Jiu-Jitsu",
      subtitle:
        locale === "en"
          ? "Gi & No-Gi · Ground fighting & self-defense"
          : locale === "pl"
          ? "Gi & No-Gi · Walka w parterze i samoobrona"
          : locale === "uk"
          ? "Gi & No-Gi · Боротьба в партері та самооборона"
          : "Gi & No-Gi · Bakkekamp, teknikk & selvforsvar",
      desc: t.veiviser.recommendations.bjj.description,
      image: "/images/club/group-class.jpg",
      discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
      category: "Voksen / Ungdom (fra 14 år)",
      guideHref: "/forste-trening#bjj",
      meta:
        locale === "en"
          ? "Kids (6+) · Youth · Adults"
          : locale === "pl"
          ? "Dzieci (6+) · Młodzież · Dorośli"
          : locale === "uk"
          ? "Діти (6+) · Молодь · Дорослі"
          : "Barn (fra 6 år) · Ungdom · Voksne",
    },
    {
      num: "02",
      title: "Muay Thai",
      subtitle:
        locale === "en"
          ? "Thaiboxing · Striking & conditioning"
          : locale === "pl"
          ? "Boks tajski · Uderzenia i kondycja"
          : locale === "uk"
          ? "Тайський бокс · Удари та витривалість"
          : "Thaiboksing · Stående kampsport & kondisjon",
      desc: t.veiviser.recommendations.muayThai.description,
      image: "/images/club/sparring-action.jpg",
      discipline: "Muay Thai / Thaiboksing",
      category: "Voksen / Ungdom (fra 14 år)",
      guideHref: "/forste-trening#muay-thai",
      meta:
        locale === "en"
          ? "Beginners · Advanced · Kids"
          : locale === "pl"
          ? "Początkujący · Zaawansowani · Dzieci"
          : locale === "uk"
          ? "Початківці · Досвідчені · Діти"
          : "Nybegynner · Viderekomne · Barn",
    },
    {
      num: "03",
      title:
        locale === "en"
          ? "Cross Training & Yoga"
          : locale === "pl"
          ? "Crosstrening i Yoga"
          : locale === "uk"
          ? "Крос-тренінг та Йога"
          : "Crosstrening & Yoga",
      subtitle:
        locale === "en"
          ? "Functional strength, intervals & mobility"
          : locale === "pl"
          ? "Siła funkcjonalna, interwały i mobilność"
          : locale === "uk"
          ? "Функціональна сила, інтервали та мобільність"
          : "Funksjonell styrke, utholdenhet & bevegelighet",
      desc: t.veiviser.recommendations.crosstrening.description,
      image: "/PXL_20260211_163724399.jpg",
      discipline: "Crosstrening (CT)",
      category: "Voksen / Ungdom (fra 14 år)",
      guideHref: "/forste-trening#crosstrening",
      meta:
        locale === "en"
          ? "Dedicated CT & Yoga rooms"
          : locale === "pl"
          ? "Własna sala CT i Yoga"
          : locale === "uk"
          ? "Окремий зал CT та йоги"
          : "Egen CT-sal & Yinsaya Yoga",
    },
    {
      num: "04",
      title:
        locale === "en"
          ? "Kids & Youth (6–13 yrs)"
          : locale === "pl"
          ? "Dzieci i Młodzież (6–13 lat)"
          : locale === "uk"
          ? "Діти та підлітки (6–13 років)"
          : "Barnepartier (6–13 år)",
      subtitle:
        locale === "en"
          ? "Mastery, motor skills & safe community"
          : locale === "pl"
          ? "Rozwój ruchowy, dyscyplina i bezpieczeństwo"
          : locale === "uk"
          ? "Моторика, впевненість та безпечне середовище"
          : "Mestring, motorikk & trygt fellesskap",
      desc: t.veiviser.recommendations.kidsBjj.description,
      image: "/images/club/happy-kids.jpg",
      discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
      category: "Barneparti 1 (6-9 år)",
      guideHref: "/forste-trening#barn",
      meta:
        locale === "en"
          ? "6–9 yrs · 10–13 yrs · Parents lounge"
          : locale === "pl"
          ? "6–9 lat · 10–13 lat · Strefa rodziców"
          : locale === "uk"
          ? "6–9 років · 10–13 років · Зона для батьків"
          : "Parti 1 (6–9 år) · Parti 2 (10–13 år)",
    },
  ];

  const ageOptions: { key: AgeChoice; num: string; title: string; desc: string }[] = [
    {
      key: "voksen",
      num: "01",
      title: t.veiviser.ageAdultTitle,
      desc: t.veiviser.ageAdultDesc,
    },
    {
      key: "barn_6_9",
      num: "02",
      title: t.veiviser.ageKids1Title,
      desc: t.veiviser.ageKids1Desc,
    },
    {
      key: "barn_10_13",
      num: "03",
      title: t.veiviser.ageKids2Title,
      desc: t.veiviser.ageKids2Desc,
    },
  ];

  const adultGoals = [
    { key: "selvforsvar", num: "01", title: t.veiviser.goalSelfDefenseTitle, desc: t.veiviser.goalSelfDefenseDesc },
    { key: "striking", num: "02", title: t.veiviser.goalStrikingTitle, desc: t.veiviser.goalStrikingDesc },
    { key: "fitness", num: "03", title: t.veiviser.goalFitnessTitle, desc: t.veiviser.goalFitnessDesc },
    { key: "bevegelighet", num: "04", title: t.veiviser.goalFlexibilityTitle, desc: t.veiviser.goalFlexibilityDesc },
    { key: "combo", num: "05", title: t.veiviser.goalComboTitle, desc: t.veiviser.goalComboDesc },
  ];

  const kidsGoals = [
    {
      key: selectedAge === "barn_6_9" ? "leken" : "selvforsvar",
      num: "01",
      title: t.veiviser.goalKidsPlayTitle,
      desc: t.veiviser.goalKidsPlayDesc,
    },
    {
      key: "disiplin",
      num: "02",
      title: t.veiviser.goalKidsDisciplineTitle,
      desc: t.veiviser.goalKidsDisciplineDesc,
    },
    {
      key: "allround",
      num: "03",
      title: t.veiviser.goalKidsAllroundTitle,
      desc: t.veiviser.goalKidsAllroundDesc,
    },
  ];

  return (
    <section id={id} className="py-20 sm:py-28 bg-background text-foreground border-b border-border/60 scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* PART 1: Editorial Discipline Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {t.about.offerTitle}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.95]">
              {locale === "en"
                ? "Training for all levels on Dal"
                : locale === "pl"
                ? "Treningi dla każdego poziomu w Dal"
                : locale === "uk"
                ? "Тренування для всіх рівнів у Дал"
                : "Trening for alle nivåer på Dal"}
            </h2>
          </div>
          <Link
            href="/timeplan"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:underline shrink-0"
          >
            <span>{t.hero.scheduleCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-28">
          {disciplinesShowcase.map((item) => (
            <div
              key={item.num}
              className="group bg-card border border-border/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-foreground/30 transition-colors"
            >
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300 block mb-0.5">
                        {item.meta}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-white/70 border border-white/25 px-2.5 py-1 rounded">
                      {item.num}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                <ProveukeModal
                  defaultDiscipline={item.discipline}
                  defaultCategory={item.category}
                  trigger={
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
                      <span>{t.nav.tryFree} (14 dager)</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </span>
                  }
                />
                <div className="flex items-center gap-4">
                  <Link
                    href={item.guideHref}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {locale === "en"
                      ? "1st session →"
                      : locale === "pl"
                      ? "1. trening →"
                      : locale === "uk"
                      ? "1-ше тренування →"
                      : "1. trening →"}
                  </Link>
                  <Link
                    href="/timeplan"
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.nav.schedule} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PART 2: Clean Typographic 2-Step Selector (No icon boxes) */}
        <div className="border-t border-border pt-16 sm:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Selector Header & Step Progress */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {t.veiviser.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-foreground leading-[1.0] mb-4">
                {t.veiviser.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                {t.veiviser.subtitle}
              </p>

              {/* Minimal Editorial Step Progress */}
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className={step === 1 ? "text-foreground font-bold" : "text-primary font-bold"}>
                  01 {locale === "en" ? "Age" : locale === "pl" ? "Wiek" : locale === "uk" ? "Вік" : "Alder"}
                </span>
                <span className="w-6 h-[1px] bg-border" />
                <span className={step === 2 ? "text-foreground font-bold" : step > 2 ? "text-primary font-bold" : ""}>
                  02 {locale === "en" ? "Goal" : locale === "pl" ? "Cel" : locale === "uk" ? "Мета" : "Mål"}
                </span>
                <span className="w-6 h-[1px] bg-border" />
                <span className={step === 3 ? "text-primary font-bold" : ""}>
                  03 {locale === "en" ? "Match" : locale === "pl" ? "Wynik" : locale === "uk" ? "Вибір" : "Anbefaling"}
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Steps */}
            <div className="lg:col-span-7">
              
              {/* STEP 1: Age Selection */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="pb-2 border-b border-border/60 flex items-baseline justify-between">
                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
                      {t.veiviser.step1Title}
                    </h4>
                    <span className="text-xs font-mono text-muted-foreground">
                      {t.veiviser.stepIndicator.replace("{current}", "1").replace("{total}", "2")}
                    </span>
                  </div>

                  <div className="divide-y divide-border/70 border-y border-border/70">
                    {ageOptions.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelectAge(opt.key)}
                        className="group w-full py-5 px-4 sm:px-5 hover:bg-muted/40 transition-colors text-left flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="text-xs font-mono font-bold text-primary shrink-0">
                            {opt.num}
                          </span>
                          <div>
                            <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors block">
                              {opt.title}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1 block">
                              {opt.desc}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Goal Selection */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="pb-2 border-b border-border/60 flex items-baseline justify-between">
                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
                      {t.veiviser.step2Title}
                    </h4>
                    <span className="text-xs font-mono text-muted-foreground">
                      {t.veiviser.stepIndicator.replace("{current}", "2").replace("{total}", "2")}
                    </span>
                  </div>

                  <div className="divide-y divide-border/70 border-y border-border/70">
                    {(selectedAge === "voksen" ? adultGoals : kidsGoals).map((goal) => (
                      <button
                        key={goal.key}
                        type="button"
                        onClick={() => handleSelectGoal(goal.key)}
                        className="group w-full py-4 sm:py-5 px-4 sm:px-5 hover:bg-muted/40 transition-colors text-left flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="text-xs font-mono font-bold text-primary shrink-0">
                            {goal.num}
                          </span>
                          <div>
                            <span className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors block">
                              {goal.title}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">
                              {goal.desc}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground px-0"
                    >
                      ← {t.veiviser.backButton}
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Editorial Recommendation View */}
              {step === 3 && recommendationData && (
                <div className="animate-in fade-in duration-200">
                  <div className="bg-card border border-foreground/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
                    
                    <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 mb-6 border-b border-border">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary block mb-1">
                          {t.veiviser.recommendationBadge}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                          {recommendationData.rec.name}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded text-xs font-bold bg-muted text-foreground border border-border">
                          {recommendationData.category}
                        </span>
                        <span className="px-3 py-1 rounded text-xs font-semibold bg-muted/60 text-muted-foreground border border-border/60">
                          {recommendationData.footwear === "rene_innesko"
                            ? t.veiviser.footwearIndoor.replace(/^👟\s*/, "")
                            : t.veiviser.footwearBarefoot.replace(/^🥋\s*/, "")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <p className="text-sm sm:text-base font-bold text-foreground">
                        {recommendationData.rec.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {recommendationData.rec.description}
                      </p>
                    </div>

                    <div className="border-t border-b border-border/70 py-5 mb-6">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        {t.veiviser.benefitsTitle}
                      </h5>
                      <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                        {recommendationData.rec.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-baseline gap-3">
                            <span className="text-xs font-mono font-bold text-primary shrink-0">
                              0{index + 1}
                            </span>
                            <span className="leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground mb-8">
                      <p>
                        <strong className="text-foreground uppercase tracking-wider">{t.veiviser.scheduleHintTitle}</strong>{" "}
                        {recommendationData.rec.scheduleInfo}
                      </p>
                      <p className="text-muted-foreground/90">
                        {cleanAllAccessNote}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                      <div className="w-full sm:flex-1 min-w-0">
                        <ProveukeModal
                          className="w-full block"
                          defaultDiscipline={recommendationData.discipline}
                          defaultCategory={recommendationData.category}
                          trigger={
                            <Button
                              size="lg"
                              spring={true}
                              className="w-full min-h-12 h-auto py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl whitespace-normal leading-snug text-center flex items-center justify-center gap-2"
                            >
                              <span>{t.veiviser.ctaButton}</span>
                              <ArrowRight className="w-4 h-4 shrink-0" />
                            </Button>
                          }
                        />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={resetQuiz}
                        className="w-full sm:w-auto min-h-12 h-auto py-3.5 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-xl border-border hover:bg-muted shrink-0 whitespace-nowrap"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t.veiviser.restartButton}
                      </Button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
