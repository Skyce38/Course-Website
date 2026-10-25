# Extended Exam Bank — compatibility design (Phase 8)

## Boundaries decided before implementation

The 25 original `courses/*/practice/*.json` banks (150 questions, revision 1) and their `skyce-learning-practice-v1:<lesson>` payloads stay byte-for-byte unchanged. They remain the short Study Practice mode. No migration or write to existing practice, bookmarks, reading, completion or legacy quiz namespaces is permitted.

New `courses/<course>/exam/<slug>.json` sidecars contain only additional questions and explicit topic/difficulty/evidence metadata. The build combines them with the six original questions by stable ID, validates them using the existing PracticeContract, checks real heading references and escapes static fallback content. Original questions appear once in the extended bank; they are not counted twice in the published inventory. Question IDs are stable within a bank and remain independent of session order.

Topic Practice selects a configured topic; Mock Exam selects 10, 20, 30 or all available questions without replacement. This is revision practice with immediate explanations, not a secure examination. Answers are necessarily shipped to the browser. Self-assessments are never automatically scored.

## Shared component and isolated data

Expose the existing practice component as a mount/destroy API with optional storage key and DOM ID prefix. Its default bootstrap, schema and grading remain unchanged. The new exam coordinator chooses a validated subset and passes it to that component; no second numeric parser or grader is introduced. Controls remain mounted through answer/theme/language changes.

New session configuration uses `skyce-learning-exam-config-v1:<lesson>` with bank revision, explicit selected question IDs and a random session token. Each run uses `skyce-learning-exam-v1:<lesson>:<token>`. Keep at most ten selectable exam sessions per lesson; each run reuses the existing ten-attempt limit. Restore the same IDs/order on refresh and reopening. Validate tokens, IDs, revisions, counts, mode and topic before reading a run. A newer unsupported configuration is not overwritten. Invalid data falls back with a visible notice; denied storage remains usable in memory. Original practice keys are never consulted for writes or deleted.

New mock sessions require an explicit action; changing a selector does not discard the current run. Previous sessions can be reopened. Cross-tab configuration changes notify the user without replacing the active exam; per-run answer updates follow the shared component's focus-preserving policy. Concurrent edits remain local-storage last-write/best-effort, not transactions.

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
