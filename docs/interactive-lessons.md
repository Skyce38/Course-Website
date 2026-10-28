# Interactive lesson contract (Phase 3A)

The existing manual readers, catalog schema, layouts, storage keys and PDF engine remain in place. No Python/JavaScript from Markdown is executed.

## Ownership and build

- Authors maintain Markdown, JSON front matter, `scripts/lessons.json`, `templates/lesson.md` and `templates/lesson.html`.
- `node scripts/build.cjs` calls `buildLessons(catalog)` in `scripts/lesson-build.cjs`, then embeds the shared catalog/navigation as before.
- Only sources explicitly listed in the registry are built. Metadata version 1 requires `id`, `course`, `category`, `slug`, `title`, `language`. IDs are permanently `course-slug`; the source must be `courses/course/category/slug.md` and output is `read/course/slug.html`.
- Generated resources have `generatedLesson: 1`. Other application code uses the existing resource fields. The flag is build ownership metadata, not a new saved-data format.
- Generated HTML starts with an exact source-specific marker. The builder refuses to overwrite an unmarked manual reader or conflicting resource. All lesson plans validate before files/catalog entries are written; writes are deterministic and have no timestamps.
- Do not edit generated HTML. Rebuild from Markdown. Removing/renaming an existing published lesson requires a deliberate catalog/URL migration; the builder does not silently prune saved document IDs.

## Supported Markdown

JSON front matter between `---` lines (not YAML), level 2–4 headings, paragraphs, bold, inline code, simple lists, blockquotes, pipe tables, links and fenced `python`/`text`/`study-stepper` blocks. Use explicit ASCII `{#stable-anchor}` heading IDs for published sections; automatic Unicode slugs are deterministic with duplicate suffixes.

Raw HTML is escaped and unknown code languages fail the build. Links permit HTTPS without credentials, fragment anchors, or existing repo-local Markdown/HTML/PDF files. Traversal outside the repository and executable schemes are rejected. Local Markdown readers and PDFs link through existing readers/viewer when available. Output text/attributes and JSON script payloads are escaped; no eval, runtime code execution, embedded Python or arbitrary script directives exist.

## Rich lesson content

- Inline math uses `\(x^2 + y_1\)`; block math uses `$$` or `\[` on its own line, the TeX body, then matching `$$` or `\]` on its own line. Dollar currency and code fences/spans remain literal. Use explicit delimiters instead of ambiguous single-dollar math. Unmatched delimiters, empty/invalid TeX and unsupported commands fail the build.
- KaTeX 0.19.1 is vendored under `assets/vendor/katex/` (MIT, provenance and package integrity in its README). Typesetting happens **only during the Node build**, following [KaTeX's server rendering API](https://katex.org/docs/node). Generated HTML contains visual markup, accessible MathML and the TeX annotation. No runtime math JavaScript, CDN or npm install is needed. CSS/fonts load only for math lessons; plain lessons remain byte-compatible.
- Strict parsing, disabled trusted commands (including links, HTML extensions and image inclusion), per-equation macro isolation, 10,000-character equations, 1,000 macro expansions and capped dimensions limit unsafe/accidental input. This is a supported TeX subset, not a full LaTeX engine; keep Thai explanations outside math. Use `\text{...}` for short labels and escape TeX specials such as `\&`, `\%`, `\_`. In pipe tables use `\mid`, `\lvert` and `\rvert` rather than literal `|` delimiters inside cells.
- Display and long inline equations scroll within their own keyboard-focusable region instead of widening the page. Font size and colors inherit the existing reader and theme. MathML is the accessible representation; screen-reader speech depends on browser/assistive technology support. TeX remains available in its annotation.
- Images must be standalone `![descriptive alt](relative/path.png "optional caption")` lines. PNG, JPEG, GIF and WebP signatures and file existence are checked; paths are relative to the Markdown source and rebased/encoded for the generated reader. Percent-encode filename spaces. Root-relative, remote, executable, query/fragment, backslash, missing and repository-escaping/symlink paths are rejected. SVG/HTML are deliberately excluded; export diagrams to PNG/WebP. Images are responsive and do not require JavaScript.
- Immediately following an image, optional `ที่มา: [source label](../slides/source.pdf#page=3)` (or `Source:`) adds a source link inside its caption. Existing local PDF links use the shared PDF Viewer with the requested page. An omitted caption/source adds no invented attribution. All caption/alt content is escaped; captions can use the existing inline formatting and equations.
- A valid URL is **not proof of attribution**: authors must inspect the cited PDF page/figure or external HTTPS source, verify permission, and supply accurate labels. Use physical PDF page numbers and identify original instructional examples, assumptions and solutions separately from source-derived material. Never invent a slide reference or fill in unanswered slide questions as though the source answered them.
- Existing code viewers, tables, stable anchors and step visualizers are shared unchanged. Rich content uses conditional `lesson-rich.css?v=rich-lesson-1`; unchanged shared assets retain their existing cache version. Bump the rich CSS version when modifying its published rules; update the pinned KaTeX version/CSS URL together when upgrading vendor assets.

The generated Modern reader keeps branding/course navigation fixed and scrolls only its TOC. Subheadings under the template's `practice` section are grouped under the parent TOC entry; all question IDs and deep links remain intact. Classic retains the full TOC. Shared reader completion controls update only changed labels/attributes and switch colors without surface-only transitions, preserving focus and avoiding theme flashes.

## Components

`codeViewer(code, id)` produces a static Python display with numbered `.code-line[data-line]` elements and selectable `.line-source` text. Copy is progressively enabled by `assets/lesson-components.js`; it copies source lines only. Active lines use `aria-current="step"` and an accent marker. Keyboard-scrollable code never widens the document.

`study-stepper` is a fenced JSON object validated by the **same** `assets/lesson-contract.js` module in Node and browser:

```text
{ version: 1, id: "stable-component-id", title: "Author title", code: "Python source",
  startLabel: "Start", endLabel: "End", nodes: [{id:"a", label:"A"}],
  steps: [{line:1, active:"a" or null, visited:["a"], output:"",
           explanation:{th:"คำอธิบาย", en:"Explanation"}}] }
```

Nodes are an ordered sequence, not a general graph. Each step is a complete snapshot after its highlighted line: `active` identifies the current node (null selects the end marker), `visited` identifies processed nodes, `output` is displayed verbatim. Previous/Next/Reset restore snapshots; the implementation is independent of Linked List semantics. IDs, bounds, field names, bilingual explanations and referenced node IDs are validated. Limits: 20 nodes, 200 steps and 200 code lines. Components have no persistence of their own; existing document reading positions, bookmarks and manual completion remain authoritative.

Component JS/CSS and the contract module load only on generated pages containing Python code viewers or stepper fences. `assets/lesson.js` only provides generated-reader menu/font/print controls. Static source, diagram and all bilingual step explanations remain available without JS; invalid runtime data leaves that fallback intact. Buttons support Enter/Space; focused stepper/buttons also accept Left/Right/Home. Copy failure displays a localized selection/copy hint.

## Validation

Run `node scripts/build.cjs` twice and `node scripts/check.cjs`. `scripts/check-lessons.cjs` tests parser escaping, links, metadata/ID validation, manual overwrite protection, deterministic output and subject-independent component fixtures. `scripts/check-lesson-rich.cjs` adds isolated rich-content/XSS/path/conditional-asset/determinism fixtures; optionally set `AI_PILOT_ROOT` to its separate worktree for a read-only byte-compatible pilot-body comparison. No test lessons are registered or published. Browser QA checks step boundaries, language/theme/layout, clipboard, keyboard/mobile navigation, storage compatibility and existing reader/PDF/quiz/sync regressions.

Registered Markdown lessons are explicitly listed in `scripts/lessons.json`. Search Models & BFS/DFS uses the existing code viewers and static graph/frontier tables, not a linear stepper to represent graph edges. Its offline Python author check is documented in [source coverage](ai-search-bfs-dfs-coverage.md). General graph rendering and additional visualizers remain deferred. [Practice Mode](practice-mode.md) reuses its validated component and separate versioned storage across all 25 registered lessons; it does not execute code or change reading-state contracts.

## IoT C++ examples

Registered IoT lessons may use `cpp` fenced code. The existing line-numbered viewer/copy component safely escapes it, labels it C++ in TH/EN and never executes it in the browser. Python/Bash output is unchanged. New IoT readers alone load the added dictionary/cache and whitespace stylesheet. Run `node scripts/check-iot.cjs`, `python scripts/check-iot-math.py` and `node scripts/check-iot-cpp.cjs` (set `ARDUINO_CLI` and optionally `ARDUINO_LIBRARIES` to an existing installation). The latter requires the documented installed ESP32 core3.3.11/SSD1306 libraries, compiles in OS temp storage, never installs software or uploads to a board; report unavailable tools as NOT RUN.
