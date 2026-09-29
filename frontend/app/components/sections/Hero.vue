<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

// Copy is verbatim from the Stage 8D brief — the H1 communicates the
// positioning via line-break/color treatment only (no wording change);
// the supporting paragraph is the exact given company statement. Neither
// is authored here. Company identity itself is established by the
// always-visible header brand mark, not repeated in the Hero copy.
const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')

useFadeIn(contentRef)

// A single, confident product-dashboard composition (main card + a
// smaller peeking card behind it for depth + one floating status badge)
// rather than a diagram of separate fragments connected by lines — this
// reads as "premium software product" at a glance instead of asking the
// visitor to trace small labeled boxes and arrows. Entrance settles the
// three pieces into place; the only ongoing motion afterward is the
// background glow breathing very slowly, so it doesn't compete for
// attention with the copy.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ delay: 0.15 })
  tl.from('.hero-card-back', { opacity: 0, y: 16, rotate: 12, duration: 0.5, ease: 'power2.out' })
    .from('.hero-card-front', { opacity: 0, y: 24, duration: 0.55, ease: 'power2.out' }, '-=0.3')
    .from('.hero-badge', { opacity: 0, scale: 0.6, duration: 0.4, ease: 'back.out(2.2)' }, '-=0.15')
    .from('.hero-bar', { scaleX: 0, transformOrigin: 'left', duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=0.25')

  gsap.delayedCall(1.2, () => {
    gsap.to('.hero-visual-glow', {
      scale: 1.06,
      opacity: 0.75,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center'
    })
  })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading">
    <PageContainer as="div">
      <SplitLayout>
        <template #content>
          <div ref="contentRef">
            <h1 id="hero-heading" class="text-display font-semibold tracking-tight text-highlighted">
              Software Solutions
              <span class="block text-brand-500">for Business Growth</span>
            </h1>

            <p class="mt-6 max-w-xl text-body-lg text-muted">
              We build software systems that help businesses acquire
              customers, improve operations, understand data, and scale.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to">
                {{ exploreSolutions.label }}
              </AppButton>
              <AppButton v-if="seeHowItWorks" variant="outline" :to="seeHowItWorks.to">
                {{ seeHowItWorks.label }}
              </AppButton>
            </div>
          </div>
        </template>

        <template #visual>
          <div ref="visualRef" class="relative mx-auto aspect-[5/4] w-full max-w-lg">
            <div
              class="hero-visual-glow absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,var(--color-brand-100),transparent_65%)]"
              aria-hidden="true"
            />

            <!-- Peeking secondary card — depth, not a second thing to read. -->
            <div
              class="hero-card-back absolute top-2 right-2 hidden w-44 rotate-6 rounded-(--radius-lg) border border-default bg-default p-4 shadow-lg sm:block sm:w-52"
              aria-hidden="true"
            >
              <p class="text-caption font-semibold text-muted">Customer Growth</p>
              <div class="mt-3 flex h-14 items-end gap-1.5">
                <div
                  v-for="(h, i) in [32, 48, 40, 62, 54, 78]"
                  :key="i"
                  class="w-full rounded-t bg-accent-green-500/60"
                  :style="{ height: `${h}%` }"
                />
              </div>
            </div>

            <!-- Primary card — the actual visual anchor. -->
            <div class="hero-card-front absolute inset-x-0 bottom-0 overflow-hidden rounded-(--radius-xl) border border-default bg-default shadow-xl">
              <div class="flex items-center gap-1.5 border-b border-default bg-elevated px-4 py-3" aria-hidden="true">
                <span class="h-2 w-2 rounded-full bg-[#f0625b]" />
                <span class="h-2 w-2 rounded-full bg-[#f2b029]" />
                <span class="h-2 w-2 rounded-full bg-accent-green-500" />
                <span class="ml-2 text-caption font-medium text-muted">Business Overview</span>
                <span class="ml-auto rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">NATRO</span>
              </div>

              <div class="flex">
                <div class="hidden w-28 shrink-0 border-r border-default p-3 sm:block" aria-hidden="true">
                  <div class="rounded-(--radius-sm) bg-brand-50 px-2 py-1.5 text-caption font-medium text-brand-600">Overview</div>
                  <div class="px-2 py-1.5 text-caption text-muted">Customers</div>
                  <div class="px-2 py-1.5 text-caption text-muted">Operations</div>
                  <div class="px-2 py-1.5 text-caption text-muted">Analytics</div>
                </div>

                <div class="flex-1 space-y-4 p-4" aria-hidden="true">
                  <div class="grid grid-cols-2 gap-3">
                    <div class="rounded-(--radius-md) border border-default p-3">
                      <p class="text-caption text-muted">Active Customers</p>
                      <div class="mt-2 h-1.5 w-3/4 rounded-full bg-brand-200 hero-bar" />
                    </div>
                    <div class="rounded-(--radius-md) border border-default p-3">
                      <p class="text-caption text-muted">Operations</p>
                      <div class="mt-2 h-1.5 w-1/2 rounded-full bg-accent-ice-400 hero-bar" />
                    </div>
                  </div>
                  <div class="flex h-16 items-end gap-1.5">
                    <div
                      v-for="(h, i) in [40, 65, 50, 80, 60, 45, 70]"
                      :key="i"
                      class="w-full rounded-t"
                      :class="[i % 3 === 0 ? 'bg-brand-300' : i % 3 === 1 ? 'bg-accent-ice-400' : 'bg-accent-green-500']"
                      :style="{ height: `${h}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating status badge, hanging off the card's bottom-left
                 corner (outside its content, never overlapping it) —
                 depth + a small "this is live software" cue. -->
            <div class="hero-badge absolute -bottom-4 left-6 flex items-center gap-1.5 rounded-full border border-default bg-default px-3 py-1.5 shadow-md">
              <span class="h-2 w-2 rounded-full bg-accent-green-500" aria-hidden="true" />
              <span class="text-caption font-medium text-highlighted">Live Operations</span>
            </div>
          </div>
        </template>
      </SplitLayout>
    </PageContainer>
  </SectionContainer>
</template>
