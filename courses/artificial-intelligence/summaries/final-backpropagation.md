---
{"version":1,"id":"artificial-intelligence-final-backpropagation","course":"artificial-intelligence","category":"summaries","slug":"final-backpropagation","title":"FINAL: Multilayer Networks และ Backpropagation","language":"th"}
---

> S10 `Final/ANN.pdf` physical pp.19–24 และ S11 `Final/Intro_DeepLearning_Slides.pdf` pp.2–5 สูตรและภาพตรวจโดยตรง ตัวอย่าง gradient เชิงตัวเลข/แบบฝึกเป็นงานผู้เขียน ไม่ใช่เฉลยอาจารย์ บทนี้เป็น FINAL ในลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- อธิบายเหตุผลที่ต้องมี hidden layer และ nonlinear activation
- คำนวณ feedforward, sigmoid derivative, loss และ backpropagation
- แยก gradient sign ออกจาก error delta พร้อมปรับ bias/weights ในลำดับถูกต้อง
- ตรวจผลด้วย finite differences และรู้ข้อจำกัดของการลด loss หนึ่งก้าว

## Single Layer สู่ Multilayer {#networks}
S10 pp.19–21 ต่อจากข้อจำกัด XOR: perceptron เดียวสร้าง linear decision surface เครือข่ายหลายชั้นรวมขอบเขตได้ซับซ้อนขึ้น S11 pp.2–5 แสดง weighted sum, nonlinear activation และ hidden layers ถ้าทุกชั้นเป็น affine map โดยไม่มี nonlinearity การซ้อนยังยุบเป็น affine map เดียว จึงไม่แก้ XOR ด้วยการเพิ่มชั้นเชิงเส้นอย่างเดียว

### XOR ตาม weights ใน S10 p.20
ภาพใช้ binary threshold ไม่ใช่ sigmoid: hiddenตัวบน weights(1,1),bias−.5 ทำ OR; ตัวล่าง weights(1,1),bias−1.5 ทำ AND; output weights(1,−2),bias−.5 บทนี้กำหนด >0 (ไม่มีกรณีเท่าศูนย์สำหรับสี่ inputs นี้)

| x1,x2 | z OR → h1 | z AND → h2 | z output → y |
|---|---|---|---|
| 0,0 | −.5 → 0 | −1.5 → 0 | −.5 → 0 |
| 0,1 | .5 → 1 | −.5 → 0 | .5 → 1 |
| 1,0 | .5 → 1 | −.5 → 0 | .5 → 1 |
| 1,1 | 1.5 → 1 | .5 → 1 | −1.5 → 0 |

นี่เป็นการตรวจ network ที่กำหนดแล้ว ไม่ใช่ผล train ด้วย backpropagation Threshold ไม่ differentiable ที่0 และอนุพันธ์0เกือบทุกจุด จึงใช้ smooth sigmoid ในบทเรียน gradient ถัดไป ห้ามแทน threshold ด้วย sigmoidโดยใช้weightsเดิมแล้วอ้าง output XOR เหมือนกัน

## Sigmoid และอนุพันธ์ {#sigmoid}
S10 pp.21–22 นิยาม

$$
\sigma(z)=\frac{1}{1+e^{-z}},\qquad \sigma'(z)=\sigma(z)(1-\sigma(z))
$$

ที่z0ได้.5และอนุพันธ์.25; เมื่อ|z|มาก outputอิ่มตัว (saturation) ทำให้ gradientเล็ก นี่เป็นข้ออธิบายเพิ่มเติม ไม่ใช่การรับรองว่า sigmoid output คือ calibrated probability โดยอัตโนมัติ

## Loss, Sign และ Backpropagation {#backprop}
S10 p.23 ใช้ squared error รวมข้อมูล/outputs พร้อมตัวคูณ1/2; ตัวอย่างนี้ใช้หนึ่งsample/หนึ่งoutput จึง

$$
L=\frac12(y-t)^2,\quad g_o=\frac{\partial L}{\partial z_o}=(y-t)y(1-y)
$$

hidden h_j=σ(z_j), z_o=b_o+Σv_jh_j และ z_j=b_j+Σa_jix_i ใช้ chain rule

$$
g_j=h_j(1-h_j)v_jg_o,\quad \frac{\partial L}{\partial v_j}=g_oh_j,\quad \frac{\partial L}{\partial a_{ji}}=g_jx_i,\quad \frac{\partial L}{\partial b_o}=g_o,\quad \frac{\partial L}{\partial b_j}=g_j
$$

Gradient descent: θnew=θold−η∂L/∂θ สำหรับทุกparameterพร้อมกัน S10 p.24 ใช้ δ_o=(t−y)y(1−y)=−g_o และ update **บวก** ηδx จึงทิศเดียวกัน ไม่ใช่สูตรขัดกัน ต้องคำนวณ hidden error จาก output weights **เก่า** เก็บ gradients ทั้งหมดแล้วจึง update; biasใช้inputคงที่1 ส่วน lossรวม/เฉลี่ยbatchต่างกันด้วยscale ต้องประกาศก่อนเทียบlearning rate

## คำนวณหนึ่งก้าวทีละขั้น: ตัวอย่างผู้เขียน {#worked}
ไม่ใช่ weights XOR ด้านบน ใช้ inputs(1,.5),target.8,η.2, sigmoidทุกhidden/output, ไม่มีregularization:
- hidden1 a11=.1,a12=.2,b1=.1 → z1=.1(1)+.2(.5)+.1=.3 → h1=.574442517
- hidden2 a21=−.3,a22=.4,b2=−.2 → z2=−.3(1)+.4(.5)−.2=−.3 → h2=.425557483
- v1=.7,v2=−.5,bo=.1 → zo=.7h1−.5h2+.1=.289331020 → y=.571832348
- residual y−t=−.228167652; L=.5(−.228167652)²=.026030239
- go=(y−t)y(1−y)=−.055864594
- g1=h1(1−h1)(.7)go=−.009559595; g2=h2(1−h2)(−.5)go=.006828282

| Parameter | ค่าเก่า | Gradient | ค่าใหม่ θ−.2g |
|---|---:|---:|---:|
| a11 | 0.1 | -0.009559595 | 0.101911919 |
| a12 | 0.2 | -0.004779798 | 0.200955960 |
| b1 | 0.1 | -0.009559595 | 0.101911919 |
| a21 | -0.3 | 0.006828282 | -0.301365656 |
| a22 | 0.4 | 0.003414141 | 0.399317172 |
| b2 | -0.2 | 0.006828282 | -0.201365656 |
| v1 | 0.7 | -0.032090998 | 0.706418200 |
| v2 | -0.5 | -0.023773596 | -0.495245281 |
| bo | 0.1 | -0.055864594 | 0.111172919 |

Feedforward อีกครั้งด้วย **ทุกค่าใหม่** ได้ L=.025035809 ลดลงในตัวอย่างนี้ ไม่อ้างว่า learning rateใดก็ลด lossหรือหา global minimumได้ S10 p.23 เตือน local minima; neural lossไม่เป็นconvexโดยทั่วไปและgradientเล็กอาจเป็นsaddle/plateauได้ด้วย

## Python และการตรวจอิสระ {#python}
โค้ดตัวอย่างไม่trainตัวเองในหน้าเว็บ ตัวตรวจออฟไลน์เปรียบเทียบ central finite differences [L(θ+ε)−L(θ−ε)]/(2ε), ε=10⁻⁶ กับgradientทุก9parameters; finite differenceเป็นเครื่องมือเช็ค ไม่แทนbackpropในการtrainจริง

```python
from math import exp


def sigmoid(z):
    # Stable on large positive/negative values
    return 1 / (1 + exp(-z)) if z >= 0 else exp(z) / (1 + exp(z))


def forward_and_gradient(theta, x, target):
    # theta: a11,a12,b1,a21,a22,b2,v1,v2,bo (all independent biases)
    a11,a12,b1,a21,a22,b2,v1,v2,bo = theta
    z1 = a11*x[0] + a12*x[1] + b1
    z2 = a21*x[0] + a22*x[1] + b2
    h1,h2 = sigmoid(z1),sigmoid(z2)
    zo = v1*h1 + v2*h2 + bo
    output = sigmoid(zo)
    loss = .5*(output-target)**2
    # g = dL/dz, NOT the source's delta = -dL/dz
    go = (output-target)*output*(1-output)
    g1 = h1*(1-h1)*v1*go
    g2 = h2*(1-h2)*v2*go
    gradient = [g1*x[0],g1*x[1],g1,g2*x[0],g2*x[1],g2,go*h1,go*h2,go]
    return (z1,z2,h1,h2,zo,output,loss), gradient


def step(theta,x,target,rate):
    if rate <= 0:
        raise ValueError('Positive learning rate required')
    values,gradient = forward_and_gradient(theta,x,target)
    # All gradients use OLD theta, then update simultaneously
    return values,gradient,[w-rate*g for w,g in zip(theta,gradient)]


theta = [.1,.2,.1,-.3,.4,-.2,.7,-.5,.1]
x,target,rate = (1,.5),.8,.2
values,gradient,updated = step(theta,x,target,rate)
print('z1,z2,h1,h2,zo,output,loss:',values)
print('gradient:',gradient)
print('updated:',updated)
print('new loss:',forward_and_gradient(updated,x,target)[0][-1])


def source_xor(x1,x2):
    h_or = int(x1+x2-.5 > 0)
    h_and = int(x1+x2-1.5 > 0)
    out = int(h_or-2*h_and-.5 > 0)
    return h_or,h_and,out


for xx in [(0,0),(0,1),(1,0),(1,1)]:
    print(xx,source_xor(*xx))
```

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
- ผสมδ=(t−y)กับupdateลบจนกลับทิศ หรือใช้ MSE lossแต่ขาดตัวคูณที่นิยามไว้
- ลืม sigmoid derivative หรือ bias; ใช้outputweightใหม่หาhiddenerror
- คิดว่า hidden targetต้องมี labelแยก: errorส่งผ่าน chain ruleได้
- อ้าง XORthreshold network เป็นผลtrain sigmoid หรือหยุดเมื่อsampleเดียวถูก
- สรุปgradient descentรับประกัน global optimum

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 Source XOR
คำนวณ x=(1,1) จาก S10 p.20

**เฉลย:** z1=1.5→h1=1,z2=.5→h2=1,zo=1−2−.5=−1.5→0 ถูกXOR ไม่ได้ใช้sigmoid

### ข้อ2 Sigmoid
หาค่าσ(0),σ′(0) และLเมื่อy=.5,t1

**เฉลย:** .5,.25; L=.5(.5−1)²=.125 ไม่ใช่.25เพราะนิยามมี1/2

### ข้อ3 Output Error
ถ้า y=.5,t1,h=.4,v=.8 ให้หาgoและgradientของv

**เฉลย:** go=(.5−1)(.5)(.5)=−.125; ∂L/∂v=−.125(.4)=−.05 ถ้าη.1 vnew=.8−.1(−.05)=.805

### ข้อ4 Hidden Error
ใช้ค่าในข้อ3 หาgh, gradientของweight inputx2 และbias

**เฉลย:** gh=.4(.6)(.8)(−.125)=−.024; gradientweight=gh(2)=−.048; gradientbias=−.024 ทั้งหมดใช้vเก่า.8 ไม่ใช้.805

### ข้อ5 Sign Convention
ถ้าsourceδ=.125 และinput.4,η.1 จะ updateเท่าใด? ตรงกับgradientหรือไม่?

**เฉลย:** Δw=+.1(.125)(.4)=+.005 ตรงกับลบgradient−.05ด้วยη.1 แต่ถ้าเขียนw−ηδxจะผิดทิศ

### ข้อ6 ตรวจครบหนึ่งก้าว
จากworkedexampleให้บอกoutputbiasใหม่,lossใหม่ และเหตุใดไม่updatevก่อนหาhiddenerror

**เฉลย:** bo=.1−.2(−.055864594)=.111172919; feedforwardใหม่ได้L=.025035809 หากใช้vใหม่จะไม่ใช่gradientของlossที่θเดิม ทำให้ finite-difference checkไม่ตรง ค่าที่แสดงปัด9ตำแหน่งแต่โค้ดใช้floatเต็ม

## สรุปเตรียม FINAL {#summary}
Forwardจากweightsเก่า → กำหนดloss → outputgradient → hiddengradientจากweightsเก่า → เก็บทุกgradient → updateweightsและbiasพร้อมกัน → ตรวจlossใหม่ Backpropคือchain rule; optimizerคือวิธีนำgradientไปupdate สองขั้นนี้ไม่ใช่คำเดียวกัน

## แหล่งอ้างอิง {#sources}
- [บัญชี S10/S11](../../../docs/ai-source-coverage.md), original local-only
- S10 `Final/ANN.pdf` pp.19–20 multilayer/XOR,21–22sigmoid,23loss,24backpropalgorithm
- S11 `Final/Intro_DeepLearning_Slides.pdf` pp.2–5 weightedneurons/nonlinearity/shallow/deep
- [Coverage และการตรวจ](../../../docs/ai-final-backpropagation-coverage.md)
