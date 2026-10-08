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

// This used to reuse Solutions.vue's exact card language (gradient
// badge, floating box, corner glow, shadow) — which made the two
// sections visually interchangeable rather than each having its own
// identity. This section's six items are flat, parallel, non-
// sequential statements (not a process, not something to select), so
// instead of six separate floating cards it's now one seamless hairline
// grid — a shared border lattice with a subtle fill tint on hover,
// closer to a feature table than a stack of boxes.
const cardStyles = [
  { icon: 'bg-gradient-to-br from-brand-500 to-brand-700', hoverFill: 'group-hover:bg-brand-50/60', hoverTitle: 'group-hover:text-brand-500' },
  { icon: 'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600', hoverFill: 'group-hover:bg-accent-ice-400/8', hoverTitle: 'group-hover:text-accent-ice-600' },
  { icon: 'bg-gradient-to-br from-accent-green-500 to-accent-green-700', hoverFill: 'group-hover:bg-accent-green-500/8', hoverTitle: 'group-hover:text-accent-green-700' }
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

        <div ref="gridRef" class="mt-10 grid grid-cols-1 border-t border-l border-default sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          <div
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="group relative border-r border-b border-default p-7 motion-safe:transition-colors motion-safe:duration-(--duration-base) sm:p-8"
            :class="cardStyles[index % cardStyles.length]!.hoverFill"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-(--radius-md) text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110"
              :class="cardStyles[index % cardStyles.length]!.icon"
            >
              <span class="h-4.5 w-4.5" aria-hidden="true">
                <PrincipleIcon :id="principle.icon" />
              </span>
            </span>
            <h3
              class="mt-5 text-h4 font-semibold tracking-tight text-highlighted motion-safe:transition-colors motion-safe:duration-(--duration-fast)"
              :class="cardStyles[index % cardStyles.length]!.hoverTitle"
            >
              {{ principle.title }}
            </h3>
            <p class="mt-2 text-body text-default">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
