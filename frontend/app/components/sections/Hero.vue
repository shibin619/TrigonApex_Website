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
// and the interface panels settle into place after. Purely decorative
// motion layered on top of a fully-formed, already-visible SSR-rendered
// SVG — if this never runs (JS disabled, animation skipped), the visual
// is still complete.
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

  const panels = visualRef.value.querySelectorAll<SVGGElement>('.hero-visual-panel')
  gsap.from(panels, {
    opacity: 0,
    y: 12,
    duration: 0.45,
    delay: 0.3,
    stagger: 0.15,
    ease: 'power2.out'
  })
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
          <!-- A small conceptual software ecosystem — three connected
               interface fragments (Customers → Operations → Data) rather
               than abstract nodes, resolving into a Decisions → Growth
               line. aspect-ratio reserves space before the SVG paints, so
               the Hero causes no layout shift. -->
          <div class="mx-auto aspect-[6/5] w-full max-w-lg">
            <svg
              ref="visualRef"
              viewBox="0 0 480 400"
              class="h-full w-full"
              aria-hidden="true"
              focusable="false"
            >
              <!-- Platform tag -->
              <rect x="404" y="12" width="64" height="22" rx="11" class="fill-brand-500" />
              <text x="436" y="27" text-anchor="middle" class="fill-white text-[11px] font-semibold tracking-wide">NATRO</text>

              <!-- Connections between fragments -->
              <path class="hero-visual-line stroke-brand-200" d="M101,112 Q180,120 295,130" fill="none" stroke-width="2" />
              <path class="hero-visual-line stroke-brand-200" d="M295,218 Q220,230 135,240" fill="none" stroke-width="2" />

              <!-- Decisions → Growth -->
              <path class="hero-visual-line stroke-accent-green-500" d="M135,328 Q280,378 383,354" fill="none" stroke-width="2.5" />
              <polygon class="fill-accent-green-500" points="383,354 371,352 375,363" />
              <text x="200" y="368" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Decisions</text>
              <text x="392" y="338" text-anchor="middle" class="fill-slate-500 text-[12px] font-medium">Growth</text>

              <!-- Fragment: Customers -->
              <g class="hero-visual-panel">
                <rect x="16" y="24" width="170" height="88" rx="10" class="fill-white stroke-slate-200" stroke-width="1.5" />
                <line x1="16" y1="48" x2="186" y2="48" class="stroke-slate-200" stroke-width="1.5" />
                <circle cx="28" cy="36" r="3" class="fill-slate-300" />
                <circle cx="38" cy="36" r="3" class="fill-slate-300" />
                <circle cx="48" cy="36" r="3" class="fill-slate-300" />
                <text x="60" y="40" class="fill-slate-500 text-[11px] font-semibold">Customers</text>
                <rect x="28" y="64" width="120" height="8" rx="4" class="fill-slate-100" />
                <rect x="28" y="80" width="80" height="8" rx="4" class="fill-brand-200" />
              </g>

              <!-- Fragment: Operations -->
              <g class="hero-visual-panel">
                <rect x="210" y="130" width="170" height="88" rx="10" class="fill-white stroke-slate-200" stroke-width="1.5" />
                <line x1="210" y1="154" x2="380" y2="154" class="stroke-slate-200" stroke-width="1.5" />
                <circle cx="222" cy="142" r="3" class="fill-slate-300" />
                <circle cx="232" cy="142" r="3" class="fill-slate-300" />
                <circle cx="242" cy="142" r="3" class="fill-slate-300" />
                <text x="254" y="146" class="fill-slate-500 text-[11px] font-semibold">Operations</text>
                <rect x="222" y="170" width="120" height="8" rx="4" class="fill-slate-100" />
                <rect x="222" y="186" width="90" height="8" rx="4" class="fill-accent-ice-400" />
              </g>

              <!-- Fragment: Data -->
              <g class="hero-visual-panel">
                <rect x="50" y="240" width="170" height="88" rx="10" class="fill-white stroke-slate-200" stroke-width="1.5" />
                <line x1="50" y1="264" x2="220" y2="264" class="stroke-slate-200" stroke-width="1.5" />
                <circle cx="62" cy="252" r="3" class="fill-slate-300" />
                <circle cx="72" cy="252" r="3" class="fill-slate-300" />
                <circle cx="82" cy="252" r="3" class="fill-slate-300" />
                <text x="94" y="256" class="fill-slate-500 text-[11px] font-semibold">Data</text>
                <rect x="62" y="292" width="10" height="20" rx="2" class="fill-brand-200" />
                <rect x="78" y="282" width="10" height="30" rx="2" class="fill-brand-300" />
                <rect x="94" y="298" width="10" height="14" rx="2" class="fill-brand-200" />
              </g>
            </svg>
          </div>
        </template>
      </SplitLayout>
    </PageContainer>
  </SectionContainer>
</template>
