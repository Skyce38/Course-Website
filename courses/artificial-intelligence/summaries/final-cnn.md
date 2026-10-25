---
{"version":1,"id":"artificial-intelligence-final-cnn","course":"artificial-intelligence","category":"summaries","slug":"final-cnn","title":"FINAL: CNN และการคำนวณภาพ (Image Operations)","language":"th"}
---

> S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.12–33 ตรวจภาพและตัวเลขโดยตรง บทนี้ FINAL ใช้ cross-correlation convention สำหรับ CNN พร้อมชี้ความต่างกับ convolution เฉลย/ตัวอย่างเสริมเป็นงานผู้เขียน ไม่ใช่ official answer key ลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- อ่านภาพเป็น arrays/channels และติดตาม shape ทุกชั้น
- คำนวณ kernel,featuremap,stride,padding,pooling และ ReLU
- แยก cross-correlation/convolution และผลของการกลับ kernel
- คำนวณ RGB channel sums,flatten,FC parameters และ outputsize
- ตรวจข้อผิดพลาดตัวเลขใน source โดยไม่จำค่าที่ขัดกับสูตร

## ภาพ, Pixels และ CNN {#images}
S11 pp.12–14 ยก CNN สำหรับข้อมูลเชิงพื้นที่ (spatialdata) เช่นภาพ/วิดีโอ ใช้ filters ดึง features แล้วส่งต่อ classifier ภาพกากบาท5×5เป็นตัวแทนเชิงตัวเลข:ช่องกากบาทกำหนด5และที่เหลือ1 เป็น **encoding สมมติ** ไม่ใช่มาตรฐานว่าสีฟ้าทุกภาพมี pixel5 ภาพ grayscale เป็น H×W; RGB มี3channels ซึ่งแต่ละ pixel เก็บสามค่า

ภาพ pipelinep.13แสดง convolution/ReLU/pooling หลายครั้งแล้ว flatten/FC/softmax ส่วน workedexamplepp.19–30ใช้ convolution→pooling→ReLU→FC ต้องตามลำดับของตัวอย่าง ไม่สรุปว่า CNN ทุกแบบมี layerorder เดียวกัน หน้าเว็บไม่ train โมเดลหรือแสดง accuracy ที่แต่งขึ้น

## Kernel และ convention {#kernel}
S11 pp.15–18,21–22 ใช้ kernel/filter เลื่อนไปคูณตำแหน่งตรงกันแล้วรวม (dotproduct) เรียก convolution ตามการใช้ชื่อใน CNN แต่การคำนวณแบบ **ไม่กลับ kernel** นี้คือ cross-correlation บทนี้ใช้ bias0,dilation1และสูตร

$$
Y_{ij}=\sum_{u=0}^{K_h-1}\sum_{v=0}^{K_w-1}X_{is+u-p,js+v-p}K_{uv}
$$

นอกขอบเป็น0เมื่อ padding; convolution เชิงคณิตศาสตร์กลับ kernel180°ก่อนคูณ sourcefilters กากบาทบางตัวสมมาตรจึงให้ผลเท่ากัน แต่ไม่ใช่ทุก kernel

### ตรวจความไม่สอดคล้องหน้า16
Input4×4และ kernel ที่แสดง (แถวบนลงล่าง):
```text
X:                 K:
1  5  9 13         9 8 7
2  6 10 14         6 5 4
3  7 11 15         3 2 1
4  8 12 16
```
ช่องแรกแบบไม่กลับ kernel: 1×9+5×8+9×7+2×6+6×5+10×4+3×3+7×2+11×1 =9+40+63+12+30+40+9+14+11=**228** ตรงตัวเลขในช่องภาพ แต่ caption เริ่มด้วย312ทั้งที่แสดง sum ข้างต้น จึงไม่ใช้312เป็นผล sum นี้ ถ้ากลับ kernel เป็น1..9จริงจะได้312 (คนละ convention)

Outputvalidstride1ทั้งแผ่นของ cross-correlation:
```text
   228    408
   273    453
```

pp.17–18 แสดง edge/gradientfilters เช่นแถว[1,0,−1]ซ้ำสามแถว และ transpose ที่ดูการเปลี่ยนอีกทิศ การกลับ kernel เปลี่ยนเครื่องหมายของ response จึงต้องบอก convention ไม่เดาค่า pixel ของภาพตัวอย่างที่ไม่ได้ให้ array

## Source กากบาท: Input และสาม Filters {#source-matrices}
S11 pp.14–15,21–22: X ต่อไปนี้และ F1,F2,F3ตามลำดับ **ไม่ใช่** filtersRGB หน้า31
```text
     1      1      5      1      1
     1      1      5      1      1
     5      5      5      5      5
     1      1      5      1      1
     1      1      5      1      1
```
F1:
```text
    -1      1     -1
     1      1      1
    -1      1     -1
```
F2:
```text
    -2      2     -2
    -2      2     -2
    -2      2     -2
```
F3:
```text
    -3     -3     -3
     3      3      3
    -3     -3     -3
```

F1ช่องซ้ายบน: −1×1+1×1−1×5+1×1+1×1+1×5−1×5+1×5−1×5=−3; ช่องกลางใช้ patch[1,5,1;5,5,5;1,5,1] ได้−1+5−1+5+5+5−1+5−1=21

### Valid convolution/correlation: stride1,padding0
ขนาด(5−3)/1+1=3 จึงได้3×3ต่อ filter ผลทุกช่องตาม p.21–22:
OutputF1:
```text
    -3      5     -3
     5     21      5
    -3      5     -3
```
OutputF2:
```text
   -30      2    -30
   -30      2    -30
   -30      2    -30
```
OutputF3:
```text
   -45    -45    -45
     3      3      3
   -45    -45    -45
```

## Padding, Stride และ Output Size {#shape}
S11 p.23เติม zero1ชั้นรอบ5×5เป็น7×7 แล้วใช้ kernel3×3ทำให้ output5×5เมื่อ stride1 การ padding ไม่ได้รับรอง shape เท่าเดิมสำหรับทุก kernel/stride โดยไม่คำนวณ สูตรเสริมกรณี dilation1และ padding สมมาตร:

$$
H_{out}=\left\lfloor\frac{H+2p-K_h}{s}\right\rfloor+1,\quad W_{out}=\left\lfloor\frac{W+2p-K_w}{s}\right\rfloor+1
$$

s คือระยะเลื่อน ไม่ใช่ขนาด kernel ตัวอย่าง5×5,k3,p0,s2ได้2×2; p1,s1ได้5×5; p1,s2ได้3×3 ใช้ floor เมื่อเลื่อนไม่ลงตัว และตรวจ kernelfit ก่อน ไม่มี dilation>1ใน workedexample นี้

ผล padding1ของทั้งสาม filters ตรง p.23และ26:
PaddedF1:
```text
     2      2     10      2      2
     2     -3      5     -3      2
    10      5     21      5     10
     2     -3      5     -3      2
     2      2     10      2      2
```
PaddedF2:
```text
     0    -20     12    -20      0
     0    -30      2    -30      0
     0    -30      2    -30      0
     0    -30      2    -30      0
     0    -20     12    -20      0
```
PaddedF3:
```text
     0      0      0      0      0
   -30    -45    -45    -45    -30
    18      3      3      3     18
   -30    -45    -45    -45    -30
     0      0      0      0      0
```

ช่องบนซ้าย F1ใช้ patch[0,0,0;0,1,1;0,1,1] จึง0+0+0+0+1+1+0+1−1=2 ไม่มีการสร้าง pixel จริงใหม่ที่ขอบ

## Max/Average Pooling {#pooling}
S11 pp.24–26 ใช้หน้าต่างเลือกค่าสูงสุดเพื่อลด spatialsize ไม่เรียน weights ใน pooling มาตรฐาน ต้องระบุ size/stride และ padding แยกจาก convolution

p.25ให้ input4×4,size2,stride2:
```text
     0      2      1      3
     5      6      8      7
     1      2      3      1
     2      3      4      2
```

Max output:
```text
     6      8
     3      4
```

Average output (เก็บค่าจริง):
```text
  3.25   4.75
     2    2.5
```

Top-leftavg=(0+2+5+6)/4=3.25;top-right=(1+3+8+7)/4=4.75 สไลด์แสดง3.3/4.8เมื่อปัดหนึ่งตำแหน่ง ไม่ใช่ค่าก่อนปัด Python round อาจใช้ tie-to-even จึงอย่าใช้รูปปัดเทียบเป็น error ของสูตร

สำหรับ p.24,26 ใช้ paddedmaps5×5,size3,stride1(noadditionalpadding) →3×3ทุก map ผลทุกช่อง:
MaxPooledF1:
```text
    21     21     21
    21     21     21
    21     21     21
```
MaxPooledF2:
```text
    12     12     12
     2      2      2
    12     12     12
```
MaxPooledF3:
```text
    18      3     18
    18      3     18
    18      3     18
```

F1ทุก window มี21จึงทั้งหมด21;F2แถวบน/ล่างมี12แต่แถวกลาง max2;F3ซ้าย/ขวามี18แต่ตรงกลาง max3 ไม่ใช่ใช้ maximum ทั้งภาพครั้งเดียวแทนแต่ละ window

## ReLU, Flatten และ Fully Connected {#relu-fc}
S11 pp.27–30: ReLU(x)=max(0,x) ทำทีละค่า ไม่เปลี่ยน shape ตัวอย่าง p.27:
```text
ก่อน:          หลัง:
-1 -2 -3       0 0 0
 1  2  3       1 2 3
-1 -2 -3       0 0 0
```
p.28 pooledmaps ข้างบนทุกค่าเป็นบวกจึงไม่เปลี่ยน แต่ถ้า ReLU ก่อน pooling/average อาจต่างได้ ต้องตาม order ที่ประกาศ

p.29 Flatten เรียง features เป็น vector ไม่มี weights และไม่คำนวณค่าใหม่ บทนี้ประกาศ map-major ก่อนแล้ว row-major ภายใน map: 3×3×3=27ค่า
```text
F1: 21 21 21 21 21 21 21 21 21
F2: 12 12 12  2  2  2 12 12 12
F3: 18  3 18 18  3 18 18  3 18
```
FC ใช้ z=b+Σwixi และ activation ตามงาน หน้า29วาด sigmoid หนึ่ง output แต่ไม่ได้ให้ FCweights/bias จึง **คำนวณ class จริงจาก maps อย่างเดียวไม่ได้** outputsigmoid เป็นค่าต่อเนื่องก่อน threshold ไม่ใช่0/1โดยตัวมันเอง; pipelinep.13ใช้ softmax อีกกรณี ไม่สลับนิยาม ตัวอย่างเสริม FC27inputs→1output มี27weights+1bias=28parameters;→2outputs มี56parameters

## RGB และหลาย Output Maps {#rgb}
S11 pp.31–33: RGB หนึ่ง pixel มี R/G/B สาม channels สำหรับหนึ่ง outputmap มี kernel ต่อ inputchannel คำนวณแล้ว **บวกตาม channels** และ bias หนึ่งค่า ไม่ใช่ได้สาม outputmaps อัตโนมัติ หน้า31 uses Rcross5,Gcross10,Bcross20; **F2=2F1,F3=3F1ของกากบาท** ต่างจาก F2/F3หน้า22

RGBkernel ตัวอย่าง:
Channel1 kernel:
```text
    -1      1     -1
     1      1      1
    -1      1     -1
```
Channel2 kernel:
```text
    -2      2     -2
     2      2      2
    -2      2     -2
```
Channel3 kernel:
```text
    -3      3     -3
     3      3      3
    -3      3     -3
```
ผล valid3×3ของ R/G/B ตามลำดับ (ผู้เขียนคำนวณเพิ่มจาก sourcearrays โดย stride1,padding0,bias0):
```text
    -3      5     -3
     5     21      5
    -3      5     -3
```
```text
   -16     20    -16
    20     92     20
   -16     20    -16
```
```text
   -54     60    -54
    60    288     60
   -54     60    -54
```
บวก channels เป็น output หนึ่ง map:
```text
   -73     85    -73
    85    401     85
   -73     85    -73
```

เช่นกลาง=21+92+288=401 ไม่ใช่ concat เป็น9channels หน้า32แสดง3outputmaps จาก RGB ใช้3sets×3inputkernels=9แผ่น2D; terminologylibrary มักเรียก3filters ขนาด Kh×Kw×3 บทนี้บอกทั้งสองแบบเพื่อไม่สับสน หน้า33ซ้อนจาก3inputchannels→5maps→10maps ชั้นถัดไปรับ depth5 ไม่กลับไปรับแค่ RGB3เสมอ

ตัวอย่างเสริม kernel3×3,RGB3→5maps มี3×3×3×5=135weights และ5bias รวม140;ชั้นต่อ5→10maps มี3×3×5×10+10=460parameters (ไม่เกี่ยวกับ H/W โดยตรงจาก weightsharing)

## Python: ตรวจทุก Matrix {#python}
ตัวอย่างผู้เขียนไม่ใช้ framework และไม่ train โมเดล โค้ดตรวจด้วย SciPycorrelation อิสระใน offlineauthorcheck ไม่มี dependency ใหม่บนเว็บ

```python
def xcorr(image,kernel,stride=1,padding=0):
    h,w=len(image),len(image[0]) if image else 0
    kh,kw=len(kernel),len(kernel[0]) if kernel else 0
    if not h or not w or not kh or not kw or stride < 1 or padding < 0:
        raise ValueError('Nonempty arrays, stride>=1 and padding>=0 required')
    if any(len(r)!=w for r in image) or any(len(r)!=kw for r in kernel):
        raise ValueError('Rectangular arrays required')
    oh,ow=(h+2*padding-kh)//stride+1,(w+2*padding-kw)//stride+1
    if min(oh,ow)<=0:
        raise ValueError('Kernel does not fit')
    a=[[0]*(w+2*padding) for _ in range(h+2*padding)]
    for i in range(h):
        for j in range(w):a[i+padding][j+padding]=image[i][j]
    return [[sum(a[i*stride+r][j*stride+c]*kernel[r][c] for r in range(kh) for c in range(kw))
             for j in range(ow)] for i in range(oh)]


def pool(image,size=2,stride=2,mode='max'):
    if size<1 or stride<1 or mode not in ('max','average'):
        raise ValueError('Invalid pooling settings')
    h,w=len(image),len(image[0])
    if min(h,w)<size or any(len(r)!=w for r in image):raise ValueError('Invalid pooling input')
    result=[]
    for i in range(0,h-size+1,stride):
        row=[]
        for j in range(0,w-size+1,stride):
            vals=[image[i+r][j+c] for r in range(size) for c in range(size)]
            row.append(max(vals) if mode=='max' else sum(vals)/len(vals))
        result.append(row)
    return result


def relu(image):return [[max(0,v) for v in row] for row in image]


def cross(value):
    return [[value if i==2 or j==2 else 1 for j in range(5)] for i in range(5)]


image=cross(5)
kernels=[ [[-1,1,-1],[1,1,1],[-1,1,-1]],
          [[-2,2,-2],[-2,2,-2],[-2,2,-2]],
          [[-3,-3,-3],[3,3,3],[-3,-3,-3]] ]
valid=[xcorr(image,k) for k in kernels]
padded=[xcorr(image,k,padding=1) for k in kernels]
pooled=[pool(a,3,1) for a in padded]
activated=[relu(a) for a in pooled]
flat=[v for a in activated for row in a for v in row] # map-major, then row-major
pool_example=[[0,2,1,3],[5,6,8,7],[1,2,3,1],[2,3,4,2]]
# p31 kernels DIFFER from p22's second/third kernels
rgb=[cross(5),cross(10),cross(20)]
rgb_kernels=[[[scale*v for v in row] for row in kernels[0]] for scale in [1,2,3]]
rgb_maps=[xcorr(a,k) for a,k in zip(rgb,rgb_kernels)]
rgb_output=[[sum(a[i][j] for a in rgb_maps) for j in range(3)] for i in range(3)]
for name,values in [('valid',valid),('padding',padded),('pooling',pooled),('RGB maps',rgb_maps),('RGB sum',rgb_output)]:
    print(name,values)
print('flat',flat)
print('pool example',pool(pool_example),pool(pool_example,mode='average'))
```

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
สลับ row/column;กลับ kernel โดยไม่บอก;จำ caption312ทั้งที่ sum228;นำ F2/F3หน้า22ไปใช้ RGB หน้า31;ลืม floor/padding;pool ทั้งภาพแทน window;บวก channels ผิดเป็น concat;flatten แล้วทำค่าหาย;แต่ง FCprediction เมื่อไม่มี weights

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 อ่านภาพและ shape
กากบาท source เป็น5×5 ถ้า RGB มีกี่ค่าก่อน convolution? ทำไมเลข5ไม่ใช่มาตรฐานสีฟ้า?

**เฉลย:** 5×5×3=75scalarvalues ค่า5เป็น encoding สมมติในภาพ grayscale ตัวอย่าง ไม่ได้กำหนด RGB จริงทุกภาพ

### ข้อ2 ตรวจหน้า16
หาผลช่องแรกแบบไม่กลับ kernel และอธิบาย312

**เฉลย:** เก้าพจน์[9,40,63,12,30,40,9,14,11]รวม228ตรงช่องภาพ Caption312ไม่ตรง sum ที่พิมพ์;312จะได้เมื่อกลับ kernel180°ซึ่งเป็นคนละการคำนวณ ต้องระบุ convention ก่อนตอบ

### ข้อ3 กากบาท F1
คำนวณ outputvalid กลางและซ้ายบน

**เฉลย:** กลาง=−1+5−1+5+5+5−1+5−1=21;ซ้ายบน=−1+1−5+1+1+5−5+5−5=−3 ทั้งคู่ stride1padding0

### ข้อ4 Outputsize
input7×7,k3,stride2,padding1ได้เท่าใด? ถ้ามี4filters จาก RGB มี shape และ parameters เท่าใด?

**เฉลย:** floor((7+2−3)/2)+1=4 ทั้งสองมิติ →4×4×4output;weights3×3×3×4=108+bias4=112 ไม่ใช่4×4กำหนดจำนวน weights เพราะแชร์ kernel

### ข้อ5 Pooling
จาก p.25หา top-rightmax และ average และ outputshape

**เฉลย:** patch[1,3;8,7],max8,average19/4=4.75(สไลด์ปัด4.8);4×4,size2,stride2→2×2ไม่ใช่3×3

### ข้อ6 ReLU/Flatten/FC
หลัง pooling ใน source มี3maps ขนาด3×3 ReLU เปลี่ยนอะไร? Flatten ยาวเท่าใดและ FC1output มีกี่ parameters?

**เฉลย:** maps ทุกค่า>0จึงคงเดิม;flatten27,FC27weights+bias1=28 ยังหา class ไม่ได้เพราะ source ไม่แจก weights/bias

### ข้อ7 RGB ตรงกลาง
ใช้ channelkernels หน้า31คำนวณผล sum กลาง

**เฉลย:** R=21,G=2(46)=92,B=3(96)=288 รวม401เป็นหนึ่ง map ไม่ใช้ vertical/horizontalkernels หน้า22 และไม่รวม bias ที่ไม่ได้กำหนด

### ข้อ8 Stacking และ average/ReLU
ชั้น3→5→10maps ใช้3×3kernel ทุกชั้นมี parameters รวมเท่าใด? ReLU ก่อน/หลัง average ให้ผลเหมือนเสมอหรือไม่?

**เฉลย:** ชั้นแรก140,ชั้นต่อ460 รวม600เมื่อมี bias ทุก output ข้อหลังไม่เสมอ ตัวอย่างเสริม[-2,2] average ก่อน ReLU=0 แต่ ReLU ก่อน average=(0+2)/2=1 จึงต้องประกาศ order ตาม source

## สรุปเตรียม FINAL {#summary}
อ่าน H/W/channels → ประกาศ correlation/stride/padding → คูณ sum ทุก patch → pool ตาม window → ReLU ตาม order → flatten → FC ตาม weights ที่มี source5×5→paddedconv5×5×3→pool3×3×3→vector27;RGB รวม inputchannels ต่อ outputmap อย่าจำ sourcecaption ที่ขัดกับ sum

## แหล่งอ้างอิง {#sources}
- [บัญชี S11](../../../docs/ai-source-coverage.md): original local-only
- S11 `Final/Intro_DeepLearning_Slides.pdf` pp.12–13CNN/pipeline;14–18images/kernels/gradient;19–23layers/convolution/padding;24–26pooling;27–30ReLU/flatten/FC;31–33RGB/maps/stacking
- เครดิตใน source:ภาพรวม CNN จาก TusharKute/mituSkillologies; worked กากบาทจากโปรแกรมเมอร์ไทย/เพจ programmerthai;operator/ตัวอย่าง pooling จากสไลด์ที่มี FacultyITKMITLcredit ไม่คัดลอกภาพ original มาเผยแพร่
- [Coverage และ numericchecks](../../../docs/ai-final-cnn-coverage.md)
