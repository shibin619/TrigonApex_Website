<script setup lang="ts">
import { siteConfig } from '~/content/site.config'

// Homepage. Header and footer come from layouts/default.vue.
//
// Section order, revised to the corporate/MNC-pattern IA (large hero
// visual → about/quick-facts → services grid → ...):
// Hero → Trust → About → What We Do (Solutions) → Business Challenges
// (Problem Selector) → Industries → Product Experience (Product Tour,
// with Business Analytics kept immediately adjacent) → Selected Work
// (Case Studies) → Why Trigon Apex → Testimonials (renders nothing
// until an approved testimonial exists) → FAQ → Final CTA.
//
// The "Our Approach" belief-statement + "How We Work" process section
// that used to sit here (between About and Solutions) was removed after
// many redesign passes never landed — dropped rather than keep iterating
// indefinitely on a section the page works fine without.
useSeo({
  title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
  description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
  canonical: 'https://trigonapex.in/',
  og: {
    title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
    description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
    image: 'https://trigonapex.in/og-image.png'
  },
  twitter: {
    title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
    description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
    image: 'https://trigonapex.in/og-image.png'
  },
  robots: 'index, follow',
  schemaType: 'Organization'
}, {
  // Only fields already established elsewhere on the site (name/url from
  // site.config.ts) — no invented address, phone, founding date, or
  // social profiles per the same content-honesty rule as the rest of the
  // page (docs/CONTENT_ARCHITECTURE.md §15).
  name: siteConfig.companyName,
  url: 'https://trigonapex.in/',
  description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.'
})
</script>

<template>
  <Hero />
  <TrustStrip />
  <AboutTrigonApex />
  <Solutions />
  <BusinessProblemSelector />
  <Industries />
  <ProductTour />
  <BusinessAnalytics />
  <CaseStudies />
  <WhyTrigonApex />
  <Testimonials />
  <Faq />
  <FinalCta />
</template>
