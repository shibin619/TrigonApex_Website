<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualWrapRef = useTemplateRef<HTMLDivElement>('visualWrapRef')
const visualRef = useTemplateRef<HTMLDivElement>('visualRef')
const stageRef = useTemplateRef<HTMLDivElement>('stageRef')
const sectionRef = useTemplateRef<HTMLElement>('sectionRef')

useFadeIn(contentRef)

// Real AI-generated flat illustration (user-sourced, second generation —
// the first lacked the floating-UI-card detail this one has baked
// straight into the composition). Post-processed before landing here:
// flat white background chroma-keyed to transparent, and its two
// dominant off-brand tones nudged to the site's exact brand hex values.
//
// No separate coded floating badges on top of it anymore (an earlier
// version had three) — this illustration already carries that visual
// richness itself (notification card, checkmark badge, progress
// indicator), so stacking our own badges over it was pure redundancy.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.from(visualRef.value, { opacity: 0, y: 16, scale: 0.97, duration: 0.8, ease: 'power2.out', delay: 0.15 })
})

// Scroll parallax (background "stage" shape vs. the illustration drifting
// at different rates) + a pointer-driven 3D tilt on the illustration — a
// flat image alone doesn't read as dimensional, but a perspective tilt
// that responds to the cursor does, the same trick behind most "premium"
// product-shot heroes. Both are driven through gsap.quickTo so they
// composite onto the SAME element's transform correctly (GSAP tracks
// translate/rotate as separate internal channels) instead of two systems
// overwriting each other's raw inline `transform` string.
onMounted(() => {
  if (!sectionRef.value || !visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.set(visualRef.value, { transformPerspective: 1000, transformOrigin: 'center' })
  const setY = gsap.quickTo(visualRef.value, 'y', { duration: 0.3, ease: 'power2.out' })
  const setStageY = gsap.quickTo(stageRef.value, 'y', { duration: 0.3, ease: 'power2.out' })
  const setRotateX = gsap.quickTo(visualRef.value, 'rotationX', { duration: 0.5, ease: 'power2.out' })
  const setRotateY = gsap.quickTo(visualRef.value, 'rotationY', { duration: 0.5, ease: 'power2.out' })

  let ticking = false
  function updateScroll() {
    ticking = false
    const section = sectionRef.value
    if (!section) return
    const rect = section.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return
    const progress = -rect.top / (rect.height || 1)
    setStageY(progress * 40)
    setY(progress * -24)
  }
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(updateScroll)
  }

  function onPointerMove(event: PointerEvent) {
    const wrap = visualWrapRef.value
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setRotateY(px * 14)
    setRotateX(py * -14)
  }
  function onPointerLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  updateScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  visualWrapRef.value?.addEventListener('pointermove', onPointerMove)
  visualWrapRef.value?.addEventListener('pointerleave', onPointerLeave)
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    visualWrapRef.value?.removeEventListener('pointermove', onPointerMove)
    visualWrapRef.value?.removeEventListener('pointerleave', onPointerLeave)
  })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading" spacing="none" class="bg-gradient-to-br from-accent-green-500/10 via-white to-brand-50">
    <PageContainer as="div">
      <div ref="sectionRef" class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div class="py-16 sm:py-24 lg:py-28">
          <div ref="contentRef" class="max-w-xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase shadow-sm">
              <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
              Software Solutions Partner
            </span>

            <h1 id="hero-heading" class="mt-5 text-display font-bold tracking-tighter text-highlighted">
              Stop Running Your Business on
              <span class="text-brand-500"> Disconnected Systems</span>
            </h1>

            <p class="mt-6 max-w-lg text-body-lg text-muted">
              We build the connected software that replaces scattered
              tools, spreadsheets, and guesswork — so your team can focus
              on growth, not busywork.
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

        <div ref="visualWrapRef" class="relative mx-auto w-full max-w-md lg:max-w-xl" style="perspective: 1000px;">
          <!-- One large, genuinely colorful "stage" shape behind the
               illustration (not just a pastel haze) plus a smaller accent
               blob for variety — gives the illustration something bold to
               visually sit on, the dominant-background-shape treatment
               from the reference, built from the same validated brand/
               green tokens used everywhere else. Drifts on scroll (see
               the parallax handler above) for a layered-depth feel. -->
          <div class="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <div ref="stageRef" class="h-[85%] w-[85%] rounded-full bg-gradient-to-br from-brand-200 to-brand-300 opacity-80 blur-md" />
          </div>
          <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div class="absolute right-1/4 bottom-1/4 h-56 w-56 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-green-500/25 blur-3xl" />
          </div>

          <div ref="visualRef">
            <img
              src="/images/hero-illustration.webp"
              alt="Illustration of two colleagues reviewing a rising business growth chart on a large screen, surrounded by notification, approval, and progress UI cards"
              width="940"
              height="672"
              class="h-auto w-full drop-shadow-[0_32px_48px_rgba(16,19,50,0.2)]"
              fetchpriority="high"
            >
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
