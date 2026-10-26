---
{"version":1,"id":"unix-tools-final-tests-conditions","course":"unix-tools","category":"summaries","slug":"final-tests-conditions","title":"FINAL 05 — test, if และ Conditions","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายเหตุที่ [ "$x" = yes ] ปลอดภัยกว่าไม่quote
- อธิบายความต่าง string equality กับ integer equality
- ออกแบบทดสอบค่า79,80,100และค่าผิดช่วง
- อธิบาย -e,-f,-d,-s และข้อจำกัด time-of-check
- เปรียบเทียบ glob ใน == กับ regex ใน =~

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U10 pp.6–13; U11 pp.1–8. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## test และ [ ] เป็นคำสั่ง {#test-syntax}

`[ "$x" = yes ]` ต้องเว้นวรรคเพื่อแยกชื่อคำสั่งและ arguments; ] คือ argument ปิดท้าย ใช้ quote เพื่อไม่ให้ค่าว่าง/ช่องว่างเปลี่ยนจำนวน arguments คำสั่ง test คืน status ไม่ได้พิมพ์ true/false

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
[ yes = yes ]; printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
0
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | string ตรงกันจึงสำเร็จ |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux05-q01 |

ข้อควรระวัง: [ ไม่ใช่วงเล็บทั่วไปและ == ไม่ใช่ numeric comparison

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-test-syntax}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| test ส่งสถานะ | `0` | string ตรงกันจึงสำเร็จ |
| empty quote | `0` | empty เป็น argument ชัดเจน |
| ปิดวงเล็บผิด | `2` | ไม่มี ] เป็น syntax ของ test ที่ผิด |
| test ไม่พิมพ์ค่า | `done` | test คืน status ไม่มี stdout |
| NOT | `0` | กลับ false เป็น true |


## เปรียบเทียบตัวเลขกับ String {#numbers-strings}

ใช้ -eq/-ne/-lt/-le/-gt/-ge กับจำนวนเต็ม; =/!= เทียบข้อความ; -z/-n ตรวจความยาว กรณี [[ ]] การ >/< เทียบ string ตาม locale ไม่ใช่ numerical order ใช้ LC_ALL=C เมื่อผลต้องแน่นอน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
[ 01 -eq 1 ]; printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
0
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | integer test มองสองค่าตรงกัน |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux05-q06 |

ข้อควรระวัง: ตัวเลข9อาจเรียงหลัง10แบบ string แต่ไม่ใช่ค่าที่มากกว่าเชิงคณิต

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-numbers-strings}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| numeric equality | `0` | integer test มองสองค่าตรงกัน |
| string equality | `1` | ข้อความต่างรูปกัน |
| ว่างกับช่องว่าง | `1` | ช่องว่างหนึ่งตัวไม่ใช่ zero length |
| lexicographic comparison | `0` | LC_ALL=C เรียง string9หลัง1 |
| numeric less equal | `0` | -le รวมเท่ากัน |


## if/elif/else และรอยต่อคะแนน {#branching}

if ตรวจ status คำสั่ง เลือกแขนแรกที่สำเร็จ จากนั้นไม่ทดสอบ elif ถัดไป Grade thresholds ควรเรียงจากสูงลงต่ำและตรวจช่วง0..100ก่อน ต้องตกลงเครื่องหมายเท่ากับชัดเจน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
s=80; if ((s>=80)); then printf A; elif ((s>=70)); then printf B; else printf C; fi
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
A
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | แขนแรกตรงที่80 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux05-q11 |

ข้อควรระวัง: ช่วงทับซ้อนหรือสลับลำดับทำให้เกรดผิด

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-branching}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| รอยต่อ80 | `A` | แขนแรกตรงที่80 |
| เลือกแขนแรก | `positive` | elifไม่ถูกประเมินเมื่อแขนแรกผ่าน |
| if ไม่มีแขนตรง | `0` | if ไม่มี conditiontrue และไม่มีelseคืน0 |
| nested condition | `even` | บวกและคู่จึงพิมพ์ |
| validation ก่อนเกรด | `invalid` | ปฏิเสธค่าผิดช่วงก่อนคิดเกรด |


## File Tests และสิทธิ {#files}

-e มีอยู่ -f ไฟล์ธรรมดา -d directory -s ขนาดมากกว่า0; -r/-w/-x ตรวจตามสิทธิที่ process เห็น ไม่ใช่ตัดสิน owner bits อย่างเดียว root/ACL อาจต่างกัน -ef ตรวจว่าอ้างไฟล์เดียวกัน ตรวจไฟล์ล่วงหน้าไม่ป้องกัน race ระหว่างตรวจและเปิด

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
touch empty; [ -s empty ]; printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
1
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | มีไฟล์แต่ขนาด0 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux05-q16 |

ข้อควรระวัง: อย่าใช้ผลรัน root มายืนยันว่าผู้ใช้ทุกคนอ่านไฟล์ได้

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-files}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ไฟล์ว่าง | `1` | มีไฟล์แต่ขนาด0 |
| directory ไม่ใช่ regular file | `1` | -f ไม่รับ directory |
| hard link identity | `0` | สองชื่ออ้าง inode เดียวกัน |
| symbolic link เสีย | `1` | -e ตาม link แล้วไม่พบเป้าหมาย |
| ตรวจชนิด symlink | `0` | -L ตรวจ link เองจึงยังจริง |


## [[ ]], Patterns และ Regex {#bash-conditions}

[[ ]] เป็น Bash construct ไม่ทำ word splitting/pathname expansion ปกติใน operands `[[ $x == A* ]]` ใช้ pattern แต่ RHS ที่ quoteเป็น literal `[[ $x =~ regex ]]` ใช้ ERE; ถ้า quoteทั้ง regex จะเปลี่ยนความหมาย ห้ามสับสนกับ glob

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
x=Alpha; [[ $x == A* ]]; printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
0
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | A* ตรงกับ Alpha |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux05-q21 |

ข้อควรระวัง: [ "$a" > "$b" ] อาจสร้างไฟล์เพราะ > เป็น redirect

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-bash-conditions}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| pattern RHS ไม่quote | `0` | A* ตรงกับ Alpha |
| literal RHS quote | `1` | quote ทำให้ * เป็น literal |
| ERE ทั้งสาย | `1` | anchorไม่อนุญาต x |
| regex ตัวแปรไม่quote | `0` | ERE a+ ตรงกับ aaa |
| redirect ใน [ ] | `0` | > สร้างtarget ไม่ใช่ string compare แบบ [[ ]] |


## กับดักและกรณีขอบ {#mistakes}

- [ ไม่ใช่วงเล็บทั่วไปและ == ไม่ใช่ numeric comparison
- ตัวเลข9อาจเรียงหลัง10แบบ string แต่ไม่ใช่ค่าที่มากกว่าเชิงคณิต
- ช่วงทับซ้อนหรือสลับลำดับทำให้เกรดผิด
- อย่าใช้ผลรัน root มายืนยันว่าผู้ใช้ทุกคนอ่านไฟล์ได้
- [ "$a" > "$b" ] อาจสร้างไฟล์เพราะ > เป็น redirect

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. test และ [ ] เป็นคำสั่ง {#review-test-syntax}

อธิบายเหตุที่ [ "$x" = yes ] ปลอดภัยกว่าไม่quote

แนวคำตอบ: แสดง arguments ที่ test เห็นเมื่อ x ว่างหรือมีช่องว่าง

### 2. เปรียบเทียบตัวเลขกับ String {#review-numbers-strings}

อธิบายความต่าง string equality กับ integer equality

แนวคำตอบ: ยกตัวอย่าง 01 กับ1 และระบุว่าตรวจรูปแบบ input ก่อน test

### 3. if/elif/else และรอยต่อคะแนน {#review-branching}

ออกแบบทดสอบค่า79,80,100และค่าผิดช่วง

แนวคำตอบ: ระบุ input validation และคาดหมายแต่ละขอบโดยไม่อ้างว่าเป็นเกรดมหาวิทยาลัยจริง

### 4. File Tests และสิทธิ {#review-files}

อธิบาย -e,-f,-d,-s และข้อจำกัด time-of-check

แนวคำตอบ: แยกชนิด/ขนาด/สิทธิและยังต้องจัดการ error ตอนเปิดจริง

### 5. [[ ]], Patterns และ Regex {#review-bash-conditions}

เปรียบเทียบ glob ใน == กับ regex ใน =~

แนวคำตอบ: ระบุ anchoring และผล quote RHS พร้อมแยก string/numeric

## สรุปก่อนสอบ {#summary}

- test และ [ ] เป็นคำสั่ง: [ ไม่ใช่วงเล็บทั่วไปและ == ไม่ใช่ numeric comparison
- เปรียบเทียบตัวเลขกับ String: ตัวเลข9อาจเรียงหลัง10แบบ string แต่ไม่ใช่ค่าที่มากกว่าเชิงคณิต
- if/elif/else และรอยต่อคะแนน: ช่วงทับซ้อนหรือสลับลำดับทำให้เกรดผิด
- File Tests และสิทธิ: อย่าใช้ผลรัน root มายืนยันว่าผู้ใช้ทุกคนอ่านไฟล์ได้
- [[ ]], Patterns และ Regex: [ "$a" > "$b" ] อาจสร้างไฟล์เพราะ > เป็น redirect

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U10 pp.6–13; U11 pp.1–8; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
