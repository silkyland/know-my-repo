# Knowledge Templates

Structures for the two files Step 6 creates. Family philosophy: every fact
carries a citation or a command you ran; anything unverifiable is tagged
`UNVERIFIED` or omitted. **A thin true document beats a thick maybe-true
one** — these files start minimal and grow only with evidence.

## AGENTS.md — hard budget: under 150 lines

Loaded every session; every line must change agent behavior. If the repo's
tooling expects `CLAUDE.md` or `AGENT.md`, use that name — never create a
second competing instructions file.

```markdown
# AGENTS.md

<One paragraph: what this system is and does, from the code — not aspiration.>

## Ground rules

<Conventions from Step 3 — only ones with 2+ examples. Each cites two.>
- <Pattern> (e.g. `path/a.ts:12`, `path/b.ts:30`).
- INCONSISTENT: <both sides + citations> — ask the user before adding a third way.

## Gotchas

<Sharp edges found during the deep read and command runs — the things that
WILL bite a fresh agent.>
- <Surprise>: <fact> (`file:line` or "observed running <command>").

## Commands

<Only commands you ran in Step 4, with honest status.>
- Test: `<command>` — passes on clean checkout (<date>)
- Build: `<command>` — UNVERIFIED: <reason>

## How to add a feature

See the exemplar trace in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) —
follow that path, not a generic pattern.

## Where knowledge lives

- Architecture and exemplar trace: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
```

## docs/ARCHITECTURE.md

```markdown
# Architecture

> Generated from source by know-my-repo on <date>. Facts carry citations —
> a citation that no longer matches the code means the fact is stale.

## System overview

<5–10 lines: what it does, major subsystems, where data lives. Diagram if
topology is non-obvious.>

## Components

| Component | Responsibility | Status | Evidence |
|-----------|----------------|--------|----------|
| `src/...` | <one line> | works / half-wired / dead | `file:line` |

## Data flow

<The traced write path AND read path as numbered steps, each naming its file.>

## How a feature is added here (exemplar trace)

<The Step 5 trace: one real, recently-touched feature followed end to end.>
1. Route declared in `<file:line>`
2. Handler `<class>` in `<file:line>` …
3. …storage… → …render…

To add a similar feature, create the same chain: <the file list a newcomer
would create, in order>.

## Conventions in full

<The Step 3 output — everything that didn't fit AGENTS.md's budget.>

## Inconsistencies and sharp edges

<Conflicting patterns (both sides cited) and load-bearing quirks. This
section is the repo's honest self-portrait — do not sand it smooth.>

## Unverified

<Anything asserted by README/comments that you could not confirm, and what
would confirm it.>
```
