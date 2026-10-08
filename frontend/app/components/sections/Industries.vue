<script setup lang="ts">
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Illustrated photo-card rhythm (a colored panel + a real per-industry
// illustration, in a horizontally scrollable row) rather than a
// typographic directory list. The docs/HOMEPAGE_SPEC.md "no stock
// photography / no generic AI-illustration style" rule was explicitly
// waived for this section (the user's call, not assumed) since no real
// client photography exists. Each illustration was generated to match
// the exact brand palette and the flat-illustration style already used
// for Hero/About, then cropped to content and chroma-keyed to a
// transparent background (same pipeline as those two) so it sits on the
// panel instead of showing its own white box — images live at
// /public/images/industry-{id}.webp.
const viewAllIndustries = getCta('view-all-industries')

const panelStyles = [
  { bg: 'bg-brand-50', glow: 'bg-brand-300/35', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(73,89,179,0.4)]' },
  { bg: 'bg-accent-ice-400/10', glow: 'bg-accent-ice-400/35', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(52,152,197,0.4)]' },
  { bg: 'bg-accent-green-500/10', glow: 'bg-accent-green-500/35', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(66,148,110,0.4)]' }
]

const trackRef = useTemplateRef<HTMLDivElement>('trackRef')
function scrollTrack(direction: 1 | -1) {
  trackRef.value?.scrollBy({ left: direction * 320, behavior: 'smooth' })
}

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="industries-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
              Industries We Serve
            </span>
            <h2 id="industries-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
              Different businesses. A common goal — growth.
            </h2>
            <p class="mt-4 text-body-lg text-muted">
              Every business runs differently. Our software is built
              around how your industry actually works.
            </p>
          </div>

          <div class="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll industries left"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-default text-default motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              @click="scrollTrack(-1)"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              aria-label="Scroll industries right"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-default text-default motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              @click="scrollTrack(1)"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div ref="trackRef" class="scrollbar-hidden mt-10 flex gap-5 overflow-x-auto pb-2 md:mt-12" style="scroll-snap-type: x mandatory;">
          <NuxtLink
            v-for="(industry, index) in industries"
            :key="industry.id"
            :to="`/industries/${industry.slug}`"
            class="group w-60 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style="scroll-snap-align: start;"
          >
            <div
              class="relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-(--radius-lg) shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) group-hover:-translate-y-1.5"
              :class="[panelStyles[index % panelStyles.length]!.bg, panelStyles[index % panelStyles.length]!.shadow]"
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

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllIndustries" variant="outline" :to="viewAllIndustries.to">
            {{ viewAllIndustries.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
