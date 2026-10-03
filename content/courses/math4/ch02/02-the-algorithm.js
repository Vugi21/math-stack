import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));
const rnd10 = (n) => Math.round(n / 10) * 10;

export default lesson({
  id: 'm4-2-2-the-algorithm',
  title: 'The algorithm',
  blurb: 'Multiply large numbers in columns, understand what carrying really does, and check an answer by estimating.',
  concepts: ['multiplication', 'standard-algorithm', 'carrying', 'estimation'],

  tryFirst: [
    num('t1', 'To find 47 × 6, you multiply the ones first: 7 × 6 = 42. You write 2 and carry 4. Next you multiply the tens digit 4 by 6 and add the carry. What number do you get?', 28, {
      h: ['4 tens times 6 is how many tens?', 'The carried 4 is 4 more tens.'],
      s: '4 × 6 = 24 tens. Add the carried 4 tens: 28 tens. So 47 × 6 = 282.',
      w: [['24', 'You forgot to add the carry of 4.'], ['32', 'The carry is added after multiplying, not before. Multiply 4 × 6 first, then add 4.']],
    }),
    num('t2', 'Round 38 and 62 to the nearest ten. Multiply the rounded numbers. What do you get?', 2400, {
      h: ['38 is close to 40. 62 is close to 60.'],
      s: '40 × 60 = 2400. The true product 38 × 62 is close to this.',
      w: [['240', 'Count the zeros. 4 × 6 = 24, and the two zeros from 40 and 60 give 2400.']],
    }),
  ],

  learn: [
    p('The written method for multiplying is just the partial-products idea, stacked in a neat column. Nothing new is happening. It is a short way to write the same boxes.'),
    ex('A 3-digit number times one digit: 346 × 7', ['6 × 7 = 42. Write 2 in the ones place. Carry 4 tens.', '4 × 7 = 28, plus the carried 4 gives 32 tens. Write 2 in the tens place. Carry 3 hundreds.', '3 × 7 = 21, plus the carried 3 gives 24 hundreds. Write 24.', 'The answer is 2422.']),
    rule('<b>Carrying is regrouping.</b> 42 ones is 4 tens and 2 ones. You keep the 2 where it belongs and move the 4 tens to the tens column.'),
    ex('Two digits times two digits: 47 × 36', ['Multiply by the ones digit 6: 47 × 6 = 282.', 'Multiply by the tens digit 3. That is really 30, so 47 × 30 = 1410.', 'The second row ends in a 0. Write that 0 first. It holds the ones place.', 'Add the rows: 282 + 1410 = 1692.']),
    tbl(['Row', 'What it means', 'Value'], [['first', '47 × 6', '282'], ['second', '47 × 30', '1410'], ['sum', '47 × 36', '1692']], 'Two rows are two partial products'),
    warn('<b>Do not skip the place-holder zero.</b> The second row is 47 × 30, not 47 × 3. Without the zero you would add 282 + 141 and get 423. That is much too small.'),
    rule('<b>Check by estimating.</b> Round each number, multiply the rounded numbers, and compare. 47 × 36 is about 50 × 40 = 2000. An answer of 423 or 16,920 is clearly wrong. 1692 is believable.'),
    p('Estimating catches big errors such as a missing zero. It cannot catch small slips like 1692 versus 1693. For those, the next lesson gives a second check.'),
    mcq('Priya works out 52 × 34. She writes 208 for the first row (52 × 4) and 156 for the second row (52 × 3), then adds to get 364. What is the mistake?', ['52 × 4 is not 208.', 'The second row should be 1560, because the 3 in 34 means 30.', 'She should have subtracted the rows.'], 1, 'The 3 is in the tens place, so the row is 52 × 30 = 1560. Then 208 + 1560 = 1768. An estimate, 50 × 30 = 1500, would have shown 364 is far too small.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 428 × 6.', 2568, {
      h: ['6 × 8 = 48. Write 8 and carry 4.', 'Then 2 × 6 plus the carry.'],
      s: '8 × 6 = 48: write 8, carry 4. 2 × 6 = 12, plus 4 is 16: write 6, carry 1. 4 × 6 = 24, plus 1 is 25. Answer 2568.',
      w: [['2528', 'You forgot the carried 4 in the middle step. 2 × 6 = 12, and 12 + 4 = 16.'], ['2468', 'You forgot the carried 1 in the last step. 4 × 6 = 24, and 24 + 1 = 25.']],
    }),
    num('p2', 'Find 63 × 47.', 2961, {
      h: ['63 × 7 is the first row.', 'Then 63 × 40, with a zero in the ones place.'],
      s: '63 × 7 = 441. 63 × 40 = 2520. 441 + 2520 = 2961.',
      w: [['693', 'That is 63 × 7 + 63 × 4. The second row needs 63 × 40 = 2520.'], ['882', 'Do not add 441 to itself. The second row is 63 × 40.']],
    }),
    num('p3', 'In the multiplication □7 × 3 = 141, what digit goes in the box?', 4, {
      h: ['Start at the ones. 7 × 3 = 21. What do you write and carry?', 'Now the tens column must give 14 in total.'],
      s: '7 × 3 = 21: write 1, carry 2. The tens column gives 14, so 3 × □ + 2 = 14. 3 × □ = 12, so □ = 4. Check: 47 × 3 = 141.',
      w: [['3', 'Do not forget the carry of 2 from the ones step.'], ['5', 'Check 57 × 3. It is 171, not 141.']],
    }),
    mc('p4', 'Without doing the full multiplication, which is the only sensible value of 49 × 61?', ['298', '2989', '29,890', '2389'], 1, {
      h: ['Round to 50 × 60. What do you get?', 'Then the units digit: 9 × 1 ends in what?'],
      s: '50 × 60 = 3000. Only 2989 and 2389 are near 3000, and the units digit must be 9 (9 × 1), so 2989.',
      w: [[0, 'Far too small. Round to 50 × 60 = 3000 and compare.'], [2, 'Far too big. Count the digits expected from 50 × 60.'], [3, '49 × 60 is already 2940, so the product must be more than 2940. 2389 is too small.']],
    }),
    num('p5', 'Find 125 × 16.', 2000, {
      h: ['How many 125s make 1000?', 'Or split 16 into 10 and 6.'],
      s: '8 times 125 is 1000. 16 is two 8s, so 2000.',
      w: [['1250', 'That is 125 × 10. Add 125 × 6 = 750.'], ['1000', 'That is 125 × 8. There are two 8s in 16.']],
    }),
    num('p6', 'A 3-digit number times 9 equals 2664. What is the number? Estimate first: 9 × 300 is a little too big.', 296, {
      h: ['9 × 300 = 2700. How far above 2664 is that?', 'The units digit: what times 9 ends in 4?'],
      s: '9 × 300 = 2700, which is 36 too big. 36 is four 9s. So the number is 300 − 4 = 296. Check: 296 × 9 = 2664.',
      w: [['304', '304 is on the wrong side of 300. 9 × 304 = 2736.'], ['297', 'Check 297 × 9 = 2673. That is close but not 2664.']],
    }),
    num('p7', 'The two digits of a two-digit number are the same, like 44 or 88. When it is multiplied by 7 the result is 539. What is the digit?', 7, {
      h: ['The units digit of 539 is 9. Which digit times 7 ends in 9?', 'Check your guess by multiplying.'],
      s: '7 × 7 = 49 ends in 9, so try 77. 77 × 7 = 539. Yes.',
      w: [['3', '3 × 7 = 21, which ends in 1, not 9.'], ['9', '9 × 7 = 63 ends in 3, not 9.']],
    }),
  ],

  challenge: [
    chain('Biggest and smallest', 'Digits can be arranged in many ways. Where each digit goes matters a lot.', [
      num('c1a', 'Use the digits 3, 5 and 8 once each to make a two-digit number and a one-digit number. What is the largest possible product?', 424, { h: ['Try putting the biggest digit in the tens place. Then try the biggest digit as the one-digit number.', 'Compare 83 × 5, 85 × 3, 53 × 8 and 58 × 3.'], s: 'The products are 83 × 5 = 415, 85 × 3 = 255, 53 × 8 = 424, 58 × 3 = 174, 35 × 8 = 280 and 38 × 5 = 190. The largest is 424.' }),
      num('c1b', 'Use the digits 2, 4, 6 and 8 once each in two two-digit numbers. What is the largest possible product?', 5248, { h: ['The two tens digits should be the two biggest digits.', 'Which gets the 8 in the tens place: should the other tens digit go with the 2 or the 4?'], s: 'Tens digits 8 and 6. The two ways are 84 × 62 = 5208 and 82 × 64 = 5248. The larger is 5248.' }),
      num('c1c', 'With the same digits 2, 4, 6 and 8, what is the smallest possible product?', 1248, { h: ['Now the tens digits should be the two smallest digits.', 'Try 26 × 48 and 28 × 46 and 24 × 68.'], s: '26 × 48 = 1248. 28 × 46 = 1288. 24 × 68 = 1632. The smallest is 1248.' }),
    ], 'The idea: big digits belong in high places. To make the product big, pair the biggest tens digit with the smaller ones digit. That makes the two numbers close to each other.'),
    chain('Building from a known product', 'You know that 397 × 8 = 3176.', [
      num('c2a', 'What is 3176 ÷ 8? Use the multiplication fact.', 397, { h: ['If 397 × 8 = 3176, then dividing by 8 undoes it.'], s: 'Division undoes multiplication: 3176 ÷ 8 = 397.' }),
      num('c2b', 'What is 397 × 16?', 6352, { h: ['16 is 2 times 8.', 'Doubling one number doubles the product.'], s: '16 = 8 × 2, so 397 × 16 = 3176 × 2 = 6352.' }),
      num('c2c', 'What is 397 × 17?', 6749, { h: ['17 is one more than 16.', 'Add one more 397 to your last answer.'], s: '6352 + 397 = 6749.' }),
    ], 'The idea: you rarely need to start from scratch. A product you already know can be doubled, or have one more group added.'),
    mc('c3', 'Find the error. Ana works out 506 × 4: "4 × 6 = 24, write 4 and carry 2. 4 × 0 = 0, so write 0. 4 × 5 = 20, so write 20. The answer is 2004." What did she do wrong?', ['She forgot to add the carried 2 to the 0 in the tens place. It should be 2024.', 'She should have written 24 in the ones place.', 'She multiplied 5 by 4 incorrectly.', 'Nothing. 2004 is right.'], 0, {
      s: 'The tens place is 4 × 0 + 2 = 2, not 0. So the answer is 2024. Estimating 500 × 4 = 2000 shows 2004 is possible, so the estimate alone does not catch this slip.',
      w: [[3, 'Check by splitting: 500 × 4 = 2000 and 6 × 4 = 24. Total 2024.'], [1, 'The carry moves to the next place. Only 4 stays in the ones place.']],
    }),
  ],

  quiz: [
    tpl('threeByOne', (r) => {
      const a = r.int(112, 987), b = r.int(3, 9);
      return N('Find ' + a + ' × ' + b + '.', a * b, { s: a + ' × ' + b + ' = ' + a * b + '. Multiply digit by digit and add each carry.', w: wr(a * b, [[a * b - 10 * Math.floor(((a % 10) * b) / 10), 'You forgot the carry from the ones step.']]) });
    }),
    tpl('twoByTwo', (r) => {
      const a = r.int(21, 89); let b = r.int(21, 89); if (b % 10 === 0) b += 3;
      const o = b % 10, t = b - o;
      return N('Find ' + a + ' × ' + b + '.', a * b, { s: 'First row ' + a + ' × ' + o + ' = ' + a * o + '. Second row ' + a + ' × ' + t + ' = ' + a * t + '. Sum ' + a * b + '.', w: wr(a * b, [[a * o + a * t / 10, 'The second row is ' + a + ' × ' + t + ', so it needs the place-holder zero.']]) });
    }),
    tpl('secondRow', (r) => {
      const a = r.int(21, 98), b = r.int(21, 98);
      const t = b - (b % 10);
      return N('In ' + a + ' × ' + b + ', the second row of the column method is ' + a + ' times the tens digit of ' + b + ', with the place-holder zero. What is that row?', a * t, { s: 'The tens digit is ' + t / 10 + ', which stands for ' + t + '. ' + a + ' × ' + t + ' = ' + a * t + '.', w: wr(a * t, [[a * t / 10, 'You forgot the place-holder zero. The row is worth ten times more.']]) });
    }),
    tpl('estimate', (r) => {
      const a = r.int(23, 97), b = r.int(23, 97);
      return N('Round ' + a + ' and ' + b + ' to the nearest ten, then multiply the rounded numbers.', rnd10(a) * rnd10(b), { s: 'Round to ' + rnd10(a) + ' and ' + rnd10(b) + '. Product ' + rnd10(a) * rnd10(b) + '.', w: wr(rnd10(a) * rnd10(b), [[a * b, 'That is the exact product. The question asks for the estimate from the rounded numbers.']]) });
    }),
    tpl('sensible', (r) => {
      const a = r.int(23, 89), b = r.int(23, 89), v = a * b;
      return choice(r, 'Without finishing the work: which is the correct value of ' + a + ' × ' + b + '?', String(v), [[String(v * 10), 'Too big. Round both numbers and estimate.'], [String(Math.round(v / 10)), 'Too small. Estimate first.'], [String(v + r.int(1, 4)), 'Estimate and check the units digit: ' + (a % 10) + ' × ' + (b % 10) + ' ends in ' + ((a % 10) * (b % 10)) % 10 + '.']], { s: 'Round to get a size check, then match the units digit. The answer is ' + v + '.' });
    }),
    tpl('undo', (r) => {
      const n = r.int(112, 498), k = r.int(3, 9);
      return N(n * k + ' ÷ ' + k + ' = ?  (Hint: this is the same as asking which number times ' + k + ' gives ' + n * k + '.)', n, { s: n + ' × ' + k + ' = ' + n * k + ', so the answer is ' + n + '.' });
    }),
    tpl('missingDigit', (r) => {
      const d = r.int(1, 9), u = r.int(2, 9), k = r.int(3, 9);
      const n = 10 * d + u, pr = n * k;
      return N('In the multiplication □' + u + ' × ' + k + ' = ' + pr + ', what digit goes in the box?', d, { s: 'Try ' + n + ' × ' + k + ' = ' + pr + '. The box is ' + d + '.', w: wr(d, [[(d + 1) % 10, 'Check by multiplying: that gives a different product.']]) });
    }),
    tpl('carry', (r) => {
      const n = r.int(12, 99), k = r.int(3, 9);
      const u = n % 10;
      return N('In ' + n + ' × ' + k + ', you multiply the ones first. How many tens do you carry?', Math.floor(u * k / 10), { s: u + ' × ' + k + ' = ' + u * k + '. That is ' + Math.floor(u * k / 10) + ' tens and ' + (u * k) % 10 + ' ones, so you carry ' + Math.floor(u * k / 10) + '.', w: wr(Math.floor(u * k / 10), [[(u * k) % 10, 'That is the digit you write, not the carry.']]) });
    }),
  ],
});
