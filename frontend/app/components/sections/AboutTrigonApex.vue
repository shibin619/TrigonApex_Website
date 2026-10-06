<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Light background with teal as the accent color (heading, button,
// decorative ring) — not a solid teal fill — matching the reference's
// actual composition: a mostly-white page with teal/cyan used only on
// specific elements. Circular photo-style crop + floating stat badges,
// same as before. The circle uses our one approved illustration
// (hero-illustration.webp), cropped tight on the two colleagues rather
// than the full scene Hero already shows, so the two sections don't
// read as the same image repeated. Each badge still carries one of the
// three real, verifiable counts (docs/CONTENT_ARCHITECTURE.md §15), so
// nothing here is purely decorative.
const stats = [
  { value: solutions.length, label: 'Core Solutions', icon: 'layers' as const, badge: 'top-[2%] left-[-6%] sm:left-[-10%]', iconClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]', numClass: 'text-brand-500' },
  { value: industries.length, label: 'Industries Served', icon: 'target' as const, badge: 'bottom-[30%] right-[-8%] sm:right-[-14%]', iconClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]', numClass: 'text-accent-ice-600' },
  { value: products.length, label: 'Natro Products', icon: 'bulb' as const, badge: 'bottom-[0%] left-[8%] sm:left-[2%]', iconClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]', numClass: 'text-accent-green-700' }
]

const orbitDots = [
  { color: 'bg-brand-400', glow: 'shadow-[0_0_10px_2px_rgba(73,89,179,0.55)]' },
  { color: 'bg-accent-green-500', glow: 'shadow-[0_0_10px_2px_rgba(66,148,110,0.55)]' }
]

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualWrapRef = useTemplateRef<HTMLDivElement>('visualWrapRef')
const medallionRef = useTemplateRef<HTMLDivElement>('medallionRef')
const badgesRef = useTemplateRef<HTMLDivElement>('badgesRef')
const numRefs = useTemplateRef<HTMLParagraphElement[]>('numRefs')
const orbitRefs = useTemplateRef<HTMLSpanElement[]>('orbitRefs')
useFadeIn(contentRef)
useStaggerReveal(badgesRef, ':scope > div')

// Count-up on scroll-into-view — takes over the DOM text directly since
// these values never change after mount, so there's nothing for Vue to
// stay in sync with.
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!badgesRef.value || !('IntersectionObserver' in window)) return

  const els = numRefs.value ?? []
  els.forEach((el) => { el.textContent = '0' })

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      els.forEach((el, i) => {
        const target = stats[i]?.value ?? 0
        const counter = { n: 0 }
        gsap.to(counter, {
          n: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = String(Math.round(counter.n)) }
        })
      })
      observer.disconnect()
    },
    { threshold: 0.3 }
  )
  observer.observe(badgesRef.value)
  onBeforeUnmount(() => observer.disconnect())
})

// Same pointer-tilt + gentle idle float used on Hero's visual column — a
// perspective tilt on the medallion plus a slow independent bob on each
// badge keeps the circle from reading as a static, flat graphic.
onMounted(() => {
  if (!visualWrapRef.value || !medallionRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.set(medallionRef.value, { transformPerspective: 800, transformOrigin: 'center' })
  const setRotateX = gsap.quickTo(medallionRef.value, 'rotationX', { duration: 0.5, ease: 'power2.out' })
  const setRotateY = gsap.quickTo(medallionRef.value, 'rotationY', { duration: 0.5, ease: 'power2.out' })

  function onPointerMove(event: PointerEvent) {
    const wrap = visualWrapRef.value
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setRotateY(px * 10)
    setRotateX(py * -10)
  }
  function onPointerLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  visualWrapRef.value.addEventListener('pointermove', onPointerMove)
  visualWrapRef.value.addEventListener('pointerleave', onPointerLeave)
  onBeforeUnmount(() => {
    visualWrapRef.value?.removeEventListener('pointermove', onPointerMove)
    visualWrapRef.value?.removeEventListener('pointerleave', onPointerLeave)
  })

  const badgeEls = badgesRef.value ? Array.from(badgesRef.value.children) : []
  badgeEls.forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 === 0 ? -8 : 8,
      duration: 2.4 + i * 0.3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.2
    })
  })

  // Two small signals orbiting the dashed ring at a fixed radius — reads
  // as "live" data moving between the Trigon mark and the three real
  // stats around it, instead of a static graphic.
  const orbitEls = orbitRefs.value ?? []
  const radius = 41
  orbitEls.forEach((el, i) => {
    const state = { angle: i * Math.PI }
    gsap.to(state, {
      angle: state.angle + Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'linear',
      onUpdate: () => {
        el.style.left = `${50 + radius * Math.cos(state.angle)}%`
        el.style.top = `${50 + radius * Math.sin(state.angle)}%`
      }
    })
  })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div ref="contentRef" class="max-w-lg">
          <span class="text-caption font-semibold tracking-widest text-accent-ice-600 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-bold tracking-tight text-accent-ice-600">
            A technology partner
            <span class="block font-medium text-highlighted italic">for businesses that want to grow.</span>
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            We combine business understanding with software expertise to
            design practical systems that help companies operate more
            efficiently, automate repetitive work, and turn their own data
            into better decisions.
          </p>
          <NuxtLink
            v-if="learnAboutUs"
            :to="learnAboutUs.to"
            class="mt-7 inline-flex items-center justify-center rounded-full bg-accent-ice-600 px-7 py-3 text-button font-semibold text-white shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-fast) hover:-translate-y-px hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ice-600"
          >
            {{ learnAboutUs.label }}
          </NuxtLink>

          <!-- Real solution names (not invented copy) as a quick-scan
               preview of what "software expertise" above actually covers —
               the full Solutions section below goes into each one
               properly. -->
          <div class="mt-10">
            <p class="text-caption font-semibold tracking-widest text-muted uppercase">What We Build</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="solution in solutions"
                :key="solution.id"
                :title="solution.shortDescription"
                class="rounded-full border border-default px-3.5 py-1.5 text-body-sm font-medium text-default motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:border-accent-ice-400 hover:text-accent-ice-600"
              >
                {{ solution.title }}
              </span>
            </div>
          </div>
        </div>

        <!-- Circular photo-style crop with the real stats as floating
             badges around its edge, instead of a stat panel sitting apart
             from the copy. -->
        <div ref="visualWrapRef" class="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md" style="perspective: 800px;">
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div class="h-[78%] w-[78%] rounded-full bg-accent-ice-400/15 blur-md" />
          </div>
          <!-- Decorative offset arc peeking out from behind the circle,
               the same detail as the reference's curved line. -->
          <div class="pointer-events-none absolute -right-[3%] -bottom-[1%] h-[72%] w-[72%] rounded-full border-2 border-accent-ice-400/50" aria-hidden="true" />
          <div class="pointer-events-none absolute inset-[9%] rounded-full border-2 border-dashed border-accent-ice-400/50" aria-hidden="true" />

          <!-- Two signals orbiting the ring at a fixed radius, set in
               motion from JS (see onMounted below) — a static initial
               position here so they render sensibly before JS runs. -->
          <span
            v-for="(dot, index) in orbitDots"
            :key="index"
            ref="orbitRefs"
            class="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            :class="[dot.color, dot.glow]"
            :style="{ left: '50%', top: index === 0 ? '9%' : '91%' }"
            aria-hidden="true"
          />

          <div
            ref="medallionRef"
            class="absolute inset-[14%] overflow-hidden rounded-full shadow-[0_32px_48px_-16px_rgba(16,19,50,0.3)] ring-4 ring-white"
          >
            <img
              src="/images/about-illustration-crop.webp"
              alt="Illustration of two Trigon Apex colleagues reviewing a business growth chart"
              class="h-full w-full object-cover"
            >
          </div>

          <div ref="badgesRef">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="absolute flex items-center gap-3 rounded-2xl border border-default bg-default py-3 pr-5 pl-3 shadow-[0_18px_32px_-14px_rgba(16,19,50,0.25)]"
              :class="stat.badge"
            >
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" :class="stat.iconClass">
                <span class="h-5 w-5" aria-hidden="true">
                  <PrincipleIcon :id="stat.icon" />
                </span>
              </span>
              <span>
                <p ref="numRefs" class="text-h4 leading-none font-bold tracking-tight" :class="stat.numClass">
                  {{ stat.value }}
                </p>
                <p class="mt-1 text-caption font-medium whitespace-nowrap text-muted">{{ stat.label }}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
