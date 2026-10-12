/**
 * Solutions content — implements the `Solution` shape from
 * docs/CONTENT_ARCHITECTURE.md §2. The five solutions are fixed by the
 * brief and map 1:1 to the five Business Problem categories in
 * business-problems.ts (same `id` values used there as `solutionId`).
 *
 * These ids are load-bearing: the Solutions section renders each entry
 * with `id="solution-{id}"`, and useScrollHighlight() (Stage 8E) targets
 * that exact DOM id when a visitor selects the matching problem. Do not
 * rename an id here without updating business-problems.ts to match.
 *
 * `relatedIndustries`/`relatedProducts` mirror the mapping industries.ts
 * now defines on each Industry's own `solutions`/`products` arrays (id
 * references, resolved at render time) — kept in sync by hand in both
 * directions so the Related Solutions / Related Industries / Related
 * Products links between those three content types are consistent
 * whichever page a visitor starts from. `custom-software` has no industry
 * mapped to it specifically (it's the general "build something bespoke"
 * solution, not tied to one of the eight fixed industries), so it stays
 * empty — same honest-empty rule as everywhere else, just no longer
 * blanket-applied to fields that do have a real answer now.
 */

export interface Solution {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  businessProblem: string
  benefits: string[]
  relatedIndustries: string[]
  relatedProducts: string[]
  cta: string
  // Three-stage conceptual flow used by the homepage Solutions visual —
  // generic process stages, not a claim about specific product features.
  flow: [string, string, string]
}

export const solutions: Solution[] = [
  {
    id: 'business-growth',
    slug: 'business-growth',
    title: 'Business Growth',
    shortDescription: 'Software that keeps customer information and follow-up in one place, so opportunities do not fall through the cracks.',
    longDescription: 'When customer information and leads live across disconnected tools, follow-up becomes inconsistent and opportunities slip through. Business Growth solutions bring customers, leads, and follow-up into one connected system, so your team can act on every opportunity instead of chasing it across spreadsheets and inboxes.',
    businessProblem: 'Get more customers',
    benefits: [
      'One place to track customers and leads',
      'Consistent, timely follow-up',
      'Clear visibility into where each opportunity stands'
    ],
    relatedIndustries: ['retail', 'education', 'jewellery'],
    relatedProducts: ['natro-pos-retail'],
    cta: 'talk-to-us',
    flow: ['Customer', 'Follow-up', 'Opportunity']
  },
  {
    id: 'business-management',
    slug: 'business-management',
    title: 'Business Management',
    shortDescription: 'Software that replaces manual processes and disconnected spreadsheets with one connected way of running operations.',
    longDescription: 'Day-to-day operations that depend on manual processes and disconnected spreadsheets are hard to keep consistent as a business grows. Business Management solutions bring the people, processes, and information behind daily operations into one connected system, replacing scattered spreadsheets with a single source of truth.',
    businessProblem: 'Manage operations',
    benefits: [
      'One connected system instead of scattered spreadsheets',
      'Consistent processes across the team',
      'A single source of truth for day-to-day operations'
    ],
    relatedIndustries: ['dental-healthcare', 'manufacturing', 'finance', 'transportation', 'food-restaurant', 'education'],
    relatedProducts: ['natro-dental', 'natro-manufacturing', 'natro-finance'],
    cta: 'talk-to-us',
    flow: ['Process', 'Workflow', 'Operations']
  },
  {
    id: 'automation',
    slug: 'automation',
    title: 'Automation',
    shortDescription: 'Software that takes over repetitive, manual steps, so your team can spend time on higher-value work.',
    longDescription: 'Repetitive manual tasks take up time that could go toward higher-value work. Automation solutions identify the repeatable steps in a workflow and let software handle them consistently, freeing your team to focus on the work that actually needs their judgment.',
    businessProblem: 'Automate repetitive work',
    benefits: [
      'Repetitive steps handled consistently by software',
      'Fewer manual errors in routine work',
      'More team time available for higher-value work'
    ],
    relatedIndustries: ['manufacturing', 'retail', 'transportation', 'food-restaurant'],
    relatedProducts: ['natro-manufacturing', 'natro-pos-retail'],
    cta: 'talk-to-us',
    flow: ['Manual', 'Automation', 'Completion']
  },
  {
    id: 'business-analytics',
    slug: 'business-analytics',
    title: 'Business Analytics',
    shortDescription: 'Software that turns scattered business data into clear, usable insight for better decisions.',
    longDescription: 'Business data often exists but is difficult to turn into clear, usable insight. Business Analytics solutions bring that data together and present it in a way that is actually usable day to day, so decisions can be based on what is happening in the business rather than a guess.',
    businessProblem: 'Understand business data',
    benefits: [
      'Business data brought into one usable view',
      'Trends and patterns that are easier to see',
      'Decisions grounded in what the data actually shows'
    ],
    relatedIndustries: ['dental-healthcare', 'finance', 'jewellery'],
    relatedProducts: ['natro-dental', 'natro-finance'],
    cta: 'talk-to-us',
    flow: ['Data', 'Insight', 'Decision']
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Custom Software',
    shortDescription: 'Software architecture designed around how your specific business works, built to grow with it.',
    longDescription: 'Growth becomes harder to manage when the systems behind a business were not built to grow with it. Custom Software solutions are architected around how a specific business actually operates, rather than forcing that business into a generic template, so the system can keep pace as the business scales.',
    businessProblem: 'Scale the business',
    benefits: [
      'Software architecture matched to how the business works',
      'Built to extend as the business scales',
      'Not a generic template stretched to fit'
    ],
    relatedIndustries: [],
    relatedProducts: [],
    cta: 'talk-to-us',
    flow: ['Business Need', 'System', 'Scale']
  }
]

export function getSolution(id: string): Solution | undefined {
  return solutions.find((solution) => solution.id === id)
}
