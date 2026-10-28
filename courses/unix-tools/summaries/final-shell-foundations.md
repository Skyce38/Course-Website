---
{"version":1,"id":"unix-tools-final-shell-foundations","course":"unix-tools","category":"summaries","slug":"final-shell-foundations","title":"FINAL 01 — พื้นฐาน Shell Script (Shell Foundations)","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบาย bash script.sh กับ ./script.sh และ sh script.sh ต่างกันอย่างไร
- วางแผนตรวจ script โดยไม่เผยค่าลับผ่าน trace
- เปรียบเทียบ source, subshell และ shell ลูกจากการเปลี่ยนค่า x
- อธิบายสิ่งที่ command substitution เก็บและสิ่งที่สูญเสีย
- ออกแบบการทดสอบ archive ที่ไม่แตะไฟล์จริง

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U09 pp.1–14. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## เลือก Interpreter และรันสคริปต์ {#execution}

Shell เป็นตัวแปลคำสั่ง (command interpreter) และเป็นภาษาเขียนสคริปต์ ใช้ `#!/usr/bin/env bash` เมื่อเรียกไฟล์โดยตรงและต้องการ Bash จาก PATH; ระบบต้องมี env และ Bash ที่เชื่อถือได้ การเรียก `bash file.sh` เลือก Bash เองและไม่ต้องมี execute bit ของไฟล์ แต่ต้องอ่านไฟล์ได้ `sh file.sh` ไม่รับประกัน Bash syntax และ shebang ไม่ได้เปลี่ยน interpreter ที่สั่งโดยตรง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
bash -c 'printf Bash'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
Bash
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | bash -c เลือก Bash โดยตรง |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux01-q01 |

ข้อควรระวัง: อย่าใช้ sh กับ arrays หรือ [[ ]] โดยสมมติว่าเท่ากับ Bash

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-execution}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| สั่ง Bash โดยตรง | `Bash` | bash -c เลือก Bash โดยตรง |
| สิทธิไฟล์กับการอ่าน | `ok` | Bash อ่าน script ได้แม้ไม่มี execute bit |
| Shebang ไม่ใช่คำสั่งพิมพ์ | `hello` | บรรทัด #! เป็น comment เมื่อ Bash อ่านไฟล์ |
| ตำแหน่ง script ใน PATH | `found` | PATH เพิ่ม directory ที่มีคำสั่ง executable |
| คืนสถานะ shell ลูก | `7` | status shell ลูกถูกส่งกลับ ไม่ใช่ stdout |


## Builtins, Syntax Check และ Trace {#builtins}

`type` และ `command -v` ใช้ตรวจการค้นคำสั่ง `help` อธิบาย Bash builtins เช่น cd, printf, read การเปลี่ยน directory ต้องมีผลกับ shell ปัจจุบัน `bash -n` ตรวจไวยากรณ์แต่ไม่ตรวจว่าคำสั่งมีจริงหรือคำตอบถูก `bash -x` รันจริงและส่ง trace ไป stderr ห้ามใช้ trace กับความลับ

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
type -t cd
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
builtin
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | cd เป็น Bash builtin |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux01-q06 |

ข้อควรระวัง: ตรวจ syntax ผ่านไม่ได้แปลว่าโปรแกรมถูกเชิงความหมาย

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-builtins}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ชนิดของ cd | `builtin` | cd เป็น Bash builtin |
| ตรวจ syntax ไม่รัน | `checked` | -n ไม่รัน printf ในไฟล์ |
| syntax ผ่านแต่คำสั่งไม่จำเป็นต้องมี | `0` | -n ไม่ตรวจ command lookup |
| ตรวจ syntax เสียโดยจับ stderr | `2` | Bash ตรวจพบ if ที่ไม่มี fi คืน 2 |
| trace คนละ stream | `data:1` | stdout เป็น data; trace ที่ stderr มี printf หนึ่งบรรทัด |


## Shell ลูก, Subshell และ source {#processes}

`bash script.sh` เริ่ม shell ลูก `source script.sh` รันใน shell ปัจจุบันจึงเปลี่ยนตัวแปรและ directory ได้ `( commands )` แยกสภาพแวดล้อมใน subshell ส่วน `{ commands; }` ใช้ shell เดิม `export` ส่งค่าเริ่มต้นไปลูก ไม่ได้แชร์การแก้ไขกลับแม่

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
x=old; bash -c 'x=new'; printf '%s' "$x"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
old
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ลูกไม่มีทางแก้ตัวแปรแม่ด้วย assignment นี้ |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux01-q11 |

ข้อควรระวัง: source ไฟล์ที่ไม่เชื่อถือเท่ากับรันคำสั่งใน shell ของเรา

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-processes}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ตัวแปรใน shell ลูก | `old` | ลูกไม่มีทางแก้ตัวแปรแม่ด้วย assignment นี้ |
| source ตั้งค่าแม่ | `new` | source ทำใน shell ปัจจุบัน |
| วงเล็บ subshell | `1` | assignment ใน subshell ไม่ย้อนกลับ |
| brace group | `2` | brace group ใช้ shell ปัจจุบัน |
| export เป็นสำเนาเริ่มต้น | `parent` | export ไม่ใช่ shared mutable state |


## Command Substitution และการจัดกลุ่ม {#substitution}

`$(command)` เก็บ stdout และตัด newline ท้ายทั้งหมด ไม่เก็บ stderr โดยอัตโนมัติ Quote ผลลัพธ์เพื่อรักษาช่องว่าง/บรรทัดภายใน `{ a; b; }` รวมคำสั่งใน shell เดิมและเปลี่ยนทิศทางทั้งกลุ่มได้ `a; b` รันต่อโดยไม่ตรวจความสำเร็จของ a

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
x=$(printf 'A\n\n'); printf '%s' "${#x}"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | newline ท้ายสองตัวถูกตัด เหลือ A |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux01-q16 |

ข้อควรระวัง: output กับ exit status เป็นคนละช่องทาง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-substitution}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ตัด newline ท้าย | `1` | newline ท้ายสองตัวถูกตัด เหลือ A |
| เก็บ newline ภายใน | `3` | A newline B รวมสามอักขระ ASCII |
| ไม่เก็บ stderr | `out` | stderr แยกต่างหาก มี err แต่ stdout ของ script นี้คือ out |
| group redirect | `AB` | ทั้งกลุ่มเขียน stdout ไป log |
| semicolon ไม่ short circuit | `later` | ; ทำคำสั่งต่อแม้ก่อนหน้าคืน nonzero |


## เครื่องมือพื้นฐานและความปลอดภัย {#utilities}

ใช้ `printf` แทน echo เมื่อ format ต้องแน่นอน `pwd`, `wc`, `sort`, `tar -cf`, `tar -tf`, `tar -xf` ใช้ตรวจ directory/ข้อมูล/archive ได้ Job control เช่น jobs, fg, bg เกี่ยวกับ interactive shell; สคริปต์ noninteractive มักปิด job control ต้องแยกงานทบทวนออกจากคำสั่งที่ทำลาย process จริง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf '%s:%02d' item 7
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
item:07
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | %02d เติมศูนย์ซ้ายครบสองหลัก |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux01-q21 |

ข้อควรระวัง: ทดสอบไฟล์ใน directory ชั่วคราว ห้ามทดลอง kill หรือ overwrite กับข้อมูลจริง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-utilities}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| format คงที่ | `item:07` | %02d เติมศูนย์ซ้ายครบสองหลัก |
| นับบรรทัดไม่ใช่คำ | `2` | มี newline สองตัว |
| ดู archive | `a` | tar -tf แสดงชื่อสมาชิก ไม่พิมพ์ข้อมูลใน a |
| builtin true | `0` | true สำเร็จโดยไม่พิมพ์ข้อมูล |
| cd ใน subshell | `0` | shell แม่ยังอยู่ parent จึงพบ child |


## กับดักและกรณีขอบ {#mistakes}

- อย่าใช้ sh กับ arrays หรือ [[ ]] โดยสมมติว่าเท่ากับ Bash
- ตรวจ syntax ผ่านไม่ได้แปลว่าโปรแกรมถูกเชิงความหมาย
- source ไฟล์ที่ไม่เชื่อถือเท่ากับรันคำสั่งใน shell ของเรา
- output กับ exit status เป็นคนละช่องทาง
- ทดสอบไฟล์ใน directory ชั่วคราว ห้ามทดลอง kill หรือ overwrite กับข้อมูลจริง

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. เลือก Interpreter และรันสคริปต์ {#review-execution}

อธิบาย bash script.sh กับ ./script.sh และ sh script.sh ต่างกันอย่างไร

แนวคำตอบ: ระบุ interpreter, สิทธิอ่าน/execute, shebang และ PATH โดยไม่อ้างว่า sh คือ Bash เสมอ

### 2. Builtins, Syntax Check และ Trace {#review-builtins}

วางแผนตรวจ script โดยไม่เผยค่าลับผ่าน trace

แนวคำตอบ: เริ่ม bash -n แล้วทดสอบ input ใน directory ชั่วคราว ใช้ -x เฉพาะข้อมูลสมมติและแยก stderr

### 3. Shell ลูก, Subshell และ source {#review-processes}

เปรียบเทียบ source, subshell และ shell ลูกจากการเปลี่ยนค่า x

แนวคำตอบ: ติดตามค่า x ก่อน/ภายใน/หลังแต่ละกรณี และระบุว่าลูกไม่แก้แม่

### 4. Command Substitution และการจัดกลุ่ม {#review-substitution}

อธิบายสิ่งที่ command substitution เก็บและสิ่งที่สูญเสีย

แนวคำตอบ: stdout เท่านั้นและตัด trailing newlines; quote รักษา whitespace ภายใน แต่ตัวแปร Bash เก็บ NUL ไม่ได้

### 5. เครื่องมือพื้นฐานและความปลอดภัย {#review-utilities}

ออกแบบการทดสอบ archive ที่ไม่แตะไฟล์จริง

แนวคำตอบ: สร้างข้อมูลสมมติใน temp ตรวจ tar -tf และแตกใน directory ว่าง ไม่เชื่อ path ใน archive ที่ไม่รู้ที่มา

## สรุปก่อนสอบ {#summary}

- เลือก Interpreter และรันสคริปต์: อย่าใช้ sh กับ arrays หรือ [[ ]] โดยสมมติว่าเท่ากับ Bash
- Builtins, Syntax Check และ Trace: ตรวจ syntax ผ่านไม่ได้แปลว่าโปรแกรมถูกเชิงความหมาย
- Shell ลูก, Subshell และ source: source ไฟล์ที่ไม่เชื่อถือเท่ากับรันคำสั่งใน shell ของเรา
- Command Substitution และการจัดกลุ่ม: output กับ exit status เป็นคนละช่องทาง
- เครื่องมือพื้นฐานและความปลอดภัย: ทดสอบไฟล์ใน directory ชั่วคราว ห้ามทดลอง kill หรือ overwrite กับข้อมูลจริง

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U09 pp.1–14; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
