// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Public runtime config: overridable per environment via NUXT_PUBLIC_*
  // env vars (e.g. NUXT_PUBLIC_API_BASE_URL) without touching this file or
  // hardcoding URLs into components.
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:8000'
    }
  },

  // Example of the hybrid rendering approach locked in ARCHITECTURE.md §5:
  // static/prerendered marketing pages vs. SSR for API-backed pages.
  // Expand per-route as real pages are added.
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30'
})
