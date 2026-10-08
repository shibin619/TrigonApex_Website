<script setup lang="ts">
import { solutions, getSolution } from '~/content/solutions'
import { getCta } from '~/content/ctas'

const route = useRoute()
const slug = route.params.slug as string

const solution = solutions.find((item) => item.slug === slug)
if (!solution) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found' })
}

useSeo({
  title: `${solution.title} | Trigon Apex Technologies`,
  description: solution.shortDescription,
  canonical: `https://trigonapex.in/solutions/${solution.slug}`,
  og: {
    title: `${solution.title} | Trigon Apex Technologies`,
    description: solution.shortDescription,
    image: null
  },
  twitter: {
    title: `${solution.title} | Trigon Apex Technologies`,
    description: solution.shortDescription,
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Service'
})

const talkToUs = getCta('talk-to-us')

// relatedIndustries/relatedProducts ship empty for all five solutions
// (no confirmed mapping exists yet — see solutions.ts's own docstring),
// so those sections of the page are conditionally skipped rather than
// rendered empty.
const relatedIndustries = computed(() => getSolution(solution!.id)?.relatedIndustries ?? [])
const relatedProducts = computed(() => getSolution(solution!.id)?.relatedProducts ?? [])

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solution-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-3xl">
        <NuxtLink to="/solutions" class="inline-flex items-center gap-1.5 text-body-sm font-medium text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-brand-500">
          <span aria-hidden="true">&larr;</span>
          All Solutions
        </NuxtLink>

        <div class="mt-6 flex items-center gap-4">
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-(--radius-lg) bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]" aria-hidden="true">
            <span class="h-7 w-7">
              <SolutionIcon :id="solution.id" />
            </span>
          </span>
          <div>
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">Solution</span>
            <h1 id="solution-heading" class="mt-1 text-h1 font-semibold tracking-tight text-highlighted">
              {{ solution.title }}
            </h1>
          </div>
        </div>

        <p class="mt-6 text-body-lg text-muted">
          {{ solution.longDescription }}
        </p>

        <div class="mt-8 rounded-(--radius-lg) border-l-2 border-brand-500 bg-brand-50/50 py-4 pl-5">
          <span class="text-caption font-semibold tracking-widest text-muted uppercase">The Business Problem</span>
          <p class="mt-1.5 text-h4 font-semibold tracking-tight text-highlighted">
            {{ solution.businessProblem }}
          </p>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm font-medium text-muted" aria-hidden="true">
          <template v-for="(stage, stageIndex) in solution.flow" :key="stage">
            <span>{{ stage }}</span>
            <span v-if="stageIndex < solution.flow.length - 1" class="text-muted/50">&rarr;</span>
          </template>
        </div>

        <h2 class="mt-12 text-h3 font-semibold tracking-tight text-highlighted">
          What this looks like
        </h2>
        <ul class="mt-5 space-y-4">
          <li v-for="benefit in solution.benefits" :key="benefit" class="flex items-start gap-3">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0" aria-hidden="true">
              <path d="M4 10.5l4 4 8-9" />
            </svg>
            <span class="text-body text-default">{{ benefit }}</span>
          </li>
        </ul>

        <div v-if="relatedIndustries.length || relatedProducts.length" class="mt-12 flex flex-wrap gap-10">
          <div v-if="relatedIndustries.length">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">Related Industries</span>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="industry in relatedIndustries" :key="industry">
                <NuxtLink :to="`/industries/${industry}`" class="rounded-full border border-default px-3 py-1 text-body-sm text-default hover:border-brand-300 hover:text-brand-500">
                  {{ industry }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div v-if="relatedProducts.length">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">Related Products</span>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="product in relatedProducts" :key="product">
                <NuxtLink :to="`/products/${product}`" class="rounded-full border border-default px-3 py-1 text-body-sm text-default hover:border-brand-300 hover:text-brand-500">
                  {{ product }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="solution-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="solution-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Is this the right fit for your business?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Let&rsquo;s talk through how {{ solution.title.toLowerCase() }}
          would actually work for your business.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to">
            {{ talkToUs.label }}
          </AppButton>
          <NuxtLink
            to="/solutions"
            class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View All Solutions
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
