---
{"version":1,"id":"artificial-intelligence-final-regression","course":"artificial-intelligence","category":"summaries","slug":"final-regression","title":"FINAL: สหสัมพันธ์ การถดถอยเชิงเส้นและพหุคูณ (Correlation & Linear Regression)","language":"th"}
---

> บท FINAL นี้ใช้ S06 `Final/Linear Regression.pdf` หน้า PDF จริง 2–13, A03 `Ex_regression.pdf`, X07 `regression_example.xlsx`, C02 `mlr.py` และ D03 `StudentPerformance.csv` คำอธิบายเพิ่มเติม โค้ดที่ปรับเพื่อการเรียน และเฉลยที่คำนวณใหม่ระบุไว้ชัด ไม่ใช่เฉลยทางการหรือการรับรองหัวข้อ/น้ำหนักข้อสอบ เอกสารต้นฉบับมีเฉพาะเครื่องผู้จัดทำ จึงไม่สร้างลิงก์ดาวน์โหลดที่ไม่มีไฟล์จริง

## เป้าหมายการเรียนรู้ (Learning Objectives) {#objectives}
- อ่านทิศทาง รูปร่าง และความแน่นของ scatter plot และตีความ correlation โดยไม่สรุป causation เกินหลักฐาน
- หาสมการ Simple Linear Regression ด้วย least squares และตีความ slope/intercept พร้อมหน่วย
- คำนวณ prediction, residual, MAE, MSE และ RMSE โดยไม่ปัดเศษระหว่างทางเกินจำเป็น
- แยก simple กับ multiple regression และอ่าน feature/target จากโค้ด C02 ได้
- ตรวจผลคำนวณด้วย Python และแยก training error ออกจากความสามารถบนข้อมูลใหม่

**ลำดับอ่าน:** ทบทวน [Foundations & Agents](ai-foundations-agents.md) ตามจำเป็น แล้วอ่านบท FINAL นี้ได้โดยไม่ต้องใช้ BFS/DFS เป็น prerequisite [Search Models & BFS/DFS](search-models-bfs-dfs.md) เป็นบทอ่านแยกอิสระ ลำดับเผยแพร่ไม่ใช่ลำดับสอนที่ยืนยันแล้ว หัวข้อ 8-Puzzle/A*, Minimax และ Logic หยุดการสร้างบทใหม่ไว้ตามลำดับความสำคัญ FINAL โดยไม่ลบงานเดิม

## ทบทวนการเรียนรู้แบบมีผู้สอน (Supervised Learning) {#supervised}
คำอธิบายเสริมเชื่อมกับข้อมูลมีคู่ input–target ใน A03 และ C02/D03: แต่ละตัวอย่างมี feature หรือ X และค่าจริง Y ที่ใช้ฝึกให้แบบจำลองทำนาย Regression ทำนายค่าตัวเลข เช่น ค่าอาหารหรือ PerformanceIndex ต่างจาก classification ที่เลือกคลาส สูตร supervised recap นี้ไม่ได้อ้างว่าเป็นเนื้อหาใหม่บน

S06 หน้า 2

| งาน | Features | Target |
|---|---|---|
| A03 | รายได้ครัวเรือน X | ค่าอาหาร Y |
| S06 ตัวอย่างต้นไม้ | เส้นผ่านศูนย์กลางลำต้น x | ความสูงต้นไม้ y |
| C02/D03 | ตัวแปร 4 คอลัมน์ตามชื่อในไฟล์ | PerformanceIndex |

Simple หมายถึงตัวแปรอธิบายหนึ่งตัว Multiple หมายถึงหลายตัว ไม่ได้หมายถึง target หลายตัว และยังเป็น linear ในสัมประสิทธิ์ของแบบจำลอง

## Scatter Plot และสหสัมพันธ์ (Correlation) {#correlation}
S06 หน้า 2 แสดงความสัมพันธ์แบบเส้นตรงบวก/ลบเทียบกับแบบโค้ง หน้า 3 เปรียบเทียบความสัมพันธ์แน่นกับกระจาย หน้า 4 แสดงภาพที่ไม่มีแนวโน้มเชิงเส้นชัดเจน และหน้า 5 ให้ภาพค่า r โดยประมาณ -1, -0.6, 0, +0.3, +1 อย่าอ่านค่าพิกัดของจุดจากภาพเป็น dataset ที่สไลด์ไม่ได้แจก

- เครื่องหมายของ r บอกทิศทางเชิงเส้น ขนาดใกล้ 1 บอกความสัมพันธ์เชิงเส้นแน่นกว่า ไม่ใช่หน่วยความชัน
- r ใกล้ 0 ไม่ได้พิสูจน์ว่าเป็นอิสระหรือไม่มีความสัมพันธ์ทุกชนิด รูปโค้งอาจมี Pearson r ใกล้ 0 ได้ นี่เป็นคำอธิบายเสริมจากการแยกรูปร่างในหน้า 2
- ข้อมูลกระจุกหรือจุดผิดปกติอาจทำให้ตีความผิด จึงดู scatter plot ร่วมกับตัวเลข ข้อควรระวังนี้เป็นคำแนะนำเพิ่มเติม
- สหสัมพันธ์ไม่ยืนยันเหตุและผล ข้อความเรื่อง x ทำให้ y เปลี่ยนในหน้า 9 เป็นสมมติฐานของแบบจำลอง ไม่ใช่หลักฐาน causal จากการ fit เส้นเพียงอย่างเดียว

สูตร sample correlation จากหน้า 6 เขียนแบบผลรวมส่วนเบี่ยงเบนได้ดังนี้ ใช้ได้เมื่อทั้ง x และ y มีความแปรผัน

$$
r=\frac{\sum_i(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_i(x_i-\bar{x})^2\sum_i(y_i-\bar{y})^2}}
$$

รูปที่สมมูลกันสำหรับคำนวณจากตารางผลรวมคือ

$$
r=\frac{n\sum xy-(\sum x)(\sum y)}{\sqrt{[n\sum x^2-(\sum x)^2][n\sum y^2-(\sum y)^2]}}
$$

r ไม่มีหน่วยและอยู่ระหว่าง -1 ถึง 1 ถ้า x หรือ y คงที่ ตัวหารเป็นศูนย์และ r ไม่กำหนด ไม่ใช่ r = 0

### คำนวณจากต้นไม้ในสไลด์ {#tree-correlation}
หน้า 7 ให้ข้อมูล 8 ต้น: x = Trunk Diameter, y = Tree Height **ไม่ระบุหน่วยวัด** จึงไม่เติมเมตร/ฟุต/นิ้วเอง ตารางนี้ถอดเฉพาะข้อมูลและคำนวณผลคูณใหม่เพื่อให้ตรวจสูตรได้

| x | y | xy |
|---|---|---|
| 8 | 35 | 280 |
| 9 | 49 | 441 |
| 7 | 27 | 189 |
| 6 | 33 | 198 |
| 13 | 60 | 780 |
| 7 | 21 | 147 |
| 11 | 45 | 495 |
| 12 | 51 | 612 |

ผลรวมจากหน้า 7: n = 8, Σx = 73, Σy = 321, Σxy = 3142, Σx² = 713, Σy² = 14111 แทนค่าเป็น

$$
r=\frac{8(3142)-73(321)}{\sqrt{[8(713)-73^2][8(14111)-321^2]}}=\frac{1703}{\sqrt{375(9847)}}\approx0.886231
$$

หน้า 8 ปัดเป็น 0.886 และอธิบายเป็นความสัมพันธ์เชิงเส้นบวกค่อนข้างแน่น ต้นไม้สองต้นที่ x = 7 แต่ y = 27 กับ 21 ยังแสดงว่าความสัมพันธ์ไม่ใช่กฎทำนายที่ไร้ความคลาดเคลื่อน

## Simple Linear Regression: Slope และ Intercept {#simple-regression}
หน้า 9 กำหนดตัวแปรอธิบายหนึ่งตัว หน้า 10 แสดงแนวโน้มบวก/ลบ แบบไม่เป็นเส้นตรง และไม่มีแนวโน้ม หน้า 11 ให้สมการเส้นประมาณจากตัวอย่างซึ่งใช้ประมาณเส้นของประชากร

$$
\hat{y}_i=b_0+b_1x_i
$$

| สัญลักษณ์ | ความหมาย |
|---|---|
| y | ค่าจริงที่สังเกต |
| ŷ | ค่าทำนายจากเส้นที่ fit |
| b₀ | Intercept ค่าบนเส้นเมื่อ x = 0 |
| b₁ | Slope ค่า ŷ เปลี่ยนต่อ x เพิ่ม 1 หน่วย |
| eᵢ | Residual ของข้อมูลที่ใช้ประเมิน นิยามในบทเป็น yᵢ − ŷᵢ |

หน้า 11 กล่าวถึง random error มี mean zero แต่ไม่ใช่บอกว่า error ของทุกแถวเป็นศูนย์ คำอธิบายเสริม: สมมติฐานเกี่ยวกับ error ของประชากรต่างจาก residual ของเส้นที่ fit กับ sample และไม่ได้รับรองว่าค่าเฉลี่ย error ของข้อมูลใหม่จะเป็นศูนย์

## เกณฑ์กำลังสองน้อยที่สุด (Least Squares) {#least-squares}
หน้า 12 เลือก b₀,b₁ ให้ผลรวมกำลังสอง residual น้อยที่สุด ไม่ใช่แค่ทำให้ผลรวม error บวก/ลบหักล้างเป็นศูนย์ หน้า 13 ให้สูตร slope/intercept

$$
SSE=\sum_i e_i^2=\sum_i\left[y_i-(b_0+b_1x_i)\right]^2
$$

$$
b_1=\frac{\sum_i(x_i-\bar{x})(y_i-\bar{y})}{\sum_i(x_i-\bar{x})^2}=\frac{\sum xy-\frac{(\sum x)(\sum y)}{n}}{\sum x^2-\frac{(\sum x)^2}{n}},\qquad b_0=\bar{y}-b_1\bar{x}
$$

ต้องมี x ไม่คงที่ สูตรนี้ fit พร้อม intercept ในกรณี least squares ไม่ถ่วงน้ำหนัก หากคำนวณด้วยคอมพิวเตอร์ ข้อมูลสเกลใหญ่อาจทำให้รูปผลรวมดิบสูญเสียความละเอียด จึงใช้รูป centered หรือ solver ที่เหมาะสม

**ตัวอย่างคำนวณเสริมโดยใช้ข้อมูลต้นไม้เดิม:** x̄ = 9.125, ȳ = 40.125; Sxx = 713 − 73²/8 = 46.875; Sxy = 3142 − 73×321/8 = 212.875 ดังนั้น b₁ = 1703/375 ≈ 4.541333 และ b₀ = −493/375 ≈ −1.314667 สูตรมาจากสไลด์แต่ค่าสัมประสิทธิ์และการทำนายนี้ผู้เขียนคำนวณเพิ่ม ไม่ใช่เฉลย regression ที่หน้า 8 ให้ไว้

## ทำนายและตีความ Residual {#prediction}
สำหรับต้นไม้ที่ x = 10 ได้ ŷ ≈ −1.314667 + 4.541333×10 = 44.098667 ในหน่วยความสูงเดิมซึ่งไม่ได้ระบุชื่อ สำหรับแถว x = 8,y = 35 ได้ ŷ = 35.016 และ e = 35 − 35.016 = −0.016 แปลว่าเส้นทำนายสูงกว่าค่าจริงเล็กน้อย ไม่ใช่ error ติดลบแปลว่าคำนวณผิด

ค่า slope ประมาณ 4.541333 คือความสูงที่เส้นคาดว่าจะต่างกันต่อเส้นผ่านศูนย์กลางเพิ่ม 1 หน่วย **ไม่ใช่ r** และไม่ใช่เหตุผลให้สรุปว่าการทำให้ลำต้นใหญ่ขึ้นจะทำให้ต้นไม้สูงขึ้นเท่านี้แน่นอน Intercept ติดลบที่ x = 0 อยู่ห่างจากช่วงข้อมูล x = 6–13 จึงไม่ควรนำไปอธิบายต้นไม้จริงโดยไม่พิจารณาขอบเขต

## แบบฝึกรายได้–ค่าอาหารแบบทีละขั้น {#household}
A03 หน้า 1 และ X07 `regression!B3:C10` ใช้ข้อมูลเดียวกัน X คือรายได้ **พันบาท** และ Y คือค่าอาหาร **ร้อยบาท** ไม่ใช่หน่วยเดียวกัน โจทย์ A03 ให้หาสมการ ส่วนตารางเฉลยต่อไปนี้คำนวณใหม่

| X | Y | XY |
|---|---|---|
| 22 | 8 | 176 |
| 23 | 10 | 230 |
| 18 | 7 | 126 |
| 9 | 2 | 18 |
| 14 | 4 | 56 |
| 20 | 6 | 120 |
| 21 | 7 | 147 |
| 16 | 4 | 64 |

1. รวมได้ n = 8, ΣX = 143, ΣY = 48, ΣXY = 937, ΣX² = 2711
2. X̄ = 143/8 = 17.875 และ Ȳ = 48/8 = 6
3. Sxy = 937 − 143×48/8 = 79; Sxx = 2711 − 143²/8 = 154.875
4. b₁ = 79/154.875 = 632/1239 ≈ 0.5100887813
5. b₀ = 6 − b₁×17.875 = −3863/1239 ≈ −3.1178369653

$$
\hat{Y}=-\frac{3863}{1239}+\frac{632}{1239}X\approx-3.117837+0.510089X
$$

เมื่อรายได้เพิ่ม 1 พันบาท ค่าอาหารที่เส้นคาดเพิ่มประมาณ 0.510089 ร้อยบาท = 51.0089 บาท ไม่ใช่เพิ่ม 51% โดยอัตโนมัติ เมื่อ X = 18 (18,000 บาท) ได้ Ŷ = 6.063761 ร้อยบาท ≈ 606.3761 บาท เทียบค่าจริง 7 ร้อยบาท residual = 0.936239 ร้อยบาท ≈ 93.6239 บาท

### ไม่ปะปนเส้นเต็มความละเอียดกับเส้นที่ปัดแล้ว {#rounding}
X07 `C14:C15` คำนวณ slope/intercept เต็มความละเอียด แต่ `G3:G10` ใช้สูตรคงที่ `-3.12 + 0.51*X` ซึ่งปัดแล้ว `H` ใช้ Actual−Predicted และ `I` ใช้ ABS(error) ค่า MAE ใน `J11` จึงมาจาก **เส้นปัด** ไม่ใช่ใช้ C14/C15 โดยตรง

ตารางต่อไปนี้ใช้เส้นปัดเท่านั้น: X = รายได้พันบาท, Ŷ = ค่าอาหารทำนายร้อยบาท, e = residual ร้อยบาท

| X | Ŷ | e |
|---|---|---|
| 22 | 8.10 | −0.10 |
| 23 | 8.61 | 1.39 |
| 18 | 6.06 | 0.94 |
| 9 | 1.47 | 0.53 |
| 14 | 4.02 | −0.02 |
| 20 | 7.08 | −1.08 |
| 21 | 7.59 | −0.59 |
| 16 | 5.04 | −1.04 |

เส้นเต็มได้ MAE ≈ 0.712268, MSE ≈ 0.712873, RMSE ≈ 0.844318 ส่วนเส้นปัดได้ MAE = 0.711250, MSE = 0.7128875, RMSE ≈ 0.844327 ค่า MAE ของเส้นปัดที่ต่ำกว่าเล็กน้อยไม่ขัดกับ least squares เพราะ OLS ลด **SSE/MSE** ไม่ใช่ MAE และ MSE ของเส้นปัดยังสูงกว่า

## MAE, MSE และ RMSE {#errors}
ส่วนนี้อ้าง X07 แทนการอ้างว่ามีบน S06: sheet `err!A2:B4` ให้ Actual = [2,2,0], Predicted = [2,0,2] สูตร C2:C4 เป็น actual−predicted, D เป็นค่าสัมบูรณ์ และ E เป็นกำลังสอง D5/E5 หาค่าเฉลี่ย ส่วน E9 = SQRT(E5)

$$
MAE=\frac{1}{n}\sum_i\lvert y_i-\hat y_i\rvert,\qquad MSE=\frac{1}{n}\sum_i(y_i-\hat y_i)^2,\qquad RMSE=\sqrt{MSE}
$$

| Actual | Predicted | e |
|---|---|---|
| 2 | 2 | 0 |
| 2 | 0 | 2 |
| 0 | 2 | −2 |

ผลรวม error = 0 แต่ผลรวมค่าสัมบูรณ์ = 4 และผลรวมกำลังสอง = 8 จึงได้ MAE = 4/3 ≈ 1.333333, MSE = 8/3 ≈ 2.666667 และ RMSE ≈ 1.632993 ตัวอย่างนี้ไม่มีหน่วยใน sheet จึงไม่เติมหน่วยเอง

MAE/RMSE มีหน่วยเดียวกับ target ส่วน MSE มีหน่วยยกกำลังสอง ในโจทย์ค่าอาหารจึงเป็นร้อยบาท และ (ร้อยบาท)² ตามลำดับ RMSE ไม่ใช่ค่าเฉลี่ย signed error และ MSE ที่นี่หาร n ไม่ใช่หาร n−2 แบบประมาณความแปรปรวนของ error ในสถิติ ซึ่งเป็นอีกปริมาณหนึ่ง

### Python: ตรวจสหสัมพันธ์ เส้นตรง และ Error {#python-simple}
โค้ดเสริมนี้ใช้ Python standard library เท่านั้น ข้อมูลมาจาก S06/A03 และตัวอย่าง error จาก X07 ใช้ความละเอียดเต็มจนถึงขั้นแสดงผล ถ้า y คงที่ regression ยังให้ slope = 0 ได้ แต่ r ไม่กำหนดจึงคืน `None`

```python
from math import sqrt


def simple_fit(x, y):
    if len(x) != len(y) or len(x) < 2:
        raise ValueError("Use at least two paired observations")
    n = len(x)
    mx, my = sum(x) / n, sum(y) / n
    sxx = sum((v - mx) ** 2 for v in x)
    syy = sum((v - my) ** 2 for v in y)
    sxy = sum((a - mx) * (b - my) for a, b in zip(x, y))
    if sxx == 0:
        raise ValueError("Slope is undefined when x is constant")
    b1 = sxy / sxx
    b0 = my - b1 * mx
    r = None if syy == 0 else sxy / sqrt(sxx * syy)
    return b0, b1, r


def error_metrics(actual, predicted):
    if not actual or len(actual) != len(predicted):
        raise ValueError("Use nonempty paired observations")
    residual = [a - p for a, p in zip(actual, predicted)]
    n = len(residual)
    mae = sum(abs(e) for e in residual) / n
    mse = sum(e * e for e in residual) / n
    return mae, mse, sqrt(mse)


tree_x = [8, 9, 7, 6, 13, 7, 11, 12]
tree_y = [35, 49, 27, 33, 60, 21, 45, 51]
house_x = [22, 23, 18, 9, 14, 20, 21, 16]
house_y = [8, 10, 7, 2, 4, 6, 7, 4]
for name, x, y in (("tree", tree_x, tree_y),
                   ("house", house_x, house_y)):
    b0, b1, r = simple_fit(x, y)
    predicted = [b0 + b1 * v for v in x]
    print(name, f"b0={b0:.6f} b1={b1:.6f} r={r:.6f}")
    print("MAE MSE RMSE", *(f"{v:.6f}" for v in error_metrics(y, predicted)))
print("err sheet", *(f"{v:.6f}" for v in error_metrics([2, 2, 0], [2, 0, 2])))
```

ผลที่ตรวจแล้ว: tree b₀ = −1.314667, b₁ = 4.541333, r = 0.886231; house b₀ = −3.117837, b₁ = 0.510089, r = 0.935960; ค่าความคลาดเคลื่อนตรงกับที่คำนวณด้านบน ทั้งหมดเป็นผลคำนวณของผู้เขียน ไม่ใช่ความแม่นยำบนข้อมูลที่กันไว้ทดสอบ

## การถดถอยเชิงเส้นพหุคูณ (Multiple Linear Regression) {#multiple}
ส่วนนี้มาจาก C02/D03 ไม่ใช่การอ้างว่า S06 สอนตัวแปรอธิบายหลายตัว สคริปต์ C02 บรรทัด 6 เลือก feature 4 ตัว บรรทัด 8 เลือก `PerformanceIndex` บรรทัด 10–11 ใช้ `LinearRegression().fit(x,y)` และบรรทัด 13 ทำนายด้วย `[2,65,5,4]`

$$
\hat y=b_0+b_1x_1+b_2x_2+b_3x_3+b_4x_4
$$

| ตำแหน่ง | ชื่อคอลัมน์ D03 |
|---|---|
| x₁ | HoursStudied |
| x₂ | PreviousScores |
| x₃ | SleepHours |
| x₄ | SampleQuestionPapersPracticed |
| y | PerformanceIndex |

แปลความหมายตามชื่อ: ชั่วโมงอ่านหนังสือ คะแนนก่อนหน้า ชั่วโมงนอน จำนวนชุดข้อสอบฝึก และดัชนีผลการเรียน ไฟล์ไม่มี data dictionary รับรองช่วงเวลา มาตราส่วนคะแนน หรือวิธีเก็บข้อมูล จึงไม่อ้างความเป็นตัวแทนประชากรหรือกำหนดว่า PerformanceIndex เป็นเปอร์เซ็นต์/ความน่าจะเป็น

ชื่อ `predictedCO2` ใน C02 ไม่สอดคล้องกับ target ที่เลือกจริง **ผลเป็น PerformanceIndex ไม่ใช่ CO₂** บทนี้ใช้ชื่อ prediction ที่ตรงความหมายโดยไม่แก้ไฟล์ต้นฉบับ ค่าสัมประสิทธิ์ b₁ แปลว่าผลทำนายเปลี่ยนต่อ HoursStudied เพิ่ม 1 หน่วย **เมื่อ feature อื่นคงที่** ไม่ใช่ผลเชิงเหตุและผลที่พิสูจน์แล้ว

### ตัวอย่างเล็กที่รันได้จาก 8 แถวแรก {#python-multiple}
เพื่อให้คัดลอกแล้วรันได้โดยไม่ต้องดาวน์โหลด CSV โค้ดเสริมนี้แสดง 8 แถวแรกของ D03 แบบตัวเลข ไม่มีตัวระบุบุคคล ใช้ NumPy `lstsq` แก้ OLS พร้อม intercept และตรวจ rank ไม่ใช้การกลับเมทริกซ์เอง ต้องมี NumPy ใน Python ของผู้เรียน แต่เว็บไซต์ไม่ได้โหลด NumPy หรือเพิ่ม runtime dependency

นี่เป็น **subset fit ไม่ใช่การ fit ทั้ง 300 แถวของ C02** ใช้เพื่ออ่านลำดับ feature และคำนวณ ไม่ใช้เป็นข้ออ้างประสิทธิภาพของโมเดลจริง ปุ่มคัดลอกในเว็บไซต์ไม่รัน Python

```python
import numpy as np


def multiple_fit(features, target):
    x = np.asarray(features, dtype=float)
    y = np.asarray(target, dtype=float)
    if x.ndim != 2 or y.ndim != 1 or len(x) != len(y):
        raise ValueError("Expected a feature matrix and paired target")
    design = np.column_stack([np.ones(len(x)), x])
    coefficients, _, rank, _ = np.linalg.lstsq(design, y, rcond=None)
    if rank != design.shape[1]:
        raise ValueError("Coefficients are not uniquely identifiable")
    return coefficients


# D03: first eight records, NOT the full 300-row fit in C02
# HoursStudied, PreviousScores, SleepHours,
# SampleQuestionPapersPracticed, PerformanceIndex
sample = [
    (7, 99, 9, 1, 91), (4, 82, 4, 2, 65),
    (8, 51, 7, 2, 45), (5, 52, 5, 2, 36),
    (7, 75, 8, 5, 66), (3, 78, 9, 6, 61),
    (7, 73, 5, 6, 63), (8, 45, 4, 6, 42),
]
coefficients = multiple_fit([row[:4] for row in sample],
                            [row[4] for row in sample])
query = np.array([1, 2, 65, 5, 4], dtype=float)  # leading 1 for intercept
print("sample coefficients", *(f"{v:.6f}" for v in coefficients))
print("sample prediction", f"{query @ coefficients:.6f}")
```

ผล subset ที่ตรวจแล้ว: b₀ ≈ −29.141085 และ b₁..b₄ ≈ 2.669656, 0.989473, 0.245863, 0.320627; prediction สำหรับ `[2,65,5,4]` ≈ 43.025819 ค่า leading 1 ใน query เป็นตัวคูณ intercept ไม่ใช่ feature ตัวที่ห้า

### ทำซ้ำกับไฟล์ครบ 300 แถว {#full-dataset}
ถ้ามี D03 ต้นฉบับ ให้รัน block ต่อจาก block NumPy ด้านบน และเรียกฟังก์ชันตาม comment โดยวาง CSV ใน working directory ของ Python ไม่ใช่แก้ path เว็บไซต์ โค้ดนี้เป็น implementation เสริมที่ใช้ feature/target และ OLS objective เดียวกับ C02 **ไม่ได้อ้างว่ารันสคริปต์ scikit-learn ต้นฉบับ**

```python
import csv


def fit_student_file(filename):
    columns = ("HoursStudied", "PreviousScores", "SleepHours",
               "SampleQuestionPapersPracticed")
    with open(filename, newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    features = [[float(row[name]) for name in columns] for row in rows]
    target = [float(row["PerformanceIndex"]) for row in rows]
    coefficients = multiple_fit(features, target)
    prediction = np.array([1, 2, 65, 5, 4]) @ coefficients
    return len(rows), coefficients, float(prediction)


# Run after the previous block if the original local CSV is available:
# count, coefficients, prediction = fit_student_file("StudentPerformance.csv")
# print(count, coefficients, prediction)
```

ผลที่ตรวจด้วยข้อมูล D03 ครบ 300 แถวและ solver อิสระ: b₀ ≈ −33.874641, b₁ ≈ 2.878027, b₂ ≈ 1.018041, b₃ ≈ 0.443789, b₄ ≈ 0.213605 แทนค่า `[2,65,5,4]` ด้วยสัมประสิทธิ์เต็มได้

$$
\hat y\approx-33.874641+2.878027(2)+1.018041(65)+0.443789(5)+0.213605(4)\approx41.127457
$$

การแทนค่าด้านบนแสดงค่าสัมประสิทธิ์ปัด 6 ตำแหน่ง ผลทดสอบใช้ค่าเต็ม จึงอาจต่างเล็กน้อยเมื่อคำนวณจากตัวเลขที่พิมพ์ ทั้ง 41.127457 และ 43.025819 ไม่ใช่คำตอบที่ขัดกัน เพราะใช้ชุดข้อมูลฝึกต่างขนาด ห้ามแสดงผล subset แล้วเรียกว่าเป็นผลของ C02 ครบชุด

C02 fit ทุกแถวโดยไม่มี train/test split หรือ held-out evaluation จึงไม่สามารถสรุปความแม่นยำบนข้อมูลใหม่จากผลนี้ การแยกชุดทดสอบเป็นคำแนะนำเพิ่มเติม ไม่ใช่ขั้นตอนที่ตรวจพบใน C02 หาก feature พึ่งพากันจน design matrix ไม่ full rank สัมประสิทธิ์อาจไม่เป็นเอกลักษณ์ ตัวอย่างโค้ดจึงแจ้งข้อผิดพลาดแทนการตีความ coefficient โดยไม่บอกข้อจำกัด

## ข้อผิดพลาดที่พบบ่อย (Common Mistakes) {#mistakes}
- สลับ x/y แล้วใช้สมการเดิม: การ fit Y จาก X ไม่ใช่กลับสมการเพื่อ fit X จาก Y
- สับสน r กับ slope หรือสรุป r = 0 ว่าไม่มีความสัมพันธ์ทุกแบบ
- ลืมว่า X หน่วยพันบาท แต่ Y หน่วยร้อยบาท หรือเติมหน่วยต้นไม้ที่สไลด์ไม่ระบุ
- นิยาม residual เป็น actual−predicted แต่กลับเครื่องหมายครึ่งหนึ่งของตาราง
- ใช้ signed mean error เป็นตัวชี้ว่าโมเดลดี เพราะ error บวก/ลบหักล้างกันได้
- ปัด b₀,b₁ ก่อนทำนายแล้วนำไปเทียบกับผลคำนวณเต็มโดยไม่บอก เช่น X07
- อ้าง OLS ลด MAE; จริง ๆ เกณฑ์ที่ใช้คือ SSE ไม่ใช่ absolute error
- อ่าน `predictedCO2` ว่าเป็น target ของ C02 ทั้งที่โค้ดเลือก PerformanceIndex
- สลับลำดับ feature ตอน predict หรือแทรก 1 เข้าไปเป็น feature ทั้งที่ solver ใส่ intercept ไว้แล้ว
- สรุปความสามารถบนข้อมูลใหม่จาก training fit ทั้งชุด และใช้ความสัมพันธ์แทนเหตุและผล

## แบบฝึกพร้อมเฉลยตรวจใหม่ (Practice) {#practice}
**โจทย์การฝึกและเฉลยด้านล่างผู้เขียนจัดทำใหม่โดยใช้แหล่งที่ระบุ ไม่ใช่ official answer key** ใช้ค่าสัมประสิทธิ์เต็มระหว่างคำนวณและปัดเฉพาะคำตอบแสดงผล

### 1. อ่านกราฟและ r {#question-correlation}
กราฟหนึ่งเป็นแนวลงแน่น อีกกราฟเป็นโค้งรูป U จะสรุปจาก r อย่างเดียวได้หรือไม่?

**เฉลย:** แนวลงแน่นมี r ลบและขนาดใกล้ 1 ตามภาพ S06 หน้า 3/5 ส่วน U อาจมี r ใกล้ 0 แม้มีความสัมพันธ์ชัด จึงต้องดูรูปร่างใน scatter plot ไม่ใช้ r สรุปว่าไม่มีความสัมพันธ์ทุกชนิด และไม่สร้างค่าตัวเลข r ของภาพ U ที่ไม่มี dataset

### 2. ตรวจสหสัมพันธ์ต้นไม้ {#question-tree}
ใช้ผลรวม S06 หน้า 7 คำนวณ numerator และค่าของ r

**เฉลย:** 8×3142 − 73×321 = 1703; ตัวประกอบใต้รากคือ 375 และ 9847 จึง r = 1703/√(375×9847) ≈ 0.886231 สอดคล้องค่าปัด 0.886 หน้า 8 เป็นความสัมพันธ์เชิงเส้นบวก ไม่ใช่ r = slope ≈ 4.541333

### 3. หาสมการค่าอาหารและตีความหน่วย {#question-household}
ใช้ A03 ทั้ง 8 แถวหา b₀,b₁ และตีความรายได้เพิ่ม 1,000 บาท

**เฉลย:** Sxy = 79, Sxx = 154.875 จึง b₁ = 632/1239 ≈ 0.510089 และ b₀ = −3863/1239 ≈ −3.117837 ค่าอาหารที่ทำนายเพิ่ม 0.510089 ร้อยบาท หรือประมาณ 51.0089 บาทเมื่อ X เพิ่ม 1 หน่วย ไม่ใช่เพิ่ม 510 บาท และไม่รับรองว่าเป็นผล causal

### 4. ทำนายและหา Residual {#question-residual}
ที่ X = 18,Y = 7 ใน A03 ใช้สมการเต็มหา Ŷ และ e

**เฉลย:** Ŷ = (−3863 + 632×18)/1239 = 7513/1239 ≈ 6.063761 ร้อยบาท; e = 7−Ŷ ≈ 0.936239 ร้อยบาทเป็นบวก เพราะค่าจริงสูงกว่าที่เส้นทำนาย ถ้าใช้เส้นปัดของ X07 จะได้ 6.06 และ 0.94 ซึ่งต้องติดป้ายว่าใช้เส้นปัด

### 5. Error หักล้างกัน {#question-metrics}
ใช้ Actual/Predicted ของ X07 sheet err แสดงว่าผลรวม error เป็นศูนย์ไม่ได้แปลว่าไม่คลาดเคลื่อน

**เฉลย:** residual = [0,2,−2] ผลรวม 0; absolute residual = [0,2,2] รวม 4; squared residual = [0,4,4] รวม 8 หาร n = 3 จึง MAE = 4/3, MSE = 8/3, RMSE = √(8/3) ≈ 1.632993 ถ้าใช้ค่าอาหาร target เป็นร้อยบาท RMSE จึงเป็นร้อยบาท ไม่ใช่ (ร้อยบาท)²

### 6. เหตุใด MAE ใน workbook จึงไม่ตรงเส้นเต็ม? {#question-rounding}
X07 `regression!J11` ให้ประมาณ 0.71125 แต่โค้ดเส้นเต็มได้ 0.712268 ควรแก้ไฟล์ต้นฉบับหรือไม่?

**เฉลย:** ไม่แก้ต้นฉบับเพื่อบังคับคำตอบตรงกัน ตรวจ G3:G10 พบว่าใช้ −3.12 + 0.51X ไม่ใช้ C14/C15 เต็มความละเอียด จึงเป็นคนละเส้น MAE ต่างกันอย่างอธิบายได้ ผล MSE เส้นปัด 0.7128875 สูงกว่าเส้น OLS เต็ม ≈ 0.712873 แม้ MAE เส้นปัดต่ำกว่าเล็กน้อย

### 7. อ่านโค้ด Multiple Regression {#question-multiple}
C02 มี input กี่ตัว target คืออะไร และ prediction สำหรับ `[2,65,5,4]` บน D03 ทั้งชุดหมายถึงอะไร?

**เฉลย:** input 4 ตัวเรียง HoursStudied, PreviousScores, SleepHours, SampleQuestionPapersPracticed; target เดียว PerformanceIndex ค่าที่คำนวณใหม่ได้ประมาณ 41.127457 เป็นดัชนีที่โมเดลทำนาย ไม่ใช่ CO₂ ไม่ใช่ความน่าจะเป็น 41% และไม่ใช่หลักฐาน generalization accuracy

### 8. ตีความ coefficient และข้อจำกัด {#question-interpretation}
ใน fit 300 แถว ถ้า HoursStudied เพิ่ม 1 โดย feature อื่นคงเดิม ผลทำนายเปลี่ยนเท่าใด? ทำไมไม่อ้างว่าทุกคนจะได้ผลเพิ่มเท่ากันแน่นอน?

**เฉลย:** เพิ่มประมาณ 2.878027 หน่วยของ PerformanceIndex ตามเส้นและตัวแปรอื่นคงที่ เป็น association ในแบบจำลองที่ fit ไม่ใช่ข้อพิสูจน์ causal หรือความแม่นยำบนประชากร ข้อมูลไม่มี metadata ที่รับรองหน่วย/การเก็บและ C02 ไม่ได้กันข้อมูลทดสอบ ถ้า fit แค่ subset 8 แถว coefficient เปลี่ยนเป็นประมาณ 2.669656 จึงต้องระบุชุดฝึกด้วย

## สรุปเตรียมสอบ FINAL (Quick Exam Summary) {#summary}
- ตรวจ x/y และหน่วยก่อนแทนค่า แยก simple หนึ่ง feature จาก multiple หลาย feature
- ดู scatter plot ก่อนอ่าน r: ทิศทาง/ความแน่นเชิงเส้นไม่ใช่ความชันหรือเหตุและผล
- Least squares เลือก b ให้ SSE ต่ำสุด; b₁ = Sxy/Sxx และ b₀ = ȳ−b₁x̄
- ทำนายด้วย ŷ แล้วหา e = y−ŷ; MAE เฉลี่ยค่าสัมบูรณ์, MSE เฉลี่ยกำลังสอง, RMSE ถอดราก MSE
- เก็บความละเอียดระหว่างคำนวณ แยกผลเส้นเต็ม/เส้นปัด และตรวจหน่วยของ error
- Multiple Regression ต้องรักษาลำดับ feature, intercept และ target; C02 target คือ PerformanceIndex
- ผล fit ชุดฝึกไม่รับรองข้อมูลใหม่ ไม่อ้างน้ำหนักสอบหรือคำตอบทางการจากตัวอย่างที่ผู้เขียนคำนวณเอง

## แหล่งข้อมูลและขอบเขต (Sources) {#sources}
แหล่งต่อไปนี้อยู่ใต้ `FinalSource/Artificial Intelligence/` แบบ local-only จึงระบุ path เป็นข้อความ ไม่เพิ่มต้นฉบับ PDF/workbook/CSV หรือสร้าง public link ที่ใช้ไม่ได้

| Source | ตำแหน่งและสิ่งที่ใช้ |
|---|---|
| S06 | `Final/Linear Regression.pdf` หน้า 2–5 scatter/r, 6 สูตร r, 7–8 ตารางต้นไม้/คำนวณ, 9–11 simple model/กราฟ/สมการ, 12 least squares, 13 สูตร b₀,b₁ |
| A03 | `Assignment/Ex_regression.pdf` หน้า 1: รายได้พันบาท–ค่าอาหารร้อยบาท 8 ครัวเรือนและโจทย์หาสมการ |
| X07 | `Assignment/regression_example.xlsx`: regression!B3:E15, G3:J11 และ err!A1:E9; สูตร/ค่าที่เก็บในไฟล์ตรวจเทียบการคำนวณอิสระ ไม่อ้างว่าเปิด Excel recalculation แล้ว |
| C02 | `Assignment/mlr.py` บรรทัด 1–15: เลือก 4 features, target, fit ทุกแถวและ predict; ไม่แก้ชื่อ predictedCO2 ในต้นฉบับ |
| D03 | `Assignment/StudentPerformance.csv` header และข้อมูล 300 แถว: ใช้ตรวจ full fit; แสดง subset 8 แถวแรกเพื่อให้ตัวอย่าง NumPy รันได้ |

Supervised recap, ข้อควรระวังเรื่อง causation/validation, การ fit regression ของตารางต้นไม้, Python ที่เขียนเพิ่ม และเฉลยแบบฝึกเป็นคำอธิบายเสริม MAE/MSE/RMSE มีหลักฐานใน X07 และ multiple regression มีหลักฐานใน C02/D03 ไม่อ้างว่าทุกส่วนอยู่ในสไลด์ S06 ไม่มีบท Midterm ใหม่หรือการ redesign ระบบนำทางในงานนี้
