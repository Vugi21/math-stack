import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const C2 = (n) => (n * (n - 1)) / 2;

export default lesson({
  id: 'm4-1-3-parallel-and-perpendicular',
  title: 'Parallel and perpendicular',
  blurb: 'Lines that never meet, lines that meet at a right angle, and how they sort four-sided shapes.',
  concepts: ['parallel', 'perpendicular', 'quadrilaterals'],

  tryFirst: [
    num('t1', 'A rectangle has four sides. Two sides are parallel when they never meet, however far they are extended. How many pairs of parallel sides does a rectangle have?', 2, {
      h: ['Think of the top and bottom of a door.', 'Then think of the left and right.'],
      s: 'Top and bottom form one pair. Left and right form another. That is 2 pairs.',
      w: [['4', 'There are 4 sides, but a pair uses 2 of them. So there are 2 pairs.']],
    }),
    num('t2', 'Look at a regular hexagon. Opposite sides are parallel. How many pairs of parallel sides does it have?', 3, {
      h: ['A hexagon has 6 sides. Each side is parallel to the one across from it.'],
      s: '6 sides make 3 pairs of opposite sides.',
      w: [['6', 'That is the number of sides. A pair uses two sides.']],
    }),
  ],

  learn: [
    p('Two lines are <b>parallel</b> if they never meet, no matter how far they go. The distance between them is the same everywhere. Railroad tracks are parallel.'),
    p('Two lines are <b>perpendicular</b> if they meet at a right angle (90°). The corner of a page is made by perpendicular edges.'),
    widget('transversal', { a: 90, pick: 2 }),
    rule('<b>A line that is perpendicular to one of two parallel lines is perpendicular to the other too.</b> In the picture, the slanted line has been turned to 90°. Every angle is 90°.'),
    p('A <b>quadrilateral</b> has 4 sides. We sort quadrilaterals by their parallel sides and their right angles.'),
    tbl(['Shape', 'Pairs of parallel sides', 'Right angles', 'Equal sides'], [['trapezoid', 'exactly 1', 'maybe', 'maybe'], ['parallelogram', '2', 'maybe', 'opposite sides'], ['rhombus', '2', 'maybe', 'all 4'], ['rectangle', '2', 'all 4', 'opposite sides'], ['square', '2', 'all 4', 'all 4']], 'Sorting quadrilaterals'),
    rule('<b>Shapes can be in more than one group.</b> Every square is a rectangle. Every rectangle is a parallelogram. Every rhombus is a parallelogram. In this course a trapezoid has <i>exactly</i> one pair of parallel sides.'),
    rule('<b>Parallelogram angles.</b> Opposite angles are equal. Two angles that are next to each other add to 180°.'),
    warn('<b>Watch out.</b> "Has a right angle" does not mean "rectangle." A rectangle needs all four angles to be right angles.'),
    ex('Angles of a parallelogram', ['One angle of a parallelogram is 70°. Find the other three.', 'The opposite angle is also 70°.', 'The neighbors add to 180° with it: 180 − 70 = 110°.', 'The angles are 70°, 110°, 70°, 110°. They add to 360°.']),
    mcq('Lena says: "A rectangle is not a parallelogram, because its angles are right angles." What is wrong?', ['Nothing, she is right.', 'A rectangle has two pairs of parallel sides, so it is a parallelogram. It just has extra right angles.', 'A parallelogram must have no right angles.'], 1, 'A parallelogram only needs two pairs of parallel sides. A rectangle has that, and more.', 'Spot the mistake'),
  ],

  practice: [
    mc('p1', 'Which of these has exactly one pair of parallel sides?', ['square', 'rhombus', 'trapezoid', 'rectangle'], 2, {
      h: ['Three of these have two pairs.'],
      s: 'A trapezoid has exactly one pair. The others have two.',
      w: [[1, 'A rhombus has two pairs of parallel sides.'], [3, 'A rectangle has two pairs of parallel sides.']],
    }),
    mc('p2', 'A quadrilateral has four right angles and four equal sides. Which name fits best?', ['rhombus', 'rectangle', 'trapezoid', 'square'], 3, {
      h: ['Four right angles gives a rectangle. What do four equal sides add?'],
      s: 'A square has four right angles and four equal sides. A rhombus or rectangle is only part of this.',
      w: [[1, 'Every square is a rectangle, but "square" says more.'], [0, 'A rhombus may lack right angles. This shape has four.']],
    }),
    num('p3', 'In a rectangle, two sides are perpendicular if they meet at a corner. How many such pairs of sides does a rectangle have?', 4, {
      h: ['Count the corners.'],
      s: 'Each corner is made by one pair of perpendicular sides. There are 4 corners, so 4 pairs.',
      w: [['2', 'Two is the number of parallel pairs. Perpendicular pairs meet at corners.']],
    }),
    num('p4', 'Five parallel lines run left to right. Three more parallel lines run top to bottom, each perpendicular to the first five. How many points do the two groups cross at?', 15, {
      h: ['Each of the 3 lines crosses every one of the 5.'],
      s: '5 × 3 = 15 crossing points.',
      w: [['8', 'That adds the lines. Each line of one group crosses every line of the other, so multiply.']],
    }),
    num('p5', 'One angle of a parallelogram is 70°. What is its largest angle?', 110, {
      h: ['Neighbors add to 180°.'],
      s: '180 − 70 = 110°. The angles are 70, 110, 70, 110.',
      w: [['70', 'That is the angle given. Find the other kind.'], ['290', 'Neighbors add to 180°, not 360°.']],
    }),
    num('p6', 'A grid is made of 2 rows and 3 columns of unit squares. How many rectangles of any size can you find? Count squares too.', 18, {
      h: ['The grid has 3 lines across and 4 lines down.', 'Choose 2 horizontal lines and 2 vertical lines. How many ways to choose 2 of 3? Of 4?'],
      s: '3 horizontal lines: 3 ways to choose 2. 4 vertical lines: 6 ways to choose 2. 3 × 6 = 18.',
      w: [['6', 'That counts only the unit squares. Bigger rectangles count too.'], ['12', 'Check: 3 ways for the horizontal pair and 6 ways for the vertical pair.']],
    }),
    num('p7', 'A trapezoid has parallel top and bottom sides. Its left side makes right angles with both. Its top-right angle is 120°. How many degrees is its bottom-right angle?', 60, {
      h: ['The right side is a slanted line crossing two parallel lines.', 'The two angles on the right side add to 180°.'],
      s: 'The two angles on the same side of the slanted side add to 180°. 180 − 120 = 60°.',
      w: [['120', 'The two angles are not equal. Together they make 180°.'], ['90', 'Only the left angles are right angles.']],
    }),
  ],

  challenge: [
    chain('Lines on a grid', 'A grid has 4 parallel lines going across and 6 parallel lines going down. Each across line is perpendicular to each down line.', [
      num('c1a', 'At how many points do the lines cross?', 24, { h: ['Every across line crosses every down line.'], s: '4 × 6 = 24.' }),
      num('c1b', 'You will pick 2 of the 4 across lines. In how many ways can you pick them?', 6, { h: ['List pairs: lines 1 and 2, 1 and 3, ...'], s: 'The pairs are 12, 13, 14, 23, 24, 34. That is 6. (Or: 4 × 3 = 12, and each pair was counted twice, so 6.)' }),
      num('c1c', 'Two across lines and two down lines make a rectangle. There are 15 ways to choose 2 of the 6 down lines. How many rectangles are there?', 90, { h: ['Multiply the ways to choose the across pair by the ways to choose the down pair.'], s: '6 × 15 = 90.' }),
    ], 'The idea: a rectangle is fixed by its two across sides and its two down sides. Count the choices for each and multiply.'),
    chain('Leaning shape', 'In a parallelogram one angle is 4 times as big as the angle next to it.', [
      num('c2a', 'How many degrees do the two neighboring angles make together?', 180, { h: ['Neighbors in a parallelogram add to...'], s: '180°.' }),
      num('c2b', 'How many degrees is the smaller angle?', 36, { h: ['The two angles are 1 part and 4 parts.'], s: '180 ÷ 5 = 36°.' }),
      num('c2c', 'How many degrees is the larger angle?', 144, { h: ['It is 4 times the smaller.'], s: '4 × 36 = 144°. Check: 36 + 144 = 180.' }),
    ], 'The idea: neighbors add to 180°, so a ratio between them can be shared out in equal parts.'),
    mc('c3', 'Find the error. Omar says: "My shape has 4 equal sides, so it has to be a square."', ['He is right.', 'A rhombus also has 4 equal sides. It needs 4 right angles to be a square.', 'A shape with 4 equal sides is a trapezoid.', 'A square has only 2 equal sides.'], 1, {
      s: 'A slanted rhombus has four equal sides but no right angles.',
      w: [[0, 'Push a square over to make a slanted diamond. The sides stay equal.'], [2, 'A trapezoid has just one pair of parallel sides. A shape with 4 equal sides has two.']],
    }),
  ],

  quiz: [
    tpl('cross', (r) => {
      const m = r.int(3, 12), n = r.int(3, 12), nm = name(r);
      return N(nm + ' draws ' + m + ' parallel lines across a page. Then ' + nm + ' draws ' + n + ' parallel lines down, each perpendicular to the first group. How many crossing points are there?', m * n, { s: m + ' × ' + n + ' = ' + m * n + '.', w: [[m + n, 'Each line of one group crosses every line of the other group, so multiply.']] });
    }),
    tpl('rects', (r) => {
      const a = r.int(1, 6), b = r.int(2, 6);
      const v = C2(a + 1) * C2(b + 1);
      return N('A grid has ' + a + ' row' + (a > 1 ? 's' : '') + ' and ' + b + ' column' + (b > 1 ? 's' : '') + ' of unit squares. How many rectangles of any size, squares included, can you find?', v, { s: 'There are ' + (a + 1) + ' lines across and ' + (b + 1) + ' lines down. Pairs across: ' + C2(a + 1) + '. Pairs down: ' + C2(b + 1) + '. ' + C2(a + 1) + ' × ' + C2(b + 1) + ' = ' + v + '.', w: [[a * b, 'That counts only the unit squares. Bigger rectangles count too.']] });
    }),
    tpl('para', (r) => {
      const ang = r.pick([30, 40, 50, 60, 70, 75, 80, 100, 110, 120, 125, 130, 140, 150]), side = r.bool(), nm = name(r);
      const v = side ? 180 - ang : ang;
      return N('One angle of a parallelogram is ' + ang + '°. ' + nm + ' looks at the ' + (side ? 'angle next to it' : 'angle opposite it') + '. How many degrees is that angle?', v, { s: side ? 'Neighbors add to 180: 180 − ' + ang + ' = ' + (180 - ang) + '.' : 'Opposite angles are equal: ' + ang + '.', w: [[side ? ang : 180 - ang, side ? 'Neighbors add to 180°; they are not equal.' : 'Opposite angles are equal.']] });
    }),
    tpl('trap', (r) => {
      const a = r.int(95, 145);
      return N('A trapezoid has parallel top and bottom sides. Its left side is perpendicular to both. Its top-right angle is ' + a + '°. How many degrees is its bottom-right angle?', 180 - a, { s: 'The two right-side angles add to 180°. 180 − ' + a + ' = ' + (180 - a) + '.', w: [[a, 'The two angles are not equal. They add to 180°.'], [90, 'Only the left angles are right angles.']] });
    }),
    tpl('regpar', (r) => {
      const n = r.int(3, 24), nm = name(r);
      const v = n % 2 === 0 ? n / 2 : 0;
      return N(nm + ' draws a regular polygon with ' + n + ' sides. How many pairs of its sides are parallel? (A side with no parallel partner is not counted.)', v, { s: n % 2 === 0 ? 'Opposite sides are parallel. ' + n + ' sides make ' + n / 2 + ' pairs.' : 'With an odd number of sides, no side faces another side across the middle, so no sides are parallel. The answer is 0.', w: [[n % 2 === 0 ? n : 1, n % 2 === 0 ? 'A pair uses two sides. Divide by 2.' : 'Each side faces a corner on the other side, not a side.']] });
    }),
    tpl('ratio', (r) => {
      const k = r.pick([2, 3, 4, 5, 8, 9, 11, 14, 17, 19]), nm = name(r);
      const small = 180 / (k + 1);
      return N('In a parallelogram, ' + nm + ' finds that one angle is ' + k + ' times as big as the angle next to it. How many degrees is the smaller angle?', small, { s: (k + 1) + ' equal parts make 180°. 180 ÷ ' + (k + 1) + ' = ' + small + '.', w: [[180 - small, 'That is the larger angle. Give the smaller one.']] });
    }),
    tpl('name', (r) => {
      const s = r.int(3, 30), sq = r.bool();
      const q = 'A quadrilateral has four sides of length ' + s + ' and ' + (sq ? 'four right angles' : 'no right angles') + '. What is it?';
      return choice(r, q, sq ? 'square' : 'rhombus', sq ? ['rhombus', 'trapezoid', 'rectangle that is not a square'] : ['square', 'rectangle', 'trapezoid'], { s: sq ? 'Four equal sides and four right angles: a square.' : 'Four equal sides but no right angles: a rhombus, not a square.' });
    }),
  ],
});
