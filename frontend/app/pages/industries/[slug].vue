<script setup lang="ts">
import { industries } from '~/content/industries'
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

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
})

const talkToUs = getCta('talk-to-us')

// businessChallenges/analyticsOpportunities/solutions/products ship empty
// for every industry (see content/industries.ts's own docstring — no
// confirmed copy or mapping exists yet), so those sections are skipped
// rather than rendered empty. relatedSolutions resolves Solution.id
// references to their titles, same reference-not-embed pattern as
// solutions.ts's own relatedIndustries.
const relatedSolutions = computed(() =>
  solutions.filter((solution) => industry!.solutions.includes(solution.id))
)

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
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

          <ul v-if="industry.businessChallenges.length" class="mt-10 space-y-4">
            <li v-for="challenge in industry.businessChallenges" :key="challenge" class="flex items-start gap-3">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              <span class="text-body text-default">{{ challenge }}</span>
            </li>
          </ul>

          <div v-if="relatedSolutions.length" class="mt-10">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">Related Solutions</span>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="solution in relatedSolutions" :key="solution.id">
                <NuxtLink :to="`/solutions/${solution.slug}`" class="rounded-full border border-default px-3 py-1 text-body-sm text-default hover:border-brand-300 hover:text-brand-500">
                  {{ solution.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="relative mx-auto flex aspect-[4/3] w-full max-w-sm items-end justify-center overflow-hidden rounded-(--radius-lg) bg-brand-50 shadow-sm">
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
