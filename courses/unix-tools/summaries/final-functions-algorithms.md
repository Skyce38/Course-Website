---
{"version":1,"id":"unix-tools-final-functions-algorithms","course":"unix-tools","category":"summaries","slug":"final-functions-algorithms","title":"FINAL 09 — Functions และ Applied Algorithms","language":"th"}
---

## เป้าหมายการเรียนรู้ {#objectives}

- อธิบายlocalกับglobalและargumentsขณะเรียกฟังก์ชัน
- ออกแบบfunctionส่งเลข300และรายงานความสำเร็จ
- ออกแบบfacที่มีinputvalidationและอธิบาย0!
- เปรียบเทียบtrialdivisionกับSieveสำหรับหลายqueries
- ออกแบบCLIรับหลายอุณหภูมิตามHFและerrorที่เหมาะสม

## ขอบเขตและสภาพแวดล้อม {#scope}

บท FINAL สำหรับทบทวนตามหัวข้อที่มีหลักฐาน ไม่รับประกันข้อสอบหรือสัดส่วนคะแนน เนื้อหาภาษาไทยใช้คำเทคนิค English ตามความเหมาะสม

ต้นฉบับที่ตรวจ: U15 p.1; UA pp.21–23; H7; HF pp.1–2. เอกสารสอนเก็บ local-only ไม่แนบสำเนา ตัวอย่างต่อไปนี้และเฉลยเป็นงานสอนเสริมที่ตรวจอิสระ ไม่ใช่เฉลยผู้สอน ข้อจำกัดและเลขหน้าอยู่ใน [บัญชีแหล่งที่มา](../../../docs/unix-final-source-coverage.md).

ใช้ Bash 5.2.15 บน Linux, GNU sed4.9/grep3.8/coreutils9.1, mawk1.3.4, LC_ALL=C และไฟล์สมมติใน directory ชั่วคราว ปิด errexit, pipefail, lastpipe, jobcontrol และ shell options จากผู้ใช้ ยกเว้นตัวอย่างเปิดเอง ไม่รันกับไฟล์ส่วนตัว ข้อสอบคง stdout แยก stderr และ status ชัดเจน

## ฟังก์ชันและ local {#function-scope}

ประกาศ f(){ commands; } ก่อนเรียก f arg โดยไม่ใช้วงเล็บแบบPython ภายใน$1/$#เป็นargumentsของฟังก์ชัน localจำกัดlifetimeและมีdynamic scopeในBash การแก้globalโดยไม่localยังมีผลต่อผู้เรียก

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
set -- outer; f(){ printf '%s' "$1"; }; f inner; printf ':%s' "$1"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
inner:outer
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | argumentsฟังก์ชันrestoreหลังreturn |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux09-q01 |

ข้อควรระวัง: functionargumentsไม่ใช่globalpositionalargsถาวร

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-function-scope}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| functionparameters | `inner:outer` | argumentsฟังก์ชันrestoreหลังreturn |
| globalassignment | `new` | ไม่มีlocalจึงแก้global |
| dynamicscope | `local` | gเห็นlocalของcallerในBash |
| commandsubstitutionแยกscope | `old:value` | functionทำในsubshellของsubstitution |
| functionarity | `2` | quotedชื่อหลายคำหนึ่งargument |


## return Status กับข้อมูล {#return-output}

returnจบฟังก์ชันพร้อมstatus0..255ในBash ไม่ใช่ข้อมูลเลขทั่วไป ส่งข้อมูลทางprintfแล้วรับด้วย$(...) แต่ต้องแยกlocalassignmentจากcommandsubstitutionเพื่อไม่ให้localบังstatus ป้องกันdivisionbyzeroและส่งerrorทางstderr

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
f(){ return 300; }; f; printf '%s' "$?"
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
44
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | statusใช้แปดบิต300mod256=44 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux09-q06 |

ข้อควรระวัง: return300ไม่ได้คืนข้อมูล300

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-return-output}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| returnmodulo256 | `44` | statusใช้แปดบิต300mod256=44 |
| printdata | `300:0` | ข้อมูล300กับstatus0แยกกัน |
| implicitreturn | `1` | ไม่returnชัดเจนใช้statusคำสั่งท้าย |
| localบังstatus | `0` | statusของlocalสำเร็จบังfalse |
| แยกdeclaration | `1` | assignmentรับstatuscommandsubstitution |


## Factorial จาก HF {#factorial}

HF p.1 ขอfac()รับหลายargumentsและerrorเมื่อไม่มีข้อมูล ตัวอย่างเขียนเสริมตรวจเลข0..20ก่อนใช้signed64-bit เริ่มresult1วน2..n จึง0!=1 ขอบi<nทำให้ขาดตัวคูณสุดท้าย

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
fac(){ local n=$1 r=1 i; for ((i=2;i<=n;i++)); do ((r*=i)); done; printf '%s' "$r"; }; fac 5
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
120
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | 2*3*4*5=120 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux09-q11 |

ข้อควรระวัง: factorialโตเร็ว;ช่วงรับต้องจำกัดและห้ามเลขติดลบ

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-factorial}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| fac5ตามHF | `120` | 2*3*4*5=120 |
| fac0basecase | `1` | ไม่เข้าลูปresultยัง1 |
| offbyonefactorial | `24` | ขาดคูณ5 |
| guardช่วงfactorial | `1` | ไม่รับ21เพราะเกินช่วงที่ตั้ง |
| หลายarguments | `24 6 ` | facแต่ละinputแยกresult |


## Prime และ Trial Division {#prime}

HF p.1แนะนำSieve of Eratosthenes แต่ตัวอย่างสั้นในบทนี้ใช้trialdivisionและระบุว่าเป็นวิธีเสริม คนละalgorithm จำนวนเฉพาะต้องn>=2 ตรวจตัวหารถึงรากรวมขอบ ใช้d<=n/dหลีกเลี่ยงd*doverflowเมื่อช่วงใหญ่;ภายใต้จำนวนเต็มบวก

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
n=1; if ((n<2)); then printf no; else printf yes; fi
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
no
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | นิยามprimeต้อง>=2 |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux09-q16 |

ข้อควรระวัง: 1ไม่ใช่primeและn=25ต้องลองตัวหาร5

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-prime}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| oneไม่prime | `no` | นิยามprimeต้อง>=2 |
| รวมขอบsqrt | `no` | พบd5หาร25ลงตัว |
| prime13 | `yes` | ไม่มีตัวหาร2หรือ3 |
| Sieveเริ่มsquare | `9` | เริ่มทำเครื่องหมาย9ซึ่งเป็นcomposite |
| trialจำนวนทดสอบ | `6` | ตรวจ2..7รวม6ตัวและพบ7 |


## Calculator และ Temperature {#temperature}

HF pp.1–2กำหนด-fแปลงCไปF และ-cแปลงFไปC ซึ่งเป็นconventionของงานนี้ไม่ใช่มาตรฐานทุกprogram H7ใช้opตามด้วย2operands ใช้awkเพื่อทศนิยม ตรวจmode,จำนวนและรูปแบบก่อนประเมิน ไม่ใช้eval

ตัวอย่างจัดทำเสริม (รันใน directory ว่าง ไม่ใช่โปรแกรมพร้อมรับ input ที่ไม่เชื่อถือ):

```bash
mode=-f; n=40; if [[ $mode == -f ]]; then awk -v x="$n" 'BEGIN{printf "%.2f",9*x/5+32}'; fi
```

ผล stdout (ตัด newline ท้ายตามเกณฑ์ชุดทดสอบ):

```text
104
```

| ขั้น | สิ่งที่ตรวจ |
|---|---|
| 1 | อ่านคำสั่งและค่าที่กำหนดก่อน expansion |
| 2 | -fตามHFหมายถึงผลF |
| 3 | ตรวจ stdout, stderr และ status แยกกัน; ดู ledger ux09-q21 |

ข้อควรระวัง: อย่าตีความ-cว่าหมายถึงinputCโดยเดาเอง

### ตารางไล่ผลจากกรณีที่ตรวจแล้ว {#trace-temperature}

| กรณี / Input | stdout (\n คือขึ้นบรรทัดใหม่) | เหตุผล |
|---|---|---|
| sourcef40 | `104.00` | -fตามHFหมายถึงผลF |
| sourcec102 | `39.00` | 102.2Fเป็น39.00C |
| freezingpoint | `0.00` | 32Fตรง0C |
| calculatorzero | `2` | guardตัวหาร0คืนstatus2ไม่มีผลหาร |
| CกับFจุดเดียวกัน | `-40` | -40Cเท่ากับ-40F |


## ตัวอย่างครบขั้น: fac พร้อมตรวจช่วง {#validated-factorial}

โค้ดสอนเสริมตามรูปแบบ fac ของ HF p.1 จำกัด 0..20 สำหรับ signed64-bit; ค่าผิดช่วงคืน2 ไม่ใช่ผล factorial ไม่สมมติว่า syntax check ป้องกัน overflow ได้

```bash
fac() {
    local n=${1-} result=1 i
    [[ $n =~ ^([0-9]|1[0-9]|20)$ ]] || return 2
    for ((i=2; i<=n; i++)); do
        ((result *= i))
    done
    printf '%s\n' "$result"
}
for n in 5 4 0; do fac "$n"; done
```

ผลที่ตรวจอิสระ:

```text
120
24
1
```

## ตัวอย่างครบขั้น: Trial Division {#validated-prime}

วิธี Trial Division จัดทำเสริม ไม่ใช่ Sieve ที่ HF แนะนำ คืน0=prime,1=ไม่prime,2=invalid; ตัวอย่างเรียกด้วยข้อมูลที่ผ่านรูปแบบแล้ว หากรับผู้ใช้จริงต้องแยก status2 จาก1 เวลา O(sqrt(n)) และพื้นที่เพิ่ม O(1) ภายใต้ fixed-width integer

```bash
isPrime() {
    local n=${1-} d
    [[ $n =~ ^(0|[1-9][0-9]{0,5})$ ]] || return 2
    ((n >= 2)) || return 1
    for ((d=2; d<=n/d; d++)); do
        ((n%d == 0)) && return 1
    done
    return 0
}
for n in 1 2 13 25; do
    if isPrime "$n"; then printf 'yes\n'; else printf 'no\n'; fi
done
```

ผลที่ตรวจอิสระ:

```text
no
yes
yes
no
```

## ตัวอย่างครบขั้น: แปลงอุณหภูมิหลายค่า {#temperature-batch}

HF pp.1–2 กำหนด -c ให้ผล Celsius และ -f ให้ผล Fahrenheit ตัวอย่างนี้แสดงตัวแปลงหลัก ไม่ใช่ CLI พร้อม usage ครบทุกข้อความจากต้นฉบับ ตรวจแต่ละค่าและระบุว่าหากค่าท้ายผิด อาจพิมพ์ผลค่าก่อนหน้าไปแล้ว; ต้อง validate ทั้งชุดก่อนหากต้องการ all-or-nothing

```bash
convert() {
    local mode=${1-} x
    [[ $# -ge 2 && ($mode == -c || $mode == -f) ]] || return 2
    shift
    for x in "$@"; do
        [[ $x =~ ^-?[0-9]+([.][0-9]+)?$ ]] || return 2
        awk -v x="$x" -v m="$mode" 'BEGIN {
            if (m=="-f") printf "%.2f\n", 9*x/5+32
            else printf "%.2f\n", (x-32)*5/9
        }'
    done
}
convert -c 102.2 204.4
convert -f 40
```

ผลที่ตรวจอิสระ:

```text
39.00
95.78
104.00
```

## กับดักและกรณีขอบ {#mistakes}

- functionargumentsไม่ใช่globalpositionalargsถาวร
- return300ไม่ได้คืนข้อมูล300
- factorialโตเร็ว;ช่วงรับต้องจำกัดและห้ามเลขติดลบ
- 1ไม่ใช่primeและn=25ต้องลองตัวหาร5
- อย่าตีความ-cว่าหมายถึงinputCโดยเดาเอง

## ฝึกอธิบายพร้อมแนวคำตอบ {#practice}

โจทย์ต่อไปนี้จัดทำเสริมเพื่อทบทวน ใช้ประเมินตนเองสำหรับคำอธิบาย/โค้ดอิสระ ไม่แสร้งตรวจคำตอบอัตโนมัติ โหมดฝึก6ข้อและคลังรวม30ข้อด้านล่างมีเฉลยให้ทั้งเมื่อเปิดและปิด JavaScript

### 1. ฟังก์ชันและ local {#review-function-scope}

อธิบายlocalกับglobalและargumentsขณะเรียกฟังก์ชัน

แนวคำตอบ: แสดงค่าก่อน/หลังรวมผลเมื่อเรียกโดยcommandsubstitution

### 2. return Status กับข้อมูล {#review-return-output}

ออกแบบfunctionส่งเลข300และรายงานความสำเร็จ

แนวคำตอบ: printf300 stdoutแล้วreturn0;capturestatusทันทีและอย่าให้localซ่อนfailure

### 3. Factorial จาก HF {#review-factorial}

ออกแบบfacที่มีinputvalidationและอธิบาย0!

แนวคำตอบ: อธิบายbasecase,loopinvariant,overflowและทดสอบ0,1,5,invalid

### 4. Prime และ Trial Division {#review-prime}

เปรียบเทียบtrialdivisionกับSieveสำหรับหลายqueries

แนวคำตอบ: trialตรวจแต่ละn ส่วนSieveเตรียมตารางถึงN ทำเครื่องหมายเริ่มp*pและไม่เรียกว่าprime

### 5. Calculator และ Temperature {#review-temperature}

ออกแบบCLIรับหลายอุณหภูมิตามHFและerrorที่เหมาะสม

แนวคำตอบ: เก็บmodeก่อนshift วนค่าตรวจformatใช้realarithmeticพิมพ์สองตำแหน่ง

## สรุปก่อนสอบ {#summary}

- ฟังก์ชันและ local: functionargumentsไม่ใช่globalpositionalargsถาวร
- return Status กับข้อมูล: return300ไม่ได้คืนข้อมูล300
- Factorial จาก HF: factorialโตเร็ว;ช่วงรับต้องจำกัดและห้ามเลขติดลบ
- Prime และ Trial Division: 1ไม่ใช่primeและn=25ต้องลองตัวหาร5
- Calculator และ Temperature: อย่าตีความ-cว่าหมายถึงinputCโดยเดาเอง

## แหล่งอ้างอิงและข้อจำกัด {#sources}

- ต้นฉบับ local-only: U15 p.1; UA pp.21–23; H7; HF pp.1–2; เลขหน้าเป็น physical PDF ไม่ใช่เลขหน้า slide ที่พิมพ์
- [Source coverage](../../../docs/unix-final-source-coverage.md) แยกหลักฐานต้นฉบับกับคำอธิบายเสริมและข้อแก้ไข
- [Bash manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Redirections, Conditional Constructs, Arrays, Functions และ Builtins
- [GNU sed](https://www.gnu.org/software/sed/manual/sed.html), [GNU grep](https://www.gnu.org/software/grep/manual/grep.html), [awk guide](https://www.gnu.org/software/gawk/manual/gawk.html), [Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html) ตามหัวข้อเครื่องมือ; ทดสอบawkแบบportableด้วยmawk ไม่อ้างว่าเป็นgawk
- [บัญชีตรวจคำนวณ](../../../docs/unix-final-academic-verification.md) และ [บัญชีข้อสอบ](../../../docs/unix-final-exam-verification.md), ตรวจ2026-10-27
- [สรุปเดิม](final.md) และ [ข้อฝึก40ข้อเดิม](../exams/practice-40.md) ยังคงURLและเนื้อหาเดิม ไม่ถูกนับซ้ำเป็นโจทย์ใหม่

ข้อจำกัด: locale,เวอร์ชัน,สิทธิผู้ใช้,optionsและรูปแบบข้อมูลอาจเปลี่ยนผล ต้องอ่านสมมติฐานเสมอ ไม่ใช้ผลChrome QAเป็นหลักฐานรับรองทุกแหล่งสอน
