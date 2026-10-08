<script setup lang="ts">
import { caseStudies } from '~/content/case-studies'
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

const route = useRoute()
const slug = route.params.slug as string

const caseStudy = caseStudies.find((item) => item.slug === slug)
if (!caseStudy) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found' })
}

function industryName(industryId: string) {
  return industries.find((industry) => industry.id === industryId)?.name ?? industryId
}

useSeo({
  title: `${caseStudy.title} | Trigon Apex Technologies`,
  description: caseStudy.businessChallenge,
  canonical: `https://trigonapex.in/case-studies/${caseStudy.slug}`,
  og: {
    title: `${caseStudy.title} | Trigon Apex Technologies`,
    description: caseStudy.businessChallenge,
    image: null
  },
  twitter: {
    title: `${caseStudy.title} | Trigon Apex Technologies`,
    description: caseStudy.businessChallenge,
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Article'
})

const talkToUs = getCta(caseStudy.cta) ?? getCta('talk-to-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="case-study-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,360px)]">
        <div class="max-w-2xl">
          <NuxtLink to="/case-studies" class="inline-flex items-center gap-1.5 text-body-sm font-medium text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-brand-500">
            <span aria-hidden="true">&larr;</span>
            All Case Studies
          </NuxtLink>

          <span class="mt-6 block text-caption font-semibold tracking-widest text-brand-500 uppercase">{{ industryName(caseStudy.industry) }}</span>
          <h1 id="case-study-heading" class="mt-1 text-h1 font-semibold tracking-tight text-highlighted">
            {{ caseStudy.title }}
          </h1>

          <div class="mt-8 rounded-(--radius-lg) border-l-2 border-brand-500 bg-brand-50/50 py-4 pl-5">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">The Business Challenge</span>
            <p class="mt-1.5 text-h4 font-semibold tracking-tight text-highlighted">
              {{ caseStudy.businessChallenge }}
            </p>
          </div>

          <h2 class="mt-10 text-h3 font-semibold tracking-tight text-highlighted">
            The Solution
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            {{ caseStudy.solution }}
          </p>

          <h2 class="mt-10 text-h3 font-semibold tracking-tight text-highlighted">
            How It Was Built
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            {{ caseStudy.implementation }}
          </p>

          <div v-if="caseStudy.results.length" class="mt-10">
            <h2 class="text-h3 font-semibold tracking-tight text-highlighted">
              The Results
            </h2>
            <ul class="mt-5 space-y-4">
              <li v-for="result in caseStudy.results" :key="result.description" class="flex items-start gap-3">
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" />
                </svg>
                <span class="text-body text-default">{{ result.description }}</span>
              </li>
            </ul>
          </div>

          <div v-if="caseStudy.technologies.length" class="mt-10">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">Technologies</span>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="technology in caseStudy.technologies" :key="technology" class="rounded-full border border-default px-3 py-1 text-body-sm text-default">
                {{ technology }}
              </li>
            </ul>
          </div>
        </div>

        <div class="relative mx-auto flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-(--radius-lg) bg-slate-50 shadow-sm lg:sticky lg:top-24 lg:self-start">
          <img
            :src="`/images/industry-${caseStudy.industry}.webp`"
            :alt="`Illustration representing the ${industryName(caseStudy.industry)} industry`"
            class="relative h-[85%] w-auto object-contain"
          >
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="case-study-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="case-study-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Want something like this for your business?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Let&rsquo;s talk through what you actually need.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to">
            {{ talkToUs.label }}
          </AppButton>
          <NuxtLink
            to="/case-studies"
            class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View All Case Studies
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
