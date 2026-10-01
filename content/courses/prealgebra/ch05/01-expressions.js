import { lesson, num, expr, mc, N, E, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

import { exprEquiv } from '../../../../src/engine/expr.js';

const same = (a, v) => { try { return exprEquiv(String(a), String(v)); } catch { return false; } };
const clean = (o = {}, a) => ({ ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });
const NN = (q, a, o) => N(q, a, clean(o, a));
const EE = (q, a, o) => E(q, a, clean(o, a));
const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const term = (a, v = 'x') => (a === 1 ? v : a === -1 ? '−' + v : m(a) + v);
const lin = (a, b, v = 'x') => term(a, v) + (b === 0 ? '' : b > 0 ? ' + ' + b : ' − ' + -b);
const pl = (a, b, v = 'x') => (a === 1 ? v : a === -1 ? '-' + v : a + v) + (b === 0 ? '' : b > 0 ? '+' + b : '-' + -b);
const sgn = (b) => (b >= 0 ? ' + ' + b : ' − ' + -b);

export default lesson({
  id: 'pre-5-1-expressions',
  title: 'Expressions: evaluating, combining, distributing',
  blurb: 'A letter stands for a number. Learn to plug in, to collect like terms, and to spread a multiplier across a sum.',
  concepts: ['variables', 'evaluating-expressions', 'like-terms', 'distributive-property'],

  tryFirst: [
    num('t1', 'A concert charges $4 for each ticket plus a single $3 booking fee on the whole order. What is the total for 6 tickets?', 27, {
      h: ['The fee is charged once, not once per ticket.', 'Find the cost of the tickets, then add the fee.'],
      s: '6 tickets cost 6 × 4 = 24 dollars. Add the one-time fee: 24 + 3 = 27.',
      w: [['42', 'The $3 fee is charged once for the whole order, not for every ticket.'], ['13', 'That is not the cost of 6 tickets. Each of the 6 tickets costs $4, so multiply first, then add the one $3 fee.']],
    }),
    num('t2', 'Find 7 × 13 + 7 × 7 without doing two big multiplications. (Hint: what do 13 and 7 make together?)', 140, {
      h: ['Both products have a 7. Think of 7 groups of something.', '13 + 7 = 20.'],
      s: '7 groups of 13 plus 7 groups of 7 is 7 groups of (13 + 7) = 7 × 20 = 140.',
      w: [['91', 'That is just 7 × 13. Do not forget the second part, 7 × 7.']],
    }),
  ],

  learn: [
    p('A <b>variable</b> is a letter that stands for a number. An <b>expression</b> is a recipe that uses numbers, letters and operations, like 3n + 2. It is not a sentence that is true or false: it just <i>is</i> a number as soon as you decide what n is. Writing 3n means 3 × n; the multiplication sign is hidden.'),
    ex('Evaluating (plugging in)', ['Find 4a − 2b when a = 5 and b = 3.', 'Replace each letter with its number, and put the number in parentheses so nothing sticks together wrongly: 4(5) − 2(3).', 'Multiplication before subtraction: 20 − 6.', 'The value is 14.']),
    rule('<b>Evaluate = substitute, then use the order of operations.</b> Parentheses, then exponents, then multiplication and division, then addition and subtraction.'),
    warn('<b>Negative numbers and squares.</b> If x = −3, then x<sup>2</sup> means (−3)(−3) = 9, not −9. Always put the substituted number in parentheses: (−3)<sup>2</sup>. Without them it is easy to square only the 3 and lose the minus sign inside.'),
    p('<b>Like terms</b> are terms with exactly the same letter part. 5x and 2x are like terms (both are "some x"), but 5x and 5 are not, and neither are 5x and 5x<sup>2</sup>. You can only combine like terms, because only they count the same kind of thing: 5 apples + 2 apples = 7 apples, but 5 apples + 2 oranges stays as it is.'),
    ex('Combining like terms', ['Simplify 6x + 4 − 2x − 9.', 'Collect the x-terms: 6x − 2x = 4x. Each term keeps the sign in front of it.', 'Collect the plain numbers: 4 − 9 = −5.', 'The simplified expression is 4x − 5.']),
    rule('<b>The distributive property.</b> A multiplier outside parentheses multiplies <i>every</i> term inside: a(b + c) = ab + ac. For example 3(x + 4) = 3x + 12. Think of 3 bags, each holding one x and 4 coins: you have 3 x\'s and 12 coins.'),
    tbl(['Before', 'Distribute', 'Simplified'], [['2(x + 5)', '2x + 10', '2x + 10'], ['4(3x − 2)', '12x − 8', '12x − 8'], ['3(x + 1) + 2(x − 4)', '3x + 3 + 2x − 8', '5x − 5'], ['−(x − 6)', '−x + 6', '−x + 6']], 'A minus sign in front of parentheses flips every sign inside'),
    mcq('Ravi writes 3(x + 4) = 3x + 4. What is wrong?', ['Nothing, that is the distributive property.', 'The 3 has to multiply the 4 too: the correct result is 3x + 12.', 'The answer should be 3x + 7 because 3 + 4 = 7.'], 1, 'Test it with x = 1: 3(1 + 4) = 15, but 3(1) + 4 = 7. The 3 multiplies everything inside, so it is 3x + 12 (which gives 15).', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Evaluate 3a − 2b when a = 5 and b = 4.', 7, {
      h: ['Replace a and b: 3(5) − 2(4).'],
      s: '3(5) − 2(4) = 15 − 8 = 7.',
      w: [['-1', 'Multiply first: 3a is 3 × 5 = 15 and 2b is 2 × 4 = 8. Then subtract.'], ['9', 'The sign between the terms is a minus: 15 − 8, not 15 + 8 or 15 − 6.']],
    }),
    num('p2', 'Evaluate x<sup>2</sup> − 3x when x = −4.', 28, {
      h: ['Put −4 in parentheses: (−4)<sup>2</sup> − 3(−4).', 'A negative times a negative is positive.'],
      s: '(−4)(−4) = 16 and 3(−4) = −12, so 16 − (−12) = 16 + 12 = 28.',
      w: [['-4', 'You squared as if x<sup>2</sup> were −16. The square of −4 is 16 because (−4)(−4) is positive.'], ['4', 'Check the second part: −3 × (−4) = +12, and subtracting −12 adds 12.']],
    }),
    expr('p3', 'Simplify 5x + 3 + 2x − 8.', '7x-5', {
      simplify: true,
      h: ['Group the x terms together, and the plain numbers together.'],
      s: '5x + 2x = 7x and 3 − 8 = −5. The result is 7x − 5.',
      w: [['7x+5', 'Check 3 − 8. It is −5, not +5.'], ['7x+11', 'The −8 is subtracted. 3 − 8 = −5.'], ['2x', 'You cannot merge x terms with plain numbers. 7x and −5 stay separate.']],
    }),
    expr('p4', 'Expand 4(2x − 3).', '8x-12', {
      h: ['The 4 multiplies each term inside the parentheses.'],
      s: '4 × 2x = 8x and 4 × (−3) = −12. The result is 8x − 12.',
      w: [['8x-3', 'The 4 has to multiply the −3 as well: 4 × 3 = 12.'], ['8x+12', 'The 3 is being subtracted, so the product is −12, not +12.']],
    }),
    expr('p5', 'Simplify 3(x + 2) + 2(x − 4).', '5x-2', {
      simplify: true,
      h: ['Distribute both multipliers first, then combine.'],
      s: '3(x + 2) = 3x + 6 and 2(x − 4) = 2x − 8. Together: 5x + 6 − 8 = 5x − 2.',
      w: [['5x-6', 'The 3 multiplies the 2 as well: 3 × 2 = 6, not 2.'], ['5x+14', 'Careful with the minus: 2 × (−4) = −8.']],
    }),
    expr('p6', 'A rectangle has width x and length x + 5. Write its perimeter as a simplified expression.', '4x+10', {
      simplify: true,
      h: ['The perimeter adds all four sides: x, x + 5, x, x + 5.'],
      s: 'x + (x + 5) + x + (x + 5) = 4x + 10.',
      w: [['2x+5', 'That counts only one width and one length. A rectangle has two of each.'], ['5x+5', 'Count carefully: there are four sides, two of length x and two of length x + 5.']],
    }),
    num('p7', 'If 3x + 3 = 15, what is the value of 6x + 6? Look for a shortcut before you solve for x.', 30, {
      h: ['How is 6x + 6 related to 3x + 3?', 'Factor: 6x + 6 = 2(3x + 3).'],
      s: '6x + 6 = 2(3x + 3) = 2 × 15 = 30. (Solving gives x = 4 and 6(4) + 6 = 30 too, but the shortcut needs no solving.)',
      w: [['15', 'That is 3x + 3 itself. The new expression is exactly double it.'], ['18', 'Doubling the whole expression doubles the 15, not just the 3.']],
    }),
  ],

  challenge: [
    chain('Garden fence', 'A rectangular garden has width w metres and length w + 3 metres. Fencing goes all the way around.', [
      expr('c1a', 'Write the perimeter in simplest form.', '4w+6', { simplify: true, h: ['Two widths and two lengths.'], s: '2w + 2(w + 3) = 2w + 2w + 6 = 4w + 6.' }),
      num('c1b', 'If the width is 7 metres, how many metres of fence are needed?', 34, { h: ['Substitute w = 7 into your expression.'], s: '4(7) + 6 = 28 + 6 = 34.' }),
      num('c1c', 'The fence you bought is 50 metres long and uses all of it. What is the width? (Undo the operations in 4w + 6.)', 11, { h: ['Subtract the 6 first, then divide.'], s: '4w + 6 = 50 so 4w = 44 and w = 11.' }),
    ], 'The idea: one expression does three jobs. You can build it from a picture, plug numbers in, or work backwards from a known result.'),
    chain('The number trick', 'Think of a number n. Double it, add 6, then take half of the result.', [
      expr('c2a', 'Write the number after "double it and add 6".', '2n+6', { h: ['Double n is 2n.'], s: '2n + 6.' }),
      expr('c2b', 'Now take half of that. Simplify.', 'n+3', { simplify: true, h: ['Half of (2n + 6) means ½ of each term.'], s: '(2n + 6)/2 = n + 3. Half distributes over both terms.' }),
      num('c2c', 'Your friend says the final answer is 10. What number did they start with?', 7, { h: ['The final result is n + 3.'], s: 'n + 3 = 10, so n = 7.' }),
    ], 'The idea: simplifying shows what the trick really does. It was just "add 3" in disguise.'),
    mc('c3', 'Find the error. Sam simplifies 2(x + 3) − (x − 1) like this: 2x + 6 − x − 1 = x + 5. What went wrong?', ['The minus sign in front of the parentheses must flip both signs: −(x − 1) = −x + 1, so the answer is x + 7.', 'Nothing, x + 5 is correct.', 'He should have added 2x + x = 3x.', 'The 2 should not multiply the 3.'], 0, {
      s: '2x + 6 − x + 1 = x + 7. Check with x = 2: 2(5) − 1 = 9 and 2 + 7 = 9.',
      w: [[1, 'Test x = 2: 2(5) − (1) = 9 but Sam\'s answer gives 7.'], [2, 'The x terms are 2x and −x, which combine to x, not 3x.']],
    }),
  ],

  quiz: [
    tpl('eval1', (r) => {
      const a = r.int(2, 9), b = r.nz(-12, 15), v = r.int(-6, 9);
      return NN('Evaluate ' + lin(a, b) + ' when x = ' + m(v) + '.', a * v + b, { s: a + '(' + m(v) + ')' + sgn(b) + ' = ' + m(a * v + b) + '.', w: [[a + v + b, 'The expression ' + a + 'x means ' + a + ' times x, not ' + a + ' plus x.']] });
    }),
    tpl('eval2', (r) => {
      const a = r.int(2, 8), b = r.int(2, 8), x = r.int(-5, 8), y = r.int(1, 9);
      const v = a * x - b * y;
      return NN('Evaluate ' + a + 'x − ' + b + 'y when x = ' + m(x) + ' and y = ' + y + '.', v, { s: a + '(' + m(x) + ') − ' + b + '(' + y + ') = ' + m(a * x) + ' − ' + (b * y) + ' = ' + m(v) + '.' });
    }),
    tpl('evalsq', (r) => {
      const k = r.int(2, 9), x = r.int(-8, -1), c = r.int(1, 12);
      const v = x * x + k * x + c;
      return NN('Evaluate x<sup>2</sup> + ' + k + 'x + ' + c + ' when x = ' + m(x) + '.', v, { s: '(' + m(x) + ')(' + m(x) + ') = ' + x * x + '. Then ' + k + '(' + m(x) + ') = ' + m(k * x) + '. Total: ' + x * x + sgn(k * x) + ' + ' + c + ' = ' + m(v) + '.', w: [[-x * x + k * x + c, 'The square of a negative number is positive: (' + m(x) + ')² = ' + x * x + '.']] });
    }),
    tpl('like', (r) => {
      const a = r.int(2, 9), c = r.nz(-8, 8), b = r.nz(-9, 9), d = r.nz(-9, 9);
      const A = a + c, B = b + d;
      const show = term(a) + sgn(b) + (c < 0 ? ' − ' + (c === -1 ? '' : -c) + 'x' : ' + ' + (c === 1 ? '' : c) + 'x') + (d < 0 ? ' − ' + -d : ' + ' + d);
      const ans = A === 0 ? String(B) : B === 0 ? term(A).replace('−', '-') : pl(A, B);
      const out = (A === 0 ? m(B) : B === 0 ? term(A) : lin(A, B));
      return EE('Simplify ' + show + '.', ans, { simplify: true, s: 'x terms: ' + a + 'x ' + (c < 0 ? '−' : '+') + ' ' + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x = ' + (A === 0 ? '0' : term(A)) + '. Numbers: ' + m(b) + sgn(d) + ' = ' + m(B) + '. Answer: ' + out + '.' });
    }),
    tpl('expand', (r) => {
      const a = r.int(2, 9), b = r.int(1, 8), c = r.int(1, 12), plus = r.bool();
      const q = 'Expand ' + a + '(' + term(b) + (plus ? ' + ' : ' − ') + c + ').';
      return EE(q, a * b + 'x' + (plus ? '+' : '-') + a * c, { s: a + ' × ' + term(b) + ' = ' + a * b + 'x and ' + a + ' × ' + c + ' = ' + a * c + ', so ' + a * b + 'x' + (plus ? ' + ' : ' − ') + a * c + '.', w: [[a * b + 'x' + (plus ? '+' : '-') + c, 'The multiplier ' + a + ' has to multiply the second term as well.']] });
    }),
    tpl('twodist', (r) => {
      const a = r.int(2, 6), b = r.int(1, 7), c = r.int(2, 6), d = r.int(1, 7), sub = r.bool();
      const xs = sub ? a - c : a + c, k = sub ? a * b + c * d : a * b - c * d;
      const q = 'Simplify ' + a + '(x + ' + b + ')' + (sub ? ' − ' : ' + ') + c + '(x − ' + d + ').';
      const ans = xs === 0 ? String(k) : pl(xs, k);
      return EE(q, ans, { simplify: true, s: 'Distribute: ' + a + 'x + ' + a * b + (sub ? ' − ' + c + 'x + ' + c * d : ' + ' + c + 'x − ' + c * d) + '. Combine like terms: ' + (xs === 0 ? m(k) : lin(xs, k)) + '.', w: sub ? [[xs === 0 ? String(a * b - c * d) : pl(xs, a * b - c * d), 'The minus sign in front of ' + c + '(x − ' + d + ') flips both terms: −' + c + ' × (−' + d + ') = +' + c * d + '.']] : [[xs === 0 ? String(a * b + c * d) : pl(xs, a * b + c * d), 'Check the sign: ' + c + ' × (−' + d + ') = −' + c * d + '.']] });
    }),
    tpl('shortcut', (r) => {
      const a = r.int(3, 9), T = r.pick([50, 100, 200]), n1 = r.int(11, T - 11), n2 = T - n1;
      return NN('Find ' + a + ' × ' + n1 + ' + ' + a + ' × ' + n2 + ' without long multiplication. (The distributive property helps.)', a * T, { s: a + ' groups of ' + n1 + ' plus ' + a + ' groups of ' + n2 + ' is ' + a + ' × (' + n1 + ' + ' + n2 + ') = ' + a + ' × ' + T + ' = ' + a * T + '.' });
    }),
    tpl('equiv', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), neg = r.bool();
      const right = a + 'x' + (neg ? ' − ' : ' + ') + a * b;
      return choice(r, 'Which expression is equal to ' + a + '(x' + (neg ? ' − ' : ' + ') + b + ')?', right, [
        [a + 'x' + (neg ? ' − ' : ' + ') + b, 'Only the first term got multiplied. The ' + a + ' also multiplies ' + b + '.'],
        ['x' + (neg ? ' − ' : ' + ') + a * b, 'The ' + a + ' multiplies the x too.'],
        [(a + b) + 'x', 'You cannot add ' + a + ' to ' + b + ' here: ' + a + ' multiplies each term.'],
      ], { s: 'Distribute: ' + a + ' × x = ' + a + 'x and ' + a + ' × ' + b + ' = ' + a * b + '.' });
    }),
  ],
});
