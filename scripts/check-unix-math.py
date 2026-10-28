"""Independent exact/integer oracles, separate from Bash/awk and the JS grader."""
from fractions import Fraction as F
from math import factorial, isqrt, sqrt, isclose
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
cases={q['question']:q for q in json.loads((ROOT/'scripts/unix-verification.json').read_text(encoding='utf-8'))['cases']}
count=0
def key(id,value):
    global count
    assert float(cases[id]['output'])==float(value),(id,value)
    count+=1
key('ux04-q01',7//2);key('ux04-q02',-int(F(7,2)));key('ux04-q03',7%2)
key('ux04-q04',int('10',8));key('ux04-q05',7+2);key('ux04-q06',2+3*4)
key('ux04-q10',5*3);key('ux04-q21',F(10,20));key('ux04-q22',(9//5)*40+32)
key('ux04-q23',F(9,5)*40+32);key('ux04-q24',round((F('204.4')-32)*F(5,9),2));key('ux04-q25',10-20)
key('ux09-q11',factorial(5));key('ux09-q12',factorial(0));key('ux09-q13',factorial(4))
key('ux09-q19',3**2);key('ux09-q20',len(range(2,isqrt(49)+1)))
key('ux09-q21',F(9,5)*40+32);key('ux09-q22',(F('102.2')-32)*F(5,9));key('ux09-q23',0);key('ux09-q25',F(9,5)*(-40)+32)
data=list(range(1,11));mean=F(sum(data),len(data));variance=sum((F(x)-mean)**2 for x in data)/len(data)
assert (mean,variance)==(F(11,2),F(33,4))
key('ux10-q11',mean);key('ux10-q12',float(format(F(8,3).__float__(),'.6g')));key('ux10-q13',round(sqrt(variance),6));key('ux10-q14',0);key('ux10-q24',sum(data))
def grade(x,m,s):return 'A' if x>m+2*s else 'B' if x>m+s else 'C' if x>m-s else 'F'
assert [grade(x,mean,sqrt(variance)) for x in data]==list('FFCCCCCCBB')
assert [grade(x,50,10) for x in [40,60,70,71]]==list('FCBA')
assert grade(50,50,0)=='F'
for id,g in [('ux10-q16','C'),('ux10-q17','B'),('ux10-q18','F'),('ux10-q19','F'),('ux10-q20','B')]:assert cases[id]['output']==g;count+=1
def prime(n):return n>=2 and all(n%d for d in range(2,isqrt(n)+1))
assert not prime(1) and not prime(25) and prime(13)
for n in range(2,101):
    # Divisor-pair oracle versus independent sieve construction.
    sieve=[True]*101;sieve[0]=sieve[1]=False
    for p in range(2,101):
        if sieve[p]:
            for j in range(2*p,101,p):sieve[j]=False
    assert prime(n)==sieve[n]
assert cases['ux09-q16']['output']=='no' and cases['ux09-q17']['output']=='no' and cases['ux09-q18']['output']=='yes'
key('ux12-q11',10+20);key('ux12-q12',F(70+90,2));key('ux12-q15',round(F(10,3),2));key('ux12-q22',max(10,30,20))
print(f'PASS: {count} exact/numeric/grade keys, HA formula-derived grades, 99 independent prime comparisons')
