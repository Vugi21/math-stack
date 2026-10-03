import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, add, sub, eq, cmp, fmt, fm, fmMixed, gcd, lcm } from '../../../../src/content/dsl.js';

const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';
const MS = (w, n, d) => w + ' ' + F(n, d);
const mv = (w, n, d) => R(w * d + n, d);
const SWAP = 'You took the smaller fraction part from the bigger one in each column. When the top fraction is smaller, you must regroup a whole first.';

export default lesson({
  id: 'm4-8-5-subtracting-fractions',
  title: 'Subtracting fractions',
  blurb: 'Take away pieces of the same size, from fractions, from whole numbers, and from mixed numbers with regrouping.',
  concepts: ['fractions', 'subtracting-fractions', 'regrouping'],

  tryFirst: [
    num('t1', 'A bottle has {7/8} liter of juice. Dev drinks {3/8} liter. How much juice is left? Give it in simplest form.', '1/2', {
      h: ['Each piece is one eighth of a liter. Take 3 pieces from 7 pieces.'],
      s: '7 eighths − 3 eighths = 4 eighths. {4/8} = {1/2} liter.',
      w: [['10/8', 'That adds the amounts. The juice Dev drinks must be taken away.']],
    }),
    num('t2', 'A rope is 3 meters long. Hiro cuts off 1 {1/4} meters. How long is the rest of the rope?', '7/4', { mixed: true,
      h: ['Cut 1 meter first. How much is left? Then cut the {1/4}.'],
      s: '3 − 1 = 2 meters. Then 2 − {1/4}: 2 is 1 {4/4}, so the rest is 1 {3/4} meters.',
      w: [['2 1/4', 'That is the length 2 PLUS {1/4}. You must take away the {1/4}, not add it.']] }),
  ],

  learn: [
    p('Subtracting fractions is taking away pieces. 7 eighths take away 3 eighths leaves 4 eighths. The size of the piece does not change.'),
    rule('<b>Same bottoms.</b> Subtract the tops. Keep the bottom. {7/9} − {4/9} = {3/9} = {1/3}.'),
    p('If the bottoms are different, cut both fractions into the same size pieces first, just as when you add.'),
    ex('Subtract {3/4} − {2/5}', ['Both 4 and 5 go into 20. Use twentieths.', '{3/4} = {15/20} and {2/5} = {8/20}.', '{15/20} − {8/20} = {7/20}.']),
    widget('commonDenominator', { a: 5, b: 6, c: 1, d: 4, mode: 'sub' }),
    rule('<b>Taking away from a whole number.</b> Break one whole into pieces of the size you need. 1 = {8/8}, so 1 − {3/8} = {8/8} − {3/8} = {5/8}.'),
    ex('Subtract 5 − 2 {3/4}', ['Break one of the 5 wholes into fourths: 5 = 4 {4/4}.', 'Now 4 {4/4} − 2 {3/4}.', 'Wholes: 4 − 2 = 2. Fractions: {4/4} − {3/4} = {1/4}.', 'The answer is 2 {1/4}.']),
    p('<b>Counting up</b> also works. From 2 {3/4}, climb {1/4} to reach 3. Climb 2 more to reach 5. Total climb: 2 {1/4}.'),
    ex('Regrouping with mixed numbers: 6 {1/6} − 2 {1/2}', ['The fraction {1/6} is smaller than {1/2}, so take one whole from the 6.', '6 {1/6} = 5 + 1 + {1/6} = 5 {7/6}. And 2 {1/2} = 2 {3/6}.', 'Wholes: 5 − 2 = 3. Fractions: {7/6} − {3/6} = {4/6} = {2/3}.', 'The answer is 3 {2/3}.']),
    rule('<b>Check by adding back.</b> A subtraction answer plus the number you took away should give you the number you started with. 3 {2/3} + 2 {1/2} = 6 {1/6}. It checks.'),
    warn('<b>Watch out.</b> In 4 {1/6} − 1 {1/2}, do not take {1/6} from {1/2} to get {1/3}. You cannot take more pieces than you have. Regroup first.'),
    mcq('Dev says "3 {1/4} − 1 {3/4} = 2 {2/4}, because 3 − 1 = 2 and {3/4} − {1/4} = {2/4}." What is wrong?', ['He turned the fraction parts around. {1/4} is less than {3/4}, so he must regroup: 2 {5/4} − 1 {3/4} = 1 {2/4}.', 'Nothing. He is right.', 'He should have added the wholes.'], 0, 'Dev’s answer is too big: 3 {1/4} − 1 {3/4} is less than 2. Regroup: 3 {1/4} = 2 {5/4}. Then 2 − 1 = 1 and {5/4} − {3/4} = {2/4}. The answer is 1 {1/2}.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find {9/10} − {3/10}.', '3/5', {
      h: ['Subtract the tops. Then simplify.'],
      s: '9 − 3 = 6, so {6/10} = {3/5}.',
      w: [['6/20', 'The pieces are the same size, so the bottom stays 10. Do not change it.']] }),
    num('p2', 'Find {5/6} − {3/8}.', '11/24', {
      h: ['Use 24ths.'],
      s: '{5/6} = {20/24} and {3/8} = {9/24}. 20 − 9 = 11, so {11/24}.',
      w: [['2/24', 'You subtracted the tops but did not first change {5/6} and {3/8} into 24ths.']] }),
    num('p3', 'Mia eats {5/12} of a pizza and Nico eats {1/4} of it. What fraction of the pizza is left? Give it in simplest form.', '1/3', {
      h: ['Write {1/4} in twelfths.', 'Take away both amounts from 1 whole.'],
      s: '{1/4} = {3/12}. Eaten: {5/12} + {3/12} = {8/12}. Left: {12/12} − {8/12} = {4/12} = {1/3}.',
      w: [['2/3', 'That is the part that was eaten, {8/12}.']] }),
    num('p4', 'Find 7 − 3 {5/8}.', '27/8', { mixed: true,
      h: ['Break one whole into eighths: 7 = 6 {8/8}.'],
      s: '7 = 6 {8/8}. Wholes: 6 − 3 = 3. Fractions: {8/8} − {5/8} = {3/8}. The answer is 3 {3/8}.',
      w: [['4 3/8', '7 − 3 = 4 takes away only 3 wholes. The {5/8} must come off too, so the answer is less than 4. Break up one whole.'], ['3 5/8', 'Check by adding back: 3 {5/8} + 3 {5/8} = 7 {1/4}, not 7.']] }),
    num('p5', 'Find 5 {1/3} − 2 {5/6}.', '5/2', { mixed: true,
      h: ['{1/3} is less than {5/6}, so regroup. Use sixths: 5 {1/3} = 5 {2/6}.'],
      s: '5 {2/6} = 4 {8/6}. Wholes: 4 − 2 = 2. Fractions: {8/6} − {5/6} = {3/6} = {1/2}. The answer is 2 {1/2}.',
      w: [['3 1/2', SWAP]] }),
    num('p6', 'A rope is 8 meters long. Elena cuts off 3 {1/4} meters, then 2 {1/2} meters. How many meters of rope are left?', '9/4', { mixed: true,
      h: ['First find how much was cut off altogether.', 'Then take that from 8.'],
      s: 'Cut off: 3 {1/4} + 2 {1/2} = 5 {3/4}. Left: 8 − 5 {3/4} = 2 {1/4} meters.',
      w: [['5 3/4', 'That is how much was cut off. The question asks how much is left.']] }),
    num('p7', 'The difference between two numbers is {1/3}. The larger number is 2 {1/4}. What is the smaller number?', '23/12', { mixed: true,
      h: ['The smaller number is the larger one minus the difference.', 'Use twelfths: 2 {1/4} = 2 {3/12}.'],
      s: '2 {3/12} − {4/12}: regroup, 2 {3/12} = 1 {15/12}. Then 1 {15/12} − {4/12} = 1 {11/12}.',
      w: [['2 7/12', 'That adds the difference. The smaller number is the larger one MINUS the difference.']] }),
    num('p8', 'Find ({3/4} − {2/3}) − ({2/3} − {5/8}).', '1/24', {
      h: ['Work out each bracket first.', 'Use twelfths for the first bracket and 24ths for the second.'],
      s: '{3/4} − {2/3} = {9/12} − {8/12} = {1/12}. {2/3} − {5/8} = {16/24} − {15/24} = {1/24}. Then {1/12} − {1/24} = {2/24} − {1/24} = {1/24}.',
      w: [['1/12', 'That is only the first bracket. Subtract the second bracket too.']] }),
  ],

  challenge: [
    chain('The water jug', 'A jug holds 4 cups. Dev pours out 1 {3/4} cups, then 1 {2/3} cups.', [
      num('c1a', 'How many cups does Dev pour out in all?', '41/12', { mixed: true, h: ['Add the two amounts. Use twelfths.'], s: 'Wholes: 2. Fractions: {9/12} + {8/12} = {17/12} = 1 {5/12}. Total: 3 {5/12} cups.' }),
      num('c1b', 'The jug started full. How much is left in it?', '7/12', { h: ['Take your answer from 4.', '4 = 3 {12/12}.'], s: '4 − 3 {5/12} = {7/12} cup.' }),
      num('c1c', 'Then Dev pours in 2 {1/2} cups more. How much is in the jug now?', '37/12', { mixed: true, h: ['{7/12} + 2 {6/12}.'], s: '{7/12} + {6/12} = {13/12} = 1 {1/12}. Total: 2 + 1 {1/12} = 3 {1/12} cups.' }),
    ], 'The idea: with several pours, first find the total taken, then subtract once. The answer for each step becomes the start of the next.'),
    chain('Three points on a line', 'Three points on a number line are at A = {3/4}, B = 1 {5/6} and C = 3 {1/3}.', [
      num('c2a', 'How far is A from B?', '13/12', { mixed: true, h: ['Subtract the smaller from the bigger. Use twelfths.'], s: '1 {10/12} − {9/12} = 1 {1/12}.' }),
      num('c2b', 'How far is B from C?', '3/2', { mixed: true, h: ['3 {1/3} = 3 {4/12} and 1 {5/6} = 1 {10/12}. Regroup.'], s: '3 {4/12} = 2 {16/12}. Then 2 {16/12} − 1 {10/12} = 1 {6/12} = 1 {1/2}.' }),
      num('c2c', 'How far is A from C?', '31/12', { mixed: true, h: ['You could subtract directly. Or use your two answers: A to B and then B to C.'], s: '1 {1/12} + 1 {1/2} = 1 {1/12} + 1 {6/12} = 2 {7/12}.' }),
    ], 'The idea: distances along a line add up. A to C is A to B plus B to C. You can check a subtraction by adding.'),
    mc('c3', 'Find the error. Tara says "6 − 2 {1/3} = 4 {1/3}, because 6 − 2 = 4." Which is the best fix?', ['She did not take away the {1/3}. Break up a whole: 5 {3/3} − 2 {1/3} = 3 {2/3}.', 'Tara is right.', 'The answer is 3 {1/3}.', 'The answer is 4 {2/3}.'], 0, {
      s: '6 − 2 = 4 takes away only the 2 wholes. The {1/3} still has to come off 4. So 4 − {1/3} = 3 {2/3}. Check: 3 {2/3} + 2 {1/3} = 6.',
      w: [[1, 'Check by adding back: 4 {1/3} + 2 {1/3} = 6 {2/3}, not 6.'], [2, 'Check by adding back: 3 {1/3} + 2 {1/3} = 5 {2/3}, not 6.']],
    }),
  ],

  quiz: [
    tpl('same', (r) => {
      const d = r.int(5, 16), b = r.int(1, d - 2), a = r.int(b + 1, d - 1), ans = R(a - b, d);
      return N('Find ' + F(a, d) + ' − ' + F(b, d) + '. Give it in simplest form.', fmt(ans), { s: a + ' − ' + b + ' = ' + (a - b) + ', so ' + F(a - b, d) + (ans.d !== d ? ' = ' + fm(ans) : '') + '.', w: W(ans, [[R(a - b, 2 * d), 'The pieces are the same size, so the bottom stays ' + d + '. Do not change it.']]) });
    }),
    tpl('unlike', (r) => {
      const pairs = [[2, 3], [3, 4], [3, 5], [2, 5], [4, 5], [5, 6], [3, 8], [5, 8], [4, 6], [7, 8], [4, 7], [2, 7]];
      const [b, d] = r.pick(pairs);
      let a = r.int(1, b - 1), c = r.int(1, d - 1);
      let x = R(a, b), y = R(c, d);
      if (cmp(x, y) < 0) { [x, y] = [y, x]; }
      if (cmp(x, y) === 0) { x = R(b - 1 || 1, b); y = R(1, d + 1); }
      const ans = sub(x, y);
      return N('Find ' + fm(x) + ' − ' + fm(y) + '. Give it in simplest form.', fmt(ans), { s: 'Use a common bottom. The difference is ' + fm(ans) + '.', w: W(ans, [[R(x.n - y.n, x.d - y.d || 1), 'Do not subtract the bottoms. Use a common bottom first.']]) });
    }),
    tpl('fromone', (r) => {
      const d = r.int(3, 14), a = r.int(1, d - 1), b = r.int(1, d - a - 1 || 1);
      if (a + b >= d) return N('Find 1 − ' + F(a, d) + '.', fmt(R(d - a, d)), { s: '1 = ' + F(d, d) + '. ' + d + ' − ' + a + ' = ' + (d - a) + ', so ' + fm(R(d - a, d)) + '.' });
      const ans = R(d - a - b, d);
      const who = r.pick(['Ava', 'Ben', 'Chloe', 'Dev']);
      return N(who + ' reads ' + F(a, d) + ' of a book on Monday and ' + F(b, d) + ' of it on Tuesday. What fraction of the book is not read yet? Give it in simplest form.', fmt(ans), { s: 'Read: ' + F(a + b, d) + '. Not read: ' + F(d, d) + ' − ' + F(a + b, d) + ' = ' + fm(ans) + '.', w: W(ans, [[R(a + b, d), 'That is the part already read. The question asks for the part that is left.']]) });
    }),
    tpl('wholeminus', (r) => {
      const W0 = r.int(3, 12), d = r.int(2, 10), n = r.int(1, d - 1), w = r.int(1, W0 - 2), ans = sub(R(W0), mv(w, n, d));
      return N('Find ' + W0 + ' − ' + MS(w, n, d) + '.', fmt(ans), { mixed: true, s: W0 + ' = ' + (W0 - 1) + ' ' + F(d, d) + '. Wholes: ' + (W0 - 1) + ' − ' + w + ' = ' + (W0 - 1 - w) + '. Fractions: ' + F(d, d) + ' − ' + F(n, d) + ' = ' + F(d - n, d) + '. Answer: ' + fmMixed(ans) + '.', w: W(ans, [[R((W0 - w) * d - 0 + n, d), 'You added the fraction back. It has to be taken away, so break one whole into pieces.'], [R((W0 - w) * d + 0, d), 'You forgot the fraction part. It must be taken away too.']]) });
    }),
    tpl('regroup', (r) => {
      const pairs = [[2, 3], [3, 4], [4, 5], [3, 5], [5, 6], [4, 8], [3, 6], [6, 8], [2, 5], [4, 6]];
      let b, d, a, c;
      for (let t = 0; t < 100; t++) {
        [b, d] = r.pick(pairs); a = r.int(1, b - 1); c = r.int(1, d - 1);
        if (cmp(R(a, b), R(c, d)) < 0) break;
      }
      if (!(cmp(R(a, b), R(c, d)) < 0)) { b = 6; d = 3; a = 1; c = 2; }
      const w2 = r.int(1, 7), w1 = w2 + r.int(1, 6), ans = sub(mv(w1, a, b), mv(w2, c, d));
      return N('Find ' + MS(w1, a, b) + ' − ' + MS(w2, c, d) + '.', fmt(ans), { mixed: true, s: 'The fraction ' + F(a, b) + ' is less than ' + F(c, d) + ', so regroup one whole. The answer is ' + fmMixed(ans) + '. Check: ' + fmMixed(ans) + ' + ' + MS(w2, c, d) + ' = ' + MS(w1, a, b) + '.', w: W(ans, [[R((w1 - w2) * b * d + (c * b - a * d), b * d), SWAP]]) });
    }),
    tpl('pours', (r) => {
      const T = r.int(6, 14), d = r.pick([2, 4, 3, 6]), w1 = r.int(1, 3), w2 = r.int(1, 3), a = r.int(1, d - 1), c = r.int(1, d - 1);
      const used = add(mv(w1, a, d), mv(w2, c, d)), ans = sub(R(T), used);
      const who = r.pick(['Grace', 'Hiro', 'Isla', 'Jonas']);
      return N(who + ' has a rope ' + T + ' meters long. ' + who + ' cuts off ' + MS(w1, a, d) + ' meters, then ' + MS(w2, c, d) + ' meters. How many meters of rope are left?', fmt(ans), { mixed: true, s: 'Cut off in all: ' + fmMixed(used) + '. Left: ' + T + ' − ' + fmMixed(used) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[used, 'That is the length cut off. The question asks for what is left.']]) });
    }),
    tpl('diff', (r) => {
      const d = r.pick([3, 4, 5, 6, 8]), w = r.int(2, 9), n = r.int(1, d - 1), e = R(r.int(1, 2), r.pick([2, 3, 4, 6]));
      const big = mv(w, n, d), ans = sub(big, e);
      return N('The difference between two numbers is ' + fm(e) + '. The larger number is ' + fmMixed(big) + '. What is the smaller number?', fmt(ans), { mixed: true, s: 'Smaller = larger − difference = ' + fmMixed(big) + ' − ' + fm(e) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[add(big, e), 'That adds the difference. The smaller number is the larger one MINUS the difference.']]) });
    }),
    tpl('brackets', (r) => {
      let x, y, z, ans;
      for (let t = 0; t < 200; t++) {
        const ds = r.pick([[2, 3, 4], [3, 4, 6], [2, 4, 5], [3, 5, 6], [4, 6, 8], [3, 6, 9]]);
        [x, y, z] = [R(r.int(1, ds[0] - 1), ds[0]), R(r.int(1, ds[1] - 1), ds[1]), R(r.int(1, ds[2] - 1), ds[2])].sort((p1, p2) => cmp(p2, p1));
        if (cmp(x, y) === 0 || cmp(y, z) === 0) continue;
        ans = sub(sub(x, y), sub(y, z));
        if (cmp(ans, R(0)) >= 0) break;
        ans = null;
      }
      if (!ans) { x = R(5, 6); y = R(2, 3); z = R(1, 2); ans = sub(sub(x, y), sub(y, z)); }
      return N('Find (' + fm(x) + ' − ' + fm(y) + ') − (' + fm(y) + ' − ' + fm(z) + ').', fmt(ans), { s: 'First bracket: ' + fm(sub(x, y)) + '. Second bracket: ' + fm(sub(y, z)) + '. Then ' + fm(sub(x, y)) + ' − ' + fm(sub(y, z)) + ' = ' + fm(ans) + '.', w: W(ans, [[sub(x, y), 'That is only the first bracket. Subtract the second bracket too.']]) });
    }),
  ],
});
