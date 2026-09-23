/**
 * FAQ content — a small, fixed registry per
 * docs/CONTENT_ARCHITECTURE.md §13's content-source strategy (static
 * TypeScript, same pattern as ctas.ts). Every answer is a factual
 * statement about how Trigon Apex works, never a specific technical or
 * capability claim that isn't already established elsewhere in this
 * content (no named technologies, no timelines, no guarantees).
 */

export interface Faq {
  id: string
  question: string
  answer: string
  category: string
  relatedPage: string | null
}

export const faqs: Faq[] = [
  {
    id: 'which-businesses',
    question: 'What type of businesses does Trigon Apex work with?',
    answer: 'We work with businesses across industries, including dental & healthcare, manufacturing, finance, retail, transportation, food & restaurant, education, and jewellery.',
    category: 'general',
    relatedPage: '/industries'
  },
  {
    id: 'custom-software',
    question: 'Can you build custom business software?',
    answer: 'Yes. When a standard product doesn’t fit how a business actually operates, we build custom software around its real workflows rather than forcing it into a generic template.',
    category: 'solutions',
    relatedPage: '/solutions'
  },
  {
    id: 'industry-specific',
    question: 'Do you provide industry-specific software?',
    answer: 'Yes. Our Natro product ecosystem includes software built for specific industries, including dental, manufacturing, finance, and retail.',
    category: 'products',
    relatedPage: '/products'
  },
  {
    id: 'data-migration',
    question: 'Can existing business data be migrated?',
    answer: 'Data migration is evaluated as part of each project, based on the systems a business already has in place.',
    category: 'implementation',
    relatedPage: null
  },
  {
    id: 'integrations',
    question: 'Can software integrate with existing systems?',
    answer: 'Integration with existing systems is considered as part of the solution design for each project.',
    category: 'implementation',
    relatedPage: null
  }
]

export function getFaq(id: string): Faq | undefined {
  return faqs.find((faq) => faq.id === id)
}
