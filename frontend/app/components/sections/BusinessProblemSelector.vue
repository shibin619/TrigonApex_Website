<script setup lang="ts">
import { businessProblems } from '~/content/business-problems'

// Not a filter — selecting a problem never hides/changes the other four;
// it only sets the local "active" state and attempts to jump to the
// matching future Solution (see useScrollHighlight.ts). Safe no-op today
// since Stage 8F hasn't built the Solutions section yet.
const activeId = ref<string | null>(null)
const activeProblem = computed(() => businessProblems.find((p) => p.id === activeId.value) ?? null)

const { scrollToAndHighlight } = useScrollHighlight()

function selectProblem(id: string, solutionId: string) {
  activeId.value = id
  scrollToAndHighlight(`solution-${solutionId}`)
}

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="problem-selector-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <h2 id="problem-selector-heading" class="text-h2 font-semibold tracking-tight text-highlighted">
            What&rsquo;s Holding Your Business Back?
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Growth often stalls not from lack of effort, but because
            customer information, operations, and decision-making run in
            disconnected systems. Select what applies to see the kind of
            solution that addresses it.
          </p>
        </div>

        <!-- One unified diagnostic strip, not five separate cards: a
             single outer border with hairline dividers between items
             (not a bordered box per item). Desktop: compact row. Mobile:
             stacked list — five narrow columns or a scroll-snap carousel
             would both hurt usability at 320px, so mobile gets its own
             full-width layout rather than a shrunk desktop grid. -->
        <div
          role="group"
          aria-label="Business problem categories"
          class="mt-10 flex flex-col divide-y divide-default overflow-hidden rounded-(--radius-md) border border-default md:flex-row md:divide-x md:divide-y-0"
        >
          <button
            v-for="problem in businessProblems"
            :key="problem.id"
            type="button"
            :aria-pressed="activeId === problem.id"
            :aria-label="problem.ariaLabel"
            class="motion-safe:transition-colors motion-safe:duration-(--duration-fast) flex flex-1 items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary md:flex-col md:items-start md:gap-4 md:p-5"
            :class="activeId === problem.id
              ? 'bg-brand-50 text-brand-500'
              : 'text-default hover:bg-elevated hover:text-brand-500'"
            @click="selectProblem(problem.id, problem.solutionId)"
          >
            <span aria-hidden="true">
              <!-- Get more customers -->
              <svg v-if="problem.id === 'get-more-customers'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="15" r="4" />
                <path d="M13 11L19 5" />
                <path d="M14 5h5v5" />
              </svg>
              <!-- Manage operations -->
              <svg v-else-if="problem.id === 'manage-operations'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <path d="M10 10L14 14" />
              </svg>
              <!-- Automate repetitive work -->
              <svg v-else-if="problem.id === 'automate-repetitive-work'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12a7 7 0 1 1 2.1 5" />
                <path d="M4 19v-4h4" />
              </svg>
              <!-- Understand business data -->
              <svg v-else-if="problem.id === 'understand-business-data'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="14" width="3.5" height="6" rx="1" />
                <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
                <rect x="16.5" y="4" width="3.5" height="16" rx="1" />
              </svg>
              <!-- Scale the business -->
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20L5 8" />
                <path d="M5 12V8h4" />
                <path d="M12 20L19 8" />
                <path d="M15 8h4v4" />
              </svg>
            </span>

            <span class="text-body font-medium">{{ problem.title }}</span>
          </button>
        </div>

        <!-- Single reveal panel — only the selected problem's detail
             shows, so five descriptions are never on screen at once
             (avoids reading as a generic feature grid). -->
        <div class="mt-6 min-h-0">
          <BaseCard v-if="activeProblem" variant="bordered" class="max-w-2xl">
            <p class="text-body text-default">
              {{ activeProblem.description }}
            </p>
            <p class="mt-3 text-body-sm font-medium text-brand-500">
              → Connects to our {{ activeProblem.solutionLabel }} solution
            </p>
          </BaseCard>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
