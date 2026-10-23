/* Local-first loading, repository restrictions and remote response validation. */
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const context = {window:{},URL,Blob,TextDecoder,AbortSignal,fetch:async()=>{throw Error('Unexpected fetch')}};
vm.runInNewContext(fs.readFileSync('assets/pdf-source.js','utf8'),context);
const api = context.window.LearningPDFSource, base = 'https://example.test/Course-Website/';
const sources = api.paths('courses/artificial-intelligence/slides/01_intro.pdf',base);
assert.equal(sources.remote.href,'https://raw.githubusercontent.com/Skyce38/Course-Website/main/courses/artificial-intelligence/slides/01_intro.pdf');
for (const input of ['', 'https://evil.test/courses/ai/slides/x.pdf','//evil.test/x.pdf','courses/ai/slides/../x.pdf','courses/ai/slides/%2e%2e/x.pdf','courses/ai/slides/x.pdf?raw=1','courses/ai/slides/x.pdf#page=2','courses/ai/slides/a\\x.pdf','courses/ai/slides/x.html','courses/ai/private/x.pdf','courses/ai/slides/%00x.pdf']) assert.throws(()=>api.paths(input,base),input);
assert.ok(api.paths('courses/ai/slides/ชื่อ #1.pdf'.replace('#','%23'),base).remote.href.includes('%23'));
module.exports = (async()=>{
  let calls = 0;
  context.fetch = async(url,options) => { calls++; assert.equal(url.href,sources.local.href); assert.equal(options.method,'HEAD'); return new Response(null,{headers:{'content-type':'application/pdf'}}); };
  assert.equal((await api.resolve(sources)).url,sources.local.href); assert.equal(calls,1,'Available local files must not fetch GitHub');
  context.fetch = async(url,options) => { assert.equal(url.href,sources.local.href); return options.method === 'HEAD' ? new Response(null,{status:405}) : new Response('%PDF-1.7',{headers:{'content-type':'application/pdf'}}); };
  assert.equal((await api.resolve(sources)).url,sources.local.href,'Servers without HEAD must still prefer local files');
  context.fetch = async(url,options) => {
    if (url.href === sources.local.href) return new Response(null,{status:404});
    assert.equal(url.href,sources.remote.href); assert.equal(options.mode,'cors'); assert.equal(options.credentials,'omit'); assert.equal(options.redirect,'error');
    return new Response('%PDF-1.7\nfixture',{headers:{'content-type':'application/octet-stream'}});
  };
  const result = await api.resolve(sources); assert.equal(result.remote,true); assert.match(result.url,/^blob:/); result.release();
  for (const response of [()=>new Response('missing',{status:404}),()=>new Response('blocked',{status:403}),()=>new Response('%PDF-1.7',{headers:{'content-type':'text/html'}}),()=>new Response('not a PDF',{headers:{'content-type':'application/pdf'}})]) {
    context.fetch = async url => url.href === sources.local.href ? new Response(null,{status:404}) : response();
    await assert.rejects(api.resolve(sources));
  }
  context.fetch = async()=>{throw Error('CORS/network failure')}; await assert.rejects(api.resolve(sources));
  console.log('PASS: PDF local-first preference, fixed repository/main fallback, URL/path restrictions, CORS/redirect policy, HTTP/MIME/signature errors and Blob cleanup');
})().catch(error => { console.error(error); process.exitCode = 1; });
