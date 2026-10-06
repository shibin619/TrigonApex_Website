<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true). The section itself stays on the
// default light background — the page already goes light -> dark (this
// section's neighbor, OurApproach.vue) -> light in a deliberate rhythm, so
// making this whole section dark too would stack two dark bands back to
// back. Instead the drama is contained: one dark "spotlight" panel inside
// an otherwise light section, with the three numbers blown up to editorial
// scale, each a different accent color, staggered at different vertical
// offsets rather than aligned in a neat row — the visually bold move the
// contained Stripe-style strip never had room for.
const stats = [
  { value: solutions.length, label: 'Core Solutions', color: 'text-brand-300', offset: '' },
  { value: industries.length, label: 'Industries Served', color: 'text-accent-ice-400', offset: 'md:mt-10' },
  { value: products.length, label: 'Natro Products', color: 'text-accent-green-500', offset: 'md:mt-4' }
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

      <!-- Dark spotlight panel: the one bold, high-contrast moment the
           section was missing. Numbers at editorial scale, each a
           different accent, staggered at different heights instead of
           aligned. A short statement balances the stats on wide screens
           instead of leaving the panel's right half empty. -->
      <div class="relative mt-12 grid grid-cols-1 gap-10 overflow-hidden rounded-(--radius-xl) bg-navy-950 p-8 sm:p-12 md:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div class="pointer-events-none absolute inset-0 opacity-50" style="background-image: radial-gradient(circle at 15% 15%, var(--color-brand-700), transparent 45%), radial-gradient(circle at 85% 85%, var(--color-accent-green-700), transparent 45%);" aria-hidden="true" />

        <div ref="stripRef" class="relative flex flex-wrap items-start gap-x-12 gap-y-10">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="border-white/10"
            :class="[stat.offset, index > 0 ? 'border-l pl-12' : '']"
          >
            <p
              ref="numRefs"
              class="text-[3.5rem] leading-none font-bold tracking-tighter sm:text-[4.5rem] lg:text-[5.5rem]"
              :class="stat.color"
            >
              {{ stat.value }}
            </p>
            <p class="mt-3 text-body font-medium text-slate-300">{{ stat.label }}</p>
          </div>
        </div>

        <div class="relative flex items-center border-white/10 lg:border-l lg:pl-16">
          <p class="text-h4 leading-snug font-medium text-white">
            Every number here is a solution we've shipped, an industry we understand, and a product we've built &mdash; not a projection.
          </p>
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
