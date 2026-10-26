# Phase 9 — Unverified material and limits

This list records uncertainty; it does not imply the corresponding material is incorrect.

| ID | Evidence / affected material | Status and next check |
|---|---|---|
| P9-U001 | L01 `Assignment/Perceptron.txt` referenced screenshots, training settings/data association | SOURCE UNAVAILABLE for absent screenshots; do not invent training observations or identify D02 as the training set without evidence |
| P9-U002 | L02 `Assignment/Lab Deep Learning.txt` figures 1–4 and answer screenshots | SOURCE UNAVAILABLE for absent figures; preserve source-limited labeling and distinguish reported observations from reproducible results |
| P9-U003 | S01 physical p.7 ChatGPT/Turing-test performance claim | NOT VERIFIED; retain the existing uncertainty; do not convert a lecturer opinion into a verified experimental result |
| P9-U004 | S01 physical p.16 open objective-function question | No official answer established; authored discussion must remain explicitly supplementary |
| P9-U005 | Academic correctness of all unreviewed sections/questions | NOT VERIFIED; previous source-review ledgers and passing tests are useful inputs, not substitutes for this audit |

## Assessment findings awaiting correction integration

- P9-Q001: `oop-python-complexity-basic-sorting-exam-04` asks for Big-O of a constant-work n-iteration loop but offers both O(n) and O(n²). Both are valid upper bounds; the intended linear answer needs an explicit tightest-bound criterion. This is an ambiguity finding, not a failed execution test. Preserve the old question context when integrating a replacement.
- P9-Q002: `artificial-intelligence-final-decision-tree-exam-19` gives child sizes 1 and 3 with entropies 0 and 1. The weighted arithmetic .75 is correct, but a three-record unweighted categorical node cannot have entropy exactly 1 bit. Replace with realizable counts (e.g. 2 and 6) or explicitly defined weights; do not silently reinterpret old question context.

Browser, assistive-technology, implementation/version and numerical limits will be recorded after actual execution. No claim of Safari, Firefox, physical-device or screen-reader testing is made here.
