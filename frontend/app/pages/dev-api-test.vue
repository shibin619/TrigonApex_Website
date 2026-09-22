<script setup lang="ts">
// Development-only diagnostic page. Verifies Nuxt -> Laravel -> JSON works.
// Not part of the website; not linked from navigation; 404s outside dev.
if (!import.meta.dev) {
  throw createError({ statusCode: 404 })
}

interface HealthResponse {
  success: boolean
  message: string
  data: {
    application: string
    api_version: string
    laravel_version: string
    environment: string
    timestamp: string
  }
}

const health = ref<HealthResponse | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    health.value = await useApi<HealthResponse>('/api/v1/health')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Request failed'
  }
})
</script>

<template>
  <div style="padding: 2rem; font-family: monospace; white-space: pre-wrap;">
    <h1>Dev API Test</h1>
    <p>Calls GET /api/v1/health on the Laravel backend via useApi().</p>
    <p v-if="error">Error: {{ error }}</p>
    <p v-else-if="health">{{ JSON.stringify(health, null, 2) }}</p>
    <p v-else>Loading…</p>
  </div>
</template>
