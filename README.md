# เรียน — คลังเรียนของ Skyce38

[เปิดเว็บคลังเรียน](https://skyce38.github.io/learning/)

คลังกลางสำหรับเลือกวิชาและค้นหาเอกสาร เชื่อมไป repository ของแต่ละวิชา

## รายวิชา

| วิชา | Repository | เอกสารที่นำเข้า |
|---|---|---|
| [OOP & Data Structures](https://skyce38.github.io/learning/#course/oop-python) | [python-final](https://github.com/Skyce38/python-final) | 3 รายการ |
| [Artificial Intelligence](https://skyce38.github.io/learning/#course/artificial-intelligence) | [course-artificial-intelligence](https://github.com/Skyce38/course-artificial-intelligence) | 2 รายการ |
| [Unix Tools & Programming](https://skyce38.github.io/learning/#course/unix-tools) | [course-unix-tools](https://github.com/Skyce38/course-unix-tools) | 4 รายการ |
| [Database Management](https://skyce38.github.io/learning/#course/database-management) | [course-database-management](https://github.com/Skyce38/course-database-management) | 0 รายการ |
| [Electronics & Internet of Things](https://skyce38.github.io/learning/#course/internet-of-things) | [course-internet-of-things](https://github.com/Skyce38/course-internet-of-things) | 0 รายการ |
| [Statistics & R](https://skyce38.github.io/learning/#course/statistics-r) | [course-statistics-r](https://github.com/Skyce38/course-statistics-r) | 0 รายการ |

## โครงสร้าง

GitHub repository ไม่ได้ซ้อน repository กันเหมือนโฟลเดอร์ โครงสร้างนี้ใช้คลังกลางเชื่อม repository รายวิชา และใช้โฟลเดอร์แบ่งประเภทเอกสารในแต่ละวิชา

```text
learning/                       หน้ารวมทุกวิชา
├── index.html                  เว็บคลังเรียน
├── catalog.json                รายวิชาและเอกสารที่นำเข้า
├── read/                       หน้าสำหรับอ่านสรุป
└── templates/course/           แม่แบบเพิ่มวิชา

repository ของแต่ละวิชา/
├── README.md                   หน้ารวมวิชา
├── course.json                 ข้อมูลวิชา
├── assignments/                การบ้าน
├── slides/                     สไลด์เรียน
├── summaries/                  สรุป
├── tutoring/                   ไฟล์ติว
└── exams/                      ข้อสอบและแบบฝึก
```

## เพิ่มไฟล์

1. เปิด repository ของวิชา
2. เข้าโฟลเดอร์ให้ตรงประเภท
3. เลือก Add file → Upload files หรือ Create new file แล้ว Commit changes
4. เปิดหน้าวิชาในเว็บ แล้วกดรีเฟรชรายการ

เว็บอ่านรายการไฟล์จาก GitHub public API พร้อมแคช 10 นาที ถ้า API ใช้ไม่ได้ จะแสดงเอกสารที่นำเข้าไว้และแจ้งสถานะ ไม่ต้องใส่ token ในหน้าเว็บ

ไฟล์ที่เพิ่มใหม่เปิดผ่าน GitHub ได้ทันทีหลังรีเฟรชรายการ หน้าบทอ่าน HTML ที่จัดรูปแบบไว้เป็นชุดที่นำเข้าแล้ว หากแก้ Markdown เดิม ต้องสร้างหน้าบทอ่าน HTML ใหม่เพื่อให้เนื้อหาตรงกัน

## เพิ่มวิชาใหม่

1. สร้าง repository รายวิชา เช่น `course-subject-name`
2. ใช้โครงสร้างจาก [templates/course](templates/course/)
3. เพิ่มข้อมูลวิชาใน catalog.json และสร้างหน้า index.html จาก catalog ใหม่ด้วย scripts/build.cjs
4. Commit การเปลี่ยนแปลงกลับคลังกลาง

## ขอบเขตปัจจุบัน

- รายชื่อ 6 วิชามาจากโปรเจกต์และบันทึกคลังเรียนเดิม
- นำเข้าสรุป OOP, AI และ Unix ที่ตรวจพบในเครื่อง
- Database, IoT และ Statistics/R มีโครงสร้างหมวดพร้อมแล้ว ยังไม่มีเนื้อหาที่นำเข้า
- หมวดสไลด์และการบ้านที่ไม่มีไฟล์จะแสดงสถานะว่างตามจริง
- แบบฝึกที่แต่งขึ้นระบุว่าเป็นข้อฝึก ไม่ใช่ข้อสอบจริง
- เอกสารใน repository สาธารณะเปิดอ่านได้ทั่วไป
- รายการดาวและการตั้งค่าการอ่านเก็บแยกในเบราว์เซอร์ ไม่ซิงก์ข้ามอุปกรณ์
