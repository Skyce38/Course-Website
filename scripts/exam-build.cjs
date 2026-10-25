const E=require('../assets/exam-contract.js'),P=require('./practice-build.cjs');
function render(base,extra,headings){
 const bank=E.prepare(base,extra,headings);
 for(const id of ['exam-mode','exam-title'])if(headings.some(h=>h.id===id))throw Error('Exam anchor conflict');
 const payload=JSON.stringify(bank).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
 const html=P.render(bank.data,headings).replace('class="practice-mode reading-page"','class="practice-mode exam-mode reading-page"').replace('id="practice-mode"','id="exam-mode"').replace('aria-labelledby="practice-title"','aria-labelledby="exam-title"').replace('id="practice-title"','id="exam-title"').replace('data-i18n="practiceTitle">โหมดฝึกทำโจทย์','data-i18n="examTitle">คลังข้อสอบฝึกเพิ่มเติม').replace(/<p data-i18n="practiceAuthored">[^<]+<\/p>/,'<p data-i18n="examAuthored">โจทย์ที่ผู้เขียนจัดทำ ไม่ใช่ข้อสอบจริง การประเมินตนเองไม่รวมคะแนน</p>').replace('class="practice-fallback"','class="exam-fallback"');
 // Callback replacement keeps literal $&, $` and $' in educational examples intact.
 return html.replace(/<script type="application\/json" class="practice-data">[\s\S]*?<\/script>/,()=>'<script type="application/json" class="exam-data">'+payload+'</script>');
}
module.exports={render};
