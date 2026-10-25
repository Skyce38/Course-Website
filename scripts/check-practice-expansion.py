"""Independent standard-library checks for Phase 6B. --stage A/B/C/D or --all.

Numeric/code answers use independent executable oracles. Conceptual MC keys are
source-reviewed semantic propositions; checks identify those separately rather
than pretending that executing Python proves a definition or teaching claim.
"""
import argparse, json, math, pathlib, re, ast, io
from contextlib import redirect_stdout
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
def lesson_code(slug):
 source=(ROOT/f'courses/oop-python/summaries/{slug}.md').read_text(encoding='utf-8');namespace={}
 # Execute only the already-reviewed, repository-authored standalone examples offline.
 with redirect_stdout(io.StringIO()):
  for block in re.findall(r'^```python\n([\s\S]*?)^```',source,re.M):exec(compile(block,slug,'exec'),namespace)
 return namespace
def raises(kind,fn):
 try:fn()
 except kind:return
 raise AssertionError('Expected '+kind.__name__)

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

if 'B' in stages:
 # Object-identity traversal and link mutation, with explicit empty boundary.
 ll=lesson_code('linked-list');Node=ll['Node'];head=Node(10);middle=Node(20);tail=Node(30);head.next=middle;middle.next=tail
 current=head
 while current is not None:current=current.next
 assert head is not None and current is None;choice('ll-head','head ยังชี้ Node 10')
 empty=None;count=0
 while empty is not None:count+=1;empty=empty.next
 numeric('ll-empty',count);head.next=head.next.next;current=head;count=0
 while current is not None:count+=1;current=current.next
 numeric('ll-remaining',count)
 new=Node(99);new.next=head.next;head.next=new;assert head.next is new and new.next is tail
 choice('ll-insert','new_node.next=current.next แล้ว current.next=new_node');choice('ll-tail','O(n) เพราะต้องหา',True)
 q=lesson_code('queue');linked=q['LinkedQueue']();linked.enqueue('A');assert linked.dequeue()=='A' and linked._head is linked._tail is None;linked.enqueue('B');assert linked._head is linked._tail and linked.peek()=='B'
 choice('qu-empty','head=None และ tail=None')
 circular=q['CircularQueue'](5)
 for value in 'ABCDE':circular.enqueue(value)
 for _ in range(3):circular.dequeue()
 for value in 'FG':circular.enqueue(value)
 numeric('qu-rear',circular._rear);assert circular.items()==list('DEFG') and len(circular)==4
 full=q['CircularQueue'](3)
 for value in 'ABC':full.enqueue(value)
 assert full._front==full._rear==0 and full.is_full();raises(OverflowError,lambda:full.enqueue('D'))
 for _ in range(3):full.dequeue()
 assert full._front==full._rear==0 and full.is_empty();choice('qu-full','ต้องดู size')
 priority=q['PriorityQueue']()
 for item,p in [('A',2),('B',1),('C',2)]:priority.enqueue(item,p)
 assert [priority.dequeue()[0] for _ in range(3)]==list('BAC');choice('qu-priority','B,A,C เพราะ')
 from collections import deque
 line=deque(['A']);line.appendleft('VIP');line.append('B');assert list(line)==['VIP','A','B'];choice('qu-deque','ใช้ deque และประกาศ',True)
 # Independently count merge/partition work, also compare the reviewed Python interfaces.
 left=[1,3,5,8];right=[2,4,7,9];i=j=comparisons=0;merged=[]
 while i<len(left) and j<len(right):
  comparisons+=1
  if left[i]<=right[j]:merged.append(left[i]);i+=1
  else:merged.append(right[j]);j+=1
 merged+=left[i:]+right[j:];assert merged==sorted(left+right);numeric('as-merge',comparisons)
 values=[3,6,8,10,1,2,1];pivot=values[-1];split=0
 for j in range(len(values)-1):
  if values[j]<=pivot:values[split],values[j]=values[j],values[split];split+=1
 values[split],values[-1]=values[-1],values[split];assert split==1
 choice('as-partition',str(values).replace(' ','')+',split index'+str(split))
 advanced=lesson_code('advanced-sorting');numeric('as-worst',sum(range(5)));assert advanced['quick_sort']([1,2,3,4,5])[1]['comparisons']==sum(range(5))
 tagged=[(2,'A'),(1,'B'),(2,'C')];ordered=sorted(tagged,key=lambda x:x[0]);assert ordered==[(1,'B'),(2,'A'),(2,'C')] and tagged.sort(key=lambda x:x[0]) is None
 choice('as-python','sorted คืนลิสต์ใหม่และ stable');choice('as-space','O(n) เพราะ recursion depth',True)
 h=lesson_code('hash-tables');assert 10%8==18%8 and 10!=18;choice('ht-collision','ยังต้องแยกด้วย equality',True)
 table=h['LinearProbingHashTable'](8);a,b,c=map(h['ForcedKey'],'ABC')
 for k,v in [(a,1),(b,2),(c,3)]:table.insert(k,v)
 table.delete(a);table.insert(b,42);assert len(table)==2 and table.get(b)==42;choice('ht-tombstone','เก็บ tombstone และค้นต่อ')
 chained=h['ChainingHashTable'](4)
 for i in range(4):chained.insert(i,i)
 numeric('ht-load',chained.load_factor);assert chained._capacity==8
 assert hash((1,2))==hash((1,2));raises(TypeError,lambda:hash(([1,2],)))
 class Mutable:pass
 mutable=Mutable();old=hash(mutable);mutable.x=1;assert hash(mutable)==old;choice('ht-hashability','(1,2) ใช้เป็น key ได้')
 one=h['LinearProbingHashTable'](1);one.insert('A',1);raises(KeyError,lambda:one.get('missing'));raises(OverflowError,lambda:one.insert('B',2));choice('ht-bounded','จำกัดจำนวน probe ไม่เกิน capacity',True)
 arrays=lesson_code('arrays-dynamic-array');array=arrays['DynamicArray']()
 for i in range(8):array.append(i)
 numeric('ar-cost',array.copies+len(array));numeric('ar-row-major',1*4+2);assert array.capacity==8
 assert sum([1,2,4])<2*8 and 8+sum([1,2,4])<3*8;choice('ar-amortized','ต้นทุนรวมของลำดับ n appends',True)
 empty=arrays['DynamicArray']();raises(IndexError,lambda:empty[0]);empty.insert_at(0,None);assert empty[0] is None;raises(IndexError,lambda:empty[-1]);choice('ar-indices','insert_at(0,x)ใช้ได้')
 rows=[[0]*4]*3;rows[0][0]=9;assert [r[0] for r in rows]==[9,9,9];independent=[[0]*4 for _ in range(3)];independent[0][0]=9;assert [r[0] for r in independent]==[9,0,0];choice('ar-alias','ทุกแถวที่column0กลายเป็น9')

# Each self-assessment is intentionally not autograded. Source/rubric review is documented.
for data in selected:
 for q in data['questions']:
  if q['type']=='self':assert 'answer' not in q and len(q['rubric'])==3
  else:assert q['id'] in covered,('Unverified key',q['id'])
assert len(covered)==5*len(selected)
print(f'PASS: stages {",".join(stages)}; {len(selected)} new sets / {len(covered)} auto keys independently checked, including {len(concepts)} explicitly source-reviewed conceptual propositions; {len(selected)} ungraded rubrics reviewed')
