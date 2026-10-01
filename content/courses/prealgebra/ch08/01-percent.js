import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, R, fmt, fm } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);

export default lesson({
  id: 'pre-8-1-percent',
  title: 'What a percent is',
  blurb: 'Percent means "per hundred": percents as fractions and decimals, finding a percent of an amount, and what percent one number is of another.',
  concepts: ['percent', 'fractions-decimals-percents'],

  tryFirst: [
    num('t1', 'A 10 by 10 grid has 100 small squares. 35 of them are shaded. What percent of the grid is shaded?', 35, {
      h: ['"Percent" means "out of 100".'], s: '35 out of 100 squares is 35 percent.',
      w: [['3.5', 'You might have divided by 10. The grid has 100 squares, and 35 out of 100 is 35%.']],
    }),
    num('t2', 'In a class of 20 students, 15 have a dog. What percent of the class has a dog?', 75, {
      h: ['What fraction of the class has a dog? Then think "out of 100".'], s: '{15/20} = {3/4}, and {3/4} of 100 is 75, so 75%.',
      w: [['15', 'That is the number of students. A percent compares to 100, and the class is only 20.'], ['0.75', 'That is the decimal. As a percent it is 75.']],
    }),
  ],

  learn: [
    p('<b>Percent</b> means "per hundred". 35% means 35 out of every 100, which is {35/100}. It is a ratio whose second part is always 100, so we can compare percents easily.'),
    widget('percentGrid', { pct: 35 }),
    rule('<b>One number, three costumes.</b> A percent, a fraction, and a decimal can all describe the same amount. To go from percent to decimal, divide by 100 (move the point two places left): 35% = 0.35. To a fraction: put it over 100 and simplify: 35% = {35/100} = {7/20}.'),
    tbl(['Percent', 'Fraction', 'Decimal'], [['50%', '{1/2}', '0.5'], ['25%', '{1/4}', '0.25'], ['10%', '{1/10}', '0.1'], ['75%', '{3/4}', '0.75'], ['1%', '{1/100}', '0.01'], ['150%', '{3/2}', '1.5']], 'Benchmarks worth knowing by heart'),
    ex('Percent of an amount', ['Find 40% of 85.', '10% is one-tenth: 85 ÷ 10 = 8.5.', '40% is 4 tens: 4 × 8.5 = 34.', 'Or: 40% = 0.4, and 0.4 × 85 = 34.']),
    rule('<b>What percent is a part of a whole?</b> Write the part over the whole as a fraction, then turn it into a number out of 100. 18 out of 24: {18/24} = {3/4} = 75%.'),
    p('<b>A neat trick.</b> A% of B is always equal to B% of A. For example, 8% of 25 looks hard, but 25% of 8 is just a quarter of 8, which is 2. So 8% of 25 = 2. You can pick whichever version is easier.'),
    warn('<b>Watch out.</b> A percent can be more than 100: 150% of 40 is 60 (one and a half times as much). And a percent is always "of something": 50% of a small number is smaller than 10% of a huge one. Always ask "percent of what?"'),
    mcq('Tara says: "10% of 50 is 10 × 50 = 500." What went wrong?', ['Nothing, you multiply the numbers.', '10% means {10/100} = 0.1, so 10% of 50 is 0.1 × 50 = 5. She forgot to divide by 100.', '10% of 50 is 10 − 50.'], 1, 'A percent is a fraction of 100. Dividing 50 into ten equal pieces gives 5 in each, so 10% of 50 is 5.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Write 35% as a decimal.', 0.35, { h: ['Divide by 100.'], s: '35 ÷ 100 = 0.35.', w: [['3.5', 'That moves the point only one place. Percent to decimal moves it two places.'], ['35', 'That is the percent. As a decimal it is 0.35.']] }),
    num('p2', 'What is 15% of 80?', 12, { h: ['Find 10% and 5% separately.'], s: '10% of 80 = 8 and 5% = 4. 8 + 4 = 12.', w: [['1200', 'You multiplied 15 × 80. A percent needs dividing by 100: 0.15 × 80 = 12.'], ['8', 'That is 10% of 80. There is another 5% to add.']] }),
    num('p3', '18 is what percent of 24?', 75, { h: ['Write {18/24} in lowest terms.'], s: '{18/24} = {3/4} = 75%.', w: [['0.75', 'That is the decimal. A percent is the decimal times 100: 75.'], ['133.3', 'You divided 24 by 18. The part (18) goes on top.']] }),
    num('p4', 'Find 8% of 25.', 2, { h: ['A% of B equals B% of A. Try 25% of 8.'], s: '8% of 25 = 25% of 8 = a quarter of 8 = 2.', w: [['200', 'You multiplied 8 × 25 and forgot the "per hundred". 8 × 25 = 200, then ÷ 100 = 2.'], ['3.125', 'You divided 25 by 8. A percent of a number is found by multiplying: 0.08 × 25 = 2, or 25% of 8 = 2.']] }),
    num('p5', 'Write {3/8} as a percent. (A decimal answer is fine.)', 37.5, { h: ['3 ÷ 8 as a decimal, then times 100.'], s: '3 ÷ 8 = 0.375, and 0.375 × 100 = 37.5%.', w: [['0.375', 'That is the decimal. For a percent multiply by 100.'], ['38', 'It is exactly 37.5, not 38. {3/8} = 0.375.']] }),
    num('p6', 'In a school, 60% of the students in a club are girls. There are 12 boys in the club. How many students are in the club?', 30, { h: ['If 60% are girls, what percent are boys?', '12 boys are what fraction of the club?'], s: 'Boys are 40%. 40% of the club is 12, so 10% is 3, and 100% is 30.', w: [['20', 'That treats 12 as the 60%. The 12 boys are the other 40%.'], ['72', '60% is not 12 × 6. 12 is the 40% (the boys), so the club is 12 ÷ 0.4.']] }),
    num('p7', 'What is 150% of 40?', 60, { h: ['150% is 100% plus 50%.'], s: '100% of 40 = 40 and 50% = 20, so 150% = 60.', w: [['6', 'You treated 150% as 15%. 150% is more than the whole.'], ['20', 'That is 50% of 40. 150% is 100% + 50%.']] }),
  ],

  challenge: [
    chain('Lunch survey', '40 students were asked their favourite lunch. 45% said pizza, 25% said tacos, and the rest said salad.', [
      num('c1a', 'How many students chose pizza?', 18, { h: ['45% = 0.45.'], s: '0.45 × 40 = 18.' }),
      num('c1b', 'How many chose tacos?', 10, { h: ['25% is a quarter.'], s: '40 ÷ 4 = 10.' }),
      num('c1c', 'What percent of the students chose salad?', 30, { h: ['The percents of all the choices add to 100.'], s: '100 − 45 − 25 = 30%. (That is 12 students.)' }),
    ], 'The idea: the parts of a whole always add up to 100%. When you know all but one, subtract from 100.'),
    chain('Two quizzes', 'Dev got 21 out of 28 on a quiz. Eli got 80% on a quiz that had 25 questions.', [
      num('c2a', 'What percent did Dev get?', 75, { h: ['{21/28} in lowest terms.'], s: '{21/28} = {3/4} = 75%.' }),
      num('c2b', 'How many questions did Eli get right?', 20, { h: ['80% of 25.'], s: '0.8 × 25 = 20.' }),
      num('c2c', 'By how many percentage points was Eli\'s score higher than Dev\'s?', 5, { h: ['Compare 80% with 75%.'], s: '80 − 75 = 5 percentage points.' }),
    ], 'The idea: percents let us compare scores on quizzes of different lengths. Eli got 20 right and Dev got 21, yet Eli scored higher, because his quiz was shorter.'),
    mc('c3', 'Find the error. Mia says: "To find 25% of 80, I divide 80 by 25, which gives 3.2." Which is right?', ['She is right.', '25% is {1/4}, so 25% of 80 is 80 ÷ 4 = 20.', '25% of 80 is 25 × 80 = 2000.', '25% of 80 is 105.'], 1, {
      s: '25% = {25/100} = {1/4}. A quarter of 80 is 20.',
      w: [[0, 'Dividing by 25 is dividing by the percent number. Percent means "per 100": 25% is {25/100}, and that is a quarter.'], [2, 'That multiplies by 25 and forgets the "out of 100". Divide by 100 too.']],
    }),
  ],

  quiz: [
    tpl('convert', (r) => {
      const v = r.int(1, 99);
      const t = r.int(0, 2);
      if (t === 0) return N('Write ' + v + '% as a decimal.', fx(v / 100), { s: v + ' ÷ 100 = ' + fx(v / 100) + '.', w: wr(v / 100, [[v / 10, 'You moved the point one place. Dividing by 100 moves it two places.']]) });
      if (t === 1) return N('Write ' + fx(v / 100) + ' as a percent.', v, { s: fx(v / 100) + ' × 100 = ' + v + '%.', w: wr(v, [[v / 10, 'Multiply by 100 to get a percent, which moves the point two places.']]) });
      const f = R(v, 100);
      return N('Write ' + v + '% as a fraction in lowest terms.', fmt(f), { s: '{' + v + '/100} simplifies to ' + fm(f) + '.', w: [[v + '/10', 'Percent means out of 100, not out of 10.']].filter(([x]) => x !== fmt(f)) });
    }),
    tpl('of', (r) => {
      const pc = r.pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]), n = 20 * r.int(1, 25);
      return N('What is ' + pc + '% of ' + n + '?', fx((pc * n) / 100), { s: pc + '% = ' + pc / 100 + ', so ' + pc / 100 + ' × ' + n + ' = ' + (pc * n) / 100 + '.', w: wr((pc * n) / 100, [[pc * n, 'You forgot to divide by 100. A percent is a number out of 100.'], [n / pc, 'Percent of a number is multiplication, not division by the percent.']]) });
    }),
    tpl('whatpct', (r) => {
      const whole = r.pick([4, 5, 8, 10, 20, 25, 40, 50, 200]), part = r.int(1, whole - 1), ans = (part * 100) / whole;
      const nm = name(r);
      return N(nm + ' got ' + part + ' out of ' + whole + ' on a quiz. What percent is that?', fx(ans), { s: '{' + part + '/' + whole + '} × 100 = ' + fx(ans) + '%.', w: wr(ans, [[part / whole, 'That is the decimal. Multiply by 100 for a percent.'], [(whole * 100) / part, 'The part goes on top: part ÷ whole, then × 100.']]) });
    }),
    tpl('whole', (r) => {
      const pc = r.pick([10, 20, 25, 40, 50, 60, 75, 80]), w = 20 * r.int(2, 20), part = (pc * w) / 100;
      return N(part + ' is ' + pc + '% of a number. What is the number?', w, { s: pc + '% of the number is ' + part + '. So 1% is ' + fx(part / pc) + ' and 100% is ' + w + '.', w: wr(w, [[(part * pc) / 100, 'That finds ' + pc + '% of ' + part + ', but ' + part + ' is already the ' + pc + '% piece.']]) });
    }),
    tpl('swap', (r) => {
      const L = r.pick([20, 25, 40, 50, 60, 75, 80, 120, 150, 200]), s = r.int(2, 30);
      if (s === L) return N('What is 10% of 50?', 5, { s: '0.1 × 50 = 5.' });
      return N('Find ' + s + '% of ' + L + '. (Hint: A% of B equals B% of A.)', fx((s * L) / 100), { s: s + '% of ' + L + ' = ' + L + '% of ' + s + ' = ' + fx((s * L) / 100) + '.', w: wr((s * L) / 100, [[s * L, 'Do not forget the "per hundred": divide by 100.']]) });
    }),
    tpl('fracpct', (r) => {
      const d = r.pick([4, 5, 8, 10, 20, 25, 40, 50]), n = r.int(1, d - 1), g = gcd(n, d);
      return N('Write {' + n + '/' + d + '} as a percent.', fx((n * 100) / d), { s: n + ' ÷ ' + d + ' = ' + fx(n / d) + ', and times 100 is ' + fx((n * 100) / d) + '%.', w: wr((n * 100) / d, [[n / d, 'That is the decimal. Multiply by 100 to get a percent.']]) });
    }),
    tpl('greatest', (r) => {
      const vs = r.distinct(3, 2, 38).map((x) => x * 5);
      const forms = r.shuffle([0, 1, 2]);
      const txt = vs.map((v, i) => (forms[i] === 0 ? v + '%' : forms[i] === 1 ? fx(v / 100) : '{' + R(v, 100).n + '/' + R(v, 100).d + '}'));
      const best = vs.indexOf(Math.max(...vs));
      return choice(r, 'Which is the greatest?', txt[best], txt.filter((_, i) => i !== best).map((x) => [x, 'Write all three as percents (or decimals) and compare. This one is smaller.']), { s: 'As percents: ' + vs.map((v) => v + '%').join(', ') + '. The greatest is ' + vs[best] + '%.' });
    }),
    tpl('notcount', (r) => {
      const n = 20 * r.int(1, 15), pc = r.pick([10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80]), [a, b] = r.pick([['walk to school', 'do not walk'], ['own a bike', 'do not own a bike'], ['wear glasses', 'do not wear glasses']]);
      return N('Of ' + n + ' students, ' + pc + '% ' + a + '. How many students ' + b + '?', n - (pc * n) / 100, { s: pc + '% of ' + n + ' is ' + (pc * n) / 100 + '. The rest: ' + n + ' − ' + (pc * n) / 100 + ' = ' + (n - (pc * n) / 100) + '.', w: wr(n - (pc * n) / 100, [[(pc * n) / 100, 'That is the number who ' + a + '. The question asks about the others.']]) });
    }),
  ],
});
