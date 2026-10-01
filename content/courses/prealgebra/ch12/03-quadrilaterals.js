import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);
const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];

export default lesson({
  id: 'pre-12-3-quadrilaterals',
  title: 'The quadrilateral family',
  blurb: 'Four-sided shapes as a family tree: angles that add to 360, what makes each member special, and how diagonals help with area and side lengths.',
  concepts: ['quadrilaterals', 'angle-sum', 'rhombus', 'trapezoid', 'kite'],

  tryFirst: [
    num('t1', 'Three angles of a four-sided shape are 80°, 100°, and 90°. What is the fourth angle? (Hint: draw one diagonal.)', 90, {
      h: ['One diagonal cuts the shape into two triangles. How many degrees is that in total?', 'A triangle\'s angles add to 180°.'],
      s: 'Two triangles make 2 × 180° = 360°. 80 + 100 + 90 = 270, so the fourth angle is 360 − 270 = 90.',
      w: [['10', 'You subtracted from 180. A four-sided shape has more angle room: 360 degrees.']],
    }),
    num('t2', 'Of these four shapes, how many always have four right angles: square, rectangle, rhombus, parallelogram?', 2, {
      h: ['A rhombus can be pushed over into a slanted diamond. What about a parallelogram?'],
      s: 'A square and a rectangle always have four right angles. A rhombus and parallelogram can lean, so they do not have to.',
      w: [['1', 'A rectangle has four right angles, and so does a square. Count both.'], ['4', 'A pushed-over rhombus has no right angles at all.']],
    }),
  ],

  learn: [
    p('A <b>quadrilateral</b> is a closed shape with four straight sides. Draw one diagonal and you split it into two triangles, so the four angles add up to 2 × 180°.'),
    rule('<b>Angles.</b> The four angles of any quadrilateral add to 360°.'),
    p('Quadrilaterals form a family tree. Each member has all the properties of the ones it descends from.'),
    tbl(['Shape', 'What defines it', 'Extra facts'], [
      ['Trapezoid', 'at least one pair of parallel sides', 'area = ½(b₁ + b₂)h'],
      ['Parallelogram', 'two pairs of parallel sides', 'opposite sides and angles equal; neighbor angles add to 180°; diagonals cut each other in half'],
      ['Rectangle', 'parallelogram with four right angles', 'diagonals are equal in length'],
      ['Rhombus', 'parallelogram with four equal sides', 'diagonals are perpendicular and bisect the angles'],
      ['Square', 'rectangle and rhombus at once', 'all of the above'],
      ['Kite', 'two pairs of equal neighbor sides', 'diagonals are perpendicular'],
    ], 'The family'),
    rule('<b>The tree.</b> Every square is a rectangle and a rhombus. Every rectangle and every rhombus is a parallelogram. But a rectangle is not always a square, because it can be long and skinny.'),
    widget('areaShapes', { shape: 'parallelogram', b: 6, h: 4 }),
    ex('Angles of a parallelogram', ['One angle of a parallelogram is 65°. Find the others.', 'Opposite angles are equal, so another angle is also 65°.', 'The other two angles are equal to each other, and the total is 360°: (360 − 130) ÷ 2 = 115°.', 'Neighbor angles always add to 180°: 65 + 115.']),
    rule('<b>Rhombus and kite area.</b> If the diagonals cross at a right angle, the area is ½ × d₁ × d₂ (half the product of the diagonals). Picture a rectangle around the shape whose sides are d₁ and d₂: the shape fills exactly half of it.'),
    ex('A rhombus from its diagonals', ['A rhombus has diagonals 6 and 8. Find its area and its side.', 'Area = ½ × 6 × 8 = 24.', 'The diagonals cross at right angles and cut each other in half, making four right triangles with legs 3 and 4.', 'The side of the rhombus is the hypotenuse: 5.']),
    warn('<b>Watch out.</b> "Rectangle" and "square" are not opposites. The word <i>always</i> is what matters: a square is always a rectangle, but a rectangle is only sometimes a square.'),
    mcq('Ava says: "A rhombus has four equal sides, so every rhombus is a square." What is wrong?', ['Nothing, she is right.', 'A rhombus can be slanted, with angles that are not right angles. A square also needs four right angles.', 'A rhombus has only two equal sides.'], 1, 'Equal sides are not enough. A diamond shape leaning to one side is a rhombus but not a square. Every square is a rhombus, though.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Three angles of a quadrilateral are 70°, 110°, and 95°. What is the fourth?', 85, {
      h: ['The total is 360.'], s: '70 + 110 + 95 = 275. 360 − 275 = 85.',
      w: [['95', 'That is 275 − 180: you used 180 as the total. The angles of a quadrilateral add to 360.']],
    }),
    num('p2', 'One angle of a parallelogram is 65°. What is the angle next to it?', 115, {
      h: ['Neighbor angles in a parallelogram add to 180°.'], s: '180 − 65 = 115.',
      w: [['65', 'That is the opposite angle. The neighbor makes 180 together with it.'], ['25', 'That would make 90. In a parallelogram, neighbors make 180.']],
    }),
    num('p3', 'A rhombus has diagonals of length 10 and 24. What is its area?', 120, {
      h: ['½ × d₁ × d₂.'], s: '½ × 10 × 24 = 120.',
      w: [['240', 'You forgot the half.']],
    }),
    num('p4', 'The same rhombus (diagonals 10 and 24) has what side length?', 13, {
      h: ['The diagonals cut each other in half at a right angle.', 'Half-diagonals: 5 and 12.'], s: 'Right triangle with legs 5 and 12 has hypotenuse 13.',
      w: [['17', 'You added the diagonals\' halves. Use the Pythagorean theorem.'], ['34', 'That is 10 + 24. The side is the hypotenuse of a triangle with legs 5 and 12.']],
    }),
    num('p5', 'A kite has diagonals 9 and 14 that cross at right angles. What is its area?', 63, {
      h: ['Same rule as a rhombus.'], s: '½ × 9 × 14 = 63.',
      w: [['126', 'You forgot the half.']],
    }),
    num('p6', 'How many of these six shapes always have two pairs of parallel sides: square, rectangle, rhombus, kite, parallelogram, trapezoid?', 4, {
      h: ['Check the table: which shapes are kinds of parallelograms?'], s: 'Square, rectangle, rhombus, and parallelogram. A kite and a general trapezoid do not.',
      w: [['2', 'Rhombuses and parallelograms also have two pairs of parallel sides.'], ['5', 'A general trapezoid has only one pair of parallel sides.']],
    }),
    num('p7', 'A rhombus has perimeter 52 and one diagonal of length 10. How long is the other diagonal?', 24, {
      h: ['Find the side first.', 'Half a diagonal is 5. Use a right triangle with hypotenuse = side.'], s: 'Side = 52 ÷ 4 = 13. A half-diagonal is 5, so the other half-diagonal is 12 (5-12-13). The full diagonal is 24.',
      w: [['12', 'That is half the diagonal. The diagonals cut each other in half, so double it.'], ['42', 'You subtracted the diagonal from the perimeter, which does not mean anything here. Find the side, then use a right triangle.']],
    }),
    num('p8', 'An isosceles trapezoid has parallel sides 10 and 20, and each of the two slanted sides is 13 long. What is its area? (Drop perpendiculars from the ends of the short side to the long side.)', 180, {
      h: ['The two overhangs at the ends add up to 20 − 10. How long is each?', 'Each slanted side is the hypotenuse of a triangle with one leg 5. What is the height?'], s: 'Each overhang is 5. The height is √(13² − 5²) = 12. Area = ½ × (10 + 20) × 12 = 180.',
      w: [['195', 'You used 13, a slanted side, as the height. The height is the perpendicular leg: 12.'], ['360', 'You forgot the ½.']],
    }),
  ],

  challenge: [
    chain('The rhombus tile', 'A rhombus-shaped floor tile has diagonals of length 16 and 30.', [
      num('c1a', 'How long is each side of the tile?', 17, { h: ['Half-diagonals 8 and 15 form a right triangle.'], s: '8² + 15² = 289 = 17².' }),
      num('c1b', 'What is the perimeter of the tile?', 68, { h: ['Four equal sides.'], s: '4 × 17 = 68.' }),
      num('c1c', 'What is the area of the tile?', 240, { h: ['½ × d₁ × d₂.'], s: '½ × 16 × 30 = 240.' }),
    ], 'The idea: the diagonals of a rhombus cut it into four identical right triangles. That gives both the side and the area.'),
    chain('The garden bed', 'A garden bed is an isosceles trapezoid. The parallel sides are 14 and 32, and each slanted side is 15.', [
      num('c2a', 'How far does the long side stick out beyond the short side at each end?', 9, { h: ['Total extra: 32 − 14. Split evenly between two ends.'], s: '(32 − 14) ÷ 2 = 9.' }),
      num('c2b', 'How tall is the bed (the perpendicular distance between the parallel sides)?', 12, { h: ['A right triangle with hypotenuse 15 and leg 9. This is a 3-4-5 triangle times 3.'], s: '15² − 9² = 144, so the height is 12.' }),
      num('c2c', 'What is its area?', 276, { h: ['½ × (14 + 32) × 12.'], s: '23 × 12 = 276.' }),
    ], 'The idea: to measure a trapezoid with slanted sides, drop perpendiculars and use the right triangles that appear at the ends.'),
    mc('c3', 'Find the error. Dev says a rhombus with diagonals 6 and 8 has area 6 × 8 = 48. What is wrong?', ['He forgot the half. The rhombus fills half of the 6 by 8 rectangle around it, so the area is 24.', 'Nothing, 48 is right.', 'He should have added: 6 + 8 = 14.', 'The area should be 6 × 8 × 2.'], 0, {
      s: 'Draw a 6 by 8 rectangle around the rhombus with its corners at the middles of the rectangle\'s sides. The rhombus covers half the rectangle: 24.',
      w: [[1, 'The rectangle around the rhombus has area 48, but the rhombus fills just half of it.']],
    }),
  ],

  quiz: [
    tpl('missAngle', (r) => {
      const a = r.int(70, 110), b = r.int(70, 110), c = r.int(70, 110);
      return N('Three angles of a quadrilateral are ' + a + '°, ' + b + '°, and ' + c + '°. How many degrees is the fourth angle?', 360 - a - b - c, { s: '360 − ' + (a + b + c) + ' = ' + (360 - a - b - c) + '.', w: ws(360 - a - b - c, [[a + b + c - 180, 'That is the total of the three angles minus 180. The angle sum of a quadrilateral is 360, not 180.']]) });
    }),
    tpl('parAngle', (r) => {
      const a = r.int(41, 139);
      return N('One angle of a parallelogram is ' + a + '°. How big is an angle next to it?', 180 - a, { s: 'Neighbor angles add to 180: ' + (180 - a) + '.', w: ws(180 - a, [[90 - a > 0 ? 90 - a : 999, 'Neighbors add to 180, not 90.']].filter((x) => x[0] !== 999)) });
    }),
    tpl('rhombArea', (r) => {
      const d1 = r.int(3, 30), d2 = r.int(2, 15) * 2;
      return N('A rhombus has diagonals ' + d1 + ' and ' + d2 + '. What is its area?', (d1 * d2) / 2, { s: '½ × ' + d1 + ' × ' + d2 + ' = ' + (d1 * d2) / 2 + '.', w: ws((d1 * d2) / 2, [[d1 * d2, 'Take half of the product of the diagonals.']]) });
    }),
    tpl('rhombSide', (r) => {
      const [a0, b0, c] = r.pick(TRI), k = r.int(1, 9), sw = r.bool(), a = sw ? b0 : a0, b = sw ? a0 : b0;
      return N('A rhombus has diagonals ' + 2 * k * a + ' and ' + 2 * k * b + '. How long is each side?', k * c, { s: 'Half-diagonals ' + k * a + ' and ' + k * b + ' form a right triangle with hypotenuse ' + k * c + '.', w: ws(k * c, [[k * (a + b), 'Use the Pythagorean theorem on the half-diagonals.']]) });
    }),
    tpl('rhombPerim', (r) => {
      const [a0, b0, c] = r.pick(TRI), k = r.int(1, 9), sw = r.bool(), a = sw ? b0 : a0, b = sw ? a0 : b0;
      return N('A rhombus has diagonals ' + 2 * k * a + ' and ' + 2 * k * b + '. What is its perimeter?', 4 * k * c, { s: 'Side = ' + k * c + ' (right triangle with legs ' + k * a + ' and ' + k * b + '). Perimeter = 4 × ' + k * c + ' = ' + 4 * k * c + '.', w: ws(4 * k * c, [[2 * k * (a + b), 'The side is the hypotenuse of the half-diagonal triangle.']]) });
    }),
    tpl('kite', (r) => {
      const d1 = r.int(4, 40), d2 = r.int(2, 20) * 2;
      return N(name(r) + ' has a kite whose diagonals cross at right angles and have lengths ' + d1 + ' and ' + d2 + '. What is the area of the kite?', (d1 * d2) / 2, { s: '½ × ' + d1 + ' × ' + d2 + ' = ' + (d1 * d2) / 2 + '.', w: ws((d1 * d2) / 2, [[d1 * d2, 'Half the product of the diagonals.']]) });
    }),
    tpl('isoTrap', (r) => {
      const [a, b, c] = r.pick(TRI), k = r.int(1, 5), top = r.int(2, 12);
      const bottom = top + 2 * k * a;
      return N('An isosceles trapezoid has parallel sides ' + top + ' and ' + bottom + '. Each slanted side is ' + k * c + '. What is its area?', ((top + bottom) * k * b) / 2, { s: 'Overhang at each end ' + k * a + ', height ' + k * b + '. Area ½ × ' + (top + bottom) + ' × ' + k * b + ' = ' + ((top + bottom) * k * b) / 2 + '.', w: ws(((top + bottom) * k * b) / 2, [[((top + bottom) * k * c) / 2, 'The slanted side is not the height. Find the perpendicular height first.']]) });
    }),
  ],
});
