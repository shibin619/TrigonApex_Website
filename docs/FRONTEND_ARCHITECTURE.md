# Frontend Architecture — Trigon Apex Technologies Website

Status: **Foundation only.** This document describes the reusable
structure, design-token strategy, and conventions the frontend is built
on. No homepage, final visual design, or marketing copy exists yet — see
`docs/CONTENT_ARCHITECTURE.md` for the content model this frontend
consumes, and `ARCHITECTURE.md` for the overall system architecture.

---

## 1. Directory Structure

```
frontend/app/
├── assets/css/
│   ├── main.css          # imports tailwindcss, @nuxt/ui, tokens.css
│   └── tokens.css        # design tokens — the single source of visual truth
├── app.config.ts         # Nuxt UI color wiring (points at our `brand` token)
├── app.vue                # UApp > NuxtLayout > NuxtPage shell
│
├── components/
│   ├── layout/            # PageContainer, SectionContainer, ResponsiveGrid, SplitLayout
│   ├── navigation/         # AppHeader, AppFooter, MobileNav, Breadcrumbs
│   ├── common/             # AppButton, VisuallyHidden — cross-cutting, content-free
│   ├── cards/               # BaseCard — foundation for all future typed cards
│   ├── forms/                # FormStatusMessage — the one gap Nuxt UI doesn't cover
│   ├── sections/              # (reserved) page sections — empty until real content exists
│   ├── product/                # (reserved) product-specific components — deferred
│   └── case-study/               # (reserved) case-study-specific components — deferred
│
├── composables/
│   ├── useApi.ts           # Laravel API fetch wrapper (Stage 4)
│   ├── useSeo.ts             # consumes CONTENT_ARCHITECTURE.md's SeoMeta shape
│   └── useFadeIn.ts           # the one foundational GSAP animation primitive
│
├── content/
│   ├── site.config.ts       # implements SiteConfig (CONTENT_ARCHITECTURE.md §1)
│   └── ctas.ts                # implements the Cta registry (§10)
│
├── layouts/
│   └── default.vue          # header + main + footer + skip-link
│
├── pages/                     # unchanged this stage (index.vue, dev-api-test.vue)
└── utils/                       # (reserved) framework-agnostic helpers — empty until needed
```

Folders that are empty (`sections/`, `product/`, `case-study/`, `utils/`)
carry a `.gitkeep` explaining why — they exist to show where things go,
not to be filled preemptively. Per the brief: "do not create unnecessary
components just to fill folders."

---

## 2. Component Responsibilities

| Component | Responsibility |
|---|---|
| `PageContainer` | Max-width (`--container-max` token) + horizontal gutter. |
| `SectionContainer` | Vertical rhythm (padding) for a page section; `spacing` prop for density. |
| `ResponsiveGrid` | Mobile-first CSS grid; `cols` covers both "grid" and "two-column" (`cols="2"`). |
| `SplitLayout` | Content + visual two-column pattern with a `reverse` prop; stacks on mobile. |
| `AppHeader` | Brand link, primary nav (from `siteConfig.navigation.primary`), primary CTA, mobile toggle. |
| `MobileNav` | Slide-down mobile menu, driven by the same `siteConfig` nav array — no duplicated content. |
| `AppFooter` | Company name/year, optional footer nav. |
| `Breadcrumbs` | Generic `{ label, to? }[]` renderer with correct `aria-current` on the last item. |
| `AppButton` | Semantic variant wrapper over `UButton` (see §5). |
| `VisuallyHidden` | Screen-reader-only text for icon-only controls. |
| `BaseCard` | Variant (`flat`/`bordered`/`elevated`) + header/default/footer slots — the base every future typed card (solution/industry/product/case-study/testimonial/analytics) will extend. |
| `FormStatusMessage` | Loading/success/error post-submit feedback, wrapping `UAlert`. |

**Deliberately not built:** dedicated `SolutionCard`/`IndustryCard`/etc.,
form field components (label/input/textarea/select), and page-section
components. Reasons:

- Typed cards need real content shapes wired up to be worth their own
  component — until a page actually renders a `Solution[]`, a
  `SolutionCard` would just be `BaseCard` with no differences. Build them
  alongside the pages that use them.
- Nuxt UI's `UFormField`, `UInput`, `UTextarea`, `USelect`, and `UForm`
  already provide label/input/textarea/select/inline-validation with full
  accessibility and Zod/Yup schema support. Wrapping them again would
  duplicate, not add value — see §12.

---

## 3. Naming Conventions

- **Components:** PascalCase filenames, matching Vue's SFC convention;
  Nuxt auto-imports by filename (no manual registration).
- **Prefixes:** none imposed beyond folder placement — `AppHeader`,
  `AppFooter`, `AppButton` use `App` to distinguish project-level
  singletons from things that will have multiple instances (`BaseCard`,
  `ResponsiveGrid`).
- **Composables:** `useX` naming, one exported function per file, filename
  matches the export.
- **Content files:** singular concept, plural collection — e.g.
  `site.config.ts` exports one `siteConfig` object; `ctas.ts` exports one
  `ctas` array (matching `docs/CONTENT_ARCHITECTURE.md`'s collection
  naming).

---

## 4. Page Conventions

- Pages live in `app/pages/`, one file per route, per Nuxt's file-based
  routing — matches the URL strategy in `docs/CONTENT_ARCHITECTURE.md`
  §14.
- Every page calls `useSeo()` with real values for that page (never
  invented copy) — see §9 below.
- Every page implicitly uses `layouts/default.vue` unless it opts out via
  `definePageMeta({ layout: false })` (reserved for special cases like the
  dev-only diagnostic page).
- List pages render a full collection generically (`v-for` over the typed
  array); detail pages resolve one entry by `slug` plus its id references
  — per the Page Content Model in `docs/CONTENT_ARCHITECTURE.md` §12. No
  page hardcodes another page's content inline.

---

## 5. Composable Conventions

- One responsibility per composable (`useApi`, `useSeo`, `useFadeIn`).
- Composables never fetch/format business copy themselves — they accept
  data (or fetch generically, like `useApi`) and leave content decisions
  to the caller.
- Client-only browser APIs (e.g. `window.matchMedia` in `useFadeIn`) are
  only ever touched inside `onMounted`, so composables stay SSR-safe.

---

## 6. Content Usage

- `docs/CONTENT_ARCHITECTURE.md` is the source of truth for every content
  shape. Components/composables here implement its interfaces exactly
  (`SiteConfig`, `Cta`, `SeoMeta`) rather than redefining similar-but-not-
  identical shapes.
- Only `site.config.ts` and `ctas.ts` are populated this stage — both
  contain structural data given directly in the project brief (company
  name, tagline, the six nav labels, the seven CTA labels), never invented
  marketing copy. Solutions/Industries/Products/Case Studies/Testimonials
  content files are intentionally not created yet (see
  `docs/CONTENT_ARCHITECTURE.md` §17).
- Components read content via `import { siteConfig } from '~/content/site.config'`
  — never hardcode nav labels, company name, or CTA text directly in a
  `.vue` file.

---

## 7. Design Token Usage

All visual primitives live in `app/assets/css/tokens.css` as a Tailwind
v4 `@theme` block (CSS variables that also generate matching utility
classes):

| Token group | Example | Usage |
|---|---|---|
| Color | `--color-brand-500` | `bg-brand-500`, `text-brand-500`, or via Nuxt UI's `primary` color (aliased to `brand` in `app.config.ts`) |
| Typography | `--text-h1` | `class="text-h1"` on the semantically correct heading tag |
| Radius | `--radius-lg` | `rounded-(--radius-lg)` |
| Shadow | `--shadow-md` | `shadow-md` |
| Container | `--container-max` | `max-w-(--container-max)` (used by `PageContainer`) |
| Motion | `--duration-base`, `--ease-standard` | future CSS transitions |

**Brand color is a placeholder.** `--color-brand-*` currently aliases
Tailwind's built-in `slate` scale — a neutral, non-decision color, not a
guess at the real brand. When real brand colors are approved, only
`tokens.css` changes; every component using `brand`/`primary` updates
automatically.

**Typography is CSS classes, not wrapper components.** `text-display`,
`text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-body-sm`,
`text-caption`, `text-button` are applied directly to whatever HTML tag is
semantically correct (see §10 accessibility) — e.g. a visually large
`<h2>` uses `class="text-display"`. This keeps heading *level* (semantic)
and heading *size* (visual) independently controllable without a
`<Heading level="2" size="display">` wrapper component, which would just
reimplement what a CSS class already does.

---

## 8. Layout System

- `PageContainer` (max-width) and `SectionContainer` (vertical spacing)
  compose independently: nest a `PageContainer` inside a
  `SectionContainer` for constrained-width sections, or omit it for a
  full-bleed section — there is no separate "full-width section"
  component.
- `ResponsiveGrid` and `SplitLayout` are both mobile-first: single column
  by default, multi-column only from `md`/`lg` up. Neither assumes
  hover-only interaction.
- No fixed pixel widths anywhere in the layout primitives — everything is
  `max-w-*`, `%`, or `fr` (grid) based, so nothing breaks on small Android
  viewports (a repo-level constraint from the brief).

---

## 9. SEO Foundation

`useSeo(meta: SeoMeta, structuredData?)` (in `app/composables/useSeo.ts`)
is the single entry point:

- Consumes the exact `SeoMeta` shape from `docs/CONTENT_ARCHITECTURE.md`
  §11 (title, description, canonical, OG, Twitter, robots, schema type).
- Calls Nuxt's `useSeoMeta` for meta tags and `useHead` for the canonical
  `<link>` and an optional JSON-LD `<script type="application/ld+json">`
  block built from `structuredData` + `schemaType`.
- Takes no defaults and invents no copy — every field must come from the
  calling page's real content.

---

## 10. Accessibility Rules

- Semantic HTML first: `<header>`, `<nav>`, `<main>`, `<footer>`,
  real `<button>`/`<a>` (via `AppButton`/`UButton`), ordered heading
  levels controlled by the page, not by a visual-size component (§7).
- Skip link (`layouts/default.vue`) jumps keyboard users straight to
  `#main-content`, hidden until focused (`sr-only focus-visible:not-sr-only`).
- Icons in `AppHeader`'s mobile toggle are hand-written inline SVG with
  `aria-hidden="true"` plus a `VisuallyHidden` text label — no
  icon-only control without an accessible name.
- `aria-expanded`/`aria-controls` wire the mobile menu button to
  `#mobile-nav`; `Breadcrumbs` sets `aria-current="page"` on the current
  item.
- Focus states rely on Tailwind/Nuxt UI's built-in `focus-visible` styles
  — never suppressed.
- Touch targets: header/footer/nav links and `AppButton` use Nuxt UI's
  default sizing, which already meets comfortable touch-target sizing;
  no custom shrinking applied.
- `useFadeIn` fully skips animation under `prefers-reduced-motion:
  reduce` — content is never dependent on the animation to become
  visible.

Target: WCAG 2.2 AA where practical, per the brief — this stage
establishes the conventions; each future page/component is still
responsible for following them (e.g. real color contrast once brand
colors are chosen).

---

## 11. Animation Rules (GSAP)

- **One primitive exists:** `useFadeIn` — a short (0.5s), small (12px),
  opacity+position fade on mount. No scroll-triggered effects, no
  per-element animation by default.
- Rules for all future animation work, not just this composable:
  - Subtle only — no bounce, no large movement, no long durations.
  - Always progressive enhancement: markup must be correct/visible
    without the animation running.
  - Always check `prefers-reduced-motion` before animating.
  - Never block interaction — no animation gates a click/tap/focus.
  - No animation "because we can" — every use must justify itself against
    the content it's attached to.
- **Not built yet, by design:** scroll-triggered reveals (`ScrollTrigger`),
  page transitions, staggered list animations — all deferred until there's
  real content to justify them.

---

## 12. Forms Foundation

- **Field-level primitives are Nuxt UI's, unmodified:** `UFormField`
  (label + help/error text), `UInput`, `UTextarea`, `USelect`, and `UForm`
  (schema-based validation + submit handling). These already have full
  keyboard/ARIA support and Zod/Yup integration — there is no gap here to
  fill with a custom wrapper.
- **`FormStatusMessage`** fills the one real gap: a consistent way to show
  the *result* of a submission (loading/success/error) via `UAlert`,
  reused verbatim by every future form (contact, consultation, demo
  request) instead of each one inventing its own status markup.
- No form is wired to the Laravel API yet, and no actual contact/
  consultation/demo-request form exists — both explicitly deferred.

---

## 13. Image Foundation (convention, not yet exercised)

No images exist in the project yet (no stock photos, no placeholder
corporate imagery — none were added, per the brief). The convention for
when real images arrive:

- Use Nuxt's built-in `<NuxtImg>`/`<NuxtPicture>` (no additional module
  installed yet — evaluate `@nuxt/image` only once real images exist and
  optimization needs are concrete, per the "don't add unnecessary modules"
  rule).
- Always set explicit `width`/`height` (or `aspect-ratio`) to prevent
  layout shift.
- Always require meaningful `alt` text — decorative images use `alt=""`
  explicitly, never an omitted attribute.
- Lazy-load anything below the fold; never lazy-load the largest
  above-the-fold image (it becomes the LCP candidate).

---

## 14. Responsive System

Mobile-first throughout: every component in this stage starts single-
column/stacked and adds complexity only at `md`/`lg` breakpoints
(Tailwind's default breakpoint scale, unmodified). Concretely:

- `layouts/default.vue` uses `min-h-dvh` (dynamic viewport height), not
  `min-h-screen`/`100vh`, so mobile browser chrome (address bar)
  showing/hiding never causes a layout jump — a specific, named risk in
  the brief.
- `ResponsiveGrid`/`SplitLayout` never assume hover as the only way to
  reveal content.
- No fixed pixel widths in any layout primitive.
- `AppHeader`'s desktop nav (`hidden md:block`) and mobile toggle
  (`md:hidden`) are the only breakpoint-gated visibility in the
  navigation — verified down to small Android widths conceptually via
  Tailwind's mobile-first defaults (no custom narrow breakpoint needed
  yet).

---

## 15. Performance Foundation

- **No new client-heavy dependencies.** No additional UI library, no
  icon package, no font package were added this stage.
- **No remote font/icon network calls.** `nuxt.config.ts` explicitly
  disables every `@nuxt/fonts` remote provider (Google/Bunny/Fontshare/
  Fontsource/Adobe/Google Icons/npm) — `@nuxt/ui` auto-registers that
  module, and left at its default it fetches font metadata over the
  network at build/dev time. The header's menu icons are hand-written
  inline SVG rather than an Iconify icon reference, for the same reason.
- **SSR-friendly by default.** Nothing in this stage forces client-only
  rendering; `useFadeIn`'s browser API access is confined to `onMounted`.
- **Hybrid rendering unaffected.** The existing `routeRules` prerendering
  of `/` (from Stage 3A) is untouched; new components don't introduce
  anything that would force a static route into SSR.
- No performance tooling (bundle analyzers, etc.) added — not justified
  yet at this scale.

---

## 16. What This Stage Does Not Include

- The homepage or any real page design
- Marketing copy, testimonials, statistics, or case-study results (real
  or fabricated)
- Product-specific pages/components
- A CMS
- Backend or database changes
- Authentication or admin functionality
- Deployment of any kind
