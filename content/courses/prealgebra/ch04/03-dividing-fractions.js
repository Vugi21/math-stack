import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, sub, mul, div, recip, fmt, fm, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'pre-4-3-dividing-fractions',
  title: 'Dividing fractions',
  blurb: 'How many pieces fit? Why dividing by a fraction means multiplying by its flip.',
  concepts: ['fractions', 'dividing-fractions', 'reciprocals'],

  tryFirst: [
    num('t1', 'You are filling a 3-cup jug using a scoop that holds {1/4} cup. How many scoops does it take?', 12, {
      h: ['How many quarter-cup scoops make 1 cup?'],
      s: 'Each cup takes 4 scoops. Three cups take 3 × 4 = 12 scoops.',
      w: [['3/4', 'That is 3 × {1/4}, the amount in 3 scoops. The question asks how many scoops fit in 3 cups.'], ['7', 'You added 3 + 4. Each cup holds 4 scoops, so multiply.']],
    }),
    num('t2', '{3/4} of a pizza is shared equally among 3 people. What fraction of the whole pizza does each person get?', '1/4', {
      h: ['Think of {3/4} as 3 slices of size {1/4}. Share the 3 slices among 3 people.'],
      s: '{3/4} is 3 quarter-slices. Three people get one quarter-slice each: {1/4} of the pizza.',
      w: [['1/3', 'That is a third of a whole pizza. Each person only gets a share of the three-quarters that exist.'], ['9/4', 'Sharing among 3 people makes each portion smaller, not bigger.']],
    }),
  ],

  learn: [
    p(`Dividing asks <b>how many fit?</b> 12 ÷ 3 asks how many 3s fit into 12. In the same way, 3 ÷ {1/4} asks how many quarters fit into 3. Quarters are small, so lots fit. Dividing by a small fraction gives a <b>bigger</b> answer.`),
    def('reciprocal', `The reciprocal of a nonzero number is the number you multiply it by to get 1. To find the reciprocal of a fraction, flip it: the reciprocal of {c/d} is {d/c}. The reciprocal of 5 is {1/5}, because 5 = {5/1}.`),
    def('quotient', `The result of dividing. In 3 ÷ {1/4} = 12, the quotient is 12, the number being divided (3) is the <b>dividend</b>, and the number you divide by ({1/4}) is the <b>divisor</b>.`),
    widget('fractionDivide', { a: 3, b: 1, c: 1, d: 4 }),
    rule(`<b>Dividing by a unit fraction.</b> Dividing by {1/n} multiplies by n. How many {1/n}s fit in 1 whole? Exactly n of them. So in 5 wholes there are 5 × n.`),
    p(`What about a fraction like {2/3} as the divisor? Dividing by {2/3} has two steps in disguise. First, count the {1/3}s that fit: that is multiplying by 3. But each piece we want is <i>two</i> of those thirds wide, so we group them in pairs, which is dividing by 2. Multiply by 3, divide by 2: that is multiplying by {3/2}.`),
    formula('Dividing by a fraction', `{a/b} ÷ {c/d} = {a/b} × {d/c}`, `Keep the first fraction, flip the second one, and multiply. The fraction you divide by cannot be 0, so c must not be 0.`),
    key(`<b>Division is "how many fit?"</b> and the flip is a shortcut for counting. Multiplying a number by its reciprocal always gives 1, so dividing by a number undoes multiplying by it, and dividing by {c/d} is the same as multiplying by {d/c}.`),
    ex('Dividing two fractions', [`Find {5/6} ÷ {10/9}.`, `Flip the second fraction and multiply: {5/6} × {9/10}.`, `Cancel 5 with 10 (giving 1 and 2) and 9 with 6 (giving 3 and 2): {1/2} × {3/2} = {3/4}.`, `Check by size: {10/9} is bigger than {5/6}, so less than one piece fits. {3/4} is under 1. ✓`]),
    ex('Fraction divided by a whole number', [`Find {3/5} ÷ 6.`, `Write 6 as {6/1}. Its reciprocal is {1/6}.`, `{3/5} × {1/6} = {3/30} = {1/10}.`, `Makes sense: splitting three-fifths into 6 equal parts gives small parts.`]),
    ex('Working backwards', [`A number divided by {3/4} equals 12. What is the number?`, `Division by {3/4} was undone by multiplying: the number is 12 × {3/4}.`, `12 × {3/4} = 9.`, `Check: 9 ÷ {3/4} = 9 × {4/3} = 12. ✓`]),
    ex('A word problem', [`A recipe uses {3/4} cup of sugar per batch. How many batches can you make from 6 cups?`, `The question is how many {3/4}s fit in 6: 6 ÷ {3/4}.`, `6 × {4/3} = {24/3} = 8.`, `You can make 8 batches. Check: 8 × {3/4} = 6. ✓`]),
    tbl(['Number', 'Reciprocal', 'Product'], [['5', '{1/5}', '1'], ['{3/7}', '{7/3}', '1'], ['{1/2}', '2', '1']], 'Reciprocals multiply to 1'),
    tip(`<b>Estimate the size first.</b> Dividing by a number below 1 makes the answer bigger than the dividend. Dividing by a number above 1 makes it smaller. If you divide {3/4} by {1/2}, the answer must be bigger than {3/4}. This quick check catches the most common mistake, forgetting to flip.`),
    warn(`<b>Watch out.</b> Flip only the fraction you are dividing <i>by</i>, the second one. {3/4} ÷ {1/2} is {3/4} × {2/1}, not {4/3} × {1/2}. Also, do not flip and then divide: after flipping, the operation becomes multiplication. And 0 has no reciprocal, because you cannot divide by 0.`),
    mcq(`Leo says: "{3/4} ÷ {1/2} = {3/4} × {1/2} = {3/8}." Use common sense: how many halves fit in {3/4}?`, [`{3/8} is right.`, `More than one half fits in {3/4}, so the answer must be bigger than 1. Leo did not flip the second fraction. The answer is {3/2}.`, `Dividing fractions is impossible.`], 1, `Dividing by {1/2} should double the number: {3/4} × 2 = {3/2}.`, 'Spot the mistake'),
    recap([['reciprocal', 'the flip of a fraction; the product of a number and its reciprocal is 1'], ['divisor', 'the number you divide by'], ['quotient', 'the result of a division'], ['dividing', 'asks how many of the divisor fit in the dividend']], [['Dividing by a fraction', '{a/b} ÷ {c/d} = {a/b} × {d/c}'], ['Dividing by a unit fraction', 'x ÷ {1/n} = x × n'], ['Reciprocal', '{c/d} × {d/c} = 1']]),
  ],

  practice: [
    num('p1', 'Find 5 ÷ {1/3}.', 15, {
      h: ['How many thirds are in one whole?'],
      s: 'Each whole holds 3 thirds. 5 wholes hold 5 × 3 = 15 thirds.',
      w: [['5/3', 'That is 5 × {1/3}. Dividing by {1/3} multiplies by 3.'], ['2', 'You subtracted. Ask how many thirds fit into 5 wholes.']],
    }),
    num('p2', 'Find {3/4} ÷ {1/8}.', 6, {
      h: ['{3/4} is how many eighths?'],
      s: '{3/4} = {6/8}, so six eighths. Or: {3/4} × 8 = 6.',
      w: [['3/32', 'You multiplied by {1/8} instead of dividing. Flip the second fraction.']],
    }),
    num('p3', 'Find {2/5} ÷ {3/10}.', '4/3', {
      mixed: true,
      h: ['Flip {3/10} and multiply. Cancel before multiplying.'],
      s: 'Flip and multiply: {2/5} × {10/3}. Cancel the 5 with the 10 (10 ÷ 5 = 2) to get {2/1} × {2/3} = {4/3}, which is 1 and {1/3}.',
      w: [['3/25', 'You multiplied by {3/10} without flipping.'], ['3/4', 'You flipped the wrong fraction. Flip the second one: the one you divide by.']],
    }),
    num('p4', 'Find {4/7} ÷ 2.', '2/7', {
      h: ['Dividing by 2 is the same as multiplying by what?'],
      s: '{4/7} × {1/2} = {4/14} = {2/7}. (Or: half of 4 sevenths is 2 sevenths.)',
      w: [['8/7', 'You multiplied by 2. Dividing by 2 makes it smaller.']],
    }),
    mc('p5', 'Which expression has the greatest value?', ['6 ÷ ' + F(2, 3), '6 ÷ ' + F(3, 2), '6 × ' + F(2, 3), '6 ÷ 6'], 0, {
      h: ['Dividing by a number below 1 makes the answer bigger than the number you started with.'],
      s: '6 ÷ {2/3} = 9. 6 ÷ {3/2} = 4. 6 × {2/3} = 4. 6 ÷ 6 = 1. The greatest is 9.',
      w: [[1, '6 ÷ {3/2} = 4. Dividing by something greater than 1 makes the result smaller than 6.'], [2, 'Multiplying by a fraction below 1 makes the result smaller than 6.']],
    }),
    num('p6', 'A recipe uses {3/4} cup of sugar per batch. You have 6 cups of sugar. How many batches can you make?', 8, {
      h: ['How many {3/4}s fit into 6?'],
      s: '6 ÷ {3/4} = 6 × {4/3} = 8 batches.',
      w: [['9/2', 'That is 6 × {3/4}, the sugar used by 6 batches. You want how many batches fit in 6 cups.'], ['6', 'Each batch uses less than 1 cup, so you can make more than 6.']],
    }),
    num('p7', 'A number divided by {3/4} equals 12. What is the number?', 9, {
      h: ['Work backwards: undo the division.', 'If x ÷ {3/4} = 12, then x = 12 × {3/4}.'],
      s: 'Undo division by multiplying: 12 × {3/4} = 9. Check: 9 ÷ {3/4} = 9 × {4/3} = 12. ✓',
      w: [['16', 'You divided 12 by {3/4}. To undo a division, multiply.']],
    }),
  ],

  challenge: [
    chain('The paint tub', 'A tub holds {5/6} litre of paint. Painting one small wall takes {1/12} litre.', [
      num('c1a', 'How many walls can be painted with a full tub?', 10, { h: ['How many {1/12}s fit into {5/6}?'], s: '{5/6} ÷ {1/12} = {5/6} × 12 = 10.' }),
      num('c1b', 'After 6 walls are painted, how many litres are left?', '1/3', { h: ['6 walls use 6 × {1/12} litre.'], s: '6 walls use {6/12} = {1/2} litre. {5/6} − {1/2} = {5/6} − {3/6} = {2/6} = {1/3}.' }),
      num('c1d', 'How many more walls can be painted with what is left?', 4, { h: ['Divide what is left by {1/12}.'], s: '{1/3} ÷ {1/12} = {1/3} × 12 = 4. Check: 6 + 4 = 10 walls in all.' }),
    ], 'The idea: dividing by a fraction counts pieces. You can do the whole job at once or in two parts, and you must get the same count.'),
    chain('Flip and flip back', 'Let us see what reciprocals really do.', [
      num('c2a', 'Find 1 ÷ {2/3}.', '3/2', { mixed: true, h: ['How many {2/3}s fit in 1?'], s: '1 ÷ {2/3} = 1 × {3/2} = {3/2}. One and a half pieces of size two-thirds fit in a whole.' }),
      num('c2b', 'Now find 1 ÷ {3/2}.', '2/3', { h: ['Flip {3/2}.'], s: '1 ÷ {3/2} = {2/3}.' }),
      num('c2c', 'What is the reciprocal of the reciprocal of {5/8}?', '5/8', { h: ['Flip it, then flip the result.'], s: 'The reciprocal of {5/8} is {8/5}. The reciprocal of {8/5} is {5/8}. You are back where you started.' }),
    ], 'The idea: the reciprocal of x is 1 ÷ x. Flipping twice undoes itself, just like opposites on the number line.'),
    mc('c3', 'Find the error. Dev says: "{6/5} ÷ {3/10} = {6/5} × {3/10} = {18/50}, so {9/25}." Which is the best check that shows Dev is wrong?', ['Dev is right.', 'Dividing by {3/10}, a small number, should give a bigger answer than {6/5}. But {9/25} is less than 1, so Dev must have forgotten to flip. The answer is 4.', 'He should have flipped the first fraction: the answer is {25/9}.', 'The answer should have denominator 10.'], 1, {
      s: '{6/5} × {10/3} = {60/15} = 4. About 4 pieces of size {3/10} fit into {6/5} = 1.2, since 4 × 0.3 = 1.2.',
      w: [[2, 'Flip the number you are dividing <i>by</i>, not the one you start with.']],
    }),
  ],

  quiz: [
    tpl('unit', (r) => {
      const k = r.int(2, 12), b = r.int(1, 4), a = r.int(1, 12);
      const amt = R(a, b), ans = mul(amt, R(k));
      const who = name(r);
      const q = r.bool() ? 'Find ' + (b === 1 ? a : F(a, b)) + ' ÷ ' + F(1, k) + '.' : who + ' has ' + (b === 1 ? a : F(a, b)) + ' ' + (fm(amt) === '1' ? 'metre' : 'metres') + ' of rope and cuts it into pieces ' + F(1, k) + ' metre long. How many pieces?';
      return N(q, fmt(ans), { mixed: true, s: 'Dividing by ' + F(1, k) + ' multiplies by ' + k + ': ' + fm(amt) + ' × ' + k + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(div(amt, R(k))), 'You divided by ' + k + '. Dividing by ' + F(1, k) + ' means multiplying by ' + k + '.']]) });
    }),
    tpl('fdiv', (r) => {
      const b = r.int(2, 9), a = r.int(1, b + 3), d = r.int(2, 9), c = r.int(1, d + 2);
      const A = R(a, b), C = R(c, d), ans = div(A, C);
      return N('Find ' + F(a, b) + ' ÷ ' + F(c, d) + '.', fmt(ans), { mixed: true, s: 'Flip the second and multiply: ' + F(a, b) + ' × ' + F(d, c) + ' = ' + F(a * d, b * c) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(mul(A, C)), 'You multiplied without flipping the second fraction.'], [fmt(div(C, A)), 'You flipped the wrong fraction. Flip the one you divide by.']]) });
    }),
    tpl('fwhole', (r) => {
      const b = r.int(2, 9), a = r.int(1, 12), n = r.int(2, 9);
      const A = R(a, b), ans = div(A, R(n));
      return N('Find ' + F(a, b) + ' ÷ ' + n + '.', fmt(ans), { mixed: true, s: 'Dividing by ' + n + ' is multiplying by ' + F(1, n) + ': ' + F(a, b) + ' × ' + F(1, n) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(mul(A, R(n))), 'Dividing by ' + n + ' makes it smaller, not bigger.']]) });
    }),
    tpl('batches', (r) => {
      const m = r.int(2, 12), d = r.int(2, 9), c = r.int(1, d - 1);
      const C = R(c, d), ans = div(R(m), C);
      const [item, unit] = r.pick([['cups of flour', 'cup'], ['litres of juice', 'litre'], ['metres of ribbon', 'metre']]);
      return N('You have ' + m + ' ' + item + '. One recipe uses ' + F(c, d) + ' of a ' + unit + '. How many recipes can you make? (Give a fraction if the last recipe is partial.)', fmt(ans), { mixed: true, s: m + ' ÷ ' + F(c, d) + ' = ' + m + ' × ' + F(d, c) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(mul(R(m), C)), 'That is how much the recipes use, not how many you can make. Divide.']]) });
    }),
    tpl('unknown', (r) => {
      const d = r.int(2, 9), c = r.int(1, d - 1), q = r.int(2, 14);
      const ans = mul(R(q), R(c, d));
      return N('A number divided by ' + F(c, d) + ' is ' + q + '. What is the number?', fmt(ans), { mixed: true, s: 'Undo the division by multiplying: ' + q + ' × ' + F(c, d) + ' = ' + fm(ans) + '. Check: ' + fm(ans) + ' ÷ ' + F(c, d) + ' = ' + q + '.', w: W(ans, [[fmt(div(R(q), R(c, d))), 'To undo dividing by ' + F(c, d) + ', multiply by ' + F(c, d) + '.']]) });
    }),
    tpl('floor', (r) => {
      const b = r.int(2, 6), a = r.int(2, 4 * b), d = r.int(2, 8), c = r.int(1, d - 1);
      const q = div(R(a, b), R(c, d));
      const full = Math.floor(q.n / q.d);
      if (full < 1) return N('How many full pieces of length ' + F(1, 2) + ' fit in 3?', 6, { s: '3 ÷ ' + F(1, 2) + ' = 6.' });
      return N('A board is ' + F(a, b) + ' metres long. How many whole pieces of length ' + F(c, d) + ' metre can be cut from it?', full, { s: F(a, b) + ' ÷ ' + F(c, d) + ' = ' + fm(q) + ', so ' + full + ' whole pieces fit.', w: W(full, [[full + 1, 'Only whole pieces count. Round down.'], [fmt(q), 'Give the number of whole pieces only.']]) });
    }),
    tpl('compound', (r) => {
      const b = r.int(2, 7), a = r.int(1, b + 2), d = r.int(2, 7), c = r.int(1, d + 2), f = r.int(2, 7), e = r.int(1, f + 2);
      const ans = mul(div(R(a, b), R(c, d)), R(e, f));
      return N('Find ' + F(a, b) + ' ÷ ' + F(c, d) + ' × ' + F(e, f) + '. (Work left to right.)', fmt(ans), { mixed: true, s: 'Left to right. First ' + F(a, b) + ' ÷ ' + F(c, d) + ' = ' + fm(div(R(a, b), R(c, d))) + '. Then × ' + F(e, f) + ' = ' + fm(ans) + '.', w: W(ans, [[fmt(div(R(a, b), mul(R(c, d), R(e, f)))), 'Left to right: divide first, then multiply. Do not divide by the whole product.']]) });
    }),
    tpl('bigger', (r) => {
      const n = r.int(2, 12), d = r.int(3, 9), c = r.int(1, d - 1);
      const C = F(c, d);
      return choice(r, 'Which expression has the greatest value?', n + ' ÷ ' + C, [[n + ' × ' + C, 'Multiplying by a fraction below 1 makes the result smaller than ' + n + '.'], [n + ' − ' + C, 'This is a little less than ' + n + '.'], [n + ' ÷ 1', 'This is exactly ' + n + '.']], { s: 'Dividing by ' + C + ' (below 1) makes ' + n + ' bigger. All the others are ' + n + ' or less.' });
    }),
    tpl('recip', (r) => {
      const b = r.int(2, 12), a = r.int(1, 12);
      if (a === b) return N('What is the reciprocal of ' + F(3, 7) + '?', '7/3', { mixed: true, s: 'Flip it: ' + F(7, 3) + '.' });
      const x = R(a, b);
      return N('What is the reciprocal of ' + F(a, b) + '? Give a fraction.', fmt(recip(x)), { mixed: true, s: 'Flip the top and bottom: ' + F(a, b) + ' becomes ' + F(b, a) + '. (Check: their product is 1.)' });
    }),
  ],
});
