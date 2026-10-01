<script setup lang="ts">
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Illustrated photo-card rhythm (a colored panel + large icon per
// industry, in a horizontally scrollable row) rather than a typographic
// directory list — no real industry photography exists, so each card
// uses the same abstract-panel-with-icon treatment already established
// in Case Studies, rotating through the same three accent colors.
const viewAllIndustries = getCta('view-all-industries')

const panelStyles = [
  { bg: 'bg-brand-50', icon: 'text-brand-500', dot: 'bg-brand-300' },
  { bg: 'bg-accent-ice-400/10', icon: 'text-accent-ice-600', dot: 'bg-accent-ice-400' },
  { bg: 'bg-accent-green-500/10', icon: 'text-accent-green-700', dot: 'bg-accent-green-500' }
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

        <div ref="trackRef" class="mt-10 flex gap-5 overflow-x-auto pb-2 md:mt-12" style="scroll-snap-type: x mandatory;">
          <NuxtLink
            v-for="(industry, index) in industries"
            :key="industry.id"
            :to="`/industries/${industry.slug}`"
            class="group w-60 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style="scroll-snap-align: start;"
          >
            <div
              class="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-(--radius-lg)"
              :class="panelStyles[index % panelStyles.length]!.bg"
            >
              <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                <span class="absolute top-6 left-6 h-2 w-2 rounded-full opacity-40" :class="panelStyles[index % panelStyles.length]!.dot" />
                <span class="absolute right-8 bottom-8 h-14 w-14 rounded-full border opacity-20" :class="panelStyles[index % panelStyles.length]!.dot.replace('bg-', 'border-')" />
              </div>
              <span
                class="relative h-12 w-12 motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:scale-110"
                :class="panelStyles[index % panelStyles.length]!.icon"
                aria-hidden="true"
              >
                <IndustryIcon :id="industry.id" />
              </span>
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
