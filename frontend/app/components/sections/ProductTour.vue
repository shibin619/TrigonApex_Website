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

// Purely decorative demo content, identical across every product — the
// same neutral "workflow"/"operations" shell communicates the type of
// software experience without claiming any specific verified capability.
const workflowColumns = ['New', 'In Progress', 'Done']
const operationsRows = [
  { reference: 'Item 1', status: 'Active' },
  { reference: 'Item 2', status: 'Pending' },
  { reference: 'Item 3', status: 'Complete' },
  { reference: 'Item 4', status: 'Active' }
]
const statusClasses: Record<string, string> = {
  Active: 'bg-accent-green-500/10 text-accent-green-700',
  Pending: 'bg-accent-ice-400/10 text-accent-ice-600',
  Complete: 'bg-brand-100 text-brand-500'
}
const chartBarHeights = ['35%', '60%', '48%', '80%', '55%', '70%']
const overviewCardAccents = ['border-t-brand-500', 'border-t-accent-ice-400', 'border-t-accent-green-500']
const overviewChartColors = ['bg-brand-200', 'bg-accent-ice-400', 'bg-brand-300', 'bg-accent-green-500', 'bg-brand-200']
const workflowColumnDots = ['bg-slate-400', 'bg-accent-ice-400', 'bg-accent-green-500']
const workflowColumnBorders = ['border-l-slate-300', 'border-l-accent-ice-400', 'border-l-accent-green-500']

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
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-default bg-elevated px-5 py-4">
              <div>
                <p class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                  {{ activeProduct.name }}
                </p>
                <p class="text-caption text-muted">Interactive Preview</p>
              </div>
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
            </div>

            <div class="flex flex-col sm:flex-row">
              <div class="border-b border-default p-4 sm:w-40 sm:shrink-0 sm:border-r sm:border-b-0">
                <ul class="flex gap-2 overflow-x-auto sm:flex-col sm:gap-1 sm:overflow-visible">
                  <li
                    v-for="item in activePreview.navItems"
                    :key="item"
                    class="shrink-0 rounded-(--radius-sm) px-2 py-1.5 text-body-sm text-muted sm:shrink"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="relative min-h-[320px] flex-1 overflow-hidden p-6 md:p-8">
                <Transition name="tour-preview">
                  <div :key="`${selectedProductId}-${selectedStepId}`">
                    <div v-if="selectedStepId === 'overview'">
                      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div
                          v-for="(card, cardIndex) in activePreview.navItems.slice(0, 3)"
                          :key="card"
                          class="rounded-(--radius-md) border-t-2 border-default bg-elevated p-4"
                          :class="overviewCardAccents[cardIndex % overviewCardAccents.length]"
                        >
                          <p class="text-caption text-muted">{{ card }}</p>
                          <div class="mt-2 h-2 w-3/4 rounded-full bg-brand-100" aria-hidden="true" />
                        </div>
                      </div>
                      <div class="mt-6 flex h-24 items-end gap-2" aria-hidden="true">
                        <div
                          v-for="(height, i) in chartBarHeights.slice(0, 5)"
                          :key="i"
                          class="w-full rounded-t"
                          :class="overviewChartColors[i % overviewChartColors.length]"
                          :style="{ height }"
                        />
                      </div>
                    </div>

                    <div v-else-if="selectedStepId === 'workflow'">
                      <div class="grid grid-cols-3 gap-4">
                        <div v-for="(column, columnIndex) in workflowColumns" :key="column">
                          <p class="flex items-center gap-1.5 text-caption font-medium text-muted">
                            <span class="h-1.5 w-1.5 rounded-full" :class="workflowColumnDots[columnIndex]" aria-hidden="true" />
                            {{ column }}
                          </p>
                          <div class="mt-2 space-y-2">
                            <div class="flex h-10 items-center rounded-(--radius-sm) border-l-2 bg-elevated px-3 text-caption text-muted" :class="workflowColumnBorders[columnIndex]">
                              Item
                            </div>
                            <div class="flex h-10 items-center rounded-(--radius-sm) border-l-2 bg-elevated px-3 text-caption text-muted" :class="workflowColumnBorders[columnIndex]">
                              Item
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
                              <th class="py-2 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="row in operationsRows" :key="row.reference" class="border-b border-default last:border-0">
                              <td class="py-3 pr-4 text-default">{{ row.reference }}</td>
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
                      <div class="flex h-40 items-end gap-2" aria-hidden="true">
                        <div
                          v-for="(height, i) in chartBarHeights"
                          :key="i"
                          class="w-full rounded-t"
                          :class="overviewChartColors[i % overviewChartColors.length]"
                          :style="{ height }"
                        />
                      </div>
                      <p class="mt-3 text-caption text-muted">
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
