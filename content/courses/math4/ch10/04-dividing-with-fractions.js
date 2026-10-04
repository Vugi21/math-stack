import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, R, mul, div, fmt, fmMixed, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const FR = (x) => fmMixed(x);
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'm4-10-4-dividing-with-fractions',
  title: 'Dividing with fractions',
  blurb: 'How many pieces fit? Dividing by a fraction, dividing a fraction, and the pattern of reciprocals.',
  concepts: ['fractions', 'dividing-fractions', 'reciprocals'],

  tryFirst: [
    num('t1', 'A rope is 3 m long. You cut it into pieces that are each {1/2} m long. How many pieces do you get?', 6, {
      h: ['How many half-metre pieces fit in 1 metre?', 'Now do 3 metres.'],
      s: 'Each metre holds 2 pieces of half a metre. 3 metres hold 3 × 2 = 6 pieces.',
      w: [['3/2', 'You multiplied 3 by {1/2}. The question asks how many pieces fit, and small pieces mean many of them.'], ['1', 'Count the pieces: two fit in each metre.']],
    }),
    num('t2', 'How many {1/4}-cup scoops fill 2 {1/2} cups?', 10, {
      h: ['How many scoops fill 1 cup?', '2 {1/2} cups is 2 cups and a half cup.'],
      s: '1 cup holds 4 scoops. 2 cups hold 8. A half cup holds 2 more. Total: 10 scoops.',
      w: [['8', 'You counted the 2 whole cups. The half cup holds 2 more scoops.'], ['5/8', 'That multiplies instead of counting scoops.']],
    }),
  ],

  learn: [
    p('<b>Dividing</b> can ask: how many fit? 6 ÷ 2 asks how many 2s fit in 6. The answer is 3. We can ask the same with fractions: how many {1/4}s fit in 3?'),
    widget('fractionDivide', { a: 3, b: 1, c: 1, d: 4 }),
    p('The bar is 3 wholes long. Each whole holds 4 pieces of {1/4}. So 3 wholes hold 3 × 4 = 12 pieces.'),
    rule('<b>A whole number divided by a unit fraction.</b> N ÷ {1/d} = N × d. Each whole holds d pieces, so N wholes hold N × d pieces.'),
    p('Now go the other way. What is {1/2} ÷ 3? Share half a pizza between 3 people. Cut the half in 3 equal parts. Each part is {1/6} of the pizza.'),
    rule('<b>A unit fraction divided by a whole number.</b> {1/d} ÷ N = {1/(d × N)}. Sharing a piece among N people makes the pieces N times smaller, so the bottom gets N times bigger.'),
    def('quotient', 'The answer to a division. In 6 ÷ {1/4} = 24, the quotient is 24.'),
    p('Look for a pattern in this table of 6 ÷ (a fraction).'),
    tbl(['Division', 'How many fit', 'Same as'], [['6 ÷ {1/3}', '18', '6 × 3'], ['6 ÷ {2/3}', '9', '6 × {3/2}'], ['6 ÷ {3/4}', '8', '6 × {4/3}'], ['6 ÷ {2/5}', '15', '6 × {5/2}']], 'Dividing by a fraction'),
    p('Why is 6 ÷ {2/3} = 9? A piece of {2/3} is twice as big as a piece of {1/3}. Twice as big means half as many fit. Half of 18 is 9. So 6 ÷ {2/3} = 6 × 3 ÷ 2 = 6 × {3/2}.'),
    def('reciprocal', 'The reciprocal of {a/b} is {b/a}. You get it by flipping the fraction upside down. A fraction times its reciprocal is 1. For example {2/3} × {3/2} = 1.'),
    formula('Dividing by a fraction', '{a/b} ÷ {c/d} = {a/b} × {d/c}', 'Keep the first fraction. Change ÷ to ×. Flip the second fraction, the one you divide by. A whole number is a fraction with bottom 1.'),
    key('Dividing by a fraction asks how many of that piece fit. Dividing by {1/4} is the same as multiplying by 4, because 4 quarters fit in each whole.'),
    ex('Fractions that fit into fractions', ['Find {2/3} ÷ {1/12}.', 'How many twelfths fit in two thirds? Two thirds is {8/12}.', 'Eight twelfths hold 8 pieces of {1/12}. So the answer is 8.', 'The rule agrees: {2/3} × {12/1} = {24/3} = 8.']),
    ex('Dividing a whole number by a fraction', ['Find 9 ÷ {3/4}.', 'Flip {3/4} to get {4/3}. Now multiply: 9 × {4/3} = {36/3}.', '{36/3} = 12.', 'Check: 12 pieces of {3/4} make 12 × {3/4} = 9.']),
    tip('Check a division by multiplying back. If 9 ÷ {3/4} = 12, then 12 × {3/4} must be 9. It is. Also remember: dividing by a number less than 1 gives an answer bigger than what you started with.'),
    warn('<b>Watch out.</b> Dividing does not always make things smaller. 6 ÷ {1/2} = 12, which is bigger than 6. And the flip applies only to the fraction you divide <i>by</i>, never to the first number.'),
    mcq('Ben says: "{1/2} ÷ 4 = 2, because 4 halves make 2." What is wrong?', ['Nothing, he is right.', 'He found 4 × {1/2}. But {1/2} ÷ 4 means to share half among 4, and each part is {1/8}.', 'The answer is {1/4}.'], 1, 'Cut half a pizza into 4 equal parts. Eight such parts make a whole pizza, so each is {1/8}. Check: 4 × {1/8} = {1/2}.', 'Spot the mistake'),
    recap([['reciprocal', 'a fraction flipped upside down: {2/3} and {3/2}'], ['dividing by a fraction', 'asks how many of that piece fit'], ['unit fraction ÷ whole', 'the bottom is multiplied: {1/2} ÷ 3 = {1/6}']], [['Dividing by a fraction', '{a/b} ÷ {c/d} = {a/b} × {d/c}'], ['Whole ÷ unit fraction', 'N ÷ {1/d} = N × d']]),
  ],

  practice: [
    num('p1', 'What is 5 ÷ {1/3}?', 15, {
      h: ['How many thirds are in one whole?'],
      s: 'Each whole holds 3 thirds. 5 wholes hold 15.',
      w: [['5/3', 'That is 5 × {1/3}. Count thirds in 5 wholes instead.'], ['2', 'That is 5 − 3. We are counting how many thirds fit.']],
    }),
    num('p2', 'What is {1/4} ÷ 3?', '1/12', {
      h: ['Share a quarter between 3. What size is each part?'],
      s: 'Cut a quarter into 3 equal parts. Twelve of those parts make a whole, so each is {1/12}.',
      w: [['3/4', 'That multiplies by 3. Sharing makes the pieces smaller.'], ['1/7', 'You added 4 + 3. Dividing a quarter by 3 multiplies the bottom by 3.']],
    }),
    num('p3', 'What is {3/4} ÷ {1/8}?', 6, {
      h: ['Write {3/4} as eighths.'],
      s: '{3/4} = {6/8}. Six eighths contain 6 pieces of {1/8}.',
      w: [['3/32', 'You multiplied. Dividing by {1/8} asks how many eighths fit.'], ['24', 'You multiplied 3 × 8 and forgot the 4. Write {3/4} as {6/8} and count eighths.']],
    }),
    num('p4', 'How many {3/4}-metre pieces can you cut from 6 metres of ribbon?', 8, {
      h: ['Divide by {3/4} by multiplying by {4/3}.', 'Or: how many quarters in 6? Then group them in threes.'],
      s: '6 metres is 24 quarters. Pieces of 3 quarters: 24 ÷ 3 = 8 pieces. The rule: 6 × {4/3} = 8.',
      w: [['24', 'That is the number of quarters. Each piece uses 3 quarters.'], ['9/2', 'You multiplied by {3/4}. To divide by {3/4}, flip it first.']],
    }),
    num('p5', 'Half a litre of juice is shared equally among 5 cups. How many litres are in each cup?', '1/10', {
      h: ['Share {1/2} among 5.'],
      s: '{1/2} ÷ 5 = {1/10} litre. 10 such cups would make a litre.',
      w: [['5/2', 'That multiplies by 5. Sharing gives each cup less.'], ['2/5', 'That is {1/2} flipped. The first number is not flipped.']],
    }),
    num('p6', 'What is {5/6} ÷ {5/12}?', 2, {
      h: ['Write both in twelfths.'],
      s: '{5/6} = {10/12}. Ten twelfths holds 2 groups of {5/12}. Rule check: {5/6} × {12/5} = 2.',
      w: [['25/72', 'You multiplied. We want how many {5/12}s fit in {5/6}.'], ['1', 'Two copies of {5/12} fit in {5/6}.']],
    }),
    num('p7', 'Fill in the box: 3 ÷ ☐ = 12. What fraction goes in the box?', '1/4', {
      h: ['How big must the pieces be so that 12 of them fit in 3?'],
      s: '12 pieces fill 3 wholes, so 4 pieces fill one whole. Each piece is {1/4}. Check: 3 ÷ {1/4} = 12.',
      w: [['4', '3 ÷ 4 is less than 1, not 12. The pieces must be small.'], ['1/12', 'Check: 3 ÷ {1/12} = 36.']],
    }),
    mc('p8', 'Which of these is the greatest?', ['6 ÷ {1/3}', '6 × 2', '6 ÷ 2', '6 × {1/2}'], 0, {
      h: ['Work each one out. Remember dividing by a small fraction gives a large answer.'],
      s: '6 ÷ {1/3} = 18. 6 × 2 = 12. 6 ÷ 2 = 3. 6 × {1/2} = 3. The greatest is 18.',
      w: [[1, '6 × 2 = 12, but 6 ÷ {1/3} = 18.'], [2, '6 ÷ 2 = 3, which is small.']],
    }),
  ],

  challenge: [
    chain('Cutting a ribbon', 'A ribbon is 3 {1/2} m long. You cut pieces that are each {3/4} m long.', [
      num('c1a', 'How many whole pieces can you cut?', 4, { h: ['3 {1/2} = {7/2}. Find {7/2} ÷ {3/4}.'], s: '{7/2} × {4/3} = {14/3} = 4 {2/3}. So 4 whole pieces, with a bit left.' }),
      num('c1b', 'After cutting those pieces, how many metres of ribbon are left over? Give a fraction.', '1/2', { h: ['4 pieces use 4 × {3/4} = 3 m.'], s: '4 pieces use 3 m. Left: 3 {1/2} − 3 = {1/2} m.' }),
      num('c1c', 'The leftover is what fraction of one piece?', '2/3', { h: ['Divide the leftover by one piece: {1/2} ÷ {3/4}.'], s: '{1/2} × {4/3} = {2/3}. The leftover is {2/3} of a piece. That matches 4 {2/3} pieces in total.' }),
    ], 'The idea: the answer 4 {2/3} means 4 full pieces and {2/3} of another piece. The fraction part is a fraction of a <i>piece</i>, not of a metre.'),
    chain('A pattern', 'Look at how the answer changes when the pieces get bigger.', [
      num('c2a', 'What is 2 ÷ {1/5}?', 10, { h: ['How many fifths in 2?'], s: 'Each whole holds 5 fifths. 2 wholes hold 10.' }),
      num('c2b', 'What is 2 ÷ {2/5}?', 5, { h: ['A piece of {2/5} is twice as big as {1/5}. How many fit?'], s: 'Twice as big means half as many: 10 ÷ 2 = 5.' }),
      num('c2c', 'What is 2 ÷ {4/5}? Give a fraction or a mixed number.', '5/2', { mixed: true, h: ['{4/5} is twice as big as {2/5}.'], s: 'Twice as big again, half as many: 5 ÷ 2 = 2 {1/2}. Rule check: 2 × {5/4} = {10/4} = 2 {1/2}.' }),
    ], 'The idea: doubling the size of the piece halves the number of pieces. That is why dividing by {a/b} multiplies by {b/a}: first divide by the top a, then multiply by the bottom b.'),
    mc('c3', 'Find the error. Mia says: "{2/3} ÷ {1/6} = {2/3} × {1/6} = {1/9}, so only a ninth of a {1/6}-piece fits." What is wrong?', ['She must flip the second fraction: {2/3} × 6 = 4. Four pieces of {1/6} fit in {2/3}, since {2/3} = {4/6}.', 'Nothing is wrong.', 'She should flip the first fraction: {3/2} ÷ {1/6}.', 'She should add: {2/3} + {1/6}.'], 0, {
      s: '{2/3} is {4/6}, and {4/6} contains 4 pieces of {1/6}. Dividing by {1/6} multiplies by 6.',
      w: [[1, 'Small pieces fit many times into a larger fraction, so {1/9} cannot be right.'], [2, 'The flip goes on the number you divide <i>by</i>.']],
    }),
  ],

  quiz: [
    tpl('wholeunit', (r) => {
      const d = r.int(2, 9), n = r.int(2, 12);
      return N('What is ' + n + ' ÷ ' + F(1, d) + '?', n * d, { s: 'Each whole holds ' + d + ' pieces of size ' + F(1, d) + '. ' + n + ' × ' + d + ' = ' + n * d + '.', w: W(n * d, [[fmt(R(n, d)), 'That divides by ' + d + '. But dividing by ' + F(1, d) + ' asks how many pieces fit, so multiply.']]) });
    }),
    tpl('unitwhole', (r) => {
      const d = r.int(2, 9), n = r.int(2, 9), z = R(1, d * n);
      return N('What is ' + F(1, d) + ' ÷ ' + n + '?', fmt(z), { s: 'Share ' + F(1, d) + ' among ' + n + '. Each part is ' + F(1, d * n) + '.', w: W(z, [[fmt(R(n, d)), 'That multiplies by ' + n + '. Dividing a fraction by a whole number makes it smaller.']]) });
    }),
    tpl('frac', (r) => {
      const b = r.int(2, 6), c = r.int(1, 5), a = r.int(1, 5), k = r.int(2, 9);
      const x = R(a * k, b), y = R(c, b), z = div(x, y);
      return N('What is ' + F(a * k, b) + ' ÷ ' + F(c, b) + '? Give a fraction or a mixed number.', fmt(z), { mixed: true, s: 'Both are in ' + (b === 2 ? 'halves' : 'pieces of ' + F(1, b)) + ': ' + a * k + ' pieces ÷ ' + c + (c === 1 ? ' piece = ' : ' pieces = ') + FR(z) + '.' , w: W(z, [[fmt(mul(x, y)), 'That multiplies. We want how many ' + F(c, b) + ' fit in ' + F(a * k, b) + '.']]) });
    }),
    tpl('pieces', (r) => {
      const [c, d] = r.pick([[3, 4], [2, 3], [3, 5], [1, 4], [1, 8], [3, 8], [2, 5]]);
      const k = r.int(2, 8), total = R(c, d), n = mul(total, R(k)), who = name(r);
      const whole = R(c * k, d);
      return N(who + ' has a ribbon ' + FR(whole) + ' m long and cuts it into pieces ' + F(c, d) + ' m long. How many pieces?', k, { s: FR(whole) + ' ÷ ' + F(c, d) + ' = ' + k + '.', w: W(k, [[fmt(mul(whole, R(c, d))), 'That multiplies. Count how many pieces of ' + F(c, d) + ' m fit.']]) });
    }),
    tpl('missing', (r) => {
      const d = r.int(2, 9), k = r.int(2, 9);
      return N('Fill in the box: ' + k + ' ÷ ☐ = ' + k * d + '. Give the fraction in the box.', fmt(R(1, d)), { s: 'Each whole holds ' + d + ' pieces, so the pieces have size ' + F(1, d) + '. Check: ' + k + ' × ' + d + ' = ' + k * d + '.', w: W(R(1, d), [[d, 'Try it: ' + k + ' ÷ ' + d + ' is small, not ' + k * d + '.']]) });
    }),
    tpl('share', (r) => {
      const d = r.int(2, 6), n = r.int(2, 8), a = r.int(1, Math.min(3, d - 1)), who = name(r);
      const z = div(R(a, d), R(n));
      return N(who + ' has ' + F(a, d) + ' of a cake and shares it equally among ' + n + ' friends. What fraction of the whole cake does each friend get?', fmt(z), { s: F(a, d) + ' ÷ ' + n + ' = ' + FR(z) + '.', w: W(z, [[fmt(R(a * n, d)), 'Sharing gives each friend a part of what you have, so the answer is smaller than ' + F(a, d) + '.']]) });
    }),
    tpl('mixedtotal', (r) => {
      const a = r.int(2, 9), b = r.pick([3, 4, 5]), c = r.int(1, b - 1);
      const z = div(R(a), R(c, b));
      return N('How many ' + F(c, b) + '-cup scoops fit in ' + a + ' cups? Give a mixed number if it is not whole.', fmt(z), { mixed: true, s: a + ' ÷ ' + F(c, b) + ' = ' + a + ' × ' + F(b, c) + ' = ' + FR(z) + '.', w: W(z, [[fmt(R(a * c, b)), 'You multiplied by ' + F(c, b) + '. Flip it: dividing by ' + F(c, b) + ' multiplies by ' + F(b, c) + '.']]) });
    }),
  ],
});
