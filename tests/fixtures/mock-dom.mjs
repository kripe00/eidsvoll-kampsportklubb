/**
 * Headless DOM Environment & Interaction Mock for E2E Component Testing
 * Allows verifying DOM attributes, events, scroll states, and accessibility contracts
 * without requiring Chromium/Puppeteer in node environments.
 */

export function createMockElement(tag, initialProps = {}) {
  const listeners = new Map();
  const attributes = new Map();
  const classSet = new Set((initialProps.className || "").split(" ").filter(Boolean));

  const el = {
    tagName: tag.toUpperCase(),
    id: initialProps.id || "",
    className: initialProps.className || "",
    innerHTML: initialProps.innerHTML || "",
    textContent: initialProps.textContent || "",
    style: {
      overflow: "unset",
      transition: "",
      transform: "",
      opacity: "",
      ...initialProps.style,
      removeProperty(prop) {
        delete this[prop];
      },
    },
    dataset: { ...initialProps.dataset },
    children: [...(initialProps.children || [])],
    parentElement: null,

    classList: {
      add(...classes) {
        classes.forEach((c) => classSet.add(c));
        el.className = Array.from(classSet).join(" ");
      },
      remove(...classes) {
        classes.forEach((c) => classSet.delete(c));
        el.className = Array.from(classSet).join(" ");
      },
      contains(cls) {
        return classSet.has(cls);
      },
      toggle(cls, force) {
        if (force !== undefined) {
          if (force) classSet.add(cls);
          else classSet.delete(cls);
        } else {
          if (classSet.has(cls)) classSet.delete(cls);
          else classSet.add(cls);
        }
        el.className = Array.from(classSet).join(" ");
      },
    },

    setAttribute(key, val) {
      attributes.set(key, String(val));
      if (key === "id") el.id = String(val);
      if (key === "class") {
        el.className = String(val);
        classSet.clear();
        String(val).split(" ").filter(Boolean).forEach((c) => classSet.add(c));
      }
    },
    getAttribute(key) {
      if (key === "id") return el.id || null;
      if (key === "class") return el.className || null;
      return attributes.get(key) ?? null;
    },
    hasAttribute(key) {
      if (key === "id") return Boolean(el.id);
      if (key === "class") return Boolean(el.className);
      return attributes.has(key);
    },
    removeAttribute(key) {
      attributes.delete(key);
    },

    addEventListener(event, handler) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(handler);
    },
    removeEventListener(event, handler) {
      if (!listeners.has(event)) return;
      const list = listeners.get(event).filter((h) => h !== handler);
      listeners.set(event, list);
    },
    dispatchEvent(event) {
      const type = typeof event === "string" ? event : event.type;
      const handlers = listeners.get(type) || [];
      const evtObj = typeof event === "string" ? { type, target: el } : { ...event, target: el };
      handlers.forEach((h) => h(evtObj));
      return true;
    },

    // Smooth scroll spy
    scrollIntoViewCalled: false,
    lastScrollIntoViewArg: null,
    scrollIntoView(options) {
      el.scrollIntoViewCalled = true;
      el.lastScrollIntoViewArg = options;
    },

    // Bounding client rect mock
    getBoundingClientRect() {
      return {
        top: 0,
        bottom: 100,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        ...(initialProps.boundingClientRect || {}),
      };
    },
  };

  return el;
}

export function createMockDocument() {
  const elementsById = new Map();
  const body = createMockElement("body");

  return {
    body,
    documentElement: {
      lang: "no",
      style: {},
    },
    createElement(tag) {
      return createMockElement(tag);
    },
    getElementById(id) {
      return elementsById.get(id) || null;
    },
    registerElement(id, element) {
      element.id = id;
      elementsById.set(id, element);
    },
    querySelector(selector) {
      if (selector.startsWith("#")) {
        return elementsById.get(selector.slice(1)) || null;
      }
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };
}

export function createMockWindow({
  width = 390,
  height = 844,
  prefersReducedMotion = false,
  initialScrollY = 0,
} = {}) {
  const scrollListeners = [];

  const win = {
    innerWidth: width,
    innerHeight: height,
    scrollY: initialScrollY,
    scrollX: 0,
    addEventListener(event, handler) {
      if (event === "scroll") scrollListeners.push(handler);
    },
    removeEventListener(event, handler) {
      if (event === "scroll") {
        const idx = scrollListeners.indexOf(handler);
        if (idx !== -1) scrollListeners.splice(idx, 1);
      }
    },
    setScrollY(newY) {
      win.scrollY = newY;
      scrollListeners.forEach((fn) => fn({ type: "scroll" }));
    },
    matchMedia(query) {
      return {
        matches: query === "(prefers-reduced-motion: reduce)" ? prefersReducedMotion : false,
        media: query,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      };
    },
    localStorage: {
      _store: new Map(),
      getItem(key) {
        return this._store.get(key) || null;
      },
      setItem(key, val) {
        this._store.set(key, String(val));
      },
      removeItem(key) {
        this._store.delete(key);
      },
      clear() {
        this._store.clear();
      },
    },
  };

  return win;
}
