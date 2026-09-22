<script setup lang="ts">
import { siteConfig } from '~/content/site.config'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div
    v-if="open"
    id="mobile-nav"
    class="border-t border-default md:hidden"
  >
    <nav aria-label="Mobile">
      <ul class="flex flex-col divide-y divide-default">
        <li v-for="item in siteConfig.navigation.primary" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block px-4 py-3 text-body"
            @click="emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
