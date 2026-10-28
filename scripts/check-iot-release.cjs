/* Reproducible outputs and immutable pre-IoT baseline. */
const fs=require('fs'),cp=require('child_process'),assert=require('assert/strict'),crypto=require('crypto'),path=require('path');
const root=path.resolve(__dirname,'..'),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
function build(){cp.execFileSync(process.execPath,['scripts/build.cjs'],{cwd:root,stdio:'pipe'});}
build();const catalog=require('../catalog.json'),files=['catalog.json','index.html','assets/insights-banks.json',...catalog.resources.filter(r=>r.reader).map(r=>r.reader)],before=Object.fromEntries(files.map(p=>[p,hash(p)]));build();assert.deepEqual(Object.fromEntries(files.map(p=>[p,hash(p)])),before);
require('./check-iot.cjs');console.log('PASS: deterministic double build ('+files.length+' outputs), original37 lessons/1110 questions/370 historical anchors/15PDF and published resource identity preservation');
