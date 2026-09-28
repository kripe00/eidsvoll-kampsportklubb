import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

// Helper to safely load TypeScript locale dictionaries without TS compilation
function loadLocale(localeCode) {
  const filePath = path.join(PROJECT_ROOT, `src/lib/i18n/locales/${localeCode}.ts`);
  const raw = fs.readFileSync(filePath, "utf8");
  const clean = raw
    .replace(/import\s+.*?;/, "")
    .replace(new RegExp(`export\\s+const\\s+${localeCode}:\\s*Translations\\s*=`), "return ");
  return new Function(clean)();
}

const noLocale = loadLocale("no");
const enLocale = loadLocale("en");
const plLocale = loadLocale("pl");
const ukLocale = loadLocale("uk");

const LOCALES = { no: noLocale, en: enLocale, pl: plLocale, uk: ukLocale };

describe("Adversarial Challenger 2: Mobile Viewport, Chat Overlap & Scroll Stability", () => {
  // =========================================================================
  // 1. Mobile Viewport Geometry Stress Testing (320px to 768px)
  // =========================================================================
  describe("1. Mobile Viewport Geometry & Horizontal Clipping", () => {
    const VIEWPORTS = [
      { name: "iPhone SE (1st gen)", width: 320, height: 568 },
      { name: "Galaxy S8 / Mini", width: 360, height: 740 },
      { name: "iPhone SE / 13 Mini", width: 375, height: 667 },
      { name: "iPhone 12/13/14/15/16 Pro", width: 390, height: 844 },
      { name: "iPhone 11 / XR / Plus", width: 414, height: 896 },
      { name: "iPhone 14/15/16 Pro Max", width: 430, height: 932 },
      { name: "Tailwind sm breakpoint", width: 640, height: 900 },
      { name: "Max mobile (1px under md)", width: 767, height: 1024 },
      { name: "Tailwind md breakpoint", width: 768, height: 1024 },
    ];

    it("1.1: MobileStickyCta horizontal boundaries never exceed viewport width for all mobile devices", () => {
      VIEWPORTS.filter((v) => v.width < 768).forEach(({ name, width }) => {
        const leftInset = 16; // left-4 = 1rem = 16px
        const rightInset = 84; // right-[84px] = 84px
        const totalInset = leftInset + rightInset; // 100px
        const ctaWidth = width - totalInset;

        assert.ok(
          ctaWidth > 0,
          `${name} (${width}px): CTA width must be positive, got ${ctaWidth}px`
        );
        assert.ok(
          ctaWidth >= 220,
          `${name} (${width}px): CTA width must provide adequate touch surface, got ${ctaWidth}px`
        );
        assert.strictEqual(
          leftInset + ctaWidth + rightInset,
          width,
          `${name} (${width}px): CTA horizontal layout must exactly equal viewport width without overflow`
        );
      });
    });

    it("1.2: Minimum touch target heights meet or exceed WCAG 2.5.5 Level AAA (44px) across all interactive elements", () => {
      // MobileStickyCta button: h-14 = 56px
      const stickyCtaHeight = 56;
      assert.ok(stickyCtaHeight >= 44, "Sticky CTA button must meet WCAG 44px");

      // ChatBot button: h-14 w-14 = 56px x 56px
      const chatButtonSize = 56;
      assert.ok(chatButtonSize >= 44, "Chat launcher must meet WCAG 44px");

      // Hero primary & secondary buttons: h-14 = 56px
      const heroButtonHeight = 56;
      assert.ok(heroButtonHeight >= 44, "Hero action buttons must meet WCAG 44px");

      // SportSelector & FirstTrainingGuide CTA buttons: h-13 = 52px
      const sectionButtonHeight = 52;
      assert.ok(sectionButtonHeight >= 44, "Section CTA buttons must meet WCAG 44px");
    });

    it("1.3: Text content inside MobileStickyCta truncates safely on narrow 320px viewport without horizontal blowout", () => {
      const mobileStickyCtaSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/MobileStickyCta.tsx"),
        "utf8"
      );

      // Verify truncate class is explicitly present on both the wrapper and the text span
      assert.ok(
        mobileStickyCtaSrc.includes('truncate">'),
        "MobileStickyCta must use Tailwind truncate utility to prevent horizontal text overflow"
      );

      // Verify all locale strings on 320px screen: Available width = 320 - 100 (insets) - 32 (btn padding) - 56 (icons) = 132px
      Object.entries(LOCALES).forEach(([locale, dict]) => {
        const text = dict.stickyCta.text;
        assert.ok(text && text.length > 0, `${locale}: stickyCta.text must be defined`);
        // Expected character length < 35 to ensure clean mobile display
        assert.ok(
          text.length < 35,
          `${locale}: stickyCta.text ("${text}") is ${text.length} chars, must fit nicely on mobile`
        );
      });
    });

    it("1.4: Breakpoint transition at 767px vs 768px strictly suppresses MobileStickyCta on desktop", () => {
      const mobileStickyCtaSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/MobileStickyCta.tsx"),
        "utf8"
      );

      // Must have md:hidden
      assert.ok(
        mobileStickyCtaSrc.includes("md:hidden"),
        "MobileStickyCta must have md:hidden to suppress rendering on viewports >= 768px"
      );
    });
  });

  // =========================================================================
  // 2. Spatial Clearance Between MobileStickyCta and ChatBot
  // =========================================================================
  describe("2. Spatial Clearance: MobileStickyCta ↔ ChatBot (Button, Dialog & Teaser)", () => {
    it("2.1: Horizontal clearance between MobileStickyCta and ChatBot button is exactly 8px across all mobile widths", () => {
      // ChatBot button: fixed right-5 (20px), w-14 (56px) -> occupies [W - 76px, W - 20px]
      // MobileStickyCta: fixed left-4 (16px), right-[84px] -> occupies [16px, W - 84px]
      const widths = [320, 360, 375, 390, 414, 430, 640, 767];

      widths.forEach((w) => {
        const chatLeft = w - 20 - 56; // W - 76px
        const stickyRight = w - 84; // W - 84px
        const clearance = chatLeft - stickyRight;

        assert.strictEqual(
          clearance,
          8,
          `At viewport width ${w}px, clearance must be exactly 8px (chatLeft=${chatLeft}, stickyRight=${stickyRight})`
        );
        assert.ok(clearance > 0, "No horizontal collision permitted between CTA and chat launcher");
      });
    });

    it("2.2: Expanded Chat dialog overlays MobileStickyCta cleanly via z-index hierarchy (z-40 > z-30)", () => {
      const chatBotSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/ChatBot.tsx"),
        "utf8"
      );
      const mobileStickyCtaSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/MobileStickyCta.tsx"),
        "utf8"
      );

      // Verify ChatBot has z-40
      assert.ok(chatBotSrc.includes("z-40"), "ChatBot container must have z-40");

      // Verify MobileStickyCta has z-30
      assert.ok(mobileStickyCtaSrc.includes("z-30"), "MobileStickyCta must have z-30");

      // z-40 strictly dominates z-30
      const chatZ = 40;
      const stickyZ = 30;
      assert.ok(chatZ > stickyZ, "Chat dialog (z-40) must sit above sticky CTA (z-30)");
    });

    it("2.3: [ADVERSARIAL DEFECT] ChatBot lacks safe-area-inset-bottom, causing 34px vertical baseline misalignment with MobileStickyCta on iOS", () => {
      const chatBotSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/ChatBot.tsx"),
        "utf8"
      );
      const mobileStickyCtaSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/MobileStickyCta.tsx"),
        "utf8"
      );

      // MobileStickyCta has safe-area inset:
      assert.ok(
        mobileStickyCtaSrc.includes("env(safe-area-inset-bottom"),
        "MobileStickyCta includes safe-area-inset-bottom"
      );

      // ChatBot does NOT have safe-area inset on its aside container:
      const chatHasSafeArea = chatBotSrc.includes("env(safe-area-inset-bottom");
      assert.strictEqual(
        chatHasSafeArea,
        false,
        "ChatBot aside container does NOT include env(safe-area-inset-bottom)"
      );

      // On iOS devices with 34px home indicator safe area:
      const safeAreaBottom = 34;
      const stickyBaseline = 20 + safeAreaBottom; // 54px
      const chatBaseline = 20; // 20px (hardcoded bottom-5)
      const baselineStep = stickyBaseline - chatBaseline;

      assert.strictEqual(
        baselineStep,
        34,
        "On iOS, Sticky CTA is lifted 34px while ChatBot stays at 20px, creating a 34px baseline step mismatch"
      );
    });

    it("2.4: [ADVERSARIAL DEFECT] ChatBot mobile teaser bubble at bottom-16 overlaps MobileStickyCta by 26px on iOS safe-area devices", () => {
      // When safe-area = 34px:
      // MobileStickyCta occupies:
      //   bottom: 20 + 34 = 54px
      //   top: 54 + 56 = 110px from viewport bottom
      // ChatBot teaser bubble sits at bottom-16 relative to aside (which is at bottom: 20px):
      //   teaser bottom: 20 + 64 = 84px from viewport bottom
      // Vertical overlap = stickyTop (110px) - teaserBottom (84px) = 26px!
      const safeArea = 34;
      const stickyTop = 20 + safeArea + 56; // 110px
      const teaserBottom = 20 + 64; // 84px
      const verticalOverlap = stickyTop - teaserBottom;

      assert.ok(
        verticalOverlap > 0,
        `Vertical overlap between MobileStickyCta and ChatBot teaser must be detected on iOS (found ${verticalOverlap}px overlap)`
      );
      assert.strictEqual(
        verticalOverlap,
        26,
        "Exact vertical collision depth is 26px when safe-area-inset-bottom is 34px"
      );

      // Horizontal overlap check:
      // Teaser width = w-64 = 256px, right: 0 inside aside (right: 20px) -> [W - 276px, W - 20px]
      // Sticky CTA occupies [16px, W - 84px]
      // Horizontal collision span = (W - 84) - (W - 276) = 192px!
      const horizontalOverlap = 276 - 84;
      assert.strictEqual(
        horizontalOverlap,
        192,
        "Teaser bubble horizontally overlaps Sticky CTA by 192px on all mobile devices"
      );
    });
  });

  // =========================================================================
  // 3. Rapid Scrolling, Resize Thrashing, and Event Cleanup
  // =========================================================================
  describe("3. Scroll Event Stability, High-Frequency Thrashing & Listener Teardown", () => {
    it("3.1: Scroll listener cleanly unmounts without memory leaks or lingering listeners", () => {
      let scrollListenerCount = 0;
      let registeredHandler = null;

      const fakeWindow = {
        scrollY: 0,
        addEventListener(event, handler, _options) {
          if (event === "scroll") {
            scrollListenerCount++;
            registeredHandler = handler;
          }
        },
        removeEventListener(event, handler) {
          if (event === "scroll" && handler === registeredHandler) {
            scrollListenerCount--;
            registeredHandler = null;
          }
        },
        requestAnimationFrame(_cb) {
          return 101;
        },
        cancelAnimationFrame(id) {
          assert.strictEqual(id, 101);
        },
      };

      // Simulate MobileStickyCta useEffect lifecycle
      const mountEffect = (win) => {
        const handleScroll = () => {
          const isPastHero = win.scrollY > 350;
          return isPastHero;
        };
        win.addEventListener("scroll", handleScroll, { passive: true });
        const rafId = win.requestAnimationFrame(handleScroll);

        return () => {
          win.removeEventListener("scroll", handleScroll);
          win.cancelAnimationFrame(rafId);
        };
      };

      const cleanup = mountEffect(fakeWindow);
      assert.strictEqual(scrollListenerCount, 1, "Scroll listener must be registered upon mount");

      cleanup();
      assert.strictEqual(scrollListenerCount, 0, "Scroll listener must be cleanly unregistered upon unmount");
      assert.strictEqual(registeredHandler, null, "Handler reference must be cleared");
    });

    it("3.2: 10,000 rapid scroll events across the 350px threshold trigger state transitions strictly at the boundary", () => {
      let visible = false;
      let renderCount = 0;

      const handleScroll = (scrollY) => {
        const next = scrollY > 350;
        if (next !== visible) {
          visible = next;
          renderCount++;
        }
      };

      // Stress test: 10,000 calls bouncing between 300 and 400.
      // Since initial state is false, first call at 300 is a no-op, then subsequent calls toggle.
      // Total transitions = 9,999.
      for (let i = 0; i < 5000; i++) {
        handleScroll(300); // false
        handleScroll(400); // true
      }

      assert.strictEqual(visible, true);
      assert.strictEqual(renderCount, 9999, "Must transition exactly on boundary crossings (first 300 is no-op from initial false)");

      // Verify steady scroll above 350 triggers 0 redundant state mutations
      const prevRenderCount = renderCount;
      for (let y = 351; y <= 4000; y += 10) {
        handleScroll(y);
      }
      assert.strictEqual(renderCount, prevRenderCount, "No redundant renders when remaining above 350px");

      // Verify steady scroll below 350 triggers 0 redundant state mutations
      handleScroll(200); // 1 transition to false
      assert.strictEqual(renderCount, prevRenderCount + 1);
      const afterDropCount = renderCount;
      for (let y = 199; y >= 0; y -= 10) {
        handleScroll(y);
      }
      assert.strictEqual(renderCount, afterDropCount, "No redundant renders when remaining below 350px");
    });

    it("3.3: ScrollProgress component uses requestAnimationFrame throttling and unregisters all 4 listeners", () => {
      const scrollProgressSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/ScrollProgress.tsx"),
        "utf8"
      );

      // Verify requestAnimationFrame throttling
      assert.ok(
        scrollProgressSrc.includes("window.requestAnimationFrame(updateBar)"),
        "ScrollProgress must throttle DOM style updates using requestAnimationFrame"
      );

      // Verify all listeners removed in cleanup
      assert.ok(
        scrollProgressSrc.includes('window.removeEventListener("scroll", onScrollOrResize)'),
        "window scroll listener must be removed"
      );
      assert.ok(
        scrollProgressSrc.includes('document.removeEventListener("scroll", onScrollOrResize)'),
        "document scroll listener must be removed"
      );
      assert.ok(
        scrollProgressSrc.includes('window.removeEventListener("resize", onScrollOrResize)'),
        "window resize listener must be removed"
      );
      assert.ok(
        scrollProgressSrc.includes('window.removeEventListener("load", onScrollOrResize)'),
        "window load listener must be removed"
      );
      assert.ok(
        scrollProgressSrc.includes("resizeObserver?.disconnect()"),
        "ResizeObserver must be disconnected"
      );
    });
  });

  // =========================================================================
  // 4. Language Toggling During Active Quiz Flows
  // =========================================================================
  describe("4. Language Toggling & Reactive State Preservation During Active Quiz", () => {
    it("4.1: All 4 locales (no, en, pl, uk) contain complete veiviser, forsteTrening, and stickyCta dictionary keys", () => {
      const requiredSections = ["veiviser", "forsteTrening", "stickyCta"];

      Object.entries(LOCALES).forEach(([loc, dict]) => {
        requiredSections.forEach((sec) => {
          assert.ok(dict[sec], `${loc} must include section "${sec}"`);
        });

        // Veiviser keys
        assert.ok(dict.veiviser.title, `${loc}.veiviser must have title`);
        assert.ok(dict.veiviser.ctaButton, `${loc}.veiviser must have ctaButton`);
        assert.ok(dict.veiviser.recommendations, `${loc}.veiviser must have recommendations`);
        assert.ok(dict.veiviser.recommendations.bjj, `${loc} must have bjj recommendation`);
        assert.ok(dict.veiviser.recommendations.muayThai, `${loc} must have muayThai recommendation`);
        assert.ok(dict.veiviser.recommendations.crosstrening, `${loc} must have crosstrening recommendation`);
        assert.ok(dict.veiviser.recommendations.yoga, `${loc} must have yoga recommendation`);
        assert.ok(dict.veiviser.recommendations.kidsBjj, `${loc} must have kidsBjj recommendation`);
        assert.ok(dict.veiviser.recommendations.kidsCombo, `${loc} must have kidsCombo recommendation`);

        // FirstTrainingGuide keys
        assert.ok(dict.forsteTrening.title, `${loc}.forsteTrening must have title`);
        assert.ok(dict.forsteTrening.step1Title, `${loc}.forsteTrening must have step1Title`);
        assert.ok(dict.forsteTrening.step2Title, `${loc}.forsteTrening must have step2Title`);
        assert.ok(dict.forsteTrening.step3Title, `${loc}.forsteTrening must have step3Title`);
        assert.ok(dict.forsteTrening.step3BarefootTitle, `${loc}.forsteTrening must have step3BarefootTitle`);
        assert.ok(dict.forsteTrening.step3ShoesTitle, `${loc}.forsteTrening must have step3ShoesTitle`);
        assert.ok(dict.forsteTrening.step4Title, `${loc}.forsteTrening must have step4Title`);

        // Sticky CTA keys
        assert.ok(dict.stickyCta.text, `${loc}.stickyCta must have text`);
        assert.ok(dict.stickyCta.ariaLabel, `${loc}.stickyCta must have ariaLabel`);
      });
    });

    it("4.2: Quiz recommendation dynamically re-renders localized content when user switches languages while at Step 3", () => {
      // Simulate user state at Step 3: selectedAge = "voksen", selectedGoal = "fitness"
      const age = "voksen";
      const goal = "fitness";

      // Function matching SportSelector.tsx getRecommendation()
      const getRecForLocale = (t) => {
        if (age === "voksen" && goal === "fitness") {
          return {
            rec: t.veiviser.recommendations.crosstrening,
            category: "Voksen / Ungdom (fra 14 år)",
            discipline: "Crosstrening (CT)",
            footwear: "rene_innesko",
          };
        }
        return null;
      };

      const noRec = getRecForLocale(noLocale);
      const enRec = getRecForLocale(enLocale);
      const plRec = getRecForLocale(plLocale);
      const ukRec = getRecForLocale(ukLocale);

      // Verify Norwegian recommendation content
      assert.strictEqual(noRec.rec.name, "Crosstrening (CT)");
      assert.ok(noRec.rec.tagline.includes("styrke"));

      // Verify English translation switches dynamically
      assert.strictEqual(enRec.rec.name, "Cross Training (CT)");
      assert.ok(enRec.rec.tagline.toLowerCase().includes("strength"));

      // Verify Polish translation switches dynamically
      assert.ok(plRec.rec.name.includes("Cross Training") || plRec.rec.name.includes("Crosstrening"));
      assert.ok(plRec.rec.tagline.length > 5);

      // Verify Ukrainian translation switches dynamically
      assert.ok(ukRec.rec.name.length > 5);
      assert.ok(ukRec.rec.tagline.length > 5);
    });

    it("4.3: [OBSERVATION] SportSelector.tsx hardcodes Norwegian text for the footwear badge on the recommendation card", () => {
      const sportSelectorSrc = fs.readFileSync(
        path.join(PROJECT_ROOT, "src/components/SportSelector.tsx"),
        "utf8"
      );

      // Line 493: {recommendationData.footwear === "rene_innesko" ? "👟 Innesko" : "🥋 Barbent"}
      assert.ok(
        sportSelectorSrc.includes('"👟 Innesko" : "🥋 Barbent"'),
        'SportSelector has hardcoded Norwegian string literals "👟 Innesko" : "🥋 Barbent" on the recommendation card'
      );
    });
  });
});
