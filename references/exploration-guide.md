# Exploration Guide

Six scopes for the deep read. Run them as parallel subagents when the tier
calls for it and they are available (each gets ONE scope and the instruction
to return findings as `claim + evidence` pairs), or sequentially otherwise —
on Light, one pass may cover several scopes. Either way, the merger (you)
spot-checks surprising claims before accepting them: a scout's wrong belief
is a `CORRECTED` entry like your own.

## Findings format

Every finding lands as one row — in `.know-my-repo/findings/<scope>.md` on
Standard/Heavy, or directly in the state file on Light:

```
claim | evidence (file:line, or command + output) | VERIFIED/UNVERIFIED | NQ#
```

`NQ#` is the Newcomer Question the finding answers. Findings that answer no
question are still kept when they are load-bearing (a sharp edge, a
half-wired component); the rest are noise.

**Corrections** are collected across all scopes and steps, not just here:
whenever a claim in a README, comment, existing doc, commit message, or
your own earlier hypothesis turns out wrong against the code, log
`CORRECTED: <old belief> → <new fact> (file:line)` in the state file's
Corrections section. Check the places claims hide: doc comments above
functions, README "how it works" sections, TODO/FIXME notes that describe
finished or abandoned work, and config defaults nobody reads anymore.

## Scout brief (Standard/Heavy)

```
Objective: answer Newcomer Questions <numbers> for <project root>.
Scope: <one scope from below, with its path boundaries>. Out of scope:
<what the other scouts cover>.
Sources, in order: the repo's own code and tests, then installed
dependencies (vendor/, node_modules/) for framework behavior, then official
docs for the locked version. Recalled API knowledge does not count; tag it
UNVERIFIED.
Output: write findings to <root>/.know-my-repo/findings/<scope>.md in the
findings format above. Reply with that path and at most 10 lines of summary.
Log any repo-doc claim the code contradicts as CORRECTED.
Do not edit project files. Stop when every assigned question is answered
or tagged UNVERIFIED.
```

When a report comes back, read the findings file rather than only the
reply, and open the cited line for anything surprising or load-bearing.

## Scope 1 — Structure & entry points

- Top-level layout: what each directory is for (prove it, don't guess from
  the name — open two files per directory).
- Entry points: main/index/bootstrap, HTTP routes, CLI commands, cron/queue
  consumers, event subscribers.
- Public surface vs internals: what is exported/registered vs local.

## Scope 2 — Data flow

- Storage: databases, schemas/migrations, caches, external APIs, files.
- ONE full write path: input → validation → transformation → persistence.
- ONE full read path: query → transformation → render/serialize → output.
- Note every layer boundary crossed and the contract at each (types, DTOs,
  schemas) — mismatches here are the classic half-wired symptom.

## Scope 3 — Wiring

- DI/service registration, config files, env variables (and which are
  required vs defaulted).
- Feature flags, plugin/extension mechanisms.
- Anything registered but never invoked, or invoked but never registered →
  classify half-wired/dead with evidence.

## Scope 4 — Tests & quality gates

- Test layout, frameworks, how tests are invoked.
- What is actually covered vs decorative (open a few tests — do they
  assert behavior or just "it runs"?).
- CI pipeline: what gates a merge (lint, types, tests, build)?

## Scope 5 — Git trajectory

- `git log --oneline -30` plus a look at the most-churned files
  (`git log --format= --name-only -50 | sort | uniq -c | sort -rn | head -15`).
- What was the team building toward? What was reverted or abandoned?
- Recent renames/moves — signs of an in-flight refactor the docs must
  mention (an agent that ignores an in-flight refactor extends the old
  pattern and makes the split worse).

## Scope 6 — Operational reality

Docs that explain the code but not how it ships are incomplete — an agent
that only knows the request path will happily break the deploy.

- Deploy pipeline: how code reaches production — CI deploy jobs,
  Dockerfile/compose, infra directories, platform config (`vercel.json`,
  `fly.toml`, `Procfile`, …).
- Environments: which exist (dev/staging/prod), how config differs per
  environment, and where secrets are expected to come from.
- Background jobs: cron, queues, workers, scheduled tasks — anything that
  runs outside the request path and touches the same data.
- Data scale, where discoverable: seed/fixture sizes, pagination defaults,
  comments about volume. Docs written against a toy dataset mislead on a
  real one.
- Many repos have no deploy config at all — that is a finding, not a
  blank: record "no deploy pipeline found in the repo" with the places you
  checked, rather than guessing one.

## Classification (all scopes)

Every component lands in exactly one bucket, with the file path that proves it:

- **works** — wired AND exercised (called in code or covered by a real test)
- **half-wired** — exists but the circuit is broken somewhere (collected but
  never read, registered but never called, UI without backend, …)
- **dead** — no references outside itself

Half-wired is the highest-signal bucket: it is intent that never shipped,
and the first thing the user will want to know about.
