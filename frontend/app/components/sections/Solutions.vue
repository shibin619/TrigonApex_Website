<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// A clean icon-grid pattern (icon, title, description, Learn More) per
// the corporate/MNC reference direction — the earlier editorial-block
// treatment (oversized numeral + a large flow diagram as the visual
// anchor) is intentionally replaced; the section keeps its scroll-target
// ids (`solution-{id}`) since BusinessProblemSelector's
// useScrollHighlight() still jumps to them.
const exploreSolutions = getCta('explore-solutions')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(contentRef)
useStaggerReveal(gridRef, 'article')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            What We Do
          </span>
          <h2 id="solutions-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            End-to-end solutions for real business impact.
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Each problem points to a type of software solution — built
            around how your business actually works, not a
            one-size-fits-all product.
          </p>
        </div>

        <div ref="gridRef" class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-5">
          <article
            v-for="solution in solutions"
            :id="`solution-${solution.id}`"
            :key="solution.id"
            class="scroll-mt-24 rounded-(--radius-lg) border border-default p-6 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-(--duration-fast) hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg) bg-brand-50 text-brand-500" aria-hidden="true">
              <span class="h-5 w-5">
                <SolutionIcon :id="solution.id" />
              </span>
            </span>
            <h3 class="mt-4 text-h4 font-semibold tracking-tight text-highlighted">
              {{ solution.title }}
            </h3>
            <p class="mt-2 text-body-sm text-default">
              {{ solution.shortDescription }}
            </p>
            <AppButton variant="text" :to="`/solutions/${solution.slug}`" class="mt-3 px-0">
              Learn more about {{ solution.title }}
            </AppButton>
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
