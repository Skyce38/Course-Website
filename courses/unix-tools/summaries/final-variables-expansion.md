---
{"version":1,"id":"unix-tools-final-variables-expansion","course":"unix-tools","category":"summaries","slug":"final-variables-expansion","title":"FINAL 02 — ตัวแปร Quoting และ Expansion","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบาย export กับ local พร้อมผลกระทบต่อลูกและแม่
- อธิบาย printf กับ single/double quotes เมื่อค่ามีช่องว่าง
- ติดตาม expansion ของ v ที่มีช่องว่างและ glob ใน directory ที่กำหนด
- เปรียบเทียบ :-, -, := และ :? ใน unset/empty/set
- อธิบายการแยกชื่อไฟล์กับนามสกุลโดยไม่ใช้ regex

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U10 pp.1–5; U15 pp.7–8; UA pp.13–19. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Assignment, Environment และ Scope {#assignment}

กำหนด `name=value` โดยไม่มีช่องว่างรอบ =; assignment เก็บข้อความแต่ arithmetic ตีความเป็นเลขได้ `export` ทำให้ค่าปรากฏใน environment ของลูก `readonly` ห้ามเปลี่ยน/ถอนใน shell นั้น `local` ใช้ในฟังก์ชันและ Bash ใช้ dynamic scope

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
v=2+3; printf '%s' "$v"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2+3
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ไม่เกิด arithmetic expansion |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux02-q01 |

ข้อควรระวัง: อย่าสับสน shell variable กับ environment และอย่าให้ชื่อชนตัวแปรระบบ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-assignment}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| assignment เก็บข้อความ | `2+3` | ไม่เกิด arithmetic expansion |
| export สู่ลูก | `green` | export ให้ shell ลูกเห็นค่า |
| ไม่ export | `<unset>` | ตัวแปรธรรมดาไม่ได้ส่งให้ bash ลูก |
| local คืนค่าเดิม | `outer` | local ไม่ทับ binding ภายนอก |
| readonly ใน shell ลูก | `1` | assignment readonly เป็น error ของ Bash noninteractive |


## Single Quote, Double Quote และ Escaping {#quoting}

Single quotes รักษาอักขระทุกตัวด้านใน Double quotes ยังขยาย $var และ $(...) แต่ป้องกัน word splitting/globbing ของผลลัพธ์ ใช้ backslash quote อักขระเฉพาะตัวและ `printf` format คงที่ อย่าใช้ข้อมูลผู้ใช้เป็น format

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
v=green; printf '%s' '$v'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
$v
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | single quote ไม่ขยายตัวแปร |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux02-q06 |

ข้อควรระวัง: quote ไม่ได้หมายถึงปิด expansion ทุกชนิด

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-quoting}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| single quote | `$v` | single quote ไม่ขยายตัวแปร |
| double quote | `<red blue>` | double quote รักษาเป็นหนึ่ง argument |
| backslash ป้องกัน dollar | `$v` | backslash ทำ $ เป็น literal |
| quote ส่วนติดกัน | `redblue` | ส่วน quote ติดกันเป็น word เดียว |
| format ไม่ใช่ข้อมูล | `%s` | format คงที่ป้องกันข้อมูลเป็น format directive |


## Word Splitting กับ Filename Expansion {#splitting}

ผล expansion ที่ไม่ quote ในบริบท argument ผ่าน word splitting ตาม IFS แล้ว filename expansion ตาม glob; literal คำใน source ไม่ถูก split ซ้ำทุกบริบท Assignment ไม่ทำสองขั้นนี้โดยทั่วไป `set -f` ปิด glob ไม่ปิด splitting

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
v='red blue'; set -- $v; printf '%s' "$#"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | default IFS แยกช่องว่างเป็นสอง args |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux02-q11 |

ข้อควรระวัง: ค่าที่มี * อาจกลายเป็นหลายชื่อไฟล์อย่างไม่ตั้งใจ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-splitting}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| splitting ค่าไม่ quote | `2` | default IFS แยกช่องว่างเป็นสอง args |
| globbing หลัง expansion | `2` | glob พบไฟล์ txt สองไฟล์ใน temp |
| ปิด glob | `*.txt` | -f ปิด filename expansion |
| IFS กำหนดตัวคั่น | `3` | colon เป็นตัวคั่นสาม fields |
| assignment ไม่แตกคำ | `3` | assignment รักษาช่องว่างหนึ่งตัวใน a b |


## Unset, Empty และ Default Expansion {#defaults}

`${v:-d}` ใช้ default เมื่อ unset หรือ empty แต่ไม่ assign; `${v-d}` ตรวจเฉพาะ unset; `${v:=d}` assign เมื่อ unset/empty เท่านั้น `${v:?msg}` แสดง error และทำให้ noninteractive shell ยุติเมื่อค่าว่าง/ไม่ตั้ง ไม่ใช่เพียงพิมพ์แล้วทำต่อ

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
unset v; x=${v:-d}; printf '%s:%s' "$x" "${v-unset}"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
d:unset
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | :- ไม่ตั้งค่าให้ v |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux02-q16 |

ข้อควรระวัง: Lect15 pp.7–8 มี prose ขัดกัน ใช้ semantics จาก Bash manual และการทดลอง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-defaults}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| default ไม่ assign | `d:unset` | :- ไม่ตั้งค่าให้ v |
| empty กับไม่มี colon | `<>:<d>` | แบบ - ตรวจเฉพาะ unset; :- ตรวจ empty ด้วย |
| assign default | `d` | := assign เมื่อ unset |
| ไม่ overwrite ค่าที่มี | `old` | := ไม่แทนค่าที่ไม่ว่าง |
| required ขัดจังหวะ shell | `done` | noninteractive shell ลูกหยุดก่อน printf wrong |


## ความยาว ตัด Prefix/Suffix และแทนข้อความ {#transform}

`${#v}` คืนความยาว `${v#pattern}`/`${v##pattern}` ตัด prefix สั้น/ยาวที่สุด `${v%pattern}`/`${v%%pattern}` ตัด suffix; pattern เป็น shell glob ไม่ใช่ regex `${v/old/new}` แทนครั้งแรก `${v//old/new}` แทนทุกครั้ง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
name=lab; printf '%s' "${name}_report"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
lab_report
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | braces ระบุชื่อ name ชัดเจน |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux02-q21 |

ข้อควรระวัง: braces แยกชื่อ เช่น ${name}_report ไม่ใช่ $name_report

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-transform}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| แยกชื่อตัวแปร | `lab_report` | braces ระบุชื่อ name ชัดเจน |
| prefix สั้นสุด | `b/c` | # ตัดถึง slash แรก |
| prefix ยาวสุด | `c` | ## ตัด prefix ที่ตรงยาวสุด |
| suffix สั้นสุด | `report.tar` | % ตัด .gz |
| แทนทุก match | `bonono` | // แทน a ทุกตำแหน่ง |


## กับดักและกรณีขอบ {#mistakes}

- อย่าสับสน shell variable กับ environment และอย่าให้ชื่อชนตัวแปรระบบ
- quote ไม่ได้หมายถึงปิด expansion ทุกชนิด
- ค่าที่มี * อาจกลายเป็นหลายชื่อไฟล์อย่างไม่ตั้งใจ
- Lect15 pp.7–8 มี prose ขัดกัน ใช้ semantics จาก Bash manual และการทดลอง
- braces แยกชื่อ เช่น ${name}_report ไม่ใช่ $name_report

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Assignment, Environment และ Scope {#review-assignment}

อธิบาย export กับ local พร้อมผลกระทบต่อลูกและแม่

แนวคำตอบ: ส่งค่าเริ่มต้นไปลูก ส่วน local จำกัด lifetime ในฟังก์ชัน ไม่ทำให้ลูกแก้แม่

### 2. Single Quote, Double Quote และ Escaping {#review-quoting}

อธิบาย printf กับ single/double quotes เมื่อค่ามีช่องว่าง

แนวคำตอบ: แยก expansion ออกจาก splitting และ quote format/arguments

### 3. Word Splitting กับ Filename Expansion {#review-splitting}

ติดตาม expansion ของ v ที่มีช่องว่างและ glob ใน directory ที่กำหนด

แนวคำตอบ: ระบุค่าหลังแต่ละขั้นและเปรียบเทียบกับ "$v" โดยไม่เดาจาก directory จริง

### 4. Unset, Empty และ Default Expansion {#review-defaults}

เปรียบเทียบ :-, -, := และ :? ใน unset/empty/set

แนวคำตอบ: ทำตารางครบสามสถานะและแยกผลการขยายกับการเปลี่ยนตัวแปร

### 5. ความยาว ตัด Prefix/Suffix และแทนข้อความ {#review-transform}

อธิบายการแยกชื่อไฟล์กับนามสกุลโดยไม่ใช้ regex

แนวคำตอบ: เลือก #/% และจำนวนเครื่องหมายให้สอดคล้องกับ prefix/suffix และระบุกรณีจุดหลายตัว

## สรุปก่อนสอบ {#summary}

- Assignment, Environment และ Scope: อย่าสับสน shell variable กับ environment และอย่าให้ชื่อชนตัวแปรระบบ
- Single Quote, Double Quote และ Escaping: quote ไม่ได้หมายถึงปิด expansion ทุกชนิด
- Word Splitting กับ Filename Expansion: ค่าที่มี * อาจกลายเป็นหลายชื่อไฟล์อย่างไม่ตั้งใจ
- Unset, Empty และ Default Expansion: Lect15 pp.7–8 มี prose ขัดกัน ใช้ semantics จาก Bash manual และการทดลอง
- ความยาว ตัด Prefix/Suffix และแทนข้อความ: braces แยกชื่อ เช่น ${name}_report ไม่ใช่ $name_report

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U10 pp.1–5; U15 pp.7–8; UA pp.13–19; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
