<script setup lang="ts">
import { solutions } from '~/content/solutions'
import { getCta } from '~/content/ctas'

// Split layout (text + CTA on the left, a card row on the right with one
// solution highlighted in solid brand color among plain bordered cards) —
// the "Why Choose Us" pattern from the Techa reference video, applied to
// our own real five solutions rather than invented service names. The
// first solution (Business Growth) is the one highlighted; which one is
// arbitrary, not a ranking claim.
//
// The card row scrolls horizontally with CSS scroll-snap (same pattern as
// Industries.vue) instead of wrapping into a 2-column grid — five full
// cards wrapped into 3 rows made this section very tall. A JS slideshow
// carousel (one card visible, others unmounted/hidden) was ruled out: it
// would break BusinessProblemSelector's useScrollHighlight(), which calls
// scrollIntoView() on a card by id and needs every card to actually be in
// the DOM. Scroll-snap keeps all five present, just arranged horizontally.
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
      <div ref="contentRef" class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            What We Do
          </span>
          <h2 id="solutions-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            End-to-end solutions for real business impact.
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Each problem points to a type of software solution — built
            around how your business actually works, not a
            one-size-fits-all product.
          </p>
          <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to" class="mt-6">
            {{ exploreSolutions.label }}
          </AppButton>

          <div class="mt-8 hidden gap-2 lg:flex">
            <button
              type="button"
              aria-label="Scroll solutions left"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-default text-default motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              @click="scrollTrack(-1)"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              aria-label="Scroll solutions right"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-default text-default motion-safe:transition-colors hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              @click="scrollTrack(1)"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div ref="trackRef" class="scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:col-span-8" style="scroll-snap-type: x mandatory;">
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
