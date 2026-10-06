<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true). The dark stat panel sits beside
// the copy as a compact portrait card — the same left-text/right-visual
// split used in Hero.vue — rather than a full-bleed strip underneath it,
// so it reads as one composed section instead of two stacked, unrelated
// blocks. The section itself stays on the default light background: the
// page already goes light -> dark (this section's neighbor, OurApproach.vue)
// -> light in a deliberate rhythm, so making the whole section dark too
// would stack two dark bands back to back.
const stats = [
  { value: solutions.length, label: 'Core Solutions', color: 'text-brand-300' },
  { value: industries.length, label: 'Industries Served', color: 'text-accent-ice-400' },
  { value: products.length, label: 'Natro Products', color: 'text-accent-green-500' }
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
      <div class="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
        <div ref="contentRef" class="flex flex-col justify-center">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            A technology partner for businesses that want to grow.
          </h2>
          <p class="mt-4 max-w-lg text-body-lg text-muted">
            We combine business understanding with software expertise to
            design practical systems that help companies operate more
            efficiently, automate repetitive work, and turn their own data
            into better decisions.
          </p>
          <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-5 self-start px-0">
            {{ learnAboutUs.label }}
          </AppButton>

          <!-- Real solution names (not invented copy) as a quick-scan
               preview of what "software expertise" above actually covers —
               the full Solutions section below goes into each one
               properly. -->
          <div class="mt-8">
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

        <!-- Dark spotlight panel: a compact portrait card beside the copy
             (same split as Hero's text/visual layout), not a wide bar
             underneath it. Three numbers stacked at editorial scale, each
             a different accent color. -->
        <div class="relative overflow-hidden rounded-(--radius-xl) bg-navy-950 p-8 sm:p-10">
          <div class="pointer-events-none absolute inset-0 opacity-50" style="background-image: radial-gradient(circle at 20% 10%, var(--color-brand-700), transparent 50%), radial-gradient(circle at 85% 90%, var(--color-accent-green-700), transparent 50%);" aria-hidden="true" />

          <div ref="stripRef" class="relative flex h-full flex-col justify-center gap-8">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              class="border-white/10"
              :class="index > 0 ? 'border-t pt-8' : ''"
            >
              <p
                ref="numRefs"
                class="text-[3.25rem] leading-none font-bold tracking-tighter sm:text-[3.75rem]"
                :class="stat.color"
              >
                {{ stat.value }}
              </p>
              <p class="mt-2 text-body font-medium text-slate-300">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
