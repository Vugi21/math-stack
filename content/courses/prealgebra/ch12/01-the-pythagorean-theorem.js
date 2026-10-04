import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);
const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];

export default lesson({
  id: 'pre-12-1-the-pythagorean-theorem',
  title: 'The Pythagorean theorem',
  blurb: 'In a right triangle the squares on the two short sides add up to the square on the long side. Use it to find missing lengths and to test for right angles.',
  concepts: ['pythagorean-theorem', 'right-triangle', 'distance'],

  tryFirst: [
    num('t1', 'A right triangle has legs 6 and 8. Guess, then check by measuring on graph paper if you like: how long is the long slanted side?', 10, {
      h: ['It must be longer than 8 but shorter than 6 + 8 = 14.', 'Try 10: does 6² + 8² match 10²?'],
      s: '6² + 8² = 36 + 64 = 100 = 10². The slanted side is 10.',
      w: [['14', 'Going along both legs is longer than the straight shortcut across. The slanted side is shorter than 14.']],
    }),
    num('t2', 'Draw a right triangle with a square on each of its three sides. The squares on the two short sides have areas 9 and 16. What is the area of the square on the longest side?', 25, {
      h: ['Notice the pattern: do the two small areas combine into the big one?'],
      s: '9 + 16 = 25. The two small squares together have exactly the area of the big one. (Their sides are 3, 4, and 5.)',
      w: [['7', 'That is the sum of the side lengths 3 and 4. The question asks about areas, 9 and 16.']],
    }),
  ],

  learn: [
    def('right triangle', 'A triangle with one right angle (a square corner, 90°). The other two angles are smaller than 90° and add up to 90°.'),
    def('legs and hypotenuse', 'The two sides that form the right angle are the <b>legs</b>. The side opposite the right angle is the <b>hypotenuse</b>. It is always the longest side of a right triangle.'),
    widget('pythagoras', { a: 3, b: 4 }),
    formula('The Pythagorean theorem', 'a² + b² = c²', 'a and b are the legs and c is the hypotenuse. The square built on the hypotenuse has exactly the same area as the two squares on the legs put together.'),
    p('Look at the picture with legs 3 and 4. The small squares have areas 9 and 16, and 9 + 16 = 25, the area of the square on the hypotenuse. So the hypotenuse is 5, because 5 × 5 = 25. The theorem works for <i>every</i> right triangle, large or small, and only for right triangles.'),
    ex('Finding the hypotenuse', ['The legs are 5 and 12. Find c.', 'c² = 5² + 12² = 25 + 144 = 169.', 'What number times itself is 169? c = 13.']),
    ex('Finding a leg', ['The hypotenuse is 26 and one leg is 10. Find the other leg.', 'Rearrange: a² = c² − b² = 676 − 100 = 576.', 'a = 24. For a leg, you subtract. The hypotenuse is always the biggest.']),
    ex('When the answer is not a whole number', ['The legs are 3 and 6. Find the hypotenuse.', 'c² = 9 + 36 = 45.', 'No whole number squares to 45. Since 6² = 36 and 7² = 49, c is a little less than 7. We write c = √45, which is about 6.71.', 'An exact answer is √45. A decimal like 6.71 is an approximation.']),
    tbl(['Legs', 'Hypotenuse', 'Check'], [['3, 4', '5', '9 + 16 = 25'], ['5, 12', '13', '25 + 144 = 169'], ['8, 15', '17', '64 + 225 = 289'], ['7, 24', '25', '49 + 576 = 625'], ['20, 21', '29', '400 + 441 = 841']], 'Pythagorean triples worth remembering. Multiply all three by the same number and you get another: 6, 8, 10 or 9, 12, 15.'),
    widget('pythagoras', { a: 5, b: 12 }),
    def('Pythagorean triple', 'Three whole numbers a, b, c with a² + b² = c². The side lengths of a right triangle that happen to be whole numbers.'),
    rule('<b>The converse.</b> If three sides satisfy a² + b² = c² (c the longest), the triangle must be a right triangle. If the squares do not match, it is not a right triangle. This is how builders check a corner: measure 3 and 4 along the edges, and see whether the corners are 5 apart.'),
    ex('Is it a right triangle?', ['Sides 9, 40, 41. The longest is 41, so test 9² + 40² against 41².', '81 + 1600 = 1681, and 41² = 1681. They match, so the triangle is a right triangle.', 'For sides 7, 8, 11 the test gives 49 + 64 = 113, which is not 121, so that triangle is not right.']),
    p('<b>Distance on a grid.</b> To find how far apart two points are, draw a right triangle between them. The legs are the horizontal and vertical differences, and the distance is the hypotenuse. From (2, 1) to (7, 13) the legs are 5 and 12, so the distance is 13.'),
    p('<b>Rectangle diagonals.</b> A diagonal cuts a rectangle into two right triangles whose legs are the sides of the rectangle. A 15 by 20 rectangle has diagonal √(225 + 400) = √625 = 25.'),
    tip('<b>Reasonableness check.</b> The hypotenuse is longer than either leg but shorter than the two legs added together. For legs 3 and 6, c must be between 6 and 9, and 6.71 fits. If your answer for a hypotenuse is smaller than a leg, you subtracted by mistake.'),
    tip('<b>Spot a triple by scaling.</b> Legs 9 and 12? Divide both by 3 to get 3 and 4, so the hypotenuse is 3 × 5 = 15. Learn 3-4-5, 5-12-13, 8-15-17 and 7-24-25 and look for multiples of them.'),
    warn('<b>Watch out.</b> a² + b² = c² uses <i>squares</i>, not the sides themselves. 3 + 4 is 7, not 5. The hypotenuse goes alone on one side: it is never one of the added terms. Finding a leg means <i>subtracting</i> squares.'),
    key('The theorem links the <b>three sides</b> of a right triangle through their squares. Know two sides, and you can always find the third. It only works when the triangle has a right angle.'),
    mcq('Sam has a triangle with sides 7, 9, and 12. He says: "7 + 9 = 16, which is more than 12, so it must be a right triangle." What is wrong?', ['Nothing, it is a right triangle.', 'Adding sides is not the test. You need 7² + 9² = 12², and 49 + 81 = 130 is not 144, so it is not a right triangle.', 'The test is 7 × 9 = 12.'], 1, 'Adding two sides just tells you a triangle exists. For a right triangle the squares must match: 130 ≠ 144.', 'Spot the mistake'),
    recap([['hypotenuse', 'longest side, opposite the right angle'], ['legs', 'the two sides that form the right angle'], ['Pythagorean triple', 'whole numbers with a² + b² = c²'], ['converse', 'if a² + b² = c², the triangle is right']], [['Pythagorean theorem', 'a² + b² = c²'], ['Hypotenuse', 'c = √(a² + b²)'], ['A leg', 'a = √(c² − b²)'], ['Common triples', '3-4-5, 5-12-13, 8-15-17, 7-24-25']]),
  ],

  practice: [
    num('p1', 'A right triangle has legs 9 and 12. How long is the hypotenuse?', 15, {
      h: ['9² + 12² = ?'], s: '81 + 144 = 225, and 15 × 15 = 225.',
      w: [['21', 'You added the legs. Add their squares, then undo the square.'], ['225', 'That is c². The hypotenuse is the number whose square is 225.']],
    }),
    num('p2', 'A right triangle has hypotenuse 25 and one leg 7. How long is the other leg?', 24, {
      h: ['For a leg you subtract: c² − b².'], s: '625 − 49 = 576, and 24² = 576.',
      w: [['18', 'You subtracted the sides, 25 − 7. Subtract the squares instead.'], ['32', 'You added the sides, 25 + 7. A leg is shorter than the hypotenuse, and you need to work with squares: subtract them.']],
    }),
    num('p3', 'A right triangle has legs 4 and 7. What is the square of the hypotenuse? (We do not need the hypotenuse itself.)', 65, {
      h: ['c² = a² + b².'], s: '16 + 49 = 65. It is not a perfect square, so the hypotenuse is not a whole number, and we stop at c².',
      w: [['11', 'You added the legs. Square them first.']],
    }),
    num('p4', 'On a coordinate grid, how far is the point (1, 2) from the point (7, 10)?', 10, {
      h: ['Horizontal change? Vertical change? They are the legs of a right triangle.'], s: 'Legs: 6 and 8. 36 + 64 = 100, so the distance is 10.',
      w: [['14', 'That is the walk along the grid lines. The straight line is shorter.']],
    }),
    num('p5', 'A 17-foot ladder leans against a wall. Its foot is 8 feet from the wall. How high up the wall does it reach?', 15, {
      h: ['The ladder is the hypotenuse.'], s: '17² − 8² = 289 − 64 = 225, so 15 feet.',
      w: [['9', 'You subtracted 17 − 8. Subtract the squares.'], ['19', 'The ladder is the long side; it cannot reach higher than its own length.']],
    }),
    mc('p6', 'Which of these is the side lengths of a right triangle?', ['6, 7, 9', '8, 15, 17', '9, 10, 14', '5, 6, 8'], 1, {
      h: ['Square the two short sides, add, and compare to the square of the long one.'],
      s: '8² + 15² = 64 + 225 = 289 = 17². The others fail: 36 + 49 = 85 ≠ 81, 81 + 100 = 181 ≠ 196, 25 + 36 = 61 ≠ 64.',
      w: [[3, '25 + 36 = 61, which is close to 64, but not equal. It has to match exactly.']],
    }),
    num('p7', 'A rectangle is 24 units wide and 32 units tall. How long is its diagonal?', 40, {
      h: ['The diagonal cuts the rectangle into two right triangles.', 'Both numbers share a factor: think 3-4-5.'], s: '24 = 8 × 3 and 32 = 8 × 4, so the diagonal is 8 × 5 = 40.',
      w: [['56', 'That is both sides added. The diagonal is the shortcut.']],
    }),
    num('p8', 'The diagonal of a rectangle is 25 and its width is 7. What is the rectangle\'s perimeter?', 62, {
      h: ['First find the length with the Pythagorean theorem.'], s: 'length² = 625 − 49 = 576, so length = 24. Perimeter = 2 × (24 + 7) = 62.',
      w: [['64', 'You used the diagonal 25 as a side. The diagonal is not a side of the rectangle. Find the length first.'], ['31', 'That is half the perimeter.']],
    }),
  ],

  challenge: [
    chain('The shortcut', 'A rectangular field is 40 meters long and 30 meters wide. Ana walks from one corner to the opposite corner.', [
      num('c1a', 'Going along two sides, how far does she walk?', 70, { h: ['40 + 30.'], s: '40 + 30 = 70.' }),
      num('c1b', 'Cutting straight across the diagonal, how far does she walk?', 50, { h: ['30-40-50 is 3-4-5 times 10.'], s: '30² + 40² = 900 + 1600 = 2500 = 50².' }),
      num('c1c', 'How many meters does the shortcut save?', 20, { h: ['Subtract.'], s: '70 − 50 = 20.' }),
    ], 'The idea: the straight line is always shorter than going around the legs. A triangle\'s long side is less than the sum of the other two.'),
    chain('Two poles', 'Two vertical poles stand on level ground 12 meters apart. One is 15 m tall and the other is 6 m tall.', [
      num('c2a', 'How much taller is the tall pole?', 9, { h: ['Subtract the heights.'], s: '15 − 6 = 9.' }),
      num('c2b', 'A straight wire joins the two tops. How long is it? (Draw a right triangle: horizontal 12, vertical 9.)', 15, { h: ['9-12-? is 3-4-5 times 3.'], s: '81 + 144 = 225, so 15 meters.' }),
      num('c2c', 'A guy wire runs from the top of the tall pole to a peg in the ground 8 m from its base (on the far side from the short pole). How long is it?', 17, { h: ['The pole is a leg, 15. The ground distance is the other leg, 8.'], s: '15² + 8² = 225 + 64 = 289 = 17².' }),
    ], 'The idea: whenever something goes straight up, something goes straight across, and a slanted line joins them, you have a right triangle.'),
    mc('c3', 'Find the error. Maya says "The triangle with sides 5, 12, and 14 is right-angled, since 5² + 12² = 169 and that is close to 14² = 196." What is wrong?', ['Close is not good enough: the squares must match exactly, and 169 ≠ 196, so it is not a right triangle.', 'She should have added 5 + 12 instead.', 'Nothing, close is fine.', 'She should have used 14 as a leg.'], 0, {
      s: 'The test is exact. 169 would match a hypotenuse of 13; with 14 the angle is a bit more than square.',
      w: [[2, 'Right angles are exact. 5, 12, 13 is right-angled but 5, 12, 14 is not.']],
    }),
  ],

  quiz: [
    tpl('hyp', (r) => {
      const [a, b, c] = r.pick(TRI), k = r.int(1, 8), sw = r.bool();
      const x = sw ? b : a, y = sw ? a : b;
      return N('A right triangle has legs ' + k * x + ' and ' + k * y + '. How long is the hypotenuse?', k * c, { s: (k * x) + '² + ' + (k * y) + '² = ' + (k * c) + '².', w: ws(k * c, [[k * (x + y), 'You added the legs. Add the squares of the legs, then take the square root.']]) });
    }),
    tpl('leg', (r) => {
      const [a, b, c] = r.pick(TRI), k = r.int(1, 8), sw = r.bool();
      const known = sw ? b : a, miss = sw ? a : b;
      return N('A right triangle has hypotenuse ' + k * c + ' and one leg ' + k * known + '. How long is the other leg?', k * miss, { s: (k * c) + '² − ' + (k * known) + '² = ' + (k * miss) + '².', w: ws(k * miss, [[k * (c - known), 'You subtracted the lengths. Subtract the squares.']]) });
    }),
    tpl('csq', (r) => {
      const a = r.int(1, 15), b = r.int(1, 15);
      return N('A right triangle has legs ' + a + ' and ' + b + '. What is the square of its hypotenuse?', a * a + b * b, { s: a + '² + ' + b + '² = ' + a * a + ' + ' + b * b + ' = ' + (a * a + b * b) + '.', w: ws(a * a + b * b, [[(a + b) * (a + b), 'The legs are squared separately: (a + b)² is not a² + b².']]) });
    }),
    tpl('grid', (r) => {
      const [a, b, c] = r.pick(TRI), k = r.int(1, 4), x1 = r.int(-6, 6), y1 = r.int(-6, 6);
      const x2 = x1 + k * a * (r.bool() ? 1 : -1), y2 = y1 + k * b * (r.bool() ? 1 : -1);
      const f = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
      return N('How far apart are the points (' + f(x1) + ', ' + f(y1) + ') and (' + f(x2) + ', ' + f(y2) + ') on a coordinate grid?', k * c, { s: 'The horizontal gap is ' + k * a + ' and the vertical gap is ' + k * b + '. The distance is ' + k * c + '.', w: ws(k * c, [[k * (a + b), 'That is walking along the grid lines. The straight line is shorter.']]) });
    }),
    tpl('ladder', (r) => {
      const [a, b, c] = r.pick(TRI.slice(0, 4)), k = r.int(1, 5);
      return N(name(r) + ' leans a ' + k * c + '-foot ladder on a wall. The foot of the ladder is ' + k * a + ' feet from the wall. How high up the wall does the ladder reach?', k * b, { s: (k * c) + '² − ' + (k * a) + '² = ' + (k * b) + '².', w: ws(k * b, [[k * (c - a), 'Subtract the squares, not the lengths.']]) });
    }),
    tpl('diag', (r) => {
      const [a, b, c] = r.pick(TRI.slice(0, 5)), k = r.int(1, 6);
      return N('A rectangular screen is ' + k * a + ' inches wide and ' + k * b + ' inches tall. How long is its diagonal in inches?', k * c, { s: 'Right triangle with legs ' + k * a + ' and ' + k * b + ': hypotenuse ' + k * c + '.', w: ws(k * c, [[k * (a + b), 'The diagonal is a shortcut, shorter than going along two sides.']]) });
    }),
    tpl('diagPerim', (r) => {
      const [a0, b0, c] = r.pick(TRI.slice(0, 4)), k = r.int(1, 8), sw = r.bool();
      const a = sw ? b0 : a0, b = sw ? a0 : b0;
      return N('A rectangle has a diagonal of ' + k * c + ' and a side of ' + k * a + '. What is its perimeter?', 2 * k * (a + b), { s: 'The other side is ' + k * b + '. Perimeter = 2 × (' + k * a + ' + ' + k * b + ') = ' + 2 * k * (a + b) + '.', w: ws(2 * k * (a + b), [[2 * k * (a + c), 'The diagonal is not a side of the rectangle.']]) });
    }),
    tpl('isRight', (r) => {
      const [a, b, c] = r.pick(TRI), k = r.int(1, 4), d = r.int(1, 2) * k;
      const real = [k * a, k * b, k * c], fake = [k * a, k * b, k * c + d];
      const yes = r.bool(), sides = yes ? real : fake;
      return choice(r, 'Is a triangle with sides ' + sides.join(', ') + ' a right triangle?', yes ? 'Yes' : 'No', [yes ? 'No' : 'Yes', 'Only if it is also isosceles', 'It cannot be known'], { s: 'Test: ' + sides[0] + '² + ' + sides[1] + '² = ' + (sides[0] ** 2 + sides[1] ** 2) + ' and ' + sides[2] + '² = ' + sides[2] ** 2 + (yes ? '. They match.' : '. They do not match.') });
    }),
  ],
});
