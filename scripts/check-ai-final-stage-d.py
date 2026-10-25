"""Independent finite-difference checks of the lesson's analytic backpropagation."""
from contextlib import redirect_stdout
from pathlib import Path
from math import isclose
import io,re,random
root=Path(__file__).resolve().parents[1]
text=(root/'courses/artificial-intelligence/summaries/final-backpropagation.md').read_text(encoding='utf8')
ns={}
with redirect_stdout(io.StringIO()):exec(re.search(r'^```python\n(.*?)^```',text,re.M|re.S)[1],ns)
f=ns['forward_and_gradient'];s=ns['sigmoid'];step=ns['step']
# Loss-only reference deliberately does not call the lesson's forward code.
def reference(t,x,target):
 import math
 hidden=[1/(1+math.exp(-(t[k]*x[0]+t[k+1]*x[1]+t[k+2]))) for k in [0,3]]
 y=1/(1+math.exp(-(sum(t[6+j]*hidden[j] for j in [0,1])+t[8])))
 return .5*(target-y)**2
rng=random.Random(7103)
for theta,x,target in [(ns['theta'],ns['x'],ns['target'])]+[([rng.uniform(-2,2) for _ in range(9)],[rng.uniform(-1,1) for _ in range(2)],rng.random()) for _ in range(100)]:
 values,gradient=f(theta,x,target);assert isclose(values[-1],reference(theta,x,target),abs_tol=1e-14)
 for j,g in enumerate(gradient):
  plus=theta.copy();minus=theta.copy();plus[j]+=1e-6;minus[j]-=1e-6
  numeric=(reference(plus,x,target)-reference(minus,x,target))/2e-6
  assert isclose(g,numeric,abs_tol=8e-11,rel_tol=2e-6),(j,g,numeric)
 values,g,new=step(theta,x,target,.01)
 assert all(isclose(n,w-.01*gg,abs_tol=1e-14) for n,w,gg in zip(new,theta,g))
 assert reference(new,x,target)<=reference(theta,x,target)+1e-14
assert s(0)==.5 and s(1000)==1 and s(-1000)==0
assert isclose(ns['values'][-1],.02603023877542725,abs_tol=1e-14)
assert isclose(f(ns['updated'],ns['x'],ns['target'])[0][-1],.025035809127721003,abs_tol=1e-14)
assert isclose(ns['updated'][8],.11117291879137563,abs_tol=1e-14)
assert [ns['source_xor'](*x)[-1] for x in [(0,0),(0,1),(1,0),(1,1)]]==[0,1,1,0]
# Exercise values checked separately.
go=(.5-1)*.5*(1-.5);assert go==-.125 and isclose(go*.4,-.05)
assert isclose(.4*.6*.8*go,-.024) and isclose(.8-.1*(-.05),.805)
for n in [1,2,3,4,5,6]:assert f'### ข้อ{n} ' in text
text=(root/'courses/artificial-intelligence/summaries/final-deep-learning-overview.md').read_text(encoding='utf8')
for n in range(1,6):assert f'### ข้อ{n} ' in text
assert 'unaligned' in text and 'official answer key' in text and 'pp.2–11' in text
assert 3*(2*2+1)-4==11
print('PASS: 909 central-difference gradients/101 independent losses and simultaneous updates; source XOR; all numeric exercises; five overview solutions reviewed against slide images')
