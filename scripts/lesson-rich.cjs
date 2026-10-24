/* Build-time rich content only. No lesson scripts, remote images or runtime math. */
const fs=require('node:fs'),path=require('node:path');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function math(tex,display,context) {
  if (!tex.trim() || tex.length>10000) throw Error('Empty/oversized lesson equation');
  const katex=require('../assets/vendor/katex/katex.min.js');
  let html;
  try { html=katex.renderToString(tex,{displayMode:display,output:'htmlAndMathml',throwOnError:true,strict:'error',maxExpand:1000,maxSize:20,trust:()=>{throw Error('Unsafe lesson math command');}}); }
  catch(error) { throw Error('Invalid lesson equation: '+error.message); }
  context.features.add('math');
  return display?'<div class="lesson-math-block" tabindex="0" role="group" aria-label="สมการ / Equation">'+html+'</div>':'<span class="lesson-math-inline" tabindex="0">'+html+'</span>';
}
function image(raw,alt,context) {
  if (!alt.trim() || alt.length>1000) throw Error('Lesson images require descriptive alt text');
  let decoded;try { decoded=decodeURIComponent(raw); } catch { throw Error('Invalid lesson image encoding'); }
  if (/^[a-z][a-z0-9+.-]*:|^[\/\\]|[\\?#\u0000-\u001f\u007f]/i.test(decoded)) throw Error('Unsafe lesson image path');
  const root=fs.realpathSync(context.root),target=path.resolve(context.root,path.dirname(context.source),decoded);
  if (!target.startsWith(path.resolve(context.root)+path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) throw Error('Missing/unsafe lesson image');
  if (!fs.realpathSync(target).startsWith(root+path.sep)) throw Error('Lesson image escapes repository');
  const ext=path.extname(target).toLowerCase(),bytes=fs.readFileSync(target);
  const signatures={'.png':b=>b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'.jpg':b=>b[0]===255&&b[1]===216&&b[2]===255,'.jpeg':b=>b[0]===255&&b[1]===216&&b[2]===255,'.gif':b=>/^GIF8[79]a$/.test(b.subarray(0,6).toString()),'.webp':b=>b.subarray(0,4).toString()==='RIFF'&&b.subarray(8,12).toString()==='WEBP'};
  if (!signatures[ext]?.(bytes)) throw Error('Unsupported/mismatched lesson image; use PNG, JPEG, GIF or WebP');
  context.features.add('figure');
  const url=path.relative(path.resolve(context.root,path.dirname(context.output)),target).split(path.sep).map(encodeURIComponent).join('/');
  return '<img src="'+esc(url)+'" alt="'+esc(alt)+'" loading="lazy" decoding="async">';
}
module.exports={math,image};
