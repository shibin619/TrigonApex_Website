<script setup lang="ts">
// A dark contrast band stating the company's approach — reuses the exact,
// already-established wording from the "Why Trigon Apex" principles
// (components/sections/WhyTrigonApex.vue) rather than writing new
// marketing copy for this new section type. This is literally the
// "Business-first thinking" principle, so it reuses that same icon/badge
// treatment (gradient chip + the 'target' mark) rather than being bare
// text — every other section on the page by now has that level of visual
// weight (icon chips, gradient cards, glow), and a flat, unadorned band
// here read as an earlier, unfinished version of the site next to them.
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="our-approach-heading" class="relative overflow-hidden bg-navy-950">
    <div class="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" aria-hidden="true" />
    <PageContainer as="div" class="relative">
      <div ref="contentRef" class="max-w-3xl">
        <span class="flex h-12 w-12 items-center justify-center rounded-(--radius-lg) bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]">
          <span class="h-6 w-6" aria-hidden="true">
            <PrincipleIcon id="target" />
          </span>
        </span>
        <span class="mt-5 block text-caption font-semibold tracking-widest text-brand-200 uppercase">
          Our Approach
        </span>
        <h2 id="our-approach-heading" class="mt-3 text-h2 font-semibold tracking-tight text-white">
          We start with how the business works, not with a
          <span class="text-brand-200">technology stack</span>.
        </h2>
        <p class="mt-4 max-w-xl text-body-lg text-slate-300">
          Systems built around actual operations, not forced into a
          generic template.
        </p>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
