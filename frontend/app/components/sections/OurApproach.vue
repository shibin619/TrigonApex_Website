<script setup lang="ts">
// A dark contrast band stating the company's approach — reuses the exact,
// already-established wording from the "Why Trigon Apex" principles
// (components/sections/WhyTrigonApex.vue) rather than writing new
// marketing copy for this new section type.
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="our-approach-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-3xl">
        <span class="text-caption font-semibold tracking-widest text-brand-200 uppercase">
          Our Approach
        </span>
        <h2 id="our-approach-heading" class="mt-3 text-h2 font-semibold tracking-tight text-white">
          We start with how the business works, not with a technology stack.
        </h2>
        <p class="mt-4 max-w-xl text-body-lg text-slate-300">
          Systems built around actual operations, not forced into a
          generic template.
        </p>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
