# FINAL Classification & KNN — Coverage and Verification

[Markdown](../courses/artificial-intelligence/summaries/final-knn.md) → [reader](../read/artificial-intelligence/final-knn.html); stable ID `artificial-intelligence-final-knn`. One integration candidate pending review/merge. No Naive Bayes lesson or frontend framework.

## Verified sources

Local-only sources below `FinalSource/Artificial Intelligence/` are read-only. No PDF/workbook copies or broken public source links are added. Physical S07 pp.2–5 were rendered and inspected directly; pages 6–8 are outside this lesson.

| Source | Evidence | Lesson |
|---|---|---|
| S07 `Final/KNN_NB_Classification.pdf`, p.2 | Discrete classification illustration | classification |
| S07 p.3 | Ten Drug rows, categorical target and query Age=36/F/LOW/HIGH/Na=.697/K=.069 | features, drug-worked |
| S07 p.4 | Distance/neighbor/vote process, left k=3 and separate right five-neighbor illustration; no published coordinate table | algorithm, choosing-k |
| S07 p.5 | Built-in Iris, split test_size=.3/random_state=42, KNeighborsClassifier(k=3), accuracy_score | iris |
| X01 `Assignment/input.xlsx` | Train!A1:E11, Test!A1:E2: ten Buy rows, four features, query with Buy?=?? | buy-worked, python-manual |
| X02 inventory alias | Byte-identical duplicate of X01; exact private duplicate filename not published; not independent data | buy-worked |
| X03 `Assignment/input_sol.xlsx` | Train/Test and KNN!A1:Q13; full one-hot G:O, query row 13, k=3, distances Q2:Q11 | buy-encoding, buy-worked |
| X04 `Assignment/KNN_Example.xlsx` | KNN!A1:J14; encoded Drug, query row 13, k=5 at I14, distances J2:J11 | drug-encoding, drug-worked |
| C01 `Assignment/lab_sol.py` | Relevant imports, feature/target/query lines 12–27 and KNN lines 34–43 | python-sklearn |

## Independently verified calculations

- Drug uses feature order Age, Sex_F, Sex_M, BP, Cholesterol, Na, K; no normalization. Comparing raw slide words with X04 gives BP LOW/NORMAL/HIGH=1/2/3 and observed Cholesterol NORMAL/HIGH=2/3. No invented extra category/measurement unit or Na/K ratio. Raw values/encoded vectors and all ten cached distances independently match exact decimal-rational squared-distance calculations.
- Drug d² by original row: [173.010660,123.001933,123.000000,65.017698,625.020488,197.000500,170.009049,25.004900,579.006724,52.031005]. Ranking [8,10,4,3,2,7,1,6,9,5]; k=5 votes drugC=3/drugY=1/drugX=1 → drugC. R3 is slightly nearer than R2; rank before rounding.
- Buy full one-hot has 9 coordinates. For each differing category d² increases by 2. Mismatch counts [1,2,3,1,2,3,4,1,2,2], distances [√2,2,√6,√2,2,√6,√8,√2,2,2]; ranking [1,4,8,2,5,9,10,3,6,7]. k=3 gives Y,Y,Y → Y. Unknown ground-truth Test label remains ??; proposed X03 Y is not a measured test outcome.
- Incomplete formula cells (`=`) in X03 are outside the used KNN sheet. Only KNN raw data/encoding/formulas/cache values were audited as teaching evidence; incomplete cells are not trusted or silently repaired. No native Excel recalculation claim.
- Manual tie conventions: original row first for equal distances; alphabetical label for equal vote counts. sklearn may choose different neighbor subsets at boundary ties, so the lesson does not promise identical behavior for all tied datasets. Actual Drug/Buy query votes are unambiguous under the stated setup. OneHotEncoder's category-order permutation preserves distance; its handle_unknown='ignore' differs explicitly from the manual helper's error policy.
- C01's original KNN segment was executed read-only, substituting only the absolute path passed to read_excel; result Y. Imports/fit for its other model were excluded. No source file was modified.
- Iris source split reproduced: train 105/test 45; k=3; training correct 99/105≈.942857, test 45/45=1.0. Training-score comparison is authored; slide shows evaluation code, not a guaranteed printed score. No stratify/scaling added. Accuracy is limited to that dataset/split/implementation, not universal performance.
- Eight practice exercises, detailed solutions, distance formulas/explanations, validation/scaling/encoding cautions and reported runtime results are independently authored. They are not official lecturer answer keys. No invented numeric coordinates for p.4 illustrations.

## Fingerprints (SHA-256)

| Source | Hash |
|---|---|
| S07 | 85ae6bac0e5fe7f98a5e689413bf3e4129aaefc07e8abce23ad8e2865ba33f72 |
| X01/X02 | 1a7114d4331b5cc0bbda09f249a6b880489cde69435452818a25126f1cfed2de |
| X03 | 738c8372d7807866fc7f833cf97c6b1717b916fccf9aa1a63187cd54a5f55e07 |
| X04 | 4ea9038cc3dafddca56359fec892edc8bccd28b2c1efe64f38fccbcd9180766d |
| C01 | f8e5737afa13888edc7864658a46eef472f9474278ae3f66a4428b617b93e4b3 |

## Reproducible author checks

`python scripts/check-ai-knn.py` needs scikit-learn for the three offline code blocks. It checks exact outputs/tables, rational Drug distances, Buy Hamming/one-hot equivalence, 24 categorical queries against sklearn distances, votes, ties/invalid inputs and Iris scores. Optional `--source-root <local AI source directory>` additionally verifies source fingerprints, X01/X02 identity, raw workbook data/encodings/distance caches and the original C01 KNN segment (requires pandas/openpyxl). No source writes; without local sources that audit is explicitly NOT RUN.

Verification environment: scikit-learn 1.7.2, SciPy 1.16.3, NumPy 2.3.5, joblib 1.5.2, threadpoolctl 3.6.0. Missing Python test libraries were installed only in a temporary directory outside Git. No website dependency/manifest, runtime JS or shared CSS changed. Existing KaTeX/code viewers/static tables suffice.

AI path appends FINAL KNN after FINAL Regression. This is a temporary publication order, not a verified teaching sequence; existing Foundations/Search/Regression IDs and OOP path remain unchanged. Naive Bayes and paused Midterm generation are not implemented here.


## Final QA results

- PASS: all three reviewed Python blocks, Drug rational squared distances and exact ranking/vote, Buy full one-hot/Hamming equivalence across 24 categorical queries and sklearn, original C01 KNN-only execution, Iris 99/105 train and 45/45 test. Source fingerprints/raw worksheet values/formulas/cache checks and X01/X02 duplicate detection passed. Incomplete X03 cells are outside KNN and excluded; no native Excel recalculation claimed.
- PASS: build/check suite, deterministic repeated output, current templates/heading IDs, one new resource and four-lesson path order. Existing catalog resources/IDs, OOP path and eleven existing reader contents unchanged.
- PASS: 12 Chrome Classic/Modern × Light/Dark × 1440/390/320px combinations with TH/EN UI; Thai prose unchanged on UI switch, tables/math/local assets, TOC/anchors/keyboard, clipboard, path boundaries/Back/Forward, Continue Learning exact resume, completion/bookmark/reset, all six palettes plus Custom, theme-color/SVG/focus preservation. No console errors, failed local assets or page overflow. Desktop, mobile and narrow Drug-table screenshots reviewed.
- PASS: all 15 original site PDF bytes and nine protected worktrees (3,284 file hashes plus exact branches/status/staging) unchanged. No original sources, private duplicate filename, temporary environments/renders/screenshots or unrelated assets included.
- Limitations: Chrome mobile viewport emulation only; Safari/Firefox, physical devices and assistive-technology speech not tested. Sources remain local-only; no official answer-key/generalization claim. Reproducing sklearn examples requires offline Python dependencies, not new frontend dependencies. Iris results are specific to the documented split/version; boundary-distance ties require declared conventions.
