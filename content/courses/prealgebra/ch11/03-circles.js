import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);

export default lesson({
  id: 'pre-11-3-circles',
  title: 'Circles, circumference, and area',
  blurb: 'Why every circle has the same magic number, and how to leave answers "in terms of π" so they stay exact.',
  concepts: ['circle', 'circumference', 'pi', 'circle-area'],

  tryFirst: [
    num('t1', 'A round table has a diameter of 10. You wrap a tape measure once around its edge and it reads 31.4. What is 31.4 ÷ 10?', 3.14, {
      h: ['Just divide. Move the decimal point.'],
      s: '31.4 ÷ 10 = 3.14. Try this with any circle: the distance around divided by the distance across always comes out about 3.14.',
      w: [['314', 'Dividing by 10 moves the decimal one place to the left, not two to the right.']],
    }),
    num('t2', 'A circle has a diameter of 14. A smaller circle with radius 4 sits inside it with the same center. How far is the edge of the small circle from the edge of the big one, measured along a radius?', 3, {
      h: ['Is 14 a radius or a diameter? Find the big radius first.'],
      s: 'The big radius is 14 ÷ 2 = 7. The gap is 7 − 4 = 3.',
      w: [['10', 'You subtracted the diameter 14 − 4. The distance from the center to the edge is the radius, which is half of 14.']],
    }),
  ],

  learn: [
    def('circle', 'The set of all points in a plane that are the same distance from one fixed point, the <b>center</b>.'),
    def('radius and diameter', 'The <b>radius</b> r is the distance from the center to the circle. The <b>diameter</b> d is a segment across the circle through the center, so d = 2r and r = d ÷ 2.'),
    def('circumference', 'The distance around a circle: its perimeter. It is a length, so it is measured in cm, m, ft and so on.'),
    widget('circleExplorer', { r: 3 }),
    p('Slide the radius and look at the numbers. Whatever the size of the circle, circumference ÷ diameter comes out the same. That fixed number is called <b>π</b> (pi). It is about 3.14, a little more than 3, and its decimals never end or repeat, so we usually just write the symbol π. Walking around any circle takes a bit more than three times the distance across it.'),
    formula('Circumference', 'C = π × d = 2 × π × r', 'd is the diameter and r the radius. The two forms are the same because d = 2r. A circle with radius 5 has circumference 10π.'),
    p('To see where the area formula comes from, picture a square built on the radius, r by r, with area r². A circle holds exactly π of these radius-squares, about 3.14 of them, which is slightly more than 3.'),
    formula('Area of a circle', 'A = π × r × r = πr²', 'r is the radius, and it is the radius (not the diameter) that gets squared. A circle with radius 5 has area 25π.'),
    rule('<b>Circle formulas use the radius.</b> Circumference is C = 2πr and area is A = πr². Given a diameter, halve it first.'),
    p('Answers "in terms of π" are exact: 25π is the true area, while 78.5 (which is 25 × 3.14) is only an approximation. In this lesson, answers are written as a number times π, so you type just the number in front of the π.'),
    ex('Radius or diameter?', ['A circle has diameter 16. Find its circumference and area.', 'Circumference: C = π × 16 = 16π.', 'For area we need the radius: 16 ÷ 2 = 8.', 'A = π × 8² = 64π. (Not π × 16², which would be 256π.)']),
    ex('Working backward', ['A circle has circumference 18π. Find its radius. Then a different circle has area 100π: find its radius.', 'C = 2πr, so 2r = 18 and r = 9.', 'A = πr², so r² = 100. What number times itself is 100? r = 10.', 'The first step is dividing out the π, then undoing the 2 (for circumference) or the square (for area).']),
    ex('A ring', ['A flat ring (washer) has outer radius 8 and inner radius 5. Find its area.', 'Outer disk: π × 64 = 64π.', 'Hole: π × 25 = 25π.', 'Ring = 64π − 25π = 39π. Subtract the areas, not the radii.']),
    ex('A half circle', ['A semicircle is half of a disk with radius 10. Find its area.', 'The full circle has area π × 100 = 100π.', 'Half of it is 50π.']),
    tip('<b>How size changes.</b> If the radius doubles, the circumference doubles (it is a length) but the area becomes 4 times as large (it is r × r). Tripling the radius multiplies the area by 9.'),
    tip('<b>Quick estimate.</b> To check an answer, replace π by 3. A circle with radius 5 has circumference near 2 × 3 × 5 = 30 and area near 3 × 25 = 75. Exact answers 10π and 25π are slightly bigger, which matches.'),
    warn('<b>Watch out.</b> The two most common slips are using the diameter where the formula needs the radius, and mixing up circumference (a length, no square) with area (square units, has r²). The edge of a semicircle also includes its flat side, so its perimeter is more than half the circumference.'),
    key('Before you use any circle formula, find the <b>radius</b>. If the problem gives the diameter, halve it. Then decide: is the question about the distance around (circumference, C = 2πr) or about the space inside (area, A = πr²)?'),
    mcq('A circle has diameter 10. Zoe writes: "Area = π × 10² = 100π." What is wrong?', ['Nothing, that is right.', 'The 10 is the diameter. The radius is 5, so the area is π × 5² = 25π.', 'The area should be 10π.'], 1, 'The area formula uses the radius. Half of 10 is 5, so A = π × 25 = 25π. Using the diameter by mistake gives 4 times too much.', 'Spot the mistake'),
    recap([['radius', 'center to circle; r = d ÷ 2'], ['diameter', 'across through the center; d = 2r'], ['circumference', 'distance around a circle'], ['π', 'circumference ÷ diameter, about 3.14']], [['Circumference', 'C = πd = 2πr'], ['Area', 'A = πr²'], ['Semicircle area', 'A = ½πr²'], ['Ring area (outer R, inner r)', 'A = π(R² − r²)']]),
  ],

  practice: [
    num('p1', 'A circle has radius 7. Its circumference is __π. What number goes in the blank?', 14, {
      h: ['C = 2πr.'], s: '2 × 7 = 14, so C = 14π.',
      w: [['49', '49 is r², the area number. Circumference only uses r once.'], ['7', 'Do not forget the 2: circumference is 2πr.']],
    }),
    num('p2', 'A circle has radius 7. Its area is __π. What number goes in the blank?', 49, {
      h: ['A = πr².'], s: '7² = 49, so A = 49π.',
      w: [['14', 'That is the circumference number. Area squares the radius.']],
    }),
    num('p3', 'A circle has diameter 10. Its area is __π.', 25, {
      h: ['Find the radius first.'], s: 'r = 5, so A = π × 25 = 25π.',
      w: [['100', 'You squared the diameter. Use the radius, 5.'], ['50', 'That is 10 × 5. Square the radius, 5 × 5.']],
    }),
    num('p4', 'A circle has circumference 18π. What is its radius?', 9, {
      h: ['C = πd. So what is the diameter?'], s: 'd = 18, so r = 9.',
      w: [['18', '18 is the diameter. The radius is half of it.'], ['36', 'Going from circumference to radius means dividing, not doubling.']],
    }),
    num('p5', 'A circle has area 64π. What is its radius?', 8, {
      h: ['What number times itself is 64?'], s: 'r² = 64, so r = 8.',
      w: [['32', 'You halved the 64. The area is r squared, so undo the squaring.']],
    }),
    num('p6', 'A semicircle (half of a disk) has radius 6. Its area is __π.', 18, {
      h: ['Find the area of the whole circle, then halve it.'], s: 'Whole: 36π. Half: 18π.',
      w: [['36', 'That is the full circle. The semicircle is half of it.']],
    }),
    num('p7', 'A flat ring has outer radius 7 and inner radius 4. Its area is __π.', 33, {
      h: ['Area of the big disk minus area of the hole.'], s: '49π − 16π = 33π.',
      w: [['9', 'You squared 7 − 4. Subtract the areas, 49 and 16, not the radii.'], ['3', 'That is just the width of the ring. Find the areas of the two circles.']],
    }),
    num('p8', 'One 12-inch pizza (diameter 12) is compared with two 6-inch pizzas (diameter 6). How many π more square inches of pizza is in the big pizza than in the two small ones together?', 18, {
      h: ['Use radii: 6 and 3.', 'Big: π × 36. Each small: π × 9.'], s: 'Big: 36π. Two small: 2 × 9π = 18π. The difference is 18π, so the answer is 18. The big pizza has twice as much!',
      w: [['0', 'Twice the diameter does not mean twice the area. Compute each area using its radius.'], ['36', 'The big one has 36π. Subtract the area of the two small pizzas.']],
    }),
  ],

  challenge: [
    chain('The running track', 'A circular track has inner radius 20 meters. The track is 5 meters wide, so its outer edge has radius 25.', [
      num('c1a', 'The inner edge has length __π meters.', 40, { h: ['C = 2πr with r = 20.'], s: '2 × 20 = 40, so 40π.' }),
      num('c1b', 'The outer edge has length __π meters.', 50, { h: ['Same formula, r = 25.'], s: '2 × 25 = 50, so 50π.' }),
      num('c1c', 'How many π meters farther does a runner on the outer edge go in one lap?', 10, { h: ['Subtract the two circumferences.'], s: '50π − 40π = 10π. That is 2π × 5: it depends only on the width of 5.' }),
    ], 'The idea: circumference grows by 2π for each unit of radius. The gap between two lanes depends on how far apart they are, not how big the track is.'),
    chain('The pond', 'A circular pond with radius 5 touches all four sides of a square garden with side 10. Use π ≈ 3.14 in this problem.', [
      num('c2a', 'What is the area of the square garden?', 100, { h: ['Side times side.'], s: '10 × 10 = 100.' }),
      num('c2b', 'What is the area of the pond?', 78.5, { h: ['π × 5² = 25 × 3.14.'], s: '25 × 3.14 = 78.5.' }),
      num('c2c', 'How much of the garden is not pond?', 21.5, { h: ['Subtract.'], s: '100 − 78.5 = 21.5.' }),
    ], 'The idea: a circle inside a square takes up about 78.5% of it (that is π/4). The same fraction works for any size.'),
    mc('c3', 'Find the error. Ben says a circle with radius 5 has circumference 2π × 10 = 20π, "because the diameter is 10." What is wrong?', ['He used 2 × diameter. Using the diameter, C = π × 10 = 10π. Using the radius, C = 2π × 5 = 10π.', 'Nothing, 20π is right.', 'The circumference should be 25π.', 'He should square the radius.'], 0, {
      s: 'The 2 in 2πr is already the doubling that turns r into d. Doing it twice gives a circumference twice too big.',
      w: [[1, 'The circle with radius 5 has diameter 10 and circumference π × 10 = 10π, not 20π.'], [2, '25π is the area. Circumference is a length around.']],
    }),
  ],

  quiz: [
    tpl('circR', (r) => {
      const R = r.int(2, 40);
      return N('A circle has radius ' + R + '. Its circumference is __π. What number goes in the blank?', 2 * R, { s: '2 × ' + R + ' = ' + 2 * R + '.', w: ws(2 * R, [[R * R, 'That is the area number. Circumference is 2πr, no squaring.'], [R, 'Remember the 2 in 2πr.']]) });
    }),
    tpl('circD', (r) => {
      const D = r.int(3, 60);
      return N('A circle has diameter ' + D + '. Its circumference is __π.', D, { s: 'C = π × d = ' + D + 'π.', w: ws(D, [[2 * D, 'With the diameter, C = πd. You do not double it again.']]) });
    }),
    tpl('areaR', (r) => {
      const R = r.int(2, 30);
      return N('A circle has radius ' + R + '. Its area is __π.', R * R, { s: R + '² = ' + R * R + '.', w: ws(R * R, [[2 * R, 'That is the circumference number. Area needs r squared.']]) });
    }),
    tpl('areaD', (r) => {
      const R = r.int(2, 30);
      return N('A circle has diameter ' + 2 * R + '. Its area is __π.', R * R, { s: 'The radius is ' + R + ', so the area is ' + R + '² π = ' + R * R + 'π.', w: ws(R * R, [[4 * R * R, 'You squared the diameter. Halve it to get the radius first.']]) });
    }),
    tpl('back', (r) => {
      const R = r.int(2, 30);
      return r.bool()
        ? N('A circle has circumference ' + 2 * R + 'π. What is its radius?', R, { s: 'C = 2πr, so r = ' + R + '.', w: ws(R, [[2 * R, 'That is the diameter. The radius is half of it.']]) })
        : N('A circle has area ' + R * R + 'π. What is its radius?', R, { s: 'r² = ' + R * R + ', so r = ' + R + '.', w: ws(R, [[(R * R) / 2, 'The area is r squared, so take the square root.']]) });
    }),
    tpl('semi', (r) => {
      const R = r.int(1, 40) * 2;
      return N('A semicircle (half a disk) has radius ' + R + '. Its area is __π.', (R * R) / 2, { s: 'Full circle: ' + R * R + 'π. Half: ' + (R * R) / 2 + 'π.', w: ws((R * R) / 2, [[R * R, 'That is the whole circle.']]) });
    }),
    tpl('ring', (r) => {
      const a = r.int(2, 20), b = r.int(a + 1, a + 12);
      return N('A flat ring has outer radius ' + b + ' and inner radius ' + a + '. Its area is __π.', b * b - a * a, { s: b + '² − ' + a + '² = ' + b * b + ' − ' + a * a + ' = ' + (b * b - a * a) + '.', w: ws(b * b - a * a, [[(b - a) * (b - a), 'Subtract the areas of the two circles. Do not square the difference of the radii.']]) });
    }),
    tpl('approx', (r) => {
      const d = r.int(2, 40);
      return N('Use π ≈ 3.14. A circle has diameter ' + d + '. About how long is its circumference?', Math.round(d * 314) / 100, { s: '3.14 × ' + d + ' = ' + Math.round(d * 314) / 100 + '.', w: ws(Math.round(d * 314) / 100, [[Math.round(d * 628) / 100, 'C = πd already uses the diameter. Do not double it.']]) });
    }),
  ],
});
