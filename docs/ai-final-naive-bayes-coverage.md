# FINAL Naive Bayes — Coverage and Verification

[Markdown](../courses/artificial-intelligence/summaries/final-naive-bayes.md) → [generated reader](../read/artificial-intelligence/final-naive-bayes.html). Stable ID `artificial-intelligence-final-naive-bayes`. One integration candidate pending review/merge; no Decision Tree or new frontend dependency.

## Verified sources

Sources under local `FinalSource/Artificial Intelligence/` are read-only and not published here. S07 physical pp.6–8 were rendered and visually inspected, including the query-name crop; no numeric values were inferred from the p.6 illustration without a data table.

| Source | Evidence | Lesson anchors |
|---|---|---|
| S07 `Final/KNN_NB_Classification.pdf`, p.6 | Bayes formula, feature vector, conditional-independence statement, illustrative Feature1/2 and Class A/B/C chart | bayes, independence |
| S07 p.7 | Eight rows (Hair/Height/Weight/Lotion/Result), query and raw scores 1/18 vs 1/125, prediction + | judy, judy-counts, judy-calculation |
| S07 p.8 | GaussianNB/Iris, test_size=.3/random_state=42, test accuracy code; no printed accuracy claim | gaussian, python-gaussian |
| X01 `Assignment/input.xlsx` | Train!A1:E11, Test!A1:E2: ten Buy rows and unknown label ??; X02 duplicate is not independent data | buy, python-manual |
| X03 `Assignment/input_sol.xlsx` | NaiveBayes!A1:M16; raw query factors G3:K3/G6:K6, products M3/M6; L3/L6 contain incomplete `=` formulas and are excluded | buy-raw |
| C01 `Assignment/lab_sol.py` | Existing features/query, NB lines 50–59: OrdinalEncoder, integer category indices and default CategoricalNB | encoding, python-categorical |

**Necessary source-name correction:** the image spells the query **Judy**, not July. Earlier curriculum notes/request used July. Lesson and map keep that alias explicit while correcting the source attribution. The Name column is not a feature; all four query values and probability calculations are unchanged. No unsupported meaning is assigned to +/−.

## Verified numerical results and assumptions

- Judy: 3 positive/5 negative rows; priors 3/8,5/8. Query factors for +: 2/3,2/3,1/3,3/3; for −: 2/5,1/5,2/5,2/5. Raw scores 1/18,1/125 match slide; select +. Authored normalization: Z=143/2250, posterior +125/143, −18/143. Model evidence from independent likelihood products is not asserted to be observed joint frequency.
- Buy Y/N priors each 1/2. Query factors Y=[4/5,4/5,2/5,2/5], N=[2/5,0,4/5,1/5]. Raw scores Y=32/625,N=0; nonzero evidence allows posterior [N=0,Y=1] under this unsmoothed model, not certain real-world purchase/test accuracy.
- C01's tested CategoricalNB defaults: alpha=1, fit_prior=True, class_prior=None, force_alpha=True; category counts [2,2,2,3], not the unsmoothed worksheet convention. Smoothed scores Y=225/5488,N=30/5488, posterior [N=2/17,Y=15/17], prediction Y. Original NB-only C01 segment was executed with source-verified inputs; no KNN/other segment run.
- OrdinalEncoder's tested category order gives query [0,0,0,2]. Indices identify categories, not numeric distances or Gaussian measurements. Default unknown-category error remains distinct from a declared known-but-unobserved vocabulary. Manual helper supports nonnegative integer alpha for exact rational arithmetic.
- Authored zero example: Red→A,Blue→B; vocabulary Red/Blue/Green declared beforehand. Query Green gives both scores zero with alpha=0 (normalization rejected); alpha=1,K=3 gives scores 1/8 each and posterior 1/2 each. A forced class decision would need an additional tie rule; no silent fallback.
- Authored Gaussian example: x=0, A mean0/variance1, B mean2/variance1, priors .5 each; densities .398942/.053991, scores .199471/.026995, posterior A .880797. Density is not categorical point probability.
- Iris p.8 reproduction uses GaussianNB default priors=None/var_smoothing=1e-9, 105 train/45 test. Train 99/105≈.942857 and test 44/45≈.977778 are reproduced results, not scores printed/guaranteed by lecturer. Independent Gaussian means/variances/variance-smoothing/log-density normalization match all 45 test predictions/probabilities.
- Eight exercises/solutions, basic probability explanations, normalized posteriors, smoothing/zero cases, density derivation/examples and extra train-score print are authored supplements, clearly labelled. No official-answer-key, population-accuracy or causal claim; original dataset values/units/category meanings preserved.

## Source SHA-256

| Source | Hash |
|---|---|
| S07 | 85ae6bac0e5fe7f98a5e689413bf3e4129aaefc07e8abce23ad8e2865ba33f72 |
| X01/X02 | 1a7114d4331b5cc0bbda09f249a6b880489cde69435452818a25126f1cfed2de |
| X03 | 738c8372d7807866fc7f833cf97c6b1717b916fccf9aa1a63187cd54a5f55e07 |
| C01 | f8e5737afa13888edc7864658a46eef472f9474278ae3f66a4428b617b93e4b3 |

## Reproducible validation

`python scripts/check-ai-naive-bayes.py` executes the three reviewed lesson code blocks offline; checks both full frequency tables, exact rational scores/posteriors, model evidence summing to one, 78 categorical queries against sklearn, zero/vocabulary/invalid cases, Gaussian example and independent Gaussian test-row scores. Requires scikit-learn. Optional `--source-root <local AI source directory>` checks source hashes/raw Buy data, workbook formulas/caches and original C01 NB-only execution with pandas/openpyxl; without sources it explicitly reports that audit NOT RUN. No source writes or Excel recalculation claim.

Verification reuses the previous temporary Python environment outside Git: scikit-learn 1.7.2, SciPy 1.16.3, NumPy 2.3.5. No repository dependency manifest, shared JS/CSS, saved-data schema or source document changed. Current registry/catalog/build and path append after FINAL KNN; temporary publication-order disclaimer and all existing IDs/OOP behavior retained.

Before implementation, PR #14 was verified on origin/main and its Pages workflow completed successfully ([run](https://github.com/Skyce38/Course-Website/actions/runs/40129461538)); live KNN reader returned HTTP 200 with its stable ID. This does not claim deployment of this new Naive Bayes branch.


## Final QA results

- PASS: three lesson Python blocks, two full frequency tables, exact Judy/Buy scores/posteriors, smoothing/zero-evidence/vocabulary cases, model evidence normalization; 78 categorical queries against sklearn and independent Gaussian log-density scores/posteriors on all 45 Iris test rows. Optional local-source audit executed: four source fingerprints/raw Buy/workbook formula-cache checks; incomplete L3/L6 excluded; original C01 NB-only prediction Y with alpha=1.
- PASS: final build/check suite, deterministic repeated output, catalog/path integrity, current template/heading IDs/relative assets. Exactly one new resource; existing path prefixes/OOP and twelve published reader contents unchanged. No source workbook/PDF or saved-data schema changes.
- PASS: 12 Chrome Classic/Modern × Light/Dark × 1440/390/320px combinations with TH/EN UI; unchanged Thai lesson prose, KaTeX/local assets, TOC/anchors/keyboard, copying, five-lesson path boundaries/Back/Forward, Continue Learning exact resume, completion/bookmarks/reset, all six palettes plus Custom and theme-color/SVG/focus preservation. No page overflow, console errors or failed local assets. Desktop/mobile/narrow screenshots reviewed; focused MathML/TeX and keyboard equation-scroll check passed; full frequency table readable at 320px.
- PASS: all 15 original site PDFs byte-identical; ten protected worktrees retain 3,659 file hashes and exact branch/status/staging snapshots. Extracts, renders, screenshots and temporary Python environments remain outside Git.
- Limitations: Chrome mobile viewport emulation only; Safari/Firefox, physical devices and assistive-technology speech not tested. Local-only original sources are not available as public downloads. No native Excel recalculation, official-answer-key or population-performance claim. Scientific Python dependencies are offline author/student requirements, not website dependencies. Judy/July source-name correction is explicitly documented.
