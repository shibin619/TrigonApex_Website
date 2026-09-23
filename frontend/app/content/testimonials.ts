/**
 * Testimonials content — implements the `Testimonial` shape from
 * docs/CONTENT_ARCHITECTURE.md §7.
 *
 * Governance rule (§7/§15): a testimonial must never render on the site
 * unless `permissionStatus === 'approved'`. No testimonials are confirmed
 * or permission-cleared yet, so this ships as an empty, typed array —
 * never a fabricated quote or a placeholder that could be mistaken for a
 * real one. components/sections/Testimonials.vue reads this array and
 * renders nothing at all while it stays empty (per
 * docs/HOMEPAGE_SPEC.md §13: "an absent section reads as intentional; a
 * visibly empty one reads as unfinished").
 */

export interface Testimonial {
  id: string
  clientName: string
  photo: { src: string; alt: string } | null
  company: string
  designation: string
  industry: string
  testimonial: string
  relatedCaseStudy: string | null
  permissionStatus: 'pending' | 'approved' | 'expired'
}

export const testimonials: Testimonial[] = []

export function getApprovedTestimonials(): Testimonial[] {
  return testimonials.filter((testimonial) => testimonial.permissionStatus === 'approved')
}
