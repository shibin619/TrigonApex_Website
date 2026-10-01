<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preload', href: '/fonts/WorkSans-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/WorkSans-Bold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
