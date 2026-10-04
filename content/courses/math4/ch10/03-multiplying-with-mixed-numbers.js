import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, R, mul, add, fmt, fmMixed, fmtMixed, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const FR = (x) => fmMixed(x);
const MX = (w, n, d) => w + ' {' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
const imp = (w, n, d) => R(w * d + n, d);

export default lesson({
  id: 'm4-10-3-multiplying-with-mixed-numbers',
  title: 'Multiplying with mixed numbers',
  blurb: 'Whole numbers times fractions, and mixed numbers times mixed numbers, with stories to match.',
  concepts: ['fractions', 'mixed-numbers', 'multiplying-fractions'],

  tryFirst: [
    num('t1', 'Each bottle holds {3/4} litre. How many litres are in 6 bottles?', '9/2', {
      mixed: true,
      h: ['6 bottles means 6 groups of three quarters.', 'How many quarters is that? Then turn quarters into litres.'],
      s: '6 groups of 3 quarters is 18 quarters. 4 quarters make a litre, so 18 quarters is 4 litres and 2 quarters left over: 4 {1/2} litres.',
      w: [['18', 'That counts quarter-litres. Four quarters make only 1 litre.'], ['4', 'You have 2 quarters left over. Do not drop them.']],
    }),
    num('t2', 'A path is 2 {1/2} km long. Omar walks {2/5} of the path. How many km does he walk?', 1, {
      h: ['2 {1/2} km is 5 half-kilometres.', '{2/5} of 5 halves is...?'],
      s: '2 {1/2} km is 5 halves. One fifth of 5 halves is 1 half. Two fifths is 2 halves, which is 1 km.',
      w: [['2/5', 'The path is longer than 1 km. A fraction of 2 {1/2} km cannot be as small as {2/5} km.'], ['5', 'You multiplied 2 {1/2} by 2. But he only walks a part of the path, so the answer is less than 2 {1/2}.']],
    }),
  ],

  learn: [
    p('A <b>mixed number</b> is a whole number plus a fraction, like 2 {1/2}. An <b>improper fraction</b> has a top that is bigger than its bottom, like {5/2}. They are two names for the same amount.'),
    def('mixed number', 'A whole number and a fraction written together. 2 {1/2} means 2 + {1/2}.'),
    def('improper fraction', 'A fraction whose top is bigger than or equal to its bottom, like {9/4}. Its value is 1 or more.'),
    widget('fractionExplorer', { n: 9, d: 4 }),
    p('The bar shows {9/4}. It is 2 whole bars and {1/4} more, so {9/4} = 2 {1/4}. To change a mixed number to a fraction, count the pieces: 2 {1/4} is 2 × 4 + 1 = 9 quarters.'),
    formula('Mixed number to fraction', 'w {n/d} = {(w × d + n)/d}', 'w is the whole number. n over d is the fraction part. Multiply w by d, add n, and keep the same bottom d.'),
    ex('Changing both ways', ['Change 3 {2/5} to a fraction: 3 × 5 + 2 = 17, so it is {17/5}.', 'Change {17/5} back: 17 ÷ 5 = 3 with 2 left over.', 'So {17/5} = 3 {2/5}. The remainder is the new top.']),
    rule('<b>Whole number times a fraction.</b> Think of groups. 6 × {5/8} is 6 groups of 5 eighths, which is 30 eighths. So 6 × {5/8} = {30/8} = 3 {3/4}.'),
    key('To multiply with a mixed number, first change it to an improper fraction. Then multiply as you did before, cancelling first. At the end, change the answer back to a mixed number.'),
    ex('Mixed number times mixed number', ['Find 1 {1/2} × 2 {2/3}.', 'Change both to fractions: 1 {1/2} = {3/2} and 2 {2/3} = {8/3}.', 'Multiply across, cancelling first: the 3 cancels, and the 2 divides into 8. We get {1/1} × {4/1}.', 'The answer is 4.']),
    p('You can also split a mixed number into two parts. 3 × 2 {1/2} = 3 × 2 + 3 × {1/2} = 6 + 1 {1/2} = 7 {1/2}. Each part gets multiplied by the 3.'),
    tbl(['Multiplying', 'As fractions', 'Answer'], [['4 × 2 {1/2}', '{4/1} × {5/2}', '10'], ['1 {1/2} × 1 {1/2}', '{3/2} × {3/2}', '2 {1/4}'], ['{2/3} × 3 {3/4}', '{2/3} × {15/4}', '2 {1/2}']], 'Three products'),
    tip('Estimate first. 2 {1/2} × 4 is a bit more than 2 × 4 = 8, so the answer should be near 10. If you got 8 {1/2}, you can see it is too small.'),
    warn('<b>Watch out.</b> Do not multiply the whole parts and the fraction parts separately. 2 {1/2} × 3 is <i>not</i> 2 × 3 plus {1/2}. The 3 has to multiply the {1/2} too.'),
    mcq('Mia says: "2 {1/2} × 4 = 8 {1/2}, because 2 × 4 = 8 and the {1/2} stays." What is wrong?', ['Nothing, she is right.', 'The 4 must multiply the {1/2} too. 4 groups of 2 {1/2} is 8 + 2 = 10.', 'The answer should be 8 {1/8}.'], 1, '4 × 2 {1/2} = 4 × {5/2} = {20/2} = 10. Check: 2 {1/2} + 2 {1/2} is 5, and 5 + 5 is 10.', 'Spot the mistake'),
    recap([['mixed number', 'whole number plus a fraction, like 2 {1/2}'], ['improper fraction', 'top is at least as big as the bottom, like {5/2}'], ['convert', 'multiply whole by bottom, add top, keep the bottom']], [['Mixed to fraction', 'w {n/d} = {(w × d + n)/d}']]),
  ],

  practice: [
    num('p1', 'Find 8 × {3/4}.', 6, {
      h: ['Cancel the 4 into the 8 first.'],
      s: '8 ÷ 4 = 2, and 2 × 3 = 6.',
      w: [['24', 'You multiplied 8 × 3 and forgot to divide by 4.'], ['3/32', 'You multiplied the bottom by 8. Whole numbers multiply the top.']],
    }),
    num('p2', 'Find 5 × {2/3}. Give a mixed number.', '10/3', {
      mixed: true,
      h: ['5 groups of 2 thirds is how many thirds?'],
      s: '5 × 2 = 10 thirds. 10 thirds is 3 wholes and 1 third: 3 {1/3}.',
      w: [['10', 'That counts thirds. Three thirds make one whole.'], ['3', 'There is a third left over. Do not drop it.']],
    }),
    num('p3', 'Find 1 {1/2} × {2/3}.', 1, {
      h: ['1 {1/2} is {3/2}.'],
      s: '{3/2} × {2/3} = 1. The 3s cancel and the 2s cancel.',
      w: [['2/3', 'You multiplied the whole part of 1 {1/2} but ignored the {1/2}. Use {3/2}.']],
    }),
    num('p4', 'Find 2 {1/4} × 1 {1/3}.', 3, {
      h: ['Change both to fractions: {9/4} and {4/3}.'],
      s: '{9/4} × {4/3}: cancel the 4s and cancel 3 into 9. We get 3 × 1 = 3.',
      w: [['2 1/12', 'You multiplied the wholes (2 × 1) and the fractions ({1/4} × {1/3}) separately. Change to improper fractions first.']],
    }),
    num('p5', 'Find 2 {1/2} × 2 {1/2}. Give a mixed number.', '25/4', {
      mixed: true,
      h: ['2 {1/2} is {5/2}.'],
      s: '{5/2} × {5/2} = {25/4} = 6 {1/4}. Check: a square with side 2 {1/2} has area between 2 × 2 = 4 and 3 × 3 = 9.',
      w: [['4 1/4', 'You multiplied the wholes (2 × 2) and the halves ({1/2} × {1/2}) separately. Change to {5/2} × {5/2}.']],
    }),
    num('p6', 'One loaf needs 1 {3/4} cups of flour. How many cups for 6 loaves? Give a mixed number.', '21/2', {
      mixed: true,
      h: ['1 {3/4} is {7/4}.'],
      s: '6 × {7/4} = {42/4} = {21/2} = 10 {1/2} cups.',
      w: [['6 3/4', 'You multiplied only the whole part by 6. The {3/4} needs multiplying too.'], ['9', '6 × 1 {1/2} would be 9, but each loaf needs 1 {3/4}.']],
    }),
    num('p7', 'A floor is 4 {1/2} m long and 3 {1/3} m wide. What is its area in square metres?', 15, {
      h: ['Area is length times width. Change both to fractions.'],
      s: '4 {1/2} = {9/2} and 3 {1/3} = {10/3}. {9/2} × {10/3}: cancel 3 into 9 and 2 into 10. We get 3 × 5 = 15.',
      w: [['12', 'That is 4 × 3. The two extra bits make the area larger.'], ['12 1/6', 'That comes from multiplying wholes and fractions separately. Use improper fractions.']],
    }),
    num('p8', 'I start with 24. I multiply by 1 {1/2}. Then I multiply the result by {2/3}. What number do I get?', 24, {
      h: ['Do the first step: 24 × 1 {1/2}.', 'Or multiply the two fractions first.'],
      s: '24 × {3/2} = 36. Then 36 × {2/3} = 24. We got back to 24, because {3/2} × {2/3} = 1.',
      w: [['36', 'That is only after the first step. There is a second multiplication.'], ['16', 'You multiplied 24 by {2/3} only. The first step multiplies by 1 {1/2}.']],
    }),
  ],

  challenge: [
    chain('Painting a wall', 'A wall is 3 {1/3} m long and 2 {1/4} m tall.', [
      num('c1a', 'What is the area of the wall in square metres? Give a mixed number.', '15/2', { mixed: true, h: ['{10/3} × {9/4}.'], s: '{10/3} × {9/4}: cancel 3 into 9, and 2 out of 10 and 4. {5/1} × {3/2} = {15/2} = 7 {1/2}.' }),
      num('c1b', 'Painters paint {2/3} of the wall. How many square metres is that?', 5, { h: ['Take {2/3} of 7 {1/2}.'], s: '{2/3} × {15/2} = {30/6} = 5 square metres.' }),
      num('c1c', 'Each square metre needs 1 {1/2} cups of paint. How many cups for the whole wall? Give a mixed number.', '45/4', { mixed: true, h: ['Whole wall is 7 {1/2}. Multiply by 1 {1/2}.'], s: '{15/2} × {3/2} = {45/4} = 11 {1/4} cups.' }),
    ], 'The idea: change every mixed number to a fraction before you multiply. Then simplify, and change back at the end.'),
    chain('A growing plant', 'A plant is 8 cm tall. Each week it grows by {1/4} of its height. That means each week its height is multiplied by 1 {1/4}.', [
      num('c2a', 'How tall is the plant after 1 week, in cm?', 10, { h: ['8 × 1 {1/4} = 8 × {5/4}.'], s: '8 × {5/4} = 10 cm.' }),
      num('c2b', 'How tall after 2 weeks? Give a mixed number.', '25/2', { mixed: true, h: ['Multiply 10 by 1 {1/4}.'], s: '10 × {5/4} = {50/4} = 12 {1/2} cm.' }),
      num('c2c', 'How tall after 3 weeks? Give a mixed number.', '125/8', { mixed: true, h: ['Multiply 12 {1/2} by {5/4}.'], s: '{25/2} × {5/4} = {125/8} = 15 {5/8} cm.' }),
    ], 'The idea: "grows by a fraction of itself" means multiply by 1 plus that fraction. Each week uses the new height.'),
    mc('c3', 'Find the error. Ben says: "To find 3 {1/2} × 2, I do 3 × 2 = 6 and {1/2} × 2 = 1, so 6 + 1 = 7." But then he says 3 {1/2} × 2 {1/2} = 6 + {1/4} = 6 {1/4}. Why is the second answer wrong?', ['He left out two parts: 3 × {1/2} and 2 × {1/2}. The answer is 8 {3/4}.', 'It is right, since the first answer was right.', 'He should have added 3 + 2 + 1.', 'The answer should be 7 {1/2}.'], 0, {
      s: '3 {1/2} × 2 {1/2} has four small products: 3 × 2 = 6, 3 × {1/2} = 1 {1/2}, {1/2} × 2 = 1, {1/2} × {1/2} = {1/4}. The total is 8 {3/4}. Or {7/2} × {5/2} = {35/4} = 8 {3/4}.',
      w: [[1, 'The first idea works when you multiply by a whole number. Here both numbers are mixed, so there are four products.'], [3, 'Try {7/2} × {5/2}.']],
    }),
  ],

  quiz: [
    tpl('whole', (r) => {
      const d = r.int(2, 8), n = r.int(1, d - 1), k = r.int(2, 12), z = mul(R(k), R(n, d));
      return N('Find ' + k + ' × ' + F(n, d) + '. Give a mixed number or a whole number.', fmt(z), { mixed: true, s: k + ' × ' + n + ' = ' + k * n + ' pieces of size ' + F(1, d) + '. That is ' + FR(z) + '.', w: W(z, [[k * n, 'That counts the pieces, ' + F(1, d) + ' each. Change them into wholes.']]) });
    }),
    tpl('mixfrac', (r) => {
      const d = r.int(2, 6), w = r.int(1, 4), n = r.int(1, d - 1), c = r.int(1, 5), e = r.int(2, 7);
      const z = mul(imp(w, n, d), R(c, e));
      return N('Find ' + MX(w, n, d) + ' × ' + F(c, e) + '.', fmt(z), { mixed: true, s: MX(w, n, d) + ' = ' + F(w * d + n, d) + '. Then ' + F(w * d + n, d) + ' × ' + F(c, e) + ' = ' + FR(z) + '.' });
    }),
    tpl('mixmix', (r) => {
      const d1 = r.int(2, 5), w1 = r.int(1, 3), n1 = r.int(1, d1 - 1), d2 = r.int(2, 5), w2 = r.int(1, 3), n2 = r.int(1, d2 - 1);
      const z = mul(imp(w1, n1, d1), imp(w2, n2, d2));
      return N('Find ' + MX(w1, n1, d1) + ' × ' + MX(w2, n2, d2) + '. Give a mixed number.', fmt(z), { mixed: true, s: F(w1 * d1 + n1, d1) + ' × ' + F(w2 * d2 + n2, d2) + ' = ' + FR(z) + '.', w: W(z, [[fmt(add(R(w1 * w2), mul(R(n1, d1), R(n2, d2)))), 'You multiplied wholes and fractions separately. Change to improper fractions first.']]) });
    }),
    tpl('recipe', (r) => {
      const d = r.pick([2, 3, 4]), w = r.int(1, 3), n = r.int(1, d - 1), k = r.int(2, 9), who = name(r);
      const z = mul(R(k), imp(w, n, d));
      return N(who + ' makes ' + k + ' batches. Each batch uses ' + MX(w, n, d) + ' cups of oats. How many cups of oats in all?', fmt(z), { mixed: true, s: k + ' × ' + F(w * d + n, d) + ' = ' + FR(z) + ' cups.', w: W(z, [[k * w + n, 'The ' + F(n, d) + ' cup must be multiplied by ' + k + ' too.']]) });
    }),
    tpl('area', (r) => {
      const d1 = r.pick([2, 3, 4, 5]), w1 = r.int(1, 4), n1 = r.int(1, d1 - 1), d2 = r.pick([2, 3, 4, 5]), w2 = r.int(1, 4), n2 = r.int(1, d2 - 1);
      const z = mul(imp(w1, n1, d1), imp(w2, n2, d2));
      return N('A rectangle is ' + MX(w1, n1, d1) + ' cm long and ' + MX(w2, n2, d2) + ' cm wide. What is its area in square cm? Give a mixed number.', fmt(z), { mixed: true, s: 'Area = ' + F(w1 * d1 + n1, d1) + ' × ' + F(w2 * d2 + n2, d2) + ' = ' + FR(z) + ' square cm.' });
    }),
    tpl('back', (r) => {
      const d = r.pick([2, 3, 4, 5]), w = r.int(1, 2), n = r.int(1, d - 1), k = r.int(2, 6);
      const m = imp(w, n, d), start = R(k * m.d), res = mul(start, m);
      return N('A number is multiplied by ' + MX(w, n, d) + '. The result is ' + res.n + '. What was the number?', fmt(start), { s: 'Dividing the result by ' + F(m.n, m.d) + ' gives ' + res.n + ' × ' + F(m.d, m.n) + ' = ' + fmt(start) + '. Check: ' + fmt(start) + ' × ' + F(m.n, m.d) + ' = ' + res.n + '.' });
    }),
    tpl('two', (r) => {
      const a = r.pick([2, 3, 4, 5]), b = a + r.int(1, 3), k = r.int(2, 6);
      const start = a * k * 1;
      const z = mul(mul(R(start), R(b, a)), R(a, b));
      return N('Start with ' + start + '. Multiply by ' + F(b, a) + ', then multiply by ' + F(a, b) + '. What number do you get?', fmt(z), { s: F(b, a) + ' × ' + F(a, b) + ' = 1, so you end where you started: ' + start + '.' });
    }),
  ],
});
