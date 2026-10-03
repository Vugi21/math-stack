import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, R, mul, div, fmt } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const FR = (x) => (x.d === 1 ? String(x.n) : F(x.n, x.d));
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'm4-10-2-multiplying-fractions',
  title: 'Multiplying fractions',
  blurb: 'A fraction of a fraction: the area picture, multiplying across, and cancelling first.',
  concepts: ['fractions', 'multiplying-fractions', 'area-model'],

  tryFirst: [
    num('t1', 'A garden bed takes up {1/2} of a yard. One third of the bed is roses. What fraction of the whole yard is roses?', '1/6', {
      h: ['Draw the yard as a rectangle. Shade half of it for the bed.', 'Cut the shaded half into 3 equal parts. How many such parts would fill the whole yard?'],
      s: 'Cutting the half into 3 parts makes pieces that are each {1/6} of the yard, because 6 of them fill the yard. Roses are one piece: {1/6}.',
      w: [['1/3', 'That is a third of the bed, not of the yard. The bed is only half of the yard.'], ['2/5', 'Do not add the tops and bottoms. Draw it and count equal pieces of the whole yard.']],
    }),
    num('t2', 'A square is cut into 5 equal columns and 4 equal rows. That makes 20 small cells. You shade 3 columns and 2 rows. How many cells are shaded in both the columns and the rows?', 6, {
      h: ['Picture it. The shaded columns and shaded rows cross each other.', 'The crossing is a smaller rectangle. How many cells wide and how many tall?'],
      s: 'The overlap is 3 cells wide and 2 cells tall: 3 × 2 = 6 cells.',
      w: [['5', 'That counts 3 + 2. The overlap is a rectangle, so multiply its width and height.'], ['12', 'That is 4 × 3. The overlap is 3 columns by 2 rows.']],
    }),
  ],

  learn: [
    p('Remember: "of" means multiply. Half <b>of</b> a third is {1/2} × {1/3}. Taking a part of a part gives something smaller than either.'),
    widget('fractionProduct', { a: 2, b: 3, c: 3, d: 4 }),
    p('This is an <b>area model</b>. The big square is 1 whole. One fraction cuts it into columns. The other cuts it into rows. Where the shaded columns and shaded rows cross is the answer.'),
    p('Count the small cells in the crossing. Then count all the cells in the square. The bottom number of the answer is the number of cells in the whole square.'),
    rule('<b>Multiply fractions.</b> Multiply the tops. Multiply the bottoms. {a/b} × {c/d} = {(a × c)/(b × d)}. The top counts cells in the overlap. The bottom counts all the cells.'),
    ex('Multiplying straight across', ['Find {3/4} × {2/5}.', 'Tops: 3 × 2 = 6. Bottoms: 4 × 5 = 20.', 'That is {6/20}. Both numbers divide by 2.', '{3/4} × {2/5} = {3/10}.']),
    rule('<b>Cancel first.</b> If a top and a bottom share a factor, divide both by it before you multiply. This works even when the top and the bottom come from different fractions. The numbers stay small.'),
    ex('Cancelling first', ['Find {8/15} × {5/12}.', '8 on top and 12 on bottom both divide by 4. They become 2 and 3.', '5 on top and 15 on bottom both divide by 5. They become 1 and 3.', 'Now multiply: {2/3} × {1/3} = {2/9}.']),
    p('A whole number is a fraction with bottom 1. So 6 × {2/9} = {6/1} × {2/9} = {12/9} = {4/3}.'),
    tbl(['Multiply by', 'What happens', 'Example'], [['a fraction below 1', 'the result is smaller', F(3, 4) + ' × 20 = 15'], ['exactly 1', 'the result is the same', F(5, 5) + ' × 20 = 20'], ['a fraction above 1', 'the result is bigger', F(5, 4) + ' × 20 = 25']], 'Multiplying does not always make things bigger'),
    warn('<b>Watch out.</b> To multiply you do <i>not</i> need a common bottom number. That is only for adding. And you may only cancel across a multiplication, never across a plus sign.'),
    mcq('Maya says: "{1/2} × {1/3} must be bigger than {1/3}, because multiplying makes numbers bigger." What is wrong?', ['Nothing. She is right.', 'Multiplying by {1/2} means taking half of {1/3}. Half of something is less than the something. The answer is {1/6}.', 'You cannot multiply two fractions.'], 1, 'Half of a third is a sixth, and {1/6} is less than {1/3}. Multiplying by a number below 1 makes the result smaller.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find {2/3} × {3/5}.', '2/5', {
      h: ['Cancel the 3 on top with the 3 on the bottom.'],
      s: 'Cancel the 3s: {2/1} × {1/5} = {2/5}. Or multiply across: {6/15} = {2/5}.',
      w: [['5/8', 'You added the tops and added the bottoms. Multiply them.']],
    }),
    num('p2', 'Find {3/4} × {5/7}.', '15/28', {
      h: ['Nothing cancels. Multiply tops, then bottoms.'],
      s: '3 × 5 = 15 and 4 × 7 = 28. The answer is {15/28}.',
      w: [['8/11', 'That adds. Multiplying goes straight across: top times top, bottom times bottom.'], ['15/7', 'You multiplied the tops but did not multiply the bottoms. Do 4 × 7.']],
    }),
    num('p3', 'What is {1/2} × {1/2} × {1/2} × 64?', 8, {
      h: ['Half of 64 is 32. Do it three times.'],
      s: 'Half of 64 is 32, half of 32 is 16, half of 16 is 8. Also {1/2} × {1/2} × {1/2} = {1/8}, and an eighth of 64 is 8.',
      w: [['32', 'That is only one half. You halve three times.'], ['16', 'That is only two halvings. You halve three times.']],
    }),
    num('p4', 'Fill in the box: {2/3} × ☐ = {1/6}. What fraction goes in the box?', '1/4', {
      h: ['Ask: {2/3} of what fraction makes {1/6}?', 'Try {1/4}: what is {2/3} × {1/4}?'],
      s: 'Try {1/4}: {2/3} × {1/4} = {2/12} = {1/6}. Yes. Another way: {2/3} of the box fraction is {1/6}; two thirds of {1/4} is {1/6}.',
      w: [['1/9', 'Check it: {2/3} × {1/9} = {2/27}, not {1/6}.'], ['1/2', 'Check it: {2/3} × {1/2} = {1/3}, which is too big.']],
    }),
    num('p5', 'A pan of brownies is cut up. Dev eats {1/4} of the pan. Then Ava eats {1/3} of the brownies that are left. What fraction of the whole pan does Ava eat?', '1/4', {
      h: ['After Dev eats, how much of the pan is left?', 'Ava eats a third of that.'],
      s: 'Left after Dev: {3/4} of the pan. Ava eats {1/3} of {3/4}: {1/3} × {3/4} = {1/4} of the pan.',
      w: [['1/3', 'Ava eats a third of what is <i>left</i>, not a third of the whole pan.'], ['1/12', 'That is {1/3} of {1/4}. But Dev ate {1/4}, so {3/4} is left.']],
    }),
    num('p6', 'Find {3/8} × {4/9} × {6/5}. Give your answer in lowest terms.', '1/5', {
      h: ['Cancel before you multiply. Look for pairs that share a factor.'],
      s: 'Tops: 3 × 4 × 6 = 72. Bottoms: 8 × 9 × 5 = 360. {72/360} = {1/5}. Cancelling first: 3 and 9 become 1 and 3. 4 and 8 become 1 and 2. 6 and 3 become 2 and 1. What is left is {1/2} × {2/5} = {1/5}.',
      w: [['2/5', 'Check each cancel. The product is smaller than that.']],
    }),
    mc('p7', 'Which product is the smallest?', ['{3/4} × {4/5}', '{1/2} × {1/3}', '{5/6} × {1/4}', '{7/8} × {1/5}'], 1, {
      h: ['Work each one out. Cancel to keep numbers small.'],
      s: 'The products are {3/5}, {1/6}, {5/24}, {7/40}. In decimals: 0.6, 0.166..., 0.208..., 0.175. The smallest is {1/2} × {1/3} = {1/6}.',
      w: [[0, 'That one is {3/5}, the largest of the four.'], [3, '{7/8} × {1/5} is {7/40}. Compare it with {1/6}.']],
    }),
    num('p8', 'A rectangle is {3/4} metre wide and {2/9} metre tall. What is its area in square metres?', '1/6', {
      h: ['Area is width times height.'],
      s: '{3/4} × {2/9} = {6/36} = {1/6}. Cancelling first: 3 and 9 give 1 and 3, 2 and 4 give 1 and 2.',
      w: [['5/13', 'Area uses multiplication, not addition.']],
    }),
  ],

  challenge: [
    chain('The painted sheet', 'A sheet of paper has area 1 whole sheet. A poster is cut from {3/4} of the sheet. Then {2/3} of the poster is painted blue.', [
      num('c1a', 'What fraction of the whole sheet is blue?', '1/2', { h: ['Multiply {2/3} × {3/4}.'], s: '{2/3} × {3/4} = {6/12} = {1/2}.' }),
      num('c1b', 'A sticker covers {1/5} of the blue part. What fraction of the whole sheet does the sticker cover?', '1/10', { h: ['Take {1/5} of {1/2}.'], s: '{1/5} × {1/2} = {1/10}.' }),
      num('c1c', 'The whole sheet has area 200 square centimetres. What is the area of the sticker in square centimetres?', 20, { h: ['Find {1/10} of 200.'], s: '200 ÷ 10 = 20 square centimetres.' }),
    ], 'The idea: a fraction of a fraction of a whole is one fraction of the whole. Multiply the fractions, then use the result on the actual amount.'),
    chain('A long chain', 'Look at this pattern of products: each fraction has a top that is one more than the last.', [
      num('c2a', 'Find {1/2} × {2/3} × {3/4}.', '1/4', { h: ['Cancel the 2s and the 3s.'], s: 'The 2 cancels, and the 3 cancels. Only the 1 on top and the 4 on the bottom are left: {1/4}.' }),
      num('c2b', 'Find {1/2} × {2/3} × {3/4} × {4/5} × {5/6}.', '1/6', { h: ['What cancels this time?'], s: 'Everything cancels except the first top and the last bottom: {1/6}.' }),
      num('c2c', 'The chain continues {1/2} × {2/3} × {3/4} × … all the way to {99/100}. What is the product?', '1/100', { h: ['Look at your two answers. What pattern do you see?'], s: 'Every top cancels with the bottom of the fraction before it. Only 1 on top and 100 on the bottom remain: {1/100}.' }),
    ], 'The idea: when tops and bottoms cancel in a chain, most of the numbers vanish. Spot the pattern before you multiply.'),
    mc('c3', 'Find the error. Ava says: "To multiply {3/4} × {2/5}, first make the bottoms equal: {15/20} × {8/20}. Multiply only the tops: 120. So the answer is {120/20} = 6." What is wrong?', ['Multiplying does not need equal bottoms. Multiply tops and bottoms: {6/20} = {3/10}. Her answer 6 is far too big for a fraction of a fraction.', 'She should have used a bottom of 40.', 'Nothing is wrong; the answer is 6.', 'She should have added the tops: 15 + 8 = 23.'], 0, {
      s: 'Equal bottoms are for adding. When you multiply, the bottoms multiply too. {3/4} × {2/5} = {3/10}, less than both starting fractions.',
      w: [[2, '{3/4} of a number less than 1 cannot be 6. A part of a part is small.'], [1, 'No common bottom is needed at all when you multiply.']],
    }),
  ],

  quiz: [
    tpl('basic', (r) => {
      const [a, b, c, d] = [r.int(1, 7), r.int(2, 9), r.int(1, 7), r.int(2, 9)];
      const x = R(a, b), y = R(c, d), z = mul(x, y);
      return N('Find ' + F(a, b) + ' × ' + F(c, d) + '. Give the answer in lowest terms.', fmt(z), { s: 'Tops: ' + a + ' × ' + c + ' = ' + a * c + '. Bottoms: ' + b + ' × ' + d + ' = ' + b * d + '. In lowest terms: ' + FR(z) + '.', w: W(z, [[fmt(R(a + c, b + d)), 'You added. Multiply the tops and multiply the bottoms.']]) });
    }),
    tpl('cancel', (r) => {
      const k = r.pick([2, 3, 4, 5]), m = r.pick([2, 3, 5, 7]);
      const a = r.int(1, 4) * k, d = r.int(2, 5) * k, c = r.int(1, 4) * m, b = r.int(2, 5) * m;
      const z = mul(R(a, b), R(c, d));
      return N('Find ' + F(a, b) + ' × ' + F(c, d) + '. Cancel first if you can.', fmt(z), { s: 'Cancel ' + a + ' with ' + d + ' and ' + c + ' with ' + b + ', or multiply and simplify. The answer is ' + FR(z) + '.' });
    }),
    tpl('ofof', (r) => {
      const [a, b] = r.pick([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5]]);
      const [c, d] = r.pick([[1, 2], [1, 3], [3, 4], [2, 3], [1, 5], [3, 8], [5, 6]]);
      const z = mul(R(a, b), R(c, d)), who = name(r);
      return N(who + ' has ' + F(a, b) + ' of a pizza left. ' + who + ' eats ' + F(c, d) + ' of what is left. What fraction of the whole pizza does ' + who + ' eat?', fmt(z), { s: F(c, d) + ' of ' + F(a, b) + ' is ' + F(c, d) + ' × ' + F(a, b) + ' = ' + FR(z) + '.', w: W(z, [[fmt(R(c, d)), 'That is the fraction of what is left. The question asks for a fraction of the whole pizza.']]) });
    }),
    tpl('triple', (r) => {
      const a = r.int(2, 5), b = a + r.int(1, 3), c = r.int(2, 5);
      const x = R(a, b), y = R(b, c + b), z = R(c + b, c + b + 1);
      const t = mul(mul(x, y), z);
      return N('Find ' + F(a, b) + ' × ' + F(b, c + b) + ' × ' + F(c + b, c + b + 1) + '.', fmt(t), { s: 'Each bottom cancels the next top. What remains is ' + FR(t) + '.' });
    }),
    tpl('missing', (r) => {
      const [a, b, c, d] = [r.int(1, 5), r.int(2, 7), r.int(1, 5), r.int(2, 7)];
      const x = R(a, b), y = R(c, d), z = mul(x, y);
      return N('Fill in the box: ' + FR(x) + ' × ☐ = ' + FR(z) + '. Give the fraction in the box.', fmt(y), { s: 'The box is ' + FR(z) + ' ÷ ' + FR(x) + ', which is ' + FR(y) + '. Check: ' + FR(x) + ' × ' + FR(y) + ' = ' + FR(z) + '.', w: W(y, [[fmt(z), 'That is the product. We want the missing factor. Test it: multiply it by ' + FR(x) + '.']]) });
    }),
    tpl('area', (r) => {
      const [a, b, c, d] = [r.int(1, 7), r.int(2, 9), r.int(1, 7), r.int(2, 9)];
      const z = mul(R(a, b), R(c, d));
      return N('A table top is ' + F(a, b) + ' metre long and ' + F(c, d) + ' metre wide. What is its area in square metres?', fmt(z), { s: 'Area = length × width = ' + F(a, b) + ' × ' + F(c, d) + ' = ' + FR(z) + '.' });
    }),
    tpl('threeparts', (r) => {
      const [a, b] = r.pick([[1, 2], [2, 3], [3, 4], [1, 3], [3, 5]]);
      const [c, d] = r.pick([[1, 2], [1, 3], [2, 5], [3, 4], [1, 4]]);
      const k = r.int(2, 9), n = b * d * k;
      const z = mul(R(a, b), R(c, d)), ans = z.n * (n / z.d);
      return N('A farm has ' + n + ' trees. ' + F(a, b) + ' of them are apple trees. ' + F(c, d) + ' of the apple trees are in the north field. How many apple trees are in the north field?', ans, { s: F(c, d) + ' × ' + F(a, b) + ' = ' + FR(z) + ' of all the trees. ' + FR(z) + ' of ' + n + ' = ' + ans + '.', w: W(ans, [[a * (n / b), 'That is the number of apple trees. Only a part of them are in the north field.']]) });
    }),
  ],
});
