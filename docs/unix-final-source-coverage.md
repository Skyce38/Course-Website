# Unix Final: source coverage

Audit date: 2026-10-27. Course identity remains `unix-tools` / **88624159**. The public outline currently displays **89022364**; it supports topic selection, not a verified current-semester syllabus, exam weighting or guaranteed examination scope.

Originals are local-only, read-only files under the available `Final Unix Tools/sources/` and `Final Unix Tools/homework final/` collections. These labels describe the collections, not public repository paths. No originals, private submissions or extracted copies are published. Page numbers below are **physical PDF pages**. `Lect12.txt`, hw5–7 have no PDF page numbers.

| Evidence | Inspected source | Relevant coverage | Lessons |
|---|---|---|---|
| U09 | Lect09.pdf, 19 pages | pp.1–7 builtins/jobs/subshells; 8–14 scripts, tar, local; 15–19 arguments | 01–03 |
| U10 | Lect10.pdf, 13 pages | pp.1–5 variables/attributes; 6–10 arithmetic/status/if/calculator; 11–13 test | 02,04,05,09 |
| U11 | Lect11.pdf, 16 pages | pp.1–8 if/diagnostics; 9–13 hard links; 14–16 for | 05–07 |
| U12 | Lect12.txt | for/while/until, break/continue, file reading (section names, no invented pages) | 07 |
| U13 | Lect13.pdf, 11 pages | pp.1–3 case; 7–11 here documents | 08 |
| U15 | Lect15.pdf, 8 pages | p.1 functions; 2–6 descriptors; 7–8 default/required expansions | 02,06,09 |
| UA | Array.pdf (Cornell lecture16), 24 pages | pp.13–19 variables/indexed arrays; 21–23 functions | 02,09,10 |
| US | SedAwk.pdf (Brown slides9), 56 physical pages | pp.3–32 regex/grep; 34–46 sed; 48–53 awk | 11–12 |
| UR | Redirection.pdf, 10 pages (internal title Lect07) | pp.3–5 descriptors/pipelines; 7–10 utilities | 06,12 |
| UF | Filesystem.pdf, 11 pages | pp.6–10 names/inodes/hard/symbolic links | 06 |
| H5 | hw5.txt (Prac06) | stdout/stderr, noclobber, pipeline exercises | 06,12 |
| H6 | hw6.txt | student-record positional arguments and timestamped output | 03 |
| H7 | hw7.txt | calculator add/sub/mul/div and missing arguments | 04,09 |
| HF | Homework_5_2.pdf, 2 pages | p.1 factorial/prime; pp.1–2 temperature functions | 09 |
| HA | HW_Array.pdf, 1 page | population mean/variance/SD, grade boundaries | 10 |
| HL | homework final/Lect11.pdf, 16 pages | duplicate of U11 (verified hashes); not independent evidence | 05–07 |

## Evidence rules and confirmed distinctions

- VERIFIED source coverage means the original was inspected; it does not make its answer authoritative. Independently authored solutions are labelled throughout the lessons and banks.
- HW_Array p.1: the displayed grades for 1..10 conflict with its own formula. Teach the formula-derived F,F,C,C,C,C,C,C,B,B; the N=20 instruction and N=10 sample are distinct.
- Lect15 p.7 gives contradictory prose for `:=`; p.8 says `:?` only displays an error. Teach the Bash manual semantics: `:=` assigns only when unset/null; `:?` exits a noninteractive shell when the required value is absent. Interactive behavior differs.
- Array p.15's single-element statement applies to an initially empty array, not to setting index100 on the previously populated array. Existing entries survive indexed assignment.
- SedAwk p.25 mixes BRE/ERE spellings in its table. Use GNU grep/sed documentation and executed examples, not that table as an answer key.
- H6's unquoted example produces eight arguments, not five fields. Quote name and date to represent five fields; use anonymous instructional values, never personal source records.
- Lect15 p.5 `2>&1` in a Usage example duplicates stderr onto stdout; it does not send the Usage message to stderr. Use `>&2`.
- No separate Lecture14 original was found in the inspected source collection. Do not invent a lecture or page reference. Twelve lesson boundaries split verified topics for revision; they are not twelve claimed original lectures.

## Independent references

- [Published outline](https://angsila.cs.buu.ac.th/~nutthanon/88624159/) (context only).
- [Bash Reference Manual](https://www.gnu.org/s/bash/manual/bash.html): Shell Expansions, Special Parameters, Redirections, Conditional Constructs, Shell Arithmetic, Arrays, Shell Functions, Bash Builtins.
- [GNU sed manual](https://www.gnu.org/software/sed/manual/sed.html): Regular Expressions, Command-Line Options, Addresses, Commands.
- [GNU grep manual](https://www.gnu.org/software/grep/manual/grep.html): Basic vs Extended Regular Expressions, Exit Status.
- [GNU awk guide](https://www.gnu.org/software/gawk/manual/gawk.html): Records, Fields, FS/OFS, BEGIN/END, arithmetic. Execution uses portable features in mawk, not claimed gawk-specific results.
- [GNU coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html): sort, uniq, wc.

Sources consulted 2026-10-27. Public manuals document semantics; older lecture environment/defaults are not silently assumed identical. See the academic and exam verification ledgers for executable evidence and remaining limits.
