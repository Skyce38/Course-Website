/* Structural/key/registered-course regressions. Linux execution is a separate command. */
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const B=require('./lesson-build.cjs'),C=require('../assets/practice-contract.js'),E=require('../assets/exam-contract.js'),I=require('../assets/insights-contract.js'),manifest=I.validate(require('../assets/insights-banks.json')),catalog=require('../catalog.json'),ledger=require('./unix-verification.json');
const unix=manifest.lessons.filter(l=>l.course==='unix-tools'),ids=new Set(),evidence=new Map(ledger.cases.map(c=>[c.question,c]));assert.equal(unix.length,12);assert.equal(evidence.size,300);
const baseline=require('./unix-preservation.json');for(const [file,expected]of Object.entries(baseline.files)){let bytes=fs.readFileSync(file);if(!file.endsWith('.pdf'))bytes=Buffer.from(bytes.toString().replace(/\r\n/g,'\n'));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),expected,'Protected baseline: '+file);}
for(const old of baseline.resources){const current=catalog.resources.find(r=>r.id===old.id);assert.ok(current,old.id);for(const key of ['reader','path','course'])assert.equal(current[key],old[key],old.id+': published URL/identity');}
assert.equal(Object.keys(baseline.files).filter(f=>f.endsWith('.pdf')).length,15);assert.equal(require('./reading-baseline.json').reduce((n,l)=>n+l.anchors.length,0),370);
const previous=manifest.lessons.filter(l=>['artificial-intelligence','oop-python','unix-tools'].includes(l.course));assert.equal(previous.length,37);assert.equal(previous.flatMap(l=>l.bank.data.questions).length,1110);
let auto=0,self=0;for(const l of unix){
 const raw=fs.readFileSync('courses/unix-tools/summaries/'+l.reader.split('/').at(-1).replace('.html','.md'),'utf8'),{body}=B.metadata(raw),html=fs.readFileSync(l.reader,'utf8');
 for(const q of l.bank.data.questions){assert.ok(!ids.has(q.id));ids.add(q.id);assert.ok(html.includes('id="'+q.reference+'"'));assert.match(q.explanation,/[\u0e00-\u0e7f]/);
  if(q.type==='self'){self++;assert.equal(C.grade(q,'code'),null);assert.ok(q.rubric.length>=3);continue}auto++;
  const c=evidence.get(q.id);assert.ok(c,q.id);assert.equal(c.lesson,l.id);assert.equal(c.reference,q.reference);assert.ok(q.prompt.endsWith(c.code));assert.equal(C.grade(q,String(q.answer)),true);
  if(q.type==='numeric'){assert.equal(q.answer,Number(c.output));assert.equal(q.absoluteTolerance+q.relativeTolerance,0)}else assert.equal(q.choices.find(o=>o.id===q.answer).text,c.output||'ไม่มี stdout');
 }
 assert.equal(l.bank.data.questions.filter(q=>q.type==='self').length,5);assert.equal(l.practiceIds.length,6);assert.match(html,/shellCode/);assert.match(html,/<span>Bash<\/span>/);assert.ok(!html.includes('{{'));assert.match(html,/i18n\.js\?v=phase12-unix-1/);
 const shell=B.markdown('## Safe {#safe}\n```bash\nprintf "<script>"\n```',{root:process.cwd(),source:'courses/unix-tools/summaries/final-shell-foundations.md',output:l.reader,catalog});assert.match(shell.html,/&lt;script&gt;/);assert.ok(!shell.html.includes('<script>'));assert.equal(shell.interactive,true);
 const literals=B.codeViewer('printf "pythonCode โค้ด Python <script>"','fixture','bash');assert.ok(literals.includes('printf &quot;pythonCode โค้ด Python &lt;script&gt;&quot;'),'Language labels must never replace lesson source literals');
}
assert.equal(auto,300);assert.equal(self,60);assert.equal(ids.size,360);
assert.equal(I.courses(manifest).length,new Set(manifest.lessons.map(l=>l.course)).size);assert.ok(I.courses(manifest).some(c=>c.id==='unix-tools'));
for(const courses of [[{id:'../evil',label:'bad'}],[{id:'unix-tools',label:'Unix'},{id:'unix-tools',label:'dup'}],[],[{id:'unix-tools',label:''}]])assert.throws(()=>I.validate({...manifest,courses}));
const legacy={version:1,lessons:manifest.lessons.filter(l=>['artificial-intelligence','oop-python'].includes(l.course))};assert.equal(I.validate(legacy).lessons.length,25,'Old derived manifests remain compatible');
assert.throws(()=>I.validate({...legacy,lessons:[...legacy.lessons,unix[0]]}),'Unregistered course rejected');
const l=unix[0],data={...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))},answers=Object.fromEntries(data.questions.map(q=>[q.id,{draft:q.type==='self'?'อธิบาย':String(q.answer),submitted:true,rating:q.type==='self'?'revisit':null}])),state={...C.clean(data,null),responses:answers,attempts:[{at:1,responses:structuredClone(answers)}]},key=I.prefix.practice+l.id,raw=JSON.stringify(state);let reads=0;
const engine=I.create(manifest,I.reader(k=>{reads++;return k===key?raw:null})),result=engine.refresh(),stats=engine.summarize(result,'unix-tools');assert.deepEqual([stats.correct,stats.incorrect,stats.unique,stats.repeated,stats.self,stats.available],[5,0,5,0,1,12]);assert.equal(JSON.stringify(state),raw);assert.equal(engine.summarize(result,'oop-python').total,0);
console.log('PASS: Unix 12 lessons /360 unique questions /300 explicit executable keys /60 rubrics; 37/1110 site; real anchors, Bash escaping/copy markup, controlled registered courses, legacy manifests, Unix read-only counts');
