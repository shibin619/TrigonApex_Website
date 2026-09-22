<script setup lang="ts">
// Screen-reader-only text — visually hidden but announced by assistive
// tech. Use for icon-only buttons, extra context on links, etc.
withDefaults(defineProps<{ as?: string }>(), { as: 'span' })
</script>

<template>
  <component :is="as" class="sr-only">
    <slot />
  </component>
</template>
