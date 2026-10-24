# Search Models & BFS/DFS — Source Coverage

## Evidence and scope

- S02: `FinalSource/Artificial Intelligence/Midterm/Lecture 2_Uniformed Search.pdf`, 32 physical PDF pages. Read-only local source outside this worktree; no source PDF or rendered slides copied into Git. Preserve the actual filename; academic topic is **Uninformed Search**, not Uniform-Cost Search.
- SHA-256: `2ccdd6fad63199611835f0b96feea983c47ef58ae211ba8b12701ace54004455`.
- Text extracted and all 32 rendered pages inspected; image-only material was checked visually, especially graph directions on p.31 and obstacle coordinates on p.32. Page 1 is a title illustration; p.9 is blank. Teaching scope: pp.2–32.
- [Markdown](../courses/artificial-intelligence/summaries/search-models-bfs-dfs.md) is authoritative; [reader](../read/artificial-intelligence/search-models-bfs-dfs.html) is generated with the existing template. Stable ID: `artificial-intelligence-search-models-bfs-dfs`.

| Physical pages | Verified source material | Lesson anchors |
|---|---|---|
| 2–5 | State/successor/actions/cost/start/goal/plan; state space, strategy categories, models | concepts, formulation |
| 6 | Romania map, Arad/Bucharest, roads and distance costs | romania |
| 7–11 | State graphs, example directed graph, search trees and repeated states | graph-tree |
| 12–14 | Tic-Tac-Toe tree; 8-Puzzle start/spiral goal and blank-move tree | puzzles, question-formulation |
| 15–16 | DFS illustration, deepest-first/LIFO and illustrated search tree | dfs |
| 17–20 | Complete/optimal/time/space definitions, b/m, DFS limits and recursive pseudocode | dfs, comparison |
| 21 | 8-Puzzle DFS trace with explicit depth bound 5 | dfs |
| 22–24 | BFS illustration, shallowest-first/FIFO, graph and level tree | bfs |
| 25–27 | BFS assumptions/complexity, successor-goal-test pseudocode, 8-Puzzle BFS trace | bfs, comparison |
| 28–30 | Comparative illustrations, open comparison questions, conditional advantages | comparison, question-guarantees |
| 31 | Directed graph; create DFS/BFS search tree and path 0 to 5 | question-source-graph |
| 32 | 5×5 blocked grid, START/END and partial search tree | question-source-grid |

## Authored explanations and solutions

- No official answer key was found in the inspected source. All eight exercise solutions, Python and deterministic traces are newly authored and labelled. Successor order and graph-search policies are explicit, not invented slide instructions.
- p.31 adjacency: `0:[1,2], 1:[2,3], 2:[3], 3:[4], 4:[0,1,5], 5:[]`. Read directed arrowheads; do not add reverse edges.
- p.32: `(row,column)` from top-left, START `(0,0)`, END `(4,4)`, blocked `{(0,3),(0,4),(1,4),(2,1),(3,1),(3,3),(4,3)}`. Added conventions: four orthogonal moves, R/D/L/U order, unit costs, global discovered set. No claim that the partial source tree specifies a full search policy.
- New S/A/B/C/D/G cyclic graph: BFS path S-B-G, DFS path S-A-C-D-G. p.31: BFS 4 edges, DFS 5 edges under ascending successors. p.32: both find the listed 8-edge route; DFS optimality is not generalized from this example.
- p.6 distance examples computed from source roads: 450 vs 418, only comparing those routes, not claiming an independently established global optimum.
- Explain DFS infinite acyclic branches (cycle prevention alone is insufficient), BFS unit/equal-positive-cost optimality, and tree/finite-graph complexity separately. Source p.25 uses depth-layer O(b^d); the lesson qualifies the O(b^(d+1)) bound when testing on dequeue and generating the next layer. Trace snapshots have their own O(V²) worst-case overhead.
- No reproduction of entire 8-Puzzle trace images, hidden successor-order assumptions, new graph renderer, algorithm visualizer or quiz engine. Static graph/grid transcriptions, frontier tables, existing Python code viewers and build-time KaTeX suffice. Thai instructional prose retains English terminology and Python syntax.

## Reproducible validation

- `python scripts/check-ai-search.py`: execute only the reviewed lesson's three Python blocks offline; compare exact output/frontier tables, source graph/grid and boundary/cycle behavior; compare BFS with independent unit-cost Dijkstra and frame-DFS with recursive DFS on 160 seeded graph cases.
- `node scripts/build.cjs` twice, then `node scripts/check.cjs`: shared Markdown/math, catalog/navigation, localization, themes, study state, visualizer and PDF-source regressions.
- Browser QA and protected-worktree/PDF integrity results are recorded after final validation. Temporary source renders, fixtures and screenshots stay outside the repository.


## Final QA results

- PASS: author Python check (three code blocks, exact outputs/frontiers, 160 seeded oracle comparisons); current build/check suite and byte-identical repeated builds.
- PASS: Chrome Classic/Modern × Light/Dark (TH/EN UI) × 1440/390/320px, unchanged Thai prose, math/assets, TOC/anchors/keyboard, clipboard code copying, two-lesson Previous/Next boundaries and Back/Forward, Continue Learning exact resume, completion/bookmarks and reset. Windows clipboard line endings were normalized for comparison.
- PASS: all six palettes plus Custom, both theme directions, immediate colors and SVG/focus/state preservation; no document overflow, console errors or failed local assets. Source traces, code and grid screenshots reviewed; shortened trace-table headings with a legend improve 320px readability without changing shared CSS.
- PASS: existing catalog IDs/resources, OOP path and nine existing reader contents unchanged; all 15 PDF files byte-identical; original S02 and all seven protected worktrees (2,546 file hashes plus exact branches, staging and status) unchanged. Temporary source renders/screenshots remain outside Git.
- Limitations: Chrome mobile viewport emulation only; Safari/Firefox, physical devices and assistive-technology speech not tested. Source is local-only and has no verified official answer key. Complete original 8-Puzzle trace images are discussed, not replayed by an invented visualizer. No shared frontend code, saved-data schema or dependencies changed.
