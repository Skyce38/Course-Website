/* Optional developer Linux execution; never runs in the website or learner storage. */
const fs=require('fs'),cp=require('child_process'),assert=require('assert/strict'),path=require('path');
const ledger=require('./unix-verification.json'),root=path.resolve(__dirname,'..');
const b64=s=>Buffer.from(s).toString('base64');
const programs=ledger.cases.map(c=>({id:c.question,code:c.code,stdout:c.stdout??c.output,stderr:c.stderr,status:c.status}));
for(const e of ledger.examples||[])programs.push({...e,stdout:e.output});
for(const source of require('./lessons.json').filter(s=>s.startsWith('courses/unix-tools/'))){const body=fs.readFileSync(path.join(root,source),'utf8').replace(/\r\n/g,'\n');for(const [i,m]of [...body.matchAll(/```bash\n([\s\S]*?)\n```/g)].entries())programs.push({id:path.basename(source)+':example'+i,code:m[1],syntaxOnly:true});}
let script=`set -eu\nexport LC_ALL=C\nbase=$(mktemp -d)\ntrap 'rm -rf -- "$base"' EXIT\nprintf 'ENV '; bash --version | head -1\n`;
for(const [i,c]of programs.entries()){
 script+=`mkdir "$base/${i}"; cd "$base/${i}"\nprintf '%s' '${b64(c.code)}' | base64 -d >case.sh\nif ! bash -n case.sh; then printf 'FAIL syntax ${c.id}\\n'; exit 1; fi\n`;
 if(c.syntaxOnly)continue;
 script+=`set +e\ntimeout 3 env -i PATH=/usr/bin:/bin HOME="$base/${i}" LC_ALL=C bash --noprofile --norc -c 'set +e +u +m; set +o pipefail; shopt -u lastpipe nullglob failglob; source ./case.sh' >actual.out 2>actual.err\nstatus=$?\nset -e\nactual=$(cat actual.out); expected=$(printf '%s' '${b64(c.stdout)}' | base64 -d)\nerr=$(cat actual.err); expected_err=$(printf '%s' '${b64(c.stderr)}' | base64 -d)\nif [[ "$actual" != "$expected" || "$err" != "$expected_err" || "$status" != '${c.status}' ]]; then printf 'FAIL ${c.id} status=%s expected=${c.status} stdout=<%q> expected=<%q> stderr=<%q>\\n' "$status" "$actual" "$expected" "$err"; exit 1; fi\n`;
}
script+=`printf 'PASS ${ledger.cases.length} executable answer cases + ${(ledger.examples||[]).length} applied programs; ${programs.length} syntax checks\\n'\n`;
let result;
if(process.env.STUDY_UNIX_BASH)result=cp.spawnSync(process.env.STUDY_UNIX_BASH,['--noprofile','--norc','-s'],{input:script,encoding:'utf8',timeout:120000,maxBuffer:1e6});
else result=cp.spawnSync('docker',['run','--rm','-i','--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--user','65534:65534','--pids-limit','64','--memory','192m','--tmpfs','/tmp:rw,exec,nosuid,nodev,size=64m',ledger.environment.image+'@'+ledger.environment.digest,'bash','--noprofile','--norc','-s'],{input:script,encoding:'utf8',timeout:120000,maxBuffer:1e6});
process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');if(result.error)throw result.error;assert.equal(result.status,0,'Unix independent Linux execution failed');
