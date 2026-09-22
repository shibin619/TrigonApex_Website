<script setup lang="ts">
import { gsap } from 'gsap'
import { getCta } from '~/content/ctas'

// Copy is verbatim from the Stage 8D brief — the H1 communicates the
// positioning via line-break/color treatment only (no wording change);
// the supporting paragraph is the exact given company statement. Neither
// is authored here. Company identity itself is established by the
// always-visible header brand mark, not repeated in the Hero copy.
const exploreSolutions = getCta('explore-solutions')
const seeHowItWorks = getCta('see-how-it-works')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const visualRef = useTemplateRef<SVGSVGElement>('visualRef')

useFadeIn(contentRef)

// Restrained entrance for the system visual: connecting lines "draw" in
// and nodes pop in briefly after. Purely decorative motion layered on top
// of a fully-formed, already-visible SSR-rendered SVG — if this never
// runs (JS disabled, animation skipped), the visual is still complete.
onMounted(() => {
  if (!visualRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lines = visualRef.value.querySelectorAll<SVGGeometryElement>('.hero-visual-line')
  lines.forEach((line, i) => {
    const length = line.getTotalLength()
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: 'power2.out'
    })
  })

  const nodes = visualRef.value.querySelectorAll<SVGCircleElement>('.hero-visual-node')
  gsap.from(nodes, {
    opacity: 0,
    scale: 0.5,
    transformOrigin: '50% 50%',
    duration: 0.4,
    delay: 0.6,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  })

  const fragment = visualRef.value.querySelector<SVGGElement>('.hero-visual-fragment')
  if (fragment) {
    gsap.from(fragment, { opacity: 0, y: 8, duration: 0.4, delay: 1, ease: 'power2.out' })
  }
})
</script>

<template>
  <SectionContainer as="section" aria-labelledby="hero-heading">
    <PageContainer as="div">
      <SplitLayout>
        <template #content>
          <div ref="contentRef">
            <h1 id="hero-heading" class="text-display font-semibold tracking-tight text-highlighted">
              Software Solutions
              <span class="block text-brand-500">for Business Growth</span>
            </h1>

            <p class="mt-6 max-w-xl text-body-lg text-muted">
              We build software systems that help businesses acquire
              customers, improve operations, understand data, and scale.
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <AppButton v-if="exploreSolutions" variant="primary" :to="exploreSolutions.to">
                {{ exploreSolutions.label }}
              </AppButton>
              <AppButton v-if="seeHowItWorks" variant="outline" :to="seeHowItWorks.to">
                {{ seeHowItWorks.label }}
              </AppButton>
            </div>
          </div>
        </template>

        <template #visual>
          <!-- aspect-ratio reserves space before the SVG paints, so the
               Hero causes no layout shift. Sized larger than the text
               column's natural width so the diagram reads as the page's
               visual anchor, not a small decorative afterthought. -->
          <div class="mx-auto aspect-[6/5] w-full max-w-lg">
            <svg
              ref="visualRef"
              viewBox="0 0 480 400"
              class="h-full w-full"
              aria-hidden="true"
              focusable="false"
            >
              <!-- Connections: hub -> four business-function nodes -->
              <line class="hero-visual-line stroke-brand-200" x1="240" y1="200" x2="110" y2="110" stroke-width="2" />
              <line class="hero-visual-line stroke-brand-200" x1="240" y1="200" x2="370" y2="95" stroke-width="2" />
              <line class="hero-visual-line stroke-brand-200" x1="240" y1="200" x2="100" y2="300" stroke-width="2" />
              <line class="hero-visual-line stroke-brand-200" x1="240" y1="200" x2="375" y2="305" stroke-width="2" />

              <!-- Growth trend: an unlabeled directional mark only — no
                   axis, no values, not a chart. -->
              <path
                class="hero-visual-line stroke-accent-green-500"
                d="M375,305 Q410,270 428,255"
                fill="none"
                stroke-width="2.5"
              />
              <polygon class="fill-accent-green-500" points="428,255 417,257 423,266" />

              <!-- Interface fragment: an abstract wireframe card, no real
                   text or numbers, near the "operations" node. -->
              <g class="hero-visual-fragment">
                <rect x="390" y="40" width="80" height="54" rx="8" class="fill-white stroke-slate-200" stroke-width="1.5" />
                <rect x="402" y="54" width="40" height="6" rx="3" class="fill-slate-200" />
                <rect x="402" y="66" width="56" height="6" rx="3" class="fill-slate-200" />
                <rect x="402" y="78" width="28" height="6" rx="3" class="fill-brand-300" />
              </g>

              <!-- Hub: the software platform -->
              <circle class="fill-brand-500" cx="240" cy="200" r="30" />
              <text x="240" y="205" text-anchor="middle" class="fill-white text-[13px] font-semibold">Natro</text>

              <!-- Business-function nodes: customers, operations, data,
                   growth — labeled so the diagram states the same
                   Business → Operations → Data → Growth relationship the
                   supporting paragraph already describes, not just an
                   abstract shape. -->
              <circle class="hero-visual-node fill-navy-800" cx="110" cy="110" r="16" />
              <text x="110" y="140" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Customers</text>

              <circle class="hero-visual-node fill-white stroke-brand-300" stroke-width="2" cx="370" cy="95" r="18" />
              <text x="370" y="127" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Operations</text>

              <circle class="hero-visual-node fill-accent-ice-400" cx="100" cy="300" r="15" />
              <text x="100" y="330" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Data</text>

              <circle class="hero-visual-node fill-accent-green-500" cx="375" cy="305" r="18" />
              <text x="375" y="338" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Growth</text>
            </svg>
          </div>
        </template>
      </SplitLayout>
    </PageContainer>
  </SectionContainer>
</template>
