# State file

`.know-my-repo/state.md` in the project root keeps the run's working memory
on disk, so an interrupted or oversized read can resume in a fresh session.
Scout findings go in `.know-my-repo/findings/<scope>.md`. It is working
memory: it is not committed, the generated docs must stand alone without
it, and it is deleted (or left, headless) when the run finishes.

## Template

```markdown
# know-my-repo state

step: <0–8 — last completed step; 0 = created during Step 1, resume at Step 1; 8 = finished>
tier: Light | Standard | Heavy
root: <absolute project root>
date: <YYYY-MM-DD>
history: <commit checked, or UNVERIFIED: no git history>

## Newcomer Questions
| # | Question | Status | Answer + citation |
|---|----------|--------|-------------------|

## Components
| Component | works / half-wired / dead | Evidence (path:line) |
|-----------|---------------------------|----------------------|

## Commands
| Command | Result | Evidence |
|---------|--------|----------|

## Corrections
- CORRECTED: <old belief> → <new fact> (`file:line`)

## Notes
- <preflight findings, scaffolding-only verdicts, anything without a home above>

## Cold-reader log
| Check | Result | Notes |
|-------|--------|-------|
```

## Keeping it

- Update at each step exit: Light after Steps 3 and 5 is enough; Standard
  after every step; Heavy per completed scope.
- One fact per line plus its citation — no pasted code, no reminders or
  cautions (the next session re-reads them as instructions).
- A superseded fact is replaced in place and its old belief added to
  Corrections.
- "None found" is a valid Corrections entry only with the checks listed —
  an empty ledger and an unexamined one must not look alike.

## Resuming

A session that finds an existing state file:

1. Reads it and notes `step:` and `tier:`. If `step:` is 8 the run finished —
   treat a resume request as a verification pass: re-run the cold-reader
   check against the existing docs rather than redoing the read. If the user
   wants a fresh run, archive or delete the state file first.
2. Re-verifies citations whose files changed since `date:` —
   `git log --since=<date> --name-only` over the cited paths; without git,
   or with few citations, re-open them all. A citation that no longer
   matches is fixed and logged as a correction; if the fact itself changed,
   redo the part of the step that produced it.
3. Checks for drift beyond citations: `git log --since=<date> --name-only`
   over manifests and top-level layout. New packages, renamed dirs, or a
   new framework means the tier and Newcomer Questions may be stale —
   re-run the Step 1 sizing check and append any new questions.
4. Tells the user in one line where it resumes, then continues at the next
   step without redoing answered Newcomer Questions.
