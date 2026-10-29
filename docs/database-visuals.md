# Database visual learning

Twenty original illustrations, two per lesson, use editable local [SVG sources](diagrams/database/) and responsive lossless WebP exports, **893670 bytes total** after final academic/label review (the earlier878104-byte draft is superseded). No lecturer artwork, source screenshots, private photos or external image hosting is used. [Manifest](../scripts/database-visuals.json) records exact size, SHA-256, intrinsic dimensions, source/assumptions, alt text, caption and diagram-specific models.

| Lesson | Illustration purposes |
|---|---|
|DB01 |Browser/Apache/PHP/MySQL request flow; localhost scope across environments |
|DB02 |Campus FK/cardinality ER; Resume1:N and separately attributed later users relation |
|DB03 |query versus repeated fetch; SQL binding versus HTML output encoding |
|DB04 |prepared structure/values and pre-execution guards; owner-scoped writes |
|DB05 |INNER matching multiplicity; filtered monetary result/order |
|DB06 |LEFT unmatched/null-extension; ON versus WHERE comparison |
|DB07 |four-table FK path; item/order/quantity counting units |
|DB08 |hash/verify and verified identity; session/login/owner/logout lifecycle |
|DB09 |working/index/commit/remote; branch/merge and independent DB migrations |
|DB10 |requirements-to-evidence traceability; SQL/PHP/HTTP testing boundaries |

Comparison cards are not connected as if they were consecutive actions. ER relationships show1:N/N:1 rather than suggesting four unrelated phases. SQL labels use real aliases/column names; guard checks precede writes. Diagrams remain explicitly supplemental and link technical references while private slide filenames/pages remain in the coverage ledger.

## Reproduction

1. `python scripts/database-visual-build.py`
2. Set `PLAYWRIGHT_MODULE` to an existing Playwright installation and `STUDY_PYTHON` to Python with Pillow.
3. `node scripts/ai-oop-visual-raster.cjs --manifest=scripts/database-visuals.json`
4. `node scripts/database-visual-markdown.cjs`
5. `node scripts/build.cjs`

The existing Phase15 exporter is reused with a repository-local manifest option; the default Phase15 behavior stays unchanged. It checks Thai-shaped text bounds, overlap and card padding before exporting. `--verify` re-rasterizes and compares byte hashes without publishing another asset. Run the builder only after finishing exports, then verify generated output deterministically.

`assets/database-visuals.css?v=phase16-db-visual-1` applies only to new readers and reserves each exact intrinsic aspect ratio before lazy decode. Images use at most560 CSS pixels and shrink within the reading column without filtering or cropping. Primary32px SVG labels retain at least14 CSS pixels at the tested320px reader width. White diagram canvases preserve technical contrast across palettes; surrounding captions use existing theme variables. Print contains images proportionally within200mm.

## Delayed-image QA

`scripts/check-database-browser.cjs --cls-only` uses fresh isolated, cache-disabled Chrome contexts for every image, Classic/Modern at320/390/1024/1440. Each actual WebP response is held until the pending image box and caption/following-content/scroll positions are measured. After release/decode the same positions are compared; required movement≤1px and controlled image-only CLS<0.01. No warm-cache-only result is accepted. Final measurements and screenshots are summarized in [QA](database-qa.md).

The existing50 AI/OOP and25 IoT WebPs plus the original water-flow PNG are immutable under the Phase15 preservation hashes. Their existing CSS ratios/cache versions remain unchanged; the water-flow900/820 regression is repeated separately.
