import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const isP = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const PR = []; for (let i = 2; i < 100; i++) if (isP(i)) PR.push(i);
const nextP = (n) => { let x = n + 1; while (!isP(x)) x++; return x; };
const prevP = (n) => { let x = n - 1; while (!isP(x)) x--; return x; };
const cntP = (lo, hi) => { let c = 0; for (let x = lo; x <= hi; x++) if (isP(x)) c++; return c; };

export default lesson({
  id: 'pre-3-3-primes-and-composites',
  title: 'Primes and composites',
  blurb: 'The atoms of the whole numbers: what makes a number prime, how to spot one quickly, and why you only ever test small divisors.',
  concepts: ['primes', 'composites', 'sieve'],

  tryFirst: [
    num('t1', 'Some whole numbers have exactly two divisors: 1 and the number itself. How many such numbers are there from 1 to 20?', 8, {
      h: ['Go through them one by one: 2 has divisors 1 and 2. What about 4? 6? 7?', 'Does 1 have two divisors, or only one?'],
      s: 'They are 2, 3, 5, 7, 11, 13, 17, 19: eight numbers. (1 has only one divisor, itself.)',
      w: [['9', 'Did you count 1? It has just one divisor, so it does not qualify.'], ['7', 'Check 2: its divisors are 1 and 2, so it counts. List them all: 2, 3, 5, 7, 11, 13, 17, 19.']],
    }),
    num('t2', 'Tiles can be arranged in a rectangle with both sides at least 2 whenever there is more than one way to split them in a grid. 12 tiles can make 2 by 6, 3 by 4. What is the smallest number of tiles above 20 that can <i>not</i> be arranged this way?', 23, {
      h: ['21 = 3 × 7 and 22 = 2 × 11 can. Check 23.'],
      s: '21 = 3 × 7, 22 = 2 × 11, but 23 cannot be split into a grid with both sides at least 2. So 23.',
      w: [['21', '21 can be a 3 by 7 grid.'], ['25', '25 can be made as a 5 by 5 square.']],
    }),
  ],

  learn: [
    p('Every whole number greater than 1 falls into one of two camps. A <b>prime</b> number has exactly two divisors: 1 and itself. A <b>composite</b> number has more than two, so it can be broken into smaller factors. Primes are the building blocks; everything else is built from them.'),
    def('prime number', 'A whole number greater than 1 with exactly two divisors: 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, … There is no largest prime: the list goes on forever.'),
    def('composite number', 'A whole number greater than 1 with three or more divisors, so it equals a product of two smaller whole numbers greater than 1. The first composite numbers are 4, 6, 8, 9, 10, 12, …'),
    widget('sieve', {}),
    rule('<b>Neither one.</b> The number 1 is neither prime nor composite: it has only one divisor. And 2 is the only even prime, since every other even number is also divisible by 2.'),
    p('<b>The sieve of Eratosthenes</b> (the widget above) finds primes by elimination: circle 2 and cross out its other multiples; circle the next survivor, 3, and cross out its multiples; and so on. Whatever survives is prime. There are 25 primes below 100.'),
    tbl(['Range', 'Primes'], [['1 to 20', '2, 3, 5, 7, 11, 13, 17, 19'], ['21 to 50', '23, 29, 31, 37, 41, 43, 47'], ['51 to 100', '53, 59, 61, 67, 71, 73, 79, 83, 89, 97']], 'All 25 primes below 100'),
    ex('Is 97 prime?', ['Try dividing by small primes: 2 (97 is odd), 3 (digit sum 16), 5 (ends in 7), 7 (7 × 13 = 91 and 7 × 14 = 98, so no).', 'Do we need to keep going? The next prime is 11, and 11 × 11 = 121, which is already bigger than 97.', 'If 97 were composite it would have a factor at most the square root, which is less than 10. None of 2, 3, 5, 7 work, so 97 is prime.']),
    rule('<b>The stopping rule.</b> A composite number n always has a prime factor that is at most the square root of n. To test whether n is prime, you only need to try the primes whose square is no bigger than n. The reason: two factors both bigger than the square root would multiply to more than n.'),
    ex('A number that looks prime but is not', ['Is 91 prime? It is odd, digit sum 10 (not a multiple of 3), and does not end in 0 or 5.', 'Try 7: 7 × 13 = 91. So 91 is composite.', 'Numbers like 91 (and 119, 133) fool a lot of people. When in doubt, try 7.']),
    ex('Going all the way to the limit', ['Is 187 prime?', 'The square root is a bit under 14, so test the primes 2, 3, 5, 7, 11, 13. Not 2 (odd), not 3 (digit sum 16), not 5, not 7 (7 × 26 = 182, remainder 5).', 'Now 11: 11 × 17 = 187.', 'So 187 is composite. Stopping at 7 would have been a mistake.']),
    ex('The next prime after 120', ['Find the smallest prime greater than 120.', 'Rule out the numbers after 120 one at a time: 121 = 11 × 11, 122 is even, 123 has digit sum 6 so 3 divides it, 124 is even, 125 ends in 5, 126 is even.', 'Test 127. Since 11 × 11 = 121 is below 127 and 12 × 12 = 144 is above it, test the primes up to 11. 127 is odd, its digit sum is 10, it does not end in 5, 7 × 18 = 126 leaves remainder 1, and 11 × 11 = 121 leaves remainder 6.', 'No prime up to 11 divides 127, so 127 is prime and it is the answer.']),
    key('A prime has <b>exactly two</b> divisors, 1 and itself; a composite has more; and 1 is neither. To test a number for primality, try the primes up to its square root, and not one more.'),
    tip('Learn the primes up to 50 by heart and use divisibility tests for 2, 3 and 5 to knock out most candidates. The composite numbers that fool people are products of larger primes: 49 = 7 × 7, 77 = 7 × 11, 91 = 7 × 13, 119 = 7 × 17.'),
    tip('To count composites in a range, count the numbers and subtract the primes (and 1 if it is in the range). From 2 to 30 there are 29 numbers and 10 primes (2, 3, 5, 7, 11, 13, 17, 19, 23, 29), so 19 are composite.'),
    warn('<b>Watch out.</b> Three beliefs that are false: "1 is prime" (it has one divisor, not two), "all odd numbers are prime" (9, 15, 21 are not), and "2 is not prime because it is even" (2 has exactly two divisors, so it is prime, the only even one).'),
    mcq('Leo says "Every odd number bigger than 2 is prime. 9 is odd, so it is prime." What is wrong?', ['Nothing, odd numbers are prime.', '9 = 3 × 3, so it has three divisors (1, 3, 9): it is composite. Being odd only rules out 2 as a factor.', '9 is prime because it is a square.'], 1, '9 has divisors 1, 3, 9. A prime has exactly two divisors. Odd just means not divisible by 2.', 'Spot the mistake'),
    recap([['prime', 'exactly two divisors: 1 and itself'], ['composite', 'more than two divisors'], ['1', 'neither prime nor composite'], ['2', 'the only even prime'], ['stopping rule', 'test primes up to the square root']], [['Primes below 100', '25 of them']]),
  ],

  practice: [
    mc('p1', 'Which of these numbers is prime?', ['51', '57', '59', '63'], 2, {
      h: ['Check 3 and 7 for each.'],
      s: '51 = 3 × 17, 57 = 3 × 19, 63 = 7 × 9. And 59 has no factor of 2, 3, 5 or 7, so it is prime.',
      w: [[0, '51 = 3 × 17 (digit sum 6).'], [1, '57 = 3 × 19 (digit sum 12).']],
    }),
    num('p2', 'How many primes are there between 30 and 50?', 5, {
      h: ['List the odd numbers 31, 33, ..., 49 and cross out multiples of 3, 5, 7.'],
      s: 'The primes are 31, 37, 41, 43, 47: five.',
      w: [['6', 'Check each: 39 = 3 × 13 and 49 = 7 × 7 are composite.'], ['4', 'The list is 31, 37, 41, 43, 47.']],
    }),
    num('p3', 'What is the sum of the two smallest primes greater than 20?', 52, {
      h: ['21 = 3 × 7, 22 is even, 23?'],
      s: 'The primes after 20 are 23 and 29. 23 + 29 = 52.',
      w: [['44', '21 + 23 = 44, but 21 is not prime (3 × 7).'], ['46', 'Is 23 + 23 right? You need two different primes: 23 and 29.']],
    }),
    num('p4', 'What is the smallest odd composite number?', 9, {
      h: ['Check 1, 3, 5, 7, 9 in order. Which first has more than 2 divisors?'],
      s: '3, 5, 7 are prime and 1 is neither. 9 = 3 × 3 is the first odd composite.',
      w: [['1', '1 is neither prime nor composite.'], ['15', '15 is composite, but 9 comes earlier.']],
    }),
    num('p5', 'Two different primes add up to 36. Their product is 203. What is the larger of the two primes?', 29, {
      h: ['List prime pairs that add to 36: 5 + 31, 7 + 29, 13 + 23, 17 + 19.', 'Find the pair with product 203.'],
      s: '5 × 31 = 155, 7 × 29 = 203. So the primes are 7 and 29, and the larger is 29.',
      w: [['7', '7 is the smaller of the two.'], ['31', '5 × 31 = 155, not 203.']],
    }),
    num('p6', 'The numbers 3, 5, 7 are all prime and each is 2 more than the one before. How many sets of three primes p, p + 2, p + 4 are there in total? (Hint: look at remainders when dividing by 3.)', 1, {
      h: ['Among any three numbers p, p + 2, p + 4, what are the remainders when divided by 3?', 'They are all different, so one of them must be a multiple of 3.'],
      s: 'The three numbers have three different remainders mod 3, so exactly one is a multiple of 3. For it to be prime it must be 3 itself. That only happens for 3, 5, 7. So just one set.',
      w: [['2', 'Only 3, 5, 7 works. Try 5, 7, 9 and 11, 13, 15: one is always a multiple of 3.'], ['0', '3, 5, 7 is a set. Check it.']],
    }),
    num('p7', 'Exactly how many composite numbers are there from 2 up to 30?', 19, {
      h: ['There are 29 numbers from 2 to 30. How many of them are prime?'],
      s: 'Primes up to 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29: ten. From 2 to 30 there are 29 numbers, so 29 − 10 = 19 are composite.',
      w: [['10', 'That is the number of primes. The composites are the others.'], ['20', 'Count the numbers from 2 to 30 carefully: that is 29 of them, not 30.']],
    }),
  ],

  challenge: [
    chain('How far does the sieve need to go?', 'To find the primes up to 120 with the sieve, which primes do we have to cross out multiples of?', [
      num('c1a', 'What is the smallest composite number that is not divisible by 2, 3 or 5?', 49, { h: ['Try 7 × 7. Is there anything smaller made from primes bigger than 5?'], s: 'It has to be a product of primes that are at least 7. The smallest such product is 7 × 7 = 49.', w: [['35', '35 is divisible by 5.']] }),
      num('c1b', 'What is the smallest composite number that is not divisible by 2, 3, 5 or 7?', 121, { h: ['Now the smallest prime to use is 11.'], s: '11 × 11 = 121.', w: [['77', '77 = 7 × 11 is divisible by 7.']] }),
      num('c1c', 'So to find all primes up to 120, how many primes do we need to cross out multiples of?', 4, { h: ['After 2, 3, 5 and 7, the first surviving composite is 121, which is past 120.'], s: 'We only need 2, 3, 5, 7: four primes.', w: [['5', '11 is not needed: its first new multiple, 121, is already past 120.']] }),
    ], 'The idea: the first composite number a prime p can catch that smaller primes did not is p × p. That is why you can stop once p squared passes your limit.'),
    chain('Hidden factors', 'These numbers look prime. Let us check.', [
      num('c2a', 'What is the smallest prime factor of 91?', 7, { h: ['Try 2, 3, 5, 7.'], s: '91 = 7 × 13.', w: [['13', '13 is a factor, but the smaller one is 7.']] }),
      num('c2b', 'What is the smallest prime factor of 221?', 13, { h: ['You need to test primes up to 14, since 15 × 15 is already above 221.'], s: '221 = 13 × 17. None of 2, 3, 5, 7, 11 divide it.', w: [['17', '17 is the larger factor.']] }),
      num('c2c', 'Is 223 prime? Give 1 for yes and 0 for no.', 1, { h: ['Test primes up to 14: 2, 3, 5, 7, 11, 13. 15 × 15 = 225 is above 223.'], s: '223 is odd, digit sum 7, not ending in 0/5, 7 × 31 = 217, 7 × 32 = 224, 11 × 20 = 220, 13 × 17 = 221. No prime up to 13 divides it: it is prime.', w: [['0', 'Check 7, 11 and 13 carefully: 217, 220, 221 are the nearby multiples, not 223.']] }),
    ], 'The idea: to test a number, you only have to try the primes up to its square root.'),
    mc('c3', 'Find the error. Ava says: "To check if 143 is prime I only tested 2, 3, 5 and 7. None worked, so it is prime." What went wrong?', ['She stopped too early: 12 × 12 = 144 is above 143, so she had to try 11 as well, and 143 = 11 × 13.', 'Nothing, 143 is prime.', 'She should also have tested 4 and 6.', 'She should test every number up to 143.'], 0, {
      s: 'The primes with square at most 143 go up to 11 (11 × 11 = 121). 143 = 11 × 13, so it is composite.',
      w: [[1, '11 × 13 = 143.'], [2, '4 and 6 are not prime; if they divided it, 2 would too.']],
    }),
  ],

  quiz: [
    tpl('which', (r) => { const pr = PR.filter((x) => x > 10); const right = r.pick(pr); const oddc = []; for (let a = 3; a <= 13; a += 2) for (let b = a; b <= 19; b += 2) if (isP(a) && isP(b) && a * b > 30 && a * b < 300) oddc.push(a * b); const wr = r.shuffle(oddc).slice(0, 3); return choice(r, 'Which of these numbers is prime?', String(right), wr.map(String), { s: right + ' has no divisors besides 1 and itself. The others are products of two primes.' }); }),
    tpl('count', (r) => { const lo = r.int(2, 150), hi = lo + r.int(15, 45); const c = cntP(lo, hi); return N('How many primes are there from ' + lo + ' to ' + hi + ' (including both ends if they are prime)?', c, { s: 'Check each number for factors up to its square root. There are ' + c + ' primes in this range.' }); }),
    tpl('next', (r) => { const n = r.int(20, 180); const v = nextP(n); return N('What is the smallest prime number greater than ' + n + '?', v, { s: 'Test ' + (n + 1) + ', ' + (n + 2) + ', … in turn: the first number with no prime factor up to its square root is ' + v + '.' }); }),
    tpl('prev', (r) => { const n = r.int(20, 180); const v = prevP(n); return N('What is the largest prime number less than ' + n + '?', v, { s: 'Count downward from ' + (n - 1) + ' and test each one. The first prime is ' + v + '.' }); }),
    tpl('spf', (r) => { const ps = [3, 5, 7, 11, 13, 17, 19, 23]; const a = r.pick(ps); let b = r.pick(ps); const lo = Math.min(a, b), hi = Math.max(a, b); return N('What is the smallest prime factor of ' + a * b + '?', lo, { s: a * b + ' = ' + lo + ' × ' + hi + '. It is odd, and the smaller of the two primes is ' + lo + '.', w: lo === hi ? [] : [[hi, hi + ' is a factor, but the question asks for the smaller one.']] }); }),
    tpl('pair', (r) => { const idx = r.distinct(2, 0, 11); const [a, b] = idx.map((i) => PR[i]); const lo = Math.min(a, b), hi = Math.max(a, b); return N('Two different primes have a sum of ' + (a + b) + ' and a product of ' + a * b + '. What is the larger prime?', hi, { s: 'The primes are ' + lo + ' and ' + hi + ': ' + lo + ' + ' + hi + ' = ' + (a + b) + ' and ' + lo + ' × ' + hi + ' = ' + a * b + '.', w: [[lo, lo + ' is the smaller of the two.']] }); }),
    tpl('comp', (r) => { const lo = r.int(2, 100), hi = lo + r.int(20, 60); const total = hi - lo + 1; const c = total - cntP(lo, hi); return N('How many composite numbers are there from ' + lo + ' to ' + hi + ' (including both ends)?', c, { s: 'There are ' + total + ' numbers and ' + cntP(lo, hi) + ' of them are prime, so ' + c + ' are composite.', w: [[cntP(lo, hi), 'That is the number of primes. The question asks for composites.']].filter((x) => x[0] !== c) }); }),
    tpl('twin', (r) => { const n = r.int(30, 150); let c = 0; for (let x = 3; x + 2 <= n; x++) if (isP(x) && isP(x + 2)) c++; return N('Twin primes are two primes that differ by 2, like 11 and 13. How many pairs of twin primes have both numbers at most ' + n + '?', c, { s: 'List the primes up to ' + n + ' and look for neighbours that differ by 2. There are ' + c + ' such pairs.' }); }),
  ],
});
