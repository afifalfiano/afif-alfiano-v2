/**
 * Tests for dark mode toggle event tracking
 * Feature: google-tag-custom-events
 *
 * Covers:
 *  - Property 9: Dark mode toggle event reflects the activated theme
 *  - Unit tests for dark_mode_toggle event shape
 */

import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { pushEvent } from "./gtm-events";

// ─── Helpers ────────────────────────────────────────────────────────────────

function resetDataLayer() {
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  (window as any).dataLayer = [];
}

/**
 * Sets up the document's dark mode state by adding/removing the 'dark' class.
 */
function setupTheme(theme: "dark" | "light") {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

/**
 * Simulates the dark mode toggle click handler from header.astro.
 * Reads the current theme, determines the activated theme (opposite),
 * pushes the event, then applies the toggle.
 */
function simulateDarkModeToggle() {
  const willBeDark = !document.documentElement.classList.contains("dark");
  pushEvent("dark_mode_toggle", {
    theme: willBeDark ? "dark" : "light",
  });
  // Apply the toggle (mirrors what main.js does)
  if (willBeDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// ─── Unit Tests ─────────────────────────────────────────────────────────────

describe("dark_mode_toggle event — unit tests", () => {
  beforeEach(() => {
    resetDataLayer();
    document.documentElement.classList.remove("dark");
  });

  it("pushes dark_mode_toggle event when toggling from light to dark", () => {
    setupTheme("light");
    simulateDarkModeToggle();
    const event = window.dataLayer.find((e) => e.event === "dark_mode_toggle");
    expect(event).toBeDefined();
    expect(event?.theme).toBe("dark");
  });

  it("pushes dark_mode_toggle event when toggling from dark to light", () => {
    setupTheme("dark");
    simulateDarkModeToggle();
    const event = window.dataLayer.find((e) => e.event === "dark_mode_toggle");
    expect(event).toBeDefined();
    expect(event?.theme).toBe("light");
  });

  it("theme reflects the activated state, not the previous state", () => {
    // Start in light mode → activating dark
    setupTheme("light");
    simulateDarkModeToggle();
    expect(window.dataLayer[0]?.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("fires exactly one event per toggle click", () => {
    setupTheme("light");
    simulateDarkModeToggle();
    expect(window.dataLayer.filter((e) => e.event === "dark_mode_toggle")).toHaveLength(1);
  });
});

// ─── Property-Based Tests ────────────────────────────────────────────────────

// Feature: google-tag-custom-events, Property 9: Dark mode toggle event reflects the activated theme
describe("Property 9: Dark mode toggle event reflects the activated theme", () => {
  it("holds for both initial theme states", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("dark" as const, "light" as const),
        (initialTheme) => {
          resetDataLayer();
          setupTheme(initialTheme);
          simulateDarkModeToggle();

          const event = window.dataLayer.find((e) => e.event === "dark_mode_toggle");
          const expectedTheme = initialTheme === "dark" ? "light" : "dark";
          return event?.theme === expectedTheme;
        },
      ),
      { numRuns: 100 },
    );
  });
});
