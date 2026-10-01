<script setup lang="ts">
import { caseStudies } from '~/content/case-studies'
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// Real project categories (Finance Management, Fabrication Business, Taxi
// Booking & Management) — no invented client names or metrics; results
// stay qualitative per docs/CONTENT_ARCHITECTURE.md §6. A 3-column dark-
// card grid (category tag + title + description over a dark abstract
// "product" visual) per the corporate reference's "Selected Work"
// pattern — the visual is a dark-themed dashboard-style illustration,
// never a real screenshot or stock photo.
function industryName(industryId: string) {
  return industries.find((industry) => industry.id === industryId)?.name ?? industryId
}

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
          <article v-for="caseStudy in caseStudies" :key="caseStudy.id" class="group">
            <NuxtLink :to="`/case-studies/${caseStudy.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <div class="relative aspect-[4/3] overflow-hidden rounded-(--radius-lg) bg-navy-950">
                <!-- Dark abstract "product" visual — a dashboard-style
                     illustration, not a real screenshot. -->
                <div class="absolute inset-0 opacity-40" style="background-image: radial-gradient(circle at 70% 20%, var(--color-brand-500), transparent 55%);" aria-hidden="true" />
                <div class="absolute inset-6 overflow-hidden rounded-(--radius-md) border border-white/10 bg-white/5 backdrop-blur-sm" aria-hidden="true">
                  <div class="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span class="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span class="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <span class="h-1.5 w-1.5 rounded-full bg-white/30" />
                  </div>
                  <div class="space-y-2 p-4">
                    <div class="h-2 w-2/3 rounded-full bg-white/20" />
                    <div class="h-2 w-1/2 rounded-full bg-white/10" />
                    <div class="mt-3 flex h-12 items-end gap-1">
                      <div
                        v-for="(h, i) in [40, 70, 55, 85, 60, 45]"
                        :key="i"
                        class="w-full rounded-t"
                        :class="i % 2 === 0 ? 'bg-brand-400' : 'bg-accent-ice-400'"
                        :style="{ height: `${h}%`, opacity: 0.8 }"
                      />
                    </div>
                  </div>
                </div>
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
