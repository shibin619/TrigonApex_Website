<script setup lang="ts">
// Deliberately minimal — no invented client logos, ratings, or counts.
// A single trust statement plus the four capability categories keeps this
// compact, per the brief's explicit "visually compact" instruction,
// rather than becoming a second features section.
const categories = ['Business Management', 'Automation', 'Analytics', 'Custom Software']
</script>

<template>
  <div class="border-y border-default bg-default">
    <PageContainer as="div" class="flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
      <p class="text-body-sm font-medium text-muted">
        Built around real business workflows. Designed for operations,
        growth and scale.
      </p>
      <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <li v-for="category in categories" :key="category" class="text-body-sm font-semibold text-default">
          {{ category }}
        </li>
      </ul>
    </PageContainer>
  </div>
</template>
