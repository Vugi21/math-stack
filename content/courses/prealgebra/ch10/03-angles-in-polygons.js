import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const DIV360 = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120];
const ord = (n) => ({ 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 8: 'octagon', 10: 'decagon', 12: 'dodecagon' }[n] || n + '-sided polygon');

export default lesson({
  id: 'pre-10-3-angles-in-polygons',
  title: 'Angles in polygons',
  blurb: 'Why a triangle has 180 degrees, and how cutting a polygon into triangles gives the angle sum of any shape.',
  concepts: ['polygon-angles', 'triangle-angle-sum', 'exterior-angles', 'regular-polygons'],

  tryFirst: [
    num('t1', 'Draw any triangle on paper, tear off its three corners, and put them side by side with the points together. They form a straight line. So the three angles of a triangle add up to how many degrees?', 180, {
      h: ['A straight line is a half turn.'],
      s: 'The three corners fit together into a straight line: 180°.',
      w: [['360', 'A full turn is 360, but the corners only make a half turn, a straight line.']],
    }),
    num('t2', 'A four-sided shape can be cut by one straight line (corner to opposite corner) into two triangles. Using the triangle fact, what do the four angles of any quadrilateral add up to? (Assume the diagonal stays inside the shape.)', 360, {
      h: ['Each triangle has angles that add to 180°.'],
      s: 'Two triangles: 2 × 180 = 360°.',
      w: [['180', 'There are two triangles, each contributes 180.']],
    }),
  ],

  learn: [
    p('<b>Triangle angle sum.</b> In any triangle, the three angles add to <b>180°</b>. Here is why. Draw a line through the top corner parallel to the base. The two alternate-interior angles at the sides match the two base angles, and together with the top angle they fill a straight line: 180°.'),
    widget('polygonAngles', { n: 5 }),
    rule('<b>Polygon angle sum.</b> A polygon with n sides can be cut into <b>(n − 2)</b> triangles by drawing all diagonals from one corner. So its angles add up to <b>(n − 2) × 180°</b>.'),
    tbl(['Sides', 'Name', 'Triangles', 'Angle sum'], [['3', 'triangle', '1', '180°'], ['4', 'quadrilateral', '2', '360°'], ['5', 'pentagon', '3', '540°'], ['6', 'hexagon', '4', '720°'], ['8', 'octagon', '6', '1080°']], 'Each extra side adds one more triangle, so 180° more'),
    ex('Each angle of a regular hexagon', ['A regular polygon has all sides equal and all angles equal.', 'A hexagon has 6 sides: (6 − 2) × 180 = 720° in total.', 'Six equal angles: 720 ÷ 6 = 120° each.', 'Sanity check: 120° is bigger than a right angle, which fits the wide-open corners of a honeycomb cell.']),
    rule('<b>Exterior angles.</b> Walk around a polygon. At each corner you turn by the exterior angle, and after the full trip you have turned exactly one full circle. So the exterior angles add to <b>360°</b> for any polygon, and each exterior angle of a regular n-gon is 360 ÷ n. The interior angle and its exterior angle add to 180°.'),
    ex('A faster way to find sides', ['Each interior angle of a regular polygon is 156°. How many sides?', 'The exterior angle is 180 − 156 = 24°.', 'The number of sides is 360 ÷ 24 = 15.', 'Check: (15 − 2) × 180 ÷ 15 = 156. Yes.']),
    p('<b>Counting diagonals.</b> A diagonal joins two corners that are not neighbours. Each corner connects to n − 3 others (not itself and not its two neighbours). That gives n(n − 3) endpoint-pairs, but every diagonal was counted from both ends, so divide by 2: <b>n(n − 3) ÷ 2</b> diagonals.'),
    warn('<b>Watch out.</b> The angle sum is (n − 2) × 180°, not n × 180°. A triangle has n = 3: 1 × 180, not 3 × 180. And the exterior angles always add to 360° no matter how many sides there are. Do not confuse the angle sum with the size of one angle.'),
    mcq('Chloe says: "A pentagon can be cut into 5 triangles, so its angles add to 5 × 180 = 900°." What goes wrong?', ['Nothing, 5 sides means 5 triangles.', 'Triangles all coming from the middle count the 360° around the centre point too. From one corner a pentagon gives only 3 triangles: 3 × 180 = 540°.', 'A pentagon has 6 triangles.'], 1, 'Cutting from a centre point gives 5 triangles, but the 360° around the middle is not an angle of the pentagon. 5 × 180 − 360 = 540. Same as 3 × 180.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is the sum of the interior angles of a decagon (10 sides)?', 1440, {
      h: ['A polygon with n sides gives n − 2 triangles.'],
      s: '(10 − 2) × 180 = 8 × 180 = 1440°.',
      w: [['1800', 'That is 10 × 180. Use n − 2 triangles.'], ['1620', 'That is 9 × 180: one triangle too many. n − 2 = 8.']],
    }),
    num('p2', 'Each interior angle of a regular octagon is how many degrees?', 135, {
      h: ['Find the total for 8 sides, then divide among 8 equal angles.'],
      s: '(8 − 2) × 180 = 1080 and 1080 ÷ 8 = 135°.',
      w: [['1080', 'That is the total of all angles. Divide it by 8.'], ['45', 'That is the exterior angle (360 ÷ 8). The interior angle is 180 − 45.']],
    }),
    num('p3', 'A regular polygon has exterior angles of 20° each. How many sides does it have?', 18, {
      h: ['The exterior angles add to 360°.'],
      s: '360 ÷ 20 = 18 sides.',
      w: [['160', 'That is the interior angle (180 − 20). Divide 360 by the exterior angle for the number of sides.'], ['9', 'That is 180 ÷ 20. The exterior angles add to 360.']],
    }),
    num('p4', 'Four angles of a pentagon are 100°, 110°, 120° and 90°. What is the fifth angle?', 120, {
      h: ['Find the pentagon total first.', '540 − (100 + 110 + 120 + 90).'],
      s: 'The angle sum is 540°. 100 + 110 + 120 + 90 = 420, and 540 − 420 = 120°.',
      w: [['180', 'You used 360 − ... or the triangle sum. A pentagon totals 540.'], ['420', 'That is the sum of the four known angles. Subtract it from 540.']],
    }),
    num('p5', 'How many diagonals does a hexagon have?', 9, {
      h: ['Each corner has 6 − 3 = 3 diagonals. Do not count every diagonal twice.'],
      s: '6 × 3 = 18 counts every diagonal twice, so 18 ÷ 2 = 9.',
      w: [['18', 'That counts each diagonal from both ends. Divide by 2.'], ['15', 'That is every line between two corners (including the 6 sides). Diagonals leave the sides out.']],
    }),
    num('p6', 'In a triangle, the angles are in the ratio 2 : 3 : 4. What is the largest angle, in degrees?', 80, {
      h: ['2 + 3 + 4 = 9 parts make 180°.'],
      s: '180 ÷ 9 = 20° per part. The largest has 4 parts: 80°.',
      w: [['40', 'That is the smallest angle (2 parts).'], ['20', 'That is one part. The largest angle has 4.']],
    }),
    num('p7', 'A regular polygon has interior angles of 162°. How many sides does it have?', 20, {
      h: ['The exterior angle is 180 − 162.', 'Divide 360 by the exterior angle.'],
      s: 'Exterior angle = 18°. 360 ÷ 18 = 20 sides.',
      w: [['18', 'That is the exterior angle. Divide 360 by it.'], ['10', '360 ÷ 36 would give 10. The exterior angle is 18, not 36.']],
    }),
  ],

  challenge: [
    chain('Star trek', 'A regular pentagon is drawn, and its sides are extended to make a pentagram (five-point star).', [
      num('c1a', 'Each interior angle of the regular pentagon is how many degrees?', 108, { h: ['540 ÷ 5.'], s: '(5 − 2) × 180 ÷ 5 = 108°.' }),
      num('c1b', 'Extending the two sides at a corner makes an exterior angle with the other side. What is the exterior angle at one corner of the pentagon?', 72, { h: ['180 − 108.'], s: '180 − 108 = 72°.' }),
      num('c1c', 'A point of the star is a triangle sitting on one side of the pentagon. Its two base angles are each 72°. What is the tip angle of the star?', 36, { h: ['The three angles of the triangle add to 180°.'], s: '180 − 72 − 72 = 36°.' }),
    ], 'The idea: build a larger shape from small steps, using one fact at a time (interior angle, straight line, triangle sum).'),
    chain('Counting everything', 'Think about a polygon with 12 sides.', [
      num('c2a', 'What is its angle sum?', 1800, { h: ['(12 − 2) × 180.'], s: '10 × 180 = 1800°.' }),
      num('c2b', 'How many diagonals does it have?', 54, { h: ['12 × 9 ÷ 2.'], s: '12 × (12 − 3) ÷ 2 = 54.' }),
      num('c2c', 'If it is regular, what is the exterior angle at each corner?', 30, { h: ['360 ÷ 12.'], s: '360 ÷ 12 = 30°. (Interior is 150°.)' }),
    ], 'The idea: a polygon\'s numbers all follow from one number, n. The interior sum grows by 180° per side, the exterior sum never changes.'),
    mc('c3', 'Find the error. Dev says: "A regular polygon with 9 sides has exterior angles of 360 ÷ 9 = 40°, so each interior angle is 360 − 40 = 320°." What is wrong?', ['The interior angle and the exterior angle lie on a straight line, so they add to 180°, not 360°. The interior angle is 140°.', 'The exterior angle should be 90°.', 'Nothing is wrong.', 'A regular polygon with 9 sides does not exist.'], 0, {
      s: 'Interior + exterior = 180° (a straight line). 180 − 40 = 140°. Check: (9 − 2) × 180 ÷ 9 = 140°.',
      w: [[2, 'An interior angle of 320° would be a reflex angle, far more than a regular nonagon\'s corner.'], [1, '360 ÷ 9 is 40, not 90.']],
    }),
  ],

  quiz: [
    tpl('sum', (r) => {
      const n = r.int(3, 40);
      return N('What is the sum of the interior angles of a polygon with ' + n + ' sides, in degrees?', (n - 2) * 180, { s: '(' + n + ' − 2) × 180 = ' + (n - 2) * 180 + '.', w: [[n * 180, 'Use n − 2 triangles, not n.'], [(n - 1) * 180, 'You are one triangle over. A polygon with n sides gives n − 2 triangles.']] });
    }),
    tpl('each', (r) => {
      const n = r.pick(DIV360), nm = name(r);
      const a = 180 - 360 / n;
      return N(nm + ' draws a regular ' + ord(n) + ' (' + n + ' equal sides and equal angles). How big is each interior angle in degrees?', a, { s: '(' + n + ' − 2) × 180 ÷ ' + n + ' = ' + a + '. Or exterior ' + 360 / n + ' and 180 − ' + 360 / n + '.', w: [[360 / n, 'That is the exterior angle. The interior is 180 minus it.']].filter((x) => x[0] !== a) });
    }),
    tpl('sides', (r) => {
      const n = r.pick(DIV360), a = 180 - 360 / n, nm = name(r);
      return N(nm + ' finds that each interior angle of a regular polygon is ' + a + '°. How many sides does it have?', n, { s: 'Exterior = 180 − ' + a + ' = ' + 360 / n + '. Sides = 360 ÷ ' + 360 / n + ' = ' + n + '.', w: [[360 / n, 'That is the exterior angle. The number of sides is 360 divided by it.']] });
    }),
    tpl('ext', (r) => {
      const n = r.pick(DIV360), e = 360 / n, nm = name(r);
      return N(nm + ' studies a regular polygon that has an exterior angle of ' + e + '° at every corner. How many sides does it have?', n, { s: '360 ÷ ' + e + ' = ' + n + '.', w: [[180 - e, 'That is the interior angle.']].filter((x) => x[0] !== n) });
    }),
    tpl('missing', (r) => {
      let n, parts, last;
      do { n = r.int(4, 8); parts = []; for (let i = 0; i < n - 1; i++) parts.push(r.int(80, 160)); last = (n - 2) * 180 - parts.reduce((s, v) => s + v, 0); } while (last < 30 || last > 170);
      return N('A polygon with ' + n + ' sides has these angles: ' + parts.map((v) => v + '°').join(', ') + ', and one more. How big is the last angle?', last, { s: 'The total is ' + (n - 2) * 180 + '°. Subtract the known angles to get ' + last + '°.', w: [[(n - 2) * 180, 'That is the total. Subtract the angles you already know.']] });
    }),
    tpl('diag', (r) => {
      const n = r.int(4, 40);
      return N('How many diagonals does a polygon with ' + n + ' sides have?', n * (n - 3) / 2, { s: 'Each corner has ' + (n - 3) + ' diagonals, giving ' + n + ' × ' + (n - 3) + ' = ' + n * (n - 3) + ', and each is counted twice: ' + n * (n - 3) / 2 + '.', w: [[n * (n - 3), 'Each diagonal was counted from both ends. Halve it.']] });
    }),
    tpl('ratio', (r) => {
      let a, b, c, t;
      do { a = r.int(1, 6); b = r.int(a + 1, 8); c = r.int(b + 1, 12); t = a + b + c; } while (180 % t);
      const u = 180 / t;
      return N('The angles of a triangle are in the ratio ' + a + ' : ' + b + ' : ' + c + '. How big is the largest angle, in degrees?', c * u, { s: 'There are ' + t + ' parts in 180°, so one part is ' + u + '°. Largest: ' + c + ' × ' + u + ' = ' + c * u + '°.', w: [[a * u, 'That is the smallest angle.']] });
    }),
    tpl('iso', (r) => {
      const base = r.int(20, 80), mode = r.bool();
      return mode
        ? N('An isosceles triangle has two equal base angles of ' + base + '° each. What is the third angle?', 180 - 2 * base, { s: '180 − ' + base + ' − ' + base + ' = ' + (180 - 2 * base) + '.', w: [[180 - base, 'There are two equal base angles. Subtract both.']] })
        : N('An isosceles triangle has a top angle of ' + (180 - 2 * base) + '°. What is each of the two equal base angles?', base, { s: '(180 − ' + (180 - 2 * base) + ') ÷ 2 = ' + base + '.', w: [[180 - 2 * base, 'That is the top angle. Split what is left (180 minus it) between two equal base angles.']].filter((x) => x[0] !== base) });
    }),
  ],
});
