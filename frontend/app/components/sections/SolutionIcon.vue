<script setup lang="ts">
// Deliberately reuses the exact line-icon shapes from
// BusinessProblemSelector.vue (scaled 2x, from its 24x24 viewBox to this
// component's 48x48), rather than inventing a second icon set. The shared
// shape is the visual signal that a given Solution is the direct answer to
// its matching Problem — same idea, larger and more confident here because
// this section carries more visual weight than the compact selector strip.
defineProps<{ id: string }>()
</script>

<template>
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="h-full w-full"
  >
    <!-- Business Growth -->
    <g v-if="id === 'business-growth'">
      <circle cx="16" cy="30" r="8" />
      <path d="M26 22L38 10" />
      <path d="M28 10h10v10" />
    </g>
    <!-- Business Management -->
    <g v-else-if="id === 'business-management'">
      <rect x="6" y="6" width="14" height="14" rx="3" />
      <rect x="28" y="28" width="14" height="14" rx="3" />
      <path d="M20 20L28 28" />
    </g>
    <!-- Automation -->
    <g v-else-if="id === 'automation'">
      <path d="M10 24a14 14 0 1 1 4.2 10" />
      <path d="M8 38v-8h8" />
    </g>
    <!-- Business Analytics -->
    <g v-else-if="id === 'business-analytics'">
      <rect x="8" y="28" width="7" height="12" rx="2" />
      <rect x="20.5" y="18" width="7" height="22" rx="2" />
      <rect x="33" y="8" width="7" height="32" rx="2" />
    </g>
    <!-- Custom Software -->
    <g v-else>
      <path d="M24 40L10 16" />
      <path d="M10 24V16h8" />
      <path d="M24 40L38 16" />
      <path d="M30 16h8v8" />
    </g>
  </svg>
</template>
