import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, twoNames, R, eq, add, sub, cmp, lcm, fmt, fm } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
const pair = (r, lo, hi) => { for (;;) { const b = r.int(lo, hi), d = r.int(lo, hi); if (b !== d) return [R(r.int(1, b - 1), b), R(r.int(1, d - 1), d)]; } };

export default lesson({
  id: 'pre-4-7-adding-and-subtracting-fractions',
  title: 'Adding and subtracting fractions',
  blurb: 'Pieces of the same size can be counted together. Unlike pieces get matched first.',
  concepts: ['fractions', 'adding-fractions', 'subtracting-fractions', 'lcm'],

  tryFirst: [
    num('t1', 'Ava has {1/2} of a cake and Ben has {1/3} of an identical cake. Cut every piece of both into sixths. How many sixths do they have altogether?', 5, {
      h: ['{1/2} of a cake is how many sixths? {1/3} of a cake is how many sixths?'],
      s: '{1/2} = {3/6} and {1/3} = {2/6}. Together 3 + 2 = 5 sixths.',
      w: [['2', 'You added 1 + 1. Half a cake is 3 sixths and a third of a cake is 2 sixths.'], ['2/5', 'The answer is a count of sixths: how many?']],
    }),
    num('t2', 'A water tank is {5/6} full. A pump drains out {1/4} of the whole tank. What fraction of the tank is full now?', '7/12', {
      h: ['Cut the tank into twelfths. How many twelfths is {5/6}? How many is {1/4}?'],
      s: '{5/6} = {10/12} and {1/4} = {3/12}. {10/12} − {3/12} = {7/12}.',
      w: [['4/2', 'You subtracted tops and bottoms separately. First cut both into pieces of the same size.'], ['1/2', 'Check your arithmetic: {5/6} = {10/12} and you remove {3/12}.']],
    }),
  ],

  learn: [
    p('Adding {2/7} and {3/7} is easy: 2 sevenths plus 3 sevenths is 5 sevenths. We count pieces, and we can only count pieces that are the <b>same size</b>. The size of the pieces (the bottom) does not change.'),
    rule('<b>Same bottom.</b> Add or subtract the tops and keep the bottom. {a/c} + {b/c} = {(a + b)/c}. {a/c} − {b/c} = {(a − b)/c}.'),
    p('What about {1/2} + {1/3}? Halves and thirds are different sizes, like adding 1 dollar and 1 euro. First we cut both into <b>smaller pieces that fit both</b>: sixths. Then {3/6} + {2/6} = {5/6}.'),
    widget('commonDenominator', { a: 1, b: 2, c: 1, d: 3 }),
    rule('<b>Unlike denominators.</b> (1) Find a common denominator, a number both bottoms divide into. The smallest is the LCM. (2) Rewrite each fraction with it, multiplying top and bottom by the same number. (3) Add or subtract the tops. (4) Simplify.'),
    ex('Adding {2/3} + {3/4}', ['The LCM of 3 and 4 is 12.', '{2/3} = {8/12} and {3/4} = {9/12}.', '{8/12} + {9/12} = {17/12}.', '{17/12} is 1 and {5/12}. It cannot be simplified because 17 is prime.']),
    ex('Subtracting {7/10} − {2/15}', ['Multiples of 10: 10, 20, 30. Multiples of 15: 15, 30. The LCM is 30.', '{7/10} = {21/30} and {2/15} = {4/30}.', '{21/30} − {4/30} = {17/30}.', 'The answer is already in simplest form.']),
    tbl(['Pair of bottoms', 'LCM', 'Why'], [['4 and 6', '12', 'multiples of 6: 6, 12 (and 4 divides 12)'], ['5 and 7', '35', 'no shared factor, so multiply'], ['8 and 12', '24', 'multiples of 12: 12, 24 (and 8 divides 24)']], 'Finding a common denominator'),
    p('<b>Whole minus fraction.</b> Write the whole as a fraction with the same bottom: 1 − {3/8} = {8/8} − {3/8} = {5/8}. For 2 − {3/7}, write 2 as {14/7}.'),
    warn('<b>Watch out.</b> Never add the bottoms. {1/3} + {1/4} is not {2/7}. {2/7} is less than {1/3} alone! Adding fractions with the same bottom leaves the bottom unchanged, because the size of the pieces does not change.'),
    mcq('Dev works out {5/6} − {1/2} and gets {4/4} = 1, by subtracting tops and bottoms. How can you tell right away that this is wrong?', ['It is right.', '{5/6} − {1/2} must be less than {5/6}, but 1 is bigger than {5/6}. Correct: {5/6} − {3/6} = {2/6} = {1/3}.', 'You cannot subtract fractions.'], 1, 'Subtracting something positive always makes the number smaller. The result 1 is bigger than {5/6}, which is impossible.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find {3/8} + {1/6}.', '13/24', {
      h: ['The LCM of 8 and 6 is 24.'],
      s: '{3/8} = {9/24} and {1/6} = {4/24}. 9 + 4 = 13: {13/24}.',
      w: [['4/14', 'You added tops and bottoms. First rewrite with a common denominator, then add only the tops.'], ['4/24', 'That is the sum of tops 3 + 1 over 24. First rewrite {3/8} as {9/24}.']],
    }),
    num('p2', 'Find {5/6} − {3/10}.', '8/15', {
      h: ['The LCM of 6 and 10 is 30.'],
      s: '{5/6} = {25/30} and {3/10} = {9/30}. 25 − 9 = 16: {16/30} = {8/15}.',
      w: [['-1/2', 'You subtracted tops and bottoms: 5 − 3 over 6 − 10. Use a common denominator first, and subtract only the tops.']],
    }),
    num('p3', 'Find {1/2} + {1/3} + {1/4}.', '13/12', {
      mixed: true,
      h: ['A common denominator for 2, 3 and 4 is 12.'],
      s: '{6/12} + {4/12} + {3/12} = {13/12}, which is 1 and {1/12}.',
      w: [['3/9', 'You added all the tops and all the bottoms. Use twelfths.'], ['1', 'Close, but {6/12} + {4/12} + {3/12} adds up to 13 twelfths, a bit more than a whole.']],
    }),
    num('p4', 'Find 2 − {3/7}.', '11/7', {
      mixed: true,
      h: ['Write 2 as sevenths.'],
      s: '2 = {14/7}. {14/7} − {3/7} = {11/7}, which is 1 and {4/7}.',
      w: [['1/7', 'You subtracted 2 − 3 on top. Write 2 with denominator 7 first: {14/7}.'], ['-1/7', 'Two is bigger than {3/7}, so the answer is positive.']],
    }),
    num('p5', 'Hiro runs {3/4} of a mile in the morning and {2/3} of a mile in the evening. How far does he run in total, in miles?', '17/12', {
      mixed: true,
      h: ['Use twelfths.'],
      s: '{3/4} = {9/12} and {2/3} = {8/12}. 9 + 8 = 17: {17/12} = 1 and {5/12} miles.',
      w: [['5/7', 'You added tops and bottoms. That is less than the longer run alone: impossible.']],
    }),
    mc('p6', 'Which sum is equal to {5/6}?', [F(1, 3) + ' + ' + F(1, 4), F(1, 2) + ' + ' + F(1, 3), F(2, 5) + ' + ' + F(1, 3), F(3, 8) + ' + ' + F(1, 4)], 1, {
      h: ['Compute each as twelfths or another common denominator.'],
      s: '{1/2} + {1/3} = {3/6} + {2/6} = {5/6}. The others: {1/3} + {1/4} = {7/12}; {2/5} + {1/3} = {11/15}; {3/8} + {1/4} = {5/8}.',
      w: [[0, '{1/3} + {1/4} = {4/12} + {3/12} = {7/12}.'], [2, '{2/5} + {1/3} = {6/15} + {5/15} = {11/15}.'], [3, '{3/8} + {2/8} = {5/8}.']],
    }),
    num('p7', 'Two different unit fractions add up to {1/2}. One of them is {1/3}. The other is {1/b}. What is b?', 6, {
      h: ['What do you add to {1/3} to get {1/2}? Subtract.'],
      s: '{1/2} − {1/3} = {3/6} − {2/6} = {1/6}. So b = 6.',
      w: [['5', 'You subtracted 3 + 2. Compute {1/2} − {1/3} using sixths.'], ['1/6', 'That is the other fraction. The question asks for its bottom, b.']],
    }),
    num('p8', 'Solve: x − {1/4} = {2/3}. What is x?', '11/12', {
      h: ['Undo the subtraction by adding {1/4} to both sides.'],
      s: 'x = {2/3} + {1/4} = {8/12} + {3/12} = {11/12}.',
      w: [['5/12', 'You subtracted. To undo "minus {1/4}", add {1/4}.']],
    }),
  ],

  challenge: [
    chain('Cookie dough', 'A recipe uses {3/4} cup of flour, {1/3} cup of sugar and {1/6} cup of butter.', [
      num('c1a', 'How many cups of flour and sugar are there together?', '13/12', { mixed: true, h: ['Use twelfths.'], s: '{9/12} + {4/12} = {13/12} cups.' }),
      num('c1b', 'How many cups is that for all three ingredients together?', '5/4', { mixed: true, h: ['Add {1/6} = {2/12} to your last answer.'], s: '{13/12} + {2/12} = {15/12} = {5/4}, which is 1 and {1/4} cups.' }),
      num('c1c', 'How much more flour than butter is there, in cups?', '7/12', { h: ['{3/4} − {1/6}.'], s: '{9/12} − {2/12} = {7/12} cup.' }),
    ], 'The idea: put all the pieces into the same size first, and the arithmetic is just counting.'),
    chain('Halving the gap', 'Walk toward a wall, each step covering half of the remaining distance. The first step is {1/2} of the way.', [
      num('c2a', 'What fraction of the way have you gone after the first two steps?', '3/4', { h: ['{1/2} + half of what is left.'], s: 'After step 1, {1/2} is left. Step 2 covers half of it: {1/4}. Total {1/2} + {1/4} = {3/4}.' }),
      num('c2b', 'After three steps?', '7/8', { h: ['Step 3 covers {1/8}.'], s: '{3/4} + {1/8} = {6/8} + {1/8} = {7/8}.' }),
      num('c2c', 'After six steps, what fraction of the whole distance is still left?', '1/64', { h: ['What is left after each step: {1/2}, {1/4}, {1/8}, ...'], s: 'The distance left halves every step: {1/2}, {1/4}, {1/8}, {1/16}, {1/32}, {1/64}.', w: [['63/64', 'That is how far you have gone. The question asks how far is <i>left</i>.']] }),
    ], 'The idea: {1/2} + {1/4} + ... + {1/64} = {63/64}, always exactly one small piece short of 1, and that piece is the same as the last piece you added.'),
    mc('c3', 'Find the error. Leo says: "{1/3} + {1/4} = {2/7}, because 1 + 1 = 2 and 3 + 4 = 7." Which check shows he is wrong?', ['{2/7} is fine.', '{2/7} is smaller than {1/3}, but adding {1/4} to {1/3} must give something bigger than {1/3}. The correct sum is {7/12}.', 'He should multiply the tops: {1/12}.', 'Fractions with different bottoms cannot be added.'], 1, {
      s: '{1/3} + {1/4} = {4/12} + {3/12} = {7/12}.',
      w: [[0, '{2/7} ≈ 0.29 but {1/3} ≈ 0.33, so adding more cannot make it smaller.'], [2, 'Multiplying tops and bottoms is for multiplication.']],
    }),
  ],

  quiz: [
    tpl('add', (r) => {
      const [x, y] = pair(r, 2, 12);
      const ans = add(x, y);
      return N('Find ' + fm(x) + ' + ' + fm(y) + '.', fmt(ans), { mixed: true, s: 'Common denominator ' + lcm(x.d, y.d) + ': ' + F(x.n * (lcm(x.d, y.d) / x.d), lcm(x.d, y.d)) + ' + ' + F(y.n * (lcm(x.d, y.d) / y.d), lcm(x.d, y.d)) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(x.n + y.n, x.d + y.d)), 'Do not add the bottoms. Use a common denominator and add only the tops.']]) });
    }),
    tpl('sub', (r) => {
      let [x, y] = pair(r, 2, 12);
      if (cmp(x, y) < 0) [x, y] = [y, x];
      const ans = sub(x, y);
      return N('Find ' + fm(x) + ' − ' + fm(y) + '.', fmt(ans), { s: 'Common denominator ' + lcm(x.d, y.d) + ': ' + F(x.n * (lcm(x.d, y.d) / x.d), lcm(x.d, y.d)) + ' − ' + F(y.n * (lcm(x.d, y.d) / y.d), lcm(x.d, y.d)) + ' = ' + fm(ans) + '.', w: W(ans, (x.d === y.d ? [] : [[fmt(R(x.n - y.n, x.d - y.d)), 'Do not subtract the bottoms. Use a common denominator and subtract only the tops.']])) });
    }),
    tpl('three', (r) => {
      const ds = [r.int(2, 6), r.int(2, 6), r.int(2, 6)];
      const xs = ds.map((d) => R(r.int(1, d - 1), d));
      const ans = add(add(xs[0], xs[1]), xs[2]);
      return N('Find ' + xs.map(fm).join(' + ') + '.', fmt(ans), { mixed: true, s: 'Use the common denominator ' + lcm(lcm(ds[0], ds[1]), ds[2]) + ' and add: ' + fm(ans) + '.', w: W(ans, [[fmt(R(xs[0].n + xs[1].n + xs[2].n, ds[0] + ds[1] + ds[2])), 'Never add bottoms. Find a common denominator first.']]) });
    }),
    tpl('whole', (r) => {
      const n = r.int(1, 5), b = r.int(2, 12), a = r.int(1, b - 1);
      const ans = sub(R(n), R(a, b));
      return N('Find ' + n + ' − ' + F(a, b) + '.', fmt(ans), { mixed: true, s: n + ' = ' + F(n * b, b) + '. ' + F(n * b, b) + ' − ' + F(a, b) + ' = ' + F(n * b - a, b) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(n - a, b)), 'Write ' + n + ' as ' + F(n * b, b) + ' first, then subtract.']]) });
    }),
    tpl('word', (r) => {
      const [who, other] = twoNames(r);
      let [x, y] = pair(r, 2, 10);
      const plus = r.bool();
      if (!plus && cmp(x, y) < 0) [x, y] = [y, x];
      const ans = plus ? add(x, y) : sub(x, y);
      const q = plus ? who + ' drinks ' + fm(x) + ' litre of juice and ' + other + ' drinks ' + fm(y) + ' litre. How many litres did they drink in all?' : who + ' has ' + fm(x) + ' metre of ribbon and ' + other + ' has ' + fm(y) + ' metre. How many metres more does ' + who + ' have?';
      return N(q, fmt(ans), { mixed: true, s: (plus ? 'Add' : 'Subtract') + ' with the common denominator ' + lcm(x.d, y.d) + ': ' + fm(x) + (plus ? ' + ' : ' − ') + fm(y) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(plus ? sub(x, y) : add(x, y)), plus ? 'They drank both amounts, so add.' : '"How many more" is a subtraction.']]) });
    }),
    tpl('solve', (r) => {
      const [x, y] = pair(r, 2, 10);
      const big = cmp(x, y) > 0 ? x : y, small = big === x ? y : x;
      const plus = r.bool();
      const ans = plus ? sub(big, small) : add(big, small);
      const q = plus ? 'Solve: x + ' + fm(small) + ' = ' + fm(big) + '. What is x?' : 'Solve: x − ' + fm(small) + ' = ' + fm(big) + '. What is x?';
      return N(q, fmt(ans), { mixed: true, s: plus ? 'Undo the addition by subtracting: x = ' + fm(big) + ' − ' + fm(small) + ' = ' + fm(ans) + '.' : 'Undo the subtraction by adding: x = ' + fm(big) + ' + ' + fm(small) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(plus ? add(big, small) : sub(big, small)), plus ? 'To undo "plus", subtract.' : 'To undo "minus", add.']]) });
    }),
    tpl('halves', (r) => {
      const k = r.int(3, 7), q = r.int(2, 9);
      const first = F(1, q), second = F(1, 2 * q), third = F(1, 4 * q), last = F(1, Math.pow(2, k - 1) * q);
      const ans = sub(R(2, q), R(1, Math.pow(2, k - 1) * q));
      return N('Each term is half of the term before it. Find ' + first + ' + ' + second + ' + ' + third + ' + … + ' + last + ' (there are ' + k + ' terms in all).', fmt(ans), { mixed: true, s: 'If the pattern went on forever the sum would be ' + F(2, q) + '. Stopping after ' + k + ' terms leaves out a piece the size of the last term. So the sum is ' + F(2, q) + ' − ' + last + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(2, q)), 'That is the sum of infinitely many terms. With ' + k + ' terms the sum is a little less: subtract the last term.']]) });
    }),
    tpl('compound', (r) => {
      for (;;) {
        const [x, y] = pair(r, 2, 8), z = R(r.int(1, 5), r.int(2, 8));
        if (z.n >= z.d) continue;
        const total = add(x, y);
        if (cmp(total, z) <= 0) continue;
        const ans = sub(total, z);
        return N('Find ' + fm(x) + ' + ' + fm(y) + ' − ' + fm(z) + '.', fmt(ans), { mixed: true, s: 'Left to right: ' + fm(x) + ' + ' + fm(y) + ' = ' + fm(total) + ', then − ' + fm(z) + ' = ' + fm(ans) + '.' });
      }
    }),
  ],
});
