import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";

// The exact implementation in ProveukeModal.tsx:
function calculateEndDateModal(startDateStr) {
  if (!startDateStr) return "";
  const start = new Date(startDateStr + "T00:00:00");
  if (isNaN(start.getTime())) return "";
  const end = new Date(start);
  end.setDate(start.getDate() + 14);
  return end.toISOString().split("T")[0];
}

// SportSelector recommendation decision tree extracted from src/components/SportSelector.tsx
function getSelectorRecommendation(selectedAge, selectedGoal) {
  if (selectedAge === "barn_6_9") {
    const category = "Barneparti 1 (6-9 år)";
    if (selectedGoal === "allround") {
      return {
        recKey: "kidsCombo",
        category,
        discipline: "BJJ & Muay Thai (Begge kampsporter)",
        footwear: "barbent",
      };
    }
    return {
      recKey: "kidsBjj",
      category,
      discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
      footwear: "barbent",
    };
  }

  if (selectedAge === "barn_10_13") {
    const category = "Barneparti 2 (10-13 år)";
    if (selectedGoal === "disiplin" || selectedGoal === "striking") {
      return {
        recKey: "kidsMuayThai",
        category,
        discipline: "Muay Thai / Thaiboksing",
        footwear: "barbent",
      };
    }
    if (selectedGoal === "allround") {
      return {
        recKey: "kidsCombo",
        category,
        discipline: "BJJ & Muay Thai (Begge kampsporter)",
        footwear: "barbent",
      };
    }
    return {
      recKey: "kidsBjj",
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
        recKey: "muayThai",
        category,
        discipline: "Muay Thai / Thaiboksing",
        footwear: "barbent",
      };
    case "fitness":
      return {
        recKey: "crosstrening",
        category,
        discipline: "Crosstrening (CT)",
        footwear: "rene_innesko",
      };
    case "bevegelighet":
      return {
        recKey: "yoga",
        category,
        discipline: "Yoga (Yinsaya Yoga)",
        footwear: "barbent",
      };
    case "combo":
      return {
        recKey: "combo",
        category,
        discipline: "BJJ & Muay Thai (Begge kampsporter)",
        footwear: "barbent",
      };
    case "selvforsvar":
    default:
      return {
        recKey: "bjj",
        category,
        discipline: "BJJ (Brasiliansk Jiu-Jitsu)",
        footwear: "barbent",
      };
  }
}

describe("Adversarial Challenger Suite 1: Decision Trees, Date Calculations & Firestore Payloads", () => {

  // =========================================================================
  // Section 1: Date Calculations & Timezone Stress Testing
  // =========================================================================
  describe("Section 1: Date Arithmetic & Timezone Stress Testing", () => {
    it("Empirical Test 1.1: ProveukeModal.tsx calculateEndDate under UTC matches ground truth", () => {
      const res = execSync(
        `TZ="UTC" node -e '
        function calc(s) {
          if (!s) return "";
          const start = new Date(s + "T00:00:00");
          if (isNaN(start.getTime())) return "";
          const end = new Date(start);
          end.setDate(start.getDate() + 14);
          return end.toISOString().split("T")[0];
        }
        console.log(calc("2026-09-28"));
        '`
      ).toString().trim();

      assert.strictEqual(res, "2026-10-12", "Under UTC, 2026-09-28 + 14 days should be 2026-10-12");
    });

    it("Empirical Test 1.2: VULNERABILITY REPRODUCTION — ProveukeModal.tsx calculateEndDate in Europe/Oslo fails by 1 day (13 days instead of 14)", () => {
      const res = execSync(
        `TZ="Europe/Oslo" node -e '
        function calc(s) {
          if (!s) return "";
          const start = new Date(s + "T00:00:00");
          if (isNaN(start.getTime())) return "";
          const end = new Date(start);
          end.setDate(start.getDate() + 14);
          return end.toISOString().split("T")[0];
        }
        console.log(calc("2026-09-28"));
        '`
      ).toString().trim();

      console.log(`  [VULNERABILITY CONFIRMED] Europe/Oslo calculated end date: ${res} (Expected 2026-10-12, actual ${res})`);
      // This assertion proves the bug exists in the current implementation:
      assert.strictEqual(res, "2026-10-11", "Implementation bug reproduces: returns 2026-10-11 (13-day trial) due to local midnight conversion in UTC+2");
    });

    it("Empirical Test 1.3: VULNERABILITY REPRODUCTION — Month boundaries and leap years under Europe/Oslo are consistently off by 1 day", () => {
      const testCases = [
        { start: "2028-02-20", groundTruth: "2028-03-05" }, // Leap year
        { start: "2027-02-20", groundTruth: "2027-03-06" }, // Non-leap year
        { start: "2026-12-25", groundTruth: "2027-01-08" }, // Year boundary
        { start: "2026-04-30", groundTruth: "2026-05-14" }, // 30-day month boundary
        { start: "2026-10-20", groundTruth: "2026-11-03" }, // Crossing DST end (summer to winter)
      ];

      for (const tc of testCases) {
        const modalResult = execSync(
          `TZ="Europe/Oslo" node -e '
          function calc(s) {
            if (!s) return "";
            const start = new Date(s + "T00:00:00");
            if (isNaN(start.getTime())) return "";
            const end = new Date(start);
            end.setDate(start.getDate() + 14);
            return end.toISOString().split("T")[0];
          }
          console.log(calc("${tc.start}"));
          '`
        ).toString().trim();

        // In Europe/Oslo (UTC+1 or UTC+2), modalResult is always 1 day less than ground truth!
        const diffMs = new Date(tc.groundTruth) - new Date(modalResult);
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        assert.strictEqual(diffDays, 1, `Date ${tc.start} in Europe/Oslo must be 1 day less than ground truth due to timezone truncation bug`);
      }
    });

    it("Empirical Test 1.4: Invalid and boundary date string inputs handle gracefully without uncaught exceptions", () => {
      assert.strictEqual(calculateEndDateModal(""), "");
      assert.strictEqual(calculateEndDateModal(null), "");
      assert.strictEqual(calculateEndDateModal(undefined), "");
      assert.strictEqual(calculateEndDateModal("invalid-date-string"), "");
      assert.strictEqual(calculateEndDateModal("2026-99-99"), "");
    });
  });

  // =========================================================================
  // Section 2: Matchmaking Decision Tree Stress Testing
  // =========================================================================
  describe("Section 2: Matchmaking Decision Tree Matrix & Edge Cases", () => {
    it("Empirical Test 2.1: Full matrix test of all valid age and goal combinations", () => {
      const expectedDisciplineOptions = [
        "BJJ (Brasiliansk Jiu-Jitsu)",
        "Muay Thai / Thaiboksing",
        "Crosstrening (CT)",
        "Yoga (Yinsaya Yoga)",
        "BJJ & Muay Thai (Begge kampsporter)",
        "Usikker / Vil prøve alt",
      ];

      const expectedCategoryOptions = [
        "Voksen / Ungdom (fra 14 år)",
        "Barneparti 1 (6-9 år)",
        "Barneparti 2 (10-13 år)",
      ];

      const combinations = [
        { age: "barn_6_9", goal: "allround", expectedCategory: "Barneparti 1 (6-9 år)", expectedDiscipline: "BJJ & Muay Thai (Begge kampsporter)", footwear: "barbent" },
        { age: "barn_6_9", goal: "leken", expectedCategory: "Barneparti 1 (6-9 år)", expectedDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)", footwear: "barbent" },
        { age: "barn_6_9", goal: "disiplin", expectedCategory: "Barneparti 1 (6-9 år)", expectedDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)", footwear: "barbent" },
        { age: "barn_10_13", goal: "disiplin", expectedCategory: "Barneparti 2 (10-13 år)", expectedDiscipline: "Muay Thai / Thaiboksing", footwear: "barbent" },
        { age: "barn_10_13", goal: "striking", expectedCategory: "Barneparti 2 (10-13 år)", expectedDiscipline: "Muay Thai / Thaiboksing", footwear: "barbent" },
        { age: "barn_10_13", goal: "allround", expectedCategory: "Barneparti 2 (10-13 år)", expectedDiscipline: "BJJ & Muay Thai (Begge kampsporter)", footwear: "barbent" },
        { age: "barn_10_13", goal: "selvforsvar", expectedCategory: "Barneparti 2 (10-13 år)", expectedDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)", footwear: "barbent" },
        { age: "voksen", goal: "selvforsvar", expectedCategory: "Voksen / Ungdom (fra 14 år)", expectedDiscipline: "BJJ (Brasiliansk Jiu-Jitsu)", footwear: "barbent" },
        { age: "voksen", goal: "striking", expectedCategory: "Voksen / Ungdom (fra 14 år)", expectedDiscipline: "Muay Thai / Thaiboksing", footwear: "barbent" },
        { age: "voksen", goal: "fitness", expectedCategory: "Voksen / Ungdom (fra 14 år)", expectedDiscipline: "Crosstrening (CT)", footwear: "rene_innesko" },
        { age: "voksen", goal: "bevegelighet", expectedCategory: "Voksen / Ungdom (fra 14 år)", expectedDiscipline: "Yoga (Yinsaya Yoga)", footwear: "barbent" },
        { age: "voksen", goal: "combo", expectedCategory: "Voksen / Ungdom (fra 14 år)", expectedDiscipline: "BJJ & Muay Thai (Begge kampsporter)", footwear: "barbent" },
      ];

      for (const item of combinations) {
        const rec = getSelectorRecommendation(item.age, item.goal);
        assert.strictEqual(rec.category, item.expectedCategory, `Category mismatch for ${item.age} + ${item.goal}`);
        assert.strictEqual(rec.discipline, item.expectedDiscipline, `Discipline mismatch for ${item.age} + ${item.goal}`);
        assert.strictEqual(rec.footwear, item.footwear, `Footwear mismatch for ${item.age} + ${item.goal}`);
        assert.ok(expectedDisciplineOptions.includes(rec.discipline), `Discipline '${rec.discipline}' must exist in ProveukeModal options`);
        assert.ok(expectedCategoryOptions.includes(rec.category), `Category '${rec.category}' must exist in ProveukeModal options`);
      }
    });

    it("Empirical Test 2.2: Adversarial edge cases: unexpected or null goal falls back to BJJ without crashing", () => {
      const oddGoals = [null, undefined, "", "some_unrecognized_goal", "123", "!@#$%"];
      for (const goal of oddGoals) {
        const recVoksen = getSelectorRecommendation("voksen", goal);
        assert.strictEqual(recVoksen.discipline, "BJJ (Brasiliansk Jiu-Jitsu)");
        assert.strictEqual(recVoksen.category, "Voksen / Ungdom (fra 14 år)");

        const recKids1 = getSelectorRecommendation("barn_6_9", goal);
        assert.strictEqual(recKids1.discipline, "BJJ (Brasiliansk Jiu-Jitsu)");
        assert.strictEqual(recKids1.category, "Barneparti 1 (6-9 år)");

        const recKids2 = getSelectorRecommendation("barn_10_13", goal);
        assert.strictEqual(recKids2.discipline, "BJJ (Brasiliansk Jiu-Jitsu)");
        assert.strictEqual(recKids2.category, "Barneparti 2 (10-13 år)");
      }
    });

    it("Empirical Test 2.3: Resetting quiz clears all state cleanly without residual leakage", () => {
      let state = { step: 3, selectedAge: "barn_10_13", selectedGoal: "striking" };
      const reset = () => ({ step: 1, selectedAge: null, selectedGoal: null });
      state = reset();
      assert.strictEqual(state.step, 1);
      assert.strictEqual(state.selectedAge, null);
      assert.strictEqual(state.selectedGoal, null);
    });
  });

  // =========================================================================
  // Section 3: Firestore Payload & Form Formatting Testing
  // =========================================================================
  describe("Section 3: Firestore Submission Payload & Form Formatting", () => {
    function generatePayload({
      name = "Ola Nordmann",
      email = "ola@nordmann.no",
      phone = "99887766",
      category = "Voksen / Ungdom (fra 14 år)",
      discipline = "BJJ (Brasiliansk Jiu-Jitsu)",
      startDate = "2026-09-28",
      message = "Jeg vil prøve",
      website = "",
    } = {}) {
      const endDate = calculateEndDateModal(startDate);
      const subjectPrefix = discipline ? `${discipline} - ` : "";
      return {
        name,
        email,
        phone,
        subject: `[Gratis Prøveperiode 14 Dager] ${subjectPrefix}${category}`,
        message: `PÅMELDING TIL GRATIS PRØVEPERIODE (14 DAGER / 2 UKER)\n\nNavn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nKategori/Alder: ${category}\nØnsket gren: ${discipline || "Ikke spesifisert"}\nØnsket Startdato: ${startDate} (${startDate})\nSluttdato prøveperiode: ${endDate} (${endDate})\n\nEkstra melding/spørsmål:\n${message || "Ingen melding angitt."}`,
        discipline,
        category,
        startDate,
        endDate,
        isProveuke: true,
        followupSent: false,
        website,
      };
    }

    it("Empirical Test 3.1: Payload includes discipline in subject prefix when discipline is specified", () => {
      const payload = generatePayload({
        discipline: "Crosstrening (CT)",
        category: "Voksen / Ungdom (fra 14 år)",
      });
      assert.strictEqual(
        payload.subject,
        "[Gratis Prøveperiode 14 Dager] Crosstrening (CT) - Voksen / Ungdom (fra 14 år)"
      );
      assert.strictEqual(payload.discipline, "Crosstrening (CT)");
      assert.ok(payload.message.includes("Ønsket gren: Crosstrening (CT)"));
    });

    it("Empirical Test 3.2: Payload formats clean subject when discipline is empty", () => {
      const payload = generatePayload({
        discipline: "",
        category: "Barneparti 1 (6-9 år)",
      });
      assert.strictEqual(
        payload.subject,
        "[Gratis Prøveperiode 14 Dager] Barneparti 1 (6-9 år)"
      );
      assert.ok(!payload.subject.includes("undefined"));
      assert.ok(!payload.subject.includes("- Barneparti"));
      assert.ok(payload.message.includes("Ønsket gren: Ikke spesifisert"));
    });

    it("Empirical Test 3.3: All 5 disciplines propagate cleanly into Firestore payload", () => {
      const disciplines = [
        "BJJ (Brasiliansk Jiu-Jitsu)",
        "Muay Thai / Thaiboksing",
        "Crosstrening (CT)",
        "Yoga (Yinsaya Yoga)",
        "BJJ & Muay Thai (Begge kampsporter)",
      ];

      for (const disc of disciplines) {
        const payload = generatePayload({ discipline: disc });
        assert.strictEqual(payload.discipline, disc);
        assert.ok(payload.subject.includes(disc));
        assert.ok(payload.message.includes(`Ønsket gren: ${disc}`));
      }
    });

    it("Empirical Test 3.4: Honeypot field 'website' is present in payload structure", () => {
      const payload = generatePayload({ website: "bot-payload-test" });
      assert.strictEqual(payload.website, "bot-payload-test");
    });

    it("Empirical Test 3.5: VULNERABILITY IMPACT ON FIRESTORE PAYLOAD — End date in payload is stored as 13 days in Norway timezone", () => {
      const payloadOslo = execSync(
        `TZ="Europe/Oslo" node -e '
        function calc(s) {
          if (!s) return "";
          const start = new Date(s + "T00:00:00");
          if (isNaN(start.getTime())) return "";
          const end = new Date(start);
          end.setDate(start.getDate() + 14);
          return end.toISOString().split("T")[0];
        }
        const startDate = "2026-09-28";
        const endDate = calc(startDate);
        console.log(JSON.stringify({ startDate, endDate }));
        '`
      ).toString().trim();

      const parsed = JSON.parse(payloadOslo);
      assert.strictEqual(parsed.startDate, "2026-09-28");
      // Demonstrates that Firestore receives 2026-10-11 instead of 2026-10-12
      assert.strictEqual(parsed.endDate, "2026-10-11");
    });
  });
});
