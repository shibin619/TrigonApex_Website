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

// Values come from the section-rhythm tokens in assets/css/tokens.css —
// change the rhythm there, not here.
const spacingClasses: Record<'default' | 'compact' | 'none', string> = {
  default: 'py-(--space-section-y-sm) sm:py-(--space-section-y)',
  compact: 'py-(--space-section-y-compact-sm) sm:py-(--space-section-y-compact)',
  none: ''
}
</script>

<template>
  <component :is="as" :class="spacingClasses[spacing]">
    <slot />
  </component>
</template>
