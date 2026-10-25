---
{"version":1,"id":"oop-python-complexity-basic-sorting","course":"oop-python","category":"summaries","slug":"complexity-basic-sorting","title":"FINAL: Big-O และ Bubble, Selection, Insertion Sort","language":"th"}
---

> FINAL: Week13 physical pp.3–41 เป็นหลัก;ตัวอย่างนักเรียน/คลังสินค้ามาจาก Lab13-1/13-2และ Leaderboard จาก Hw13ในฐานะการประยุกต์ ไม่เผยแพร่ไฟล์งานหรือข้อมูลส่วนตัว Code/เฉลยปรับและตรวจอิสระ

## เป้าหมายการเรียนรู้ {#objectives}
- อธิบาย Big-O ในฐานะ growthbound พร้อมสมมติฐาน ไม่ใช้ benchmark แทนพิสูจน์
- ไล่ Bubble/Selection/Insertion ทีละ pass และรักษา invariants
- นับ key comparisons,swaps และ shifts แยกกันพร้อมตรวจ stability
- เลือกวิธีตาม near-sorteddata/ต้นทุนย้าย และทดสอบ empty/duplicate/boundaries

## Time, Space และ Cases {#complexity}
Week13 pp.3–13:O(1),O(log n),O(n),O(n log n),O(n²)บอกอัตราการโตไม่ใช่วินาที Big-O เป็น upperbound ไม่ได้มีความหมายว่า worstcase โดยตัวมันเอง ต้องระบุว่าเรากำลัง boundbest/average/worst หรือ amortized แม้3n+2เป็น O(n²)ได้แต่ใช้ tightboundΘ(n)อธิบายได้แม่นกว่า

loopn รอบทำงานคงที่ให้Θ(n);สามเหลี่ยม(n−1)+(n−2)+...+1=n(n−1)/2ให้Θ(n²);การหารช่วงลงครึ่งทุกครั้งให้ logn เมื่อมีเงื่อนไขครบ ไม่ท่องว่าทุก nestedloop ต้อง n² เพราะขอบเขต loop อาจต่างกัน ตัวอย่าง comparison จำนวนมากไม่ใช่เวลาจริงหากต้นทุนเปรียบเทียบต่างกัน

| Algorithm | Best | Average (สุ่มลำดับทั่วไป) | Worst | Stable ตามโค้ดนี้ |
|---|---|---|---|---|
|Bubble+earlyexit|Θ(n)|Θ(n²)|Θ(n²)|ใช่ ใช้>เท่านั้น|
|Selection|min scanΘ(n²)|Θ(n²)|Θ(n²)|ไม่ใช่|
|Insertion|Θ(n)|Θ(n²)|Θ(n²)|ใช่ เลื่อนเฉพาะค่ามากกว่า|

ในตารางสมมติ key/arithmetic comparisonO(1) บนข้อมูล n ที่โตขึ้น นอกเหนือจาก empty/singleton ที่ทำงานคงที่ โค้ดนี้ copyinput จึง auxspaceO(n)ทั้ง function;corein-place ที่ไม่ copy ใช้ O(1) ส่วน trace=True เก็บ snapshot หลาย pass ใช้ O(n²)ได้ เป็น overhead เพื่อการเรียน ไม่อ้าง spaceO(1)ของทั้ง function เหมือน comment ย่อในบางสไลด์

## Python และกติกาตัวนับ {#python}
comparisons นับเฉพาะการเทียบ key;ไม่นับ loopguard/typecheck/copy swaps นับเฉพาะสลับคนละ index;shifts คือย้ายสมาชิกเก่าใน insertion ไม่เรียกทุก assignment ว่า swap ผู้เขียนเพิ่ม key/trace เพื่อใช้ objects โดยยังเก็บเงื่อนไขหลักตาม source

```python
def bubble_sort(data, key=lambda x:x, trace=False):
    a = list(data)
    stats, passes = {'comparisons':0,'swaps':0}, []
    for i in range(len(a)-1):
        changed = False
        for j in range(len(a)-1-i):
            stats['comparisons'] += 1
            if key(a[j]) > key(a[j+1]):
                a[j],a[j+1] = a[j+1],a[j]
                stats['swaps'] += 1
                changed = True
        if trace: passes.append(a.copy())
        if not changed: break
    return a,stats,passes


def selection_sort(data, key=lambda x:x, trace=False):
    a = list(data)
    stats,passes = {'comparisons':0,'swaps':0},[]
    for i in range(len(a)-1):
        smallest = i
        for j in range(i+1,len(a)):
            stats['comparisons'] += 1
            if key(a[j]) < key(a[smallest]): smallest = j
        if smallest != i:
            a[i],a[smallest] = a[smallest],a[i]
            stats['swaps'] += 1
        if trace: passes.append(a.copy())
    return a,stats,passes


def insertion_sort(data, key=lambda x:x, trace=False):
    a = list(data)
    stats,passes = {'comparisons':0,'shifts':0},[]
    for i in range(1,len(a)):
        value,j = a[i],i-1
        while j>=0:
            stats['comparisons'] += 1  # key comparison, not the j>=0 guard
            if key(a[j]) <= key(value): break
            a[j+1] = a[j]
            stats['shifts'] += 1
            j -= 1
        a[j+1] = value
        if trace: passes.append(a.copy())
    return a,stats,passes


def days_left(stock,daily_usage):
    if stock<0 or daily_usage<0: raise ValueError("nonnegative values")
    return stock/daily_usage if daily_usage else float('inf')


data = [5,3,8,1,2]
for sorter in [bubble_sort,selection_sort,insertion_sort]:
    result,stats,passes = sorter(data,trace=True)
    print(sorter.__name__,result,stats,passes)
students = [('A',160),('B',150),('C',160)]
print(bubble_sort(students,key=lambda x:x[1])[0]) # [('B',150),('A',160),('C',160)]
inventory = [('A',10,2),('B',6,3),('C',9,0),('D',4,2)]
print(selection_sort(inventory,key=lambda x:days_left(x[1],x[2]))[0])
```

## Bubble Sort: Invariant และทุก Pass {#bubble}
Week13 pp.15–19:เทียบคู่ติดกันจากซ้ายไปขวา ค่ามากสุดของส่วนยังไม่เรียงลอยไปท้าย หลัง passi ได้ suffix ที่ถูกตำแหน่งแล้วจึงลด innerbound ไม่พบ swap ทั้ง pass จึงหยุดได้ การเห็นสองตัวแรกเรียงกันยังหยุดไม่ได้

| Pass | Array หลัง pass |
|---|---|
| 1 | [3, 5, 1, 2, 8] |
| 2 | [3, 1, 2, 5, 8] |
| 3 | [1, 2, 3, 5, 8] |
| 4 | [1, 2, 3, 5, 8] |

ตัวนับสุดท้าย: {'comparisons': 10, 'swaps': 7}

pass แรกเปรียบ4ครั้งและ swap3;pass สองเปรียบ3/swap2;pass สามเปรียบ2/swap2;pass สุดท้ายเปรียบ1/swap0ยืนยันเสร็จ รวม10comparisons/7swaps ไม่ปนกับ input6ค่าของ source codep.34ซึ่งมี15comparisons/8swaps การใช้>ทำให้คนส่วนสูงเท่ากันไม่สลับกัน

## Selection Sort: เลือก Minimum {#selection}
pp.21–25:prefix ซ้ายเรียงแล้ว;scan ส่วนขวาหา minimum หนึ่งครั้งต่อ pass แล้ว swap มาไว้ต้นส่วนที่ยังไม่เรียง จำนวน comparisons ไม่ขึ้นกับลำดับ input และเท่ากับ n(n−1)/2 แต่ swaps≤n−1(อาจ0เมื่อ minimum อยู่แล้ว)

| Pass | Array หลัง pass |
|---|---|
| 1 | [1, 3, 8, 5, 2] |
| 2 | [1, 2, 8, 5, 3] |
| 3 | [1, 2, 3, 5, 8] |
| 4 | [1, 2, 3, 5, 8] |

ตัวนับสุดท้าย: {'comparisons': 10, 'swaps': 3}

ไม่ stable:ข้อมูล key/tag[(2,A),(2,B),(1,C)]เลือก C มาสลับ A ก่อน ได้[(1,C),(2,B),(2,A)] ทำให้ A/B ที่ key เท่ากันกลับลำดับ การหา minimum แบบ strict<ไม่ทำให้การ swap ข้ามไกล stable เอง

## Insertion Sort: รักษา Sorted Prefix {#insertion}
pp.27–31:ถือว่าก่อน indexi เรียงแล้ว ดึง key ไว้ก่อนแล้วเลื่อนค่าที่มากกว่ามาทางขวาจากท้าย prefix จากนั้นแทรก key ลงช่องว่าง ไม่ทำ value หายระหว่างเลื่อน

| Pass | Array หลัง pass |
|---|---|
| 1 | [3, 5, 8, 1, 2] |
| 2 | [3, 5, 8, 1, 2] |
| 3 | [1, 3, 5, 8, 2] |
| 4 | [1, 2, 3, 5, 8] |

ตัวนับสุดท้าย: {'comparisons': 9, 'shifts': 7}

บน source5ค่าได้7shifts แต่9key comparisons ตามนิยาม (มี failedcomparison เมื่อเจอค่าที่≤key ด้วย) input เรียงแล้วเปรียบ n−1และ shift0;reverseunique ทำ shifts เท่าจำนวน inversions=n(n−1)/2 Empty/singleton ผ่านโดยไม่มี comparison

## Case Studies จาก Lab ที่มีจริง {#applications}
Lab13-1PhotoLineup ใช้ height(cm),strict>และ earlytermination;ชื่อ/ส่วนสูงใน Python เป็นชุดตัวอย่างผู้เขียน A160,B150,C160 เรียงแล้ว B,A,C รักษา A ก่อน C ตาม stability จำนวน pass รวมรอบยืนยันไม่ swap ด้วย ไม่สร้างชื่อบุคคลจริง

Lab13-2Warehouse เลือก stock/daily_usage(days)ต่ำก่อน;usage0→infinity ตาม source ไม่ใช่0วัน ตัวอย่างผู้เขียน A10/2=5,B6/3=2,C9/0=∞,D4/2=2 จึง priorityB,D,A,C โดย selection นี้อาจเปลี่ยนลำดับ tie ในชุดอื่น ห้ามอ้างว่า stable;ใช้การเคลื่อนย้าย≤n−1swaps เป็นเหตุผลของโจทย์ ไม่ใช่รับรอง selection เร็วที่สุดทุกระบบ

Hw13Leaderboard ใช้ insertion ของผู้เล่นที่เปลี่ยนคนเดียวลงในลำดับคะแนนมากไปน้อย ต้องบอก tiepolicy/การเอาคนเก่าออกก่อน ไม่อ้าง fullresort ทุกครั้ง การหาตำแหน่งและเลื่อนยัง O(n)worst แม้เกือบเรียงแล้วมักน้อยกว่าเต็ม n² ผู้เขียนไม่แต่ง results11comparisons เป็นค่ารับประกันทุก dataset

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
สับสน swap กับ shift;ลืม failedcomparison;นับ selfswap ต่างกันแล้วเทียบตัวเลขตรงๆ;หยุด bubble ก่อนครบ pass;คิด selectionbestO(n);บอก insertion/merge ทุกแบบ stable แม้เงื่อนไข tie ผิด;ลืม copyinput/tracecost

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 Trace และตัวนับ

**เฉลย:** [5,3,8,1,2]ทุกวิธีได้[1,2,3,5,8] Bubble10comparisons/7swaps,Selection10/3,Insertion9comparisons/7shifts ตามนิยามโค้ด ไม่ใช้ input6ค่าจากอีกหน้าแทน

### ข้อ2 Bestcase และขอบเขต

**เฉลย:** [1,2,3,4,5] Bubble4comparisons0swaps หยุด pass แรก;Selection10comparisons0swaps;Insertion4comparisons0shifts Empty และ singleton ทุกตัวนับ0

### ข้อ3 Stability

**เฉลย:** [(2,A),(2,B),(1,C)] selection ให้ C,B,A จึงไม่ stable;Bubble/Insertionkeynumeric ให้ C,A,B เพราะไม่ข้ามหรือเลื่อนค่าที่เท่ากัน

### ข้อ4 นับสำหรับ n100

**เฉลย:** Selection เปรียบ100×99/2=4950ครั้งและ swap ไม่เกิน99;reverseuniquebubble อาจ swap4950ครั้ง ความต่างต้นทุน swap ไม่ทำให้ selection เป็น O(n)

### ข้อ5 นักเรียนและคลัง

**เฉลย:** A160,B150,C160→B,A,C ภายใต้ bubblekeyheight ส่วน inventoryA5วัน,B2,C∞,D2→B,D,A,C ใน implementation นี้ usage0ต้อง∞ ไม่ให้สินค้าที่ไม่ถูกใช้เร่งด่วนสุด

### ข้อ6 Space และ growth

**เฉลย:** corebasic-sort ที่ทำใน array เดิมใช้ O(1)aux แต่ functions ตัวอย่าง copyinputO(n);trace หลาย pass อาจ O(n²) 3n+2เป็นΘ(n)เมื่อ operationcost คงที่ ไม่เท่ากับ n วินาที

## สรุปทบทวน {#summary}
นิยาม n/operation/case→ยืนยัน invariant→ไล่ทุก pass→แยก comparison/swap/shift→ทดสอบ tie→รวม copy/tracecost ไม่เลือก algorithm จาก Big-O อย่างเดียวโดยไม่ดูข้อมูลและต้นทุนย้าย

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week13 physical pp.3–41](../slides/Week13.pdf#page=3) — growth/Big-O,cases,bubble/selection/insertion,traces,stability/code
- แหล่ง lab เพิ่มเติม (local-only ไม่เผยแพร่ไฟล์งานส่ง): Lab13-1 ClassPhotoLineup,Lab13-2 WarehouseRestock,Hw13 LiveGameLeaderboard มี sources จริง แต่ dataset/solutions เพิ่มเติมในบทเป็นผู้เขียน
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง
