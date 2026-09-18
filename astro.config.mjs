import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { siteConfig } from "./src/config/seo.config";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  integrations: [
    sitemap(),
  ],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
