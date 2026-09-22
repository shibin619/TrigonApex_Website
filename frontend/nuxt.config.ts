// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Example of the hybrid rendering approach locked in ARCHITECTURE.md §5:
  // static/prerendered marketing pages vs. SSR for API-backed pages.
  // Expand per-route as real pages are added.
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30'
})
