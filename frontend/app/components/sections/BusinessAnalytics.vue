<script setup lang="ts">
import { gsap } from 'gsap'
import { analyticsActivities, analyticsHighlights } from '~/content/business-analytics'

// One explicit progression — Business Activity → Data → Insight →
// Decision — rather than a separate positioning diagram sitting above an
// unrelated interactive panel. Selecting a business-activity category
// walks that exact chain: the matching insight and the decision it
// supports both update together. Local component state only; nothing
// here is live data (per the mandatory "Illustrative example" caption).
const selectedActivityId = ref(analyticsActivities[0]!.id)

const activeActivity = computed(() => analyticsActivities.find((activity) => activity.id === selectedActivityId.value)!)
const activeHighlight = computed(() => analyticsHighlights.find((highlight) => highlight.id === activeActivity.value.insightId)!)

function selectActivity(id: string) {
  selectedActivityId.value = id
}

// Two-series chart (ice = volume, green = a derived trend) — the visual
// anchor for stage 02, not a single flat brand-colored bar row. Values
// are fixed, illustrative shapes, never framed as real measurements (see
// the mandatory caption on stage 04).
const primarySeries = [38, 58, 46, 72, 54, 80, 62]
const secondarySeries = [22, 34, 40, 48, 58, 60, 70]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)

// Each stage is now a self-contained card rather than a hairline divider
// in a shared spine — same staggered-reveal convention the rest of the
// site's stacked sections use (e.g. Solutions/Industries), so the chain
// reads as four considered steps entering in order.
const chainRef = useTemplateRef<HTMLDivElement>('chainRef')
useStaggerReveal(chainRef, '.analytics-stage', { each: true, stagger: 0.12 })

// The chart bars grow from 0 specifically when the Data card itself
// scrolls into view — its own observer, separate from the card-level
// fade/rise above, since it's a detail inside one card rather than the
// card's own entrance.
const chartCardRef = useTemplateRef<HTMLDivElement>('chartCardRef')
onMounted(() => {
  const el = chartCardRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const play = () => {
    const bars = el.querySelectorAll<HTMLElement>('.analytics-bar')
    const dots = el.querySelectorAll<HTMLElement>('.analytics-trend-dot')
    gsap.from(bars, { height: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' })
    gsap.from(dots, { height: 0, duration: 0.7, delay: 0.2, stagger: 0.06, ease: 'power2.out' })
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
    { threshold: 0.4 }
  )
  observer.observe(el)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <SectionContainer id="business-analytics" as="section" aria-labelledby="business-analytics-heading" class="scroll-mt-20">
    <PageContainer as="div">
      <div ref="contentRef">
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

        <!-- The four stages of the chain, walked in order, each its own
             bordered card with a colored accent bar (brand → ice → ice →
             green) instead of a thin shared spine next to mostly-empty
             space — the progression reads through color + sequence
             regardless of how little or much content a given stage has. -->
        <div ref="chainRef" class="mt-12 space-y-4 md:mt-16 md:space-y-5">
          <div class="analytics-stage relative overflow-hidden rounded-(--radius-lg) border border-default bg-elevated p-6 pl-8 shadow-sm md:p-7 md:pl-10">
            <span class="absolute inset-y-0 left-0 w-1.5 bg-brand-500" aria-hidden="true" />
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm md:h-10 md:w-10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 md:h-4.5 md:w-4.5"><path d="M4 4h16v4H4z" /><path d="M4 12h10v8H4z" /><path d="M16 12h4v8h-4z" /></svg>
              </span>
              <span class="text-caption font-semibold tracking-widest text-muted uppercase">01 &mdash; Business Activity</span>
            </div>
            <div role="group" aria-label="Business activity categories" class="mt-5 flex flex-wrap gap-2">
              <button
                v-for="activity in analyticsActivities"
                :key="activity.id"
                type="button"
                :aria-pressed="selectedActivityId === activity.id"
                class="rounded-(--radius-md) border px-4 py-2.5 text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                :class="selectedActivityId === activity.id
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-default bg-default text-default hover:border-brand-300 hover:text-brand-500'"
                @click="selectActivity(activity.id)"
              >
                {{ activity.label }}
              </button>
            </div>
          </div>

          <div class="analytics-stage relative overflow-hidden rounded-(--radius-lg) border border-default bg-elevated p-6 pl-8 shadow-sm md:p-7 md:pl-10">
            <span class="absolute inset-y-0 left-0 w-1.5 bg-accent-ice-400" aria-hidden="true" />
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-ice-400 text-white shadow-sm md:h-10 md:w-10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 md:h-4.5 md:w-4.5"><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 5-6" /></svg>
              </span>
              <span class="text-caption font-semibold tracking-widest text-muted uppercase">02 &mdash; Data</span>
            </div>
            <div ref="chartCardRef" class="mt-5 max-w-lg rounded-(--radius-md) border border-default bg-default p-5">
              <div class="flex items-center gap-4 text-caption text-muted">
                <span class="inline-flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full bg-brand-300" aria-hidden="true" />
                  Volume
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full bg-accent-green-500" aria-hidden="true" />
                  Trend
                </span>
              </div>
              <div class="relative mt-4 flex h-28 items-end gap-2.5" aria-hidden="true">
                <div v-for="(height, i) in primarySeries" :key="i" class="relative h-full flex-1">
                  <div class="analytics-bar absolute bottom-0 w-full rounded-t bg-brand-200" :style="{ height: `${height}%` }" />
                  <div
                    class="analytics-trend-dot absolute bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-accent-green-500"
                    :style="{ height: `${secondarySeries[i]}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="analytics-stage relative overflow-hidden rounded-(--radius-lg) border border-default bg-elevated p-6 pl-8 shadow-sm md:p-7 md:pl-10">
            <span class="absolute inset-y-0 left-0 w-1.5 bg-accent-ice-600" aria-hidden="true" />
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-ice-600 text-white shadow-sm md:h-10 md:w-10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 md:h-4.5 md:w-4.5"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              </span>
              <span class="text-caption font-semibold tracking-widest text-muted uppercase">03 &mdash; Insight</span>
            </div>
            <p class="mt-5 max-w-lg text-h4 font-semibold tracking-tight text-highlighted">
              {{ activeHighlight.title }}
            </p>
            <p class="mt-2 max-w-md text-body text-default">
              {{ activeHighlight.description }}
            </p>
          </div>

          <div class="analytics-stage relative overflow-hidden rounded-(--radius-lg) border border-default bg-elevated p-6 pl-8 shadow-sm md:p-7 md:pl-10">
            <span class="absolute inset-y-0 left-0 w-1.5 bg-accent-green-500" aria-hidden="true" />
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-green-500 text-white shadow-sm md:h-10 md:w-10" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 md:h-4.5 md:w-4.5"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
              <span class="text-caption font-semibold tracking-widest text-muted uppercase">04 &mdash; Decision</span>
            </div>
            <div class="mt-5 max-w-lg rounded-(--radius-md) border border-accent-green-500/25 bg-accent-green-500/8 p-4">
              <p class="text-h4 font-semibold tracking-tight text-accent-green-700">
                {{ activeHighlight.decision }}
              </p>
            </div>
            <p class="mt-3 text-caption text-muted">
              Illustrative example &mdash; not real business data.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
