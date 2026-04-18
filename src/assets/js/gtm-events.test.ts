/**
 * Tests for gtm-events.ts
 * Feature: google-tag-custom-events
 *
 * Covers:
 *  - Unit tests for pushEvent, isOutboundUrl, getLinkText
 *  - Property-based tests (Properties 1–3, 7–8) using fast-check
 */

import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { pushEvent, isOutboundUrl, getLinkText } from "./gtm-events";

// ─── Helpers ────────────────────────────────────────────────────────────────

function resetDataLayer() {
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  delete (window as any).dataLayer;
}

function createAnchor(text: string | null, ariaLabel: string | null): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = "#";
  if (text !== null) a.textContent = text;
  if (ariaLabel !== null) a.setAttribute("aria-label", ariaLabel);
  return a;
}

// ─── Unit Tests ─────────────────────────────────────────────────────────────

describe("pushEvent — unit tests", () => {
  beforeEach(resetDataLayer);

  it("initializes window.dataLayer when absent", () => {
    pushEvent("test_event");
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it("pushes an object with the correct event name", () => {
    pushEvent("my_event");
    expect(window.dataLayer[0]).toMatchObject({ event: "my_event" });
  });

  it("merges params into the pushed object", () => {
    pushEvent("my_event", { foo: "bar", count: 42 });
    expect(window.dataLayer[0]).toMatchObject({ event: "my_event", foo: "bar", count: 42 });
  });

  it("appends to an existing dataLayer without overwriting", () => {
    window.dataLayer = [{ event: "existing" }] as typeof window.dataLayer;
    pushEvent("new_event");
    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer[0]).toMatchObject({ event: "existing" });
    expect(window.dataLayer[1]).toMatchObject({ event: "new_event" });
  });

  it("works with no params (only event name)", () => {
    pushEvent("bare_event");
    expect(window.dataLayer[0]).toEqual({ event: "bare_event" });
  });
});

describe("isOutboundUrl — unit tests", () => {
  it("returns false for relative URLs", () => {
    expect(isOutboundUrl("/about")).toBe(false);
  });

  it("returns false for same-hostname http URLs", () => {
    // jsdom sets window.location.hostname to 'localhost'
    expect(isOutboundUrl("http://localhost/page")).toBe(false);
  });

  it("returns true for external http URLs", () => {
    expect(isOutboundUrl("https://example.com/page")).toBe(true);
  });

  it("returns false for mailto: links", () => {
    expect(isOutboundUrl("mailto:test@example.com")).toBe(false);
  });

  it("returns false for javascript: links", () => {
    expect(isOutboundUrl("javascript:void(0)")).toBe(false);
  });
});

describe("getLinkText — unit tests", () => {
  it("returns trimmed textContent when present", () => {
    const a = createAnchor("  Hello World  ", null);
    expect(getLinkText(a)).toBe("Hello World");
  });

  it("falls back to aria-label when textContent is empty", () => {
    const a = createAnchor("", "Open menu");
    expect(getLinkText(a)).toBe("Open menu");
  });

  it("falls back to aria-label when textContent is whitespace only", () => {
    const a = createAnchor("   ", "Icon button");
    expect(getLinkText(a)).toBe("Icon button");
  });

  it("returns '(no text)' when both textContent and aria-label are absent", () => {
    const a = createAnchor("", null);
    expect(getLinkText(a)).toBe("(no text)");
  });

  it("never returns null, undefined, or empty string", () => {
    const a = createAnchor(null, null);
    const result = getLinkText(a);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});

// ─── Property-Based Tests ────────────────────────────────────────────────────

// Feature: google-tag-custom-events, Property 1: DataLayer is always an array after pushEvent
describe("Property 1: DataLayer is always an array after pushEvent", () => {
  it("holds for arbitrary event names and params", () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.option(fc.dictionary(fc.string(), fc.anything())),
        (name, params) => {
          resetDataLayer();
          pushEvent(name, params ?? undefined);
          return Array.isArray(window.dataLayer);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: google-tag-custom-events, Property 2: pushEvent preserves existing DataLayer entries
describe("Property 2: pushEvent preserves existing DataLayer entries", () => {
  it("holds for arbitrary pre-existing arrays and event names", () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ event: fc.string() })),
        fc.string(),
        (existing, name) => {
          window.dataLayer = [...existing] as typeof window.dataLayer;
          const snapshot = [...window.dataLayer];
          pushEvent(name);
          // Length increased by exactly 1
          if (window.dataLayer.length !== existing.length + 1) return false;
          // All original entries are still present and unchanged
          return snapshot.every((item, i) => window.dataLayer[i] === item);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: google-tag-custom-events, Property 3: pushEvent produces correctly shaped events
describe("Property 3: pushEvent produces correctly shaped events", () => {
  it("holds for arbitrary event names and param dictionaries", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.dictionary(fc.string({ minLength: 1 }), fc.anything()),
        (name, params) => {
          resetDataLayer();
          pushEvent(name, params);
          const pushed = window.dataLayer[0];
          if (!pushed || pushed.event !== name) return false;
          return Object.entries(params).every(([k, v]) => pushed[k] === v);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: google-tag-custom-events, Property 7: Outbound link classification is correct
describe("Property 7: Outbound link classification is correct", () => {
  it("holds for arbitrary http/https URLs", () => {
    fc.assert(
      fc.property(
        fc.webUrl({ withQueryParameters: false, withFragments: false }),
        (url) => {
          let expected: boolean;
          try {
            expected =
              url.startsWith("http") &&
              new URL(url).hostname !== window.location.hostname;
          } catch {
            expected = false;
          }
          return isOutboundUrl(url) === expected;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: google-tag-custom-events, Property 8: Link text fallback chain is exhaustive
describe("Property 8: Link text fallback chain is exhaustive", () => {
  it("never returns null, undefined, or empty string", () => {
    fc.assert(
      fc.property(
        fc.option(fc.string()),
        fc.option(fc.string()),
        (text, ariaLabel) => {
          const a = createAnchor(text ?? null, ariaLabel ?? null);
          const result = getLinkText(a);
          // Must never be falsy (null, undefined, empty string)
          if (!result && result !== "(no text)") return false;
          if (typeof result !== "string") return false;
          if (result.length === 0) return false;

          const trimmedText = (text ?? "").trim();
          if (trimmedText) return result === trimmedText;
          if (ariaLabel) return result === ariaLabel;
          return result === "(no text)";
        },
      ),
      { numRuns: 100 },
    );
  });
});
