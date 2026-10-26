# Phase 9 — Verified corrections

The following findings distinguish website defects from discrepancies already handled correctly by the website. Originals remain unchanged. Access date for the external references below: 2026-10-26.

Each finding records the source locator, visible section, claim/conclusion, evidence, reproduction, severity, action/result and residual uncertainty. Source IDs resolve through [the inventory](ai-source-coverage.md); local-only originals and screenshots are not published. The ten lesson findings below span eight Markdown files: some are factual corrections, others are explicitly classified qualifications/transcription/attribution fixes. They are not ten newly discovered wrong numerical answers.

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

## P9-DATA-001 — Historical answer context for semantic corrections

- Context: `assets/practice-contract.js` intentionally rejects revision mismatch and grades with its supplied bank. Simply bumping a bank revision or changing a key in place would either hide old responses or reinterpret their meaning. This is a **verified implementation risk**, not evidence that unchanged banks previously lost data. Severity: High for correction integration.
- Action: leave that contract and all original Practice Mode banks untouched. Add bounded, validated frozen historical banks to the Exam contract; resolve each saved session by its own revision. Three revision-2 banks include their exact complete revision-1 contexts. Preserve old question IDs only in those contexts; replacements use `-r2`.
- Migration: retain old session/run payloads, copy the original config bytes once into `skyce-learning-exam-config-history-v1:<lesson>:r1` before any config overwrite, and retain ten sessions **per revision**. If the backup fails, leave the persisted old config untouched and report unavailable persistence. A newer config locks older tabs against overwrite. Unrelated study/bookmark/quiz namespaces are never migrated or cleared.
- UI: visible TH/EN warning and archived-revision labels explain that old questions/keys/scores may contain corrected material and are historical context, not current answer guidance. New runs use only current questions. This deliberately preserves an old result rather than inventing a retroactively corrected score.
- Reproduction/evidence: exact pre-correction bank SHA-256 assertions and seeded drafts/attempts/ratings in `check-phase9.cjs`; real Chrome migrations, refresh/reopen, correct-key identity, cross-tab locking, quota failure, focus and unrelated storage preservation in `check-phase9-browser.cjs`.
- Result: **CORRECTED / PASS** for all three revisions; no deletion or regrading of their historical runs. Residual limits: browsers may independently evict localStorage; unknown future/malformed data is not reconstructed. Existing ten-current-run retention remains; the new protection does not promise unlimited storage.

## P9-OOP-001 — Collision-heavy rebuild complexity

- Lesson/anchor: [Hash tables, load](../read/oop-python/hash-tables.html#load). Week15 physical pp.13,18–20 discuss distribution/load; the particular reinsertion implementation is the website's teaching adaptation.
- Original claim: one rehash is O(n+capacity), without qualifying that bound for this implementation. Classification: **correct only under additional distribution assumptions**. Each reinsertion scans an existing bucket for duplicate keys, so a single colliding bucket gives a triangular number of comparisons and quadratic rebuild cost.
- Evidence: inspect `ChainingHashTable.insert`; instrument only equality calls on forced-collision keys at capacities 8,16,32,64. The insertion triggering a rebuild makes m(m+1)/2 comparisons for m=3capacity/4 existing keys. [Open Data Structures, Hash Tables](https://opendatastructures.org/ods-python/5_Hash_Tables.html) distinguishes randomized assumptions; executed counterexample is `scripts/check-phase9.py`.
- Severity: Medium. Action: state expected linear rebuild under appropriate hashing and O(n²+capacity) for this collision-heavy implementation, and qualify expected amortized insertion. Result: **CORRECTED**, exact operation-count checks passed, mapping results preserved. No code or keys changed.

## P9-OOP-002 — End insertion has a constant cost

- Lesson/anchor: [Arrays, complexity](../read/oop-python/arrays-dynamic-array.html#complexity); Week8 physical pp.18–24, website summary table.
- Original claim: O(n−i) for insert/remove positions. At legal insertion position i=n with spare capacity there are zero shifts but still validation, a write and size update. Classification: **missing boundary qualification**.
- Conclusion: O(n−i+1), plus O(n) when resizing, is a uniform bound including that boundary. Directly inspect the existing loop and fixed work; existing 3200 list-oracle operations cover valid end insertions and values. Severity: Low. Action: correct table and its two literal evidence excerpts; answer keys, identities and revision remain unchanged. Result: **CORRECTED**; reading baseline table hash updated only for the corrected row, guarded by the new regression.

## P9-SOURCE-003 — Merge trace caption (existing correction retained)

- Week14 physical pp.14–15; [Advanced sorting, merge](../read/oop-python/advanced-sorting.html#merge). Listed arrays are left=[1,3,5,8], right=[2,4,7,9], but the caption says right is exhausted after taking 7.
- Classification: **confirmed incorrect trace caption**, High source severity. Seven head comparisons actually exhaust left first, leaving 9 on the right. Direct images inspected; output/order and comparison counts reproduced by the existing independent sorting checks. Website already teaches the correct trace. Result: **VERIFIED**, no new change; originals preserved.

## P9-SOURCE-004 — Mutable keys (existing correction retained)

- Week15 physical p.23; [Hash tables, dict](../read/oop-python/hash-tables.html#dict). Source wording disallows mutable objects as keys universally.
- Classification: **confirmed overgeneralization**, Medium. Default identity-hashed user objects can have mutable attributes and remain hashable; built-in lists/dicts/sets are unhashable. Equality/hash consistency and stability are the actual contract.
- Evidence: original image; [Python 3.12 glossary, hashable](https://docs.python.org/3.12/glossary.html#term-hashable), executable custom-class/dict counterexamples in existing OOP tests. Website already states the distinction. Result: **VERIFIED**, no new change required.

## P9-OOP-003 — Classes and methods are objects/attributes too

- Lesson/anchor: [Classes, concepts and attributes](../read/oop-python/classes-objects.html#concepts); W1 physical pp.9–15 supplies the beginner roles. Website wording contrasted class and object categorically and paired attributes with methods without explaining their overlap.
- Classification/conclusion: **misleading if universal**, Medium. A class is itself an object, usually an instance of `type`; a method is also an attribute. Distinguishing an instance's data attributes from its methods is useful pedagogically but not a disjoint Python taxonomy.
- Evidence: [Python 3.12 tutorial §9.3–9.4](https://docs.python.org/3.12/tutorial/classes.html); executed `isinstance(Example,type)`, bound-method lookup and shared mutable class-list behavior in `check-phase9.py` plus existing foundation tests.
- Action/result: **CORRECTED** Thai qualification, five literal evidence excerpts updated editorially. No code, answer meaning, question ID/revision or saved data changed. No residual uncertainty under Python's object model.

## P9-AI-005 — Not all agents plan or learn

- Lesson/anchor: [Foundations, agents](../read/artificial-intelligence/ai-foundations-agents.html#agents); S01 physical pp.10–13. Original website wording implied agents require an internal model and reasoning/planning before acting.
- Classification/conclusion: **incorrect as a universal requirement**, Medium. Simple reflex agents can map percepts to actions with condition–action rules; learning, planning and a world model are not mandatory for every agent.
- Evidence: [AIMA authors, chapter 2 §2.3](https://people.eecs.berkeley.edu/~russell/aima1e/chapter02.pdf), reflex-agent counterexample; fresh S01 p.13 image. Action/result: **CORRECTED** visible explanation while retaining the sensor/action relationship and optional learning discussion. No assessment key/identity changed. Residual uncertainty: none for this definitional distinction, not a claim about any particular deployed AI.

## P9-AI-006 — Turing prediction quantifier

- Lesson/anchor: [Foundations, Turing](../read/artificial-intelligence/ai-foundations-agents.html#turing-test); S01 physical p.7. The slide's 30%-of-judges paraphrase was repeated without the original quantifier.
- Classification: **ambiguous or misleading paraphrase**, Medium, not a new experimental result. Correct conclusion: Turing's §6 prediction concerns an average interrogator's probability of correct identification ≤70% after five minutes; it is not a report that a measured panel's 30% were fooled or a universal certification of understanding.
- Evidence: [Turing 1950 §6 primary transcription](https://abelard.org/turpap/turpap.php); university mirror linked by the lesson was also indexed, but direct audit fetches timed out. Reproduction: compare the original §6 proposition and slide p.7; current text guard in `check-phase9.py`.
- Action/result: **CORRECTED** precise Thai qualification and primary citation; the slide's historical paraphrase remains labeled as such. ChatGPT performance opinion stays NOT VERIFIED. No question key changed by this editorial clarification; P9-Q003 is a separate semantic correction.

## P9-AI-007 — ELIZA date attribution

- Lesson/anchor: [Foundations, ELIZA](../read/artificial-intelligence/ai-foundations-agents.html#turing-limitations); S01 physical p.8 labels the example 1964.
- Classification: **ambiguous date attribution**, Low; 1964 is not asserted to be an impossible development date. Correct conclusion: Weizenbaum's ELIZA article was published in January 1966, and development/example dating must not be confused with publication.
- Evidence: [original article, CACM 9(1), January 1966, abstract and program description](https://courses.cs.umbc.edu/331/papers/eliza.html). Reproduction: publication header and rule-based decomposition/reassembly description, compared with slide image. Action/result: **CORRECTED** neutral Thai clarification and citation; regression guard preserves 1966. No grading/identity change. Residual uncertainty: exact intended significance of the slide's 1964 label.

## P9-Q001 — Two true Big-O options

- Resource: `oop-python-complexity-basic-sorting-exam-04`; [complexity](../read/oop-python/complexity-basic-sorting.html#complexity); W13 algorithmic context, but this question is authored, not copied from a slide.
- Original: asks the Big-O of n iterations of constant work while offering both O(n) and O(n²). **Ambiguous**, High: both are upper bounds. The intended linear bound is the tightest offered, not the only true Big-O statement.
- Evidence: definition of asymptotic upper bound; n≤n² for every integer n≥1; [ODS §11.1 comparison-based analysis](https://opendatastructures.org/ods-python/11_1_Comparison_Based_Sorti.html). Exact inequality and prompt qualification guarded by `check-phase9.py`.
- Action/result: **CORRECTED** prompt explicitly asks the tightest upper bound among options under positive constant work. New ID ends `04-r2`, bank revision 2, key a unchanged. Old context frozen, never silently relabeled. No residual ambiguity under these assumptions.

## P9-Q002 — Impossible three-record entropy fixture

- Resource: `artificial-intelligence-final-decision-tree-exam-19`; [entropy](../read/artificial-intelligence/final-decision-tree.html#entropy); S08 p.13 is the formula context, not the origin of this authored fixture.
- Original: children of sizes 1 and 3 have entropies 0 and 1 bit. The answer .75 follows its numbers, but an equally weighted three-record categorical node cannot have exactly one bit of empirical entropy. Classification: **confirmed incorrect fixture**, High.
- Evidence: enumerate all labelings of three records (pure, 2:1, or 1:1:1); [sklearn 1.7 tree entropy definition](https://scikit-learn.org/1.7/modules/tree.html#mathematical-formulation). Independent exhaustive counterexample in `check-phase9.py`.
- Action/result: **CORRECTED** to sizes 2 and 6 with explicit binary counts (2 pure; 3+3). Weighted entropy `(2*0+6*1)/8=.75`; oracle updated to the realizable counts. ID ends `19-r2`, revision 2, numeric answer/tolerance unchanged, historical fixture preserved only in its labeled archive. Residual uncertainty: none under the stated unweighted records.

## P9-Q003 — Invented source claim

- Resource: `artificial-intelligence-ai-foundations-agents-exam-08`; [limitations](../read/artificial-intelligence/ai-foundations-agents.html#turing-limitations); S01 physical p.7.
- Original asks about a legal claim allegedly on that page. Direct inspection shows a ChatGPT/Turing-test performance opinion, **no legal claim**. Classification: **confirmed unsupported source attribution**, High. The old Phase 8 source-review label was insufficient evidence.
- Evidence/reproduction: original p.7 image compared with the question's premise; Turing primary reference establishes what the historical prediction says, not ChatGPT's experimental performance. `check-phase9.py` guards the corrected source premise.
- Action/result: **CORRECTED** to ask why the slide's ChatGPT performance opinion cannot establish a verified result without experimental evidence. New ID ends `08-r2`, revision 2, key b; all options and explanation reviewed against the new premise. Frozen revision-1 context remains explicitly historical. Residual uncertainty: the performance opinion itself remains NOT VERIFIED.

## Additional source statements checked without new corrections

- W1 physical p.9's first-argument `self` statement needs the **instance-method** context. Website already distinguishes static/class methods; Python §9 and execution agree. **VERIFIED** qualification, Medium if read universally.
- W2 physical p.5's private-name wording is name mangling, not security. Website and [Python §9.6](https://docs.python.org/3.12/tutorial/classes.html#private-variables) already agree. **VERIFIED**, no new change.
- W5 physical p.40 explicitly separates ownership intent from Python automatic destruction. Do not accuse the source of a lifetime claim it does not make. **VERIFIED**, no change.
- W14 physical p.29's Python sorting description is implementation/version context, not a language requirement for all Python runtimes. Website already qualifies stability/implementation details. **VERIFIED**, no change.

The [Phase 8 ledger](phase8-exam-verification.md) is a historical record; its three retired-question assertions are superseded by P9-Q001–003. Passing an earlier oracle did not establish fixture feasibility or source attribution.
