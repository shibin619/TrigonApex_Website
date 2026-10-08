<script setup lang="ts">
import { caseStudies } from '~/content/case-studies'
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Real project categories (Finance Management, Fabrication Business, Taxi
// Booking & Management) — no invented client names or metrics; results
// stay qualitative per docs/CONTENT_ARCHITECTURE.md §6. A 3-column dark-
// card grid (category tag + title + description over a dark panel) per
// the corporate reference's "Selected Work" pattern. The panel shows the
// matching industry's real illustration (same asset Industries.vue
// uses) rather than an invented dashboard/UI mockup — no fake product
// screenshot, no skeleton-bar placeholder UI.
function industryName(industryId: string) {
  return industries.find((industry) => industry.id === industryId)?.name ?? industryId
}

// The card visual used to be a fake "mini app window" — skeleton bars
// and chart shapes standing in for a UI that doesn't exist, which read
// as fake no matter how it was styled (same lesson as Business
// Analytics' fake chart). Each industry already has a real, custom
// illustration from the Industries section (public/images/industry-
// {id}.webp) — reusing it here is an honest visual instead of an
// invented dashboard mockup.
const glowColors = ['var(--color-brand-500)', 'var(--color-accent-ice-400)', 'var(--color-accent-green-500)']

const viewAllCaseStudies = getCta('view-all-case-studies')

const headerRef = useTemplateRef<HTMLDivElement>('headerRef')
const rowsRef = useTemplateRef<HTMLDivElement>('rowsRef')
useFadeIn(headerRef)
useStaggerReveal(rowsRef, 'article', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="case-studies-heading">
    <PageContainer as="div">
      <div>
        <div ref="headerRef" class="flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
              Selected Work
            </span>
            <h2 id="case-studies-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
              Real business problems. Real solutions.
            </h2>
            <p class="mt-4 text-body-lg text-muted">
              A look at the kind of work Trigon Apex takes on &mdash; real
              projects, described honestly.
            </p>
          </div>
        </div>

        <div ref="rowsRef" class="mt-12 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-3">
          <article v-for="(caseStudy, index) in caseStudies" :key="caseStudy.id" class="group">
            <NuxtLink :to="`/case-studies/${caseStudy.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <div class="relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-(--radius-lg) bg-navy-950 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_48px_-16px_rgba(16,19,50,0.55)]">
                <!-- The real industry illustration from the Industries
                     section, not an invented UI mockup. -->
                <span
                  class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-0 blur-3xl motion-safe:transition-opacity motion-safe:duration-(--duration-slow) group-hover:opacity-30"
                  :style="{ backgroundColor: glowColors[index % glowColors.length] }"
                  aria-hidden="true"
                />
                <div class="absolute inset-0 opacity-25" :style="{ backgroundImage: `radial-gradient(circle at 70% 20%, ${glowColors[index % glowColors.length]}, transparent 55%)` }" aria-hidden="true" />
                <img
                  :src="`/images/industry-${caseStudy.industry}.webp`"
                  :alt="`Illustration representing the ${industryName(caseStudy.industry)} industry`"
                  loading="lazy"
                  class="relative h-[82%] w-auto object-contain motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-105"
                >
                <span class="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy-950">
                  {{ industryName(caseStudy.industry) }}
                </span>
              </div>

              <h3 class="mt-4 text-h4 font-semibold tracking-tight text-highlighted group-hover:text-brand-500">
                {{ caseStudy.title }}
              </h3>
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

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllCaseStudies" variant="outline" :to="viewAllCaseStudies.to">
            {{ viewAllCaseStudies.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
