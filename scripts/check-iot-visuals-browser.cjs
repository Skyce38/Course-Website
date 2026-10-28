/* Optional installed Chrome/Playwright. Fresh contexts only, no personal study storage. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),spec=require('./iot-visuals.json');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8799/Course-Website/',artifacts=process.env.STUDY_SCREENSHOTS,lessons=[...new Set(spec.assets.map(d=>d.lesson))];
async function snap(p,name){if(artifacts){fs.mkdirSync(artifacts,{recursive:true});await p.screenshot({path:path.join(artifacts,name+'.png')});}}
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true}),c=await b.newContext({viewport:{width:1440,height:1000}}),p=await c.newPage(),errors=[];c.setDefaultTimeout(15000);
 const monitor=page=>{page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});page.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push('Failed local request '+r.url())});};monitor(p);c.on('page',monitor);
 await c.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));
 let count=0;
 for(const [i,lesson]of lessons.entries()){
  await p.goto(base+'read/internet-of-things/'+lesson+'.html');await p.locator('#study-reader-actions').waitFor();assert.ok((await p.title()).includes('FINAL'));assert.ok((await p.locator('.prose').innerText()).length>2000);
  const assets=spec.assets.filter(d=>d.lesson===lesson);assert.equal(await p.locator('img[src*="/images/visual-"]').count(),assets.length);
  await p.evaluate(()=>LearningPreferences.update({layout:'modern',theme:'light',preset:'ocean',language:'th'}));
  for(const d of assets){const img=p.locator('img[src$="/'+d.name+'.webp"]');await img.scrollIntoViewIfNeeded();await img.evaluate(n=>n.decode());assert.equal(await img.getAttribute('alt'),d.alt);assert.equal(await img.getAttribute('loading'),'lazy');assert.ok((await img.locator('..').locator('figcaption').innerText()).includes(d.caption));assert.deepEqual(await img.evaluate(n=>[n.naturalWidth,n.naturalHeight]),[d.width,d.height]);if(artifacts)await img.locator('..').screenshot({path:path.join(artifacts,'figure-'+d.number+'.png')});count++;}
  for(const layout of ['classic','modern'])for(const width of [1440,1024,390,320]){
   await p.setViewportSize({width,height:1000});await p.evaluate(v=>LearningPreferences.update(v),{layout,language:width===320?'en':'th',theme:layout==='classic'?'dark':'light'});
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,lesson+'/'+layout+'/'+width);
   for(const d of assets){const box=await p.locator('img[src$="/'+d.name+'.webp"]').boundingBox();assert.ok(box.width<=560.5);assert.ok(32*box.width/560>=14-.05,'Primary diagram labels readable: '+lesson+'/'+width+'/'+box.width);assert.ok(Math.abs(box.height-box.width*d.height/d.width)<1);}
  }
  await p.evaluate(()=>LearningPreferences.update({layout:'modern',language:'th',theme:'light',preset:'ocean'}));
  for(const width of [1440,390]){await p.setViewportSize({width,height:1000});await p.locator('#'+assets[0].section).scrollIntoViewIfNeeded();await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await snap(p,'after-'+(i+1)+'-'+width);}
  // Keyboard access to attribution; image alternatives remain static lesson content in either UI language.
  const link=p.locator('.lesson-figure-source a').first();await link.focus();assert.equal(await link.evaluate(n=>n===document.activeElement),true);await p.keyboard.press('Tab');assert.notEqual(await p.evaluate(()=>document.activeElement.tagName),'BODY');
  await p.emulateMedia({media:'print'});assert.equal(await p.locator('img[src*="/images/visual-"]').first().isVisible(),true);assert.equal(await p.locator('.topbar').isVisible(),false);
  if(artifacts&&[3,7,8].includes(i))await p.pdf({path:path.join(artifacts,'print-'+(i+1)+'.pdf'),format:'A4',margin:{top:'12mm',bottom:'12mm',left:'12mm',right:'12mm'},printBackground:false});
  await p.emulateMedia({media:'screen'});
 }
 assert.equal(count,25);
 // All palettes retain readable text/captions and unchanged image colors, including Custom.
 for(const preset of ['forest','ocean','lavender','sakura','sunset','midnight','custom'])for(const theme of ['light','dark']){await p.evaluate(v=>LearningPreferences.update(v),{preset,theme,custom:{primary:'#7051a1',background:'#fff8f3',surface:'#ffffff'}});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);assert.equal(await p.locator('img[src*="/images/visual-"]').first().evaluate(n=>getComputedStyle(n).filter),'none');}
 await snap(p,'custom-dark-390');
 // Deterministically pause a new image to verify reserved space before/after decoding.
 const hold=spec.assets.find(d=>d.number===10);let release,arrived;const waiting=new Promise(r=>arrived=r),response=new Promise(r=>release=r);
 const holdContext=await b.newContext({viewport:{width:390,height:1000}}),hp=await holdContext.newPage();await holdContext.route('**/'+hold.name+'.webp',async r=>{arrived();await response;await r.continue()});
 await hp.goto(base+'read/internet-of-things/'+hold.lesson+'.html',{waitUntil:'domcontentloaded'});await hp.evaluate(()=>document.fonts.ready);const im=hp.locator('img[src$="/'+hold.name+'.webp"]');await im.scrollIntoViewIfNeeded();await waiting;const before=await im.boundingBox();release();await im.evaluate(n=>n.decode());const after=await im.boundingBox();assert.ok(Math.abs(before.height-after.height)<.5&&Math.abs(before.width-after.width)<.5,'No intrinsic lazy-image layout shift');await holdContext.close();
 const nojs=await b.newContext({javaScriptEnabled:false}),sp=await nojs.newPage();for(const lesson of lessons){await sp.goto(base+'read/internet-of-things/'+lesson+'.html');const img=sp.locator('img[src*="/images/visual-"]').first();await img.scrollIntoViewIfNeeded();assert.ok(await img.evaluate(n=>n.complete&&n.naturalWidth>0));assert.equal(await sp.locator('.practice-fallback>ol>li').count(),6);}await nojs.close();
 assert.deepEqual(errors,[]);await c.close();await b.close();console.log('PASS:25 images/alt/captions/attribution loaded in all9 readers;72 Classic/Modern width cases1440/1024/390/320 and14 palette/mode cases;primary labels>=14px,print/keyboard/no-JS,controlled lazy-image space,no console/asset errors');
})().catch(e=>{console.error(e.stack);process.exit(1)});
