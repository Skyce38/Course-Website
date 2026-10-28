/* Existing Playwright required (or PLAYWRIGHT_MODULE). Serve checkout under /Course-Website/.
 * STUDY_BASE_URL=http://127.0.0.1:8780/Course-Website/ node scripts/check-practice-expansion-browser.cjs
 * Single content smoke per new lesson; deeper interaction matrix only on stage representatives.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),C=require('../assets/practice-contract.js');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8780/Course-Website/';
const registry=JSON.parse(fs.readFileSync(path.join(__dirname,'lessons.json'),'utf8'));
const sets=registry.map(file=>{const {meta}=require('./lesson-build.cjs').metadata(fs.readFileSync(path.join(__dirname,'..',file),'utf8'));return JSON.parse(fs.readFileSync(path.join(__dirname,'../courses',meta.course,'practice',meta.slug+'.json'),'utf8'))});
const pilots=['oop-python-stack','oop-python-complexity-basic-sorting','artificial-intelligence-final-knn','artificial-intelligence-final-decision-tree'];
const additions=sets.filter(q=>!pilots.includes(q.lesson)&&!q.lesson.startsWith('unix-tools-')&&!q.lesson.startsWith('internet-of-things-'));assert.equal(additions.length,21);
const key=q=>'skyce-learning-practice-v1:'+q.lesson;
const address=q=>base+'read/'+(q.lesson.startsWith('oop-python-')?'oop-python/'+q.lesson.slice(11):'artificial-intelligence/'+q.lesson.slice(24))+'.html';
const field=p=>p.locator('.practice-session fieldset:visible'),nav=(p,n)=>p.locator('.practice-session > .practice-actions button').nth(n);
const wrong=q=>q.type==='choice'?q.choices.find(c=>c.id!==q.answer).id:String(q.answer+Math.max(1,q.absoluteTolerance*10));
const seeded=Object.fromEntries(sets.filter(q=>pilots.includes(q.lesson)).map(q=>{
 const responses=Object.fromEntries(q.questions.filter(i=>i.type!=='self').map((i,n)=>[i.id,{draft:n?String(i.answer):wrong(i),submitted:true,rating:null}]));
 return [key(q),JSON.stringify({...C.clean(q,null),current:q.questions[1].id,responses,attempts:[{at:123456,responses}],recorded:true})];
}));
async function answer(p,q,value){if(q.type==='choice')await field(p).locator('input[value="'+value+'"]').check();else await field(p).locator('input[type=text]').fill(String(value))}
async function submit(p){const button=p.locator('button[type=submit]');await button.focus();await p.keyboard.press('Enter');assert.equal(await button.evaluate(n=>n===document.activeElement),true)}
const state=(p,q)=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(q));
async function scores(p,correct,incorrect,unanswered){assert.equal(await p.locator('.practice-score').innerText(),await p.evaluate(v=>LearningI18n.t('practiceScore',v),{correct,incorrect,unanswered,total:5}))}
(async()=>{
 const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000}}),errors=[],failures=[];context.setDefaultTimeout(10000);
 context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failures.push(r.url())});p.on('requestfailed',r=>{if(r.failure().errorText!=='net::ERR_ABORTED')failures.push(r.url()+':'+r.failure().errorText)});p.on('request',r=>assert.ok(!/learning-(paths|navigation)/.test(r.url()))) });
 await context.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));
 await context.addInitScript(({seeded,origin})=>{
  if(location.origin!==origin||localStorage.getItem('phase6b-test-seeded'))return;
  for(const [k,v]of Object.entries(seeded))localStorage.setItem(k,v);
  localStorage.setItem('skyce-learning-study',JSON.stringify({recent:[],completed:['oop-python-stack'],positions:{'artificial-intelligence-final-knn':{anchor:'#algorithm',scroll:500,sectionOffset:-140}}}));
  localStorage.setItem('skyce-learning-bookmarks','["oop-python-stack"]');localStorage.setItem('python-final-week10-15-v1','{"read":[],"answers":{"1":"ก"},"checklist":[]}');localStorage.setItem('phase6b-test-seeded','1');
 },{seeded,origin:new URL(base).origin});
 let p=await context.newPage();
 try{
  for(const [i,data]of additions.entries()){
   await p.goto(address(data));await p.locator('[data-practice-ready=true]').waitFor();
   assert.deepEqual(JSON.parse(await p.locator('.practice-data').textContent()),data,'built question content matches reviewed metadata');assert.equal(await p.locator('.practice-session fieldset').count(),6);
   assert.ok(await p.locator('.practice-reference').evaluateAll(ns=>ns.every(n=>document.getElementById(decodeURIComponent(new URL(n.href).hash.slice(1))))));
   await p.evaluate(v=>LearningPreferences.update(v),{layout:i%2?'classic':'modern',theme:i%2?'light':'dark',language:i%2?'th':'en'});
   const q=data.questions[0];await answer(p,q,q.answer);await submit(p);await scores(p,1,0,4);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,data.lesson);
  }
  const representatives=['artificial-intelligence-final-regression','oop-python-queue','oop-python-inheritance-mro','artificial-intelligence-ai-foundations-agents'];
  for(const id of representatives){
   const data=sets.find(q=>q.lesson===id);await p.goto(address(data));await p.locator('[data-practice-ready]').waitFor();await nav(p,4).click();
   let correct=0;
   for(const [index,q]of data.questions.filter(q=>q.type!=='self').entries()){
    await p.locator('.practice-navigation select').selectOption(q.id);
    if(q.type==='numeric'){
     await answer(p,q,'Infinity');await submit(p);assert.equal(await field(p).locator('input').getAttribute('aria-invalid'),'true');
     if(q.absoluteTolerance){await answer(p,q,q.answer+q.absoluteTolerance*.5);await submit(p);assert.equal(await field(p).locator('.practice-feedback').getAttribute('data-result'),'correct');await answer(p,q,q.answer+q.absoluteTolerance*2);await submit(p);assert.equal(await field(p).locator('.practice-feedback').getAttribute('data-result'),'incorrect')}
    }
    await answer(p,q,index?String(q.answer):wrong(q));await submit(p);if(index)correct++;
   }
   await scores(p,correct,1,0);const saved=await state(p,data);await p.reload();await p.locator('[data-practice-ready]').waitFor();assert.deepEqual(await state(p,data),saved);await nav(p,3).click();assert.equal((await state(p,data)).attempts.length,1);
   await nav(p,2).click();assert.equal(await field(p).getAttribute('data-question'),data.questions[0].id);await p.locator('form .practice-actions button').nth(1).click();await answer(p,data.questions[0],data.questions[0].answer);await submit(p);await scores(p,5,0,0);await nav(p,2).click();
   const self=data.questions.find(q=>q.type==='self');await p.locator('.practice-navigation select').selectOption(self.id);await field(p).locator('textarea').fill('เหตุผล/โค้ดที่ประเมินเอง ไม่ใช่การรัน Python');await submit(p);assert.equal(await field(p).locator('.practice-feedback li').count(),3);await field(p).locator('[data-rating=revisit]').click();await scores(p,5,0,0);await nav(p,3).click();assert.equal((await state(p,data)).attempts.length,2);
   for(const [width,layout,theme,language]of[[1440,'modern','dark','en'],[390,'classic','light','th'],[320,'modern','light','th']]){
    await p.setViewportSize({width,height:1000});await p.evaluate(v=>LearningPreferences.update(v),{layout,theme,language});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,id+'/'+width);assert.equal(await p.locator('[data-i18n]').evaluateAll(ns=>ns.some(n=>n.textContent===n.dataset.i18n)),false);
    if(process.env.PRACTICE_SCREENSHOTS){fs.mkdirSync(process.env.PRACTICE_SCREENSHOTS,{recursive:true});await p.locator('#practice-mode').evaluate(n=>n.scrollIntoView({behavior:'instant',block:'start'}));await p.screenshot({path:path.join(process.env.PRACTICE_SCREENSHOTS,id+'-'+width+'.png')})}
   }
   await p.close(); // Reopening a tab retains the actual current question/attempts.
   p=await context.newPage();await p.goto(address(data));await p.locator('[data-practice-ready]').waitFor();assert.equal((await state(p,data)).current,self.id);assert.equal((await state(p,data)).attempts.length,2);
  }
  // Real cross-tab events on a new all-conceptual set; keep a locally focused radio draft.
  {
   const data=sets.find(q=>q.lesson==='oop-python-inheritance-mro'),a=await context.newPage();await a.goto(address(data));await a.locator('[data-practice-ready]').waitFor();await nav(a,4).click();await a.locator('.practice-navigation select').selectOption(data.questions[1].id);await answer(a,data.questions[1],data.questions[1].answer);const focused=await field(a).locator('input:checked').elementHandle();
   const b=await context.newPage();await b.goto(address(data));await b.locator('[data-practice-ready]').waitFor();await b.locator('.practice-navigation select').selectOption(data.questions[0].id);await answer(b,data.questions[0],data.questions[0].answer);await submit(b);
   await a.waitForFunction(()=>document.querySelector('.practice-score').textContent.includes('1/5'));assert.equal(await field(a).getAttribute('data-question'),data.questions[1].id);assert.equal(await focused.evaluate(n=>n===document.activeElement),true);assert.equal(await field(a).locator('input:checked').inputValue(),data.questions[1].answer);await a.close();await b.close();
  }
  // Static fallbacks for one new lesson from each stage, without executing page JavaScript.
  const fallback=await browser.newContext({javaScriptEnabled:false});
  try{for(const id of representatives){const data=sets.find(q=>q.lesson===id),page=await fallback.newPage();await page.goto(address(data));assert.equal(await page.locator('.practice-fallback > ol > li').count(),6);assert.equal(await page.locator('.practice-session').count(),0);const details=page.locator('.practice-fallback details').first();await details.locator('summary').click();assert.equal(await details.getAttribute('open'),'');await page.close()}}finally{await fallback.close()}
  // All four original pilot payloads remain byte-identical after working in new sets.
  const check=await context.newPage();await check.goto(base);
  assert.deepEqual(await check.evaluate(keys=>Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)])),Object.keys(seeded)),seeded);
  const legacy=await check.evaluate(()=>({study:JSON.parse(localStorage.getItem('skyce-learning-study')),bookmarks:JSON.parse(localStorage.getItem('skyce-learning-bookmarks')),quiz:JSON.parse(localStorage.getItem('python-final-week10-15-v1'))}));assert.ok(legacy.study.completed.includes('oop-python-stack'));assert.deepEqual(legacy.study.positions['artificial-intelligence-final-knn'],{anchor:'#algorithm',scroll:500,sectionOffset:-140});assert.deepEqual(legacy.bookmarks,['oop-python-stack']);assert.deepEqual(legacy.quiz.answers,{'1':'ก'});
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
 }catch(error){console.error(JSON.stringify({url:p.url(),errors,failures}));throw error}finally{await context.close();await browser.close()}
 console.log('PASS: 21 new lesson runtime/content smokes; four-stage numeric/retry/review/self/refresh/viewport and no-JS checks; conceptual cross-tab/radio focus; old pilot attempts and legacy study/bookmark/quiz data preserved; no console/network/overflow issues');
})().catch(e=>{console.error(e);process.exit(1)});
