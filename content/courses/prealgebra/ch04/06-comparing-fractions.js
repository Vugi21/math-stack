import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, add, sub, mul, div, cmp, lcm, fmt, fm, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
// k distinct-valued proper fractions as [n, d, R]
const fracs = (r, k, dlo, dhi) => {
  for (;;) {
    const out = [];
    for (let i = 0; i < k; i++) { const d = r.int(dlo, dhi); out.push([r.int(1, d - 1), d]); }
    const vs = out.map(([n, d]) => R(n, d));
    let ok = true;
    for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) if (eq(vs[i], vs[j])) ok = false;
    if (ok) return out.map(([n, d], i) => [n, d, vs[i]]);
  }
};

export default lesson({
  id: 'pre-4-6-comparing-fractions',
  title: 'Comparing fractions',
  blurb: 'Which is bigger? Common denominators, the missing-piece trick, and finding fractions in between.',
  concepts: ['fractions', 'comparing-fractions', 'common-denominator'],

  tryFirst: [
    mc('t1', 'Which is larger, {7/8} or {8/9}? Think about what each one is missing to become a whole.', [F(7, 8), F(8, 9), 'They are equal'], 1, {
      h: ['{7/8} is one eighth short of 1. {8/9} is one ninth short of 1. Which shortfall is smaller?'],
      s: 'A ninth is smaller than an eighth, so {8/9} is closer to 1. It is the larger one.',
      w: [[0, 'Both are one piece short of a whole, but eighths are bigger pieces than ninths. So {7/8} is further from 1.'], [2, 'The missing pieces are {1/8} and {1/9}. Those are not the same size.']],
    }),
    num('t2', 'Ava ate {3/8} of a large pizza. Ben ate {2/5} of an identical pizza. Cut both pizzas into 40 equal slices. How many slices did Ben eat?', 16, {
      h: ['{2/5} = ?/40. What do you multiply 5 by to get 40?'],
      s: '5 × 8 = 40, so Ben ate 2 × 8 = 16 slices. (Ava ate 3 × 5 = 15 slices. Ben ate more.)',
      w: [['15', 'That is Ava: {3/8} = {15/40}. Ben ate {2/5}.'], ['10', 'Multiply the top by the same number as the bottom: 5 × 8 = 40, so 2 × 8.']],
    }),
  ],

  learn: [
    p(`To compare two fractions we need to know which sits farther right on the number line. That is easy when the pieces are the same size, and hard when they are not. So the main idea is to <b>make the pieces the same size</b>.`),
    def('common denominator', `A number that is the bottom of both fractions after they are rewritten. It must be a common multiple of the two original bottoms. Once the bottoms match, the pieces are the same size and the tops can be compared directly.`),
    def('least common denominator (LCD)', `The smallest common denominator. It is the least common multiple (LCM) of the two bottoms, which you found in Chapter 3. For {1/4} and {1/6} the LCD is 12.`),
    widget('commonDenominator', { a: 3, b: 8, c: 2, d: 5 }),
    rule(`<b>Common denominator.</b> Rewrite both fractions with the same bottom number (a common multiple of both bottoms). Then the bigger top is the bigger fraction.`),
    ex('Comparing {5/7} and {8/11}', [`The bottoms are 7 and 11. Use 7 × 11 = 77.`, `{5/7} = {55/77} (multiply top and bottom by 11).`, `{8/11} = {56/77} (multiply top and bottom by 7).`, `56 is more than 55, so {8/11} is slightly bigger.`]),
    rule(`<b>Shortcuts.</b> Same bottom: compare the tops. Same top: the <i>smaller</i> bottom is bigger, because the pieces are bigger. Also compare each fraction with {1/2}: if the top is more than half the bottom, the fraction is more than {1/2}.`),
    formula('Cross-multiplying', `{a/b} &lt; {c/d} exactly when a × d &lt; c × b`, `For positive b and d. The products a × d and c × b are the tops after rewriting both fractions with the common bottom b × d. The side with the bigger product is the bigger fraction.`),
    tbl(['Compare', 'Cross products', 'Result'], [['{5/7} and {8/11}', '5 × 11 = 55 and 8 × 7 = 56', '{8/11} is bigger'], ['{3/4} and {5/8}', '3 × 8 = 24 and 5 × 4 = 20', '{3/4} is bigger']], 'Cross-multiplying'),
    p(`<b>The missing-piece trick.</b> Fractions close to 1 are best compared by what they are <i>missing</i>. {9/10} is missing {1/10}. {11/12} is missing {1/12}. The smaller the missing piece, the bigger the fraction, so {11/12} is bigger.`),
    key(`Comparing fractions is <b>always about piece size and piece count</b>. Same size pieces: more pieces wins. Same number of pieces: bigger pieces win. Different in both: change the size (common denominator) or measure each against a benchmark such as {1/2} or 1.`),
    ex('Ordering three fractions', [`Order {3/4}, {5/8} and {7/10} from least to greatest.`, `The bottoms 4, 8 and 10 have common multiple 40.`, `{3/4} = {30/40}, {5/8} = {25/40}, {7/10} = {28/40}.`, `In order: 25, 28, 30, so {5/8} &lt; {7/10} &lt; {3/4}.`]),
    ex('Counting fractions in between', [`How many fractions with denominator 20 are strictly between {1/4} and {3/4}?`, `Rewrite the ends with bottom 20: {1/4} = {5/20} and {3/4} = {15/20}.`, `The tops strictly between 5 and 15 are 6, 7, 8, 9, 10, 11, 12, 13, 14.`, `That is 9 fractions, from {6/20} to {14/20}. (The ends 5 and 15 are not counted.)`]),
    ex('A threshold with a missing piece', [`What is the smallest whole number n for which {n/(n + 1)} is greater than {29/30}?`, `{n/(n + 1)} is missing {1/(n + 1)} from 1, and {29/30} is missing {1/30}.`, `To be bigger, the fraction must miss less: {1/(n + 1)} &lt; {1/30}, so n + 1 must be more than 30.`, `The smallest n is 30. Check: {30/31} = 0.9677... which is above {29/30} = 0.9666... For n = 29 we get {29/30}, which is equal, not greater.`]),
    tip(`When the bottoms are friendly, use the LCM and keep the numbers small. When they are awkward (like 7 and 11), cross-multiplying is quicker. For fractions near 1 use the missing piece. For fractions near {1/2}, ask whether the top is above or below half of the bottom: {5/9} is above {1/2} because 5 is more than 4.5.`),
    warn(`<b>Watch out.</b> Do not compare tops and bottoms separately. {3/4} versus {6/11}: the top 6 is bigger, but the bottom 11 is bigger as well, so you cannot tell. You also cannot compare fractions by the <i>difference</i> between top and bottom: {5/6} and {7/8} both differ by 1, yet they are not equal.`),
    mcq(`Ben says: "{5/6} and {7/8} are equal because in each one the top is 1 less than the bottom." What is wrong?`, [`Nothing, he is right.`, `Each is missing one piece, but the pieces have different sizes. {5/6} is missing {1/6}, which is bigger than {1/8}, so {7/8} is the larger fraction.`, `They are both 1.`], 1, `{5/6} = {20/24} and {7/8} = {21/24}. Close, but not equal.`, 'Spot the mistake'),
    recap([['common denominator', 'a shared bottom, a common multiple of both bottoms'], ['least common denominator', 'the LCM of the bottoms'], ['benchmark', 'an easy fraction like {1/2} or 1 used for a quick comparison'], ['missing piece', 'what a fraction lacks to reach 1']], [['Cross-multiplying', '{a/b} &lt; {c/d} exactly when a × d &lt; c × b'], ['Same top', 'smaller bottom means bigger fraction']]),
  ],

  practice: [
    mc('p1', 'Which fraction is the greatest?', [F(3, 7), F(4, 9), F(5, 12), F(2, 5)], 1, {
      h: ['Compare each with {1/2} first, then compare the ones that remain.', 'Or use common denominator 1260.'],
      s: 'As decimals: {3/7} ≈ 0.429, {4/9} ≈ 0.444, {5/12} ≈ 0.417, {2/5} = 0.4. The greatest is {4/9}.',
      w: [[0, '{3/7} = 0.43 and {4/9} = 0.44. Close, but {4/9} is slightly bigger. Rewrite with a common denominator.'], [3, '{2/5} is the smallest of these. {2/5} = {18/45} and {4/9} = {20/45}.']],
    }),
    num('p2', 'Which of {5/6}, {7/9} and {11/12} is the least? Type that fraction.', '7/9', {
      h: ['Use common denominator 36.'],
      s: '{5/6} = {30/36}, {7/9} = {28/36}, {11/12} = {33/36}. The least is {28/36} = {7/9}.',
      w: [['5/6', '{5/6} = {30/36} but {7/9} = {28/36} is less.'], ['11/12', '{11/12} is the closest to 1. It is the greatest.']],
    }),
    num('p3', 'How many fractions with denominator 15 are strictly between {1/3} and {2/3}?', 4, {
      h: ['Write {1/3} and {2/3} with denominator 15.'],
      s: '{1/3} = {5/15} and {2/3} = {10/15}. The tops strictly between 5 and 10 are 6, 7, 8, 9: four fractions.',
      w: [['6', 'That counts 5 to 10. The ends are {1/3} and {2/3} themselves, so skip them.'], ['5', 'Between 5 and 10 you list 6, 7, 8, 9. Check whether you counted an endpoint.']],
    }),
    num('p4', 'What is the greatest whole number n for which {n/7} is less than {5/8}?', 4, {
      h: ['Rewrite both with denominator 56. Then n × 8 must be less than 5 × 7.'],
      s: '{n/7} = {8n/56} and {5/8} = {35/56}. We need 8n < 35, so n ≤ 4 (since 8 × 4 = 32, 8 × 5 = 40).',
      w: [['5', '{5/7} is about 0.71, which is bigger than {5/8} = 0.625.']],
    }),
    mc('p5', 'Which fraction is closest to {1/2}?', [F(4, 9), F(5, 12), F(7, 15), F(3, 7)], 2, {
      h: ['Find how far each one is below {1/2}. Half of 9 is 4 and a half, so {4/9} is half a piece short, and a piece is {1/9}.'],
      s: 'Each fraction is below {1/2} by (half a piece): {4/9} is {1/18} short, {5/12} is {1/12} short, {7/15} is {1/30} short and {3/7} is {1/14} short. The smallest shortfall is {1/30}, so {7/15} is closest.',
      w: [[0, '{4/9} is {1/18} below {1/2}. Check {7/15}: it is only {1/30} below.'], [1, '{5/12} is {1/12} below {1/2}, the largest gap here.']],
    }),
    num('p6', 'The fractions {2/3}, {3/5} and {5/8} are written in order of size (not necessarily this order). Which is in the middle?', '5/8', {
      h: ['Use common denominator 120, or compare them as decimals.'],
      s: '{2/3} = {80/120}, {3/5} = {72/120}, {5/8} = {75/120}. The middle value is {75/120} = {5/8}.',
      w: [['3/5', '{3/5} = {72/120} is the smallest.'], ['2/3', '{2/3} = {80/120} is the greatest.']],
    }),
    num('p7', 'What is the smallest whole number n for which {n/(n + 1)} is greater than {19/20}?', 20, {
      h: ['{n/(n + 1)} is missing one piece, {1/(n + 1)}. How small must that missing piece be?'],
      s: '{19/20} is missing {1/20}. We need the missing piece {1/(n + 1)} to be smaller than {1/20}, so n + 1 > 20, so n ≥ 20. Check: {20/21} > {19/20}.',
      w: [['19', 'n = 19 gives {19/20} exactly, which is equal, not greater.'], ['21', 'n = 20 already works: {20/21} is missing only {1/21}, smaller than {1/20}.']],
    }),
  ],

  challenge: [
    chain('Race to one', 'Fractions of the form {(m − 1)/m} get closer and closer to 1 as m grows.', [
      num('c1a', 'How big is the piece missing from {7/8} to make a whole?', '1/8', { h: ['{7/8} + ? = {8/8}'], s: 'The missing piece is {1/8}.' }),
      mc('c1b', 'Which is larger, {7/8} or {8/9}?', [F(7, 8), F(8, 9), 'They are equal'], 1, { h: ['Compare the missing pieces {1/8} and {1/9}.'], s: '{1/9} is smaller than {1/8}, so {8/9} is closer to 1 and is larger.' }),
      num('c1c', 'Use the same idea for {11/12} and {12/13}. What is the missing piece of the larger one?', '1/13', { h: ['Which fraction is missing the smaller piece?'], s: '{11/12} is missing {1/12} and {12/13} is missing {1/13}. {1/13} is smaller, so {12/13} is larger, and its missing piece is {1/13}.', w: [['1/12', 'That is the missing piece of {11/12}, the smaller fraction.']] }),
    ], 'The idea: when two fractions are each one piece short, the smaller piece wins. Subtracting from 1 turns "which is bigger?" into "which gap is smaller?".'),
    chain('Room in between', 'Is there always room for another fraction between two fractions?', [
      num('c2a', 'Write {2/3} with denominator 12. What is the top?', 8, { h: ['3 × 4 = 12'], s: '{2/3} = {8/12}.' }),
      num('c2b', 'Write {1/2} with denominator 12 as well. How many fractions with denominator 12 lie strictly between {1/2} and {2/3}?', 1, { h: ['{1/2} = {6/12}. Which tops are strictly between 6 and 8?'], s: '{1/2} = {6/12} and {2/3} = {8/12}. Only {7/12} is between.' }),
      num('c2c', 'How many fractions with denominator 24 lie strictly between {1/2} and {2/3}?', 3, { h: ['Now {1/2} = {12/24} and {2/3} = {16/24}.'], s: 'The tops strictly between 12 and 16 are 13, 14, 15: three fractions.', w: [['4', 'Between 12 and 16 do not count the ends: 13, 14, 15.']] }),
    ], 'The idea: cut the pieces smaller and there is always more room. Between any two different fractions there is another, and then another, forever.'),
    mc('c3', 'Find the error. Chloe compares {3/8} and {3/5}. She says: "8 is bigger than 5, so {3/8} is bigger." What is wrong?', ['Nothing, she is right.', 'The bottom number tells how many equal parts the whole is cut into. Eighths are smaller than fifths, so 3 eighths is less than 3 fifths. {3/5} is bigger.', 'The fractions are equal because both have the top 3.', 'You cannot compare fractions without decimals.'], 1, {
      s: 'Same top: the fraction with the smaller bottom has bigger pieces. {3/5} = 0.6 and {3/8} = 0.375.',
      w: [[0, 'Picture the pieces: with 8 parts each is smaller than with 5.'], [2, 'Same top, but the pieces differ in size, so the amounts differ.']],
    }),
  ],

  quiz: [
    tpl('cmp2', (r) => {
      const [x, y] = fracs(r, 2, 3, 15);
      const bigger = cmp(x[2], y[2]) > 0 ? x : y, smaller = bigger === x ? y : x;
      return choice(r, 'Which is greater, ' + F(x[0], x[1]) + ' or ' + F(y[0], y[1]) + '?', F(bigger[0], bigger[1]), [[F(smaller[0], smaller[1]), 'Rewrite with a common denominator (' + lcm(x[1], y[1]) + '): ' + F(x[0] * (lcm(x[1], y[1]) / x[1]), lcm(x[1], y[1])) + ' and ' + F(y[0] * (lcm(x[1], y[1]) / y[1]), lcm(x[1], y[1])) + '.'], ['They are equal', 'They are not equal: the fractions have different values.']], { s: 'With the denominator ' + lcm(x[1], y[1]) + ': ' + F(x[0] * (lcm(x[1], y[1]) / x[1]), lcm(x[1], y[1])) + ' and ' + F(y[0] * (lcm(x[1], y[1]) / y[1]), lcm(x[1], y[1])) + '. The greater is ' + F(bigger[0], bigger[1]) + '.' });
    }),
    tpl('middle', (r) => {
      const f = fracs(r, 3, 3, 14).slice().sort((a, b) => cmp(a[2], b[2]));
      const mid = f[1];
      const shuffled = r.shuffle(f);
      return choice(r, 'Put ' + shuffled.map((x) => F(x[0], x[1])).join(', ') + ' in order from least to greatest. Which one is in the middle?', F(mid[0], mid[1]), [f[0], f[2]].map((x, i) => [F(x[0], x[1]), i === 0 ? 'This is the least of the three.' : 'This is the greatest of the three.']), { s: 'Order: ' + f.map((x) => F(x[0], x[1])).join(' < ') + '. The middle one is ' + F(mid[0], mid[1]) + '.' });
    }),
    tpl('extreme', (r) => {
      const f = fracs(r, 4, 3, 13).slice().sort((a, b) => cmp(a[2], b[2]));
      const least = r.bool();
      const right = least ? f[0] : f[3];
      const shuffled = r.shuffle(f);
      return choice(r, 'Which of ' + shuffled.map((x) => F(x[0], x[1])).join(', ') + ' is the ' + (least ? 'least' : 'greatest') + '?', F(right[0], right[1]), f.filter((x) => x !== right).map((x) => [F(x[0], x[1]), 'Compare again using a common denominator: this is not the ' + (least ? 'least' : 'greatest') + '.']), { s: 'Sorted: ' + f.map((x) => F(x[0], x[1])).join(' < ') + '. The ' + (least ? 'least' : 'greatest') + ' is ' + F(right[0], right[1]) + '.' });
    }),
    tpl('closehalf', (r) => {
      for (;;) {
        const f = fracs(r, 4, 5, 15);
        const dist = f.map((x) => Math.abs(x[2].n / x[2].d - 0.5));
        const m = Math.min(...dist), k = dist.indexOf(m);
        if (dist.filter((d) => Math.abs(d - m) < 1e-9).length > 1) continue;
        const right = f[k];
        return choice(r, 'Which of these fractions is closest to ' + F(1, 2) + '?', F(right[0], right[1]), f.filter((x) => x !== right).map((x) => [F(x[0], x[1]), 'This one is farther from {1/2}. Compare how far each is from half.']), { s: 'Distance from {1/2}: ' + f.map((x, i) => F(x[0], x[1]) + ' is ' + fm(R(Math.round(dist[i] * x[1] * 2), x[1] * 2)) + ' away').join('; ') + '. Closest: ' + F(right[0], right[1]) + '.' });
      }
    }),
    tpl('maxn', (r) => {
      const b = r.int(3, 12), a = r.int(1, b - 1), d = r.int(3, 12);
      const ans = Math.ceil((a * d) / b) - 1;
      if (ans < 1) return N('What is the greatest whole number n for which ' + F('n', 4) + ' is less than ' + F(7, 8) + '?', 3, { s: '{n/4} < {7/8} means n < 3.5, so n = 3.' });
      return N('What is the greatest whole number n for which ' + F('n', d) + ' is less than ' + F(a, b) + '?', ans, { s: F('n', d) + ' < ' + F(a, b) + ' means n < ' + d + ' × ' + a + ' ÷ ' + b + ' = ' + fmt(R(a * d, b)) + '. The greatest whole n is ' + ans + '.', w: W(ans, [[ans + 1, 'Check ' + (ans + 1) + ': ' + F(ans + 1, d) + ' is not less than ' + F(a, b) + '.']]) });
    }),
    tpl('fillgap', (r) => {
      const m = r.int(5, 80);
      return N('What is the smallest whole number n for which ' + F('n', '(n + 1)') + ' is greater than ' + F(m - 1, m) + '?', m, { s: F(m - 1, m) + ' is missing ' + F(1, m) + '. ' + F('n', 'n + 1') + ' is missing ' + F(1, 'n + 1') + ', which must be smaller, so n + 1 > ' + m + ', so n = ' + m + '.', w: W(m, [[m - 1, 'n = ' + (m - 1) + ' gives ' + F(m - 1, m) + ' exactly. That is equal, not greater.'], [m + 1, 'n = ' + m + ' already works, so ' + (m + 1) + ' is not the smallest.']]) });
    }),
    tpl('counthalf', (r) => {
      const f = fracs(r, 5, 3, 12);
      const cnt = f.filter((x) => cmp(x[2], R(1, 2)) > 0).length;
      return N('How many of these fractions are greater than ' + F(1, 2) + '?  ' + f.map((x) => F(x[0], x[1])).join(', '), cnt, { s: 'A fraction is more than {1/2} when its top is more than half its bottom. ' + f.map((x) => F(x[0], x[1]) + (cmp(x[2], R(1, 2)) > 0 ? ' (yes)' : ' (no)')).join(', ') + '. That is ' + cnt + '.' });
    }),
    tpl('halfway', (r) => {
      const D = r.int(3, 12); let a = r.int(1, D - 2), c = r.int(a + 1, D - 1);
      const ans = div(add(R(a, D), R(c, D)), R(2));
      return N('What fraction is exactly halfway between ' + F(a, D) + ' and ' + F(c, D) + '?', fmt(ans), { s: 'Add the tops: ' + (a + c) + ', over ' + D + ', and halve it: ' + F(a + c, D) + ' ÷ 2 = ' + fm(ans) + '. (Or write them with denominator ' + 2 * D + ': ' + F(2 * a, 2 * D) + ' and ' + F(2 * c, 2 * D) + ', and take the middle top, ' + (a + c) + '.)', w: W(ans, [[fmt(R(a + c, D)), 'That is the sum of the tops over the bottom. The halfway point is half of that.']]) });
    }),
  ],
});
