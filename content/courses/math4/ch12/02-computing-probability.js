import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const COL = ['red', 'blue', 'green', 'yellow', 'white', 'black'];
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
/** wrong-answer list that never contains the right answer */
const wr = (ans, list) => list.filter((x) => fr(...String(x[0]).split('/').map(Number).concat(String(x[0]).includes('/') ? [] : [1])) !== fr(...String(ans).split('/').map(Number).concat(String(ans).includes('/') ? [] : [1])));

export default lesson({
  id: 'm4-12-2-computing-probability',
  title: 'Computing probability',
  blurb: 'Probability is a fraction: favorable results over all equally likely results. Simplify it, and use the complement.',
  concepts: ['probability', 'complement', 'fractions'],

  tryFirst: [
    num('t1', 'A bag holds 3 red, 5 blue and 2 green marbles. You pick one without looking. What is the probability that it is red? Give a fraction.', '3/10', {
      h: ['How many marbles are in the bag in all?', 'How many of them are red?'],
      s: 'There are 3 + 5 + 2 = 10 marbles. 3 of them are red. The probability is {3/10}.',
      w: [['3/7', 'The bottom number is all the marbles, 10, not just the ones that are not red.'], ['1/3', 'There are three colors, but they are not equally likely. Count marbles.']],
    }),
    num('t2', 'A fair die is rolled. What is the probability that it does NOT show a 6? Give a fraction.', '5/6', {
      h: ['How many numbers can come up? How many of them are not 6?'],
      s: 'There are 6 numbers. 5 of them are not 6. The probability is {5/6}.',
      w: [['1/6', 'That is the probability of rolling a 6. The question asks for not a 6.'], ['5', 'A probability is a fraction. Put the 5 over the total of 6.']],
    }),
  ],

  learn: [
    p('A <b>probability</b> is a number that tells how likely something is. It is a fraction. 0 means impossible. 1 means certain.'),
    rule('<b>Probability of an event</b> = (number of results that make it happen) ÷ (number of all equally likely results). The top counts the <i>favorable</i> results. The bottom counts <i>all</i> results.'),
    widget('spinner', { s0: 3, s1: 2, s2: 1 }),
    ex('Reading the spinner', ['The spinner has 3 blue, 2 yellow and 1 green slice. All slices are equal.', 'Total slices: 3 + 2 + 1 = 6.', 'P(blue) = {3/6}. Divide top and bottom by 3: {1/2}.', 'P(yellow) = {2/6} = {1/3}. P(green) = {1/6}.']),
    rule('<b>Simplest form.</b> Divide the top and the bottom by the same number until you cannot. {6/10} becomes {3/5}.'),
    tbl(['Probability', 'Means'], [['0', 'Impossible'], ['{1/4}', 'Unlikely'], ['{1/2}', 'Even chance'], ['{3/4}', 'Likely'], ['1', 'Certain']], 'The probability scale'),
    rule('<b>The complement.</b> The chance something does NOT happen is 1 minus the chance that it does. P(not A) = 1 − P(A). If P(rain) = {3/10}, then P(no rain) = {7/10}.'),
    ex('Tickets', ['Tickets are numbered 1 to 20. One is drawn. What is the probability that it is NOT a multiple of 5?', 'Multiples of 5: 5, 10, 15, 20. That is 4 tickets.', 'P(multiple of 5) = {4/20} = {1/5}.', 'P(not a multiple of 5) = 1 − {1/5} = {4/5}.']),
    warn('<b>Do not divide by the "others".</b> A bag has 3 red and 5 blue marbles. The probability of red is {3/8}, not {3/5}. The bottom number counts every marble, red ones too.'),
    mcq('Dev says: "A bag has 2 red and 6 blue marbles. P(red) = {2/6} = {1/3}." What is wrong?', ['Nothing is wrong.', 'The bottom number should be all the marbles, 8. P(red) = {2/8} = {1/4}.', 'The probability must be a whole number.'], 1, 'The total is 2 + 6 = 8. Red is 2 of 8, which is {2/8} = {1/4}. Dev left the red marbles out of the total.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A bag has 6 red, 4 blue and 5 green marbles. What is the probability that a marble picked at random is blue? Give a fraction in simplest form.', '4/15', {
      h: ['Add to find the total number of marbles.'],
      s: 'The total is 6 + 4 + 5 = 15. Blue is 4. The probability is {4/15}. It cannot be simplified.',
      w: [['4/11', 'The total includes the blue marbles too: 15, not 11.'], ['1/3', 'There are three colors, but the counts are not equal.']],
    }),
    num('p2', 'Tickets numbered 1 to 20 are in a hat. One is drawn at random. What is the probability that the number is a multiple of 3? Give a fraction in simplest form.', '3/10', {
      h: ['List the multiples of 3 up to 20.'],
      s: 'The multiples are 3, 6, 9, 12, 15, 18. That is 6 tickets of 20. {6/20} = {3/10}.',
      w: [['1/3', 'It is close to a third, but there are only 6 multiples among 20 tickets: {6/20}.'], ['6/14', 'The total is 20 tickets, not 14.']],
    }),
    num('p3', 'A spinner has 12 equal slices, 5 of them red. What is the probability that it does NOT land on red? Give a fraction in simplest form.', '7/12', {
      h: ['Count the slices that are not red.', 'Or use 1 − P(red).'],
      s: '12 − 5 = 7 slices are not red. P = {7/12}. Check: 1 − {5/12} = {7/12}.',
      w: [['5/12', 'That is the probability of red. The question asks for not red.']],
    }),
    num('p4', 'In a bag, the probability of picking a red marble is {3/8}. The bag holds 24 marbles. How many are red?', 9, {
      h: ['{3/8} of 24. First find one eighth.', '24 ÷ 8 = 3. Now take three of those.'],
      s: 'One eighth of 24 is 3. Three eighths of 24 is 3 × 3 = 9. So 9 marbles are red.',
      w: [['3', 'That is one eighth of 24. Red is three eighths.'], ['8', 'The 8 comes from the fraction. Find {3/8} of 24.']],
    }),
    num('p5', 'Cards numbered 1 to 12 lie face down. One is turned over. What is the probability that its number is prime? Give a fraction in simplest form.', '5/12', {
      h: ['List the primes up to 12. Remember that 1 is not prime.'],
      s: 'The primes are 2, 3, 5, 7, 11. That is 5 cards out of 12. {5/12}.',
      w: [['6/12', 'You counted one number too many. 1 is not prime, and 9 = 3 × 3 is not prime.'], ['4/12', 'You missed one prime. Check 11.']],
    }),
    num('p6', 'A bag has 5 red marbles and some blue marbles. The probability of picking red is {1/4}. How many blue marbles are in the bag?', 15, {
      h: ['If 5 marbles are a quarter of the bag, how many marbles are in the bag?', 'Then subtract the red ones.'],
      s: '5 is one quarter, so the whole bag has 5 × 4 = 20 marbles. Blue marbles: 20 − 5 = 15.',
      w: [['20', 'That is the number of all marbles. Take away the red ones.'], ['4', 'The fraction says 1 out of every 4 marbles is red. The bag is bigger than that.']],
    }),
    num('p7', 'A bag has 2 red marbles and 6 blue marbles. How many red marbles must be added so that the probability of picking red becomes {1/2}?', 4, {
      h: ['For a probability of {1/2}, red must be half the bag. How many red marbles should equal the blue ones?', 'Adding red marbles also adds to the total, but red should equal blue.'],
      s: 'Probability {1/2} means red and blue are equal in number. There are 6 blue, so red must be 6. 6 − 2 = 4 more red marbles. Check: 6 red out of 12 is {1/2}.',
      w: [['6', 'You would then have 8 red and 6 blue. Red would be more than half.'], ['2', 'With 4 red and 6 blue, red is still less than half.']],
    }),
  ],

  challenge: [
    chain('Socks', 'A drawer holds 4 red socks, 6 blue socks and 5 green socks. You pick one without looking.', [
      num('c1a', 'What is the probability that it is green? Give a fraction in simplest form.', '1/3', { h: ['How many socks are in the drawer?'], s: 'The total is 15. Green is 5. {5/15} = {1/3}.' }),
      num('c1b', 'What is the probability that it is not blue? Give a fraction in simplest form.', '3/5', { h: ['Count the socks that are red or green.'], s: '4 + 5 = 9 socks are not blue. {9/15} = {3/5}.' }),
      num('c1c', 'How many red socks must be added so that the probability of red is {1/2}?', 7, { h: ['Red should be half of all socks. The other socks number 11.', 'After adding, red must equal the 11 other socks.'], s: 'The 11 non-red socks (6 + 5) must be half the drawer, so red must be 11. 11 − 4 = 7 more red socks.' }),
    ], 'The idea: a probability of {1/2} means "the favorable results are as many as all the others".'),
    chain('Two-digit cards', 'Cards numbered 10 to 29 are shuffled and one is drawn.', [
      num('c2a', 'How many cards are there?', 20, { h: ['Count 10, 11, ..., 29. The last number minus the first, plus 1.'], s: '29 − 10 + 1 = 20 cards.' }),
      num('c2b', 'How many cards show a multiple of 5?', 4, { h: ['List them: 10, 15, ...'], s: 'The multiples of 5 are 10, 15, 20, 25. That is 4 cards.' }),
      num('c2c', 'What is the probability that the card is NOT a multiple of 5? Give a fraction in simplest form.', '4/5', { h: ['16 cards are not multiples of 5.'], s: '20 − 4 = 16 cards. {16/20} = {4/5}.' }),
    ], 'The idea: to count a complement, count the favorable ones first and subtract from the total.'),
    mc('c3', 'Find the error. Ava says: "A bag has 3 red and 5 blue marbles, so the probability of red is {3/5}." Which reply is correct?', ['Ava is right.', 'Ava forgot to count the red marbles in the total. The probability is {3/8}.', 'The probability is {5/8}.', 'The probability is {3/2}.'], 1, {
      s: 'The total is 3 + 5 = 8. The red marbles are 3 of those 8, so {3/8}.',
      w: [[0, '{3/5} compares red to blue. A probability compares red to everything.'], [2, '{5/8} is the probability of blue.']],
    }),
  ],

  quiz: [
    tpl('marble', (r) => {
      const cs = r.shuffle(COL).slice(0, 3); const n = [r.int(1, 8), r.int(1, 8), r.int(1, 8)]; const t = n[0] + n[1] + n[2]; const k = r.int(0, 2);
      const ans = fr(n[k], t);
      return N('A bag holds ' + n[0] + ' ' + cs[0] + ', ' + n[1] + ' ' + cs[1] + ' and ' + n[2] + ' ' + cs[2] + ' marbles. One is picked at random. What is the probability that it is ' + cs[k] + '? Give a fraction in simplest form.', ans, { s: 'The total is ' + t + '. ' + n[k] + ' are ' + cs[k] + '. {' + n[k] + '/' + t + '}' + (ans !== n[k] + '/' + t ? ' = {' + ans.replace('/', '/') + '}' : '') + '.', w: wr(ans, [[n[k] + '/' + (t - n[k]), 'The bottom number is all the marbles, ' + t + '.']]) });
    }),
    tpl('tickets', (r) => {
      const n = r.pick([12, 15, 18, 20, 24, 30]); const kind = r.int(0, 3); const m = r.pick([2, 3, 4, 5, 6]); const g = r.int(2, n - 3);
      let c, desc;
      if (kind === 0) { c = Math.floor(n / m); desc = 'is a multiple of ' + m; }
      else if (kind === 1) { c = 0; for (let i = 1; i <= n; i++) if (isPrime(i)) c++; desc = 'is a prime number'; }
      else if (kind === 2) { c = n - g; desc = 'is greater than ' + g; }
      else { c = 0; for (let i = 1; i <= n; i++) if (String(i).includes('1')) c++; desc = 'has the digit 1'; }
      const ans = fr(c, n);
      return N('Tickets numbered 1 to ' + n + ' are in a hat. One is drawn at random. What is the probability that the number ' + desc + '? Give a fraction in simplest form.', ans, { s: 'Count the favorable tickets: ' + c + '. There are ' + n + ' tickets in all. {' + c + '/' + n + '}' + (ans !== c + '/' + n ? ' = {' + ans + '}' : '') + '.', w: wr(ans, [[fr(n - c, n), 'That is the probability of the opposite. The question asks for the ticket that ' + desc + '.']]) });
    }),
    tpl('complement', (r) => {
      const cs = r.shuffle(COL).slice(0, 3); const n = [r.int(1, 6), r.int(1, 6), r.int(1, 6)]; const t = n[0] + n[1] + n[2]; const k = r.int(0, 2);
      const ans = fr(t - n[k], t);
      return N('A spinner has ' + t + ' equal slices: ' + n[0] + ' ' + cs[0] + ', ' + n[1] + ' ' + cs[1] + ' and ' + n[2] + ' ' + cs[2] + '. What is the probability that it does NOT land on ' + cs[k] + '? Give a fraction in simplest form.', ans, { s: (t - n[k]) + ' of the ' + t + ' slices are not ' + cs[k] + '. Or 1 − {' + n[k] + '/' + t + '}. The answer is {' + ans + '}.', w: wr(ans, [[fr(n[k], t), 'That is the probability of ' + cs[k] + '. The question asks for NOT ' + cs[k] + '.']]) });
    }),
    tpl('reverse', (r) => {
      let d, a;
      do { d = r.pick([3, 4, 5, 6, 8, 10]); a = r.int(1, d - 1); } while (gcd(a, d) !== 1);
      const mult = r.int(2, 6); const t = d * mult; const c = a * mult; const cs = r.pick(COL);
      return N('A bag holds ' + t + ' marbles. The probability of picking a ' + cs + ' marble is {' + a + '/' + d + '}. How many ' + cs + ' marbles are in the bag?', c, { s: 'Split the ' + t + ' marbles into ' + d + ' equal groups of ' + mult + '. The ' + cs + ' marbles fill ' + a + ' of those groups: ' + a + ' × ' + mult + ' = ' + c + '.', w: [[mult, 'That is one group. You need ' + a + ' groups.']].filter((z) => z[0] !== c) });
    }),
    tpl('word', (r) => {
      const W = ['MATHEMATICS', 'MISSISSIPPI', 'ARITHMETIC', 'PROBABILITY', 'CALCULATOR', 'TENNESSEE', 'BANANA', 'ELEMENTARY'];
      const w = r.pick(W); const vow = (ch) => 'AEIOU'.includes(ch); const kind = r.int(0, 2);
      let c, desc;
      if (kind === 0) { c = [...w].filter(vow).length; desc = 'a vowel (A, E, I, O or U)'; }
      else if (kind === 1) { const l = r.pick([...w]); c = [...w].filter((x) => x === l).length; desc = 'the letter ' + l; }
      else { const l = r.pick([...w]); c = [...w].filter((x) => x !== l).length; desc = 'NOT the letter ' + l; }
      const ans = fr(c, w.length);
      return N('Each letter of the word ' + w + ' is written on its own card, and the cards are shuffled. One card is drawn. What is the probability that it shows ' + desc + '? Give a fraction in simplest form.', ans, { s: 'The word has ' + w.length + ' letters, so there are ' + w.length + ' cards. ' + c + ' of them show it. {' + c + '/' + w.length + '}' + (ans !== c + '/' + w.length ? ' = {' + ans + '}' : '') + '.' });
    }),
    tpl('half', (r) => {
      const a = r.int(2, 7), b = a + r.int(2, 9); const cs = r.shuffle(COL).slice(0, 2);
      return N('A bag has ' + a + ' ' + cs[0] + ' marbles and ' + b + ' ' + cs[1] + ' marbles. How many ' + cs[0] + ' marbles must be added so that the probability of picking ' + cs[0] + ' is {1/2}?', b - a, { s: 'A probability of {1/2} means the two colors are equal in number. ' + b + ' − ' + a + ' = ' + (b - a) + '.', w: [[a + b, 'That is the total. The ' + cs[0] + ' marbles only need to match the ' + cs[1] + ' marbles.']].filter((z) => z[0] !== b - a) });
    }),
  ],
});
