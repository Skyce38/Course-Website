# คลังเรียน · Skyce38

[เปิดเว็บคลังเรียน](https://skyce38.github.io/learning/)

คลังทุกวิชาอยู่ใน repository นี้ จัดตามวิชาและประเภทเอกสาร เปิดอ่านหรือเพิ่มไฟล์ได้จากที่เดียว

## วิชา

- [OOP & Data Structures](courses/oop-python/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/oop-python)
- [Artificial Intelligence](courses/artificial-intelligence/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/artificial-intelligence)
- [Unix Tools & Programming](courses/unix-tools/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/unix-tools)
- [Database Management](courses/database-management/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/database-management)
- [Electronics & Internet of Things](courses/internet-of-things/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/internet-of-things)
- [Statistics & R](courses/statistics-r/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/learning/#course/statistics-r)

## โครงสร้าง

```text
learning/
├── index.html
├── catalog.json
├── courses/
│   ├── oop-python/
│   ├── artificial-intelligence/
│   ├── unix-tools/
│   ├── database-management/
│   ├── internet-of-things/
│   └── statistics-r/
├── read/                  หน้าอ่านเอกสาร
└── templates/course/      แม่แบบเพิ่มวิชา
```

ภายในแต่ละโฟลเดอร์วิชามีหมวด `assignments/`, `slides/`, `summaries/`, `tutoring/` และ `exams/`

## เพิ่มเอกสาร

1. เปิดโฟลเดอร์วิชาใน GitHub
2. เลือกหมวดที่ตรงกับเอกสาร
3. กด **Add file → Upload files** แล้ว Commit changes
4. เปิดเว็บคลังเรียน เข้าหน้าวิชา แล้วกด **รีเฟรชรายการ**

ไฟล์ใหม่ในโฟลเดอร์วิชาจะแสดงบนเว็บหลังรีเฟรช รายการสรุปที่จัดรูปแบบให้อ่านเป็นหน้า HTML อยู่ใน `read/`.

## เนื้อหาที่นำเข้าแล้ว

- OOP/Python: สรุป Week 10–15 และข้อฝึกปรนัย 20 ข้อ
- AI: สรุป Midterm + Final และชีททวนเร็ว
- Unix Tools: สรุป Midterm/Final บทวิเคราะห์การบ้าน และข้อฝึกปรนัย 40 ข้อ
- Database, IoT และ Statistics/R: เตรียมโครงสร้างหมวดไว้แล้ว
