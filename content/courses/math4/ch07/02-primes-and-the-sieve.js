import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const primesIn = (a, b) => { const o = []; for (let i = a; i <= b; i++) if (isPrime(i)) o.push(i); return o; };
const smallest = (n) => { for (let i = 2; i * i <= n; i++) if (n % i === 0) return i; return n; };
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));

export default lesson({
  id: 'm4-7-2-primes-and-the-sieve',
  title: 'Primes and the sieve',
  blurb: 'Prime and composite numbers, the sieve of Eratosthenes, and how to test whether a number is prime.',
  concepts: ['primes', 'composites', 'sieve'],

  tryFirst: [
    num('t1', 'A prime number has exactly two factors: 1 and itself. How many primes are there between 1 and 20?', 8, {
      h: ['Check each number. 2 has factors 1 and 2 only.', 'Is 9 prime? Is 15?'],
      s: 'The primes up to 20 are 2, 3, 5, 7, 11, 13, 17, 19. That is 8.',
      w: [['9', 'Did you count 1? 1 has only one factor, so it is not prime.'], ['10', 'Check the odd numbers 9 and 15. Each has a factor besides 1 and itself.']],
    }),
    num('t2', 'Is 91 prime? If not, give its smallest factor bigger than 1. If it is prime, answer 91.', 7, {
      h: ['It looks prime. Try dividing by 2, 3, 5, 7.'],
      s: '91 = 7 × 13, so it is not prime. The smallest factor over 1 is 7.',
      w: [['91', '91 is 7 × 13. Test 7.']],
    }),
  ],

  learn: [
    p('Some numbers can be split into equal groups in many ways. Others can be split only in the most boring way. Sorting numbers by how many factors they have gives us the most important family in arithmetic: the primes.'),
    def('prime number', 'A number with <b>exactly two</b> factors: 1 and itself. 7 is prime because only 1 and 7 divide it.'),
    def('composite number', 'A number with <b>more than two</b> factors. 12 is composite. Its factors are 1, 2, 3, 4, 6, 12.'),
    rule('<b>The number 1 is neither.</b> It has only one factor, itself. A prime needs exactly two factors. A composite needs more than two. So 1 is neither prime nor composite.'),
    tbl(['Number', 'Factors', 'Kind'], [['1', '1', 'neither'], ['2', '1, 2', 'prime'], ['9', '1, 3, 9', 'composite'], ['13', '1, 13', 'prime'], ['15', '1, 3, 5, 15', 'composite']], 'Sorting numbers by their factors'),
    p('The primes up to 30 are 2, 3, 5, 7, 11, 13, 17, 19, 23 and 29. A prime number of dots can be arranged only in one straight row. A composite number of dots can also be arranged in a rectangle with two or more rows.'),
    def('sieve of Eratosthenes', 'A way to find all the primes up to a limit. Cross out 1. Keep 2 and cross out its other multiples. Keep the next number that is not crossed out, and cross out its other multiples. Keep going. The numbers left are the primes.'),
    widget('sieve', {}),
    p('Use the slider. After 2, 3, 5, and 7 are used, the numbers left are the primes up to 100. There are 25.'),
    tip('For the sieve up to 100 you only need to cross out multiples of 2, 3, 5 and 7. The next prime is 11, and 11 × 11 = 121 is already past 100.'),
    rule('<b>Testing one number.</b> To see if n is prime, try dividing by the primes 2, 3, 5, 7, … You can stop when the prime you try, times itself, is bigger than n. If none divides n, then n is prime.'),
    ex('Is 97 prime?', ['Try 2: 97 is odd. Try 3: 9 + 7 = 16, not a multiple of 3.', 'Try 5: it does not end in 0 or 5. Try 7: 7 × 13 = 91, 7 × 14 = 98. No.', 'Next prime is 11. But 11 × 11 = 121 is bigger than 97. Stop.', 'No prime up to 7 divides 97, so 97 is prime.']),
    p('Why can we stop? Suppose 97 = a × b with a smaller than b. Then a × a is less than 97. So the smaller factor is a number whose square is under 97, and we have already tested all of those.'),
    ex('Is 119 prime?', ['Try 2: 119 is odd. Try 3: 1 + 1 + 9 = 11, not a multiple of 3. Try 5: it ends in 9.', 'Try 7: 7 × 17 = 119. It divides exactly.', 'So 119 = 7 × 17 and it is composite. It looks prime, but it is not.']),
    key('A number is composite as soon as you find <b>one</b> factor besides 1 and itself. To prove a number is prime you must test every prime up to the stopping point.'),
    warn('<b>Watch out.</b> 2 is the only even prime. Every other even number has the factor 2. Also, odd does not mean prime: 9, 15, 21, 25 are odd and composite.'),
    mcq('Ravi says: "51 is prime. It is not even, and it does not end in 5." What is wrong?', ['Nothing. 51 is prime.', '3 × 17 = 51, so 51 has a factor besides 1 and itself.', '51 is even.'], 1, 'Add the digits: 5 + 1 = 6, a multiple of 3. So 3 divides 51. Always test 3.', 'Spot the mistake'),
    recap([['prime', 'exactly two factors: 1 and itself'], ['composite', 'more than two factors'], ['1', 'neither prime nor composite'], ['sieve', 'cross out multiples to leave the primes']], [['Primes up to 30', '2, 3, 5, 7, 11, 13, 17, 19, 23, 29'], ['Primes up to 100', '25 of them'], ['Prime test', 'try primes p while p × p ≤ n']]),
  ],

  practice: [
    set('p1', 'List all the primes between 30 and 50.', '31,37,41,43,47', {
      h: ['Cross out the evens and anything ending in 5.', 'Test the rest with 3 and 7.'],
      s: '31, 37, 41, 43, 47 are prime. 33 = 3×11, 35 = 5×7, 39 = 3×13, 45 = 5×9, 49 = 7×7.',
      w: [['31,37,41,43,47,49', '49 = 7 × 7, so it is composite.'], ['31,37,41,43', 'Check 47 too: no prime up to 7 divides it.']],
    }),
    num('p2', 'What is the smallest prime that is greater than 100?', 101, {
      h: ['Test 101. Primes to try: 2, 3, 5, 7. (11 × 11 is already over 101.)'],
      s: '101 is odd, its digit sum is 2, it does not end in 5, and 7 × 14 = 98 leaves 3. So 101 is prime.',
      w: [['103', '103 is prime, but 101 comes first. Test 101.'], ['102', '102 is even.']],
    }),
    num('p3', 'Two primes differ by 6 and add up to 40. What is the larger one?', 23, {
      h: ['Their average is 20. The primes are 3 below and 3 above 20.'],
      s: 'Average 20, difference 6: the numbers are 17 and 23. Both are prime. The larger is 23.',
      w: [['17', '17 is the smaller one.']],
    }),
    num('p4', 'How many composite numbers are there from 1 to 30?', 19, {
      h: ['There are 30 numbers. Take away 1, then take away the primes.', 'The primes up to 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.'],
      s: '30 numbers, minus 1 (neither), minus 10 primes. 30 − 1 − 10 = 19.',
      w: [['20', 'The number 1 is not composite. Take it away too.'], ['10', 'That is the number of primes.']],
    }),
    num('p5', 'Find a prime p so that p, p + 2, and p + 4 are all prime. What is p?', 3, {
      h: ['Try p = 2: 2, 4, 6. Try p = 3.', 'Among any three numbers like these, one is a multiple of 3.'],
      s: '3, 5, 7 are all prime. This is the only time it works, because one of p, p+2, p+4 is always a multiple of 3.',
      w: [['5', '5, 7, 9: 9 is not prime.'], ['2', '2, 4, 6: not prime.']],
    }),
    num('p6', 'A rectangle of 29 square tiles can be built in only one way. How many tiles are in its long side?', 29, {
      h: ['A rectangle needs a factor pair. What are the factors of 29?'],
      s: '29 is prime, so the only pair is 1 × 29. The long side has 29 tiles.',
      w: [['1', 'That is the short side.']],
    }),
    mc('p7', 'Which of these numbers is prime?', ['87', '91', '93', '89'], 3, {
      h: ['Test 3 first with the digit sum, then 7.'],
      s: '87 = 3 × 29. 91 = 7 × 13. 93 = 3 × 31. 89 has no factor among 2, 3, 5, 7, so it is prime.',
      w: [[0, '8 + 7 = 15, a multiple of 3.'], [1, '7 × 13 = 91.'], [2, '9 + 3 = 12, a multiple of 3.']],
    }),
  ],

  challenge: [
    chain('Prime clues', 'I am a two-digit number. Both my digits are prime, and I am not prime myself.', [
      num('c1a', 'How many two-digit numbers have both digits from 2, 3, 5, 7?', 16, { h: ['4 choices for the tens digit, 4 for the ones digit.'], s: '4 × 4 = 16.' }),
      num('c1b', 'How many of those 16 are prime?', 4, { h: ['List them: 22, 23, 25, 27, 32, ... test each.'], s: 'The primes are 23, 37, 53, 73. The other 12 are composite: for example 57 = 3 × 19 and 77 = 7 × 11.' }),
      num('c1c', 'So how many numbers fit all the clues?', 12, { h: ['16 minus the primes.'], s: '16 − 4 = 12.' }),
    ], 'The idea: count all the choices, then take away the ones that fail.'),
    chain('Twin primes', 'Twin primes are two primes that differ by 2, like 11 and 13.', [
      num('c2a', 'How many pairs of twin primes are there below 30?', 4, { h: ['List primes below 30 and look at neighbors.'], s: '(3,5), (5,7), (11,13), (17,19). The pair (29,31) goes past 30. So 4.' }),
      num('c2b', 'What is the sum of the last pair of twin primes below 50?', 84, { h: ['Primes near 50: 41, 43, 47.'], s: '(41,43) is the last pair below 50. 41 + 43 = 84.' }),
      num('c2c', 'How many pairs of twin primes are there between 50 and 80?', 2, { h: ['The primes there: 53, 59, 61, 67, 71, 73, 79.'], s: '(59, 61) and (71, 73). That is 2.' }),
    ], 'The idea: list the primes first, then look at neighbours. Twin primes (past 3 and 5) always sit on both sides of a multiple of 6.'),
    mc('c3', 'Find the error. Mia says "I tested 2, 3, 5 and 7 on 143, and none works, so 143 is prime." Which is correct?', ['Mia is right.', '143 = 11 × 13, so she should have tested 11 too, since 11 × 11 = 121 is less than 143.', '143 is even.', 'She should have tested 4 and 6 as well.'], 1, {
      s: 'She stopped too soon. 11 × 11 = 121 is still under 143, so 11 must be tested. 11 × 13 = 143.',
      w: [[0, 'Test 11. 11 × 13 = 143.'], [3, '4 and 6 are not prime. Testing 2 already covers them.']],
    }),
  ],

  quiz: [
    tpl('isprime', (r) => {
      const n = r.int(30, 150);
      const pr = isPrime(n);
      return choice(r, 'Is ' + n + ' prime?', pr ? 'Yes' : 'No', [pr ? 'No' : 'Yes', 'Neither prime nor composite'], { s: pr ? 'No prime with a square under ' + n + ' divides it, so it is prime.' : n + ' = ' + smallest(n) + ' × ' + n / smallest(n) + ', so it is composite.' });
    }),
    tpl('smallestf', (r) => {
      const a = r.pick([3, 5, 7, 11, 13]), b = r.pick([11, 13, 17, 19, 23]);
      const n = a * b;
      return N('What is the smallest factor of ' + n + ' that is bigger than 1?', a, { s: n + ' = ' + a + ' × ' + b + '. The smaller one is ' + a + '.', w: keep([[b, 'That is the larger factor. Look for the smaller one.']], a) });
    }),
    tpl('countprimes', (r) => {
      const lo = r.int(2, 60), hi = lo + r.int(10, 25);
      const c = primesIn(lo, hi).length;
      return N('How many primes are there from ' + lo + ' to ' + hi + ' (counting both ends if prime)?', c, { s: 'The primes are ' + primesIn(lo, hi).join(', ') + '. That is ' + c + '.' });
    }),
    tpl('nextprime', (r) => {
      const n = r.int(20, 180);
      let q = n + 1; while (!isPrime(q)) q++;
      return N('What is the smallest prime that is greater than ' + n + '?', q, { s: 'Test ' + (n + 1) + ' on, and the first prime is ' + q + '.' });
    }),
    tpl('sumpr', (r) => {
      const n = r.pick([10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60]);
      const pairs = [];
      for (let a = 2; a <= n / 2; a++) if (isPrime(a) && isPrime(n - a)) pairs.push([a, n - a]);
      return N('How many ways can ' + n + ' be written as a sum of two primes? (3 + 7 and 7 + 3 count as one way.)', pairs.length, { s: 'The ways are ' + pairs.map((x) => x.join(' + ')).join(', ') + '. That is ' + pairs.length + '.' });
    }),
    tpl('composite', (r) => {
      const n = r.int(10, 60);
      const c = n - 1 - primesIn(2, n).length;
      return N('How many composite numbers are there from 1 to ' + n + '?', c, { s: n + ' numbers, minus 1, minus the ' + primesIn(2, n).length + ' primes: ' + c + '.', w: keep([[n - primesIn(2, n).length, 'Do not count 1. It is neither prime nor composite.']], c) });
    }),
    tpl('tiles', (r) => {
      const n = r.pick([23, 29, 31, 37, 41, 43, 47, 53, 59, 61]) + r.pick([0, 0, 2, 6]);
      const pr = isPrime(n);
      const k = pr ? 1 : (function () { let c = 0; for (let i = 1; i * i <= n; i++) if (n % i === 0) c++; return c; })();
      return N(name(r) + ' wants to make a rectangle with exactly ' + n + ' square tiles. How many different rectangles can be made? (4 by 6 and 6 by 4 count as the same.)', k, { s: pr ? n + ' is prime, so only 1 × ' + n + '.' : 'Count the factor pairs of ' + n + ': ' + k + '.' });
    }),
  ],
});
