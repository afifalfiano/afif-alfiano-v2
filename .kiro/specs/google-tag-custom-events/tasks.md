# Implementation Plan: Google Tag Custom Events

## Overview

Instrument the Astro blog/portfolio site with structured GTM custom events pushed to `window.dataLayer`. The implementation centers on a single TypeScript module (`src/assets/js/gtm-events.ts`) and lightweight event-wiring scripts embedded in the relevant Astro components. All code is TypeScript, compatible with the existing Vitest + jsdom + fast-check test setup.

## Tasks

- [x] 1. Create the Event Tracker module (`src/assets/js/gtm-events.ts`)
  - Implement `ensureDataLayer()` — sets `window.dataLayer = window.dataLayer || []` without overwriting an existing array
  - Implement and export `pushEvent(eventName, params?)` — guards for `typeof window === 'undefined'`, calls `ensureDataLayer()`, then pushes `{ event: eventName, ...params }`
  - Implement and export `isOutboundUrl(href)` — returns `true` if `href` starts with `http` and its parsed hostname differs from `window.location.hostname`
  - Implement and export `getLinkText(anchor)` — fallback chain: trimmed `textContent` → `aria-label` → `"(no text)"`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.3, 7.4, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 1.1 Write property test for DataLayer array invariant (Property 1)
    - **Property 1: DataLayer is always an array after pushEvent**
    - **Validates: Requirements 1.1**

  - [ ]* 1.2 Write property test for DataLayer preservation (Property 2)
    - **Property 2: pushEvent preserves existing DataLayer entries**
    - **Validates: Requirements 1.2**

  - [ ]* 1.3 Write property test for event shape correctness (Property 3)
    - **Property 3: pushEvent produces correctly shaped events**
    - **Validates: Requirements 1.4, 2.2, 3.3, 4.4, 5.3, 5.5, 6.2, 7.2, 8.2**

  - [ ]* 1.4 Write property test for outbound URL classification (Property 7)
    - **Property 7: Outbound link classification is correct**
    - **Validates: Requirements 7.3**

  - [ ]* 1.5 Write property test for link text fallback chain (Property 8)
    - **Property 8: Link text fallback chain is exhaustive**
    - **Validates: Requirements 7.4**

  - [ ]* 1.6 Write unit tests for `pushEvent`, `isOutboundUrl`, and `getLinkText`
    - Cover: initialization when absent, appending to existing array, correct event shape, relative URLs, same-hostname URLs, external URLs, textContent fallback, aria-label fallback, `"(no text)"` fallback
    - _Requirements: 1.1, 1.2, 1.4, 7.3, 7.4_

- [x] 2. Checkpoint — Ensure all gtm-events module tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Wire blog post view and reading depth events in `src/layouts/post.astro`
  - Add `data-post-title`, `data-post-slug`, and `data-post-author` attributes to the `#post-content` element so the script can read post metadata without inline scripts
  - Add a `<script>` block that imports `pushEvent` from `gtm-events.ts`
  - On `astro:page-load` and `DOMContentLoaded`, read the `data-*` attributes and push `blog_post_view` with `post_title`, `post_slug`, and `post_author`
  - Implement `computeScrollDepth(scrollY, scrollHeight, innerHeight)` as a pure function: `Math.floor(Math.min(scrollY, scrollHeight - innerHeight) / (scrollHeight - innerHeight) * 100)`, returning 100 when `scrollHeight <= innerHeight`
  - On each `astro:page-load`, reset `firedMilestones` to a new `Set<Milestone>()` and re-attach the scroll listener (removing the previous one first)
  - In the scroll listener, compute depth and push `reading_depth` with `depth_percent` and `post_title` for each milestone (25, 50, 75, 100) not yet in `firedMilestones`
  - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.1 Write property test for reading depth milestone idempotence (Property 4)
    - **Property 4: Reading depth milestones fire at most once per page load**
    - **Validates: Requirements 3.4**

  - [ ]* 3.2 Write property test for scroll depth percentage calculation (Property 5)
    - **Property 5: Reading depth percentage calculation is correct**
    - **Validates: Requirements 3.1**

  - [ ]* 3.3 Write unit tests for `computeScrollDepth` and milestone tracking
    - Test: 0% at top, 50% at midpoint, 100% at bottom, clamping beyond scrollable range, no-scroll-area returns 100, milestones do not re-fire on upward scroll, all four milestones fire when scrolled to 100%
    - _Requirements: 3.1, 3.2, 3.4_

- [x] 4. Wire share button click events in `src/layouts/post.astro`
  - In the existing share button script block, import `pushEvent` and add click listeners on `#share-copy`, `#share-x`, and `#share-linkedin`
  - Push `share_click` with `share_method: "copy_link"` | `"x"` | `"linkedin"` and `post_title` (read from `document.title` or the `data-post-title` attribute)
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 4.1 Write unit tests for share_click event shape
    - Test that each share button pushes the correct `share_method` value and includes `post_title`
    - _Requirements: 4.4_

- [x] 5. Wire search interaction events in `src/components/search-modal.astro`
  - Import `pushEvent` in the existing `<script>` block
  - In `openModal()`, call `pushEvent("search_open")`
  - In the input handler, add a separate 500ms debounce timer; when it fires, if `input.value.trim().length >= 3`, push `search_query` with `search_term` (trimmed) and `result_count` (from `currentResults.length`)
  - In `navigateTo()`, push `search_result_click` with `search_term`, `result_title`, `result_type`, and `result_position` (1-based index)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 5.1 Write property test for search query threshold (Property 6)
    - **Property 6: Search query event fires only for queries of 3 or more characters**
    - **Validates: Requirements 5.2**

  - [ ]* 5.2 Write unit tests for search event shapes
    - Test: `search_query` fires for ≥3 chars, does not fire for <3 chars or whitespace-only, includes trimmed `search_term` and `result_count`; `search_result_click` includes all required fields with 1-based `result_position`
    - _Requirements: 5.2, 5.3, 5.5_

- [x] 6. Checkpoint — Ensure all post and search event tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire dark mode toggle event in `src/components/header.astro`
  - Add a `<script>` block (module) in `header.astro` that imports `pushEvent`
  - Listen for clicks on `#darkToggle` on both `DOMContentLoaded` and `astro:page-load`
  - Before the toggle is applied, determine `willBeDark = !document.documentElement.classList.contains("dark")`
  - Push `dark_mode_toggle` with `theme: willBeDark ? "dark" : "light"`
  - _Requirements: 6.1, 6.2_

  - [ ]* 7.1 Write property test for dark mode toggle theme correctness (Property 9)
    - **Property 9: Dark mode toggle event reflects the activated theme**
    - **Validates: Requirements 6.2**

  - [ ]* 7.2 Write unit tests for dark_mode_toggle event
    - Test: event fires on toggle, `theme` is `"dark"` when activating dark mode, `theme` is `"light"` when activating light mode, exactly one event per click
    - _Requirements: 6.1, 6.2_

- [x] 8. Create `src/components/gtm-tracker.astro` for global outbound and nav click events
  - Create a headless Astro component with a single `<script>` block
  - Import `pushEvent`, `isOutboundUrl`, and `getLinkText` from `gtm-events.ts`
  - Add a delegated `click` listener on `document` that walks up to the nearest `<a>`, checks `isOutboundUrl(href)`, and pushes `outbound_click` with `link_url` and `link_text`
  - Add a function `wireNavTracking()` that attaches a delegated `click` listener on `#menu`; on click, find the nearest `<a>` and push `nav_click` with `nav_label` and `nav_url`
  - Call `wireNavTracking()` on both `DOMContentLoaded` and `astro:page-load`
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.1, 8.2_

  - [ ]* 8.1 Write unit tests for outbound click and nav click event shapes
    - Test: `outbound_click` fires for external URLs, does not fire for internal URLs, uses `getLinkText` fallback chain; `nav_click` fires for nav links with correct `nav_label` and `nav_url`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.1, 8.2_

- [x] 9. Include `GtmTracker` in `src/layouts/main.astro`
  - Import `GtmTracker` from `../components/gtm-tracker.astro` in the frontmatter
  - Add `<GtmTracker />` inside `<body>`, after `<SearchModal />`
  - _Requirements: 9.3, 9.4_

- [x] 10. Final checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all unit and property-based tests pass with zero failures
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- The design document uses TypeScript throughout — all implementation must be TypeScript
- `computeScrollDepth` is extracted as a pure function to enable property-based testing without DOM setup
- Event delegation in `gtm-tracker.astro` means outbound and nav listeners survive Astro View Transition DOM swaps without re-attachment
- The 500ms search debounce timer is independent of the existing 150ms render debounce — they must not share a timer variable
- All `window` access in `gtm-events.ts` is guarded with `typeof window !== 'undefined'` for SSR safety
- Property tests use `fast-check` with `numRuns: 100` minimum per property
