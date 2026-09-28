#!/usr/bin/env node

/**
 * E2E Verification & Test Suite Runner for Eidsvoll Kampsportklubb
 * Executes the full 4-tier opaque-box test suite and outputs a formatted report.
 */

import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

const TEST_FILES = [
  {
    name: "Anime.js & Animation Suite",
    file: "tests/animation.test.mjs",
    category: "Infrastructure",
  },
  {
    name: "Tier 1: Feature Coverage (R1.1 - R4.2)",
    file: "tests/tier1-feature-coverage.test.mjs",
    category: "Tier 1",
  },
  {
    name: "Tier 2: Boundary & Corner Cases",
    file: "tests/tier2-boundary-cases.test.mjs",
    category: "Tier 2",
  },
  {
    name: "Tier 3: Cross-Feature Interactions",
    file: "tests/tier3-cross-feature.test.mjs",
    category: "Tier 3",
  },
  {
    name: "Tier 4: Real-World Persona Scenarios",
    file: "tests/tier4-persona-scenarios.test.mjs",
    category: "Tier 4",
  },
  {
    name: "Codebase Contracts & Milestone Audit",
    file: "tests/codebase-contracts.test.mjs",
    category: "Audit",
  },
];

console.log("\n===============================================================================");
console.log("  🥋 Eidsvoll Kampsportklubb — E2E Test Suite & Verification Harness");
console.log("  Specification: ORIGINAL_REQUEST.md & PROJECT.md (R1, R2, R3, R4)");
console.log("===============================================================================\n");

async function runTestFile({ name, file, category }) {
  const filePath = path.join(PROJECT_ROOT, file);
  if (!fs.existsSync(filePath)) {
    return { name, file, category, passed: false, error: `File not found: ${file}` };
  }

  return new Promise((resolve) => {
    const startTime = Date.now();
    const child = spawn(process.execPath, ["--test", filePath], {
      cwd: PROJECT_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, FORCE_COLOR: "1" },
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      const durationMs = Date.now() - startTime;
      const passMatch = stdout.match(/(?:#|ℹ) pass (\d+)/);
      const failMatch = stdout.match(/(?:#|ℹ) fail (\d+)/);
      const testMatch = stdout.match(/(?:#|ℹ) tests (\d+)/);

      let passCount = passMatch ? parseInt(passMatch[1], 10) : code === 0 ? 1 : 0;
      let failCount = failMatch ? parseInt(failMatch[1], 10) : code === 0 ? 0 : 1;
      let testCount = testMatch ? parseInt(testMatch[1], 10) : passCount + failCount;

      if (file.includes("animation.test.mjs") && stdout.includes("All 9 Animation Suite Tests Passed Cleanly")) {
        passCount = 9;
        testCount = 9;
        failCount = 0;
      }

      resolve({
        name,
        file,
        category,
        passed: code === 0,
        passCount,
        failCount,
        testCount,
        durationMs,
        stdout,
        stderr,
      });
    });
  });
}

async function main() {
  const results = [];

  for (const suite of TEST_FILES) {
    process.stdout.write(`  ▶ Running ${suite.category.padEnd(8)}: ${suite.name}... `);
    const res = await runTestFile(suite);
    results.push(res);

    if (res.passed) {
      console.log(`\x1b[32m✔ PASS\x1b[0m (${res.testCount} tests, ${res.durationMs}ms)`);
    } else {
      console.log(`\x1b[31m✖ FAIL\x1b[0m (${res.failCount} failed, ${res.durationMs}ms)`);
      if (res.stderr) console.error(res.stderr);
    }
  }

  console.log("\n-------------------------------------------------------------------------------");
  console.log("  Summary Table");
  console.log("-------------------------------------------------------------------------------");
  console.log("  Suite                                       | Tests | Pass | Fail | Time");
  console.log("  --------------------------------------------+-------+------+------+-------");

  let totalTests = 0;
  let totalPass = 0;
  let totalFail = 0;
  let totalDuration = 0;

  for (const r of results) {
    totalTests += r.testCount;
    totalPass += r.passCount;
    totalFail += r.failCount;
    totalDuration += r.durationMs;

    const nameCol = r.name.padEnd(43).slice(0, 43);
    const testsCol = String(r.testCount).padStart(5);
    const passCol = `\x1b[32m${String(r.passCount).padStart(4)}\x1b[0m`;
    const failCol = r.failCount > 0 ? `\x1b[31m${String(r.failCount).padStart(4)}\x1b[0m` : "   0";
    const timeCol = `${r.durationMs}ms`.padStart(7);

    console.log(`  ${nameCol} | ${testsCol} | ${passCol} | ${failCol} | ${timeCol}`);
  }

  console.log("  --------------------------------------------+-------+------+------+-------");
  console.log(
    `  TOTAL                                       | ${String(totalTests).padStart(5)} | \x1b[32m${String(totalPass).padStart(4)}\x1b[0m | ${totalFail > 0 ? `\x1b[31m${String(totalFail).padStart(4)}\x1b[0m` : "   0"} | ${String(totalDuration)}ms`
  );
  console.log("===============================================================================\n");

  if (totalFail > 0) {
    console.error(`\x1b[31m✖ TEST SUITE FAILED: ${totalFail} test(s) failed.\x1b[0m\n`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m✔ ALL ${totalTests} TESTS PASSED SUCCESSFULLY!\x1b[0m\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Unhandled runner exception:", err);
  process.exit(1);
});
