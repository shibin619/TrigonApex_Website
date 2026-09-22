<script setup lang="ts">
import { analyticsActivities, analyticsHighlights } from '~/content/business-analytics'

// Two layers: a static positioning diagram (Business Operations → Data →
// Insights → Better Decisions) that states the section's core message at
// a glance, then a small real interaction beneath it — selecting a
// business-activity category highlights the one insight it conceptually
// feeds. Local component state only; nothing here is live data (per the
// mandatory "Illustrative example" caption on the chart below).
const selectedActivityId = ref(analyticsActivities[0]!.id)

const activeActivity = computed(() => analyticsActivities.find((activity) => activity.id === selectedActivityId.value)!)
const activeHighlight = computed(() => analyticsHighlights.find((highlight) => highlight.id === activeActivity.value.insightId)!)

function selectActivity(id: string) {
  selectedActivityId.value = id
}

const chartBarHeights = ['30%', '55%', '40%', '70%', '50%']

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
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

        <!-- Positioning diagram: states the core message at a glance. -->
        <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 md:mt-12">
          <span class="rounded-full border border-default px-4 py-2 text-body-sm font-medium text-default">
            Business Operations
          </span>
          <span class="text-muted" aria-hidden="true">
            <span class="sm:hidden">&darr;</span>
            <span class="hidden sm:inline">&rarr;</span>
          </span>
          <span class="rounded-full border border-default px-4 py-2 text-body-sm font-medium text-default">
            Data
          </span>
          <span class="text-muted" aria-hidden="true">
            <span class="sm:hidden">&darr;</span>
            <span class="hidden sm:inline">&rarr;</span>
          </span>
          <span class="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 text-body-sm font-medium text-brand-500">
            Insights
          </span>
          <span class="text-muted" aria-hidden="true">
            <span class="sm:hidden">&darr;</span>
            <span class="hidden sm:inline">&rarr;</span>
          </span>
          <span class="rounded-full bg-navy-900 px-4 py-2 text-body-sm font-medium text-white">
            Better Decisions
          </span>
        </div>

        <!-- Interactive exploration lives in one cohesive panel — a
             single bordered surface groups the selector, the connection
             sentence, the insights, and the chart as one system, rather
             than four loose floating pieces. -->
        <div class="mt-10 rounded-(--radius-lg) border border-default bg-elevated p-6 md:mt-12 md:p-8">
          <h3 class="text-caption font-semibold tracking-widest text-muted uppercase">
            Business Activity
          </h3>
          <div role="group" aria-label="Business activity categories" class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="activity in analyticsActivities"
              :key="activity.id"
              type="button"
              :aria-pressed="selectedActivityId === activity.id"
              class="rounded-(--radius-md) border border-default bg-default px-3 py-2 text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              :class="selectedActivityId === activity.id
                ? 'border-brand-300 bg-brand-50 text-brand-500'
                : 'text-default hover:border-brand-300 hover:text-brand-500'"
              @click="selectActivity(activity.id)"
            >
              {{ activity.label }}
            </button>
          </div>

          <p class="mt-4 text-body-sm text-muted">
            {{ activeActivity.label }} data feeds into
            <span class="font-semibold text-brand-500">{{ activeHighlight.title }}</span>
            insights.
          </p>

          <div class="mt-6 border-t border-default pt-6">
            <h3 class="text-caption font-semibold tracking-widest text-muted uppercase">
              Insights
            </h3>
            <!-- Only the active insight gets a card treatment — the other
                 three stay as plain text so this doesn't read as four
                 identical boxes. -->
            <div class="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="highlight in analyticsHighlights"
                :key="highlight.id"
                class="rounded-(--radius-md) border p-4 motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                :class="highlight.id === activeHighlight.id
                  ? 'border-brand-300 bg-default shadow-sm'
                  : 'border-transparent'"
              >
                <p
                  class="text-body font-semibold"
                  :class="highlight.id === activeHighlight.id ? 'text-brand-500' : 'text-highlighted'"
                >
                  {{ highlight.title }}
                </p>
                <p class="mt-1 text-body-sm text-muted">{{ highlight.description }}</p>
              </div>
            </div>
          </div>

          <!-- Conceptual chart. Abstract/unlabeled per
               docs/HOMEPAGE_SPEC.md §11 — the "Illustrative example"
               caption is non-negotiable. -->
          <div class="mt-6 border-t border-default pt-6">
            <div class="flex h-20 max-w-md items-end gap-2" aria-hidden="true">
              <div
                v-for="(height, i) in chartBarHeights"
                :key="i"
                class="relative w-full rounded-t bg-brand-100"
                :style="{ height }"
              >
                <span class="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500" />
              </div>
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
