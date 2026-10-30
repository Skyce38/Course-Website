/* Offline by default; --online explicitly verifies the official HTTPS document by GET. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),replacement='https://git-scm.com/docs/gittutorial';
// Compose the retired address so the regression itself does not preserve an active full URL.
const retired='https://git-scm.com/book/en/v2/'+'Getting-Started-Git-Basics';
const source='courses/database-management/summaries/git-version-control.md',reader='read/database-management/git-version-control.html';
const files=[source,reader,'scripts/database-visuals.json','scripts/database-visual-build.py','docs/database-academic-verification.md'];
function check(read=file=>fs.readFileSync(path.join(root,file),'utf8')){
 for(const file of files){const text=read(file);assert.ok(!text.includes(retired),'Retired Git URL: '+file);assert.ok(text.includes(replacement),'Official Git tutorial missing: '+file)}
 const html=read(reader),markdown=read(source),figures=JSON.parse(read('scripts/database-visuals.json')).assets.filter(d=>d.id==='db16-git-states');
 assert.equal(figures.length,1);assert.equal(figures[0].reference,replacement);
 assert.equal(markdown.split(']('+replacement+')').length-1,2,'Both authored DB09 references');
 assert.equal(html.split('href="'+replacement+'"').length-1,2,'Both rendered DB09 links');
 const figure=[...html.matchAll(/<figure\b[\s\S]*?<\/figure>/g)].map(m=>m[0]).find(s=>s.includes('/db16-git-states.webp"'));
 assert.ok(figure,'Figure17 remains in the reader');
 assert.equal(figure.split('href="'+figures[0].reference+'"').length-1,1,'Figure17 metadata matches rendered attribution');
 console.log('PASS:DB09 two authored/rendered official Git links,figure17 attribution and authoring metadata;retired reference absent');
}
async function verifyOnline(fetcher=globalThis.fetch){
 assert.equal(typeof fetcher,'function','A fetch implementation is required for explicit online validation');
 const response=await fetcher(replacement,{method:'GET',redirect:'manual',headers:{Accept:'text/html'},signal:AbortSignal.timeout(20000)});
 if(response.status<200||response.status>=300)throw Error('Git tutorial GET HTTP '+response.status);
 assert.match(response.headers.get('content-type')||'',/^text\/html\b/i,'Git tutorial GET must return HTML');
 const body=await response.text();
 assert.ok(body.length>100&&/\bgittutorial\b/i.test(body),'GET must return the tutorial body;HEAD headers alone are insufficient');
 return {url:replacement,method:'GET',status:response.status,bytes:Buffer.byteLength(body),contentType:response.headers.get('content-type')};
}
async function fixtures(){
 const text='<html><title>Git gittutorial</title><body>'+('Git tutorial staging commits branches collaboration. '.repeat(4))+'</body></html>';
 await verifyOnline(async(url,options)=>{assert.equal(url,replacement);assert.equal(options.method,'GET');assert.equal(options.redirect,'manual');return new Response(text,{status:200,headers:{'content-type':'text/html; charset=utf-8'}})});
 for(const status of [301,404,500])await assert.rejects(()=>verifyOnline(async()=>new Response(text,{status,headers:{'content-type':'text/html'}})),new RegExp('HTTP '+status));
 await assert.rejects(()=>verifyOnline(async()=>new Response('',{status:200,headers:{'content-type':'text/html'}})),/HEAD headers alone/);
 await assert.rejects(()=>verifyOnline(async()=>new Response(text,{status:200,headers:{'content-type':'application/json'}})),/must return HTML/);
 await assert.rejects(()=>verifyOnline(async()=>{throw Error('network fixture')}),/network fixture/);
 const read=file=>fs.readFileSync(path.join(root,file),'utf8');
 assert.throws(()=>check(file=>file===source?read(file).replace(replacement,retired):read(file)),/Retired Git URL/);
 assert.throws(()=>check(file=>file===reader?read(file).replace('href="'+replacement+'"','href="https://example.invalid/"'):read(file)),/Both rendered DB09 links/);
 console.log('PASS:GET-only success,non-2xx including404,empty HEAD-like body,wrong MIME/network errors and reference-regression fixtures');
}
if(require.main===module)(async()=>{check();await fixtures();if(process.argv.includes('--online'))console.log('PASS:explicit online validation '+JSON.stringify(await verifyOnline()));else console.log('Offline validation only;use --online for a real HTTPS GET')})().catch(error=>{console.error(error.stack);process.exitCode=1});
module.exports={check,verifyOnline};
