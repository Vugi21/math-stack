import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm } from '../../../../src/content/dsl.js';

const fac = (n) => { const f = {}; let m = n; for (let p = 2; p * p <= m; p++) while (m % p === 0) { f[p] = (f[p] || 0) + 1; m /= p; } if (m > 1) f[m] = (f[m] || 0) + 1; return f; };
const show = (f) => Object.keys(f).map(Number).sort((a, b) => a - b).map((p) => (f[p] > 1 ? p + '<sup>' + f[p] + '</sup>' : String(p))).join(' × ');
const zeros = (n) => { let c = 0; while (n % 10 === 0) { n /= 10; c++; } return c; };
const PRS = [2, 3, 5, 7];

export default lesson({
  id: 'pre-3-4-prime-factorization',
  title: 'Prime factorization',
  blurb: 'Every whole number above 1 is built from primes in exactly one way. Learn to read that recipe and put it to work.',
  concepts: ['prime-factorization', 'factor-tree', 'perfect-squares'],

  tryFirst: [
    num('t1', 'Break 36 into smaller factors, and keep breaking until every factor is a prime number that cannot be broken any further. How many prime factors are in your final product? (Count repeated primes each time.)', 4, {
      h: ['36 = 4 × 9. Can 4 be broken further? Can 9?'],
      s: '36 = 4 × 9 = (2 × 2) × (3 × 3), four primes. Starting with 6 × 6 or 2 × 18 gives the same four.',
      w: [['2', 'You stopped at 4 × 9 or counted only distinct primes 2 and 3. Count every copy: 2, 2, 3, 3.'], ['3', '36 = 2 × 2 × 3 × 3 has four factors. Do not skip a repeated one.']],
    }),
    num('t2', 'Mia breaks 60 as 6 × 10. Noah breaks it as 4 × 15. Both keep going until only primes are left. How many 2s does each of them end up with?', 2, {
      h: ['Mia: 6 = 2 × 3 and 10 = 2 × 5.', 'Noah: 4 = 2 × 2 and 15 = 3 × 5.'],
      s: 'Mia: 2 × 3 × 2 × 5 has two 2s. Noah: 2 × 2 × 3 × 5 has two 2s. They both get 2 × 2 × 3 × 5.',
      w: [['1', 'Look again: 6 contributes one 2 and 10 contributes another one.']],
    }),
  ],

  learn: [
    p('Here is something that sounds too good to be true: if you break a number all the way into primes, you always get the <i>same</i> primes, no matter how you started. A <b>factor tree</b> is a way to do it. Pick any two factors, then break each one, until every branch ends in a prime.'),
    widget('factorTree', { n: 60 }),
    rule('<b>Prime factorization.</b> Every whole number greater than 1 is either prime or can be written as a product of primes, and this product is the same for everyone, apart from the order. We usually write it with exponents: 360 = 2<sup>3</sup> × 3<sup>2</sup> × 5.'),
    ex('Build a factor tree for 360', ['360 = 36 × 10.', '36 = 6 × 6 = (2 × 3) × (2 × 3). And 10 = 2 × 5.', 'Collect the primes: 2 × 3 × 2 × 3 × 2 × 5.', 'Count: three 2s, two 3s, one 5. So 360 = 2<sup>3</sup> × 3<sup>2</sup> × 5.']),
    ex('Reading the recipe: divisibility', ['Is 360 divisible by 45? 45 = 3<sup>2</sup> × 5.', 'The recipe for 360 contains 3<sup>2</sup> and a 5, so everything 45 needs is there.', 'The leftover is 2<sup>3</sup> = 8, so 360 ÷ 45 = 8. A number is divisible by another exactly when its recipe contains the other\'s recipe.']),
    ex('Reading the recipe: perfect squares', ['144 = 2<sup>4</sup> × 3<sup>2</sup>. Both exponents are even.', 'So 144 = (2<sup>2</sup> × 3)<sup>2</sup> = 12<sup>2</sup>.', 'A number is a perfect square exactly when every prime in its recipe has an even exponent. 180 = 2<sup>2</sup> × 3<sup>2</sup> × 5 is not, because of the single 5.']),
    tbl(['Number', 'Prime factorization'], [['12', '2<sup>2</sup> × 3'], ['100', '2<sup>2</sup> × 5<sup>2</sup>'], ['210', '2 × 3 × 5 × 7'], ['1024', '2<sup>10</sup>']], 'A few recipes'),
    warn('<b>Watch out.</b> 60 = 6 × 10 is a factoring, but not the <i>prime</i> factorization: 6 and 10 are still composite. Keep going until every factor is prime: 2<sup>2</sup> × 3 × 5.'),
    mcq('Dev says "the prime factorization of 60 is 6 × 10." What is missing?', ['Nothing, it is correct.', '6 and 10 are not prime. Break them further: 60 = 2 × 2 × 3 × 5 = 2<sup>2</sup> × 3 × 5.', 'It should be 60 × 1.'], 1, 'Prime factorization means every factor is a prime. 6 = 2 × 3 and 10 = 2 × 5.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Add up all the prime factors of 84, counting repeats. (84 = 2 × 2 × 3 × 7.)', 14, {
      h: ['2 + 2 + 3 + 7.'],
      s: '2 + 2 + 3 + 7 = 14.',
      w: [['12', 'The 2 appears twice. Count it twice.'], ['84', 'That is the product. The question asks for the sum.']],
    }),
    num('p2', 'How many prime factors does 360 have, counting repeats?', 6, {
      h: ['360 = 2<sup>3</sup> × 3<sup>2</sup> × 5. Add the exponents (a lone 5 counts 1).'],
      s: '3 + 2 + 1 = 6.',
      w: [['3', 'That counts only the different primes 2, 3, 5. Count repeats: 2, 2, 2, 3, 3, 5.']],
    }),
    num('p3', 'What number is 2<sup>3</sup> × 3 × 5<sup>2</sup>?', 600, {
      h: ['8 × 3 = 24, then times 25.'],
      s: '8 × 3 × 25 = 24 × 25 = 600.',
      w: [['30', 'That is 2 × 3 × 5. The exponents mean 2<sup>3</sup> = 8 and 5<sup>2</sup> = 25.'], ['300', 'That is 4 × 3 × 25. 2<sup>3</sup> is 2 × 2 × 2 = 8, not 4.']],
    }),
    mc('p4', 'Which is the prime factorization of 180?', ['4 × 9 × 5', '2<sup>2</sup> × 3<sup>2</sup> × 5', '2 × 3 × 30', '2<sup>2</sup> × 3 × 15'], 1, {
      h: ['A prime factorization uses only primes.'],
      s: '180 = 4 × 45 = 4 × 9 × 5 = 2<sup>2</sup> × 3<sup>2</sup> × 5. The others contain composite factors (4, 9, 30, 15).',
      w: [[0, '4 and 9 are not prime.'], [2, '30 is not prime.'], [3, '15 is not prime.']],
    }),
    num('p5', 'What is the smallest whole number you can multiply 72 by to get a perfect square?', 2, {
      h: ['Write 72 = 2<sup>3</sup> × 3<sup>2</sup>. Which exponent is odd?'],
      s: 'The exponent of 2 is odd (3). Multiply by one more 2: 72 × 2 = 144 = 12<sup>2</sup>.',
      w: [['8', '72 × 8 = 576 = 24<sup>2</sup> is a square, but a smaller multiplier works.'], ['3', '72 × 3 = 216, which is not a square (216 = 2<sup>3</sup> × 3<sup>3</sup>).']],
    }),
    num('p6', 'How many zeros are at the end of the number 15 × 16 × 25 when it is fully multiplied out? (Think about 2s and 5s.)', 3, {
      h: ['Each zero at the end needs one factor 10 = 2 × 5.', '15 = 3 × 5, 16 = 2<sup>4</sup>, 25 = 5<sup>2</sup>. Count the 2s and the 5s.'],
      s: 'There are three 5s (one from 15, two from 25) and four 2s. We can make three pairs (2, 5), so three zeros. 15 × 16 × 25 = 6000.',
      w: [['2', 'There are three 5s: one in 15 and two in 25.'], ['4', 'There are four 2s but only three 5s. You need a pair for each zero.']],
    }),
    num('p7', 'What is the smallest whole number that has exactly three <i>different</i> prime factors?', 30, {
      h: ['Use the three smallest primes, each once.'],
      s: '2 × 3 × 5 = 30.',
      w: [['12', '12 = 2<sup>2</sup> × 3 has only two different primes.'], ['8', '8 = 2<sup>3</sup> has just one prime, repeated.']],
    }),
  ],

  challenge: [
    chain('Inside 360', 'We know 360 = 2<sup>3</sup> × 3<sup>2</sup> × 5.', [
      num('c1a', 'What is 360 ÷ 45? (Use the recipe: 45 = 3<sup>2</sup> × 5.)', 8, { h: ['Cross out the primes of 45 from the recipe of 360.'], s: 'Left over: 2<sup>3</sup> = 8.', w: [['9', 'After removing 3<sup>2</sup> × 5, the leftover is 2<sup>3</sup>.']] }),
      num('c1b', 'What is the largest perfect square that divides 360?', 36, { h: ['A square needs even exponents. Take the largest even exponent that fits for each prime.'], s: '2<sup>2</sup> × 3<sup>2</sup> = 4 × 9 = 36. We cannot use the 5 (only one of it) and we use only two of the three 2s.', w: [['72', '72 = 2<sup>3</sup> × 3<sup>2</sup> has an odd exponent, so it is not a square.']] }),
      num('c1c', 'What is the smallest number you can multiply 360 by to get a perfect square?', 10, { h: ['Odd exponents: 2<sup>3</sup> and 5<sup>1</sup>.'], s: 'Add one 2 and one 5: multiply by 2 × 5 = 10. 360 × 10 = 3600 = 60<sup>2</sup>.', w: [['2', '720 = 2<sup>4</sup> × 3<sup>2</sup> × 5 still has a lone 5.'], ['5', '1800 = 2<sup>3</sup> × 3<sup>2</sup> × 5<sup>2</sup> still has an odd power of 2.']] }),
    ], 'The idea: odd exponents are the "problem spots" for squares. Fix each one by multiplying in one more copy of that prime.'),
    chain('Same recipe, new number', 'Let us see how recipes combine.', [
      num('c2a', 'In the prime factorization of 48, what is the exponent of 2?', 4, { h: ['48 = 16 × 3.'], s: '48 = 2<sup>4</sup> × 3.' }),
      num('c2b', 'In the prime factorization of 576 = 48 × 12, what is the exponent of 2?', 6, { h: ['12 = 2<sup>2</sup> × 3. Multiplying numbers adds exponents of the same prime.'], s: '2<sup>4</sup> × 2<sup>2</sup> = 2<sup>6</sup>. (576 = 2<sup>6</sup> × 3<sup>2</sup>.)', w: [['8', 'Exponents add when you multiply: 4 + 2 = 6.']] }),
      num('c2c', 'Since 576 = 2<sup>6</sup> × 3<sup>2</sup> has only even exponents, it is a perfect square. What is its square root?', 24, { h: ['Halve each exponent.'], s: 'Halving the exponents gives 2<sup>3</sup> × 3 = 24. Check: 24 × 24 = 576.', w: [['288', 'That is half of 576. A square root halves the exponents, not the number.']] }),
    ], 'The idea: multiplying numbers adds the exponents in their recipes; taking a square root halves them.'),
    mc('c3', 'Find the error. Priya says "I factored 100 as 10 × 10, and Leo says 4 × 25. Different answers, so 100 has two different prime factorizations." What is wrong?', ['Neither is a prime factorization yet. Breaking both fully gives 2 × 5 × 2 × 5 = 2<sup>2</sup> × 5<sup>2</sup> in each case.', 'Priya is right: factorizations are not unique.', 'Leo is wrong because 25 is not a factor of 100.', 'Only 10 × 10 is valid.'], 0, {
      s: '10 × 10 = (2 × 5) × (2 × 5) and 4 × 25 = (2 × 2) × (5 × 5). Both reach 2<sup>2</sup> × 5<sup>2</sup>. The prime recipe is unique.',
      w: [[1, 'The prime recipe is the same every time; only the first split differs.'], [2, '100 = 4 × 25 is correct.']],
    }),
  ],

  quiz: [
    tpl('expo', (r) => { const a = r.int(1, 4), b = r.int(0, 3), c = r.int(0, 2), d = r.int(0, 1); const n = 2 ** a * 3 ** b * 5 ** c * 7 ** d; const f = fac(n); const q = r.pick(Object.keys(f)); return N('What is the exponent of ' + q + ' in the prime factorization of ' + n + '?', f[q], { s: n + ' = ' + show(f) + ', so ' + q + ' appears ' + f[q] + (f[q] === 1 ? ' time' : ' times') + '.' }); }),
    tpl('value', (r) => { const a = r.int(1, 5), b = r.int(1, 3), c = r.pick([5, 7, 11]), e = r.int(1, 2); const f = { 2: a, 3: b }; f[c] = e; const v = 2 ** a * 3 ** b * c ** e; return N('Multiply out 2<sup>' + a + '</sup> × 3<sup>' + b + '</sup> × ' + c + '<sup>' + e + '</sup>.', v, { s: 2 ** a + ' × ' + 3 ** b + ' × ' + c ** e + ' = ' + v + '.' }); }),
    tpl('count', (r) => { const a = r.int(1, 4), b = r.int(0, 3), c = r.int(0, 2), d = r.int(0, 2); const n = 2 ** a * 3 ** b * 5 ** c * 7 ** d; const f = fac(n); const total = Object.values(f).reduce((x, y) => x + y, 0); const dist = Object.keys(f).length; return N('How many prime factors does ' + n + ' have, counting repeats? (Example: 12 = 2 × 2 × 3 has three.)', total, { s: n + ' = ' + show(f) + '. Adding the exponents: ' + total + '.', w: dist === total ? [] : [[dist, 'That counts only the different primes. Count each repeat as well.']] }); }),
    tpl('sumprimes', (r) => { const a = r.int(1, 3), b = r.int(0, 2), c = r.int(0, 1), d = r.int(0, 1), e = r.int(0, 1); const n = 2 ** a * 3 ** b * 5 ** c * 7 ** d * 11 ** e; const f = fac(n); const s = Object.keys(f).reduce((x, y) => x + +y, 0); return N('Add up the <i>different</i> primes in the prime factorization of ' + n + '.', s, { s: n + ' = ' + show(f) + '. The different primes are ' + Object.keys(f).join(', ') + ', sum ' + s + '.' }); }),
    tpl('squaremult', (r) => { const sf = r.pick([1, 2, 3, 5, 6, 7, 10, 11, 14, 15]); const sq = r.int(2, 12); const n = sf * sq * sq; const f = fac(n); let k = 1; for (const q of Object.keys(f)) if (f[q] % 2) k *= +q; return N('What is the smallest whole number you can multiply ' + n + ' by to get a perfect square?', k, { s: n + ' = ' + show(f) + '. Multiply by one more of each prime whose exponent is odd: ' + k + '.', w: k === 1 ? [] : [[n, 'Multiplying by ' + n + ' itself gives a square but not the smallest multiplier.']] }); }),
    tpl('zeros', (r) => { const pool = [5, 10, 15, 16, 20, 25, 24, 30, 35, 40, 45, 50, 64, 75, 125, 8, 12, 14, 18]; const [i, j, k] = r.distinct(3, 0, pool.length - 1); const a = pool[i], b = pool[j], c = pool[k]; const v = a * b * c; return N('How many zeros are at the end of ' + a + ' × ' + b + ' × ' + c + ' when it is multiplied out?', zeros(v), { s: a + ' × ' + b + ' × ' + c + ' = ' + v + '. Each zero comes from a pair 2 × 5 in the prime factors.' }); }),
    tpl('which', (r) => { const a = r.int(1, 4), b = r.int(1, 3), c = r.int(0, 2); const n = 2 ** a * 3 ** b * 5 ** c; const f = fac(n); const right = show(f); const wr = []; const comp = [4, 6, 9, 10, 12, 15]; wr.push(n / 4 === Math.floor(n / 4) ? '4 × ' + n / 4 : '2 × ' + n / 2); const fac2 = Object.assign({}, f); fac2[2] = (fac2[2] || 0) + 1; wr.push(show(fac2)); const f3 = Object.assign({}, f); f3[3] = (f3[3] || 0) + 1; wr.push(show(f3)); const set2 = [...new Set(wr)].filter((x) => x !== right); if (set2.length < 3) set2.push('2 × ' + n / 2 + ' × 1'); return choice(r, 'Which of these is the prime factorization of ' + n + '?', right, set2.slice(0, 3), { s: n + ' = ' + right + '. The others either have extra factors or contain composite factors.' }); }),
    tpl('bigsq', (r) => { const sf = r.pick([2, 3, 5, 6, 7, 10, 11]); const sq = r.int(2, 10); const n = sf * sq * sq; const f = fac(n); let s = 1; for (const q of Object.keys(f)) s *= (+q) ** (2 * Math.floor(f[q] / 2)); return N('What is the largest perfect square that divides ' + n + '?', s, { s: n + ' = ' + show(f) + '. Use the largest even exponent for each prime: ' + s + '.', w: [[sq, sq + ' is the square root of the square, not the square itself.']].filter((x) => x[0] !== s) }); }),
  ],
});
