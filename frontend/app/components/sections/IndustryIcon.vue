<script setup lang="ts">
// One simple geometric line mark per industry, all drawn at the same
// visual weight (stroke width, viewBox, no fills) so no industry reads as
// more "designed" than another — equal treatment is a content requirement
// here, not just a layout one (docs/HOMEPAGE_SPEC.md §8).
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
    <!-- Dental & Healthcare: simple medical cross -->
    <g v-if="id === 'dental-healthcare'">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </g>
    <!-- Manufacturing: simple stacked box -->
    <g v-else-if="id === 'manufacturing'">
      <path d="M4 8l8-4 8 4-8 4-8-4Z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </g>
    <!-- Finance: coin stack -->
    <g v-else-if="id === 'finance'">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </g>
    <!-- Retail: shopping bag -->
    <g v-else-if="id === 'retail'">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </g>
    <!-- Transportation: vehicle -->
    <g v-else-if="id === 'transportation'">
      <path d="M4 16V10a1 1 0 0 1 1-1h9l4 4v3" />
      <path d="M4 16h14" />
      <circle cx="8" cy="17.5" r="1.75" />
      <circle cx="16.5" cy="17.5" r="1.75" />
    </g>
    <!-- Food & Restaurant: fork & knife -->
    <g v-else-if="id === 'food-restaurant'">
      <path d="M7 3v7a2 2 0 0 0 4 0V3" />
      <path d="M9 10v11" />
      <path d="M16 3c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4v10" />
    </g>
    <!-- Education: graduation cap -->
    <g v-else-if="id === 'education'">
      <path d="M2 9l10-4 10 4-10 4-10-4Z" />
      <path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </g>
    <!-- Jewellery: gem -->
    <g v-else>
      <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
      <path d="M3 8h18" />
      <path d="M9 3l-2 5 5 13 5-13-2-5" />
    </g>
  </svg>
</template>
