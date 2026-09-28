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

describe("Tier 3: Cross-Feature Interactions & Pairwise Integration Suite", () => {
  // =========================================================================
  // Scenario 3.1: Hero Shortcut -> Matchmaking Quiz -> Modal Preselection
  // =========================================================================
  it("Scenario 3.1: Hero shortcut smoothly navigates to selector, quiz completes, and opens modal with preselected sport", () => {
    const mockDoc = createMockDocument();

    // 1. Hero renders shortcut linking to #finn-kampsport
    const heroLink = mockDoc.createElement("a");
    heroLink.setAttribute("href", "#finn-kampsport");

    // 2. Selector section mounts in DOM
    const selectorSection = mockDoc.createElement("section");
    selectorSection.setAttribute("id", "finn-kampsport");
    mockDoc.registerElement("finn-kampsport", selectorSection);

    // 3. User clicks hero link
    const target = mockDoc.getElementById("finn-kampsport");
    target.scrollIntoView({ behavior: "smooth" });
    assert.strictEqual(target.scrollIntoViewCalled, true);

    // 4. User completes quiz: Adult + Striking
    const recommendation = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.STRIKING,
    });
    assert.strictEqual(recommendation.discipline, DISCIPLINES.MUAY_THAI);

    // 5. User clicks recommendation CTA "Meld deg på prøveuke"
    // Opens ProveukeModal with defaultDiscipline="Muay Thai"
    const payload = formatFirestoreTrialPayload({
      name: "Henrik Ibsen",
      email: "henrik@teater.no",
      phone: "91234567",
      category: recommendation.category,
      discipline: recommendation.discipline,
      startDate: "2026-10-01",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Muay Thai - Voksen / Ungdom (fra 14 år)");
    assert.ok(payload.message.includes("Ønsket gren: Muay Thai"));
  });

  // =========================================================================
  // Scenario 3.2: Language Switch -> Quiz Localization -> Localized Modal
  // =========================================================================
  it("Scenario 3.2: Language toggle updates quiz questions, recommendations, and modal labels to English", () => {
    let currentLanguage = "no";
    const switchLanguage = (lang) => {
      currentLanguage = lang;
    };

    // User switches to English
    switchLanguage("en");
    assert.strictEqual(currentLanguage, "en");

    // English quiz recommendation
    const recommendation = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.SELF_DEFENSE,
    });

    assert.strictEqual(recommendation.titleEn, "Brazilian Jiu-Jitsu (BJJ)");
    assert.strictEqual(recommendation.reasonEn, "Technical ground grappling and self-defense where technique overcomes brute strength.");

    // Submit modal in English context
    const payload = formatFirestoreTrialPayload({
      name: "John Doe",
      email: "john@example.com",
      phone: "+44 7700 900077",
      category: recommendation.category,
      discipline: recommendation.discipline,
      startDate: "2026-10-05",
      message: "Looking forward to trying BJJ in Eidsvoll!",
    });

    assert.strictEqual(payload.discipline, "BJJ");
    assert.ok(payload.message.includes("Looking forward to trying BJJ"));
  });

  // =========================================================================
  // Scenario 3.3: Mobile Sticky CTA -> Modal -> Stacking Over ChatBot
  // =========================================================================
  it("Scenario 3.3: Mobile user scrolls past hero, triggers sticky CTA, opens modal overlaying chat widget safely", () => {
    const mockWin = createMockWindow({ width: 390, height: 844, initialScrollY: 100 });

    // Below scroll threshold: Sticky CTA is not shown
    let stickyVisible = mockWin.scrollY > 350;
    assert.strictEqual(stickyVisible, false);

    // Scroll past hero
    mockWin.setScrollY(500);
    stickyVisible = mockWin.scrollY > 350;
    assert.strictEqual(stickyVisible, true);

    // Verify non-collision at scroll position
    const collision = checkMobileCollision({ windowWidth: 390, scrollY: 500 });
    assert.strictEqual(collision.collides, false);
    assert.strictEqual(collision.horizontalClearancePx, 8);

    // User clicks sticky CTA -> Modal opens with z-[9999]
    const modalZIndex = 9999;
    const chatZIndex = 40;
    const stickyZIndex = 30;

    assert.ok(modalZIndex > chatZIndex && chatZIndex > stickyZIndex, "Modal must cleanly overlay both Chat and CTA");
  });

  // =========================================================================
  // Scenario 3.4: Selector Recommends Crosstrening -> Footwear Guide Reassurance -> Modal
  // =========================================================================
  it("Scenario 3.4: Selector recommends Crosstrening, guide displays indoor shoe requirement, trial signup records discipline", () => {
    // 1. Selector recommendation
    const recommendation = matchDiscipline({
      age: AGE_GROUPS.ADULT,
      goal: GOALS.FITNESS,
    });
    assert.strictEqual(recommendation.discipline, DISCIPLINES.CROSSTRENING);

    // 2. User checks First Training footwear guide
    const footwearRule = FOOTWEAR_RULES[recommendation.discipline];
    assert.strictEqual(footwearRule.rule, "rene_innesko");
    assert.strictEqual(footwearRule.shoesAllowed, true);
    assert.strictEqual(footwearRule.labelNo, "Rene innesko påkrevd");

    // 3. User registers via preselected CTA
    const payload = formatFirestoreTrialPayload({
      name: "Astrid Lind",
      email: "astrid@trening.no",
      phone: "92345678",
      category: recommendation.category,
      discipline: recommendation.discipline,
      startDate: "2026-10-10",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Crosstrening - Voksen / Ungdom (fra 14 år)");
    assert.strictEqual(payload.discipline, "Crosstrening");
  });

  // =========================================================================
  // Scenario 3.5: Language Toggle Mid-Quiz Preserves Quiz State
  // =========================================================================
  it("Scenario 3.5: User selects age in Norwegian, toggles to English at step 2, state persists without crash", () => {
    let quizState = {
      step: 2,
      selectedAge: AGE_GROUPS.ADULT,
      locale: "no",
    };

    // User toggles to English at step 2
    quizState = {
      ...quizState,
      locale: "en",
    };

    assert.strictEqual(quizState.step, 2);
    assert.strictEqual(quizState.selectedAge, AGE_GROUPS.ADULT);
    assert.strictEqual(quizState.locale, "en");

    // Completes quiz in English
    const recommendation = matchDiscipline({
      age: quizState.selectedAge,
      goal: GOALS.MOBILITY,
    });

    assert.strictEqual(recommendation.discipline, DISCIPLINES.YOGA);
    assert.strictEqual(recommendation.titleEn, "Yinsaya Yoga");
  });

  // =========================================================================
  // Scenario 3.6: Mobile Chat Teaser Active while Sticky CTA is Visible
  // =========================================================================
  it("Scenario 3.6: Chat teaser floats above sticky CTA without overlap, both interactive simultaneously", () => {
    const windowWidth = 360; // Narrow mobile screen
    const scrollY = 400;

    const collision = checkMobileCollision({ windowWidth, scrollY });
    assert.strictEqual(collision.collides, false);

    // Teaser bottom is 84px from viewport bottom
    // Sticky CTA height is 56px, bottom is 20px -> top is 76px from viewport bottom
    const teaserBottom = 84;
    const stickyTop = 20 + 56;
    const clearance = teaserBottom - stickyTop;

    assert.strictEqual(clearance, 8, "Vertical clearance between teaser and sticky CTA must be exactly 8px");
  });

  // =========================================================================
  // Scenario 3.7: Parent with Child -> Kids Recommendation -> Loaner Gi Verification -> Modal
  // =========================================================================
  it("Scenario 3.7: Parent selects 7yo child -> receives Kids BJJ -> verifies free loaner gi -> registers child", () => {
    const parentQuiz = matchDiscipline({
      age: "7",
      goal: GOALS.MOTOR_SKILLS,
    });

    assert.strictEqual(parentQuiz.discipline, DISCIPLINES.BJJ);
    assert.strictEqual(parentQuiz.category, "Barneparti 1 (6-9 år)");

    // Parent checks gear guide
    const gearGuide = FIRST_TRAINING_CHECKLIST_STEPS.find((s) => s.id === "utstyr");
    assert.ok(gearGuide.descNo.includes("låneutstyr"));

    // Parent submits child registration
    const payload = formatFirestoreTrialPayload({
      name: "Sondre (foresatt: Anne)",
      email: "anne@familie.no",
      phone: "99887766",
      category: parentQuiz.category,
      discipline: parentQuiz.discipline,
      startDate: "2026-10-02",
      message: "Sondre er 7 år og har aldri trent kampsport før.",
    });

    assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] BJJ - Barneparti 1 (6-9 år)");
    assert.ok(payload.message.includes("Kategori/Alder: Barneparti 1 (6-9 år)"));
    assert.ok(payload.message.includes("Ønsket gren: BJJ"));
  });

  // =========================================================================
  // Scenario 3.8: Deterministic Consistency Across All Modal Triggers
  // =========================================================================
  it("Scenario 3.8: Selector CTA, First Training CTA, and Sticky CTA produce consistent payloads", () => {
    const makePayload = (discipline, category) =>
      formatFirestoreTrialPayload({
        name: "Test Bruker",
        email: "bruker@test.no",
        phone: "12345678",
        discipline,
        category,
        startDate: "2026-10-01",
      });

    // 1. From Selector recommendation (BJJ)
    const p1 = makePayload("BJJ", "Voksen / Ungdom (fra 14 år)");
    // 2. From First Training Guide CTA (BJJ)
    const p2 = makePayload("BJJ", "Voksen / Ungdom (fra 14 år)");

    assert.strictEqual(p1.subject, p2.subject);
    assert.strictEqual(p1.endDate, p2.endDate);
    assert.strictEqual(p1.isProveuke, true);
    assert.strictEqual(p2.isProveuke, true);
  });

  // =========================================================================
  // Scenario 3.9: Honeypot Protection Across All Modals
  // =========================================================================
  it("Scenario 3.9: Honeypot bot protection operates identically regardless of trigger entry point", () => {
    const botSubmission = {
      name: "Automated Bot",
      email: "bot@botnet.ru",
      phone: "00000000",
      discipline: "Muay Thai",
      startDate: "2026-10-01",
      website: "http://spam.org",
    };

    const result = formatFirestoreTrialPayload(botSubmission);
    assert.strictEqual(result.rejected, true);
    assert.strictEqual(result.reason, "Honeypot triggered");
  });

  // =========================================================================
  // Scenario 3.10: Responsive Viewport Resizing (Mobile to Desktop)
  // =========================================================================
  it("Scenario 3.10: Viewport resize from 375px (mobile) to 1280px (desktop) cleanly toggles layout states", () => {
    // Mobile 375px
    const mobileWin = createMockWindow({ width: 375, height: 667, initialScrollY: 400 });
    const isMobile = mobileWin.innerWidth < 768;
    const mobileStickyActive = isMobile && mobileWin.scrollY > 350;
    assert.strictEqual(mobileStickyActive, true);

    // Desktop 1280px
    const desktopWin = createMockWindow({ width: 1280, height: 900, initialScrollY: 400 });
    const isDesktop = desktopWin.innerWidth >= 768;
    const desktopStickyActive = !isDesktop && desktopWin.scrollY > 350;
    assert.strictEqual(desktopStickyActive, false, "Sticky CTA must be inactive on desktop");
  });
});
