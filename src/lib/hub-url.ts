/**
 * Canonical hub origin for meta tags and embed snippets (no trailing slash).
 *
 * Set `PUBLIC_HUB_BASE_URL` (see `.env.example`); `astro.config.mjs` passes it
 * to `site` so this matches your deployed hub in production builds.
 */
export const HUB_BASE_URL = (import.meta.env.SITE ?? "").replace(/\/$/, "");
