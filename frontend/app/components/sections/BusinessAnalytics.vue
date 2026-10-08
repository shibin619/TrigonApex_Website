<script setup lang="ts">
import { gsap } from 'gsap'
import { getAnalyticsHighlight } from '~/content/business-analytics'

// Static, not interactive. An earlier version let a visitor click
// between four "business activity" categories and watch the insight/
// decision text swap — technically honest (every panel was captioned
// "illustrative"), but it read as a fake live demo, which is worse than
// just stating the idea plainly. docs/HOMEPAGE_SPEC.md §11 only ever
// asked for a short five-step labeled sequence (Data → KPIs → Trends →
// Insights → Decisions) plus ONE static conceptual chart — this returns
// to that, keeping the chart visual from the layout the user picked.
const sequenceSteps = ['Data', 'KPIs', 'Trends', 'Insights', 'Decisions']
const highlight = getAnalyticsHighlight('performance')!

const trendValues = [38, 58, 46, 72, 54, 80, 62]
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Same "smooth curve through points" trick used elsewhere (Product
// Tour's chart): a quadratic Bézier from each point to the midpoint of
// it and the next, using the point itself as the control.
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

function buildChartSeries(values: number[], width: number, height: number, topPad: number) {
  const baseline = topPad + height
  const points = values.map((value, index) => ({
    x: values.length > 1 ? (index / (values.length - 1)) * width : 0,
    y: baseline - (value / 100) * height
  }))
  const linePath = buildSmoothLinePath(points)
  const first = points[0]
  const last = points[points.length - 1]
  const areaPath = first && last ? `${linePath} L ${last.x},${baseline} L ${first.x},${baseline} Z` : ''
  const peakIndex = values.indexOf(Math.max(...values))
  return { linePath, areaPath, peakPoint: points[peakIndex], baseline }
}

const mainChartWidth = 520
const mainChartHeight = 170
const mainChartTopPad = 20
const mainChart = buildChartSeries(trendValues, mainChartWidth, mainChartHeight, mainChartTopPad)

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)

// The chart still draws in once it scrolls into view — a one-time
// entrance, not a "live updating" effect (docs/HOMEPAGE_SPEC.md §11
// rules that out explicitly).
const chartPanelRef = useTemplateRef<HTMLDivElement>('chartPanelRef')
onMounted(() => {
  const el = chartPanelRef.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const play = () => {
    const line = el.querySelector<SVGPathElement>('.analytics-trend-line')
    const dot = el.querySelector<SVGCircleElement>('.analytics-peak-dot')
    if (line) {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' })
    }
    if (dot) {
      gsap.from(dot, { scale: 0, transformOrigin: 'center', duration: 0.4, delay: 0.7, ease: 'back.out(2)' })
    }
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
  <SectionContainer as="section" aria-labelledby="business-analytics-heading" spacing="compact">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-xl">
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

        <!-- The five-step sequence, stated plainly — not a selector,
             nothing to click. -->
        <div class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-10">
          <template v-for="(step, index) in sequenceSteps" :key="step">
            <span class="text-body-sm font-semibold text-highlighted">{{ step }}</span>
            <svg v-if="index < sequenceSteps.length - 1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" class="text-muted" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 3l6 5-6 5" />
            </svg>
          </template>
        </div>

        <!-- One static illustration of the chain, not a live demo. -->
        <div ref="chartPanelRef" class="mt-6 flex flex-col gap-8 rounded-(--radius-xl) bg-elevated p-7 sm:flex-row sm:items-stretch sm:p-10">
          <div class="flex flex-1 flex-col gap-4">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">Weekly Volume</span>
            <div class="relative h-56 sm:h-60" aria-hidden="true">
              <svg :viewBox="`0 0 ${mainChartWidth} ${mainChartTopPad + mainChartHeight}`" preserveAspectRatio="none" class="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="ba-main-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--color-accent-green-500)" stop-opacity="0.18" />
                    <stop offset="100%" stop-color="var(--color-accent-green-500)" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" :y1="mainChart.baseline * 0.3" :x2="mainChartWidth" :y2="mainChart.baseline * 0.3" stroke="currentColor" class="text-default" stroke-width="1" stroke-dasharray="4 5" />
                <line x1="0" :y1="mainChart.baseline * 0.62" :x2="mainChartWidth" :y2="mainChart.baseline * 0.62" stroke="currentColor" class="text-default" stroke-width="1" stroke-dasharray="4 5" />
                <line x1="0" :y1="mainChart.baseline" :x2="mainChartWidth" :y2="mainChart.baseline" stroke="currentColor" class="text-default" stroke-width="1" />
                <path :d="mainChart.areaPath" fill="url(#ba-main-fill)" stroke="none" />
                <path :d="mainChart.linePath" class="analytics-trend-line" fill="none" stroke="var(--color-accent-green-500)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                <circle v-if="mainChart.peakPoint" class="analytics-peak-dot" :cx="mainChart.peakPoint.x" :cy="mainChart.peakPoint.y" r="5.5" fill="var(--color-accent-green-500)" stroke="#f8fafc" stroke-width="3" />
              </svg>
            </div>
            <div class="flex justify-between text-caption text-muted">
              <span v-for="label in dayLabels" :key="label">{{ label }}</span>
            </div>
          </div>

          <div class="hidden w-px shrink-0 bg-default sm:block" aria-hidden="true" />

          <div class="flex flex-1 flex-col justify-center gap-6">
            <div class="flex flex-col gap-2">
              <span class="text-caption font-semibold tracking-widest text-muted uppercase">Insight</span>
              <span class="text-h3 font-semibold tracking-tight text-highlighted">{{ highlight.title }}</span>
              <span class="text-body text-default">{{ highlight.description }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
              <span class="text-body font-semibold text-accent-green-700">{{ highlight.decision }}</span>
            </div>
            <span class="text-caption text-muted">Illustrative example &mdash; not real business data.</span>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
