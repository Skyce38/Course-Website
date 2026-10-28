/* UI strings only. Course names, source documents, code and quiz content stay intact. */
(() => {
  'use strict';
  const strings = {
    insightsTitle:['ภาพรวมการฝึก','Study Insights'],
    insightsPrivacy:['ใช้เฉพาะผลในเบราว์เซอร์นี้ ไม่อัปโหลดคำตอบหรือทำนายความชำนาญ','Only results in this browser. No uploads or mastery predictions.'],
    insightsAccuracy:['ความแม่นยำของคำตอบ','Answer accuracy'],
    insightsObservations:['ครั้งที่ตรวจคำตอบอัตโนมัติ','Graded observations'],
    insightsUnique:['{count} คำถามอัตโนมัติไม่ซ้ำ','{count} unique graded questions'],
    insightsRepeated:['รวมการตอบซ้ำ {count} ครั้ง','Includes {count} repeated observations'],
    insightsLessons:['บทเรียนที่ฝึกแล้ว','Lessons practiced'],
    insightsLessonCount:['{count} จาก {total} บทเรียน','{count} of {total} lessons'],
    insightsRevisit:['ประเมินตนเองว่าอยากทบทวน','Self-assessments marked Revisit'],
    insightsUnscored:['ไม่รวมในคะแนนอัตโนมัติ','Not automatically scored'],
    insightsPriorities:['หัวข้อที่ควรกลับไปทบทวน','Review priorities'],
    insightsCompare:['ความแม่นยำแยกรายวิชา','Accuracy by course'],
    insightsLimited:['ข้อมูลยังน้อย','Limited sample'],
    insightsSample:['{observations} ครั้ง · {unique} คำถามอัตโนมัติไม่ซ้ำ','Observations: {observations} · Unique graded questions: {unique}'],
    insightsPracticeLink:['ฝึกโจทย์','Practice'],
    insightsExamLink:['ข้อสอบฝึก','Exam'],
    insightsCounts:['ถูก {correct} · ผิด {incorrect}','Correct {correct} · Incorrect {incorrect}'],
    insightsSection:['อ่านหัวข้อนี้','Lesson section'],
    insightsNoMistakes:['ยังไม่มีคำตอบผิดในผลที่นำมานับ ข้อมูลนี้ไม่ใช่หลักฐานว่าชำนาญทุกหัวข้อ','No incorrect observations in included results. This does not establish mastery.'],
    insightsRecent:['กิจกรรมการฝึกที่ใช้ได้ล่าสุด','Recent valid activity'],
    insightsUndated:['ไม่มีเวลาบันทึก (ชุดที่ตอบครบแต่ยังไม่บันทึกผล)','Time unavailable (completed, unsaved result)'],
    insightsEmpty:['ยังไม่มีผลที่ตอบครบและนำมานับได้','No completed results to include'],
    insightsSavedAt:['เวลาบันทึกผล','Result saved'],
    insightsEmptyHelp:['ตอบคำถามที่ตรวจอัตโนมัติให้ครบในชุดฝึกหรือชุดข้อสอบ เพื่อดูข้อมูลจริงของคุณที่นี่','Complete the automatically graded questions in a practice or exam run to see your results here.'],
    insightsInsufficient:['หัวข้อที่ยังมีข้อมูลไม่เพียงพอ','Topics with insufficient evidence'],
    insightsMethod:['วิธีคำนวณและข้อจำกัดของข้อมูล','How these numbers are calculated'],
    insightsFormula:['ความแม่นยำ = จำนวนครั้งที่ตอบถูก ÷ (จำนวนครั้งที่ตอบถูก + จำนวนครั้งที่ตอบผิด) ใช้เฉพาะคำตอบที่ส่งแล้วในชุดที่ตอบคำถามอัตโนมัติครบ คำนวณใหม่ด้วยเกณฑ์คำตอบของรุ่นปัจจุบัน','Accuracy = correct observations ÷ (correct + incorrect observations). Only submitted answers in completed automatic runs count, recomputed with the current answer keys.'],
    insightsPolicy:['แต่ละครั้งที่ทำซ้ำเป็นอีกหนึ่งการสังเกต คำถามไม่ซ้ำนับด้วยรหัสคำถาม ไม่ใช่จำนวนครั้งที่ทำ ชุดปัจจุบันที่เหมือนผลบันทึกล่าสุดจะนับครั้งเดียว ไม่มีการอนุมานแนวโน้มหรือความชำนาญ','Repeated attempts are separate observations. Unique questions use stable IDs. An active result identical to its latest saved attempt counts once. No trend or mastery is inferred.'],
    insightsThreshold:['ป้ายข้อมูลยังน้อยหมายถึงน้อยกว่า 3 คำถามอัตโนมัติไม่ซ้ำ หรือ 5 ครั้งที่ตรวจ เป็นเพียงกติกาแสดงขนาดตัวอย่าง ไม่ใช่เกณฑ์ยืนยันความชำนาญ หัวข้อเรียงจากจำนวนครั้งที่ผิดซึ่งอาจมาจากการทำซ้ำ','Limited sample means fewer than 3 distinct automatic questions or 5 graded observations. This is a display rule, not a validated mastery threshold. Mistake counts can include repeated attempts.'],
    insightsNoWrite:['หน้านี้อ่านข้อมูลอย่างเดียว ไม่แก้ไข ลบ หรือบันทึก localStorage การเปลี่ยนภาษาและโหมดสีในหน้านี้มีผลชั่วคราวเท่านั้น','This page only reads storage. It never changes, removes or saves localStorage. Language and appearance changes here are temporary.'],
    insightsExcluded:['ตรวจข้อมูลทุกรายวิชา — ไม่นับ: ข้อมูลผิดรูปแบบ {invalid} · ยังตอบไม่ครบ {incomplete} · รุ่นไม่รองรับ {incompatible} · ชุดข้อสอบเก่า {archived} · ผลซ้ำ {duplicate}','All-course read — excluded: malformed {invalid} · incomplete {incomplete} · incompatible {incompatible} · archived sessions {archived} · duplicates {duplicate}'],
    insightsArchive:['ชุดข้อสอบรุ่นเก่ายังคงอยู่ตามเดิม แต่ไม่อ่านคำตอบหรือตรวจคะแนนใหม่ในหน้านี้ เปิดบทเรียนเดิมเพื่อดูประวัติพร้อมบริบทรุ่นเก่า','Archived exam sessions are preserved and excluded here; their answers are not read or regraded. Open the original lesson to view historical context.'],
    insightsUnavailable:['เบราว์เซอร์ไม่อนุญาตให้อ่านข้อมูลบางส่วน ผลที่แสดงอาจไม่ครบ หน้านี้ไม่ได้แก้ไขข้อมูลเดิม','Some browser storage could not be read. Results may be incomplete. Your existing data was not changed.'],
    insightsLoadError:['โหลดเกณฑ์คำตอบไม่สำเร็จ จึงไม่แสดงสถิติที่อาจผิด ลองโหลดใหม่ได้โดยข้อมูลเดิมไม่เปลี่ยน','Answer-key data could not be loaded. No potentially incorrect statistics are shown. Retry without changing saved data.'],
    insightsRefresh:['อ่านข้อมูลใหม่','Refresh results'],
    insightsSort:['เรียงหัวข้อ','Sort topics'],
    insightsMistakesSort:['ตอบผิดมากที่สุด','Most mistakes'],
    insightsAccuracySort:['ความแม่นยำน้อยที่สุด','Lowest accuracy'],
    insightsTitleSort:['ชื่อบทเรียนและหัวข้อ','Lesson and topic title'],
    insightsAllCourses:['ทุกรายวิชา','All courses'],
    insightsCourse:['รายวิชา','Course'],
    insightsNoRevisit:['ยังไม่มีการประเมินตนเองว่าอยากทบทวนในผลที่นำมานับ','No Revisit ratings in included results.'],
    insightsUpdated:['อ่านผลการฝึกล่าสุดแล้ว','Results refreshed'],
    insightsHistoryNote:['ประวัติเดิมเก็บสูงสุด 10 ครั้งต่อชุด และ 10 ชุดต่อบทเรียนต่อรุ่น ข้อมูลนี้จึงไม่ใช่ประวัติการเรียนทั้งหมด ชุดที่ยังไม่บันทึกไม่มีเวลาและจะแสดงท้ายรายการ','Existing storage retains up to 10 attempts per run and 10 exam sessions per lesson per revision. This is not lifetime learning history. Unsaved completed results have no timestamp and appear last.'],
    insightsReviewSelf:['การประเมินตนเองที่อยากทบทวน','Self-assessment review'],
    insightsRevisitCount:['อยากทบทวน {count} ครั้ง · ไม่รวมคะแนน','{count} Revisit observations · unscored'],
    homeNavigation:['หน้าหลัก','Home'],
    coursesNavigation:['รายวิชา','Courses'],
    practiceAndExams:['แบบฝึกและข้อสอบ','Practice & Exams'],
    practiceEntryNote:['เลือกฝึกในบทเรียนที่เผยแพร่แล้ว ใช้โจทย์และประวัติชุดเดิม','Practice inside published lessons, using the existing questions and saved attempts.'],
    lessonPracticeLinks:['เลือกบทเรียนเพื่อฝึก','Choose a lesson to practice'],
    lessonPractice:['ฝึกในบทเรียน','Lesson practice'],
    lessonTable:['ตาราง','Table'],
    examAuthored:['โจทย์ที่ผู้เขียนจัดทำ ไม่ใช่ข้อสอบจริง การประเมินตนเองไม่รวมคะแนน','Author-created revision, not official exams. Self-assessment is unscored.'],
    "examTitle":["คลังข้อสอบฝึกเพิ่มเติม","Extended Exam Bank"],
    "examMode":["รูปแบบการฝึก","Practice format"],
    "examTopic":["หัวข้อในบทเรียน","Lesson topic"],
    "examCount":["จำนวนข้อ","Question count"],
    "examFull":["ทุกข้อที่มี","Full available bank"],
    "examTopicMode":["ฝึกแยกหัวข้อ","Topic Practice"],
    "examMockMode":["ชุดจำลองสอบ (สุ่มไม่ซ้ำ)","Mock Exam (without replacement)"],
    "examStart":["เริ่มชุดใหม่ (เก็บชุดเดิมไว้ในประวัติ)","Start a new session (keep previous sessions)"],
    "examSessions":["เปิดชุดฝึกที่บันทึกไว้ (ล่าสุด 10 ชุด)","Reopen a saved session (latest 10)"],
    "examEmpty":["ยังไม่มีชุดฝึก เลือกหัวข้อหรือจำนวนข้อแล้วเริ่มได้","No session yet. Select a topic or question count to start."],
    "examHelp":["การฝึกแยกหัวข้อใช้ข้อที่ผูกกับหัวข้อนั้น ส่วนชุดจำลองสุ่มข้อจากทั้งบทและตรวจทีละข้อพร้อมคำอธิบาย ไม่ใช่ระบบสอบที่ปกปิดเฉลย การประเมินตนเองไม่รวมคะแนน และการเปลี่ยนตัวเลือกจะยังไม่ลบชุดที่กำลังทำ","Topic Practice uses questions linked to one heading. Mock Exam samples the lesson and checks answers individually with explanations; it is not a secure exam. Self-assessment is unscored. Changing selectors does not discard the current session."],
    "examRecovered":["ข้อมูลชุดฝึกไม่ตรงรุ่นหรือไม่สมบูรณ์ จึงแสดงตัวเลือกเริ่มใหม่ โดยไม่เปลี่ยนข้อมูล Practice Mode เดิม","Session data is invalid or from another bank revision. Start a new exam; original Practice Mode data is untouched."],
    "examUnavailable":["บันทึกในเครื่องไม่ได้ ชุดนี้ยังใช้ได้ในแท็บปัจจุบัน","Local storage is unavailable. This session still works in this tab."],
    "examNewer":["มีข้อมูลรุ่นใหม่กว่า แท็บนี้จะไม่เขียนทับ โปรดโหลดหน้าใหม่","Newer session data exists. This tab will not overwrite it; reload the page."],
    "examOther":["แท็บอื่นเปลี่ยนรายการชุดฝึกแล้ว ชุดที่กำลังทำยังอยู่ โหลดหน้าใหม่เพื่ออ่านรายการล่าสุด","Another tab changed the session list. Your active session stays open; reload to read the latest list."],
    "examActive":["ชุดที่กำลังทำ","Active session"],
    "examUpdated":["คลังข้อสอบมีฉบับแก้ไข ชุดเก่ายังคงใช้โจทย์และเฉลยฉบับเดิมโดยไม่คำนวณคะแนนย้อนหลังใหม่ เริ่มชุดใหม่เพื่อใช้ฉบับปัจจุบัน","The bank was corrected. Saved sessions retain their original questions and keys; historical scores are not regraded. Start a new session for the current edition."],
    "examArchived":["ฉบับเก่า","Archived revision"],
    "examArchiveNotice":["คุณกำลังดูชุดฉบับเก่าที่อาจมีข้อซึ่งแก้ไขแล้ว แสดงโจทย์ เฉลย และผลเดิมเพื่อรักษาประวัติ ไม่ใช่การรับรองเฉลยปัจจุบัน เริ่มชุดใหม่เพื่อฝึกฉบับแก้ไข","You are viewing an archived session that may contain corrected questions. Its original questions, keys and results are retained as historical context, not current answer guidance. Start a new session to practice the corrected edition."],
    "examDifficulty":["ระดับความยาก","Difficulty"],
    "examEasy":["ง่าย","Easy"],
    "examMedium":["ปานกลาง","Medium"],
    "examHard":["ยาก","Hard"],
    "examOriginal":["ชุดฝึกเดิม (ไม่ได้จัดระดับใหม่)","Original practice (not reclassified)"],
    practiceTitle:['โหมดฝึกทำโจทย์','Practice Mode'],
    practiceAuthored:['โจทย์ฝึกที่ผู้เขียนจัดทำ ไม่ใช่ข้อสอบจริงหรือเฉลยทางการ; การประเมินตนเองไม่รวมในคะแนนอัตโนมัติ','Author-created practice, not official exam questions or answer keys. Self-assessment is excluded from the automatic score.'],
    practiceSolution:['อ่านเฉลยและแนวประเมิน','Read solution and rubric'],
    practiceReference:['ทบทวนเนื้อหาที่เกี่ยวข้อง','Review related lesson content'],
    practicePosition:['ข้อ {current} จาก {total}','Question {current} of {total}'],
    practiceSelect:['เลือกข้อฝึก','Select a question'],
    practiceScore:['คะแนน {correct}/{total} · ผิด {incorrect} · ยังไม่ส่ง {unanswered}','Score {correct}/{total} · Incorrect {incorrect} · Unsubmitted {unanswered}'],
    practiceSelfCount:['ประเมินตนเองแล้ว {count} ข้อ (ไม่รวมคะแนน)','Self-assessed {count} questions (not scored)'],
    practiceCheck:['ตรวจคำตอบ','Check answer'],practiceShow:['ดูแนวประเมินตนเอง','Show self-assessment rubric'],
    practicePrev:['ข้อก่อนหน้า','Previous question'],practiceNext:['ข้อถัดไป','Next question'],
    practiceRetry:['ลองข้อนี้ใหม่','Retry this question'],practiceRetryAll:['เริ่มชุดใหม่ (เก็บประวัติเดิม)','Restart practice (keep history)'],
    practiceReview:['ทบทวนข้อที่ผิด','Review incorrect answers'],practiceAll:['กลับไปทุกข้อ','Return to all questions'],
    practiceSave:['บันทึกผลครั้งนี้','Save this attempt'],practiceRecorded:['บันทึกผลแล้ว','Attempt saved'],
    practiceNeedAnswers:['ส่งคำตอบทุกข้อที่ตรวจอัตโนมัติก่อนบันทึกผล','Submit all automatically graded questions before saving an attempt.'],
    practiceCorrect:['ถูกต้อง','Correct'],practiceIncorrect:['ยังไม่ถูกต้อง','Incorrect'],
    practiceInvalid:['เลือกคำตอบ หรือใส่ตัวเลขที่ถูกต้องก่อนส่ง','Choose an option or enter a valid number before submitting.'],
    practiceNumeric:['คำตอบตัวเลข','Numeric answer'],practiceNumericHelp:['ใช้เลข 0–9 และจุดทศนิยม ไม่ใส่หน่วยหรือเครื่องหมายเปอร์เซ็นต์','Use digits 0–9 and a decimal point; omit units and the percent sign.'],
    practiceTolerance:['ยอมรับความคลาดเคลื่อนสัมบูรณ์ {absolute} และสัมพัทธ์ {relative}','Absolute tolerance {absolute}; relative tolerance {relative}'],
    practiceExact:['ข้อนี้ตรวจค่าให้ตรงกัน ไม่ใช้ tolerance','This question requires an exact numeric value.'],
    practiceAnswer:['คำตอบอ้างอิง: {answer}','Reference answer: {answer}'],
    practiceSelfResponse:['อธิบายหรือเขียน pseudocode เพื่อประเมินตนเอง (ไม่บังคับ)','Write an explanation or pseudocode for self-assessment (optional)'],
    practiceSelfHelp:['ระบบไม่รันหรือให้คะแนนคำอธิบายและโค้ด ให้เทียบกับแนวประเมินด้วยตนเอง','Explanations and code are not executed or automatically graded. Compare your work with the rubric.'],
    practiceUnderstood:['เข้าใจแล้ว','I understand'],practiceRevisit:['ต้องทบทวน','Needs review'],
    practiceAttempts:['ประวัติการฝึก (ล่าสุดไม่เกิน 10 ครั้ง)','Attempt history (latest 10)'],
    practicePast:['ครั้ง {number}: ถูก {correct}/{total} · ผิด {incorrect}','Attempt {number}: Correct {correct}/{total} · Incorrect {incorrect}'],
    practiceNoHistory:['ยังไม่มีผลการฝึกที่บันทึก','No saved attempts yet.'],
    practiceStorageUnavailable:['บันทึกในเบราว์เซอร์ไม่ได้ ความคืบหน้าการฝึกใช้ได้เฉพาะแท็บนี้','Browser storage is unavailable. Practice progress is kept only in this tab.'],
    practiceOtherTab:['อัปเดตผลการฝึกจากอีกแท็บแล้ว','Practice progress updated from another tab.'],
    practiceUpdated:['ชุดคำถามเปลี่ยนแล้ว เริ่มการฝึกชุดนี้ใหม่ โดยข้อมูลการอ่านเดิมไม่เปลี่ยน','Questions changed. This practice restarts; existing reading data is unchanged.'],
    practiceRecovered:['ข้อมูลการฝึกเดิมใช้ไม่ได้ เริ่มชุดนี้ใหม่โดยไม่เปลี่ยนข้อมูลการอ่าน','Saved practice data could not be restored. Starting fresh without changing reading data.'],
    learn: ['เรียน','Learn'], skipContent: ['ข้ามไปเนื้อหา','Skip to content'],
    decreaseFont: ['ลดขนาดตัวอักษร','Decrease font size'], increaseFont: ['เพิ่มขนาดตัวอักษร','Increase font size'], printLesson: ['พิมพ์','Print'],
    shellCode: ['โค้ด Bash','Bash code'], pythonCode: ['โค้ด Python','Python code'], copyCode: ['คัดลอกโค้ด','Copy code'], codeCopied: ['คัดลอกแล้ว','Code copied'], copyUnavailable: ['คัดลอกอัตโนมัติไม่ได้ โปรดเลือกและคัดลอกโค้ด','Copy unavailable; select and copy the code'],
    stepDiagram: ['แผนภาพตามลำดับ','Ordered step diagram'], stepLegend: ['กรอบหนา = ตำแหน่งปัจจุบัน · ✓ = ประมวลผลแล้ว','Thick border = current position · ✓ = processed'],
    previousStep: ['ก่อนหน้า','Previous'], nextStep: ['ถัดไป','Next'], resetSteps: ['เริ่มใหม่','Reset'],
    staticSteps: ['อ่านขั้นตอนทั้งหมด (ใช้ได้โดยไม่เปิด JavaScript)','Read all steps (available without JavaScript)'],
    programOutput: ['ผลลัพธ์','Output'], stepPosition: ['ขั้นตอน {page} จาก {total}','Step {page} of {total}'],
    activeNode: ['ตำแหน่งปัจจุบัน','Current position'], visitedNode: ['ประมวลผลแล้ว','Processed'], pendingNode: ['ยังไม่ประมวลผล','Not processed'],
    readerContents: ['สารบัญบทเรียน', 'Lesson contents'],
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
  const protectedSelector = 'script,style,noscript,.prose:not(.settings-preview),.course-thai,.course-header p,.resource-main>a,.resource-meta span:last-child,#pdf-title,#lessons article,#quiz .question';
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
