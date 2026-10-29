# Database release QA

Baseline `795152c2361a1f9c57309555a7383e7980b269df`. Source/primary implementation review2026-10-29; final continuation checks2026-10-30. **READY for PR review**. No production deployment or university account operation is part of this work.

## Executed academic and runtime verification

- Original sources:all8 files located,105 physical PDF pages visually inspected, DOCX13 questions/five tables read, ZIP sources/configuration reviewed as data. Public repository pinned; official course code89022167 verified. [Coverage](database-source-coverage.md).
- SQL:30 exact ordered results independently modeled, compared with SQLite3.53.1 and actual MariaDB11.4.9; additional EXPLAIN executed without asserting a universal physical plan. All13 homework references mapped.
- PHP8.4.27:18 lesson fences/helper library linted;11 exact helper excerpts; mysqli/mysqlnd+mbstring integration, prepared CRUD, constraints, escaping/validation, hash/verify, registration rollback, ownership, actual CLI session rotation/CSRF/logout. Not Apache/HTTPS/Angsila.
- Git:actual isolated local index/working/commit/branch/fast-forward/ignore-tracked checks; no teaching remote push.
- Banks:300 questions (240choice,10numeric,50self),250 graded/50 ungraded. Sixteen explicit question models additionally reproduce fixture/query/PHP outcomes; the other keys/rubrics are source/technical reviews, not falsely described as300 executed computations. Academic source/key review is separate from grading-contract and browser tests. [Evidence](database-exam-verification.md).

## Browser and integrity status

Screenshots and raw test outputs stay in a temporary directory outside Git. Browser plugin was unavailable; existing Playwright with installed **Chrome156.0.8078.49** was used in ephemeral contexts. Personal storage was never opened or reset.

| Check actually executed | Result and scope |
|---|---|
| `node scripts/build.cjs` twice; compare output hashes |PASS:56 generated readers plus catalog, homepage and Insights manifest deterministic |
| `node scripts/check.cjs` |PASS:56 lessons/1680 unique questions, safe rendering/links/i18n, all existing study/Practice/Exam/revision suites, new Database preservation/model suite |
| `check-database-browser.cjs --surfaces-only` |PASS:10 real readers,20 images,80 Classic/Modern ×320/390/1024/1440 cases;140 palette/mode cases;10 large-font cases;code-copy/keyboard/TOC/completion focus;all10 no-JS and print checks |
| New assessment interactions |PASS:60 Practice submissions,250 correct/corrected Exam submissions plus10 deliberately wrong answers;explanations,25-graded totals,review/retry,refresh and ungraded self-ratings |
| Database Insights |PASS:fifth-course option,10 lessons,isolated course totals and actual topics,zero writes;attempts unchanged |
| `check-insights-browser.cjs` |PASS:original10correct/5incorrect=66.7%,self-only edits,two-tab/refresh/reopen,duplicates versus repeats,archives,malformed/denied storage,zero writes;8 representative layout/language/width cases+14 palettes |
| `check-exam-browser.cjs` |PASS:all56 bank manifests/1680 questions;mock/topic sessions,numeric boundaries,retry/review/restart,self exclusion,refresh/reopen/cross-tab and original attempts/bookmarks/completion |
| `check-phase9-browser.cjs` |PASS:all3 historical revision migrations,old prompts/keys/attempts retained,12 fresh runs,quota-exhaustion failure and no silent regrading |
| `check-reading-browser.cjs` |PASS:24 old-reader large-font/narrow cases,6 keyboard TOC/anchor cases,internal math/code scrolling |
| `check-sync-focus-browser.cjs` |PASS:50 deterministic GitHub synchronization focus cases |
| `check-database-browser.cjs --reading-only` |PASS:actual Continue Reading click and refresh restore section offset within2px;reset clears only current position;old pixel record/bookmarks retained;Linked List next/previous/reset |
| Real Week10 PDF |PASS:page2,125% zoom and quarter-page scroll offset survive refresh;reset returns page1;download byte-identical to original;native iframe fallback available at390px |
| Legacy pixel-only fixture |PASS:950px restored without clearing data in the same layout;semantic-content limitations below |
| SVG/raster re-export `--verify` |PASS:all20 deterministic hashes;Thai label bounds,overlap and card-padding checks;893670 WebP bytes total |
| Immutable content |PASS:793 Phase15 files;46 old lesson IDs/1380 old questions/370 historical anchors/15 PDFs/76 prior raster images and existing storage/grading contracts |

All20 illustrations were visually reviewed, including real FK cardinalities, quoted/qualified SQL labels, guarded-write order and Git review-before-push order. Actual reader screenshots at1440px and320px were reviewed; the full responsive checks also cover390/1024px. No unreadable clipping or page overflow was found. SQL/PHP code scrolls within its existing viewer.

### Delayed-image measurements

Every new image was tested in both layouts at each width, **160 fresh cache-disabled contexts**, with the actual response held before decode. The first120 completed cases and final40 cases were combined only after asserting160 unique image/layout/width identities. An interrupted overloaded QA run was not reported as a full pass; its remaining cases were executed successfully.

| Width | Cases | Max image-induced CLS | Max caption movement | Max following-content movement |
|---|---:|---:|---:|---:|
|320|40|0|0px|0px|
|390|40|0|0px|0px|
|1024|40|0|0px|0px|
|1440|40|0|0px|0px|

Image box height/top and scroll movement were also0px; correct reserved intrinsic ratios and successful real decode were asserted. Existing KNN/Linked List illustrations passed16 additional delayed contexts, and the original water-flow PNG passed all8 Classic/Modern width cases, alsoCLS0. All other prior images retain exact baseline hashes and existing ratio rules; this does not falsely claim another400-case historical image matrix.

### Resolved QA issues and network accounting

- The initial temporary preview server refused some requests under concurrent cold-load traffic. Its quiet, larger-backlog local replacement passed final surface, Insights and asset tests; no refused GETs or missing assets remain in passing results.
- Editing a diagram caption exposed an authoring integrator duplicate-block issue. Database-only stripping now identifies the authored image path, and permanent static tests require exactly two figures per reader. No protected lesson was altered.
- A test seeded study state after the homepage had already cached its empty state. It now seeds before application initialization. This was a fixture error, not evidence of lost production study data.
- Chrome reports the successful PDF **HTTP200 HEAD** header probe as `net::ERR_ABORTED`. A standalone reproduction confirmed `fetch().ok===true`, PDF MIME and content length with/without routing. The monitor separately records only these proven successful HEAD requests; failed GETs, failed HEAD statuses, absent responses, wrong MIME and application errors still fail. Final PDF rendering/persistence and byte-exact download independently pass. These two transport events are not concealed as zero low-level events.

No application errors or unexpected failed assets were observed in the final passing browser checks. The tests mock background GitHub tree responses; synchronization timing/focus is verified separately with controlled success/failure promises, not claimed as a live university/GitHub upload test.

### Publication integrity

All8 original source hashes/sizes match the initial inventory; all27 protected worktrees retain their HEADs, staged binary diffs, working diffs and dirty-file hashes. The119-file cumulative change list contains only Database content/assets/tests/documentation and the narrow registry/cache/viewer-label integration. All prior readers have identical canonical content; newline-only working-tree status is not included as a content change.

`git diff --check` passes. Intended files were checked for source PDFs/ZIPs/workbooks/dumps, environments, database/server/runtime artifacts, private machine paths, credential/key patterns and malformed UTF-8. None are included. Environment/cache/local-source ignore guards pass. No original PDF, old answer bank, lesson body or saved-data contract is changed. Latest fetched `origin/main` remains the stated Phase15 baseline.

### Resume compatibility

New Database readers use the existing stable resource IDs and section-relative position records. Actual saved `anchor + sectionOffset` values restore after Continue Reading and reload. Reset affects only the chosen document. Existing bookmarks, completion, recent history, quiz namespaces and archived revisions retain their formats.

Legacy `{scroll:…}` records still restore their pixel coordinate, as verified with950px. A pixel coordinate cannot identify the original paragraph after font/layout/content changes; Phase15's known limitation remains. Phase16 does not insert diagrams into old lessons, rewrite/migrate legacy records or clear localStorage. Reflow tests are not a claim of semantic exactness for arbitrary unanchored historical coordinates.

## Reproduction / preview

Serve the checkout's parent directory, then open `/Course-Website/#course/database-management/summaries`. A local preview uses `http://127.0.0.1:8816/Course-Website/` during authoring. For a different port set `STUDY_BASE_URL` accordingly; set `STUDY_SCREENSHOTS` to a temporary directory outside the repository.

```
node scripts/build.cjs
node scripts/check.cjs
python scripts/check-database-sql.py
node scripts/check-database-browser.cjs
```

Full MariaDB/PHP integration is optional authoring QA: use only a new loopback/high-port temporary server/data directory with `.phase16-disposable`, set the explicit `STUDY_DB_*` variables, then run `check-database-php.php`. The harness checks server datadir before creating a random test database and drops only its own database. Never point it at an existing/user/university database. The source DROP scripts are never invoked. Authoring tools are not runtime dependencies.

## Limitations

- Native MySQL and real Angsila/Apache/HTTPS deployment are not tested. The Angsila resource was inaccessible; no credentials or live accounts used.
- No Safari/Firefox/physical-device or real screen-reader claim. Chrome accessibility attributes/focus and viewport emulation are tested.
- Static/no-JS readers show examples and solutions; neither PHP/SQL execution nor automatic quiz grading runs without the existing JavaScript component.
- Existing legacy pixel-only resume records may land at different content when old lessons gain images; that prior Phase15 limitation is unchanged. These new readers use existing section-relative records; no migration or localStorage clearing.
- This does not establish official Final examination dates, weighting or a complete official syllabus. Supplied project milestones are not exam dates.
