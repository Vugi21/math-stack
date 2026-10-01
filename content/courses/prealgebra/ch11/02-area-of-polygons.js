import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);

export default lesson({
  id: 'pre-11-2-area-of-polygons',
  title: 'Area of rectangles, triangles, and friends',
  blurb: 'Area is a count of squares. Rectangles lead to parallelograms, triangles, and trapezoids by cutting and rearranging.',
  concepts: ['area', 'triangle-area', 'trapezoid', 'composite-shapes'],

  tryFirst: [
    num('t1', 'A right triangle has legs 6 and 8. What is its area? (Hint: what shape do you get if you put two copies together?)', 24, {
      h: ['Put two copies together along the long slanted side. You get a rectangle.', 'The rectangle is 6 by 8.'],
      s: 'Two copies make a 6 by 8 rectangle, area 48. One triangle is half: 24.',
      w: [['48', 'That is the rectangle made by two triangles. One triangle is half of it.'], ['14', 'You added the legs. Area counts squares, so multiply, then take half.']],
    }),
    num('t2', 'A 7 by 5 rectangle has a 3 by 2 rectangle cut out of one corner. How many unit squares are left?', 29, {
      h: ['How many squares in the full rectangle? How many removed?'],
      s: '7 × 5 = 35, and 3 × 2 = 6 are removed: 35 − 6 = 29.',
      w: [['35', 'That is before the cut. Take away the corner piece.']],
    }),
  ],

  learn: [
    p('<b>Area</b> counts how many unit squares cover a shape. A rectangle that is 5 wide and 3 tall holds 3 rows of 5 squares: 3 × 5 = 15. So <b>area of a rectangle = length × width</b>, measured in square units.'),
    widget('unitSquare', { w: 6, h: 4 }),
    rule('<b>Parallelogram.</b> Slice off the slanted end and slide it to the other side. The result is a rectangle with the same base and the same <i>height</i>. So area = base × height, where height is the straight-up distance between the two parallel sides, not the slanted side.'),
    widget('areaShapes', { shape: 'parallelogram', b: 6, h: 4 }),
    rule('<b>Triangle.</b> Two copies of any triangle fit together into a parallelogram. So a triangle is half of base × height: area = ½ × b × h.'),
    widget('areaShapes', { shape: 'triangle', b: 8, h: 5 }),
    rule('<b>Trapezoid.</b> A trapezoid has two parallel sides. Average the parallel sides, then multiply by the height: area = ½ × (b₁ + b₂) × h. Two copies flipped together make a parallelogram with base b₁ + b₂.'),
    widget('areaShapes', { shape: 'trapezoid', b: 9, t: 5, h: 4 }),
    ex('Cut it into pieces you know', ['A shape is a 10 by 6 rectangle with a triangle sitting on its top side. The triangle has base 10 (the top of the rectangle) and height 4. Find the total area.', 'Rectangle: 10 × 6 = 60.', 'Triangle: ½ × 10 × 4 = 20.', 'Add: 60 + 20 = 80. When a shape is made of pieces, add them. When a piece is missing, subtract it.']),
    warn('<b>Watch out.</b> The height must be perpendicular to the base (straight up, at a right angle). In a slanted shape, the slanted side is always longer than the true height, so using it overstates the area.'),
    mcq('A parallelogram has a base of 10, a slanted side of 6, and a height of 5. Leo says its area is 10 × 6 = 60. What is wrong?', ['Nothing, the area is 60.', 'He used the slanted side. The height is the perpendicular 5, so the area is 10 × 5 = 50.', 'He should have added 10 + 6 + 5.'], 1, 'Height means straight-up distance between the parallel sides. The 6 is a slant. Area = base × height = 10 × 5 = 50.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A triangle has base 14 and height 9. Find its area.', 63, {
      h: ['Multiply base by height, then take half.'], s: '14 × 9 = 126, half is 63.',
      w: [['126', 'That is a parallelogram with the same base and height. The triangle is half of it.']],
    }),
    num('p2', 'A parallelogram has base 12, a slanted side of 9, and a height of 7. Find its area.', 84, {
      h: ['Which of these numbers is the perpendicular height?'], s: '12 × 7 = 84. The slanted side 9 is not used.',
      w: [['108', 'You multiplied by the slanted side. Use the perpendicular height, 7.']],
    }),
    num('p3', 'A trapezoid has parallel sides 9 and 15 and a height of 6. Find its area.', 72, {
      h: ['Average the parallel sides first.'], s: 'Average of 9 and 15 is 12. 12 × 6 = 72.',
      w: [['144', 'You forgot the ½. (9 + 15) × 6 would be two trapezoids side by side.'], ['54', 'You multiplied 9 × 6. A trapezoid uses the average of both parallel sides.']],
    }),
    num('p4', 'A 12 by 9 rectangle has a 5 by 4 rectangle cut out of one corner. What is the area of what remains?', 88, {
      h: ['Find both areas, then subtract.'], s: '12 × 9 = 108. 5 × 4 = 20. 108 − 20 = 88.',
      w: [['20', 'That is the piece that was removed.'], ['128', 'You added. The notch is cut away, so subtract it.']],
    }),
    num('p5', 'A triangle has area 30 and base 12. What is its height?', 5, {
      h: ['Two copies of the triangle would have area 60.', 'Base times height equals that doubled area.'], s: 'Doubling gives 60 = 12 × h, so h = 5.',
      w: [['2.5', 'You divided 30 by 12. But 30 is half of base × height, so double it first.']],
    }),
    num('p6', 'A rectangle has area 48 and perimeter 28. How long is its longer side?', 8, {
      h: ['Half the perimeter is length + width.', 'Find two numbers that add to 14 and multiply to 48.'], s: 'length + width = 14. Pairs that multiply to 48: 6 × 8 adds to 14. The longer side is 8.',
      w: [['6', 'That is the shorter side. Which one is longer?'], ['14', '14 is length + width, half the perimeter.']],
    }),
    mc('p7', 'Which triangle has the greatest area?', ['base 10, height 4', 'base 6, height 7', 'base 8, height 5', 'base 5, height 9'], 3, {
      h: ['The areas are half of base × height. Compare base × height.'],
      s: 'Products: 40, 42, 40, 45. Base 5 and height 9 wins with area 22.5.',
      w: [[0, 'The longest base does not guarantee the largest area. Compute all four products.']],
    }),
    num('p8', 'A rectangle is 8 wide and 6 tall. A point is marked anywhere on its top side. Lines join it to the two bottom corners, making a triangle sitting on the bottom side. What is the triangle\'s area? (Try two different positions of the point.)', 24, {
      h: ['The base is the bottom side. How tall is the triangle?', 'Does moving the point along the top change the height?'],
      s: 'Base 8, height 6, so ½ × 8 × 6 = 24. Sliding the point along the top never changes the height, so the area is always half the rectangle.',
      w: [['48', 'That is the whole rectangle. The triangle is half of base times height.']],
    }),
  ],

  challenge: [
    chain('The sails', 'A small ship has a triangular sail with base 6 and height 10 (feet). It also flies a trapezoid flag with parallel sides 4 and 6 and height 2.', [
      num('c1a', 'What is the area of one sail?', 30, { h: ['½ × base × height.'], s: '½ × 6 × 10 = 30 square feet.' }),
      num('c1b', 'What is the area of the flag?', 10, { h: ['Average the parallel sides: 5.'], s: '½ × (4 + 6) × 2 = 10.' }),
      num('c1c', 'The ship carries 3 sails and 1 flag. How much cloth do they cover together?', 100, { h: ['3 sails, plus the flag.'], s: '3 × 30 + 10 = 100 square feet.' }),
    ], 'The idea: every polygon area problem is a few pieces you know, added or subtracted.'),
    chain('The diamond', 'A rectangle is 12 wide and 8 tall. Mark the midpoint of each of its four sides, and join neighboring midpoints to make a diamond inside.', [
      num('c2a', 'What is the area of the rectangle?', 96, { h: ['Length times width.'], s: '12 × 8 = 96.' }),
      num('c2b', 'Each corner of the rectangle is cut off by one side of the diamond, leaving a right triangle with legs 6 and 4. What is the area of one such triangle?', 12, { h: ['½ × 6 × 4.'], s: '½ × 6 × 4 = 12.' }),
      num('c2c', 'What is the area of the diamond?', 48, { h: ['Four corner triangles come off the rectangle.'], s: '96 − 4 × 12 = 48. The diamond is exactly half of the rectangle.' }),
    ], 'The idea: when you cannot see a formula, subtract what you do not want from a shape you know. The diamond always takes up half of its box.'),
    mc('c3', 'Find the error. Dev says a trapezoid with parallel sides 9 and 5 and height 4 has area (9 + 5) × 4 = 56. What went wrong?', ['He should have multiplied the parallel sides: 9 × 5 × 4.', 'He forgot to take half. The area is ½ × 14 × 4 = 28.', 'Nothing, 56 is correct.', 'The height should have been added.'], 1, {
      s: '(9 + 5) × 4 would be a parallelogram of base 14. Two flipped copies of the trapezoid make that, so one trapezoid is half: 28.',
      w: [[2, 'Two trapezoids, one flipped, fit together into a parallelogram of base 14 and height 4. That has area 56, so the trapezoid is half.']],
    }),
  ],

  quiz: [
    tpl('tri', (r) => {
      const b = r.int(3, 30), h = r.int(2, 24) * 2 - (b % 2 ? 0 : 1) * 0;
      const hh = b % 2 ? h : r.int(2, 30);
      return N('A triangle has base ' + b + ' and height ' + hh + '. What is its area?', (b * hh) / 2, { s: '½ × ' + b + ' × ' + hh + ' = ' + (b * hh) / 2 + '.', w: ws((b * hh) / 2, [[b * hh, 'That is the parallelogram. Take half for a triangle.']]) });
    }),
    tpl('para', (r) => {
      const b = r.int(4, 30), h = r.int(3, 20), sl = h + r.int(1, 6);
      return N('A parallelogram has base ' + b + ', a slanted side of ' + sl + ', and height ' + h + '. What is its area?', b * h, { s: 'Use the height, not the slant: ' + b + ' × ' + h + ' = ' + b * h + '.', w: ws(b * h, [[b * sl, 'The slanted side is not the height. Use the perpendicular height.']]) });
    }),
    tpl('trap', (r) => {
      const a = r.int(3, 20), b = r.int(a + 1, a + 15); let h = r.int(2, 14);
      if (((a + b) * h) % 2) h++;
      return N('A trapezoid has parallel sides ' + a + ' and ' + b + ' and height ' + h + '. What is its area?', ((a + b) * h) / 2, { s: '½ × (' + a + ' + ' + b + ') × ' + h + ' = ' + ((a + b) * h) / 2 + '.', w: ws(((a + b) * h) / 2, [[(a + b) * h, 'You forgot the ½.'], [a * h, 'Use the average of both parallel sides, not just one.']]) });
    }),
    tpl('notch', (r) => {
      const W = r.int(8, 30), H = r.int(6, 25), w = r.int(2, W - 3), h = r.int(2, H - 3);
      return N('A ' + W + ' by ' + H + ' rectangle has a ' + w + ' by ' + h + ' rectangle cut out of one corner. What is the area of the remaining L-shape?', W * H - w * h, { s: W + ' × ' + H + ' − ' + w + ' × ' + h + ' = ' + (W * H - w * h) + '.', w: ws(W * H - w * h, [[W * H + w * h, 'The notch is removed, so subtract.']]) });
    }),
    tpl('findH', (r) => {
      const b = r.int(2, 20), h = r.int(2, 20), kind = r.int(0, 2);
      if (kind === 0) return N('A triangle has area ' + (b * h) / 2 + ' and base ' + b + '. What is its height? (Use a decimal or fraction if needed.)', h, { s: 'Doubling the area gives ' + b * h + ' = ' + b + ' × h, so h = ' + h + '.', w: ws(h, [[(b * h) / 2 / b, 'Double the area first: a triangle is half of base times height.']]) });
      if (kind === 1) return N('A parallelogram has area ' + b * h + ' and base ' + b + '. What is its height?', h, { s: b * h + ' ÷ ' + b + ' = ' + h + '.', w: ws(h, [[(b * h) / 2 / b, 'For a parallelogram there is no ½.']]) });
      return N('A rectangle has area ' + b * h + ' and one side ' + b + '. How long is the other side?', h, { s: b * h + ' ÷ ' + b + ' = ' + h + '.' });
    }),
    tpl('scale', (r) => {
      const l = r.int(2, 12), w = r.int(2, 12), k = r.int(2, 5);
      return N(name(r) + ' has a ' + l + ' by ' + w + ' rectangle and makes every side ' + k + ' times as long. What is the new area?', k * k * l * w, { s: 'New sides: ' + k * l + ' and ' + k * w + '. Area ' + k * l * k * w + '. Areas grow ' + k + ' × ' + k + ' = ' + k * k + ' times.', w: ws(k * k * l * w, [[k * l * w, 'Lengths multiply by ' + k + ', but area grows in both directions.']]) });
    }),
    tpl('house', (r) => {
      const b = r.int(2, 12) * 2, rh = r.int(3, 15), t = r.int(2, 14);
      return N('A "house" shape is a rectangle ' + b + ' wide and ' + rh + ' tall with a triangular roof on top. The roof has base ' + b + ' and height ' + t + '. What is the total area?', b * rh + (b * t) / 2, { s: 'Rectangle ' + b * rh + ' plus roof ' + (b * t) / 2 + ' = ' + (b * rh + (b * t) / 2) + '.', w: ws(b * rh + (b * t) / 2, [[b * rh + b * t, 'The roof is a triangle, so it is half of base × height.']]) });
    }),
  ],
});
