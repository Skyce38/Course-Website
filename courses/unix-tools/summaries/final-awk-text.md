---
{"version":1,"id":"unix-tools-final-awk-text","course":"unix-tools","category":"summaries","slug":"final-awk-text","title":"FINAL 12 — awk และ Text Processing","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- เปรียบเทียบprint$0กับprint$1,$2และFS/OFS
- อธิบายNRกับNFและข้อจำกัดการsplitCSV
- ออกแบบหาค่าเฉลี่ยเฉพาะผู้ผ่านเกณฑ์
- อธิบายpipelineนับค่าซ้ำและผลของsort-n
- ออกแบบtextreportที่มีmissingfieldsและinputว่าง

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: US pp.48–53; UR pp.7–10; H5 pipelines. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Records, Fields, FS และ OFS {#fields}

awkอ่านrecordsปกติทีละบรรทัดและแบ่งfields `$0`คือrecordทั้งบรรทัด `$1`เริ่มfieldแรก -FกำหนดFS ส่วนOFSเป็นตัวคั่นoutputเมื่อprintหลายexpression การเปลี่ยนOFSอย่างเดียวไม่สร้าง$0ใหม่จนมีการแก้field

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'red:10:yes
' | awk -F: '{print $2}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
10
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | colonfield2คือ10 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux12-q01 |

ข้อควรระวัง: shell$1กับawk$1เป็นคนละscope ใช้singlequoteprogram

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-fields}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| field2colon | `10` | colonfield2คือ10 |
| OFS | `A:B` | printหลายexpressionใช้OFS |
| OFSไม่rebuildเอง | `A B` | $0เดิมยังspace |
| แก้fieldrebuild | `A:C` | assignmentfieldrebuildด้วยOFS |
| defaultwhitespace | `2` | defaultFSแยกwhitespaceและไม่สร้างemptyfieldsหัวท้าย |


## NR, FNR, NF และ Filtering {#records}

NRนับrecordsสะสมทุกไฟล์ FNRเริ่มใหม่แต่ละไฟล์ NFจำนวนfieldsในrecordนี้ pattern{action}ทำเมื่อpatternจริง awkมีstring/numericconversionต้องระบุว่าข้อมูลเป็นเลข valid;เงื่อนไข$2>=60ใช้เลขตามdataตัวอย่าง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'A
B
' | awk 'END{print NR}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | มีสองrecords |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux12-q06 |

ข้อควรระวัง: CSVที่มีquotedcommasต้องใช้parserจริงไม่ใช่-F,อย่างเดียว

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-records}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| NRรวมrecords | `2` | มีสองrecords |
| NFต่อrecord | `3` | สามfields |
| filterคะแนน | `B\nC` | 70และ90ผ่าน |
| FNRต่อไฟล์ | `1:1;2:1;` | NRต่อเนื่องFNRเริ่มใหม่ |
| blankrecordNF0 | `0` | มีrecordแต่ไม่มีfield |


## BEGIN/END และ Aggregation {#aggregation}

BEGINทำก่อนอ่าน ENDหลังอ่าน ใช้sum+=$2และนับrecordsเพื่อหาmean ต้องguardN>0 `printf`กำหนดรูปแบบและnewlineเอง ใช้สองpassหรือstoreค่าเพื่อvarianceตามโจทย์จริงไม่ใช้integerarithmeticผิดสูตร

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'A:10
B:20
' | awk -F: '{s+=$2}END{print s}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
30
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | รวม10กับ20 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux12-q11 |

ข้อควรระวัง: filtermeanต้องหารจำนวนที่ผ่านfilterไม่ใช่NRทั้งหมด

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-aggregation}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| sumfield | `30` | รวม10กับ20 |
| filteredmean | `80` | หารด้วย2recordsที่ผ่านไม่ใช่3 |
| BEGINแม้ไม่มีinput | `5` | BEGINทำครั้งเดียวโดยไม่ต้องrecord |
| emptyaggregationguard | `no-data` | guardก่อนหารzero |
| printfprecision | `3.33` | roundแสดงผลสองตำแหน่ง |


## sort, uniq, wc และ cut {#pipelines}

sortปกติเรียงlexicographicตามlocale -nเปรียบเทียบเลข uniqรวมเฉพาะบรรทัดซ้ำที่ติดกัน ต้องsortก่อนหากต้องนับรวมทั้งไฟล์ wc-lนับnewlineไม่ใช่logicalrecordsทุกกรณี cut-cกับmultibyteขึ้นกับimplementation;ใช้ASCIIในโจทย์

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf '10
2
1
' | sort -n
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1
2
10
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | -nเรียงค่าตัวเลข |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux12-q16 |

ข้อควรระวัง: sort|uniqไม่เหมือนuniqอย่างเดียวเมื่อซ้ำไม่ติดกัน

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-pipelines}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| sortnumeric | `1\n2\n10` | -nเรียงค่าตัวเลข |
| sortlexical | `1\n10\n2` | LC_ALL=Cเรียงข้อความ |
| uniqไม่รวมไม่ติด | `3` | ไม่มีสองบรรทัดติดซ้ำ |
| sortก่อนuniq | `2` | sortทำbติดกันแล้วuniqเหลือa,b |
| wcไม่มีnewline | `0` | wc-lนับnewlineไม่ใช่recordสุดท้าย |


## ตัวอย่างข้อมูลและตรวจความถูกต้อง {#applied-text}

ใช้recordsสมมติname:scoreแยกfieldsแล้วfilteraggregateโดยไม่เผยข้อมูลนิสิตจริง H5who|cut|sortเป็นแนวคิดpipeline ไม่จำลองว่ามีผู้ล็อกอินจริง การดึง5ไฟล์ใหญ่จากlsมีข้อจำกัดชื่อแปลกและlocale;โจทย์ใช้ตารางASCIIที่กำหนดแทนfilesystemจริง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'A:10
bad
B:20
' | awk -F: 'NF==2 && $2~/^[0-9]+$/{n++}END{print n}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | badมีNF1จึงไม่รับ |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux12-q21 |

ข้อควรระวัง: อย่าใช้ผลmachine-specificเป็นคำตอบตายตัว

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-applied-text}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| validatefields | `2` | badมีNF1จึงไม่รับ |
| maxscore | `30` | maximumสามข้อมูลคือ30 |
| cutASCIIfields | `student` | เลือกASCIIตำแหน่ง1ถึง7 |
| sortkeynumeric | `B 10` | field2numericreverseเอามากสุด |
| countvalidzero | `1` | 0เป็นเลขvalid ไม่ใช่missing |


## กับดักและกรณีขอบ {#mistakes}

- shell$1กับawk$1เป็นคนละscope ใช้singlequoteprogram
- CSVที่มีquotedcommasต้องใช้parserจริงไม่ใช่-F,อย่างเดียว
- filtermeanต้องหารจำนวนที่ผ่านfilterไม่ใช่NRทั้งหมด
- sort|uniqไม่เหมือนuniqอย่างเดียวเมื่อซ้ำไม่ติดกัน
- อย่าใช้ผลmachine-specificเป็นคำตอบตายตัว

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Records, Fields, FS และ OFS {#review-fields}

เปรียบเทียบprint$0กับprint$1,$2และFS/OFS

แนวคำตอบ: ระบุตัวคั่นinputและoutputและเมื่อrecordถูกrebuild

### 2. NR, FNR, NF และ Filtering {#review-records}

อธิบายNRกับNFและข้อจำกัดการsplitCSV

แนวคำตอบ: ยกข้อมูลfixedformatและกรณีquotedcommaที่วิธีนี้รองรับไม่ได้

### 3. BEGIN/END และ Aggregation {#review-aggregation}

ออกแบบหาค่าเฉลี่ยเฉพาะผู้ผ่านเกณฑ์

แนวคำตอบ: แยกsum,count,guardzeroและระบุหน่วย/rounding

### 4. sort, uniq, wc และ cut {#review-pipelines}

อธิบายpipelineนับค่าซ้ำและผลของsort-n

แนวคำตอบ: ระบุLC_ALL=Cข้อมูลสมมติและไม่parseรายชื่อไฟล์ด้วยwhitespace

### 5. ตัวอย่างข้อมูลและตรวจความถูกต้อง {#review-applied-text}

ออกแบบtextreportที่มีmissingfieldsและinputว่าง

แนวคำตอบ: validateNFและตัวเลขก่อนคำนวณ ไม่อ้างว่าข้อมูลinvalidต้องกลายเป็นศูนย์เงียบๆ

## สรุปก่อนสอบ {#summary}

- Records, Fields, FS และ OFS: shell$1กับawk$1เป็นคนละscope ใช้singlequoteprogram
- NR, FNR, NF และ Filtering: CSVที่มีquotedcommasต้องใช้parserจริงไม่ใช่-F,อย่างเดียว
- BEGIN/END และ Aggregation: filtermeanต้องหารจำนวนที่ผ่านfilterไม่ใช่NRทั้งหมด
- sort, uniq, wc และ cut: sort|uniqไม่เหมือนuniqอย่างเดียวเมื่อซ้ำไม่ติดกัน
- ตัวอย่างข้อมูลและตรวจความถูกต้อง: อย่าใช้ผลmachine-specificเป็นคำตอบตายตัว

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: US pp.48–53; UR pp.7–10; H5 pipelines; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
