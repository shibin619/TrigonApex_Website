<script setup lang="ts">
import { analyticsActivities, analyticsHighlights } from '~/content/business-analytics'

// Same SplitLayout + expand-in-place list device as BusinessProblemSelector
// (the section directly above this one) rather than a dashboard-style
// component — light, typographic, consistent with the rest of the page.
// Selecting a business-activity row reveals its matching Data/Insight/
// Decision directly beneath it, in place, instead of a separate panel.
const selectedActivityId = ref<string | null>(null)

function selectActivity(id: string) {
  selectedActivityId.value = selectedActivityId.value === id ? null : id
}

function highlightFor(activityId: string) {
  const activity = analyticsActivities.find((item) => item.id === activityId)
  return analyticsHighlights.find((highlight) => highlight.id === activity?.insightId)
}

// A small fixed illustrative shape per row (never framed as a real
// measurement — see the mandatory caption below each reveal). Same
// values regardless of which activity is open; the point is the shape
// of a trend line, not a specific number.
const sparklineValues = [38, 58, 46, 72, 54, 80, 62]
const sparkWidth = 240
const sparkHeight = 56
const sparkPoints = sparklineValues.map((value, i) => ({
  x: (i / (sparklineValues.length - 1)) * sparkWidth,
  y: sparkHeight - (value / 100) * (sparkHeight - 8)
}))
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
const sparklinePath = buildSmoothLinePath(sparkPoints)
const sparklineAreaPath = `${sparklinePath} L ${sparkWidth},${sparkHeight} L 0,${sparkHeight} Z`

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="business-analytics-heading" spacing="compact">
    <PageContainer as="div">
      <div ref="contentRef">
        <SplitLayout>
          <template #content>
            <div class="lg:sticky lg:top-28">
              <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                Business Analytics
              </span>
              <h2 id="business-analytics-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
                Your Business Is Already Generating Data.
              </h2>
              <p class="mt-4 max-w-md text-body-lg text-muted">
                Your software should not only record what happens. It
                should help you understand what is happening and where
                the business can improve. Select a business activity to
                see the chain &mdash; data, insight, decision.
              </p>
            </div>
          </template>

          <template #visual>
            <div role="group" aria-label="Business activity categories" class="border-t border-default">
              <div
                v-for="(activity, index) in analyticsActivities"
                :key="activity.id"
                class="border-b border-default motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                :class="selectedActivityId === activity.id ? 'bg-brand-50/60' : ''"
              >
                <button
                  type="button"
                  :aria-pressed="selectedActivityId === activity.id"
                  class="group flex w-full items-center gap-4 py-5 pr-2 pl-4 -ml-4 text-left motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-brand-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                  :class="selectedActivityId === activity.id ? 'border-l-2 border-brand-500' : 'border-l-2 border-transparent'"
                  @click="selectActivity(activity.id)"
                >
                  <span
                    class="text-body-sm font-semibold tabular-nums motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="selectedActivityId === activity.id ? 'text-brand-500' : 'text-muted'"
                  >
                    0{{ index + 1 }}
                  </span>
                  <span
                    class="flex-1 text-h4 font-semibold tracking-tight motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="selectedActivityId === activity.id ? 'text-brand-500' : 'text-highlighted'"
                  >
                    {{ activity.label }}
                  </span>
                  <span
                    class="shrink-0 text-body text-muted transition-transform motion-safe:duration-(--duration-fast)"
                    :class="selectedActivityId === activity.id ? 'rotate-90 text-brand-500' : ''"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </button>

                <div v-if="selectedActivityId === activity.id" class="pb-7 pl-14 sm:pl-20">
                  <div class="h-14 w-full max-w-60" aria-hidden="true">
                    <svg viewBox="0 0 240 56" preserveAspectRatio="none" class="h-full w-full overflow-visible">
                      <defs>
                        <linearGradient :id="`ba-spark-fill-${activity.id}`" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="var(--color-accent-green-500)" stop-opacity="0.22" />
                          <stop offset="100%" stop-color="var(--color-accent-green-500)" stop-opacity="0" />
                        </linearGradient>
                      </defs>
                      <path :d="sparklineAreaPath" :fill="`url(#ba-spark-fill-${activity.id})`" stroke="none" />
                      <path :d="sparklinePath" fill="none" stroke="var(--color-accent-green-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                    </svg>
                  </div>

                  <p class="mt-4 max-w-md text-body text-default">
                    <span class="font-semibold text-highlighted">{{ highlightFor(activity.id)?.title }}.</span>
                    {{ ' ' }}{{ highlightFor(activity.id)?.description }}
                  </p>
                  <p class="mt-4 max-w-md border-l-2 border-accent-green-500 pl-3 text-body-sm font-semibold text-accent-green-700">
                    {{ highlightFor(activity.id)?.decision }}
                  </p>
                  <p class="mt-4 text-caption text-muted">
                    Illustrative example &mdash; not real business data.
                  </p>
                </div>
              </div>
            </div>
          </template>
        </SplitLayout>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
