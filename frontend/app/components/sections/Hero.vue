<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

// Copy is verbatim from the Stage 8D brief — the headline communicates
// the positioning via line-break/color treatment only (no wording
// change); the supporting paragraph is the exact given company
// statement. Neither is authored here.
const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')

useFadeIn(contentRef)

// The real photo (public/images/hero-team.webp) is the visual anchor
// itself now — generated specifically with no whiteboards/papers/screens
// in frame (an earlier draft had AI-garbled "handwriting" on a
// whiteboard, a real and visible tell). One small floating product card
// stays as a software-identity accent on top of it, the same layered-
// depth pattern used before, just scaled back since the photo now carries
// the visual weight instead of a dashboard mockup filling the whole panel.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ delay: 0.15 })
  tl.from('.hero-photo', { opacity: 0, scale: 1.04, duration: 0.7, ease: 'power2.out' })
    .from('.hero-badge', { opacity: 0, y: 12, scale: 0.9, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none">
    <PageContainer as="div">
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch lg:gap-10">
      <div class="py-14 sm:py-20 lg:py-24">
        <div ref="contentRef" class="max-w-xl">
          <h1 id="hero-heading" class="text-display font-semibold tracking-tight text-highlighted">
            Software Solutions
            <span class="block">
              <span class="text-brand-500">for Business</span>
              <span class="text-accent-green-700"> Growth</span>
            </span>
          </h1>

          <p class="mt-6 max-w-lg text-body-lg text-muted">
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
      </div>

      <div ref="visualRef" class="relative min-h-[380px] overflow-hidden rounded-(--radius-xl) sm:min-h-[460px] lg:min-h-0">
        <img
          src="/images/hero-team.webp"
          alt="A team discussing business operations around a table"
          class="hero-photo h-full w-full object-cover"
          width="1456"
          height="1088"
          fetchpriority="high"
        >

        <!-- One small floating product-identity accent — a software cue
             on top of the photo, not a second thing competing with it. -->
        <div class="hero-badge absolute bottom-6 left-6 flex items-center gap-2 rounded-(--radius-lg) border border-default bg-default/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-8 sm:bottom-8">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-green-500/15 text-accent-green-700" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>
          </span>
          <div>
            <p class="text-body-sm font-semibold text-highlighted">Live Operations</p>
            <p class="text-caption text-muted">Powered by Natro</p>
          </div>
        </div>
      </div>
    </div>
    </PageContainer>
  </SectionContainer>
</template>
