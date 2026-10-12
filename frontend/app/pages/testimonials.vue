<script setup lang="ts">
import type { Testimonial } from '~/content/testimonials'
import { siteConfig } from '~/content/site.config'
import { getCta } from '~/content/ctas'

// Testimonials — flagged: there was no way to view client reviews on the
// site at all. The homepage's Testimonials.vue section already shows
// every approved testimonial, but it's a conditional homepage block with
// no link anywhere pointing at it on its own, and it disappears entirely
// (by design, per HOMEPAGE_SPEC.md §13) the moment zero approved
// testimonials exist — which is the current state (0 published). A
// visitor specifically looking for reviews had no page to land on and,
// right now, would find nothing at all rather than an honest "none yet".
//
// Fetched server-side (not server:false like the homepage section) —
// this route isn't prerendered (see nuxt.config.ts routeRules, only '/'
// is), so a normal SSR fetch means the content is in the initial HTML
// for both users and crawlers, rather than appearing only after
// client-side JS runs.
const config = useRuntimeConfig()
const { data } = await useFetch<{ data: Testimonial[] }>('/api/v1/testimonials', {
  baseURL: config.public.apiBaseUrl,
  default: () => ({ data: [] })
})
const approvedTestimonials = computed(() => data.value?.data ?? [])

useSeo({
  title: `Client Reviews | ${siteConfig.companyName}`,
  description: 'What clients say about working with Trigon Apex — real, permission-approved reviews only.',
  canonical: 'https://trigonapex.in/testimonials',
  og: {
    title: `Client Reviews | ${siteConfig.companyName}`,
    description: 'What clients say about working with Trigon Apex — real, permission-approved reviews only.',
    image: null
  },
  twitter: {
    title: `Client Reviews | ${siteConfig.companyName}`,
    description: 'What clients say about working with Trigon Apex — real, permission-approved reviews only.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'CollectionPage'
}, approvedTestimonials.value.length
  ? {
      name: 'Client Reviews',
      description: 'What clients say about working with Trigon Apex.',
      hasPart: approvedTestimonials.value.map((testimonial) => ({
        '@type': 'Review',
        reviewBody: testimonial.testimonial,
        author: { '@type': 'Person', name: testimonial.clientName }
      }))
    }
  : undefined)

const talkToUs = getCta('talk-to-us')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="testimonials-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Client Reviews
          </span>
          <h1 id="testimonials-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            What Clients Say
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            Real feedback from businesses we&rsquo;ve worked with &mdash;
            only published once a client has approved it.
          </p>
        </div>

        <ResponsiveGrid v-if="approvedTestimonials.length" :cols="3" gap="md" class="mt-14 md:mt-16">
          <BaseCard v-for="testimonial in approvedTestimonials" :key="testimonial.id" variant="bordered">
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

        <!-- Honest empty state rather than a blank page — this is a page
             people navigate to specifically for reviews, not a homepage
             teaser that can just disappear. No invented reviews, no fake
             "coming soon" countdown, just a plain statement of fact. -->
        <div v-else class="mx-auto mt-14 max-w-md rounded-(--radius-lg) border border-default bg-elevated/60 p-8 text-center md:mt-16">
          <p class="text-body text-default">
            No client reviews are published yet. We only publish a review
            once a client has given permission &mdash; check back soon.
          </p>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="testimonials-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="testimonials-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Want to see your business here?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Tell us about your business, and let&rsquo;s build something
          worth talking about.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
