import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);

export default lesson({
  id: 'pre-8-3-increase-and-decrease',
  title: 'Percent increase and decrease',
  blurb: 'Change as a percent of the start, growth multipliers, successive changes, and working backward from the final amount.',
  concepts: ['percent-change', 'multiplier', 'discount'],

  tryFirst: [
    num('t1', 'A $60 shirt is on sale for 25% off. What is the sale price in dollars?', 45, {
      h: ['How many dollars is 25% of 60?'], s: '25% of 60 is 15. 60 − 15 = 45.',
      w: [['15', 'That is the discount. The sale price is what is left after taking it off.']],
    }),
    num('t2', 'A plant grows from 40 cm to 50 cm. By what percent did it grow?', 25, {
      h: ['How many cm did it grow? Compare that with the starting height.'], s: 'It grew 10 cm. 10 out of the starting 40 is {1/4}, which is 25%.',
      w: [['20', 'You compared 10 with the new height, 50. A percent change compares with the starting amount.'], ['10', 'That is the number of cm it grew. A percent compares to the start: 10 out of 40.']],
    }),
  ],

  learn: [
    p('Prices rise, populations shrink, and sale signs say "30% off". Each of these is a <b>percent change</b>. It tells how much something grew or shrank <i>compared with where it started</i>. Going from 60 to 75 is a rise of 15, and 15 is 25% of the starting 60.'),
    def('percent change', 'The change in an amount, written as a percent of the <b>original</b> amount. A positive result is an increase and a negative result is a decrease.'),
    def('original amount', 'The starting amount, the "before". It is the whole for a percent change, so it is always the number you divide by.'),
    widget('percentChange', { base: 80, pct: 25 }),
    formula('Percent change', 'percent change = (new − old) ÷ old × 100%', 'The change is new − old. Dividing by the old amount tells you how big the change is compared with the start.'),
    ex('Finding a percent change', ['A number falls from 60 to 42. By what percent did it decrease?', 'The change is 60 − 42 = 18.', 'Divide by the original: 18 ÷ 60 = 0.30.', 'It decreased by 30%. Check: 30% of 60 is 18, and 60 − 18 = 42.']),
    warn('<b>Watch out.</b> Divide by the original, not by the new amount. From 60 to 42, dividing by 42 gives about 43%, which is wrong. The percent always compares with the "before".'),
    rule('<b>Multipliers.</b> Increasing by p% means the new amount is (100 + p)% of the old, so multiply by 1 + p/100. A 15% increase: × 1.15. Decreasing by p% multiplies by 1 − p/100: a 30% discount is × 0.70. One multiplication does the whole job.'),
    formula('Multiplier', 'new = old × (1 ± p/100)', 'Use plus for an increase and minus for a decrease. Increase of 8%: × 1.08. Decrease of 8%: × 0.92. Decrease of 100%: × 0, which leaves nothing.'),
    ex('A sale', ['A $150 jacket is 20% off.', 'The multiplier is 1 − 0.20 = 0.80.', 'Sale price: 150 × 0.80 = 120 dollars.', 'Check: 20% of 150 is 30, and 150 − 30 = 120.']),
    tip('<b>Two ways to the same answer.</b> Either find the change and add or subtract it (60 + 15% of 60 = 60 + 9), or use one multiplier (60 × 1.15). Use whichever you trust. The multiplier is faster, and the two-step way is a good check.'),
    ex('Working backward', ['After a 30% discount a coat costs $77. What did it cost before?', 'After a 30% discount you pay 70% of the original, so 0.70 × original = 77.', 'Original = 77 ÷ 0.70 = 110 dollars.', 'Check: 30% of 110 is 33, and 110 − 33 = 77.']),
    key('When you know the <b>new</b> amount and want the old one, <b>divide</b> by the multiplier. Do not take 30% of 77 and add it back. The 30% was taken from the original price, not from 77.'),
    ex('Up and down is not back to the start', ['Start with 100. Increase by 20%: 100 × 1.20 = 120.', 'Now decrease by 20%: 120 × 0.80 = 96.', 'You end below 100, because the 20% fell on a bigger number than the 20% rise.']),
    warn('<b>Watch out.</b> A 50% rise followed by a 50% fall: 60 → 90 → 45, not back to 60. Percents of different amounts do not cancel. To undo a +100% (doubling) you need −50%, because you must remove the same <i>amount</i> that was added: 40 → 80 → 40.'),
    mcq('A price goes up 10% and then comes down 10%. Lia says: "So it is exactly the same price as before." What is wrong?', ['Nothing, +10% and −10% cancel.', 'The 10% fall is of the higher price, so it removes more than the rise added. 100 → 110 → 99.', 'The price ends higher than it began.'], 1, 'The two percents are of different amounts. 10% of 100 is 10, but 10% of 110 is 11.', 'Spot the mistake'),
    recap([['percent change', 'change as a percent of the original'], ['original', 'the "before" amount; always the divisor'], ['multiplier', '1 + p/100 for a rise, 1 − p/100 for a fall']], [['Percent change', '(new − old) ÷ old × 100%'], ['New amount', 'old × multiplier'], ['Old amount', 'new ÷ multiplier']]),
  ],

  practice: [
    num('p1', 'What is 80 increased by 15%?', 92, { h: ['Multiply by 1.15, or add 15% of 80.'], s: '15% of 80 is 12. 80 + 12 = 92.', w: [['12', 'That is the increase. Add it to 80.'], ['95', 'You added 15, not 15 percent of 80.']] }),
    num('p2', 'A $120 jacket is 30% off. What is the sale price in dollars?', 84, { h: ['Multiply by 0.70.'], s: '0.70 × 120 = 84.', w: [['36', 'That is the discount. The sale price is 120 − 36.'], ['90', 'You subtracted 30 dollars. 30% of 120 is 36.']] }),
    num('p3', 'A number falls from 50 to 35. By what percent did it decrease?', 30, { h: ['The change is 15. Compare with the starting 50.'], s: '15 ÷ 50 = 0.30, so 30%.', w: [['42.9', 'You compared 15 with the new number, 35. Always divide by the original.'], ['15', 'That is the size of the drop, not the percent.']] }),
    num('p4', 'After a 20% discount a bike costs $68. How many dollars did it cost before the discount?', 85, { h: ['The sale price is what percent of the original?'], s: '68 is 80% of the original. 68 ÷ 0.80 = 85.', w: [['81.6', 'That adds 20% to 68. But the 20% was taken off the larger, original price.'], ['88', 'You added 20 dollars back. The discount was 20 percent of the original, not of 68.']] }),
    num('p5', 'Start with 80. Increase it by 50%, then decrease the result by 50%. What do you end with?', 60, { h: ['Do it in two steps.'], s: '80 × 1.5 = 120. 120 × 0.5 = 60.', w: [['80', 'The 50% fall is of the bigger number (120), so you do not come back to 80.']] }),
    num('p6', 'A price rises by 25%. By what percent must the new price then fall to get back to the original price?', 20, {
      h: ['Try a starting price of 100.'], s: '100 rises to 125. To return to 100 you must remove 25, and 25 is 20% of 125.',
      w: [['25', 'The fall of 25 dollars is 25 out of the new price 125, which is 20%, not 25%.']],
    }),
    num('p7', 'A town of 4000 people grows by 10% each year for 2 years. What is its population after 2 years?', 4840, { h: ['Multiply by 1.10 twice.'], s: '4000 × 1.1 = 4400, then 4400 × 1.1 = 4840.', w: [['4800', 'That adds 10% of 4000 twice. The second 10% is of 4400, not 4000.']] }),
  ],

  challenge: [
    chain('Bike sale', 'A bike costs $400. It is 15% off, and then Ontario HST of 13% is added to the sale price.', [
      num('c1a', 'What is the sale price in dollars?', 340, { h: ['400 × 0.85.'], s: '0.85 × 400 = 340.' }),
      num('c1b', 'What is the total with 13% HST, in dollars?', 384.2, { h: ['340 × 1.13.'], s: '340 × 1.13 = 384.20.' }),
      num('c1c', 'Suppose the tax were added first and the 15% discount came after. What would the total be, in dollars?', 384.2, { h: ['400 × 1.13 × 0.85.'], s: '400 × 1.13 = 452, and 452 × 0.85 = 384.20. The same!' }),
    ], 'The idea: multipliers can be applied in any order, because multiplication does not care about order. That is why one combined multiplier (1.13 × 0.85) works.'),
    chain('Savings', 'You put $200 in an account. In year 1 it grows by 10%. In year 2 it drops by 10%.', [
      num('c2a', 'How many dollars after year 1?', 220, { h: ['200 × 1.10.'], s: '200 × 1.1 = 220.' }),
      num('c2b', 'How many dollars after year 2?', 198, { h: ['220 × 0.90.'], s: '220 × 0.9 = 198.' }),
      num('c2c', 'What is the overall percent change from the start to the end? Use a negative number for a decrease.', -1, { h: ['Compare 198 with 200.'], s: 'The change is −2 on a start of 200, which is −1%.' }),
    ], 'The idea: up 10% then down 10% is a net 1% decrease. The combined multiplier is 1.10 × 0.90 = 0.99.'),
    mc('c3', 'Find the error. Ben says: "A phone went from $80 to $100, which is an increase of $20. A $20 drop would bring it back, so a 20% increase can be undone by a 20% decrease." Which is right?', ['He is right.', 'The $20 rise is 25% of the old price $80, and the $20 drop from $100 is 20% of the new price. The percents differ.', 'The phone rose 20 percent and must fall 25 percent.', 'You cannot undo a price change.'], 1, {
      s: 'Rise: 20 ÷ 80 = 25%. Fall: 20 ÷ 100 = 20%. The same dollars are a different percent of different amounts.',
      w: [[0, 'The dollar change is equal but the percents are not: 20 is 25% of 80, yet 20% of 100.'], [2, 'It was a 25% rise (20 out of 80) and a 20% fall (20 out of 100).']],
    }),
  ],

  quiz: [
    tpl('sale', (r) => {
      const price = 20 * r.int(1, 15), d = r.pick([10, 15, 20, 25, 30, 40, 50, 60]);
      const item = r.pick(['hoodie', 'backpack', 'pair of boots', 'hockey stick', 'tent']);
      const ans = (price * (100 - d)) / 100;
      return N('A $' + price + ' ' + item + ' is ' + d + '% off. What is the sale price in dollars?', fx(ans), { s: 'Multiplier ' + (100 - d) / 100 + ': ' + price + ' × ' + (100 - d) / 100 + ' = ' + fx(ans) + '.', w: wr(ans, [[fx((price * d) / 100), 'That is the discount. The sale price is what remains.'], [price - d, 'You took off ' + d + ' dollars, but the discount is ' + d + ' percent.']]) });
    }),
    tpl('rise', (r) => {
      const v = 20 * r.int(1, 25), pc = r.pick([5, 10, 15, 20, 25, 30, 40, 50]);
      const ans = (v * (100 + pc)) / 100;
      return N('A quantity is ' + v + ' and then increases by ' + pc + '%. What is the new quantity?', fx(ans), { s: 'Multiplier ' + (100 + pc) / 100 + ': ' + v + ' × ' + (100 + pc) / 100 + ' = ' + fx(ans) + '.', w: wr(ans, [[fx((v * pc) / 100), 'That is only the increase. Add it to ' + v + '.'], [v + pc, 'You added ' + pc + ', but the increase is ' + pc + ' percent of ' + v + '.']]) });
    }),
    tpl('change', (r) => {
      const s = 20 * r.int(1, 12), pc = r.pick([5, 10, 15, 20, 25, 30, 40, 50, 60]);
      const up = r.bool(), e = (s * (up ? 100 + pc : 100 - pc)) / 100;
      return N('A price goes from $' + s + ' to $' + fx(e) + '. By what percent did it ' + (up ? 'increase' : 'decrease') + '?', pc, { s: 'The change is $' + fx(Math.abs(e - s)) + '. Divided by the original ' + s + ': ' + fx(Math.abs(e - s) / s) + ' = ' + pc + '%.', w: wr(pc, [[fx((Math.abs(e - s) * 100) / e), 'You divided by the new price. Always divide by the original.']]) });
    }),
    tpl('original', (r) => {
      const P = 20 * r.int(2, 20), d = r.pick([10, 20, 25, 30, 40, 50]), up = r.bool();
      const Q = (P * (up ? 100 + d : 100 - d)) / 100;
      return N('After a ' + d + '% ' + (up ? 'increase' : 'discount') + ', an item costs $' + fx(Q) + '. What did it cost before?', P, { s: 'It is now ' + (up ? 100 + d : 100 - d) + '% of the original, so original = ' + fx(Q) + ' ÷ ' + (up ? 100 + d : 100 - d) / 100 + ' = ' + P + '.', w: wr(P, [[fx(up ? (Q * (100 - d)) / 100 : (Q * (100 + d)) / 100), 'The percent was taken from the original price, not from ' + fx(Q) + '. Divide by the multiplier.']]) });
    }),
    tpl('twostep', (r) => {
      const x = 100 * r.int(1, 12), a = r.pick([10, 20, 30, 40, 50]), b = r.pick([10, 20, 30, 40, 50]);
      const ans = (x * (100 + a) * (100 - b)) / 10000;
      const ctx = r.pick(['A game store raises a price', 'A town\'s population grows', 'A stock gains']);
      const t = ctx + ' from ' + x + ' by ' + a + '%, and then it falls by ' + b + '%. What is the final amount?';
      return N(t, fx(ans), { s: x + ' × ' + (100 + a) / 100 + ' = ' + fx((x * (100 + a)) / 100) + ', then × ' + (100 - b) / 100 + ' = ' + fx(ans) + '.', w: wr(ans, [[fx((x * (100 + a - b)) / 100), 'You combined +' + a + '% and −' + b + '% as ' + (a - b) + '%. The second percent is of the new amount.']]) });
    }),
    tpl('nonet', (r) => {
      const a = r.pick([10, 20, 30, 40, 50]), x = 100 * r.int(2, 20);
      return N('A price of $' + x + ' is raised by ' + a + '% and then lowered by ' + a + '%. By what percent is the final price below $' + x + '?', (a * a) / 100, { s: 'Multiplier (1 + ' + a / 100 + ') × (1 − ' + a / 100 + ') = ' + (1 - (a * a) / 10000) + '. That is ' + (a * a) / 100 + '% below the start.', w: wr((a * a) / 100, [[0, 'The fall is of the higher price, so you do not return to the start.']]) });
    }),
    tpl('compare', (r) => {
      const P = 20 * r.int(3, 15), d = r.pick([10, 15, 20, 25, 30]), sav = (P * d) / 100;
      const flat = sav + r.pick([-5, -3, -2, 2, 3, 5]);
      if (flat <= 0 || flat === sav) return N('What is 50% of 20?', 10, { s: '10.' });
      const A = d + '% off the $' + P + ' price', B = '$' + fx(flat) + ' off the $' + P + ' price';
      const best = flat > sav ? B : A;
      return choice(r, 'Which deal gives the lower final price?', best, [[flat > sav ? A : B, 'Work out how many dollars each deal saves. ' + d + '% of ' + P + ' is $' + fx(sav) + '.'], ['They are the same', 'The percent deal saves $' + fx(sav) + ' and the flat deal saves $' + fx(flat) + '.']], { s: d + '% of ' + P + ' is $' + fx(sav) + '. The other deal saves $' + fx(flat) + '. The bigger saving wins.' });
    }),
    tpl('growth', (r) => {
      const x = 100 * r.int(2, 30), a = r.pick([10, 20, 30, 50]);
      const ans = (x * (100 + a) * (100 + a)) / 10000;
      return N('An account holds $' + x + ' and grows by ' + a + '% each year. How many dollars are in it after 2 years?', fx(ans), { s: x + ' × ' + (100 + a) / 100 + ' = ' + fx((x * (100 + a)) / 100) + ', then × ' + (100 + a) / 100 + ' = ' + fx(ans) + '.', w: wr(ans, [[fx(x * (1 + (2 * a) / 100)), 'The second year\'s ' + a + '% is of the bigger amount, so it is more than ' + a + '% of ' + x + '.']]) });
    }),
  ],
});
