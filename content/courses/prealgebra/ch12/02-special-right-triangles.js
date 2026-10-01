import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const ws = (ans, list) => list.filter(([v], i) => v !== ans && v > 0 && list.findIndex((x) => x[0] === v) === i);

export default lesson({
  id: 'pre-12-2-special-right-triangles',
  title: 'Special right triangles',
  blurb: 'Two triangle shapes, half a square and half an equilateral triangle, have side ratios you can write down without calculating.',
  concepts: ['45-45-90', '30-60-90', 'square-roots', 'right-triangle'],

  tryFirst: [
    num('t1', 'A square has side length 1. Draw one diagonal; it cuts the square into two right triangles. If d is the length of the diagonal, what is d × d (that is, d²)?', 2, {
      h: ['The sides of the square are the legs. Use a² + b² = c².'],
      s: '1² + 1² = 2, so d² = 2. The diagonal is the number whose square is 2. We call it √2, about 1.41.',
      w: [['1', 'The diagonal is longer than a side, so its square is more than 1. Add the two squares of the legs.']],
    }),
    num('t2', 'An equilateral triangle has all three sides equal to 10. Draw the altitude from the top down to the bottom side. It lands exactly in the middle of the bottom side and creates two right triangles. How long is the short leg (half the bottom side) of one of these?', 5, {
      h: ['The bottom side is 10 and the altitude cuts it in half.'],
      s: 'Half of 10 is 5. So each right triangle has hypotenuse 10 and a short leg 5: the hypotenuse is twice the short leg.',
      w: [['10', 'That is the hypotenuse, the slanted side. The short leg is half the base.']],
    }),
  ],

  learn: [
    p('Most right triangles have messy sides. But two of them show up everywhere and have sides that follow a simple pattern. Both come from shapes you know: a square and an equilateral triangle.'),
    p('<b>Half a square.</b> Cut a square along its diagonal. You get a triangle with angles 45°, 45°, and 90°. The two legs are equal, say s. The Pythagorean theorem gives c² = s² + s² = 2s², so the hypotenuse is s√2.'),
    widget('pythagoras', { a: 3, b: 3 }),
    rule('<b>45-45-90 triangle.</b> Legs: s and s. Hypotenuse: s√2. To go from a leg to the hypotenuse, multiply by √2. From the hypotenuse back to a leg, divide by √2: a hypotenuse of 8√2 means legs of 8.'),
    ex('Half a square, in practice', ['A square has side 7. How long is its diagonal?', 'The diagonal is the hypotenuse of a 45-45-90 triangle with legs 7.', 'Hypotenuse = 7√2, which is about 7 × 1.41 = 9.9, a bit more than 7 and less than 14. That matches what we would expect.']),
    p('<b>Half an equilateral triangle.</b> Cut an equilateral triangle in half along an altitude. You get a triangle with angles 30°, 60°, and 90°. Its hypotenuse is a full side of the equilateral triangle, 2s, and its short leg is half the base, s. The long leg: (2s)² − s² = 3s², so it is s√3.'),
    rule('<b>30-60-90 triangle.</b> Short leg: s (opposite the 30°). Long leg: s√3 (opposite the 60°). Hypotenuse: 2s. The short leg is always half the hypotenuse.'),
    tbl(['Triangle', 'Sides in order', 'Where the root goes'], [['45-45-90', 's, s, s√2', 'on the hypotenuse'], ['30-60-90', 's, s√3, 2s', 'on the long leg']], 'Two patterns to memorize'),
    ex('Working back from the long leg', ['A 30-60-90 triangle has long leg 5√3. Find the other two sides.', 'The long leg is s√3, so s = 5.', 'Short leg = 5. Hypotenuse = 2 × 5 = 10.']),
    warn('<b>Watch out.</b> Only the hypotenuse of a 45-45-90 gets the √2, and only the long leg of a 30-60-90 gets the √3. The hypotenuse of a 30-60-90 is a plain 2s: no root at all.'),
    mcq('A 30-60-90 triangle has hypotenuse 10. Sam writes: "The legs are 5 and 5√2." What is wrong?', ['Nothing, that is right.', 'The √2 belongs to the 45-45-90 triangle. In a 30-60-90 the legs are 5 and 5√3.', 'The short leg should be 20.'], 1, 'Half of 10 is the short leg: 5. The long leg is the short leg times √3: 5√3. Check: 25 + 75 = 100 = 10².', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A 45-45-90 triangle has legs of length 9. Its hypotenuse is __√2. What number goes in the blank?', 9, {
      h: ['The hypotenuse is the leg times √2.'], s: '9 × √2 = 9√2.',
      w: [['18', 'The hypotenuse is s√2, not 2s. The 2s belongs to the 30-60-90 triangle.']],
    }),
    num('p2', 'A 45-45-90 triangle has hypotenuse 14√2. How long is each leg?', 14, {
      h: ['Undo the multiplication by √2.'], s: 'Hypotenuse = leg × √2, so leg = 14.',
      w: [['28', 'You doubled. Divide out √2 to get the leg.'], ['7', 'You halved, as in a 30-60-90. In a 45-45-90 the leg is the hypotenuse divided by √2.']],
    }),
    num('p3', 'A 30-60-90 triangle has short leg 7. How long is its hypotenuse?', 14, {
      h: ['The hypotenuse is twice the short leg.'], s: '2 × 7 = 14.',
      w: [['3.5', 'You halved. The hypotenuse is the longest side, so it is twice the short leg.']],
    }),
    num('p4', 'A 30-60-90 triangle has hypotenuse 20. How long is the short leg?', 10, {
      h: ['The short leg is half the hypotenuse.'], s: '20 ÷ 2 = 10.',
      w: [['40', 'The short leg is smaller than the hypotenuse, so you must halve, not double.']],
    }),
    num('p5', 'A 30-60-90 triangle has long leg 6√3. How long is its hypotenuse?', 12, {
      h: ['The long leg is s√3, so what is the short leg s?'], s: 's = 6, and the hypotenuse is 2s = 12.',
      w: [['6', 'That is the short leg. The hypotenuse is twice that.'], ['18', 'You multiplied by 3 for some reason. Find s first: the long leg is s√3.']],
    }),
    num('p6', 'A square has diagonal 12. What is its area?', 72, {
      h: ['The diagonal is the hypotenuse of a 45-45-90 triangle. What is the leg?', 'The leg is 12/√2. Its square is 144/2.'], s: 'A leg s satisfies s² + s² = 144, so s² = 72. The area of the square is s² = 72.',
      w: [['144', 'That is the diagonal squared. The area is half of that, since the diagonal squared equals 2s².'], ['36', 'That is 144 ÷ 4. The diagonal squared is 2 times the area, so divide 144 by 2, not 4.']],
    }),
    num('p7', 'An equilateral triangle has side 12. Its altitude (height) is __√3. What number goes in the blank?', 6, {
      h: ['The altitude splits the triangle into two 30-60-90 triangles with hypotenuse 12.'], s: 'Short leg = 6. The altitude is the long leg: 6√3.',
      w: [['12', 'The side is 12, but the altitude is shorter, the long leg of a 30-60-90 with hypotenuse 12.'], ['3', 'Half of 6? Short leg = 12 ÷ 2 = 6, then the altitude is 6 × √3.']],
    }),
    num('p8', 'A 45-45-90 triangle has area 32. Its hypotenuse is __√2. What number goes in the blank?', 8, {
      h: ['The area is ½ × leg × leg.', 'What leg makes ½ × s × s = 32?'], s: '½ s² = 32, so s² = 64 and s = 8. The hypotenuse is 8√2.',
      w: [['16', 'You halved the area, but ½ × s × s = 32 means s × s = 64, not 16. The leg is the number whose square is 64.'], ['32', 'That is the area, not the leg.']],
    }),
  ],

  challenge: [
    chain('The square frame', 'A square picture frame has sides of length 10.', [
      num('c1a', 'Its diagonal is __√2.', 10, { h: ['45-45-90 with legs 10.'], s: 'Diagonal = 10√2.' }),
      num('c1b', 'Wire is stretched along both diagonals (an X). The total wire is __√2.', 20, { h: ['Two diagonals.'], s: '2 × 10√2 = 20√2.' }),
      num('c1c', 'The diagonals cross at the center. The distance from the center to a corner is __√2.', 5, { h: ['The diagonals cut each other in half.'], s: 'Half of 10√2 is 5√2.' }),
    ], 'The idea: knowing one 45-45-90 triangle gives you everything. The diagonal of any square is √2 times its side.'),
    chain('The pennant', 'A pennant is an equilateral triangle with side 14.', [
      num('c2a', 'The altitude cuts the base into two equal parts. How long is each?', 7, { h: ['Half of 14.'], s: '7.' }),
      num('c2b', 'The altitude is __√3 long.', 7, { h: ['It is the long leg of a 30-60-90 with short leg 7.'], s: '7√3.' }),
      num('c2c', 'The area of the pennant is __√3. (Area = ½ × base × altitude.)', 49, { h: ['½ × 14 × 7√3.'], s: '½ × 14 × 7√3 = 7 × 7√3 = 49√3.' }),
    ], 'The idea: an equilateral triangle with side 2s has altitude s√3 and area s²√3, built from two 30-60-90 triangles.'),
    mc('c3', 'Find the error. Leo says: "A 30-60-90 triangle has short leg 5, so the hypotenuse is 5√2, because it is a special right triangle." What went wrong?', ['He used the 45-45-90 rule. In a 30-60-90 the hypotenuse is twice the short leg: 10.', 'Nothing, 5√2 is right.', 'The hypotenuse is 5√3.', 'The hypotenuse is 5 + 5 = 10, but only because the legs are equal.'], 0, {
      s: 'Different triangles, different patterns. 30-60-90: short, long = short × √3, hypotenuse = 2 × short.',
      w: [[3, 'The legs of a 30-60-90 are not equal (5 and 5√3). 10 is right, but because the hypotenuse is twice the short leg.'], [2, '5√3 is the long leg, not the hypotenuse.'], [1, 'Check: 5² + (5√3)² = 25 + 75 = 100, so the hypotenuse is 10.']],
    }),
  ],

  quiz: [
    tpl('toHyp45', (r) => {
      const s = r.int(2, 60);
      return N('A 45-45-90 triangle has legs of length ' + s + '. Its hypotenuse is __√2.', s, { s: 'Leg × √2: ' + s + '√2.', w: ws(s, [[2 * s, 'The hypotenuse is s√2, not 2s.']]) });
    }),
    tpl('toLeg45', (r) => {
      const s = r.int(2, 60);
      return N('A 45-45-90 triangle has hypotenuse ' + s + 'sqrt[2]. How long is each leg?', s, { s: 'Divide the hypotenuse by √2: ' + s + '.', w: ws(s, [[2 * s, 'The leg is smaller than the hypotenuse. Divide by √2.']]) });
    }),
    tpl('shortHyp', (r) => {
      const s = r.int(2, 60);
      return r.bool()
        ? N('A 30-60-90 triangle has short leg ' + s + '. How long is the hypotenuse?', 2 * s, { s: 'Twice the short leg: ' + 2 * s + '.', w: ws(2 * s, [[s * 3, 'The hypotenuse is exactly twice the short leg. The √3 is for the long leg.']]) })
        : N('A 30-60-90 triangle has hypotenuse ' + 2 * s + '. How long is the short leg?', s, { s: 'Half the hypotenuse: ' + s + '.', w: ws(s, [[4 * s, 'The short leg is half the hypotenuse.']]) });
    }),
    tpl('longToHyp', (r) => {
      const s = r.int(2, 60);
      return N('A 30-60-90 triangle has long leg ' + s + 'sqrt[3]. How long is the hypotenuse?', 2 * s, { s: 'The short leg is ' + s + ', so the hypotenuse is ' + 2 * s + '.', w: ws(2 * s, [[s, 'That is the short leg. The hypotenuse is twice it.']]) });
    }),
    tpl('shortToLong', (r) => {
      const s = r.int(2, 60);
      return N('A 30-60-90 triangle has short leg ' + s + '. Its long leg is __√3.', s, { s: 'Long leg = short leg × √3 = ' + s + '√3.', w: ws(s, [[2 * s, 'That is the hypotenuse. The long leg is the short leg times √3.']]) });
    }),
    tpl('sqDiag', (r) => {
      const d = r.int(2, 60);
      return N(name(r) + ' draws a square with diagonal ' + d + '. What is the area of the square? (A decimal is fine.)', (d * d) / 2, { s: 'The diagonal squared is twice the area: ' + d + '² ÷ 2 = ' + (d * d) / 2 + '.', w: ws((d * d) / 2, [[d * d, 'That is the diagonal squared. The area is half of it.']]) });
    }),
    tpl('eqHeight', (r) => {
      const s = r.int(2, 60);
      return N('An equilateral triangle has side ' + 2 * s + '. Its altitude is __√3.', s, { s: 'It is the long leg of a 30-60-90 with short leg ' + s + ': ' + s + '√3.', w: ws(s, [[2 * s, 'The altitude is shorter than the side. Halve the side first.']]) });
    }),
    tpl('eqArea', (r) => {
      const s = r.int(2, 30);
      return N('An equilateral triangle has side ' + 2 * s + '. Its area is __√3.', s * s, { s: 'Altitude ' + s + '√3, base ' + 2 * s + ': ½ × ' + 2 * s + ' × ' + s + '√3 = ' + s * s + '√3.', w: ws(s * s, [[2 * s * s, 'Do not forget the ½ in the triangle area.']]) });
    }),
  ],
});
