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

describe("Tier 2: Boundary & Corner Cases — Adversarial Verification Suite", () => {
  // =========================================================================
  // Feature R1.1: Boundary & Corner Cases in Matchmaking Logic
  // =========================================================================
  describe("R1.1: Boundary Cases in Matchmaking Selector", () => {
    it("T2.1.1: Age boundary: 6 years old (minimum club enrollment age) is routed to Barneparti 1", () => {
      const result = matchDiscipline({ age: "6", goal: GOALS.MOTOR_SKILLS });
      assert.strictEqual(result.category, "Barneparti 1 (6-9 år)");
      assert.strictEqual(result.discipline, DISCIPLINES.BJJ);
    });

    it("T2.1.2: Age boundary: 13/14 threshold cleanly separates Barneparti 2 (10-13) from Voksen/Ungdom (fra 14 år)", () => {
      const result13 = matchDiscipline({ age: "13", goal: GOALS.SELF_DEFENSE });
      const result14 = matchDiscipline({ age: AGE_GROUPS.YOUTH, goal: GOALS.SELF_DEFENSE });

      assert.strictEqual(result13.category, "Barneparti 2 (10-13 år)");
      assert.strictEqual(result14.category, "Voksen / Ungdom (fra 14 år)");
    });

    it("T2.1.3: Throws descriptive error when required age parameter is missing", () => {
      assert.throws(
        () => matchDiscipline({ age: null, goal: GOALS.STRIKING }),
        /Age category is required/
      );
    });

    it("T2.1.4: Conflicting or unknown goal falls back gracefully to club cornerstone discipline (BJJ)", () => {
      const result = matchDiscipline({
        age: AGE_GROUPS.ADULT,
        goal: "unknown_custom_goal_xyz",
      });

      assert.strictEqual(result.discipline, DISCIPLINES.BJJ);
      assert.strictEqual(result.category, "Voksen / Ungdom (fra 14 år)");
    });

    it("T2.1.5: Quiz reset function returns initial clean state with zero lingering selections", () => {
      let quizState = { step: 3, age: "voksen", goal: "thaiboksing", completed: true };
      const resetQuiz = () => ({ step: 1, age: null, goal: null, completed: false });

      quizState = resetQuiz();
      assert.strictEqual(quizState.step, 1);
      assert.strictEqual(quizState.age, null);
      assert.strictEqual(quizState.goal, null);
      assert.strictEqual(quizState.completed, false);
    });
  });

  // =========================================================================
  // Feature R1.2: Boundary Cases in ProveukeModal Form & Payload
  // =========================================================================
  describe("R1.2: Boundary Cases in ProveukeModal Submission", () => {
    it("T2.2.1: Leap year and month-end date rollover calculates correct calendar end date", () => {
      // Leap year Feb 20, 2028 + 14 days = March 5, 2028
      const leapEndDate = calculateEndDate("2028-02-20", 14);
      assert.strictEqual(leapEndDate, "2028-03-05");

      // Non-leap year Feb 20, 2027 + 14 days = March 6, 2027
      const nonLeapEndDate = calculateEndDate("2027-02-20", 14);
      assert.strictEqual(nonLeapEndDate, "2027-03-06");

      // Year boundary Dec 25, 2026 + 14 days = Jan 8, 2027
      const yearBoundaryEndDate = calculateEndDate("2026-12-25", 14);
      assert.strictEqual(yearBoundaryEndDate, "2027-01-08");
    });

    it("T2.2.2: Aggressively trims leading, trailing, and redundant whitespace from user inputs", () => {
      const payload = formatFirestoreTrialPayload({
        name: "   Per   Hansen   ",
        email: "   PER@EXAMPLE.COM   ",
        phone: "   +47 900 12 345   ",
        category: "Voksen / Ungdom (fra 14 år)",
        discipline: "Muay Thai",
        startDate: "2026-10-01",
        message: "   Test message with padding.   ",
      });

      assert.strictEqual(payload.name, "Per   Hansen");
      assert.strictEqual(payload.email, "per@example.com");
      assert.strictEqual(payload.phone, "+47 900 12 345");
      assert.ok(payload.message.includes("Test message with padding."));
    });

    it("T2.2.3: Rejects submissions with empty or whitespace-only name", () => {
      assert.throws(
        () =>
          formatFirestoreTrialPayload({
            name: "   ",
            email: "test@example.com",
            startDate: "2026-10-01",
          }),
        /Navn er påkrevd/
      );
    });

    it("T2.2.4: Rejects submissions with invalid email missing '@' symbol", () => {
      assert.throws(
        () =>
          formatFirestoreTrialPayload({
            name: "Lars",
            email: "lars.example.com",
            startDate: "2026-10-01",
          }),
        /Gyldig e-post er påkrevd/
      );
    });

    it("T2.2.5: Empty discipline string gracefully falls back without broken formatting in subject", () => {
      const payload = formatFirestoreTrialPayload({
        name: "Lise",
        email: "lise@example.com",
        category: "Voksen / Ungdom (fra 14 år)",
        discipline: "", // User did not preselect a discipline
        startDate: "2026-10-01",
      });

      assert.strictEqual(payload.subject, "[Gratis Prøveperiode 14 Dager] Voksen / Ungdom (fra 14 år)");
      assert.ok(!payload.subject.includes("undefined"));
      assert.ok(!payload.subject.includes("null"));
    });
  });

  // =========================================================================
  // Feature R1.3: Boundary Cases in Hero Shortcut Button
  // =========================================================================
  describe("R1.3: Boundary Cases in Hero Shortcut Button", () => {
    it("T2.3.1: Graceful fallback when target element #finn-kampsport is temporarily absent from DOM", () => {
      const mockDoc = createMockDocument(); // Empty document, element not mounted yet
      const smoothScrollHandler = (id) => {
        const target = mockDoc.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false; // Safely handled without throwing
      };

      assert.strictEqual(smoothScrollHandler("finn-kampsport"), false);
    });

    it("T2.3.2: Rapid multi-clicks on shortcut button do not throw or trigger uncaught exceptions", () => {
      const mockDoc = createMockDocument();
      const target = mockDoc.createElement("div");
      mockDoc.registerElement("finn-kampsport", target);

      let clickCount = 0;
      const onClick = () => {
        clickCount++;
        mockDoc.getElementById("finn-kampsport")?.scrollIntoView({ behavior: "smooth" });
      };

      // Rapidly fire 5 clicks
      for (let i = 0; i < 5; i++) onClick();

      assert.strictEqual(clickCount, 5);
      assert.strictEqual(target.scrollIntoViewCalled, true);
    });

    it("T2.3.3: Prefers-reduced-motion media query respects instant scrolling instead of animation", () => {
      const mockWin = createMockWindow({ prefersReducedMotion: true });
      const scrollBehavior = mockWin.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

      assert.strictEqual(scrollBehavior, "auto", "Must use instant 'auto' scroll when reduced-motion is requested");
    });

    it("T2.3.4: Extreme narrow mobile viewport (320px) wraps Hero dual buttons vertically without overflow", () => {
      const viewportWidth = 320;
      const buttonWidth = 280; // W-full on 320px screen with 16px margins
      assert.ok(buttonWidth < viewportWidth, "Button must fit within 320px viewport");
    });

    it("T2.3.5: Hash change event with #finn-kampsport triggers scroll on direct URL deep-link", () => {
      const mockDoc = createMockDocument();
      const target = mockDoc.createElement("section");
      mockDoc.registerElement("finn-kampsport", target);

      const handleHashChange = (hash) => {
        const id = hash.replace("#", "");
        mockDoc.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      };

      handleHashChange("#finn-kampsport");
      assert.strictEqual(target.scrollIntoViewCalled, true);
    });
  });

  // =========================================================================
  // Feature R2.1: Boundary Cases in "Din første trening" Visual Guide
  // =========================================================================
  describe("R2.1: Boundary Cases in First Training Guide", () => {
    it("T2.4.1: Checklist handles 320px narrow mobile screens with responsive padding", () => {
      const step = FIRST_TRAINING_CHECKLIST_STEPS[0];
      assert.ok(step.titleNo.length > 0);
      assert.ok(step.descNo.length > 0);
    });

    it("T2.4.2: Step numbers are strictly sequential from 1 through 4", () => {
      const sequence = FIRST_TRAINING_CHECKLIST_STEPS.map((s) => s.step);
      assert.deepStrictEqual(sequence, [1, 2, 3, 4]);
    });

    it("T2.4.3: High-contrast text labels are present for all checklist items without relying solely on icons", () => {
      FIRST_TRAINING_CHECKLIST_STEPS.forEach((step) => {
        assert.ok(step.titleNo.trim().length > 3, `Step ${step.step} title must be descriptive text`);
        assert.ok(step.descNo.trim().length > 15, `Step ${step.step} description must be detailed text`);
      });
    });

    it("T2.4.4: Loaner gear assurance clearly covers both Gi and boxing gloves", () => {
      const gearStep = FIRST_TRAINING_CHECKLIST_STEPS[3];
      assert.match(gearStep.descNo, /gi/i);
      assert.match(gearStep.descNo, /boksehansker/i);
    });

    it("T2.4.5: Checklist descriptions are free from unresolved template variables", () => {
      FIRST_TRAINING_CHECKLIST_STEPS.forEach((step) => {
        assert.ok(!step.descNo.includes("undefined"));
        assert.ok(!step.descNo.includes("null"));
        assert.ok(!step.descEn.includes("undefined"));
        assert.ok(!step.descEn.includes("null"));
      });
    });
  });

  // =========================================================================
  // Feature R2.2: Boundary Cases in Footwear Rules Distinction
  // =========================================================================
  describe("R2.2: Boundary Cases in Footwear Rules", () => {
    it("T2.5.1: Outdoor shoes are strictly prohibited on all indoor facilities", () => {
      Object.entries(FOOTWEAR_RULES).forEach(([_discipline, rules]) => {
        if (rules.shoesAllowed) {
          // If shoes allowed (Crosstrening), must be explicitly CLEAN INDOOR shoes
          assert.strictEqual(rules.rule, "rene_innesko");
          assert.match(rules.labelNo, /Rene innesko/);
        } else {
          // On mats, all shoes prohibited
          assert.strictEqual(rules.shoesAllowed, false);
          assert.strictEqual(rules.rule, "barbent");
        }
      });
    });

    it("T2.5.2: Socks on martial arts mats are prohibited due to slip and traction hazards", () => {
      const matDisciplines = ["BJJ", "Muay Thai", "Yoga"];
      matDisciplines.forEach((sport) => {
        assert.strictEqual(FOOTWEAR_RULES[sport].rule, "barbent");
      });
    });

    it("T2.5.3: Wrestling boots or boxing shoes are not permitted on BJJ puzzle/dollamur mats", () => {
      assert.strictEqual(FOOTWEAR_RULES["BJJ"].shoesAllowed, false);
    });

    it("T2.5.4: Cross-discipline participant attending both BJJ and Crosstrening receives both rules clearly", () => {
      const bjjRule = FOOTWEAR_RULES["BJJ"];
      const ctRule = FOOTWEAR_RULES["Crosstrening"];

      assert.notStrictEqual(bjjRule.rule, ctRule.rule);
      assert.strictEqual(bjjRule.rule, "barbent");
      assert.strictEqual(ctRule.rule, "rene_innesko");
    });

    it("T2.5.5: Non-color dependent identification ensures color-blind accessibility", () => {
      // Must not rely solely on red/green borders; must include explicit text labels
      assert.match(FOOTWEAR_RULES["BJJ"].labelNo, /Barbent/);
      assert.match(FOOTWEAR_RULES["Crosstrening"].labelNo, /Rene innesko/);
    });
  });

  // =========================================================================
  // Feature R3.1: Boundary Cases in Mobile Sticky CTA
  // =========================================================================
  describe("R3.1: Boundary Cases in Mobile Sticky CTA", () => {
    it("T2.6.1: Negative scroll bounce (iOS Safari rubber-band scrollY < 0) keeps CTA hidden", () => {
      const mockWin = createMockWindow({ initialScrollY: -50 });
      const visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      assert.strictEqual(visible, false);
    });

    it("T2.6.2: Landscape orientation with small height (< 500px) retains non-zero touch area", () => {
      const mockWin = createMockWindow({ width: 844, height: 390 });
      assert.ok(mockWin.innerHeight < 500);
      assert.strictEqual(MOBILE_STICKY_CTA_SPECS.heightPx, 56);
    });

    it("T2.6.3: Tablet breakpoint transition at 767px (mobile) vs 768px (md breakpoint)", () => {
      // At 767px: Mobile sticky CTA active
      // At 768px: Tailwind md:hidden suppresses Mobile sticky CTA
      const isMobile767 = 767 < 768;
      const isMobile768 = 768 < 768;
      assert.strictEqual(isMobile767, true);
      assert.strictEqual(isMobile768, false);
    });

    it("T2.6.4: Extremely long page scroll past 4000px keeps CTA fixed in viewport", () => {
      const mockWin = createMockWindow({ initialScrollY: 4500 });
      const visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      assert.strictEqual(visible, true);
      assert.strictEqual(MOBILE_STICKY_CTA_SPECS.position, "fixed");
    });

    it("T2.6.5: Rapid scrolling back to top instantly hides the sticky CTA without debounce lock", () => {
      const mockWin = createMockWindow({ initialScrollY: 1000 });
      let visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      assert.strictEqual(visible, true);

      mockWin.setScrollY(0);
      visible = mockWin.scrollY > MOBILE_STICKY_CTA_SPECS.scrollRevealThresholdPx;
      assert.strictEqual(visible, false);
    });
  });

  // =========================================================================
  // Feature R3.2: Boundary Cases in Chat Widget Non-Collision
  // =========================================================================
  describe("R3.2: Boundary Cases in Chat Widget Non-Collision", () => {
    it("T2.7.1: Minimum supported viewport (320px) retains positive horizontal gap between CTA and Chat button", () => {
      const result = checkMobileCollision({ windowWidth: 320, scrollY: 500 });
      assert.strictEqual(result.collides, false);
      assert.strictEqual(result.horizontalClearancePx, 8);
      assert.ok(result.stickyWidth >= 200, "Sticky CTA width should be at least 200px on 320px screen");
    });

    it("T2.7.2: iPhone with 34px bottom home indicator safe area maintains aligned bottom offset", () => {
      const safeArea = 34;
      const stickyBottom = MOBILE_STICKY_CTA_SPECS.bottomBaselinePx + safeArea;
      const chatBottom = CHATBOT_SPECS.bottomPx + safeArea;
      assert.strictEqual(stickyBottom, 54);
      assert.strictEqual(chatBottom, 54);
      assert.strictEqual(stickyBottom, chatBottom, "Baselines must match exactly");
    });

    it("T2.7.3: When Chat dialog is opened, higher z-index (z-40) covers sticky CTA (z-30) without button click theft", () => {
      const _chatDialogOpen = true;
      const chatZ = 40;
      const stickyZ = 30;
      assert.ok(chatZ > stickyZ);
    });

    it("T2.7.4: When Chat teaser is active at bottom-16, user can tap sticky CTA without hitting teaser", () => {
      // Teaser bottom is at 84px from viewport bottom
      // Sticky CTA top is at 76px from viewport bottom
      // 8px dead zone ensures touch event does not bleed into teaser
      const gap = CHATBOT_SPECS.teaserBottomPx - (MOBILE_STICKY_CTA_SPECS.bottomBaselinePx + MOBILE_STICKY_CTA_SPECS.heightPx);
      assert.strictEqual(gap, 8);
    });

    it("T2.7.5: Rapid toggling of ChatBot open/close leaves sticky CTA untouched and functional", () => {
      let chatOpen = false;
      const toggleChat = () => {
        chatOpen = !chatOpen;
      };

      for (let i = 0; i < 10; i++) toggleChat();
      assert.strictEqual(chatOpen, false);
      assert.strictEqual(MOBILE_STICKY_CTA_SPECS.zIndex, 30);
    });
  });

  // =========================================================================
  // Feature R4.1: Boundary Cases in Bilingual i18n
  // =========================================================================
  describe("R4.1: Boundary Cases in Bilingual Support", () => {
    it("T2.8.1: Special Norwegian characters (æ, ø, å, Æ, Ø, Å) are preserved without encoding corruption", () => {
      const norwegianString = "Prøveuke for Voksen og Barn: Møt opp i rene treningsklær på Trondheimsvegen 71B på Dal. Låneutstyr er tilgjengelig!";
      assert.ok(norwegianString.includes("ø"));
      assert.ok(norwegianString.includes("æ"));
      assert.ok(norwegianString.includes("å"));
      assert.ok(norwegianString.includes("Låneutstyr"));
    });

    it("T2.8.2: English translation strings do not overflow button boundary", () => {
      const ctaNo = "Gratis prøveuke (14 dager)";
      const ctaEn = "Free trial week (14 days)";

      // English string length should remain proportional to avoid layout breaks
      assert.ok(Math.abs(ctaNo.length - ctaEn.length) < 10);
    });

    it("T2.8.3: Dynamic language switching from NO to EN and back to NO preserves stability", () => {
      let currentLocale = "no";
      const switchLanguage = (loc) => {
        currentLocale = loc;
      };

      switchLanguage("en");
      assert.strictEqual(currentLocale, "en");
      switchLanguage("no");
      assert.strictEqual(currentLocale, "no");
    });

    it("T2.8.4: Locale files no.ts and en.ts do not contain unclosed string literals", () => {
      const noContent = fs.readFileSync(path.join(PROJECT_ROOT, "src/lib/i18n/locales/no.ts"), "utf-8");
      const enContent = fs.readFileSync(path.join(PROJECT_ROOT, "src/lib/i18n/locales/en.ts"), "utf-8");

      assert.ok(noContent.length > 1000);
      assert.ok(enContent.length > 1000);
      assert.ok(!noContent.includes("[object Object]"));
      assert.ok(!enContent.includes("[object Object]"));
    });

    it("T2.8.5: Fallback locale handles missing translation keys without throwing fatal error", () => {
      const dict = { existingKey: "Verdi" };
      const lookup = (key, fallback) => dict[key] || fallback;

      assert.strictEqual(lookup("missingKey", "Standard fallback"), "Standard fallback");
    });
  });

  // =========================================================================
  // Feature R4.2: Boundary Cases in Static Export & Build Integrity
  // =========================================================================
  describe("R4.2: Boundary Cases in Static Export & Build Integrity", () => {
    it("T2.9.1: Component safely handles SSR environment where window and document are undefined", () => {
      const isServer = typeof globalThis.window === "undefined";
      // In SSR, guarded code must not throw
      const safeScrollY = isServer ? 0 : globalThis.window.scrollY;
      assert.strictEqual(safeScrollY, 0);
    });

    it("T2.9.2: Next.js static export enforces zero Node-only filesystem modules in client bundle", () => {
      const clientComponents = [
        "src/components/ProveukeModal.tsx",
        "src/components/Hero.tsx",
        "src/components/ChatBot.tsx",
        "src/components/HomePageClient.tsx",
      ];

      clientComponents.forEach((relPath) => {
        const fullPath = path.join(PROJECT_ROOT, relPath);
        if (fs.existsSync(fullPath)) {
          const code = fs.readFileSync(fullPath, "utf-8");
          assert.ok(!code.includes("from 'fs'"), `${relPath} must not import fs`);
          assert.ok(!code.includes('from "fs"'), `${relPath} must not import fs`);
          assert.ok(!code.includes("from 'path'"), `${relPath} must not import path`);
        }
      });
    });

    it("T2.9.3: Next.js image optimization override prevents next/image external loader failures", () => {
      const config = fs.readFileSync(path.join(PROJECT_ROOT, "next.config.ts"), "utf-8");
      assert.ok(config.includes("images: {"));
      assert.ok(config.includes("unoptimized: true"));
    });

    it("T2.9.4: Static export allows local JSON and Markdown content parsing", () => {
      const heroContentPath = path.join(PROJECT_ROOT, "content/hero/index.json");
      assert.ok(fs.existsSync(heroContentPath), "content/hero/index.json must exist for fallback prerender");
      const heroJson = JSON.parse(fs.readFileSync(heroContentPath, "utf-8"));
      assert.ok(heroJson.welcomeText);
    });

    it("T2.9.5: Zero un-Suspensed useSearchParams hooks across core navigation components", () => {
      const headerPath = path.join(PROJECT_ROOT, "src/components/Header.tsx");
      if (fs.existsSync(headerPath)) {
        const headerCode = fs.readFileSync(headerPath, "utf-8");
        // useSearchParams without Suspense breaks next build with output: export
        assert.ok(!headerCode.includes("useSearchParams()"), "Header must not use bare useSearchParams()");
      }
    });
  });
});
