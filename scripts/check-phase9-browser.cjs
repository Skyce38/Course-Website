/* Isolated Chrome profiles only. Seed pre-correction data; never touch user storage. */
const fs=require('fs'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const C=require('../assets/practice-contract.js'),base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8792/Course-Website/';
const pilots=[['oop-python','complexity-basic-sorting'],['artificial-intelligence','final-decision-tree'],['artificial-intelligence','ai-foundations-agents']];
const contexts=pilots.map(([course,slug])=>({course,slug,extra:require(`../courses/${course}/exam/${slug}.json`)}));
const storage={};
for(const {extra} of contexts){
 const old=extra.history[0],responses=Object.fromEntries(old.data.questions.map(q=>[q.id,{draft:q.type==='self'?'อธิบายเดิม':String(q.answer),submitted:true,rating:q.type==='self'?'understood':null}]));
 const state={...C.clean(old.data,null),responses,attempts:[{at:1700000000000,responses:structuredClone(responses)}],recorded:true},token='before-correction-01';
 storage['skyce-learning-exam-config-v1:'+old.data.lesson]=JSON.stringify({version:1,revision:1,current:token,sessions:[{token,mode:'mock',topic:'all',count:'full',ids:old.data.questions.map(q=>q.id)}]});
 storage['skyce-learning-exam-v1:'+old.data.lesson+':'+token]=JSON.stringify(state);
}
storage['skyce-learning-study']=JSON.stringify({recent:[],completed:['oop-python-stack'],positions:{'oop-python-queue':{anchor:'#circular',scroll:500,sectionOffset:-50}}});
storage['skyce-learning-bookmarks']='["oop-python-stack"]';
storage['python-final-week10-15-v1']='{"answers":{"1":"ก"}}';
const url=p=>base+`read/${p.course}/${p.slug}.html`,configKey=id=>'skyce-learning-exam-config-v1:'+id;
async function start(page){await page.locator('#exam-select-mode').selectOption('mock');await page.locator('#exam-select-count').selectOption('full');await page.locator('#exam-mode > button').click();await page.waitForFunction(()=>document.querySelector('.exam-run')?.querySelectorAll('fieldset').length===30)}
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}),errors=[],screens=process.env.PHASE9_SCREENSHOTS;
 const context=await browser.newContext({viewport:{width:1440,height:1000}});context.setDefaultTimeout(10000);
 context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())})});
 await context.route('https://api.github.com/**',route=>route.fulfill({json:{tree:[],truncated:false}}));
 await context.addInitScript(({origin,storage})=>{if(location.origin===origin&&!localStorage.getItem('phase9-seeded')){for(const [k,v]of Object.entries(storage))localStorage.setItem(k,v);localStorage.setItem('phase9-seeded','1')}},{origin:new URL(base).origin,storage});
 const page=await context.newPage();
 for(const [i,pilot]of contexts.entries()){
  const id=pilot.extra.lesson,key=configKey(id),oldRun='skyce-learning-exam-v1:'+id+':before-correction-01';
  await page.goto(url(pilot));await page.locator('.exam-run').waitFor();
  assert.ok((await page.title()).includes('Course')||(await page.title()).includes('Study')||(await page.title()).length>10);
  assert.equal(await page.locator('.exam-run fieldset').count(),30);assert.ok(await page.locator('#exam-mode > .practice-note').last().isVisible());
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),oldRun),storage[oldRun],'Read-only load preserves old attempts exactly');
  const retired=pilot.extra.history[0].data.questions.find(q=>!pilot.extra.questions.some(n=>n.id===q.id)&&!q.id.startsWith('s-')&&q.id.includes('-exam-'));
  assert.ok(retired);await page.locator('.exam-run .practice-navigation select').selectOption(retired.id);
  assert.equal(await page.locator('.exam-run fieldset:visible legend').innerText(),retired.prompt);
  for(const [width,layout,language,theme]of [[1440,'classic','th','light'],[390,'modern','en','dark'],[320,'modern','th','dark']]){
   await page.setViewportSize({width,height:1000});await page.evaluate(v=>LearningPreferences.update(v),{layout,language,theme,preset:i===1?'lavender':'ocean'});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'No page overflow');
   assert.equal(await page.locator('.exam-run fieldset:visible legend').innerText(),retired.prompt,'Theme/language preserve question');
   assert.ok((await page.locator('#exam-mode > .practice-note').last().innerText()).length>30);
   if(screens){fs.mkdirSync(screens,{recursive:true});await page.locator('#exam-mode > .practice-note').last().scrollIntoViewIfNeeded();await page.screenshot({path:screens+'/'+pilot.slug+'-'+width+'.png'})}
  }
  const before=await page.evaluate(k=>localStorage.getItem(k),oldRun);await start(page);
  assert.equal(await page.locator('.exam-run fieldset[data-question="'+retired.id+'"]').count(),0);
  assert.equal(await page.locator('.exam-run fieldset[data-question="'+retired.id+'-r2"]').count(),1);
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),oldRun),before);
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),'skyce-learning-exam-config-history-v1:'+id+':r1'),storage[key],'Immutable raw config backup');
  const config=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);assert.equal(config.revision,2);assert.equal(config.sessions[0].revision,1);
  assert.equal(await page.locator('.exam-run .practice-score').innerText(),await page.evaluate(()=>LearningI18n.t('practiceScore',{correct:0,incorrect:0,unanswered:25,self:0,total:25})));
  const target=pilot.extra.questions.find(q=>q.id===retired.id+'-r2');await page.locator('.exam-run .practice-navigation select').selectOption(target.id);
  const field=page.locator('.exam-run fieldset:visible');if(target.type==='choice')await field.locator('input[value="'+target.answer+'"]').check();else await field.locator('input').fill(String(target.answer));
  const submit=page.locator('.exam-run button[type=submit]');await submit.focus();await page.keyboard.press('Enter');assert.equal(await submit.evaluate(n=>n===document.activeElement),true);
  await page.reload();await page.locator('.exam-run').waitFor();assert.equal(await page.locator('.exam-run fieldset:visible').getAttribute('data-question'),target.id);assert.ok(await page.locator('.exam-run fieldset:visible .practice-feedback').isVisible());
  await page.locator('#exam-select-sessions').selectOption('before-correction-01');assert.equal(await page.locator('.exam-run fieldset:visible legend').innerText(),retired.prompt);
  // More than ten current runs must not evict the pre-correction session/data.
  for(let n=0;n<11;n++)await start(page);
  const retained=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);assert.equal(retained.sessions.length,11);assert.equal(retained.sessions.filter(s=>s.revision===1).length,1);assert.equal(await page.evaluate(k=>localStorage.getItem(k),oldRun),before);
  await page.locator('#exam-select-sessions').selectOption('before-correction-01');
  const reopened=await context.newPage();await reopened.goto(url(pilot));await reopened.locator('.exam-run').waitFor();assert.equal(await reopened.locator('.exam-run fieldset:visible legend').innerText(),retired.prompt);
  await start(reopened);await page.waitForFunction(()=>document.querySelector('#exam-mode > button').getAttribute('aria-disabled')==='true');await reopened.close();
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('skyce-learning-bookmarks')),storage['skyce-learning-bookmarks']);
 assert.equal(await page.evaluate(()=>localStorage.getItem('python-final-week10-15-v1')),storage['python-final-week10-15-v1']);
 const study=await page.evaluate(()=>JSON.parse(localStorage.getItem('skyce-learning-study')));assert.deepEqual(study.completed,['oop-python-stack']);assert.deepEqual(study.positions['oop-python-queue'],JSON.parse(storage['skyce-learning-study']).positions['oop-python-queue']);
 // If saving the migration backup fails, do not overwrite the original config.
 const denied=await browser.newContext();await denied.addInitScript(({storage})=>{for(const [k,v]of Object.entries(storage))localStorage.setItem(k,v);const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('skyce-learning-exam-config-history-v1:'))throw Error('quota fixture');return original.call(this,k,v)}},{storage});
 const blocked=await denied.newPage();blocked.on('pageerror',e=>errors.push(e.message));await blocked.goto(url(contexts[0]));await blocked.locator('.exam-run').waitFor();await start(blocked);assert.equal(await blocked.evaluate(k=>localStorage.getItem(k),configKey(contexts[0].extra.lesson)),storage[configKey(contexts[0].extra.lesson)]);assert.ok(await blocked.locator('#exam-mode > .exam-status').isVisible());await denied.close();
 assert.deepEqual(errors,[]);await context.close();await browser.close();
 console.log('PASS: all 3 pre-correction bank migrations; exact old prompts/keys/attempts/raw backup; 12 new runs retain archives; corrected IDs/fresh scoring/submit focus/refresh/reopen/cross-tab/quota failure; study/bookmarks/legacy quiz preserved; Classic/Modern TH/EN light/dark 1440/390/320, no overflow or console/site errors');
})().catch(e=>{console.error(e.stack);process.exit(1)});
