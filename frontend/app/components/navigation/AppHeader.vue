<script setup lang="ts">
import { siteConfig } from '~/content/site.config'
import { getCta } from '~/content/ctas'

const mobileMenuOpen = ref(false)
const primaryCta = computed(() => getCta(siteConfig.primaryCta))
</script>

<template>
  <header class="border-b border-default">
    <PageContainer as="div" class="flex items-center justify-between py-4">
      <NuxtLink to="/" class="text-h4 font-semibold text-highlighted">
        {{ siteConfig.brandName }}
      </NuxtLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-6">
          <li v-for="item in siteConfig.navigation.primary" :key="item.to">
            <NuxtLink :to="item.to" class="text-body text-default hover:text-highlighted">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="hidden md:block">
        <AppButton v-if="primaryCta" variant="primary" :to="primaryCta.to">
          {{ primaryCta.label }}
        </AppButton>
      </div>

      <button
        type="button"
        class="md:hidden"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-nav"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <VisuallyHidden>{{ mobileMenuOpen ? 'Close menu' : 'Open menu' }}</VisuallyHidden>
        <!-- Hand-written inline SVGs — no icon package/network dependency. -->
        <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </PageContainer>

    <MobileNav :open="mobileMenuOpen" @close="mobileMenuOpen = false" />
  </header>
</template>
