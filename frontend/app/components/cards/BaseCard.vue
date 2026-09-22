<script setup lang="ts">
// Foundational card wrapper — the base every future typed card (solution,
// industry, product, case-study, testimonial, analytics) builds on. Holds
// no business content itself; only layout/elevation concerns.
withDefaults(defineProps<{
  variant?: 'flat' | 'bordered' | 'elevated'
}>(), {
  variant: 'bordered'
})

const variantClasses: Record<'flat' | 'bordered' | 'elevated', string> = {
  flat: '',
  bordered: 'border border-default',
  elevated: 'shadow-md'
}
</script>

<template>
  <div class="rounded-(--radius-lg) bg-default p-6" :class="variantClasses[variant]">
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
