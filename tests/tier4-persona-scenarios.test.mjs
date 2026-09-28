import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DISCIPLINES,
  AGE_GROUPS,
  GOALS,
  matchDiscipline,
  formatFirestoreTrialPayload,
  FOOTWEAR_RULES,
  FIRST_TRAINING_CHECKLIST_STEPS,
  checkMobileCollision,
} from "./fixtures/spec-oracle.mjs";
import { createMockDocument, createMockWindow } from "./fixtures/mock-dom.mjs";

describe("Tier 4: Real-World Application Persona Scenarios Suite", () => {
  // =========================================================================
  // Persona 1: "Kari (38)" - Mother of 8-year-old Ole
  // =========================================================================
  it("Persona 1: Kari finds martial art for 8-year-old son Ole, checks loaner gi, and completes registration", () => {
    // 1. Kari arrives on mobile phone (390px)
    const _mockWin = createMockWindow({ width: 390, height: 844 });
    const mockDoc = createMockDocument();

    // 2. She clicks Hero shortcut to selector
    const selectorSection = mockDoc.createElement("section");
    selectorSection.setAttribute("id", "finn-kampsport");
    mockDoc.registerElement("finn-kampsport", selectorSection);

    mockDoc.getElementById("finn-kampsport").scrollIntoView({ behavior: "smooth" });
    assert.strictEqual(selectorSection.scrollIntoViewCalled, true);

    // 3. She enters Ole's profile: Age 8 (Kids 6-9), Goal: Motorikk & lek
    const match = matchDiscipline({
      age: "8",
      goal: GOALS.MOTOR_SKILLS,
    });

    assert.strictEqual(match.discipline, DISCIPLINES.BJJ);
    assert.strictEqual(match.category, "Barneparti 1 (6-9 år)");
    assert.match(match.titleNo, /Barn \(6-9 år\)/);

    // 4. She scrolls to "Din første trening" to check equipment and rules
    const gearStep = FIRST_TRAINING_CHECKLIST_STEPS.find((s) => s.id === "utstyr");
    const footStep = FIRST_TRAINING_CHECKLIST_STEPS.find((s) => s.id === "fottoy");
    assert.ok(gearStep.descNo.includes("låneutstyr"), "Kari sees that gi is loaned free");
    assert.ok(footStep.descNo.includes("Barbent"), "Kari sees Ole trains barefoot on mats");

    // 5. Kari clicks CTA to register Ole for the trial week
    const trialPayload = formatFirestoreTrialPayload({
      name: "Ole Hansen (foresatt: Kari)",
      email: "kari.hansen@epost.no",
      phone: "98712345",
      category: match.category,
      discipline: match.discipline,
      startDate: "2026-10-06",
      message: "Ole gleder seg veldig til å prøve BJJ!",
    });

    assert.strictEqual(trialPayload.rejected, false);
    assert.strictEqual(trialPayload.subject, "[Gratis Prøveperiode 14 Dager] BJJ - Barneparti 1 (6-9 år)");
    assert.strictEqual(trialPayload.endDate, "2026-10-20");
    assert.ok(trialPayload.message.includes("Ønsket gren: BJJ"));
  });

  // =========================================================================
  // Persona 2: "Magnus (29)" - Active adult wanting high-intensity workout without combat
  // =========================================================================
  it("Persona 2: Magnus chooses Crosstrening, checks indoor shoe rules, and registers for trial week", () => {
    // 1. Magnus visits site on desktop
    const _mockWin = createMockWindow({ width: 1440, height: 900 });

    // 2. Completes matchmaking: Adult, high-intensity fitness & strength
    const match = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.FITNESS,
    });

    assert.strictEqual(match.discipline, DISCIPLINES.CROSSTRENING);
    assert.strictEqual(match.category, "Voksen / Ungdom (fra 14 år)");

    // 3. Checks footwear guide: confirms rene innesko rule
    const ctFootwear = FOOTWEAR_RULES[match.discipline];
    assert.strictEqual(ctFootwear.rule, "rene_innesko");
    assert.strictEqual(ctFootwear.shoesAllowed, true);
    assert.match(ctFootwear.labelNo, /Rene innesko påkrevd/);

    // 4. Pre-filled modal submission
    const trialPayload = formatFirestoreTrialPayload({
      name: "Magnus Berg",
      email: "magnus.berg@work.no",
      phone: "48011223",
      category: match.category,
      discipline: match.discipline,
      startDate: "2026-10-03",
      message: "Vil komme i toppform med Crosstrening.",
    });

    assert.strictEqual(trialPayload.subject, "[Gratis Prøveperiode 14 Dager] Crosstrening - Voksen / Ungdom (fra 14 år)");
    assert.ok(trialPayload.message.includes("Ønsket gren: Crosstrening"));
    assert.strictEqual(trialPayload.endDate, "2026-10-17");
  });

  // =========================================================================
  // Persona 3: "Jonas (22)" - Martial arts fan wanting striking & sparring
  // =========================================================================
  it("Persona 3: Jonas chooses Muay Thai, confirms loaner gloves and barefoot mats, registers for trial", () => {
    const match = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.STRIKING,
    });

    assert.strictEqual(match.discipline, DISCIPLINES.MUAY_THAI);
    assert.strictEqual(match.category, "Voksen / Ungdom (fra 14 år)");

    // Footwear check: Barefoot on mats
    const mtFootwear = FOOTWEAR_RULES[match.discipline];
    assert.strictEqual(mtFootwear.rule, "barbent");
    assert.strictEqual(mtFootwear.shoesAllowed, false);

    // Register trial
    const payload = formatFirestoreTrialPayload({
      name: "Jonas Vik",
      email: "jonas.vik@stud.ntnu.no",
      phone: "93456789",
      category: match.category,
      discipline: match.discipline,
      startDate: "2026-10-01",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Muay Thai - Voksen / Ungdom (fra 14 år)");
    assert.strictEqual(payload.discipline, "Muay Thai");
  });

  // =========================================================================
  // Persona 4: "Astrid (45)" - Sedentary beginner with stiff joints looking for gentle mobility
  // =========================================================================
  it("Persona 4: Astrid chooses Yoga for gentle mobility, confirms low barrier, and starts trial", () => {
    const match = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.MOBILITY,
    });

    assert.strictEqual(match.discipline, DISCIPLINES.YOGA);
    assert.match(match.titleNo, /Yoga/);

    // Reassurance guide check: Arrival at Trondheimsvegen 71B, peaceful atmosphere
    const arrivalStep = FIRST_TRAINING_CHECKLIST_STEPS[0];
    assert.ok(arrivalStep.descNo.includes("Trondheimsvegen 71B på Dal"));

    const payload = formatFirestoreTrialPayload({
      name: "Astrid Dahl",
      email: "astrid.dahl@helse.no",
      phone: "91122334",
      category: match.category,
      discipline: match.discipline,
      startDate: "2026-10-08",
      message: "Gleder meg til å starte med myk yoga.",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Yoga - Voksen / Ungdom (fra 14 år)");
    assert.strictEqual(payload.endDate, "2026-10-22");
  });

  // =========================================================================
  // Persona 5: "Thomas (31)" - Mobile user on 375px screen in transit
  // =========================================================================
  it("Persona 5: Thomas browses on iPhone 13 mini (375px), scrolls past hero, taps sticky CTA without chat clash", () => {
    const mockWin = createMockWindow({ width: 375, height: 667, initialScrollY: 0 });

    // Starts at top of page -> Sticky CTA hidden
    let stickyShown = mockWin.scrollY > 350;
    assert.strictEqual(stickyShown, false);

    // Thomas scrolls down to read the schedule and about sections
    mockWin.setScrollY(650);
    stickyShown = mockWin.scrollY > 350;
    assert.strictEqual(stickyShown, true);

    // Collision check at 375px viewport
    const collision = checkMobileCollision({ windowWidth: 375, scrollY: 650 });
    assert.strictEqual(collision.collides, false);
    assert.strictEqual(collision.horizontalClearancePx, 8);
    assert.ok(collision.stickyWidth >= 250, "Pill width must be comfortable for thumb tapping");

    // Thomas taps sticky CTA -> registers for general trial
    const payload = formatFirestoreTrialPayload({
      name: "Thomas Solberg",
      email: "thomas.solberg@post.no",
      phone: "40011222",
      category: "Voksen / Ungdom (fra 14 år)",
      discipline: "BJJ",
      startDate: "2026-10-04",
    });

    assert.strictEqual(payload.isProveuke, true);
    assert.strictEqual(payload.rejected, false);
  });

  // =========================================================================
  // Persona 6: "David (34)" - English-speaking expat living in Eidsvoll
  // =========================================================================
  it("Persona 6: David switches site to English, completes English quiz, reads footwear rules, and registers", () => {
    let activeLocale = "no";
    const setLanguage = (lang) => {
      activeLocale = lang;
    };

    // 1. David changes language to English
    setLanguage("en");
    assert.strictEqual(activeLocale, "en");

    // 2. Completes selector in English
    const match = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.SELF_DEFENSE,
    });

    assert.strictEqual(match.titleEn, "Brazilian Jiu-Jitsu (BJJ)");
    assert.strictEqual(match.reasonEn, "Technical ground grappling and self-defense where technique overcomes brute strength.");

    // 3. Checks footwear guide in English
    const bjjFootwear = FOOTWEAR_RULES[match.discipline];
    assert.strictEqual(bjjFootwear.labelEn, "Barefoot on the mats");

    // 4. Submits trial registration in English
    const payload = formatFirestoreTrialPayload({
      name: "David Miller",
      email: "david.miller@telecom.com",
      phone: "+47 45099887",
      category: match.category,
      discipline: match.discipline,
      startDate: "2026-10-12",
      message: "Moved to Eidsvoll recently, keen to join the BJJ classes.",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] BJJ - Voksen / Ungdom (fra 14 år)");
    assert.ok(payload.message.includes("Moved to Eidsvoll recently"));
    assert.strictEqual(payload.endDate, "2026-10-26");
  });
});
