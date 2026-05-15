// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://data.dailycal.org",
  base: "/",
  redirects: {
    
  },
  devToolbar: {
    enabled: false
  }
});