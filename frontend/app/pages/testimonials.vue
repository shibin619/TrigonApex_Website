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
             "coming soon" countdown, just a plain statement of fact —
             but given the same icon-chip treatment (gradient circle,
             heading, body copy) every other card/section on the site
             uses, rather than a bare line of text in a box. -->
        <div v-else class="mx-auto mt-14 flex max-w-md flex-col items-center rounded-(--radius-lg) border border-default bg-default p-10 text-center shadow-sm md:mt-16">
          <span class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7.5 6.5A4.5 4.5 0 0 0 3 11v7h7v-7H6.1a2.5 2.5 0 0 1 2.4-2.5V6.5h-1Zm10 0A4.5 4.5 0 0 0 13 11v7h7v-7h-3.9a2.5 2.5 0 0 1 2.4-2.5V6.5h-1Z" />
            </svg>
          </span>
          <h2 class="mt-5 text-h4 font-semibold tracking-tight text-highlighted">
            No Reviews Yet
          </h2>
          <p class="mt-2 text-body text-muted">
            We only publish a review once a client has given permission
            &mdash; check back soon.
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
