# Exploration Guide

Five scopes for the deep read. Run them as parallel subagents when
available (each gets ONE scope and the instruction to return findings as
`claim + file:line` pairs), or sequentially otherwise. Either way, the
merger (you) spot-checks surprising claims before accepting them.

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

## Classification (all scopes)

Every component lands in exactly one bucket, with the file path that proves it:

- **works** — wired AND exercised (called in code or covered by a real test)
- **half-wired** — exists but the circuit is broken somewhere (collected but
  never read, registered but never called, UI without backend, …)
- **dead** — no references outside itself

Half-wired is the highest-signal bucket: it is intent that never shipped,
and the first thing the user will want to know about.
