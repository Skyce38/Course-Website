# รายการตรวจความครอบคลุม: พื้นฐาน AI และ Intelligent Agents

## ที่มาและขอบเขต

- อ่านต้นฉบับแบบ read-only ที่ `FinalSource/Artificial Intelligence/Midterm/01_intro.pdf` (36 หน้า, 5,207,851 bytes)
- เลือกช่วงต่อเนื่องหน้า PDF 3–16: จากความหมาย AI ถึงตัวอย่าง Agent ก่อนหัวข้อประวัติศาสตร์หน้า 17 และตรวจเครดิตหน้า 1 แยกต่างหาก ไม่ขยายไปประวัติศาสตร์ การประยุกต์ภายหลัง หรือจริยธรรมหน้า 17–36
- อ่าน text extraction ของทุกหน้าที่เลือก และ render ตรวจภาพครบหน้า 3–16: ไม่อาศัยชื่อไฟล์หรือข้อความที่ดึงออกมาอย่างเดียว หน้า 4 เป็นภาพนิยาม และสูตรหน้า 9 ดึงตัวอักษรผิด จึงอ้างอิงการอ่านภาพจริง
- ตรวจ SHA-256 แล้วไฟล์ต้นฉบับตรงกับ `courses/artificial-intelligence/slides/01_intro.pdf`; ลิงก์ในบทเรียนใช้สำเนาเดิมของเว็บไซต์ ไม่เพิ่มหรือแก้ PDF
- Markdown: `courses/artificial-intelligence/summaries/ai-foundations-agents.md`; ID: `artificial-intelligence-ai-foundations-agents`

## แผนที่ความครอบคลุมที่ตรวจแล้ว

| ตรวจแล้ว | หน้า PDF | เนื้อหาหรือภาพที่สำคัญ | Section ID ในบทเรียน |
|---|---|---|---|
| ✓ | 1 | ชื่อชุด ผู้ทำสไลด์ ฐานจาก Lazepnik/AIMA และ CC BY-SA 4.0 | sources |
| ✓ | 3 | ภาพ ASIMO พร้อมคำบรรยาย Honda ปี 2000; ใช้เปิดคำถามเรื่อง AI | intelligence |
| ✓ | 4 | นิยาม intelligence ส่วนที่มีกรอบ: เรียนรู้ เข้าใจ รับมือสถานการณ์ เหตุผล ประยุกต์ความรู้ สิ่งแวดล้อม และนามธรรม | intelligence |
| ✓ | 5 | Narrow AI, AGI, Superintelligence; สองอย่างหลังเป็น hypothetical; ลูกศรและสี่แนวทาง | scope, four-approaches |
| ✓ | 6 | Cognitive Sciences; introspection/พฤติกรรม/ภาพสมอง; คำเตือนสมองกับ ANN; จิตสำนึกและ Moral Philosophy | cognition |
| ✓ | 7 | แผนภาพผู้ถาม/มนุษย์/AI, Turing 1950, สี่ความสามารถ, คำทำนาย 30% ใน 5 นาที และความเห็นปี 2023 ที่ไม่มีรายละเอียดทดลอง | turing-test |
| ✓ | 8 | ข้อวิจารณ์ทุกกลุ่ม, Anthropomorphic Fallacy, ELIZA 1964, มุมวิศวกรรม และภาพ Chinese Room/Searle 1980 | turing-limitations |
| ✓ | 9 | เหตุผล/ตรรกะ, Socrates, สามข้อจำกัด และนัย study hard ⇒ A พร้อมเงื่อนไข AND be lucky AND ... | logic, logic-example |
| ✓ | 10 | Optimization, Utility, Expected Utility, ข้อดีด้าน generality/practicality/methods/objective และ Bounded Rationality | rational-action, utility-example |
| ✓ | 11 | ขอบเขตรายวิชา: Narrow AI ที่ act rationally; ภาพขีดฆ่าเกณฑ์อื่น | agents |
| ✓ | 12 | หน้าคั่น Intelligent Agents และภาพ ASIMO เดิม ไม่ใช่หัวข้อเนื้อหาใหม่ที่ตกหล่น | agents |
| ✓ | 13 | Agent–environment loop, percepts/sensors/actions/actuators, developer, knowledge/reasoning/planning, learning เป็น optional | agents |
| ✓ | 14 | วงกลม AI ⊃ ML ⊃ Deep Learning, งาน AI ทั้งหกด้าน, supervised/unsupervised/RL และตำแหน่ง ML หลายจุดในภาพย่อย | ai-ml |
| ✓ | 15 | ภาพถนน คนข้าม และ percept/action/objective ของรถ | car-example |
| ✓ | 16 | ภาพ prompt/ข้อความตอบเรื่อง Socrates, การสร้างคำตามลำดับ และคำถามเปิดเรื่อง objective | llm-example |

## การแยกที่มาและข้อจำกัด

- นิยาม ชื่อแนวคิด โครงสร้างภาพ และตัวอย่างที่ถอดความจากสไลด์ระบุหน้าไว้ในบทเรียน
- สูตรสัญลักษณ์ EU, ค่าความน่าจะเป็น/Utility, การจัดรูป Socrates เป็นสัญลักษณ์, ตารางค่าความจริง, คำอธิบายประเภท ML และคำตอบแบบฝึกเป็นการขยายความ/ตัวอย่างที่เขียนใหม่ ไม่อ้างว่าเป็นผลทดลองหรือสูตรที่พิมพ์ในสไลด์
- ข้อความ ChatGPT ปี 2023 ในหน้า 7 เป็นความเห็นที่ไม่มี protocol/sample/result ประกอบ; ไม่แปลงเป็นข้อเท็จจริงเกี่ยวกับระบบปัจจุบัน
- หน้า 16 ไม่ให้ objective/training specification ของ ChatGPT รุ่นใด จึงคงเป็นคำถามเปิดและอธิบายขอบเขตการอนุมาน ไม่แต่งคำตอบเฉพาะระบบ
- อักษรจีนขนาดเล็กในภาพหน้า 8 ไม่มีคำแปลในเอกสาร ไม่ได้ถอดคำเหล่านั้น แต่ตรวจกล่อง input/data/rule ledger/output และความหมายของแผนภาพแล้ว
- พจนานุกรมหน้า 4 มีความหมายอื่นนอกกรอบ เช่น ข่าวสาร/ข่าวกรอง ไม่ใช่นิยามด้านความสามารถที่สไลด์เลือกใช้ จึงอธิบายความต่างแทนการคัดลอกทั้งหน้าพจนานุกรม
- แผนภาพวงจรและความสัมพันธ์แบบชุดใช้ text blocks กับตารางของ Markdown เดิม ไม่มีการย่อเป็น Step Visualizer เส้นตรงซึ่งจะบิดความหมาย ไม่มี Python ที่ไม่จำเป็น ไม่มี renderer/asset ใหม่
- อ้างเครดิตและเงื่อนไข CC BY-SA 4.0 ตามหน้า 1; ไม่คัดลอกภาพ AIMA/ภาพบุคคล/ภาพพจนานุกรมเป็น asset ใหม่

## ตรวจเนื้อหาเชิงคำนวณ

- P = (0.7, 0.3) รวมเป็น 1; EU(A) = 40, EU(B) = 64 จึงเลือก B ภายใต้สมมติฐานที่ระบุ
- แบบฝึกเปลี่ยน P = (0.95, 0.05): EU(A) = 90, EU(B) = 69 จึงเลือก A
- ตาราง P ⇒ Q เป็นเท็จเฉพาะ P จริง/Q เท็จ; แยกความถูกต้องการอนุมานออกจากความจริงของข้ออ้างตั้งต้น
- เนื้อหา คำอธิบายตัวอย่าง คำถาม เฉลย และสรุปเป็นภาษาไทย; คงชื่อเฉพาะ ศัพท์เทคนิค สูตร และชื่อตัวแปรมาตรฐาน

## Phase 4B-1 integration

- Reused the original pilot Markdown byte-for-byte from the read-only `codex/ai-lesson-pilot` worktree; its staged/uncommitted state is preserved.
- Regenerated [the reader](../read/artificial-intelligence/ai-foundations-agents.html) from [the reused Markdown](../courses/artificial-intelligence/summaries/ai-foundations-agents.md) with the current template, preferences, theme fix and learning navigation; no old generated HTML or runtime code was copied.
- Stable resource ID: `artificial-intelligence-ai-foundations-agents`; registered as the first actual AI lesson in `learning-paths.json`, with the existing OOP path preserved.
- Integration candidate on `codex/ai-foundations-integration`, pending user review/merge/deployment; not a claim that the live website has already published it.
- Source PDF and Markdown match the previously reviewed hashes. Content scope remains physical pages 3–16; page 1 is credited separately and pages 17–36 are explicitly outside the lesson.
- Existing tables/text equations remain compatible without extra scripts; no renderer, dependency, visualizer or BFS/DFS lesson was added.

## Integration QA

- Current `scripts/build.cjs` / `scripts/check.cjs`: PASS, including rich Markdown, traversal, learning-path validation (empty/single/multiple), i18n, study state and PDF-source regressions. Repeated build output is byte-identical.
- Chrome: 12 reader combinations across Classic/Modern, TH/EN, Light/Dark and 1440/390/320px; TOC anchors, completion, bookmarks, exact resume/reset and source-PDF page link passed. Desktop/mobile screenshots reviewed; no horizontal overflow, failed local assets or console errors.
- AI single-lesson boundaries, course totals, Continue Learning exact resume, Back/Forward, all six palettes plus Custom, theme-color/SVG/focus preservation and OOP path/visualizer rendering passed. Saved-state formats and runtime assets were not changed.
- Original pilot Markdown is byte-identical; all 15 tracked PDFs and existing reader content are unchanged. Protected worktree file hashes, staging, status and branches match the pre-integration snapshot.
- Browser verification used desktop Chrome with mobile viewport emulation; physical mobile devices, Safari/Firefox and native-PDF fallback were not rerun. Source limitations on pages 7 and 16 remain as documented above.
