# AGENTS.md

This is a legacy Express service for internal tooling. It predates any
onboarding automation, so this file was written and maintained by hand.

## Ground rules

- Routes live in `src/routes`, one file per resource.
- Always validate input with Joi before touching the database.
- Never commit `.env` files — secrets come from the deploy host.
- Response bodies are always `{ data: ... }` on success, `{ error: ... }`
  on failure.

## Commands

- Test: `npm test`
- Start: `npm start`

## Gotchas

- The staging DB and prod DB share the same connection string env var —
  double-check `NODE_ENV` before running any migration.
- Deploys are manual via `./deploy.sh`; there is no CI pipeline yet.
- The `/legacy-export` endpoint is registered in `src/index.js` but the
  handler always returns 501 — nobody finished it.

## Known issues

- Session tokens are stored in plain text in the `sessions` table. Flagged
  for a fix, not yet scheduled.
- Error messages from the Joi validator leak internal field names to API
  clients.
