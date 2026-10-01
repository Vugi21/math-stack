import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd } from '../../../../src/content/dsl.js';

const pw = (b, e) => Math.pow(b, e);
const W = (v, a, msg) => (String(v) === String(a) ? [] : [[v, msg]]);
const fr = (n, d) => { const g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; };
const mk = (n, d) => { const g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : '{' + n + '/' + d + '}'; };
const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));

export default lesson({
  id: 'pre-2-4-negative-exponents',
  title: 'Negative exponents',
  blurb: 'Keep the pattern going past zero: the exponent goes negative, and the numbers become fractions, not negatives.',
  concepts: ['exponents', 'negative-exponents', 'reciprocals'],

  tryFirst: [
    num('t1', 'Powers of 2 shrink as the exponent drops: 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2, 2<sup>0</sup> = 1. Keep the pattern going. What should 2<sup>−1</sup> be?', '1/2', {
      h: ['What happens to the value every time the exponent drops by 1?', 'You divide by 2. Divide 1 by 2.'],
      s: 'Each step down halves the value, so after 1 comes half of 1, which is 1/2.',
      w: [['-1', 'The exponent is negative, not the number. Keep halving: 8, 4, 2, 1, ...'], ['-2', 'Exponents do not make the number negative. Keep dividing by 2 and see where 1 goes.']],
    }),
    set('t2', 'Start at 81 and keep dividing by 3: 81, 27, 9, 3, 1, ... Write the next two numbers, separated by a comma.', '1/3,1/9', {
      h: ['Dividing 1 by 3 gives a fraction.', 'Do it again to the fraction.'],
      s: '1 ÷ 3 = 1/3, and (1/3) ÷ 3 = 1/9.',
      w: [['3,9', 'Those get bigger. We are dividing by 3 each step, so the numbers keep shrinking.']],
    }),
  ],

  learn: [
    p('We showed that b<sup>0</sup> = 1 by watching a pattern. The pattern does not have to stop at zero. Each step down in the exponent <b>divides</b> by the base, so the numbers keep shrinking: 1, then 1 divided by the base, then that divided again.'),
    widget('negExponent', { b: 3 }),
    rule('<b>Negative exponents.</b> b<sup>−n</sup> = {1/b^[n]}. A negative exponent flips the power to the bottom of a fraction: 2<sup>−3</sup> = {1/2^[3]} = {1/8}.'),
    ex('Why that is the only choice', ['Multiply: 2<sup>3</sup> × 2<sup>−3</sup>. Same base, so add exponents: 2<sup>3 + (−3)</sup> = 2<sup>0</sup> = 1.', 'So 2<sup>−3</sup> must be the number which times 8 makes 1.', 'That number is {1/8}, the <b>reciprocal</b> of 8. So 2<sup>−3</sup> = {1/8}.']),
    ex('Another look: counting down in tenths', ['10<sup>2</sup> = 100, 10<sup>1</sup> = 10, 10<sup>0</sup> = 1.', '10<sup>−1</sup> = {1/10} = 0.1, 10<sup>−2</sup> = {1/100} = 0.01, 10<sup>−3</sup> = 0.001.', 'The exponent tells you how many places you travel right of the decimal point to find the 1.']),
    tbl(['Power', 'Meaning', 'Value'], [['5<sup>2</sup>', '5 × 5', '25'], ['5<sup>1</sup>', '5', '5'], ['5<sup>0</sup>', 'empty product', '1'], ['5<sup>−1</sup>', '1 ÷ 5', '{1/5}'], ['5<sup>−2</sup>', '1 ÷ (5 × 5)', '{1/25}']], 'Walking down the powers of 5'),
    p('<b>Flipping works both ways.</b> Because b<sup>−n</sup> is the reciprocal of b<sup>n</sup>, the exponent on a fraction flips it: ({2/3})<sup>−1</sup> = {3/2}, and ({2/3})<sup>−2</sup> = ({3/2})<sup>2</sup> = {9/4}.'),
    warn('<b>Watch out.</b> A negative exponent does <i>not</i> make the answer negative. 3<sup>−2</sup> is {1/9}, a small positive number. The minus sign in the exponent means "go down the pattern / take the reciprocal", not "make it negative".'),
    mcq('Maya says "2<sup>−3</sup> = −8." What is the real value, and what did she do?', ['She is right.', '{1/8}. She treated the negative exponent as making the number negative; it actually flips 2<sup>3</sup> into a fraction.', '−6, because 2 × (−3) = −6.'], 1, 'Negative exponent = reciprocal: 2<sup>−3</sup> = 1 ÷ 2<sup>3</sup> = {1/8}. It is positive and tiny.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is 2<sup>−4</sup>? Give a fraction.', '1/16', {
      h: ['2<sup>−4</sup> = 1 ÷ 2<sup>4</sup>.'],
      s: '2<sup>4</sup> = 16, so 2<sup>−4</sup> = 1/16.',
      w: [['-16', 'The result is not negative. A negative exponent takes the reciprocal.'], ['-8', 'The exponent does not multiply: 2 × (−4). Use the reciprocal rule.'], ['1/8', 'That is 2<sup>−3</sup>. Check the exponent: 2<sup>4</sup> is 16.']],
    }),
    num('p2', 'Write 10<sup>−3</sup> as a decimal.', '0.001', {
      h: ['10<sup>−3</sup> = 1/1000.'],
      s: '1/1000 = 0.001: the 1 is three places right of the decimal point.',
      w: [['0.0001', 'That is 10<sup>−4</sup>. Three places: 0.001.'], ['-1000', 'A negative exponent gives a small positive fraction, not −1000.']],
    }),
    num('p3', 'Find 5<sup>−2</sup> × 5<sup>2</sup>.', 1, {
      h: ['Same base: add the exponents.'],
      s: '−2 + 2 = 0, and 5<sup>0</sup> = 1. (Or 1/25 × 25 = 1.)',
      w: [['25', 'The 5<sup>−2</sup> is {1/25}, not 25. Adding exponents: −2 + 2 = 0.'], ['0', '5<sup>0</sup> is 1, not 0.']],
    }),
    num('p4', 'Find {1/3^[−2]}.', 9, {
      h: ['3<sup>−2</sup> = {1/9}. What is 1 divided by {1/9}?'],
      s: '3<sup>−2</sup> = {1/9}. The reciprocal of {1/9} is 9. Flipping twice gets you back to a positive exponent: {1/3^[−2]} = 3<sup>2</sup> = 9.',
      w: [['1/9', 'That is 3<sup>−2</sup> itself. The question divides 1 by it.'], ['-9', 'There is no negative here: flip the flipped number.']],
    }),
    num('p5', 'Find ({2/3})<sup>−2</sup>. Give a fraction.', '9/4', {
      h: ['A negative exponent flips the fraction.', 'Flip first, then square.'],
      s: '({2/3})<sup>−2</sup> = ({3/2})<sup>2</sup> = 9/4.',
      w: [['4/9', 'You squared but forgot to flip. The negative exponent turns 2/3 into 3/2.'], ['-4/9', 'The negative exponent does not make the answer negative; it flips the fraction.']],
    }),
    mc('p6', 'Which of these is the greatest?', ['2<sup>−3</sup>', '3<sup>−2</sup>', '4<sup>−1</sup>', '5<sup>−2</sup>'], 2, {
      h: ['Convert each to a fraction: 1/8, 1/9, 1/4, 1/25.', 'A bigger denominator means a smaller piece.'],
      s: '2<sup>−3</sup> = 1/8, 3<sup>−2</sup> = 1/9, 4<sup>−1</sup> = 1/4, 5<sup>−2</sup> = 1/25. One quarter is the biggest.',
      w: [[0, '1/8 is smaller than 1/4.'], [3, '1/25 is the smallest of the four.']],
    }),
    num('p7', 'What number n makes 2<sup>n</sup> = {1/32}?', -5, {
      h: ['2<sup>5</sup> = 32. What does the negative exponent do?'],
      s: '1/32 = 1/2<sup>5</sup> = 2<sup>−5</sup>, so n = −5.',
      w: [['5', '2<sup>5</sup> = 32, not 1/32. You need the reciprocal, so the exponent is negative.'], ['-32', 'n is the exponent, not the denominator.']],
    }),
    num('p8', 'A medicine in the body halves in amount each day. Today exactly 1 gram is left. How many grams were there 3 days ago?', 8, {
      h: ['Go backwards in time: the amount doubles each day you go back.'],
      s: 'Yesterday 2 g, 2 days ago 4 g, 3 days ago 8 g. Going forward is the factor {1/2}; backward it is 2. In powers: ({1/2})<sup>−3</sup> = 8.',
      w: [['1/8', 'That is the amount 3 days from now. We are looking backwards in time.']],
    }),
  ],

  challenge: [
    chain('Ten and its neighbours', 'Powers of ten run through every scale in science, from galaxies down to atoms.', [
      num('c1a', 'Write 10<sup>−2</sup> as a fraction.', '1/100', { h: ['Reciprocal of 10<sup>2</sup>.'], s: '10<sup>2</sup> = 100, so 10<sup>−2</sup> = 1/100.', w: [['-100', 'A negative exponent does not give a negative number.']] }),
      num('c1b', 'Find 10<sup>3</sup> × 10<sup>−5</sup> as a fraction.', '1/100', { h: ['Add the exponents.'], s: '3 + (−5) = −2, so the answer is 10<sup>−2</sup> = 1/100.', w: [['-100', 'The exponent −2 means 1/100, not −100.']] }),
      num('c1c', 'How many times bigger is 10<sup>2</sup> than 10<sup>−2</sup>?', 10000, { h: ['100 ÷ (1/100).'], s: '100 ÷ 1/100 = 100 × 100 = 10,000. In exponents: 10<sup>2 − (−2)</sup> = 10<sup>4</sup>.', w: [['10', 'The gap in exponents is 4 (not 1), so the ratio is 10<sup>4</sup>.']] }),
    ], 'The idea: subtracting exponents counts the steps between powers. From −2 up to 2 is 4 steps, each a factor of 10.'),
    chain('Flip it', 'Reciprocals and negative exponents are two faces of the same idea.', [
      num('c2a', 'What is 2<sup>−1</sup>?', '1/2', { h: ['1 ÷ 2<sup>1</sup>.'], s: '1/2.' }),
      num('c2b', 'What is ({1/2})<sup>−1</sup>?', 2, { h: ['Flip the fraction 1/2.'], s: 'The negative exponent flips {1/2} into {2/1} = 2.', w: [['1/2', 'The −1 exponent flips the fraction.']] }),
      num('c2c', 'What is ({1/2})<sup>−3</sup>?', 8, { h: ['Flip to 2, then cube.'], s: '({1/2})<sup>−3</sup> = 2<sup>3</sup> = 8.', w: [['1/8', 'That is ({1/2})<sup>3</sup>. The negative sign flips it.'], ['-8', 'The result stays positive.']] }),
    ], 'The idea: raising {1/2} to a negative power is the same as raising 2 to the positive power. Negative exponents and reciprocals are the same flip.'),
    mc('c3', 'Find the error. Priya says "3<sup>−2</sup> = 1/6 because the exponent −2 means 3 × 2, which is 6, then flip." Which comment fixes it?', ['3<sup>−2</sup> = 1/(3 × 3) = 1/9: the positive part of the exponent still says how many copies of 3.', '3<sup>−2</sup> = −9.', 'It is right: you multiply base and exponent.', '3<sup>−2</sup> = 1/3 − 2.'], 0, {
      s: 'The exponent 2 still counts copies of the base: 3 × 3 = 9. The negative sign flips: 1/9.',
      w: [[1, 'The answer is not negative.'], [2, 'The exponent counts copies, it is not a multiplier.']],
    }),
  ],

  quiz: [
    tpl('negpow', (r) => { const b = r.int(2, 12), n = r.int(1, 4); return N('Write ' + b + '<sup>−' + n + '</sup> as a fraction.', fr(1, pw(b, n)), { s: b + '<sup>' + n + '</sup> = ' + pw(b, n) + ', so ' + b + '<sup>−' + n + '</sup> = 1/' + pw(b, n) + '.', w: [[-pw(b, n), 'A negative exponent does not make the number negative; it takes the reciprocal.']] }); }),
    tpl('dec', (r) => { const n = r.int(1, 5), k = r.int(1, 9); const v = (k / pw(10, n)).toFixed(n); return N('Write ' + k + ' × 10<sup>−' + n + '</sup> as a decimal.', v, { s: '10<sup>−' + n + '</sup> = 1/' + pw(10, n) + ', so ' + k + ' × 10<sup>−' + n + '</sup> = ' + k + '/' + pw(10, n) + ' = ' + v + '.', w: [[-k * pw(10, n), 'The exponent is negative, so the value is small and positive.']] }); }),
    tpl('recip', (r) => { const b = r.int(2, 9), n = r.int(1, 4); return N('Find {1/' + b + '^[−' + n + ']}.', pw(b, n), { s: b + '<sup>−' + n + '</sup> = 1/' + pw(b, n) + ', and 1 divided by 1/' + pw(b, n) + ' is ' + pw(b, n) + '.', w: [[fr(1, pw(b, n)), 'That is ' + b + '<sup>−' + n + '</sup> itself. The 1 over it flips it back.']] }); }),
    tpl('flip', (r) => {
      let a = r.int(1, 7), b = r.int(2, 8); while (gcd(a, b) !== 1) { a = r.int(1, 7); b = r.int(2, 8); }
      const n = r.int(1, 3);
      return N('Find ({' + a + '/' + b + '})<sup>−' + n + '</sup>. Give a fraction or a whole number.', fr(pw(b, n), pw(a, n)), { s: 'Flip to ({' + b + '/' + a + '})<sup>' + n + '</sup> = ' + pw(b, n) + '/' + pw(a, n) + '.', w: W(fr(pw(a, n), pw(b, n)), fr(pw(b, n), pw(a, n)), 'You did not flip. A negative exponent turns the fraction upside down.') });
    }),
    tpl('solven', (r) => { const b = r.int(2, 9), n = r.int(1, 4); return N('What number n makes ' + b + '<sup>n</sup> = {1/' + pw(b, n) + '}?', -n, { s: pw(b, n) + ' = ' + b + '<sup>' + n + '</sup>, and the reciprocal is ' + b + '<sup>−' + n + '</sup>, so n = ' + m(-n) + '.', w: [[n, b + '<sup>' + n + '</sup> = ' + pw(b, n) + ', not its reciprocal.']] }); }),
    tpl('prod', (r) => { const b = r.int(2, 6), x = r.int(1, 5), y = r.int(1, 5); const e = y - x; const v = e >= 0 ? String(pw(b, e)) : fr(1, pw(b, -e)); return N('Find ' + b + '<sup>−' + x + '</sup> × ' + b + '<sup>' + y + '</sup>. Give a fraction or whole number.', v, { s: 'Add exponents: −' + x + ' + ' + y + ' = ' + m(e) + '. So ' + b + '<sup>' + m(e) + '</sup> = ' + v + '.', w: W(pw(b, x + y), v, 'You added without the sign. The exponent −' + x + ' is negative: −' + x + ' + ' + y + '.') }); }),
    tpl('greatest', (r) => { let vals, best2; do { vals = r.distinct(4, 2, 9).map((b) => ({ b, e: r.int(1, 3) })); const lo = Math.min(...vals.map((o) => pw(o.b, o.e))); const tops = vals.filter((o) => pw(o.b, o.e) === lo); best2 = tops[0]; if (tops.length > 1) best2 = null; } while (!best2); const t = (o) => o.b + '<sup>−' + o.e + '</sup>'; return choice(r, 'Which of these is the greatest?', t(best2), vals.filter((o) => o !== best2).map(t), { s: 'Each equals 1 over ' + vals.map((o) => pw(o.b, o.e)).join(', ') + '. The smallest denominator makes the biggest fraction.' }); }),
    tpl('halving', (r) => { const g = r.int(1, 9), d = r.int(2, 9); return N(name(r) + ' is watching a sample lose half of its mass every day. Today it weighs ' + g + ' ' + (g === 1 ? 'gram' : 'grams') + '. How many grams did it weigh ' + d + ' days ago?', g * pw(2, d), { s: 'Going back in time doubles it each day: ' + g + ' × 2<sup>' + d + '</sup> = ' + g * pw(2, d) + '.', w: [[fr(g, pw(2, d)), 'That is the weight ' + d + ' days from now. Going back in time, the mass was bigger.']] }); }),
  ],
});
