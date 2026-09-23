<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Large editorial blocks, not numbered rows with a small icon in a box.
// Each solution's visual is a labeled three-stage flow (the same
// business-facing terms used across the site, from the given brief) —
// large enough to be the section's actual visual anchor, not a
// decoration next to the text.
const exploreSolutions = getCta('explore-solutions')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Solutions
          </span>
          <h2 id="solutions-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            How We Solve It
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Each problem above points to a type of software solution &mdash;
            built around how your business actually works, not a
            one-size-fits-all product.
          </p>
        </div>

        <div class="mt-12 md:mt-16">
          <article
            v-for="(solution, index) in solutions"
            :id="`solution-${solution.id}`"
            :key="solution.id"
            class="scroll-mt-24 border-t border-default py-12 last:border-b md:py-16"
          >
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div class="lg:col-span-5">
                <span class="block text-[3.25rem] leading-none font-bold text-brand-100" aria-hidden="true">
                  0{{ index + 1 }}
                </span>
                <h3 class="mt-2 text-h3 font-semibold tracking-tight text-highlighted">
                  {{ solution.title }}
                </h3>
                <p class="mt-3 max-w-sm text-body text-default">
                  {{ solution.shortDescription }}
                </p>
                <p class="mt-3 text-body-sm font-medium text-brand-500">
                  &rarr; Addresses: {{ solution.businessProblem }}
                </p>
                <AppButton variant="text" :to="`/solutions/${solution.slug}`" class="mt-4 px-0">
                  Learn more about {{ solution.title }}
                </AppButton>
              </div>

              <!-- The conceptual flow is the section's real visual —
                   large, labeled, and specific to this solution, not a
                   small icon standing in for it. -->
              <div class="lg:col-span-7">
                <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                  <div
                    v-for="(stage, stageIndex) in solution.flow"
                    :key="stage"
                    class="contents sm:flex sm:flex-1 sm:items-center sm:gap-4"
                  >
                    <div
                      class="flex-1 rounded-(--radius-lg) border px-5 py-6 text-center"
                      :class="stageIndex === solution.flow.length - 1
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-default bg-default text-highlighted'"
                    >
                      <span class="text-body font-semibold">{{ stage }}</span>
                    </div>
                    <span
                      v-if="stageIndex < solution.flow.length - 1"
                      class="self-center text-muted"
                      aria-hidden="true"
                    >
                      <span class="block text-center sm:hidden">&darr;</span>
                      <span class="hidden sm:block">&rarr;</span>
                    </span>
                  </div>
                </div>
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
