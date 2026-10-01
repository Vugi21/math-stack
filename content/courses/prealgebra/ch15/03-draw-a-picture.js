import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, twoNames } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => String(x[0]) !== String(ans));
const ch = (n, k) => { let t = 1; for (let i = 1; i <= k; i++) t = (t * (n - k + i)) / i; return t; };

export default lesson({
  id: 'pre-15-3-draw-a-picture',
  title: 'Draw a picture',
  blurb: 'Bar models, diagrams, grids and cut-up cubes: a good sketch turns a tangled story into something you can see.',
  concepts: ['diagrams', 'bar-model', 'problem-solving'],

  tryFirst: [
    num('t1', 'Ana has 3 times as many stickers as Ben. Together they have 48 stickers. How many stickers does Ana have?', 36, {
      h: ['Draw a short bar for Ben. How long is Ana\'s bar?', 'How many equal pieces in the two bars together?'],
      s: 'Draw Ben as 1 box and Ana as 3 boxes: 4 equal boxes in all. 48 ÷ 4 = 12 per box. Ana has 3 boxes: 36.',
      w: [['12', 'That is Ben\'s amount (one box). Ana has 3 boxes.'], ['16', '48 ÷ 3 would treat the 48 as Ana\'s amount alone. The total is Ben\'s box plus Ana\'s 3 boxes: 4 boxes.']],
    }),
    num('t2', 'A 3 × 3 × 3 cube is built from 27 small cubes and painted red on the outside, all six faces. It is then taken apart. How many of the small cubes have exactly two red faces?', 12, {
      h: ['Draw the big cube. Which small cubes touch two outside faces? Think edges.', 'A big cube has 12 edges. How many small cubes are on each edge, not counting the corners?'],
      s: 'Corner cubes have 3 painted faces. Cubes in the middle of an edge have exactly 2. Each of the 12 edges has 1 such middle cube. 12 cubes.',
      w: [['8', '8 is the number of corner cubes, which have 3 painted faces.'], ['6', 'The 6 cubes in the centers of faces have only 1 painted face.']],
    }),
  ],

  learn: [
    p('A good picture does not have to be pretty. It has to show <b>the relationships</b> in the problem: who is bigger, what adds to what, what is shared. Many "hard" problems become one-step problems once you draw them.'),
    rule('<b>Drawing method.</b> (1) Read the problem and decide what the picture should show. (2) Draw a simple version: boxes, bars, dots, lines. (3) Label the known numbers. (4) Let the picture suggest the equal parts or the missing piece. (5) Check that every sentence of the problem is in the picture.'),
    ex('Bar model: total and difference', ['Two numbers add to 70. The bigger is 12 more than the smaller. Find them.', 'Draw two bars: a short bar for the smaller, and a longer bar that is the same plus an extra piece of 12.', 'Chop off the extra 12 from the total: 70 − 12 = 58 is two equal bars.', 'Smaller: 58 ÷ 2 = 29. Bigger: 29 + 12 = 41.']),
    ex('Bar model: fractions', ['Two thirds of a class are girls, and there are 8 boys. How many students in all?', 'Draw the class as 3 equal boxes. Girls take 2 boxes, so the boys are 1 box.', 'One box is 8, so 3 boxes are 24 students.']),
    widget('venn', { A: 'sings', B: 'dances', onlyA: 9, both: 4, onlyB: 6, neither: 3 }),
    p('A <b>Venn diagram</b> is a picture of overlapping groups. The overlap sits in the middle and is counted once. Slide the numbers above: the total in the whole picture is the sum of the four regions.'),
    ex('Routes on a grid', ['You can only move right or up. How many shortest routes lead from the bottom-left corner to the top-right corner of a grid that is 2 blocks wide and 2 blocks high?', 'Write at each corner how many ways reach it: the whole bottom row and left column are 1.', 'Every other corner is (ways from the left) + (ways from below): 2, then 3 and 3, then 6 at the top right.', 'Answer: 6 routes.']),
    ex('The painted cube, in layers', ['A 4 × 4 × 4 cube is painted, then cut into 64 small cubes.', 'The 8 corner cubes have 3 painted faces.', 'Each edge has 2 middle cubes with 2 painted faces: 12 × 2 = 24.', 'Each face has a 2 × 2 center with 1 painted face: 6 × 4 = 24.', 'The hidden inside 2 × 2 × 2 has no paint: 8. Check: 8 + 24 + 24 + 8 = 64.']),
    warn('<b>A picture must match the problem, not just look like it.</b> If you draw Ben\'s bar and Ana\'s bar the same length when the problem says Ana has 3 times as many, the picture lies. Compare every sentence of the problem with your picture.'),
    mcq('Dev draws a bar model for "pencils to pens is 3 : 2, 40 items in all". He says: "Pens are {2/3} of 40." What is wrong?', ['Nothing, pens are {2/3} of 40.', 'There are 3 + 2 = 5 equal boxes in all. Pens are 2 of the 5, so pens are {2/5} of 40 = 16.', 'Pens are 2 of 40.'], 1, 'The ratio 3 : 2 splits the 40 items into 3 + 2 = 5 equal parts. Pens are 2 of those: 40 ÷ 5 × 2 = 16.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Two numbers add up to 70, and the bigger one is 12 more than the smaller one. What is the bigger number?', 41, {
      h: ['Draw two bars; the bigger bar has an extra piece of 12.'],
      s: 'Remove the extra 12: 70 − 12 = 58 is two equal bars of 29. The bigger is 29 + 12 = 41.',
      w: [['29', 'That is the smaller number. The question asks for the bigger.'], ['35', 'That would be right if they were equal. The bigger one is 12 more than the smaller.']],
    }),
    num('p2', 'Maya spends {1/3} of her money on a book. She then spends {1/2} of what is left on lunch. She has 10 dollars at the end. How many dollars did she start with?', 30, {
      h: ['Draw her money as 3 boxes. After the book, how many boxes remain?', 'Lunch takes half of the remaining boxes.'],
      s: 'Draw 3 boxes. The book costs 1 box, leaving 2 boxes. Lunch takes half of those, 1 box, leaving 1 box. That 1 box is 10 dollars, so 3 boxes = 30 dollars.',
      w: [['20', '20 is how much she had after buying the book (2 boxes), not at the start.'], ['15', 'Half of what remained goes to lunch, and the leftover is one box = 10 dollars. Three boxes in all.']],
    }),
    num('p3', 'On a city grid you may only walk right or up along the streets. How many shortest routes are there from the bottom-left corner to the top-right corner if the grid is 3 blocks wide and 2 blocks high?', 10, {
      h: ['Write at each corner the number of ways to reach it.', 'Each corner gets the sum of the corner to its left and the one below it.'],
      s: 'Bottom row: 1, 1, 1, 1. Middle row: 1, 2, 3, 4. Top row: 1, 3, 6, 10. The top-right corner has 10 routes.',
      w: [['6', '6 is the answer for a 2 by 2 grid. This grid is 3 blocks wide.'], ['5', 'Count more carefully; label each corner with the sum of its left and lower neighbors.']],
    }),
    num('p4', 'A 3 × 3 × 3 cube is painted on the outside and cut into 27 small cubes. How many of the small cubes have exactly one painted face?', 6, {
      h: ['Which small cubes sit in the center of a face of the big cube?'],
      s: 'Each of the 6 faces has exactly one small cube in its center, touching only that one outside face. 6 cubes.',
      w: [['12', 'That is the number with two painted faces (edge cubes).'], ['9', 'A face has 9 small squares, but the corners and edges have more paint. Only the center one has exactly one painted face.']],
    }),
    num('p5', 'Twenty people sit at a round table, numbered 1 to 20 in order around it. Person 7 looks straight across the table at which person?', 17, {
      h: ['Draw the circle. Directly across means halfway around.', 'Halfway around 20 seats is how many seats?'],
      s: 'Halfway around is 10 seats. 7 + 10 = 17.',
      w: [['10', '10 is the number of seats to go. Add it to 7.'], ['13', '13 is 20 − 7. The person directly across is 10 seats away.']],
    }),
    num('p6', 'Three paper strips, each 20 cm long, are glued end to end in a row. Each neighboring pair overlaps by 3 cm. How long is the whole row, in cm?', 54, {
      h: ['Draw the three strips overlapping. How many overlaps are there?'],
      s: 'Three strips total 60 cm, but there are 2 overlaps (between strips 1 and 2, and 2 and 3), each hidden 3 cm: 60 − 6 = 54.',
      w: [['51', '51 would subtract 3 overlaps. Three strips in a row have only 2 neighbor pairs.'], ['57', 'There are two overlaps, not one.']],
    }),
    num('p7', 'A square has a side of 10 cm. From each of its four corners a small 3 cm by 3 cm square is cut out. What is the perimeter of the remaining shape, in cm?', 40, {
      h: ['Draw it. Trace the new boundary around one corner and compare with the old corner.', 'The new edge goes in 3 and then out again 3.'],
      s: 'At a corner, the old boundary ran along two sides to the corner point. The new boundary runs 3 cm in and 3 cm along: the same total length (3 + 3). So the perimeter does not change: 4 × 10 = 40 cm. (The area does change: 100 − 36 = 64.)',
      w: [['28', 'That subtracts too much. The cut-out replaces the missing corner edges by edges of the same total length.'], ['64', '64 is the remaining area, not the perimeter.']],
    }),
  ],

  challenge: [
    chain('Three friends', 'Ana has twice as many cards as Ben. Cy has 5 more cards than Ana. Together they have 80 cards.', [
      num('c1a', 'If you take away Cy\'s 5 extra cards, how many cards remain in total?', 75, { h: ['80 − 5.'], s: '80 − 5 = 75. Now Cy has the same as Ana.' }),
      num('c1b', 'In the picture of 75, Ben has 1 box, Ana 2 boxes, and Cy 2 boxes. How many cards does Ben have?', 15, { h: ['5 boxes make 75.'], s: '75 ÷ 5 = 15.' }),
      num('c1c', 'How many cards does Cy have?', 35, { h: ['Cy is Ana plus 5.'], s: 'Ana has 30, so Cy has 30 + 5 = 35.', w: [['30', '30 is Ana\'s count. Cy has 5 more.']] }),
    ], 'The idea: drawing the bars lets you remove the odd piece (the extra 5) so that everything left comes in equal boxes.'),
    chain('The 4 by 4 by 4 cube', 'A 4 × 4 × 4 cube is painted on the outside and cut into 64 unit cubes.', [
      num('c2a', 'How many small cubes have exactly 3 painted faces?', 8, { h: ['Corners.'], s: 'A cube has 8 corners: 8 small cubes.' }),
      num('c2b', 'How many small cubes have exactly 2 painted faces?', 24, { h: ['Each edge has 4 small cubes; two are corners.', '12 edges.'], s: 'Each edge has 4 − 2 = 2 middle cubes. 12 × 2 = 24.' }),
      num('c2c', 'How many small cubes have no paint at all?', 8, { h: ['Imagine peeling off the outer layer. What cube is left inside?'], s: 'Peeling a layer of thickness 1 from every side leaves a 2 × 2 × 2 cube: 8 small cubes.', w: [['16', 'The unpainted part is a cube, 2 × 2 × 2, not a flat 4 × 4 square.']] }),
    ], 'The idea: picture the big cube as corners, edges, faces, and a core. Each part is a simple count, and the parts add up to 64.'),
    mc('c3', 'Find the error. A fence of 12 meters has a post every 2 meters, including both ends. Hiro says: "12 ÷ 2 = 6 posts." Which fix is right?', ['Draw it: there are 6 gaps between posts, but 7 posts (one more post than gaps).', 'Hiro is right, 6 posts.', 'There are 12 posts.', 'There are 5 posts.'], 0, {
      s: 'Draw posts and gaps: post-gap-post-gap-...-post. 6 gaps need 7 posts, since both ends have a post.',
      w: [[1, 'The division counts the gaps, and a fence with posts at both ends has one more post than gaps.'], [3, 'That would be one post too few, even fewer than the gaps.']],
    }),
  ],

  quiz: [
    tpl('times', (r) => {
      const k = r.int(2, 7), b = r.int(3, 40), [x, y] = twoNames(r), T = (k + 1) * b, which = r.bool();
      return N(x + ' has ' + k + ' times as many marbles as ' + y + '. Together they have ' + T + ' marbles. How many marbles does ' + (which ? x : y) + ' have?', which ? k * b : b, { s: (k + 1) + ' equal boxes make ' + T + ', so one box is ' + b + '. ' + (which ? x + ' has ' + k + ' boxes: ' + k * b + '.' : y + ' has 1 box: ' + b + '.'), w: [[which ? b : k * b, 'That is the other person\'s amount. Re-read who the question asks about.'], [Math.round(T / k), 'The total is ' + (k + 1) + ' boxes (both bars together), not ' + k + '.']].filter((w) => Number(w[0]) !== (which ? k * b : b)) });
    }),
    tpl('diff', (r) => {
      const D = r.int(2, 30), sm = r.int(5, 60), T = 2 * sm + D, big = r.bool();
      return N('Two numbers add to ' + T + ', and one is ' + D + ' more than the other. What is the ' + (big ? 'bigger' : 'smaller') + ' number?', big ? sm + D : sm, { s: 'Remove the extra ' + D + ': ' + (T - D) + ' is two equal bars of ' + sm + '. Smaller ' + sm + ', bigger ' + (sm + D) + '.', w: [[T / 2, 'That would be right if the two numbers were equal. One is ' + D + ' bigger.']].filter((w) => w[0] !== (big ? sm + D : sm)) });
    }),
    tpl('grid', (r) => {
      const a = r.int(2, 7), b = r.int(2, 7), c = ch(a + b, a);
      return N('You may only move right or up along the streets of a grid. How many shortest routes go from the bottom-left corner to the top-right corner of a grid that is ' + a + ' blocks wide and ' + b + ' blocks high?', c, { s: 'Label each corner with (ways from the left) + (ways from below), starting with 1s along the bottom and left edges. The top-right corner gets ' + c + '.', w: W(c, [[a * b, 'Routes are not the same as the area of the grid. Count with the add-the-two-neighbors method.'], [a + b, 'That is the length of one route, not the number of routes.']]) });
    }),
    tpl('cube', (r) => {
      const n = r.int(3, 10), k = r.int(0, 3), v = [(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8][k];
      const nm = ['no painted faces', 'exactly one painted face', 'exactly two painted faces', 'exactly three painted faces'][k];
      return N((n === 8 ? 'An ' : 'A ') + n + ' × ' + n + ' × ' + n + ' cube is painted on the outside and cut into ' + n * n * n + ' unit cubes. How many unit cubes have ' + nm + '?', v, { s: ['The unpainted core is ' + (n - 2) + ' × ' + (n - 2) + ' × ' + (n - 2) + ': ' + v + '.', 'Each of 6 faces has a ' + (n - 2) + ' × ' + (n - 2) + ' middle: 6 × ' + (n - 2) ** 2 + ' = ' + v + '.', 'Each of 12 edges has ' + (n - 2) + ' middle cubes: ' + v + '.', 'The 8 corners.'][k], w: [] });
    }),
    tpl('around', (r) => {
      const N0 = 2 * r.int(5, 50), pp = r.int(1, N0), opp = ((pp - 1 + N0 / 2) % N0) + 1;
      return N(N0 + ' people sit around a circular table, numbered 1 to ' + N0 + ' in order. Which person sits directly opposite person ' + pp + '?', opp, { s: 'Directly opposite means ' + N0 / 2 + ' seats around. ' + pp + ' + ' + N0 / 2 + (pp + N0 / 2 > N0 ? ' − ' + N0 : '') + ' = ' + opp + '.', w: W(opp, [[N0 / 2, 'That is how many seats you move. Add it to ' + pp + ' (and wrap around past ' + N0 + ').']]) });
    }),
    tpl('strips', (r) => {
      const n = r.int(3, 12), L = r.int(10, 60), o = r.int(1, 8), t = n * L - (n - 1) * o;
      return N(n + ' strips of paper, each ' + L + ' cm long, are glued in a row with each neighboring pair overlapping by ' + o + ' cm. How long is the row, in cm?', t, { s: n + ' × ' + L + ' = ' + n * L + ', minus ' + (n - 1) + ' overlaps of ' + o + ': ' + t + '.', w: W(t, [[n * L - n * o, 'There is one fewer overlap than strips: ' + (n - 1) + ' overlaps.']]) });
    }),
    tpl('corners', (r) => {
      const s = r.int(10, 40), c = r.int(1, Math.floor(s / 4)), area = r.bool();
      return N('A square of side ' + s + ' cm has a ' + c + ' cm by ' + c + ' square cut out of each of its four corners. What is the ' + (area ? 'area' : 'perimeter') + ' of the remaining shape?', area ? s * s - 4 * c * c : 4 * s, { s: area ? 'Area: ' + s * s + ' − 4 × ' + c * c + ' = ' + (s * s - 4 * c * c) + '.' : 'Each cut replaces two edges of length ' + c + ' by two edges of the same total length, so the perimeter stays 4 × ' + s + ' = ' + 4 * s + '.', w: area ? [] : [[4 * s - 8 * c, 'Cutting a corner does not shorten the boundary: the new edges are as long as the removed ones.']].filter((w) => w[0] !== 4 * s) });
    }),
    tpl('fraction', (r) => {
      const a = r.int(2, 6), b = r.int(2, 6), m = r.int(1, 6), start = a * b * m, left = (a - 1) * (b - 1) * m;
      return N(name(r) + ' spends {1/' + a + '} of the money on a toy, then {1/' + b + '} of what is left on a snack. ' + left + ' dollars remain. How many dollars were there at the start?', start, { s: 'After the toy, ' + (a - 1) + '/' + a + ' remain; after the snack, ' + (b - 1) + '/' + b + ' of that remain. Together ' + (a - 1) * (b - 1) + '/' + a * b + ' of the money is ' + left + ', so each ' + 1 + '/' + a * b + ' is ' + m + ' and the start is ' + start + '.', w: W(start, [[left * 2, 'Doubling does not undo two different fractions. Draw the money as ' + a + ' boxes and follow what remains.']]) });
    }),
  ],
});
