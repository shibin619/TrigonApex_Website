<script setup lang="ts">
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

const route = useRoute()
const slug = route.params.slug as string

const product = products.find((item) => item.slug === slug)
if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useSeo({
  title: `${product.name} | Trigon Apex Technologies`,
  description: product.shortDescription,
  canonical: `https://trigonapex.in/products/${product.slug}`,
  og: {
    title: `${product.name} | Trigon Apex Technologies`,
    description: product.shortDescription,
    image: null
  },
  twitter: {
    title: `${product.name} | Trigon Apex Technologies`,
    description: product.shortDescription,
    image: null
  },
  robots: 'index, follow',
  schemaType: 'Product'
})

const talkToUs = getCta('talk-to-us')

const productIndex = products.findIndex((item) => item.id === product!.id)
const genericIconCycle = ['chart', 'layers', 'target', 'flow'] as const
const icon = genericIconCycle[productIndex % genericIconCycle.length]!

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="product-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-3xl">
        <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-body-sm font-medium text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-brand-500">
          <span aria-hidden="true">&larr;</span>
          All Products
        </NuxtLink>

        <div class="mt-6 flex items-center gap-4">
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-(--radius-lg) bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_20px_-6px_rgba(73,89,179,0.5)]" aria-hidden="true">
            <span class="h-7 w-7">
              <PrincipleIcon :id="icon" />
            </span>
          </span>
          <div>
            <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">{{ product.ecosystem }}</span>
            <h1 id="product-heading" class="mt-1 text-h1 font-semibold tracking-tight text-highlighted">
              {{ product.name }}
            </h1>
          </div>
        </div>

        <p class="mt-6 text-body-lg text-muted">
          {{ product.shortDescription }}
        </p>

        <div v-if="product.businessProblemsSolved.length" class="mt-10">
          <h2 class="text-h3 font-semibold tracking-tight text-highlighted">
            Business problems it solves
          </h2>
          <ul class="mt-5 space-y-4">
            <li v-for="problem in product.businessProblemsSolved" :key="problem" class="flex items-start gap-3">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              <span class="text-body text-default">{{ problem }}</span>
            </li>
          </ul>
        </div>

        <div v-if="product.keyCapabilities.length" class="mt-10">
          <h2 class="text-h3 font-semibold tracking-tight text-highlighted">
            Key capabilities
          </h2>
          <ul class="mt-5 space-y-4">
            <li v-for="capability in product.keyCapabilities" :key="capability" class="flex items-start gap-3">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="var(--color-accent-green-700)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              <span class="text-body text-default">{{ capability }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-10 rounded-(--radius-lg) border border-default bg-elevated/60 p-6">
          <p class="text-body text-default">
            See {{ product.name }} in an interactive, conceptual preview on
            the Product Tour &mdash; not a live product, but a walkthrough
            of what it looks like in use.
          </p>
          <NuxtLink
            to="/#product-tour"
            class="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-500 hover:text-brand-700"
          >
            Try the Interactive Product Tour
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>

  <SectionContainer as="section" aria-labelledby="product-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div class="mx-auto max-w-2xl text-center">
        <h2 id="product-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          Is {{ product.name }} the right fit?
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Let&rsquo;s talk through how it would actually work for your
          business.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to">
            {{ talkToUs.label }}
          </AppButton>
          <NuxtLink
            to="/products"
            class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View All Products
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
