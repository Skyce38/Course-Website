/* Database additions plus immutable Phase15 preservation. No server, storage or dependencies. */
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto'),B=require('./lesson-build.cjs'),C=require('../assets/practice-contract.js'),E=require('../assets/exam-contract.js'),I=require('../assets/insights-contract.js');
const P=require('./database-preservation.cjs'),V=require('./database-visual-markdown.cjs'),spec=require('./database-visuals.json'),baseline=require('./database-preservation.json'),catalog=require('../catalog.json'),manifest=I.validate(require('../assets/insights-banks.json')),ledger=require('./database-verification.json');
const read=f=>fs.readFileSync(f,'utf8').replace(/\r\n/g,'\n'),hash=b=>crypto.createHash('sha256').update(b).digest('hex'),db=manifest.lessons.filter(l=>l.course==='database-management');
assert.equal(db.length,10);assert.equal(manifest.lessons.length,56);assert.equal(manifest.lessons.flatMap(l=>l.bank.data.questions).length,1680);assert.equal(I.courses(manifest).length,5);
for(const [file,expected]of Object.entries(baseline.files)){
 const bytes=fs.readFileSync(file),binary=/\.(pdf|webp|png|woff2?|ttf|eot|jpe?g)$/i.test(file);assert.equal(hash(binary?bytes:Buffer.from(bytes.toString().replace(/\r\n/g,'\n'))),expected,'Immutable Phase15 file: '+file);
}
for(const file of ['catalog.json','index.html','assets/insights-banks.json','assets/i18n.js','assets/insights.js','insights.html','scripts/lessons.json','courses/database-management/course.json'])assert.equal(hash(P.normalize(file,Buffer.from(read(file)))),baseline.reviewedMutable[file],'Only additive reviewed integration: '+file);
assert.equal(Object.keys(baseline.files).filter(f=>f.endsWith('.pdf')).length,15);
assert.equal(require('./reading-baseline.json').reduce((n,l)=>n+l.anchors.length,0),370);
assert.equal(catalog.courses.find(c=>c.id==='database-management').code,'89022167');
assert.equal(require('../courses/database-management/course.json').code,'89022167');
const evidence=new Map(ledger.questions.map(q=>[q.id,q]));assert.equal(evidence.size,300);const counts={choice:0,numeric:0,self:0},ids=new Set();
for(const l of db){
 const source='courses/database-management/summaries/'+l.reader.split('/').at(-1).replace('.html','.md'),raw=read(source),{meta,body}=B.metadata(raw),plain=V.strip(body),html=read(l.reader),headings=B.markdown(body,{root:process.cwd(),source,output:l.reader,catalog}).headings;
 assert.equal(meta.id,l.id);assert.match(meta.title,/^DB \d{2} — /);assert.equal(l.bank.data.questions.length,30);assert.equal(l.practiceIds.length,6);
 assert.equal(l.bank.data.questions.filter(q=>q.type==='self').length,5);assert.ok(plain.length>5000);assert.match(plain,/ไม่ใช่/);assert.match(html,/database-visuals\.css\?v=phase16-db-visual-1/);assert.match(html,/i18n\.js\?v=phase16-db-1/);assert.equal([...raw.matchAll(/!\[[^\n]*\]\(images\/db16-/g)].length,2,'Exactly two figures after caption edits');assert.equal([...html.matchAll(/<img [^>]*\/images\/db16-/g)].length,2);
 assert.ok(!html.includes('{{'));assert.ok(!/<\?php/.test(html),'PHP displayed escaped, not executable');
 for(const anchor of ['objectives','practice','summary','sources'])assert.ok(headings.some(h=>h.id===anchor));
 for(const q of l.bank.data.questions){
  assert.ok(!ids.has(q.id));ids.add(q.id);counts[q.type]++;const e=evidence.get(q.id);assert.ok(e&&e.lesson===l.id&&e.reference===q.reference);assert.ok(e.rationale.length>15&&e.source.length>20);assert.ok(['easy','medium','hard'].includes(e.difficulty));assert.ok(headings.some(h=>h.id===q.reference));
  const section=plain.split(new RegExp('^## .*\\{#'+q.reference+'\\}\\n','m'))[1];assert.ok(section?.trim().startsWith(e.evidence),'Reviewed opening evidence: '+q.id);
  if(q.type==='self'){assert.deepEqual(q.rubric,e.rubric);assert.ok(q.rubric.length>=3);assert.equal(C.grade(q,'anything'),null)}
  else {const truth=q.type==='choice'?q.choices.find(c=>c.id===q.answer).text:q.answer;assert.equal(truth,e.conclusion,'Reviewed academic key: '+q.id);assert.equal(C.grade(q,String(q.answer)),true);if(q.type==='numeric'){assert.equal(q.absoluteTolerance,0);assert.equal(C.grade(q,String(q.answer+.01)),false)}}
 }
 // All table rows have the same number of cells as their actual header.
 const prose=plain.replace(/```[\s\S]*?```/g,'');let columns=0;
 for(const line of prose.split('\n')){if(line.startsWith('|')){const n=line.split('|').length;if(!columns)columns=n;assert.equal(n,columns,source+': no mislabelled result columns')}else columns=0}
 const base={...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))},responses=Object.fromEntries(base.questions.map(q=>[q.id,{draft:q.type==='self'?'เหตุผล':String(q.answer),submitted:true,rating:q.type==='self'?'revisit':null}])),key=I.prefix.practice+l.id,rawState=JSON.stringify({...C.clean(base,null),responses,attempts:[{at:1,responses:structuredClone(responses)}],recorded:true});
 const engine=I.create(manifest,I.reader(k=>k===key?rawState:null)),result=engine.refresh(),s=engine.summarize(result,'database-management');assert.deepEqual([s.correct,s.incorrect,s.unique,s.repeated,s.self,s.available],[5,0,5,0,1,10]);assert.equal(engine.summarize(result,'artificial-intelligence').total,0);assert.equal(engine.summarize(result,'internet-of-things').total,0);
}
assert.deepEqual(counts,{choice:240,numeric:10,self:50});assert.equal(spec.assets.length,20);let bytes=0;
for(const d of spec.assets){
 const svg=read(d.svg),webp=fs.readFileSync(d.file);assert.equal(hash(webp),d.sha256);assert.equal(hash(Buffer.from(svg)),d.svgSha256);assert.equal(webp.length,d.bytes);bytes+=d.bytes;assert.equal(webp.subarray(0,4).toString(),'RIFF');assert.equal(webp.subarray(8,12).toString(),'WEBP');assert.ok(d.alt.length>60&&d.explanation.length>60);assert.match(svg,/STUDY \/ DB/);assert.ok(!/<script|foreignObject/i.test(svg));
 assert.ok(read('assets/database-visuals.css').includes('aspect-ratio:'+d.width+'/'+d.height));const md=read('courses/database-management/summaries/'+d.lesson+'.md');assert.equal(md.split(V.block(d)).length,2);assert.ok(db.some(l=>l.id===d.resourceId));assert.equal(spec.assets.filter(a=>a.lesson===d.lesson).length,2);
}
assert.ok(bytes<1200000);
const model=name=>spec.assets.find(d=>d.name===name).model,fixture=require('../courses/database-management/examples/campus-fixture.json').tables;
assert.deepEqual(model('db16-campus-keys').counts,['students','orders','order_items','restaurants'].map(k=>fixture[k].length));
const orders=fixture.orders,items=fixture.order_items,delivered=orders.filter(o=>o.status==='delivered'),multi=items.filter(i=>delivered.some(o=>o.order_id===i.order_id));
assert.deepEqual(model('db16-count-units'),{kind:'counts',rows:multi.length,orders:new Set(multi.map(i=>i.order_id)).size,quantity:multi.reduce((n,i)=>n+i.qty,0)});
assert.equal(model('db16-left-preserved').rows,orders.length+fixture.students.filter(s=>!orders.some(o=>o.student_id===s.student_id)).length);
const large=delivered.filter(o=>Number(o.total_amount)>=150).sort((a,b)=>Number(b.total_amount)-Number(a.total_amount)||a.order_id-b.order_id);assert.deepEqual(model('db16-filter-orders').ids,large.map(o=>o.order_id));assert.deepEqual(model('db16-filter-orders').amounts,large.map(o=>Number(o.total_amount)));
const on=fixture.students.reduce((n,s)=>n+Math.max(1,delivered.filter(o=>o.student_id===s.student_id).length),0);assert.equal(model('db16-outer-filter').on,on);assert.equal(model('db16-outer-filter').where,delivered.length);
for(const lang of ['sql','php']){const rendered=B.markdown('## Safe {#safe}\n```'+lang+'\n<script> unsafe & quotes\n```',{root:process.cwd(),source:'courses/database-management/summaries/web-database-architecture.md',output:db[0].reader,catalog});assert.match(rendered.html,/&lt;script&gt; unsafe &amp;/);assert.ok(!rendered.html.includes('<script>'));assert.ok(rendered.html.includes(lang+'Code'))}
require('./check-database-references.cjs').check();
console.log('PASS:Database10/300(240choice,10exact numeric,50ungraded),all reviewed keys/references/rubrics;20 diagrams/'+bytes+'bytes/models/ratios;5th-course read-only Insights;793 protected files,46 prior lessons/1380 questions/370 anchors/15PDFs and storage contracts unchanged');
