# OOP curriculum map — verified sources and Phase 5 coverage

Scope: 14 tracked lecture PDFs, **610 physical pages**; Week1–8 and Week10–15. All decks indexed/read for topic boundaries, with relevant code screenshots, diagrams, traces and tables inspected directly. Physical page numbers below are authoritative; printed page labels sometimes differ (notably Week3). No Week9 source is present or reconstructed. Local copies of all14 lectures under the local-only OOP source folder are byte-identical to tracked PDFs.

## Source/topic inventory and lesson boundaries

IDs use prefix `oop-python-`. New lessons are independent catalog resources, not a prescribed learning sequence. Status:all12 new chapters implemented in this branch (pending merge),65 authored solved exercises. `linked-list` is already published. Existing broad Final summary and20-question practice sheet remain unchanged.

| Source (pages) | Verified topic locators | Dedicated lesson ID / coverage decision |
|---|---|---|
| [Week1](../courses/oop-python/slides/Week1.pdf) (30) | pp.3–13 procedural limitations,class/object,attributes/methods,self,initialization;15–18 BankAccount/Alice/Bob and independent instances;19–24 lifecycle/style/class vs dict;26–30 mistakes/aliasing | `classes-objects` — new |
| [Week2](../courses/oop-python/slides/Week2.pdf) (42) | pp.3–7 public/underscore/name mangling;9–19 properties/setters/read-only/init validation;21–33 encapsulated BankAccount;35–40 mistakes;41 inheritance bridge | `encapsulation-properties` — new |
| [Week3](../courses/oop-python/slides/Week3.pdf) (40) | pp.3–16 reuse,is-a,inheritance,super,override,multiple inheritance/MRO;18–32 SavingsAccount,rate0..0.10,minbalance500,interest via deposit;34–39 mistakes | `inheritance-mro` — new |
| [Week4](../courses/oop-python/slides/Week4.pdf) (45) | pp.3–11 polymorphism/duck typing;13–25 ABC/abstractmethod/isinstance/issubclass;27–39 Shape/Circle/Rectangle area/perimeter;41–45 mistakes | `polymorphism-abc` — new |
| [Week5](../courses/oop-python/slides/Week5.pdf) (55) | pp.3–18 object decomposition/references/None/list;20–23 association/multiplicity;25–32 Team/Player aggregation/encapsulation;34–42 House/Room composition;44–55 aliasing/copy and five design scenarios | `object-relationships` — new |
| [Week6](../courses/oop-python/slides/Week6.pdf) (47) | pp.3–8 change costs;10–17 UML boxes/visibility/abstract classes;19–26 relationship notation;28–35 SRP/Report refactor;37–43 OCP/formats;44–46 LSP/SOLID overview/mistakes | `uml-solid` — new, combined with Week7 first part |
| [Week7](../courses/oop-python/slides/Week7.pdf) (62) | pp.3–13 LSP/Square–Rectangle/Bird hierarchy;14–23 NotificationService/SRP/OCP/channel refactor;24–38 arrays/reference slots/addressing;40–51 static/dynamic,size/capacity,doubling,insert/delete;53–62 dunder methods/custom DynamicArray | `uml-solid` pp.3–23; `arrays-dynamic-array` pp.24–62. No artificial split by week |
| [Week8](../courses/oop-python/slides/Week8.pdf) (35) | pp.3–8 amortized analysis/n8 cost15;10–12 row-major2D;14–24 search,insert/remove direction,pop;26–35 stack ADT/wrapper/composition/lab bridge | `arrays-dynamic-array` pp.3–24; `stack` pp.26–35 |
| [Week10](../courses/oop-python/slides/Week10.pdf) (48) | pp.3–15 motivation,Node/reference/traversal;17–23 singly operations/boundaries;25–32 implementation;34–47 doubly pointers/deletion/backwards;48 comparison | **Reuse `linked-list`** at existing URL. Markdown/content/IDs/anchors untouched; no duplicate lesson or new mutation demo. Unfinished Phase3B remains isolated |
| [Week11](../courses/oop-python/slides/Week11.pdf) (45) | pp.3–17 LIFO/ADT/list vs linked implementation;18–20 call stack/recursion;22–25 bracket trace;27–29 undo/redo;31–35 implementation;37–45 balanced brackets/TextEditor | `stack` — new; postfix supplied by local Lab11-1, not falsely attributed to lecture |
| [Week12](../courses/oop-python/slides/Week12.pdf) (49) | pp.3–18 FIFO/list-front cost/linked front-rear;20–24 circular wrap/size;26–30 deque;32–37 priority/heap/tie counter;39–49 complete classes | `queue` — new |
| [Week13](../courses/oop-python/slides/Week13.pdf) (41) | pp.3–13 growth/Big-O/cases;15–19 bubble/early exit/stability;21–25 selection/swaps;27–31 insertion/shifts/stability;33–38 code/test counts;39–41 comparisons/application/stability | `complexity-basic-sorting` — new |
| [Week14](../courses/oop-python/slides/Week14.pdf) (35) | pp.3–11 divide-conquer/recursion tree;13–18 merge/stability/space;20–27 quick/Lomuto/pivots/complexity;29 Timsort;31–35 Python code/benchmark | `advanced-sorting` — new; benchmark timing is reported source evidence, not a universal measured speedup |
| [Week15](../courses/oop-python/slides/Week15.pdf) (36) | pp.2–8 hash/index/functions;10–16 collisions/chaining/linear probing/tombstones;18–20 load/rehash/amortization;22–24 dict/hashability;26–31 chaining;33–36 probing/deletion bug | `hash-tables` — new |

## Local-only lab/code evidence

141 local files are available under `FinalSource/oop-python/` (not copied or linked as public resources). Lecture duplicates verified by hash. Four extra lab PDFs were read: Lab1.pdf (6pages: BankAccount/classes), Lab2-1.pdf (6:Car encapsulation), Lab2-2.pdf (6:Student encapsulation), Hw2.pdf (6:Product). DOCX task text was extracted read-only; supplied Python modules inspected as references, not blindly executed as trusted official solutions.

- Weeks1–4: lab1-1/2/3,car/student/product; Employee→Manager,Room→SuiteRoom,Ticket→VIPTicket; Animal→Dog/Bird,Vehicle→Car/Motorcycle,Payment→CreditCard/PromptPay. They support topics already grounded in lectures; no private submitted files published.
- Week5: Library/Gym/Clinic tasks and supplied domain classes illustrate object relationships. Week6 QueueAlertSystem/AbsenceNotifier demonstrate SRP/OCP. No email/notification code is executed or sent.
- Weeks7–8: FixedArray,DynamicArray,insert/delete/search extensions,array-backed Stack and CinemaSeatingChart. Distinguish conceptual contiguous slots from Python nested-list row aliases.
- Week10: Text Editor,Browser History,Music Playlist tasks; preserve existing linked-list coverage rather than silently importing unfinished mutation work.
- Week11: Lab11-1 PostfixCalculator (+,−,*,/; pop right operand first; new empty stack per expression),Lab11-2 HTML validator and Hw11 Call Stack Simulator. Postfix is an explicitly lab-derived extension. Full HTML parsing is not reduced to simple parentheses matching.
- Week12: Print Job Scheduler,Restaurant Waitlist,Hospital Triage,Bounded Undo History. They motivate FIFO/deque/priority/capacity choices, not invented performance measurements.
- Week13: Lab13-1 PhotoLineup uses height and early-exit bubble; Lab13-2 Warehouse restock uses stock/daily_usage (zero usage→infinity), selection minimizes swaps; Hw13 Leaderboard uses one-item insertion into an already ordered list. Authored datasets/tests are clearly labelled.
- **Not found:** NewsManager/DailyFeed project sources. No project requirements or student solution are invented. Dict/OrderedDict/list comparison can be an authored conceptual supplement only, with assumptions stated.

## Corrections and distinctions required during authoring

1. `self` applies to instance methods; static/class methods are exceptions. PascalCase is convention, not syntax enforcement. `__init__` initializes an already created instance and must return None; alias assignment does not copy.
2. Name mangling/read-only properties are interface conventions, not security or deep immutability. Source `isinstance(...,(int,float))` accepts bool; any stricter lesson policy must be disclosed.
3. `super()` follows MRO, not always a named immediate parent. Source SavingsAccount minimum500 strengthens the base withdrawal precondition; discuss this alongside LSP, not claim it is universally substitutable.
4. An ABC with no unimplemented abstract methods may be instantiated. A concrete body in an abstract method is allowed; enforcement requires ABCMeta/ABC.
5. Composition describes intended ownership; Python aliases can retain a child after deleting its owner. Never claim language-enforced destruction solely from an UML diamond.
6. Week6 labels six relationship levels while its worked panels emphasize inheritance,realization,association,aggregation,composition; do not invent a missing sixth example. ISP/DIP are overview names, not full unseen teaching units.
7. Custom array capacity doubles; do not claim this is CPython's exact allocation policy. Amortized is a sequence bound, not probabilistic average or a guarantee for every append. Week8p.7 n8 total15 is correct; asymptotic per-prefix average does not converge monotonically to3 (it oscillates below the bound).
8. Doubly linked deletion O(1) assumes an already known node; delete-by-value first searches O(n). Stack/queue complexity depends on implementation and return/copy costs.
9. Week13 function examples copy input: their *full functions* use O(n) auxiliary space even if in-place core uses O(1). Specify comparisons versus swaps/shifts and whether failed comparisons/self-swaps count.
10. Week14p.14 caption text says right exhausted even though its listed right array still contains9; follow actual merge state rather than duplicate caption. Quicksort stack is O(n) worst-case, O(log n) when balanced; median-of-three does not eliminate duplicate/adversarial worst cases. Timsort details are implementation/version dependent; Python stable sorting is the usable interface guarantee.
11. Hash equality must imply equal hashes; not every mutable user-defined object is unhashable. String hash values can change between processes; do not promise literal buckets from unsalted runs. Bound probing even on a full table, preserve tombstones, and search for existing keys before reusing a deleted slot.

## Gaps and duplication policy

Existing `final-week10-15.md` and `practice-20.md` are revision overviews, not substitutes for dedicated lessons; retain them and their URLs unchanged. The existing Linked List lesson already fills its dedicated slot. Seven new conceptual chapters cover Weeks1–8 with coherent cross-week boundaries; five new chapters cover Weeks11–15. No prerequisite gating, path order or nonexistent chapters are introduced. Source examples are described/reimplemented for teaching; new exercises and answers are independently authored, not official exam questions. No exam weighting inferred.
