<script setup lang="ts">
// Editorial pull-quote (the belief statement, set large and italic like
// an actual quotation rather than a standard eyebrow/heading/paragraph
// block) leading into the process it produces, shown as a connected
// ribbon of numbered circles — a single gradient line running behind
// icon circles, each ringed in the section's own background color so
// the line reads as passing behind it, per the reference process-
// infographic layouts (a continuous path + circles on top, label below
// each one) rather than a plain grid of cards.
//
// Reuses the exact, already-established wording from the "Why Trigon
// Apex" principles (components/sections/WhyTrigonApex.vue) for the
// belief statement — this is literally the "Business-first thinking"
// principle.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
  badgeClass: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', badgeClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', badgeClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', badgeClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', badgeClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', badgeClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]' }
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
      <div ref="contentRef" class="max-w-3xl">
        <svg viewBox="0 0 40 24" class="h-7 w-12 text-brand-300/60" fill="currentColor" aria-hidden="true">
          <path d="M4 24c-2.2 0-4-1.8-4-4V8c0-4.4 3.6-8 8-8h2v4H8C5.8 4 4 5.8 4 8v2h4c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4H4zm18 0c-2.2 0-4-1.8-4-4V8c0-4.4 3.6-8 8-8h2v4h-2c-2.2 0-4 1.8-4 4v2h4c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-4z" />
        </svg>
        <h2 id="our-approach-heading" class="mt-2 text-h1 font-medium tracking-tight text-white italic md:text-display">
          We start with how the business works,
          <span class="not-italic font-semibold text-brand-200">not with a technology stack.</span>
        </h2>
        <p class="mt-6 max-w-xl text-body-lg text-slate-300">
          Systems built around actual operations, not forced into a
          generic template.
        </p>
        <p class="mt-5 text-caption font-semibold tracking-widest text-brand-200/80 uppercase">
          &mdash; Our Approach
        </p>
      </div>

      <div class="relative mt-16 border-t border-white/10 pt-16 md:mt-20 md:pt-20">
        <p class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
          How We Work
        </p>
        <h3 class="mt-3 text-h3 font-semibold tracking-tight text-white">
          From Business Problem to Working Software
        </h3>

        <div class="relative mt-14 md:mt-16">
          <!-- The connecting ribbon: a single gradient line running
               brand -> ice -> green behind the circles, same technique as
               the reference infographics (a continuous path with numbered
               circles sitting on top, ringed in the section's own
               background color so the line reads as passing behind each
               one rather than through it). -->
          <div class="pointer-events-none absolute inset-x-[10%] top-8 hidden h-0.5 bg-gradient-to-r from-brand-500 via-accent-ice-400 to-accent-green-500 md:block" aria-hidden="true" />

          <ol ref="stepsRef" class="relative grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="group flex flex-col items-center text-center"
            >
              <span
                class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg ring-8 ring-navy-950 motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
                :class="step.badgeClass"
              >
                <span class="h-7 w-7" aria-hidden="true">
                  <PrincipleIcon :id="step.icon" />
                </span>
              </span>
              <span class="mt-4 text-caption font-bold tracking-widest text-white/50">
                STEP 0{{ index + 1 }}
              </span>
              <h4 class="mt-1 text-h4 font-semibold tracking-tight text-white">
                {{ step.title }}
              </h4>
              <p class="mt-2 max-w-[14rem] text-body-sm text-slate-300">
                {{ step.description }}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
