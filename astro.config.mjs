import { defineConfig } from "astro/config";

const site =
  process.env.PUBLIC_HUB_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site,
  output: "static",
});
