<script setup lang="ts">
import { gsap } from 'gsap'

// A scroll-filled progress bar above the steps, plus gradient icon chips
// per step instead of bare numerals — matching the colored-icon-chip
// language used everywhere else on the site (Solutions, WhyTrigonApex).
//
// The progress bar is a SINGLE one-time width animation (0% -> 100%,
// triggered once by IntersectionObserver, same safe pattern as
// useFadeIn) — not a continuous scroll-position tracker. A previous
// version of this section used a continuous scroll-linked connector and
// a user reported the section going invisible after scrolling; this
// stays in the same safe "play once, then static" category as every
// other animation on the site rather than reintroducing scroll-tied
// visibility logic.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
  chipClass: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', chipClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_8px_16px_-6px_rgba(66,148,110,0.5)]' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_16px_-6px_rgba(73,89,179,0.5)]' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_8px_16px_-6px_rgba(52,152,197,0.5)]' }
]

const progressTrackRef = useTemplateRef<HTMLDivElement>('progressTrackRef')
const progressBarRef = useTemplateRef<HTMLDivElement>('progressBarRef')

onMounted(() => {
  const track = progressTrackRef.value
  const bar = progressBarRef.value
  if (!track || !bar) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bar.style.width = '100%'
    return
  }

  const play = () => {
    gsap.to(bar, { width: '100%', duration: 1.1, ease: 'power2.out' })
  }

  if (!('IntersectionObserver' in window)) {
    play()
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        play()
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  observer.observe(track)
  onBeforeUnmount(() => observer.disconnect())
})
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

      <div ref="progressTrackRef" class="mt-12 h-1 overflow-hidden rounded-full bg-default md:mt-14">
        <div ref="progressBarRef" class="h-full w-0 rounded-full bg-gradient-to-r from-brand-500 via-accent-ice-400 to-accent-green-500" />
      </div>

      <ol class="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="(step, index) in steps" :key="step.title" class="group relative">
          <span
            class="flex h-12 w-12 items-center justify-center rounded-full text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
            :class="step.chipClass"
          >
            <span class="h-5 w-5" aria-hidden="true">
              <PrincipleIcon :id="step.icon" />
            </span>
          </span>
          <p class="mt-4 text-caption font-bold tracking-widest text-muted">
            STEP 0{{ index + 1 }}
          </p>
          <h3 class="mt-1 text-h4 font-semibold tracking-tight text-highlighted">
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
