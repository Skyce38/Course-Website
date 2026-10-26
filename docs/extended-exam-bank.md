# Extended Exam Bank — compatibility design (Phase 8)

## Boundaries decided before implementation

The 25 original `courses/*/practice/*.json` banks (150 questions, revision 1) and their `skyce-learning-practice-v1:<lesson>` payloads stay byte-for-byte unchanged. They remain the short Study Practice mode. No migration or write to existing practice, bookmarks, reading, completion or legacy quiz namespaces is permitted.

New `courses/<course>/exam/<slug>.json` sidecars contain only additional questions and explicit topic/difficulty/evidence metadata. The build combines them with the six original questions by stable ID, validates them using the existing PracticeContract, checks real heading references and escapes static fallback content. Original questions appear once in the extended bank; they are not counted twice in the published inventory. Question IDs are stable within a bank and remain independent of session order.

Topic Practice selects a configured topic; Mock Exam selects 10, 20, 30 or all available questions without replacement. This is revision practice with immediate explanations, not a secure examination. Answers are necessarily shipped to the browser. Self-assessments are never automatically scored.

## Shared component and isolated data

Expose the existing practice component as a mount/destroy API with optional storage key and DOM ID prefix. Its default bootstrap, schema and grading remain unchanged. The new exam coordinator chooses a validated subset and passes it to that component; no second numeric parser or grader is introduced. Controls remain mounted through answer/theme/language changes.

New session configuration uses `skyce-learning-exam-config-v1:<lesson>` with bank revision, explicit selected question IDs and a random session token. Each run uses `skyce-learning-exam-v1:<lesson>:<token>`. Keep at most ten selectable exam sessions per lesson **per bank revision**; each run reuses the existing ten-attempt limit. Restore the same IDs/order on refresh and reopening. Validate tokens, IDs, revisions, counts, mode and topic before reading a run. A newer unsupported configuration is not overwritten. Invalid data falls back with a visible notice; denied storage remains usable in memory. Original practice keys are never consulted for writes or deleted.

New mock sessions require an explicit action; changing a selector does not discard the current run. Previous sessions can be reopened. Cross-tab configuration changes notify the user without replacing the active exam. Starting/reopening sessions then requires a reload, so a stale tab cannot overwrite the newer list. Controls retain focus with `aria-disabled` and guarded handlers; answering the active run can continue. The same guard checks the live configuration before writing, including changes whose storage event has not arrived. Per-run answer updates follow the shared component's focus-preserving policy. Concurrent edits remain local-storage last-write/best-effort, not transactions.

## Content and verification

All new questions are authored revision exercises, not lecturer questions or official keys. Evidence points to the existing Thai lesson and its actual heading; source scope/uncertainty stays with the lesson and existing curriculum inventories. Do not infer exam weightings or missing neural-lab settings. Conceptual assertions require explicit source review; arithmetic/code questions require separate executable checks where feasible. The ledger records which method was used rather than calling all checks executable proof.

Reading edits are semantic Markdown prose edits plus CSS scoped to generated `.lesson-reader` pages. Preserve explicit heading IDs, code fences/programs, equations, tables and original solved exercises. Manual readers and PDF content are outside this redesign. Font-size and reading-width preferences remain authoritative.

## Validation checkpoints

1. Curriculum/objective and formatting audit, architecture recorded.
2. Generated-reader typography and reviewed Markdown edits; original code/math/anchors checked against main.
3. Reusable exam coordinator and shared component compatibility tests.
4. New AI/OOP banks and per-question evidence/oracles; coverage and duplicate review.
5. Build twice, original practice/independent checks, sync focus, exam/browser/storage/reading regressions, before/after screenshots.

Only after both content expansion and reading polish pass will the branch be pushed for review. No automatic merge/deployment.

## Sidecar and runtime contract

An extension has `version:1`, a positive `revision`, the stable `lesson` ID, unchanged `baseRevision:1`, and an array of new questions. Each new item uses PracticeContract fields plus `difficulty` (`easy`, `medium`, `hard`) and `verification` (`method`, literal lesson `evidence`, optional offline Python `oracle`). Published original items are never copied into or modified by the sidecar. `ExamContract.prepare` strips authoring metadata from browser question data and builds topic titles from real headings. No oracle is executed by or shipped in the generated runtime payload. Static fallback shares the escaped Practice renderer; solutions require opening native details intentionally.

`ExamContract.choose` performs Fisher–Yates sampling without replacement (10/20/30/full) or selects one actual topic. Saved configurations store the selected IDs in display order. `StudyPractice.mount` receives that subset, an exam-only storage key and ID prefix; its returned `destroy` aborts the two global listeners before a different subset mounts. Original question controls, IDs, data and default bootstrap are unchanged. Scores always derive from the current validated subset; rubrics remain ungraded.

Only the latest ten session configurations **of each supported revision** are selectable. On an explicit new session, an evicted current-revision run's exam-only key is removed; archived-revision runs and original study/practice data are never evicted by that new run. Each run keeps ten completed automatic attempts. Empty sessions need only their configuration saved until there is an answer/navigation change. Invalid or stale configurations recover with notice; newer configurations are read-only. This is best-effort local persistence, not unlimited or transactional storage.

### Academic corrections and historical context (Phase 9)

Editorial changes that preserve a question's meaning/key keep its ID/revision. A semantic change instead gets a replacement ID and a new extension revision; keep all unaffected IDs. Before such a change, freeze the complete previous **prepared** bank `{data,topics,difficulty}` in optional sidecar `history` (up to five distinct older revisions of the same lesson, no nested histories). Original Practice banks remain unchanged. `ExamContract.prepare` validates these contexts; no verification oracle/provenance metadata is added to browser questions.

Sessions retain their revision when migrated. Resolve their subset through `ExamContract.sessionBank`, never through the current key alone. Before overwriting an older config, preserve its original bytes once in `skyce-learning-exam-config-history-v1:<lesson>:r<revision>`; abort the persisted config update if backup storage fails. Historical run payloads remain in their original keys. TH/EN notices identify archived questions/keys/scores as historical context, not current guidance; a new run uses the corrected bank. Unknown contexts cannot be reconstructed or silently regraded. See [P9-DATA-001 and the three corrected questions](phase9-corrections.md).

## Reproduction

Run `node scripts/build.cjs`, `node scripts/check.cjs`, both original Python answer checks and `python scripts/check-exam-answers.py`. `node scripts/exam-report.cjs` deterministically refreshes the inventory/ledger. The raw JSON banks and offline oracles are committed; no temporary authoring script or preview is required to reproduce the build. Optional Playwright: set `PLAYWRIGHT_MODULE` and `STUDY_BASE_URL` then run `node scripts/check-exam-browser.cjs` plus the existing practice/sync-focus suites. No dependency installation is required when using an existing runtime.

Scope limits: no exam timer/security, account/cloud storage, automatic free-form/code grading or inferred mastery percentages. Thai question content remains Thai while the shared interface switches TH/EN. JavaScript is needed for selection/scoring/local persistence; native static questions/solutions and all lesson prose remain readable without it.
