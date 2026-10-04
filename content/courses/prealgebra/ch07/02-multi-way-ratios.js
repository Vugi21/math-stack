import { lesson, num, ratio, mc, N, RT, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);
const lcm = (a, b) => (a * b) / gcd(a, b);
const trip = (r, hi = 7) => { let t; do { t = [r.int(1, hi), r.int(1, hi), r.int(1, hi)]; } while (new Set(t).size < 3 || t.reduce(gcd) !== 1); return t; };
const sort3 = (t) => t.slice().sort((x, y) => x - y);

export default lesson({
  id: 'pre-7-2-multi-way-ratios',
  title: 'Three-way ratios',
  blurb: 'Splitting a total three ways, reading a:b:c, and joining two ratios that share a middle quantity.',
  concepts: ['ratio', 'three-way-ratio', 'sharing'],

  tryFirst: [
    num('t1', 'Trail mix is made of peanuts, raisins, and pretzels in the ratio 2 : 3 : 5 by weight. How many grams of raisins are in a 500 g bag?', 150, {
      h: ['How many parts is the whole bag?', 'Find the weight of one part.'],
      s: '2 + 3 + 5 = 10 parts. 500 ÷ 10 = 50 g per part. Raisins are 3 parts: 150 g.',
      w: [['100', 'That is the peanuts (2 parts). Raisins are 3 parts.'], ['250', 'That is the pretzels, 5 parts. Raisins are 3 parts.']],
    }),
    num('t2', 'Three friends split 60 stickers in the ratio 1 : 2 : 3. How many stickers does the friend with the biggest share get?', 30, {
      h: ['1 + 2 + 3 is how many parts?'], s: '6 parts, so one part is 10 stickers. The biggest share is 3 parts: 30.',
      w: [['20', 'That is the middle share. The biggest share is 3 parts.'], ['10', 'That is one part, the smallest share.']],
    }),
  ],

  learn: [
    p('A <b>three-way ratio</b> like <b>2 : 3 : 5</b> compares three amounts at once. Everything from the two-way case still works: multiply or divide all three parts by the same number to get an equivalent ratio, and add the parts to get the whole.'),
    def('three-way ratio', 'A ratio a : b : c comparing three quantities. For every a of the first there are b of the second and c of the third. The whole is a + b + c parts.'),
    def('share (part)', 'One equal slice of the total. In a ratio 2 : 3 : 7, the total is cut into 12 equal parts, and the three people get 2, 3 and 7 of them. The value of one part is total ÷ 12.'),
    widget('ratioTable', { a: 2, b: 3, k: 3 }),
    rule('<b>Sharing a total.</b> (1) Add the parts to find how many parts there are. (2) Divide the total by that number to get the value of one part. (3) Multiply by each person\'s number of parts. Check that the shares add back to the total.'),
    formula('Share of a total', 'share = total × {own parts/all parts}', 'For a ratio 3 : 4 : 9 the number of all parts is 16. With a total of 96, the person with 3 parts gets 96 × {3/16} = 18.'),
    ex('Splitting $96', ['Ana, Ben, and Cam share $96 in the ratio 3 : 4 : 9.', 'Parts: 3 + 4 + 9 = 16.', 'One part: 96 ÷ 16 = 6 dollars.', 'Shares: Ana 18, Ben 24, Cam 54. Check: 18 + 24 + 54 = 96. ✓']),
    ex('When one amount is known', ['Flour : sugar : butter = 2 : 3 : 5, and there are 18 cups of sugar. Find all three amounts and the total.', 'Sugar is 3 parts and equals 18 cups, so one part is 18 ÷ 3 = 6 cups.', 'Flour: 2 × 6 = 12. Sugar: 18. Butter: 5 × 6 = 30.', 'Total: 12 + 18 + 30 = 60 cups, which is 10 parts of 6. Check: 10 × 6 = 60. ✓']),
    ex('When a difference is known', ['Two sisters split marbles in the ratio 5 : 3, and the older one gets 14 more than the younger.', 'The difference is 5 − 3 = 2 parts, and 2 parts equal 14 marbles.', 'One part is 7 marbles. The older sister has 5 × 7 = 35 and the younger has 3 × 7 = 21.', 'Check: 35 − 21 = 14. ✓']),
    rule('<b>Joining two ratios.</b> If a : b and b : c share the quantity b, rescale each ratio until the b-values match, then read off a : b : c. The matching value is a common multiple of the two b numbers; the least common multiple keeps the numbers small.'),
    ex('Matching the middle', ['Cats : dogs = 2 : 3 and dogs : birds = 6 : 5. Find cats : dogs : birds.', 'The dogs numbers are 3 and 6. Make both 6: multiply 2 : 3 by 2 to get 4 : 6.', 'Now cats : dogs = 4 : 6 and dogs : birds = 6 : 5.', 'Combined: 4 : 6 : 5.']),
    ex('Matching with the least common multiple', ['a : b = 3 : 4 and b : c = 6 : 5. Find a : b : c.', 'The b numbers are 4 and 6. Their least common multiple is 12.', 'Multiply 3 : 4 by 3 to get 9 : 12. Multiply 6 : 5 by 2 to get 12 : 10.', 'So a : b : c = 9 : 12 : 10. No common factor divides all three, so this is in lowest terms.']),
    tbl(['Ratio a : b : c', 'Total parts', 'b as a fraction of the whole'], [['1 : 3 : 4', '8', '{3/8}'], ['2 : 3 : 5', '10', '{3/10}'], ['4 : 6 : 5', '15', '{6/15} = {2/5}']], 'The whole is always the sum of the parts'),
    warn('<b>Watch out.</b> A three-way ratio does not shrink to a two-way one by ignoring a part. If a : b : c = 2 : 3 : 5, then a : b = 2 : 3 but a : c = 2 : 5. And when you join two ratios, the shared quantity must have the <i>same number</i> in both before you merge them.'),
    warn('<b>Watch out: do not divide by the wrong total.</b> In 2 : 3 : 5 the whole is 10 parts, not 5. Splitting 60 as 60 ÷ 5 = 12 per part gives shares that add up to 120, not 60. Always check that your shares add back to the total.'),
    tip('<b>Reduce first, then check.</b> The ratio 4 : 6 : 10 is the same as 2 : 3 : 5, with smaller numbers and an easier sum. After finding the shares, add them: the sum should equal the total exactly. If it does not, a part count or a multiplication is wrong.'),
    key('Every ratio problem has one hidden number: <b>the size of one part</b>. Find it by dividing a known amount (the total, one share, or a difference) by the number of parts it covers, then multiply for the other shares.'),
    mcq('Mia says: "Red : blue = 2 : 3 and blue : green = 4 : 5, so red : blue : green = 2 : 3 : 5." What is wrong?', ['Nothing, she lined them up correctly.', 'The blue numbers (4 and 2) are not equal. Rescale first: 3 : 4 becomes 6 : 8 and 2 : 5 becomes 8 : 20, giving 6 : 8 : 20.', 'You can never combine ratios.'], 1, 'Blue is 4 parts in one ratio and 2 parts in the other, so those "parts" are different sizes. Match them at 8, then combine: 6 : 8 : 20 = 3 : 4 : 10.', 'Spot the mistake'),
    recap([['three-way ratio', 'a : b : c; the whole is a + b + c parts'], ['one part', 'a known amount ÷ the number of parts it covers'], ['joining ratios', 'make the shared quantity equal in both, then merge']], [['Share of a total', 'total × {own parts/all parts}'], ['Common multiple', 'use the LCM of the shared numbers']]),
  ],

  practice: [
    ratio('p1', 'A bag has 12 red, 18 blue, and 30 green candies. Write the ratio red : blue : green in lowest terms.', '2:3:5', {
      h: ['Divide all three by one number that goes into every one of them.'], s: 'The greatest common factor of 12, 18, 30 is 6. Dividing gives 2 : 3 : 5.',
    }),
    num('p2', 'Three cousins share $84 in the ratio 2 : 3 : 7. How many dollars does the cousin with the smallest share get?', 14, {
      h: ['2 + 3 + 7 parts altogether.'], s: '12 parts. 84 ÷ 12 = 7 per part. Smallest share: 2 × 7 = 14.',
      w: [['49', 'That is the biggest share (7 parts). The smallest is 2 parts.'], ['7', 'That is the value of one part. Multiply by the 2 parts.']],
    }),
    num('p3', 'The three angles of a triangle are in the ratio 2 : 3 : 4. How big, in degrees, is the largest angle?', 80, {
      h: ['The three angles of any triangle add to 180 degrees.'], s: '2 + 3 + 4 = 9 parts. 180 ÷ 9 = 20 degrees each. Largest: 4 × 20 = 80.',
      w: [['60', 'That is the middle angle (3 parts). Largest is 4 parts.'], ['90', 'It is not a right angle. 180 ÷ 9 = 20, then 4 parts.']],
    }),
    ratio('p4', 'Ava : Ben = 3 : 4 and Ben : Cy = 2 : 5 (in marbles). Write Ava : Ben : Cy in lowest terms.', '3:4:10', {
      h: ['Ben has 4 in one ratio and 2 in the other. Make them equal.'], s: 'Scale Ben : Cy up by 2 to get 4 : 10. Now Ben is 4 in both: Ava : Ben : Cy = 3 : 4 : 10.',
      w: [['3:4:5', 'The Ben numbers (4 and 2) did not match. Double 2 : 5 to 4 : 10 first.']],
    }),
    mc('p5', 'Shares are in the ratio 1 : 2 : 3. What fraction of the total does the middle share get?', ['{1/3}', '{1/2}', '{2/3}', '{2/5}'], 0, {
      h: ['Total parts 1 + 2 + 3.'], s: 'The middle share is 2 parts out of 6: {2/6} = {1/3}.',
      w: [[1, 'That is the biggest share ({3/6} = {1/2}). The middle share is 2 of the 6 parts.'], [2, 'That compares 2 parts to 3 parts. For a fraction of the whole, the bottom is all the parts: 1 + 2 + 3 = 6.']],
    }),
    num('p6', 'Three siblings\' ages are in the ratio 2 : 3 : 4. The oldest and the youngest are 36 years old together. How old is the middle sibling?', 18, {
      h: ['Oldest + youngest is 4 + 2 parts.'], s: '2 + 4 = 6 parts equal 36, so one part is 6 years. The middle is 3 × 6 = 18.',
      w: [['12', 'That is the youngest (2 parts). Middle is 3 parts.'], ['9', 'You split 36 into 4 parts, but the oldest and youngest together are 6 parts.']],
    }),
    num('p7', 'Concrete is cement : sand : gravel = 2 : 3 : 7 by volume. A batch has 20 m³ more gravel than cement. How many m³ of sand are in the batch?', 12, {
      h: ['Gravel minus cement is 7 − 2 parts.'], s: '5 parts equal 20, so a part is 4 m³. Sand is 3 parts: 12 m³.',
      w: [['20', 'That is the difference between gravel and cement, which is 5 parts. Sand is 3 parts of 4.'], ['28', 'That is the gravel (7 parts). Sand is 3 parts.']],
    }),
  ],

  challenge: [
    chain('Fruit salad', 'A fruit salad has apple, grape, and melon pieces in the ratio 4 : 3 : 2. It has 36 pieces in all.', [
      num('c1a', 'How many grape pieces?', 12, { h: ['4 + 3 + 2 parts.'], s: '9 parts, so one part is 4 pieces. Grapes: 3 × 4 = 12.' }),
      num('c1b', 'How many melon pieces?', 8, { h: ['Melon is 2 parts.'], s: '2 × 4 = 8.' }),
      num('c1c', 'How many melon pieces must be added so that there are as many melon pieces as apple pieces?', 8, { h: ['Apples: 4 × 4 = 16.'], s: 'Apples are 16 and melon is 8, so add 8 melon pieces.' }),
    ], 'The idea: once you know the size of one part, every quantity in the ratio is a multiple of it.'),
    chain('Linking ratios', 'Ana, Ben, and Cy collect cards. Ana : Ben = 3 : 5 and Ben : Cy = 10 : 7.', [
      num('c2a', 'If Ben has 20 cards, how many does Ana have?', 12, { h: ['20 is how many batches of 5?'], s: '20 ÷ 5 = 4 batches. Ana: 3 × 4 = 12.' }),
      num('c2b', 'How many does Cy have?', 14, { h: ['Use Ben : Cy = 10 : 7. 20 is 2 batches of 10.'], s: '20 ÷ 10 = 2 batches. Cy: 7 × 2 = 14.' }),
      ratio('c2c', 'Write Ana : Ben : Cy in lowest terms.', '6:10:7', { h: ['You now know all three amounts: 12, 20, 14.'], s: '12 : 20 : 14 divides by 2 to give 6 : 10 : 7.' }),
    ], 'The idea: choosing a real number for the shared quantity (here Ben = 20) is a quick way to join two ratios.'),
    mc('c3', 'Find the error. Lia says: "a : b = 3 : 4 and b : c = 2 : 5, so a : b : c = 3 : 4 : 5." Which is right?', ['She is right.', 'The b-values 4 and 2 must match first, so the answer is 3 : 4 : 10.', 'The answer should be 3 : 2 : 5.', 'The answer should be 6 : 8 : 5.'], 1, {
      s: 'Double b : c = 2 : 5 to 4 : 10. Now b = 4 in both, so a : b : c = 3 : 4 : 10.',
      w: [[0, 'In one ratio b is 4 parts, in the other 2 parts. They are not the same size. Match them first.'], [3, 'You doubled the first ratio but the c-part must then change too. Matching b at 8 gives 6 : 8 : 20.']],
    }),
  ],

  quiz: [
    tpl('share', (r) => {
      const [a, b, c] = trip(r, 8), k = r.int(2, 15), [n1, n2, n3] = r.pick([['Ana', 'Ben', 'Cam'], ['Dev', 'Eli', 'Fay'], ['Gus', 'Hana', 'Ivo']]);
      const total = (a + b + c) * k, who = r.int(0, 2), parts = [a, b, c][who], nm = [n1, n2, n3][who];
      return N(n1 + ', ' + n2 + ', and ' + n3 + ' share $' + total + ' in the ratio ' + a + ' : ' + b + ' : ' + c + '. How many dollars does ' + nm + ' get?', parts * k, { s: (a + b + c) + ' parts, so one part is $' + k + '. ' + nm + ' gets ' + parts + ' parts: $' + parts * k + '.', w: wr(parts * k, [[k, 'That is one part. Multiply by ' + nm + '\'s ' + parts + ' parts.'], [total / 3, 'Splitting evenly ignores the ratio.']]) });
    }),
    tpl('simp3', (r) => {
      const [a, b, c] = trip(r, 9), k = r.int(2, 9);
      return RT('A mix has ' + a * k + ' g of oats, ' + b * k + ' g of nuts, and ' + c * k + ' g of seeds. Write oats : nuts : seeds in lowest terms.', a + ':' + b + ':' + c, { s: 'Divide all three by ' + k + ': ' + a + ' : ' + b + ' : ' + c + '.' });
    }),
    tpl('link', (r) => {
      let p1, q1, s1, t1;
      do { p1 = r.int(1, 7); q1 = r.int(2, 9); s1 = r.int(2, 9); t1 = r.int(1, 9); } while (q1 === s1 || gcd(p1, q1) !== 1 || gcd(s1, t1) !== 1);
      const L = lcm(q1, s1), A = p1 * (L / q1), C = t1 * (L / s1), g = gcd(gcd(A, L), C);
      return RT('Red : blue = ' + p1 + ' : ' + q1 + ' and blue : green = ' + s1 + ' : ' + t1 + '. Write red : blue : green.', A / g + ':' + L / g + ':' + C / g, { s: 'Make blue equal in both: ' + L + '. Red : blue becomes ' + A + ' : ' + L + ' and blue : green becomes ' + L + ' : ' + C + '. So ' + A + ' : ' + L + ' : ' + C + ' (lowest terms ' + A / g + ' : ' + L / g + ' : ' + C / g + ').', w: [[p1 + ':' + q1 + ':' + t1, 'The blue numbers (' + q1 + ' and ' + s1 + ') did not match. Rescale before combining.']].filter(([x]) => x !== A / g + ':' + L / g + ':' + C / g) });
    }),
    tpl('diff', (r) => {
      const t = sort3(trip(r, 9)), k = r.int(2, 9);
      const D = (t[2] - t[0]) * k;
      const which = r.int(0, 2);
      const nm = ['the smallest part', 'the middle part', 'the biggest part'][which];
      return N('Three amounts are in the ratio ' + t.join(' : ') + '. The biggest is ' + D + ' more than the smallest. What is ' + nm + '?', t[which] * k, { s: 'The gap between the biggest and smallest is ' + (t[2] - t[0]) + ' parts, which equals ' + D + ', so a part is ' + k + '. ' + nm + ' is ' + t[which] + ' × ' + k + ' = ' + t[which] * k + '.', w: wr(t[which] * k, [[D, 'That is the difference itself. Divide it by the number of parts it covers to get one part.'], [k, 'That is one part. Multiply by the number of parts asked for.']]) });
    }),
    tpl('angles', (r) => {
      const T = r.pick([[1, 2, 3], [2, 3, 4], [2, 3, 5], [1, 3, 6], [3, 4, 5], [1, 4, 5], [1, 5, 6], [1, 1, 2]]);
      const s = 180 / T.reduce((x, y) => x + y, 0), which = r.int(0, 2);
      const ctx = r.pick(['A triangle has angles in the ratio ', 'The corners of a triangular garden have angles in the ratio ', 'A triangular sail has angles in the ratio ']);
      return N(ctx + T.join(' : ') + '. How many degrees is ' + ['the smallest angle', 'the middle angle', 'the largest angle'][which] + '?', sort3(T)[which] * s, { s: 'The angles sum to 180, ' + T.reduce((x, y) => x + y, 0) + ' parts, so one part is ' + s + ' degrees. ' + sort3(T)[which] + ' × ' + s + ' = ' + sort3(T)[which] * s + '.' });
    }),
    tpl('frac3', (r) => {
      const [a, b, c] = trip(r, 8), which = r.int(0, 2), part = [a, b, c][which];
      return N('Red, blue, and green tiles are in the ratio ' + a + ' : ' + b + ' : ' + c + '. What fraction of all the tiles are ' + ['red', 'blue', 'green'][which] + '? Give a fraction.', part + '/' + (a + b + c), { s: 'There are ' + (a + b + c) + ' parts in all and ' + ['red', 'blue', 'green'][which] + ' is ' + part + ' of them.', w: [[part + '/' + (a + b + c - part), 'That compares to the other two colours only. The bottom is the whole: all parts added.']] });
    }),
    tpl('total', (r) => {
      const [a, b, c] = trip(r, 8), k = r.int(2, 12), which = r.int(0, 2), part = [a, b, c][which];
      const tm = ['pine', 'maple', 'birch'][which];
      return N('A park has pine, maple, and birch trees in the ratio ' + a + ' : ' + b + ' : ' + c + '. It has ' + part * k + ' ' + tm + ' trees. How many trees are there in all?', (a + b + c) * k, { s: tm + ' is ' + part + ' parts = ' + part * k + ', so a part is ' + k + '. All ' + (a + b + c) + ' parts: ' + (a + b + c) * k + '.', w: wr((a + b + c) * k, [[part * k * 3, 'Multiplying by 3 treats the three as equal. Use the part size times all the parts.']]) });
    }),
  ],
});
