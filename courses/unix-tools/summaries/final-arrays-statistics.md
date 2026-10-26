---
{"version":1,"id":"unix-tools-final-arrays-statistics","course":"unix-tools","category":"summaries","slug":"final-arrays-statistics","title":"FINAL 10 — Bash Arrays และสถิติ","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายsparsearrayและแก้ความกำกวมในสไลด์p.15
- เขียนloopที่อ่านsparsearrayพร้อมชื่อและindex
- คำนวณmean/variance/SDของ2,4,6และอธิบายตัวหาร
- อธิบายscoreที่เท่ากับแต่ละขอบรวมกรณีsd0
- วางแผนtestgradingรวมempty,sparse,identicalและboundaries

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: UA pp.14–19; HA p.1. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## Indexed Array และ Sparse Indices {#indexed}

Bashindexedarrayเริ่มที่0แต่มีช่องว่างindexได้ การassign a[100]=xไม่ลบสมาชิกเดิม; ข้อความsingleelementในArray p.15ถูกเฉพาะเมื่อarrayเดิมว่าง ไม่ได้แปลว่าindex100สร้าง100สมาชิก `${#a[@]}`นับสมาชิกไม่ใช่maxindex+1

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
a=(10 20 30); printf '%s' "${a[0]}"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
10
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | สมาชิกแรกindex0 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux10-q01 |

ข้อควรระวัง: unsetไม่เลื่อนindexสมาชิกที่เหลือ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-indexed}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| index0 | `10` | สมาชิกแรกindex0 |
| sparseสมาชิกเดียว | `1` | index100ไม่แปลว่า101สมาชิก |
| assignmentไม่ลบสมาชิกเดิม | `4` | สมาชิกเดิมสามและใหม่หนึ่ง |
| unsetไม่เลื่อน | `30` | index2ยัง30 |
| sparseindices | `2 7 ` | indicesที่มีค่าจริง |


## ขยายและวน Array {#iteration}

`"${a[@]}"`รักษาแต่ละสมาชิกและemptyสมาชิก `"${a[*]}"`รวมด้วยIFSตัวแรก `${!a[@]}`ให้indices `${#a[0]}`ให้ความยาวstringของสมาชิก0ไม่ใช่จำนวนสมาชิก `unset 'a[1]'`ต้องquoteเพื่อไม่ให้shellglobก่อน

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
a=('red blue' green); set -- "${a[@]}"; printf '%s' "$#"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | แต่ละสมาชิกเป็นหนึ่งargument |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux10-q06 |

ข้อควรระวัง: อย่าวน0..count-1เมื่อarrayมีholes

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-iteration}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| quotedarrayargs | `2` | แต่ละสมาชิกเป็นหนึ่งargument |
| arraystar | `red:blue` | รวมสมาชิกด้วยcolon |
| lengthสมาชิก | `5` | helloยาว5ไม่ใช่count2 |
| emptymember | `2` | emptystringยังเป็นmember |
| iterateholes | `30` | วนเฉพาะindex0และ3 |


## Mean, Population Variance และ SD {#statistics}

HA p.1กำหนดmean=sum/Nและpopulationvariance=sum((x-mean)^2)/Nไม่ใช่samplevarianceที่หารN-1 ใช้awkrealarithmeticและตรวจN>0ก่อนหาร คำนวณก่อนปัด ค่า1..10มีsum55 mean5.5 variance8.25 SDsqrt8.25≈2.872281323

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
awk 'BEGIN{s=0;for(i=1;i<=10;i++)s+=i;print s/10}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
5.5
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | sum55/N10 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux10-q11 |

ข้อควรระวัง: N20ในคำสั่งกับN10ในตัวอย่างเป็นคนละชุดไม่ควรผสม

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-statistics}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| meanจากHA | `5.5` | sum55/N10 |
| populationvariance | `2.66667` | squareddeviations8หาร3;stdoutmawkพิมพ์6significantdigits |
| populationSD | `2.872281` | sqrt8.25ปัดหกตำแหน่ง |
| uniformvariance | `0` | ทุกค่าเบี่ยงเบน0 |
| ห้ามหารN0 | `undefined` | emptydataไม่มีmean |


## ขอบเกรดตามสูตร HW_Array {#grading}

HAกำหนด Cเมื่อavg-sd<score<=avg+sd; Bเมื่อavg+sd<score<=avg+2sd; Aเมื่อscore>avg+2sd;ที่เหลือF ไม่มีDในสูตรนี้ ต้องตีความตามโจทย์ไม่ใช่เกณฑ์ทั่วมหาวิทยาลัย เมื่อsd0และscoreavgจะเข้าFตามstrictlowerbound

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
awk 'BEGIN{s=60;m=50;d=10;if(s>m+2*d)print "A";else if(s>m+d)print "B";else if(s>m-d)print "C";else print "F"}'
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
C
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | 60เท่าขอบบนC |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux10-q16 |

ข้อควรระวัง: ผลตัวอย่างเกรดHAไม่ตรงสูตร จึงสอนผลที่คำนวณจากสูตรพร้อมหมายเหตุ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-grading}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| ขอบบนC | `C` | 60เท่าขอบบนC |
| ขอบบนB | `B` | 70รวมBแต่ไม่A |
| ขอบล่างC | `F` | 40ไม่ผ่านstrictlowerbound |
| sd0ตามสูตร | `F` | score=avgไม่ผ่านstrictinequality |
| สูตรHAกับscore9 | `B` | 9อยู่ระหว่าง8.372...กับ11.244...จึงBไม่ใช่Aตามsample |


## โปรแกรม grading และการตรวจข้อมูล {#applied-array}

สร้างข้อมูลสมมติscores=(...)ตรวจว่าเป็นตัวเลข0..100และไม่ว่างก่อนรวม ใช้สองpassหาค่าเฉลี่ยแล้วsquareddeviationsเพื่อลดความผิดพลาดจากrounding ไม่เอาrandomชุดใหม่มาเปรียบผลเดิมโดยไม่บันทึกinput HW_Arrayพิมพ์N20แต่ตัวอย่าง1..10เป็น10ค่าจึงประกาศNจริง

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
a=(10 20 30); unset 'a[1]'; printf '%s' "${#a[@]}"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
2
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | countต้องคำนวณใหม่ไม่ยึดขนาดเดิม |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux10-q21 |

ข้อควรระวัง: การลบหรือแก้memberต้องคำนวณNและสถิติใหม่

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-applied-array}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| Nหลังลบ | `2` | countต้องคำนวณใหม่ไม่ยึดขนาดเดิม |
| รวมoccurrences | `8` | ค่าซ้ำยังอยู่ในpopulation |
| validateคะแนน | `1` | 101เกินช่วงที่กำหนด |
| sumHA | `55` | sum1ถึง10เท่ากับ10*11/2 |
| numericdataไม่ใช่textjoin | `10 20` | arraystarรวมข้อความไม่ได้รวมเลข |


## สูตรและการแก้ความคลาดเคลื่อนของต้นฉบับ {#population-formulas}

HA p.1 ใช้สถิติประชากร ไม่ใช่ sample estimate:

$$
\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i,\quad \sigma^2=\frac{1}{N}\sum_{i=1}^{N}(x_i-\bar{x})^2,\quad \sigma=\sqrt{\sigma^2}
$$

ข้อมูล1..10: sum55, mean5.5, variance8.25, SD≈2.872281323 ดังนั้นเกรดจากสูตรคือ F F C C C C C C B B ต่างจากตัวอย่างพิมพ์ในHA ความคลาดเคลื่อนนี้ยืนยันด้วย exact arithmetic และทดสอบ boundary แยกต่างหาก ไม่แก้ไฟล์ต้นฉบับ

## ตัวอย่างครบขั้น: สถิติและเกรดตามสูตร HA {#grading-program}

ข้อมูลสมมติ 1..10 ตรงตัวอย่าง N=10 ไม่แสร้งว่ามี20ค่า; คำนวณสอง pass ก่อนปัด SD เพื่อแสดงผล โค้ดนี้ใช้ชุดตัวเลข valid ที่กำหนด หากรับไฟล์ภายนอกต้องเพิ่มการตรวจชนิด/ช่วงก่อนรวม ตรวจจำนวนสมาชิกก่อน printf เพราะ printf format กับ empty array ยังสร้างบรรทัดว่างหนึ่งบรรทัดได้

```bash
scores=(1 2 3 4 5 6 7 8 9 10)
if ((${#scores[@]} == 0)); then printf "no-data\n" >&2; exit 2; fi
printf '%s\n' "${scores[@]}" | awk '
{ x[NR]=$1; sum+=$1 }
END {
    if (!NR) { print "no-data"; exit 2 }
    avg=sum/NR
    for(i=1;i<=NR;i++) variance+=(x[i]-avg)^2
    variance/=NR; sd=sqrt(variance)
    printf "N=%d sum=%g avg=%.1f var=%.2f sd=%.6f\n", NR,sum,avg,variance,sd
    for(i=1;i<=NR;i++) {
        s=x[i]
        if(s>avg+2*sd) grade="A"
        else if(s>avg+sd) grade="B"
        else if(s>avg-sd) grade="C"
        else grade="F"
        printf "%g %s\n",s,grade
    }
}'
```

ผลที่ตรวจอิสระ:

```text
N=10 sum=55 avg=5.5 var=8.25 sd=2.872281
1 F
2 F
3 C
4 C
5 C
6 C
7 C
8 C
9 B
10 B
```

## กับดักและกรณีขอบ {#mistakes}

- unsetไม่เลื่อนindexสมาชิกที่เหลือ
- อย่าวน0..count-1เมื่อarrayมีholes
- N20ในคำสั่งกับN10ในตัวอย่างเป็นคนละชุดไม่ควรผสม
- ผลตัวอย่างเกรดHAไม่ตรงสูตร จึงสอนผลที่คำนวณจากสูตรพร้อมหมายเหตุ
- การลบหรือแก้memberต้องคำนวณNและสถิติใหม่

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. Indexed Array และ Sparse Indices {#review-indexed}

อธิบายsparsearrayและแก้ความกำกวมในสไลด์p.15

แนวคำตอบ: ทดสอบทั้งarrayว่าง/มีสมาชิกและแยกcountจากhighestindex

### 2. ขยายและวน Array {#review-iteration}

เขียนloopที่อ่านsparsearrayพร้อมชื่อและindex

แนวคำตอบ: วนindicesที่มีอยู่จริงและquoteexpansionทุกจุด

### 3. Mean, Population Variance และ SD {#review-statistics}

คำนวณmean/variance/SDของ2,4,6และอธิบายตัวหาร

แนวคำตอบ: mean4 populationvariance8/3 SDsqrt(8/3)และN=0ไม่มีmean

### 4. ขอบเกรดตามสูตร HW_Array {#review-grading}

อธิบายscoreที่เท่ากับแต่ละขอบรวมกรณีsd0

แนวคำตอบ: ขอบล่างCไม่รวม ขอบบนCและBรวม ส่วนAstrictและsd0ได้F

### 5. โปรแกรม grading และการตรวจข้อมูล {#review-applied-array}

วางแผนtestgradingรวมempty,sparse,identicalและboundaries

แนวคำตอบ: ระบุoracleแยกจากโค้ดหลักและไม่เชื่อsamplegradesที่ขัดสูตร

## สรุปก่อนสอบ {#summary}

- Indexed Array และ Sparse Indices: unsetไม่เลื่อนindexสมาชิกที่เหลือ
- ขยายและวน Array: อย่าวน0..count-1เมื่อarrayมีholes
- Mean, Population Variance และ SD: N20ในคำสั่งกับN10ในตัวอย่างเป็นคนละชุดไม่ควรผสม
- ขอบเกรดตามสูตร HW_Array: ผลตัวอย่างเกรดHAไม่ตรงสูตร จึงสอนผลที่คำนวณจากสูตรพร้อมหมายเหตุ
- โปรแกรม grading และการตรวจข้อมูล: การลบหรือแก้memberต้องคำนวณNและสถิติใหม่

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: UA pp.14–19; HA p.1; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
