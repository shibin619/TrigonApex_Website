/**
 * Product Tour content — supports the interactive preview in
 * components/sections/ProductTour.vue. Product identity itself (name,
 * slug) is NOT duplicated here; every entry below references a
 * `Product.id` from products.ts, which remains the single source of
 * truth for the four Natro products.
 *
 * Every label in this file is a generic, conceptual UI label (the kind of
 * thing a business app's nav/cards would say), never a verified feature
 * claim and never a number. No `keyCapabilities`/`businessProblemsSolved`
 * exist yet for any product (see products.ts), so nothing here asserts
 * that a product actually has a given module today — the preview is
 * explicitly labeled "Interactive Preview" in the UI for that reason.
 */

export interface ProductTourStep {
  id: 'overview' | 'workflow' | 'operations' | 'insights'
  label: string
}

// Generic 4-step sequence (docs/HOMEPAGE_SPEC.md §10 predates the Natro
// product family and doesn't define product-specific steps, so this uses
// the generic fallback sequence the brief itself sanctions).
export const productTourSteps: ProductTourStep[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'operations', label: 'Operations' },
  { id: 'insights', label: 'Insights' }
]

export interface ProductTourPreview {
  productId: string
  // Sidebar/overview-card labels shown throughout the preview for this
  // product — conceptual only, not a confirmed feature list.
  navItems: string[]
}

export const productTourPreviews: ProductTourPreview[] = [
  { productId: 'natro-dental', navItems: ['Patient Queue', 'Appointments', 'Billing', 'Records'] },
  { productId: 'natro-manufacturing', navItems: ['Work Orders', 'Inventory', 'Production', 'Reports'] },
  { productId: 'natro-finance', navItems: ['Accounts', 'Loans', 'Collections', 'Reports'] },
  { productId: 'natro-pos-retail', navItems: ['Sales', 'Inventory', 'Billing', 'Reports'] }
]

export function getProductTourPreview(productId: string): ProductTourPreview | undefined {
  return productTourPreviews.find((preview) => preview.productId === productId)
}
