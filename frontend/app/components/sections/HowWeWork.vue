<script setup lang="ts">
// A five-step process, connected by a single line — horizontal on
// desktop, a vertical timeline on mobile (the same connecting-line
// language used in the Hero/Solutions/Business Analytics visuals, not a
// new pattern).
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
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="how-we-work-heading" class="bg-elevated">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            How We Work
          </span>
          <h2 id="how-we-work-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            From Business Problem to Working Software
          </h2>
        </div>

        <ol class="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:gap-6">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="relative flex-1 border-l-2 border-default pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-6"
          >
            <span
              class="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 md:left-0 md:-top-[9px]"
              aria-hidden="true"
            />
            <span class="text-body-sm font-semibold tabular-nums text-brand-500">0{{ index + 1 }}</span>
            <h3 class="mt-1 text-h4 font-semibold tracking-tight text-highlighted">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-body-sm text-default">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
