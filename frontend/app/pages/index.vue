<script setup lang="ts">
// Homepage. Header and footer come from layouts/default.vue.
//
// Section order follows the full information-architecture pass:
// Hero → Trust → What We Do (Solutions) → Business Challenges (Problem
// Selector) → Industries → Natro Products → Product Experience (Product
// Tour, with Business Analytics kept immediately adjacent rather than as
// a separate standalone chart section) → Our Work (Case Studies) → Why
// Trigon Apex → How We Work → Testimonials (renders nothing until an
// approved testimonial exists) → FAQ → Final CTA.
useSeo({
  title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
  description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
  canonical: 'https://trigonapex.in/',
  og: {
    title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
    description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
    image: null
  },
  twitter: {
    title: 'Trigon Apex Technologies | Software Solutions for Business Growth',
    description: 'Trigon Apex builds custom software solutions and industry-specific business software that help companies streamline operations, automate workflows, and turn data into better decisions.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Organization'
})
</script>

<template>
  <Hero />
  <TrustStrip />
  <Solutions />
  <BusinessProblemSelector />
  <Industries />
  <Products />
  <ProductTour />
  <BusinessAnalytics />
  <CaseStudies />
  <WhyTrigonApex />
  <HowWeWork />
  <Testimonials />
  <Faq />
  <FinalCta />
</template>
