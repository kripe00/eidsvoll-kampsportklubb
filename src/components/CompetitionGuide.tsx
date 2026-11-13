"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Search,
  ExternalLink,
  Shirt,
  Scale,
  AlertTriangle,
  Info,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  AGE_CATEGORIES,
  ALWAYS_LEGAL_FOUNDATIONS,
  BELT_DEFINITIONS,
  MASTER_TIERS,
  NEW_2027_MATCH_RULES,
  SMOOTHCOMP_CONFIG,
  evaluateJumpingGuard,
  evaluateKneeReaping,
  evaluateTechniquesForSelection,
  getAvailableBelts,
  getLevelDescription,
  getMatchDuration,
  getTechniqueUnlockLabel,
  getUniformEvaluation,
  normalizeBeltForAge,
  type AgeCategory,
  type BeltRank,
  type CompetitionStyle,
  type MasterTier,
  type TechniqueCategory,
} from "@/lib/ibjjf-rules";

interface CompetitionGuideProps {
  id?: string;
}

type TechniqueListFilter = "all" | "illegal" | "legal";

export function CompetitionGuide({ id = "konkurranse" }: CompetitionGuideProps) {
  const { locale } = useLanguage();
  const isNo = locale === "no";

  const [style, setStyle] = useState<CompetitionStyle>("gi");
  const [age, setAge] = useState<AgeCategory>("adult");
  const [belt, setBelt] = useState<BeltRank | null>("white");
  const [masterTier, setMasterTier] = useState<MasterTier>("master_1");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | TechniqueCategory>("all");
  const [listView, setListView] = useState<TechniqueListFilter>("all");

  const handleAgeChange = (nextAge: AgeCategory) => {
    setAge(nextAge);
    setBelt((prev) => normalizeBeltForAge(nextAge, prev));
  };

  const availableBelts = useMemo(() => getAvailableBelts(age), [age]);
  const effectiveBelt = useMemo(() => normalizeBeltForAge(age, belt), [age, belt]);

  const evaluation = useMemo(
    () => evaluateTechniquesForSelection(age, effectiveBelt, style),
    [age, effectiveBelt, style]
  );

  const levelInfo = useMemo(
    () => getLevelDescription(evaluation.level, age, effectiveBelt, style),
    [evaluation.level, age, effectiveBelt, style]
  );

  const durationInfo = useMemo(
    () => getMatchDuration(age, effectiveBelt, masterTier),
    [age, effectiveBelt, masterTier]
  );

  const jumpingGuardInfo = useMemo(
    () => evaluateJumpingGuard(age, effectiveBelt),
    [age, effectiveBelt]
  );

  const uniformInfo = useMemo(
    () => getUniformEvaluation(age, effectiveBelt, style),
    [age, effectiveBelt, style]
  );

  const kneeReapingInfo = useMemo(
    () => evaluateKneeReaping(age, effectiveBelt, style),
    [age, effectiveBelt, style]
  );

  const isUnder15 = age === "kids_4_12" || age === "youth_13_15";
  const isUnder12 = age === "kids_4_12";

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesFilter = (item: {
    nameNo: string;
    nameEn: string;
    descriptionNo: string;
    descriptionEn: string;
    category: TechniqueCategory;
    group: string;
    unlockedAtLevel: 2 | 3 | 4 | 5 | 6 | null;
    id: number;
  }) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      return false;
    }
    if (!normalizedQuery) return true;
    const unlockNo = getTechniqueUnlockLabel(item.unlockedAtLevel, true);
    const unlockEn = getTechniqueUnlockLabel(item.unlockedAtLevel, false);
    const haystack = `${item.id} ${unlockNo} ${unlockEn} ${item.nameNo} ${item.nameEn} ${item.descriptionNo} ${item.descriptionEn}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  const filteredLegal = useMemo(
    () => evaluation.legal.filter(matchesFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [evaluation.legal, categoryFilter, normalizedQuery]
  );

  const filteredIllegal = useMemo(
    () => evaluation.illegal.filter(matchesFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [evaluation.illegal, categoryFilter, normalizedQuery]
  );

  const filteredFoundations = useMemo(() => {
    if (categoryFilter !== "all" && categoryFilter !== "chokes_neck" && categoryFilter !== "upper_body") {
      return [];
    }
    if (!normalizedQuery) return ALWAYS_LEGAL_FOUNDATIONS;
    return ALWAYS_LEGAL_FOUNDATIONS.filter((f) =>
      `${f.nameNo} ${f.nameEn} ${f.noteNo} ${f.noteEn}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [categoryFilter, normalizedQuery]);

  const categoryLabels: { key: "all" | TechniqueCategory; label: string }[] = [
    { key: "all", label: isNo ? "Alle kategorier" : "All categories" },
    { key: "chokes_neck", label: isNo ? "Kvelning & nakke" : "Chokes & neck" },
    { key: "upper_body", label: isNo ? "Arm, skulder & kropp" : "Upper body" },
    { key: "leg_locks", label: isNo ? "Fot- & benlåser" : "Leg locks" },
    { key: "takedowns_conduct", label: isNo ? "Nedtakning & adferd" : "Takedowns & fouls" },
  ];

  const activeAgeMeta = AGE_CATEGORIES.find((a) => a.key === age)!;

  return (
    <div id={id} className="bg-background min-h-screen pb-24">
      {/* Sidehode i tråd med /forste-trening og /timeplan */}
      <div className="pt-32 bg-muted/20 border-b border-border/40 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-5xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block mb-3">
            {isNo
              ? "BJJ Stevneguide · IBJJF Rules Book 2027 & Smoothcomp"
              : "BJJ Competition Guide · IBJJF Rules Book 2027 & Smoothcomp"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-[0.95]">
            {isNo
              ? "Konkurranse & IBJJF-regler"
              : locale === "pl"
              ? "Zawody i przepisy IBJJF"
              : locale === "uk"
              ? "Змагання та правила IBJJF"
              : "Competition & IBJJF Rules"}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            {isNo
              ? "Kom i gang med stevnepåmelding via Smoothcomp øverst, eller velg aldersklasse, belte og Gi / No-Gi under for å se kamptid og hva som er lov etter IBJJF 2027-regelverket."
              : "Start with tournament registration on Smoothcomp below, or select your age division, belt rank, and Gi / No-Gi to check match duration and IBJJF 2027 rules."}
          </p>

          {/* Hurtigankere */}
          <nav
            aria-label={isNo ? "Snarveier på konkurransesiden" : "Competition page shortcuts"}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <a
              href="#smoothcomp"
              id="jump-smoothcomp"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              {isNo ? "01 · Smoothcomp & Påmelding" : "01 · Smoothcomp Guide"}
            </a>
            <a
              href="#ibjjf-regler"
              id="jump-ibjjf-regler"
              className="px-4 py-2 rounded-lg bg-card border border-border/80 text-foreground text-xs font-bold uppercase tracking-wider hover:bg-muted/50 transition-colors"
            >
              {isNo ? "02 · Interaktiv Regelveiviser" : "02 · Interactive Rule Finder"}
            </a>
            <a
              href="#spesialregler"
              id="jump-spesialregler"
              className="px-4 py-2 rounded-lg bg-card border border-border/80 text-foreground text-xs font-bold uppercase tracking-wider hover:bg-muted/50 transition-colors"
            >
              {isNo ? "03 · Knee Reaping & Kampflukt" : "03 · Knee Reaping & Fleeing"}
            </a>
            <a
              href="#poengsystem"
              id="jump-poengsystem"
              className="px-4 py-2 rounded-lg bg-card border border-border/80 text-foreground text-xs font-bold uppercase tracking-wider hover:bg-muted/50 transition-colors"
            >
              {isNo ? "04 · Poeng & Nye 2027-regler" : "04 · Scoring & 2027 Updates"}
            </a>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-10 sm:mt-12 space-y-14 sm:space-y-16">
        {/* Kort nøkkelstripe øverst */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card border border-border/70 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3.5 md:border-r md:border-border/50 md:pr-4">
            <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {isNo ? "Påmelding & kampoppsett" : "Registration & Brackets"}
              </span>
              <a
                href="#smoothcomp"
                className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors mt-0.5 block underline decoration-primary/40 underline-offset-4"
              >
                {isNo ? "Foregår i Smoothcomp" : "Managed via Smoothcomp"}
              </a>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {isNo
                  ? "Her ser du trekning (brackets), mattenummer og sanntids klokkeslett for kampene dine."
                  : "Used for tournament sign-ups, live brackets, mat assignments, and dynamic match times."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 md:border-r md:border-border/50 md:pr-4">
            <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {isNo ? "Slik regnes aldersklasse" : "How Age Divisions Work"}
              </span>
              <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                {isNo ? "Stevneår minus fødselsår" : "Tournament year minus birth year"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {isNo
                  ? "IBJJF ser på alderen du fyller i løpet av kalenderåret – ikke om du har hatt bursdag ennå på stevnedagen."
                  : "IBJJF uses the age you turn during the calendar year, regardless of your exact birthday month."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                {isNo ? "Oppdatert regelverk" : "Updated Ruleset"}
              </span>
              <p className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                {isNo ? "IBJJF Rules Book 2027" : "IBJJF Rules Book 2027"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {isNo
                  ? "Inkluderer alle endringer fra nyttår 2027 (rett fotlås, jumping guard DQ, No-Gi rashguard og Master 8)."
                  : "Includes all 2027 rule updates (straight foot lock, jumping guard DQ, No-Gi rashguards, and Master 8)."}
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SEKSJON 1: SMOOTHCOMP – HVA DET ER & SLIK MELDER DU DEG PÅ         */}
        {/* ================================================================= */}
        <section id="smoothcomp" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-1.5">
                {isNo ? "01 · Stevnepåmelding" : "01 · Tournament Registration"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                {isNo ? "Hva er Smoothcomp?" : "What Is Smoothcomp?"}
              </h2>
            </div>

            <a
              href={SMOOTHCOMP_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              id="smoothcomp-external-link"
            >
              <Button className="rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider gap-2 h-11 px-5">
                {isNo ? "Åpne Smoothcomp.com" : "Open Smoothcomp.com"}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {isNo
                ? "Smoothcomp er turneringsplattformen som brukes på nesten alle BJJ- og grappling-stevner i Norge og internasjonalt. Der oppretter du en gratis utøverprofil, melder deg på kommende stevner, og følger kampoppsettet (brackets), hvilken matte du skal gå på og sanntids klokkeslett rett på mobilen under stevnedagen."
                : "Smoothcomp is the tournament platform used for almost all BJJ and grappling competitions in Norway and internationally. Athletes and parents use it to register for events, view brackets, check mat numbers, and follow dynamic match times live on competition day."}
            </p>

            {/* 4 konkrete steg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl bg-background border border-border/70 p-4">
                <span className="text-xs font-mono font-bold text-primary block mb-1">
                  01
                </span>
                <h3 className="text-sm font-black uppercase text-foreground mb-1.5">
                  {isNo ? "Opprett konto" : "Create Account"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isNo
                    ? "Lag gratis konto på Smoothcomp. Foresatte lager egen voksenkonto først og legger til barnet under «Manage profiles»."
                    : "Create a free account on Smoothcomp. Parents register their own account first, then add child profiles under 'Manage profiles'."}
                </p>
              </div>

              <div className="rounded-xl bg-background border border-border/70 p-4">
                <span className="text-xs font-mono font-bold text-primary block mb-1">
                  02
                </span>
                <h3 className="text-sm font-black uppercase text-foreground mb-1.5">
                  {isNo ? "Velg riktig klubb" : "Join Club / Academy"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {SMOOTHCOMP_CONFIG.clubRegistrationName
                    ? isNo
                      ? `Registrer utøverprofilen under ${SMOOTHCOMP_CONFIG.clubRegistrationName}${
                          SMOOTHCOMP_CONFIG.affiliationName
                            ? ` (${SMOOTHCOMP_CONFIG.affiliationName})`
                            : ""
                        }.`
                      : `Register your athlete profile under ${SMOOTHCOMP_CONFIG.clubRegistrationName}.`
                    : isNo
                    ? "Hør med treneren på matta før første påmelding slik at du kobler profilen til nøyaktig riktig klubb/team (oppdatert registreringsinfo kommer her snart)."
                    : "Confirm the exact club/academy entry with your coach before registering for your first event."}
                </p>
              </div>

              <div className="rounded-xl bg-background border border-border/70 p-4">
                <span className="text-xs font-mono font-bold text-primary block mb-1">
                  03
                </span>
                <h3 className="text-sm font-black uppercase text-foreground mb-1.5">
                  {isNo ? "Velg vekt med utstyr" : "Pick Weight Class"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isNo
                    ? "Husk at innveiing i IBJJF skjer MED Gi og belte på (eller rashguard/shorts i No-Gi) rett før første kamp – velg en vektklasse du har god margin til!"
                    : "Remember that IBJJF weigh-ins happen wearing your full Gi and belt (or No-Gi kit) right before your first match."}
                </p>
              </div>

              <div className="rounded-xl bg-background border border-border/70 p-4">
                <span className="text-xs font-mono font-bold text-primary block mb-1">
                  04
                </span>
                <h3 className="text-sm font-black uppercase text-foreground mb-1.5">
                  {isNo ? "Følg matta live" : "Follow Live Schedule"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isNo
                    ? "Kamptidspunktene i Smoothcomp oppdateres fortløpende når kamper slutter tidlig. Møt opp i hallen minst 60 min før oppsatt tid."
                    : "Match times on Smoothcomp shift dynamically as earlier matches finish by submission. Arrive at least 60 minutes before your scheduled match."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SEKSJON 2: INTERAKTIV IBJJF 2027 REGELVEIVISER                     */}
        {/* ================================================================= */}
        <section id="ibjjf-regler" className="scroll-mt-28 space-y-6 border-t border-border/50 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-1.5">
                {isNo ? "02 · Interaktiv Regelveiviser" : "02 · Interactive Rule Finder"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                {isNo ? "Sjekk reglene for din klasse" : "Check the Rules for Your Division"}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-lg bg-muted text-xs font-bold text-foreground border border-border/70">
              {isNo ? levelInfo.badgeNo : levelInfo.badgeEn}
            </span>
          </div>

          {/* KONTROLLPANEL */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
            {/* Rad 1: Gi / No-Gi + Aldersklasse */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Stil: Gi / No-Gi */}
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                  {isNo ? "1. Velg draktform (Gi / No-Gi)" : "1. Select Style (Gi / No-Gi)"}
                </span>
                <div
                  role="radiogroup"
                  aria-label={isNo ? "Velg Gi eller No-Gi" : "Select Gi or No-Gi"}
                  className="grid grid-cols-2 gap-2"
                >
                  <button
                    type="button"
                    id="style-gi"
                    role="radio"
                    aria-checked={style === "gi"}
                    onClick={() => setStyle("gi")}
                    className={cn(
                      "px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider border transition-all cursor-pointer text-center",
                      style === "gi"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/30 text-muted-foreground border-border/70 hover:text-foreground hover:border-border"
                    )}
                  >
                    Gi (Kimono)
                  </button>
                  <button
                    type="button"
                    id="style-nogi"
                    role="radio"
                    aria-checked={style === "nogi"}
                    onClick={() => setStyle("nogi")}
                    className={cn(
                      "px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider border transition-all cursor-pointer text-center",
                      style === "nogi"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/30 text-muted-foreground border-border/70 hover:text-foreground hover:border-border"
                    )}
                  >
                    No-Gi
                  </button>
                </div>
              </div>

              {/* Aldersklasse */}
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                  {isNo ? "2. Velg aldersklasse" : "2. Select Age Division"}
                </span>
                <div
                  role="radiogroup"
                  aria-label={isNo ? "Velg aldersklasse" : "Select age division"}
                  className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2"
                >
                  {AGE_CATEGORIES.map((cat) => {
                    const isSelected = age === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        id={`age-${cat.key}`}
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleAgeChange(cat.key)}
                        className={cn(
                          "px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer text-center",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-muted/30 text-muted-foreground border-border/70 hover:text-foreground hover:border-border"
                        )}
                      >
                        {isNo ? cat.labelNo : cat.labelEn}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {isNo ? activeAgeMeta.ageFormulaNo : activeAgeMeta.ageFormulaEn}
                </p>
              </div>
            </div>

            {/* Rad 2: Master-undervalg (kun synlig når Master er valgt) */}
            {age === "master" && (
              <div className="pt-4 border-t border-border/50">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                  {isNo
                    ? "Master-årstrinn (påvirker kamptid – inkl. ny Master 8 i 2027)"
                    : "Master Age Bracket (affects match duration – incl. new 2027 Master 8)"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MASTER_TIERS.map((tier) => {
                    const selected = masterTier === tier.key;
                    return (
                      <button
                        key={tier.key}
                        type="button"
                        id={`master-tier-${tier.key}`}
                        onClick={() => setMasterTier(tier.key)}
                        className={cn(
                          "px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer",
                          selected
                            ? "bg-foreground text-background border-foreground"
                            : "bg-muted/25 text-foreground border-border/70 hover:bg-muted/50"
                        )}
                      >
                        <span className="text-xs font-black uppercase tracking-wider block">
                          {isNo ? tier.labelNo : tier.labelEn}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] block mt-0.5",
                            selected ? "text-background/80" : "text-muted-foreground"
                          )}
                        >
                          {isNo ? tier.ageRangeNo : tier.ageRangeEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rad 3: Dynamisk Beltevelger (skjules for barn og ungdom 4–15 år!) */}
            <div className="pt-4 border-t border-border/50">
              {availableBelts.length === 0 ? (
                <div
                  id="kids-no-belt-notice"
                  className="flex items-start gap-3 rounded-xl bg-muted/40 border border-border/60 p-4"
                >
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {isNo
                        ? "Ingen beltevalg nødvendig for barn og ungdom (4–15 år)"
                        : "No belt selection needed for Kids & Teens (4–15 yrs)"}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                      {isNo
                        ? "I IBJJF er kampreglene, kamptiden og listen over lovlige/ulovlige teknikker helt like for alle barnebelter (hvitt, grått, gult, oransje og grønt belte)."
                        : "Under IBJJF rules, match durations and legal/illegal moves are identical across all youth belt colors (white, grey, yellow, orange, and green)."}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {age === "juvenile_16_17"
                        ? isNo
                          ? "3. Velg beltegrad (Juvenile har hvitt, blått og lilla belte)"
                          : "3. Select Belt Rank (Juvenile: White, Blue, Purple)"
                        : isNo
                        ? "3. Velg beltegrad"
                        : "3. Select Belt Rank"}
                    </span>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label={isNo ? "Velg beltegrad" : "Select belt rank"}
                    className={cn(
                      "grid gap-2.5",
                      availableBelts.length === 3
                        ? "grid-cols-1 sm:grid-cols-3"
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                    )}
                  >
                    {availableBelts.map((bKey) => {
                      const bDef = BELT_DEFINITIONS[bKey];
                      const isSelected = effectiveBelt === bKey;
                      return (
                        <button
                          key={bKey}
                          type="button"
                          id={`belt-${bKey}`}
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setBelt(bKey)}
                          className={cn(
                            "group rounded-xl p-3 border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5",
                            isSelected
                              ? "bg-muted/70 border-foreground ring-2 ring-foreground/15 shadow-sm"
                              : "bg-background border-border/70 hover:bg-muted/30 hover:border-border"
                          )}
                        >
                          {/* Visuell BJJ-belteindikator med svart/rød tupp */}
                          <div
                            className={cn(
                              "w-full h-4 rounded-sm border overflow-hidden flex items-stretch",
                              bDef.swatchBg,
                              bDef.swatchBorder
                            )}
                            aria-hidden="true"
                          >
                            <div className="flex-1" />
                            <div className={cn("w-5 shrink-0", bDef.swatchTip)} />
                            <div className="w-1.5 shrink-0" />
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-foreground">
                              {isNo ? bDef.labelNo : bDef.labelEn}
                            </span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =============================================================== */}
          {/* DYNAMISK OPPSUMMERING FOR VALGT KLASSE (3 HOVEDKORT)            */}
          {/* =============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Kort 1: Kamptid & Strafferamme */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isNo ? "Regulær kamptid" : "Regulation Match Time"}
                  </span>
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <p
                    id="active-match-duration"
                    className="text-3xl sm:text-4xl font-black tracking-tight text-foreground"
                  >
                    {isNo ? durationInfo.minutesDisplayNo : durationInfo.minutesDisplayEn}
                  </p>
                  {durationInfo.is2027Updated && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      NYTT 2027
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {isNo ? durationInfo.subDetailNo : durationInfo.subDetailEn}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
                {isUnder15 ? (
                  <p className="text-foreground font-medium">
                    {isNo
                      ? "• Under 15 år: Utøveren blir først diskvalifisert på 6. tekniske straff (4. og 5. straff gir 2 poeng til motstander)."
                      : "• Under 15 yrs: Disqualification occurs on the 6th serious penalty (4th & 5th grant 2 pts to opponent)."}
                  </p>
                ) : (
                  <p>
                    {isNo
                      ? "• Tekniske straffer / passivitet: 1. markeres · 2. gir fordel · 3. gir 2 poeng · 4. gir diskvalifikasjon."
                      : "• Serious penalties / stalling: 1st marked · 2nd advantage · 3rd 2 pts · 4th disqualification."}
                  </p>
                )}
                {isUnder12 && (
                  <p className="text-foreground font-medium">
                    {isNo
                      ? "• Under 12 år: Dommeren stiller seg bak og støtter barnets rygg/nakke dersom barnet løftes fra matta i guard eller triangel."
                      : "• Under 12 yrs: Referee steps behind to protect the child's spine if lifted off the mat in guard/triangle."}
                  </p>
                )}
              </div>
            </div>

            {/* Kort 2: Særregel – Jumping Guard */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isNo ? "Særregel · Regel 6.2.3 M" : "Special Rule · 6.2.3 M"}
                  </span>
                  {jumpingGuardInfo.isLegal ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <h3 className="text-lg font-black tracking-tight text-foreground mb-2">
                  {isNo ? jumpingGuardInfo.titleNo : jumpingGuardInfo.titleEn}
                </h3>

                <span
                  id="jumping-guard-status"
                  className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider mb-3",
                    jumpingGuardInfo.isLegal
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-500/15 text-red-700 dark:text-red-300"
                  )}
                >
                  {isNo ? jumpingGuardInfo.statusLabelNo : jumpingGuardInfo.statusLabelEn}
                </span>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isNo ? jumpingGuardInfo.explanationNo : jumpingGuardInfo.explanationEn}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                {isNo
                  ? "Å trekke kontrollert guard med etablert grep (uten å hoppe opp på stående motstander) er fortsatt tillatt i alle klasser."
                  : "Pulling guard in a controlled motion with an established grip remains legal across all divisions."}
              </div>
            </div>

            {/* Kort 3: Drakt- og uniformskrav for valgt klasse */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {isNo ? uniformInfo.headlineNo : uniformInfo.headlineEn}
                  </span>
                  <Shirt className="w-4 h-4 text-primary shrink-0" />
                </div>

                <p
                  id="uniform-primary-rule"
                  className="text-sm font-bold text-foreground leading-snug mb-3"
                >
                  {isNo
                    ? uniformInfo.primaryRequirementNo
                    : uniformInfo.primaryRequirementEn}
                </p>

                <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  {(isNo
                    ? uniformInfo.secondaryPointsNo
                    : uniformInfo.secondaryPointsEn
                  ).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Oppsummeringsstripe for valgt nivå */}
          <div className="rounded-2xl bg-muted/35 border border-border/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-primary block">
                {isNo ? levelInfo.badgeNo : levelInfo.badgeEn}
              </span>
              <p className="text-xs sm:text-sm text-foreground mt-0.5 leading-relaxed">
                {isNo ? levelInfo.summaryNo : levelInfo.summaryEn}
              </p>
            </div>
            {age === "juvenile_16_17" &&
              (effectiveBelt === "blue" || effectiveBelt === "purple") && (
                <span className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold shrink-0">
                  {isNo
                    ? "Merk: Juvenile blått/lilla belte har samme teknikkregler som hvitt belte (unntatt Jumping Guard, som er tillatt)."
                    : "Note: Juvenile blue/purple belts share the same submission limits as white belts (except Jumping Guard, which is legal)."}
                </span>
              )}
          </div>

          {/* =============================================================== */}
          {/* SØK OG FILTER FOR DE 26 TEKNIKKENE                              */}
          {/* =============================================================== */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Søkefelt */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="technique-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isNo
                      ? "Søk etter teknikk (f.eks. rett fotlås, giljotin, wristlock, heel hook)..."
                      : "Search technique (e.g. foot lock, guillotine, wristlock, heel hook)..."
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {/* Visningsvalg (Begge / Kun ulovlige / Kun tillatte) */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  id="view-all-techniques"
                  onClick={() => setListView("all")}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors",
                    listView === "all"
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border/70 hover:text-foreground"
                  )}
                >
                  {isNo ? "Vis begge" : "Show Both"}
                </button>
                <button
                  type="button"
                  id="view-illegal-only"
                  onClick={() => setListView("illegal")}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors",
                    listView === "illegal"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-background text-muted-foreground border-border/70 hover:text-foreground"
                  )}
                >
                  {isNo
                    ? `Ulovlige (${filteredIllegal.length})`
                    : `Illegal (${filteredIllegal.length})`}
                </button>
                <button
                  type="button"
                  id="view-legal-only"
                  onClick={() => setListView("legal")}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors",
                    listView === "legal"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-background text-muted-foreground border-border/70 hover:text-foreground"
                  )}
                >
                  {isNo
                    ? `Tillatte (${filteredLegal.length + filteredFoundations.length})`
                    : `Legal (${filteredLegal.length + filteredFoundations.length})`}
                </button>
              </div>
            </div>

            {/* Kategoripiller */}
            <div className="flex flex-wrap gap-2 pt-1">
              {categoryLabels.map((cat) => {
                const active = categoryFilter === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    id={`cat-${cat.key}`}
                    onClick={() => setCategoryFilter(cat.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border",
                      active
                        ? "bg-primary/15 text-primary border-primary/40"
                        : "bg-muted/30 text-muted-foreground border-transparent hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* To-kolonners oversikt: Ulovlige vs. Tillatte teknikker */}
            <div
              className={cn(
                "grid gap-6 pt-2",
                listView === "all" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
              )}
            >
              {/* KOLONNE A: ULOVLIGE TEKNIKKER I DENNE KLASSEN */}
              {(listView === "all" || listView === "illegal") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-foreground">
                        {isNo
                          ? `Ulovlig i denne klassen (${filteredIllegal.length})`
                          : `Illegal in This Division (${filteredIllegal.length})`}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                      {isNo ? "Severe Foul / DQ" : "Severe Foul / DQ"}
                    </span>
                  </div>

                  {filteredIllegal.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">
                      {isNo
                        ? "Ingen ulovlige teknikker treffer søket ditt."
                        : "No illegal techniques match your search."}
                    </p>
                  ) : (
                    <ul className="space-y-2.5">
                      {filteredIllegal.map((tech) => (
                        <li
                          key={tech.id}
                          id={`illegal-tech-${tech.id}`}
                          className="rounded-xl bg-background border border-border/70 p-4 space-y-1.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-muted-foreground">
                              #{tech.id} · {getTechniqueUnlockLabel(tech.unlockedAtLevel, isNo)}
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {tech.change2027 === "newly_banned" && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-700 dark:text-red-300">
                                  {isNo ? "NYTT FORBUD 2027" : "NEW 2027 BAN"}
                                </span>
                              )}
                              {tech.noPenaltyException ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-300">
                                  {isNo ? "INGEN STRAFF · KUN STOPP" : "NO PENALTY · RESTART"}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-700 dark:text-red-300">
                                  DQ
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm font-bold text-foreground leading-snug">
                            {isNo ? tech.nameNo : tech.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {isNo ? tech.descriptionNo : tech.descriptionEn}
                          </p>

                          {tech.changeNoteNo && tech.change2027 === "newly_banned" && (
                            <p className="text-xs font-semibold text-red-700 dark:text-red-300 pt-1">
                              {isNo ? tech.changeNoteNo : tech.changeNoteEn}
                            </p>
                          )}
                          {tech.noPenaltyException && (
                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 pt-1">
                              {isNo ? tech.exceptionNoteNo : tech.exceptionNoteEn}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {style === "nogi" && evaluation.notApplicableInStyle.length > 0 && (
                    <p className="text-xs text-muted-foreground pt-2">
                      {isNo
                        ? "Merk: Teknikk #25 (gripe i motstanderens belte og kaste med hodet først mot single leg) bortfaller naturlig i No-Gi fordi utøverne ikke bruker belte."
                        : "Note: Technique #25 (belt-grab head spike vs. outside single leg) naturally does not apply in No-Gi as no belt is worn."}
                    </p>
                  )}
                </div>
              )}

              {/* KOLONNE B: TILLATTE TEKNIKKER I DENNE KLASSEN */}
              {(listView === "all" || listView === "legal") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-foreground">
                        {isNo
                          ? `Tillatt i denne klassen (${filteredLegal.length + filteredFoundations.length})`
                          : `Legal in This Division (${filteredLegal.length + filteredFoundations.length})`}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {isNo ? levelInfo.badgeNo : levelInfo.badgeEn}
                    </span>
                  </div>

                  {/* Teknikker som er lovlige for valgt aldersklasse og belte */}
                  {filteredLegal.length > 0 && (
                    <ul className="space-y-2.5">
                      {filteredLegal.map((tech) => (
                        <li
                          key={tech.id}
                          id={`legal-tech-${tech.id}`}
                          className="rounded-xl bg-background border border-border/70 p-4 space-y-1.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-muted-foreground">
                              #{tech.id} · {getTechniqueUnlockLabel(tech.unlockedAtLevel, isNo)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {tech.change2027 === "newly_allowed" && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                                  {isNo ? "NYTT TILLATT 2027" : "NEWLY LEGAL 2027"}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                {isNo ? "TILLATT" : "LEGAL"}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm font-bold text-foreground leading-snug">
                            {isNo ? tech.nameNo : tech.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {isNo ? tech.descriptionNo : tech.descriptionEn}
                          </p>
                          {tech.changeNoteNo && tech.change2027 === "newly_allowed" && (
                            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 pt-1">
                              {isNo ? tech.changeNoteNo : tech.changeNoteEn}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Grunnleggende basisteknikker som alltid er lov */}
                  {filteredFoundations.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block">
                        {isNo
                          ? "Grunnleggende submissions (alltid tillatt for alle aldersklasser og belter)"
                          : "Core BJJ Submissions (Always Legal for All Ages & Belts)"}
                      </span>
                      <ul className="space-y-2">
                        {filteredFoundations.map((f, idx) => (
                          <li
                            key={idx}
                            className="rounded-xl bg-muted/25 border border-border/60 p-3.5"
                          >
                            <p className="text-sm font-bold text-foreground">
                              {isNo ? f.nameNo : f.nameEn}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {isNo ? f.noteNo : f.noteEn}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SEKSJON 3: KNEE REAPING, 50/50 & KAMPFLUKT (DEL 5)                 */}
        {/* ================================================================= */}
        <section id="spesialregler" className="scroll-mt-28 space-y-6 border-t border-border/50 pt-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-1.5">
              {isNo ? "03 · Spesialregler på matta" : "03 · Key Special Rules"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
              {isNo
                ? "Knee Reaping, 50/50 & Kampflukt"
                : "Knee Reaping, 50/50 & Fleeing the Mat"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isNo
                ? "Disse reglene er dynamisk tilpasset klassen og beltet du valgte øverst."
                : "Dynamically tailored to the division and belt rank selected above."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Definisjon av Knee Reaping */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-3">
              <span
                className={cn(
                  "inline-flex px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider",
                  kneeReapingInfo.isReapingLegal
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-500/15 text-red-700 dark:text-red-300"
                )}
              >
                {isNo ? kneeReapingInfo.headlineNo : kneeReapingInfo.headlineEn}
              </span>
              <h3 className="text-lg font-black text-foreground">
                {isNo ? "Hva regnes som Knee Reaping?" : "What Counts as Knee Reaping?"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isNo ? kneeReapingInfo.definitionNo : kneeReapingInfo.definitionEn}
              </p>
            </div>

            {/* Sittende kryssede ben + 50/50 */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary block mb-1">
                  {isNo
                    ? kneeReapingInfo.crossedLegsStandupTitleNo
                    : kneeReapingInfo.crossedLegsStandupTitleEn}
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isNo
                    ? kneeReapingInfo.crossedLegsStandupRuleNo
                    : kneeReapingInfo.crossedLegsStandupRuleEn}
                </p>
              </div>
              <div className="pt-3 border-t border-border/50">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary block mb-1">
                  {isNo ? kneeReapingInfo.fiftyFiftyTitleNo : kneeReapingInfo.fiftyFiftyTitleEn}
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isNo ? kneeReapingInfo.fiftyFiftyRuleNo : kneeReapingInfo.fiftyFiftyRuleEn}
                </p>
              </div>
            </div>

            {/* Kampflukt 6.2.2 M + Defensiv utgang ved submission */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                    {isNo ? "Regel 6.2.2 M · Kampflukt" : "Rule 6.2.2 M · Fleeing the Area"}
                  </span>
                </div>
                <h3 className="text-lg font-black text-foreground mb-1.5">
                  {isNo
                    ? "Bevisst flukt fra kampområdet"
                    : "Deliberately Fleeing the Match Area"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isNo
                    ? "Løper eller glir en utøver bevisst ut av matta for å unngå en underlegen posisjon eller hindre at motstanderen konsoliderer poeng, får utøveren som flyktet 1 straff (penalty) OG motstanderen tildeles 2 poeng."
                    : "Deliberately fleeing the match area to avoid an inferior position or opponent's score consolidation results in 1 penalty to the fleeing athlete AND 2 points awarded to the opponent."}
                </p>
              </div>
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isNo
                    ? "Obs: Rømmer man bevisst ut av matta for å unngå å klappe ut (tap) på en satt submission, er det Severe Foul (umiddelbar diskvalifikasjon, 6.2.3 B)."
                    : "Note: Deliberately fleeing the mat area to avoid submitting to a locked submission hold is a Severe Foul (immediate DQ, 6.2.3 B)."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SEKSJON 4: POENGSYSTEM & NYE 2027-KAMPREGLER (DEL 4)               */}
        {/* ================================================================= */}
        <section id="poengsystem" className="scroll-mt-28 space-y-8 border-t border-border/50 pt-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-1.5">
              {isNo ? "04 · Poeng, Fordeler & 2027-endringer" : "04 · Scoring & 2027 Rule Updates"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
              {isNo
                ? "Slik scores en IBJJF-kamp"
                : "How IBJJF Matches Are Scored"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isNo
                ? "Alle poenggivende posisjoner krever 3 sekunders kontroll uten å sitte fast i en farlig submission."
                : "Every point-scoring position requires 3 seconds of stabilized control clear of active submission danger."}
            </p>
          </div>

          {/* 4 / 3 / 2 Poeng + Fordel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border/80 rounded-2xl p-5">
              <span className="text-3xl font-black text-primary block mb-1">4 poeng</span>
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-2">
                Mount & Back Control
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isNo
                  ? "Mount, Back Mount eller Ryggkontroll (hælene på innsiden av lårene – kryssede føtter eller body triangle gir kun fordel, ikke 4 poeng)."
                  : "Mount, Back Mount, or Back Control with heels inside thighs without crossing feet or locking a figure-four."}
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5">
              <span className="text-3xl font-black text-primary block mb-1">3 poeng</span>
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-2">
                Guard Pass
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isNo
                  ? "Passere motstanderens ben (guard / half-guard) og stabilisere sidekontroll eller nord-sør-kontroll i 3 sekunder."
                  : "Passing the bottom athlete's legs (guard or half-guard) into 3 seconds of side-control or north-south."}
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5">
              <span className="text-3xl font-black text-primary block mb-1">2 poeng</span>
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-2">
                Takedown, Sweep & Knee on Belly
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isNo
                  ? "Nedtakning fra stående, sweep (vende fra guard/half-guard til topp), eller kne på magen med det andre kneet løftet fra matta i 3 sekunder."
                  : "Standing takedown, sweep from guard/half-guard to top, or knee on belly with the opposite knee off the mat for 3s."}
              </p>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5">
              <span className="text-3xl font-black text-foreground block mb-1">
                {isNo ? "Fordel" : "Advantage"}
              </span>
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-2">
                {isNo ? "Avgjør ved poenglikhet" : "First Tie-Breaker"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isNo
                  ? "Gis for nesten fullført poenggivende posisjon (under 3 sek) eller reelt submission-forsøk. Ved lik poengsum vinner flest fordeler, deretter færrest straffer."
                  : "Awarded for near-completion of a scoring move or real submission danger. Breaks point ties before penalties."}
              </p>
            </div>
          </div>

          {/* Nye 2027 kamp-, poeng- og strafferegler (Del 4) */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
              {isNo
                ? "Viktige nye kamp- og poengregler fra 2027"
                : "Key New Match & Scoring Rules in 2027"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NEW_2027_MATCH_RULES.map((rule) => (
                <div
                  key={rule.code}
                  className="bg-card border border-border/70 rounded-xl p-5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {isNo ? rule.tagNo : rule.tagEn}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {rule.code}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {isNo ? rule.titleNo : rule.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {isNo ? rule.bodyNo : rule.bodyEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SEKSJON 5: KORT SJEKKLISTE FOR INNVEIING & KAMPDAG                 */}
        {/* ================================================================= */}
        <section id="kampdag" className="scroll-mt-28 space-y-6 border-t border-border/50 pt-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-1.5">
              {isNo ? "05 · Huskeliste før start" : "05 · Match-Day Checklist"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
              {isNo ? "Sjekkliste på kampdagen" : "Competition Day Checklist"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                {isNo ? "Kun ett forsøk på vekta" : "Single Official Weigh-In"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isNo
                  ? "Du får bare gå på den offisielle vekta én gang før første kamp (uten sko, med godkjent kampdrakt). Klarer du ikke vektkravet, blir du diskvalifisert."
                  : "You only get one attempt on the official scale wearing your competition uniform (without shoes) prior to your first match."}
              </p>
            </div>

            <div className="bg-card border border-border/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                {isNo ? "Negler, sko & hygiene" : "Nails, Footwear & Hygiene"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isNo
                  ? "Kortklippede finger- og tånegler, oppsatt langt hår, ren og luktfri drakt. Du MÅ bruke slippers/sko overalt utenfor selve mattekanten."
                  : "Short trimmed fingernails and toenails, tied long hair, clean dry uniform, and mandatory footwear everywhere off the mats."}
              </p>
            </div>

            <div className="bg-card border border-border/70 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                {isNo ? "Ta med ekstra drakt & legitimasjon" : "Bring Backup Gi & ID"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isNo
                  ? "Ta alltid med legitimasjon til innsjekk i oppvarmingsområdet (Bullpen), samt en ekstra godkjent Gi dersom drakten skulle ryke eller ikke bestå målsjekk."
                  : "Always bring ID for bullpen check-in and a backup Gi in case your primary kimono fails inspection or tears during a match."}
              </p>
            </div>
          </div>

          {/* CTA nederst mot Kontakt / Timeplan */}
          <div className="rounded-2xl bg-muted/30 border border-border/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground">
                {isNo
                  ? "Lurer du på om du eller barnet ditt er klar for første stevne?"
                  : "Wondering if you or your child are ready to compete?"}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {isNo
                  ? "Snakk med trenerne våre etter trening, eller ta kontakt med oss – vi hjelper deg med både klassevalg og forberedelser!"
                  : "Talk to our coaches on the mats or get in touch – we will gladly help you pick the right division and prepare."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/timeplan">
                <Button variant="outline" className="rounded-xl font-bold text-xs uppercase tracking-wider">
                  {isNo ? "Se treningstider" : "View Schedule"}
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button className="rounded-xl font-bold text-xs uppercase tracking-wider gap-1.5">
                  {isNo ? "Kontakt oss" : "Contact Us"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
