---
{"version":1,"id":"artificial-intelligence-final-decision-tree","course":"artificial-intelligence","category":"summaries","slug":"final-decision-tree","title":"FINAL: ต้นไม้ตัดสินใจ Entropy และ Information Gain (Decision Tree & ID3)","language":"th"}
---

> ใช้ S08 physical pp.3–17, A01/A04/A05/A06 และ D01 ตรวจภาพและคำนวณใหม่ทุก split ตัวอย่าง Sunburn กับ PlayTennis เป็นคนละข้อมูล A04/A06 เป็นงานเขียนที่ไม่ยืนยันผู้จัดทำ ไม่ใช้เป็น official answer key และไม่คัดลอกภาพงานส่งหรือรหัสนักศึกษา บทและเฉลยที่เขียนเพิ่มแยกจากข้อความต้นฉบับ

## เป้าหมาย (Learning Objectives) {#objectives}
- อ่าน root/branch/leaf และแปลงเส้นทางเป็นกฎ IF–THEN
- คำนวณ entropy, weighted entropy และ information gain พร้อมจัดการ 0 log 0
- เลือก root/subtree ของ ID3 จาก counts ที่ถูกต้อง
- ตรวจ Sunburn/PlayTennis และอธิบายขอบเขต training fit

ทบทวน [Naive Bayes](final-naive-bayes.md) เรื่อง class counts ได้ Path ต่อบทนี้เป็นลำดับเผยแพร่ชั่วคราว ไม่ใช่ลำดับสอนที่ยืนยัน ไม่เพิ่มบท Midterm

## แนวคิดและคำศัพท์ {#concepts}
S08 pp.3–4,7: Decision Tree จำแนกข้อมูลด้วยการทดสอบ attribute ที่ internal node, branch แทน value/ผลทดสอบ, leaf แทน class; root คือจุดเริ่มด้านบน การเดินจาก root ถึง leaf คือเงื่อนไข AND ของเส้นทางหนึ่ง ข้อมูลฝึกมี labels จึงเป็น supervised classification

pp.5–6 ใช้ Sunburn: HairColor, Height, Weight, Lotion → sunburned (+) หรือ none (−) Name ใช้อ้างแถวเท่านั้น ไม่เป็น feature หน้า 6 กล่าว 8/(3×3×3×2)≈15%: อ่านได้ว่าเป็นสัดส่วน combinations ที่มีตัวอย่างในตารางภายใต้การนับดังกล่าว ไม่ใช่ความน่าจะเป็น query ทุกกรณีโดยไม่มีสมมติฐานการกระจาย (คำอธิบายเสริม)

## Entropy และ Gain {#entropy}
สูตรจาก S08 pp.13–14 เขียนให้อ่านเป็นขั้นตอน ให้ pᶜ เป็นสัดส่วน class c ใน node S ใช้ log ฐาน 2 หน่วย bit

$$
H(S)=-\sum_c p_c\log_2 p_c,\qquad H(S\mid A)=\sum_v\frac{|S_v|}{|S|}H(S_v),\qquad IG(S,A)=H(S)-H(S\mid A)
$$

เมื่อ count=0 ให้ contribution 0 ตามลิมิต 0 log 0 ไม่ใช่ประเมิน log(0) ตรง ๆ Pure node มี H=0; binary ครึ่งต่อครึ่งมี H=1 ต้องถ่วงน้ำหนักด้วยขนาด branch ไม่ใช่เฉลี่ย entropy ทุก branch เท่ากันโดยไม่ดูจำนวนแถว

### Sunburn: ทำทุกขั้นจากข้อมูลจริง {#sunburn}
8 แถวตาม S08 p.6 อยู่ใน Python ด้านล่าง counts +3/−5 จึง H=−(3/8)log₂(3/8)−(5/8)log₂(5/8)=0.954434 HairColor แยก blonde 4 แถว (+2/−2), red 1 (+1), brown 3 (−3) จึง weighted H=(4/8)×1+(1/8)×0+(3/8)×0=0.5 และ IG=0.454434

| Feature | Gain คำนวณเต็ม |
|---|---|
| HairColor | 0.454434 |
| Height | 0.265712 |
| Weight | 0.015712 |
| Lotion | 0.347590 |

เลือก HairColor เพราะ gain สูงสุด ตรงโครงสร้าง pp.8–9 ค่าที่ p.14/A04 ปัดหยาบเป็น .45/.26/.01/.34 ไม่ใช่เหตุผลให้แก้ข้อมูลหรือปัดระหว่างขั้นให้ตรง เรารายงานค่าคำนวณใหม่เต็มความละเอียดก่อนแสดงผล

ใน blonde เหลือ +2/−2 จึง H=1: Height ทำให้ weighted H=.5 → gain=.5; Weight ทำให้ weighted H=1 → gain=0; Lotion no มี +2 ส่วน yes มี −2 จึง weighted H=0 → gain=1 เลือก Lotion แล้วหยุดที่ pure leaves

```text
HairColor
  blonde → Lotion: no → + ; yes → -
  red → +
  brown → -
```

S08 pp.10–12 แสดงว่าต้นไม้หลายแบบ fit ชุดเดียวกันได้ หน้า 11 ใช้ Occam's Razor สนับสนุนแบบเล็กที่สอดคล้องข้อมูล แต่ไม่ได้พิสูจน์ว่า tree เล็กสุดหรือ gain สูงสุดทำให้ generalize ดีที่สุดทุกข้อมูล ID3 เป็น greedy local choice ไม่รับรอง globally smallest tree (คำอธิบายเสริม)

## PlayTennis: Root และ Subtrees {#tennis}
A01 p.1/D01 ให้ 14 แถว Outlook/Temperature/Humidity/Wind → PlayTennis เก็บ Day เป็น ID ไม่เป็น feature ข้อมูลทั้งหมดอยู่ใน code example ตรวจตรงกับภาพ A01; A05 pp.1–3 เป็น worked artifact ที่ให้โครงสร้างสุดท้าย ส่วน A06 pp.1–4 เป็น handwritten artifact ไม่รับรองว่าเฉลยผู้สอน

Yes=9,No=5 จึง H=0.940286 สำหรับ Outlook: Sunny มี Yes2/No3 (H=.970951); Overcast Yes4/No0 (H=0); Rain Yes3/No2 (H=.970951) ถ่วงน้ำหนักได้ (5/14)×.970951+(4/14)×0+(5/14)×.970951=.693536 จึง IG=.246750

| Feature | Gain |
|---|---|
| Outlook | 0.246750 |
| Temperature | 0.029223 |
| Humidity | 0.151836 |
| Wind | 0.048127 |

ใช้ Outlook เป็น root; Sunny เหลือ 5 แถว H=.970951 เลือก Humidity เพราะ gain=.970951 (High→No, Normal→Yes) ส่วน Temperature=.570951,Wind=.019973; Rain H=.970951 เลือก Wind gain=.970951 (Strong→No,Weak→Yes) ส่วน Temperature/Humidity=.019973; Overcast เป็น Yes ทั้งหมดอยู่แล้ว

```text
Outlook
  Overcast → Yes
  Sunny → Humidity: High → No ; Normal → Yes
  Rain → Wind: Strong → No ; Weak → Yes
```

โครงสร้างตรงกับ A05 p.3 แต่ตัวเลขของ A05/A06 มีการปัดระหว่างทาง เช่น Temperature บางบรรทัดได้ประมาณ .01 เทียบค่าที่นับใหม่ .029223 เราไม่คัดตัวเลขนั้นเป็นคำตอบเต็ม ไม่อ้างว่าการ fit training 14/14 เป็น test accuracy

## Python ID3 และการตรวจต้นไม้ {#python}
Implementation เสริม standard library: tie gain เลือกคอลัมน์ก่อน, tie majority เลือกชื่อ class ตามอักษร; unknown category ที่ predict ใช้ majority ของ node เป็น policy เสริม ไม่ใช่กฎในสไลด์ ไม่มีการ execute Python ในเว็บ

```python
from collections import Counter
from math import log2


def entropy(labels):
    n = len(labels)
    return -sum((count/n)*log2(count/n) for count in Counter(labels).values()) if n else 0.0


def gain(rows, column):
    if not rows:
        return 0.0
    groups = [[row for row in rows if row[column] == value]
              for value in sorted({row[column] for row in rows})]
    return entropy([r[-1] for r in rows]) - sum(
        len(group)/len(rows)*entropy([r[-1] for r in group]) for group in groups)


def id3(rows, columns):
    labels = [r[-1] for r in rows]
    majority = min(set(labels), key=lambda c: (-labels.count(c), c))
    if len(set(labels)) == 1 or not columns:
        return majority
    column = max(columns, key=lambda j: (gain(rows,j), -j))
    return (column, majority, {
        value: id3([r for r in rows if r[column] == value],
                   [j for j in columns if j != column])
        for value in sorted({r[column] for r in rows})})


def predict(tree, row):
    while isinstance(tree, tuple):
        column, default, children = tree
        tree = children.get(row[column], default)
    return tree


# S08 p.6: HairColor, Height, Weight, Lotion, Result
sunburn = [
    ('blonde','average','light','no','+'), ('blonde','tall','average','yes','-'),
    ('brown','short','average','yes','-'), ('blonde','short','average','no','+'),
    ('red','average','heavy','no','+'), ('brown','tall','heavy','no','-'),
    ('brown','average','heavy','no','-'), ('blonde','short','light','yes','-')]

# D01/A01: Outlook, Temperature, Humidity, Wind, PlayTennis
tennis = [('Sunny', 'Hot', 'High', 'Weak', 'No'), ('Sunny', 'Hot', 'High', 'Strong', 'No'), ('Overcast', 'Hot', 'High', 'Weak', 'Yes'), ('Rain', 'Mild', 'High', 'Weak', 'Yes'), ('Rain', 'Cool', 'Normal', 'Weak', 'Yes'), ('Rain', 'Cool', 'Normal', 'Strong', 'No'), ('Overcast', 'Cool', 'Normal', 'Strong', 'Yes'), ('Sunny', 'Mild', 'High', 'Weak', 'No'), ('Sunny', 'Cool', 'Normal', 'Weak', 'Yes'), ('Rain', 'Mild', 'Normal', 'Weak', 'Yes'), ('Sunny', 'Mild', 'Normal', 'Strong', 'Yes'), ('Overcast', 'Mild', 'High', 'Strong', 'Yes'), ('Overcast', 'Hot', 'Normal', 'Weak', 'Yes'), ('Rain', 'Mild', 'High', 'Strong', 'No')]
for name, rows in [('sunburn',sunburn),('tennis',tennis)]:
    print(name, 'entropy', round(entropy([r[-1] for r in rows]),6))
    print('gains', [round(gain(rows,j),6) for j in range(4)])
    tree = id3(rows, list(range(4)))
    print('tree', tree)
    print('training correct', sum(predict(tree,r) == r[-1] for r in rows), '/',len(rows))
```

ถ้าไม่มี attributes เหลือแต่ labels ขัดกัน ต้องคืน majority ไม่สามารถรับรอง fit 100% เสมอ โค้ดไม่อ่าน private dataset จากเซิร์ฟเวอร์ ข้อมูลในตัวอย่างเป็นตารางสอนที่ถอดจากแหล่ง ไม่ใช่การเพิ่มไฟล์ CSV ต้นฉบับ

## Tree-to-Rules และข้อควรระวัง {#rules}
S08 pp.16–17 ให้หนึ่ง IF–THEN ต่อ root-to-leaf path ของ Sunburn: (blonde AND lotion=yes)→none; (blonde AND lotion=no)→sunburned; red→sunburned; brown→none ตัวอย่าง PlayTennis เขียนได้ 5 กฎตาม 5 leaves ข้างบน แต่ละ path ใช้ AND และคนละ path รวมความเป็นไปได้ด้วย OR

ข้อผิดพลาด: ใช้ Name/Day เป็น feature, ลืม weights ของ branch, ใช้ ln แล้วเรียกว่า bits โดยไม่แปลงฐาน, ใส่ log(0) ลงเครื่องคิดเลข, เลือก subtree จากข้อมูลทั้งชุดแทนแถวที่ผ่าน root, หรือถือว่า tree ที่ fit แปลว่าพิสูจน์เหตุและผล/ความแม่นยำใหม่

## แบบฝึกและเฉลยตรวจใหม่ {#practice}
ทั้งหกข้อเป็นแบบฝึกผู้เขียน ไม่ใช่ข้อสอบจริงหรือ official rubric

### 1. Pure กับ Balanced {#q1}
หา H ของ [+,+,+] และ [+,+,−,−]

**เฉลย:** pure: −1 log₂1=0; balanced: −2×.5 log₂.5=1 bit contribution ของ count0 ใช้0 ไม่คำนวณ log0 ตรง ๆ

### 2. Root ของ Sunburn {#q2}
คำนวณ gain ของ HairColor จาก branch counts

**เฉลย:** Hparent=.954434; blonde (2,2) H1 ขนาด4,red pure ขนาด1,brown pure ขนาด3 → Hafter=.5; gain=.454434 สูงกว่า Height .265712, Weight .015712 และ Lotion .347590 จึงเลือก HairColor

### 3. Blonde Subtree {#q3}
ทำไม Lotion ดีกว่า Weight?

**เฉลย:** ใน blonde มี4แถว Lotion แบ่ง no เป็น+2 และ yes เป็น−2 จึง Hafter0,gain1 ขณะที่ Weight light มี+1/−1 และ average มี+1/−1 จึง Hafter1,gain0 ไม่ใช้8แถวเดิมมาหาค่า subtree

### 4. Root ของ PlayTennis {#q4}
คำนวณ weighted entropy ของ Outlook แล้วเลือก root

**เฉลย:** HSunny=HRain=.970951,HOvercast0; weights5/14,5/14,4/14 → .693536; parent .940286−.693536=.246750 สูงสุดใน4features

### 5. Rules และ Prediction {#q5}
Sunny/Normal และ Rain/Strong ให้ผลอะไร? เขียนเงื่อนไข

**เฉลย:** IF Outlook=Sunny AND Humidity=Normal THEN Yes; IF Outlook=Rain AND Wind=Strong THEN No ไม่ต้องเพิ่ม Temperature ลงใน path ที่ไม่ได้ทดสอบ ทั้งสองเป็นกฎของต้นไม้ที่สร้างจาก D01 ไม่ใช่กฎอากาศสากล

### 6. Unknown และการประเมิน {#q6}
ถ้า query มี Outlook=Snow และได้ training14/14 จะรับรองผลใหม่หรือไม่?

**เฉลย:** source ไม่ได้กำหนด Snow; policy โค้ดคืน majority root=Yes แต่ไม่ใช่คำตอบที่ source รับรอง และ training14/14ไม่เท่ากับ held-out accuracy ต้องแยก validation/unknown policy ข้อมูลขัดกันที่ feature เดียวกันอาจแยกไม่ได้

## สรุป FINAL และแหล่งอ้างอิง {#summary}
- Entropy วัดความปนของ labels; gain ลด weighted entropy และเลือก split เฉพาะข้อมูลที่ node นั้น
- Sunburn: HairColor→Lotion; PlayTennis: Outlook→Humidity/Wind ตรวจ counts ก่อนเชื่อเลขปัดใน artifact
- Path เป็น rule; fitting/Occam/greedy choice ไม่รับรอง generalization

## Sources {#sources}
S08 `Final/Decision Tree Slide.pdf` pp.3–4 terms/if–then,5–6 Sunburn,7–12 ID3/trees/Occam,13–15 gain/subtrees,16–17 rules; A01 `Assignment/Assignment_DecisionTree.pdf` p.1; A04 `Assignment/example.pdf` pp.1–6; A05 `Assignment/Lab_Sol.pdf` pp.1–3; A06 inventory alias `Assignment/[student-id]Decision Tree File.pdf` pp.1–4 (ไม่เผยรหัส/ภาพ); D01 `Assignment/play_tennis.csv` 14 records. ทั้งหมด local-only ไม่สร้าง public links ที่ไม่มีไฟล์จริง ตัวเลข/โค้ด/เฉลยในบทคำนวณอิสระและระบุความต่างจากการปัดใน artifact
