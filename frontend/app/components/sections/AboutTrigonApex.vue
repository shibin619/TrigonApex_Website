<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true). Previously shown over a stock
// photo of generic office people — the only photography on an otherwise
// flat-illustration/line-icon site, which read as off-brand. Replaced with
// a gradient stat panel using the same visual language as the rest of the
// page (the Solutions section's highlighted card, the Product Tour's dark
// panel): no new colors, just the existing brand gradient + icon-chip
// pattern applied here too, so nothing here is invented or duplicated.
const leadFact = { value: solutions.length, label: 'Core Solutions' }
const supportingFacts = [
  { value: industries.length, label: 'Industries Served', icon: 'grid' as const },
  { value: products.length, label: 'Natro Products', icon: 'box' as const }
]

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const panelWrapRef = useTemplateRef<HTMLDivElement>('panelWrapRef')
const panelRef = useTemplateRef<HTMLDivElement>('panelRef')
useFadeIn(contentRef)

// Same pointer-tilt technique as the Hero illustration — a flat gradient
// panel reads as static otherwise; tilting it toward the cursor gives it
// the same "premium" dimensional feel, reusing the exact mechanism rather
// than inventing a second one.
onMounted(() => {
  if (!panelRef.value || !panelWrapRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.set(panelRef.value, { transformPerspective: 1000 })
  const setRotateX = gsap.quickTo(panelRef.value, 'rotationX', { duration: 0.5, ease: 'power2.out' })
  const setRotateY = gsap.quickTo(panelRef.value, 'rotationY', { duration: 0.5, ease: 'power2.out' })

  function onPointerMove(event: PointerEvent) {
    const wrap = panelWrapRef.value
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

  panelWrapRef.value.addEventListener('pointermove', onPointerMove)
  panelWrapRef.value.addEventListener('pointerleave', onPointerLeave)
  onBeforeUnmount(() => {
    panelWrapRef.value?.removeEventListener('pointermove', onPointerMove)
    panelWrapRef.value?.removeEventListener('pointerleave', onPointerLeave)
  })
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div ref="panelWrapRef" class="lg:col-span-5" style="perspective: 1000px;">
          <div ref="panelRef" class="group relative overflow-hidden rounded-(--radius-xl) bg-gradient-to-br from-brand-500 to-brand-700 p-8 shadow-[0_16px_32px_-14px_rgba(16,19,50,0.4)] motion-safe:transition-shadow motion-safe:duration-(--duration-base) hover:shadow-[0_32px_56px_-16px_rgba(16,19,50,0.55)] sm:p-10">
            <!-- Same corner-glow treatment as the Solutions highlighted
                 card and the product tour panels — ambient at rest,
                 brighter on hover, purely decorative. -->
            <span class="pointer-events-none absolute -top-14 -right-14 h-48 w-48 rounded-full bg-white/10 blur-3xl motion-safe:transition-colors motion-safe:duration-(--duration-slow) group-hover:bg-white/20" aria-hidden="true" />
            <span class="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

            <p class="relative text-display font-semibold tracking-tighter text-white">{{ leadFact.value }}</p>
            <p class="relative mt-1 text-body-lg font-medium text-white/80">{{ leadFact.label }}</p>

            <div class="relative mt-10 space-y-5 border-t border-white/15 pt-8">
              <div v-for="fact in supportingFacts" :key="fact.label" class="group/fact flex items-center gap-4">
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-lg) bg-white/15 text-white motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover/fact:scale-110 group-hover/fact:-rotate-3" aria-hidden="true">
                  <svg v-if="fact.icon === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M21 8l-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
                </span>
                <p class="text-body font-medium text-white">
                  <span class="font-semibold">{{ fact.value }}</span> {{ fact.label }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            A technology partner for businesses that want to grow.
          </h2>
          <p class="mt-4 max-w-xl text-body-lg text-muted">
            We combine business understanding with software expertise to
            design practical systems that help companies operate more
            efficiently, automate repetitive work, and turn their own
            data into better decisions.
          </p>

          <!-- Real solution names (not invented copy) as a quick-scan
               preview of what "software expertise" above actually covers —
               the full Solutions section below goes into each one properly. -->
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="solution in solutions"
              :key="solution.id"
              class="rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-body-sm font-medium text-brand-500 motion-safe:transition-[transform,background-color,color] motion-safe:duration-(--duration-fast) hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white"
            >
              {{ solution.title }}
            </span>
          </div>

          <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-8 px-0">
            {{ learnAboutUs.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
