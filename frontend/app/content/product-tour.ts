/**
 * Product Tour content — supports the interactive preview in
 * components/sections/ProductTour.vue. Product identity itself (name,
 * slug) is NOT duplicated here; every entry below references a
 * `Product.id` from products.ts, which remains the single source of
 * truth for the four Natro products.
 *
 * Every label and sample row in this file is a generic, conceptual UI
 * fixture (the kind of thing a business app's nav/cards/table would show),
 * never a verified feature claim about what Trigon Apex has built. Names,
 * reference numbers and metric values are fictional illustrative data —
 * used so the preview reads like a real screen instead of skeleton-loader
 * bars — not a performance/capability claim. No `keyCapabilities`/
 * `businessProblemsSolved` exist yet for any product (see products.ts), so
 * nothing here asserts that a product actually has a given module today —
 * the preview is explicitly labeled "Interactive Preview" in the UI for
 * that reason.
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

// The Overview tab's secondary panel used to be the exact same "Recent
// Activity" status-dot list for every product — one of the reasons all
// four dashboards read as the same template with different words
// plugged in. Each product now gets a widget SHAPE suited to how that
// business actually tracks its day (a schedule, a progress list, a
// pipeline funnel, a ranked list), not just different copy inside an
// identical layout.
export type OverviewWidget =
  | { type: 'schedule', title: string, items: { time: string, title: string, subtitle: string }[] }
  | { type: 'progress', title: string, items: { label: string, percent: number }[] }
  | { type: 'pipeline', title: string, stages: { label: string, count: number }[] }
  | { type: 'ranked', title: string, items: { label: string, value: string }[] }

export interface ProductTourPreview {
  productId: string
  // Sidebar/overview-card labels shown throughout the preview for this
  // product — conceptual only, not a confirmed feature list.
  navItems: string[]
  // Illustrative sample data only (fictional names/references), styled as
  // an actual screen rather than skeleton-loader bars, so the preview
  // reads like real software instead of a generic wireframe. None of this
  // is a feature/performance claim — the panel is explicitly labeled
  // "Interactive Preview" and the Insights tab states it isn't live data.
  overviewMetrics: { label: string, value: string }[]
  overviewWidget: OverviewWidget
  // Six illustrative values (Mon-Sat, 0-100 scale) driving the Overview/
  // Insights line chart — per product, not one shape shared by all four,
  // for the same "stop looking identical" reason as overviewWidget above.
  trendLabel: string
  trendValues: [number, number, number, number, number, number]
  workflowColumns: [string[], string[], string[]]
  operationsRows: { reference: string, detail: string, status: 'Active' | 'Pending' | 'Complete' }[]
}

export const productTourPreviews: ProductTourPreview[] = [
  {
    productId: 'natro-dental',
    navItems: ['Patient Queue', 'Appointments', 'Billing', 'Records'],
    overviewMetrics: [
      { label: 'Patient Queue', value: '12 waiting' },
      { label: 'Appointments', value: '8 today' },
      { label: 'Billing', value: '3 pending' }
    ],
    overviewWidget: {
      type: 'schedule',
      title: "Today's Schedule",
      items: [
        { time: '9:00 AM', title: 'Aarav Mehta', subtitle: 'Checkup' },
        { time: '10:30 AM', title: 'Priya Singh', subtitle: 'Cleaning' },
        { time: '11:15 AM', title: 'Rohan Das', subtitle: 'X-Ray' },
        { time: '1:00 PM', title: 'Karthik Raja', subtitle: 'Filling' }
      ]
    },
    trendLabel: 'Patient Visits',
    // Midweek hump, lighter Mon/Sat — a clinic's own illustrative rhythm,
    // distinct from the other three products' shapes below.
    trendValues: [38, 68, 82, 58, 64, 30],
    workflowColumns: [
      ['Aarav Mehta — Checkup', 'Priya Singh — Cleaning'],
      ['Rohan Das — X-Ray', 'Karthik Raja — Filling'],
      ['Sara Iyer — Checkup', 'Divya Nair — Consultation']
    ],
    operationsRows: [
      { reference: 'Aarav Mehta', detail: 'Checkup', status: 'Active' },
      { reference: 'Priya Singh', detail: 'Cleaning', status: 'Pending' },
      { reference: 'Rohan Das', detail: 'X-Ray', status: 'Complete' },
      { reference: 'Karthik Raja', detail: 'Filling', status: 'Active' }
    ]
  },
  {
    productId: 'natro-manufacturing',
    navItems: ['Work Orders', 'Inventory', 'Production', 'Reports'],
    overviewMetrics: [
      { label: 'Work Orders', value: '24 open' },
      { label: 'Inventory', value: '6 low stock' },
      { label: 'Production', value: '92% on schedule' }
    ],
    overviewWidget: {
      type: 'progress',
      title: 'Production Status',
      items: [
        { label: 'Assembly Line 2', percent: 72 },
        { label: 'Packaging', percent: 45 },
        { label: 'Welding Bay 1', percent: 90 },
        { label: 'QC Check', percent: 60 }
      ]
    },
    trendLabel: 'Production Output',
    // Steady build toward a Thu/Fri peak, lighter weekend shift.
    trendValues: [48, 60, 70, 88, 92, 35],
    workflowColumns: [
      ['WO-1042 — Assembly', 'WO-1043 — Packaging'],
      ['WO-1039 — Welding', 'WO-1040 — QC Check'],
      ['WO-1035 — Assembly', 'WO-1036 — Packaging']
    ],
    operationsRows: [
      { reference: 'WO-1042', detail: 'Assembly Line 2', status: 'Active' },
      { reference: 'WO-1043', detail: 'Packaging', status: 'Pending' },
      { reference: 'WO-1039', detail: 'Welding Bay 1', status: 'Complete' },
      { reference: 'WO-1040', detail: 'QC Check', status: 'Active' }
    ]
  },
  {
    productId: 'natro-finance',
    navItems: ['Accounts', 'Loans', 'Collections', 'Reports'],
    overviewMetrics: [
      { label: 'Accounts', value: '184 active' },
      { label: 'Loans', value: '12 disbursed' },
      { label: 'Collections', value: '5 overdue' }
    ],
    overviewWidget: {
      type: 'pipeline',
      title: 'Loan Pipeline',
      stages: [
        { label: 'Review', count: 8 },
        { label: 'Verification', count: 5 },
        { label: 'Approved', count: 6 },
        { label: 'Disbursed', count: 12 }
      ]
    },
    trendLabel: 'Loan Collections',
    // Slow early week, a sharp Friday/payday-driven rise.
    trendValues: [30, 42, 55, 68, 90, 50],
    workflowColumns: [
      ['Loan #4521 — Review', 'Loan #4522 — Review'],
      ['Loan #4518 — Verification', 'Collection #88 — Follow-up'],
      ['Loan #4510 — Disbursed', 'Loan #4512 — Disbursed']
    ],
    operationsRows: [
      { reference: 'Loan #4521', detail: 'Personal Loan', status: 'Active' },
      { reference: 'Loan #4522', detail: 'Business Loan', status: 'Pending' },
      { reference: 'Collection #88', detail: 'Overdue 12 days', status: 'Active' },
      { reference: 'Loan #4510', detail: 'Personal Loan', status: 'Complete' }
    ]
  },
  {
    productId: 'natro-pos-retail',
    navItems: ['Sales', 'Inventory', 'Billing', 'Reports'],
    overviewMetrics: [
      { label: 'Sales', value: '₹48,200 today' },
      { label: 'Inventory', value: '14 low stock' },
      { label: 'Billing', value: '6 pending' }
    ],
    overviewWidget: {
      type: 'ranked',
      title: 'Top Sellers',
      items: [
        { label: 'T-Shirts', value: '32 sold' },
        { label: 'Sneakers', value: '27 sold' },
        { label: 'Backpacks', value: '19 sold' },
        { label: 'Bottles', value: '14 sold' }
      ]
    },
    trendLabel: 'Daily Sales',
    // Flatter weekday pattern with a weekend footfall spike.
    trendValues: [46, 62, 70, 50, 58, 92],
    workflowColumns: [
      ['Order #3310 — Checkout', 'Order #3311 — Checkout'],
      ['Order #3308 — Packing', 'Order #3309 — Packing'],
      ['Order #3301 — Delivered', 'Order #3302 — Delivered']
    ],
    operationsRows: [
      { reference: 'Order #3310', detail: '3 items', status: 'Active' },
      { reference: 'Order #3311', detail: '1 item', status: 'Pending' },
      { reference: 'Order #3308', detail: '5 items', status: 'Complete' },
      { reference: 'Order #3309', detail: '2 items', status: 'Active' }
    ]
  }
]

export function getProductTourPreview(productId: string): ProductTourPreview | undefined {
  return productTourPreviews.find((preview) => preview.productId === productId)
}
