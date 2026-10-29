/* Authoring QA only; existing Chrome/Playwright. All study fixtures use ephemeral contexts. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),spec=require('./ai-oop-visuals.json');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8802/Course-Website/',dir=process.env.STUDY_SCREENSHOTS,errors=[];
const frame=p=>p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
async function shot(p,name){if(dir){fs.mkdirSync(dir,{recursive:true});await p.screenshot({path:path.join(dir,name+'.png')})}}
function monitor(p){p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url())});p.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push('Failed '+r.url()+': '+r.failure()?.errorText)})}
async function fresh(browser,width=1440,layout='modern',js=true){
 const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:js,serviceWorkers:'block'}),p=await context.newPage();context.setDefaultTimeout(20000);monitor(p);
 const cdp=await context.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 if(js)await context.addInitScript(({layout,origin})=>{if(location.origin===origin)localStorage.setItem('skyce-learning-preferences',JSON.stringify({layout,theme:layout==='modern'?'light':'dark',preset:layout==='modern'?'ocean':'forest',language:layout==='modern'?'th':'en',font:17,width:'comfortable'}))},{layout,origin:new URL(base).origin});
 await context.route('https://api.github.com/**',r=>r.fulfill({json:{tree:[],truncated:false}}));return {context,p};
}
const image=(p,d)=>p.locator('img[src$="/'+d.name+'.webp"]');
const url=d=>base+'read/'+d.course+'/'+d.lesson+'.html';
async function surfaces(browser){
 const {context,p}=await fresh(browser),lessons=[...new Set(spec.assets.map(d=>d.resourceId))];let images=0,cases=0;
 for(const id of lessons){
  const ds=spec.assets.filter(d=>d.resourceId===id);await p.setViewportSize({width:1440,height:1000});await p.goto(url(ds[0]));await p.locator('#study-reader-actions').waitFor();
  assert.equal(await p.locator('link[href*="ai-oop-visuals.css?v=phase15-visual-1"]').count(),1);assert.ok((await p.locator('.prose').innerText()).length>2000);assert.ok((await p.title()).length>10);
  assert.equal(await p.locator('img[src*="/images/visual15-"]').count(),2);
  for(const d of ds){const im=image(p,d);await im.scrollIntoViewIfNeeded();await im.evaluate(n=>n.decode());assert.deepEqual(await im.evaluate(n=>[n.naturalWidth,n.naturalHeight]),[d.width,d.height]);assert.equal(await im.getAttribute('alt'),d.alt);assert.equal(await im.getAttribute('loading'),'lazy');assert.ok((await im.locator('..').locator('figcaption').innerText()).includes(d.caption));
   const section=await im.evaluate(n=>{let id;for(const h of document.querySelectorAll('.prose h2,.prose h3'))if(h.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)id=h.id;return id});assert.equal(section,d.section);
   if(dir)await im.locator('..').screenshot({path:path.join(dir,'figure-'+d.number+'.png')});images++;
  }
  for(const layout of ['classic','modern'])for(const width of [1440,1024,390,320]){
   await p.setViewportSize({width,height:1000});await p.evaluate(v=>LearningPreferences.update(v),{layout,theme:layout==='modern'?'light':'dark',language:width===320?'en':'th',font:17,width:'comfortable'});await frame(p);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,id+'/'+layout+'/'+width);
   for(const d of ds){const b=await image(p,d).boundingBox();assert.ok(b.width>0&&b.width<=560.5&&Math.abs(b.height-b.width*d.height/d.width)<1);assert.ok(32*b.width/560>=14,id+': primary labels at least14CSSpx')}
   if(layout==='modern'&&[1440,320].includes(width)){await p.locator('#'+ds[0].section).scrollIntoViewIfNeeded();await frame(p);await shot(p,'lesson-'+ds[0].number+'-'+width)}cases++;
  }
  await p.evaluate(()=>LearningPreferences.update({layout:'modern',font:22,width:'narrow'}));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,id+' large font');
  for(const preset of ['forest','ocean','lavender','sakura','sunset','midnight','custom'])for(const theme of ['light','dark']){
   await p.evaluate(v=>LearningPreferences.update(v),{preset,theme,custom:{primary:'#7051a1',background:'#fff8f3',surface:'#ffffff'}});assert.equal(await image(p,ds[0]).evaluate(n=>getComputedStyle(n).filter),'none');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   const contrast=await image(p,ds[0]).locator('..').locator('figcaption').evaluate(n=>{
    // Canvas resolves CSS Color 4 color(srgb ...) and alpha, rather than treating 0..1 as 0..255.
    const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
    const rgb=s=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=s;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data]},lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
    let q=n,bg;while(q){const c=getComputedStyle(q).backgroundColor;if(rgb(c)[3]===255){bg=c;break}q=q.parentElement}const a=lum(rgb(getComputedStyle(n).color)),b=lum(rgb(bg||'#fff'));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   });assert.ok(contrast>=4.5,id+' caption contrast '+preset+'/'+theme+': '+contrast);
  }
  const link=image(p,ds[0]).locator('..').locator('.lesson-figure-source a');await link.focus();assert.equal(await link.evaluate(n=>n===document.activeElement),true);await p.keyboard.press('Tab');assert.notEqual(await p.evaluate(()=>document.activeElement.tagName),'BODY');
  await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>LearningPreferences.update({layout:'modern',theme:'light',font:17,width:'comfortable'}));await p.emulateMedia({media:'print'});assert.equal(await p.locator('.topbar').isVisible(),false);
  for(const d of ds){const im=image(p,d);assert.equal(await im.isVisible(),true);assert.equal(await im.evaluate(n=>getComputedStyle(n).objectFit),'contain');assert.ok((await im.boundingBox()).height<=756)}
  if(dir)await p.pdf({path:path.join(dir,'print-'+ds[0].number+'.pdf'),format:'A4',margin:{top:'12mm',bottom:'12mm',left:'12mm',right:'12mm'},printBackground:false});await p.emulateMedia({media:'screen'});
 }
 await context.close();const nojs=await fresh(browser,320,'classic',false);
 for(const id of lessons){const ds=spec.assets.filter(d=>d.resourceId===id);await nojs.p.goto(url(ds[0]));for(const d of ds){const im=image(nojs.p,d);await im.scrollIntoViewIfNeeded();await im.evaluate(n=>n.decode());assert.ok(await im.evaluate(n=>n.complete&&n.naturalWidth>0))}assert.equal(await nojs.p.locator('.practice-fallback>ol>li').count(),6);assert.equal(await nojs.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false)}
 await nojs.context.close();return {images,layoutCases:cases,paletteCases:lessons.length*14,nojs:lessons.length,print:lessons.length};
}
async function delayed(browser){
 const results=[];
 const names=process.argv.find(a=>a.startsWith('--assets='))?.slice(9).split(','),selected=names?spec.assets.filter(d=>names.includes(d.id)):spec.assets;
 if(names)assert.equal(selected.length,new Set(names).size,'Every requested asset must exist');
 for(const d of selected){for(const layout of ['modern','classic'])for(const width of [320,390,1024,1440]){
  const {context,p}=await fresh(browser,width,layout);let release,arrive;const held=new Promise(r=>release=r),arrived=new Promise(r=>arrive=r);
  await context.route('**/'+d.name+'.webp',async route=>{arrive();await held;await route.continue()});
  try{
   await p.goto(url(d),{waitUntil:'domcontentloaded'});await p.locator('#study-reader-actions').waitFor();await p.evaluate(()=>document.fonts.ready);
   const im=image(p,d);await im.locator('..').evaluate(n=>scrollTo({top:scrollY+n.getBoundingClientRect().top-180,behavior:'instant'}));
   let timer;try{await Promise.race([arrived,new Promise((_,fail)=>{timer=setTimeout(()=>fail(Error('Lazy request did not arrive: '+d.id)),20000)})])}finally{clearTimeout(timer)}
   assert.equal(await im.evaluate(n=>n.complete||n.naturalWidth>0),false,'Image must still be pending, not cached');await frame(p);
   const measure=n=>({box:n.getBoundingClientRect().toJSON(),caption:n.parentElement.querySelector('figcaption').getBoundingClientRect().top,content:n.parentElement.nextElementSibling.getBoundingClientRect().top,scroll:scrollY});
   const before=await im.evaluate(measure);if(width===320&&layout==='modern')await shot(p,'pending-'+d.number);
   await p.evaluate(()=>{window.visualShifts=[];window.visualObserver=new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)visualShifts.push(e.value)});visualObserver.observe({type:'layout-shift'})});
   const response=p.waitForResponse(r=>r.url().endsWith('/'+d.name+'.webp'));release();assert.equal((await response).status(),200);await im.evaluate(n=>n.decode());await frame(p);
   const after=await im.evaluate(measure),cls=await p.evaluate(()=>{visualObserver.disconnect();return visualShifts.reduce((a,b)=>a+b,0)});
   assert.deepEqual(await im.evaluate(n=>[n.naturalWidth,n.naturalHeight]),[d.width,d.height]);assert.ok(before.box.width>0&&before.box.height>0);
   for(const key of ['width','height','top'])assert.ok(Math.abs(before.box[key]-after.box[key])<=1,d.id+' stable '+key);
   for(const key of ['caption','content','scroll'])assert.ok(Math.abs(before[key]-after[key])<=1,d.id+' stable '+key);
   assert.ok(Math.abs(before.box.height-before.box.width*d.height/d.width)<=1,d.id+' reserve correct ratio');assert.ok(cls<.01,d.id+' image-induced CLS '+cls);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);if(width===320&&layout==='modern')await shot(p,'decoded-'+d.number);
   results.push({id:d.id,layout,width,before,after,cls});
  }finally{release();await context.close()}
 }
  if(dir)fs.writeFileSync(path.join(dir,'cls-metrics.json'),JSON.stringify(results,null,2));console.log('Delayed '+d.number+'/50:8 fresh cache-disabled contexts passed');
 }
 return {cases:results.length,maxCLS:Math.max(...results.map(r=>r.cls)),maxCaptionShift:Math.max(...results.map(r=>Math.abs(r.before.caption-r.after.caption))),maxContentShift:Math.max(...results.map(r=>Math.abs(r.before.content-r.after.content))),results};
}
(async()=>{
 if(dir)fs.mkdirSync(dir,{recursive:true});const b=await chromium.launch({channel:'chrome',headless:true});let ui,cls;
 try{if(!process.argv.includes('--cls-only'))ui=await surfaces(b);if(!process.argv.includes('--surfaces-only'))cls=await delayed(b);assert.deepEqual(errors,[]);
  if(dir)fs.writeFileSync(path.join(dir,process.argv.includes('--cls-only')?'cls-report.json':'browser-report.json'),JSON.stringify({base,browser:b.version(),ui,cls,errors},null,2));
  console.log('PASS:AI/OOP visual QA '+JSON.stringify({ui,cls:cls&&{cases:cls.cases,maxCLS:cls.maxCLS,maxCaptionShift:cls.maxCaptionShift,maxContentShift:cls.maxContentShift},errors}));
 }finally{await b.close()}
})().catch(e=>{console.error(e.stack);process.exit(1)});
