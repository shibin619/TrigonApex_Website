/**
 * Testimonial shape — implements docs/CONTENT_ARCHITECTURE.md §7.
 *
 * Testimonials are no longer static content: they're uploaded through the
 * admin portal (/admin/testimonials) and published immediately, backed by
 * the `testimonials` table in the Laravel API. This file now only holds
 * the shared TypeScript shape — components/sections/Testimonials.vue
 * fetches real data from GET /api/v1/testimonials, which itself only ever
 * returns permission-approved rows (enforced server-side, not by the
 * frontend). See docs/HOMEPAGE_SPEC.md §13: an absent section reads as
 * intentional, so the section still renders nothing while no testimonial
 * has been published yet.
 */

export interface Testimonial {
  id: string
  clientName: string
  photo: { src: string; alt: string } | null
  company: string
  designation: string | null
  industry: string | null
  testimonial: string
  relatedCaseStudy: string | null
  permissionStatus: 'pending' | 'approved' | 'expired'
}
