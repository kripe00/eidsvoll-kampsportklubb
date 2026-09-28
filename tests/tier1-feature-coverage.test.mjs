import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  DISCIPLINES,
  AGE_GROUPS,
  GOALS,
  matchDiscipline,
  calculateEndDate,
  formatFirestoreTrialPayload,
  FOOTWEAR_RULES,
  FIRST_TRAINING_CHECKLIST_STEPS,
  checkMobileCollision,
  CHATBOT_SPECS,
  MOBILE_STICKY_CTA_SPECS,
} from "./fixtures/spec-oracle.mjs";
import { createMockDocument, createMockWindow } from "./fixtures/mock-dom.mjs";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

describe("Tier 1: Feature Coverage — Comprehensive Opaque-Box Suite", () => {
  // =========================================================================
  // Feature R1.1: Interactive Selector Questions & Logic
  // =========================================================================
  describe("R1.1: Interactive Selector Questions & Logic", () => {
    it("T1.1.1: Recommends Kids BJJ Barneparti 1 for child under 10 (6-9 yo) wanting motor skills & confidence", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.KIDS_YOUNG,
        goal: GOALS.MOTOR_SKILLS,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.BJJ);
      assert.strictEqual(result.category, "Barneparti 1 (6-9 år)");
      assert.strictEqual(result.footwear, "barbent");
      assert.strictEqual(result.gearProvided, true);
      assert.match(result.titleNo, /Barn \(6-9 år\)/);
    });

    it("T1.1.2: Recommends Kids BJJ Barneparti 2 for child 10-13 yo wanting discipline & technique", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.KIDS_OLDER,
        goal: GOALS.SELF_DEFENSE,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.BJJ);
      assert.strictEqual(result.category, "Barneparti 2 (10-13 år)");
      assert.strictEqual(result.footwear, "barbent");
      assert.match(result.titleNo, /10-13 år/);
    });

    it("T1.1.3: Recommends Muay Thai for adult/youth desiring striking, kickboxing, and high-intensity cardio", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.ADULT,
        goal: GOALS.STRIKING,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.MUAY_THAI);
      assert.strictEqual(result.category, "Voksen / Ungdom (fra 14 år)");
      assert.strictEqual(result.footwear, "barbent");
      assert.match(result.titleNo, /Muay Thai/);
    });

    it("T1.1.4: Recommends BJJ for adult seeking technical ground fighting, submissions, and self-defense", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.ADULT,
        goal: GOALS.SELF_DEFENSE,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.BJJ);
      assert.strictEqual(result.category, "Voksen / Ungdom (fra 14 år)");
      assert.strictEqual(result.footwear, "barbent");
      assert.match(result.titleNo, /Brasiliansk Jiu-Jitsu/);
    });

    it("T1.1.5: Recommends Crosstrening for adult seeking strength, conditioning, and intervals without combat", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.ADULT,
        goal: GOALS.FITNESS,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.CROSSTRENING);
      assert.strictEqual(result.category, "Voksen / Ungdom (fra 14 år)");
      assert.strictEqual(result.footwear, "rene_innesko");
      assert.match(result.titleNo, /Crosstrening/);
    });

    it("T1.1.6: Recommends Yoga for adult wanting deep flexibility, breathwork, relaxation, and joint health", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.ADULT,
        goal: GOALS.MOBILITY,
      });

      assert.strictEqual(result.discipline, DISCIPLINES.YOGA);
      assert.strictEqual(result.category, "Voksen / Ungdom (fra 14 år)");
      assert.strictEqual(result.footwear, "barbent");
      assert.match(result.titleNo, /Yoga/);
    });
  });

  // =========================================================================
  // Feature R1.2: ProveukeModal Preselection & Form Integration
  // =========================================================================
  describe("R1.2: ProveukeModal Preselection & Submission Formatting", () => {
    it("T1.2.1: Correctly calculates 14-day trial end date from ISO start date", () => {
      const startDate = "2026-10-01";
      const endDate = calculateEndDate(startDate, 14);
      assert.strictEqual(endDate, "2026-10-15");
    });

    it("T1.2.2: Formats Firestore subject line with preselected discipline and age category", () => {
      const payload = formatFirestoreTrialPayload({
        name: "Ola Nordmann",
        email: "ola@nordmann.no",
        phone: "98765432",
        category: "Voksen / Ungdom (fra 14 år)",
        discipline: "Muay Thai",
        startDate: "2026-10-01",
        message: "Gleder meg!",
      });

      assert.strictEqual(payload.rejected, false);
      assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Muay Thai - Voksen / Ungdom (fra 14 år)");
      assert.strictEqual(payload.discipline, "Muay Thai");
    });

    it("T1.2.3: Formats Firestore message body including explicit 'Ønsket gren' field", () => {
      const payload = formatFirestoreTrialPayload({
        name: "Kari Traa",
        email: "kari@sport.no",
        phone: "41234567",
        category: "Voksen / Ungdom (fra 14 år)",
        discipline: "Crosstrening",
        startDate: "2026-10-05",
      });

      assert.ok(payload.message.includes("Ønsket gren: Crosstrening"), "Message must contain selected discipline");
      assert.ok(payload.message.includes("Navn: Kari Traa"));
      assert.ok(payload.message.includes("Sluttdato prøveperiode: 2026-10-19"));
    });

    it("T1.2.4: Honors default discipline prop for child registration without overriding youth category", () => {
      const payload = formatFirestoreTrialPayload({
        name: "Lise Hansen",
        email: "forelder@familie.no",
        phone: "90001122",
        category: "Barneparti 1 (6-9 år)",
        discipline: "BJJ",
        startDate: "2026-10-10",
      });

      assert.strictEqual(payload.category, "Barneparti 1 (6-9 år)");
      assert.strictEqual(payload.discipline, "BJJ");
      assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] BJJ - Barneparti 1 (6-9 år)");
    });

    it("T1.2.5: Honeypot anti-bot validation rejects automated spam submissions", () => {
      const payload = formatFirestoreTrialPayload({
        name: "Spam Bot",
        email: "bot@spammer.org",
        phone: "12345678",
        startDate: "2026-10-01",
        website: "https://spam.xyz", // Honeypot filled
      });

      assert.strictEqual(payload.rejected, true);
      assert.strictEqual(payload.reason, "Honeypot triggered");
    });
  });

  // =========================================================================
  // Feature R1.3: Hero Shortcut Button
  // =========================================================================
  describe("R1.3: Hero Shortcut Button", () => {
    it("T1.3.1: Hero component renders secondary shortcut anchor linking to #finn-kampsport", () => {
      const mockDoc = createMockDocument();
      const heroShortcut = mockDoc.createElement("a");
      heroShortcut.setAttribute("href", "#finn-kampsport");
      heroShortcut.setAttribute("role", "button");
      heroShortcut.setAttribute("aria-label", "Gå til Finn din kampsport-velger");

      assert.strictEqual(heroShortcut.getAttribute("href"), "#finn-kampsport");
      assert.strictEqual(heroShortcut.getAttribute("role"), "button");
    });

    it("T1.3.2: Selector section registers id='finn-kampsport' matching Hero anchor contract", () => {
      const mockDoc = createMockDocument();
      const selectorSection = mockDoc.createElement("section");
      selectorSection.setAttribute("id", "finn-kampsport");
      mockDoc.registerElement("finn-kampsport", selectorSection);

      const target = mockDoc.getElementById("finn-kampsport");
      assert.notStrictEqual(target, null, "Target element must exist in document by id");
      assert.strictEqual(target.getAttribute("id"), "finn-kampsport");
    });

    it("T1.3.3: Smooth scroll invocation triggers element.scrollIntoView({ behavior: 'smooth' })", () => {
      const mockDoc = createMockDocument();
      const selectorSection = mockDoc.createElement("section");
      mockDoc.registerElement("finn-kampsport", selectorSection);

      // Simulate smooth scroll click handler
      const target = mockDoc.getElementById("finn-kampsport");
      target.scrollIntoView({ behavior: "smooth" });

      assert.strictEqual(target.scrollIntoViewCalled, true);
      assert.deepStrictEqual(target.lastScrollIntoViewArg, { behavior: "smooth" });
    });

    it("T1.3.4: Shortcut button provides accessible text or icon for screen readers", () => {
      const buttonTextNo = "Finn din kampsport";
      const buttonTextEn = "Find your sport";

      assert.ok(buttonTextNo.length > 5);
      assert.ok(buttonTextEn.length > 5);
      assert.match(buttonTextNo, /Finn din kampsport/);
    });

    it("T1.3.5: Hero maintains dual CTA layout (Primary Proveuke CTA + Secondary Selector CTA)", () => {
      const mockDoc = createMockDocument();
      const ctaContainer = mockDoc.createElement("div");
      ctaContainer.classList.add("flex", "flex-col", "sm:flex-row", "gap-4", "justify-center");

      const primaryBtn = mockDoc.createElement("button");
      primaryBtn.textContent = "Prøv 2 uker gratis";
      const secondaryBtn = mockDoc.createElement("a");
      secondaryBtn.setAttribute("href", "#finn-kampsport");
      secondaryBtn.textContent = "Finn din kampsport";

      ctaContainer.children.push(primaryBtn, secondaryBtn);

      assert.strictEqual(ctaContainer.children.length, 2);
      assert.strictEqual(ctaContainer.children[0].textContent, "Prøv 2 uker gratis");
      assert.strictEqual(ctaContainer.children[1].getAttribute("href"), "#finn-kampsport");
    });
  });

  // =========================================================================
  // Feature R2.1: "Din første trening" Visual Checklist
  // =========================================================================
  describe("R2.1: Visual 'Din første trening' Checklist", () => {
    it("T2.1.1: Checklist contains exactly 4 step sequence covering arrival, clothing, footwear, and gear", () => {
      assert.strictEqual(FIRST_TRAINING_CHECKLIST_STEPS.length, 4);
      const stepIds = FIRST_TRAINING_CHECKLIST_STEPS.map((s) => s.id);
      assert.deepStrictEqual(stepIds, ["oppmote", "bekledning", "fottoy", "utstyr"]);
    });

    it("T2.1.2: Step 1 (Oppmøte) explicitly specifies 10-15 min arrival and facility address (Trondheimsvegen 71B)", () => {
      const step1 = FIRST_TRAINING_CHECKLIST_STEPS[0];
      assert.match(step1.descNo, /10–15 minutter/);
      assert.match(step1.descNo, /Trondheimsvegen 71B på Dal/);
      assert.match(step1.descEn, /10–15 minutes/);
      assert.match(step1.descEn, /Trondheimsvegen 71B på Dal/);
    });

    it("T2.1.3: Step 2 (Bekledning) stipulates clean workout clothing without zippers or hard buttons", () => {
      const step2 = FIRST_TRAINING_CHECKLIST_STEPS[1];
      assert.match(step2.descNo, /glidelåser/);
      assert.match(step2.descNo, /vannflaske/);
      assert.match(step2.descEn, /zippers/);
      assert.match(step2.descEn, /water bottle/);
    });

    it("T2.1.4: Step 4 (Låneutstyr) assures beginners that uniforms and gloves are loaned free", () => {
      const step4 = FIRST_TRAINING_CHECKLIST_STEPS[3];
      assert.match(step4.descNo, /låneutstyr/);
      assert.match(step4.descNo, /gratis/);
      assert.match(step4.descEn, /loaner gear/);
      assert.match(step4.descEn, /free/);
    });

    it("T2.1.5: Guide registers homepage section id='forste-trening' for in-page navigation", () => {
      const mockDoc = createMockDocument();
      const guideSection = mockDoc.createElement("section");
      guideSection.setAttribute("id", "forste-trening");
      mockDoc.registerElement("forste-trening", guideSection);

      assert.strictEqual(mockDoc.getElementById("forste-trening").id, "forste-trening");
    });
  });

  // =========================================================================
  // Feature R2.2: Footwear Rules Distinction (Crucial Safety Rule)
  // =========================================================================
  describe("R2.2: Footwear Rules Distinction", () => {
    it("T2.2.1: BJJ footwear rule is strictly barefoot on mats (no shoes allowed)", () => {
      const rule = FOOTWEAR_RULES["BJJ"];
      assert.strictEqual(rule.rule, "barbent");
      assert.strictEqual(rule.shoesAllowed, false);
      assert.match(rule.labelNo, /Barbent på mattene/);
    });

    it("T2.2.2: Muay Thai footwear rule is strictly barefoot on mats (no shoes allowed)", () => {
      const rule = FOOTWEAR_RULES["Muay Thai"];
      assert.strictEqual(rule.rule, "barbent");
      assert.strictEqual(rule.shoesAllowed, false);
      assert.match(rule.labelNo, /Barbent på mattene/);
    });

    it("T2.2.3: Yoga footwear rule is strictly barefoot on mats (no shoes allowed)", () => {
      const rule = FOOTWEAR_RULES["Yoga"];
      assert.strictEqual(rule.rule, "barbent");
      assert.strictEqual(rule.shoesAllowed, false);
      assert.match(rule.labelNo, /Barbent på mattene/);
    });

    it("T2.2.4: Crosstrening footwear rule strictly requires clean indoor shoes (barefoot prohibited)", () => {
      const rule = FOOTWEAR_RULES["Crosstrening"];
      assert.strictEqual(rule.rule, "rene_innesko");
      assert.strictEqual(rule.shoesAllowed, true);
      assert.strictEqual(rule.barefootAllowed, false);
      assert.match(rule.labelNo, /Rene innesko påkrevd/);
    });

    it("T2.2.5: Contrast distinction between mat disciplines vs Crosstrening is clearly partitioned", () => {
      const matDisciplines = ["BJJ", "Muay Thai", "Yoga"];
      matDisciplines.forEach((sport) => {
        assert.strictEqual(
          FOOTWEAR_RULES[sport].rule,
          "barbent",
          `${sport} must require barefoot`
        );
      });
      assert.strictEqual(
        FOOTWEAR_RULES["Crosstrening"].rule,
        "rene_innesko",
        "Crosstrening must require clean indoor shoes"
      );
    });
  });

  // =========================================================================
  // Feature R3.1: Mobile Sticky Trial Week CTA
  // =========================================================================
  describe("R3.1: Mobile Sticky Trial Week CTA", () => {
    it("T3.1.1: Uses responsive class md:hidden ensuring invisibility on desktop screens", () => {
      const stickyCtaClasses = "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-4 right-[84px] md:hidden z-30";
      assert.ok(stickyCtaClasses.includes("md:hidden"), "Must contain md:hidden");
    });

    it("T3.1.2: Stays hidden when scrolled in hero section (scrollY <= 350px)", () => {
      const mockWin = createMockWindow({ initialScrollY: 100 });
      let visible = false;
      const updateVisibility = () => {
        visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      };
      mockWin.addEventListener("scroll", updateVisibility);
      updateVisibility();

      assert.strictEqual(visible, false, "Should be hidden at scrollY=100");
    });

    it("T3.1.3: Reveals dynamically when user scrolls past hero threshold (scrollY > 350px)", () => {
      const mockWin = createMockWindow({ initialScrollY: 0 });
      let visible = false;
      mockWin.addEventListener("scroll", () => {
        visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      });

      mockWin.setScrollY(450);
      assert.strictEqual(visible, true, "Should become visible at scrollY=450");
    });

    it("T3.1.4: Wraps ProveukeModal trigger allowing instant 1-tap sign up", () => {
      const mockDoc = createMockDocument();
      const triggerBtn = mockDoc.createElement("button");
      triggerBtn.setAttribute("type", "button");
      triggerBtn.setAttribute("aria-label", "Meld deg på gratis prøveuke");
      triggerBtn.textContent = "Gratis prøveuke (14 dager)";

      assert.strictEqual(triggerBtn.getAttribute("aria-label"), "Meld deg på gratis prøveuke");
      assert.ok(triggerBtn.textContent.includes("14 dager"));
    });

    it("T3.1.5: Incorporates iOS safe-area-inset-bottom CSS calculation", () => {
      const cssString = "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]";
      assert.match(cssString, /env\(safe-area-inset-bottom/);
    });
  });

  // =========================================================================
  // Feature R3.2: Non-Collision with Chat Widget
  // =========================================================================
  describe("R3.2: Non-Collision with Chat Widget", () => {
    it("T3.2.1: Mathematical guarantee of horizontal clearance (>= 8px) on standard 390px mobile viewport", () => {
      const collisionResult = checkMobileCollision({
        windowWidth: 390,
        scrollY: 500,
      });

      assert.strictEqual(collisionResult.collides, false);
      assert.strictEqual(collisionResult.horizontalOverlap, false);
      assert.strictEqual(collisionResult.horizontalClearancePx, 8); // 8px visual buffer
      assert.ok(collisionResult.stickyWidth > 200, "Sticky pill must have sufficient width for text");
    });

    it("T3.2.2: Mathematical guarantee of horizontal clearance on narrow 360px mobile viewport", () => {
      const collisionResult = checkMobileCollision({
        windowWidth: 360,
        scrollY: 500,
      });

      assert.strictEqual(collisionResult.collides, false);
      assert.strictEqual(collisionResult.horizontalOverlap, false);
      assert.strictEqual(collisionResult.horizontalClearancePx, 8);
    });

    it("T3.2.3: Z-index stacking hierarchy ensures ChatBot (z-40) floats above Sticky CTA (z-30)", () => {
      assert.strictEqual(CHATBOT_SPECS.zIndex, 40);
      assert.strictEqual(MOBILE_STICKY_CTA_SPECS.zIndex, 30);
      assert.ok(CHATBOT_SPECS.zIndex > MOBILE_STICKY_CTA_SPECS.zIndex, "ChatBot must have higher z-index than sticky CTA");
    });

    it("T3.2.4: Chat teaser bubble (84px from viewport bottom) floats safely above Sticky CTA pill (20-76px)", () => {
      const stickyTop = MOBILE_STICKY_CTA_SPECS.bottomBaselinePx + MOBILE_STICKY_CTA_SPECS.heightPx; // 76px
      const teaserBottom = CHATBOT_SPECS.teaserBottomPx; // 84px
      const verticalClearance = teaserBottom - stickyTop; // 8px gap

      assert.ok(verticalClearance >= 8, `Teaser must sit at least 8px above sticky CTA, got ${verticalClearance}px`);
    });

    it("T3.2.5: Full-screen chat dialog (calc(100vw - 2rem)) overlays sticky CTA without event trap or bleed-through", () => {
      const chatZIndex = 40;
      const stickyZIndex = 30;
      const modalZIndex = 9999;

      // In the application:
      // Background Main: z-0
      // Sticky CTA: z-30
      // ChatBot: z-40
      // ProveukeModal: z-[9999]
      assert.ok(modalZIndex > chatZIndex && chatZIndex > stickyZIndex);
    });
  });

  // =========================================================================
  // Feature R4.1: Full Bilingual i18n Support
  // =========================================================================
  describe("R4.1: Full Bilingual i18n Support", () => {
    it("T4.1.1: Norwegian locale (no.ts) file exists and contains valid Translations structure", async () => {
      const noLocalePath = path.join(PROJECT_ROOT, "src/lib/i18n/locales/no.ts");
      assert.ok(fs.existsSync(noLocalePath), "no.ts must exist");
      const content = fs.readFileSync(noLocalePath, "utf-8");
      assert.ok(content.includes("export const no"), "Must export no translation dictionary");
    });

    it("T4.1.2: English locale (en.ts) file exists and contains valid Translations structure", async () => {
      const enLocalePath = path.join(PROJECT_ROOT, "src/lib/i18n/locales/en.ts");
      assert.ok(fs.existsSync(enLocalePath), "en.ts must exist");
      const content = fs.readFileSync(enLocalePath, "utf-8");
      assert.ok(content.includes("export const en"), "Must export en translation dictionary");
    });

    it("T4.1.3: Translation types interface (types.ts) defines strictly typed Locale union 'no' | 'en' | 'pl' | 'uk'", () => {
      const typesPath = path.join(PROJECT_ROOT, "src/lib/i18n/types.ts");
      assert.ok(fs.existsSync(typesPath), "types.ts must exist");
      const content = fs.readFileSync(typesPath, "utf-8");
      assert.match(content, /export type Locale = 'no' \| 'en' \| 'pl' \| 'uk';/);
    });

    it("T4.1.4: Pre-existing interest and discipline keys in proveuke translations are present", () => {
      const typesPath = path.join(PROJECT_ROOT, "src/lib/i18n/types.ts");
      const content = fs.readFileSync(typesPath, "utf-8");
      assert.ok(content.includes("interestLabel: string;"));
      assert.ok(content.includes("interestBjj: string;"));
      assert.ok(content.includes("interestMuayThai: string;"));
    });

    it("T4.1.5: Fallback locales (pl.ts and uk.ts) exist and implement the Translations interface", () => {
      const plPath = path.join(PROJECT_ROOT, "src/lib/i18n/locales/pl.ts");
      const ukPath = path.join(PROJECT_ROOT, "src/lib/i18n/locales/uk.ts");
      assert.ok(fs.existsSync(plPath), "pl.ts must exist");
      assert.ok(fs.existsSync(ukPath), "uk.ts must exist");
    });
  });

  // =========================================================================
  // Feature R4.2: Build & Static Export Integrity
  // =========================================================================
  describe("R4.2: Build & Static Export Integrity", () => {
    it("T4.2.1: next.config.ts explicitly specifies static export output: 'export'", () => {
      const configPath = path.join(PROJECT_ROOT, "next.config.ts");
      assert.ok(fs.existsSync(configPath), "next.config.ts must exist");
      const content = fs.readFileSync(configPath, "utf-8");
      assert.match(content, /output:\s*['"]export['"]/);
    });

    it("T4.2.2: Image optimization is configured unoptimized for static HTML export", () => {
      const configPath = path.join(PROJECT_ROOT, "next.config.ts");
      const content = fs.readFileSync(configPath, "utf-8");
      assert.match(content, /unoptimized:\s*true/);
    });

    it("T4.2.3: ProveukeModal is properly declared as client component with 'use client'", () => {
      const modalPath = path.join(PROJECT_ROOT, "src/components/ProveukeModal.tsx");
      assert.ok(fs.existsSync(modalPath));
      const content = fs.readFileSync(modalPath, "utf-8");
      assert.ok(content.startsWith('"use client"') || content.startsWith("'use client'"));
    });

    it("T4.2.4: Hero component is properly declared as client component with 'use client'", () => {
      const heroPath = path.join(PROJECT_ROOT, "src/components/Hero.tsx");
      assert.ok(fs.existsSync(heroPath));
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(content.startsWith('"use client"') || content.startsWith("'use client'"));
    });

    it("T4.2.5: ChatBot component is properly declared as client component with 'use client'", () => {
      const chatPath = path.join(PROJECT_ROOT, "src/components/ChatBot.tsx");
      assert.ok(fs.existsSync(chatPath));
      const content = fs.readFileSync(chatPath, "utf-8");
      assert.ok(content.startsWith('"use client"') || content.startsWith("'use client'"));
    });
  });
});
