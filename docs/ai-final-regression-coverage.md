# FINAL Regression — Source Coverage and QA

One Thai lesson: [Markdown](../courses/artificial-intelligence/summaries/final-regression.md) → [generated reader](../read/artificial-intelligence/final-regression.html). Stable resource ID: `artificial-intelligence-final-regression`. Integration candidate pending user review/merge; no deployment claim.

## Verified source material

Sources are read-only under local `FinalSource/Artificial Intelligence/`. They are not copied into this branch or linked as nonexistent public downloads. S06 physical pages 2–13 and A03 p.1 were rendered and visually inspected; formulas, scatter plots, table values, labels and units were read from the images, not inferred from empty text extraction.

| ID / exact relative source path | Verified coverage | Lesson anchors |
|---|---|---|
| S06 `Final/Linear Regression.pdf` pp.2–5 | Positive/negative/curved, strong/weak/no linear trend; approximate r figures −1, −0.6, 0, +0.3, +1 | correlation |
| S06 p.6 | Centered and raw-sum Pearson sample-correlation formulas | correlation |
| S06 pp.7–8 | Eight tree diameter/height pairs, sums, scatter plot and r≈0.886; measurement units are not supplied | tree-correlation |
| S06 pp.9–11 | Single predictor, linear/nonlinear/no-trend figures, estimated regression line and intercept/slope; causal wording qualified as modeling assumption, not proof | simple-regression |
| S06 pp.12–13 | Least-squares SSE criterion, slope and intercept formulas | least-squares |
| A03 `Assignment/Ex_regression.pdf` p.1 | Eight households, income in thousand baht and food expenses in hundred baht, regression-equation exercise | household |
| X07 `Assignment/regression_example.xlsx` | regression!B3:E15 and G3:J11; full coefficients C14/C15 vs hardcoded rounded prediction −3.12+0.51X; residuals/absolute errors/MAE; err!A1:E9 defines the separate [2,2,0]/[2,0,2] example, mean absolute/squared error and square root | rounding, errors |
| C02 `Assignment/mlr.py` lines 1–15 | Four feature names/order, PerformanceIndex target, fit all rows, query [2,65,5,4]; misleading variable name predictedCO2 is explained, original unchanged | multiple, full-dataset |
| D03 `Assignment/StudentPerformance.csv` | Header and 300 numeric records; first eight rows used in the self-contained code example; whole-file OLS independently checked | python-multiple, full-dataset |

## Attribution, calculations and limits

- Supervised recap, regression fitted to the tree-correlation dataset, code adaptations, error/causation/validation cautions, and all eight exercise solutions are independently authored supplements. Not an official answer key; no invented exam weighting.
- Trees: Σx=73, Σy=321, Σxy=3142, Σx²=713, Σy²=14111; r=0.8862312198. Supplemental OLS b₀=−493/375, b₁=1703/375; prediction at x=10 is 44.0986666667, in the unspecified source height units.
- Households: ΣX=143, ΣY=48, ΣXY=937, ΣX²=2711; b₀=−3863/1239, b₁=632/1239. At X=18: prediction 6.0637610977 hundred baht and residual 0.9362389023 hundred baht. Slope ≈51.0089 baht of predicted food expense per additional 1,000 baht income.
- Full-precision household fit: MAE 0.7122679580, MSE 0.7128732849, RMSE 0.8443182367. X07 rounded line: MAE 0.71125, MSE 0.7128875, RMSE 0.8443266548. The workbook's lower rounded-line MAE does not contradict OLS minimizing SSE, not MAE. No source formulas were silently corrected.
- X07 err example: residual [0,2,−2], MAE 4/3, MSE 8/3, RMSE √(8/3). Cached values and formula text were checked and independently recomputed; native Excel recalculation/embedded chart rendering was not performed.
- D03 first-eight-row subset query: 43.0258188853; full 300-row query: 41.1274567780. These are distinct fits. Full coefficients [intercept, four features] ≈[−33.87464067,2.87802658,1.01804121,0.44378885,0.21360531]. Interpretation is conditional association, not causation or held-out accuracy. Source lacks a data dictionary/collection protocol.
- Multiple regression is supported by C02/D03, not claimed to be taught on S06. NumPy code implements the same OLS objective with the same feature/target order; the original pandas/scikit-learn C02 script was inspected but not executed (scikit-learn is unavailable in the bundled runtime). No package was installed. Only eight anonymous numeric rows are reproduced; full CSV/source documents remain local-only.

## Source fingerprints (SHA-256)

| Source | SHA-256 |
|---|---|
| S06 | b5d12cfd00fef73c45176f232ece876d8eeb9eaac7cf629f88e7abb7193a7d25 |
| A03 | c2aacf76a28331cc9320a4215dd30c2e38ef7dc136a1e931530c4f4b91ee8c0d |
| X07 | 2605c8dd34c0446c4460f374d44c047d904f0d9f5e9875836d666387b1b355f4 |
| C02 | 18abb8ee1db2a916170d09aa2d4e9824e74b475b1d36ffe4607a41a5f36122c3 |
| D03 | 7631c78833464875306dfa829fc4556e06cafb7d764b321816ba73ba162bdd73 |

## Integration and publication order

Registry/catalog use the existing schema. AI path is Foundations & Agents → Search Models & BFS/DFS → **FINAL Regression**. This is explicitly a temporary publication sequence, not a verified teaching order; BFS/DFS is not a conceptual prerequisite for regression. Existing OOP path/IDs, source documents and saved-data formats are preserved. No placeholder Midterm lessons; 8-Puzzle/A*, Minimax/Alpha-Beta and Knowledge Representation/Logic work remains untouched and further lesson generation is paused in favor of FINAL.

## Reproducible checks

- `python scripts/check-ai-regression.py`: execute three reviewed code blocks offline, validate exact outputs/source-sized tables and units/rounding, NumPy MLR subset vs an independent exact-rational solver, CSV helper in an isolated temporary directory, invalid/rank cases and 80 seeded OLS comparisons. NumPy is required only for offline Python examples/checks, not by the frontend.
- `python scripts/check-ai-regression.py --source-root <local AI source directory>` additionally checks all five source hashes, workbook formula/cache XML, D03 row/subset identity, and full 300-row coefficients/query against rational normal-equation elimination. It never writes the sources. Without this option, the unavailable local-source audit is explicitly reported NOT RUN.
- `node scripts/build.cjs` twice and `node scripts/check.cjs`: current shared lesson/rich Markdown, catalog/path, themes/i18n, state, visualizer and PDF-source checks. Browser and preservation results are recorded following final QA.


## Final QA results

- PASS: final build/check suite and deterministic double builds; all existing catalog resources/IDs, ten published reader contents, OOP path and saved-data formats unchanged. Only one new lesson; no placeholder curriculum entries.
- PASS: three reviewed Python blocks, exact sums/fractions/tables, rounding differences, error measures and units, NumPy subset/CSV helper, rank/invalid-data boundaries and 80 seeded OLS checks against exact arithmetic. Optional full-source audit was executed: all five original hashes, workbook formula/cache XML and 300-row OLS coefficients/query match independent rational elimination. No source was modified or Excel recalculation claimed.
- PASS: 12 Chrome layout/mode/language/width combinations (Classic/Modern, Light/Dark, TH/EN, 1440/390/320px); Thai prose preserved, KaTeX assets/MathML, TOC/anchors/keyboard, code clipboard copying, three-lesson path boundaries/Back/Forward, Continue Learning exact resume, completion/bookmarks/reset, palettes/theme-color/SVG/focus preservation. No console errors, failed local assets or page overflow.
- Desktop/mobile screenshots reviewed. Long equations scroll inside focusable math regions with keyboard input. Rounded-line table headings shortened to prevent two-digit X values wrapping at 320px; no shared CSS/JS changes.
- PASS: all 15 original site PDFs byte-identical and eight protected worktrees unchanged (2,913 file hashes plus exact branch/status/staging checks); S06/A03/X07/C02/D03 hashes unchanged. Screenshots, extracts and source files remain outside Git.
- Limitations: Chrome mobile viewport emulation only; Safari/Firefox, physical devices and assistive-technology speech not tested. Local-only full source files are not publicly downloadable. Original scikit-learn C02 was not run; the same full-data OLS calculation was independently verified using NumPy and exact arithmetic. No claim of held-out accuracy or official answer keys.
