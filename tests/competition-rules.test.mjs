import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  ALWAYS_LEGAL_FOUNDATIONS,
  IBJJF_2027_TECHNIQUES,
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
  resolveRuleLevel,
} from "../src/lib/ibjjf-rules.ts";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

describe("IBJJF 2027 Rule Engine & /konkurranse Route Contracts", () => {
  describe("Del 1: Aldersklasser, belteutvalg og de 6 nivåene (Regel 1.3 & 6.2.3 N)", () => {
    it("Skjuler beltevalg for barn (4–12) og ungdom (13–15), viser 3 belter for Juvenile og 5 for Adult/Master", () => {
      assert.deepEqual(getAvailableBelts("kids_4_12"), []);
      assert.deepEqual(getAvailableBelts("youth_13_15"), []);
      assert.deepEqual(getAvailableBelts("juvenile_16_17"), ["white", "blue", "purple"]);
      assert.deepEqual(getAvailableBelts("adult"), ["white", "blue", "purple", "brown", "black"]);
      assert.deepEqual(getAvailableBelts("master"), ["white", "blue", "purple", "brown", "black"]);

      // Normalisering når man bytter fra voksen svart belte ned til Juvenile eller Barn
      assert.equal(normalizeBeltForAge("kids_4_12", "black"), null);
      assert.equal(normalizeBeltForAge("youth_13_15", "blue"), null);
      assert.equal(normalizeBeltForAge("juvenile_16_17", "black"), "white");
      assert.equal(normalizeBeltForAge("juvenile_16_17", "purple"), "purple");
    });

    it("Beregner eksakt riktig nivå (Nivå 1 til 6) for alle kombinasjoner av alder, belte og Gi/No-Gi", () => {
      // Nivå 1: 4–12 år
      assert.equal(resolveRuleLevel("kids_4_12", null, "gi"), 1);
      assert.equal(resolveRuleLevel("kids_4_12", null, "nogi"), 1);

      // Nivå 2: 13–15 år
      assert.equal(resolveRuleLevel("youth_13_15", null, "gi"), 2);
      assert.equal(resolveRuleLevel("youth_13_15", null, "nogi"), 2);

      // Nivå 3: Juvenile (alle belter) + Hvitt belte Adult til Master 8
      for (const belt of ["white", "blue", "purple"]) {
        assert.equal(resolveRuleLevel("juvenile_16_17", belt, "gi"), 3);
        assert.equal(resolveRuleLevel("juvenile_16_17", belt, "nogi"), 3);
      }
      assert.equal(resolveRuleLevel("adult", "white", "gi"), 3);
      assert.equal(resolveRuleLevel("adult", "white", "nogi"), 3);
      assert.equal(resolveRuleLevel("master", "white", "gi"), 3);
      assert.equal(resolveRuleLevel("master", "white", "nogi"), 3);

      // Nivå 4: Blått og lilla belte Adult til Master 8 (Gi og No-Gi)
      for (const age of ["adult", "master"]) {
        for (const belt of ["blue", "purple"]) {
          assert.equal(resolveRuleLevel(age, belt, "gi"), 4);
          assert.equal(resolveRuleLevel(age, belt, "nogi"), 4);
        }
      }

      // Nivå 5: Brunt og svart belte i all Gi, samt Master 1–8 No-Gi
      for (const belt of ["brown", "black"]) {
        assert.equal(resolveRuleLevel("adult", belt, "gi"), 5);
        assert.equal(resolveRuleLevel("master", belt, "gi"), 5);
        assert.equal(resolveRuleLevel("master", belt, "nogi"), 5);
      }

      // Nivå 6: KUN Adult No-Gi for brunt og svart belte
      assert.equal(resolveRuleLevel("adult", "brown", "nogi"), 6);
      assert.equal(resolveRuleLevel("adult", "black", "nogi"), 6);
    });

    it("Har oppdaterte 2027-kamptider inkludert Master 7 (61–65 år: 5 min) og Master 8 (66+ år: 4 min)", () => {
      assert.equal(getMatchDuration("kids_4_12", null).minutesDisplayNo, "2–4 minutter");
      assert.equal(getMatchDuration("youth_13_15", null).minutesDisplayNo, "4 minutter");
      assert.equal(getMatchDuration("juvenile_16_17", "blue").minutesDisplayNo, "5 minutter");

      assert.equal(getMatchDuration("adult", "white").minutesDisplayNo, "5 minutter");
      assert.equal(getMatchDuration("adult", "blue").minutesDisplayNo, "6 minutter");
      assert.equal(getMatchDuration("adult", "purple").minutesDisplayNo, "7 minutter");
      assert.equal(getMatchDuration("adult", "brown").minutesDisplayNo, "8 minutter");
      assert.equal(getMatchDuration("adult", "black").minutesDisplayNo, "10 minutter");

      assert.equal(getMatchDuration("master", "blue", "master_1").minutesDisplayNo, "5 minutter");
      assert.equal(getMatchDuration("master", "purple", "master_1").minutesDisplayNo, "6 minutter");
      assert.equal(getMatchDuration("master", "black", "master_7").minutesDisplayNo, "5 minutter");
      assert.equal(getMatchDuration("master", "black", "master_8").minutesDisplayNo, "4 minutter");
    });
  });

  describe("Del 2 & 3: Særregel Jumping Guard (6.2.3 M) og de 26 teknikkene i Gruppe A–F", () => {
    it("Jumping Guard gir direkte DQ (Severe Foul) for u/15 og alle hvitbelter, men er tillatt for Juvenile blå/lilla og Adult+ blå–svart", () => {
      assert.equal(evaluateJumpingGuard("kids_4_12", null).isLegal, false);
      assert.equal(evaluateJumpingGuard("youth_13_15", null).isLegal, false);
      assert.equal(evaluateJumpingGuard("juvenile_16_17", "white").isLegal, false);
      assert.equal(evaluateJumpingGuard("adult", "white").isLegal, false);
      assert.equal(evaluateJumpingGuard("master", "white").isLegal, false);

      // Juvenile blå og lilla HAR lov til å hoppe guard selv om de ellers er på Nivå 3!
      assert.equal(evaluateJumpingGuard("juvenile_16_17", "blue").isLegal, true);
      assert.equal(evaluateJumpingGuard("juvenile_16_17", "purple").isLegal, true);

      for (const belt of ["blue", "purple", "brown", "black"]) {
        assert.equal(evaluateJumpingGuard("adult", belt).isLegal, true);
        assert.equal(evaluateJumpingGuard("master", belt).isLegal, true);
      }
    });

    it("Inneholder alle 26 nummererte teknikker i Gruppe A–F og låser dem progressivt opp per nivå", () => {
      assert.equal(IBJJF_2027_TECHNIQUES.length, 26);

      // Nivå 1 (4–12 Gi): 0 opplåst, 26 ulovlige
      const l1 = evaluateTechniquesForSelection("kids_4_12", null, "gi");
      assert.equal(l1.legal.length, 0);
      assert.equal(l1.illegal.length, 26);

      // Nivå 2 (13–15 Gi): Gruppe A (#1) lovlig, #2–26 ulovlige
      const l2 = evaluateTechniquesForSelection("youth_13_15", null, "gi");
      assert.deepEqual(l2.legal.map((t) => t.id), [1]);
      assert.equal(l2.illegal.length, 25);

      // Nivå 3 (Juvenile / Hvitt belte Gi): Gruppe A–B (#1–7) lovlige; #8 (rett fotlås) ULOVLIG i 2027!
      const l3 = evaluateTechniquesForSelection("juvenile_16_17", "blue", "gi");
      assert.deepEqual(l3.legal.map((t) => t.id), [1, 2, 3, 4, 5, 6, 7]);
      const straightFootLockL3 = l3.illegal.find((t) => t.id === 8);
      assert.ok(straightFootLockL3, "Rett fotlås (#8) må være ulovlig på Nivå 3 fra 2027");
      assert.equal(straightFootLockL3.change2027, "newly_banned");

      // Unntak for teknikk #11 (Single leg med hodet på utsiden): ingen straff/DQ på Nivå 1–3
      const singleLegL3 = l3.illegal.find((t) => t.id === 11);
      assert.ok(singleLegL3);
      assert.equal(singleLegL3.noPenaltyException, true);
      assert.ok(singleLegL3.consequenceNo.includes("ingen straff"));

      // Nivå 4 (Blått & Lilla Adult–Master): Gruppe A–C (#1–12) lovlige inkl. #12 rotasjon mot ikke-angrepet fot
      const l4 = evaluateTechniquesForSelection("adult", "blue", "gi");
      assert.deepEqual(l4.legal.map((t) => t.id), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const footLockTurnL4 = l4.legal.find((t) => t.id === 12);
      assert.ok(footLockTurnL4);
      assert.equal(footLockTurnL4.change2027, "newly_allowed");

      // Nivå 5 (Brunt/Svart Gi & Master No-Gi): Gruppe A–D (#1–16) lovlige, Gruppe E–F (#17–26) ulovlige
      const l5Gi = evaluateTechniquesForSelection("adult", "brown", "gi");
      assert.equal(l5Gi.legal.length, 16);
      assert.equal(l5Gi.illegal.length, 10);

      const l5MasterNoGi = evaluateTechniquesForSelection("master", "black", "nogi");
      assert.equal(l5MasterNoGi.level, 5);
      assert.equal(l5MasterNoGi.legal.length, 16);
      // I No-Gi bortfaller #25 naturlig (beltegrep mot single leg)
      assert.equal(l5MasterNoGi.notApplicableInStyle.length, 1);
      assert.equal(l5MasterNoGi.notApplicableInStyle[0].id, 25);
      assert.equal(l5MasterNoGi.illegal.length, 9);

      // Nivå 6 (Adult Brunt/Svart No-Gi): Gruppe A–E (#1–20 inkl. Heel Hook & Knee Reaping) lovlige!
      const l6 = evaluateTechniquesForSelection("adult", "black", "nogi");
      assert.equal(l6.level, 6);
      assert.equal(l6.legal.length, 20);
      assert.deepEqual(l6.illegal.map((t) => t.id), [21, 22, 23, 24, 26]);
      assert.deepEqual(l6.notApplicableInStyle.map((t) => t.id), [25]);
    });
  });

  describe("Del 4 & 5: 2027 Draktregler, Kampregler og Knee Reaping spesialregler", () => {
    it("Har oppdaterte 2027 No-Gi draktregler (>50% hvit/svart rashguard og spats tillatt for menn)", () => {
      const whiteNoGi = getUniformEvaluation("adult", "white", "nogi");
      assert.ok(whiteNoGi.primaryRequirementNo.includes("50 %"));
      assert.ok(whiteNoGi.secondaryPointsNo.some((p) => p.includes("Spats")));

      const blackNoGi = getUniformEvaluation("adult", "black", "nogi");
      assert.ok(blackNoGi.primaryRequirementNo.includes("overveiende svart"));

      const blueNoGi = getUniformEvaluation("adult", "blue", "nogi");
      assert.ok(blueNoGi.primaryRequirementNo.includes("10 %"));
      assert.ok(blueNoGi.primaryRequirementNo.includes("forfra og bakfra"));
    });

    it("Skiller riktig mellom lilla-og-lavere vs. brunt/svart ved sittende kryssede ben og Knee Reaping", () => {
      const purpleGi = evaluateKneeReaping("adult", "purple", "gi");
      assert.equal(purpleGi.isReapingLegal, false);
      assert.ok(purpleGi.crossedLegsStandupRuleNo.includes("UTEN straff"));

      const brownGi = evaluateKneeReaping("adult", "brown", "gi");
      assert.equal(brownGi.isReapingLegal, false);
      assert.ok(brownGi.crossedLegsStandupRuleNo.includes("stopper dommeren IKKE kampen"));

      const blackAdultNoGi = evaluateKneeReaping("adult", "black", "nogi");
      assert.equal(blackAdultNoGi.isReapingLegal, true);

      assert.ok(NEW_2027_MATCH_RULES.length >= 6);
    });
  });

  describe("Rute-, navigasjons- og Smoothcomp-kontrakter", () => {
    it("Eksponerer /konkurranse i Footer, ClubLinks, FirstTrainingGuide og sitemap, men IKKE i Header", () => {
      const pagePath = path.join(PROJECT_ROOT, "src/app/konkurranse/page.tsx");
      assert.ok(fs.existsSync(pagePath), "/konkurranse/page.tsx må eksistere");

      const headerContent = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/Header.tsx"),
        "utf-8"
      );
      assert.ok(
        !headerContent.includes("/konkurranse"),
        "Header.tsx skal IKKE ha lenke til /konkurranse i toppmenyen"
      );

      const globalJson = fs.readFileSync(
        path.join(PROJECT_ROOT, "content/global/index.json"),
        "utf-8"
      );
      assert.ok(
        !globalJson.includes("/konkurranse"),
        "content/global/index.json skal IKKE ha /konkurranse i toppmenyen"
      );

      for (const relPath of [
        "src/components/Footer.tsx",
        "src/components/ClubLinks.tsx",
        "src/components/FirstTrainingGuide.tsx",
        "src/app/sitemap.ts",
      ]) {
        const content = fs.readFileSync(path.join(PROJECT_ROOT, relPath), "utf-8");
        assert.ok(content.includes("/konkurranse"), `${relPath} må lenke til /konkurranse`);
      }
    });

    it("Holder SMOOTHCOMP_CONFIG.clubRegistrationName åpen (null) inntil klubbens eksakte teamnavn oppgis", () => {
      assert.equal(SMOOTHCOMP_CONFIG.url, "https://smoothcomp.com/en");
      assert.equal(SMOOTHCOMP_CONFIG.clubRegistrationName, null);
    });

    it("Bruker belter og aldersklasser i all synlig tekst i stedet for intern IBJJF-sjargong (Nivå 1–6 / Gruppe A–F)", () => {
      const jargonRegex = /\b(Nivå\s*[1-6]|Level\s*[1-6]|Gruppe\s*[A-F]|Group\s*[A-F])\b/i;

      // 1. Unlock-etiketter på teknikkort
      assert.equal(getTechniqueUnlockLabel(2, true), "Fra 13 år (Ungdom+)");
      assert.equal(getTechniqueUnlockLabel(3, true), "Fra 16 år / Hvitt belte+");
      assert.equal(getTechniqueUnlockLabel(4, true), "Fra Blått belte (Adult/Master)");
      assert.equal(getTechniqueUnlockLabel(5, true), "Fra Brunt belte (Adult/Master)");
      assert.equal(getTechniqueUnlockLabel(6, true), "Kun Adult Brunt & Svart No-Gi");
      assert.equal(getTechniqueUnlockLabel(null, true), "Alltid forbudt (alle belter)");

      for (const lvl of [2, 3, 4, 5, 6, null]) {
        assert.ok(!jargonRegex.test(getTechniqueUnlockLabel(lvl, true)));
        assert.ok(!jargonRegex.test(getTechniqueUnlockLabel(lvl, false)));
      }

      // 2. Klasse-/beltebeskrivelser for alle aldersklasser, belter og stiler
      for (const age of ["kids_4_12", "youth_13_15", "juvenile_16_17", "adult", "master"]) {
        const belts = getAvailableBelts(age);
        const testBelts = belts.length ? belts : [null];
        for (const belt of testBelts) {
          for (const style of ["gi", "nogi"]) {
            const evalRes = evaluateTechniquesForSelection(age, belt, style);
            const desc = getLevelDescription(evalRes.level, age, belt, style);
            for (const text of [desc.badgeNo, desc.badgeEn, desc.summaryNo, desc.summaryEn]) {
              assert.ok(!jargonRegex.test(text), `Fant sjargong i getLevelDescription(${age}, ${belt}, ${style}): ${text}`);
            }

            const reap = evaluateKneeReaping(age, belt, style);
            for (const text of [
              reap.reapingStatusNo,
              reap.reapingStatusEn,
              reap.crossedLegsStandupRuleNo,
              reap.crossedLegsStandupRuleEn,
              reap.fiftyFiftyNoteNo,
              reap.fiftyFiftyNoteEn,
            ]) {
              assert.ok(!jargonRegex.test(text), `Fant sjargong i evaluateKneeReaping: ${text}`);
            }
          }
        }
      }

      // 3. Alle 26 teknikker + Always Legal Foundations
      for (const tech of IBJJF_2027_TECHNIQUES) {
        for (const text of [
          tech.nameNo,
          tech.nameEn,
          tech.descriptionNo,
          tech.descriptionEn,
          tech.consequenceNo,
          tech.consequenceEn,
          tech.exceptionNoteNo ?? "",
          tech.exceptionNoteEn ?? "",
        ]) {
          assert.ok(!jargonRegex.test(text), `Fant sjargong i teknikk #${tech.id}: ${text}`);
        }
      }

      for (const item of ALWAYS_LEGAL_FOUNDATIONS) {
        for (const text of [item.titleNo, item.titleEn, item.detailNo, item.detailEn]) {
          assert.ok(!jargonRegex.test(text), `Fant sjargong i ALWAYS_LEGAL_FOUNDATIONS: ${text}`);
        }
      }

      // 4. Ingen synlig Nivå/Gruppe-sjargong i CompetitionGuide.tsx (stripp kommentarer først)
      const guideContent = fs
        .readFileSync(path.join(PROJECT_ROOT, "src/components/CompetitionGuide.tsx"), "utf-8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "");
      assert.ok(
        !jargonRegex.test(guideContent),
        "CompetitionGuide.tsx skal ikke inneholde Nivå 1–6 eller Gruppe A–F i synlig UI-tekst"
      );
    });
  });
});

