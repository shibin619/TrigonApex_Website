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

// Horizontal flow (left-to-right across 4 columns, same ribbon-connecting-
// circles device already used by HowWeWork.vue) instead of four full-width
// cards stacked vertically down the page — the same convention, reused for
// consistency rather than inventing a second pattern.
const stepsRef = useTemplateRef<HTMLDivElement>('stepsRef')
useStaggerReveal(stepsRef, 'li', { each: true })

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

// The chart bars grow from 0 specifically when the Data column itself
// scrolls into view — its own observer, separate from the per-column
// fade/rise above, since it's a detail inside one column rather than the
// column's own entrance.
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

        <!-- Left-to-right flow across 4 columns instead of 4 cards stacked
             down the page — a ribbon connects the stage circles (same
             device HowWeWork.vue uses for its 5-step process), with each
             column's actual content sitting below its own circle. -->
        <div class="relative mt-12 md:mt-16">
          <div class="relative rounded-3xl border border-default/60 bg-default px-6 py-10 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.28)] sm:px-10 sm:py-12">
            <div class="pointer-events-none absolute inset-x-[calc(12.5%+1.5rem)] top-[4.5rem] hidden lg:block" aria-hidden="true">
              <div ref="ribbonRef" class="h-1 w-full origin-left rounded-full bg-gradient-to-r from-brand-500 via-accent-ice-400 to-accent-green-500" />
              <div class="absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 border-y-[5px] border-l-[7px] border-y-transparent border-l-accent-green-500" />
            </div>

            <ol ref="stepsRef" class="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <li class="flex flex-col items-center text-center">
                <span class="relative">
                  <span class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_22px_-6px_rgba(73,89,179,0.55)] ring-8 ring-default" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M4 4h16v4H4z" /><path d="M4 12h10v8H4z" /><path d="M16 12h4v8h-4z" /></svg>
                  </span>
                  <span class="absolute -right-1 -bottom-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-default bg-default text-body-sm font-bold text-brand-600 shadow-sm">1</span>
                </span>
                <span class="mt-5 text-caption font-semibold tracking-widest text-muted uppercase">Business Activity</span>

                <div role="group" aria-label="Business activity categories" class="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    v-for="activity in analyticsActivities"
                    :key="activity.id"
                    type="button"
                    :aria-pressed="selectedActivityId === activity.id"
                    class="rounded-(--radius-md) border px-3.5 py-2 text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                    :class="selectedActivityId === activity.id
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-default text-default hover:border-brand-300 hover:text-brand-500'"
                    @click="selectActivity(activity.id)"
                  >
                    {{ activity.label }}
                  </button>
                </div>
              </li>

              <li class="flex flex-col items-center text-center">
                <span class="relative">
                  <span class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 text-white shadow-[0_10px_22px_-6px_rgba(52,152,197,0.55)] ring-8 ring-default" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 5-6" /></svg>
                  </span>
                  <span class="absolute -right-1 -bottom-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-default bg-default text-body-sm font-bold text-accent-ice-600 shadow-sm">2</span>
                </span>
                <span class="mt-5 text-caption font-semibold tracking-widest text-muted uppercase">Data</span>

                <div ref="chartCardRef" class="mt-4 w-full rounded-(--radius-md) border border-default bg-elevated p-4 text-left">
                  <div class="flex items-center gap-3 text-caption text-muted">
                    <span class="inline-flex items-center gap-1.5">
                      <span class="h-2 w-2 rounded-full bg-brand-300" aria-hidden="true" />
                      Volume
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <span class="h-2 w-2 rounded-full bg-accent-green-500" aria-hidden="true" />
                      Trend
                    </span>
                  </div>
                  <div class="relative mt-3 flex h-20 items-end gap-1.5" aria-hidden="true">
                    <div v-for="(height, i) in primarySeries" :key="i" class="relative h-full flex-1">
                      <div class="analytics-bar absolute bottom-0 w-full rounded-t bg-brand-200" :style="{ height: `${height}%` }" />
                      <div
                        class="analytics-trend-dot absolute bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-accent-green-500"
                        :style="{ height: `${secondarySeries[i]}%` }"
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex flex-col items-center text-center">
                <span class="relative">
                  <span class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent-ice-600 text-white shadow-[0_10px_22px_-6px_rgba(41,124,163,0.55)] ring-8 ring-default" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                  </span>
                  <span class="absolute -right-1 -bottom-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-default bg-default text-body-sm font-bold text-accent-ice-600 shadow-sm">3</span>
                </span>
                <span class="mt-5 text-caption font-semibold tracking-widest text-muted uppercase">Insight</span>

                <p class="mt-4 text-body font-semibold tracking-tight text-highlighted">
                  {{ activeHighlight.title }}
                </p>
                <p class="mt-2 text-body-sm text-muted">
                  {{ activeHighlight.description }}
                </p>
              </li>

              <li class="flex flex-col items-center text-center">
                <span class="relative">
                  <span class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-green-500 to-accent-green-700 text-white shadow-[0_10px_22px_-6px_rgba(66,148,110,0.55)] ring-8 ring-default" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span class="absolute -right-1 -bottom-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-default bg-default text-body-sm font-bold text-accent-green-700 shadow-sm">4</span>
                </span>
                <span class="mt-5 text-caption font-semibold tracking-widest text-muted uppercase">Decision</span>

                <div class="mt-4 w-full rounded-(--radius-md) border border-accent-green-500/25 bg-accent-green-500/8 p-4">
                  <p class="text-body font-semibold tracking-tight text-accent-green-700">
                    {{ activeHighlight.decision }}
                  </p>
                </div>
                <p class="mt-3 text-caption text-muted">
                  Illustrative example &mdash; not real business data.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
