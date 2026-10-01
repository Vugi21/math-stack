import { lesson, num, expr, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const term = (a, v = 'x') => (a === 1 ? v : a === -1 ? '−' + v : m(a) + v);
const lin = (a, b, v = 'x') => term(a, v) + (b === 0 ? '' : b > 0 ? ' + ' + b : ' − ' + -b);
const val = (v) => { const [n, d] = String(v).split('/'); return d ? Number(n) / Number(d) : Number(n); };
const same = (a, v) => Math.abs(val(a) - val(v)) < 1e-9;
const NN = (q, a, o = {}) => N(q, a, { ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });
const fr = (n, d) => { if (d < 0) { n = -n; d = -d; } return n % d === 0 ? n / d : n + '/' + d; };
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a, b) => (a * b) / gcd(a, b);

export default lesson({
  id: 'pre-5-3-solving-linear-equations-2',
  title: 'Solving linear equations II',
  blurb: 'Letters on both sides, parentheses, fractions, and the strange equations with no solution or with every number as a solution.',
  concepts: ['equations', 'variables-both-sides', 'distributing', 'no-solution'],

  tryFirst: [
    num('t1', 'Ava has $20 and saves $5 a week. Ben has $50 and saves $2 a week. After how many weeks do they have the same amount?', 10, {
      h: ['Make a little table for weeks 0, 1, 2, 3.', 'How much does Ava gain on Ben each week?'],
      s: 'Ben starts $30 ahead. Ava gains $5 − $2 = $3 a week on him, so she catches up after 30 ÷ 3 = 10 weeks. (Both have $70 then.)',
      w: [['30', 'That is how many dollars Ben is ahead. Ava closes the gap by $3 each week.'], ['6', 'Check: after 6 weeks Ava has 50 and Ben has 62. Not equal yet.']],
    }),
    num('t2', 'I think of x, add 3, and double the result. I get 14. What is x?', 4, {
      h: ['Undo the doubling first.'],
      s: 'Undo the doubling: 14 ÷ 2 = 7. Undo the "add 3": 7 − 3 = 4.',
      w: [['11', 'Undo the doubling first by halving; do not just subtract 3.'], ['5', 'Check it: 2(5 + 3) = 16, not 14. Undo the doubling first by halving 14.']],
    }),
  ],

  learn: [
    p('Often the unknown shows up on <b>both sides</b>: a deal like "$20 plus $5 a week" against "$50 plus $2 a week". The trick is to gather all the x-terms on one side and all the plain numbers on the other, using the same balance rule as before.'),
    tbl(['Week', 'Ava: 20 + 5w', 'Ben: 50 + 2w'], [['0', '20', '50'], ['2', '30', '54'], ['5', '45', '60'], ['10', '70', '70']], 'They meet at w = 10, where both sides of 20 + 5w = 50 + 2w agree'),
    ex('x on both sides', ['Solve 5x − 4 = 2x + 11.', 'Subtract 2x from both sides to bring the x-terms together: 3x − 4 = 11.', 'Add 4 to both sides: 3x = 15.', 'Divide by 3: x = 5. Check: 5(5) − 4 = 21 and 2(5) + 11 = 21.']),
    rule('<b>Strategy for any linear equation.</b> (1) Distribute any parentheses. (2) Combine like terms on each side. (3) Move the x-terms to one side and numbers to the other. (4) Undo the multiplication. (5) Check in the original.'),
    ex('Parentheses first', ['Solve 3(x − 2) = 2x + 5.', 'Distribute: 3x − 6 = 2x + 5.', 'Subtract 2x: x − 6 = 5.', 'Add 6: x = 11. Check: 3(9) = 27 and 2(11) + 5 = 27.']),
    warn('<b>Sign slips.</b> Moving a term to the other side means doing the opposite operation to both sides. In 7x − 3 = 4x + 12, adding 3 gives 7x = 4x + 15 (not 4x + 9). Say the operation out loud as you write it.'),
    ex('Fractions: clear the denominators', ['Solve x/2 + x/3 = 10.', 'The common denominator is 6. Multiply <i>every</i> term by 6: 3x + 2x = 60.', 'Combine: 5x = 60, so x = 12. Check: 6 + 4 = 10.']),
    rule('<b>Two strange cases.</b> If the x-terms cancel and you get a false statement like 6 = 9, there is <b>no solution</b>: no number works. If you get a true statement like 4 = 4, <b>every number</b> is a solution. Example: 2(x + 3) = 2x + 9 becomes 6 = 9, which is false, so no solution.'),
    mcq('Sam solves 3x + 2 = x + 10 as "3x − x = 10 + 2, so 2x = 12, x = 6." What went wrong?', ['Nothing, x = 6 is right.', 'Moving the +2 across means subtracting 2 from both sides: 3x − x = 10 − 2, so 2x = 8 and x = 4.', 'He should have added x to both sides.'], 1, 'Check: x = 6 gives 20 on the left and 16 on the right. x = 4 gives 14 and 14.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Solve 7x − 3 = 4x + 12.', 5, {
      h: ['Subtract 4x from both sides.', 'Then add 3.'],
      s: '3x − 3 = 12, so 3x = 15 and x = 5. Check: 32 on both sides.',
      w: [['3', 'You subtracted 3 instead of adding it when moving the −3. 3x = 12 + 3.'], ['9/11', 'Do not add the x-terms. Subtract 4x from both sides.']],
    }),
    num('p2', 'Solve 3(x + 4) = 2x + 19.', 7, {
      h: ['Distribute the 3 first: 3x + 12.'],
      s: '3x + 12 = 2x + 19, so x + 12 = 19 and x = 7. Check: 3(11) = 33 = 14 + 19.',
      w: [['15', 'The 3 multiplies the 4 too: 3 × 4 = 12, not 4.'], ['31', 'Distribute 3(x + 4) = 3x + 12 before moving anything.']],
    }),
    num('p3', 'Solve 5 − 2x = x + 20.', -5, {
      h: ['Add 2x to both sides so the x-terms are positive.'],
      s: '5 = 3x + 20, so −15 = 3x and x = −5. Check: 5 − 2(−5) = 15 and −5 + 20 = 15.',
      w: [['5', 'Check the sign: 5 − 20 is −15, so 3x = −15.'], ['25/3', 'Subtract 20 from both sides, not add.']],
    }),
    mc('p4', 'How many solutions does 4(x + 1) = 4x + 9 have?', ['Exactly one', 'No solution', 'Every number is a solution', 'Exactly two'], 1, {
      h: ['Distribute and see what happens to the x terms.'],
      s: '4x + 4 = 4x + 9. Subtract 4x from both sides: 4 = 9, which is never true, so there is no solution.',
      w: [[2, 'That happens when you reach a true statement like 4 = 4. Here the x terms cancel and leave 4 = 9, which is false.'], [0, 'When the x terms cancel, there is no x left to solve for. Look at what is left.']],
    }),
    num('p5', 'Solve x/2 + x/3 = 10.', 12, {
      h: ['Multiply every term by 6.'],
      s: '3x + 2x = 60, so 5x = 60 and x = 12. Check: 6 + 4 = 10.',
      w: [['50', 'You cannot add the bottoms (2 + 3). Clear the fractions with 6.'], ['5', 'Dividing 10 by 2 and 3 and adding is not a method. Multiply every term by 6.']],
    }),
    num('p6', 'For which number k does the equation 2x + 7 = 5x + k have x = 3 as a solution? (You know the answer; hunt for k.)', -2, {
      h: ['Replace x with 3 on both sides.'],
      s: '2(3) + 7 = 13 and 5(3) + k = 15 + k. So 13 = 15 + k and k = −2.',
      w: [['2', 'Check the sign: 13 = 15 + k means k is 2 less than zero.'], ['28', 'Substitute x = 3 into both x-terms before adding anything.']],
    }),
    num('p7', 'Plumber A charges a $40 call-out fee plus $30 per hour. Plumber B charges $20 plus $35 per hour. For how many hours do they cost the same?', 4, {
      h: ['Write 40 + 30h = 20 + 35h.'],
      s: '40 + 30h = 20 + 35h gives 20 = 5h, so h = 4. Both charge $160.',
      w: [['12', 'You added the fees. Subtract: the call-out difference is 40 − 20 = 20.'], ['20', 'That is the difference in fees. Divide it by the $5 difference in hourly rates.']],
    }),
  ],

  challenge: [
    chain('Equal areas', 'Rectangle A is 5 wide and x long. Rectangle B is 7 wide and (x − 2) long.', [
      expr('c1a', 'Write the area of rectangle B as an expanded expression.', '7x-14', { h: ['Area is width times length: 7(x − 2).'], s: '7(x − 2) = 7x − 14.' }),
      num('c1b', 'For what x do the two rectangles have equal area?', 7, { h: ['Solve 5x = 7x − 14.'], s: '14 = 2x, so x = 7.' }),
      num('c1c', 'What is that equal area?', 35, { h: ['Use A: 5 × x.'], s: '5 × 7 = 35. Check B: 7 × 5 = 35.' }),
    ], 'The idea: "equal" is a signal to build an equation with an expression on each side.'),
    chain('Which plan?', 'A gym membership: Plan 1 is $12 plus $4 per visit. Plan 2 is $30 plus $1 per visit.', [
      num('c2a', 'After how many visits do both plans cost the same?', 6, { h: ['12 + 4n = 30 + n.'], s: '3n = 18, so n = 6.' }),
      num('c2b', 'What is the cost at that point?', 36, { h: ['Use either plan.'], s: '12 + 4(6) = 36 and 30 + 6 = 36.' }),
      num('c2c', 'For 10 visits, what does the cheaper plan cost?', 40, { h: ['Compute both: 12 + 40 and 30 + 10.'], s: 'Plan 1: 52. Plan 2: 40. The cheaper is 40.' }),
    ], 'The idea: the solution is the break-even point. Past it, the plan with the smaller per-visit price wins.'),
    mc('c3', 'Find the error. Mia solves 2(x − 3) = x + 4 as "2x − 3 = x + 4, so x = 7." What happened?', ['The 2 must multiply the 3 as well: 2x − 6 = x + 4, so x = 10.', 'Nothing, x = 7 is right.', 'She should have divided 4 by 2.', 'The equation has no solution.'], 0, {
      s: '2x − 6 = x + 4, x = 10. Check x = 10: 2(10 − 3) = 14 and 10 + 4 = 14. Her x = 7 gives 2(4) = 8 on the left but 11 on the right.',
      w: [[1, 'Test x = 7: left is 2(4) = 8 but right is 11.'], [3, 'The x-terms do not cancel here (2x versus x), so there is a solution.']],
    }),
  ],

  quiz: [
    tpl('both', (r) => {
      const c = r.int(1, 6), a = c + r.int(1, 7), x = r.nz(-9, 12), b = r.nz(-12, 12), d = (a - c) * x + b;
      return NN('Solve ' + lin(a, b) + ' = ' + lin(c, d) + '.', x, { s: 'Subtract ' + term(c) + ' from both sides: ' + lin(a - c, b) + ' = ' + m(d) + '. Undo ' + m(b) + ': ' + term(a - c) + ' = ' + m(d - b) + '. So x = ' + m(x) + '.', w: [[fr(d + b, a - c), 'Moving ' + m(b) + ' across means ' + (b > 0 ? 'subtracting' : 'adding') + ' ' + Math.abs(b) + ' on both sides.']] });
    }),
    tpl('paren', (r) => {
      const a = r.int(2, 6), c = r.int(1, 5), b = r.nz(-8, 8), x = r.nz(-8, 12);
      if (a === c) return NN('Solve 3(x + 2) = x + 12.', 3, { s: '3x + 6 = x + 12, so 2x = 6 and x = 3.' });
      const d = (a - c) * x + a * b;
      return NN('Solve ' + a + '(x ' + (b > 0 ? '+ ' + b : '− ' + -b) + ') = ' + lin(c, d) + '.', x, { s: 'Distribute: ' + a + 'x ' + (b > 0 ? '+ ' + a * b : '− ' + -a * b) + ' = ' + lin(c, d) + '. Move the x-terms and the numbers: ' + term(a - c) + ' = ' + m(d - a * b) + '. So x = ' + m(x) + '.', w: [[fr(d - b, a - c), 'The ' + a + ' must multiply the ' + Math.abs(b) + ' as well.']] });
    }),
    tpl('negx', (r) => {
      const a = r.int(1, 8), b = r.int(1, 8), c = r.int(1, 8), x = r.nz(-8, 10);
      const d = a - (b + c) * x;
      return NN('Solve ' + a + ' − ' + (b === 1 ? '' : b) + 'x = ' + lin(c, d) + '.', x, { s: 'Add ' + term(b) + ' to both sides: ' + a + ' = ' + lin(b + c, d) + '. Then ' + term(b + c) + ' = ' + m(a - d) + ', so x = ' + m(x) + '.', w: [[-x, 'Check the sign of your answer by substituting it back.']] });
    }),
    tpl('fracs', (r) => {
      let a = r.pick([2, 3, 4, 5, 6]), b = r.pick([2, 3, 4, 6, 8]);
      while (b === a) b = r.pick([2, 3, 4, 6, 8]);
      const co = (k) => (k === 1 ? 'x' : k + 'x');
      const L = lcm(a, b), x = L * r.int(1, 6);
      return NN('Solve x/' + a + ' + x/' + b + ' = ' + (x / a + x / b) + '.', x, { s: 'Multiply every term by ' + L + ': ' + co(L / a) + ' + ' + co(L / b) + ' = ' + L * (x / a + x / b) + '. So ' + co(L / a + L / b) + ' = ' + L * (x / a + x / b) + ' and x = ' + x + '.' });
    }),
    tpl('onep', (r) => {
      const a = r.int(2, 7), b = r.int(1, 9), c = r.int(1, 9), x = r.nz(-6, 12);
      const d = a * (x + b) - c;
      return NN('Solve ' + a + '(x + ' + b + ') − ' + c + ' = ' + m(d) + '.', x, { s: 'Add ' + c + ': ' + a + '(x + ' + b + ') = ' + m(d + c) + '. Divide by ' + a + ': x + ' + b + ' = ' + m(x + b) + '. So x = ' + m(x) + '.', w: [[d + c - b, 'Dividing by ' + a + ' must hit the whole bracket and the right side.']] });
    }),
    tpl('plans', (r) => {
      const f1 = r.int(10, 40), f2 = f1 + r.int(5, 40), r1 = r.int(4, 12), n = r.int(2, 12), r2 = r1 - r.int(1, 3);
      const g = f1 + r1 * n - (f2 + r2 * n);
      // make plans equal at n: f2 = f1 + (r1 - r2) * n
      const F2 = f1 + (r1 - r2) * n; void g; void f2;
      return NN('Company A charges $' + f1 + ' plus $' + r1 + ' per hour. Company B charges $' + F2 + ' plus $' + r2 + ' per hour. After how many hours do they cost the same?', n, { s: f1 + ' + ' + r1 + 'h = ' + F2 + ' + ' + r2 + 'h gives ' + (r1 - r2) + 'h = ' + (F2 - f1) + ', so h = ' + n + '.', w: [[F2 - f1, 'That is the difference in fees. Divide by the difference in hourly rates, ' + (r1 - r2) + '.']] });
    }),
    tpl('count', (r) => {
      const a = r.int(2, 6), b = r.int(1, 9), kind = r.int(0, 2), cc = r.int(1, 6);
      let lhs = a + '(x + ' + b + ')', rhs, ans;
      if (kind === 0) { rhs = a + 'x + ' + (a * b); ans = 'Every number'; }
      else if (kind === 1) { rhs = a + 'x + ' + (a * b + cc); ans = 'No solution'; }
      else { const c2 = a + cc; rhs = c2 + 'x + ' + (a * b); ans = 'Exactly one solution'; }
      const sol = { 'Every number': 'After distributing, both sides are identical: ' + a + 'x + ' + a * b + ' = ' + a + 'x + ' + a * b + ' is always true.', 'No solution': 'Distributing gives ' + a + 'x + ' + a * b + ' = ' + a + 'x + ' + (a * b + cc) + '. The x-terms cancel and leave ' + a * b + ' = ' + (a * b + cc) + ', which is false.', 'Exactly one solution': 'Distributing gives ' + a + 'x + ' + a * b + ' = ' + (a + cc) + 'x + ' + a * b + '. The x-terms differ, so x = 0 is the one solution.' }[ans];
      return choice(r, 'How many solutions does ' + lhs + ' = ' + rhs + ' have?', ans, ['Every number', 'No solution', 'Exactly one solution'].filter((z) => z !== ans).concat(['Exactly two solutions']), { s: sol });
    }),
  ],
});
