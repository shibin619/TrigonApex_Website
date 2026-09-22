<script setup lang="ts">
// Generic responsive grid. `cols` sets the column count at the `md`
// breakpoint and up; mobile always starts single-column so nothing breaks
// on small Android/iOS widths. A two-column layout is simply `:cols="2"`.
withDefaults(defineProps<{
  cols?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}>(), {
  cols: 2,
  gap: 'md'
})

const colsClasses: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4'
}

const gapClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-4',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-12'
}
</script>

<template>
  <div class="grid grid-cols-1" :class="[colsClasses[cols], gapClasses[gap]]">
    <slot />
  </div>
</template>
