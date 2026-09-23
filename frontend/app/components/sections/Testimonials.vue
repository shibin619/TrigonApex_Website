<script setup lang="ts">
import { getApprovedTestimonials } from '~/content/testimonials'

// Per docs/HOMEPAGE_SPEC.md §13 / CONTENT_ARCHITECTURE.md §7: a
// testimonial never renders unless permission-approved, and the entire
// section is conditionally rendered only when at least one exists. No
// approved testimonials exist yet, so this component renders nothing at
// all today — an absent section reads as intentional, not unfinished.
// The structure below is ready for real, approved testimonials as soon
// as they exist; nothing here is a placeholder or fabricated quote.
const approvedTestimonials = getApprovedTestimonials()
</script>

<template>
  <SectionContainer v-if="approvedTestimonials.length" as="section" aria-labelledby="testimonials-heading">
    <PageContainer as="div">
      <div class="max-w-2xl">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          Testimonials
        </span>
        <h2 id="testimonials-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
          What Clients Say
        </h2>
      </div>

      <ResponsiveGrid :cols="3" gap="md" class="mt-10 md:mt-12">
        <BaseCard v-for="testimonial in approvedTestimonials" :key="testimonial.id" variant="bordered">
          <p class="text-body text-default">&ldquo;{{ testimonial.testimonial }}&rdquo;</p>
          <p class="mt-4 text-body-sm font-semibold text-highlighted">{{ testimonial.clientName }}</p>
          <p class="text-caption text-muted">{{ testimonial.designation }}, {{ testimonial.company }}</p>
        </BaseCard>
      </ResponsiveGrid>
    </PageContainer>
  </SectionContainer>
</template>
