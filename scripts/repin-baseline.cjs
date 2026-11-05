/* Record a deliberate change to files pinned by scripts/database-preservation.json.
 * Name each reviewed file explicitly: node scripts/repin-baseline.cjs assets/preferences.css index.html
 * There is deliberately no "repin everything" mode, so an accidental edit still fails check.cjs.
 */
const fs=require('node:fs'),crypto=require('node:crypto'),P=require('./database-preservation.cjs');
const baselinePath='scripts/database-preservation.json',baseline=JSON.parse(fs.readFileSync(baselinePath,'utf8'));
const read=f=>fs.readFileSync(f,'utf8').replace(/\r\n/g,'\n'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const files=process.argv.slice(2);
if(!files.length){console.error('Usage: node scripts/repin-baseline.cjs <file> [file...]');process.exit(1)}
for(const file of files){
  if(file in baseline.files){
    const bytes=fs.readFileSync(file),binary=/\.(pdf|webp|png|woff2?|ttf|eot|jpe?g)$/i.test(file);
    baseline.files[file]=hash(binary?bytes:Buffer.from(read(file)));
  }else if(baseline.reviewedMutable&&file in baseline.reviewedMutable){
    baseline.reviewedMutable[file]=hash(P.normalize(file,Buffer.from(read(file))));
  }else{console.error('Not pinned: '+file);process.exit(1)}
  console.log('Repinned '+file);
}
fs.writeFileSync(baselinePath,JSON.stringify(baseline,null,2)+'\n');
