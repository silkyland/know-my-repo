# Conventions Extraction Guide

Conventions are the difference between generated code that looks native and
code that looks transplanted. Extract them from evidence, not vibes.

## The evidence rule

- **Convention** = the same pattern in **2+ places** with **no
  counterexample**. Cite two of the places.
- **Observation** = seen once. May go in docs only if load-bearing, marked
  as a single occurrence.
- **Inconsistency** = the repo does the same thing two different ways. Report
  both sides with citations and **do not silently pick a winner** — flag it
  for the user; if they choose, that choice becomes a Ground rule with "per
  user decision <date>".

## What to look for

Work through these dimensions; skip any that don't apply to the stack:

- **Naming** — files, classes, functions, DB tables/columns, routes, events.
  Include casing, prefixes/suffixes, singular/plural.
- **Module boundaries** — what imports what; layering direction; are there
  enforced rules (lint config) or just habits?
- **Error handling** — exceptions vs result types; where errors are caught;
  logging pattern (logger? levels? structured?).
- **Validation** — where input is validated (edge? domain? both?) and with what.
- **State & data access** — ORM patterns, repositories, query builders, raw
  SQL; transaction boundaries.
- **API/response shape** — envelope format, status code habits, pagination.
- **Frontend patterns** (if any) — component structure, state management,
  styling system, i18n.
- **Test patterns** — naming, arrange/act/assert style, fixtures/factories,
  what a "good" test in this repo looks like (quote one).
- **Commit/branch habits** — conventional commits? scopes? (from git log)

## Where to look for counterexamples

Before declaring a convention, grep for the competing pattern. Two fast
checks per dimension beat ten unchecked declarations. The most common
inconsistencies live between old and new code — compare the oldest and the
newest module doing the same kind of work.

## Output format

One line each, ready to paste into AGENTS.md:

```
- Services are `<Domain><Action>Service` classes registered in config/services.xml
  (e.g. src/Cart/CartCalculatorService.php:12, src/Order/OrderSyncService.php:9).
- INCONSISTENT: dates stored as UNIX int in orders (schema.sql:44) but ISO string
  in events (src/Event/OrderPlaced.php:21) — flag for user decision.
```
