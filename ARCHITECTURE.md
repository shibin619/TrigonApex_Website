# Architecture — Trigon Apex Technologies Website

Status: **Technical stack locked.** No application code exists yet — this
document reflects the confirmed decisions to scaffold against. Superseded
sections from the original (Stage 0) draft are updated in place below;
version facts were verified against current sources as of **2026-09-22**.

---

## 1. Project Positioning

Trigon Apex Technologies — "Software Solutions for Business Growth." A
production-ready corporate marketing website with a decoupled API backend for
future dynamic features (contact/lead forms, case studies, blog/insights,
possibly a client portal later).

---

## 2. Repository Strategy: Monorepo — **LOCKED**

**Confirmed: single monorepo** containing both the Nuxt frontend and the
Laravel backend.

### Why a monorepo

- The frontend and backend are versioned, deployed, and evolved together for
  this project — they are not independently reusable services or owned by
  separate teams.
- Both `trigonapex.in` and `api.trigonapex.in` ship from the same
  infrastructure (one Hostinger VPS, fronted by Cloudflare), so cross-cutting
  infra config (Nginx, deploy scripts, environment docs) naturally lives in
  one place instead of being duplicated across repos.
- Single source of truth for architecture/setup docs, issue tracking, and PR
  history.
- Atomic commits: an API contract change and its corresponding frontend
  change can land in one PR instead of being coordinated across repos.

### Trade-offs accepted

- Two different toolchains (Node/PHP) live side by side. Mitigated by strict
  path separation (`/frontend`, `/backend`) and separate lockfiles/dependency
  trees — neither toolchain reaches into the other's folder.
- CI/CD must be path-aware later (only build/deploy what changed) — noted as
  a future task, not yet configured.

---

## 3. Locked Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend framework | **Nuxt 4** | Current stable line (latest: 4.5.x, released July 2026) |
| UI runtime | Vue 3 | Bundled with Nuxt 4 |
| Language | TypeScript | Strict mode |
| Styling | **Tailwind CSS v4** | Required by Nuxt UI v4 (not the older v3 / `@nuxtjs/tailwindcss` module path) |
| Component library | **Nuxt UI v4** | Requires Nuxt **≥ 4.1** (we're on 4.5.x — satisfied). Now unifies former Nuxt UI + Nuxt UI Pro into one free, open-source package |
| Animation | GSAP | Used sparingly for subtle motion, per your direction |
| Backend framework | **Laravel 13** | Released March 17, 2026. Minimum PHP **8.3** |
| Backend language | PHP 8.3+ | Matches Laravel 13's minimum requirement exactly |
| API style | REST | Laravel is a pure JSON API — no Blade views, no server-rendered HTML from Laravel |
| Database | **MySQL 8** | See §10 for a Hostinger-specific compatibility note |
| Package manager (frontend) | **npm** | |
| Rendering mode | **Hybrid/SSR** | Nuxt `routeRules` mixing prerendered marketing pages with SSR/ISR for API-backed pages, chosen for SEO + performance |
| Repository | Monorepo | `frontend/`, `backend/`, `docs/`, `infra/` |

---

## 4. Proposed Folder Structure

Nuxt 4 changed its default source layout (`srcDir` now defaults to `app/`,
and the `~` alias points there) — the structure below reflects that, not the
Nuxt 3 layout from the original draft.

```
TrigonApex_Website/
├── frontend/                       # Nuxt 4 application (not yet scaffolded)
│   ├── app/                        # Nuxt 4 default srcDir
│   │   ├── app.vue
│   │   ├── app.config.ts           # Nuxt UI theme/config
│   │   ├── assets/
│   │   │   └── css/
│   │   │       └── main.css        # @import "tailwindcss"; @import "@nuxt/ui";
│   │   ├── components/
│   │   ├── composables/
│   │   ├── layouts/
│   │   ├── middleware/
│   │   ├── pages/
│   │   ├── plugins/
│   │   └── utils/
│   ├── public/                     # Static assets served as-is
│   ├── server/                     # Nuxt server routes/middleware (root-level in v4)
│   ├── nuxt.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                        # Laravel 13 REST API (not yet scaffolded)
│   ├── app/
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   └── migrations/
│   ├── config/
│   ├── .env.example
│   └── composer.json
│
├── infra/                          # Deployment & infrastructure config
│   ├── nginx/                       # Nginx server block templates for both domains
│   ├── docker/                      # Optional local dev containers (still open, §11)
│   └── deploy/                      # Deploy scripts, PM2 process file for Nuxt SSR
│
├── docs/                            # Project documentation (expands over time)
│   ├── DATABASE_ARCHITECTURE.md     # MySQL schema foundation (Stage 5)
│   ├── CONTENT_ARCHITECTURE.md      # Website content structure (Stage 6)
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── .github/
│   └── workflows/                   # CI/CD pipelines (future)
│
├── ARCHITECTURE.md
├── PROJECT_SETUP.md
├── README.md
└── .gitignore
```

---

## 5. Frontend Architecture

- **Framework:** Nuxt 4, Vue 3, TypeScript (strict)
- **UI:** Nuxt UI v4 — provides the component library, theming, icons
  (`@nuxt/icon`), fonts (`@nuxt/fonts`), and color mode (`@nuxtjs/color-mode`)
  automatically; these do not need to be added as separate modules.
- **Styling:** Tailwind CSS v4, wired in via Nuxt UI's own integration — a
  single CSS file imports `tailwindcss` then `@nuxt/ui`. No separate
  `@nuxtjs/tailwindcss` module is used (that was the Nuxt 3 / Tailwind v3
  pattern from the earlier draft).
- **Animation:** GSAP, used sparingly for subtle motion.
- **Rendering mode — LOCKED: Hybrid/SSR.** Implemented via Nuxt's
  `routeRules` in `nuxt.config.ts`:
  - Static marketing pages (home, about, services) → prerendered
    (`prerender: true`) for maximum speed and cacheability at Cloudflare's
    edge.
  - API-backed pages (blog/insights, dynamic case studies, contact form
    submission handling) → SSR (`swr` or plain SSR) so they always reflect
    current Laravel API data and remain crawlable/SEO-friendly.
  - This requires a **persistent Node.js process on the VPS** (see §7) —
    unlike pure static generation, hybrid/SSR cannot be served as flat files
    alone.
- **API communication:** Nuxt frontend calls the Laravel REST API at
  `https://api.trigonapex.in` over HTTPS using `$fetch`/`useFetch`. No
  server-to-server secrets are exposed to the browser.
- **Content:** website copy (solutions, industries, products, case
  studies, etc.) is structured as typed static content, not hardcoded into
  page markup or backed by a CMS/database — see
  `docs/CONTENT_ARCHITECTURE.md`.

---

## 6. Backend Architecture

- **Framework:** Laravel 13 (PHP 8.3+ required — this is Laravel 13's actual
  minimum, so our PHP 8.3+ choice satisfies it with no slack for older PHP).
- **Architecture style:** REST API only. No Blade templates, no Laravel-side
  sessions for the public site.
- **Database:** MySQL 8.
- **Auth (if/when needed):** Laravel Sanctum for lightweight token-based auth
  — only introduced when a feature actually requires it (e.g., an admin
  area). Not installed at scaffold time.
- **CORS:** Laravel's built-in CORS middleware configured to allow only
  `https://trigonapex.in` (and local dev origins) to call the API.

---

## 7. Infrastructure & Deployment Topology

Hybrid/SSR rendering means the frontend now **requires** a running Node.js
process on the VPS (this is a change from the original draft, where static
generation would have made Node optional in production).

```
                        ┌─────────────────────┐
                        │      Cloudflare      │
                        │  (DNS, CDN, WAF/SSL) │
                        └───────────┬──────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                 │
          trigonapex.in                     api.trigonapex.in
                    │                                 │
                    ▼                                 ▼
        ┌─────────────────────────────────────────────────────┐
        │                  Hostinger VPS                       │
        │                                                       │
        │   ┌─────────────┐          ┌────────────────────┐    │
        │   │    Nginx    │─────────▶│  Nuxt 4 Node process │    │
        │   │ (reverse    │          │  (managed by PM2,    │    │
        │   │  proxy)     │          │  hybrid SSR/prerender)│    │
        │   │             │          └────────────────────┘    │
        │   │             │                                     │
        │   │             │─────────▶┌────────────────────┐    │
        │   │             │          │  Laravel 13 (PHP-FPM) │    │
        │   └─────────────┘          └──────────┬─────────┘    │
        │                                        │              │
        │                                        ▼              │
        │                               ┌─────────────────┐    │
        │                               │     MySQL 8       │    │
        │                               └─────────────────┘    │
        └───────────────────────────────────────────────────────┘
```

- **GitHub**: source of truth, branch-based workflow (see §8), future
  GitHub Actions for CI/CD.
- **Cloudflare**: DNS for `trigonapex.in` and `api.trigonapex.in`, proxied
  (orange-cloud) for CDN caching + DDoS protection, edge SSL termination.
- **Hostinger VPS**: single VPS hosting both the Nuxt Node process and the
  Laravel API, separated by Nginx server blocks per subdomain.
- **Nginx**: terminates traffic from Cloudflare, routes by hostname —
  `trigonapex.in` → Nuxt (proxied to the Node process), `api.trigonapex.in`
  → PHP-FPM/Laravel.

---

## 8. Environments & Branching

| Branch    | Purpose                              | Deploys to                       |
|-----------|---------------------------------------|-----------------------------------|
| `dev`     | Active development (current branch)   | Local / future dev environment    |
| `staging` | Pre-production QA (to be created)     | Staging subdomain (future)        |
| `main`    | Production-ready code (to be created) | `trigonapex.in` / `api.trigonapex.in` |

Per your explicit instruction, this stage touches **only `dev`**. `main`,
`staging`, `demo`, and `prod` are neither created nor modified here.

---

## 9. What This Step Does *Not* Include

- Running any scaffold command (`nuxi init`, `composer create-project`)
- Installing any npm or Composer packages
- Writing UI components, pages, or dummy content
- Configuring CI/CD pipelines
- Provisioning or configuring the Hostinger VPS
- Configuring Cloudflare DNS/SSL
- Creating `staging`/`main` branches

Scaffold commands are documented below and in `PROJECT_SETUP.md`, but will
only be **run** after your explicit go-ahead.

---

## 10. Version & Compatibility Notes (verified 2026-09-22)

- **Nuxt 4** is the current active major version (latest: 4.5.x, July 2026),
  distributed as `nuxt@latest` on npm. Not a preview/beta line.
- **Laravel 13** was released March 17, 2026, requires **PHP 8.3 minimum**,
  and its release notes describe **zero breaking changes** from Laravel 12 —
  low upgrade/compatibility risk.
- **Nuxt UI v4** requires **Nuxt ≥ 4.1**. Since we're scaffolding fresh on
  the current 4.5.x line, this is satisfied automatically — no separate
  version pin needed.
- **Nuxt UI v4 depends on Tailwind CSS v4**, not v3. It ships its own
  Tailwind integration; the classic `@nuxtjs/tailwindcss` community module
  (built for Tailwind v3) is **not used** in this stack.
- **MySQL 8 vs. Hostinger's default:** Hostinger VPS templates commonly
  ship **MariaDB** by default, not vanilla MySQL. Installing MySQL 8
  specifically (rather than accepting MariaDB) is a deliberate action at
  Stage 5 (server provisioning) — flagged so it isn't silently swapped for
  the distro default. No action needed now.
- **Node.js on the VPS:** current LTS is **Node.js 24** (Node 20 is past
  its useful support window by now). Required at Stage 5 because of the
  Hybrid/SSR rendering decision.

---

## 11. Remaining Open Decisions

See `PROJECT_SETUP.md` §"Decisions Requiring Your Approval" — the stack,
rendering mode, package manager, database, and repo strategy are now locked;
a small number of operational decisions (local dev environment, SSL
strategy, optional modules, admin/auth area) remain open.
