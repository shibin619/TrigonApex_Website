<script setup lang="ts">
import { getCta } from '~/content/ctas'
import { solutions } from '~/content/solutions'

// Centered-text-over-a-staggered-card-strip composition, from the
// reference (BrandLyft-style hero: small pill badge, bold centered
// heading, centered subtext, then a horizontal row of staggered-height
// cards below). The reference's row is real lifestyle photography — we
// have none (no stock/AI people photos; see docs/CONTENT_ARCHITECTURE.md
// §15 content-honesty rule, the same reason Industries.vue uses abstract
// icon panels instead of invented industry photos). Substituted with our
// five real Solutions, each as its own colored card, which also gives the
// strip actual function: every card jumps to and highlights its matching
// card in the "What We Do" section below (useScrollHighlight, same
// mechanism BusinessProblemSelector already uses), instead of being pure
// decoration.
//
// This replaces the previous split-layout hero (floating illustration +
// pointer-tilt/parallax). That illustration is still used by
// AboutTrigonApex.vue's cropped version, so the source file stays on disk.
const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')
const { scrollToAndHighlight } = useScrollHighlight()

const panelStyles = [
  { bg: 'bg-gradient-to-br from-brand-500 to-brand-700', icon: 'text-white', text: 'text-white', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(73,89,179,0.45)]' },
  { bg: 'bg-accent-ice-400/15', icon: 'text-accent-ice-600', text: 'text-highlighted', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(52,152,197,0.35)]' },
  { bg: 'bg-accent-green-500/15', icon: 'text-accent-green-700', text: 'text-highlighted', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(66,148,110,0.35)]' }
]

// Alternating heights + vertical offsets are what give the row its
// staggered, collage-like rhythm instead of a flat uniform grid.
const cardLayout = [
  { height: 'h-64', offset: '' },
  { height: 'h-48', offset: 'sm:mt-10' },
  { height: 'h-72', offset: '' },
  { height: 'h-52', offset: 'sm:mt-8' },
  { height: 'h-60', offset: 'sm:mt-2' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const stripRef = useTemplateRef<HTMLDivElement>('stripRef')
useFadeIn(contentRef)
useStaggerReveal(stripRef, 'a', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none" class="overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-2xl pt-16 text-center sm:pt-24">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          Software Solutions Partner
        </span>

        <h1 id="hero-heading" class="mt-5 text-display font-bold tracking-tighter text-highlighted">
          Stop Running Your Business on
          <span class="text-brand-500"> Disconnected Systems</span>
        </h1>

        <p class="mx-auto mt-6 max-w-lg text-body-lg text-muted">
          We build the connected software that replaces scattered
          tools, spreadsheets, and guesswork — so your team can focus
          on growth, not busywork.
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-6">
          <AppButton v-if="exploreSolutions" variant="primary" size="lg" :to="exploreSolutions.to">
            {{ exploreSolutions.label }}
          </AppButton>
          <AppButton v-if="seeHowItWorks" variant="text" size="lg" :to="seeHowItWorks.to">
            {{ seeHowItWorks.label }} &rarr;
          </AppButton>
        </div>
      </div>

      <div ref="stripRef" class="scrollbar-hidden mt-16 flex items-start gap-5 overflow-x-auto pb-6 sm:mt-20 sm:pb-10" style="scroll-snap-type: x mandatory;">
        <a
          v-for="(solution, index) in solutions"
          :key="solution.id"
          href="#"
          class="group block w-44 shrink-0 snap-start overflow-hidden rounded-(--radius-xl) p-5 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1.5 sm:w-52"
          :class="[panelStyles[index % panelStyles.length]!.bg, panelStyles[index % panelStyles.length]!.shadow, cardLayout[index % cardLayout.length]!.height, cardLayout[index % cardLayout.length]!.offset]"
          @click.prevent="scrollToAndHighlight(`solution-${solution.id}`)"
        >
          <span class="flex h-full flex-col justify-between">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg) motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
              :class="index % panelStyles.length === 0 ? 'bg-white/15' : 'bg-white/70'"
              aria-hidden="true"
            >
              <span class="h-5 w-5" :class="panelStyles[index % panelStyles.length]!.icon">
                <SolutionIcon :id="solution.id" />
              </span>
            </span>
            <span class="text-body-sm font-semibold" :class="panelStyles[index % panelStyles.length]!.text">
              {{ solution.title }}
            </span>
          </span>
        </a>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
