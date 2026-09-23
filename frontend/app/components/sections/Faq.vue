<script setup lang="ts">
import { faqs } from '~/content/faqs'

// Native <details>/<summary> — a real, built-in disclosure widget with
// keyboard support and screen-reader semantics for free, so no custom
// accordion JS/ARIA state management is needed for a section this small.
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="faq-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="max-w-2xl">
        <span class="text-caption font-semibold tracking-widest text-brand-500 uppercase">
          FAQ
        </span>
        <h2 id="faq-heading" class="mt-3 text-h2 font-semibold tracking-tight text-highlighted">
          Common Questions
        </h2>

        <div class="mt-10 border-t border-default md:mt-12">
          <details v-for="faq in faqs" :key="faq.id" class="group border-b border-default py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-h4 font-semibold tracking-tight text-highlighted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {{ faq.question }}
              <span class="shrink-0 text-body text-muted transition-transform duration-(--duration-fast) group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="mt-3 max-w-xl text-body text-default">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
