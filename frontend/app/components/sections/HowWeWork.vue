<script setup lang="ts">
// Same reference as the Hero restyle: centered pill badge + bold centered
// heading, then a row of staggered-height cards below — applied here
// instead (this was the section actually asked for). Drops the ribbon/
// connector-line version entirely: that whole approach (a line threading
// through every step) doesn't combine with a staggered-height card row,
// since a straight connecting line assumes every card sits on the same
// baseline. Reuses the same panel-style/stagger-offset mechanics just
// built for the Hero's solution strip, applied to the five process steps.
interface ProcessStep {
  title: string
  description: string
  icon: 'target' | 'flow' | 'layers' | 'link' | 'chart'
}

const steps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand the business, users and workflows.', icon: 'target' },
  { title: 'Define', description: 'Identify the right solution and system structure.', icon: 'flow' },
  { title: 'Build', description: 'Develop and integrate the required software.', icon: 'layers' },
  { title: 'Launch', description: 'Deploy, test and make the system operational.', icon: 'link' },
  { title: 'Improve', description: 'Use feedback and data to continuously improve.', icon: 'chart' }
]

const panelStyles = [
  { bg: 'bg-gradient-to-br from-brand-500 to-brand-700', icon: 'text-white', title: 'text-white', body: 'text-white/80', badge: 'bg-white/15 text-white', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(73,89,179,0.45)]' },
  { bg: 'bg-accent-ice-400/15', icon: 'text-accent-ice-600', title: 'text-highlighted', body: 'text-muted', badge: 'bg-white/80 text-accent-ice-600', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(52,152,197,0.35)]' },
  { bg: 'bg-accent-green-500/15', icon: 'text-accent-green-700', title: 'text-highlighted', body: 'text-muted', badge: 'bg-white/80 text-accent-green-700', shadow: 'hover:shadow-[0_24px_40px_-16px_rgba(66,148,110,0.35)]' }
]

// Alternating heights + vertical offsets give the row its staggered,
// collage-like rhythm instead of a flat uniform grid.
const cardLayout = [
  { height: 'h-72', offset: '' },
  { height: 'h-60', offset: 'sm:mt-10' },
  { height: 'h-80', offset: '' },
  { height: 'h-64', offset: 'sm:mt-8' },
  { height: 'h-[17rem]', offset: 'sm:mt-3' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const stripRef = useTemplateRef<HTMLDivElement>('stripRef')
useFadeIn(contentRef)
useStaggerReveal(stripRef, 'li', { each: true })
</script>

<template>
  <SectionContainer as="section" aria-labelledby="how-we-work-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          How We Work
        </span>
        <h2 id="how-we-work-heading" class="mt-5 text-h2 font-semibold tracking-tight text-highlighted">
          From Business Problem to Working Software
        </h2>
      </div>

      <ol ref="stripRef" class="scrollbar-hidden mt-14 flex items-start gap-5 overflow-x-auto pb-6 md:mt-16 sm:pb-10" style="scroll-snap-type: x mandatory;">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="group relative w-56 shrink-0 snap-start overflow-hidden rounded-(--radius-xl) p-6 shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1.5 sm:w-64"
          :class="[panelStyles[index % panelStyles.length]!.bg, panelStyles[index % panelStyles.length]!.shadow, cardLayout[index % cardLayout.length]!.height, cardLayout[index % cardLayout.length]!.offset]"
        >
          <span class="flex h-full flex-col">
            <span class="flex items-center justify-between">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-(--radius-lg) motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
                :class="index % panelStyles.length === 0 ? 'bg-white/15' : 'bg-white/70'"
                aria-hidden="true"
              >
                <span class="h-5 w-5" :class="panelStyles[index % panelStyles.length]!.icon">
                  <PrincipleIcon :id="step.icon" />
                </span>
              </span>
              <span
                class="flex h-7 w-7 items-center justify-center rounded-full text-body-sm font-bold"
                :class="panelStyles[index % panelStyles.length]!.badge"
              >
                {{ index + 1 }}
              </span>
            </span>
            <h3 class="mt-6 text-h4 font-semibold tracking-tight" :class="panelStyles[index % panelStyles.length]!.title">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-body-sm" :class="panelStyles[index % panelStyles.length]!.body">
              {{ step.description }}
            </p>
          </span>
        </li>
      </ol>
    </PageContainer>
  </SectionContainer>
</template>
