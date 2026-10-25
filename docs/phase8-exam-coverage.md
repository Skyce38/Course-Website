# Phase 8 — exam curriculum and reading audit

Baseline: `ba2ac2e`, 25 registered lessons, 150 original questions. The original banks are immutable. Sources below are the verified published lesson and its source section; local-only slides/workbooks are not republished. No inferred exam weighting, teaching order or official answer keys.

## Source availability

15 tracked PDFs (14 OOP decks plus AI introduction); the read-only local FinalSource inventory contains 35 PDFs, 7 workbooks, 3 CSVs and 95 Python files, plus lab documents/figures. Availability is not evidence that every file is a teaching requirement. AI source inventory and OOP curriculum map define verified page/topic boundaries. Neural Training Lab remains source-limited: missing figures/settings cannot become invented questions.

## Coverage method

Read the lesson concepts, objectives, definitions, algorithms, code/formulas, worked examples, mistakes and sources. A question is counted only for the topic it actually tests; mere mentions do not establish coverage. The following baseline gaps are section-level audit candidates, not promises to turn every reference/example into a separate quiz. Existing six-question coverage is necessarily sparse. The final per-question verification ledger adds explicit reasoning, difficulty and validation method.

## Linked List — เข้าใจ Node และไล่ Python ทีละขั้น

Lesson: [oop-python-linked-list](../courses/oop-python/summaries/linked-list.md). Source locators: [lesson sources](../read/oop-python/linked-list.html#sources).

- อธิบาย Node, data, next, head และ tail ได้
- ไล่ Singly Linked List ด้วย Python โดยไม่ทำให้ head เปลี่ยน
- แยกการเปลี่ยน reference ของตัวแปรออกจากการเปลี่ยน link ของ Node
- อธิบายการแทรกและ Big-O พร้อมสมมติฐานที่จำเป็น

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [แนวคิดสำคัญ (Key Concepts)](../read/oop-python/linked-list.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [อธิบายโครงสร้างและ Reference](../read/oop-python/linked-list.html#explanation) | 1 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่างสร้าง Node และ Traversal](../read/oop-python/linked-list.html#examples) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ทดลองทีละขั้น (Interactive Demo)](../read/oop-python/linked-list.html#interactive) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/oop-python/linked-list.html#mistakes) | 1 | Expand distinct subtopics; review existing coverage |

Existing questions: `ll-head` → `question-head`; `ll-empty` → `question-empty`; `ll-remaining` → `explanation`; `ll-insert` → `mistakes`; `ll-tail` → `question-tail`; `ll-audit` → `practice`.

## พื้นฐานปัญญาประดิษฐ์และตัวกระทำอัจฉริยะ (AI & Intelligent Agents)

Lesson: [artificial-intelligence-ai-foundations-agents](../courses/artificial-intelligence/summaries/ai-foundations-agents.md). Source locators: [lesson sources](../read/artificial-intelligence/ai-foundations-agents.html#sources).

- อธิบายความหมายของความฉลาดและแยก Narrow AI, AGI และ Artificial Superintelligence ตามนิยามในสไลด์
- เปรียบเทียบการคิดหรือกระทำแบบมนุษย์กับการคิดหรือกระทำอย่างมีเหตุผล โดยไม่ใช้เกณฑ์หนึ่งแทนอีกเกณฑ์
- อธิบาย Turing Test ข้อจำกัด และข้อโต้แย้งห้องจีน (Chinese Room Argument) อย่างระมัดระวัง
- แยกการอนุมานด้วยตรรกะออกจากการเลือกการกระทำภายใต้ความไม่แน่นอน และคำนวณตัวอย่างอรรถประโยชน์คาดหมาย (Expected Utility)
- ระบุสิ่งแวดล้อม สิ่งรับรู้ การกระทำ และเป้าหมายของตัวกระทำอัจฉริยะ รวมทั้งอธิบายความสัมพันธ์ AI, ML และ Deep Learning
- วิเคราะห์ตัวอย่างรถยนต์และ LLM โดยแยกข้อมูลจากต้นฉบับ สมมติฐาน และข้อสรุปที่ยังพิสูจน์ไม่ได้

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [คำศัพท์หลัก (Key Concepts)](../read/artificial-intelligence/ai-foundations-agents.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [เริ่มจากความฉลาด ไม่ใช่รูปร่างของหุ่นยนต์](../read/artificial-intelligence/ai-foundations-agents.html#intelligence) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ขอบเขตความสามารถสามแบบ](../read/artificial-intelligence/ai-foundations-agents.html#scope) | 1 | Expand distinct subtopics; review existing coverage |
| [สี่แนวทางในการนิยาม AI](../read/artificial-intelligence/ai-foundations-agents.html#four-approaches) | 1 | Expand distinct subtopics; review existing coverage |
| [Turing Test และสิ่งที่การทดสอบบอกไม่ได้](../read/artificial-intelligence/ai-foundations-agents.html#turing-test) | 1 | Expand distinct subtopics; review existing coverage |
| [การคิดด้วยตรรกะและข้อจำกัด](../read/artificial-intelligence/ai-foundations-agents.html#logic) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [การกระทำอย่างมีเหตุผลและอรรถประโยชน์](../read/artificial-intelligence/ai-foundations-agents.html#rational-action) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ตัวกระทำอัจฉริยะและวงจรสิ่งแวดล้อม](../read/artificial-intelligence/ai-foundations-agents.html#agents) | 1 | Expand distinct subtopics; review existing coverage |
| [AI, Machine Learning และ Deep Learning](../read/artificial-intelligence/ai-foundations-agents.html#ai-ml) | 1 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่างจากสไลด์: รถยนต์และ LLM](../read/artificial-intelligence/ai-foundations-agents.html#source-examples) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/artificial-intelligence/ai-foundations-agents.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `aa-scope` → `scope`; `aa-approaches` → `four-approaches`; `aa-turing` → `turing-test`; `aa-utility` → `utility-example`; `aa-ml` → `ai-ml`; `aa-agent` → `agents`.

## แบบจำลองปัญหาและการค้นหา BFS/DFS (Search Models & Uninformed Search)

Lesson: [artificial-intelligence-search-models-bfs-dfs](../courses/artificial-intelligence/summaries/search-models-bfs-dfs.md). Source locators: [lesson sources](../read/artificial-intelligence/search-models-bfs-dfs.html#sources).

- กำหนดสถานะ การกระทำ ต้นทุน สถานะเริ่มต้น และเงื่อนไขเป้าหมายของปัญหาได้
- แยกกราฟสถานะ (State Space Graph) ออกจากต้นไม้การค้นหา (Search Tree) ได้
- ติดตาม Frontier และสถานะที่ค้นพบโดยไม่สับสนกับสถานะที่ขยายแล้ว
- อธิบายและ trace DFS แบบ LIFO และ BFS แบบ FIFO ด้วยลำดับเพื่อนบ้านที่แน่นอนได้
- วิเคราะห์ความครบถ้วน ความเหมาะที่สุด เวลา และหน่วยความจำภายใต้สมมติฐานที่ระบุ
- แก้โจทย์กราฟและกริดจากหน้า 31–32 พร้อมตรวจเส้นทางและการป้องกันวงจรได้

อ่าน [พื้นฐาน AI และตัวกระทำอัจฉริยะ](ai-foundations-agents.md) ก่อน และทบทวน list, dictionary, set, stack และ queue ของ Python ตามจำเป็น ความรู้โครงสร้างข้อมูลนี้เป็น prerequisite ที่ผู้เขียนแนะนำ

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [คำศัพท์สำคัญ (Key Concepts)](../read/artificial-intelligence/search-models-bfs-dfs.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [การกำหนดปัญหาค้นหา (Search Problem Formulation)](../read/artificial-intelligence/search-models-bfs-dfs.html#formulation) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [กราฟสถานะกับต้นไม้การค้นหา](../read/artificial-intelligence/search-models-bfs-dfs.html#graph-tree) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Frontier และชุดสถานะที่เคยพบ](../read/artificial-intelligence/search-models-bfs-dfs.html#frontier) | 1 | Expand distinct subtopics; review existing coverage |
| [ค้นหาเชิงลึก (Depth-First Search: DFS)](../read/artificial-intelligence/search-models-bfs-dfs.html#dfs) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ค้นหาตามความกว้าง (Breadth-First Search: BFS)](../read/artificial-intelligence/search-models-bfs-dfs.html#bfs) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ตัวอย่างทีละขั้นและ Python ที่ตรวจผลแล้ว](../read/artificial-intelligence/search-models-bfs-dfs.html#worked) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [เปรียบเทียบ BFS กับ DFS](../read/artificial-intelligence/search-models-bfs-dfs.html#comparison) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/artificial-intelligence/search-models-bfs-dfs.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `sd-bfs-edges` → `question-source-graph`; `sd-dfs-edges` → `question-source-graph`; `sd-grid` → `question-source-grid`; `sd-cost` → `question-cost`; `sd-completeness` → `question-guarantees`; `sd-trace` → `frontier`.

## FINAL: สหสัมพันธ์ การถดถอยเชิงเส้นและพหุคูณ (Correlation & Linear Regression)

Lesson: [artificial-intelligence-final-regression](../courses/artificial-intelligence/summaries/final-regression.md). Source locators: [lesson sources](../read/artificial-intelligence/final-regression.html#sources).

- อ่านทิศทาง รูปร่าง และความแน่นของ scatter plot และตีความ correlation โดยไม่สรุป causation เกินหลักฐาน
- หาสมการ Simple Linear Regression ด้วย least squares และตีความ slope/intercept พร้อมหน่วย
- คำนวณ prediction, residual, MAE, MSE และ RMSE โดยไม่ปัดเศษระหว่างทางเกินจำเป็น
- แยก simple กับ multiple regression และอ่าน feature/target จากโค้ด C02 ได้
- ตรวจผลคำนวณด้วย Python และแยก training error ออกจากความสามารถบนข้อมูลใหม่

**ลำดับอ่าน:** ทบทวน [Foundations & Agents](ai-foundations-agents.md) ตามจำเป็น แล้วอ่านบท FINAL นี้ได้โดยไม่ต้องใช้ BFS/DFS เป็น prerequisite การวางไว้หลัง [Search Models & BFS/DFS](search-models-bfs-dfs.md) ใน Learning Path เป็น **ลำดับเผยแพร่ชั่วคราว ไม่ใช่ลำดับสอนที่ยืนยันแล้ว** หัวข้อ 8-Puzzle/A*, Minimax และ Logic หยุดการสร้างบทใหม่ไว้ตามลำดับความสำคัญ FINAL โดยไม่ลบงานเดิม

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [ทบทวนการเรียนรู้แบบมีผู้สอน (Supervised Learning)](../read/artificial-intelligence/final-regression.html#supervised) | 1 | Expand distinct subtopics; review existing coverage |
| [Scatter Plot และสหสัมพันธ์ (Correlation)](../read/artificial-intelligence/final-regression.html#correlation) | 1 | Expand distinct subtopics; review existing coverage |
| [Simple Linear Regression: Slope และ Intercept](../read/artificial-intelligence/final-regression.html#simple-regression) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [เกณฑ์กำลังสองน้อยที่สุด (Least Squares)](../read/artificial-intelligence/final-regression.html#least-squares) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ทำนายและตีความ Residual](../read/artificial-intelligence/final-regression.html#prediction) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [แบบฝึกรายได้–ค่าอาหารแบบทีละขั้น](../read/artificial-intelligence/final-regression.html#household) | 2 | Expand distinct subtopics; review existing coverage |
| [MAE, MSE และ RMSE](../read/artificial-intelligence/final-regression.html#errors) | 1 | Expand distinct subtopics; review existing coverage |
| [การถดถอยเชิงเส้นพหุคูณ (Multiple Linear Regression)](../read/artificial-intelligence/final-regression.html#multiple) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/artificial-intelligence/final-regression.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `rg-correlation` → `correlation`; `rg-slope` → `household`; `rg-prediction` → `household`; `rg-mse` → `errors`; `rg-multiple` → `supervised`; `rg-rounding` → `rounding`.

## FINAL: การจำแนกและเพื่อนบ้านใกล้ที่สุด (Classification & KNN)

Lesson: [artificial-intelligence-final-knn](../courses/artificial-intelligence/summaries/final-knn.md). Source locators: [lesson sources](../read/artificial-intelligence/final-knn.html#sources).

- แยก features และ labels ของปัญหา Classification จาก Regression
- คำนวณ Euclidean distance จัดอันดับเพื่อนบ้าน และโหวตด้วย k ที่ระบุ
- อธิบายผลของ one-hot/ordinal encoding และสเกลของ feature ต่อระยะ
- ตรวจตัวอย่าง Drug และ Buy โดยรักษาข้อมูล/รหัสและลำดับแถวต้นฉบับ
- อ่านโค้ด KNeighborsClassifier, train/test split และ accuracy โดยไม่สรุปประสิทธิภาพเกินหลักฐาน

อ่าน [FINAL Regression](final-regression.md) เพื่อเปรียบเทียบ target แบบตัวเลขกับแบบคลาสได้ Learning Path ที่ต่อ Foundations → BFS/DFS → FINAL Regression → FINAL KNN เป็น **ลำดับเผยแพร่ชั่วคราว ไม่ใช่ลำดับสอนที่ยืนยันแล้ว** ไม่อ้างว่า BFS/DFS เป็น prerequisite ของ KNN

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Supervised Learning และ Classification](../read/artificial-intelligence/final-knn.html#classification) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Features และ Labels](../read/artificial-intelligence/final-knn.html#features) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [วิธี KNN และ Euclidean Distance](../read/artificial-intelligence/final-knn.html#algorithm) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [การเข้ารหัสหมวดหมู่ (Categorical Encoding)](../read/artificial-intelligence/final-knn.html#encoding) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [การเลือก k และการโหวต](../read/artificial-intelligence/final-knn.html#choosing-k) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ตัวอย่าง Drug: ทุกระยะและอันดับ](../read/artificial-intelligence/final-knn.html#drug-worked) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ตัวอย่าง Buy: การจัดอันดับและ Majority Vote](../read/artificial-intelligence/final-knn.html#buy-worked) | 1 | Expand distinct subtopics; review existing coverage |
| [Python คำนวณอย่างโปร่งใส](../read/artificial-intelligence/final-knn.html#python-manual) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Python KNeighborsClassifier สำหรับ Buy](../read/artificial-intelligence/final-knn.html#python-sklearn) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Iris: Train/Test Split และ Accuracy](../read/artificial-intelligence/final-knn.html#iris) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/artificial-intelligence/final-knn.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `k-vote` → `buy-worked`; `k-encoding` → `question-distance`; `k-test` → `iris`; `k-distance` → `question-drug`; `k-accuracy` → `question-accuracy`; `k-ties` → `question-ties`.

## FINAL: การจำแนกแบบนาอีฟเบย์ (Naive Bayes Classification)

Lesson: [artificial-intelligence-final-naive-bayes](../courses/artificial-intelligence/summaries/final-naive-bayes.md). Source locators: [lesson sources](../read/artificial-intelligence/final-naive-bayes.html#sources).

- แยก prior, likelihood, evidence และ posterior พร้อมใช้ Bayes' theorem
- คำนวณ categorical class scores จากความถี่และสมมติฐาน conditional independence
- ตรวจตัวอย่าง July/Judy ในสไลด์และ Buy ใน workbook โดยไม่ปะปน smoothing settings
- อธิบายกรณีศูนย์ การ normalize และขอบเขตการตีความคำตอบ
- แยก CategoricalNB จาก GaussianNB และอ่านผล Python โดยไม่อ้าง accuracy เกินหลักฐาน

ทบทวน [FINAL KNN](final-knn.md) เรื่อง features/labels ได้ Path Foundations → BFS/DFS → FINAL Regression → FINAL KNN → FINAL Naive Bayes เป็น **ลำดับเผยแพร่ชั่วคราว ไม่ใช่ลำดับสอนที่ยืนยันแล้ว** ไม่ใช่ข้ออ้างว่า BFS/DFS เป็น prerequisite ของหัวข้อนี้

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [ทบทวน Classification และความน่าจะเป็น](../read/artificial-intelligence/final-naive-bayes.html#probability) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Bayes' Theorem และคำศัพท์](../read/artificial-intelligence/final-naive-bayes.html#bayes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [สมมติฐาน Naive Conditional Independence](../read/artificial-intelligence/final-naive-bayes.html#independence) | 1 | Expand distinct subtopics; review existing coverage |
| [Class Scores และการ Normalize](../read/artificial-intelligence/final-naive-bayes.html#scores) | 1 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่างจากหน้า 7: Judy (July ในแผนงาน)](../read/artificial-intelligence/final-naive-bayes.html#judy) | 1 | Expand distinct subtopics; review existing coverage |
| [Buy จาก X01/X03 และ C01](../read/artificial-intelligence/final-naive-bayes.html#buy) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Zero Counts และ Smoothing](../read/artificial-intelligence/final-naive-bayes.html#smoothing) | 2 | Expand distinct subtopics; review existing coverage |
| [Raw Labels, Ordinal Encoding และ CategoricalNB](../read/artificial-intelligence/final-naive-bayes.html#encoding) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Gaussian Naive Bayes](../read/artificial-intelligence/final-naive-bayes.html#gaussian) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย (Common Mistakes)](../read/artificial-intelligence/final-naive-bayes.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `nb-independence` → `independence`; `nb-prior` → `judy`; `nb-posterior` → `scores`; `nb-laplace` → `smoothing`; `nb-zero` → `smoothing`; `nb-models` → `gaussian`.

## FINAL: ต้นไม้ตัดสินใจ Entropy และ Information Gain (Decision Tree & ID3)

Lesson: [artificial-intelligence-final-decision-tree](../courses/artificial-intelligence/summaries/final-decision-tree.md). Source locators: [lesson sources](../read/artificial-intelligence/final-decision-tree.html#sources).

- อ่าน root/branch/leaf และแปลงเส้นทางเป็นกฎ IF–THEN
- คำนวณ entropy, weighted entropy และ information gain พร้อมจัดการ 0 log 0
- เลือก root/subtree ของ ID3 จาก counts ที่ถูกต้อง
- ตรวจ Sunburn/PlayTennis และอธิบายขอบเขต training fit

ทบทวน [Naive Bayes](final-naive-bayes.md) เรื่อง class counts ได้ Path ต่อบทนี้เป็นลำดับเผยแพร่ชั่วคราว ไม่ใช่ลำดับสอนที่ยืนยัน ไม่เพิ่มบท Midterm

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [แนวคิดและคำศัพท์](../read/artificial-intelligence/final-decision-tree.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Entropy และ Gain](../read/artificial-intelligence/final-decision-tree.html#entropy) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [PlayTennis: Root และ Subtrees](../read/artificial-intelligence/final-decision-tree.html#tennis) | 1 | Expand distinct subtopics; review existing coverage |
| [Python ID3 และการตรวจต้นไม้](../read/artificial-intelligence/final-decision-tree.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Tree-to-Rules และข้อควรระวัง](../read/artificial-intelligence/final-decision-tree.html#rules) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `d-entropy` → `q1`; `d-root` → `sunburn`; `d-rule` → `q5`; `d-gain` → `sunburn`; `d-weighted` → `tennis`; `d-unknown` → `q6`.

## FINAL: ความคล้ายและการจัดกลุ่มลำดับชั้น (Similarity & Hierarchical Clustering)

Lesson: [artificial-intelligence-final-hierarchical-clustering](../courses/artificial-intelligence/summaries/final-hierarchical-clustering.md). Source locators: [lesson sources](../read/artificial-intelligence/final-hierarchical-clustering.html#sources).

- แยก supervised/unsupervised, similarity/distance และเลือก representation
- คำนวณ Euclidean/Manhattan/correlation พร้อมข้อจำกัด
- ทำ agglomerative merges ด้วย single/complete/average linkage
- อ่าน dendrogram, cuts และ outlier โดยไม่ตีความเป็น probability

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Supervised เทียบ Unsupervised](../read/artificial-intelligence/final-hierarchical-clustering.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Similarity, Distance และ Correlation](../read/artificial-intelligence/final-hierarchical-clustering.html#distance) | 1 | Expand distinct subtopics; review existing coverage |
| [Hierarchical: Agglomerative และ Divisive](../read/artificial-intelligence/final-hierarchical-clustering.html#hierarchy) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Linkage ระหว่างกลุ่ม](../read/artificial-intelligence/final-hierarchical-clustering.html#linkage) | 1 | Expand distinct subtopics; review existing coverage |
| [Matrix จากหน้า14](../read/artificial-intelligence/final-hierarchical-clustering.html#matrix-first) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Worked Example หน้า22–25](../read/artificial-intelligence/final-hierarchical-clustering.html#worked) | 3 | Expand distinct subtopics; review existing coverage |
| [Python และการผูก Tie](../read/artificial-intelligence/final-hierarchical-clustering.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Dendrogram, Cut และ Outlier](../read/artificial-intelligence/final-hierarchical-clustering.html#dendrogram) | 1 | Expand distinct subtopics; review existing coverage |
| [Common Mistakes](../read/artificial-intelligence/final-hierarchical-clustering.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `hc-distance` → `distance`; `hc-first` → `worked`; `hc-average` → `linkage`; `hc-final` → `worked`; `hc-cut` → `dendrogram`; `hc-linkages` → `worked`.

## FINAL: K-Means และวิธี Elbow

Lesson: [artificial-intelligence-final-kmeans](../courses/artificial-intelligence/summaries/final-kmeans.md). Source locators: [lesson sources](../read/artificial-intelligence/final-kmeans.html#sources).

- คำนวณระยะ จัดกลุ่ม และปรับจุดศูนย์กลาง (centroid) ได้ทุก iteration
- แยก centroid เริ่มต้นออกจาก centroid หลังอัปเดต และตรวจการหยุด
- คำนวณ SSE และอธิบาย Elbow โดยไม่สรุปว่ามี k ที่ถูกเสมอ
- แยกข้อมูล X05 ออกจาก A02 และตระหนักถึงผลของสเกล/ค่าเริ่มต้น

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [แนวคิดและขั้นตอน K-Means](../read/artificial-intelligence/final-kmeans.html#algorithm) | 2 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่าง X05: แปดจุดจาก Workbook](../read/artificial-intelligence/final-kmeans.html#x05) | 4 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่าง A02: ลูกค้า Internet และ Call](../read/artificial-intelligence/final-kmeans.html#a02) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [เลือก k และ Elbow](../read/artificial-intelligence/final-kmeans.html#elbow) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Python: ติดตามทุกขั้นแบบกำหนดซ้ำได้](../read/artificial-intelligence/final-kmeans.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/artificial-intelligence/final-kmeans.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `km-assignment` → `x05`; `km-centroid` → `x05`; `km-cluster-sse` → `x05`; `km-total-sse` → `x05`; `km-stop` → `algorithm`; `km-audit` → `algorithm`.

## FINAL: โครงข่ายประสาทเทียมและ Perceptron

Lesson: [artificial-intelligence-final-perceptron](../courses/artificial-intelligence/summaries/final-perceptron.md). Source locators: [lesson sources](../read/artificial-intelligence/final-perceptron.html#sources).

- อธิบาย neuron, input, weight, bias และ activation
- คำนวณผลทำนายและ sequential updates ของ perceptron ได้ครบ epoch
- อ่าน decision boundary และอธิบาย AND ทำได้ แต่ XOR แยกด้วยเส้นเดียวไม่ได้
- แยก binary workbook ออกจาก bipolar slides และผลรายงาน L01 ที่จำลองซ้ำไม่ได้

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Artificial Neural Network](../read/artificial-intelligence/final-perceptron.html#ann) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Perceptron และ conventions](../read/artificial-intelligence/final-perceptron.html#perceptron) | 2 | Expand distinct subtopics; review existing coverage |
| [X06: AND ทุกขั้น](../read/artificial-intelligence/final-perceptron.html#and) | 1 | Expand distinct subtopics; review existing coverage |
| [Decision Boundary และ XOR](../read/artificial-intelligence/final-perceptron.html#boundary) | 2 | Expand distinct subtopics; review existing coverage |
| [L01: สิ่งที่ตรวจได้และยังตรวจไม่ได้](../read/artificial-intelligence/final-perceptron.html#lab-evidence) | 1 | Expand distinct subtopics; review existing coverage |
| [Python: Sequential AND](../read/artificial-intelligence/final-perceptron.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/artificial-intelligence/final-perceptron.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `pc-forward` → `perceptron`; `pc-bias` → `and`; `pc-boundary` → `boundary`; `pc-zero` → `perceptron`; `pc-lab` → `lab-evidence`; `pc-xor` → `boundary`.

## FINAL: Multilayer Networks และ Backpropagation

Lesson: [artificial-intelligence-final-backpropagation](../courses/artificial-intelligence/summaries/final-backpropagation.md). Source locators: [lesson sources](../read/artificial-intelligence/final-backpropagation.html#sources).

- อธิบายเหตุผลที่ต้องมี hidden layer และ nonlinear activation
- คำนวณ feedforward, sigmoid derivative, loss และ backpropagation
- แยก gradient sign ออกจาก error delta พร้อมปรับ bias/weights ในลำดับถูกต้อง
- ตรวจผลด้วย finite differences และรู้ข้อจำกัดของการลด loss หนึ่งก้าว

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Single Layer สู่ Multilayer](../read/artificial-intelligence/final-backpropagation.html#networks) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Sigmoid และอนุพันธ์](../read/artificial-intelligence/final-backpropagation.html#sigmoid) | 1 | Expand distinct subtopics; review existing coverage |
| [Loss, Sign และ Backpropagation](../read/artificial-intelligence/final-backpropagation.html#backprop) | 3 | Expand distinct subtopics; review existing coverage |
| [คำนวณหนึ่งก้าวทีละขั้น: ตัวอย่างผู้เขียน](../read/artificial-intelligence/final-backpropagation.html#worked) | 1 | Expand distinct subtopics; review existing coverage |
| [Python และการตรวจอิสระ](../read/artificial-intelligence/final-backpropagation.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/artificial-intelligence/final-backpropagation.html#mistakes) | 1 | Expand distinct subtopics; review existing coverage |

Existing questions: `bp-loss` → `sigmoid`; `bp-output-gradient` → `backprop`; `bp-hidden-gradient` → `backprop`; `bp-update` → `backprop`; `bp-old-weights` → `mistakes`; `bp-check` → `worked`.

## FINAL: ภาพรวม Deep Learning, RNN และ GAN

Lesson: [artificial-intelligence-final-deep-learning-overview](../courses/artificial-intelligence/summaries/final-deep-learning-overview.md). Source locators: [lesson sources](../read/artificial-intelligence/final-deep-learning-overview.html#sources).

- จัดความสัมพันธ์ AI,ML,DL โดยไม่เหมารวมว่า AI ทุกชนิดต้องเรียนจากข้อมูล
- แยก shallow/deep และบทบาท nonlinearactivation
- อธิบาย sequence และรูปแบบ input/output ของ RNN
- แยก Generator/Discriminator และอ่านตัวอย่าง styletransfer อย่างระวัง
- เลือกตระกูล architecture ตามข้อมูลโดยไม่อ้างผล accuracy ที่ไม่มี source

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [AI, ML และ DL](../read/artificial-intelligence/final-deep-learning-overview.html#hierarchy) | 1 | Expand distinct subtopics; review existing coverage |
| [Neuron, Activation และความลึก](../read/artificial-intelligence/final-deep-learning-overview.html#depth) | 1 | Expand distinct subtopics; review existing coverage |
| [RNN และข้อมูลลำดับ](../read/artificial-intelligence/final-deep-learning-overview.html#rnn) | 1 | Expand distinct subtopics; review existing coverage |
| [GAN: Generator และ Discriminator](../read/artificial-intelligence/final-deep-learning-overview.html#gan) | 1 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่าง Style Transfer](../read/artificial-intelligence/final-deep-learning-overview.html#style) | 1 | Expand distinct subtopics; review existing coverage |
| [เปรียบเทียบสถาปัตยกรรม](../read/artificial-intelligence/final-deep-learning-overview.html#comparison) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย](../read/artificial-intelligence/final-deep-learning-overview.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `dl-hierarchy` → `hierarchy`; `dl-affine` → `depth`; `dl-rnn` → `rnn`; `dl-gan` → `gan`; `dl-style-evidence` → `style`; `dl-architecture` → `comparison`.

## FINAL: CNN และการคำนวณภาพ (Image Operations)

Lesson: [artificial-intelligence-final-cnn](../courses/artificial-intelligence/summaries/final-cnn.md). Source locators: [lesson sources](../read/artificial-intelligence/final-cnn.html#sources).

- อ่านภาพเป็น arrays/channels และติดตาม shape ทุกชั้น
- คำนวณ kernel,featuremap,stride,padding,pooling และ ReLU
- แยก cross-correlation/convolution และผลของการกลับ kernel
- คำนวณ RGB channel sums,flatten,FC parameters และ outputsize
- ตรวจข้อผิดพลาดตัวเลขใน source โดยไม่จำค่าที่ขัดกับสูตร

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [ภาพ, Pixels และ CNN](../read/artificial-intelligence/final-cnn.html#images) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Kernel และ convention](../read/artificial-intelligence/final-cnn.html#kernel) | 1 | Expand distinct subtopics; review existing coverage |
| [Source กากบาท: Input และสาม Filters](../read/artificial-intelligence/final-cnn.html#source-matrices) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Padding, Stride และ Output Size](../read/artificial-intelligence/final-cnn.html#shape) | 1 | Expand distinct subtopics; review existing coverage |
| [Max/Average Pooling](../read/artificial-intelligence/final-cnn.html#pooling) | 1 | Expand distinct subtopics; review existing coverage |
| [ReLU, Flatten และ Fully Connected](../read/artificial-intelligence/final-cnn.html#relu-fc) | 2 | Expand distinct subtopics; review existing coverage |
| [RGB และหลาย Output Maps](../read/artificial-intelligence/final-cnn.html#rgb) | 1 | Expand distinct subtopics; review existing coverage |
| [Python: ตรวจทุก Matrix](../read/artificial-intelligence/final-cnn.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/artificial-intelligence/final-cnn.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `cn-correlation` → `kernel`; `cn-size` → `shape`; `cn-parameters` → `rgb`; `cn-pool` → `pooling`; `cn-fc-evidence` → `relu-fc`; `cn-order` → `relu-fc`.

## คลาส ออบเจ็กต์ และ Reference (Classes & Objects)

Lesson: [oop-python-classes-objects](../courses/oop-python/summaries/classes-objects.md). Source locators: [lesson sources](../read/oop-python/classes-objects.html#sources).

- แยก Class, Object, Attribute และ Method พร้อมเลือกใช้แทนกลุ่มตัวแปรที่แยกจากกัน
- ติดตาม self, initialization, reference และ alias โดยไม่สับสนกับการคัดลอก
- อ่านข้อผิดพลาด TypeError/AttributeError จากโค้ด และอธิบายขอบเขตของแบบจำลอง

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [แนวคิดสำคัญ: จากตัวแปรสู่ Object](../read/oop-python/classes-objects.html#concepts) | 1 | Expand distinct subtopics; review existing coverage |
| [Python ที่รันแยกได้](../read/oop-python/classes-objects.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [ไล่สถานะทีละขั้น](../read/oop-python/classes-objects.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [Reference, อายุ และ Class vs Dictionary](../read/oop-python/classes-objects.html#references) | 1 | Expand distinct subtopics; review existing coverage |
| [ความซับซ้อนและขอบเขต](../read/oop-python/classes-objects.html#complexity) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/classes-objects.html#mistakes) | 2 | Expand distinct subtopics; review existing coverage |

Existing questions: `co-instance` → `concepts`; `co-balance` → `trace`; `co-alias` → `references`; `co-init` → `mistakes`; `co-local` → `mistakes`; `co-contract` → `python`.

## Encapsulation และ Properties

Lesson: [oop-python-encapsulation-properties](../courses/oop-python/summaries/encapsulation-properties.md). Source locators: [lesson sources](../read/oop-python/encapsulation-properties.html#sources).

- ออกแบบ publicinterface และ invariant ไม่ใช้คำว่า private เป็นหลักประกันความปลอดภัย
- เขียน property/getter/setter/read-only และใช้ validation ตั้งแต่__init__
- แยก TypeError,ValueError,AttributeError และการเปลี่ยน state ที่สำเร็จ

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Access และ Name Mangling](../read/oop-python/encapsulation-properties.html#concepts) | 1 | Expand distinct subtopics; review existing coverage |
| [Property เป็นช่องทางของ Invariant](../read/oop-python/encapsulation-properties.html#properties) | 2 | Expand distinct subtopics; review existing coverage |
| [Python ที่รวม Validation](../read/oop-python/encapsulation-properties.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [Trace และ Exceptions](../read/oop-python/encapsulation-properties.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [ตัวอย่าง Lab และต้นทุน](../read/oop-python/encapsulation-properties.html#applications) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/encapsulation-properties.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `ep-constructor` → `properties`; `ep-balance` → `trace`; `ep-count` → `practice`; `ep-property-call` → `properties`; `ep-private` → `concepts`; `ep-validation` → `python`.

## การสืบทอด Override และ MRO (Inheritance)

Lesson: [oop-python-inheritance-mro](../courses/oop-python/summaries/inheritance-mro.md). Source locators: [lesson sources](../read/oop-python/inheritance-mro.html#sources).

- เลือก inheritance ด้วย is-a และสัญญาพฤติกรรม ไม่ใช่แค่เห็น attributes เหมือนกัน
- ติดตาม initialization,override,super และ MRO ใน single/multipleinheritance
- คำนวณดอกเบี้ย/ขั้นต่ำพร้อมนับธุรกรรม และแยกข้อจำกัดของตัวอย่างออกจากกฎทั่วไป

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Inheritance และการออกแบบสัญญา](../read/oop-python/inheritance-mro.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ตัวอย่าง Savings และ Diamond](../read/oop-python/inheritance-mro.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [Trace ของ Source-derived Example](../read/oop-python/inheritance-mro.html#trace) | 2 | Expand distinct subtopics; review existing coverage |
| [Private, Init Order และ LSP](../read/oop-python/inheritance-mro.html#contracts) | 2 | Expand distinct subtopics; review existing coverage |
| [ต้นทุนและข้อผิดพลาด](../read/oop-python/inheritance-mro.html#complexity) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `im-mro` → `practice`; `im-super` → `python`; `im-lsp` → `contracts`; `im-private` → `contracts`; `im-zero` → `trace`; `im-savings` → `trace`.

## Polymorphism, Duck Typing และ Abstract Classes

Lesson: [oop-python-polymorphism-abc](../courses/oop-python/summaries/polymorphism-abc.md). Source locators: [lesson sources](../read/oop-python/polymorphism-abc.html#sources).

- เรียกพฤติกรรมผ่าน interface ร่วมโดยไม่เพิ่ม if ชนิดทุกครั้ง
- แยก ducktyping,ABC,abstractmethod และการตรวจชนิด
- คำนวณพื้นที่/เส้นรอบรูป ติดตาม dynamic dispatch และทดสอบ abstract/invalidinputs

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Polymorphism และ Duck Typing](../read/oop-python/polymorphism-abc.html#concepts) | 1 | Expand distinct subtopics; review existing coverage |
| [ABC และขอบเขตการบังคับ](../read/oop-python/polymorphism-abc.html#abc) | 2 | Expand distinct subtopics; review existing coverage |
| [Python: Interface เดียว หลายสูตร](../read/oop-python/polymorphism-abc.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [Trace การเรียก](../read/oop-python/polymorphism-abc.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [isinstance, issubclass และต้นทุน](../read/oop-python/polymorphism-abc.html#types) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/polymorphism-abc.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `pa-perimeter` → `trace`; `pa-abstract` → `abc`; `pa-duck` → `concepts`; `pa-validation` → `python`; `pa-empty-abc` → `abc`; `pa-triangle` → `types`.

## Reference และความสัมพันธ์ระหว่าง Object

Lesson: [oop-python-object-relationships](../courses/oop-python/summaries/object-relationships.md). Source locators: [lesson sources](../read/oop-python/object-relationships.html#sources).

- แยก is-a จาก has-a และการใช้งาน object ชั่วคราว
- ติดตาม reference/sharedstate และผลของการ copycontainer
- เลือก ownership/multiplicity ให้เข้ากับ domain และอธิบาย Pythonlifetime อย่างถูกต้อง

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [ทำไมไม่ยัดทุกอย่างใน Class เดียว](../read/oop-python/object-relationships.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ความสัมพันธ์สามแบบ](../read/oop-python/object-relationships.html#relationships) | 1 | Expand distinct subtopics; review existing coverage |
| [Python: เก็บ Object เดิม ไม่สร้างซ้ำ](../read/oop-python/object-relationships.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Trace Identity และ Container Copy](../read/oop-python/object-relationships.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [Composition ไม่ใช่ Garbage-Collection Command](../read/oop-python/object-relationships.html#lifetime) | 1 | Expand distinct subtopics; review existing coverage |
| [ต้นทุนและการประยุกต์](../read/oop-python/object-relationships.html#complexity) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/object-relationships.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `or-snapshot` → `trace`; `or-area` → `practice`; `or-song` → `relationships`; `or-domain` → `practice`; `or-lifetime` → `lifetime`; `or-design` → `complexity`.

## UML และหลักออกแบบ SRP, OCP, LSP

Lesson: [oop-python-uml-solid](../courses/oop-python/summaries/uml-solid.md). Source locators: [lesson sources](../read/oop-python/uml-solid.html#sources).

- อ่าน UMLclassbox/visibility/relationship/multiplicity แล้วเชื่อมกับ Python
- แยก SRP,OCP,LSP ด้วยเหตุผลของการเปลี่ยนและ contract จริง
- trace การเพิ่ม channel ใหม่โดยไม่เพิ่ม type branch และสร้าง counterexample ของ hierarchy ที่ผิด

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [อ่าน UML อย่างเป็นขั้นตอน](../read/oop-python/uml-solid.html#uml) | 1 | Expand distinct subtopics; review existing coverage |
| [SRP: หนึ่งเหตุผลของการเปลี่ยน](../read/oop-python/uml-solid.html#srp) | 1 | Expand distinct subtopics; review existing coverage |
| [OCP: เปิดให้ขยายผ่านจุดที่ออกแบบไว้](../read/oop-python/uml-solid.html#ocp) | 1 | Expand distinct subtopics; review existing coverage |
| [LSP: ทดแทนแล้วรักษา Contract](../read/oop-python/uml-solid.html#lsp) | 1 | Expand distinct subtopics; review existing coverage |
| [Python และ Counterexample ที่ตั้งใจให้เห็นข้อผิดพลาด](../read/oop-python/uml-solid.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [Trace และการเลือกความรับผิดชอบ](../read/oop-python/uml-solid.html#trace) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ต้นทุนและข้อผิดพลาด](../read/oop-python/uml-solid.html#complexity) | 1 | Expand distinct subtopics; review existing coverage |

Existing questions: `us-uml` → `uml`; `us-srp` → `srp`; `us-ocp` → `ocp`; `us-square` → `lsp`; `us-cost` → `complexity`; `us-push` → `python`.

## Array, Dynamic Array และ Amortized Analysis

Lesson: [oop-python-arrays-dynamic-array](../courses/oop-python/summaries/arrays-dynamic-array.md). Source locators: [lesson sources](../read/oop-python/arrays-dynamic-array.html#sources).

- แยก size/capacity,fixed/dynamic และ reference slots จาก object ที่ถูกชี้
- ไล่ resize/insert/remove/search และรักษา invariants บน empty/singleton/boundaries
- พิสูจน์ amortizedbound ไม่ปน averagecase และอ่าน row-major2D
- ใช้__len__,__getitem__,__setitem__,__str__,__repr__ให้ตรง logicaldata

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Memory Model และ Random Access](../read/oop-python/arrays-dynamic-array.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Doubling และ Amortized Analysis](../read/oop-python/arrays-dynamic-array.html#amortized) | 2 | Expand distinct subtopics; review existing coverage |
| [Python ที่รันเดี่ยวได้](../read/oop-python/arrays-dynamic-array.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Trace Insert และ Remove](../read/oop-python/arrays-dynamic-array.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [Search, 2D และการใช้ Composition](../read/oop-python/arrays-dynamic-array.html#matrix) | 2 | Expand distinct subtopics; review existing coverage |
| [Complexity และข้อผิดพลาด](../read/oop-python/arrays-dynamic-array.html#complexity) | 1 | Expand distinct subtopics; review existing coverage |

Existing questions: `ar-cost` → `amortized`; `ar-row-major` → `matrix`; `ar-amortized` → `amortized`; `ar-indices` → `complexity`; `ar-alias` → `matrix`; `ar-growth` → `trace`.

## FINAL: Stack, Recursion และ Undo/Redo

Lesson: [oop-python-stack](../courses/oop-python/summaries/stack.md). Source locators: [lesson sources](../read/oop-python/stack.html#sources).

- ใช้ LIFO และ Stack ADT แยกจาก storageimplementation
- tracepush/pop/peek และ empty/singleton โดยไม่ให้ head/size ผิด
- อธิบาย call stack/recursion,balancedbrackets,postfix และ undo/redo
- แยก worstcase/amortized และต้นทุนข้อมูล snapshot

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [LIFO และ Stack ADT](../read/oop-python/stack.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Python: สอง Implementations และ Applications](../read/oop-python/stack.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ไล่ Bracket Matching](../read/oop-python/stack.html#brackets) | 1 | Expand distinct subtopics; review existing coverage |
| [Postfix: ลำดับตัวถูกดำเนินการ](../read/oop-python/stack.html#postfix) | 2 | Expand distinct subtopics; review existing coverage |
| [Call Stack และ Recursion](../read/oop-python/stack.html#call-stack) | 1 | Expand distinct subtopics; review existing coverage |
| [Undo / Redo และข้อกำหนด State](../read/oop-python/stack.html#undo) | 1 | Expand distinct subtopics; review existing coverage |
| [Complexity และข้อผิดพลาด](../read/oop-python/stack.html#complexity) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `s-lifo` → `practice`; `s-brackets` → `brackets`; `s-postfix` → `postfix`; `s-factorial` → `call-stack`; `s-undo` → `undo`; `s-explain` → `postfix`.

## FINAL: Queue, Circular Queue, Deque และ Priority Queue

Lesson: [oop-python-queue](../courses/oop-python/summaries/queue.md). Source locators: [lesson sources](../read/oop-python/queue.html#sources).

- ติดตาม front/rear/head/tail และความต่าง Stack กับ Queue ADT
- ตรวจ wrap-around/full/empty ด้วย size และ modulararithmetic
- เลือก deque/priorityqueue ตามสัญญา และทำ stable ties ด้วย arrival counter
- วิเคราะห์เวลาทั้ง core operation และการแปลงข้อมูลเพื่อแสดงผล

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [FIFO และ Linked Queue](../read/oop-python/queue.html#concepts) | 1 | Expand distinct subtopics; review existing coverage |
| [Circular Queue และตัวชี้](../read/oop-python/queue.html#circular) | 1 | Expand distinct subtopics; review existing coverage |
| [Python ที่รันเดี่ยวได้](../read/oop-python/queue.html#python) | 1 | Expand distinct subtopics; review existing coverage |
| [Trace Circular จาก Source](../read/oop-python/queue.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [Deque และการเลือก ADT](../read/oop-python/queue.html#deque) | 1 | Expand distinct subtopics; review existing coverage |
| [Priority Queue และ Tie Breaking](../read/oop-python/queue.html#priority) | 1 | Expand distinct subtopics; review existing coverage |
| [Complexity และข้อผิดพลาด](../read/oop-python/queue.html#complexity) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `qu-empty` → `concepts`; `qu-rear` → `trace`; `qu-full` → `circular`; `qu-priority` → `priority`; `qu-deque` → `deque`; `qu-invariants` → `python`.

## FINAL: Big-O และ Bubble, Selection, Insertion Sort

Lesson: [oop-python-complexity-basic-sorting](../courses/oop-python/summaries/complexity-basic-sorting.md). Source locators: [lesson sources](../read/oop-python/complexity-basic-sorting.html#sources).

- อธิบาย Big-O ในฐานะ growthbound พร้อมสมมติฐาน ไม่ใช้ benchmark แทนพิสูจน์
- ไล่ Bubble/Selection/Insertion ทีละ pass และรักษา invariants
- นับ key comparisons,swaps และ shifts แยกกันพร้อมตรวจ stability
- เลือกวิธีตาม near-sorteddata/ต้นทุนย้าย และทดสอบ empty/duplicate/boundaries

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Time, Space และ Cases](../read/oop-python/complexity-basic-sorting.html#complexity) | 1 | Expand distinct subtopics; review existing coverage |
| [Python และกติกาตัวนับ](../read/oop-python/complexity-basic-sorting.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Bubble Sort: Invariant และทุก Pass](../read/oop-python/complexity-basic-sorting.html#bubble) | 2 | Expand distinct subtopics; review existing coverage |
| [Selection Sort: เลือก Minimum](../read/oop-python/complexity-basic-sorting.html#selection) | 2 | Expand distinct subtopics; review existing coverage |
| [Insertion Sort: รักษา Sorted Prefix](../read/oop-python/complexity-basic-sorting.html#insertion) | 1 | Expand distinct subtopics; review existing coverage |
| [Case Studies จาก Lab ที่มีจริง](../read/oop-python/complexity-basic-sorting.html#applications) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/complexity-basic-sorting.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `b-pass` → `bubble`; `b-stability` → `selection`; `b-space` → `complexity`; `b-comparisons` → `selection`; `b-swaps` → `bubble`; `b-trace` → `insertion`.

## FINAL: Merge Sort, Quick Sort และ Timsort

Lesson: [oop-python-advanced-sorting](../courses/oop-python/summaries/advanced-sorting.md). Source locators: [lesson sources](../read/oop-python/advanced-sorting.html#sources).

- อ่าน recursiontree/recurrence พร้อม basecase และต้นทุนต่อระดับ
- ทำ stablemerge และ Lomutopartition โดยรักษา invariant
- แยก average/balanced/worstcase และ memory ของ arraycopy/recursion/trace
- ใช้ Python stableadaptive sorting โดยไม่อ้าง toyimplementation เป็น Timsort จริง

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Divide and Conquer และ Recursion Tree](../read/oop-python/advanced-sorting.html#concepts) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Python สำหรับตรวจ Trace](../read/oop-python/advanced-sorting.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Merge ทุกระดับ](../read/oop-python/advanced-sorting.html#merge) | 1 | Expand distinct subtopics; review existing coverage |
| [Quick Sort และ Lomuto ทีละขั้น](../read/oop-python/advanced-sorting.html#quick) | 2 | Expand distinct subtopics; review existing coverage |
| [Pivot, Stability และ Space](../read/oop-python/advanced-sorting.html#tradeoffs) | 2 | Expand distinct subtopics; review existing coverage |
| [Timsort และ Python Sorting](../read/oop-python/advanced-sorting.html#timsort) | 1 | Expand distinct subtopics; review existing coverage |
| [ข้อผิดพลาดที่พบบ่อย](../read/oop-python/advanced-sorting.html#mistakes) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `as-merge` → `merge`; `as-partition` → `quick`; `as-worst` → `quick`; `as-python` → `timsort`; `as-space` → `tradeoffs`; `as-compare` → `tradeoffs`.

## FINAL: Hash Tables, Collisions และ Dictionaries

Lesson: [oop-python-hash-tables](../courses/oop-python/summaries/hash-tables.md). Source locators: [lesson sources](../read/oop-python/hash-tables.html#sources).

- คำนวณ bucketindex/ชนกันและแยก collision จาก key เท่ากัน
- ทำ insert/update/get/delete ใน chaining และ linear probing โดยไม่ทำ key หายหรือ size ผิด
- วิเคราะห์ loadfactor/resize/expected/amortized/worst โดยระบุ assumptions
- แยก hashability,insertionorder และ choice ของ dict/OrderedDict/LinkedList

| Concept / subtopics / examples | Existing direct-reference questions | Audit decision |
|---|---:|---|
| [Hash Function และ Collision](../read/oop-python/hash-tables.html#concepts) | 1 | Expand distinct subtopics; review existing coverage |
| [Chaining และ Linear Probing](../read/oop-python/hash-tables.html#resolution) | 1 | Expand distinct subtopics; review existing coverage |
| [Load Factor และ Resizing](../read/oop-python/hash-tables.html#load) | 1 | Expand distinct subtopics; review existing coverage |
| [Python: สอง Models ที่ตรวจ Edge Cases](../read/oop-python/hash-tables.html#python) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |
| [Trace Probe และ Tombstone](../read/oop-python/hash-tables.html#trace) | 1 | Expand distinct subtopics; review existing coverage |
| [Python dict, Hashability และ Ordering](../read/oop-python/hash-tables.html#dict) | 1 | Expand distinct subtopics; review existing coverage |
| [เปรียบเทียบ Implementations (คำอธิบายเสริม)](../read/oop-python/hash-tables.html#comparison) | 1 | Expand distinct subtopics; review existing coverage |
| [Complexity และข้อผิดพลาด](../read/oop-python/hash-tables.html#complexity) | 0 | Uncovered by direct reference; assess definitions, application, edge cases |

Existing questions: `ht-collision` → `concepts`; `ht-tombstone` → `trace`; `ht-load` → `load`; `ht-hashability` → `dict`; `ht-bounded` → `resolution`; `ht-contract` → `comparison`.

## Reading findings and scope

- All 25 sources use explicit stable section anchors; retain them, code examples, tables, formulas and solved exercises.
- OOP paragraphs contain joined technical terms (e.g. Stack storageimplementation, tracepush/pop/peek and page-reference punctuation). Review in context; do not rewrite identifiers/equations/code by regex.
- Regression, KNN and Naive Bayes introductions retain obsolete path wording. Replace with independent-reading guidance without changing prerequisites/source scope.
- Generated Modern CSS overrides base paragraph/heading rhythm. Put the reading polish in a generated-reader-only stylesheet loaded after reader/component/rich styles, preserving font/width controls.
- Long code/tables/math need internal keyboard-accessible scrolling, not page overflow. Keep program indentation and formulas unchanged.
- Long paragraphs are advisory review findings, not automatic line-splitting rules. Existing code/solution blocks remain byte-identical.

## Checkpoint status

A: baseline audit recorded. B: compatibility design in [extended-exam-bank.md](extended-exam-bank.md). C–G: implemented. H–I: final browser/regression validation and release review recorded separately.

## Final bank inventory and objective coverage

25 registered readers each expose the unchanged six-question Study Practice and a 30-question Extended Bank (the same original six plus 24 new questions). Unique inventory is 750, not 900. Topic selectors use real heading IDs and stable question IDs, not inferred curriculum paths.

| Lesson | Original | Added | Full bank | Explicit topic groups |
|---|---:|---:|---:|---:|
| [Linked List — เข้าใจ Node และไล่ Python ทีละขั้น](../read/oop-python/linked-list.html#exam-mode) | 6 | 24 | 30 | 10 |
| [พื้นฐานปัญญาประดิษฐ์และตัวกระทำอัจฉริยะ (AI & Intelligent Agents)](../read/artificial-intelligence/ai-foundations-agents.html#exam-mode) | 6 | 24 | 30 | 15 |
| [แบบจำลองปัญหาและการค้นหา BFS/DFS (Search Models & Uninformed Search)](../read/artificial-intelligence/search-models-bfs-dfs.html#exam-mode) | 6 | 24 | 30 | 18 |
| [FINAL: สหสัมพันธ์ การถดถอยเชิงเส้นและพหุคูณ (Correlation & Linear Regression)](../read/artificial-intelligence/final-regression.html#exam-mode) | 6 | 24 | 30 | 12 |
| [FINAL: การจำแนกและเพื่อนบ้านใกล้ที่สุด (Classification & KNN)](../read/artificial-intelligence/final-knn.html#exam-mode) | 6 | 24 | 30 | 17 |
| [FINAL: การจำแนกแบบนาอีฟเบย์ (Naive Bayes Classification)](../read/artificial-intelligence/final-naive-bayes.html#exam-mode) | 6 | 24 | 30 | 15 |
| [FINAL: ต้นไม้ตัดสินใจ Entropy และ Information Gain (Decision Tree & ID3)](../read/artificial-intelligence/final-decision-tree.html#exam-mode) | 6 | 24 | 30 | 11 |
| [FINAL: ความคล้ายและการจัดกลุ่มลำดับชั้น (Similarity & Hierarchical Clustering)](../read/artificial-intelligence/final-hierarchical-clustering.html#exam-mode) | 6 | 24 | 30 | 9 |
| [FINAL: K-Means และวิธี Elbow](../read/artificial-intelligence/final-kmeans.html#exam-mode) | 6 | 24 | 30 | 6 |
| [FINAL: โครงข่ายประสาทเทียมและ Perceptron](../read/artificial-intelligence/final-perceptron.html#exam-mode) | 6 | 24 | 30 | 7 |
| [FINAL: Multilayer Networks และ Backpropagation](../read/artificial-intelligence/final-backpropagation.html#exam-mode) | 6 | 24 | 30 | 6 |
| [FINAL: ภาพรวม Deep Learning, RNN และ GAN](../read/artificial-intelligence/final-deep-learning-overview.html#exam-mode) | 6 | 24 | 30 | 7 |
| [FINAL: CNN และการคำนวณภาพ (Image Operations)](../read/artificial-intelligence/final-cnn.html#exam-mode) | 6 | 24 | 30 | 8 |
| [คลาส ออบเจ็กต์ และ Reference (Classes & Objects)](../read/oop-python/classes-objects.html#exam-mode) | 6 | 24 | 30 | 6 |
| [Encapsulation และ Properties](../read/oop-python/encapsulation-properties.html#exam-mode) | 6 | 24 | 30 | 7 |
| [การสืบทอด Override และ MRO (Inheritance)](../read/oop-python/inheritance-mro.html#exam-mode) | 6 | 24 | 30 | 6 |
| [Polymorphism, Duck Typing และ Abstract Classes](../read/oop-python/polymorphism-abc.html#exam-mode) | 6 | 24 | 30 | 6 |
| [Reference และความสัมพันธ์ระหว่าง Object](../read/oop-python/object-relationships.html#exam-mode) | 6 | 24 | 30 | 8 |
| [UML และหลักออกแบบ SRP, OCP, LSP](../read/oop-python/uml-solid.html#exam-mode) | 6 | 24 | 30 | 8 |
| [Array, Dynamic Array และ Amortized Analysis](../read/oop-python/arrays-dynamic-array.html#exam-mode) | 6 | 24 | 30 | 6 |
| [FINAL: Stack, Recursion และ Undo/Redo](../read/oop-python/stack.html#exam-mode) | 6 | 24 | 30 | 8 |
| [FINAL: Queue, Circular Queue, Deque และ Priority Queue](../read/oop-python/queue.html#exam-mode) | 6 | 24 | 30 | 7 |
| [FINAL: Big-O และ Bubble, Selection, Insertion Sort](../read/oop-python/complexity-basic-sorting.html#exam-mode) | 6 | 24 | 30 | 6 |
| [FINAL: Merge Sort, Quick Sort และ Timsort](../read/oop-python/advanced-sorting.html#exam-mode) | 6 | 24 | 30 | 7 |
| [FINAL: Hash Tables, Collisions และ Dictionaries](../read/oop-python/hash-tables.html#exam-mode) | 6 | 24 | 30 | 8 |

Totals: {"choice":460,"numeric":165,"self":125}. New difficulty: {"easy":142,"medium":357,"hard":101}. New verification methods: {"python":127,"source-review":373,"rubric-review":100}. Original 125 graded keys retain their committed independent checks; original 25 rubrics remain ungraded.

## Coverage review and limitations

- AI: definitions/four approaches/Turing/logic/agents/utility; problem formulation/Romania/BFS/DFS/frontiers/graph assumptions; correlation/tree example/OLS/units/residuals/error metrics/multiple regression; KNN encodings/distances/ranking/k/ties/Drug/Buy/test accuracy; NB probabilities/Judy/Buy/smoothing/encoding/Gaussian; ID3/entropy/gain/Sunburn/PlayTennis/rules/unknown categories; clustering metrics/linkages/matrices/dendrogram cuts; K-Means assignments/means/SSE/seeds/scale/Elbow; perceptron strict threshold/update/bias/AND/XOR/source-limited lab; backprop forward/chain rule/sign/gradient checks; DL hierarchy/depth/RNN mappings/GAN/style limits; CNN matrices/correlation/shapes/pooling/ReLU/RGB/flatten/FC counts.
- OOP: class/object/self/initialization/aliases; encapsulation/property/invariants/exceptions; inheritance/override/cooperative MRO/contracts; polymorphism/duck typing/ABC; relationships/identity/ownership/copies; UML/SRP/OCP/LSP; arrays/size-capacity/shifting/amortized/row-major; linked references/traversal/insertion/complexity; Stack/brackets/postfix/call frames/undo-redo; FIFO/circular/deque/priority/tie policies; complexity/basic sort traces/stability/counters; Merge/Quick/recursion/Timsort/space; hash/equality/chaining/probing/tombstones/load/rehash/dict.
- Topic coverage is based on substantive tested reasoning and rubric criteria, not just keyword mentions. Source tables/code are covered through focused traces, numerical checks and explanation rubrics rather than reprinting every row as a separate question. Parent-section references include relevant nested material; the direct-reference baseline table above is intentionally not a claim that a missing heading reference means all content beneath it is absent.
- Not expanded: unverified teaching/exam weights, absent neural-lab figures/settings or replay results, official answers to open source questions, full ISP/DIP treatment beyond the original overview, new visualizers or secure exams. No new source datasets or performance claims.
- Duplicate review: exact and number-normalized prompt templates are rejected. Reviewed related questions distinguish different objectives (MAE vs MSE, copy vs alias, bias vs weight, scalar vs parameter count); repeated vocabulary alone is not a duplicate. No new question is an old question with only its numbers changed.
- Reading clarification: the CNN RGB paragraph now explicitly distinguishes scaled RGB channel kernels on page31 from the different F2/F3 filters on page22. This is verified directly against the already-preserved matrices; no equation, matrix or result changed.

See [verification ledger](phase8-exam-verification.md), [compatibility architecture](extended-exam-bank.md) and [reading review](phase8-reading-review.md).
