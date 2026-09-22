# Architecture — Trigon Apex Technologies Website

Status: **Foundational planning document.** No application code exists yet.
This document records the technical decisions made before any implementation
begins, so that all future work builds on an agreed, written foundation.

---

## 1. Project Positioning

Trigon Apex Technologies — "Software Solutions for Business Growth." A
production-ready corporate marketing website with a decoupled API backend for
future dynamic features (contact/lead forms, case studies, blog/insights,
possibly a client portal later).

---

## 2. Repository Strategy: Monorepo

**Decision: single monorepo** containing both the Nuxt 3 frontend and the
Laravel backend, rather than two separate repositories.

### Why a monorepo

- The frontend and backend are versioned, deployed, and evolved together for
  this project — they are not independently reusable services or owned by
  separate teams.
- Both `trigonapex.in` and `api.trigonapex.in` ship from the same
  infrastructure (one Hostinger VPS, fronted by Cloudflare), so cross-cutting
  infra config (Nginx, deploy scripts, environment docs) naturally lives in
  one place instead of being duplicated across repos.
- Single source of truth for architecture/setup docs, issue tracking, and PR
  history — useful for a small team or solo developer.
- Atomic commits: an API contract change and its corresponding frontend
  change can land in one PR instead of being coordinated across repos.

### Trade-offs accepted

- Two different toolchains (Node/PHP) live side by side. Mitigated by strict
  path separation (`/frontend`, `/backend`) and separate lockfiles/dependency
  trees — neither toolchain reaches into the other's folder.
- CI/CD must be path-aware later (only build/deploy what changed) — noted as
  a future task, not yet configured.

**This is marked as a decision requiring your explicit sign-off** — see
`PROJECT_SETUP.md` §"Decisions requiring approval." If you'd rather split
into two repos later, the folder boundaries below make that split
mechanical (each top-level folder can become its own repo with history
preserved via `git subtree split`).

---

## 3. Proposed Folder Structure

```
TrigonApex_Website/
├── frontend/                # Nuxt 3 + Vue 3 + TypeScript app (not yet scaffolded)
│   ├── app/                 # Nuxt 3 app/ directory (components, pages, layouts)
│   ├── public/               # Static assets
│   ├── nuxt.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                  # Laravel REST API (not yet scaffolded)
│   ├── app/
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   └── migrations/
│   ├── config/
│   ├── .env.example
│   └── composer.json
│
├── infra/                    # Deployment & infrastructure config (future)
│   ├── nginx/                 # Nginx server block templates for both domains
│   ├── docker/                # Optional local dev containers (if adopted)
│   └── deploy/                # Deploy scripts, systemd/PM2 unit files
│
├── docs/                      # Project documentation (expands over time)
│   ├── API.md                 # API contract, once endpoints are designed
│   ├── DEPLOYMENT.md          # Step-by-step server deployment guide
│   └── CONTRIBUTING.md        # Branching, commit, and PR conventions
│
├── .github/
│   └── workflows/             # CI/CD pipelines (to be added later)
│
├── ARCHITECTURE.md            # This file
├── PROJECT_SETUP.md           # Setup sequence to follow
├── README.md
└── .gitignore
```

Rationale for `frontend/` and `backend/` as top-level siblings (rather than
nesting one inside the other): keeps each toolchain's dependency
installation (`npm`/`pnpm` vs `composer`) fully isolated, and matches how
they'll be deployed independently (static/SSR Node process vs PHP-FPM).

---

## 4. Frontend Architecture

- **Framework:** Nuxt 3 (Vue 3, TypeScript strict mode)
- **Styling:** Tailwind CSS
- **Animation:** GSAP, used sparingly for subtle motion (per your direction —
  not a heavy animation-driven site)
- **Rendering mode:** ⚠️ **Open decision** — needs your input:
  - **Static Site Generation (SSG)** via `nuxt generate`: fastest, cheapest to
    host (plain static files served by Nginx/Cloudflare, no Node process on
    the VPS), best fit if content changes infrequently (typical marketing
    site).
  - **Server-Side Rendering (SSR)**: needed if pages must reflect live data
    from the Laravel API on every request (e.g., frequently changing case
    studies/blog). Requires a persistent Node process on the VPS managed by
    PM2.
  - **Hybrid** (Nuxt `routeRules` — mix static, SSR, and ISR per route):
    Nuxt 3's built-in way to get static marketing pages *and* a dynamic
    blog/contact flow without committing fully to either extreme.
  - **Recommendation:** start with **Hybrid**, defaulting most marketing
    pages to static/prerendered, with any API-backed pages (blog, forms)
    using SSR or ISR. This avoids re-deciding the whole architecture when a
    dynamic content need shows up. Final call is yours — recorded in
    `PROJECT_SETUP.md`.
- **API communication:** Nuxt frontend calls the Laravel REST API at
  `https://api.trigonapex.in` over HTTPS using `$fetch`/`useFetch`. No
  server-to-server secrets are exposed to the browser.

---

## 5. Backend Architecture

- **Framework:** Laravel (latest stable — version to be pinned in
  `PROJECT_SETUP.md`)
- **Architecture style:** REST API only. Laravel is **not** used to render
  any HTML views — it is a pure JSON API service consumed by the Nuxt
  frontend. No Blade templates, no Laravel-side sessions for the public site.
- **Database:** MySQL
- **Auth (if/when needed):** Laravel Sanctum for lightweight token-based auth
  — only introduced when a feature actually requires it (e.g., an admin
  area). Not installed at this stage.
- **CORS:** Laravel's built-in CORS middleware configured to allow only
  `https://trigonapex.in` (and local dev origins) to call the API.

---

## 6. Infrastructure & Deployment Topology

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
        │   │    Nginx    │─────────▶│  Nuxt 3 output       │    │
        │   │ (reverse    │          │  (static files, or   │    │
        │   │  proxy /    │          │  Node process via PM2 │    │
        │   │  static     │          │  if SSR/hybrid)       │    │
        │   │  server)    │          └────────────────────┘    │
        │   │             │                                     │
        │   │             │─────────▶┌────────────────────┐    │
        │   │             │          │  Laravel (PHP-FPM)   │    │
        │   └─────────────┘          └──────────┬─────────┘    │
        │                                        │              │
        │                                        ▼              │
        │                               ┌─────────────────┐    │
        │                               │      MySQL       │    │
        │                               └─────────────────┘    │
        └───────────────────────────────────────────────────────┘
```

- **GitHub**: source of truth, branch-based workflow (see §8), future
  GitHub Actions for CI/CD.
- **Cloudflare**: DNS for `trigonapex.in` and `api.trigonapex.in`, proxied
  (orange-cloud) for CDN caching + DDoS protection, edge SSL termination.
- **Hostinger VPS**: single VPS initially hosting both the frontend
  artifact and the Laravel API, separated by Nginx server blocks per
  subdomain.
- **Nginx**: terminates traffic from Cloudflare, routes by hostname —
  `trigonapex.in` → frontend, `api.trigonapex.in` → PHP-FPM/Laravel.

---

## 7. Environments & Branching (proposed)

| Branch    | Purpose                              | Deploys to                       |
|-----------|---------------------------------------|-----------------------------------|
| `dev`     | Active development (current branch)   | Local / future dev environment    |
| `staging` | Pre-production QA (to be created)     | Staging subdomain (future)        |
| `main`    | Production-ready code (to be created) | `trigonapex.in` / `api.trigonapex.in` |

None of these branches except `dev` exist yet. They will be created
deliberately when we're ready for that stage — not part of this step.

---

## 8. What This Step Does *Not* Include

Per explicit scope for this stage, the following are intentionally **not**
done yet, and require a separate, later approval:

- Scaffolding an actual Nuxt project (`npx nuxi init`) or Laravel project
  (`composer create-project laravel/laravel`)
- Installing any npm or Composer packages
- Writing UI components, pages, or dummy content
- Configuring CI/CD pipelines
- Provisioning or configuring the Hostinger VPS
- Configuring Cloudflare DNS/SSL
- Creating `staging`/`main` branches

---

## 9. Open Decisions Requiring Your Approval

See `PROJECT_SETUP.md` §"Decisions requiring approval" for the consolidated
list with recommendations.
