# คลังCourse Website

[เปิดเว็บคลังเรียน](https://skyce38.github.io/Course-Website/)

คลังทุกวิชาอยู่ใน repository นี้ จัดตามวิชาและประเภทเอกสาร เปิดอ่านหรือเพิ่มไฟล์ได้จากที่เดียว

## วิชา

- [OOP & Data Structures](courses/oop-python/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/oop-python)
- [Artificial Intelligence](courses/artificial-intelligence/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/artificial-intelligence)
- [Unix Tools & Programming](courses/unix-tools/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/unix-tools)
- [Database Management](courses/database-management/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/database-management)
- [Electronics & Internet of Things](courses/internet-of-things/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/internet-of-things)
- [Statistics & R](courses/statistics-r/README.md) · [เปิดหน้าอ่าน](https://skyce38.github.io/Course-Website/#course/statistics-r)

## โครงสร้าง

```text
Course-Website/
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

- Python Final / OOP: สรุป Week 10–15 และข้อฝึกปรนัย 20 ข้อ
- AI: สรุป Midterm + Final และชีททวนเร็ว
- Unix Tools: สรุป Midterm/Final บทวิเคราะห์การบ้าน และข้อฝึกปรนัย 40 ข้อ
- Database, IoT และ Statistics/R: เตรียมโครงสร้างหมวดไว้แล้ว

## Phase 1 Foundation

- ลิงก์ภายในใช้ relative paths รองรับ GitHub Pages ที่ `/Course-Website/` และการทดสอบในเครื่อง เส้นทางวิชาที่ไม่ถูกต้องแสดงลิงก์กลับคลัง
- ธีม **Light / Dark** ใช้ร่วมกับหน้าอ่านทุกหน้า ปุ่มมุมขวาสลับสองโหมดโดยคง palette และบันทึกค่า ไม่มีการซิงก์ตามระบบ
- [ตั้งค่า](settings.html): แกลเลอรีธีมทั้งเว็บไซต์ 6 ชุดและ Custom Theme ขนาดตัวอักษรอ่าน 14–22 px ความกว้างหน้าอ่าน ภาษาไทย/English และค่าเริ่มต้น PDF
- แปลเฉพาะ UI เนื้อหาวิชา ชื่อเอกสาร โค้ด และโจทย์ใช้ภาษาต้นฉบับ
- PDF ที่เพิ่มในหมวดวิชาจะแสดงผ่าน `pdf.html` มีปุ่มเปลี่ยนหน้า ซูม เปิดโดยตรง ดาวน์โหลด และลองใหม่เมื่อโหลดไม่ได้
- ส่งออก/นำเข้าการตั้งค่าเป็น JSON ที่ตรวจสอบรูปแบบก่อนใช้งาน คืนค่าเริ่มต้นได้โดยไม่ลบบุ๊กมาร์กหรือความคืบหน้าแบบทดสอบ

การตั้งค่าบันทึกด้วย `localStorage` ในเบราว์เซอร์ ไม่ส่งข้อมูลออกไป หากปิดการจัดเก็บจะใช้การตั้งค่าได้เฉพาะแท็บนั้น GitHub sync ใช้ public API พร้อมแคช 10 นาทีและรายการเดิมเมื่อเชื่อมต่อไม่ได้ บุ๊กมาร์กไฟล์ที่ค้นพบจาก GitHub เรียกคืนจากแคชได้หลังรีโหลด

OOP → Slides มี PDF จริง 14 ไฟล์: Week1–Week8 และ Week10–Week15 (ไม่มี Week9) เพิ่มไฟล์ `.pdf` ใน `courses/<วิชา>/<หมวด>/` แล้วรัน `node scripts/build.cjs` เพื่อค้นหาไฟล์และเพิ่มเข้า catalog โดยไม่เปลี่ยนชื่อหรือแก้ PDF; หลังเผยแพร่ GitHub sync ยังดึงไฟล์ใหม่ได้ตามเดิมและไม่แสดงซ้ำ ตัวอ่านใช้ PDF ของเบราว์เซอร์โดยไม่เพิ่มไลบรารี การฝังเอกสารและคำสั่งหน้า/ซูมขึ้นอยู่กับเบราว์เซอร์ ใช้แถบเครื่องมือภายในหรือเปิด/ดาวน์โหลดโดยตรงได้เสมอ ตัวอ่านไม่สามารถทราบหน้าที่เปลี่ยนผ่านแถบเครื่องมือ PDF หรือจำนวนหน้าทั้งหมดได้

ลบรายการ `summaries/original-notes.md` ที่อ้างถึงไฟล์ซึ่งไม่มีอยู่จริงออกจาก catalog แล้ว เอกสารที่มีอยู่ยังคงครบ

### Full website themes

- Forest Green, Ocean Blue, Lavender, Sakura Pink, Warm Sunset และ Midnight มี palette สำหรับ Light / Dark ครอบคลุมพื้นหลัง เมนู การ์ด ปุ่ม ข้อความ เส้นขอบ input และหน้าอ่าน HTML
- Custom Theme เลือก primary/background/surface ได้ สีที่แสดงปรับเพื่อความคมชัดของข้อความอย่างน้อย 4.5:1 และขอบอย่างน้อย 3:1 รวมถึงโหมดมืด เนื้อหาภายใน PDF ไม่เปลี่ยนสี
- เปลี่ยนทันทีและบันทึกใน `skyce-learning-preferences` ใช้ร่วมกับ import/export เดิม; ค่าสีเน้นเก่าย้ายไป preset ที่ใกล้เคียง ปุ่ม Reset theme คืนเฉพาะธีมและโหมดสี ส่วน Reset preferences คืนการตั้งค่าทั้งหมด
- ค่า System/Auto เดิมย้ายเป็น Light และบันทึกกลับครั้งเดียว โดยคง palette, custom colors, ภาษา, ขนาดอักษร และค่าเอกสารเดิม ไม่มีการอ่านหรือเฝ้าติดตามโหมดสีของ OS
- UI ใช้ body 17 px, navigation 15 px, secondary text 14 px, section headings 26–28 px และ course titles 18–20 px; ขนาดตัวอักษรอ่านยังปรับได้ 14–22 px มือถือใช้การ์ดวิชา 1 คอลัมน์และแถบเครื่องมือที่ขึ้นบรรทัดได้
- Book illustration คงการ์ดซ้อนเดิม ขยายการ์ด 45% และแก้ข้อความล้น; brand mark ที่ดูคล้ายเลข 5 คืออักษรไทย ร เปลี่ยนเป็น AAI ในกรอบสีน้ำเงินมน โดยไม่เปลี่ยน favicon
- ตรวจ 210 ชุด theme/mode/page/viewport ที่ 1440/390/320 px, HTML readers ทั้ง 7 หน้า, refresh persistence, Light/Dark toggle, การย้าย System/Auto, ไม่มี OS sync, typography/overflow, custom contrast และ regression เดิม

### พัฒนาและตรวจสอบ

```sh
python -m http.server 8000
node scripts/build.cjs
node scripts/check.cjs
```

เปิด `http://localhost:8000/` (ต้องใช้ HTTP server เพื่อโหลด PDF และ GitHub sync) รัน build หลังแก้ `catalog.json` หรือเพิ่ม PDF; check ตรวจไฟล์ ลิงก์ภายใน JavaScript การตั้งค่า และ PDF ที่ตกหล่น/ซ้ำใน catalog โดยไม่ติดตั้ง dependency

ทดสอบด้วย Chrome/Playwright ที่ 1440, 390 และ 320 px: routing, search, bookmarks, GitHub sync/ข้อผิดพลาด, PDF fixture 3 หน้าและดาวน์โหลด, appearance/language persistence, import/export/reset, storage ถูกปิด และ Python quiz/progress ไม่มี runtime errors ที่ไม่คาดหมาย ยังไม่ได้ทดสอบ Safari/Firefox หรืออุปกรณ์จริง

ตรวจ PDF จริงทั้ง 14 ไฟล์และลิงก์ viewer ที่ `/Course-Website/` แล้ว ทดสอบ Week1: native next/previous/go-to page, zoom 150%, download ตรงกับต้นฉบับทุกไบต์ และ mobile fallback ที่ 390 px; SHA-256 ของ PDF ต้นฉบับทั้ง 14 ไฟล์ไม่เปลี่ยน

[Figma: Settings และ PDF Viewer — desktop/mobile](https://www.figma.com/design/pmPq5RuGDji2vbkumGfqjf) ใช้สีเดิมและ reusable controls; Figma ใช้ Noto Sans Thai แทน Tahoma ที่ไม่มีในบริการ ส่วนเว็บไซต์คงฟอนต์เดิม
