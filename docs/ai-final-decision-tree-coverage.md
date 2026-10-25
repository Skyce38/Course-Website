# FINAL Decision Tree coverage

Stable ID `artificial-intelligence-final-decision-tree`; [Markdown](../courses/artificial-intelligence/summaries/final-decision-tree.md), [reader](../read/artificial-intelligence/final-decision-tree.html). Six authored practice exercises; one runnable standard-library Python example. Source PDFs/private CSV files are not committed.

| Evidence inspected visually | Coverage |
|---|---|
| S08 `Final/Decision Tree Slide.pdf` pp.3–7 | Terms/if–then, Sunburn background, eight records, ID3 |
| S08 pp.8–12 | HairColor/Lotion trees, alternative consistent tree, Occam and split diagrams |
| S08 pp.13–17 | Weighted gain, root/subtree scores, final tree and four rules |
| A01 `Assignment/Assignment_DecisionTree.pdf` p.1; D01 `Assignment/play_tennis.csv` | Same 14 PlayTennis records (Overcast case normalized for display), log table; full root/subtree recalculation |
| A04 `Assignment/example.pdf` pp.1–6 | Handwritten Sunburn work/log table; not official-answer authority |
| A05 `Assignment/Lab_Sol.pdf` pp.1–3 | Worked root gains/subtree prompts/final PlayTennis tree; checked independently |
| A06 inventory alias `Assignment/[student-id]Decision Tree File.pdf` pp.1–4 | Handwritten gain calculations; identifiers/images excluded, no official-answer claim |

All source pages were rendered/read, not inferred from filename/text extraction. Sunburn entropy .954434; gains Hair .454434, Height .265712, Weight .015712, Lotion .347590; blonde subtree Height .5, Weight 0, Lotion 1. Source slide/handwritten rounded values are not silently substituted for exact arithmetic. PlayTennis entropy .940286; root gains Outlook .246750, Temperature .029223, Humidity .151836, Wind .048127. Sunny chooses Humidity, Rain chooses Wind; tree agrees with A05 p.3. A05/A06's approximate Temperature .01 differs from exact .029223, explained as coarse intermediate calculations rather than published as a precise answer. All 8/14 training labels are reproduced; no held-out accuracy claimed.

Entropy zero-count convention, unknown-category majority fallback/ties and validation/generalization caveats are authored explanations. S08 p.6's 8/54 is combination coverage, not an unconditional probability guarantee; greedy gain/Occam are not universal optimality proofs. No private identifier or source image reproduced.

Validation: `python scripts/check-ai-final-stage-b.py --source-root <local AI source directory>` checks original D01, every root/subtree selection/prediction, 80 independent mutual-information comparisons, and hierarchical calculations. Source and protected-worktree fingerprints are checked in consolidated QA. Generated HTML is rebuilt from Markdown.
