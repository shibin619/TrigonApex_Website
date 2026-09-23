/**
 * Case Studies content — implements the `CaseStudy` shape from
 * docs/CONTENT_ARCHITECTURE.md §6. The three categories are fixed by the
 * brief: Finance Management, Fabrication Business, Taxi Booking /
 * Management. `client` stays null — no client name is confirmed/permitted
 * for public use yet, so each entry is described by category/industry
 * only, per §6's own anonymize-until-confirmed rule. `results` are
 * qualitative only; no metric is added without a verified, sourced figure
 * (§6/§15.2). `industry` references the existing Industry.id from
 * industries.ts rather than a new value.
 */

export interface CaseStudyResult {
  type: 'qualitative'
  description: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string | null
  industry: string
  businessChallenge: string
  solution: string
  implementation: string
  results: CaseStudyResult[]
  technologies: string[]
  screenshots: Array<{ src: string; alt: string }>
  testimonialRef: string | null
  cta: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'finance-management',
    slug: 'finance-management',
    title: 'Finance Management Software',
    client: null,
    industry: 'finance',
    businessChallenge: 'Financial operations and reporting were spread across disconnected tools, making it hard to see the full picture of the business.',
    solution: 'A finance management system that brings accounts, transactions, and reporting into one connected view, with business data analytics built in.',
    implementation: 'Built around the business’s existing financial workflows, with reporting structured for day-to-day decision-making rather than a generic template.',
    results: [
      { type: 'qualitative', description: 'Gave the business a single, connected view of its financial operations instead of scattered spreadsheets and tools.' }
    ],
    technologies: [],
    screenshots: [],
    testimonialRef: null,
    cta: 'talk-to-us'
  },
  {
    id: 'fabrication-business',
    slug: 'fabrication-business',
    title: 'Fabrication Business Website',
    client: null,
    industry: 'manufacturing',
    businessChallenge: 'The business needed a professional online presence that reflected its manufacturing and fabrication capabilities to prospective clients.',
    solution: 'A structured business website presenting the company’s services, capabilities, and work to prospective clients.',
    implementation: 'Designed and built around how the business actually presents its work and capabilities, not a generic template site.',
    results: [
      { type: 'qualitative', description: 'Gave the business a professional, structured online presence built around its actual capabilities.' }
    ],
    technologies: [],
    screenshots: [],
    testimonialRef: null,
    cta: 'talk-to-us'
  },
  {
    id: 'taxi-booking-management',
    slug: 'taxi-booking-management',
    title: 'Taxi Booking & Management System',
    client: null,
    industry: 'transportation',
    businessChallenge: 'Booking and managing rides relied on manual coordination, making it difficult to track and manage day-to-day operations.',
    solution: 'A taxi booking and management system connecting bookings, drivers, and operations in one place.',
    implementation: 'Built around the business’s existing booking and dispatch workflow, rather than forcing a generic booking template onto it.',
    results: [
      { type: 'qualitative', description: 'Brought booking and operational management into one connected system instead of manual coordination.' }
    ],
    technologies: [],
    screenshots: [],
    testimonialRef: null,
    cta: 'talk-to-us'
  }
]

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.id === id)
}
