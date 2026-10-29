# AI & OOP visual learning — source and validation ledger

Baseline: `41ae0f2440c4161ec90068a495e28a9cd31e3f77` (merged Phase 14.1). Scope: 12 AI + 13 OOP registered lessons, two original figures each. Existing prose, code, formulas, question banks, identifiers, anchors and storage contracts are immutable in this visual-only change.

## Checkpoint A — source audit

All 25 registered Markdown sources were read, including examples, code, assumptions, exercises and references. Contracts are the current source-verified lessons and the documented [AI inventory](ai-source-coverage.md), [Phase 9 audit](phase9-academic-audit.md), relevant AI coverage ledgers, [OOP coverage](oop-lesson-coverage.md) and [OOP curriculum map](oop-curriculum-map.md). Earlier original-PDF inspections are attributed to those records, not claimed as fresh inspections by this phase. Local AI Final originals are available in the primary checkout; they remain read-only and outside this worktree. Missing lab screenshots/settings remain unverified. No original slide artwork or private submissions will be copied.

| Lesson | Two planned learning questions / exact contract |
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
- Status: checkpoint A complete; implementation and executed QA results will be recorded below before release.
