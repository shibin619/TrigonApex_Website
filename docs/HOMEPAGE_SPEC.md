# Homepage UX & Visual Specification — Trigon Apex Technologies

Status: **Specification only.** Nothing in this document has been
implemented. No homepage code, business copy, images, statistics,
testimonials, or client names exist as a result of this stage — every
example below is either explicitly labeled as illustrative/structural, or
lifted verbatim from information already given in the project brief. This
document is what Stages 8B–8O will implement against.

Source of truth for the structures referenced throughout:
`docs/CONTENT_ARCHITECTURE.md` (content shapes), `docs/FRONTEND_ARCHITECTURE.md`
(component/token/composable inventory already built in Stage 7),
`docs/DATABASE_ARCHITECTURE.md`, `ARCHITECTURE.md`, `PROJECT_SETUP.md`.

---

## 1. Brand Positioning

**Trigon Apex Technologies** — "Software Solutions for Business Growth."

The site must communicate that Trigon Apex builds software systems that
help businesses acquire and manage customers, improve operations, automate
workflows, understand business data, make better decisions, and scale.

**Must not feel like:** a generic web agency, a freelancer portfolio, a
cheap software vendor, a digital marketing agency, a programming
tutorial/company, or an over-designed AI-startup template.

**Visual personality:** premium, corporate, modern, confident, simple,
intelligent, business-focused, technology-driven.

Every decision in this document is tested against that personality and
that "must not feel like" list.

---

## 2. Visual Direction

### 2.1 Color hierarchy (restrained, not decorative)

The brief's palette (`#4959B3` blue, deep navy/dark shades, white, subtle
green/ice-blue accents) is a **direction, not a mandate to use everywhere.**
Proposed hierarchy by usage frequency:

| Role | Color | Approx. usage share | Where |
|---|---|---|---|
| Base surface | White / near-white | ~65–70% | Page backgrounds, card surfaces, default sections |
| Contrast surface | Deep navy (dark, desaturated — exact value chosen in 8B against WCAG contrast) | ~15–20% | Footer, Final CTA band, occasional full-width contrast sections — never more than 1–2 per page |
| Brand accent | `#4959B3` | ~5–8% | Primary CTA buttons, active nav state, link hover, key icon accents, focus rings |
| Supporting accent | Subtle green (growth/positive) and ice-blue (data/analytics) | <5% combined | Small icon accents in the Analytics section and "Why Trigon Apex" only — never as a background fill, never both in the same component |
| Text/borders | Neutral gray scale | as needed | Body text, borders, muted text — reuses Stage 7's existing neutral token scale |

This mirrors Stage 7's token architecture directly: `#4959B3` becomes the
real value behind `--color-brand-500` (replacing the Stage 7 `slate`
placeholder) once 8B implements it; navy/green/ice-blue become new,
sparingly-used semantic tokens, not replacements for the neutral scale.
**No exact hex values are chosen for navy/green/ice-blue in this document**
— the brief describes them qualitatively, and picking precise values
without a contrast/accessibility pass belongs in 8B, not a UX spec.

### 2.2 Explicitly avoided

Gradients (beyond perhaps one subtle two-stop background wash, if any),
glassmorphism, 3D renders/robots, generic AI illustrations, stock photos of
developers/laptops, glow effects, multi-colored cards (each card uses at
most one accent color, usually none), large decorative background shapes,
and heavy/uniform rounded-corner styling (Stage 7's `--radius-md`/`lg`
tokens stay modest — no pill-shaped cards, no excessive `rounded-3xl`
everywhere).

**Test for every section below:** if a visual element doesn't help explain
the business value, it doesn't ship.

---

## 3. Homepage Narrative

The page is a guided narrative, not a stacked "Hero → About → Services →
Contact" template:

```
Business Problem → Business Solution → Industry → Product →
Product Experience → Business Data → Proof → Trust → Consultation
```

Section 20 maps this narrative to the exact section order and justifies
each placement.

---

## 4. Header

Builds on the `AppHeader`/`MobileNav` components already scaffolded in
Stage 7 (`docs/FRONTEND_ARCHITECTURE.md` §2) — this section specifies the
homepage-quality behavior those components still need, not a redesign.

- **Desktop nav:** Home, Solutions, Industries, Products, Case Studies,
  About — left-to-right after the brand mark, `Talk to Us` as a filled
  `AppButton variant="primary"` at the far right, visually separated from
  the nav links (not just another link).
- **Mobile nav:** hamburger toggle (already built) opens the existing
  slide-down `MobileNav` list; `Talk to Us` also appears as the last item
  in the mobile list, styled as a button, not a plain link, so it isn't
  missed.
- **Sticky behavior:** header is `position: sticky; top: 0`, always
  visible (no hide-on-scroll-down). After the user scrolls past roughly
  the hero's height, the header gains a background fill + a 1px bottom
  border/subtle shadow (it starts transparent-on-white only if the hero
  itself is on a white background — see §5; if the hero uses a contrast
  background, the header can stay solid from the start). No hide/reveal
  scroll games — simplicity over cleverness, per the brief's "do not
  over-design the header."
- **CTA behavior:** `Talk to Us` always routes to `/contact` (per
  `ctas.ts`'s `talk-to-us` entry); no modal, no in-page anchor.
- **Active state:** current route's nav link gets the brand accent color
  + a small underline (2px), computed from Nuxt's route, not hardcoded
  per page.
- **Scroll behavior:** none beyond the background-on-scroll treatment
  above — no parallax, no shrinking logo animation.
- **Accessibility:** nav wrapped in `<nav aria-label="Primary">` (already
  done in Stage 7); mobile toggle keeps its existing `aria-expanded`/
  `aria-controls`; focus order follows visual order; the header's own
  height stays fixed enough that skip-link behavior (already built) still
  lands the focus below the header, not underneath it.
- **Mobile menu behavior:** opens as a full-width dropdown panel below the
  header (already the Stage 7 pattern) — not a full-screen takeover, so
  the visitor keeps a sense of place on the page.

---

## 5. Hero Section

Framed around the business problem, not a technology pitch.

**On the given direction:** "Your Business Is Already Generating Data" is
assigned explicitly to the Business Analytics section in the brief (§11
below) — reusing it here too would repeat the same hook twice on one page.
Per this section's own invitation to propose "another stronger direction,"
the recommended hero angle instead names the operational pain of
disorganized growth, saving the data-focused line for its own payoff later
in the page:

> **Illustrative only, not final copy:** "Growing a Business Shouldn't
> Mean Fighting Your Own Systems."

- **Eyebrow:** short, positioning-level label above the headline — e.g.
  structurally "Software Solutions for Business Growth" (the given
  tagline, reused verbatim, not paraphrased).
- **Headline structure:** one sentence, 6–10 words, names a business pain
  or a business outcome — never a product/technology name, never a
  statistic.
- **Supporting statement:** one sentence, expands the headline into what
  Trigon Apex actually does (software systems for customers, operations,
  automation, data, decisions, scale) — plain language, no jargon, no
  buzzwords ("synergy," "cutting-edge," "revolutionary").
- **Primary CTA:** `Talk to Us` (`talk-to-us`).
- **Secondary CTA:** `Explore Solutions` (`explore-solutions`) — lower
  visual weight (`AppButton variant="outline"` or `text`), giving
  undecided visitors a path that isn't a sales conversation yet.
- **Visual concept:** a custom, abstract diagram — not a screenshot, not a
  stock photo — depicting the Business → Software → Data → Growth flow as
  simple connected geometric nodes (e.g., three or four labeled nodes
  connected by lines, the last one resolving into a simple upward growth
  line). Built as a custom SVG/illustration in a later stage; no imagery
  exists yet.
- **Animation concept:** on load, headline/subtext/CTA fade+rise in a
  short stagger (reusing Stage 7's `useFadeIn` primitive, ~80–120ms
  offset between elements); the visual may include one subtle, slow,
  continuous micro-motion (e.g., a soft pulse on one node) — never
  distracting, never looping fast, disabled entirely under
  `prefers-reduced-motion`.
- **Mobile behavior:** text stack first (eyebrow → headline → subtext →
  CTAs), visual either moves below the CTAs at reduced scale or is
  simplified to a smaller decorative element — the CTA must never be
  pushed below the fold by the visual on small Android widths.
- **Trust indicator:** **not included at launch.** No client logos, no
  "trusted by" strip, no stats — none are confirmed yet. Revisit only once
  real, permitted client names/stats exist (ties to §14's constraint on
  unsupported claims).

---

## 6. Business Problem Section (Interactive Selector)

"What are you trying to improve?" — the personalization moment that turns
the Hero's macro problem framing into a concrete next step, and hands off
directly into Solutions.

**Categories → Solution mapping** (five problems, five Solutions from
`docs/CONTENT_ARCHITECTURE.md` §2 — a clean 1:1):

| Problem (visitor-facing) | Maps to Solution |
|---|---|
| Get more customers | Business Growth |
| Manage operations | Business Management |
| Automate repetitive work | Automation |
| Understand business data | Business Analytics |
| Scale the business | Custom Software |

- **Interaction:** five selectable cards/pills, one `id` each matching the
  table above. Selecting one does not navigate away — it smooth-scrolls
  the page down to the Solutions section and visually emphasizes the
  matching Solution card there (brief highlight: border/scale pulse,
  ≤400ms, GSAP).
- **Card behavior:** simple label + a small icon per category (custom
  line icon, not a stock/AI icon); no description text on the card itself
  — the description lives in Solutions, avoiding duplicated copy.
- **Hover (desktop):** subtle border/color shift only — no scale, no
  shadow pop.
- **Tap (mobile):** immediate active state (brief color fill) then
  triggers the same scroll behavior as desktop; no hover state needed.
- **Mobile layout:** horizontal scroll-snap row (five cards don't
  comfortably wrap into a clean grid on narrow screens without looking
  cramped); desktop uses a `ResponsiveGrid` (`cols="4"` wrapping to a
  clean 5-across at `lg`, or a simple flex row — finalized in 8E).
- **Transition:** native smooth scroll (`scrollIntoView({ behavior:
  'smooth' })`), falling back to instant scroll under
  `prefers-reduced-motion`.
- **After selection:** nothing is hidden or filtered elsewhere on the
  page — this is a wayfinding aid, not a filter/search. All five
  Solutions remain visible regardless of which problem was clicked.

---

## 7. Solutions Section

Five Solutions from `docs/CONTENT_ARCHITECTURE.md` §2: Business Growth,
Business Management, Automation, Custom Software, Business Analytics. No
detailed solution copy is written here — structure only.

- **Layout:** `ResponsiveGrid` (`cols="3"`, wrapping to a clean 3+2 on
  desktop, `cols="2"` on tablet, single column on mobile).
- **Card hierarchy:** icon (custom line icon, one per solution) → title →
  one- to two-line short description → `text`-style "Learn more" link.
  Deliberately **no** related-industry/related-product tags on the
  homepage card — those belong on the Solution detail page
  (`/solutions/:slug`); keeping the homepage card to four elements avoids
  clutter.
- **Icon strategy:** a small set of custom, single-color line icons
  (using the brand accent or neutral ink, never five different colors) —
  not an icon font/stock icon pack pulled in wholesale (keeps bundle size
  and visual consistency under control, consistent with Stage 7's
  "no unnecessary icon dependency" decision).
- **Hover interaction (desktop):** card lifts 2–4px (`transform:
  translateY`) with a border color shift to the brand accent; no
  background color change, no shadow bloom.
- **Tap (mobile):** card is a full link (`BaseCard` wrapped in a
  `NuxtLink`); no separate hover state needed.
- **CTA:** one section-level `Explore Solutions` button below the grid,
  linking to `/solutions`. No CTA duplicated on every individual card
  (the "Learn more" link already covers per-card navigation).
- **Relationship to industries/products:** deferred to the detail page,
  per above — the homepage's job is orientation, not exhaustive
  cross-linking.

---

## 8. Industries Section

Eight industries: Dental & Healthcare, Manufacturing, Finance, Retail,
Transportation, Food & Restaurant, Education, Jewellery.

**Decision: a compact, equally-weighted chip grid** — not giant cards, not
a tabbed "explorer," not a single featured industry.

Reasoning: giant cards for eight items is the exact clutter the brief
warns against. A tabbed/expandable "industry explorer" is a valid pattern
but adds interaction complexity and a decision (which industry opens by
default?) with no basis to prefer one industry over another — nothing in
the brief designates a "featured" industry, and inventing a preference
would be an unsupported claim of its own kind. A flat, equal chip grid is
the clearest option that treats all eight fairly and ships simply.

- **Layout:** `ResponsiveGrid` — `cols="4"` desktop, `cols="2"` tablet,
  `cols="2"` mobile (2×4 grid on phones stays compact; no horizontal
  scroll needed at this item count).
- **Chip content:** icon (custom, one per industry) + name only — no
  description text on the homepage. Each chip is a full link to
  `/industries/:slug`.
- **Hover/tap:** same restrained treatment as Solutions cards (border/
  color shift only).
- **Mobile behavior:** two columns keep each chip large enough for a
  comfortable touch target (≥44px height) even on small Android widths;
  no horizontal scrolling to manage, no swipe-gesture discoverability
  problem.
- **CTA:** one section-level link to `/industries` ("View All
  Industries" — exact label finalized in 8G) beneath the grid.

---

## 9. Natro Product Ecosystem Section

Introduces **Natro** as the product ecosystem: Natro Dental, Natro
Manufacturing, Natro Finance, Natro POS/Retail. Communicates Industry →
Product → Business problem → Solution per product — no invented
capabilities (per `docs/CONTENT_ARCHITECTURE.md` §4, `keyCapabilities`
ships as an empty array until confirmed).

- **Layout:** a plain 2×2 `ResponsiveGrid` (`cols="2"`) — not an
  alternating `SplitLayout` per product. With four products already on a
  long, section-heavy page, a uniform grid here keeps the page's rhythm
  varied (the more spacious `SplitLayout` pattern is reserved for the
  Product Tour section next, so not every section looks the same).
- **Card structure (top to bottom):** screenshot placeholder area (16:9,
  clearly a placeholder frame until real screenshots exist — never a
  stock image standing in) → small "Natro" ecosystem badge + product name
  → associated industry tag (one, matching `Product.industry`) → one-line
  business-problem framing → `Explore Product` CTA.
- **Visual hierarchy:** the screenshot area is the largest single element
  in the card (it's the product's actual selling point) — the ecosystem
  badge is small and consistent across all four cards, reinforcing "Natro"
  as one family rather than four unrelated products.
- **Hover (desktop):** subtle zoom on the screenshot placeholder only
  (max ~1.03 scale) — the rest of the card stays static.
- **Tap (mobile):** whole card is a link; no hover-dependent reveal.
- **CTA:** each card's own `Explore Product` (`explore-product`) plus one
  section-level `View All Products` link to `/products`.

---

## 10. Product Tour Section

"Don't Just Read About It. See How It Works." Uses the `ProductTour`
structure from `docs/CONTENT_ARCHITECTURE.md` §5 (steps: Dashboard →
Customers/Patients → Operations → Analytics → Reports).

- **Layout:** `SplitLayout` — visual (video or screenshot) on one side,
  step navigation on the other.
- **Video placement:** if a real short video exists, it plays inline
  (muted, click-to-unmute, no autoplay-with-sound) in the visual slot,
  16:9, poster image set (no autoplay video weight on initial load — see
  §23 performance).
- **Interactive tour trigger:** the step list itself is the trigger — no
  separate "Start Tour" button; clicking/tapping a step (Dashboard,
  Customers/Patients, Operations, Analytics, Reports) swaps the visual to
  that step's screenshot/video segment.
- **Step navigation:** desktop — vertical list beside the visual, current
  step highlighted (brand accent left border + bold label); mobile —
  becomes a horizontal scroll-snap tab strip above the visual (same
  pattern as §6's problem selector, for consistency).
- **Animation:** short crossfade (~200–250ms) between steps — no slide/
  wipe/3D transitions.
- **Mobile behavior:** visual first, horizontal step tabs below it (not
  beside), so the visual gets full width on narrow screens.
- **Fallback if video is unavailable:** falls back to the screenshot
  sequence (one static image per step) automatically — **this is, in
  practice, this section's actual launch state**, since no tour video or
  product screenshots are confirmed to exist yet. If even screenshots
  aren't ready by 8I, this section should ship simplified (step list +
  short text per step, no visual) rather than with placeholder imagery
  standing in for a product.

---

## 11. Business Analytics Section

"Your Business Is Already Generating Data." Data → KPIs → Trends →
Insights → Decisions.

- **Layout:** `SplitLayout` — text/flow on one side, a conceptual
  dashboard visual on the other.
- **Text side:** headline (the given line, verbatim) + a simple five-step
  labeled sequence (Data → KPIs → Trends → Insights → Decisions), each
  step a short phrase, no elaboration needed beyond the sequence itself.
- **Visual:** a custom-built, clearly conceptual dashboard illustration —
  generic bar/line chart shapes with **no real axis values, no
  percentages, no specific numbers**. A small caption directly beneath it
  reads structurally "Illustrative example" (or equivalent), so it's
  unambiguous to any visitor that this is a concept diagram, not live
  data or a real client dashboard.
- **No invented numbers anywhere** — this is the section most at risk of
  accidentally implying real results; the caption requirement is
  non-negotiable (see §24).
- **Mobile behavior:** stacks text above visual; the conceptual dashboard
  scales down but keeps its "illustrative" caption legible.
- **Animation:** optional one-time "draw-in" of a chart line when the
  section first scrolls into view (GSAP, plays once, respects
  reduced-motion) — no looping data animation, no fake "live updating"
  effect (that would misrepresent it as real).

---

## 12. Case Studies Section

Three categories: Finance Management, Fabrication Business, Taxi
Booking/Management. Uses the `CaseStudy` structure from
`docs/CONTENT_ARCHITECTURE.md` §6, where results default to qualitative
outcomes unless a metric is explicitly verified.

- **Layout:** `ResponsiveGrid` (`cols="3"`) — exactly matches the three
  categories with a clean single row on desktop, stacking on mobile.
- **Card structure:** industry tag → title → one-line challenge → one-line
  outcome (qualitative phrasing only — e.g., structurally "Streamlined
  [operational area] and improved visibility" as an **illustrative
  pattern**, not real copy) → `Read Case Study` CTA to
  `/case-studies/:slug`.
- **Challenge/Solution/Outcome/Technology:** the homepage card shows only
  the one-line challenge + one-line outcome; full challenge/solution/
  implementation/technologies detail lives on the case study detail page,
  not the homepage card (keeps cards scannable).
- **Results:** if a real, verified metric exists for a given case study,
  it may appear on the detail page per the `verified: true` requirement in
  `docs/CONTENT_ARCHITECTURE.md` §6 — the homepage summary card never
  shows a number, only the qualitative outcome line, to keep the card
  format consistent across case studies regardless of which ones happen
  to have a verified metric.
- **CTA:** each card's own `Read Case Study` link; one section-level link
  to `/case-studies` for the full list.

---

## 13. Testimonials Section

Per `docs/CONTENT_ARCHITECTURE.md` §7: client photo, name, company,
designation, industry, testimonial text, permission status.

- **Rendering condition:** the entire section is conditionally rendered
  only when at least one `Testimonial` has `permissionStatus ===
  'approved'`. **No approved testimonials exist yet, so at initial launch
  this section does not render at all** — no empty state message, no
  placeholder card, no "coming soon" banner. An absent section reads as
  intentional; a visibly empty one reads as unfinished.
- **Layout when populated:** simple grid (`ResponsiveGrid cols="3"`) if
  there are three or fewer approved testimonials; a horizontal carousel
  only once there are enough to justify one (four or more) — avoids
  building carousel interaction/controls for content that doesn't exist
  yet.
- **Card structure:** photo (circular, small) → quote → name, designation,
  company → industry tag. No star ratings, no invented scores.

---

## 14. Why Trigon Apex Section

Six documented strengths, exactly as given — no additions, no
superlatives:

business-first thinking · industry-focused software · product + custom
solutions · data-driven approach · scalable architecture · long-term
partnership.

- **Layout:** `ResponsiveGrid` (`cols="3"`) — six items form two clean
  rows of three.
- **Card structure:** small icon + short label (the strength itself) +
  one-line explanation. No numbers, no rankings, no comparative claims.
- **Explicitly forbidden copy patterns:** "No. 1," "best," "leading,"
  "trusted by hundreds," "10x growth," or any other superlative/statistic
  not independently verified — this rule is repeated in §24 as one of the
  non-negotiable principles because this section is the one most tempting
  to over-claim in.

---

## 15. Final CTA Section

Closes the narrative loop back to the Hero's problem framing.

> **Illustrative direction (given in the brief):** "We Don't Start With
> Code. We Start With Your Business."

- **Headline:** the line above, structurally — a philosophy statement,
  not a feature list.
- **Supporting message structure:** one sentence inviting a conversation
  about the visitor's specific business, not a generic "contact us today"
  line — no invented urgency ("limited spots," "offer ends soon").
- **Primary CTA:** `Talk to Us` (`talk-to-us`).
- **Secondary CTA:** `Request Consultation` (`request-consultation`) —
  gives visitors who want to frame it as "a consultation" rather than
  "a sales chat" the same destination, worded to match their intent.
- **Visual treatment:** full-width band on the deep-navy contrast
  background (§2.1) — centered text, generous vertical padding, no
  imagery, no card, no gradient. This is the page's one deliberately
  "loud" (high-contrast) moment, and it earns that by being visually
  simple, not decorated.

---

## 16. Footer

Expands Stage 7's minimal `AppFooter` (currently just company name + year)
into the full homepage-quality footer, in a later implementation stage —
specified here:

- **Company identity:** brand name + short tagline (the given tagline,
  verbatim).
- **Navigation columns:** Company (Home, About, Case Studies), Solutions
  (links to `/solutions` and, once they exist, each solution slug),
  Industries (link to `/industries`), Products (link to `/products`) —
  four compact columns, not a full sitemap dump.
- **Contact:** reuses `siteConfig.contact` (email/phone/address) —
  rendered only for fields that are non-`null`; none are confirmed yet,
  so this block is effectively empty until real contact details exist.
- **Social links:** reuses `siteConfig.socialLinks` — renders nothing if
  empty (currently empty, per Stage 6/7).
- **Legal links:** Privacy Policy, Terms of Service — placeholders only;
  these pages don't exist yet, so the links either point to a
  not-yet-built route or are omitted entirely until those pages exist
  (decided in the implementation stage, not here).
- **Copyright:** `{{ siteConfig.companyName }} © {{ year }}` (already the
  Stage 7 pattern).

Kept to one compact section — no newsletter signup box (newsletter
subscriptions were explicitly deferred in `docs/CONTENT_ARCHITECTURE.md`
§2), no oversized decorative footer.

---

## 17. Motion System

Builds directly on the rules already established in
`docs/FRONTEND_ARCHITECTURE.md` §11 (`useFadeIn`, subtlety,
reduced-motion). Homepage-specific applications:

| Moment | Motion | Notes |
|---|---|---|
| Hero entrance | Staggered fade+rise (headline → subtext → CTAs) | `useFadeIn`, ~80–120ms offsets |
| Problem selector | Brief highlight pulse on the matched Solution card | ≤400ms, triggered on click, not on scroll |
| Product tour steps | Short crossfade | ~200–250ms |
| Analytics visual | One-time chart line "draw-in" | Plays once when scrolled into view, never loops |
| Cards (Solutions/Industries/Products/Case Studies) | Hover lift/border shift | Plain CSS transition, not GSAP — no JS needed for a 2–4px lift |
| Section reveals | One-time fade+rise as each section enters the viewport | `useFadeIn`-style, IntersectionObserver-gated, not a continuous scroll-scrubbed effect |

**Explicitly avoided:** animation on every element, long/blocking loading
animations, scroll-hijacking (native scroll is never intercepted),
parallax beyond perhaps one very subtle instance (evaluate in 8B, not
assumed here), and any animation that delays text/CTA becoming
interactive. Every motion in the table above **must** be skipped entirely
under `prefers-reduced-motion: reduce` — content is never dependent on an
animation to become visible or usable, matching the progressive-
enhancement rule already set in Stage 7.

---

## 18. Responsive UX

Mobile-first per `docs/FRONTEND_ARCHITECTURE.md` §14; the table below adds
homepage-specific behavior per section. "Small Android" means narrow
low-end phone widths (~360px), not just "mobile" generically.

| Section | Desktop/Large | Tablet | Mobile / Small Android |
|---|---|---|---|
| Header | Full nav + CTA visible | Full nav + CTA visible | Hamburger + logo + CTA button |
| Hero | Text + visual side by side | Text + visual side by side, visual smaller | Text stacked, visual below CTAs, reduced scale |
| Problem selector | Grid/row of 5 | Grid of 5, wraps | Horizontal scroll-snap row |
| Solutions | 3-col grid | 2-col grid | 1-col stack |
| Industries | 4-col chip grid | 2-col chip grid | 2-col chip grid (not 1-col — keeps section shorter) |
| Natro Products | 2×2 grid | 2×2 grid, smaller cards | 1-col stack |
| Product Tour | Split: visual + vertical step list | Split, narrower | Visual full-width, horizontal step tabs below |
| Analytics | Split: text + visual | Split, narrower | Stacked: text above visual |
| Case Studies | 3-col grid | Wraps to 2+1 | 1-col stack |
| Testimonials (if populated) | Grid or carousel | Grid | 1-col stack or swipeable |
| Why Trigon Apex | 3-col grid (2 rows) | 2-col grid | 1-col stack |
| Final CTA | Centered band, generous padding | Same, reduced padding | Centered band, tighter padding, buttons stack vertically if needed |
| Footer | 4 columns | 2 columns | 1 column, stacked |

Landscape phones: treated as a narrow "tablet-ish" width — sections that
switch at `md` may need a landscape-specific check in implementation
(flagged for 8N, not solved here). No section relies on `100vh`/
`100dvh`-locked heights that could clip content in landscape (consistent
with Stage 7's `min-h-dvh` rule already applied at the layout level, not
per-section).

---

## 19. Image Strategy

No images are downloaded, generated, or added in this stage. Every future
image need is documented so a future stage can source it correctly:

| # | Need | Purpose | Aspect ratio | Approx. dimensions | Alt text requirement | Source |
|---|---|---|---|---|---|---|
| 1 | Client photos | Testimonials (once approved) | 1:1 | 96×96–160×160px | Client's name + role, e.g. "Photo of [Name], [Designation] at [Company]" | Real, client-provided only |
| 2 | Product screenshots | Natro product cards, Product Tour | 16:9 | ~1280×720px source, responsive | Describes the screen shown, e.g. "Natro Dental appointment dashboard" | Real, captured from actual product |
| 3 | Industry photography | Industries detail pages (not homepage chips, which are icon-only) | 4:3 or 16:9 | ~1200×900px | Describes the real setting, never generic stock captioning | Real, ideally client/industry-specific — not generic stock |
| 4 | Custom diagrams | Hero visual, Analytics visual | Varies (hero: wide; analytics: square-ish) | Vector (SVG) preferred | Describes the concept, e.g. "Diagram showing business data flowing into growth decisions" | Custom-designed, not stock, not AI-generated imagery |
| 5 | Analytics visuals | Business Analytics section | 4:3 or 1:1 | Vector preferred | "Illustrative example of a business analytics dashboard" (must signal non-real data) | Custom-built conceptual mockup |
| 6 | Product tour visuals | Product Tour section (video poster + step screenshots) | 16:9 | ~1280×720px | Per-step description, e.g. "Natro Dental analytics step" | Real, captured from actual product; video optional |

Every image gets explicit `width`/`height` at implementation time to
prevent layout shift, per `docs/FRONTEND_ARCHITECTURE.md` §13/§15 — no
change to that convention here, just the content plan for what fills it.

---

## 20. Homepage Section Order

Final recommended order, each mapped to the narrative beat it serves:

| # | Section | Narrative beat | Purpose | Visitor question answered | Content source | Component type | Interaction | CTA | Mobile behavior | Animation | Image need |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Header | (persistent) | Orientation + escape hatch to any page | "Where am I / where can I go?" | `site.config.ts` | `AppHeader`/`MobileNav` (Stage 7) | Sticky, active-state nav | Talk to Us | Hamburger menu | Background-on-scroll only | — |
| 2 | Hero | Business Problem | Frame the visitor's problem in business terms | "Is this company thinking about my business, or just selling software?" | New hero copy (future) | `SectionContainer` + `SplitLayout` | None (entrance only) | Talk to Us / Explore Solutions | Text-first stack | Staggered fade+rise | #4 custom diagram |
| 3 | Problem Selector | Business Problem (personalized) | Let the visitor self-identify their need | "Which of these is actually me?" | New (5 fixed categories, §6) | Cards + smooth-scroll | Click → scroll + highlight | (none — wayfinding) | Horizontal scroll-snap | Highlight pulse on target | — |
| 4 | Solutions | Business Solution | Show the five ways Trigon Apex solves problems | "What kinds of solutions do they offer?" | `docs/CONTENT_ARCHITECTURE.md` §2 (structure only, no copy yet) | `ResponsiveGrid` + `BaseCard` | Hover lift | Explore Solutions | 1-col stack | Card hover only | Icons (custom, small) |
| 5 | Industries | Industry | Show breadth of industry focus | "Do they understand businesses like mine?" | CONTENT_ARCHITECTURE §3 | `ResponsiveGrid` chip grid | Hover/tap | View All Industries | 2-col grid | Card hover only | Icons (custom, small) |
| 6 | Natro Products | Product | Introduce the actual product ecosystem | "What do they actually build?" | CONTENT_ARCHITECTURE §4 | 2×2 `ResponsiveGrid` | Hover zoom on screenshot | Explore Product ×4 + View All Products | 1-col stack | Card hover only | #2 product screenshots (placeholder until real) |
| 7 | Product Tour | Product Experience | Let the visitor see the product working | "What does it actually look like to use?" | CONTENT_ARCHITECTURE §5 | `SplitLayout` + step nav | Click step → crossfade | (implicit — tour is the engagement) | Visual-first, tab strip below | Step crossfade | #6 tour visuals (fallback: none until ready) |
| 8 | Business Analytics | Business Data | Show the business-intelligence payoff | "Will I actually understand my business better?" | CONTENT_ARCHITECTURE §8 | `SplitLayout` | None beyond entrance | (none — leads into Case Studies) | Stacked | One-time chart draw-in | #5 analytics visual |
| 9 | Case Studies | Proof | Demonstrate real delivered outcomes | "Have they actually done this before?" | CONTENT_ARCHITECTURE §6 (qualitative-first) | `ResponsiveGrid cols=3` | Hover lift | Read Case Study ×3 | 1-col stack | Card hover only | (none required at card level) |
| 10 | Testimonials | Trust | External validation | "Do real clients vouch for them?" | CONTENT_ARCHITECTURE §7 | Grid or carousel | Hover (if populated) | (none) | Conditionally rendered — see §13 | Card hover only | #1 client photos (once approved) |
| 11 | Why Trigon Apex | Trust (positioning) | State documented strengths plainly | "Why this company over another?" | §14 (fixed 6 items, no invention) | `ResponsiveGrid cols=3` | None | (none) | 1-col stack | None | Icons only |
| 12 | Final CTA | Consultation | Convert momentum into a conversation | "What do I do now?" | §15 | Full-width band | None | Talk to Us / Request Consultation | Stacked buttons if needed | Entrance fade only | None (contrast band, no imagery) |
| 13 | Footer | (persistent) | Utility navigation + legitimacy signals | "How do I find anything else / contact them another way?" | `site.config.ts` | `AppFooter` (expanded, Stage 8C) | None | — | 1-col stack | None | None |

This order is the one deliverable Stage 8B onward should treat as fixed
unless a later stage documents a reason to change it.

---

## 21. Conversion Paths

Four primary journeys, mapped to actual routes from
`docs/CONTENT_ARCHITECTURE.md` §14:

1. **Visitor interested in software:**
   `/` → Solutions (§7, in-page or `/solutions`) → Industries (§8, or
   `/industries/:slug`) → Product (`/products/:slug`) → Product Tour
   (§10, or in-page) → Demo (`request-product-demo` CTA → `/contact`).
2. **Visitor with a business problem:**
   `/` → Problem Selector (§6) → Solutions (§7, highlighted card) →
   Consultation (`request-consultation` CTA → `/contact`).
3. **Visitor looking for proof:**
   `/` → Case Studies (§9, or `/case-studies/:slug`) → Testimonials (§13,
   if populated) → Contact (`talk-to-us` CTA → `/contact`).
4. **Visitor ready to talk:**
   `/` → `Talk to Us` (header, hero, or final CTA — same destination from
   anywhere) → `/contact`.

Every path converges on `/contact` — no journey dead-ends without a clear
next step, and no journey requires scrolling past a section that isn't
relevant to it (the header's nav and the problem selector both offer
shortcuts past sections a visitor may not need).

---

## 22. SEO Structure

Uses the `useSeo()` composable and `SeoMeta` shape already built in Stage
7 (`docs/CONTENT_ARCHITECTURE.md` §11, `docs/FRONTEND_ARCHITECTURE.md`
§9) — no new SEO mechanism is introduced.

- **Title structure:** `{{ companyName }} — {{ tagline }}` → structurally
  "Trigon Apex Technologies — Software Solutions for Business Growth"
  (both values already exist verbatim in `site.config.ts`).
- **Meta description structure:** one sentence combining the positioning
  statement with the breadth of what Trigon Apex does (customers,
  operations, automation, data, decisions, scale) — drafted as real copy
  in a future stage, not invented here.
- **Canonical:** `https://trigonapex.in/` (per `ARCHITECTURE.md`'s domain
  plan — not live yet, but the canonical value is still correct to set).
- **Open Graph:** `og:title`/`og:description` mirror the title/description
  above; `og:image` left unset until a real social-share image exists
  (never a placeholder image shipped as if final).
- **Twitter metadata:** same pattern as OG — `summary_large_image` only
  once a real image exists, `summary` otherwise (matches the fallback
  logic already built into `useSeo()`).
- **Robots:** `index, follow` (the homepage should be indexed as soon as
  it's real).
- **Organization schema:** `@type: Organization` with only verified
  fields — `name` ("Trigon Apex Technologies"), `url`
  (`https://trigonapex.in`), and `logo` once a real logo asset exists.
  **No `sameAs` social profile URLs, no `foundingDate`, no address, no
  phone** until each is confirmed — an incomplete schema is correct;
  an invented one is not.
- **Software/Service schema:** not added on the homepage itself — more
  appropriate on individual `/products/:slug` pages once real product
  data exists (a future stage's decision, not this one's).

---

## 23. Performance

- SSR-friendly: every section above is built from components that render
  correctly on the server (no section requires client-only rendering to
  function) — consistent with the Hybrid/SSR rendering decision in
  `ARCHITECTURE.md` §5.
- Minimal client JS: hover states are CSS-only (§17); GSAP is loaded and
  used only for the specific moments listed in §17, not globally.
- Lazy-load below-the-fold visuals: product screenshots, tour visuals, and
  the analytics diagram all lazy-load; only the hero visual (above the
  fold) loads eagerly.
- Optimized images: explicit `width`/`height` on every image (per §19) to
  prevent layout shift; real photographic images (client photos, industry
  photography) compressed appropriately at implementation time.
- Avoid huge videos on initial load: the Product Tour video (if any) never
  autoplays; it loads on interaction or uses a lightweight poster image
  until played.
- Animation only after content is available: `useFadeIn`-style entrances
  animate already-rendered content (progressive enhancement, per Stage
  7) — nothing waits on the animation to reveal text.
- Prevent layout shift: reserved space (aspect-ratio boxes) for every
  image/video slot before the asset loads, including the currently-empty
  Natro product screenshot placeholders.
- Avoid unnecessary third-party scripts: no embedded video player SDKs,
  no analytics/marketing pixels added as part of this or the following
  implementation stages unless separately requested — the Product Tour
  video, if hosted externally, should prefer a lightweight `<video>`
  element over a heavy third-party embed where possible.

---

## 24. Final Design Principles

Non-negotiable, for this and every future Claude session working on this
homepage:

1. **Business problem before product.** Every section either states a
   business problem, a solution to one, or proof that a solution worked —
   never technology for its own sake.
2. **No invented numbers, ever.** No statistics, percentages, or metrics
   appear anywhere unless they are verified and sourced. Qualitative
   language is always the default.
3. **No invented people or companies.** No testimonials, client names, or
   case-study clients exist until they are real and permission-cleared.
   An absent section beats a fabricated one.
4. **No superlatives without proof.** "No. 1," "best," "leading,"
   "trusted by hundreds," "10x," and equivalents are banned outright
   until independently verifiable.
5. **One accent color, used sparingly.** The brand blue (`#4959B3`) is an
   accent, not a background — most of the page stays neutral/white, with
   navy reserved for one or two deliberate contrast moments.
6. **No decorative visual effects.** No gradients-for-their-own-sake, no
   glassmorphism, no glow, no 3D renders, no generic AI-generated
   illustration style.
7. **No stock photography.** Every real image is either client-owned
   (photos, screenshots) or custom-made (diagrams, icons) — never a
   generic stock substitute standing in "for now."
8. **Motion explains, it doesn't decorate.** Every animation in §17 exists
   to clarify a state change (a step switching, a selection registering);
   none exist purely for visual flourish. All motion respects
   `prefers-reduced-motion` without exception.
9. **Mobile is a first-class layout, not a shrink.** Every section in §18
   has an intentional mobile behavior, not just a narrower version of the
   desktop layout.
10. **Every path leads to a conversation.** No conversion journey in §21
    dead-ends — each ends at `/contact` via a CTA appropriate to that
    visitor's framing (talk / consult / demo).
11. **Consistency over novelty.** Interaction patterns repeat across
    sections where they can (e.g., the horizontal tab-strip pattern used
    in both the Problem Selector and the Product Tour's mobile step nav)
    rather than inventing a new UI idiom per section.
12. **Cards stay uniform within a section.** No section mixes card sizes/
    styles arbitrarily to "add visual interest" — hierarchy comes from
    layout and copy, not inconsistent card treatments.
13. **Empty is honest; fake is not.** Sections without real content yet
    (Testimonials today) are hidden, never filled with placeholder
    content that could be mistaken for real.
14. **Performance is a design constraint, not an afterthought.** A
    section that requires a heavy dependency or blocks interactivity to
    achieve a visual effect gets simplified, not shipped as-is.
15. **This document is the reference, not a starting point to reinterpret
    from scratch.** Future stages implement against §20's section order
    and this section's principles unless a documented reason changes
    them.

---

## 25. Implementation Plan (not executed now)

| Stage | Scope |
|---|---|
| 8B | Global visual theme — implement the real `#4959B3` brand token, navy/green/ice-blue accent tokens, contrast/WCAG pass (updates `tokens.css`/`app.config.ts` from Stage 7's neutral placeholders) |
| 8C | Header/footer — implement §4 and §16 in full (sticky behavior, active state, expanded footer columns) |
| 8D | Hero — real copy (client-approved), custom diagram asset, entrance animation |
| 8E | Business problem selector — interaction + scroll/highlight behavior |
| 8F | Solutions section — real copy once available, icon set |
| 8G | Industries section — chip grid, icon set |
| 8H | Natro products section — real screenshots once available |
| 8I | Product tour — real steps/video/screenshots, or shipped simplified per §10's fallback note |
| 8J | Business analytics section — conceptual visual build, "illustrative" captioning |
| 8K | Case studies — real qualitative copy per confirmed projects |
| 8L | Testimonials — wired to render conditionally; populated only once approved testimonials exist |
| 8M | Final CTA — real copy, contrast band styling |
| 8N | Responsive QA — verify §18 across real devices/viewports, including small Android and landscape |
| 8O | SEO/performance QA — verify §22/§23 against Lighthouse/real metrics once content is real |

Each stage is scoped to be reviewed and approved independently, the same
way Stages 1 through 8A have been.

---

## Explicitly Out of Scope for Stage 8A

- Any homepage implementation code (components, pages, styles)
- Final marketing copy for any section
- Real statistics, testimonials, client names, or case-study results
- Stock or downloaded images of any kind
- Backend endpoints or database schema changes
- Any change to `main`, `demo`, or `prod`
