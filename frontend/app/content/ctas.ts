/**
 * CTA registry — implements the `Cta` structure defined in
 * docs/CONTENT_ARCHITECTURE.md §10. Labels are fixed by the project brief;
 * `to` targets point at the routes defined in the URL strategy (§14) even
 * where the destination page doesn't exist yet (foundation stage).
 */

export interface Cta {
  id: string
  label: string
  to: string
  style?: 'primary' | 'secondary'
}

export const ctas: Cta[] = [
  { id: 'talk-to-us', label: 'Talk to Us', to: '/contact', style: 'primary' },
  { id: 'explore-solutions', label: 'Explore Solutions', to: '/solutions', style: 'secondary' },
  // Label/destination fixed by docs/HOMEPAGE_SPEC.md §8 ("exact label
  // finalized in 8G").
  { id: 'view-all-industries', label: 'View All Industries', to: '/industries', style: 'secondary' },
  { id: 'explore-product', label: 'Explore Product', to: '/products', style: 'secondary' },
  { id: 'watch-product-tour', label: 'Watch Product Tour', to: '/products', style: 'secondary' },
  // In-page anchor to the future Product Tour homepage section (Stage 8I —
  // docs/HOMEPAGE_SPEC.md §10/§20). The target id doesn't exist yet; this
  // is the stable id that section will use once built, per Stage 8D's
  // "future-proof the anchor" instruction.
  { id: 'see-how-it-works', label: 'See How It Works', to: '#product-tour', style: 'secondary' },
  { id: 'try-interactive-demo', label: 'Try Interactive Demo', to: '/products', style: 'secondary' },
  { id: 'request-consultation', label: 'Request Consultation', to: '/contact', style: 'primary' },
  { id: 'request-product-demo', label: 'Request Product Demo', to: '/contact', style: 'primary' }
]

export function getCta(id: string): Cta | undefined {
  return ctas.find((cta) => cta.id === id)
}
