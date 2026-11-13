export type CompetitionStyle = "gi" | "nogi";

export type AgeCategory =
  | "kids_4_12"
  | "youth_13_15"
  | "juvenile_16_17"
  | "adult"
  | "master";

export type BeltRank = "white" | "blue" | "purple" | "brown" | "black";

export type MasterTier = "master_1" | "master_2_6" | "master_7" | "master_8";

export type RuleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type TechniqueGroupKey = "A" | "B" | "C" | "D" | "E" | "F";

export type TechniqueCategory =
  | "chokes_neck"
  | "upper_body"
  | "leg_locks"
  | "takedowns_conduct";

export interface TechniqueRule {
  id: number;
  group: TechniqueGroupKey;
  /** Nivået teknikken låses opp på (2–6), eller null dersom alltid forbudt (Gruppe F) */
  unlockedAtLevel: 2 | 3 | 4 | 5 | 6 | null;
  category: TechniqueCategory;
  nameNo: string;
  nameEn: string;
  descriptionNo: string;
  descriptionEn: string;
  /** Endret i IBJJF Rules Book 2027 */
  change2027?: "newly_banned" | "newly_allowed";
  changeNoteNo?: string;
  changeNoteEn?: string;
  /** Unntak nr. 11: Ulovlig på Nivå 1–3, men gir IKKE penalty/DQ (kun stopp og stående omstart) */
  noPenaltyException?: boolean;
  exceptionNoteNo?: string;
  exceptionNoteEn?: string;
  /** Gjelder kun med Gi/belte – bortfaller naturlig i No-Gi (nr. 25) */
  giOnly?: boolean;
}

export interface EvaluatedTechnique extends TechniqueRule {
  isLegal: boolean;
  /** Om teknikken er aktuell i valgt draktform (nr. 25 bortfaller naturlig i No-Gi) */
  isApplicableInStyle: boolean;
  consequenceNo: string;
  consequenceEn: string;
}

export interface KneeReapingEvaluation {
  isReapingLegal: boolean;
  headlineNo: string;
  headlineEn: string;
  definitionNo: string;
  definitionEn: string;
  crossedLegsStandupTitleNo: string;
  crossedLegsStandupTitleEn: string;
  crossedLegsStandupRuleNo: string;
  crossedLegsStandupRuleEn: string;
  fiftyFiftyTitleNo: string;
  fiftyFiftyTitleEn: string;
  fiftyFiftyRuleNo: string;
  fiftyFiftyRuleEn: string;
}

export interface UniformEvaluation {
  style: CompetitionStyle;
  headlineNo: string;
  headlineEn: string;
  is2027Updated: boolean;
  primaryRequirementNo: string;
  primaryRequirementEn: string;
  secondaryPointsNo: string[];
  secondaryPointsEn: string[];
}

export interface MatchDurationInfo {
  minutesDisplayNo: string;
  minutesDisplayEn: string;
  subDetailNo: string;
  subDetailEn: string;
  is2027Updated?: boolean;
}

export interface SmoothcompConfig {
  url: string;
  /** Settes til konkret klubb-/teamtekst så snart dette er klart */
  clubRegistrationName: string | null;
  affiliationName: string | null;
  extraRegistrationNoteNo: string | null;
  extraRegistrationNoteEn: string | null;
}

export const SMOOTHCOMP_CONFIG: SmoothcompConfig = {
  url: "https://smoothcomp.com/en",
  clubRegistrationName: null,
  affiliationName: null,
  extraRegistrationNoteNo: null,
  extraRegistrationNoteEn: null,
};

export const AGE_CATEGORIES: {
  key: AgeCategory;
  labelNo: string;
  labelEn: string;
  ageFormulaNo: string;
  ageFormulaEn: string;
  requiresBelt: boolean;
}[] = [
  {
    key: "kids_4_12",
    labelNo: "Barn (4–12 år)",
    labelEn: "Kids (4–12 yrs)",
    ageFormulaNo: "Mighty Mite, Pee Wee & Junior · Fyller 4–12 år i konkurranseåret",
    ageFormulaEn: "Mighty Mite, Pee Wee & Junior · Turning 4–12 in the tournament year",
    requiresBelt: false,
  },
  {
    key: "youth_13_15",
    labelNo: "Ungdom (13–15 år)",
    labelEn: "Teen (13–15 yrs)",
    ageFormulaNo: "Teen I–III · Fyller 13–15 år i konkurranseåret",
    ageFormulaEn: "Teen I–III · Turning 13–15 in the tournament year",
    requiresBelt: false,
  },
  {
    key: "juvenile_16_17",
    labelNo: "Juvenile (16–17 år)",
    labelEn: "Juvenile (16–17 yrs)",
    ageFormulaNo: "Juvenile I–II · Fyller 16 eller 17 år i konkurranseåret",
    ageFormulaEn: "Juvenile I–II · Turning 16 or 17 in the tournament year",
    requiresBelt: true,
  },
  {
    key: "adult",
    labelNo: "Voksen / Adult (18+)",
    labelEn: "Adult (18+)",
    ageFormulaNo: "Ordinær voksenklasse · Fra året man fyller 18 år (ingen øvre aldersgrense)",
    ageFormulaEn: "Standard Adult division · Turning 18 or older in the tournament year",
    requiresBelt: true,
  },
  {
    key: "master",
    labelNo: "Master (30+ til 66+)",
    labelEn: "Master (30+ to 66+)",
    ageFormulaNo: "Master 1 (30+) til Master 8 (66+, ny i 2027) · Basert på fødselsår",
    ageFormulaEn: "Master 1 (30+) through Master 8 (66+, new in 2027) · By birth year",
    requiresBelt: true,
  },
];

export const MASTER_TIERS: {
  key: MasterTier;
  labelNo: string;
  labelEn: string;
  ageRangeNo: string;
  ageRangeEn: string;
  is2027Change?: boolean;
}[] = [
  {
    key: "master_1",
    labelNo: "Master 1",
    labelEn: "Master 1",
    ageRangeNo: "30–35 år",
    ageRangeEn: "30–35 yrs",
  },
  {
    key: "master_2_6",
    labelNo: "Master 2–6",
    labelEn: "Master 2–6",
    ageRangeNo: "36–60 år",
    ageRangeEn: "36–60 yrs",
  },
  {
    key: "master_7",
    labelNo: "Master 7",
    labelEn: "Master 7",
    ageRangeNo: "61–65 år",
    ageRangeEn: "61–65 yrs",
    is2027Change: true,
  },
  {
    key: "master_8",
    labelNo: "Master 8 (Ny 2027)",
    labelEn: "Master 8 (New 2027)",
    ageRangeNo: "66+ år",
    ageRangeEn: "66+ yrs",
    is2027Change: true,
  },
];

export const BELT_DEFINITIONS: Record<
  BeltRank,
  {
    key: BeltRank;
    labelNo: string;
    labelEn: string;
    swatchBg: string;
    swatchTip: string;
    swatchBorder: string;
    textOnSwatch: string;
  }
> = {
  white: {
    key: "white",
    labelNo: "Hvitt belte",
    labelEn: "White Belt",
    swatchBg: "bg-zinc-100",
    swatchTip: "bg-zinc-900",
    swatchBorder: "border-zinc-300",
    textOnSwatch: "text-zinc-900",
  },
  blue: {
    key: "blue",
    labelNo: "Blått belte",
    labelEn: "Blue Belt",
    swatchBg: "bg-sky-600",
    swatchTip: "bg-zinc-950",
    swatchBorder: "border-sky-500",
    textOnSwatch: "text-white",
  },
  purple: {
    key: "purple",
    labelNo: "Lilla belte",
    labelEn: "Purple Belt",
    swatchBg: "bg-purple-700",
    swatchTip: "bg-zinc-950",
    swatchBorder: "border-purple-500",
    textOnSwatch: "text-white",
  },
  brown: {
    key: "brown",
    labelNo: "Brunt belte",
    labelEn: "Brown Belt",
    swatchBg: "bg-amber-900",
    swatchTip: "bg-zinc-950",
    swatchBorder: "border-amber-700",
    textOnSwatch: "text-amber-50",
  },
  black: {
    key: "black",
    labelNo: "Svart belte",
    labelEn: "Black Belt",
    swatchBg: "bg-zinc-950",
    swatchTip: "bg-red-600",
    swatchBorder: "border-zinc-700",
    textOnSwatch: "text-white",
  },
};

/**
 * Returnerer gyldige beltevalg for en gitt aldersklasse:
 * - Barn (4–12) og Ungdom (13–15): Ingen beltevalg nødvendig (reglene er like for alle barnebelter)
 * - Juvenile (16–17): Hvitt, blått og lilla
 * - Adult og Master: Alle 5 belter
 */
export function getAvailableBelts(age: AgeCategory): BeltRank[] {
  if (age === "kids_4_12" || age === "youth_13_15") {
    return [];
  }
  if (age === "juvenile_16_17") {
    return ["white", "blue", "purple"];
  }
  return ["white", "blue", "purple", "brown", "black"];
}

/**
 * Sikrer at valgt belte er gyldig når brukeren bytter aldersklasse
 */
export function normalizeBeltForAge(
  age: AgeCategory,
  currentBelt: BeltRank | null
): BeltRank | null {
  const allowed = getAvailableBelts(age);
  if (allowed.length === 0) return null;
  if (currentBelt && allowed.includes(currentBelt)) return currentBelt;
  return allowed[0];
}

/**
 * DEL 1: De 6 progressive nivåene i teknikkmotoren (IBJJF Rules Book 2027, Regel 6.2.3 N)
 */
export function resolveRuleLevel(
  age: AgeCategory,
  belt: BeltRank | null,
  style: CompetitionStyle
): RuleLevel {
  if (age === "kids_4_12") return 1;
  if (age === "youth_13_15") return 2;

  const effectiveBelt = normalizeBeltForAge(age, belt) ?? "white";

  if (age === "juvenile_16_17" || effectiveBelt === "white") {
    return 3;
  }

  if (effectiveBelt === "blue" || effectiveBelt === "purple") {
    return 4;
  }

  // Brunt og svart belte:
  // Nivå 6 gjelder KUN Adult No-Gi for brunt og svart belte.
  // All Gi for brunt/svart + Master 1–8 No-Gi for brunt/svart er Nivå 5.
  if (age === "adult" && style === "nogi") {
    return 6;
  }

  return 5;
}

export function getLevelDescription(level: RuleLevel): {
  badgeNo: string;
  badgeEn: string;
  summaryNo: string;
  summaryEn: string;
} {
  switch (level) {
    case 1:
      return {
        badgeNo: "Nivå 1 · Barn 4–12 år",
        badgeEn: "Level 1 · Kids 4–12 yrs",
        summaryNo:
          "Alle teknikkene i Gruppe A–F (nr. 1–26) samt Jumping Guard er ulovlige for å beskytte nakke, ledd og vekstsoner.",
        summaryEn:
          "All techniques in Groups A–F (#1–26) and Jumping Guard are prohibited to protect joints and spine.",
      };
    case 2:
      return {
        badgeNo: "Nivå 2 · Ungdom 13–15 år",
        badgeEn: "Level 2 · Teen 13–15 yrs",
        summaryNo:
          "Gruppe A (nr. 1 – strekke bena fra hverandre / banana split) er lovlig. Gruppe B–F (nr. 2–26) og Jumping Guard er ulovlig.",
        summaryEn:
          "Group A (#1 – stretching legs apart) is legal. Groups B–F (#2–26) and Jumping Guard are illegal.",
      };
    case 3:
      return {
        badgeNo: "Nivå 3 · Juvenile (16–17) & Hvitbelte",
        badgeEn: "Level 3 · Juvenile (16–17) & White Belt",
        summaryNo:
          "Gruppe A–B (nr. 1–7, bl.a. giljotin, omoplata, ezekiel, armtriangel og trekk i hodet på triangel) er lovlig. Gruppe C–F (nr. 8–26, inkludert rett fotlås fra 2027) er ulovlig.",
        summaryEn:
          "Groups A–B (#1–7) are legal. Groups C–F (#8–26, including straight foot lock from 2027) are illegal.",
      };
    case 4:
      return {
        badgeNo: "Nivå 4 · Blått & Lilla (Adult–Master 8)",
        badgeEn: "Level 4 · Blue & Purple (Adult–Master 8)",
        summaryNo:
          "Gruppe A–C (nr. 1–12, inkludert håndleddslås og rett fotlås med rotasjon mot foten som ikke angripes) og Jumping Guard er lovlig. Gruppe D–F (nr. 13–26) er ulovlig.",
        summaryEn:
          "Groups A–C (#1–12, including wristlocks and straight foot lock turning toward the unattacked foot) and Jumping Guard are legal. Groups D–F (#13–26) are illegal.",
      };
    case 5:
      return {
        badgeNo: "Nivå 5 · Brunt & Svart (Gi + Master No-Gi)",
        badgeEn: "Level 5 · Brown & Black (Gi + Master No-Gi)",
        summaryNo:
          "Gruppe A–D (nr. 1–16, inkludert kneebar, ordinær toe hold, biceps slicer og calf slicer) og Jumping Guard er lovlig. Gruppe E–F (nr. 17–26, inkl. heel hook og knee reaping) er ulovlig.",
        summaryEn:
          "Groups A–D (#1–16, including kneebar, standard toe hold, biceps/calf slicers) and Jumping Guard are legal. Groups E–F (#17–26) are illegal.",
      };
    case 6:
      return {
        badgeNo: "Nivå 6 · Adult Brunt & Svart No-Gi",
        badgeEn: "Level 6 · Adult Brown & Black No-Gi",
        summaryNo:
          "Gruppe A–E (nr. 1–20, inkludert heel hook, knee reaping og toe hold med utoverpress) og Jumping Guard er lovlig. Kun Gruppe F (nr. 21–24 og 26) er ulovlig.",
        summaryEn:
          "Groups A–E (#1–20, including heel hooks, knee reaping, and outward toe hold pressure) and Jumping Guard are legal. Only Group F (#21–24 and #26) is illegal.",
      };
  }
}

/**
 * SÆRREGEL – JUMPING GUARD (Regel 6.2.3 M – Endret i 2027)
 * Ulovlig (Severe Foul -> umiddelbar DQ, 7.1) for:
 * - Alle utøvere t.o.m. 15 år (uansett belte)
 * - Alle med hvitt belte uansett alder (16–17 år hvitt + Adult–Master 8 hvitt)
 * Lovlig for:
 * - 16–17 år med blått eller lilla belte
 * - Blått, lilla, brunt og svart belte fra Adult til Master 8
 */
export function evaluateJumpingGuard(
  age: AgeCategory,
  belt: BeltRank | null
): {
  isLegal: boolean;
  titleNo: string;
  titleEn: string;
  statusLabelNo: string;
  statusLabelEn: string;
  explanationNo: string;
  explanationEn: string;
} {
  const effectiveBelt = normalizeBeltForAge(age, belt);
  const isUnder15 = age === "kids_4_12" || age === "youth_13_15";
  const isWhiteBelt = effectiveBelt === "white";
  const isLegal = !isUnder15 && !isWhiteBelt;

  if (!isLegal) {
    return {
      isLegal: false,
      titleNo: "Jumping Guard (Hoppe lukket guard / Flying submissions)",
      titleEn: "Jumping Guard (Closed guard jump / Flying submissions)",
      statusLabelNo: "ULOVLIG · Direkte DQ (2027)",
      statusLabelEn: "ILLEGAL · Immediate DQ (2027)",
      explanationNo:
        "Å hoppe til lukket guard på stående motstander – inkludert alle angrep initiert ved å hoppe guard (som Flying Triangle og Flying Armbar) – er fra 2027 oppgradert til Severe Foul (6.2.3 M) og gir umiddelbar diskvalifikasjon (DQ).",
      explanationEn:
        "Jumping to closed guard on a standing opponent – including Flying Triangles and Flying Armbars – is a Severe Foul in 2027 (6.2.3 M) resulting in immediate disqualification (DQ).",
    };
  }

  return {
    isLegal: true,
    titleNo: "Jumping Guard (Hoppe lukket guard / Flying submissions)",
    titleEn: "Jumping Guard (Closed guard jump / Flying submissions)",
    statusLabelNo: "TILLATT i denne klassen",
    statusLabelEn: "LEGAL in this division",
    explanationNo:
      age === "juvenile_16_17"
        ? "Tillatt for Juvenile (16–17 år) med blått eller lilla belte (kun forbudt opp til 15 år og for hvitbelter)."
        : "Å hoppe til lukket guard samt Flying Armbar / Flying Triangle på stående motstander er tillatt fra blått belte og oppover (men slamming som forsvar er alltid ulovlig).",
    explanationEn:
      age === "juvenile_16_17"
        ? "Permitted for Juvenile (16–17 yrs) blue and purple belts (prohibited only up to 15 yrs and for white belts)."
        : "Jumping closed guard and flying submissions on a standing opponent are legal from blue belt and up (slamming remains strictly illegal).",
  };
}

/**
 * DEL 2: Alle 26 teknikker i Gruppe A–F (IBJJF Rules Book 2027, 6.2.3 N)
 */
export const IBJJF_2027_TECHNIQUES: TechniqueRule[] = [
  // GRUPPE A – Låses opp på Nivå 2
  {
    id: 1,
    group: "A",
    unlockedAtLevel: 2,
    category: "leg_locks",
    nameNo: "Submission-teknikker som strekker bena fra hverandre (f.eks. Banana Split)",
    nameEn: "Submission techniques stretching the legs apart (e.g. Banana Split)",
    descriptionNo:
      "Låser som tvinger motstanderens ben fra hverandre i spagat/hoftestrekk (bl.a. Banana Split / Crotch Ripper).",
    descriptionEn:
      "Submissions that stretch the opponent's legs apart (such as the Banana Split).",
  },

  // GRUPPE B – Låses opp på Nivå 3
  {
    id: 2,
    group: "B",
    unlockedAtLevel: 3,
    category: "chokes_neck",
    nameNo: "Kvelning som komprimerer nakkevirvlene (kvelning med nakke-/rygglås)",
    nameEn: "Choke that compresses the cervical spine",
    descriptionNo:
      "Kvelninger som samtidig legger betydelig kompresjon eller bøy på nakkevirvlene (merk: ren nakkelås uten kvelning er alltid forbudt, se nr. 22).",
    descriptionEn:
      "Chokes that compress the cervical spine (pure spinal locks without a choke remain banned for all levels, see #22).",
  },
  {
    id: 3,
    group: "B",
    unlockedAtLevel: 3,
    category: "chokes_neck",
    nameNo: "Kvelning ved bruk av eget erme (Ezequiel choke)",
    nameEn: "Choke using the sleeve (Ezequiel choke)",
    descriptionNo:
      "Underarmskvelning der utøveren griper på innsiden av eget Gi-erme (i No-Gi er grep i klær generelt forbudt, men arm-variant uten tøygrep følger ordinære kvelningsregler).",
    descriptionEn:
      "Forearm choke gripping inside your own Gi sleeve (in No-Gi, gripping rashguards/shorts is always forbidden).",
  },
  {
    id: 4,
    group: "B",
    unlockedAtLevel: 3,
    category: "chokes_neck",
    nameNo: "Front headlock / teknisk giljotin (Frontal guillotine)",
    nameEn: "Front headlock (technical guillotine)",
    descriptionNo:
      "Frontal giljotinkvelning rundt motstanderens hode/hals. Ulovlig for alle under 16 år (Nivå 1–2), lovlig fra 16 år / Nivå 3.",
    descriptionEn:
      "Frontal / technical guillotine choke. Illegal under 16 years old, legal from Level 3 upwards.",
  },
  {
    id: 5,
    group: "B",
    unlockedAtLevel: 3,
    category: "upper_body",
    nameNo: "Omoplata",
    nameEn: "Omoplata",
    descriptionNo:
      "Skulderlås utført ved bruk av bena rundt motstanderens overarm. Ulovlig opp til 15 år, lovlig fra 16 år / Nivå 3.",
    descriptionEn:
      "Shoulder lock entangled with the legs. Illegal up to 15 years old, legal from Level 3 upwards.",
  },
  {
    id: 6,
    group: "B",
    unlockedAtLevel: 3,
    category: "chokes_neck",
    nameNo: "Triangel med trekk i hodet (Triangle pulling the head)",
    nameEn: "Triangle (pulling the head)",
    descriptionNo:
      "Barn og ungdom opp til 15 år kan gjøre vanlig triangel med bena, men har IKKE lov til å trekke motstanderen i hodet for å stramme låsen.",
    descriptionEn:
      "Up to 15 years old, athletes may apply a triangle with the legs, but are prohibited from pulling down on the head.",
  },
  {
    id: 7,
    group: "B",
    unlockedAtLevel: 3,
    category: "chokes_neck",
    nameNo: "Armtriangel (Arm triangle / Kata-gatame / D'Arce / Anaconda)",
    nameEn: "Arm triangle",
    descriptionNo:
      "Kvelning der motstanderens egen arm og skulder presses inn mot halsen sammen med angriperens arm. Lovlig fra 16 år / Nivå 3.",
    descriptionEn:
      "Head-and-arm chokes compressing the opponent's shoulder into their neck. Legal from Level 3 upwards.",
  },

  // GRUPPE C – Låses opp på Nivå 4 (Adult–Master 8 Blått & Lilla)
  {
    id: 8,
    group: "C",
    unlockedAtLevel: 4,
    category: "leg_locks",
    nameNo: "Rett fotlås (Straight foot lock / Achilles lock)",
    nameEn: "Straight foot lock",
    descriptionNo:
      "Rett ankel-/akilleslås. Låses i 2027 først opp på blått belte i voksen-/masterklassene (Nivå 4).",
    descriptionEn:
      "Straight ankle/Achilles lock. Under 2027 rules, unlocked only from Adult/Master blue belt (Level 4).",
    change2027: "newly_banned",
    changeNoteNo:
      "NYTT FORBUD I 2027: Rett fotlås er blitt ULOVLIG for 16–17 år / Juvenile (alle belter) og for alle med hvitt belte (Adult til Master 8).",
    changeNoteEn:
      "NEW 2027 BAN: Straight foot lock is now ILLEGAL for Juveniles (16–17 yrs, all belts) and all White Belts (Adult to Master 8).",
  },
  {
    id: 9,
    group: "C",
    unlockedAtLevel: 4,
    category: "upper_body",
    nameNo: "Lås i lukket guard som komprimerer ribbein eller nyrer (Do-jime)",
    nameEn: "Lock that compresses the ribs or kidneys inside the closed guard",
    descriptionNo:
      "Å strekke ut og klemme bena rundt motstanderens midje/ribbein inne i lukket guard som en ren kompresjonslås (scorpion crush).",
    descriptionEn:
      "Compressing the opponent's ribs or kidneys with the legs from inside closed guard.",
  },
  {
    id: 10,
    group: "C",
    unlockedAtLevel: 4,
    category: "upper_body",
    nameNo: "Håndleddslås (Wristlock)",
    nameEn: "Wristlock",
    descriptionNo:
      "Leddlås direkte på håndleddet. Ulovlig for barn, Juvenile (også blå/lilla!) og alle hvitbelter – lovlig fra Adult/Master blått belte.",
    descriptionEn:
      "Joint lock attacking the wrist. Illegal for kids, all Juveniles, and all white belts; legal from Adult/Master blue belt.",
  },
  {
    id: 11,
    group: "C",
    unlockedAtLevel: 4,
    category: "takedowns_conduct",
    nameNo: "Single leg takedown med angriperens hode på utsiden av kroppen",
    nameEn: "Single leg with head outside (**)",
    descriptionNo:
      "Single leg (stående, fra knær eller i sweep-bevegelse) der hodet plasseres på utsiden av motstanderens hofte/kropp.",
    descriptionEn:
      "Single-leg takedown or sweep where the attacker's head is positioned outside the opponent's body.",
    noPenaltyException: true,
    exceptionNoteNo:
      "VIKTIG UNNTAK: Teknikken er ikke tillatt på Nivå 1–3, men utøveren straffes IKKE med penalty eller DQ – dommeren stopper kun kampen og starter begge stående.",
    exceptionNoteEn:
      "IMPORTANT EXCEPTION: Prohibited at Levels 1–3, but NO penalty or DQ is given – the referee simply stops the match and restarts both athletes standing.",
  },
  {
    id: 12,
    group: "C",
    unlockedAtLevel: 4,
    category: "leg_locks",
    nameNo: "I rett fotlås: rotere i retning av foten som ikke angripes",
    nameEn: "In the straight foot lock, turning toward the foot not being attacked",
    descriptionNo:
      "Å rulle/rotere innover mot det motsatte benet (f.eks. belly-down fra innsiden) mens man utfører en rett fotlås.",
    descriptionEn:
      "Turning in the direction of the unattacked foot while applying a straight foot lock.",
    change2027: "newly_allowed",
    changeNoteNo:
      "NYTT TILLATT I 2027: Denne rotasjonen er nå lovlig allerede fra blått og lilla belte (Adult til Master 8).",
    changeNoteEn:
      "NEWLY ALLOWED IN 2027: This turn is now legal starting at blue and purple belt (Adult to Master 8).",
  },

  // GRUPPE D – Låses opp på Nivå 5 (Brunt & Svart Gi + Master No-Gi)
  {
    id: 13,
    group: "D",
    unlockedAtLevel: 5,
    category: "upper_body",
    nameNo: "Biceps slicer",
    nameEn: "Biceps slicer",
    descriptionNo:
      "Kompresjonslås mot biceps/albueledd ved bruk av underarm eller legg som kile i albuebøyen. Lovlig fra brunt belte (Adult–Master 8).",
    descriptionEn:
      "Compression lock on the biceps/elbow joint. Legal for brown and black belts (Adult–Master 8).",
  },
  {
    id: 14,
    group: "D",
    unlockedAtLevel: 5,
    category: "leg_locks",
    nameNo: "Calf slicer",
    nameEn: "Calf slicer",
    descriptionNo:
      "Kompresjonslås i knehasen/leggen (f.eks. fra truck eller crab ride). Lovlig fra brunt belte (Adult–Master 8).",
    descriptionEn:
      "Compression lock behind the knee/calf. Legal for brown and black belts (Adult–Master 8).",
  },
  {
    id: 15,
    group: "D",
    unlockedAtLevel: 5,
    category: "leg_locks",
    nameNo: "Kneebar (Rett knelås)",
    nameEn: "Knee bar",
    descriptionNo:
      "Overstrekk av kneleddet i rett linje. Ulovlig til og med lilla belte; lovlig for brunt og svart belte (Adult–Master 8).",
    descriptionEn:
      "Hyperextension of the knee joint. Illegal through purple belt; legal for brown and black belts.",
  },
  {
    id: 16,
    group: "D",
    unlockedAtLevel: 5,
    category: "leg_locks",
    nameNo: "Toe hold (ordinær – uten press utover på foten)",
    nameEn: "Toe hold (standard inward pressure)",
    descriptionNo:
      "Figur-fire-grep på fotbladet som presser foten innover. Lovlig fra brunt belte (utoverpress på foten er kun lov på Nivå 6, se nr. 20).",
    descriptionEn:
      "Figure-four footlock applying inward pressure. Legal from brown belt (outward pressure is Level 6 only, see #20).",
  },

  // GRUPPE E – Låses KUN opp på Nivå 6 (Adult Brunt & Svart No-Gi)
  {
    id: 17,
    group: "E",
    unlockedAtLevel: 6,
    category: "leg_locks",
    nameNo: "Heel hook (Inside & Outside heel hook)",
    nameEn: "Heel hook",
    descriptionNo:
      "Hælkrok som roterer ankel og kneledd. KUN lovlig i Adult (18+) No-Gi for brunt og svart belte – alltid ulovlig i Gi og i Master-klassene.",
    descriptionEn:
      "Rotational leg lock attacking the heel/knee. Legal ONLY in Adult No-Gi brown and black belt divisions.",
  },
  {
    id: 18,
    group: "E",
    unlockedAtLevel: 6,
    category: "leg_locks",
    nameNo: "Lås som vrir kneet (Lock that twists the knee)",
    nameEn: "Lock that twists the knee",
    descriptionNo:
      "Enhver rotasjonslås som vrir kneleddet sideveis/rotatorisk. KUN lovlig i Adult No-Gi for brunt og svart belte.",
    descriptionEn:
      "Any submission that applies rotational torque twisting the knee. Legal ONLY in Adult No-Gi brown and black belt.",
  },
  {
    id: 19,
    group: "E",
    unlockedAtLevel: 6,
    category: "leg_locks",
    nameNo: "Knee reaping (Ulovlig kryssing av ben over kneet mot låst fot)",
    nameEn: "Knee reaping",
    descriptionNo:
      "Å krysse leggen over motstanderens lår/hofte forbi midtlinjen med innoverpress på kneet mens foten er låst. KUN tillatt på Nivå 6 (Adult Brunt/Svart No-Gi).",
    descriptionEn:
      "Crossing the leg across the opponent's midline above the knee while trapping the foot. Legal ONLY at Level 6 (Adult Brown/Black No-Gi).",
  },
  {
    id: 20,
    group: "E",
    unlockedAtLevel: 6,
    category: "leg_locks",
    nameNo: "I toe hold: påføre press utover på foten",
    nameEn: "In the toe hold, applying pressure outward on the foot",
    descriptionNo:
      "Toe hold-variant der presset vris utover på foten. Ulovlig i all Gi og Master – KUN lovlig på Nivå 6 (Adult Brunt/Svart No-Gi).",
    descriptionEn:
      "Applying outward rotational pressure on the foot in a toe hold. Legal ONLY at Level 6 (Adult Brown/Black No-Gi).",
  },

  // GRUPPE F – Alltid forbudt for ALLE klasser (Nivå 1 til 6)
  {
    id: 21,
    group: "F",
    unlockedAtLevel: null,
    category: "takedowns_conduct",
    nameNo: "Slam (Kaste/dunke motstanderen hardt i matta)",
    nameEn: "Slam",
    descriptionNo:
      "Alltid strengt forbudt i alle klasser – inkludert å løfte og slamme noen for å komme ut av lukket guard, triangel eller armlås.",
    descriptionEn:
      "Strictly forbidden in all divisions – including slamming to escape closed guard or a submission.",
  },
  {
    id: 22,
    group: "F",
    unlockedAtLevel: null,
    category: "chokes_neck",
    nameNo: "Nakke-/rygglås uten kvelning (Spinal lock – f.eks. Twister / Can Opener)",
    nameEn: "Spinal lock without choke",
    descriptionNo:
      "Enhver lås som vrir eller bøyer nakke eller ryggrad uten samtidig kvelningsgrep (f.eks. Twister, Can Opener, ren Neck Crank).",
    descriptionEn:
      "Any lock attacking the spine or neck without a choke (e.g., Twister, Can Opener, pure neck crank).",
  },
  {
    id: 23,
    group: "F",
    unlockedAtLevel: null,
    category: "takedowns_conduct",
    nameNo: "Saksefelling (Scissor takedown / Kani Basami)",
    nameEn: "Scissor takedown (Kani Basami)",
    descriptionNo:
      "Hoppende saksefelling mot motstanderens ben/kneledd. Alltid direkte diskvalifikasjon i alle klasser.",
    descriptionEn:
      "Jumping scissor takedown across the opponent's legs/knees. Always immediate disqualification.",
  },
  {
    id: 24,
    group: "F",
    unlockedAtLevel: null,
    category: "upper_body",
    nameNo: "Bøye fingre bakover (Småleddsmanipulasjon)",
    nameEn: "Bending fingers backwards",
    descriptionNo:
      "Å gripe og bøye enkeltfingre eller tær bakover. Man må gripe minst fire fingre samlet ved lovlig grepoppbryting.",
    descriptionEn:
      "Small-joint manipulation bending fingers or toes backwards.",
  },
  {
    id: 25,
    group: "F",
    unlockedAtLevel: null,
    category: "takedowns_conduct",
    nameNo:
      "Holde i motstanderens belte og kaste med hodet først i bakken mot single leg (hode utvendig)",
    nameEn:
      "Holding opponent's belt and throwing head-first when defending single leg with head outside",
    descriptionNo:
      "Farlig motkast med beltegrep der motstanderen sendes med hodet først i matta under forsvar mot single leg med hodet på utsiden (bortfaller naturlig i No-Gi).",
    descriptionEn:
      "Grabbing the belt to spike the attacker head-first when defending an outside-head single leg (naturally N/A in No-Gi).",
    giOnly: true,
  },
  {
    id: 26,
    group: "F",
    unlockedAtLevel: null,
    category: "takedowns_conduct",
    nameNo: "Suplex som lander motstanderen på hodet eller nakken",
    nameEn: "Suplex landing the opponent on head or neck",
    descriptionNo:
      "Bakover- eller sideveis løft fra midjen som lander eller tvinger motstanderens hode eller nakke ned i matta (kontrollert kast på skuldre/rygg uten nakkekontakt er tillatt).",
    descriptionEn:
      "Suplex takedown projecting or forcing the opponent's head or neck into the mat.",
  },
];

export const ALWAYS_LEGAL_FOUNDATIONS: {
  nameNo: string;
  nameEn: string;
  noteNo: string;
  noteEn: string;
}[] = [
  {
    nameNo: "Rett armlås (Armbar / Juji-gatame)",
    nameEn: "Straight Armbar",
    noteNo: "Tillatt i alle klasser fra 4 år (dommer passer ekstra godt på barn ved utstrekning).",
    noteEn: "Legal across all divisions (referees closely protect youth athletes against injury).",
  },
  {
    nameNo: "Skulderlåser med armene (Kimura & Americana)",
    nameEn: "Shoulder locks with arms (Kimura & Americana)",
    noteNo: "Tillatt på alle nivåer (Nivå 1–6), både i Gi og No-Gi.",
    noteEn: "Legal at all levels (Levels 1–6) in both Gi and No-Gi.",
  },
  {
    nameNo: "Rear Naked Choke (Mata Leão – uten nakkevridning)",
    nameEn: "Rear Naked Choke (without spinal crank)",
    noteNo: "Ren blod-/luftkvelning bakfra uten å vri nakken eller dekke munn/nese med hånden.",
    noteEn: "Clean rear strangle without twisting the spine or covering the mouth/nose.",
  },
  {
    nameNo: "Vanlig triangel med bena (uten å trekke i hodet for u/16)",
    nameEn: "Standard Triangle Choke (without pulling head for u/16)",
    noteNo: "Selve ben-triangelen er lov for alle; å trekke i hodet låses opp fra 16 år (Nivå 3).",
    noteEn: "The leg triangle itself is legal for all; pulling the head unlocks at Level 3 (16+).",
  },
  {
    nameNo: "Kragekvelninger i Gi (Cross choke, Bow & Arrow, Loop choke)",
    nameEn: "Gi Collar Chokes (Cross choke, Bow & Arrow, Loop choke)",
    noteNo: "Tillatt i alle Gi-klasser så lenge de ikke kombineres med nakkelås.",
    noteEn: "Legal in all Gi divisions provided they do not compress/twist the spine.",
  },
];

/**
 * Evaluerer alle 26 teknikker i IBJJF 2027-tabellen for valgt nivå og stil (Gi / No-Gi).
 * I No-Gi bortfaller teknikk nr. 25 naturlig fordi utøverne ikke bærer belte.
 */
export function evaluateTechniquesForSelection(
  age: AgeCategory,
  belt: BeltRank | null,
  style: CompetitionStyle
): {
  level: RuleLevel;
  legal: EvaluatedTechnique[];
  illegal: EvaluatedTechnique[];
  notApplicableInStyle: EvaluatedTechnique[];
} {
  const level = resolveRuleLevel(age, belt, style);
  const legal: EvaluatedTechnique[] = [];
  const illegal: EvaluatedTechnique[] = [];
  const notApplicableInStyle: EvaluatedTechnique[] = [];

  for (const tech of IBJJF_2027_TECHNIQUES) {
    const isApplicableInStyle = !(tech.giOnly && style === "nogi");
    const isLegal =
      tech.unlockedAtLevel !== null && level >= tech.unlockedAtLevel;

    let consequenceNo = "Tillatt teknikk";
    let consequenceEn = "Legal technique";

    if (!isLegal) {
      if (tech.noPenaltyException) {
        consequenceNo = "Stoppes og startes stående (ingen straff / DQ)";
        consequenceEn = "Stopped & restarted standing (no penalty / DQ)";
      } else {
        consequenceNo = "Severe Foul · Direkte diskvalifikasjon (DQ)";
        consequenceEn = "Severe Foul · Immediate Disqualification (DQ)";
      }
    }

    const evaluated: EvaluatedTechnique = {
      ...tech,
      isLegal,
      isApplicableInStyle,
      consequenceNo,
      consequenceEn,
    };

    if (!isApplicableInStyle) {
      notApplicableInStyle.push(evaluated);
    } else if (isLegal) {
      legal.push(evaluated);
    } else {
      illegal.push(evaluated);
    }
  }

  return { level, legal, illegal, notApplicableInStyle };
}

/**
 * DEL 1: Kamptider per aldersklasse, belte og Master-trinn (IBJJF 2027, Regel 1.3)
 */
export function getMatchDuration(
  age: AgeCategory,
  belt: BeltRank | null,
  masterTier: MasterTier = "master_1"
): MatchDurationInfo {
  const effectiveBelt = normalizeBeltForAge(age, belt) ?? "white";

  if (age === "kids_4_12") {
    return {
      minutesDisplayNo: "2–4 minutter",
      minutesDisplayEn: "2–4 minutes",
      subDetailNo:
        "Mighty Mite (4–6 år): 2 min · Pee Wee (7–9 år): 3 min · Junior (10–12 år): 4 min",
      subDetailEn:
        "Mighty Mite (4–6 yrs): 2 min · Pee Wee (7–9 yrs): 3 min · Junior (10–12 yrs): 4 min",
    };
  }

  if (age === "youth_13_15") {
    return {
      minutesDisplayNo: "4 minutter",
      minutesDisplayEn: "4 minutes",
      subDetailNo: "Teen I, II og III (13–15 år): 4 min for alle belter",
      subDetailEn: "Teen I, II & III (13–15 yrs): 4 min for all belts",
    };
  }

  if (age === "juvenile_16_17") {
    return {
      minutesDisplayNo: "5 minutter",
      minutesDisplayEn: "5 minutes",
      subDetailNo: "Juvenile I & II (16–17 år): 5 min for hvitt, blått og lilla belte",
      subDetailEn: "Juvenile I & II (16–17 yrs): 5 min for white, blue, and purple belts",
    };
  }

  if (age === "adult") {
    const adultMinutes: Record<BeltRank, number> = {
      white: 5,
      blue: 6,
      purple: 7,
      brown: 8,
      black: 10,
    };
    const mins = adultMinutes[effectiveBelt];
    return {
      minutesDisplayNo: `${mins} minutter`,
      minutesDisplayEn: `${mins} minutes`,
      subDetailNo:
        "Adult kamptider: Hvit 5m · Blå 6m · Lilla 7m · Brun 8m · Svart 10m",
      subDetailEn:
        "Adult durations: White 5m · Blue 6m · Purple 7m · Brown 8m · Black 10m",
    };
  }

  // Master 1 til Master 8 (2027)
  if (masterTier === "master_1") {
    const mins =
      effectiveBelt === "white" || effectiveBelt === "blue" ? 5 : 6;
    return {
      minutesDisplayNo: `${mins} minutter`,
      minutesDisplayEn: `${mins} minutes`,
      subDetailNo:
        "Master 1 (30–35 år): 5 min for hvitt/blått · 6 min for lilla/brunt/svart",
      subDetailEn:
        "Master 1 (30–35 yrs): 5 min for white/blue · 6 min for purple/brown/black",
    };
  }

  if (masterTier === "master_2_6") {
    return {
      minutesDisplayNo: "5 minutter",
      minutesDisplayEn: "5 minutes",
      subDetailNo: "Master 2–6 (36–60 år): 5 min uansett beltegrad",
      subDetailEn: "Master 2–6 (36–60 yrs): 5 min across all belt ranks",
    };
  }

  if (masterTier === "master_7") {
    return {
      minutesDisplayNo: "5 minutter",
      minutesDisplayEn: "5 minutes",
      subDetailNo: "Master 7 (endret i 2027 til 61–65 år): 5 min uansett beltegrad",
      subDetailEn: "Master 7 (updated in 2027 to 61–65 yrs): 5 min across all belts",
      is2027Updated: true,
    };
  }

  return {
    minutesDisplayNo: "4 minutter",
    minutesDisplayEn: "4 minutes",
    subDetailNo: "Master 8 (ny klasse i 2027 for 66+ år): 4 min uansett beltegrad",
    subDetailEn: "Master 8 (new 2027 division for 66+ yrs): 4 min across all belts",
    is2027Updated: true,
  };
}

/**
 * DEL 4: Drakt- og uniformskrav (Regel 8.1 / 8.1.16 – Oppdatert for 2027)
 */
export function getUniformEvaluation(
  age: AgeCategory,
  belt: BeltRank | null,
  style: CompetitionStyle
): UniformEvaluation {
  const effectiveBelt = normalizeBeltForAge(age, belt);
  const isKids = age === "kids_4_12" || age === "youth_13_15";

  if (style === "gi") {
    return {
      style: "gi",
      headlineNo: "Gi-krav (Kimono & Belte)",
      headlineEn: "Gi Uniform Requirements",
      is2027Updated: false,
      primaryRequirementNo:
        "Drakten må være ensfarget hvit, kongeblå (royal blue) eller svart – lik farge på jakke, bukse og krage.",
      primaryRequirementEn:
        "Gi must be solid white, royal blue, or black – matching jacket, pants, and collar.",
      secondaryPointsNo: [
        isKids
          ? "Barneklasser: Vanlig bomulls-Gi uten hull/rifter er godkjent (krav om vevd stoff/pearl weave gjelder først fra Juvenile 16+)."
          : "Fra Juvenile (16+) og voksne er vevd Gi-jakke (pearl weave e.l.) påbudt.",
        "Menn har IKKE lov til å ha t-skjorte/rashguard under Gi-jakken. Kvinner MÅ bruke tettsittende trøye/rashguard eller badedrakt under Gi.",
        "Ermer og bukseben må rekke til maks 2 cm fra håndledd/ankelkul. Belteender skal være 20–30 cm etter dobbelknute.",
        "Påbudt med tettsittende undertøy (brief-type) under buksen. Susp (cup), sko på matta og smykker er strengt forbudt.",
      ],
      secondaryPointsEn: [
        isKids
          ? "Kids divisions: Clean, tear-free cotton Gi (woven fabric requirement starts at Juvenile 16+)."
          : "Woven Gi fabric (pearl weave) is mandatory for Juvenile, Adult, and Master divisions.",
        "Men cannot wear a rashguard/shirt under the Gi. Women MUST wear a skin-tight shirt/rashguard under the Gi.",
        "Sleeves and pants must reach within 2 cm of wrist/ankle bone. Belt ends 20–30 cm.",
        "Brief-type undergarment is mandatory. Cups (groin guards), shoes on the mat, and jewelry are strictly forbidden.",
      ],
    };
  }

  // No-Gi 2027 uniform rules (8.1.16)
  let rashguardRuleNo = "";
  let rashguardRuleEn = "";

  if (isKids) {
    rashguardRuleNo =
      "Barnebelter (hvitt vs. grått/gult/oransje/grønt): Hvitbelter må ha overveiende hvit rashguard (>50 % hvit, kun svart som sekundærfarge). Fargede belter må ha svart/hvit rashguard med minst 10 % av beltefargen synlig både forfra og bakfra (eller 100 % beltefarge).";
    rashguardRuleEn =
      "Kids belts: White belts need a predominantly white rashguard (>50% white, black as only secondary color). Colored belts (grey–green) need black/white with ≥10% belt color visible front and back (or 100% belt color).";
  } else if (effectiveBelt === "white") {
    rashguardRuleNo =
      "Hvitt belte (NYTT 2027): Rashguarden MÅ være overveiende hvit (mer enn 50 % av overflaten), med svart som eneste tillatte sekundærfarge.";
    rashguardRuleEn =
      "White Belt (NEW 2027): Rashguard MUST be predominantly white (>50% of surface), with black as the only allowed secondary color.";
  } else if (effectiveBelt === "black") {
    rashguardRuleNo =
      "Svart belte (NYTT 2027): Rashguarden MÅ være overveiende svart (mer enn 50 % av overflaten), med hvit som eneste sekundærfarge (et lite rødt felt godtas så lenge helhetsinntrykket forblir svart).";
    rashguardRuleEn =
      "Black Belt (NEW 2027): Rashguard MUST be predominantly black (>50%), with white as the only secondary color (a small red area is tolerated).";
  } else {
    const beltNameNo = effectiveBelt
      ? BELT_DEFINITIONS[effectiveBelt].labelNo.toLowerCase()
      : "beltefarge";
    rashguardRuleNo = `Farget belte – ${beltNameNo} (NYTT 2027): Tettsittende rashguard i svart, hvitt eller svart/hvitt med minst 10 % av beltefargen plassert slik at graden tydelig ses BÅDE forfra og bakfra – eller 100 % i beltefargen.`;
    rashguardRuleEn =
      "Colored Belt (NEW 2027): Skin-tight rashguard in black, white, or black/white with at least 10% rank color clearly visible from BOTH the front and back – or 100% rank color.";
  }

  return {
    style: "nogi",
    headlineNo: "No-Gi uniformskrav (Oppdatert 2027 – Regel 8.1.16)",
    headlineEn: "No-Gi Uniform Requirements (Updated 2027 – Rule 8.1.16)",
    is2027Updated: true,
    primaryRequirementNo: rashguardRuleNo,
    primaryRequirementEn: rashguardRuleEn,
    secondaryPointsNo: [
      isKids
        ? "Shorts (barneklasser): Uten lommer, glidelås eller knapper – må dekke minst halve låret og ikke rekke nedenfor kneet."
        : "Shorts (menn og kvinner): Uten lommer (eller helt gjensydde), uten knapper/glidelås/utvendig snor. Må ikke rekke nedenfor kneet, og kanten kan være maks 15 cm over midten av kneet.",
      "Kompresjonsbukser / Spats (NYTT 2027): Både menn og kvinner har nå lov til å bruke tettsittende kompresjonsbukser (spats) og/eller kompresjonsshorts under shortsen (i svart, hvitt, svart/hvitt og/eller beltefarge). Kvinner kan også bruke kun spats.",
      "Rashguarden må være tettsittende (elastisk) og lang nok til å dekke hele overkroppen ned til shortsens linning.",
      "Grep i rashguard eller shorts under kamp er alltid ulovlig i No-Gi (Serious Foul, 6.2.2 N).",
    ],
    secondaryPointsEn: [
      isKids
        ? "Shorts (kids): Pocketless, no zippers/buttons – must cover at least halfway down the thigh and not go past the knee."
        : "Shorts (men & women): No pockets/zippers/buttons. Must not go past the knee, and hem no more than 15 cm above the middle of the knee.",
      "Compression Pants / Spats (NEW 2027): Men are now also permitted to wear skin-tight compression pants (spats) and/or compression shorts beneath their shorts (in black, white, black/white, and/or belt color).",
      "Rashguard must be skin-tight elastic material covering the torso down to the shorts waistband.",
      "Grabbing any part of the No-Gi uniform during a match is a Serious Foul (6.2.2 N).",
    ],
  };
}

/**
 * DEL 5: Knee Reaping & 50/50 spesialregler tilpasset valgt klasse og belte
 */
export function evaluateKneeReaping(
  age: AgeCategory,
  belt: BeltRank | null,
  style: CompetitionStyle
): KneeReapingEvaluation {
  const level = resolveRuleLevel(age, belt, style);
  const effectiveBelt = normalizeBeltForAge(age, belt);
  const isBrownOrBlack = effectiveBelt === "brown" || effectiveBelt === "black";
  const isReapingLegal = level === 6;

  const definitionNo =
    "Knee reaping oppstår når utøveren legger låret bak motstanderens ben, fører leggen på oversiden av kroppen over knehøyde med foten forbi kroppens vertikale midtlinje, og presser kneet utenfra og innover mens foten på det utsatte benet sitter låst mellom hofte og armhule. Foten regnes også som låst uten håndgrep dersom motstanderen står oppreist og bærer vekt på foten til benet som er i fare.";
  const definitionEn =
    "Knee reaping occurs when an athlete places their thigh behind the opponent's leg, passes the calf across the body above the knee past the vertical midline applying inward pressure on the knee while the endangered foot is trapped (including when the opponent stands bearing weight on that foot).";

  return {
    isReapingLegal,
    headlineNo: isReapingLegal
      ? "Knee Reaping er TILLATT i denne klassen (Nivå 6)"
      : "Knee Reaping er ULOVLIG i denne klassen (Nivå 1–5)",
    headlineEn: isReapingLegal
      ? "Knee Reaping is LEGAL in this division (Level 6)"
      : "Knee Reaping is ILLEGAL in this division (Levels 1–5)",
    definitionNo,
    definitionEn,
    crossedLegsStandupTitleNo: isBrownOrBlack
      ? "Sittende kryssede ben når motstander reiser seg (Brunt & Svart belte)"
      : "Sittende kryssede ben når motstander reiser seg (Lilla belte og lavere)",
    crossedLegsStandupTitleEn: isBrownOrBlack
      ? "Seated crossed legs when opponent stands up (Brown & Black Belt)"
      : "Seated crossed legs when opponent stands up (Purple Belt & below)",
    crossedLegsStandupRuleNo: isBrownOrBlack
      ? "For brunt og svart belte stopper dommeren IKKE kampen dersom to utøvere sitter med kryssede ben i lovlig posisjon og den ene reiser seg opp (slik at foten tråkker i bakken), og det gis ingen straff."
      : "Sitter to utøvere med kryssede ben i en lovlig posisjon og den ene reiser seg slik at foten tråkker i bakken (og dermed regnes som låst), stopper dommeren kampen UTEN straff, plasserer utøver B sittende og utøver A stående med avstand for nye grep, og fortsetter kampen. Skjer dette etter et sweep, venter dommeren 3 sekunder på stabilisering, gir 2 poeng til utøver A på toppen, og starter dem opp igjen sittende/stående.",
    crossedLegsStandupRuleEn: isBrownOrBlack
      ? "For brown and black belts, the referee will NOT interrupt the match in this seated crossed-legs stand-up scenario, and no penalty is applied."
      : "For purple belt and below, if two seated athletes have legal crossed legs and one stands up (making the planted foot trapped), the referee stops the match WITHOUT penalty and restarts B seated and A standing (awarding 2 sweep points first if stabilized for 3s).",
    fiftyFiftyTitleNo: "50/50 Guard – Innoverrotasjon",
    fiftyFiftyTitleEn: "50/50 Guard – Turning Inside",
    fiftyFiftyRuleNo: isReapingLegal
      ? "På Nivå 6 (Adult Brunt/Svart No-Gi) er innoverrotasjon fra 50/50 tillatt selv om motstanderen bærer vekt på foten, siden knee reaping og heel hooks er lovlige."
      : "Roterer en utøver innover fra 50/50 guard mens motstanderen ved starten av rotasjonen tråkker i bakken med foten som er i guarden, regnes foten som låst og dette gir Severe Foul (umiddelbar DQ).",
    fiftyFiftyRuleEn: isReapingLegal
      ? "At Level 6 (Adult Brown/Black No-Gi), turning inside from 50/50 while the opponent steps on the trapped foot is legal."
      : "Turning inside from 50/50 guard while the opponent is stepping on the mat with the trapped foot at the start of the turn counts as a trapped foot and results in a Severe Foul (DQ).",
  };
}

/**
 * DEL 4: Nye kamp-, poeng- og strafferegler i IBJJF Rules Book 2027
 */
export const NEW_2027_MATCH_RULES = [
  {
    code: "6.2.1 C",
    tagNo: "Passivitet · Endret 2027",
    tagEn: "Stalling · Updated 2027",
    titleNo: "Double Guard Pull (20-sekundersregelen strammet inn)",
    titleEn: "Double Guard Pull (Strict 20-second cutoff)",
    bodyNo:
      "Trekker begge utøvere guard samtidig, starter en 20-sekunders nedtelling. Hvis ingen har kommet på topp eller scoret poeng innen 20 sekunder, stopper dommeren kampen, gir straff til BEGGE og starter stående – selv om en submission er låst inne eller poeng er nært forestående.",
    bodyEn:
      "If both athletes pull guard simultaneously and neither reaches top position or scores within 20 seconds, the referee stops the match, penalizes BOTH athletes, and restarts standing – even if a submission is locked in or a score is imminent.",
  },
  {
    code: "6.2.1 G",
    tagNo: "Passivitet · Ny regel 2027",
    tagEn: "Stalling · New 2027 Rule",
    titleNo: "Grep i lapel eller belte med eget ben viklet inn",
    titleEn: "Lapel or belt grip with leg wrapped",
    bodyNo:
      "Griper en utøver motstanderens lapel (jakkeslag) eller belte og vikler sitt eget ben inn i en kontrollerende posisjon, har utøveren 20 sekunder på å oppnå posisjonell progresjon. Ellers gis passivitetsstraff (7.3.1), uavhengig av intensjon.",
    bodyEn:
      "If an athlete grips the opponent's lapel or belt and wraps their own leg in a controlling position, they have 20 seconds to achieve positional progression or receive a stalling penalty regardless of intention.",
  },
  {
    code: "4.1.12",
    tagNo: "Poeng · Endret 2027",
    tagEn: "Scoring · Updated 2027",
    titleNo: "Takedown når motstander hopper/trekker lukket guard og blir hengende",
    titleEn: "Takedown when opponent pulls closed guard and stays suspended",
    bodyNo:
      "Har utøveren buksegrep når motstanderen trekker lukket guard og blir hengende i luften, er 3-sekundersfristen for å få dem i bakken fjernet. Utøveren må få motstanderen til å lande på ryggen, siden eller sittende, og deretter stabilisere topp-posisjon i 3 sekunder for å få 2 poeng.",
    bodyEn:
      "With a pant grip when the opponent pulls closed guard and stays suspended, the 3-second limit to put them down is removed; cause them to land on back/side/seated and stabilize top for 3s for 2 points.",
  },
  {
    code: "1.3.7",
    tagNo: "Poeng · Ny regel 2027",
    tagEn: "Scoring · New 2027 Rule",
    titleNo: "Kamp avbrutt med aktiv submission inne (+2 poeng)",
    titleEn: "Match interrupted with active submission (+2 points)",
    bodyNo:
      "Blir kampen avbrutt av årsaker ingen av utøverne rår over mens en submission er satt (og ingen annen spesifikk regel dekker tilfellet), startes kampen stående i midten og utøveren som hadde submission-grepet tildeles 2 poeng.",
    bodyEn:
      "If a match is interrupted for reasons not attributable to either athlete while a submission is in place, the match restarts standing in the center and the attacking athlete receives 2 points.",
  },
  {
    code: "Progresjon",
    tagNo: "Bedømming · 2027",
    tagEn: "Officiating · 2027",
    titleNo: "Progresjonskonseptet gjelder nå også på guard-passering",
    titleEn: "Progression concept applied to guard passing",
    bodyNo:
      "Det tekniske progresjonskonseptet som allerede brukes ved vurdering av sweeps brukes nå også tilsvarende ved guard-passeringer.",
    bodyEn:
      "The progression concept already applied to sweeps is now also applied when evaluating guard passing sequences.",
  },
  {
    code: "6.1.7 / 6.1.8",
    tagNo: "Disiplinært · Ny regel 2027",
    tagEn: "Disciplinary · New 2027 Rule",
    titleNo: "Skjerpet disiplinær diskvalifikasjon ved skaderisiko",
    titleEn: "Disciplinary disqualification for intentional injury risk",
    bodyNo:
      "Etter formell forespørsel fra Referee Coordinator kan IBJJF omgjøre en severe foul til disiplinær DQ (utestengelse fra hele turneringen, også annen klasse) ved forsett, uforholdsmessig maktbruk eller bevisst skaderisiko – også for farlige handlinger som ikke står eksplisitt på foullisten.",
    bodyEn:
      "IBJJF may apply disciplinary disqualification for intentional severe fouls, disproportionate force, or knowingly assuming risk of injuring the opponent.",
  },
  {
    code: "Art. 1",
    tagNo: "Dommertegn · Nytt 2027",
    tagEn: "Referee Gesture · New 2027",
    titleNo: "Nytt dommertegn: «Calm down» (Ro ned)",
    titleEn: "New referee gesture: Calm down",
    bodyNo:
      "Dommeren løfter hendene foran kroppen med håndflatene fremover, og senker/strekker deretter armene med håndflatene nedover (uten verbal kommando) for å be utøver(e) roe ned.",
    bodyEn:
      "Hands raised in front of the body with palms forward, then lowered with palms facing down to request athlete(s) to calm down.",
  },
];
