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
    <PageContainer as="div">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch lg:gap-12">
        <div class="flex items-center py-14 sm:py-20 lg:py-24">
          <div ref="contentRef" class="max-w-xl">
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
              Software Solutions Partner
            </span>

            <h1 id="hero-heading" class="mt-3 text-display font-semibold tracking-tight text-highlighted">
              Software Solutions for Business
              <span class="text-brand-500"> Growth</span>
            </h1>

            <p class="mt-6 max-w-lg text-body-lg text-muted">
              We build software systems that help businesses acquire
              customers, improve operations, understand data, and scale.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-6">
              <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to">
                {{ exploreSolutions.label }}
              </AppButton>
              <AppButton v-if="seeHowItWorks" variant="text" :to="seeHowItWorks.to">
                {{ seeHowItWorks.label }} &rarr;
              </AppButton>
            </div>
          </div>
        </div>

        <div ref="visualRef" class="relative min-h-[320px] overflow-hidden sm:min-h-[400px] lg:min-h-0">
          <img
            src="/images/hero-team.webp"
            alt="A team discussing business operations around a table"
            class="h-full w-full object-cover"
            width="1456"
            height="1088"
            fetchpriority="high"
          >
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
