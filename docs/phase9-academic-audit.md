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

## Stage B review record (in progress)

Fresh semantic review has read all ten Final lesson sources and all 300 associated original/extended prompts, alternatives, answer keys, explanations and self-assessment rubrics. Numeric/code checks are recorded separately below; this does not certify missing lab observations or every original slide figure.

| Lesson | Independently checked conclusions / method | Original evidence freshly checked |
|---|---|---|
| Regression | exact OLS fractions; centered correlation; units and rounding; MAE/MSE/RMSE; rank and 300-row/8-row distinction; 80 independent OLS cases | S06 pp.6–8,13 images; A03/X07/C02/D03 fingerprints, workbook cells/formulas and 300 rows |
| KNN | ten exact Drug distances/ranking, Buy Hamming-distance oracle, 24 categorical comparisons, ties, encoding and Iris split | S07 pp.3–5 images; X01/X02 duplicate, X03/X04 cells, C01 KNN segment; R8 discrepancy now disclosed |
| Naive Bayes | exact priors/scores/posteriors, smoothing denominators, 78 categorical comparisons and independent Gaussian density checks | S07 p.7 image; X01/X03 counts/formulas, incomplete L3/L6 excluded, C01 NB segment |
| Decision Tree | all source counts/gains, subtree predictions, 80 mutual-information comparisons; no generalization guarantee | S08 pp.6,13–14,16 images; original D01 rows |
| Hierarchical | all source matrix merges and 75 SciPy linkage comparisons; correlation/metric caveats and cut convention | S09 pp.10,14,22,25 images |
| K-Means | exact iteration tables, 40 independent cases, monotone SSE under stated tie/empty policy, qualified elbow | A02 all 15 points; X05 96 distances, 32 assignments and centroid rounds, read-only |
| Perceptron | all 24 sequential rows, 30 array-update comparisons, XOR inequality proof, strict zero threshold, degenerate classifier counterexample | S10 pp.11,14,18 images; X06 all 24 source rows; L01 observations remain limited |
| Backpropagation | 909 central finite-difference gradients / 101 independent losses; sign, old weights, biases and simultaneous updates | S10 p.23 loss image; XOR/remaining source figures still being reconciled |
| Deep Learning overview | affine composition, RNN mapping/shared state, GAN role separation, no invented performance | S11 pp.5,8,10–11 images; original GAN paper and Stanford references |
| CNN | all matrices, exact pooling, 80 SciPy correlations + 48 pooling references; RGB channels/shape/parameters | S11 pp.16,23,25,31 images; source caption inconsistency already correctly handled |

Independent references consulted (2026-10-26): [scikit-learn 1.7 OLS §1.1.1](https://scikit-learn.org/1.7/modules/linear_model.html#ordinary-least-squares), [neighbors §1.6](https://scikit-learn.org/1.7/modules/neighbors.html), [NB §1.9](https://scikit-learn.org/1.7/modules/naive_bayes.html), [trees mathematical formulation](https://scikit-learn.org/1.7/modules/tree.html#mathematical-formulation), [SciPy 1.16 linkage](https://docs.scipy.org/doc/scipy-1.16.0/reference/generated/scipy.cluster.hierarchy.linkage.html), [Stanford CS231n chain rule](https://cs231n.github.io/optimization-2/), [CNN layers](https://cs231n.github.io/convolutional-networks/), [Goodfellow et al., GAN (2014)](https://papers.nips.cc/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html). Numerical execution uses sklearn 1.7.2 / SciPy 1.16.3; online stable/latest defaults are not substituted for that environment.

## Stages C–D review record (in progress)

All 13 OOP lesson sources and their 390 prompts/alternatives/keys/explanations/rubrics have received fresh semantic review. All published Python examples passed the existing independent checks in CPython 3.12.14: 7 foundations/array lessons and 35 solutions, 3200 array reference operations; 5 Final lessons and 30 solutions, 1200 stack + 600 grammar + 240 Fraction postfix + 400 undo cases, 1280 circular + 600 linked-queue + 500 priority operations, 200 sorting datasets and 3200 collision/dict operations. Linked List's two code blocks and 11 declarative traversal states were read; exact-state regression will be recorded in final validation.

Fresh source images so far: Week8 pp.7,11,19,23; Week14 pp.14–15,22,29; Week15 pp.13,15,23,35. Remaining figure reconciliation is not implied by the code tests. Original diagrams/code are evidence of teaching scope, not an answer oracle.

Independent references consulted 2026-10-26: [Python classes §9](https://docs.python.org/3.12/tutorial/classes.html), [data model §3.1](https://docs.python.org/3.12/reference/datamodel.html#objects-values-and-types), [ABC](https://docs.python.org/3.12/library/abc.html), [deque](https://docs.python.org/3.12/library/collections.html#deque-objects), [heap priority notes](https://docs.python.org/3.12/library/heapq.html#priority-queue-implementation-notes), [stable sorting](https://docs.python.org/3.12/howto/sorting.html#sort-stability-and-complex-sorts), [Liskov & Wing 1994, behavioral subtyping §§1–3](https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf), [Open Data Structures, hashing](https://opendatastructures.org/ods-python/5_Hash_Tables.html). Python 3.12 online documentation currently labels patch 3.12.15; execution used 3.12.14. Interface guarantees are distinguished from CPython allocation details.
