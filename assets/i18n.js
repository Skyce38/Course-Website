/* UI strings only. Course names, source documents, code and quiz content stay intact. */
(() => {
  'use strict';
  const strings = {
    learn: ['เรียน','Learn'], skipContent: ['ข้ามไปเนื้อหา','Skip to content'],
    decreaseFont: ['ลดขนาดตัวอักษร','Decrease font size'], increaseFont: ['เพิ่มขนาดตัวอักษร','Increase font size'], printLesson: ['พิมพ์','Print'],
    pythonCode: ['โค้ด Python','Python code'], copyCode: ['คัดลอกโค้ด','Copy code'], codeCopied: ['คัดลอกแล้ว','Code copied'], copyUnavailable: ['คัดลอกอัตโนมัติไม่ได้ โปรดเลือกและคัดลอกโค้ด','Copy unavailable; select and copy the code'],
    stepDiagram: ['แผนภาพตามลำดับ','Ordered step diagram'], stepLegend: ['กรอบหนา = ตำแหน่งปัจจุบัน · ✓ = ประมวลผลแล้ว','Thick border = current position · ✓ = processed'],
    previousStep: ['ก่อนหน้า','Previous'], nextStep: ['ถัดไป','Next'], resetSteps: ['เริ่มใหม่','Reset'],
    staticSteps: ['อ่านขั้นตอนทั้งหมด (ใช้ได้โดยไม่เปิด JavaScript)','Read all steps (available without JavaScript)'],
    programOutput: ['ผลลัพธ์','Output'], stepPosition: ['ขั้นตอน {page} จาก {total}','Step {page} of {total}'],
    activeNode: ['ตำแหน่งปัจจุบัน','Current position'], visitedNode: ['ประมวลผลแล้ว','Processed'], pendingNode: ['ยังไม่ประมวลผล','Not processed'],
    readerContents: ['สารบัญบทเรียน', 'Lesson contents'],
    learningPath: ['เส้นทางการเรียน','Learning path'], lessonNavigation: ['นำทางระหว่างบทเรียน','Lesson navigation'],
    continueLearning: ['เรียนต่อ','Continue learning'], continueLearningLabel: ['เรียนต่อ: {title}','Continue learning: {title}'],
    previousLesson: ['บทเรียนก่อนหน้า','Previous lesson'], nextLesson: ['บทเรียนถัดไป','Next lesson'],
    previousLessonLabel: ['บทเรียนก่อนหน้า: {title}','Previous lesson: {title}'], nextLessonLabel: ['บทเรียนถัดไป: {title}','Next lesson: {title}'],
    currentLesson: ['บทเรียนปัจจุบัน','Current lesson'], lessonIncomplete: ['ยังไม่อ่านจบ','Incomplete'],
    learningPathProgress: ['อ่านจบ {completed} จาก {total} บทเรียน','{completed} of {total} lessons completed'],
    learningPathEmpty: ['ยังไม่มีบทเรียนในเส้นทางนี้','No lessons in this path yet'], learningPathComplete: ['อ่านจบทุกบทเรียนในเส้นทางนี้แล้ว','All lessons in this path are completed'],
    modernWelcome: ['พื้นที่เรียนรู้ของคุณ', 'Your study workspace'],
    modernWelcomeNote: ['รวมรายวิชา เอกสาร และรายการอ่านต่อ พร้อมติดตามความคืบหน้าจากการเรียนของคุณ', 'Your courses, resources and recent reading, with progress from your own study.'],
    documentCountLabel: ['เอกสาร {total} รายการ', '{total} documents'],
    courseDocument: ['เอกสารรายวิชา', 'Course document'], githubDocument: ['ไฟล์จาก GitHub', 'File from GitHub'],
    layout: ['รูปแบบเว็บไซต์', 'Website layout'],
    layoutNote: ['เปลี่ยนรูปแบบได้ทันที โดยใช้รายวิชาและข้อมูลการเรียนชุดเดิม', 'Switch instantly with the same courses and saved study data.'],
    classicLayout: ['คลาสสิก', 'Classic'], modernLayout: ['โมเดิร์น', 'Modern'],
    classicLayoutNote: ['คลังเรียนในรูปแบบเดิมที่คุ้นเคย', 'The familiar course library design.'],
    modernLayoutNote: ['แดชบอร์ดรายวิชาและรายการอ่านล่าสุด', 'An academic dashboard for courses and recent reading.'],
    studyOverview: ['ภาพรวมการเรียน', 'Study overview'], overviewCourses: ['รายวิชา', 'Courses'], overviewCompleted: ['อ่านจบ', 'Completed'],
    refreshFiles: ['รีเฟรชรายการไฟล์', 'Refresh files'],
    resetReadingPosition: ['เริ่มอ่านใหม่', 'Reset reading position'],
    resetReadingPositionLabel: ['เริ่มอ่าน {title} ใหม่', 'Reset reading position: {title}'],
    markCompleteLabel: ['ทำเครื่องหมายว่าอ่านจบ: {title}', 'Mark completed: {title}'],
    markIncompleteLabel: ['ยกเลิกสถานะอ่านจบ: {title}', 'Mark not completed: {title}'],
    continueReadingLabel: ['อ่านต่อ: {title}', 'Continue reading: {title}'],
    readDocumentLabel: ['อ่านเอกสาร: {title}', 'Read document: {title}'],
    saveDocumentLabel: ['บันทึก {title}', 'Save {title}'], unsaveDocumentLabel: ['ยกเลิกบันทึก {title}', 'Unsave {title}'],
    progressDescription: ['อ่านจบ {completed} จาก {total} เอกสาร', '{completed} of {total} documents completed'],
    pdfDocument: ['เอกสาร PDF', 'PDF document'], pdfPageLabel: ['หน้า {page}', 'Page {page}'],
    nativeViewer: ['ตัวอ่านของเบราว์เซอร์', 'Use native viewer'],
    trackedPDFNote: ['บันทึกหน้า ตำแหน่ง และซูมอัตโนมัติ ตัวอ่านของเบราว์เซอร์บันทึกได้เฉพาะปุ่มด้านบน', 'Page, position and zoom save automatically. Native fallback tracks only the controls above.'],
    recentReading: ['เอกสารที่เปิดล่าสุด', 'Recently Opened'], continueReading: ['อ่านต่อ →', 'Continue reading →'],
    historyEmpty: ['เปิดเอกสารเพื่อเริ่มรายการอ่านล่าสุด', 'Open a document to start your reading history.'],
    studyProgress: ['ความคืบหน้ารายวิชา', 'Study Progress'], completedCount: ['เอกสารที่อ่านจบ', 'documents completed'],
    markComplete: ['ทำเครื่องหมายว่าอ่านจบ', 'Mark completed'], documentCompleted: ['✓ อ่านจบแล้ว', '✓ Completed'], markIncomplete: ['ยกเลิกสถานะอ่านจบ', 'Mark not completed'],
    colorMode: ['โหมดสี', 'Color mode'], themeGallery: ['แกลเลอรีธีม', 'Theme gallery'],
    themeGalleryNote: ['เลือกชุดสีสำหรับทั้งเว็บไซต์และหน้าอ่านเอกสาร', 'Choose a palette for the entire website and HTML readers.'],
    forestGreen: ['เขียวป่า', 'Forest Green'], oceanBlue: ['ฟ้ามหาสมุทร', 'Ocean Blue'], lavender: ['ลาเวนเดอร์', 'Lavender'],
    sakuraPink: ['ชมพูซากุระ', 'Sakura Pink'], warmSunset: ['แสงอาทิตย์ยามเย็น', 'Warm Sunset'], midnight: ['เที่ยงคืน', 'Midnight'],
    customTheme: ['กำหนดธีมเอง', 'Custom theme'], resetTheme: ['คืนค่าธีมเริ่มต้น', 'Reset theme to default'],
    customContrastNote: ['สีจะปรับตามโหมดและความคมชัด เพื่อให้อ่านได้ชัดเจน สีหลักและพื้นผิวที่แสดงอาจต่างจากสีที่เลือก', 'Colors adapt to the mode and readable contrast. The displayed primary and surface may differ from your picks.'],
    primaryColor: ['สีหลัก', 'Primary color'], backgroundColor: ['สีพื้นหลัง', 'Background color'], surfaceColor: ['สีพื้นผิว', 'Surface color'],
    settings: ['ตั้งค่า', 'Settings'], backLibrary: ['← กลับคลังเรียน', '← Back to library'],
    appearance: ['รูปลักษณ์', 'Appearance'], theme: ['ธีม', 'Theme'], light: ['สว่าง', 'Light'], dark: ['มืด', 'Dark'],
    accent: ['สีเน้น', 'Accent color'], forest: ['เขียวป่า', 'Forest'], blue: ['น้ำเงิน', 'Blue'], plum: ['ม่วงพลัม', 'Plum'],
    fontSize: ['ขนาดตัวอักษรอ่าน', 'Reading font size'], readingWidth: ['ความกว้างหน้าอ่าน', 'Reading width'], narrow: ['แคบ', 'Narrow'], comfortable: ['พอดี', 'Comfortable'], wide: ['กว้าง', 'Wide'],
    preview: ['ตัวอย่างการอ่าน', 'Reading preview'], previewText: ['พื้นที่อ่านที่สบาย ช่วยให้โฟกัสกับสิ่งที่กำลังเรียน', 'A comfortable space to focus on what you are learning.'], tryReader: ['ลองเปิดหน้าอ่าน →', 'Try a reader →'],
    savedAutomatically: ['บันทึกอัตโนมัติในเบราว์เซอร์นี้ ใช้ร่วมกันทุกหน้าอ่าน', 'Saved automatically in this browser and shared across readers.'],
    language: ['ภาษา', 'Language'], uiOnly: ['เปลี่ยนเฉพาะภาษาเมนู เนื้อหารายวิชาใช้ภาษาต้นฉบับ', 'Only the interface changes language. Course content stays in its original language.'],
    documents: ['เอกสาร', 'Documents'], defaultZoom: ['ซูม PDF เริ่มต้น', 'Default PDF zoom'], nativeToolbar: ['แสดงแถบเครื่องมือ PDF', 'Show native PDF toolbar'],
    previous: ['ก่อนหน้า', 'Previous'], next: ['ถัดไป', 'Next'], page: ['หน้า', 'Page'], go: ['ไป', 'Go'], zoom: ['ซูม', 'Zoom'], fitWidth: ['พอดีความกว้าง', 'Fit width'],
    loadingPDF: ['กำลังตรวจเอกสาร…', 'Checking document…'], pdfReady: ['พร้อมอ่าน · เปิด PDF โดยตรงได้หากตัวอ่านไม่แสดง', 'Ready to read. Open the PDF directly if the viewer stays blank.'],
    pdfFallback: ['หากเอกสารไม่แสดงหรือเบราว์เซอร์ไม่รองรับ ให้เปิดไฟล์หรือดาวน์โหลดแทน', 'If the document does not appear or embedding is unsupported, open or download the file.'],
    pdfError: ['ไม่สามารถแสดงเอกสารได้ ลองเปิด PDF โดยตรงหรือดาวน์โหลด', 'Unable to display this document. Try opening or downloading the PDF directly.'],
    invalidPDF: ['ลิงก์ PDF ไม่ถูกต้อง เลือกเอกสารจากหน้าวิชาอีกครั้ง', 'Invalid PDF link. Select a document from a course page.'],
    nativePDFNote: ['ใช้ตัวอ่าน PDF ของเบราว์เซอร์ การซูมและเปลี่ยนหน้าขึ้นอยู่กับเบราว์เซอร์ หากปุ่มไม่ตอบสนอง ให้ใช้แถบเครื่องมือในเอกสาร', 'Uses your browser’s PDF reader. Page and zoom support varies by browser; use the embedded toolbar if these controls do not respond.'],
    openPDF: ['เปิด PDF ↗', 'Open PDF ↗'], download: ['ดาวน์โหลด', 'Download'], retry: ['ลองอีกครั้ง', 'Retry'],
    data: ['จัดการการตั้งค่า', 'Manage preferences'], export: ['ส่งออกการตั้งค่า', 'Export preferences'], import: ['นำเข้าการตั้งค่า', 'Import preferences'], reset: ['คืนค่าเริ่มต้น', 'Reset preferences'],
    dataNote: ['ส่งออกเฉพาะการตั้งค่า ไม่รวมรายการบันทึกหรือความคืบหน้าแบบทดสอบ การคืนค่าจะไม่ลบข้อมูลเหล่านี้', 'Exports preferences only. Bookmarks and quiz progress are preserved when you reset.'],
    importSuccess: ['นำเข้าการตั้งค่าแล้ว', 'Preferences imported.'], importError: ['ไฟล์ไม่ถูกต้อง ใช้ไฟล์ JSON การตั้งค่าที่ส่งออกจากเว็บไซต์นี้', 'Invalid file. Use a preferences JSON exported from this site.'], resetSuccess: ['คืนค่าเริ่มต้นแล้ว', 'Preferences reset.'],
    localOnly: ['การตั้งค่าใช้ได้ในแท็บนี้ แต่เบราว์เซอร์ไม่อนุญาตให้บันทึก', 'Preferences work in this tab, but browser storage is unavailable.']
  };
  const legacy = [
    ['คลังเรียนทั้งหมด','All courses'],['รายการที่บันทึก','Saved documents'],['รายการที่บันทึกไว้','Saved documents'],['เรียน','Learn'],['เปิดคลังบน GitHub ↗','Open library on GitHub ↗'],
    ['หนึ่งคลังกลาง เชื่อมทุกวิชา','One library for every subject'],['เลือกหมวดแล้วเริ่มอ่านได้เลย','Choose a category and start reading'],['วิธีเพิ่มวิชาและไฟล์ ↗','How to add courses and files ↗'],
    ['ค้นหาวิชาหรือเอกสาร','Search courses or documents'],['ค้นหาวิชา หรือเอกสาร เช่น AI, Shell, Final…','Search courses or documents: AI, Shell, Final…'],['ล้าง','Clear'],['ล้างการค้นหา','Clear search'],
    ['วิชาไหนก็หาเจอ','Find every subject'],['เริ่มเรียนจากที่เดียว.','Start learning in one place.'],['คลังเรียนของ Skyce38 รวมรายวิชา สรุป และไฟล์ติว','Skyce38’s library of courses, notes and reviews'],['เลือกวิชา แล้วค้นเอกสารในหมวดที่ต้องการได้เลย','Choose a course and find the documents you need'],
    ['5 หมวดต่อวิชา','5 categories per course'],['เชื่อม GitHub รายวิชา','Connected to GitHub'],['รายวิชาของฉัน','My courses'],['ผลค้นหารายวิชา','Matching courses'],['เอกสารพร้อมอ่าน','Ready to read'],['เอกสารที่ตรงกับคำค้น','Matching documents'],
    ['เตรียมหมวดแล้ว','Categories ready'],['เปิดวิชา ↗','Open course ↗'],['อ่าน ↗','Read ↗'],['กดดาวข้างเอกสารเพื่อเก็บไว้อ่านต่อ บันทึกแยกตามเบราว์เซอร์','Star a document to read later. Saved in this browser.'],
    ['ยังไม่มีรายการในหมวดนี้','No documents here yet'],['โครงสร้างพร้อมแล้ว เพิ่มไฟล์ลงโฟลเดอร์ของวิชาได้ เมื่ออัปโหลดแล้วกดรีเฟรชรายการเพื่อแสดงไฟล์ใหม่','Upload files to the course folder, then refresh the list to see new documents.'],['เปิดโฟลเดอร์บน GitHub ↗','Open folder on GitHub ↗'],
    ['การบ้าน','Assignments'],['สไลด์เรียน','Slides'],['สรุป','Summaries'],['ไฟล์ติว','Review sheets'],['ข้อสอบและแบบฝึก','Exams & practice'],['ทั้งหมด','All'],['เอกสารรายวิชา','Course document'],['ไฟล์จาก GitHub','File from GitHub'],
    ['กำลังตรวจรายการจาก GitHub…','Checking GitHub…'],['ตรวจรายการจาก GitHub แล้ว','Checked GitHub'],['ตรวจรายการล่าสุดจาก GitHub แล้ว','Latest files checked on GitHub'],['แสดงรายการที่นำเข้าไว้ · ยังดึงรายการใหม่ไม่ได้','Showing existing documents. New files could not be fetched.'],
    ['↻ รีเฟรชรายการ','↻ Refresh files'],['อัปเดตรายการไฟล์แล้ว','Files updated'],['ยังเชื่อมต่อ GitHub ไม่ได้ ลองรีเฟรชภายหลัง','Cannot reach GitHub. Try refreshing later.'],['จัดการไฟล์หมวดนี้บน GitHub ↗','Manage files on GitHub ↗'],['วิธีเพิ่มไฟล์ ↗','How to add files ↗'],
    ['จำนวนรายการนับจากเอกสารที่นำเข้าแล้ว หมวดว่างจะแสดงสถานะตามจริง','Counts reflect imported documents and empty categories.'],['เพิ่มไฟล์ใน repository รายวิชา แล้วกดรีเฟรชรายการในหน้าวิชาเพื่อดึงข้อมูลล่าสุด','Add files to the course repository, then refresh the course to check for updates.'],
    ['6 บทเรียน พร้อมข้อฝึกปรนัย 20 ข้อและเฉลย','6 lessons with 20 practice questions and answers'],['ไปอ่านและทำข้อฝึก →','Read and practice →'],['ไม่พบหน้า','Page not found'],
    ['เปิดสารบัญวิชา','Open course navigation'],['หมวดเอกสาร','Document categories'],['สารบัญวิชา','Course navigation'],['เปิดสารบัญ','Open contents'],['สารบัญ','Contents'],['ลดขนาดตัวอักษร','Decrease font size'],['เพิ่มขนาดตัวอักษร','Increase font size'],['พิมพ์หรือบันทึกเป็น PDF','Print or save as PDF'],['พิมพ์ ↗','Print ↗'],['พิมพ์ / PDF','Print / PDF'],['ขนาดตัวอักษร','Font size'],['กลับด้านบน','Back to top'],['คัดลอก','Copy'],['คัดลอกแล้ว ✓','Copied ✓'],['คัดลอกโค้ด','Copy code'],
    ['กลับคลังเรียน','Back to library'],['คลังเรียน','Course library'],['พิมพ์','Print'],['เปิด Markdown บน GitHub ↗','Open Markdown on GitHub ↗'],['ข้ามไปเนื้อหา','Skip to content'],['บทที่ทำเครื่องหมายว่าอ่านแล้ว','Chapters marked as read'],['ลองทำข้อสอบ 20 ข้อ','Try 20 practice questions'],['ความคืบหน้าบันทึกไว้ในเบราว์เซอร์นี้','Progress saved in this browser'],
    ['บทเรียน','Lessons'],['แบบทดสอบ','Practice quiz'],['ค้นหาหัวข้อในบทเรียน','Search lesson headings'],['เช็กความพร้อมก่อนสอบ','Check your readiness'],['พร้อมแล้ว ลองทำข้อสอบ →','Ready? Try the quiz →'],['แหล่งอ้างอิงของบทเรียน','Lesson references'],['ลองทำก่อนเปิดเฉลย','Try before revealing the answers'],['เลือกคำตอบที่ถูกที่สุดเพียงข้อเดียว ตรวจรวมเมื่อพร้อม หรือกดดูเหตุผลทีละข้อ','Choose one best answer. Grade all answers or reveal an explanation.'],['คำตอบบันทึกไว้ในเบราว์เซอร์นี้ กลับมาทำต่อได้','Answers are saved in this browser so you can continue later.'],
    ['พร้อมทดสอบความเข้าใจ','Ready to test your understanding'],['เริ่มใหม่','Start over'],['ตรวจคำตอบ →','Check answers →'],['ตรวจคำตอบทั้งหมด →','Check all answers →'],['ดาวน์โหลดต้นฉบับ .md ↗','Download source .md ↗'],['ดูเฉลยและเหตุผล','Show answer and explanation'],['ซ่อนเฉลย','Hide answer'],['ตอบถูก','Correct'],['ลองทบทวนอีกครั้ง','Review and try again'],['ยังไม่ได้ตอบ','Not answered'],['เลือกคำตอบอย่างน้อย 1 ข้อก่อนตรวจ','Choose at least one answer before grading'],['ล้างคำตอบแล้ว เริ่มฝึกใหม่ได้เลย','Answers cleared. Ready to practice again.'],['อ่านบทนี้แล้ว','Mark chapter as read'],['อ่านแล้ว · กดเพื่อยกเลิก','Read · click to undo'],['ไม่พบหัวข้อนี้ ลองค้นคำว่า Stack, Sort หรือ Hash','No matching heading. Try Stack, Sort or Hash.'],['คัดลอกโค้ดแล้ว','Code copied'],['เลือกข้อความโค้ดแล้วคัดลอกได้โดยตรง','Select and copy the code directly'],
    ['MY LIBRARY','คลังของฉัน'],['YOUR SUBJECTS','รายวิชาของคุณ'],['READY TO READ','พร้อมอ่าน'],['SEARCH RESULTS','ผลค้นหา'],['YOUR READING LIST','รายการอ่านของคุณ'],['ONE PLACE. EVERY SUBJECT.','ทุกวิชาในที่เดียว'],['CONTINUE YOUR FINAL REVIEW','ทวนต่อก่อนสอบ'],['MAKE ROOM FOR LEARNING','พื้นที่สำหรับการเรียน'],['DOCUMENT READER','ตัวอ่านเอกสาร']
  ];
  const originals = new WeakMap(), attributes = new WeakMap();
  const pairs = [...Object.values(strings), ...legacy.filter(p => !/^[A-Z .]+$/.test(p[0]))];
  const englishLabels = legacy.filter(p => /^[A-Z .]+$/.test(p[0]));
  const protectedSelector = 'script,style,noscript,.prose:not(.settings-preview),.course-thai,.course-header p,.resource-main>a,.resource-meta span:last-child,.learning-link-title,.learning-path-list a,#pdf-title,#lessons article,#quiz .question';
  const isProtected = node => node.closest(protectedSelector) && !node.closest('.copy-code,.read-button,.chapter-footer,.question-status,.reveal-answer,legend');
  const t = (key, values = {}) => (strings[key]?.[LearningPreferences.value.language === 'en' ? 1 : 0] || key).replace(/\{(\w+)\}/g, (match,name) => values[name] ?? match);
  const localizedAttributes = ['aria-label','title','placeholder','aria-valuetext'];
  const valuesFor = node => ({title:node.dataset.documentTitle || '',page:node.dataset.page,completed:node.dataset.completed,total:node.dataset.total});
  function translate(text, lang = LearningPreferences.value.language) {
    const clean = text.trim();
    // Repair legacy DOM text produced by an older bundle; leave document text protected.
    if (Object.hasOwn(strings,clean)) return text.replace(clean,strings[clean][lang === 'en' ? 1 : 0]);
    const pair = pairs.find(p => p[0] === clean);
    if (pair) return text.replace(clean, pair[lang === 'en' ? 1 : 0]);
    const english = englishLabels.find(p => p[0] === clean);
    if (english) return text.replace(clean, english[lang === 'en' ? 0 : 1]);
    if (lang !== 'en') return text;
    const count = clean.match(/^(\d+) (รายวิชา|วิชา|รายการพร้อมอ่าน|รายการ)$/);
    if (count) return text.replace(clean, count[1] + ' ' + ({รายวิชา:'courses',วิชา:'courses',รายการพร้อมอ่าน:'ready to read',รายการ:'documents'}[count[2]]));
    const category = clean.match(/^([✎▤≡◇✓]\s*)(.+)$/);
    if (category) return text.replace(clean, category[1] + translate(category[2], lang));
    const read = clean.match(/^([✓○]\s*)(อ่านแล้ว · กดเพื่อยกเลิก|อ่านบทนี้แล้ว)$/);
    if (read) return text.replace(clean, read[1] + translate(read[2], lang));
    const answered = clean.match(/^ตอบแล้ว (\d+) \/ 20 ข้อ$/);
    if (answered) return 'Answered ' + answered[1] + ' / 20';
    const score = clean.match(/^คะแนน (\d+) \/ 20$/);
    if (score) return 'Score ' + score[1] + ' / 20';
    const question = clean.match(/^ข้อที่ (\d+)$/);
    if (question) return 'Question ' + question[1];
    const graded = clean.match(/^ตรวจคำตอบแล้ว · ตอบถูก (\d+) ข้อ$/);
    if (graded) return 'Answers checked · ' + graded[1] + ' correct';
    const back = clean.match(/^(← .+ \/ )(.+)$/);
    if (back) return back[1] + translate(back[2], lang);
    if (clean.startsWith('เรียน / ')) return text.replace('เรียน / ', 'Learn / ');
    return text;
  }
  function setText(node, text) {
    if (!node.querySelector('svg')) { if (node.textContent !== text) node.textContent = text; return; }
    // Icon-bearing controls keep their SVG and text nodes through language/state changes.
    const labels = [...node.childNodes].filter(child => child.nodeType === 3);
    if (labels.map(child => child.textContent).join('') === text) return;
    if (!labels.length) node.prepend(document.createTextNode(text));
    else labels.forEach((label,index) => { const value = index === 0 ? text : ''; if (label.textContent !== value) label.textContent = value; });
  }
  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const text = t(node.dataset.i18n, valuesFor(node));
      setText(node, text);
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (isProtected(node.parentElement) || node.parentElement.closest('[data-i18n]')) continue;
      const previous = originals.get(node);
      const source = previous && previous.result === node.textContent ? previous.source : node.textContent;
      const result = translate(source);
      originals.set(node, {source, result});
      if (result !== node.textContent) node.textContent = result;
    }
    document.querySelectorAll('[aria-label],[title],[placeholder],[aria-valuetext],'+localizedAttributes.map(attr => '[data-i18n-'+attr+']').join(',')).forEach(node => {
      if ((isProtected(node) && !localizedAttributes.some(attr => node.hasAttribute('data-i18n-'+attr))) || ['theme','theme-toggle','language-toggle'].includes(node.id)) return;
      let saved = attributes.get(node) || {};
      for (const attr of localizedAttributes) {
        const key = node.getAttribute('data-i18n-'+attr);
        if (!key && !node.hasAttribute(attr)) continue;
        const current = node.getAttribute(attr), prior = saved[attr];
        const source = prior && prior.result === current ? prior.source : current;
        let result = key ? t(key,valuesFor(node)) : translate(source);
        if (!key && LearningPreferences.value.language === 'en' && node.matches('.bookmark')) result = source.replace(/^ยกเลิกบันทึก /, 'Unsave ').replace(/^บันทึก /, 'Save ');
        saved[attr] = {source, result};
        if (current !== result) node.setAttribute(attr, result);
      }
      attributes.set(node, saved);
    });
    if (location.pathname.endsWith('/settings.html')) document.title = t('settings') + ' · Course Website';
  }
  window.LearningI18n = {t, translate, apply, setText};
  document.addEventListener('preferenceschange', () => { if (document.body) apply(); });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    let pending = false;
    new MutationObserver(() => {
      if (pending) return;
      pending = true;
      queueMicrotask(() => { pending = false; apply(); });
    }).observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['data-i18n',...localizedAttributes,...localizedAttributes.map(attr => 'data-i18n-'+attr),'data-document-title','data-page','data-completed','data-total']});
  });
})();
