"""Independent exact/decimal calculations and unwrapped-time state oracle. No source hardware claims."""
from pathlib import Path
from fractions import Fraction as F
from decimal import Decimal, ROUND_HALF_UP
import json, math, random
ROOT=Path(__file__).resolve().parents[1]
cases=json.loads((ROOT/'scripts/iot-verification.json').read_text(encoding='utf-8'))['cases']
questions={q['id']:q for folder in ['practice','exam'] for p in (ROOT/'courses/internet-of-things'/folder).glob('*.json') for q in json.loads(p.read_text(encoding='utf-8'))['questions']}
def calc(oracle):
    kind,value=next(iter(oracle.items()))
    a=[F(str(x)) for x in value] if isinstance(value,list) and kind not in ['round','echoRounded'] else value
    if kind=='sum':return sum(a)
    if kind=='subtract':return a[0]-a[1]
    if kind=='multiply':return math.prod(a)
    if kind=='ratio':return a[0]/a[1]*a[2]
    if kind=='clamp':return min(max(a[0],a[1]),a[2])
    if kind=='power':return a[0]**int(a[1])
    if kind=='divider':return a[0]*a[2]/(a[1]+a[2])
    if kind=='led':return (a[0]-a[1])/a[2]*1000
    # SI calculation independent from the lesson's centimetre shortcut.
    if kind in ['distance','roundtrip']:return a[0]/1000000*a[1]*100/(2 if kind=='distance' else 1)
    if kind=='echo':return 2*(a[0]/100)/a[1]*1000000
    if kind=='round':return Decimal(value[0]).quantize(Decimal(1).scaleb(-value[1]),rounding=ROUND_HALF_UP)
    if kind=='echoRounded':return Decimal(str(float(2*F(str(value[0]))/100/F(str(value[1]))*1000000))).quantize(Decimal(1).scaleb(-value[2]),rounding=ROUND_HALF_UP)
    if kind=='rises':return sum(x==0 and y==1 for x,y in zip(a,a[1:]))
    raise AssertionError(kind)
checked=0
for c in cases:
    if c['kind']!='numeric':continue
    answer=float(calc(c['oracle']));q=questions[c['question']]
    assert math.isclose(answer,float(c['conclusion']),abs_tol=max(q['absoluteTolerance'],1e-12),rel_tol=0),(c['question'],answer,c['conclusion'])
    checked+=1
assert checked==28
# Exact water-policy partition, including invalid/NaN/infinity and every stated boundary.
def water(d,echo=True):
    if not echo or not math.isfinite(d) or not 2<=d<=400:return 'ERROR'
    return next(name for low,high,name in [(2,30,'RED'),(30,50,'YELLOW'),(50,400,'GREEN')] if low<=d<=high)
expected={1.5:'ERROR',2:'RED',20:'RED',29.9:'RED',30:'RED',30.1:'YELLOW',40:'YELLOW',50:'YELLOW',50.1:'GREEN',60:'GREEN',400:'GREEN',400.1:'ERROR'}
for d,v in expected.items():assert water(d)==v
assert water(0,False)==water(float('nan'))==water(float('inf'))=='ERROR'
# Absolute unwrapped timestamps are the oracle; modulo subtraction is the implementation under test.
def compare(trace):
    on=False;last=0;state=False;seen=0
    for absolute,motion in trace:
        if motion:on=True;last=absolute
        elif on and absolute-last>=10000:on=False
        now=absolute%(2**32)
        if motion:state=True;seen=now
        elif state and (now-seen)%(2**32)>=10000:state=False
        assert (state,seen)==(on,last%(2**32))
        if motion:assert state
    return on,last
trace=[(0,False),(1000,True),(9000,True),(11000,False),(18999,False),(19000,False)]
assert compare(trace)==(False,9000)
assert compare([(999999,False)])==(False,0)
assert compare([(1000,True),(11000,True),(20999,False)])==(True,11000)
rng=random.Random(13013)
for start in [0,2**32-256,2**32+123]:
    t=start;events=[]
    for _ in range(1000):t+=rng.randrange(0,15000);events.append((t,rng.random()<.2))
    compare(events)
assert len('Motion Detected')==15
print(f'PASS: {checked} independent exact/decimal numeric keys;15 water boundary/invalid cases;3000 randomized absolute-time/rollover observations plus startup/retrigger/deadline traces')
