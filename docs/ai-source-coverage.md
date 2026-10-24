# AI source inventory and evidence coverage

ตรวจเมื่อ 24 ตุลาคม 2026 บน `codex/ai-curriculum-map` จาก main `78f6faa` งานนี้เป็นเอกสารวางแผนเท่านั้น ไม่แก้เว็บไซต์ บทเรียน หรือ learning paths

## ขอบเขตและวิธีตรวจ

- Source root: `FinalSource/Artificial Intelligence/` ใน checkout ต้นทางที่มีเอกสาร local-only ไม่ได้มีใน worktree/ไฟล์ tracked ของ branch นี้ และยังไม่ใช่แหล่งดาวน์โหลดบน GitHub Pages; ไม่จำเป็นต้องเผยแพร่ machine-specific path เพื่อใช้อ้างอิง
- คอลัมน์ Path ด้านล่างเป็น **path สัมพัทธ์ต่อ source root นี้**; ไม่สร้างลิงก์ `../FinalSource/...` ที่ไม่มีไฟล์ใน branch นี้. ข้อยกเว้น A06/X02 ใช้ `[student-id]` แทน prefix รหัสในชื่อไฟล์เพื่อความเป็นส่วนตัว: เป็นชื่ออ้างอิงที่ปกปิดแล้ว ไม่ใช่ literal path; exact filenames ตรวจเทียบ inventory ต้นฉบับแบบ local-only ไม่แนบ mapping/รหัสหรือข้อมูลรายบุคคลเข้า repository
- พบ 33 ไฟล์นอก `tmp/`: PDF 17 ไฟล์ รวม 334 หน้า; XLSX 7; CSV 3; Python 2; TXT 2; Markdown สรุปเดิม 2 ไฟล์ใน `output/` ซึ่งเป็นแหล่งรอง
- ดึงข้อความทุกหน้า PDF ทั้ง 17 ไฟล์ และอ่านหัวข้อ/ช่วงที่อ้าง; ตรวจภาพสดของหน้าที่ใช้เป็นหลักฐานเชิงภาพ/สูตร โดยเฉพาะ KNN/NB, Linear Regression, ANN, Deep Learning และโจทย์ที่ข้อความดึงออกมาไม่ได้ ไม่ใช้ชื่อไฟล์หรือ OCR เก่าเป็นหลักฐานแทนเนื้อหา ไม่ใช่การรับรองคำตอบ/รายละเอียดทุกบรรทัดของทั้ง 334 หน้า
- เลข `p./pp.` ทั้งหมดคือ **ลำดับหน้า PDF แบบ 1-based รวมปก** ไม่ใช่เลขสไลด์ที่เดาเอง สำหรับ workbook ใช้ชื่อ sheet/range; code/TXT ใช้เลขบรรทัด; CSV ใช้ header และจำนวน record ไม่รวม header
- Workbook เปิด read-only: ตรวจ cells/formulas ไม่ recalculate และไม่รับรอง cached answers; scripts ตรวจเนื้อหาโดยไม่ execute, ไม่ติดตั้งไลบรารี ไม่เปิดลิงก์ภายนอกที่ฝังในสไลด์
- `tmp/` มี 78 ไฟล์อนุพันธ์ (TXT 11, PNG 52, JPG 15) ไม่ใช่ 78 teaching sources เพิ่มเติม งานตรวจครั้งนี้เก็บ extraction/render ไว้ใน OS temp เท่านั้น
- เนื้อหาที่แหล่งสอนระบุ, prerequisite ที่ผู้วางแผนแนะนำ และ enrichment แยกใน [topic map](ai-curriculum-map.md); ข้อเสนอบทเรียนอยู่ใน [roadmap](ai-lesson-roadmap.md)

## Lecture sources: มีไฟล์และอ่านได้ทั้งหมด

| ID | Path ที่ตรวจจริง | จำนวนหน้า | หลักฐานหัวข้อและตำแหน่งสำคัญ |
|---|---|---:|---|
| <a id="s01"></a>S01 | `Midterm/01_intro.pdf` | 36 | pp.3–16 foundations/agents; pp.17–25 history/applications; pp.26–36 ethics/safety. p.4 dictionary เป็นภาพ; p.7 เป็นข้อคิดเห็น ChatGPT ไม่ใช่ผลทดลอง; p.16 ตั้งคำถาม objective โดยไม่เฉลย |
| <a id="s02"></a>S02 | `Midterm/Lecture 2_Uniformed Search.pdf` | 32 | pp.2–14 state/graph/tree, Romania, Tic-Tac-Toe, 8-Puzzle; pp.15–21 DFS; pp.22–27 BFS; pp.28–32 comparison/โจทย์ graph และ grid. รักษาชื่อไฟล์ `Uniformed` เดิม ไม่แปลว่าเป็น Uniform-Cost Search |
| <a id="s03"></a>S03 | `Midterm/การแก้ปัญหา 8-Puzzle ด้วย Python.pdf` | 29 | pp.2–9 tuple/state/moves; pp.10–13 BFS; pp.14–18 depth-limited DFS; pp.19–22 Manhattan; pp.23–27 A*/heapq; pp.28–29 output/main. Code หลายหน้าเป็นภาพ |
| <a id="s04"></a>S04 | `Midterm/GameTree.pdf` | 25 | pp.2–12 Minimax/trace/properties/pseudocode; pp.13–24 alpha-beta/ตัวอย่างตัดกิ่ง; p.25 references ไม่ใช่โจทย์เพิ่มเติม |
| <a id="s05"></a>S05 | `Midterm/KnowledgeRepresentation (1).pdf` | 54 | pp.2–11 KB, deduction/induction/abduction และกฎประพจน์; pp.12–19 FOL/quantifiers; pp.20–33 CNF/Skolemization/resolution/unification; pp.34–54 ตัวอย่างพิสูจน์หลายชุด |
| <a id="s06"></a>S06 | `Final/Linear Regression.pdf` | 13 | pp.2–8 scatter/correlation/ตารางต้นไม้; pp.9–13 regression/least squares. pp.2–13 เกือบทั้งหมดเป็นภาพ จึงตรวจภาพจริง |
| <a id="s07"></a>S07 | `Final/KNN_NB_Classification.pdf` | 8 | pp.2–3 classification/Drug table; p.4 KNN/voting; p.5 Iris KNN code; p.6 Bayes/assumption; p.7 categorical July example; p.8 GaussianNB/Iris code. ต้องอ่านภาพ |
| <a id="s08"></a>S08 | `Final/Decision Tree Slide.pdf` | 17 | pp.3–12 classification/ID3/ตัวอย่างผิวไหม้/Occam; pp.13–15 information gain; pp.16–17 tree-to-rules. ปกเอ่ย Explanation Based Learning แต่ไม่พบหน่วยสอนรายละเอียดแยก |
| <a id="s09"></a>S09 | `Final/clustering.pdf` | 46 | pp.2–11 learning types/similarity/distance/correlation; pp.12–30 hierarchical/linkage/dendrogram/outliers/genes; pp.31–45 K-means/objective/elbow; p.46 review. p.5 เพียงเอ่ย mixture model และ dimensionality reduction |
| <a id="s10"></a>S10 | `Final/ANN.pdf` | 25 | pp.2–9 neuron/layers/weights/network connections; pp.10–18 perceptron/decision surface/update/AND–XOR; pp.19–24 multilayer/sigmoid/backprop; p.25 applications. pp.11–24 มีภาพ/สูตรจำนวนมาก |
| <a id="s11"></a>S11 | `Final/Intro_DeepLearning_Slides.pdf` | 33 | pp.2–5 perceptron/activation/shallow–deep; p.6 AI–ML–DL/families; pp.7–8 RNN; pp.9–11 GAN/style-transfer example; pp.12–33 CNN, image operators, kernels, padding, pooling, ReLU, flatten/FC, RGB/channels/stacking |

S01 byte-identical กับ [PDF เดิมบนเว็บไซต์](../courses/artificial-intelligence/slides/01_intro.pdf) (SHA-256 `b0a635626e468311926c5d79c25b35fba7030362b9da2ea2b205fbe3179b36ba`) ใช้ลิงก์ repository-relative นี้ได้ ส่วน PDF อีก 16 ไฟล์ยังไม่มีสำเนา tracked ใน AI course ของ main นี้

## Assignments และ worked artifacts

| ID | Path | Locator | สิ่งที่ยืนยันได้ / ข้อจำกัด |
|---|---|---|---|
| <a id="a01"></a>A01 | `Assignment/Assignment_DecisionTree.pdf` | p.1/1 | หัวข้อ Lab 5; ตาราง PlayTennis 14 records; ให้สร้างต้นไม้; มี log table. ไม่ใช่ข้อสอบกลางภาค/ปลายภาค |
| <a id="a02"></a>A02 | `Assignment/Assignment_KMeans.pdf` | p.1/1 | ลูกค้า 15 จุด, k=3, seeds P01/P02/P03, Euclidean distance, ทำจน centroid ไม่เปลี่ยน; ไม่พบเฉลยของชุดข้อมูลนี้ |
| <a id="a03"></a>A03 | `Assignment/Ex_regression.pdf` | p.1/1 | รายได้–ค่าอาหาร 8 ครัวเรือน มีหน่วยและช่องคำนวณ ให้หาสมการ; จับคู่ข้อมูลได้กับ X07 |
| <a id="a04"></a>A04 | `Assignment/example.pdf` | pp.1–6/6 | Worked handwritten sunburn gain/split/tree, log table p.6; ภาพอ่านได้ แต่ไม่ยืนยันผู้จัดทำหรือความถูกต้องทุกบรรทัด |
| <a id="a05"></a>A05 | `Assignment/Lab_Sol.pdf` | pp.1–3/3 | PlayTennis gain, subtree questions และต้นไม้สุดท้าย p.3; เป็นไฟล์เฉลยที่มีอยู่ ไม่ใช่หลักฐานว่าโจทย์ทุกข้อมี official rubric |
| <a id="a06"></a>A06 | `Assignment/[student-id]Decision Tree File.pdf` | pp.1–4/4 | ภาพสมุดคำนวณ PlayTennis/entropy/gain; public filename alias ปกปิดรหัส; ไม่รับรองว่าเป็นเฉลยผู้สอน และไม่คัดลอกภาพงานส่ง |

## Workbooks, datasets และ scripts

| ID | Path | Locator ที่อ่าน | หัวข้อ / สถานะ |
|---|---|---|---|
| <a id="x01"></a>X01 | `Assignment/input.xlsx` | `Train!A1:E11`, `Test!A1:E2` | Model/Color/Type/Origin → Buy; 10 training records และ 1 query |
| <a id="x02"></a>X02 | `Assignment/[student-id]input.xlsx` | `Train!A1:E11`, `Test!A1:E2` | public filename alias ปกปิดรหัส; ซ้ำ X01 แบบ byte-identical; นับไฟล์จริง 2 แต่ไม่ใช่ dataset 2 ชุด |
| <a id="x03"></a>X03 | `Assignment/input_sol.xlsx` | `Train!A1:E11`, `Test!A1:E2`, `KNN!A1:Q13`, `NaiveBayes!A1:M16` | one-hot distances และ categorical probability products; มีเซลล์ L3/L6 ที่เก็บ formula เพียง `=` ต้องตรวจใหม่ก่อนใช้เป็นเฉลย |
| <a id="x04"></a>X04 | `Assignment/KNN_Example.xlsx` | `KNN!A1:J14` | Drug example, numeric/encoded features, distance formulas J2:J11 และ query row 13; การแปลง BP/Cholesterol ต้องอธิบาย |
| <a id="x05"></a>X05 | `Assignment/Demo_kmeans.xlsx` | `Sheet1!A1:F55` | centroids, distance formulas, assignments และรอบคำนวณ; คนละข้อมูลกับ A02 ไม่ใช่เฉลย A02 |
| <a id="x06"></a>X06 | `Assignment/perceptron.xlsx` | `Sheet1!A1:I27` | AND patterns; alpha B1, initial weights G3:I3, sequential updates D4:I27; ใช้ outputs 0/1 |
| <a id="x07"></a>X07 | `Assignment/regression_example.xlsx` | `regression!B2:S33`, `err!A1:E9` | รายได้–ค่าอาหาร, predicted/error/absolute-error; sheet err มี MSE/RMSE formulas. ไม่ได้ตรวจ recalculation หรือกราฟทุก object |
| <a id="d01"></a>D01 | `Assignment/play_tennis.csv` | header + 14 records | Day/Outlook/Temperature/Humidity/Wind/PlayTennis; labels/rows สอดคล้องโจทย์ A01 ที่ตรวจภาพ |
| <a id="d02"></a>D02 | `Assignment/student.csv` | header + 18 records | Height/Weight/IsFat; ไม่พบ source ที่ระบุชัดว่าต้องใช้กับ L01 จึงไม่ผูกอัตโนมัติ ไม่ใช่เกณฑ์วินิจฉัยสุขภาพ |
| <a id="d03"></a>D03 | `Assignment/StudentPerformance.csv` | header + 300 records | HoursStudied/PreviousScores/SleepHours/SampleQuestionPapersPracticed/PerformanceIndex; C02 อ้างไฟล์นี้โดยตรง |
| <a id="c01"></a>C01 | `Assignment/lab_sol.py` | lines 1–71; imports 3–5, input 12–15, KNN 34–43, NB 50–59 | OneHotEncoder + KNeighborsClassifier(k=3); OrdinalEncoder + CategoricalNB; อ่าน X01. ไม่ execute/ไม่รับรอง printed predictions |
| <a id="c02"></a>C02 | `Assignment/mlr.py` | lines 1–15; features 6, target 8, prediction 13 | multiple linear regression บน D03; ชื่อตัวแปร `predictedCO2` ไม่ตรง target จริง PerformanceIndex ต้องชี้แจง ไม่เปลี่ยน script ต้นฉบับ |
| <a id="l01"></a>L01 | `Assignment/Perceptron.txt` | lines 1–43; Q1 1–12, Q2 14–25, Q3 26–43 | คำถามค่าเริ่มต้น/weights/epochs/plot พร้อมคำตอบงานส่ง; screenshot ที่อ้างไม่พบ; parameters ต่างจาก X06 จึงไม่ถือเป็น run เดียวกัน |
| <a id="l02"></a>L02 | `Assignment/Lab Deep Learning.txt` | lines 1–60; Q1 1–28, Q2–Q4 29–60 | ทดลอง classification, learning rates 0.1/0.001/1, Tanh, hidden 4/output 2; figures 1–4 และ answer screenshots ไม่อยู่ในรายการไฟล์ที่พบ จำนวน epochs ในข้อความเป็นผลรายงาน ไม่ใช่ค่ารับประกัน |

X01 และ X02 มี SHA-256 เดียวกัน: `1a7114d4331b5cc0bbda09f249a6b880489cde69435452818a25126f1cfed2de`

## Existing summaries และ website coverage

| ID | Path / resource ID | Coverage และบทบาท |
|---|---|---|
| <a id="r01"></a>R01 | `output/AI_Exam_Summary_TH.md` | สรุปอนุพันธ์ใน source root ไม่ใช่ slide/exam specification; ไม่ตรง W01 แบบข้อความทั้งไฟล์ จึงไม่ประกาศว่าเป็นสำเนาเดียวกัน |
| <a id="r02"></a>R02 | `output/AI_Quick_Review_TH.md` | สรุปอนุพันธ์ ไม่ตรง W02 แบบข้อความทั้งไฟล์; ใช้หาแนวการทบทวนได้ แต่ต้องตรวจกลับกับ S/A sources |
| <a id="w01"></a>W01 | [summaries/midterm-final.md](../courses/artificial-intelligence/summaries/midterm-final.md) — `artificial-intelligence-midterm-final` | มี overview 11 บท; §1 intro/history/ethics, §2 search, §3 puzzle/A*, §4 game, §5 logic, §6 regression, §7 KNN/NB, §8 tree, §9 clustering, §10 ANN, §11 DL; มีแบบฝึกผู้เรียบเรียง 25 ข้อ ไม่ใช่ข้อสอบจริง |
| <a id="w02"></a>W02 | [tutoring/quick-review.md](../courses/artificial-intelligence/tutoring/quick-review.md) — `artificial-intelligence-quick-review` | ชีททวน condensed Midterm/Final; ไม่ใช่บทเรียนเชิงลึกแยกหัวข้อหรือ official exam outline |
| <a id="w03"></a>W03 | [slides/01_intro.pdf](../courses/artificial-intelligence/slides/01_intro.pdf) — `artificial-intelligence-slides/01_intro.pdf` | PDF published, hash ตรง S01; แหล่งอ่าน ไม่ใช่ registered Markdown lesson |
| <a id="p01"></a>P01 | worktree `codex/ai-lesson-pilot`: `courses/artificial-intelligence/summaries/ai-foundations-agents.md` — `artificial-intelligence-ai-foundations-agents` | Draft ที่มีอยู่จริง ครอบคลุม S01 pp.3–16; ยังไม่อยู่ main/catalog/registry/learning path; ตรวจ read-only ไม่คัดลอกหรือเปลี่ยน staging |

ณ baseline main นี้ AI มี catalog resources 3 รายการข้างต้น แต่ **ไม่มี registered AI lesson**; `scripts/lessons.json` และ `learning-paths.json` ยังมีเพียง Linked List ของ OOP งานเอกสารนี้ไม่เปลี่ยน IDs หรือ configuration เหล่านั้น

## Source-to-topic coverage matrix

| แหล่ง | Topic IDs ใน map | สถานะ |
|---|---|---|
| S01 | AI-T01–AI-T02 | Verified: มีข้อจำกัดด้านคำถามเปิดและกฎหมายตามด้านล่าง |
| S02–S03 | AI-T03–AI-T04 | Verified: มี trace/graph/grid/code practice; ไม่พบ standalone puzzle `.py` |
| S04 | AI-T05 | Verified: ตัวอย่าง minimax/alpha-beta ไม่ใช่ exam weighting |
| S05 | AI-T06–AI-T08 | Verified: เนื้อหาและตัวอย่าง FOL/CNF/proof ครบช่วงที่อ้าง |
| S06, A03, X07, C02, D03 | AI-T09 | Verified: regression มีทั้ง slides, exercise, workbook และ Python; code ไม่ได้มี held-out evaluation |
| S07, X01–X04, C01 | AI-T10–AI-T11 | Verified: GaussianNB ใน slides ต่างจาก CategoricalNB ใน lab; อย่าใช้คำตอบสลับ model |
| S08, A01, A04–A06, D01 | AI-T12 | Verified: มีโจทย์/ต้นไม้/งานทำ; ไม่รับรอง answer artifacts ทั้งหมด |
| S09, A02, X05 | AI-T13–AI-T14 | Verified: hierarchical และ K-means; mixture/dimensionality reduction เป็น named-only |
| S10, X06, L01, D02 | AI-T15–AI-T16 | Verified: ANN/perceptron/backprop; การจับคู่ D02 กับ lab และ missing screenshot ยังไม่ยืนยัน |
| S11 | AI-T17–AI-T18 | Verified: RNN/GAN เป็น overview; CNN มี worked matrices; ไม่มี full training implementation ในไฟล์นี้ |
| L02, S11 pp.2–5 | AI-T19 | Partial: training task/configuration อ่านได้ แต่ original figures และ reproducible setup ขาด |
| R01–R02, W01–W02 | ทั้ง map ตาม sections | Secondary coverage เท่านั้น ไม่ใช้ยืนยันว่าเนื้อหาออกสอบ |

## สิ่งที่ขาด / ยังไม่อาจยืนยัน

| Gap | หลักฐานที่มี | ขอบเขตที่ยังไม่ทราบ / ผลต่อ roadmap |
|---|---|---|
| Syllabus/ปฏิทิน/official exam blueprint หรือข้อสอบจริง | มีโฟลเดอร์ `Midterm/`, `Final/`; A01 ระบุ Lab 5 | ยืนยันการจัดกลุ่มเอกสารได้ แต่ไม่ยืนยันวันสอน ลำดับทุก deck สัดส่วนคะแนน หรือข้อที่จะออกสอบ |
| Original figures และ screenshots ของ L01–L02 | มีชื่อภาพใน TXT แต่ไม่พบไฟล์เหล่านั้น | AI-T19 ยังไม่พร้อมเป็น source-faithful lab เต็มรูปแบบ; ไม่สร้างผลทดลองหรือ epochs มาทดแทน |
| Complete/runnable code bundles | มี C01/C02 และภาพ code ใน S03; Iris เป็น built-in dataset ที่ code ใน S07 เรียก ไม่ใช่ CSV ที่พบในชุดนี้ | ไม่พบ requirements/lockfile หรือ standalone S03 `.py`; code split ใน S07 มี random_state แต่ไม่ใช่ environment/initialization/noise settings ของ L02; ไม่รับรอง replay ทุกผลหรือ accuracy ของรายงาน |
| Source answer authority/consistency | A04/A06 เป็นภาพงานคำนวณ; A05 มี final tree; X03 มี `=` formulas | ต้องคำนวณคำตอบที่จะเผยแพร่ใหม่; distinguish Gaussian/Categorical NB, smoothing, encoding และ parameters ให้ตรงโจทย์ |
| Detailed extra algorithms | S08 cover เอ่ย EBL; S09 p.5 เอ่ย mixture/dimensionality reduction; S01 p.14 เอ่ย RL และ p.18 มี Transformer ใน timeline | ไม่พบหลักฐานหน่วยสอน EBL, EM/GMM, PCA, RL algorithms หรือ Transformer internals; ไม่เพิ่มเป็น core lesson โดยอัตโนมัติ |
| Current law / current LLM capabilities | S01 p.7 เป็นความเห็นปี 2023; p.16 ไม่ให้ objective เฉพาะระบบ; p.32 มี annotation ว่า EO ถูกยกเลิกใน January 2025 | อ้างได้ว่าเอกสารกล่าวเช่นนั้น ไม่ยืนยันว่าสถานะกฎหมาย/ผลิตภัณฑ์ปัจจุบันเป็นอย่างไร; ต้องตรวจแหล่งทางการใหม่หากจะเขียน current-policy lesson |
| Hosted source availability/permissions | มีเพียง W03 เป็น slide tracked ใน main; credits ภายใน decks มาจากหลายแหล่ง | อย่าสร้างลิงก์ Pages ไป source root ที่ไม่มี หรืออัปโหลดทั้งชุดโดยอนุมานสิทธิ์; ใช้คำอธิบายใหม่และตรวจ attribution ก่อนนำภาพไปเผยแพร่ |

## Maintenance and audit result

- Inventory และ page counts ตรวจจากไฟล์จริง ไม่ใช้รายการใน summaries แทน; source paths ทั้ง 33 รายการเข้าถึงได้ ไม่พบ PDF เปิดไม่ได้
- SHA-256 ใช้แยก exact duplicates (X01/X02, S01/W03); ไม่รวม `output/` กับ published summaries เป็นแหล่งอิสระยืนยันกันเอง
- ตาราง topic และ roadmap ไม่ใช่ข้อสอบ ไม่รับรองเฉลยงานส่ง/การคำนวณทั้งชุด ไม่มี copyrighted slide passages หรือภาพต้นฉบับถูกคัดลอกเข้า branch
- เมื่อรับ source ใหม่ ให้เพิ่มแถว ID/locator, ตรวจภาพที่ extraction ขาด, อัปเดต topic/roadmap และระบุระดับหลักฐานก่อนเปลี่ยน lesson registry หรือ learning paths ในงานภายหลัง
- QA ของงานนี้: ตรวจ source paths/hashes ทั้ง 33, internal links/anchors, 69 page-range assertions, topic/lesson IDs ไม่ซ้ำ และ prerequisite graph ไม่มี cycle; แผนทั้ง 19 บทมี objectives/coverage/examples/interactive option/practice/prerequisites/status
- Existing regression suite ผ่านหลัง build ใน disposable copy ของ main. การรันตรง fresh Windows checkout พบ CRLF-only comparison ของ generated Linked List; ยืนยันว่า normalized content ตรงกันโดยไม่ rewrite reader หรือแก้ tests ที่ไม่เกี่ยวกับงานนี้
- Protected worktrees ทั้งห้า (AI Pilot, Phase 3B, Learning Navigation, Rich Content, Theme Toggle) คง branch/status/staging/file hashes เดิม; branch นี้เพิ่มเฉพาะเอกสาร 3 ไฟล์ ไม่มี tracked website/source changes
