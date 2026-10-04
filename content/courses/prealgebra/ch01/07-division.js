import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(−' + Math.abs(n) + ')' : String(n));
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; };
const tx = (n, d) => (n < 0 ? '−' : '') + '{' + Math.abs(n) + '/' + d + '}';
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };
const pair = (r) => { for (;;) { const n = r.int(1, 12), d = r.int(2, 12); if (gcd(n, d) === 1 && n !== d) return [n, d]; } };

export default lesson({
  id: 'pre-1-7-division',
  title: 'Division',
  blurb: 'Dividing is multiplying by the reciprocal. That turns fraction division into a flip and makes all the multiplication rules available again.',
  concepts: ['division', 'dividing-by-fractions', 'division-by-zero'],

  tryFirst: [
    num('t1', 'A ribbon is 3 metres long. How many pieces of length 1/4 metre can you cut from it?', 12, {
      h: ['How many quarter-metre pieces fit in 1 metre?', 'Then do that for each of the 3 metres.'],
      s: 'Each metre gives 4 pieces, so 3 metres give 3 × 4 = 12 pieces. That is 3 ÷ {1/4} = 12.',
      w: [['3/4', 'You multiplied by 1/4, but the pieces are small so you get MORE pieces than metres.'], ['4', 'That is the count from just 1 metre. There are 3 metres.']],
    }),
    num('t2', 'Fill in the blank: 12 ÷ 3 = 12 × ?', '1/3', {
      h: ['Both sides should equal 4.', 'What do you multiply 12 by to get 4?'],
      s: '12 × {1/3} = 4 and 12 ÷ 3 = 4. Dividing by 3 is the same as multiplying by {1/3}.',
      w: [['3', '12 × 3 = 36. We need to get 4.']],
    }),
  ],

  learn: [
    p('Subtraction turned out to be "add the opposite". Division works the same way, with the reciprocal doing the job the opposite did before. In a ÷ b, the number a is the <b>dividend</b>, the number b is the <b>divisor</b> (the number you divide by), and the result is the <b>quotient</b>.'),
    def('division', 'Dividing by b means multiplying by the reciprocal of b: a ÷ b = a × {1/b}, for any b other than 0. A division can also be written as a fraction: a ÷ b = {a/b}.'),
    formula('Dividing by a fraction', '{a/b} ÷ {c/d} = {a/b} × {d/c}', 'Flip the second fraction and multiply. The numbers b, c and d must not be 0.'),
    widget('fractionDivide', { a: 3, b: 1, c: 1, d: 4 }),
    p('The picture counts how many pieces of the second size fit in the first. 3 ÷ {1/4} = 12 because each of 3 wholes holds 4 quarters.'),
    ex('Dividing by a fraction', ['Find {3/4} ÷ {9/10}.', 'Flip the second fraction and multiply: {3/4} × {10/9}.', 'Tops: 3 × 10 = 30. Bottoms: 4 × 9 = 36.', '{30/36} = {5/6}.']),
    ex('Working backwards', ['When n is divided by {1/5} the result is 40. What is n?', 'Dividing by {1/5} is multiplying by 5, so n × 5 = 40.', 'Undo the multiplying: n = 40 ÷ 5 = 8.', 'Check: 8 ÷ {1/5} = 8 × 5 = 40.']),
    rule('<b>Signs.</b> Division follows the same sign rules as multiplication: the same signs give a positive, different signs give a negative. Count the negatives: an even number of them gives a positive quotient.'),
    ex('Division with negatives', ['Find (−15) ÷ (−{5/6}).', 'Two negatives, so the answer is positive.', '15 ÷ {5/6} = 15 × {6/5} = 18.', 'Answer: 18.']),
    def('division by zero', 'Dividing by 0 is <b>not allowed</b>, because it has no value. If a ÷ 0 had an answer q, then q × 0 would have to equal a. But anything times 0 is 0, so no q works if a is not 0. (And if a is 0, every q works, so there is no single answer.) This matches the fact that 0 has no reciprocal. By contrast, 0 ÷ b = 0 when b is not 0.'),
    rule('<b>Careful with grouping.</b> Division is not commutative and not associative: 24 ÷ 6 ÷ 2 is 2 but 24 ÷ (6 ÷ 2) is 8. Without brackets, work from left to right. What always works: a ÷ b ÷ c = a ÷ (b × c), and (a + b) ÷ c = a ÷ c + b ÷ c.'),
    ex('Splitting the top', ['Find (48 + 72) ÷ 12.', 'Divide each part: 48 ÷ 12 + 72 ÷ 12.', '4 + 6 = 10.', 'Check: 48 + 72 = 120 and 120 ÷ 12 = 10.']),
    tbl(['Division', 'As multiplication', 'Value'], [['20 ÷ 4', '20 × {1/4}', '5'], ['6 ÷ {2/3}', '6 × {3/2}', '9'], ['−8 ÷ 2', '−8 × {1/2}', '−4'], ['5 ÷ 0', 'no reciprocal of 0', 'no value']], 'Division as multiplication'),
    key('Division is multiplication by the <b>reciprocal</b>. So every property of multiplication helps, as long as you never divide by 0. And the two numbers a ÷ b and b ÷ a are reciprocals of each other, so (a ÷ b) × (b ÷ a) = 1 for any nonzero a and b.'),
    tip('Dividing by a number smaller than 1 makes the result <b>bigger</b>: 6 ÷ {1/2} = 12. If you divide by a fraction smaller than 1 and get a smaller number, you probably forgot to flip.'),
    tip('Split a sum on the <b>top</b> to make easy pieces: 450 ÷ 15 = (300 + 150) ÷ 15 = 20 + 10 = 30. To check any division, multiply the quotient by the divisor: you should get the dividend back.'),
    warn('<b>Watch out.</b> You can split a sum on top, (a + b) ÷ c, but you CANNOT split a sum on the bottom: 60 ÷ (3 + 2) = 12, but 60 ÷ 3 + 60 ÷ 2 = 50. And never divide by 0.'),
    mcq('Ben says: "24 ÷ 6 ÷ 2 = 24 ÷ 3 = 8, because 6 ÷ 2 = 3." What is wrong?', ['Nothing, that is the right order.', 'Division goes left to right: 24 ÷ 6 = 4, then 4 ÷ 2 = 2. Ben regrouped 6 ÷ 2 first, which changes the value.', 'The answer should be 12.'], 1, 'Division is not associative. 24 ÷ 6 ÷ 2 means (24 ÷ 6) ÷ 2 = 2. Ben computed 24 ÷ (6 ÷ 2) = 8.', 'Spot the mistake'),
    recap([['dividend', 'the number being divided'], ['divisor', 'the number you divide by (not 0)'], ['quotient', 'the result of a division'], ['division by 0', 'not allowed, no value']], [['Division', 'a ÷ b = a × {1/b}'], ['Fractions', '{a/b} ÷ {c/d} = {a/b} × {d/c}'], ['Splitting the top', '(a + b) ÷ c = a ÷ c + b ÷ c']]),
  ],

  practice: [
    num('p1', 'Find {2/3} ÷ {4/5}.', '5/6', {
      h: ['Flip the second fraction and multiply.'],
      s: '{2/3} × {5/4} = {10/12} = {5/6}.',
      w: [['8/15', 'You multiplied straight across. For division, flip the second fraction first.'], ['6/5', 'You flipped the wrong fraction. Flip the one you divide BY.']],
    }),
    num('p2', 'Find (−12) ÷ (−{3/4}).', 16, {
      h: ['Decide on the sign first.', 'Then 12 ÷ {3/4} = 12 × {4/3}.'],
      s: 'Same signs give positive. 12 × {4/3} = 16.',
      w: [['-16', 'Two negatives make a positive.'], ['9', 'You multiplied 12 × {3/4}. Division by {3/4} means multiplying by {4/3}.']],
    }),
    num('p3', 'Find (48 + 72) ÷ 12 by splitting the top.', 10, {
      h: ['Divide each piece separately.'],
      s: '48 ÷ 12 = 4 and 72 ÷ 12 = 6. Total 10.',
      w: [['76', 'Both pieces on top get divided by 12, not just one of them.']],
    }),
    mc('p4', 'Which of these has no value because it cannot be computed?', ['0 ÷ 5', '5 ÷ 0', '0 × 5', '5 ÷ 1'], 1, {
      h: ['Division by which number is not allowed?'],
      s: '5 ÷ 0 asks for a number that times 0 gives 5. No such number exists.',
      w: [[0, '0 ÷ 5 = 0. Zero divided by a nonzero number is fine.']],
    }),
    num('p5', 'Find 24 ÷ (6 ÷ 2).', 8, {
      h: ['Do the bracket first.'],
      s: '6 ÷ 2 = 3 and 24 ÷ 3 = 8.',
      w: [['2', 'That is 24 ÷ 6 ÷ 2 with no brackets. The brackets change the order.']],
    }),
    num('p6', 'When n is divided by {1/3}, the result is 18. What is n?', 6, {
      h: ['Dividing by {1/3} is the same as multiplying by what?', 'So 3 × n = 18.'],
      s: 'n ÷ {1/3} = 3n = 18, so n = 6.',
      w: [['54', 'You multiplied 18 by 3. Undo it: dividing by {1/3} multiplies by 3, so to undo it divide 18 by 3.']],
    }),
    num('p7', 'Take any two nonzero numbers a and b. What is (a ÷ b) × (b ÷ a)? Give a number.', 1, {
      h: ['Try a = 6 and b = 3.', 'The two parts are reciprocals of each other.'],
      s: '(a ÷ b) and (b ÷ a) are reciprocals, so they multiply to 1. With 6 and 3: 2 × {1/2} = 1.',
      w: [['0', 'Try actual numbers like 6 and 3: you get 2 × {1/2}.']],
    }),
    num('p8', 'What is 0 ÷ (−7)?', 0, {
      h: ['What is 0 × {−1/7}?'],
      s: '0 × (−{1/7}) = 0.',
      w: [['-7', 'Zero multiplied by anything is zero, so zero divided by anything (not zero) is zero too.']],
    }),
  ],

  challenge: [
    chain('Counting pieces', 'Dividing by a fraction asks "how many of these fit?".', [
      num('c1a', 'How many pieces of size {1/3} fit in 4?', 12, { h: ['Each whole has 3 thirds.'], s: '4 × 3 = 12.' }),
      num('c1b', 'How many pieces of size {2/3} fit in 4?', 6, { h: ['Pieces twice as big, so half as many.'], s: '12 ÷ 2 = 6. Or 4 × {3/2} = 6.' }),
      num('c1c', 'Find {5/2} ÷ {5/6}.', 3, { h: ['Flip and multiply, then cancel the 5s.'], s: '{5/2} × {6/5} = {30/10} = 3.' }),
    ], 'The idea: dividing by a fraction asks how many fit. A smaller piece fits more times, a bigger piece fewer times. Flip-and-multiply does the counting.'),
    chain('Splitting a quotient', 'A quotient can be split on top but not on the bottom.', [
      num('c2a', 'Find 60 ÷ (3 + 2).', 12, { h: ['Bracket first.'], s: '60 ÷ 5 = 12.' }),
      num('c2b', 'Find 60 ÷ 3 + 60 ÷ 2.', 50, { h: ['Each division separately.'], s: '20 + 30 = 50.' }),
      num('c2c', 'The correct rule splits the top: (60 + 30) ÷ 3 = 60 ÷ 3 + ?. What goes in the blank?', 10, { h: ['Which number was added on top?'], s: 'The blank is 30 ÷ 3 = 10. Check: 90 ÷ 3 = 30 = 20 + 10.' }),
    ], 'The idea: dividing by c is multiplying by {1/c}, and multiplication distributes over a sum. So (a + b) ÷ c splits, but c cannot be broken as c = b + d on the bottom.'),
    mc('c3', 'Find the error. Dev says: "{2/3} ÷ {4/5} = {3/2} × {4/5}, because you flip the first one." What is wrong?', ['You must flip the second fraction (the one you divide by): {2/3} × {5/4}.', 'Nothing, either one can be flipped.', 'You should flip both fractions.', 'You should add instead.'], 0, {
      s: 'The reciprocal goes on the thing you are dividing BY. {2/3} × {5/4} = {5/6}. Dev found {6/5}, which is the reciprocal of the right answer.',
      w: [[1, 'Flipping the wrong one gives the reciprocal of the right answer.'], [2, 'Flipping both gives {3/2} × {5/4}, the reciprocal of the product {2/3} × {4/5}. That is not the quotient.']],
    }),
  ],

  quiz: [
    tpl('fracdiv', (r) => {
      const [a, b] = pair(r), [c, d] = pair(r);
      return N('Find ' + tx(a, b) + ' ÷ ' + tx(c, d) + '.', fr(a * d, b * c), { s: 'Flip the second and multiply: ' + tx(a, b) + ' × ' + tx(d, c) + ' = ' + tx(a * d, b * c) + (gcd(a * d, b * c) > 1 ? ' = ' + fr(a * d, b * c) : '') + '.', w: wr(fr(a * d, b * c), [[fr(a * c, b * d), 'You multiplied straight across. Flip the second fraction first.'], [fr(b * c, a * d), 'That is the reciprocal of the answer. Flip the one you divide by, not the first.']]) });
    }),
    tpl('intfrac', (r) => {
      const [c, d] = pair(r), t = r.int(2, 12), n = c * t;
      return N('Find ' + n + ' ÷ ' + tx(c, d) + '.', t * d, { s: n + ' × ' + tx(d, c) + ' = ' + t * d + '.', w: wr(t * d, [[fr(n * c, d), 'Dividing by ' + tx(c, d) + ' means multiplying by ' + tx(d, c) + ', not ' + tx(c, d) + '.']]) });
    }),
    tpl('signs', (r) => {
      const b = r.nz(-12, 12), t = r.nz(-12, 12), a = b * t;
      return N('Find ' + m(a) + ' ÷ ' + par(b) + '.', t, { s: 'Sizes: ' + Math.abs(a) + ' ÷ ' + Math.abs(b) + ' = ' + Math.abs(t) + '. ' + (t < 0 ? 'Different signs, so negative.' : 'Same signs, so positive.') + ' Answer ' + m(t) + '.', w: wr(t, [[-t, 'Check the sign rule: same signs give a positive, different signs a negative.']]) });
    }),
    tpl('splittop', (r) => {
      const c = r.int(3, 15), x = r.int(2, 20), y = r.int(2, 20);
      return N('Find (' + c * x + ' + ' + c * y + ') ÷ ' + c + '.', x + y, { s: 'Split the top: ' + c * x + ' ÷ ' + c + ' + ' + c * y + ' ÷ ' + c + ' = ' + x + ' + ' + y + ' = ' + (x + y) + '.', w: wr(x + y, [[c * x + y, 'Both pieces on top are divided by ' + c + ', not just one.']]) });
    }),
    tpl('assoc', (r) => {
      const c = r.int(2, 9), k = r.int(2, 9), t = r.int(2, 12), b = c * k, a = k * t;
      return N('Find ' + a + ' ÷ (' + b + ' ÷ ' + c + ').', t, { s: 'Bracket first: ' + b + ' ÷ ' + c + ' = ' + k + '. Then ' + a + ' ÷ ' + k + ' = ' + t + '.', w: wr(t, [[fr(a, b * c), 'That is ' + a + ' ÷ ' + b + ' ÷ ' + c + ' (left to right). The brackets change the order.']]) });
    }),
    tpl('undef', (r) => {
      const n = r.int(2, 99);
      return choice(r, 'Which of these has no value because it cannot be computed?', n + ' ÷ 0', [['0 ÷ ' + n, 'Zero divided by a nonzero number is 0, which is fine.'], [n + ' ÷ 1', 'That is just ' + n + '.'], ['0 × ' + n, 'That is just 0.']], { s: 'Only dividing by 0 is a problem: nothing times 0 can equal ' + n + '.' });
    }),
    tpl('pieces', (r) => {
      const [c, d] = pair(r), t = r.int(2, 14), L = c * t;
      return N(name(r) + ' has a ribbon ' + L + ' metres long and cuts it into pieces ' + tx(c, d) + ' of a metre long. How many pieces?', t * d, { s: L + ' ÷ ' + tx(c, d) + ' = ' + L + ' × ' + tx(d, c) + ' = ' + t * d + '.', w: wr(t * d, [[fr(L * c, d), 'Each piece is shorter than a metre, so you get more pieces than metres. Divide by the piece, do not multiply.']]) });
    }),
    tpl('solve', (r) => {
      const [c, d] = pair(r), k = r.int(2, 30);
      return N('A number n satisfies n ÷ ' + tx(c, d) + ' = ' + k + '. What is n?', fr(k * c, d), { s: 'n ÷ ' + tx(c, d) + ' = n × ' + tx(d, c) + ' = ' + k + ', so n = ' + k + ' × ' + tx(c, d) + ' = ' + fr(k * c, d) + '.', w: wr(fr(k * c, d), [[fr(k * d, c), 'To undo "divide by ' + tx(c, d) + '" you multiply by ' + tx(c, d) + ', not by its reciprocal.']]) });
    }),
  ],
});
