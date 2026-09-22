<script setup lang="ts">
// Foundational card wrapper — the base every future typed card (solution,
// industry, product, case-study, testimonial, analytics) builds on. Holds
// no business content itself; only layout/elevation/interaction concerns.
withDefaults(defineProps<{
  variant?: 'flat' | 'bordered' | 'elevated'
  // Opt-in restrained hover treatment for cards that are themselves links
  // (e.g. wrapped in NuxtLink) — per docs/HOMEPAGE_SPEC.md: a small lift +
  // border color shift to the brand accent, nothing else (no scale, no
  // shadow bloom, no color fill). Not the default, since not every card
  // is clickable.
  interactive?: boolean
}>(), {
  variant: 'bordered',
  interactive: false
})

const variantClasses: Record<'flat' | 'bordered' | 'elevated', string> = {
  flat: '',
  bordered: 'border border-default',
  elevated: 'shadow-md'
}
</script>

<template>
  <div
    class="rounded-(--radius-lg) bg-default p-6"
    :class="[
      variantClasses[variant],
      interactive && 'transition-[transform,border-color] duration-(--duration-fast) ease-(--ease-standard) hover:-translate-y-1 hover:border-brand-300 focus-visible:-translate-y-1 focus-visible:border-brand-300'
    ]"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
