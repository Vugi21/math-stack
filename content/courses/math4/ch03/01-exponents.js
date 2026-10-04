import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));

export default lesson({
  id: 'm4-3-1-exponents',
  title: 'Exponents',
  blurb: 'A short way to write repeated multiplication, and how fast powers of 2 and 10 grow.',
  concepts: ['exponents', 'powers', 'repeated-multiplication'],

  tryFirst: [
    num('t1', 'Multiply out: 2 × 2 × 2 × 2 × 2.', 32, {
      h: ['Go one step at a time: 2, 4, 8, ...'],
      s: '2 × 2 = 4, × 2 = 8, × 2 = 16, × 2 = 32.',
      w: [['10', 'That is 2 × 5. Here 2 is multiplied by itself five times.'], ['16', 'You stopped one step early. There are five 2s.']],
    }),
    num('t2', 'Here is a short way to write a product: 3^[4] means 3 × 3 × 3 × 3. What number is it?', 81, {
      h: ['3 × 3 = 9. Then × 3. Then × 3 again.'],
      s: '3 × 3 = 9, 9 × 3 = 27, 27 × 3 = 81.',
      w: [['12', 'That is 3 × 4 = 12. 3^[4] means four 3s multiplied together.'], ['27', 'That is 3^[3]. There are four 3s.']],
    }),
  ],

  learn: [
    p('Writing 2 × 2 × 2 × 2 × 2 × 2 × 2 takes a lot of space. We shorten it to 2^[7]. This is called a <b>power</b>.'),
    def('power', 'A short way to write repeated multiplication of the same number. 2^[7] is read "2 to the power of 7" and means seven 2s multiplied together.'),
    def('base', 'The number that is multiplied. In 2^[7] the base is 2.'),
    def('exponent', 'The small raised number. It tells how many copies of the base are multiplied together. In 2^[7] the exponent is 7.'),
    formula('Power', 'b^[n] = b × b × ... × b   (n copies of b)', '2^[7] = 2 × 2 × 2 × 2 × 2 × 2 × 2 = 128. A power with exponent 1 is just the base: 7^[1] = 7.'),
    widget('exponentTiles', { b: 3, e: 2 }),
    p('Try the tiles with exponent 2. A power with exponent 2 is a square: 3^[2] is 3 rows of 3. We say "3 squared". A power with exponent 3 is "cubed": 6^[3] = 6 × 6 × 6 = 216.'),
    ex('Evaluate 7^[3]', ['Three 7s are multiplied: 7 × 7 × 7.', 'Do it in steps: 7 × 7 = 49. 49 × 7 = 343.', 'So 7^[3] = 343.']),
    ex('Evaluate 2^[10] by doubling', ['2^[1] = 2.', 'Each time the exponent goes up by 1, the number doubles: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024.', 'So 2^[10] = 1024.']),
    key('Going up one exponent means multiplying by the base once more. For powers of 2 that is doubling. For powers of 10 it adds a zero.'),
    tbl(['Exponent', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['2^[n]', '2', '4', '8', '16', '32', '64', '128', '256', '512', '1024'], ['10^[n]', '10', '100', '1000', '10,000', '100,000', '1,000,000', '10,000,000', '100,000,000', '1,000,000,000', '10,000,000,000']], 'Powers of 2 and powers of 10'),
    rule('<b>Powers of ten.</b> 10^[n] is 1 followed by n zeros. 10^[3] = 1000 has three zeros.'),
    rule('<b>Same base, multiply.</b> When the base stays the same, the exponents add when you multiply: 2^[3] × 2^[4] has three 2s and then four more 2s, which is seven 2s in all: 2^[7]. In the same way 10^[3] × 10^[2] = 10^[5], because 3 zeros and 2 zeros make 5 zeros.'),
    warn('<b>An exponent is not a multiplier.</b> 2^[3] is 2 × 2 × 2 = 8, not 2 × 3 = 6. And 3^[2] is 9, but 2^[3] is 8. The base and exponent cannot swap.'),
    ex('Which is bigger, 2^[5] or 5^[2]?', ['2^[5] = 2 × 2 × 2 × 2 × 2 = 32.', '5^[2] = 5 × 5 = 25.', '32 is bigger than 25, so 2^[5] is bigger.']),
    tip('<b>Learn the powers of 2.</b> 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 turn up all over math and computing. If you forget one, just double the one before it.'),
    tip('<b>Write the multiplication out</b> whenever you are unsure what a power means. Count the copies of the base to check the exponent.'),
    mcq('Ben says: "10^[4] is 40, because 10 × 4 = 40." What is the mistake?', ['Nothing. 40 is right.', 'He multiplied the base by the exponent. 10^[4] = 10 × 10 × 10 × 10 = 10,000.', 'He should have used 10 + 4 = 14.'], 1, 'The exponent counts how many tens are multiplied. Four tens multiplied: 10 × 10 × 10 × 10 = 10,000, which is a 1 with four zeros.', 'Spot the mistake'),
    recap([['power', 'repeated multiplication of one number'], ['base', 'the number being multiplied'], ['exponent', 'how many copies of the base'], ['squared / cubed', 'exponent 2 / exponent 3']], [['Power', 'b^[n] = n copies of b multiplied'], ['Same base, multiply', 'add the exponents'], ['Powers of ten', '10^[n] = 1 followed by n zeros']]),
  ],

  practice: [
    num('p1', 'What is 5^[3]?', 125, {
      h: ['5 × 5 = 25. Then × 5.'],
      s: '5 × 5 × 5 = 25 × 5 = 125.',
      w: [['15', 'That is 5 × 3. The exponent says how many 5s to multiply.'], ['25', 'That is 5^[2]. There are three 5s.']],
    }),
    num('p2', 'What is 2^[8]?', 256, {
      h: ['Double eight times: 2, 4, 8, 16, ...'],
      s: '2, 4, 8, 16, 32, 64, 128, 256.',
      w: [['16', 'That is 2 × 8. Multiply eight 2s.'], ['128', 'That is 2^[7]. Double once more.']],
    }),
    mc('p3', 'Four powers are written below. Which one has the greatest value?', ['2^[6]', '6^[2]', '3^[4]', '4^[3]'], 2, {
      h: ['Work out all four values.'],
      s: '2^[6] = 64. 6^[2] = 36. 3^[4] = 81. 4^[3] = 64. The greatest is 3^[4] = 81.',
      w: [[0, '2^[6] is 64, but another is bigger. Check each.'], [3, '4^[3] is 64. Check 3^[4].']],
    }),
    num('p4', '4^[3] can also be written as 2^[□]. What goes in the box?', 6, {
      h: ['4^[3] = 64. How many 2s multiply to give 64?'],
      s: '4 = 2 × 2, so 4^[3] = (2 × 2) × (2 × 2) × (2 × 2), which is six 2s. 2^[6] = 64.',
      w: [['3', 'That is the exponent of 4. Each 4 is two 2s.'], ['12', 'That multiplies 4 × 3. Count the 2s instead.']],
    }),
    num('p5', 'The number 10^[3] × 10^[4] is written out in full. How many zeros does it have?', 7, {
      h: ['10^[3] × 10^[4] has three tens and four more tens.'],
      s: 'Seven tens multiplied: 10^[7] = 10,000,000. It has seven zeros.',
      w: [['12', 'Do not multiply 3 × 4. The exponents add: 3 + 4.'], ['8', 'That is the number of digits in 10,000,000. The leading 1 is a digit, not a zero.']],
    }),
    num('p6', 'A strip of paper is folded in half again and again. After 8 folds, how many layers are there?', 256, {
      h: ['After 1 fold there are 2 layers. After 2 folds there are 4.', 'Each fold doubles the layers.'],
      s: 'Every fold doubles the layers, so after 8 folds there are 2^[8] = 256 layers.',
      w: [['16', 'That is 2 × 8. Each fold doubles, so multiply eight 2s.'], ['128', 'That is after 7 folds.']],
    }),
    num('p7', 'How much greater is 2^[10] than 10^[3]?', 24, {
      h: ['2^[10] = 1024.', '10^[3] = 1000.'],
      s: '1024 − 1000 = 24.',
      w: [['1024', 'That is 2^[10] itself. Subtract 10^[3].'], ['1000', 'That is 10^[3]. Subtract it from 2^[10].']],
    }),
  ],

  challenge: [
    chain('Doubling coins', 'On day 1 you get 1 cent. Each day after that you get twice as many cents as the day before. So day 2 gives 2 cents, day 3 gives 4 cents.', [
      num('c1a', 'How many cents do you get on day 10?', 512, { h: ['Day 3 is 2^[2]. Day 4 is 2^[3]. What is day 10?'], s: 'Day n gives 2^[n − 1] cents. Day 10 gives 2^[9] = 512.' }),
      num('c1b', 'How many cents have you received altogether after day 10? (Add up all ten days.)', 1023, { h: ['Add 1 + 2 + 4 + 8 + ... + 512.', 'Compare the total with the next doubling after 512, which is 1024.'], s: '1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 = 1023. That is one less than 2^[10].' }),
      num('c1c', 'On which day is the amount for that day first greater than 1000 cents?', 11, { h: ['Day 10 gives 512. What does day 11 give?'], s: 'Day 11 gives 2^[10] = 1024, which is more than 1000. Day 10 gives only 512.' }),
    ], 'The idea: each doubling gives more than all earlier days put together. The total after n days is 2^[n] − 1.'),
    chain('Changing the base', 'Many powers can be rewritten with a smaller base. For example 4 = 2 × 2.', [
      num('c2a', 'Complete: 2^[4] × 2^[3] = 2^[□].', 7, { h: ['Four 2s times three 2s.'], s: 'Four 2s and three more 2s: seven 2s. So 2^[7].' }),
      num('c2b', 'Complete: (2^[3]) × (2^[3]) = 2^[□].', 6, { h: ['That is the same as 8 × 8. How many 2s?'], s: 'Three 2s and three 2s are six 2s: 2^[6] = 64 = 8 × 8.' }),
      num('c2c', 'Find 4^[3] × 8^[2]. Rewrite both with base 2 first.', 4096, { h: ['4^[3] = 2^[6]. What is 8^[2] as a power of 2?', 'Add the exponents, then find the value of that power of 2.'], s: '4^[3] = 2^[6] and 8^[2] = 2^[6]. Together 2^[12] = 4096. Check: 64 × 64 = 4096.' }),
    ], 'The idea: when two powers have the same base, you can add their exponents. If the bases are different, try to rewrite them with a common base.'),
    mc('c3', 'Find the error. Ben says: "2^[3] × 2^[4] = 4^[7], because I multiply the bases and add the exponents." What is wrong?', ['Nothing, he is right.', 'The base stays 2. Seven 2s are multiplied, so the answer is 2^[7] = 128.', 'He should multiply the exponents: 2^[12].', 'The answer is 2^[3] + 2^[4].'], 1, {
      s: '2^[3] × 2^[4] has 3 + 4 = 7 factors of 2, so it is 2^[7] = 128. Check: 8 × 16 = 128. But 4^[7] is 16,384.',
      w: [[2, 'Multiplying exponents counts too many factors. Count the 2s: 3 + 4.'], [0, 'Check by numbers: 8 × 16 = 128, but 4^[7] is much bigger.']],
    }),
  ],

  quiz: [
    tpl('evalPow', (r) => {
      const b = r.int(2, 9), e = r.int(2, 5);
      const v = b ** e;
      return N('What is ' + b + '^[' + e + ']?', v, { s: b + ' is multiplied ' + e + ' times: ' + Array(e).fill(b).join(' × ') + ' = ' + v + '.', w: wr(v, [[b * e, 'The exponent says how many copies of ' + b + ' to multiply. It is not a multiplier.'], [e ** b, 'The base and exponent cannot swap.']]) });
    }),
    tpl('double', (r) => {
      const k = r.int(1, 9), n = r.int(3, 10);
      return N('Start with ' + k + ' and double it ' + n + ' times. What do you get?', k * 2 ** n, { s: 'Doubling ' + n + ' times multiplies by 2^[' + n + '] = ' + 2 ** n + '. ' + k + ' × ' + 2 ** n + ' = ' + k * 2 ** n + '.', w: wr(k * 2 ** n, [[k * 2 * n, 'Doubling several times multiplies by 2 each time. It is not one multiplication by 2 times the count.']]) });
    }),
    tpl('zeros', (r) => {
      const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9);
      return N('The number 10^[' + a + '] × 10^[' + b + '] × 10^[' + c + '] is written out. How many zeros does it have?', a + b + c, { s: 'The exponents add: ' + a + ' + ' + b + ' + ' + c + ' = ' + (a + b + c) + ' tens, so ' + (a + b + c) + ' zeros.', w: wr(a + b + c, [[a * b * c, 'Do not multiply exponents. Add them.']]) });
    }),
    tpl('greatest', (r) => {
      let pick = null;
      for (let t = 0; t < 80 && !pick; t++) {
        const ps = [0, 1, 2, 3].map(() => [r.int(2, 9), r.int(2, 5)]);
        const vs = ps.map(([b, e]) => b ** e);
        if (new Set(vs).size === 4 && new Set(ps.map((x) => x.join())).size === 4) pick = ps;
      }
      if (!pick) pick = [[2, 6], [6, 2], [3, 4], [5, 3]];
      const vs = pick.map(([b, e]) => b ** e), mx = vs.indexOf(Math.max(...vs));
      const tx = ([b, e]) => b + '^[' + e + ']';
      return choice(r, 'Which of these is the greatest?', tx(pick[mx]), pick.filter((_, i) => i !== mx).map((x) => [tx(x), tx(x) + ' = ' + x[0] ** x[1] + ', which is less than ' + Math.max(...vs) + '.']), { s: 'The values are ' + pick.map((x) => tx(x) + ' = ' + x[0] ** x[1]).join(', ') + '. The greatest is ' + tx(pick[mx]) + '.' });
    }),
    tpl('missingExp', (r) => {
      const b = r.pick([2, 3, 4, 5, 6, 7, 8, 9]), e = r.int(2, b <= 3 ? 9 : 4);
      return N(b + '^[□] = ' + b ** e + '. What goes in the box?', e, { s: 'Multiply ' + b + ' repeatedly: ' + Array.from({ length: e }, (_, i) => b ** (i + 1)).join(', ') + '. It takes ' + e + ' copies.', w: wr(e, [[b ** e / b, 'That is the value of the previous power. The question asks how many copies of ' + b + '.']]) });
    }),
    tpl('sameBase', (r) => {
      const pb = r.pick([2, 3, 5]), k = r.pick([2, 3]), a = r.int(1, 7), b = r.int(1, 5);
      return N(pb + '^[' + a + '] × ' + pb ** k + '^[' + b + '] = ' + pb + '^[□]. What goes in the box?', a + k * b, { s: pb ** k + ' = ' + pb + '^[' + k + '], so ' + pb ** k + '^[' + b + '] is ' + k * b + ' copies of ' + pb + '. Together with ' + a + ' cop' + (a === 1 ? 'y' : 'ies') + ': ' + (a + k * b) + '.', w: wr(a + k * b, [[a + b, 'Each ' + pb ** k + ' is ' + k + ' copies of ' + pb + '. Count the ' + pb + 's.'], [a * b * k, 'Add copies, do not multiply them.']]) });
    }),
    tpl('mixed', (r) => {
      const a = r.int(2, 12), b = r.int(2, 5), c = r.int(2, 4);
      return N('What is ' + a + '^[2] + ' + b + '^[' + c + ']?', a * a + b ** c, { s: a + '^[2] = ' + a * a + ' and ' + b + '^[' + c + '] = ' + b ** c + '. Sum ' + (a * a + b ** c) + '.', w: wr(a * a + b ** c, [[a * a + b * c, b + '^[' + c + '] means ' + c + ' copies of ' + b + ' multiplied together, not ' + b + ' × ' + c + '.']]) });
    }),
  ],
});
