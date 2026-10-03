import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const c = (n) => n.toLocaleString('en-US');
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([v]) => { if (!Number.isInteger(v) || v < 0 || seen.has(String(v))) return false; seen.add(String(v)); return true; }); };

export default lesson({
  id: 'm4-5-3-long-division',
  title: 'Long division',
  blurb: 'The long division steps for big numbers, why they work, and how to estimate the answer first.',
  concepts: ['division', 'long-division', 'estimation'],

  tryFirst: [
    num('t1', 'A school has 156 chairs. They are set out in 6 equal rows. How many chairs are in each row?', 26, {
      h: ['Try 10 chairs in each row first. How many chairs does that use?', '10 in each row uses 60. How many are left to place?'],
      s: '10 per row uses 60 chairs. 96 are left. 96 ÷ 6 = 16. So each row has 10 + 16 = 26 chairs.',
      w: [['25', 'Check by multiplying: 6 × 25 = 150, not 156.'], ['260', 'Check: 6 × 260 is far more than 156.']],
    }),
    num('t2', '3,000 ÷ 5 = 600. Use this to find 3,150 ÷ 5.', 630, {
      h: ['3,150 is 3,000 and 150. Divide each part by 5.'],
      s: '3,000 ÷ 5 = 600 and 150 ÷ 5 = 30. So 3,150 ÷ 5 = 630.',
      w: [['600', 'That is only the answer for 3,000. The extra 150 adds more.'], ['615', 'The extra 150 splits into 30 more, not 15.']],
    }),
  ],

  learn: [
    p('Long division shares a big number one place value at a time. Let us find 156 ÷ 6.'),
    ex('156 ÷ 6, step by step', ['Start with the hundreds. There is 1 hundred. We cannot give 6 people a whole hundred each. So look at 15 tens.', '15 tens ÷ 6 = 2 tens, because 6 × 2 = 12. Each person gets 2 tens. 12 tens are used, 3 tens are left over.', '3 tens is 30 ones. Add the 6 ones. Now there are 36 ones.', '36 ones ÷ 6 = 6 ones. Nothing is left. The answer is 2 tens and 6 ones: 26.']),
    widget('arrayModel', { r: 4, c1: 5, c2: 3 }),
    p('This picture is 32 ÷ 4 = 8. The 4 rows are split into two parts, 5 columns and 3 columns. 4 × 5 = 20 and 4 × 3 = 12. So 32 = 20 + 12, and 32 ÷ 4 = 5 + 3. Splitting the dividend into easy parts is the idea behind long division.'),
    rule('<b>Each step has four moves.</b> Divide. Multiply. Subtract. Bring down the next digit. Then repeat. After each subtraction, the number left must be smaller than the divisor. If it is not, your quotient digit was too small.'),
    ex('A bigger one: 4,208 ÷ 4', ['4 thousands ÷ 4 = 1 thousand. Multiply: 4. Subtract: 0.', 'Bring down 2 hundreds. 2 ÷ 4 = 0 hundreds. Write 0 in the quotient.', 'Bring down 0 tens: now we have 20 tens. 20 ÷ 4 = 5 tens. Multiply: 20. Subtract: 0.', 'Bring down 8 ones. 8 ÷ 4 = 2.', 'The quotient is 1,052.']),
    warn('<b>Watch out for zeros.</b> If a step cannot be divided, you must still write 0 in the quotient. 4,208 ÷ 4 is 1,052. Writing 152 would leave out a place.'),
    p('<b>Two-digit divisors.</b> Use the same four moves. To pick each quotient digit, estimate with friendly numbers. For 1,134 ÷ 18, think 18 is about 20. 113 tens ÷ 18? Try 6: 6 × 18 = 108. That fits, and 113 − 108 = 5 is less than 18.'),
    rule('<b>Estimate first.</b> Round the divisor to a friendly number, and the dividend to match. 6,153 ÷ 29 is about 6,000 ÷ 30 = 200. So the answer is near 200. If you get 20 or 2,000, check again.'),
    p('<b>Always check.</b> Multiply the quotient by the divisor. If you get the dividend back, the division is right. 18 × 63 = 1,134, so 1,134 ÷ 18 = 63.'),
    mcq('Leo divides 3,024 by 3. He writes: "3 ÷ 3 = 1. 0 ÷ 3 = 0. Then 24 ÷ 3 = 8." So he says the answer is 108. What went wrong?', ['Nothing. 108 is correct.', 'He skipped a place. After the 0 for the hundreds, the 2 tens do not make a whole 3, so another 0 is needed. 3,024 ÷ 3 = 1,008.', 'He should have divided 3,024 by 24.'], 1, 'Check by multiplying: 3 × 108 = 324, not 3,024. Every digit of the dividend needs its own quotient digit, including a 0. The answer is 1,008.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 156 ÷ 6.', 26, { h: ['Share the tens first.'], s: '15 tens ÷ 6 = 2 tens, 3 tens left. 36 ones ÷ 6 = 6. The answer is 26.', w: [['25', 'Check by multiplying: 6 × 25 = 150.'], ['206', 'There are 15 tens, so the 2 is in the tens place. No 0 is needed in the middle.']] }),
    num('p2', 'Find 3,468 ÷ 4.', 867, { h: ['3 thousands cannot be shared among 4. Use 34 hundreds instead.'], s: '34 hundreds ÷ 4 = 8 hundreds, 2 left. 26 tens ÷ 4 = 6 tens, 2 left. 28 ones ÷ 4 = 7. The answer is 867.', w: [['807', 'You missed the tens step. 26 tens ÷ 4 gives 6 tens.'], ['86', 'You dropped the ones. 28 ones ÷ 4 = 7.']] }),
    num('p3', 'Find 4,208 ÷ 4.', 1052, { h: ['One quotient digit is a 0.'], s: '1 thousand, 0 hundreds, 5 tens, 2 ones: 1,052.', w: [['152', 'You skipped the hundreds place. 2 hundreds ÷ 4 gives 0 hundreds, so write a 0.'], ['1502', 'The 5 is in the tens place, so the 0 comes before it.']] }),
    num('p4', 'Find 1,134 ÷ 18.', 63, { h: ['18 is close to 20. About how many 20s are in 1,134?', 'Try 6 tens, then see what is left.'], s: '18 × 60 = 1,080. 1,134 − 1,080 = 54. 54 ÷ 18 = 3. So 60 + 3 = 63.', w: [['60', '18 × 60 = 1,080, which leaves 54 more. That is 3 more groups of 18.'], ['630', 'Check: 18 × 630 is much more than 1,134.']] }),
    mc('p5', 'Which is the best estimate for 6,153 ÷ 29?', ['20', '200', '2,000', '90'], 1, {
      h: ['Round 29 to 30 and 6,153 to 6,000.'],
      s: '6,000 ÷ 30 = 200. So the answer is close to 200.',
      w: [[0, 'Check: 20 × 29 is only 580.'], [2, 'Check: 2,000 × 29 is about 58,000.']],
    }),
    num('p6', '1,008 ÷ 7 = 1■4. What digit is ■?', 4, {
      h: ['Do the division.', 'Or multiply: 7 × 144 = ?'],
      s: '1,008 ÷ 7 = 144, so the missing digit is 4. Check: 7 × 144 = 1,008.',
      w: [['0', 'Check: 7 × 104 = 728. Not 1,008.'], ['1', 'Check: 7 × 114 = 798. Not 1,008.']],
    }),
    num('p7', 'A hall has 2,340 chairs in rows of 15. The rows are rearranged into rows of 12. How many MORE rows are there now?', 39, {
      h: ['Find the number of rows both ways.'],
      s: '2,340 ÷ 15 = 156 rows. 2,340 ÷ 12 = 195 rows. 195 − 156 = 39 more rows.',
      w: [['156', 'That is the number of rows before. Find the new number, then subtract.'], ['195', 'That is the new number of rows. The question asks for how many MORE.']],
    }),
    num('p8', 'What is the smallest 4-digit number that 23 divides exactly?', 1012, {
      h: ['1,000 ÷ 23 is a little more than 43.', 'Find the first whole multiple at or above 1,000.'],
      s: '23 × 43 = 989, which has only 3 digits. 23 × 44 = 1,012.',
      w: [['989', '989 has only 3 digits. Go up to the next multiple.'], ['1000', '23 does not divide 1,000 exactly. 23 × 43 = 989.']],
    }),
  ],

  challenge: [
    chain('The school trip', 'A school sends 1,872 students on a trip. Each bus carries 48 students.', [
      num('c1a', 'How many buses are needed?', 39, { h: ['1,872 ÷ 48. Try 40 groups first: 48 × 40 = 1,920. Too many.'], s: '48 × 39 = 1,872. So 39 buses.' }),
      num('c1b', 'Each bus costs $64. What is the total cost, in dollars?', 2496, { h: ['39 × 64. Use 40 × 64 and take one 64 away.'], s: '40 × 64 = 2,560. Take away 64: 2,496.' }),
      num('c1c', 'The class teachers share the $2,496 cost equally among 24 classes. How many dollars does each class pay?', 104, { h: ['2,496 ÷ 24. Try 100 first.'], s: '24 × 100 = 2,400. 96 is left, and 96 ÷ 24 = 4. So 104 dollars.' }),
    ], 'The idea: big divisions break into easy pieces. Take the pieces you know (like 100 groups), then divide what is left.'),
    chain('Two-digit divisors', 'We will look at 7,938 and divide it by two-digit numbers.', [
      num('c2a', 'Estimate: 7,938 ÷ 40 is close to 8,000 ÷ 40. What is 8,000 ÷ 40?', 200, { h: ['Cancel one zero from each.'], s: '8,000 ÷ 40 = 800 ÷ 4 = 200.' }),
      num('c2b', 'Now find 7,938 ÷ 42 exactly.', 189, { h: ['Your estimate says it is close to 200. 42 is a bit more than 40.', 'Try 42 × 190 = 7,980. A bit too much.'], s: '42 × 190 = 7,980 is 42 too many. So 190 − 1 = 189. Check: 42 × 189 = 7,938.' }),
      num('c2c', 'Ten different two-digit numbers divide 7,938 exactly, and 42 is one. What is the largest of them?', 98, { h: ['If 42 × 189 = 7,938, other pairs multiply to 7,938 too. Try dividing 7,938 by 81.'], s: '7,938 ÷ 81 = 98 exactly (81 × 98 = 7,938). So 98 divides it. No bigger two-digit number does.' }),
    ], 'The idea: estimate with friendly numbers first, then correct. A division that works exactly gives you a second one for free: if 42 × 189 = 7,938, then 189 divides it too.'),
    mc('c3', 'Find the error. Hana divides 3,612 by 6. She thinks: "36 hundreds ÷ 6 = 6 hundreds. The 1 ten cannot be shared among 6, so I skip it. Then 12 ones ÷ 6 = 2." She writes the answer 62. What is her mistake?', ['None. The answer is 62.', 'She skipped the tens place without writing a 0. She should write 0 tens, then bring the 1 ten down to make 12 ones. The answer is 602.', 'She should have divided 3,612 by 36.', 'The answer is 6,002.'], 1, {
      s: 'Each place needs a quotient digit, even a 0. 6 hundreds, 0 tens, 2 ones is 602. Check: 6 × 602 = 3,612.',
      w: [[0, 'Check by multiplying: 6 × 62 = 372, not 3,612.'], [3, 'Check: 6 × 6,002 is much bigger than 3,612.']],
    }),
  ],

  quiz: [
    tpl('one3', (r) => {
      const d = r.int(2, 9), q = r.int(100, 999), n = d * q;
      return N('Find ' + c(n) + ' ÷ ' + d + '.', q, { s: 'Check: ' + d + ' × ' + c(q) + ' = ' + c(n) + '.', w: wr(q, [[Math.floor(q / 10), 'Count the digits. The answer here has 3 digits.'], [q + d, 'Check by multiplying.'], [q * 10, 'Check by multiplying.']]) });
    }),
    tpl('one4', (r) => {
      const d = r.int(2, 4), q = r.int(1001, 2490), n = d * q;
      return N('Find ' + c(n) + ' ÷ ' + d + '.', q, { s: 'Check: ' + d + ' × ' + c(q) + ' = ' + c(n) + '.', w: wr(q, [[Math.floor(q / 10), 'Count the digits. Every digit needs a quotient digit.'], [q + d, 'Check by multiplying.']]) });
    }),
    tpl('two2', (r) => {
      const d = r.int(12, 49), q = r.int(12, 99), n = d * q;
      return N('Find ' + c(n) + ' ÷ ' + d + '.', q, { s: 'Check: ' + d + ' × ' + q + ' = ' + c(n) + '.', w: wr(q, [[q + 1, 'Check by multiplying: ' + d + ' × ' + (q + 1) + ' = ' + c(d * (q + 1)) + '.'], [q - 1, 'Check by multiplying: ' + d + ' × ' + (q - 1) + ' = ' + c(d * (q - 1)) + '.'], [q * 10, 'Check by multiplying.']]) });
    }),
    tpl('digits', (r) => {
      const d = r.int(12, 49), q = r.pick([r.int(10, 99), r.int(100, 400), r.int(2, 9)]), n = d * q;
      const k = String(q).length;
      return N('How many digits does the answer to ' + c(n) + ' ÷ ' + d + ' have?', k, { s: 'Estimate first. The answer is near ' + c(q) + ', which has ' + k + ' digit' + (k > 1 ? 's' : '') + '.', w: wr(k, [[k + 1, 'Estimate with friendly numbers to count the digits.'], [k - 1, 'Estimate with friendly numbers to count the digits.']]) });
    }),
    tpl('findd', (r) => {
      const d = r.int(12, 49), q = r.int(12, 60), n = d * q;
      return N(c(n) + ' ÷ ? = ' + q + '. What two-digit number goes in the box?', d, { s: c(n) + ' ÷ ' + q + ' = ' + d + '.', w: wr(d, [[q, 'That is the quotient. We want the divisor.']]) });
    }),
    tpl('rows', (r) => {
      const a = r.pick([12, 15, 16, 18, 20, 24]), b = r.pick([6, 8, 9, 10, 12]);
      if (a === b) return tplRows(r);
      return tplRows(r, a, b);
    }),
    tpl('smallest', (r) => {
      const d = r.int(12, 49), k = r.pick([3, 4]), lo = Math.pow(10, k - 1), m = Math.ceil(lo / d) * d;
      return N('What is the smallest ' + k + '-digit number that ' + d + ' divides exactly?', m, { s: 'Divide ' + c(lo) + ' by ' + d + ' and go up to the next whole number of ' + d + 's. ' + d + ' × ' + (m / d) + ' = ' + c(m) + '.', w: wr(m, [[m - d, 'That is one multiple too small' + (m - d < lo ? ' and it does not have ' + k + ' digits.' : '.')], [lo, c(lo) + ' is not a multiple of ' + d + '']]) });
    }),
    tpl('plusone', (r) => {
      const d = r.int(12, 49), q = r.int(20, 90), n = d * q, add = r.int(1, 3);
      return N(c(n) + ' ÷ ' + d + ' = ' + q + '. Without dividing again, what is ' + c(n + add * d) + ' ÷ ' + d + '?', q + add, { s: c(n + add * d) + ' is ' + add + ' more group' + (add > 1 ? 's' : '') + ' of ' + d + ' than ' + c(n) + ', so the answer is ' + q + ' + ' + add + ' = ' + (q + add) + '.', w: wr(q + add, [[q, 'More has been added, so the quotient grows.'], [q + add * d, 'Each added ' + d + ' makes only 1 more group.']]) });
    }),
  ],
});

function tplRows(r, a = 15, b = 12) {
  const rows = r.int(20, 90) * (a * b / gcd(a, b)) / a; // rows of a
  const total = rows * a;
  const other = total / b;
  const diff = Math.abs(other - rows);
  return N('There are ' + c(total) + ' chairs. First they are set in rows of ' + a + '. Then they are reset in rows of ' + b + '. How many ' + (b < a ? 'more' : 'fewer') + ' rows are there the second time?', diff, { s: c(total) + ' ÷ ' + a + ' = ' + rows + ' rows. ' + c(total) + ' ÷ ' + b + ' = ' + other + ' rows. The difference is ' + diff + '.', w: wr(diff, [[rows, 'That is the first number of rows. Find the second and compare.'], [other, 'That is the second number of rows. Compare with the first.']]) });
}
function gcd(x, y) { return y ? gcd(y, x % y) : x; }
