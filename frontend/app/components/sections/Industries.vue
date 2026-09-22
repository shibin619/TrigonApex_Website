<script setup lang="ts">
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// A flat, equal chip grid per docs/HOMEPAGE_SPEC.md §8 — deliberately not
// giant cards, tabs, or a carousel, and no "featured" industry. Every chip
// uses the exact same markup/size/color treatment; differentiation comes
// only from the icon and name, never from layout weight or color.
const viewAllIndustries = getCta('view-all-industries')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="industries-heading" class="bg-brand-50">
    <PageContainer as="div">
      <div ref="contentRef">
        <div class="max-w-2xl">
          <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
            Industries
          </span>
          <h2 id="industries-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
            Built for Businesses Like Yours
          </h2>
          <p class="mt-4 text-body-lg text-muted">
            Every business runs differently. Our software is built around
            how your industry actually works.
          </p>
        </div>

        <ResponsiveGrid :cols="4" gap="sm" class="mt-10 md:mt-12">
          <NuxtLink
            v-for="industry in industries"
            :key="industry.id"
            :to="`/industries/${industry.slug}`"
            class="flex min-h-[44px] flex-col items-center gap-3 rounded-(--radius-lg) border border-default bg-default p-5 text-center text-default motion-safe:transition-colors motion-safe:duration-(--duration-fast) motion-safe:ease-(--ease-standard) hover:border-brand-300 hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
          >
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 p-3 text-brand-500" aria-hidden="true">
              <IndustryIcon :id="industry.id" />
            </span>
            <span class="text-body font-medium">{{ industry.name }}</span>
          </NuxtLink>
        </ResponsiveGrid>

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllIndustries" variant="outline" :to="viewAllIndustries.to">
            {{ viewAllIndustries.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
