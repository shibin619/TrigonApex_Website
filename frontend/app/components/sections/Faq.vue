<script setup lang="ts">
import { faqs } from '~/content/faqs'

// Native <details>/<summary> — a real, built-in disclosure widget with
// keyboard support and screen-reader semantics for free, so no custom
// accordion JS/ARIA state management is needed for a section this small.
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)

// Each FAQ already carries a `category` (general/solutions/products/
// implementation) that was never rendered — using it as a small icon
// chip adds real visual structure instead of five identical plain rows,
// without inventing any new content. "solutions" and "products" reuse
// the exact icon shapes already used for those words elsewhere on the
// page (AboutTrigonApex's quick facts) rather than introducing new marks.
const categoryIcon: Record<string, string> = {
  general: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 11v5 M12 7.5h.01',
  solutions: 'M12 3l9 5-9 5-9-5 9-5Z M3 13l9 5 9-5',
  products: 'M21 8l-9-5-9 5 9 5 9-5Z M3 8v8l9 5 9-5V8 M12 13v8',
  implementation: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'
}

// FAQPage structured data — mirrors the visible Q&A exactly (Google's
// requirement for this markup), so both Google rich results and AI
// answer engines (which parse JSON-LD directly) can surface these
// answers without re-deriving them from prose.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    }
  ]
})
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
          <details v-for="faq in faqs" :key="faq.id" class="group border-b border-default open:bg-brand-50/40">
            <summary
              class="flex cursor-pointer list-none items-center gap-4 py-5 pr-1 pl-1 -mx-1 text-left motion-safe:transition-colors motion-safe:duration-(--duration-fast) hover:bg-brand-50/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--radius-lg) bg-brand-50 text-brand-500 motion-safe:transition-colors motion-safe:duration-(--duration-fast) group-open:bg-brand-500 group-open:text-white" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                  <path :d="categoryIcon[faq.category] ?? categoryIcon.general" />
                </svg>
              </span>
              <span class="flex-1 text-h4 font-semibold tracking-tight text-highlighted">
                {{ faq.question }}
              </span>
              <span class="shrink-0 text-body text-muted transition-transform duration-(--duration-fast) group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="max-w-xl pb-6 pl-14 text-body text-default">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
