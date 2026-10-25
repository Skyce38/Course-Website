"""Offline Stage B author check; scipy/numpy are reference-only, no website dependencies."""
from pathlib import Path
from contextlib import redirect_stdout
from collections import Counter
from math import isclose, log2
import argparse
import csv
import io
import random
import re
import numpy as np
from scipy.cluster.hierarchy import linkage
from scipy.spatial.distance import pdist, squareform

ROOT=Path(__file__).resolve().parents[1]
def load(slug):
    text=(ROOT/f"courses/artificial-intelligence/summaries/{slug}.md").read_text(encoding="utf8")
    blocks=re.findall(r"^```python\n(.*?)^```",text,re.M|re.S)
    assert len(blocks)==1
    ns={}
    with redirect_stdout(io.StringIO()):
        exec(compile(blocks[0],slug,"exec"),ns)
    return ns

d=load("final-decision-tree")
h=load("final-hierarchical-clustering")
H,G=d['entropy'],d['gain']
expected={"sunburn":[.454434002924965,.2657121273840978,.015712127384097774,.34758988139079716],
          "tennis":[.24674981977443933,.02922256565895487,.15183550136234159,.04812703040826949]}
for name,values in expected.items():
    rows=d[name]
    for j,value in enumerate(values):
        assert isclose(G(rows,j),value,abs_tol=1e-12)
    tree=d['id3'](rows,list(range(4)))
    assert tree[0]==0
    assert all(d['predict'](tree,row)==row[-1] for row in rows)
assert H([])==H(['+']*3)==0
assert H(['+','+','-','-'])==1
assert d['id3'](d['sunburn'],list(range(4)))[2]['blonde'][0]==3
assert d['id3'](d['tennis'],list(range(4)))[2]['Sunny'][0]==2
assert d['id3'](d['tennis'],list(range(4)))[2]['Rain'][0]==3

# Independent information gain as empirical mutual information, rather than entropy difference.
rng=random.Random(17)
for _ in range(80):
    rows=[(rng.randrange(3),rng.randrange(2)) for _ in range(15)]
    n=len(rows);joint=Counter(rows);x=Counter(r[0] for r in rows);y=Counter(r[1] for r in rows)
    mi=sum(v/n*log2(v*n/(x[a]*y[b])) for (a,b),v in joint.items())
    assert isclose(G(rows,0),mi,abs_tol=1e-12)

agg=h['agglomerate'];matrix=h['matrix']
for method,heights in [('single',[2,3,4,5]),('complete',[2,4,6,10]),('average',[2,4,4.5,8])]:
    trace=agg(matrix,method)
    assert [row[2] for row in trace]==heights
    assert np.allclose(linkage(squareform(np.array(matrix)),method=method)[:,2],heights)
    assert agg([],method)==[] and agg([[0]],method)==[]
for _ in range(25):
    points=np.array([[rng.random() for _ in range(3)] for _ in range(7)])
    distances=squareform(pdist(points))
    for method in ['single','complete','average']:
        assert np.allclose([row[2] for row in agg(distances.tolist(),method)],
                           linkage(pdist(points),method=method)[:,2],atol=1e-12)
for bad in [[[1]],[[0,1],[2,0]],[[0,-1],[-1,0]],[[0,1]]]:
    try:
        agg(bad,'single');raise AssertionError('Invalid matrix accepted')
    except ValueError:
        pass

parser=argparse.ArgumentParser();parser.add_argument('--source-root',type=Path);args=parser.parse_args()
if args.source_root:
    rows=list(csv.DictReader((args.source_root/'Assignment/play_tennis.csv').open()))
    assert d['tennis']==[tuple(r[c] for c in ['Outlook','Temperature','Humidity','Wind','PlayTennis']) for r in rows]
    assert len(rows)==14
    print('PASS: D01 original 14 rows match lesson; image-based A01/S08/artifacts reviewed separately')
print('PASS: root/subtree gains and all predictions; 80 mutual-information oracles; '
      'all source merge heights plus 75 scipy linkage comparisons and matrix edge cases')
