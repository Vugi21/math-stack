import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));
const isSq = (n) => Number.isInteger(Math.sqrt(n));

export default lesson({
  id: 'm4-3-3-perfect-squares',
  title: 'Perfect squares',
  blurb: 'Square numbers as dot arrays, the sum of odd numbers, and the units digits that squares can have.',
  concepts: ['perfect-squares', 'odd-numbers', 'patterns', 'units-digit'],

  tryFirst: [
    num('t1', 'A square floor is covered by 7 rows of 7 tiles. How many tiles are there?', 49, {
      h: ['7 rows with 7 tiles in each row.'],
      s: '7 × 7 = 49 tiles.',
      w: [['14', 'That is 7 + 7. There are 7 rows, each with 7 tiles, so multiply.']],
    }),
    num('t2', 'Add the first four odd numbers: 1 + 3 + 5 + 7. Notice the answer.', 16, {
      h: ['1 + 3 = 4. Then add 5. Then add 7.', 'Is the answer a number you know from a square?'],
      s: '1 + 3 = 4, + 5 = 9, + 7 = 16. Each total is a square: 1, 4, 9, 16.',
      w: [['15', 'Add again carefully: 9 + 7 = 16.']],
    }),
  ],

  learn: [
    p('A <b>perfect square</b> is a number you get by multiplying a whole number by itself. 36 is a perfect square because 6 × 6 = 36. We also say 6^[2] = 36.'),
    widget('exponentTiles', { b: 5, e: 2 }),
    p('A square number can be drawn as a square array of dots. 25 dots make a 5-by-5 square.'),
    tbl(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['n^[2]', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100']], 'Squares from 1 to 10'),
    tbl(['n', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], [['n^[2]', '121', '144', '169', '196', '225', '256', '289', '324', '361', '400']], 'Squares from 11 to 20'),
    rule('<b>Squares and odd numbers.</b> To go from a square of side n to a square of side n + 1, add an L-shaped border of 2n + 1 dots. So the sum of the first n odd numbers is n^[2]: 1 + 3 + 5 + 7 + 9 = 25.'),
    ex('Sum of odd numbers: 1 + 3 + 5 + ... + 19', ['Count the odd numbers: 1, 3, 5, ..., 19. There are 10 of them.', 'The sum of the first 10 odd numbers is 10^[2].', 'The answer is 100.']),
    rule('<b>Last digits of squares.</b> A perfect square can only end in 0, 1, 4, 5, 6 or 9. It never ends in 2, 3, 7 or 8. Check: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.'),
    ex('Squares ending in 5', ['Take 45. The tens digit is 4.', 'Multiply 4 × 5 = 20, which is the tens digit times the next number.', 'Then write 25 after it: 2025.', 'So 45^[2] = 2025.']),
    warn('<b>Ending in 6 does not make a square.</b> Every square ends in one of six digits, but many other numbers also end in those digits. 26 ends in 6 and is not a square. The units digit can rule a number out, but it cannot prove it is a square.'),
    mcq('Dev says: "2,026 cannot be a perfect square because it ends in 6." What is wrong with that reason?', ['Nothing. A number ending in 6 is never a square.', 'Squares can end in 6 (16 and 36 do). The right check is that 45^[2] = 2025 and 46^[2] = 2116, so 2,026 falls between two squares.', 'It is a square because 2 + 0 + 2 + 6 = 10.'], 1, 'A square may end in 6. To decide, find the two squares around 2,026. 2025 and 2116. It is not equal to either, so it is not a square.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is 13^[2]?', 169, {
      h: ['13 × 13 = 13 × 10 + 13 × 3.'],
      s: '130 + 39 = 169.',
      w: [['26', 'That is 13 + 13 or 13 × 2. A square multiplies 13 by 13.'], ['139', 'Check 13 × 3 = 39 and 13 × 10 = 130. Add them.']],
    }),
    mc('p2', 'Exactly one of these is a perfect square. Which?', ['1442', '1443', '1444', '1446'], 2, {
      h: ['Squares can only end in 0, 1, 4, 5, 6 or 9.', 'Try 38 × 38.'],
      s: '38 × 38 = 1444. The others end in 2, 3 or 6. (1446 does end in 6 but lies between 38^[2] = 1444 and 39^[2] = 1521.)',
      w: [[0, 'No square ends in 2.'], [1, 'No square ends in 3.'], [3, 'Squares can end in 6, but 38^[2] = 1444 and 39^[2] = 1521, so nothing between them is a square.']],
    }),
    num('p3', 'Find 1 + 3 + 5 + ... + 29, the sum of the first 15 odd numbers.', 225, {
      h: ['How many numbers are being added?'],
      s: 'The 15th odd number is 29, since 2 × 15 − 1 = 29. The sum of the first 15 odd numbers is 15^[2] = 225.',
      w: [['30', 'That is 2 × 15, not 15 × 15. Count the terms, then multiply 15 by itself.'], ['435', 'Too big. The sum of the first n odd numbers is just n^[2].']],
    }),
    num('p4', 'How many perfect squares are between 50 and 200? (Do not count 50 or 200 if they are squares.)', 7, {
      h: ['7^[2] = 49 is too small. What is the next square?', 'What is the last square below 200?'],
      s: 'The squares are 64, 81, 100, 121, 144, 169 and 196. That is 7.',
      w: [['6', 'You may have missed one. List the squares from 8^[2] to 14^[2].'], ['8', '7^[2] = 49 is not between 50 and 200.']],
    }),
    num('p5', 'Find 65^[2].', 4225, {
      h: ['The number ends in 5. The tens digit is 6. Use 6 × 7.'],
      s: '6 × 7 = 42, then write 25: 4225.',
      w: [['4025', 'The first part is 6 × 7 = 42, not 6 × 6 = 36 or 40.'], ['3625', 'You used 6 × 6. Use the tens digit times the next number: 6 × 7.']],
    }),
    num('p6', 'How many more dots are in a 15-by-15 square than in a 14-by-14 square?', 29, {
      h: ['The extra dots form an L-shaped border.', 'The L has 15 dots on one side and 14 on the other.'],
      s: '15^[2] − 14^[2] = 225 − 196 = 29. The L border has 15 + 14 = 29 dots.',
      w: [['30', 'The corner dot is counted once, not twice: 15 + 14 = 29.'], ['1', 'The sizes differ by 1, but the number of dots differs by much more.']],
    }),
    num('p7', 'What is the smallest whole number you can multiply 12 by to get a perfect square?', 3, {
      h: ['12 = 2 × 2 × 3.', 'A square needs every factor to have a partner.'],
      s: '12 = 2 × 2 × 3. The 3 has no partner. Multiply by 3 to get 36 = 6^[2].',
      w: [['12', '12 × 12 = 144 is a square, but it is not the smallest.'], ['2', '12 × 2 = 24 is not a perfect square.']],
    }),
    num('p8', 'How many two-digit numbers are perfect squares?', 6, {
      h: ['The smallest two-digit square is 16.', 'The largest is below 100.'],
      s: '16, 25, 36, 49, 64, 81 are the squares of 4 through 9. That is 6.',
      w: [['5', 'You may have missed one. List the squares of 4, 5, 6, 7, 8, 9.'], ['7', '100 has three digits, and 9 is a one-digit square.']],
    }),
  ],

  challenge: [
    chain('Growing squares', 'Imagine squares of dots. A 7-by-7 square becomes an 8-by-8 square when you add an L-shaped border.', [
      num('c1a', 'How many dots are in the L-shaped border from the 7-by-7 square to the 8-by-8 square?', 15, { h: ['8^[2] − 7^[2].', 'Or: the L has an arm of 8 dots and an arm of 7 dots.'], s: '64 − 49 = 15.' }),
      num('c1b', 'How many dots must be added to a 20-by-20 square to get a 21-by-21 square?', 41, { h: ['Use the pattern from the first part: 15 = 2 × 7 + 1.'], s: '2 × 20 + 1 = 41. Check: 441 − 400 = 41.' }),
      num('c1c', 'What is 1 + 3 + 5 + ... + 41?', 441, { h: ['Each border is an odd number. What square does the sum reach?', 'The last border is the one that takes a 20-square to a 21-square.'], s: '41 is the border that turns a 20-by-20 square into a 21-by-21 square. So the sum is 21^[2] = 441.' }),
    ], 'The idea: the L-shaped border added to an n-by-n square has 2n + 1 dots. All the odd numbers up to 2n + 1 add up to (n + 1)^[2].'),
    chain('Three-digit squares', 'Some squares have 1 digit, some 2, some 3. Let us look at three digits.', [
      num('c2a', 'What is the smallest three-digit perfect square?', 100, { h: ['9^[2] = 81 has two digits.'], s: '10^[2] = 100.' }),
      num('c2b', 'What is the largest three-digit perfect square?', 961, { h: ['32^[2] = 1024 has four digits. Try 31.'], s: '31^[2] = 961. 32^[2] = 1024 is too big.' }),
      num('c2c', 'How many three-digit perfect squares are there?', 22, { h: ['They are the squares of the numbers from your first answer to your second.', 'Count the numbers from 10 to 31.'], s: 'The squares of 10, 11, ..., 31. That is 31 − 10 + 1 = 22.' }),
    ], 'The idea: to count squares in a range, count the possible sides. You do not have to list the squares themselves.'),
    mc('c3', 'Find the error. Isla says: "The last number in 1 + 3 + 5 + 7 + 9 + 11 is 11, so the sum is 11^[2] = 121." What went wrong?', ['She squared the last number. The sum of the first n odd numbers is n^[2], and here n is the count of numbers, which is 6. The sum is 36.', 'She is right.', 'She should have squared 5.', 'The sum cannot be a square.'], 0, {
      s: 'There are 6 odd numbers (1, 3, 5, 7, 9, 11). The sum is 6^[2] = 36. Check: 1 + 3 + 5 + 7 + 9 + 11 = 36.',
      w: [[1, 'Add them: 1 + 3 + 5 + 7 + 9 + 11 = 36, not 121.'], [2, 'Count the terms. There are six of them.']],
    }),
  ],

  quiz: [
    tpl('evalSq', (r) => {
      const n = r.int(11, 40);
      return N('What is ' + n + '^[2]?', n * n, { s: n + ' × ' + n + ' = ' + n * n + '.', w: wr(n * n, [[2 * n, 'That is ' + n + ' + ' + n + '. A square multiplies ' + n + ' by itself.']]) });
    }),
    tpl('oddSum', (r) => {
      const n = r.int(6, 40);
      return N('Find the sum of the first ' + n + ' odd numbers: 1 + 3 + 5 + ... + ' + (2 * n - 1) + '.', n * n, { s: 'The sum of the first n odd numbers is n^[2]. ' + n + '^[2] = ' + n * n + '.', w: wr(n * n, [[2 * n - 1, 'That is only the last term.']]) });
    }),
    tpl('border', (r) => {
      const a = r.int(5, 60);
      return N('A square has ' + a + ' dots along each side. Another square has ' + (a + 1) + ' dots along each side. How many more dots does the larger square have?', 2 * a + 1, { s: (a + 1) + '^[2] − ' + a + '^[2] = ' + ((a + 1) * (a + 1)) + ' − ' + a * a + ' = ' + (2 * a + 1) + '. It is the L-shaped border: ' + (a + 1) + ' + ' + a + '.', w: wr(2 * a + 1, [[2 * a, 'The corner dot is shared by the two arms of the L. Add ' + (a + 1) + ' and ' + a + '.'], [1, 'The side grows by 1, but the number of dots grows by more.']]) });
    }),
    tpl('countSq', (r) => {
      const a = r.int(10, 300), b = a + r.int(60, 500);
      let c = 0; for (let n = a + 1; n < b; n++) if (isSq(n)) c++;
      return N('How many perfect squares are greater than ' + a + ' and less than ' + b + '?', c, { s: 'List the squares in that range by their sides. There are ' + c + '.', w: wr(c, [[c + 1, 'Check that the ends are not counted if they are squares, and that your list has no extra.'], [Math.max(0, c - 1), 'You may have missed one square. List the sides.']]) });
    }),
    tpl('isSquare', (r) => {
      const n = r.int(12, 60), ks = r.shuffle([1, 2, 3, 4, 6, 7, 8, 9, 11]).filter((k) => k < 2 * n).slice(0, 3);
      const ws = ks.map((k) => [String(n * n + k), 'It lies between ' + n + '^[2] = ' + n * n + ' and ' + (n + 1) + '^[2] = ' + (n + 1) * (n + 1) + ', so it is not a square.']);
      return choice(r, 'Which of these is a perfect square?', String(n * n), ws, { s: n + ' × ' + n + ' = ' + n * n + '. The others lie strictly between two consecutive squares.' });
    }),
    tpl('end5', (r) => {
      const t = r.int(2, 29), n = 10 * t + 5;
      return N('Find ' + n + '^[2]. (Look at the pattern for numbers ending in 5.)', n * n, { s: t + ' × ' + (t + 1) + ' = ' + t * (t + 1) + '. Then 25. So ' + n * n + '.', w: wr(n * n, [[t * t * 100 + 25, 'Use ' + t + ' × ' + (t + 1) + ', not ' + t + ' × ' + t + '.']]) });
    }),
    tpl('makeSquare', (r) => {
      const s = r.pick([2, 3, 5, 6, 7, 10]), m = r.int(1, 6), n = s * m * m;
      return N('What is the smallest whole number you can multiply ' + n + ' by to get a perfect square?', s, { s: n + ' = ' + s + ' × ' + m + '^[2]. Multiplying by ' + s + ' gives ' + (s * n) + ' = ' + (s * m) + '^[2].', w: wr(s, [[n, n + ' × ' + n + ' is a square, but there is a smaller number that works.']]) });
    }),
    tpl('sideFromArea', (r) => {
      const n = r.int(6, 45);
      return N('A square garden has area ' + n * n + ' square meters. How long is one side, in meters?', n, { s: 'Find the number that multiplies by itself to give ' + n * n + '. ' + n + ' × ' + n + ' = ' + n * n + '.', w: wr(n, [[n * n / 2, 'That divides the area by 2. The side multiplied by itself gives the area.']]) });
    }),
  ],
});
