import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const c = (n) => n.toLocaleString('en-US');
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([v]) => { if (!Number.isInteger(v) || v < 0 || seen.has(String(v))) return false; seen.add(String(v)); return true; }); };
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);
const dsum = (n) => String(n).split('').reduce((a, x) => a + +x, 0);
const perms = (a) => (a.length < 2 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((q) => [x, ...q])));

export default lesson({
  id: 'm4-5-5-divisibility',
  title: 'Divisibility',
  blurb: 'Quick tests that tell you whether a number divides another, and why the tests work.',
  concepts: ['divisibility', 'factors', 'digits'],

  tryFirst: [
    num('t1', 'How many of these numbers are multiples of 5: 35, 52, 70, 105, 88, 250?', 4, {
      h: ['Look at the last digit of each number.'],
      s: '35, 70, 105 and 250 are multiples of 5. 52 and 88 are not. So 4 numbers.',
      w: [['3', 'You missed one. Check 250 and 105 as well.'], ['6', 'Not every number is a multiple of 5. Check the last digits.']],
    }),
    num('t2', 'What is the smallest 3-digit number that both 2 and 5 divide exactly?', 100, {
      h: ['A multiple of 5 ends in 0 or 5. A multiple of 2 ends in an even digit.'],
      s: 'It must end in 0. The smallest 3-digit number that ends in 0 is 100.',
      w: [['102', '5 does not divide 102 exactly. A multiple of 5 ends in 0 or 5.'], ['110', '110 works, but it is not the smallest.']],
    }),
  ],

  learn: [
    p('A number is <b>divisible</b> by 4 when 4 divides it exactly, with remainder 0. Divisibility tests let you decide this without dividing.'),
    def('divisible', 'A number is divisible by another number when dividing leaves remainder 0. 36 is divisible by 4, because 36 = 4 × 9. We also say 36 is a multiple of 4, and 4 is a factor of 36.'),
    def('divisibility test', 'A quick rule that looks at the digits of a number to tell whether it is divisible by a certain number, without doing the division.'),
    rule('<b>Tests for 2, 5 and 10.</b> Look at the last digit. Divisible by 2 if it is 0, 2, 4, 6 or 8. Divisible by 5 if it is 0 or 5. Divisible by 10 if it is 0.'),
    p('Why does the last digit decide? Every number is some tens plus some ones. Tens are always multiples of 2, 5 and 10. So only the ones can change the answer.'),
    rule('<b>Tests for 3 and 9.</b> Add the digits. If the digit sum is divisible by 3, the number is divisible by 3. If the digit sum is divisible by 9, the number is divisible by 9.'),
    ex('Why the digit sum works', ['Take 372. It is 3 hundreds + 7 tens + 2 ones.', '100 = 99 + 1 and 10 = 9 + 1. So 372 = 3 × 99 + 3 + 7 × 9 + 7 + 2.', '99 and 9 are multiples of 9 and of 3. So 372 is a multiple of 3 or 9 exactly when 3 + 7 + 2 = 12 is.', '12 is divisible by 3 but not by 9. So 372 is divisible by 3 only.']),
    widget('divisibility', { n: 7128 }),
    rule('<b>Tests for 4 and 8.</b> For 4, look at the last two digits. For 8, look at the last three digits. This works because 100 is a multiple of 4, and 1,000 is a multiple of 8. Everything before those digits is a multiple.'),
    rule('<b>Test for 6.</b> A number is divisible by 6 when it passes both the test for 2 and the test for 3.'),
    tbl(['Number', 'Test', 'Result'], [['1,236', 'last two digits 36 = 4 × 9', 'divisible by 4'], ['1,236', 'last three digits 236 ÷ 8 = 29 R 4', 'not divisible by 8'], ['1,236', 'digit sum 12', 'divisible by 3, not by 9']], 'Three tests on 1,236'),
    ex('Is 5,418 divisible by 6?', ['Test for 2: the last digit is 8, so yes.', 'Test for 3: 5 + 4 + 1 + 8 = 18, and 18 is divisible by 3. So yes.', 'It passes both tests, so 5,418 is divisible by 6.', 'Check: 6 × 903 = 5,418.']),
    tip('Use the tests to build numbers too. To make the 3-digit number 47□ divisible by 9, the digits so far add to 11, and the next multiple of 9 is 18. So the missing digit is 7, giving 477.'),
    key('You only need part of the number. Use the last digit for 2, 5 and 10, the last two digits for 4, and the last three digits for 8. For 3 and 9, use all the digits, added together.'),
    warn('<b>Watch out.</b> The test for 6 is "divisible by 2 AND by 3". It is not "the digit sum is 6". And passing the test for 4 does not mean passing the test for 8. 12 is divisible by 4 but not by 8.'),
    mcq('Hana says: "1,236 is divisible by 4, so it is also divisible by 8." What is wrong?', ['Nothing. 8 is twice 4.', 'Being divisible by 4 only tells you about the last two digits. For 8 you must check the last three: 236 ÷ 8 leaves 4, so 1,236 is not divisible by 8.', 'You cannot test 1,236 for 4 and 8.'], 1, '1,236 ÷ 8 = 154 R 4. A number that 4 divides can leave a remainder of 0 or 4 when divided by 8.', 'Spot the mistake'),
    recap([['divisible', 'divides with remainder 0'], ['digit sum', 'the sum of all digits; used for 3 and 9'], ['divisibility test', 'a digit rule that avoids dividing']], [['2', 'last digit even'], ['5', 'last digit 0 or 5'], ['10', 'last digit 0'], ['3 and 9', 'digit sum divisible by 3 or 9'], ['4', 'last two digits divisible by 4'], ['8', 'last three digits divisible by 8'], ['6', 'passes the tests for 2 and 3']]),
  ],

  practice: [
    mc('p1', 'Which of these numbers is divisible by 9?', ['3,142', '4,752', '6,251', '5,421'], 1, {
      h: ['Add the digits of each number.'],
      s: '4 + 7 + 5 + 2 = 18, and 18 is divisible by 9. The other digit sums are 10, 14 and 12.',
      w: [[3, 'The digit sum is 12. That is divisible by 3 but not by 9.']],
    }),
    num('p2', 'The digit ■ makes 5,■26 divisible by 3. What is the smallest digit ■ that works?', 2, {
      h: ['The digits add to 5 + 2 + 6 = 13, plus ■.', 'Which total is the first multiple of 3 after 13?'],
      s: '13 + ■ must be a multiple of 3. The first multiple of 3 from 13 is 15, so ■ = 2.',
      w: [['0', '13 is not divisible by 3, so 0 does not work.'], ['1', '13 + 1 = 14, which is not divisible by 3.']],
    }),
    num('p3', 'How many digits ■ make the number 48■ divisible by 4?', 3, {
      h: ['Only the last two digits, 8■, matter.', 'Which of 80, 81, 82, ..., 89 are divisible by 4?'],
      s: '80, 84 and 88 are divisible by 4. So ■ can be 0, 4 or 8. That is 3 digits.',
      w: [['5', 'You counted all even digits. 82 is not divisible by 4 (it leaves remainder 2).'], ['2', 'Check again. 80, 84 and 88 are three numbers.']],
    }),
    num('p4', 'What is the smallest 4-digit number divisible by 2, 3 and 5?', 1020, {
      h: ['Divisible by 2 and 5 means the last digit is 0.', 'The digit sum must be a multiple of 3.'],
      s: 'The last digit is 0. 1,000 has digit sum 1, and 1,010 has 2. 1,020 has digit sum 3. So 1,020.',
      w: [['1000', 'The digit sum of 1,000 is 1. It is not divisible by 3.'], ['1010', 'The digit sum of 1,010 is 2. It is not divisible by 3.']],
    }),
    num('p5', 'What is the smallest digit ■ that makes 3,■12 divisible by 8?', 1, {
      h: ['Look at the last three digits, ■12.', 'Try ■ = 0 first: is 12 divisible by 8?'], 
      s: '012 = 12 is not divisible by 8. 112 ÷ 8 = 14, which is exact. So ■ = 1.',
      w: [['0', '12 ÷ 8 leaves remainder 4.'], ['2', '212 ÷ 8 = 26 R 4. Also, 1 works and is smaller.']],
    }),
    num('p6', 'How many whole numbers from 1 to 100 are divisible by both 4 and 6?', 8, {
      h: ['A number divisible by 4 and 6 is a multiple of 12. Why?', 'List the multiples of 12.'],
      s: 'The smallest number that both 4 and 6 divide is 12. So we count multiples of 12: 12, 24, 36, 48, 60, 72, 84, 96. That is 8.',
      w: [['25', 'That counts every multiple of 4. It also has to be divisible by 6.'], ['16', 'Check again. The numbers must be multiples of 12.']],
    }),
    num('p7', 'A three-digit number starts with 7 and is divisible by 2, 5 and 9. What is it?', 720, {
      h: ['2 and 5 together make the last digit 0.', 'The digit sum must be a multiple of 9.'],
      s: 'The number is 7■0. 7 + ■ + 0 must be a multiple of 9, so ■ = 2. The number is 720. Check: 720 ÷ 9 = 80.',
      w: [['765', '765 is odd, so 2 does not divide it.'], ['700', '7 + 0 + 0 = 7 is not a multiple of 9.']],
    }),
    num('p8', 'Marta makes all six three-digit numbers that use the digits 3, 4 and 5 once each. How many of them are divisible by 6?', 2, {
      h: ['What is the digit sum, and does the order change it?', 'To be even, which digit must go last?'],
      s: 'The digit sum is always 12, so all six are divisible by 3. To be divisible by 2, the last digit must be 4. That gives 354 and 534: 2 numbers.',
      w: [['6', 'All six are divisible by 3, but they also need to be even for 6.'], ['3', 'Only the last digit decides evenness, and only 4 is even. Two numbers end in 4.']],
    }),
  ],

  challenge: [
    chain('The locker code', 'A locker code is the four-digit number 6,5■2.', [
      num('c1a', 'The code is divisible by 9. What is the digit ■?', 5, { h: ['6 + 5 + 2 = 13. What must ■ add to reach a multiple of 9?'], s: '13 + 5 = 18, which is a multiple of 9. So ■ = 5.' }),
      num('c1b', 'What is the remainder when 6,552 is divided by 8?', 0, { h: ['Look at the last three digits.', '552 ÷ 8.'], s: '552 ÷ 8 = 69 exactly, so the remainder is 0.' }),
      num('c1c', 'Look at the numbers 2, 3, 4, 5, 6, 8, 9 and 10. How many of them divide 6,552 exactly?', 6, { h: ['You already know about 9 and 8. Test the rest with the other rules.'], s: '2 yes (ends in 2). 3 yes and 9 yes (digit sum 18). 4 yes and 8 yes (552 = 8 × 69). 6 yes (2 and 3). 5 no and 10 no (ends in 2). That is 6.' }),
    ], 'The idea: one number can pass many tests. Divisible by 8 also means divisible by 4 and by 2. Divisible by 9 also means divisible by 3.'),
    chain('Five digits', 'Use each of the digits 1, 2, 3, 4 and 5 once to make a five-digit number. There are 120 such numbers.', [
      num('c2a', 'What is the digit sum of every one of them?', 15, { h: ['The digits are the same in every number.'], s: '1 + 2 + 3 + 4 + 5 = 15.' }),
      num('c2b', 'How many of the 120 numbers are even?', 48, { h: ['Only the last digit decides. Which digits can go last?', 'After choosing the last digit, the other 4 digits can be arranged in 4 × 3 × 2 × 1 = 24 ways.'], s: 'The last digit is 2 or 4: 2 choices. The other four digits can be placed in 24 ways. 2 × 24 = 48.' }),
      num('c2c', 'How many of the 120 numbers are divisible by 4?', 24, { h: ['The last two digits must make a multiple of 4. Try 12, 24, 32, 52.', 'Each such ending leaves 3 digits to arrange in 3 × 2 × 1 = 6 ways.'], s: 'The last two digits must make a multiple of 4 with no repeated digit: 12, 24, 32 or 52. Each leaves 6 ways to arrange the other three digits. 4 × 6 = 24.' }),
    ], 'The idea: the digit sum stays at 15 for every arrangement, so each number is divisible by 3 but never by 9. Tests that look at the end of a number depend on which digits are put there.'),
    mc('c3', 'Find the error. Tom says: "4,116 is divisible by 8, because the last two digits, 16, are divisible by 8."', ['He is correct.', 'For 8 he must look at the last three digits, not two. 116 is not divisible by 8 (116 ÷ 8 = 14 R 4), so 4,116 is not divisible by 8.', 'He should have added the digits.', '4,116 is not divisible by 4 either.'], 1, {
      s: 'The test for 8 uses three digits: 116 ÷ 8 leaves 4. So 4,116 is not divisible by 8. (It is divisible by 4, since 16 is.)',
      w: [[0, 'Check by dividing: 4,116 ÷ 8 = 514 R 4.'], [3, '16 is divisible by 4, so 4,116 is divisible by 4.']],
    }),
  ],

  quiz: [
    tpl('d3', (r) => {
      const a = r.int(10, 99) * 100 + r.int(10, 99);
      const s0 = dsum(a);
      let d = 0; while ((s0 + d) % 3 !== 0) d++;
      return N('Find the smallest digit ■ that makes ' + a + '■ divisible by 3.', d, { s: 'The digit sum of ' + a + ' is ' + s0 + '. We need ' + s0 + ' + ■ to be a multiple of 3. The smallest ■ is ' + d + '.', w: wr(d, [[(s0 % 3), 'The remainder is ' + (s0 % 3) + ', but ■ must make up the difference to reach a multiple of 3.'], [d + 3, 'That works but is not the smallest.']]) });
    }),
    tpl('d9', (r) => {
      const a = r.int(100, 9999), s0 = dsum(a);
      let d = 0; while ((s0 + d) % 9 !== 0) d++;
      return N('Find the smallest digit ■ that makes ' + c(a) + '■ divisible by 9.', d, { s: 'The digit sum of ' + a + ' is ' + s0 + '. ' + s0 + ' + ■ must be a multiple of 9, so ■ = ' + d + '.', w: wr(d, [[s0 % 9, 'Check: ' + (s0 % 9) + ' is the remainder of the digit sum. You need the amount to reach the next multiple of 9.']]) });
    }),
    tpl('d4', (r) => {
      const t = r.int(1, 9), pre = r.int(1, 99);
      const cnt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => (t * 10 + d) % 4 === 0).length;
      return N('How many digits ■ make ' + pre + t + '■ divisible by 4?', cnt, { s: 'Only the last two digits, ' + t + '■, matter. ' + cnt + ' of ' + t + '0 to ' + t + '9 are divisible by 4.', w: wr(cnt, [[5, 'Not every even digit works. Check each last-two-digit number.'], [cnt + 1, 'Check each number from ' + t + '0 to ' + t + '9 carefully.']]) });
    }),
    tpl('smallest', (r) => {
      const [a, b] = r.pick([[4, 5], [2, 9], [3, 4], [4, 9], [5, 9], [8, 3], [5, 6], [8, 5], [4, 7], [9, 10], [6, 5], [3, 5]]);
      const L = lcm(a, b), K = r.pick([3, 4, 5]), lo = Math.pow(10, K - 1), m = Math.ceil(lo / L) * L;
      return N('What is the smallest ' + K + '-digit number divisible by both ' + a + ' and ' + b + '?', m, { s: 'A number divisible by both ' + a + ' and ' + b + ' is a multiple of ' + L + '. The first multiple of ' + L + ' that has ' + K + ' digits is ' + c(m) + '.', w: wr(m, [[m - L, 'That has fewer than ' + K + ' digits.'], [Math.ceil(lo / (a * b)) * (a * b), 'Use the smallest number that both divide.'], [lo, 'Check whether both ' + a + ' and ' + b + ' divide ' + c(lo) + '.']]) });
    }),
    tpl('count', (r) => {
      const [a, b] = r.pick([[4, 6], [6, 9], [4, 10], [6, 8], [3, 5], [4, 5], [2, 9], [8, 6], [10, 15]]);
      const top = r.pick([100, 120, 150, 200, 240, 300]);
      const L = lcm(a, b), cnt = Math.floor(top / L);
      return N('How many whole numbers from 1 to ' + top + ' are divisible by both ' + a + ' and ' + b + '?', cnt, { s: 'They must be multiples of ' + L + '. There are ' + cnt + ' multiples of ' + L + ' up to ' + top + '.', w: wr(cnt, [[Math.floor(top / a), 'That counts every multiple of ' + a + ' only.'], [Math.floor(top / (a * b)), 'Use the smallest number both divide, not their product.']]) });
    }),
    tpl('which', (r) => {
      const m = r.pick([3, 4, 6, 8, 9]), k = r.int(Math.ceil(1000 / m), Math.floor(9999 / m) - 10), right = m * k;
      const bad = [1, 2, 3, 4, 5, 7].map((x) => right + x).filter((x) => x % m !== 0);
      return choice(r, 'Which of these numbers is divisible by ' + m + '?', c(right), bad.slice(0, 3).map((x) => [c(x), c(x) + ' leaves remainder ' + (x % m) + ' when divided by ' + m + '.']), { s: 'Use the test for ' + m + '. ' + c(right) + ' = ' + m + ' × ' + c(k) + '.' });
    }),
    tpl('perm', (r) => {
      const ds = r.distinct(3, 1, 9), by = r.pick([2, 3, 4, 5, 6]);
      const nums = perms(ds).map((q) => +q.join(''));
      const cnt = nums.filter((x) => x % by === 0).length;
      return N('Make every three-digit number that uses the digits ' + ds.slice().sort((x, y) => x - y).join(', ') + ' once each. How many of the 6 numbers are divisible by ' + by + '?', cnt, { s: 'List the six numbers: ' + nums.slice().sort((x, y) => x - y).join(', ') + '. Check each with the test for ' + by + '. ' + cnt + ' pass.', w: wr(cnt, [[6, 'Not all of them pass the test for ' + by + '.'], [cnt + 1, 'Check each of the six numbers.'], [cnt - 1, 'Check each of the six numbers.']]) });
    }),
    tpl('rem9', (r) => {
      const n = r.int(10000, 99999), rem = n % 9;
      return N('Without long division, find the remainder when ' + c(n) + ' is divided by 9. (Hint: use the digit sum.)', rem, { s: 'The digit sum is ' + dsum(n) + '. A number leaves the same remainder as its digit sum when divided by 9. ' + dsum(n) + ' leaves ' + rem + '.', w: wr(rem, [[dsum(n), 'That is the digit sum. Now divide the digit sum by 9 and take the remainder.']]) });
    }),
  ],
});
