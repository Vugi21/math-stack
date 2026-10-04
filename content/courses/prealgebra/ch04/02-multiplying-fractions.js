import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, sub, mul, fmt, fm, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'pre-4-2-multiplying-fractions',
  title: 'Multiplying fractions',
  blurb: 'Taking a fraction of a fraction, the area picture, and why you multiply straight across.',
  concepts: ['fractions', 'multiplying-fractions', 'cancelling'],

  tryFirst: [
    num('t1', 'You have {1/2} of a pizza left. You eat half of what is left. What fraction of the whole pizza did you eat?', '1/4', {
      h: ['Draw the whole pizza, shade the half that is left, then cut that half in two.'],
      s: 'Half of a half is one of 4 equal pieces of the whole pizza: {1/4}.',
      w: [['1/2', 'That is the amount you started with. You ate only half of that.'], ['1/3', 'Cut the leftover half into two pieces. How many such pieces would fill the whole pizza?']],
    }),
    num('t2', 'A candy bar is cut into 3 equal strips. You keep 2 strips. You give half of your strips to a friend. What fraction of the whole bar does your friend get?', '1/3', {
      h: ['How many strips is half of 2 strips?'],
      s: 'You keep 2 strips and give half of them away: 1 strip. One strip out of 3 is {1/3} of the bar.',
      w: [['1/2', 'That is half of the bar. Your friend gets half of <i>your</i> part, and your part is only 2 of the 3 strips.'], ['2/3', 'That is what you kept before giving anything away.']],
    }),
  ],

  learn: [
    p(`In everyday English, "of" often means multiply. "Half <b>of</b> a pizza" is {1/2} × pizza. "Half of a half" is {1/2} × {1/2}, and we found in the warm-up that it equals {1/4}. Multiplying by a fraction means <b>taking a part of</b> something.`),
    def('product', `The result of multiplying. The product of {1/2} and {1/3} is {1/6}. Each number being multiplied is called a <b>factor</b>.`),
    def('unit fraction', `A fraction that has 1 on top, like {1/5}. Multiplying by {1/5} means taking one of 5 equal parts, which is the same as dividing by 5.`),
    widget('fractionProduct', { a: 2, b: 3, c: 3, d: 4 }),
    p(`The picture is an <b>area model</b>. The whole is a square. One fraction cuts it into columns and the other cuts it into rows. The overlap of the shaded columns and shaded rows is the answer. Count the small cells in the overlap, then count the cells in the whole square.`),
    formula('Multiplying fractions', `{a/b} × {c/d} = {(a × c)/(b × d)}`, `Multiply the tops and multiply the bottoms. The bottom b × d is the number of little cells in the whole square. The top a × c is the number of cells in the overlap. Neither b nor d may be 0.`),
    ex('Multiplying straight across', [`Find {3/4} × {2/5}.`, `Tops: 3 × 2 = 6. Bottoms: 4 × 5 = 20.`, `That gives {6/20}. Both numbers share a factor of 2, so divide both by 2.`, `{3/4} × {2/5} = {3/10}.`]),
    key(`Multiplying fractions needs <b>no common denominator</b>. Just multiply across. Common denominators belong to adding and subtracting, where pieces of one size are counted together. In multiplying, you are cutting pieces into smaller pieces.`),
    rule(`<b>Cancel before you multiply.</b> If a top and a bottom (from <i>different</i> fractions) share a factor, divide both by it first. The numbers stay small and the answer comes out already simplified.`),
    ex('Cancelling first', [`Find {8/15} × {5/12}.`, `8 (top) and 12 (bottom) share a factor of 4. Divide both: 8 → 2, 12 → 3.`, `5 (top) and 15 (bottom) share a factor of 5. Divide both: 5 → 1, 15 → 3.`, `Now we have {2/3} × {1/3} = {2/9}.`]),
    p(`<b>Whole numbers</b> are fractions in disguise. Write 6 as {6/1} and then multiply as usual: 6 × {2/9} = {6/1} × {2/9} = {12/9} = {4/3}. In words: 6 groups of two-ninths is twelve ninths.`),
    ex('A fraction of a fraction of a number', [`What is {3/5} of {5/6} of 36?`, `"Of" means multiply: {3/5} × {5/6} × 36.`, `Cancel the 5s and the 3 with the 6: {3/5} × {5/6} = {1/2}.`, `{1/2} × 36 = 18. Check the story: {5/6} of 36 is 30, and {3/5} of 30 is 18.`]),
    tbl(['Multiply by', 'Effect on the number', 'Example'], [['a fraction less than 1', 'gets smaller', '{3/4} × 20 = 15'], ['exactly 1', 'stays the same', '{5/5} × 20 = 20'], ['a fraction greater than 1', 'gets bigger', '{5/4} × 20 = 25']], 'What multiplying does'),
    tip(`Before calculating, <b>estimate</b>. If both fractions are below 1, the product must be smaller than each of them. {3/5} × {2/7} has to be less than {2/7}. If your answer is bigger than a factor, check for a mistake. Also, when numbers are large, cancel first and multiply last.`),
    warn(`<b>Watch out.</b> You do <i>not</i> need a common denominator to multiply (that is for adding). Cancelling works only between factors that are multiplied: you cannot cancel across an addition. And "multiplying makes bigger" is only true for factors greater than 1. A fraction of something is <i>less</i> than the something.`),
    mcq(`Maya says: "{1/2} × {1/3} must be bigger than {1/3} because multiplying makes things bigger." What is wrong?`, [`Nothing, she is right.`, `Multiplying by {1/2} means taking half of {1/3}, which is less than {1/3}. Multiplying by a number below 1 makes things smaller.`, `You cannot multiply two fractions.`], 1, `Half of a third is a sixth, and {1/6} is smaller than {1/3}.`, 'Spot the mistake'),
    recap([['product', 'the result of multiplying'], ['area model', 'a square cut into columns and rows; the overlap is the product'], ['cancelling', 'dividing a top and a bottom by a shared factor before multiplying'], ['whole number as a fraction', '6 = {6/1}']], [['Multiplying fractions', '{a/b} × {c/d} = {(a × c)/(b × d)}'], ['Fraction of a quantity', '{a/b} × N = {(a × N)/b}']]),
  ],

  practice: [
    num('p1', 'Find {3/5} × {2/7}.', '6/35', {
      h: ['Multiply the tops, then the bottoms.'],
      s: '3 × 2 = 6 and 5 × 7 = 35. The answer is {6/35}.',
      w: [['5/12', 'You added the tops and the bottoms. Multiplication goes straight across: top times top, bottom times bottom.'], ['6/7', 'Only the tops were multiplied. The bottoms get multiplied too: 5 × 7 = 35.']],
    }),
    num('p2', 'Find {4/9} × {3/8}. Give the answer in simplest form.', '1/6', {
      h: ['Try cancelling first: 4 and 8 share a factor, and 3 and 9 share a factor.'],
      s: 'Cancel 4 with 8: 1 and 2. Cancel 3 with 9: 1 and 3. Now {1/3} × {1/2} = {1/6}.',
      w: [['7/17', 'You added tops and bottoms. Multiply them instead.']],
    }),
    num('p3', 'Find 6 × {2/9}.', '4/3', {
      mixed: true,
      h: ['Write 6 as {6/1}, or think "6 groups of 2 ninths".'],
      s: '6 × 2 = 12 ninths, {12/9} = {4/3}, which is 1 and {1/3}.',
      w: [['2/54', 'That multiplies the bottom by 6 and leaves the top alone. It is the other way round: 6 × 2 is the new top, and the bottom stays 9.'], ['12/54', 'Writing 6 as {6/1}, the bottom is 1 × 9 = 9, not 54.']],
    }),
    num('p4', 'What is {2/3} of {3/4} of 40?', 20, {
      h: ['Do one step at a time. First find {3/4} of 40.'],
      s: '{3/4} of 40 is 30. Then {2/3} of 30 is 20. (Or multiply {2/3} × {3/4} = {1/2} and take half of 40.)',
      w: [['30', 'That is only the first step. You still need {2/3} of 30.']],
    }),
    num('p5', 'Find {3/4} × {8/9} × {5/6}.', '5/9', {
      h: ['Cancel as you go. 3 and 9, then 8 and 4, then...', 'Or multiply everything: 120/216, then simplify.'],
      s: '3 × 8 × 5 = 120 and 4 × 9 × 6 = 216. {120/216} divided by 24 on both is {5/9}.',
      w: [['16/19', 'You added the tops and the bottoms. Multiply them.']],
    }),
    mc('p6', 'Without calculating, which product is smaller than {3/5}?', [F(3, 5) + ' × ' + F(4, 3), F(3, 5) + ' × 1', F(3, 5) + ' × ' + F(7, 8), F(3, 5) + ' × ' + F(5, 4)], 2, {
      h: ['A number gets smaller only when multiplied by something less than 1.'],
      s: '{7/8} is less than 1, so {3/5} × {7/8} is less than {3/5}. The factors {4/3} and {5/4} are bigger than 1 and 1 changes nothing.',
      w: [[1, 'Multiplying by 1 leaves the number unchanged, so it is equal to {3/5}, not smaller.'], [0, '{4/3} is greater than 1, so the product is bigger than {3/5}.'], [3, '{5/4} is greater than 1, so the product is bigger than {3/5}.']],
    }),
    num('p7', 'Ava walks {2/3} of the way to school, then rides a bike for {3/4} of the distance that is left. What fraction of the whole trip is still left?', '1/12', {
      h: ['After walking, what fraction of the trip is left?', 'The bike ride covers {3/4} of that leftover amount. What is left of the leftover?'],
      s: 'After walking, {1/3} of the trip is left. The bike covers {3/4} of that, so {1/4} of the leftover is still there: {1/4} × {1/3} = {1/12}.',
      w: [['1/3', 'That is what was left after walking only. The bike ride used up some of it.'], ['1/4', 'That is the unused part of the leftover, not of the whole trip. Take {1/4} of {1/3}.']],
    }),
  ],

  challenge: [
    chain('Folding paper', 'You fold a sheet of paper in half, then in half again, then in half a third time, and open it up.', [
      num('c1a', 'What fraction of the sheet is one section of the creased paper?', '1/8', { h: ['Each fold doubles the number of sections: 2, 4, ...'], s: 'Three folds make 2 × 2 × 2 = 8 equal sections. One section is {1/8}.' }),
      num('c1b', 'You colour {3/4} of one section. What fraction of the whole sheet is coloured?', '3/32', { h: ['Take {3/4} of {1/8}.'], s: '{3/4} × {1/8} = {3/32}.' }),
      num('c1c', 'The sheet has area 64 square cm. What is the area of the coloured patch, in square cm?', 6, { h: ['Take {3/32} of 64.'], s: '64 ÷ 32 = 2, then 3 × 2 = 6 square cm.' }),
    ], 'The idea: a fraction of a fraction is a product, and the area model tells you the denominator is the number of tiny cells in the whole.'),
    chain('Cancel, cancel, cancel', 'Look at what happens when fractions are chained so that each top matches the next bottom.', [
      num('c2a', 'Find {1/2} × {2/3}.', '1/3', { h: ['Cancel the 2s.'], s: '{1×2/2×3} = {2/6} = {1/3}.' }),
      num('c2b', 'Now multiply that by {3/4}. Find {1/2} × {2/3} × {3/4}.', '1/4', { h: ['The 2s cancel and the 3s cancel.'], s: 'Everything in the middle cancels, leaving {1/4}.' }),
      num('c2c', 'Find {1/2} × {2/3} × {3/4} × ... × {9/10}, a product with nine fractions.', '1/10', { h: ['Look for the pattern in the first two answers: the result was {1/3}, then {1/4}.'], s: 'Every top cancels the bottom of the fraction before it. Only the first top (1) and the last bottom (10) survive: {1/10}.', w: [['9/10', 'The 9 on the last top cancels against the bottom of the fraction before it ({8/9}).']] }),
    ], 'The idea: when you cancel before multiplying, patterns appear that you could never see after multiplying everything out.'),
    mc('c3', 'Find the error. Ben multiplies {2/3} × {4/5} like this: "Common denominator 15: {10/15} × {12/15}. Multiply the tops and keep the bottom: {120/15} = 8." What went wrong?', ['Nothing, 8 is correct.', 'A common denominator is not needed to multiply, and you cannot keep the bottom. The bottoms must also be multiplied. The answer is {8/15}.', 'He should have added the tops: 22.', 'The denominator should be 30.'], 1, {
      s: '{2/3} × {4/5} = {8/15}. A product of two fractions below 1 must be below 1, so 8 is clearly too big.',
      w: [[0, 'Check by size: two fractions less than 1 multiply to something less than 1.'], [2, 'Adding is for a different operation. Multiplying goes straight across.']],
    }),
  ],

  quiz: [
    tpl('prod', (r) => {
      const b = r.int(2, 9), a = r.int(1, b - 1), d = r.int(2, 9), c = r.int(1, d - 1);
      const ans = mul(R(a, b), R(c, d));
      return N('Find ' + F(a, b) + ' × ' + F(c, d) + '. Give the answer in simplest form.', fmt(ans), { s: 'Tops: ' + a + ' × ' + c + ' = ' + a * c + '. Bottoms: ' + b + ' × ' + d + ' = ' + b * d + '. ' + F(a * c, b * d) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(a + c, b + d)), 'Adding tops and bottoms is not multiplication. Multiply across.'], [fmt(R(a * c, b)), 'The bottoms get multiplied too: ' + b + ' × ' + d + '.']]) });
    }),
    tpl('whole', (r) => {
      const n = r.int(2, 12), b = r.int(2, 9), a = r.int(1, b - 1);
      const ans = mul(R(n), R(a, b));
      return N('Find ' + n + ' × ' + F(a, b) + '.', fmt(ans), { mixed: true, s: n + ' × ' + a + ' = ' + n * a + ', over ' + b + ': ' + F(n * a, b) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(R(n * a, b * n)), 'The whole number multiplies only the top, not the bottom.']]) });
    }),
    tpl('ofof', (r) => {
      const b = r.int(2, 6), d = r.int(2, 6), a = r.int(1, b - 1), c = r.int(1, d - 1), k = r.int(1, 6);
      const tot = b * d * k, who = name(r);
      const first = a * d * k;
      return N('A school has ' + tot + ' students. ' + F(a, b) + ' of them are in the band, and ' + F(c, d) + ' of the band members play brass. How many brass players are there?', a * c * k, { s: 'The band has ' + F(a, b) + ' of ' + tot + ' = ' + first + ' students. Then ' + F(c, d) + ' of ' + first + ' = ' + a * c * k + '.', w: W(a * c * k, [[first, 'That is the size of the band. You still need ' + F(c, d) + ' of it.']]) });
    }),
    tpl('cancel', (r) => {
      const n1 = r.int(2, 9), n2 = r.int(2, 9), f1 = r.int(1, 6), f2 = r.int(1, 6), g1 = r.int(1, 5), g2 = r.int(1, 5);
      const ans = R(g1 * g2, f1 * f2);
      const A = F(n1 * g1, n2 * f1), B = F(n2 * g2, n1 * f2);
      return N('Find ' + A + ' × ' + B + '. Try cancelling before you multiply.', fmt(ans), { s: 'Cancel ' + n1 + ' with ' + n1 + ' and ' + n2 + ' with ' + n2 + ' across the fractions. What remains is ' + F(g1 * g2, f1 * f2) + ' = ' + fm(ans) + '.' });
    }),
    tpl('area', (r) => {
      const b = r.int(2, 8), d = r.int(2, 8), a = r.int(1, 3 * b), c = r.int(1, 3 * d);
      const ans = mul(R(a, b), R(c, d));
      return N('A rectangle is ' + F(a, b) + ' metre long and ' + F(c, d) + ' metre wide. What is its area in square metres?', fmt(ans), { mixed: true, s: 'Area = length × width = ' + F(a, b) + ' × ' + F(c, d) + ' = ' + fm(ans) + ' square metres.', w: W(ans, [[fmt(R(a + c, b + d)), 'Area is length times width, and fractions multiply across.']]) });
    }),
    tpl('remain', (r) => {
      const b = r.int(3, 9), a = r.int(1, b - 1), d = r.int(2, 9), c = r.int(1, d - 1), who = name(r);
      const left1 = R(b - a, b), ans = mul(left1, R(d - c, d));
      return N(who + ' reads ' + F(a, b) + ' of a book on Saturday and ' + F(c, d) + ' of the remaining pages on Sunday. What fraction of the whole book is still unread?', fmt(ans), { s: 'After Saturday, ' + fm(left1) + ' is left. Sunday uses ' + F(c, d) + ' of that, so ' + F(d - c, d) + ' of it remains: ' + fm(left1) + ' × ' + F(d - c, d) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(left1), 'That is what was left after Saturday. Sunday read some of it.'], [fmt(sub(left1, R(c, d))), 'Sunday read ' + F(c, d) + ' of what was <i>remaining</i>, not of the whole book.']]) });
    }),
    tpl('telescope', (r) => {
      const s = r.int(2, 9), e = r.int(s + 6, 40);
      return N('Find ' + F(s, s + 1) + ' × ' + F(s + 1, s + 2) + ' × ' + F(s + 2, s + 3) + ' × … × ' + F(e - 1, e) + ' (each top is the same as the bottom before it).', fmt(R(s, e)), { s: 'Each top cancels the bottom of the previous fraction. Only the first top, ' + s + ', and the last bottom, ' + e + ', survive: ' + F(s, e) + '.', w: W(R(s, e), [[fmt(R(e - 1, e)), 'The last top cancels too. Only the first top and the last bottom remain.']]) });
    }),
    tpl('smaller', (r) => {
      const b = r.int(3, 9), a = r.int(2, b - 1), less = r.bool();
      const small = () => { const d = r.int(3, 9); return F(r.int(1, d - 1), d); };
      const big = () => { const d = r.int(2, 8); return F(d + r.int(1, 5), d); };
      const gen = (fn, cnt) => { const out = new Set(); while (out.size < cnt) out.add(fn()); return [...out]; };
      const right = (less ? small() : big());
      const wr = gen(less ? big : small, 3);
      const s = F(a, b);
      return choice(r, 'Without calculating, which product is ' + (less ? 'less' : 'greater') + ' than ' + s + '?', s + ' × ' + right, wr.map((x) => [s + ' × ' + x, less ? 'This factor is not below 1 (or equals 1), so the product is not less than ' + s + '.' : 'This factor is below 1, so the product is less than ' + s + '.']), { s: 'Multiplying by a number ' + (less ? 'below' : 'above') + ' 1 makes the result ' + (less ? 'smaller' : 'bigger') + '. Only ' + right + ' is ' + (less ? 'below' : 'above') + ' 1.' });
    }),
  ],
});
