import type { APIRoute } from "astro";
import sites from "../data/sites.json";

// Re-exports src/data/sites.json at /sites.json so the browser can fetch it,
// while keeping a single source of truth for the build-time imports.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(sites), {
    headers: { "Content-Type": "application/json" },
  });
