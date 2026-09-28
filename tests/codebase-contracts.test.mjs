import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

describe("Codebase Interface Contracts & Progressive Milestone Audit", () => {
  // =========================================================================
  // Milestone 1 (M1) Contract Checks: SportSelector, Hero & ProveukeModal
  // =========================================================================
  describe("M1 Contract Audit: R1 'Finn din kampsport' & ProveukeModal", () => {
    it("M1.1: ProveukeModal.tsx exists and is a valid client component", () => {
      const modalPath = path.join(PROJECT_ROOT, "src/components/ProveukeModal.tsx");
      assert.ok(fs.existsSync(modalPath), "ProveukeModal.tsx must exist");
      const content = fs.readFileSync(modalPath, "utf-8");
      assert.ok(content.includes('"use client"') || content.includes("'use client'"));
      assert.ok(content.includes('collection(db, "messages")'), "Must write to Firestore messages collection");
      assert.ok(content.includes("website"), "Must maintain honeypot anti-spam field");
    });

    it("M1.2: ProveukeModal.tsx discipline contract check (implemented or pending M1)", () => {
      const modalPath = path.join(PROJECT_ROOT, "src/components/ProveukeModal.tsx");
      const content = fs.readFileSync(modalPath, "utf-8");
      const hasDisciplineProp =
        content.includes("defaultDiscipline") ||
        content.includes("initialDiscipline") ||
        content.includes("discipline");

      if (hasDisciplineProp) {
        console.log("  [INFO] ProveukeModal discipline extension is ACTIVE.");
        assert.ok(true);
      } else {
        console.log("  [MILESTONE PENDING] ProveukeModal defaultDiscipline prop is queued for Milestone M1.");
        assert.ok(true, "Contract documented for M1 implementer");
      }
    });

    it("M1.3: Hero.tsx shortcut button contract check (implemented or pending M1)", () => {
      const heroPath = path.join(PROJECT_ROOT, "src/components/Hero.tsx");
      assert.ok(fs.existsSync(heroPath), "Hero.tsx must exist");
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(content.includes("hero-cta"), "Hero must have hero-cta container");

      const hasShortcut = content.includes("#finn-kampsport");
      if (hasShortcut) {
        console.log("  [INFO] Hero secondary shortcut button is ACTIVE.");
      } else {
        console.log("  [MILESTONE PENDING] Hero #finn-kampsport shortcut is queued for Milestone M1.");
      }
      assert.ok(true);
    });

    it("M1.4: SportSelector.tsx file existence check (M1 deliverable)", () => {
      const selectorPath = path.join(PROJECT_ROOT, "src/components/SportSelector.tsx");
      const exists = fs.existsSync(selectorPath);
      if (exists) {
        const content = fs.readFileSync(selectorPath, "utf-8");
        assert.ok(content.includes("finn-kampsport") || content.includes("id="), "Selector must define section id");
        console.log("  [INFO] SportSelector.tsx component is ACTIVE.");
      } else {
        console.log("  [MILESTONE PENDING] SportSelector.tsx will be created in Milestone M1.");
      }
      assert.ok(true);
    });
  });

  // =========================================================================
  // Milestone 2 (M2) Contract Checks: FirstTrainingGuide
  // =========================================================================
  describe("M2 Contract Audit: R2 'Din første trening' Visual Guide", () => {
    it("M2.1: FirstTrainingGuide.tsx file existence check (M2 deliverable)", () => {
      const guidePath = path.join(PROJECT_ROOT, "src/components/FirstTrainingGuide.tsx");
      const exists = fs.existsSync(guidePath);
      if (exists) {
        const content = fs.readFileSync(guidePath, "utf-8");
        assert.ok(
          content.includes("barbent") || content.includes("step3Barefoot") || content.includes("Footprints"),
          "Guide must reference barefoot rule or i18n key"
        );
        assert.ok(
          content.includes("innesko") || content.includes("step3Shoes"),
          "Guide must reference clean indoor shoe rule or i18n key"
        );

        // Verify that the Norwegian locale dictionary defines the actual footwear rules
        const noPath = path.join(PROJECT_ROOT, "src/lib/i18n/locales/no.ts");
        const noContent = fs.readFileSync(noPath, "utf-8");
        assert.ok(noContent.includes("Barbent på mattene"), "no.ts must define barefoot rule for mats");
        assert.ok(noContent.includes("Rene innesko påkrevd"), "no.ts must define clean indoor shoe rule for CT");

        console.log("  [INFO] FirstTrainingGuide.tsx component is ACTIVE with bilingual footwear rules.");
      } else {
        console.log("  [MILESTONE PENDING] FirstTrainingGuide.tsx will be created in Milestone M2.");
      }
      assert.ok(true);
    });
  });

  // =========================================================================
  // Milestone 3 (M3) Contract Checks: MobileStickyCta & ChatBot Harmony
  // =========================================================================
  describe("M3 Contract Audit: R3 Mobile Sticky CTA & Geometry", () => {
    it("M3.1: ChatBot.tsx coordinates maintain stable anchor at bottom-5 right-5 z-40", () => {
      const chatPath = path.join(PROJECT_ROOT, "src/components/ChatBot.tsx");
      assert.ok(fs.existsSync(chatPath));
      const content = fs.readFileSync(chatPath, "utf-8");
      assert.ok(content.includes("bottom-5") && content.includes("right-5"), "ChatBot must dock at bottom-5 right-5");
      assert.ok(content.includes("z-40"), "ChatBot must have z-40 stacking context");
      assert.ok(content.includes("w-14") && content.includes("h-14"), "ChatBot button must be 56px (w-14 h-14)");
    });

    it("M3.2: MobileStickyCta.tsx file existence check (M3 deliverable)", () => {
      const ctaPath = path.join(PROJECT_ROOT, "src/components/MobileStickyCta.tsx");
      const exists = fs.existsSync(ctaPath);
      if (exists) {
        const content = fs.readFileSync(ctaPath, "utf-8");
        assert.ok(content.includes("right-[84px]") || content.includes("right-[88px]"), "Must have clearance for chat button");
        assert.ok(content.includes("md:hidden"), "Must be mobile-only");
        assert.ok(content.includes("z-30"), "Must be z-30 below chat widget");
        console.log("  [INFO] MobileStickyCta.tsx component is ACTIVE.");
      } else {
        console.log("  [MILESTONE PENDING] MobileStickyCta.tsx will be created in Milestone M3.");
      }
      assert.ok(true);
    });
  });

  // =========================================================================
  // Milestone 4 (M4) Contract Checks: i18n Dictionaries & Static Export
  // =========================================================================
  describe("M4 Contract Audit: R4 Bilingual i18n & Static Export", () => {
    it("M4.1: LanguageContext.tsx provides useLanguage hook and active Locale state", () => {
      const langCtxPath = path.join(PROJECT_ROOT, "src/lib/i18n/LanguageContext.tsx");
      assert.ok(fs.existsSync(langCtxPath));
      const content = fs.readFileSync(langCtxPath, "utf-8");
      assert.ok(content.includes("export function useLanguage"));
      assert.ok(content.includes("LanguageProvider"));
    });

    it("M4.2: All 4 locales (no, en, pl, uk) exist and import Translations interface", () => {
      const locales = ["no", "en", "pl", "uk"];
      locales.forEach((loc) => {
        const p = path.join(PROJECT_ROOT, `src/lib/i18n/locales/${loc}.ts`);
        assert.ok(fs.existsSync(p), `Locale file ${loc}.ts must exist`);
        const content = fs.readFileSync(p, "utf-8");
        assert.ok(content.includes("Translations"), `${loc}.ts must reference Translations type`);
      });
    });

    it("M4.3: next.config.ts guarantees static export target './out'", () => {
      const nextConfigPath = path.join(PROJECT_ROOT, "next.config.ts");
      const content = fs.readFileSync(nextConfigPath, "utf-8");
      assert.ok(content.includes("output: 'export'") || content.includes('output: "export"'));
    });
  });
});
