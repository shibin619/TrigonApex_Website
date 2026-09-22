<script setup lang="ts">
// Default page layout: header, main content, footer. Uses `min-h-dvh`
// (dynamic viewport height), not `min-h-screen`/100vh, so mobile browser
// chrome (address bar) collapsing/expanding never causes layout jumps —
// see docs/FRONTEND_ARCHITECTURE.md responsive rules.
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main-content"
      class="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-default focus-visible:px-4 focus-visible:py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      Skip to main content
    </a>

    <AppHeader />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
