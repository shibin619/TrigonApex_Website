<script setup lang="ts">
// The bold, colorful infographic style from the reference images (a
// "Design Thinking Template"-style layout): each step sits in its own
// tinted color panel, with an icon badge connected by a short vertical
// line down to a bold numbered ring — a deliberately more vivid
// treatment than the previous flat white layout, cycling the same
// three validated accent families (brand/ice/green) used elsewhere on
// the site so the extra color stays on-brand rather than introducing
// new, unvalidated hues.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
  panelClass: string
  chipClass: string
  lineClass: string
  ringClass: string
  textClass: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', panelClass: 'bg-brand-50', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]', lineClass: 'bg-brand-300', ringClass: 'border-brand-400', textClass: 'text-brand-600' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', panelClass: 'bg-accent-ice-400/10', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]', lineClass: 'bg-accent-ice-400/60', ringClass: 'border-accent-ice-400', textClass: 'text-accent-ice-600' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', panelClass: 'bg-accent-green-500/10', chipClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_8px_16px_-6px_rgba(66,148,110,0.5)]', lineClass: 'bg-accent-green-500/60', ringClass: 'border-accent-green-500', textClass: 'text-accent-green-700' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', panelClass: 'bg-brand-50', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]', lineClass: 'bg-brand-300', ringClass: 'border-brand-400', textClass: 'text-brand-600' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', panelClass: 'bg-accent-ice-400/10', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]', lineClass: 'bg-accent-ice-400/60', ringClass: 'border-accent-ice-400', textClass: 'text-accent-ice-600' }
]

const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useStaggerReveal(stepsRef, 'li', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="how-we-work-heading">
    <PageContainer as="div">
      <div class="max-w-2xl">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          How We Work
        </span>
        <h2 id="how-we-work-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
          From Business Problem to Working Software
        </h2>
      </div>

      <ol ref="stepsRef" class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="group relative overflow-hidden rounded-2xl px-5 pt-8 pb-6 text-center motion-safe:transition-transform motion-safe:duration-(--duration-base) hover:-translate-y-1.5"
          :class="step.panelClass"
        >
          <span
            class="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
            :class="step.chipClass"
          >
            <span class="h-6 w-6" aria-hidden="true">
              <PrincipleIcon :id="step.icon" />
            </span>
          </span>
          <span class="mx-auto mt-1 block h-6 w-0.5" :class="step.lineClass" aria-hidden="true" />
          <span
            class="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 bg-default text-h4 font-bold"
            :class="[step.ringClass, step.textClass]"
          >
            0{{ index + 1 }}
          </span>
          <h3 class="mt-4 text-h4 font-semibold tracking-tight text-highlighted">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-body-sm text-muted">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </PageContainer>
  </SectionContainer>
</template>
