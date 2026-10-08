/**
 * Industries content — implements the `Industry` shape from
 * docs/CONTENT_ARCHITECTURE.md §3. The eight industries are fixed by the
 * brief; order here is the equal, non-ranked order the section renders in
 * (no "featured" position).
 *
 * `solutions`/`products` ship empty — no verified Solution-to-Industry or
 * Product-to-Industry mapping exists yet in the repository. Per
 * docs/CONTENT_ARCHITECTURE.md §15.7 ("empty is valid, guessed is not"),
 * these stay empty until a real mapping is confirmed, rather than guessed
 * from industry names. Same rule for `businessChallenges`/
 * `analyticsOpportunities` — no industry-specific claims are made up for
 * them.
 *
 * `shortDescription` is now the one real, written-out field per industry
 * (previously an identical "Software solutions built for {X} businesses."
 * stub repeated eight times — it's the only body copy on each
 * /industries/:slug page and doubles as that page's meta description, so
 * eight identical ones meant eight pages with the same text and the same
 * duplicate meta description). Each is a plain, generic statement of what
 * that kind of business commonly runs day to day — not a specific
 * capability claim, metric, or feature promise (§15.2) — grounded in a
 * real case study's own language where one exists (finance,
 * manufacturing, transportation — see case-studies.ts) and otherwise kept
 * to the same "built around how it actually runs" framing already used
 * site-wide (Industries.vue's own heading).
 */

export interface Industry {
  id: string
  slug: string
  name: string
  shortDescription: string
  businessChallenges: string[]
  solutions: string[]
  products: string[]
  analyticsOpportunities: string[]
  cta: string
}

export const industries: Industry[] = [
  {
    id: 'dental-healthcare',
    slug: 'dental-healthcare',
    name: 'Dental & Healthcare',
    shortDescription: 'Software built around how dental and healthcare practices actually run — appointments, patient records, and clinical workflow in one connected system.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing',
    shortDescription: 'Software built around how manufacturing and fabrication operations actually run — production, capabilities, and client-facing presentation in one place.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'finance',
    slug: 'finance',
    name: 'Finance',
    shortDescription: 'Software built around how finance businesses actually run — accounts, transactions, and reporting in one connected view.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'retail',
    slug: 'retail',
    name: 'Retail',
    shortDescription: 'Software built around how retail businesses actually run — sales, inventory, and day-to-day storefront operations in one connected system.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'transportation',
    slug: 'transportation',
    name: 'Transportation',
    shortDescription: 'Software built around how transportation businesses actually run — bookings, dispatch, and day-to-day fleet operations in one place.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'food-restaurant',
    slug: 'food-restaurant',
    name: 'Food & Restaurant',
    shortDescription: 'Software built around how food and restaurant businesses actually run — orders, inventory, and service operations in one connected system.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education',
    shortDescription: 'Software built around how education businesses actually run — enrollment, scheduling, and day-to-day administration in one place.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  },
  {
    id: 'jewellery',
    slug: 'jewellery',
    name: 'Jewellery',
    shortDescription: 'Software built around how jewellery businesses actually run — inventory, sales, and custom orders in one connected system.',
    businessChallenges: [],
    solutions: [],
    products: [],
    analyticsOpportunities: [],
    cta: 'talk-to-us'
  }
]

export function getIndustry(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id)
}
