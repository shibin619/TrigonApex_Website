<script setup lang="ts">
// Post-submit feedback for forms (loading/success/error), wrapping
// Nuxt UI's UAlert. Field-level primitives (label, input, textarea,
// select, inline validation) are NOT duplicated here — use UFormField +
// UInput/UTextarea/USelect + UForm directly, they already cover that well.
// This component only fills the one gap Nuxt UI doesn't have an opinion
// on: a consistent submit-result message. See
// docs/FRONTEND_ARCHITECTURE.md for the full forms convention.
type FormStatus = 'loading' | 'success' | 'error'

const props = defineProps<{
  status: FormStatus
  message: string
}>()

const colorMap: Record<FormStatus, 'neutral' | 'success' | 'error'> = {
  loading: 'neutral',
  success: 'success',
  error: 'error'
}
</script>

<template>
  <UAlert :color="colorMap[props.status]" variant="soft" :description="message" />
</template>
