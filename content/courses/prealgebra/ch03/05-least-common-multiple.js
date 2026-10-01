import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm } from '../../../../src/content/dsl.js';

const lcm3 = (a, b, c) => lcm(lcm(a, b), c);
const L = (a, b) => lcm(a, b);

export default lesson({
  id: 'pre-3-5-least-common-multiple',
  title: 'Least common multiple',
  blurb: 'The first time two repeating patterns line up again: two ways to find the LCM, and why it matters for fractions.',
  concepts: ['lcm', 'common-multiples', 'prime-factorization'],

  tryFirst: [
    num('t1', 'Hot dogs come in packs of 10 and buns come in packs of 8. What is the smallest number of hot dogs you can buy so that you can match every hot dog with a bun, with none left over of either, buying whole packs?', 40, {
      h: ['Hot dogs: 10, 20, 30, ... Buns: 8, 16, 24, ...', 'You need a number that appears in both lists.'],
      s: 'Multiples of 10: 10, 20, 30, 40. Multiples of 8: 8, 16, 24, 32, 40. The first match is 40: 4 packs of hot dogs and 5 packs of buns.',
      w: [['80', '80 works too, but there is a smaller number on both lists.'], ['18', 'Adding 10 + 8 does not give a number that is a whole number of packs of each.']],
    }),
    num('t2', 'What is the smallest positive number that is a multiple of both 6 and 12?', 12, {
      h: ['Is 12 a multiple of 6?'],
      s: '12 is a multiple of 12 (itself) and of 6 (6 × 2). Nothing smaller is a multiple of 12, so 12.',
      w: [['72', '72 is a common multiple, but not the smallest. 12 is already a multiple of 6.'], ['6', '6 is not a multiple of 12.']],
    }),
  ],

  learn: [
    p('Two things repeat: one every 6 days, the other every 8 days. They both happen today. When will they next happen on the same day? You need a day that is a multiple of 6 <i>and</i> a multiple of 8, a <b>common multiple</b>, and the sooner the better. The first one is the <b>least common multiple</b>, or <b>LCM</b>.'),
    widget('lcmGcd', { a: 12, b: 18 }),
    rule('<b>LCM.</b> The least common multiple of two numbers is the smallest positive number that is a multiple of both. Write LCM(6, 8) = 24. Every other common multiple (48, 72, …) is a multiple of the LCM.'),
    ex('Method 1: list multiples', ['LCM(4, 10): multiples of 10 are 10, 20, 30, …', 'Check which are multiples of 4: 10 no, 20 yes (4 × 5).', 'So LCM(4, 10) = 20. Tip: list the multiples of the <i>bigger</i> number, there are fewer.']),
    ex('Method 2: prime recipes', ['Find LCM(12, 18). 12 = 2<sup>2</sup> × 3 and 18 = 2 × 3<sup>2</sup>.', 'A multiple of 12 needs two 2s and one 3. A multiple of 18 needs one 2 and two 3s.', 'To cover both, take the <b>larger exponent</b> of each prime: 2<sup>2</sup> × 3<sup>2</sup> = 36.', 'So LCM(12, 18) = 36.']),
    ex('Three numbers at once', ['LCM(4, 6, 10): 4 = 2<sup>2</sup>, 6 = 2 × 3, 10 = 2 × 5.', 'Largest exponent of 2: 2<sup>2</sup>. Of 3: 3. Of 5: 5.', 'LCM = 4 × 3 × 5 = 60.']),
    tbl(['Pair', 'Product', 'LCM'], [['4, 9', '36', '36'], ['6, 9', '54', '18'], ['8, 12', '96', '24'], ['6, 12', '72', '12']], 'The LCM is at most the product, and often much smaller'),
    p('<b>Why this matters later.</b> To add {1/6} + {1/8} you need pieces of the same size. The best common piece size is {1/24}, because 24 = LCM(6, 8). Using the LCM keeps the numbers small.'),
    warn('<b>Watch out.</b> The LCM is <i>not</i> always the product of the two numbers. LCM(6, 9) is 18, not 54: both 6 and 9 share a factor of 3, and the product counts it twice. Use the product only if the numbers share no factor.'),
    mcq('Ava says "LCM(6, 9) = 6 × 9 = 54." What is wrong?', ['Nothing, LCM is always the product.', '18 is also a multiple of both 6 (6 × 3) and 9 (9 × 2) and it is smaller than 54. Shared factors are counted twice by the product.', 'The LCM should be 15, the sum.'], 1, '54 is a common multiple, but not the least: 18 works. LCM(6, 9) = 2 × 3<sup>2</sup> = 18.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find LCM(8, 12).', 24, {
      h: ['Multiples of 12: 12, 24, ... Is 24 a multiple of 8?'],
      s: '24 = 8 × 3 = 12 × 2, and no smaller number works.',
      w: [['96', '96 = 8 × 12 is a common multiple but not the smallest.'], ['4', '4 is a common divisor, not a multiple. The LCM is at least as big as both numbers.']],
    }),
    num('p2', 'Find LCM(15, 20).', 60, {
      h: ['15 = 3 × 5 and 20 = 2<sup>2</sup> × 5.', 'Take the larger exponent of each prime.'],
      s: '2<sup>2</sup> × 3 × 5 = 60.',
      w: [['300', '15 × 20 counts the shared 5 twice. 60 is smaller and works.'], ['5', '5 is a common divisor, not a multiple.']],
    }),
    num('p3', 'Find LCM(7, 11).', 77, {
      h: ['7 and 11 share no factors.'],
      s: 'They are different primes, so LCM = 7 × 11 = 77.',
      w: [['18', 'That is the sum. The LCM is a multiple of both.']],
    }),
    num('p4', 'Find LCM(4, 6, 10).', 60, {
      h: ['4 = 2<sup>2</sup>, 6 = 2 × 3, 10 = 2 × 5. Largest exponent of each prime.'],
      s: '2<sup>2</sup> × 3 × 5 = 60.',
      w: [['120', '120 is a common multiple but 60 already works: 60 = 4 × 15 = 6 × 10 = 10 × 6.'], ['30', '30 is not a multiple of 4.']],
    }),
    num('p5', 'A school wants to seat students in groups of 4, 6 or 9 with nobody left over. What is the smallest class size that works?', 36, {
      h: ['The number must be a multiple of 4, of 6, and of 9.'],
      s: '4 = 2<sup>2</sup>, 6 = 2 × 3, 9 = 3<sup>2</sup>. LCM = 2<sup>2</sup> × 3<sup>2</sup> = 36.',
      w: [['216', '4 × 6 × 9 is a common multiple but not the smallest.'], ['18', '18 is not a multiple of 4.']],
    }),
    num('p6', 'The LCM of 12 and n is 60. What is the smallest possible value of n that is larger than 12?', 15, {
      h: ['n must divide 60 (since 60 is a multiple of n) and must bring in a factor of 5.', 'Try 15: LCM(12, 15) = ?'],
      s: 'LCM(12, 15) = 2<sup>2</sup> × 3 × 5 = 60. n must divide 60, and the divisors of 60 above 12 are 15, 20, 30 and 60. The smallest is 15.',
      w: [['5', '5 works (LCM(12, 5) = 60) but the question asks for n greater than 12.'], ['60', '60 works but is not the smallest above 12.']],
    }),
    num('p7', 'Two lights flash at the same moment. One flashes every 14 seconds and the other every 21 seconds. After how many seconds do they flash together again?', 42, {
      h: ['14 = 2 × 7 and 21 = 3 × 7.'],
      s: 'LCM = 2 × 3 × 7 = 42.',
      w: [['294', '14 × 21 counts the shared 7 twice.'], ['7', '7 divides both, but the flashing times must be multiples of both numbers.']],
    }),
  ],

  challenge: [
    chain('The three bells', 'Bell A rings every 9 minutes, bell B every 12 minutes and bell C every 18 minutes. All three ring at minute 0.', [
      num('c1a', 'After how many minutes do A and B ring together again?', 36, { h: ['LCM(9, 12).'], s: '9 = 3<sup>2</sup>, 12 = 2<sup>2</sup> × 3. LCM = 2<sup>2</sup> × 3<sup>2</sup> = 36.', w: [['108', '9 × 12 double counts the common 3.']] }),
      num('c1b', 'After how many minutes do all three ring together again?', 36, { h: ['18 = 2 × 3<sup>2</sup>. Does it change the answer?'], s: '18 is already a divisor of 36. So LCM(9, 12, 18) = 36.', w: [['72', '36 is already a multiple of 18.']] }),
      num('c1c', 'In three hours, counting after minute 0, how many times do all three ring at the same moment?', 5, { h: ['3 hours = 180 minutes. How many multiples of 36 up to 180?'], s: '180 ÷ 36 = 5, so at minutes 36, 72, 108, 144, 180: 5 times.', w: [['4', 'Minute 180 counts: 36 × 5 = 180.']] }),
    ], 'The idea: if one number is already a divisor of the LCM of the others, adding it changes nothing.'),
    chain('Fractions preview', 'We want to add {5/6} + {3/8}.', [
      num('c2a', 'What is the LCM of 6 and 8?', 24, { h: ['6 = 2 × 3, 8 = 2<sup>3</sup>.'], s: '2<sup>3</sup> × 3 = 24.' }),
      num('c2b', 'Write {5/6} with denominator 24. What is the numerator?', 20, { h: ['6 × ? = 24. Do the same to the top.'], s: '24 ÷ 6 = 4, so {5/6} = {20/24}.', w: [['5', 'You must multiply the top by the same number as the bottom (4).']] }),
      num('c2d', 'Write {3/8} with denominator 24, then add the two fractions. What is the numerator of the sum over 24?', 29, { h: ['{3/8} = {9/24}.'], s: '{20/24} + {9/24} = {29/24}. The numerator is 29.', w: [['8', 'You added the tops and the bottoms, but the pieces have different sizes before conversion.']] }),
    ], 'The idea: the LCM of the denominators is the smallest common piece size, so it keeps the numbers small.'),
    mc('c3', 'Find the error. Sam says "LCM(4, 6) is 2 because 2 goes into both." Which fix is right?', ['2 is a common <i>divisor</i> (that is the GCD idea). The LCM is a common <i>multiple</i>: 12.', 'He is right, 2 is the LCM.', 'The LCM is 24 because 4 × 6 = 24.', 'The LCM is 10 because 4 + 6 = 10.'], 0, {
      s: 'Multiples of 6: 6, 12 and 12 is a multiple of 4. LCM(4, 6) = 12. A number that goes <i>into</i> both is a divisor; a number that both go <i>into</i> is a multiple.',
      w: [[2, '24 is a common multiple but 12 is smaller.'], [3, '10 is not a multiple of either 4 or 6.']],
    }),
  ],

  quiz: [
    tpl('lcm2', (r) => { const a = r.int(4, 30); let b = r.int(4, 30); while (b === a) b = r.int(4, 30); const v = L(a, b); return N('Find LCM(' + a + ', ' + b + ').', v, { s: 'The smallest number that is a multiple of both ' + a + ' and ' + b + ' is ' + v + '.', w: a * b === v ? [] : [[a * b, a + ' × ' + b + ' = ' + a * b + ' is a common multiple, but not the least. The two numbers share a factor.']] }); }),
    tpl('lcm3', (r) => { const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 12); const v = lcm3(a, b, c); return N('Find LCM(' + a + ', ' + b + ', ' + c + ').', v, { s: 'Take the largest power of each prime that appears in any of the numbers. The result is ' + v + '.' }); }),
    tpl('groups', (r) => { const a = r.int(3, 9); let b = r.int(4, 12); while (b === a) b = r.int(4, 12); const v = L(a, b); return N(name(r) + ' wants to arrange a pile of cards either into stacks of ' + a + ' or into stacks of ' + b + ', with no cards left over. What is the smallest pile (more than 0) that works?', v, { s: 'The pile must be a multiple of ' + a + ' and ' + b + ': LCM = ' + v + '.', w: a * b === v ? [] : [[a * b, a * b + ' works but there is a smaller pile that does too.']] }); }),
    tpl('times', (r) => { const a = r.int(4, 12); let b = r.int(5, 15); while (b === a) b = r.int(5, 15); const l = L(a, b); const T = l * r.int(3, 9) + r.int(0, l - 1); const k = Math.floor(T / l); return N('A red light blinks every ' + a + ' seconds and a green light every ' + b + ' seconds. They blink together at second 0. How many more times in the next ' + T + ' seconds do they blink together? (Count second ' + T + ' if they blink then.)', k, { s: 'They coincide every LCM(' + a + ', ' + b + ') = ' + l + ' seconds. ' + T + ' ÷ ' + l + ' = ' + k + ' (whole part).', w: [[k + 1, 'Second 0 is the starting moment, not a new coincidence.']] }); }),
    tpl('recipe', (r) => { const pr = [2, 3, 5]; const e1 = pr.map(() => r.int(0, 3)), e2 = pr.map(() => r.int(0, 3)); if (e1.every((x) => x === 0)) e1[0] = 1; if (e2.every((x) => x === 0)) e2[1] = 1; const val = (e) => e.reduce((a, x, i) => a * pr[i] ** x, 1); const show = (e) => e.map((x, i) => (x ? pr[i] + (x > 1 ? '<sup>' + x + '</sup>' : '') : '')).filter(Boolean).join(' × '); const a = val(e1), b = val(e2); return N('Let A = ' + show(e1) + ' and B = ' + show(e2) + '. What is LCM(A, B)?', L(a, b), { s: 'Take the larger exponent of each prime. A = ' + a + ', B = ' + b + ', and the LCM is ' + L(a, b) + '.' }); }),
    tpl('unknown', (r) => { const a = r.pick([4, 6, 8, 9, 10, 12]), n = r.pick([2, 3, 5, 6, 7, 10, 14, 15, 20, 21]); const Lv = L(a, n); let c = 0, ans = null; for (let x = 1; x <= Lv; x++) if (L(a, x) === Lv && x > a && ans === null) ans = x; if (ans === null) return N('Find LCM(' + a + ', ' + a + ').', a, { s: 'The LCM of a number with itself is that number.' }); return N('The LCM of ' + a + ' and some number n is ' + Lv + '. What is the smallest n bigger than ' + a + ' that works?', ans, { s: 'n must divide ' + Lv + '. Test divisors above ' + a + ' in order: the first one whose LCM with ' + a + ' is ' + Lv + ' is ' + ans + '.' }); }),
    tpl('fracden', (r) => { const a = r.pick([4, 6, 8, 9, 10, 12, 14, 15]); let b = r.pick([3, 4, 5, 6, 8, 9, 10, 12]); while (b === a) b = r.pick([3, 4, 5, 6, 8, 9, 10, 12]); return N('To add {1/' + a + '} + {1/' + b + '} you want the smallest common denominator. What is it?', L(a, b), { s: 'The smallest common denominator is LCM(' + a + ', ' + b + ') = ' + L(a, b) + '.', w: a * b === L(a, b) ? [] : [[a * b, 'That works but is not the smallest.']] }); }),
  ],
});
