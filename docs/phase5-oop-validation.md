# Phase 5 validation

Validated locally on 2026-10-25 against main `c68346e389cc37c1fd6093acf6df61cff51b3795`. This report describes the proposed branch, not a deployment.

## Content and integration

- 12 new independent OOP lessons, 65 solved exercises: [coverage and numerical evidence](oop-lesson-coverage.md), [verified source inventory](oop-curriculum-map.md).
- 14 OOP lecture PDFs / 610 physical pages indexed, with relevant code screenshots, figures, tables and traces inspected. Accessible local lab materials inform explicitly attributed examples; original source files are excluded from the change.
- Existing Linked List and all 12 AI lesson sources, article content, IDs and URLs remain unchanged. No Week 9, NewsManager/DailyFeed project or additional algorithm visualizer is invented.
- Learning Path configuration, runtime, styles, hooks, path-only localization and checks are removed. Catalog navigation and independent Continue Reading remain; no replacement sequencing engine or storage migration is introduced.

## Executed checks

| Check | Result |
|---|---|
| `node scripts/build.cjs` | PASS: 25 registered lessons, 49 resources across 6 courses |
| `node scripts/check.cjs` | PASS: local URLs/assets, syntax, catalog, preferences/themes, i18n, study state, PDF sourcing, lesson contracts/XSS, rich content and direct catalog navigation |
| `python scripts/check-oop-foundations.py` | PASS: 7 standalone examples / 35 exercises; outputs, exceptions, object relationships, MRO/ABC, properties, SOLID and 3,200 independent array operations |
| `python scripts/check-oop-data-structures.py` | PASS: 5 standalone examples / 30 exercises; stack, queue, undo, Fraction postfix oracle, 200 sorting datasets with trace/stability invariants, and 3,200 hash/dictionary comparisons |
| Deterministic double build | PASS: catalog, homepage and all 32 generated/manual reader outputs byte-identical between builds |
| New lesson links | PASS: all 12 readers' local assets, heading links and physical PDF page locators exist and are in range |
| Integrity snapshots | PASS: all 15 tracked PDFs, 141 local teaching files, 37 original catalog entries/source hashes and 13 protected worktrees unchanged (HEAD, branch, index, status and file hashes) |
| Saved-data contracts | PASS: `assets/study.js` byte-identical; original lesson registrations are preserved; no changed storage schema or reset |
| Publication safety | PASS: scoped diff and whitespace checks; no source bundles, private paths, detected credentials, environments, screenshots or temporary previews included |

## Chrome browser verification

Playwright used installed Chrome because no browser-testing connector was available. Test profiles/storage, GitHub tree fixtures and screenshots stayed outside Git.

- All 12 new readers at 1440px Modern/Dark/EN, 390px Classic/Light/TH and 320px Modern/Light/TH: 36 cases passed for rendering, TOC/anchors, copy-by-keyboard, math/error checks and overflow. Representative desktop and mobile screenshots reviewed.
- Seeded pre-refactor study data in both layouts: existing completion flags/bookmarks/history survive; Continue Reading restores the saved HTML section offset; PDF page/zoom/scroll data survives; browser Back/Forward works. No `learning-paths.json` request occurs.
- Homepage search and course/category counts match actual resources (OOP 30, AI 15; OOP slides 14, summaries 14). Refresh uses a controlled Git tree of real repository files and introduces no duplicates.
- Stack completion/bookmark actions, persistence, section resume and reset passed. Six palettes plus Custom Theme, rapid Light/Dark toggles, focus, SVG identity and pressed states passed.
- Existing AI CNN reader tested across both layouts, Light/Dark and 1440/390/320px; TH/EN switching, math and overflow checks passed. Existing Linked List traversal keyboard stepping/reset and 11-state component remain functional.
- PDF Viewer in both layouts at 390px: page 2, zoom 125%, scroll persistence/reopen, download response/PDF signature and native fallback passed.
- Existing 20-question OOP quiz grading, saved answers and reset passed at 390px. Mobile 320px keyboard menu open/course navigation/close passed; stable closed-sidebar screenshot reviewed.
- No unexpected console errors, local HTTP failures, missing path imports or horizontal page overflow in these cases.

## Limits and review status

Ready for one focused PR. No merge/deploy is authorized. Safari, Firefox, physical devices and formal screen-reader certification were not tested. GitHub API availability/rate limits were not exercised live; fixtures isolate deterministic sync/count behavior. Native PDF viewers cannot expose internal scrolling/page changes to the site; tracked PDF.js/site controls retain exact resume, with the existing native fallback limitation. Local-only lab originals and QA captures are intentionally not published; new Python correctness checks are reproducible from committed lesson Markdown without those sources.
