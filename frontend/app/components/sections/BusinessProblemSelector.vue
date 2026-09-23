<script setup lang="ts">
import { businessProblems } from '~/content/business-problems'

// Not a filter — selecting a problem never hides/changes the other four;
// it only sets the local "active" state and attempts to jump to the
// matching future Solution (see useScrollHighlight.ts). Safe no-op today
// since Stage 8F hasn't built the Solutions section yet.
const activeId = ref<string | null>(null)

const { scrollToAndHighlight } = useScrollHighlight()

function selectProblem(id: string, solutionId: string) {
  activeId.value = id
  scrollToAndHighlight(`solution-${solutionId}`)
}

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="problem-selector-heading" spacing="compact" class="bg-elevated">
    <PageContainer as="div">
      <div ref="contentRef">
        <SplitLayout>
          <template #content>
            <div class="lg:sticky lg:top-28">
              <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                Business Diagnostic
              </span>
              <h2 id="problem-selector-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
                What&rsquo;s Holding Your Business Back?
              </h2>
              <p class="mt-4 max-w-md text-body-lg text-muted">
                Growth often stalls not from lack of effort, but because
                customer information, operations, and decision-making run
                in disconnected systems. Select what applies.
              </p>
            </div>
          </template>

          <template #visual>
            <!-- A diagnostic list, not a card grid — one item open at a
                 time, its answer appearing inline where you clicked
                 rather than in a separate panel elsewhere on the page. -->
            <div role="group" aria-label="Business problem categories" class="border-t border-default">
              <div v-for="(problem, index) in businessProblems" :key="problem.id" class="border-b border-default">
                <button
                  type="button"
                  :aria-pressed="activeId === problem.id"
                  :aria-label="problem.ariaLabel"
                  class="flex w-full items-baseline gap-4 py-5 text-left motion-safe:transition-colors motion-safe:duration-(--duration-fast) focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                  @click="selectProblem(problem.id, problem.solutionId)"
                >
                  <span
                    class="text-body-sm font-semibold tabular-nums motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="activeId === problem.id ? 'text-brand-500' : 'text-muted'"
                  >
                    0{{ index + 1 }}
                  </span>
                  <span
                    class="text-h4 font-semibold tracking-tight motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="activeId === problem.id ? 'text-brand-500' : 'text-highlighted'"
                  >
                    {{ problem.title }}
                  </span>
                </button>

                <div v-if="activeId === problem.id" class="pb-6 pl-9">
                  <p class="max-w-md text-body text-default">
                    {{ problem.description }}
                  </p>
                  <p class="mt-3 text-body-sm font-medium text-brand-500">
                    &rarr; Connects to our {{ problem.solutionLabel }} solution
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
