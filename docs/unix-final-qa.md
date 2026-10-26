# Unix Final release QA

Status: READY for PR review. Validated 2026-10-27; no merge or deployment performed.

## Scope

12 source-supported Final lessons,360 unique Unix questions (300automatic/60self),37 total registered lessons and1110 total questions. Original25lessons/750questions/370anchors/15PDFs, legacy Unix resources, historical revisions and protected worktrees are preservation baselines, not replaced by the new totals.

## Executed validation

- **PASS — Sources:**16 available files /15 unique originals; relevant PDF text and direct page images reviewed, including HW_Array formula/grades, Array p.15, SedAwk p.25, Lect15 pp.7–8, Filesystem p.8 and HF p.2. All12 source-PDF snapshot hashes (including duplicate) unchanged. No private originals shipped.
- **PASS — Linux:**300 independently declared automatic-answer programs plus4 applied programs;368 `bash -n` checks (304 programs +64 Markdown fences). Separate stdout/stderr/status comparisons, with trailing newlines trimmed and significant spaces preserved. Read-only/offline/unprivileged pinned Debian container; Bash5.2.15/GNU sed4.9/grep3.8/coreutils9.1/mawk1.3.4.
- **PASS — Mathematics:**35 independent exact/numeric/grade keys and99 prime comparisons. Fixed the draft's mistaken score3 grade before release: formula-derived 1..10 grades are F,F,C,C,C,C,C,C,B,B. Six source corrections and two source qualifications are explicitly documented, not silently copied.
- **PASS — Build/contracts:**`node scripts/build.cjs`, `node scripts/check.cjs`, `node scripts/check-unix-release.cjs`;47 publication outputs identical across double builds. Original25lessons/750questions/370anchors/15PDFs and126 protected repository files retained. Real heading references, escaped Bash copy viewers, catalog identities, malformed/future/denied storage and frozen90-question historical contexts checked.
- **PASS — New readers:**`node scripts/check-unix-browser.cjs` runs all12 Unix readers,72 Practice submissions, all300 automatic Exam answers, intentional wrong answers, review/retry/scores, refresh, code copying, course/search/navigation, keyboard TOC, MathML, completion/focus, Unix filtering and zero Insights writes. All12 no-JavaScript fallbacks contain6 Practice and30 Exam questions.
- **PASS — UI:**Chrome155 in isolated contexts; representative Classic/Modern, TH/EN, Light/Dark, six palettes and1440/1024/390/320px. Existing Modern suite adds all7 palettes including Custom ×2modes ×4widths, contrast/font/keyboard/held-sync cases. Actual screenshots reviewed: Modern dark1440, Modern light390, Classic dark320, Unix course390, math390 and Unix Insights390. No observed application errors, failed local assets or unintended page overflow.
- **PASS — Existing browsers:**Practice15sessions, all37bank Exam smoke/deeper original pilots,21original expansion smokes, Phase9 archived revision/quota failure,24large-font reader+6TOC cases and50 deterministic sync-focus cases. Unix bookmark/Continue Reading restored the seeded heading to exactly140px; reset worked. Linked List step/reset and PDF page3/150% refresh persistence, native fallback, download link and390px containment passed a focused isolated smoke.
- **PASS — Counting:**full Insights suite, including P11-PROD-001 reader edits/two tabs/refresh, retains10correct/5incorrect/66.7%,10unique/5repeated after self-only edits. Current revision2 and archived exclusions unchanged. Third-course configuration validated; legacy two-course manifests still accepted.
- **PASS — Existing academic checks:**OOP foundations/data structures, Regression80OLS cases, KNN24categorical comparisons/Iris, Naive Bayes78categorical comparisons, ID3/entropy/linkage, K-Means/Perceptron,909backprop gradients and CNN/SciPy checks. Existing Practice20pilot keys +105expansion keys and127 Extended executable oracles pass. New Unix automatic questions are additionally executed by the Linux suite; its60 self rubrics are reviewed, never claimed machine-graded.
- **PASS — Preservation:**22 protected-worktree HEAD/index/dirty-file snapshots unchanged; original15 tracked PDFs and all old lesson/bank/reader hashes match. No saved-data schema/ownership, old IDs/URLs, question keys or archived contexts changed. Publication diff contains no source PDFs, workbooks, environments, screenshots or private paths.

Some legacy scripts retain optional `--source-root` modes. Those expensive AI workbook/PDF re-audits were NOT rerun: their content is unchanged and this release audits Unix. The KNN regression initially lacked scikit-learn on the default path; rerun passed using the already-existing external QA dependencies (scikit-learn1.7.2), with no installation or website dependency.

## Inventory and independent evidence

| Inventory | Choice | Numeric | Self (ungraded) | Total |
|---|---:|---:|---:|---:|
| New Unix |151|149|60|360|
| Preserved AI/OOP |460|165|125|750|
| Site |611|314|185|1110|

Every new bank has5 automatically scored +1self Practice and20automatically scored +4self Extended. There are300 unique automatic keys, not360 scored keys. All300 have Linux evidence; all60 rubrics remain qualified self-assessment. No unresolved new answer key is marked verified merely because the JS grader accepts it.34 high-overlap prompt pairs were reviewed as distinct semantic/operator/boundary contrasts; the Bash duplicate detector preserves meaningful shell punctuation such as `@` versus `*`.

Example screenshot statistics are isolated QA results, not fabricated learner data:12 completed Practice runs +12 saved24/25 Exam runs +12 corrected active25/25 snapshots produce648correct/12incorrect/660observations,300unique/360repeated. Different complete automatic snapshots legitimately remain observations; self-only changes do not add them.

Derived Insights manifest:1,038,730bytes /140,899gzip bytes measured locally (not a production latency claim). No new runtime library, framework, model trainer, analytics or backend. Parsing remains event-driven/cached; no polling and no dashboard storage writes.

## Local preview and reproduction

Serve the checkout's parent directory and open `http://127.0.0.1:8797/Course-Website/#course/unix-tools/summaries` or `http://127.0.0.1:8797/Course-Website/insights.html`. Readers are `read/unix-tools/final-<slug>.html`; all registered URLs are validated by the catalog tests. This is a local preview, not a deployment.

Run the three build/check commands above, `node scripts/check-unix-bash.cjs` and `python scripts/check-unix-math.py`. Browser commands use an existing Playwright installation via `PLAYWRIGHT_MODULE` and `STUDY_BASE_URL`; optional `STUDY_SCREENSHOTS` saves artifacts outside Git. Browser plugin unavailable; isolated regular Playwright was used. No personal browser profile or saved results were accessed.

## Limitations

No separateLecture14 original in the inspected collection. Public outline is contextual and displays a different code; repository identity remains88624159. Source corrections are documented neutrally. Local originals/teaching files are not shipped. Linux execution is version/locale/options-specific. Browser QA must report only actually tested browsers; Safari/Firefox/physical devices/screen-reader hardware are not presumed covered.
