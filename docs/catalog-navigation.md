# Catalog navigation and independent study state

All lessons are ordinary course resources. Use homepage → course → category/search → document, or an existing permanent reader URL. No lesson ordering, prerequisite gating, path recommendations or path-owned Previous/Next controls exist.

`assets/study.js` independently owns `skyce-learning-study` (recent/completed/positions). Phase5 does not change that file or data format. `skyce-learning-bookmarks` and existing preferences remain separate. The homepage's Recently Opened rows keep their existing Continue Reading action, which uses the document's own saved position; no alternative sequencing engine replaces Learning Paths.

Generated readers come from `templates/lesson.html` and registry `scripts/lessons.json`. Catalog resource IDs and URLs remain authoritative. Build validation checks direct resources through `scripts/check-catalog-navigation.cjs`, without a path configuration fetch. Legacy bookmarks/completions/positions need no migration or clearing. PDF.js/native controls and code visualizer Previous/Next (individual algorithm steps, not lesson sequencing) remain intact.

Removed obsolete path files: learning-paths.json,assets/learning-paths.js,assets/learning-navigation.js,assets/learning-navigation.css,scripts/check-learning-paths.cjs,docs/learning-navigation.md. Shared HTML asset versions move together to phase5-catalog-1 so cached i18n and scripts cannot retain removed controls. Historic QA/source reports describe their original releases; they are not active navigation configuration.

Validation: existing build/check suites plus seeded Classic/Modern browser state. Seed contains previous lesson completion, two bookmarks, recent Linked List entry, exact HTML anchor/offset and PDF page/zoom/offset. All retained; direct old links, keyboard opening, refresh, Back/Forward and independent progress work. Network observation confirms zero Learning Path requests. No storage migration code added.
