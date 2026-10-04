import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, eq, fmt, fm, gcd, tbl, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

// wrong answers given as rationals; drops any that equal the right answer or repeat
const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';

export default lesson({
  id: 'm4-8-1-fraction-review',
  title: 'Fraction review',
  blurb: 'Equal parts, equivalent fractions, simplest form, comparing, number lines, and fractions of a set.',
  concepts: ['fractions', 'equivalent-fractions', 'comparing-fractions'],

  tryFirst: [
    num('t1', 'A tray is cut into 12 equal squares. 9 squares are eaten. What fraction of the tray is left? Give it in simplest form.', '1/4', {
      h: ['How many squares are left?', 'Write that as a fraction of 12. Then divide the top and the bottom by the same number.'],
      s: '12 − 9 = 3 squares are left. That is {3/12}. Divide top and bottom by 3: {1/4}.',
      w: [['3/4', 'That is the part that was eaten. The question asks about the part that is left.']],
    }),
    num('t2', 'Ava eats {1/3} of a cake. Ben eats {1/4} of the same cake. Together, how many twelfths of the cake did they eat?', 7, {
      h: ['Thirds and fourths are different sizes. Cut both into twelfths.', 'How many twelfths make one third? How many make one fourth?'],
      s: '{1/3} = {4/12} and {1/4} = {3/12}. Together that is 4 + 3 = 7 twelfths.',
      w: [['2', 'You added the tops. But thirds and fourths are pieces of different sizes. Cut both into twelfths first.']],
    }),
  ],

  learn: [
    p('Fractions are numbers that name parts of a whole. This lesson reviews the main ideas, because every fraction lesson after it depends on them: what a fraction means, how to rewrite it, how to compare it and how to take a part of a set.'),
    def('fraction', 'A number that names <b>equal</b> parts of a whole. {3/4} means 3 of the 4 equal parts.'),
    def('denominator', 'The <b>bottom</b> number. It tells how many equal parts the whole is cut into, so it names the size of each piece.'),
    def('numerator', 'The <b>top</b> number. It tells how many of those parts we are talking about.'),
    widget('fractionExplorer', { n: 3, d: 4 }),
    p('The parts must be <b>equal</b>. A square cut into 4 unequal pieces does not show fourths.'),
    def('equivalent fractions', 'Fractions that name the same amount, such as {1/2} and {3/6}. They land on the same spot on the number line.'),
    rule('<b>Equivalent fractions.</b> Multiply the top and the bottom by the same number and the amount does not change. {1/2} = {2/4} = {3/6} = {4/8}. They all name the same spot on the number line.'),
    formula('Equivalent fractions', '{a/b} = {(a × n)/(b × n)}', 'Multiply the top and the bottom by the same number n, or divide both by the same number. The value stays the same.'),
    ex('Simplest form', ['Write {18/24} in simplest form.', 'Find a number that divides both 18 and 24. The number 6 does.', '18 ÷ 6 = 3 and 24 ÷ 6 = 4.', 'So {18/24} = {3/4}. Nothing but 1 divides both 3 and 4, so we are done.']),
    widget('simplifyFraction', { n: 18, d: 24 }),
    def('simplest form', 'A fraction is in simplest form when no number except 1 divides both the top and the bottom.'),
    tip('Not sure which number to divide by? Divide both by any common factor you see, such as 2, and repeat until nothing is left to divide by. You will reach the same answer as dividing by the greatest common factor at once.'),
    rule('<b>Comparing.</b> Same bottoms: the bigger top is bigger. Same tops: the bigger bottom means smaller pieces, so the fraction is smaller. Different bottoms: cut both into the same size pieces first.'),
    ex('Which is greater, {5/8} or {2/3}?', ['The bottoms 8 and 3 both go into 24. Use 24ths.', '{5/8} = {15/24} because 5 × 3 = 15 and 8 × 3 = 24.', '{2/3} = {16/24} because 2 × 8 = 16 and 3 × 8 = 24.', '16 is more than 15, so {2/3} is greater.']),
    widget('commonDenominator', { a: 5, b: 8, c: 2, d: 3, mode: 'compare' }),
    tip('Use {1/2} as a landmark. {4/9} is less than {1/2}, because half of 9 is 4 and a half, and 4 is less than that. {5/9} is more than {1/2}. Sometimes this settles a comparison at once.'),
    p('<b>On a number line.</b> Cut the space from 0 to 1 into equal steps. If there are 8 steps, then {5/8} is 5 steps from 0. Equivalent fractions land on the same spot.'),
    ex('A fraction of a set', ['Find {3/5} of 20 marbles.', 'The bottom 5 says: split the 20 marbles into 5 equal groups. Each group has 4.', 'The top 3 says: take 3 of those groups.', '3 × 4 = 12 marbles.']),
    formula('Fraction of a set', '{a/b} of N = (N ÷ b) × a', 'Divide the set into b equal groups, then take a of them. {3/5} of 20 = (20 ÷ 5) × 3 = 12.'),
    key('A fraction is a number of equal pieces. To compare or combine fractions, make the pieces the <b>same size</b> first.'),
    warn('<b>Watch out.</b> A bigger bottom number means smaller pieces. {1/8} is less than {1/5}, even though 8 is more than 5.'),
    mcq('Dev says "{3/8} is greater than {3/5}, because 8 is greater than 5." What is wrong?', ['Nothing. He is right.', 'Both fractions have 3 pieces. Eighths are smaller pieces than fifths, so 3 eighths is less than 3 fifths.', 'You cannot compare fractions that have different bottoms.'], 1, 'Cut a bar into 8 equal parts and another into 5 equal parts. Each fifth is longer than each eighth. Three long pieces beat three short pieces.', 'Spot the mistake'),
    recap([['fraction', 'equal parts of a whole'], ['numerator', 'top: how many parts'], ['denominator', 'bottom: size of the parts'], ['equivalent', 'different names for the same amount'], ['simplest form', 'only 1 divides both top and bottom']], [['Equivalent', '{a/b} = {(a × n)/(b × n)}'], ['Part of a set', '{a/b} of N = (N ÷ b) × a']]),
  ],

  practice: [
    num('p1', 'A ribbon is cut into 15 equal pieces. 9 of the pieces are blue. What fraction of the ribbon is blue? Give it in simplest form.', '3/5', {
      h: ['Write the fraction first: 9 out of 15.', '9 and 15 can both be divided by 3.'],
      s: '{9/15}. Divide top and bottom by 3: {3/5}.',
      w: [['9/14', 'The whole ribbon is 15 pieces. The bottom is 15, not 14.']],
    }),
    mc('p2', 'Exactly one of these is NOT equal to {3/4}. Which one?', ['{9/12}', '{12/16}', '{15/20}', '{16/24}'], 3, {
      h: ['Multiply 3 and 4 by the same number and see what you get.', 'Check each: does the top look like 3 times something, and the bottom the same something times 4?'],
      s: '{9/12}, {12/16} and {15/20} come from multiplying 3 and 4 by 3, 4 and 5. For {16/24} the multiplier would be 16 ÷ 3, which is not whole. In fact {16/24} = {2/3}.',
      w: [[0, '3 × 3 = 9 and 4 × 3 = 12. This one IS equal to {3/4}.'], [1, '3 × 4 = 12 and 4 × 4 = 16. This one IS equal to {3/4}.'], [2, '3 × 5 = 15 and 4 × 5 = 20. This one IS equal to {3/4}.']],
    }),
    mc('p3', 'Which list is in order from least to greatest?', ['{7/12}, {2/3}, {3/4}, {5/6}', '{5/6}, {3/4}, {2/3}, {7/12}', '{2/3}, {7/12}, {3/4}, {5/6}', '{7/12}, {3/4}, {2/3}, {5/6}'], 0, {
      h: ['Write every fraction with bottom 12.', '{2/3} = {8/12}. What are the others?'],
      s: 'In twelfths: {7/12}, {8/12}, {9/12}, {10/12}. That is {7/12}, {2/3}, {3/4}, {5/6}.',
      w: [[1, 'That list goes from greatest to least.'], [2, 'Check {7/12} and {2/3} in twelfths: 7 twelfths is less than 8 twelfths.'], [3, 'In twelfths, {3/4} is 9 and {2/3} is 8. So {2/3} comes first.']],
    }),
    num('p4', 'A day has 24 hours. Leo sleeps 9 hours and is at school for 6 hours. What fraction of the day is left? Give it in simplest form.', '3/8', {
      h: ['First find how many hours are left.', 'Then write that as a fraction of 24 and simplify.'],
      s: '9 + 6 = 15 hours are used, so 24 − 15 = 9 hours are left. {9/24} = {3/8}.',
      w: [['5/8', 'That is the part that is used up: {15/24}. The question asks for the part that is left.']],
    }),
    num('p5', 'A box has 40 crayons. {3/8} of them are red. How many crayons are NOT red?', 25, {
      h: ['Find one eighth of 40 first.', 'Then decide whether you need the red ones or the others.'],
      s: '{1/8} of 40 is 5. Red crayons: 3 × 5 = 15. Not red: 40 − 15 = 25.',
      w: [['15', 'That is how many are red. The question asks how many are not red.']],
    }),
    num('p6', 'What fraction is exactly halfway between {1/3} and {1/2} on the number line?', '5/12', {
      h: ['Write both fractions with the same bottom. Try 6ths first, then a bottom where there is room between them.', 'In twelfths, {1/3} is {4/12}.'],
      s: '{1/3} = {4/12} and {1/2} = {6/12}. The number in the middle of 4 and 6 is 5. So the answer is {5/12}.',
      w: [['2/5', 'You added the tops and added the bottoms. That does not find a middle. Use twelfths.'], ['1/4', 'Check it: {1/4} is smaller than {1/3}, so it is not between them.']],
    }),
    num('p7', 'How many fractions with bottom 12 are strictly between {1/3} and {5/6}?', 5, {
      h: ['Write {1/3} and {5/6} with bottom 12.', '"Strictly between" does not count the two ends.'],
      s: '{1/3} = {4/12} and {5/6} = {10/12}. The tops 5, 6, 7, 8, 9 are between 4 and 10. That is 5 fractions.',
      w: [['7', 'You counted 4 through 10. The two ends are not between.'], ['6', 'You counted one of the ends. Leave out both.']],
    }),
    num('p8', 'A fraction is equal to {2/3}. Its top and bottom add up to 35. What is its top?', 14, {
      h: ['The top and the bottom come from multiplying 2 and 3 by the same number.', 'Together 2 and 3 make 5. How many 5s make 35?'],
      s: 'If we multiply by k, the fraction is {2k/3k}. The sum is 5k = 35, so k = 7. The top is 2 × 7 = 14, and the bottom is 21.',
      w: [['21', 'That is the bottom. The question asks for the top.']],
    }),
  ],

  challenge: [
    chain('Beads in a jar', 'A jar has 60 beads. {1/3} of them are red. {1/4} of them are blue. All the others are green.', [
      num('c1a', 'How many beads are red or blue?', 35, { h: ['Find {1/3} of 60 and {1/4} of 60.'], s: '{1/3} of 60 is 20. {1/4} of 60 is 15. 20 + 15 = 35.' }),
      num('c1b', 'How many beads are green?', 25, { h: ['The green beads are all the beads that are not red or blue.'], s: '60 − 35 = 25 green beads.' }),
      num('c1c', 'What fraction of the beads are green? Give it in simplest form.', '5/12', { h: ['Write 25 out of 60, then simplify.', 'Both 25 and 60 divide by 5.'], s: '{25/60} = {5/12}. Check: {1/3} + {1/4} = {7/12}, and {5/12} is what is left of the whole.' }),
    ], 'The idea: you can find the amounts first and turn them into a fraction at the end, or add the fractions first. Both ways give the same answer.'),
    chain('Room between fractions', 'Mira wants to fit fractions between {1/2} and {3/4}.', [
      num('c2a', 'Write {1/2} and {3/4} with bottom 16. What is the sum of the two new tops?', 20, { h: ['{1/2} = {8/16}. What is {3/4} in sixteenths?'], s: '{1/2} = {8/16} and {3/4} = {12/16}. 8 + 12 = 20.' }),
      num('c2b', 'How many fractions with bottom 16 are strictly between {1/2} and {3/4}?', 3, { h: ['List the tops between 8 and 12.'], s: 'The tops are 9, 10 and 11. That is 3 fractions.' }),
      num('c2c', 'Which of those fractions is exactly halfway between {1/2} and {3/4}? Give it in simplest form.', '5/8', { h: ['The halfway top is in the middle of 8 and 12.'], s: 'The middle of 8 and 12 is 10. {10/16} = {5/8}.' }),
    ], 'The idea: cutting into smaller pieces makes room. The more pieces you use, the more fractions fit between two numbers.'),
    mc('c3', 'Find the error. Nico says: "{2/3} equals {3/4}, because each one is only one piece short of a whole." What is wrong?', ['The missing pieces are not the same size. A fourth is smaller than a third, so {3/4} is closer to 1 and is greater.', 'Nothing. Nico is right.', '{2/3} is greater, because 3 is less than 4.', 'You cannot compare fractions with different bottoms.'], 0, {
      s: '{2/3} is missing a third. {3/4} is missing only a fourth. A fourth is smaller, so {3/4} is closer to 1. In twelfths: {8/12} and {9/12}.',
      w: [[1, 'Check in twelfths: {2/3} = {8/12} and {3/4} = {9/12}. They are different.'], [2, 'Smaller bottoms mean bigger pieces, but here the missing piece decides. Compare in twelfths: 8 and 9.']],
    }),
  ],

  quiz: [
    tpl('simplify', (r) => {
      const d = r.int(3, 13), n = r.int(1, d - 1), g0 = gcd(n, d), a = n / g0, b = d / g0, k = r.int(2, 9);
      const ans = R(a, b);
      return N('Write ' + F(a * k, b * k) + ' in simplest form.', fmt(ans), { s: 'Divide the top and the bottom by ' + k + ': ' + F(a, b) + '.', w: W(ans, [[R(a, b * k), 'Divide the top and the bottom by the same number. You only changed one of them.']]) });
    }),
    tpl('equiv', (r) => {
      const b = r.int(3, 9);
      let a = r.int(1, b - 1);
      while (gcd(a, b) > 1) a = r.int(1, b - 1);
      const k = r.int(2, 9), m = b * k;
      return N('What number goes in the box? ' + F(a, b) + ' = {☐/' + m + '}', a * k, { s: b + ' × ' + k + ' = ' + m + ', so multiply the top by ' + k + ' too: ' + a + ' × ' + k + ' = ' + a * k + '.', w: [[a + (m - b), 'Adding the same number to the top and the bottom changes the fraction. Multiply both by the same number.']] });
    }),
    tpl('greatest', (r) => {
      let fr = null;
      for (let t = 0; t < 300 && !fr; t++) {
        const ds = [r.int(2, 12), r.int(2, 12), r.int(2, 12), r.int(2, 12)];
        const list = ds.map((d) => [r.int(1, d - 1), d]);
        const vals = list.map(([n, d]) => R(n, d));
        const ok = vals.every((v, i) => vals.every((w, j) => i === j || !eq(v, w)));
        if (ok && new Set(ds).size === 4) fr = list;
      }
      if (!fr) fr = [[3, 4], [5, 8], [2, 3], [7, 12]];
      const vals = fr.map(([n, d]) => R(n, d));
      let best = 0;
      vals.forEach((v, i) => { if (v.n * vals[best].d > vals[best].n * v.d) best = i; });
      const txt = fr.map(([n, d]) => F(n, d));
      return choice(r, 'Which fraction is the greatest?', txt[best], txt.filter((_, i) => i !== best).map((t) => [t, 'Cut the fractions into the same size pieces and compare the tops.']), { s: 'As decimals the amounts are ' + vals.map((v) => (v.n / v.d).toFixed(2)).join(', ') + '. The greatest is ' + txt[best] + '.', h: ['Use a common bottom, or compare each one to {1/2} first.'] });
    }),
    tpl('ofset', (r) => {
      const b = r.int(3, 12), a = r.int(1, b - 1), k = r.int(2, 9), total = b * k;
      const [things, kind] = r.pick([['books', 'paperbacks'], ['tiles', 'blue'], ['marbles', 'red'], ['stickers', 'shiny'], ['cards', 'rare']]);
      const ans = R(total - a * k);
      return N('A box holds ' + total + ' ' + things + '. ' + F(a, b) + ' of them are ' + kind + '. How many are not ' + kind + '?', fmt(ans), { s: F(1, b) + ' of ' + total + ' is ' + k + '. So ' + a + ' × ' + k + ' = ' + a * k + ' are ' + kind + '. The rest: ' + total + ' − ' + a * k + ' = ' + (total - a * k) + '.', w: W(ans, [[R(a * k), 'That is how many ARE ' + kind + '. The question asks about the rest.']]) });
    }),
    tpl('halfway', (r) => {
      const d = r.int(6, 20), a = r.int(1, d - 3), b = a + 2 * r.int(1, Math.floor((d - 1 - a) / 2));
      const ans = R((a + b) / 2, d);
      return N('What number is exactly halfway between ' + F(a, d) + ' and ' + F(b, d) + ' on the number line?', fmt(ans), { s: 'The tops are ' + a + ' and ' + b + '. Halfway between them is ' + (a + b) / 2 + '. So the answer is ' + F((a + b) / 2, d) + (ans.d !== d ? ' = ' + fm(ans) : '') + '.', w: W(ans, [[R(b - a, d), 'That is the distance between them. Start at the first fraction and walk only half of that distance.']]) });
    }),
    tpl('topbottom', (r) => {
      const b = r.int(3, 11);
      let a = r.int(1, b - 1);
      while (gcd(a, b) > 1) a = r.int(1, b - 1);
      const k = r.int(2, 9), S = (a + b) * k;
      return N('A fraction is equal to ' + F(a, b) + '. Its top and bottom add up to ' + S + '. What is its top?', a * k, { s: a + ' + ' + b + ' = ' + (a + b) + ', and ' + S + ' ÷ ' + (a + b) + ' = ' + k + '. The top is ' + a + ' × ' + k + ' = ' + a * k + '.', w: [[b * k, 'That is the bottom. The question asks for the top.']] });
    }),
    tpl('between', (r) => {
      const D = r.pick([12, 16, 18, 20, 24]), a = r.int(1, D - 4), b = a + r.int(2, Math.min(7, D - 1 - a));
      const x = R(a, D), y = R(b, D), ans = b - a - 1;
      return N('How many fractions with bottom ' + D + ' are strictly between ' + fm(x) + ' and ' + fm(y) + '?', ans, { s: fm(x) + ' = ' + F(a, D) + ' and ' + fm(y) + ' = ' + F(b, D) + '. The tops from ' + (a + 1) + ' to ' + (b - 1) + ' are between them: ' + ans + (ans === 1 ? ' fraction.' : ' fractions.'), w: [[ans + 2, 'You counted both ends. "Strictly between" leaves them out.'], [ans + 1, 'You counted one end. Leave out both.']] });
    }),
    tpl('leftover', (r) => {
      const d = r.pick([6, 8, 10, 12, 15, 20]), a = r.int(1, Math.floor(d / 2) - 1 || 1), b = r.int(1, d - a - 1);
      const ans = R(d - a - b, d);
      return N('Isla reads ' + F(a, d) + ' of a book on Monday and ' + F(b, d) + ' of it on Tuesday. What fraction of the book is left? Give it in simplest form.', fmt(ans), { s: a + ' + ' + b + ' = ' + (a + b) + ' of the ' + d + ' parts are read. ' + d + ' − ' + (a + b) + ' = ' + (d - a - b) + (d - a - b === 1 ? ' part is left: ' : ' parts are left: ') + F(d - a - b, d) + (ans.d !== d ? ' = ' + fm(ans) : '') + '.', w: W(ans, [[R(a + b, d), 'That is the part already read. The question asks for the part that is left.']]) });
    }),
  ],
});
