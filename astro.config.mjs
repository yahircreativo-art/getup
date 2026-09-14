import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./src/config/seo.config";

export default defineConfig({
  site: siteConfig.url,
  output: "static",

  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
