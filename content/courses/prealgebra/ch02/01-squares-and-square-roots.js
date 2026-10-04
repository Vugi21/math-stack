import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const isSq = (n) => Number.isInteger(Math.sqrt(n));

export default lesson({
  id: 'pre-2-1-squares-and-square-roots',
  title: 'Squares and square roots',
  blurb: 'Why "squared" is a picture of a square, how perfect squares grow, and how to run the picture backwards with square roots.',
  concepts: ['exponents', 'squares', 'square-roots'],

  tryFirst: [
    num('t1', 'A square patio is laid with tiles: 7 rows, and 7 tiles in each row. How many tiles is that altogether?', 49, {
      h: ['Picture the rows. Each row has the same number of tiles.', 'Rows times tiles per row.'],
      s: '7 rows of 7 tiles: 7 × 7 = 49 tiles.',
      w: [['14', 'That is 7 + 7. The patio has 7 rows, each holding 7 tiles, so multiply.']],
    }),
    num('t2', 'Another square patio uses exactly 81 tiles. How many tiles long is one side?', 9, {
      h: ['The side times itself must make 81.', 'Try 8 × 8 and 9 × 9.'],
      s: '9 × 9 = 81, so each side is 9 tiles long.',
      w: [['40', 'That is about half of 81, but a square side times itself must equal 81. Try 9 × 9.']],
    }),
  ],

  learn: [
    p('Take a number and multiply it by itself. We say the number is <b>squared</b>, and we write 7 × 7 as 7<sup>2</sup>. The word "square" is not an accident: 7<sup>2</sup> is the number of tiles in a 7 by 7 square.'),
    def('exponent and base', 'In 7<sup>2</sup> the small raised 2 is the <b>exponent</b> and the 7 is the <b>base</b>. The exponent says how many copies of the base are multiplied together. For now the exponent is 2, which is read "squared".'),
    widget('squareRoot', { n: 5 }),
    def('perfect square', 'A whole number that is the square of a whole number: 1, 4, 9, 16, 25, 36, … Each one is the area of a square whose side is a whole number of units.'),
    rule('<b>Squaring.</b> n<sup>2</sup> means n × n. The results 1, 4, 9, 16, 25, 36, … are the perfect squares, and squares are never negative for whole numbers n.'),
    formula('Squaring', 'n<sup>2</sup> = n × n', 'n is the side of the square, and n<sup>2</sup> is its area. 13<sup>2</sup> = 13 × 13 = 169.'),
    tbl(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], [['n<sup>2</sup>', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100', '121', '144', '169', '196', '225']], 'Perfect squares worth knowing by heart'),
    def('square root', 'The square root of a number is the positive number which, multiplied by itself, gives it. If a square has area 49, its side is the square root of 49, written sqrt[49] = 7. Squaring and taking a square root undo each other: sqrt[7<sup>2</sup>] = 7 and (sqrt[49])<sup>2</sup> = 49.'),
    ex('A pattern inside the squares', ['Look at the gaps between neighbouring squares: 4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7, 25 − 16 = 9.', 'The gaps are the odd numbers 3, 5, 7, 9, …', 'Why? Grow a 4 by 4 square into a 5 by 5 square: you add one new row of 4, one new column of 4, and 1 corner tile. That is 4 + 4 + 1 = 9.', 'So going from n by n to (n + 1) by (n + 1) always adds 2n + 1 tiles, and the first n odd numbers add up to n<sup>2</sup>.']),
    formula('The next square', '(n + 1)<sup>2</sup> = n<sup>2</sup> + 2n + 1', 'To get the next square, add 2n + 1 to the one you have. Going backwards, n<sup>2</sup> = (n − 1)<sup>2</sup> + 2n − 1, a gap of 2n − 1.'),
    ex('Using the gap', ['Find 41<sup>2</sup> − 40<sup>2</sup> without squaring 41.', 'The gap between 40<sup>2</sup> and 41<sup>2</sup> is 2 × 40 + 1 = 81.', 'So the difference is 81.', 'Check: 1681 − 1600 = 81.']),
    ex('Doubling a side', ['Square A has side 6 cm and square B has side 12 cm. Compare their areas.', 'A has area 6 × 6 = 36. B has area 12 × 12 = 144.', '144 ÷ 36 = 4.', 'Doubling the side makes the area 4 times as large, not 2 times.']),
    ex('Not a perfect square? Trap it.', ['Where does sqrt[50] live? 7 × 7 = 49 and 8 × 8 = 64.', '50 is just past 49 and far short of 64.', 'So sqrt[50] is a little more than 7, and certainly less than 8.', 'In the same way, 14 × 14 = 196 and 15 × 15 = 225, so 14 is the largest whole number whose square is less than 200.']),
    key('Squaring takes a side to an area; the square root takes an area back to a side. Learn the squares up to 15<sup>2</sup> so well that you can use them in both directions.'),
    tip('To find the square of a number ending in 5, take the tens digits n, multiply n × (n + 1), and write 25 after it. 35<sup>2</sup>: 3 × 4 = 12, so 1225. 15<sup>2</sup>: 1 × 2 = 2, so 225.'),
    tip('Perfect squares can only end in 0, 1, 4, 5, 6 or 9. A number ending in 2, 3, 7 or 8 is never a perfect square. To estimate a square root, find the two perfect squares on either side.'),
    warn('<b>Watch out.</b> 6<sup>2</sup> is <i>not</i> 6 × 2 = 12. The exponent says how many copies of 6 to multiply, not what to multiply by. 6<sup>2</sup> = 6 × 6 = 36.'),
    mcq('Dev says "sqrt[36 + 64] must be 6 + 8 = 14." What is wrong?', ['Nothing; a square root splits across a sum.', 'He needs to add first: 36 + 64 = 100, and sqrt[100] = 10. A square root does not split over addition.', 'The answer should be 6 × 8 = 48.'], 1, 'The root bar works on the single number underneath it. 36 + 64 = 100 first, then sqrt[100] = 10. (Check: 14 × 14 = 196, not 100.)', 'Spot the mistake'),
    recap([['exponent', 'how many copies of the base are multiplied'], ['base', 'the number being multiplied by itself'], ['perfect square', 'the square of a whole number'], ['square root', 'the positive number whose square is the given number']], [['Square', 'n<sup>2</sup> = n × n'], ['Next square', '(n + 1)<sup>2</sup> = n<sup>2</sup> + 2n + 1']]),
  ],

  practice: [
    num('p1', 'What is 13<sup>2</sup>?', 169, {
      h: ['13 squared means 13 × 13.', '13 × 13 = 13 × 10 + 13 × 3.'],
      s: '13 × 13 = 130 + 39 = 169.',
      w: [['26', 'That is 13 × 2. Squaring means 13 × 13.'], ['156', 'Check 13 × 13 again: 130 + 39.']],
    }),
    num('p2', 'What is sqrt[144]?', 12, {
      h: ['Which number times itself makes 144?'],
      s: '12 × 12 = 144, so sqrt[144] = 12.',
      w: [['72', 'That is half of 144. A square root is the number that multiplied by itself gives 144.']],
    }),
    mc('p3', 'Which of these is <b>not</b> a perfect square?', ['121', '144', '168', '196'], 2, {
      h: ['Use the table: what squares are near 168?'],
      s: '12<sup>2</sup> = 144 and 13<sup>2</sup> = 169. So 168 sits just below 169 and is not a perfect square. 121, 144 and 196 are 11<sup>2</sup>, 12<sup>2</sup>, 14<sup>2</sup>.',
      w: [[0, '121 = 11 × 11, so it is a perfect square.'], [3, '196 = 14 × 14, so it is a perfect square.']],
    }),
    num('p4', 'What is the largest whole number whose square is less than 200?', 14, {
      h: ['14 × 14 is 196. What is 15 × 15?'],
      s: '14<sup>2</sup> = 196 is under 200, but 15<sup>2</sup> = 225 is over. So 14.',
      w: [['15', '15<sup>2</sup> = 225, which is more than 200.'], ['100', 'That is half of 200. We need the number that, multiplied by itself, stays under 200.']],
    }),
    num('p5', 'Square A has side 6 cm. Square B has a side twice as long. How many times as much area does B have as A?', 4, {
      h: ['Work out both areas.', 'A: 6 × 6. B: 12 × 12.'],
      s: 'A has area 36. B has side 12, so area 144. 144 ÷ 36 = 4. Doubling the side makes the area four times as big.',
      w: [['2', 'The side doubles, but area is side times side, so both directions double. Compute the two areas.']],
    }),
    num('p6', 'Find 20<sup>2</sup> − 19<sup>2</sup> without squaring 19. (Hint: think about growing a square.)', 39, {
      h: ['Going from a 19 by 19 square to a 20 by 20 square adds a row, a column, and a corner.', 'That is 19 + 19 + 1.'],
      s: 'A new row of 19, a new column of 19 and 1 corner: 19 + 19 + 1 = 39. Check: 400 − 361 = 39.',
      w: [['1', 'The squares are not 1 apart. 20<sup>2</sup> is 400, not 20 more than 19<sup>2</sup>.'], ['40', 'Close. The corner tile is counted once: 19 + 19 + 1.']],
    }),
    num('p7', 'How many perfect squares are there from 1 up to 200? (Count 1 itself.)', 14, {
      h: ['The squares are 1<sup>2</sup>, 2<sup>2</sup>, 3<sup>2</sup>, … Where do they pass 200?'],
      s: '14<sup>2</sup> = 196 is the last one under 200 (15<sup>2</sup> = 225). So 1<sup>2</sup> through 14<sup>2</sup>: 14 squares.',
      w: [['200', 'You are counting numbers; we want only the squares among them.'], ['13', 'Be sure to count 1<sup>2</sup> = 1 and 14<sup>2</sup> = 196.']],
    }),
  ],

  challenge: [
    chain('The garden', 'A square garden has sides of 12 metres.', [
      num('c1a', 'What is its area in square metres?', 144, { h: ['Side times side.'], s: '12 × 12 = 144.' }),
      num('c1b', 'A second square garden has an area 4 times as big. What is the side length of the second garden, in metres?', 24, { h: ['Find its area first (4 × 144), then take the square root. Or think: 4 times the area means the side doubled.'], s: '4 × 144 = 576, and 24 × 24 = 576. So the side is 24 m.', w: [['48', 'That is 4 × 12. Four times the area does not mean four times the side.']] }),
      num('c1c', 'What is the perimeter of the second garden, in metres?', 96, { h: ['A square has 4 equal sides.'], s: '4 × 24 = 96 m.' }),
    ], 'The idea: to scale an area by a factor of k, the side scales by the square root of k. Four times the area needs only twice the side.'),
    chain('Building squares from tiles', 'Ria has 130 square tiles and wants to build the biggest solid square she can.', [
      num('c2a', 'What is the side length of the biggest solid square she can make?', 11, { h: ['12 × 12 is more than 130?'], s: '11<sup>2</sup> = 121 fits, 12<sup>2</sup> = 144 does not. So side 11.' }),
      num('c2b', 'How many tiles are left over?', 9, { h: ['130 minus the tiles used.'], s: '130 − 121 = 9.' }),
      num('c2c', 'How many <i>more</i> tiles would she need to build the next bigger solid square?', 14, { h: ['How many tiles does a 12 by 12 square use?'], s: '12<sup>2</sup> = 144. She has 130, so she needs 144 − 130 = 14 more.', w: [['23', 'That is the number of tiles needed to grow from 121 to 144. But she already has 9 spare tiles.']] }),
    ], 'The idea: the leftover tiles after the biggest square and the tiles still needed for the next one always add up to the gap between neighbouring squares (here 23).'),
    mc('c3', 'Find the error. Leo claims: "3<sup>2</sup> + 4<sup>2</sup> = 7<sup>2</sup>, because 3 + 4 = 7." Which response is right?', ['It is true: 9 + 16 = 25 = 49.', 'It is false: 3<sup>2</sup> + 4<sup>2</sup> = 25, but 7<sup>2</sup> = 49. You cannot add the bases first.', 'It is true because 3 + 4 = 7.', 'It is false because 4<sup>2</sup> = 8.'], 1, {
      s: '3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25, which is 5<sup>2</sup>, not 7<sup>2</sup>. Squares do not add the way their bases do.',
      w: [[0, 'Look at 9 + 16: that is 25, not 49.'], [2, 'Squaring each first gives 9 + 16 = 25. Adding 3 + 4 first changes the problem.'], [3, '4<sup>2</sup> = 16, not 8. That is the 4 × 2 mistake.']],
    }),
  ],

  quiz: [
    tpl('sq', (r) => { const n = r.int(3, 40); return N('What is ' + n + '<sup>2</sup>?', n * n, { s: n + ' × ' + n + ' = ' + n * n + '.', w: [[2 * n, 'Squaring means ' + n + ' × ' + n + ', not ' + n + ' × 2.']] }); }),
    tpl('root', (r) => { const n = r.int(3, 40); return N(r.bool() ? 'What is sqrt[' + n * n + ']?' : 'A square has area ' + n * n + ' square units. How long is each side?', n, { s: n + ' × ' + n + ' = ' + n * n + ', so the answer is ' + n + '.', w: [[Math.round(n * n / 2), 'That is half of ' + n * n + '. We want the number that multiplied by itself gives ' + n * n + '.']] }); }),
    tpl('notsq', (r) => {
      const sq = r.distinct(3, 4, 30).map((k) => k * k); let bad = r.int(20, 900); while (isSq(bad) || sq.includes(bad)) bad++;
      return choice(r, 'Exactly one of these is <b>not</b> a perfect square. Which one?', String(bad), sq.map(String), { s: bad + ' is between two neighbouring perfect squares, so it is not one itself.' });
    }),
    tpl('largest', (r) => { let n = r.int(40, 950); while (isSq(n)) n++; const k = Math.floor(Math.sqrt(n)); return N('What is the largest whole number whose square is less than ' + n + '?', k, { s: k + '<sup>2</sup> = ' + k * k + ' is under ' + n + ', but ' + (k + 1) + '<sup>2</sup> = ' + (k + 1) * (k + 1) + ' is over.', w: [[k + 1, (k + 1) + '<sup>2</sup> = ' + (k + 1) * (k + 1) + ' is already too big.']] }); }),
    tpl('between', (r) => { let n = r.int(30, 800); while (isSq(n)) n++; const k = Math.floor(Math.sqrt(n)); return N('sqrt[' + n + '] lies between two neighbouring whole numbers. What is the smaller one?', k, { s: k + '<sup>2</sup> = ' + k * k + ' and ' + (k + 1) + '<sup>2</sup> = ' + (k + 1) * (k + 1) + ', and ' + n + ' sits between them.', w: [[k + 1, 'That is the larger neighbour. The question asks for the smaller one.']] }); }),
    tpl('scale', (r) => { const a = r.int(2, 15), k = r.int(2, 9); return N(name(r) + ' draws a square with side ' + a + ' cm, then a second square whose side is ' + k + ' times as long. How many times as large is the area of the second square?', k * k, { s: 'Areas: ' + a * a + ' and ' + (a * k) * (a * k) + '. The ratio is ' + k + '<sup>2</sup> = ' + k * k + '.', w: [[k, 'The side is ' + k + ' times as long, but area is side times side, so the area grows by ' + k + ' × ' + k + '.']] }); }),
    tpl('odds', (r) => { const n = r.int(4, 40); return N('Find 1 + 3 + 5 + … + ' + (2 * n - 1) + ' (the first ' + n + ' odd numbers added up). Think squares.', n * n, { s: 'The first ' + n + ' odd numbers add up to ' + n + '<sup>2</sup> = ' + n * n + '.', w: [[n * 2, 'That is ' + n + ' × 2. The pattern is n × n.']] }); }),
    tpl('gap', (r) => { const m = r.int(10, 60); return N('Without squaring both, find ' + m + '<sup>2</sup> − ' + (m - 1) + '<sup>2</sup>.', 2 * m - 1, { s: 'Growing a ' + (m - 1) + ' by ' + (m - 1) + ' square to ' + m + ' by ' + m + ' adds ' + (m - 1) + ' + ' + (m - 1) + ' + 1 = ' + (2 * m - 1) + '.', w: [[1, 'The squares are not 1 apart; the new row and column add up.']] }); }),
  ],
});
