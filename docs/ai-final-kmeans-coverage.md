# FINAL K-Means source coverage

Stable ID `artificial-intelligence-final-kmeans`; [lesson](../courses/artificial-intelligence/summaries/final-kmeans.md). Five independently authored solved exercises, one runnable Python block.

Visually reviewed S09 `Final/clustering.pdf` pp.31–46: assignment/update/iteration/objective pp.31–40; choosing k/elbow pp.41–45; review p.46. Source credits preserved in lesson. Scatter figures do not supply exact coordinates; no invented digitization. Reported elbow values873.0/173.1/133.6 are source values, not reproduced from X05 or A02.

A02 `Assignment/Assignment_KMeans.pdf` p.1 supplies15 customers, InternetGB/Callminutes, k3, seedsP01/P02/P03, no scaling. Three full assignment rounds including stable verification; exact final SSE183725/6. X05 `Assignment/Demo_kmeans.xlsx` Sheet1!A1:F55 is a separate eight-point example with seeds(2,10),(5,8),(1,2). Four full rounds, final centers(11/3,9),(7,13/3),(1.5,3.5), final SSE43/3. Every squared distance, assignment, mean and SSE shown; Euclidean worksheet distances verified separately. Tables round6 decimals, calculations exact Fraction. Authored conventions: smallest-index ties, retain empty center, bounded iteration, convergence only if unchanged.

Stage C Python checks source rows/cached answers independently and compare all iterations with a vectorized NumPy reference plus40 seeded cases. No source workbooks or private customer documents committed. Elbow is a heuristic; local minima/units/initialization limitations explicit.
