<script setup lang="ts">
import { gsap } from 'gsap'
import { analyticsActivities, analyticsHighlights } from '~/content/business-analytics'

// Selecting a business-activity category walks the whole chain: the
// matching insight and the decision it supports update together. Local
// component state only; nothing here is live data (per the mandatory
// "Illustrative example" caption on the Decision card).
const selectedActivityId = ref(analyticsActivities[0]!.id)

const activeActivity = computed(() => analyticsActivities.find((activity) => activity.id === selectedActivityId.value)!)
const activeHighlight = computed(() => analyticsHighlights.find((highlight) => highlight.id === activeActivity.value.insightId)!)

function selectActivity(id: string) {
  selectedActivityId.value = id
}

// Two-series combo chart (bars = volume, line = a derived trend) — fixed,
// illustrative shapes, never framed as real measurements (see the
// mandatory caption on the Decision card). Drawn as actual SVG shapes
// (not CSS divs) so the trend line can be a genuine smooth curve layered
// over the bars, like a real analytics widget.
const primarySeries = [38, 58, 46, 72, 54, 80, 62]
const secondarySeries = [22, 34, 40, 48, 58, 60, 70]
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const chartWidth = 280
const chartHeight = 120
const slotWidth = chartWidth / primarySeries.length
const barWidth = slotWidth * 0.55

const barRects = primarySeries.map((value, i) => {
  const height = (value / 100) * 96
  return { x: i * slotWidth + (slotWidth - barWidth) / 2, y: 112 - height, width: barWidth, height }
})

const linePoints = secondarySeries.map((value, i) => ({
  x: i * slotWidth + slotWidth / 2,
  y: 112 - (value / 100) * 96
}))

// Same "smooth curve through points" trick used in the Product Tour
// chart: a quadratic Bézier from each point to the midpoint of it and
// the next, using the point itself as the control.
function buildSmoothLinePath(points: { x: number, y: number }[]) {
  if (points.length < 2) return ''
  let path = `M ${points[0]!.x},${points[0]!.y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]!
    const next = points[i + 1]!
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x},${current.y} ${midX},${midY}`
  }
  const last = points[points.length - 1]!
  path += ` L ${last.x},${last.y}`
  return path
}
const trendLinePath = buildSmoothLinePath(linePoints)

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)

// The chart bars + trend line grow/draw in once this panel scrolls into
// view — its own observer since it's a detail inside the panel, not the
// panel's own fade/rise.
const chartPanelRef = useTemplateRef<HTMLDivElement>('chartPanelRef')
onMounted(() => {
  const el = chartPanelRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const play = () => {
    const bars = el.querySelectorAll<SVGRectElement>('.analytics-bar')
    const line = el.querySelector<SVGPathElement>('.analytics-trend-line')
    const dots = el.querySelectorAll<SVGCircleElement>('.analytics-trend-dot')

    gsap.set(bars, { transformOrigin: 'bottom' })
    gsap.from(bars, { scaleY: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' })

    if (line) {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, { strokeDashoffset: 0, duration: 0.9, delay: 0.3, ease: 'power2.out' })
    }
    gsap.from(dots, { scale: 0, transformOrigin: 'center', duration: 0.4, delay: 0.9, stagger: 0.05, ease: 'back.out(2)' })
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
  <SectionContainer id="business-analytics" as="section" aria-labelledby="business-analytics-heading" class="scroll-mt-20 overflow-hidden bg-navy-950">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
            Business Analytics
          </span>
          <h2 id="business-analytics-heading" class="mt-3 text-h2 font-semibold tracking-tight text-white">
            Your Business Is Already Generating Data.
          </h2>
          <p class="mt-4 text-body-lg text-slate-300">
            Your software should not only record what happens. It should
            help you understand what is happening and where the business
            can improve.
          </p>
        </div>

        <!-- Segmented-control selector rather than loose bordered
             buttons — reads as one unified control picking what the
             panel below is about, not a separate labeled "step". -->
        <div role="group" aria-label="Business activity categories" class="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:mt-12">
          <button
            v-for="activity in analyticsActivities"
            :key="activity.id"
            type="button"
            :aria-pressed="selectedActivityId === activity.id"
            class="rounded-full px-4 py-2 text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="selectedActivityId === activity.id
              ? 'bg-white text-navy-900 shadow-sm'
              : 'text-slate-300 hover:text-white'"
            @click="selectActivity(activity.id)"
          >
            {{ activity.label }}
          </button>
        </div>

        <!-- Asymmetric panel — the chart is the dominant visual (what the
             business activity actually produces), with the insight it
             reveals and the decision it supports stacked beside it as
             the payoff, not three equally-weighted boxes in a row. -->
        <div class="relative mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <span class="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
          <span class="pointer-events-none absolute -right-10 -bottom-20 h-64 w-64 rounded-full bg-accent-green-500/15 blur-3xl" aria-hidden="true" />

          <div ref="chartPanelRef" class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <span class="text-caption font-semibold tracking-widest text-slate-400 uppercase">
                {{ activeActivity.label }} &mdash; Weekly Data
              </span>
              <div class="flex items-center gap-4 text-caption text-slate-300">
                <span class="inline-flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full bg-accent-ice-400" aria-hidden="true" />
                  Volume
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full bg-accent-green-500" aria-hidden="true" />
                  Trend
                </span>
              </div>
            </div>

            <div class="relative mt-6 h-56 sm:h-64" aria-hidden="true">
              <svg viewBox="0 0 280 120" preserveAspectRatio="none" class="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="ba-bar-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--color-accent-ice-400)" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="var(--color-accent-ice-400)" stop-opacity="0.25" />
                  </linearGradient>
                </defs>
                <g stroke="white" stroke-opacity="0.08" stroke-width="1" vector-effect="non-scaling-stroke">
                  <line x1="0" y1="16" x2="280" y2="16" stroke-dasharray="3 4" />
                  <line x1="0" y1="52" x2="280" y2="52" stroke-dasharray="3 4" />
                  <line x1="0" y1="88" x2="280" y2="88" stroke-dasharray="3 4" />
                </g>
                <line x1="0" y1="112" x2="280" y2="112" stroke="white" stroke-opacity="0.18" stroke-width="1" vector-effect="non-scaling-stroke" />

                <rect
                  v-for="(bar, i) in barRects"
                  :key="i"
                  class="analytics-bar"
                  :x="bar.x"
                  :y="bar.y"
                  :width="bar.width"
                  :height="bar.height"
                  rx="3"
                  fill="url(#ba-bar-gradient)"
                />

                <path :d="trendLinePath" class="analytics-trend-line" fill="none" stroke="var(--color-accent-green-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                <circle
                  v-for="(point, i) in linePoints"
                  :key="i"
                  class="analytics-trend-dot"
                  :cx="point.x"
                  :cy="point.y"
                  r="3.5"
                  fill="var(--color-accent-green-500)"
                  stroke="var(--color-navy-950)"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="mt-2 flex gap-2 text-caption text-slate-500" aria-hidden="true">
              <span v-for="label in dayLabels" :key="label" class="w-full text-center">{{ label }}</span>
            </div>
          </div>

          <div class="relative flex flex-col gap-5">
            <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <span class="text-caption font-semibold tracking-widest text-slate-400 uppercase">Insight</span>
              <p class="mt-3 text-h3 font-semibold tracking-tight text-white">
                {{ activeHighlight.title }}
              </p>
              <p class="mt-2 text-body text-slate-300">
                {{ activeHighlight.description }}
              </p>
            </div>

            <div class="relative overflow-hidden rounded-2xl border border-accent-green-500/30 bg-gradient-to-br from-accent-green-500/15 via-accent-green-500/5 to-transparent p-6 sm:p-7">
              <span class="text-caption font-semibold tracking-widest text-accent-green-300 uppercase">Decision</span>
              <p class="mt-3 text-h3 font-semibold tracking-tight text-white">
                {{ activeHighlight.decision }}
              </p>
              <p class="mt-4 text-caption text-slate-400">
                Illustrative example &mdash; not real business data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
