<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Reference style (centered pill badge + bold centered heading) applied
// here — this is the section it was actually meant for, not Hero or How
// We Work. Replaces the previous split layout (text block on the left,
// card row on the right) with a centered header above a full-width row.
//
// The per-card staggered vertical offset from the first pass is gone:
// combined with the centered header above it, it pushed the section
// past one viewport and left dead whitespace above the offset cards —
// both flagged directly. Cards now share one baseline.
//
// The row still scrolls horizontally with CSS scroll-snap (same pattern
// as Industries.vue) rather than wrapping into a grid — five full cards
// wrapped into rows made this section very tall, the original reason for
// the horizontal-row change. A JS slideshow carousel (one card visible,
// others unmounted/hidden) was ruled out: it would break
// BusinessProblemSelector's useScrollHighlight(), which calls
// scrollIntoView() on a card by id and needs every card to actually be
// in the DOM.
//
// Prev/next buttons moved off the header and onto the track itself
// (floating over its left/right edge, vertically centered) — attached
// to the thing they control, the standard carousel-arrow placement,
// rather than sitting disconnected next to the CTA.
const exploreSolutions = getCta('explore-solutions')

const trackRef = useTemplateRef<HTMLDivElement>('trackRef')
function scrollTrack(direction: 1 | -1) {
  trackRef.value?.scrollBy({ left: direction * 360, behavior: 'smooth' })
}

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
useStaggerReveal(trackRef, 'article')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="solutions-heading" class="relative overflow-hidden">
    <!-- Soft mesh-gradient atmosphere behind the section — large, heavily
         blurred color washes using the site's existing validated tones
         (brand/green/ice), so the section reads as airy and alive rather
         than flat white. Purely decorative, sits behind all content. -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-brand-200/35 blur-3xl" />
      <div class="absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-accent-green-500/15 blur-3xl" />
      <div class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-ice-400/15 blur-3xl" />
    </div>

    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          What We Do
        </span>
        <h2 id="solutions-heading" class="mt-4 text-h2 font-semibold tracking-tight text-highlighted">
          End-to-end solutions for real business impact.
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
          Each problem points to a type of software solution — built
          around how your business actually works, not a
          one-size-fits-all product.
        </p>

        <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to" class="mt-6">
          {{ exploreSolutions.label }}
        </AppButton>
      </div>

      <div class="relative mt-10 md:mt-12">
        <button
          type="button"
          aria-label="Scroll solutions left"
          class="absolute top-1/2 left-0 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-default bg-default text-default shadow-md motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
          @click="scrollTrack(-1)"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          aria-label="Scroll solutions right"
          class="absolute top-1/2 right-0 z-20 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-default bg-default text-default shadow-md motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
          @click="scrollTrack(1)"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>

        <div ref="trackRef" class="scrollbar-hidden flex items-start gap-5 overflow-x-auto pb-6" style="scroll-snap-type: x mandatory;">
          <article
            v-for="(solution, index) in solutions"
            :id="`solution-${solution.id}`"
            :key="solution.id"
            class="group relative w-[19rem] shrink-0 scroll-mt-24 snap-start overflow-hidden rounded-(--radius-xl) p-8 motion-safe:transition-[transform,background-color,border-color,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-2 sm:w-80"
            :class="index === 0
              ? 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_16px_32px_-14px_rgba(16,19,50,0.4)] hover:shadow-[0_32px_56px_-14px_rgba(16,19,50,0.55)]'
              : 'border border-white/70 bg-white/70 shadow-sm backdrop-blur-md hover:border-brand-300 hover:bg-white/90 hover:shadow-[0_32px_56px_-18px_rgba(73,89,179,0.35)]'"
          >
          <!-- Oversized, barely-visible icon watermark for depth, same
               craft as a Stripe/Linear feature card — purely decorative. -->
          <span
            class="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 motion-safe:transition-transform motion-safe:duration-(--duration-slow) group-hover:scale-110"
            :class="index === 0 ? 'text-white/10' : 'text-brand-500/[0.06]'"
            aria-hidden="true"
          >
            <SolutionIcon :id="solution.id" />
          </span>

          <!-- Soft radial glow in the corner, invisible until hover — a
               Linear/Stripe-style accent rather than a flat color swap,
               purely decorative so it's aria-hidden and non-interactive. -->
          <span
            class="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-0 blur-3xl motion-safe:transition-opacity motion-safe:duration-(--duration-slow) group-hover:opacity-100"
            :class="index === 0 ? 'bg-white/20' : 'bg-brand-300/30'"
            aria-hidden="true"
          />

          <span
            class="relative flex h-14 w-14 items-center justify-center rounded-(--radius-lg) motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
            :class="index === 0 ? 'bg-white/15 text-white' : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]'"
            aria-hidden="true"
          >
            <span class="h-6 w-6">
              <SolutionIcon :id="solution.id" />
            </span>
          </span>
          <h3 class="relative mt-5 text-h4 font-semibold tracking-tight motion-safe:transition-colors motion-safe:duration-(--duration-fast)" :class="index === 0 ? 'text-white' : 'text-highlighted group-hover:text-brand-500'">
            {{ solution.title }}
          </h3>
          <p class="relative mt-2 text-body-sm" :class="index === 0 ? 'text-white/85' : 'text-default'">
            {{ solution.shortDescription }}
          </p>

          <!-- Real content already defined on the Solution (flow — a
               3-stage conceptual process) that was never rendered here;
               shown as a small process trail rather than inventing new
               copy, same content-honesty rule as the rest of the page. -->
          <div class="relative mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-caption font-medium" :class="index === 0 ? 'text-white/75' : 'text-muted'">
            <template v-for="(stage, stageIndex) in solution.flow" :key="stage">
              <span>{{ stage }}</span>
              <span v-if="stageIndex < solution.flow.length - 1" aria-hidden="true" :class="index === 0 ? 'text-white/40' : 'text-muted/50'">&rarr;</span>
            </template>
          </div>
          <!-- AppButton's text-link variant renders brand-colored text
               via Nuxt UI regardless of class overrides (same caveat as
               Final CTA's outline button), so the highlighted card uses
               a plain white underlined link instead. -->
          <NuxtLink
            v-if="index === 0"
            :to="`/solutions/${solution.slug}`"
            class="group/link relative mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-white underline underline-offset-2 motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Learn more about {{ solution.title }}
            <span class="inline-block no-underline motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover/link:translate-x-1" aria-hidden="true">&rarr;</span>
          </NuxtLink>
          <AppButton v-else variant="text" :to="`/solutions/${solution.slug}`" class="group/link relative mt-5 px-0">
            Learn more about {{ solution.title }}
            <span class="inline-block motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover/link:translate-x-1" aria-hidden="true">&rarr;</span>
          </AppButton>
          </article>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
