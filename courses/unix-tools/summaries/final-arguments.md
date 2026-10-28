---
{"version":1,"id":"unix-tools-final-arguments","course":"unix-tools","category":"summaries","slug":"final-arguments","title":"FINAL 03 — Arguments และ Parameters","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายการส่งชื่อคนเป็น argument เดียวและตรวจ $#
- เปรียบเทียบ "$@" กับ "$*" รวมกรณีไม่มี arguments
- ออกแบบรับ -c ตามด้วยอุณหภูมิหลายค่า
- ออกแบบ error เมื่อ argument หายหรือไม่ใช่ตัวเลข
- ออกแบบ record ที่มีชื่อและวันเกิดหลายคำโดยไม่สูญ field

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U09 pp.15–19; U10 pp.2–3; H6. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Positional และ Special Parameters {#positions}

`$0` เป็นชื่อที่ใช้เรียก script ไม่ใช่ argument แรก `$1` เป็นต้นคือ positional arguments; `${10}` ต่างจาก `$10` ที่คือ $1 ตามด้วย 0 `$#` นับ arguments ไม่ใช่จำนวนกลุ่มความหมาย `set --` ตั้ง positional parameters ใหม่อย่างชัดเจน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- one two; printf '%s' "$#"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | set -- ตั้งสอง arguments |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux03-q01 |

ข้อควรระวัง: ช่องว่างในข้อมูลจะเพิ่ม arguments หากไม่ quote

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-positions}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| จำนวน arguments ไม่รวม $0 | `2` | set -- ตั้งสอง arguments |
| argument ที่สิบ | `j` | braces เลือกสิบ |
| $10 ไม่ใช่สิบ | `a0` | $1 ต่อ literal 0 |
| ตั้ง $0 ใน bash -c | `demo` | argument หลัง command string เป็น $0 |
| empty positional มีอยู่ | `1` | empty argument ยังนับหนึ่ง |


## รักษา Arguments ด้วย "$@" {#all-arguments}

`"$@"` ให้หนึ่ง word ต่อหนึ่ง argument รวม empty argument; `"$*"` รวมเป็น word เดียวคั่นด้วยอักขระแรกของ IFS เมื่อไม่มี arguments "$@" ให้ศูนย์ words แต่ "$*" ให้หนึ่ง empty word `for arg; do` เทียบเท่า for ที่วน "$@"

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- 'red blue' green; for x in "$@"; do printf '<%s>' "$x"; done
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
<red blue><green>
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | quoted @ รักษาแต่ละ argument |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux03-q06 |

ข้อควรระวัง: อย่าใช้ $@ แบบไม่ quote กับชื่อไฟล์มีช่องว่าง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-all-arguments}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| วนรักษาช่องว่าง | `<red blue><green>` | quoted @ รักษาแต่ละ argument |
| รวมด้วย IFS ตัวแรก | `A:B` | quoted * ใช้ colon |
| quoted @ ว่าง | `0` | ไม่มี arguments จึงไม่มีรอบ |
| quoted * ว่าง | `1` | มีหนึ่ง empty word |
| for แบบย่อ | `3` | for x วน positional args รวม empty |


## shift และการประมวลผล Options {#shift}

`shift n` ลบ n arguments แรกและคืน nonzero หาก n มากกว่า $# โดยไม่เลื่อนบางส่วน เก็บ option ในตัวแปรก่อน shift; ใช้ while (($#)) เพื่อไล่ค่าที่เหลือ $0 ไม่เปลี่ยนจาก shift

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- A B C; shift 2; printf '%s:%s' "$#" "$1"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1:C
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | เหลือ C ตัวเดียว |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux03-q11 |

ข้อควรระวัง: อย่าถือว่าทุก shift สำเร็จ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-shift}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| shift สอง | `1:C` | เหลือ C ตัวเดียว |
| shift เกินจำนวน | `1:1` | ล้มเหลวและไม่เลื่อน |
| เก็บ mode ก่อน shift | `-c:2` | mode เก็บ -c เหลือสอง operands |
| shift ศูนย์ | `2` | shift0 ไม่เปลี่ยน args |
| วนกิน arguments | `3` | เลื่อนหนึ่งต่อรอบจนว่าง |


## ตรวจ Input ก่อนใช้ {#validation}

ตรวจจำนวนด้วย $# และรูปแบบด้วย [[ ... =~ ... ]] อย่าประเมินข้อมูลไม่เชื่อถือเป็น arithmetic expression โดยตรง ใช้ regex จำกัดจำนวนเต็มไม่ติดเครื่องหมายตามตัวอย่างแล้วแปลงฐาน10; สคริปต์จริงต้องกำหนดช่วงป้องกัน overflow

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- sub 10; printf '%s' "$((3-$#))"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ต้องการสาม args มีสองจึงขาดหนึ่ง |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux03-q16 |

ข้อควรระวัง: Bash arithmetic ไม่ใช่ parser ข้อมูลที่ปลอดภัยโดยอัตโนมัติ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-validation}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| arity สำหรับ calculator | `1` | ต้องการสาม args มีสองจึงขาดหนึ่ง |
| regex ตัวเลขไม่รับอักษร | `1` | มี x จึงไม่ใช่ digit ทั้งสาย |
| ฐานสิบศูนย์นำหน้า | `8` | 10# ระบุฐานสิบหลังตรวจ input |
| missing และ default | `missing` | ไม่มี $1 ใช้ default |
| ไม่ตีความ option เป็นเลข | `0` | option และจำนวนครบตามเงื่อนไข |


## ประยุกต์ H6: Student Record แบบข้อมูลสมมติ {#student-record}

H6 ขอเก็บรหัส ชื่อ อีเมล โทรศัพท์ วันเกิด และสร้างชื่อไฟล์มีเวลารูปแบบ %Y%m%d%H%M แต่ตัวอย่าง unquoted มีแปด arguments วิธีที่ปรับปรุงคือ quote ชื่อและวันเกิดให้เหลือห้า arguments; ใช้ข้อมูลสมมติและตรวจฟิลด์ก่อนเขียน ห้ามนำข้อมูลส่วนบุคคลจากต้นฉบับมาทำชุดข้อสอบ

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- 99999999 Ada Example a@example.invalid 00-0000-0000 1 Jan 2000; printf '%s' "$#"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
8
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ชื่อแตกสองและวันเกิดแตกสาม รวมแปด |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux03-q21 |

ข้อควรระวัง: รูปแบบ timestamp ไม่รับประกันชื่อไม่ซ้ำในนาทีเดียว

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-student-record}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| H6 แบบ unquoted | `8` | ชื่อแตกสองและวันเกิดแตกสาม รวมแปด |
| H6 แบบ quote | `5` | ชื่อและวันเกิดคนละหนึ่ง argument |
| field ชื่อหลัง quote | `Ada Example` | ชื่อเป็น $2 ทั้งข้อความ |
| timestamp แบบแน่นอน | `200001020304` | GNU date รูปแบบ YYYYMMDDHHMM ใช้เวลาที่ระบุไม่ใช่ปัจจุบัน |
| colon record | `id:Ada Example:mail:phone:1 Jan` | printf format ห้าช่องรับห้า arguments |


## กับดักและกรณีขอบ {#mistakes}

- ช่องว่างในข้อมูลจะเพิ่ม arguments หากไม่ quote
- อย่าใช้ $@ แบบไม่ quote กับชื่อไฟล์มีช่องว่าง
- อย่าถือว่าทุก shift สำเร็จ
- Bash arithmetic ไม่ใช่ parser ข้อมูลที่ปลอดภัยโดยอัตโนมัติ
- รูปแบบ timestamp ไม่รับประกันชื่อไม่ซ้ำในนาทีเดียว

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Positional และ Special Parameters {#review-positions}

อธิบายการส่งชื่อคนเป็น argument เดียวและตรวจ $#

แนวคำตอบ: quote ค่าและตรวจจำนวนก่อนอ่าน positional parameter

### 2. รักษา Arguments ด้วย "$@" {#review-all-arguments}

เปรียบเทียบ "$@" กับ "$*" รวมกรณีไม่มี arguments

แนวคำตอบ: นับ words และ empty arguments ให้ถูก; ระบุผลของ IFS

### 3. shift และการประมวลผล Options {#review-shift}

ออกแบบรับ -c ตามด้วยอุณหภูมิหลายค่า

แนวคำตอบ: ตรวจจำนวนก่อน shift เก็บ mode แล้ววน "$@" โดยรักษาค่าติดลบและ quote

### 4. ตรวจ Input ก่อนใช้ {#review-validation}

ออกแบบ error เมื่อ argument หายหรือไม่ใช่ตัวเลข

แนวคำตอบ: ตรวจ arity, regex, ช่วงค่า และส่ง diagnostic stderr พร้อมสถานะ nonzero

### 5. ประยุกต์ H6: Student Record แบบข้อมูลสมมติ {#review-student-record}

ออกแบบ record ที่มีชื่อและวันเกิดหลายคำโดยไม่สูญ field

แนวคำตอบ: กำหนดห้า args, quote, printf format คงที่, ตรวจ colon/newline และป้องกันชื่อไฟล์ชนกัน

## สรุปก่อนสอบ {#summary}

- Positional และ Special Parameters: ช่องว่างในข้อมูลจะเพิ่ม arguments หากไม่ quote
- รักษา Arguments ด้วย "$@": อย่าใช้ $@ แบบไม่ quote กับชื่อไฟล์มีช่องว่าง
- shift และการประมวลผล Options: อย่าถือว่าทุก shift สำเร็จ
- ตรวจ Input ก่อนใช้: Bash arithmetic ไม่ใช่ parser ข้อมูลที่ปลอดภัยโดยอัตโนมัติ
- ประยุกต์ H6: Student Record แบบข้อมูลสมมติ: รูปแบบ timestamp ไม่รับประกันชื่อไม่ซ้ำในนาทีเดียว

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U09 pp.15–19; U10 pp.2–3; H6; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
