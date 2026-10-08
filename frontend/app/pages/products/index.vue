<script setup lang="ts">
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Products index — explore-product/view-all-products/watch-product-tour/
// try-interactive-demo in ctas.ts have all pointed at /products since
// they were written, but the page itself never existed. The homepage's
// Product Tour section (#product-tour) is still the only place to
// actually interact with a product, so this index links each card down
// to it instead of duplicating that interactive preview here.
useSeo({
  title: 'Products | Trigon Apex Technologies',
  description: 'The Natro product ecosystem — business software built around how specific industries actually run.',
  canonical: 'https://trigonapex.in/products',
  og: {
    title: 'Products | Trigon Apex Technologies',
    description: 'The Natro product ecosystem — business software built around how specific industries actually run.',
    image: null
  },
  twitter: {
    title: 'Products | Trigon Apex Technologies',
    description: 'The Natro product ecosystem — business software built around how specific industries actually run.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'CollectionPage'
})

const talkToUs = getCta('talk-to-us')

// Same generic icon convention ProductTour.vue already uses for product
// chrome (chart/layers/target cycled by index — the labels differ per
// product, not the icon shapes), rather than inventing a new per-product
// icon set.
const genericIconCycle = ['chart', 'layers', 'target', 'flow'] as const
const chipClasses = [
  'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]',
  'bg-gradient-to-br from-accent-ice-400 to-accent-ice-600 shadow-[0_10px_20px_-6px_rgba(52,152,197,0.5)]',
  'bg-gradient-to-br from-accent-green-500 to-accent-green-700 shadow-[0_10px_20px_-6px_rgba(66,148,110,0.5)]'
]

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
const gridRef = useTemplateRef<HTMLDivElement>('gridRef')
useFadeIn(contentRef)
useStaggerReveal(gridRef, ':scope > a')
</script>

<template>
  <SectionContainer as="section" aria-labelledby="products-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            The Natro Ecosystem
          </span>
          <h1 id="products-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            Business software built around how your industry runs.
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            Four Natro products, each shaped around a specific kind of
            business rather than one generic platform.
          </p>
        </div>

        <div ref="gridRef" class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16">
          <NuxtLink
            v-for="(product, index) in products"
            :key="product.id"
            :to="`/products/${product.slug}`"
            class="group flex flex-col rounded-(--radius-xl) border border-default bg-default p-6 shadow-sm motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-(--duration-base) hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-[0_28px_48px_-18px_rgba(16,19,50,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div class="flex items-center gap-4">
              <span
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-(--radius-lg) text-white motion-safe:transition-transform motion-safe:duration-(--duration-base) group-hover:scale-110 group-hover:-rotate-3"
                :class="chipClasses[index % chipClasses.length]"
                aria-hidden="true"
              >
                <span class="h-6 w-6">
                  <PrincipleIcon :id="genericIconCycle[index % genericIconCycle.length]!" />
                </span>
              </span>
              <div>
                <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">{{ product.ecosystem }}</span>
                <h2 class="text-h4 font-semibold tracking-tight text-highlighted group-hover:text-brand-500">
                  {{ product.name }}
                </h2>
              </div>
            </div>
            <p class="mt-4 text-body text-default">
              {{ product.shortDescription }}
            </p>
            <span class="mt-auto inline-flex items-center gap-1.5 pt-5 text-body-sm font-medium text-brand-500">
              Learn more
              <span aria-hidden="true" class="motion-safe:transition-transform motion-safe:duration-(--duration-fast) group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </NuxtLink>
        </div>

        <div class="mt-10 flex justify-center md:mt-12">
          <NuxtLink
            to="/#product-tour"
            class="inline-flex items-center gap-2 rounded-(--radius-md) border border-default px-4 py-2 text-button font-medium text-default motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try the Interactive Product Tour
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="products-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="products-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Want to see Natro running your business?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Tell us which product fits, and we&rsquo;ll walk you through it.
        </p>
        <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to" class="mt-8">
          {{ talkToUs.label }}
        </AppButton>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
