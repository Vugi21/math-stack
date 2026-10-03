# Authoring a lesson

Reference lesson: `content/courses/prealgebra/ch01/01-numbers-and-the-number-line.js`. Copy its shape.
DSL: `src/content/dsl.js`. Judge rules: header of `src/engine/judge.js`. Markup: `{a/b}` fraction, `x^[2]`, `_[n]`, `sqrt[x]`, HTML `<b>`/`<i>` (NOT markdown). Use `−` (U+2212) for display minus; answers use plain `-`.

## File and id
`content/courses/<course>/chNN/MM-slug.js`, default export `lesson({...})`, id `pre-<chapter>-<index>-<slug>` (index = position in chapter, slug = file name without number prefix).

## Quality bar (enforced by `tests/content.test.js`)
| Part | Minimum |
|---|---|
| tryFirst | 2 problems, no prior teaching needed, hints + solution |
| learn | 6+ blocks incl. a `rule`, a `warn` or `mcq` spot-the-mistake, a worked `ex`, a widget where a picture helps |
| practice | 6–8 problems, every one with hints (h), solution (s), and wrong-answer messages (w) for the real mistakes |
| challenge | 2 `chain`s (3+ parts, close starts "The idea:") + 1 find-the-error `mc` |
| quiz | 6–8 `tpl` generators; each must make 25+ distinct problems over 250 seeds; vary shape, numbers, wording |

## Rules of the road
- Original content only. Never copy or closely paraphrase AoPS / any textbook problems.
- Beast-Academy style: reasoning over rote; make the student explain/predict; include at least one non-routine problem per lesson.
- A wrong-answer entry `w:[[ans,msg]]` must be a wrong answer the judge recognises; msg names the actual misconception.
- MC: `mc(id,q,opts,okIndex,{w:[[idx,msg]]})`; in generators use `choice(rng,q,right,[wrongs])`.
- Generators must be correct by construction (compute answers in code, not by hand). Numbers must stay friendly (integers or clean fractions).
- Answers are exact: fractions as "3/4", mixed with `mixed:true`; decimals exact; units only from the whitelist.
- Sort out anything uncertain by computing it independently in a scratch script.

## Run
`npx vitest run tests/content.test.js -t "pre-5-"` validates one chapter (replace the prefix). `npx vitest run tests/ui.test.js` smoke-tests the app.

## Young-learner courses (course.js `band: 'young'`, Math 4, ages 8 to 10)
Same structure and same quality bar, different voice:
- Short sentences (aim for under 15 words), one idea per paragraph, concrete numbers before symbols. Define every term the first time it appears.
- Serious tone. No jokes-as-content, mascots, cartoon framing, points or praise inflation. Respect the child's intelligence; difficulty comes from reasoning, not from long text.
- Problems must be hard in the Beast Academy sense: multi-step, "why" and "what if" questions, puzzles, non-routine setups. Never plain drill only. Each lesson needs at least two problems a strong 9-year-old will have to think about for a few minutes.
- Numbers stay friendly, contexts are everyday (money, time, rooms, tiles, stairs, trays, teams). No reading-heavy word problems: keep each question under about 40 words unless it is a logic puzzle.
- Every figure is described fully in words (or shown by a widget) so the question is answerable from the text alone.
- Widgets only when a picture teaches the idea (arrays, fraction bars, number lines, angles, symmetry, base 2). Moderate: a few controls, a readout. No game mechanics.
- Course id `math4`; lesson ids `m4-<chapter>-<index>-<slug>` (e.g. `m4-2-1-one-part-at-a-time`); validate with `-t "m4-2-"`.
- Original problems only. The topic order follows a published curriculum map; no problems, characters or story titles are reused.
