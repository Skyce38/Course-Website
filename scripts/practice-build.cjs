const {validate}=require('../assets/practice-contract.js');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(data,headings){
  validate(data);
  if(headings.some(h=>['practice-mode','practice-title'].includes(h.id)))throw Error('Practice anchor conflicts with lesson');
  for(const q of data.questions)if(!headings.some(h=>h.id===q.reference))throw Error('Missing practice reference: '+q.reference);
  const payload=JSON.stringify(data).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
  return '<section class="practice-mode reading-page" id="practice-mode" aria-labelledby="practice-title"><h2 id="practice-title" data-i18n="practiceTitle">โหมดฝึกทำโจทย์</h2><p data-i18n="practiceAuthored">โจทย์ฝึกที่ผู้เขียนจัดทำ ไม่ใช่ข้อสอบจริงหรือเฉลยทางการ; การประเมินตนเองไม่รวมในคะแนนอัตโนมัติ</p><div class="practice-fallback"><ol>'+data.questions.map(q=>'<li><h3 lang="th">'+esc(q.prompt)+'</h3>'+(q.choices?'<ul>'+q.choices.map(c=>'<li>'+esc(c.id.toUpperCase()+'. '+c.text)+'</li>').join('')+'</ul>':'')+'<a href="#'+q.reference+'" data-i18n="practiceReference">ทบทวนเนื้อหาที่เกี่ยวข้อง</a><details><summary data-i18n="practiceSolution">อ่านเฉลยและแนวประเมิน</summary>'+ (q.type!=='self'?'<p>'+esc(q.type==='choice'?q.choices.find(c=>c.id===q.answer).text:q.answer)+'</p>':'')+'<p lang="th">'+esc(q.explanation)+'</p>'+(q.rubric?'<ul lang="th">'+q.rubric.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>':'')+'</details></li>').join('')+'</ol></div><script type="application/json" class="practice-data">'+payload+'</script></section>';
}
module.exports={render};
