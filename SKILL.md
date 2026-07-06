---
name: know-my-repo
description: >-
  Onboards an agent onto an unfamiliar repository from zero knowledge: deep
  parallel read of the codebase, extraction of the repo's actual conventions
  (each proven by at least two examples), verified build/test/run commands,
  an end-to-end exemplar trace of how a feature is really added, then
  generates the initial knowledge set — AGENTS.md and docs/ARCHITECTURE.md —
  with every fact cited. Nothing is deleted. Use on repositories with no (or
  trivial) agent knowledge files, when the user asks to onboard, initialize,
  understand, or learn a repo, generate a CLAUDE.md/AGENTS.md from scratch,
  or mentions know-my-repo or /know-my-repo.
license: MIT
argument-hint: "[project-root]"
---

# Know My Repo

Day one on a codebase you have never seen. No docs, no notes, no memory —
just code. This skill turns that into a knowledge set a future agent can
load and be productive immediately, built the only honest way: **by reading
the code, running the commands, and citing everything.**

Sibling skills: this one creates knowledge where there is none. If rotten
knowledge files already exist, recommend **clean-slate** (reset with backup
gate) instead of writing competing docs next to them.

## The Prime Directive (family rule)

> **No claim without evidence.** Every statement in the generated docs
> carries a `file:line` citation, a command you actually ran, or an explicit
> `UNVERIFIED` tag. A convention is only a convention with **two or more
> examples and no counterexample** — otherwise report it as an inconsistency.

## Progress checklist

Copy this into your response and check items off:

```
Know My Repo Progress:
- [ ] Step 1: Recon — stack, size, existing knowledge files checked
- [ ] Step 2: Deep read — structure, data flow, wiring, git trajectory (parallel)
- [ ] Step 3: Conventions — extracted with 2+ examples each; inconsistencies listed
- [ ] Step 4: Commands — build/test/lint verified by running them
- [ ] Step 5: Exemplar trace — one real feature followed end to end
- [ ] Step 6: Write — AGENTS.md + docs/ARCHITECTURE.md, fully cited
- [ ] Step 7: Cold-start test — docs answer the newcomer questions
- [ ] Step 8: Report
```

## Step 1 — Recon

- Detect stack and size: manifests (`package.json`, `composer.json`,
  `go.mod`, …), lockfiles, top-level layout, file count.
- Check for existing knowledge files (`CLAUDE.md`, `AGENTS.md`,
  `.cursorrules`, `docs/ARCHITECTURE.md`, …):
  - **None or trivial** (< ~20 meaningful lines): proceed; merge the trivial
    content in later.
  - **Substantial:** stop and ask ONE question — update what exists, or
    reset via clean-slate? Recommended answer included. Never write
    competing docs beside living ones.

## Step 2 — Deep read

Read the repo like deep-plan Phase 1. If exploration subagents are
available, fan out **in parallel with distinct scopes**; otherwise cover the
same scopes sequentially — see
[references/exploration-guide.md](references/exploration-guide.md):

1. Structure & entry points
2. Data flow (write path AND read path, end to end)
3. Wiring (DI, config, registration, env)
4. Tests & quality gates
5. Git trajectory (~30 commits: what is the team building toward?)

Classify components **works / half-wired / dead**, each with a proving file
path. Merge subagent reports and spot-check surprising claims yourself
before accepting them.

## Step 3 — Extract conventions

Conventions are what make generated code look native. Extract them with
evidence per [references/conventions-guide.md](references/conventions-guide.md):
naming, module boundaries, error handling, state, styling, test patterns.
**Rule: 2+ examples = convention; 1 example = observation; conflicting
examples = inconsistency (report it, do not pick a winner silently).**

## Step 4 — Verify the commands

Find the build / test / lint / run commands (manifests, CI config, Makefile)
and **run the safe ones** (read-only: build, test, lint — not deploy, not
migrate). Record real results: a test suite that fails on a clean checkout
is a first-class finding, not an embarrassment to hide. Commands you could
not run are listed as `UNVERIFIED` with the reason.

## Step 5 — Exemplar trace

The single most useful artifact for a newcomer: pick ONE representative,
recently-touched feature and trace it end to end — route/entry → handler →
service → storage → output/render, naming every file on the path. This
becomes the "How to add a feature here" section: the repo's own pattern,
proven by its own code, not a generic tutorial.

## Step 6 — Write the knowledge set

Follow [references/knowledge-templates.md](references/knowledge-templates.md):

- `AGENTS.md` — ground rules from real conventions, verified commands,
  observed gotchas. **Under 150 lines.** (Write to `CLAUDE.md`/`AGENT.md`
  instead if the repo's tooling expects that name.)
- `docs/ARCHITECTURE.md` — overview, component table with status, data flow,
  the exemplar trace, inconsistencies and sharp edges.

Do NOT generate a ROADMAP.md — direction is the user's call, not the
code's. If half-wired components suggest unfinished intent, list them in
the report and offer deep-plan as the follow-up.

## Step 7 — Cold-start test

Re-read only the files you just wrote, as if you were a fresh agent, and
answer: Where does X live? How do I run the tests? How do I add a feature
like Y? What will surprise me? Every answer you cannot get from the docs
alone is a gap — fix it before presenting.

## Step 8 — Report

- **Created:** the files, one line each.
- **Key findings:** stack, architecture in one paragraph, top 3 sharp edges.
- **Inconsistencies:** conventions that conflict (the team may want to pick one).
- **UNVERIFIED:** what you could not confirm and why.
- **Suggested follow-up:** half-wired components worth a deep-plan run.
