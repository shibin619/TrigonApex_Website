<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true). Previous passes (photo, gradient
// panel, bento grid) kept adding more decoration — color, shadow, motion —
// and it kept reading as "not quite it". Pivoted to the opposite direction:
// the restraint Stripe/Linear/Vercel's own stat sections actually use —
// thin hairline borders instead of heavy drop-shadows, large typography-
// led numbers instead of boxed gradient cards, a subtle dot-grid texture
// instead of blurred color blobs. One continuous editorial column instead
// of a split layout.
const stats = [
  { value: solutions.length, label: 'Core Solutions' },
  { value: industries.length, label: 'Industries Served' },
  { value: products.length, label: 'Natro Products' }
]

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const stripRef = useTemplateRef<HTMLDivElement>('stripRef')
const numRefs = useTemplateRef<HTMLParagraphElement[]>('numRefs')
useFadeIn(contentRef)
useStaggerReveal(stripRef, ':scope > div')

// Count-up on scroll-into-view, same technique as a Stripe/Linear metrics
// strip — takes over the DOM text directly since these values never
// change after mount, so there's nothing for Vue to stay in sync with.
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!stripRef.value || !('IntersectionObserver' in window)) return

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
  observer.observe(stripRef.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-2xl">
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
        <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-5 px-0">
          {{ learnAboutUs.label }}
        </AppButton>
      </div>

      <!-- Metrics strip: thin border + a fine dot-grid texture (the
           "engineered" cue from Linear/Vercel) instead of a colored
           gradient card. Numbers are plain typography, not boxed. -->
      <div
        ref="stripRef"
        class="relative mt-12 grid grid-cols-1 overflow-hidden rounded-(--radius-xl) border border-default sm:grid-cols-3 md:mt-14"
        style="background-image: radial-gradient(circle, var(--color-brand-200) 1px, transparent 1px); background-size: 22px 22px; background-color: var(--color-brand-50);"
      >
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="group relative border-default bg-default/55 p-8 backdrop-blur-[2px] motion-safe:transition-colors motion-safe:duration-(--duration-base) hover:bg-brand-50/60"
          :class="index > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''"
        >
          <p
            ref="numRefs"
            class="text-display font-bold tracking-tighter text-highlighted motion-safe:transition-colors motion-safe:duration-(--duration-base) group-hover:text-brand-500"
          >
            {{ stat.value }}
          </p>
          <p class="mt-1 text-body text-muted">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Real solution names (not invented copy) as a quick-scan preview
           of what "software expertise" above actually covers — the full
           Solutions section below goes into each one properly. -->
      <div class="mt-10 md:mt-12">
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
    </PageContainer>
  </SectionContainer>
</template>
