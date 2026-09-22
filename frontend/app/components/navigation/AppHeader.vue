<script setup lang="ts">
import { siteConfig } from '~/content/site.config'
import { getCta } from '~/content/ctas'

const mobileMenuOpen = ref(false)
const primaryCta = computed(() => getCta(siteConfig.primaryCta))
const menuToggle = useTemplateRef<HTMLButtonElement>('menuToggle')

function closeMenu() {
  mobileMenuOpen.value = false
}

// Escape closes the mobile menu and returns focus to the toggle button —
// standard disclosure-widget keyboard behavior (WAI-ARIA APG).
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    closeMenu()
    menuToggle.value?.focus()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default">
    <PageContainer as="div" class="flex items-center justify-between py-4">
      <NuxtLink
        to="/"
        class="text-h4 font-semibold uppercase tracking-wide text-highlighted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {{ siteConfig.brandName }}
      </NuxtLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-8">
          <li v-for="item in siteConfig.navigation.primary" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="motion-safe:transition-colors motion-safe:duration-(--duration-fast) border-b-2 border-transparent pb-1 text-body text-default hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              active-class="border-brand-500 text-brand-500 font-medium"
            >
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
        ref="menuToggle"
        type="button"
        class="motion-safe:transition-colors md:hidden"
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

    <MobileNav :open="mobileMenuOpen" @close="closeMenu" />
  </header>
</template>
