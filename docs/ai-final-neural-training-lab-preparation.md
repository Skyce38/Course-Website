# Neural Training Lab — คู่มือเตรียมตัว (หลักฐานยังไม่ครบ)

**สถานะ: source-limited preparation guide เท่านั้น ไม่ใช่บทปฏิบัติการที่ตรวจผลสำเร็จแล้ว ไม่ลง lesson registry/catalog/learning path** คู่มือนี้ไม่สร้างภาพข้อมูลหรือผลทดลองทดแทนแหล่งที่หายไป

## หลักฐานที่ตรวจได้

L02 `Assignment/Lab Deep Learning.txt`, lines1–60 และ S11 `Final/Intro_DeepLearning_Slides.pdf` physical pp.2–5 เป็นแหล่ง local-only ตาม [source inventory](ai-source-coverage.md#l02) ไม่คัดลอกไฟล์งานส่งหรือข้อมูลระบุตัวผู้เรียนขึ้นเว็บ

| ข้อ | สิ่งที่แหล่งระบุ | สิ่งที่ยังไม่พบ/ยืนยันไม่ได้ |
|---|---|---|
| Q1,lines1–28 | จำแนกข้อมูลรูป1 สีส้ม/ฟ้า; learning rate .1; Tanh; Regularization None/rate0; Classification; features x1,x2; hidden4nodes/output2nodes; reset แล้วลอง rates .001 และ1 | รูป1/ข้อมูลจริง, tool/version, seed/initialweights, normalization, noise, train/testsplit, batch/optimizer, stopping/accuracydefinition |
| Q2,lines29–38 | สร้างโมเดลข้อมูลรูป2และcaptureให้เห็นparameters | รูป2และ `Screenshot 2026-10-12 154723.png`; ไม่ทราบconfiguration/ผล |
| Q3,lines39–49 | เช่นเดียวกันสำหรับรูป3 | รูป3และ `Screenshot 2026-10-12 155232.png`; ไม่ทราบconfiguration/ผล |
| Q4,lines50–60 | เช่นเดียวกันสำหรับรูป4 | รูป4และ `SPiralScreenshot 2026-10-12 160331.png`; ชื่อไฟล์อย่างเดียวไม่พอสร้างdatasetแทน |

ค้นชื่อ screenshots/figures และไฟล์ lab ใน source tree และ repository ที่มีอยู่แล้ว ไม่พบไฟล์ภาพอ้างเหล่านี้ S11 pp.2–5มีภาพประกอบactivation/network แต่ไม่ใช่หลักฐานว่าภาพเหล่านั้นเป็นรูป1–4ของL02 จึงไม่ใช้แทนกัน L01 screenshotก็ยังหาย แต่เป็นคนละlabไม่ปะปน

L02 answer text Q1 **รายงาน** ประมาณ200epochsที่rate.1,6838ที่.001,2400ที่1.0 เป็นผลรายงานที่ยังตรวจซ้ำไม่ได้ ไม่ใช่เฉลยทางการหรือจำนวนepochsรับประกัน ไม่ใช้เป็นexpected outputของtest และไม่อ้างว่าrateใหญ่กว่าจะเร็วกว่าเสมอ การresetอาจเปลี่ยนinitializationถ้าไม่มีseedควบคุม

## ทบทวนแนวคิดที่ยืนยัน/อธิบายได้

- S11 pp.2–5: neuronคำนวณweighted sumรวมbias แล้วผ่านactivation; nonlinearityจำเป็นสำหรับboundaryซับซ้อน; hiddenlayersเชื่อมกับoutputlayer
- Tanhเป็นactivationที่L02ระบุ: tanh(z)=(exp(z)−exp(−z))/(exp(z)+exp(−z)), outputใน(−1,1)สำหรับzจำกัด; tanh(0)=0, derivative=1−tanh²(z) (คำอธิบายคณิตศาสตร์เสริม ไม่ใช่สูตรที่อ้างว่าพิมพ์ครบในL02)
- Learning rateกำหนดขนาดก้าวของoptimizer; rateเล็กอาจช้า rateใหญ่อาจแกว่ง/ไม่เสถียร แต่ผลขึ้นกับข้อมูล/initialization/optimizer ห้ามเรียงepochsจากrateอย่างเดียว
- hidden4nodesหมายถึงจำนวนหน่วยในชั้นhiddenที่โจทย์ระบุ ไม่ได้แปลว่าhidden4layers; output2nodesไม่ได้ยืนยันactivation/lossของoutput เพราะข้อความไม่ได้แจก
- regularization None/rate0คือsettingที่โจทย์กำหนด ไม่รับรองว่าไม่overfit;100%ต้องบอกว่าวัดtrainingหรือtestและเงื่อนไขการนับ
- epochคือการผ่านtrainingdataหนึ่งรอบ ไม่จำเป็นต้องเท่าหนึ่งgradientupdateถ้ามีหลายmini-batches

## ข้อมูลที่ต้องได้ก่อนทำlabให้ตรวจซ้ำได้

1. รูป1–4หรือพิกัด/labelsจริงที่ได้รับอนุญาตให้ใช้; ไม่เดาจุดจากชื่อspiral
2. ชื่อtool/version,seed,initialization,featurepreprocessing/noiseและtrain/testpartition
3. architectureรวมhiddenlayers/activations/outputactivation/loss และoptimizer/batchsize
4. วิธีresetที่ควบคุมseedและเกณฑ์หยุด;นิยาม100%/epochs
5. screenshotconfigurationและlogsจริงทุกrun พร้อมแยกผลรายงานเดิมจากผลทดลองใหม่

เมื่อหลักฐานครบ ให้คงsettingsQ1แล้วเปลี่ยนrateทีละตัวตามโจทย์ บันทึกผลจริงโดยไม่เติมexpectedepochs หากไม่ถึง100%ให้รายงานข้อจำกัด/จำนวนepochsที่ทดลอง ไม่แต่งคำตอบQ2–4 ตอนนี้ยังไม่มีการทดลองหรือmeasurementใหม่ คู่มือนี้เป็นขอบเขตที่sourceรองรับ จึงไม่ทำให้สถานะF11กลายเป็นcompletedlesson

## การเชื่อมกับบทที่พร้อมใช้

อ่าน [Perceptron](../read/artificial-intelligence/final-perceptron.html) และ [Backpropagation](../read/artificial-intelligence/final-backpropagation.html) เพื่อเตรียมคำนวณgradient;[ภาพรวมDL](../read/artificial-intelligence/final-deep-learning-overview.html)สำหรับarchitecture รักษาข้อแตกต่างระหว่างbinarythresholdของX06กับTanhของL02 ไม่มีการเปลี่ยนข้อมูลหรือprogressของผู้เรียน
