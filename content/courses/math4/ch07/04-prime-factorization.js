import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const fac = (n) => { const f = {}; let m = n; for (let q = 2; m > 1; q++) while (m % q === 0) { f[q] = (f[q] || 0) + 1; m /= q; } return f; };
const sup = (e) => (e > 1 ? '^[' + e + ']' : '');
const expForm = (n) => Object.entries(fac(n)).map(([q, e]) => q + sup(e)).join(' × ');
const nfac = (n) => Object.values(fac(n)).reduce((a, e) => a * (e + 1), 1);
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));
const sqMult = (n) => Object.entries(fac(n)).reduce((a, [q, e]) => (e % 2 ? a * q : a), 1);

export default lesson({
  id: 'm4-7-4-prime-factorization',
  title: 'Prime factorization',
  blurb: 'Break a number into primes with a factor tree, write it with exponents, and use it to count factors and spot squares.',
  concepts: ['prime-factorization', 'exponents', 'square-numbers'],

  tryFirst: [
    num('t1', 'Write 72 as a product of primes only, such as 2 × 2 × 2 × 3 × 3. How many primes are in your product, counting repeats?', 5, {
      h: ['Split 72 into 8 × 9, then split 8 and 9 further.', 'Keep splitting until every number is prime.'],
      s: '72 = 8 × 9 = (2 × 2 × 2) × (3 × 3). That is 5 primes.',
      w: [['2', 'There are two different primes, but the question counts repeats: 2 × 2 × 2 × 3 × 3.'], ['4', 'Check that every factor is prime. 4 and 6 are not prime.']],
    }),
    num('t2', 'What is the smallest number you can multiply 12 by to get a square number?', 3, {
      h: ['12 = 2 × 2 × 3. Squares use each prime an even number of times.'],
      s: '12 = 2 × 2 × 3. The 2s are a pair, but the 3 is alone. Multiply by 3: 12 × 3 = 36 = 6 × 6.',
      w: [['2', '12 × 2 = 24, which is not a square.'], ['12', '12 × 12 = 144 is a square, but a smaller multiplier works.']],
    }),
  ],

  learn: [
    p('Every number bigger than 1 can be built by multiplying primes. This is its <b>prime factorization</b>.'),
    p('A <b>factor tree</b> finds it. Split the number into two factors. Split any factor that is not prime. Stop when every branch ends in a prime.'),
    ex('Factor tree for 180', ['180 = 18 × 10.', '18 = 2 × 9 and 10 = 2 × 5. Now 9 = 3 × 3.', 'The primes at the ends: 2, 3, 3, 2, 5.', 'Write them in order: 180 = 2 × 2 × 3 × 3 × 5.']),
    widget('factorTree', { n: 180 }),
    rule('<b>Exponents.</b> When a prime repeats we count it with a small raised number. 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5. The raised number is the <b>exponent</b>. It tells how many times the prime appears.'),
    rule('<b>One answer only.</b> No matter how you split the tree, you get the same primes at the end. 180 can start as 18 × 10 or 4 × 45 or 6 × 30. It always ends as 2² × 3² × 5. This is called unique factorization.'),
    ex('Count the factors of 180', ['180 = 2² × 3² × 5.', 'A factor uses 0, 1, or 2 twos: 3 choices.', 'It uses 0, 1, or 2 threes: 3 choices.', 'It uses 0 or 1 fives: 2 choices.', 'Total: 3 × 3 × 2 = 18 factors.']),
    rule('<b>Counting factors.</b> Add 1 to each exponent. Multiply the results. For 2² × 3² × 5 that is 3 × 3 × 2 = 18.'),
    rule('<b>Squares.</b> A number is a square when every exponent is even. 36 = 2² × 3² is a square. 72 = 2³ × 3² is not, because of the 3 in 2³.'),
    warn('<b>Watch out.</b> A factor tree must end in primes only. 2 × 6 × 5 is not a prime factorization of 60, because 6 can still be split.'),
    mcq('Pia says: "The prime factorization of 24 is 2 × 3 × 4." What is wrong?', ['Nothing, 2 × 3 × 4 = 24.', '4 is not prime. It splits into 2 × 2, so the answer is 2 × 2 × 2 × 3 = 2³ × 3.', 'The factorization should use only odd numbers.'], 1, 'The product is right, but a prime factorization may only use primes. 4 = 2 × 2.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'How many primes are in the prime factorization of 90, counting repeats?', 4, {
      h: ['90 = 9 × 10. Split both.'],
      s: '90 = 2 × 3 × 3 × 5. That is 4 primes.',
      w: [['3', '90 = 2 × 3² × 5. The 3 appears twice. Count it twice.']],
    }),
    set('p2', 'Which different primes divide 210? List them, separated by commas.', '2,3,5,7', {
      h: ['210 = 21 × 10.'],
      s: '210 = 2 × 3 × 5 × 7. The primes are 2, 3, 5, 7.',
      w: [['2,3,5', 'Look again: 21 = 3 × 7.'], ['2,3,7', '10 = 2 × 5, so 5 is there too.']],
    }),
    num('p3', 'How many factors does 360 have? (360 = 2³ × 3² × 5.)', 24, {
      h: ['Add 1 to each exponent: 3 + 1, 2 + 1, 1 + 1. Multiply.'],
      s: '4 × 3 × 2 = 24.',
      w: [['6', 'You added the exponents. You need to add 1 to each and then multiply.'], ['12', 'You may have left out one prime. All three primes count.']],
    }),
    num('p4', 'What is the smallest number that 50 can be multiplied by to give a square?', 2, {
      h: ['50 = 2 × 5 × 5.'],
      s: 'The two 5s make a pair. The 2 is alone. 50 × 2 = 100 = 10 × 10.',
      w: [['5', '50 × 5 = 250. It is not a square.']],
    }),
    num('p5', 'What is the smallest number with exactly 12 factors?', 60, {
      h: ['12 = 3 × 4 × 1, or 2 × 2 × 3, or 2 × 6, or 12. Which exponents give those?', 'Try 2² × 3 × 5.'],
      s: '2² × 3 × 5 = 60 has 3 × 2 × 2 = 12 factors. Smaller numbers: 36 has 9, 48 has 10, 54 has 8, 56 has 8. So 60.',
      w: [['72', '72 has 12 factors, but 60 is smaller and also has 12.'], ['48', '48 = 2⁴ × 3 has 5 × 2 = 10 factors.']],
    }),
    num('p6', 'What is the smallest number with exactly 10 factors?', 48, {
      h: ['10 = 2 × 5. So the exponents are 4 and 1, or 9.', 'Try 2⁴ × 3.'],
      s: '2⁴ × 3 = 48 has 5 × 2 = 10 factors. The other shape, 2⁹ = 512, is much bigger.',
      w: [['36', '36 has 9 factors.'], ['512', '512 = 2⁹ works, but 48 is much smaller.']],
    }),
    mc('p7', 'Which of these numbers is a square?', ['2² × 3³', '2⁴ × 3² × 5²', '2² × 3² × 5', '2³ × 5²'], 1, {
      h: ['A square has only even exponents.'],
      s: '2⁴ × 3² × 5² has exponents 4, 2, 2, all even. So it is (2² × 3 × 5)².',
      w: [[0, 'The exponent 3 is odd.'], [2, 'The 5 has exponent 1. That is odd.'], [3, 'The exponent 3 on the 2 is odd.']],
    }),
    mc('p8', 'Which is the prime factorization of 60?', ['6 × 10', '2 × 3 × 10', '2² × 3 × 5', '2 × 2 × 15'], 2, {
      h: ['Every factor must be prime.'],
      s: '60 = 2 × 2 × 3 × 5 = 2² × 3 × 5. The others still contain 6, 10, or 15.',
      w: [[0, '6 and 10 are not prime.'], [3, '15 = 3 × 5 can still be split.']],
    }),
  ],

  challenge: [
    chain('Even and odd factors', 'Look at the number 36 = 2² × 3².', [
      num('c1a', 'How many factors does 36 have?', 9, { h: ['Add 1 to each exponent and multiply.'], s: '3 × 3 = 9.' }),
      num('c1b', 'How many of them are odd? (An odd factor uses no 2s.)', 3, { h: ['An odd factor is built from 3s only: 1, 3, 9.'], s: 'The odd factors come from 3²: 1, 3, 9. That is 3.' }),
      num('c1c', 'How many of the factors of 360 = 2³ × 3² × 5 are odd?', 6, { h: ['Odd factors come from 3² × 5 only.'], s: 'Factors of 3² × 5: 3 × 2 = 6 (these are 1, 3, 5, 9, 15, 45).' }),
    ], 'The idea: to count a certain kind of factor, build it from the allowed primes only.'),
    chain('Square hunt', 'A multiple of a number is a square if every exponent is even.', [
      num('c2a', 'What is the smallest number to multiply 72 by to get a square?', 2, { h: ['72 = 2³ × 3². Which prime has an odd exponent?'], s: '2³ is odd. One more 2 gives 2⁴ × 3² = 144, a square.' }),
      num('c2b', 'What is the smallest number to multiply 180 by to get a square?', 5, { h: ['180 = 2² × 3² × 5.'], s: 'Only 5 has an odd exponent. Multiply by 5.' }),
      num('c2c', 'What is the smallest square number that is a multiple of 180?', 900, { h: ['Use the answer to the previous part.'], s: '180 × 5 = 900 = 30 × 30.' }),
    ], 'The idea: find the primes with odd exponents. Multiply by exactly those primes to make the exponents even.'),
    mc('c3', 'Find the error. Raj says: "The factor tree of 48 starting with 6 × 8 gives 2 × 3 × 2 × 2 × 2. A tree starting with 4 × 12 gives something different, so 48 has two prime factorizations." Which best explains the error?', ['The trees give the same primes. Raj may have miscounted.', 'Raj is right.', 'The second tree must be wrong.', '48 is prime.'], 0, {
      s: '6 × 8 gives 2 × 3 × 2 × 2 × 2 = 2⁴ × 3. 4 × 12 gives 2 × 2 × 2 × 2 × 3 = 2⁴ × 3. The same. Unique factorization.',
      w: [[1, 'Both trees end in four 2s and one 3.'], [3, '48 = 6 × 8.']],
    }),
  ],

  quiz: [
    tpl('countp', (r) => {
      const n = r.int(12, 200);
      const f = fac(n), c = Object.values(f).reduce((a, e) => a + e, 0);
      if (c === 1) return N('How many primes are in the prime factorization of ' + (n * 2) + ', counting repeats?', Object.values(fac(n * 2)).reduce((a, e) => a + e, 0), { s: expForm(n * 2) });
      return N('How many primes are in the prime factorization of ' + n + ', counting repeats?', c, { s: n + ' = ' + expForm(n) + '. Adding the exponents: ' + c + '.', w: keep([[Object.keys(f).length, 'That counts different primes. Count repeats too.']], c) });
    }),
    tpl('nfac', (r) => {
      const n = r.int(20, 250);
      const k = nfac(n);
      return N('How many factors does ' + n + ' have?', k, { s: n + ' = ' + expForm(n) + '. Add 1 to each exponent and multiply: ' + k + '.', w: keep([[Object.values(fac(n)).reduce((a, e) => a + e, 0), 'You added exponents. Add 1 to each exponent, then multiply.']], k) });
    }),
    tpl('sqmult', (r) => {
      const n = r.int(8, 150);
      const k = sqMult(n);
      if (k === 1) return N('What is the smallest number to multiply ' + n + ' by to get a square?', 1, { s: n + ' is already a square, so multiplying by 1 is enough.' });
      return N('What is the smallest number to multiply ' + n + ' by to get a square?', k, { s: n + ' = ' + expForm(n) + '. Multiply by the primes with odd exponents: ' + k + '. ' + n + ' × ' + k + ' = ' + n * k + '.' });
    }),
    tpl('build', (r) => {
      const a = r.int(1, 4), b = r.int(1, 3), c = r.int(0, 2);
      const v = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c);
      const f = '2' + sup(a) + ' × 3' + sup(b) + (c ? ' × 5' + sup(c) : '');
      return N('What number is ' + f + '?', v, { s: 'Multiply the powers: ' + v + '.' });
    }),
    tpl('sumprimes', (r) => {
      const n = r.int(20, 300);
      const ps = Object.keys(fac(n)).map(Number);
      const v = ps.reduce((a, x) => a + x, 0);
      return N('Add up the different primes that divide ' + n + '. (Use each prime once.)', v, { s: n + ' = ' + expForm(n) + '. ' + ps.join(' + ') + ' = ' + v + '.' });
    }),
    tpl('smallsq', (r) => {
      const n = r.int(6, 80);
      const k = sqMult(n);
      return N('What is the smallest square number that is a multiple of ' + n + '?', n * k, { s: n + ' = ' + expForm(n) + '. Multiply by ' + k + ' to make all exponents even: ' + n * k + '.', w: keep([[n * n, n + ' × ' + n + ' is a square, but a smaller one works.']], n * k) });
    }),
    tpl('oddf', (r) => {
      const b = r.int(1, 3), c = r.int(1, 3), a = r.int(1, 5);
      const n = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c);
      const v = (b + 1) * (c + 1);
      return N('How many of the factors of ' + n + ' are odd?', v, { s: n + ' = ' + expForm(n) + '. Odd factors use no 2s: ' + (b + 1) + ' × ' + (c + 1) + ' = ' + v + '.', w: keep([[nfac(n), 'That counts all the factors. Only odd ones use no 2s.']], v) });
    }),
  ],
});
