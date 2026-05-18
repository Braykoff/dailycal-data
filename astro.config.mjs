// @ts-check
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// Get git repo info (when run in GitHub Actions)
const MAIN_REPO = "dailycalprojects/dailycal-data";
const MAIN_SITE = "https://data.dailycal.org";

const repository = process.env.GITHUB_REPOSITORY ?? MAIN_REPO;
const [owner, name] = repository.split("/");
const isFork = repository !== MAIN_REPO;

console.log(`Building for repo ${repository} (fork: ${isFork})`)

// https://astro.build/config
export default defineConfig({
  site: isFork ? `https://${owner}.github.io` : MAIN_SITE,
  base: isFork ? `/${name}` : "/",

  redirects: {
    "/article": "/"
  },

  devToolbar: {
    enabled: false
  },

  integrations: [react(), mdx()]
});