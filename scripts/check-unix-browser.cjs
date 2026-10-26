/* Existing Playwright/Chrome only; isolated profiles, never personal study data. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),C=require('../assets/practice-contract.js'),I=require('../assets/insights-contract.js'),manifest=require('../assets/insights-banks.json');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8797/Course-Website/',lessons=manifest.lessons.filter(l=>l.course==='unix-tools'),artifacts=process.env.STUDY_SCREENSHOTS;
const practice=l=>({...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))});
const field=(p,scope)=>p.locator(scope+' fieldset:visible'),jump=(p,scope,id)=>p.locator(scope+' .practice-navigation select').selectOption(id);
async function answer(p,scope,q,value=q.answer){const f=field(p,scope);if(q.type==='choice')await f.locator('input[value="'+value+'"]').check();else if(q.type==='numeric')await f.locator('input').fill(String(value));else await f.locator('textarea').fill('อธิบายเหตุผล สมมติฐาน และกรณีขอบตามแนวประเมิน ไม่ใช่ข้อสอบทางการ');const submit=p.locator(scope+' button[type=submit]');await submit.focus();await p.keyboard.press('Enter');assert.equal(await submit.evaluate(n=>n===document.activeElement),true,'Submit keeps focus');}
async function score(p,scope,correct,incorrect,total){assert.equal(await p.locator(scope+' .practice-score').innerText(),await p.evaluate(v=>LearningI18n.t('practiceScore',v),{correct,incorrect,unanswered:total-correct-incorrect,total}));}
async function snap(p,name){if(artifacts){fs.mkdirSync(artifacts,{recursive:true});await p.screenshot({path:path.join(artifacts,name+'.png')});}}
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}),c=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']}),errors=[];c.setDefaultTimeout(10000);
 c.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});p.on('request',r=>{if(/learning-(paths|navigation)/.test(r.url()))errors.push('Obsolete learning path')});});
 await c.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));
 await c.addInitScript(()=>{if(location.pathname.endsWith('/insights.html')){window.unixInsightsWrites=[];for(const name of ['setItem','removeItem','clear'])Storage.prototype[name]=function(){unixInsightsWrites.push(name);throw Error('Dashboard write attempted');};}});
 const p=await c.newPage();
 for(const [i,l]of lessons.entries()){
  const data=practice(l),width=[1440,1024,390,320][i%4],layout=i%2?'classic':'modern',theme=i%3?'light':'dark',language=i%2?'th':'en';await p.setViewportSize({width,height:1000});await p.goto(base+l.reader);await p.locator('[data-practice-ready=true]').waitFor();
  await p.evaluate(v=>LearningPreferences.update(v),{layout,theme,language,preset:['forest','ocean','lavender','sakura','sunset','midnight'][i%6]});
  assert.ok((await p.title()).includes('FINAL'));assert.ok((await p.locator('.prose').innerText()).length>1000);assert.equal(await p.locator('#practice-mode fieldset').count(),6);assert.equal(await p.locator('.exam-fallback>ol>li').count(),30);assert.equal(await p.locator('.katex-error').count(),0);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,l.id+'/'+width);
  // Actual linked anchors and all rendered raw payloads are checked for all twelve readers.
  for(const t of l.bank.topics)assert.equal(await p.locator('[id="'+t.id+'"]').count(),1);
  for(const q of data.questions){await jump(p,'#practice-mode',q.id);await answer(p,'#practice-mode',q);if(q.type!=='self')assert.equal(await field(p,'#practice-mode').locator('.practice-feedback').getAttribute('data-result'),'correct');}
  await score(p,'#practice-mode',5,0,5);const self=data.questions.find(q=>q.type==='self');await field(p,'#practice-mode').locator('[data-rating=revisit]').click();await score(p,'#practice-mode',5,0,5);
  const key=I.prefix.practice+l.id,saved=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);assert.equal(C.summary(data,saved.responses).correct,5);
  await p.reload();await p.locator('[data-practice-ready=true]').waitFor();await score(p,'#practice-mode',5,0,5);
  await p.locator('#exam-select-mode').selectOption('mock');await p.locator('#exam-select-count').selectOption('full');await p.locator('#exam-mode > button').click();await p.locator('.exam-run fieldset').first().waitFor({state:'attached'});assert.equal(await p.locator('.exam-run fieldset').count(),30);
  const automatic=l.bank.data.questions.filter(q=>q.type!=='self'),first=automatic[0],wrong=first.type==='choice'?first.choices.find(o=>o.id!==first.answer).id:first.answer+1;
  await jump(p,'.exam-run',first.id);await answer(p,'.exam-run',first,wrong);assert.equal(await field(p,'.exam-run').locator('.practice-feedback').getAttribute('data-result'),'incorrect');
  for(const q of automatic.slice(1)){await jump(p,'.exam-run',q.id);await answer(p,'.exam-run',q);}
  await score(p,'.exam-run',24,1,25);await p.locator('.exam-run .practice-session > .practice-actions button').nth(3).click();
  await p.locator('.exam-run .practice-session > .practice-actions button').nth(2).click();assert.equal(await field(p,'.exam-run').getAttribute('data-question'),first.id);await p.locator('.exam-run form .practice-actions button').nth(1).click();await answer(p,'.exam-run',first);await score(p,'.exam-run',25,0,25);
  await p.locator('.exam-run .practice-session > .practice-actions button').nth(2).click();
  await p.locator('.code-copy').first().click();assert.equal((await p.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),await p.locator('.code-viewer').first().locator('.line-source').evaluateAll(ns=>ns.map(n=>n.textContent).join('\n')));
  if([0,2,3].includes(i)){await p.evaluate(()=>scrollTo(0,0));await snap(p,'unix-'+layout+'-'+theme+'-'+width);}
 }
 // Real course/search entry and accessible mobile menu/TOC; no new learning-path hooks.
 await p.setViewportSize({width:390,height:1000});await p.goto(base+'#course/unix-tools/summaries');await p.locator('.course-header').waitFor();await p.evaluate(()=>LearningPreferences.update({layout:'modern'}));assert.equal(await p.locator('.practice-destination').count(),12);await p.locator('[data-course-practice]').click();assert.equal(await p.locator('#practice-entry details').getAttribute('open'),'');await snap(p,'unix-course-390');
 await p.locator('#search').fill('FINAL 10');assert.ok(await p.locator('a[href*="final-arrays-statistics.html"]').count()>0);await p.locator('#clear-search').click();
 await p.goto(base+lessons[9].reader);await p.locator('#menu').click();const toc=p.locator('.reader-toc a[href="#population-formulas"]');await toc.focus();await p.keyboard.press('Enter');await p.waitForFunction(()=>location.hash==='#population-formulas');assert.equal(await p.locator('.katex-mathml math').count()>0,true);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await snap(p,'unix-math-390');
 // Reading controls: DOM/focus/state survives immediate palette/mode changes.
 const complete=p.locator('#study-reader-actions .study-complete');await complete.click();await complete.focus();const identity=await complete.elementHandle();for(const theme of ['dark','light','dark']){await p.evaluate(theme=>LearningPreferences.update({theme}),theme);assert.equal(await identity.evaluate(n=>n===document.activeElement),true);assert.equal(await complete.getAttribute('aria-pressed'),'true');}
 await p.evaluate(()=>LearningStudy.flush());await p.reload();assert.equal(await complete.getAttribute('aria-pressed'),'true');
 // Unix is a real third course; readonly dashboard cannot alter any seeded attempts.
 const before=await p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('skyce-learning-practice-v1:')).map(k=>[k,localStorage.getItem(k)])));
 await p.goto(base+'insights.html');await p.locator('[data-metric=accuracy]').waitFor();assert.equal(await p.locator('#insights-course option[value="unix-tools"]').count(),1);await p.locator('#insights-course').selectOption('unix-tools');assert.equal(await p.locator('[data-metric=lessons]').innerText(),'12');assert.equal(await p.locator('.insights-course-bar').count(),1);assert.equal(await p.locator('.insights-course-bar').getAttribute('data-course'),'unix-tools');
 for(const layout of ['classic','modern'])for(const language of ['th','en']){await p.evaluate(v=>LearningPreferences.update(v),{layout,language});assert.equal(await p.locator('#insights-course').inputValue(),'unix-tools');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);}
 await snap(p,'unix-insights-390');assert.deepEqual(await p.evaluate(()=>unixInsightsWrites),[]);assert.deepEqual(await p.evaluate(keys=>Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)])),Object.keys(before)),before);
 const nojs=await browser.newContext({javaScriptEnabled:false}),staticPage=await nojs.newPage();for(const l of lessons){await staticPage.goto(base+l.reader);assert.equal(await staticPage.locator('.practice-fallback>ol>li').count(),6);assert.equal(await staticPage.locator('.exam-fallback>ol>li').count(),30);}await nojs.close();
 assert.deepEqual(errors,[]);await c.close();await browser.close();console.log('PASS:12 Unix readers,72 Practice answers and300 Exam answers/review/retry/scores,refresh; Classic/Modern/TH-EN/Light-Dark/6palettes/1440-1024-390-320; code copy, real TOC/math/course/search,completion/focus and Unix Insights readonly filters; all12 no-JS fallbacks; no app/asset errors');
})().catch(e=>{console.error(e.stack);process.exit(1)});

