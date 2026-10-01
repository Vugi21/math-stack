import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, sub, mul, div, pow, gcd, fmt, fm } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const FP = (n, d, k) => '(' + F(n, d) + ')^[' + k + ']';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'pre-4-4-powers-of-fractions',
  title: 'Powers of fractions',
  blurb: 'Repeated multiplication of fractions: squares, cubes, shrinking bounces, and square roots.',
  concepts: ['fractions', 'exponents', 'square-roots'],

  tryFirst: [
    num('t1', 'You fold a sheet of paper in half 4 times. When you unfold it, the paper is divided into equal rectangles. What fraction of the whole sheet is one rectangle?', '1/16', {
      h: ['After each fold the number of rectangles doubles.'],
      s: 'The count goes 2, 4, 8, 16. One rectangle is {1/16} of the sheet.',
      w: [['1/8', 'That is after 3 folds. There is one more.'], ['1/4', 'Each fold doubles the number of rectangles. After 4 folds, how many are there?']],
    }),
    num('t2', 'A rubber ball dropped from 64 cm bounces back to half of the height it fell from, every time. How high is the third bounce, in cm?', 8, {
      h: ['The first bounce is 32 cm. Keep going.'],
      s: 'Bounce 1: 32 cm. Bounce 2: 16 cm. Bounce 3: 8 cm.',
      w: [['16', 'That is the second bounce. Keep halving once more.'], ['32', 'That is the first bounce.']],
    }),
  ],

  learn: [
    p('An exponent counts how many times a number is multiplied by itself. 2^[3] = 2 × 2 × 2 = 8. A fraction can be the <b>base</b> too: ({1/2})^[3] means {1/2} × {1/2} × {1/2}, which is half of a half of a half.'),
    widget('fractionProduct', { a: 2, b: 3, c: 2, d: 3 }),
    p('The area model shows ({2/3})^[2]. The square has 3 × 3 = 9 cells, and the shaded overlap is 2 × 2 = 4 cells. So ({2/3})^[2] = {4/9}. The top is squared and the bottom is squared.'),
    rule('<b>Power of a fraction.</b> Raise the top and the bottom to the power: ({a/b})^[n] = {a^[n]/b^[n]}. The reason is that multiplying fractions multiplies tops and multiplies bottoms, n times each.'),
    ex('A cube', ['Find ({2/3})^[3].', '({2/3})^[3] = {2/3} × {2/3} × {2/3}.', 'Top: 2 × 2 × 2 = 8. Bottom: 3 × 3 × 3 = 27.', 'Answer: {8/27}.']),
    tbl(['Power', 'Meaning', 'Value'], [['({1/2})^[1]', F(1, 2), F(1, 2)], ['({1/2})^[2]', F(1, 2) + ' × ' + F(1, 2), F(1, 4)], ['({1/2})^[3]', 'three halves multiplied', F(1, 8)], ['({1/2})^[4]', 'four halves multiplied', F(1, 16)], ['({1/2})^[5]', 'five halves multiplied', F(1, 32)]], 'Powers of one half'),
    rule('<b>Powers shrink fractions below 1 and grow fractions above 1.</b> Multiplying by a number less than 1 makes things smaller, so every extra factor of {1/2} halves the amount. A fraction like {3/2} is above 1, so its powers grow: ({3/2})^[2] = {9/4}.'),
    p('<b>Square roots</b> undo squares. Since ({3/4})^[2] = {9/16}, we get sqrt[{9/16}] = {3/4}. To take the square root of a fraction, take the square root of the top and the bottom.'),
    ex('Order of operations', ['Find {3/4} × ({2/3})^[2].', 'Powers come before multiplication. ({2/3})^[2] = {4/9}.', 'Now multiply: {3/4} × {4/9}. Cancel the 4s and the 3 with the 9: {1/1} × {1/3} = {1/3}.']),
    warn('<b>Watch out.</b> The parentheses matter. ({2/3})^[2] = {4/9}, squaring both top and bottom. But "2 ÷ 3^[2]" means 2 ÷ 9 = {2/9}, because the exponent only reaches the 3. Also, squaring does not double: ({2/3})^[2] is {4/9}, not {4/3}.'),
    mcq('Dev computes ({3/4})^[2] and gets {9/4}. What is wrong?', ['Nothing, he is right.', 'He squared only the top. The bottom must be squared too: 4 × 4 = 16, so the answer is {9/16}. Also {3/4} is below 1, so its square must be below {3/4}.', 'He should have doubled the top to get {6/4}.'], 1, '{9/4} is bigger than 1, but a fraction below 1 gets smaller when you multiply it by itself.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find ({3/5})^[2].', '9/25', {
      h: ['Square the top and square the bottom.'],
      s: '3 × 3 = 9 and 5 × 5 = 25.',
      w: [['9/5', 'You squared only the top. The bottom is multiplied by itself as well.'], ['6/10', 'You doubled the numbers. A square means multiplying by itself: 3 × 3 and 5 × 5.']],
    }),
    num('p2', 'Find ({2/3})^[3].', '8/27', {
      h: ['Cube the top and cube the bottom.'],
      s: '2^[3] = 8 and 3^[3] = 27.',
      w: [['6/9', 'You multiplied by 3 instead of multiplying three copies. 2 × 2 × 2 and 3 × 3 × 3.'], ['2/27', 'The top is cubed too.']],
    }),
    num('p3', 'Find ({1/2})^[5].', '1/32', {
      h: ['2 × 2 × 2 × 2 × 2 = ?'],
      s: '1^[5] = 1 and 2^[5] = 32.',
      w: [['1/10', 'You multiplied 2 by 5. The exponent means five copies multiplied together.'], ['1/25', 'You computed 5^[2]. The 5 is the exponent, and 2 is the base.']],
    }),
    num('p4', 'Find sqrt[{49/81}].', '7/9', {
      h: ['Which number times itself is 49? Which is 81?'],
      s: '7 × 7 = 49 and 9 × 9 = 81.',
      w: [['7/81', 'The bottom needs a square root as well.'], ['49/9', 'Take the square root of both top and bottom.']],
    }),
    num('p5', 'Find ({3/4})^[2] ÷ {3/8}.', '3/2', {
      mixed: true,
      h: ['Do the power first, then the division. Divide by flipping.'],
      s: '({3/4})^[2] = {9/16}. {9/16} ÷ {3/8} = {9/16} × {8/3} = {72/48} = {3/2}.',
      w: [['27/128', 'You squared, but then multiplied by {3/8}. Dividing by {3/8} means multiplying by {8/3}.'], ['9/32', 'That is {3/4} × {3/8}: the power was skipped and the division turned into multiplication.']],
    }),
    mc('p6', 'Ranking time: which of these four numbers is the largest?', ['{3/4}', '({3/4})^[2]', '({3/4})^[3]', '({3/4})^[4]'], 0, {
      h: ['Each extra factor of {3/4} takes a piece away from what you had.'],
      s: 'Each time you multiply by {3/4} the value shrinks. {3/4} = 0.75 and the others are about 0.56, 0.42 and 0.32. The first is the greatest.',
      w: [[3, 'More factors of a number below 1 means a smaller result.'], [1, 'Squaring {3/4} takes a quarter off it. It is smaller than {3/4}.']],
    }),
    num('p7', 'The denominator of ({2/3})^[n] is 243 when written out. What is n?', 5, {
      h: ['The bottom is 3 multiplied by itself n times. Count powers of 3: 3, 9, 27, 81, ...'],
      s: '3, 9, 27, 81, 243: that is 3^[5]. So n = 5. (Check: ({2/3})^[5] = {32/243}.)',
      w: [['4', '3^[4] = 81. Go one power further.'], ['81', 'That is a power of 3, but we want how many times 3 appears as a factor.']],
    }),
  ],

  challenge: [
    chain('A very bouncy ball', 'A ball is dropped from 81 cm. After every bounce it comes up to {2/3} of the height it fell from.', [
      num('c1a', 'How high is the second bounce, in cm?', 36, { h: ['First bounce: {2/3} of 81.'], s: 'First bounce 54 cm. Second bounce: {2/3} of 54 = 36 cm.' }),
      num('c1b', 'How high is the fourth bounce, in cm?', 16, { h: ['Keep going: 36, then ..., then ...'], s: 'Third: {2/3} of 36 = 24. Fourth: {2/3} of 24 = 16 cm.' }),
      num('c1c', 'What fraction of the starting height is the fourth bounce?', '16/81', { h: ['Fourth bounce 16 cm out of 81 cm.'], s: '{16/81} = ({2/3})^[4]. Four bounces means four factors of {2/3}.', w: [['2/3', 'That is one bounce. Four bounces multiply four factors of {2/3}.'], ['8/12', 'It is a power: ({2/3})^[4] is {16/81}.']] }),
    ], 'The idea: after n bounces the height is the starting height times ({2/3})^[n]. Repeated multiplication is exactly what an exponent counts.'),
    chain('Double the side', 'A square has sides of length {3/4} m.', [
      num('c2a', 'What is its area in square metres?', '9/16', { h: ['Area = side × side.'], s: '({3/4})^[2] = {9/16}.' }),
      num('c2b', 'The side is doubled to {3/2} m. What is the new area?', '9/4', { mixed: true, h: ['Square {3/2}.'], s: '({3/2})^[2] = {9/4}, which is 2 and {1/4}.' }),
      num('c2c', 'By what number did the area get multiplied when the side was doubled?', 4, { h: ['Divide the new area by the old: {9/4} ÷ {9/16}.'], s: '{9/4} × {16/9} = 4. Doubling the side means the factor 2 is squared: 2^[2] = 4.', w: [['2', 'That is how many times the side grew. The area depends on the square of the side.']] }),
    ], 'The idea: squaring the side squares the scaling factor too. Double the side and the area is 2^[2] = 4 times as big, whatever the starting square is.'),
    mc('c3', 'Find the error. Tara says: "({2/5})^[3] = {2 × 3/5 × 3} = {6/15} = {2/5}." What went wrong?', ['Nothing, the answer is right.', 'She multiplied by 3 instead of using 3 copies. The exponent means multiply three copies of {2/5}: {8/125}.', 'She should have added: {5/8}.', 'The exponent applies only to the top.'], 1, {
      s: '({2/5})^[3] = {2^[3]/5^[3]} = {8/125}. A fraction below 1 cubed must be much smaller than {2/5}, so {2/5} cannot be right.',
      w: [[0, 'Check by size: multiplying {2/5} by itself must make it smaller.'], [3, 'The exponent applies to the whole fraction, top and bottom.']],
    }),
  ],

  quiz: [
    tpl('power', (r) => {
      const n = r.int(2, 4), mb = n === 2 ? 9 : n === 3 ? 6 : 4;
      const b = r.int(2, mb), a = r.int(1, b + 1);
      const ans = pow(R(a, b), n);
      return N('Find ' + FP(a, b, n) + '.', fmt(ans), { mixed: true, s: 'Raise top and bottom to the power ' + n + ': ' + F(a + '^[' + n + ']', b + '^[' + n + ']') + ' = ' + F(Math.pow(a, n), Math.pow(b, n)) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(Math.pow(a, n), b)), 'The bottom is raised to the power too.'], [fmt(R(a * n, b * n)), 'An exponent means repeated multiplication, not multiplying by ' + n + '.']]) });
    }),
    tpl('sqrt', (r) => {
      let a, b;
      do { a = r.int(1, 12); b = r.int(2, 12); } while (gcd(a, b) > 1);
      const ans = R(a, b);
      return N('Find sqrt[' + F(a * a, b * b) + '].', fmt(ans), { s: 'sqrt[' + a * a + '] = ' + a + ' and sqrt[' + b * b + '] = ' + b + ', so the answer is ' + F(a, b) + '.', w: W(ans, [[fmt(R(a, b * b)), 'Take the square root of the bottom as well.']]) });
    }),
    tpl('bounce', (r) => {
      const d = r.pick([2, 3, 4, 5]), c = d === 2 ? 1 : r.int(1, d - 1), k = r.int(2, 4), m = r.int(1, 5);
      const H = m * Math.pow(d, k), ans = m * Math.pow(c, k);
      const who = name(r);
      return N(who + ' drops a ball from ' + H + ' cm. After each bounce it rises to ' + F(c, d) + ' of the height it fell from. How high is bounce number ' + k + ', in cm?', ans, { s: 'Each bounce multiplies the height by ' + F(c, d) + ', so after ' + k + ' bounces: ' + H + ' × (' + F(c, d) + ')^[' + k + '] = ' + H + ' × ' + F(Math.pow(c, k), Math.pow(d, k)) + ' = ' + ans + ' cm.', w: W(ans, [[H * c / d, 'That is the first bounce only. Multiply by ' + F(c, d) + ' once for every bounce.']]) });
    }),
    tpl('exponent', (r) => {
      const d = r.int(2, 6), n = r.int(2, 5);
      let c; do { c = r.int(1, d + 2); } while (gcd(c, d) > 1);
      return N('({' + c + '/' + d + '})^[n] = ' + F(Math.pow(c, n), Math.pow(d, n)) + '. What is n?', n, { s: d + ' multiplied by itself ' + n + ' times is ' + Math.pow(d, n) + ', so n = ' + n + '. (Check the top: ' + c + '^[' + n + '] = ' + Math.pow(c, n) + '.)', w: W(n, [[n - 1, 'Count the factors again: ' + d + '^[' + (n - 1) + '] = ' + Math.pow(d, n - 1) + ', not ' + Math.pow(d, n) + '.']]) });
    }),
    tpl('mixexpr', (r) => {
      const b = r.int(2, 6), a = r.int(1, b + 1), d = r.int(2, 6), c = r.int(1, d - 1);
      const ans = mul(R(a, b), pow(R(c, d), 2));
      return N('Find ' + F(a, b) + ' × ' + FP(c, d, 2) + '.', fmt(ans), { mixed: true, s: 'Power first: ' + FP(c, d, 2) + ' = ' + F(c * c, d * d) + '. Then multiply: ' + F(a, b) + ' × ' + F(c * c, d * d) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(pow(mul(R(a, b), R(c, d)), 2)), 'The exponent belongs only to the fraction it is attached to, not to the whole product.']]) });
    }),
    tpl('ratio', (r) => {
      const b = r.int(2, 5), a = r.int(1, 5), d = r.int(2, 5), c = r.int(1, 5);
      const A = pow(R(a, b), 2), C = pow(R(c, d), 2), ans = div(A, C);
      return N('Find ' + FP(a, b, 2) + ' ÷ ' + FP(c, d, 2) + '.', fmt(ans), { mixed: true, s: 'Squares first: ' + fm(A) + ' ÷ ' + fm(C) + '. Flip and multiply: ' + fm(ans) + '.', w: W(ans, [[fmt(div(R(a, b), R(c, d))), 'Square both fractions before dividing.']]) });
    }),
    tpl('compare', (r) => {
      const up = r.bool(), d = r.int(2, 9);
      let c; if (up) c = d + r.int(1, d); else c = r.int(1, d - 1);
      const opts = [1, 2, 3, 4].map((k) => (k === 1 ? F(c, d) : FP(c, d, k)));
      const right = up ? opts[3] : opts[0];
      const wr = opts.filter((x) => x !== right).map((x) => [x, up ? 'The base is above 1, so each extra factor makes it bigger. The highest power wins.' : 'The base is below 1, so each extra factor makes it smaller. The first power wins.']);
      return choice(r, 'Which is the greatest?', right, wr, { s: F(c, d) + ' is ' + (up ? 'above' : 'below') + ' 1, so its powers ' + (up ? 'grow' : 'shrink') + '. The answer is ' + right + '.' });
    }),
    tpl('scale', (r) => {
      const b = r.int(2, 6), a = r.int(1, b + 1), k = r.int(2, 5);
      const side = mul(R(a, b), R(k)), ans = pow(side, 2);
      return N('A square has side ' + F(a, b) + ' m. Its side is multiplied by ' + k + '. What is the area of the new square, in square metres?', fmt(ans), { mixed: true, s: 'New side = ' + k + ' × ' + F(a, b) + ' = ' + fm(side) + '. Area = ' + fm(side) + ' squared = ' + fm(ans) + '.', w: W(ans, [[fmt(mul(pow(R(a, b), 2), R(k))), 'The side was multiplied by ' + k + ', so the area is multiplied by ' + k + '^[2], not ' + k + '.']]) });
    }),
  ],
});
