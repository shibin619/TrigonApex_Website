<script setup lang="ts">
// Content + visual two-column pattern (e.g. copy on one side, a
// screenshot/illustration on the other). Stacks on mobile, sits
// side-by-side from `lg` up. `reverse` flips which side the visual is on
// without duplicating markup per usage.
withDefaults(defineProps<{ reverse?: boolean }>(), { reverse: false })
</script>

<template>
  <div
    class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
    :class="reverse ? 'lg:[&>*:first-child]:order-2' : ''"
  >
    <div>
      <slot name="content" />
    </div>
    <div>
      <slot name="visual" />
    </div>
  </div>
</template>
