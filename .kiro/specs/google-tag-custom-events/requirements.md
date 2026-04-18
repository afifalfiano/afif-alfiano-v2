# Requirements Document

## Introduction

This feature adds structured Google Tag Manager (GTM) custom event tracking to the Astro-based personal blog/portfolio site (`afifalfiano.my.id`). The site already loads Google Analytics 4 (GA4) via a `gtag.js` script in the `GoogleAnalytics` component, and Partytown is configured to forward `dataLayer.push` off the main thread.

The goal is to instrument meaningful user interactions — blog post reads, search usage, share button clicks, dark mode toggles, navigation clicks, and newsletter engagement — as named GTM custom events pushed to `window.dataLayer`. These events can then be consumed in GTM to trigger GA4 custom event tags, conversion goals, or third-party pixels without modifying the site's source code again.

## Glossary

- **DataLayer**: The global `window.dataLayer` array used by GTM to receive event data pushed from the page.
- **Custom_Event**: A named object pushed to the DataLayer with an `event` property and optional metadata fields (e.g., `{ event: 'blog_post_view', post_title: '...' }`).
- **Event_Tracker**: The client-side TypeScript/JavaScript module responsible for constructing and pushing Custom_Events to the DataLayer.
- **GTM**: Google Tag Manager — the tag management system that reads from the DataLayer and fires configured tags.
- **GA4**: Google Analytics 4 — the analytics platform receiving events forwarded from GTM.
- **Partytown**: The web worker library already configured in `astro.config.mjs` that runs third-party scripts off the main thread and forwards `dataLayer.push` calls.
- **Post_Page**: Any page rendered by `src/pages/post/[id].astro` using the `post.astro` layout.
- **Search_Modal**: The site-wide search overlay component at `src/components/search-modal.astro`.
- **Share_Button**: Any of the three share controls in the Post_Page footer: "Copy link", "Share on X", or "LinkedIn".
- **Dark_Mode_Toggle**: The `#darkToggle` button in the site header that switches between light and dark themes.
- **Reading_Progress**: The horizontal progress bar in the Post_Page that tracks scroll depth through an article.
- **Outbound_Link**: Any anchor element whose `href` begins with `http` and points to a domain other than `afifalfiano.my.id`.

---

## Requirements

### Requirement 1: DataLayer Initialization

**User Story:** As a site owner, I want the DataLayer to be reliably initialized before any custom events are pushed, so that no events are silently dropped due to a missing array.

#### Acceptance Criteria

1. THE Event_Tracker SHALL ensure `window.dataLayer` is initialized as an array before pushing any Custom_Event.
2. WHEN `window.dataLayer` already exists, THE Event_Tracker SHALL append to the existing array without overwriting it.
3. THE Event_Tracker SHALL expose a single `pushEvent(eventName: string, params?: Record<string, unknown>): void` function as the sole interface for pushing Custom_Events.
4. WHEN `pushEvent` is called, THE Event_Tracker SHALL push an object containing at minimum `{ event: eventName }` merged with any provided `params` to `window.dataLayer`.

---

### Requirement 2: Blog Post View Event

**User Story:** As a site owner, I want to know which blog posts are being read, so that I can understand content popularity and reader interests.

#### Acceptance Criteria

1. WHEN a Post_Page finishes loading (the `astro:page-load` event fires), THE Event_Tracker SHALL push a `blog_post_view` Custom_Event to the DataLayer.
2. WHEN pushing the `blog_post_view` event, THE Event_Tracker SHALL include `post_title` (the post's title string), `post_slug` (the URL pathname), and `post_author` (the author name string) as event parameters.
3. WHILE a Post_Page is active, THE Event_Tracker SHALL push the `blog_post_view` event exactly once per page load, including after Astro View Transition navigations.

---

### Requirement 3: Reading Depth Milestones

**User Story:** As a site owner, I want to know how far readers scroll through blog posts, so that I can measure content engagement beyond a simple page view.

#### Acceptance Criteria

1. WHILE a Post_Page is active and the reader scrolls, THE Event_Tracker SHALL track scroll depth as a percentage of total scrollable height.
2. WHEN scroll depth first reaches 25%, 50%, 75%, or 100% of the Post_Page, THE Event_Tracker SHALL push a `reading_depth` Custom_Event to the DataLayer.
3. WHEN pushing the `reading_depth` event, THE Event_Tracker SHALL include `depth_percent` (integer: 25, 50, 75, or 100) and `post_title` as event parameters.
4. THE Event_Tracker SHALL push each `reading_depth` milestone at most once per Post_Page load (milestones SHALL NOT re-fire on upward scroll).
5. WHEN a new Post_Page is loaded via View Transition, THE Event_Tracker SHALL reset all milestone tracking so milestones can fire again for the new post.

---

### Requirement 4: Share Button Click Events

**User Story:** As a site owner, I want to track when readers share a post, so that I can measure social amplification of my content.

#### Acceptance Criteria

1. WHEN a reader clicks the "Copy link" Share_Button, THE Event_Tracker SHALL push a `share_click` Custom_Event to the DataLayer.
2. WHEN a reader clicks the "Share on X" Share_Button, THE Event_Tracker SHALL push a `share_click` Custom_Event to the DataLayer.
3. WHEN a reader clicks the "LinkedIn" Share_Button, THE Event_Tracker SHALL push a `share_click` Custom_Event to the DataLayer.
4. WHEN pushing a `share_click` event, THE Event_Tracker SHALL include `share_method` (one of: `copy_link`, `x`, `linkedin`) and `post_title` as event parameters.

---

### Requirement 5: Search Interaction Events

**User Story:** As a site owner, I want to know when visitors use the search feature and what they search for, so that I can identify content gaps and popular topics.

#### Acceptance Criteria

1. WHEN the Search_Modal is opened (via the search toggle button or the ⌘K / Ctrl+K shortcut), THE Event_Tracker SHALL push a `search_open` Custom_Event to the DataLayer.
2. WHEN a reader submits a search query (defined as typing at least 3 characters with no further input for 500ms), THE Event_Tracker SHALL push a `search_query` Custom_Event to the DataLayer.
3. WHEN pushing the `search_query` event, THE Event_Tracker SHALL include `search_term` (the query string, trimmed) and `result_count` (integer count of results returned) as event parameters.
4. WHEN a reader selects a search result, THE Event_Tracker SHALL push a `search_result_click` Custom_Event to the DataLayer.
5. WHEN pushing the `search_result_click` event, THE Event_Tracker SHALL include `search_term` (the active query string), `result_title` (the title of the selected item), `result_type` (the item type: `post`, `project`, `talk`, `medium`), and `result_position` (1-based integer index of the selected result) as event parameters.

---

### Requirement 6: Dark Mode Toggle Event

**User Story:** As a site owner, I want to know how many visitors switch between light and dark mode, so that I can understand theme preferences.

#### Acceptance Criteria

1. WHEN a reader clicks the Dark_Mode_Toggle, THE Event_Tracker SHALL push a `dark_mode_toggle` Custom_Event to the DataLayer.
2. WHEN pushing the `dark_mode_toggle` event, THE Event_Tracker SHALL include `theme` (one of: `dark`, `light`) reflecting the theme that was activated as an event parameter.

---

### Requirement 7: Outbound Link Click Events

**User Story:** As a site owner, I want to track when visitors click links that take them away from my site, so that I can understand which external resources are most valuable to my audience.

#### Acceptance Criteria

1. WHEN a reader clicks an Outbound_Link anywhere on the site, THE Event_Tracker SHALL push an `outbound_click` Custom_Event to the DataLayer.
2. WHEN pushing the `outbound_click` event, THE Event_Tracker SHALL include `link_url` (the full `href` of the clicked anchor) and `link_text` (the visible text content of the anchor, trimmed) as event parameters.
3. THE Event_Tracker SHALL identify Outbound_Links as anchor elements whose `href` begins with `http` and whose hostname differs from `window.location.hostname`.
4. IF an Outbound_Link has no visible text content, THEN THE Event_Tracker SHALL use the `aria-label` attribute value as `link_text`; IF no `aria-label` is present, THEN THE Event_Tracker SHALL use the string `"(no text)"` as `link_text`.

---

### Requirement 8: Navigation Click Events

**User Story:** As a site owner, I want to know which navigation items visitors click, so that I can understand how people move through my site.

#### Acceptance Criteria

1. WHEN a reader clicks a navigation link in the site header, THE Event_Tracker SHALL push a `nav_click` Custom_Event to the DataLayer.
2. WHEN pushing the `nav_click` event, THE Event_Tracker SHALL include `nav_label` (the visible text of the clicked link) and `nav_url` (the `href` of the clicked link) as event parameters.

---

### Requirement 9: Event Tracker Module Structure

**User Story:** As a developer, I want the event tracking logic to be centralized in a single reusable module, so that tracking calls are consistent and easy to maintain.

#### Acceptance Criteria

1. THE Event_Tracker SHALL be implemented as a single TypeScript module at `src/assets/js/gtm-events.ts`.
2. THE Event_Tracker SHALL export the `pushEvent` function as a named export.
3. WHEN the Event_Tracker module is imported in an Astro component's `<script>` block, THE Event_Tracker SHALL function correctly in the browser without requiring a build-time environment variable or server-side execution.
4. THE Event_Tracker SHALL be compatible with Partytown's `dataLayer.push` forwarding already configured in `astro.config.mjs`.
5. WHERE the site is rendered in a non-browser environment (e.g., during Astro's static build), THE Event_Tracker SHALL not throw errors when imported.
