"""Standard-library-only OOP author checks. Executes lesson examples, never source submissions."""
from pathlib import Path
from contextlib import redirect_stdout
from math import isclose,pi
import io,re,random
ROOT=Path(__file__).resolve().parents[1]
SLUGS=['classes-objects','encapsulation-properties','inheritance-mro','polymorphism-abc','object-relationships','uml-solid','arrays-dynamic-array']
def load(slug):
 text=(ROOT/f'courses/oop-python/summaries/{slug}.md').read_text(encoding='utf-8-sig');blocks=re.findall(r'^```python\n(.*?)^```',text,re.M|re.S);assert len(blocks)==1,slug
 ns={};output=io.StringIO()
 with redirect_stdout(output):exec(compile(blocks[0],slug,'exec'),ns)
 assert len(re.findall(r'^### ข้อ\d+ ',text,re.M))>=5
 return ns,output.getvalue()
def raises(kind,fn):
 try:fn()
 except kind:return
 raise AssertionError('Expected '+kind.__name__)
lessons={s:load(s) for s in SLUGS}
n,out=lessons['classes-objects'];B=n['BankAccount'];a=B('A',1000);b=B('B');a.deposit(500);a.withdraw(200);assert (a.balance,b.balance)==(1300,0);alias=a;alias.deposit(100);assert a.balance==1400
for bad in [0,-1,2000]:raises(ValueError,lambda:a.withdraw(bad));assert a.balance==1400
assert 'Alice: 1400.00 Bob: 300.00' in out
n,_=lessons['encapsulation-properties'];A=n['Account'];a=A('x','A',100)
for bad in ['100',True,None]:raises(TypeError,lambda:setattr(a,'balance',bad))
for bad in [-1,float('nan'),float('inf')]:raises(ValueError,lambda:setattr(a,'balance',bad))
a.deposit(20);a.withdraw(30);assert (a.balance,a.transaction_count)==(90,2);raises(ValueError,lambda:a.withdraw(100));assert (a.balance,a.transaction_count)==(90,2)
raises(AttributeError,lambda:setattr(a,'owner','B'));a.balance=200;assert a.transaction_count==2
n,out=lessons['inheritance-mro'];S=n['SavingsAccount'];s=S('x','N',10000,.03);assert s.apply_interest()==300 and s.balance==10300;s.withdraw(9800);assert (s.balance,s.transaction_count)==(500,2);raises(ValueError,lambda:s.withdraw(1));assert s.balance==500
z=S('x','N',1000,0);assert z.apply_interest()==0 and z.transaction_count==0
for bad in [-.01,.11,float('nan')]:raises(ValueError,lambda:S('x','A',1000,bad))
assert [c.__name__ for c in n['D'].__mro__]==['D','B','C','A','object'];assert n['D']().chain()==['D','B','C','A']
n,_=lessons['polymorphism-abc'];C=n['Circle'];R=n['Rectangle'];Shape=n['Shape'];raises(TypeError,Shape)
class Missing(Shape):
 def area(self):return 0
raises(TypeError,Missing)
assert isclose(C(2).area(),4*pi) and R(3,4).perimeter()==14
assert n['total_area']([R(2,2),n['Badge']()])==5
for bad in [0,-1,float('nan')]:raises(ValueError,lambda:C(bad))
raises(TypeError,lambda:C(True));assert issubclass(C,Shape) and not isinstance(n['Badge'](),Shape)
n,_=lessons['object-relationships'];P=n['Player'];T=n['Team'];p=P('A');a=T('A');b=T('B');a.add_player(p);snapshot=a.players;raises(ValueError,lambda:a.add_player(p));a.remove_player(p);b.add_player(p);snapshot[0].score();assert a.players==() and b.players[0] is p and p.goals==1 and len(snapshot)==1
h=n['House']()
for name,area in [('L',20),('K',12),('B',6)]:h.add_room(name,area)
assert (h.room_count,h.total_area)==(3,38);raises(ValueError,lambda:h.add_room('bad',0));assert h.room_count==3
n,_=lessons['uml-solid'];log=n['MemoryLog']();service=n['NotificationService'](log);assert service.notify(n['Push'](),'A','hello')=='Push:A:hello';assert log.entries==['Push:A:hello'];assert len(service.notify(n['SMS'](),'A','x'*200).split(':')[-1])==160
assert n['client_area'](n['Rectangle'](2,3))==20 and n['client_area'](n['CoupledSquare'](2))==16
n,out=lessons['arrays-dynamic-array'];D=n['DynamicArray'];a=D();cost=[]
for i in range(8):
 before=a.copies;a.append(i);cost.append(a.copies-before+1)
assert cost==[1,2,3,1,5,1,1,1] and a.capacity==8 and a.copies==7
b=D()
for v in [10,20,30,40]:b.append(v)
b.insert_at(1,99);assert list(b)==[10,99,20,30,40];assert b.remove_at(1)==99 and list(b)==[10,20,30,40]
empty=D();raises(IndexError,empty.pop);raises(IndexError,lambda:empty[0]);raises(IndexError,lambda:b[-1]);raises(TypeError,lambda:b[True]);empty.insert_at(0,None);assert empty.pop() is None and len(empty)==0
f=n['FixedArray'](1);f.add(None);assert f.get(0) is None;raises(OverflowError,lambda:f.add(1));raises(ValueError,lambda:n['FixedArray'](0))
m=n['Matrix'](3,4);m[1,2]=7;assert m._index((1,2))==6 and m[1,2]==7;raises(IndexError,lambda:m[3,0])
# Independent Python list oracle after every mutation, including None/duplicates/boundary inserts.
rng=random.Random(505)
for trial in range(40):
 a=D();ref=[]
 for _ in range(80):
  action=rng.choice(['append','insert','remove','set','pop','find']);value=rng.choice([None,-2,0,2,2,9])
  if action=='append':a.append(value);ref.append(value)
  elif action=='insert':i=rng.randrange(len(ref)+1);a.insert_at(i,value);ref.insert(i,value)
  elif action=='remove' and ref:i=rng.randrange(len(ref));assert a.remove_at(i)==ref.pop(i)
  elif action=='set' and ref:i=rng.randrange(len(ref));a[i]=value;ref[i]=value
  elif action=='pop' and ref:assert a.pop()==ref.pop()
  elif action=='find':assert a.find(value)==(ref.index(value) if value in ref else -1)
  assert list(a)==ref and 0<=len(a)<=a.capacity and all(v is None for v in a._data[len(a):])
for count in [1,2,3,8,9,16,17,100,1000]:
 a=D()
 for i in range(count):a.append(i)
 assert a.copies<2*count and count+a.copies<3*count
print('PASS:7 standalone lessons/35 solved exercises; Python outputs/exceptions, properties/MRO/ABC/identity/SOLID;3200 independent array operations, row-major and amortized boundaries')
