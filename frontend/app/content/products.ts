/**
 * Products content — implements the `Product` shape from
 * docs/CONTENT_ARCHITECTURE.md §4 for the Natro product ecosystem. The
 * four products are fixed by the brief; order here is the equal,
 * non-ranked order the section renders in (no "flagship" product).
 *
 * `industry` ships empty for all four — no confirmed Product-to-Industry
 * mapping exists anywhere in the repository, and one is not guessed from
 * the product name alone (docs/CONTENT_ARCHITECTURE.md §15.7, "empty is
 * valid, guessed is not"). `keyCapabilities`/`businessProblemsSolved`/
 * `analyticsFeatures` ship empty per §4's own instruction ("starts as
 * empty arrays for all four initial products in this stage"). No real
 * screenshots exist, so `screenshots` stays empty, and no Product Tour or
 * interactive demo exists yet either.
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
    industry: '',
    shortDescription: 'Business software for dental clinics and healthcare workflows.',
    keyCapabilities: [],
    businessProblemsSolved: [],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-manufacturing',
    slug: 'natro-manufacturing',
    name: 'Natro Manufacturing',
    ecosystem: 'Natro',
    industry: '',
    shortDescription: 'Business software designed around manufacturing operations.',
    keyCapabilities: [],
    businessProblemsSolved: [],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-finance',
    slug: 'natro-finance',
    name: 'Natro Finance',
    ecosystem: 'Natro',
    industry: '',
    shortDescription: 'Business software for finance and lending operations.',
    keyCapabilities: [],
    businessProblemsSolved: [],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [],
    cta: 'talk-to-us'
  },
  {
    id: 'natro-pos-retail',
    slug: 'natro-pos-retail',
    name: 'Natro POS',
    ecosystem: 'Natro',
    industry: '',
    shortDescription: 'Point-of-sale and retail business software.',
    keyCapabilities: [],
    businessProblemsSolved: [],
    screenshots: [],
    productTour: null,
    interactiveDemoUrl: null,
    analyticsFeatures: [],
    cta: 'talk-to-us'
  }
]

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
