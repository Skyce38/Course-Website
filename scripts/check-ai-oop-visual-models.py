"""Offline academic checks of the 50 pictured models, separate from raster/layout checks.
Reuses installed NumPy/SciPy as independent references; not website dependencies.
Executes only reviewed repository lesson examples, never private lecturer/submission scripts.
"""
from pathlib import Path
from contextlib import redirect_stdout
from collections import Counter, deque
from fractions import Fraction as F
import io, json, math, re, xml.etree.ElementTree as ET
import numpy as np
from scipy.cluster.hierarchy import linkage
from scipy.spatial.distance import squareform
from scipy.signal import correlate2d

ROOT=Path(__file__).resolve().parents[1]
spec=json.loads((ROOT/'scripts/ai-oop-visuals.json').read_text(encoding='utf8'))
cache={}
SVG='{http://www.w3.org/2000/svg}'


def lesson(course,slug):
    key=(course,slug)
    if key not in cache:
        text=(ROOT/f'courses/{course}/summaries/{slug}.md').read_text(encoding='utf8')
        code=re.findall(r'^```python\n(.*?)^```',text,re.M|re.S)[0]
        ns={}
        with redirect_stdout(io.StringIO()):exec(compile(code,slug,'exec'),ns)
        cache[key]=ns
    return cache[key]


def close(a,b,tol=1e-8):assert np.allclose(np.asarray(a,float),np.asarray(b,float),atol=tol,rtol=0),(a,b)


def expect_error(kind,fn):
    try:fn()
    except kind:return
    raise AssertionError('Expected '+kind.__name__)


def categorical(rows,labels,query,categories,alpha):
    # Exact count oracle, independent of the lesson's normalization helper.
    result={}
    for label in set(labels):
        group=[r for r,y in zip(rows,labels) if y==label]
        value=F(len(group),len(rows))
        for j,q in enumerate(query):value*=F(sum(r[j]==q for r in group)+alpha,len(group)+alpha*len(categories[j]))
        result[label]=value
    total=sum(result.values());return result,{k:v/total for k,v in result.items()}


def loss(theta,x,target):
    # Loss-only NumPy oracle; gradients are obtained by finite differences, not copied backprop.
    t=np.array(theta);a=t[:6].reshape(2,3)
    h=1/(1+np.exp(-(a[:,:2]@np.array(x)+a[:,2])))
    y=1/(1+np.exp(-(t[6:8]@h+t[8])))
    return float(.5*(y-target)**2)


for d in spec['assets']:
    m=d['model'];kind=m['kind'];svg=ET.parse(ROOT/d['svg']).getroot()
    text=' '.join(n.text or '' for n in svg.findall('.//'+SVG+'text'))
    edges={n.attrib['data-edge']:n for n in svg.findall('.//'+SVG+'polyline') if 'data-edge' in n.attrib}
    n=None
    if kind not in ('agent-cycle','subsets','uml','growth','collision','one-hot','errors','single-linkage','cross-pairs','nb-smoothing','entropy','decision-tree','rnn','gan'):
        n=lesson(d['course'],d['lesson'])
    if kind in ('agent-cycle','rnn','gan','decision-tree'):
        assert set(edges)==set(m['edges'])
        if kind=='rnn':assert m['steps']==3 and 'W, U, b' in text
        if kind=='decision-tree':
            src=lesson(d['course'],d['lesson']);tree=src['id3'](src['sunburn'],list(range(4)))
            assert tree[0]==0 and tree[2]['red']=='+' and tree[2]['brown']=='-'
            assert tree[2]['blonde'][0]==3 and tree[2]['blonde'][2]=={'no':'+','yes':'-'}
    elif kind=='subsets':assert m['sets']==['AI','ML','DL'] and 'Deep Learning' in text
    elif kind=='search-graph':
        assert m['graph']=={k:list(v) for k,v in n['example'].items()}
        assert set(edges)=={u+':'+v for u,vs in m['graph'].items() for v in vs}
    elif kind=='search-trace':
        graph=n['example'];seen=set();recursive=[]
        def dfs(u):
            seen.add(u);recursive.append(u)
            if u=='G':return True
            return any(dfs(v) for v in graph[u] if v not in seen)
        dfs('S');assert recursive==m['dfs']
        # Enumerate simple paths to verify minimum length without reusing BFS implementation.
        paths=[]
        def enumerate_paths(path):
            if path[-1]=='G':paths.append(path);return
            for v in graph[path[-1]]:
                if v not in path:enumerate_paths(path+[v])
        enumerate_paths(['S']);assert min(paths,key=len)==m['paths'][0]
        assert n['bfs'](graph,'S','G')[:2]==(m['bfs'],m['paths'][0])
        assert n['dfs'](graph,'S','G')[:2]==(m['dfs'],m['paths'][1])
    elif kind=='regression':
        x,y=np.array(m['x']),np.array(m['y']);coeff=np.linalg.lstsq(np.column_stack([np.ones(len(x)),x]),y,rcond=None)[0]
        close(coeff,[float(F(m['intercept'])),float(F(m['slope']))])
        close(n['simple_fit'](m['x'],m['y'])[:2],coeff)
        e=F(m['y'][1])-F(m['intercept'])-F(m['slope'])*m['x'][1]
        assert f'{float(e):.6f}' in text and e==F(3541,375)
    elif kind=='errors':
        errors=[F(a)-F(b) for a,b in zip(m['actual'],m['predicted'])]
        assert errors==[0,2,-2] and sum(errors)==0
        assert sum(map(abs,errors))/len(errors)==F(m['mae'])
        assert sum(e*e for e in errors)/len(errors)==F(m['mse'])
    elif kind=='one-hot':assert sum((a-b)**2 for a,b in zip(m['query'],m['row']))==m['squaredDistance']==2
    elif kind=='knn':
        ranked=sorted((sum((F(str(a))-F(str(b)))**2 for a,b in zip(row,n['drug_query'])),i) for i,row in enumerate(n['drug_x']))
        assert [i+1 for _,i in ranked[:m['k']]]==m['rank']
        close([math.sqrt(float(v)) for v,_ in ranked[:5]],m['distances'],1e-6)
        assert [n['drug_y'][i] for _,i in ranked[:5]]==m['labels']
        assert Counter(m['labels'])=={'drugC':3,'drugY':1,'drugX':1}
    elif kind=='nb-judy':
        scores,post=categorical(n['judy_rows'],n['judy_labels'],n['judy_query'],n['judy_categories'],0)
        assert [scores['+'],scores['-']]==list(map(F,m['scores']))
        assert [post['+'],post['-']]==list(map(F,m['posterior']))
    elif kind=='nb-smoothing':
        src=lesson(d['course'],d['lesson']);scores,post=categorical(src['buy_rows'],src['buy_labels'],src['buy_query'],src['buy_categories'],1)
        assert [scores['Y'],scores['N']]==list(map(F,m['scores']))
        assert [post['Y'],post['N']]==list(map(F,m['posterior']))
        assert [m['classCount']+k for k in m['categories']]==[7,7,7,8]
    elif kind=='entropy':
        src=lesson(d['course'],d['lesson']);rows=src['sunburn'];h=lambda counts:-sum(v/sum(counts)*math.log2(v/sum(counts)) for v in counts if v)
        actual=[[sum(r[0]==color and r[-1]==label for r in rows) for label in ['+','-']] for color in ['blonde','red','brown']]
        assert actual==m['children'] and Counter(r[-1] for r in rows)=={'+':3,'-':5}
        weighted=sum(sum(c)/8*h(c) for c in actual);close(weighted,m['weighted']);close(h(m['parent']),m['entropy'])
        # Independent mutual-information identity verifies the gain.
        mi=sum(count/8*math.log2(count*8/(sum(group)*m['parent'][j])) for group in actual for j,count in enumerate(group) if count)
        close(mi,m['gain']);close(src['gain'](rows,0),mi)
    elif kind=='single-linkage':
        z=linkage(squareform(np.array(m['matrix'],float)),method='single');close(z[:,2],m['heights'])
        leaves=[q for q in svg.findall('.//'+SVG+'text') if q.text=='1'];bottom=float(leaves[-1].attrib['y'])-42
        for key,h in [('12',2),('123',3),('45',4),('all',5)]:
            yy=min(float(pair.split(',')[1]) for pair in edges[key].attrib['points'].split());assert (bottom-yy)/60==h
        assert m['cut']==4.5
    elif kind=='cross-pairs':
        assert min(m['pair'])==m['single'] and max(m['pair'])==m['complete'] and sum(m['pair'])/2==m['average']
        assert sum(m['finalPairs'])==48 and len(m['finalPairs'])==6 and m['finalAverage']==8
    elif kind=='kmeans':
        x,c=np.array(m['points']),np.array(m['centers']);labels=((x[:,None]-c)**2).sum(axis=2).argmin(axis=1)
        assert labels.tolist()==m['labels'];close([x[labels==i].mean(axis=0) for i in range(3)],m['updated'])
        trace=n['kmeans_trace'](m['points'],m['centers']);assert trace[0][3]==m['labels']
    elif kind=='kmeans-update':
        points=np.array(n['workbook_points']);members=points[np.array(m['members'])-1]
        assert members.sum(axis=0).tolist()==m['sum'];close(members.mean(axis=0),m['center'])
        assert n['kmeans_trace'](n['workbook_points'],[(2,10),(5,8),(1,2)])[0][-1]==m['sse']
    elif kind=='perceptron':
        z=m['weights'][0]+np.dot(m['weights'][1:],m['x']);close(z,m['z']);assert int(z>0)==m['y'];assert int(0>0)==0
    elif kind=='perceptron-update':
        old=np.array(m['before']);error=m['target']-m['output'];updated=old+m['rate']*error*np.array([1,*m['x']]);close(updated,m['after'])
        close(n['train_perceptron']([(0,0,0)],m['before'],m['rate'],1)[0][-1],m['after'])
    elif kind in ('backprop-forward','backprop-gradient'):
        values,gradient=n['forward_and_gradient'](m['theta'],m['x'],m['target']);close(values[-1],loss(m['theta'],m['x'],m['target']),1e-12)
        eps=1e-6;finite=[]
        for i in range(9):
            left=m['theta'].copy();right=left.copy();left[i]-=eps;right[i]+=eps
            finite.append((loss(right,m['x'],m['target'])-loss(left,m['x'],m['target']))/(2*eps))
        close(gradient,finite,1e-8)
        if kind=='backprop-forward':close(values[2:4],m['h']);close(values[-2:], [m['output'],m['loss']])
        else:
            close(gradient[-1],m['go']);close([gradient[2],gradient[5]],m['hidden']);close(m['theta'][-1]-m['rate']*gradient[-1],m['biasNew'])
    elif kind=='cnn-correlation':assert correlate2d(m['input'],m['kernel'],mode='valid').tolist()==m['output'] and m['output'][0][0]==228
    elif kind=='pooling':
        blocks=np.array(m['input']).reshape(2,2,2,2);close(blocks.max(axis=(1,3)),m['max']);close(blocks.mean(axis=(1,3)),m['average'])
    elif kind=='linked-references':
        assert set(edges)==set(m['edges'])
        assert [n['head'].data,n['head'].next.data,n['head'].next.next.data]==m['values']==[10,20,30]
        assert n['tail'].data==30
    elif kind=='linked-insert':
        Node=n['Node'];head=Node(10,Node(20,Node(30)));current=head.next;new=Node(25);old_next=current.next
        new.next=current.next;assert new.next is old_next;current.next=new
        values=[];seen=set();u=head
        while u is not None:assert id(u) not in seen;seen.add(id(u));values.append(u.data);u=u.next
        assert values==m['after'] and current.next.next is old_next
    elif kind=='class-instances':
        A=n['BankAccount'];a,b=A('Alice',1000),A('Bob',300);assert a is not b and isinstance(A,type);a.deposit(500);assert (a.balance,b.balance)==(1500,300)
    elif kind=='alias':assert n['alias'] is n['a'] and n['a'].balance==m['after'] and n['b'].balance==m['bob']
    elif kind=='property':
        a=n['Account']('demo','A',m['initial']);expect_error(ValueError,lambda:setattr(a,'balance',m['invalid']));assert a.balance==m['initial'];a.balance=m['valid'];assert a.balance==m['valid']
    elif kind=='account-trace':
        a=n['Account']('demo','A',1000);states=[(a.balance,a.transaction_count)];a.deposit(500);states.append((a.balance,a.transaction_count));a.withdraw(200);states.append((a.balance,a.transaction_count))
        expect_error(ValueError,lambda:setattr(a,'balance',-1));states.append((a.balance,a.transaction_count));expect_error(ValueError,lambda:a.withdraw(1400));states.append((a.balance,a.transaction_count));assert states==list(zip(m['balances'],m['counts']))
    elif kind=='mro':assert [c.__name__ for c in n['D'].__mro__]==m['order'] and set(edges)==set(m['edges'])
    elif kind=='savings':
        a=n['SavingsAccount']('demo','A',m['initial'],m['rate']);close(a.apply_interest(),m['interest']);a.withdraw(m['withdraw']);assert a.balance==m['balance'] and a.transaction_count==m['count'];expect_error(ValueError,lambda:a.withdraw(1))
    elif kind=='polymorphism':close([n['Circle'](m['radius']).area(),n['Rectangle'](*m['rectangle']).area()],m['areas'])
    elif kind=='abc':
        expect_error(TypeError,lambda:n['Shape']());assert not isinstance(n['Badge'](),n['Shape']);assert n['total_area']([n['Rectangle'](2,2),n['Badge']()])==m['total']
    elif kind=='team-player':assert n['b'].players[0] is n['p'] and n['p'].goals==m['goals'] and n['a'].players==()
    elif kind=='composition':assert n['h'].room_count==len(m['areas']) and n['h'].total_area==sum(m['areas'])==m['total'];assert edges['house:rooms'].attrib['marker-start']=='url(#composition)'
    elif kind=='uml':
        assert set(edges)==set(m['types']);assert edges['realization'].attrib['stroke-dasharray']=='8 6'
        for key in ['generalization','realization']:assert edges[key].attrib['marker-end']=='url(#inherit)'
        for key in ['aggregation','composition']:assert edges[key].attrib['marker-start']=='url(#'+key+')'
        assert svg.find('.//'+SVG+'marker[@id="inherit"]/'+SVG+'path').attrib['fill']=='#fff'
        assert svg.find('.//'+SVG+'marker[@id="aggregation"]/'+SVG+'path').attrib['fill']=='#fff'
        assert svg.find('.//'+SVG+'marker[@id="composition"]/'+SVG+'path').attrib['fill']!='#fff'
    elif kind=='solid-service':assert n['log'].entries==[m['message']] and len(n['log'].entries)==m['logCount']
    elif kind=='array-resize':
        a=n['DynamicArray']()
        for v in m['before']:a.append(v)
        copied=a.copies;assert a.capacity==m['capacities'][0];a.append(50);assert a.copies-copied==m['copies'];assert a.capacity==m['capacities'][1] and [a[i] for i in range(len(a))]==m['after']
    elif kind=='amortized':
        a=n['DynamicArray']();costs=[];capacities=[]
        for _ in range(8):old=a.copies;a.append(None);costs.append(1+a.copies-old);capacities.append(a.capacity)
        assert costs==m['costs'] and capacities==m['capacities'] and sum(costs)==m['total']==15
    elif kind=='stack':
        a=n['LinkedStack']();oracle=[]
        for v in m['pushes']:a.push(v);oracle.append(v)
        assert a.pop()==oracle.pop()==m['popped'];assert a.peek()==oracle[-1]==m['peek'] and len(a)==len(m['remaining'])
    elif kind=='postfix':
        stack=[];states=[]
        for token in m['tokens']:
            if token.isdigit():stack.append(int(token))
            else:right,left=stack.pop(),stack.pop();stack.append(left+right if token=='+' else left*right)
            states.append(stack.copy())
        assert states==m['states'] and stack==[m['result']];assert n['PostfixCalculator']().evaluate(' '.join(m['tokens']))==m['result']
    elif kind=='queue':
        a=n['LinkedQueue']();oracle=deque(m['initial'])
        for v in m['initial']:a.enqueue(v)
        assert a.dequeue()==oracle.popleft()==m['dequeue'];assert list(oracle)==m['remaining'];a.dequeue();a.dequeue();assert a._head is None and a._tail is None
    elif kind=='circular':
        a=n['CircularQueue'](m['capacity'])
        for v in 'ABCDE':a.enqueue(v)
        for _ in range(3):a.dequeue()
        a.enqueue('F');a.enqueue('G');assert a._data==m['raw'] and [a._front,a._rear,len(a)]==[m['front'],m['rear'],m['size']];assert a.items()==m['items']
    elif kind=='growth':
        assert [v for v in m['n']]==m['linear'];assert [v.bit_length()-1 for v in m['n']]==m['halving'];assert [sum(range(v)) for v in m['n']]==m['triangle']
    elif kind=='bubble':
        out,stats,passes=n['bubble_sort'](m['states'][0],trace=True);assert [m['states'][0],*passes]==m['states'];assert out==sorted(m['states'][0])
        assert stats=={'comparisons':m['comparisons'],'swaps':m['swaps']};assert sum(a>b for i,a in enumerate(m['states'][0]) for b in m['states'][0][i+1:])==m['swaps']
    elif kind=='merge':
        out=n['merge'](m['left'],m['right']);assert out==sorted(m['left']+m['right'])==m['selected']+m['tail'] and m['tail']==[9]
    elif kind=='partition':
        out,stats,trace=n['quick_sort'](m['input'],trace=True);first=trace[0];assert first[2]==m['split'] and first[3]==m['pivot'] and first[4]==m['output'];assert out==sorted(m['input'])
        pivot=m['output'][m['split']];assert all(v<=pivot for v in m['output'][:m['split']]) and all(v>pivot for v in m['output'][m['split']+1:])
    elif kind=='collision':assert [v%m['capacity'] for v in m['hashes']]==m['indices']==[2,2]
    elif kind=='tombstone':
        keys=[n['ForcedKey'](v) for v in 'ABC'];a=n['LinearProbingHashTable'](5)
        for key,value in zip(keys,[1,2,3]):a.insert(key,value)
        assert [entry[0] for entry in a._table[2:]]==keys;a.delete(keys[0]);a.insert(keys[1],42)
        assert a._table[2] is a.TOMBSTONE and a.get(keys[1])==42 and a.get(keys[2])==3 and len(a)==m['size']
    else:raise AssertionError('Unreviewed model '+kind)
    assert len(d['alt'])>=60 and d['source'] and d['assumptions'] and d['verification']

assert len(spec['assets'])==50 and len({d['resourceId'] for d in spec['assets']})==25
assert Counter(d['course'] for d in spec['assets'])=={'artificial-intelligence':24,'oop-python':26}
print('PASS:50 scoped diagram models; exact probabilities/counts, independent NumPy/SciPy oracles, 18 finite-difference derivatives, source Python MRO/state/traces and actual SVG edges/UML markers/dendrogram heights; not a whole-curriculum or empirical certification')
