<script setup lang="ts">
import { industries } from '~/content/industries'
import { solutions } from '~/content/solutions'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'
import { siteConfig } from '~/content/site.config'

const route = useRoute()
const slug = route.params.slug as string

const industry = industries.find((item) => item.slug === slug)
if (!industry) {
  throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}

useSeo({
  title: `${industry.name} | Trigon Apex Technologies`,
  description: industry.shortDescription,
  canonical: `https://trigonapex.in/industries/${industry.slug}`,
  og: {
    title: `${industry.name} | Trigon Apex Technologies`,
    description: industry.shortDescription,
    image: null
  },
  twitter: {
    title: `${industry.name} | Trigon Apex Technologies`,
    description: industry.shortDescription,
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Service'
}, {
  name: industry.name,
  description: industry.shortDescription,
  url: `https://trigonapex.in/industries/${industry.slug}`,
  provider: {
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: 'https://trigonapex.in/'
  }
})

const talkToUs = getCta('talk-to-us')

// solutions/products are id references, resolved here — reference-not-
// embed, same pattern as everywhere else. relatedProduct is singular
// (only natro-dental/manufacturing/finance/pos-retail exist, each tied to
// exactly one industry) rather than relatedProducts, since at most one
// Natro product is ever built for a given industry.
const relatedSolutions = computed(() =>
  solutions.filter((solution) => industry!.solutions.includes(solution.id))
)
const relatedProduct = computed(() =>
  products.find((product) => industry!.products.includes(product.id))
)

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const challengesRef = useTemplateRef<HTMLDivElement>('challengesRef')
const opportunitiesRef = useTemplateRef<HTMLDivElement>('opportunitiesRef')
useFadeIn(contentRef)
useStaggerReveal(challengesRef, ':scope > div', { each: true })
useStaggerReveal(opportunitiesRef, ':scope > div', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="industry-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
        <div class="max-w-2xl">
          <NuxtLink to="/industries" class="inline-flex items-center gap-1.5 text-body-sm font-medium text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-brand-500">
            <span aria-hidden="true">&larr;</span>
            All Industries
          </NuxtLink>

          <span class="mt-6 block text-caption font-semibold tracking-widest text-brand-500 uppercase">Industry</span>
          <h1 id="industry-heading" class="mt-1 text-h1 font-semibold tracking-tight text-highlighted">
            {{ industry.name }}
          </h1>
          <p class="mt-6 text-body-lg text-muted">
            {{ industry.shortDescription }}
          </p>
        </div>

        <div class="relative mx-auto flex aspect-[4/3] w-full items-end justify-center overflow-hidden rounded-(--radius-lg) bg-brand-50 shadow-sm">
          <span class="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-brand-300/35 opacity-60 blur-2xl" aria-hidden="true" />
          <img
            :src="`/images/industry-${industry.id}.webp`"
            :alt="`Illustration representing the ${industry.name} industry`"
            class="relative h-[88%] w-auto object-contain"
          >
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer v-if="industry.businessChallenges.length" as="section" spacing="compact" aria-labelledby="challenges-heading">
    <PageContainer as="div">
      <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">The Reality</span>
      <h2 id="challenges-heading" class="mt-2 text-h3 font-semibold tracking-tight text-highlighted">
        Where it gets hard
      </h2>

      <div ref="challengesRef" class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="challenge in industry.businessChallenges"
          :key="challenge"
          class="flex items-start gap-3.5 rounded-(--radius-lg) border border-default bg-default p-5"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-ice-400/10 text-accent-ice-600" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 6.5v4" />
              <circle cx="10" cy="13.5" r="0.75" fill="currentColor" stroke="none" />
              <circle cx="10" cy="10" r="7.25" />
            </svg>
          </span>
          <span class="text-body text-default">{{ challenge }}</span>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer v-if="industry.analyticsOpportunities.length" as="section" spacing="compact" aria-labelledby="opportunities-heading">
    <PageContainer as="div">
      <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">Where Software Helps</span>
      <h2 id="opportunities-heading" class="mt-2 text-h3 font-semibold tracking-tight text-highlighted">
        What a connected system changes
      </h2>

      <div ref="opportunitiesRef" class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="opportunity in industry.analyticsOpportunities"
          :key="opportunity"
          class="flex items-start gap-3.5 rounded-(--radius-lg) border border-default bg-default p-5"
        >
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-green-500/10 text-accent-green-700" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </span>
          <span class="text-body text-default">{{ opportunity }}</span>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer v-if="relatedSolutions.length || relatedProduct" as="section" spacing="compact" aria-labelledby="related-heading">
    <PageContainer as="div">
      <h2 id="related-heading" class="sr-only">
        Related solutions and products
      </h2>

      <div class="grid grid-cols-1 gap-6" :class="relatedProduct ? 'lg:grid-cols-[1fr_minmax(0,300px)]' : ''">
        <div v-if="relatedSolutions.length">
          <span class="text-caption font-semibold tracking-widest text-muted uppercase">Related Solutions</span>
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NuxtLink
              v-for="solution in relatedSolutions"
              :key="solution.id"
              :to="`/solutions/${solution.slug}`"
              class="group flex items-center gap-3 rounded-(--radius-lg) border border-default bg-default p-4 motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:border-brand-300"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-brand-50 text-brand-500" aria-hidden="true">
                <span class="h-4.5 w-4.5">
                  <SolutionIcon :id="solution.id" />
                </span>
              </span>
              <span class="flex-1 text-body-sm font-medium text-highlighted group-hover:text-brand-500">{{ solution.title }}</span>
              <span aria-hidden="true" class="text-muted motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:translate-x-0.5">&rarr;</span>
            </NuxtLink>
          </div>
        </div>

        <div v-if="relatedProduct">
          <span class="text-caption font-semibold tracking-widest text-muted uppercase">Built for This Industry</span>
          <NuxtLink
            :to="`/products/${relatedProduct.slug}`"
            class="group mt-4 flex flex-col rounded-(--radius-lg) border border-default bg-elevated/60 p-5 motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:border-brand-300"
          >
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">{{ relatedProduct.ecosystem }}</span>
            <span class="mt-1 text-h4 font-semibold tracking-tight text-highlighted group-hover:text-brand-500">{{ relatedProduct.name }}</span>
            <span class="mt-2 text-body-sm text-default">{{ relatedProduct.shortDescription }}</span>
            <span class="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-500">
              Learn more
              <span aria-hidden="true" class="motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="industry-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="industry-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Running a {{ industry.name.toLowerCase() }} business?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Let&rsquo;s talk through how software built for this industry
          would actually work for yours.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to">
            {{ talkToUs.label }}
          </AppButton>
          <NuxtLink
            to="/industries"
            class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View All Industries
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
