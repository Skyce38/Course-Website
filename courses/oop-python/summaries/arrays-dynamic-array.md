---
{"version":1,"id":"oop-python-arrays-dynamic-array","course":"oop-python","category":"summaries","slug":"arrays-dynamic-array","title":"Array, Dynamic Array และ Amortized Analysis","language":"th"}
---

> บท array รวม Week7 physical pp.24–62 กับ Week8 pp.3–24 โครงสร้าง doubling/shift และตัวเลข n8 มาจาก source โค้ดปรับเป็นโมเดลการเรียนโดยใช้ Python list เป็น buffer ไม่ใช่การวัดหน่วยความจำจริงของ CPython หรือ Carray

## เป้าหมายการเรียนรู้ {#objectives}
- แยก size/capacity,fixed/dynamic และ reference slots จาก object ที่ถูกชี้
- ไล่ resize/insert/remove/search และรักษา invariants บน empty/singleton/boundaries
- พิสูจน์ amortized bound ไม่ปน average case และอ่าน row-major2D
- ใช้ __len__,__getitem__,__setitem__,__str__,__repr__ ให้ตรง logical data

## Memory Model และ Random Access {#concepts}
Week7 pp.26–38:array มีช่องตำแหน่งต่อเนื่องในแบบจำลอง จึงคำนวณ base_address+i×element_size ได้โดยไม่เดินผ่านสมาชิกก่อนหน้า เป็นเหตุผลของ indexaccessO(1) เมื่อขนาดช่องคงที่

Python list เก็บ references ในช่อง ไม่ได้แปลว่า objects ที่มีชนิด/ขนาดต่างกันวางติดกันทั้งหมด

สูตรนี้ไม่ใช่วิธีหา address จริงของ Python object จาก id ด้วยการบวกเอง

FixedArray กำหนด capacity ตอนสร้างและปฏิเสธเมื่อเต็ม DynamicArray ขยาย buffer เมื่อจำเป็น จึงมี 0≤size≤capacity;size นับค่าจริงและ capacity นับ slot ทั้งหมด ค่า None อาจเป็นค่าจริงใน array ได้จึงห้ามใช้ None แทนขนาด การสร้าง capacity slots O(capacity) เป็นคนละคำถามกับการอ่าน index หนึ่งครั้ง O(1)

## Doubling และ Amortized Analysis {#amortized}
Week7 pp.40–47,Week8 pp.3–8:เริ่ม capacity1 ถ้าเต็มให้ allocate2 เท่า คัดลอกค่าจริงแล้ว append ใหม่ ตารางต่อไปนับ **การเขียนค่าใหม่+copy live cells** ตามแบบจำลอง source ไม่ใช่ทุก allocation instruction หรือเวลา wall-clock

| append ครั้ง | size | capacity หลัง | copies รอบนี้ | cost รอบนี้ | cost สะสม |
|---|---:|---:|---:|---:|---:|
|1|1|1|0|1|1|
|2|2|2|1|2|3|
|3|3|4|2|3|6|
|4|4|4|0|1|7|
|5|5|8|4|5|12|
|6|6|8|0|1|13|
|7|7|8|0|1|14|
|8|8|8|0|1|15|

n8 จึง cost15/8=1.875 ตาม Week8p.7 สำหรับ n>0 ผลรวม copy1+2+4+...ที่เกิดจริง<2n ดังนั้น cost<3n เป็น O(n) ทั้งลำดับและ O(1)amortized ต่อ append แต่ append ที่ resize ใช้ O(n) ไม่ใช่ average case สุ่มและไม่รับรองทุก call เร็วเท่ากัน

คำว่าเฉลี่ยเข้าใกล้ 3 ใน source เป็นภาพรวม upperbound ไม่ใช่ limit เดียวที่ทุก prefix วิ่งเข้าหา:ที่ n เป็นกำลังสอง cost/n เข้าใกล้ 2 และหลัง resize ใหม่อาจใกล้ 3 ยังถูกครอบด้วยค่าคงที่ การเพิ่ม capacity ทีละ 1 กลับ copy รวม 1+2+...+(n−1)=O(n²) โมเดล doubling นี้ไม่ใช่คำกล่าวว่า CPython ใช้ doubling เป๊ะ

## Python ที่รันเดี่ยวได้ {#python}
อิง DynamicArray/dunder/source implementation และ localFixedArray เพิ่ม strictintegerindices(ไม่รับ bool),instrumentation และ boundaries นโยบาย index ของโมเดลนี้ **ไม่รับ negativeindex/slices** ต่างจาก Python list;FixedArray เต็มใช้ OverflowError ซึ่งเป็น policy ผู้เขียน

```python
class FixedArray:
    def __init__(self, capacity):
        if type(capacity) is not int: raise TypeError("integer capacity")
        if capacity <= 0: raise ValueError("positive capacity")
        self._data, self._size = [None]*capacity, 0
    def add(self, value):
        if self._size == len(self._data): raise OverflowError("full")
        self._data[self._size] = value
        self._size += 1
    def get(self, index):
        if type(index) is not int: raise TypeError("integer index")
        if not 0 <= index < self._size: raise IndexError("out of bounds")
        return self._data[index]


class DynamicArray:
    def __init__(self):
        self._capacity, self._size = 1, 0
        self._data = [None]
        self.copies = 0  # instrumentation: copied live cells only
    def __len__(self): return self._size
    @property
    def capacity(self): return self._capacity
    def _index(self, i, insertion=False):
        if type(i) is not int: raise TypeError("integer index")
        if not 0 <= i < self._size + int(insertion): raise IndexError("out of bounds")
    def __getitem__(self, i):
        self._index(i)
        return self._data[i]
    def __setitem__(self, i, value):
        self._index(i)
        self._data[i] = value
    def __str__(self): return str([self._data[i] for i in range(self._size)])
    def __repr__(self): return f"DynamicArray(size={self._size}, capacity={self._capacity})"
    def _grow(self):
        new = [None]*(2*self._capacity)
        for i in range(self._size):
            new[i] = self._data[i]
            self.copies += 1
        self._data, self._capacity = new, 2*self._capacity
    def append(self, value):
        if self._size == self._capacity: self._grow()
        self._data[self._size] = value
        self._size += 1
    def insert_at(self, i, value):
        self._index(i, insertion=True)
        if self._size == self._capacity: self._grow()
        for j in range(self._size, i, -1): self._data[j] = self._data[j-1]
        self._data[i] = value
        self._size += 1
    def remove_at(self, i):
        self._index(i)
        old = self._data[i]
        for j in range(i, self._size-1): self._data[j] = self._data[j+1]
        self._size -= 1
        self._data[self._size] = None  # release unused reference, not a sentinel for live data
        return old
    def pop(self): return self.remove_at(self._size-1)
    def find(self, value):
        for i in range(self._size):
            if self._data[i] == value: return i
        return -1


class Matrix:
    def __init__(self, rows, cols):
        if type(rows) is not int or type(cols) is not int: raise TypeError("integer shape")
        if min(rows, cols) <= 0: raise ValueError("positive shape")
        self.rows, self.cols, self._data = rows, cols, [0]*(rows*cols)
    def _index(self, rc):
        r,c = rc
        if type(r) is not int or type(c) is not int: raise TypeError("integer coordinates")
        if not (0 <= r < self.rows and 0 <= c < self.cols): raise IndexError("out of bounds")
        return r*self.cols+c
    def __getitem__(self, rc): return self._data[self._index(rc)]
    def __setitem__(self, rc, value): self._data[self._index(rc)] = value


a = DynamicArray()
for value in range(10, 81, 10): a.append(value)
print(len(a), a.capacity, a.copies, len(a)+a.copies)  # 8 8 7 15
b = DynamicArray()
for value in [10,20,30,40]: b.append(value)
b.insert_at(1,99)
print(str(b), b.remove_at(1), str(b))  # [10, 99, 20, 30, 40] 99 [10, 20, 30, 40]
m = Matrix(3,4)
m[1,2] = 7
print(m._index((1,2)), m[1,2])  # 6 7
```

## Trace Insert และ Remove {#trace}
เริ่ม[10,20,30,40],size4/capacity4 insert_at(1,99):growcapacity8 ก่อน จากนั้นเลื่อนขวาเริ่มปลายสุด
```text
40: index3 → 4    [10,20,30,40,40,...]
30: index2 → 3    [10,20,30,30,40,...]
20: index1 → 2    [10,20,20,30,40,...]
99: ลงindex1     [10,99,20,30,40,...], size5
```
ถ้าเลื่อนซ้ายไปขวาค่าที่จะคัดลอกจะถูกทับ เช่นได้ 20 ซ้ำแทน 30/40 Removeindex1 เก็บ 99 ไว้ก่อน→เลื่อน index2→1,3→2,4→3→ลด size→clear ช่องท้าย ได้[10,20,30,40]และคืน 99 ตรงแนว Week8 pp.18–24

Invariant:liveelements อยู่ _data[0:size],ว่างหลัง size;pop ที่ท้ายไม่ต้องเลื่อนและไม่ shrink ในโมเดลนี้ จึง O(1) การคืนค่า removed ไม่ได้คัดลอก graph ของ object ถ้าเก็บ reference ก็คืน reference เดิม

## Search, 2D และการใช้ Composition {#matrix}
Week8 pp.10–15:unsortedsearch อาจต้องตรวจทุกค่าจึง O(n),find คืน index แรกหรือ−1 ถ้าไม่พบ ไม่ใช้−1 เป็น index ต่อโดยลืมตรวจ เพราะ Python list จะอ่านท้ายได้แต่โมเดลนี้ reject

Row-majorflat_index=row×num_cols+col;matrix3×4 ตำแหน่ง[1,2]ใช้ index1×4+2=6 ถ้าเป็น buffer ช่องละ 8bytes และ base1000 ในตัวอย่างสมมติ address=1048 **ไม่ใช่ id จริงของ Python** Nestedlists ของ Python อาจมี rows แยกกันและ`[[0]*4]*3`แชร์ row เดิม จึงไม่อนุมานว่าทุก matrix ใน Python เป็น contiguous2Dbuffer

Week8 pp.26–35 ใช้ DynamicArray เป็น part ของ Stack เพื่อจำกัด interfacepush/pop ให้ LIFO ตัว array ยังคงเป็น storage;ไม่ต้อง inherit ทุก method จน callerinsert กลาง stack ได้ รายละเอียด Stack อยู่บทแยกที่อ้างทั้ง Week8/11

## Complexity และข้อผิดพลาด {#complexity}
| Operation | เวลาในโมเดลนี้ | หมายเหตุ |
|---|---|---|
|get/set/len|O(1)|index ต้องอยู่ใน logicalsize|
|append|amortizedO(1),worstO(n)|resizecopy|
|insert/remove ตำแหน่ง i|O(n−i+1)และอาจ resizeO(n)|รวมงานคงที่แม้ไม่ต้องเลื่อน|
|pop ท้าย|O(1)|ไม่ shrink|
|find|O(n)worst|เทียบค่า O(1)ตามสมมติฐาน|
|str|O(n)บวกต้นทุน format|ไม่ใช่ O(1)เหมือน len|

พื้นที่ bufferO(capacity),ระหว่าง resize มี old+newbuffers จึงยัง O(n)peak ในช่วงขยาย บันทึก trace ทั้งลำดับมีต้นทุนเพิ่มของการสอนเอง ไม่รวมเป็นพื้นที่ core

ข้อผิดพลาด:len คืน capacity;ใช้ index ถึง slot ว่าง;เลื่อนผิดทิศ;ไม่ clearreference ที่เลิกใช้;ถือ amortized เป็นการสุ่ม;สร้าง nestedrows ด้วยการคูณแล้วคิดว่าอิสระ

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 แปด Appends

**เฉลย:** capacities หลังแต่ละครั้ง1,2,4,4,8,8,8,8;copy รวม1+2+4=7,write ใหม่8รวม15;ครั้ง5แพง5หน่วยจึงไม่ได้ O(1)ทุก call

### ข้อ2 Insert แล้ว Remove

**เฉลย:** [10,20,30,40]แทรก99index1ต้องเลื่อน3ค่าไปทางขวาจากปลายก่อน ได้[10,99,20,30,40];ลบ index1คืน99และเลื่อนกลับ3ค่า

### ข้อ3 ขอบเขตของ indices

**เฉลย:** array ว่าง get0/pop เกิด IndexError แต่ insert_at(0,x)ใช้ได้เพราะ insertion อนุญาต i=size;FixedArraycapacity1เติมหนึ่งตัวแล้ว add ซ้ำ OverflowError;None เป็น livevalue ได้

### ข้อ4 Row-major และ alias

**เฉลย:** 3×4ตำแหน่ง1,2คือ index6;[[0]*4]*3ทำให้แก้ row0col0กระทบทุก row เพราะแชร์ list เดียว ใช้ comprehension สร้างแต่ละ row หรือ Matrixflat ตามโค้ด

### ข้อ5 Amortized กับ Average

**เฉลย:** ลำดับ nappends มี copy เรขาคณิต<2n รวม write<3n ไม่สมมติ input สุ่ม;เปลี่ยนการขยายเป็นบวก1จะ copyO(n²) แม้บางครั้ง append ไม่ต้อง resize ก็ไม่ทำให้ทั้งลำดับ O(n)

## สรุปทบทวน {#summary}
แยก size/capacity→index จาก size→grow แล้ว copy→insert ขวาเริ่มท้าย/remove ซ้ายเริ่มต้น→clearunusedreferences→คิดต้นทุนทั้งลำดับ Row-major เป็น model ที่ประกาศไม่ใช่สมบัติ nestedlist ทุกตัว

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week7 physical pp.24–62](../slides/Week7.pdf#page=24) — linearstructures,arraymemory,static/dynamic,doubling,dunderimplementation
- [Week8 physical pp.3–35](../slides/Week8.pdf#page=3) — amortization,row-major,search,insert/delete,stackwrapper
- แหล่ง lab เพิ่มเติม (local-only ไม่เผยแพร่ไฟล์งานส่ง): Lab7-1/2/3 FixedArray/DynamicArray;Lab8-1 search,Lab8-2 Stack,Hw8 CinemaSeatingChart;dynamicArray.py/dynamicArray2.py inspected
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง
