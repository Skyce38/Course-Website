# Phase 9 — Verified corrections

The following findings distinguish website defects from discrepancies already handled correctly by the website. Originals remain unchanged. Access date for the external references below: 2026-10-26.

Each confirmed finding will record: ID; course/lesson; original source and physical page; website anchor; original claim; verified conclusion; independent reference (URL, section, access date and version where applicable); reproduction; severity; corrective action; verification result; residual uncertainty.

## P9-AI-001 — R8 differs between two teaching sources

- Lesson/anchor: AI [KNN, encoding](../read/artificial-intelligence/final-knn.html#drug-encoding). Sources: S07 `Final/KNN_NB_Classification.pdf`, physical p.3; X04 `Assignment/KNN_Example.xlsx`, `KNN!A9:D9` (local-only).
- Original claim: the lesson reproduced workbook distances but did not disclose that the slide's Age=41 row has Sex=M while the workbook has F / one-hot `(1,0)`.
- Conclusion: **ambiguous across sources**, not evidence that either lecturer source is mathematically wrong. The workbook calculation is correct. Exact squared distance is 25.0049 for X04 and 27.0049 for the slide variant; the k=5 class remains drugC.
- Evidence: fresh visual inspection of p.3 and read-only workbook cells; [scikit-learn 1.7 Nearest Neighbors §1.6.2](https://scikit-learn.org/1.7/modules/neighbors.html#nearest-neighbors-classification), plus exact decimal/Fraction calculation in `scripts/check-phase9.py` and existing independent KNN checks.
- Severity: Medium (source attribution). Action: explicit Thai distinction next to encoding; no dataset, question meaning, answer key or question ID changed. Result: **CORRECTED**, exact counterfactual test passed. Uncertainty: which source variant the lecturer intended cannot be established.

## P9-AI-002 — Name copied from the wrong version of the example

- Lesson/anchor: AI [Naive Bayes, Judy](../read/artificial-intelligence/final-naive-bayes.html#judy); S07 physical p.7.
- Original claim: the second name was Dana. Direct slide inspection shows Paola; Dana occurs in the separate S08 Sunburn table.
- Conclusion/classification: **confirmed incorrect transcription**, Low severity. Action: change only the unmodelled name in the displayed data block to Paola. Features, class counts, formulas and assessment keys remain unchanged.
- Reproduction: compare original p.7 image with the text block; `scripts/check-phase9.py` guards the corrected name; Naive Bayes source/numerical checks passed. Result: **CORRECTED**. The reading-baseline code-fence hash is updated only for this non-executable text-fence correction; no Python program was changed.

## P9-AI-003 — Degenerate perceptron boundary qualification

- Lesson/anchor: AI [Perceptron, boundary](../read/artificial-intelligence/final-perceptron.html#boundary). S10 physical pp.13,16–18 illustrate nondegenerate boundaries; the unconditional extension was website prose.
- Original claim: when w2=0, write a vertical line. Conclusion: **correct only under the additional assumption w1≠0**. If both weights are zero the classifier is constant; z=0 is the empty set for b≠0, or the whole plane for b=0, not a separating line.
- Evidence: solve `b+w1*x1+w2*x2=0` directly, and evaluate strict output `int(z>0)` at nine exact-rational points for each b∈{−1,0,1}; `scripts/check-phase9.py`. [scikit-learn 1.7 SGD §1.5 mathematical formulation](https://scikit-learn.org/1.7/modules/sgd.html#mathematical-formulation) defines the linear decision function; the degeneracy follows algebraically.
- Severity: Medium. Action: qualify the vertical case and explain both all-zero-weight cases in Thai. The existing exam-14 explanation already distinguishes degeneracy and needs no changed key/identity. Result: **CORRECTED**, counterexample regression passed. No residual mathematical uncertainty under the stated strict rule.

## P9-AI-004 — Ambiguous child-entropy notation

- Lesson/anchor: AI [Decision Tree, entropy](../read/artificial-intelligence/final-decision-tree.html#entropy); S08 physical p.13.
- Original source: the displayed child fractions use `n_c`, without defining that symbol in the explanatory legend. Classification: **ambiguous or misleading notation**, not a proven alternate intended formula.
- Correct conclusion: child class proportions must be `n_bc/n_b`, with child weight `n_b/n_S`. The website formula already used this correct normalization.
- Evidence: source image; [scikit-learn 1.7 Decision Trees §1.10.7](https://scikit-learn.org/1.7/modules/tree.html#mathematical-formulation); entropy/gain reproduced independently as empirical mutual information in `check-ai-final-stage-b.py` (80 comparisons), and all source-table gains.
- Severity: Medium. Action: short neutral Thai notation clarification beside the already-correct formula. Result: **CORRECTED** (clarification), no assessment or saved-answer changes. Residual uncertainty: intended meaning of the undefined source symbol.

## P9-SOURCE-001 — CNN caption sum (existing correction retained)

- S11 `Final/Intro_DeepLearning_Slides.pdf`, physical p.16; [CNN kernel](../read/artificial-intelligence/final-cnn.html#kernel). The caption says `312` but displays the nine products whose sum is 228; the diagram cell also says 228.
- Classification: **confirmed incorrect caption equality**, High severity in the source, already correctly explained by the website before Phase 9. Flipping the displayed kernel instead gives 312, which is a different convention.
- Verification: original image inspected; direct integer dot product and SciPy correlation comparison (`check-ai-final-stage-e.py`); [Stanford CS231n, convolutional layer](https://cs231n.github.io/convolutional-networks/). Result: **VERIFIED**, no new content change required; original PDF preserved.

## P9-SOURCE-002 — Correlation normalization (existing qualification retained)

- S09 `Final/clustering.pdf`, physical p.10; [Hierarchical clustering, distance](../read/artificial-intelligence/final-hierarchical-clustering.html#distance). The source displays a centered sum divided by σxσy without specifying normalization of the σ terms.
- Classification: **correct only with a compatible definition / otherwise ambiguous**. With ordinary population standard deviations, a factor 1/p is missing; use centered sums of squares to avoid the ambiguity. The website already does so and warns that 1−r is not generally a metric.
- Verification: source image; e.g. x=(1,2,3), y=(2,4,6) gives r=1 with the normalized formula; dividing the unnormalized sum by population standard deviations instead gives 3. [SciPy Pearson formula and constant-input warning](https://docs.scipy.org/doc/scipy-1.16.0/reference/generated/scipy.stats.pearsonr.html). Result: **VERIFIED** qualification, source intent unresolved, no new website formula change.

## Compatibility risk requiring investigation

**P9-DATA-001 — NOT VERIFIED (implementation risk, not an academic claim).** `assets/practice-contract.js` computes historical scores using the supplied current bank, and returns a fresh state on revision mismatch. Before any semantic question correction, verify a strategy that preserves the original persisted data and distinguishes old answer context. Do not treat this initial observation as evidence that existing unchanged banks have already lost data.
