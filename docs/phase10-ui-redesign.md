# Phase 10 — Modern learning workspace

Base: main `9f9a82153f56892bb39af4ffa57461644cac5a8f`. Classic remains the default and keeps its existing visual presentation. This is a presentation/navigation update, not a second application or a new learning-path system.

## Baseline and design specification

Captured 36 Modern screenshots: homepage, AI/OOP overview, Regression/Stack readers, Practice, Extended Exam, Settings and PDF at 1440/1024/390/320px; six additional Classic baselines. Images and comparison artifacts stay outside Git. Protected HEAD/index/dirty-file snapshots cover the other 19 worktrees.

Baseline issues: nested outlined surfaces, oversized course cards/header panels, heavy background tint, multiple competing resource actions and exam configuration taking most of a mobile viewport.

Design direction: compact navigation; plain welcome/course headings; two-column compact course tiles; divider-based document lists; comfortable flat reading columns; one clear question surface; subtle progress and feedback. Reuse the own Study book mark and existing inline SVGs. No external fonts, proprietary graphics, account/profile inventions, timers, rankings or backend.

Two coordinated image concepts guide dashboard and reader/practice composition. Generated mockups are not data authority: their illustrative completion checks, attempted-session dates, altered logo, TOC progression circles and incorrect related-anchor label are excluded. Every title, count, completion state, source/lesson text, question and saved attempt comes from the existing application. No mockup text is substituted for educational content.

Tokens: selected-palette paper/canvas/soft/accent/ink; subdued decorative dividers; original accessible control borders and focus colors. UI text 15–17px, reading text controlled by preferences, 28–32px primary headings, 24–28px section headings, 8px component corners, 8/12/16/24/32px spacing. Modern Dark and Custom use the same token relationships; no fixed blue palette overrides.

## Implementation boundaries

- One Modern-scoped stylesheet after existing styles; reuse shared markup, themes and data. No third layout, framework or runtime library.
- Real navigation destinations only. Practice links point into existing generated readers; no invented lessons, question counts or prerequisite sequences.
- Preserve all Markdown, banks/keys/revisions/archives, IDs/anchors, saved-data contracts and PDFs. Practice position indicator is presentation only, mounted once and never serialized.
- Before/after screenshot inspection and focused state/keyboard/storage regressions are required before release. Baseline capture alone is not visual PASS.

## Validation status

Stages A–F implemented: a single Modern stylesheet, compact shell/course/resource presentation, real practice deep links and a native question-position indicator. The indicator labels position, not mastery or graded completion; it uses existing sequence state and is never saved. Shared grading/storage contracts and educational sources are unchanged.

Navigation reuses existing course/category routes. Courses/Recent sidebar links reveal real homepage sections with keyboard focus; course Lesson practice opens a real list of published-reader destinations. No new curriculum route or path is introduced. Empty category links are visually omitted only in Modern; Classic retains every original category.

Executed: build/check suite; original Practice browser suite (15 sessions), reader containment/TOC suite (24+6 cases), all three historical revision migrations, 50 controlled GitHub-sync focus cases and new Modern navigation/position regression. The latter covers all 25 practice destinations, seven palettes × two modes × four widths and 22px/narrow reading. Fresh Classic Home/Stack/Settings comparisons are pixel-identical at 1440/390px.

Confirmed presentation fixes during review: settings text/icon crowding, legacy sidebar glyphs showing beside SVGs, and doubled native-anchor offsets before Practice/Exam sections. Section jumps now account for the actual header height. A held GitHub response reproduced lost focus on the newly introduced section targets; the existing synchronous-render helper now preserves those three targets without storing a snapshot across await or stealing search focus. All three new cases and the existing 50 resource-action cases pass.

The complete Extended Exam browser suite passes (all 25 banks plus selection/scoring/retry/archive-compatible state, refresh, cross-tab focus and no-JS). Its initial parallel run hit a local `ERR_NO_BUFFER_SPACE` asset-loading failure; a serial run using the temporary HTTP/1.1 keepalive test server passed without code changes for that infrastructure error. No deployment behavior is inferred from this local-server limit.

## Final QA — READY for PR review

Actual before/after captures compare unchanged main with this branch using the same isolated fixture (two real recent documents and one completed document), fonts, viewport and painted PDF canvas. Reviewed all nine surfaces at 1440/1024/390/320px, plus native-size dashboard/practice details and representative Forest Dark, Lavender Dark and opposing-color Custom Dark captures. No clipped primary controls or page overflow remains. Classic Home/Stack/Settings at 1440/390px are pixel-identical to fresh main captures. Screenshots, generated concepts and test profiles remain outside Git.

Design comparison ledger:

| Comparison | Rendered result / intentional constraint |
| --- | --- |
| Shell and navigation | Compact 248px sidebar, stable own Study mark, restrained selected states and sticky search/header; existing SVG metaphors retained. |
| Dashboard | Plain welcome, two-column course tiles, recent list beside real progress on desktop, stacked on mobile; all six courses remain visible. |
| Density and surfaces | Flat reader and thin list dividers replace nested outlined cards; question choices retain accessible borders and a distinct submit action. |
| Typography and copy | Existing Thai lesson text, original UI translations, font/width preferences and long-title wrapping take precedence over illustrative mockup copy. No invented course descriptions, attempts or completion checks are imported. |
| Reader/practice | Controlled TOC, readable code/math/table containment and one native position bar; original related-anchor labels, session history and scoring remain authoritative. No TOC mastery circles or invented saved dates. |
| Palette and branding | Paper/canvas/accent relationships follow the selected palette; no fixed-blue override, copied logo, decorative image or additional font download. |

The concept-to-browser comparison is complete: accepted composition, spacing and component hierarchy are implemented, with the explicit real-data/branding/content constraints above. All added visible copy is limited to the six reviewed bilingual navigation/practice keys; above-the-fold educational copy is unchanged. No unresolved visual defect was identified in the reviewed captures. This is local Chrome QA, not production verification.

Final executed checks:

- `node scripts/build.cjs` and `node scripts/check.cjs`: PASS. A separate second build produced byte-identical reader files. A final diff review found and removed a duplicate Modern stylesheet link in the generated template; the repository check now enforces exactly one versioned link per checked page. This markup-only cleanup does not alter the reviewed CSS/layout.
- `check-practice-browser.cjs`, `check-exam-browser.cjs`, `check-reading-browser.cjs`, `check-phase9-browser.cjs`, `check-sync-focus-browser.cjs` and `check-modern-ui-browser.cjs`: PASS in isolated Chrome profiles. The Modern test covers seven palettes × two modes × four widths on the shared reader/question surface, position controls, all 25 real lesson destinations, and three controlled section-focus races.
- Final surface probe: 36 page/width combinations, TH/EN representatives, Light/Dark, no raw translation keys, horizontal overflow, observed console/runtime errors or missing same-origin assets. Settings export, legacy import without a layout field, and refresh persistence: PASS.
- Core integration: real catalog/search/category filters, refresh/sync, bookmark/completion/history/Continue Reading, exact HTML/PDF resume and reset, Linked List controls, PDF navigation/zoom/download/native fallback and browser navigation: PASS.
- SHA-256 comparison: 142 protected content/configuration files unchanged, including all banks, answer keys and revision archives; 15 tracked PDFs unchanged. All 25 Markdown sources, stable IDs and 370 original anchors are unchanged. All 32 existing reader documents are identical to main after removing only shared asset-version/link differences. Original read-only source manifest and all 19 other worktree HEAD/index/dirty-file snapshots match.

Performance: `modern.css` is 27,806 bytes (4,781 gzip bytes) and adds one cacheable stylesheet per page. No new runtime dependency, font, raster asset or network service. Shared UI assets use `phase10-ui-1` consistently and work beneath `/Course-Website/`. No Lighthouse score or production latency claim is made.

Limitations: executed browser coverage is desktop Chrome 155 with emulated viewport widths, not Safari, Firefox, physical touch devices or a screen-reader session. Keyboard/focus and ARIA markup were tested; that does not substitute for assistive-technology testing. GitHub responses are controlled in deterministic race tests; the existing network, native-PDF and browser storage limitations remain. This redesign preserves Phase 9 content byte-for-byte; browser QA is not a fresh academic certification of every source claim. Merge and deployment require separate user action.
