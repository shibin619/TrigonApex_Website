<script setup lang="ts">
import { products } from '~/content/products'
import { getCta } from '~/content/ctas'
import { getProductTourPreview } from '~/content/product-tour'

// Four large product rows, not four icon/text/button cards. Each gets a
// real interface mockup (see ProductInterfacePreview.vue) reusing the
// same nav-item content already defined for the Product Tour, so the
// product's "identity" here and its interactive preview later say the
// same thing rather than inventing separate copy.
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

        <div class="mt-12 md:mt-16">
          <article
            v-for="(product, index) in products"
            :key="product.id"
            class="border-t border-default py-12 last:border-b md:py-16"
          >
            <div
              class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12"
              :class="index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
            >
              <div class="lg:col-span-5">
                <span class="text-caption font-medium tracking-wide text-muted uppercase">Natro</span>
                <h3 class="mt-1 text-h3 font-semibold tracking-tight text-highlighted">
                  {{ product.name }}
                </h3>
                <p class="mt-3 max-w-sm text-body text-default">
                  {{ product.shortDescription }}
                </p>
                <AppButton v-if="exploreProduct" variant="text" :to="`/products/${product.slug}`" class="mt-4 px-0">
                  {{ exploreProduct.label }}
                </AppButton>
              </div>

              <div class="lg:col-span-7">
                <ProductInterfacePreview
                  :name="product.name"
                  :nav-items="getProductTourPreview(product.id)?.navItems ?? []"
                />
              </div>
            </div>
          </article>
        </div>

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllProducts" variant="outline" :to="viewAllProducts.to">
            {{ viewAllProducts.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
