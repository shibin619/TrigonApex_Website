<script setup lang="ts">
import { industries } from '~/content/industries'
import { getCta } from '~/content/ctas'

// An industry directory, not a grid of eight rounded boxes — a
// typographic list where every row carries equal weight (same size,
// same treatment, same divider), and the only feedback on hover/focus is
// a colour shift plus a revealed arrow, never a box growing or lifting.
const viewAllIndustries = getCta('view-all-industries')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="industries-heading">
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

        <div class="mt-10 grid grid-cols-1 border-t border-default md:mt-12 md:grid-cols-2">
          <NuxtLink
            v-for="industry in industries"
            :key="industry.id"
            :to="`/industries/${industry.slug}`"
            class="group flex items-center gap-4 border-b border-default py-5 text-highlighted motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary md:py-6 md:odd:pr-8 md:even:pl-8"
          >
            <span class="h-6 w-6 shrink-0 text-muted motion-safe:transition-colors motion-safe:duration-(--duration-fast) group-hover:text-brand-500" aria-hidden="true">
              <IndustryIcon :id="industry.id" />
            </span>
            <span class="text-h4 font-semibold tracking-tight">{{ industry.name }}</span>
            <span
              class="ml-auto text-body opacity-0 motion-safe:transition-opacity motion-safe:duration-(--duration-fast) group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </NuxtLink>
        </div>

        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton v-if="viewAllIndustries" variant="outline" :to="viewAllIndustries.to">
            {{ viewAllIndustries.label }}
          </AppButton>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
