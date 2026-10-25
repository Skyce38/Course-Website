"""Offline verification of all CNN source matrices and authored numerical exercises."""
from pathlib import Path
from contextlib import redirect_stdout
from math import floor
import io,re
import numpy as np
from scipy.signal import correlate2d,convolve2d
r=Path(__file__).resolve().parents[1]
t=(r/'courses/artificial-intelligence/summaries/final-cnn.md').read_text(encoding='utf8');ns={}
with redirect_stdout(io.StringIO()):exec(re.search(r'^```python\n(.*?)^```',t,re.M|re.S)[1],ns)
x=np.array(ns['image']);cor=ns['xcorr'];pool=ns['pool']
expected_valid=[ [[-3,5,-3],[5,21,5],[-3,5,-3]], [[-30,2,-30]]*3, [[-45]*3,[3]*3,[-45]*3] ]
expected_padding=[ [[2,2,10,2,2],[2,-3,5,-3,2],[10,5,21,5,10],[2,-3,5,-3,2],[2,2,10,2,2]],
 [[0,-20,12,-20,0],[0,-30,2,-30,0],[0,-30,2,-30,0],[0,-30,2,-30,0],[0,-20,12,-20,0]],
 [[0]*5,[-30,-45,-45,-45,-30],[18,3,3,3,18],[-30,-45,-45,-45,-30],[0]*5] ]
expected_pool=[[[21]*3]*3,[[12]*3,[2]*3,[12]*3],[[18,3,18]]*3]
assert ns['valid']==expected_valid and ns['padded']==expected_padding and ns['pooled']==expected_pool
for kernel,v,p in zip(ns['kernels'],expected_valid,expected_padding):
 assert np.array_equal(correlate2d(x,kernel,mode='valid'),v)
 assert np.array_equal(correlate2d(np.pad(x,1),kernel,mode='valid'),p)
# Independent source p16 discrepancy/convention check
xx=np.array([[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,16]]);kk=np.array([[9,8,7],[6,5,4],[3,2,1]])
assert sum([9,40,63,12,30,40,9,14,11])==228
assert correlate2d(xx,kk,mode='valid')[0,0]==228 and convolve2d(xx,kk,mode='valid')[0,0]==312
assert np.array_equal(cor(xx.tolist(),kk.tolist()),correlate2d(xx,kk,mode='valid'))
assert pool(ns['pool_example'])==[[6,8],[3,4]]
assert pool(ns['pool_example'],mode='average')==[[3.25,4.75],[2,2.5]]
assert ns['flat']==[21]*9+[12]*3+[2]*3+[12]*3+[18,3,18]*3
assert ns['relu']([[-1,-2,-3],[1,2,3],[-1,-2,-3]])==[[0,0,0],[1,2,3],[0,0,0]]
assert ns['rgb_output']==[[-73,85,-73],[85,401,85],[-73,85,-73]]
assert np.array_equal(sum(correlate2d(np.array(im),ke,mode='valid') for im,ke in zip(ns['rgb'],ns['rgb_kernels'])),ns['rgb_output'])
rng=np.random.default_rng(8410)
for _ in range(80):
 h,w=rng.integers(3,8,size=2);kh,kw=rng.integers(1,4,size=2);s=int(rng.integers(1,3));p=int(rng.integers(0,3))
 image=rng.integers(-5,6,(h,w));kernel=rng.integers(-3,4,(kh,kw))
 out=cor(image.tolist(),kernel.tolist(),s,p)
 ref=correlate2d(np.pad(image,p),kernel,mode='valid')[::s,::s]
 assert np.array_equal(out,ref) and len(out)==floor((h+2*p-kh)/s)+1 and len(out[0])==floor((w+2*p-kw)/s)+1
for _ in range(24):
 image=rng.integers(-5,6,(6,5));size=int(rng.integers(1,4));s=int(rng.integers(1,3))
 windows=np.lib.stride_tricks.sliding_window_view(image,(size,size))[::s,::s]
 for mode,ref in [('max',windows.max(axis=(-2,-1))),('average',windows.mean(axis=(-2,-1)))]:
  assert np.allclose(pool(image.tolist(),size,s,mode),ref)
assert floor((7+2-3)/2)+1==4 and 3*3*3*4+4==112
assert 3*3*3*5+5==140 and 3*3*5*10+10==460 and 27+1==28
for n in range(1,9):assert f'### ข้อ{n} ' in t
# Partial F11 must never appear as a completed lesson in registration/path.
for file in ['scripts/lessons.json','catalog.json']:
 assert 'neural-training-lab' not in (r/file).read_text()
guide=(r/'docs/ai-final-neural-training-lab-preparation.md').read_text(encoding='utf-8-sig')
assert '6838' in guide and 'source-limited' in guide and 'ไม่ใช่เฉลยทางการ' in guide
print('PASS: all source CNN matrices/flatten/RGB; p16 discrepancy and exact pooling averages; 80 SciPy correlations +48 pooling references; eight exercises; F11 unregistered')
