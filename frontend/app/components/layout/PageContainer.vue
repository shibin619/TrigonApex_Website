<script setup lang="ts">
// Max-width + horizontal gutter wrapper. Use inside a SectionContainer to
// constrain width; omit it for a full-bleed/edge-to-edge section.
withDefaults(defineProps<{ as?: string }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="mx-auto w-full max-w-(--container-max) px-4 sm:px-6 lg:px-8">
    <slot />
  </component>
</template>
