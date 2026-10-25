---
{"version":1,"id":"artificial-intelligence-final-hierarchical-clustering","course":"artificial-intelligence","category":"summaries","slug":"final-hierarchical-clustering","title":"FINAL: ความคล้ายและการจัดกลุ่มลำดับชั้น (Similarity & Hierarchical Clustering)","language":"th"}
---

> ใช้ S09 `Final/clustering.pdf` physical pp.2–30 และ46 ตรวจภาพ/matricesโดยตรง ตัวอย่างที่คำนวณเพิ่มเติมและเฉลยเป็นงานผู้เขียน ไม่ใช่ official answer key ตัวเลขจาก matrices ไม่ใช่พิกัดที่เดาจากภาพ ตัวบทต่อหลัง Decision Tree เป็นลำดับเผยแพร่ชั่วคราว ไม่ใช่ teaching sequence ที่ยืนยัน

## เป้าหมายและ Key Concepts {#objectives}
- แยก supervised/unsupervised, similarity/distance และเลือก representation
- คำนวณ Euclidean/Manhattan/correlation พร้อมข้อจำกัด
- ทำ agglomerative merges ด้วย single/complete/average linkage
- อ่าน dendrogram, cuts และ outlier โดยไม่ตีความเป็น probability

## Supervised เทียบ Unsupervised {#concepts}
S09 pp.2–5: supervised มี (X,Y) เช่น classification/regression; unsupervised ใช้ X โดยไม่มี teacher labels Clusteringต้องการคล้ายกันมากภายในกลุ่มและคล้ายกันน้อยข้ามกลุ่ม หน้า4ยก people/images/language/species ไม่ได้มีคำตอบกลุ่มเดียวที่ถูกเสมอ Mixture models/dimensionality reduction เป็นชื่อที่เอ่ยหน้า5 ไม่ใช่เนื้อหาขยายในบทนี้

## Similarity, Distance และ Correlation {#distance}
pp.6–9 อธิบายว่าความคล้ายขึ้นกับตัวแทน/เกณฑ์และให้คุณสมบัติ metric: nonnegative, symmetry, d(x,x)=0, identity of indiscernibles และ triangle inequality รูปคน/ข้อความ/genesเป็นตัวอย่างrepresentation ไม่ใช่การวัดหน่วยเดียวกันทั้งหมด

สูตร Euclidean หน้า10 และ Manhattan ที่ผู้เขียนเพิ่มตามโจทย์ทบทวน:

$$
d_2(x,y)=\sqrt{\sum_j(x_j-y_j)^2},\qquad d_1(x,y)=\sum_j\lvert x_j-y_j\rvert
$$

ตัวอย่างเสริม (1,2) กับ (4,6) มี Euclidean=√(9+16)=5 และ Manhattan=3+4=7 การเปลี่ยนสเกล feature เปลี่ยนdistance/กลุ่ม จึงประกาศmetricและpreprocessingก่อนคำนวณ

pp.10–11 ใช้ correlation เปรียบเทียบรูปแบบ gene expression ตามเวลา สูตรที่ใช้คำนวณให้ normalized ชัดเจนคือ

$$
r=\frac{\sum_j(x_j-\bar x)(y_j-\bar y)}{\sqrt{\sum_j(x_j-\bar x)^2\sum_j(y_j-\bar y)^2}}
$$

สัญลักษณ์σในหน้า10ไม่แจก normalization ของผลรวม จึงไม่คัดรูปย่อจนได้ค่าเกิน[-1,1] ตัวอย่างเสริม (1,2,3) กับ (2,4,6) ได้r=1แม้Euclideanไม่เป็น0; (3,2,1)ได้r=−1; vectorคงที่ทำให้rไม่กำหนด ถ้าใช้1−rเป็นdissimilarity ต้องระบุว่าไม่รับรองเป็นmetricครบทุกข้อ เช่นr=1ของvectorต่างกันทำให้distance0ได้ ภาพหน้า11ชี้ความต่างระหว่างรูปทรงร่วมกับระดับความสูง ไม่ใช่หลักฐาน causal/function ของยีนโดยตัวมันเอง

## Hierarchical: Agglomerative และ Divisive {#hierarchy}
pp.12–18: agglomerativeเริ่มหนึ่งจุดต่อclusterแล้วรวมคู่ที่ใกล้ที่สุดซ้ำจนเหลือกลุ่มเดียว; divisiveเริ่มกลุ่มใหญ่แล้วแบ่งลง ไม่ใช่เพียงกลับลำดับขั้นของagglomerativeทุกอัลกอริทึม ต้นไม้เก็บการรวมหลายระดับ ต่างจากpartitionเดียว การเลือกจำนวนclusterทำภายหลังโดยcutได้ แต่ต้องเลือกdistance/linkageตั้งแต่ต้น

## Linkage ระหว่างกลุ่ม {#linkage}
ให้ A,B เป็นกลุ่มไม่ทับกัน ใช้ระยะคู่สมาชิกเดิมตาม pp.19–21

$$
d_{single}(A,B)=\min_{a\in A,b\in B}d(a,b),\quad d_{complete}(A,B)=\max_{a\in A,b\in B}d(a,b)
$$

$$
d_{average}(A,B)=\frac{1}{|A||B|}\sum_{a\in A}\sum_{b\in B}d(a,b)
$$

Singleอาจเกิดchaining/กลุ่มยาว Completeใช้คู่ไกลสุดจึงมักได้กลุ่มแน่นกว่า Averageเฉลี่ยทุกcross-pair ไม่ใช่ระยะระหว่างcentroid และไม่ใช่เฉลี่ยสองclusterเท่ากันโดยไม่สนขนาด คำว่าrobust/noiseในหน้า21เป็นข้อเปรียบเทียบเชิงคุณภาพ ไม่รับรองว่าไม่มีoutlierกระทบ

## Matrix จากหน้า14 {#matrix-first}
เรียกวัตถุรูปการ์ตูนตามลำดับซ้ายไปขวาว่า A,B,C,D,E (IDs ผู้เขียนกำหนด ไม่ใช่ชื่อในสไลด์) Upper triangle คือ AB8,AC8,AD7,AE7,BC2,BD4,BE4,CD3,CE3,DE1 เติมอีกครึ่งด้วยsymmetryและdiagonal0

เริ่มรวม D,E ที่1 และ B,C ที่2 จากนั้นระยะ BC↔DE: cross-pairs [4,4,3,3] ให้ single3,complete4,average3.5 คำตอบจึงต่างกันตามlinkageแม้ใช้matrixเดียวกัน ไม่ใช้Euclideanคำนวณจากตำแหน่งตัวการ์ตูน

## Worked Example หน้า22–25 {#worked}
ใช้matrixอีกชุดซึ่งมีชื่อ1..5ตามสไลด์ ไม่สลับกับตัวเลขหน้า14

```text
      1  2  3  4  5
1     0  2  6 10  9
2     2  0  3  9  8
3     6  3  0  7  5
4    10  9  7  0  4
5     9  8  5  4  0
```

**Singleตามsource:** รวม(1,2)ที่2 แล้ว d(12,3)=min(6,3)=3, d(12,4)=min(10,9)=9, d(12,5)=min(9,8)=8 จึงรวม12กับ3ที่3 ขณะนี้d(123,4)=min(10,9,7)=7,d(123,5)=min(9,8,5)=5 และd(4,5)=4 จึงรวม45ที่4 สุดท้ายmin(10,9,9,8,7,5)=5 รวม123กับ45

```text
single:   ((1,2)@2,3)@3  joins  (4,5)@4  at 5
complete: ((1,2)@2,3)@6  joins  (4,5)@4  at 10
average:  ((1,2)@2,3)@4.5 joins (4,5)@4  at 8
```

Complete/average tracesเขียนและตรวจเพิ่มจากmatrixเดิม: หลัง12ที่2จะรวม45ที่4ก่อน Complete d(12,3)=6 แล้วfinalmax10 ส่วนaverage d(12,3)=(6+3)/2=4.5 แล้วfinal(10+9+9+8+7+5)/6=8 ทุกheightเป็นlinkage distance ไม่ใช่จำนวนสมาชิกหรือเปอร์เซ็นต์

## Python และการผูก Tie {#python}
Codeเสริมนี้คำนวณจากcross-pairsของสมาชิกเดิม เลือกtieตามลำดับtupleIDs ให้ผลซ้ำได้ Fractionใช้เพื่อรักษาexactระยะทศนิยมที่ให้มา ไม่สร้างtraining UIหรือgraph renderer

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
pp.26–29 ให้heightเป็นdistanceระหว่างกลุ่ม ไม่ใช่x-positionของใบหรือprobability ถ้าcutsingleexampleที่h=4.5 จะมี{1,2,3}กับ{4,5}; ที่h=3.5ยังมี3กลุ่มคือ{1,2,3},{4},{5} ประกาศconventionว่ารวมทุกmergeที่height≤h ถ้าตัดที่heightเท่ากันพอดีจำนวนกลุ่มอาจต่างเมื่อใช้strict inequality

หน้า29กิ่งเดี่ยวที่รวมสูงชี้จุดที่ต่างจากส่วนอื่น เป็นเบาะแสoutlierไม่ใช่ข้อพิสูจน์ว่าข้อมูลผิด ต้องดูสเกล/metricด้วย หน้า30groupยีนตามรูปแบบexpressionเพื่อสร้างสมมติฐานหน้าที่ ไม่รับรองgene functionจากclusteringอย่างเดียว หน้า27กล่าวถึงค่าใช้จ่ายอย่างน้อยquadraticของวิธีมาตรฐานที่เก็บpairwise distances; implementationแบบลองทุกคู่ซ้ำในบทมีเวลาแย่กว่านั้น ไม่อ้างว่าcodeสาธิตมีประสิทธิภาพเหมือนoptimizedlibrary การรวมgreedyย้อนแก้ไม่ได้เอง

## Common Mistakes {#mistakes}
- ใช้similarityสูงเป็นdistanceสูง หรือไม่บอกว่าcorrelationแปลงเป็นdistanceอย่างไร
- เอาmatrixหน้า14กับ22มาปนกัน; คิดdistanceจากรูปภาพที่ไม่มีพิกัด
- single=min,complete=max,average=ทุกcross-pair อย่าสลับสูตรหรือใช้centroidแทน
- อ่านตำแหน่งใบเป็นdistanceแทนheight; cutโดยไม่ระบุกรณีเท่ากับthreshold
- คิดว่ามีกลุ่มจริงจำนวนเดียวเสมอ หรือoutlierทุกตัวต้องลบทิ้ง

## แบบฝึกและเฉลยตรวจใหม่ {#practice}
ทั้งห้าข้อเป็นแบบฝึกผู้เขียน ไม่ใช่ official answers

### 1. Distance สองแบบ {#q1}
(1,2) กับ(4,6)ได้ระยะอะไร?

**เฉลย:** differences3,4 → Euclidean√25=5; Manhattan7 ไม่ใช้5เป็นคำตอบทั้งสองmetric

### 2. รวมกลุ่มแรก {#q2}
matrixหน้า22ควรรวมคู่ใดก่อนและทำไม?

**เฉลย:** 1กับ2ที่2เพราะเป็นoff-diagonalต่ำสุด Diagonal0เป็นself-distanceไม่ใช่คู่candidate

### 3. เปรียบเทียบ Linkage {#q3}
หลังรวม12 ระยะถึง3แต่ละวิธีเป็นเท่าไร?

**เฉลย:** pairs6,3 → single3,complete6,average4.5 ดังนั้นsingleรวม3ต่อ แต่complete/averageรวม45ที่4ก่อน

### 4. Average Final Merge {#q4}
เมื่อมี123กับ45 จงคำนวณaverage distance

**เฉลย:** ทั้งหมด3×2=6cross-pairs [10,9,9,8,7,5] รวม48 หาร6ได้8 ไม่ใช่เฉลี่ยdistanceของสองsubclustersเท่ากันแบบไม่ถ่วงสมาชิก

### 5. Cut และการแปลความ {#q5}
singlecutที่4.5มีกี่กลุ่ม? กิ่งรวมสูงแปลว่าผิดหรือไม่?

**เฉลย:** merge2,3,4ผ่านthresholdแต่5ยังไม่ผ่าน จึง2กลุ่ม123กับ45 กิ่งรวมสูงเพียงsuggestoutlierภายใต้metricนี้ ไม่รับรองความผิดหรือprobabilityต่ำ

## สรุป FINAL และ Sources {#summary}
เลือกrepresentation/metricก่อนlinkage; ตรวจsymmetry/diagonalและtie; dendrogramเก็บระดับการรวม ไม่ต้องกำหนดkก่อนสร้างแต่cutต้องมีเกณฑ์ Singleheight2,3,4,5; Complete2,4,6,10; Average2,4,4.5,8สำหรับmatrixหน้า22เท่านั้น

## แหล่งข้อมูล {#sources}
S09 local-only `Final/clustering.pdf` pp.2–5 learning/clustering/tasks,6–11 similarity/metric/correlation,12–18 hierarchyและmatrix,19–21linkages,22–25singletrace,26dendrogram,27limitations,28cuts,29outliers,30genes,46review. Manhattan, ตัวอย่างvector, complete/average numeric extensions, cutthreshold convention และเฉลยเป็นคำอธิบายเสริม ไม่คัดลอกภาพการ์ตูนหรือสร้างพิกัดสมมติอ้างว่าsourceให้
