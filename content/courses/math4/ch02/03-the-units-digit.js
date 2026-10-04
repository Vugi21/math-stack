import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));
// units digit of b^e, computed by repeated multiplication
const ud = (b, e) => { let v = 1; for (let i = 0; i < e; i++) v = (v * b) % 10; return v; };

export default lesson({
  id: 'm4-2-3-the-units-digit',
  title: 'The units digit',
  blurb: 'The last digit of a product depends only on the last digits of the factors. Use it to check answers and to find the last digit of huge products.',
  concepts: ['units-digit', 'patterns', 'powers', 'checking'],

  tryFirst: [
    num('t1', 'What is the units digit of 2 × 2 × 2 × 2 × 2? (Multiply them out.)', 2, {
      h: ['2 × 2 = 4, then × 2 = 8, then × 2 = 16, then × 2.'],
      s: '2, 4, 8, 16, 32. The product is 32 and its units digit is 2.',
      w: [['32', '32 is the product. The question asks only for the last digit.']],
    }),
    num('t2', 'Here is a bold claim: the units digit of 384 × 67 is the same as the units digit of 4 × 7. What is that digit?', 8, {
      h: ['4 × 7 = 28.'],
      s: '4 × 7 = 28, so the units digit is 8. (384 × 67 = 25,728. It really ends in 8.)',
      w: [['28', '28 has two digits. Give only the units digit.']],
    }),
  ],

  learn: [
    p('Sometimes you do not need the whole answer to a multiplication. You only need its last digit. That last digit is easy to find, and it is also a quick way to check your work.'),
    def('units digit', 'The last digit of a number. It is the digit in the ones place. In 4,326 the units digit is 6.'),
    p('When you multiply, the units digit of the answer comes only from the units digits of the factors. Everything else lands in the tens place or higher.'),
    rule('<b>Last digit rule.</b> The units digit of a × b is the units digit of (units digit of a) × (units digit of b). For 164 × 73, look at 4 × 3 = 12. The answer ends in 2.'),
    ex('Several factors: 13 × 27 × 19', ['Take the units digits: 3, 7 and 9.', '3 × 7 = 21, units digit 1.', '1 × 9 = 9.', 'The product ends in 9.']),
    tip('<b>Keep only one digit at each step.</b> After every multiplication, throw away all but the last digit and carry on. The numbers stay tiny.'),
    def('cycle', 'A pattern that repeats forever in the same order. When you multiply a number by itself again and again, the units digits of the results form a cycle.'),
    ex('A cycle: multiplying 7 by itself', ['One 7 is 7, units digit 7.', 'Two 7s: 7 × 7 = 49, units digit 9.', 'Three 7s: 49 × 7 = 343, units digit 3. (Just do 9 × 7 = 63.)', 'Four 7s: units digit 3 × 7 = 21, so 1.', 'Five 7s: 1 × 7 = 7. Back to 7. The pattern repeats: 7, 9, 3, 1, 7, 9, 3, 1, ...']),
    tbl(['Number', 'Units digits when you multiply it by itself again and again', 'Cycle length'], [['2', '2, 4, 8, 6, then repeat', '4'], ['3', '3, 9, 7, 1, then repeat', '4'], ['7', '7, 9, 3, 1, then repeat', '4'], ['8', '8, 4, 2, 6, then repeat', '4'], ['4', '4, 6, then repeat', '2'], ['9', '9, 1, then repeat', '2'], ['0, 1, 5, 6', 'the same digit forever', '1']], 'The first entry is one copy of the number, the second is two copies multiplied, and so on'),
    rule('<b>Use the cycle.</b> To find the units digit when 50 threes are multiplied together, ask where 50 lands in the cycle 3, 9, 7, 1. The cycle has length 4. Divide: 50 = 12 × 4 + 2, so the remainder is 2 and we land on the 2nd digit: 9. If the remainder is 0, you land on the <b>last</b> digit of the cycle.'),
    ex('Twenty-eight sevens multiplied together', ['The cycle of 7 is 7, 9, 3, 1. It has length 4.', '28 = 7 × 4. That is exactly 7 full cycles, with nothing left over (remainder 0).', 'Finishing a cycle means we are on its last digit: 1.']),
    ex('Thirteen twos multiplied together', ['The cycle of 2 is 2, 4, 8, 6. It has length 4.', '13 = 3 × 4 + 1. The remainder is 1.', 'The 1st digit of the cycle is 2. The units digit is 2.']),
    warn('<b>Multiplying the count is wrong.</b> When 6 threes are multiplied together, the units digit is not 3 × 6 = 18, so 8. The cycle 3, 9, 7, 1 gives 9. The units digit comes from the cycle, not from multiplying the base by the count.'),
    key('A units-digit check can <b>reject</b> a wrong answer, but it cannot prove an answer is right. If the last digit is wrong, the answer is definitely wrong. If it matches, the answer might still be wrong.'),
    warn('<b>Matching last digits is not proof.</b> Many different numbers share the same last digit. Use the units digit together with an estimate.'),
    mcq('Mo checks 38 × 47 = 1796. He says: "8 × 7 = 56, which ends in 6. 1796 ends in 6. So I am sure it is right." What is wrong with his reasoning?', ['Nothing. Matching units digits proves the answer.', 'Many different numbers end in 6. The check cannot show that 1796 is right. (In fact 38 × 47 = 1786.)', 'He should have used 3 × 4 instead.'], 1, 'The units digit check can only reject answers. 1796 and 1786 both end in 6, but only 1786 is the true product. Pair this check with an estimate.', 'Spot the mistake'),
    recap([['units digit', 'the last digit of a number'], ['cycle', 'a pattern of digits that repeats'], ['remainder', 'what is left after dividing by the cycle length']], [['Last digit rule', 'units digit of the product = units digit of (unit × unit)'], ['Cycle position', 'count ÷ cycle length, use the remainder'], ['Remainder 0', 'last digit of the cycle']]),
  ],

  practice: [
    num('p1', 'What is the units digit of 237 × 58?', 6, {
      h: ['Only the units digits matter: 7 and 8.'],
      s: '7 × 8 = 56, so the units digit is 6.',
      w: [['56', 'That has two digits. Give only the last digit.'], ['4', 'Look at 7 × 8, not 3 × 5 or other digits.']],
    }),
    num('p2', 'Seven 3s are multiplied together: 3 × 3 × 3 × 3 × 3 × 3 × 3. What is the units digit?', 7, {
      h: ['The cycle for 3 is 3, 9, 7, 1.', '7 = 4 + 3, so go three steps into the cycle.'],
      s: 'After 4 threes the product ends in 1. Three more threes: 3, 9, 7. The units digit is 7.',
      w: [['1', '1 is after 4 threes. You need 7 threes, which is 3 more steps.'], ['21', '3 × 7 = 21 is the wrong idea. Use the cycle 3, 9, 7, 1.']],
    }),
    num('p3', 'Twenty 7s are multiplied together. What is the units digit?', 1, {
      h: ['The cycle for 7 is 7, 9, 3, 1.', 'How many full cycles are in 20?'],
      s: '20 = 5 × 4, so we finish a full cycle. The last digit of the cycle is 1.',
      w: [['7', 'You started the next cycle. After a full cycle, we are at 1.']],
    }),
    num('p4', 'Fifty 2s are multiplied together. What is the units digit?', 4, {
      h: ['The cycle for 2 is 2, 4, 8, 6.', '50 = 12 × 4 + 2. How many steps into the cycle is that?'],
      s: '12 full cycles use 48 twos. Two more twos give 2, 4. The units digit is 4.',
      w: [['6', '6 is the end of a full cycle. 50 leaves a remainder of 2, so you are on the second digit.'], ['2', 'There are 2 extra steps after the full cycles, so use the second digit of the cycle.']],
    }),
    num('p5', 'What is the units digit of 3 × 13 × 23 × 33 × 43 × 53?', 9, {
      h: ['Every number ends in 3. How many 3s is that?', 'Now use the cycle for 3.'],
      s: 'There are six numbers ending in 3. Six 3s: 3, 9, 7, 1, 3, 9. The units digit is 9.',
      w: [['1', 'That would be four 3s. There are six.'], ['3', 'That would be only one 3.']],
    }),
    mc('p6', 'Exactly one of these can be 56 × 74. Which one, using only units digits?', ['4142', '4144', '4145', '4146'], 1, {
      h: ['6 × 4 = 24. What is the last digit of the answer?'],
      s: '6 × 4 = 24, so the product must end in 4. Only 4144 does.',
      w: [[0, 'That ends in 2. The product must end in 4.'], [2, 'That ends in 5. The product must end in 4.'], [3, 'That ends in 6. The product must end in 4.']],
    }),
    num('p7', 'For how many whole numbers n from 1 to 40 does 2 multiplied by itself n times end in 6?', 10, {
      h: ['List the first few: n = 1, 2, 3, 4, 5, 6 end in 2, 4, 8, 6, 2, 4.', 'The digit 6 appears in the same spot of every cycle.'],
      s: 'The cycle 2, 4, 8, 6 repeats every 4. The 6 appears at n = 4, 8, 12, ..., 40. That is 10 values.',
      w: [['4', '4 is the first n with a units digit of 6. Count all of them up to 40.'], ['40', 'Only one in every four values of n works.']],
    }),
  ],

  challenge: [
    chain('Nines', 'Multiply 9 by itself again and again. Look at the last digits.', [
      num('c1a', 'What is the units digit of 9 multiplied by itself 3 times (9 × 9 × 9)?', 9, { h: ['9 × 9 = 81. Then 1 × 9.'], s: '9, then 81 (units 1), then 1 × 9 gives units digit 9.' }),
      num('c1b', 'What is the units digit when 9 is multiplied by itself 20 times?', 1, { h: ['The cycle is 9, 1. It has length 2.', 'Even counts land on the second digit.'], s: 'An even number of nines ends in 1. So 20 nines end in 1.' }),
      num('c1c', 'Add these four numbers: 9 multiplied by itself 20 times, 21 times, 22 times and 23 times. What is the units digit of the sum?', 0, { h: ['You know the units digit for 20. What about 21, 22 and 23?', 'Add the four units digits and look at the last digit.'], s: 'The units digits are 1, 9, 1, 9. Their sum is 20, so the sum ends in 0.' }),
    ], 'The idea: when the cycle is short, the exponent only matters as even or odd. And you can add last digits to find the last digit of a sum.'),
    chain('Adding the cycle', 'Look at the numbers 2, then 2 × 2, then 2 × 2 × 2, and so on. Their units digits are 2, 4, 8, 6, 2, 4, 8, 6, ...', [
      num('c2a', 'What do the units digits of the first four numbers add up to?', 20, { h: ['2 + 4 + 8 + 6.'], s: '2 + 4 + 8 + 6 = 20.' }),
      num('c2b', 'Add the first 20 numbers in this list (2, 4, 8, 16, ..., up to 2 multiplied by itself 20 times). What is the units digit of the sum?', 0, { h: ['How many full cycles of 4 are in 20?', 'Each cycle adds 20 to the units digits.'], s: '20 numbers is 5 full cycles. Each cycle sums to 20 in units digits. 5 × 20 = 100, so the sum ends in 0.' }),
      num('c2c', 'Now add the first 22 numbers. What is the units digit of that sum?', 6, { h: ['22 numbers is 5 full cycles and 2 extra.', 'The two extra numbers end in 2 and 4.'], s: 'The 20 numbers add to units 0. The next two end in 2 and 4. 0 + 2 + 4 = 6.' }),
    ], 'The idea: a repeating cycle lets you add up a long list. Count full cycles, then deal with the leftover terms.'),
    mc('c3', 'Find the error. Leo says: "The units digit of 3 multiplied by itself 8 times is 3 × 8 = 24, so it is 4." What is wrong?', ['The units digit comes from the cycle 3, 9, 7, 1. After 8 threes (two full cycles) it is 1.', 'He should have used 3 + 8 = 11, so the digit is 1.', 'Nothing. 4 is correct.', 'The units digit of any power of 3 is 3.'], 0, {
      s: '3, 9, 7, 1 repeats. 8 = 2 × 4 is two full cycles, ending on 1. (Multiplying the base by the count means nothing here.)',
      w: [[2, 'Try it: 3 × 3 × 3 × 3 = 81. After four threes the digit is 1, not 4.'], [3, 'The digit changes: 3, 9, 7, 1.'], [1, 'Adding the base and the count is not a rule either. Use the cycle 3, 9, 7, 1.']],
    }),
  ],

  quiz: [
    tpl('prod', (r) => {
      const a = r.int(102, 987), b = r.int(102, 987);
      const v = ((a % 10) * (b % 10)) % 10;
      return N('What is the units digit of ' + a + ' × ' + b + '?', v, { s: (a % 10) + ' × ' + (b % 10) + ' = ' + (a % 10) * (b % 10) + ', so the units digit is ' + v + '.', w: wr(v, [[(a % 10) * (b % 10), 'Give only the last digit of ' + (a % 10) * (b % 10) + '.'], [(a + b) % 10, 'Multiply the units digits. Do not add them.']]) });
    }),
    tpl('pow', (r) => {
      const b = r.pick([2, 3, 7, 8]), e = r.int(10, 60);
      return N('What is the units digit when ' + b + ' is multiplied by itself ' + e + ' times in a row?', ud(b, e), { s: 'The cycle for ' + b + ' has length 4. ' + e + ' = ' + Math.floor(e / 4) + ' × 4 + ' + (e % 4) + '. That gives ' + ud(b, e) + '.', w: wr(ud(b, e), [[(b * e) % 10, 'Do not multiply the base by the count. Use the cycle.']]) });
    }),
    tpl('pow2', (r) => {
      const b = r.pick([4, 9, 6, 5]), e = r.int(11, 99);
      return N('What is the units digit when ' + b + ' is multiplied by itself ' + e + ' times in a row?', ud(b, e), { s: (b === 5 || b === 6 ? 'A number ending in ' + b + ' times itself always ends in ' + b + '. So the digit is ' + ud(b, e) + '.' : 'The digits of ' + b + ' times itself go ' + b + ', ' + (b === 4 ? 6 : 1) + ', ' + b + ', ' + (b === 4 ? 6 : 1) + ', … An odd count ends in ' + b + ', an even count ends in ' + (b === 4 ? 6 : 1) + '. ' + e + ' is ' + (e % 2 ? 'odd' : 'even') + ', so the digit is ' + ud(b, e) + '.'), w: wr(ud(b, e), [[b, 'Check whether the count is odd or even. It changes the digit for some bases.']].concat(b === 4 || b === 9 ? [[b === 4 ? 6 : 1, 'Look at whether the count is odd or even.']] : [])) });
    }),
    tpl('manyThrees', (r) => {
      const d = r.pick([3, 7, 9]), k = r.int(5, 40);
      return N('A product has ' + k + ' factors, and each factor is a number whose units digit is ' + d + '. What is the units digit of the product?', ud(d, k), { s: 'Only units digits matter, so this is ' + d + ' multiplied by itself ' + k + ' times. The cycle gives ' + ud(d, k) + '.', w: wr(ud(d, k), [[d, 'Use the cycle of ' + d + '. Count how far ' + k + ' goes.']]) });
    }),
    tpl('countN', (r) => {
      const b = r.pick([2, 3, 7, 8]), N0 = r.int(12, 60);
      const dig = r.pick([ud(b, 1), ud(b, 2), ud(b, 3), ud(b, 4)]);
      let c = 0; for (let n = 1; n <= N0; n++) if (ud(b, n) === dig) c++;
      return N('For how many whole numbers n from 1 to ' + N0 + ' does ' + b + ' multiplied by itself n times end in the digit ' + dig + '?', c, { s: 'The digit ' + dig + ' appears once in every cycle of 4. ' + N0 + ' = ' + Math.floor(N0 / 4) + ' × 4 + ' + (N0 % 4) + ', so there are ' + Math.floor(N0 / 4) + ' full cycles' + (N0 % 4 ? ' and ' + (N0 % 4) + ' extra step' + (N0 % 4 > 1 ? 's' : '') : '') + '. Total ' + c + '.', w: wr(c, [[Math.floor(N0 / 4), 'Be careful with the leftover numbers after the last full cycle. The digit may appear in them.'], [Math.ceil(N0 / 4), 'The digit may not appear in the leftover part. Check which positions are left.']]) });
    }),
    tpl('smallest', (r) => {
      const b = r.pick([2, 3, 7, 8, 4, 9]), M = r.int(5, 40);
      const dig = ud(b, r.int(1, 4));
      let n = M + 1;
      while (ud(b, n) !== dig) n++;
      return N('What is the smallest whole number n greater than ' + M + ' for which ' + b + ' multiplied by itself n times ends in ' + dig + '?', n, { s: 'Check each n starting at ' + (M + 1) + ' using the cycle. The first match is n = ' + n + '.', w: wr(n, [[M + 1, 'Check the units digit for n = ' + (M + 1) + '. It may not match.']]) });
    }),
    tpl('could', (r) => {
      const a = r.int(12, 98), b = r.int(12, 98), v = a * b;
      const ks = r.shuffle([1, 2, 3, 4, 6, 7, 8, 9]).slice(0, 3);
      return choice(r, 'Using only units digits, which of these could be ' + a + ' × ' + b + '?', String(v), ks.map((k) => [String(v + k), 'The last digit does not match ' + (a % 10) + ' × ' + (b % 10) + ' = ' + (a % 10) * (b % 10) + '.']), { s: (a % 10) + ' × ' + (b % 10) + ' ends in ' + v % 10 + '. Only ' + v + ' ends in ' + v % 10 + '.' });
    }),
    tpl('sumDigits', (r) => {
      const a = r.pick([2, 3, 7, 8]), b = r.pick([4, 9, 5, 6]), e1 = r.int(11, 40), e2 = r.int(11, 40);
      const v = (ud(a, e1) + ud(b, e2)) % 10;
      return N('What is the units digit of the sum: (' + a + ' multiplied by itself ' + e1 + ' times) + (' + b + ' multiplied by itself ' + e2 + ' times)?', v, { s: 'First units digit ' + ud(a, e1) + ', second ' + ud(b, e2) + '. Sum ' + (ud(a, e1) + ud(b, e2)) + ', so the units digit is ' + v + '.', w: wr(v, [[ud(a, e1) + ud(b, e2), 'Give only the last digit of the sum.']]) });
    }),
  ],
});
