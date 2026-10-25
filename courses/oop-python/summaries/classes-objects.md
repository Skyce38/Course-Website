---
{"version":1,"id":"oop-python-classes-objects","course":"oop-python","category":"summaries","slug":"classes-objects","title":"คลาส ออบเจ็กต์ และ Reference (Classes & Objects)","language":"th"}
---

> บท Week1 จากสไลด์ที่มีจริง ตัวอย่าง BankAccount ใช้โครงสร้าง/requirements จากแหล่งสอน แต่ลำดับตัวเลขและเฉลยด้านล่างเป็นตัวอย่างผู้เขียนที่ตรวจด้วย Python ไม่ใช่ระบบธนาคารใช้งานจริง

## เป้าหมายการเรียนรู้ {#objectives}
- แยก Class, Object, Attribute และ Method พร้อมเลือกใช้แทนกลุ่มตัวแปรที่แยกจากกัน
- ติดตาม self, initialization, reference และ alias โดยไม่สับสนกับการคัดลอก
- อ่านข้อผิดพลาด TypeError/AttributeError จากโค้ด และอธิบายขอบเขตของแบบจำลอง

## แนวคิดสำคัญ: จากตัวแปรสู่ Object {#concepts}
Week1 pp.3–13 ยกปัญหาบัญชีจำนวนมาก: owner/balance แยกจากฟังก์ชันจนจับคู่ผิดได้

Class คือแบบแปลนที่รวมข้อมูลและพฤติกรรม; instance คือ object ที่สร้างจากแบบแปลนนั้น เช่น BankAccount หนึ่งคลาสสร้างบัญชีหลายตัว แต่ละตัวมีสถานะของตนเอง Attribute คือ owner/balance; method คือ deposit/withdraw/get_balance ไม่ใช่ class=object หรือ method=ผลลัพธ์ของการเรียก

`a.deposit(500)` เป็น bound-method call ซึ่งส่ง a เป็น argument แรกให้ method โดยอัตโนมัติ จึงเทียบได้กับ `BankAccount.deposit(a, 500)` ชื่อ self เป็น convention ไม่ใช่ keyword แต่ควรใช้เพื่ออ่านง่าย กฎนี้กล่าวถึง **instance methods**; classmethod/staticmethod เป็นข้อยกเว้นที่ไม่ได้ต้องการแทนพฤติกรรมบัญชีในตัวอย่างนี้

`__init__` กำหนดค่าเริ่มต้นหลังสร้าง object แล้ว ไม่ใช่ตัวสร้างหน่วยความจำเอง และต้องคืน None (ไม่เขียน return ก็ได้) `self.balance=balance` สร้าง attribute ต่างจาก `balance=balance` ที่แตะเพียงตัวแปร local การใช้ PascalCase/snake_case ตาม pp.20–21 เป็น style convention ไม่ใช่เงื่อนไขที่ภาษาใช้ตัดสิน syntax

## Python ที่รันแยกได้ {#python}
โค้ดสาธิตตามแนวโจทย์ p.15 เพิ่มการปฏิเสธยอดเริ่มต้นติดลบและใช้ exceptions แทนการ print แล้วเดินต่อ รับตัวเลขปกติตามสมมติฐาน; validation ชนิด/NaN และ encapsulation อยู่ในบท properties ฟังก์ชัน display_info คืนข้อความเพื่อให้ทดสอบได้ ไม่พิมพ์ภายในเหมือนบางตัวอย่าง source

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("negative balance")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("positive amount required")
        self.balance += amount

    def withdraw(self, amount):
        if amount <= 0 or amount > self.balance:
            raise ValueError("invalid withdrawal")
        self.balance -= amount

    def get_balance(self):
        return self.balance

    def display_info(self):
        return f"{self.owner}: {self.balance:.2f}"


a = BankAccount("Alice", 1000)
b = BankAccount("Bob", 300)
a.deposit(500)
a.withdraw(200)
alias = a
alias.deposit(100)
print(a.display_info(), b.display_info())  # Alice: 1400.00 Bob: 300.00
print(alias is a, a is b)                 # True False
```

## ไล่สถานะทีละขั้น {#trace}
| คำสั่ง | a.balance | b.balance | เหตุผล |
|---|---:|---:|---|
| สร้าง a,b | 1000 | 300 | คนละ instance |
| a.deposit(500) | 1500 | 300 | self คือ a |
| a.withdraw(200) | 1300 | 300 | ลดเฉพาะ a |
| alias=a | 1300 | 300 | ไม่เรียก __init__ ใหม่ |
| alias.deposit(100) | 1400 | 300 | alias และ a ชี้ object เดียวกัน |

## Reference, อายุ และ Class vs Dictionary {#references}
pp.18–24 และ 30 แยก instance independence ออกจาก aliasing: object ใหม่เป็นอิสระ แต่สองชื่อที่อ้าง object เดิมย่อมเห็น mutation เดียวกัน ถ้า attributes เก็บ list ร่วมกันก็ยังแชร์ได้ด้วย การเขียน `del a` ลบชื่ออ้างอิง ไม่ได้บังคับทำลาย object ถ้ายังมี alias; การเก็บกวาดหน่วยความจำขึ้นกับการเข้าถึงได้/implementation ไม่ควรพึ่งเวลาทำลายที่แน่นอน

Dictionary เหมาะข้อมูล key/value ที่ยืดหยุ่น Class ช่วยกำหนด interface/invariants/พฤติกรรม แต่ไม่ได้เร็วกว่า dict ทุกกรณี และ public balance ของบทนี้ยังตั้งเป็นค่าผิดจากภายนอกได้ นั่นคือแรงจูงใจของบท encapsulation ไม่ใช่การรับรองว่ามี class แล้วข้อมูลปลอดภัยทันที

## ความซับซ้อนและขอบเขต {#complexity}
การอ่าน/ปรับค่าบัญชีในตัวอย่างถือ O(1) ภายใต้ตัวเลขขนาดคงที่; แสดงชื่อยาว m ตัวอักษรใช้ O(m) การวนแสดง n บัญชีต้องเยี่ยมทุกบัญชี O(n) โดยยังต้องรวมต้นทุนข้อความ ไม่ใช้เวลาจากตัวอย่างเล็กเป็นข้อพิสูจน์ Big-O เงินแบบ float ใช้เพื่อการเรียน ไม่ใช่นโยบายปัดเศษทางการเงิน

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
- ลืม self ใน signature หรือ self. หน้า attribute ทำให้จำนวน arguments ไม่ตรง/ไม่มี attribute
- `BankAccount.deposit(500)` ไม่ได้ส่ง instance; การเรียกผ่าน class ทำได้ถ้าส่ง instance อย่างถูกต้อง
- `return self` ใน __init__ ทำให้ TypeError; method ทั่วไปคืน object ได้แต่ __init__ ต้อง None
- คิดว่า `b=a` คือสำเนา หรือว่าทุก attribute เป็น private โดยอัตโนมัติ

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 Class หรือ Object?

**เฉลย:** BankAccount เป็น class; BankAccount("A",0) สร้าง instance ใหม่หนึ่งตัว ส่วนตัวแปร a เป็นชื่อที่อ้างถึง instance ไม่ใช่แบบแปลน

### ข้อ2 ลำดับฝากถอน

**เฉลย:** เริ่ม1000 ฝาก500 ถอน200 ได้1300;ถ้าถอน1400จาก1300จะ ValueError ก่อนลดเงิน จึงยัง1300 ไม่ใช่−100

### ข้อ3 Alias หลังลบชื่อ

**เฉลย:** หลัง alias=a และ del a ยังเรียก alias.get_balance()ได้ เพราะยังมี reference ถึง object;ไม่มีการสร้างสำเนาหรือรับรองว่าถูกทำลาย

### ข้อ4 ลืม self.balance

**เฉลย:** ถ้า__init__เขียนเพียง balance=balance จะเป็น local;ต่อมาอ่าน obj.balance เกิด AttributeError เว้นแต่มี attribute จากแหล่งอื่น ต้องกำหนด self.balance

### ข้อ5 ขอบเขตและ defaults

**เฉลย:** BankAccount("C")ได้ balance0 แยกจาก a; deposit(0)ถูกปฏิเสธเพราะ amount ต้อง>0 ในสัญญาของโค้ดนี้;__init__ที่ return1ทำให้ TypeError

## สรุปทบทวน {#summary}
Class กำหนดพฤติกรรมร่วม; instance เก็บสถานะ;self อ้างผู้รับ method;__init__ ตั้งค่าและคืน None;alias ไม่ใช่ copy ตรวจทั้งผลสำเร็จและข้อผิดพลาดโดยดูว่าสถานะเปลี่ยนเมื่อใด

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week1 physical pp.3–30](../slides/Week1.pdf#page=3) — class/object/self, BankAccount, lifecycle/style/dict/mistakes
- แหล่ง lab เพิ่มเติม (local-only ไม่เผยแพร่ไฟล์งานส่ง): Lab1.pdf pp.1–6; lab1-1.py เป็นตัวอย่างงานที่ต้องตรวจ validation เอง
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง
