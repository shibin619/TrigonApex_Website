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

const chipStyles = ['bg-brand-50 text-brand-500', 'bg-accent-ice-400/10 text-accent-ice-600', 'bg-accent-green-500/10 text-accent-green-700']

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="why-trigon-apex-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Why Trigon Apex
          </span>
          <h2 id="why-trigon-apex-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            Why Businesses Work With Trigon Apex
          </h2>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-default pt-10 sm:grid-cols-2 md:mt-12 md:pt-12">
          <div v-for="(principle, index) in principles" :key="principle.title">
            <span class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg)" :class="chipStyles[index % chipStyles.length]">
              <span class="h-5 w-5" aria-hidden="true">
                <PrincipleIcon :id="principle.icon" />
              </span>
            </span>
            <h3 class="mt-4 text-h4 font-semibold tracking-tight text-highlighted">
              {{ principle.title }}
            </h3>
            <p class="mt-2 max-w-sm text-body text-default">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
