<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true) — restyled into a photo + floating
// stat card + short fact list, the pattern from the Techa reference video,
// instead of three plain tiles. The lead number (Core Solutions) becomes
// the floating card; the other two stay as a small icon list so nothing
// here is invented or duplicated elsewhere on the page.
const leadFact = { value: solutions.length, label: 'Core Solutions' }
const supportingFacts = [
  { value: industries.length, label: 'Industries Served', icon: 'grid' as const },
  { value: products.length, label: 'Natro Products', icon: 'box' as const }
]

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div class="relative pb-6 sm:pb-10 lg:col-span-5 lg:pb-0">
          <div class="aspect-[4/5] overflow-hidden rounded-(--radius-xl) sm:aspect-[5/4] lg:aspect-square">
            <img
              src="/images/hero-team.webp"
              alt="A team discussing business operations around a table"
              class="h-full w-full object-cover"
              width="1456"
              height="1024"
              loading="lazy"
            >
          </div>
          <div class="absolute right-4 -bottom-2 rounded-(--radius-xl) border border-default bg-default p-6 shadow-lg sm:right-8 sm:bottom-0 sm:p-7">
            <p class="text-display font-semibold tracking-tighter text-brand-500">{{ leadFact.value }}</p>
            <p class="text-body-sm font-medium text-muted">{{ leadFact.label }}</p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            A technology partner for businesses that want to grow.
          </h2>
          <p class="mt-4 max-w-xl text-body-lg text-muted">
            We combine business understanding with software expertise to
            design practical systems that help companies operate more
            efficiently, automate repetitive work, and turn their own
            data into better decisions.
          </p>

          <div class="mt-8 space-y-6 border-t border-default pt-8">
            <div v-for="fact in supportingFacts" :key="fact.label" class="flex items-center gap-4">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-lg) bg-brand-50 text-brand-500" aria-hidden="true">
                <svg v-if="fact.icon === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M21 8l-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
              </span>
              <p class="text-body font-medium text-highlighted">
                <span class="font-semibold">{{ fact.value }}</span> {{ fact.label }}
              </p>
            </div>
          </div>

          <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-8 px-0">
            {{ learnAboutUs.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
