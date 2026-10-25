# Combined AI FINAL lessons — release verification

Scope: reuse the verified Naive Bayes draft, then complete only source-supported AI FINAL lessons. Midterm A*/game-search/logic work remains paused. All additions are Thai lesson content, source-coverage notes, offline verification and registration through the existing builder. No shared UI/runtime/storage-schema changes or new frontend dependencies.

## Lessons and evidence

Every ID below has prefix `artificial-intelligence-`. All are implemented in this branch, pending one combined PR/merge; not claimed deployed. Sources are local-only under the AI source inventory, not committed. Page numbers are physical PDF pages.

| ID suffix / lesson | Primary coverage | Solved exercises | Independent checks |
|---|---|---:|---|
| `final-naive-bayes` | S07 pp.6–8; X01/X03; C01 NB segment | 8 | Reused Markdown byte-for-byte; Judy + scores1/18 and1/125; Buy Y, alpha1 posterior15/17;78 categorical comparisons;45 Gaussian held-out rows |
| `final-decision-tree` | S08 pp.3–17; A01/A04/A05/A06;D01 | 6 | All sunburn/PlayTennis frequencies, root/subtree gains and trees;80 independent mutual-information comparisons |
| `final-hierarchical-clustering` | S09 pp.2–30,46 | 5 | Both source matrices, every merge/cross-distance;75 SciPy linkage comparisons |
| `final-kmeans` | S09 pp.31–46;A02p.1;X05 | 5 | A02 all15 points/3rounds/SSE183725/6; X05 all96 distances/32 assignments/4rounds/SSE43/3;40 independent traces |
| `final-perceptron` | S10 pp.2–18,25;X06;L01 | 6 | All24 workbook sequential updates, strict0/1 rule, final(-1.4,1.1,.6);30 varied references;XOR/zero/tie conventions |
| `final-backpropagation` | S10 pp.19–24;S11pp.2–5 | 6 | Source XOR weights;909 finite-difference derivatives/101 independent losses;all9 simultaneous updates;sign/bias/loss convention |
| `final-deep-learning-overview` | S11 pp.2–11 | 5 | All source diagrams inspected;conceptual mappings/roles/limitations;authored affine-composition example |
| `final-cnn` | S11 pp.12–33 | 8 | Every source matrix,outputsize,padding,pooling,ReLU,flatten,RGB;80 independent correlations+48 pooling reductions |

Total: **8 complete lessons,49 independently authored solved exercises**. Python examples are displayed/copied as code, never executed by the website. Source-derived examples, authored explanations/solutions and unsupported results remain distinguished. No official answer-key or exam-weight claims.

F11/AI-L19: [source-limited lab preparation guide](ai-final-neural-training-lab-preparation.md) only. Source L02 lines1–60 and S11pp.2–5 reviewed. Referenced figures1–4/screenshots and complete reproducible settings remain unavailable after local source/repository search. Reported200/6838/2400epochs are not verified runs. Guide is **not** registered in catalog/registry/path; no fabricated lab completion.

## Integration and compatibility

AI path: Foundations → Search/BFS–DFS → FINAL Regression → KNN → Naive Bayes → Decision Tree → Hierarchical → K-Means → Perceptron → Backpropagation → DL/RNN/GAN Overview → CNN. This is temporary publication order, not verified teaching chronology; no placeholder Midterm lessons. Existing lesson IDs, OOP path and saved-data formats remain unchanged. Shared Classic/Modern, themes, localization, TOC, completion, bookmarks, history, resume/reset and PDF controls reused.

## Executed validation

- `node scripts/build.cjs`, `node scripts/check.cjs`: existing repository suites for metadata, contracts/XSS, KaTeX/images, preferences/themes, bilingual labels, saved-study state, paths and PDF-source safety.
- Deterministic double build: generated readers/catalog/homepage compared by hash. Catalog/path entries unique;13 registered Markdown lessons total (12AI+1OOP),37resources/6courses.
- Offline author checks: `scripts/check-ai-naive-bayes.py` and `scripts/check-ai-final-stage-{b,c,d,e}.py`; source-root option reads originals only. NumPy/SciPy/scikit-learn/openpyxl are author-test tools from an external temporary environment, never website/runtime dependencies. Earlier published lesson numerical checks retained.
- Stage browser checks: each of the7 newly authored readers at1440Modern/Dark/EN,390Classic/Light/TH,320Modern/Light/TH; TOC IDs, raw UI keys, code copy, responsive overflow and console errors. Representative screenshots reviewed at each size, including narrow typography. Existing Naive Bayes12-case reader results reused.
- Combined isolated Chrome pass: bothlayouts/languages/modes; all12AIpath neighbors/current/boundaries; Back/Forward; Continue Learning exact section/offset restoration onrefresh; completion persistence, bookmarks/reset; all6palettes/custom rapidLight/Dark withSVG/DOM/focus preservation; existingOOP keyboardtraversal/reset; localPDFpage/zoom refresh/downloadlink/nativefallback. No console errors or failed local requests. GitHub API tree mocked to isolate shared UI; no live sync write performed.
- Integrity: all11protected worktrees checked against initial branch/status/staged-diff/filehash snapshot; all15originalPDFs byte-identical; existing lesson content/readers unchanged. Private sources, temporary previews/screenshots/Python environments and credentials excluded.

## Reproduce locally

From this checkout, `node scripts/build.cjs` then `node scripts/check.cjs`. Serve its parent directory with a static HTTPserver; URLprefix `/Course-Website/` (e.g. `http://127.0.0.1:8776/Course-Website/`). Open `read/artificial-intelligence/final-cnn.html`, or select Artificial Intelligence on homepage. Author numerical checks require the documented scientific Python tooling; optionally pass `--source-root` to B/C/NB when originals are locally available. No private source files are needed to build/serve the website.

## Honest limits

Chrome desktop automation/mobile viewport emulation only; Safari/Firefox and physical devices not run. Native PDF controls cannot expose arbitrary internal scroll/page changes; existing tracked PDF.js and fallback behavior preserved. Source K-Means scatter/elbow lacks exact coordinates; original elbow values are reported rather than fabricated as reproduced. L01 run lacks dataset/screenshot. S11p.16 caption312 disagrees with displayed sum/image228 (flipped-kernel312 is a separate convention); p.25 source roundedaverages3.3/4.8 clarified as3.25/4.75. FC source gives no weights for final classification. No fullRNN/GANtraining or missinglab measurements invented. User/instructor academic review remains appropriate before merge.
