<script setup lang="ts">
import { gsap } from 'gsap'
import { analyticsActivities, analyticsHighlights } from '~/content/business-analytics'

// "Option B" from the design-options canvas, picked by the user, with
// their own edit kept: the spotlight panel (chart + insight/decision)
// sits ABOVE the metric strip, not below it.
const selectedActivityId = ref(analyticsActivities[0]!.id)

const activeActivity = computed(() => analyticsActivities.find((activity) => activity.id === selectedActivityId.value)!)
const activeHighlight = computed(() => analyticsHighlights.find((highlight) => highlight.id === activeActivity.value.insightId)!)

function selectActivity(id: string) {
  selectedActivityId.value = id
}

// One fixed, illustrative trend shape (never framed as a real
// measurement — see the mandatory caption below the spotlight panel).
// Same shape everywhere; only the label/insight/decision change per
// activity, same "conceptual UI fixture" convention used elsewhere.
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

const sparkWidth = 120
const sparkHeight = 30
const sparkTopPad = 6
const sparkChart = buildChartSeries(trendValues, sparkWidth, sparkHeight, sparkTopPad)

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)

// The spotlight chart grows/draws in once the panel scrolls into view.
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

        <!-- Spotlight panel (chart + insight/decision) above the metric
             strip, per the chosen layout. -->
        <div ref="chartPanelRef" class="mt-10 flex flex-col gap-8 rounded-(--radius-xl) bg-elevated p-7 sm:flex-row sm:items-stretch sm:p-10 md:mt-12">
          <div class="flex flex-1 flex-col gap-4">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">
              Weekly Volume &mdash; {{ activeActivity.label }}
            </span>
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
              <span class="text-h3 font-semibold tracking-tight text-highlighted">{{ activeHighlight.title }}</span>
              <span class="text-body text-default">{{ activeHighlight.description }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
              <span class="text-body font-semibold text-accent-green-700">{{ activeHighlight.decision }}</span>
            </div>
            <span class="text-caption text-muted">Illustrative example &mdash; not real business data.</span>
          </div>
        </div>

        <!-- Metric strip: one compact chip per business activity, click
             to switch what the panel above shows. -->
        <div role="group" aria-label="Business activity categories" class="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <button
            v-for="(activity, index) in analyticsActivities"
            :key="activity.id"
            type="button"
            :aria-pressed="selectedActivityId === activity.id"
            class="flex flex-col gap-3.5 rounded-(--radius-lg) border p-5 text-left motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
            :class="selectedActivityId === activity.id ? 'border-brand-200 bg-brand-50' : 'border-default bg-default hover:border-brand-200'"
            @click="selectActivity(activity.id)"
          >
            <span class="text-caption font-bold tracking-wider uppercase" :class="selectedActivityId === activity.id ? 'text-brand-500' : 'text-muted'">
              0{{ index + 1 }} {{ activity.label }}
            </span>
            <svg :viewBox="`0 0 ${sparkWidth} ${sparkTopPad + sparkHeight}`" preserveAspectRatio="none" class="h-7 w-full" aria-hidden="true">
              <path :d="sparkChart.linePath" fill="none" :stroke="selectedActivityId === activity.id ? 'var(--color-brand-500)' : '#cbd5e1'" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="h-[3px] w-full rounded-full" :class="selectedActivityId === activity.id ? 'bg-brand-500' : 'bg-default'" />
          </button>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
