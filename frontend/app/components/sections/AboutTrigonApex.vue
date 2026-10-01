<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// A short company intro + three "quick facts" — but every number here is
// a real, verifiable count of this site's own published content (how
// many solutions/industries/products exist), never an invented business
// metric like years of experience, clients served, or retention rate.
// Per docs/CONTENT_ARCHITECTURE.md §15: no metric without verified: true.
const facts = [
  { value: solutions.length, label: 'Core Solutions', icon: 'layers' as const },
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
      <div ref="contentRef" class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
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
          <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-4 px-0">
            {{ learnAboutUs.label }}
          </AppButton>
        </div>

        <div class="grid grid-cols-3 gap-4 lg:col-span-5 lg:gap-5">
          <div v-for="fact in facts" :key="fact.label" class="rounded-(--radius-lg) border border-default bg-elevated p-5">
            <span class="flex h-9 w-9 items-center justify-center rounded-(--radius-md) bg-brand-50 text-brand-500" aria-hidden="true">
              <svg v-if="fact.icon === 'layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 3l9 5-9 5-9-5 9-5Z" /><path d="M3 13l9 5 9-5" /></svg>
              <svg v-else-if="fact.icon === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M21 8l-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
            </span>
            <p class="mt-3 text-h3 font-semibold tracking-tight text-highlighted">{{ fact.value }}</p>
            <p class="text-caption text-muted">{{ fact.label }}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
