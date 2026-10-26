/* Frozen historical contexts and seeded pre-correction session compatibility. */
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const B=require('./lesson-build.cjs'),E=require('../assets/exam-contract.js'),C=require('../assets/practice-contract.js'),catalog=require('../catalog.json');
const historicalHashes={
 'oop-python-complexity-basic-sorting':'f03eaaf3f4893e731b82644f4204b4a9845abf0d8ea38778632272b67bbe5e3d',
 'artificial-intelligence-final-decision-tree':'508b8e8987958793556349d4acaeb2322b3c4ddff5658f7bab52691234ffca92',
 'artificial-intelligence-ai-foundations-agents':'fa7c8a8055eb0136946f54bf91b156a05c9804c55208cf8260922dd101751c4e'
};
let current=0,archived=0;
for(const source of require('./lessons.json')){
 const {meta,body}=B.metadata(fs.readFileSync(source,'utf8'));
 const base=require(`../courses/${meta.course}/practice/${meta.slug}.json`),extra=require(`../courses/${meta.course}/exam/${meta.slug}.json`);
 const headings=B.markdown(body,{root:process.cwd(),source,output:`read/${meta.course}/${meta.slug}.html`,catalog}).headings;
 const bank=E.prepare(base,extra,headings);current+=bank.data.questions.length;
 if(!historicalHashes[meta.id]){assert.equal(bank.history,undefined);continue}
 assert.equal(bank.data.revision,2);assert.equal(bank.history.length,1);const old=bank.history[0];
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(old)).digest('hex'),historicalHashes[meta.id],'Exact pre-correction context frozen');archived+=old.data.questions.length;
 const retired=old.data.questions.filter(q=>!bank.data.questions.some(n=>n.id===q.id));assert.equal(retired.length,1);
 assert.ok(bank.data.questions.some(q=>q.id===retired[0].id+'-r2'));
 const ids=old.data.questions.map(q=>q.id),session={token:'legacy-session-01',mode:'mock',topic:'all',count:'full',ids};
 const originalConfig={version:1,revision:1,current:session.token,sessions:[session]},raw=JSON.stringify(originalConfig);
 const migrated=E.clean(bank,originalConfig);assert.equal(JSON.stringify(originalConfig),raw,'No mutation');
 assert.equal(migrated.revision,2);assert.deepEqual(migrated.sessions[0],{...session,revision:1});
 assert.deepEqual(E.clean(bank,migrated),migrated,'Migration idempotent');
 const data=E.subset(E.sessionBank(bank,migrated.sessions[0]),ids),responses={};
 for(const q of data.questions)responses[q.id]={draft:q.type==='self'?'คำตอบเก่า':String(q.answer),submitted:true,rating:q.type==='self'?'revisit':null};
 const state={...C.clean(data,null),responses,attempts:[{at:1700000000000,responses:structuredClone(responses)}],recorded:true};
 assert.deepEqual(C.clean(data,state),state,'Old attempts, drafts, self ratings and keys retained exactly');
 assert.equal(C.summary(data,state.responses).correct,25);assert.equal(C.summary(data,state.responses).self,5);
 assert.equal(data.questions.find(q=>q.id===retired[0].id).prompt,retired[0].prompt,'Never reinterpret a retired answer with a new prompt');
 const fresh=C.clean(bank.data,null);assert.deepEqual(fresh.responses,{});assert.ok(!bank.data.questions.some(q=>q.id===retired[0].id));
 let config=migrated;
 for(let i=0;i<12;i++)config=E.clean(bank,{...config,current:'current-run-'+i,sessions:[...config.sessions,{token:'current-run-'+i,mode:'mock',topic:'all',count:10,ids:E.choose(bank,'mock','all',10,()=>.2)}]});
 assert.equal(config.sessions.filter(s=>s.revision===1).length,1,'New runs do not evict archived revision');
 assert.equal(config.sessions.filter(s=>!s.revision).length,10);
 assert.equal(E.clean(bank,{...originalConfig,revision:99}).sessions.length,0);
 assert.equal(E.clean(bank,{...migrated,sessions:[{...session,revision:99}]}).sessions.length,0);
 for(const invalid of [{...bank,history:[old,old]},{...bank,history:[{...old,history:[]}]},{...bank,history:[{...old,data:{...old.data,lesson:'different-lesson'}}]}])assert.throws(()=>E.validate(invalid));
}
assert.equal(current,750);assert.equal(archived,90);
console.log('PASS: 750 current questions, 3 semantic replacements; 90 immutable historical context questions; revision-1 drafts/attempts/scores/rubrics, idempotent migration, retained archived sessions and future/malformed rejection');
