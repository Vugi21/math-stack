import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, sub, eq, cmp, fmt, fm, fmMixed, gcd, tbl, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';
const MS = (w, n, d) => w + ' ' + F(n, d);
const mv = (w, n, d) => R(w * d + n, d);

export default lesson({
  id: 'm4-8-3-mixed-numbers',
  title: 'Mixed numbers',
  blurb: 'Wholes plus a fraction, and fractions bigger than 1. Change between the two forms and compare them.',
  concepts: ['mixed-numbers', 'improper-fractions', 'number-line'],

  tryFirst: [
    num('t1', 'Each pizza is cut into 4 equal slices. The class eats 11 slices. How many pizzas is that? Write it as a whole number and a fraction, like 3 1/2.', '11/4', { mixed: true,
      h: ['How many slices make one whole pizza?', 'Take out whole pizzas first. What is left over?'],
      s: '4 slices make a pizza. 11 = 4 + 4 + 3, so 2 whole pizzas and 3 slices left over. The answer is 2 and {3/4}.',
      w: [['3 2/4', 'Check: 3 pizzas would be 12 slices, which is more than 11.']] }),
    num('t2', 'A number line from 0 to 3 is marked in halves. How many marks are on it, counting the marks at 0 and at 3?', 7, {
      h: ['List the marks: 0, {1/2}, 1, ...', 'How many halves fit between 0 and 3?'],
      s: 'There are 2 halves in each whole, so 6 halves in 3. The marks are 0, {1/2}, 1, 1 {1/2}, 2, 2 {1/2}, 3. That is 7 marks, one more than the 6 steps.',
      w: [['6', 'There are 6 steps, but the marks are one more than the steps, because the mark at 0 counts too.']] }),
  ],

  learn: [
    p('Not every amount is smaller than one whole. A recipe may need 2 and a half cups. A rope may be 11 fourths of a meter long. This lesson shows two ways to write numbers bigger than 1, and how to switch between them.'),
    def('mixed number', 'A whole number and a fraction together. The number 2 {3/4} means 2 + {3/4}. It is between 2 and 3.'),
    def('proper fraction', 'A fraction whose top is <b>less</b> than its bottom, such as {3/4}. It is less than 1.'),
    def('improper fraction', 'A fraction whose top is greater than or equal to its bottom. {11/4} means 11 pieces of size one fourth. That is more than one whole.'),
    widget('fractionExplorer', { n: 11, d: 4 }),
    formula('Mixed number to improper', 'w {a/b} = {(w × b + a)/b}', 'Multiply the whole w by the bottom b, then add the top a. Keep the bottom.'),
    rule('<b>Mixed number to improper fraction.</b> Each whole holds as many pieces as the bottom number. Multiply the whole by the bottom, then add the top. 3 {2/5}: 3 × 5 = 15, and 15 + 2 = 17, so it is {17/5}.'),
    ex('Why that works', ['Write 3 {2/5} as pieces of size one fifth.', 'One whole is {5/5}. Three wholes are 3 × 5 = 15 fifths.', 'Add the 2 fifths that were already there: 17 fifths.', 'So 3 {2/5} = {17/5}.']),
    rule('<b>Improper fraction to mixed number.</b> Divide the top by the bottom. The quotient is the whole number. The remainder is the new top. {23/6}: 23 ÷ 6 = 3 remainder 5, so it is 3 {5/6}.'),
    ex('Change {41/8} to a mixed number', ['Divide 41 by 8. 8 × 5 = 40, so the quotient is 5 and the remainder is 1.', 'The whole number is 5. The new top is 1. The bottom stays 8.', '{41/8} = 5 {1/8}.', 'Check: 5 × 8 + 1 = 41.']),
    p('<b>On the number line.</b> Between each pair of whole numbers, the fraction part says how far to go. 3 {5/6} is at the 5th mark after 3, when the space from 3 to 4 is cut into sixths.'),
    tip('Check any conversion by going the other way. If {41/8} = 5 {1/8}, then 5 × 8 + 1 should give back 41. A whole number is also a fraction: 4 = {4/1} = {12/3}.'),
    key('Mixed numbers and improper fractions are two names for the <b>same</b> amount. Use mixed numbers to see how big an amount is, and improper fractions when you need to calculate with one fraction.'),
    warn('<b>Watch out.</b> 2 {3/4} means 2 + {3/4}. It does not mean 2 × {3/4}. The whole and the fraction are added.'),
    mcq('Kira writes 2 {3/5} = {8/5}, because 5 + 3 = 8. What did she forget?', ['Nothing. She is right.', 'Each whole holds 5 fifths, so 2 wholes are 10 fifths. The answer is {13/5}.', 'She should have used the 2 as the bottom number.'], 1, '2 wholes are {10/5}. Add the {3/5} that was already there: {13/5}.', 'Spot the mistake'),
    ex('Comparing mixed numbers', ['Which is greater: 3 {5/8} or 3 {2/3}?', 'The wholes are the same. Compare {5/8} and {2/3}.', 'In 24ths: {15/24} and {16/24}.', '{2/3} is greater, so 3 {2/3} is greater.']),
    widget('commonDenominator', { a: 5, b: 8, c: 2, d: 3, mode: 'compare' }),
    rule('<b>Comparing.</b> Look at the whole numbers first. If they are different, the bigger whole number wins (when each fraction part is less than 1). If they are the same, compare the fraction parts. For an improper fraction, change it into a mixed number first.'),
    recap([['mixed number', 'whole number plus a fraction'], ['proper fraction', 'top less than bottom; less than 1'], ['improper fraction', 'top at least the bottom; 1 or more']], [['Mixed to improper', '{(w × b + a)/b}'], ['Improper to mixed', 'divide: quotient = whole, remainder = top']]),
  ],

  practice: [
    num('p1', 'Write 3 {2/7} as an improper fraction.', '23/7', {
      h: ['How many sevenths are in 3 wholes?'],
      s: '3 × 7 = 21 sevenths in the wholes. 21 + 2 = 23. The answer is {23/7}.',
      w: [['5/7', 'You added 3 and 2. Each whole holds 7 sevenths.'], ['6/7', 'You multiplied 3 by 2. Multiply the whole by the BOTTOM, 7.']] }),
    num('p2', 'Write {47/8} as a mixed number.', '47/8', { mixed: true,
      h: ['How many times does 8 go into 47?', 'What is left over?'],
      s: '8 × 5 = 40, and 47 − 40 = 7. So {47/8} = 5 {7/8}.',
      w: [['6 1/8', 'Check: 6 wholes would be 48 eighths, which is more than 47.'], ['5 47/8', 'The leftover is 7 eighths, not 47.']] }),
    num('p3', 'How many thirds are in 4 {2/3}?', 14, {
      h: ['Each whole has 3 thirds.'],
      s: '4 × 3 = 12 thirds in the wholes. 12 + 2 = 14 thirds.',
      w: [['6', 'You added 4 and 2. Each whole is worth 3 thirds.'], ['12', 'You forgot the extra 2 thirds.']] }),
    mc('p4', 'Which number is the greatest?', ['4 {1/2}', '{17/4}', '{13/3}', '{22/5}'], 0, {
      h: ['Write each one as a mixed number first.', 'All four are between 4 and 5. Compare the fraction parts.'],
      s: '{17/4} = 4 {1/4}, {13/3} = 4 {1/3}, {22/5} = 4 {2/5}. The fractions {1/4}, {1/3}, {2/5}, {1/2} in order: {1/2} is the greatest. So 4 {1/2}.',
      w: [[1, '{17/4} = 4 {1/4}. Compare that with 4 {1/2}.'], [2, '{13/3} = 4 {1/3}. Compare that with 4 {1/2}.'], [3, '{22/5} = 4 {2/5}. And {2/5} is less than {1/2}.']] }),
    num('p5', 'Each pie is cut into 8 slices. The class eats 29 slices. How many pies did they eat?', '29/8', { mixed: true,
      h: ['How many pies are 24 slices?'],
      s: '8 × 3 = 24, and 29 − 24 = 5. They ate 3 {5/8} pies.',
      w: [['3 1/8', 'The leftover is 29 − 24 = 5 slices, not 1.']] }),
    num('p6', 'A mixed number is equal to {31/6}. Its whole number is 5. What is its fraction part?', '1/6', {
      h: ['5 wholes are how many sixths?'],
      s: '5 × 6 = 30 sixths. {31/6} has 31, so 1 sixth is left over. The mixed number is 5 {1/6}.',
      w: [['5/6', 'The fraction part is what is left after the 5 wholes (30 sixths) are taken away.']] }),
    num('p7', 'A number line goes from 0 to 5. It is marked in fourths. How many marks are there, counting 0 and 5?', 21, {
      h: ['How many fourths fit in 5 wholes?', 'There is one more mark than there are steps.'],
      s: '5 × 4 = 20 steps. The marks are one more than the steps: 21.',
      w: [['20', 'There are 20 steps. The mark at 0 is one more, so count 21.']] }),
    num('p8', 'How many fractions with bottom 6 are strictly between 2 and 4?', 11, {
      h: ['2 = {12/6} and 4 = {24/6}.', 'Strictly between means leave out both ends.'],
      s: 'The tops 13, 14, ..., 23 are between 12 and 24. That is 23 − 13 + 1 = 11 fractions.',
      w: [['12', 'You counted one end, {12/6} or {24/6}. Leave both out.'], ['13', 'You counted both ends. Leave out both.']] }),
  ],

  challenge: [
    chain('The baker’s scoop', 'A baker measures flour with a scoop that holds {1/3} cup.', [
      num('c1a', 'She fills the scoop 11 times. How many cups of flour is that?', '11/3', { mixed: true, h: ['11 thirds. Take out the whole cups.'], s: '11 ÷ 3 = 3 remainder 2, so 3 {2/3} cups.' }),
      num('c1b', 'How many scoops make exactly 5 cups?', 15, { h: ['How many thirds are in one cup?'], s: 'Each cup is 3 scoops. 5 × 3 = 15 scoops.' }),
      num('c1c', 'A cake needs 4 {1/3} cups. How many scoops is that?', 13, { h: ['Turn 4 {1/3} into thirds.'], s: '4 × 3 = 12, and 12 + 1 = 13 thirds. That is 13 scoops.' }),
    ], 'The idea: a mixed number and an improper fraction are two ways to count the same pieces. Changing between them is counting by wholes, or counting piece by piece.'),
    chain('Sorting three heights', 'Three plants have heights {10/3} cm, {17/5} cm and 3 {1/4} cm.', [
      num('c2a', 'Which height is the least? Write it as a mixed number.', '13/4', { mixed: true, h: ['Turn each into a mixed number. They all start with 3.', 'Compare {1/3}, {2/5} and {1/4}.'], s: '{10/3} = 3 {1/3}, {17/5} = 3 {2/5}, and the third is 3 {1/4}. The least fraction is {1/4}, so 3 {1/4}.' }),
      num('c2b', 'Which height is the greatest? Write it as a mixed number.', '17/5', { mixed: true, h: ['Which fraction part is the biggest?'], s: '{2/5} is bigger than {1/3} and {1/4}. The greatest is 3 {2/5}.' }),
      num('c2c', 'The difference between the greatest and the least is how many sixtieths?', 9, { h: ['{2/5} = {24/60} and {1/4} = {15/60}.'], s: '{24/60} − {15/60} = {9/60}. The difference is 9 sixtieths.' }),
    ], 'The idea: once the whole numbers match, only the fraction parts decide. Put them over one common bottom to see exactly how far apart they are.'),
    mc('c3', 'Find the error. Omar says "2 {7/8} is greater than 3 {1/8}, because {7/8} is greater than {1/8}." Which statement is right?', ['Compare the whole numbers first. 3 is more than 2, so 3 {1/8} is greater. 2 {7/8} is less than 3.', 'Omar is right.', 'They are equal.', 'You cannot compare mixed numbers.'], 0, {
      s: '2 {7/8} is a little less than 3. 3 {1/8} is a little more than 3. The whole numbers decide this one.',
      w: [[1, 'Omar compared only the fractions. But 2 {7/8} is still less than 3.'], [2, 'One is just under 3 and the other is just over 3.']],
    }),
  ],

  quiz: [
    tpl('toimproper', (r) => {
      const w = r.int(2, 9), d = r.int(2, 12), n = r.int(1, d - 1), ans = mv(w, n, d);
      return N('Write ' + MS(w, n, d) + ' as an improper fraction.', fmt(ans), { s: w + ' × ' + d + ' = ' + w * d + ', and ' + w * d + ' + ' + n + ' = ' + (w * d + n) + '. So ' + F(w * d + n, d) + '.', w: W(ans, [[R(w + n, d), 'You added the whole and the top. Each whole holds ' + d + ' pieces, so multiply the whole by ' + d + '.']]) });
    }),
    tpl('tomixed', (r) => {
      const d = r.int(2, 12), w = r.int(1, 9);
      let n = r.int(1, d - 1);
      const top = w * d + n, ans = R(top, d);
      return N('Write ' + F(top, d) + ' as a mixed number.', fmt(ans), { mixed: true, s: top + ' ÷ ' + d + ' = ' + w + ' remainder ' + n + '. So ' + MS(w, n, d) + '.', w: W(ans, [[R(w + 1, 1), 'Rounding up leaves out the fraction part. Keep ' + w + (w === 1 ? ' whole' : ' wholes') + ', and write the pieces left over as a fraction.']]) });
    }),
    tpl('count', (r) => {
      const d = r.int(3, 10), w = r.int(2, 9), n = r.int(1, d - 1), ans = w * d + n;
      const [t, u] = r.pick([['tiles', 'strip'], ['slices', 'pizza'], ['pieces', 'bar']]);
      return N('One ' + u + ' is cut into ' + d + ' equal ' + t + '. How many ' + t + ' make ' + MS(w, n, d) + ' ' + u + 's?', ans, { s: w + ' × ' + d + ' = ' + w * d + ', and ' + w * d + ' + ' + n + ' = ' + ans + '.', w: [[w + n, 'Each whole ' + u + ' has ' + d + ' ' + t + '. Multiply ' + w + ' by ' + d + ' first.']] });
    }),
    tpl('greatest', (r) => {
      let items = null;
      for (let t = 0; t < 300 && !items; t++) {
        const cand = [];
        for (let i = 0; i < 4; i++) { const d = r.int(2, 8); cand.push(R(r.int(2 * d + 1, 8 * d - 1), d)); }
        const distinct = cand.every((v, i) => cand.every((x, j) => i === j || !eq(v, x))) && cand.every((v) => v.d > 1);
        if (distinct) items = cand;
      }
      if (!items) items = [R(17, 4), R(13, 3), R(9, 2), R(22, 5)];
      const show = items.map((v) => (r.bool() ? fm(v) : fmMixed(v)));
      let best = 0;
      items.forEach((v, i) => { if (cmp(v, items[best]) > 0) best = i; });
      if (new Set(show).size < 4) return N('Write ' + fm(items[0]) + ' as a mixed number.', fmt(items[0]), { mixed: true, s: 'Divide the top by the bottom.' });
      return choice(r, 'Which of these numbers is the greatest?', show[best], show.filter((_, i) => i !== best).map((t) => [t, 'Write each number as a mixed number. Look at the whole parts, then at the fraction parts.']), { s: 'As mixed numbers: ' + items.map(fmMixed).join(', ') + '. The greatest is ' + fmMixed(items[best]) + '.' });
    }),
    tpl('between', (r) => {
      const d = r.int(3, 10), A = r.int(1, 5), B = A + r.int(1, 4), ans = (B - A) * d - 1;
      return N('How many fractions with bottom ' + d + ' are strictly between ' + A + ' and ' + B + '?', ans, { s: A + ' = ' + F(A * d, d) + ' and ' + B + ' = ' + F(B * d, d) + '. The tops from ' + (A * d + 1) + ' to ' + (B * d - 1) + ' are between them: ' + ans + ' fractions.', w: [[ans + 2, 'You counted both ends too. "Strictly between" leaves them out.'], [ans + 1, 'You counted one of the ends.']] });
    }),
    tpl('ticks', (r) => {
      const d = r.int(2, 10), Wn = r.int(2, 6), ans = Wn * d + 1;
      return N('A number line from 0 to ' + Wn + ' is marked in steps of ' + F(1, d) + '. How many marks are there, counting 0 and ' + Wn + '?', ans, { s: Wn + ' × ' + d + ' = ' + Wn * d + ' steps. The marks are one more than the steps: ' + ans + '.', w: [[Wn * d, 'That counts the steps. The marks are one more, because 0 is a mark too.']] });
    }),
    tpl('midpoint', (r) => {
      const d = r.int(2, 8), a = r.int(d + 1, 4 * d), b = a + 2 * r.int(1, Math.floor(1.5 * d));
      const ans = R(a + b, 2 * d);
      return N('What number is exactly halfway between ' + fmMixed(R(a, d)) + ' and ' + fmMixed(R(b, d)) + '? Give it as a mixed number if it is bigger than 1.', fmt(ans), { mixed: true, s: 'In ' + F(1, d) + 's the numbers are ' + a + ' and ' + b + '. Halfway is ' + (a + b) / 2 + ' ' + F(1, d) + 's, which is ' + fmMixed(ans) + '.', w: W(ans, [[sub(R(b, d), R(a, d)), 'That is the distance between them. Walk only half of it from the first number.']]) });
    }),
    tpl('fractionpart', (r) => {
      const d = r.int(3, 12), w = r.int(2, 9), n = r.int(1, d - 1), top = w * d + n;
      return N('A mixed number equals ' + F(top, d) + '. Its whole number is ' + w + '. What is its fraction part?', fmt(R(n, d)), { s: w + ' × ' + d + ' = ' + w * d + '. ' + top + ' − ' + w * d + ' = ' + n + (n === 1 ? ' piece is' : ' pieces are') + ' left, so the fraction part is ' + fm(R(n, d)) + '.', w: W(R(n, d), [[R(top - w, d), 'Take away the wholes as pieces: ' + w + ' wholes are ' + w * d + ' pieces, not ' + w + '.']]) });
    }),
  ],
});
