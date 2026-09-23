/**
 * Business Analytics content. The four "insight" cards implement the
 * existing `AnalyticsHighlight` shape from docs/CONTENT_ARCHITECTURE.md §8
 * — the shape already established for describing analytics capabilities
 * in qualitative words — rather than a new parallel schema.
 * `relatedProduct`/`relatedIndustry` stay null: no confirmed mapping to a
 * specific Natro product or industry exists, and none is guessed.
 *
 * The four "activity" categories are a small, section-specific selector —
 * no existing content type covers this, so a minimal shape is added here.
 * Selecting one conceptually maps to the one insight it feeds (a fixed,
 * illustrative 1:1 relationship for this visual, not a claim about how
 * any real Natro product processes data today).
 */

export interface AnalyticsActivity {
  id: string
  label: string
  insightId: string
}

export interface AnalyticsHighlight {
  id: string
  category: 'business-data' | 'kpi' | 'report' | 'trend' | 'operational-insight' | 'decision-support'
  title: string
  description: string
  // The kind of decision this insight supports — completes the Activity
  // → Data → Insight → Decision chain the homepage visual states.
  decision: string
  relatedProduct: string | null
  relatedIndustry: string | null
}

export const analyticsActivities: AnalyticsActivity[] = [
  { id: 'operations', label: 'Operations', insightId: 'performance' },
  { id: 'customers', label: 'Customers', insightId: 'activity' },
  { id: 'transactions', label: 'Transactions', insightId: 'trends' },
  { id: 'inventory', label: 'Inventory', insightId: 'opportunities' }
]

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
