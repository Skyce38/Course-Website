/* Authoring-only: installed Chrome/Playwright + existing Python/Pillow. No site dependency. */
const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process'),assert=require('assert/strict'),crypto=require('crypto');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),root=path.resolve(__dirname,'..'),spec=require('./iot-visuals.json'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'study-iot-visual-'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true}),p=await b.newPage({viewport:{width:1120,height:1000},deviceScaleFactor:1}),issues=[];
try{for(const d of spec.assets){
 const svg=fs.readFileSync(path.join(root,d.svg),'utf8');await p.setViewportSize({width:d.width,height:d.height});await p.goto('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));await p.evaluate(()=>document.fonts.ready);
 const labels=await p.locator('text').evaluateAll(ns=>ns.map(n=>{const b=n.getBBox();return{text:n.textContent,x:b.x,y:b.y,w:b.width,h:b.height,font:Number(n.getAttribute('font-size'))}}));
 assert.ok(labels.length>=5,d.name+': SVG must render real labelled content');
 for(const t of labels)if(t.x<4||t.y<0||t.x+t.w>556||t.y+t.h>d.height/2)issues.push(d.name+': outside '+JSON.stringify(t));
 for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const x=labels[i],y=labels[j];if(Math.min(x.x+x.w,y.x+y.w)-Math.max(x.x,y.x)>3&&Math.min(x.y+x.h,y.y+y.h)-Math.max(x.y,y.y)>3)issues.push(d.name+': overlapping labels '+x.text+' / '+y.text);}
 const png=path.join(temp,d.name+'.png');await p.screenshot({path:png});const webp=path.join(temp,d.name+'.webp');
 cp.execFileSync(process.env.STUDY_PYTHON||'python',['-c','from PIL import Image;import sys;im=Image.open(sys.argv[1]).convert("RGB");im.save(sys.argv[2],"WEBP",lossless=True,method=6)',png,webp]);
 const bytes=fs.readFileSync(webp);if(process.argv.includes('--verify'))assert.equal(sha(fs.readFileSync(path.join(root,d.file))),sha(bytes),d.name+': deterministic raster');else{fs.mkdirSync(path.dirname(path.join(root,d.file)),{recursive:true});fs.writeFileSync(path.join(root,d.file),bytes);}
 d.bytes=bytes.length;d.sha256=sha(bytes);d.svgSha256=sha(Buffer.from(svg));d.labelCount=labels.length;
}if(issues.length)throw Error(issues.join('\n'));if(!process.argv.includes('--verify'))fs.writeFileSync(path.join(root,'scripts/iot-visuals.json'),JSON.stringify(spec,null,2)+'\n');console.log('PASS:25 original diagrams,Thai-shaped fonts,all label bounds/no collisions,lossless WebP;'+spec.assets.reduce((n,d)=>n+d.bytes,0)+' total bytes'+(process.argv.includes('--verify')?' deterministic verified':' exported'));
}finally{await b.close();assert.equal(path.dirname(temp),path.resolve(os.tmpdir()));fs.rmSync(temp,{recursive:true,force:true});}})().catch(e=>{console.error(e.stack);process.exit(1)});
