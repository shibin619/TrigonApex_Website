<script setup lang="ts">
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Industries index — the nav's "Industries" link has pointed at
// /industries since site.config.ts was written, but the page itself
// never existed (the homepage Industries section was the only place
// this content rendered). Reuses that section's own heading/subtext and
// the same per-industry illustrations for continuity with the homepage
// teaser, rather than inventing new marketing copy.
useSeo({
  title: 'Industries | Trigon Apex Technologies',
  description: 'Every business runs differently. Our software is built around how your industry actually works.',
  canonical: 'https://trigonapex.in/industries',
  og: {
    title: 'Industries | Trigon Apex Technologies',
    description: 'Every business runs differently. Our software is built around how your industry actually works.',
    image: null
  },
  twitter: {
    title: 'Industries | Trigon Apex Technologies',
    description: 'Every business runs differently. Our software is built around how your industry actually works.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'CollectionPage'
})

const talkToUs = getCta('talk-to-us')

const panelStyles = [
  { bg: 'bg-brand-50', glow: 'bg-brand-300/35' },
  { bg: 'bg-accent-ice-400/10', glow: 'bg-accent-ice-400/35' },
  { bg: 'bg-accent-green-500/10', glow: 'bg-accent-green-500/35' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(contentRef)
useStaggerReveal(gridRef, ':scope > a')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="industries-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Industries We Serve
          </span>
          <h1 id="industries-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            Different businesses. A common goal &mdash; growth.
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            Every business runs differently. Our software is built around
            how your industry actually works.
          </p>
        </div>

        <div ref="gridRef" class="mt-14 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-4">
          <NuxtLink
            v-for="(industry, index) in industries"
            :key="industry.id"
            :to="`/industries/${industry.slug}`"
            class="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div
              class="relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-(--radius-lg) shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) group-hover:-translate-y-1.5"
              :class="panelStyles[index % panelStyles.length]!.bg"
            >
              <span
                class="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-0 blur-2xl motion-safe:transition-opacity motion-safe:duration-(--duration-slow) group-hover:opacity-100"
                :class="panelStyles[index % panelStyles.length]!.glow"
                aria-hidden="true"
              />
              <img
                :src="`/images/industry-${industry.id}.webp`"
                :alt="`Illustration representing the ${industry.name} industry`"
                loading="lazy"
                class="relative h-[88%] w-auto object-contain motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-105"
              >
            </div>
            <p class="mt-3 text-body font-semibold text-highlighted group-hover:text-brand-500">
              {{ industry.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="industries-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="industries-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Don&rsquo;t see your industry?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          We build around how a business works, not a fixed list of
          industries &mdash; tell us about yours.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
