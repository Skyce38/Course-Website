# แผนที่หัวข้อ Artificial Intelligence ตามหลักฐาน

อ่านร่วมกับ [source inventory/coverage](ai-source-coverage.md) และ [lesson roadmap](ai-lesson-roadmap.md) ตรวจบน main `78f6faa` วันที่ 24 ตุลาคม 2026 ไม่มีการเพิ่มบทเรียนหรือแก้ learning paths

## ระดับหลักฐานและสถานะ

- **T — Explicitly taught:** แนวคิด/รูป/โจทย์ที่ตรวจพบใน source IDs และ physical PDF pages ที่ระบุ ตารางหลักด้านล่างมีเฉพาะ T; ไม่แปลว่าทั้งหัวข้อเป็นข้อสอบ
- **R — Recommended prerequisite:** ความรู้ที่ผู้วางแผนแนะนำเพื่อให้ตามบททัน ไม่อ้างว่าเป็น lecture ที่พบแยกต่างหาก
- **E — Enrichment:** ส่วนต่อยอดนอกหลักฐานสอนที่พบ ไม่รวมใน core coverage หรือสร้างบทเรียนในงานนี้
- `W01 §n` หมายถึงบทเลข n ในสรุปฉบับเต็ม published; W02 เป็น quick review. ทั้งคู่เป็น overview/ชีททวน ไม่ใช่ registered lesson รายหัวข้อ `P01` เป็น AI Foundations draft ต้นฉบับใน worktree แยก; Phase 4B-1 reuse Markdown ใน branch integration โดยไม่แก้ต้นฉบับ (รอ review/merge/deploy ยังไม่อ้างว่าเผยแพร่บนเว็บไซต์แล้ว)
- Priority **P0** = เริ่มก่อนเพื่อปูฐาน/ใช้ draft เดิม; **P1** = core วิธีคิด/คำนวณที่มีตัวอย่างและใช้ต่อยอด; **P2** = จัดทำหลังฐานพร้อมหรือยังมีข้อจำกัดของ source. เป็น **ลำดับงานเนื้อหา ไม่ใช่น้ำหนักสอบ**

## R: prerequisite recommendations

| ID | ความรู้แนะนำ | ใช้ก่อน / ขอบเขต |
|---|---|---|
| R-PY | ตัวแปร เงื่อนไข ลูป ฟังก์ชัน list/tuple/set/dict และการอ่านตารางใน Python | T04, T09–T11; S03 สอน tuple/moves อยู่แล้ว จึงทบทวนพื้นฐานก่อน ไม่สมมติว่าผู้เรียนจบ OOP ทั้งรายวิชา |
| R-DS | node/edge, queue/stack, FIFO/LIFO และการอ่านสัญลักษณ์ complexity | T03–T05; เป็นสะพานสั้น ไม่บังคับเรียน Linked List ของอีกวิชาก่อน |
| R-MATH | ผลรวม ค่าเฉลี่ย กราฟ สมการเส้นตรง กำลังสอง และระยะทางพิกัด | T04, T09–T16; ทบทวนตามงาน ไม่เปิดหน่วยคณิตศาสตร์ใหม่ทั้งวิชา |
| R-PROB | สัดส่วน conditional probability, log2, weighted average และ convention ของ entropy ที่ p=0 | T11–T12; แยกค่าความน่าจะเป็นออกจากเพียงคะแนนเปรียบเทียบ class |
| R-CALC | vector/matrix และอนุพันธ์/chain rule ที่จำเป็น | vector ก่อน T15/T18, chain rule ก่อน T16; derivative ใน S10 pp.21–24 มีจริง แต่แบบฝึก bridge เพิ่มต้องติดป้ายว่าเขียนเสริม |

## T: กลุ่ม Midterm ตามตำแหน่ง source

| Topic ID / ชื่อไทย (English) | Source evidence | Main concepts | Examples / practice ที่มีจริง | Prerequisites แนะนำ | Existing coverage / Priority |
|---|---|---|---|---|---|
| **AI-T01 พื้นฐาน AI และตัวกระทำอัจฉริยะ (AI Foundations & Intelligent Agents)** | [S01](ai-source-coverage.md#s01) pp.3–16 | intelligence; Narrow/AGI/Superintelligence แบบ hypothetical; 4 approaches; Turing/Chinese Room; rationality, utility, bounded rationality; agent loop; AI/ML/DL | ASIMO, Socrates, study-hard implication, car, LLM prompt; p.16 เป็นคำถามเปิด ไม่ใช่เฉลย objective | ไม่มี dependency หัวข้ออื่น; R-MATH เฉพาะตัวอย่างคำนวณที่เขียนเพิ่ม | W01 §1, W02 Midterm = overview; **P01 integration candidate** (reused Draft, รอ review/merge); **P0** |
| **AI-T02 ประวัติ การประยุกต์ จริยธรรมและความปลอดภัย (History, Applications, Ethics & Safety)** | S01 pp.17–36 | history timeline/AI winters, drivers, Moravec/AI effect, vision/NLP/robotics; fairness/privacy/accountability, bias, alignment/reward hacking/robustness | timeline p.18, applications pp.23–25, policy figures pp.28–32, optimizer figure p.35; ไม่มีเฉลย case exercise แบบแยก | T01 | W01 §1/W02 ย่อ; ไม่มี dedicated lesson; **P2** แต่ไม่ตัดออกจาก core |
| **AI-T03 แบบจำลองปัญหาและ BFS/DFS (Search Models & Uninformed Search)** | [S02](ai-source-coverage.md#s02) pp.2–32 | state/actions/cost/start/goal; graph vs search tree; frontier; completeness/optimality/time/space ของ DFS/BFS พร้อมเงื่อนไข | Romania p.6; traces pp.16/21/23/27; comparison pp.28–30; graph/grid exercises pp.31–32 ไม่มี official full answer key | T01, R-DS | W01 §2/W02 Midterm; **Search Models & BFS/DFS integration candidate**, **P0** — [coverage](ai-search-bfs-dfs-coverage.md), รอ review/merge |
| **AI-T04 8-Puzzle และ A* ใน Python (8-Puzzle, Heuristics & A*)** | [S03](ai-source-coverage.md#s03) pp.2–29; S02 pp.13–14 | immutable state, legal moves, visited/reached depth/cost, BFS vs depth-limited DFS, Manhattan excluding blank, g+h, heapq, path output | ภาพ code/pseudocode และ main test; goal `(0,1,2,3,4,5,6,7,8)` ในเอกสาร; ไม่พบ standalone script | T03, R-PY, R-MATH | W01 §3/W02; dedicated Planned; **P1** |
| **AI-T05 ค้นหาในเกม (Minimax & Alpha-Beta Pruning)** | [S04](ai-source-coverage.md#s04) pp.2–24 | alternating MAX/MIN, utility backup, bounded-depth evaluation, complexity, alpha/beta bounds and pruning | minimax worked tree pp.4–8; pseudocode pp.10–11/17–18; pruned tree pp.19–24 | T03, R-DS | W01 §4/W02; dedicated Planned; **P1** |
| **AI-T06 ฐานความรู้และตรรกะประพจน์ (Knowledge Bases & Propositional Inference)** | [S05](ai-source-coverage.md#s05) pp.2–11 | data/information/knowledge; KB/inference mechanism; deduction vs induction/abduction; propositions/connectives; modus ponens, AND/OR rules, double negation/resolution | KB figure pp.7–8; rule panels pp.9–11; ไม่มีไฟล์โจทย์แยก | T01; พื้นฐาน true/false | W01 §5/W02 Logic; dedicated Planned; **P0** |
| **AI-T07 ตรรกะอันดับหนึ่งและตัวบ่งปริมาณ (First-Order Logic & Quantifiers)** | S05 pp.12–19 | constants/variables/functions/predicates, relations, universal/existential quantifiers, negation/scope/nesting | นักศึกษา/ECT pp.16–17; quantifier equivalences p.18; nested statements p.19 | T06 | W01 §5/W02; dedicated Planned; **P1** |
| **AI-T08 CNF การแทนค่าและพิสูจน์ (CNF, Unification & Resolution)** | S05 pp.20–54 | resolution refutation, eliminating connectives, standardization, Skolem dependencies, clause form, substitutions, empty clause | general CNF pp.27–29; Somchai pp.34–41; Marcus pp.42–52; Exciting Life pp.53–54 | T06–T07; ความสัมพันธ์เหตุผลกับข้ออ้างตั้งต้น | W01 §5/W02 condensed; dedicated Planned; **P1** |

## T: กลุ่ม Final และงานปฏิบัติที่เชื่อมโยง

ชื่อกลุ่ม Final อิงโฟลเดอร์จริง ส่วน assignments ไม่มีป้าย Midterm/Final ครบทุกไฟล์ จึงจัดเข้าหัวข้อตามเนื้อหา ไม่อ้างว่าส่ง/สอบในช่วงใดแน่นอน

| Topic ID / ชื่อไทย (English) | Source evidence | Main concepts | Examples / practice ที่มีจริง | Prerequisites แนะนำ | Existing coverage / Priority |
|---|---|---|---|---|---|
| **AI-T09 สหสัมพันธ์และการถดถอย (Correlation & Linear Regression)** | [S06](ai-source-coverage.md#s06) pp.2–13; [A03](ai-source-coverage.md#a03) p.1; X07; C02/D03 | scatter/r; slope/intercept; least-squares residuals; workbook error/MAE/MSE/RMSE; multiple-feature regression ใน script เป็น extension ที่มี source code จริง | ตารางความสูง/เส้นผ่านศูนย์กลางต้นไม้ pp.7–8; รายได้–ค่าอาหาร A03/X07; StudentPerformance C02 | R-MATH; R-PY สำหรับ code | W01 §6/W02 Regression; **FINAL regression integration candidate, P0 FINAL priority** — [coverage](ai-final-regression-coverage.md), รอ review/merge |
| **AI-T10 การจำแนกด้วยเพื่อนบ้าน (Classification & KNN)** | [S07](ai-source-coverage.md#s07) pp.2–5; X01–X04; C01 lines 12–43 | labels/features, distance, k/vote, encoding; train/test/accuracy ปรากฏใน Iris code p.5 | drug table p.3/X04; KNN diagram p.4; k=3 Iris code p.5; Buy query ใน X01/X03/C01 | R-MATH, R-PY; R-PROB แบบสัดส่วน | W01 §7/W02 Classification; dedicated Planned; **P1** |
| **AI-T11 การจำแนกแบบเบย์ (Naive Bayes Classification)** | S07 pp.6–8; X03 `NaiveBayes`; C01 lines 50–59 | Bayes posterior/proportional class score, conditional independence given class; categorical counts vs Gaussian likelihood; smoothing/conventions ต้องตรง model | July categorical example p.7; GaussianNB/Iris p.8; CategoricalNB Buy query C01/X03 | T10 สำหรับ workflow/encoding, R-PROB | W01 §7/W02; dedicated Planned; **P1** |
| **AI-T12 ต้นไม้ตัดสินใจ (Decision Trees, Entropy & ID3)** | [S08](ai-source-coverage.md#s08) pp.3–17; A01/A04–A06/D01 | classification tests/branches/leaves, multiple consistent trees/Occam, entropy/weighted gain, recursive splits, tree-to-rules | sunburn/hair/lotion; A01 PlayTennis; A05 final tree; งานเขียน A04/A06 ไม่ใช่รับรองเฉลย | R-PROB, T10 พื้นฐาน classification | W01 §8/W02; dedicated Planned; **P1** |
| **AI-T13 ระยะห่างและจัดกลุ่มลำดับชั้น (Similarity & Hierarchical Clustering)** | [S09](ai-source-coverage.md#s09) pp.2–30,46 | supervised vs unsupervised; similarity/Euclidean/Manhattan/correlation; agglomerative/divisive; single/complete/average linkage; dendrogram cuts/outliers | distance matrices/merges pp.14–25; dendrogram p.26; cluster count/outlier pp.28–29; genes p.30 | R-MATH; T09 correlation ช่วยอ่าน similarity | W01 §9/W02 Clustering; dedicated Planned; **P1** |
| **AI-T14 เคมีนส์และจำนวนกลุ่ม (K-Means & Cluster Selection)** | S09 pp.31–46; [A02](ai-source-coverage.md#a02) p.1; X05 | assign/update centroids, initialization, within-cluster squared objective, convergence, choice of k/elbow limitations | animation-like frames pp.35–39; objective pp.41–45; A02 ลูกค้า 15 จุด; X05 เป็นอีก worked dataset | T13 พื้นฐาน distance/clustering, R-MATH | W01 §9/W02; dedicated Planned; **P1** |
| **AI-T15 โครงข่ายและเพอร์เซปตรอน (ANN Foundations & Perceptron)** | [S10](ai-source-coverage.md#s10) pp.2–18,25; X06; L01 | neural analogy/layers/input/weight/bias/sum/activation; decision surface; update rule/epochs; linear separability/AND–XOR; network application types | ANN diagrams pp.4–9; AND/XOR tables pp.16–18; X06 AND formulas; L01 questions/งานส่งไม่ใช่ reproducible run พร้อมข้อมูล | R-MATH, vector ส่วน R-CALC | W01 §10/W02 ANN; dedicated Planned; **P1** |
| **AI-T16 หลายชั้นและแพร่ย้อนกลับ (Multilayer Networks & Backpropagation)** | S10 pp.19–24; [S11](ai-source-coverage.md#s11) pp.2–5 | nonlinear decision surfaces, sigmoid/derivative, forward pass, loss, output/hidden deltas, gradient-descent weight updates, local minima | XOR multilayer figure p.20; sigmoid pp.21–22; algorithm/error pp.23–24; nonlinear point clouds S11 pp.3–4 | T15, R-CALC | W01 §10/W02; dedicated Planned; **P1** |
| **AI-T17 ภาพรวมการเรียนรู้เชิงลึก (Deep Learning, RNN & GAN Overview)** | S11 pp.2–11 | shallow/deep/activation recap; AI–ML–DL; sequential data/RNN configurations; generator/discriminator and style-transfer example | RNN panels pp.7–8; GAN diagrams pp.9–11; ไม่มี RNN/GAN training lab ในชุดที่พบ | T16; ไม่เพิ่ม Transformer architecture จากเพียง timeline | W01 §11/W02 เป็น overview; dedicated Planned; **P2** |
| **AI-T18 โครงข่ายคอนโวลูชัน (CNN & Image Operations)** | S11 pp.12–33 | feature maps/filter/operators; stride/padding; max/average pooling; ReLU; flatten/FC; RGB/channel aggregation/output maps/stacking | 5×5 cross, 3×3 filters pp.14–15/20–23; pooling pp.24–26; ReLU pp.27–28; channels pp.31–33 | T15–T16, matrix ใน R-CALC, R-MATH | W01 §11/W02 CNN; dedicated Planned; **P1** |
| **AI-T19 ทดลองการฝึกและ learning rate (Neural Training Lab)** | [L02](ai-source-coverage.md#l02) lines 1–60; S11 pp.2–5 ช่วยปูแนวคิด | classification task, Tanh, learning rate/reset/epochs, architecture/feature choices ตาม task text | Q1 ปรับ learning rate; Q2–Q4 ให้ capture settings/results แต่ **figures และ screenshots ขาด**; L01 เป็น perceptron lab คนละงาน | T15–T16; R-PY เฉพาะเมื่อใช้ code; ต้องกู้ missing setup ก่อน | ไม่พบ dedicated coverage ใน W01/W02; **Planned / source-blocked, P2** |

## E: enrichment ที่ไม่รวมเป็น core ที่ยืนยันแล้ว

| ID | ข้อเสนอเพิ่มเติม | เหตุผลที่แยก |
|---|---|---|
| E01 | reproducible seeds, leakage checks, stratified validation/cross-validation, richer classification metrics | S07 มี train/test/accuracy แต่ไม่พบหน่วยสอนเทคนิคทั้งหมดนี้; ใช้เสริมคุณภาพตัวอย่างโดยติดป้ายเพิ่ม |
| E02 | A* admissibility/consistency proofs และ inversion-parity solvability test ของ 8-Puzzle | S03 มี Manhattan/g+h/code แต่ยังไม่พบการพิสูจน์เต็มหรือ parity unit; ห้ามอ้างว่าอยู่ในสไลด์เพียงเพราะเป็นความรู้มาตรฐาน |
| E03 | smoothing comparison, scaling sensitivity, careful causal interpretation, alternate initial seeds | บางกลไกมีใน code/โจทย์จริง แต่ชุดทดลองเปรียบเทียบใหม่เป็นตัวอย่างผู้เรียบเรียง ไม่ใช่ผลการสอน/เฉลยที่ source รับรอง |
| E04 | PCA/EM/GMM, full RL, EBL, Transformer/LLM training internals | พบเพียงชื่อหรือ overview ที่ระบุใน inventory; ต้องหา teaching material เพิ่มก่อนเพิ่ม core lessons |

E ไม่ใช่ prerequisite ที่ต้องแอบเพิ่มเข้า sequence และไม่ใช่งาน implementation ใน Phase 4A นี้

## ข้อควรระวังด้านความถูกต้องสำหรับผู้เขียนบทเรียน

1. S01 p.7 ไม่ใช่หลักฐาน Turing benchmark; p.16 ไม่เฉลย objective ของ ChatGPT. ตัวอย่าง EU ใน P01 เขียนเสริม ไม่ใช่สูตร/ตัวเลขบนสไลด์
2. BFS least-cost claim ต้องมีเงื่อนไข unit/equal step costs; DFS completeness ขึ้นกับ finite/cycle/depth assumptions. แยก DFS theory ใน S02 จาก depth-limited implementation ใน S03
3. S03 ใช้ goal order เริ่มที่ 0; อย่าสลับไป goal blank-last แล้วใช้ Manhattan target-index เดิม. ไม่แปลงคำบรรยายเชิงเปรียบเทียบว่า A* “ดีที่สุดทุกกรณี”
4. FOL/Skolem terms ต้องคง scope/dependencies. แยก proof steps ออกจากการสมมติข้อเท็จจริงใน Marcus/Exciting Life ไม่อ้างว่าเป็นประวัติศาสตร์หรือกฎความจริงทั่วไป
5. S06 p.9 เป็น modeling assumption ไม่ใช่ข้อพิสูจน์ causation; C02 fit ทั้งข้อมูลโดยไม่มี held-out evaluation จึงไม่มี evidence ของ generalization accuracy
6. GaussianNB S07 p.8 กับ CategoricalNB C01 ไม่ใช่ likelihood เดียวกัน; X03 count products ที่มี zero กับ library smoothing อาจต่างกัน ห้ามคัด prediction มาใช้โดยไม่ระบุ convention
7. S10 perceptron ใช้ทั้ง bipolar และ binary conventions และ boundary ต่างกันในบางหน้า; X06 เป็น 0/1, alpha/initial weights ต่างจาก L01. แยก recurrent/backward connections p.9 ออกจาก backprop training pp.23–24
8. CNN example ของสไลด์แสดง pooling ก่อน ReLU ใน flow p.20/30; อธิบายว่าเป็น flow ของตัวอย่าง ไม่ประกาศเป็นลำดับบังคับของ CNN ทุกแบบ. ตรวจ kernel orientation และ stride/padding จากภาพก่อนคำนวณใหม่
9. Ethics/policy เป็นเนื้อหาในเอกสารตามปีที่ระบุ; S01 p.32 มี annotation เรื่องการยกเลิก EO ใน January 2025 แล้ว แต่ไม่ได้เป็นการตรวจสถานะกฎหมายปัจจุบันของงานนี้
