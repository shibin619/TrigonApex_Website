<script setup lang="ts">
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

        <!-- The four stages of the chain, walked in order, tied together
             by a colored spine (brand → ice → green) running down the
             left edge — the progression itself is the visual. -->
        <div class="relative mt-12 pl-8 md:mt-16 md:pl-10">
          <div
            class="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-brand-400 via-accent-ice-400 to-accent-green-500 md:left-[15px]"
            aria-hidden="true"
          />

          <div class="relative border-t border-default py-8 md:py-10">
            <span class="absolute top-9 -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white md:-left-10 md:h-8 md:w-8" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 md:h-4 md:w-4"><path d="M4 4h16v4H4z" /><path d="M4 12h10v8H4z" /><path d="M16 12h4v8h-4z" /></svg>
            </span>
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">01 &mdash; Business Activity</span>
            <div role="group" aria-label="Business activity categories" class="mt-4 flex flex-wrap gap-2">
              <button
                v-for="activity in analyticsActivities"
                :key="activity.id"
                type="button"
                :aria-pressed="selectedActivityId === activity.id"
                class="rounded-(--radius-md) border px-4 py-2.5 text-body-sm font-medium motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                :class="selectedActivityId === activity.id
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-default text-default hover:border-brand-300 hover:text-brand-500'"
                @click="selectActivity(activity.id)"
              >
                {{ activity.label }}
              </button>
            </div>
          </div>

          <div class="relative border-t border-default py-8 md:py-10">
            <span class="absolute top-9 -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-accent-ice-400 text-white md:-left-10 md:h-8 md:w-8" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 md:h-4 md:w-4"><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 5-6" /></svg>
            </span>
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">02 &mdash; Data</span>
            <div class="mt-5 max-w-lg rounded-(--radius-lg) border border-default bg-elevated p-5">
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
                  <div class="absolute bottom-0 w-full rounded-t bg-brand-200" :style="{ height: `${height}%` }" />
                  <div
                    class="absolute bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-accent-green-500"
                    :style="{ height: `${secondarySeries[i]}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="relative border-t border-default py-8 md:py-10">
            <span class="absolute top-9 -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-accent-ice-600 text-white md:-left-10 md:h-8 md:w-8" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 md:h-4 md:w-4"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            </span>
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">03 &mdash; Insight</span>
            <p class="mt-4 max-w-lg text-h4 font-semibold tracking-tight text-highlighted">
              {{ activeHighlight.title }}
            </p>
            <p class="mt-2 max-w-md text-body text-default">
              {{ activeHighlight.description }}
            </p>
          </div>

          <div class="relative border-t border-b border-default py-8 md:py-10">
            <span class="absolute top-9 -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-accent-green-500 text-white md:-left-10 md:h-8 md:w-8" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 md:h-4 md:w-4"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">04 &mdash; Decision</span>
            <p class="mt-4 max-w-lg text-h4 font-semibold tracking-tight text-brand-500">
              {{ activeHighlight.decision }}
            </p>
            <p class="mt-3 text-caption text-muted">
              Illustrative example &mdash; not real business data.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
