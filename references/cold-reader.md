# Cold-reader test

Step 7 proves the generated docs work for an agent that was not in the room.
You cannot judge that yourself — you fill the docs' gaps from memory without
noticing — so the test runs at two levels, scaled by tier (SKILL.md,
"Effort triage").

## Level 1 — self-check (every tier)

Re-read only the files you just wrote — `AGENTS.md` (or the repo's chosen
name) and `docs/ARCHITECTURE.md` — as if you were a fresh agent. Answer the
numbered Newcomer Questions from Step 1 using the docs alone. Every question
you cannot answer from the docs is a gap: fix it, or list it under
Unverified with what would confirm it. Do not present until every question
is answered or listed.

## Level 2 — fresh-agent read (Standard/Heavy, when subagents exist)

Spawn ONE new subagent with no conversation history — a fork of this session
will not do, it inherits everything you know. Give it only the two doc paths
and the question list — nothing you learned while writing them:

```
You are a new agent with no context, joining <project root>. Read
AGENTS.md (or <chosen name>) and docs/ARCHITECTURE.md — nothing else yet.

Answer these questions using only those files:
<numbered Newcomer Questions>

For each: the answer, or "not in the docs". Then list every point where you
had to guess, and mark each MATERIAL if a different answer would change
which file you open, a command you run, or an observable result — COSMETIC
otherwise.
```

- **Pass:** every question answered or honestly "not in the docs" (which
  then belongs in the docs' Unverified section), no MATERIAL guess.
- **Fail:** fix the docs and re-run with a NEW reader — at most 2 rounds.
  A guess about something the repo never established is not a docs gap; it
  goes under Unverified, not into the docs as invention.
- Log each round in the state file's Cold-reader log.

On Light, or with no subagent support, Level 1 is the whole test — say so
in the report.

## Mechanical checks

Commands, not judgment calls. All MUST pass before presenting:

1. `wc -l AGENTS.md` → **150 or less.** Over budget = cut informative lines
   until it passes; do not present and apologize.
2. Repo metadata is evidence, not inference: any remote/hosting/author line
   in the docs must match `git remote -v` / git config output exactly.
   **Never construct a GitHub/GitLab URL from the repo's name — that is
   fabrication.** No remote configured = say so.
3. Every "convention" line cites 2+ locations; anything with one citation
   is relabeled *observation* — grep your own output for the word
   "convention" and check each.
4. Proportionality: docs should not dwarf the code (a 500-line app does not
   need 600 lines of architecture doc) — cut repetition, keep facts.
5. Walk the Newcomer Questions by number: every question is either answered
   in the generated docs or listed in the Unverified section. A silently
   dropped question fails the gate.
6. Every Gotcha line carries a `file:line` citation or an "observed running
   `<command>`" note. A gotcha that could be pasted into any repo's docs
   unchanged is deleted, not kept as filler.
7. Every `CORRECTED` ledger entry either appears in the docs (gotcha or
   inconsistency) or is listed in the report as doc-irrelevant — none
   silently dropped.
