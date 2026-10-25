---
{"version":1,"id":"artificial-intelligence-final-hierarchical-clustering","course":"artificial-intelligence","category":"summaries","slug":"final-hierarchical-clustering","title":"FINAL: ความคล้ายและการจัดกลุ่มลำดับชั้น (Similarity & Hierarchical Clustering)","language":"th"}
---

> ใช้ S09 `Final/clustering.pdf` physical pp.2–30 และ 46 ตรวจภาพ/matrices โดยตรง ตัวอย่างที่คำนวณเพิ่มเติมและเฉลยเป็นงานผู้เขียน ไม่ใช่ official answer key ตัวเลขจาก matrices ไม่ใช่พิกัดที่เดาจากภาพ ตัวบทต่อหลัง Decision Tree เป็นลำดับเผยแพร่ชั่วคราว ไม่ใช่ teaching sequence ที่ยืนยัน

## เป้าหมายและ Key Concepts {#objectives}
- แยก supervised/unsupervised, similarity/distance และเลือก representation
- คำนวณ Euclidean/Manhattan/correlation พร้อมข้อจำกัด
- ทำ agglomerative merges ด้วย single/complete/average linkage
- อ่าน dendrogram, cuts และ outlier โดยไม่ตีความเป็น probability

## Supervised เทียบ Unsupervised {#concepts}
S09 pp.2–5: supervised มี (X,Y) เช่น classification/regression; unsupervised ใช้ X โดยไม่มี teacher labels

Clustering ต้องการคล้ายกันมากภายในกลุ่มและคล้ายกันน้อยข้ามกลุ่ม หน้า 4 ยก people/images/language/species ไม่ได้มีคำตอบกลุ่มเดียวที่ถูกเสมอ Mixture models/dimensionality reduction เป็นชื่อที่เอ่ยหน้า 5 ไม่ใช่เนื้อหาขยายในบทนี้

## Similarity, Distance และ Correlation {#distance}
pp.6–9 อธิบายว่าความคล้ายขึ้นกับตัวแทน/เกณฑ์และให้คุณสมบัติ metric: nonnegative, symmetry, d(x,x)=0, identity of indiscernibles และ triangle inequality รูปคน/ข้อความ/genes เป็นตัวอย่าง representation ไม่ใช่การวัดหน่วยเดียวกันทั้งหมด

สูตร Euclidean หน้า 10 และ Manhattan ที่ผู้เขียนเพิ่มตามโจทย์ทบทวน:

$$
d_2(x,y)=\sqrt{\sum_j(x_j-y_j)^2},\qquad d_1(x,y)=\sum_j\lvert x_j-y_j\rvert
$$

ตัวอย่างเสริม (1,2) กับ (4,6) มี Euclidean=√(9+16)=5 และ Manhattan=3+4=7 การเปลี่ยนสเกล feature เปลี่ยน distance/กลุ่ม จึงประกาศ metric และ preprocessing ก่อนคำนวณ

pp.10–11 ใช้ correlation เปรียบเทียบรูปแบบ gene expression ตามเวลา สูตรที่ใช้คำนวณให้ normalized ชัดเจนคือ

$$
r=\frac{\sum_j(x_j-\bar x)(y_j-\bar y)}{\sqrt{\sum_j(x_j-\bar x)^2\sum_j(y_j-\bar y)^2}}
$$

สัญลักษณ์σในหน้า 10 ไม่แจก normalization ของผลรวม จึงไม่คัดรูปย่อจนได้ค่าเกิน[-1,1] ตัวอย่างเสริม (1,2,3) กับ (2,4,6) ได้ r=1 แม้ Euclidean ไม่เป็น 0; (3,2,1) ได้ r=−1; vector คงที่ทำให้ r ไม่กำหนด ถ้าใช้ 1−r เป็น dissimilarity ต้องระบุว่าไม่รับรองเป็น metric ครบทุกข้อ เช่น r=1 ของ vector ต่างกันทำให้ distance0 ได้ ภาพหน้า 11 ชี้ความต่างระหว่างรูปทรงร่วมกับระดับความสูง ไม่ใช่หลักฐาน causal/function ของยีนโดยตัวมันเอง

## Hierarchical: Agglomerative และ Divisive {#hierarchy}
pp.12–18: agglomerative เริ่มหนึ่งจุดต่อ cluster แล้วรวมคู่ที่ใกล้ที่สุดซ้ำจนเหลือกลุ่มเดียว; divisive เริ่มกลุ่มใหญ่แล้วแบ่งลง ไม่ใช่เพียงกลับลำดับขั้นของ agglomerative ทุกอัลกอริทึม ต้นไม้เก็บการรวมหลายระดับ ต่างจาก partition เดียว การเลือกจำนวน cluster ทำภายหลังโดย cut ได้ แต่ต้องเลือก distance/linkage ตั้งแต่ต้น

## Linkage ระหว่างกลุ่ม {#linkage}
ให้ A,B เป็นกลุ่มไม่ทับกัน ใช้ระยะคู่สมาชิกเดิมตาม pp.19–21

$$
d_{single}(A,B)=\min_{a\in A,b\in B}d(a,b),\quad d_{complete}(A,B)=\max_{a\in A,b\in B}d(a,b)
$$

$$
d_{average}(A,B)=\frac{1}{|A||B|}\sum_{a\in A}\sum_{b\in B}d(a,b)
$$

Single อาจเกิด chaining/กลุ่มยาว Complete ใช้คู่ไกลสุดจึงมักได้กลุ่มแน่นกว่า Average เฉลี่ยทุก cross-pair ไม่ใช่ระยะระหว่าง centroid และไม่ใช่เฉลี่ยสอง cluster เท่ากันโดยไม่สนขนาด คำว่า robust/noise ในหน้า 21 เป็นข้อเปรียบเทียบเชิงคุณภาพ ไม่รับรองว่าไม่มี outlier กระทบ

## Matrix จากหน้า14 {#matrix-first}
เรียกวัตถุรูปการ์ตูนตามลำดับซ้ายไปขวาว่า A,B,C,D,E (IDs ผู้เขียนกำหนด ไม่ใช่ชื่อในสไลด์) Upper triangle คือ AB8,AC8,AD7,AE7,BC2,BD4,BE4,CD3,CE3,DE1 เติมอีกครึ่งด้วย symmetry และ diagonal0

เริ่มรวม D,E ที่ 1 และ B,C ที่ 2 จากนั้นระยะ BC↔DE: cross-pairs [4,4,3,3] ให้ single3,complete4,average3.5 คำตอบจึงต่างกันตาม linkage แม้ใช้ matrix เดียวกัน ไม่ใช้ Euclidean คำนวณจากตำแหน่งตัวการ์ตูน

## Worked Example หน้า22–25 {#worked}
ใช้ matrix อีกชุดซึ่งมีชื่อ 1..5 ตามสไลด์ ไม่สลับกับตัวเลขหน้า 14

```text
      1  2  3  4  5
1     0  2  6 10  9
2     2  0  3  9  8
3     6  3  0  7  5
4    10  9  7  0  4
5     9  8  5  4  0
```

**Single ตาม source:** รวม(1,2) ที่ 2 แล้ว d(12,3)=min(6,3)=3, d(12,4)=min(10,9)=9, d(12,5)=min(9,8)=8 จึงรวม 12 กับ 3 ที่ 3 ขณะนี้ d(123,4)=min(10,9,7)=7,d(123,5)=min(9,8,5)=5 และ d(4,5)=4 จึงรวม 45 ที่ 4 สุดท้าย min(10,9,9,8,7,5)=5 รวม 123 กับ 45

```text
single:   ((1,2)@2,3)@3  joins  (4,5)@4  at 5
complete: ((1,2)@2,3)@6  joins  (4,5)@4  at 10
average:  ((1,2)@2,3)@4.5 joins (4,5)@4  at 8
```

Complete/average traces เขียนและตรวจเพิ่มจาก matrix เดิม: หลัง 12 ที่ 2 จะรวม 45 ที่ 4 ก่อน Complete d(12,3)=6 แล้ว finalmax10 ส่วน average d(12,3)=(6+3)/2=4.5 แล้ว final(10+9+9+8+7+5)/6=8 ทุก height เป็น linkage distance ไม่ใช่จำนวนสมาชิกหรือเปอร์เซ็นต์

## Python และการผูก Tie {#python}
Code เสริมนี้คำนวณจาก cross-pairs ของสมาชิกเดิม เลือก tie ตามลำดับ tupleIDs ให้ผลซ้ำได้ Fraction ใช้เพื่อรักษา exact ระยะทศนิยมที่ให้มา ไม่สร้าง training UI หรือ graph renderer

```python
from fractions import Fraction as F


def agglomerate(matrix, method):
    n = len(matrix)
    if any(len(row) != n for row in matrix):
        raise ValueError('Square distance matrix required')
    if any(matrix[i][i] != 0 for i in range(n)) or any(
        matrix[i][j] < 0 or matrix[i][j] != matrix[j][i]
        for i in range(n) for j in range(n)):
        raise ValueError('Symmetric nonnegative distances with zero diagonal required')
    if method not in ('single','complete','average'):
        raise ValueError('Unknown linkage')
    clusters = [(i,) for i in range(n)]
    trace = []
    while len(clusters) > 1:
        options = []
        for a in range(len(clusters)):
            for b in range(a+1,len(clusters)):
                pairs = [F(str(matrix[i][j])) for i in clusters[a] for j in clusters[b]]
                d = min(pairs) if method=='single' else max(pairs) if method=='complete' else sum(pairs)/len(pairs)
                options.append((d,clusters[a],clusters[b]))
        d,left,right = min(options)  # ties: lexicographic member IDs
        clusters = sorted([c for c in clusters if c not in (left,right)]+[tuple(sorted(left+right))])
        trace.append((tuple(i+1 for i in left),tuple(i+1 for i in right),float(d)))
    return trace


# S09 physical p.22: symmetrized from its lower triangular matrix
matrix = [[0,2,6,10,9],[2,0,3,9,8],[6,3,0,7,5],[10,9,7,0,4],[9,8,5,4,0]]
for method in ('single','complete','average'):
    print(method,agglomerate(matrix,method))
```

## Dendrogram, Cut และ Outlier {#dendrogram}
pp.26–29 ให้ height เป็น distance ระหว่างกลุ่ม ไม่ใช่ x-position ของใบหรือ probability ถ้า cutsingleexample ที่ h=4.5 จะมี{1,2,3}กับ{4,5}; ที่ h=3.5 ยังมี 3 กลุ่มคือ{1,2,3},{4},{5} ประกาศ convention ว่ารวมทุก merge ที่ height≤h ถ้าตัดที่ height เท่ากันพอดีจำนวนกลุ่มอาจต่างเมื่อใช้ strict inequality

หน้า 29 กิ่งเดี่ยวที่รวมสูงชี้จุดที่ต่างจากส่วนอื่น เป็นเบาะแส outlier ไม่ใช่ข้อพิสูจน์ว่าข้อมูลผิด ต้องดูสเกล/metric ด้วย หน้า 30group ยีนตามรูปแบบ expression เพื่อสร้างสมมติฐานหน้าที่ ไม่รับรอง gene function จาก clustering อย่างเดียว หน้า 27 กล่าวถึงค่าใช้จ่ายอย่างน้อย quadratic ของวิธีมาตรฐานที่เก็บ pairwise distances; implementation แบบลองทุกคู่ซ้ำในบทมีเวลาแย่กว่านั้น ไม่อ้างว่า code สาธิตมีประสิทธิภาพเหมือน optimizedlibrary การรวม greedy ย้อนแก้ไม่ได้เอง

## Common Mistakes {#mistakes}
- ใช้ similarity สูงเป็น distance สูง หรือไม่บอกว่า correlation แปลงเป็น distance อย่างไร
- เอา matrix หน้า 14 กับ 22 มาปนกัน; คิด distance จากรูปภาพที่ไม่มีพิกัด
- single=min,complete=max,average=ทุก cross-pair อย่าสลับสูตรหรือใช้ centroid แทน
- อ่านตำแหน่งใบเป็น distance แทน height; cut โดยไม่ระบุกรณีเท่ากับ threshold
- คิดว่ามีกลุ่มจริงจำนวนเดียวเสมอ หรือ outlier ทุกตัวต้องลบทิ้ง

## แบบฝึกและเฉลยตรวจใหม่ {#practice}
ทั้งห้าข้อเป็นแบบฝึกผู้เขียน ไม่ใช่ official answers

### 1. Distance สองแบบ {#q1}
(1,2) กับ(4,6)ได้ระยะอะไร?

**เฉลย:** differences3,4 → Euclidean√25=5; Manhattan7 ไม่ใช้5เป็นคำตอบทั้งสอง metric

### 2. รวมกลุ่มแรก {#q2}
matrix หน้า22ควรรวมคู่ใดก่อนและทำไม?

**เฉลย:** 1กับ2ที่2เพราะเป็น off-diagonal ต่ำสุด Diagonal0เป็น self-distance ไม่ใช่คู่ candidate

### 3. เปรียบเทียบ Linkage {#q3}
หลังรวม12 ระยะถึง3แต่ละวิธีเป็นเท่าไร?

**เฉลย:** pairs6,3 → single3,complete6,average4.5 ดังนั้น single รวม3ต่อ แต่ complete/average รวม45ที่4ก่อน

### 4. Average Final Merge {#q4}
เมื่อมี123กับ45 จงคำนวณ average distance

**เฉลย:** ทั้งหมด3×2=6cross-pairs [10,9,9,8,7,5] รวม48 หาร6ได้8 ไม่ใช่เฉลี่ย distance ของสอง subclusters เท่ากันแบบไม่ถ่วงสมาชิก

### 5. Cut และการแปลความ {#q5}
singlecut ที่4.5มีกี่กลุ่ม? กิ่งรวมสูงแปลว่าผิดหรือไม่?

**เฉลย:** merge2,3,4ผ่าน threshold แต่5ยังไม่ผ่าน จึง2กลุ่ม123กับ45 กิ่งรวมสูงเพียง suggestoutlier ภายใต้ metric นี้ ไม่รับรองความผิดหรือ probability ต่ำ

## สรุป FINAL และ Sources {#summary}
เลือก representation/metric ก่อน linkage; ตรวจ symmetry/diagonal และ tie; dendrogram เก็บระดับการรวม ไม่ต้องกำหนด k ก่อนสร้างแต่ cut ต้องมีเกณฑ์ Singleheight2,3,4,5; Complete2,4,6,10; Average2,4,4.5,8 สำหรับ matrix หน้า 22 เท่านั้น

## แหล่งข้อมูล {#sources}
S09 local-only `Final/clustering.pdf` pp.2–5 learning/clustering/tasks,6–11 similarity/metric/correlation,12–18 hierarchy และ matrix,19–21linkages,22–25singletrace,26dendrogram,27limitations,28cuts,29outliers,30genes,46review. Manhattan, ตัวอย่าง vector, complete/average numeric extensions, cutthreshold convention และเฉลยเป็นคำอธิบายเสริม ไม่คัดลอกภาพการ์ตูนหรือสร้างพิกัดสมมติอ้างว่า source ให้
