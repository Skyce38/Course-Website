# Phase 6B validation

Base main: `3647848d170b9a1da50894934ba972607f2ea636`. Results describe this branch, not a deployment.

## Coverage and educational evidence

25/25 registered lessons have one sidecar each: 21 new sets plus the four unchanged pilots. Each has five automatic questions and one three-part self-assessment. Total: 150 questions (79 multiple-choice, 46 numeric, 25 self-assessments). OOP: 13 lessons / 78 questions; AI: 12 lessons / 72 questions. Source anchors, objectives and verification methods are in the [coverage ledger](practice-expansion-coverage.md).

All 105 new automatic keys were checked: 74 use executable arithmetic/algorithm/Python behavior evidence; 31 include separately identified source-reviewed conceptual propositions. The conceptual review is not presented as proof by executing Python. Numeric checks include exact OLS/Fraction arithmetic, Bayesian normalization/smoothing, direct-pair linkage, complete Lloyd iterations/SSE, threshold/bias conventions, centered finite-difference gradients, CNN operators/shapes/parameters, real OOP exceptions/identity/MRO/ABCs and independent graph/grid oracles. The 21 self-assessment rubrics were reviewed without pretending to grade arbitrary explanations/code. The original 20 pilot keys pass their unchanged independent answer assumptions.

Neural Training Lab remains **source-limited**. Missing data/settings, unverified claims, unanswered source questions and unsupported model performance stay explicitly uncertain. Questions/solutions are authored practice, never official exam keys. Existing source attribution remains intact. Final draft polishing adds Thai/technical-term whitespace only; stable IDs, answer values, revisions and original pilot banks do not change.

## Executed checks

| Check | Result |
|---|---|
| Build and repository suite | PASS: `node scripts/build.cjs`, `node scripts/check.cjs`; 25 registered lessons / 49 resources, references/assets, schema, unique question IDs, Thai content, escaping/XSS, scores/state, rich content and existing modules |
| New answer verification | PASS: `python scripts/check-practice-expansion.py --all` plus scoped A/B/C/D checks before local stage commits |
| Pilot answer verification | PASS: `python scripts/check-practice-answers.py`; four original banks preserved |
| Existing OOP/search checks | PASS: foundations and data-structure Python checks, including 3,200 array and 3,200 hash operations, 200 sorting datasets, independent queue/stack oracles; AI Search checks include 160 graph comparisons |
| Deterministic output | PASS: two complete builds produce byte-identical catalog, homepage and all reader outputs |
| New browser content | PASS: all 21 new readers load current JSON exactly, six questions, valid references and correct first submission, without overflow |
| Representative new practice | PASS: Regression, Queue, Inheritance/MRO and AI Foundations; correct/incorrect/numeric-invalid/tolerance-boundary answers, review/retry/restart, self-exclusion, saved attempts, refresh/reopen, 1440/390/320px, Classic/Modern, TH/EN, Light/Dark and no-JS fallback |
| Cross-tab and old attempts | PASS: real storage events on a conceptual set preserve the active radio draft/focus; all four seeded pilot attempt payloads remain byte-identical after using new sets |
| Existing practice browser suite | PASS: all 15 original pilot/storage/malformed-stale/denied-storage/cross-tab/focus/theme/no-JS sessions |
| Sync keyboard focus | PASS: all 50 existing deterministic cases; serial execution with diagnostic request timeout/progress wrapper outside Git |
| Existing integration | PASS: search/filter/refresh/counts/course navigation, bookmarks/completion/history/Continue Reading/exact resume/reset, AI reader math, Linked List stepper, palettes/SVG/focus, PDF page/zoom/scroll/download/native fallback and Back/Forward |
| Console/network/layout | PASS: no unexpected app errors, missing local assets, obsolete Learning Path requests or horizontal page overflow in final successful browser runs |
| Publication integrity | PASS: 15 original PDFs; all original course Markdown/reader article content; four pilot sidecars; shared runtime/CSS/contracts, catalog/IDs/registry/templates and cache versions unchanged; all 16 protected worktrees retain HEAD/branch/status/index/file hashes |

Chrome/Playwright uses isolated test profiles and controlled GitHub responses. QA scripts/captures and source snapshots stay outside Git. Representative desktop/mobile captures were reviewed; long Thai/English question text received draft-only spacing polish. One initial concurrent local browser run hit a page-global readiness failure; the instrumented serial rerun and final serial suite passed. No website runtime change was made for that runner issue, and this does not establish stress/performance guarantees.

## Limits

Safari, Firefox, physical devices and formal screen-reader certification were not tested. Numeric validation remains the original bounded IEEE-754 exact/tolerance system, not symbolic/code grading. Cross-tab behavior retains the documented best-effort local-edit/last-write policy. Native embedded PDF internal scrolling keeps its existing tracking limitation. No new teaching PDFs/datasets, framework, dependencies, visualizers, runtime features, cache-version changes, Learning Paths, merge or deployment are part of this expansion.
