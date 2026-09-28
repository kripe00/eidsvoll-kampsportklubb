/**
 * Authoritative Specification Oracle for Eidsvoll Kampsportklubb
 * Derived directly from ORIGINAL_REQUEST.md, PROJECT.md, and codebase architectural surveys.
 */

// --- R1.1: Matchmaking Veileder Oracle ---

export const DISCIPLINES = {
  BJJ: "BJJ",
  MUAY_THAI: "Muay Thai",
  CROSSTRENING: "Crosstrening",
  YOGA: "Yoga",
};

export const AGE_GROUPS = {
  KIDS_YOUNG: "barn_under_10", // 6-9 år -> Barneparti 1
  KIDS_OLDER: "barn_10_13",   // 10-13 år -> Barneparti 2
  YOUTH: "ungdom_14_17",      // 14-17 år -> Ungdom / Voksen
  ADULT: "voksen",            // 18+ år -> Voksen
};

export const GOALS = {
  SELF_DEFENSE: "selvforsvar_grappling",
  STRIKING: "slag_spark_kondisjon",
  FITNESS: "styrke_intervall_fitness",
  MOBILITY: "bevegelighet_ro_mindfulness",
  MOTOR_SKILLS: "motorikk_lek",
};

/**
 * Matchmaking recommendation algorithm based on age and training goals.
 * Authoritative ground truth derived from ORIGINAL_REQUEST.md § R1.
 */
export function matchDiscipline({ age, goal, intensity: _intensity = "normal" }) {
  if (!age) {
    throw new Error("Age category is required for matchmaking");
  }

  // Children under 10 (6-9 år)
  if (age === AGE_GROUPS.KIDS_YOUNG || age === "barn_6_9" || age === "6" || age === "7" || age === "8" || age === "9") {
    return {
      discipline: DISCIPLINES.BJJ,
      category: "Barneparti 1 (6-9 år)",
      titleNo: "BJJ for Barn (6-9 år)",
      titleEn: "Kids BJJ (ages 6-9)",
      reasonNo: "Perfekt for koordinasjon, balanse, trygghet og lek i et trygt miljø.",
      reasonEn: "Perfect for motor skills, balance, confidence, and fun in a safe environment.",
      footwear: "barbent",
      gearProvided: true,
    };
  }

  // Children 10-13 years
  if (age === AGE_GROUPS.KIDS_OLDER || age === "barn_10_13" || age === "10" || age === "11" || age === "12" || age === "13") {
    if (goal === GOALS.STRIKING || goal === "thaiboksing") {
      return {
        discipline: DISCIPLINES.MUAY_THAI,
        category: "Barneparti 2 (10-13 år)",
        titleNo: "Muay Thai for Ungdom/Barn (10-13 år)",
        titleEn: "Muay Thai for Kids/Youth (ages 10-13)",
        reasonNo: "Fokus på teknikk, disiplin, koordinasjon og respekt.",
        reasonEn: "Focus on technique, discipline, coordination, and respect.",
        footwear: "barbent",
        gearProvided: true,
      };
    }
    return {
      discipline: DISCIPLINES.BJJ,
      category: "Barneparti 2 (10-13 år)",
      titleNo: "BJJ for Ungdom/Barn (10-13 år)",
      titleEn: "Youth BJJ (ages 10-13)",
      reasonNo: "Mestring, teknisk bryting, samhold og fysisk form.",
      reasonEn: "Achievement, technical grappling, teamwork, and physical fitness.",
      footwear: "barbent",
      gearProvided: true,
    };
  }

  // Youth (14+) and Adults
  const category = "Voksen / Ungdom (fra 14 år)";

  switch (goal) {
    case GOALS.STRIKING:
    case "thaiboksing":
    case "slag_spark":
      return {
        discipline: DISCIPLINES.MUAY_THAI,
        category,
        titleNo: "Muay Thai / Thaiboksing",
        titleEn: "Muay Thai / Thai Boxing",
        reasonNo: "Intens stående kampsport med slag, spark, knær, albuer og topp kondisjon.",
        reasonEn: "High-intensity stand-up striking with punches, kicks, knees, elbows, and top cardio.",
        footwear: "barbent",
        gearProvided: true,
      };

    case GOALS.FITNESS:
    case "crosstrening":
    case "styrke":
      return {
        discipline: DISCIPLINES.CROSSTRENING,
        category,
        titleNo: "Crosstrening (CT)",
        titleEn: "Crosstraining (CT)",
        reasonNo: "Funksjonell styrke, kettlebells og intervalltrening uten kampsportkontakt.",
        reasonEn: "Functional strength, kettlebells, and interval training with no combat contact.",
        footwear: "rene_innesko",
        gearProvided: true,
      };

    case GOALS.MOBILITY:
    case "yoga":
    case "ro":
      return {
        discipline: DISCIPLINES.YOGA,
        category,
        titleNo: "Yinsaya Yoga",
        titleEn: "Yinsaya Yoga",
        reasonNo: "Dyp bevegelighet, pust, stressmestring og skadeforebygging.",
        reasonEn: "Deep mobility, breathing, stress relief, and injury prevention.",
        footwear: "barbent",
        gearProvided: true,
      };

    case GOALS.SELF_DEFENSE:
    case "grappling":
    case "bjj":
    default:
      return {
        discipline: DISCIPLINES.BJJ,
        category,
        titleNo: "Brasiliansk Jiu-Jitsu (BJJ)",
        titleEn: "Brazilian Jiu-Jitsu (BJJ)",
        reasonNo: "Teknisk bakkekamp og selvforsvar der teknikk og posisjon overvinner rå styrke.",
        reasonEn: "Technical ground grappling and self-defense where technique overcomes brute strength.",
        footwear: "barbent",
        gearProvided: true,
      };
  }
}

// --- R1.2: ProveukeModal Preselection & Form Payload Oracle ---

export function calculateEndDate(startDateStr, durationDays = 14) {
  if (!startDateStr) return "";
  const [year, month, day] = startDateStr.split("-").map(Number);
  if (!year || !month || !day) return "";
  const dateUtc = new Date(Date.UTC(year, month - 1, day));
  dateUtc.setUTCDate(dateUtc.getUTCDate() + durationDays);
  return dateUtc.toISOString().split("T")[0];
}

export function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatFirestoreTrialPayload({
  name,
  email,
  phone = "",
  category = "Voksen / Ungdom (fra 14 år)",
  discipline = "",
  startDate,
  message = "",
  website = "",
}) {
  if (!name || !name.trim()) throw new Error("Navn er påkrevd");
  if (!email || !email.includes("@")) throw new Error("Gyldig e-post er påkrevd");
  if (!startDate) throw new Error("Startdato er påkrevd");

  // Anti-bot honeypot: website field must be empty
  if (website && website.trim() !== "") {
    return { rejected: true, reason: "Honeypot triggered" };
  }

  const endDate = calculateEndDate(startDate, 14);
  const subjectPrefix = discipline ? `${discipline} - ` : "";

  return {
    rejected: false,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    category,
    discipline,
    startDate,
    endDate,
    subject: `[Gratis Prøveperiode 14 Dager] ${subjectPrefix}${category}`,
    message: [
      "PÅMELDING TIL GRATIS PRØVEPERIODE (14 DAGER / 2 UKER)",
      "",
      `Navn: ${name.trim()}`,
      `E-post: ${email.trim()}`,
      `Telefon: ${phone.trim()}`,
      `Kategori/Alder: ${category}`,
      discipline ? `Ønsket gren: ${discipline}` : null,
      `Ønsket Startdato: ${startDate} (${formatDateDisplay(startDate)})`,
      `Sluttdato prøveperiode: ${endDate} (${formatDateDisplay(endDate)})`,
      "",
      "Ekstra melding/spørsmål:",
      message.trim() || "Ingen melding angitt.",
    ]
      .filter((line) => line !== null)
      .join("\n"),
    isProveuke: true,
    followupSent: false,
  };
}

// --- R2.1 & R2.2: First Training Guide & Footwear Rules Oracle ---

export const FOOTWEAR_RULES = {
  BJJ: {
    rule: "barbent",
    labelNo: "Barbent på mattene",
    labelEn: "Barefoot on the mats",
    reasonNo: "Av hensyn til hygiene og mattevedlikehold trener vi alltid barbeint på mattene.",
    reasonEn: "For hygiene and mat preservation, we always train barefoot on the mats.",
    shoesAllowed: false,
  },
  "Muay Thai": {
    rule: "barbent",
    labelNo: "Barbent på mattene",
    labelEn: "Barefoot on the mats",
    reasonNo: "Thaiboksing utføres barbent for sikkerhet ved spark og fotarbeid.",
    reasonEn: "Muay Thai is practiced barefoot for safety during kicks and footwork.",
    shoesAllowed: false,
  },
  Yoga: {
    rule: "barbent",
    labelNo: "Barbent på mattene",
    labelEn: "Barefoot on the mats",
    reasonNo: "Yoga praktiseres barbent for optimalt grep, bakkekontakt og stabilitet.",
    reasonEn: "Yoga is practiced barefoot for optimal grip, grounding, and stability.",
    shoesAllowed: false,
  },
  Crosstrening: {
    rule: "rene_innesko",
    labelNo: "Rene innesko påkrevd",
    labelEn: "Clean indoor shoes required",
    reasonNo: "Påkrevd for stabilitet og beskyttelse ved vekter, hopp og intervalltrening.",
    reasonEn: "Required for stability and protection during lifting, jumping, and interval training.",
    shoesAllowed: true,
    barefootAllowed: false,
  },
};

export const FIRST_TRAINING_CHECKLIST_STEPS = [
  {
    step: 1,
    id: "oppmote",
    titleNo: "Oppmøte",
    titleEn: "Arrival",
    timeBefore: "10-15 minutter før timestart",
    location: "Trondheimsvegen 71B på Dal",
    descNo: "Møt opp 10–15 minutter før timen starter. Treneren tar deg imot i resepsjonen på Trondheimsvegen 71B på Dal.",
    descEn: "Arrive 10–15 minutes before the session starts. The coach welcomes you at Trondheimsvegen 71B på Dal.",
  },
  {
    step: 2,
    id: "bekledning",
    titleNo: "Kleskode",
    titleEn: "Clothing",
    descNo: "Vanlig, rent treningstøy (t-skjorte og shorts eller treningsbukse) uten glidelåser eller harde knapper. Husk vannflaske!",
    descEn: "Clean, regular sportswear (t-shirt and shorts/sweatpants) without zippers or hard buttons. Remember a water bottle!",
  },
  {
    step: 3,
    id: "fottoy",
    titleNo: "Fottøy",
    titleEn: "Footwear Rules",
    descNo: "Kampsport (BJJ & Muay Thai) og Yoga: Barbent på mattene. Crosstrening (CT): Rene innesko påkrevd.",
    descEn: "Martial arts (BJJ & Muay Thai) and Yoga: Barefoot on the mats. Crosstraining (CT): Clean indoor shoes required.",
  },
  {
    step: 4,
    id: "utstyr",
    titleNo: "Låneutstyr & Trygghet",
    titleEn: "Loaner Gear & Safety",
    descNo: "Du trenger ikke kjøpe drakt (gi) eller boksehansker – klubben stiller med gratis låneutstyr under hele prøveperioden.",
    descEn: "No need to buy a uniform (gi) or boxing gloves – the club provides free loaner gear throughout your trial period.",
  },
];

// --- R3.1 & R3.2: Mobile Sticky CTA & ChatBot Geometry Non-Collision Oracle ---

export const CHATBOT_SPECS = {
  position: "fixed",
  bottomPx: 20, // bottom-5 = 1.25rem = 20px
  rightPx: 20,  // right-5 = 1.25rem = 20px
  widthPx: 56,  // w-14 = 3.5rem = 56px
  heightPx: 56, // h-14 = 3.5rem = 56px
  zIndex: 40,
  teaserBottomPx: 84, // bottom-16 relative to aside = 20 + 64 = 84px
  teaserWidthPx: 256, // w-64 = 256px
};

export const MOBILE_STICKY_CTA_SPECS = {
  position: "fixed",
  leftPx: 16,            // left-4 = 1rem = 16px
  rightClearancePx: 84,  // right-[84px] = 84px clearance from right edge
  bottomBaselinePx: 20,  // bottom-5 = 20px (+ safe area)
  heightPx: 56,          // h-14 = 56px
  zIndex: 30,
  scrollRevealThresholdPx: 350, // revealed when scrollY > 350
};

/**
 * Validates geometric clearance and collision immunity between MobileStickyCta and ChatBot.
 */
export function checkMobileCollision({
  windowWidth,
  safeAreaBottom = 0,
  chatOpen: _chatOpen = false,
  scrollY = 400,
}) {
  // If scrolled above threshold, sticky CTA is hidden -> no collision
  if (scrollY <= MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx) {
    return {
      collides: false,
      stickyVisible: false,
      horizontalClearancePx: null,
      reason: "Sticky CTA is hidden above scroll threshold",
    };
  }

  // Sticky CTA bounds
  const stickyLeft = MOBILE_STICKY_CTA_SPECS.leftPx;
  const stickyRight = windowWidth - MOBILE_STICKY_CTA_SPECS.rightClearancePx;
  const stickyWidth = stickyRight - stickyLeft;

  // Chat launcher button bounds
  const chatRight = windowWidth - CHATBOT_SPECS.rightPx;
  const chatLeft = chatRight - CHATBOT_SPECS.widthPx; // windowWidth - 76px

  // Horizontal clearance between right edge of sticky CTA and left edge of chat button
  const horizontalClearancePx = chatLeft - stickyRight; // (windowWidth - 76) - (windowWidth - 84) = 8px

  // Vertical positions
  const stickyBottom = MOBILE_STICKY_CTA_SPECS.bottomBaselinePx + safeAreaBottom;
  const chatBottom = CHATBOT_SPECS.bottomPx + safeAreaBottom;

  const horizontalOverlap = stickyRight > chatLeft;
  const verticalOverlap = Math.abs(stickyBottom - chatBottom) < CHATBOT_SPECS.heightPx;

  // Stacking z-index check
  const zIndexSafe = CHATBOT_SPECS.zIndex > MOBILE_STICKY_CTA_SPECS.zIndex;

  return {
    collides: horizontalOverlap && verticalOverlap,
    stickyVisible: true,
    stickyWidth,
    horizontalClearancePx,
    horizontalOverlap,
    verticalOverlap,
    zIndexSafe,
    chatLeft,
    stickyRight,
  };
}

// --- R4.1: i18n Translation Schema & Completeness Validator ---

export const REQUIRED_I18N_VEIVISER_KEYS = [
  "title",
  "subtitle",
  "step1Title",
  "step2Title",
  "ctaButton",
  "resetButton",
];

export const REQUIRED_I18N_FORSTE_TRENING_KEYS = [
  "title",
  "subtitle",
  "step1Title",
  "step1Desc",
  "step2Title",
  "step2Desc",
  "step3Title",
  "step3Desc",
  "step4Title",
  "step4Desc",
];

export const REQUIRED_I18N_STICKY_CTA_KEYS = [
  "buttonText",
  "ariaLabel",
];
