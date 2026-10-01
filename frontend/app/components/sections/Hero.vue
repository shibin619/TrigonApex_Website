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

// A single, confident product-dashboard composition (main card + a
// smaller peeking card behind it for depth + one floating status badge),
// now filling a large full-height panel rather than a small card in
// whitespace — the "big image block next to the headline" rhythm of a
// premium corporate site, built from the product's own real visual
// language instead of a stock photo. Entrance settles the pieces into
// place; the only ongoing motion afterward is the background glow
// breathing very slowly, so it doesn't compete with the copy.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ delay: 0.15 })
  tl.from('.hero-card-back', { opacity: 0, y: 16, rotate: 10, duration: 0.5, ease: 'power2.out' })
    .from('.hero-card-front', { opacity: 0, y: 28, duration: 0.55, ease: 'power2.out' }, '-=0.3')
    .from('.hero-badge', { opacity: 0, scale: 0.6, duration: 0.4, ease: 'back.out(2.2)' }, '-=0.15')
    .from('.hero-bar', { scaleX: 0, transformOrigin: 'left', duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=0.25')
    .from('.hero-label-item', { opacity: 0, x: 8, duration: 0.3, stagger: 0.08 }, '-=0.4')

  gsap.delayedCall(1.2, () => {
    gsap.to('.hero-visual-glow', {
      scale: 1.06,
      opacity: 0.8,
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
        <!-- Soft brand-tinted wash + a faint architectural grid (thin
             crossing lines suggesting glass/structure) instead of a
             stock photo of an office. -->
        <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100" aria-hidden="true" />
        <div
          class="absolute inset-0 opacity-[0.08]"
          style="background-image: repeating-linear-gradient(0deg, var(--color-brand-500) 0, var(--color-brand-500) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, var(--color-brand-500) 0, var(--color-brand-500) 1px, transparent 1px, transparent 64px);"
          aria-hidden="true"
        />
        <div
          class="hero-visual-glow absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,var(--color-brand-200),transparent_60%)]"
          aria-hidden="true"
        />

        <!-- Small vertical label list — reuses the same real terms the
             product narrative already uses elsewhere (Customers,
             Operations, Data, Growth), not new marketing copy. -->
        <div class="absolute top-8 right-8 hidden flex-col items-end gap-1.5 text-caption font-semibold tracking-widest text-brand-700/70 uppercase sm:flex">
          <span class="hero-label-item">Customers</span>
          <span class="hero-label-item">Operations</span>
          <span class="hero-label-item">Data</span>
          <span class="hero-label-item text-accent-green-700">Growth</span>
        </div>

        <!-- Peeking secondary card — depth, not a second thing to read. -->
        <div
          class="hero-card-back absolute top-10 left-8 hidden w-48 rotate-[-6deg] rounded-(--radius-lg) border border-default bg-default p-4 shadow-lg sm:block sm:w-56 lg:top-16 lg:left-12"
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

        <!-- Primary card — the actual visual anchor, large and centered
             in the panel rather than tucked into a corner. -->
        <div class="hero-card-front absolute inset-x-6 bottom-10 overflow-hidden rounded-(--radius-xl) border border-default bg-default shadow-xl sm:inset-x-10 lg:inset-x-12 lg:bottom-16">
          <div class="flex items-center gap-1.5 border-b border-default bg-elevated px-4 py-3" aria-hidden="true">
            <span class="h-2 w-2 rounded-full bg-[#f0625b]" />
            <span class="h-2 w-2 rounded-full bg-[#f2b029]" />
            <span class="h-2 w-2 rounded-full bg-accent-green-500" />
            <span class="ml-2 text-caption font-medium text-muted">Business Overview</span>
            <span class="ml-auto rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">NATRO</span>
          </div>

          <div class="flex">
            <div class="hidden w-32 shrink-0 border-r border-default p-3 sm:block" aria-hidden="true">
              <div class="rounded-(--radius-sm) bg-brand-50 px-2 py-1.5 text-caption font-medium text-brand-600">Overview</div>
              <div class="px-2 py-1.5 text-caption text-muted">Customers</div>
              <div class="px-2 py-1.5 text-caption text-muted">Operations</div>
              <div class="px-2 py-1.5 text-caption text-muted">Analytics</div>
            </div>

            <div class="flex-1 space-y-4 p-5" aria-hidden="true">
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
              <div class="flex h-20 items-end gap-1.5">
                <div
                  v-for="(h, i) in [40, 65, 50, 80, 60, 45, 70, 55]"
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
             corner (outside its content, never overlapping it). -->
        <div class="hero-badge absolute bottom-3 left-10 flex items-center gap-1.5 rounded-full border border-default bg-default px-3 py-1.5 shadow-md sm:left-14 lg:left-16">
          <span class="h-2 w-2 rounded-full bg-accent-green-500" aria-hidden="true" />
          <span class="text-caption font-medium text-highlighted">Live Operations</span>
        </div>
      </div>
    </div>
    </PageContainer>
  </SectionContainer>
</template>
