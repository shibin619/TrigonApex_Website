<script setup lang="ts">
import { products } from '~/content/products'
import { productTourSteps, getProductTourPreview } from '~/content/product-tour'

// A real, local, front-end-only interaction: no backend/API involved, no
// state persisted, nothing here is a live account. Every label inside the
// preview is a generic UI concept (see product-tour.ts's own docstring) —
// the "Interactive Preview" label in the panel itself is the section's
// explicit signal that this is a conceptual tour, not a live product.
const selectedProductId = ref(products[0]!.id)
const selectedStepId = ref(productTourSteps[0]!.id)

const activeProduct = computed(() => products.find((product) => product.id === selectedProductId.value)!)
const activePreview = computed(() => getProductTourPreview(selectedProductId.value)!)

function selectProduct(id: string) {
  selectedProductId.value = id
}

function selectStep(id: typeof productTourSteps[number]['id']) {
  selectedStepId.value = id
}

// Column chrome (labels/colors) is identical across every product — only
// the sample rows inside (activePreview.*) change per product, pulled
// from content/product-tour.ts.
const workflowColumnLabels = ['New', 'In Progress', 'Done']
const statusClasses: Record<string, string> = {
  Active: 'bg-accent-green-500/10 text-accent-green-700',
  Pending: 'bg-accent-ice-400/10 text-accent-ice-600',
  Complete: 'bg-brand-100 text-brand-500'
}
const chartDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// A CSS-div bar chart reads as a wireframe placeholder, not a real chart.
// This builds an actual SVG line/area series (a smooth curve through the
// per-product trendValues, one consistent brand-colored stroke, a soft
// gradient fill, and a highlighted "peak day" point) — the shape real
// analytics widgets use, driven by data that's genuinely different per
// product instead of one bar-height array shared by all four.
const chartWidth = 300
const chartHeight = 120

// Classic "smooth line through points" trick: draw a quadratic Bézier
// from each point to the midpoint of it and the next point, using the
// point itself as the control — no charting library needed for a curve
// this simple.
function buildSmoothLinePath(points: { x: number, y: number }[]) {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0]!.x},${points[0]!.y}`
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

function buildChartSeries(values: number[]) {
  const points = values.map((value, index) => ({
    x: values.length > 1 ? (index / (values.length - 1)) * chartWidth : 0,
    y: chartHeight - (value / 100) * chartHeight
  }))
  const linePath = buildSmoothLinePath(points)
  const first = points[0]
  const last = points[points.length - 1]
  const areaPath = first && last ? `${linePath} L ${last.x},${chartHeight} L ${first.x},${chartHeight} Z` : ''
  const peakIndex = values.indexOf(Math.max(...values))
  const peakPoint = points[peakIndex]
  return {
    linePath,
    areaPath,
    peakPosition: peakPoint ? { left: `${(peakPoint.x / chartWidth) * 100}%`, top: `${(peakPoint.y / chartHeight) * 100}%` } : null
  }
}

// Overview shows the first five days (Mon-Fri); Insights shows the full
// week (Mon-Sat) — same split the previous static chart used.
const overviewChart = computed(() => buildChartSeries(activePreview.value.trendValues.slice(0, 5)))
const insightsChart = computed(() => buildChartSeries(activePreview.value.trendValues))

// Each Overview widget variant is looked up as its own typed computed so
// the template can narrow the discriminated union with a plain v-if/
// v-else-if chain instead of re-checking `.type` on every access.
const scheduleWidget = computed(() => (activePreview.value.overviewWidget.type === 'schedule' ? activePreview.value.overviewWidget : undefined))
const progressWidget = computed(() => (activePreview.value.overviewWidget.type === 'progress' ? activePreview.value.overviewWidget : undefined))
const pipelineWidget = computed(() => (activePreview.value.overviewWidget.type === 'pipeline' ? activePreview.value.overviewWidget : undefined))
const rankedWidget = computed(() => (activePreview.value.overviewWidget.type === 'ranked' ? activePreview.value.overviewWidget : undefined))

function pipelineStageWidth(count: number) {
  const stages = pipelineWidget.value?.stages ?? []
  const max = Math.max(...stages.map((stage) => stage.count), 1)
  return (count / max) * 100
}

const overviewCardAccents = ['border-t-brand-500', 'border-t-accent-ice-400', 'border-t-accent-green-500']
const overviewCardIconClasses = ['bg-brand-50 text-brand-500', 'bg-accent-ice-400/10 text-accent-ice-600', 'bg-accent-green-500/10 text-accent-green-700']
// Decorative, not real data — same "conceptual UI fixture" status as
// chartBarHeights above (identical across every product). A trend delta
// with no number at all reads as unfinished; this stays generic/non-
// specific rather than inventing a precise, product-sounding statistic.
const overviewTrendCycle = [
  { up: true, label: 'vs last week' },
  { up: true, label: 'vs last week' },
  { up: false, label: 'vs last week' }
]
const workflowColumnDots = ['bg-slate-400', 'bg-accent-ice-400', 'bg-accent-green-500']
const workflowColumnBorders = ['border-l-slate-300', 'border-l-accent-ice-400', 'border-l-accent-green-500']
// Cycled by index, not meaning — the same three generic PrincipleIcon
// shapes dress up both the metric cards and the sidebar nav items, since
// the labels themselves vary per product (Patient Queue vs. Work Orders
// vs. Accounts) and don't map to any one specific icon.
const genericIconCycle = ['chart', 'layers', 'target'] as const

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer id="product-tour" as="section" aria-labelledby="product-tour-heading" class="scroll-mt-20 bg-navy-950">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
            Product Tour
          </span>
          <h2 id="product-tour-heading" class="mt-3 text-h2 font-semibold tracking-tight text-white">
            Don&rsquo;t Just Read About It. Try It.
          </h2>
          <p class="mt-4 text-body-lg text-slate-200">
            See what your business could run on.
          </p>
        </div>

        <!-- Asymmetric, not a 50/50 split — the preview is the point, so
             it gets most of the width; the product list is a narrow rail. -->
        <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr] lg:gap-8 md:mt-10">
          <div>
            <h3 class="text-caption font-semibold tracking-widest text-slate-400 uppercase">
              Choose a Product
            </h3>
            <div
              role="group"
              aria-label="Natro products"
              class="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
            >
              <button
                v-for="product in products"
                :key="product.id"
                type="button"
                :aria-pressed="selectedProductId === product.id"
                class="shrink-0 rounded-(--radius-md) px-3 py-2 text-left text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white lg:shrink"
                :class="selectedProductId === product.id
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'"
                @click="selectProduct(product.id)"
              >
                {{ product.name }}
              </button>
            </div>

            <!-- Fills the rail instead of leaving it a short list next to a
                 much taller panel — real content (Product.shortDescription,
                 not invented copy) rather than decorative padding. -->
            <div class="mt-6 hidden flex-col gap-3 rounded-(--radius-lg) border border-white/10 bg-white/5 p-5 lg:flex">
              <span class="flex h-9 w-9 items-center justify-center rounded-(--radius-sm) bg-brand-500/20 text-brand-200" aria-hidden="true">
                <span class="h-4.5 w-4.5">
                  <PrincipleIcon id="layers" />
                </span>
              </span>
              <p class="text-body-sm text-slate-300">{{ activeProduct.shortDescription }}</p>
            </div>
          </div>

          <!-- The product interface itself — dominant, self-contained,
               with its own internal tab navigation rather than steps
               living in the outer rail. -->
          <div class="overflow-hidden rounded-(--radius-lg) border border-default bg-default shadow-lg">
            <!-- Window-chrome strip (macOS-style traffic-light dots) — the
                 same framing device most product screenshots on landing
                 pages use to read as "a captured window" rather than a
                 bare content block. Purely decorative, no fake URL/domain
                 text inside it (that would read as a specific, unverified
                 product claim). -->
            <div class="flex items-center gap-1.5 border-b border-default bg-elevated/60 px-4 py-2.5" aria-hidden="true">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-default bg-elevated px-5 py-3.5">
              <div>
                <p class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                  {{ activeProduct.name }}
                </p>
                <p class="text-caption text-muted">Interactive Preview</p>
              </div>
              <div class="flex items-center gap-4">
                <div role="group" aria-label="Product tour steps" class="flex flex-wrap gap-1">
                  <button
                    v-for="step in productTourSteps"
                    :key="step.id"
                    type="button"
                    :aria-pressed="selectedStepId === step.id"
                    class="rounded-(--radius-sm) px-2.5 py-1.5 text-caption font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                    :class="selectedStepId === step.id
                      ? 'bg-default text-brand-500 shadow-sm'
                      : 'text-muted hover:text-brand-500'"
                    @click="selectStep(step.id)"
                  >
                    {{ step.label }}
                  </button>
                </div>
                <!-- Purely decorative app-bar chrome (search / notifications
                     / avatar) — no real search or notifications exist, this
                     just gives the header the furniture a real product
                     screenshot would have instead of reading as a bare
                     tab bar. -->
                <div class="hidden items-center gap-3 border-l border-default pl-4 text-muted sm:flex" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-caption font-semibold text-white">
                    {{ activeProduct.name.charAt(0) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-stretch">
              <!-- Distinct bg from the content canvas (same bg-elevated
                   token the cards use) — a real app's nav rail and content
                   area are visually separate surfaces, not the same flat
                   white running underneath both. items-stretch above makes
                   this column match the content column's full height
                   instead of only being as tall as its own four links. -->
              <div class="border-b border-default bg-elevated p-3.5 sm:w-48 sm:shrink-0 sm:border-r sm:border-b-0">
                <p class="px-2 text-[0.6875rem] font-semibold tracking-widest text-muted/70 uppercase">Menu</p>
                <ul class="mt-2 flex gap-2 overflow-x-auto sm:flex-col sm:gap-1 sm:overflow-visible">
                  <li
                    v-for="(item, itemIndex) in activePreview.navItems"
                    :key="item"
                    class="flex shrink-0 items-center gap-2 rounded-(--radius-sm) px-2 py-1.5 text-body-sm sm:shrink"
                    :class="itemIndex === 0 ? 'bg-default font-medium text-brand-600 shadow-sm' : 'text-muted'"
                  >
                    <span class="h-4 w-4 shrink-0" :class="itemIndex === 0 ? 'text-brand-500' : 'text-muted/70'" aria-hidden="true">
                      <PrincipleIcon :id="genericIconCycle[itemIndex % genericIconCycle.length]!" />
                    </span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="relative min-h-[280px] flex-1 overflow-hidden bg-default p-5 md:p-6">
                <!-- Page toolbar: title + a decorative date-range pill and
                     export action. Stays fixed while the tab content below
                     crossfades — chrome that persists, content that
                     changes, the same pattern a real app uses. Neither
                     control does anything; both are aria-hidden. -->
                <div class="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-default pb-3">
                  <h3 class="text-h4 font-semibold tracking-tight text-highlighted">
                    {{ productTourSteps.find((step) => step.id === selectedStepId)?.label }}
                  </h3>
                  <div class="flex items-center gap-2" aria-hidden="true">
                    <span class="inline-flex items-center gap-1.5 rounded-(--radius-sm) border border-default px-3 py-1.5 text-caption font-medium text-muted">
                      This Week
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                    <span class="flex h-7 w-7 items-center justify-center rounded-(--radius-sm) border border-default text-muted">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
                        <path d="M12 3v12" />
                        <path d="m7 10 5 5 5-5" />
                        <path d="M5 19h14" />
                      </svg>
                    </span>
                  </div>
                </div>

                <Transition name="tour-preview">
                  <div :key="`${selectedProductId}-${selectedStepId}`">
                    <div v-if="selectedStepId === 'overview'">
                      <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_200px]">
                        <div>
                          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div
                              v-for="(metric, cardIndex) in activePreview.overviewMetrics"
                              :key="metric.label"
                              class="rounded-(--radius-md) border-t-2 border-default bg-elevated p-4"
                              :class="overviewCardAccents[cardIndex % overviewCardAccents.length]"
                            >
                              <div class="flex items-start justify-between">
                                <span
                                  class="flex h-8 w-8 items-center justify-center rounded-(--radius-sm)"
                                  :class="overviewCardIconClasses[cardIndex % overviewCardIconClasses.length]"
                                  aria-hidden="true"
                                >
                                  <span class="h-4 w-4">
                                    <PrincipleIcon :id="genericIconCycle[cardIndex % genericIconCycle.length]!" />
                                  </span>
                                </span>
                                <span
                                  class="flex items-center gap-0.5 text-caption font-medium"
                                  :class="overviewTrendCycle[cardIndex % overviewTrendCycle.length]!.up ? 'text-accent-green-700' : 'text-muted'"
                                  aria-hidden="true"
                                >
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" :class="{ 'rotate-180': !overviewTrendCycle[cardIndex % overviewTrendCycle.length]!.up }">
                                    <path d="M7 17 17 7" />
                                    <path d="M7 7h10v10" />
                                  </svg>
                                </span>
                              </div>
                              <p class="mt-3 text-caption text-muted">{{ metric.label }}</p>
                              <p class="mt-1.5 text-h4 font-semibold tracking-tight text-highlighted">{{ metric.value }}</p>
                            </div>
                          </div>
                          <p class="mt-5 text-caption font-semibold tracking-widest text-muted uppercase">{{ activePreview.trendLabel }}</p>
                          <div class="relative mt-2 h-28" aria-hidden="true">
                            <svg viewBox="0 0 300 120" preserveAspectRatio="none" class="h-full w-full overflow-visible">
                              <defs>
                                <linearGradient :id="`tour-chart-fill-${selectedProductId}-ov`" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" class="text-brand-500" stop-color="currentColor" stop-opacity="0.3" />
                                  <stop offset="100%" class="text-brand-500" stop-color="currentColor" stop-opacity="0" />
                                </linearGradient>
                              </defs>
                              <!-- Gridlines: faint ruled texture, no fabricated
                                   axis numbers (that would need a real,
                                   honest unit/scale behind it). -->
                              <g class="text-default/60" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" vector-effect="non-scaling-stroke">
                                <line x1="0" y1="30" x2="300" y2="30" />
                                <line x1="0" y1="60" x2="300" y2="60" />
                                <line x1="0" y1="90" x2="300" y2="90" />
                              </g>
                              <line x1="0" y1="119" x2="300" y2="119" class="text-default" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
                              <path :d="overviewChart.areaPath" :fill="`url(#tour-chart-fill-${selectedProductId}-ov)`" stroke="none" />
                              <path :d="overviewChart.linePath" class="text-brand-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                            </svg>
                            <!-- Peak-day marker as an HTML dot (not an SVG
                                 circle) positioned by percentage — the SVG
                                 above intentionally scales x/y independently
                                 (categories vs. value scale, like any real
                                 chart), which would otherwise stretch a
                                 circle into an ellipse. -->
                            <span
                              v-if="overviewChart.peakPosition"
                              class="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-500 shadow-sm dark:border-default"
                              :style="overviewChart.peakPosition"
                            />
                          </div>
                          <div class="mt-1.5 flex gap-2 text-caption text-muted" aria-hidden="true">
                            <span v-for="label in chartDayLabels.slice(0, 5)" :key="label" class="w-full text-center">{{ label }}</span>
                          </div>
                        </div>

                        <!-- The Overview tab's secondary panel used to be the
                             exact same "Recent Activity" status-dot list for
                             every product — one of the reasons all four
                             dashboards looked like the same template with
                             different words. Each product now gets a widget
                             shaped like how that business actually tracks
                             its day. -->
                        <div class="border-t border-default pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                          <p class="text-caption font-semibold tracking-widest text-muted uppercase">{{ activePreview.overviewWidget.title }}</p>

                          <ul v-if="scheduleWidget" class="mt-3 space-y-3">
                            <li v-for="item in scheduleWidget.items" :key="item.time" class="flex items-start gap-3">
                              <span class="w-[4.25rem] shrink-0 text-caption font-medium text-muted">{{ item.time }}</span>
                              <div class="min-w-0 border-l-2 border-brand-200 pl-3">
                                <p class="truncate text-body-sm font-medium text-default">{{ item.title }}</p>
                                <p class="truncate text-caption text-muted">{{ item.subtitle }}</p>
                              </div>
                            </li>
                          </ul>

                          <ul v-else-if="progressWidget" class="mt-3 space-y-4">
                            <li v-for="item in progressWidget.items" :key="item.label">
                              <div class="flex items-center justify-between gap-2 text-caption">
                                <span class="truncate font-medium text-default">{{ item.label }}</span>
                                <span class="shrink-0 text-muted">{{ item.percent }}%</span>
                              </div>
                              <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
                                <div class="h-full rounded-full bg-brand-500" :style="{ width: `${item.percent}%` }" />
                              </div>
                            </li>
                          </ul>

                          <ul v-else-if="pipelineWidget" class="mt-3 space-y-4">
                            <li v-for="stage in pipelineWidget.stages" :key="stage.label">
                              <div class="flex items-center justify-between gap-2 text-caption">
                                <span class="truncate font-medium text-default">{{ stage.label }}</span>
                                <span class="shrink-0 text-muted">{{ stage.count }}</span>
                              </div>
                              <div class="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-elevated">
                                <div class="h-full rounded-full bg-accent-ice-400" :style="{ width: `${pipelineStageWidth(stage.count)}%` }" />
                              </div>
                            </li>
                          </ul>

                          <ul v-else-if="rankedWidget" class="mt-3 space-y-3">
                            <li v-for="(item, rankIndex) in rankedWidget.items" :key="item.label" class="flex items-center gap-3">
                              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[0.6875rem] font-semibold text-brand-600">
                                {{ rankIndex + 1 }}
                              </span>
                              <span class="min-w-0 flex-1 truncate text-body-sm font-medium text-default">{{ item.label }}</span>
                              <span class="shrink-0 text-caption text-muted">{{ item.value }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div v-else-if="selectedStepId === 'workflow'">
                      <div class="grid grid-cols-3 gap-4">
                        <div v-for="(column, columnIndex) in workflowColumnLabels" :key="column">
                          <p class="flex items-center gap-1.5 text-caption font-medium text-muted">
                            <span class="h-1.5 w-1.5 rounded-full" :class="workflowColumnDots[columnIndex]" aria-hidden="true" />
                            {{ column }}
                          </p>
                          <div class="mt-2 space-y-2">
                            <div
                              v-for="item in activePreview.workflowColumns[columnIndex]"
                              :key="item"
                              class="flex h-10 items-center truncate rounded-(--radius-sm) border-l-2 bg-elevated px-3 text-caption text-default"
                              :class="workflowColumnBorders[columnIndex]"
                            >
                              {{ item }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else-if="selectedStepId === 'operations'">
                      <div class="overflow-x-auto">
                        <table class="w-full text-left text-body-sm">
                          <thead>
                            <tr class="border-b border-default text-caption text-muted">
                              <th class="py-2 pr-4 font-medium">Reference</th>
                              <th class="py-2 pr-4 font-medium">Detail</th>
                              <th class="py-2 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="row in activePreview.operationsRows" :key="row.reference" class="border-b border-default last:border-0">
                              <td class="py-3 pr-4 font-medium text-default">{{ row.reference }}</td>
                              <td class="py-3 pr-4 text-muted">{{ row.detail }}</td>
                              <td class="py-3">
                                <span
                                  class="inline-flex rounded-full px-2 py-0.5 text-caption font-medium"
                                  :class="statusClasses[row.status]"
                                >
                                  {{ row.status }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div v-else>
                      <p class="text-caption font-semibold tracking-widest text-muted uppercase">{{ activePreview.trendLabel }}</p>
                      <div class="relative mt-3 h-40" aria-hidden="true">
                        <svg viewBox="0 0 300 120" preserveAspectRatio="none" class="h-full w-full overflow-visible">
                          <defs>
                            <linearGradient :id="`tour-chart-fill-${selectedProductId}-in`" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" class="text-brand-500" stop-color="currentColor" stop-opacity="0.3" />
                              <stop offset="100%" class="text-brand-500" stop-color="currentColor" stop-opacity="0" />
                            </linearGradient>
                          </defs>
                          <g class="text-default/60" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" vector-effect="non-scaling-stroke">
                            <line x1="0" y1="30" x2="300" y2="30" />
                            <line x1="0" y1="60" x2="300" y2="60" />
                            <line x1="0" y1="90" x2="300" y2="90" />
                          </g>
                          <line x1="0" y1="119" x2="300" y2="119" class="text-default" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
                          <path :d="insightsChart.areaPath" :fill="`url(#tour-chart-fill-${selectedProductId}-in)`" stroke="none" />
                          <path :d="insightsChart.linePath" class="text-brand-500" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                        </svg>
                        <span
                          v-if="insightsChart.peakPosition"
                          class="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-500 shadow-sm dark:border-default"
                          :style="insightsChart.peakPosition"
                        />
                      </div>
                      <div class="mt-1.5 flex gap-2 text-caption text-muted" aria-hidden="true">
                        <span v-for="label in chartDayLabels" :key="label" class="w-full text-center">{{ label }}</span>
                      </div>
                      <p class="mt-4 text-caption text-muted">
                        Conceptual preview &mdash; not connected to live data.
                      </p>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
