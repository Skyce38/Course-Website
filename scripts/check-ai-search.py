"""Offline author check: execute only this repository's reviewed search lesson examples.

Run: python scripts/check-ai-search.py (Python 3, standard library only).
This is not part of browser/runtime Markdown execution and needs no source PDF.
"""
from contextlib import redirect_stdout
import heapq
import io
from pathlib import Path
import random
import re


ROOT = Path(__file__).resolve().parents[1]
LESSON = ROOT / "courses/artificial-intelligence/summaries/search-models-bfs-dfs.md"
text = LESSON.read_text(encoding="utf-8")
blocks = re.findall(r"^```python\n(.*?)^```", text, re.M | re.S)
assert len(blocks) == 3
namespace = {}
output = io.StringIO()
with redirect_stdout(output):
    for block in blocks:
        exec(compile(block, str(LESSON), "exec"), namespace)
bfs, dfs = namespace["bfs"], namespace["dfs"]
example, source = namespace["example"], namespace["source_graph"]
assert output.getvalue().splitlines()[:4] == [
    "bfs ['S', 'A', 'B', 'C', 'G'] ['S', 'B', 'G']",
    "dfs ['S', 'A', 'C', 'D', 'G'] ['S', 'A', 'C', 'D', 'G']",
    "bfs [0, 1, 2, 3, 4, 5] [0, 1, 3, 4, 5]",
    "dfs [0, 1, 2, 3, 4, 5] [0, 1, 2, 3, 4, 5]",
]
assert bfs(example, "S", "G")[2] == [
    ("S", ("A", "B"), ("S", "A", "B")),
    ("A", ("B", "C"), ("S", "A", "B", "C")),
    ("B", ("C", "G"), ("S", "A", "B", "C", "G")),
    ("C", ("G", "D"), ("S", "A", "B", "C", "G", "D")),
    ("G", ("D",), ("S", "A", "B", "C", "G", "D")),
]
assert [x[2] for x in dfs(example, "S", "G")[2]] == [
    ("S",), ("S", "A"), ("S", "A", "C"),
    ("S", "A", "C", "D"), ("S", "A", "C", "D", "G"),
]
assert [x[1] for x in bfs(source, 0, 5)[2]] == [
    (1, 2), (2, 3), (3,), (4,), (5,), (),
]
# Check published frontier tables against the actual snapshots, not output alone.
for node, queue, discovered in bfs(example, "S", "G")[2]:
    label = node
    assert f"| {label} | {', '.join(queue)} | {', '.join(discovered)} |" in text
for _, node, stack, discovered in dfs(example, "S", "G")[2]:
    label = node
    assert f"| {label} | {', '.join(stack)} | {', '.join(discovered)} |" in text

grid = namespace["grid_graph"]
expected = [(0, 0), (0, 1), (0, 2), (1, 2), (1, 3),
            (2, 3), (2, 4), (3, 4), (4, 4)]
assert namespace["blocked"] == {(0, 3), (0, 4), (1, 4), (2, 1),
                                (3, 1), (3, 3), (4, 3)}
assert [step[1] for step in bfs(grid, (0, 0), (4, 4))[2]][:5] == [
    ((0, 1), (1, 0)), ((1, 0), (0, 2), (1, 1)),
    ((0, 2), (1, 1), (2, 0)), ((1, 1), (2, 0), (1, 2)),
    ((2, 0), (1, 2)),
]
for search in (bfs, dfs):
    assert search(grid, (0, 0), (4, 4))[1] == expected
    assert search({0: (1,), 1: (0,)}, 0, 2)[:2] == ([0, 1], None)
    assert search({}, 0, 0)[:2] == ([0], [0])
    assert search({}, 0, 1)[:2] == ([0], None)
assert 140 + 99 + 211 == 450
assert 140 + 80 + 97 + 101 == 418


def shortest_distance(graph, start, goal):
    """Independent unit-cost Dijkstra oracle, not a second queue implementation."""
    heap, distances = [(0, start)], {start: 0}
    while heap:
        distance, node = heapq.heappop(heap)
        if distance != distances[node]:
            continue
        if node == goal:
            return distance
        for child in graph.get(node, ()):
            if distance + 1 < distances.get(child, float("inf")):
                distances[child] = distance + 1
                heapq.heappush(heap, (distance + 1, child))
    return None


def recursive_oracle(graph, start, goal):
    """Reference DFS with recursive backtracking and global discovered set."""
    seen, order = set(), []

    def visit(node, path):
        seen.add(node)
        order.append(node)
        if node == goal:
            return path + [node]
        for child in graph.get(node, ()):
            if child not in seen:
                result = visit(child, path + [node])
                if result is not None:
                    return result
        return None

    result = visit(start, [])
    return order, result


rng = random.Random(42)
cases = 0
for n in range(1, 9):
    for _ in range(20):
        graph = {v: tuple(w for w in range(n) if rng.random() < .3)
                 for v in range(n)}
        start, goal = rng.randrange(n), rng.randrange(n + 1)
        distance = shortest_distance(graph, start, goal)
        for search in (bfs, dfs):
            order, path, trace = search(graph, start, goal)
            assert len(order) == len(set(order))
            if path is None:
                assert distance is None
            else:
                assert path[0] == start and path[-1] == goal
                assert len(path) == len(set(path))
                assert all(b in graph[a] for a, b in zip(path, path[1:]))
            assert search(graph, start, goal) == (order, path, trace)
            if search is bfs:
                assert (None if path is None else len(path) - 1) == distance
            else:
                assert (order, path) == recursive_oracle(graph, start, goal)
        cases += 1

print(f"PASS: 3 lesson Python blocks, exact outputs/frontiers, source graph/grid, "
      f"cycles/backtracking/boundaries and {cases} deterministic graph oracle cases")
