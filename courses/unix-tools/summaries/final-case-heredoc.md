---
{"version":1,"id":"unix-tools-final-case-heredoc","course":"unix-tools","category":"summaries","slug":"final-case-heredoc","title":"FINAL 08 — case และ Here Documents","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายmatchingของcaseกับregexโดยมีตัวอย่าง
- ออกแบบเมนูที่รับqและEOFอย่างปลอดภัย
- วาดเส้นทางข้อมูลในcat<<EOFและcat>file<<EOF
- เปรียบเทียบdelimiterquoteกับไม่quoteเมื่อbodyมี$และ$(...)
- อธิบายความเสี่ยงการสร้างscriptจากข้อมูลและเสนอทางเลือก

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U13 pp.1–3,7–11. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## case ใช้ Shell Patterns {#case-patterns}

caseเลือกpatternแขนแรกที่ตรง ใช้ *, ?, [abc] ไม่ใช่regex `|` ในรายการpatternหมายถึงทางเลือก `;;` จบแขน การquoteข้อความทดสอบไม่ได้ทำให้patternแขนเสียความหมาย

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
x=note.txt; case $x in *.txt) printf text;; *) printf other;; esac
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
text
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | glob*.txtตรงนามสกุล |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux08-q01 |

ข้อควรระวัง: case foo.txtใน*.txtต่างจากregex.*.txt

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-case-patterns}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| แขนแรกตรง | `text` | glob*.txtตรงนามสกุล |
| questionmarkหนึ่งตัว | `two` | ??ตรงสองอักขระ |
| alternativepattern | `go` | /แยกpatternทางเลือก |
| แขนทับซ้อน | `first` | เลือกแขนแรกแล้ว;;จบ |
| characterclass | `match` | classรับหนึ่งในABC |


## เมนูและ Validation {#menus}

เมนูควรมีdefaultปฏิเสธinputที่ไม่รู้จัก ใช้read -rและcase; exitจบscriptส่วนbreakออกloopเท่านั้น ออกแบบEOFเพื่อไม่วนไม่จบเมื่อstdinหมด ตัวอย่างเป็นข้อมูลสมมติ ไม่เรียกคำสั่งดูข้อมูลผู้ใช้จริง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
x=unknown; case $x in q) printf quit;; *) printf invalid;; esac
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
invalid
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | *เป็นfallback |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux08-q06 |

ข้อควรระวัง: อย่าพิมพ์Usageไปstdoutปนผลลัพธ์ข้อมูล

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-menus}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| defaultไม่รู้จัก | `invalid` | *เป็นfallback |
| breakออกmenu | `aend` | breakจบloopแต่คำสั่งหลังloopยังทำ |
| exitจบscriptลูก | `end` | exitหยุดshellลูก |
| EOFหยุดรับ | `0` | EOFตั้งแต่แรกไม่วน |
| caseinsensitiveระบุเอง | `accepted` | classแต่ละตำแหน่งรับตัวใหญ่เล็ก |


## Here Document เป็น stdin {#heredoc}

`cat <<EOF` ส่งข้อความหลายบรรทัดเป็นstdinของcat; delimiterปิดต้องตรงและไม่มีspacesเกิน ถ้าdelimiterไม่quoteจะขยายparameter/command/arithmetic แต่ไม่ใช่การรันทุกบรรทัดเป็นshellcommands

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
name=Dao; cat <<EOF
Hello $name
EOF
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
Hello Dao
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | ขยาย$nameในbody |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux08-q11 |

ข้อควรระวัง: อย่าสับสนhere-documentกับไฟล์ที่สร้างเองโดยอัตโนมัติ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-heredoc}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| unquoteddelimiter | `Hello Dao` | ขยาย$nameในbody |
| commandในbody | `computed` | unquotedheredocทำcommandsubstitution |
| arithmeticในbody | `5` | arithmeticexpansionในbody |
| redirectstdoutเพิ่มเติม | `1` | bodyหนึ่งบรรทัดถูกcatเขียนout |
| quoteในbodyเป็นdata | `'yes'` | singlequotesในheredocbodyเป็นliteralไม่ปิดexpansion |


## Quoted Delimiter และ Tab Stripping {#quoted-delimiter}

`<<'EOF'` ปิดการขยายในbodyทั้งหมดเหมาะกับสร้างข้อความliteral `<<-EOF` ตัดเฉพาะtabนำหน้าจากbodyและdelimiter ไม่ตัดspaces Quoteใดๆในdelimiterทำให้bodyไม่expand

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
name=Dao; cat <<'EOF'
Hello $name
EOF
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
Hello $name
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | delimiterquoteปิดexpansion |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux08-q16 |

ข้อควรระวัง: การquoteเนื้อหาด้านในไม่แทนการquote delimiter

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-quoted-delimiter}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| quoteหยุดparameter | `Hello $name` | delimiterquoteปิดexpansion |
| quoteหยุดcommand | `$(printf computed)` | ไม่มีcommandsubstitution |
| tabstrip | `data` | <<-ตัดtabนำหน้า |
| spacesไม่strip | `  data` | <<-ไม่ตัดspace |
| doublequoteddelimiterก็literal | `$x` | quoteทุกแบบที่delimiterปิดbodyexpansion |


## ประยุกต์ case, Input และ Output {#combined}

ผสมcaseกับheredocเพื่อแสดงคำแนะนำและrouteinputได้ กำหนดdelimiterไม่ชนบรรทัดข้อมูลเมื่อทำระบบจริง หลีกเลี่ยงevalหรือรันscriptที่สร้างจากข้อมูลผู้ใช้ ตัวอย่างbundleจากต้นฉบับใช้ประกอบแนวคิด ไม่ใช่ตัวอย่างsecurearchive

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
case help in help) cat <<'EOF'
Use $1 safely
EOF
;; esac
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
Use $1 safely
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | quotedheredocคง$1 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux08-q21 |

ข้อควรระวัง: ข้อความในheredocอาจมีcommand substitutionหากdelimiterไม่quote

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-combined}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| literalhelpผ่านcase | `Use $1 safely` | quotedheredocคง$1 |
| caseไม่ตรงไม่มีoutput | `done` | ไม่มีarmตรงและไม่default |
| stringว่างตรงdefault | `empty` | ?ต้องหนึ่งcharacter |
| noautoexecution | `printf not-executed` | bodyเป็นdataไม่ใช่shellscript |
| readสองfields | `run:red blue` | readตัวแปรท้ายรับส่วนที่เหลือ |


## กับดักและกรณีขอบ {#mistakes}

- case foo.txtใน*.txtต่างจากregex.*.txt
- อย่าพิมพ์Usageไปstdoutปนผลลัพธ์ข้อมูล
- อย่าสับสนhere-documentกับไฟล์ที่สร้างเองโดยอัตโนมัติ
- การquoteเนื้อหาด้านในไม่แทนการquote delimiter
- ข้อความในheredocอาจมีcommand substitutionหากdelimiterไม่quote

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. case ใช้ Shell Patterns {#review-case-patterns}

อธิบายmatchingของcaseกับregexโดยมีตัวอย่าง

แนวคำตอบ: ระบุ*และ?ในglobและไม่อ้างว่าcaseเป็นERE

### 2. เมนูและ Validation {#review-menus}

ออกแบบเมนูที่รับqและEOFอย่างปลอดภัย

แนวคำตอบ: แยกcasedefault,สถานะEOF,breakกับexitและdiagnosticstderr

### 3. Here Document เป็น stdin {#review-heredoc}

วาดเส้นทางข้อมูลในcat<<EOFและcat>file<<EOF

แนวคำตอบ: แยกstdinจากstdout;fileเกิดเพราะ>ไม่ใช่เพราะ<<

### 4. Quoted Delimiter และ Tab Stripping {#review-quoted-delimiter}

เปรียบเทียบdelimiterquoteกับไม่quoteเมื่อbodyมี$และ$(...)

แนวคำตอบ: ทำนายliteral/expandedให้ครบและอธิบายtabกับspace

### 5. ประยุกต์ case, Input และ Output {#review-combined}

อธิบายความเสี่ยงการสร้างscriptจากข้อมูลและเสนอทางเลือก

แนวคำตอบ: ใช้quotedheredocหรือprintfเป็นdata;ไม่evalและตรวจpathก่อนเขียน

## สรุปก่อนสอบ {#summary}

- case ใช้ Shell Patterns: case foo.txtใน*.txtต่างจากregex.*.txt
- เมนูและ Validation: อย่าพิมพ์Usageไปstdoutปนผลลัพธ์ข้อมูล
- Here Document เป็น stdin: อย่าสับสนhere-documentกับไฟล์ที่สร้างเองโดยอัตโนมัติ
- Quoted Delimiter และ Tab Stripping: การquoteเนื้อหาด้านในไม่แทนการquote delimiter
- ประยุกต์ case, Input และ Output: ข้อความในheredocอาจมีcommand substitutionหากdelimiterไม่quote

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U13 pp.1–3,7–11; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
