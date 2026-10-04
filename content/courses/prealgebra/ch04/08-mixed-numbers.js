import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, add, sub, mul, div, cmp, fmt, fm, fmMixed, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const MX = (w, n, d) => w + ' ' + F(n, d);
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
// random mixed number [w, n, d, R]
const g2 = (a, b) => (b ? g2(b, a % b) : a);
const mixed = (r, wlo, whi, dlo = 2, dhi = 6) => { let d, n; do { d = r.int(dlo, dhi); n = r.int(1, d - 1); } while (g2(n, d) > 1); const w = r.int(wlo, whi); return [w, n, d, R(w * d + n, d)]; };

export default lesson({
  id: 'pre-4-8-mixed-numbers',
  title: 'Mixed numbers',
  blurb: 'Wholes and parts together: converting, adding, subtracting, multiplying and dividing mixed numbers.',
  concepts: ['fractions', 'mixed-numbers', 'improper-fractions'],

  tryFirst: [
    num('t1', 'A bag holds quarter-pound pieces of fudge. You have 2 and {3/4} pounds of fudge in all. How many quarter-pound pieces is that?', 11, {
      h: ['How many quarter-pound pieces make one pound?'],
      s: '2 pounds is 2 × 4 = 8 pieces. Add the 3 pieces from {3/4}: 8 + 3 = 11.',
      w: [['8', 'That counts only the 2 whole pounds. Add the {3/4} pound as well.'], ['5', 'You added 2 + 3. Each whole pound is 4 quarter-pieces.']],
    }),
    num('t2', 'A hiker walks 3 and {1/4} hours before lunch and 2 and {3/4} hours after lunch. How many hours does she walk in all?', 6, {
      h: ['Add the whole numbers, then add the fractions. What do {1/4} and {3/4} make together?'],
      s: '3 + 2 = 5 hours, and {1/4} + {3/4} = 1 hour more. Total 6 hours.',
      w: [['5', 'You forgot that {1/4} + {3/4} is a whole hour.'], ['5 4/8', 'The fractions have the same size pieces, so the bottom stays 4: {1/4} + {3/4} = {4/4}.']],
    }),
  ],

  learn: [
    p(`Fractions greater than 1 can be written in two ways. A <b>mixed number</b> shows the wholes and the leftover part separately. An improper fraction shows everything as pieces of one size. Both name the same point on the number line, and you need to move easily between them.`),
    def('mixed number', `A whole number together with a proper fraction, like 2 {3/4}. It means 2 <i>plus</i> {3/4}: two whole units and three more quarter-pieces. There is no hidden multiplication, even though no plus sign is written.`),
    def('improper fraction', `A fraction whose top is at least as big as its bottom, like {11/4}. It says the same thing as 2 {3/4} with only pieces: 11 quarter-pieces. Improper fractions are the best form for multiplying and dividing.`),
    widget('fractionExplorer', { n: 11, d: 4 }),
    formula('Mixed to improper', `w {n/d} = {(w × d + n)/d}`, `Turn each whole into d pieces (w × d of them), then add the n extra pieces. Example: 3 {2/5}: 3 × 5 = 15 fifths, plus 2 more is {17/5}.`),
    rule(`<b>Improper to mixed.</b> Divide the top by the bottom. The quotient is the number of wholes and the remainder is what is left over as pieces. {47/6}: 47 ÷ 6 = 7 remainder 5, so 7 {5/6}.`),
    tbl(['Mixed', 'Improper', 'Check'], [['1 {1/2}', '{3/2}', '1 whole = 2 halves, plus 1'], ['2 {3/4}', '{11/4}', '2 × 4 = 8, plus 3'], ['5 {2/3}', '{17/3}', '5 × 3 = 15, plus 2']], 'Converting'),
    ex('Adding mixed numbers', [`Find 3 {2/3} + 4 {3/4}.`, `Add the whole numbers: 3 + 4 = 7.`, `Add the fractions: {2/3} + {3/4} = {8/12} + {9/12} = {17/12} = 1 {5/12}.`, `Combine: 7 + 1 {5/12} = 8 {5/12}.`]),
    ex('Subtracting when you must regroup', [`Find 5 {1/4} − 2 {2/3}.`, `With twelfths: 5 {3/12} − 2 {8/12}. We cannot take 8 twelfths from 3 twelfths.`, `Regroup: take one whole from the 5 and cut it into twelfths. 5 {3/12} becomes 4 {15/12}.`, `Now subtract: 4 − 2 = 2 and {15/12} − {8/12} = {7/12}. The answer is 2 {7/12}.`]),
    key(`<b>Add and subtract mixed numbers by parts (wholes, then fractions). Multiply and divide them as improper fractions.</b> Adding is just counting, so wholes and parts can be kept apart. Multiplying mixes every piece with every piece, so the numbers must be single fractions first.`),
    rule(`<b>Multiplying and dividing.</b> Always convert to improper fractions first, then multiply (or flip and multiply). 2 {1/3} × 1 {1/2} = {7/3} × {3/2} = {7/2} = 3 {1/2}.`),
    ex('Dividing mixed numbers', [`Find 4 {1/2} ÷ 1 {1/5}.`, `Convert: 4 {1/2} = {9/2} and 1 {1/5} = {6/5}.`, `Flip and multiply: {9/2} × {5/6}. Cancel 3 into 9 (giving 3) and 3 into 6 (giving 2): {3/2} × {5/2} = {15/4}.`, `{15/4} = 3 {3/4}. Check: 3 {3/4} × 1 {1/5} = {15/4} × {6/5} = {90/20} = {9/2} = 4 {1/2}. ✓`]),
    ex('A leftover problem', [`A board is 9 {1/3} feet long. Four pieces, each 2 {1/4} feet, are cut from it. How long is what is left?`, `Four pieces: 4 × 2 {1/4} = 4 × {9/4} = 9 feet.`, `Leftover: 9 {1/3} − 9 = {1/3} foot.`, `Check: 9 + {1/3} = 9 {1/3}. ✓ (Multiplying as an improper fraction made the 4 cancel neatly.)`]),
    tip(`<b>Use the number line to check.</b> Between which two whole numbers does your answer sit? 4 {1/2} ÷ 1 {1/5} is about 4.5 ÷ 1.2, a bit less than 4, so 3 {3/4} is sensible. Also, if the fraction part of a subtraction is too small, regroup with a whole turned into <i>the same denominator</i> pieces: one whole is {d/d}.`),
    warn(`<b>Watch out.</b> Do not multiply wholes and fractions separately. 2 {1/3} × 3 {1/2} is not 6 {1/6}. The correct work is {7/3} × {7/2} = {49/6} = 8 {1/6}. Splitting leaves out the cross terms: 2 × {1/2} and {1/3} × 3. Also, 3 {2/5} is not 3 × {2/5}: a mixed number is a sum.`),
    mcq(`Quinn computes 5 {1/4} − 2 {1/2} as: "5 − 2 = 3, and {1/4} − {1/2} is {1/4} (the other way round), so 3 {1/4}." What went wrong?`, [`Nothing.`, `You cannot take {1/2} from {1/4}, so you cannot just flip the subtraction. You must regroup: 4 {5/4} − 2 {2/4} = 2 {3/4}.`, `The answer should be negative.`], 1, `Check by size: 5 {1/4} minus about 2 and a half should be about 2 and a half, not 3 and a quarter.`, 'Spot the mistake'),
    recap([['mixed number', 'whole number plus a proper fraction'], ['improper fraction', 'top at least as big as the bottom'], ['regrouping', 'turning one whole into d/d to subtract']], [['Mixed to improper', 'w {n/d} = {(w × d + n)/d}'], ['Improper to mixed', 'divide: quotient = wholes, remainder = top of the fraction']]),
  ],

  practice: [
    num('p1', 'Write {29/8} as a mixed number.', '29/8', {
      mixed: true,
      h: ['Divide 29 by 8.'],
      s: '29 ÷ 8 = 3 remainder 5, so 3 {5/8}.',
      w: [['3 29/8', 'The remainder goes on top, not the original top.']],
    }),
    num('p2', 'How many fifths are in 4 {2/5}?', 22, {
      h: ['Each whole is 5 fifths.'],
      s: '4 × 5 = 20 fifths, plus 2 more is 22 fifths.',
      w: [['20', 'You forgot the extra {2/5}.'], ['6', 'You added 4 + 2. Each whole is 5 fifths.']],
    }),
    num('p3', 'Find 6 {1/3} − 2 {5/6}.', '7/2', {
      mixed: true,
      h: ['{1/3} = {2/6}. You cannot take 5 sixths from 2 sixths, so regroup.'],
      s: '6 {2/6} = 5 {8/6}. 5 {8/6} − 2 {5/6} = 3 {3/6} = 3 {1/2}.',
      w: [['4 1/2', 'You subtracted {2/6} from {5/6} instead of regrouping. Take one whole from the 6.']],
    }),
    num('p4', 'Find 2 {1/2} × 1 {3/5}.', 4, {
      h: ['Convert to improper fractions, then multiply.'],
      s: '{5/2} × {8/5} = {40/10} = 4.',
      w: [['2 3/10', 'You multiplied wholes (2 × 1) and fractions ({1/2} × {3/5}) separately. Convert to improper fractions instead.']],
    }),
    num('p5', 'Find 3 {3/4} ÷ 1 {1/2}.', '5/2', {
      mixed: true,
      h: ['Convert: {15/4} ÷ {3/2}. Then flip and multiply.'],
      s: '{15/4} × {2/3} = {30/12} = {5/2} = 2 {1/2}.',
      w: [['9/2', 'You divided the wholes (3 ÷ 1) and the fractions ({3/4} ÷ {1/2}) separately and added. Convert to improper fractions first.'], ['45/8', 'You multiplied by {3/2} instead of flipping it to {2/3}.']],
    }),
    num('p6', 'A board is 8 {1/4} feet long. Three pieces, each 2 {2/3} feet, are cut from it. How many feet are left over?', '1/4', {
      h: ['Three pieces of 2 {2/3}: 2 × 3 = 6 and {2/3} × 3 = 2.'],
      s: '3 × 2 {2/3} = 3 × {8/3} = 8 feet. Left over: 8 {1/4} − 8 = {1/4} foot.',
      w: [['8', 'That is how much was cut off. The question asks for the leftover.']],
    }),
    num('p7', 'A mixed number has fractional part {3/5}. When it is multiplied by 5, the result is 18. What is the number? (Give it as a mixed number.)', '18/5', {
      mixed: true,
      h: ['Work backwards: undo the multiplication by 5.'],
      s: 'The number is 18 ÷ 5 = {18/5} = 3 {3/5}. Check: the fractional part is {3/5} ✓, and 5 × {18/5} = 18 ✓.',
      w: [['90', 'You multiplied 18 by 5. To undo "times 5", divide by 5.']],
    }),
  ],

  challenge: [
    chain('The ribbon', 'A roll has 12 {1/2} metres of ribbon. You cut 5 pieces, each 1 {3/4} metres long.', [
      num('c1a', 'How many metres of ribbon do the 5 pieces use?', '35/4', { mixed: true, h: ['5 × {7/4}.'], s: '5 × 1 {3/4} = 5 × {7/4} = {35/4} = 8 {3/4} metres.' }),
      num('c1b', 'How many metres are left on the roll?', '15/4', { mixed: true, h: ['12 {1/2} − 8 {3/4}. Regroup.'], s: '12 {2/4} − 8 {3/4} = 11 {6/4} − 8 {3/4} = 3 {3/4} metres.' }),
      num('c1c', 'How many more full 1 {3/4}-metre pieces can be cut from what is left?', 2, { h: ['Divide 3 {3/4} by 1 {3/4}, then round down.'], s: '{15/4} ÷ {7/4} = {15/7} ≈ 2.14, so 2 whole pieces fit.', w: [['15/7', 'That is the exact quotient. Only whole pieces count, so give the number of whole pieces.']] }),
    ], 'The idea: work with improper fractions inside the calculation, and convert back to mixed numbers only for the answer.'),
    chain('Portions of 3/4', 'You have 3 {1/2} cups of rice. A portion is {3/4} cup.', [
      num('c2a', 'How many halves are in 3 {1/2} cups?', 7, { h: ['3 wholes is 6 halves.'], s: '3 × 2 = 6 halves, plus 1 more is 7.' }),
      num('c2b', 'How many portions is 3 {1/2} ÷ {3/4}? Give a mixed number.', '14/3', { mixed: true, h: ['{7/2} × {4/3}.'], s: '{7/2} × {4/3} = {28/6} = {14/3} = 4 {2/3}.' }),
      num('c2c', 'After 4 whole portions are served, what fraction of one more portion is left?', '2/3', { h: ['The leftover is the {2/3} from your last answer. Check: 4 portions use 3 cups, leaving {1/2} cup. How big is that compared with a {3/4}-cup portion?'], s: '4 portions use 3 cups, so {1/2} cup is left. {1/2} ÷ {3/4} = {2/3} of a portion.', w: [['1/2', 'That is the amount in cups. The question asks what fraction of one <i>portion</i> that is.']] }),
    ], 'The idea: a quotient like 4 {2/3} says "4 whole portions and {2/3} of another". The fraction part is measured in portions, not in cups.'),
    mc('c3', 'Find the error. Farid adds 3 {2/3} + 4 {2/3} like this: "3 + 4 = 7, {2/3} + {2/3} = {4/6}, so the answer is 7 {4/6}." What is wrong?', ['Nothing, 7 {4/6} is correct.', 'When adding fractions with the same bottom, the bottom stays 3. {2/3} + {2/3} = {4/3} = 1 {1/3}, so the answer is 8 {1/3}.', 'He should multiply the wholes: 12.', 'The answer should be 7 {2/3}.'], 1, {
      s: 'Same-size pieces: the bottom does not change. {4/3} is more than a whole, so it adds one to the 7: 8 {1/3}.',
      w: [[0, '7 {4/6} is just 7 {2/3}. But 3 {2/3} + 4 {2/3} is more than 3 + 4 + 1 = 8, because the two fractions together make more than a whole.'], [3, 'The fractions add: {2/3} + {2/3} is more than {2/3}.']],
    }),
  ],

  quiz: [
    tpl('tomixed', (r) => {
      let d = r.int(2, 9), n; do { n = r.int(d + 1, 9 * d + 8); } while (n % d === 0);
      const ans = R(n, d);
      return N('Write ' + F(n, d) + ' as a mixed number.', fmt(ans), { mixed: true, s: n + ' ÷ ' + d + ' = ' + Math.floor(n / d) + ' remainder ' + (n % d) + ', so ' + fmMixed(ans) + '.' });
    }),
    tpl('toimp', (r) => {
      const [w, n, d] = mixed(r, 1, 9, 2, 9);
      return N('How many pieces of size ' + F(1, d) + ' are in ' + MX(w, n, d) + '?', w * d + n, { s: w + ' × ' + d + ' = ' + w * d + ' pieces in the wholes, plus ' + n + ' more: ' + (w * d + n) + '.', w: W(w * d + n, [[w * d, 'Do not forget the extra ' + F(n, d) + '.'], [w + n, 'Each whole holds ' + d + ' pieces, so multiply the wholes by ' + d + '.']]) });
    }),
    tpl('addm', (r) => {
      const a = mixed(r, 1, 9), b = mixed(r, 1, 9), ans = add(a[3], b[3]);
      return N('Find ' + MX(a[0], a[1], a[2]) + ' + ' + MX(b[0], b[1], b[2]) + '.', fmt(ans), { mixed: true, s: 'Wholes: ' + (a[0] + b[0]) + '. Fractions: ' + F(a[1], a[2]) + ' + ' + F(b[1], b[2]) + ' = ' + fm(sub(ans, R(a[0] + b[0]))) + '. Total ' + fmMixed(ans) + '.', w: W(ans, [[fmt(R((a[0] + b[0]) * 1)), 'Do not forget to add the fractions.']]) });
    }),
    tpl('subm', (r) => {
      let a = mixed(r, 3, 12), b = mixed(r, 1, 2);
      if (cmp(a[3], b[3]) < 0) [a, b] = [b, a];
      const ans = sub(a[3], b[3]);
      const flip = add(R(a[0] - b[0]), R(Math.abs(a[1] * b[2] - b[1] * a[2]), a[2] * b[2]));
      return N('Find ' + MX(a[0], a[1], a[2]) + ' − ' + MX(b[0], b[1], b[2]) + '.', fmt(ans), { mixed: true, s: 'Convert to improper fractions or regroup: ' + fm(a[3]) + ' − ' + fm(b[3]) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[fmt(flip), 'If the fraction you subtract is bigger, you cannot just flip the order. Regroup one whole, or use improper fractions.']]) });
    }),
    tpl('mulm', (r) => {
      const a = mixed(r, 1, 4, 2, 5), b = mixed(r, 1, 4, 2, 5), ans = mul(a[3], b[3]);
      return N('Find ' + MX(a[0], a[1], a[2]) + ' × ' + MX(b[0], b[1], b[2]) + '.', fmt(ans), { mixed: true, s: 'Improper fractions: ' + fm(a[3]) + ' × ' + fm(b[3]) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[fmt(add(R(a[0] * b[0]), mul(R(a[1], a[2]), R(b[1], b[2])))), 'Wholes and fractions cannot be multiplied separately. Convert to improper fractions.']]) });
    }),
    tpl('divm', (r) => {
      const a = mixed(r, 1, 6, 2, 5), b = mixed(r, 1, 3, 2, 5), ans = div(a[3], b[3]);
      return N('Find ' + MX(a[0], a[1], a[2]) + ' ÷ ' + MX(b[0], b[1], b[2]) + '.', fmt(ans), { mixed: true, s: 'Improper fractions: ' + fm(a[3]) + ' ÷ ' + fm(b[3]) + ' = ' + fm(a[3]) + ' × ' + fm(R(b[3].d, b[3].n)) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[fmt(mul(a[3], b[3])), 'To divide, flip the second fraction and multiply.']]) });
    }),
    tpl('pieces', (r) => {
      for (;;) {
        const L = mixed(r, 6, 20), P = mixed(r, 1, 3);
        const q = div(L[3], P[3]);
        const full = Math.floor(q.n / q.d);
        if (full < 2) continue;
        const who = name(r);
        return N(who + ' has a rope ' + MX(L[0], L[1], L[2]) + ' metres long. How many whole pieces of length ' + MX(P[0], P[1], P[2]) + ' metres can ' + who + ' cut from it?', full, { s: fm(L[3]) + ' ÷ ' + fm(P[3]) + ' = ' + fmMixed(q) + ', so ' + full + ' whole pieces.', w: W(full, [[full + 1, 'Only whole pieces count. Round down.']]) });
      }
    }),
    tpl('leftover', (r) => {
      for (;;) {
        const P = mixed(r, 1, 3), k = r.int(2, 4), L = mixed(r, 3 * k + 1, 3 * k + 7);
        const used = mul(R(k), P[3]);
        if (cmp(L[3], used) <= 0) continue;
        const ans = sub(L[3], used);
        return N('A board is ' + MX(L[0], L[1], L[2]) + ' metres long. ' + k + ' pieces, each ' + MX(P[0], P[1], P[2]) + ' metres long, are cut from it. How many metres are left?', fmt(ans), { mixed: true, s: k + ' pieces use ' + k + ' × ' + fm(P[3]) + ' = ' + fmMixed(used) + ' metres. Left: ' + fm(L[3]) + ' − ' + fm(used) + ' = ' + fmMixed(ans) + ' (in metres).', w: W(ans, [[fmt(used), 'That is how much was cut off. Subtract it from the board.']]) });
      }
    }),
  ],
});
