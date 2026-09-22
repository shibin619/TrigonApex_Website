<script setup lang="ts">
import { siteConfig } from '~/content/site.config'
import { getCta } from '~/content/ctas'

const year = new Date().getFullYear()
const primaryCta = computed(() => getCta(siteConfig.primaryCta))

// Deep navy is a deliberate contrast surface (docs/HOMEPAGE_SPEC.md §2.1),
// not part of Nuxt UI's light/dark color-mode system — so this section
// uses explicit light-toned text utilities (white / slate-200 / brand-200,
// all WCAG-validated against navy-950 in tokens.css) instead of the
// semantic text-default/text-muted tokens, which assume a light
// background and would render unreadable here.
</script>

<template>
  <footer class="bg-navy-950 text-white">
    <SectionContainer as="div" spacing="compact">
      <PageContainer as="div">
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p class="text-h4 font-semibold uppercase tracking-wide text-white">
              {{ siteConfig.brandName }}
            </p>
            <p class="mt-2 max-w-sm text-body-sm text-slate-200">
              {{ siteConfig.tagline }}
            </p>
            <AppButton
              v-if="primaryCta"
              variant="primary"
              :to="primaryCta.to"
              class="mt-6"
            >
              {{ primaryCta.label }}
            </AppButton>
          </div>

          <div v-for="column in siteConfig.navigation.footerColumns" :key="column.title">
            <p class="text-body-sm font-semibold uppercase tracking-wide text-white">
              {{ column.title }}
            </p>
            <ul class="mt-4 space-y-3">
              <li v-for="link in column.links" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="motion-safe:transition-colors motion-safe:duration-(--duration-fast) text-body-sm text-slate-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 border-t border-navy-800 pt-6">
          <p class="text-body-sm text-slate-200">
            {{ siteConfig.companyName }} &copy; {{ year }}
          </p>
        </div>
      </PageContainer>
    </SectionContainer>
  </footer>
</template>
