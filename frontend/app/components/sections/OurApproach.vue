<script setup lang="ts">
// A genuinely different idiom from every prior version of this section
// (all of which were a dark navy band with icon circles): a light,
// editorial layout — bold confident headline instead of an italic
// pull-quote, and the five steps rendered as oversized outline numerals
// with vertical rule dividers between them, Stripe/Linear "by the
// numbers" style, instead of icon badges and connecting lines.
//
// Reuses the exact, already-established wording from the "Why Trigon
// Apex" principles (components/sections/WhyTrigonApex.vue) for the
// belief statement — this is literally the "Business-first thinking"
// principle.
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
  <SectionContainer as="section" aria-labelledby="our-approach-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-2xl">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          Our Approach
        </span>
        <h2 id="our-approach-heading" class="mt-3 text-h1 font-semibold tracking-tight text-highlighted">
          We start with how the business works, not with a
          <span class="text-brand-500">technology stack.</span>
        </h2>
        <p class="mt-4 text-body-lg text-muted">
          Systems built around actual operations, not forced into a
          generic template.
        </p>
      </div>

      <div class="mt-16 border-t border-default pt-14 md:mt-20 md:pt-16">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          How We Work
        </span>
        <h3 class="mt-3 text-h3 font-semibold tracking-tight text-highlighted">
          From Business Problem to Working Software
        </h3>

        <ol
          ref="stepsRef"
          class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-default"
        >
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="relative pb-10 lg:px-6 lg:pb-0 lg:first:pl-0 lg:last:pr-0"
          >
            <span class="block text-[4.5rem] leading-none font-black tracking-tighter text-brand-100 select-none" aria-hidden="true">
              0{{ index + 1 }}
            </span>
            <h4 class="mt-2 text-h4 font-semibold tracking-tight text-highlighted">
              {{ step.title }}
            </h4>
            <p class="mt-2 max-w-[14rem] text-body-sm text-muted">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
