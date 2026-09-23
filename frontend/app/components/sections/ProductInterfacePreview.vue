<script setup lang="ts">
// A small, generic "app window" mockup — the same conceptual shell for
// every product, only the label and nav items differ. Communicates "this
// is a real piece of software" without a screenshot or fabricated data;
// reuses each product's existing Product Tour nav items rather than
// inventing separate copy for this visual.
defineProps<{
  name: string
  navItems: string[]
}>()
</script>

<template>
  <div class="overflow-hidden rounded-(--radius-lg) border border-default bg-default shadow-sm">
    <div class="flex items-center gap-1.5 border-b border-default bg-elevated px-4 py-3" aria-hidden="true">
      <span class="h-2 w-2 rounded-full bg-[#f0625b]" />
      <span class="h-2 w-2 rounded-full bg-[#f2b029]" />
      <span class="h-2 w-2 rounded-full bg-accent-green-500" />
      <span class="ml-2 text-caption font-medium text-muted">{{ name }}</span>
    </div>
    <div class="flex">
      <div class="hidden w-28 shrink-0 border-r border-default p-3 sm:block" aria-hidden="true">
        <div v-for="item in navItems.slice(0, 4)" :key="item" class="truncate rounded-(--radius-sm) px-2 py-1.5 text-caption text-muted">
          {{ item }}
        </div>
      </div>
      <div class="flex-1 space-y-2 p-4" aria-hidden="true">
        <div class="flex items-center justify-between">
          <div class="h-2 w-1/2 rounded-full bg-slate-100" />
          <span class="rounded-full bg-accent-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-accent-green-700">Active</span>
        </div>
        <div class="h-2 w-3/4 rounded-full bg-slate-100" />
        <div class="mt-3 flex h-14 items-end gap-1.5">
          <div class="w-full rounded-t bg-brand-200" style="height:40%" />
          <div class="w-full rounded-t bg-accent-ice-400" style="height:70%" />
          <div class="w-full rounded-t bg-brand-300" style="height:55%" />
          <div class="w-full rounded-t bg-accent-green-500" style="height:80%" />
          <div class="w-full rounded-t bg-brand-200" style="height:35%" />
        </div>
      </div>
    </div>
  </div>
</template>
