import { lesson, num, mc, N, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const POLY = { 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' };

export default lesson({
  id: 'm4-1-5-perimeter-and-area',
  title: 'Perimeter and area',
  blurb: 'Distance around and space inside: rectangles, composite shapes, missing sides, and regular polygons.',
  concepts: ['perimeter', 'area', 'composite-shapes'],

  tryFirst: [
    num('t1', 'A rectangle is 9 units long and 4 units wide. What is its perimeter, the distance all the way around?', 26, {
      h: ['Walk around it: 9, then 4, then 9, then 4.'],
      s: '9 + 4 + 9 + 4 = 26.',
      w: [['36', 'That is the area, 9 × 4. Perimeter is the distance around.'], ['13', 'That is only two sides. Walk all the way around.']],
    }),
    num('t2', 'A rectangle has an area of 24 square units. One side is 6 units long. What is its perimeter?', 20, {
      h: ['Area is length times width. Find the other side first.'],
      s: '24 ÷ 6 = 4. The sides are 6 and 4. Perimeter: 6 + 4 + 6 + 4 = 20.',
      w: [['10', 'That is half the perimeter. Go all the way around.'], ['24', 'That is the area. Perimeter is the distance around.']],
    }),
  ],

  learn: [
    p('Two questions come up again and again about a flat shape. How far is it around the edge? And how much space is inside? They have different answers and different units, so we must never mix them up.'),
    def('perimeter', 'The total distance <b>around</b> a shape. To find it, add up the lengths of all the sides. It is measured in units of length, such as centimeters (cm).'),
    def('area', 'The amount of flat space <b>inside</b> a shape. We count it in <b>unit squares</b>, squares that are 1 unit on each side. It is measured in square units, such as square centimeters.'),
    widget('arrayModel', { r: 3, c1: 4, c2: 2 }),
    p('In the picture, the dots fill a rectangle: 3 rows of 6 dots. A rectangle that is 3 units by 6 units holds 3 × 6 = 18 unit squares in the same way.'),
    formula('Rectangle', 'area = length × width     perimeter = 2 × (length + width)', 'A square with side s is a rectangle with length s and width s: area = s × s and perimeter = 4 × s.'),
    key('<b>Perimeter and area answer different questions.</b> A fence around a garden is a perimeter. The grass inside it is an area. Two shapes can have the same perimeter and different areas, or the same area and different perimeters.'),
    rule('<b>Same perimeter, different area.</b> A 5 by 5 square and an 8 by 2 rectangle both have perimeter 20. Their areas are 25 and 16. For the same area it works the other way: 5 by 6 and 3 by 10 both have area 30, but their perimeters are 22 and 26.'),
    ex('Perimeter of a rectangle', ['A rectangle is 12 cm long and 5 cm wide. Find its perimeter.', 'Length plus width: 12 + 5 = 17.', 'The perimeter has two lengths and two widths: 2 × 17 = 34 cm.']),
    ex('Finding a missing side', ['A rectangle has area 56 square cm and width 7 cm. How long is it?', 'Area = length × width, so length = area ÷ width.', '56 ÷ 7 = 8 cm. Check: 8 × 7 = 56.']),
    ex('A shape made of rectangles', ['An L-shape is a 9 by 7 rectangle with a 3 by 2 rectangle cut out of one corner. Find its area.', 'Area of the big rectangle: 9 × 7 = 63.', 'Area of the piece cut out: 3 × 2 = 6.', 'Area of the L: 63 − 6 = 57.']),
    p('You can also split an L-shape into two rectangles and add them. Both ways must give the same area. That is a good check.'),
    tip('<b>Draw and label.</b> For any shape made of rectangles, sketch it and write every side length on it. If a side is missing, use the opposite sides: a missing length is the long total minus the parts you know.'),
    warn('<b>Watch out.</b> When a corner is cut out of a rectangle, the perimeter does not change. The two sides that were removed are replaced by two sides of the same total length. The area does change.'),
    rule('<b>Regular polygons.</b> Perimeter = number of sides × side length. A regular octagon with side 5 has perimeter 8 × 5 = 40.'),
    tbl(['Shape', 'Area', 'Perimeter'], [['rectangle 7 by 3', '21', '20'], ['square with side 6', '36', '24'], ['regular hexagon, side 4', 'not needed yet', '24']], 'Examples'),
    warn('<b>Units.</b> Perimeter is in cm. Area is in square cm. A length of 7 cm and an area of 7 square cm are very different things.'),
    mcq('Tom says: "If I double every side of a rectangle, its area doubles too." What is wrong?', ['Nothing, he is right.', 'Doubling both sides makes the area 4 times as big. The perimeter is the thing that doubles.', 'The area stays the same.'], 1, 'A 2 by 3 rectangle has area 6. Doubled it is 4 by 6, which has area 24. That is 4 times as big. The perimeter went from 10 to 20.', 'Spot the mistake'),
    recap([['perimeter', 'distance around, in cm'], ['area', 'space inside, in square cm'], ['unit square', 'a square 1 unit on each side']], [['Rectangle area', 'length × width'], ['Rectangle perimeter', '2 × (length + width)'], ['Square perimeter', '4 × side'], ['Regular polygon perimeter', 'sides × side length']]),
  ],

  practice: [
    num('p1', 'A square has a perimeter of 36. What is its area?', 81, {
      h: ['A square has 4 equal sides. Find one side first.'],
      s: '36 ÷ 4 = 9. Area: 9 × 9 = 81.',
      w: [['36', 'That is the perimeter. Find the side, then multiply side by side.'], ['9', 'That is one side. Area is side times side.']],
    }),
    num('p2', 'A rectangle has an area of 48 and a width of 6. What is its perimeter?', 28, {
      h: ['Find the length first.'],
      s: '48 ÷ 6 = 8. Perimeter: 2 × (8 + 6) = 28.',
      w: [['14', 'That is only length plus width. Double it for the perimeter.'], ['48', 'That is the area.']],
    }),
    num('p3', 'A floor is a 10 by 8 rectangle with a 4 by 3 rectangle cut out of one corner. What is the area of the floor?', 68, {
      h: ['Find the area of the whole rectangle, then take away the corner.'],
      s: '10 × 8 = 80. 4 × 3 = 12. 80 − 12 = 68.',
      w: [['80', 'That ignores the corner that is cut out.'], ['92', 'The corner is removed, so subtract it. Do not add it.']],
    }),
    num('p4', 'Look at the same floor: a 10 by 8 rectangle with a 4 by 3 rectangle cut out of one corner. What is its perimeter?', 36, {
      h: ['Compare it with the full rectangle. What do the notch sides add and take away?', 'The notch removes a 4 side and a 3 side, then adds a 4 side and a 3 side.'],
      s: 'The two sides that disappear are replaced by two sides of the same lengths. So the perimeter is the same as the full rectangle: 2 × (10 + 8) = 36.',
      w: [['68', 'That is the area of the floor. The question is about the distance around.'], ['29', 'You subtracted the notch sides. They are replaced by sides of the same length.']],
    }),
    num('p5', 'A garden is 12 by 7. A path 1 wide runs inside the garden along all four edges. The rest is lawn. What is the area of the lawn?', 50, {
      h: ['The path takes 1 off each end of each side.', 'Each side of the lawn is 2 shorter than the garden side.'],
      s: 'The lawn is (12 − 2) by (7 − 2), which is 10 by 5. Area: 50.',
      w: [['66', 'You took 1 off each side, not 2. The path is on both ends of every side.'], ['84', 'That is the whole garden, path included.']],
    }),
    num('p6', 'A rectangle has a perimeter of 30. Its length is 5 more than its width. What is its area?', 50, {
      h: ['Length plus width is half of 30.', 'If the length is 5 more than the width, try widths and see.'],
      s: 'Length + width = 15. If width is 5, length is 10, and 5 + 10 = 15. Area: 5 × 10 = 50.',
      w: [['10', 'That is the length. Multiply the width and length.'], ['15', 'That is length plus width. Multiply them instead.']],
    }),
    num('p7', 'Square A has a side of 6. Square B has a perimeter twice as long as the perimeter of square A. The area of B is how many times the area of A?', 4, {
      h: ['Find the side of B first.', 'Compare 36 with B\'s area.'],
      s: 'A has perimeter 24. B has perimeter 48, so its side is 12. Area of A: 36. Area of B: 144. 144 ÷ 36 = 4.',
      w: [['2', 'Perimeter doubles, but area grows faster. Check with the actual areas.']],
    }),
    num('p8', 'A rectangle has an area of 36. Its sides are whole numbers. What is the smallest perimeter it can have?', 24, {
      h: ['List the pairs with product 36: 1 and 36, 2 and 18, ...', 'Compute the perimeter of each pair.'],
      s: 'The pairs are 1×36 (74), 2×18 (40), 3×12 (30), 4×9 (26), 6×6 (24). The smallest is 24.',
      w: [['26', 'The 6 by 6 square is also allowed, and it is smaller still.'], ['74', 'That is the largest perimeter, from the 1 by 36 strip.']],
    }),
  ],

  challenge: [
    chain('The tiled room', 'A room is 12 tiles long and 9 tiles wide. Each tile is a unit square. The tiles along all four walls are red. The rest are white.', [
      num('c1a', 'How many tiles are there in all?', 108, { h: ['Length times width.'], s: '12 × 9 = 108.' }),
      num('c1b', 'The white tiles form a rectangle. How many white tiles are there?', 70, { h: ['Each side of the white rectangle is 2 shorter.'], s: '10 × 7 = 70.' }),
      num('c1c', 'How many red tiles are there?', 38, { h: ['Total minus white.'], s: '108 − 70 = 38.' }),
    ], 'The idea: to count a border, take the inner rectangle away from the whole. Each side of the inner rectangle is 2 shorter.'),
    chain('Perimeter 24', 'Rectangles with whole-number sides all have a perimeter of 24.', [
      num('c2a', 'How much is length plus width?', 12, { h: ['Half the perimeter.'], s: '24 ÷ 2 = 12.' }),
      num('c2b', 'What is the largest area such a rectangle can have?', 36, { h: ['Try 6 by 6, 7 by 5, 8 by 4, and so on.'], s: '6 × 6 = 36. Others are 35, 32, 27, 20, 11.' }),
      num('c2c', 'What is the smallest area such a rectangle can have?', 11, { h: ['The thinnest rectangle has width 1.'], s: '11 by 1 gives 11.' }),
      num('c2d', 'How much bigger is the largest area than the smallest?', 25, { h: ['Subtract.'], s: '36 − 11 = 25.' }),
    ], 'The idea: with a fixed perimeter, the closer the rectangle is to a square, the larger its area.'),
    mc('c3', 'Find the error. Eva says: "A rectangle with perimeter 20 has a larger area than a rectangle with perimeter 16, always."', ['She is right.', 'Not always. A 9 by 1 rectangle has perimeter 20 and area 9, but a 4 by 4 square has perimeter 16 and area 16.', 'The one with the smaller perimeter always has the larger area.', 'Area and perimeter are always equal.'], 1, {
      s: '9 by 1: perimeter 20, area 9. 4 by 4: perimeter 16, area 16. A long, thin rectangle can have a big perimeter and a small area.',
      w: [[0, 'Test 9 by 1 against 4 by 4.'], [2, 'It is not always the smaller one either. Compare a 5 by 5 square and a 3 by 3 square.']],
    }),
  ],

  quiz: [
    tpl('areaFromPerim', (r) => {
      const w = r.int(2, 14), l = w + r.int(1, 12), nm = name(r);
      return N(nm + ' has a rectangle with perimeter ' + 2 * (l + w) + ' and one side ' + l + '. What is its area?', l * w, { s: 'Length plus width is ' + (l + w) + ', so the other side is ' + w + '. ' + l + ' × ' + w + ' = ' + l * w + '.', w: [[l + w, 'That is length plus width. Multiply them for the area.']] });
    }),
    tpl('notch', (r) => {
      const a = r.int(8, 20), b = r.int(6, 15), c = r.int(2, 5), d = r.int(2, 4), askArea = r.bool();
      const base = 'A rectangle is ' + a + ' by ' + b + '. A ' + c + ' by ' + d + ' rectangle is cut out of one corner. ';
      if (askArea) return N(base + 'What is the area that is left?', a * b - c * d, { s: a + ' × ' + b + ' = ' + a * b + '. ' + c + ' × ' + d + ' = ' + c * d + '. ' + a * b + ' − ' + c * d + ' = ' + (a * b - c * d) + '.', w: [[a * b, 'Take away the piece that was cut out.']] });
      return N(base + 'What is the perimeter of the shape that is left?', 2 * (a + b), { s: 'Cutting a corner out does not change the perimeter. 2 × (' + a + ' + ' + b + ') = ' + 2 * (a + b) + '.', w: [[2 * (a + b) - 2 * (c + d), 'The notch sides are replaced by sides of the same total length.']] });
    }),
    tpl('square', (r) => {
      const s = r.int(5, 25), fromP = r.bool();
      if (fromP) return N('A square has a perimeter of ' + 4 * s + '. What is its area?', s * s, { s: 'Side: ' + 4 * s + ' ÷ 4 = ' + s + '. Area: ' + s + ' × ' + s + ' = ' + s * s + '.', w: [[4 * s, 'That is the perimeter. Find the side first.']] });
      return N('A square has an area of ' + s * s + '. What is its perimeter?', 4 * s, { s: 'The side is ' + s + ' because ' + s + ' × ' + s + ' = ' + s * s + '. Perimeter: 4 × ' + s + ' = ' + 4 * s + '.', w: [[s * s, 'That is the area. Find the side, then go around.']] });
    }),
    tpl('regular', (r) => {
      const n = r.int(3, 10), askSide = r.bool();
      let s = r.int(3, 20); if (s === n) s += 1;
      const nmz = POLY[n];
      if (askSide) return N('A regular ' + nmz + ' has a perimeter of ' + n * s + '. How long is each side?', s, { s: n * s + ' ÷ ' + n + ' = ' + s + '.', w: [[n, 'Divide the perimeter by the number of sides.']] });
      return N('A regular ' + nmz + ' has sides of length ' + s + '. What is its perimeter?', n * s, { s: n + ' × ' + s + ' = ' + n * s + '.', w: [[n + s, 'Multiply the number of sides by the side length.']] });
    }),
    tpl('moreThan', (r) => {
      const w = r.int(2, 15), k = r.int(1, 9), askArea = r.bool();
      const P = 2 * (2 * w + k);
      const q = 'A rectangle has a perimeter of ' + P + '. Its length is ' + k + ' more than its width. ';
      if (askArea) return N(q + 'What is its area?', w * (w + k), { s: 'Length + width = ' + P / 2 + '. The width is ' + w + ' and the length is ' + (w + k) + '. Area: ' + w * (w + k) + '.', w: [[w + k, 'That is the length. Multiply length by width.']] });
      return N(q + 'What is its width?', w, { s: 'Length + width = ' + P / 2 + '. Take off the extra ' + k + ': ' + (P / 2 - k) + ' is two widths. Width: ' + w + '.', w: [[w + k, 'That is the length, not the width.']] });
    }),
    tpl('lawn', (r) => {
      const t = r.int(1, 3), a = 2 * t + r.int(3, 14), b = 2 * t + r.int(2, 12), nm = name(r);
      return N(nm + ' has a ' + a + ' by ' + b + ' garden with a path ' + t + ' wide inside along all four edges. What is the area of the lawn in the middle?', (a - 2 * t) * (b - 2 * t), { s: 'The lawn is ' + (a - 2 * t) + ' by ' + (b - 2 * t) + ': ' + (a - 2 * t) * (b - 2 * t) + '.', w: [[(a - t) * (b - t), 'The path is on both ends of each side, so take off ' + 2 * t + ', not ' + t + '.']] });
    }),
    tpl('scale', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), k = r.int(2, 5);
      return N('A rectangle is ' + a + ' by ' + b + '. Every side is made ' + k + ' times as long. What is the area of the new rectangle?', a * b * k * k, { s: 'New sides: ' + a * k + ' and ' + b * k + '. ' + a * k + ' × ' + b * k + ' = ' + a * b * k * k + '.', w: [[a * b * k, 'Both sides grow, so the area grows ' + k + ' × ' + k + ' times.']] });
    }),
    tpl('minperim', (r) => {
      const s = r.int(3, 16), nm = name(r);
      return N(nm + ' wants a rectangle with area ' + s * s + ' and whole-number sides. What is the smallest perimeter it can have?', 4 * s, { s: 'The closest to a square is ' + s + ' by ' + s + '. Perimeter: ' + 4 * s + '.', w: [[2 * (s * s + 1), 'That is the longest, thinnest rectangle: 1 by ' + s * s + '. You want the smallest.']] });
    }),
  ],
});
