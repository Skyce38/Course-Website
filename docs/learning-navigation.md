# Learning navigation (Phase 3C-1)

`learning-paths.json` is explicit, ordered authoring configuration, separate from the catalog and local saved data:

```json
{"version":1,"paths":[{"course":"oop-python","lessons":["oop-python-linked-list"]}]}
```

Each course may occur once. Its lesson array may contain zero, one or multiple stable resource IDs. Order follows the file; it is never inferred from filenames, upload order, categories or history. Only existing registered Markdown lessons (`generatedLesson: 1`, format MD, local reader in the same course) are eligible. PDFs, quizzes and ordinary summary files never become sequence entries automatically. An empty configuration produces no Continue Learning suggestion. An explicitly empty course path shows its empty status.

Currently only Linked List is configured. The AI pilot is unmerged and is neither referenced nor copied here. To add a real future lesson: register/build its Markdown through the existing builder, then append its stable ID to the intended course array. Do not rename published IDs to reorder a path. No invented curriculum entries are published.

`assets/learning-paths.js` shares pure validation, Previous/Next boundaries and Continue selection between Node tests and the browser. `scripts/build.cjs` rejects invalid/duplicate courses, duplicate or missing lesson IDs, cross-course/unsupported resources and unavailable local lesson files. `node scripts/check.cjs` includes focused empty/single/multi fixtures kept in memory; rich/lesson builder fixtures remain isolated in the OS temp directory.

Course pages show ordered paths and **path lesson progress**, separately from existing all-document progress. Generated readers show the current lesson, statuses and Previous/Next controls below the article. First/last boundaries have no active link. Native anchors support keyboard and browser back/forward navigation. Completion remains a separate manual action: navigation never completes a lesson.

Continue Learning selects the most recently opened **unfinished** configured lesson in scope (one course on a course page/reader; all configured courses on the homepage). Completed/stale/unconfigured history entries are ignored, and cached history URLs/titles are never used as navigation targets. Without relevant history it selects the first unfinished lesson in configured order. When every lesson is completed, no new lesson is suggested; course/reader lists remain available for review.

All destination URLs use authoritative catalog readers and `LearningStudy.resumeLink`; page/anchor/scroll restoration, history and completion use existing APIs/storage. Resume URLs refresh at link activation and on position reset, so a panel cannot reuse an obsolete anchor. `LearningStudy.ready` now also resolves after library configuration and exposes current resource/course getters. No storage keys or schemas change. Optional navigation-load failures hide path panels while leaving the existing library/reader usable.

`learning-navigation.js` mounts into course/home/generated-reader hosts. Existing library renders dispatch `learningnavigationchange`; study changes and BFCache `pageshow` update status/Continue links. On a persisted page restoration, shared study state reloads existing storage so completion from the page just left is visible. A content key avoids replacing navigation DOM when nothing relevant changed. Preferences/i18n update existing text/attributes; theme/layout changes do not rebuild the panels. Styles use existing tokens for Classic/Modern, all palettes and Light/Dark. Shared asset versions are updated together.

Browser QA should cover real single-lesson pages plus temporary multi-lesson generated-reader fixtures, ordering/boundaries, back/forward, completion, exact resume, stale history, both languages/layouts/modes at 1440/390/320px, keyboard focus, theme flashing, bookmarks and existing readers/PDFs. Optional navigation requires JavaScript; original lesson content and rich-math fallback remain available without it.
