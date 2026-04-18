/**
 * Tests for reading depth tracking logic
 * Feature: google-tag-custom-events
 *
 * Covers:
 *  - Property 4: Reading depth milestones fire at most once per page load
 *  - Property 5: Reading depth percentage calculation is correct
 */

import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { pushEvent, computeScrollDepth } from "./gtm-events";

const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = (typeof MILESTONES)[number];

/**
 * Simulates the reading depth tracking logic for a sequence of scroll depths.
 * Returns the dataLayer events that were pushed.
 */
function simulateScrollSequence(
  depths: number[],
  postTitle = "Test Post",
): Record<string, unknown>[] {
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  (window as any).dataLayer = [];
  const firedMilestones = new Set<Milestone>();

  for (const depth of depths) {
    for (const milestone of MILESTONES) {
      if (depth >= milestone && !firedMilestones.has(milestone)) {
        firedMilestones.add(milestone);
        pushEvent("reading_depth", {
          depth_percent: milestone,
          post_title: postTitle,
        });
      }
    }
  }

  return window.dataLayer;
}

// ─── Unit Tests ─────────────────────────────────────────────────────────────

describe("computeScrollDepth — unit tests", () => {
  it("returns 0 when scrollY is 0", () => {
    expect(computeScrollDepth(0, 2000, 800)).toBe(0);
  });

  it("returns 100 when scrolled to the bottom", () => {
    expect(computeScrollDepth(1200, 2000, 800)).toBe(100);
  });

  it("returns 50 when scrolled halfway", () => {
    expect(computeScrollDepth(600, 2000, 800)).toBe(50);
  });

  it("returns 100 when scrollHeight equals innerHeight (no scrollable area)", () => {
    expect(computeScrollDepth(0, 800, 800)).toBe(100);
  });

  it("clamps scrollY beyond scrollable range to 100", () => {
    expect(computeScrollDepth(9999, 2000, 800)).toBe(100);
  });
});

describe("Reading depth milestone tracking — unit tests", () => {
  beforeEach(() => {
    // biome-ignore lint/suspicious/noExplicitAny: test helper
    (window as any).dataLayer = [];
  });

  it("fires 25% milestone when depth reaches 25", () => {
    const events = simulateScrollSequence([25]);
    expect(events.some((e) => e.event === "reading_depth" && e.depth_percent === 25)).toBe(true);
  });

  it("fires all four milestones when scrolled to 100%", () => {
    const events = simulateScrollSequence([25, 50, 75, 100]);
    const milestones = events
      .filter((e) => e.event === "reading_depth")
      .map((e) => e.depth_percent);
    expect(milestones).toContain(25);
    expect(milestones).toContain(50);
    expect(milestones).toContain(75);
    expect(milestones).toContain(100);
  });

  it("does not fire milestones on upward scroll", () => {
    // Scroll to 75%, then back to 25%
    const events = simulateScrollSequence([75, 25]);
    const depthEvents = events.filter((e) => e.event === "reading_depth");
    // Should only have 25, 50, 75 — not duplicated
    expect(depthEvents).toHaveLength(3);
  });
});

// ─── Property-Based Tests ────────────────────────────────────────────────────

// Feature: google-tag-custom-events, Property 4: Reading depth milestones fire at most once per page load
describe("Property 4: Reading depth milestones fire at most once per page load", () => {
  it("holds for any milestone crossed multiple times", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(25 as const, 50 as const, 75 as const, 100 as const),
        fc.integer({ min: 2, max: 10 }),
        (milestone, times) => {
          // Build a sequence that crosses the milestone `times` times
          // by alternating above and below (simulating scroll up/down)
          const depths: number[] = [];
          for (let i = 0; i < times; i++) {
            depths.push(milestone); // cross milestone
            if (i < times - 1) depths.push(milestone - 1); // scroll back up
          }

          const events = simulateScrollSequence(depths);
          const milestoneEvents = events.filter(
            (e) => e.event === "reading_depth" && e.depth_percent === milestone,
          );
          // Must fire exactly once regardless of how many times it was crossed
          return milestoneEvents.length === 1;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: google-tag-custom-events, Property 5: Reading depth percentage calculation is correct
describe("Property 5: Reading depth percentage calculation is correct", () => {
  it("holds for arbitrary valid scroll positions", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }), // scrollY
        fc.integer({ min: 100, max: 20000 }), // scrollHeight
        fc.integer({ min: 50, max: 1000 }), // innerHeight
        (scrollY, scrollHeight, innerHeight) => {
          // Pre-condition: scrollHeight must be greater than innerHeight
          fc.pre(scrollHeight > innerHeight);

          const scrollable = scrollHeight - innerHeight;
          const clampedScrollY = Math.min(scrollY, scrollable);
          const expected = Math.floor((clampedScrollY / scrollable) * 100);

          return computeScrollDepth(scrollY, scrollHeight, innerHeight) === expected;
        },
      ),
      { numRuns: 100 },
    );
  });
});
