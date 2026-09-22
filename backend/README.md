# backend/

Laravel 13 REST API application serving api.trigonapex.in, backed by MySQL 8.

**Status:** scaffolded (Stage 3B). This is the standard Laravel skeleton
plus minimal API routing wiring (`routes/api.php` registered in
`bootstrap/app.php`) — no business models, controllers, migrations,
authentication, or admin panel have been built yet. See
`../ARCHITECTURE.md` and `../PROJECT_SETUP.md` at the repository root for
the full architecture and setup sequence.

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

`.env.example` documents the target **MySQL 8** connection (placeholders
only — no real credentials). For local development without a MySQL server
running, set `DB_CONNECTION=sqlite` and point `DB_DATABASE` at a local
`database/database.sqlite` file instead.

## Development server

```bash
php artisan serve
```

Serves on `http://localhost:8000` by default. Health check: `GET /up`.

## Running tests

```bash
php artisan test
```
