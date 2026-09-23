<script setup lang="ts">
import { getCta } from '~/content/ctas'

// The page's one deliberately "loud" contrast moment (Footer is the
// other) — centered, simple, no imagery, no card. Headline is the
// already-established illustrative direction from docs/HOMEPAGE_SPEC.md
// §15, kept distinct from the Business Problem Selector's heading further
// up the page rather than repeating it a second time.
const talkToUs = getCta('talk-to-us')
const exploreSolutions = getCta('explore-solutions')

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="final-cta-heading" class="bg-navy-950">
    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-2xl text-center">
        <h2 id="final-cta-heading" class="text-h2 font-semibold tracking-tight text-white">
          We Don&rsquo;t Start With Code. We Start With Your Business.
        </h2>
        <p class="mt-4 text-body-lg text-slate-200">
          Let&rsquo;s understand your business and find the right software
          approach.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <AppButton v-if="talkToUs" variant="primary" :to="talkToUs.to">
            {{ talkToUs.label }}
          </AppButton>
          <!-- AppButton's outline variant assumes a light background, and
               its own classes win over any override passed in here (its
               "solid" primary variant is a fill, so it works on any
               background) — a plain link matches Product Tour's proven
               dark-section button treatment instead. -->
          <NuxtLink
            v-if="exploreSolutions"
            :to="exploreSolutions.to"
            class="rounded-(--radius-md) border border-white/30 px-4 py-2 text-button font-medium text-white motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {{ exploreSolutions.label }}
          </NuxtLink>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
