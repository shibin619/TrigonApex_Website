<script setup lang="ts">
import type { Testimonial } from '~/content/testimonials'
import { getCta } from '~/content/ctas'

// Per docs/HOMEPAGE_SPEC.md §13 / CONTENT_ARCHITECTURE.md §7: a
// testimonial never renders unless permission-approved (enforced by the
// API, not re-checked here), and the entire section is conditionally
// rendered only when at least one exists.
//
// Fetched client-only (server: false): the homepage ('/') is prerendered
// (see nuxt.config.ts routeRules), so a server-side fetch would bake in
// whatever testimonials existed at the last build. The admin portal
// publishes immediately on upload, so this section fetches fresh on every
// page view instead, independent of the static build.
const config = useRuntimeConfig()
const { data } = await useFetch<{ data: Testimonial[] }>('/api/v1/testimonials', {
  baseURL: config.public.apiBaseUrl,
  server: false,
  default: () => ({ data: [] })
})

const approvedTestimonials = computed(() => data.value?.data ?? [])
// HOMEPAGE_SPEC.md §13: a plain grid for three or fewer, a carousel only
// once there are enough (four+) to justify building carousel interaction
// for — not worth that complexity while nothing has reached that count.
// In the meantime, capping the teaser at 3 and linking to the full
// /testimonials page is what keeps a 4th+ review from simply having
// nowhere to be seen in the interim.
const displayedTestimonials = computed(() => approvedTestimonials.value.slice(0, 3))
const hasMoreTestimonials = computed(() => approvedTestimonials.value.length > 3)
const viewAllTestimonials = getCta('view-all-testimonials')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer v-if="approvedTestimonials.length" as="section" aria-labelledby="testimonials-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Testimonials
          </span>
          <h2 id="testimonials-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            What Clients Say
          </h2>
        </div>

        <ResponsiveGrid :cols="3" gap="md" class="mt-10 md:mt-12">
          <BaseCard v-for="testimonial in displayedTestimonials" :key="testimonial.id" variant="bordered">
            <div v-if="testimonial.photo" class="mb-4 flex items-center gap-3">
              <img :src="testimonial.photo.src" :alt="testimonial.photo.alt" width="40" height="40" loading="lazy" class="h-10 w-10 rounded-full object-cover">
            </div>
            <p class="text-body text-default">&ldquo;{{ testimonial.testimonial }}&rdquo;</p>
            <p class="mt-4 text-body-sm font-semibold text-highlighted">{{ testimonial.clientName }}</p>
            <p class="text-caption text-muted">
              <template v-if="testimonial.designation">{{ testimonial.designation }}, </template>{{ testimonial.company }}
            </p>
          </BaseCard>
        </ResponsiveGrid>

        <div v-if="hasMoreTestimonials" class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllTestimonials" variant="outline" :to="viewAllTestimonials.to">
            {{ viewAllTestimonials.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
