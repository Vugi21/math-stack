import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain } from '../../../../src/content/dsl.js';

const c = (n) => n.toLocaleString('en-US');
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([v]) => { if (!Number.isInteger(v) || v < 0 || seen.has(String(v))) return false; seen.add(String(v)); return true; }); };
const P = (k) => Math.pow(10, k);

export default lesson({
  id: 'm4-5-2-dividing-multiples-of-ten',
  title: 'Dividing multiples of ten',
  blurb: 'Dividing tens, hundreds and thousands in your head, and cancelling zeros the right way.',
  concepts: ['division', 'place-value', 'mental-math'],

  tryFirst: [
    num('t1', 'How many $10 bills make $740?', 74, {
      h: ['$740 is how many tens?', 'Think of 740 as 74 tens.'],
      s: '740 is 74 tens. So 740 ÷ 10 = 74 bills.',
      w: [['7', 'That would only be $70. Count how many tens fit in 740.'], ['740', 'Each bill is worth $10, so you need fewer than 740 bills.']],
    }),
    num('t2', 'Which number makes this true? 3,600 ÷ 60 = ?', 60, {
      h: ['3,600 is 36 hundreds. 60 is 6 tens.', 'Try 360 ÷ 6.'],
      s: '3,600 ÷ 60 is the same as 360 ÷ 6. That is 60.',
      w: [['6', 'You divided 36 by 6 but dropped zeros. Check: 6 × 60 = 360, not 3,600.'], ['600', 'Check by multiplying: 600 × 60 is far too big.']],
    }),
  ],

  learn: [
    p('Place value helps us divide in our heads. 560 is 56 tens. 4,800 is 48 hundreds. 9,000 is 9 thousands.'),
    ex('A tens division', ['Find 560 ÷ 7.', '560 is 56 tens.', '56 tens ÷ 7 = 8 tens, because 56 ÷ 7 = 8.', '8 tens is 80. So 560 ÷ 7 = 80.']),
    rule('<b>Divide the front digits, keep the zeros.</b> To find 4,800 ÷ 6, think 48 hundreds ÷ 6 = 8 hundreds. The answer is 800.'),
    p('Dividing a number by 10 takes one zero off the end: 740 ÷ 10 = 74. Dividing by 100 takes two zeros off: 5,300 ÷ 100 = 53.'),
    rule('<b>Cancelling zeros.</b> You may take the same number of zeros off both numbers. 3,600 ÷ 60 becomes 360 ÷ 6, which is 60.'),
    p('Why does this work? Suppose 3,600 pencils go in boxes of 60. Bundle the pencils in tens. Now there are 360 bundles, and each box holds 6 bundles. The number of boxes did not change: 360 ÷ 6 = 60.'),
    tbl(['Problem', 'Cancel zeros', 'Answer'], [['2,000 ÷ 50', '200 ÷ 5', '40'], ['72,000 ÷ 900', '720 ÷ 9', '80'], ['630 ÷ 70', '63 ÷ 7', '9']], 'Cancel the same number of zeros from both'),
    warn('<b>Watch out.</b> Cancel zeros from both numbers, and the same count from each. In 6,000 ÷ 30, cancel one zero from each: 600 ÷ 3 = 200. Do not cancel all three zeros from 6,000 and then forget the zero of 30.'),
    p('After cancelling, count the zeros that remain in the front numbers. They stay in the answer. 4,000 ÷ 8 = 500 because 40 hundreds ÷ 8 = 5 hundreds.'),
    mcq('Ava says: "2,400 ÷ 40 = 6, because 24 ÷ 4 = 6 and the zeros just disappear." What is wrong?', ['Nothing, zeros always disappear.', 'She took off 2 zeros from 2,400 but only 1 from 40. Cancelling one zero each gives 240 ÷ 4 = 60.', 'The answer should be 600.'], 1, 'Check by multiplying: 6 × 40 = 240, not 2,400. The answer is 60, because 60 × 40 = 2,400.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 4,200 ÷ 7.', 600, {
      h: ['4,200 is 42 hundreds.'],
      s: '42 hundreds ÷ 7 = 6 hundreds = 600.',
      w: [['60', '60 × 7 = 420. Look at 4,200 again: it is 42 hundreds.'], ['6', 'Keep the hundreds. 6 × 7 is only 42.']],
    }),
    num('p2', 'Find 8,000 ÷ 40.', 200, {
      h: ['Cancel one zero from each number.'],
      s: '8,000 ÷ 40 = 800 ÷ 4 = 200.',
      w: [['20', 'You took away too many zeros. 20 × 40 = 800, not 8,000.'], ['2000', 'Check: 2,000 × 40 is much more than 8,000.']],
    }),
    num('p3', 'Find 560 ÷ 80.', 7, {
      h: ['Cancel one zero from each.'],
      s: '560 ÷ 80 = 56 ÷ 8 = 7.',
      w: [['70', 'Both numbers lose a zero, so the answer has no extra zero. 70 × 80 is 5,600.']],
    }),
    num('p4', 'How many times can you take 300 away from 9,000 before nothing is left?', 30, {
      h: ['Taking away again and again is division.'],
      s: '9,000 ÷ 300 = 90 ÷ 3 = 30 times.',
      w: [['3', 'Cancel two zeros: 90 ÷ 3 = 30. The 9 of 9,000 is really 90 after cancelling.'], ['300', 'That would take away far too much. Check: 300 × 300 = 90,000.']],
    }),
    num('p5', 'Show tickets cost $30 each. The show took in $7,200 in ticket sales. How many tickets were sold?', 240, {
      h: ['7,200 ÷ 30. Cancel one zero.'],
      s: '7,200 ÷ 30 = 720 ÷ 3 = 240 tickets.',
      w: [['24', 'Check: 24 × 30 = 720, not 7,200.'], ['2400', 'Check: 2,400 × 30 = 72,000. Too big.']],
    }),
    num('p6', 'Find the missing number: 8,100 ÷ ? = 90.', 90, {
      h: ['Think of the fact family: 90 × ? = 8,100.', 'Cancel a zero: 810 = 9 × ?'],
      s: '8,100 ÷ 90 = 810 ÷ 9 = 90. Check: 90 × 90 = 8,100.',
      w: [['9', '9 × 90 is only 810.'], ['900', '900 × 90 is 81,000.']],
    }),
    num('p7', '6,000 ÷ 50 = 120. Without dividing again, what is 6,000 ÷ 500?', 12, {
      h: ['The divisor got 10 times bigger. What happens to the number of groups?'],
      s: 'With bigger groups there are fewer groups. 10 times bigger groups means 10 times fewer: 120 ÷ 10 = 12.',
      w: [['120', 'The divisor changed, so the answer must change.'], ['1200', 'Bigger groups make fewer groups, not more.']],
    }),
    num('p8', 'A number divided by 70 gives 90. The same number is divided by 9. What do you get?', 700, {
      h: ['First find the number. Use 90 × 70.', '90 × 70 = 6,300.'],
      s: 'The number is 90 × 70 = 6,300. Then 6,300 ÷ 9 = 700.',
      w: [['6300', 'That is the number itself. Now divide it by 9.'], ['70', 'Check: 70 × 9 = 630, not 6,300.']],
    }),
  ],

  challenge: [
    chain('The brick yard', 'A yard has 7,200 bricks. They are tied in stacks of 90.', [
      num('c1a', 'How many stacks are there?', 80, { h: ['Cancel one zero from each number.'], s: '7,200 ÷ 90 = 720 ÷ 9 = 80.' }),
      num('c1b', 'What if each stack held 900 bricks? How many stacks would there be?', 8, { h: ['Each group is 10 times bigger.'], s: '7,200 ÷ 900 = 72 ÷ 9 = 8.' }),
      num('c1c', 'The 80 stacks of 90 bricks go onto trucks, 20 stacks to a truck. How many trucks?', 4, { h: ['80 ÷ 20.'], s: '80 ÷ 20 = 8 ÷ 2 = 4 trucks.' }),
    ], 'The idea: when the group size becomes 10 times bigger, the number of groups becomes 10 times smaller. The total never changes.'),
    chain('The big number', 'The number N is 54,000.', [
      num('c2a', 'What is N ÷ 6?', 9000, { h: ['54 thousands ÷ 6.'], s: '54 ÷ 6 = 9, so 54 thousands ÷ 6 = 9 thousands = 9,000.' }),
      num('c2b', 'What is N ÷ 600?', 90, { h: ['Cancel two zeros from each number.'], s: '54,000 ÷ 600 = 540 ÷ 6 = 90.' }),
      num('c2c', 'Look at the numbers 6, 60, 600, 6,000 and 60,000. How many of them divide N exactly (with nothing left over)?', 4, { h: ['Test each: does the quotient come out whole?', 'What is 54,000 ÷ 60,000?'], s: '54,000 ÷ 6 = 9,000, ÷ 60 = 900, ÷ 600 = 90, ÷ 6,000 = 9. But 60,000 is bigger than N. So 4 of them divide N.' }),
    ], 'The idea: each time the divisor gets another zero, the quotient loses one. When the divisor passes the number, it no longer divides.'),
    mc('c3', 'Find the error. Omar says: "45,000 ÷ 900 = 500, because 45 ÷ 9 = 5 and I kept all three zeros."', ['He is correct.', '900 has two zeros, so he should cancel two zeros from each number. 450 ÷ 9 = 50, so the answer is 50.', 'The answer is 5, because zeros do not count.', 'The answer is 5,000.'], 1, {
      s: 'Cancel two zeros from both: 45,000 ÷ 900 = 450 ÷ 9 = 50. Check: 50 × 900 = 45,000.',
      w: [[0, 'Check by multiplying: 500 × 900 = 450,000.'], [2, 'Check: 5 × 900 = 4,500.']],
    }),
  ],

  quiz: [
    tpl('front', (r) => {
      const e = r.int(2, 9), q = r.int(2, 9), k = r.int(1, 3), n = e * q * P(k);
      return N('Find ' + c(n) + ' ÷ ' + e + '.', q * P(k), { s: e * q + ' ÷ ' + e + ' = ' + q + ', and the ' + k + ' zero' + (k > 1 ? 's' : '') + ' stay: ' + c(q * P(k)) + '.', w: wr(q * P(k), [[q * P(k - 1), 'Keep all the zeros of the dividend. ' + c(q * P(k - 1)) + ' × ' + e + ' is not ' + c(n) + '.'], [q * P(k + 1), 'That is too big. Check by multiplying.']]) });
    }),
    tpl('cancel', (r) => {
      const e = r.int(2, 9), q = r.int(2, 9), j = r.int(1, 2), k = r.int(0, 2);
      const n = e * q * P(j + k), d = e * P(j), a = q * P(k);
      return N('Find ' + c(n) + ' ÷ ' + c(d) + '.', a, { s: 'Cancel ' + j + ' zero' + (j > 1 ? 's' : '') + ' from each: ' + c(n / P(j)) + ' ÷ ' + e + ' = ' + c(a) + '.', w: wr(a, [[a * 10, 'Check by multiplying: ' + c(a * 10) + ' × ' + c(d) + ' is too big.'], [a / 10, 'You took off too many zeros. Check by multiplying.'], [q, 'Count the zeros that stay. Check by multiplying.']]) });
    }),
    tpl('missing', (r) => {
      const e = r.int(2, 9), q = r.int(2, 9), j = r.int(1, 2), k = r.int(1, 2);
      const n = e * q * P(j + k), d = e * P(j), a = q * P(k);
      return N(c(n) + ' ÷ ? = ' + c(a) + '. Find the missing number.', d, { s: c(n) + ' ÷ ' + c(a) + ' = ' + c(d) + '. Check: ' + c(d) + ' × ' + c(a) + ' = ' + c(n) + '.', w: wr(d, [[a, 'That is the quotient. We need the divisor.'], [n, 'That is the number being divided.']]) });
    }),
    tpl('tickets', (r) => {
      const price = r.pick([20, 30, 40, 50, 60, 70, 80, 90]), count = r.int(12, 99) * 10;
      const total = price * count, who = name2(r);
      return N(who + ' sells tickets for $' + price + ' each and collects $' + c(total) + '. How many tickets were sold?', count, { s: c(total) + ' ÷ ' + price + ' = ' + c(count) + '.', w: wr(count, [[count / 10, 'You cancelled too many zeros. Check by multiplying.'], [count * 10, 'Check by multiplying: that is too many tickets.']]) });
    }),
    tpl('shift', (r) => {
      const q = r.int(2, 9) * 10 * r.int(2, 9), d = r.pick([20, 30, 40, 50, 60, 70, 80]);
      const x = r.bool();
      const n = q * d;
      return N(c(n) + ' ÷ ' + d + ' = ' + c(q) + '. Without dividing again, what is ' + c(n) + ' ÷ ' + (x ? d * 10 : d / 10 + '') + '?', x ? q / 10 : q * 10, { s: x ? 'The divisor is 10 times bigger, so the quotient is 10 times smaller: ' + c(q / 10) + '.' : 'The divisor is 10 times smaller, so the quotient is 10 times bigger: ' + c(q * 10) + '.', w: wr(x ? q / 10 : q * 10, [[q, 'The divisor changed, so the quotient must change too.'], [x ? q * 10 : q / 10, 'Bigger groups make fewer groups. Smaller groups make more groups.']]) });
    }),
    tpl('twostep', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), d = r.int(2, 9) * 10 > 0 ? r.int(2, 9) : 3;
      const k = a * 10, num2 = a * 10 * b * 10; // num2 divided by a*10 = b*10
      return N('A number divided by ' + k + ' gives ' + b * 10 + '. The same number is divided by ' + a + '. What do you get?', b * 100, { s: 'The number is ' + k + ' × ' + b * 10 + ' = ' + c(num2) + '. Then ' + c(num2) + ' ÷ ' + a + ' = ' + c(b * 100) + '.', w: wr(b * 100, [[num2, 'That is the number itself. Divide it by ' + a + '.'], [b * 10, 'That is the first quotient. Use the number itself.']]) });
    }),
    tpl('count', (r) => {
      const e = r.int(2, 9), q = r.int(2, 9), k = r.int(1, 3), n = e * q * P(k);
      const ds = [0, 1, 2, 3, 4].map((j) => e * P(j));
      const cnt = ds.filter((d) => n % d === 0).length;
      return N('Look at ' + ds.map(c).join('; ') + '. How many of these divide ' + c(n) + ' exactly?', cnt, { s: 'Test each by cancelling zeros. ' + cnt + ' of them give a whole number.', w: wr(cnt, [[5, 'Some of these are too big, or leave a remainder.'], [cnt + 1, 'One of those does not divide exactly. Check each.'], [cnt - 1, 'You missed one that divides exactly. Check each.']]) });
    }),
  ],
});

function name2(r) { return r.pick(['Ava', 'Ben', 'Chloe', 'Dev', 'Elena', 'Farid', 'Grace', 'Hiro']); }
