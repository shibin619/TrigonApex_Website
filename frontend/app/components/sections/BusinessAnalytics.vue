<script setup lang="ts">
import { gsap } from 'gsap'

// Two earlier versions both tried to DEMONSTRATE analytics with a chart
// of invented numbers (first behind a fake "pick an activity" selector,
// then as one static example) — but no real product screenshot or
// confirmed analytics capability exists yet (products.ts ships
// analyticsFeatures as empty arrays), so any chart here is necessarily
// fabricated, and it kept reading as fake regardless of styling or
// interactivity. This drops data visualization entirely and states the
// idea instead, as a simple five-step sequence — the same
// ribbon-connected-circles device How We Work.vue already uses for its
// delivery process, reused here for a different process (Data becoming
// a Decision) rather than invented twice.
interface AnalyticsStep {
  title: string
  description: string
  icon: 'layers' | 'target' | 'chart' | 'bulb' | 'flow'
  chipClass: string
  badgeTextClass: string
}

const steps: AnalyticsStep[] = [
  { title: 'Data', description: 'Every order, task and customer interaction already leaves a record.', icon: 'layers', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_22px_-6px_rgba(73,89,179,0.55)]', badgeTextClass: 'text-brand-600' },
  { title: 'KPIs', description: 'The handful of numbers that actually matter, tracked without manual work.', icon: 'target', chipClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_22px_-6px_rgba(52,152,197,0.55)]', badgeTextClass: 'text-accent-ice-600' },
  { title: 'Trends', description: 'Shifts and patterns surface over weeks, not buried until year-end.', icon: 'chart', chipClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_22px_-6px_rgba(66,148,110,0.55)]', badgeTextClass: 'text-accent-green-700' },
  { title: 'Insights', description: 'Raw numbers turn into a plain explanation of what is actually happening.', icon: 'bulb', chipClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_22px_-6px_rgba(73,89,179,0.55)]', badgeTextClass: 'text-brand-600' },
  { title: 'Decisions', description: 'You act on what the business is telling you, not a guess.', icon: 'flow', chipClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_22px_-6px_rgba(66,148,110,0.55)]', badgeTextClass: 'text-accent-green-700' }
]

const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useStaggerReveal(stepsRef, 'li', { each: true })

// Same play-once/IntersectionObserver/reduced-motion convention as
// How We Work.vue's ribbon draw-in.
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
  <SectionContainer as="section" aria-labelledby="business-analytics-heading">
    <PageContainer as="div">
      <div class="max-w-2xl">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          Business Analytics
        </span>
        <h2 id="business-analytics-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
          Your Business Is Already Generating Data.
        </h2>
        <p class="mt-4 text-body-lg text-muted">
          Your software should not only record what happens. It should
          help you understand what is happening and where the business
          can improve.
        </p>
      </div>

      <div class="relative mt-14 md:mt-16">
        <div class="relative rounded-3xl border border-default/60 bg-default px-6 py-10 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.28)] sm:px-10 sm:py-12">
          <div class="pointer-events-none absolute inset-x-[calc(10%+1.5rem)] top-[4.5rem] hidden lg:block sm:top-20" aria-hidden="true">
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
      </div>
    </PageContainer>
  </SectionContainer>
</template>
