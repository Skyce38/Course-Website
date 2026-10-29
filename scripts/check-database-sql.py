"""Independent row-model oracles. SQLite is secondary, not a MySQL dialect substitute.
Optional --mariadb=FILE compares actual guarded PHP/mysqli integration output.
No private source script is executed; SQLite uses a fresh in-memory database.
"""
from pathlib import Path
from decimal import Decimal
from collections import Counter
import argparse, json, re, sqlite3

ROOT = Path(__file__).resolve().parents[1]
fixture = json.loads((ROOT/'courses/database-management/examples/campus-fixture.json').read_text(encoding='utf8'))
t = fixture['tables']; students=t['students']; orders=t['orders']; items=t['order_items']; restaurants=t['restaurants']
assert {k:len(v) for k,v in t.items()} == {'students':8,'restaurants':6,'orders':10,'order_items':14}
by_student={s['student_id']:s for s in students}; by_order={o['order_id']:o for o in orders}
by_restaurant={r['restaurant_id']:r for r in restaurants}
assert len(by_student)==8 and len(by_order)==10 and len(by_restaurant)==6
assert all(o['student_id'] in by_student for o in orders)
assert all(i['order_id'] in by_order and i['restaurant_id'] in by_restaurant for i in items)


def pairs(ss=students, oo=orders, condition=lambda o:True):
    return [(s,o) for s in ss for o in oo if s['student_id']==o['student_id'] and condition(o)]


def left(ss=students, oo=orders, condition=lambda o:True):
    result=[]
    for s in ss:
        matching=[o for o in oo if o['student_id']==s['student_id'] and condition(o)]
        result.extend((s,o) for o in matching) if matching else result.append((s,None))
    return result


def row_ids(rows):
    return [[s['student_id'],o['order_id'] if o else None] for s,o in rows]


def full(s,o):
    return [s['student_name'],s['faculty'],o['order_id'],o['order_date'],o['total_amount'],o['status']]


inner=sorted(pairs(),key=lambda p:p[1]['order_id'])
outer=left(); delivered=lambda o:o['status']=='delivered'
large=sorted([(s,o) for s,o in inner if delivered(o) and Decimal(o['total_amount'])>=150],
             key=lambda p:(-Decimal(p[1]['total_amount']),p[1]['order_id']))
multi=[]
for o in sorted(orders,key=lambda o:o['order_id']):
    for item in sorted(items,key=lambda i:i['item_id']):
        if item['order_id']==o['order_id'] and delivered(o):
            multi.append([by_student[o['student_id']]['student_name'],o['order_id'],item['menu_name'],
                          by_restaurant[item['restaurant_id']]['restaurant_name'],item['qty'],o['status']])
restaurant_rows=[]
for r in restaurants:
    matched=[i for i in items if i['restaurant_id']==r['restaurant_id']]
    restaurant_rows.extend([r['restaurant_id'],i['item_id'],i['menu_name']] for i in matched)
    if not matched: restaurant_rows.append([r['restaurant_id'],None,None])
slide_students=[s for s in students if s['student_id']<=104]
slide_orders=[o for o in orders if o['order_id']<=5003]
expected={
    'inner':[[s['student_id'],o['order_id'],o['total_amount'],o['status']] for s,o in inner],
    'large-delivered':[[o['order_id'],o['total_amount']] for s,o in large],
    'left':row_ids(outer),
    'anti':[[s['student_id'],s['student_name'],s['faculty']] for s,o in outer if o is None],
    'right-equivalent':row_ids(outer),
    'right-orders':row_ids(inner),
    'multi':multi,
    'restaurants-left':restaurant_rows,
    'where-delivered':row_ids([(s,o) for s,o in outer if o and delivered(o)]),
    'on-delivered':row_ids(left(condition=delivered)),
    'wrong-key':[[s['student_id'],o['order_id']] for s in students for o in orders if s['student_id']==o['order_id']],
    'cross-count':[[len(students)*len(orders)]],
    'left-counts':[[len(outer),sum(o is not None for s,o in outer),len({s['student_id'] for s,o in outer})]],
    'per-student':[[s['student_id'],sum(o['student_id']==s['student_id'] for o in orders)] for s in students],
    'all-items':[[o['order_id'],i['item_id']] for o in orders for i in items if i['order_id']==o['order_id']],
    'multi-counts':[[len(multi),len({row[1] for row in multi}),sum(row[4] for row in multi)]],
    'missing-restaurants':[[r['restaurant_id'],r['restaurant_name']] for r in restaurants if not any(i['restaurant_id']==r['restaurant_id'] for i in items)],
    'literal-null-name':[[r['restaurant_id'],r['restaurant_name']] for r in restaurants if r['restaurant_name']=='NULL Cafe'],
    'equals-null':[],
    'all-orders':[[o['order_id'],o['total_amount']] for o in sorted(orders,key=lambda o:(-Decimal(o['total_amount']),o['order_id']))],
    'delivered-total':[[sum(delivered(o) for o in orders),sum(Decimal(o['total_amount']) for o in orders if delivered(o))]],
    'slide-inner':row_ids(pairs(slide_students,slide_orders)),
    'slide-left':row_ids(left(slide_students,slide_orders)),
    'slide-distinct':[[len({s['student_id'] for s,o in pairs(slide_students,slide_orders)})]],
    'null-truth':[[None,1]],
    'homework4':[full(s,o) for s,o in inner],
    'homework5':[full(s,o) for s,o in large],
    'homework6':[[s['student_id'],s['student_name'],o['order_id'] if o else None,o['total_amount'] if o else None] for s,o in outer],
    'homework12':[[s['student_name'],o['order_id'] if o else None,o['status'] if o else None] for s,o in left(condition=delivered)],
    'homework13':[[s['student_name'],o['order_id']] for s,o in inner],
}
assert len(expected)==30
assert len(expected['inner'])==10 and len(expected['left'])==13
assert [r[0] for r in expected['anti']]==[106,107,108]
assert [r[0] for r in expected['large-delivered']]==[5006,5004,5009,5001]
assert len(multi)==10 and expected['multi-counts']==[[10,6,16]]
assert len(expected['on-delivered'])==9 and len(expected['where-delivered'])==6
assert expected['left-counts']==[[13,10,8]] and expected['slide-distinct']==[[2]]
assert expected['delivered-total']==[[6,Decimal('1089.00')]]


def canonical(value):
    if value is None:return None
    if isinstance(value,(list,tuple)):return [canonical(v) for v in value]
    s=str(value)
    if re.fullmatch(r'-?\d+(?:\.\d+)?',s):return format(Decimal(s).normalize(),'f')
    return s


def run():
    parser=argparse.ArgumentParser();parser.add_argument('--mariadb',type=Path);parser.add_argument('--report',type=Path)
    args=parser.parse_args();database=sqlite3.connect(':memory:');database.execute('PRAGMA foreign_keys=ON')
    database.executescript('''
    CREATE TABLE students(student_id INTEGER PRIMARY KEY,student_name TEXT NOT NULL,faculty TEXT NOT NULL);
    CREATE TABLE restaurants(restaurant_id INTEGER PRIMARY KEY,restaurant_name TEXT NOT NULL,category TEXT NOT NULL);
    CREATE TABLE orders(order_id INTEGER PRIMARY KEY,student_id INTEGER NOT NULL REFERENCES students(student_id),order_date TEXT NOT NULL,total_amount DECIMAL(10,2) NOT NULL,status TEXT NOT NULL);
    CREATE TABLE order_items(item_id INTEGER PRIMARY KEY,order_id INTEGER NOT NULL REFERENCES orders(order_id),restaurant_id INTEGER NOT NULL REFERENCES restaurants(restaurant_id),menu_name TEXT NOT NULL,qty INTEGER NOT NULL);
    CREATE INDEX idx_orders_student_id ON orders(student_id);
    CREATE INDEX idx_items_order_id ON order_items(order_id);
    CREATE INDEX idx_items_restaurant_id ON order_items(restaurant_id);
    ''')
    for table,rows in t.items():
        columns=list(rows[0]);marks=','.join('?' for _ in columns)
        database.executemany(f"INSERT INTO {table}({','.join(columns)}) VALUES({marks})",[list(r.values()) for r in rows])
    database.executescript('CREATE TABLE slide_students AS SELECT * FROM students WHERE student_id<=104; CREATE TABLE slide_orders AS SELECT * FROM orders WHERE order_id<=5003;')
    cases=json.loads((ROOT/'scripts/database-queries.json').read_text(encoding='utf8'))['cases']
    actual_maria=json.loads(args.mariadb.read_text(encoding='utf-8-sig')) if args.mariadb else None
    assert {c['id'] for c in cases}==set(expected)|{'explain'}
    results={}
    for c in cases:
        if c['id']=='explain':
            assert database.execute('EXPLAIN QUERY PLAN '+c['sql'].removeprefix('EXPLAIN ')).fetchall()
            if actual_maria:assert actual_maria['queries']['explain']
            continue # A physical plan is engine/statistics-dependent, not a universal expected trace.
        observed=database.execute(c['sql']).fetchall();target=canonical(expected[c['id']])
        assert canonical(observed)==target,(c['id'],'SQLite disagrees with independent nested-loop oracle')
        if actual_maria:assert canonical(actual_maria['queries'][c['id']])==target,(c['id'],'MariaDB disagrees with independent row oracle')
        results[c['id']]=target
    # Question oracles use independently computed rows, never the bank's own grader.
    entries=json.loads((ROOT/'scripts/database-verification.json').read_text(encoding='utf8'))['questions']
    questions={q['id']:q for folder in ('practice','exam') for file in
               (ROOT/f'courses/database-management/{folder}').glob('*.json')
               for q in json.loads(file.read_text(encoding='utf8'))['questions']}
    checked=0
    for entry in entries:
        model=entry.get('model')
        if not model:continue
        q=questions[entry['id']];kind=model['kind']
        if kind=='table-count':value=len(t[model['table']])
        elif kind in ('query-count','query-count-choice'):value=len(expected[model['case']])
        elif kind=='query-ids':value=[r[model['index']] for r in expected[model['case']]]
        elif kind in ('query-cell','query-cell-choice'):value=expected[model['case']][model['row']][model['column']]
        elif kind=='php':
            if not actual_maria:continue # explicitly not claimed without PHP output
            value=actual_maria['helperObservations'][model['key']]
        else:raise AssertionError(kind)
        if kind.endswith('-choice') or kind=='query-ids':assert value==model['value'],entry['id']
        else:assert canonical(value)==canonical(q['answer']),entry['id']
        checked+=1
    report={'sqlite':sqlite3.sqlite_version,'mariadb':actual_maria['engine'] if actual_maria else 'NOT RUN',
            'resultCases':30,'questionModels':checked,'explainPlans':'executed;physical shape not prescribed','results':results,
            'limits':'MariaDB is MySQL-compatible for these checked statements;native MySQL,Angsila and arbitrary dialect equivalence are not claimed'}
    if args.report:args.report.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('PASS:30 exact ordered SQL results versus independent row models;SQLite'+sqlite3.sqlite_version+
          (' + actual '+actual_maria['engine'] if actual_maria else ';MariaDB NOT RUN')+
          ';31st EXPLAIN case executed,not treated as a fixed physical plan;all13 homework mappings supported')


if __name__=='__main__':run()
