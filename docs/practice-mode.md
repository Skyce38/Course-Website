# Practice Mode

All 25 registered AI/OOP readers have practice sidecars. Phase 6B adds 21 sets to the original four-pilot MVP (Stack, Basic Sorting, KNN and Decision Tree). The four pilot sidecars, IDs/answers/revisions and shared component are unchanged. Existing Markdown, solved exercises, resource IDs and catalog metadata remain unchanged.

Every set has six author-created questions: five automatically graded and one self-assessment. Formats follow the subject; conceptual lessons are not forced to have numeric questions. These are adaptations/new practice grounded in the linked verified lesson, not official exam questions or answer keys. Thai lesson/practice content stays Thai when the shared interface switches to English. See the original lesson source sections for attribution and lecturer/material limitations, plus the [expansion coverage ledger](practice-expansion-coverage.md).

| Course | Lessons | Multiple-choice | Numeric | Self-assessment | Total |
|---|---:|---:|---:|---:|---:|
| OOP | 13 | 48 | 17 | 13 | 78 |
| AI | 12 | 31 | 29 | 12 | 72 |
| Total | 25 | 79 | 46 | 25 | 150 |

## Authoring and build

- Add `courses/<course>/practice/<registered-lesson-slug>.json` only for an existing registered Markdown lesson. The builder checks its `lesson` ID against the source metadata.
- Schema: `version: 1`, positive integer `revision`, `lesson`, Thai `title` and `questions`. Question fields: stable `id`, `type` (`choice`, `numeric`, `self`), `prompt`, existing heading ID `reference`, and `explanation`. Choice questions require unique `{id,text}` choices and one answer ID. Numeric questions require a finite `answer`, nonnegative `absoluteTolerance` and `relativeTolerance`. Self questions require a rubric and have no answer key.
- `assets/practice-contract.js` validates data at build and runtime. Unknown fields, duplicate IDs, invalid keys/tolerances and missing heading references fail the build. Content is escaped text, never executable HTML/Python. No remote runtime service or new dependency is used.
- The builder appends practice outside the existing lesson article, adds a TOC entry and loads practice assets only for readers with sidecars (all 25 registered readers now; manually maintained readers/legacy quiz pages remain unchanged). Static questions, choices, solutions and rubrics are usable through native details elements without JavaScript. Invalid runtime data leaves that fallback intact.
- Bump the sidecar revision whenever questions, keys, tolerances or rubrics change; update independent checks at the same time. Do not repurpose question IDs silently. Shared UI cache versions are coordinated as `phase6-practice-1`; vendored math assets retain their own version.

## Scoring and interaction

Score is `correct / automatically graded total`; incorrect and unsubmitted counts are explicit. Self-assessment is excluded and has its own count/rating. Empty/invalid numeric answers are not scored as incorrect. Changing a submitted draft marks it unsubmitted until checked again. Explanations appear immediately after submission. Inputs, buttons and feedback regions are mounted once; focus is preserved while values/text/visibility update. Numbered question selection, Previous/Next, retry and review controls are keyboard accessible; question position and feedback use polite live regions.

Numeric parsing accepts decimal/scientific notation, finite magnitudes up to `1e12`, and no units, commas, hexadecimal, NaN, infinity or nonzero underflow. Exact validation uses JavaScript numeric equality. Tolerant validation uses `abs(user-answer) <= absoluteTolerance + relativeTolerance*abs(answer)` with a small magnitude-scaled IEEE-754 boundary allowance. This is floating-point validation, not symbolic algebra or arbitrary-precision arithmetic. Current tolerant questions use absolute `1e-6`, relative `0`; integer questions require exact values. No code/free-text grading is claimed.

Review Incorrect Answers captures the currently submitted wrong auto-graded IDs, keeping that review set stable while retrying. Exit review to return to every question. A completed automatic set can be explicitly saved once; retry/edit permits a new attempt. Restart clears the current run and keeps attempt history. Practice never marks a lesson complete.

## Local data

One key per lesson: `skyce-learning-practice-v1:<stable-lesson-id>`. Payload includes schema/revision, current question, review IDs, drafts/submission flags/self-ratings and the latest ten completed attempts. Scores are derived from current answer metadata; stored correctness/score claims are ignored. Incomplete or malformed attempt records are discarded.

Malformed/older data recovers to an empty practice session only. A newer stored revision is not overwritten by an older open reader; it can continue in memory until refreshed. Storage denial/quota errors leave the component usable in the current tab and display a warning. No reading/bookmark/preferences/legacy quiz key is renamed, migrated or cleared.

Same-origin storage events update other tabs without writing back or looping. If a control is focused, keep its current question/review context; an actively edited answer/self-rating stays local until the next explicit interaction. Other answers and history update. Concurrent changes to the same question use this best-effort local-edit/last-write policy, not transactional cloud synchronization.

## Verification

- `node scripts/build.cjs` and `node scripts/check.cjs` include contract, safe rendering, numeric boundaries, malformed/stale state, derived scoring, attempt limits, conditional assets and isolated deterministic build checks.
- `python scripts/check-practice-answers.py` uses only the standard library: independent Stack/Postfix/factorial, inversion and sorting traces, one-hot/ranking/distance/accuracy, entropy/Information Gain and Decision Tree rule checks. Literal datasets are read safely from the verified KNN/Decision Tree lessons; their library examples are not executed.
- `python scripts/check-practice-expansion.py --all` checks all 105 new automatic keys with executable arithmetic/algorithm/actual-Python oracles and separately identified source-reviewed conceptual propositions; `--stage A/B/C/D` supports scoped checks. The 21 new rubric questions are intentionally ungraded. `node scripts/check-practice.cjs` enforces registered coverage, globally unique question IDs, safe real references and five automatic/one self-assessment per set.
- Optional browser test: serve the checkout under `/Course-Website/`, then run `STUDY_BASE_URL=http://127.0.0.1:8779/Course-Website/ node scripts/check-practice-browser.cjs` with an existing Playwright installation (or `PLAYWRIGHT_MODULE` pointing to it). Tests cover all pilots, submission/score/retry/review/self-assessment/history, refresh/reopen, malformed/stale data, real cross-tab events, storage read/write denial, focus, keyboard, Classic/Modern, TH/EN, Light/Dark, palettes, 1440/390/320px and no-JavaScript fallback. Optional `PRACTICE_SCREENSHOTS` writes captures to a caller-selected directory outside Git.
- Expansion browser checks: point the same `STUDY_BASE_URL` at the current checkout and run `node scripts/check-practice-expansion-browser.cjs`. It checks all 21 new sets once for runtime/content integrity, runs deeper interaction/resume/review/score/numeric-boundary/no-JS checks on one representative per stage, tests cross-tab radio focus on a conceptual set and verifies that all four seeded pilot-attempt payloads remain byte-identical. This avoids repeating the full shared-component matrix for every lesson.

Chrome viewport emulation is the browser validation target. Safari/Firefox, physical devices and formal screen-reader certification are not covered. Answers are intentionally present in client/static content for exam revision; this is not a secure examination system.
