# Database academic verification

Reviewed2026-10-29. This is an applied ten-lesson course from the supplied evidence, not a reconstructed official Final syllabus. [Source coverage](database-source-coverage.md) separates105 physical PDF pages, the13-question homework, simulated SQL, two starter ZIPs and the pinned public repository. Private originals remain local-only.

## Independently reproduced results

The exact Campus fixture has8 students,6 restaurants,10 orders,14 order_items. It was parsed as data, not executed as an imported script. [The query cases](../scripts/database-queries.json) are read-only; [Python row models](../scripts/check-database-sql.py) build expected rows with independent nested loops and Decimal amounts. Every ordered result is compared with SQLite3.53.1 and with actual MariaDB11.4.9 output. SQLite is a secondary check, not a claim of dialect equivalence. Thirty result cases plus an executed, non-prescribed EXPLAIN cover all13 homework references.

| Result / assumption | Independently checked outcome |
|---|---|
| students INNER orders using student_id |10 rows,5 distinct people |
| students LEFT orders |13 rows,8 people; missing106,107,108 |
| orders RIGHT students, same projection/order |same13 rows as the LEFT formulation |
| students RIGHT orders |10 rows |
| delivered and amount>=150, amount DESC/order_id |5006/310,5004/220,5009/180,5001/159 baht |
| all delivered orders |6 orders,1089 baht |
| delivered four-table JOIN |10 item rows,6 distinct orders,qty sum16 |
| restaurants LEFT items, all statuses |15 rows; restaurant206 has no item |
| LEFT status filter in ON / in WHERE |9 /6 rows respectively |
| wrong student_id=order_id |0 matches |
| CROSS8×10 |80 rows |
| LEFT COUNT(*),COUNT(order_id),COUNT(DISTINCT student_id) |13,10,8 |
| NULL=NULL / NULL IS NULL |NULL/1; equality is not IS NULL |

The reduced4-student/3-order teaching example is kept separate from the expanded homework. `NULL Cafe` is an actual string, not a missing value. `qty` counts food units; row/order counts and amount in baht are not interchangeable. An EXPLAIN plan can change with engine, version, indexes and statistics; neither a fixed physical order nor a timing is asserted.

## Source qualifications and corrections in the teaching text

| Finding | Evidence | Website treatment |
|---|---|---|
| Venn labels do not follow swapped SQL operands |DB-S02 p.22 |Teach the actual right/left operand preserved by SQL; explicit rows and cardinalities replace set-area intuition. No criticism beyond the demonstrated mismatch. |
| Logical order is not a fixed optimizer trace |DB-S02 p.13 |Explain logical semantics separately from physical EXPLAIN. |
| Different Resume starter stages |DB-S01 pp.17–18, DB-Z01/02 |Two-table starter, four-table CRUD setup and later users migration are separately attributed. Missing private solution packages are not invented. |
| Local CRUD has four SELECT1 placeholders |DB-Z02 |Author/test replacement helpers. Its first-profile demo is not session authorization. |
| Public comments and code differ |DB-R01 pinned commit |Public CRUD SQL is filled despite stale comments; loginTODO1–5/logoutTODO6 are genuinely incomplete. |
| Minimal users versus later profile relation |DB-S03 p.12 / public migration |Attribute UNIQUE profile FK to the later migration, not to the slide. |
| Calendar milestones |DB-S03 pp.34,36 |31Oct2026 proposal /10Nov2026 project delivery; not verified examination dates or exam weighting. |

## Executed PHP and Git checks

PHP8.4.27 with mysqli/mysqlnd and mbstring was linted and executed against the dedicated MariaDB fixture. Tests cover prepared SELECT/INSERT/UPDATE/DELETE, full ordered fetch/empty results, invalid scalar IDs, UTF-8 and allowlist validation, HTML escaping, duplicate PK/FK rejection, wrong-owner/no-change writes, registration rollback, distinct account profiles, salted hash verification and injection denial. Actual CLI sessions test initialization, ID rotation, CSRF checks, identity guard and logout. All18 PHP fences lint;11 helper excerpts match the tested definitions exactly. See [the helpers](../courses/database-management/examples/learning-examples.php) and [guarded integration harness](../scripts/check-database-php.php).

PHP8.4 PASSWORD_DEFAULT uses bcrypt; the authored10–72-byte policy is explicit and version-specific, not a universal password-strength guarantee. The150-byte email policy fits both profile.email150 and users.email190. `affected_rows=0` is not sufficient to distinguish unchanged values from absent/unauthorized rows. HTML output encoding, prepared SQL, CSRF and ownership solve different problems.

[Example checks](../scripts/check-database-examples.py) create a new local-only Git repository to verify working/index/commit snapshots, edits after staging, branch/fast-forward merge and the fact that ignore rules do not untrack an existing file. No remote teaching example is pushed and no existing repository or database is reset.

## Primary technical references

Accessed2026-10-29. These support the independently authored technical explanations; they are not lecturer examination instructions.

- [MySQL8.4 JOIN semantics](https://dev.mysql.com/doc/refman/8.4/en/join.html), preserved operands and join conditions.
- [MySQL8.4 NULL](https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html), equality/IS NULL distinction.
- [MySQL8.4 aggregates](https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html), COUNT and NULL semantics.
- [MySQL8.4 EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html), plan interpretation.
- [PHP prepared statements](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php) and [bind_param](https://www.php.net/manual/en/mysqli-stmt.bind-param.php), values versus SQL structure and bind types.
- [PHP htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php), context-specific output encoding.
- [PHP password_hash](https://www.php.net/manual/en/function.password-hash.php), [password_verify](https://www.php.net/manual/en/function.password-verify.php), algorithm/version and verification.
- [PHP session management](https://www.php.net/manual/en/features.session.security.management.php), strict mode, ID lifecycle and cookie precautions.
- [Git basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics), [gitignore](https://git-scm.com/docs/gitignore), [pull](https://git-scm.com/docs/git-pull), local snapshots, tracking and integration behavior.
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), static hosting boundary.

## Limits

Native Oracle MySQL, Apache/HTTPS cookie transport, production authentication, rate limiting, real accounts and Angsila deployment were **not** executed. The additional Angsila resource was inaccessible. Helpers are teaching examples with explicit controller/configuration preconditions, not a deployed authentication service. No source PDFs, SQL dumps, private configurations or user photographs are published.
