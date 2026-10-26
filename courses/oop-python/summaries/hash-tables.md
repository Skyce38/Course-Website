---
{"version":1,"id":"oop-python-hash-tables","course":"oop-python","category":"summaries","slug":"hash-tables","title":"FINAL: Hash Tables, Collisions และ Dictionaries","language":"th"}
---

> FINAL: Week15 physical pp.2–36 ใช้ hash/chaining/linear probing/tombstone/load factor/dict จาก source โค้ดผู้เขียนเพิ่ม bounded probe และตรวจ existing key ก่อน reuse tombstone เพื่อแก้ edgecases ไม่อ้างว่าต้นฉบับที่ไม่มี full-table guard รองรับทุกกรณีแล้ว

## เป้าหมายการเรียนรู้ {#objectives}
- คำนวณ bucketindex/ชนกันและแยก collision จาก key เท่ากัน
- ทำ insert/update/get/delete ใน chaining และ linear probing โดยไม่ทำ key หายหรือ size ผิด
- วิเคราะห์ load factor/resize/expected/amortized/worst โดยระบุ assumptions
- แยก hashability,insertionorder และ choice ของ dict/OrderedDict/LinkedList

## Hash Function และ Collision {#concepts}
Week15 pp.2–11: index=hash(key)%capacity ช่วยระบุตำแหน่งตั้งต้น ไม่ต้อง scan ทุก key เมื่อ hash กระจายดี

hash เดียวกันไม่ได้แปลว่า key เท่ากันเพราะพื้นที่ hash/buckets จำกัด (pigeonholeprinciple) ต้องใช้ equality ตรวจ key จริงด้วย

Hash ที่ใช้งานได้ต้องคงที่ระหว่างใช้ key ในตารางและ key ที่เท่ากันต้องมี hash เท่ากัน การกระจายสม่ำเสมอและคำนวณเร็วช่วย performance แต่ไม่ได้ห้าม collision หรือรับรองทุก keyO(1) โดยไม่ดูขนาด key การ hashstring ยาว m อาจมีต้นทุน O(m) และ equals ก็แพงได้ จึงประกาศ key cost คงที่เมื่อวิเคราะห์ O(1) แบบย่อ

## Chaining และ Linear Probing {#resolution}
pp.12–16:chaining เก็บหลาย(key,value) ใน bucket เดียว แยกแต่ละ list ด้วย comprehension ไม่ใช้ `[[]]*capacity`ซึ่งแชร์ list เดียวทั่วตาราง เมื่อ key มีอยู่ insert คือ update ไม่เพิ่ม size;key ต่างที่ hash ชนกันต้องอยู่ร่วมกันได้

Linear probing สำรวจ(index+step)%capacity ใน array เดียว None แปลไม่เคยใช้จึงหยุดค้นได้ แต่ตำแหน่งที่เคยมี key แล้วลบต้องใช้ TOMBSTONE ไม่ใช่ None เพราะมี keys ที่ถูกเลื่อนไปด้านหลังยังอาศัย probechain นี้อยู่

**ขยายความจาก source:**insert ต้องค้นต่อผ่าน tombstone เพื่อหา key เดิมก่อน มิฉะนั้น update อาจกลายเป็น duplicate key และทุก probe ต้องมีขอบเขต capacity ครั้งเพื่อไม่วนไม่จบเมื่อตารางเต็ม/มีแต่ tombstones ใช้`is`กับ sentinel เพื่อไม่ให้ custom equality เปลี่ยนความหมายของ marker

## Load Factor และ Resizing {#load}
pp.18–20:α=size/capacity เช่น 3/4=.75 เป็น threshold ที่ source เลือก ไม่ใช่ค่ากฎตายตัวทุก library Chaining อาจมีα>1 ได้เพราะหนึ่ง bucket เก็บหลาย entry แต่ประสิทธิภาพเปลี่ยนตาม chain ส่วน open addressing ต้องมีช่องหรือ policyfull ที่ชัด

ตัวอย่าง chaining ขยาย 2 เท่าก่อนเพิ่ม key ใหม่ที่จะทำให้α>.75 และไม่ resize เพียง updatekey เดิม (policy ผู้เขียนชัดเจน ต่างจาก source ที่ตรวจ load ปัจจุบันก่อนทุก insert) ต้อง rehash ด้วย capacity ใหม่ ไม่ copyentries ไว้ index เดิมเฉยๆ Rehash หนึ่งครั้งมีต้นทุนคาดหมาย O(n+capacity) เมื่อ hash กระจายเหมาะสม สำหรับโค้ดด้านล่างที่นำ entry กลับผ่าน insert ซึ่งตรวจ equality ใน bucket หากทุก key ชนกัน การ rebuild อาจใช้ O(n²+capacity) ไม่ใช่ linear worst case ส่วนลำดับการโตเรขาคณิตให้ expected amortizedO(1)insert เมื่อ hash/equals คงที่และกระจายเหมาะสม ไม่รับรอง worst case ของแต่ละ call

## Python: สอง Models ที่ตรวจ Edge Cases {#python}
ตัวอย่าง Linear Probing (LP) ใช้ capacity คงที่ เมื่อเต็มจะเกิด OverflowError โดยไม่ขยายเอง ส่วน Chaining ขยายขนาดอัตโนมัติตาม policy ที่อธิบายไว้ข้างต้น

ในโค้ดนี้ delete คืนค่าที่ลบตาม policy ผู้เขียน และ None เป็น value หรือ key ภายใน entry tuple ได้ ต้องแยกข้อมูลนั้นออกจาก None ที่ใช้แทนช่องว่างของตาราง

ForcedKey กำหนดค่า hash เป็น 2 เพื่อให้ไล่ trace ซ้ำได้โดยไม่ขึ้นกับ hash salt ของแต่ละ process

```python
from collections import OrderedDict


class ChainingHashTable:
    def __init__(self, capacity=8):
        if type(capacity) is not int: raise TypeError("integer capacity")
        if capacity<=0: raise ValueError("positive capacity")
        self._capacity, self._size = capacity,0
        self._buckets = [[] for _ in range(capacity)]
    def __len__(self): return self._size
    @property
    def load_factor(self): return self._size/self._capacity
    def _index(self,key): return hash(key)%self._capacity
    def insert(self,key,value):
        bucket=self._buckets[self._index(key)]
        for i,(old,_) in enumerate(bucket):
            if old==key:
                bucket[i]=(key,value);return  # updates do not change size or force resize
        if (self._size+1)/self._capacity > .75:
            old=self._buckets
            self._capacity*=2;self._size=0
            self._buckets=[[] for _ in range(self._capacity)]
            for chain in old:
                for k,v in chain:self.insert(k,v)
            bucket=self._buckets[self._index(key)]
        bucket.append((key,value));self._size+=1
    def get(self,key):
        for k,v in self._buckets[self._index(key)]:
            if k==key:return v
        raise KeyError(key)
    def delete(self,key):
        bucket=self._buckets[self._index(key)]
        for i,(k,v) in enumerate(bucket):
            if k==key:
                bucket.pop(i);self._size-=1;return v
        raise KeyError(key)


class LinearProbingHashTable:
    TOMBSTONE=object()
    def __init__(self, capacity=8):
        if type(capacity) is not int: raise TypeError("integer capacity")
        if capacity<=0:raise ValueError("positive capacity")
        self._capacity,self._size=capacity,0
        self._table=[None]*capacity
    def __len__(self):return self._size
    def _slot(self,key,inserting=False):
        first_deleted=None
        start=hash(key)%self._capacity
        for step in range(self._capacity):  # bounded even if table has no unused cells
            i=(start+step)%self._capacity;entry=self._table[i]
            if entry is None:
                if inserting:return first_deleted if first_deleted is not None else i
                raise KeyError(key)
            if entry is self.TOMBSTONE:
                if first_deleted is None:first_deleted=i
            elif entry[0]==key:return i
        if inserting and first_deleted is not None:return first_deleted
        if inserting:raise OverflowError("full table")
        raise KeyError(key)
    def insert(self,key,value):
        i=self._slot(key,True)
        if self._table[i] is None or self._table[i] is self.TOMBSTONE:self._size+=1
        self._table[i]=(key,value)
    def get(self,key):return self._table[self._slot(key)][1]
    def delete(self,key):
        i=self._slot(key);value=self._table[i][1]
        self._table[i]=self.TOMBSTONE;self._size-=1
        return value


class ForcedKey:
    def __init__(self,name):self.name=name
    def __hash__(self):return 2  # deterministic collisions for teaching, not a good general hash
    def __eq__(self,other):return isinstance(other,ForcedKey) and self.name==other.name


a,b,c=map(ForcedKey,'ABC')
t=LinearProbingHashTable(5)
for key,value in [(a,1),(b,2),(c,3)]:t.insert(key,value)
t.delete(a);t.insert(b,42)
print(t.get(b),t.get(c),len(t))  # 42 3 2
h=ChainingHashTable(4)
for k in range(4):h.insert(k,k*k)
print(h._capacity,len(h),h.get(3)) # 8 4 9
order=OrderedDict([('A',1),('B',2)])
order.move_to_end('A')
print(list(order),order.popitem(last=False)) # ['B','A'] ('B',2)
```

## Trace Probe และ Tombstone {#trace}
cap5,A/B/C ต่าง key แต่ hash2 ทั้งหมด:

| ขั้น | slot2 | slot3 | slot4 | size |
|---|---|---|---|---:|
|insertA1|A1|ว่าง|ว่าง|1|
|insertB2|A1|B2|ว่าง|2|
|insertC3|A1|B2|C3|3|
|deleteA|TOMBSTONE|B2|C3|2|
|updateB42|TOMBSTONE|B42|C3|2|

getB เริ่ม 2 เห็น marker ต้องไป 3 จึงได้ 42 ถ้า deleteA ใส่ None จะหยุดที่ 2 และตอบผิดว่า B ไม่มี ถ้า insertB42reuse2 ทันทีจะได้ B ซ้ำทั้ง 2/3 และ size ผิด ดังนั้นจำ firsttombstone ได้แต่ต้องตรวจ key เดิมต่อก่อน ถ้าทั้งตารางไม่มี None และหา key ไม่พบ probe ครบ capacity ครั้งแล้วจบ ไม่วนตลอดไป

## Python dict, Hashability และ Ordering {#dict}
Week15 pp.22–24:dict รักษา insertionorder แต่ไม่ใช่ sort ตาม hash/ชื่อ key update ค่าเดิมไม่ย้ายตำแหน่ง;ลบแล้ว insert ใหม่ไปท้าย ต่างจาก bucketiteration ของ teachingHashTable ซึ่งไม่ได้รับรอง insertionorder

คำสรุป source ว่า mutable ทุกชนิดห้ามเป็น key นั้นกว้างเกินไป:เงื่อนไขจริงคือ hashable และ hash/equality ต้องสอดคล้องคงที่ list/dict/set ทั่วไป unhashable;tuplehashable เฉพาะเมื่อทุกสมาชิก hashable;user-defined object ที่ใช้ identityhash อาจมี attributes เปลี่ยนได้และยังเป็น key ได้ ถ้า overrideeq โดยไม่มี hash ที่เข้ากันอาจทำให้ unhashable หรือทำตารางผิดเมื่อเปลี่ยนข้อมูลที่กำหนด hash

Hash ของ string อาจเปลี่ยนข้าม process เพื่อ randomization จึงใช้ ForcedKey เมื่อต้องการ buckettrace เดิมทุกครั้ง ไม่ผูก test กับ hash("alice") เป็นเลขคงที่ และไม่ใช้ hash ทั่วไปแทน cryptographichash/passwordstorage

## เปรียบเทียบ Implementations (คำอธิบายเสริม) {#comparison}
| ตัวเลือก | Function/order | เวลาและข้อสมมติ | Memory |
|---|---|---|---|
|dict|mapping/insertionorder|lookup/updateexpectedO(1),worstO(n)ตาม key/hash|index/entries และ sparecapacity|
|OrderedDict|mapping พร้อม move_to_end/popitem เลือกปลาย|เหมาะ reordering;ไม่อ้างเร็วกว่าทุกงาน|มี overhead สำหรับ order เพิ่มตาม implementation ไม่ให้ตัวเลข bytes ที่ไม่ได้วัด|
|LinkedList|sequence/nodeoperations|ค้น keyO(n);knownnodeoperationO(1)เมื่อมี links ที่ต้องใช้|nodes/references;ไม่ได้เร็วหรือเล็กกว่า array เสมอ|

OrderedDict เป็น standard-librarysupplement ไม่อ้างว่า Week15 สอนครบหรือพบ NewsManager/DailyFeedproject เพราะไม่มี sources เหล่านั้น การได้ output ลำดับเดียวกันไม่พิสูจน์ complexity/memory เท่ากัน ต้องระบุว่าเข้าถึงด้วย key หรือตัว node และวัดอะไร

## Complexity และข้อผิดพลาด {#complexity}
Chainingexpectedlookup/insert/delete O(1+α) เมื่อ hash กระจาย uniform และ key operations คงที่;resizeinsert เป็น amortized;worst ทุก key ชนกัน O(n) LPprobe ยาวได้ถึง capacity และ tombstones จำนวนมากทำให้ probe แพงแม้ liveαต่ำ การ rehash เพื่อล้าง marker เป็นแนวทางออกแบบเพิ่มเติม แต่ LPfixed ในโค้ดนี้ยังไม่ทำเอง

พื้นที่ chainingO(capacity+n),LP O(capacity) ข้อผิดพลาดหลัก:None แทน tombstone,update เพิ่ม size,แชร์ bucket list,ไม่เปลี่ยน modulus ตอน resize,probe ไม่ bounded,ถือ hash เท่ากับ equality,จำ bucket ตัวเลขจาก run อื่นหรืออ้าง mutable ทุก objectunhashable

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 Bucket และ collision

**เฉลย:** hash สมมติ10กับ18ที่ cap8ให้ index2ทั้งคู่ แต่ยังต้องแยก keys ด้วย equality Collision ไม่ใช่ duplicatekey และไม่ใช่เหตุผลทิ้ง entry เก่า

### ข้อ2 Tombstone จำเป็นอย่างไร

**เฉลย:** A2/B3/C4ตาม trace deleteA ต้อง marker2จึงค้น B ที่3ได้ ถ้าใส่ None จะ KeyError ผิด;updateB ต้องตรวจจนพบ3ก่อน reuse2และ size ยัง2

### ข้อ3 เต็มหรือมีแต่ markers

**เฉลย:** LPcap1ใส่ A แล้วใส่ B ใหม่ OverflowError แต่ updateA ยังได้;ลบ A แล้วใส่ B ใช้ marker เดิม;ค้น key ที่ไม่มีต้องจบหลังไม่เกิน capacityprobe ไม่ infinite loop

### ข้อ4 Load และ rehash

**เฉลย:** cap4มี3keys α=.75 เพิ่ม key ที่4ตาม policy ผู้เขียนขยายเป็น8ได้α=.5;การ update หนึ่งใน3เดิมไม่เพิ่ม size/ไม่บังคับ resize ต้อง rehashindices ตาม modulus8

### ข้อ5 Hashable หรือไม่

**เฉลย:** [1,2]และ`([1,2],)`ที่มี list ใช้เป็น key ไม่ได้;`(1,2)`ได้;customobject ที่ยังใช้ identityhash อาจ mutable แต่ hashable ได้ ต้องรักษา equal→samehash ไม่สรุป mutable ทั้งหมดถูกห้าม

### ข้อ6 Output เท่ากันแต่ต้นทุนต่าง

**เฉลย:** dictupdateA รักษาลำดับ A,B ส่วน OrderedDict.move_to_end(A)ทำ B,A ได้โดย interface เฉพาะ;LinkedList ค้น A อาจ O(n)ถ้ามีแค่ head ไม่ใช่ O(1)เพราะใช้ knownnodeoperation ได้ในกรณีอื่น ไม่มี NewsManagerrequirements ให้อนุมาน

## สรุปทบทวน {#summary}
Hash ระบุตำแหน่งตั้งต้น→equals ยืนยัน key→เลือก chain/probe→delete ต้องรักษา searchchain→update ไม่นับ key ใหม่→rehash เมื่อ policy กำหนด→วิเคราะห์ expected/amortized/worst แยกกัน ไม่จำ bucket ที่ขึ้นกับ hash salt

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week15 physical pp.2–36](../slides/Week15.pdf#page=2) — hashfunctions/collisions,chaining/probing,tombstones,load/rehash,dict/classes
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง

- [Python glossary: hashable](https://docs.python.org/3/glossary.html#term-hashable) — เอกสารทางการเสริม/แก้ข้อสรุปเรื่อง mutable ไม่ใช่ข้อมูลข้อสอบทางการ
