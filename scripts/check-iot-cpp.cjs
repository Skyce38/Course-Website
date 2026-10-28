/* Actual installed ESP32 compiler, no downloads/uploads. Set ARDUINO_CLI and optional ARDUINO_LIBRARIES. */
const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),cli=process.env.ARDUINO_CLI||'arduino-cli',target='esp32:esp32:esp32',temp=fs.mkdtempSync(path.join(os.tmpdir(),'study-iot-cpp-'));
const sources=require('./lessons.json').filter(p=>p.startsWith('courses/internet-of-things/'));
function run(args){return cp.execFileSync(cli,args,{encoding:'utf8',timeout:300000,maxBuffer:16*1024*1024});}
try{
 const version=run(['version']),cores=run(['core','list']);assert.match(cores,/esp32:esp32\s+3\.3\.11\s/,'Verification target must match documented installed core3.3.11');console.log(version.trim());
 const sketches=sources.map(source=>({name:path.basename(source,'.md').replaceAll('-','_'),code:fs.readFileSync(path.join(root,source),'utf8').replace(/\r\n/g,'\n').match(/```cpp\n([\s\S]*?)\n```/)[1]}));
 const timer=sketches.find(x=>x.name==='final_relay_timers').code.match(/struct LampState[\s\S]*?\n}\n/)[0];
 assert.ok(sketches.find(x=>x.name==='final_oled_integration').code.includes(timer),'Same tested state function in integrated sketch');
 const cases=require('./iot-verification.json').cases.filter(c=>c.kind==='cpp');assert.equal(cases.length,27);
 let verify='#include <Arduino.h>\n'+timer+'\n'+cases.map(c=>'static_assert(('+c.oracle.cpp+') == '+c.conclusion+',"'+c.question+'");').join('\n');
 const states=[[false,0,0,false,false,0],[false,0,1000,true,true,1000],[true,1000,9000,true,true,9000],[true,9000,11000,false,true,9000],[true,9000,18999,false,true,9000],[true,9000,19000,false,false,9000],[true,1000,11000,true,true,11000],[false,0,999999,false,false,0],[true,4294967040,9743,false,true,4294967040],[true,4294967040,9744,false,false,4294967040]];
 for(const [on,seen,now,motion,next,last]of states)verify+='\nstatic_assert(nextState(LampState{'+on+','+seen+'U},'+now+'U,'+motion+').on=='+next+' && nextState(LampState{'+on+','+seen+'U},'+now+'U,'+motion+').seen=='+last+'U,"timer '+now+'");';
 const classifier=sketches.find(x=>x.name==='final_water_level').code.match(/int classify[\s\S]*?\n}/)[0];verify+='\nconstexpr '+classifier;for(const [cm,valid,state]of [[20,true,2],[40,true,1],[60,true,0],[30,true,2],[30.1,true,1],[50,true,1],[50.1,true,0],[0,false,-1]])verify+='\nstatic_assert(classify('+Number(cm).toFixed(1)+'f,'+valid+')=='+state+',"water-policy");';
 verify+='\nvoid setup(){}\nvoid loop(){}\n';sketches.push({name:'verification',code:verify});
 for(const sketch of sketches.filter(s=>!process.argv.includes('--keys-only')||s.name==='verification')){const folder=path.join(temp,sketch.name);fs.mkdirSync(folder);fs.writeFileSync(path.join(folder,sketch.name+'.ino'),sketch.code);const args=['compile','--jobs','4','--fqbn',target,'--build-path',path.join(temp,'build')];if(process.env.ARDUINO_LIBRARIES)args.push('--libraries',process.env.ARDUINO_LIBRARIES);args.push(folder);try{run(args)}catch(e){process.stderr.write(String(e.stdout||'')+String(e.stderr||''));throw e}console.log('PASS ESP32 compile: '+sketch.name);}
 console.log('PASS:'+(process.argv.includes('--keys-only')?'updated verification sketch':'9 complete Arduino sketches')+',27 C++ key assertions and10 exact timer-state /8 water-policy assertions; target '+target+' / core3.3.11. Compilation only; no hardware execution.');
}finally{
 assert.equal(path.dirname(path.resolve(temp)),path.resolve(os.tmpdir()));assert.ok(path.basename(temp).startsWith('study-iot-cpp-'));fs.rmSync(temp,{recursive:true,force:true});
}
