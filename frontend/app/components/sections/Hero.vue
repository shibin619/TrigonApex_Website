<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')

useFadeIn(contentRef)

// No decoration on the photo itself — no gradient overlay, no floating
// badge card, no grid texture behind it. Those were the generic
// AI-template tells (every v0/Lovable-style SaaS hero has a grid + glow +
// glass badge); a premium B2B hero relies on the photograph and
// typography alone, on a plain light background like the rest of the
// page, not a dark "statement band."
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.from(visualRef.value, { opacity: 0, scale: 1.03, duration: 0.7, ease: 'power2.out', delay: 0.15 })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none">
    <!-- No PageContainer here: the photo needs to bleed to the actual
         browser edge, not stop at the centered 1280px content width, or
         it reads as a separate inset "card" floating on the page
         background instead of a panel that's actually part of the page.
         The text column recreates PageContainer's own left gutter via the
         same calc() so it still lines up with the header/nav above it on
         screens wider than the container max-width. -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch">
        <div class="flex items-center px-4 py-16 sm:px-6 sm:py-24 lg:py-28 lg:pr-12 lg:pl-[max(1rem,calc((100vw-80rem)/2+2rem))]">
          <div ref="contentRef" class="max-w-xl">
            <span class="inline-flex items-center gap-2.5 text-caption font-medium tracking-widest text-brand-500 uppercase">
              <span class="h-px w-6 bg-brand-500" aria-hidden="true" />
              Software Solutions Partner
            </span>

            <h1 id="hero-heading" class="mt-4 text-display font-semibold tracking-tighter text-highlighted">
              Software Solutions for Business
              <span class="text-brand-500"> Growth</span>
            </h1>

            <p class="mt-6 max-w-lg text-body-lg text-muted">
              We build software systems that help businesses acquire
              customers, improve operations, understand data, and scale.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-6">
              <AppButton v-if="exploreSolutions" variant="primary" size="lg" :to="exploreSolutions.to">
                {{ exploreSolutions.label }}
              </AppButton>
              <AppButton v-if="seeHowItWorks" variant="text" size="lg" :to="seeHowItWorks.to">
                {{ seeHowItWorks.label }} &rarr;
              </AppButton>
            </div>
          </div>
        </div>

        <div ref="visualRef" class="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-0">
          <!-- Grading (contrast curve, warm/cool split tone, vignette) is
               baked into the file itself from a proper edit of the source
               photo, not a CSS filter layered on top of a flat crop. The
               crop is also tighter than the original, removing the flat
               ceiling strip that was visible along the top of the frame. -->
          <img
            src="/images/hero-team.webp"
            alt="A team discussing business operations around a table"
            class="h-full w-full object-cover"
            width="1456"
            height="1024"
            fetchpriority="high"
          >
        </div>
    </div>
  </SectionContainer>
</template>
