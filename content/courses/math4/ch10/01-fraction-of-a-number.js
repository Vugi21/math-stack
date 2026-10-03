import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'm4-10-1-fraction-of-a-number',
  title: 'A fraction of a number',
  blurb: 'Find a part of a quantity, and work backward from the part to the whole.',
  concepts: ['fractions', 'fraction-of-quantity', 'multiplication'],

  tryFirst: [
    num('t1', 'A ribbon is 24 cm long. You cut off one third of it. How many centimetres do you cut off?', 8, {
      h: ['Cutting off one third means cutting the ribbon into 3 equal parts and taking 1.', 'How long is each of the 3 parts?'],
      s: '24 cm cut into 3 equal parts gives 8 cm each. One part is 8 cm.',
      w: [['72', 'You multiplied by 3. One third means 3 equal parts, so divide.'], ['16', 'That is the part you keep. The question asks for the part you cut off.']],
    }),
    num('t2', 'A bag has 20 marbles. Three fifths of them are blue. How many marbles are not blue?', 8, {
      h: ['First find one fifth of 20.', 'Three fifths are blue. How many fifths are not blue?'],
      s: 'One fifth of 20 is 4. Blue is 3 × 4 = 12. Not blue is 20 − 12 = 8. Or: 2 fifths are not blue, and 2 × 4 = 8.',
      w: [['12', 'That is how many are blue. The question asks for the marbles that are not blue.'], ['4', 'That is only one fifth of the marbles. Count how many fifths are not blue.']],
    }),
  ],

  learn: [
    p('A fraction tells you how many equal parts to take. In math, the word <b>of</b> with a fraction means <b>multiply</b>. "One third <b>of</b> 24" is {1/3} × 24.'),
    p('A <b>unit fraction</b> has 1 on top, like {1/3} or {1/8}. To find a unit fraction of a number, cut the number into equal parts. {1/3} of 24 is 24 ÷ 3 = 8.'),
    rule('<b>Unit fraction of a number.</b> {1/d} of N is N ÷ d. Split N into d equal parts. One part is the answer.'),
    widget('fractionExplorer', { n: 3, d: 5 }),
    p('Now take {3/5} of 40. The bar above shows 5 equal parts. Three of them are shaded. First find one part, then count three of them.'),
    ex('A fraction of a number in two steps', ['Find {3/5} of 40.', 'One fifth of 40 is 40 ÷ 5 = 8.', 'Three fifths is three of those parts: 3 × 8 = 24.', 'So {3/5} of 40 is 24. Check: {3/5} is more than half, and 24 is more than half of 40.']),
    rule('<b>Any fraction of a number.</b> To find {a/b} of N: divide N by b, then multiply by a. Divide first, so the numbers stay small.'),
    p('You can also go <b>backward</b>. Suppose 12 is {3/4} of a number. Three parts make 12. So one part is 12 ÷ 3 = 4. The whole has 4 parts, so the whole is 4 × 4 = 16.'),
    rule('<b>Finding the whole.</b> If a parts out of b equal parts total P, then one part is P ÷ a. The whole is that part times b.'),
    tbl(['Question', 'Step 1', 'Step 2'], [['{2/3} of 18', '18 ÷ 3 = 6', '6 × 2 = 12'], ['{5/8} of 32', '32 ÷ 8 = 4', '4 × 5 = 20'], ['15 is {3/7} of what?', '15 ÷ 3 = 5', '5 × 7 = 35']], 'Divide by the bottom, multiply by the top. For a whole, divide by the top, multiply by the bottom.'),
    warn('<b>Watch out.</b> In "12 is {3/4} of a number", the whole is <i>bigger</i> than 12. If your answer is smaller than 12, you went the wrong way. A part is always smaller than the whole.'),
    mcq('Ava says: "12 is three quarters of a number, so the number is 12 × {3/4} = 9." What is wrong?', ['Nothing, she is right.', '12 is the part, not the whole. The whole must be bigger than 12, so she should divide by 3 and multiply by 4 to get 16.', 'She should have added 12 and 3.'], 1, 'Three parts make 12, so one part is 4. Four parts make 16. And 12 is {3/4} of 16, because {3/4} of 16 is 12.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is {3/4} of 28?', 21, {
      h: ['Find one quarter of 28 first.'],
      s: '28 ÷ 4 = 7. Three quarters is 3 × 7 = 21.',
      w: [['7', 'That is one quarter. You need three of those parts.'], ['84', 'You multiplied 28 by 3 and stopped. Divide by the bottom number first.']],
    }),
    num('p2', 'What is {5/6} of 42?', 35, {
      h: ['One sixth of 42 is...?'],
      s: '42 ÷ 6 = 7. Five sixths is 5 × 7 = 35.',
      w: [['7', 'That is one sixth. You need five of them.'], ['210', 'Divide by 6 first, then multiply by 5.']],
    }),
    num('p3', '15 is {3/5} of a number. What is the number?', 25, {
      h: ['Three parts make 15. How big is one part?', 'The whole has 5 parts.'],
      s: '15 ÷ 3 = 5 is one part. The whole is 5 × 5 = 25.',
      w: [['9', 'You found {3/5} of 15. But 15 is the part, and we want the whole.'], ['5', 'That is the size of one part. The whole has 5 of them.']],
    }),
    num('p4', '{2/5} of a number is 14. What is {3/5} of the same number?', 21, {
      h: ['Two fifths is 14. What is one fifth?', 'Then count three fifths.'],
      s: 'One fifth is 14 ÷ 2 = 7. Three fifths is 3 × 7 = 21. You never need the whole number itself.',
      w: [['35', 'That is the whole number. The question asks for three fifths of it.'], ['7', 'That is one fifth. You need three fifths.']],
    }),
    num('p5', 'A book has 120 pages. Mia reads {1/4} of it on Monday. On Tuesday she reads {1/3} of the pages that are left. How many pages are still unread after Tuesday?', 60, {
      h: ['Find the Monday pages, then the pages left.', 'The Tuesday fraction is of the pages left, not of 120.'],
      s: 'Monday: 120 ÷ 4 = 30 pages. Left: 90. Tuesday: 90 ÷ 3 = 30 pages. Unread: 90 − 30 = 60.',
      w: [['40', 'You took {1/3} of 120. Tuesday\'s fraction is of the pages left after Monday.'], ['30', 'That is the number of pages read on one of the days, not the pages left.']],
    }),
    mc('p6', 'Which is greater: {3/4} of 40, or {5/6} of 36?', ['{3/4} of 40', '{5/6} of 36', 'They are equal', 'You cannot tell without a calculator'], 2, {
      h: ['Work out both amounts.'],
      s: '{3/4} of 40 is 3 × 10 = 30. {5/6} of 36 is 5 × 6 = 30. They are equal.',
      w: [[0, 'Check: {3/4} of 40 is 30. What is {5/6} of 36?'], [1, 'Check: {5/6} of 36 is 30. What is {3/4} of 40?']],
    }),
    num('p7', 'A water tank is {1/4} full. After 15 more litres go in, it is {3/4} full. How many litres does the full tank hold?', 30, {
      h: ['How much of the tank did the 15 litres fill?', 'If that fraction is 15 litres, find the whole.'],
      s: 'The tank went from {1/4} to {3/4}, so 15 litres filled {2/4}, which is {1/2}. Half of the tank is 15 litres, so the full tank holds 30 litres.',
      w: [['60', '15 litres is not {1/4} of the tank. It filled {3/4} − {1/4} of the tank. Find that first.'], ['20', 'Check: is 15 litres really {3/4} of the tank? It is the amount that was added.']],
    }),
  ],

  challenge: [
    chain('The shopping money', 'Ava has $72. She spends {1/3} of her money on a book.', [
      num('c1a', 'How many dollars does she have left?', 48, { h: ['Find one third of 72 first.'], s: '72 ÷ 3 = 24 spent. 72 − 24 = 48 left.' }),
      num('c1b', 'She then spends {3/8} of what is left on lunch. How many dollars is lunch?', 18, { h: ['Take {3/8} of 48, not of 72.'], s: '48 ÷ 8 = 6. Three eighths is 3 × 6 = 18 dollars.' }),
      num('c1c', 'What fraction of her original $72 does she still have? Give the fraction in lowest terms.', '5/12', { h: ['How many dollars are left after lunch?', 'Write that over 72 and simplify.'], s: 'After lunch: 48 − 18 = 30 dollars. 30 out of 72 is {30/72} = {5/12}.' }),
    ], 'The idea: when a fraction is "of what is left", it changes the whole you are taking a part of. Track the amount after every step.'),
    chain('Working backward', 'Kira gives away {2/5} of her stickers. She has 36 stickers left.', [
      num('c2a', 'What fraction of her stickers does Kira still have?', '3/5', { h: ['The whole is 5 fifths. She gave away 2 of them.'], s: '5 fifths − 2 fifths = 3 fifths.' }),
      num('c2b', 'How many stickers did Kira start with?', 60, { h: ['Three fifths is 36. Find one fifth.'], s: '36 ÷ 3 = 12 is one fifth. The whole is 5 × 12 = 60.', w: [['36', 'That is how many she has left. Find how many she started with.']] }),
      num('c2c', 'How many stickers did she give away?', 24, { h: ['She gave away 2 fifths. One fifth is 12.'], s: '2 × 12 = 24. Check: 60 − 24 = 36.' }),
    ], 'The idea: the amount left is a fraction of the start, not of itself. Find the fraction that matches what you know, then find one part.'),
    mc('c3', 'Find the error. Leo says: "{2/3} of a rope is 10 m, so the whole rope is 10 ÷ 3 × 2." Which is the best correction?', ['He should divide by 2 and multiply by 3, because 10 m is 2 parts and the whole is 3 parts. The rope is 15 m.', 'He is right, the rope is {20/3} m.', 'He should multiply 10 by {2/3} to get {20/3} m.', 'The rope is 10 + 3 = 13 m.'], 0, {
      s: 'Two parts make 10 m, so one part is 5 m. Three parts make 15 m. Check: {2/3} of 15 is 10.',
      w: [[1, 'The whole must be bigger than the part. {20/3} is smaller than 10, so it cannot be the whole.'], [2, 'That finds a part of the part. The whole must be bigger than 10 m.']],
    }),
  ],

  quiz: [
    tpl('unit', (r) => {
      const d = r.int(3, 9), k = r.int(2, 12), n = d * k;
      return N('What is ' + F(1, d) + ' of ' + n + '?', k, { s: n + ' ÷ ' + d + ' = ' + k + '.', w: W(k, [[n * d, 'Finding ' + F(1, d) + ' of a number means dividing by ' + d + ', not multiplying.']]) });
    }),
    tpl('nonunit', (r) => {
      const d = r.int(3, 10), a = r.int(2, d - 1), k = r.int(2, 9), n = d * k;
      return N('What is ' + F(a, d) + ' of ' + n + '?', a * k, { s: n + ' ÷ ' + d + ' = ' + k + ' is one part. ' + a + ' × ' + k + ' = ' + a * k + '.', w: W(a * k, [[k, 'That is one part. Multiply by the top number to get ' + a + ' parts.'], [n - a * k, 'That is the part that is left over. The question asks for ' + F(a, d) + ' itself.']]) });
    }),
    tpl('whole', (r) => {
      const d = r.int(3, 10), a = r.int(2, d - 1), k = r.int(2, 9), who = name(r);
      return N(who + ' has some stickers. ' + F(a, d) + ' of them is ' + a * k + ' stickers. How many stickers does ' + who + ' have?', d * k, { s: a * k + ' ÷ ' + a + ' = ' + k + ' is one part. ' + d + ' × ' + k + ' = ' + d * k + '.', w: W(d * k, [[k, 'That is one part. The whole has ' + d + ' parts.'], [a * k * d, 'Divide by the top first, then multiply by the bottom.']]) });
    }),
    tpl('left', (r) => {
      const d = r.int(3, 9), a = r.int(1, d - 1), k = r.int(3, 11), n = d * k, who = name(r);
      return N(who + ' has ' + n + ' coins and gives away ' + F(a, d) + ' of them. How many coins are left?', (d - a) * k, { s: n + ' ÷ ' + d + ' = ' + k + '. Given away: ' + a * k + '. Left: ' + n + ' − ' + a * k + ' = ' + (d - a) * k + '.', w: W((d - a) * k, [[a * k, 'That is how many were given away. Find how many are left.']]) });
    }),
    tpl('two', (r) => {
      const b = r.int(2, 5), d = r.int(2, 6), k = r.int(1, 6), m = b * d * k, rest = (b - 1) * d * k;
      return N('A shop has ' + m + ' apples. It sells ' + F(1, b) + ' of them in the morning, then ' + F(1, d) + ' of the apples that remain in the afternoon. How many apples are left at the end?', rest - rest / d, { s: 'Morning: ' + m / b + ' sold, ' + rest + ' remain. Afternoon: ' + rest / d + ' sold. Left: ' + rest + ' − ' + rest / d + ' = ' + (rest - rest / d) + '.', w: W(rest - rest / d, [[m - m / b - m / d, 'The afternoon fraction is of the apples that remain, not of all ' + m + '.'], [rest, 'That is the number left after the morning only.']]) });
    }),
    tpl('sum', (r) => {
      const b = r.pick([3, 4, 5, 6]), d = r.pick([2, 3, 4, 5, 8]), a = r.int(1, b - 1), c = r.int(1, d - 1), k1 = r.int(2, 8), k2 = r.int(2, 8);
      const n1 = b * k1, n2 = d * k2;
      return N('What is ' + F(a, b) + ' of ' + n1 + ' plus ' + F(c, d) + ' of ' + n2 + '?', a * k1 + c * k2, { s: F(a, b) + ' of ' + n1 + ' is ' + a * k1 + '. ' + F(c, d) + ' of ' + n2 + ' is ' + c * k2 + '. Total: ' + (a * k1 + c * k2) + '.' });
    }),
    tpl('notpart', (r) => {
      const d = r.int(4, 9), a = r.int(2, d - 2), k = r.int(2, 8), n = d * k;
      return N(F(a, d) + ' of the ' + n + ' seats in a hall are taken. How many seats are empty?', (d - a) * k, { s: 'Empty seats are ' + F(d - a, d) + ' of ' + n + '. ' + n + ' ÷ ' + d + ' = ' + k + ', and ' + (d - a) + ' × ' + k + ' = ' + (d - a) * k + '.', w: W((d - a) * k, [[a * k, 'That is the number of taken seats. The question asks for the empty ones.']]) });
    }),
    tpl('diff', (r) => {
      const d = r.int(3, 8), a = r.int(2, d - 1), k = r.int(3, 9), e = r.int(2, 6), c = r.int(1, e - 1), j = r.int(2, 5);
      const big = a * k, small = c * j;
      const hi = Math.max(big, small), lo = Math.min(big, small);
      const hiT = big >= small ? F(a, d) + ' of ' + d * k : F(c, e) + ' of ' + e * j, loT = big >= small ? F(c, e) + ' of ' + e * j : F(a, d) + ' of ' + d * k;
      return N('How much more is ' + hiT + ' than ' + loT + '? If they are equal, answer 0.', hi - lo, { s: 'The two amounts are ' + hi + ' and ' + lo + '. The difference is ' + (hi - lo) + '.' });
    }),
  ],
});
