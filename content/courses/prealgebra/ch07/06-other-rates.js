import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);
const dollars = (cents) => '$' + (cents / 100).toFixed(2);

export default lesson({
  id: 'pre-7-6-other-rates',
  title: 'Rates of every kind',
  blurb: 'Unit prices, best buys, pay, fuel use, and work rates: one idea, "per one", used everywhere.',
  concepts: ['rate', 'unit-rate', 'unit-price', 'work-rate'],

  tryFirst: [
    num('t1', 'A 6-pack of juice costs $9.00 and a 10-pack of the same juice costs $14.00. How many cents cheaper per bottle is the 10-pack?', 10, {
      h: ['Find the price of one bottle in each pack, in cents.'], s: '6-pack: 900 ÷ 6 = 150 cents each. 10-pack: 1400 ÷ 10 = 140 cents each. The 10-pack is 10 cents cheaper per bottle.',
      w: [['5', 'That is $5 more for 4 more bottles, which is not the per-bottle comparison. Divide each price by its count.']],
    }),
    num('t2', 'Maya earns $84 for 6 hours of work. At the same pay rate, how many dollars does she earn in 9 hours?', 126, {
      h: ['How much does she earn in 1 hour?'], s: '84 ÷ 6 = 14 dollars per hour. 9 × 14 = 126.',
      w: [['90', 'Adding 3 hours adds 3 × $14, not 3 × $2. Find the hourly rate first.']],
    }),
  ],

  learn: [
    p('A <b>rate</b> compares two quantities with <i>different</i> units: km per hour, dollars per kilogram, words per minute, litres per 100 km. The word "per" means "for each one", and it tells you to divide.'),
    widget('rateModel', { r: 45, t: 6, per: 'minute', what: 'words' }),
    rule('<b>Unit rate.</b> A rate "with a 1 at the bottom" is a <b>unit rate</b>. To find it, divide the top quantity by the bottom quantity: $4.80 for 8 apples is 4.80 ÷ 8 = $0.60 per apple. Once you have the unit rate, any amount is one multiplication.'),
    ex('Best buy', ['Which is the better buy: 500 mL for $3.00, or 750 mL for $4.20?', 'Per 100 mL: 3.00 ÷ 5 = $0.60 for the first and 4.20 ÷ 7.5 = $0.56 for the second.', 'The lower unit price wins: the 750 mL bottle is the better buy.']),
    tbl(['Rate', 'Means', 'Unit rate form'], [['$18 per hour', 'pay', '$18 per 1 hour'], ['7 L per 100 km', 'fuel use', '0.07 L per 1 km'], ['45 words per minute', 'typing speed', '45 words per 1 minute'], ['$2.50 per kg', 'price', '$2.50 per 1 kg']], 'Everyday rates'),
    rule('<b>Work rates add.</b> If Ana paints a fence in 6 hours, her rate is {1/6} of the fence per hour. If Ben takes 3 hours, his rate is {1/3} per hour. Working together their rates add: {1/6} + {1/3} = {1/2} of the fence per hour, so the whole fence takes 2 hours. The time is the flip of the combined rate.'),
    ex('Filling and draining', ['A tub fills in 12 minutes. When full, it drains in 20 minutes. If the tap and the drain are both open, how long to fill an empty tub?', 'Fill rate {1/12} per minute, drain rate {1/20} per minute.', 'Net rate: {1/12} − {1/20} = {5/60} − {3/60} = {2/60} = {1/30}.', 'So it takes 30 minutes.']),
    warn('<b>Watch out.</b> The bigger package is not always cheaper per unit, and the cheaper package is not always the better deal. Compare <i>per one unit</i>. Also, do not average work times: two people with times 6 h and 3 h together take less than either alone, never 4.5 h.'),
    mcq('Sam says: "Pack A is 4 pencils for $2.00 and pack B is 6 pencils for $2.70. Pack A costs less, so it is the better buy." What is wrong?', ['Nothing, $2.00 is less than $2.70.', 'The packs have different sizes. Per pencil A is $0.50 and B is $0.45, so B is cheaper per pencil.', 'Pack B costs $0.45 each, which is more.'], 1, 'Compare unit prices. 2.00 ÷ 4 = 0.50 versus 2.70 ÷ 6 = 0.45.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A 750 g box of cereal costs $4.50. How many dollars is that per 100 g?', 0.6, { h: ['750 g is how many hundreds of grams?'], s: '750 ÷ 100 = 7.5 hundreds. 4.50 ÷ 7.5 = 0.60 dollars.', w: [['0.006', 'That is the price per gram. The question wants the price per 100 g.'], ['6', '$6 per 100 g is far too much: the whole box costs $4.50.']] }),
    mc('p2', 'Which is the best buy? A: 500 mL for $3.00. B: 750 mL for $4.20. C: 1 L for $5.50.', ['A', 'B', 'C', 'They are all the same'], 2, {
      h: ['Find the cost per 100 mL for each.'], s: 'A: 3.00 ÷ 5 = $0.60. B: 4.20 ÷ 7.5 = $0.56. C: 5.50 ÷ 10 = $0.55. C is cheapest per 100 mL.',
      w: [[0, 'A is the cheapest container, but per 100 mL it is the most expensive.'], [1, 'B is close, but C is $0.55 per 100 mL against B\'s $0.56.']],
    }),
    num('p3', 'A car uses 7.5 litres of gas for every 100 km. How many litres does it use on a 360 km trip?', 27, { h: ['360 km is 3.6 hundreds.'], s: '3.6 × 7.5 = 27 litres.', w: [['2.7', 'That is a factor of 10 too small: 360 is 3.6 hundreds, but 3.6 × 7.5 = 27.'], ['48', 'You divided 360 by 7.5. The rate is litres per 100 km, so multiply.']] }),
    num('p4', 'Priya types 45 words per minute. How many minutes does she need to type 1350 words?', 30, { h: ['time = amount ÷ rate.'], s: '1350 ÷ 45 = 30 minutes.', w: [['60750', 'You multiplied. To find time, divide the words by the words per minute.']] }),
    num('p5', 'Ana can paint a fence in 6 hours. Ben can paint it in 3 hours. Working together, how many hours do they need?', 2, { h: ['What fraction of the fence does each paint in one hour?'], s: 'Ana {1/6} + Ben {1/3} = {1/2} fence per hour. So 2 hours.', w: [['4.5', 'You averaged 6 and 3. Together they must be faster than Ben alone (3 hours).'], ['9', 'You added the times. Add the rates (fraction of the job per hour) instead.']] }),
    num('p6', 'A tub fills from the tap in 12 minutes. The drain, when open, empties a full tub in 20 minutes. With both open, how many minutes does an empty tub take to fill?', 30, { h: ['Write each as a fraction of the tub per minute.'], s: '{1/12} − {1/20} = {1/30} of the tub per minute. So 30 minutes.', w: [['8', 'You subtracted the times (20 − 12). Subtract the rates instead.'], ['32', 'You added the times. Subtract the rates: filling minus draining.']] }),
    num('p7', 'A nurse counts 18 heartbeats in 15 seconds. How many beats per minute is that?', 72, { h: ['How many 15-second pieces make a minute?'], s: '4 pieces of 15 s in a minute. 18 × 4 = 72 beats per minute.', w: [['1.2', 'That is beats per second. The question asks per minute.'], ['270', 'You multiplied by 15. A minute holds 4 fifteen-second periods.']] }),
  ],

  challenge: [
    chain('Summer job', 'Priya earns $18 per hour at a Toronto ice cream shop.', [
      num('c1a', 'How many dollars does she earn in 7.5 hours?', 135, { h: ['rate × hours.'], s: '18 × 7.5 = 135 dollars.' }),
      num('c1b', 'How many hours must she work to earn $306?', 17, { h: ['dollars ÷ rate.'], s: '306 ÷ 18 = 17 hours.' }),
      num('c1c', 'Her friend earns $15 per hour. How many hours must the friend work to earn what Priya earns in 10 hours?', 12, { h: ['What does Priya earn in 10 hours?'], s: '10 × 18 = 180 dollars. 180 ÷ 15 = 12 hours.' }),
    ], 'The idea: with one rate, you either multiply (to get the total) or divide (to get the count).'),
    chain('Three painters', 'Ana paints a wall in 4 hours, Ben in 12 hours, and Cy in 6 hours.', [
      num('c2a', 'What fraction of the wall does Ana paint per hour? Give a fraction.', '1/4', { h: ['One wall in 4 hours.'], s: 'She paints {1/4} of the wall per hour.' }),
      num('c2b', 'What fraction of the wall do Ana and Ben together paint per hour?', '1/3', { h: ['{1/4} + {1/12}, use twelfths.'], s: '{3/12} + {1/12} = {4/12} = {1/3}.' }),
      num('c2c', 'Ana, Ben, and Cy all work together. How many hours do they need for one wall?', 2, { h: ['Cy paints {1/6} per hour. Add it to {1/3}.'], s: '{1/3} + {1/6} = {1/2} wall per hour, so 2 hours.' }),
    ], 'The idea: rates add, and the time for the whole job is the flip (reciprocal) of the combined rate.'),
    mc('c3', 'Find the error. Sam says: "Pack A: 6 muffins for $4.80. Pack B: 10 muffins for $7.50. Pack A is the better buy because $4.80 is less." Which is correct?', ['He is right.', 'Per muffin A is $0.80 and B is $0.75, so B is the better buy.', 'They cost the same per muffin.', 'A is better because it has fewer muffins.'], 1, {
      s: '4.80 ÷ 6 = 0.80 and 7.50 ÷ 10 = 0.75. B is cheaper per muffin.',
      w: [[0, 'He compared total prices of different-sized packs. Compare the price of one muffin.'], [3, 'Fewer muffins does not mean a better price per muffin.']],
    }),
  ],

  quiz: [
    tpl('unitprice', (r) => {
      const pc = 2 * r.int(10, 150), i = r.int(2, 14), w = 50 * i;
      const cost = (w * pc) / 100, it = r.pick(['cheese', 'rice', 'oats', 'pasta', 'coffee']);
      return N('A ' + w + ' g bag of ' + it + ' costs ' + dollars(cost) + '. How many dollars is that per 100 g?', fx(pc / 100), { s: w + ' g is ' + w / 100 + ' hundreds. ' + dollars(cost) + ' ÷ ' + w / 100 + ' = ' + dollars(pc) + '.', w: wr(pc / 100, [[cost / 100, 'That is the price of the whole bag. Divide by the number of 100 g in it.']]) });
    }),
    tpl('bestbuy', (r) => {
      let u1, u2; do { u1 = r.int(20, 90); u2 = r.int(20, 90); } while (u1 === u2);
      const n1 = r.int(3, 8), n2 = r.int(9, 20), it = r.pick(['bottles', 'muffins', 'pencils', 'granola bars']);
      const a = 'A pack of ' + n1 + ' for ' + dollars(u1 * n1), b = 'A pack of ' + n2 + ' for ' + dollars(u2 * n2);
      const best = u1 < u2 ? a : b, other = u1 < u2 ? b : a;
      return choice(r, 'Which is the better buy for ' + it + '?', best, [[other, 'Compare the price of one, not the price of the pack. ' + dollars(u1) + ' versus ' + dollars(u2) + ' each.'], ['They cost the same each', 'Divide each price by its count. The unit prices are ' + dollars(u1) + ' and ' + dollars(u2) + '.']], { s: 'Per item: ' + dollars(u1) + ' and ' + dollars(u2) + '. The lower is the better buy.' });
    }),
    tpl('fuel', (r) => {
      const f = r.int(4, 12), d = 25 * r.int(2, 24);
      return N('A hybrid uses ' + f + ' litres of gas per 100 km. How many litres does it use on a ' + d + ' km drive?', fx((f * d) / 100), { s: d + ' km is ' + d / 100 + ' hundreds. ' + d / 100 + ' × ' + f + ' = ' + fx((f * d) / 100) + ' litres.', w: wr((f * d) / 100, [[f * d, 'The rate is per 100 km, so divide the distance by 100 first.']]) });
    }),
    tpl('typing', (r) => {
      const w = 5 * r.int(5, 16), m = r.int(4, 30), n = name(r);
      if (r.bool()) return N(n + ' types ' + w + ' words per minute. How many words does ' + n + ' type in ' + m + ' minutes?', w * m, { s: w + ' × ' + m + ' = ' + w * m + ' words.' });
      return N(n + ' can type ' + w + ' words per minute. How many minutes does it take to type ' + w * m + ' words?', m, { s: w * m + ' ÷ ' + w + ' = ' + m + ' minutes.', w: wr(m, [[w * m * w, 'To find the time, divide the words by the rate.']]) });
    }),
    tpl('together', (r) => {
      const [x, y] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 2], [3, 1], [4, 1]]), c = r.int(1, 4);
      const a = x * (x + y) * c, b = y * (x + y) * c, t = x * y * c;
      const job = r.pick(['mow a field', 'paint a fence', 'stack a pile of wood', 'wash all the windows']), [n1, n2] = [name(r), 'Chris'];
      return N(n1 + ' can ' + job + ' in ' + a + ' hours and ' + n2 + ' can do it in ' + b + ' hours. Working together, how many hours do they need?', t, { s: 'Rates: {1/' + a + '} + {1/' + b + '} = {' + (a + b) + '/' + a * b + '} per hour. The time is ' + a * b + ' ÷ ' + (a + b) + ' = ' + t + ' hours.', w: wr(t, [[(a + b) / 2, 'That averages the times. Together they must be faster than either alone.']]) });
    }),
    tpl('drain', (r) => {
      const [x, y] = r.pick([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [1, 4], [3, 5]]), c = r.int(1, 4);
      const g = (y - x) * c, a = x * g, b = y * g, t = x * y * c;
      const v = r.pick(['tub', 'pool', 'tank']);
      return N('A tap fills an empty ' + v + ' in ' + a + ' minutes. A drain empties a full ' + v + ' in ' + b + ' minutes. If both are open, how many minutes does an empty ' + v + ' take to fill?', t, { s: 'Net rate: {1/' + a + '} − {1/' + b + '} = {' + (b - a) + '/' + a * b + '}. Time = ' + a * b + ' ÷ ' + (b - a) + ' = ' + t + ' minutes.', w: wr(t, [[a, 'That ignores the drain. The drain slows the filling.'], [b - a, 'You subtracted the times. Subtract the rates, then flip.']]) });
    }),
    tpl('beats', (r) => {
      const s = r.pick([10, 15, 20, 30]), c = r.int(5, 40) , sub = r.pick(['heartbeats', 'drips from a tap', 'claps', 'jumps']);
      return N('You count ' + c + ' ' + sub + ' in ' + s + ' seconds. At that rate, how many are there in one minute?', (c * 60) / s, { s: 'A minute is 60 ÷ ' + s + ' = ' + 60 / s + ' times ' + s + ' seconds. ' + c + ' × ' + 60 / s + ' = ' + (c * 60) / s + '.', w: wr((c * 60) / s, [[c / s, 'That is the count per second. Multiply by 60 for a minute.']]) });
    }),
    tpl('wage', (r) => {
      const rt = r.int(12, 30), h = r.int(4, 9), h2 = r.int(10, 24);
      return N('A lifeguard earned $' + rt * h + ' in ' + h + ' hours. At that rate, how many hours must they work to earn $' + rt * h2 + '?', h2, { s: 'Rate: ' + rt * h + ' ÷ ' + h + ' = $' + rt + ' per hour. ' + rt * h2 + ' ÷ ' + rt + ' = ' + h2 + ' hours.', w: wr(h2, [[rt * h2 / h, 'You divided by the old hours. Divide by the dollars per hour.']].filter(([v]) => v !== h2)) });
    }),
  ],
});
