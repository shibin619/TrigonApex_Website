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
 * a detail page that doesn't exist yet.
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
    shortDescription: 'Software solutions built for Dental & Healthcare businesses.',
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
    shortDescription: 'Software solutions built for Manufacturing businesses.',
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
    shortDescription: 'Software solutions built for Finance businesses.',
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
    shortDescription: 'Software solutions built for Retail businesses.',
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
    shortDescription: 'Software solutions built for Transportation businesses.',
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
    shortDescription: 'Software solutions built for Food & Restaurant businesses.',
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
    shortDescription: 'Software solutions built for Education businesses.',
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
    shortDescription: 'Software solutions built for Jewellery businesses.',
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
