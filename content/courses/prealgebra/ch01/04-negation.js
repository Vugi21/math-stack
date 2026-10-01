import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(−' + Math.abs(n) + ')' : String(n)); // negatives in brackets
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };

export default lesson({
  id: 'pre-1-4-negation',
  title: 'Negation',
  blurb: 'The minus sign as a flip, why a negative times a negative is positive, and how to count signs in a long product.',
  concepts: ['negation', 'opposites', 'sign-rules'],

  tryFirst: [
    num('t1', 'Look at this pattern: 3 × 3 = 9, 3 × 2 = 6, 3 × 1 = 3, 3 × 0 = 0. Keep the pattern going. What is 3 × (−2)?', -6, {
      h: ['Each line the answer drops by 3. What comes after 0?', 'After 0 comes −3, then...'],
      s: 'The answers go 9, 6, 3, 0, −3, −6. The second number goes 3, 2, 1, 0, −1, −2, so 3 × (−2) = −6.',
      w: [['6', 'The pattern keeps decreasing by 3 each time. It does not turn around when it passes 0.']],
    }),
    num('t2', 'Try the same idea with a negative first number: (−3) × 3 = −9, (−3) × 2 = −6, (−3) × 1 = −3, (−3) × 0 = 0. What should (−3) × (−1) be?', 3, {
      h: ['Look at how the answers change from line to line.', 'They went −9, −6, −3, 0. What is next?'],
      s: 'The answers go up by 3 each line: −9, −6, −3, 0, 3. So (−3) × (−1) = 3.',
      w: [['-3', 'The answers climb by 3 each line. After 0 comes 3, not −3.']],
    }),
  ],

  learn: [
    p('You already know the opposite of a number is the one on the other side of 0 at the same distance. The minus sign in front of a number is the instruction <b>"flip to the other side"</b>. We call that <b>negation</b>.'),
    rule('<b>Negation.</b> −a means the opposite of a. It does NOT mean "a negative number". If a is negative, −a is positive: −(−5) = 5. Flipping twice returns you home: −(−a) = a.'),
    widget('numberLineWalk', { a: 4, b: -4 }),
    p('Above, a number and its opposite end up back at 0: a + (−a) = 0. That is how you can recognise an opposite. It is the number you add to get to zero.'),
    rule('<b>Negation is multiplying by −1.</b> −a = (−1) × a. Negating changes the sign and keeps the size. So the sign rules for products are really just "flip once for each negative factor".'),
    rule('<b>Sign rules.</b> positive × positive = positive. Positive × negative = negative. Negative × negative = positive. Count the negative factors: an <i>even</i> number of them gives a positive product, an <i>odd</i> number gives a negative product (if no factor is 0).'),
    ex('Why is a negative times a negative positive?', ['Start with something we know: (−4) × (6 + (−6)) = (−4) × 0 = 0.', 'Distribute: (−4) × 6 + (−4) × (−6) = 0.', 'We know (−4) × 6 = −24. So −24 + (−4) × (−6) = 0.', 'The only number that cancels −24 is 24. So (−4) × (−6) = 24.']),
    ex('Counting negatives', ['Find (−2) × 5 × (−3) × (−1).', 'There are three negative factors, an odd number, so the answer is negative.', 'The sizes multiply as usual: 2 × 5 × 3 × 1 = 30.', 'Answer: −30.']),
    rule('<b>Negating a sum.</b> −(a + b) = −a + (−b). The minus flips every piece inside the brackets, because −(a + b) = (−1) × (a + b) and we distribute.'),
    tbl(['Product', 'Negative factors', 'Sign'], [['(−3)(4)', '1', 'negative'], ['(−3)(−4)', '2', 'positive'], ['(−3)(−4)(−1)', '3', 'negative'], ['(−3)(4)(0)', '1', 'zero']], 'Count the negatives'),
    warn('<b>Watch out.</b> −x is not always negative. If x is −8, then −x is 8. Also, −5 + −5 is −10, but (−5) × (−5) is +25. Adding and multiplying negatives behave differently.'),
    mcq('Dev says: "−(3 + 4) = −3 + 4 = 1." What went wrong?', ['Nothing, that is the right way to remove brackets.', 'The minus must flip both numbers inside: −(3 + 4) = −3 + (−4) = −7.', 'The answer should be 7 because brackets make everything positive.'], 1, 'Negating a sum negates every part: −(3 + 4) = −7. Dev flipped only the 3.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find (−7) × 6.', -42, {
      h: ['One negative factor, so the product is negative.'],
      s: '7 × 6 = 42 and the sign is negative: −42.',
      w: [['42', 'There is exactly one negative factor, so the answer is negative.']],
    }),
    num('p2', 'Find (−8) × (−9).', 72, {
      h: ['Two negatives.'],
      s: 'An even number of negatives gives a positive. 8 × 9 = 72.',
      w: [['-72', 'Two negative factors flip twice, which returns you to positive.'], ['-17', 'That is −8 + (−9). This question is a product.']],
    }),
    num('p3', 'Simplify −(−(−5)). (Three minus signs in total.)', -5, {
      h: ['Work from the inside out. Each minus sign flips once.'],
      s: 'Work inside out: −(−5) = 5, then the outer minus flips 5 to −5. Three minus signs in a row is an odd number of flips, so the answer is the opposite of 5.',
      w: [['5', 'Count all three minus signs. Three flips is an odd number, so the sign changes from where 5 started.']],
    }),
    num('p4', 'Find (−2) × (−3) × (−5) × (−1).', 30, {
      h: ['Count the negative factors first.'],
      s: 'Four negatives is even, so the product is positive: 2 × 3 × 5 × 1 = 30.',
      w: [['-30', 'You have four negatives. Four is even, so the signs cancel in pairs.']],
    }),
    num('p5', 'Simplify −(12 + (−20)).', 8, {
      h: ['First find the number inside the brackets, or flip both parts.'],
      s: '12 + (−20) = −8, and its opposite is 8. Or: −12 + 20 = 8.',
      w: [['-8', 'That is the value inside the brackets. The minus in front flips it.'], ['-32', 'Flip each piece: −12 and +20. Then add.']],
    }),
    mc('p6', 'x is a negative number. Which of these is <i>always</i> positive?', ['x + 5', 'x × 3', '−x', 'x × x × x'], 2, {
      h: ['Try x = −1 and x = −100 in each.'],
      s: 'If x is negative, then −x is its opposite, which is positive. x + 5 can still be negative (x = −9), x × 3 is negative, and x × x × x has three negatives, so it is negative.',
      w: [[0, 'If x = −9 then x + 5 = −4.'], [1, 'A negative times a positive is negative.'], [3, 'Count the negatives: three, an odd number, so it is negative.']],
    }),
    num('p7', 'What is the product when −1 is multiplied by itself 99 times?', -1, {
      h: ['Try 2 times, 3 times, 4 times and watch the pattern.'],
      s: 'The product alternates: −1, 1, −1, 1, ... Odd numbers of factors give −1. 99 is odd.',
      w: [['1', 'Odd number of negative factors gives a negative product.']],
    }),
    num('p8', 'Find the product of all the integers from −5 to 5.', 0, {
      h: ['Is there a factor that kills the whole product?'],
      s: '0 is one of the integers from −5 to 5, so the whole product is 0.',
      w: [['-14400', 'Check the list again. Is every factor nonzero?'], ['14400', 'Check the list again. Is every factor nonzero?']],
    }),
  ],

  challenge: [
    chain('Sign detective', 'Seven nonzero integers are multiplied together and the product is negative.', [
      num('c1a', 'Which is possible: 4 of them are negative, or 5 of them are negative? Type the possible count.', 5, { h: ['Which count is odd?'], s: 'The product is negative only when the number of negative factors is odd, so 5.', w: [['4', 'Four negatives pair off completely, giving a positive product.']] }),
      num('c1b', 'Out of the seven numbers, how many different counts of negative factors are possible?', 4, { h: ['The odd counts from 1 up to 7.'], s: 'The counts 1, 3, 5, 7 give a negative product. That is 4 possibilities.', w: [['7', 'Only odd counts work.']] }),
      num('c1c', 'Now find the product of −1, −2, −3, −4, −5, −6.', 720, { h: ['Six negatives. Then multiply the sizes.'], s: 'Six is even so the answer is positive: 1 × 2 × 3 × 4 × 5 × 6 = 720.', w: [['-720', 'Six negative factors is even, so it is positive.']] }),
    ], 'The idea: only the count of negative factors matters for the sign. Pair them off; a leftover one makes the product negative.'),
    chain('Proving (−1)(−1)', 'Use the distributive property to prove the most famous sign rule.', [
      num('c2a', 'What is (−1) × (1 + (−1))?', 0, { h: ['What is in the brackets?'], s: '1 + (−1) = 0 and anything times 0 is 0.' }),
      num('c2b', 'Distribute it: (−1) × 1 + (−1) × (−1) = 0. What is (−1) × 1?', -1, { h: ['Multiplying by 1 changes nothing.'], s: '(−1) × 1 = −1.', w: [['1', 'Multiplying by 1 keeps the number as it is.']] }),
      num('c2c', 'So −1 + (−1) × (−1) = 0. What must (−1) × (−1) equal?', 1, { h: ['What number cancels −1?'], s: 'The number that adds to −1 to give 0 is 1.', w: [['-1', 'Check: −1 + (−1) = −2, not 0.']] }),
    ], 'The idea: "negative times negative is positive" is not a rule somebody made up. It is forced by the distributive property.'),
    mc('c3', 'Find the error. Mia says: "(−4) × (−3) = −12 because two negatives make a negative, just like −4 + (−3) = −7." What is the mistake?', ['Adding negatives and multiplying negatives follow different rules. Each negative factor is a flip, so two flips return to positive: (−4) × (−3) = 12.', 'There is no mistake.', 'The answer should be −7.', 'She should have found 4 × 3 = 12 and made it negative because 12 is large.'], 0, {
      s: 'In a sum, negatives pile up in the same direction. In a product, each negative is a flip, and two flips cancel.',
      w: [[1, 'Test it with the pattern (−4) × 3, (−4) × 2, (−4) × 1, (−4) × 0, (−4) × (−1): the answers go −12, −8, −4, 0, 4.'], [2, 'That is the sum, not the product.']],
    }),
  ],

  quiz: [
    tpl('prod2', (r) => {
      const a = r.nz(-15, 15), b = r.nz(-15, 15);
      return N('Find ' + par(a) + ' × ' + par(b) + '.', a * b, { s: 'Sizes: ' + Math.abs(a) + ' × ' + Math.abs(b) + ' = ' + Math.abs(a * b) + '. Sign: ' + (a * b < 0 ? 'one negative, so negative' : 'matching signs, so positive') + '. Answer ' + m(a * b) + '.', w: wr(a * b, [[-a * b, 'Check the sign again: count how many of the factors are negative.']]) });
    }),
    tpl('many', (r) => {
      const k = r.int(4, 6), f = Array.from({ length: k }, () => r.nz(-3, 3));
      const ans = f.reduce((x, y) => x * y, 1), negs = f.filter((x) => x < 0).length;
      return N('Find ' + f.map(par).join(' × ') + '.', ans, { s: 'There ' + (negs === 1 ? 'is 1 negative factor (' : 'are ' + negs + ' negative factors (') + (negs % 2 ? 'odd, so negative' : 'even, so positive') + '). Multiply the sizes: ' + m(ans) + '.', w: wr(ans, [[-ans, 'Count the negative factors again. Even means positive and odd means negative.']]) });
    }),
    tpl('nested', (r) => {
      const n = r.nz(-40, 40), k = r.int(2, 7);
      const q = '−('.repeat(k) + par(n) + ')'.repeat(k);
      const ans = k % 2 === 0 ? n : -n;
      return N('Simplify ' + q + '.', ans, { s: 'Each minus sign in front flips the number. ' + k + ' flips ' + (k % 2 ? 'ends on the other side' : 'returns to the start') + ': ' + m(ans) + '.', w: wr(ans, [[-ans, 'Count the minus signs in front of the bracket: ' + k + '.']]) });
    }),
    tpl('negsum', (r) => {
      const a = r.nz(-30, 30), b = r.nz(-30, 30);
      return N('Simplify −(' + m(a) + ' + ' + par(b) + ').', -(a + b), { s: 'Negate both parts: ' + m(-a) + ' + ' + par(-b) + ' = ' + m(-(a + b)) + '.', w: wr(-(a + b), [[a + b, 'That is the value of the sum. The minus in front flips it.'], [-a + b, 'The minus flips every term, not just the first.']]) });
    }),
    tpl('sign', (r) => {
      const k = r.int(2, 6), negs = r.int(0, k), arr = [];
      for (let i = 0; i < k; i++) arr.push(i < negs ? -r.int(1, 9) : r.int(1, 9));
      const f = r.shuffle(arr), zero = r.bool(0.2);
      if (zero) f[r.int(0, k - 1)] = 0;
      const nneg = f.filter((x) => x < 0).length;
      const right = zero ? 'Zero' : nneg % 2 ? 'Negative' : 'Positive';
      return choice(r, 'Without multiplying it out, is ' + f.map(par).join(' × ') + ' positive, negative, or zero?', right, ['Positive', 'Negative', 'Zero'].filter((x) => x !== right), { s: zero ? 'A zero factor makes the whole product 0.' : (nneg === 1 ? 'There is 1 negative factor, which is ' : 'There are ' + nneg + ' negative factors, which is ') + (nneg % 2 ? 'odd: negative.' : 'even: positive.') });
    }),
    tpl('cancelmul', (r) => {
      const a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 15);
      return N('Find (−' + a + ') × ' + b + ' + ' + a + ' × (' + b + ' + ' + c + ').', a * c, { s: 'The first product is −' + a * b + ', and the second is ' + a * b + ' + ' + a * c + '. The ' + a * b + ' parts cancel, leaving ' + a * c + '.', w: wr(a * c, [[a * b + a * c, 'The first product is negative: (−' + a + ') × ' + b + ' = −' + a * b + '. It cancels part of the second.']]) });
    }),
    tpl('distneg', (r) => {
      const n = r.int(2, 12), a = r.int(3, 15), b = r.int(2, a - 1);
      return N('Find (−' + n + ') × (' + a + ' + (−' + b + ')).', -n * (a - b), { s: 'Inside the brackets: ' + a + ' + (−' + b + ') = ' + (a - b) + '. Then (−' + n + ') × ' + (a - b) + ' = ' + m(-n * (a - b)) + '.', w: wr(-n * (a - b), [[n * (a - b), 'One negative factor makes the product negative.'], [-n * a - n * b, 'Distribute carefully: (−' + n + ') × (−' + b + ') is positive.']]) });
    }),
  ],
});
