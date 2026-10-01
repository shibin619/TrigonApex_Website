<script setup lang="ts">
// Same craft/weight as IndustryIcon.vue and PrincipleIcon.vue — simple
// geometric line marks, single color via currentColor, no fills.
defineProps<{ id: string }>()
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
    <!-- Business Growth: upward trend -->
    <g v-if="id === 'business-growth'">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </g>
    <!-- Business Management: connected grid -->
    <g v-else-if="id === 'business-management'">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3v4" />
    </g>
    <!-- Automation: gear -->
    <g v-else-if="id === 'automation'">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3M3 12h2.5M18.5 12H21" />
    </g>
    <!-- Business Analytics: bar chart -->
    <g v-else-if="id === 'business-analytics'">
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-7" />
      <path d="M4 20h16" />
    </g>
    <!-- Custom Software: puzzle piece -->
    <g v-else>
      <path d="M9 4h4a1 1 0 0 1 1 1v2.2a1.8 1.8 0 1 0 0 3.6V13a1 1 0 0 1-1 1h-2.2a1.8 1.8 0 1 1-3.6 0H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2.2a1.8 1.8 0 1 0 3.6 0V5a1 1 0 0 1 1-1Z" />
    </g>
  </svg>
</template>
