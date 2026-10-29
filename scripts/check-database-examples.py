"""Optional authoring checks: PHP fence lint and real local Git state transitions.
No source ZIP execution, remote push, existing repository changes or secret reads.
"""
from pathlib import Path
import json,os,re,subprocess,tempfile
ROOT=Path(__file__).resolve().parents[1]
php=os.environ.get('STUDY_PHP');linted=0
if php:
    for md in (ROOT/'courses/database-management/summaries').glob('*.md'):
        for code in re.findall(r'^```php\n([\s\S]*?)\n```',md.read_text(encoding='utf8'),re.M):
            result=subprocess.run([php,'-n','-l'],input=code,text=True,encoding='utf8',capture_output=True)
            assert result.returncode==0,(md.name,result.stdout,result.stderr);linted+=1
    result=subprocess.run([php,'-n','-l',str(ROOT/'courses/database-management/examples/learning-examples.php')],capture_output=True,text=True)
    assert result.returncode==0,result.stdout
helper=(ROOT/'courses/database-management/examples/learning-examples.php').read_text(encoding='utf8')
snippets=re.findall(r'// snippet:([^\n]+)\n([\s\S]*?)// end:\1',helper)
content='\n'.join(p.read_text(encoding='utf8') for p in (ROOT/'courses/database-management/summaries').glob('*.md'))
for name,code in snippets:assert '```php\n<?php\n'+code.strip()+'\n```' in content,('Lesson/helper drift',name)
with tempfile.TemporaryDirectory(prefix='study-database-git-') as temporary:
    work=Path(temporary).resolve()
    assert work.parent==Path(tempfile.gettempdir()).resolve()
    def git(*args):
        p=subprocess.run(['git',*args],cwd=work,capture_output=True,text=True,encoding='utf8')
        assert p.returncode==0,(args,p.stderr);return p.stdout
    git('-c','init.templateDir=','init','--initial-branch=main')
    git('config','user.name','Study Fixture');git('config','user.email','fixture@example.invalid')
    git('config','commit.gpgsign','false');git('config','core.hooksPath',str(work/'no-hooks'))
    (work/'README.md').write_text('first\n',encoding='utf8');git('add','README.md');git('commit','-m','Initial isolated fixture')
    (work/'README.md').write_text('staged\n',encoding='utf8');git('add','README.md')
    (work/'README.md').write_text('working later\n',encoding='utf8')
    assert git('show',':README.md')=='staged\n';assert git('diff','--cached') and git('diff')
    git('commit','-m','Index snapshot');assert git('show','HEAD:README.md')=='staged\n'
    assert (work/'README.md').read_text()=='working later\n'
    git('add','README.md');git('commit','-m','Keep later change')
    git('switch','-c','feature/skill-list');(work/'skill-list.php').write_text('<?php echo "demo";\n')
    git('add','skill-list.php');git('commit','-m','Reviewed local example')
    git('switch','main');git('merge','--ff-only','feature/skill-list');assert (work/'skill-list.php').exists()
    (work/'.env').write_text('PLACEHOLDER=not-a-credential\n');git('add','.env');git('commit','-m','Harmless tracked fixture')
    (work/'.gitignore').write_text('.env\n');assert git('ls-files','.env').strip()=='.env'
    (work/'ignored.env').write_text('PLACEHOLDER\n');(work/'.gitignore').write_text('.env\nignored.env\n')
    assert git('check-ignore','ignored.env').strip()=='ignored.env';assert git('remote','-v')==''
report={'phpFencesLinted':linted,'phpLint':'PASS' if php else 'NOT RUN: set STUDY_PHP',
        'helperExcerpts':len(snippets),'git':'PASS: actual Index/working/commit,branch/fast-forward,tracked-ignore semantics in a new local-only repository',
        'notClaimed':['remote push or PR execution in teaching examples','Apache/HTTPS/Angsila deployment']}
if os.environ.get('STUDY_EXAMPLES_REPORT'):Path(os.environ['STUDY_EXAMPLES_REPORT']).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(report,ensure_ascii=False))
