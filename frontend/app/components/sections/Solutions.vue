<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Editorial, numbered list rather than a card grid — the Problem Selector
// (Stage 8E) already moved away from five generic boxes, and a second
// identical grid immediately below it would read as a template "Services"
// section. Rows alternate text/visual sides for rhythm, but stay in one
// consistent structure (icon, index, title, description, connection line,
// link) — hierarchy comes from layout, not inconsistent card treatments,
// per docs/HOMEPAGE_SPEC.md §24 principle 12.
const exploreSolutions = getCta('explore-solutions')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <h2 id="solutions-heading" class="text-h2 font-semibold tracking-tight text-highlighted">
            How We Solve It
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Each problem above points to a type of software solution &mdash;
            built around how your business actually works, not a
            one-size-fits-all product.
          </p>
        </div>

        <div class="mt-12 divide-y divide-default border-y border-default md:mt-16">
          <article
            v-for="(solution, index) in solutions"
            :id="`solution-${solution.id}`"
            :key="solution.id"
            class="scroll-mt-24 py-10 md:py-14"
          >
            <div
              class="flex flex-col gap-6 md:flex-row md:items-center md:gap-16"
              :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
            >
              <div class="flex items-start gap-4 md:block md:flex-1">
                <div class="h-10 w-10 shrink-0 text-brand-500 md:hidden">
                  <SolutionIcon :id="solution.id" />
                </div>

                <div>
                  <span class="block text-caption font-medium tracking-wide text-muted uppercase">
                    Solution 0{{ index + 1 }}
                  </span>
                  <h3 class="mt-2 text-h3 font-semibold tracking-tight text-highlighted">
                    {{ solution.title }}
                  </h3>
                  <p class="mt-3 max-w-lg text-body text-default">
                    {{ solution.shortDescription }}
                  </p>
                  <p class="mt-3 text-body-sm font-medium text-brand-500">
                    &rarr; Addresses: {{ solution.businessProblem }}
                  </p>
                  <AppButton variant="text" :to="`/solutions/${solution.slug}`" class="mt-4 px-0">
                    Learn more about {{ solution.title }}
                  </AppButton>
                </div>
              </div>

              <div class="hidden shrink-0 items-center justify-center text-brand-500 md:flex md:h-28 md:w-28">
                <SolutionIcon :id="solution.id" />
              </div>
            </div>
          </article>
        </div>

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="exploreSolutions" variant="outline" :to="exploreSolutions.to">
            {{ exploreSolutions.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
