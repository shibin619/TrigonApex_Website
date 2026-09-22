# Project Setup Sequence — Trigon Apex Technologies Website

This document is the checklist we will follow, in order, once each stage is
approved. **Nothing below has been executed yet except Stage 0.** The stack
was locked in Stage 0.5 (this update) but **no scaffold command has been run
yet** — Stages 1 and 2 are documented in full below and wait for your
explicit go-ahead.

---

## Stage 0 — Technical Foundation ✅

- [x] Inspect repository, confirm branch (`dev`)
- [x] Decide monorepo structure (`frontend/`, `backend/`, `infra/`, `docs/`)
- [x] Write `ARCHITECTURE.md` / `PROJECT_SETUP.md`
- [x] Create placeholder folders with explanatory READMEs (no code yet)

## Stage 0.5 — Stack Lock ✅ (this update)

- [x] Verified Nuxt 4 and Laravel 13 are current, appropriate, compatible
  choices (see `ARCHITECTURE.md` §10)
- [x] Updated `ARCHITECTURE.md` and `PROJECT_SETUP.md` to reflect: Nuxt 4,
  Nuxt UI v4, Tailwind CSS v4, GSAP, Laravel 13, PHP 8.3+, MySQL 8, npm,
  Hybrid/SSR rendering, monorepo
- [ ] **Waiting on your approval to run any scaffold command**

---

## Stage 1 — Frontend Scaffolding (documented, NOT executed — needs approval)

### Exact commands to be run (from the repository root, on `dev`)

```bash
# 1. Scaffold a Nuxt 4 project into ./frontend
#    --packageManager npm : locks npm, skips the interactive prompt
#    --gitInit false      : we're already inside a git repo (the monorepo);
#                            nuxi must NOT initialize a nested .git
npx nuxi@latest init frontend --packageManager npm --gitInit false

cd frontend

# 2. Add Nuxt UI (component library) + Tailwind CSS v4 (Nuxt UI's own dependency)
npm install @nuxt/ui tailwindcss

# 3. Add GSAP for animation
npm install gsap

# 4. Type-checking tool (vue-tsc); typescript itself is already a Nuxt dependency
npm install -D vue-tsc
```

### What each command creates

| Command | Creates |
|---|---|
| `nuxi init frontend` | Full Nuxt 4 skeleton: `app/` (pages, components, layouts, app.vue), `public/`, `server/`, `nuxt.config.ts`, `tsconfig.json`, `package.json`, `.gitignore` (frontend-scoped, harmless alongside the root one) |
| `npm install @nuxt/ui tailwindcss` | Adds both packages to `frontend/package.json` + `package-lock.json`; no config is auto-applied — module registration and the CSS import happen as a manual follow-up edit, not part of the install itself |
| `npm install gsap` | Adds GSAP to `frontend/package.json`; no config needed, imported directly where used |
| `npm install -D vue-tsc` | Adds the Vue TypeScript checker as a dev dependency for `vue-tsc --noEmit` type-checking scripts |

### Manual edits after install (part of Stage 1, still no UI/content)

- Register the module in `nuxt.config.ts`: `modules: ['@nuxt/ui']`
- Create `app/assets/css/main.css` with:
  ```css
  @import "tailwindcss";
  @import "@nuxt/ui";
  ```
  and reference it via `css: ['~/assets/css/main.css']` in `nuxt.config.ts`
- Wrap the root `app.vue` content in `<UApp>` (required for Nuxt UI's
  toasts/tooltips/overlays to work)
- Set `routeRules` scaffolding in `nuxt.config.ts` for the Hybrid/SSR
  approach (empty/example rules only — no real pages yet)
- Commit a minimal, unstyled placeholder page only, to confirm the
  toolchain runs — this satisfies "app boots," not "app is designed."

---

## Stage 2 — Backend Scaffolding (documented, NOT executed — needs approval)

### Exact commands to be run (from the repository root, on `dev`)

```bash
# Scaffold a Laravel 13 project into ./backend
composer create-project laravel/laravel backend "13.*" --prefer-dist
```

`composer create-project` (unlike the `laravel new` installer) does **not**
run `git init` inside the target folder, so it's the safer choice inside an
existing monorepo — no nested `.git` to clean up.

### What this command creates

- Full Laravel 13 application skeleton inside `backend/`: `app/`, `routes/`
  (including `routes/api.php`), `database/migrations/`, `config/`, `.env`
  (generated from `.env.example`, gitignored), `composer.json`/`composer.lock`
- A fresh `APP_KEY` is generated automatically as part of the create-project
  post-install scripts

### Manual edits after install (part of Stage 2, still no real features)

- Edit `backend/.env` (and `.env.example`) to point `DB_CONNECTION=mysql`,
  `DB_DATABASE`, etc. at a local MySQL 8 instance
- Configure `config/cors.php` to allow only the frontend's local/dev origin
- Add a single `GET /api/health` route in `routes/api.php` returning a
  static JSON payload, to confirm the API boots — not a real feature yet

---

## Stage 3 — Local Development Workflow (not started; needs approval)

- Document how to run both apps locally side by side: frontend dev server
  (`npm run dev` → `nuxi dev`) + Laravel dev server (`php artisan serve`) +
  local MySQL 8.
- **Open decision:** native local setup vs. Docker Compose (see below).

## Stage 4 — CI/CD (not started; needs approval)

- GitHub Actions workflows, path-filtered so frontend and backend pipelines
  run independently.
- Lint/typecheck/test gates on PRs into `dev`/`staging`/`main`.

## Stage 5 — Server Provisioning (not started; needs approval)

- Provision Hostinger VPS: OS, users, firewall, required software (below).
- Install **MySQL 8 explicitly** (Hostinger VPS templates commonly default
  to MariaDB — this needs a deliberate install, not the distro default).
- Install Node.js 24 LTS and configure PM2 to run the Nuxt Hybrid/SSR
  process (required now that Hybrid/SSR is locked in, not optional).
- Configure Nginx server blocks for both domains.
- Configure Cloudflare DNS + SSL mode.

## Stage 6 — First Deployment (not started; needs approval)

- Deploy pipeline from `main` branch to production.
- Smoke-test both `trigonapex.in` and `api.trigonapex.in`.

## Stage 7 — Design & Content (explicitly out of scope until later)

- Homepage design, UI components, real content, copywriting.
- The reusable content *structure* (not the copy itself) that this stage
  will populate is already defined in `docs/CONTENT_ARCHITECTURE.md`.

---

## Locked Packages / Tools

### Frontend (`frontend/`)
| Package | Purpose |
|---|---|
| `nuxt` (v4.x) | Core framework |
| `vue`, `vue-router` | Bundled with Nuxt |
| `typescript` | Bundled with Nuxt; strict mode enabled |
| `vue-tsc` | Type checking script |
| `@nuxt/ui` (v4.x) | Component library, theming, icons/fonts/color-mode included |
| `tailwindcss` (v4.x) | Styling engine, used via Nuxt UI's integration |
| `gsap` | Animation |

### Backend (`backend/`)
| Package | Purpose |
|---|---|
| `laravel/framework` (v13.x) | Core framework |
| PHP extensions: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`, `fileinfo`, `gd` | Required by Laravel + MySQL |
| `laravel/sanctum` | **Not installed at scaffold time** — added only when an auth-requiring feature exists |

### Deferred / still open (not part of Stage 1–2 scaffold)
- `laravel/pint`, `pestphp/pest` — code style/testing, add when the backend
  has real code to lint/test
- `eslint`, `prettier` — recommended for the frontend, not required to boot;
  add alongside the first real feature work
- `@nuxt/image`, an SEO module (e.g. `@nuxtjs/seo`) — recommended for a
  marketing site, **still flagged for your approval**, not part of this
  scaffold

---

## Required Server Software (Hostinger VPS) — install at Stage 5, not now

- Ubuntu LTS (22.04 or 24.04 recommended)
- Nginx
- PHP 8.3+ with extensions: `fpm`, `mbstring`, `xml`, `curl`, `mysql`,
  `bcmath`, `zip`, `gd`, `intl`
- Composer
- **MySQL 8** — install explicitly; do not accept the Hostinger default
  (commonly MariaDB) without checking
- Git
- **Node.js 24 LTS** — now required (not optional) because Hybrid/SSR
  rendering needs a persistent Node process, managed by PM2
- Certbot — only if not fully relying on Cloudflare-issued/Origin
  certificates (still open, see below)
- UFW (firewall) configured to allow only 22 (SSH), 80/443
- Optional, only if/when needed: Redis (cache/queues), Supervisor (queue
  workers), Fail2ban

---

## Decisions Now Locked

1. ~~Monorepo vs. separate repos~~ → **Monorepo.**
2. ~~Nuxt 3 vs. Nuxt 4~~ → **Nuxt 4** (current stable, verified 2026-09-22).
3. ~~Rendering mode~~ → **Hybrid/SSR** via `routeRules`.
4. ~~Laravel version~~ → **Laravel 13** (PHP 8.3+ minimum, verified current).
5. ~~Package manager~~ → **npm.**
6. ~~Database engine~~ → **MySQL 8** (explicit install at Stage 5, see note
   above about Hostinger's MariaDB default).
7. ~~Component library~~ → **Nuxt UI v4.**

## Decisions Still Requiring Your Approval

1. **Local dev environment** — native (PHP/Node/MySQL installed directly)
   vs. Docker Compose for parity across machines.
2. **SSL strategy** — Cloudflare Full (Strict) with Cloudflare Origin CA
   certificate on the VPS (simplest) vs. Certbot/Let's Encrypt on the VPS.
3. **Optional frontend modules** — SEO module (e.g. `@nuxtjs/seo`) and
   `@nuxt/image` — recommended for a marketing site, not part of the Stage 1
   scaffold above unless you confirm now.
4. **Auth/admin area** — does the site need an authenticated area (admin
   panel for managing content/leads) soon? Affects whether Sanctum and an
   admin UI need to be planned now vs. later.

**No scaffold command will be run until you approve Stage 1 and Stage 2
above.**
