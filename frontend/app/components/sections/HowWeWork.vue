<script setup lang="ts">
// The five-step process, shown as oversized pale outline numerals with
// thin vertical dividers between them (Stripe/Linear "by the numbers"
// treatment) — the light editorial style from the last "Our Approach"
// iteration, kept on its own now that the belief-statement quote above
// it was removed.
//
// Deliberately no scroll-triggered fade-in/stagger animation here (every
// other section uses useFadeIn/useStaggerReveal) — a user report of this
// exact section becoming invisible after scrolling pointed at the
// animation layer, so it's rendered fully static to rule that out as a
// class of bug entirely rather than keep guessing at the timing issue.
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

      <ol class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:mt-14 lg:grid-cols-5 lg:divide-x lg:divide-default">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative pb-10 lg:px-6 lg:pb-0 lg:first:pl-0 lg:last:pr-0"
        >
          <span class="block text-[4.5rem] leading-none font-black tracking-tighter text-brand-100 select-none" aria-hidden="true">
            0{{ index + 1 }}
          </span>
          <h3 class="mt-2 text-h4 font-semibold tracking-tight text-highlighted">
            {{ step.title }}
          </h3>
          <p class="mt-2 max-w-[14rem] text-body-sm text-muted">
            {{ step.description }}
          </p>
        </li>
      </ol>
    </PageContainer>
  </SectionContainer>
</template>
