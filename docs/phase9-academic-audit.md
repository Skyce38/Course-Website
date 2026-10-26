# Phase 9 — Academic correctness audit

## Scope and evidence rules

Audit base: `a4b2d916f9531db3fa171bfe37f0fa0486e52fbf` (main including PR #20). Started 2026-10-26. This is an ongoing audit, **not a certificate that the complete curriculum is verified**.

Inventory: 25 registered Markdown lessons (13 OOP, 12 AI); 150 original practice questions plus 600 extended questions, 750 unique questions. A question is one review unit; a lesson section, code example, formula, table or worked solution is a separate content unit. Passing a schema test does not verify its answer or explanation.

Evidence layers are recorded separately: (A) original teaching source and physical PDF page / worksheet cell / code line; (B) independent authoritative reference and section; (C) independently reproduced computation or execution; (D) visible website explanation; (E) assessment prompt, alternatives, answer, explanation and rubric. A repeated explanation or test asserting the same hard-coded answer is not independent evidence.

Statuses: **VERIFIED** = specified claim inspected and independently supported; **CORRECTED** = confirmed defect corrected and retested; **NOT VERIFIED** = incomplete or unresolved verification; **SOURCE UNAVAILABLE** = required original evidence missing. These statuses apply to specified units, not automatically to the whole lesson. Source coverage alone is not proof of correctness.

Severity: Critical = incorrect answer / foundational misconception; High = wrong formula, algorithm, output or materially misleading explanation; Medium = missing important qualification; Low = terminology, presentation or attribution.

## Protection and reproducibility

- Separate branch/worktree `codex/phase9-academic-correctness`; no reset, stash, rebase or edits in the other 18 worktrees. Their HEADs, indexes, diffs and nonignored dirty files were snapshotted outside Git before edits.
- The local-only `FinalSource/` originals are available in the primary checkout. All original files and the 15 tracked PDFs were SHA-256 snapshotted outside Git (267 file entries including local derivatives). Do not publish those private files, personal filenames, source extractions or screenshots.
- Existing [AI inventory](ai-source-coverage.md) supplies source aliases and locators, not independent correctness. S01 is the tracked introduction PDF; S02–S11 and assignment/workbook sources are local-only. Figures absent from L01/L02 remain unavailable unless actually found.
- Runtime: CPython 3.12.14 (64-bit Windows). Scientific reference packages are reused from an existing external cache, not added as website dependencies. Versions and exact execution results are recorded with the relevant checks.
- Original lesson IDs, URLs, explicit anchors and study-storage formats must remain stable. Semantic question changes require historical-context protection; no silent regrading, clearing storage or discarding old attempts.

## Review progress

| Stage | Scope | Status |
|---|---|---|
| A | Inventory, protection and methodology | Inventory captured; source inspection in progress |
| B | AI Final mathematics, algorithms, code and original figures | NOT VERIFIED — review in progress |
| C | OOP data structures | NOT VERIFIED |
| D | OOP foundations | NOT VERIFIED |
| E | AI foundations and search | NOT VERIFIED |
| F | All 750 question prompts, choices, answers, explanations and rubrics | NOT VERIFIED |
| G | Saved-data compatibility and browser regression | NOT VERIFIED |
| H | Final integrity review and PR | Not ready |

Finding details: [corrections](phase9-corrections.md), [unverified claims](phase9-unverified-claims.md). Counts will be updated from actual review records, never inferred from test success.
