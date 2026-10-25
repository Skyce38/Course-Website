---
{"version":1,"id":"artificial-intelligence-final-knn","course":"artificial-intelligence","category":"summaries","slug":"final-knn","title":"FINAL: การจำแนกและเพื่อนบ้านใกล้ที่สุด (Classification & KNN)","language":"th"}
---

> บท FINAL นี้ใช้ S07 `Final/KNN_NB_Classification.pdf` หน้า PDF จริง **2–5 เท่านั้น**, X01/X03 ตัวอย่าง Buy, X04 ตัวอย่าง Drug และส่วน KNN ของ C01 คำอธิบาย โค้ดดัดแปลงและเฉลยคำนวณใหม่เป็นงานผู้เขียน ไม่ใช่ official answer key ไม่รวม Naive Bayes หน้า 6–8 และไม่แก้ไฟล์ต้นฉบับ เอกสาร/worksheet มีเฉพาะเครื่องผู้จัดทำ จึงไม่สร้างลิงก์ดาวน์โหลดที่ไม่มีไฟล์ในเว็บไซต์

## เป้าหมายการเรียนรู้ (Learning Objectives) {#objectives}
- แยก features และ labels ของปัญหา Classification จาก Regression
- คำนวณ Euclidean distance จัดอันดับเพื่อนบ้าน และโหวตด้วย k ที่ระบุ
- อธิบายผลของ one-hot/ordinal encoding และสเกลของ feature ต่อระยะ
- ตรวจตัวอย่าง Drug และ Buy โดยรักษาข้อมูล/รหัสและลำดับแถวต้นฉบับ
- อ่านโค้ด KNeighborsClassifier, train/test split และ accuracy โดยไม่สรุปประสิทธิภาพเกินหลักฐาน

อ่าน [FINAL Regression](final-regression.md) เพื่อเปรียบเทียบ target แบบตัวเลขกับแบบคลาสได้ บทเรียนแต่ละบทเปิดอ่านได้โดยอิสระ ไม่จำเป็นต้องอ่าน BFS/DFS ก่อน KNN และไม่ควรตีความลำดับเผยแพร่เป็นลำดับสอนที่ยืนยันแล้ว

## Supervised Learning และ Classification {#classification}
S07 หน้า 2 ใช้ภาพแยกของลงถังเพื่ออธิบายการจัดสิ่งที่ยังไม่รู้กลุ่มให้เป็นหมวดหมู่ไม่ต่อเนื่อง (Discrete Classes) คำอธิบาย supervised ต่อไปนี้เขียนเสริมให้เชื่อมกับข้อมูลมีฉลากในหน้า 3 และ X01

- ตัวอย่างฝึกมี features X และ label y ที่รู้แล้ว KNN ใช้ความใกล้ของ query กับข้อมูลฝึกเพื่อเลือกคลาส
- Regression ทำนายค่าตัวเลข เช่น ค่าอาหาร ส่วน Classification ทำนายชื่อกลุ่ม เช่น Buy=Y/N หรือ Drug=drugC ไม่ใช่เอาชื่อคลาสมาเฉลี่ยเป็นตัวเลข
- ชื่อ Drug ในตัวอย่างเป็นโจทย์คำนวณตามตาราง ไม่ใช่แบบจำลองที่ผ่านการตรวจใช้ทางคลินิก

## Features และ Labels {#features}
S07 หน้า 3 แสดง Age, Sex, BP, Cholesterol, Na, K เป็น inputs และ Drug เป็น categorical target ส่วน X01/C01 ใช้ Model, Color, Type, Origin ทำนาย Buy

| ตัวอย่าง | Features | Label |
|---|---|---|
| Drug | Age, Sex, BP, Cholesterol, Na, K | Drug |
| Buy | Model, Color, Type, Origin | Buy: Y หรือ N |
| Iris หน้า 5 | ตัวเลขวัดดอกไม้ 4 คอลัมน์จาก load_iris | species ที่เข้ารหัสเป็นคลาส |

อย่านำ label ไปเป็น feature เพราะจะรั่วคำตอบ (Target Leakage) ชื่อ K ในตาราง Drug เป็นชื่อคอลัมน์ข้อมูล **ต่างจาก k ของจำนวนเพื่อนบ้าน** และ Na/K ในแหล่งนี้เป็นสองคอลัมน์แยก ไม่เปลี่ยนเป็นอัตราส่วน Na/K เอง แหล่งที่ใช้ไม่ระบุหน่วยของตัวเลขเหล่านี้ครบถ้วน จึงไม่เติมหน่วย/เกณฑ์วินิจฉัยเอง

## วิธี KNN และ Euclidean Distance {#algorithm}
ขั้นตอนจากภาพ S07 หน้า 4: มีข้อมูลติดฉลาก → วัดระยะ query → หาเพื่อนบ้านใกล้ → โหวต label คำอธิบาย implementation ต่อไปนี้เขียนเพิ่ม

1. เลือก features และ representation/encoding ที่ชัดเจน แล้วกำหนด k ไม่เกินจำนวนข้อมูลฝึก
2. คำนวณระยะ query กับแต่ละแถวฝึก **โดยไม่ใช้ label ในระยะ**
3. เรียงใกล้ไปไกล เลือก k แถวตามกติกาเสมอกันที่ประกาศไว้
4. โหวตด้วยจำนวน label ใน k แถวนั้น (Uniform Weights ในบทนี้) ไม่โหวตจากทุกแถวใน dataset

สำหรับเวกเตอร์ p มิติ สูตรที่ใช้ใน worksheet คือ

$$
d(x,q)=\sqrt{\sum_{j=1}^{p}(x_j-q_j)^2}
$$

ระยะไม่ติดลบ และการจัดอันดับด้วย d² ให้ผลเหมือน d เพราะรากที่สองเพิ่มตามค่า จึงเก็บความละเอียดเต็มไว้จนเรียงเสร็จ ไม่ปัดตัวเลขจนเพื่อนบ้านสลับกัน

**ข้อตกลงของตัวอย่างคำนวณในบท:** ระยะเท่ากันให้แถวต้นฉบับก่อนมาก่อน; ถ้าโหวต label เสมอให้ชื่อ label เรียงอักษรก่อนชนะ เป็น convention ที่ผู้เขียนเพิ่ม ไม่ใช่กฎ KNN สากล Library อาจจัดการเพื่อนบ้านตรงขอบ k ต่างกันเมื่อระยะเท่ากันและ label ต่างกัน ต้องตรวจ implementation และลำดับข้อมูลด้วย

## การเข้ารหัสหมวดหมู่ (Categorical Encoding) {#encoding}
### Buy: One-hot ของ X03/C01 {#buy-encoding}
X03 KNN!G:O ใช้ 9 ตัวเลข ตามลำดับนี้ ไม่ทิ้ง dummy column ใด

```text
Model_A, Model_B, Red, Yellow, Sport, General, Thailand, Japan, China
Query A/Red/General/Thailand = [1,0,1,0,0,1,1,0,0]
```

เมื่อหมวดหมู่หนึ่งเปลี่ยนจาก A เป็น B ใน one-hot เต็ม สองตำแหน่งจะเปลี่ยนจาก 1→0 และ 0→1 จึงเพิ่ม **d² = 2** ไม่ใช่ 1 ถ้าต่างกัน m หมวดหมู่ของ Buy จะได้ d²=2m และ d=√(2m)

ตัวอย่าง R1 คือ A/Red/Sport/Thailand ต่างจาก query เฉพาะ Type: `(1−0)²+(0−1)²=2` จึง d=√2 ส่วน R2 ต่าง Color และ Origin จึง d²=4 และ d=2 การสลับลำดับคอลัมน์ one-hot พร้อมกันทั้ง train/query ไม่เปลี่ยนระยะ แต่สลับเฉพาะ query จะผิด

### Drug: รหัสที่พบใน X04 {#drug-encoding}
X04 ใช้ Sex_F/Sex_M แบบ one-hot แต่ BP/Cholesterol เป็นตัวเลขที่เข้ารหัสไว้ เมื่อเทียบกับคำในภาพ S07 หน้า 3 พบ BP: LOW=1, NORMAL=2, HIGH=3 และ Cholesterol ที่ปรากฏมี NORMAL=2, HIGH=3 ไม่อ้าง mapping ระดับอื่นที่ไม่พบ

การเข้ารหัสเป็น 1/2/3 ทำให้ Euclidean มองว่า LOW↔HIGH ห่างกว่า LOW↔NORMAL จึงมีสมมติฐานเชิงระยะเพิ่ม ไม่ใช่หมวดหมู่ทุกคู่ห่างเท่ากันโดยธรรมชาติ บทนี้รักษารหัสเพื่อทำซ้ำ X04 ไม่แอบเปลี่ยนเป็น one-hot หรือ scaling แล้วเรียกว่าเฉลยเดียวกัน

**คำแนะนำเพิ่มเติม:** Age ที่ต่างกันมากอาจครอบงำ Na/K ที่เป็นทศนิยมเล็ก ต้องคิดเรื่องสเกลและความหมายก่อนใช้จริง หากจะ scale ต้องเรียนรู้การแปลงจาก training data เท่านั้น การทดลองเปลี่ยนสเกลเป็นงานเสริมแยก ไม่ใช่การดัดแปลงคำตอบต้นฉบับในบทนี้

## การเลือก k และการโหวต {#choosing-k}
S07 หน้า 4 มีภาพกลุ่ม Class A/B ซ้ายล่างที่ระบุ k=3 และภาพด้านขวาที่ระบุ **5 neighbors** ข้อมูลในภาพเหล่านี้ไม่มีตารางพิกัดให้คำนวณซ้ำ จึงใช้อธิบายกระบวนการ ไม่แต่งพิกัดหรือระยะทางจากรูป ภาพไม่ใช่ dataset Iris หน้า 5

- **Drug X04:** query row 13 และข้อความ K=5 ที่ I14
- **Buy X03/C01:** k=3 ตาม worksheet Q13 และ KNeighborsClassifier บรรทัด 39
- **Iris S07 หน้า 5:** k=3, test_size=0.3, random_state=42

k เล็กไวต่อข้อมูลใกล้จุดเดียว; k ใหญ่อาจกลบรายละเอียดของกลุ่ม เป็นคำอธิบายเสริม ไม่มีกฎว่า k=3 หรือ 5 ดีที่สุดทุกชุด ควรเลือกด้วย validation ที่เหมาะสมโดยไม่ใช้ final test set ซ้ำเพื่อเลือก k จำนวนคี่ลดโอกาสโหวตเสมอในสองคลาส แต่หลายคลาสยังเสมอแบบ 1:1:1 ได้

## ตัวอย่าง Drug: ทุกระยะและอันดับ {#drug-worked}
Query ใน S07 หน้า 3/X04 row 13 คือ Age=36, Sex=F, BP=LOW, Cholesterol=HIGH, Na=0.697, K=0.069 เวกเตอร์ที่เข้ารหัสคือ `[36,1,0,1,3,0.697,0.069]` เรียง Age, Sex_F, Sex_M, BP, Cholesterol, Na, K

กำหนด R1..R10 = แถวข้อมูล X04 rows 2..11 ตามลำดับ ข้อมูลครบทั้ง 10 เวกเตอร์และ labels แสดงใน Python ด้านล่าง ตารางนี้คำนวณระยะทุกแถวใหม่ ไม่เชื่อคำตอบที่เก็บไว้เพียงอย่างเดียว

| R | d | Label |
|---|---|---|
| 1 | 13.153352 | drugY |
| 2 | 11.090624 | drugC |
| 3 | 11.090537 | drugC |
| 4 | 8.063355 | drugX |
| 5 | 25.000410 | drugY |
| 6 | 14.035687 | drugX |
| 7 | 13.038752 | drugY |
| 8 | 5.000490 | drugC |
| 9 | 24.062559 | drugY |
| 10 | 7.213252 | drugY |

ผลรวมกำลังสองของแต่ละ R ตามลำดับคือ `173.010660, 123.001933, 123.000000, 65.017698, 625.020488, 197.000500, 170.009049, 25.004900, 579.006724, 52.031005` ถอดรากแล้วได้ตาราง จึงตรวจผลทุกระยะได้ทั้ง d² และ d

**แสดงการแทนค่าทีละ feature:** R8 คือ `[41,1,0,1,3,0.767,0.069]` ต่างจาก query ที่ Age และ Na เท่านั้น

$$
d^2(R8,q)=(41-36)^2+0^2+0^2+0^2+0^2+(0.767-0.697)^2+0^2=25.0049
$$

R10 คือ `[43,0,1,1,2,0.526,0.027]` จึงได้

$$
d^2(R10,q)=7^2+(-1)^2+1^2+0^2+(-1)^2+(-0.171)^2+(-0.042)^2=52.031005
$$

**อันดับเต็ม:** R8, R10, R4, R3, R2, R7, R1, R6, R9, R5 เลือก 5 ตัวแรกได้ drugC, drugY, drugX, drugC, drugC → drugC=3, drugY=1, drugX=1 จึงทำนาย **drugC** ภายใต้ metric/encoding/k นี้ R3 ใกล้กว่า R2 เพียงเล็กน้อย อย่าปัดทั้งคู่เป็น 11.09 ก่อนเรียง

## ตัวอย่าง Buy: การจัดอันดับและ Majority Vote {#buy-worked}
X01 Train มี 10 แถว; Test row 2 ถาม A/Red/General/Thailand โดย Buy? เป็น `??` ไม่ใช่ label จริง X03 มี encoded table และคำตอบเสนอไว้ แต่ต้องคำนวณตรวจเอง X02 เป็นสำเนา byte-identical ของ X01 **ไม่ใช่ข้อมูลฝึกเพิ่มอีก 10 แถวหรือหลักฐานอิสระ**

ตารางใช้ R1..R10 = Train rows 2..11 และ one-hot เต็มตาม G:O นับ m เป็นจำนวนหมวดหมู่ที่ต่างจาก query

| R | m | Label |
|---|---|---|
| 1 | 1 | Y |
| 2 | 2 | N |
| 3 | 3 | N |
| 4 | 1 | Y |
| 5 | 2 | N |
| 6 | 3 | Y |
| 7 | 4 | N |
| 8 | 1 | Y |
| 9 | 2 | N |
| 10 | 2 | Y |

ทุกระยะตาม R คือ `√2, 2, √6, √2, 2, √6, √8, √2, 2, 2` หรือประมาณ `1.414214, 2, 2.449490, 1.414214, 2, 2.449490, 2.828427, 1.414214, 2, 2` อันดับตามกติกาแถวเดิมคือ R1,R4,R8,R2,R5,R9,R10,R3,R6,R7

เมื่อ k=3 เพื่อนบ้านคือ R1,R4,R8 ซึ่งเป็น Y ทั้งหมด จึงทำนาย **Y** ไม่มี tie ตรงขอบ k ที่เปลี่ยน label ใน query นี้ ค่า Y ที่เสนอไว้ใน X03 จึงสอดคล้องผลคำนวณใหม่ แต่ไม่อ้างว่าเป็น label ทดสอบที่สังเกตจริงหรือทำให้ได้ test accuracy 100%

X03 มีสูตรไม่สมบูรณ์บางเซลล์ใน workbook จึงตรวจเฉพาะ raw Train/Test, KNN encoding และระยะ Q2:Q11 ใหม่ โดยไม่ใช้ cached answers เป็น ground truth ไม่ใช้ sheet อื่นเป็นแหล่งสอน Naive Bayes ในบทนี้

## Python คำนวณอย่างโปร่งใส {#python-manual}
โค้ดผู้เขียนนี้ใช้ standard library แสดงข้อมูล Drug/Buy ตามแหล่งและ tie conventions ข้างต้น คัดลอกไป Python ได้โดยไม่ต้องเปิด workbook ตัว Drug ใช้ k=5 ตัว Buy ใช้ k=3 ไม่มีการรัน Python ในหน้าเว็บไซต์

```python
from collections import Counter
from math import sqrt


def neighbors(features, labels, query, k):
    if not features or len(features) != len(labels) or not 1 <= k <= len(features):
        raise ValueError("Invalid sample count or k")
    if any(len(row) != len(query) for row in features):
        raise ValueError("Feature dimensions must match")
    ranked = sorted(
        (sum((a - b) ** 2 for a, b in zip(row, query)), i)
        for i, row in enumerate(features)
    )  # distance tie: original row index
    chosen = ranked[:k]
    counts = Counter(labels[i] for _, i in chosen)
    prediction = min(counts, key=lambda label: (-counts[label], label))
    return prediction, [(i + 1, d2, sqrt(d2), labels[i]) for d2, i in ranked]


# X04 column order: Age, Sex_F, Sex_M, BP, Cholesterol, Na, K
# BP LOW/NORMAL/HIGH = 1/2/3; observed Cholesterol NORMAL/HIGH = 2/3
# Rows R1..R10 correspond to worksheet rows 2..11
drug_x = [
    (23,1,0,3,3,.793,.031), (47,0,1,1,3,.739,.056),
    (47,0,1,1,3,.697,.069), (28,1,0,2,3,.564,.072),
    (61,1,0,1,3,.559,.031), (22,1,0,2,3,.677,.079),
    (49,1,0,2,3,.790,.049), (41,1,0,1,3,.767,.069),
    (60,0,1,2,3,.777,.051), (43,0,1,1,2,.526,.027),
]
drug_y = ["drugY", "drugC", "drugC", "drugX", "drugY",
          "drugX", "drugY", "drugC", "drugY", "drugY"]
drug_query = (36,1,0,1,3,.697,.069)
drug_prediction, drug_rank = neighbors(drug_x, drug_y, drug_query, 5)
print("Drug k=5", drug_prediction)
print("Drug ranking", [row[0] for row in drug_rank])

# X01: Model, Color, Type, Origin, Buy; no use of Buy as a feature
buy_rows = [
    ("A","Red","Sport","Thailand","Y"),
    ("A","Yellow","General","Japan","N"),
    ("B","Yellow","General","Japan","N"),
    ("A","Red","General","China","Y"),
    ("B","Yellow","General","Thailand","N"),
    ("B","Red","Sport","China","Y"),
    ("B","Yellow","Sport","China","N"),
    ("A","Yellow","General","Thailand","Y"),
    ("A","Yellow","General","China","N"),
    ("A","Red","Sport","Japan","Y"),
]
buy_query = ("A","Red","General","Thailand")
# Exact X03 KNN G:O order (different permutations give the same distance)
categories = (("A","B"), ("Red","Yellow"),
              ("Sport","General"), ("Thailand","Japan","China"))


def encode(row):
    if len(row) != len(categories):
        raise ValueError("Wrong feature count")
    if any(value not in cats for value, cats in zip(row, categories)):
        raise ValueError("Unknown category: choose an explicit policy")
    return tuple(int(value == item)
                 for value, cats in zip(row, categories) for item in cats)


buy_x = [encode(row[:4]) for row in buy_rows]
buy_y = [row[4] for row in buy_rows]
buy_prediction, buy_rank = neighbors(buy_x, buy_y, encode(buy_query), 3)
print("Buy k=3", buy_prediction)
print("Buy ranking", [row[0] for row in buy_rank])
```

ผลที่ตรวจใหม่คือ Drug k=5 → drugC และ Buy k=3 → Y; รายการอันดับตรงกับตารางทุกแถว ไม่ตีความผลเป็นความแม่นยำของโมเดลในประชากร

## Python KNeighborsClassifier สำหรับ Buy {#python-sklearn}
ส่วน KNN ของ C01 บรรทัด 12–43 อ่าน input.xlsx แล้วเลือก 4 features, OneHotEncoder(handle_unknown='ignore'), KNeighborsClassifier(k=3) และ query ที่กำหนด โค้ดปรับด้านล่างใช้ข้อมูลที่ฝังใน block ก่อนหน้าแทนการอ่านไฟล์ จึงรันต่อกันได้ ใช้ scikit-learn ใน Python ของผู้เรียน **ไม่เพิ่ม dependency ในเว็บไซต์**

ระบุ weights/metric/p ให้เห็นสมมติฐานเดิม และใช้ brute เพื่อให้ตรวจระยะโดยตรง ไม่มีการเปลี่ยนเป็นโมเดลของบทอื่น OneHotEncoder อาจเรียงหมวดหมู่ต่างจาก worksheet แต่เป็น permutation ที่ใช้ตรงกันทั้ง train/query จึงได้ Euclidean เดียวกัน

```python
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import KNeighborsClassifier

# C01 KNN adaptation; same features/query, self-contained data above
encoder = OneHotEncoder(handle_unknown="ignore")
x_train = encoder.fit_transform([row[:4] for row in buy_rows])
x_query = encoder.transform([buy_query])
model = KNeighborsClassifier(n_neighbors=3, weights="uniform",
                             metric="minkowski", p=2, algorithm="brute")
model.fit(x_train, buy_y)
print("sklearn Buy", model.predict(x_query)[0])
```

ผล Buy ที่ตรวจแล้วคือ Y `handle_unknown='ignore'` ของ C01 ทำให้หมวดหมู่ใหม่กลายเป็นกลุ่มศูนย์ ไม่ใช่ยืนยันว่าโมเดลเข้าใจหมวดหมู่นั้น ส่วน helper encode ใน block แรกตั้งใจแจ้ง error เพื่อไม่ปล่อยสมมติฐานใหม่ผ่านเงียบ ๆ นี่เป็นความต่างที่ผู้เขียนประกาศไว้ ไม่ใช่อ้างว่าโค้ดทั้งสองมี unknown-category policy เหมือนกัน

## Iris: Train/Test Split และ Accuracy {#iris}
S07 หน้า 5 ใช้ `load_iris()` ซึ่งมีข้อมูลติดมากับ scikit-learn ไม่ใช่ Drug table หรือ Buy worksheet ตามตัวอย่างมี 150 แถว 4 features และ 3 คลาส รายละเอียดเพิ่มเติมที่ตรวจจาก metadata ของ load_iris: features คือ sepal length/width (ความยาว/กว้างกลีบเลี้ยง) และ petal length/width (ความยาว/กว้างกลีบดอก) หน่วย cm; labels คือ setosa, versicolor, virginica รายละเอียดนี้ไม่ใช่ตัวเลขจากภาพ voting หน้า 4 โค้ด split 70/30, random_state=42, k=3 และประเมินด้วย accuracy_score ไม่ได้กำหนด stratify หรือ scaling จึงไม่เติมขั้นตอนเหล่านั้นแล้วเรียกว่าทำซ้ำโค้ดเดิม

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)
# Test accuracy is the slide's evaluation; train print is authored comparison
print("sizes", len(X_train), len(X_test))
print("train accuracy", f"{accuracy_score(y_train, knn.predict(X_train)):.6f}")
print("test accuracy", f"{accuracy_score(y_test, y_pred):.6f}")
```

ผลที่ผู้เขียนรันตรวจด้วย scikit-learn 1.7.2 คือ train 105/test 45; train ถูก 99/105 ≈ 0.942857 และ test ถูก 45/45 = 1.000000 บรรทัด train accuracy เป็น **ส่วนเปรียบเทียบที่เขียนเพิ่ม** ส่วนสไลด์แสดงขั้นตอนคำนวณ test accuracy โดยไม่ได้พิมพ์ผลลัพธ์เป็นหลักฐานรับรอง performance

$$
Accuracy=\frac{\text{number of correct predictions}}{\text{number of evaluated samples}}
$$

Training accuracy วัดข้อมูลที่ใช้ fit แล้ว ส่วน test accuracy วัดแถวที่ไม่ใช้ fit ใน split นี้ ผล test 1.0 ไม่ได้แปลว่าถูกทุกข้อมูลใหม่ หรือดีเสมอใน split อื่น Test อาจสูงกว่า train ได้ในชุดเล็ก และห้ามใช้ test set เลือก k จนกลายเป็นการปรับเข้าหาชุดทดสอบ คำแนะนำเพิ่มเติม: พิจารณาคลาสไม่สมดุลและความผิดแต่ละชนิด ไม่ใช้ accuracy ตัวเดียวแทนทุกมิติของคุณภาพ

## ข้อผิดพลาดที่พบบ่อย (Common Mistakes) {#mistakes}
- นำ Buy หรือ Drug label เข้าคำนวณระยะ หรืออ่าน Buy?=?? ว่าเป็นคำตอบจริง
- ปะปน k=5 ของ Drug/ภาพกับ k=3 ของ Buy/Iris โดยไม่ระบุ
- นำ X02 สำเนา X01 มาเพิ่มน้ำหนักโหวตเสมือนเป็นตัวอย่างใหม่
- ให้รหัสหมวดหมู่ 1/2/3 แล้วลืมว่าทำให้ระยะต่างกัน; drop one-hot บางคอลัมน์แล้วอ้างระยะเดียวกับ full one-hot
- เปลี่ยนสเกล/encoding แล้วใช้เฉลยเดิม หรือ fit preprocessing รวม test data
- ปัดค่าก่อนเรียงจน R2/R3 ของ Drug สลับกัน; ไม่ประกาศ tie conventions
- คิดว่า k คี่ไม่มีวันเสมอ หรือโหวตจากทุกแถวแทน k เพื่อนบ้าน
- ใช้ training score แทน test score และอ้าง test 1.0 ของ Iris split เดียวเป็นหลักฐานรับรองทั่วไป

## แบบฝึกเตรียมสอบพร้อมเฉลย (Practice) {#practice}
ทุกโจทย์และเฉลยด้านล่างผู้เขียนจัดทำใหม่จากข้อมูลที่ระบุ **ไม่ใช่ official answer key**

### 1. Features กับ Labels {#question-features}
ใน Drug และ Buy คอลัมน์ใดเป็น target? ถ้าใส่ target ไปในระยะจะเกิดอะไร?

**เฉลย:** Drug เป็น label ของหน้า 3 ส่วน Buy เป็น label ใน X01 Features ของ Drug คือ Age/Sex/BP/Cholesterol/Na/K และ Buy ใช้ Model/Color/Type/Origin การใช้ target ในระยะเป็น leakage และ query ที่ยังไม่รู้ label ก็สร้าง feature ตามนั้นอย่างถูกต้องไม่ได้

### 2. ระยะของ Buy แบบทีละหมวดหมู่ {#question-distance}
Query A/Red/General/Thailand ต่างจาก R2 A/Yellow/General/Japan อย่างไร?

**เฉลย:** ต่าง Color และ Origin รวม 2 หมวด Full one-hot ทำให้ต่างหมวดละ 2 ตำแหน่งที่มี squared difference = 1 จึง d²=2+2=4 และ d=2 ไม่ใช่ √2 ถ้าใช้ representation แบบอื่นต้องคำนวณใหม่

### 3. อันดับและโหวต Buy {#question-vote}
ใช้ k=3 และกติกาแถวเดิม ระบุเพื่อนบ้านและคำตอบ พร้อมเหตุผลที่ไม่รายงาน accuracy

**เฉลย:** R1,R4,R8 มี d=√2 และ label Y ทั้งหมด จึงได้ Y ด้วยเสียง 3:0 ช่อง Buy? ของ Test เป็น ?? จึงไม่มี observed test label ที่ใช้รับรองความถูกต้อง ห้ามนับ proposed answer ใน X03 เป็นหลักฐานอิสระ

### 4. Drug: คำนวณ R8 และจัดอันดับ {#question-drug}
หา d ของ R8 และระบุ 5 เพื่อนบ้านสำหรับ query อายุ 36 ตาม X04

**เฉลย:** ต่าง Age=5 และ Na=0.070 ส่วนอื่นเท่ากัน จึง d²=25+0.0049=25.0049, d≈5.000490 อันดับ 5 แรก R8,R10,R4,R3,R2 ได้ C,Y,X,C,C ดังนั้น drugC ด้วย 3 เสียง ไม่เปลี่ยน Sex/BP encoding เพื่อให้ได้ระยะอื่น

### 5. ผลของ Encoding {#question-encoding}
ถ้าเปลี่ยน full one-hot ของ Buy เป็นรหัสประเทศ China=1, Japan=2, Thailand=3 แล้วใช้ระยะเดิมได้หรือไม่?

**เฉลย:** ไม่ได้ one-hot เต็มให้ทุกคู่ประเทศต่างกันมี d²=2 แต่รหัสใหม่ทำให้ China↔Thailand มี d²=4 และ Japan↔Thailand มี d²=1 เป็นสมมติฐานระยะคนละแบบ ไม่มีหลักฐานจากชื่อประเทศว่าเหมาะสม ต้องแยกจากการสลับคอลัมน์ one-hot ซึ่งไม่เปลี่ยนระยะเมื่อทำตรงกันทั้งสองฝั่ง

### 6. k คี่กับ Tie {#question-ties}
ตัวอย่างเขียนเพิ่ม: เพื่อนบ้าน 3 ตัวมี labels A,B,C อย่างละหนึ่งเสียง เมื่อ k=3 ยังเสมอหรือไม่? ถ้าระยะเท่ากันตรงขอบ k จะทำอย่างไร?

**เฉลย:** ยังเสมอ 1:1:1 ได้ Convention ของ helper ในบทเลือกชื่ออักษรก่อนคือ A และเลือกแถวเดิมก่อนเมื่อ distance เท่ากัน แต่ไม่ถือว่านี่คือกฎของทุก library ต้องประกาศ/ตรวจ boundary ties และไม่พึ่งผลที่อาจเปลี่ยนเมื่อลำดับ train เปลี่ยน

### 7. อ่านผล Train/Test {#question-accuracy}
จาก Iris split หน้า 5 ถ้า train ถูก 99 จาก 105 และ test ถูก 45 จาก 45 ต้องรายงานและตีความอย่างไร?

**เฉลย:** train accuracy=99/105≈0.942857 และ test accuracy=45/45=1.0 ของ split 70/30, random_state=42, k=3 เท่านั้น ผลตรวจนี้ไม่ใช่ค่าที่สไลด์พิมพ์รับรอง และไม่พิสูจน์ accuracy 100% บนประชากรใหม่ ห้ามรวมจำนวนแถว train/test แล้วเรียกทั้งหมดว่า test score

### 8. อ่าน Workbook อย่างระวัง {#question-workbook}
มี X01, X02 ที่ hash เท่ากัน และ X03 ที่บางเซลล์ไม่สมบูรณ์ จะสร้างข้อมูลฝึก/ตรวจคำตอบอย่างไร?

**เฉลย:** ใช้ X01 10 แถวโดยไม่เพิ่ม X02 เป็น dataset ใหม่ อ่าน raw Train/Test และยืนยัน encoding/ระยะใน KNN sheet ของ X03 กับการคำนวณอิสระ ไม่ใช้ cached answer หรือสูตรไม่สมบูรณ์เป็น ground truth ไม่แก้ต้นฉบับเพื่อบังคับให้ตรง และไม่สลับวิธีคำนวณจาก sheet ของบทอื่นมาแทน KNN

## สรุป FINAL (Quick Exam Summary) {#summary}
- Classification ทำนายคลาสจาก features ที่ไม่รวม target; แยกจาก regression ที่ทำนายตัวเลข
- เขียน query, encoding, metric, k และ tie policy ก่อนเริ่มคำนวณ
- Full one-hot ของ Buy ต่างหมวดละ d²=2; Drug ใช้ encoding จาก X04 ตามเดิม
- เรียงด้วยค่าระยะเต็ม เลือก k ใกล้สุด แล้วโหวต label ไม่โหวตทุกแถว
- Drug k=5 → drugC; Buy k=3 → Y ภายใต้ข้อมูลและสมมติฐานที่แสดง
- Iris หน้า 5 ใช้ k=3, test 30%, random_state=42 แยกจากภาพ voting หน้า 4
- แยก training/test accuracy; ผล split เดียวไม่รับรองข้อมูลใหม่หรือค่าน้ำหนักข้อสอบ

## แหล่งข้อมูลและขอบเขต (Sources) {#sources}
Sources อยู่ใต้ `FinalSource/Artificial Intelligence/` แบบ local-only ไม่คัดลอก PDF/workbook เข้าบทนี้

| ID | Path และตำแหน่ง |
|---|---|
| S07 | `Final/KNN_NB_Classification.pdf` physical pp.2–5: classification, Drug table/query, voting illustrations, Iris KNN code เท่านั้น |
| X01 | `Assignment/input.xlsx` Train!A1:E11, Test!A1:E2: Buy data/query |
| X02 | สำเนา X01 ที่ inventory ระบุเป็นชื่อปกปิดรหัสผู้ส่ง; hash เดียวกัน ไม่ใช้เป็นข้อมูลอิสระ |
| X03 | `Assignment/input_sol.xlsx` Train/Test และ KNN!A1:Q13: full one-hot/query/distances/k=3 |
| X04 | `Assignment/KNN_Example.xlsx` KNN!A1:J14: Drug encoded vectors, query row 13, distance J2:J11 และ k=5 |
| C01 | `Assignment/lab_sol.py` imports ที่เกี่ยวกับ KNN, data/query lines 12–27 และ KNN lines 34–43; ไม่รันส่วนโมเดลอื่น |

ระยะ อันดับ ผลรัน Python และเฉลยที่รายงานถูกคำนวณตรวจใหม่ ไม่อ้างว่า workbook เป็น answer key ที่เชื่อได้โดยไม่ตรวจ ไม่ดึงพิกัดจุดจากภาพที่ไม่มีข้อมูลตัวเลข ไม่สอน Naive Bayes ในงานนี้
