"""Offline lesson author check. Requires NumPy for the reviewed Python examples.

python scripts/check-ai-regression.py [--source-root <local AI source directory>]
No source files are written; the optional local sources are not required by the site.
"""
import argparse
from contextlib import redirect_stdout
import csv
from fractions import Fraction as F
import hashlib
import io
from math import isclose, sqrt
from pathlib import Path
import random
import re
import tempfile
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
LESSON = ROOT / "courses/artificial-intelligence/summaries/final-regression.md"
text = LESSON.read_text(encoding="utf-8")
blocks = re.findall(r"^```python\n(.*?)^```", text, re.M | re.S)
assert len(blocks) == 3
namespace, output = {}, io.StringIO()
with redirect_stdout(output):
    for block in blocks:
        exec(compile(block, str(LESSON), "exec"), namespace)
np = namespace["np"]
fit, metrics = namespace["simple_fit"], namespace["error_metrics"]
multiple = namespace["multiple_fit"]
assert output.getvalue().splitlines() == [
    "tree b0=-1.314667 b1=4.541333 r=0.886231",
    "MAE MSE RMSE 4.696667 33.017333 5.746071",
    "house b0=-3.117837 b1=0.510089 r=0.935960",
    "MAE MSE RMSE 0.712268 0.712873 0.844318",
    "err sheet 1.333333 2.666667 1.632993",
    "sample coefficients -29.141085 2.669656 0.989473 0.245863 0.320627",
    "sample prediction 43.025819",
]


def exact_fit(x, y):
    n, sx, sy = len(x), sum(x), sum(y)
    slope = (F(sum(a*b for a, b in zip(x, y))) - F(sx*sy, n)) / (
        F(sum(a*a for a in x)) - F(sx*sx, n))
    return F(sy, n) - slope * F(sx, n), slope


def exact_multiple(features, target):
    """Small independent rational normal-equation oracle, not NumPy's SVD."""
    rows = [[F(1)] + [F(v) for v in row] for row in features]
    size = len(rows[0])
    matrix = [[sum(row[i]*row[j] for row in rows) for j in range(size)] +
              [sum(row[i]*F(y) for row, y in zip(rows, target))]
              for i in range(size)]
    for i in range(size):
        pivot = next(j for j in range(i, size) if matrix[j][i])
        matrix[i], matrix[pivot] = matrix[pivot], matrix[i]
        scale = matrix[i][i]
        matrix[i] = [v/scale for v in matrix[i]]
        for j in range(size):
            if j != i:
                scale = matrix[j][i]
                matrix[j] = [a-scale*b for a, b in zip(matrix[j], matrix[i])]
    return [row[-1] for row in matrix]


def close(a, b):
    assert isclose(float(a), float(b), rel_tol=1e-9, abs_tol=1e-9), (a, b)


tree_x, tree_y = namespace["tree_x"], namespace["tree_y"]
house_x, house_y = namespace["house_x"], namespace["house_y"]
assert exact_fit(tree_x, tree_y) == (F(-493, 375), F(1703, 375))
assert exact_fit(house_x, house_y) == (F(-3863, 1239), F(632, 1239))
close(fit(tree_x, tree_y)[2], 1703/sqrt(375*9847))
close(F(-493, 375)+F(1703, 375)*10, 44.09866666666667)
close(F(-3863, 1239)+F(632, 1239)*18, F(7513, 1239))
pred = [F(-3863, 1239)+F(632, 1239)*x for x in house_x]
mae, mse, rmse = metrics(house_y, pred)
close(mae, .7122679580306699)
close(mse, .7128732849071832)
close(rmse, .8443182367491437)
rounded = [F(-312, 100)+F(51, 100)*x for x in house_x]
close(metrics(house_y, rounded)[0], .71125)
close(metrics(house_y, rounded)[1], .7128875)
assert metrics(house_y, rounded)[1] > mse
assert metrics(house_y, rounded)[0] < mae
assert [float(y-p) for y, p in zip(house_y, rounded)] == [
    -.10, 1.39, .94, .53, -.02, -1.08, -.59, -1.04]
for x, y, xy in zip(house_x, house_y, [176, 230, 126, 18, 56, 120, 147, 64]):
    assert f"| {x} | {y} | {xy} |" in text
for x, p, e in zip(house_x, rounded, [F(y)-p for y, p in zip(house_y, rounded)]):
    assert f"| {x} | {float(p):.2f} | {float(e):.2f} |".replace("-", "−") in text
close(metrics([2, 2, 0], [2, 0, 2])[0], F(4, 3))
close(metrics([2, 2, 0], [2, 0, 2])[1], F(8, 3))
assert fit([1, 2, 3], [5, 5, 5]) == (5, 0, None)
for call in [lambda: fit([1, 1], [2, 3]), lambda: fit([1], [2]),
             lambda: fit([1, 2], [1]), lambda: metrics([], []),
             lambda: metrics([1], [1, 2]),
             lambda: multiple([[1, 2], [1, 2], [1, 2]], [1, 2, 3])]:
    try:
        call()
        raise AssertionError("Invalid input accepted")
    except ValueError:
        pass
sample = namespace["sample"]
features, target = [row[:4] for row in sample], [row[4] for row in sample]
oracle = exact_multiple(features, target)
for observed, expected in zip(multiple(features, target), oracle):
    close(observed, expected)
close(sum(a*b for a, b in zip([1, 2, 65, 5, 4], oracle)), 43.025818885315)
# Reproducible CSV helper check using only the already-published eight-row subset.
columns = ["HoursStudied", "PreviousScores", "SleepHours",
           "SampleQuestionPapersPracticed", "PerformanceIndex"]
with tempfile.TemporaryDirectory() as directory:
    filename = Path(directory)/"sample.csv"
    with filename.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(columns)
        writer.writerows(sample)
    count, coef, prediction = namespace["fit_student_file"](filename)
    assert count == 8
    close(prediction, namespace["query"] @ coef)
rng = random.Random(23)
for _ in range(80):
    x = list(range(1, 9))
    y = [rng.randrange(-20, 30) for _ in x]
    a, b, _ = fit(x, y)
    exact_a, exact_b = exact_fit(x, y)
    close(a, exact_a)
    close(b, exact_b)
    close(sum(yi-(a+b*xi) for xi, yi in zip(x, y)), 0)
    # Least-squares objective cannot improve under these coefficient perturbations.
    best = metrics(y, [a+b*xi for xi in x])[1]
    for da, db in [(1, 0), (0, 1), (-2, .5)]:
        assert metrics(y, [a+da+(b+db)*xi for xi in x])[1] >= best-1e-10

parser = argparse.ArgumentParser()
parser.add_argument("--source-root", type=Path)
args = parser.parse_args()
if args.source_root:
    root = args.source_root
    expected_hashes = {
        "Final/Linear Regression.pdf": "b5d12cfd00fef73c45176f232ece876d8eeb9eaac7cf629f88e7abb7193a7d25",
        "Assignment/Ex_regression.pdf": "c2aacf76a28331cc9320a4215dd30c2e38ef7dc136a1e931530c4f4b91ee8c0d",
        "Assignment/regression_example.xlsx": "2605c8dd34c0446c4460f374d44c047d904f0d9f5e9875836d666387b1b355f4",
        "Assignment/mlr.py": "18abb8ee1db2a916170d09aa2d4e9824e74b475b1d36ffe4607a41a5f36122c3",
        "Assignment/StudentPerformance.csv": "7631c78833464875306dfa829fc4556e06cafb7d764b321816ba73ba162bdd73",
    }
    for file, digest in expected_hashes.items():
        assert hashlib.sha256((root/file).read_bytes()).hexdigest() == digest
    with (root/"Assignment/StudentPerformance.csv").open() as handle:
        records = list(csv.DictReader(handle))
    values = [[int(row[col]) for col in columns] for row in records]
    assert [tuple(row) for row in values[:8]] == sample
    assert len(values) == 300
    exact = exact_multiple([r[:4] for r in values], [r[4] for r in values])
    count, coef, prediction = namespace["fit_student_file"](root/"Assignment/StudentPerformance.csv")
    assert count == 300
    for observed, expected in zip(coef, exact):
        close(observed, expected)
    close(prediction, sum(a*b for a, b in zip([1, 2, 65, 5, 4], exact)))
    close(prediction, 41.12745677803896)
    # Inspect original workbook formula/cache XML without recalculating or saving it.
    ns = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    with zipfile.ZipFile(root/"Assignment/regression_example.xlsx") as workbook:
        sheets = [ET.fromstring(workbook.read(f"xl/worksheets/sheet{i}.xml"))
                  for i in (1, 2)]
    cells = [{c.attrib["r"]: c for c in sheet.findall(".//s:c", ns)} for sheet in sheets]
    for row, x, y in zip(range(3, 11), house_x, house_y):
        assert int(cells[0][f"B{row}"].find("s:v", ns).text) == x
        assert int(cells[0][f"C{row}"].find("s:v", ns).text) == y
    assert cells[0]["G3"].find("s:f", ns).text == "-3.12 + (0.51*B3)"
    close(cells[0]["J11"].find("s:v", ns).text, .71125)
    close(cells[1]["D5"].find("s:v", ns).text, F(4, 3))
    close(cells[1]["E5"].find("s:v", ns).text, F(8, 3))
    assert cells[1]["E9"].find("s:f", ns).text == "SQRT(E5)"
    print("PASS: five original source hashes, workbook cells/formulas/caches, "
          "D03 300-row OLS vs exact rational solver; prediction 41.127457")
else:
    print("NOT RUN: optional local-source/full-300-row audit (supply --source-root)")
print("PASS: 3 lesson code blocks, exact data/outputs/tables, rounding/units, "
      "MLR subset/CSV helper, boundary/rank cases and 80 independent OLS cases")
