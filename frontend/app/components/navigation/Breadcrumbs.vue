<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 text-body-sm text-muted">
      <li v-for="(item, index) in items" :key="item.label" class="flex items-center gap-2">
        <NuxtLink
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="hover:text-default"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined">
          {{ item.label }}
        </span>
        <span v-if="index !== items.length - 1" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>
