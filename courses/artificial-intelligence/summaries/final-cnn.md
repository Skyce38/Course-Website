---
{"version":1,"id":"artificial-intelligence-final-cnn","course":"artificial-intelligence","category":"summaries","slug":"final-cnn","title":"FINAL: CNN และการคำนวณภาพ (Image Operations)","language":"th"}
---

> S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.12–33 ตรวจภาพและตัวเลขโดยตรง บทนี้ FINAL ใช้ cross-correlation convention สำหรับ CNN พร้อมชี้ความต่างกับ convolution เฉลย/ตัวอย่างเสริมเป็นงานผู้เขียน ไม่ใช่ official answer key ลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- อ่านภาพเป็นarrays/channelsและติดตามshapeทุกชั้น
- คำนวณkernel,featuremap,stride,padding,poolingและReLU
- แยกcross-correlation/convolutionและผลของการกลับkernel
- คำนวณRGB channel sums,flatten,FC parametersและoutputsize
- ตรวจข้อผิดพลาดตัวเลขในsourceโดยไม่จำค่าที่ขัดกับสูตร

## ภาพ, Pixels และ CNN {#images}
S11 pp.12–14 ยกCNNสำหรับข้อมูลเชิงพื้นที่ (spatialdata) เช่นภาพ/วิดีโอ ใช้filtersดึงfeatures แล้วส่งต่อclassifier ภาพกากบาท5×5เป็นตัวแทนเชิงตัวเลข:ช่องกากบาทกำหนด5และที่เหลือ1 เป็น **encodingสมมติ** ไม่ใช่มาตรฐานว่าสีฟ้าทุกภาพมีpixel5 ภาพgrayscaleเป็นH×W; RGBมี3channelsซึ่งแต่ละpixelเก็บสามค่า

ภาพpipelinep.13แสดงconvolution/ReLU/poolingหลายครั้งแล้วflatten/FC/softmax ส่วนworkedexamplepp.19–30ใช้convolution→pooling→ReLU→FC ต้องตามลำดับของตัวอย่าง ไม่สรุปว่าCNNทุกแบบมีlayerorderเดียวกัน หน้าเว็บไม่trainโมเดลหรือแสดงaccuracyที่แต่งขึ้น

## Kernel และ convention {#kernel}
S11 pp.15–18,21–22 ใช้kernel/filterเลื่อนไปคูณตำแหน่งตรงกันแล้วรวม (dotproduct) เรียกconvolutionตามการใช้ชื่อในCNN แต่การคำนวณแบบ **ไม่กลับkernel** นี้คือcross-correlation บทนี้ใช้bias0,dilation1และสูตร

$$
Y_{ij}=\sum_{u=0}^{K_h-1}\sum_{v=0}^{K_w-1}X_{is+u-p,js+v-p}K_{uv}
$$

นอกขอบเป็น0เมื่อpadding; convolutionเชิงคณิตศาสตร์กลับkernel180°ก่อนคูณ sourcefiltersกากบาทบางตัวสมมาตรจึงให้ผลเท่ากัน แต่ไม่ใช่ทุกkernel

### ตรวจความไม่สอดคล้องหน้า16
Input4×4และkernelที่แสดง (แถวบนลงล่าง):
```text
X:                 K:
1  5  9 13         9 8 7
2  6 10 14         6 5 4
3  7 11 15         3 2 1
4  8 12 16
```
ช่องแรกแบบไม่กลับkernel: 1×9+5×8+9×7+2×6+6×5+10×4+3×3+7×2+11×1 =9+40+63+12+30+40+9+14+11=**228** ตรงตัวเลขในช่องภาพ แต่captionเริ่มด้วย312ทั้งที่แสดงsumข้างต้น จึงไม่ใช้312เป็นผลsumนี้ ถ้ากลับkernelเป็น1..9จริงจะได้312 (คนละconvention)

Outputvalidstride1ทั้งแผ่นของcross-correlation:
```text
   228    408
   273    453
```

pp.17–18 แสดงedge/gradientfiltersเช่นแถว[1,0,−1]ซ้ำสามแถว และtransposeที่ดูการเปลี่ยนอีกทิศ การกลับkernelเปลี่ยนเครื่องหมายของresponse จึงต้องบอกconvention ไม่เดาค่าpixelของภาพตัวอย่างที่ไม่ได้ให้array

## Source กากบาท: Input และสาม Filters {#source-matrices}
S11 pp.14–15,21–22: Xต่อไปนี้และF1,F2,F3ตามลำดับ **ไม่ใช่** filtersRGBหน้า31
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

F1ช่องซ้ายบน: −1×1+1×1−1×5+1×1+1×1+1×5−1×5+1×5−1×5=−3; ช่องกลางใช้patch[1,5,1;5,5,5;1,5,1] ได้−1+5−1+5+5+5−1+5−1=21

### Valid convolution/correlation: stride1,padding0
ขนาด(5−3)/1+1=3 จึงได้3×3ต่อfilter ผลทุกช่องตามp.21–22:
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
S11 p.23เติมzero1ชั้นรอบ5×5เป็น7×7 แล้วใช้kernel3×3ทำให้output5×5เมื่อstride1 การpaddingไม่ได้รับรองshapeเท่าเดิมสำหรับทุกkernel/strideโดยไม่คำนวณ สูตรเสริมกรณีdilation1และpaddingสมมาตร:

$$
H_{out}=\left\lfloor\frac{H+2p-K_h}{s}\right\rfloor+1,\quad W_{out}=\left\lfloor\frac{W+2p-K_w}{s}\right\rfloor+1
$$

sคือระยะเลื่อน ไม่ใช่ขนาดkernel ตัวอย่าง5×5,k3,p0,s2ได้2×2; p1,s1ได้5×5; p1,s2ได้3×3 ใช้floorเมื่อเลื่อนไม่ลงตัว และตรวจkernelfitก่อน ไม่มีdilation>1ในworkedexampleนี้

ผลpadding1ของทั้งสามfiltersตรงp.23และ26:
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

ช่องบนซ้ายF1ใช้patch[0,0,0;0,1,1;0,1,1] จึง0+0+0+0+1+1+0+1−1=2 ไม่มีการสร้างpixelจริงใหม่ที่ขอบ

## Max/Average Pooling {#pooling}
S11 pp.24–26 ใช้หน้าต่างเลือกค่าสูงสุดเพื่อลดspatialsize ไม่เรียนweightsในpoolingมาตรฐาน ต้องระบุsize/strideและpaddingแยกจากconvolution

p.25ให้input4×4,size2,stride2:
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

Top-leftavg=(0+2+5+6)/4=3.25;top-right=(1+3+8+7)/4=4.75 สไลด์แสดง3.3/4.8เมื่อปัดหนึ่งตำแหน่ง ไม่ใช่ค่าก่อนปัด Python roundอาจใช้tie-to-evenจึงอย่าใช้รูปปัดเทียบเป็นerrorของสูตร

สำหรับp.24,26 ใช้paddedmaps5×5,size3,stride1(noadditionalpadding) →3×3ทุกmap ผลทุกช่อง:
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

F1ทุกwindowมี21จึงทั้งหมด21;F2แถวบน/ล่างมี12แต่แถวกลางmax2;F3ซ้าย/ขวามี18แต่ตรงกลางmax3 ไม่ใช่ใช้maximumทั้งภาพครั้งเดียวแทนแต่ละwindow

## ReLU, Flatten และ Fully Connected {#relu-fc}
S11 pp.27–30: ReLU(x)=max(0,x) ทำทีละค่า ไม่เปลี่ยนshape ตัวอย่างp.27:
```text
ก่อน:          หลัง:
-1 -2 -3       0 0 0
 1  2  3       1 2 3
-1 -2 -3       0 0 0
```
p.28 pooledmapsข้างบนทุกค่าเป็นบวกจึงไม่เปลี่ยน แต่ถ้าReLUก่อนpooling/averageอาจต่างได้ ต้องตามorderที่ประกาศ

p.29 Flattenเรียงfeaturesเป็นvector ไม่มีweightsและไม่คำนวณค่าใหม่ บทนี้ประกาศmap-majorก่อนแล้วrow-majorภายในmap: 3×3×3=27ค่า
```text
F1: 21 21 21 21 21 21 21 21 21
F2: 12 12 12  2  2  2 12 12 12
F3: 18  3 18 18  3 18 18  3 18
```
FCใช้z=b+Σwixiและactivationตามงาน หน้า29วาดsigmoidหนึ่งoutputแต่ไม่ได้ให้FCweights/bias จึง **คำนวณclassจริงจากmapsอย่างเดียวไม่ได้** outputsigmoidเป็นค่าต่อเนื่องก่อนthreshold ไม่ใช่0/1โดยตัวมันเอง; pipelinep.13ใช้softmaxอีกกรณี ไม่สลับนิยาม ตัวอย่างเสริมFC27inputs→1outputมี27weights+1bias=28parameters;→2outputsมี56parameters

## RGB และหลาย Output Maps {#rgb}
S11 pp.31–33: RGBหนึ่งpixelมีR/G/B สามchannels สำหรับหนึ่งoutputmapมีkernelต่อinputchannel คำนวณแล้ว **บวกตามchannels** และbiasหนึ่งค่า ไม่ใช่ได้สามoutputmapsอัตโนมัติ หน้า31 uses Rcross5,Gcross10,Bcross20; **F2=2F1,F3=3F1ของกากบาท** ต่างจากF2/F3หน้า22

RGBkernelตัวอย่าง:
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
ผลvalid3×3ของR/G/Bตามลำดับ (ผู้เขียนคำนวณเพิ่มจากsourcearrays โดยstride1,padding0,bias0):
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
บวกchannelsเป็นoutputหนึ่งmap:
```text
   -73     85    -73
    85    401     85
   -73     85    -73
```

เช่นกลาง=21+92+288=401 ไม่ใช่concatเป็น9channels หน้า32แสดง3outputmapsจากRGB ใช้3sets×3inputkernels=9แผ่น2D; terminologylibraryมักเรียก3filtersขนาดKh×Kw×3 บทนี้บอกทั้งสองแบบเพื่อไม่สับสน หน้า33ซ้อนจาก3inputchannels→5maps→10maps ชั้นถัดไปรับdepth5 ไม่กลับไปรับแค่RGB3เสมอ

ตัวอย่างเสริมkernel3×3,RGB3→5mapsมี3×3×3×5=135weights และ5biasรวม140;ชั้นต่อ5→10mapsมี3×3×5×10+10=460parameters (ไม่เกี่ยวกับH/Wโดยตรงจากweightsharing)

## Python: ตรวจทุก Matrix {#python}
ตัวอย่างผู้เขียนไม่ใช้frameworkและไม่trainโมเดล โค้ดตรวจด้วยSciPycorrelationอิสระในofflineauthorcheck ไม่มีdependencyใหม่บนเว็บ

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
สลับrow/column;กลับkernelโดยไม่บอก;จำcaption312ทั้งที่sum228;นำF2/F3หน้า22ไปใช้RGBหน้า31;ลืมfloor/padding;poolทั้งภาพแทนwindow;บวกchannelsผิดเป็นconcat;flattenแล้วทำค่าหาย;แต่งFCpredictionเมื่อไม่มีweights

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 อ่านภาพและshape
กากบาทsourceเป็น5×5 ถ้าRGBมีกี่ค่าก่อนconvolution? ทำไมเลข5ไม่ใช่มาตรฐานสีฟ้า?

**เฉลย:** 5×5×3=75scalarvalues ค่า5เป็นencodingสมมติในภาพgrayscaleตัวอย่าง ไม่ได้กำหนดRGBจริงทุกภาพ

### ข้อ2 ตรวจหน้า16
หาผลช่องแรกแบบไม่กลับkernel และอธิบาย312

**เฉลย:** เก้าพจน์[9,40,63,12,30,40,9,14,11]รวม228ตรงช่องภาพ Caption312ไม่ตรงsumที่พิมพ์;312จะได้เมื่อกลับkernel180°ซึ่งเป็นคนละการคำนวณ ต้องระบุconventionก่อนตอบ

### ข้อ3 กากบาทF1
คำนวณoutputvalidกลางและซ้ายบน

**เฉลย:** กลาง=−1+5−1+5+5+5−1+5−1=21;ซ้ายบน=−1+1−5+1+1+5−5+5−5=−3 ทั้งคู่stride1padding0

### ข้อ4 Outputsize
input7×7,k3,stride2,padding1ได้เท่าใด? ถ้ามี4filtersจากRGBมีshapeและparametersเท่าใด?

**เฉลย:** floor((7+2−3)/2)+1=4 ทั้งสองมิติ →4×4×4output;weights3×3×3×4=108+bias4=112 ไม่ใช่4×4กำหนดจำนวนweightsเพราะแชร์kernel

### ข้อ5 Pooling
จากp.25หาtop-rightmaxและaverage และoutputshape

**เฉลย:** patch[1,3;8,7],max8,average19/4=4.75(สไลด์ปัด4.8);4×4,size2,stride2→2×2ไม่ใช่3×3

### ข้อ6 ReLU/Flatten/FC
หลังpoolingในsourceมี3mapsขนาด3×3 ReLUเปลี่ยนอะไร? Flattenยาวเท่าใดและFC1outputมีกี่parameters?

**เฉลย:** mapsทุกค่า>0จึงคงเดิม;flatten27,FC27weights+bias1=28 ยังหาclassไม่ได้เพราะsourceไม่แจกweights/bias

### ข้อ7 RGBตรงกลาง
ใช้channelkernelsหน้า31คำนวณผลsumกลาง

**เฉลย:** R=21,G=2(46)=92,B=3(96)=288 รวม401เป็นหนึ่งmap ไม่ใช้vertical/horizontalkernelsหน้า22 และไม่รวมbiasที่ไม่ได้กำหนด

### ข้อ8 Stackingและaverage/ReLU
ชั้น3→5→10maps ใช้3×3kernelทุกชั้นมีparametersรวมเท่าใด? ReLUก่อน/หลังaverageให้ผลเหมือนเสมอหรือไม่?

**เฉลย:** ชั้นแรก140,ชั้นต่อ460 รวม600เมื่อมีbiasทุกoutput ข้อหลังไม่เสมอ ตัวอย่างเสริม[-2,2] averageก่อนReLU=0 แต่ReLUก่อนaverage=(0+2)/2=1 จึงต้องประกาศorderตามsource

## สรุปเตรียม FINAL {#summary}
อ่านH/W/channels → ประกาศcorrelation/stride/padding → คูณsumทุกpatch → poolตามwindow → ReLUตามorder → flatten → FCตามweightsที่มี source5×5→paddedconv5×5×3→pool3×3×3→vector27;RGBรวมinputchannelsต่อoutputmap อย่าจำsourcecaptionที่ขัดกับsum

## แหล่งอ้างอิง {#sources}
- [บัญชี S11](../../../docs/ai-source-coverage.md): original local-only
- S11 `Final/Intro_DeepLearning_Slides.pdf` pp.12–13CNN/pipeline;14–18images/kernels/gradient;19–23layers/convolution/padding;24–26pooling;27–30ReLU/flatten/FC;31–33RGB/maps/stacking
- เครดิตในsource:ภาพรวมCNNจากTusharKute/mituSkillologies; workedกากบาทจากโปรแกรมเมอร์ไทย/โปรแกรมmerthai;operator/ตัวอย่างpoolingจากสไลด์ที่มีFacultyITKMITLcredit ไม่คัดลอกภาพoriginalมาเผยแพร่
- [Coverageและnumericchecks](../../../docs/ai-final-cnn-coverage.md)
