# Practice expansion: content and verification ledger

All questions are authored adaptations of verified lesson content, not official examination questions or lecturer answer keys. The registered Markdown and its existing solved exercises stay unchanged. References below are real heading IDs in each corresponding lesson. Every set has five automatically graded questions and one rubric-based self-assessment.

## Stage A — AI Final

| Lesson | Automatic IDs / objectives | Heading evidence | Independent verification |
|---|---|---|---|
| final-regression | rg-correlation/slope/prediction/mse/multiple | correlation, household, errors, supervised | Curved zero-correlation counterexample; Fraction OLS on eight household rows; x=18 prediction with units and no premature rounding; error-vector MSE; source review of multiple-feature terminology |
| final-naive-bayes | nb-independence/prior/posterior/laplace/zero | independence, judy, scores, smoothing | Count-based Fraction products and normalization; α=1 vocabulary denominators; zero-normalizer guard; conditional-independence definition reviewed against source |
| final-hierarchical-clustering | hc-distance/first/average/final/cut | distance, linkage, worked, dendrogram | Euclidean metric; direct cross-pair linkage over the five-point matrix, merge heights and cut counts; no reuse of the lesson's incremental update algorithm |
| final-kmeans | km-assignment/centroid/cluster-sse/total-sse/stop | x05, algorithm | Complete Fraction Lloyd run on all eight X05 points; first-index ties, centroids/SSE after update and stable assignments; no global-optimum claim |
| final-perceptron | pc-forward/bias/boundary/zero/lab | perceptron, and, boundary, lab-evidence | Strict >0 arithmetic and sequential bias update; boundary substitution; source review retains L01 Neural Training Lab as **source-limited**, with no invented settings/results |
| final-backpropagation | bp-loss/output-gradient/hidden-gradient/update/old-weights | sigmoid, backprop, mistakes | Declared half-squared loss; exact chain-rule arithmetic cross-checked by centered finite differences; old-parameter gradient convention and descent update |
| final-deep-learning-overview | dl-hierarchy/affine/rnn/gan/style-evidence | hierarchy, depth, rnn, gan, style | Affine composition counterexample; separate source review of taxonomy, sequence mapping, G/D roles and unavailable style-transfer settings; no fabricated training result |
| final-cnn | cn-correlation/size/parameters/pool/fc-evidence | kernel, shape, rgb, pooling, relu-fc | Explicit unflipped/rotated dot products, integer output shape, channel/bias count and exact window mean; source review of missing FC parameters |

Self-assessments: rg-rounding, nb-models, hc-linkages, km-audit, pc-xor, bp-check, dl-architecture, cn-order. Each has three specific rubric criteria and no automatic answer key. The source-limited lab, unsupported style-transfer settings and missing FC weights remain uncertain rather than filled in.

## Verification method

## Stage B — OOP Data Structures

| Lesson | Automatic IDs / objectives | Heading evidence | Independent verification |
|---|---|---|---|
| linked-list | ll-head/empty/remaining/insert/tail | question-head, question-empty, explanation, mistakes, question-tail | Actual Python Node identity, traversal count, deletion reachability and reference ordering; predecessor-search complexity assumption reviewed separately |
| queue | qu-empty/rear/full/priority/deque | concepts, trace, circular, priority, deque | Reviewed Linked/Circular/Priority implementations executed offline; tail reset, wrap-around, bounded/full exceptions and stable priority ties; independent deque interface |
| advanced-sorting | as-merge/partition/worst/python/space | merge, quick, timsort, tradeoffs | Independent merge comparison counter and Lomuto partition; reviewed Quick counts; Python stable sort/None return; worst-case recursion-depth argument |
| hash-tables | ht-collision/tombstone/load/hashability/bounded | concepts, trace, load, dict, resolution | Collision/equality counterexample, forced-collision update after tombstone, rehash/load and full-table behavior; actual Python hashability exceptions/identity hashes |
| arrays-dynamic-array | ar-cost/row-major/amortized/indices/alias | amortized, matrix, complexity | Reviewed DynamicArray operation/copy counts, independent flat index, geometric bound, None/invalid-index checks and actual shared-sublist/comprehension behavior |

Self-assessments: ll-audit, qu-invariants, as-compare, ht-contract, ar-growth. They require explicit boundary/complexity/ownership assumptions, not unsupported asymptotic claims. Existing `check-oop-data-structures.py` also passes its independent randomized stack/queue/sorting/hash checks; it is not used as a substitute for checking the newly authored keys.

## Verification method

`python scripts/check-practice-expansion.py --stage A` checks every implemented Stage A automatic key, reporting executable arithmetic/code evidence separately from source-reviewed conceptual propositions. A Python result alone cannot prove a philosophical definition or documentary claim. Conceptual distractors/rationales were separately compared with their referenced lesson sections; the ledger states that evidence explicitly.

`node scripts/check.cjs` checks schema, registry identity, global question-ID uniqueness, Thai content, real anchors, safe escaping, score/state invariants and deterministic isolated builds. During an incomplete stage only, set `PRACTICE_EXPECTED_COUNT` to the actual interim total. Final validation must use the default count derived from the full lesson registry.

Existing four pilot sidecars are immutable in this expansion. Their original independent answer checks and browser regression remain separate; expansion evidence never substitutes for pilot regression checks.
