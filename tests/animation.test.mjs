import {
  prefersReducedMotion,
  cleanAnimationStyles,
  createSpringEase,
  ATHLETIC_SPRING,
  BUTTON_SPRING,
  triggerButtonSpring,
  animate,
  remove,
  stagger,
} from "../src/lib/animations.ts";
import assert from "node:assert";

console.log("--- Starting Anime.js & Animation Suite Tests ---");

// Test 1: prefersReducedMotion in Node environment
assert.strictEqual(
  prefersReducedMotion(),
  false,
  "prefersReducedMotion should safely return false in SSR/Node without window"
);
console.log("✓ Test 1 Passed: prefersReducedMotion handles SSR safely");

// Test 2: prefersReducedMotion respects matchMedia
globalThis.window = {
  matchMedia: (query) => {
    return {
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  },
};

assert.strictEqual(
  prefersReducedMotion(),
  true,
  "prefersReducedMotion should return true when user has reduce motion set"
);
console.log("✓ Test 2 Passed: prefersReducedMotion detects reduce-motion setting");

// Test 3: cleanAnimationStyles
const mockElement = {
  style: {
    transform: "translateY(20px)",
    opacity: "0.5",
    willChange: "transform",
    color: "red",
    removeProperty(prop) {
      delete this[prop];
      if (prop === "will-change") {
        delete this.willChange;
      }
    },
  },
};
cleanAnimationStyles(mockElement);
assert.strictEqual(mockElement.style.transform, undefined, "transform removed");
assert.strictEqual(mockElement.style.opacity, undefined, "opacity removed");
assert.strictEqual(mockElement.style.willChange, undefined, "willChange removed");
assert.strictEqual(mockElement.style.color, "red", "other styles preserved");
console.log("✓ Test 3 Passed: cleanAnimationStyles removes inline properties while preserving unrelated styles");

// Test 4: createSpringEase preserves explicit animation duration
// (Anime v4 raw Spring object overrides animation duration with settlingDuration > 1000ms.
// createSpringEase wraps it so caller duration is strictly respected).
const customSpring = createSpringEase(0.2, 400);
const customAnim = animate({ x: 0 }, { x: 50, duration: 400, ease: customSpring });
assert.strictEqual(customAnim.duration, 400, "createSpringEase preserves duration on custom springs");

const athleticAnim = animate(
  { x: 0 },
  {
    x: 100,
    duration: 500,
    ease: ATHLETIC_SPRING,
  }
);
assert.strictEqual(
  athleticAnim.duration,
  500,
  `ATHLETIC_SPRING must preserve explicit duration 500ms, got ${athleticAnim.duration}ms`
);
assert.strictEqual(
  ATHLETIC_SPRING.solve(0),
  0,
  "ATHLETIC_SPRING solve at t=0 must start at 0"
);
assert.ok(
  Math.abs(ATHLETIC_SPRING.solve(1) - 1) < 0.05,
  "ATHLETIC_SPRING solve at t=1 settles near 1"
);
console.log("✓ Test 4 Passed: ATHLETIC_SPRING solver math and duration preservation (500ms)");

// Test 5: BUTTON_SPRING preserves explicit animation duration
const buttonAnim = animate(
  { x: 0 },
  {
    x: 100,
    duration: 320,
    ease: BUTTON_SPRING,
  }
);
assert.strictEqual(
  buttonAnim.duration,
  320,
  `BUTTON_SPRING must preserve explicit duration 320ms, got ${buttonAnim.duration}ms`
);
console.log("✓ Test 5 Passed: BUTTON_SPRING preserves explicit duration (320ms)");

// Test 6: Anime stagger works as expected
const testTargets = [{ val: 0 }, { val: 0 }, { val: 0 }, { val: 0 }];
const staggerFn = stagger(90);
const d0 = staggerFn(testTargets[0], 0, testTargets);
const d1 = staggerFn(testTargets[1], 1, testTargets);
const d2 = staggerFn(testTargets[2], 2, testTargets);
const d3 = staggerFn(testTargets[3], 3, testTargets);
assert.strictEqual(d0, 0, "stagger 0 is 0");
assert.strictEqual(d1, 90, "stagger 1 is 90");
assert.strictEqual(d2, 180, "stagger 2 is 180");
assert.strictEqual(d3, 270, "stagger 3 is 270");
console.log("✓ Test 6 Passed: Stagger increments delay correctly for 4 cards");

// Reset global window for DOM-like interaction tests
delete globalThis.window;

// Test 7: triggerButtonSpring preserves original transition under rapid repeated clicks
const buttonMock = {
  style: {
    transition: "all 0.3s ease",
    removeProperty(prop) {
      delete this[prop];
      if (prop === "will-change") delete this.willChange;
    },
  },
  hasAttribute: (attr) => attr === "disabled" && false,
  getAttribute: (attr) => (attr === "aria-disabled" ? "false" : null),
};

// First trigger
triggerButtonSpring(buttonMock);
assert.strictEqual(
  buttonMock.style.transition,
  "none",
  "Transition temporarily set to none during spring"
);

// Rapid second trigger while first is active
triggerButtonSpring(buttonMock);
assert.strictEqual(
  buttonMock.style.transition,
  "none",
  "Transition remains none during second spring"
);

// Advance timers to complete animation
await new Promise((resolve) => setTimeout(resolve, 450));

assert.strictEqual(
  buttonMock.style.transition,
  "all 0.3s ease",
  "Original CSS transition must be restored after rapid clicks complete"
);
assert.strictEqual(
  buttonMock.style.transform,
  undefined,
  "transform style must be cleaned up on completion"
);
assert.strictEqual(
  buttonMock.style.willChange,
  undefined,
  "will-change style must be cleaned up on completion"
);
console.log("✓ Test 7 Passed: triggerButtonSpring concurrency and transition restoration");

// Test 8: triggerButtonSpring respects disabled and aria-disabled buttons
const disabledButton = {
  style: {
    transition: "transform 0.2s",
    removeProperty(prop) {
      delete this[prop];
    },
  },
  hasAttribute: (attr) => attr === "disabled",
  getAttribute: () => null,
};
triggerButtonSpring(disabledButton);
assert.strictEqual(
  disabledButton.style.transition,
  "transform 0.2s",
  "Disabled button must not trigger spring or alter transition"
);

const ariaDisabledButton = {
  style: {
    transition: "transform 0.2s",
    removeProperty(prop) {
      delete this[prop];
    },
  },
  hasAttribute: () => false,
  getAttribute: (attr) => (attr === "aria-disabled" ? "true" : null),
};
triggerButtonSpring(ariaDisabledButton);
assert.strictEqual(
  ariaDisabledButton.style.transition,
  "transform 0.2s",
  "aria-disabled button must not trigger spring or alter transition"
);
console.log("✓ Test 8 Passed: triggerButtonSpring ignores disabled/aria-disabled elements");

// Test 9: remove cancels active animations cleanly
const cancelTarget = { x: 0 };
const runningAnim = animate(cancelTarget, { x: 100, duration: 1000 });
assert.strictEqual(runningAnim.paused, false, "Animation is initially active");
remove(cancelTarget);
assert.strictEqual(runningAnim.paused, true, "Animation is paused/cancelled after remove");
console.log("✓ Test 9 Passed: remove cancels active animations cleanly on unmount");

console.log("--- All 9 Animation Suite Tests Passed Cleanly! ---");
