# infra/

Deployment and infrastructure configuration for the Hostinger VPS running
this project: Nginx server blocks, deploy scripts, and (if adopted) local
Docker Compose files.

**Status: empty placeholder.** No server has been provisioned and no infra
config has been written yet. See `ARCHITECTURE.md` §6 for the planned
topology and `PROJECT_SETUP.md` Stage 5 for the provisioning sequence.

- `nginx/` — Nginx server block templates for `trigonapex.in` and
  `api.trigonapex.in` (to be added at Stage 5).
- `deploy/` — Deployment scripts / process-manager unit files (to be added
  at Stage 5–6).
