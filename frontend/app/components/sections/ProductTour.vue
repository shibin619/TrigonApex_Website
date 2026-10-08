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
const chartBarHeights = ['35%', '60%', '48%', '80%', '55%', '70%']
// A real chart uses ONE consistent color for a single metric's series —
// cycling a different color per bar (the previous version) is a strong
// "obviously fake" tell. Every bar is the same muted brand tint except
// the tallest one (today/the standout day), which gets the solid accent
// — the single-highlighted-bar pattern real analytics widgets use.
const peakBarIndex = chartBarHeights.indexOf('80%')
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
const statusDotClasses: Record<string, string> = {
  Active: 'bg-accent-green-500',
  Pending: 'bg-accent-ice-400',
  Complete: 'bg-brand-400'
}

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
        <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-10 md:mt-12">
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
                class="shrink-0 rounded-(--radius-md) px-3 py-2.5 text-left text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white lg:shrink"
                :class="selectedProductId === product.id
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'"
                @click="selectProduct(product.id)"
              >
                {{ product.name }}
              </button>
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

            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-default bg-elevated px-5 py-4">
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

            <div class="flex flex-col sm:flex-row">
              <div class="border-b border-default p-4 sm:w-44 sm:shrink-0 sm:border-r sm:border-b-0">
                <ul class="flex gap-2 overflow-x-auto sm:flex-col sm:gap-1 sm:overflow-visible">
                  <li
                    v-for="(item, itemIndex) in activePreview.navItems"
                    :key="item"
                    class="flex shrink-0 items-center gap-2 rounded-(--radius-sm) px-2 py-1.5 text-body-sm sm:shrink"
                    :class="itemIndex === 0 ? 'bg-brand-50 font-medium text-brand-600' : 'text-muted'"
                  >
                    <span class="h-4 w-4 shrink-0" :class="itemIndex === 0 ? 'text-brand-500' : 'text-muted/70'" aria-hidden="true">
                      <PrincipleIcon :id="genericIconCycle[itemIndex % genericIconCycle.length]!" />
                    </span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="relative min-h-[320px] flex-1 overflow-hidden p-6 md:p-8">
                <Transition name="tour-preview">
                  <div :key="`${selectedProductId}-${selectedStepId}`">
                    <div v-if="selectedStepId === 'overview'">
                      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_200px]">
                        <div>
                          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                          <div class="mt-6 flex h-28 items-end gap-2 border-b border-default pb-0" aria-hidden="true">
                            <div
                              v-for="(height, i) in chartBarHeights.slice(0, 5)"
                              :key="i"
                              class="w-full rounded-t"
                              :class="i === peakBarIndex ? 'bg-brand-500' : 'bg-brand-100'"
                              :style="{ height }"
                            />
                          </div>
                          <div class="mt-1.5 flex gap-2 text-caption text-muted" aria-hidden="true">
                            <span v-for="label in chartDayLabels.slice(0, 5)" :key="label" class="w-full text-center">{{ label }}</span>
                          </div>
                        </div>

                        <!-- Reuses the same operationsRows data the Operations
                             tab shows (already illustrative/fictional per
                             product-tour.ts, not new invented content) as a
                             compact activity feed — real dashboards pair a
                             chart with a recent-activity list, and it fills
                             the panel's height on this tab instead of
                             leaving it visibly emptier than the others. -->
                        <div class="border-t border-default pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                          <p class="text-caption font-semibold tracking-widest text-muted uppercase">Recent Activity</p>
                          <ul class="mt-3 space-y-3">
                            <li v-for="row in activePreview.operationsRows.slice(0, 4)" :key="row.reference" class="flex items-start gap-2">
                              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" :class="statusDotClasses[row.status]" aria-hidden="true" />
                              <div class="min-w-0">
                                <p class="truncate text-body-sm font-medium text-default">{{ row.reference }}</p>
                                <p class="truncate text-caption text-muted">{{ row.detail }}</p>
                              </div>
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
                      <p class="text-caption font-semibold tracking-widest text-muted uppercase">This Week</p>
                      <div class="mt-3 flex h-40 items-end gap-2 border-b border-default pb-0" aria-hidden="true">
                        <div
                          v-for="(height, i) in chartBarHeights"
                          :key="i"
                          class="w-full rounded-t"
                          :class="i === peakBarIndex ? 'bg-brand-500' : 'bg-brand-100'"
                          :style="{ height }"
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
