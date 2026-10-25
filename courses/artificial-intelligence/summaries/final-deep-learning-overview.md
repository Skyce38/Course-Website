---
{"version":1,"id":"artificial-intelligence-final-deep-learning-overview","course":"artificial-intelligence","category":"summaries","slug":"final-deep-learning-overview","title":"FINAL: ภาพรวม Deep Learning, RNN และ GAN","language":"th"}
---

> S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.2–11 ตรวจภาพโดยตรง บทนี้เป็นภาพรวม FINAL ไม่ใช่คู่มือtrain RNN/GANหรือTransformer เฉลย/ตัวอย่างการเลือกสถาปัตยกรรมที่ระบุว่าเสริมเป็นงานผู้เขียน ไม่ใช่ official answer key ลำดับเผยแพร่ชั่วคราว

## เป้าหมายการเรียนรู้ {#objectives}
- จัดความสัมพันธ์ AI,ML,DL โดยไม่เหมารวมว่าAIทุกชนิดต้องเรียนจากข้อมูล
- แยกshallow/deepและบทบาทnonlinearactivation
- อธิบายsequenceและรูปแบบinput/outputของRNN
- แยกGenerator/Discriminatorและอ่านตัวอย่างstyletransferอย่างระวัง
- เลือกตระกูลarchitectureตามข้อมูลโดยไม่อ้างผลaccuracyที่ไม่มีsource

## AI, ML และ DL {#hierarchy}
S11 p.6 วาง DLภายในMLภายในAI: AIเป็นขอบเขตกว้าง เช่นงานreasoning/search; MLใช้ข้อมูลเรียนรูปแบบ; DLใช้neuralnetworksหลายชั้นเพื่อเรียนrepresentations ไม่ใช่ว่าAI=DLหรือการมีข้อมูลทำให้อัลกอริทึมเป็นDLทันที DecisionTree/KNNที่เรียนมาเป็นMLแต่ไม่ใช่deepneuralnetwork บทนี้ไม่ขยายTransformerinternalsซึ่งไม่อยู่ในหน้าที่กำหนด

## Neuron, Activation และความลึก {#depth}
pp.2–5 เริ่ม z=w0+Σwixi และ y=g(z) ถ้ามีแต่linearmapsหลายชั้นจะยุบเป็นlinearmapเดียว จึงใช้nonlinearityสำหรับboundaryซับซ้อน ภาพp.3กลุ่มสีแดง/เขียวและp.4เส้นแบ่งสาธิตความจำเป็น ไม่ใช่datasetพร้อมพิกัดหรือผลaccuracy

| Activation | รูป | ประเด็นการอ่านภาพ |
|---|---|---|
| Linear | g(z)=z | ไม่เพิ่มความไม่เชิงเส้นด้วยการซ้อนอย่างเดียว |
| Threshold | 1เมื่อเกินเกณฑ์ | ตัดสินใจไม่ต่อเนื่อง ไม่เหมาะgradientมาตรฐาน |
| Sigmoid | 1/(1+exp(−z)) | output0..1,อิ่มตัวแล้วgradientเล็ก |
| ReLU | max(0,z) | nonlinear,ศูนย์ด้านลบ;จุด0ต้องเลือกอนุพันธ์ย่อย |

S11 p.5 เรียกภาพซ้ายOne-layerซึ่งมีhiddenlayerหนึ่งชั้น ภาษาการนับชั้นต่างกันได้ จึงควรบอก **จำนวนhiddenlayers/weightedlayers** แทนตีความจากชื่ออย่างเดียว ภาพขวามีhiddenหลายชั้น=deep; ไม่กำหนดตัวเลขสากลว่ากี่ชั้นเริ่มdeep และไม่แปลว่าdeepดีกว่าทุกงาน ต้องพิจารณาข้อมูล/ความจุ/overfitting/ทรัพยากร (ข้ออธิบายเสริม)

ตัวอย่างเสริมคำนวณ:สองlinearmaps z1=2x+1,z2=3z1−4 → z2=6x−1 ยังเป็นเส้นตรง เมื่อx=2ได้11 การแทรกReLUเปลี่ยนความเป็นเชิงเส้นทั่วทั้งdomain ไม่ใช่แค่เพิ่มพารามิเตอร์

## RNN และข้อมูลลำดับ {#rnn}
S11 p.7 กล่าวถึงRecurrentNeuralNetworkสำหรับtext,audioและข้อมูลตามเวลา; อันดับมีความหมาย ต่างจากการมองแต่ละแถวอิสระ stateส่งข้อมูลจากขั้นก่อนสู่ขั้นถัดไป แนวคิดเสริมแบบย่อคือ h_t=f(Wx_t+Uh_{t−1}+b) ใช้น้ำหนักร่วมตามเวลา ไม่ใช่สำเนาparametersใหม่อิสระทุกt บทนี้ไม่กำหนดloss/training/truncationที่สไลด์ไม่ได้ให้

S11 p.8 (ภาพที่อ้างStanfordCS230) แยกconfigurationตามความยาวinput/output:

| Configuration | รูปข้อมูล | ตัวอย่างในภาพ |
|---|---|---|
| One-to-one | หนึ่งinput/หนึ่งoutput | traditionalneuralnetwork ไม่ได้มีrecurrenceเสมอ |
| One-to-many | หนึ่งinput/หลายoutput | musicgeneration |
| Many-to-one | ลำดับinput/หนึ่งoutput | sentimentclassification |
| Many-to-many aligned | ความยาวinput/outputเท่ากัน | namedentityrecognition (NER) |
| Many-to-many unaligned | ความยาวต่างกันได้ | machinetranslation |

ตัวอย่างเสริม:คำไทย3tokenถูกส่งเข้าแล้วได้sentimentเดียวเป็นmany-to-one; ถ้าติดNERlabelทุกtokenเป็นalignedmany-to-many การแปลประโยค3tokenเป็น5tokenเป็นunaligned ไม่ใช่แค่RNNชนิดใดก็รองรับทุกงานโดยไม่ออกแบบเพิ่ม คำว่าone-to-manyในภาพเป็นรูปแบบmapping ไม่ใช่ข้อกำหนดว่าเริ่มจากscalarเท่านั้น

## GAN: Generator และ Discriminator {#gan}
S11 pp.9–10 อธิบายGenerativeAdversarialNetworkเป็นกรอบgenerativelearning เรียนโครงสร้างข้อมูลเพื่อสร้างตัวอย่างคล้ายdistributionเดิม ภาพหน้า10:noise→Generator→ภาพสร้าง; ภาพจริงจากdatasetและภาพสร้างป้อนDiscriminatorซึ่งแยกreal/fake ระหว่างtrainมีวัตถุประสงค์แข่งขันกัน Generatorต้องสร้างให้หลอกได้ดีขึ้น Discriminatorต้องแยกให้ดีขึ้น

คำว่าunsupervisedในp.9หมายถึงไม่มีclasslabelsของงานภายนอกเป็นตัวกำกับหลัก แต่Dยังได้รับreal/fakeสัญญาณที่สร้างจากแหล่งภาพ ไม่ใช่ไม่มีtargetใดเลย Noiseไม่ใช่รูปจริง; Dไม่ได้วาดภาพ; Gไม่ได้เป็นตัวตัดสินreal/fake ผลrealisticไม่พิสูจน์ว่าไม่ได้จำtrainingimagesหรือไม่มีbias ข้อควรระวังนี้เป็นคำอธิบายผู้เขียน

## ตัวอย่าง Style Transfer {#style}
S11 p.11แสดงกรอบGANและภาพcontent/style/ผลลัพธ์ พร้อมอ้างบทความด้านimagestyletransfer จึงใช้เป็นตัวอย่างการเปลี่ยนลักษณะภาพตามstyle ไม่ถือเป็นหลักฐานว่าstyletransferทุกวิธีต้องใช้GAN ไม่สร้างขั้นตอนloss/weights/epochsจากภาพที่ไม่มีรายละเอียด และไม่คัดลอกภาพบุคคล/งานศิลป์ในสไลด์มาลงเว็บ

## เปรียบเทียบสถาปัตยกรรม {#comparison}
| ตระกูล | โครงสร้างเด่น | ข้อมูล/เป้าหมาย | ไม่ควรสรุป |
|---|---|---|---|
| MLP/feedforward | ส่งผ่านhiddenlayers | tabular/vector tasks | ทุกMLPคือdeepหรือเหนือกว่าKNN |
| RNN | state/recurrenceตามลำดับ | text/audio/time sequences | ลำดับไม่สำคัญหรือรับประกันความจำไม่จำกัด |
| GAN | G/Dแข่งขันเชิงgenerative | สร้างตัวอย่าง/ภาพตามกรอบที่ออกแบบ | เป็นclassifierตัวเดียวหรือtrainเสถียรเสมอ |
| CNN | localfiltersและweightsharing | spatialdata/images;กล่าวถึงหน้า6 | ข้อมูลภาพต้องใช้CNNเท่านั้น |

CNNกล่าวเพียงตำแหน่งในภาพรวม รายละเอียดคำนวณเป็นบทถัดไป ส่วนการtrainRNN/GANเต็มรูปแบบและTransformerอยู่นอกscope ไม่มีdemoaccuracyหรือจำนวนepochsที่แต่งขึ้น

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
จำชื่อโดยไม่ดูinput/output; นับinputlayerเป็นweightedlayerโดยไม่บอก; ซ้อนlinearแล้วอ้างnonlinear; สลับG/D; คิดunsupervisedไม่มีสัญญาณreal/fake; ตีความstyletransferรูปเดียวเป็นสูตรtrainครบ; เชื่อdeepรับประกันผลดีเมื่อข้อมูลน้อย

## แบบฝึกพร้อมเฉลย: ผู้เขียนจัดทำอิสระ {#practice}
### ข้อ1 จัดกลุ่มเทคนิค
KNN,deepCNN,searchแบบBFSอยู่ตรงไหนในAI/ML/DL?

**เฉลย:** KNNอยู่ML⊂AIแต่ไม่ใช่DL; deepCNNอยู่DL⊂ML⊂AI; BFSเป็นเทคนิคsearchในAI ไม่จำเป็นต้องเรียนจากข้อมูล จึงไม่เป็นMLโดยตัวมันเอง

### ข้อ2 ความลึกและnonlinearity
ทำไม2x+1ตามด้วย3z−4ยังไม่ช่วยแก้boundaryโค้ง?

**เฉลย:** แทนสมการได้6x−1 ยังaffine ตัวอย่างx2ให้11 ต้องมีnonlinearity/representationที่เหมาะสม ไม่ใช่เพียงเพิ่มจำนวนlinearlayers

### ข้อ3 เลือกRNNconfiguration
จำแนกsentimentทั้งประโยค,NERทุกtokenและแปล3tokenเป็น5token

**เฉลย:** many-to-one,alignedmany-to-many,unalignedmany-to-manyตามลำดับ NERส่งlabelตามตำแหน่งแต่translationความยาวต่างได้ ต้องประกาศmappingไม่สลับกับone-to-many

### ข้อ4 ตามทางข้อมูลGAN
ใครรับnoise ใครรับภาพจริง/สร้าง และทำไมDยังมีtargetแม้กรอบเรียกunsupervised?

**เฉลย:** Gรับnoiseเพื่อสร้างภาพ; Dรับทั้งภาพจริงและภาพสร้าง เป้าreal/fakeกำหนดจากแหล่งภาพได้ ไม่ต้องมีhumanclasslabelภายนอก แต่ยังเป็นสัญญาณtrainของD

### ข้อ5 ตีความหลักฐานStyleTransfer
ภาพp.11พิสูจน์หรือไม่ว่าทุกstyletransferต้องใช้GANและใช้200epochs?

**เฉลย:** ไม่พิสูจน์ ภาพแสดงหนึ่งตัวอย่าง/กรอบที่อ้าง ไม่แจกsettingsหรือผลepochs จึงอธิบายconceptได้แต่ไม่แต่งคำตอบการทดลอง ต้องอ่านแหล่ง/ข้อมูลที่ครบก่อนอ้างผลทำซ้ำ

## สรุปเตรียม FINAL {#summary}
DL⊂ML⊂AI; ความลึกต้องบอกconvention; nonlinearityช่วยขอบเขตซับซ้อน; RNNเน้นsequenceและmapping; GANแยกบทบาทGสร้าง/Dแยก; ภาพstyletransferไม่ใช่ขั้นตอนtrainครบ บทนี้ไม่มีperformanceclaimที่แหล่งไม่ได้ให้

## แหล่งอ้างอิง {#sources}
- [บัญชี S11](../../../docs/ai-source-coverage.md), original local-only
- S11 `Final/Intro_DeepLearning_Slides.pdf` pp.2–5 weightedneurons/activation/shallowdeep,6hierarchy/types,7–8RNN/configurations,9–11GAN/styletransfer
- เครดิตในsource:ภาพRNN/GANจากTusharKute/mituSkillologies; configurationchartอ้างStanfordCS230; styletransferอ้างบทความที่sourceระบุ ไม่ถ่ายภาพสไลด์มาเผยแพร่
- [Coverage](../../../docs/ai-final-deep-learning-overview-coverage.md)
