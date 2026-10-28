# Unix Final question-bank verification

Target:12 registered lessons ×30 unique questions =360 new questions;6 Practice +24 Extended per lesson, including1+4 ungraded self-assessments. Every bank uses the existing version1/revision1 contracts and real heading IDs. All prompts, explanations and rubrics are Thai with standard English syntax. No AI/OOP IDs, keys, revisions or storage schemas change.

## Evidence and key review

-300 automatic questions have individually authored executable Bash cases and explicit expected outputs in `scripts/unix-verification.json`.
-60 self-assessment rubrics have human-readable reasoning and edge-case criteria. They are source/rubric reviews, not automatically verified free-form code and never affect graded accuracy.
-Each Extended question's existing `verification.evidence` quotes the applicable authored lesson concept, rather than falsely claiming an unavailable official answer. The separate execution ledger identifies the exact question ID and code under the documented Linux environment.
-A numeric question asks for the displayed numeric value. Its key is exact (zero tolerance), including where the displayed output is rounded; it does not ask for an unrounded real value. Choice outputs preserve significant spaces and internal newlines. All questions explicitly state stdout is considered separately from stderr/status.
-Question difficulty is instructional judgement, not a measured exam difficulty statistic.

## Existing40-question static bank

The old URL/resource remains unchanged and is not part of the360 new IDs. Its questions were treated as candidates, not imported blindly. Topic coverage and answer review:

| Old questions | Reviewed conclusion / related new coverage |
|---|---|
|1–4|8 unquoted vs5 quoted args; timestamp `%Y%m%d%H%M`; fields2/3 and6/7/8. Lesson03 execution cases.|
|5–8|Missing argument count, decimal vs integer division, operand order. Lessons04/09.|
|9–12|Integer formula72 is not correct real conversion104; HF-f convention,204.4F→95.78C, shift. Lessons03/04/09.|
|13–17|Factorial off-by-one24,0!=1;1notprime; include sqrt bound;Sieve starts p². Lesson09.|
|18–20|Even occurrences include negatives/zero/repeats; sparse-array count2. Lessons07/10.|
|21–25|Boundary60C/70B/40F, population denominatorN, SD0→F under stated strict rules. Lesson10 exact oracle.|
|26–30|Separate streams, left-to-right duplication, Usage1>&2, noclobber>|, append. Lesson06.|
|31–35|if checks status, set--splitting assumptions, find-inum needs appropriate filesystem scope, break vs exit, cut/sort pipeline. Lessons03/05/06/08/12.|
|36–40|sed first match,awk field2,sort beforeuniq,until0..2,quoted$@ preserves arguments. Lessons07/11/12.|

No answers changed in that legacy static resource. New problems reuse concepts and small verified cases where useful but use distinct IDs and explicit assumptions. Two questions are not counted as distinct merely because their numbers changed. Permanent duplicate and near-duplicate review runs alongside all existing AI/OOP checks.

## Saved results and Insights

New lessons get new keys under the existing Practice/Exam namespaces. Older current/frozen contexts remain byte-identical. Unix joins Insights through registered-course metadata, retaining Phase11.1 independent graded/self counting, read-only access and archived-revision exclusion. Mandatory10correct/5incorrect remains66.7% after self-only changes.

Final executed checks and browser limitations: [QA](unix-final-qa.md).
