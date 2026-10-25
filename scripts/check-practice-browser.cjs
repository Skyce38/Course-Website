/* Optional Playwright browser regression. Serve this checkout under /Course-Website/.
 * STUDY_BASE_URL=http://127.0.0.1:8779/Course-Website/ node scripts/check-practice-browser.cjs
 * Use existing Playwright or set PLAYWRIGHT_MODULE to its absolute module path.
 */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8779/Course-Website/';
const files=['oop-python/practice/stack','oop-python/practice/complexity-basic-sorting','artificial-intelligence/practice/final-knn','artificial-intelligence/practice/final-decision-tree'];
const quizzes=files.map(f=>JSON.parse(fs.readFileSync(path.join(__dirname,'../courses',f+'.json'),'utf8')));
const key=data=>'skyce-learning-practice-v1:'+data.lesson;
const url=data=>base+'read/'+files[quizzes.indexOf(data)].replace('/practice/','/')+'.html';
const visible=p=>p.locator('.practice-session fieldset:visible');
let browser,cases=0;
async function context(options={}){
  const c=await browser.newContext({viewport:{width:1440,height:1000},javaScriptEnabled:options.javascript!==false});c.setDefaultTimeout(10000);const errors=[];
  c.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});p.on('request',r=>{if(/learning-(paths|navigation)/.test(r.url()))errors.push('obsolete path request')})});
  await c.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));
  await c.addInitScript(({raw,quizKey,denied,writeDenied,origin})=>{
    if(location.origin!==origin)return;
    if(!sessionStorage.getItem('practice-test-seeded')){
      localStorage.setItem('skyce-learning-study',JSON.stringify({recent:[],completed:['oop-python-linked-list'],positions:{'oop-python-linked-list':{scroll:500,anchor:'#examples',sectionOffset:-140}}}));
      localStorage.setItem('skyce-learning-bookmarks',JSON.stringify(['oop-python-linked-list']));
      localStorage.setItem('python-final-week10-15-v1','{"read":[],"answers":{"1":"ก"},"checklist":[]}');
      if(raw!==undefined)localStorage.setItem(quizKey,raw);
      sessionStorage.setItem('practice-test-seeded','1');
    }
    if(denied)Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError')}});
    else if(writeDenied)Storage.prototype.setItem=function(){throw new DOMException('Denied','QuotaExceededError')};
  },{raw:options.raw,quizKey:key(quizzes[0]),denied:options.denied,writeDenied:options.writeDenied,origin:new URL(base).origin});
  return {c,errors,close:async()=>{assert.deepEqual(errors,[]);await c.close();cases++}};
}
async function open(c,data){const p=await c.newPage();await p.goto(url(data));await p.locator('[data-practice-ready=true]').waitFor();return p}
async function jump(p,id){await p.locator('.practice-navigation select').selectOption(id)}
async function answer(p,q,value){if(q.type==='choice')await visible(p).locator('input[value="'+value+'"]').check();else await visible(p).locator('input[type=text]').fill(String(value))}
async function submit(p){await p.locator('.practice-actions button[type=submit]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('button[type=submit]').evaluate(n=>n===document.activeElement),true,'submit focus retained')}
async function state(p,data){return p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(data))}
async function score(p,expected){assert.equal(await p.locator('.practice-score').innerText(),await p.evaluate(v=>LearningI18n.t('practiceScore',v),expected))}
(async()=>{
  browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',headless:true});
  try{
    for(const [i,data]of quizzes.entries()){
      const s=await context(),p=await open(s.c,data);await p.evaluate(v=>LearningPreferences.update(v),{layout:i%2?'modern':'classic',language:i%2?'en':'th',theme:i%2?'dark':'light'});
      const first=data.questions[0],wrong=first.choices.find(c=>c.id!==first.answer).id;await answer(p,first,wrong);await submit(p);
      assert.equal(await visible(p).locator('.practice-feedback strong').innerText(),await p.evaluate(()=>LearningI18n.t('practiceIncorrect')));
      for(const q of data.questions.slice(1).filter(q=>q.type!=='self')){
        await jump(p,q.id);
        if(q.type==='numeric'){
          await answer(p,q,'NaN');await submit(p);assert.equal(await visible(p).locator('input').getAttribute('aria-invalid'),'true');
          await answer(p,q,q.answer);const input=visible(p).locator('input');await input.press('Enter');assert.equal(await input.evaluate(n=>n===document.activeElement),true,'Enter on numeric input retains focus');
        }else{await answer(p,q,q.answer);await submit(p)}
      }
      await score(p,{correct:4,total:5,incorrect:1,unanswered:0});
      const before=await state(p,data);await p.reload();await p.locator('[data-practice-ready=true]').waitFor();assert.deepEqual(await state(p,data),before);assert.equal(await visible(p).getAttribute('data-question'),before.current);
      const finish=p.locator('.practice-session > .practice-actions button').nth(3);await finish.click();assert.equal((await state(p,data)).attempts.length,1);await finish.press('Enter');assert.equal((await state(p,data)).attempts.length,1,'no duplicate save');
      const review=p.locator('.practice-session > .practice-actions button').nth(2);await review.click();assert.deepEqual((await state(p,data)).review,[first.id]);assert.equal(await visible(p).getAttribute('data-question'),first.id);
      await p.locator('form .practice-actions button').nth(1).click();assert.equal(await visible(p).getAttribute('data-question'),first.id,'retry stays in frozen review set');await answer(p,first,first.answer);await submit(p);await score(p,{correct:5,total:5,incorrect:0,unanswered:0});await finish.click();assert.equal((await state(p,data)).attempts.length,2);await review.click();
      const self=data.questions.find(q=>q.type==='self');await jump(p,self.id);await visible(p).locator('textarea').fill('คำอธิบายและ <script> ไม่ถูกเรียกใช้');await submit(p);assert.equal(await visible(p).locator('.practice-feedback ul li').count(),3);await visible(p).locator('[data-rating=understood]').click();assert.equal(await visible(p).locator('[data-rating=understood]').getAttribute('aria-pressed'),'true');await score(p,{correct:5,total:5,incorrect:0,unanswered:0});
      for(const width of [1440,390,320]){await p.setViewportSize({width,height:1000});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,data.lesson+'/'+width);assert.equal(await p.locator('[data-i18n]').evaluateAll(ns=>ns.some(n=>n.textContent===n.dataset.i18n)),false)}
      if(process.env.PRACTICE_SCREENSHOTS){fs.mkdirSync(process.env.PRACTICE_SCREENSHOTS,{recursive:true});await p.locator('.practice-mode').screenshot({path:path.join(process.env.PRACTICE_SCREENSHOTS,data.lesson+'-320.png')})}
      await p.close();const reopen=await open(s.c,data);assert.equal(await visible(reopen).getAttribute('data-question'),self.id);assert.equal((await state(reopen,data)).attempts.length,2);
      await reopen.locator('.practice-session > .practice-actions button').nth(4).click();await score(reopen,{correct:0,total:5,incorrect:0,unanswered:5});assert.equal((await state(reopen,data)).attempts.length,2);
      const preserved=await reopen.evaluate(()=>({bookmarks:JSON.parse(localStorage.getItem('skyce-learning-bookmarks')),study:JSON.parse(localStorage.getItem('skyce-learning-study')),legacy:JSON.parse(localStorage.getItem('python-final-week10-15-v1'))}));assert.deepEqual(preserved.bookmarks,['oop-python-linked-list']);assert.ok(preserved.study.completed.includes('oop-python-linked-list'));assert.deepEqual(preserved.study.positions['oop-python-linked-list'],{scroll:500,anchor:'#examples',sectionOffset:-140});assert.deepEqual(preserved.legacy,{read:[],answers:{1:'ก'},checklist:[]});await s.close();
    }
    // Refresh safely recovers absent, malformed, non-object, stale and forged data.
    for(const raw of [undefined,'{','[]','null',JSON.stringify({version:1,revision:0,responses:{},attempts:[]}),JSON.stringify({version:1,revision:1,responses:{'s-lifo':{draft:'a',submitted:true,correct:true}},score:999})]){
      const s=await context({raw}),p=await open(s.c,quizzes[0]);await score(p,{correct:0,total:5,incorrect:raw?.includes('999')?1:0,unanswered:raw?.includes('999')?4:5});await s.close();
    }
    for(const options of [{denied:true},{writeDenied:true}]){
      const s=await context(options),p=await open(s.c,quizzes[0]),q=quizzes[0].questions[0];await answer(p,q,q.answer);await submit(p);await score(p,{correct:1,total:5,incorrect:0,unanswered:4});assert.equal(await p.locator('.practice-warning').isVisible(),true);await jump(p,quizzes[0].questions[1].id);await jump(p,q.id);assert.equal(await visible(p).locator('input:checked').inputValue(),q.answer);await s.close();
    }
    // Real same-origin storage events, while another tab is actively editing a numeric answer.
    {
      const s=await context(),data=quizzes[0],a=await open(s.c,data),numeric=data.questions.find(q=>q.type==='numeric');await jump(a,numeric.id);await answer(a,numeric,'14');await a.locator('.practice-session > .practice-actions button').nth(3).press('Enter');await visible(a).locator('input').focus();const oldInput=await visible(a).locator('input').elementHandle();
      const b=await open(s.c,data),q=data.questions[0];await jump(b,q.id);await answer(b,q,q.answer);await submit(b);
      await a.waitForFunction(()=>document.querySelector('.practice-score').textContent.includes('1/5'));assert.equal(await a.locator('.practice-message').innerText(),await a.evaluate(()=>LearningI18n.t('practiceOtherTab')));assert.equal(await visible(a).getAttribute('data-question'),numeric.id);assert.equal(await oldInput.evaluate(n=>n===document.activeElement),true);assert.equal(await visible(a).locator('input').inputValue(),'14');
      await b.evaluate(k=>localStorage.setItem(k,JSON.stringify({version:1,revision:2})),key(data));await a.waitForFunction(()=>document.querySelector('.practice-message').textContent.includes('เปลี่ยน'));await visible(a).locator('input').press('Enter');assert.equal((await state(a,data)).revision,2,'older tab must not overwrite newer metadata revision');await s.close();
    }
    // UI/theme changes retain the current input and selection; keyboard navigation has boundaries.
    {
      const s=await context(),p=await open(s.c,quizzes[0]),q=quizzes[0].questions[0];await answer(p,q,q.answer);await submit(p);
      const button=await p.locator('button[type=submit]').elementHandle();
      for(const layout of ['classic','modern'])for(const [theme,language]of[['light','th'],['dark','en']])for(const width of [1440,390,320]){await p.setViewportSize({width,height:1000});await p.evaluate(v=>LearningPreferences.update(v),{layout,theme,language});assert.equal(await button.evaluate(n=>n===document.activeElement),true);assert.equal(await visible(p).locator('input:checked').inputValue(),q.answer);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false)}
      for(const preset of ['forest','ocean','lavender','sakura','sunset','midnight','custom'])for(const theme of ['light','dark'])await p.evaluate(v=>LearningPreferences.update(v),{preset,theme});
      const prev=p.locator('.practice-session > .practice-actions button').nth(0);await prev.focus();await p.keyboard.press('Enter');assert.equal(await prev.getAttribute('aria-disabled'),'true');assert.equal(await prev.evaluate(n=>n===document.activeElement),true);await p.keyboard.press('Tab');assert.equal(await p.locator('.practice-session > .practice-actions button').nth(1).evaluate(n=>n===document.activeElement),true);await s.close();
    }
    {
      const s=await context({javascript:false});for(const data of quizzes){const p=await s.c.newPage();await p.goto(url(data));assert.equal(await p.locator('.practice-fallback > ol > li').count(),6);assert.equal(await p.locator('.practice-session').count(),0);const details=p.locator('.practice-fallback details').first();await details.locator('summary').click();assert.equal(await details.getAttribute('open'),'');await p.close()}await s.close();
    }
  }finally{await browser.close()}
  console.log(`PASS: ${cases} practice browser sessions; four pilots/scoring/retry/review/self-assessment/history, refresh/reopen, malformed/stale state, real cross-tab updates, denied storage, focus, translations/themes/1440/390/320 and no-JS fallback`);
})().catch(e=>{console.error(e);process.exit(1)});
