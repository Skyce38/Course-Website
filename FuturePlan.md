# Course Website — Roadmap

## Phase 1 Foundation — implemented on codex/phase-1-foundation

- [x] ตรวจชื่อ repository / GitHub Pages และแก้ relative links, README anchor, dead document listing และ unknown routes
- [x] Light ↔ Dark ใช้ร่วมกับทุกหน้าอ่าน บันทึกค่าและคง palette; ย้าย System/Auto เดิมเป็น Light โดยไม่มี OS sync
- [x] Native PDF viewer พร้อมเปลี่ยนหน้า ซูม ดาวน์โหลด เปิดโดยตรง และ error fallback
- [x] Full website Theme Gallery: Forest Green, Ocean Blue, Lavender, Sakura Pink, Warm Sunset, Midnight และ Custom Theme พร้อม contrast safeguards, Light/Dark, persistence และ reset
- [x] Typography 14–28 px ตามบทบาท, responsive layouts, book cards ใหญ่ขึ้น 45% และ AAI brand mark ในกรอบสีน้ำเงินมน
- [x] ขนาดตัวอักษรอ่าน ความกว้าง Responsive UI และ saved preferences
- [x] Thai / English UI switching โดยคงเนื้อหาต้นฉบับ
- [x] Unified Settings: appearance, language, document defaults, reset และ validated JSON import/export
- [x] Figma desktop/mobile Settings และ PDF Viewer พร้อม shared colors, typography และ controls
- [x] ตรวจ static links/JS และ browser regression ที่ desktop, 390 px และ 320 px

## หลังตรวจรับ

- ส่ง Pull Request จาก `codex/phase-1-foundation` ไป `main` เพื่อตรวจรับ ห้าม merge จนกว่าจะได้รับอนุญาต
- [x] เพิ่ม OOP slides จริง 14 PDF (Week1–8, Week10–15) พร้อม build discovery, catalog coverage check และทดสอบ native viewer/download/mobile fallback; ไม่มีไฟล์ Week9
- ตรวจ native PDF บน Safari, Firefox และมือถือจริง ความสามารถของ embed/page/zoom แตกต่างกันตามเบราว์เซอร์
- ระบบ Login, Cloud Sync และ AI ยังไม่อยู่ใน Phase 1 และยังไม่ได้เพิ่ม

รายละเอียดการใช้งานและคำสั่งตรวจสอบอยู่ใน [README](README.md#phase-1-foundation)

## Phase 2 — Step 1: Reading history and study progress

Branch: `codex/phase-2-reading-progress`, based on updated `main` after Phase 1 PR #1 was merged. Finalized for publication as a pull request targeting `main`; merging requires separate approval.

- [x] Hide only the Final tag on course cards; preserve catalog tags and document metadata.
- [x] Style the breadcrumb home link as a themed rounded button with hover/focus states.
- [x] Remove Repository links from all course toolbars; retain refresh, GitHub sync and learning-resource links.
- [x] Local reading history: deduplicate by document ID, keep the latest 20 entries, and show the latest 5 on the homepage with Continue Reading.
- [x] Track direct HTML/PDF visits and Continue Reading. Resume PDF page, zoom and within-page scroll with local PDF.js; resume HTML section anchors and scroll after fonts/content load. Positions survive the recent-list limit, save at most every 400 ms and flush on hiding/leaving. Per-document Reset Reading Position preserves completion.
- [x] Explicit completion toggles in document lists and readers. Opening a document never completes it. Per-course totals use all known course documents, regardless of search/category filters.
- [x] Store history/completion in `skyce-learning-study`, separately from preferences, bookmarks and Python quiz progress; support reloads, cross-tab updates and session fallback when storage is blocked.
- [x] TH/EN, all six palettes plus Custom, Light/Dark, keyboard focus and responsive checks at 1440/390/320 px.
- [x] Validation: `node scripts/check.cjs` includes study-state tests. Browser checks cover 168 theme/mode/language/viewport combinations plus history, resume, manual completion, empty courses, direct reader visits, cross-tab updates and existing Phase 1 regressions.

All 14 lecture PDFs remain unchanged. No backend or paid services added. PDF.js 6.4.299 (Apache-2.0) core/worker and rendering assets are vendored locally; native viewer/download fallback remains available. Native internal toolbar/scroll changes cannot be tracked; use the site controls in fallback mode. Safari/Firefox and physical devices remain outside the browser checks.

Position validation: refresh, close/reopen, Continue Reading, page/zoom/scroll navigation, reset, invalid/missing positions, changed page-count clamping, download and native fallback at 1440/390/320 px. All 14 real PDFs render and match their original SHA-256 hashes; 84 actual PDF viewer palette/mode/language/viewport combinations pass with no page overflow.

- [x] Shared Study SVG branding/favicon, removal of GitHub utility links, responsive sync/refresh toolbar and centered SVG search icon. GitHub-only PDFs use a validated, same-repository/main fallback with canonical history/resume and Blob-based download/native viewing. Tested the live AI introductory slides and HTTP/MIME/signature/CORS failures without copying remote PDFs locally.

Final audit: monochrome black/white tab favicon remains separate from the theme-aware Study logo. Static/study/i18n/source-security checks, focused Chrome regression/resume/favicon checks and all 14 original PDF hashes pass; secret-pattern and unintended-file scans are clean. Earlier full theme/viewport matrices were not repeated for publication.

## Study V2-A — Dual Layout Foundation

Branch: `codex/study-v2-dual-layout`, based on latest `main`.

- [x] Classic by default, including older preferences/imports without `layout`; Modern is opt-in.
- [x] Settings visual previews, instant/cross-tab switching, persistence, existing export/import/reset, and before-body root layout application.
- [x] Scoped Modern home/course dashboard using shared components and real course/document/completion data; Classic home/course screenshots remain pixel-identical.
- [x] Validate both layouts, all palettes/modes/languages at 1440/390/320 px, saved data, document navigation and existing regressions.

V2-A only: document readers keep their existing presentation; full Modern redesign and Phase 3 remain outside this change. No original PDFs changed; no new dependencies. No prototype attachment was available for exact visual comparison.

## Study V2-B — Modern Dashboard

- [x] Compare both supplied local prototypes; use their shell/panel hierarchy without demo data, dependencies or copied application logic.
- [x] Modern sidebar, shared header search, course cards, recent reading, real progress, document rows and category tabs; compact accessible refresh and document actions.
- [x] TH/EN, Light/Dark, palette smoke checks and focused 1440/390/320px interactions. Classic home/course screenshots remain pixel-identical after switching back.
- [x] Preserve shared navigation, bookmarks, manual completion, PDF Continue Reading and original PDF hashes; keep design references out of Git.

PDF/HTML reader presentation is unchanged; V2-C and Phase 3 remain outside this change. Safari/Firefox and physical devices remain untested.

## Study V2-C — Reader Integration

- [x] Modern-scoped HTML/Python reader typography, code/table surfaces, active existing TOCs, responsive navigation and sticky-header anchor clearance. Original lesson content, IDs and examples stay unchanged.
- [x] Modern PDF toolbar, document actions and mobile viewer; retain download, original open, PDF.js and native fallback. PDF page contents are untouched.
- [x] Preserve reading state through layout changes; keep HTML anchor/scroll and PDF page/zoom/scroll resume, completion/history and reset.
- [x] 27 Classic reader/PDF screenshots match their baselines at 1440/390/320 px. All Modern HTML readers fit those widths, with focused TH/EN, Light/Dark, palette, keyboard, anchor, resume and existing regression checks.

Native fallback still cannot expose its internal page/scroll changes; site controls remain tracked. Safari/Firefox and physical devices remain untested. Phase 3 remains outside this change; no commits or publishing performed.

## Study V2-D — Final QA and Release Preparation

- [x] Review cumulative changes, relative paths, shared asset versions, generated catalog, bilingual keys and browser DOM; build/check scripts pass without catalog changes.
- [x] Capture 50 Classic/Modern screenshots at 1440/390/320 px and inspect representative dashboard, cards, course tabs, sidebar, Settings and HTML/PDF reader views. Fix the confirmed Modern mobile breadcrumb button wrapping; Classic remains unchanged in 33 baseline screenshot comparisons.
- [x] Focused Chrome checks pass for layout persistence/legacy imports/export, TH/EN, all palettes and custom Light/Dark, search, bookmarks, sync/count/cache/error handling, completion/history, HTML anchors/resume/reset, PDF page/zoom/scroll/download/fallback, quiz and keyboard/mobile navigation. No unexpected console errors or page overflow in tested routes.
- [x] All 15 tracked PDFs match Git baselines; the original 14 also match saved SHA-256 hashes. Original lesson article content is unchanged. No detected secrets, dependencies, temporary files or local design references in the proposed file set.

Ready for PR preparation; no commit, push, merge or deployment performed. Browser tests use Chrome with isolated local storage and controlled GitHub API fixtures; live API availability, Safari/Firefox, physical devices and a formal HTML/accessibility certification are not covered. Native PDF internal controls retain the limitation documented above.

## Phase 5 — OOP expansion and simpler navigation

- [x] Inventory14OOP PDFs/610physicalpages and accessible local labs; no Week9 invented.
- [x] Remove path-only configuration/runtime/controls; retain catalog access, independent history/Continue Reading, bookmarks, completion and exact resume. Seeded legacy-data checks pass in both layouts.
- [x] Complete 12 source-supported OOP lessons and focused correctness/browser/integrity checks. Existing Linked List and AI content remain unchanged. See [Phase 5 validation](docs/phase5-oop-validation.md).
