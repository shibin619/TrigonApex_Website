<script setup lang="ts">
// One simple, generic glyph per product, all drawn at the same weight and
// wrapped by the parent in an identical frame — the shared frame carries
// the "one product family" feel, the glyph gives each product its own
// identity. No screenshot/dashboard mockups (none exist yet, and none are
// fabricated) — restrained line marks only, per docs/HOMEPAGE_SPEC.md §9's
// "no invented capabilities" instruction extended to visuals.
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
    <!-- Natro Dental: simple medical cross -->
    <g v-if="id === 'natro-dental'">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </g>
    <!-- Natro Manufacturing: simple cog -->
    <g v-else-if="id === 'natro-manufacturing'">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M5.6 5.6l2.1 2.1" />
      <path d="M16.3 16.3l2.1 2.1" />
      <path d="M5.6 18.4l2.1-2.1" />
      <path d="M16.3 7.7l2.1-2.1" />
    </g>
    <!-- Natro Finance: simple coin -->
    <g v-else-if="id === 'natro-finance'">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v10" />
      <path d="M8 12h8" />
    </g>
    <!-- Natro POS: simple tag -->
    <g v-else>
      <path d="M12 3l7 7-9 9-7-7 9-9Z" />
      <circle cx="9" cy="9" r="1.25" />
    </g>
  </svg>
</template>
