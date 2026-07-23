# Evals

Manual test scenarios for `/know-my-repo`, per Anthropic's guidance to build
evaluations before writing extensive documentation. There is no automated
harness — run each scenario against its fixture and check the result against
[scenarios.md](scenarios.md).

## Fixtures

- `fixtures/tiny-node-api/` — a small Express app with two routes that
  repeat a real convention (the `asyncHandler` wrapper, the
  `{ data: ... }` response envelope) and a runnable test suite
  (`node --test`, or `npm test`). Exercises the core flow: convention
  extraction, command verification, exemplar trace.
- `fixtures/empty-scaffold/` — `package.json` only, no code. Exercises the
  empty-repo preflight path.
- `fixtures/has-existing-agents/` — a substantial (25+ meaningful line)
  `AGENTS.md` already present. Exercises the "stop and ask: update or
  clean-slate?" branch in Step 1.

## Running a scenario

```bash
cd evals/fixtures/tiny-node-api
/know-my-repo .
```

Then compare the run against that fixture's `expected_behavior` entries in
[scenarios.md](scenarios.md).
