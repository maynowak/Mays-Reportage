# AGENTS.md — Mays-Reportage

Central **report archive** for all May projects ("Maymilly's Reports"), GPL-3.0.
There is no app code, package manifest, build, test suite, or CI here. Do not invent
build/lint/test commands or add product code without an explicit task.

## Read first

1. `AI_AUDITLOG.md` — binding workflow: execution-log contract, subagent report duty,
   status classes, read-only audit rule.
2. `AI_AUDITINDEX.md` — index of all archived reports plus the recorded HEAD. Headers in
   this archive go stale; verify with `git rev-parse --short HEAD` and refresh it when you
   touch the file.
3. `README.md` (one line) and `LICENSE` (GPL-3.0 — do not relicense).

## Git

- Single branch `main`, single checkout at this path, remote
  `https://github.com/maynowak/Mays-Reportage.git` (HTTPS, account `maynowak`).
- Commit report work as `docs: …`; one commit per task/report is the norm in sibling repos.
- No `.github/workflows`, no hooks — "green" only means you verified it yourself.

## Report contract (from `AI_AUDITLOG.md`)

- Write reports to `docs/reports/<NN>-<SUBWORKING>-<TASK>-EXECUTION_LOG.md`.
  Evidence images live in `docs/reports/assets/<TASK-ID>/`.
- Update the log **continuously after each milestone**, not just at the end. The file is
  the only crash-recovery source; the chat history is not.
- Keep all 16 mandatory points: status; audit date/time; branch + HEAD; scope; completed
  sections; findings; evidence/file references; GREEN/YELLOW/ORANGE/RED/GRAY class;
  Terraform checks actually executed + results; `git status`; files changed (or an explicit
  "no files changed"); open questions; risks; recommended next actions; resume point.
- Reports are written in **German**; task IDs uppercase, status vocabulary as in
  `AI_AUDITLOG.md` (e.g. VERIFIED, BLOCKED, NOT VERIFIED).
- Add one row per report to the `AI_AUDITINDEX.md` table (`Task ID | Report | Status`)
  in the same change.

## Subagents (binding user directive)

- Every subagent prompt **must** state that the subagent delivers a structured report
  following the 16 points above.
- The orchestrator files each subagent report **here**, under `docs/reports/`, and indexes
  it in `AI_AUDITINDEX.md` — including work done in other project checkouts. Do not leave
  the report only in the audited repo.
- Audit tasks are READ-ONLY for the audited code: only write the execution log and index
  here. Never claim PASS/GREEN/VERIFIED without the executed command, its output, and the
  HEAD SHA; otherwise use NOT VERIFIED.

## Gotchas

- Git does not track empty directories: `docs/reports/assets/` only survives via a
  committed file (`.gitkeep`).
- Filenames and index entries are the retrieval key for follow-up tasks — no free-form
  names, no duplicate report files for the same task.
