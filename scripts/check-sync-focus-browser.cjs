/* Optional browser regression; no production dependency.
 * Serve this checkout under /Course-Website/, then run:
 * STUDY_BASE_URL=http://127.0.0.1:8778/Course-Website/ node scripts/check-sync-focus-browser.cjs
 * Uses an existing Playwright installation (or set PLAYWRIGHT_MODULE to its absolute module path).
 */
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:8778/Course-Website/';
const resource='oop-python-stack',treeURL='https://api.github.com/repos/Skyce38/Course-Website/git/trees/main?recursive=1';
const action=(kind,id=resource)=>`[data-${kind}="${id}"]`;
let cases=0;
async function session(browser,preferences={},cached=[]){
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
  const errors=[],pending=[],waiters=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>assert.ok(!/learning-(paths|navigation)/.test(request.url()),'obsolete path request'));
  await context.addInitScript(({preferences,cached,resource})=>{
    if(localStorage.getItem('focus-test-seeded'))return;
    localStorage.setItem('focus-test-seeded','1');
    localStorage.setItem('skyce-learning-preferences',JSON.stringify({layout:'classic',language:'th',theme:'light',...preferences}));
    localStorage.setItem('skyce-learning-study',JSON.stringify({recent:[],positions:{},completed:preferences.theme==='dark'?[]:[resource]}));
    localStorage.setItem('skyce-learning-bookmarks',JSON.stringify([resource]));
    if(cached.length)localStorage.setItem('skyce-learning-tree-single',JSON.stringify({tree:cached}));
  },{preferences,cached,resource});
  await context.route(treeURL,route=>new Promise(done=>{
    const item={route,done};if(waiters.length)waiters.shift()(item);else pending.push(item);
  }));
  const next=()=>pending.length?Promise.resolve(pending.shift()):new Promise(resolve=>waiters.push(resolve));
  async function finish(request,{tree=[],status=200,abort=false}={}){
    if(abort)await request.route.abort('failed');
    else await request.route.fulfill({status,contentType:'application/json',body:JSON.stringify({tree,truncated:false})});
    request.done();
    await page.waitForFunction(()=>document.querySelector('#refresh')?.disabled===false||!document.querySelector('#refresh'));
    // The fetch handler also renders on home/saved routes without a refresh button.
    await page.waitForFunction(()=>typeof syncing!=='undefined'&&syncing===false);
  }
  const saved=()=>page.evaluate(()=>[localStorage.getItem('skyce-learning-study'),localStorage.getItem('skyce-learning-bookmarks')]);
  async function close(){assert.deepEqual(errors,[]);await context.close();cases++}
  return{page,next,finish,saved,close};
}
(async()=>{
  const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',headless:true});
  try{
    // Exact original race, both layouts/languages/modes, success and HTTP fallback.
    for(const layout of ['classic','modern'])for(const language of ['th','en'])for(const status of [200,503])for(const width of [1440,390,320]){
      const s=await session(browser,{layout,language,theme:language==='th'?'light':'dark'}),p=s.page;
      await p.setViewportSize({width,height:1000});
      await p.goto(base+'#course/oop-python/summaries');const request=await s.next();
      await p.evaluate(()=>document.fonts.ready);
      await p.locator(action('complete')).evaluate(node=>{node.scrollIntoView({behavior:'instant',block:'center'});node.focus({preventScroll:true})});
      const before=await s.saved(),pressed=await p.locator(action('complete')).getAttribute('aria-pressed');
      const old=await p.locator(action('complete')).elementHandle();
      const scroll=await p.evaluate(()=>scrollY);
      await s.finish(request,{status});
      assert.equal(await old.evaluate(node=>node.isConnected),false,'render must actually replace the control');
      assert.equal(await p.locator(action('complete')).evaluate(node=>node===document.activeElement),true,'same completion resource retains focus');
      assert.equal(await p.locator(action('complete')).getAttribute('aria-pressed'),pressed);
      assert.deepEqual(await s.saved(),before,'restoring focus must not mutate study/bookmark state');
      assert.equal(await p.evaluate(()=>scrollY),scroll,'preventScroll');
      await p.keyboard.press('Tab');assert.equal(await p.locator(action('bookmark')).evaluate(node=>node===document.activeElement),true,'normal Tab order');
      assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      await s.close();
    }
    // Both manual-refresh renders, and a different action focused during the await.
    for(const status of [200,503]){
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');await s.finish(await s.next());
      await p.evaluate(()=>document.fonts.ready);
      await p.locator(action('complete')).evaluate(node=>{node.scrollIntoView({behavior:'instant',block:'center'});node.focus({preventScroll:true})});const before=await s.saved();
      await p.locator('#refresh').evaluate(button=>button.click());const request=await s.next();
      assert.equal(await p.locator(action('complete')).evaluate(node=>node===document.activeElement),true,'sync start focus');
      await p.locator(action('bookmark')).evaluate(node=>{node.scrollIntoView({behavior:'instant',block:'center'});node.focus({preventScroll:true})});
      const scroll=await p.evaluate(()=>[scrollX,scrollY]);await s.finish(request,{status});
      assert.equal(await p.locator(action('bookmark')).evaluate(node=>node===document.activeElement),true,'fresh bookmark focus, not stale completion snapshot');
      assert.deepEqual(await s.saved(),before);assert.deepEqual(await p.evaluate(()=>[scrollX,scrollY]),scroll);await s.close();
    }
    // Typing in Search must not restore an earlier resource action.
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();
      await p.locator(action('complete')).focus();await p.locator('#search').fill('Stack');const before=await s.saved();
      await s.finish(request);assert.equal(await p.locator('#search').evaluate(node=>node===document.activeElement),true);assert.equal(await p.locator('#search').inputValue(),'Stack');assert.deepEqual(await s.saved(),before);await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');await s.finish(await s.next());await p.locator('#search').fill('Stack');
      await p.locator('#refresh').evaluate(button=>button.click());const request=await s.next();assert.equal(await p.locator('#search').evaluate(node=>node===document.activeElement),true,'sync start leaves Search alone');await s.finish(request);assert.equal(await p.locator('#search').evaluate(node=>node===document.activeElement),true);await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete')).focus();await p.keyboard.press('Space');assert.equal(await p.locator(action('complete')).getAttribute('aria-pressed'),'false');assert.equal(await p.locator(action('complete')).evaluate(node=>node===document.activeElement),true,'existing studychange focus');await s.finish(request);assert.equal(await p.locator(action('complete')).getAttribute('aria-pressed'),'false');assert.equal(await p.locator(action('complete')).evaluate(node=>node===document.activeElement),true);await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('bookmark')).focus();const before=await s.saved();await s.finish(request,{abort:true});assert.equal(await p.locator(action('bookmark')).evaluate(node=>node===document.activeElement),true,'network failure fallback');assert.deepEqual(await s.saved(),before);await s.close();
    }
    // Route changes must use the currently focused course/action, never the old OOP action.
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete')).focus();
      await p.evaluate(()=>{location.hash='#course/artificial-intelligence/summaries'});
      const other=action('complete','artificial-intelligence-final-knn');await p.locator(other).focus();await s.finish(request);
      assert.equal(await p.locator(other).evaluate(node=>node===document.activeElement),true);assert.ok(p.url().endsWith('#course/artificial-intelligence/summaries'));await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete')).focus();
      await p.evaluate(()=>{location.hash='#course/unix-tools/slides'});await p.waitForFunction(()=>!document.querySelector('[data-complete="oop-python-stack"]'));await s.finish(request);
      assert.equal(await p.evaluate(()=>document.activeElement===document.body),true,'no old-route focus');await s.close();
    }
    // Dynamic resource removed by a new tree: do not substitute the next resource.
    {
      const fixture='oop-python-summaries/focus-fixture.md',s=await session(browser,{},[{type:'blob',path:'courses/oop-python/summaries/focus-fixture.md'}]),p=s.page;
      await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete',fixture)).focus();const before=await s.saved();await s.finish(request);
      assert.equal(await p.locator(action('complete',fixture)).count(),0);assert.equal(await p.evaluate(()=>document.activeElement===document.body),true);assert.deepEqual(await s.saved(),before);await s.close();
    }
    // Same resource appears in Recently Opened and in the full catalog; keep its context.
    for(const context of ['.recent-reading','#view > .resource-list'])for(const kind of ['complete','bookmark','study-open']){
      const s=await session(browser),p=s.page;await p.goto(base);const request=await s.next();
      await p.evaluate(id=>LearningStudy.open(LearningStudy.resources.find(r=>r.id===id)),resource);
      const selector=context+' .resource-buttons '+action(kind);await p.locator(selector).focus();const before=await s.saved();await s.finish(request);
      assert.equal(await p.locator(selector).evaluate(node=>node===document.activeElement),true,'duplicate resource context/action');assert.deepEqual(await s.saved(),before);await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base);const request=await s.next();
      await p.evaluate(id=>{allResources.push({...allResources.find(r=>r.id===id)});render()},resource);
      const second=p.locator('#view > .resource-list .resource-buttons '+action('complete')).nth(1);await second.focus();await s.finish(request);assert.equal(await second.evaluate(node=>node===document.activeElement),true,'same-context occurrence');await s.close();
    }
    // Unavailable replacement controls and unavailable old controls must not be forced into focus.
    for(const unavailable of ['disabled','hidden','aria-hidden','aria-disabled','inert','display','visibility','tabindex','parent-hidden']){
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete')).focus();
      await p.evaluate(({resource,unavailable})=>{const original=window.render;window.render=function(){original();const node=document.querySelector('[data-complete="'+resource+'"]');if(unavailable==='display')node.style.display='none';else if(unavailable==='visibility')node.style.visibility='hidden';else if(unavailable==='parent-hidden')node.closest('.resource-row').hidden=true;else node.setAttribute(unavailable,unavailable.startsWith('aria-')?'true':unavailable==='tabindex'?'-1':'')}} ,{resource,unavailable});
      await s.finish(request);assert.equal(await p.evaluate(()=>document.activeElement===document.body),true,'unavailable replacement: '+unavailable);await s.close();
    }
    {
      const s=await session(browser),p=s.page;await p.goto(base+'#course/oop-python/summaries');const request=await s.next();await p.locator(action('complete')).focus();await p.locator(action('complete')).evaluate(node=>node.setAttribute('aria-disabled','true'));await s.finish(request);assert.equal(await p.evaluate(()=>document.activeElement===document.body),true,'unavailable old action');await s.close();
    }
  }finally{await browser.close()}
  console.log(`PASS: ${cases} deterministic GitHub sync focus cases`);
})().catch(error=>{console.error(error);process.exit(1)});
