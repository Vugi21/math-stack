import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const POLY = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon' };

export default lesson({
  id: 'm4-1-1-lines-angles-and-polygons',
  title: 'Lines, angles and polygons',
  blurb: 'The words of geometry: points, lines, rays, angles, and the names and parts of polygons.',
  concepts: ['lines-rays-segments', 'angle-types', 'polygons', 'regular-polygons'],

  tryFirst: [
    num('t1', 'A closed flat shape has only straight sides. It has 3 more sides than a triangle. How many corners does it have?', 6, {
      h: ['A triangle has 3 sides.', 'In a closed shape with straight sides, the number of corners equals the number of sides.'],
      s: '3 + 3 = 6 sides, so it has 6 corners. It is a hexagon.',
      w: [['3', 'That is the triangle itself. The new shape has 3 more sides than the triangle.']],
    }),
    num('t2', 'Four dots are on a page. No three dots lie on one straight line. You draw a segment between every pair of dots. How many segments do you draw?', 6, {
      h: ['Call the dots A, B, C, D. List the segments that start at A.', 'A has 3 segments. Then B has 2 new ones. Keep going.'],
      s: 'A joins B, C, D: 3 segments. B joins C, D: 2 new. C joins D: 1 new. 3 + 2 + 1 = 6.',
      w: [['12', 'You counted each segment twice. AB and BA are the same segment.'], ['4', 'Four dots make more than four segments. Each dot joins 3 others.']],
    }),
  ],

  learn: [
    p('Geometry has its own small vocabulary. Each word means exactly one thing. If you learn these words carefully now, every later lesson on shapes, angles and area will be much easier to read.'),
    def('point', 'An exact spot. It has no size at all. We name points with capital letters, like A and B.'),
    def('line', 'A straight path that goes on forever in <b>both</b> directions. It has no ends, so it cannot be measured.'),
    def('ray', 'A straight path with <b>one</b> end that goes on forever the other way. It starts at a point and never stops.'),
    def('segment', 'A straight path with <b>two</b> ends. It has a length, so you can measure it with a ruler.'),
    tbl(['Name', 'Ends', 'Can you measure it?'], [['line', '0 ends', 'no, it never stops'], ['ray', '1 end', 'no, it never stops'], ['segment', '2 ends', 'yes']], 'Three kinds of straight paths'),
    tip('To remember: a <b>segment</b> is a <b>section</b> cut off at both ends. Anything that never stops cannot have a length you can write down.'),
    def('angle', 'Two rays that start at the same point. The shared point is called the <b>vertex</b>. The angle tells how far one ray must turn to land on the other.'),
    def('degree', 'The unit for measuring angles. A full turn all the way around is <b>360 degrees</b>, written 360°. A half turn is 180°. A quarter turn is 90°.'),
    rule('<b>Kinds of angle.</b> A <b>right</b> angle is exactly 90°, a quarter turn. <b>Acute</b> means smaller than 90°. <b>Obtuse</b> means bigger than 90° and smaller than 180°. A <b>straight</b> angle is exactly 180°. A <b>reflex</b> angle is bigger than 180°.'),
    widget('angleExplorer', { a: 50 }),
    tip('<b>Acute</b> sounds like "a cute little angle", and it is the small one. Obtuse is the wide, blunt one.'),
    def('polygon', 'A closed flat shape made only of straight segments. The segments are its <b>sides</b>. Two sides meet at a <b>vertex</b> (plural: vertices, also called corners).'),
    key('A polygon always has the <b>same number of sides and vertices</b>. Count one and you know the other.'),
    tbl(['Sides', 'Name'], [['3', 'triangle'], ['4', 'quadrilateral'], ['5', 'pentagon'], ['6', 'hexagon'], ['7', 'heptagon'], ['8', 'octagon'], ['9', 'nonagon'], ['10', 'decagon']], 'Polygon names'),
    def('regular polygon', 'A polygon whose sides are <b>all equal</b> and whose angles are <b>all equal</b>.'),
    formula('Perimeter of a regular polygon', 'perimeter = number of sides × side length', 'A regular hexagon with side 5 has perimeter 6 × 5 = 30.'),
    warn('<b>Watch out.</b> Equal sides are not enough. A thin diamond can have 4 equal sides, but its angles are not all equal. So it is not regular.'),
    ex('Counting diagonals', ['A <b>diagonal</b> joins two corners that are not next to each other. How many diagonals does a pentagon have?', 'From one corner you can reach 4 other corners. Two of them are neighbors. So 2 diagonals start at each corner.', '5 corners × 2 = 10. But each diagonal has two ends, so we counted each one twice.', '10 ÷ 2 = 5 diagonals.']),
    ex('Counting segments between dots', ['Five dots, no three on one straight line. How many segments join every pair?', 'Dot A joins 4 others. Dot B adds 3 new ones. Dot C adds 2. Dot D adds 1.', '4 + 3 + 2 + 1 = 10 segments.']),
    mcq('Priya says: "A ray is shorter than a line, so I can measure it." What is wrong?', ['Nothing. Rays can be measured.', 'A ray goes on forever in one direction, so it has no length. Only a segment can be measured.', 'A ray has two ends.'], 1, 'A ray has one end and never stops on the other side. It has no length. A segment on the ray can be measured.', 'Spot the mistake'),
    recap([['line', 'no ends, goes on both ways'], ['ray', 'one end, goes on one way'], ['segment', 'two ends, can be measured'], ['angle', 'two rays from one vertex'], ['polygon', 'closed shape made of straight segments'], ['regular', 'all sides equal and all angles equal']], [['Right angle', '90°'], ['Straight angle', '180°'], ['Full turn', '360°'], ['Perimeter, regular polygon', 'sides × side length']]),
  ],

  practice: [
    mc('p1', 'Two polygons have 15 sides in all. One is a hexagon. What is the other one called?', ['pentagon', 'heptagon', 'octagon', 'nonagon'], 3, {
      h: ['A hexagon has 6 sides. How many are left?'],
      s: '15 − 6 = 9 sides. A polygon with 9 sides is a nonagon.',
      w: [[2, 'An octagon has 8 sides. 6 + 8 = 14, not 15.'], [1, 'A heptagon has 7 sides. 6 + 7 = 13.']],
    }),
    num('p2', 'Five dots are on a page, with no three on one line. Every pair of dots is joined by a segment. How many segments are drawn?', 10, {
      h: ['Each dot joins 4 others.', 'Do not count a segment twice.'],
      s: '5 dots × 4 segments each = 20. Each segment was counted from both ends, so 20 ÷ 2 = 10.',
      w: [['20', 'Each segment was counted twice, once from each end. Cut it in half.'], ['15', 'Count again: the numbers 4 + 3 + 2 + 1 add to 10.']],
    }),
    num('p3', 'These angles are measured in degrees: 15, 90, 89, 91, 120, 45. How many of them are acute?', 3, {
      h: ['Acute means smaller than 90.', 'Is 90 acute? It is a right angle.'],
      s: '15, 89 and 45 are smaller than 90. That is 3.',
      w: [['4', 'The 90° angle is a right angle, not an acute one.'], ['2', 'Check 89. It is just under 90, so it is acute.']],
    }),
    num('p4', 'A regular polygon has 2 more sides than a pentagon. Each side is 5 long. What is its perimeter?', 35, {
      h: ['First find the number of sides.', 'Perimeter is the total length around.'],
      s: 'A pentagon has 5 sides, so the polygon has 7 sides. 7 × 5 = 35.',
      w: [['25', 'That is a pentagon with side 5. The shape has 2 more sides.'], ['30', 'That uses 6 sides. A pentagon plus 2 sides is 7 sides.']],
    }),
    num('p5', 'How many diagonals does a hexagon have? (A diagonal joins two corners that are not neighbors.)', 9, {
      h: ['From one corner, 3 corners are not neighbors and not itself.', '6 corners × 3 counts each diagonal twice.'],
      s: 'Each corner starts 3 diagonals. 6 × 3 = 18. Each diagonal is counted from both ends: 18 ÷ 2 = 9.',
      w: [['18', 'You counted every diagonal twice. Divide by 2.'], ['12', 'Check how many corners each corner can reach without using a side: 3, not 4.']],
    }),
    num('p6', 'A straight cut is made across a square sheet of paper. The cut splits it into two pieces, and each piece is a polygon. What is the greatest number of sides one piece can have?', 5, {
      h: ['Try cutting off one corner.', 'The big piece loses a corner, but it gets two new corners where the cut meets the edges.'],
      s: 'Cut across two neighboring sides to slice off a corner. The small piece is a triangle. The big piece has 4 − 1 + 2 = 5 corners, so 5 sides.',
      w: [['4', 'A cut straight across from one side to the opposite side gives two pieces with 4 sides each. Try a cut that crosses two neighboring sides instead.'], ['6', 'A single straight cut adds at most 2 new corners, and it removes a corner when it cuts one off. Recount.']],
    }),
    num('p7', 'A polygon is cut by one diagonal into a triangle and a quadrilateral. How many sides did the polygon have?', 5, {
      h: ['The diagonal is a side of both new shapes.', 'Add the sides of both pieces, then remove the shared diagonal counted twice.'],
      s: 'The pieces have 3 + 4 = 7 sides in all. The diagonal is counted in both, so take away 2: 7 − 2 = 5. It was a pentagon.',
      w: [['7', 'The diagonal was not a side of the original shape, and it is counted in both pieces. Take away 2.'], ['6', 'Remove the diagonal from both pieces: 7 − 2.']],
    }),
  ],

  challenge: [
    chain('Diagonals', 'A pentagon has 5 corners. A diagonal joins two corners that are not neighbors.', [
      num('c1a', 'How many diagonals start at one corner of a pentagon?', 2, { h: ['Cross out the corner itself and its two neighbors.'], s: '5 − 3 = 2.' }),
      num('c1b', 'How many diagonals does the pentagon have in all?', 5, { h: ['Each of the 5 corners starts 2 diagonals, but each diagonal has 2 ends.'], s: '5 × 2 = 10 ends, 10 ÷ 2 = 5.' }),
      num('c1c', 'How many diagonals does an octagon have?', 20, { h: ['How many diagonals start at one corner of an octagon?'], s: 'Each corner starts 8 − 3 = 5. 8 × 5 = 40. Halve it: 20.' }),
    ], 'The idea: count from every corner, then divide by 2 because each diagonal was counted from both ends.'),
    chain('Mystery polygon', 'A regular polygon has side length 7 and perimeter 56.', [
      num('c2a', 'How many sides does it have?', 8, { h: ['How many 7s make 56?'], s: '56 ÷ 7 = 8.' }),
      num('c2b', 'A second regular polygon has 3 fewer sides and side length 9. What is its perimeter?', 45, { h: ['It has 8 − 3 sides.'], s: '5 sides × 9 = 45.' }),
      num('c2c', 'How much longer is the first perimeter than the second?', 11, { h: ['Subtract the two perimeters.'], s: '56 − 45 = 11.' }),
    ], 'The idea: a regular polygon is its side count times its side length. Find the count first.'),
    mc('c3', 'Find the error. Ravi says: "A regular polygon has all sides equal, so any 4-sided shape with 4 equal sides is a square."', ['He is right.', 'Equal sides are not enough. A slanted diamond has 4 equal sides but its angles are not all right angles.', 'A square needs 5 equal sides.', 'Regular polygons only have 3 sides.'], 1, {
      s: 'Regular needs equal sides and equal angles. A diamond pushed over keeps its side lengths but its angles change.',
      w: [[0, 'Try pushing two opposite corners of a square toward each other. The sides stay equal but the shape is no longer a square.'], [2, 'A square has 4 sides.']],
    }),
  ],

  quiz: [
    tpl('perim', (r) => {
      const n = r.int(5, 10), s = r.int(2, 20);
      return N('A regular ' + POLY[n] + ' has side length ' + s + '. What is its perimeter?', n * s, { s: POLY[n] + ': ' + n + ' sides. ' + n + ' × ' + s + ' = ' + n * s + '.', w: [[(n - 1) * s, 'A ' + POLY[n] + ' has ' + n + ' sides, not ' + (n - 1) + '.']] });
    }),
    tpl('segs', (r) => {
      const k = r.int(4, 12), nm = name(r);
      const v = (k * (k - 1)) / 2;
      return N(nm + ' puts ' + k + ' dots on a page, no three on one line, and joins every pair with a segment. How many segments?', v, { s: k + ' × ' + (k - 1) + ' = ' + k * (k - 1) + ' counts each segment twice. Half: ' + v + '.', w: [[k * (k - 1), 'Each segment was counted from both ends. Halve it.']] });
    }),
    tpl('diag', (r) => {
      const n = r.int(5, 14), nm = name(r);
      const v = (n * (n - 3)) / 2;
      return N(nm + ' draws every diagonal of a polygon with ' + n + ' sides. How many diagonals is that?', v, { s: 'Each corner starts ' + (n - 3) + ' diagonals. ' + n + ' × ' + (n - 3) + ' = ' + n * (n - 3) + ', halved: ' + v + '.', w: [[n * (n - 3), 'Each diagonal was counted twice. Halve it.']] });
    }),
    tpl('acute', (r) => {
      const a = r.distinct(7, 5, 175).map((x) => x), arr = a.concat([90]);
      const list = r.shuffle(arr);
      const c = list.filter((x) => x < 90).length;
      return N('Angles in degrees: ' + list.join(', ') + '. How many are acute?', c, { s: 'Acute means less than 90. Those are ' + list.filter((x) => x < 90).join(', ') + ': ' + c + ' of them. 90 is a right angle.', w: [[list.filter((x) => x <= 90).length, '90° is a right angle, not an acute one.']] });
    }),
    tpl('sidesFrom', (r) => {
      const n = r.int(3, 12), s = r.int(2, 15);
      return N('A regular polygon has perimeter ' + n * s + ' and each side is ' + s + ' long. How many corners does it have?', n, { s: n * s + ' ÷ ' + s + ' = ' + n + ' sides, so ' + n + ' corners.' });
    }),
    tpl('cut', (r) => {
      const n = r.int(4, 20), nm = name(r);
      return N(nm + ' cuts a regular polygon with ' + n + ' sides along a diagonal, cutting off a triangle. The diagonal joins two corners that have exactly one corner between them. How many sides does the remaining piece have?', n - 1, { s: 'The cut removes one corner and adds one side: the diagonal. ' + n + ' − 1 = ' + (n - 1) + '.', w: [[n, 'One corner is gone, so there is one fewer side than before.']] });
    }),
    tpl('bigcut', (r) => {
      const n = r.int(3, 15), nm = name(r);
      return N(nm + ' makes one straight cut across a polygon with ' + n + ' sides. The polygon is convex (no dents). What is the greatest number of sides one of the two pieces can have?', n + 1, { s: 'Cut across two neighboring sides. The big piece loses 1 corner and gains 2, so it has ' + n + ' + 1 = ' + (n + 1) + ' sides.', w: [[n, 'A cut across two neighboring sides gives the big piece one more side than you started with.'], [n + 2, 'The big piece loses a corner and gains two. That is one more side, not two more.']] });
    }),
  ],
});
