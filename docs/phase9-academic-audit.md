# Phase 9 — Academic correctness audit

## Scope and evidence rules

Audit base: `a4b2d916f9531db3fa171bfe37f0fa0486e52fbf` (main including PR #20). Review date: 2026-10-26. This records a completed review and focused corrections, **not a certificate that every source observation or empirical claim is verified**. Outstanding evidence limits remain explicit below.

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
| A | Inventory, protection and methodology | Complete; originals available except specified missing attachments |
| B | AI Final mathematics, algorithms, code and original figures | Reviewed; named calculations independently VERIFIED; lab observations / source-only SSE NOT VERIFIED |
| C | OOP data structures | Reviewed; implementations/oracles VERIFIED; two complexity qualifications CORRECTED |
| D | OOP foundations | Reviewed; Python behavior VERIFIED; class/object terminology CORRECTED |
| E | AI foundations and search | Reviewed; graph/grid/code VERIFIED; historical/agent qualifications CORRECTED; p.7 performance remains NOT VERIFIED |
| F | All 750 question prompts, choices, answers, explanations and rubrics | All reviewed; 3 semantic replacements; execution vs conceptual/rubric review separated below |
| G | Saved-data compatibility and browser regression | PASS for executed Chrome/seeded-data cases; other engines/assistive technology NOT RUN |
| H | Final integrity review and PR | Final build/integrity results recorded below; PR contains verified corrections, not unavailable evidence |

Finding details: [corrections](phase9-corrections.md), [unverified claims](phase9-unverified-claims.md). Counts below distinguish inspection from independent verification.

## Stage B review record

Fresh semantic review has read all ten Final lesson sources and all 300 associated original/extended prompts, alternatives, answer keys, explanations and self-assessment rubrics. Numeric/code checks are recorded separately below; this does not certify missing lab observations or every original slide figure.

| Lesson | Independently checked conclusions / method | Original evidence freshly checked |
|---|---|---|
| Regression | exact OLS fractions; centered correlation; units and rounding; MAE/MSE/RMSE; rank and 300-row/8-row distinction; 80 independent OLS cases | S06 pp.6–8,13 images; A03 p.1 image and enlarged slope formula; X07/C02/D03 fingerprints, workbook cells/formulas and 300 rows |
| KNN | ten exact Drug distances/ranking, Buy Hamming-distance oracle, 24 categorical comparisons, ties, encoding and Iris split | S07 pp.3–5 images; X01/X02 duplicate, X03/X04 cells, C01 KNN segment; R8 discrepancy now disclosed |
| Naive Bayes | exact priors/scores/posteriors, smoothing denominators, 78 categorical comparisons and independent Gaussian density checks | S07 p.7 image; X01/X03 counts/formulas, incomplete L3/L6 excluded, C01 NB segment |
| Decision Tree | all source counts/gains, subtree predictions, 80 mutual-information comparisons; no generalization guarantee | S08 pp.6,13–14,16 images; A01 p.1 table image and original D01 rows |
| Hierarchical | all source matrix merges and 75 SciPy linkage comparisons; correlation/metric caveats and cut convention | S09 pp.10,14,22,25 images |
| K-Means | exact iteration tables, 40 independent cases, monotone SSE under stated tie/empty policy, qualified elbow | S09 pp.29,33,40,42 images; A02 p.1 image/all 15 points; X05 96 distances, 32 assignments and centroid rounds, read-only; source-only SSE cannot be independently reproduced |
| Perceptron | all 24 sequential rows, 30 array-update comparisons, XOR inequality proof, strict zero threshold, degenerate classifier counterexample | S10 pp.11,14,18,20 images; X06 all 24 source rows; L01 observations remain limited |
| Backpropagation | 909 central finite-difference gradients / 101 independent losses; sign, old weights, biases and simultaneous updates | S10 pp.20,23–24 images: step-function XOR versus differentiable sigmoid update conventions reconciled |
| Deep Learning overview | affine composition, RNN mapping/shared state, GAN role separation, no invented performance | S11 pp.5,8,10–11 images; original GAN paper and Stanford references |
| CNN | all matrices, exact pooling, 80 SciPy correlations + 48 pooling references; RGB channels/shape/parameters | S11 pp.16,23,25,31 images; source caption inconsistency already correctly handled |

Independent references consulted (2026-10-26): [scikit-learn 1.7 OLS §1.1.1](https://scikit-learn.org/1.7/modules/linear_model.html#ordinary-least-squares), [neighbors §1.6](https://scikit-learn.org/1.7/modules/neighbors.html), [NB §1.9](https://scikit-learn.org/1.7/modules/naive_bayes.html), [trees mathematical formulation](https://scikit-learn.org/1.7/modules/tree.html#mathematical-formulation), [SciPy 1.16 linkage](https://docs.scipy.org/doc/scipy-1.16.0/reference/generated/scipy.cluster.hierarchy.linkage.html), [Stanford CS231n chain rule](https://cs231n.github.io/optimization-2/), [CNN layers](https://cs231n.github.io/convolutional-networks/), [Goodfellow et al., GAN (2014)](https://papers.nips.cc/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html). Numerical execution uses sklearn 1.7.2 / SciPy 1.16.3; online stable/latest defaults are not substituted for that environment.

## Stages C–D review record

All 13 OOP lesson sources and their 390 prompts/alternatives/keys/explanations/rubrics received fresh semantic review. Published Python examples passed independent checks in CPython 3.12.14: 7 foundations/array lessons and 35 solutions, 3200 array reference operations; 5 Final lessons and 30 solutions, 1200 stack + 600 grammar + 240 Fraction postfix + 400 undo cases, 1280 circular + 600 linked-queue + 500 priority operations, 200 sorting datasets and 3200 collision/dict operations. Linked List's two blocks were executed in their documented shared scope; head/tail identity, insertion, acyclic reachability and the 11-state demo's final output were checked independently.

Fresh source-image locators (physical pages): W1 9,15,22,29; W2 5,12,24,38; W3 12,15,27,30; W4 15,19,25,33; W5 22,27,38,40; W6 19,26,29,41; W7 5,11,36,43; W8 7,11,19,23; W10 13,21,43,48; W11 20,24,33,44; W12 21,23,34,45; W13 18,24,30,34; W14 14,15,22,29; W15 13,15,23,35. These are targeted diagram/formula/code inspections, not a claim of a full visual review of every PDF page. Original diagrams/code are evidence of teaching scope, not an answer oracle. W7 p.36 was also inspected at full size: index **999**, address 8992 is correct, not an error inferred from a small thumbnail.

Independent references consulted 2026-10-26: [Python classes §9](https://docs.python.org/3.12/tutorial/classes.html), [data model §3.1](https://docs.python.org/3.12/reference/datamodel.html#objects-values-and-types), [ABC](https://docs.python.org/3.12/library/abc.html), [deque](https://docs.python.org/3.12/library/collections.html#deque-objects), [heap priority notes](https://docs.python.org/3.12/library/heapq.html#priority-queue-implementation-notes), [stable sorting](https://docs.python.org/3.12/howto/sorting.html#sort-stability-and-complex-sorts), [Liskov & Wing 1994, behavioral subtyping §§1–3](https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf), [Open Data Structures, hashing](https://opendatastructures.org/ods-python/5_Hash_Tables.html). Python 3.12 online documentation currently labels patch 3.12.15; execution used 3.12.14. Interface guarantees are distinguished from CPython allocation details.

Additional independent checks: [Open Data Structures §11.1, merge/quicksort and their assumptions](https://opendatastructures.org/ods-python/11_1_Comparison_Based_Sorti.html); [OMG UML 2.5.1 §9.5.3, §11.5.4](https://www.omg.org/spec/UML/2.5.1/PDF), locally read from the official PDF (physical pp.154,242,248). Shared aggregation has model-specific semantics; composite ownership is a modeling contract, not Python garbage-collection enforcement. Week5 p.40 already makes that distinction correctly.

## Stage E: foundations and search

Freshly inspected S01 pp.7,8,13,16 and S02 pp.6,13,31,32 images, and the complete two lesson sources. Four AI approaches are a teaching taxonomy, not mutually exclusive implementation classes. Rationality is conditional on performance measure/evidence, not omniscience. Chinese Room is presented as a philosophical argument, not an experimental theorem. Reflex agents need neither a learned world model nor planning. Turing's probability statement and ELIZA publication date now have precise primary-source qualifications.

Search execution: 3 Python blocks; frontier tables, graph p.31 (BFS 4 edges / documented DFS 5), grid p.32 (8 moves), cycles/start=goal/unreachable cases and 160 independently checked graphs. BFS edge-optimality requires equal step costs; finite graph visited-set DFS completeness is distinguished from infinite tree search. Successor order, push order and goal-test timing remain explicit.

References, accessed 2026-10-26: [AIMA authors, chapter 2 §§2.1–2.3](https://people.eecs.berkeley.edu/~russell/aima1e/chapter02.pdf); [Berkeley CS188 §1.3.1–2](https://inst.eecs.berkeley.edu/~cs188/textbook/search/uninformed.html); [Turing 1950 §6, primary article transcription](https://abelard.org/turpap/turpap.php); [Weizenbaum 1966, original ELIZA article](https://courses.cs.umbc.edu/331/papers/eliza.html); [Stanford CS230 RNN architecture/applications](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks/); [sklearn 1.7 K-Means §2.3.2](https://scikit-learn.org/1.7/modules/clustering.html#k-means). These confirm concepts, not missing classroom experimental observations.

## Actual review units and question audit

**475 disjoint heading sections** (H2–H4) across all 25 Markdown bodies were read, including objectives, assumptions, tables, mistakes, solutions and references. Their **32 Python fences** were executed (dependent Linked List blocks share scope); **38 block-math expressions** were inspected and reconciled with the stated equations/derivations. These counts overlap the sections: do not add them together as independent claims. Inline expressions, tables and figures were reviewed in their containing sections, not assigned fabricated individual-verification counts.

Every lesson has 6 original + 24 extended questions = 30 current question units. All 750 prompts, alternatives, keys, explanations, references, tolerances and rubrics were inspected. Current inventory remains **460 choice + 165 numeric + 125 self-assessment**.

| Evidence mode | Original 150 | Extended 600 | Total / interpretation |
|---|---:|---:|---|
| Independently executed arithmetic/code key checks | 94 | 127 | **221 VERIFIED computational keys**, not just grader assertions |
| Conceptual key/alternative review against definitions, assumptions and independent references | 31 | 373 | **404 reviewed conceptual keys**; semantic reasoning, not executable proof or an empirical-performance guarantee |
| Self-assessment rubric review | 25 | 100 | **125 reviewed ungraded rubrics**, excluded from automatic scores |
| Total reviewed | 150 | 600 | **750**, including 3 CORRECTED semantic questions |

All 165 numeric tolerances are absolute ≤0.001 with zero relative tolerance; zero-tolerance count questions remain exact. Boundary acceptance/rejection and malformed numeric inputs were executed by the existing contracts/tests. Rounding/units were checked with each worked example. No incorrect numeric key was found; the entropy question's arithmetic answer .75 remains correct after replacing its impossible fixture. No authored practice question is promoted to an official answer key.

Per-lesson section counts and main independent evidence (all rows include 30 reviewed questions):

| Course / lesson slug | Sections | Independent verification / original evidence |
|---|---:|---|
| OOP linked-list | 16 | Python identity/acyclic trace; W10 pp.13,21,43,48 |
| OOP classes-objects | 15 | class/instance/attribute/shared-list execution; Python §9; W1 |
| OOP encapsulation-properties | 15 | mangling/setter/exceptions; Python §9.6 + descriptor behavior; W2 |
| OOP inheritance-mro | 14 | exact C3 MRO/super dispatch and invalid hierarchy; Python §9.5; W3 |
| OOP polymorphism-abc | 15 | duck typing, abstract instantiation/body/virtual subclasses; abc docs; W4 |
| OOP object-relationships | 16 | alias/container snapshot/lifetime; UML §9.5.3, Python data model; W5 |
| OOP uml-solid | 16 | LSP counterexample/OCP extension/SRP contract; Liskov–Wing + UML; W6–7 |
| OOP arrays-dynamic-array | 15 | 3200 list-oracle operations, doubling copies, row-major; W7–8 |
| OOP stack | 17 | list/deque and independent grammar/Fraction oracles; W11 |
| OOP queue | 17 | deque/sorted priority oracles, wrap/full/empty; heapq notes; W12 |
| OOP complexity-basic-sorting | 17 | sorted/inversion/trace counts and stable tagged records; W13 |
| OOP advanced-sorting | 17 | partition invariants/stability/space/recurrences; ODS §11.1; W14 |
| OOP hash-tables | 18 | dict/collision/deletion/tombstone/operation-count oracles; Python hash contract; W15 |
| AI ai-foundations-agents | 31 | primary Turing/Weizenbaum + AIMA; S01 pp.3–16; no invented official p.16 answer |
| AI search-models-bfs-dfs | 27 | 160 graph oracles, exact frontier/grid outputs; S02 pp.2–32 |
| AI final-regression | 26 | exact OLS, metrics, full-source data; S06/A03/X07/C02/D03 |
| AI final-knn | 25 | exact distances/encoding/ranking, sklearn comparison; S07/X01/X03/X04/C01 |
| AI final-naive-bayes | 29 | exact probabilities/smoothing, independent density; S07/X01/X03/C01 |
| AI final-decision-tree | 16 | empirical mutual-information oracle/all source predictions; S08/D01 |
| AI final-hierarchical-clustering | 18 | SciPy linkage, matrix normalization/metric caveats; S09 |
| AI final-kmeans | 22 | exact centroids/SSE and source worksheets; S09/A02/X05; figure-only SSE NOT VERIFIED |
| AI final-perceptron | 17 | sequential-update oracle/XOR proof; S10/X06; L01 source-limited |
| AI final-backpropagation | 17 | finite-difference loss-only oracle + XOR; S10; L02 source-limited |
| AI final-deep-learning-overview | 16 | affine/RNN/GAN architecture definitions, original GAN + Stanford; S11 |
| AI final-cnn | 23 | SciPy cross-correlation/pooling/shape/channel oracles; S11 |

## Executed validation and compatibility

- **PASS**: `node scripts/build.cjs`, `node scripts/check.cjs` (rich rendering, interactive lesson, readers, study/preferences/i18n, practice, exam and Phase 9 checks). No schema/assertion success is represented as academic proof.
- **PASS**: all 14 Python checks: `check-practice-answers.py`, `check-practice-expansion.py --all`, `check-exam-answers.py`, `check-oop-foundations.py`, `check-oop-data-structures.py`, `check-ai-search.py`, `check-ai-regression.py`, `check-ai-knn.py`, `check-ai-naive-bayes.py`, `check-ai-final-stage-{b,c,d,e}.py`, `check-phase9.py`. Source-aware checks used read-only `--source-root` where supported. NumPy/SciPy/sklearn came from an external existing cache; no website dependency added.
- **PASS**: `check-exam-browser.cjs` and `check-phase9-browser.cjs` in Chrome. Seeded revision-1 data in all 3 changed banks, original attempts/drafts/ratings/raw backups, 12 new runs without archive eviction, refresh/reopen, cross-tab locking, backup-quota failure, current score/answer submission/focus and old-context warnings.
- **PASS**: focused existing-system browser integration: homepage/search/filters/GitHub refresh and counts, history/exact HTML resume/reset, completion/bookmarks/keyboard, 11-state Linked List, PDF page 2/125% zoom/scroll restoration/download signature/native fallback and browser Back/Forward. Classic/Modern, TH/EN, Light/Dark, six palettes plus Custom and 1440/390/320px representative cases; no observed console/site-request errors or horizontal page overflow.
- Original 150 banks, stable IDs/URLs/anchors and `skyce-learning-study` formats remain unchanged. Only 3 extended semantic identities acquire `-r2`; 90 frozen revision-1 question contexts are archives, **not additional current questions**. Historical scores are preserved and visibly labeled, never silently regraded.
- **PASS**: final deterministic double-build, protected-source/worktree hashes and publication safety checks, detailed below.
- **NOT RUN**: Safari, Firefox, physical devices, actual screen-reader output and deployment verification. Local Chrome coverage is not a claim about those environments.

## Final integrity and publication review

- Latest `origin/main` re-fetched at final review remains the audit base `a4b2d916…`. Branch/worktree isolation preserved; no history rewrite.
- **25 readers** rebuilt twice with byte-identical SHA-256 output; catalog/registry unchanged. **370 original explicit anchors**, all 25 stable IDs and published lesson URLs preserved. All new audit-document relative file/HTML-anchor links resolved locally. Asset version is consistently `phase9-academic-1` under `/Course-Website/`.
- **15 original tracked PDFs**, and **267 snapshotted source/tracked-file entries** including local derivatives: SHA-256 unchanged. **18 protected worktrees**: original HEAD, staged/index diff, unstaged diff/status and dirty-file hashes unchanged. No original source was edited or staged.
- Cumulative HTML review: **9 corrected generated readers**; other **27 HTML pages change only the shared cache tag**. Eight Markdown bodies, three semantic extended-bank revisions, three editorial evidence-only banks, shared archive handling, focused tests and five audit/history/contract documents comprise the substantive scope. No new curriculum/catalog entry or dependency.
- Reviewed added lines and file inventory for credential/private-key patterns, machine-specific personal paths, source PDFs/workbooks/datasets, screenshots, caches and temporary fixtures. None included. Runtime artifacts and original-source extractions remain outside Git.
- Real screenshots inspected: corrected Turing/ELIZA text (Classic Light 1440), hash complexity (Modern Dark EN 390), entropy/source notation (Modern Dark TH 320), each of the three current replacement questions at 1440/390/320, archived-context notices in both languages, and OOP catalog desktop/mobile sidebar. No correction-related clipping/overflow observed. Screenshots are not committed.

**PR readiness: READY for the verified corrections and compatibility changes.** Outstanding evidence in [the limits ledger](phase9-unverified-claims.md) is intentionally **not marked PASS**. In particular, publication readiness is not certification of missing neural-lab observations, source-only K-Means magnitudes, unsupported current-model performance, every original source page, or untested browser/assistive-technology environments.
