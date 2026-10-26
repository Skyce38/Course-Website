# Phase 10 — Modern learning workspace

Base: main `9f9a82153f56892bb39af4ffa57461644cac5a8f`. Classic remains the default and keeps its existing visual presentation. This is a presentation/navigation update, not a second application or a new learning-path system.

## Baseline and design specification

Captured 36 Modern screenshots: homepage, AI/OOP overview, Regression/Stack readers, Practice, Extended Exam, Settings and PDF at 1440/1024/390/320px; six additional Classic baselines. Images and comparison artifacts stay outside Git. Protected HEAD/index/dirty-file snapshots cover the other 19 worktrees.

Baseline issues: nested outlined surfaces, oversized course cards/header panels, heavy background tint, multiple competing resource actions and exam configuration taking most of a mobile viewport.

Design direction: compact navigation; plain welcome/course headings; two-column compact course tiles; divider-based document lists; comfortable flat reading columns; one clear question surface; subtle progress and feedback. Reuse the own Study book mark and existing inline SVGs. No external fonts, proprietary graphics, account/profile inventions, timers, rankings or backend.

Two coordinated image concepts guide dashboard and reader/practice composition. Generated mockups are not data authority: their illustrative completion checks, attempted-session dates, altered logo, TOC progression circles and incorrect related-anchor label are excluded. Every title, count, completion state, source/lesson text, question and saved attempt comes from the existing application. No mockup text is substituted for educational content.

Tokens: selected-palette paper/canvas/soft/accent/ink; subdued decorative dividers; original accessible control borders and focus colors. UI text 15–17px, reading text controlled by preferences, 28–32px primary headings, 24–28px section headings, 8px component corners, 8/12/16/24/32px spacing. Modern Dark and Custom use the same token relationships; no fixed blue palette overrides.

## Implementation boundaries

- One Modern-scoped stylesheet after existing styles; reuse shared markup, themes and data. No third layout, framework or runtime library.
- Real navigation destinations only. Practice links point into existing generated readers; no invented lessons, question counts or prerequisite sequences.
- Preserve all Markdown, banks/keys/revisions/archives, IDs/anchors, saved-data contracts and PDFs. Practice position indicator is presentation only, mounted once and never serialized.
- Before/after screenshot inspection and focused state/keyboard/storage regressions are required before release. Baseline capture alone is not visual PASS.

## Validation status

Stage A complete: relevant architecture inspected; baselines captured; design rules defined. Implementation and final QA pending. No overall PASS claimed.
