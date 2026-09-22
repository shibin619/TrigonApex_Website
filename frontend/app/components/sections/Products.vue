<script setup lang="ts">
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'

// Natro's homepage introduction. A plain, equal 2x2 grid (not four
// identical icon/title/paragraph/button cards) — a shared "Natro" eyebrow
// at the section level and again as a small per-item badge is what carries
// the "one product family" identity, not a screenshot or fabricated
// dashboard (none exist yet, per docs/HOMEPAGE_SPEC.md §9's "no invented
// capabilities" rule). No product is visually dominant; the grid, badge,
// and mark frame are identical across all four.
const exploreProduct = getCta('explore-product')
const viewAllProducts = getCta('view-all-products')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="products-heading">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="inline-flex items-center gap-2 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            Natro
          </span>
          <h2 id="products-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            Business Software Built Around How You Work
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Natro is Trigon Apex&rsquo;s product ecosystem &mdash; four
            connected products, each built for a specific kind of business.
          </p>
        </div>

        <ResponsiveGrid :cols="2" gap="lg" class="mt-10 md:mt-12">
          <article
            v-for="product in products"
            :key="product.id"
            class="flex flex-col gap-4 rounded-(--radius-lg) border border-default p-6 sm:flex-row sm:items-start"
          >
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-(--radius-md) border border-brand-200 p-3 text-brand-500">
              <NatroProductMark :id="product.id" />
            </div>

            <div>
              <span class="text-caption font-medium tracking-wide text-muted uppercase">Natro</span>
              <h3 class="mt-1 text-h4 font-semibold tracking-tight text-highlighted">
                {{ product.name }}
              </h3>
              <p class="mt-2 text-body text-default">
                {{ product.shortDescription }}
              </p>
              <AppButton v-if="exploreProduct" variant="text" :to="`/products/${product.slug}`" class="mt-3 px-0">
                {{ exploreProduct.label }}
              </AppButton>
            </div>
          </article>
        </ResponsiveGrid>

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllProducts" variant="outline" :to="viewAllProducts.to">
            {{ viewAllProducts.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
