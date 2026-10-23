# ชีททวนเร็ว AI: Midterm + Final

อ่านหลังเข้าใจบทหลักแล้ว ใช้เวลาประมาณ 10–15 นาที รายละเอียด ตัวอย่าง และแหล่งอ้างอิงอยู่ใน สรุปฉบับเต็ม

## Midterm

| หัวข้อ | จำให้ได้ |
|---|---|
| AI/ML/DL | DL ⊂ ML ⊂ AI; AI รวม search และ logic ด้วย |
| 4 มุมมอง AI | Think human, Act human, Think rational, Act rational |
| Agent | Percept → ตัดสินใจ → Action เพื่อ Objective |
| Rational | เลือกให้เหมาะกับเป้าหมายและข้อมูลที่มี; bounded rationality มีข้อจำกัดทรัพยากร |
| Bias | Pre-existing=อคติเดิม, Technical=ด้านเทคนิค, Emergent=บริบทใช้ใหม่ |
| Reward hacking | คะแนนดีแต่ไม่บรรลุเจตนาของงาน |
| Search problem | State space, start, actions/successors, costs, goal test |
| Complete/optimal | หาเจอถ้ามีคำตอบ / ได้ต้นทุนต่ำสุด |
| BFS | Queue/FIFO; ตื้นก่อน; complete เมื่อเงื่อนไขเหมาะสม; optimal เมื่อ cost เท่ากัน; เวลา/พื้นที่ O(b^d) ตามสไลด์ |
| DFS | Stack/LIFO; ลึกก่อน; ไม่ optimal; อาจไม่ complete ถ้าลึกไม่สิ้นสุด; เวลา O(b^m), frontier O(bm) |
| 8-Puzzle | 0=ช่องว่าง; tuple ใช้เป็น key/set ได้; row=i//3,col=i%3 |
| A* | f=g+h; เลือก f ต่ำสุด; เก็บ best g ของแต่ละสถานะ |
| Heuristic | Admissible: h ไม่เกินต้นทุนจริงที่เหลือ |
| Manhattan | รวมระยะต่างแถวและคอลัมน์แบบค่าสัมบูรณ์; แบบมาตรฐานไม่นับ 0; สไลด์นี้สั่งนับ 0 ซึ่งอาจเกินต้นทุนจริง |
| Minimax | ค่ามองจาก MAX; MAX เอามาก, MIN เอาน้อย; ย้อนจากใบ |
| Alpha-beta | α เริ่ม −∞, β เริ่ม +∞; MAX ปรับ α, MIN ปรับ β; ตัดเมื่อ α≥β |
| Deduction | P→Q และ P ⇒ Q |
| Induction/abduction | สรุปกฎจากตัวอย่าง / เสนอเหตุจากผล; ไม่รับประกันจริง |

### Logic และการพิสูจน์

- `P→Q ≡ ¬P∨Q` และเป็นเท็จเฉพาะ P=T,Q=F
- `¬(P∧Q) ≡ ¬P∨¬Q`; `¬(P∨Q) ≡ ¬P∧¬Q`
- ทุก A เป็น B: `∀x(A(x)→B(x))`
- บาง A เป็น B: `∃x(A(x)∧B(x))`
- `¬∀xP(x) ≡ ∃x¬P(x)`; `¬∃xP(x) ≡ ∀x¬P(x)`
- `∀x∃y` ต่างจาก `∃y∀x`: รายแรก y เปลี่ยนตาม x ได้ รายหลังมี y เดียวใช้ทุก x
- CNF = AND ของ clauses; แต่ละ clause = OR ของ literals
- แปลง CNF: ตัด ↔ → ตัด → → ดัน ¬ → เปลี่ยนชื่อตัวแปร → จัด quantifiers → Skolemize → ละ ∀ → แจกแจง OR ครอบ AND → แยก clauses
- Skolem: `∃xP(x) → P(a)`; `∀x∃yR(x,y) → ∀xR(x,f(x))`
- Unification: หาค่าแทนตัวแปรให้ predicates ตรงกัน เช่น `P(x)` กับ `P(A)` ใช้ x=A
- Resolution: `(A∨B),(¬B∨C) ⇒ (A∨C)`
- พิสูจน์ Q: เพิ่ม ¬Q → resolve → ได้ `□` จึงพิสูจน์สำเร็จ

## Final

### Regression และ Correlation

```text
ŷ = b₀+b₁x
b₁ = [nΣxy−ΣxΣy] / [nΣx²−(Σx)²]
b₀ = ȳ−b₁x̄
e = y−ŷ; SSE=Σe²
r = [nΣxy−ΣxΣy] / √{[nΣx²−(Σx)²][nΣy²−(Σy)²]}
```

b₁=การเปลี่ยนค่าทำนายต่อ x เพิ่ม 1; r บอกทิศทางและความแน่นเชิงเส้น; r≈0 ยังมีความสัมพันธ์โค้งได้; correlation ไม่พิสูจน์ causation

### KNN / Naive Bayes / Decision Tree

| วิธี | ขั้นตอนและสูตร |
|---|---|
| KNN | หาระยะ → เลือก k เพื่อนใกล้สุด → โหวต; d=√Σ(xⱼ−zⱼ)² |
| Naive Bayes | Score(C)=P(C)∏P(xⱼ|C); เลือกสูงสุด; features อิสระเมื่อกำหนดคลาส |
| Normalize NB | P(C|X)=score(C)/Σทุกคลาส score |
| Entropy | H(S)=−Σp(c)log₂p(c); บริสุทธิ์=0, สองคลาสครึ่งต่อครึ่ง=1 |
| Information gain | Hก่อน − Σ(สัดส่วนกลุ่มลูก × Hลูก); ID3 เลือก gain มากสุด |
| Tree→Rule | หนึ่ง path root→leaf เป็นหนึ่ง IF เงื่อนไข AND … THEN class |

ตัวเลขจากสไลด์: July มี score(+)=1/18 > score(−)=1/125 จึงทาย +; Decision Tree เลือก HairColor gain≈0.45 ก่อน แล้วเลือก Lotion ในกลุ่ม Blonde

### Clustering

- Unsupervised: ไม่มี label; กลุ่มเดียวกันคล้ายกันมาก
- Hierarchical agglomerative: เริ่มจุดละกลุ่ม → รวมคู่ใกล้สุด → สร้าง dendrogram
- Single linkage=min ระยะข้ามกลุ่ม; Complete=max; Average=เฉลี่ยทุกคู่ข้ามกลุ่ม
- K-means: เลือก K → ตั้ง centroid → assign ใกล้สุด → update ค่าเฉลี่ย → ทำซ้ำ
- `J=ΣₖΣ_{x∈Cₖ}||x−μₖ||²`; elbow ดูจุดที่เพิ่ม K แล้วลด J ช้าลงมาก
- K-means ไวต่อ initialization/outlier และไม่รับประกัน global optimum
- KNN มี label, K=เพื่อนบ้าน; K-means ไม่มี label, K=จำนวนกลุ่ม

### ANN และ Backpropagation

```text
z=b+Σwᵢxᵢ; output=activation(z)
Perceptron: Δwᵢ=η(t−o)xᵢ; Δb=η(t−o)
Sigmoid: σ(z)=1/(1+e^(−z)); σ′=σ(1−σ)
ReLU: max(0,z)
Backprop แบบ sigmoid+squared error:
δ_output=o(1−o)(t−o)
δ_hidden=o_h(1−o_h)Σw_khδ_k
Δw_ji=ηδ_jx_ji
```

- Input → Hidden → Output; weight กำหนดอิทธิพล, bias เลื่อน threshold
- เช็ก output ว่า 0/1 หรือ −1/+1 ก่อนคิด error
- Single perceptron แก้ AND/OR ได้ แต่ XOR ต้องมี nonlinear multilayer network
- Backprop: forward → loss → gradient ย้อนกลับ → update weights
- Recurrent connection กับ backpropagation คนละเรื่อง

### Deep Learning และ CNN

- **RNN:** ข้อมูลลำดับ/เวลา ใช้ hidden state
- **GAN:** Generator สร้าง, Discriminator แยกจริง/ปลอม
- **CNN:** เรียน features เชิงพื้นที่ด้วย filters
- Convolution=ทาบ filter แล้วคูณและบวก; Stride=ระยะเลื่อน; Padding=เติมขอบ
- Max pooling=เลือกค่าสูงสุดในหน้าต่าง; ReLU=ลบเป็น 0; Flatten=เรียงเป็นเวกเตอร์
- สูตรขนาดสำหรับ dilation=1: `floor((N+2P−F)/S)+1` ต่อแกน
- 5×5,F3,S1,P0 → 3×3; เพิ่ม P1 → 5×5
- 3 maps ขนาด 3×3 flatten ได้ 27 ค่า
- หนึ่ง filter แบบ 3D ครอบทุก input channels ให้หนึ่ง output channel
- ตัวอย่างกากบาทตามหน้า 21: convolution ช่องมุมได้ **−3**, ช่องกลางได้ **21**; ระวังเครื่องหมายลบของ filter

## เช็กตัวเองก่อนสอบ

1. Trace BFS/DFS โดยระบุลำดับลูก และเขียนเส้นทางคำตอบแยกได้หรือยัง?
2. คำนวณ g,h,f และอธิบายเงื่อนไข optimal ของ A* ได้หรือยัง?
3. ย้อน Minimax และตัดกิ่งด้วย α≥β ได้หรือยัง?
4. แปล ∀/∃ แปลง CNF และ resolve จน empty clause ได้หรือยัง?
5. แทนสูตร regression, NB, entropy/gain และปรับ centroid ได้หรือยัง?
6. คำนวณ perceptron update, convolution, pooling และขนาด output ได้หรือยัง?
