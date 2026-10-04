import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const same = (x, y) => fr(...x.split('/').map(Number).concat(x.includes('/') ? [] : [1])) === fr(...y.split('/').map(Number).concat(y.includes('/') ? [] : [1]));
const wrong = (ans, list) => list.filter((z) => !same(String(z[0]), ans));
const PAIRS = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PAIRS.push([a, b]);
const coins = (n) => { const o = []; for (let m = 0; m < (1 << n); m++) { let heads = 0; for (let i = 0; i < n; i++) if (m & (1 << i)) heads++; o.push(heads); } return o; };
const two = (r) => { const n = name(r); return r.pick(['Two fair dice are rolled.', n + ' rolls two fair dice.', n + ' rolls a red die and a blue die. Both are fair.', 'A fair red die and a fair blue die are rolled together.', n + ' throws two fair dice at once.', 'Two fair six-sided dice are rolled, one after the other.']); };
const one = (r, n) => { const nm = name(r); return r.pick(['A fair coin is flipped ' + n + ' times.', nm + ' flips a fair coin ' + n + ' times.', nm + ' flips a fair coin ' + n + ' times in a row.', 'A fair coin is tossed ' + n + ' times.']); };
const SUMTABLE = [1, 2, 3, 4, 5, 6].map((a) => [String(a)].concat([1, 2, 3, 4, 5, 6].map((b) => String(a + b))));

export default lesson({
  id: 'm4-12-3-coins-and-dice',
  title: 'Coins and dice',
  blurb: 'List every outcome of coin flips and dice rolls, then count the ones you want. Learn why the sum 7 beats the sum 2.',
  concepts: ['outcomes', 'coins', 'dice', 'probability'],

  tryFirst: [
    num('t1', 'A fair coin is flipped two times. What is the probability that both flips land heads? Give a fraction.', '1/4', {
      h: ['List all the results of two flips: HH, HT, ...', 'How many results are there? How many are HH?'],
      s: 'The results are HH, HT, TH, TT. That is 4 results. Only HH is both heads: {1/4}.',
      w: [['1/2', 'That is the chance for one flip. Two flips make 4 results.'], ['1/3', 'There are 4 results, not 3. HT and TH are different results.']],
    }),
    num('t2', 'Two fair dice are rolled, one red and one blue. How many different outcomes are there in all?', 36, {
      h: ['The red die has 6 faces. For each of those, the blue die has 6 faces.'],
      s: 'For each of the 6 numbers on the red die there are 6 numbers on the blue die. 6 × 6 = 36 outcomes.',
      w: [['12', 'You added 6 + 6. Each red face can pair with every blue face, so multiply.'], ['6', 'That is the outcomes for one die.']],
    }),
  ],

  learn: [
    p('An <b>outcome</b> is one complete result. One coin has 2 outcomes: heads (H) or tails (T). A fair coin makes each equally likely. A fair die has 6 outcomes: 1, 2, 3, 4, 5, 6.'),
    def('fair', 'A coin or die is fair if every outcome is equally likely. A fair coin lands heads as often as tails. A fair die lands on each number as often as on any other.'),
    def('die', 'A small cube with the numbers 1 to 6 on its faces. One of them is a die. Two or more are dice.'),
    rule('<b>List the outcomes.</b> To find a probability, list every outcome, count the ones you want, and divide by the total. Two coins: HH, HT, TH, TT. Order matters: HT (first heads, second tails) and TH are different outcomes.'),
    widget('countingTree', { a: 2, b: 2, c: 2, labels: ['1st coin', '2nd coin', '3rd coin'] }),
    p('Three coins make 2 × 2 × 2 = 8 outcomes. Each path through the tree is one outcome.'),
    ex('Exactly one head', ['Two coins are flipped. What is the probability of exactly one head?', 'Outcomes: HH, HT, TH, TT.', 'Exactly one head: HT and TH. That is 2 outcomes.', 'P = {2/4} = {1/2}.']),
    p('Two dice have 36 outcomes. This table shows the sum for each one. The rows are the first die and the columns are the second die.'),
    tbl(['1st \\ 2nd', '1', '2', '3', '4', '5', '6'], SUMTABLE, 'Sums of two dice'),
    key('<b>Not all sums are equally likely.</b> The sum 2 has only 1 outcome (1 and 1). The sum 7 has 6 outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). So the sum 7 is the most likely.'),
    ex('Sum of 7 with two dice', ['Two fair dice are rolled. What is P(sum = 7)?', 'There are 6 × 6 = 36 equally likely outcomes.', 'Sum 7 happens in 6 of them: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).', 'P = {6/36} = {1/6}.']),
    formula('Counting outcomes', 'total = (outcomes of 1st) × (outcomes of 2nd)', 'Two coins: 2 × 2 = 4. A coin and a die: 2 × 6 = 12. Two dice: 6 × 6 = 36.'),
    tip('Make the table or list in order, so you do not miss any outcome or count one twice. With two dice, go through the first die from 1 to 6 and, for each, the second die from 1 to 6.'),
    warn('<b>Do not count sums as outcomes.</b> The sums 2 to 12 are 11 possible sums, but they are not equally likely. The 36 pairs of numbers are the equally likely outcomes.'),
    mcq('Ben says: "The sum of two dice can be 2, 3, ..., 12. That is 11 sums, so P(sum = 7) = {1/11}." What is wrong?', ['Nothing is wrong.', 'The 11 sums are not equally likely. Count the 36 pairs: 6 of them have sum 7, so the probability is {6/36} = {1/6}.', 'The sum 7 is impossible.'], 1, 'Only equally likely outcomes can be counted this way. The 36 pairs are equally likely. The sums are not.', 'Spot the mistake'),
    recap([['outcome', 'one complete result'], ['fair', 'every outcome equally likely'], ['H and T', 'heads and tails'], ['order matters', 'HT and TH are different outcomes']], [['Two coins', '4 outcomes'], ['Three coins', '8 outcomes'], ['Two dice', '36 outcomes'], ['Probability', 'P = {wanted outcomes/all outcomes}']]),
  ],

  practice: [
    num('p1', 'A fair coin is flipped three times. What is the probability of exactly two heads? Give a fraction.', '3/8', {
      h: ['There are 8 outcomes. List them all: HHH, HHT, ...', 'Which have exactly two H?'],
      s: 'All 8: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. Exactly two heads: HHT, HTH, THH. That is 3. {3/8}.',
      w: [['1/4', 'You missed a case. The tail can be in the first, second or third flip.'], ['2/8', 'There are three ways: the tail can be first, second or last.']],
    }),
    num('p2', 'Two fair dice are rolled. What is the probability that the sum is 9? Give a fraction in simplest form.', '1/9', {
      h: ['List the pairs with sum 9: (3,6), ...', 'Do not forget the reversed pairs.'],
      s: 'The pairs are (3,6), (4,5), (5,4), (6,3). That is 4 of 36. {4/36} = {1/9}.',
      w: [['2/36', 'You counted (3,6) and (4,5) only. (5,4) and (6,3) are different outcomes.'], ['1/11', 'The 11 sums are not equally likely. Use the 36 pairs.']],
    }),
    num('p3', 'Two fair dice are rolled. What is the probability that both show the same number? Give a fraction in simplest form.', '1/6', {
      h: ['List the pairs where both numbers match: (1,1), ...'],
      s: 'The pairs are (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). That is 6 of 36. {6/36} = {1/6}.',
      w: [['1/36', 'That is the chance of one particular pair, such as (3,3). There are six pairs that match.']],
    }),
    num('p4', 'Two fair dice are rolled. What is the probability that the sum is 10 or more? Give a fraction in simplest form.', '1/6', {
      h: ['Count the pairs with sum 10, then 11, then 12.'],
      s: 'Sum 10: (4,6), (5,5), (6,4), which is 3. Sum 11: (5,6), (6,5), which is 2. Sum 12: (6,6), which is 1. Total 6 of 36. {6/36} = {1/6}.',
      w: [['3/36', 'That is the sum 10 only. The question includes 11 and 12.']],
    }),
    num('p5', 'A fair coin is flipped and a fair die is rolled. What is the probability of heads and an even number? Give a fraction in simplest form.', '1/4', {
      h: ['There are 2 × 6 = 12 outcomes. Which have H and an even number?'],
      s: 'The favorable outcomes are H2, H4, H6. That is 3 of 12. {3/12} = {1/4}.',
      w: [['1/2', 'That is the chance of heads, or the chance of an even number, by itself. You need both.'], ['1/6', 'There are 3 even numbers, not 1.']],
    }),
    num('p6', 'Two fair dice are rolled. Some sums have a probability of exactly {1/12}. How many different sums are like that?', 2, {
      h: ['{1/12} = {3/36}. Which sums have exactly 3 pairs?', 'Use the table: how many pairs for sums 2, 3, 4, ... ?'],
      s: 'The number of pairs for sums 2 to 12 is 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1. The sums with 3 pairs are 4 and 10. So 2 sums.',
      w: [['1', 'The pattern goes up to 7 and comes back down. Each count appears on both sides, except 6.'], ['3', 'Check the counts 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1. The number 3 appears twice.']],
    }),
    num('p7', 'A fair die is rolled twice. What is the probability that the second number is bigger than the first? Give a fraction in simplest form.', '5/12', {
      h: ['Count the pairs where the numbers match. The remaining pairs split evenly between "second bigger" and "first bigger".', 'There are 36 pairs in all.'],
      s: '6 pairs have the same number. The other 30 split evenly: 15 have the second bigger and 15 have the first bigger. {15/36} = {5/12}.',
      w: [['1/2', 'Some pairs have equal numbers. Those do not count.'], ['15/30', 'The bottom number is all 36 outcomes.']],
    }),
  ],

  challenge: [
    chain('Three coins', 'A fair coin is flipped three times.', [
      num('c1a', 'How many outcomes are there?', 8, { h: ['Multiply the 2 choices three times.'], s: '2 × 2 × 2 = 8.' }),
      num('c1b', 'How many outcomes have at least two heads?', 4, { h: ['Count exactly two heads (3 ways), then exactly three heads.'], s: 'Exactly two heads: HHT, HTH, THH. Exactly three heads: HHH. That is 3 + 1 = 4.' }),
      num('c1c', 'What is the probability of at least two heads? Give a fraction in simplest form.', '1/2', { h: ['Use your two answers.'], s: '4 out of 8 outcomes: {4/8} = {1/2}.' }),
    ], 'The idea: list the outcomes by how many heads they have. The counts for 0, 1, 2, 3 heads are 1, 3, 3, 1.'),
    chain('Sum 6 or sum 8', 'Two fair dice are rolled.', [
      num('c2a', 'How many outcomes give the sum 6?', 5, { h: ['(1,5), (2,4), ...'], s: '(1,5), (2,4), (3,3), (4,2), (5,1). That is 5.' }),
      num('c2b', 'How many outcomes give the sum 8?', 5, { h: ['(2,6), (3,5), ...'], s: '(2,6), (3,5), (4,4), (5,3), (6,2). That is 5.' }),
      num('c2c', 'What is the probability that the sum is 6 or 8? Give a fraction in simplest form.', '5/18', { h: ['A pair cannot have both sums, so you can add the counts.'], s: '5 + 5 = 10 outcomes out of 36. {10/36} = {5/18}.' }),
    ], 'The idea: when two events cannot happen together, add their outcomes. Then divide by 36 once.'),
    mc('c3', 'Find the error. Mia says: "Two coins give HH, HT and TT. That is 3 outcomes, so P(HT) = {1/3}." Which reply is correct?', ['Mia is right.', 'Mia left out TH. There are 4 equally likely outcomes. P(one head and one tail) is {2/4} = {1/2}.', 'The probability is {1/4}.', 'Coins cannot be listed.'], 1, {
      s: 'The first coin and the second coin are separate. HT and TH are different outcomes. There are 4 outcomes.',
      w: [[0, 'HT and TH are different outcomes, so there are 4 outcomes in all.'], [2, 'P(HT) alone is {1/4}, but the question was about one head and one tail in any order.']],
    }),
  ],

  quiz: [
    tpl('coinsK', (r) => {
      for (;;) {
        const n = r.int(3, 6); const k = r.int(0, n); const mode = r.pick(['exactly', 'exactly', 'at least', 'at most']);
        const cs = coins(n); const c = cs.filter((h) => (mode === 'exactly' ? h === k : mode === 'at least' ? h >= k : h <= k)).length;
        if (c === 0 || c === cs.length) continue;
        const ans = fr(c, 1 << n);
        return N(one(r, n) + ' What is the probability of ' + mode + ' ' + k + ' head' + (k === 1 ? '' : 's') + '? Give a fraction in simplest form.', ans, { s: 'There are ' + (1 << n) + ' outcomes. List them by number of heads. ' + c + ' have ' + mode + ' ' + k + '. {' + c + '/' + (1 << n) + '}' + (ans !== c + '/' + (1 << n) ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(1, 2), 'That is the chance for one flip. Count all the outcomes.']]) });
      }
    }),
    tpl('sum', (r) => {
      const s = r.int(2, 12); const c = PAIRS.filter(([a, b]) => a + b === s).length; const ans = fr(c, 36);
      return N(two(r) + ' What is the probability that the sum is ' + s + '? Give a fraction in simplest form.', ans, { s: 'List the pairs with sum ' + s + ': there are ' + c + ' of them out of 36. {' + c + '/36}' + (ans !== c + '/36' ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(1, 11), 'The 11 sums are not equally likely. Count the 36 pairs.'], [fr(1, 36), 'There is more than one pair with this sum, unless the sum is 2 or 12.']]) });
    }),
    tpl('sumrange', (r) => {
      const s = r.int(4, 10); const mode = r.pick(['at least', 'at most', 'less than', 'more than']);
      const ok = (x) => (mode === 'at least' ? x >= s : mode === 'at most' ? x <= s : mode === 'less than' ? x < s : x > s);
      const c = PAIRS.filter(([a, b]) => ok(a + b)).length; const ans = fr(c, 36);
      return N(two(r) + ' What is the probability that the sum is ' + mode + ' ' + s + '? Give a fraction in simplest form.', ans, { s: 'Count the pairs: ' + c + ' out of 36. {' + c + '/36}' + (ans !== c + '/36' ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(36 - c, 36), 'That is the opposite event. Check which sums the question wants.']]) });
    }),
    tpl('differ', (r) => {
      const d = r.int(0, 4); const c = PAIRS.filter(([a, b]) => Math.abs(a - b) === d).length; const ans = fr(c, 36);
      const desc = d === 0 ? 'show the same number' : 'differ by exactly ' + d;
      return N(two(r) + ' What is the probability that the two numbers ' + desc + '? Give a fraction in simplest form.', ans, { s: 'Count the pairs: ' + c + ' out of 36 (remember both orders). {' + c + '/36}' + (ans !== c + '/36' ? ' = {' + ans + '}' : '') + '.', w: d === 0 ? [] : wrong(ans, [[fr(Math.max(1, c / 2), 36), 'Each pair can be in both orders, such as (1,' + (1 + d) + ') and (' + (1 + d) + ',1). Count both.']]) });
    }),
    tpl('coindie', (r) => {
      const face = r.pick(['heads', 'tails']); const kind = r.int(0, 3); const k = r.int(2, 5);
      const tests = [['an even number', (x) => x % 2 === 0], ['a prime number', isPrime], ['a number greater than ' + k, (x) => x > k], ['a multiple of 3', (x) => x % 3 === 0]];
      const [desc, f] = tests[kind]; const cnt = [1, 2, 3, 4, 5, 6].filter(f).length; const ans = fr(cnt, 12);
      return N(r.pick(['A fair coin is flipped and a fair die is rolled.', name(r) + ' flips a fair coin and rolls a fair die.', 'A fair coin and a fair die are used together.']) + ' What is the probability of ' + face + ' and ' + desc + '? Give a fraction in simplest form.', ans, { s: 'There are 2 × 6 = 12 outcomes. ' + cnt + ' of them have ' + face + ' with ' + desc + '. {' + cnt + '/12}' + (ans !== cnt + '/12' ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(cnt, 6), 'The bottom number is all 12 outcomes of the coin and the die together.']]) });
    }),
    tpl('countout', (r) => {
      const kind = r.int(0, 2);
      if (kind === 0) { const n = r.int(4, 7), k = r.int(2, n - 1); const c = coins(n).filter((h) => h >= k).length; return N(one(r, n) + ' How many of the ' + (1 << n) + ' outcomes have at least ' + k + ' heads?', c, { s: 'Count the outcomes with ' + k + ', ' + (k + 1) + ', ..., ' + n + ' heads: ' + c + '.' }); }
      if (kind === 1) { const s2 = r.int(3, 11); const c = PAIRS.filter(([a, b]) => a + b === s2).length; return N(two(r) + ' How many of the 36 outcomes have the sum ' + s2 + '?', c, { s: 'List them with both orders: ' + c + '.' }); }
      const k = r.int(8, 24); const c = PAIRS.filter(([a, b]) => a * b > k).length;
      return N(two(r) + ' How many of the 36 outcomes have a product bigger than ' + k + '?', c, { s: 'Check each number on the first die and count the numbers on the second die that work: ' + c + ' outcomes in all.' });
    }),
    tpl('product', (r) => {
      const kind = r.int(0, 2);
      const tests = [['even', (x) => x % 2 === 0], ['odd', (x) => x % 2 === 1], ['a multiple of 3', (x) => x % 3 === 0]];
      const [desc, f] = tests[kind]; const c = PAIRS.filter(([a, b]) => f(a * b)).length; const ans = fr(c, 36);
      return N(two(r) + ' What is the probability that the product of the two numbers is ' + desc + '? Give a fraction in simplest form.', ans, { s: 'Count the pairs: ' + c + ' out of 36. {' + c + '/36}' + (ans !== c + '/36' ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(36 - c, 36), 'That is the opposite event.']]) });
    }),
  ],
});
