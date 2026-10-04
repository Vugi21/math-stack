import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

export default lesson({
  id: 'pre-10-2-parallel-lines-and-transversals',
  title: 'Parallel lines and transversals',
  blurb: 'When a line cuts across two parallel lines, only two different angle sizes appear. Find them all from one.',
  concepts: ['parallel-lines', 'transversal', 'alternate-interior', 'corresponding-angles'],

  tryFirst: [
    num('t1', 'Picture two railroad tracks that never meet (parallel lines). A road crosses both. At the first crossing, the road and the track make a 70° angle on the upper right. The crossing at the second track looks exactly the same, just moved down. What is the size of the upper-right angle at the second crossing?', 70, {
      h: ['The second crossing is the same picture slid along the road.'],
      s: 'Because the tracks are parallel, the second crossing is a copy of the first, so the upper-right angle there is also 70°.',
      w: [['110', '110° would be the neighbour on the straight line. The same-position angle at the second crossing matches 70°.']],
    }),
    num('t2', 'Two straight lines cross. One of the four angles is 70°. What is each of the other two different angles (the ones next to it)?', 110, {
      h: ['They sit on a straight line with the 70° angle.'],
      s: '180 − 70 = 110°.',
      w: [['290', 'Around the point you have 360, but a neighbour on a straight line is 180 − 70.']],
    }),
  ],

  learn: [
    p('Parallel lines show up in railway tracks, ruled paper and the edges of a window. When another line cuts across them, a neat pattern of equal angles appears. Knowing the pattern lets you find many angles from just one.'),
    def('parallel lines', 'Two lines in a flat surface that never meet, however far they are extended, because they point in exactly the same direction. We write l ∥ m.'),
    def('transversal', 'A line that crosses two or more other lines. When it crosses two lines it makes 8 angles, 4 at each crossing.'),
    widget('transversal', { a: 60, pick: 2 }),
    p('The big idea: because the lines point the same way, the picture at the second crossing is a slid copy of the picture at the first crossing. Everything else in this lesson comes from that idea.'),
    def('corresponding angles', 'Angles that sit in the same position at the two crossings (both upper right, say). When the lines are parallel, corresponding angles are <b>equal</b>. Slide the top crossing down the transversal and it lands exactly on the bottom one.'),
    p('From corresponding angles, the other pairs follow with the facts from the last lesson (vertical angles are equal, a straight line is 180°):'),
    rule('<b>Parallel lines and a transversal.</b> Corresponding angles are equal. Alternate interior angles are equal. Co-interior angles add to 180°. All three need the lines to be parallel.'),
    tbl(['Pair', 'Where', 'Relationship'], [['corresponding', 'same spot at each crossing (F shape)', 'equal'], ['alternate interior', 'between the lines, opposite sides of the transversal (Z shape)', 'equal'], ['co-interior', 'between the lines, same side of the transversal (C shape)', 'add to 180°'], ['vertical', 'opposite at one crossing', 'equal']], 'Angle pairs for parallel lines'),
    tip('<b>Letter shapes help you recognise the pairs.</b> F for corresponding, Z for alternate interior, C (or U) for co-interior. Trace the shape on the picture, and you see which two angles are paired.'),
    ex('Finding all eight from one', ['One angle at the top crossing is 65°.', 'Vertical angle: the opposite angle is 65°. Neighbours on a straight line: 180 − 65 = 115°, twice.', 'Corresponding angles copy these to the second crossing: 65°, 65°, 115°, 115°.', 'So four angles are 65° and four are 115°.']),
    key('When parallel lines are cut by a transversal that is not at right angles to them, there are only <b>two</b> angle sizes, a° and (180 − a)°. Any two of the eight angles are either equal or add to 180°. So you only need to decide which kind of pair you are looking at.'),
    ex('Finding x', ['Parallel lines are cut by a transversal. Two corresponding angles are (5x + 8)° and (7x − 12)°. Find x.', 'Corresponding angles are equal: 5x + 8 = 7x − 12.', 'Add 12 to both sides: 5x + 20 = 7x, so 20 = 2x and x = 10.', 'Check: 5(10) + 8 = 58 and 7(10) − 12 = 58. Both angles are 58°.']),
    ex('A co-interior pair', ['Between parallel lines, two co-interior angles are 3x° and (2x + 20)°. Find x and both angles.', 'They add to 180: 3x + 2x + 20 = 180.', 'So 5x = 160 and x = 32.', 'The angles are 96° and 84°. Check: 96 + 84 = 180.']),
    p('<b>The test works backwards.</b> If a transversal makes equal corresponding angles (or equal alternate interior angles, or co-interior angles adding to 180°), then the two lines are parallel. A carpenter can use this to check that two edges are truly parallel.'),
    warn('<b>Watch out.</b> These facts need the lines to be <i>parallel</i>. For two lines that are not parallel, corresponding angles are not equal and co-interior angles do not add to 180°. Also do not confuse co-interior (add to 180°) with alternate interior (equal). When you solve for x, remember that x is not yet the angle: put it back in the expression.'),
    mcq('Quinn says: "Co-interior angles are equal, like alternate ones." Check with a 70° angle at the top crossing.', ['Right: both interior angles are 70°.', 'Wrong: the co-interior angle on the same side is the neighbour-type angle, 110°, so they add to 180°.', 'Wrong: they are 20° apart.'], 1, 'Between the lines on the same side of the transversal, one angle is 70° and the other is 110°. They add to 180°. The equal one is the alternate interior angle on the opposite side.', 'Spot the mistake'),
    recap([['parallel lines', 'same direction, never meet'], ['transversal', 'a line crossing the other lines'], ['corresponding', 'same position at each crossing; equal'], ['alternate interior', 'Z shape; equal'], ['co-interior', 'C shape; add to 180°']], [['Converse', 'equal corresponding or alternate angles mean parallel lines']]),
  ],

  practice: [
    num('p1', 'Two parallel lines are cut by a transversal. One angle is 48°. What is the angle that is its alternate interior partner?', 48, {
      h: ['Alternate interior angles make a Z shape.'],
      s: 'Alternate interior angles of parallel lines are equal: 48°.',
      w: [['132', 'That would be the co-interior partner (180 − 48). Alternate interior angles are equal.']],
    }),
    num('p2', 'Two parallel lines are cut by a transversal. One angle between the lines is 48°. What is the co-interior (same-side interior) angle?', 132, {
      h: ['Co-interior angles add to 180°.'],
      s: '180 − 48 = 132°.',
      w: [['48', 'Equal angles are the alternate ones. The same-side pair adds to 180.'], ['42', 'That uses 90. Co-interior angles add to 180.']],
    }),
    num('p3', 'Parallel lines are cut by a transversal. Two corresponding angles are (4x + 5)° and (6x − 25)°. Find x.', 15, {
      h: ['Corresponding angles are equal, so set the expressions equal.'],
      s: '4x + 5 = 6x − 25 gives 30 = 2x, so x = 15. Both angles are 65°.',
      w: [['-10', 'Check your sign: add 25 to both sides, then divide by 2.'], ['65', 'That is the angle size. The question asks for x.']],
    }),
    num('p4', 'Parallel lines are cut by a transversal. Two co-interior angles are (3x + 10)° and (5x + 30)°. Find x.', 17.5, {
      h: ['Co-interior angles add to 180°, not equal.', '3x + 10 + 5x + 30 = 180.'],
      s: '8x + 40 = 180, so 8x = 140 and x = 17.5.',
      w: [['10', 'Setting the two angles equal gives x = −10, and you dropped the sign. Either way, co-interior angles add to 180°, they are not equal.'], ['-10', 'You set the angles equal. Co-interior angles add to 180°, not equal.']],
    }),
    num('p5', 'Two parallel lines are cut by a transversal that makes 8 angles. How many of the 8 angles equal 55°? (None of the angles is 90°.)', 4, {
      h: ['Only two sizes appear. The 55° angles come in a set: how many at each crossing?'],
      s: 'At each crossing, a 55° angle has an opposite twin that is also 55°. That makes 2 at each crossing: 4 in all. The other 4 are 125°.',
      w: [['2', 'There are two crossings, each with 2.'], ['8', 'Only the equal ones: the neighbours are 125°.']],
    }),
    num('p6', 'Lines l and m are parallel, and a point P lies between them. A is a point on l and B is a point on m, both to the left of P. The segment AP makes a 35° angle with line l (the angle at A between AP and the rightward direction of l). The segment BP makes a 50° angle with line m (at B, between BP and the rightward direction of m). What is the angle APB at P, in degrees?', 85, {
      h: ['Draw a helper line through P parallel to l and m.', 'The helper line splits angle APB into two parts. Each equals an alternate interior angle.'],
      s: 'A line through P parallel to l and m splits angle APB into two parts. The upper part equals the 35° angle (alternate interior with l) and the lower part equals the 50° angle. So APB = 35 + 50 = 85°.',
      w: [['15', 'You subtracted. The two parts both open to the left and add up to angle APB.'], ['95', 'That is 180 − 85, the outside angle. Add the two angles for APB.']],
    }),
    num('p7', 'Two parallel lines are cut by a transversal. Two co-interior angles are in the ratio 2 : 7. What is the larger of the two, in degrees?', 140, {
      h: ['Co-interior angles add to 180°. There are 2 + 7 = 9 parts.'],
      s: '180 ÷ 9 = 20° per part. The larger angle has 7 parts: 140°.',
      w: [['40', 'That is the smaller angle (2 parts).'], ['20', 'That is one part. The larger angle is 7 parts.']],
    }),
  ],

  challenge: [
    chain('Z shape', 'Lines l and m are parallel and a transversal crosses both. Look at the angles in a Z shape: the two alternate interior angles, and the angles next to them.', [
      num('c1a', 'One interior angle of the Z is 62°. What is the other interior angle of the Z (the alternate interior one)?', 62, { h: ['Z angles are alternate interior.'], s: 'Equal: 62°.' }),
      num('c1b', 'What is the co-interior angle next to the first one, on the same side of the transversal?', 118, { h: ['They add to 180.'], s: '180 − 62 = 118.' }),
      num('c1c', 'What is the sum of the four interior angles (between the lines) at the two crossings?', 360, { h: ['Two of 62 and two of 118.'], s: '62 + 62 + 118 + 118 = 360. Two supplementary pairs always make 360.' }),
    ], 'The idea: the four angles between the two lines always add to 360° because they form two pairs that add to 180°.'),
    chain('Bent path', 'Parallel lines l and m. A bent path goes from a point A on l, down to a point P between the lines, and then to a point B on m. Both A and B are to the left of P. The path makes a 28° angle with l at A and a 41° angle with m at B, as in the practice problem.', [
      num('c2a', 'What is angle APB?', 69, { h: ['Add the two alternate interior angles.'], s: '28 + 41 = 69.' }),
      num('c2b', 'Now the angle at A is changed to 90°, and the angle at B stays 41°. What is angle APB?', 131, { h: ['Same rule, new numbers.'], s: '90 + 41 = 131.' }),
      num('c2c', 'The angle at A is x°, the angle at B is y°, and APB is 170°. What is x + y?', 170, { h: ['APB = x + y.'], s: 'The rule APB = x + y means x + y = 170.' }),
    ], 'The idea: an extra helper line parallel to the two given ones splits the bend into two angles, each known from alternate interior angles. Adding them is the whole trick.'),
    mc('c3', 'Find the error. Sam says: "Lines l and m are cut by a transversal. Two alternate interior angles are 80° and 100°, so the lines are parallel." Which is right?', ['If the lines were parallel, alternate interior angles would be equal. They are not (80 ≠ 100), so the lines are NOT parallel.', 'They add to 180°, so the lines are parallel.', 'Alternate interior angles are never equal.', 'Sam is correct.'], 0, {
      s: 'The parallel test for alternate interior angles is that they are equal. 80 and 100 differ, so l and m are not parallel.',
      w: [[1, '"Add to 180" is the test for co-interior angles, not alternate ones.'], [3, 'Alternate interior angles must be equal for parallel lines.']],
    }),
  ],

  quiz: [
    tpl('kind', (r) => {
      const a = r.int(20, 160);
      const [d, sup] = r.pick([['corresponding angle at the other crossing', 0], ['alternate interior partner', 0], ['alternate exterior partner', 0], ['co-interior (same-side interior) partner', 1], ['vertical angle', 0]]);
      const ans = sup ? 180 - a : a;
      return N('Two parallel lines are cut by a transversal. One of the eight angles measures ' + a + '°. What is the size of its ' + d + '?', ans, { s: (sup ? 'Co-interior angles add to 180: 180 − ' + a + ' = ' : 'These angles are equal: ') + ans + '°.', w: [[sup ? a : 180 - a, sup ? 'Co-interior angles are not equal. They add to 180°.' : 'That is the supplement. This pair is equal.']].filter((x) => x[0] !== ans) });
    }),
    tpl('corr', (r) => {
      let x, p1, p2, b, d;
      do { x = r.int(6, 30); p1 = r.int(2, 4); p2 = p1 + r.int(1, 3); b = r.int(5, 25); d = (p2 - p1) * x - b; } while (d <= 0 || p2 * x - d >= 180);
      return N('Parallel lines are cut by a transversal. Two corresponding angles are (' + p1 + 'x + ' + b + ')° and (' + p2 + 'x − ' + d + ')°. Find x.', x, { s: 'Corresponding angles are equal: ' + p1 + 'x + ' + b + ' = ' + p2 + 'x − ' + d + ', so ' + (b + d) + ' = ' + (p2 - p1) + 'x, x = ' + x + '.', w: [[p1 * x + b, 'That is the size of the angle, not x.']] });
    }),
    tpl('co', (r) => {
      let x, p1, p2, c;
      do { x = r.int(5, 25); p1 = r.int(2, 5); p2 = r.int(2, 5); c = 180 - (p1 + p2) * x; } while (c < 5 || c > 60);
      return N('Parallel lines are cut by a transversal. Two co-interior angles are (' + p1 + 'x)° and (' + p2 + 'x + ' + c + ')°. Find x.', x, { s: 'They add to 180: ' + (p1 + p2) + 'x + ' + c + ' = 180, so ' + (p1 + p2) + 'x = ' + (180 - c) + ' and x = ' + x + '.', w: [[p1 * x, 'That is the size of one angle, not x.']] });
    }),
    tpl('bent', (r) => {
      const a = r.int(15, 80), b = r.int(15, 80), mode = r.int(0, 1);
      return mode
        ? N('Lines l and m are parallel with a point P between them. A is on l and B is on m, both to the left of P. The angle at A (between AP and the rightward part of l) is ' + a + '°. The angle at B (between BP and the rightward part of m) is ' + b + '°. What is angle APB?', a + b, { s: 'A parallel through P splits APB into two alternate interior angles: ' + a + ' + ' + b + ' = ' + (a + b) + '.', w: [[Math.abs(a - b) || 1, 'Add, do not subtract: the two parts sit side by side.']] })
        : N('Lines l and m are parallel with a point P between them. A is on l and B is on m, both to the left of P. Angle APB is ' + (a + b) + '°, and the angle at A (between AP and the rightward part of l) is ' + a + '°. What is the angle at B between BP and the rightward part of m?', b, { s: 'APB = angle at A + angle at B, so ' + (a + b) + ' − ' + a + ' = ' + b + '.', w: [[a + b, 'That is angle APB. Subtract the angle at A.']] });
    }),
    tpl('ratio', (r) => {
      const t = r.pick([3, 4, 5, 6, 9, 10, 12, 15, 18]);
      const a = r.int(1, t - 1); const lo = Math.min(a, t - a), hi = Math.max(a, t - a);
      if (lo === hi) return N('Co-interior angles are in the ratio 2 : 7. What is the larger angle?', 140, { s: '2 + 7 = 9 parts, 20° each; 140°.' });
      const u = 180 / t;
      return N('Parallel lines are cut by a transversal. Two co-interior angles are in the ratio ' + lo + ' : ' + hi + '. What is the larger angle, in degrees?', hi * u, { s: 'They add to 180°, so one part is 180 ÷ ' + t + ' = ' + u + '°. Larger: ' + hi + ' × ' + u + ' = ' + hi * u + '.', w: [[lo * u, 'That is the smaller angle.']].filter((x) => x[0] !== hi * u) });
    }),
    tpl('count', (r) => {
      const a = r.int(20, 160), nm = name(r);
      if (a === 90) return N('Two parallel lines are cut by a transversal and one angle is 30°. How many of the 8 angles equal 30°?', 4, { s: 'Four.' });
      const eq = r.int(0, 2);
      if (eq === 2) return N(nm + ' marks ' + a + '° on one of the eight angles formed when a transversal crosses two parallel lines. How many of the 8 angles measure either ' + a + '° or ' + (180 - a) + '°?', 8, { s: 'Only two sizes appear, ' + a + '° four times and ' + (180 - a) + '° four times, so all 8 angles are one or the other.', w: [[4, 'That is only one of the two sizes. Together they cover all 8 angles.']] });
      return N(nm + ' marks ' + a + '° on one of the eight angles formed when a transversal crosses two parallel lines. How many of the 8 angles measure ' + (eq === 0 ? a : 180 - a) + '°?', 4, { s: 'Only two sizes appear and each occurs 4 times: ' + a + '° four times and ' + (180 - a) + '° four times.', w: [[2, 'There are two crossings, each with two angles of this size.'], [8, 'Only half of the 8 have this size; the others are the supplement.']] });
    }),
  ],
});
