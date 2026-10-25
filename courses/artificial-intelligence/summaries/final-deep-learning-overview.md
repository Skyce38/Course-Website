---
{"version":1,"id":"artificial-intelligence-final-deep-learning-overview","course":"artificial-intelligence","category":"summaries","slug":"final-deep-learning-overview","title":"FINAL: ภาพรวม Deep Learning, RNN และ GAN","language":"th"}
---

> S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.2–11 ตรวจภาพโดยตรง บทนี้เป็นภาพรวม FINAL ไม่ใช่คู่มือ train RNN/GAN หรือ Transformer เฉลย/ตัวอย่างการเลือกสถาปัตยกรรมที่ระบุว่าเสริมเป็นงานผู้เขียน ไม่ใช่ official answer key ลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- จัดความสัมพันธ์ AI,ML,DL โดยไม่เหมารวมว่า AI ทุกชนิดต้องเรียนจากข้อมูล
- แยก shallow/deep และบทบาท nonlinearactivation
- อธิบาย sequence และรูปแบบ input/output ของ RNN
- แยก Generator/Discriminator และอ่านตัวอย่าง styletransfer อย่างระวัง
- เลือกตระกูล architecture ตามข้อมูลโดยไม่อ้างผล accuracy ที่ไม่มี source

## AI, ML และ DL {#hierarchy}
S11 p.6 วาง DL ภายใน ML ภายใน AI: AI เป็นขอบเขตกว้าง เช่นงาน reasoning/search; ML ใช้ข้อมูลเรียนรูปแบบ; DL ใช้ neuralnetworks หลายชั้นเพื่อเรียน representations ไม่ใช่ว่า AI=DL หรือการมีข้อมูลทำให้อัลกอริทึมเป็น DL ทันที DecisionTree/KNN ที่เรียนมาเป็น ML แต่ไม่ใช่ deepneuralnetwork บทนี้ไม่ขยาย Transformerinternals ซึ่งไม่อยู่ในหน้าที่กำหนด

## Neuron, Activation และความลึก {#depth}
pp.2–5 เริ่ม z=w0+Σwixi และ y=g(z) ถ้ามีแต่ linearmaps หลายชั้นจะยุบเป็น linearmap เดียว จึงใช้ nonlinearity สำหรับ boundary ซับซ้อน ภาพ p.3กลุ่มสีแดง/เขียวและ p.4เส้นแบ่งสาธิตความจำเป็น ไม่ใช่ dataset พร้อมพิกัดหรือผล accuracy

| Activation | รูป | ประเด็นการอ่านภาพ |
|---|---|---|
| Linear | g(z)=z | ไม่เพิ่มความไม่เชิงเส้นด้วยการซ้อนอย่างเดียว |
| Threshold | 1เมื่อเกินเกณฑ์ | ตัดสินใจไม่ต่อเนื่อง ไม่เหมาะ gradient มาตรฐาน |
| Sigmoid | 1/(1+exp(−z)) | output0..1,อิ่มตัวแล้ว gradient เล็ก |
| ReLU | max(0,z) | nonlinear,ศูนย์ด้านลบ;จุด0ต้องเลือกอนุพันธ์ย่อย |

S11 p.5 เรียกภาพซ้าย One-layer ซึ่งมี hiddenlayer หนึ่งชั้น ภาษาการนับชั้นต่างกันได้ จึงควรบอก **จำนวน hiddenlayers/weightedlayers** แทนตีความจากชื่ออย่างเดียว ภาพขวามี hidden หลายชั้น=deep; ไม่กำหนดตัวเลขสากลว่ากี่ชั้นเริ่ม deep และไม่แปลว่า deep ดีกว่าทุกงาน ต้องพิจารณาข้อมูล/ความจุ/overfitting/ทรัพยากร (ข้ออธิบายเสริม)

ตัวอย่างเสริมคำนวณ:สอง linearmaps z1=2x+1,z2=3z1−4 → z2=6x−1 ยังเป็นเส้นตรง เมื่อ x=2ได้11 การแทรก ReLU เปลี่ยนความเป็นเชิงเส้นทั่วทั้ง domain ไม่ใช่แค่เพิ่มพารามิเตอร์

## RNN และข้อมูลลำดับ {#rnn}
S11 p.7 กล่าวถึง RecurrentNeuralNetwork สำหรับ text,audio และข้อมูลตามเวลา; อันดับมีความหมาย ต่างจากการมองแต่ละแถวอิสระ state ส่งข้อมูลจากขั้นก่อนสู่ขั้นถัดไป แนวคิดเสริมแบบย่อคือ h_t=f(Wx_t+Uh_{t−1}+b) ใช้น้ำหนักร่วมตามเวลา ไม่ใช่สำเนา parameters ใหม่อิสระทุก t บทนี้ไม่กำหนด loss/training/truncation ที่สไลด์ไม่ได้ให้

S11 p.8 (ภาพที่อ้าง StanfordCS230) แยก configuration ตามความยาว input/output:

| Configuration | รูปข้อมูล | ตัวอย่างในภาพ |
|---|---|---|
| One-to-one | หนึ่ง input/หนึ่ง output | traditionalneuralnetwork ไม่ได้มี recurrence เสมอ |
| One-to-many | หนึ่ง input/หลาย output | musicgeneration |
| Many-to-one | ลำดับ input/หนึ่ง output | sentimentclassification |
| Many-to-many aligned | ความยาว input/output เท่ากัน | namedentityrecognition (NER) |
| Many-to-many unaligned | ความยาวต่างกันได้ | machinetranslation |

ตัวอย่างเสริม:คำไทย3token ถูกส่งเข้าแล้วได้ sentiment เดียวเป็น many-to-one; ถ้าติด NERlabel ทุก token เป็น alignedmany-to-many การแปลประโยค3token เป็น5token เป็น unaligned ไม่ใช่แค่ RNN ชนิดใดก็รองรับทุกงานโดยไม่ออกแบบเพิ่ม คำว่า one-to-many ในภาพเป็นรูปแบบ mapping ไม่ใช่ข้อกำหนดว่าเริ่มจาก scalar เท่านั้น

## GAN: Generator และ Discriminator {#gan}
S11 pp.9–10 อธิบาย GenerativeAdversarialNetwork เป็นกรอบ generativelearning เรียนโครงสร้างข้อมูลเพื่อสร้างตัวอย่างคล้าย distribution เดิม ภาพหน้า10:noise→Generator→ภาพสร้าง; ภาพจริงจาก dataset และภาพสร้างป้อน Discriminator ซึ่งแยก real/fake ระหว่าง train มีวัตถุประสงค์แข่งขันกัน Generator ต้องสร้างให้หลอกได้ดีขึ้น Discriminator ต้องแยกให้ดีขึ้น

คำว่า unsupervised ใน p.9หมายถึงไม่มี classlabels ของงานภายนอกเป็นตัวกำกับหลัก แต่ D ยังได้รับ real/fake สัญญาณที่สร้างจากแหล่งภาพ ไม่ใช่ไม่มี target ใดเลย Noise ไม่ใช่รูปจริง; D ไม่ได้วาดภาพ; G ไม่ได้เป็นตัวตัดสิน real/fake ผล realistic ไม่พิสูจน์ว่าไม่ได้จำ trainingimages หรือไม่มี bias ข้อควรระวังนี้เป็นคำอธิบายผู้เขียน

## ตัวอย่าง Style Transfer {#style}
S11 p.11แสดงกรอบ GAN และภาพ content/style/ผลลัพธ์ พร้อมอ้างบทความด้าน imagestyletransfer จึงใช้เป็นตัวอย่างการเปลี่ยนลักษณะภาพตาม style ไม่ถือเป็นหลักฐานว่า styletransfer ทุกวิธีต้องใช้ GAN ไม่สร้างขั้นตอน loss/weights/epochs จากภาพที่ไม่มีรายละเอียด และไม่คัดลอกภาพบุคคล/งานศิลป์ในสไลด์มาลงเว็บ

## เปรียบเทียบสถาปัตยกรรม {#comparison}
| ตระกูล | โครงสร้างเด่น | ข้อมูล/เป้าหมาย | ไม่ควรสรุป |
|---|---|---|---|
| MLP/feedforward | ส่งผ่าน hiddenlayers | tabular/vector tasks | ทุก MLP คือ deep หรือเหนือกว่า KNN |
| RNN | state/recurrence ตามลำดับ | text/audio/time sequences | ลำดับไม่สำคัญหรือรับประกันความจำไม่จำกัด |
| GAN | G/D แข่งขันเชิง generative | สร้างตัวอย่าง/ภาพตามกรอบที่ออกแบบ | เป็น classifier ตัวเดียวหรือ train เสถียรเสมอ |
| CNN | localfilters และ weightsharing | spatialdata/images;กล่าวถึงหน้า6 | ข้อมูลภาพต้องใช้ CNN เท่านั้น |

CNN กล่าวเพียงตำแหน่งในภาพรวม รายละเอียดคำนวณเป็นบทถัดไป ส่วนการ trainRNN/GAN เต็มรูปแบบและ Transformer อยู่นอก scope ไม่มี demoaccuracy หรือจำนวน epochs ที่แต่งขึ้น

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
จำชื่อโดยไม่ดู input/output; นับ inputlayer เป็น weightedlayer โดยไม่บอก; ซ้อน linear แล้วอ้าง nonlinear; สลับ G/D; คิด unsupervised ไม่มีสัญญาณ real/fake; ตีความ styletransfer รูปเดียวเป็นสูตร train ครบ; เชื่อ deep รับประกันผลดีเมื่อข้อมูลน้อย

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 จัดกลุ่มเทคนิค
KNN,deepCNN,search แบบ BFS อยู่ตรงไหนใน AI/ML/DL?

**เฉลย:** KNN อยู่ ML⊂AI แต่ไม่ใช่ DL; deepCNN อยู่ DL⊂ML⊂AI; BFS เป็นเทคนิค search ใน AI ไม่จำเป็นต้องเรียนจากข้อมูล จึงไม่เป็น ML โดยตัวมันเอง

### ข้อ2 ความลึกและ nonlinearity
ทำไม2x+1ตามด้วย3z−4ยังไม่ช่วยแก้ boundary โค้ง?

**เฉลย:** แทนสมการได้6x−1 ยัง affine ตัวอย่าง x2ให้11 ต้องมี nonlinearity/representation ที่เหมาะสม ไม่ใช่เพียงเพิ่มจำนวน linearlayers

### ข้อ3 เลือก RNNconfiguration
จำแนก sentiment ทั้งประโยค,NER ทุก token และแปล3token เป็น5token

**เฉลย:** many-to-one,alignedmany-to-many,unalignedmany-to-many ตามลำดับ NER ส่ง label ตามตำแหน่งแต่ translation ความยาวต่างได้ ต้องประกาศ mapping ไม่สลับกับ one-to-many

### ข้อ4 ตามทางข้อมูล GAN
ใครรับ noise ใครรับภาพจริง/สร้าง และทำไม D ยังมี target แม้กรอบเรียก unsupervised?

**เฉลย:** G รับ noise เพื่อสร้างภาพ; D รับทั้งภาพจริงและภาพสร้าง เป้า real/fake กำหนดจากแหล่งภาพได้ ไม่ต้องมี humanclasslabel ภายนอก แต่ยังเป็นสัญญาณ train ของ D

### ข้อ5 ตีความหลักฐาน StyleTransfer
ภาพ p.11พิสูจน์หรือไม่ว่าทุก styletransfer ต้องใช้ GAN และใช้200epochs?

**เฉลย:** ไม่พิสูจน์ ภาพแสดงหนึ่งตัวอย่าง/กรอบที่อ้าง ไม่แจก settings หรือผล epochs จึงอธิบาย concept ได้แต่ไม่แต่งคำตอบการทดลอง ต้องอ่านแหล่ง/ข้อมูลที่ครบก่อนอ้างผลทำซ้ำ

## สรุปเตรียม FINAL {#summary}
DL⊂ML⊂AI; ความลึกต้องบอก convention; nonlinearity ช่วยขอบเขตซับซ้อน; RNN เน้น sequence และ mapping; GAN แยกบทบาท G สร้าง/D แยก; ภาพ styletransfer ไม่ใช่ขั้นตอน train ครบ บทนี้ไม่มี performanceclaim ที่แหล่งไม่ได้ให้

## แหล่งอ้างอิง {#sources}
- [บัญชี S11](../../../docs/ai-source-coverage.md), original local-only
- S11 `Final/Intro_DeepLearning_Slides.pdf` pp.2–5 weightedneurons/activation/shallowdeep,6hierarchy/types,7–8RNN/configurations,9–11GAN/styletransfer
- เครดิตใน source:ภาพ RNN/GAN จาก TusharKute/mituSkillologies; configurationchart อ้าง StanfordCS230; styletransfer อ้างบทความที่ source ระบุ ไม่ถ่ายภาพสไลด์มาเผยแพร่
- [Coverage](../../../docs/ai-final-deep-learning-overview-coverage.md)
