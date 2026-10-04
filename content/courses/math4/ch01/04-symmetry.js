import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

export default lesson({
  id: 'm4-1-4-symmetry',
  title: 'Symmetry',
  blurb: 'Fold a shape onto itself, turn it until it matches, and use symmetry to finish and count.',
  concepts: ['line-symmetry', 'rotational-symmetry', 'reflection'],

  tryFirst: [
    num('t1', 'A rectangle is longer than it is wide, so it is not a square. How many lines of symmetry does it have? (A line of symmetry is a fold line that makes the two halves match exactly.)', 2, {
      h: ['You can fold it top onto bottom.', 'You can also fold it left onto right. Do the diagonals work?'],
      s: 'One fold line goes across the middle, one goes down the middle. Folding along a diagonal does not match the corners. So 2.',
      w: [['4', 'The diagonals of a long rectangle are not fold lines. The halves do not match.'], ['1', 'There are two different ways to fold it: across and down.']],
    }),
    num('t2', 'A regular hexagon has 6 equal sides and 6 equal angles. How many lines of symmetry does it have?', 6, {
      h: ['Some lines join opposite corners. Others join the middles of opposite sides.'],
      s: '3 lines join opposite corners. 3 lines join middles of opposite sides. 3 + 3 = 6.',
      w: [['3', 'You found one kind of line. There is a second kind too.'], ['12', 'Check for repeats. A line has two ends, but it is still one line.']],
    }),
  ],

  learn: [
    p('Many shapes look balanced. Symmetry gives us two exact ways to say what that means: by folding and by turning.'),
    def('line of symmetry', 'A line that you can fold a shape along so that the two halves match exactly. It is also called a <b>mirror line</b>. One half is the mirror picture of the other.'),
    widget('symmetryLines', { n: 5, k: 1 }),
    rule('<b>Regular polygons.</b> A regular polygon with n sides has exactly n lines of symmetry. A regular hexagon has 6. A square has 4. An equilateral triangle has 3.'),
    def('rotational symmetry', 'A shape has rotational symmetry if you can turn it around its center, by less than a full turn, and it looks the same as before.'),
    def('order of rotation', 'The number of times a shape looks the same during one full turn. A square looks the same 4 times: after 90°, 180°, 270° and 360°. So its order is 4.'),
    formula('Order of rotation', 'order = 360 ÷ smallest matching turn', 'A shape that matches after 45° has order 360 ÷ 45 = 8. A shape whose order is 1 only matches after a full turn, so it has no rotational symmetry.'),
    tbl(['Shape', 'Lines of symmetry', 'Order of rotation'], [['equilateral triangle', '3', '3'], ['square', '4', '4'], ['rectangle (not a square)', '2', '2'], ['rhombus (not a square)', '2', '2'], ['isosceles triangle (not equilateral)', '1', '1'], ['slanted parallelogram (unequal sides)', '0', '2'], ['regular hexagon', '6', '6']], 'Some shapes'),
    key('Folding and turning are different tests. A shape can have lines of symmetry without rotational symmetry (an isosceles triangle), and it can have rotational symmetry without any line of symmetry (a slanted parallelogram).'),
    warn('<b>Watch out.</b> A parallelogram that is not a rectangle and not a rhombus has no lines of symmetry. Folding along a diagonal does not match the corners. But it does look the same after a half turn.'),
    tip('<b>Test a fold.</b> Draw the shape on paper and fold it. Or imagine a mirror standing on the line: if the mirror picture completes the shape, it is a line of symmetry. For turning, trace the shape and spin the tracing around its center.'),
    ex('Finishing a mirror picture', ['A vertical mirror line runs between columns 3 and 4 of a grid. A square in column 2 is shaded. Where is its twin?', 'Column 3 touches the mirror on the left. Column 2 is one step farther from it.', 'On the right, column 4 touches the mirror. One step farther is column 5.', 'The twin is in column 5, in the same row. Twins are always the same distance from the mirror, in the same row.']),
    ex('Finding the order from a turn', ['A shape looks the same after a turn of 72°, and 72° is the smallest turn that works. What is its order?', '360 ÷ 72 = 5.', 'The order is 5. Check: five turns of 72° make 5 × 72 = 360°.']),
    ex('Block letters', ['The letter E, drawn with straight strokes, has one horizontal line of symmetry. Fold it along that line and the top half matches the bottom half: 1 line.', 'Turn it a half turn and it is upside down and backwards, so it does not match. Its order is 1.', 'The letter M has just 1 line of symmetry (up and down) and order 1.']),
    mcq('Sam says: "A rectangle has 4 lines of symmetry because its two diagonals also fold it onto itself." What is wrong?', ['Nothing, 4 is correct.', 'Folding a long rectangle on a diagonal does not match the corners. Only the 2 middle lines work.', 'A rectangle has 8 lines of symmetry.'], 1, 'Fold a long rectangle on a diagonal. A short end would land on a long side. They do not match. Only the two lines through the middles of the sides work.', 'Spot the mistake'),
    recap([['line of symmetry', 'fold line that makes the halves match'], ['rotational symmetry', 'looks the same after a turn less than 360°'], ['order', 'how many times it matches in one full turn']], [['Regular polygon with n sides', 'n lines, order n'], ['Order', '360 ÷ smallest turn']]),
  ],

  practice: [
    num('p1', 'A triangle has 3 equal sides. How many lines of symmetry does it have?', 3, {
      h: ['Each line goes from a corner to the middle of the side across.'],
      s: 'One line for each corner: 3.',
      w: [['1', 'Each corner has its own fold line. There are 3 corners.']],
    }),
    num('p2', 'A shape looks the same after a turn of 45°, and 45° is the smallest turn that works. What is its order of rotation?', 8, {
      h: ['How many 45° turns make a full turn of 360°?'],
      s: '360 ÷ 45 = 8.',
      w: [['4', 'A 90° turn would give 4. Here the turn is 45°, so more turns fit in 360°.']],
    }),
    num('p3', 'A vertical mirror line runs down the middle of one column of a grid. A shaded square is 4 columns to the left of that column. Its twin is 4 columns to the right of it. How many columns apart are the two shaded squares?', 8, {
      h: ['Each shaded square is 4 columns from the mirror column, on opposite sides.'],
      s: '4 + 4 = 8 columns.',
      w: [['4', 'That is the distance from the mirror column to one square. The two squares are on opposite sides.']],
    }),
    num('p4', 'Here are the block capital letters H, N, S, X, Z and O. How many of them have at least one line of symmetry?', 3, {
      h: ['Try folding each letter across the middle, up-down or left-right.', 'N, S and Z do not fold onto themselves.'],
      s: 'H, X and O can be folded and match. N, S and Z cannot. So 3.',
      w: [['6', 'N, S and Z look the same after a half turn, but folding them does not make the halves match.'], ['2', 'O has lines of symmetry too, in fact many.']],
    }),
    num('p5', 'Use the same letters H, N, S, X, Z and O. How many of them look the same after a half turn (180°)?', 6, {
      h: ['A half turn flips the letter upside down.'],
      s: 'Each of H, N, S, X, Z and O looks the same when turned upside down. So 6.',
      w: [['3', 'You counted the letters with a line of symmetry. A half turn is a different test, and N, S and Z pass it.']],
    }),
    num('p6', 'The left half of a design has 7 shaded squares. A vertical mirror line runs between two columns, so no square touches it. The right half is the mirror picture. How many shaded squares are in the whole design?', 14, {
      h: ['Each shaded square has one twin.'],
      s: '7 on the left plus 7 twins on the right: 14.',
      w: [['7', 'That is only the left half. The mirror picture adds as many again.']],
    }),
    num('p7', 'A regular polygon has 12 lines of symmetry. Each of its sides is 7 long. What is its perimeter?', 84, {
      h: ['A regular polygon has as many lines of symmetry as sides.'],
      s: '12 sides × 7 = 84.',
      w: [['19', 'That adds 12 and 7. Perimeter is 12 sides each of length 7, so multiply.']],
    }),
    num('p8', 'A square paper is folded in half. Then it is folded in half again, and a single hole is punched through all the layers. How many holes are there when it is unfolded?', 4, {
      h: ['Each fold doubles the number of layers.'],
      s: 'After 2 folds there are 4 layers. One punch goes through all 4. There are 4 holes.',
      w: [['2', 'There were two folds. The first fold gives 2 layers, the second doubles again.'], ['1', 'The hole goes through every layer, so each layer gets its own hole.']],
    }),
  ],

  challenge: [
    chain('Fold and punch', 'A big sheet of paper is folded in half again and again. Then one hole is punched through all the layers, and the sheet is opened.', [
      num('c1a', 'The paper is folded in half 3 times. How many holes appear?', 8, { h: ['Each fold doubles the layers: 2, 4, ...'], s: '2 × 2 × 2 = 8.' }),
      num('c1b', 'The paper is folded 5 times and then 3 holes are punched. How many holes appear?', 96, { h: ['How many layers after 5 folds?', 'Each of the 3 punches goes through every layer.'], s: '5 folds make 32 layers. 3 × 32 = 96.' }),
      num('c1c', 'How many folds are needed to get 64 holes from one punch?', 6, { h: ['Keep doubling: 2, 4, 8, ...'], s: '2, 4, 8, 16, 32, 64. That is 6 doubles.' }),
    ], 'The idea: each fold doubles the number of layers, so n folds give 2 × 2 × ... × 2 (n times) layers.'),
    chain('Turn and fold', 'A regular polygon looks the same after a turn of 40°, and 40° is the smallest turn that works.', [
      num('c2a', 'How many sides does it have?', 9, { h: ['How many 40° turns fill 360°?'], s: '360 ÷ 40 = 9.' }),
      num('c2b', 'How many lines of symmetry does it have?', 9, { h: ['A regular polygon has as many lines as sides.'], s: '9 lines.' }),
      num('c2c', 'Each side is 6 long. What is its perimeter?', 54, { h: ['Number of sides times side length.'], s: '9 × 6 = 54.' }),
    ], 'The idea: the turn, the number of sides and the number of lines of symmetry all say the same thing about a regular polygon.'),
    mc('c3', 'Find the error. Nina says: "This pattern has 6 shaded squares on the left of a vertical mirror line, and its mirror picture on the right, so the whole pattern has 6 shaded squares."', ['She is right.', 'She forgot the mirror picture. The right side also has 6, so the whole pattern has 12.', 'The whole pattern has 3.', 'The whole pattern has 36.'], 1, {
      s: '6 on the left and 6 twins on the right: 12.',
      w: [[0, 'The right side has shaded squares too. Count both sides.'], [2, 'Halving is the wrong direction. The mirror picture adds more squares.']],
    }),
  ],

  quiz: [
    tpl('lines', (r) => {
      const n = r.int(3, 20), nm = name(r);
      return N(nm + ' draws a regular polygon with ' + n + ' sides. How many lines of symmetry does it have?', n, { s: 'A regular polygon has as many lines of symmetry as sides: ' + n + '.', w: [[n * 2, 'Each line is only counted once, even though it has two ends.']] });
    }),
    tpl('turn', (r) => {
      const n = r.pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]), fwd = r.bool();
      if (fwd) return N('A regular polygon has ' + n + ' sides. What is the smallest turn, in degrees, that makes it look the same?', 360 / n, { s: '360 ÷ ' + n + ' = ' + 360 / n + '.', w: [[n, 'Divide the full turn, 360°, by the number of sides.']] });
      return N('A shape looks the same after a turn of ' + 360 / n + '°, and that is the smallest such turn. How many times does it look the same in one full turn (its order)?', n, { s: '360 ÷ ' + 360 / n + ' = ' + n + '.' });
    }),
    tpl('mirror', (r) => {
      const d = r.int(1, 30), nm = name(r);
      return N(nm + ' shades a square ' + d + ' column' + (d > 1 ? 's' : '') + ' to the left of the mirror column. A vertical mirror line runs down the middle of that column. The twin is the same distance to the right. How many columns apart are the two squares?', 2 * d, { s: d + ' + ' + d + ' = ' + 2 * d + '.', w: [[d, 'That is one side only. The twin is on the other side of the line.']] });
    }),
    tpl('holes', (r) => {
      const k = r.int(2, 6), h = r.int(1, 5), nm = name(r);
      const v = h * 2 ** k;
      return N(nm + ' folds a sheet in half ' + k + ' times, then punches ' + h + ' hole' + (h > 1 ? 's' : '') + ' through all the layers. How many holes are there when it is opened?', v, { s: k + ' folds make ' + 2 ** k + ' layers. ' + h + ' × ' + 2 ** k + ' = ' + v + '.', w: [[h * k, 'Each fold doubles the layers. It does not just add.']] });
    }),
    tpl('perim', (r) => {
      const n = r.int(3, 12), s = r.int(2, 15);
      return N('A regular polygon has ' + n + ' lines of symmetry and each side is ' + s + ' long. What is its perimeter?', n * s, { s: n + ' lines means ' + n + ' sides. ' + n + ' × ' + s + ' = ' + n * s + '.' });
    }),
    tpl('half', (r) => {
      const b = r.int(3, 40), w = r.int(2, 8) * 2, nm = name(r);
      return N(nm + ' colors ' + b + ' squares in the left half of a ' + w + '-column grid. The right half is a mirror picture across the center line, which runs between two columns. How many squares are colored in all?', 2 * b, { s: 'Each colored square has one twin: ' + b + ' + ' + b + ' = ' + 2 * b + '.', w: [[b, 'The mirror picture adds as many again.']] });
    }),
    tpl('order', (r) => {
      const a = r.pick([2, 3, 4, 5, 6, 8, 9, 10]), t = r.int(2, 5), nm = name(r);
      return N(nm + ' turns a shape that has order of rotation ' + a + ' through ' + t + ' of its smallest matching turns. How many degrees is that in all?', (t * 360) / a, { s: 'The smallest turn is 360 ÷ ' + a + ' = ' + 360 / a + '°. ' + t + ' × ' + 360 / a + ' = ' + (t * 360) / a + '.', w: [[360 / a, 'That is one turn. There were ' + t + ' of them.']] });
    }),
  ],
});
