"""Offline, stdlib-only verification of source-grounded final data-structure lessons."""
from pathlib import Path
from contextlib import redirect_stdout
from collections import deque,Counter
from fractions import Fraction
from math import isclose
import io,re,random
ROOT=Path(__file__).resolve().parents[1]
def load(slug):
 text=(ROOT/f'courses/oop-python/summaries/{slug}.md').read_text(encoding='utf-8-sig');blocks=re.findall(r'^```python\n(.*?)^```',text,re.M|re.S);assert len(blocks)==1
 ns={};out=io.StringIO()
 with redirect_stdout(out):exec(compile(blocks[0],slug,'exec'),ns)
 assert len(re.findall(r'^### ข้อ\d+ ',text,re.M))==6
 return ns

def raises(kind,fn):
 try:fn()
 except kind:return
 raise AssertionError('Expected '+kind.__name__)
s=load('stack');q=load('queue');basic=load('complexity-basic-sorting');advanced=load('advanced-sorting');h=load('hash-tables');rng=random.Random(506)
for kind in ['LinkedStack','ArrayStack']:
 a=s[kind]();ref=deque();raises(IndexError,a.pop);raises(IndexError,a.peek)
 for _ in range(600):
  if not ref or rng.random()<.55:v=rng.choice([None,-3,0,4]);a.push(v);ref.append(v)
  else:assert a.pop()==ref.pop()
  assert len(a)==len(ref) and a.is_empty()==(not ref)
  if ref:assert a.peek()==ref[-1]
  if kind=='LinkedStack':assert (a._head is None)==(not ref)
def balance_reference(text):
 text=''.join(c for c in text if c in '()[]{}')
 while True:
  reduced=text.replace('()','').replace('[]','').replace('{}','')
  if reduced==text:return not text
  text=reduced
for _ in range(600):
 text=''.join(rng.choice('()[]{}abc') for _ in range(rng.randrange(30)));assert s['is_balanced'](text)==balance_reference(text)
calc=s['PostfixCalculator']();assert calc.evaluate('5 1 2 + 4 * + 3 -')==14 and calc.evaluate('10 3 -')==7
for bad in ['', '1 2','1 +','x','nan','inf']:raises(ValueError,lambda:calc.evaluate(bad));assert calc.last_result==7
raises(ZeroDivisionError,lambda:calc.evaluate('1 0 /'));assert calc.last_result==7
# Independent rational expression-tree oracle, then serialize to postfix.
def expression(depth):
 if depth==0 or rng.random()<.3:
  n=rng.randrange(-8,9);return str(n),Fraction(n)
 left,a=expression(depth-1);right,b=expression(depth-1);op=rng.choice('+-*/')
 if op=='/' and b==0:op='+'
 value={'+':lambda:a+b,'-':lambda:a-b,'*':lambda:a*b,'/':lambda:a/b}[op]()
 return left+' '+right+' '+op,value
for _ in range(240):
 exp,expected=expression(4);assert isclose(calc.evaluate(exp),float(expected),rel_tol=1e-9,abs_tol=1e-8)
editor=s['TextEditor']();history=[''];cursor=0
for _ in range(400):
 action=rng.choice(['type','delete','undo','redo'])
 if action in ['type','delete']:
  addition=rng.choice(['','A','B','xy']);new=history[cursor]+addition if action=='type' else history[cursor][:-1]
  if action=='type':editor.type_text(addition)
  else:editor.delete_last()
  if new!=history[cursor]:history=history[:cursor+1]+[new];cursor+=1
 elif action=='undo':editor.undo();cursor=max(0,cursor-1)
 else:editor.redo();cursor=min(len(history)-1,cursor+1)
 assert editor.text==history[cursor]
assert s['factorial'](0)==1 and s['factorial'](4)==24;raises(ValueError,lambda:s['factorial'](-1))
for capacity in range(1,9):
 a=q['CircularQueue'](capacity);ref=deque()
 for _ in range(160):
  if rng.random()<.6:
   value=rng.choice([None,0,1,-1])
   if len(ref)==capacity:raises(OverflowError,lambda:a.enqueue(value))
   else:a.enqueue(value);ref.append(value)
  elif ref:assert a.dequeue()==ref.popleft()
  else:raises(IndexError,a.dequeue)
  assert a.items()==list(ref) and len(a)==len(ref)
  assert a.is_full()==(len(ref)==capacity) and a.is_empty()==(not ref)
  assert 0<=a._front<capacity and 0<=a._rear<capacity
  if ref:assert a.peek()==ref[0]
a=q['LinkedQueue']();ref=deque()
for _ in range(600):
 if not ref or rng.random()<.55:v=rng.choice([None,0,4]);a.enqueue(v);ref.append(v)
 else:assert a.dequeue()==ref.popleft()
 assert len(a)==len(ref)
 node=a._head;seen=set();values=[]
 while node:
  assert id(node) not in seen;seen.add(id(node));values.append(node.value);node=node.next
 assert values==list(ref)
 if not ref:assert a._head is a._tail is None
 else:assert a._tail.next is None and a.peek()==ref[0]
pq=q['PriorityQueue']();ref=[];counter=0
for i in range(500):
 if not ref or rng.random()<.6:
  priority=rng.randrange(-2,4);item={'id':i};pq.enqueue(item,priority);ref.append((priority,counter,item));counter+=1
 else:
  expected=min(ref,key=lambda x:x[:2]);ref.remove(expected);assert pq.dequeue()==(expected[2],expected[0])
 if ref:
  expected=min(ref,key=lambda x:x[:2]);assert pq.peek()==(expected[2],expected[0])
 assert len(pq)==len(ref)
for bad in [0,-1]:raises(ValueError,lambda:q['CircularQueue'](bad))
raises(TypeError,lambda:q['CircularQueue'](True));raises(TypeError,lambda:pq.enqueue({},True))
source=[5,3,8,1,2];expected_stats=[{'comparisons':10,'swaps':7},{'comparisons':10,'swaps':3},{'comparisons':9,'shifts':7}]
for fn,stats in zip(['bubble_sort','selection_sort','insertion_sort'],expected_stats):assert basic[fn](source)[1]==stats
for _ in range(200):
 data=[rng.randrange(-8,9) for _ in range(rng.randrange(41))];original=data.copy();ordered=sorted(data);inv=sum(data[i]>data[j] for i in range(len(data)) for j in range(i+1,len(data)))
 for name in ['bubble_sort','selection_sort','insertion_sort']:
  result,stats,trace=basic[name](data,trace=True);assert result==ordered and data==original
  assert all(Counter(a)==Counter(data) for a in trace)
  for i,a in enumerate(trace):
   if name=='bubble_sort':assert a[-i-1:]==ordered[-i-1:]
   if name=='selection_sort':assert a[:i+1]==ordered[:i+1]
   if name=='insertion_sort':assert a[:i+2]==sorted(data[:i+2])
  if name=='selection_sort':assert stats['comparisons']==len(data)*(len(data)-1)//2 and stats['swaps']<=max(0,len(data)-1)
  elif name=='bubble_sort':assert stats['swaps']==inv
  else:assert stats['shifts']==inv
 result,events=advanced['merge_sort'](data,trace=True);assert result==ordered and data==original
 for left,right,merged in events:assert left==sorted(left) and right==sorted(right) and merged==sorted(left+right)
 for median in [False,True]:
  result,stats,events=advanced['quick_sort'](data,median=median,trace=True);assert result==ordered and data==original
  for lo,hi,split,pivot,a in events:
   assert a[split]==pivot and all(x<=pivot for x in a[lo:split]) and all(x>pivot for x in a[split+1:hi+1]) and Counter(a)==Counter(data)
 # Identity tags test stability independently of key sorting.
 records=[(value,i) for i,value in enumerate(data)]
 for fn in [basic['bubble_sort'],basic['insertion_sort'],advanced['merge_sort']]:assert fn(records,key=lambda x:x[0])[0]==sorted(records,key=lambda x:x[0])
 for fn in [basic['selection_sort'],advanced['quick_sort']]:
  result=fn(records,key=lambda x:x[0])[0];assert [x[0] for x in result]==ordered and Counter(result)==Counter(records)
for data in [[],[1],list(range(32)),list(range(32))[::-1],[1]*32]:
 for median in [False,True]:assert advanced['quick_sort'](data,median=median)[0]==sorted(data)
assert advanced['quick_sort']([1]*32,median=True)[1]['comparisons']==496
assert advanced['merge']([1,3,5,8],[2,4,7,9])==[1,2,3,4,5,7,8,9]
tags=[(2,'A'),(2,'B'),(1,'C')]
assert basic['selection_sort'](tags,key=lambda x:x[0])[0]!=sorted(tags,key=lambda x:x[0])
assert advanced['quick_sort'](tags,key=lambda x:x[0])[0]!=sorted(tags,key=lambda x:x[0])
assert basic['days_left'](9,0)==float('inf') and basic['days_left'](10,2)==5
# Both hash models against dict under deliberate collisions, misses, None and full-table conditions.
for kind in ['ChainingHashTable','LinearProbingHashTable']:
 table=h[kind](8);ref={};keys=[h['ForcedKey'](str(i)) for i in range(12)]+[None]
 for _ in range(1600):
  key=rng.choice(keys);op=rng.choice(['insert','get','delete'])
  if op=='insert':
   value=rng.choice([None,-4,0,8])
   if kind=='LinearProbingHashTable' and len(ref)==8 and key not in ref:raises(OverflowError,lambda:table.insert(key,value))
   else:table.insert(key,value);ref[key]=value
  elif op=='get':
   if key in ref:assert table.get(key)==ref[key]
   else:raises(KeyError,lambda:table.get(key))
  elif key in ref:assert table.delete(key)==ref.pop(key)
  else:raises(KeyError,lambda:table.delete(key))
  assert len(table)==len(ref)
  for k,v in ref.items():assert table.get(k)==v
  if kind=='ChainingHashTable':assert sum(map(len,table._buckets))==len(ref) and len({id(x) for x in table._buckets})==table._capacity
 table.insert(h['ForcedKey']('updated'),1) if kind=='ChainingHashTable' else None
 raises(TypeError,lambda:table.insert([],1));raises(ValueError,lambda:h[kind](0))
# Tombstone-before-existing-key must update, not duplicate; a table of tombstones must terminate.
t=h['LinearProbingHashTable'](3);a,b,c=map(h['ForcedKey'],'ABC');t.insert(a,1);t.insert(b,2);t.delete(a);t.insert(b,42);assert len(t)==1 and t.get(b)==42
t.insert(c,3);t.delete(b);t.delete(c);t.insert(a,None);assert len(t)==1 and t.get(a) is None
x=h['ChainingHashTable'](4)
for i in range(3):x.insert(i,i)
x.insert(1,42);assert len(x)==3 and x._capacity==4;x.insert(3,9);assert x._capacity==8 and len(x)==4
class Mutable:pass
m=Mutable();d={m:1};m.value=2;assert d[m]==1
raises(TypeError,lambda:hash(([1,2],)))
print('PASS:5 final lessons/30 solved exercises;1200stack+600grammar+240Fraction+400undo cases;1280circular+600linkedqueue+500priority operations;200sorting datasets with traces/stability/partition invariants;3200collision/dict reference operations')
