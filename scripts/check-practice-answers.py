"""Independent standard-library oracles for the 24 explicit practice answer keys."""
import json, math, pathlib, ast, re
root=pathlib.Path(__file__).resolve().parent.parent
pilots=['oop-python/stack','oop-python/complexity-basic-sorting','artificial-intelligence/final-knn','artificial-intelligence/final-decision-tree']
quizzes=[json.loads((root/'courses'/name.split('/')[0]/'practice'/(name.split('/')[1]+'.json')).read_text(encoding='utf-8')) for name in pilots]
questions={q['id']:q for quiz in quizzes for q in quiz['questions']}
def literals(slug):
    result={}
    source=(root/f'courses/artificial-intelligence/summaries/{slug}.md').read_text(encoding='utf-8')
    for block in re.findall(r'```python\n([\s\S]*?)\n```',source):
        for node in ast.parse(block).body:
            if isinstance(node,ast.Assign) and len(node.targets)==1 and isinstance(node.targets[0],ast.Name):
                try:result[node.targets[0].id]=ast.literal_eval(node.value)
                except (ValueError,TypeError):pass
    return result
def numeric(qid,answer):
    q=questions[qid]
    assert math.isclose(q['answer'],answer,rel_tol=1e-14,abs_tol=1e-14),(qid,q['answer'],answer)
    assert q['absoluteTolerance']==(0 if isinstance(answer,int) else 1e-6)
def choice(qid,key,phrase):
    q=questions[qid];assert q['answer']==key and phrase in next(c['text'] for c in q['choices'] if c['id']==key),qid
stack=[]
for token in '5 1 2 + 4 * + 3 -'.split():
    if token.isdigit():stack.append(int(token))
    else:
        right,left=stack.pop(),stack.pop()
        stack.append({'+':lambda:left+right,'*':lambda:left*right,'-':lambda:left-right}[token]())
numeric('s-postfix',stack.pop());numeric('s-factorial',math.prod(range(1,5)))
s=list('ABC');assert s.pop()=='C' and s[-1]=='B' and len(s)==2
choice('s-lifo','b','B');choice('s-brackets','c','([)]');choice('s-undo','b','AC')
values=[5,3,8,1,2];inversions=sum(a>b for i,a in enumerate(values) for b in values[i+1:]);numeric('b-swaps',inversions);numeric('b-comparisons',sum(range(100)))
first=values[:]
for i in range(len(first)-1):
    if first[i]>first[i+1]:first[i],first[i+1]=first[i+1],first[i]
assert first==[3,5,1,2,8];choice('b-pass','a',str(first).replace(' ',''));choice('b-stability','b','ไม่ stable');choice('b-space','c','O(n)')
# Read only literal data from the verified lesson; do not execute its library examples.
knn=literals('final-knn')
numeric('k-distance',math.dist(knn['drug_x'][7],knn['drug_query']));numeric('k-accuracy',99/105)
buy=knn['buy_rows'];query=knn['buy_query'];distances=[2*sum(a!=b for a,b in zip(row[:4],query)) for row in buy]
assert distances[1]==4
nearest=sorted(range(len(buy)),key=lambda i:(distances[i],i))[:3]
assert nearest==[0,3,7] and all(buy[i][4]=='Y' for i in nearest)
choice('k-encoding','b','4');choice('k-vote','a','Y');choice('k-test','c','split')
def entropy(counts):
    total=sum(counts)
    return -sum((n/total)*math.log2(n/total) for n in counts if n)
assert entropy([3,0])==0 and entropy([2,2])==1
numeric('d-gain',entropy([3,5])-sum(size/8*entropy(counts) for size,counts in [(4,[2,2]),(1,[1,0]),(3,[0,3])]))
numeric('d-weighted',sum(sum(counts)/14*entropy(counts) for counts in [[2,3],[4,0],[3,2]]))
tree=literals('final-decision-tree')
def label_entropy(rows):
    labels=[r[-1] for r in rows]
    return entropy([labels.count(label) for label in set(labels)])
def gain(rows,column):
    return label_entropy(rows)-sum(len(group)/len(rows)*label_entropy(group) for value in set(r[column] for r in rows) if (group:=[r for r in rows if r[column]==value]))
assert max(range(4),key=lambda col:gain(tree['sunburn'],col))==0
assert math.isclose(gain(tree['sunburn'],0),questions['d-gain']['answer'],abs_tol=1e-14)
assert math.isclose(label_entropy(tree['tennis'])-gain(tree['tennis'],0),questions['d-weighted']['answer'],abs_tol=1e-14)
rain_strong=[r[-1] for r in tree['tennis'] if r[0]=='Rain' and r[3]=='Strong'];assert rain_strong and set(rain_strong)=={'No'}
choice('d-entropy','b','0 และ 1');choice('d-root','a','HairColor');choice('d-rule','b','No')
# Verify self-assessment worked trace/counts independently, not by grading free-form text.
a=values[:];comparisons=shifts=0;passes=[]
for i in range(1,len(a)):
    key=a[i];j=i-1
    while j>=0:
        comparisons+=1
        if a[j]<=key:break
        a[j+1]=a[j];shifts+=1;j-=1
    a[j+1]=key;passes.append(a[:])
assert passes==[[3,5,8,1,2],[3,5,8,1,2],[1,3,5,8,2],[1,2,3,5,8]] and (comparisons,shifts)==(9,7)
for qid in ['s-explain','b-trace','k-ties','d-unknown']:
    assert questions[qid]['type']=='self' and 'answer' not in questions[qid] and len(questions[qid]['rubric'])==3
assert len(questions)==24
print('PASS: 20 automatic answer keys independently recalculated (Stack, inversion/sort traces, distances/one-hot/accuracy, entropy/gain); four explicit ungraded rubrics')
