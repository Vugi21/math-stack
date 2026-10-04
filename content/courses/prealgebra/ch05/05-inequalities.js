import { lesson, num, set, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const term = (a, v = 'x') => (a === 1 ? v : a === -1 ? '−' + v : m(a) + v);
const lin = (a, b, v = 'x') => term(a, v) + (b === 0 ? '' : b > 0 ? ' + ' + b : ' − ' + -b);
const same = (a, v) => Number(a) === Number(v);
const NN = (q, a, o = {}) => N(q, a, { ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });
const fl = Math.floor;

export default lesson({
  id: 'pre-5-5-inequalities',
  title: 'Inequalities',
  blurb: 'Solve statements like 3x − 5 ≥ 10, graph them on the number line, and learn why a negative multiplier flips the sign.',
  concepts: ['inequalities', 'number-line', 'flipping-inequality'],

  tryFirst: [
    num('t1', 'A ride says "riders must be at least 120 cm tall." How many whole-centimetre heights from 114 to 126 (both included) are allowed?', 7, {
      h: ['"At least 120" includes 120 itself.', 'List the allowed heights: 120, 121, ...'],
      s: 'The allowed heights are 120 through 126: 120, 121, 122, 123, 124, 125, 126. That is 7.',
      w: [['6', '"At least 120" includes 120. Count it.'], ['13', 'That counts every height from 114 to 126. Only those 120 and above are allowed.']],
    }),
    num('t2', 'How many whole numbers x (zero or more) make 3x − 1 < 14 true?', 5, {
      h: ['Try x = 0, 1, 2, ... and stop when it fails.', 'Test x = 5 carefully.'],
      s: 'x = 0, 1, 2, 3, 4 work (x = 4 gives 11). x = 5 gives 14, which is not less than 14. So 5 numbers.',
      w: [['6', 'Test x = 5: 3(5) − 1 = 14, and 14 is not less than 14.'], ['4', 'Do not forget x = 0, which counts as a whole number here.']],
    }),
  ],

  learn: [
    p(`Equations say two things are equal. Real situations often say something looser: "at least 120 cm tall", "no more than $15", "fewer than 14 pieces". These are <b>inequalities</b>. Where an equation usually has one solution, an inequality usually has a whole <i>range</i> of them, and a number line shows the range.`),
    def('inequality', `A statement comparing two quantities that may not be equal, using one of four symbols: x &lt; 5 (less than), x ≤ 5 (less than or equal to), x &gt; 5 (greater than), x ≥ 5 (greater than or equal to). A solution is any number that makes it true.`),
    def('boundary point', `The number where an inequality switches from true to false, found by treating it as an equation. For x &lt; 5 the boundary is 5. It is included in the solutions for ≤ and ≥ and left out for &lt; and &gt;.`),
    widget('inequalityLine', { a: 2, kind: 2, t: 5 }),
    rule(`<b>Open and closed dots.</b> An open dot means the boundary is <i>not</i> included (&lt; or &gt;). A filled dot means it <i>is</i> included (≤ or ≥). The shading points toward the numbers that work.`),
    tbl(['Words', 'Symbol', 'Includes the boundary?'], [['at least 12; 12 or more', 'x ≥ 12', 'yes'], ['at most 12; 12 or fewer', 'x ≤ 12', 'yes'], ['more than 12; over 12', 'x &gt; 12', 'no'], ['less than 12; under 12', 'x &lt; 12', 'no']], 'Reading inequality words'),
    p(`<b>Solving</b> works like equations: add or subtract the same thing on both sides, and multiply or divide both sides by the same positive number. The one new rule: if you multiply or divide by a <b>negative</b> number, <b>flip the inequality sign</b>.`),
    tbl(['Start', 'Multiply both sides by −1', 'Still true?'], [['2 &lt; 5', '−2 and −5, so −2 &gt; −5', 'Yes, after flipping'], ['−3 &lt; 4', '3 and −4, so 3 &gt; −4', 'Yes, after flipping'], ['2 &lt; 5', '−2 &lt; −5', 'No! Not flipped']], 'Why the sign flips: negating reverses the order on the number line'),
    key(`<b>Solve an inequality like an equation, but flip the sign whenever you multiply or divide by a negative number.</b> Multiplying by a negative reflects the number line, so left and right swap, and "smaller" becomes "larger".`),
    ex('A two-step inequality', [`Solve 3x − 5 ≥ 10.`, `Add 5: 3x ≥ 15.`, `Divide by 3 (positive, no flip): x ≥ 5.`, `On the number line: a filled dot at 5 with shading to the right. Check: x = 5 gives 10 ≥ 10 (true); x = 4 gives 7 (false).`]),
    ex('Flipping', [`Solve −2x + 3 &lt; 11.`, `Subtract 3: −2x &lt; 8.`, `Divide by −2 and flip the sign: x &gt; −4.`, `Check x = 0: 3 &lt; 11 is true, and 0 &gt; −4. Check x = −6: 15 &lt; 11 is false, and −6 is not greater than −4.`]),
    warn(`<b>Do not flip when you only add or subtract</b>, and do not forget to flip when dividing by a negative. The negative <i>number</i> you divide by decides it, not a negative sign elsewhere. In x − 3 &gt; −7, you add 3 and get x &gt; −4 with no flip.`),
    formula('Compound inequality', `a &lt; expression ≤ b`, `Means both a &lt; expression and expression ≤ b are true. Do each step to <b>all three parts</b> at once. If you multiply or divide by a negative, flip both signs and swap the ends.`),
    ex('Counting solutions and "between"', [`How many integers satisfy −5 ≤ 3x − 2 &lt; 10?`, `Do each step to all three parts: add 2 to get −3 ≤ 3x &lt; 12, then divide by 3: −1 ≤ x &lt; 4.`, `The integers are −1, 0, 1, 2, 3: five of them (−1 is included by the closed end, and 4 is excluded by the open end).`]),
    ex('A word problem with "at least"', [`Ava has $90 and spends $8 on lunch every day. What is the greatest number of whole days she can do this and still have at least $20 left?`, `After d days she has 90 − 8d dollars. "At least $20" means 90 − 8d ≥ 20.`, `Subtract 90: −8d ≥ −70. Divide by −8 and flip: d ≤ {35/4}, which is 8.75.`, `Whole days: the greatest is 8. Check: after 8 days she has 90 − 64 = 26 ≥ 20, but after 9 days only 18.`]),
    tip(`<b>Test one number.</b> After solving, pick a number from your shaded region and put it in the original inequality: it must be true. Pick one from outside: it must be false. This catches a missed flip right away. Another way to avoid flipping: add the x-term to the other side so that its coefficient is positive. 7 − 2x &gt; −3 becomes 7 + 3 &gt; 2x, so 10 &gt; 2x, so x &lt; 5.`),
    mcq(`Ana solves −2x &lt; 10 and writes x &lt; −5. What is the error?`, [`None.`, `She divided by −2 but forgot to flip the sign. The answer is x &gt; −5. Test x = 0: −2(0) = 0 &lt; 10 is true, but 0 &lt; −5 is false.`, `She should have multiplied by −2.`], 1, `Dividing by a negative flips the inequality. Always test one number from your answer region.`, 'Spot the mistake'),
    recap([['inequality', 'a comparison with &lt;, ≤, &gt; or ≥'], ['boundary point', 'where the inequality switches between true and false'], ['open dot', 'boundary not included (&lt; or &gt;)'], ['filled dot', 'boundary included (≤ or ≥)']], [['Flip rule', 'multiply or divide by a negative: reverse the sign'], ['Compound', 'a &lt; expr ≤ b: do each step to all three parts']]),
  ],

  practice: [
    mc('p1', 'Which inequality says "x is at most 12"?', ['x ≥ 12', 'x ≤ 12', 'x &lt; 12', 'x &gt; 12'], 1, {
      h: ['"At most" is the biggest allowed value, and it is allowed.'],
      s: '"At most 12" means 12 or smaller: x ≤ 12.',
      w: [[0, 'That says "at least". At most means no larger than 12.'], [2, 'The word "at most" includes 12 itself, so you need ≤.']],
    }),
    num('p2', 'What is the smallest integer x with 4x − 7 > 21?', 8, {
      h: ['Solve: 4x &gt; 28.', 'x must be strictly greater than the boundary.'],
      s: '4x > 28 so x > 7. The smallest integer greater than 7 is 8.',
      w: [['7', 'The sign is &gt;, not ≥, so 7 itself fails: 4(7) − 7 = 21, which is not greater than 21.'], ['28', 'That is 4x. Divide by 4.']],
    }),
    mc('p3', 'Solve −3x ≥ 12.', ['x ≥ −4', 'x ≤ −4', 'x ≥ 4', 'x ≤ 4'], 1, {
      h: ['Divide by −3 and think about the sign.'],
      s: 'Dividing by −3 flips the inequality: x ≤ −4. Check x = −5: −3(−5) = 15 ≥ 12 (true).',
      w: [[0, 'You divided by a negative but did not flip the sign.'], [3, 'The sign of the number is wrong too: −3 × 4 = −12, not 12 or more.']],
    }),
    num('p4', 'How many positive integers x satisfy 2x + 5 ≤ 19?', 7, {
      h: ['Solve for x first.'],
      s: '2x ≤ 14 so x ≤ 7. The positive integers 1 through 7 work: 7 of them.',
      w: [['6', 'The sign is ≤, which includes 7 itself.'], ['14', 'That is 2x. Divide by 2, then count.']],
    }),
    num('p5', 'What is the greatest integer x with 5 − 2x &gt; −9?', 6, {
      h: ['Subtract 5, then divide by −2 and flip.'],
      s: '−2x > −14, so x < 7. The greatest integer less than 7 is 6.',
      w: [['7', 'After flipping the sign is &lt;, so 7 itself is not allowed: 5 − 14 = −9, which is not greater than −9.'], ['-6', 'Check the sign when you divide: −14 ÷ (−2) = 7.']],
    }),
    num('p6', 'Ben has $60 and spends $7 on lunch every day. What is the greatest number of whole days he can do this and still have at least $15 left?', 6, {
      h: ['Write 60 − 7d ≥ 15.', 'The answer must be a whole number of days, and rounding matters here.'],
      s: '−7d ≥ −45 so d ≤ 45/7, about 6.43. Only whole days count, and you cannot round up, so the greatest is 6. Check: 60 − 42 = 18 ≥ 15, while 7 days leaves 11.',
      w: [['7', 'Rounding 6.43 up to 7 gives 60 − 49 = 11 dollars, which is less than 15.'], ['45/7', 'Days must be whole, so give the largest whole number that works.']],
    }),
    set('p7', 'List every integer x that satisfies −3 &lt; 2x + 1 ≤ 9. Separate them with commas.', '-1,0,1,2,3,4', {
      h: ['Do each step to all three parts. First subtract 1.'],
      s: '−4 < 2x ≤ 8 so −2 < x ≤ 4. The integers are −1, 0, 1, 2, 3, 4.',
      w: [['-2,-1,0,1,2,3,4', 'The left end is strict (&lt;), so −2 is not included: 2(−2) + 1 = −3, which is not greater than −3.'], ['0,1,2,3,4', 'Negative integers count too, down to −1.']],
    }),
  ],

  challenge: [
    chain('Data plan', 'A phone plan costs $20 plus $2 per gigabyte. Mia\'s budget is at most $50.', [
      mc('c1a', 'Which inequality describes her budget for g gigabytes?', ['2g + 20 ≤ 50', '2g + 20 ≥ 50', '22g ≤ 50', '2g ≤ 70'], 0, { h: ['The cost must not go over $50.'], s: 'Cost is 2g + 20, and it must be at most 50: 2g + 20 ≤ 50.' }),
      num('c1b', 'What is the most whole gigabytes she can use?', 15, { h: ['2g ≤ 30.'], s: 'g ≤ 15, so 15 GB. That costs exactly $50.' }),
      num('c1c', 'A rival plan is a flat $38. What is the greatest whole number of GB for which Mia\'s plan is strictly cheaper than $38?', 8, { h: ['2g + 20 < 38.'], s: '2g < 18, so g < 9. The greatest whole number below 9 is 8.' }),
    ], 'The idea: "at most" gives ≤ and "cheaper than" gives <. The equality case matters when you count whole values.'),
    chain('Triangle sides', 'Two sides of a triangle are 5 cm and 8 cm. The third side is x cm (a whole number). In a triangle, each side must be shorter than the other two sides added together.', [
      num('c2a', 'What is the greatest whole x allowed?', 12, { h: ['x < 5 + 8.'], s: 'x < 13, so 12.' }),
      num('c2b', 'What is the least whole x allowed? (The 8 side must be shorter than 5 + x.)', 4, { h: ['8 < 5 + x.'], s: '3 < x, so the least whole x is 4.' }),
      num('c2c', 'How many whole values of x are possible?', 9, { h: ['Count from your smallest to your largest.'], s: '4, 5, ..., 12 is 9 numbers.' }),
    ], 'The idea: a problem with several rules can produce a range from the two inequalities, and you count the whole values inside.'),
    mc('c3', 'Find the error. Sam solves 6 − 3x ≥ 0 as "−3x ≥ −6, so x ≥ 2". What is wrong?', ['Dividing by −3 flips the sign: x ≤ 2.', 'Nothing, x ≥ 2 is correct.', 'He should have added 6 to both sides.', 'The solution is x = 2 only.'], 0, {
      s: 'x ≤ 2. Test x = 0: 6 ≥ 0 is true, but x ≥ 2 would exclude 0.',
      w: [[1, 'Test x = 3: 6 − 9 = −3, which is not at least 0.'], [3, 'The inequality has a whole range of solutions: every x up to 2.']],
    }),
  ],

  quiz: [
    tpl('smallest', (r) => {
      const a = r.int(2, 9), x0 = r.int(-6, 12), b = r.nz(-12, 12), strict = r.bool();
      const c = a * x0 + b + (r.bool() ? 0 : r.int(0, a - 1));
      const bound = (c - b) / a;
      const ans = strict ? fl(bound) + 1 : Math.ceil(bound);
      return NN('What is the smallest integer x with ' + lin(a, b) + (strict ? ' &gt; ' : ' ≥ ') + m(c) + '?', ans, { s: 'Solve: ' + term(a) + (strict ? ' > ' : ' ≥ ') + m(c - b) + ', so x ' + (strict ? '> ' : '≥ ') + (Number.isInteger(bound) ? m(bound) : 'about ' + bound.toFixed(2)) + '. The smallest integer that works is ' + m(ans) + '.', w: [[Math.ceil(bound) - (strict && Number.isInteger(bound) ? 0 : 1) , 'Test your answer in the original inequality. It should satisfy it.'], [fl(bound), 'Check that your boundary rounds the right way, and whether the boundary itself is allowed.']].filter(() => true) });
    }),
    tpl('greatest', (r) => {
      const a = r.int(2, 9), x0 = r.int(-6, 12), b = r.nz(-12, 12), strict = r.bool();
      const c = a * x0 + b + r.int(0, a - 1);
      const bound = (c - b) / a;
      const ans = strict ? Math.ceil(bound) - 1 : fl(bound);
      return NN('What is the greatest integer x with ' + lin(a, b) + (strict ? ' &lt; ' : ' ≤ ') + m(c) + '?', ans, { s: 'Solve: ' + term(a) + (strict ? ' < ' : ' ≤ ') + m(c - b) + ', so x ' + (strict ? '< ' : '≤ ') + (Number.isInteger(bound) ? m(bound) : 'about ' + bound.toFixed(2)) + '. The greatest integer that works is ' + m(ans) + '.', w: [[ans + 1, 'Plug it in: it fails the inequality. With a strict sign the boundary itself does not count.']] });
    }),
    tpl('count', (r) => {
      const a = r.int(2, 7), b = r.int(0, 15), hi = r.int(3, 20), c = a * hi + b + r.int(0, a - 1);
      const ans = fl((c - b) / a);
      return NN('How many positive integers x satisfy ' + a + 'x + ' + b + ' ≤ ' + c + '?', ans, { s: a + 'x ≤ ' + (c - b) + ', so x ≤ ' + ((c - b) / a).toFixed(2).replace(/\.00$/, '') + '. The positive integers 1, 2, ..., ' + ans + ' work: ' + ans + ' of them.', w: [[ans + 1, 'Check the largest value you counted in the inequality.'], [c - b, 'That is the value of ' + a + 'x. Divide by ' + a + ' before counting.']] });
    }),
    tpl('flip', (r) => {
      const a = r.int(2, 9), x0 = r.nz(-9, 9), b = r.nz(-9, 9), up = r.bool();
      const c = -a * x0 + b;
      // -a x + b  (sign)  c  ->  x (flipped sign) x0
      const sgnQ = up ? '≥' : '≤', sgnA = up ? '≤' : '≥';
      const right = 'x ' + sgnA + ' ' + m(x0);
      const wrongs = [['x ' + sgnQ + ' ' + m(x0), 'Dividing by a negative number flips the inequality sign.'], ['x ' + sgnA + ' ' + m(-x0), 'Check the sign of the boundary number.'], ['x ' + sgnQ + ' ' + m(-x0), 'Two slips: the sign must flip and the boundary has the opposite sign.']].filter((w) => w[0] !== right);
      return choice(r, 'Solve −' + a + 'x ' + (b > 0 ? '+ ' + b : '− ' + -b) + ' ' + sgnQ + ' ' + m(c) + '.', right, wrongs, { s: (b > 0 ? 'Subtract ' + b : 'Add ' + -b) + ': −' + a + 'x ' + sgnQ + ' ' + m(-a * x0) + '. Divide by −' + a + ' and flip the sign: ' + right + '.' });
    }),
    tpl('budget', (r) => {
      const price = r.int(3, 12), T = r.int(40, 120), keep = r.int(5, 25);
      const ans = fl((T - keep) / price);
      return NN(name(r) + ' has $' + T + ' and buys notebooks at $' + price + ' each. What is the most notebooks possible if at least $' + keep + ' must be left over?', ans, { s: 'Need ' + T + ' − ' + price + 'n ≥ ' + keep + ', so n ≤ ' + (T - keep) + '/' + price + ' ≈ ' + ((T - keep) / price).toFixed(2) + '. Whole notebooks only, rounding down: ' + ans + '.', w: [[Math.ceil((T - keep) / price) === ans ? ans + 1 : Math.ceil((T - keep) / price), 'Rounding up would spend too much. You cannot buy part of a notebook, so round down.']] });
    }),
    tpl('triangle', (r) => {
      const a = r.int(4, 15), b = a + r.int(1, 10), g = r.int(0, 1);
      const ans = g === 0 ? a + b - 1 : b - a + 1;
      return NN('Two sides of a triangle are ' + a + ' cm and ' + b + ' cm. The third side is a whole number of centimetres. What is the ' + (g === 0 ? 'greatest' : 'least') + ' it can be? (Each side must be shorter than the other two added together.)', ans, { s: g === 0 ? 'x < ' + a + ' + ' + b + ' = ' + (a + b) + ', so the greatest whole x is ' + ans + '.' : b + ' < ' + a + ' + x gives x > ' + (b - a) + ', so the least whole x is ' + ans + '.', w: [[g === 0 ? a + b : b - a, 'The sides need to be strictly shorter, so the boundary itself is not allowed.']] });
    }),
    tpl('between', (r) => {
      const k = r.int(2, 6), b = r.nz(-8, 8), lo = r.int(-7, 3), len = r.int(3, 12), hi = lo + len;
      return NN('How many integers x satisfy ' + m(k * lo + b) + ' &lt; ' + lin(k, b) + ' ≤ ' + m(k * hi + b) + '?', len, { s: 'Subtract ' + b + ' from all parts, then divide by ' + k + ': ' + m(lo) + ' < x ≤ ' + m(hi) + '. The integers are ' + m(lo + 1) + ' up to ' + m(hi) + ', which is ' + len + ' integers.', w: [[len + 1, 'The left end is strict, so ' + m(lo) + ' is not included.']] });
    }),
  ],
});
