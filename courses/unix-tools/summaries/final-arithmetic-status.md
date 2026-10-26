---
{"version":1,"id":"unix-tools-final-arithmetic-status","course":"unix-tools","category":"summaries","slug":"final-arithmetic-status","title":"FINAL 04 — Arithmetic และ Exit Status","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบาย integer division กับ decimal division และ base10
- ติดตาม n++ และ ++n พร้อมค่า expression และ status
- ออกแบบส่งผลคำนวณกับแจ้ง error คนละช่องทาง
- อธิบาย pipeline failure กับ pipefail โดยมีตัวอย่าง
- อธิบายเหตุที่การแปลง40Cให้72เป็นคำตอบผิดและแก้ให้104

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U10 pp.5–10; H7; HF pp.1–2. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Integer Arithmetic และฐานตัวเลข {#integers}

`$((...))` ขยายผลคำนวณจำนวนเต็ม `((...))` เป็นคำสั่ง arithmetic ส่วน `n=7+2` เก็บข้อความ การหารจำนวนเต็มตัดเข้าหาศูนย์ `%` ให้เศษที่สอดคล้องกับการหารนั้น ตัวเลขขึ้นต้น0 อาจถูกตีความฐานแปด ใช้ 10# หลังตรวจ input

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf '%s' "$((7/2))"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
3
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | 7/2 ตัดเศษใน integer arithmetic |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux04-q01 |

ข้อควรระวัง: Bash ไม่รองรับ decimal floating point ใน arithmetic

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-integers}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| หารจำนวนเต็ม | `3` | 7/2 ตัดเศษใน integer arithmetic |
| หารจำนวนลบ | `-3` | ตัดเข้าศูนย์ไม่ใช่ floor |
| modulo | `1` | 7=3*2+1 |
| ฐานแปด | `8` | เลขนำ0เป็นฐานแปด |
| arithmetic expression ในตัวแปร | `9` | arithmetic context ประเมินข้อความเป็นนิพจน์ |


## Precedence, Increment และ Overflow {#operators}

คูณหารก่อนบวก ลำดับระดับเดียวกันคำนวณตาม associativity ใช้ ** สำหรับยกกำลัง และ ^ สำหรับ XOR Post-increment ให้นิพจน์ค่าเดิม Pre-increment ให้ค่าใหม่ จำนวนเต็มมีความกว้างจำกัดและไม่มีการรับประกันแจ้ง overflow จึงจำกัดช่วง factorial 0..20 ใน signed64-bit

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf '%s' "$((2+3*4))"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
14
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | คูณก่อนบวก |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux04-q06 |

ข้อควรระวัง: อย่านำ ^ ไปเขียนสูตรกำลังสอง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-operators}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ลำดับคำนวณ | `14` | คูณก่อนบวก |
| ยกกำลังกับ XOR | `8:1` | ** ยกกำลัง ^ bitwise XOR |
| post increment | `0:1` | ค่าของ expression คือค่าเก่า |
| pre increment | `1:1` | ค่า expression คือค่าที่เพิ่มแล้ว |
| compound assignment | `15` | คูณแล้วกำหนดกลับ |


## Exit Status ไม่ใช่ stdout {#status}

status0 คือสำเร็จ nonzero มีหลายความหมาย `$?` เปลี่ยนเมื่อรันคำสั่งใหม่ ต้องเก็บทันที `((expr))` สำเร็จเมื่อค่า expr ไม่เป็น0 if ตรวจ status ไม่ได้อ่านข้อความ stdout การบันทึก status ต้องเกิดก่อนคำสั่งแสดงผล

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
((0)); printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ค่าศูนย์ใน arithmetic command หมายถึง false |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux04-q11 |

ข้อควรระวัง: printf true ไม่ทำให้คำสั่งก่อนหน้าสำเร็จ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-status}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| arithmetic zero status | `1` | ค่าศูนย์ใน arithmetic command หมายถึง false |
| arithmetic nonzero status | `0` | ค่าที่ไม่เป็นศูนย์คือ true |
| คำสั่งใหม่ทับ status | `0` | เก็บ status ของ true ล่าสุด |
| เก็บ status ก่อนพิมพ์ | `1` | assignment เก็บค่า false ก่อนหาย |
| if ไม่อ่านคำว่า false | `yes` | printf สำเร็จแม้พิมพ์คำว่า false |


## &&, || และ Pipelines {#short-circuit}

`a && b` รัน b เมื่อ a สำเร็จ; `a || b` รันเมื่อ a ล้มเหลว ทั้งสองมี precedence เท่ากันและเชื่อมซ้ายไปขวาใน Bash; อย่าใช้ a&&b||c แทน if/else เมื่อ b ล้มเหลวได้ Pipeline ปกติคืน status ของคำสั่งท้าย; pipefail เปลี่ยนเป็นขวาสุดที่ล้มเหลว

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
false && printf wrong; printf done
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
done
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | false ทำให้ข้าม && |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux04-q16 |

ข้อควรระวัง: set -e ไม่ใช่การจัดการ error ที่ครอบคลุมทุกบริบท

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-short-circuit}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| AND ไม่เรียกคำสั่งขวา | `done` | false ทำให้ข้าม && |
| OR เลือก fallback | `fallback` | คำสั่งแรก nonzero จึงรัน fallback |
| AND OR ไม่ใช่ ternary | `fallback` | คำสั่งกลางล้มเหลวจึงรัน // |
| pipeline ค่าเริ่มต้น | `0` | status คำสั่งท้ายคือ true |
| pipeline เปิด pipefail | `1` | ขวาสุดที่ล้มเหลวคือ false |


## เลขทศนิยมและสูตรจาก H7/HF {#decimals}

H7 ขอ calc div10 20 ได้0.5 จึงต้องใช้ awk หรือ bc ที่ติดตั้ง HF ใช้ F=(9/5)C+32 และ C=(5/9)(F-32) ต้องคำนวณแบบทศนิยมและ formatสองตำแหน่ง การปัดทำตอนแสดงผล ไม่ปัด intermediate เร็วเกินไป

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
awk 'BEGIN {print 10/20}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
0.5
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | awk ใช้เลขทศนิยม |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux04-q21 |

ข้อควรระวัง: 9/5*40 ใน Bash ได้40 ไม่ใช่72; เมื่อบวก32จึง72 ซึ่งผิดสูตรทศนิยม

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-decimals}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| calc div แบบ decimal | `0.5` | awk ใช้เลขทศนิยม |
| กับดักสูตร integer | `72` | 9/5 ได้1 จึง1*40+32 |
| Celsius ไป Fahrenheit | `104.00` | คำนวณแบบ real ได้104.00 |
| Fahrenheit ไป Celsius | `95.78` | ปัดผลสุดท้ายสองตำแหน่ง |
| calculator subtraction | `-10` | รักษาลำดับ operands ไม่สลับ |


## กับดักและกรณีขอบ {#mistakes}

- Bash ไม่รองรับ decimal floating point ใน arithmetic
- อย่านำ ^ ไปเขียนสูตรกำลังสอง
- printf true ไม่ทำให้คำสั่งก่อนหน้าสำเร็จ
- set -e ไม่ใช่การจัดการ error ที่ครอบคลุมทุกบริบท
- 9/5*40 ใน Bash ได้40 ไม่ใช่72; เมื่อบวก32จึง72 ซึ่งผิดสูตรทศนิยม

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Integer Arithmetic และฐานตัวเลข {#review-integers}

อธิบาย integer division กับ decimal division และ base10

แนวคำตอบ: ยกตัวอย่าง 7/2 กับ awk 7/2 และอธิบาย 08 โดยไม่สับสน string กับเลข

### 2. Precedence, Increment และ Overflow {#review-operators}

ติดตาม n++ และ ++n พร้อมค่า expression และ status

แนวคำตอบ: แยกค่าเก่า/ใหม่ และระบุ overflow เป็นข้อจำกัด implementation

### 3. Exit Status ไม่ใช่ stdout {#review-status}

ออกแบบส่งผลคำนวณกับแจ้ง error คนละช่องทาง

แนวคำตอบ: stdout สำหรับข้อมูล stderr สำหรับ error และ return/exit สำหรับสถานะ

### 4. &&, || และ Pipelines {#review-short-circuit}

อธิบาย pipeline failure กับ pipefail โดยมีตัวอย่าง

แนวคำตอบ: แยก stdout/status และไม่อ้างว่าทุก pipeline ล้มเหลวเมื่อคำสั่งแรกพลาด

### 5. เลขทศนิยมและสูตรจาก H7/HF {#review-decimals}

อธิบายเหตุที่การแปลง40Cให้72เป็นคำตอบผิดและแก้ให้104

แนวคำตอบ: ใช้ real arithmetic 1.8*40+32 และแยก precision จาก formatting

## สรุปก่อนสอบ {#summary}

- Integer Arithmetic และฐานตัวเลข: Bash ไม่รองรับ decimal floating point ใน arithmetic
- Precedence, Increment และ Overflow: อย่านำ ^ ไปเขียนสูตรกำลังสอง
- Exit Status ไม่ใช่ stdout: printf true ไม่ทำให้คำสั่งก่อนหน้าสำเร็จ
- &&, || และ Pipelines: set -e ไม่ใช่การจัดการ error ที่ครอบคลุมทุกบริบท
- เลขทศนิยมและสูตรจาก H7/HF: 9/5*40 ใน Bash ได้40 ไม่ใช่72; เมื่อบวก32จึง72 ซึ่งผิดสูตรทศนิยม

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U10 pp.5–10; H7; HF pp.1–2; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
