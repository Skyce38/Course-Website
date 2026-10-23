# Course Website — Roadmap

## Phase 1 Foundation — implemented on codex/phase-1-foundation

- [x] ตรวจชื่อ repository / GitHub Pages และแก้ relative links, README anchor, dead document listing และ unknown routes
- [x] Light ↔ Dark ใช้ร่วมกับทุกหน้าอ่าน บันทึกค่าและคง palette; ย้าย System/Auto เดิมเป็น Light โดยไม่มี OS sync
- [x] Native PDF viewer พร้อมเปลี่ยนหน้า ซูม ดาวน์โหลด เปิดโดยตรง และ error fallback
- [x] Full website Theme Gallery: Forest Green, Ocean Blue, Lavender, Sakura Pink, Warm Sunset, Midnight และ Custom Theme พร้อม contrast safeguards, Light/Dark, persistence และ reset
- [x] Typography 14–28 px ตามบทบาท, responsive layouts, book cards ใหญ่ขึ้น 45% และ AAI brand mark ในกรอบสีน้ำเงินมน
- [x] ขนาดตัวอักษรอ่าน ความกว้าง Responsive UI และ saved preferences
- [x] Thai / English UI switching โดยคงเนื้อหาต้นฉบับ
- [x] Unified Settings: appearance, language, document defaults, reset และ validated JSON import/export
- [x] Figma desktop/mobile Settings และ PDF Viewer พร้อม shared colors, typography และ controls
- [x] ตรวจ static links/JS และ browser regression ที่ desktop, 390 px และ 320 px

## หลังตรวจรับ

- ส่ง Pull Request จาก `codex/phase-1-foundation` ไป `main` เพื่อตรวจรับ ห้าม merge จนกว่าจะได้รับอนุญาต
- [x] เพิ่ม OOP slides จริง 14 PDF (Week1–8, Week10–15) พร้อม build discovery, catalog coverage check และทดสอบ native viewer/download/mobile fallback; ไม่มีไฟล์ Week9
- ตรวจ native PDF บน Safari, Firefox และมือถือจริง ความสามารถของ embed/page/zoom แตกต่างกันตามเบราว์เซอร์
- ระบบ Login, Cloud Sync และ AI ยังไม่อยู่ใน Phase 1 และยังไม่ได้เพิ่ม

รายละเอียดการใช้งานและคำสั่งตรวจสอบอยู่ใน [README](README.md#phase-1-foundation)
