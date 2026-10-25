---
{"version":1,"id":"oop-python-queue","course":"oop-python","category":"summaries","slug":"queue","title":"FINAL: Queue, Circular Queue, Deque และ Priority Queue","language":"th"}
---

> FINAL: Queue จาก Week12 physical pp.3–49 ครอบคลุม FIFO,linked/circular/deque/priority โค้ด source-derived ปรับให้อ่าน/test อิสระ ตัวเลข/เฉลยที่ขยายเป็นงานผู้เขียน ไม่สมมติว่า heapq เป็น FIFO เอง

## เป้าหมายการเรียนรู้ {#objectives}
- ติดตาม front/rear/head/tail และความต่าง Stack กับ Queue ADT
- ตรวจ wrap-around/full/empty ด้วย size และ modulararithmetic
- เลือก deque/priorityqueue ตามสัญญา และทำ stable ties ด้วย arrival counter
- วิเคราะห์เวลาทั้ง core operation และการแปลงข้อมูลเพื่อแสดงผล

## FIFO และ Linked Queue {#concepts}
Week12 pp.3–18:เข้าก่อนออกก่อน (First In, First Out) enqueue เพิ่ม rear, dequeue คืนและนำ front ออก,peek อ่าน front มี head/tail ทำให้ linkedqueue เพิ่มท้าย/ลบต้น O(1) โดยไม่เดินหาแต่ละตำแหน่ง ต่างจาก stack ที่ push/pop ที่ head เดียวกัน

Python list.append ท้าย amortizedO(1) แต่ pop(0) ต้องเลื่อนสมาชิก O(n) การเปลี่ยนชื่อ method เป็น dequeue ไม่ได้เปลี่ยนกลไกนี้ ข้อมูลเมื่อเหลือหนึ่งตัวแล้ว dequeue ต้องตั้งทั้ง head และ tail เป็น None มิฉะนั้น enqueue ใหม่อาจต่อท้าย node ที่ไม่ได้อยู่ใน queue แล้ว

## Circular Queue และตัวชี้ {#circular}
pp.20–24,43–45:reuse ช่องว่างใน array ด้วย modulo ไม่ขยาย capacity และไม่เลื่อนสมาชิกทุก dequeue ในโค้ดนี้ rear หมายถึง **ช่องที่จะใส่ครั้งถัดไป** ไม่ใช่ตำแหน่งสมาชิกสุดท้าย front คือค่าที่จะออกถัดไป

`rear=(rear+1)%capacity`, `front=(front+1)%capacity` โดย size แยกสถานะ empty0/fullcapacity เพราะ front==rear พบได้ทั้งสองสถานะ Capacity ต้องเป็น positiveinteger ก่อน allocate;clear ช่องที่นำออกเพื่อปล่อย reference แต่ None ใน livequeue ยังเป็นข้อมูลได้เพราะใช้ size นับ

## Python ที่รันเดี่ยวได้ {#python}
อิง source Node/Queue/CircularQueue/PriorityQueue เพิ่ม strict positive capacity และ integer priority เป็น policy ที่ระบุชัด ไม่ overwrite เมื่อ full ต่างจาก boundeddeque(maxlen) ที่อาจทิ้งค่าคนละนโยบาย

```python
from collections import deque
import heapq


class Node:
    def __init__(self, value): self.value, self.next = value, None


class LinkedQueue:
    def __init__(self): self._head, self._tail, self._size = None, None, 0
    def __len__(self): return self._size
    def is_empty(self): return self._size==0
    def enqueue(self, value):
        node = Node(value)
        if self._tail is None: self._head = node
        else: self._tail.next = node
        self._tail = node
        self._size += 1
    def peek(self):
        if self.is_empty(): raise IndexError("empty queue")
        return self._head.value
    def dequeue(self):
        value = self.peek()
        self._head = self._head.next
        self._size -= 1
        if self._head is None: self._tail = None
        return value


class CircularQueue:
    def __init__(self, capacity):
        if type(capacity) is not int: raise TypeError("integer capacity")
        if capacity<=0: raise ValueError("positive capacity")
        self._data, self._capacity = [None]*capacity, capacity
        self._front = self._rear = self._size = 0
    def __len__(self): return self._size
    def is_empty(self): return self._size==0
    def is_full(self): return self._size==self._capacity
    def enqueue(self, value):
        if self.is_full(): raise OverflowError("full queue")
        self._data[self._rear] = value
        self._rear = (self._rear+1)%self._capacity
        self._size += 1
    def peek(self):
        if self.is_empty(): raise IndexError("empty queue")
        return self._data[self._front]
    def dequeue(self):
        value = self.peek()
        self._data[self._front] = None
        self._front = (self._front+1)%self._capacity
        self._size -= 1
        return value
    def items(self):
        return [self._data[(self._front+i)%self._capacity] for i in range(self._size)]


class PriorityQueue:
    def __init__(self): self._heap, self._counter = [], 0
    def __len__(self): return len(self._heap)
    def enqueue(self, item, priority):
        if type(priority) is not int: raise TypeError("integer priority")
        heapq.heappush(self._heap,(priority,self._counter,item))
        self._counter += 1
    def peek(self):
        if not self._heap: raise IndexError("empty priority queue")
        priority,_,item = self._heap[0]
        return item,priority
    def dequeue(self):
        if not self._heap: raise IndexError("empty priority queue")
        priority,_,item = heapq.heappop(self._heap)
        return item,priority


q = CircularQueue(5)
for x in 'ABCDE': q.enqueue(x)
for _ in range(3): q.dequeue()
q.enqueue('F'); q.enqueue('G')
print(q._data,q.items(),q._front,q._rear)  # ['F','G',None,'D','E'] ['D','E','F','G'] 3 2
pq = PriorityQueue()
pq.enqueue('A',2);pq.enqueue('B',1);pq.enqueue('C',2)
print([pq.dequeue() for _ in range(3)])  # [('B',1),('A',2),('C',2)]
d = deque(['A','B']);d.appendleft('VIP');d.append('C')
print(d.popleft(),d.pop(),list(d))       # VIP C ['A','B']
```

## Trace Circular จาก Source {#trace}
Week12 pp.20–22 เริ่ม cap5 A,B,C,D,E เต็ม;dequeue สามครั้งนำ A,B,C ออก จากนั้น enqueueF,G

| ขั้น | buffer กายภาพ | front | rear(ช่องถัดไป) | size | ลำดับ FIFO |
|---|---|---:|---:|---:|---|
|เต็ม|A B C D E|0|0|5|A B C D E|
|ลบ3|_ _ _ D E|3|0|2|D E|
|ใส่ F|F _ _ D E|3|1|3|D E F|
|ใส่ G|F G _ D E|3|2|4|D E F G|

ลำดับทางกายภาพไม่ใช่ logical order การแสดงผลต้องเดิน `(front+i)%capacity` เพียง size ครั้ง Source บาง diagramrear ชี้ค่าตัวสุดท้าย แต่ classcode ใช้ช่องถัดไป จึงประกาศนิยามก่อน trace ไม่สลับสอง conventions

## Deque และการเลือก ADT {#deque}
pp.26–30:double-endedqueue เพิ่ม/ลบได้สองปลาย:append/appendleft,pop/popleft;peek ใช้[0]/[-1]เมื่อไม่ว่าง เหมาะคิวทั่วไป/ประวัติ/งานสองปลาย ตรงข้ามกับ APIStack หรือ Queue ที่ตั้งใจจำกัดการใช้

ความเป็น deque ไม่ได้ทำให้ค้น/ลบค่ากลาง O(1) ข้อกำหนด boundeddeque อาจ discard อีกฝั่งเมื่อเต็ม ส่วน CircularQueue ตัวอย่าง raiseOverflowError ต้องเลือกตามงาน

ตัวอย่างที่มีจริง:PrintJobScheduler ใช้ FIFO;RestaurantWaitlist มีการจัดการสองปลาย;BoundedUndoHistory จำกัดประวัติเก่า นี่คือโจทย์ local ที่ตรวจแล้ว ไม่ใช่การสร้าง requirementsNewsManager ซึ่งไม่พบ source

## Priority Queue และ Tie Breaking {#priority}
pp.32–37,47–49:heapq เป็น min-heap จึง priority เลขน้อยออกก่อน Tuple(priority,arrival_order,item) ทำให้เมื่อ priority เท่ากันออกก่อนตาม arrivalorder และไม่ต้องเปรียบเทียบ item ที่อาจเป็น dict/object ไม่มี ordering

A(priority2,counter0),B(1,1),C(2,2)→B,A,C ไม่ใช่ FIFO ล้วนและไม่ใช่ C ก่อน A เพราะชื่อมากกว่า `peek/dequeue`คืน(item,priority) ตาม interfaceclass;heap เก็บ(priority,counter,item) เป็น implementation ภายใน ถ้าต้องการคะแนนมากก่อนอาจแปลงเป็น negativekey อย่างชัดเจน ไม่เปลี่ยนกฎแอบๆ HospitalTriage ใช้ระดับฉุกเฉินตาม task ที่ระบุ ไม่อนุมาน policy ทางการแพทย์จริงจากตัวเลขจำลอง

## Complexity และข้อผิดพลาด {#complexity}
| งาน | เวลา | สมมติฐาน |
|---|---|---|
|linked enqueue/dequeue/peek|O(1)|มี head/tail และ size;allocation คงที่ตาม model|
|circular enqueue/dequeue/peek|O(1)|capacity คงที่ ไม่มี resize|
|สร้าง circularbuffer|O(capacity)|เติม None เริ่มต้น|
|circular items/str|O(n)|ต้องอ่านทุก liveitem|
|deque ปลายทั้งสอง|O(1)ตาม modeloperation|ไม่รวม scan กลาง|
|heap enqueue/dequeue|O(log n)coreheap|listgrowth อาจ resize;รวมเป็น amortized/expectedimplementationcost ที่ระบุ|
|heap peek|O(1)|ไม่ลบ root|

พื้นที่ทั้งหมด O(n) หรือ O(capacity) ของ circular ข้อผิดพลาด:ลืม resettail,ใช้ front==rear ตัดสิน empty โดยไม่ดู size,mod0,อ่าน rawbuffer เป็น FIFO,overwritefull โดยไม่ได้ตกลง,ไม่ใส่ counter จน payload ถูกเปรียบเทียบหรือ tie ไม่เป็น FIFO

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 Linked queue ว่างอีกครั้ง

**เฉลย:** enqueueA แล้ว dequeue คืน A และ head/tail ต้อง None ทั้งคู่ ต่อ enqueueB แล้ว peek ได้ B,size1 ไม่ต่อ nodeA ที่ลบไปแล้ว

### ข้อ2 Wrap-around

**เฉลย:** cap5ตามตารางหลัง dequeue3แล้วใส่ F,G ได้ raw[F,G,None,D,E],front3,rear2,size4 แต่ FIFO คือ D,E,F,G ไม่อ่าน raw เริ่มช่อง0

### ข้อ3 Full กับ Empty

**เฉลย:** cap3ใส่ A,B,C front=rear=0,size3คือ full;นำออกครบ front=rear=0,size0คือ empty จึงต้องมี size หรือ policy ช่องสำรองที่ประกาศ

### ข้อ4 Priority และ payload

**เฉลย:** A2,B1,C2ออก B1,A2,C2เพราะ counter0<2สำหรับ tie;dictpayload สองตัว priority เท่ากันก็ใช้ได้เพราะ counter แยกก่อนถึง dict

### ข้อ5 Deque หรือ Circular

**เฉลย:** ถ้าต้องเพิ่ม VIP ด้านหน้าและคนทั่วไปด้านท้าย deque ตรงกว่า FIFO จำกัด;ถ้าต้อง reject เมื่อ buffer เต็มให้ใช้ policyexplicit ของ CircularQueue ไม่ใช้ maxlen แล้วปล่อยทิ้งประวัติโดยไม่บอก

### ข้อ6 Error และ complexity

**เฉลย:** capacity0→ValueError,bool→TypeError ตาม policy;dequeue ว่าง IndexError,enqueuecircular เต็ม OverflowError และ state เดิมไม่เปลี่ยน items()O(n)ไม่ได้ทำให้ enqueue หนึ่งครั้งกลายเป็น O(n)ถ้าไม่เรียก items ภายใน

## สรุปทบทวน {#summary}
เลือก FIFO/deque/priority ก่อนเลือก storage;linked ต้อง headtail สอดคล้อง;circular ระบุ rear นิยามและ size;heap ใช้(priority,counter,item) เมื่ออยากได้ FIFO ใน tie ตรวจ empty/full/wrap และ complexity ของ method ที่เรียกจริง

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week12 physical pp.3–49](../slides/Week12.pdf#page=3) — FIFO,linkedqueue,circular,dequeue/deque,heappriority/counter และ classes
- แหล่ง lab เพิ่มเติม (local-only ไม่เผยแพร่ไฟล์งานส่ง): Lab12-1 PrintJobScheduler,Lab12-2 RestaurantWaitlist,Lab12-3 HospitalTriage,Hw12 BoundedUndoHistory;queue_ll.py,circular_queue.py,priority_queue.py ตรวจ read-only
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง
