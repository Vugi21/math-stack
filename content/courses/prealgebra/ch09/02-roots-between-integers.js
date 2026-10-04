import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const isqrt = (n) => { let k = Math.floor(Math.sqrt(n)); while (k * k > n) k--; while ((k + 1) * (k + 1) <= n) k++; return k; };
const nonsq = (r, lo, hi) => { let n; do { n = r.int(lo, hi); } while (isqrt(n) ** 2 === n); return n; };

export default lesson({
  id: 'pre-9-2-roots-between-integers',
  title: 'Roots that are not whole numbers',
  blurb: 'sqrt[20] is not a whole number, but you can trap it between two of them and then squeeze it tighter.',
  concepts: ['square-root', 'estimation', 'irrational-numbers'],

  tryFirst: [
    num('t1', 'A square has an area of 20 square cm. Its side is longer than 4 cm but shorter than a whole number of cm. What is the smallest whole number of cm that is longer than the side?', 5, {
      h: ['A side of 4 gives area 16. A side of 5 gives area 25.', 'Is 20 closer to 16 or to 25? Does the side fit under 5?'],
      s: '4 × 4 = 16 is too small and 5 × 5 = 25 is too big, so the side is between 4 and 5. The smallest whole number above it is 5.',
      w: [['4', 'A side of 4 gives only 16 square cm, so the side is longer than 4.']],
    }),
    num('t2', 'Which whole number is closest to the side of a square with area 50 square cm?', 7, {
      h: ['7 × 7 = 49. Compare with 50.'],
      s: '7 × 7 = 49, which is just 1 less than 50, while 8 × 8 = 64 is far away. The side is very close to 7.',
      w: [['8', '8 × 8 = 64 overshoots by 14. 7 × 7 = 49 is off by only 1.'], ['25', '25 is half of 50, but halving does not undo a square.']],
    }),
  ],

  learn: [
    p('You know sqrt[25] = 5 and sqrt[36] = 6. But what is sqrt[30]? No whole number squares to 30, and no fraction does either. Yet a square of area 30 certainly has a side. It just does not land on a whole-number tick mark. A side like this is somewhere between 5 and 6, and in this lesson you learn to pin it down.'),
    def('irrational number', 'A number whose decimal never ends and never repeats. If a whole number N is not a perfect square, then sqrt[N] is irrational. Examples: sqrt[2], sqrt[30], sqrt[58]. We can only write them as decimals approximately.'),
    def('approximation', 'A number that is close to the true value but not exact. We write ≈ for "is approximately equal to": sqrt[58] ≈ 7.6.'),
    rule('<b>Trap it between squares.</b> If k^[2] &lt; N &lt; (k + 1)^[2], then k &lt; sqrt[N] &lt; k + 1. The bigger the number under the root, the bigger the root, so the order of numbers carries over to the order of their roots.'),
    widget('sqrtBetween', { n: 30 }),
    tbl(['N', 'Between squares', 'sqrt[N] is between'], [['10', '9 and 16', '3 and 4'], ['27', '25 and 36', '5 and 6'], ['70', '64 and 81', '8 and 9'], ['120', '100 and 121', '10 and 11']], 'Trapping some roots'),
    ex('Which whole number is nearest?', ['Find the whole number nearest to sqrt[90].', '9^[2] = 81 and 10^[2] = 100, so sqrt[90] is between 9 and 10.', 'Halfway between 9 and 10 is 9.5, and 9.5 × 9.5 = 90.25. Since 90 is less than 90.25, sqrt[90] is less than 9.5.', 'So sqrt[90] is closer to 9. The nearest whole number is 9.']),
    tip('<b>The halfway test.</b> To round sqrt[N] to a whole number, square the halfway value k + 0.5. Its square is k^[2] + k + 0.25. If N is below that, round down to k. If N is above it, round up to k + 1.'),
    ex('Estimating sqrt[58]', ['Find the squares on each side of 58: 7^[2] = 49 and 8^[2] = 64.', 'So sqrt[58] is between 7 and 8.', 'Which end is closer? 58 is 9 above 49 and 6 below 64, so it is closer to 64. Expect sqrt[58] to be a bit past 7.5.', 'Check 7.6: 7.6 × 7.6 = 57.76. Check 7.7: 7.7 × 7.7 = 59.29. 58 is nearer to 57.76, so sqrt[58] ≈ 7.6.']),
    key('A square root that is not a whole number can still be located exactly between two <b>consecutive whole numbers</b>. Find the nearest perfect squares below and above, and take their roots as the boundaries.'),
    p('<b>Comparing roots without a calculator.</b> To decide whether sqrt[55] is bigger than 7.5, square both sides. 7.5 × 7.5 = 56.25, and 55 is smaller, so sqrt[55] &lt; 7.5. Squaring keeps the order as long as the numbers are positive.'),
    ex('Counting whole numbers with a root in a range', ['How many whole numbers n have sqrt[n] strictly between 3 and 5?', 'sqrt[n] = 3 when n = 9, and sqrt[n] = 5 when n = 25. Bigger n gives a bigger root, so n must be strictly between 9 and 25.', 'The whole numbers are 10, 11, …, 24.', 'Count: 24 − 10 + 1 = 15 numbers.']),
    warn('<b>Watch out.</b> Halfway between two squares is not halfway between their roots. 12.5 is exactly halfway between 9 and 16, yet sqrt[12.5] is about 3.54, only a little past 3.5. Squares spread out as numbers grow, so a number halfway between squares has a root slightly past the halfway point. Estimate with the squares, then test.'),
    mcq('Priya says: "sqrt[50] must be 25, because 25 + 25 = 50." What is wrong?', ['Nothing. Roots are found by splitting a number in two.', 'She split 50 into two equal parts, but a root needs two equal factors: 7 × 7 = 49 is close, so sqrt[50] is just above 7.', 'sqrt[50] is exactly 7.'], 1, 'A root asks for a number times itself. 25 × 25 = 625, far too big. 7 × 7 = 49 is just under 50, so sqrt[50] is a little above 7.', 'Spot the mistake'),
    recap([['irrational', 'decimal never ends or repeats; e.g. sqrt[30]'], ['approximation', 'close but not exact, shown with ≈'], ['trapping', 'find the two perfect squares around N']], [['Between squares', 'k^[2] &lt; N &lt; (k + 1)^[2] means k &lt; sqrt[N] &lt; k + 1'], ['Comparing', 'square both positive sides and compare']]),
  ],

  practice: [
    mc('p1', 'sqrt[75] lies between which two whole numbers?', ['7 and 8', '8 and 9', '9 and 10', '37 and 38'], 1, {
      h: ['Find the squares just below and above 75.'],
      s: '8^[2] = 64 and 9^[2] = 81, so 75 is between them and sqrt[75] is between 8 and 9.',
      w: [[0, '7^[2] = 49 and 8^[2] = 64: 75 is above both.'], [3, 'That is half of 75, but you want a number that multiplies by itself.']],
    }),
    num('p2', 'What is the nearest whole number to sqrt[130]?', 11, {
      h: ['11^[2] = 121 and 12^[2] = 144. Which is 130 closer to?'],
      s: '130 is 9 above 121 and 14 below 144. It is closer to 121, so the root is closer to 11.',
      w: [['12', '12^[2] = 144 is 14 away from 130, but 121 is only 9 away.'], ['10', '10^[2] = 100 is below 121, but 130 is well above 121.']],
    }),
    mc('p3', 'Which is larger, sqrt[40] or 6.5?', ['sqrt[40] is larger', '6.5 is larger', 'They are equal', 'You cannot tell without a calculator'], 1, {
      h: ['Square both numbers and compare.'],
      s: '6.5 × 6.5 = 42.25, which is more than 40. So 6.5 is the larger number.',
      w: [[0, '6.5 squared is 42.25, which beats 40.'], [3, 'You can: squaring both sides keeps the order for positive numbers.']],
    }),
    num('p4', 'How many whole numbers n have sqrt[n] strictly between 5 and 8?', 38, {
      h: ['Which n give a root of exactly 5? Exactly 8?', 'n must be strictly between 25 and 64.'],
      s: 'sqrt[n] > 5 means n > 25, and sqrt[n] < 8 means n < 64. The whole numbers from 26 to 63 number 63 − 26 + 1 = 38.',
      w: [['39', 'Neither 25 nor 64 counts, so you have one too many. 26 through 63.'], ['37', 'Count 26 through 63 inclusive: 63 − 26 + 1.'], ['3', 'That is 8 − 5, the gap between the roots. The question counts the n values, which run from 26 to 63.']],
    }),
    num('p5', 'To the nearest tenth, what is sqrt[17]? Hint: it is close to 4.', 4.1, {
      h: ['4^[2] = 16 and 5^[2] = 25. So it is just over 4.', 'Try 4.1 × 4.1 and 4.2 × 4.2.'],
      s: '4.1 × 4.1 = 16.81 and 4.2 × 4.2 = 17.64. 17 is closer to 16.81, so sqrt[17] ≈ 4.1.',
      w: [['4.2', '4.2 squared is 17.64, which is 0.64 away from 17. 4.1 squared is 16.81, only 0.19 away.'], ['4', 'It is not exactly 4: 4 squared is 16, not 17. Use one decimal place.']],
    }),
    num('p6', 'A square field has an area of 200 square meters. Fencing is sold only in whole meters. What is the least whole number of meters of fence that surely goes all the way around?', 57, {
      h: ['The side is sqrt[200]. Find it between two whole numbers: 14^[2] = 196 and 15^[2] = 225.', 'The perimeter is 4 times the side. Squaring 4 sqrt[200] gives 3200.', 'Find the least whole number whose square is at least 3200.'],
      s: 'Perimeter = 4 × sqrt[200] = sqrt[16 × 200] = sqrt[3200]. 56^[2] = 3136 is too small and 57^[2] = 3249 is enough. So 57 m.',
      w: [['60', 'That works but is not the least. 57 squared is already over 3200.'], ['56', '56 squared is 3136, which is below 3200, so 56 m is not quite enough.'], ['200', 'That is the area, not the fence length.']],
    }),
    num('p7', 'What is the largest whole number n with sqrt[n] less than 9?', 80, {
      h: ['If sqrt[n] were exactly 9, n would be 81.'],
      s: 'sqrt[81] = 9 exactly, which is not less than 9. The next one down, 80, has a root a bit under 9.',
      w: [['81', 'sqrt[81] equals 9, it is not less than 9.'], ['8', 'That is the largest whole root, not the largest n.']],
    }),
  ],

  challenge: [
    chain('Trapping sqrt[2]', 'Let us home in on sqrt[2], the diagonal of a 1 by 1 square.', [
      num('c1a', 'sqrt[2] is between 1 and which whole number?', 2, { h: ['1^[2] = 1 and 2^[2] = 4.'], s: 'It is between 1 and 2.' }),
      num('c1b', 'Which of these tenths is closest: 1.3, 1.4, 1.5? Compute their squares and answer with the closest one.', 1.4, { h: ['1.4 × 1.4 = 1.96; 1.5 × 1.5 = 2.25; 1.3 × 1.3 = 1.69.'], s: '1.96 is just 0.04 from 2, so 1.4 is the best of the three.', w: [['1.5', '1.5 squared is 2.25, which is 0.25 away from 2. 1.4 squared is 1.96, only 0.04 away.']] }),
      num('c1c', 'Compute 1.41 × 1.41. (Give the exact decimal.)', 1.9881, { h: ['141 × 141 = 19881. Then place the decimal point four places in.'], s: '1.41 × 1.41 = 1.9881, very close to 2. sqrt[2] ≈ 1.41.' }),
    ], 'The idea: you can squeeze an irrational root as tightly as you like, one decimal place at a time, by squaring candidates. The calculator does the same thing, only faster.'),
    chain('Roots on a ruler', 'A student claims sqrt[45] is exactly 6.7.', [
      num('c2a', 'What is 6.7 × 6.7?', 44.89, { h: ['67 × 67 = 4489, then place the point.'], s: '6.7 × 6.7 = 44.89.' }),
      num('c2b', 'So is 6.7 a little too small or a little too big as sqrt[45]? Answer 1 for too small, 2 for too big.', 1, { h: ['Is 44.89 smaller than 45?'], s: '44.89 is less than 45, so 6.7 is slightly too small.' }),
      num('c2c', 'What is 6.71 × 6.71? Then you will see what the answer is closest to.', 45.0241, { h: ['671 × 671 = 450241.'], s: '6.71 × 6.71 = 45.0241, just over 45. So sqrt[45] is between 6.70 and 6.71: close to 6.7 but never exactly.' }),
    ], 'The idea: "exactly" is a strong word. A decimal that squares to something near 45 is only an estimate; sqrt[45] has infinitely many digits.'),
    mc('c3', 'Find the error. Omar says: "sqrt[30] is between 15 and 16, because half of 30 is 15." Which is the best explanation?', ['He halved instead of looking for a number times itself: 5 × 5 = 25 and 6 × 6 = 36, so sqrt[30] is between 5 and 6.', 'He is right, because roots are found by halving.', 'sqrt[30] is between 3 and 4, because 30 ÷ 10 = 3.', 'Nobody can say where sqrt[30] is.'], 0, {
      s: '5^[2] = 25 < 30 < 36 = 6^[2]. A root is a number times itself, not half.',
      w: [[1, 'Test it: 15 × 15 = 225, not 30.'], [2, '3 × 3 = 9 and 4 × 4 = 16, nowhere near 30.']],
    }),
  ],

  quiz: [
    tpl('floor', (r) => {
      const n = nonsq(r, 2, 200), k = isqrt(n);
      return N('What is the largest whole number that is less than sqrt[' + n + ']?', k, { s: k + '^[2] = ' + k * k + ' and ' + (k + 1) + '^[2] = ' + (k + 1) ** 2 + ', so sqrt[' + n + '] is between ' + k + ' and ' + (k + 1) + '.', w: [[k + 1, 'That is the whole number above the root. You want the one below.']] });
    }),
    tpl('between', (r) => {
      const n = nonsq(r, 3, 250), k = isqrt(n);
      return N('sqrt[' + n + '] lies between two consecutive whole numbers. What is the sum of those two whole numbers?', 2 * k + 1, { s: 'Between ' + k + ' and ' + (k + 1) + ', so the sum is ' + (2 * k + 1) + '.', w: n === 2 * k + 1 ? [] : [[n, 'That is just the number under the root. Find the two whole numbers that trap it.']] });
    }),
    tpl('nearest', (r) => {
      const n = nonsq(r, 5, 200), k = isqrt(n);
      const near = n - k * k < (k + 1) ** 2 - n ? k : k + 1;
      return N('What whole number is closest to sqrt[' + n + ']?', near, { s: n + ' is ' + (n - k * k) + ' above ' + k * k + ' and ' + ((k + 1) ** 2 - n) + ' below ' + (k + 1) ** 2 + '. Closer to ' + near + '^[2].', w: [[near === k ? k + 1 : k, 'Check which perfect square ' + n + ' is nearer to.']] });
    }),
    tpl('howmany', (r) => {
      const a = r.int(2, 12), b = r.int(a + 2, a + 12);
      return N('How many whole numbers n have sqrt[n] strictly between ' + a + ' and ' + b + '?', b * b - a * a - 1, { s: 'n must be strictly between ' + a * a + ' and ' + b * b + ': that is ' + (b * b - a * a - 1) + ' numbers.', w: [[b * b - a * a + 1, 'Both ends are excluded, so subtract them.'], [b - a - 1, 'That counts whole-number roots. The question counts the n values.']] });
    }),
    tpl('compare', (r) => {
      const d = r.int(21, 97) / 10;
      const sq = d * d, n = Math.round(sq) + r.pick([-1, 1]);
      const a = n, hi = Math.sqrt(a) > d;
      const dd = String(d);
      return choice(r, 'Which is larger, sqrt[' + a + '] or ' + dd + '?', hi ? 'sqrt[' + a + ']' : dd, [hi ? dd : 'sqrt[' + a + ']', 'They are equal'], { h: ['Square both numbers.'], s: dd + ' squared is ' + (Math.round(sq * 100) / 100) + ' and ' + a + ' is ' + (hi ? 'bigger' : 'smaller') + ', so ' + (hi ? 'sqrt[' + a + ']' : dd) + ' is larger.' });
    }),
    tpl('maxn', (r) => {
      const k = r.int(3, 40);
      return N('What is the largest whole number n for which sqrt[n] is less than ' + k + '?', k * k - 1, { s: 'sqrt[' + k * k + '] = ' + k + ' is not less than ' + k + ', so go one lower: ' + (k * k - 1) + '.', w: [[k * k, 'sqrt[' + k * k + '] equals ' + k + ' exactly, which is not less than ' + k + '.'], [k - 1, 'That is a root, not an n.']] });
    }),
    tpl('fence', (r) => {
      const n = nonsq(r, 10, 90);
      let m = 0; while (m * m < 16 * n) m++;
      return N('A square plot has an area of ' + n + ' square meters. Fencing is sold only in whole meters. What is the least whole number of meters that is enough to go all the way around?', m, { s: 'The perimeter is 4 sqrt[' + n + '] = sqrt[' + 16 * n + ']. ' + (m - 1) + '^[2] = ' + (m - 1) ** 2 + ' is too small and ' + m + '^[2] = ' + m * m + ' is enough.', w: [[4 * isqrt(n), 'That uses the whole-number part of the side only. The true side is longer, so you need more fence.'], [n, 'That is the area. Find the side first, then the perimeter.']].filter((x) => x[0] !== m) });
    }),
    tpl('tenth', (r) => {
      let n, t;
      for (;;) { n = nonsq(r, 2, 80); const x = Math.sqrt(n) * 10; const f = x - Math.floor(x); if (Math.abs(f - 0.5) > 0.06) { t = Math.round(x); break; } }
      return N('To the nearest tenth, what is sqrt[' + n + ']? (Give a decimal like 4.6. Try squaring candidates.)', (t / 10).toFixed(1), { s: 'Squaring ' + (t / 10).toFixed(1) + ' gives about ' + (t * t / 100).toFixed(2) + ', the closest of the tenths to ' + n + '.', w: [[isqrt(n), 'That is the whole-number part. Give one decimal place.']] });
    }),
  ],
});
