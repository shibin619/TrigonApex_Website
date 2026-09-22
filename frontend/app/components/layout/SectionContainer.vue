<script setup lang="ts">
// Vertical rhythm wrapper for page sections. Nest a PageContainer inside
// for constrained width, or leave content full-width for edge-to-edge
// sections (e.g. a full-bleed visual).
withDefaults(defineProps<{
  as?: string
  spacing?: 'default' | 'compact' | 'none'
}>(), {
  as: 'section',
  spacing: 'default'
})

const spacingClasses: Record<'default' | 'compact' | 'none', string> = {
  default: 'py-16 sm:py-24',
  compact: 'py-8 sm:py-12',
  none: ''
}
</script>

<template>
  <component :is="as" :class="spacingClasses[spacing]">
    <slot />
  </component>
</template>
