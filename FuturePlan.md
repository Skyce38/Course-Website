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
