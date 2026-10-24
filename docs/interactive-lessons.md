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

Raw HTML is escaped, images are not embedded, and unknown code languages fail the build. Links permit HTTPS without credentials, fragment anchors, or existing repo-local Markdown/HTML/PDF files. Traversal outside the repository and executable schemes are rejected. Local Markdown readers and PDFs link through existing readers/viewer when available. Output text/attributes and JSON script payloads are escaped; no eval, runtime code execution, embedded Python or arbitrary script directives exist.

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

Run `node scripts/build.cjs` twice and `node scripts/check.cjs`. `scripts/check-lessons.cjs` tests parser escaping, links, metadata/ID validation, manual overwrite protection, deterministic output and subject-independent component fixtures. Browser QA checks step boundaries, language/theme/layout, clipboard, keyboard/mobile navigation, storage compatibility and existing reader/PDF/quiz/sync regressions.

Only Linked List is a published pilot. General graph rendering, a new Quiz Engine, additional visualizers, and per-component saved state are deferred.
