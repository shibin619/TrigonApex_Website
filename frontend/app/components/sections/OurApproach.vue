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
  lineClass: string
  borderClass: string
  ringClass: string
  textClass: string
  dotClass: string
}

// The exact "numbered ring + L-shaped connector up to a small icon dot +
// colored bordered description box" composition from the reference
// business-infographic layouts, not the ribbon/line-behind-circles
// version this replaces — each step gets its own accent color carried
// through the ring, connector, label and box border consistently.
const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', lineClass: 'text-brand-400', borderClass: 'border-brand-400', ringClass: 'ring-brand-400/20', textClass: 'text-brand-300', dotClass: 'bg-gradient-to-br from-brand-500 to-brand-700' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', lineClass: 'text-accent-ice-400', borderClass: 'border-accent-ice-400', ringClass: 'ring-accent-ice-400/20', textClass: 'text-accent-ice-400', dotClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', lineClass: 'text-accent-green-500', borderClass: 'border-accent-green-500', ringClass: 'ring-accent-green-500/20', textClass: 'text-accent-green-500', dotClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', lineClass: 'text-brand-400', borderClass: 'border-brand-400', ringClass: 'ring-brand-400/20', textClass: 'text-brand-300', dotClass: 'bg-gradient-to-br from-brand-500 to-brand-700' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', lineClass: 'text-accent-ice-400', borderClass: 'border-accent-ice-400', ringClass: 'ring-accent-ice-400/20', textClass: 'text-accent-ice-400', dotClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600' }
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

        <ol ref="stepsRef" class="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-5">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="group relative pt-9"
          >
            <!-- L-shaped connector: up from the number circle, then right
                 to the small icon dot — the reference's signature detail,
                 not just a plain numbered circle. -->
            <svg viewBox="0 0 92 44" class="pointer-events-none absolute top-0 left-0 h-11 w-[5.75rem] overflow-visible" :class="step.lineClass" fill="none" aria-hidden="true">
              <path d="M32 44V16H80" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span
              class="absolute top-0 left-16 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
              :class="step.dotClass"
            >
              <span class="h-4 w-4" aria-hidden="true">
                <PrincipleIcon :id="step.icon" />
              </span>
            </span>

            <div class="flex items-center gap-4">
              <span
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 bg-navy-950 text-h4 font-bold ring-4"
                :class="[step.borderClass, step.ringClass, step.textClass]"
              >
                0{{ index + 1 }}
              </span>
              <h4 class="text-h4 font-bold tracking-tight" :class="step.textClass">
                {{ step.title }}
              </h4>
            </div>

            <div class="mt-5 rounded-xl border px-4 py-4 text-body-sm text-slate-300" :class="step.borderClass">
              {{ step.description }}
            </div>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
