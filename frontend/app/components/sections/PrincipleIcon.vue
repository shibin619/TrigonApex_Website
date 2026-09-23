<script setup lang="ts">
// Same craft/weight as IndustryIcon.vue — simple geometric line marks,
// single color via currentColor, no fills.
defineProps<{ id: 'target' | 'flow' | 'layers' | 'bulb' | 'chart' | 'link' }>()
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="h-full w-full"
  >
    <!-- Business-first thinking: target -->
    <g v-if="id === 'target'">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </g>
    <!-- Real workflows: connected nodes -->
    <g v-else-if="id === 'flow'">
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.2 7.3L10 16" />
      <path d="M16.8 7.3L14 16" />
    </g>
    <!-- Scalable architecture: stacked layers -->
    <g v-else-if="id === 'layers'">
      <path d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path d="M3 13l9 5 9-5" />
    </g>
    <!-- Clear product thinking: lightbulb -->
    <g v-else-if="id === 'bulb'">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.45 1.1 1.2 1.1 2.2h5c0-1 .5-1.75 1.1-2.2A6 6 0 0 0 12 3Z" />
    </g>
    <!-- Data-driven operations: bar chart -->
    <g v-else-if="id === 'chart'">
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-7" />
      <path d="M4 20h16" />
    </g>
    <!-- Long-term partnership: linked rings -->
    <g v-else>
      <circle cx="8.5" cy="12" r="4" />
      <circle cx="15.5" cy="12" r="4" />
    </g>
  </svg>
</template>
