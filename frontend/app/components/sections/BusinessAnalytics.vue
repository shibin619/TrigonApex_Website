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

        <!-- The four stages of the chain, walked in order. Each stage is
             a labeled block, not a card — the progression itself is the
             visual, not a decorated container around it. -->
        <div class="mt-12 md:mt-16">
          <div class="border-t border-default py-8 md:py-10">
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

          <div class="border-t border-default py-8 md:py-10">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">02 &mdash; Data</span>
            <div class="mt-4 flex h-16 max-w-md items-end gap-2" aria-hidden="true">
              <div
                v-for="(height, i) in chartBarHeights"
                :key="i"
                class="w-full rounded-t bg-brand-100"
                :style="{ height }"
              />
            </div>
          </div>

          <div class="border-t border-default py-8 md:py-10">
            <span class="text-caption font-semibold tracking-widest text-muted uppercase">03 &mdash; Insight</span>
            <p class="mt-4 max-w-lg text-h4 font-semibold tracking-tight text-highlighted">
              {{ activeHighlight.title }}
            </p>
            <p class="mt-2 max-w-md text-body text-default">
              {{ activeHighlight.description }}
            </p>
          </div>

          <div class="border-t border-b border-default py-8 md:py-10">
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
