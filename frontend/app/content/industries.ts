/**
 * Industries content — implements the `Industry` shape from
 * docs/CONTENT_ARCHITECTURE.md §3. The eight industries are fixed by the
 * brief; order here is the equal, non-ranked order the section renders in
 * (no "featured" position).
 *
 * `businessChallenges`/`solutions`/`products`/`analyticsOpportunities`
 * previously shipped empty under the "empty is valid, guessed is not"
 * rule (§15.7) — each /industries/:slug page was a title and one
 * sentence. That rule was about not guessing at unconfirmed specifics;
 * it doesn't forbid writing real content once asked for.
 *
 * `solutions`/`products` are id references (not guesses) resolved against
 * solutions.ts/products.ts — each industry lists only the solution types
 * that plainly fit what it manages day to day, and the one Natro product
 * built for it if one exists (four of the eight don't have a dedicated
 * product yet, so those stay empty rather than pointing at a mismatch).
 * solutions.ts's own `relatedIndustries`/`relatedProducts` mirror this
 * same mapping in the other direction, so the cross-links between
 * Solutions/Industries/Products pages are consistent both ways.
 *
 * `businessChallenges`/`analyticsOpportunities` are qualitative
 * descriptions in the same register as solutions.ts's own `benefits` —
 * concrete, but never a statistic or outcome claim that would need a
 * source (§15.2 still applies).
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
    businessChallenges: [
      'Patient appointments, records, and billing often live in separate, disconnected tools.',
      'Staff spend time on manual scheduling and follow-up instead of patient care.',
      'Getting a clear view of clinic performance across providers takes manual effort.'
    ],
    solutions: ['business-management', 'business-analytics'],
    products: ['natro-dental'],
    analyticsOpportunities: [
      'A connected view of appointments, patient history, and billing in one place.',
      'Visibility into scheduling patterns and clinic utilization over time.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing',
    shortDescription: 'Software built around how manufacturing and fabrication operations actually run — production, capabilities, and client-facing presentation in one place.',
    businessChallenges: [
      'Production tracking and inventory often rely on manual processes or disconnected spreadsheets.',
      'Presenting capabilities and past work to prospective clients is inconsistent without a proper platform.',
      'Coordinating work orders across the shop floor is hard to keep visible in real time.'
    ],
    solutions: ['business-management', 'automation'],
    products: ['natro-manufacturing'],
    analyticsOpportunities: [
      'A clearer picture of production throughput and where work is bottlenecked.',
      'Data on which capabilities and services actually drive inquiries.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'finance',
    slug: 'finance',
    name: 'Finance',
    shortDescription: 'Software built around how finance businesses actually run — accounts, transactions, and reporting in one connected view.',
    businessChallenges: [
      'Financial operations and reporting are often spread across disconnected tools.',
      'Getting a single, trustworthy view of accounts and transactions takes manual reconciliation.',
      'Day-to-day decisions are made without easy access to what the numbers actually show.'
    ],
    solutions: ['business-analytics', 'business-management'],
    products: ['natro-finance'],
    analyticsOpportunities: [
      'Connected reporting that reflects the business’s actual financial operations.',
      'Trends in transactions and accounts that are easier to see and act on.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'retail',
    slug: 'retail',
    name: 'Retail',
    shortDescription: 'Software built around how retail businesses actually run — sales, inventory, and day-to-day storefront operations in one connected system.',
    businessChallenges: [
      'Sales and inventory tracking often live in separate systems that don’t talk to each other.',
      'Stock levels and reordering are hard to manage accurately across locations.',
      'Understanding which products or periods actually perform well takes manual effort.'
    ],
    solutions: ['business-growth', 'automation'],
    products: ['natro-pos-retail'],
    analyticsOpportunities: [
      'A connected view of sales and inventory instead of separate systems.',
      'Clearer visibility into what’s selling and what needs attention.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'transportation',
    slug: 'transportation',
    name: 'Transportation',
    shortDescription: 'Software built around how transportation businesses actually run — bookings, dispatch, and day-to-day fleet operations in one place.',
    businessChallenges: [
      'Booking and dispatch often rely on manual coordination between staff and drivers.',
      'Tracking vehicles, drivers, and day-to-day operations is hard without a connected system.',
      'Scaling booking volume without a proper system creates operational bottlenecks.'
    ],
    solutions: ['automation', 'business-management'],
    products: [],
    analyticsOpportunities: [
      'Visibility into booking volume and operational patterns over time.',
      'A connected view of dispatch and fleet activity instead of manual tracking.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'food-restaurant',
    slug: 'food-restaurant',
    name: 'Food & Restaurant',
    shortDescription: 'Software built around how food and restaurant businesses actually run — orders, inventory, and service operations in one connected system.',
    businessChallenges: [
      'Orders, inventory, and service operations are often managed with disconnected tools.',
      'Keeping ingredient and stock levels accurate takes constant manual tracking.',
      'It’s hard to see which items or times of day actually drive the business.'
    ],
    solutions: ['business-management', 'automation'],
    products: [],
    analyticsOpportunities: [
      'A connected view of orders and inventory instead of manual tracking.',
      'Visibility into ordering patterns to plan stock and staffing better.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education',
    shortDescription: 'Software built around how education businesses actually run — enrollment, scheduling, and day-to-day administration in one place.',
    businessChallenges: [
      'Enrollment, scheduling, and administration often rely on manual processes or spreadsheets.',
      'Keeping track of students, courses, and staff gets harder to manage manually as the institution grows.',
      'Following up with prospective students and enquiries is inconsistent without a connected system.'
    ],
    solutions: ['business-management', 'business-growth'],
    products: [],
    analyticsOpportunities: [
      'A connected view of enrollment and scheduling instead of scattered spreadsheets.',
      'Visibility into enquiry and enrollment trends over time.'
    ],
    cta: 'talk-to-us'
  },
  {
    id: 'jewellery',
    slug: 'jewellery',
    name: 'Jewellery',
    shortDescription: 'Software built around how jewellery businesses actually run — inventory, sales, and custom orders in one connected system.',
    businessChallenges: [
      'Inventory, sales, and custom orders are often tracked across separate, disconnected tools.',
      'Managing custom order details and timelines accurately takes manual coordination.',
      'Understanding which pieces or categories actually sell takes manual effort.'
    ],
    solutions: ['business-growth', 'business-analytics'],
    products: [],
    analyticsOpportunities: [
      'A connected view of inventory and sales instead of separate tools.',
      'Clearer visibility into which pieces and categories perform best.'
    ],
    cta: 'talk-to-us'
  }
]

export function getIndustry(id: string): Industry | undefined {
  return industries.find((industry) => industry.id === id)
}
