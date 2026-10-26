"""Independent Phase 9 counterexamples and correction guards; no source writes."""
from fractions import Fraction as F
from pathlib import Path
import argparse
import math

ROOT = Path(__file__).resolve().parents[1]

# A degenerate linear classifier is constant, not a vertical separating line.
points = [(F(x), F(y)) for x in (-10, 0, 7) for y in (-8, 0, 9)]
for bias, expected in [(F(-1), 0), (F(0), 0), (F(1), 1)]:
    assert {int(bias + F(0)*x + F(0)*y > 0) for x, y in points} == {expected}
for y in (-10, 0, 10):
    assert F(-2) + F(4)*F(1, 2) + F(0)*y == 0
text = (ROOT/'courses/artificial-intelligence/summaries/final-perceptron.md').read_text(encoding='utf8')
assert 'w2=0 แต่ w1≠0' in text and 'w1=w2=0' in text

# Workbook R8 differs from the slide's sex field. Exact decimal arithmetic
# isolates the additional two squared one-hot differences, without changing data.
query = (F(36), F(1), F(0), F(1), F(3), F('.697'), F('.069'))
workbook = (F(41), F(1), F(0), F(1), F(3), F('.767'), F('.069'))
slide = (F(41), F(0), F(1), F(1), F(3), F('.767'), F('.069'))
sq = lambda row: sum((a-b)**2 for a, b in zip(row, query))
assert sq(workbook) == F('25.0049') and sq(slide) == F('27.0049')
assert sq(slide)-sq(workbook) == 2
assert math.isclose(math.sqrt(sq(slide)), 5.196623904036158, abs_tol=1e-12)
knn = (ROOT/'courses/artificial-intelligence/summaries/final-knn.md').read_text(encoding='utf8')
assert 'KNN!B9:D9' in knn and '27.0049' in knn and 'ข้อมูล X04' in knn
nb = (ROOT/'courses/artificial-intelligence/summaries/final-naive-bayes.md').read_text(encoding='utf8')
assert 'Paola  Blonde  Tall' in nb and 'Dana   Blonde  Tall' not in nb

parser = argparse.ArgumentParser()
parser.add_argument('--source-root', type=Path)
args = parser.parse_args()
if args.source_root:
    from openpyxl import load_workbook
    book = load_workbook(args.source_root/'Assignment/KNN_Example.xlsx', read_only=True, data_only=False)
    assert tuple(book['KNN'].cell(9, c).value for c in (1, 2, 3, 4)) == (41, 'F', 1, 0)
    book.close()
    print('PASS: read-only original X04 R8 identity and encoding')
else:
    print('NOT RUN: optional local-source cell check (--source-root)')
print('PASS: degenerate boundaries, exact R8 counterfactual distance, source-name and visible correction guards')
