<script setup lang="ts">
import { caseStudies } from '~/content/case-studies'
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Case Studies index — view-all-case-studies in ctas.ts has pointed at
// /case-studies since it was written (and the homepage's CaseStudies.vue
// section already links each card to /case-studies/:slug), but the index
// and detail pages never existed. Reuses that section's own heading/
// subtext and its industry-illustration-on-light-panel visual device for
// continuity, rather than inventing new marketing copy or a new visual.
useSeo({
  title: 'Case Studies | Trigon Apex Technologies',
  description: 'A look at the kind of work Trigon Apex takes on — real projects, described honestly.',
  canonical: 'https://trigonapex.in/case-studies',
  og: {
    title: 'Case Studies | Trigon Apex Technologies',
    description: 'A look at the kind of work Trigon Apex takes on — real projects, described honestly.',
    image: null
  },
  twitter: {
    title: 'Case Studies | Trigon Apex Technologies',
    description: 'A look at the kind of work Trigon Apex takes on — real projects, described honestly.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'CollectionPage'
})

function industryName(industryId: string) {
  return industries.find((industry) => industry.id === industryId)?.name ?? industryId
}

const talkToUs = getCta('talk-to-us')
const glowColors = ['var(--color-brand-500)', 'var(--color-accent-ice-400)', 'var(--color-accent-green-500)']

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const rowsRef = useTemplateRef<HTMLDivElement>('rowsRef')
useFadeIn(contentRef)
useStaggerReveal(rowsRef, ':scope > article', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="case-studies-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Selected Work
          </span>
          <h1 id="case-studies-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            Real business problems. Real solutions.
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            A look at the kind of work Trigon Apex takes on &mdash; real
            projects, described honestly.
          </p>
        </div>

        <div ref="rowsRef" class="mt-14 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-3">
          <article v-for="(caseStudy, index) in caseStudies" :key="caseStudy.id" class="group">
            <NuxtLink :to="`/case-studies/${caseStudy.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <div class="relative aspect-[4/3] overflow-hidden rounded-(--radius-lg) bg-navy-950 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_48px_-16px_rgba(16,19,50,0.55)]">
                <span
                  class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-0 blur-3xl motion-safe:transition-opacity motion-safe:duration-(--duration-slow) group-hover:opacity-30"
                  :style="{ backgroundColor: glowColors[index % glowColors.length] }"
                  aria-hidden="true"
                />
                <div class="absolute inset-5 flex items-center justify-center overflow-hidden rounded-(--radius-md) bg-slate-50 sm:inset-6">
                  <div class="absolute inset-0 opacity-70" :style="{ backgroundImage: `radial-gradient(circle at 75% 15%, ${glowColors[index % glowColors.length]}, transparent 60%)`, opacity: 0.12 }" aria-hidden="true" />
                  <img
                    :src="`/images/industry-${caseStudy.industry}.webp`"
                    :alt="`Illustration representing the ${industryName(caseStudy.industry)} industry`"
                    loading="lazy"
                    class="relative h-[85%] w-auto object-contain motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-105"
                  >
                </div>
                <span class="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy-950">
                  {{ industryName(caseStudy.industry) }}
                </span>
              </div>

              <h2 class="mt-4 text-h4 font-semibold tracking-tight text-highlighted group-hover:text-brand-500">
                {{ caseStudy.title }}
              </h2>
              <p class="mt-2 text-body-sm text-default">
                {{ caseStudy.businessChallenge }}
              </p>
              <span class="mt-3 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-500">
                Read Case Study
                <span aria-hidden="true" class="motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </NuxtLink>
          </article>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="case-studies-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="case-studies-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Want to be the next one?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Tell us about the business, and we&rsquo;ll help you figure out
          what to build.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
