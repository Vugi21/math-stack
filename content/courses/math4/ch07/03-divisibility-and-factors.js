import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a / gcd(a, b)) * b;
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));
const comma = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default lesson({
  id: 'm4-7-3-divisibility-and-factors',
  title: 'Divisibility and factors',
  blurb: 'Use the tests for 2, 3, 4, 5, 6, 9 and 10 to find factors, build numbers, and count multiples.',
  concepts: ['divisibility-tests', 'factors', 'multiples'],

  tryFirst: [
    num('t1', 'The tests are for 2, 3, 4, 5, 6, 9, and 10. How many of these numbers divide 1,350 exactly?', 6, {
      h: ['Test each one. For 3 and 9, add the digits.', 'For 4, look at the last two digits: 50.'],
      s: '1,350 is even, ends in 0, has digit sum 9. So 2, 3, 5, 6, 9, 10 all work. 4 does not, because 50 is not a multiple of 4. That is 6.',
      w: [['7', 'Check 4. The last two digits are 50, and 50 ÷ 4 leaves 2.'], ['5', 'You may have missed one. 6 works if both 2 and 3 work.']],
    }),
    num('t2', 'The number 52_ has a missing last digit. How many digits can go in the blank so that the number is a multiple of 3?', 3, {
      h: ['Add 5 + 2 = 7. What does the blank digit need to add to get a multiple of 3?'],
      s: 'We need 7 + d to be a multiple of 3. d = 2 gives 9, d = 5 gives 12, d = 8 gives 15. So 3 digits: 2, 5, 8.',
      w: [['4', 'Check each digit from 0 to 9. Only digits that make the digit sum 9, 12, or 15 work.'], ['1', 'More than one digit works. The sums 9, 12, and 15 are all multiples of 3.']],
    }),
  ],

  learn: [
    p('You can often tell whether one number divides another without doing the division. The checks are quick, and they let you find factors of big numbers, such as 3,780, in a few seconds.'),
    def('divisible', 'A number is divisible by 3 if 3 is a factor of it. That means dividing by 3 leaves nothing over.'),
    def('divisibility test', 'A quick check on the digits of a number that tells you whether it is divisible by a certain number, without dividing.'),
    tbl(['Divisible by', 'Test'], [['2', 'The last digit is 0, 2, 4, 6, or 8.'], ['5', 'The last digit is 0 or 5.'], ['10', 'The last digit is 0.'], ['3', 'The digits add to a multiple of 3.'], ['9', 'The digits add to a multiple of 9.'], ['4', 'The last two digits make a multiple of 4.'], ['6', 'Divisible by 2 and by 3.']], 'The tests we use'),
    widget('divisibility', { n: 3456 }),
    p('Why does the test for 4 look at two digits? Because 100 is a multiple of 4. Everything before the last two digits is made of hundreds, so it can be ignored.'),
    p('Why does adding digits work for 3 and 9? Each place value, 10, 100, 1,000, is one more than a multiple of 9. So every digit counts only itself when you test for 3 or 9. Add the digits, and the sum has the same remainder as the number.'),
    ex('Find the factors of 3,780 in the list 2, 3, 4, 5, 6, 9, 10', ['Last digit 0: so 2, 5, and 10 work.', 'Digit sum: 3 + 7 + 8 + 0 = 18. 18 is a multiple of 3 and of 9. So 3 and 9 work.', 'Since 2 and 3 both work, 6 works.', 'Last two digits 80. 80 ÷ 4 = 20. So 4 works.', 'All seven of the numbers divide 3,780.']),
    key('Check the <b>last digit</b> for 2, 5 and 10, the <b>last two digits</b> for 4, and the <b>digit sum</b> for 3 and 9.'),
    rule('<b>Combine tests.</b> If a number is divisible by two numbers that share no factor other than 1, it is divisible by their product. Divisible by 4 and by 9 means divisible by 36. Divisible by 2 and by 3 means divisible by 6.'),
    warn('<b>Watch out.</b> Divisible by 4 and 6 does not mean divisible by 24. Take 12: it is divisible by 4 and by 6, but 24 does not go into 12. The numbers 4 and 6 share a factor, 2.'),
    ex('Fill in the missing digit', ['The number 2_5 must be divisible by 9. The known digits add to 2 + 5 = 7.', 'We need 7 plus the missing digit to be a multiple of 9. The next multiple of 9 is 9, so the digit is 2.', 'Check: 225 ÷ 9 = 25. The number 225 works.']),
    p('<b>Patterns in multiples.</b> Count by 3s and mark 3, 6, 9, 12, … Count by 5s and mark 5, 10, 15, … Numbers that are marked twice are multiples of 15. They appear once every 15 numbers.'),
    ex('How many numbers from 1 to 60 are multiples of 3 or 5?', ['Multiples of 3: 60 ÷ 3 = 20.', 'Multiples of 5: 60 ÷ 5 = 12.', 'Multiples of 15 are counted in both lists. There are 60 ÷ 15 = 4.', 'Add the lists and take away the double count: 20 + 12 − 4 = 28.']),
    tip('To test 4, you can halve the last two digits twice. 56 → 28 → 14. You stay on whole numbers, so 56 is a multiple of 4. For 72 → 36 → 18, also yes. For 54 → 27 → 13.5, no.'),
    mcq('Lin says: "7,214 is divisible by 4 because its last digit, 4, is divisible by 4." What is wrong?', ['Nothing, she is right.', 'The test for 4 uses the last two digits, 14, and 14 is not a multiple of 4.', 'The test for 4 uses the digit sum.'], 1, '14 ÷ 4 = 3 remainder 2. So 7,214 leaves remainder 2 when divided by 4.', 'Spot the mistake'),
    recap([['divisible', 'divides with nothing left over'], ['digit sum', 'the digits added together'], ['test for 4', 'last two digits are a multiple of 4'], ['test for 6', 'divisible by 2 and by 3']], [['Test for 3 and 9', 'digit sum is a multiple of 3 or 9'], ['Test for 2, 5, 10', 'look at the last digit'], ['Multiples of 15 up to n', 'n ÷ 15, ignoring any remainder']]),
  ],

  practice: [
    num('p1', 'How many digits d make the number 7d4 divisible by 3?', 3, {
      h: ['7 + 4 = 11. The digit sum needs to be a multiple of 3.', 'Find the d that makes 12, 15, 18, ...'],
      s: 'd = 1 gives 12, d = 4 gives 15, d = 7 gives 18. That is 3 digits.',
      w: [['4', 'd = 10 would make 21, but d must be a single digit.'], ['1', 'More than one digit works. Try 12, 15, and 18.']],
    }),
    num('p2', 'What is the smallest 4-digit number that is a multiple of 9?', 1008, {
      h: ['The smallest 4-digit number is 1000. Its digit sum is 1.', 'What do the digits need to add up to?'],
      s: 'The digit sum must be 9. Start from 1000: the smallest number whose digits add to 9 is 1008.',
      w: [['1009', '1 + 9 = 10, not 9. The sum needs to be 9.'], ['1000', 'The digit sum of 1000 is 1.']],
    }),
    num('p3', 'What is the largest 3-digit multiple of 12?', 996, {
      h: ['12 = 3 × 4. 999 is divisible by 3. Is it divisible by 4?'],
      s: 'Go down from 999: 999 is odd, 998 and 997 are not multiples of 3 (digit sums 26 and 25), and 996 has digit sum 24 and last two digits 96 = 4 × 24. So 996.',
      w: [['999', '999 is odd, so 4 cannot divide it.'], ['990', '990 is a multiple of 6 but 90 is not divisible by 4. Try a larger number.']],
    }),
    num('p4', 'How many digits d make 3d6 divisible by 4?', 5, {
      h: ['Look at the last two digits, d6. Try d = 0, 1, 2, ...'],
      s: '16, 36, 56, 76, 96 are multiples of 4. These are odd d. So 5 digits: 1, 3, 5, 7, 9.',
      w: [['0', 'Try d = 1. 16 ÷ 4 = 4.'], ['10', 'Not every digit works. Check which two-digit endings are multiples of 4.']],
    }),
    num('p5', 'What is the smallest 3-digit number divisible by both 4 and 9?', 108, {
      h: ['Divisible by 4 and 9 means divisible by 36.'],
      s: '36, 72, 108. The first one with 3 digits is 108.',
      w: [['72', '72 has only 2 digits.'], ['100', '100 is divisible by 4 but its digit sum is 1.']],
    }),
    num('p6', 'Use each of the digits 1, 2, 3, 4, 5 once to make a five-digit number that is a multiple of 4. How many such numbers are there?', 24, {
      h: ['The last two digits decide. Which two-digit endings from these digits are multiples of 4?', 'For each ending, the other three digits can be placed in 3 × 2 × 1 ways.'],
      s: 'Endings: 12, 24, 32, 52. That is 4 endings. Each leaves 3 digits to arrange in 6 ways. 4 × 6 = 24.',
      w: [['4', 'That counts the endings. Each ending lets you arrange the other 3 digits.'], ['120', 'That counts all arrangements. Only some of them end in a multiple of 4.']],
    }),
    num('p7', 'How many 2-digit numbers are divisible by 2, 3, and 5 all at the same time?', 3, {
      h: ['Divisible by 2, 3, and 5 means divisible by 30.'],
      s: 'Multiples of 30 with two digits: 30, 60, 90. So 3.',
      w: [['2', 'Do not leave out 90.']],
    }),
  ],

  challenge: [
    chain('Two lights', 'Light A flashes every 3 seconds. Light B flashes every 5 seconds. They flash together at the start. Count the flashes after the start, up to and including second 60.', [
      num('c1a', 'At how many of the seconds from 1 to 60 do A and B flash at the same time?', 4, { h: ['They flash together at multiples of 3 and of 5.'], s: 'Multiples of 15: 15, 30, 45, 60. That is 4.' }),
      num('c1b', 'How many times does A flash but B does not?', 16, { h: ['A flashes 20 times. Take away the times B also flashes.'], s: '20 − 4 = 16.' }),
      num('c1c', 'In how many of the 60 seconds does exactly one of the two lights flash?', 24, { h: ['Add the "A only" times and the "B only" times.', 'B flashes 12 times in total.'], s: 'A only is 16. B only is 12 − 4 = 8. Together 16 + 8 = 24.' }),
    ], 'The idea: multiples of both numbers are counted twice if you just add. Take the double count out.'),
    chain('A hidden digit', 'The four-digit number 62_4 has a missing digit in the tens place. (Its digits are 6, 2, blank, 4.)', [
      num('c2a', 'How many digits make 62_4 a multiple of 3?', 4, { h: ['6 + 2 + 4 = 12. The blank can be 0, 3, 6, or 9.'], s: 'The blank must be a multiple of 3: 0, 3, 6, 9. That is 4.' }),
      num('c2b', 'Which of those also make it a multiple of 4? (Count them.)', 2, { h: ['The digits are 6, 2, blank, 4. The last two digits are the blank and 4.', 'Which of 04, 34, 64, 94 are multiples of 4?'], s: 'Check 04, 34, 64, 94. Only 04 and 64 are multiples of 4. So d = 0 or d = 6: 2 digits.' }),
      num('c2c', 'What is the sum of the numbers that work for both parts?', 12468, { h: ['The numbers are 6204 and 6264.'], s: '6,204 + 6,264 = 12,468.' }),
    ], 'The idea: use one test to list the choices and the next test to cross some out.'),
    mc('c3', 'Find the error. Tom says: "462 is divisible by 4 and by 6, so it is divisible by 24." Which is right?', ['Tom is correct.', 'Tom is wrong: 62 is not divisible by 4, so 462 is not divisible by 4 in the first place.', 'Tom is right that 462 is divisible by 4 and by 6, but wrong that this makes it divisible by 24.', 'Tom is wrong: 24 is prime.'], 1, {
      s: 'The last two digits are 62. 62 ÷ 4 leaves 2. So 462 is not divisible by 4 at all.',
      w: [[2, 'Check the first claim. 462 is not divisible by 4, because 62 ÷ 4 leaves 2.']],
    }),
  ],

  quiz: [
    tpl('blank3', (r) => {
      const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9);
      const cnt = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => (a + b + c + d) % 3 === 0).length;
      return N('How many digits d make the number ' + a + b + 'd' + c + ' a multiple of 3?', cnt, { s: 'The digits other than d add to ' + (a + b + c) + '. Count d from 0 to 9 so that the total is a multiple of 3: ' + cnt + ' digits.', w: keep([[3, 'Check each digit from 0 to 9 against the sum.'], [4, 'Check each digit from 0 to 9 against the sum.']], cnt) });
    }),
    tpl('blank9', (r) => {
      const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9);
      const d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => (a + b + c + x) % 9 === 0);
      const v = d[0], extra = d.length > 1;
      return N('One digit d makes ' + a + 'd' + b + c + ' a multiple of 9' + (extra ? '. Give the smallest such digit.' : '. What is d?'), v, { s: 'The other digits add to ' + (a + b + c) + '. The total must be a multiple of 9, so d = ' + v + '.' });
    }),
    tpl('smallestk', (r) => {
      const m = r.int(6, 45);
      const k = r.pick([3, 4, 5]);
      const lo = Math.pow(10, k - 1);
      const v = Math.ceil(lo / m) * m;
      return N('What is the smallest ' + k + '-digit multiple of ' + m + '?', v, { s: 'Count up from ' + comma(lo) + ' to the first multiple of ' + m + ': ' + comma(v) + '.', w: keep([[v - m, 'That has too few digits.'], [lo, comma(lo) + ' is the smallest ' + k + '-digit number. Is it a multiple of ' + m + '?']], v) });
    }),
    tpl('largest3', (r) => {
      const m = r.int(7, 60);
      const v = Math.floor(999 / m) * m;
      return N('What is the largest 3-digit multiple of ' + m + '?', v, { s: '999 ÷ ' + m + ' is about ' + Math.floor(999 / m) + '. ' + Math.floor(999 / m) + ' × ' + m + ' = ' + v + '.', w: keep([[v + m, 'That has 4 digits.'], [999, '999 is not a multiple of ' + m + '.']], v) });
    }),
    tpl('orcount', (r) => {
      const a = r.pick([2, 3, 4]), b = r.pick([5, 6, 7]), n = r.pick([60, 70, 84, 90, 100, 120]);
      const both = Math.floor(n / lcm(a, b));
      const v = Math.floor(n / a) + Math.floor(n / b) - both;
      return N('How many numbers from 1 to ' + n + ' are multiples of ' + a + ' or ' + b + ' (or both)?', v, { s: Math.floor(n / a) + ' multiples of ' + a + ', ' + Math.floor(n / b) + ' multiples of ' + b + ', and ' + both + ' multiples of ' + lcm(a, b) + ' counted twice. ' + Math.floor(n / a) + ' + ' + Math.floor(n / b) + ' − ' + both + ' = ' + v + '.', w: keep([[Math.floor(n / a) + Math.floor(n / b), 'Some numbers are multiples of both and were counted twice.']], v) });
    }),
    tpl('both', (r) => {
      const a = r.pick([3, 4, 6, 8]), b = r.pick([5, 9, 10, 7, 11]), n = r.int(100, 400);
      const v = Math.floor(n / lcm(a, b));
      return N('How many numbers from 1 to ' + n + ' are multiples of both ' + a + ' and ' + b + '?', v, { s: 'Multiples of both are the multiples of ' + lcm(a, b) + '. ' + n + ' ÷ ' + lcm(a, b) + ' gives ' + v + '.', w: keep([[Math.floor(n / a), 'That counts multiples of ' + a + ' only.'], [Math.floor(n / a * 1) + Math.floor(n / b), 'You must count numbers in both lists.']], v) });
    }),
    tpl('whichdiv', (r) => {
      const m = r.pick([3, 4, 6, 9]);
      const good = m * r.int(40, 160);
      const bads = [];
      let t = 0;
      while (bads.length < 3 && t++ < 100) { const x = good + r.int(1, 9) * (r.bool() ? 1 : -1) + 0; if (x % m !== 0 && x > 99 && !bads.includes(x) && x !== good) bads.push(x); }
      return choice(r, 'Which of these numbers is a multiple of ' + m + '?', String(good), bads.map(String), { s: 'Use the test for ' + m + ': ' + good + ' passes, the others do not.' });
    }),
  ],
});
