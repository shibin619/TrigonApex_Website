<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Solutions index — the nav's "Solutions" link has pointed at /solutions
// since site.config.ts was written, but the page itself never existed
// (the homepage Solutions section was the only place this content
// rendered). Reuses that section's own established heading/subtext
// verbatim for continuity between the homepage teaser and this, its
// actual destination, rather than inventing new marketing copy.
useSeo({
  title: 'Solutions | Trigon Apex Technologies',
  description: 'Each problem points to a type of software solution — built around how your business actually works, not a one-size-fits-all product.',
  canonical: 'https://trigonapex.in/solutions',
  og: {
    title: 'Solutions | Trigon Apex Technologies',
    description: 'Each problem points to a type of software solution — built around how your business actually works, not a one-size-fits-all product.',
    image: null
  },
  twitter: {
    title: 'Solutions | Trigon Apex Technologies',
    description: 'Each problem points to a type of software solution — built around how your business actually works, not a one-size-fits-all product.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'CollectionPage'
})

const talkToUs = getCta('talk-to-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(contentRef)
useStaggerReveal(gridRef, ':scope > a')

// Icon chip cycles the same brand/ice/green rotation used throughout the
// homepage, not a new palette.
const chipClasses = [
  'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]',
  'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]',
  'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]'
]
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            What We Do
          </span>
          <h1 id="solutions-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            End-to-end solutions for real business impact.
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            Each problem points to a type of software solution &mdash;
            built around how your business actually works, not a
            one-size-fits-all product.
          </p>
        </div>

        <div ref="gridRef" class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          <NuxtLink
            v-for="(solution, index) in solutions"
            :key="solution.id"
            :to="`/solutions/${solution.slug}`"
            class="group flex flex-col rounded-(--radius-xl) border border-default bg-default p-6 shadow-sm motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-[0_28px_48px_-18px_rgba(16,19,50,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-(--radius-lg) text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
              :class="chipClasses[index % chipClasses.length]"
              aria-hidden="true"
            >
              <span class="h-6 w-6">
                <SolutionIcon :id="solution.id" />
              </span>
            </span>
            <h2 class="mt-5 text-h4 font-semibold tracking-tight text-highlighted group-hover:text-brand-500">
              {{ solution.title }}
            </h2>
            <p class="mt-2 text-body text-default">
              {{ solution.shortDescription }}
            </p>
            <span class="mt-auto inline-flex items-center gap-1.5 pt-5 text-body-sm font-medium text-brand-500">
              Learn more
              <span aria-hidden="true" class="motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="solutions-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="solutions-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Not sure which solution fits?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Tell us about the business, and we&rsquo;ll help you figure out
          the right starting point.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
