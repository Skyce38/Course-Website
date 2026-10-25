/* Dependency-free metadata, numeric, storage and build regression checks. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const C=require('../assets/practice-contract.js'),{render}=require('./practice-build.cjs'),{metadata,markdown,buildLessons}=require('./lesson-build.cjs');
const catalog=JSON.parse(fs.readFileSync('catalog.json','utf8')),files=[];
for(const course of ['oop-python','artificial-intelligence'])for(const file of fs.readdirSync('courses/'+course+'/practice'))if(file.endsWith('.json'))files.push(`courses/${course}/practice/${file}`);
assert.equal(files.length,4,'MVP remains scoped to four lessons');
let questions=0;
for(const file of files){
  const data=C.validate(JSON.parse(fs.readFileSync(file,'utf8'))),resource=catalog.resources.find(r=>r.id===data.lesson);assert.ok(resource);
  const source=`courses/${resource.course}/${resource.path}`,parsed=metadata(fs.readFileSync(source,'utf8')),headings=markdown(parsed.body,{root:process.cwd(),source,output:resource.reader,catalog}).headings;
  const html=render(data,headings);assert.ok(fs.readFileSync(resource.reader,'utf8').includes(html));assert.equal(data.questions.length,6);assert.equal(data.questions.filter(q=>q.type==='self').length,1);
  const answers={};
  for(const q of data.questions){
    questions++;if(q.type==='self'){assert.equal(C.grade(q,'anything'),null);continue}
    assert.equal(C.grade(q,String(q.answer)),true);assert.equal(C.grade(q,''),null);
    answers[q.id]={draft:String(q.answer),submitted:true,rating:null};
    assert.equal(C.grade(q,q.type==='numeric'?String(q.answer+Math.max(1,(q.absoluteTolerance+q.relativeTolerance*Math.abs(q.answer))*10)):q.choices.find(c=>c.id!==q.answer).id),false);
  }
  assert.deepEqual(C.summary(data,answers),{correct:5,incorrect:0,unanswered:0,self:0,total:5});
  const state={...C.clean(data,null),responses:answers,attempts:[{at:123,responses:answers}],recorded:true};
  assert.deepEqual(C.clean(data,state),state);assert.equal(C.clean(data,{...state,revision:data.revision+1}).attempts.length,0);
  for(const input of [null,[],false,{},'bad',{version:9},{version:1,revision:1,responses:[],attempts:[null,{},false],current:'missing',review:['missing']}])assert.equal(C.summary(data,C.clean(data,input).responses).correct,0);
  const forged=C.clean(data,{...state,responses:{[data.questions[0].id]:{draft:'not-an-answer',submitted:true,correct:true}},attempts:[{at:10,responses:{},score:100}]});assert.equal(C.summary(data,forged.responses).correct,0);assert.equal(forged.attempts.length,0);
  assert.equal(C.clean(data,{...state,attempts:Array(20).fill({at:1,responses:answers})}).attempts.length,10);
  assert.equal(C.clean(data,{...state,attempts:[{at:1e300,responses:answers},{at:8640000000000001,responses:answers}]}).attempts.length,0,'invalid timestamps cannot reach date rendering');
  const longChoice=structuredClone(data.questions.find(q=>q.type==='choice'));longChoice.choices[0].id='a'.repeat(100);longChoice.answer=longChoice.choices[0].id;
  const longData={...data,questions:[longChoice]};C.validate(longData);assert.equal(C.summary(longData,C.responses(longData,{[longChoice.id]:{draft:longChoice.answer,submitted:true}})).correct,1);
  for(const patch of [{version:2},{lesson:'../bad'},{revision:0},{unknown:1},{questions:[data.questions[0],data.questions[0]]}])assert.throws(()=>C.validate({...data,...patch}));
  const numeric=data.questions.find(q=>q.type==='numeric');for(const patch of [{answer:Infinity},{absoluteTolerance:-1},{relativeTolerance:2},{choices:[]}])assert.throws(()=>C.validate({...data,questions:[{...numeric,...patch}]}));
  assert.throws(()=>render(data,[]));assert.throws(()=>render(data,[...headings,{id:'practice-mode'}]));
  const injection=structuredClone(data);injection.questions[0].prompt='</script><img src=x onerror=alert(1)>';const safe=render(injection,headings);assert.ok(!safe.includes('<img'));assert.ok(safe.includes('\\u003c/script>'));assert.ok(safe.includes('&lt;img'));
}
for(const bad of ['', ' ', 'NaN','Infinity','0x10','1,000','1%','2 kg','1e999','1e-999','1e13','--1'])assert.equal(C.number(bad),null,bad);
assert.equal(C.number(' -2.5e-2 '),-.025);assert.equal(C.number('0e-999'),0);
const q={type:'numeric',answer:.3,absoluteTolerance:.1,relativeTolerance:0};assert.equal(C.grade(q,'.4'),true);assert.equal(C.grade(q,'.40001'),false);
assert.equal(C.grade({...q,absoluteTolerance:0},'.30000000000000004'),false,'exact has no epsilon allowance');
assert.equal(C.grade({...q,answer:100,absoluteTolerance:0,relativeTolerance:.01},'101'),true);assert.equal(C.grade({...q,answer:100,absoluteTolerance:0,relativeTolerance:.01},'101.01'),false);
assert.equal(C.grade({...q,answer:1e-100,absoluteTolerance:1e-102},'2e-100'),false,'tiny-scale epsilon must not dominate tolerance');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'study-practice-check-'));
assert.equal(path.dirname(path.resolve(temp)),path.resolve(os.tmpdir()),'Temporary fixture must stay under the OS temp directory');
try{
  const data=JSON.parse(fs.readFileSync('courses/oop-python/practice/stack.json','utf8')),source='courses/oop-python/summaries/stack.md',sidecar='courses/oop-python/practice/stack.json';
  const meta=metadata(fs.readFileSync(source,'utf8')).meta;
  for(const dir of ['scripts','templates','courses/oop-python/summaries','courses/oop-python/practice'])fs.mkdirSync(path.join(temp,dir),{recursive:true});
  fs.copyFileSync('templates/lesson.html',path.join(temp,'templates/lesson.html'));
  fs.writeFileSync(path.join(temp,'scripts/lessons.json'),JSON.stringify([source]));
  fs.writeFileSync(path.join(temp,source),'---\n'+JSON.stringify(meta)+'\n---\n'+[...new Set(data.questions.map(q=>q.reference))].map(id=>'## Test {#'+id+'}').join('\n'));
  fs.writeFileSync(path.join(temp,sidecar),JSON.stringify(data));const cloned=structuredClone(catalog);buildLessons(cloned,temp);
  const output=path.join(temp,'read/oop-python/stack.html'),before=fs.readFileSync(output,'utf8');assert.ok(before.includes('practice-contract.js'));buildLessons(cloned,temp);assert.equal(fs.readFileSync(output,'utf8'),before);
  fs.writeFileSync(path.join(temp,sidecar),JSON.stringify({...data,lesson:'wrong-id'}));assert.throws(()=>buildLessons(cloned,temp),/identity mismatch/);assert.equal(fs.readFileSync(output,'utf8'),before);
  fs.writeFileSync(path.join(temp,sidecar),JSON.stringify({...data,questions:[{...data.questions[0],reference:'missing'}]}));assert.throws(()=>buildLessons(cloned,temp),/Missing practice reference/);assert.equal(fs.readFileSync(output,'utf8'),before);
  fs.unlinkSync(path.join(temp,sidecar));buildLessons(cloned,temp);assert.ok(!fs.readFileSync(output,'utf8').includes('practice-contract.js'));
}finally{fs.rmSync(temp,{recursive:true,force:true})}
console.log(`PASS: four practice sidecars / ${questions} authored questions; validation/XSS/references, exact/absolute/relative numeric boundaries, derived scores, stale/malformed state and capped attempts`);
