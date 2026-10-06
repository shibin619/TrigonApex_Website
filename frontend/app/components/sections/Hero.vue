<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'
import { solutions } from '~/content/solutions'
import { products } from '~/content/products'

const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')
const badgeTopRef = useTemplateRef<HTMLDivElement>('badgeTopRef')
const badgeBottomRef = useTemplateRef<HTMLDivElement>('badgeBottomRef')

useFadeIn(contentRef)

// Real AI-generated flat illustration (user-sourced, matching the
// Iconscout/Storyset reference style a hand-coded SVG couldn't reach).
// Post-processed before landing here: its flat white background was
// chroma-keyed to transparent, and the two off-brand colors (panel
// indigo, outfit green) were nudged to the site's exact brand hex
// values. A soft two-tone gradient wash behind it (brand + green, both
// already-validated tokens) replaces the plain white background.
//
// The two floating badge cards layered over it reuse real, already-
// established facts (same counts as the About section) rather than
// inventing content — their job is purely to add the depth/motion the
// flat static image was missing, Stripe/Linear-reference style: a
// bouncy entrance (scale + rotate from 0) followed by a continuous,
// gentle bob loop, each on its own offset timing for an organic feel.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ delay: 0.15 })
  tl.from(visualRef.value, { opacity: 0, y: 16, duration: 0.7, ease: 'power2.out' })

  if (badgeTopRef.value) {
    tl.from(badgeTopRef.value, { opacity: 0, scale: 0.7, rotate: -8, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.35')
    gsap.to(badgeTopRef.value, { y: '+=10', duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.9 })
  }
  if (badgeBottomRef.value) {
    tl.from(badgeBottomRef.value, { opacity: 0, scale: 0.7, rotate: 8, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
    gsap.to(badgeBottomRef.value, { y: '+=12', duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.1 })
  }
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

        <div class="relative mx-auto w-full max-w-md lg:max-w-none">
          <!-- Soft blurred color glow behind the illustration, same mesh-
               glow technique used on the Solutions section, for depth. -->
          <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div class="absolute top-1/4 left-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/25 blur-3xl" />
            <div class="absolute right-1/4 bottom-1/4 h-56 w-56 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-green-500/20 blur-3xl" />
          </div>

          <div ref="visualRef">
            <img
              src="/images/hero-illustration.webp"
              alt="Illustration of two people presenting a rising business data chart"
              width="800"
              height="519"
              class="h-auto w-full"
              fetchpriority="high"
            >
          </div>

          <!-- Floating badge cards — real counts already shown on the About
               section, not invented copy; their job is depth/motion. -->
          <div
            ref="badgeTopRef"
            class="absolute top-2 right-2 flex items-center gap-3 rounded-(--radius-lg) border border-default bg-default/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:top-6 sm:right-0"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-gradient-to-br from-brand-500 to-brand-700 text-white" aria-hidden="true">
              <span class="h-5 w-5"><SolutionIcon id="business-growth" /></span>
            </span>
            <div>
              <p class="text-body font-semibold tracking-tight text-highlighted">{{ solutions.length }} Core Solutions</p>
              <p class="text-caption text-muted">Built around real needs</p>
            </div>
          </div>

          <div
            ref="badgeBottomRef"
            class="absolute bottom-2 left-2 flex items-center gap-3 rounded-(--radius-lg) border border-default bg-default/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-0"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-accent-green-500/10 text-accent-green-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M21 8l-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
            </span>
            <div>
              <p class="text-body font-semibold tracking-tight text-highlighted">{{ products.length }} Natro Products</p>
              <p class="text-caption text-muted">One connected ecosystem</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
