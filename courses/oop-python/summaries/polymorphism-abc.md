---
{"version":1,"id":"oop-python-polymorphism-abc","course":"oop-python","category":"summaries","slug":"polymorphism-abc","title":"Polymorphism, Duck Typing และ Abstract Classes","language":"th"}
---

> Week4: จาก isinstancechain สู่ interface ร่วม, Duck Typing และ ABC ตัวอย่าง Shape/Circle/Rectangle อิง source ส่วนขนาด2,3,4และ Badge เป็นค่าตัวอย่างเสริมผู้เขียน ไม่ใช่ข้อสอบจริง

## เป้าหมายการเรียนรู้ {#objectives}
- เรียกพฤติกรรมผ่าน interface ร่วมโดยไม่เพิ่ม if ชนิดทุกครั้ง
- แยก ducktyping,ABC,abstractmethod และการตรวจชนิด
- คำนวณพื้นที่/เส้นรอบรูป ติดตาม dynamicdispatch และทดสอบ abstract/invalidinputs

## Polymorphism และ Duck Typing {#concepts}
pp.3–11: polymorphism คือการเรียก operation เดียวกันแล้วแต่ละ object ทำงานตาม implementation ของมัน เช่น s.area()แสดงพฤติกรรม Circle หรือ Rectangle โดยไม่ต้อง ifisinstance เป็นสายยาว ทุกครั้งที่เพิ่มชนิดใหม่ client ที่อิง interface เดิมไม่ควรต้องรู้สูตรใหม่

Ducktyping ต้องการพฤติกรรมที่ใช้จริง ไม่จำเป็นต้องสืบทอด class เดียวกัน:total_area ใช้เพียง area ดังนั้น Badge ที่มี area ใช้ได้ แต่ Badge ไม่จำเป็นต้องมี perimeter และไม่ผ่าน isinstance(Shape) การมีชื่อ method อย่างเดียวไม่พิสูจน์ว่าผลลัพธ์ตรง contract;เช่นคืน str แทนตัวเลขจะทำให้ sum ล้มเหลว

## ABC และขอบเขตการบังคับ {#abc}
pp.13–24: Shape สืบทอด ABC เพื่อใช้ ABCMeta และทำเครื่องหมาย area/perimeter ด้วย abstractmethod จึงสร้าง Shape หรือ subclass ที่ยังไม่ทำครบไม่ได้ (TypeError) method ธรรมดา describe ใช้ร่วมกันได้

`ABC`โดยไม่มี abstractmethod ที่ค้างอยู่ยังสร้าง instance ได้ การตกแต่ง abstractmethod เพียงอย่างเดียวบน class ที่ไม่ใช้ ABCMeta ไม่ใช่การบังคับโดยอัตโนมัติ Abstractmethod มี body ได้และ child อาจเรียก super เพื่อ reusebody แต่ยังต้อง override หากค้างสถานะ abstract ชี้ให้แยกจากคำอธิบายย่อในบางหน้า ไม่สรุปว่ามี body แล้วหมดความเป็น abstract ทันที

## Python: Interface เดียว หลายสูตร {#python}
อิง pp.27–39 เพิ่มการปฏิเสธ bool/NaN/infinity อย่างเปิดเผยเพื่อให้ช่วงค่าชัด โค้ดเป็นตัวอย่างย่อยที่รันได้เอง ไม่ใช่ fullpayment/vehiclelab

```python
from abc import ABC, abstractmethod
from math import pi, isfinite


def positive(value):
    if type(value) not in (int, float): raise TypeError("number required")
    if not isfinite(value) or value <= 0: raise ValueError("positive finite value")
    return value


class Shape(ABC):
    @abstractmethod
    def area(self): pass
    @abstractmethod
    def perimeter(self): pass
    def describe(self):
        return f"{type(self).__name__}: {self.area():.2f}, {self.perimeter():.2f}"


class Circle(Shape):
    def __init__(self, radius): self.radius = radius
    @property
    def radius(self): return self.__radius
    @radius.setter
    def radius(self, value): self.__radius = positive(value)
    def area(self): return pi*self.radius**2
    def perimeter(self): return 2*pi*self.radius


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width, self.height = width, height
    @property
    def width(self): return self.__width
    @width.setter
    def width(self, value): self.__width = positive(value)
    @property
    def height(self): return self.__height
    @height.setter
    def height(self, value): self.__height = positive(value)
    def area(self): return self.width*self.height
    def perimeter(self): return 2*(self.width+self.height)


def total_area(shapes): return sum(s.area() for s in shapes)


class Badge:  # duck-typed, not a Shape subclass
    def area(self): return 1


shapes = [Circle(2), Rectangle(3, 4)]
for s in shapes: print(s.describe())  # Circle: 12.57, 12.57 / Rectangle: 12.00, 14.00
print(total_area([Rectangle(2, 2), Badge()]))  # 5
```

## Trace การเรียก {#trace}
| object | describe เรียก | area | perimeter |
|---|---|---:|---:|
| Circle(2) | Circle.area/perimeter | π×2²=4π≈12.566371 | 2π×2=4π |
| Rectangle(3,4) | Rectangle.area/perimeter | 3×4=12 | 2(3+4)=14 |

การแสดง2ตำแหน่งได้12.57แต่คำนวณเก็บ pi เต็ม ไม่ใช้12.57เป็นค่าจริงก่อนรวมพื้นที่ `total_area([Rectangle(2,2),Badge()])` ได้4+1=5 แม้ Badge ไม่ใช่ Shape

## isinstance, issubclass และต้นทุน {#types}
`isinstance(Circle(2),Shape)`เป็น True; `issubclass(Circle,Shape)`ตรวจความสัมพันธ์ของคลาส;ถ้าส่ง instance แทน class ให้ issubclass จะ TypeError การตรวจ type มีประโยชน์เมื่อจำเป็นแต่ไม่ใช่เหตุผลให้ hardcode การ dispatch ทุกชนิด

พื้นที่สูตรเหล่านี้ O(1)ภายใต้ arithmetic คงที่;total_area ของ n รูปเรียก area n ครั้งจึง O(n)เมื่อ area แต่ละตัว O(1) ถ้า implementation หนึ่งทำงานแพง ต้นทุนต้องรวมค่านั้นด้วย abstractinterface ไม่ได้ทำให้ทุก operation เร็วเท่ากัน

## ข้อผิดพลาดที่พบบ่อย {#mistakes}
ลืม implementperimeter แม้ area ครบ;เรียก Shape();ลืม import;คืน None เพราะ print แทน return;เก็บค่าใหม่โดยไม่ผ่าน property;ผูก client กับ classnames แทนพฤติกรรม;สรุปว่า ducktyping ไม่ต้องมี contract

## แบบฝึกพร้อมเฉลย (ผู้เขียนจัดทำและตรวจอิสระ) {#practice}

### ข้อ1 คำนวณสองรูป

**เฉลย:** Circle2 area/perimeter=4π;Rectangle3×4 area12/perimeter14 ตาม trace การปัดเป็น format ตอนแสดง ไม่เปลี่ยนค่าที่ใช้คำนวณ

### ข้อ2 Abstract ไม่ครบ

**เฉลย:** classMissing(Shape)ที่ทำ area อย่างเดียวสร้างไม่ได้เพราะ perimeter ยัง abstract;Shape()ก็ TypeError ต้องทำทั้งสอง operation ตามสัญญา

### ข้อ3 Duck กับ inheritance

**เฉลย:** Badge ผ่าน total_area เพราะมี area คืน1 แต่ isinstance(Badge(),Shape)เป็น False ทั้งสองแนวคิดจึงไม่ใช่สิ่งเดียวกัน

### ข้อ4 Read/validate

**เฉลย:** Circle(0)เกิด ValueError;Rectangle("3",4)เกิด TypeError ตาม policy นี้;การ setradius=−1ถูกปฏิเสธก่อนเปลี่ยนค่ารัศมีเดิม

### ข้อ5 ขยายระบบโดยไม่แก้ client

**เฉลย:** เพิ่ม Triangle ที่สืบทอด Shape และ implementarea/perimeter ให้ถูก contract แล้วส่งใน list เดิมได้ ไม่ต้องเพิ่ม isinstancebranch ใน total_area;มี n รูปต้นทุน O(n)เมื่อสูตรแต่ละรูป O(1)

## สรุปทบทวน {#summary}
ออกแบบ interface→ให้แต่ละชนิดคืนผลตามสัญญา→client เรียก operation ร่วม→ใช้ ABC เมื่ออยากตรวจ method ที่ขาดตอนสร้าง instance→test พฤติกรรมจริงแยกจาก type

## แหล่งอ้างอิงและขอบเขต {#sources}
- [Week4 physical pp.3–45](../slides/Week4.pdf#page=3) — polymorphism/ducktyping,ABC,Shape และข้อผิดพลาด
- แหล่ง lab เพิ่มเติม (local-only ไม่เผยแพร่ไฟล์งานส่ง): Lab4-1 Animal,Lab4-2 Vehicle,Hw4 Payment;payment.py มี templatecheckout ที่ใช้ calculate_fee/process_payment ผ่าน polymorphism
- [แผนผังแหล่งสอน](../../../docs/oop-curriculum-map.md). คำอธิบาย/โค้ดที่ปรับให้รันเดี่ยวและเฉลยในบทเป็นงานผู้เขียน ไม่ใช่เฉลยข้อสอบทางการ ไม่มี prerequisite gating; เลือกบทจากแคตตาล็อกได้โดยตรง
