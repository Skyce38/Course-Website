---
{"version":1,"id":"unix-tools-final-regex-grep-sed","course":"unix-tools","category":"summaries","slug":"final-regex-grep-sed","title":"FINAL 11 — Regex, grep และ sed","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- เปรียบเทียบ*.txtกับregexที่จับนามสกุลtxtทั้งสาย
- ออกแบบแยกfound/notfound/errorและliteralpattern
- อธิบายreplacement&กับcaptureและเลือกdelimiter
- อธิบายs/.*//กับdและการพิมพ์ซ้ำ
- ออกแบบworkflowแก้ไฟล์ด้วยsedอย่างปลอดภัยข้ามระบบ

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: US pp.3–32,34–46. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Glob, BRE และ ERE {#regex-glob}

Shellglobใช้เลือกชื่อไฟล์และcase; regexใช้ค้นข้อความและมี*เป็นrepeatของตัวก่อนหน้า grepธรรมดาใช้BRE; grep-Eใช้EREที่รองรับ+ ? () |โดยไม่escape ใช้[[:digit:]]ภายใต้localeที่ระบุ ไม่ใช้\dโดยสมมติว่าPOSIXรับรอง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'a\naa\nb\n' | grep -Ec '^a+$'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | a+ต้องมีaอย่างน้อยหนึ่ง |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux11-q01 |

ข้อควรระวัง: ตารางSedAwkp.25สลับรูปแบบบางส่วน ต้องตรวจกับคู่มือ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-regex-glob}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| EREplus | `2` | a+ต้องมีaอย่างน้อยหนึ่ง |
| BREliteralplus | `1` | BRE+ไม่มีescapeเป็นliteralในGNUgrep |
| anchorชื่อไฟล์ | `1` | \.จับจุดจริง |
| regexstarzero | `3` | b*รับศูนย์ขึ้นไป |
| shellglobต่างregex | `glob` | *ในcaseแทนสายอักขระได้ |


## grep Matching และ Status {#grep}

grepเลือกบรรทัดที่matchที่ใดก็ได้เว้นแต่ใส่anchors -xบังคับทั้งบรรทัด -Fใช้fixedstrings -cนับmatchinglinesไม่ใช่จำนวนmatches -oพิมพ์matchesทีละตัว status0พบ1ไม่พบและ2เป็นerrorในGNUgrep ปกติ; -qอาจคืน0เมื่อพบแม้อีกไฟล์error

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'aa a\na\n' | grep -c a
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | สองบรรทัดmatchแม้มีหลายa |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux11-q06 |

ข้อควรระวัง: อย่าอ่านnonzeroทุกค่าของgrepว่าnotfoundอย่างเดียว

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-grep}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| นับบรรทัดไม่ใช่matches | `2` | สองบรรทัดmatchแม้มีหลายa |
| fixedstring | `1` | -Fทำจุดเป็นliteral |
| grepไม่พบstatus | `1` | ไม่พบให้1 |
| grepไฟล์หายstatus | `2` | GNUgreperrorให้2 |
| wholeline | `1` | -xรับเฉพาะบรรทัดa |


## sed Substitution และ Captures {#sed-substitute}

sed s/pattern/replacement/แทนmatchแรกของแต่ละบรรทัด gแทนทุกmatch &ในreplacementคือmatchทั้งหมด \1คือcapture ใช้-Eเมื่อใช้ERE คำสั่งอ่านstdinและพิมพ์stdoutไม่ได้แก้ไฟล์ต้นฉบับโดยปริยาย

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'foo foo\n' | sed 's/foo/bar/'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
bar foo
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ไม่gจึงครั้งแรก |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux11-q11 |

ข้อควรระวัง: quoteเพื่อป้องกันshellตีความ$และbackslash

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-sed-substitute}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| แทนmatchแรก | `bar foo` | ไม่gจึงครั้งแรก |
| แทนทุกmatch | `bar bar` | gแทนสองmatch |
| replacementampersand | `a[b]c` | &คืนmatchb |
| capturegroups | `blue:red` | \2คือblueและ\1คือred |
| delimiterอื่น | `/x/b` | #เป็นdelimiterแทน/ |


## Addresses, -n, p และ d {#sed-address}

sedปกติพิมพ์patternspaceท้ายรอบ; -nปิดautomaticprint pพิมพ์เอง dลบบรรทัดและเริ่มรอบถัดไป ใช้1,2pเลือกช่วงและ$แทนบรรทัดท้าย ลบเนื้อหาด้วยs/^.*$//ยังเหลือnewline ต่างจากd

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf 'A\nB\nC\n' | sed -n '1,2p'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
A
B
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | -nปิดprintเดิมแล้วเลือก1ถึง2 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux11-q16 |

ข้อควรระวัง: sed pโดยไม่-nอาจทำให้ข้อมูลซ้ำ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-sed-address}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| พิมพ์ช่วง | `A\nB` | -nปิดprintเดิมแล้วเลือก1ถึง2 |
| ลบหัว | `data` | 1dลบบรรทัด1 |
| printซ้ำ | `A\nA` | pหนึ่งและautomaticprintอีกหนึ่ง |
| lastline | `C` | $เลือกบรรทัดท้าย |
| ลบเนื้อหายังมีบรรทัด | `2` | สองemptylinesยังมีnewline |


## การแก้ไฟล์และ Portability {#editing-safety}

GNU sed-iแก้ไฟล์ผ่านไฟล์ชั่วคราวและrename ไม่เหมือนredirect>file BSDsedรูปแบบbackupต่างกัน -iกับ-nที่ไม่มีpอาจทำไฟล์ว่าง ทดสอบstdoutก่อนและสำรองข้อมูล ห้ามรันคำสั่งแก้ไฟล์จริงจากโจทย์โดยไม่ตรวจ

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
printf foo >f; sed 's/foo/bar/' f >/dev/null; cat f
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
foo
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | sedstdoutไม่แก้file |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux11-q21 |

ข้อควรระวัง: regexไม่ใช่parserสำหรับCSV/HTMLซับซ้อน

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-editing-safety}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ไม่แก้ต้นฉบับโดยdefault | `foo` | sedstdoutไม่แก้file |
| GNUbackup | `foo` | backupเก็บเดิม |
| อันตราย-n-i | `0` | -nไม่pและ-iเขียนผลว่าง |
| deleteต่างempty | `0` | dลบบรรทัดทั้งหมด |
| rangecharASCII | `1` | LC_ALL=Cมี7ที่เป็นdigit |


## กับดักและกรณีขอบ {#mistakes}

- ตารางSedAwkp.25สลับรูปแบบบางส่วน ต้องตรวจกับคู่มือ
- อย่าอ่านnonzeroทุกค่าของgrepว่าnotfoundอย่างเดียว
- quoteเพื่อป้องกันshellตีความ$และbackslash
- sed pโดยไม่-nอาจทำให้ข้อมูลซ้ำ
- regexไม่ใช่parserสำหรับCSV/HTMLซับซ้อน

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Glob, BRE และ ERE {#review-regex-glob}

เปรียบเทียบ*.txtกับregexที่จับนามสกุลtxtทั้งสาย

แนวคำตอบ: ระบุglobกับregex^.*\.txt$และquoteเพื่อไม่ให้shellขยายก่อน

### 2. grep Matching และ Status {#review-grep}

ออกแบบแยกfound/notfound/errorและliteralpattern

แนวคำตอบ: ตรวจสามstatusและใช้-Fเมื่อผู้ใช้ให้ข้อความไม่ใช่regex

### 3. sed Substitution และ Captures {#review-sed-substitute}

อธิบายreplacement&กับcaptureและเลือกdelimiter

แนวคำตอบ: แยกpattern/replacement/shellquotingและทดสอบก่อนแก้ไฟล์

### 4. Addresses, -n, p และ d {#review-sed-address}

อธิบายs/.*//กับdและการพิมพ์ซ้ำ

แนวคำตอบ: แยกemptylineกับremovedlineและtraceautomaticprint

### 5. การแก้ไฟล์และ Portability {#review-editing-safety}

ออกแบบworkflowแก้ไฟล์ด้วยsedอย่างปลอดภัยข้ามระบบ

แนวคำตอบ: dryrun,backup,ระบุimplementationและตรวจผลก่อนreplaceโดยไม่ใช้catf>f

## สรุปก่อนสอบ {#summary}

- Glob, BRE และ ERE: ตารางSedAwkp.25สลับรูปแบบบางส่วน ต้องตรวจกับคู่มือ
- grep Matching และ Status: อย่าอ่านnonzeroทุกค่าของgrepว่าnotfoundอย่างเดียว
- sed Substitution และ Captures: quoteเพื่อป้องกันshellตีความ$และbackslash
- Addresses, -n, p และ d: sed pโดยไม่-nอาจทำให้ข้อมูลซ้ำ
- การแก้ไฟล์และ Portability: regexไม่ใช่parserสำหรับCSV/HTMLซับซ้อน

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: US pp.3–32,34–46; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
