import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/seo.config";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
