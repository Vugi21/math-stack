import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, sub, lcm, fmt, fm } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
// wrong-answer list that never contains the right answer or duplicates (compared by value)
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'pre-4-1-what-is-a-fraction',
  title: 'What is a fraction?',
  blurb: 'Equal parts, pieces of a whole, points on the number line, and why a fraction is secretly a division.',
  concepts: ['fractions', 'equivalent-fractions', 'fraction-of-a-quantity'],

  tryFirst: [
    num('t1', 'A pizza is cut into 8 equal slices. Ava eats 3 slices and Ben eats 2 slices. What fraction of the whole pizza is left?', '3/8', {
      h: ['How many slices are left? Then ask: that many out of how many total?'],
      s: '8 − 3 − 2 = 3 slices are left, out of 8 equal slices, so {3/8} of the pizza.',
      w: [['5/8', 'That is the fraction that was eaten. The question asks about what is left.'], ['3', 'Three is the number of slices. A fraction says three out of how many.']],
    }),
    num('t2', 'A chocolate bar has 12 squares. Dev eats 1/3 of the bar. How many squares does he eat?', 4, {
      h: ['One third means the bar is split into 3 equal groups, and Dev eats 1 of them.'],
      s: '12 squares split into 3 equal groups is 4 squares per group. Dev eats one group: 4 squares.',
      w: [['3', 'You split into groups of 3. One third means split into 3 equal groups and take one.'], ['36', 'Taking a third makes less than the whole bar, not more.']],
    }),
  ],

  learn: [
    p('A <b>fraction</b> describes a whole that has been cut into <b>equal</b> parts. The bottom number (the <b>denominator</b>) says how many equal parts the whole is cut into. It names the size of one piece. The top number (the <b>numerator</b>) says how many of those pieces you have.'),
    widget('fractionExplorer', { n: 3, d: 4 }),
    rule('<b>Meaning of a fraction.</b> {a/b} means <b>a</b> pieces, each of size {1/b}. Slide the bottom number up and watch the pieces shrink. A bigger denominator means smaller pieces. The pieces must be <b>equal</b>, or the fraction means nothing.'),
    p('Fractions also live on the number line. Cut the stretch from 0 to 1 into d equal steps, and {a/b} is the point a steps from 0. The fraction {d/d} lands exactly on 1. A fraction whose top is bigger than its bottom lands beyond 1. These are called <b>improper</b> fractions, though there is nothing wrong with them.'),
    widget('fractionExplorer', { n: 7, d: 4 }),
    rule('<b>A fraction is a division.</b> {a/b} means a ÷ b. Share 3 pizzas among 4 people: each gets 3 ÷ 4 = {3/4} of a pizza. The top is what you are sharing and the bottom is how many ways.'),
    ex('A fraction of a group', ['What is {3/5} of 20 marbles?', 'The bottom 5 says: split the 20 into 5 equal groups. 20 ÷ 5 = 4 marbles in each group.', 'The top 3 says: take 3 of those groups. 3 × 4 = 12.', 'Answer: 12 marbles. Divide by the bottom first, then multiply by the top.']),
    p('<b>Equivalent fractions.</b> Cut every piece of {1/2} in half and you get {2/4}. Cut each into thirds and you get {3/6}. The amount of pizza never changed, only the number of cuts. Multiplying the top and the bottom by the same number gives another name for the same point on the line.'),
    ex('Finding a missing top', ['Fill in: {2/3} = {?/12}.', 'The bottom went from 3 to 12. That is multiplied by 4.', 'Do the same to the top: 2 × 4 = 8.', '{2/3} = {8/12}. Each third was cut into 4 smaller pieces.']),
    tbl(['Fraction', 'Pieces of size', 'Where on the line?'], [[F(1, 2), F(1, 2), 'halfway to 1'], [F(5, 5), F(1, 5), 'exactly 1'], [F(9, 4), F(1, 4), 'a little past 2'], [F(0, 7), F(1, 7), 'at 0']], 'Reading fractions'),
    warn('<b>Watch out.</b> Bigger bottom does not mean bigger fraction. {1/8} is smaller than {1/3}, because cutting a whole into 8 pieces gives smaller pieces than cutting into 3. Also check that the parts are <b>equal</b>: a bar cut into 4 uneven pieces is not four fourths.'),
    mcq('Ben says: "A square is cut into 3 pieces and one piece is shaded, so the shaded part is 1/3." The pieces are very different sizes. What is wrong?', ['Nothing. One piece out of three is always 1/3.', 'Fractions need equal pieces. With unequal pieces the shaded part is not 1/3 of the square.', 'It should be 3/1 because 3 is the number of pieces.'], 1, 'The bottom number is the number of <i>equal</i> parts. If the pieces are different sizes, "1 out of 3" does not tell you how much of the square is shaded.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A ribbon is cut into 12 equal pieces. Priya uses 5 of them. What fraction of the ribbon is left?', '7/12', {
      h: ['First find how many pieces are left.'],
      s: '12 − 5 = 7 pieces left, out of 12: {7/12}.',
      w: [['5/12', 'That is the part Priya used. The question asks for what is left.']],
    }),
    num('p2', 'What is {3/5} of 35?', 21, {
      h: ['Divide 35 into 5 equal groups, then take 3 groups.'],
      s: '35 ÷ 5 = 7 in each group. 3 groups: 3 × 7 = 21.',
      w: [['7', 'That is {1/5} of 35. You need 3 of those groups.'], ['105', 'You multiplied by 3 but forgot to divide by 5. The fraction is less than 1, so the answer must be less than 35.']],
    }),
    mc('p3', 'Which of these fractions is the greatest?', [F(1, 8), F(1, 3), F(1, 5), F(1, 2)], 3, {
      h: ['All have one piece. What happens to the size of a piece as the whole is cut into more parts?'],
      s: 'With one piece each, the fewer the cuts, the bigger the piece. Halves are the biggest.',
      w: [[0, 'Eighths are the smallest of these pieces. A bigger bottom means smaller pieces.'], [1, 'Thirds are smaller than halves. Fewer cuts make bigger pieces.']],
    }),
    num('p4', 'How many sixths are there in 2 whole pizzas? (Each pizza is cut into 6 equal slices.)', 12, {
      h: ['How many sixths make one whole?'],
      s: 'One whole is {6/6}, so two wholes are 2 × 6 = 12 sixths.',
      w: [['6', 'That is the number of sixths in just one whole. There are two wholes.'], ['8', 'You added 2 + 6. Each whole holds 6 sixths, so multiply.']],
    }),
    num('p5', 'Fill in the missing top: {3/4} = {?/20}.', 15, {
      h: ['What did you multiply 4 by to get 20? Do the same to the top.'],
      s: '4 × 5 = 20, so multiply the top by 5 too: 3 × 5 = 15.',
      w: [['19', 'You added 16 to both. Equivalent fractions come from multiplying top and bottom by the same number, not adding.']],
    }),
    num('p6', 'Write 9 ÷ 4 as a fraction.', '9/4', {
      mixed: true,
      h: ['Which number is being shared and which is the number of shares?'],
      s: 'The number being divided goes on top and the divisor on the bottom: {9/4}, which is 2 and {1/4}.',
      w: [['4/9', 'You flipped it. 9 ÷ 4 means 9 is shared, so 9 goes on top.']],
    }),
    num('p7', 'How many fractions with denominator 10 are strictly between {1/2} and 2? (Count fractions like {7/10}, whose bottom is exactly 10.)', 14, {
      h: ['Write {1/2} and 2 with denominator 10. Then list the tops in between.'],
      s: '{1/2} = {5/10} and 2 = {20/10}. The tops strictly between 5 and 20 are 6, 7, …, 19. That is 14 fractions.',
      w: [['15', 'That counts 5 to 19, which includes {5/10}. But {5/10} is {1/2} itself, and "strictly between" leaves it out.'], ['13', 'Count again carefully: 6, 7, …, 19 includes both 6 and 19.'], ['16', 'You went up to {20/10}, which is 2 itself. "Strictly between" leaves out the ends.']],
    }),
  ],

  challenge: [
    chain('The marble bag', 'A bag holds 60 marbles. One third of them are red and one quarter are blue. The rest are green.', [
      num('c1a', 'How many marbles are red?', 20, { h: ['Split 60 into 3 equal groups.'], s: '60 ÷ 3 = 20.' }),
      num('c1b', 'How many marbles are blue?', 15, { h: ['Split 60 into 4 equal groups.'], s: '60 ÷ 4 = 15.' }),
      num('c1c', 'What fraction of the marbles are green?', '5/12', { h: ['Find the number of green marbles first.', 'Green is 60 − 20 − 15 = 25. Write 25 out of 60.'], s: '25 green out of 60 is {25/60}, which is {5/12} after dividing top and bottom by 5.', w: [['25', 'That is the number of green marbles. The question asks for a fraction of the bag.']] }),
    ], 'The idea: when the whole is a number you can split evenly, turn each fraction into a count. Then everything is just counting marbles.'),
    chain('Squeeze a fraction in', 'We want a fraction with denominator 12 that sits strictly between {1/3} and {1/2}.', [
      num('c2a', 'Write {1/3} with denominator 12. What is the top?', 4, { h: ['3 times what is 12?'], s: '3 × 4 = 12, so {1/3} = {4/12}.' }),
      num('c2b', 'Write {1/2} with denominator 12. What is the top?', 6, { h: ['2 times what is 12?'], s: '2 × 6 = 12, so {1/2} = {6/12}.' }),
      num('c2c', 'What is the top of the fraction with denominator 12 that is strictly between them?', 5, { h: ['Which whole number is strictly between 4 and 6?'], s: 'Only 5. So {5/12} is between {1/3} and {1/2}.', w: [['4', '{4/12} is {1/3} itself. Between means strictly after it.'], ['6', '{6/12} is {1/2} itself.']] }),
    ], 'The idea: once two fractions share a denominator, comparing them is just comparing the tops. If there is no room, cut every piece smaller to make room.'),
    mc('c3', 'Find the error. Chloe says: "{1/8} is bigger than {1/6} because 8 is bigger than 6." What is wrong with her reasoning?', ['Nothing, she is right.', 'The bottom number tells how many pieces the whole is cut into. More pieces means each is smaller, so {1/8} is smaller than {1/6}.', 'Both fractions are equal because both have a 1 on top.', 'You cannot compare fractions with different bottoms.'], 1, {
      s: 'Cutting a pizza into 8 slices gives thinner slices than cutting it into 6.',
      w: [[0, 'Picture the pizzas: 8 slices from one pizza is thinner than 6 slices.'], [2, 'Same top, but the pieces have different sizes, so the fractions are different.']],
    }),
  ],

  quiz: [
    tpl('left', (r) => {
      const d = r.int(6, 24), a = r.int(2, d - 2), who = name(r);
      const thing = r.pick(['ribbon', 'chocolate bar', 'garden bed', 'pizza']);
      const ans = R(d - a, d);
      return N('A ' + thing + ' is cut into ' + d + ' equal pieces. ' + who + ' uses ' + a + ' of them. What fraction of the ' + thing + ' is left?', fmt(ans), { mixed: true, s: d + ' − ' + a + ' = ' + (d - a) + ' pieces are left out of ' + d + ': ' + fm(ans) + '.', w: W(ans, [[fmt(R(a, d)), 'That is the fraction that was used. Subtract first to find what is left.']]) });
    }),
    tpl('fracof', (r) => {
      const d = r.int(3, 9), n = r.int(1, d - 1), k = r.int(2, 12), tot = d * k;
      const q = r.pick([
        'What is ' + F(n, d) + ' of ' + tot + '?',
        'A class has ' + tot + ' students. ' + F(n, d) + ' of them walk to school. How many walk?',
        'A tank holds ' + tot + ' litres. It is ' + F(n, d) + ' full. How many litres are in it?',
      ]);
      return N(q, n * k, { s: tot + ' ÷ ' + d + ' = ' + k + ' in each group. ' + n + (n === 1 ? ' group: ' : ' groups: ') + n + ' × ' + k + ' = ' + n * k + '.', w: W(n * k, [[k, 'That is just one group, {1/' + d + '} of the amount. Take ' + n + (n === 1 ? ' group.' : ' groups.')], [tot * n, 'Divide by the bottom number first. Taking a fraction less than 1 makes the amount smaller.']]) });
    }),
    tpl('count', (r) => {
      const d = r.int(3, 12), m = r.int(2, 6), e = r.int(1, d - 1);
      if (r.bool()) return N('How many pieces of size ' + F(1, d) + ' make ' + m + ' whole pizzas?', m * d, { s: 'Each whole is ' + d + ' pieces. ' + m + ' × ' + d + ' = ' + m * d + '.', w: [[m + d, 'Each pizza holds ' + d + ' pieces, so multiply instead of adding.']] });
      return N('How many pieces of size ' + F(1, d) + ' are in ' + m + ' wholes and ' + e + ' extra pieces?', m * d + e, { s: m + ' wholes are ' + m * d + ' pieces. Add the ' + e + ' extra: ' + (m * d + e) + '.', w: [[m * d, 'Do not forget the ' + e + ' extra pieces.'], [m + e, 'Each whole holds ' + d + ' pieces, not 1.']] });
    }),
    tpl('divfrac', (r) => {
      let a = r.int(2, 15), b = r.int(2, 15);
      if (a === b) b += 1;
      const ans = R(a, b);
      const who = name(r);
      const q = r.bool() ? 'Write ' + a + ' ÷ ' + b + ' as a fraction.' : who + ' shares ' + a + ' sandwiches equally among ' + b + ' friends. What fraction of a sandwich does each friend get?';
      return N(q, fmt(ans), { mixed: true, s: 'The amount shared goes on top and the number of shares on the bottom: ' + F(a, b) + (ans.d === 1 ? ' = ' + ans.n : '') + '.', w: W(ans, [[fmt(R(b, a)), 'You flipped it. The number being shared goes on top.']]) });
    }),
    tpl('equiv', (r) => {
      const b = r.int(2, 9), a = r.int(1, b - 1), k = r.int(2, 9), D = b * k;
      return N('Fill in the missing top: ' + F(a, b) + ' = ' + F('?', D) + '.', a * k, { s: b + ' × ' + k + ' = ' + D + ', so multiply the top by ' + k + ' as well: ' + a + ' × ' + k + ' = ' + a * k + '.', w: [[a + D - b, 'You added ' + (D - b) + ' to the top. Equivalent fractions come from multiplying both numbers by ' + k + '.']] });
    }),
    tpl('greatest', (r) => {
      const n = r.int(1, 5), ds = r.distinct(4, n + 1, 16).sort((x, y) => x - y);
      const great = r.bool();
      const right = great ? ds[0] : ds[3];
      const wrongs = ds.filter((x) => x !== right).map((x) => [F(n, x), great ? 'A bigger bottom means smaller pieces, so this is not the greatest.' : 'A smaller bottom means bigger pieces, so this is not the least.']);
      return choice(r, 'Which of these fractions is the ' + (great ? 'greatest' : 'least') + '?', F(n, right), wrongs, { s: 'All have ' + n + ' piece' + (n > 1 ? 's' : '') + ', so compare the piece sizes. ' + (great ? 'Fewer cuts make bigger pieces.' : 'More cuts make smaller pieces.') + ' The answer is ' + F(n, right) + '.' });
    }),
    tpl('between', (r) => {
      const qs = [2, 3, 4, 5, 6];
      let q, s, pn, rn, k, cnt, D;
      for (;;) {
        q = r.pick(qs); s = r.pick(qs); pn = r.int(1, q); rn = r.int(1, 2 * s);
        const diff = sub(R(rn, s), R(pn, q));
        if (diff.n <= 0) continue;
        k = r.int(1, 3); const L = lcm(q, s);
        D = L * k; cnt = (D * diff.n) / diff.d - 1;
        if (cnt >= 1 && cnt <= 40) break;
      }
      return N('How many fractions with denominator ' + D + ' are strictly between ' + F(pn, q) + ' and ' + F(rn, s) + '?', cnt, { s: 'With denominator ' + D + ': ' + F(pn, q) + ' = ' + F(pn * (D / q), D) + ' and ' + F(rn, s) + ' = ' + F(rn * (D / s), D) + '. The tops strictly between ' + pn * (D / q) + ' and ' + rn * (D / s) + ' number ' + cnt + '.', w: W(cnt, [[cnt + 1, 'Between means the two ends are not counted.'], [cnt + 2, 'Between means the two ends are not counted.']]) });
    }),
    tpl('pizzas', (r) => {
      const d = r.pick([4, 6, 8, 10, 12]), m = r.int(d + 1, 3 * d);
      const ans = R(m, d), who = name(r);
      return N(who + ' eats ' + m + ' slices of pizza. Each whole pizza has ' + d + ' slices. How many pizzas did ' + who + ' eat? Give a fraction.', fmt(ans), { mixed: true, s: m + ' slices, ' + d + ' per pizza: ' + m + ' ÷ ' + d + ' = ' + fm(ans) + ' pizzas.', w: W(ans, [[fmt(R(d, m)), 'The number of slices goes on top and the slices per pizza go on the bottom.']]) });
    }),
  ],
});
