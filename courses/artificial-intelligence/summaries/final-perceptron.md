---
{"version":1,"id":"artificial-intelligence-final-perceptron","course":"artificial-intelligence","category":"summaries","slug":"final-perceptron","title":"FINAL: โครงข่ายประสาทเทียมและ Perceptron","language":"th"}
---

> S10 `Final/ANN.pdf` physical pp.2–18 และ 25; X06 `Assignment/perceptron.xlsx`; L01 `Assignment/Perceptron.txt` แยก conventions และ runs อย่างชัดเจน โค้ด/เฉลยผู้เขียน ไม่ใช่ official answer key ลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- อธิบาย neuron, input, weight, bias และ activation
- คำนวณผลทำนายและ sequential updates ของ perceptron ได้ครบ epoch
- อ่าน decision boundary และอธิบาย AND ทำได้ แต่ XOR แยกด้วยเส้นเดียวไม่ได้
- แยก binary workbook ออกจาก bipolar slides และผลรายงาน L01 ที่จำลองซ้ำไม่ได้

## Artificial Neural Network {#ann}
S10 pp.2–8 ใช้สมอง/เซลล์ประสาทเป็นแรงบันดาลใจ ไม่ได้หมายถึงแบบจำลองสมองครบถ้วน

Artificial neuron รับ inputs x คูณ weights w แล้วบวก bias b ผ่าน activation เพื่อได้ output เครือข่ายมี input, hidden และ output layers การเรียนรู้เปลี่ยน weights ตามข้อมูล ไม่ใช่จำเพียงโครงรูป neuron หน้า 9 เปรียบเทียบ forward/feedback connections; feedback connection ไม่ใช่คำเดียวกับ backpropagation ซึ่งเป็นวิธีหาความชัน

$$
z=b+\sum_j w_jx_j,\qquad y=f(z)
$$

Bias หรือ w0 เทียบได้กับน้ำหนักของ input คงที่ x0=1 ทำให้เส้นแบ่งเลื่อนได้ ถ้าไม่มี bias เส้นผ่าน origin จำกัดแบบจำลอง Activations แบบ threshold ทำการตัดสินใจ; sigmoid ให้ค่าต่อเนื่องแต่ไม่ใช่กฎอัปเดต perceptron เดียวกัน

## Perceptron และ conventions {#perceptron}
S10 pp.10–13 มี bipolar ±1 และภาพ binary ต้องเลือกให้ชัด บทคำนวณใช้ **X06 output 0/1 และเงื่อนไข z>0** เท่านั้น: z=0 ให้ 0 ไม่ใช้ ≥0

$$
y=\begin{cases}1&z>0\\0&z\leq0\end{cases},\quad e=t-y,\quad w_j^{new}=w_j^{old}+\alpha e x_j\quad(x_0=1)
$$

S10 pp.14–15 แสดงการปรับ weights ตาม error; α>0 คือ learning rate ขนาดก้าว ไม่ใช่อัตราความถูกต้อง แต่ละ sample ใช้ weights ก่อนแถวนั้นคำนวณ z,y,e ก่อนปรับทุก weight จาก error เดียวกัน แถวถัดไปใช้ผลใหม่ ครบข้อมูลหนึ่งรอบเรียก epoch ถ้า e=0 ไม่ปรับ

## X06: AND ทุกขั้น {#and}
Sheet1!B1 α=.5, G3:I3 initial(w0,w1,w2)=(.1,.1,.1); A4:C27 เป็น AND 00→0,01→0,10→0,11→1 เรียงซ้ำ 6epochs แถวแรก z=.1, y=1,e=−1 จึง w0=.1−.5=−.4, w1=.1,w2=.1; แถว x1=x2=1 ของ epoch1 z=−.2 จึง y=0,e=1 และบวก .5 ทั้งสาม weights

ตารางแสดงค่าก่อน/หลังทุก sample; ไม่มี batch averaging หรือ shuffle ใช้เศษส่วนในการตรวจ ไม่ปัดกลางรอบ

| Epoch | x1,x2 → t | weights ก่อน | z | y | e | weights หลัง |
|---|---|---|---:|---:|---:|---|
| 1 | 0,0 → 0 | 0.1,0.1,0.1 | 0.1 | 1 | -1 | -0.4,0.1,0.1 |
| 1 | 0,1 → 0 | -0.4,0.1,0.1 | -0.3 | 0 | 0 | -0.4,0.1,0.1 |
| 1 | 1,0 → 0 | -0.4,0.1,0.1 | -0.3 | 0 | 0 | -0.4,0.1,0.1 |
| 1 | 1,1 → 1 | -0.4,0.1,0.1 | -0.2 | 0 | 1 | 0.1,0.6,0.6 |
| 2 | 0,0 → 0 | 0.1,0.6,0.6 | 0.1 | 1 | -1 | -0.4,0.6,0.6 |
| 2 | 0,1 → 0 | -0.4,0.6,0.6 | 0.2 | 1 | -1 | -0.9,0.6,0.1 |
| 2 | 1,0 → 0 | -0.9,0.6,0.1 | -0.3 | 0 | 0 | -0.9,0.6,0.1 |
| 2 | 1,1 → 1 | -0.9,0.6,0.1 | -0.2 | 0 | 1 | -0.4,1.1,0.6 |
| 3 | 0,0 → 0 | -0.4,1.1,0.6 | -0.4 | 0 | 0 | -0.4,1.1,0.6 |
| 3 | 0,1 → 0 | -0.4,1.1,0.6 | 0.2 | 1 | -1 | -0.9,1.1,0.1 |
| 3 | 1,0 → 0 | -0.9,1.1,0.1 | 0.2 | 1 | -1 | -1.4,0.6,0.1 |
| 3 | 1,1 → 1 | -1.4,0.6,0.1 | -0.7 | 0 | 1 | -0.9,1.1,0.6 |
| 4 | 0,0 → 0 | -0.9,1.1,0.6 | -0.9 | 0 | 0 | -0.9,1.1,0.6 |
| 4 | 0,1 → 0 | -0.9,1.1,0.6 | -0.3 | 0 | 0 | -0.9,1.1,0.6 |
| 4 | 1,0 → 0 | -0.9,1.1,0.6 | 0.2 | 1 | -1 | -1.4,0.6,0.6 |
| 4 | 1,1 → 1 | -1.4,0.6,0.6 | -0.2 | 0 | 1 | -0.9,1.1,1.1 |
| 5 | 0,0 → 0 | -0.9,1.1,1.1 | -0.9 | 0 | 0 | -0.9,1.1,1.1 |
| 5 | 0,1 → 0 | -0.9,1.1,1.1 | 0.2 | 1 | -1 | -1.4,1.1,0.6 |
| 5 | 1,0 → 0 | -1.4,1.1,0.6 | -0.3 | 0 | 0 | -1.4,1.1,0.6 |
| 5 | 1,1 → 1 | -1.4,1.1,0.6 | 0.3 | 1 | 0 | -1.4,1.1,0.6 |
| 6 | 0,0 → 0 | -1.4,1.1,0.6 | -1.4 | 0 | 0 | -1.4,1.1,0.6 |
| 6 | 0,1 → 0 | -1.4,1.1,0.6 | -0.8 | 0 | 0 | -1.4,1.1,0.6 |
| 6 | 1,0 → 0 | -1.4,1.1,0.6 | -0.3 | 0 | 0 | -1.4,1.1,0.6 |
| 6 | 1,1 → 1 | -1.4,1.1,0.6 | 0.3 | 1 | 0 | -1.4,1.1,0.6 |

หลัง epoch5 ได้(−1.4,1.1,.6) แต่ยังมี error ใน epoch5 จึงตรวจ epoch6 ซึ่งไม่ผิดทั้ง 4 แถว Scores ตาม 00,01,10,11=[−1.4,−.8,−.3,.3] จึง AND ถูกครบ ไม่ใช่หลักฐาน generalization สำหรับข้อมูลอื่น

## Decision Boundary และ XOR {#boundary}
S10 pp.13,16–18: boundary คือ b+w1x1+w2x2=0 ด้าน z>0 เป็น 1 สำหรับผล X06 เส้น −1.4+1.1x1+.6x2=0 หรือ x2=7/3−(11/6)x1; ถ้า w2=0 ไม่ใช้สูตรหาร w2 แต่เขียนเส้นแนวตั้งแทน

AND แยกด้วยเส้นตรงได้ แต่ XOR positives(0,1),(1,0) กับ negatives(0,0),(1,1) ไม่ได้ ภายใต้ strict rule: b≤0, b+w1+w2≤0 แต่ b+w1>0 และ b+w2>0 บวกสอง positive constraints ได้ 2b+w1+w2>0 ขัดกับการบวกสอง negative constraints ที่≤0 จึงไม่ใช่แค่เลือก α ผิดหรือ train ยังไม่นานพอ Multilayer network ใช้หลาย boundary ได้ ซึ่งเป็นบทถัดไป

Perceptron convergence theorem ต้องข้อมูลแยกเชิงเส้น มีขอบเขตของ inputs และใช้สมมติฐานการอัปเดตที่เหมาะสม ไม่รับรอง epoch count คงที่ และ XOR ไม่เข้าเงื่อนไข

## L01: สิ่งที่ตรวจได้และยังตรวจไม่ได้ {#lab-evidence}
L01 lines1–43 เป็นข้อความงานส่ง: initial w0=.6,w1=.7,w2=.8, α=.67 ไม่ใช่ X06 รายงาน final w0=1.27,w1=−218,w2=924 และ 139epochs แต่ screenshot ที่อ้างไม่พบ ไม่มีหลักฐาน dataset/ลำดับข้อมูล/การหยุดครบ จึง **ไม่รับรอง replay/คำตอบทางการ** และไม่จับคู่ `student.csv` (D02) อัตโนมัติ สมการในข้อความยังขาดตัวคูณ x และมีความละเอียดต่างจาก weights ที่รายงาน จึงไม่ใช้เป็น boundary ตรวจแล้วของ X06

S10 p.25 ยกการประยุกต์ prediction/classification/association/filtering/conceptualization เป็นภาพรวม ไม่ใช่ผลทดลอง accuracy ของ L01

## Python: Sequential AND {#python}
โค้ดผู้เขียนพิมพ์ trace ตรงตาราง ใช้ strict threshold และ epoch cap ชัดเจน การถึง cap ไม่รับรองเรียนสำเร็จ

```python
from fractions import Fraction as F


def train_perceptron(patterns, initial, rate, epochs):
    weights = [F(str(v)) for v in initial]
    rate = F(str(rate))
    if rate <= 0 or epochs < 1:
        raise ValueError('Positive learning rate/epoch cap required')
    trace = []
    for epoch in range(1,epochs+1):
        mistakes = 0
        for i,(x1,x2,target) in enumerate(patterns,1):
            before = tuple(weights)
            z = weights[0]+weights[1]*x1+weights[2]*x2
            output = int(z>0)  # X06 convention, including z=0 -> 0
            error = target-output
            weights = [w+rate*error*x for w,x in zip(weights,[1,x1,x2])]
            mistakes += int(error != 0)
            trace.append((epoch,i,before,z,output,error,tuple(weights)))
        if mistakes == 0:
            return trace
    return trace  # cap reached does not imply successful classification


patterns_and = [(0,0,0),(0,1,0),(1,0,0),(1,1,1)]
patterns_xor = [(0,0,0),(0,1,1),(1,0,1),(1,1,0)]
trace = train_perceptron(patterns_and,[.1,.1,.1],.5,6)
for row in trace:
    print(row)
print('final',trace[-1][-1])
```

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
สลับ target±1 กับ 0/1; ใช้ z≥0 ทั้งที่ workbook ใช้>; ลืม bias update; เปลี่ยน weights ก่อนคำนวณ error ครบ; เรียก sample เดียวว่า epoch; อ้าง 139epochs ของ L01 เป็น AND; สรุปเพิ่ม layers/αแล้วรับรองคำตอบเสมอ

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 คำนวณ neuron
w=(.1,.1,.1), x=(0,1), target0, α=.5 ให้หา z,y,e และ weights ใหม่

**เฉลย:** z=.1+.1(0)+.1(1)=.2>0 → y1,e−1; w0=−.4,w1=.1,w2=−.4 ต้องปรับ bias ด้วย

### ข้อ2 ตรวจแถวแรก X06
เหตุใด x=(0,0) ยังเปลี่ยน weights?

**เฉลย:** input bias=1 จึง w0=.1+.5(−1)(1)=−.4 แต่ w1,w2 คง.1 เพราะ x1=x2=0 ไม่ใช่ error หาย

### ข้อ3 Threshold ที่ศูนย์
ถ้า z=0,target1 จะปรับหรือไม่? ต่างจาก ≥0 อย่างไร?

**เฉลย:** workbook strict y0,e1 จึงปรับ α[1,x1,x2]; ถ้าใช้≥0จะ y1,e0 และไม่ปรับ เป็นคนละโมเดล ไม่อ้างสอง run เหมือนกัน

### ข้อ4 ผลท้ายและ boundary
ตรวจ AND จาก weights สุดท้ายและหา x2 เมื่อ x1=1 บนเส้น

**เฉลย:** scores[−1.4,−.8,−.3,.3] ให้[0,0,0,1]; x2=(1.4−1.1)/.6=.5 คือเส้นแบ่ง ไม่ใช่ค่า target

### ข้อ5 XOR
เหตุใดเพิ่ม epochs ไม่ทำให้ single perceptron แก้ XOR ได้ทุกจุด?

**เฉลย:** สี่ constraints ขัดกันตามการบวกข้างต้น แสดงว่าไม่มีเส้นใดตอบครบ จึงต้องเปลี่ยน representation/architecture ไม่ใช่อ้างว่าค่าαใหญ่ขึ้นจะแก้ข้อจำกัดเชิงเรขาคณิต

### ข้อ6 วิเคราะห์รายงานการฝึก
ควรยืนยันหรือไม่ว่า X06 จะใช้139epochs และผลคือ(1.27,−218,924)?

**เฉลย:** ไม่ควร ค่านั้นมาจาก L01 ต่าง initial/α และขาด dataset/screenshot X06 trace นี้มี epoch6ไร้ error และ final(−1.4,1.1,.6) จำนวน epoch ขึ้นกับ order/convention/initialization ต้องรายงาน settings ก่อนเทียบ

## สรุปเตรียม FINAL {#summary}
z=b+w·x → strict threshold → e=t−y → update ด้วยαex ทีละ sample → ตรวจทั้ง epoch AND linearly separable; XOR ไม่ใช่ X06=0/1 ไม่ปะปน bipolar L01 ยัง replay ไม่ได้

## แหล่งอ้างอิง {#sources}
- [บัญชี S10/X06/L01](../../../docs/ai-source-coverage.md): source local-only ไม่เผยแพร่ข้อมูลส่วนตัว
- S10 `Final/ANN.pdf` pp.2–9 neuron/network,10–18 perceptron/AND/XOR,25 applications
- X06 `Assignment/perceptron.xlsx` Sheet1!A1:I27; L01 `Assignment/Perceptron.txt` lines1–43 ข้อจำกัดตามด้านบน
- [Coverage](../../../docs/ai-final-perceptron-coverage.md)
