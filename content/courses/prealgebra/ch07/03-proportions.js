import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, R, mul, fmt, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);
const coprimePair = (r, lo, hi) => { let a, b; do { a = r.int(lo, hi); b = r.int(lo, hi); } while (a === b || gcd(a, b) !== 1); return [a, b]; };

export default lesson({
  id: 'pre-7-3-proportions',
  title: 'Proportions',
  blurb: 'Two equal ratios make a proportion. Solve for a missing value by scaling, by the unit rate, or by cross-multiplying.',
  concepts: ['proportion', 'unit-rate', 'cross-multiplication'],

  tryFirst: [
    num('t1', '4 notebooks cost $10. How much do 10 notebooks cost, in dollars?', 25, {
      h: ['How much does one notebook cost?', 'Or: how do you get from 4 notebooks to 10?'],
      s: 'One notebook costs 10 ÷ 4 = 2.50 dollars. 10 notebooks: 10 × 2.50 = 25.',
      w: [['16', 'Adding 6 dollars because you added 6 notebooks does not work: each notebook costs $2.50, not $1.'], ['40', 'That is 10 × 4. Find the price of one notebook first.']],
    }),
    num('t2', 'A photo is 6 cm wide and 4 cm tall. It is enlarged without distortion so that it is 15 cm wide. How many centimetres tall is it now?', 10, {
      h: ['By what number was the width multiplied?'], s: '6 × 2.5 = 15, so every length is multiplied by 2.5. The height becomes 4 × 2.5 = 10 cm.',
      w: [['13', 'You added 9 to the height because the width grew by 9. Enlarging multiplies both lengths by the same factor.']],
    }),
  ],

  learn: [
    p('A <b>proportion</b> is a statement that two ratios are equal, such as {3/5} = {12/20}. Most "how much for this many?" questions are proportions in disguise: the rate stays the same, only the amount changes.'),
    def('proportion', 'An equation saying two ratios or fractions are equal: {a/b} = {c/d}. The four numbers a, b, c, d are said to be in proportion.'),
    def('proportional quantities', 'Two quantities are proportional when their ratio never changes. Doubling one doubles the other, tripling one triples the other, and halving one halves the other.'),
    def('unit rate', 'The amount of one quantity for exactly 1 unit of the other, found by division. If 7 oranges cost $4.20, the unit rate is 4.20 ÷ 7 = $0.60 per orange.'),
    widget('ratioTable', { a: 3, b: 5, k: 4 }),
    rule('<b>Three ways to solve a proportion.</b> (1) <b>Scale</b>: find what number multiplies one side and use it on the other. (2) <b>Unit rate</b>: find the amount for 1, then multiply. (3) <b>Cross-multiply</b>: {a/b} = {c/d} means a × d = b × c.'),
    formula('Cross-multiplication', '{a/b} = {c/d} means a × d = b × c', 'Valid when b and d are not zero. Use it to solve for any one missing value among a, b, c, d: the missing value times its diagonal partner equals the product of the other two.'),
    ex('Solve {4/7} = {n/56} by scaling', ['The bottoms: 7 × 8 = 56, so the scale factor is 8.', 'The tops must scale the same way: n = 4 × 8 = 32.', 'Check: {32/56} = {4/7} (divide by 8). ✓']),
    ex('The unit-rate way', ['7 oranges cost $4.20. How much for 12?', 'One orange: 4.20 ÷ 7 = 0.60 dollars.', '12 oranges: 12 × 0.60 = 7.20 dollars.']),
    p('<b>Why cross-multiplying works.</b> Start with {a/b} = {c/d}. Multiply both sides by b × d. The left side becomes a × d (the b cancels) and the right side becomes c × b (the d cancels). So a × d = b × c. It is just "multiply both sides" in a fast form.'),
    ex('Cross-multiplying', ['Solve {n/12} = {35/42}.', 'Cross-multiply: n × 42 = 12 × 35 = 420.', 'Divide by 42: n = 10.']),
    ex('A map scale', ['On a map, 3 cm stands for 4 km. A road measures 9 cm on the map. How long is the real road?', 'Set up: {3 cm/4 km} = {9 cm/n km}, with matching units on top and bottom.', 'Cross-multiply: 3 × n = 4 × 9 = 36, so n = 12.', 'The road is 12 km long. Check: 3 cm is 4 km, so 9 cm (three times as much) is 3 × 4 = 12 km.']),
    tbl(['Hours worked', 'Pay ($)', 'Pay ÷ hours'], [['2', '30', '15'], ['3', '45', '15'], ['5', '75', '15']], 'Proportional: the ratio stays at 15 for every row'),
    tbl(['Distance (km)', 'Taxi cost ($)', 'Cost ÷ distance'], [['1', '6', '6'], ['2', '8', '4'], ['3', '10', '3.33…']], 'Not proportional: the ratio changes from row to row'),
    warn('<b>Watch out: not everything is a proportion.</b> When Ava was 6, her cousin was 3. When Ava is 12, is the cousin 6? No: the cousin is 9. The gap in ages stays fixed (that is adding), the ratio does not. A situation is proportional only if doubling one quantity doubles the other.'),
    warn('<b>Watch out: keep the same order on both sides.</b> If the left ratio is "cost over oranges", the right ratio must also be "cost over oranges". Writing {4.20/7} = {12/n} puts oranges on top on one side and cost on top on the other, which gives a wrong answer.'),
    tip('<b>Test for proportionality with a table.</b> Divide each y-value by its x-value. If the answers are all the same, the quantities are proportional and that common answer is the unit rate. For a quick check of your answer, the two fractions should simplify to the same fraction in lowest terms.'),
    key('A proportion says <b>the rate stays the same</b>. Solve it by scaling, by finding the unit rate, or by cross-multiplying. Always check that it is truly proportional first, and that the same quantity sits in the same position on both sides.'),
    mcq('A taxi charges a $4 start fee plus $2 per km. Is the cost proportional to the distance?', ['Yes, more km costs more.', 'No. 1 km costs $6 and 2 km costs $8, so doubling the distance does not double the cost.', 'Yes, because the price per km is constant.'], 1, 'Doubling the distance would double the price only if the start fee were 0. The $4 is added once and breaks the proportion.', 'Spot the mistake'),
    recap([['proportion', 'two equal ratios: {a/b} = {c/d}'], ['proportional', 'the ratio between two quantities is constant'], ['unit rate', 'the amount for 1 unit, found by dividing']], [['Cross-multiply', 'a × d = b × c'], ['Proportional test', 'y ÷ x is the same for every pair']]),
  ],

  practice: [
    num('p1', 'Solve for n: {3/5} = {n/40}.', 24, { h: ['5 times what equals 40?'], s: '5 × 8 = 40, so n = 3 × 8 = 24.', w: [['8', 'That is the scale factor. Multiply the top 3 by it.'], ['38', 'Both parts must be multiplied by 8, not shifted by 35.']] }),
    num('p2', 'A car uses 6 L of gas per 80 km. How many litres does it use on a 280 km trip?', 21, { h: ['280 km is how many 80 km pieces?'], s: '280 ÷ 80 = 3.5, and 3.5 × 6 = 21 L.', w: [['26', 'Adding 6 + 200 does not work. The gas scales with the distance by multiplying.'], ['18', 'That is only the 3 whole pieces of 80 km. The leftover 40 km is half a piece and needs 3 L more.']] }),
    num('p3', '5 pens cost $3.75. How many dollars do 8 pens cost?', 6, { h: ['Find the cost of one pen.'], s: '3.75 ÷ 5 = 0.75 per pen. 8 × 0.75 = 6.', w: [['5.25', 'You added $1.50 for 3 more pens, but each pen costs $0.75.']] }),
    mc('p4', 'Which of these is a proportional situation (twice as much of one means twice as much of the other)?', ['A plumber charges $60 for the visit plus $40 per hour.', 'A runner holds a steady pace of 5 min per km.', 'A tree is 2 m tall now and grows 30 cm a year.', 'A gym charges $20 sign-up and $15 per month.'], 1, {
      h: ['Test it: does doubling the input double the output?'], s: 'Steady pace: 10 km takes twice as long as 5 km. The others have a starting amount that does not double.',
      w: [[0, 'The $60 visit fee is charged once. 2 hours does not cost double 1 hour.'], [2, 'The tree already has height before any growth. Doubling the years does not double the height.'], [3, 'The $20 sign-up fee is charged once and breaks the proportion.']],
    }),
    num('p5', 'On a map, 2 cm stands for 5 km. Two towns are 35 km apart. How many centimetres apart are they on the map?', 14, { h: ['How many 5 km pieces in 35 km?'], s: '35 ÷ 5 = 7 pieces of 2 cm: 14 cm.', w: [['87.5', 'You went the wrong direction: the map is smaller than real life, so the answer must be less than 35.'], ['7', 'That is the number of pieces. Each piece is 2 cm on the map.']] }),
    num('p6', 'One printer prints 12 pages in 3 minutes. Two identical printers work at the same time on different pages. How many minutes do they need for 80 pages?', 10, {
      h: ['How many pages per minute does one printer do?', 'Two printers together do double that.'], s: 'One printer: 12 ÷ 3 = 4 pages per minute. Two printers: 8 pages per minute. 80 ÷ 8 = 10 minutes.',
      w: [['20', 'That is the time for one printer. Two printers share the work.'], ['5', 'That divides by 16, counting the second printer twice. Each printer prints 4 pages a minute, so together they print 8.']],
    }),
    num('p7', '{3/4} cup of oats makes 9 cookies. How many cups of oats make 24 cookies? Give your answer as a number.', 2, { h: ['24 cookies is how many batches of 9? Or use cups per cookie.'], s: 'One cookie takes {3/4} ÷ 9 = {1/12} cup. 24 cookies: 24 × {1/12} = 2 cups.', w: [['1/2', 'You divided where you should multiply: more cookies need more oats.'], ['6', 'That is 3 × 2, which does not use the {3/4} cup properly. Find the oats per cookie.']] }),
  ],

  challenge: [
    chain('Resizing a logo', 'A logo is 8 cm wide and 5 cm tall. Every copy keeps the same shape.', [
      num('c1a', 'A copy is 24 cm wide. How tall is it, in cm?', 15, { h: ['24 ÷ 8 is the scale factor.'], s: 'The factor is 3, so the height is 5 × 3 = 15.' }),
      num('c1b', 'Another copy is 35 cm tall. How wide is it, in cm?', 56, { h: ['35 ÷ 5 = 7.'], s: 'Factor 7: 8 × 7 = 56.' }),
      num('c1c', 'A sign frame is at most 60 cm wide and 45 cm tall. What is the greatest width a copy of the logo can have and still fit?', 60, { h: ['Check what height a 60 cm wide copy has, then check the other way.'], s: 'A 60 cm wide copy has height 60 × {5/8} = 37.5 cm, which fits in 45. Making it taller than 45 would need width 72, too wide. So 60 cm is the limit.' }),
    ], 'The idea: there are two limits (width and height) and the one that is hit first decides the size.'),
    chain('Gas money', 'A car uses 8 L of gas per 100 km. Gas costs $1.50 per litre.', [
      num('c2a', 'How many litres for a 250 km trip?', 20, { h: ['250 km is 2.5 hundreds.'], s: '2.5 × 8 = 20 L.' }),
      num('c2b', 'How many dollars does that gas cost?', 30, { h: ['Litres times price per litre.'], s: '20 × 1.50 = 30 dollars.' }),
      num('c2c', 'How many dollars does the gas cost for each kilometre?', 0.12, { h: ['Cost divided by distance. Use the trip you just did.'], s: '30 ÷ 250 = 0.12 dollars (12 cents) per km.' }),
    ], 'The idea: a proportion lets you chain rates. Distance to litres to dollars is one multiplication after another.'),
    mc('c3', 'Find the error. Ben says: "Four pencils cost $3. So 12 pencils cost 3 + 8 = $11, because I added the 8 extra pencils." What is wrong?', ['Nothing, 12 − 4 = 8 so add 8.', 'Cost scales by multiplying: 12 pencils is 3 times as many, so 3 × $3 = $9. The extra 8 pencils cost 8 × 0.75, not 8 dollars.', 'The answer should be $12 because 12 pencils.', 'It cannot be solved.'], 1, {
      s: '12 ÷ 4 = 3 times as many pencils, so the cost is 3 times as much: $9.',
      w: [[0, 'The extra 8 pencils each cost 75 cents, not one dollar. Adding the number of pencils as dollars mixes units.'], [2, 'That treats each pencil as $1, but 4 pencils cost only $3.']],
    }),
  ],

  quiz: [
    tpl('solve', (r) => {
      const [a, b] = coprimePair(r, 2, 11), k = r.int(2, 9);
      const slot = r.int(0, 3);
      const vals = [a, b, a * k, b * k];
      const lab = vals.map((v, i) => (i === slot ? 'n' : String(v)));
      return N('Solve for n: {' + lab[0] + '/' + lab[1] + '} = {' + lab[2] + '/' + lab[3] + '}.', vals[slot], { s: 'The equal ratios are ' + a + ' : ' + b + ' and ' + a * k + ' : ' + b * k + ' (a factor of ' + k + '), so n = ' + vals[slot] + '.' });
    }),
    tpl('price', (r) => {
      const u = r.int(2, 14), n1 = r.int(3, 8), m = r.int(9, 20);
      const it = r.pick(['pens', 'tickets', 'bagels', 'notebooks', 'stickers']);
      return N('At the same price each, ' + n1 + ' ' + it + ' cost $' + u * n1 + '. How many dollars do ' + m + ' ' + it + ' cost?', u * m, { s: 'One costs ' + u * n1 + ' ÷ ' + n1 + ' = $' + u + '. ' + m + ' cost ' + m + ' × ' + u + ' = $' + u * m + '.', w: wr(u * m, [[u * n1 + (m - n1), 'Each extra item costs $' + u + ', not $1. Scale by multiplying.'], [u, 'That is the price of one. Multiply by ' + m + '.']]) });
    }),
    tpl('map', (r) => {
      const s = r.pick([2, 4, 5, 10, 20, 25]), c = r.int(3, 19);
      if (r.bool()) return N('On a map, 1 cm stands for ' + s + ' km. Two cities are ' + c + ' cm apart on the map. How many km apart are they in real life?', s * c, { s: c + ' × ' + s + ' = ' + s * c + ' km.', w: wr(s * c, [[c / s, 'Dividing goes the wrong direction. Real distances are bigger than map distances.']]) });
      return N('On a map, 1 cm stands for ' + s + ' km. Two cities are ' + s * c + ' km apart in real life. How many cm apart are they on the map?', c, { s: s * c + ' ÷ ' + s + ' = ' + c + ' cm.', w: wr(c, [[s * c * s, 'Multiplying goes the wrong direction. The map is smaller than real life.']]) });
    }),
    tpl('recipe', (r) => {
      const f = r.pick([[1, 2], [3, 4], [2, 3], [3, 2], [5, 4], [1, 4]]), c = r.pick([4, 6, 8, 12]), k = r.int(2, 6);
      const ans = mul(R(f[0], f[1]), R(k));
      return N('{' + f[0] + '/' + f[1] + '} cup of sugar makes ' + c + ' muffins. How many cups of sugar make ' + c * k + ' muffins? Give a number or a fraction.', fmt(ans), { s: c * k + ' muffins is ' + k + ' times as many, so ' + k + ' × {' + f[0] + '/' + f[1] + '} = ' + ans.n + (ans.d > 1 ? '/' + ans.d : '') + ' cups.', w: [[fmt(R(f[0], f[1] * k)), 'More muffins need more sugar. Multiply, do not divide.']].filter(([x]) => x !== fmt(ans)) });
    }),
    tpl('proportional', (r) => {
      const a = r.int(2, 9) * 5, b = r.int(2, 9) * 2, per = r.int(3, 9);
      const right = 'A shop sells ribbon at $' + per + ' for every metre.';
      return choice(r, 'Which situation is proportional (doubling one quantity doubles the other)?', right, [['A rental costs $' + a + ' fee plus $' + per + ' per day.', 'The fee is charged once, so doubling the days does not double the cost.'], ['Mia is ' + b + ' years older than her cousin.', 'An age gap is a difference, not a ratio.'], ['A taxi charges $' + b + ' to start plus $' + per + ' per km.', 'The starting fee breaks the proportion.']], { s: 'Only a pure per-unit price scales: 2 metres cost twice as much as 1 metre.' });
    }),
    tpl('fill', (r) => {
      const u = r.int(2, 9), t = r.int(3, 9), T = r.int(10, 30);
      return N('A tap fills ' + u * t + ' litres in ' + t + ' minutes. How many minutes does it take to fill ' + u * T + ' litres at the same rate?', T, { s: 'The tap gives ' + u + ' L per minute. ' + u * T + ' ÷ ' + u + ' = ' + T + ' minutes.', w: wr(T, [[u * T, 'That is the number of litres. Divide by the litres per minute.']]) });
    }),
    tpl('machines', (r) => {
      const rate = r.int(2, 9), t = r.int(2, 6), c = r.int(2, 4), T = r.int(4, 12);
      return N('One machine makes ' + rate * t + ' parts in ' + t + ' minutes. ' + c + ' identical machines work together. How many minutes do they need for ' + rate * c * T + ' parts?', T, { s: 'One machine: ' + rate + ' parts per minute. ' + c + ' machines: ' + rate * c + ' per minute. ' + rate * c * T + ' ÷ ' + rate * c + ' = ' + T + ' minutes.', w: wr(T, [[T * c, 'That is the time for one machine. With ' + c + ' machines it takes less time.']]) });
    }),
    tpl('similar', (r) => {
      const [w, h] = coprimePair(r, 2, 12), k = r.int(2, 9);
      const nm = r.pick(['photo', 'poster', 'flag', 'screen']);
      const ask = r.bool();
      return ask ? N('A ' + nm + ' is ' + w + ' cm wide and ' + h + ' cm tall. A copy keeps the same shape and is ' + w * k + ' cm wide. How tall is the copy in cm?', h * k, { s: 'The width was multiplied by ' + k + ', so the height is ' + h + ' × ' + k + ' = ' + h * k + '.', w: wr(h * k, [[h + w * k - w, 'Adding the same amount to both lengths distorts the shape. Multiply both by ' + k + '.']]) })
        : N('A ' + nm + ' is ' + w + ' cm wide and ' + h + ' cm tall. A copy keeps the same shape and is ' + h * k + ' cm tall. How wide is the copy in cm?', w * k, { s: 'The height was multiplied by ' + k + ', so the width is ' + w + ' × ' + k + ' = ' + w * k + '.', w: wr(w * k, [[w + h * k - h, 'Adding the same amount to both lengths distorts the shape. Multiply both by ' + k + '.']]) });
    }),
  ],
});
