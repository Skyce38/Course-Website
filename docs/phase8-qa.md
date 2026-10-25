# Phase 8 — release QA

Base: `ba2ac2e244c8c447fc3c8f2b6c502f657c56dfc5`; latest main was fetched again before release review. Both exam expansion and generated-reader polish are implemented. No merge or deployment is performed by this branch.

## Inventory and content

| Course | Lessons | Original | New | Full bank |
|---|---:|---:|---:|---:|
| OOP | 13 | 78 | 312 | 390 |
| AI | 12 | 72 | 288 | 360 |
| Total | 25 | 150 | 600 | 750 |

Unique types: 460 choice, 165 numeric, 125 ungraded self-assessments. Every full bank has 30 questions; the original short practice remains six. New-bank verification: **127 independently executable arithmetic/algorithm/Python-behavior checks, 373 separately source-reviewed keys, 100 reviewed rubrics**. Source review is not described as automated mathematical proof. Difficulty is an authored heuristic, not a psychometrically validated scale: 142 easy, 357 medium, 101 hard; the original150 are not reclassified. See the [per-question ledger](phase8-exam-verification.md) and [coverage audit](phase8-exam-coverage.md).

## Executed checks

| Check | Final result |
|---|---|
| `node scripts/build.cjs`, repeated output hashes | PASS — all25 generated readers and catalog deterministic |
| `node scripts/check.cjs` (includes new reading/exam checks) | PASS — schemas, real references, preserved content, asset paths/cache versions, bilingual keys, storage/scoring boundaries, injection/replacement-token escaping, exact/template duplicate rejection and reviewed near-duplicates |
| `check-practice-answers.py`, `check-practice-expansion.py --all`, `check-exam-answers.py` | PASS — original keys retained and all new verification methods accounted for |
| `check-oop-foundations.py`, `check-oop-data-structures.py` | PASS — unchanged lesson code/exercises, array/queue/stack/hash reference operations, sorting traces/stability and ownership/ABC/MRO |
| `check-ai-search.py`, `check-ai-regression.py`, `check-ai-knn.py`, `check-ai-naive-bayes.py`, `check-ai-final-stage-{b,c,d,e}.py` | PASS — graph/OLS/distance/NB/linkage/K-Means/perceptron/gradient/CNN oracles. Existing cached offline scientific packages reused; no installation or runtime dependency added |
| `node scripts/check-exam-browser.cjs` | PASS — all25 runtime banks; topic and mock10/20/30/full; correct/wrong/invalid/boundary answers, explanations/scores/retry/review/self/restart; refresh/reopen/cross-tab/future/corrupt/denied storage; bounded histories and copy controls |
| Original practice browser suites | PASS — original15-session pilot matrix and21-set expansion checks, including byte-identical seeded original attempts |
| `node scripts/check-sync-focus-browser.cjs` | PASS —50 controlled success/failure/refresh/focus/routing cases |
| `node scripts/check-reading-browser.cjs` | PASS —24 large-font/narrow-column cases and6 keyboard TOC cases; localized table regions, active headings and actual internal keyboard scrolling of long formulas/code |
| Existing focused HTML/study/PDF integration checks | PASS — bookmarks/completion/history/Continue Reading/exact resume/reset, Back/Forward, search/categories/sync counts, Linked List stepper, PDF page/zoom/scroll/download/native fallback |
| Original protected files | PASS —15 tracked PDFs byte-identical, original25 banks and programs/equations/tables/solutions/explicit anchors unchanged;17 other worktrees/indexes/dirty files unchanged |

Browser environment: isolated desktop Chrome profiles, 1440/390/320 viewport emulation; representative Classic/Modern, TH/EN, Light/Dark, all six palettes and Custom. No personal browser storage was accessed. GitHub synchronization uses deterministic tree fixtures. No unexpected console/runtime errors, failed site assets or horizontal **page** overflow in final runs. Long code/math/tables intentionally scroll internally. Initial local-server backlog failures were environmental; final checks used a quiet threaded server with a larger request queue.

## Visual review

48 unique before/after reader captures (eight surfaces at three widths), plus six exam-introduction/feedback views, stored outside Git. Reviewed comparisons for Classes/Objects, Stack, Basic Sorting, Regression, Naive Bayes, CNN, long Hash Table code and KNN tables. Paragraph boundaries and joined terminology are clearer; heading and list rhythm is more compact; original layouts retain their shells. Final mobile exam controls hide irrelevant selectors and restore the saved mode/count; input/submission focus and difficulty labels remain stable. No clipped controls or page overflow was observed. Screenshots are QA artifacts, not published site assets.

## Honest limits

- Safari, Firefox, physical devices and formal assistive-technology certification: **NOT RUN**.
- Optional original-workbook/full300-row source audits were not repeated; existing source coverage was reused. No new dataset or source performance claim was introduced. Neural Training Lab remains source-limited; missing figures/settings and open lecturer questions are not invented.
- Exam answers are client-side; immediate feedback/mock sampling is revision practice, not a secure/timed exam. Self-assessments are ungraded.
- Storage is local/best-effort, with ten selectable exam sessions and ten attempts per run. A stale configuration tab must reload before changing session lists; its current answers remain usable. No original practice/study migration or schema change.

PR readiness: **READY for user review**, subject to the stated browser/source limits. No automatic merge/deployment.
