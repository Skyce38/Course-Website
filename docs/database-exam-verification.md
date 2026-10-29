# Database Practice and Extended Exam verification

Ten authored banks contain**300 unique questions:240 multiple-choice,10 exact numeric,row-count questions and50 rubric-based self-assessments**. Each lesson has6 Practice questions (5 graded+1 self) and24 additional Exam questions (20 graded+4 self). Thus250 are automatically graded; self-assessments never contribute to graded accuracy. They are educational practice, not official lecturer examination questions or answer keys.

## Traceability and key review

[The300-entry ledger](../scripts/database-verification.json) records stable IDs, real section anchors, difficulty, source scope, reviewed conclusions, explanations and evidence. PracticeContract intentionally rejects extra fields: its schema stays unchanged, so difficulty/evidence for the original six live in the separate ledger. Extended entries use the existing difficulty/verification contract. ExamContract's `original` label means “from Practice”, not “official exam”.

All prompts/options/keys/explanations/rubrics were reviewed against the source-grounded lessons and technical references listed in [academic verification](database-academic-verification.md). SQL/row-count outcomes additionally use independent Python row oracles and real engine execution; see `model` entries and `check-database-sql.py`. Evidence paragraph prefixes provide topic traceability; they are **not** falsely presented as independent proof of every answer. Runtime grading tests prove contract behavior, not academic correctness by themselves.

The10 numeric questions require integer counts and use zero absolute/relative tolerance. They cover exact fixture table counts, owner-scoped fetched rows, INNER/LEFT/filtered JOIN rows and item quantities. Non-numeric security/workflow concepts use substantive choices rather than contrived arithmetic. Questions do not inflate the inventory by cloning prompts with changed constants. The existing near-duplicate scanner checks the actual question text after removing the repeated authorship disclaimer.

Each lesson also retains prose worked problems and solutions; these are instructional content, not additional questions counted in the300. Query assumptions specify Campus versus the reduced slide example. `?` is described as a prepared API placeholder; it is not executable plain SQL in phpMyAdmin without binding.

## Regression checks

- `node scripts/check-database.cjs`:300 unique IDs, reviewed keys/rubrics, real anchors, section evidence, 10/30/6/24 structure, 250/50 separation, exact numeric boundaries, safe SQL/PHP viewers, generated readers and read-only fifth-course Insights.
- `node scripts/check-exam.cjs`:all56 banks/1680 questions, distractor uniqueness, no exact/numeric-template duplicates, reviewed similarities, topic membership, shuffled sessions, scores and malformed/stale data.
- `node scripts/check-practice.cjs` and `check-phase9.cjs`:existing saved attempts, revision safeguards and historical archives.
- `scripts/check-database-sql.py --mariadb=<private test report>`:independent modeled keys compared with actual MariaDB and SQLite results; PHP fetch count requires the executed helper report.
- `scripts/check-database-browser.cjs`:actual answer submission, explanations/scores, review/retry, refresh, self-rating exclusion, keyboard focus, code copy and no-JS fallbacks. Execution outcomes are in [QA](database-qa.md).

## Compatibility

All prior1380 questions and their IDs/revisions/answers are preserved byte-for-byte after newline normalization. No Practice/Exam/Insights/Study storage schema or namespace changes. New banks begin revision1 with new `db01-…db10-…` IDs; old attempts cannot be reinterpreted as these questions. Archived revision1 AI/OOP answers remain excluded from current grading under existing rules. No dashboard writes or migrations are introduced.
