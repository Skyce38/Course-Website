# OOP lesson coverage and author verification

All12 new resources are complete in this branch, pending PR/merge. Existing `oop-python-linked-list` Markdown/content/anchors and all12 AI lesson sources remain unchanged. New lessons are ordinary independent catalog entries; no Learning Path configuration exists. Every new lesson includes objectives,Thai explanation,source locators,standalone Python,trace,assumptions/common mistakes,independently authored solved exercises and a revision summary.

| ID (prefix oop-python-) | Verified lecture coverage | Exercises |
|---|---|---:|
| classes-objects | Week1physicalpp.3–30 |5|
| encapsulation-properties | Week2pp.3–42 |5|
| inheritance-mro | Week3pp.3–40;Week7pp.3–13 LSP |5|
| polymorphism-abc | Week4pp.3–45 |5|
| object-relationships | Week5pp.3–55 |5|
| uml-solid | Week6pp.3–47;Week7pp.3–23 |5|
| arrays-dynamic-array | Week7pp.24–62;Week8pp.3–35 |5|
| stack | Week8pp.26–35;Week11pp.3–45;localLab11-1postfix |6|
| queue | Week12pp.3–49 |6|
| complexity-basic-sorting | Week13pp.3–41;Lab13-1/2,Hw13 conceptual applications |6|
| advanced-sorting | Week14pp.3–35 |6|
| hash-tables | Week15pp.2–36 |6|

**65 solved exercises.** Titles,scope/source caveats and exact topic boundaries are in [curriculum map](oop-curriculum-map.md). Each source link inside the lesson opens the existing PDF Viewer at a physical page. All610lecturepages are indexed; relevant code/diagrams/tables/traces reviewed directly. Local lecture copies match tracked PDFs. Local-only labs/submissions are read-only references, never committed as original datasets or official answer keys.

## Independent correctness evidence

`scripts/check-oop-foundations.py` (stdlib only): executes all7standalone blocks; confirms returned/printed values and exceptions;BankAccount isolation/aliasing;propertyvalidation/read-only/count;Nana10000×.03=300,10300balance,withdraw9800→500,zerointerestno-op;diamondMRO D,B,C,A;Shape/ABC/ducktyping/formulas;Teamidentity/House38area;LSPcounterexample20versus16;3200arraymutations vsPythonlist;None/empty/singleton/invalidindices;row-majorindex6;append8 cost15 and geometric bounds atresizeboundaries.

`scripts/check-oop-data-structures.py` (stdlib only):1200stackoperations vsdeque;600bracketstrings vsindependentpair-reductiongrammar;240postfixexpressiontrees vsFractionoracle;400undo/redo actions vstimeline;1280circular/600linkedqueue operations vsdeque and pointer/size checks;500priorityoperations vstotallyorderedarrivalreference (dictionarypayloads/ties);200deterministic sorting datasets vsPythonreference with everypass/merge/partition invariant,stable identity tags,empty/singleton/ordered/reverse/duplicate cases;3200hashoperations vsdict underforcedcollisions,fulltable,tombstones,misses,updates,None andresize. Allsample outputs/exercise arithmetic checked.

Counting conventions: sortcomparisons countkeycomparisons,actualswapsonly,insertionshiftsseparately. Five-elementsourceexample:Bubble10/7,Selection10/3,Insertion9comparisons/7shifts. Source'ssix-elementcodeexample remains a separate dataset. Algorithmcorememory distinguished frominputcopy/traceoverhead. Customarrays,doublegrowth,fullcapacity/error/tiepolicy,hashthreshold andsource implementation differences are explicit.

## Source discrepancies resolved in teaching text

- `self`/private/read-only/ABC simplifications are qualified accurately;No initializer value-return;no blanket guaranteeofdestruction fromcomposition.
- Savings minimum500 strengthens a baseprecondition (LSP concern);sourceallowingrate0 withpositive-onlydepositneedsdeclaredno-opinterestpolicy.
- Week6titlementions6relationshiplevels butworkedtablehas5;no invented sixthsourceexample.
- Week8amortizedbound<3n isnot a per-prefix averageconvergingmonotonically to3;source n8=15 remains correct.
- Week14mergecaptionclaimsright isexhausted althoughitsarraystillcontains9;calculatedtraceexhaustsleftfirst. QuickworstcallstackO(n),notalwaysO(logn);benchmark37.4x isreportedrunonly.
- Week15mutable-object blanket prohibition narrowed toactualhashabilitycontract. Probingboundedatcapacity andupdatesearchpasses tombstonesbeforeinsertion. OfficialPythonSortingHOWTO/glossarylinkedassupplementarydocumentation.
- NewsManager/DailyFeed sourcesnotfound;no suchprojectinvented. PhotoLineup/Warehouse/Leaderboardtasksareavailable;onlyverifiedrequirementsandexplicitlyauthoreddatasets/answersareused. Submittedmanager.py importtypoandsuchartifactsarenottreatedasauthoritativeworkingcode.

No Python is executed in the browser. These offline author checks add no website/runtime dependencies. Full website,legacy-state,PDF,theme/language/responsive andintegrity results are recorded at final Phase5validation.
