import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));

export default lesson({
  id: 'm4-2-1-one-part-at-a-time',
  title: 'One part at a time',
  blurb: 'Break a big multiplication into small pieces, multiply each piece, and add the results.',
  concepts: ['multiplication', 'partial-products', 'distributive-property', 'mental-math'],

  tryFirst: [
    num('t1', 'A hall has 14 rows of 25 chairs. How many chairs are there? Try splitting 14 into 10 and 4.', 350, {
      h: ['How many chairs are in 10 rows?', 'Now find the chairs in the other 4 rows, and add.'],
      s: '10 rows hold 250 chairs. 4 rows hold 100 chairs. 250 + 100 = 350.',
      w: [['100', 'That is only the 4 extra rows. The first 10 rows count too.'], ['250', 'That is only the first 10 rows. Add the other 4 rows.']],
    }),
    num('t2', 'Find 99 × 7 without the usual written method. Hint: 99 is very close to a friendly number.', 693, {
      h: ['What is 100 × 7?', '99 is one less than 100. So you took one 7 too many.'],
      s: '100 × 7 = 700. But 99 is one 7 less than 100, so subtract 7: 693.',
      w: [['707', 'You added 7 when you should take 7 away. 99 is less than 100.'], ['700', '100 × 7 is 700, but we want 99 sevens, one fewer.']],
    }),
  ],

  learn: [
    p('A big multiplication is easier in pieces. Split one number into parts. Multiply each part. Add the results. Each result is a <b>partial product</b>.'),
    p('Look at 6 rows of dots. Split the columns into a left group and a right group. The whole picture has the same dots as the two groups together.'),
    widget('arrayModel', { r: 6, c1: 7, c2: 3 }),
    rule('<b>Split and add.</b> a × (b + c) = a × b + a × c. You may split either number into any parts you like. The answer does not change.'),
    ex('Split one number: 7 × 38', ['Split 38 into 30 and 8.', '7 × 30 = 210.', '7 × 8 = 56.', 'Add: 210 + 56 = 266.']),
    p('Split both numbers and you get a rectangle cut into four boxes. This is an <b>area model</b>. Each box is one partial product. The whole rectangle is the answer.'),
    tbl(['23 × 46', '40', '6'], [['20', '20 × 40 = 800', '20 × 6 = 120'], ['3', '3 × 40 = 120', '3 × 6 = 18']], 'Add all four boxes: 800 + 120 + 120 + 18 = 1058'),
    warn('<b>Four boxes, four products.</b> When both numbers have two digits, there are four partial products. Skipping the two "cross" boxes is the most common mistake. 20 × 40 + 3 × 6 is not 23 × 46.'),
    ex('Choose smart parts: 48 × 25', ['25 × 4 = 100, so 25 is friendly with 4.', 'Halve 48 and double 25 does not change the product: 24 × 50.', 'Do it again: 12 × 100.', 'The answer is 1200.']),
    rule('<b>Halve and double.</b> If you halve one number and double the other, the product stays the same. Use it to make one number friendly, like 10, 50 or 100.'),
    mcq('Priya says: "To find 6 × 47, I do 6 × 40 and 6 × 7. That gives 240 + 42 = 282." Is that right?', ['No. You cannot split 47.', 'Yes. 47 = 40 + 7, and each part is multiplied by 6.', 'No. You should do 6 × 4 and 6 × 7.'], 1, '47 is 40 and 7 together, so 47 sixes is 40 sixes and 7 sixes. 240 + 42 = 282. Doing 6 × 4 would only count 4 tens as 4 ones.', 'Check the split'),
  ],

  practice: [
    num('p1', 'Find 37 × 6 by splitting 37 into 30 and 7.', 222, {
      h: ['What is 30 × 6?', 'What is 7 × 6?'],
      s: '30 × 6 = 180. 7 × 6 = 42. 180 + 42 = 222.',
      w: [['180', 'That is only 30 × 6. The 7 also needs to be multiplied by 6.'], ['42', 'That is only 7 × 6. Add 30 × 6 as well.']],
    }),
    num('p2', 'Fill in the blank: 18 × 15 = 18 × 10 + 18 × □.', 5, {
      h: ['Split 15 into 10 and something.'],
      s: '15 = 10 + 5, so the blank is 5. (18 × 15 = 180 + 90 = 270.)',
      w: [['90', '90 is the value of 18 × 5. The blank asks for the number that 18 is multiplied by.']],
    }),
    num('p3', 'A rectangle is 32 units by 45 units. Cut it into four boxes by splitting 32 = 30 + 2 and 45 = 40 + 5. What is the area of the smallest box?', 10, {
      h: ['The smallest box uses the two small parts.'],
      s: 'The small parts are 2 and 5. The box is 2 × 5 = 10.',
      w: [['1200', 'That is the biggest box, 30 × 40. We want the smallest.']],
    }),
    num('p4', 'Find 25 × 36. Think about 25 and 4.', 900, {
      h: ['36 = 4 × 9.', '25 × 4 = 100.'],
      s: '25 × 36 = 25 × 4 × 9 = 100 × 9 = 900.',
      w: [['700', 'Check 25 × 30 = 750 and 25 × 6 = 150. Add them.'], ['90', 'Do not lose the zeros: 100 × 9 is 900.']],
    }),
    num('p5', 'Find 998 × 5 using 1000.', 4990, {
      h: ['What is 1000 × 5?', '998 is 2 less than 1000. So take away 2 fives.'],
      s: '1000 × 5 = 5000. Remove 2 fives, which is 10: 4990.',
      w: [['4998', 'You took away only 2. But 2 groups of 5 are missing, so take away 10.'], ['4900', 'Take away 2 × 5 = 10, not 100.']],
    }),
    num('p6', 'You know 46 × 37 = 1702. Use this to find 46 × 38 without redoing the whole multiplication.', 1748, {
      h: ['38 is 37 + 1.', 'How many more 46s are there in 46 × 38 than in 46 × 37?'],
      s: '46 × 38 is one more group of 46 than 46 × 37. 1702 + 46 = 1748.',
      w: [['1703', 'One more group of 46 means adding 46, not 1.'], ['1738', 'Check the addition: 1702 + 46 = 1748.']],
    }),
    num('p7', 'Find 77 × 13. Split 13 into 10 and 3.', 1001, {
      h: ['77 × 10 = 770.', '77 × 3 = 231.'],
      s: '770 + 231 = 1001.',
      w: [['770', 'That is only 77 × 10. Add 77 × 3 as well.'], ['1010', 'Check 77 × 3. It is 231, not 240.']],
    }),
  ],

  challenge: [
    chain('Twenty-fives', 'Multiplying by 25 is quick when you think of quarters of 100.', [
      num('c1a', 'What is 16 × 25?', 400, { h: ['4 twenty-fives make 100.', 'How many groups of 4 are in 16?'], s: '16 has four groups of 4. Each group of 4 twenty-fives is 100. So 400.' }),
      num('c1b', 'What is 48 × 25?', 1200, { h: ['Use the same idea. How many groups of 4 are in 48?'], s: '48 = 12 groups of 4. 12 × 100 = 1200.' }),
      num('c1c', 'What is 48 × 75? Remember 75 is three 25s.', 3600, { h: ['You already know 48 × 25.', '75 = 25 × 3.'], s: '48 × 75 = 48 × 25 × 3 = 1200 × 3 = 3600.' }),
    ], 'The idea: 25 times a number is a quarter of that number, times 100. And 75 is just three 25s, so you can reuse the answer.'),
    chain('Around fifty', 'A square of side 50 has area 2500. What about rectangles that are close to it?', [
      num('c2a', 'What is 50 × 50?', 2500, { h: ['5 × 5 = 25, then add two zeros.'], s: '5 × 5 = 25 and two zeros: 2500.' }),
      num('c2b', 'A rectangle is 49 by 51. Split 51 as 50 + 1 and find 49 × 51.', 2499, { h: ['49 × 50 = 2450.', 'Then add one more 49.'], s: '49 × 50 = 2450. Add 49: 2499.' }),
      num('c2c', 'What is 47 × 53? Compare it with 50 × 50.', 2491, { h: ['47 is 3 less than 50 and 53 is 3 more.', 'For 49 × 51 the answer was 1 less than 2500. For 48 × 52 it is 4 less. What is the pattern?'], s: 'Moving 3 each way takes 3 × 3 = 9 away from 2500. 2500 − 9 = 2491. Check: 47 × 53 = 47 × 50 + 47 × 3 = 2350 + 141 = 2491.' }),
    ], 'The idea: two numbers the same distance from 50, on opposite sides, multiply to 2500 minus the square of that distance.'),
    mc('c3', 'Find the error. Dev says: "24 × 36 = 20 × 30 + 4 × 6 = 600 + 24 = 624." What went wrong?', ['He should have added 20 + 30 and 4 + 6 first.', 'He made only two boxes. A two-digit by two-digit product needs four boxes: 20 × 30, 20 × 6, 4 × 30 and 4 × 6.', 'Nothing. The answer 624 is correct.', 'He cannot split 24.'], 1, {
      s: 'The four boxes are 600, 120, 120 and 24. They add to 864.',
      w: [[2, 'Check with 25 × 36 = 900. 24 × 36 must be 36 less than that: 864.'], [0, 'Adding the parts would give a sum, not a product.']],
    }),
  ],

  quiz: [
    tpl('split1', (r) => {
      let a = r.int(12, 98); const b = r.int(3, 9); if (a % 10 === 0) a += 3;
      const t = Math.floor(a / 10) * 10, o = a - t;
      return N('Find ' + a + ' × ' + b + '.', a * b, { s: a + ' = ' + t + ' + ' + o + '. ' + t + ' × ' + b + ' = ' + t * b + ' and ' + o + ' × ' + b + ' = ' + o * b + '. Total ' + a * b + '.', w: wr(a * b, [[t * b, 'That is only the tens part. Add ' + o + ' × ' + b + '.'], [t * b + o, 'The ones part ' + o + ' must be multiplied by ' + b + ' too.']]) });
    }),
    tpl('split2', (r) => {
      let a = r.int(12, 59), b = r.int(12, 59); if (a % 10 === 0) a += 3; if (b % 10 === 0) b += 3;
      const ta = Math.floor(a / 10) * 10, tb = Math.floor(b / 10) * 10, oa = a - ta, ob = b - tb;
      return N('Find ' + a + ' × ' + b + '.', a * b, { s: 'Four boxes: ' + ta * tb + ', ' + ta * ob + ', ' + oa * tb + ', ' + oa * ob + '. Total ' + a * b + '.', w: wr(a * b, [[ta * tb + oa * ob, 'You skipped the two cross boxes ' + ta + ' × ' + ob + ' and ' + oa + ' × ' + tb + '.']]) });
    }),
    tpl('near', (r) => {
      const n = r.int(12, 89), k = r.pick([99, 101, 999, 1001]);
      const ref = k > 500 ? 1000 : 100;
      const d = k - ref;
      return N('Find ' + n + ' × ' + k + '.', n * k, { s: n + ' × ' + ref + ' = ' + n * ref + '. ' + (d < 0 ? 'Subtract ' + n + ' once' : 'Add ' + n + ' once') + ': ' + n * k + '.', w: wr(n * k, [[n * ref, 'You must also correct for the 1 that ' + k + ' differs from ' + ref + '.'], [n * ref - d * n * 2, 'Check the direction. ' + k + ' is ' + (d < 0 ? 'less' : 'more') + ' than ' + ref + '.']]) });
    }),
    tpl('half', (r) => {
      const a = r.int(2, 40) * 4;
      return N('Find ' + a + ' × 25.', a * 25, { s: a + ' has ' + a / 4 + ' groups of 4. Each group makes 100. Total ' + a * 25 + '.', w: wr(a * 25, [[a / 4, 'Each group of 4 gives 100, not 1.'], [a * 20 + 5, 'Do not multiply by 20 and add 5. Use 25 four at a time.']]) });
    }),
    tpl('related', (r) => {
      const a = r.int(12, 49), b = r.int(12, 49), k = r.int(1, 4);
      const down = r.bool();
      const q = down ? a + ' × ' + b + ' = ' + a * b + '. What is ' + a + ' × ' + (b - k) + '?' : a + ' × ' + b + ' = ' + a * b + '. What is ' + a + ' × ' + (b + k) + '?';
      const v = down ? a * (b - k) : a * (b + k);
      return N(q, v, { s: 'The new product has ' + k + ' ' + (down ? 'fewer' : 'more') + ' group' + (k > 1 ? 's' : '') + ' of ' + a + ', which is ' + k * a + '. So ' + v + '.', w: wr(v, [[down ? a * b - k : a * b + k, 'Each group is ' + a + ' big. Change by ' + k + ' × ' + a + ', not by ' + k + '.']]) });
    }),
    tpl('pair100', (r) => {
      const a = r.int(3, 9), x = r.int(11, 89);
      return N('Find ' + a + ' × ' + x + ' + ' + a + ' × ' + (100 - x) + '.', a * 100, { s: 'Both parts have ' + a + ' as a factor. ' + a + ' × (' + x + ' + ' + (100 - x) + ') = ' + a + ' × 100 = ' + a * 100 + '.', w: wr(a * 100, [[a * 10, 'The two numbers that are multiplied by ' + a + ' add up to 100. So the total is ' + a + ' × 100.']]) });
    }),
    tpl('which', (r) => {
      const a = r.int(2, 9) * 10 + r.int(2, 9), b = r.int(2, 9) * 10 + r.int(2, 9);
      const ta = Math.floor(a / 10) * 10, oa = a - ta, tb = Math.floor(b / 10) * 10, ob = b - tb;
      return choice(r, 'Which expression is equal to ' + a + ' × ' + b + '?', a + ' × ' + tb + ' + ' + a + ' × ' + ob, [
        [ta + ' × ' + b + ' + ' + oa + ' × ' + ob, 'The ones part ' + oa + ' needs to multiply all of ' + b + ', not only ' + ob + '.'],
        [a + ' × ' + tb + ' + ' + ob, 'The ones part ' + ob + ' must be multiplied by ' + a + '.'],
        [ta + ' × ' + tb + ' + ' + oa + ' × ' + ob, 'This leaves out two boxes of the area model.'],
      ], { s: b + ' = ' + tb + ' + ' + ob + ', so ' + a + ' × ' + b + ' = ' + a + ' × ' + tb + ' + ' + a + ' × ' + ob + '.' });
    }),
    tpl('mirror', (r) => {
      const c = r.int(2, 9) * 10, d = r.int(1, 9);
      return N('Find ' + (c - d) + ' × ' + (c + d) + '. (Hint: compare with ' + c + ' × ' + c + '.)', c * c - d * d, { s: c + ' × ' + c + ' = ' + c * c + '. Moving ' + d + ' each way removes ' + d + ' × ' + d + ' = ' + d * d + '. Answer ' + (c * c - d * d) + '.', w: wr(c * c - d * d, [[c * c, 'It is a little less than ' + c * c + '. Subtract ' + d + ' × ' + d + '.']]) });
    }),
  ],
});
