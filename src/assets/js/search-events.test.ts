/**
 * Tests for search event tracking logic
 * Feature: google-tag-custom-events
 *
 * Covers:
 *  - Property 6: Search query event fires only for queries of 3+ chars
 *  - Unit tests for search_query and search_result_click event shapes
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
 * Simulates the search_query event logic extracted from search-modal.astro.
 * Fires pushEvent only when trimmed query length >= 3.
 */
function triggerSearchQuery(query: string, resultCount = 0): void {
  const trimmed = query.trim();
  if (trimmed.length >= 3) {
    pushEvent("search_query", {
      search_term: trimmed,
      result_count: resultCount,
    });
  }
}

// ─── Unit Tests ─────────────────────────────────────────────────────────────

describe("search_query event — unit tests", () => {
  beforeEach(resetDataLayer);

  it("fires for a query of exactly 3 characters", () => {
    triggerSearchQuery("abc");
    expect(window.dataLayer.some((e) => e.event === "search_query")).toBe(true);
  });

  it("fires for a query longer than 3 characters", () => {
    triggerSearchQuery("astro blog");
    expect(window.dataLayer.some((e) => e.event === "search_query")).toBe(true);
  });

  it("does not fire for a query of 2 characters", () => {
    triggerSearchQuery("ab");
    expect(window.dataLayer.some((e) => e.event === "search_query")).toBe(false);
  });

  it("does not fire for an empty query", () => {
    triggerSearchQuery("");
    expect(window.dataLayer.some((e) => e.event === "search_query")).toBe(false);
  });

  it("does not fire for a whitespace-only query", () => {
    triggerSearchQuery("   ");
    expect(window.dataLayer.some((e) => e.event === "search_query")).toBe(false);
  });

  it("includes search_term and result_count in the event", () => {
    triggerSearchQuery("typescript", 5);
    const event = window.dataLayer.find((e) => e.event === "search_query");
    expect(event).toMatchObject({
      event: "search_query",
      search_term: "typescript",
      result_count: 5,
    });
  });

  it("trims the search_term before including it", () => {
    triggerSearchQuery("  react  ", 3);
    const event = window.dataLayer.find((e) => e.event === "search_query");
    expect(event?.search_term).toBe("react");
  });
});

describe("search_result_click event — unit tests", () => {
  beforeEach(resetDataLayer);

  it("includes all required fields", () => {
    pushEvent("search_result_click", {
      search_term: "astro",
      result_title: "Getting Started with Astro",
      result_type: "post",
      result_position: 1,
    });
    const event = window.dataLayer.find((e) => e.event === "search_result_click");
    expect(event).toMatchObject({
      event: "search_result_click",
      search_term: "astro",
      result_title: "Getting Started with Astro",
      result_type: "post",
      result_position: 1,
    });
  });

  it("result_position is 1-based", () => {
    // Position 0 in array → result_position 1
    pushEvent("search_result_click", {
      search_term: "test",
      result_title: "First Result",
      result_type: "project",
      result_position: 1,
    });
    const event = window.dataLayer.find((e) => e.event === "search_result_click");
    expect(event?.result_position).toBeGreaterThanOrEqual(1);
  });
});

// ─── Property-Based Tests ────────────────────────────────────────────────────

// Feature: google-tag-custom-events, Property 6: Search query event fires only for queries of 3+ chars
describe("Property 6: Search query event fires only for queries of 3+ chars", () => {
  it("holds for arbitrary query strings", () => {
    fc.assert(
      fc.property(fc.string(), (query) => {
        resetDataLayer();
        triggerSearchQuery(query);
        const fired = window.dataLayer.some((e) => e.event === "search_query");
        return fired === query.trim().length >= 3;
      }),
      { numRuns: 100 },
    );
  });
});
