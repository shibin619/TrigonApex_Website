/**
 * Business Analytics content. Implements the existing `AnalyticsHighlight`
 * shape from docs/CONTENT_ARCHITECTURE.md §8 — the shape already
 * established for describing analytics capabilities in qualitative words
 * — rather than a new parallel schema. `relatedProduct`/`relatedIndustry`
 * stay null: no confirmed mapping to a specific Natro product or industry
 * exists, and none is guessed.
 *
 * The homepage section shows ONE of these statically (see
 * components/sections/BusinessAnalytics.vue) rather than behind a
 * clickable "business activity" selector — an earlier version let a
 * visitor click between four categories and watch the insight/decision
 * text swap, which read as a fake live demo despite the data being
 * clearly captioned illustrative. docs/HOMEPAGE_SPEC.md §11 only ever
 * asked for a static conceptual illustration, not an interactive one.
 */

export interface AnalyticsHighlight {
  id: string
  category: 'business-data' | 'kpi' | 'report' | 'trend' | 'operational-insight' | 'decision-support'
  title: string
  description: string
  // The kind of decision this insight supports — completes the Data →
  // Insight → Decision chain the homepage visual states.
  decision: string
  relatedProduct: string | null
  relatedIndustry: string | null
}

export const analyticsHighlights: AnalyticsHighlight[] = [
  {
    id: 'activity',
    category: 'operational-insight',
    title: 'Activity',
    description: 'What’s happening across the business right now.',
    decision: 'Where to focus attention today.',
    relatedProduct: null,
    relatedIndustry: null
  },
  {
    id: 'trends',
    category: 'trend',
    title: 'Trends',
    description: 'Patterns that emerge over time.',
    decision: 'Whether current patterns are moving the right way.',
    relatedProduct: null,
    relatedIndustry: null
  },
  {
    id: 'performance',
    category: 'kpi',
    title: 'Performance',
    description: 'How operations are actually running.',
    decision: 'Whether operations are running as intended.',
    relatedProduct: null,
    relatedIndustry: null
  },
  {
    id: 'opportunities',
    category: 'decision-support',
    title: 'Opportunities',
    description: 'Where the business could improve.',
    decision: 'Where to prioritize improvement next.',
    relatedProduct: null,
    relatedIndustry: null
  }
]

export function getAnalyticsHighlight(id: string): AnalyticsHighlight | undefined {
  return analyticsHighlights.find((highlight) => highlight.id === id)
}
