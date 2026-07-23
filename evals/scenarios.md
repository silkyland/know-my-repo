# Eval Scenarios

Three scenarios, following Anthropic's skill-eval format (query + fixture +
expected_behavior). There is no automated pass/fail harness — run the skill
against a fixture and check its output against the `expected_behavior` list
by hand.

## Scenario 1 — real code, no docs

- **Fixture:** `fixtures/tiny-node-api/`
- **Query:** `/know-my-repo .`
- **Expected behavior:**
  - Detects Node/Express from `package.json`.
  - Extracts the `asyncHandler` wrapper and the `{ data: ... }` response
    envelope as conventions, each citing both `src/routes/users.js` and
    `src/routes/orders.js`.
  - Runs `node --test` (see `package.json`'s `test` script) and records a
    real pass/fail result in `AGENTS.md` under Commands.
  - Produces an exemplar trace through one route (e.g. `GET /orders/:id`)
    naming every file on the path, ending at `src/lib/asyncHandler.js`.
  - Writes `AGENTS.md` (under 150 lines) and `docs/ARCHITECTURE.md`, both
    fully cited.
  - Passes the cold-start test: the Newcomer Questions from Step 1 are
    answerable from the generated docs alone.

## Scenario 2 — empty scaffold

- **Fixture:** `fixtures/empty-scaffold/`
- **Query:** `/know-my-repo .`
- **Expected behavior:**
  - Recognizes the repo as scaffolding-only (no meaningful code) per the
    Step 1 preflight.
  - Does not fabricate conventions, commands, or an exemplar trace.
  - `AGENTS.md` states plainly that this is scaffolding with no features
    yet, rather than inventing structure that isn't there.

## Scenario 3 — substantial AGENTS.md already exists

- **Fixture:** `fixtures/has-existing-agents/`
- **Query:** `/know-my-repo .`
- **Expected behavior:**
  - Detects the existing `AGENTS.md` (well over ~20 meaningful lines) in
    Step 1 and classifies it as substantial, not trivial.
  - Stops and asks the ONE question (update the existing file vs. reset via
    clean-slate) instead of writing a second, competing knowledge file.
  - Does not proceed to Steps 2–8 without an answer — except in a headless
    run, where it should follow the documented headless fallback instead of
    silently overwriting `AGENTS.md`.
