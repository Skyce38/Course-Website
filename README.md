# คลังCourse Website

[เปิดเว็บคลังเรียน](https://skyce38.github.io/Course-Website/)

คลังทุกวิชาอยู่ใน repository นี้ จัดตามวิชาและประเภทเอกสาร เปิดอ่านหรือเพิ่มไฟล์ได้จากที่เดียว

## วิชา

- [OOP & Data Structures](courses/oop-python/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/oop-python)
- [Artificial Intelligence](courses/artificial-intelligence/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/artificial-intelligence)
- [Unix Tools & Programming](courses/unix-tools/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/unix-tools)
- [Database Management](courses/database-management/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/database-management)
- [Electronics & Internet of Things](courses/internet-of-things/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/internet-of-things)
- [Statistics & R](courses/statistics-r/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/statistics-r)

## โครงสร้าง

```text
Course-Website/
├── index.html
├── catalog.json
├── courses/
│   ├── oop-python/
│   ├── artificial-intelligence/
│   ├── unix-tools/
│   ├── database-management/
│   ├── internet-of-things/
│   └── statistics-r/
├── read/                  หน้าอ่านเอกสาร
└── templates/course/      แม่แบบเพิ่มวิชา
```

ภายในแต่ละโฟลเดอร์วิชามีหมวด `assignments/`, `slides/`, `summaries/`, `tutoring/` และ `exams/`

## เพิ่มเอกสาร

1. เปิดโฟลเดอร์วิชาใน GitHub
2. เลือกหมวดที่ตรงกับเอกสาร
3. กด **Add file → Upload files** แล้ว Commit changes
4. เปิดเว็บคลังเรียน เข้าหน้าวิชา แล้วกด **รีเฟรชรายการ**

ไฟล์ใหม่ในโฟลเดอร์วิชาจะแสดงบนเว็บหลังรีเฟรช รายการสรุปที่จัดรูปแบบให้อ่านเป็นหน้า HTML อยู่ใน `read/`.

## เนื้อหาที่นำเข้าแล้ว

- Python Final / OOP: สรุป Week 10–15 และข้อฝึกปรนัย 20 ข้อ
- AI: สรุป Midterm + Final และชีททวนเร็ว
- Unix Tools: สรุป Midterm/Final บทวิเคราะห์การบ้าน และข้อฝึกปรนัย 40 ข้อ
- Database, IoT และ Statistics/R: เตรียมโครงสร้างหมวดไว้แล้ว

## Phase 1 Foundation

- ลิงก์ภายในใช้ relative paths รองรับ GitHub Pages ที่ `/Course-Website/` และการทดสอบในเครื่อง เส้นทางวิชาที่ไม่ถูกต้องแสดงลิงก์กลับคลัง
- ธีม **Light / Dark** ใช้ร่วมกับหน้าอ่านทุกหน้า ปุ่มมุมขวาสลับสองโหมดโดยคง palette และบันทึกค่า ไม่มีการซิงก์ตามระบบ
- [ตั้งค่า](settings.html): แกลเลอรีธีมทั้งเว็บไซต์ 6 ชุดและ Custom Theme ขนาดตัวอักษรอ่าน 14–22 px ความกว้างหน้าอ่าน ภาษาไทย/English และค่าเริ่มต้น PDF
- แปลเฉพาะ UI เนื้อหาวิชา ชื่อเอกสาร โค้ด และโจทย์ใช้ภาษาต้นฉบับ
- PDF ที่เพิ่มในหมวดวิชาจะแสดงผ่าน `pdf.html` มีปุ่มเปลี่ยนหน้า ซูม เปิดโดยตรง ดาวน์โหลด และลองใหม่เมื่อโหลดไม่ได้
- ส่งออก/นำเข้าการตั้งค่าเป็น JSON ที่ตรวจสอบรูปแบบก่อนใช้งาน คืนค่าเริ่มต้นได้โดยไม่ลบบุ๊กมาร์กหรือความคืบหน้าแบบทดสอบ

การตั้งค่าบันทึกด้วย `localStorage` ในเบราว์เซอร์ ไม่ส่งข้อมูลออกไป หากปิดการจัดเก็บจะใช้การตั้งค่าได้เฉพาะแท็บนั้น GitHub sync ใช้ public API แสดงแคชทันที แล้วตรวจรายการล่าสุดทั้งคลังหนึ่งครั้งต่อการเปิดหน้า โดยใช้รายการเดิมเมื่อเชื่อมต่อไม่ได้ บุ๊กมาร์กไฟล์ที่ค้นพบจาก GitHub เรียกคืนจากแคชได้หลังรีโหลด

OOP → Slides มี PDF จริง 14 ไฟล์: Week1–Week8 และ Week10–Week15 (ไม่มี Week9) เพิ่มไฟล์ `.pdf` ใน `courses/<วิชา>/<หมวด>/` แล้วรัน `node scripts/build.cjs` เพื่อค้นหาไฟล์และเพิ่มเข้า catalog โดยไม่เปลี่ยนชื่อหรือแก้ PDF; หลังเผยแพร่ GitHub sync ยังดึงไฟล์ใหม่ได้ตามเดิมและไม่แสดงซ้ำ ตัวอ่านใช้ PDF.js ที่จัดเก็บในเว็บไซต์ เพื่อบันทึกหน้า ซูม และตำแหน่งเลื่อนอัตโนมัติ พร้อมแสดงจำนวนหน้าจริง เปิดตัวอ่านของเบราว์เซอร์หรือดาวน์โหลดได้เสมอ หากใช้ตัวอ่านสำรองจะบันทึกได้เฉพาะคำสั่งหน้า/ซูมจากปุ่มของเว็บไซต์

ลบรายการ `summaries/original-notes.md` ที่อ้างถึงไฟล์ซึ่งไม่มีอยู่จริงออกจาก catalog แล้ว เอกสารที่มีอยู่ยังคงครบ

### Full website themes

- Forest Green, Ocean Blue, Lavender, Sakura Pink, Warm Sunset และ Midnight มี palette สำหรับ Light / Dark ครอบคลุมพื้นหลัง เมนู การ์ด ปุ่ม ข้อความ เส้นขอบ input และหน้าอ่าน HTML
- Custom Theme เลือก primary/background/surface ได้ สีที่แสดงปรับเพื่อความคมชัดของข้อความอย่างน้อย 4.5:1 และขอบอย่างน้อย 3:1 รวมถึงโหมดมืด เนื้อหาภายใน PDF ไม่เปลี่ยนสี
- เปลี่ยนทันทีและบันทึกใน `skyce-learning-preferences` ใช้ร่วมกับ import/export เดิม; ค่าสีเน้นเก่าย้ายไป preset ที่ใกล้เคียง ปุ่ม Reset theme คืนเฉพาะธีมและโหมดสี ส่วน Reset preferences คืนการตั้งค่าทั้งหมด
- ค่า System/Auto เดิมย้ายเป็น Light และบันทึกกลับครั้งเดียว โดยคง palette, custom colors, ภาษา, ขนาดอักษร และค่าเอกสารเดิม ไม่มีการอ่านหรือเฝ้าติดตามโหมดสีของ OS
- UI ใช้ body 17 px, navigation 15 px, secondary text 14 px, section headings 26–28 px และ course titles 18–20 px; ขนาดตัวอักษรอ่านยังปรับได้ 14–22 px มือถือใช้การ์ดวิชา 1 คอลัมน์และแถบเครื่องมือที่ขึ้นบรรทัดได้
- Book illustration คงการ์ดซ้อนเดิม ขยายการ์ด 45% และแก้ข้อความล้น; brand mark ที่ดูคล้ายเลข 5 คืออักษรไทย ร เปลี่ยนเป็น AAI ในกรอบสีน้ำเงินมน โดยไม่เปลี่ยน favicon
- ตรวจ 210 ชุด theme/mode/page/viewport ที่ 1440/390/320 px, HTML readers ทั้ง 7 หน้า, refresh persistence, Light/Dark toggle, การย้าย System/Auto, ไม่มี OS sync, typography/overflow, custom contrast และ regression เดิม

### พัฒนาและตรวจสอบ

```sh
python -m http.server 8000
node scripts/build.cjs
node scripts/check.cjs
```

เปิด `http://localhost:8000/` (ต้องใช้ HTTP server เพื่อโหลด PDF และ GitHub sync) รัน build หลังแก้ `catalog.json` หรือเพิ่ม PDF; check ตรวจไฟล์ ลิงก์ภายใน JavaScript การตั้งค่า และ PDF ที่ตกหล่น/ซ้ำใน catalog โดยไม่ติดตั้ง dependency

ทดสอบด้วย Chrome/Playwright ที่ 1440, 390 และ 320 px: routing, search, bookmarks, GitHub sync/ข้อผิดพลาด, PDF fixture 3 หน้าและดาวน์โหลด, appearance/language persistence, import/export/reset, storage ถูกปิด และ Python quiz/progress ไม่มี runtime errors ที่ไม่คาดหมาย ยังไม่ได้ทดสอบ Safari/Firefox หรืออุปกรณ์จริง

ตรวจ PDF จริงทั้ง 14 ไฟล์และลิงก์ viewer ที่ `/Course-Website/` แล้ว ทดสอบ Week1: PDF.js next/previous/go-to page, scroll/zoom 150%, refresh/Continue Reading, native fallback และ download ตรงกับต้นฉบับทุกไบต์ และ mobile fallback ที่ 390 px; SHA-256 ของ PDF ต้นฉบับทั้ง 14 ไฟล์ไม่เปลี่ยน

[Figma: Settings และ PDF Viewer — desktop/mobile](https://www.figma.com/design/pmPq5RuGDji2vbkumGfqjf) ใช้สีเดิมและ reusable controls; Figma ใช้ Noto Sans Thai แทน Tahoma ที่ไม่มีในบริการ ส่วนเว็บไซต์คงฟอนต์เดิม

### Continue Reading (Phase 2)

Recent documents resume PDF page, zoom and scroll position, or an HTML section and scroll offset. Positions are local to this browser, saved every 400 ms and flushed on leaving; use **Reset reading position** in a reader to start over without changing completion. PDF.js 6.4.299 is bundled locally under `assets/vendor/pdfjs/` (Apache-2.0 and included asset licenses); no CDN, build step or paid service is required. Native viewer and download remain available. Native internal scrolling/page changes are unavailable to the site; only site controls can save position in that fallback.

Synced PDFs use local files first. If a file is absent in local preview, the reader fetches only its validated PDF path from `Skyce38/Course-Website` on GitHub `main`, checks HTTP status, CORS, MIME type and the PDF signature, and uses a PDF Blob for viewing/download. The canonical document ID and reading position remain the same. Remote-only files require internet; blocked/unavailable files retain direct-open/download links and Retry.

Shared UI scripts/styles use `?v=phase3a-2` to prevent cached dictionaries from mixing with newer markup. Bump the shared release version in HTML and its check when changing these assets. The category-tab ↻ button forces a library-wide file refresh; the header TH/EN button shares the existing language preference.

### Study V2-A layouts

Settings → Website layout offers Classic (the default for new/existing users and older imports) and Modern. Selection applies immediately, persists with existing preferences, and is included in version-1 exports. Modern is an initial academic dashboard for the home/course library with real catalog/completion counts; both layouts share navigation, data and study logic. Modern styles live in `assets/layouts.css` under `data-layout=modern` and `.library-app`; Classic readers retain their existing presentation; Modern reader integration is described below. No new dependencies or PDF changes.

### Study V2-B Modern Dashboard

Modern now has header search (the same input used by Classic), active navigation with real document counts, recent-reading and progress panels, and course cards with actual manual-completion progress. Document actions retain accessible labels and the category refresh remains icon-only. Presentation is isolated to the Modern library; Modern PDF/HTML reader design is extended in V2-C below. Local `_design-references/` files are visual references only and are locally excluded from Git.

### Study V2-C Reader Integration

Modern HTML lessons reuse their existing headings, anchors and menus with a responsive, active Table of Contents and refined article/code typography. Modern PDF controls and actions share the same PDF.js/native engine and document IDs; original page contents are never recolored. A pre-layout-change snapshot restores the HTML section offset or PDF page/zoom/scroll after switching layouts. Refresh also resumes HTML reading when the address still contains an older section anchor. Classic readers remain visually unchanged. Styles and TOC presentation live in `assets/readers.css` and `assets/readers.js`; no dependencies, saved-data migration or Phase 3 features are added.

### Phase 3A — Interactive lesson foundation

The Linked List pilot is authored in `courses/oop-python/summaries/linked-list.md` and generated as `read/oop-python/linked-list.html`, with the permanent resource ID `oop-python-linked-list`. It reuses Classic/Modern readers, preferences, catalog, bookmarks, manual completion and reading positions. Python Code Viewers and a declarative 11-step traversal support copy, active lines/nodes, visited states, Previous/Next/Reset and keyboard controls. Static code, diagram and all bilingual step explanations remain available without JavaScript; no lesson code is executed.

Run `node scripts/build.cjs` and `node scripts/check.cjs`. Only sources in `scripts/lessons.json` are built; hand-maintained readers are protected from overwrites. See [the lesson contracts and authoring guide](docs/interactive-lessons.md) and `templates/lesson.md`. A restricted Markdown subset and shared build/browser data validation avoid new dependencies. Lesson content stays Thai; shared controls and step explanations support TH/EN. Step selection is temporary; document reading positions continue to use the existing storage format. General graph/quiz engines and further lessons are deferred.

### Phase 5 — Direct catalog navigation

The OOP catalog adds 12 Thai lessons with 65 independently verified solved exercises. See [lesson coverage](docs/oop-lesson-coverage.md) and [final validation](docs/phase5-oop-validation.md). Run the standard build/check commands above, plus `python scripts/check-oop-foundations.py` and `python scripts/check-oop-data-structures.py` (Python 3, standard library only).

Learning Paths and their ordered recommendations have been removed. Open every lesson independently through its course/category/search or permanent URL. Recently Opened → Continue Reading, bookmarks, manual completion, course progress and HTML/PDF reading positions retain their original storage keys and behavior. No saved-data reset or replacement sequencing system is introduced. See [catalog navigation](docs/catalog-navigation.md) and [verified OOP source map](docs/oop-curriculum-map.md).

### Phase 6 — Practice Mode MVP

### Phase 8 — Extended Exam Bank and Reading Polish

All 25 registered lessons now also provide Topic Practice and 10/20/30/full mock sessions: **750 unique questions** (460 choice, 165 numeric, 125 ungraded self-assessments). The original 150 questions, revisions and saved attempts remain unchanged. Exam sessions use separate local keys and the shared grader. Generated readers have reviewed prose spacing, compact typography and keyboard-scrollable tables; original programs, equations, tables, solved exercises and stable anchors remain protected. See [coverage](docs/phase8-exam-coverage.md), [verification](docs/phase8-exam-verification.md), [storage/build contract](docs/extended-exam-bank.md) and [reading review](docs/phase8-reading-review.md).

### Phase 10 — Modern learning workspace

Modern now uses compact course tiles, divider-based document lists, flatter readers and Practice/Exam presentation, with direct links to the existing lesson activities. Classic remains the default and visually unchanged. `assets/modern.css` isolates the redesign; shared preferences, study records, grading, revision archives and lesson content keep their existing contracts. See [design boundaries, validation and browser limitations](docs/phase10-ui-redesign.md). Run the usual build/check commands; the optional `scripts/check-modern-ui-browser.cjs` uses `PLAYWRIGHT_MODULE` and `STUDY_BASE_URL` with an isolated Chrome profile.
