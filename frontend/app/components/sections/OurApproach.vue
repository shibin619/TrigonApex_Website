<script setup lang="ts">
// One composition, not two stacked blocks: the belief statement and the
// process it produces now sit side by side in a single split layout
// (quote on one side, a vertical connected timeline on the other)
// instead of a full-width statement followed by a divider and a
// separate full-width infographic row underneath. Previous attempts
// (a ribbon-behind-circles row, then a boxed numbered-infographic row)
// each lived in their own horizontal band below the quote, which read
// as two different designs glued together rather than one section.
//
// Reuses the exact, already-established wording from the "Why Trigon
// Apex" principles (components/sections/WhyTrigonApex.vue) for the
// belief statement — this is literally the "Business-first thinking"
// principle.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
  dotClass: string
  textClass: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', dotClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]', textClass: 'text-brand-300' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', dotClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]', textClass: 'text-accent-ice-400' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', dotClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_8px_16px_-6px_rgba(66,148,110,0.5)]', textClass: 'text-accent-green-500' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', dotClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]', textClass: 'text-brand-300' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', dotClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]', textClass: 'text-accent-ice-400' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useFadeIn(contentRef)
useStaggerReveal(stepsRef, 'li', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="our-approach-heading" class="relative overflow-hidden bg-navy-950">
    <div class="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute top-0 -right-16 h-64 w-64 rounded-full bg-accent-green-600/20 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute right-1/3 bottom-0 h-56 w-56 rounded-full bg-accent-ice-600/15 blur-3xl" aria-hidden="true" />
    <PageContainer as="div" class="relative">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div ref="contentRef">
          <svg viewBox="0 0 40 24" class="h-7 w-12 text-brand-300/60" fill="currentColor" aria-hidden="true">
            <path d="M4 24c-2.2 0-4-1.8-4-4V8c0-4.4 3.6-8 8-8h2v4H8C5.8 4 4 5.8 4 8v2h4c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4H4zm18 0c-2.2 0-4-1.8-4-4V8c0-4.4 3.6-8 8-8h2v4h-2c-2.2 0-4 1.8-4 4v2h4c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-4z" />
          </svg>
          <h2 id="our-approach-heading" class="mt-2 text-h1 font-medium tracking-tight text-white italic">
            We start with how the business works,
            <span class="not-italic font-semibold text-brand-200">not with a technology stack.</span>
          </h2>
          <p class="mt-6 max-w-md text-body-lg text-slate-300">
            Systems built around actual operations, not forced into a
            generic template.
          </p>
          <p class="mt-5 text-caption font-semibold tracking-widest text-brand-200/80 uppercase">
            &mdash; Our Approach
          </p>
        </div>

        <div>
          <p class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
            How We Work
          </p>
          <h3 class="mt-3 text-h3 font-semibold tracking-tight text-white">
            From Business Problem to Working Software
          </h3>

          <ol ref="stepsRef" class="mt-10">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="group relative flex gap-5"
            >
              <div class="flex flex-col items-center">
                <span
                  class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
                  :class="step.dotClass"
                >
                  <span class="h-5 w-5" aria-hidden="true">
                    <PrincipleIcon :id="step.icon" />
                  </span>
                </span>
                <span
                  v-if="index < steps.length - 1"
                  class="mt-2 w-0.5 flex-1 bg-white/15"
                  aria-hidden="true"
                />
              </div>
              <div class="pb-10">
                <p class="text-caption font-bold tracking-widest" :class="step.textClass">
                  STEP 0{{ index + 1 }}
                </p>
                <h4 class="mt-1 text-h4 font-semibold tracking-tight text-white">
                  {{ step.title }}
                </h4>
                <p class="mt-1 text-body-sm text-slate-300">
                  {{ step.description }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
