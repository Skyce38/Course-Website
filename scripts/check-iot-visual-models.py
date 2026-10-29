"""Independent numerical/source-code/diagram topology checks. No physical hardware certification."""
from pathlib import Path
from fractions import Fraction as F
import json,re,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
spec=json.loads((ROOT/'scripts/iot-visuals.json').read_text(encoding='utf-8'))['assets']
def labels(n):return [t.text for t in ET.parse(ROOT/spec[n-1]['svg']).getroot().iter('{http://www.w3.org/2000/svg}text')]
assert F(343)*100/1000000==F('0.0343')
assert F(500)*F('0.0343')==F('17.15')
assert F(500)*F('0.0343')/2==F('8.575')
assert '500 × 0.0343 = 17.15cm' in labels(9) and '17.15 / 2 = 8.575cm' in labels(9)
assert 2**12==4096 and 'ช่วง Raw: 0 … 4095' in labels(6)
assert F(5)*15/(10+15)==3
# Nominal comparison only: ESP32 datasheet5.3/Table5-3, physicalp.52, VDD3.3V/25C.
assert F('0.75')*F('3.3')<=3<=F('3.3')+F('.3')
assert F('3.3')-F(2)>0 and F('3.3')-F(2)<F(330)*F('.004')
for d,h in [(60,40),(20,80)]:assert 100-d==h
assert 'd = 60cm → h = 40cm' in labels(11) and 'd = 20cm → h = 80cm' in labels(11)
water=(ROOT/'courses/internet-of-things/summaries/final-water-level.md').read_text(encoding='utf-8')
for expr in ['TRIG=32','ECHO=33','GREEN=25','YELLOW=26','RED=27','cm <= 30.0f','cm <= 50.0f','cm>=2.0f && cm<=400.0f']:assert expr in water
assert all(v in ' '.join(labels(10)) for v in ['10kΩ','15kΩ','GPIO33','330Ω'])
# Independent connectivity audit of actual SVG wire segments. Echo can reach GPIO33 only through Rtop.
root=ET.parse(ROOT/spec[9]['svg']).getroot();ns='{http://www.w3.org/2000/svg}'
rects=[{k:float(v) for k,v in e.attrib.items() if k in ['x','y','width','height']} for e in root.iter(ns+'rect')]
def containing(text):
 t=next(t for t in root.iter(ns+'text') if t.text==text);x,y=map(float,[t.attrib['x'],t.attrib['y']]);return next(r for r in rects if r.get('width')==110 and r['x']<=x<=r['x']+r['width'] and r['y']<=y<=r['y']+r['height'])
top,bottom=containing('10kΩ'),containing('15kΩ');x=top['x']+top['width']/2
graph={}
def edge(a,b):graph.setdefault(a,set()).add(b);graph.setdefault(b,set()).add(a)
for e in root.iter(ns+'polyline'):
 p=[tuple(map(float,v.split(','))) for v in e.attrib['points'].split()]
 for a,b in zip(p,p[1:]):edge(a,b)
start=(x,top['y']-35);target=next(a for a in graph if a[0]==360 and top['y']<a[1]<bottom['y'])
def reaches():
 seen=set();todo=[start]
 while todo:
  a=todo.pop()
  if a==target:return True
  if a not in seen:seen.add(a);todo.extend(graph.get(a,[])-seen)
 return False
assert not reaches(),'No direct unshifted Echo→GPIO route'
edge((x,top['y']),(x,top['y']+top['height']));assert reaches(),'Path must pass through10k top resistor'
assert (x,bottom['y']) in graph and (x,bottom['y']+bottom['height']) in graph
# A contact may be open at NO, but its LOAD+ wire must reach COM without an accidental second gap.
relay=ET.parse(ROOT/spec[20]['svg']).getroot()
com=next(t for t in relay.iter(ns+'text') if t.text=='COM')
point=(180.0,float(com.attrib['y'])-10)
assert any(tuple(map(float,e.attrib['points'].split()[-1].split(',')))==point for e in relay.iter(ns+'polyline') if e.attrib.get('stroke')=='#a53838'),'LOAD+ must connect to COM; only the intended NO contact is open'

# Exact software model, not source-sensor timing observations.
def state(events):
 on=False;last=0;out=[]
 for now,motion in events:
  if motion:on=True;last=now
  elif on and (now-last)%2**32>=10000:on=False
  out.append((now,on,last))
 return out
assert state([(0,False),(1000,True),(10999,False),(11000,False)])==[(0,False,0),(1000,True,1000),(10999,True,1000),(11000,False,1000)]
assert state([(1000,True),(9000,True),(11000,False),(19000,False)])[-2:]==[(11000,True,9000),(19000,False,9000)]
assert state([(1000,True),(11000,True)])[-1]==(11000,True,11000)
for token in ['10,999ms • LOW → ยัง ON','11,000ms • LOW → OFF']:assert token in labels(22)
for token in ['9,000ms HIGH ใหม่','lastSeen = 9,000','19,000ms LOW']:assert token in labels(23)
assert labels(25).count('Lamp ON')==2 and labels(25).count('Lamp OFF')==1
interface=(ROOT/'courses/internet-of-things/summaries/final-interfaces.md').read_text(encoding='utf-8')
assert 'SPI.begin(18,19,23,27)' in interface and 'Serial2.begin(9600,SERIAL_8N1,16,17)' in interface
oled=(ROOT/'courses/internet-of-things/summaries/final-oled-integration.md').read_text(encoding='utf-8')
for token in ['PIR_PIN=33, RELAY_PIN=26','Wire.begin(21,22)','beginTransmission(0x3C)']:assert token in oled
assert len('Motion Detected')==15
print('PASS:343m/s/500µs/roundtrip,ADC codes,nominal divider/logic bounds,LED budget,water geometry/thresholds; actual SVG Echo route requires resistor;source pin mappings/timer/retrigger/OLED states. Real electrical conditions NOT VERIFIED.')
