<script setup lang="ts">
import { gsap } from 'gsap'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Same three real, verifiable counts as before (docs/CONTENT_ARCHITECTURE.md
// §15: no metric without verified: true), now laid out as a bento grid
// (mixed tile sizes, asymmetric rhythm) instead of a plain box+text split —
// the split read as generic no matter how much hover polish it got, since
// the problem was the layout itself, not the interactions.
const leadFact = { value: solutions.length, label: 'Core Solutions' }
const industriesFact = { value: industries.length, label: 'Industries Served' }
const productsFact = { value: products.length, label: 'Natro Products' }

const learnAboutUs = getCta('learn-about-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const solutionsWrapRef = useTemplateRef<HTMLDivElement>('solutionsWrapRef')
const solutionsPanelRef = useTemplateRef<HTMLDivElement>('solutionsPanelRef')
const productsWrapRef = useTemplateRef<HTMLDivElement>('productsWrapRef')
const productsPanelRef = useTemplateRef<HTMLDivElement>('productsPanelRef')
useFadeIn(contentRef)

// Same pointer-tilt technique as the Hero illustration, applied to both
// gradient tiles — a flat tile reads as static otherwise; tilting it
// toward the cursor gives it the same dimensional feel, reusing the exact
// mechanism rather than inventing a second one.
function attachTilt(wrapEl: HTMLElement, panelEl: HTMLElement, maxDeg: number) {
  gsap.set(panelEl, { transformPerspective: 1000 })
  const setRotateX = gsap.quickTo(panelEl, 'rotationX', { duration: 0.5, ease: 'power2.out' })
  const setRotateY = gsap.quickTo(panelEl, 'rotationY', { duration: 0.5, ease: 'power2.out' })

  function onPointerMove(event: PointerEvent) {
    const rect = wrapEl.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setRotateY(px * maxDeg)
    setRotateX(py * -maxDeg)
  }
  function onPointerLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  wrapEl.addEventListener('pointermove', onPointerMove)
  wrapEl.addEventListener('pointerleave', onPointerLeave)
  onBeforeUnmount(() => {
    wrapEl.removeEventListener('pointermove', onPointerMove)
    wrapEl.removeEventListener('pointerleave', onPointerLeave)
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (solutionsWrapRef.value && solutionsPanelRef.value) attachTilt(solutionsWrapRef.value, solutionsPanelRef.value, 10)
  if (productsWrapRef.value && productsPanelRef.value) attachTilt(productsWrapRef.value, productsPanelRef.value, 10)
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            About Trigon Apex
          </span>
          <h2 id="about-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            A technology partner for businesses that want to grow.
          </h2>
        </div>

        <!-- Bento grid: mixed tile sizes instead of a uniform card row —
             text, two colorful gradient stat tiles, a bordered stat tile,
             and a wide pill tray, each sized differently on purpose. -->
        <div class="mt-10 grid grid-cols-1 gap-5 md:mt-12 lg:grid-cols-12">
          <div class="rounded-(--radius-xl) border border-default bg-default p-8 shadow-sm lg:col-span-6">
            <p class="text-body-lg text-muted">
              We combine business understanding with software expertise to
              design practical systems that help companies operate more
              efficiently, automate repetitive work, and turn their own
              data into better decisions.
            </p>
            <AppButton v-if="learnAboutUs" variant="text" :to="learnAboutUs.to" class="mt-6 px-0">
              {{ learnAboutUs.label }}
            </AppButton>
          </div>

          <div ref="solutionsWrapRef" class="lg:col-span-3" style="perspective: 1000px;">
            <div ref="solutionsPanelRef" class="group relative h-full overflow-hidden rounded-(--radius-xl) bg-gradient-to-br from-brand-500 to-brand-700 p-7 shadow-[0_16px_32px_-14px_rgba(16,19,50,0.4)] motion-safe:transition-shadow motion-safe:duration-(--duration-base) hover:shadow-[0_32px_56px_-16px_rgba(16,19,50,0.55)]">
              <span class="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl motion-safe:transition-colors motion-safe:duration-(--duration-slow) group-hover:bg-white/20" aria-hidden="true" />
              <p class="relative text-display font-semibold tracking-tighter text-white">{{ leadFact.value }}</p>
              <p class="relative mt-1 text-body font-medium text-white/80">{{ leadFact.label }}</p>
            </div>
          </div>

          <div class="group rounded-(--radius-xl) border border-default bg-default p-7 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1 hover:shadow-[0_24px_40px_-18px_rgba(52,152,197,0.4)] lg:col-span-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg) bg-accent-ice-400/10 text-accent-ice-600 motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:scale-110 group-hover:-rotate-3" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            </span>
            <p class="mt-4 text-display font-semibold tracking-tighter text-highlighted">{{ industriesFact.value }}</p>
            <p class="mt-1 text-body font-medium text-muted">{{ industriesFact.label }}</p>
          </div>

          <!-- Real solution names (not invented copy) as a quick-scan
               preview of what "software expertise" above actually covers —
               the full Solutions section below goes into each one properly. -->
          <div class="rounded-(--radius-xl) border border-default bg-default p-7 shadow-sm lg:col-span-8">
            <p class="text-caption font-semibold tracking-widest text-muted uppercase">What We Build</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="solution in solutions"
                :key="solution.id"
                class="rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-body-sm font-medium text-brand-500 motion-safe:transition-[transform,background-color,color] motion-safe:duration-(--duration-fast) hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white"
              >
                {{ solution.title }}
              </span>
            </div>
          </div>

          <div ref="productsWrapRef" class="lg:col-span-4" style="perspective: 1000px;">
            <div ref="productsPanelRef" class="group relative h-full overflow-hidden rounded-(--radius-xl) bg-gradient-to-br from-accent-green-500 to-accent-green-700 p-7 shadow-[0_16px_32px_-14px_rgba(16,19,50,0.3)] motion-safe:transition-shadow motion-safe:duration-(--duration-base) hover:shadow-[0_32px_56px_-16px_rgba(16,19,50,0.45)]">
              <span class="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl motion-safe:transition-colors motion-safe:duration-(--duration-slow) group-hover:bg-white/20" aria-hidden="true" />
              <p class="relative text-display font-semibold tracking-tighter text-white">{{ productsFact.value }}</p>
              <p class="relative mt-1 text-body font-medium text-white/80">{{ productsFact.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
