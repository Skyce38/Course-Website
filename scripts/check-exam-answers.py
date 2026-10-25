"""Offline independent arithmetic/algorithm/Python-behavior checks, never browser execution.

The committed oracle expressions are separate derivations, not calls to the JS grader.
Conceptual keys and rubrics are source-reviewed, not claimed as executable proofs.
"""
import ast
import contextlib
import io
import json
import math
from collections import deque
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def shortest(graph, start, goal):
    queue = deque([(start, 0)])
    seen = {start}
    while queue:
        node, depth = queue.popleft()
        if node == goal:
            return depth
        for child in graph[node]:
            if child not in seen:
                seen.add(child)
                queue.append((child, depth + 1))
    return None


def reachable(graph, start):
    queue, seen = [start], set()
    while queue:
        node = queue.pop()
        if node not in seen:
            seen.add(node)
            queue.extend(graph[node])
    return len(seen)


def ols_slope(x, y):
    xbar, ybar = Fraction(sum(x), len(x)), Fraction(sum(y), len(y))
    return sum((a-xbar)*(b-ybar) for a, b in zip(x, y))/sum((a-xbar)**2 for a in x)


def ols_intercept(x, y):
    return Fraction(sum(y), len(y))-ols_slope(x, y)*Fraction(sum(x), len(x))


def pearson(x, y):
    xbar, ybar = Fraction(sum(x), len(x)), Fraction(sum(y), len(y))
    return float(sum((a-xbar)*(b-ybar) for a,b in zip(x,y)))/math.sqrt(float(sum((a-xbar)**2 for a in x)*sum((b-ybar)**2 for b in y)))


def entropy(counts):
    total = sum(counts)
    return -sum(c/total*math.log2(c/total) for c in counts if c)


def inversions(values):
    return sum(values[i] > values[j] for i in range(len(values)) for j in range(i+1, len(values)))


def merge_comparisons(left, right):
    i = j = count = 0
    while i < len(left) and j < len(right):
        count += 1
        if left[i] <= right[j]:
            i += 1
        else:
            j += 1
    return count


def stack_trace(actions):
    stack = []
    for operation, value in actions:
        if operation == 'push':
            stack.append(value)
        elif operation == 'pop':
            stack.pop()
        elif operation == 'peek':
            assert stack
    return stack


def bracket_peak(text):
    depth = peak = 0
    for char in text:
        depth += 1 if char == '(' else -1
        peak = max(depth, peak)
    assert depth == 0
    return peak


def postfix(text):
    stack = []
    for item in text.split():
        if item in ('+', '-', '*', '/'):
            right, left = stack.pop(), stack.pop()
            stack.append({'+': lambda: left+right, '-': lambda: left-right,
                          '*': lambda: left*right, '/': lambda: left/right}[item]())
        else:
            stack.append(Fraction(item))
    assert len(stack) == 1
    return stack[0]


def postfix_peak(text):
    depth = peak = 0
    for item in text.split():
        depth += -1 if item in ('+', '-', '*', '/') else 1
        assert depth > 0
        peak = max(peak, depth)
    assert depth == 1
    return peak


def run(source):
    # Only authored, bounded standard-language snippets in committed test metadata.
    tree = ast.parse(source)
    forbidden = {'open', 'eval', 'exec', 'compile', '__import__', 'input', 'breakpoint'}
    assert not any(isinstance(n, (ast.Import, ast.ImportFrom)) for n in ast.walk(tree))
    assert not any(isinstance(n, ast.Name) and n.id in forbidden for n in ast.walk(tree))
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        exec(compile(tree, '<authored-exam-oracle>', 'exec'), {})
    return output.getvalue().strip()


ENV = {name: value for name, value in globals().copy().items()
       if name in ('Fraction', 'shortest', 'reachable', 'ols_slope', 'ols_intercept',
                   'pearson', 'entropy', 'inversions', 'merge_comparisons', 'stack_trace',
                   'bracket_peak', 'postfix', 'postfix_peak', 'run')}
ENV.update({name: getattr(math, name) for name in ('sqrt', 'log2', 'ceil', 'exp', 'factorial')})
ENV.update({'sum': sum, 'abs': abs, 'len': len, 'min': min, 'max': max,
            'zip': zip, 'range': range, 'int': int, 'isinstance': isinstance})

executable = reviewed = rubrics = 0
for source in json.loads((ROOT/'scripts/lessons.json').read_text(encoding='utf-8')):
    meta = json.loads((ROOT/source).read_text(encoding='utf-8').split('---')[1])
    bank = ROOT/'courses'/meta['course']/'exam'/(meta['slug']+'.json')
    data = json.loads(bank.read_text(encoding='utf-8'))
    for q in data['questions']:
        verification = q['verification']
        if verification['method'] == 'python':
            expression = ast.parse(verification['oracle'], mode='eval')
            assert not any(isinstance(n, (ast.Attribute, ast.Lambda)) for n in ast.walk(expression))
            assert all(n.func.id in ENV for n in ast.walk(expression)
                       if isinstance(n, ast.Call) and isinstance(n.func, ast.Name))
            actual = eval(compile(expression, '<independent-exam-check>', 'eval'),
                          {'__builtins__': {}, **ENV})
            if q['type'] == 'numeric':
                assert math.isclose(float(actual), q['answer'], rel_tol=1e-12, abs_tol=1e-10), (q['id'], actual, q['answer'])
            else:
                answer = next(c['text'] for c in q['choices'] if c['id'] == q['answer'])
                assert str(actual) == answer, (q['id'], actual, answer)
            executable += 1
        elif q['type'] == 'self':
            assert verification['method'] == 'rubric-review' and len(q['rubric']) >= 3
            rubrics += 1
        else:
            assert verification['method'] == 'source-review'
            reviewed += 1
print(f'PASS: {executable} independent executable numeric/code checks; {reviewed} separately source-reviewed keys; {rubrics} ungraded rubric reviews (not executable proof)')
