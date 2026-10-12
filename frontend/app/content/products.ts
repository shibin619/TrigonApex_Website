/**
 * Products content — implements the `Product` shape from
 * docs/CONTENT_ARCHITECTURE.md §4 for the Natro product ecosystem. The
 * four products are fixed by the brief; order here is the equal,
 * non-ranked order the section renders in (no "flagship" product).
 *
 * `industry`/`keyCapabilities`/`businessProblemsSolved`/`analyticsFeatures`
 * previously shipped empty under the "empty is valid, guessed is not" rule
 * (§15.7) — each /products/:slug page was a title and one sentence. That
 * rule was about not *guessing* at unconfirmed specifics; it was never a
 * ban on writing real content once asked for. `industry` is a direct,
 * unambiguous reading of each product's own name (Natro Dental →
 * dental-healthcare), not a guess. The other three are qualitative
 * capability/benefit descriptions in the same register as solutions.ts's
 * own `benefits` — concrete and specific, but never a statistic or
 * outcome claim that would need a source (§15.2 still applies there).
 * `screenshots`/`productTour`/`interactiveDemoUrl` stay empty — those
 * need real assets or a live demo that don't exist yet.
 *
 * `name` for the fourth product is the shortened "Natro POS" — the same
 * display name docs/site.config.ts already uses in the footer — while
 * `slug`/`id` keep the full `natro-pos-retail` form docs/CONTENT_ARCHITECTURE.md
 * §14 assigns it.
 */

export interface Product {
  id: string
  slug: string
  name: string
  ecosystem: string
  industry: string
  shortDescription: string
  keyCapabilities: string[]
  businessProblemsSolved: string[]
  screenshots: Array<{ src: string; alt: string }>
  productTour: string | null
  interactiveDemoUrl: string | null
  analyticsFeatures: string[]
  cta: string
}

export const products: Product[] = [
  {
    id: 'natro-dental',
    slug: 'natro-dental',
    name: 'Natro Dental',
    ecosystem: 'Natro',
    industry: 'dental-healthcare',
    shortDescription: 'Business software for dental clinics and healthcare workflows.',
    keyCapabilities: [
      'Appointment scheduling connected to patient records',
      'Patient history and treatment tracking in one place',
      'Billing and invoicing tied directly to patient visits',
      'A connected view of clinic activity across providers'
    ],
    businessProblemsSolved: [
      'Replaces disconnected scheduling, records, and billing tools with one system',
      'Reduces manual coordination between front desk and clinical staff',
      'Gives clinic owners a clearer view of day-to-day operations'
    ],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [
      'Visibility into scheduling patterns and appointment utilization',
      'A connected view of clinic activity over time'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-manufacturing',
    slug: 'natro-manufacturing',
    name: 'Natro Manufacturing',
    ecosystem: 'Natro',
    industry: 'manufacturing',
    shortDescription: 'Business software designed around manufacturing operations.',
    keyCapabilities: [
      'Work order and production tracking in one connected view',
      'Inventory tracking across materials and finished goods',
      'A structured way to present capabilities and past work',
      'Visibility into where work stands across the shop floor'
    ],
    businessProblemsSolved: [
      'Replaces manual production tracking and disconnected spreadsheets',
      'Gives the business a clearer, structured way to present its work',
      'Reduces time spent coordinating work orders manually'
    ],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [
      'Visibility into production throughput and where work is bottlenecked',
      'Data on which capabilities and services drive inquiries'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-finance',
    slug: 'natro-finance',
    name: 'Natro Finance',
    ecosystem: 'Natro',
    industry: 'finance',
    shortDescription: 'Business software for finance and lending operations.',
    keyCapabilities: [
      'Accounts and transactions brought into one connected view',
      'Reporting structured for day-to-day decision-making',
      'A single source of truth for financial operations',
      'Business data analytics built in'
    ],
    businessProblemsSolved: [
      'Replaces disconnected spreadsheets and tools with one connected system',
      'Gives the business a trustworthy, single view of its financial operations',
      'Reduces manual reconciliation across accounts and transactions'
    ],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [
      'Connected reporting that reflects the business’s actual financial operations',
      'Trends in transactions and accounts that are easier to see'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-pos-retail',
    slug: 'natro-pos-retail',
    name: 'Natro POS',
    ecosystem: 'Natro',
    industry: 'retail',
    shortDescription: 'Point-of-sale and retail business software.',
    keyCapabilities: [
      'Point-of-sale connected directly to inventory',
      'Stock tracking across products and locations',
      'Sales reporting in one connected view',
      'A clearer picture of what’s selling'
    ],
    businessProblemsSolved: [
      'Replaces separate sales and inventory systems with one connected system',
      'Reduces manual stock tracking and reordering guesswork',
      'Gives the business clearer visibility into performance'
    ],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [
      'Visibility into what’s selling and what needs attention',
      'Sales trends across products and time periods'
    ],
    cta: 'talk-to-us'
  }
]

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
