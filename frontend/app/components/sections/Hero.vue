<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')

useFadeIn(contentRef)

// The illustration (HeroIllustration.vue) replaces the real photo per the
// chosen direction — a custom flat illustration in the brand palette,
// not the stock/AI-generated route. A soft two-tone gradient wash behind
// it (brand + green, both already-validated tokens) replaces the plain
// white background, echoing the reference's soft gradient mood without
// introducing new, unvalidated colors.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.from(visualRef.value, { opacity: 0, y: 16, duration: 0.7, ease: 'power2.out', delay: 0.15 })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none" class="bg-gradient-to-br from-accent-green-500/10 via-white to-brand-50">
    <PageContainer as="div">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div class="py-16 sm:py-24 lg:py-28">
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

        <div ref="visualRef" class="mx-auto w-full max-w-md lg:max-w-none">
          <HeroIllustration />
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
