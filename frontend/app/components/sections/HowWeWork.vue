<script setup lang="ts">
import { gsap } from 'gsap'

// Back to a clean white background (the pale tinted panels from the
// last version read as washed-out rather than bold) and down to ONE
// circle per step instead of two stacked circles (icon + separate
// number ring was redundant) — the number is now a small badge
// overlapping the icon circle's corner. What makes this version bold
// is a thick gradient ribbon connecting all five steps in one
// continuous line (matching most of the reference infographics, which
// connect the whole sequence rather than decorating each step in
// isolation), not colored card backgrounds.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
  chipClass: string
  badgeTextClass: string
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_22px_-6px_rgba(73,89,179,0.55)]', badgeTextClass: 'text-brand-600' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_22px_-6px_rgba(52,152,197,0.55)]', badgeTextClass: 'text-accent-ice-600' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers', chipClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_22px_-6px_rgba(66,148,110,0.55)]', badgeTextClass: 'text-accent-green-700' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_22px_-6px_rgba(73,89,179,0.55)]', badgeTextClass: 'text-brand-600' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_22px_-6px_rgba(52,152,197,0.55)]', badgeTextClass: 'text-accent-ice-600' }
]

const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useStaggerReveal(stepsRef, 'li', { each: true })

// The ribbon draws itself in left-to-right, once, when it scrolls into
// view — same play-once/IntersectionObserver/reduced-motion convention
// as useFadeIn and useStaggerReveal, kept inline here since a scaleX
// "line draw" is a different shape of animation than either composable.
const ribbonRef = useTemplateRef<HTMLDivElement>('ribbonRef')
onMounted(() => {
  const el = ribbonRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power2.out' })
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  observer.observe(el)
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

      <div class="relative mt-14 md:mt-16">
        <!-- The ribbon: one continuous gradient line connecting all five
             steps, sitting behind the circles at their vertical center —
             reads as a single flow from Discover to Improve instead of
             five unrelated items. It draws itself in on scroll (see
             ribbonRef below) and ends in a small arrowhead to make the
             direction of the flow explicit. -->
        <div class="pointer-events-none absolute inset-x-[10%] top-8 hidden lg:block" aria-hidden="true">
          <div ref="ribbonRef" class="h-1 w-full origin-left rounded-full bg-gradient-to-r from-brand-500 via-accent-ice-400 to-accent-green-500" />
          <div class="absolute top-1/2 right-10 h-0 w-0 -translate-y-1/2 border-y-[5px] border-l-[7px] border-y-transparent border-l-accent-green-500" />
        </div>

        <ol ref="stepsRef" class="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <li v-for="(step, index) in steps" :key="step.title" class="group relative flex flex-col items-center text-center">
            <span class="relative">
              <span
                class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-white ring-8 ring-default motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
                :class="step.chipClass"
              >
                <span class="h-7 w-7" aria-hidden="true">
                  <PrincipleIcon :id="step.icon" />
                </span>
              </span>
              <span
                class="absolute -right-1 -bottom-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-default bg-default text-body-sm font-bold shadow-sm"
                :class="step.badgeTextClass"
              >
                {{ index + 1 }}
              </span>
            </span>
            <h3 class="mt-5 text-h4 font-semibold tracking-tight text-highlighted">
              {{ step.title }}
            </h3>
            <p class="mt-2 max-w-[14rem] text-body-sm text-muted">
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
