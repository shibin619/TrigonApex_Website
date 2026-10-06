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
  badgeClass: string
}

// Cycling the same three brand/ice/green gradient families used for the
// numbered badges elsewhere on the page (About's stat badges, Solutions'
// icon chips) — a plain dot + small number read as a bare, unfinished
// list next to the bold statement above it, so the step marker needed
// the same visual weight as everything else here.
const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', badgeClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Define', description: 'Identify the right solution and system structure.', badgeClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]' },
  { title: 'Build', description: 'Develop and integrate the required software.', badgeClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', badgeClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', badgeClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]' }
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

        <ol ref="stepsRef" class="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:gap-6">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="group relative flex-1"
          >
            <span
              class="flex h-14 w-14 items-center justify-center rounded-full text-h4 font-bold text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
              :class="step.badgeClass"
            >
              0{{ index + 1 }}
            </span>
            <span
              v-if="index < steps.length - 1"
              class="pointer-events-none absolute top-7 left-14 hidden h-0.5 w-[calc(100%-3.5rem)] bg-white/15 md:block"
              aria-hidden="true"
            />
            <h4 class="mt-5 text-h4 font-semibold tracking-tight text-white">
              {{ step.title }}
            </h4>
            <p class="mt-2 max-w-[14rem] text-body-sm text-slate-300">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
