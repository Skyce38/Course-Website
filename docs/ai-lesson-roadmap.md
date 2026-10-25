# AI lesson roadmap — source plan and implementation status

> **Combined FINAL priority:** AI-L11–L18 implemented in `codex/ai-final-complete`, pending review/merge. AI-L09 Regression/AI-L10 KNN already on main. Midterm 8-Puzzle/A*, Minimax/Alpha-Beta and Logic remain paused; no work deleted. AI-L19 remains source-limited preparation only. Path order is temporary publication order, not a verified teaching timetable or exam weighting.


อ้าง [topic map](ai-curriculum-map.md) และ [source IDs/locators](ai-source-coverage.md) ไม่มี full lesson, demo, registry หรือ learning-path entry ใหม่ใน Phase 4A

## ลำดับเรียนที่เสนอและความมั่นใจ

**Midterm group:** T01 → T02 → T03 → T04 → T05 → T06 → T07 → T08

**Final group:** ทบทวน R-MATH/R-PROB → ปู supervised/unsupervised ด้วย S09 pp.2–3 และ classification ด้วย S07 p.2 → T09 → T10 → T11 → T12 → T13 → T14 → T15 → T16 → T17 → T18. T19 เป็นแขนงปฏิบัติหลัง T16 เมื่อกู้ source setup ได้ ไม่ต้องเรียน RNN/GAN ก่อนทดลอง feedforward classification

เหตุผลและความแตกต่างที่ต้องเปิดเผย:

1. มีหลักฐานชัดเฉพาะ `01_intro` กับชื่อ `Lecture 2` และลำดับหน้าภายในแต่ละ deck. ไม่พบ syllabus/วันที่สอนที่ยืนยันลำดับ GameTree เทียบ Logic หรือทุก Final deck; ลำดับข้ามไฟล์ข้างต้นเป็น **ข้อเสนอเชิง prerequisite** ไม่ใช่ reconstructed timetable ของอาจารย์
2. รักษา Midterm/Final ตาม folder; ไม่ตีความว่า assignments ทุกไฟล์อยู่ช่วงสอบใด. Lab 5 เป็นเลขที่เห็นใน A01 ไม่ใช้เติมชื่อ/เลขของ labs ที่หาย
3. แยก intro foundations ออกจาก history/ethics เพื่อ reuse P01 ที่มี scope pp.3–16 อย่างตรงไปตรงมา ไม่อ้างว่า P01 ครอบคลุมทั้ง 36 หน้า
4. Search models/BFS/DFS มาก่อน 8-Puzzle/A* และ Minimax เพื่อใช้ frontier/tree vocabulary; แยก logic เป็น propositions → quantifiers → CNF/unification/proof โดยคงลำดับภายใน S05
5. ย้าย learning-type recap จากต้น S09 มาอธิบายก่อน Final regression/classification เป็นการจัดการสอนที่เสนอ พร้อมอ้างหน้าเดิม ไม่ใช่บทใหม่ที่ค้นพบ. Correlation มาก่อน correlation-based similarity; distance มาก่อน K-means; perceptron มาก่อน backprop และ CNN
6. แยกภาค ANN/CNN ที่สูตรและภาพหนาแน่นออกเป็นหน่วยย่อยตาม prerequisite; ไม่เพิ่ม calculus course, PCA, EM หรือ Transformer เพียงเพราะชื่อปรากฏใน overview
7. Priority ใน map คือการจัดคิวผลิตเนื้อหา: เริ่ม T01/T03/T06 ที่เป็นฐาน แล้วทำกลุ่ม P1 ตาม dependency. T02/T17 ยังเป็นเนื้อหาที่ต้องครอบคลุม แม้คิวผลิต P2; ผู้เรียนใช้ W01 overview ระหว่างรอบพัฒนาได้ ไม่ถือว่าหัวข้อถูกตัดออก

การเตรียมสอบใช้โจทย์ที่มีจริง (S02 graph/grid, S05 proofs, A01/A02/A03 และ workbook traces) พร้อมเฉลยที่ตรวจใหม่ ไม่อนุมาน exam weights, guaranteed topics หรือ official answer keys จากชื่อไฟล์/ชีททวน

## รูปแบบบทเรียนและเงื่อนไขเผยแพร่

- ใช้ [Markdown lesson template](../templates/lesson.md) และ [rich-content contract](interactive-lessons.md): objectives, concepts, explanation, examples, mistakes, practice/solutions, summary, sources
- เนื้อหานักศึกษาเป็นภาษาไทยเป็นหลัก เก็บศัพท์อังกฤษในวงเล็บ รวมถึงสูตร ชื่อตัวแปรและ syntax มาตรฐาน. ทุก worked example ระบุว่าเป็น source-derived หรือเขียนเพิ่ม; solutions ต้องคำนวณตรวจใหม่และไม่อ้างว่า source มีคำตอบหากไม่มี
- ใช้ KaTeX inline/block, tables, responsive repository-local raster figures พร้อม alt/caption/source, และ Python code viewer/copy ที่มีอยู่แล้ว. ภาพอ้างอิงในแผนยังไม่ถูกคัดลอกเข้า repo; ตรวจสิทธิ์และหน้าให้ตรงก่อนเผยแพร่
- คอลัมน์/ข้อเสนอ interactive ด้านล่างเป็น **ตัวเลือกในอนาคต ไม่ใช่งานที่พัฒนาแล้ว**. ส่วนใหญ่ใช้ static traces/tables/code viewers ได้; graph/tree/matrix ที่ current stepper แสดง semantics ไม่ครบให้ใช้ภาพอธิบายก่อน ไม่สร้าง visualizer ใหม่ในงานนี้
- `AI-Lxx` เป็น planning ID จับคู่ `AI-Txx` เท่านั้น ไม่ใช่ catalog/resource ID. Existing = เอกสาร published เดิม; Draft = P01 จริง; Planned = ยังไม่มี source lesson file. ใน Phase 4A ยังไม่เติม AI ลง `learning-paths.json`; Phase 4B-1 ลงทะเบียนเฉพาะ P01 ที่มี Markdown/HTML จริงเป็นบทแรกของ AI (รอ review/merge/deploy)

## Existing / Draft baseline

| Artifact | Status | การ reuse |
|---|---|---|
| W01 `artificial-intelligence-midterm-final` | Existing overview | เก็บ ID/reader/anchors; ใช้เป็น overview และค้นช่องว่าง ไม่เปลี่ยนชื่อเป็น registered lessons หลายบท |
| W02 `artificial-intelligence-quick-review` | Existing review sheet | คงเป็น review sheet ไม่ถือว่าเทียบเท่า objectives/practice ครบทุก dedicated lesson |
| W03 `artificial-intelligence-slides/01_intro.pdf` | Existing source PDF | ลิงก์ใช้ได้และ hash ตรง S01; ไม่แก้เนื้อหา |
| P01 `artificial-intelligence-ai-foundations-agents` | Integration candidate; original Draft preserved | reuse [Markdown](../courses/artificial-intelligence/summaries/ai-foundations-agents.md) เดิมและ generate [HTML](../read/artificial-intelligence/ai-foundations-agents.html) ด้วย builder ปัจจุบัน; ไม่คัดลอก HTML เก่า; registry/path พร้อมใน branch integration รอ user review/merge/deploy |

## Midterm lesson plans

### AI-L01 / T01 — พื้นฐาน AI และตัวกระทำอัจฉริยะ (AI Foundations & Intelligent Agents)
- **Objectives:** แยก 4 แนวทาง/ขอบเขต AI; อธิบาย percept–action–objective; บอกข้อจำกัด Turing Test และ bounded rationality
- **Required coverage:** S01 pp.3–16 พร้อม credits p.1; คง caveat p.7 และ open question p.16
- **Examples:** source car/Socrates/LLM; EU numerical example ใน P01 เป็น original instructional example ต้องติดป้ายเดิม
- **Interactive:** ไม่จำเป็น; rich equations, comparison table และภาพวงจรที่อธิบายได้ครบเหมาะกว่า stepper เส้นตรง
- **Practice needed:** reuse/recheck 10 ข้อใน P01; ต้องแยก objective จาก achieved outcome และไม่สร้างเฉลย objective เฉพาะ ChatGPT
- **Prerequisites / status:** ไม่มี topic dependency; **Published on main** reuse บทเดิม ไม่เขียนซ้ำ

### AI-L02 / T02 — ประวัติ การประยุกต์และ AI ที่รับผิดชอบ (History, Applications & Responsible AI)
- **Objectives:** อธิบาย AI winters/drivers/effect; จับคู่ applications; วิเคราะห์ bias/privacy/safety/alignment ในบริบท source
- **Required coverage:** S01 pp.17–36; ระบุปีของ policy examples และ annotation p.32 ไม่อ้างกฎหมายปัจจุบันโดยไม่ตรวจใหม่
- **Examples:** source timeline/applications/optimizer; กรณีอภิปรายใหม่ต้องระบุว่าเขียนเสริม
- **Interactive:** optional comparison/reveal questions ในอนาคต; static timeline/figure captions เพียงพอ
- **Practice needed:** 6 conceptual/case prompts พร้อมเหตุผล; ไม่มีข้อใดอ้างเป็นข้อสอบจริง
- **Prerequisites / status:** T01; **Planned, P2**; W01 §1 เป็น overview เท่านั้น

### AI-L03 / T03 — แบบจำลองปัญหาและ BFS/DFS (Search Models & BFS/DFS)
- **Objectives:** กำหนด state/actions/start/goal/cost; trace frontier; เปรียบเทียบ guarantees/complexity ภายใต้สมมติฐาน
- **Required coverage:** S02 pp.2–32 โดยไม่ข้าม graph/tree distinction หรือ exercises pp.31–32
- **Examples:** source Romania, graph 0→5 และ grid; กำหนด successor order ในคำอธิบายเพิ่มให้ผล trace ไม่กำกวม
- **Interactive:** Python code viewer + static frontier table; step selection เป็น optional ถ้า contract เดิมแทนสถานะได้จริง
- **Practice needed:** 6 ข้อ รวม 2 source exercises, cyclic case และ counterexample สำหรับ least-cost claim; คำตอบใหม่ต้องแยกจาก source
- **Prerequisites / status:** T01/R-DS; **Published on main** — [Markdown](../courses/artificial-intelligence/summaries/search-models-bfs-dfs.md) / [coverage](ai-search-bfs-dfs-coverage.md); registry และ AI path หลัง Foundations พร้อมบน main

### AI-L04 / T04 — แก้ 8-Puzzle ด้วย Python และ A* (8-Puzzle & A*)
- **Objectives:** สร้าง valid moves; อธิบาย visited/depth/cost; คำนวณ Manhattan และ g+h ตาม goal จริง; อ่าน heapq/path reconstruction
- **Required coverage:** S03 pp.2–29; เปรียบเทียบกับ state examples S02 pp.13–14
- **Examples:** source initial/goal/main block; เชื่อมแต่ละ code screenshot กับ state โดยถอด syntax ตรวจใหม่
- **Interactive:** code viewer/copy + trace tables; ไม่สร้าง solver/visualizer ใน Phase 4A
- **Practice needed:** 6 แบบฝึก state/moves/heuristic/frontier/goal/depth-bound; parity proof จัด E02 หากเพิ่มภายหลัง
- **Prerequisites / status:** T03/R-PY/R-MATH; **Planned, P1**

### AI-L05 / T05 — ค้นหาในเกมและตัดกิ่ง (Minimax & Alpha-Beta)
- **Objectives:** backup utilities ตาม MAX/MIN; trace alpha/beta; อธิบาย pruning และเงื่อนไข complexity
- **Required coverage:** S04 pp.2–24; เก็บ node roles/leaf order จากภาพและตรวจ pseudocode ก่อนใช้
- **Examples:** source worked trees; variant leaf values/order เป็นตัวอย่างเขียนใหม่แยกต่างหาก
- **Interactive:** static annotated tree + code viewer; generic linear stepper ไม่ถือว่าเป็น tree renderer
- **Practice needed:** 5 ข้อ utility backup, bounds, pruned nodes, move ordering, depth cutoff พร้อมเหตุผล
- **Prerequisites / status:** T03/R-DS; **Planned, P1**

### AI-L06 / T06 — ฐานความรู้และตรรกะประพจน์ (Knowledge Bases & Propositional Logic)
- **Objectives:** แยก knowledge/inference; แยก deduction/induction/abduction; ใช้ inference rules และตรวจ invalid conclusion
- **Required coverage:** S05 pp.2–11; เชื่อมกับ logic framing S01 p.9 โดยไม่ถือว่า premise เป็นจริงเสมอ
- **Examples:** source KB diagrams/rule panels; truth-table counterexamples ใหม่ต้องติดป้ายเขียนเสริม
- **Interactive:** KaTeX rules/truth tables; ไม่ต้องมี component ใหม่
- **Practice needed:** 6 ข้อ proposition/connectives/rule choice/counterexamples; ตรวจเฉลยทุก truth assignment ที่ใช้
- **Prerequisites / status:** T01; **Planned, P0**

### AI-L07 / T07 — ประโยคและขอบเขตตัวบ่งปริมาณ (FOL & Quantifier Scope)
- **Objectives:** แปลประโยคเป็น predicates/quantifiers; แยก constants/variables/functions; อธิบาย negation/nested scope
- **Required coverage:** S05 pp.12–19 รวมคำเตือน p.17 และ nested quantifiers p.19
- **Examples:** source ECT/quantifier statements; ตัวอย่างใหม่ให้กำหนด domain ชัดเจน
- **Interactive:** paired text/formula tables; optional self-check ภายหลัง ไม่สร้าง quiz engine
- **Practice needed:** 6 translation/scope/counterexample tasks พร้อม domain และคำอธิบายเฉลย
- **Prerequisites / status:** T06; **Planned, P1**

### AI-L08 / T08 — จากประโยคสู่การพิสูจน์ (CNF, Unification & Resolution)
- **Objectives:** ทำ clause form/Skolem dependencies โดยไม่สับสน satisfiability กับ logical equivalence; หา substitution; trace refutation ถึง empty clause
- **Required coverage:** S05 pp.20–54; ครอบคลุม generic conversion, Somchai, Marcus และ Exciting Life ไม่เลือกเพียงสูตรสั้น
- **Examples:** source pp.27–29/34–54; สมมติฐานในตัวอย่างต้องไม่กลายเป็นข้อเท็จจริงทั่วไป
- **Interactive:** numbered derivation/clause tables และ KaTeX; optional controlled step reveal ในงานถัดไป
- **Practice needed:** 8 ข้อ CNF, Skolemization, substitution, valid/invalid resolution และ full proof; recompute worked solutions
- **Prerequisites / status:** T06–T07; **Planned, P1**

## Final lesson plans

### AI-L09 / T09 — สหสัมพันธ์และการถดถอย (Correlation & Regression)
- **Objectives:** อ่าน scatter/r; หา/ตีความ slope/intercept/residual; เปรียบเทียบ error measures; อ่าน multiple-feature fit จาก script
- **Required coverage:** S06 pp.2–13; A03 p.1; X07 `regression`/`err`; C02 lines 1–15 และ D03
- **Examples:** source tree data และ household data; StudentPerformance เป็น code example จริง ไม่อ้าง held-out accuracy ที่ไม่มี
- **Interactive:** equations, calculation tables, Python code viewer; optional slope controls ภายหลังเท่านั้น
- **Practice needed:** 6 hand-calculation/interpretation/error/code-reading tasks; รักษาหน่วยรายได้กับค่าใช้จ่ายต่างกัน
- **Prerequisites / status:** R-MATH/R-PY ตามส่วน; **Published on main** — [Markdown](../courses/artificial-intelligence/summaries/final-regression.md), [coverage](ai-final-regression-coverage.md);

### AI-L10 / T10 — จำแนกด้วยเพื่อนบ้าน (Classification & KNN)
- **Objectives:** แยก features/labels; คำนวณระยะ/vote; อธิบาย encoding/k; อ่าน split/fit/predict/accuracy
- **Required coverage:** S07 pp.2–5; X01–X04; C01 lines 12–43
- **Examples:** source drug/Buy/Iris; ระบุ k ของแต่ละตัวอย่างไม่ปนภาพ voting กับ code
- **Interactive:** distance table + code viewer; ไม่สร้างใหม่ทั้ง training environment
- **Practice needed:** 5 tasks distance/ranking/tie convention/encoding/train-test; scaling experiment ใหม่เป็น E03
- **Prerequisites / status:** R-MATH/R-PY; **Published on main** — [Markdown](../courses/artificial-intelligence/summaries/final-knn.md), [coverage](ai-final-knn-coverage.md); หลัง Regression ตามลำดับเผยแพร่ชั่วคราว

### AI-L11 / T11 — จำแนกด้วยเบย์ (Naive Bayes)
- **Objectives:** คำนวณ class scores; อธิบาย conditional independence; แยก Gaussian กับ categorical และผลของ zero/smoothing
- **Required coverage:** S07 pp.6–8; X03 `NaiveBayes`; C01 lines 50–59
- **Examples:** Judy จาก source p.7 (ชื่อ July ในแผนเดิมอ่านคลาดเคลื่อน); Buy จาก lab; ไม่ใช้ Gaussian likelihood แทน categorical counts โดยไม่อธิบาย
- **Interactive:** probability/product tables และ code viewer
- **Practice needed:** 5 count/score/assumption/model-choice tasks; คำนวณเฉลยใหม่และแก้ความกำกวมของ X03 โดยไม่แก้ source file
- **Prerequisites / status:** T10/R-PROB; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-naive-bayes.md), [coverage](ai-final-naive-bayes-coverage.md)

### AI-L12 / T12 — สร้างต้นไม้ด้วย Information Gain (Decision Trees & ID3)
- **Objectives:** คำนวณ entropy/weighted gain; เลือก split/ต่อ subtree; อ่านต้นไม้และแปลงเป็น rules
- **Required coverage:** S08 pp.3–17; A01 p.1; A04 pp.1–6; A05 pp.1–3; A06 pp.1–4; D01
- **Examples:** source sunburn และ PlayTennis เป็นคนละ dataset; แยก worked artifacts จาก official answer authority
- **Interactive:** static annotated tree, gain tables และ KaTeX; tree visualizer ไม่ใช่ requirement ปัจจุบัน
- **Practice needed:** 6 root/subtree/rules/zero-probability tasks; ทำ verification จาก counts ไม่คัดค่ามาจากงานส่ง
- **Prerequisites / status:** T10/R-PROB; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-decision-tree.md), [coverage](ai-final-decision-tree-coverage.md)

### AI-L13 / T13 — จัดกลุ่มแบบลำดับชั้น (Similarity & Hierarchical Clustering)
- **Objectives:** เลือก distance/similarity; เปรียบเทียบ linkage; trace merges และอ่าน dendrogram/cut/outlier
- **Required coverage:** S09 pp.2–30,46; แยก named-only mixture/dimensionality reduction ออกจากเนื้อหาที่อธิบายจริง
- **Examples:** source distance matrices/dendrogram/genes; ไม่ตีความ dendrogram height เป็น probability
- **Interactive:** matrix/merge tables + responsive figure with alt text; no new graph renderer
- **Practice needed:** 5 merge/linkage/cut/metric interpretation tasks; เฉลยสร้างใหม่จาก matrix ที่ระบุ
- **Prerequisites / status:** R-MATH, T09 correlation recap; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-hierarchical-clustering.md), [coverage](ai-final-hierarchical-coverage.md)

### AI-L14 / T14 — วนรอบ K-Means และเลือก k (K-Means & Elbow)
- **Objectives:** assign/update centroid; ติดตาม objective/convergence; อธิบาย initialization/k limitations
- **Required coverage:** S09 pp.31–46; A02 p.1; X05 `Sheet1!A1:F55`
- **Examples:** source algorithm frames และ A02 seeds ที่กำหนด; X05 คนละข้อมูลจึงไม่เรียกเฉลย assignment
- **Interactive:** per-iteration tables/figures; centroid animation เป็น optional แยกงานในอนาคต
- **Practice needed:** 5 assign/update/SSE/stop/elbow tasks; คำนวณทุก iteration ของคำตอบใหม่ก่อนเผยแพร่
- **Prerequisites / status:** T13/R-MATH; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-kmeans.md), [coverage](ai-final-kmeans-coverage.md)

### AI-L15 / T15 — หน่วยประสาทและ Perceptron (ANN & Perceptron)
- **Objectives:** ระบุ input/weight/bias/activation; คำนวณ output/update; อธิบาย decision boundary และ AND/XOR limitation
- **Required coverage:** S10 pp.2–18,25; X06 `Sheet1!A1:I27`; L01 lines 1–43 ในฐานะ task/รายงานที่ยังขาดภาพ
- **Examples:** source AND/XOR; workbook AND 0/1 convention; ไม่ปนกับ bipolar rule/parameters ต่างชุด
- **Interactive:** code/calculation table และ equations; plot ใหม่เป็น instructional example ไม่อ้างว่าเป็น missing screenshot
- **Practice needed:** 6 output/update/bias/boundary/separability tasks พร้อม convention ที่ชัดเจน
- **Prerequisites / status:** R-MATH และ vector ส่วน R-CALC; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-perceptron.md), [coverage](ai-final-perceptron-coverage.md)

### AI-L16 / T16 — คำนวณหลายชั้นและ Backpropagation (MLP & Backpropagation)
- **Objectives:** forward pass; คำนวณ sigmoid derivative/loss/deltas; อธิบาย gradient updates และ local-minimum limitation
- **Required coverage:** S10 pp.19–24; S11 pp.2–5
- **Examples:** source XOR network และ algorithm; numerical gradient example ใหม่ระบุว่าเขียนเสริม ตรวจ sign/bias/update order
- **Interactive:** code viewer + forward/backward tables; ไม่ execute Python จาก Markdown
- **Practice needed:** 6 forward/derivative/delta/update/sign/limitation tasks; original numerical solutions ต้อง independently check
- **Prerequisites / status:** T15/R-CALC; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-backpropagation.md), [coverage](ai-final-backpropagation-coverage.md)

### AI-L17 / T17 — ภาพรวม Deep Learning, RNN และ GAN (Deep Learning Families)
- **Objectives:** เปรียบเทียบ shallow/deep; จับคู่ sequence/image/generation task กับ architecture; อธิบายบทบาท generator/discriminator
- **Required coverage:** S11 pp.2–11; ไม่ขยายเป็น full training theory หรือ Transformer internals
- **Examples:** source RNN configurations และ GAN/style transfer; รักษาเครดิตของ figures
- **Interactive:** comparison tables/diagrams; ไม่ต้องมี runnable RNN/GAN lab
- **Practice needed:** 5 architecture/task/role/limitations prompts พร้อมเหตุผล ไม่เพิ่ม claims เรื่อง model ปัจจุบัน
- **Prerequisites / status:** T16; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-deep-learning-overview.md), [coverage](ai-final-deep-learning-overview-coverage.md)

### AI-L18 / T18 — คำนวณภาพใน CNN (CNN & Image Operations)
- **Objectives:** trace feature map/filter; คำนวณ stride/padding/pooling/ReLU; อธิบาย flatten/FC และ channel aggregation
- **Required coverage:** S11 pp.12–33 รวม image operators pp.16–18, pooling variants p.25 และ RGB pp.31–33
- **Examples:** source cross/filter matrices; คำนวณใหม่จากภาพจริง แยก convolution convention และไม่ยึด flow เดียวเป็นกฎทุก CNN
- **Interactive:** equations/matrices/annotated raster figures; kernel slider หากทำภายหลังต้องแยก scope ไม่จำเป็นต่อบทแรก
- **Practice needed:** 8 cell-computation/output-size/padding/pooling/ReLU/channel tasks พร้อม intermediate steps
- **Prerequisites / status:** T15–T16, R-MATH/vector-matrix; **Implemented / pending combined PR merge** — [lesson](../courses/artificial-intelligence/summaries/final-cnn.md), [coverage](ai-final-cnn-coverage.md)

### AI-L19 / T19 — ทดลองการฝึกและ Learning Rate (Neural Training Lab)
- **Objectives:** ตั้งค่า classification task; บันทึก parameters/run conditions; เปรียบเทียบ learning rates โดยไม่อ้าง epochs คงที่
- **Required coverage:** L02 lines 1–60 และ original figures 1–4/setup ที่ต้องขอเพิ่ม; S11 pp.2–5 เป็นแนวคิดประกอบ ไม่ใช่ข้อมูลแทนภาพที่หาย
- **Examples:** ใช้โจทย์เดิมได้เมื่อกู้รูป/เครื่องมือ/ข้อมูล/initialization/noise settings ครบ; ผลใน TXT เป็น reported run เท่านั้น
- **Interactive:** ยังไม่เลือกเครื่องมือ เพราะ source ไม่ระบุ reproducible environment ครบ; ไม่เพิ่ม dependency/backend
- **Practice needed:** 4 task groups ตามข้อความ พร้อม capture settings และ run log; ไม่แต่งคำตอบ Q2–Q4 หรือใช้ screenshot ชุดใหม่แอบแทนต้นฉบับ
- **Prerequisites / status:** T15–T16 และ source recovery; **Source-limited preparation / not registered** — [guide and missing evidence](ai-final-neural-training-lab-preparation.md)

## Next action and publication gate

1. Review the combined AI-L11–L18 implementation using [release verification](ai-final-complete-validation.md); do not regenerate the reused Naive Bayes draft.
2. AI-L01/L03/L09/L10 are already on main; preserve stable IDs and existing OOP. AI-L11–L18 exist in this branch only until the combined PR merges. No automatic merge/deployment.
3. AI-L19 has a preparation guide only: recover figures/data/settings before publishing a verified lab. Reported epochs are not reproduced results.
4. Midterm paused lessons remain outside this task; any future teaching-order or exam-weight claims require evidence. Add path entries only for real built lessons; never placeholders.
