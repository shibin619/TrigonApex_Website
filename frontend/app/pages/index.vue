<script setup lang="ts">
// Homepage. Header and footer come from layouts/default.vue. Sections so
// far: Hero (8D), Business Problem Selector (8E), Solutions (8F),
// Industries (8G), Natro Products (8H), Product Tour (8I), Business
// Analytics (8J). Later stages add more sections here in the order
// defined by docs/HOMEPAGE_SPEC.md §20.
useSeo({
  title: 'Trigon Apex | Software Solutions for Business Growth',
  description: 'Trigon Apex builds software systems that help businesses acquire customers, improve operations, understand data, and scale.',
  canonical: 'https://trigonapex.in/',
  og: {
    title: 'Trigon Apex | Software Solutions for Business Growth',
    description: 'Trigon Apex builds software systems that help businesses acquire customers, improve operations, understand data, and scale.',
    image: null
  },
  twitter: {
    title: 'Trigon Apex | Software Solutions for Business Growth',
    description: 'Trigon Apex builds software systems that help businesses acquire customers, improve operations, understand data, and scale.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Organization'
})
</script>

<template>
  <Hero />
  <BusinessProblemSelector />
  <Solutions />
  <Industries />
  <Products />
  <ProductTour />
  <BusinessAnalytics />
</template>
