<script setup lang="ts">
import { siteConfig } from '~/content/site.config'
import { getCta } from '~/content/ctas'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const primaryCta = computed(() => getCta(siteConfig.primaryCta))
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
            class="block px-4 py-3 text-body text-default focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
            active-class="text-brand-500 font-medium"
            @click="emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Talk to Us must stay reachable on mobile without a separate,
         overcrowded header control — it lives inside the same menu. -->
    <div class="border-t border-default p-4">
      <AppButton
        v-if="primaryCta"
        variant="primary"
        :to="primaryCta.to"
        class="w-full justify-center"
        @click="emit('close')"
      >
        {{ primaryCta.label }}
      </AppButton>
    </div>
  </div>
</template>
