<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')

useFadeIn(contentRef)

// Dark navy band (matches OurApproach/FinalCta) instead of a white panel
// holding a bright, uncolor-graded stock photo — the mismatch was that
// the photo sat on white while every other "statement" band on the page
// (Our Approach, Final CTA, Case Studies cards) is navy-950. The photo
// now gets the same cool navy tint + bottom gradient those other dark
// moments use, so it reads as one brand rather than a photo bolted onto
// an otherwise illustrated site.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ delay: 0.15 })
  tl.from('.hero-photo', { opacity: 0, scale: 1.04, duration: 0.7, ease: 'power2.out' })
    .from('.hero-label-item', { opacity: 0, x: 8, duration: 0.3, stagger: 0.08 }, '-=0.35')
    .from('.hero-badge', { opacity: 0, y: 12, scale: 0.9, duration: 0.4, ease: 'back.out(2)' }, '-=0.2')
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none" class="relative overflow-hidden bg-navy-950">
    <!-- Same architectural grid + radial glow as Final CTA — this is the
         motif Final CTA's own comment says it's reusing "from the Hero
         visual"; restoring it here is what actually ties the two
         bookends together again. -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.06]"
      style="background-image: repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 64px);"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--color-brand-800),transparent_60%)]"
      aria-hidden="true"
    />

    <PageContainer as="div" class="relative">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-10">
        <div class="py-14 sm:py-20 lg:py-24">
          <div ref="contentRef" class="max-w-xl">
            <span class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
              Software Solutions Partner
            </span>

            <h1 id="hero-heading" class="mt-3 text-display font-semibold tracking-tight text-white">
              Software Solutions
              <span class="block">
                <span class="text-brand-300">for Business</span>
                <span class="text-accent-green-500"> Growth</span>
              </span>
            </h1>

            <p class="mt-6 max-w-lg text-body-lg text-slate-300">
              We build software systems that help businesses acquire
              customers, improve operations, understand data, and scale.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to">
                {{ exploreSolutions.label }}
              </AppButton>
              <!-- AppButton's outline variant assumes a light background
                   (see Final CTA's own note); the same plain white-outline
                   link that section uses works here for the same reason. -->
              <NuxtLink
                v-if="seeHowItWorks"
                :to="seeHowItWorks.to"
                class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ seeHowItWorks.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div ref="visualRef" class="relative min-h-[380px] overflow-hidden rounded-(--radius-xl) sm:min-h-[460px] lg:min-h-0 lg:aspect-[4/3]">
          <img
            src="/images/hero-team.webp"
            alt="A team discussing business operations around a table"
            class="hero-photo h-full w-full object-cover"
            width="1456"
            height="1088"
            fetchpriority="high"
          >

          <!-- Cool navy tint ties the photo's color to the brand palette
               instead of leaving it a neutral, uncolor-graded stock shot;
               the bottom gradient also keeps the badge legible. -->
          <div class="pointer-events-none absolute inset-0 bg-brand-900/25 mix-blend-multiply" aria-hidden="true" />
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" aria-hidden="true" />

          <!-- Vertical label list — reuses the same real terms used
               elsewhere in the product narrative (Customers, Operations,
               Data, Growth), not new marketing copy. -->
          <div class="absolute top-6 right-6 hidden flex-col items-end gap-1.5 text-caption font-semibold tracking-widest text-white/70 uppercase sm:flex">
            <span class="hero-label-item">Customers</span>
            <span class="hero-label-item">Operations</span>
            <span class="hero-label-item">Data</span>
            <span class="hero-label-item text-accent-green-500">Growth</span>
          </div>

          <!-- Small floating product-identity accent. -->
          <div class="hero-badge absolute bottom-6 left-6 flex items-center gap-2 rounded-(--radius-lg) border border-white/10 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-8 sm:bottom-8">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-green-500/15 text-accent-green-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <div>
              <p class="text-body-sm font-semibold text-navy-950">Live Operations</p>
              <p class="text-caption text-muted">Powered by Natro</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
