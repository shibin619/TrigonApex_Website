<script setup lang="ts">
import { siteConfig } from '~/content/site.config'
import { solutions } from '~/content/solutions'
import { industries } from '~/content/industries'
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// About — the nav/footer have pointed "About" at /about since
// site.config.ts was written (and AboutTrigonApex.vue's own "Learn
// About Us" button on the homepage already points here), but the page
// never existed. Per docs/CONTENT_ARCHITECTURE.md §15's own table, an
// About page renders SiteConfig (company info) plus approved
// Testimonials/highlight CaseStudies "only if any exist" — so this page
// uses only confirmed fields from site.config.ts (no invented founding
// story, team bios, or office details) and reuses HowWeWork, WhyTrigonApex
// and Testimonials as-is: all three are already genuine, non-homepage-
// specific content (a process, a set of strengths, and a testimonials
// list that renders nothing until a real approved testimonial exists),
// not duplicated marketing copy. The intro paragraph below is
// AboutTrigonApex.vue's own description verbatim, not site.config.ts's
// positioningStatement — that field is just the tagline repeated
// (see site.config.ts's own comment), which would read as the H1 and
// subtext saying the same sentence twice.
useSeo({
  title: `About | ${siteConfig.companyName}`,
  description: siteConfig.positioningStatement,
  canonical: 'https://trigonapex.in/about',
  og: {
    title: `About | ${siteConfig.companyName}`,
    description: siteConfig.positioningStatement,
    image: null
  },
  twitter: {
    title: `About | ${siteConfig.companyName}`,
    description: siteConfig.positioningStatement,
    image: null
  },
  robots: 'index, follow',
  schemaType: 'AboutPage'
})

const talkToUs = getCta('talk-to-us')

const stats = [
  { value: solutions.length, label: 'Core Solutions' },
  { value: industries.length, label: 'Industries Served' },
  { value: products.length, label: 'Natro Products' }
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="about-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          About {{ siteConfig.brandName }}
        </span>
        <h1 id="about-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
          {{ siteConfig.tagline }}
        </h1>
        <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
          We combine business understanding with software expertise to
          design practical systems that help companies operate more
          efficiently, automate repetitive work, and turn their own data
          into better decisions.
        </p>

        <div class="mt-12 grid grid-cols-3 gap-6 border-t border-default pt-10">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-h2 font-bold tracking-tight text-brand-500">{{ stat.value }}</p>
            <p class="mt-1 text-caption font-medium text-muted">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <HowWeWork />
  <WhyTrigonApex />
  <Testimonials />

  <SectionContainer as="section" aria-labelledby="about-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="about-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Let&rsquo;s talk about your business.
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Tell us what you&rsquo;re working with, and we&rsquo;ll help you
          figure out the right next step.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
