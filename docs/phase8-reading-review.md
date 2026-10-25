# Phase 8 — generated-reader readability review

Reviewed all 25 registered Markdown sources against their existing objectives, code, examples, math, tables, solutions and source scopes. Presentation changes are intentionally independent of manually maintained readers and PDF pages.

- All generated lessons: Thai/English line-height 1.85, relative paragraph rhythm, compact but distinct headings, list indentation, balanced code/table/math/callout spacing, overflow containment and mobile padding. Existing text-size and reading-width preferences remain authoritative; Classic/Modern retain their shells and themes.
- Semantic paragraph boundaries: separate references from mutation, output from reasoning, representation from assumptions, and complexity/implementation caveats where distinct ideas had been joined. No `<br>` spacing imitation.
- Editorial review also separates 51 known joined prose terms (for example public interface, object identity and base case) and Thai/Latin boundaries on 18 sources. These proposals exclude metadata, headings, code fences/inline code, TeX, links, tables and entire original solution sections. Only spacing changes are applied there; baseline hashes and independent answer checks protect technical material.
- Stack: rewrote the joined `storageimplementation`, `tracepush/pop/peek` and `Week11 pp.3–17:ข้อมูล` examples in context. Bracket scanning is explicitly a small checker rather than a full Python/HTML parser.
- Regression/KNN/Naive Bayes/Decision Tree: replace obsolete path guidance with independent-reading context without inventing prerequisites or lecturer order.
- CNN: clarify that scaled RGB kernels belong to page31, whereas page22 F2/F3 are different matrices. Existing matrices themselves establish this distinction; no mathematical result or source document is changed.
- Tables: keyboard-focusable scrolling regions; keep original values/columns. Long code keeps indentation and internal scrolling; equations keep their original TeX/MathML and scroll containment. Generated headers/TOC retain stable explicit anchors.

`scripts/reading-baseline.json` records original stable IDs, explicit anchors and hashes of code, math, tables and complete solved-exercise sections. `node scripts/check-reading.cjs` verifies those invariants and supported Markdown. Long paragraphs are advisory review findings, never automatically split by a whitespace linter. No original lesson program was reformatted or behavior changed.

New question prose receives separate editorial review; code/identifiers and exact output choices are not treated as prose substitutions. The original 150 practice questions are never rewritten.

Before/after captures live outside Git. Visual QA covers Classes/Objects, Stack, Basic Sorting, Regression, Naive Bayes, CNN, long Hash Table code and KNN tables at 1440/390/320. Final execution results and browser/device limits belong in the release QA note; capture creation alone is not a visual PASS.
