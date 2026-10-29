# AI & OOP visual learning — source and validation ledger

Baseline: `41ae0f2440c4161ec90068a495e28a9cd31e3f77` (merged Phase 14.1). Scope: 12 AI + 13 OOP registered lessons, two original figures each. Existing prose, code, formulas, question banks, identifiers, anchors and storage contracts are immutable in this visual-only change.

## Checkpoint A — source audit

All 25 registered Markdown sources were read, including examples, code, assumptions, exercises and references. Contracts are the current source-verified lessons and the documented [AI inventory](ai-source-coverage.md), [Phase 9 audit](phase9-academic-audit.md), relevant AI coverage ledgers, [OOP coverage](oop-lesson-coverage.md) and [OOP curriculum map](oop-curriculum-map.md). Earlier original-PDF inspections are attributed to those records, not claimed as fresh inspections by this phase. Local AI Final originals are available in the primary checkout; they remain read-only and outside this worktree. Missing lab screenshots/settings remain unverified. No original slide artwork or private submissions will be copied.

| Lesson | Two implemented learning questions / exact contract |
|---|---|
| AI Foundations & Agents | Where do percepts/actions travel? How are AI, ML and DL related without implying measured proportions? |
| Search Models & BFS/DFS | Which directed edges exist in S/A/B/C/D/G? How do tuple-order BFS and frame-based DFS produce different paths? |
| Regression | What is a vertical residual on the exact eight-tree OLS fit? Why do signed errors cancel while MAE/MSE do not? |
| KNN | How does full one-hot encode a changed category? Which five X04 neighbors vote drugC without changing encoding/scale? |
| Naive Bayes | How do Judy's exact scores normalize? Why does Buy alpha=1 differ from raw counts? |
| Decision Tree | How do Sunburn branch counts yield weighted entropy/gain? How does HairColor/Lotion lead to a leaf? |
| Hierarchical Clustering | How does the p.22 matrix produce single-link merge heights? Why do min/max/all-cross-pair average differ? |
| K-Means | Which X05 points belong to each first-round cluster? How do arithmetic means update the old centers? |
| Perceptron | How do weighted inputs, bias and strict z>0 produce output? Why does X06's first sample update only bias? |
| Backpropagation | What are the exact authored 2-2-1 forward values? How do old weights and the chain rule determine the gradient sign? |
| Deep Learning Overview | Where does recurrence carry shared state? Which GAN component generates and which classifies real/fake? |
| CNN | How does the p.16 no-flip sum give 228 rather than 312? How do the p.25 pooling windows produce max and mean outputs? |
| Linked List | Why do head/current alias nodes without copying them? Which reference must be connected first to insert 25 after 20? |
| Classes & Objects | How do separate account instances relate to their class? Why does alias=a share the same state? |
| Encapsulation & Properties | How does setter validation guard state? Which failed operations leave balance/count unchanged? |
| Inheritance & MRO | Which class is next in D(B,C)'s actual MRO? How does the Savings override dispatch while preserving the minimum-balance caveat? |
| Polymorphism & ABC | How does one area() interface dispatch to different formulas? Why does Badge satisfy one duck-typed operation but not inherit Shape? |
| Object Relationships | How does moving Player preserve identity? How does House's owned Room interface differ from a Python destruction guarantee? |
| UML & SOLID | Which side receives UML triangle/diamond symbols? How do Channel and MemoryLog separate formatting from orchestration/storage? |
| Dynamic Arrays | How do size/capacity differ during doubling? Why do eight appends cost 15 in the declared copy/write model? |
| Stack | Which end changes on push/pop/peek? Why must postfix pop the right operand before the left? |
| Queue | How does linked FIFO handle singleton-to-empty? Why is circular raw-buffer order different from logical FIFO? |
| Complexity & Basic Sorting | What do operation counts mean without claiming wall-clock time? How does the exact five-value bubble trace preserve its sorted suffix? |
| Advanced Sorting | Which final-merge input becomes exhausted first? What does the first Lomuto partition establish without claiming the array is sorted? |
| Hash Tables | How do collisions differ from equality? Why must a tombstone preserve the search chain and not create a duplicate on update? |

## Review limitations and findings

- Source-derived numerical tables and authored teaching extensions remain distinguished in each figure's inventory, caption and explanation.
- No new academic correction is authorized here. Potential conflicts must be logged and independently checked before drawing; any confirmed content defect requires a separate correction task.
- Existing qualifications retained: S07 Drug R8 discrepancy; category/tie policies; strict perceptron threshold; old-weight gradients; no-flip CNN arithmetic; MRO and Python ownership semantics; abstract doubling rather than CPython's actual growth factor; no benchmark or model-performance guarantee.
- Status: checkpoints A–G complete. The scoped calculations and diagrams passed the checks below; this is not a fresh whole-curriculum academic audit.


## Delivered assets and reproducibility

Exactly **50 original figures:24 AI and26 OOP**, two per existing lesson. All student-facing labels, alt text, captions and adjacent explanations use Thai with standard English terminology. The figure adds a learning explanation, not an answer inside an interactive question control. No lesson theory, code, formula, exercise, bank or original heading was rewritten.

The authoritative [asset manifest](../scripts/ai-oop-visuals.json) records each unique ID, stable lesson ID/heading, educational purpose, source evidence, public technical reference, assumptions, model, independent verification method, dimensions, byte count, SHA-256, alt text, caption, editable SVG and review status. All artwork is original programmatic drawing; no slide/textbook artwork, fonts or private teaching files are published.

Lossless WebP payload:**2,392,196 bytes** (AI1,095,276; OOP1,296,920),32,014–63,520 bytes per figure. Intrinsic width1120px, height1580–2928px; responsive display maximum560px. Each raster has its own exact pre-decode aspect ratio in [scoped CSS](../assets/ai-oop-visuals.css). Existing lazy loading and rich-image rendering are reused; only the25 illustrated readers load that stylesheet (`phase15-visual-1`). No new runtime JavaScript, external image hosting, framework or website dependency.

Authoring uses the existing Phase14 approach:Python standard library writes editable SVG; installed Chrome shapes Thai; existing Pillow exports lossless WebP. Recorded environment:Chrome156, CPython3.12.14, Node24, Pillow12.3.0 and installed Leelawadee UI. Raster byte reproduction requires compatible browser/font/Pillow versions; SVG sources and mathematical contracts remain portable. NumPy2.3.5/SciPy1.16.3/scikit-learn1.7.2 are existing authoring/test dependencies only, not shipped runtimes.

```sh
python scripts/ai-oop-visual-build.py
node scripts/ai-oop-visual-raster.cjs
node scripts/ai-oop-visual-markdown.cjs
node scripts/build.cjs
node scripts/check.cjs
python scripts/check-ai-oop-visual-models.py
node scripts/ai-oop-visual-raster.cjs --verify
node scripts/check-ai-oop-visuals-browser.cjs --surfaces-only
node scripts/check-ai-oop-visuals-browser.cjs --cls-only
```

Use the existing installed `PLAYWRIGHT_MODULE`/`STUDY_PYTHON` or normal module/runtime resolution. Browser checks take `STUDY_BASE_URL` (serve the repository at `/Course-Website/`) and optional `STUDY_SCREENSHOTS` pointing outside Git. An `--assets=visual15-…` filter supports targeted CLS reruns. These are authoring commands; visitors need none of these tools. Temporary print previews, browser fixtures and screenshots remain outside the repository.

## Complete inventory

Each pair links its editable SVG and published WebP; exact numerical assumptions, source identifiers/pages and proof method are in the manifest. Paths below are repository-relative and point to real tracked files.

| Existing lesson | First figure (SVG / WebP) | Second figure (SVG / WebP) | Pair bytes |
|---|---|---|---:|
| [artificial-intelligence-ai-foundations-agents](../courses/artificial-intelligence/summaries/ai-foundations-agents.md) | visual15-agent-cycle ([SVG](../docs/diagrams/ai-oop/visual15-agent-cycle.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-agent-cycle.webp)) | visual15-ai-subsets ([SVG](../docs/diagrams/ai-oop/visual15-ai-subsets.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-ai-subsets.webp)) | 85,994 |
| [artificial-intelligence-search-models-bfs-dfs](../courses/artificial-intelligence/summaries/search-models-bfs-dfs.md) | visual15-search-directed ([SVG](../docs/diagrams/ai-oop/visual15-search-directed.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-search-directed.webp)) | visual15-bfs-dfs-frontier ([SVG](../docs/diagrams/ai-oop/visual15-bfs-dfs-frontier.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-bfs-dfs-frontier.webp)) | 85,008 |
| [artificial-intelligence-final-regression](../courses/artificial-intelligence/summaries/final-regression.md) | visual15-regression-residual ([SVG](../docs/diagrams/ai-oop/visual15-regression-residual.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-regression-residual.webp)) | visual15-regression-error-metrics ([SVG](../docs/diagrams/ai-oop/visual15-regression-error-metrics.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-regression-error-metrics.webp)) | 85,910 |
| [artificial-intelligence-final-knn](../courses/artificial-intelligence/summaries/final-knn.md) | visual15-knn-one-hot ([SVG](../docs/diagrams/ai-oop/visual15-knn-one-hot.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-knn-one-hot.webp)) | visual15-knn-neighbors ([SVG](../docs/diagrams/ai-oop/visual15-knn-neighbors.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-knn-neighbors.webp)) | 105,008 |
| [artificial-intelligence-final-naive-bayes](../courses/artificial-intelligence/summaries/final-naive-bayes.md) | visual15-nb-judy ([SVG](../docs/diagrams/ai-oop/visual15-nb-judy.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-nb-judy.webp)) | visual15-nb-smoothing ([SVG](../docs/diagrams/ai-oop/visual15-nb-smoothing.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-nb-smoothing.webp)) | 103,622 |
| [artificial-intelligence-final-decision-tree](../courses/artificial-intelligence/summaries/final-decision-tree.md) | visual15-tree-entropy ([SVG](../docs/diagrams/ai-oop/visual15-tree-entropy.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-tree-entropy.webp)) | visual15-tree-sunburn ([SVG](../docs/diagrams/ai-oop/visual15-tree-sunburn.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-tree-sunburn.webp)) | 82,494 |
| [artificial-intelligence-final-hierarchical-clustering](../courses/artificial-intelligence/summaries/final-hierarchical-clustering.md) | visual15-single-dendrogram ([SVG](../docs/diagrams/ai-oop/visual15-single-dendrogram.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-single-dendrogram.webp)) | visual15-linkage-cross-pairs ([SVG](../docs/diagrams/ai-oop/visual15-linkage-cross-pairs.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-linkage-cross-pairs.webp)) | 83,582 |
| [artificial-intelligence-final-kmeans](../courses/artificial-intelligence/summaries/final-kmeans.md) | visual15-kmeans-assign ([SVG](../docs/diagrams/ai-oop/visual15-kmeans-assign.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-kmeans-assign.webp)) | visual15-kmeans-update ([SVG](../docs/diagrams/ai-oop/visual15-kmeans-update.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-kmeans-update.webp)) | 104,736 |
| [artificial-intelligence-final-perceptron](../courses/artificial-intelligence/summaries/final-perceptron.md) | visual15-perceptron-neuron ([SVG](../docs/diagrams/ai-oop/visual15-perceptron-neuron.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-perceptron-neuron.webp)) | visual15-perceptron-update ([SVG](../docs/diagrams/ai-oop/visual15-perceptron-update.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-perceptron-update.webp)) | 82,518 |
| [artificial-intelligence-final-backpropagation](../courses/artificial-intelligence/summaries/final-backpropagation.md) | visual15-backprop-forward ([SVG](../docs/diagrams/ai-oop/visual15-backprop-forward.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-backprop-forward.webp)) | visual15-backprop-gradient ([SVG](../docs/diagrams/ai-oop/visual15-backprop-gradient.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-backprop-gradient.webp)) | 104,982 |
| [artificial-intelligence-final-deep-learning-overview](../courses/artificial-intelligence/summaries/final-deep-learning-overview.md) | visual15-rnn-unrolled ([SVG](../docs/diagrams/ai-oop/visual15-rnn-unrolled.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-rnn-unrolled.webp)) | visual15-gan-roles ([SVG](../docs/diagrams/ai-oop/visual15-gan-roles.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-gan-roles.webp)) | 84,698 |
| [artificial-intelligence-final-cnn](../courses/artificial-intelligence/summaries/final-cnn.md) | visual15-cnn-no-flip ([SVG](../docs/diagrams/ai-oop/visual15-cnn-no-flip.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-cnn-no-flip.webp)) | visual15-cnn-pooling ([SVG](../docs/diagrams/ai-oop/visual15-cnn-pooling.svg) / [WebP](../courses/artificial-intelligence/summaries/images/visual15-cnn-pooling.webp)) | 86,724 |
| [oop-python-linked-list](../courses/oop-python/summaries/linked-list.md) | visual15-linked-references ([SVG](../docs/diagrams/ai-oop/visual15-linked-references.svg) / [WebP](../courses/oop-python/summaries/images/visual15-linked-references.webp)) | visual15-linked-insert ([SVG](../docs/diagrams/ai-oop/visual15-linked-insert.svg) / [WebP](../courses/oop-python/summaries/images/visual15-linked-insert.webp)) | 93,702 |
| [oop-python-classes-objects](../courses/oop-python/summaries/classes-objects.md) | visual15-class-instances ([SVG](../docs/diagrams/ai-oop/visual15-class-instances.svg) / [WebP](../courses/oop-python/summaries/images/visual15-class-instances.webp)) | visual15-object-alias ([SVG](../docs/diagrams/ai-oop/visual15-object-alias.svg) / [WebP](../courses/oop-python/summaries/images/visual15-object-alias.webp)) | 103,592 |
| [oop-python-encapsulation-properties](../courses/oop-python/summaries/encapsulation-properties.md) | visual15-property-validation ([SVG](../docs/diagrams/ai-oop/visual15-property-validation.svg) / [WebP](../courses/oop-python/summaries/images/visual15-property-validation.webp)) | visual15-property-state ([SVG](../docs/diagrams/ai-oop/visual15-property-state.svg) / [WebP](../courses/oop-python/summaries/images/visual15-property-state.webp)) | 94,570 |
| [oop-python-inheritance-mro](../courses/oop-python/summaries/inheritance-mro.md) | visual15-diamond-mro ([SVG](../docs/diagrams/ai-oop/visual15-diamond-mro.svg) / [WebP](../courses/oop-python/summaries/images/visual15-diamond-mro.webp)) | visual15-savings-dispatch ([SVG](../docs/diagrams/ai-oop/visual15-savings-dispatch.svg) / [WebP](../courses/oop-python/summaries/images/visual15-savings-dispatch.webp)) | 108,424 |
| [oop-python-polymorphism-abc](../courses/oop-python/summaries/polymorphism-abc.md) | visual15-polymorphic-area ([SVG](../docs/diagrams/ai-oop/visual15-polymorphic-area.svg) / [WebP](../courses/oop-python/summaries/images/visual15-polymorphic-area.webp)) | visual15-abc-duck ([SVG](../docs/diagrams/ai-oop/visual15-abc-duck.svg) / [WebP](../courses/oop-python/summaries/images/visual15-abc-duck.webp)) | 105,854 |
| [oop-python-object-relationships](../courses/oop-python/summaries/object-relationships.md) | visual15-team-player ([SVG](../docs/diagrams/ai-oop/visual15-team-player.svg) / [WebP](../courses/oop-python/summaries/images/visual15-team-player.webp)) | visual15-house-composition ([SVG](../docs/diagrams/ai-oop/visual15-house-composition.svg) / [WebP](../courses/oop-python/summaries/images/visual15-house-composition.webp)) | 100,214 |
| [oop-python-uml-solid](../courses/oop-python/summaries/uml-solid.md) | visual15-uml-symbols ([SVG](../docs/diagrams/ai-oop/visual15-uml-symbols.svg) / [WebP](../courses/oop-python/summaries/images/visual15-uml-symbols.webp)) | visual15-solid-service ([SVG](../docs/diagrams/ai-oop/visual15-solid-service.svg) / [WebP](../courses/oop-python/summaries/images/visual15-solid-service.webp)) | 107,714 |
| [oop-python-arrays-dynamic-array](../courses/oop-python/summaries/arrays-dynamic-array.md) | visual15-array-resize ([SVG](../docs/diagrams/ai-oop/visual15-array-resize.svg) / [WebP](../courses/oop-python/summaries/images/visual15-array-resize.webp)) | visual15-array-amortized ([SVG](../docs/diagrams/ai-oop/visual15-array-amortized.svg) / [WebP](../courses/oop-python/summaries/images/visual15-array-amortized.webp)) | 105,304 |
| [oop-python-stack](../courses/oop-python/summaries/stack.md) | visual15-stack-lifo ([SVG](../docs/diagrams/ai-oop/visual15-stack-lifo.svg) / [WebP](../courses/oop-python/summaries/images/visual15-stack-lifo.webp)) | visual15-postfix-operands ([SVG](../docs/diagrams/ai-oop/visual15-postfix-operands.svg) / [WebP](../courses/oop-python/summaries/images/visual15-postfix-operands.webp)) | 81,022 |
| [oop-python-queue](../courses/oop-python/summaries/queue.md) | visual15-queue-fifo ([SVG](../docs/diagrams/ai-oop/visual15-queue-fifo.svg) / [WebP](../courses/oop-python/summaries/images/visual15-queue-fifo.webp)) | visual15-queue-circular ([SVG](../docs/diagrams/ai-oop/visual15-queue-circular.svg) / [WebP](../courses/oop-python/summaries/images/visual15-queue-circular.webp)) | 101,314 |
| [oop-python-complexity-basic-sorting](../courses/oop-python/summaries/complexity-basic-sorting.md) | visual15-operation-growth ([SVG](../docs/diagrams/ai-oop/visual15-operation-growth.svg) / [WebP](../courses/oop-python/summaries/images/visual15-operation-growth.webp)) | visual15-bubble-passes ([SVG](../docs/diagrams/ai-oop/visual15-bubble-passes.svg) / [WebP](../courses/oop-python/summaries/images/visual15-bubble-passes.webp)) | 96,208 |
| [oop-python-advanced-sorting](../courses/oop-python/summaries/advanced-sorting.md) | visual15-merge-final ([SVG](../docs/diagrams/ai-oop/visual15-merge-final.svg) / [WebP](../courses/oop-python/summaries/images/visual15-merge-final.webp)) | visual15-quick-partition ([SVG](../docs/diagrams/ai-oop/visual15-quick-partition.svg) / [WebP](../courses/oop-python/summaries/images/visual15-quick-partition.webp)) | 93,080 |
| [oop-python-hash-tables](../courses/oop-python/summaries/hash-tables.md) | visual15-hash-collision ([SVG](../docs/diagrams/ai-oop/visual15-hash-collision.svg) / [WebP](../courses/oop-python/summaries/images/visual15-hash-collision.webp)) | visual15-hash-tombstone ([SVG](../docs/diagrams/ai-oop/visual15-hash-tombstone.svg) / [WebP](../courses/oop-python/summaries/images/visual15-hash-tombstone.webp)) | 105,922 |


## Academic and technical review

Independent references accessed2026-10-29 include the official Python tutorial/data-model/collections/sorting documentation, scikit-learn1.7 Naive Bayes/tree contracts, SciPy hierarchical-linkage definitions, and Stanford CS231n CNN notes. Exact per-figure URLs are retained in the manifest and visible source links. These references support technical claims; they do not prove what an inaccessible original slide or missing lab observation contained. Python behavior was executed on3.12.14, not inferred from a newer documentation default.

| Figures / model | Independently verified result |
|---|---|
| Agents / AI–ML–DL | SVG percept/action edge direction and qualified subset relationships; no invented proportions/performance |
| Search | Actual directed edge set, tuple successor order, discovered/visited distinction; BFS path S–B–G (2edges), frame DFS S–A–C–D–G (4edges), not a shortest-path claim |
| Regression | Fraction-based eight-tree OLS slope1703/375, intercept−493/375; x=9 residual3541/375; X07 errors0,2,−2 give MAE4/3, MSE8/3 and RMSEsqrt(8/3) |
| KNN | Full one-hot category mismatch squared distance2; X04 ranks8,10,4,3,2 vote C,Y,X,C,C → drugC; no unsupported scale/tie convention |
| Naive Bayes | Exact Judy scores1/18 and1/125 normalize125/143 and18/143; alpha1 Buy scores225/5488 and30/5488 normalize15/17 and2/17 |
| Decision Tree | Sunburn +3/−5 gives entropy.954434, weighted child entropy.5, gain.454434; original HairColor/Lotion leaf decisions |
| Hierarchical | Independent SciPy single-link heights2,3,4,5 and actual SVG dendrogram coordinates; all six cross-pairs average48/6=8 |
| K-Means | X05 first assignment0,2,1,1,1,1,2,1; updated centers(2,10),(6,6),(1.5,3.5); SSE37 |
| Perceptron | X06 strict z>0, first sample changes bias.1→−.4 only; not an invented L01 experiment |
| Backpropagation | Authored2-2-1 sigmoid forward values; independent NumPy loss plus18 finite-difference derivatives, old-weight chain rule and gradient-descent sign |
| Deep Learning | Shared RNN parameter topology and conceptual GAN roles; no training/performance/clinical inference |
| CNN | SciPy no-flip correlation yields228,408/273,453; exact max and mean pooling matrices |
| Linked List / class / properties | Execute original Python reference identity, insertion order, independent instance state, aliasing and validation invariants |
| MRO / polymorphism / ownership / UML | Execute D(B,C) MRO/dispatch/ABC/duck typing; verify actual SVG triangle/diamond ends; design ownership is not a Python destruction guarantee |
| Arrays / Stack / Queue | Declared doubling costs15 for8 appends, not CPython growth; pop right operand first; singleton head/tail reset; circular raw/logical order |
| Complexity / sorting / hash | Stated operation models; Bubble10 comparisons/7 swaps; final Merge left exhausted first; exact Lomuto split1; bounded probing and tombstone update retain unique key |

[Model checks](../scripts/check-ai-oop-visual-models.py) passed all50 scoped models, including actual SVG graph edges/markers/geometry and reviewed source-code execution, separately from rendering checks. Existing AI independent suites passed160 graph comparisons,80 OLS cases,24 categorical KNN comparisons,78 categorical NB cases,80 information-gain cases,75 SciPy linkage cases,40 K-Means cases,30 perceptron cases,909 gradient checks/101 losses,80 SciPy correlations and48 pooling references. OOP foundation/data-structure and Phase9 independent suites passed. Existing tests' historical slide-review statements are not new original-PDF inspections by this phase. Optional private300-row workbook/cell re-audits were not rerun.

### Review ledger and unresolved qualifications

No new confirmed error in existing academic content was found within these50 diagram contracts. Existing source ambiguities remain explicit:Drug R8 differs between S07 and X04; clustering ties/cuts and distances require the stated source matrix; CNN uses no-flip cross-correlation; source-caption Merge exhaustion is qualified; perceptron threshold/activation and backprop old-weight conventions are preserved. Neural lab screenshots/settings, empirical training behavior and unpublished observations remain source-limited. Do not infer exam weighting, benchmark timings or measured model quality from these figures.

Rendered-review corrections affected artwork only:separate Search D→G arrow termination; wrap Sunburn leaf labels; shorten a Rectangle node and ABC card label; color Bubble's fully sorted final pass consistently. Label bounds, card padding and no-overlap checks passed after correction. Five pixel hashes changed but all50 intrinsic dimensions stayed identical;40 targeted delayed-image cases were repeated for those assets. No source theory, question key or original PDF was corrected in this PR.

## Executed QA

| Category | Executed result |
|---|---|
| Full build/check and deterministic double build | PASS:46 lessons/70 catalog documents; all original suites plus new50-asset/static preservation checks; repeated SVG/raster/Markdown/reader output deterministic |
| Preservation | PASS:271 original-file hashes after removing only the50 exact new figure blocks and scoped stylesheet links;46 stable identities,1380 immutable questions,370 historical anchors,15 raw PDF hashes, all IoT images/water PNG/CSS, catalog/manifest, study/preferences/graders unchanged |
| Delayed-image CLS | PASS:400 fresh cache-disabled Chrome contexts (50figures × Classic/Modern ×320/390/1024/1440), real responses held pending then decoded; maximum image-box change0px, caption0px, following content0px, scroll0px, image-induced CLS0. Additional40 cases after five bitmap cleanups also0 |
| Surfaces | PASS:all50 real reader figures/sections/alt/captions/source links;200 layout/width cases,350 palette/mode cases;TH/EN,22px narrow font, keyboard source-link/Tab,caption contrast≥4.5,primary figure labels≥14CSSpx at320; no page overflow, local asset failures or application/console errors |
| Screenshots | Reviewed all25 desktop/mobile reader screenshots and all25 detailed two-figure previews. Re-reviewed final Search/Sunburn/ABC/Bubble figures and latest reader contact sheets. Screenshots are local QA artifacts, not committed |
| No JavaScript / print | PASS:25 no-JS readers retain figures and6-question static Practice fallback.25 actual A4 exports; all50 image instances proportional and inside page bounds across517 original-content pages. Visually inspected representative CNN/MRO/Hash print pages, not all517 pages |
| Practice / Exam | PASS:15 pilot browser sessions;all46 banks/1380 questions,correct/incorrect/numeric checks,retry/restart/review/scores,self-assessment exclusion,persistence/cross-tab/focus/denied storage; no bank changes |
| Insights / historical results | PASS:P11.1 invariant10/15=66.7% after self-only edits and two-tab updates; archives/malformed/denied reads and zero dashboard writes. All3 revision1 migration contexts,12 new sessions, quota failure and archived prompts/keys preserved |
| Reader / other systems | PASS:24 large-font/narrow reader cases and6 keyboard TOC/anchor cases; illustrated OOP Stack bookmark→Continue Reading→exact140px anchor restoration/reset; original Linked List step/reset; real PDF page3/150% refresh/native fallback/download/mobile; homepage KNN search→illustrated reader→Back and OOP/AI summaries navigation at390px |
| Existing IoT regressions | PASS:25 diagrams in9 readers,72 viewport cases,14 palette/mode cases,no-JS/keyboard/print;original Water PNG8 delayed-response cases retain CLS0 |
| Protected worktrees | PASS:26 other worktree HEAD/index/working-diff/dirty-file snapshots unchanged; no original teaching files were published or edited |

Preservation helpers remove only the exact manifest-defined additions before comparing old golden hashes; the historic hash baselines and question evidence remain unchanged. The real Linked List fixture now copies its declared local images into its temporary directory. The old evidence-prefix checks inspect unchanged original prose after stripping known figure blocks. No security/answer/identity test was relaxed to accept unrelated changes.

## Remaining limits

Desktop Chrome156 with emulated widths was executed; Safari, Firefox, physical devices, actual assistive-technology behavior and field CLS remain untested. Descriptive Thai alternatives/explanations and keyboard checks support accessibility but do not certify screen-reader usability. Raster labels do not grow with browser font preferences; primary labels were checked at the narrowest width and accompanying HTML explanations do scale. Large figures lengthen lessons; stable anchors and section-relative resume are preserved, but old unanchored absolute pixel offsets may visually refer to a different position after additive content. Original content and stored data are unchanged and no migration/clearing is performed.

Clean print geometry was checked for all50 figures; representative pages were visually reviewed, not every original lesson page. This task verifies scoped illustrations and preserves prior academic corrections; it does not certify every original lecturer statement, answer bank or empirical observation anew. No merge or deployment is included; after merge, production URLs/hash/version/uncached CLS should be verified separately.
