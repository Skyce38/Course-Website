# IoT Final — question verification

Nine lessons, 30 questions each: 6 Practice (5 automatic +1 self) and24 Extended (20 automatic +4 self). Total270:225 automatic keys (170 four-option MC,55 numeric) and45 ungraded rubrics. Stable IDs `iot01-*` through `iot09-*`; each key references a real lesson heading. All questions/solutions are authored supplementary study material, not official examination answers.

Difficulty is recorded for all270 in the verification ledger; the unchanged runtime marks the six base questions as `original` and the extension uses easy/medium/hard. Four distinct options per MC question, explicit numeric units/assumptions/tolerances and five self-assessment topics per lesson. Self-assessments are excluded from graded scores. Existing contracts, namespaces, original bank revisions and historical archives remain unchanged.

## Evidence

[Source ledger](iot-final-source-coverage.md) identifies W09/A09/A10/A11/W12/S12/B precisely. `scripts/iot-verification.json` records all225 keys, explanations, official technical URLs and independent numeric/compiler inputs. Reference-review keys are document-reviewed, not falsely described as executable. Rubrics require explanations and limitations instead of pretending to auto-grade free code. Trace tests exercise range boundaries, timeout/retrigger/startup/rollover and display state.

All choice distractors are inspected as false under the stated assumptions. The exact/near-duplicate audit covers the new banks without treating a minor number substitution as new educational content. Source-specific scenario contrasts are documented where necessary.

Question keys are delivered client-side, as in existing Practice/Exam. This is a revision tool, not a secure proctored test. Static no-JavaScript answers remain available through existing details fallbacks; JavaScript mode shows feedback after submission.

## Final release checks

All270 IDs are unique; each lesson has5 real topics,30 questions,6 Practice IDs and5 ungraded self-assessments.55 numeric keys =28 exact/decimal oracles +27 compiler-evaluated expressions. The source-reviewed ledger has225 automatic entries plus45 separately classified rubric entries, including difficulty. Browser runs submitted all54 Practice questions and all225 automatically graded Exam questions across the nine readers, with incorrect-answer/retry/review/scoring checks and all nine no-JS fallbacks. Explanations are supplementary, not official answer keys.

Repeated distance/sample/threshold/boolean templates and literal-input-copy questions were replaced during review. One lexical near-pair remains explicitly justified in `iot-reviewed-pairs.json`: configuring an output with `pinMode` versus acquiring an input with `digitalRead` tests distinct API operations. Shared contracts and all37 previous banks/revisions remain byte-equivalent after line-ending normalization; source PDFs are checked as raw bytes.
