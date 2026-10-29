# Database Management source coverage

Scope: ten applied lessons from the available teaching materials, not a claim to reconstruct the entire official Final syllabus. Course ID remains `database-management`; code **89022167** is independently confirmed by [Burapha University's official curriculum, Database Management entry](https://www.buu.ac.th/web-course/detail.php?key=MTA1MQ&lang=en), accessed 2026-10-29. The official description is broader than these supplied labs; unsupported advanced topics are not invented as exam requirements.

All eight actual user files were located. Their names omit the `(1)` suffixes in the task description. The three original PDFs contain exactly **36 + 32 + 37 = 105 physical pages**; all pages were extracted and visually reviewed, including SQL tables, diagrams and code. The CRUD PDF has unreliable Thai text extraction, so its rendered pages were used to establish meaning. The DOCX paragraphs and all five data/schema tables were read; its thirteen questions match the supplied simulated dataset. No original teaching document is copied into the repository. Filenames below identify local-only evidence, not broken public links; SHA-256 and sizes are in [the inventory](../scripts/database-source-evidence.json).

| Evidence | Exact local-only file / scope | Relevant lessons |
|---|---|---|
| DB-S01 | `CRUD-and-VERSION-CONTROL.pdf`, pp.1–36 | DB01–04, DB09–10 |
| DB-S02 | `Data-base-join.pdf`, pp.1–32 | DB02, DB05–07 |
| DB-S03 | `Database-authen.pdf`, pp.1–37 | DB01, DB04, DB08–10 |
| DB-H01 | `Database_JOIN_Homework_Student.docx`, questions1–13 and five tables | DB02, DB05–07 |
| DB-D01 | `campus_delivery_homework.sql`, schema plus simulated seed records | DB02, DB05–07 |
| DB-Z01 | `Archive.zip`: `LAB_INSTRUCTIONS.md`, `index.php`, `database/starter.sql`, connection configuration | DB01–03, DB10 |
| DB-Z02 | `student.zip`: README, bootstrap, CRUD pages, `database/setup.sql`; sensitive files excluded | DB02–04, DB08, DB10 |
| DB-R01 | Supplied URL text; [public instructor repository](https://github.com/wyookwan/69-database), pinned commit `3d37dd32001b7132478c64092ed93009421146cd` | DB04, DB08–10 |

## Lesson mapping

| Lesson | Verified teaching evidence and boundaries |
|---|---|
| DB01 Web/database architecture | S01 pp.1–13; S03 pp.3–6; Z01 index/config. Browser HTTP, Apache/PHP execution, SQL connection, phpMyAdmin and the meaning of localhost. Actual Angsila host credentials/version are not known. |
| DB02 Schema and relationships | S01 pp.14–17; S02 pp.3–7; D01 CREATE/FK/index definitions; Z01/Z02 schemas. Campus has four tables; Resume starter initially has two and its exercise adds skill/training. |
| DB03 SELECT and rendering | S01 pp.10–13,18–21; Z01 instructions/code. Arrays for skills/training in the starter are placeholders. HTML escaping is not SQL parameter binding. |
| DB04 CRUD and prepared statements | S03 pp.5–8,18; Z02 bootstrap/create/edit/delete. Four TODO SQL statements are incomplete; a first-profile classroom demo must be distinguished from session-owner authorization. |
| DB05 INNER JOIN | S02 pp.8–16; H01 questions1,2,4,5; D01. Source slide dataset is four students/three orders; homework is a different expanded dataset. Never mix their row counts. |
| DB06 outer joins and NULL | S02 pp.17–27; H01 questions3,6–9; D01. Preserve the operand actually named in SQL, not a memorized Venn-circle label. |
| DB07 multi-table/debugging | S02 pp.28–32; H01 questions10–13 and mappings to all questions1–13; D01 four-table keys, indexes and filtered results. EXPLAIN is a plan, not proof of one fixed physical join order. |
| DB08 authentication/authorization | S03 pp.9–18,29–30,37; public `auth.php`, `register.php`, `login.php`, `logout.php`, owner-scoped pages and users migration. Login TODO1–5 and logout TODO6 are intentionally unfinished. |
| DB09 version control | S01 pp.22–34,36; S03 pp.19–28. Safe explicit staging, local commit versus remote push, branch/merge and secret exclusion. No external repository is modified by lesson tests. |
| DB10 integrated project | S03 pp.29–36; Z01/Z02 requirements. Separate study and project checklists. Proposal31October2026 / delivery10November2026 are dated project milestones from pp.34,36, not verified exam dates. |

## Qualifications and evidence limits

- S02 p.22 shows fixed students/orders Venn labels while its SQL swaps operand order. The SQL `orders RIGHT JOIN students` preserves students; the website will use explicitly named operands and row-matching diagrams. Set-area pictures cannot express SQL bag multiplicity.
- S02 p.13 describes a logical evaluation order; a database optimizer can choose a different physical plan. No fixed execution plan or timing is inferred.
- S02 p.6 uses4/3 rows; D01/H01 use8 students,6 restaurants,10 orders,14 items. The source labels these records simulated data. They are kept distinct in every worked example and question.
- S01 p.17 refers to a completed four-table SQL solution, but supplied `Archive.zip` is a two-table starter; `student.zip` contains the later four-table setup. The missing answer in the earlier ZIP must not be invented as present.
- The pinned public repository has working CRUD SQL with stale TODO comments; its login/logout TODOs are genuinely unfinished. Local `student.zip` instead retains four `SELECT 1` placeholders. S01 p.18 mentions a prepared-statement solution ZIP; no complete private PHP answer package is assumed to have been supplied.
- S03 p.12 shows a minimal users table. The later pinned public migration additionally links `users.profile_id` uniquely to profile; this is a documented later schema, not an unshown slide column.
- The extra Angsila resource could not be fetched. Its current instructions, account details, server versions and deployment permissions remain unverified. University hosting is not accessed with credentials.
- Supplemental defensive examples (strict validation, deterministic tie ordering, CSRF/session options and owner-scoped operations) will be marked as authored teaching code and checked against official PHP/MySQL/Git references. Authored worked solutions are not official instructor answer keys or examination questions.

Checkpoints complete: ten lessons,300 authored questions and20 original diagrams are integrated. Executed SQL/PHP verification, browser outcomes and remaining limitations are recorded in [academic verification](database-academic-verification.md), [exam verification](database-exam-verification.md) and [final QA](database-qa.md). This updates implementation status, not the original source evidence.
