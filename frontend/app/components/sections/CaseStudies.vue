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
                <div class="flex aspect-[4/3] items-center justify-center rounded-(--radius-lg) border border-default bg-elevated">
                  <span class="h-16 w-16 text-brand-500" aria-hidden="true">
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
