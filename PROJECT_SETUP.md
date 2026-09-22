# Project Setup Sequence — Trigon Apex Technologies Website

This document is the checklist we will follow, in order, once each stage is
approved. **Nothing below has been executed yet except Stage 0.** Each later
stage should be reviewed before starting the next.

---

## Stage 0 — Technical Foundation (this step) ✅

- [x] Inspect repository, confirm branch (`dev`)
- [x] Decide monorepo structure (`frontend/`, `backend/`, `infra/`, `docs/`)
- [x] Write `ARCHITECTURE.md`
- [x] Write `PROJECT_SETUP.md` (this file)
- [x] Create placeholder folders with explanatory READMEs (no code yet)

---

## Stage 1 — Frontend Scaffolding (not started; needs approval)

1. Scaffold Nuxt 3 project inside `frontend/`:
   ```
   npx nuxi@latest init frontend
   ```
2. Add TypeScript strict config.
3. Install Tailwind CSS via `@nuxtjs/tailwindcss` module.
4. Install GSAP.
5. Add code quality tooling: ESLint + Prettier (config aligned with Vue/TS).
6. Commit a minimal, unstyled placeholder page only (no real UI/content yet)
   to confirm the toolchain runs — this satisfies "app boots," not "app is
   designed."

## Stage 2 — Backend Scaffolding (not started; needs approval)

1. Scaffold Laravel project inside `backend/`:
   ```
   composer create-project laravel/laravel backend
   ```
2. Configure `.env.example` for MySQL connection.
3. Configure CORS to allow the frontend origin only.
4. Add a single health-check endpoint (`GET /api/health`) to confirm the API
   boots — not a real feature yet.

## Stage 3 — Local Development Workflow (not started; needs approval)

- Document (and possibly script) how to run both apps locally side by side:
  frontend dev server (`nuxi dev`) + Laravel dev server (`php artisan serve`
  or Laravel Sail/Docker) + local MySQL.
- Decide: native local setup vs. Docker Compose for consistency across
  machines. (Open decision — see below.)

## Stage 4 — CI/CD (not started; needs approval)

- GitHub Actions workflows, path-filtered so frontend and backend pipelines
  run independently.
- Lint/typecheck/test gates on PRs into `dev`/`staging`/`main`.

## Stage 5 — Server Provisioning (not started; needs approval)

- Provision Hostinger VPS: OS, users, firewall, required software (see
  "Required Server Software" below).
- Configure Nginx server blocks for both domains.
- Configure Cloudflare DNS + SSL mode.

## Stage 6 — First Deployment (not started; needs approval)

- Deploy pipeline from `main` branch to production.
- Smoke-test both `trigonapex.in` and `api.trigonapex.in`.

## Stage 7 — Design & Content (explicitly out of scope until later)

- Homepage design, UI components, real content, copywriting.

---

## Required Packages / Tools (identified, **not yet installed**)

### Frontend (`frontend/`)
| Package | Purpose |
|---|---|
| `nuxt` | Core framework (Nuxt 3) |
| `vue`, `vue-router` | Bundled with Nuxt, listed for clarity |
| `typescript`, `vue-tsc` | Type checking |
| `tailwindcss`, `@nuxtjs/tailwindcss` | Styling |
| `gsap` | Animation |
| `eslint`, `@nuxt/eslint-config`, `prettier` | Code quality (recommended) |
| `@nuxtjs/seo` or `nuxt-schema-org` | SEO/meta management — a corporate site needs solid SEO; recommended, **flagged for approval** |
| `@nuxt/image` | Image optimization — recommended, **flagged for approval** |
| `@vueuse/core` | Common composables — only if/when actually needed |

### Backend (`backend/`)
| Package | Purpose |
|---|---|
| `laravel/framework` | Core framework |
| `laravel/sanctum` | Token auth — only when a feature needs it, not installed at scaffold time |
| PHP extensions: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`, `fileinfo`, `gd` | Required by Laravel + MySQL |
| `laravel/pint` | Code style (recommended) |
| `pestphp/pest` or PHPUnit (bundled) | Testing |

### Tooling decisions still open
- Package manager for frontend: **npm vs pnpm vs yarn** — recommend `pnpm`
  for speed and disk efficiency. **Needs your approval.**
- Local dev environment: **native (PHP/Node installed directly) vs Docker
  Compose** — Docker gives environment parity with production and avoids
  "works on my machine," at the cost of needing Docker installed locally.
  **Needs your approval.**

---

## Required Server Software (Hostinger VPS) — to install at Stage 5, not now

- Ubuntu LTS (22.04 or 24.04 recommended)
- Nginx
- PHP 8.3+ with extensions: `fpm`, `mbstring`, `xml`, `curl`, `mysql`,
  `bcmath`, `zip`, `gd`, `intl`
- Composer
- MySQL 8.0 (or MariaDB — decision open)
- Git
- Node.js 20 LTS — **only required if Nuxt runs in SSR/hybrid mode** (a
  persistent Node process via PM2). Not needed at all if we settle on pure
  static generation, since the build output would be produced in CI and
  only static files copied to the server.
- Certbot — only if not fully relying on Cloudflare-issued/Origin
  certificates (decision open, see below)
- UFW (firewall) configured to allow only 22 (SSH), 80/443 (via Cloudflare
  IP ranges ideally)
- Optional, only if/when needed: Redis (cache/queues), Supervisor (queue
  workers), Fail2ban

---

## Decisions Requiring Your Approval

These are called out because committing to them without your sign-off would
violate "don't make undocumented architectural decisions."

1. **Monorepo vs. separate repos** — recommended: monorepo (see
   `ARCHITECTURE.md` §2). Please confirm or override.
2. **Nuxt 3 vs. Nuxt 4** — you specified Nuxt 3; Nuxt 4 is now the current
   stable line. Confirm you want to proceed on Nuxt 3 specifically (e.g. for
   ecosystem/module compatibility reasons), or switch to Nuxt 4.
3. **Rendering mode** — Static / SSR / Hybrid (recommended: Hybrid via
   `routeRules`). See `ARCHITECTURE.md` §4.
4. **Laravel version** — recommend the current stable release at scaffold
   time. Confirm no constraint (e.g., a specific LTS requirement) exists.
5. **Package manager** — npm vs pnpm (recommended: pnpm).
6. **Local dev environment** — native vs Docker Compose.
7. **Database engine** — MySQL vs MariaDB on the VPS (you said MySQL —
   confirming this is a firm choice vs. Hostinger's MariaDB default).
8. **SSL strategy** — Cloudflare Full (Strict) with Cloudflare Origin CA
   certificate on the VPS (recommended, simplest) vs. Certbot/Let's Encrypt
   on the VPS.
9. **Optional frontend modules** — SEO module and `@nuxt/image` (recommended
   to add at Stage 1) — confirm inclusion or defer.
10. **Auth/admin area** — does the site need any authenticated area (admin
    panel for managing content/leads) in the near term? This affects whether
    Sanctum and an admin UI need to be planned now vs. later.

No further action will be taken on Stage 1 onward until you respond to these.
