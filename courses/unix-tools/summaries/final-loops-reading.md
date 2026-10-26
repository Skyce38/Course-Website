---
{"version":1,"id":"unix-tools-final-loops-reading","course":"unix-tools","category":"summaries","slug":"final-loops-reading","title":"FINAL 07 — Loops และการอ่านไฟล์","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายforสามรูปและเลือกใช้ตามข้อมูล
- เปลี่ยนwhileเป็นuntilโดยรักษาผลเดิม
- ออกแบบloopที่รับค่าซ้ำและมีcontinueอย่างปลอดภัย
- อธิบายรูปแบบอ่านไฟล์ที่รักษาข้อความและบรรทัดท้าย
- แก้โปรแกรมนับบรรทัดที่ได้0หลังpipe

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U11 pp.14–16; U12 sections for/while/until. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## for แบบรายการและแบบ C {#for-loop}

for x in list วนตามwordsที่ขยายแล้ว; for x วนargumentsโดยรักษาแต่ละค่า C-style for((init;condition;update))เป็นBashและเหมาะกับขอบเขตตัวเลข Brace expansionเกิดก่อนparameter expansionจึงไม่ควรใช้ {1..$n}

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
s=0; for x in 2 4 6; do ((s+=x)); done; printf '%s' "$s"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
12
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | รวมรายการ2+4+6 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux07-q01 |

ข้อควรระวัง: ขอบบน<กับ<=ให้จำนวนรอบต่างกัน

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-for-loop}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| list iteration | `12` | รวมรายการ2+4+6 |
| Cstyleรวมขอบ | `3` | รวมi=3 |
| braceกับตัวแปร | `<{1..3}>` | braceก่อนparameterไม่ขยายrangeซ้ำ |
| globในfor | `2` | สองไฟล์ตรงglob |
| รายการว่าง | `0` | ไม่มีรายการจึงศูนย์รอบ |


## while กับ until {#while-until}

whileทำต่อเมื่อคำสั่งเงื่อนไขสำเร็จ untilทำต่อเมื่อยังไม่สำเร็จ ทั้งคู่ตรวจก่อนจึงอาจทำศูนย์รอบ ต้องติดตามค่าเริ่มและการupdateทุกทางรวมcontinue

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
i=1; while ((i<=3)); do printf '%s' "$i"; ((i+=1)); done
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
123
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | พิมพ์1,2,3ติดกัน |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux07-q06 |

ข้อควรระวัง: untilไม่ใช่whileที่ตรวจหลังbody

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-while-until}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| whileนับก่อนupdate | `123` | พิมพ์1,2,3ติดกัน |
| untilหยุดเมื่อสำเร็จ | `012` | ทำต่อเมื่อi<3 |
| zeroiterations | `0` | ตรวจก่อนจึงไม่ทำbody |
| untiltrueไม่ทำ | `0` | conditionสำเร็จตั้งแต่แรก |
| updateขอบสะสม | `3` | 2+1ก่อนหยุดที่0 |


## break, continue และ Nested Loops {#control}

breakออกจากloopใกล้สุด continueข้ามส่วนที่เหลือไปรอบใหม่ break2ออกสองระดับเมื่อมีloopซ้อน การนับข้อมูลซ้ำต้องระบุว่านับoccurrencesหรือdistinct values เช่นfindEvenในWorkshopนับแต่ละargument

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
for x in A B C; do [[ $x == B ]] && break; printf '%s' "$x"; done
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
A
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | หยุดที่Bก่อนprintf |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux07-q11 |

ข้อควรระวัง: continueก่อนupdateในwhileอาจทำให้วนไม่จบ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-control}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| breakก่อนพิมพ์ | `A` | หยุดที่Bก่อนprintf |
| continueข้ามB | `AC` | ข้ามBแต่ยังทำC |
| breakสองระดับ | `1` | ออกสองloopหลังรอบแรก |
| findEvenนับoccurrences | `4` | -4,0,8,8รวมสี่occurrences |
| updateก่อนcontinue | `8` | นับ1+3+4และloopจบ |


## อ่านบรรทัดด้วย read -r และ IFS {#read-lines}

`while IFS= read -r line || [[ -n $line ]]; do ...; done <file` รักษาช่องว่าง/backslashและรับบรรทัดท้ายไม่มีnewline readอาจตั้งค่าข้อมูลแล้วคืนnonzeroเมื่อEOF ใช้printfแทนechoเมื่อข้อมูลมีbackslash

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf '  A  
' >in; IFS= read -r x <in; printf '<%s>' "$x"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
<  A  >
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | IFS=รักษาช่องว่างหัวท้าย |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux07-q16 |

ข้อควรระวัง: for x in $(cat file)แตกคำและทำลายขอบบรรทัด

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-read-lines}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| รักษาช่องว่าง | `<  A  >` | IFS=รักษาช่องว่างหัวท้าย |
| รักษาbackslash | `a\b` | -rไม่ตีความbackslash |
| EOFไม่มีnewline | `1` | เงื่อนไขขวาช่วยรับท้ายไฟล์ |
| readธรรมดาท้ายไฟล์ | `1:tail` | readคืน1แต่ยังตั้งxเป็นtail |
| รักษาบรรทัดว่าง | `3` | บรรทัดว่างยังมีnewlineและนับได้ |


## Pipeline, Subshell และผลนับ {#pipeline-scope}

Bashปกติรันแต่ละส่วนของpipelineในsubshell ค่าcounterที่แก้ในwhileฝั่งpipeไม่กลับแม่; lastpipeอาจเปลี่ยนกรณีท้ายเมื่อjobcontrolปิด อย่าสอนว่าpipelineมีsubshellเสมอทุกoption ใช้redirectเข้าloopเมื่อต้องใช้ค่าต่อ

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
shopt -u lastpipe; n=0; printf 'x
' | while read -r x; do ((n+=1)); done; printf '%s' "$n"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
0
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | counterในsubshellไม่กลับแม่ |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux07-q21 |

ข้อควรระวัง: testsกำหนดlastpipeปิดและjobcontrolปิดให้ชัด

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-pipeline-scope}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| counterในpipe | `0` | counterในsubshellไม่กลับแม่ |
| counterredirect | `2` | loopอยู่shellเดิม |
| lastpipeเปิด | `1` | ท้ายpipelineในshellเดิมเมื่อlastpipeและไม่มีjobcontrol |
| processsubstitution | `2` | loopไม่ใช่ส่วนของpipe |
| forcatแตกคำ | `3` | defaultIFSแตกเป็นสามwordsไม่ใช่สองบรรทัด |


## กับดักและกรณีขอบ {#mistakes}

- ขอบบน<กับ<=ให้จำนวนรอบต่างกัน
- untilไม่ใช่whileที่ตรวจหลังbody
- continueก่อนupdateในwhileอาจทำให้วนไม่จบ
- for x in $(cat file)แตกคำและทำลายขอบบรรทัด
- testsกำหนดlastpipeปิดและjobcontrolปิดให้ชัด

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. for แบบรายการและแบบ C {#review-for-loop}

อธิบายforสามรูปและเลือกใช้ตามข้อมูล

แนวคำตอบ: แยกlist/args/arithmeticและอธิบายexpansionล่วงหน้า

### 2. while กับ until {#review-while-until}

เปลี่ยนwhileเป็นuntilโดยรักษาผลเดิม

แนวคำตอบ: กลับเงื่อนไขจริง/เท็จอย่างถูกต้องและตรวจzeroiterations

### 3. break, continue และ Nested Loops {#review-control}

ออกแบบloopที่รับค่าซ้ำและมีcontinueอย่างปลอดภัย

แนวคำตอบ: นับoccurrencesชัดเจน updateทุกทางและมีขอบเขตจบ

### 4. อ่านบรรทัดด้วย read -r และ IFS {#review-read-lines}

อธิบายรูปแบบอ่านไฟล์ที่รักษาข้อความและบรรทัดท้าย

แนวคำตอบ: ระบุIFS=,-rและเงื่อนไขEOFโดยแยกexitstatusกับข้อมูลในline

### 5. Pipeline, Subshell และผลนับ {#review-pipeline-scope}

แก้โปรแกรมนับบรรทัดที่ได้0หลังpipe

แนวคำตอบ: redirectเข้าloopหรือใช้processsubstitution พร้อมอธิบายlastpipeเป็นข้อยกเว้น

## สรุปก่อนสอบ {#summary}

- for แบบรายการและแบบ C: ขอบบน<กับ<=ให้จำนวนรอบต่างกัน
- while กับ until: untilไม่ใช่whileที่ตรวจหลังbody
- break, continue และ Nested Loops: continueก่อนupdateในwhileอาจทำให้วนไม่จบ
- อ่านบรรทัดด้วย read -r และ IFS: for x in $(cat file)แตกคำและทำลายขอบบรรทัด
- Pipeline, Subshell และผลนับ: testsกำหนดlastpipeปิดและjobcontrolปิดให้ชัด

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U11 pp.14–16; U12 sections for/while/until; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
