<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Split layout (text + CTA on the left, a card grid on the right with one
// solution highlighted in solid brand color among plain bordered cards) —
// the "Why Choose Us" pattern from the Techa reference video, applied to
// our own real five solutions rather than invented service names. The
// first solution (Business Growth) is the one highlighted; which one is
// arbitrary, not a ranking claim. Scroll-target ids (`solution-{id}`) stay
// on every card since BusinessProblemSelector's useScrollHighlight() still
// jumps to them.
const exploreSolutions = getCta('explore-solutions')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(contentRef)
useStaggerReveal(gridRef, 'article')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
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
          <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to" class="mt-6">
            {{ exploreSolutions.label }}
          </AppButton>
        </div>

        <div ref="gridRef" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
          <article
            v-for="(solution, index) in solutions"
            :id="`solution-${solution.id}`"
            :key="solution.id"
            class="group scroll-mt-24 rounded-(--radius-lg) p-6 motion-safe:transition-[transform,background-color,border-color,box-shadow] motion-safe:duration-(--duration-fast) hover:-translate-y-1 hover:shadow-lg"
            :class="index === 0 ? 'bg-brand-500 hover:bg-brand-600' : 'border border-default bg-default hover:border-brand-300 hover:bg-brand-50/60'"
          >
            <span
              class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg) motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
              :class="index === 0 ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-500 group-hover:bg-brand-500 group-hover:text-white'"
              aria-hidden="true"
            >
              <span class="h-5 w-5">
                <SolutionIcon :id="solution.id" />
              </span>
            </span>
            <h3 class="mt-4 text-h4 font-semibold tracking-tight" :class="index === 0 ? 'text-white' : 'text-highlighted group-hover:text-brand-500'">
              {{ solution.title }}
            </h3>
            <p class="mt-2 text-body-sm" :class="index === 0 ? 'text-white/85' : 'text-default'">
              {{ solution.shortDescription }}
            </p>
            <!-- AppButton's text-link variant renders brand-colored text
                 via Nuxt UI regardless of class overrides (same caveat as
                 Final CTA's outline button), so the highlighted card uses
                 a plain white underlined link instead. -->
            <NuxtLink
              v-if="index === 0"
              :to="`/solutions/${solution.slug}`"
              class="mt-3 inline-block text-body-sm font-medium text-white underline underline-offset-2 motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn more about {{ solution.title }}
            </NuxtLink>
            <AppButton v-else variant="text" :to="`/solutions/${solution.slug}`" class="mt-3 px-0">
              Learn more about {{ solution.title }}
            </AppButton>
          </article>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
