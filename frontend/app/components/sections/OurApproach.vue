<script setup lang="ts">
// A dark contrast band stating the company's approach, then showing the
// concrete process that approach produces — merged from two previously
// separate sections ("Our Approach" belief statement and the standalone
// "How We Work" process timeline, formerly near the bottom of the page)
// since they were saying the same thing at two different altitudes
// (why, then how) while sitting far apart on the page. One section now
// carries both: the philosophy, then the five steps it leads to.
//
// Reuses the exact, already-established wording from the "Why Trigon
// Apex" principles (components/sections/WhyTrigonApex.vue) for the
// belief statement — this is literally the "Business-first thinking"
// principle, so it reuses that same icon/badge treatment (gradient chip
// + the 'target' mark) rather than being bare text.
interface ProcessStep {
  title: string
  description: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.' },
  { title: 'Define', description: 'Identify the right solution and system structure.' },
  { title: 'Build', description: 'Develop and integrate the required software.' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useFadeIn(contentRef)
useStaggerReveal(stepsRef, 'li', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="our-approach-heading" class="relative overflow-hidden bg-navy-950">
    <div class="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" aria-hidden="true" />
    <PageContainer as="div" class="relative">
      <div ref="contentRef" class="max-w-3xl">
        <span class="flex h-12 w-12 items-center justify-center rounded-(--radius-lg) bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]">
          <span class="h-6 w-6" aria-hidden="true">
            <PrincipleIcon id="target" />
          </span>
        </span>
        <span class="mt-5 block text-caption font-semibold tracking-widest text-brand-200 uppercase">
          Our Approach
        </span>
        <h2 id="our-approach-heading" class="mt-3 text-h2 font-semibold tracking-tight text-white">
          We start with how the business works, not with a
          <span class="text-brand-200">technology stack</span>.
        </h2>
        <p class="mt-4 max-w-xl text-body-lg text-slate-300">
          Systems built around actual operations, not forced into a
          generic template.
        </p>
      </div>

      <div class="relative mt-14 border-t border-white/10 pt-14 md:mt-16 md:pt-16">
        <p class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
          How We Work
        </p>
        <h3 class="mt-3 text-h3 font-semibold tracking-tight text-white">
          From Business Problem to Working Software
        </h3>

        <ol ref="stepsRef" class="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:gap-6">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="relative flex-1 border-l-2 border-white/15 pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6"
          >
            <span
              class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-400 md:left-0 md:-top-[9px]"
              aria-hidden="true"
            />
            <span class="text-body-sm font-semibold tabular-nums text-brand-200">0{{ index + 1 }}</span>
            <h4 class="mt-1 text-h4 font-semibold tracking-tight text-white">
              {{ step.title }}
            </h4>
            <p class="mt-2 text-body-sm text-slate-300">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
