# IoT Final — release QA

## Scope and preservation

Nine new Thai IoT lessons use existing readers, Practice, Extended Exam and catalog-derived Insights. No framework, runtime dependency, new saved-data schema or Learning Paths. Course ID remains `internet-of-things`; code89022567.

`scripts/iot-preservation.json` records the original37 lessons,1110 questions, existing readers/resources and15 PDFs. The older370-anchor baseline and academic/revision tests remain applicable. Private original source hashes and all other worktree HEAD/index/dirty files are checked externally; these private snapshots are not published.

## Reproduction

Run `node scripts/build.cjs`, `node scripts/check.cjs`, the dedicated IoT independent checks, deterministic release checks and browser suites against a local `/Course-Website/` preview. Generated C++ viewers use the existing safe copy component. Only new readers request the extended C++ dictionary and scoped whitespace asset. Insights course registration is derived from validated catalog metadata.

## Browser scope

Use fresh isolated desktop Chrome contexts, never personal storage. Exercise real answer submission, scores, retries, review, copy, section anchors, completion/bookmarks/resume, no-JS fallback and the read-only fourth-course Insights filter. Review1440/1024/390/320px with Classic/Modern, TH/EN, Light/Dark and palettes. Browser plugin unavailable; use the repository Playwright workflow.

Safari, Firefox, physical phones, real screen readers and actual ESP32 hardware are outside the executed coverage. ARIA/keyboard and emulated-width checks are not certification. Exact executed results are recorded before the release checkpoint.

## Final curriculum / source coverage

| Lesson | Source IDs / exact locators in source ledger | Questions |
|---|---|---:|
|01 ESP32 และพื้นฐาน IoT|B5–16,19–27;W09 2–3|30|
|02 Sensors, GPIO และ ADC|A10 task2;A11 1–3;B26–27,94–98|30|
|03 Ultrasonic และการคำนวณระยะ|W09 3–16;A09 requirement2|30|
|04 ระบบวัดระดับน้ำด้วย ESP32|A09;W09 11,14–19|30|
|05 Arduino IDE และ C++|A10;B29–42,75–98|30|
|06 I2C, SPI, UART, GPIO และ ADC|A11;B26–27|30|
|07 PIR และการตรวจจับการเคลื่อนไหว|W12;S12 2–13|30|
|08 Relay และ Nonblocking Timers|W12;S12 14–19|30|
|09 OLED และระบบ IoT แบบรวม|W12;S12 20–27|30|

Total9 lessons /270 new questions (170 four-choice,55 numeric,45 self); full site46 /1380. All seven originals were opened, selected image-based slides/circuits/formulas directly inspected, and their raw SHA-256 values remained unchanged. Source references are local-only locators, not broken public links. No original slides/documents/student submissions are published.

## Executed validation

| Check | Result |
|---|---|
|`node scripts/build.cjs`, `node scripts/check.cjs`|PASS: metadata/catalog/local links/escaping/i18n/contracts/archives/study and new course|
|`node scripts/check-iot-release.cjs`|PASS:56 deterministic outputs;170 protected content files;37 lessons/1110 questions,370 historical anchors and15PDFs|
|IoT exact math / compiler|PASS:28 mathematical keys,27 final C++ assertions,nine sketches,10 timer and8 classifier assertions; see academic ledger|
|`check-iot-browser.cjs`|PASS:all nine readers/54 Practice submissions/225 graded Exam submissions,review/retry/score/refresh/copy/anchors,no-JS;36 all-reader width checks and14 palette/mode checks; fourth-course filters and zero dashboard writes|
|`check-insights-browser.cjs`|PASS: mandatory10correct/15observations=66.7% stays fixed after self-only edits;two-tab refresh,latest self state,archives,malformed/denied data;8 layout cases +14 palette/mode cases|
|`check-modern-ui-browser.cjs`|PASS:46 practice destinations;keyboard shortcuts and held-sync focus;Classic controls;7 palettes×2 modes×4 widths;contrast and22px narrow readers|
|Practice / Exam browser suites|PASS:15 original pilot sessions;all46 banks/1380questions;cross-tab,refresh/reopen,retry/restart,incorrect review,keyboard focus and original saved study/quiz compatibility|
|Historical revision browser suite|PASS:3 old bank migrations,archives,new revision scoring,quota failure,focus,cross-tab and existing study data|
|Sync / reader browser suites|PASS:50 deterministic sync-focus races;24 large-font reader cases and6 TOC/anchor cases|
|Focused existing core browser flows|PASS:IoT and Unix bookmarks/Continue Reading/exact140px section resume/reset;Linked List step/reset;real original PDF page3/150% refresh/native fallback/download link/mobile|
|Existing independent Python checks|PASS:Practice keys/expanded banks/exam derivations/Phase9/OOP foundations+data structures/AI search+Final calculations/Unix arithmetic; reference-reviewed keys/rubrics remain distinct from executions|
|Original Linux Bash re-execution|NOT RUN successfully: Docker Linux engine pipe unavailable; no installation/service changes attempted. Prior Phase12 results are retained; unchanged Unix hashes,300-key structure,35 mathematical keys and browser regressions pass|
|Protected worktrees / private originals|PASS:23 other HEAD/index/dirty-file snapshots;seven original source-file hashes unchanged|

Chrome155.0.8059.85, Node24, Python3.12.14; isolated temporary contexts only. Screenshots stored outside Git. Reviewed Modern1440 Dark,1024 C++,390 reader/course/math/Insights,320 C++/Practice and Classic320 Dark: readable selected palettes,contained horizontal code/table scrolling,working sidebar and no page overflow. A text table/alt description accompanies the authored flow diagram for mobile/accessibility. No observed application console errors or failed local assets. The test fixture's broad readiness selector was narrowed to the Practice section when persisted Exam sections were also mounted; a temporary resume check now waits for the destination anchor before measuring, rather than querying the old page during navigation. No application fix was needed for either fixture issue.

All runtime graders/study/preferences/archives remain unchanged. No localStorage migrations, schema changes, backend, added website dependency or Learning Paths. All registered source lessons/readers and new bank assets are included; private extraction files, Arduino builds, screenshots and environment paths are excluded.

PR-ready for review with the documented Docker rerun and browser/hardware limitations. No merge or deployment performed.
