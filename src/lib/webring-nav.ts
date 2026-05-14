import sitesData from "../data/sites.json";
import type { WebringSite } from "../types/webring";

const sites = sitesData as WebringSite[];

/**
 * Hub URL with `unknown=<referrer>` for next/prev/random when `from`
 * is missing or isn’t listed in the ring.
 */
export function hubPathWithUnlistedReferrer(fromHref: string): string {
  const trimmed = fromHref.trim();
  if (!trimmed) return "/";
  return `/?unknown=${encodeURIComponent(trimmed)}`;
}

/**
 * Ordered list of member URLs from build-time data.
 */
export function getWebringUrls(): readonly string[] {
  return sites.map((site) => site.url);
}

function normalizeUrlForMatch(href: string): string {
  try {
    const url = new URL(href);
    url.hash = "";
    let path = url.pathname;
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    url.pathname = path || "/";
    return url.href;
  } catch {
    return href;
  }
}

/**
 * Find index of `currentUrl` in `urls` after normalizing both sides, or -1.
 */
export function getCurrentSiteIndex(
  urls: readonly string[],
  currentUrl: string = typeof window !== "undefined" ? window.location.href : "",
): number {
  const normalizedCurrentUrl = normalizeUrlForMatch(currentUrl);
  return urls.findIndex((url) => normalizeUrlForMatch(url) === normalizedCurrentUrl);
}

/**
 * Wrap-around index resolution for "next"/"prev" navigation in the ring.
 */
export function resolveRelativeIndex(
  currentIndex: number,
  total: number,
  direction: "next" | "prev",
): number {
  if (total <= 0 || currentIndex < 0 || currentIndex >= total) return -1;
  const delta = direction === "next" ? 1 : -1;
  return (currentIndex + delta + total) % total;
}

/**
 * Pick a uniformly random index in [0, total). When `exclude` is supplied
 * (and the ring has more than one site), the result is guaranteed to differ
 * from `exclude` so we never bounce back to the same site.
 */
export function pickRandomIndex(total: number, exclude?: number): number {
  if (total <= 0) return -1;
  if (total === 1 || exclude === undefined || exclude < 0 || exclude >= total) {
    return Math.floor(Math.random() * total);
  }
  const r = Math.floor(Math.random() * (total - 1));
  return r >= exclude ? r + 1 : r;
}

/**
 * Move the browser to the next or previous site in the webring (wraps at ends).
 * Falls back to a random site if the current URL isn't a member.
 */
export function navigateWebringRelative(direction: "next" | "prev"): void {
  const siteUrls = getWebringUrls();
  if (siteUrls.length === 0) {
    console.warn("Webring has no sites");
    return;
  }
  const currentIndex = getCurrentSiteIndex(siteUrls);
  const targetIndex =
    currentIndex === -1
      ? pickRandomIndex(siteUrls.length)
      : resolveRelativeIndex(currentIndex, siteUrls.length, direction);
  const targetUrl = siteUrls[targetIndex];
  if (targetUrl) {
    window.location.href = targetUrl;
  }
}
