import { defineConfig } from 'vite'

export default defineConfig({
  // BASE_PATH is injected by the GitHub Actions deploy workflow via
  // actions/configure-pages, so asset URLs are correct whether the site
  // is served from a custom domain (/) or the default gh-pages subdirectory (/www/).
  base: process.env.BASE_PATH ?? '/',
})
