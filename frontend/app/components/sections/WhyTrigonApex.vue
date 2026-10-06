<script setup lang="ts">
// The six documented strengths, exactly as given — no additions, no
// superlatives ("best", "leading", "#1"), per docs/HOMEPAGE_SPEC.md §14.
// Each gets a small custom line icon in a colored chip (rotating
// brand/ice/green, one color per chip) rather than a bare numbered list.
interface Principle {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'bulb' | 'chart' | 'link'
}

const principles: Principle[] = [
  { title: 'Business-first thinking', description: 'We start with how the business works, not with a technology stack.', icon: 'target' },
  { title: 'Software around real workflows', description: 'Systems built around actual operations, not forced into a generic template.', icon: 'flow' },
  { title: 'Scalable architecture', description: 'Built to extend as the business grows, not rebuilt from scratch.', icon: 'layers' },
  { title: 'Clear product thinking', description: 'Every system is designed with a clear purpose, not just built to spec.', icon: 'bulb' },
  { title: 'Data-driven operations', description: "Decisions grounded in what the business's own data shows.", icon: 'chart' },
  { title: 'Long-term technology partnership', description: 'Working with a business well beyond the initial build.', icon: 'link' }
]

// Gradient icon badge + matching hover glow/title color per card, cycled
// across the three validated brand families — same card language as the
// Solutions section (gradient badge, corner glow on hover, colored
// shadow) applied here so the two sections don't feel like different
// design systems.
const cardStyles = [
  { icon: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]', glow: 'bg-brand-300/30', hoverBorder: 'hover:border-brand-300', hoverTitle: 'group-hover:text-brand-500' },
  { icon: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]', glow: 'bg-accent-ice-400/30', hoverBorder: 'hover:border-accent-ice-400', hoverTitle: 'group-hover:text-accent-ice-600' },
  { icon: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]', glow: 'bg-accent-green-500/30', hoverBorder: 'hover:border-accent-green-500', hoverTitle: 'group-hover:text-accent-green-700' }
]

const headerRef = useTemplateRef<HTMLDivElement>('headerRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(headerRef)
useStaggerReveal(gridRef, ':scope > div')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="why-trigon-apex-heading">
    <PageContainer as="div">
      <div>
        <div ref="headerRef" class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Why Trigon Apex
          </span>
          <h2 id="why-trigon-apex-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            Why Businesses Work With Trigon Apex
          </h2>
        </div>

        <div ref="gridRef" class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          <div
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="group relative overflow-hidden rounded-(--radius-xl) border border-default bg-default p-6 shadow-sm motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-18px_rgba(16,19,50,0.25)]"
            :class="cardStyles[index % cardStyles.length]!.hoverBorder"
          >
            <span
              class="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full opacity-0 blur-3xl motion-safe:transition-opacity motion-safe:duration-(--duration-slow) group-hover:opacity-100"
              :class="cardStyles[index % cardStyles.length]!.glow"
              aria-hidden="true"
            />
            <span
              class="relative flex h-12 w-12 items-center justify-center rounded-(--radius-lg) text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
              :class="cardStyles[index % cardStyles.length]!.icon"
            >
              <span class="h-5 w-5" aria-hidden="true">
                <PrincipleIcon :id="principle.icon" />
              </span>
            </span>
            <h3
              class="relative mt-4 text-h4 font-semibold tracking-tight text-highlighted motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
              :class="cardStyles[index % cardStyles.length]!.hoverTitle"
            >
              {{ principle.title }}
            </h3>
            <p class="relative mt-2 text-body text-default">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
