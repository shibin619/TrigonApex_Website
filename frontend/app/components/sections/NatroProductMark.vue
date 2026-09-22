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
    <!-- Natro Dental: a cross with small connected terminal nodes — a
         network of care touchpoints, not just a flat medical symbol. -->
    <g v-if="id === 'natro-dental'">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
      <circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </g>
    <!-- Natro Manufacturing: cog with marked tips, reading as a
         production/process mechanism rather than a flat settings icon. -->
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
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="22" r="1" fill="currentColor" stroke="none" />
      <circle cx="2" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="22" cy="12" r="1" fill="currentColor" stroke="none" />
    </g>
    <!-- Natro Finance: a concentric coin — depth/stacking, not a flat disc. -->
    <g v-else-if="id === 'natro-finance'">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 7v1.5" />
      <path d="M12 15.5v1.5" />
    </g>
    <!-- Natro POS: a tag with a marked attachment point. -->
    <g v-else>
      <path d="M12 3l7 7-9 9-7-7 9-9Z" />
      <circle cx="9" cy="9" r="1.25" />
      <circle cx="12" cy="3" r="1.1" fill="currentColor" stroke="none" />
    </g>
  </svg>
</template>
