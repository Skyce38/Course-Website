---
{"version":1,"id":"unix-tools-final-redirection","course":"unix-tools","category":"summaries","slug":"final-redirection","title":"FINAL 06 — Redirection และ File Descriptors","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- วาด mapping fd0/1/2ก่อนและหลัง redirect
- วาด mappingของสองคำสั่งที่สลับลำดับและทำนายไฟล์กับจอ
- อธิบาย truncate ผ่าน hard link และลบชื่อหนึ่ง
- ออกแบบคัดลอกด้วยfd3/4พร้อมคืนstatusของcat
- วางแผนทดสอบhw5โดยไม่ยึดข้อความerrorเฉพาะเครื่อง

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U15 pp.2–6; U11 pp.9–13; UR pp.3–5; UF pp.6–10; H5. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## stdin, stdout, stderr {#streams}

File descriptors0,1,2 ปกติใช้กับ stdin,stdout,stderr แต่อาจถูกปิดหรือเปลี่ยนปลายทางได้ ไม่ใช่รับประกันผูกกับจอ/คีย์บอร์ดตลอด `>` redirect stdout, `2>` stderr, `<` stdin ข้อความ error ควรส่ง stderr

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
{ printf O; printf E >&2; } >out 2>err; printf '%s:%s' "$(cat out)" "$(cat err)"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
O:E
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | fd1เขียนout fd2เขียนerr |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux06-q01 |

ข้อควรระวัง: เห็นข้อความบนจอไม่บอกว่าเป็นstdoutหรือstderr

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-streams}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| แยกstdoutstderr | `O:E` | fd1เขียนout fd2เขียนerr |
| stdin redirect | `3` | wcอ่าน3bytesจากstdin |
| diagnostic ตามstderr | `data` | Usageอยู่stderrไม่ใช่stdout |
| เฉพาะstderrเข้าไฟล์ | `OE` | Oออกstdoutทันทีแล้วcatแสดงE |
| stdin fd0 | `word` | readได้wordแม้ไม่มีnewlineแต่ตัวแปรยังมีข้อมูล |


## ลำดับ Redirection {#redirect-order}

Shell จัด redirect ซ้ายไปขวา `>log 2>&1` ผูกstdoutกับlogก่อนแล้วstderrตาม ส่วน `2>&1 >log` ทำstderrตามปลายทางstdoutเดิมก่อน stdoutจึงเปลี่ยนทีหลัง การ duplicate fd ไม่ได้เป็นการเชื่อมที่ตามการเปลี่ยนอนาคต

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
{ printf O; printf E >&2; } >log 2>&1; cat log
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
OE
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ทั้งสองfdไปlogเดียวกัน |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux06-q06 |

ข้อควรระวัง: 2>&1 ไม่ใช่สั่งให้stdoutไปstderr

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-redirect-order}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| stdoutก่อนduplicate | `OE` | ทั้งสองfdไปlogเดียวกัน |
| duplicateก่อนstdout | `E:O` | Eไปstdoutเดิม Oไปlog |
| หลายredirectท้ายสุด | `0:x` | aถูกเปิดแล้วbเป็นstdoutสุดท้าย |
| ทิศทางdup stdoutไปstderr | `0` | 1>&2ส่งข้อความไปerr |
| ปิดstderrชั่วคราว | `O` | ปิดfd2ไม่ปิดstdout |


## Truncate, Append และ Hard Links {#files-links}

`>` เปิด/ตัดไฟล์ก่อนเริ่มคำสั่ง `>>` ต่อท้าย `cat file >file` ทำให้ข้อมูลหายก่อนcatอ่าน ใช้tempแล้วเปลี่ยนชื่ออย่างปลอดภัย Hard links เป็นหลายชื่อของไฟล์เดียวในfilesystemเดียว ลบชื่อหนึ่งไม่จำเป็นต้องลบข้อมูล ต้นฉบับที่ parse ls ไม่ปลอดภัยกับชื่อซับซ้อน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf A >f; printf B >>f; cat f
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
AB
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | >>ต่อท้าย |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux06-q11 |

ข้อควรระวัง: อย่าทดสอบoverwriteกับไฟล์ผู้ใช้

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-files-links}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| appendไม่truncate | `AB` | >>ต่อท้าย |
| catไฟล์ตัวเอง | `0` | truncateก่อนcatอ่าน |
| hardlinkเห็นการเขียน | `B` | ทั้งสองชื่ออ้างข้อมูลเดียวกัน |
| ลบชื่อหนึ่ง | `x` | อีกhardlinkยังอยู่ |
| truncateแม้commandล้มเหลว | `0` | redirectเกิดก่อนfalse |


## exec และ Descriptor เพิ่มเติม {#descriptors}

`exec 3<file` เปิดfd3อ่านในshellปัจจุบัน `read -u3` อ่านจากfd3 `exec 3<&-` ปิด ส่วน `exec 4>out` เปิดเขียน ปิดด้วย4>&- `>&2` ส่งstdoutไปstderr ตรงข้ามความเข้าใจผิดจาก `2>&1` ในUsageตัวอย่าง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'alpha
beta
' >f; exec 3<f; read -r -u3 x; exec 3<&-; printf '%s' "$x"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
alpha
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | readหนึ่งบรรทัดจากfd3 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux06-q16 |

ข้อควรระวัง: duplication เพื่อเขียนควรใช้ >& ไม่ใช่สื่อว่าเป็นinput

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-descriptors}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| fd3อ่าน | `alpha` | readหนึ่งบรรทัดจากfd3 |
| fd4เขียน | `data` | stdoutของprintfduplicateไปfd4 |
| fdที่ปิด | `1` | readจากfdปิดล้มเหลว |
| save stdoutแล้วrestore | `visible` | หลังrestorestdoutกลับปลายทางเดิม |
| copy ด้วยfd | `input` | catเชื่อมfd3เข้ากับfd4 |


## noclobber, Pipelines และ hw5 {#noclobber-pipes}

`set -o noclobber` ป้องกัน > ทับregularfileที่มีอยู่ `>|` bypassโดยเจตนาและ>>ยังต่อท้าย Pipelineส่งstdoutของคำสั่งซ้ายไปstdinขวา ไม่ส่งstderrโดยปริยาย H5ให้ทดลองไฟล์ที่หายกับที่มีอยู่ ต้องจับstreamแยก ไม่เปรียบเทียบข้อความerrorที่อาจต่างเวอร์ชัน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf old >f; set -C; { printf new >f; } 2>/dev/null; cat f
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
old
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | -Cป้องกันtruncateไฟล์เดิม |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux06-q21 |

ข้อควรระวัง: pipelineไม่รับประกันลำดับstdout/stderrเมื่อรวมจากหลายprocess

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-noclobber-pipes}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| noclobberป้องกันเดิม | `old` | -Cป้องกันtruncateไฟล์เดิม |
| บังคับoverwrite | `new` | >/ข้ามnoclobber |
| appendแม้noclobber | `oldnew` | >>ยังต่อท้าย |
| pipeรับเฉพาะstdout | `1` | pipeมีOหนึ่งbyte Eอยู่err |
| H5missingfileยังอ่านไฟล์ถัดไป | `1:known` | GNUcatรายงานmissingแต่ยังอ่านyesและคืน1 |


## กับดักและกรณีขอบ {#mistakes}

- เห็นข้อความบนจอไม่บอกว่าเป็นstdoutหรือstderr
- 2>&1 ไม่ใช่สั่งให้stdoutไปstderr
- อย่าทดสอบoverwriteกับไฟล์ผู้ใช้
- duplication เพื่อเขียนควรใช้ >& ไม่ใช่สื่อว่าเป็นinput
- pipelineไม่รับประกันลำดับstdout/stderrเมื่อรวมจากหลายprocess

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. stdin, stdout, stderr {#review-streams}

วาด mapping fd0/1/2ก่อนและหลัง redirect

แนวคำตอบ: แยก descriptor จากไฟล์ปลายทางและอธิบายว่าstdoutกับstderrอาจอยู่จอเดียวกัน

### 2. ลำดับ Redirection {#review-redirect-order}

วาด mappingของสองคำสั่งที่สลับลำดับและทำนายไฟล์กับจอ

แนวคำตอบ: ระบุปลายทางเดิมก่อนคัดลอกแต่ละขั้น ไม่ใช้คำว่าไปจอเสมอ

### 3. Truncate, Append และ Hard Links {#review-files-links}

อธิบาย truncate ผ่าน hard link และลบชื่อหนึ่ง

แนวคำตอบ: แยก directory entry, inode, open fd และข้อมูลที่ยังมีชื่อหรือผู้เปิดใช้งาน

### 4. exec และ Descriptor เพิ่มเติม {#review-descriptors}

ออกแบบคัดลอกด้วยfd3/4พร้อมคืนstatusของcat

แนวคำตอบ: เปิด/ตรวจerror/อ่านเขียน/ปิดและเก็บstatusก่อนcleanupโดยไม่ทำให้สำเร็จปลอม

### 5. noclobber, Pipelines และ hw5 {#review-noclobber-pipes}

วางแผนทดสอบhw5โดยไม่ยึดข้อความerrorเฉพาะเครื่อง

แนวคำตอบ: ตรวจเนื้อหาไฟล์ที่รู้แน่ stdout/stderrแยก และสถานะnonzeroเมื่อมีไฟล์หาย

## สรุปก่อนสอบ {#summary}

- stdin, stdout, stderr: เห็นข้อความบนจอไม่บอกว่าเป็นstdoutหรือstderr
- ลำดับ Redirection: 2>&1 ไม่ใช่สั่งให้stdoutไปstderr
- Truncate, Append และ Hard Links: อย่าทดสอบoverwriteกับไฟล์ผู้ใช้
- exec และ Descriptor เพิ่มเติม: duplication เพื่อเขียนควรใช้ >& ไม่ใช่สื่อว่าเป็นinput
- noclobber, Pipelines และ hw5: pipelineไม่รับประกันลำดับstdout/stderrเมื่อรวมจากหลายprocess

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U15 pp.2–6; U11 pp.9–13; UR pp.3–5; UF pp.6–10; H5; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
