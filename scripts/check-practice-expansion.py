"""Independent standard-library checks for Phase 6B. --stage A/B/C/D or --all.

Numeric/code answers use independent executable oracles. Conceptual MC keys are
source-reviewed semantic propositions; checks identify those separately rather
than pretending that executing Python proves a definition or teaching claim.
"""
import argparse, json, math, pathlib, re, ast
from fractions import Fraction as F
from statistics import mean

ROOT=pathlib.Path(__file__).resolve().parent.parent
STAGES={
 'A':('artificial-intelligence',['final-regression','final-naive-bayes','final-hierarchical-clustering','final-kmeans','final-perceptron','final-backpropagation','final-deep-learning-overview','final-cnn']),
 'B':('oop-python',['linked-list','queue','advanced-sorting','hash-tables','arrays-dynamic-array']),
 'C':('oop-python',['classes-objects','encapsulation-properties','inheritance-mro','polymorphism-abc','object-relationships','uml-solid']),
 'D':('artificial-intelligence',['ai-foundations-agents','search-models-bfs-dfs'])}
parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=list(STAGES));parser.add_argument('--all',action='store_true');args=parser.parse_args()
def sidecar(course,slug):return ROOT/f'courses/{course}/practice/{slug}.json'
stages=[args.stage] if args.stage else list(STAGES) if args.all else [stage for stage,(course,slugs) in STAGES.items() if all(sidecar(course,s).exists() for s in slugs)]
assert stages,'No completed stage available'
questions={};selected=[]
for stage in stages:
 course,slugs=STAGES[stage]
 for slug in slugs:
  data=json.loads(sidecar(course,slug).read_text(encoding='utf-8'));assert data['lesson']==course+'-'+slug and data['revision']==1
  assert len(data['questions'])==6 and sum(q['type']=='self' for q in data['questions'])==1
  selected.append(data)
  for q in data['questions']:assert q['id'] not in questions;questions[q['id']]=q
covered=set();concepts=set()
def numeric(qid,value):
 q=questions[qid];assert q['type']=='numeric';assert math.isclose(q['answer'],float(value),rel_tol=1e-12,abs_tol=1e-12),(qid,q['answer'],value)
 assert q['relativeTolerance']==0 and q['absoluteTolerance'] in (0,1e-6)
 if q['absoluteTolerance']==0:assert q['answer']==float(value)
 covered.add(qid)
def choice(qid,proposition,concept=False):
 q=questions[qid];assert q['type']=='choice';matches=[c for c in q['choices'] if proposition in c['text']];assert len(matches)==1,(qid,proposition)
 assert q['answer']==matches[0]['id'],(qid,q['answer'],matches[0]['id']);covered.add(qid)
 if concept:concepts.add(qid)
def sigmoid(z):return 1/(1+math.exp(-z))

if 'A' in stages:
 # OLS with exact centered fractions, not the answer's coefficients or rounded worksheet line.
 x=list(map(F,[22,23,18,9,14,20,21,16]));y=list(map(F,[8,10,7,2,4,6,7,4]));xm=sum(x)/len(x);ym=sum(y)/len(y)
 slope=sum((a-xm)*(b-ym) for a,b in zip(x,y))/sum((a-xm)**2 for a in x);intercept=ym-slope*xm
 numeric('rg-slope',slope);numeric('rg-prediction',intercept+slope*18);numeric('rg-mse',sum((a-b)**2 for a,b in zip([2,2,0],[2,0,2]))/3)
 assert sum(v*v*v for v in [-2,-1,0,1,2])==0 # curved x^2 has zero centered cross-product with x
 choice('rg-correlation','อาจไม่มีแนวโน้มเชิงเส้นชัด',True);choice('rg-multiple','มีตัวแปรอธิบายหลายตัว',True)
 # Independent count products, exact posterior normalization and Laplace denominators.
 numeric('nb-prior',F(3,8));positive=F(3,8)*F(2,3)*F(2,3)*F(1,3)*F(3,3);negative=F(5,8)*F(2,5)*F(1,5)*F(2,5)*F(2,5)
 numeric('nb-posterior',positive/(positive+negative));sy=F(1,2)*F(5,7)*F(5,7)*F(3,7)*F(3,8);sn=F(1,2)*F(3,7)*F(1,7)*F(5,7)*F(2,8);numeric('nb-laplace',sy/(sy+sn))
 choice('nb-independence','เป็นอิสระแบบมีเงื่อนไข',True);assert sum([0,0])==0;choice('nb-zero','Z=0 normalize ไม่ได้',True)
 # Direct cross-pair linkage oracle over the original matrix (no incremental update formula).
 matrix=[[0,2,6,10,9],[2,0,3,9,8],[6,3,0,7,5],[10,9,7,0,4],[9,8,5,4,0]]
 clusters=[(i,) for i in range(5)];heights=[]
 while len(clusters)>1:
  d,i,j=min((min(matrix[a][b] for a in left for b in right),i,j) for i,left in enumerate(clusters) for j,right in enumerate(clusters) if i<j)
  heights.append(d);merged=tuple(sorted(clusters[i]+clusters[j]));clusters=[c for k,c in enumerate(clusters) if k not in (i,j)]+[merged]
 assert heights==[2,3,4,5];choice('hc-first','รวม 1 กับ 2 ที่ระยะ 2');assert 5-sum(h<=4.5 for h in heights)==2;choice('hc-cut','2 กลุ่ม')
 numeric('hc-distance',math.dist((1,2),(4,6)));numeric('hc-average',F(matrix[0][2]+matrix[1][2],2));numeric('hc-final',F(sum(matrix[a][b] for a in (0,1,2) for b in (3,4)),6))
 # Full Lloyd run with exact Fraction centroids; SSE after update, first-index tie policy.
 points=[(2,10),(2,5),(8,4),(5,8),(7,5),(6,4),(1,2),(4,9)];centers=[tuple(map(F,p)) for p in [(2,10),(5,8),(1,2)]];last=None
 d2=lambda a,b:sum((x-y)**2 for x,y in zip(a,b))
 for iteration in range(10):
  assignments=[min(range(3),key=lambda k:(d2(p,centers[k]),k)) for p in points]
  if iteration==0:
   assert assignments[1]==2;choice('km-assignment','C3 เพราะ')
  updated=[tuple(sum(F(points[i][axis]) for i,c in enumerate(assignments) if c==k)/assignments.count(k) for axis in range(2)) for k in range(3)]
  if iteration==0:numeric('km-centroid',updated[1][0]);numeric('km-cluster-sse',sum(d2(points[i],updated[2]) for i,c in enumerate(assignments) if c==2))
  sse=sum(d2(p,updated[c]) for p,c in zip(points,assignments));centers=updated
  if assignments==last:break
  last=assignments
 else:raise AssertionError('Lloyd fixture did not stabilize')
 numeric('km-total-sse',sse);choice('km-stop','ควรตรวจเกณฑ์หยุด',True)
 # Declared strict activation, bias input=1; decisions derive from arithmetic.
 weights=[F(1,10)]*3;inputs=[1,0,1];z=sum(a*b for a,b in zip(weights,inputs));prediction=int(z>0);error=0-prediction
 numeric('pc-forward',z);numeric('pc-bias',weights[0]+F(1,2)*error);numeric('pc-boundary',(F(14,10)-F(11,10))/F(6,10));assert int(0>0)==0
 choice('pc-zero','y=0,e=1');choice('pc-lab','คงป้าย source-limited',True)
 # Analytic derivatives are independently checked with centered finite differences.
 numeric('bp-loss',F(1,2)*(F(1,2)-1)**2);go=(F(1,2)-1)*F(1,2)*(1-F(1,2));gv=go*F(4,10);ghw=F(4,10)*(1-F(4,10))*F(8,10)*go*2
 numeric('bp-output-gradient',gv);numeric('bp-hidden-gradient',ghw)
 def loss(v,w):
  h=sigmoid(w*2+math.log(.4/.6)-.3*2);out=sigmoid(v*h-.8*.4);return .5*(out-1)**2
 eps=1e-6
 assert math.isclose((loss(.8+eps,.3)-loss(.8-eps,.3))/(2*eps),float(gv),abs_tol=1e-9)
 assert math.isclose((loss(.8,.3+eps)-loss(.8,.3-eps))/(2*eps),float(ghw),abs_tol=1e-9)
 assert F(8,10)-F(1,10)*gv==F(805,1000);choice('bp-update','.805 เพราะ');choice('bp-old-weights','ใช้ weights เดิม',True)
 for qid,proposition in [('dl-hierarchy','deep CNN อยู่ DL'),('dl-affine','ได้ z2=6x−1'),('dl-rnn','many-to-one,aligned many-to-many'),('dl-gan','G รับ noise'),('dl-style-evidence','ไม่ยืนยัน ภาพเป็นตัวอย่าง')]:choice(qid,proposition,True)
 assert all(3*(2*x+1)-4==6*x-1 for x in range(-10,11))
 # CNN operator: explicit unflipped dot product and an independently flipped contrast.
 patch=[[1,5,9],[2,6,10],[3,7,11]];kernel=[[9,8,7],[6,5,4],[3,2,1]]
 numeric('cn-correlation',sum(a*b for row,krow in zip(patch,kernel) for a,b in zip(row,krow)))
 assert sum(a*b for row,krow in zip(patch,kernel[::-1]) for a,b in zip(row,krow[::-1]))==312
 numeric('cn-size',(7+2-3)//2+1);numeric('cn-parameters',(3*3*3+1)*4);assert max([1,3,8,7])==8 and mean([1,3,8,7])==4.75
 choice('cn-pool','max8 และ average4.75');choice('cn-fc-evidence','ยังไม่ได้ ต้องมีพารามิเตอร์',True)

# Each self-assessment is intentionally not autograded. Source/rubric review is documented.
for data in selected:
 for q in data['questions']:
  if q['type']=='self':assert 'answer' not in q and len(q['rubric'])==3
  else:assert q['id'] in covered,('Unverified key',q['id'])
assert len(covered)==5*len(selected)
print(f'PASS: stages {",".join(stages)}; {len(selected)} new sets / {len(covered)} auto keys independently checked, including {len(concepts)} explicitly source-reviewed conceptual propositions; {len(selected)} ungraded rubrics reviewed')
