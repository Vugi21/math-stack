import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const dsum = (n) => String(n).split('').reduce((a, c) => a + Number(c), 0);
const change = (target, coins) => { const w = new Array(target + 1).fill(0); w[0] = 1; for (const c of coins) for (let i = c; i <= target; i++) w[i] += w[i - c]; return w[target]; };
const stairs = (n, steps) => { const w = [1]; for (let i = 1; i <= n; i++) { w[i] = 0; for (const s of steps) if (i - s >= 0) w[i] += w[i - s]; } return w[n]; };

export default lesson({
  id: 'pre-14-3-casework',
  title: 'Casework',
  blurb: 'When one big count is too tangled, split it into separate cases, count each, and add.',
  concepts: ['casework', 'systematic-counting'],

  tryFirst: [
    num('t1', 'Two ordinary dice are rolled, one red and one blue. How many different (red, blue) outcomes add up to 9?', 4, {
      h: ['What could the red die show? For each, what must the blue die show?', 'A red 1 or 2 makes it impossible: why?'],
      s: 'Red 3 needs blue 6. Red 4 needs blue 5. Red 5 needs blue 4. Red 6 needs blue 3. That is 4 outcomes.',
      w: [['2', 'The pairs (3, 6) and (6, 3) are different outcomes because the dice are different colors. List all.']],
    }),
    num('t2', 'In how many different ways can you make exactly 40 cents using nickels (5¢), dimes (10¢) and quarters (25¢)? You may use as many of each coin as you like, and you do not have to use all three kinds.', 7, {
      h: ['Split into cases by how many quarters you use.', 'In each case, split again by the number of dimes. Nickels fill in the rest.'],
      s: '0 quarters: 40¢ left, dimes can be 0, 1, 2, 3 or 4 (nickels fill the rest): 5 ways. 1 quarter: 15¢ left, dimes can be 0 or 1: 2 ways. Total 5 + 2 = 7.',
      w: [['5', 'That is only the "no quarters" case. A quarter is allowed too.'], ['6', 'Recount: 0 quarters gives 5 ways, 1 quarter gives 2 ways.']],
    }),
  ],

  learn: [
    p('Some counting problems are a tangle: no neat sequence of choices. <b>Casework</b> untangles them. You split the possibilities into a few separate cases, count each easily, then add.'),
    rule('<b>Casework.</b> Choose a feature that sorts every possibility into exactly one case (no overlaps, nothing left out). Count each case. Add the totals.'),
    ex('Two dice that sum to 7', ['Case by the value of the first die: 1, 2, 3, 4, 5 or 6.', 'First die 1 needs second 6. First die 2 needs 5. And so on: each first value has exactly one partner that works.', 'That is 6 cases of 1 outcome each: 6 ways.']),
    tbl(['Sum of two dice', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], [['Ways', '1', '2', '3', '4', '5', '6', '5', '4', '3', '2', '1']], 'The 36 outcomes sorted by sum'),
    ex('Making change', ['Ways to make 30¢ from nickels, dimes, quarters.', 'Case 0 quarters: 30¢ from dimes and nickels: 0, 1, 2 or 3 dimes, nickels fill the rest. 4 ways.', 'Case 1 quarter: 5¢ left: only a nickel. 1 way.', 'Total 4 + 1 = 5.']),
    p('Tip: pick the case split that makes each case <i>easy</i>. For coins, split by the largest coin first. For numbers, split by the first digit. For paths, split by the first step or the last step.'),
    ex('Digit sums', ['How many two-digit numbers have digits that add to 9?', 'Case by tens digit: 1 → 18, 2 → 27, 3 → 36, 4 → 45, 5 → 54, 6 → 63, 7 → 72, 8 → 81, 9 → 90.', 'One number per case, 9 cases, 9 numbers.']),
    widget('countingTree', { a: 3, b: 2, c: 2, labels: ['first choice', 'second choice', 'third (0 = none)'] }),
    p('Casework can include multiplication inside each case. When the cases are separate, add; when you have stages inside a case, multiply.'),
    warn('<b>Two ways to fail.</b> Cases that overlap (you count something twice) or cases that leave a possibility out. Before you add, ask: "Could one thing be in two of my cases? Is anything in none?"'),
    mcq('Leo counts the ways two dice sum to 8: "(2,6), (3,5), (4,4) so 3 ways." What did he miss?', ['Nothing, 3 is right.', 'The dice are different, so (6,2) and (5,3) are separate outcomes. The answer is 5.', 'He should have counted (1,7).'], 1, 'With two distinguishable dice, (2,6) and (6,2) are different. The outcomes are (2,6), (3,5), (4,4), (5,3), (6,2): 5 ways.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Two dice, one red and one blue, are rolled. How many (red, blue) outcomes have a sum of 7?', 6, {
      h: ['Case by the red die: 1 through 6.'],
      s: 'Each red value from 1 to 6 has exactly one blue partner: 6 ways.',
      w: [['3', 'You counted pairs like (1,6) and (6,1) as one. The dice are different colors, so those are different outcomes.']],
    }),
    num('p2', 'How many two-digit numbers have digits that add up to 10?', 9, {
      h: ['Case by the tens digit, from 1 to 9.'],
      s: 'Tens digit 1: 19. 2: 28. 3: 37. ... 9: 91. One number per tens digit: 9 numbers.',
      w: [['10', 'Each tens digit from 1 to 9 gives exactly one number, so there are 9 cases. Check that you did not count something like "10 + 0" as a number.']],
    }),
    num('p3', 'In how many ways can you make 50¢ using nickels, dimes and quarters?', 10, {
      h: ['Case by the number of quarters: 0, 1 or 2.'],
      s: '0 quarters: 50¢ from dimes (0 to 5) and nickels: 6 ways. 1 quarter: 25¢ left, dimes 0 to 2: 3 ways. 2 quarters: 1 way. Total 6 + 3 + 1 = 10.',
      w: [['9', 'Recount the case with no quarters: dimes can be 0, 1, 2, 3, 4 or 5, which is 6 ways.']],
    }),
    num('p4', 'How many three-digit numbers have digits that add up to 4?', 10, {
      h: ['Case by the hundreds digit: 1, 2, 3 or 4.', 'For hundreds digit 1, the other two digits must add to 3. List them.'],
      s: 'Hundreds 1: other two digits add to 3 (03, 12, 21, 30): 4 numbers. Hundreds 2: add to 2 (02, 11, 20): 3. Hundreds 3: add to 1 (01, 10): 2. Hundreds 4: 00: 1. Total 4 + 3 + 2 + 1 = 10.',
      w: [['4', 'That is only the case where the hundreds digit is 1. Add the other cases.']],
    }),
    num('p5', 'How many whole numbers from 1 to 99 contain at least one digit 7?', 19, {
      h: ['Count numbers ending in 7, then those starting with 7, then fix the overlap.'],
      s: 'Ending in 7: 7, 17, ..., 97, which is 10 numbers. Tens digit 7: 70 to 79, which is 10 numbers. The number 77 is in both: 10 + 10 − 1 = 19.',
      w: [['20', 'The number 77 is in both lists, so it was counted twice.']],
    }),
    num('p6', 'A staircase has 5 steps. Each move takes you up 1 step or 2 steps. How many different ways can you climb to the top?', 8, {
      h: ['Case by your last move: it was either 1 step or 2 steps.', 'Count ways to reach step 3 and step 4 first; try 1, 2, 3 steps.'],
      s: 'Ways to reach step n = (ways to reach n−1, then 1 step) + (ways to reach n−2, then 2 steps). Step 1: 1. Step 2: 2. Step 3: 3. Step 4: 5. Step 5: 3 + 5 = 8.',
      w: [['5', 'That is the number of ways for 4 steps. The count for step 5 adds the ways for steps 4 and 3.'], ['10', 'Do not guess a pattern. Count: steps 1 to 5 give 1, 2, 3, 5, 8.']],
    }),
    num('p7', 'A 3 by 3 grid is made of 9 unit squares. How many rectangles of any size (counting squares as rectangles) can be traced along the grid lines?', 36, {
      h: ['Case by the size of the rectangle: 1×1, 1×2, 2×1, 1×3, ...', 'How many places does a 1×2 rectangle fit? Slide it around.', 'Alternatively, a rectangle is chosen by picking 2 of the 4 vertical lines and 2 of the 4 horizontal lines.'],
      s: '1×1: 9. 1×2: 6. 2×1: 6. 1×3: 3. 3×1: 3. 2×2: 4. 2×3: 2. 3×2: 2. 3×3: 1. Total 9 + 6 + 6 + 3 + 3 + 4 + 2 + 2 + 1 = 36.',
      w: [['9', 'That counts only the smallest squares. Count rectangles of every size.'], ['14', 'That counts only squares (9 + 4 + 1). Rectangles that are not square count too.']],
    }),
  ],

  challenge: [
    chain('Stair climbing', 'You climb stairs taking 1 step or 2 steps at a time.', [
      num('c1a', 'How many ways are there to climb 3 stairs?', 3, { h: ['List: 1+1+1, 1+2, 2+1.'], s: '1+1+1, 1+2, 2+1: 3 ways.' }),
      num('c1b', 'How many ways to climb 4 stairs?', 5, { h: ['Case by the last move: 1 step after a 3-stair climb, or 2 steps after a 2-stair climb.'], s: 'ways(4) = ways(3) + ways(2) = 3 + 2 = 5.' }),
      num('c1c', 'How many ways to climb 7 stairs?', 21, { h: ['Keep adding the last two: 1, 2, 3, 5, ...'], s: 'ways: 1, 2, 3, 5, 8, 13, 21 for 1 to 7 stairs. So 21.', w: [['13', 'That is the answer for 6 stairs. One more step: add the last two.']] }),
    ], 'The idea: sort every climb by how it ends (last move 1 step or 2 steps). The number of ways to reach step n is the sum of the cases, which gives a pattern 1, 2, 3, 5, 8, 13, 21.'),
    chain('Two dice', 'Two dice, one red and one blue, are rolled. There are 36 equally listed outcomes.', [
      num('c2a', 'How many outcomes have a sum of 5?', 4, { h: ['Case by the red die from 1 to 4.'], s: '(1,4), (2,3), (3,2), (4,1): 4 outcomes.' }),
      num('c2b', 'How many have a sum of 10?', 3, { h: ['The red die must be at least 4.'], s: '(4,6), (5,5), (6,4): 3 outcomes.' }),
      num('c2c', 'How many outcomes have an even sum?', 18, { h: ['Even sums are 2, 4, 6, 8, 10, 12. Use the table: 1, 3, 5, 5, 3, 1.', 'Or think: the sum is even if both dice have the same parity.'], s: '1 + 3 + 5 + 5 + 3 + 1 = 18. (Or: both odd 3 × 3 = 9 plus both even 3 × 3 = 9, total 18.)', w: [['12', 'That counts only some of the even sums. List every even sum from 2 to 12.']] }),
    ], 'The idea: you can sort by the sum, or by a different feature (same parity) that makes each case a simple multiplication. Choose the splitting that makes each case easy.'),
    mc('c3', 'Find the error. Ava counts the 2-digit numbers with digit sum 5 as: "14, 23, 32, 41. That is 4." Another number she missed is...', ['50, because the digits 5 and 0 add to 5.', '05, because 0 + 5 = 5.', '55, because 5 + 5.', 'She missed nothing.'], 0, {
      s: '50 is a two-digit number whose digits add to 5. The case "tens digit 5" was left out: that is the missing case. The full list is 14, 23, 32, 41, 50: five numbers.',
      w: [[1, '05 is not a two-digit number (it is just 5).'], [2, '5 + 5 = 10, not 5.']],
    }),
  ],

  quiz: [
    tpl('dice', (r) => {
      const a = r.int(4, 10), b = r.int(4, 10), t = r.int(2, a + b); let c = 0; for (let i = 1; i <= a; i++) for (let j = 1; j <= b; j++) if (i + j === t) c++;
      return N('A fair ' + a + '-sided die (numbered 1 to ' + a + ') and a ' + b + '-sided die (1 to ' + b + ') are rolled. In how many (first, second) outcomes is the sum ' + t + '?', c, { s: 'Case by the first die: for each value i from 1 to ' + a + ', the second must be ' + t + ' − i, which works only if it is between 1 and ' + b + '. That gives ' + c + ' outcomes.', w: W(c, [[c % 2 ? (c + 1) / 2 : c / 2, 'Both (i, j) and (j, i) can be different outcomes when the dice are different. Count each one.']]) });
    }),
    tpl('change', (r) => {
      const sets = [[5, 10, 25], [5, 10, 20], [2, 5, 10], [5, 20, 50], [10, 25, 50]], co = r.pick(sets), t = co[0] * r.int(6, 20), c = change(t, co);
      return N('Using coins worth ' + co.join(', ') + ' cents (as many of each as you like, and not all kinds are needed), in how many ways can you make exactly ' + t + ' cents?', c, { s: 'Split into cases by how many of the largest coin you use, then the middle one; the smallest fills the rest. Counting every case gives ' + c + '.', w: W(c, [[c - 1, 'Check the case that uses none of the biggest coin, and the case with none of the middle coin.'], [c + 1, 'Check that each case is counted once and that the remainder really can be filled by the smallest coin.']]) });
    }),
    tpl('digsum', (r) => {
      const len = r.pick([2, 3]), lo = len === 2 ? 10 : 100, hi = len === 2 ? 99 : 999, s = r.int(2, len === 2 ? 17 : 24); let c = 0; for (let i = lo; i <= hi; i++) if (dsum(i) === s) c++;
      return N('How many ' + len + '-digit numbers have digits that add up to ' + s + '?', c, { s: 'Case by the first digit; for each, count the ways the remaining digits can make up the rest. The total is ' + c + '.', w: W(c, [[c + 1, 'Check the extreme cases: a first digit of 1, and a first digit large enough that the other digits are 0 or 9.']]) });
    }),
    tpl('contain', (r) => {
      const n = r.int(60, 400), d = r.int(1, 9); let c = 0; for (let i = 1; i <= n; i++) if (String(i).includes(String(d))) c++;
      return N('How many whole numbers from 1 to ' + n + ' contain the digit ' + d + ' at least once?', c, { s: 'Count by case (ones digit, tens digit, hundreds digit) and fix any overlaps. The answer is ' + c + '.' });
    }),
    tpl('stairs', (r) => {
      const steps = r.pick([[1, 2], [1, 2, 3], [1, 3]]), n = r.int(4, 11), c = stairs(n, steps), nm = name(r);
      return N(nm + ' climbs a staircase of ' + n + ' steps. Each move goes up ' + steps.join(' or ') + ' step' + (steps.length > 1 || steps[0] > 1 ? 's' : '') + '. How many different ways can ' + nm + ' reach the top?', c, { s: 'Sort by the last move: ways(n) = ' + steps.map((k) => 'ways(n−' + k + ')').join(' + ') + '. Building up from ways(0) = 1 gives ' + c + ' for ' + n + ' steps.', w: W(c, [[stairs(n - 1, steps), 'That is the count for one step fewer. Add the cases for each possible last move.']]) });
    }),
    tpl('rects', (r) => {
      const a = r.int(2, 7), b = r.int(2, 7), c = (a * (a + 1) / 2) * (b * (b + 1) / 2);
      return N('A grid is made of ' + a + ' by ' + b + ' unit squares. How many rectangles of any size (squares included) can be traced along its lines?', c, { s: 'Choose 2 of the ' + (a + 1) + ' vertical lines and 2 of the ' + (b + 1) + ' horizontal lines. That is ' + (a * (a + 1) / 2) + ' × ' + (b * (b + 1) / 2) + ' = ' + c + '.', w: W(c, [[a * b, 'That counts only the smallest squares. Count rectangles of all sizes.']]) });
    }),
    tpl('rangedig', (r) => {
      const lo = r.int(100, 600), hi = lo + r.int(40, 300), s = r.int(5, 18); let c = 0; for (let i = lo; i <= hi; i++) if (dsum(i) === s) c++;
      if (!c) return N('How many whole numbers from 100 to 100 are there?', 1, { s: '1.' });
      return N('How many whole numbers from ' + lo + ' to ' + hi + ' have a digit sum of ' + s + '?', c, { s: 'Case by the first two digits, and see which last digit (if any) completes the sum. Total: ' + c + '.', w: W(c, [[c + 1, 'Be careful with each block of ten: the last digit must be between 0 and 9, and the number must stay in range.']]) });
    }),
    tpl('spin', (r) => {
      const a = r.int(3, 9), b = r.int(3, 9); let c = 0; for (let i = 1; i <= a; i++) for (let j = 1; j <= b; j++) if ((i * j) % 2 === 0) c++;
      return N('Two spinners are numbered 1 to ' + a + ' and 1 to ' + b + '. How many (first, second) outcomes give an even product?', c, { s: 'An odd product needs both numbers odd: ' + Math.ceil(a / 2) + ' × ' + Math.ceil(b / 2) + ' = ' + Math.ceil(a / 2) * Math.ceil(b / 2) + '. All outcomes: ' + a * b + '. Even: ' + a * b + ' − ' + Math.ceil(a / 2) * Math.ceil(b / 2) + ' = ' + c + '.', w: W(c, [[Math.ceil(a / 2) * Math.ceil(b / 2), 'That is the number of odd products. The question asks for even products.']]) });
    }),
  ],
});
