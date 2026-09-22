# Content Architecture — Trigon Apex Technologies Website

Status: **Structure only.** This document defines *how* website content will
be shaped and sourced so the frontend can consume it consistently once real
copy exists. It defines TypeScript-style field structures and collections —
it does not populate them with marketing copy, and it invents no testimonials,
clients, statistics, or results. Every "example" below is either a literal
field-shape illustration or reuses only the categories/names already given
in the project brief (e.g., the solution and industry names) — never a
fabricated business claim.

---

## 0. Company positioning (source of truth)

These are fixed inputs from the project brief, not decisions made here —
recorded so every content type below can reference them consistently
instead of re-stating them.

- **Company name:** Trigon Apex Technologies
- **Positioning:** "Software Solutions for Business Growth"
- **Core narrative:** Business Problem → Industry → Solution → Product →
  Product Tour → Analytics → Case Study → Client Trust → Consultation
- **Primary navigation:** Home, Solutions, Industries, Products, Case
  Studies, About
- **Primary CTA:** Talk to Us
- **Product ecosystem name:** Natro

---

## 1. Site configuration

A single, top-level object — not a collection. One canonical source for
identity, contact, and navigation data referenced everywhere else so it's
never retyped.

```ts
interface SiteConfig {
  companyName: string          // "Trigon Apex Technologies"
  brandName: string            // short/display form, e.g. "Trigon Apex"
  tagline: string              // "Software Solutions for Business Growth"
  positioningStatement: string // longer one/two-sentence expansion of the tagline
  primaryCta: CtaRef           // see §10 — references the "Talk to Us" CTA block

  contact: {
    email: string | null       // placeholder until confirmed
    phone: string | null
    address: string | null
  }

  socialLinks: Array<{
    platform: string           // e.g. "linkedin", "twitter" — free-form, not an enum,
                                // so a new platform is just a new array entry
    url: string
  }>

  navigation: {
    primary: Array<{
      label: string
      to: string                // internal route, e.g. "/solutions"
    }>
    footer?: Array<{
      label: string
      to: string
    }>
  }
}
```

No contact details, phone numbers, or social URLs are filled in here —
they remain placeholders (`null` / empty array) until confirmed real
values exist. See §13 for where this object lives.

---

## 2. Solutions

Initial categories (fixed by the brief): **Business Growth, Business
Management, Automation, Custom Software, Business Analytics.**

```ts
interface Solution {
  id: string                    // stable identifier, e.g. "business-growth"
  slug: string                  // URL segment — see §14
  title: string
  shortDescription: string      // for cards/listings
  longDescription: string       // for the detail page
  businessProblem: string       // the problem this solution addresses (narrative step 1)
  benefits: string[]            // bullet list — no invented metrics (see §15)
  relatedIndustries: string[]   // Industry.id references, not embedded objects
  relatedProducts: string[]     // Product.id references
  cta: CtaRef                   // e.g. "Talk to Us" or "Explore Solutions"
}
```

`relatedIndustries` / `relatedProducts` are **id references**, not nested
objects — a Solution never embeds a copy of an Industry or Product. The
page resolves the reference at render time. This is what makes §16
(extensibility) possible without restructuring.

No copy is written for the five initial solutions at this stage — only the
field shape above.

---

## 3. Industries

Initial industries (fixed by the brief): **Dental & Healthcare,
Manufacturing, Finance, Retail, Transportation, Food & Restaurant,
Education, Jewellery.**

```ts
interface Industry {
  id: string                       // e.g. "dental-healthcare"
  slug: string
  name: string
  shortDescription: string
  businessChallenges: string[]     // narrative step: what this industry struggles with
  solutions: string[]              // Solution.id references
  products: string[]               // Product.id references
  analyticsOpportunities: string[] // narrative, qualitative — see §8
  cta: CtaRef
}
```

Same reference-not-embed rule as Solutions. No copy written yet.

---

## 4. Products (Natro ecosystem)

Initial products (fixed by the brief): **Natro Dental, Natro
Manufacturing, Natro Finance, Natro POS / Retail.**

```ts
interface Product {
  id: string                    // e.g. "natro-dental"
  slug: string
  name: string                  // "Natro Dental"
  ecosystem: string             // "Natro" — constant across all products
  industry: string              // Industry.id reference (primary industry fit)
  shortDescription: string
  keyCapabilities: string[]     // ONLY capabilities that are confirmed —
                                 // never invented (see §15). Empty array is
                                 // valid and expected until confirmed.
  businessProblemsSolved: string[]
  screenshots: ImageRef[]       // see below — empty until real assets exist
  productTour: string | null    // ProductTour.id reference, §5
  interactiveDemoUrl: string | null // null until a real demo exists
  analyticsFeatures: string[]   // qualitative descriptions, §8
  cta: CtaRef
}

interface ImageRef {
  src: string
  alt: string
}
```

`keyCapabilities` and `businessProblemsSolved` start as **empty arrays**
for all four initial products in this stage — populating them with
specific capability claims is content authoring work for a later stage,
done against confirmed product functionality, not guessed here.

---

## 5. Product Tours

A reusable structure, decoupled from `Product` (referenced by id, not
embedded) so the same tour shape works for any current or future product.

```ts
interface ProductTour {
  id: string
  productId: string              // Product.id this tour belongs to
  steps: ProductTourStep[]
  video: { url: string } | null
  interactiveTourUrl: string | null
}

interface ProductTourStep {
  id: string
  title: string                  // e.g. "Dashboard", "Customers/Patients",
                                  // "Operations", "Analytics", "Reports"
  description: string
  screenshot: ImageRef | null
  featureHighlights: string[]
}
```

The example flow given in the brief — **Dashboard → Customers/Patients →
Operations → Analytics → Reports → CTA** — maps directly to an ordered
`ProductTourStep[]`, with the final "CTA" step represented by the
product's own `cta` field (§4), not a tour step. No actual tour content is
created at this stage — this is the shape a future tour would fill.

---

## 6. Case Studies

Initial categories (fixed by the brief): **Finance Management,
Fabrication Business, Taxi Booking / Management.**

```ts
interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string | null          // real client name, only once confirmed +
                                  // permitted for public use — null otherwise
  industry: string                // Industry.id reference
  businessChallenge: string
  solution: string
  implementation: string
  results: CaseStudyResult[]      // see below — qualitative by default
  technologies: string[]
  screenshots: ImageRef[]
  testimonialRef: string | null   // Testimonial.id reference, §7
  cta: CtaRef
}

// Results must default to qualitative claims. A quantitative metric is only
// ever added once it is a verified, sourced figure — never estimated or
// invented (see §15).
type CaseStudyResult =
  | { type: 'qualitative'; description: string }
  | { type: 'metric'; label: string; value: string; verified: true }
```

The `verified: true` field on the metric variant is intentionally
non-optional and literal — it exists so a metric can never be added to the
type without explicitly asserting it's verified. If a number isn't
verified, it belongs in a `qualitative` entry as a described outcome, not
a figure. `client` stays `null` until a real, permitted client name
exists — a case study with an unconfirmed client ships as anonymized
(e.g., referred to by industry/category only) rather than invented.

No case study content is written at this stage.

---

## 7. Testimonials

```ts
interface Testimonial {
  id: string
  clientName: string
  photo: ImageRef | null
  company: string
  designation: string
  industry: string                 // Industry.id reference
  testimonial: string
  relatedCaseStudy: string | null  // CaseStudy.id reference
  permissionStatus: 'pending' | 'approved' | 'expired'
}
```

`permissionStatus` is mandatory and defaults to `'pending'`. **Governance
rule (see §15): a testimonial must never render on the site unless
`permissionStatus === 'approved'`.** No testimonials exist yet — this
stage ships the type only, with an empty collection.

---

## 8. Business Analytics content

This defines how pages *describe* analytics capabilities in words — it is
not an analytics engine, dashboard, or data pipeline. It's marketing/
explanatory copy structure, reused across Industry, Product, and Solution
pages.

```ts
interface AnalyticsHighlight {
  id: string
  category: 'business-data' | 'kpi' | 'report' | 'trend' | 'operational-insight' | 'decision-support'
  title: string
  description: string             // qualitative explanation, no invented figures
  relatedProduct: string | null   // Product.id reference
  relatedIndustry: string | null  // Industry.id reference
}
```

Used wherever a Solution/Industry/Product page wants to describe
"analytics opportunities" (§2, §3) or "analytics features" (§4) with a
consistent shape instead of ad hoc prose duplicated per page.

---

## 9. FAQs

```ts
interface Faq {
  id: string
  question: string
  answer: string
  category: string                // free-form grouping, e.g. "pricing", "products"
  relatedPage: string | null      // route path this FAQ is most relevant to
}
```

---

## 10. CTA blocks

A single small registry of reusable CTA definitions, referenced by id from
every other content type (`CtaRef = string`, the `Cta.id`) rather than
re-declaring label/link text per page.

```ts
interface Cta {
  id: string
  label: string
  to: string                       // internal route or external URL
  style?: 'primary' | 'secondary'  // visual intent only — no layout defined here
}

type CtaRef = string // references Cta.id
```

Required initial CTA entries (labels fixed by the brief, targets to be
confirmed before launch):

| id | label |
|---|---|
| `talk-to-us` | Talk to Us |
| `explore-solutions` | Explore Solutions |
| `explore-product` | Explore Product |
| `watch-product-tour` | Watch Product Tour |
| `try-interactive-demo` | Try Interactive Demo |
| `request-consultation` | Request Consultation |
| `request-product-demo` | Request Product Demo |

---

## 11. SEO metadata

A reusable structure attached to every routable page/entity.

```ts
interface SeoMeta {
  title: string
  description: string
  canonical: string
  og: {
    title: string
    description: string
    image: string | null
  }
  twitter: {
    title: string
    description: string
    image: string | null
  }
  robots: string                  // e.g. "index, follow"
  schemaType: string               // e.g. "Organization", "Product", "Article"
}
```

Every top-level content type (`Solution`, `Industry`, `Product`,
`CaseStudy`, plus the static pages in §12) carries an `seo: SeoMeta` field.
Nuxt's `useSeoMeta`/`useHead` consume this directly — no separate SEO
system is introduced.

---

## 12. Page content model

How each page in the primary navigation (plus Contact) consumes the
collections above. This is a data-consumption map, not a layout spec — no
UI/visual structure is implied.

| Page | Route | Consumes |
|---|---|---|
| **Home** | `/` | `SiteConfig` (hero/tagline/positioning), a curated subset of `Solution[]`, `Industry[]`, `Product[]`, `CaseStudy[]` (editorial selection, not "all"), relevant `Cta`, page-level `SeoMeta` |
| **Solutions** (index) | `/solutions` | Full `Solution[]` list, page `SeoMeta` |
| **Solutions** (detail) | `/solutions/:slug` | One `Solution`, resolved `relatedIndustries`/`relatedProducts`, its `SeoMeta` |
| **Industries** (index) | `/industries` | Full `Industry[]` list, page `SeoMeta` |
| **Industries** (detail) | `/industries/:slug` | One `Industry`, resolved `solutions`/`products`, its `SeoMeta` |
| **Products** (index) | `/products` | Full `Product[]` list, page `SeoMeta` |
| **Products** (detail) | `/products/:slug` | One `Product`, its `ProductTour` (if any), resolved `industry`, its `SeoMeta` |
| **Case Studies** (index) | `/case-studies` | Full `CaseStudy[]` list, page `SeoMeta` |
| **Case Studies** (detail) | `/case-studies/:slug` | One `CaseStudy`, resolved `testimonialRef` (only if `permissionStatus === 'approved'`), its `SeoMeta` |
| **About** | `/about` | `SiteConfig` (company info), approved `Testimonial[]`/highlight `CaseStudy[]` only if any exist, its `SeoMeta` |
| **Contact** | `/contact` | `SiteConfig.contact`, relevant `Cta`, its `SeoMeta`. Future integration point for submitting to the existing `inquiries` table via the Laravel API — not built in this stage. |

Every "list" page renders the full collection generically (map over the
array); every "detail" page resolves one entry by slug plus its id
references. No page-specific one-off content shape is needed.

---

## 13. Content source strategy

The simplest maintainable approach for *this* stage, per collection:

| Content | Source | Why |
|---|---|---|
| Site configuration | Static TypeScript (`frontend/app/content/site.config.ts`) | Rarely changes, needed at build time, no user-submitted aspect. |
| Solutions | Static TypeScript (`frontend/app/content/solutions.ts`) | Small, fixed-shape, curated by us — a typed array is simplest and safest (compiler catches broken references). |
| Industries | Static TypeScript (`frontend/app/content/industries.ts`) | Same reasoning. |
| Products | Static TypeScript (`frontend/app/content/products.ts`) | Same reasoning. |
| Product Tours | Static TypeScript (`frontend/app/content/product-tours.ts`) | Same reasoning; small in count. |
| Case Studies | Static TypeScript (`frontend/app/content/case-studies.ts`) | Kept consistent with the rest for now. **Revisit as Markdown/content files later** if narrative length or non-developer editing needs grow — not a strong enough reason to introduce that today. |
| Testimonials | Static TypeScript (`frontend/app/content/testimonials.ts`) | Ships as an empty typed array until real, approved testimonials exist. |
| Business Analytics highlights | Static TypeScript (`frontend/app/content/analytics-highlights.ts`) | Reused fragments referenced by id from other content. |
| FAQs | Static TypeScript (`frontend/app/content/faqs.ts`) | Same reasoning. |
| CTA blocks | Static TypeScript (`frontend/app/content/ctas.ts`) | Small, fixed registry. |
| SEO defaults | Static TypeScript (`frontend/app/content/seo-defaults.ts`) | Site-wide fallback values; per-page/entity `seo` overrides live alongside that entity. |
| Inquiries (contact/consultation/demo requests) | **Laravel API + MySQL** (already built, Stage 5) | The one genuinely transactional, user-submitted dataset — correctly *not* part of this content architecture. |

**No CMS is introduced.** Every collection above is small (single digits
to low tens of entries), authored by the team (not visitors), and changes
infrequently — a typed static file is simpler to maintain, review (via
normal PRs), and type-check than standing up a CMS or database-backed
content system. This can be revisited later if content volume or
non-technical editing needs genuinely justify it (see §13's Case Studies
note above for the one place that's most likely to change first).

None of this introduces new npm packages or Nuxt modules — plain `.ts`
files exporting typed arrays/objects, imported directly by pages.

---

## 14. URL / slug strategy

Clean, flat, SEO-friendly patterns — collection index at the plural route,
detail at `/:slug`:

```
/                                    Home
/solutions                           Solutions index
/solutions/:slug                     Solution detail (e.g. /solutions/business-growth)
/industries                          Industries index
/industries/:slug                    Industry detail (e.g. /industries/dental-healthcare)
/products                            Products index
/products/:slug                      Product detail (e.g. /products/natro-dental)
/case-studies                        Case studies index
/case-studies/:slug                  Case study detail (e.g. /case-studies/finance-management)
/about                                About (no slug — single page)
/contact                             Contact (no slug — single page)
```

**Slug rules:**
- Lowercase, hyphen-separated, derived from the entity's canonical name
  (e.g. "Dental & Healthcare" → `dental-healthcare`, "Natro POS / Retail"
  → `natro-pos-retail`).
- Must be unique within its own collection (uniqueness is per collection,
  not global — `/solutions/x` and `/industries/x` are independent
  namespaces).
- Immutable once published: if a name changes, keep the old slug working
  via a redirect rather than breaking inbound/shared links (see §15).

---

## 15. Content governance

Rules to keep the content collections trustworthy and consistent as they
grow:

1. **Single source of truth per entity.** Each Solution/Industry/Product/
   Case Study/Testimonial exists in exactly one place (its collection
   file). Other content references it by `id`/`slug` — never copy-pastes
   its copy elsewhere. Prevents duplicate/drifting descriptions.
2. **No unverified claims.** Any statistic, result, or capability claim
   must be traceable to a real, confirmed source. If it can't be verified,
   it's written qualitatively (see the `CaseStudyResult` union in §6) —
   never estimated, rounded, or invented to "sound complete."
3. **No fabricated people or companies.** `Testimonial.clientName`,
   `CaseStudy.client`, and any named company must be real and
   permission-cleared (`permissionStatus === 'approved'`) before it can
   render. An unconfirmed case study ships anonymized rather than with a
   placeholder name.
4. **One canonical terminology set.** Product/ecosystem names ("Natro",
   "Natro Dental", etc.) and positioning language ("Software Solutions for
   Business Growth") are defined once in `SiteConfig`/`Product.name` and
   referenced, not retyped with variant spellings/capitalization across
   pages.
5. **Slugs are validated and immutable.** A slug must match
   `^[a-z0-9]+(-[a-z0-9]+)*$`, must be unique in its collection, and once
   published is never deleted or reassigned to a different entity — only
   redirected if it must change. Prevents broken inbound links and
   ambiguous references from other content (`relatedProducts`, etc.).
6. **Referential integrity over embedding.** Relationships between
   collections are always id/slug references (§2–§7), never embedded
   copies — so updating a Product's description updates everywhere it's
   referenced, instead of drifting between an Industry page's copy and the
   Product page's copy.
7. **Empty is valid; guessed is not.** An empty `keyCapabilities` array or
   a `null` `client`/`testimonialRef` is an acceptable, expected state
   until real content exists. It is never acceptable to fill such a field
   with a plausible-sounding guess to avoid an empty state.

---

## 16. Future extensibility

Because every collection is a flat, typed array of objects related only by
id/slug reference (never embedded, never hardcoded into a specific page's
markup):

- **New industry** → add one object to `industries.ts`. No other file
  changes; pages already iterate the collection generically.
- **New Natro product** → add one object to `products.ts` (and optionally
  one `ProductTour`). Existing Industry/Solution entries can reference it
  by id without modification to their own shape.
- **New solution** → add one object to `solutions.ts`.
- **New case study** → add one object to `case-studies.ts`; results start
  qualitative and can gain a verified metric later without a shape change.
- **New testimonial** → add one object to `testimonials.ts` with
  `permissionStatus: 'pending'`; it simply doesn't render until approved.
- **New product tour** → add one object to `product-tours.ts`, referenced
  by the product's `productTour` id.

None of this requires restructuring pages, the routing scheme (§14), or
the Solution/Industry/Product/CaseStudy shapes themselves — the page
templates (§12) are written once against the type, not against specific
entries.

---

## 17. Explicitly out of scope for this stage

- Any actual marketing copy, descriptions, capability lists, or narrative
  text for solutions/industries/products/case studies
- Any testimonial content (real or otherwise)
- Any statistics or measurable results
- The homepage or any page's visual design/layout
- Animations
- A CMS or content database
- Business-specific backend modules or database tables for this content
- Wiring the Contact page to the existing `inquiries` API (noted in §12 as
  a future integration point only)
