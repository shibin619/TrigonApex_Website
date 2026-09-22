# Database Architecture — Trigon Apex Technologies Website

Status: **Foundation only.** This document establishes what belongs in
MySQL 8 for the corporate website and why, before any authentication, admin
panel, CMS, or business-specific product modules exist. It is written to be
extended, not treated as final.

---

## 1. Guiding question: database vs. static/content-managed data

Not everything on a marketing site needs a database row. The test applied
to each candidate entity below is:

- **Is it user-submitted or transactional?** → belongs in MySQL. It's
  created by an unknown visitor at an unpredictable time, needs to persist
  reliably, and someone (staff) needs to act on it later.
- **Is it authored/curated by us and rarely changes?** → belongs in
  static/content files (Markdown, JSON, or a future content module), not a
  database table. It doesn't need transactional guarantees, has no
  "submissions," and is more naturally version-controlled alongside the
  site's copy than administered through a database.

## 2. Evaluating the six candidate entities

| Entity | Nature | Decision | Why |
|---|---|---|---|
| Contact enquiries | User-submitted | **Database** | Unpredictable arrival, needs persistence, staff must triage/respond. Classic transactional data. |
| Consultation requests | User-submitted | **Database** (consolidated — see §3) | Same shape as a contact enquiry: visitor info + intent + message. Distinguished only by *why* they're reaching out, not by data structure. |
| Product demo requests | User-submitted | **Database** (consolidated — see §3) | Same reasoning as consultation requests — a lead capture form with a different intent label. |
| Newsletter subscriptions | User-submitted, but a distinct lifecycle | **Deferred** | Structurally different from an enquiry (ongoing subscription state, confirm/unsubscribe tokens, compliance with CAN-SPAM/GDPR double opt-in). Building this properly means choosing an email provider and a compliance flow — that's a real feature decision, not foundation. Building a bare `email` column now would be replaced, not extended, once that decision is made. |
| Case studies | Authored by us, low change frequency | **Static/content-managed** | This is marketing copy (title, narrative, results, images), not visitor-generated data. No "submissions," no transactional need. Fits a content file or future CMS layer, not a database table. |
| Testimonials | Authored/curated by us, low change frequency | **Static/content-managed** | Same reasoning as case studies — a curated quote + name + company, edited rarely, versioned like other site copy. |

**Result: one table is justified at this stage.** Three of the six
candidates are variations of the same underlying data (a visitor leaves
their contact info and an intent) and don't warrant three near-identical
tables before any real UI or business logic exists. The other three don't
belong in MySQL at all yet.

## 3. Proposed table: `inquiries`

A single table covering contact enquiries, consultation requests, and
product demo requests, distinguished by a `type` field rather than three
separate schemas. This avoids both extremes: neither building nothing, nor
building three tables that would need to be reconciled later anyway once
an actual form exists.

### Columns

| Column | Type | Notes |
|---|---|---|
| `id` | `BIGINT UNSIGNED`, primary key, auto-increment | Laravel default `id()` |
| `type` | `VARCHAR(255)`, indexed | `contact`, `consultation`, or `demo_request`. Plain string, not a MySQL `ENUM` — see §7 (extensibility). |
| `name` | `VARCHAR(255)` | Submitter's name |
| `email` | `VARCHAR(255)`, indexed | Submitter's email |
| `phone` | `VARCHAR(50)`, nullable | Optional |
| `company` | `VARCHAR(255)`, nullable | Optional |
| `message` | `TEXT`, nullable | Free-form message/details |
| `status` | `VARCHAR(255)`, indexed, default `new` | `new`, `in_progress`, `resolved`, `archived` — internal triage state |
| `source` | `VARCHAR(255)`, nullable | Which page/form the submission came from, for future attribution |
| `ip_address` | `VARCHAR(45)`, nullable | IPv4/IPv6; abuse/spam tracking (see §9 privacy) |
| `user_agent` | `VARCHAR(255)`, nullable | Spam triage/debugging aid |
| `created_at` / `updated_at` | `TIMESTAMP` | Standard Laravel timestamps |
| `deleted_at` | `TIMESTAMP`, nullable | Soft delete — see §6 |

### Primary key

`id` — standard auto-incrementing surrogate key. No natural key exists
(email is not unique per row: the same person may submit multiple
enquiries over time).

### Indexes

- `email` — staff will look up "has this person contacted us before."
- `type` — filtering the inbox by contact vs. consultation vs. demo.
- `status` — filtering by triage state (e.g., "show me everything still
  `new`").

Kept deliberately simple — no composite indexes yet. They can be added
later once real query patterns exist (e.g., an admin inbox view), rather
than guessed now.

### Relationships

**None at this stage.** No foreign keys — there is no `users` or `staff`
table yet (authentication/admin are explicitly out of scope for this
stage). A future admin stage may add an `assigned_to` foreign key once
staff accounts exist; that is a forward-compatible additive migration, not
a reason to build it now.

## 4. Timestamps

Standard Laravel `created_at`/`updated_at` (via `$table->timestamps()`).
`created_at` is the operative field for "when did this come in" — no
separate submission-date column is needed.

## 5. Migrations as the source of truth

Schema changes are version-controlled Laravel migrations, run
per-environment. No manual schema edits against any live database. This
migration has not been run against any shared, staging, or production
database — only validated locally (see `PROJECT_SETUP.md` and the
validation results in the Stage 5 commit).

## 6. Soft deletion strategy

`inquiries` uses Laravel's soft deletes (`deleted_at`). Rationale: these
rows represent real business leads. Staff may want to remove spam or
resolved entries from daily views without permanently destroying a record
that could matter later (a re-contacted lead, a dispute, an audit
question). Soft delete is cheap insurance; a future scheduled job can hard-
delete old soft-deleted spam if storage/privacy ever requires it.

No other tables exist yet, so this strategy applies only to `inquiries`
for now — it is not a blanket policy for every future table.

## 7. Future extensibility

- **`type` is a plain string, not a MySQL `ENUM`.** Adding a new inquiry
  type later (e.g., `partnership`) is then a pure application-layer change
  (validation rules / a PHP backed enum), not a schema migration. MySQL
  `ENUM` columns are cheap to add to but awkward to modify later.
- **No premature foreign keys.** Once authentication/admin exists, an
  `assigned_to_user_id` nullable foreign key can be added additively.
- **Newsletter subscriptions, case studies, and testimonials** each get
  their own future migration(s) once their respective features are
  actually designed (see §2) — this document does not block them, it just
  declines to guess their shape today.
- **No JSON "catch-all" column** was added for speculative future fields.
  If a genuine new field is needed later, add it as a real column via a
  new migration — keeps the schema self-documenting.

## 8. What stays static/content-managed (not in MySQL, for now)

- **Case studies** — static content files (e.g., Markdown/JSON under
  `frontend/` or a future content module) rather than database rows.
- **Testimonials** — same: curated, low-frequency-change marketing copy.
- **Newsletter subscriptions** — deliberately not started as a bare email
  column; deferred until the actual subscription/compliance flow is
  designed (see §2).

## 9. Privacy & security considerations

- `inquiries` stores personal data (name, email, optionally phone/company)
  submitted directly by the person it belongs to for the purpose of being
  contacted back — a legitimate, expected use consistent with a "Contact
  Us"-style form.
- `ip_address` and `user_agent` are stored for spam/abuse triage. This is
  common practice, but it **is** personal data under regimes like GDPR —
  worth revisiting retention policy once a privacy policy exists for the
  site (e.g., a scheduled job to purge old, resolved, non-actionable
  entries after N months). Not implemented yet; flagged for a future
  stage, not solved here.
- No passwords, tokens, or authentication secrets are stored in this
  table — there is no authentication system yet, by design.
- Database credentials live only in per-environment `.env` files, never in
  `.env.example` or version control (see Stage 5 security notes in the
  commit report).
- No production or staging database has been created, connected to, or
  migrated against as part of this stage.

## 10. Explicitly deferred (not part of this stage)

- Newsletter subscriptions table/flow
- Case studies and testimonials schema (if ever moved off static content)
- Any `users`/authentication tables
- Any admin-panel-specific tables
- Any product-specific business tables (Natro Dental, Manufacturing,
  Finance, POS, Taxi, or any other client vertical)
- Foreign keys from `inquiries` to future staff/user accounts
