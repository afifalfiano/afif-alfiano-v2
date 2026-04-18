# Design Document: Google Tag Custom Events

## Overview

This feature adds structured Google Tag Manager (GTM) custom event tracking to the Astro-based personal blog/portfolio site (`afifalfiano.my.id`). The implementation centers on a single TypeScript module (`src/assets/js/gtm-events.ts`) that provides a typed `pushEvent` function, and a set of lightweight event-wiring scripts embedded in the relevant Astro components.

The site already has:
- GA4 loaded via `gtag.js` in `src/components/google-analytics.astro`
- Partytown configured in `astro.config.mjs` with `forward: ["dataLayer.push"]`
- Astro View Transitions enabled globally in `src/layouts/main.astro`
- A search modal at `src/components/search-modal.astro`
- A post layout at `src/layouts/post.astro`
- A header with dark mode toggle at `src/components/header.astro`
- A main JS file at `src/assets/js/main.js` that already handles dark mode toggle logic

The design adds event tracking without modifying the existing GA4 setup or Partytown configuration, and without introducing new runtime dependencies.

---

## Architecture

The tracking system follows a hub-and-spoke model:

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Runtime                          │
│                                                             │
│  ┌──────────────┐    pushEvent()    ┌──────────────────┐   │
│  │  Component   │ ────────────────► │  gtm-events.ts   │   │
│  │  <script>    │                   │  (Event Tracker) │   │
│  │  blocks      │                   └────────┬─────────┘   │
│  └──────────────┘                            │              │
│                                              ▼              │
│                                    window.dataLayer[]       │
│                                              │              │
│                                    ┌─────────▼──────────┐  │
│                                    │  Partytown Worker  │  │
│                                    │  (dataLayer.push   │  │
│                                    │   forwarding)      │  │
│                                    └─────────┬──────────┘  │
│                                              │              │
└──────────────────────────────────────────────┼─────────────┘
                                               ▼
                                    GTM → GA4 / Pixels
```

**Key design decisions:**

1. **Single module, no framework coupling** — `gtm-events.ts` is a plain TypeScript module with no Astro-specific imports. It can be imported in any `<script>` block and works in both browser and SSR contexts.

2. **Component-local wiring** — Each component is responsible for wiring its own events. The post layout wires `blog_post_view` and `reading_depth`; the search modal wires search events; `main.js` wires dark mode and nav events; a new `gtm-tracker.astro` component wires outbound links globally.

3. **No new runtime dependencies** — The tracker uses only the browser's native `window.dataLayer` array. No analytics SDK is added.

4. **View Transition awareness** — All event listeners that need to re-initialize after Astro View Transitions listen to both `DOMContentLoaded` and `astro:page-load`. Stateful trackers (reading depth milestones) reset on `astro:page-load`.

5. **SSR safety** — All `window` access is guarded with `typeof window !== 'undefined'` checks so the module can be imported during Astro's static build without throwing.

---

## Components and Interfaces

### `src/assets/js/gtm-events.ts` — Event Tracker Module

The central module. All other components import from here.

```typescript
// Public API
export function pushEvent(
  eventName: string,
  params?: Record<string, unknown>
): void

// Internal helpers (not exported)
function ensureDataLayer(): void
function isOutboundUrl(href: string): boolean
function getLinkText(anchor: HTMLAnchorElement): string
```

**`pushEvent(eventName, params?)`**
- Calls `ensureDataLayer()` to guarantee `window.dataLayer` is an array
- Pushes `{ event: eventName, ...params }` to `window.dataLayer`
- No-ops silently when called in a non-browser environment

**`ensureDataLayer()`**
- Sets `window.dataLayer = window.dataLayer || []`
- Never overwrites an existing array

**`isOutboundUrl(href)`**
- Returns `true` if `href` starts with `http` and the URL's hostname differs from `window.location.hostname`
- Pure function, used by the outbound link tracker

**`getLinkText(anchor)`**
- Returns `anchor.textContent?.trim()` if non-empty
- Falls back to `anchor.getAttribute('aria-label')` if present
- Falls back to `"(no text)"` otherwise

---

### `src/components/gtm-tracker.astro` — Global Event Wiring Component

A new headless component included once in `src/layouts/main.astro`. It wires:
- **Outbound link clicks** — delegated listener on `document` for all `<a>` clicks
- **Navigation clicks** — delegated listener on `#menu` for nav link clicks

Using event delegation means these listeners survive DOM mutations from View Transitions without needing to re-attach.

```astro
---
// No server-side props needed
---
<script>
  import { pushEvent } from '../assets/js/gtm-events';
  // outbound + nav click wiring
</script>
```

---

### Modified: `src/layouts/post.astro`

Adds a `<script>` block that wires:
- `blog_post_view` on `astro:page-load`
- `reading_depth` milestones via a scroll listener, reset on each `astro:page-load`

Post metadata (`post_title`, `post_slug`, `post_author`) is passed from the Astro frontmatter into the script via `data-*` attributes on a container element, avoiding the need for inline scripts.

---

### Modified: `src/components/search-modal.astro`

Adds calls to `pushEvent` at three points in the existing search logic:
- `openModal()` → `search_open`
- Debounced input handler (upgraded from 150ms to 500ms, threshold ≥ 3 chars) → `search_query`
- `navigateTo()` → `search_result_click`

---

### Modified: `src/assets/js/main.js`

Adds a `pushEvent` call inside the existing `darkToggle` click handler, after the theme is applied, to push `dark_mode_toggle` with the correct `theme` value.

Because `main.js` is a plain JS file (not a module), it will import `pushEvent` via a dynamic `import()` call, or alternatively `main.js` can be converted to a module. Given the existing codebase uses `<script src="../assets/js/main.js">` (not `type="module"`), the cleanest approach is to keep `main.js` as-is and add a separate `<script type="module">` block in `main.astro` for the dark mode event wiring, or convert `main.js` to a module. The preferred approach is to add a small inline module script in `header.astro` that listens for the toggle and calls `pushEvent`.

---

### Modified: `src/layouts/main.astro`

Adds `<GtmTracker />` component import and usage in the `<body>`.

---

## Data Models

### DataLayer Event Shape

All events pushed to `window.dataLayer` follow this structure:

```typescript
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}
```

### Event Catalog

| Event Name | Trigger | Parameters |
|---|---|---|
| `blog_post_view` | Post page load | `post_title: string`, `post_slug: string`, `post_author: string` |
| `reading_depth` | Scroll milestone | `depth_percent: 25 \| 50 \| 75 \| 100`, `post_title: string` |
| `share_click` | Share button click | `share_method: 'copy_link' \| 'x' \| 'linkedin'`, `post_title: string` |
| `search_open` | Search modal opened | _(no extra params)_ |
| `search_query` | Debounced search (≥3 chars) | `search_term: string`, `result_count: number` |
| `search_result_click` | Search result selected | `search_term: string`, `result_title: string`, `result_type: string`, `result_position: number` |
| `dark_mode_toggle` | Dark mode button click | `theme: 'dark' \| 'light'` |
| `outbound_click` | Outbound anchor click | `link_url: string`, `link_text: string` |
| `nav_click` | Header nav link click | `nav_label: string`, `nav_url: string` |

### Reading Depth State

Managed per-page-load as a `Set<number>` of already-fired milestones:

```typescript
const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = typeof MILESTONES[number];

// Reset on each astro:page-load
let firedMilestones = new Set<Milestone>();
```

### Search State

The search modal already tracks `currentResults` and `input.value`. The tracker reads these directly from the existing variables rather than duplicating state.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: DataLayer is always an array after pushEvent

*For any* event name and optional params object, after calling `pushEvent`, `window.dataLayer` SHALL be an array.

**Validates: Requirements 1.1**

---

### Property 2: pushEvent preserves existing DataLayer entries

*For any* pre-existing `window.dataLayer` array with N entries, calling `pushEvent` with any event name and params SHALL result in `window.dataLayer` having N+1 entries, with all original N entries still present and unchanged.

**Validates: Requirements 1.2**

---

### Property 3: pushEvent produces correctly shaped events

*For any* event name string and params object, the object pushed to `window.dataLayer` by `pushEvent` SHALL contain `{ event: eventName }` merged with all provided params, with no params dropped or mutated.

**Validates: Requirements 1.4, 2.2, 3.3, 4.4, 5.3, 5.5, 6.2, 7.2, 8.2**

---

### Property 4: Reading depth milestones fire at most once per page load

*For any* sequence of scroll events that crosses a given milestone threshold multiple times, the `reading_depth` event for that milestone SHALL be pushed to `window.dataLayer` exactly once within a single page load cycle.

**Validates: Requirements 3.4**

---

### Property 5: Reading depth percentage calculation is correct

*For any* valid combination of `scrollY`, `scrollHeight`, and `innerHeight` values (where `scrollHeight > innerHeight`), the computed scroll depth percentage SHALL equal `Math.floor((scrollY / (scrollHeight - innerHeight)) * 100)`, clamped to [0, 100].

**Validates: Requirements 3.1**

---

### Property 6: Search query event fires only for queries of 3 or more characters

*For any* input string, `search_query` SHALL be pushed to `window.dataLayer` if and only if the trimmed query length is greater than or equal to 3.

**Validates: Requirements 5.2**

---

### Property 7: Outbound link classification is correct

*For any* URL string, the `isOutboundUrl` function SHALL return `true` if and only if the URL starts with `http` and its parsed hostname differs from `window.location.hostname`.

**Validates: Requirements 7.3**

---

### Property 8: Link text fallback chain is exhaustive

*For any* anchor element, `getLinkText` SHALL return the trimmed `textContent` if non-empty; otherwise the `aria-label` attribute value if present; otherwise the string `"(no text)"`. The result SHALL never be `null`, `undefined`, or an empty string.

**Validates: Requirements 7.4**

---

### Property 9: Dark mode toggle event reflects the activated theme

*For any* initial theme state (`dark` or `light`), clicking the dark mode toggle SHALL push a `dark_mode_toggle` event whose `theme` parameter equals the theme that was activated (i.e., the opposite of the initial state).

**Validates: Requirements 6.2**

---

## Error Handling

### Non-browser Environment (SSR / Build)

`gtm-events.ts` guards all `window` access:

```typescript
export function pushEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  ensureDataLayer();
  window.dataLayer.push({ event: eventName, ...params });
}
```

This ensures the module can be imported during Astro's static build without throwing a `ReferenceError`.

### Missing DOM Elements

All DOM queries in event-wiring scripts use optional chaining (`?.`) and null checks before attaching listeners. If an element is absent (e.g., the post layout is not active), the wiring silently skips.

### Outbound Link Click — Navigation Race

For outbound links that open in the same tab, the `outbound_click` event is pushed synchronously before navigation. Since `dataLayer.push` is synchronous and Partytown's forwarding is designed for this pattern, no special delay is needed.

### Search Debounce

The existing search modal uses a 150ms debounce for rendering results. The `search_query` event uses a separate 500ms debounce with a 3-character minimum, so the two timers are independent and do not interfere.

### View Transition Cleanup

Reading depth scroll listeners are added and removed cleanly:

```typescript
document.addEventListener('astro:page-load', () => {
  // Remove previous listener if any
  window.removeEventListener('scroll', scrollHandler);
  firedMilestones = new Set();
  // Re-attach
  window.addEventListener('scroll', scrollHandler, { passive: true });
});
```

---

## Testing Strategy

### Unit Tests

Use **Vitest** (compatible with the existing Astro/TypeScript setup) with **jsdom** for DOM simulation.

**`gtm-events.test.ts`** — Tests for the core module:
- `pushEvent` initializes `window.dataLayer` when absent
- `pushEvent` appends to an existing `window.dataLayer` without overwriting
- `pushEvent` pushes the correct event shape for various inputs
- `isOutboundUrl` correctly classifies internal vs. external URLs
- `getLinkText` follows the fallback chain correctly
- Module import in a non-browser context (Node.js, `window` undefined) does not throw

**`reading-depth.test.ts`** — Tests for scroll milestone logic:
- Scroll depth percentage calculation for various scroll positions
- Milestones fire exactly once per page load
- Milestones reset after `astro:page-load`

**`search-events.test.ts`** — Tests for search event logic:
- `search_query` fires only for queries ≥ 3 characters
- `search_query` includes correct `search_term` and `result_count`
- `search_result_click` includes all required fields

### Property-Based Tests

Use **fast-check** for property-based testing. Each property test runs a minimum of **100 iterations**.

```
// Tag format: Feature: google-tag-custom-events, Property N: <property_text>
```

**Property 1** — DataLayer array invariant:
```
// Feature: google-tag-custom-events, Property 1: DataLayer is always an array after pushEvent
fc.assert(fc.property(fc.string(), fc.option(fc.dictionary(fc.string(), fc.anything())), (name, params) => {
  delete (window as any).dataLayer;
  pushEvent(name, params ?? undefined);
  return Array.isArray(window.dataLayer);
}))
```

**Property 2** — DataLayer preservation:
```
// Feature: google-tag-custom-events, Property 2: pushEvent preserves existing DataLayer entries
fc.assert(fc.property(fc.array(fc.anything()), fc.string(), (existing, name) => {
  window.dataLayer = [...existing];
  pushEvent(name);
  return window.dataLayer.length === existing.length + 1
    && existing.every((item, i) => window.dataLayer[i] === item);
}))
```

**Property 3** — Event shape correctness:
```
// Feature: google-tag-custom-events, Property 3: pushEvent produces correctly shaped events
fc.assert(fc.property(fc.string({ minLength: 1 }), fc.dictionary(fc.string(), fc.anything()), (name, params) => {
  window.dataLayer = [];
  pushEvent(name, params);
  const pushed = window.dataLayer[0];
  return pushed.event === name && Object.entries(params).every(([k, v]) => pushed[k] === v);
}))
```

**Property 4** — Milestone idempotence:
```
// Feature: google-tag-custom-events, Property 4: Reading depth milestones fire at most once per page load
fc.assert(fc.property(fc.constantFrom(25, 50, 75, 100), fc.integer({ min: 2, max: 10 }), (milestone, times) => {
  // simulate crossing the milestone `times` times
  // verify reading_depth for that milestone appears exactly once in dataLayer
}))
```

**Property 5** — Scroll depth calculation:
```
// Feature: google-tag-custom-events, Property 5: Reading depth percentage calculation is correct
fc.assert(fc.property(
  fc.integer({ min: 0, max: 10000 }),  // scrollY
  fc.integer({ min: 100, max: 20000 }), // scrollHeight
  fc.integer({ min: 50, max: 1000 }),   // innerHeight
  (scrollY, scrollHeight, innerHeight) => {
    fc.pre(scrollHeight > innerHeight);
    const scrollable = scrollHeight - innerHeight;
    const clampedScrollY = Math.min(scrollY, scrollable);
    const expected = Math.floor((clampedScrollY / scrollable) * 100);
    return computeScrollDepth(scrollY, scrollHeight, innerHeight) === expected;
  }
))
```

**Property 6** — Search query threshold:
```
// Feature: google-tag-custom-events, Property 6: Search query event fires only for queries of 3+ chars
fc.assert(fc.property(fc.string(), (query) => {
  window.dataLayer = [];
  triggerSearchQuery(query);
  const fired = window.dataLayer.some(e => e.event === 'search_query');
  return fired === (query.trim().length >= 3);
}))
```

**Property 7** — Outbound URL classification:
```
// Feature: google-tag-custom-events, Property 7: Outbound link classification is correct
fc.assert(fc.property(fc.webUrl(), (url) => {
  const expected = url.startsWith('http') && new URL(url).hostname !== window.location.hostname;
  return isOutboundUrl(url) === expected;
}))
```

**Property 8** — Link text fallback:
```
// Feature: google-tag-custom-events, Property 8: Link text fallback chain is exhaustive
fc.assert(fc.property(
  fc.option(fc.string()),  // textContent
  fc.option(fc.string()),  // aria-label
  (text, ariaLabel) => {
    const anchor = createAnchorWith(text, ariaLabel);
    const result = getLinkText(anchor);
    const trimmedText = text?.trim() ?? '';
    if (trimmedText) return result === trimmedText;
    if (ariaLabel) return result === ariaLabel;
    return result === '(no text)';
  }
))
```

**Property 9** — Dark mode toggle theme correctness:
```
// Feature: google-tag-custom-events, Property 9: Dark mode toggle event reflects the activated theme
fc.assert(fc.property(fc.constantFrom('dark', 'light'), (initialTheme) => {
  setupTheme(initialTheme);
  window.dataLayer = [];
  simulateDarkModeToggle();
  const event = window.dataLayer.find(e => e.event === 'dark_mode_toggle');
  const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';
  return event?.theme === expectedTheme;
}))
```

### Integration Tests

- Verify Partytown config in `astro.config.mjs` includes `"dataLayer.push"` in `forward` array (already present — smoke check)
- End-to-end: load a post page in a headless browser (Playwright), scroll to 50%, verify `reading_depth` event appears in `window.dataLayer`

### Test Configuration

```json
// vitest.config.ts additions
{
  "test": {
    "environment": "jsdom",
    "include": ["src/**/*.test.ts"],
    "coverage": { "include": ["src/assets/js/gtm-events.ts"] }
  }
}
```

Property tests use `fast-check` with `numRuns: 100` minimum per property.
