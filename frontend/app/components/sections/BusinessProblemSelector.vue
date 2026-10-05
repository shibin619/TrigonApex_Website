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
                 rather than in a separate panel elsewhere on the page.
                 Each row reuses the matching Solution's own icon
                 (solutionId already maps 1:1 to SolutionIcon's ids) so
                 the connection to "this becomes a real solution below"
                 is visible before you even click, not just stated in the
                 answer text. -->
            <div role="group" aria-label="Business problem categories" class="border-t border-default">
              <div
                v-for="(problem, index) in businessProblems"
                :key="problem.id"
                class="border-b border-default motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                :class="activeId === problem.id ? 'bg-brand-50/60' : ''"
              >
                <button
                  type="button"
                  :aria-pressed="activeId === problem.id"
                  :aria-label="problem.ariaLabel"
                  class="group flex w-full items-center gap-4 py-5 pr-2 pl-4 -ml-4 text-left motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-brand-50/40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                  :class="activeId === problem.id ? 'border-l-2 border-brand-500' : 'border-l-2 border-transparent'"
                  @click="selectProblem(problem.id, problem.solutionId)"
                >
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--radius-lg) motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="activeId === problem.id ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-500'"
                    aria-hidden="true"
                  >
                    <span class="h-5 w-5">
                      <SolutionIcon :id="problem.solutionId" />
                    </span>
                  </span>

                  <span
                    class="text-body-sm font-semibold tabular-nums motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="activeId === problem.id ? 'text-brand-500' : 'text-muted'"
                  >
                    0{{ index + 1 }}
                  </span>
                  <span
                    class="flex-1 text-h4 font-semibold tracking-tight motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
                    :class="activeId === problem.id ? 'text-brand-500' : 'text-highlighted'"
                  >
                    {{ problem.title }}
                  </span>
                  <span
                    class="shrink-0 text-body text-muted opacity-0 motion-safe:transition-all motion-safe:duration-(--duration-fast) group-hover:opacity-100"
                    :class="activeId === problem.id ? '!opacity-100 rotate-90 text-brand-500' : ''"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </button>

                <div v-if="activeId === problem.id" class="pb-6 pl-28">
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
