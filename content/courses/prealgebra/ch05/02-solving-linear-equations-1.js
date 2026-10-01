import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const term = (a, v = 'x') => (a === 1 ? v : a === -1 ? '−' + v : m(a) + v);
const lin = (a, b, v = 'x') => term(a, v) + (b === 0 ? '' : b > 0 ? ' + ' + b : ' − ' + -b);
const val = (v) => { const [n, d] = String(v).split('/'); return d ? Number(n) / Number(d) : Number(n); };
const same = (a, v) => Math.abs(val(a) - val(v)) < 1e-9;
const NN = (q, a, o = {}) => N(q, a, { ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });

export default lesson({
  id: 'pre-5-2-solving-linear-equations-1',
  title: 'Solving linear equations I',
  blurb: 'An equation is a balance. Undo operations one at a time, always doing the same thing to both sides.',
  concepts: ['equations', 'inverse-operations', 'two-step-equations'],

  tryFirst: [
    num('t1', 'I am thinking of a number. I triple it and add 5, and I get 32. What was my number?', 9, {
      h: ['Work backwards from 32.', 'Undo the "add 5" first.'],
      s: 'Before adding 5 the number was 32 − 5 = 27. Before tripling it was 27 ÷ 3 = 9.',
      w: [['37', 'You went forward again. To go backwards, subtract the 5.']],
    }),
    num('t2', 'Solve: x + 9 = 4. What number is x?', -5, {
      h: ['What number must you add to 9 to land on 4?', 'You may need to go below zero.'],
      s: 'Taking 9 away from both sides gives x = 4 − 9 = −5. Check: −5 + 9 = 4.',
      w: [['13', 'You added 9 to 4. To undo "plus 9" you subtract 9.'], ['5', 'The answer is below zero. 4 − 9 is negative.']],
    }),
  ],

  learn: [
    p('An <b>equation</b> is a statement that two expressions have the same value, like 2x + 3 = 11. <b>Solving</b> it means finding the number that x must be so the statement is true. Picture a balance scale: both pans weigh the same, and an equation stays true as long as you keep it balanced.'),
    widget('balanceScale', { a: 2, b: 3, s: 4 }),
    rule('<b>The golden rule of equations.</b> Whatever you do to one side, do the same to the other side. Add the same number, subtract the same number, multiply or divide by the same non-zero number, and the equation stays true.'),
    ex('A two-step equation', ['Solve 3x + 5 = 26.', 'First goal: get the 3x alone. The 5 is added, so subtract 5 from both sides: 3x = 21.', 'Now x is multiplied by 3. Divide both sides by 3: x = 7.', 'Check by plugging in: 3(7) + 5 = 26. It works.']),
    rule('<b>Undo in reverse order.</b> The expression 3x + 5 does "multiply by 3, then add 5". To undo it, undo the last thing done first: subtract 5, then divide by 3. It is like taking off shoes before socks, because you put on socks before shoes.'),
    ex('A fraction and a negative', ['Solve x/4 − 3 = 2.', 'Undo the "−3" by adding 3 to both sides: x/4 = 5.', 'Undo the division by multiplying both sides by 4: x = 20.', 'Next, −2x + 1 = 9. Subtract 1: −2x = 8. Divide by −2 (a negative!): x = −4. Check: −2(−4) + 1 = 9.']),
    tbl(['Operation on x', 'Undo it by'], [['+ 7', 'subtracting 7'], ['− 7', 'adding 7'], ['× 7', 'dividing by 7'], ['÷ 7', 'multiplying by 7']], 'Inverse operations'),
    warn('<b>Do it to both sides, and to the whole side.</b> In 2x + 6 = 14, dividing by 2 means dividing <i>every</i> term: x + 3 = 7. Dividing only the 2x (x + 6 = 7) is wrong. Plugging your answer back in will always catch this.'),
    mcq('Leo solves 2x + 6 = 14. He writes: "divide by 2: x + 6 = 7, so x = 1." What is the real problem?', ['He should have added 2 instead of dividing.', 'Dividing by 2 has to hit every term, including the 6. The solution is x = 4, and x = 1 fails the check: 2(1) + 6 = 8, not 14.', 'The equation has no solution.'], 1, 'Subtract 6 first: 2x = 8, then x = 4. Always test your answer in the original equation.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Solve x + 8 = 3.', -5, {
      h: ['Subtract 8 from both sides.'],
      s: 'x = 3 − 8 = −5. Check: −5 + 8 = 3.',
      w: [['11', 'To undo +8 you subtract 8; you added it instead.'], ['5', 'Watch the sign: 3 − 8 goes below zero.']],
    }),
    num('p2', 'Solve 6x = −42.', -7, {
      h: ['Divide both sides by 6.'],
      s: 'x = −42 ÷ 6 = −7. Check: 6(−7) = −42.',
      w: [['7', 'The sign matters: a positive times 6 cannot give −42.'], ['-36', 'You added 6 to both sides (−42 + 6). Multiplication is undone by division.']],
    }),
    num('p3', 'Solve 3x + 7 = 25.', 6, {
      h: ['Subtract 7 first, then divide.'],
      s: '3x = 25 − 7 = 18, so x = 6. Check: 3(6) + 7 = 25.',
      w: [['18', 'That is 3x. You still have to divide by 3.'], ['32/3', 'To undo +7 subtract it. You added 7 to 25.']],
    }),
    num('p4', 'Solve x/5 − 2 = 4.', 30, {
      h: ['Add 2 to both sides first.', 'Then undo the division by 5.'],
      s: 'x/5 = 6, so x = 6 × 5 = 30. Check: 30/5 − 2 = 4.',
      w: [['6', 'That is x/5. You still need to multiply by 5.'], ['6/5', 'Dividing by 5 undoes multiplication. Here x was divided by 5, so multiply.']],
    }),
    num('p5', 'Solve 5 = 2x − 9. (The x is on the right side. That is fine: an equation reads the same backwards.)', 7, {
      h: ['Add 9 to both sides.'],
      s: '14 = 2x, so x = 7. Check: 2(7) − 9 = 5.',
      w: [['-2', 'To undo −9 you add 9. Subtracting made it −4.'], ['14', 'That is 2x. Divide by 2.']],
    }),
    num('p6', 'Solve −4x + 3 = 19.', -4, {
      h: ['Subtract 3 first.', 'Dividing by −4 gives a sign change.'],
      s: '−4x = 16, so x = 16 ÷ (−4) = −4. Check: −4(−4) + 3 = 19.',
      w: [['4', 'Check the sign: −4 × 4 + 3 = −13. You need a negative x so that −4x is positive.'], ['-22/4', 'You added 3. To undo +3 subtract it.']],
    }),
    num('p7', 'The equation 4x + □ = 31 has the solution x = 6. What number goes in the box? (You are given the answer; find the missing piece.)', 7, {
      h: ['Put x = 6 into the left side.', '4 × 6 = 24.'],
      s: '4(6) + □ = 31, so 24 + □ = 31 and □ = 7.',
      w: [['25', 'You subtracted 6 only. First work out 4 × 6 = 24, then see what must be added to reach 31.'], ['5', '31 − 24 is 7, not 5.']],
    }),
  ],

  challenge: [
    chain('Taxi fare', 'A taxi charges a $5 pickup fee plus $3 for each kilometre.', [
      mc('c1a', 'Which expression gives the fare for k kilometres?', ['3k + 5', '5k + 3', '8k', '3(k + 5)'], 0, { h: ['What happens once and what happens every kilometre?'], s: 'The $5 is paid once and $3 is paid per km: 3k + 5.' }),
      num('c1b', 'Dev paid $38. How many kilometres did he ride?', 11, { h: ['Solve 3k + 5 = 38.'], s: '3k = 33 and k = 11.' }),
      num('c1c', 'On a round trip of 2 × 11 km the driver charges the pickup fee only once. What is the total?', 71, { h: ['22 km at $3, plus one pickup fee.'], s: '3 × 22 + 5 = 71.' }),
    ], 'The idea: the same expression answers "how much for this many?" and, by undoing it, "how many for this much?"'),
    chain('Undoing the trick', 'Mia thinks of a number n, multiplies it by 4, subtracts 9, and gets 27.', [
      num('c2a', 'What was her number right before she subtracted 9?', 36, { h: ['Undo the subtraction.'], s: '27 + 9 = 36.' }),
      num('c2b', 'What was n?', 9, { h: ['Undo the multiplication by 4.'], s: '36 ÷ 4 = 9.' }),
      num('c2c', 'Mia does the same trick again, but starts with n = −2. What does she get?', -17, { h: ['Now go forward: multiply, then subtract.'], s: '4(−2) − 9 = −8 − 9 = −17.' }),
    ], 'The idea: to undo a chain of steps, reverse it. The last step done is the first to undo.'),
    mc('c3', 'Find the error. Zoe solves 3x − 4 = 11 like this: "3x = 11 − 4 = 7, so x = 7/3." What did she do wrong?', ['She should have added 4 to both sides: 3x = 15, so x = 5.', 'Nothing, 7/3 is correct.', 'She should have divided 11 by 3 first and then subtracted.', 'She should have multiplied by 3.'], 0, {
      s: 'To undo −4 you add 4: 3x = 15, x = 5. Check: 3(5) − 4 = 11.',
      w: [[1, 'Check 3(7/3) − 4 = 7 − 4 = 3, not 11.'], [2, 'Dividing 11 by 3 only is the same mistake as dividing a single term. Divide the whole side after the 4 is removed.']],
    }),
  ],

  quiz: [
    tpl('add', (r) => {
      const x = r.nz(-20, 20), a = r.nz(-15, 15), c = x + a;
      return NN('Solve x ' + (a > 0 ? '+ ' + a : '− ' + -a) + ' = ' + m(c) + '.', x, { s: (a > 0 ? 'Subtract ' + a : 'Add ' + -a) + ' on both sides: x = ' + m(c) + (a > 0 ? ' − ' + a : ' + ' + -a) + ' = ' + m(x) + '.', w: [[c + a, 'You moved the wrong way. Undo addition by subtracting, and undo subtraction by adding.']] });
    }),
    tpl('mul', (r) => {
      const a = r.int(2, 12), x = r.nz(-12, 12), c = a * x;
      return NN('Solve ' + a + 'x = ' + m(c) + '.', x, { s: 'Divide both sides by ' + a + ': x = ' + m(c) + ' ÷ ' + a + ' = ' + m(x) + '.', w: [[c - a, 'Multiplication is undone by dividing, not subtracting.'], [-x, 'Check the sign of your answer.']] });
    }),
    tpl('two', (r) => {
      const a = r.int(2, 9), x = r.nz(-9, 12), b = r.nz(-15, 15), c = a * x + b;
      return NN('Solve ' + lin(a, b) + ' = ' + m(c) + '.', x, { s: (b > 0 ? 'Subtract ' + b : 'Add ' + -b) + ': ' + a + 'x = ' + m(a * x) + '. Divide by ' + a + ': x = ' + m(x) + '.', w: [[a * x, 'That is ' + a + 'x. Divide by ' + a + ' to finish.'], [(c + b) + '/' + a, 'The ' + m(b) + ' must be undone in the opposite direction: ' + (b > 0 ? 'subtract it' : 'add it') + '.']] });
    }),
    tpl('neg', (r) => {
      const a = r.int(2, 9), x = r.nz(-9, 9), b = r.nz(-12, 12), c = -a * x + b;
      return NN('Solve −' + a + 'x ' + (b > 0 ? '+ ' + b : '− ' + -b) + ' = ' + m(c) + '.', x, { s: (b > 0 ? 'Subtract ' + b : 'Add ' + -b) + ': −' + a + 'x = ' + m(-a * x) + '. Divide by −' + a + ': x = ' + m(x) + '.', w: [[-x, 'Dividing by a negative number flips the sign: −' + a + 'x = ' + m(-a * x) + ' means x = ' + m(x) + '.']] });
    }),
    tpl('frac', (r) => {
      const a = r.int(2, 9), x = a * r.nz(-9, 12), b = r.nz(-10, 10), c = x / a + b;
      return NN('Solve x/' + a + (b > 0 ? ' + ' + b : ' − ' + -b) + ' = ' + m(c) + '.', x, { s: (b > 0 ? 'Subtract ' + b : 'Add ' + -b) + ': x/' + a + ' = ' + m(x / a) + '. Multiply by ' + a + ': x = ' + m(x) + '.', w: [[x / a, 'That is x ÷ ' + a + '. Multiply by ' + a + ' to get x.']] });
    }),
    tpl('flip', (r) => {
      const a = r.int(2, 9), x = r.nz(-8, 12), b = r.nz(-14, 14), c = a * x + b;
      return NN(m(c) + ' = ' + lin(a, b) + '. Find x.', x, { s: 'The equation reads the same flipped: ' + lin(a, b) + ' = ' + m(c) + '. Undo ' + m(b) + ', then divide by ' + a + ': x = ' + m(x) + '.', w: [[(c + b) + '/' + a, 'Undo the ' + (b > 0 ? 'addition by subtracting' : 'subtraction by adding') + '.']] });
    }),
    tpl('story', (r) => {
      const x = r.int(2, 20), a = r.int(2, 8), b = r.int(2, 30), c = a * x + b;
      return NN(name(r) + ' thinks of a number, multiplies it by ' + a + ', then adds ' + b + '. The result is ' + c + '. What is the number?', x, { s: 'Work backwards: ' + c + ' − ' + b + ' = ' + (c - b) + ', then ' + (c - b) + ' ÷ ' + a + ' = ' + x + '.', w: [[c - b, 'That is the number after multiplying. Undo the multiplication too.']] });
    }),
    tpl('which', (r) => {
      const a = r.int(2, 8), x = r.int(2, 12), b = r.int(2, 12), c = a * x + b;
      const wr = [...new Set([c - b, (c + b) / a, a + x + b, x + 1, x - 1].filter((v) => Number.isInteger(v) && v !== x))].slice(0, 3);
      while (wr.length < 3) wr.push(x + 2 + wr.length * 3);
      return choice(r, 'Which value of x makes ' + a + 'x + ' + b + ' = ' + c + ' true?', String(x), wr.map(String), { s: 'Test each choice. ' + a + '(' + x + ') + ' + b + ' = ' + c + '.' });
    }),
  ],
});
