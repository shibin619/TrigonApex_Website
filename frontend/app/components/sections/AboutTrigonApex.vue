<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Circular brand medallion + floating stat badges, the same "illustrated
// info-graphic" composition as a reference landing-page kit (a framed
// central visual with small UI/icon cards floating around its edge) —
// built from our own icon set and real, verifiable counts
// (docs/CONTENT_ARCHITECTURE.md §15) instead of stock illustration, since
// no custom artwork exists for this section. Each badge both decorates the
// circle AND carries one of the three proof points, so nothing here is
// purely decorative.
const stats = [
  { value: solutions.length, label: 'Core Solutions', icon: 'layers' as const, badge: 'top-[2%] left-[-6%] sm:left-[-10%]', iconClass: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]', numClass: 'text-brand-500' },
  { value: industries.length, label: 'Industries Served', icon: 'target' as const, badge: 'bottom-[30%] right-[-8%] sm:right-[-14%]', iconClass: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]', numClass: 'text-accent-ice-600' },
  { value: products.length, label: 'Natro Products', icon: 'bulb' as const, badge: 'bottom-[0%] left-[8%] sm:left-[2%]', iconClass: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]', numClass: 'text-accent-green-700' }
]

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualWrapRef = useTemplateRef<HTMLDivElement>('visualWrapRef')
const medallionRef = useTemplateRef<HTMLDivElement>('medallionRef')
const badgesRef = useTemplateRef<HTMLDivElement>('badgesRef')
const numRefs = useTemplateRef<HTMLParagraphElement[]>('numRefs')
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
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div ref="contentRef" class="max-w-lg">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            A technology partner for businesses that want to grow.
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            We combine business understanding with software expertise to
            design practical systems that help companies operate more
            efficiently, automate repetitive work, and turn their own data
            into better decisions.
          </p>
          <AppButton v-if="learnAboutUs" variant="primary" size="lg" :to="learnAboutUs.to" class="mt-7">
            {{ learnAboutUs.label }}
          </AppButton>

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
                class="rounded-full border border-default px-3.5 py-1.5 text-body-sm font-medium text-default motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:border-brand-300 hover:text-brand-500"
              >
                {{ solution.title }}
              </span>
            </div>
          </div>
        </div>

        <!-- Circular brand medallion with the real stats as floating
             badges around its edge, instead of a stat panel sitting apart
             from the copy. -->
        <div ref="visualWrapRef" class="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md" style="perspective: 800px;">
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div class="h-[78%] w-[78%] rounded-full bg-gradient-to-br from-brand-100 to-accent-green-100 opacity-80 blur-md" />
          </div>
          <div class="pointer-events-none absolute inset-[9%] rounded-full border-2 border-dashed border-brand-200" aria-hidden="true" />

          <div
            ref="medallionRef"
            class="absolute inset-[19%] flex items-center justify-center rounded-full bg-gradient-to-br from-navy-950 to-brand-700 shadow-[0_32px_48px_-16px_rgba(16,19,50,0.35)]"
          >
            <!-- A literal mark, not initials: "Trigon" (three angles) with
                 each vertex tinted in the same three accent colors as the
                 stat badges around it — the shape ties directly to the
                 company name and to the three real numbers it's framing,
                 reaching its "Apex" at the top point. -->
            <svg viewBox="0 0 100 100" class="h-[42%] w-[42%]" fill="none" aria-hidden="true">
              <path d="M50 16 L84 80 L16 80 Z" stroke="white" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.92" />
              <circle cx="50" cy="16" r="5.5" class="fill-brand-300" />
              <circle cx="84" cy="80" r="5.5" class="fill-accent-ice-400" />
              <circle cx="16" cy="80" r="5.5" class="fill-accent-green-500" />
            </svg>
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
