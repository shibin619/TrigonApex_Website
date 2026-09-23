// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Keep flat component names regardless of subfolder (components/layout/,
  // components/navigation/, etc. are organizational only) — without this,
  // Nuxt's default nested-folder prefixing would require e.g.
  // <NavigationAppHeader> instead of <AppHeader>.
  components: [
    { path: '~/components', pathPrefix: false }
  ],

  // @nuxt/ui auto-registers @nuxt/fonts. Left at its default, it tries to
  // fetch font metadata from Google/Bunny/Fontshare/Fontsource over the
  // network at build and dev time. We use the system font stack (see
  // assets/css/tokens.css) and have no external font provider approved,
  // so every remote provider is disabled — no runtime font-network
  // dependency, no external font lock-in.
  fonts: {
    providers: {
      google: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      adobe: false,
      googleicons: false,
      npm: false
    }
  },

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
  //
  // /admin/** is rendered client-only: the admin session token lives only
  // in localStorage (no cookie/SSR-shared auth state), and these pages are
  // an internal tool, not marketing content that needs SSR/SEO.
  routeRules: {
    '/': { prerender: true },
    '/admin/**': { ssr: false }
  },

  compatibilityDate: '2026-06-30'
})
