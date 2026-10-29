/* Structural evidence/identity checks; independent math and ESP32 compilation run separately. */
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const visuals=require('./ai-oop-visual-markdown.cjs');
const B=require('./lesson-build.cjs'),C=require('../assets/practice-contract.js'),I=require('../assets/insights-contract.js'),manifest=I.validate(require('../assets/insights-banks.json')),catalog=require('../catalog.json'),ledger=require('./iot-verification.json');
const lessons=manifest.lessons.filter(l=>l.course==='internet-of-things'),evidence=new Map(ledger.cases.map(c=>[c.question,c])),ids=new Set(),counts={choice:0,numeric:0,self:0};
assert.equal(lessons.length,9);assert.equal(evidence.size,225);assert.equal(ledger.selfAssessments.length,45);assert.equal(manifest.lessons.length,46);assert.equal(manifest.lessons.flatMap(l=>l.bank.data.questions).length,1380);
const baseline=require('./iot-preservation.json');
for(const [file,expected]of Object.entries(baseline.files)){const bytes=visuals.preservedBytes(file,B);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),expected,'Protected37-lesson baseline: '+file);}
for(const old of baseline.resources){const current=catalog.resources.find(r=>r.id===old.id);assert.ok(current,old.id);for(const key of ['reader','path','course'])assert.equal(current[key],old[key],old.id+': stable published identity');}
assert.equal(Object.keys(baseline.files).filter(f=>f.endsWith('.pdf')).length,15);
assert.equal(require('./reading-baseline.json').reduce((n,l)=>n+l.anchors.length,0),370);
assert.equal(catalog.courses.find(c=>c.id==='internet-of-things').code,'89022567');
for(const l of lessons){
 const source='courses/internet-of-things/summaries/'+l.reader.split('/').at(-1).replace('.html','.md'),raw=fs.readFileSync(source,'utf8').replace(/\r\n/g,'\n'),html=fs.readFileSync(l.reader,'utf8'),{meta,body}=B.metadata(raw);
 assert.equal(meta.id,l.id);assert.equal(l.practiceIds.length,6);assert.equal(l.bank.data.questions.length,30);assert.equal(l.bank.topics.length,5);
 assert.ok(!html.includes('{{'));assert.match(html,/i18n\.js\?v=phase13-iot-1/);assert.match(html,/iot-lessons\.css\?v=phase13-iot-1/);assert.match(html,/<span>C\+\+<\/span>/);assert.match(raw,/```cpp\n/);assert.match(raw,/ไม่ใช่.*ข้อสอบ/);
 for(const q of l.bank.data.questions){assert.ok(!ids.has(q.id),q.id);ids.add(q.id);counts[q.type]++;assert.ok(html.includes('id="'+q.reference+'"'));assert.match(q.explanation,/[\u0e00-\u0e7f]/);
  if(q.type==='self'){assert.equal(C.grade(q,'explanation'),null);assert.ok(q.rubric.length>=3);const reviewed=ledger.selfAssessments.find(v=>v.question===q.id);assert.ok(reviewed);assert.equal(reviewed.reference,q.reference);assert.deepEqual(reviewed.rubric,q.rubric);continue;}
  const c=evidence.get(q.id);assert.ok(c,q.id);assert.equal(c.lesson,l.id);assert.equal(c.reference,q.reference);assert.ok(c.reason.length>15);assert.match(c.technical,/^https:\/\/(?:docs\.espressif\.com|www\.espressif\.com|docs\.arduino\.cc|cdn\.sparkfun\.com|learn\.adafruit\.com|github\.com)\//);
  const answer=q.type==='choice'?q.choices.find(v=>v.id===q.answer).text:q.answer;assert.equal(answer,c.conclusion,q.id);assert.equal(C.grade(q,String(q.answer)),true);
  if(q.type==='choice'){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices.map(x=>x.text)).size,4);}else{assert.ok(c.oracle);assert.equal(C.grade(q,String(q.answer+Math.max(1,10*q.absoluteTolerance))),false);}
 }
 assert.equal(l.bank.data.questions.filter(q=>q.type==='self').length,5);
 assert.ok(body.length>3000);
}
assert.equal(ids.size,270);assert.equal(counts.self,45);assert.equal(counts.choice+counts.numeric,225);
const fixture=B.markdown('## Safe {#safe}\n```cpp\nconst char* s="<script> pythonCode โค้ด Python";\n```',{root:process.cwd(),source:'courses/internet-of-things/summaries/final-arduino-cpp.md',output:lessons[4].reader,catalog});
assert.match(fixture.html,/&lt;script&gt; pythonCode โค้ด Python/);assert.ok(!fixture.html.includes('<script>'));assert.match(fixture.html,/cppCode/);assert.equal(fixture.interactive,true);
assert.equal(I.courses(manifest).length,4);
const l=lessons[0],data={...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))},answers=Object.fromEntries(data.questions.map(q=>[q.id,{draft:q.type==='self'?'เหตุผล':String(q.answer),submitted:true,rating:q.type==='self'?'revisit':null}])),state={...C.clean(data,null),responses:answers,attempts:[{at:1,responses:structuredClone(answers)}]},raw=JSON.stringify(state),key=I.prefix.practice+l.id;
const engine=I.create(manifest,I.reader(k=>k===key?raw:null)),result=engine.refresh(),stats=engine.summarize(result,'internet-of-things');assert.deepEqual([stats.correct,stats.incorrect,stats.unique,stats.repeated,stats.self,stats.available],[5,0,5,0,1,9]);assert.equal(JSON.stringify(state),raw);assert.equal(engine.summarize(result,'unix-tools').total,0);
console.log('PASS: IoT9/270 ('+counts.choice+' four-choice,'+counts.numeric+' numeric,45 self),225 evidence entries; original37/1110/370 anchors/15PDF preserved; safe C++ viewers, catalog/anchors/cache and fourth-course readonly Insights');
