import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);

export default lesson({
  id: 'pre-8-2-percent-word-problems',
  title: 'Percent word problems',
  blurb: 'Part, whole, or percent: find the missing one. Includes tax, tips, and percent of a percent.',
  concepts: ['percent', 'percent-of', 'sales-tax', 'tips'],

  tryFirst: [
    num('t1', 'A hockey league has 60 players and 35% of them are left-handed. How many players are left-handed?', 21, {
      h: ['35% of 60. Try 10%, then 5%.'], s: '10% of 60 is 6, so 30% is 18 and 5% is 3. 18 + 3 = 21.',
      w: [['2100', 'You multiplied 35 × 60. A percent is out of 100.']],
    }),
    num('t2', 'Ava got 18 questions right. That was 90% of the test. How many questions were on the test?', 20, {
      h: ['If 90% is 18, what is 10%?'], s: '10% is 18 ÷ 9 = 2. So 100% is 20.',
      w: [['16.2', 'That is 90% of 18. But 18 is the 90% already; you are looking for the whole.']],
    }),
  ],

  learn: [
    p('Every percent problem has three numbers: a <b>part</b>, a <b>whole</b>, and a <b>percent</b>. Two are given and one is missing. The relationship is one sentence: <b>part = percent × whole</b>.'),
    widget('percentGrid', { pct: 60 }),
    rule('<b>Three questions, one sentence.</b> Find the part: multiply, percent × whole. Find the percent: divide, part ÷ whole, then turn into %. Find the whole: divide, part ÷ percent. A <b>bar</b> helps: draw a bar for the whole (100%), mark the part, and label what you know.'),
    ex('Find the whole', ['30 is 12% of what number?', '12% of the whole is 30, so 1% is 30 ÷ 12 = 2.5.', 'The whole is 100 × 2.5 = 250.', 'Check: 12% of 250 = 0.12 × 250 = 30. ✓']),
    ex('Sales tax (HST in Ontario is 13%)', ['A jacket is $80 before tax. What is the total price?', 'Tax is 13% of 80 = 0.13 × 80 = 10.40.', 'Total: 80 + 10.40 = 90.40 dollars.', 'Shortcut: the total is 113% of the price, so 80 × 1.13 = 90.40.']),
    ex('Percent of a percent', ['40% of the students are in Grade 8. 25% of the Grade 8s play hockey. What percent of all students are Grade 8 hockey players?', 'Take 25% of 40%: {1/4} × 40% = 10%.', 'It is 10% of all students, not 65% and not 15%.']),
    warn('<b>Watch out: percent of what?</b> The "whole" is the amount the percent refers to. In "30 is 12% of what", the 30 is the part. If you take 12% of 30 you get the wrong thing. Ask yourself: is the number I was given the whole, or a piece of it?'),
    mcq('A bill is $50 and tax is 13%. Ben says: "The tax is 50 × 0.13 = $6.50, so I pay $6.50." What did he forget?', ['Nothing, the tax is what you pay.', 'The $6.50 is only the tax. He still has to pay for the item: 50 + 6.50 = $56.50.', 'He should have divided by 0.13.'], 1, 'The tax is extra. Total = price + tax. Equivalent: total = 1.13 × price.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is 40% of 135?', 54, { h: ['10% of 135 is 13.5.'], s: '10% is 13.5, so 40% is 4 × 13.5 = 54.', w: [['5400', 'You forgot to divide by 100.'], ['13.5', 'That is 10% of 135. 40% is four times as much.']] }),
    num('p2', '27 is what percent of 36?', 75, { h: ['Part over whole.'], s: '{27/36} = {3/4} = 75%.', w: [['133.3', 'You put the whole on top. The part (27) goes over the whole (36).'], ['9', 'That is the difference. A percent compares by dividing.']] }),
    num('p3', '30 is 12% of what number?', 250, { h: ['If 12% is 30, find 1% first.'], s: '1% is 30 ÷ 12 = 2.5. 100% is 250.', w: [['3.6', 'That is 12% of 30. But 30 is the 12% piece.'], ['360', 'You multiplied 30 by 12. Divide by the percent instead: 30 ÷ 0.12.']] }),
    num('p4', 'A jacket costs $80 before tax. The tax is 13%. What is the total in dollars?', 90.4, { h: ['Tax first, then add.'], s: '0.13 × 80 = 10.40. 80 + 10.40 = 90.40.', w: [['10.4', 'That is only the tax. Add it to the $80.'], ['93', 'You added 13 dollars, not 13 percent.']] }),
    num('p5', 'A family leaves a 15% tip on a $48 restaurant bill. How many dollars is the tip?', 7.2, { h: ['10% is 4.80. Then 5% is half of that.'], s: '10% = 4.80 and 5% = 2.40. 4.80 + 2.40 = 7.20.', w: [['720', 'You forgot the division by 100.'], ['4.8', 'That is only 10%. Add the other 5%.']] }),
    num('p6', 'In a school, 40% of the students are in Grade 8, and 25% of the Grade 8 students play hockey. What percent of all students are Grade 8 hockey players?', 10, { h: ['25% is a quarter of the Grade 8 group.'], s: 'A quarter of 40% is 10%.', w: [['65', 'Percents of percents multiply; they do not add.'], ['15', 'You subtracted. Take 25% of 40%: a quarter of 40.']] }),
    num('p7', 'A 100 kg load of cucumbers is 99% water by weight. After sitting in the sun it dries until it is 98% water. How many kilograms does the load weigh now?', 50, {
      h: ['How many kg of solid stuff are there? That never changes.', 'The solids are what percent of the new weight?'], s: 'Solids: 1% of 100 = 1 kg. After drying, the solids are 2% of the weight, so the weight is 1 ÷ 0.02 = 50 kg.',
      w: [['99', 'That removes only 1 kg. But the solids must now be 2% of the weight, and 1 kg is 2% of 50 kg.'], ['98', 'You subtracted 2%. The solids stay at 1 kg and must become 2% of the new total.']],
    }),
  ],

  challenge: [
    chain('Concert seats', 'A hall has 800 seats. 65% of them are sold for Friday.', [
      num('c1a', 'How many seats are sold?', 520, { h: ['65% of 800.'], s: '0.65 × 800 = 520.' }),
      num('c1b', 'How many seats are unsold?', 280, { h: ['Subtract from 800.'], s: '800 − 520 = 280.' }),
      num('c1c', 'Over the next day, 35% of the unsold seats are sold. How many seats are still unsold?', 182, { h: ['65% of the 280 remain unsold.'], s: '280 × 0.65 = 182. (Or: 35% of 280 = 98 sold, 280 − 98 = 182.)' }),
    ], 'The idea: the second percent is of the unsold seats (280), not of all 800. The "whole" changes from step to step.'),
    chain('Bakery shelf', 'A bakery sold 120 muffins. 45% were blueberry, 30 were bran, and the rest were chocolate.', [
      num('c2a', 'How many blueberry muffins were sold?', 54, { h: ['45% of 120.'], s: '0.45 × 120 = 54.' }),
      num('c2b', 'What percent were bran?', 25, { h: ['30 out of 120.'], s: '{30/120} = {1/4} = 25%.' }),
      num('c2c', 'What percent were chocolate?', 30, { h: ['The three percents total 100.'], s: '100 − 45 − 25 = 30%. (That is 36 muffins.)' }),
    ], 'The idea: you can find a missing percent from a count, or a missing count from a percent. They are two views of the same fraction.'),
    mc('c3', 'Find the error. Omar says: "A $50 meal plus 13% tax: 50 × 0.13 = 6.50. So the meal costs $6.50." Which is right?', ['He is right.', 'The total is 50 + 6.50 = $56.50, because the $6.50 is just the tax.', 'The total is 50 − 6.50 = $43.50.', 'The total is 50 × 13 = $650.'], 1, {
      s: 'Tax is added: $50 + $6.50 = $56.50. Equivalently 50 × 1.13 = 56.50.',
      w: [[0, '$6.50 is only the tax. The meal itself costs $50.'], [2, 'Tax is added to the price, not taken off.']],
    }),
  ],

  quiz: [
    tpl('part', (r) => {
      const pc = r.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80, 85]), n = 20 * r.int(2, 30), nm = name(r);
      return N('At a school ' + n + ' students took a survey. ' + pc + '% of them said they ride a bike. How many students ride a bike?', (pc * n) / 100, { s: pc + '% of ' + n + ' = ' + pc / 100 + ' × ' + n + ' = ' + (pc * n) / 100 + '.', w: wr((pc * n) / 100, [[pc * n, 'A percent means out of 100: divide by 100.'], [n - (pc * n) / 100, 'That is the number who do not. The question asks about those who do.']]) });
    }),
    tpl('percentOf', (r) => {
      const whole = r.pick([20, 25, 40, 50, 80, 125, 200, 250, 400]), part = r.int(1, whole - 1), nm = name(r), ans = (part * 100) / whole;
      return N(nm + ' scored ' + part + ' points out of ' + whole + ' in a game. What percent of the points did ' + nm + ' score?', fx(ans), { s: '{' + part + '/' + whole + '} × 100 = ' + fx(ans) + '%.', w: wr(ans, [[fx(part / whole), 'That is the decimal. Times 100 for a percent.'], [whole - part, 'That is the points missed, not a percent.']]) });
    }),
    tpl('whole', (r) => {
      const pc = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 80, 90]), w = 20 * r.int(2, 30), part = (pc * w) / 100;
      return N('A school collected ' + part + ' cans. That is ' + pc + '% of its goal. How many cans was the goal?', w, { s: pc + '% of the goal is ' + part + '. So 1% is ' + fx(part / pc) + ' and 100% is ' + w + '.', w: wr(w, [[(part * pc) / 100, 'The ' + part + ' cans are the ' + pc + '% piece already. Divide, do not take ' + pc + '% of it.']]) });
    }),
    tpl('tax', (r) => {
      const price = 5 * r.int(2, 40), rate = 13;
      const total = (price * (100 + rate)) / 100, tax = (price * rate) / 100;
      if (r.bool()) return N('A pair of shoes costs $' + price + ' before tax. HST is 13%. What is the total price, in dollars?', fx(total), { s: 'Tax = 0.13 × ' + price + ' = ' + fx(tax) + '. Total = ' + price + ' + ' + fx(tax) + ' = ' + fx(total) + '.', w: wr(total, [[fx(tax), 'That is only the tax. Add the price.'], [price + rate, 'You added 13 dollars. The tax is 13 percent of the price.']]) });
      return N('A video game costs $' + price + ' before tax. How many dollars of HST (13%) are charged?', fx(tax), { s: '0.13 × ' + price + ' = ' + fx(tax) + '.', w: wr(tax, [[fx(total), 'That is the total with tax. The question asks for the tax itself.']]) });
    }),
    tpl('tip', (r) => {
      const bill = 4 * r.int(5, 40), pc = r.pick([10, 15, 18, 20]);
      if (r.bool()) return N('A bill is $' + bill + '. How many dollars is a ' + pc + '% tip?', fx((bill * pc) / 100), { s: pc / 100 + ' × ' + bill + ' = ' + fx((bill * pc) / 100) + '.', w: wr((bill * pc) / 100, [[bill * pc, 'Remember to divide by 100.']]) });
      return N('A bill is $' + bill + '. You leave a ' + pc + '% tip. How many dollars do you pay altogether?', fx((bill * (100 + pc)) / 100), { s: 'The tip is ' + fx((bill * pc) / 100) + ', so the total is ' + bill + ' + ' + fx((bill * pc) / 100) + ' = ' + fx((bill * (100 + pc)) / 100) + '.', w: wr((bill * (100 + pc)) / 100, [[fx((bill * pc) / 100), 'That is only the tip. Add it to the bill.']]) });
    }),
    tpl('ofpercent', (r) => {
      const a = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 80]), b = r.pick([10, 20, 25, 30, 40, 50, 60, 75, 80]);
      return N(b + '% of the students in a school are in Grade 8, and ' + a + '% of the Grade 8 students are in the band. What percent of all the students are Grade 8 band members?', fx((a * b) / 100), { s: a + '% of ' + b + '% = ' + a / 100 + ' × ' + b + '% = ' + fx((a * b) / 100) + '%.', w: wr((a * b) / 100, [[Math.min(a, b), 'You took the smaller percent. A percent of a percent is a product.'], [a + b, 'Percents of percents multiply; they do not add.']]) });
    }),
    tpl('lost', (r) => {
      const n = r.pick([20, 25, 40, 50, 80]), wins = r.int(3, n - 3), ans = 100 - (wins * 100) / n;
      return N('A team played ' + n + ' games and won ' + wins + ' of them. The rest were losses. What percent of the games were losses?', fx(ans), { s: 'Losses: ' + (n - wins) + ' out of ' + n + ' = ' + fx(ans) + '%.', w: wr(ans, [[fx((wins * 100) / n), 'That is the percent won. The question asks about losses.']]) });
    }),
    tpl('dry', (r) => {
      const s = r.pick([1, 2, 4, 5, 10]), f = r.pick([2, 4]), M = 20 * f * r.int(1, 10);
      if (f * s > 60) return N('What is 10% of 50?', 5, { s: '0.1 × 50 = 5.' });
      return N('A ' + M + ' kg batch of fruit is ' + (100 - s) + '% water. It is dried until it is ' + (100 - f * s) + '% water. How many kg does it weigh now?', M / f, { s: 'Solids: ' + s + '% of ' + M + ' = ' + fx((s * M) / 100) + ' kg. They must be ' + f * s + '% of the new weight, so it weighs ' + fx((s * M) / 100) + ' ÷ ' + (f * s) / 100 + ' = ' + M / f + ' kg.', w: wr(M / f, [[M - (f * s * M) / 100 + (s * M) / 100, 'Only the water changes; the solids stay fixed. Track the solids.']].filter(([v]) => Number(v) !== M / f)) });
    }),
  ],
});
