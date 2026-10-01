import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const digitsTo = (n) => { let t = 0; for (let i = 1; i <= n; i++) t += String(i).length; return t; };

export default lesson({
  id: 'pre-14-1-counting-with-addition-and-subtraction',
  title: 'Counting with addition and subtraction',
  blurb: 'Count lists without listing them, split into cases, count the complement, and fix double counting.',
  concepts: ['counting', 'fence-post', 'complement', 'inclusion-exclusion'],

  tryFirst: [
    num('t1', 'In a class of 30 students, 18 play soccer and 14 play chess. Every student plays at least one of the two. How many play both?', 2, {
      h: ['If you add 18 + 14, you get more than 30. Who got counted twice?', 'The extra is exactly the number counted twice.'],
      s: '18 + 14 = 32, but there are only 30 students. The 2 extra counts are the students counted in both groups, so 2 play both.',
      w: [['32', 'That is the sum of the two groups. Students who play both were counted twice, so the answer is less than that.']],
    }),
    num('t2', 'How many whole numbers are there from 23 to 71, including both 23 and 71?', 49, {
      h: ['Try a tiny case first: how many whole numbers from 3 to 5?', 'Subtracting gives one too few.'],
      s: '71 − 23 = 48 steps between them, but 48 steps visit 49 numbers (both ends count). Answer: 49.',
      w: [['48', 'That counts the gaps, not the numbers. From 3 to 5 the gaps are 2 but there are 3 numbers.']],
    }),
  ],

  learn: [
    p('Counting is not just "1, 2, 3...". Good counters never list everything. They find a way to <i>compute</i> how many.'),
    rule('<b>Counting a run.</b> The number of whole numbers from a to b, with both ends included, is <b>b − a + 1</b>. The "+1" fixes the fence-post problem: a fence with 10 sections needs 11 posts.'),
    ex('Multiples in a range', ['How many multiples of 6 are there from 1 to 100?', 'The multiples are 6×1, 6×2, ..., 6×k, and we need 6k ≤ 100.', '100 ÷ 6 = 16.67, so k can be at most 16.', 'So there are 16 multiples of 6.']),
    rule('<b>Adding cases.</b> If every thing you want falls into exactly one of several separate cases, count each case and add. The cases must not overlap.'),
    rule('<b>Subtracting what you do not want.</b> Sometimes it is easier to count everything, then remove the bad ones: <b>wanted = total − unwanted</b>.'),
    ex('A complement', ['How many whole numbers from 1 to 50 are <i>not</i> multiples of 5?', 'All numbers: 50.', 'Multiples of 5: 5, 10, ..., 50, which is 10 of them.', 'Not multiples: 50 − 10 = 40.']),
    widget('venn', { A: 'soccer', B: 'chess', onlyA: 16, both: 2, onlyB: 12, neither: 0 }),
    rule('<b>Overlapping groups.</b> |A or B| = |A| + |B| − |both|. Adding |A| + |B| counts the overlap twice, so subtract it once.'),
    ex('Using the overlap rule', ['In a group of 40, 25 like pizza, 20 like tacos, and 8 like neither.', 'People who like at least one: 40 − 8 = 32.', 'Pizza + tacos = 45, which is 13 more than 32.', 'So 13 people were counted twice: 13 like both.']),
    warn('<b>Double counting.</b> Never add overlapping groups without checking. "Multiples of 2 or of 3" is not (count of 2s) + (count of 3s), because multiples of 6 are in both lists.'),
    mcq('Ben says: "There are 40 − 15 = 25 whole numbers from 15 to 40 inclusive." What is wrong?', ['Nothing, 25 is right.', 'He forgot that both ends count. The answer is 40 − 15 + 1 = 26.', 'He should have added 40 + 15.'], 1, 'Subtracting counts the 25 steps between the numbers. The numbers themselves are one more than the steps: 26.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'How many whole numbers are there from 37 to 92, including both ends?', 56, {
      h: ['Use b − a + 1.'],
      s: '92 − 37 + 1 = 56.',
      w: [['55', 'That is 92 − 37, the number of steps. Add 1 for the starting number.']],
    }),
    num('p2', 'How many multiples of 9 are there from 1 to 200?', 22, {
      h: ['How many times does 9 fit in 200?'],
      s: '9 × 22 = 198 ≤ 200, but 9 × 23 = 207 is too big. So 22.',
      w: [['23', '9 × 23 = 207, which is bigger than 200.']],
    }),
    num('p3', 'How many three-digit numbers (100 to 999) are not multiples of 5?', 720, {
      h: ['Count all the three-digit numbers, then count the multiples of 5 among them.', 'There are 900 three-digit numbers. The multiples of 5 run from 100 to 995.'],
      s: 'All: 999 − 100 + 1 = 900. Multiples of 5 from 100 to 995: that is 5×20 up to 5×199, so 199 − 20 + 1 = 180. Not multiples: 900 − 180 = 720. (Shortcut: one in every five numbers is a multiple, so four fifths are not: 900 × 4/5 = 720.)',
      w: [['180', 'That is how many are multiples of 5. The question asks for those that are not.']],
    }),
    num('p4', 'A class of 40 students: 25 like pizza, 20 like tacos, and 8 like neither. How many like both?', 13, {
      h: ['How many like at least one?', 'Compare 25 + 20 with that number.'],
      s: 'At least one: 40 − 8 = 32. And 25 + 20 = 45. The extra 45 − 32 = 13 are the people counted twice.',
      w: [['5', 'That is 25 − 20. The overlap comes from comparing the sum 25 + 20 with the number who like at least one.'], ['12', 'Be careful: 40 − 8 = 32 like at least one. Then 45 − 32 = 13.']],
    }),
    num('p5', 'How many whole numbers from 1 to 60 are multiples of 4 or multiples of 6 (or both)?', 20, {
      h: ['Count multiples of 4 and multiples of 6 separately.', 'Numbers that are multiples of both are multiples of 12.'],
      s: 'Multiples of 4: 15. Multiples of 6: 10. Multiples of both (12): 5. Total: 15 + 10 − 5 = 20.',
      w: [['25', 'That counts the 5 multiples of 12 twice. Subtract the overlap.']],
    }),
    num('p6', 'How many whole numbers from 1 to 200 are multiples of neither 2 nor 5?', 80, {
      h: ['First count multiples of 2 or 5.', 'Multiples of both 2 and 5 are multiples of 10.'],
      s: 'Multiples of 2: 100. Multiples of 5: 40. Of 10: 20. Of 2 or 5: 100 + 40 − 20 = 120. Neither: 200 − 120 = 80.',
      w: [['120', 'That is the number who are multiples of 2 or 5. The question asks for neither.'], ['60', 'That subtracts 100 + 40 without fixing the double counting of the multiples of 10.']],
    }),
    num('p7', 'The pages of a book are numbered 1 through 150. How many digits are printed in all page numbers?', 342, {
      h: ['Split by how many digits the page numbers have.', 'Pages 1–9 have 1 digit, pages 10–99 have 2, and pages 100–150 have 3.'],
      s: '9 pages × 1 digit = 9. 90 pages (10 to 99) × 2 = 180. 51 pages (100 to 150) × 3 = 153. Total 9 + 180 + 153 = 342.',
      w: [['450', 'That treats all 150 pages as 3 digits. Only the last 51 pages have 3 digits.'], ['150', 'That is the number of pages, but many have two or three digits.']],
    }),
  ],

  challenge: [
    chain('Club sign-ups', 'Of 60 students, 35 joined art, 28 joined robotics, and 12 joined neither.', [
      num('c1a', 'How many joined at least one club?', 48, { h: ['Total minus neither.'], s: '60 − 12 = 48.' }),
      num('c1b', 'How many joined both?', 15, { h: ['35 + 28 counts the "both" students twice.'], s: '35 + 28 = 63, and 63 − 48 = 15.' }),
      num('c1c', 'How many joined art only?', 20, { h: ['Art total minus the ones also in robotics.'], s: '35 − 15 = 20.' }),
    ], 'The idea: |A| + |B| − |both| = |at least one|. Any four of the five numbers (total, A, B, both, neither) give you the fifth.'),
    chain('Hundred and twenty', 'Consider the whole numbers from 1 to 120.', [
      num('c2a', 'How many are multiples of both 3 and 5 (that is, multiples of 15)?', 8, { h: ['120 ÷ 15.'], s: '120 ÷ 15 = 8.' }),
      num('c2b', 'How many are multiples of 3 or multiples of 5 (or both)?', 56, { h: ['Multiples of 3: 40. Multiples of 5: 24.'], s: '40 + 24 − 8 = 56.' }),
      num('c2c', 'How many are multiples of neither 3 nor 5?', 64, { h: ['Total minus the ones you just counted.'], s: '120 − 56 = 64.', w: [['56', 'That is the number who are multiples of 3 or 5. You want the ones who are not.']] }),
    ], 'The idea: to count "neither", count "at least one" carefully with the overlap rule, then subtract from the total.'),
    mc('c3', 'Find the error. Mia counts the numbers from 1 to 100 that are multiples of 2 or 3: "50 multiples of 2, and 33 multiples of 3, so 83." What is wrong?', ['Multiples of 6 are in both lists and were counted twice. The answer is 50 + 33 − 16 = 67.', 'She should have multiplied 50 × 33.', 'There is no mistake.', 'She should have subtracted 33 from 100.'], 0, {
      s: 'Multiples of 6 appear in both lists: 16 of them. 50 + 33 − 16 = 67.',
      w: [[2, 'A number like 6 is in both lists, so adding the counts double counts it.'], [1, 'Multiplication would count pairs. Here you want a union of two lists, so add and fix the overlap.']],
    }),
  ],

  quiz: [
    tpl('run', (r) => {
      const a = r.int(5, 200), b = a + r.int(15, 150);
      return N('How many whole numbers are there from ' + a + ' to ' + b + ', including both ends?', b - a + 1, { s: b + ' − ' + a + ' + 1 = ' + (b - a + 1) + '.', w: [[b - a, 'That counts the steps. Add 1 because both ends are included.']] });
    }),
    tpl('mult', (r) => {
      const m = r.int(3, 13), a = r.int(1, 60), b = a + r.int(80, 400), c = Math.floor(b / m) - Math.floor((a - 1) / m);
      return N('How many multiples of ' + m + ' are there from ' + a + ' to ' + b + ', including both ends?', c, { s: 'Multiples up to ' + b + ': ' + Math.floor(b / m) + '. Multiples below ' + a + ': ' + Math.floor((a - 1) / m) + '. Difference: ' + c + '.', w: W(c, [[Math.floor(b / m), 'That counts all multiples from 1 up. Remove the ones that come before ' + a + '.']]) });
    }),
    tpl('union', (r) => {
      const [m, n] = r.distinct(2, 2, 9), L = r.int(5, 40) * 10; if (m === n) return N('What is 1 + 1?', 2, { s: '2.' });
      let c = 0, a = 0, b = 0; for (let i = 1; i <= L; i++) { const x = i % m === 0, y = i % n === 0; if (x) a++; if (y) b++; if (x || y) c++; }
      return N('How many whole numbers from 1 to ' + L + ' are multiples of ' + m + ' or of ' + n + ' (or both)?', c, { s: 'Multiples of ' + m + ': ' + a + '. Multiples of ' + n + ': ' + b + '. Overlap (multiples of ' + (m * n / gcd(m, n)) + '): ' + (a + b - c) + '. Total: ' + a + ' + ' + b + ' − ' + (a + b - c) + ' = ' + c + '.', w: W(c, [[a + b, 'Some numbers are multiples of both and were counted twice. Subtract the overlap.']]) });
    }),
    tpl('neither', (r) => {
      const T = r.int(30, 120), A = r.int(10, Math.floor(T * 0.7)), B = r.int(10, Math.floor(T * 0.7)), lo = Math.max(0, A + B - T), hi = Math.min(A, B), both = r.int(lo, hi), nei = T - (A + B - both);
      return N('In a group of ' + T + ' students, ' + A + ' play an instrument, ' + B + ' play a sport, and ' + both + ' do both. How many do neither?', nei, { s: 'At least one: ' + A + ' + ' + B + ' − ' + both + ' = ' + (A + B - both) + '. Neither: ' + T + ' − ' + (A + B - both) + ' = ' + nei + '.', w: W(nei, [[T - A - B, 'Subtracting both groups removes the "both" students twice. Add the overlap back.']]) });
    }),
    tpl('both', (r) => {
      const T = r.int(30, 120), A = r.int(10, Math.floor(T * 0.7)), B = r.int(10, Math.floor(T * 0.7)), lo = Math.max(0, A + B - T), hi = Math.min(A, B), both = r.int(lo, hi), nei = T - (A + B - both);
      return N('In a group of ' + T + ' people, ' + A + ' have a dog, ' + B + ' have a cat, and ' + nei + ' have neither. How many have both a dog and a cat?', both, { s: 'At least one pet: ' + T + ' − ' + nei + ' = ' + (T - nei) + '. Both: ' + A + ' + ' + B + ' − ' + (T - nei) + ' = ' + both + '.', w: W(both, [[A + B, 'That is the sum of the two groups, which counts the overlap twice. Compare it with the number who have at least one pet.']]) });
    }),
    tpl('notmult', (r) => {
      const m = r.int(3, 12), L = r.int(40, 400);
      return N('How many whole numbers from 1 to ' + L + ' are not multiples of ' + m + '?', L - Math.floor(L / m), { s: 'Multiples of ' + m + ': ' + Math.floor(L / m) + '. Not multiples: ' + L + ' − ' + Math.floor(L / m) + ' = ' + (L - Math.floor(L / m)) + '.', w: W(L - Math.floor(L / m), [[Math.floor(L / m), 'That is how many are multiples. The question asks for the others.']]) });
    }),
    tpl('digits', (r) => {
      const n = r.int(10, 260), d = digitsTo(n);
      return N('A notebook\'s pages are numbered 1 through ' + n + '. How many digits are printed altogether?', d, { s: 'Count by digit length: pages 1–9 give 9 digits, pages 10–' + Math.min(n, 99) + ' give ' + 2 * (Math.min(n, 99) - 9) + (n > 99 ? ', pages 100–' + n + ' give ' + 3 * (n - 99) : '') + '. Total ' + d + '.', w: W(d, [[n, 'That is the number of pages. Most page numbers use more than one digit.']]) });
    }),
    tpl('arith', (r) => {
      const a = r.int(2, 30), d = r.int(2, 9), k = r.int(15, 90), last = a + d * (k - 1);
      return N('How many numbers are in the list ' + a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', ..., ' + last + ' (each is ' + d + ' more than the one before)?', k, { s: 'From ' + a + ' to ' + last + ' is ' + (last - a) + ', which is ' + (k - 1) + ' jumps of ' + d + '. Numbers: ' + (k - 1) + ' + 1 = ' + k + '.', w: W(k, [[k - 1, 'That counts the jumps. There is one more number than jumps.']]) });
    }),
  ],
});
