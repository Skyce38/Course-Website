/* Optional isolated Chrome UI regression; no persistent personal browser profile. */
const fs=require('fs'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8793/Course-Website/',catalog=require('../catalog.json');
const lessons=catalog.resources.filter(r=>r.generatedLesson===1&&r.reader);
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}),context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];
 context.setDefaultTimeout(10000);
 context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())})});
 await context.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));
 await context.addInitScript(({origin})=>{if(location.origin===origin&&!localStorage.getItem('modern-test-seeded')){localStorage.setItem('skyce-learning-preferences',JSON.stringify({layout:'modern',theme:'light',preset:'ocean',language:'en'}));localStorage.setItem('modern-test-seeded','1')}},{origin:new URL(base).origin});
 await page.goto(base);await page.locator('.course-card').first().waitFor();assert.equal(await page.locator('.course-card').count(),6);
 assert.equal(await page.locator('.modern-practice-entry .practice-destination').count(),2);
 for(const course of catalog.courses){await page.goto(base+'#course/'+course.id);await page.locator('.course-header').waitFor();const count=lessons.filter(r=>r.course===course.id).length;
  assert.equal(await page.locator('.practice-destination').count(),count);if(count){await page.locator('[data-course-practice]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#practice-entry details').getAttribute('open'),'');assert.equal(await page.evaluate(()=>document.activeElement.id),'practice-entry-heading');assert.equal(await page.locator('.practice-destination a').count(),count*2)}
 }
 await page.locator('[data-home-section="course-collection"]').focus();await page.keyboard.press('Enter');await page.locator('#course-collection').waitFor();assert.equal(await page.evaluate(()=>document.activeElement.id),'course-collection');
 await page.locator('[data-home-section="recent-reading"]').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'recent-reading');
 // Every new entry points to an actual reader/anchor from the existing catalog.
 for(const r of lessons){const html=fs.readFileSync(require('path').resolve(__dirname,'..',r.reader),'utf8');for(const id of ['practice-mode','exam-mode'])assert.ok(html.includes('id="'+id+'"'),r.id)}
 await page.goto(base+'#course/artificial-intelligence');await page.locator('[data-course-practice]').click();await page.locator('.practice-destination a[href$="#practice-mode"]').first().click();await page.locator('[data-practice-ready=true]').waitFor();
 assert.ok(page.url().endsWith('#practice-mode'));assert.ok(await page.locator('#practice-mode').isVisible());
 const originalTrack=page.locator('#practice-mode .practice-position-track');assert.equal(await originalTrack.getAttribute('max'),'6');assert.equal(await originalTrack.getAttribute('value'),'1');
 await page.locator('#practice-mode .practice-navigation select').selectOption({index:1});assert.equal(await originalTrack.getAttribute('value'),'2');
 const submit=page.locator('#practice-mode button[type=submit]'),identity=await submit.elementHandle(),track=await originalTrack.elementHandle();await submit.focus();
 for(const language of ['th','en'])for(const theme of ['dark','light']){await page.evaluate(v=>LearningPreferences.update(v),{language,theme});assert.equal(await identity.evaluate(n=>n===document.activeElement),true);assert.equal(await track.evaluate(n=>n.isConnected&&n.value===2),true)}
 assert.equal(await originalTrack.getAttribute('aria-valuetext'),await page.locator('#practice-mode .practice-position').innerText());
 await page.locator('#exam-select-mode').selectOption('mock');await page.locator('#exam-select-count').selectOption('full');await page.locator('#exam-mode > button').click();
 await page.locator('.exam-run .practice-navigation select').selectOption({index:4});assert.equal(await page.locator('.exam-run .practice-position-track').getAttribute('max'),'30');assert.equal(await page.locator('.exam-run .practice-position-track').getAttribute('value'),'5');
 await page.evaluate(()=>LearningPreferences.update({layout:'classic'}));assert.equal(await originalTrack.isVisible(),false);await page.evaluate(()=>LearningPreferences.update({layout:'modern'}));assert.equal(await track.evaluate(n=>n.isConnected&&n.value===2),true);
 // Canvas, reader and interactive text retain readable selected-palette contrast.
 for(const preset of ['forest','ocean','lavender','sakura','sunset','midnight','custom'])for(const theme of ['light','dark'])for(const width of [1440,1024,390,320]){
  await page.setViewportSize({width,height:1000});await page.evaluate(v=>LearningPreferences.update(v),{preset,theme,custom:{primary:'#11658c',background:'#f6fafc',surface:'#ffffff'}});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,preset+'/'+theme+'/'+width);
  const ratios=await page.evaluate(()=>{
   const ctx=document.createElement('canvas').getContext('2d'),rgb=color=>{ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3).map(v=>v/255)},lum=c=>rgb(c).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0),contrast=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
   const body=getComputedStyle(document.body),root=getComputedStyle(document.documentElement);return [contrast(body.color,body.backgroundColor),contrast(root.getPropertyValue('--muted'),body.backgroundColor),contrast(root.getPropertyValue('--accent'),root.getPropertyValue('--paper'))];
  });assert.ok(ratios.every(r=>r>=4.5-.01),JSON.stringify({preset,theme,width,ratios}));
 }
 for(const width of [1440,1024,390,320]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>LearningPreferences.update({font:22,width:'narrow'}));assert.equal(await page.locator('.prose').evaluate(n=>getComputedStyle(n).fontSize),'22px');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false)}
 assert.deepEqual(errors,[]);await context.close();await browser.close();console.log('PASS: six real courses/25 practice destinations, keyboard section navigation, original/exam position indicators and stable focus/DOM across modes; Classic hidden-state compatibility; 7 palettes × 2 modes × 4 widths, selected-palette contrast and 22px narrow readers; no overflow/runtime/asset errors');
})().catch(e=>{console.error(e.stack);process.exit(1)});
