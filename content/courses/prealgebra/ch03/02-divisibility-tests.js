import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm } from '../../../../src/content/dsl.js';

const ds = (n) => String(n).split('').reduce((a, x) => a + +x, 0);
const fmt = (n) => n.toLocaleString('en-US');

export default lesson({
  id: 'pre-3-2-divisibility-tests',
  title: 'Divisibility tests',
  blurb: 'Quick checks that tell you whether 2, 3, 4, 5, 6, 8, 9, 10 or 11 divides a number, and why they work.',
  concepts: ['divisibility', 'digit-sum', 'place-value'],

  tryFirst: [
    num('t1', 'The number 47? has a missing last digit. What is the smallest digit that makes 47? a multiple of 3?', 1, {
      h: ['You could try 470, 471, 472, ... and divide each by 3. Is there a quicker way?', 'Multiples of 3 have a nice property about their digits. Add up the digits of 12, 15, 18, 21, 24.'],
      s: 'A number is a multiple of 3 when its digit sum is. 4 + 7 = 11, and the next multiple of 3 is 12, so the digit is 1. Check: 471 = 3 × 157.',
      w: [['0', '470: the digits add to 11, which is not a multiple of 3.'], ['4', '474 works too (digit sum 15), but it is not the smallest.']],
    }),
    num('t2', 'What is the smallest 3-digit number that is a multiple of 9?', 108, {
      h: ['The smallest 3-digit number is 100. What is 100 ÷ 9?'],
      s: '9 × 11 = 99 is only 2 digits. 9 × 12 = 108 is the first 3-digit multiple.',
      w: [['99', '99 has only two digits.'], ['100', '100 ÷ 9 leaves a remainder of 1. Which multiple is the first above 100?']],
    }),
  ],

  learn: [
    p('To test whether 1,000,008 is divisible by 8 you could grind through a long division. Or you could look at just a few digits. <b>Divisibility tests</b> are shortcuts that look at the digits instead of dividing the whole number. Try the widget with any number you like.'),
    widget('divisibility', { n: 3456 }),
    tbl(['Divisible by', 'Test'], [['2', 'last digit is 0, 2, 4, 6 or 8'], ['5', 'last digit is 0 or 5'], ['10', 'last digit is 0'], ['4', 'the last <b>two</b> digits make a multiple of 4'], ['8', 'the last <b>three</b> digits make a multiple of 8'], ['3', 'the digit sum is a multiple of 3'], ['9', 'the digit sum is a multiple of 9'], ['6', 'passes both the 2 test and the 3 test'], ['11', 'alternating digit sum (from the right: +, −, +, …) is 0 or a multiple of 11']], 'The tests'),
    rule('<b>Why digit sums work.</b> 10, 100, 1000, … are each exactly one more than a multiple of 9 (9 + 1, 99 + 1, 999 + 1). So a number leaves the same remainder when divided by 9 as its digit sum does. The same is true for 3, because 3 divides 9.'),
    ex('Why 4,521 and 4 + 5 + 2 + 1 are tied together', ['4,521 = 4 × 1000 + 5 × 100 + 2 × 10 + 1.', 'Rewrite: 4 × (999 + 1) + 5 × (99 + 1) + 2 × (9 + 1) + 1.', 'Pull the 9-multiples out: 9 × (4 × 111 + 5 × 11 + 2) + (4 + 5 + 2 + 1).', 'The first part is a multiple of 9. So 4,521 and its digit sum 12 have the same remainder on division by 9 (and by 3): remainder 3 when divided by 9, so it is divisible by 3 but not 9.']),
    ex('Why the last two digits decide 4', ['100 = 4 × 25 is a multiple of 4, so every hundreds, thousands, ... part is a multiple of 4.', 'Only the last two digits can matter. 3,572: the thousands and hundreds make 3,500, a multiple of 4, then check 72 = 4 × 18. Yes!', 'Similarly 1000 = 8 × 125, so for 8 only the last three digits matter.']),
    ex('Using several tests at once', ['Is 7,128 divisible by 6, 8, and 9?', 'Even, so the 2 test passes. Digit sum 7 + 1 + 2 + 8 = 18: passes 3 and 9. So it is divisible by 6 and by 9.', 'For 8: the last three digits are 128 = 8 × 16, so yes.']),
    warn('<b>Watch out.</b> The tests for 4 and 8 look at the last <i>two</i> and last <i>three</i> digits, not just the last one. 314 is even, but 14 is not a multiple of 4, so 314 is not divisible by 4. Also, "divisible by 6" needs both the 2 test and the 3 test, not just one.'),
    mcq('Ben says "314 is divisible by 4 because it ends in 4." What is wrong?', ['Nothing, he is right.', 'For 4 the last <i>two</i> digits matter: 14 is not a multiple of 4, so 314 = 4 × 78 + 2 is not divisible by 4.', 'A number ending in 4 is always divisible by 5.'], 1, 'The test for 4 looks at the last two digits together. 14 ÷ 4 leaves 2, so 314 leaves 2 as well.', 'Spot the mistake'),
  ],

  practice: [
    mc('p1', 'Which of these numbers is divisible by 9?', ['4,517', '4,531', '4,527', '4,539'], 2, {
      h: ['Add the digits of each number.'],
      s: '4 + 5 + 2 + 7 = 18, a multiple of 9. The others have digit sums 17, 13 and 21.',
      w: [[3, '4 + 5 + 3 + 9 = 21, which is a multiple of 3 but not of 9.']],
    }),
    num('p2', 'What digit d makes the number 2d5 divisible by 9?', 2, {
      h: ['The digit sum is 2 + d + 5 = 7 + d. Which d makes it a multiple of 9?'],
      s: '7 + d must be 9 (the next multiple of 9), so d = 2. Check: 225 = 9 × 25.',
      w: [['9', 'd = 9 gives digit sum 16, which is not a multiple of 9.'], ['0', 'd = 0 gives digit sum 7.']],
    }),
    num('p3', 'What is the largest digit d for which the number 3d16 is divisible by 8?', 8, {
      h: ['Only the last three digits matter: d16.', 'Try d = 9, 8, 7, ... and check d16 ÷ 8.'],
      s: '916 ÷ 8 = 114.5 no, 816 ÷ 8 = 102 yes. So d = 8.',
      w: [['9', '916 = 8 × 114 + 4, so that does not work.'], ['6', '616 works, but there is a larger digit that works.']],
    }),
    mc('p4', 'Exactly one of these numbers is divisible by 11. Which one?', ['2,718', '2,738', '2,728', '2,758'], 2, {
      h: ['Alternating digit sum from the right: last digit minus next, plus next, minus first.'],
      s: '2,728: 8 − 2 + 7 − 2 = 11. The others give 12, 10 and 8, so only 2,728 works.',
      w: [[1, '8 − 3 + 7 − 2 = 10, not a multiple of 11.']],
    }),
    num('p5', 'What is the largest 3-digit number that is divisible by both 4 and 9?', 972, {
      h: ['Divisible by 4 and 9 means divisible by 36.', 'How many 36s fit in 999?'],
      s: '999 ÷ 36 = 27.75, so the largest is 36 × 27 = 972. Check: digit sum 18 and the last two digits 72 are a multiple of 4.',
      w: [['999', '999 is not even.'], ['990', '990 is divisible by 9 but not 4 (the 90 at the end).']],
    }),
    num('p6', 'The smallest positive number divisible by both 4 and 6 is 12. Divisibility by 6 and by 4 does not guarantee divisibility by 24. What is the smallest positive number divisible by 4 and 6 but <i>not</i> by 24?', 12, {
      h: ['Is 12 divisible by 24?'],
      s: '12 is divisible by 4 and by 6 but not by 24, so 12 is the answer. (Tests combine only when the divisors share no factor, like 3 and 8.)',
      w: [['24', '24 is divisible by 24, so it is excluded.'], ['1', '1 is not divisible by 4.']],
    }),
    num('p7', 'Take the two-digit number 72 and its reversal 27. Their difference is 45. Now take 83 and 38. What is the difference 83 − 38 divided by 9?', 5, {
      h: ['83 − 38 = 45. Then divide by 9.', 'Try a third pair: 95 − 59 = 36. Notice something?'],
      s: '83 − 38 = 45 and 45 ÷ 9 = 5. In general, 10a + b − (10b + a) = 9(a − b), so the difference of a number and its reversal is always a multiple of 9.',
      w: [['45', 'That is the difference. The question divides it by 9.']],
    }),
  ],

  challenge: [
    chain('Missing digit', 'The three-digit number 25d has a missing last digit d.', [
      set('c1a', 'Which digits d make 25d divisible by 3? Give all of them, separated by commas.', '2,5,8', { h: ['2 + 5 + d must be a multiple of 3: 7 + d.'], s: '7 + d is a multiple of 3 for d = 2 (9), 5 (12), 8 (15).' }),
      set('c1b', 'Which of those digits also make 25d divisible by 2 (so it is divisible by 6)? Give them all.', '2,8', { h: ['It has to be an even digit.'], s: 'Of 2, 5, 8 only 2 and 8 are even.' }),
      num('c1c', 'Which single digit d makes 25d divisible by 12?', 2, { h: ['Divisible by 12 means divisible by 3 and 4. Check the last two digits 5d for the 4 test.'], s: 'From the earlier steps d must be 2 or 8. 52 is a multiple of 4 but 58 is not. So d = 2: 252 = 12 × 21.', w: [['8', '258: 58 is not a multiple of 4.']] }),
    ], 'The idea: stack the tests, each one narrows the candidates until a single digit survives.'),
    chain('Why digit sums work', 'Let us watch the digit-sum trick on a bigger number.', [
      num('c2a', 'What is the remainder when 1,000 is divided by 9?', 1, { h: ['999 is a multiple of 9.'], s: '999 = 9 × 111, so 1,000 leaves 1.' }),
      num('c2b', 'What is the remainder when 5,000 is divided by 9?', 5, { h: ['5 × 1,000 is 5 × (a multiple of 9 plus 1).'], s: '5,000 = 5 × 999 + 5, so it leaves 5.', w: [['1', 'That is the remainder for 1,000. 5,000 is 5 groups of that.']] }),
      num('c2c', 'What is the remainder when 5,342 is divided by 9?', 5, { h: ['Add the digits: 5 + 3 + 4 + 2 = 14. The remainder of 14 is the same.'], s: 'Digit sum 14 leaves remainder 5 when divided by 9, so does 5,342 (5,342 = 9 × 593 + 5).', w: [['14', 'A remainder when dividing by 9 must be less than 9. Divide 14 by 9 once more.']] }),
    ], 'The idea: each place value is a multiple of 9 plus the digit itself, so only the digit sum survives in the remainder.'),
    mc('c3', 'Find the error. Sam says: "5,142 is divisible by 4, because 5 + 1 + 4 + 2 = 12 and 12 is a multiple of 4." What is wrong?', ['Digit sums are the test for 3 and 9. For 4 you need the last two digits: 42 is not a multiple of 4.', 'Nothing, 12 is a multiple of 4.', 'Digit sums only work for 5.', 'He should have used the first two digits.'], 0, {
      s: 'The digit-sum test works for 3 and 9 only. For 4 look at the last two digits: 42 = 4 × 10 + 2, so 5,142 is not divisible by 4.',
      w: [[1, 'The digit sum test applies to 3 and 9 only.'], [3, 'The digits at the end decide 4, not the ones at the start.']],
    }),
  ],

  quiz: [
    tpl('miss3', (r) => { const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9); const n0 = '' + a + b + c; let d = 0; while ((ds(n0) + d) % 3) d++; return N('What is the smallest digit d for which the number ' + n0 + 'd is divisible by 3?', d, { s: 'The digit sum so far is ' + ds(n0) + '; adding d must give a multiple of 3: d = ' + d + '.', w: d + 3 <= 9 ? [[d + 3, 'That digit works too, but it is not the smallest one.']] : [] }); }),
    tpl('miss9', (r) => { const a = r.int(1, 9), b = r.int(1, 9), c = r.int(1, 9); const pre = '' + a + b; let best = -1; for (let d = 0; d <= 9; d++) if ((ds(pre) + d + c) % 9 === 0) best = d; return N('What is the largest digit d for which ' + pre + 'd' + c + ' is divisible by 9?', best, { s: 'The digit sum is ' + (ds(pre) + c) + ' + d; it must be a multiple of 9. The largest digit that works is ' + best + '.', w: [[(best + 1) % 10 === best ? 0 : (best + 1) % 10, 'Check that the digit sum is a multiple of 9: ' + (ds(pre) + c) + ' + that digit is not.']].filter((x) => (ds(pre) + c + x[0]) % 9 !== 0) }); }),
    tpl('which', (r) => { const k = r.pick([3, 4, 6, 8, 9, 11]); const right = k * r.int(Math.ceil(1000 / k), Math.floor(9999 / k)); const wr = new Set(); let g = 0; while (wr.size < 3 && g++ < 500) { const x = right + r.int(-300, 300); if (x >= 1000 && x <= 9999 && x % k !== 0) wr.add(x); } return choice(r, 'Which of these numbers is divisible by ' + k + '?', fmt(right), [...wr].map(fmt), { s: 'Use the test for ' + k + (k === 3 || k === 9 ? ' (digit sum)' : k === 4 ? ' (last two digits)' : k === 8 ? ' (last three digits)' : k === 6 ? ' (even and digit sum divisible by 3)' : ' (alternating sum)') + '. Only ' + fmt(right) + ' passes.' }); }),
    tpl('rem9', (r) => { const n = r.int(1000, 99999); const k = r.pick([3, 9]); return N('Using digit sums, what is the remainder when ' + fmt(n) + ' is divided by ' + k + '?', n % k, { s: 'The digit sum is ' + ds(n) + ', which leaves remainder ' + (n % k) + ' on division by ' + k + '. The number does the same.', w: [[ds(n) % k === ds(n) ? -1 : ds(n), 'The digit sum is not the remainder; divide the digit sum by ' + k + ' too.']].filter((x) => x[0] >= 0 && x[0] !== n % k) }); }),
    tpl('hundreds', (r) => { const a = r.int(1, 9); let t = r.int(0, 9), u = r.int(0, 9), best = -1; for (let g = 0; g < 50 && best < 0; g++) { t = r.int(0, 9); u = r.int(0, 9); for (let d = 0; d <= 9; d++) if ((d * 100 + t * 10 + u) % 8 === 0) best = d; } return N('What is the largest digit d for which ' + a + 'd' + t + u + ' is divisible by 8?', best, { s: 'Only the last three digits, d' + t + u + ', matter. The largest digit that makes a multiple of 8 is ' + best + '.' }); }),
    tpl('big4', (r) => { const k = r.pick([6, 7, 8, 12, 15, 18, 25, 36, 41]) + r.int(0, 4); const n = Math.floor(9999 / k) * k; return N('What is the largest 4-digit number that is a multiple of ' + k + '?', n, { s: '9999 ÷ ' + k + ' = ' + Math.floor(9999 / k) + ' (whole part). ' + k + ' × ' + Math.floor(9999 / k) + ' = ' + n + '.', w: [[9999, '9999 is not a multiple of ' + k + '.']].filter((x) => n !== 9999) }); }),
    tpl('both', (r) => { const pairs = [[4, 9], [3, 8], [5, 6], [4, 11], [8, 9], [6, 5], [9, 11], [4, 3]]; const [a, b] = r.pick(pairs); const lo = r.int(1, 9) * 100, hi = lo + r.int(300, 700); let c = 0; for (let x = lo; x <= hi; x++) if (x % a === 0 && x % b === 0) c++; return N('How many whole numbers from ' + lo + ' to ' + hi + ' (including both ends) are divisible by both ' + a + ' and ' + b + '?', c, { s: 'Being divisible by both ' + a + ' and ' + b + ' means being a multiple of ' + lcm(a, b) + '. There are ' + c + ' of them in the range.' }); }),
    tpl('rev', (r) => { const a = r.int(2, 9), b = r.int(1, a - 1); const n = 10 * a + b, rv = 10 * b + a; return N('Subtract the reversal of ' + n + ' from ' + n + '. That is, find ' + n + ' − ' + rv + '.', n - rv, { s: n + ' − ' + rv + ' = ' + (n - rv) + ' = 9 × ' + (a - b) + '. Differences of this kind are always multiples of 9.' }); }),
  ],
});
