/**
 * GTM Custom Events — Event Tracker Module
 *
 * Central module for pushing structured custom events to window.dataLayer.
 * Compatible with Partytown's dataLayer.push forwarding.
 * SSR-safe: all window access is guarded with typeof checks.
 */

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Ensures window.dataLayer is initialized as an array.
 * Never overwrites an existing array.
 */
function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Pushes a custom event to window.dataLayer.
 * No-ops silently in non-browser environments (SSR / build).
 *
 * @param eventName - The GTM event name (e.g. 'blog_post_view')
 * @param params - Optional additional parameters merged into the event object
 */
export function pushEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  ensureDataLayer();
  window.dataLayer.push({ event: eventName, ...params });
}

/**
 * Returns true if the given href is an outbound URL —
 * i.e. it starts with 'http' and its hostname differs from the current page's hostname.
 *
 * @param href - The anchor's href attribute value
 */
export function isOutboundUrl(href: string): boolean {
  if (typeof window === "undefined") return false;
  if (!href.startsWith("http")) return false;
  try {
    const url = new URL(href);
    return url.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

/**
 * Returns the best available text label for an anchor element.
 * Fallback chain:
 *   1. trimmed textContent (if non-empty)
 *   2. aria-label attribute (if present)
 *   3. "(no text)"
 *
 * The result is never null, undefined, or an empty string.
 *
 * @param anchor - The HTMLAnchorElement to extract text from
 */
export function getLinkText(anchor: HTMLAnchorElement): string {
  const trimmed = anchor.textContent?.trim() ?? "";
  if (trimmed) return trimmed;
  const ariaLabel = anchor.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;
  return "(no text)";
}

/**
 * Computes the scroll depth percentage as a pure function.
 * Returns a value in [0, 100].
 *
 * Formula: Math.floor(Math.min(scrollY, scrollHeight - innerHeight) / (scrollHeight - innerHeight) * 100)
 * Returns 100 when scrollHeight <= innerHeight (no scrollable area).
 *
 * @param scrollY - Current vertical scroll position
 * @param scrollHeight - Total scrollable height of the document
 * @param innerHeight - Visible viewport height
 */
export function computeScrollDepth(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number,
): number {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) return 100;
  const clamped = Math.min(scrollY, scrollable);
  return Math.floor((clamped / scrollable) * 100);
}
