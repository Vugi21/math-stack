import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

// keep only wrong answers that really differ from the right one
const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);

export default lesson({
  id: 'pre-11-1-perimeter-and-measuring',
  title: 'Measuring segments and perimeter',
  blurb: 'Lengths that add, lengths that overlap, and the distance around a shape, including a trick for staircase shapes.',
  concepts: ['perimeter', 'segments', 'length'],

  tryFirst: [
    num('t1', 'A rectangular garden is 9 meters long and 4 meters wide. You want to run a fence once around the whole edge. How many meters of fence do you need?', 26, {
      h: ['Sketch it. Label all four sides, not just two.', 'Two sides are 9 and two sides are 4.'],
      s: '9 + 4 + 9 + 4 = 26 meters.',
      w: [['13', 'That is only two of the sides. A rectangle has four sides, so each length appears twice.'], ['36', '36 is 9 × 4, which counts squares inside the garden. Fence is a length around the edge, so add the sides.']],
    }),
    num('t2', 'Four points A, B, C, D sit on a line in that order. The distance from A to C is 12, the distance from B to D is 15, and the distance from B to C is 6. How far is A from D?', 21, {
      h: ['Draw the line and mark the pieces AB, BC, CD.', 'If you add AC and BD, which piece gets counted twice?'],
      s: 'AC = AB + BC = 12, so AB = 6. BD = BC + CD = 15, so CD = 9. Then AD = 6 + 6 + 9 = 21.',
      w: [['27', 'Adding 12 and 15 counts the piece BC twice. Take that overlap out once.']],
    }),
  ],

  learn: [
    p('Measuring a <b>length</b> means asking "how many units long?" When pieces of a line are placed end to end, their lengths <b>add</b>. If A, B, C sit on a line in that order, then AB + BC = AC.'),
    rule('<b>Overlaps count twice.</b> If two longer segments share a piece, adding them counts that shared piece two times. To get the total span, add the two lengths and subtract the overlap once.'),
    p('The <b>perimeter</b> of a shape is the total length of its boundary: the distance you would walk going once around the edge. Perimeter is measured in length units (cm, m, ft), never in squares.'),
    widget('unitSquare', { w: 5, h: 3 }),
    rule('<b>Rectangles.</b> Opposite sides match, so the perimeter of a rectangle is 2 × (length + width). A square of side s has perimeter 4s.'),
    ex('Finding a missing side from the perimeter', ['A rectangle has perimeter 30 and length 11. Find the width.', 'The perimeter is two lengths plus two widths. Two lengths use 22.', 'That leaves 30 − 22 = 8 for the two widths together.', 'One width is half of that: 4. Check: 11 + 4 + 11 + 4 = 30.']),
    rule('<b>The staircase trick.</b> A shape whose sides all run left-right or up-down, and which has only "steps" (no holes or dents going inward), has the same perimeter as the smallest rectangle that boxes it in. The rights and lefts of the steps add up to the width, and the ups and downs add up to the height.'),
    warn('<b>Watch out.</b> Perimeter is not area. A 3 by 5 rectangle has perimeter 16 (a length around it) and area 15 (squares inside it). Two shapes can have the same perimeter and very different areas.'),
    mcq('Ava has a 10 by 8 rectangle. She cuts a small rectangular notch out of one corner and says: "I removed some of the shape, so the perimeter must be smaller now." What happens?', ['She is right: removing paper always shortens the perimeter.', 'The perimeter stays exactly the same, because the notch just replaces the corner path with a staircase going the same total distance across and up.', 'The perimeter gets longer by the area of the notch.'], 1, 'The new edge walks the same total distance left-right and the same total up-down as the old corner did. That is the staircase trick: perimeter equals the bounding box, 2(10 + 8) = 36, before and after.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A rectangle has perimeter 38 and length 12. What is its width?', 7, {
      h: ['Two lengths use up 24 of the perimeter.', 'What is left must be split between two widths.'],
      s: '38 − 24 = 14 for the two widths, so one width is 7.',
      w: [['26', 'That is 38 − 12. But the length appears twice, and the leftover is shared by two widths.'], ['14', '14 is the total for both widths. Divide it by 2.']],
    }),
    num('p2', 'A square has perimeter 52. How long is one side?', 13, {
      h: ['A square has four equal sides.'],
      s: '52 ÷ 4 = 13.',
      w: [['26', 'You halved it, as for a rectangle. A square has four equal sides, so divide by 4.']],
    }),
    num('p3', 'Points P, Q, R, S lie on a line in that order. PS = 30, PQ = 9, and RS = 11. Find QR.', 10, {
      h: ['PS is made of three pieces: PQ, QR, and RS.'],
      s: '30 − 9 − 11 = 10.',
      w: [['20', '20 is 9 + 11, the two known pieces. QR is what is left over after you take them from 30.'], ['41', 'The pieces are parts of 30, so subtract them from 30 instead of adding.']],
    }),
    num('p4', 'A staircase-shaped figure has a flat bottom and a straight left wall. Going down and to the right it has 4 steps, each step 2 units wide and 1 unit tall. What is its perimeter? (The top-right boundary is the staircase itself.)', 24, {
      h: ['Use the staircase trick. How wide and how tall is the box around it?', 'Width: 4 steps of 2. Height: 4 steps of 1.'],
      s: 'The bounding box is 8 wide and 4 tall, so the perimeter is 2 × (8 + 4) = 24.',
      w: [['12', '12 is just 8 + 4, half the way around. You still have to come back along the bottom and left wall.'], ['36', 'You added the 12 units of step edges (8 across and 4 up) on top of the full 24 around the box. The steps replace the top and right sides of the box, they do not come in addition to them.']],
    }),
    num('p5', 'A 10 by 6 rectangle is cut by one straight cut into two 5 by 6 rectangles. Add the perimeters of the two pieces, then subtract the perimeter of the original rectangle. What do you get?', 12, {
      h: ['Find the perimeter of the original, then of one piece.', 'Or ask: what new edges appeared?'],
      s: 'Original: 2 × 16 = 32. Each piece: 2 × 11 = 22, so 44 together. 44 − 32 = 12. The cut created a new edge of length 6 on each piece, 6 + 6 = 12.',
      w: [['0', 'Cutting does not keep the total boundary the same: each piece now has a new edge along the cut.'], ['6', 'The cut edge is 6 long, but it is a boundary of both pieces, so it is counted twice.']],
    }),
    num('p6', 'You have 40 meters of fence to make a rectangular pen against a barn wall. No fence is needed along the wall. The two sides that touch the wall are 8 meters each. How long is the side parallel to the wall?', 24, {
      h: ['How many sides need fence?', 'Take the two 8 m sides out of the 40 first.'],
      s: '40 − 8 − 8 = 24 meters.',
      w: [['12', 'You treated it like a rectangle with four fenced sides. Only three sides get fence here.'], ['16', '16 is 8 + 8, the fence already used. The long side is what remains.']],
    }),
    mc('p7', 'Every rectangle below has area 36 square units. Which has the greatest perimeter?', ['6 by 6', '4 by 9', '3 by 12', '1 by 36'], 3, {
      h: ['Work out 2 × (length + width) for each one.'],
      s: 'The perimeters are 24, 26, 30, and 74. Long, skinny shapes have lots of edge for their area.',
      w: [[0, 'The square is actually the one with the least perimeter for this area. Compute all four.']],
    }),
  ],

  challenge: [
    chain('The picture frame', 'A photo is 12 cm wide and 8 cm tall. A frame 2 cm wide runs around all four edges of the photo.', [
      num('c1a', 'How wide is the framed picture, counting the frame?', 16, { h: ['The frame adds on the left and on the right.'], s: '12 + 2 + 2 = 16 cm.' }),
      num('c1b', 'What is the perimeter of the outer edge of the frame? (Its height is 8 + 4 = 12.)', 56, { h: ['2 × (16 + 12).'], s: '2 × 28 = 56 cm.' }),
      num('c1c', 'How much longer is the outer perimeter than the photo\'s own perimeter?', 16, { h: ['The photo\'s perimeter is 2 × (12 + 8).'], s: 'The photo: 40. The frame: 56. Difference 16, which is 8 × 2: each of 8 frame-edges adds 2.' }),
    ], 'The idea: a border of width w adds w at each end of both length and width, so the perimeter grows by 8w no matter what the original size was.'),
    chain('Twelve tiles', 'You have 12 square tiles, each 1 unit on a side, and you must use all of them to make a solid rectangle with no gaps.', [
      num('c2a', 'How many different rectangle shapes are possible? (A 2 by 6 and a 6 by 2 count as the same shape.)', 3, { h: ['List the pairs of numbers that multiply to 12.'], s: '1 by 12, 2 by 6, and 3 by 4. That is 3 shapes.' }),
      num('c2b', 'What is the smallest perimeter among them?', 14, { h: ['Compute 2 × (length + width) for each shape.'], s: 'The perimeters are 26, 16, 14. The smallest is 14 (the 3 by 4).' }),
      num('c2c', 'What is the largest perimeter among them?', 26, { h: ['Which shape is the longest and skinniest?'], s: 'The 1 by 12 has perimeter 2 × 13 = 26.' }),
    ], 'The idea: with the same area, the closer a rectangle is to a square, the shorter its perimeter. Skinny shapes have lots of edge.'),
    mc('c3', 'Find the error. Zoe doubles both sides of a 4 by 6 rectangle to make an 8 by 12 rectangle and says: "Everything doubled, so the perimeter and the area both doubled." What is wrong?', ['Nothing, both doubled.', 'The perimeter doubled (20 to 40), but the area went from 24 to 96, which is 4 times as big.', 'Neither doubled.', 'The area doubled but the perimeter quadrupled.'], 1, {
      s: 'Perimeter is a length, so it doubles. Area counts squares: both directions doubled, so it is 2 × 2 = 4 times as big.',
      w: [[0, 'Check the area: 4 × 6 = 24 but 8 × 12 = 96.'], [3, 'It is the other way around: lengths double, areas quadruple.']],
    }),
  ],

  quiz: [
    tpl('rectP', (r) => {
      const l = r.int(4, 40), w = r.int(2, 30);
      return N('A rectangle is ' + l + ' units long and ' + w + ' units wide. What is its perimeter?', 2 * (l + w), { s: '2 × (' + l + ' + ' + w + ') = ' + 2 * (l + w) + '.', w: ws(2 * (l + w), [[l + w, 'That is only half the way around. Every side length appears twice.'], [l * w, 'That is the area. Perimeter adds the sides.']]) });
    }),
    tpl('rectMissing', (r) => {
      const l = r.int(5, 40), w = r.int(2, 30);
      return N(name(r) + ' knows a rectangle has perimeter ' + 2 * (l + w) + ' and length ' + l + '. What is the width?', w, { s: 'Half the perimeter is ' + (l + w) + ', and ' + (l + w) + ' − ' + l + ' = ' + w + '.', w: ws(w, [[2 * (l + w) - l, 'The length shows up twice in the perimeter, and so does the width. Split the perimeter in half first.']]) });
    }),
    tpl('square', (r) => {
      const s = r.int(3, 60), back = r.bool();
      return back ? N('A square has perimeter ' + 4 * s + '. How long is a side?', s, { s: 'Divide by 4: ' + s + '.', w: ws(s, [[2 * s, 'A square has four equal sides, so divide by 4, not 2.']]) })
        : N('A square has side ' + s + '. What is its perimeter?', 4 * s, { s: '4 × ' + s + ' = ' + 4 * s + '.', w: ws(4 * s, [[s * s, 'That is area. For the perimeter, add the four sides.']]) });
    }),
    tpl('segs', (r) => {
      const ab = r.int(2, 15), bc = r.int(2, 15), cd = r.int(2, 15);
      return N('Points A, B, C, D lie on a line in that order. AC = ' + (ab + bc) + ', BD = ' + (bc + cd) + ', and BC = ' + bc + '. Find AD.', ab + bc + cd, { s: 'AB = ' + ab + ', CD = ' + cd + ', so AD = ' + ab + ' + ' + bc + ' + ' + cd + ' = ' + (ab + bc + cd) + '.', w: ws(ab + bc + cd, [[ab + 2 * bc + cd, 'Adding AC and BD counts BC twice. Subtract it once.']]) });
    }),
    tpl('stairs', (r) => {
      const k = r.int(3, 12), a = r.int(1, 6), b = r.int(1, 6);
      return N('A staircase shape has a flat bottom and a straight left wall, and the top right is ' + k + ' steps, each ' + a + ' wide and ' + b + ' tall. What is its perimeter?', 2 * k * (a + b), { s: 'The box around it is ' + k * a + ' wide and ' + k * b + ' tall: 2 × (' + k * a + ' + ' + k * b + ') = ' + 2 * k * (a + b) + '.', w: ws(2 * k * (a + b), [[k * (a + b), 'That is only half way around. The bottom and left wall bring the total to the full box perimeter.']]) });
    }),
    tpl('barn', (r) => {
      const w = r.int(3, 20), l = r.int(8, 40);
      return N(name(r) + ' fences a rectangular pen against a barn wall, with no fence on the wall side. The two sides touching the wall are ' + w + ' m each and the side parallel to the wall is ' + l + ' m. How many meters of fence are used?', 2 * w + l, { s: w + ' + ' + w + ' + ' + l + ' = ' + (2 * w + l) + '.', w: ws(2 * w + l, [[2 * (w + l), 'That would fence all four sides, but the barn wall needs none.']]) });
    }),
    tpl('border', (r) => {
      const l = r.int(5, 30), w = r.int(3, 20), t = r.int(1, 9);
      return N('A ' + l + ' by ' + w + ' rectangle gets a border ' + t + ' wide all the way around. How much does its perimeter grow?', 8 * t, { s: 'Each of the four sides is lengthened by 2 × ' + t + ' in the border, and 4 × 2 × ' + t + ' = ' + 8 * t + '.', w: ws(8 * t, [[4 * t, 'The border sticks out on both ends of every side, so each side grows by 2 × ' + t + '.']]) });
    }),
  ],
});
