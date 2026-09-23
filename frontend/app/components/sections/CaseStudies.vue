<script setup lang="ts">
import { caseStudies } from '~/content/case-studies'
import { industries } from '~/content/industries'

// Real project categories (Finance Management, Fabrication Business, Taxi
// Booking & Management) — no invented client names or metrics; results
// stay qualitative per docs/CONTENT_ARCHITECTURE.md §6. Each case study's
// visual reuses the matching Industry's own icon (already established in
// the Industries section above) rather than inventing a second visual
// language — the tie-back is the point, not decoration.
function industryName(industryId: string) {
  return industries.find((industry) => industry.id === industryId)?.name ?? industryId
}

// Rotating panel treatment so the three studies read as distinct rather
// than three copies of the same gray box — still just one accent color
// per panel, never a rainbow.
const panelStyles = [
  { bg: 'bg-brand-50', icon: 'text-brand-500', dot: 'bg-brand-300' },
  { bg: 'bg-accent-ice-400/10', icon: 'text-accent-ice-600', dot: 'bg-accent-ice-400' },
  { bg: 'bg-accent-green-500/10', icon: 'text-accent-green-700', dot: 'bg-accent-green-500' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="case-studies-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Our Work
          </span>
          <h2 id="case-studies-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            Built Around Real Business Needs
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            A look at the kind of work Trigon Apex takes on &mdash; real
            projects, described honestly.
          </p>
        </div>

        <div class="mt-12 md:mt-16">
          <article
            v-for="(caseStudy, index) in caseStudies"
            :key="caseStudy.id"
            class="border-t border-default py-12 last:border-b md:py-16"
          >
            <div
              class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12"
              :class="index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
            >
              <div class="lg:col-span-7">
                <span class="text-caption font-medium tracking-wide text-muted uppercase">
                  {{ industryName(caseStudy.industry) }}
                </span>
                <h3 class="mt-2 text-h3 font-semibold tracking-tight text-highlighted">
                  {{ caseStudy.title }}
                </h3>
                <p class="mt-4 max-w-lg text-body text-default">
                  {{ caseStudy.businessChallenge }}
                </p>
                <p class="mt-3 max-w-lg text-body text-default">
                  {{ caseStudy.solution }}
                </p>
                <ul v-if="caseStudy.results.length" class="mt-4 space-y-1.5">
                  <li
                    v-for="(result, i) in caseStudy.results"
                    :key="i"
                    class="flex gap-2 text-body-sm font-medium text-brand-500"
                  >
                    <span aria-hidden="true">&rarr;</span>
                    <span>{{ result.description }}</span>
                  </li>
                </ul>
                <AppButton variant="text" :to="`/case-studies/${caseStudy.slug}`" class="mt-4 px-0">
                  See the Story
                </AppButton>
              </div>

              <div class="lg:col-span-5">
                <div
                  class="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-(--radius-lg)"
                  :class="panelStyles[index % panelStyles.length]!.bg"
                >
                  <!-- Decorative texture only — a loose scatter of dots
                       and rings suggesting "data points", not a chart
                       claiming to represent anything real. -->
                  <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                    <span class="absolute top-8 left-8 h-2 w-2 rounded-full opacity-40" :class="panelStyles[index % panelStyles.length]!.dot" />
                    <span class="absolute top-16 right-12 h-3 w-3 rounded-full opacity-30" :class="panelStyles[index % panelStyles.length]!.dot" />
                    <span class="absolute bottom-12 left-16 h-2.5 w-2.5 rounded-full opacity-30" :class="panelStyles[index % panelStyles.length]!.dot" />
                    <span class="absolute right-10 bottom-10 h-16 w-16 rounded-full border opacity-20" :class="panelStyles[index % panelStyles.length]!.dot.replace('bg-', 'border-')" />
                    <span class="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-10" :class="panelStyles[index % panelStyles.length]!.dot.replace('bg-', 'border-')" />
                  </div>
                  <span class="relative h-16 w-16" :class="panelStyles[index % panelStyles.length]!.icon" aria-hidden="true">
                    <IndustryIcon :id="caseStudy.industry" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
