/**
 * Business Problem Selector data — the five problem categories from
 * docs/HOMEPAGE_SPEC.md §6, mapped 1:1 to the five Solutions defined in
 * docs/CONTENT_ARCHITECTURE.md §2. This is a fixed taxonomy, not a
 * generic feature list — do not add, remove, or rename entries without
 * updating HOMEPAGE_SPEC.md first.
 *
 * `solutionId`/`solutionLabel` reference the future Solutions section
 * (Stage 8F) by the same kebab-case ids docs/CONTENT_ARCHITECTURE.md
 * already assigns to each Solution — no Solution content exists yet,
 * so only the id and official display name are used here, nothing more.
 */

export interface BusinessProblem {
  id: string
  title: string
  description: string
  solutionId: string
  solutionLabel: string
  ariaLabel: string
}

export const businessProblems: BusinessProblem[] = [
  {
    id: 'get-more-customers',
    title: 'Get more customers',
    description: 'Customer information and leads are scattered across tools, making it hard to follow up consistently.',
    solutionId: 'business-growth',
    solutionLabel: 'Business Growth',
    ariaLabel: 'Get more customers — related to our Business Growth solution'
  },
  {
    id: 'manage-operations',
    title: 'Manage operations',
    description: 'Day-to-day operations depend on manual processes and disconnected spreadsheets.',
    solutionId: 'business-management',
    solutionLabel: 'Business Management',
    ariaLabel: 'Manage operations — related to our Business Management solution'
  },
  {
    id: 'automate-repetitive-work',
    title: 'Automate repetitive work',
    description: 'Repetitive tasks take up time that could go toward higher-value work.',
    solutionId: 'automation',
    solutionLabel: 'Automation',
    ariaLabel: 'Automate repetitive work — related to our Automation solution'
  },
  {
    id: 'understand-business-data',
    title: 'Understand business data',
    description: 'Business data exists, but it is difficult to turn into clear, usable insight.',
    solutionId: 'business-analytics',
    solutionLabel: 'Business Analytics',
    ariaLabel: 'Understand business data — related to our Business Analytics solution'
  },
  {
    id: 'scale-the-business',
    title: 'Scale the business',
    description: 'Growth becomes harder to manage when systems were not built to grow with it.',
    solutionId: 'custom-software',
    solutionLabel: 'Custom Software',
    ariaLabel: 'Scale the business — related to our Custom Software solution'
  }
]
