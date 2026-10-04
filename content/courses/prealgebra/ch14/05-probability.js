import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => String(x[0]) !== String(ans));
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const ch = (n, k) => { let t = 1; for (let i = 1; i <= k; i++) t = (t * (n - k + i)) / i; return t; };
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };

export default lesson({
  id: 'pre-14-5-probability',
  title: 'Probability',
  blurb: 'Measure chance with fractions: favorable outcomes over all equally likely outcomes, complements, and two-step events.',
  concepts: ['probability', 'complement', 'independent-events'],

  tryFirst: [
    num('t1', 'A bag holds 3 red, 5 blue and 2 green marbles. You pick one without looking. What is the probability it is red? Give a fraction in lowest terms.', '3/10', {
      h: ['How many marbles are in the bag in total?', 'How many of them are red?'],
      s: 'There are 3 + 5 + 2 = 10 marbles, 3 of them red. The probability is 3 out of 10: {3/10}.',
      w: [['3/7', 'The denominator is all the marbles (10), not just the non-red ones.'], ['1/3', 'There are three colors, but they are not equally likely: the colors have different numbers of marbles.']],
    }),
    num('t2', 'A fair coin is flipped twice. What is the probability that both flips are heads? Give a fraction.', '1/4', {
      h: ['List all the possible results of two flips: HH, HT, ...', 'How many are there, and how many are HH?'],
      s: 'The outcomes are HH, HT, TH, TT: 4 equally likely outcomes. Only HH is both heads: {1/4}.',
      w: [['1/2', 'That is the chance for a single flip. For both flips to land heads you need to be lucky twice.'], ['1/3', 'There are 4 outcomes, not 3: HT and TH are different outcomes.']],
    }),
  ],

  learn: [
    p('Probability measures how likely something is. It turns the counting skills of this chapter into a number that tells you what to expect. Throughout, we assume the situation is <b>fair</b>: every basic outcome is just as likely as every other one.'),
    def('outcome and event', 'An <b>outcome</b> is one possible result, such as rolling a 4. An <b>event</b> is a collection of outcomes you care about, such as "rolling an even number" (the outcomes 2, 4, 6).'),
    def('probability', 'A number from 0 to 1 that says how likely an event is. 0 means impossible, 1 means certain. It is usually written as a fraction. The closer to 1, the more likely.'),
    formula('Probability', 'P(event) = good outcomes ÷ all outcomes', 'This works only when all outcomes are equally likely. The top counts the outcomes that make the event happen; the bottom counts every possible outcome. Counting is the heart of probability.'),
    ex('A single die', ['What is the probability of rolling a number greater than 4 on a fair die?', 'All outcomes: 1, 2, 3, 4, 5, 6, which is 6, all equally likely.', 'Good outcomes: 5 and 6, which is 2.', 'P = 2 ÷ 6 = {1/3}.']),
    widget('spinner', { s0: 3, s1: 2, s2: 1 }),
    p('Try the spinner. The probability of each color equals its share of slices. Spin 20 times, then compare the tally with the prediction. Predictions are not guarantees: the results wobble around them and settle down only after very many spins.'),
    rule('<b>Complement.</b> P(not A) = 1 − P(A). If it rains with probability {3/10}, it stays dry with probability {7/10}. This is "total minus unwanted" again, with the total probability equal to 1.'),
    tip('For "at least one" questions, find the chance of <b>none</b> and subtract from 1. The chance of at least one 6 in two dice is easiest as 1 − (chance of no 6 at all) = 1 − {25/36} = {11/36}.'),
    ex('Two dice', ['Roll two dice. What is the probability the sum is 7?', 'All outcomes: 6 × 6 = 36, all equally likely.', 'Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1): 6 outcomes.', 'P = 6 ÷ 36 = {1/6}.']),
    def('independent events', 'Two events are independent when the result of one does not change the chance of the other. A coin flip and a die roll are independent.'),
    rule('<b>Two steps (independent events).</b> If one event does not affect the other, multiply: P(A then B) = P(A) × P(B). Flip a coin and roll a die: P(heads and a 6) = {1/2} × {1/6} = {1/12}. This is the multiplication principle in probability form.'),
    ex('Without putting back', ['A bag has 4 red and 3 blue marbles. You take two, one after another, without putting any back. P(both red)?', 'First red: {4/7}. Now the bag has 3 red and 3 blue, so second red: {3/6}.', 'P = {4/7} × {3/6} = {12/42} = {2/7}.', 'Check by counting pairs: the bag has 7 × 6 ÷ 2 = 21 pairs, and 4 × 3 ÷ 2 = 6 are both red: {6/21} = {2/7}.']),
    tbl(['Probability', 'Meaning'], [['0', 'Impossible'], ['{1/4}', 'Unlikely, 1 in 4'], ['{1/2}', 'Even chance'], ['{3/4}', 'Likely'], ['1', 'Certain']], 'The probability scale'),
    warn('<b>"Either it happens or it does not" is not 50-50.</b> Winning a raffle or rolling a 6 is "either yes or no", but the outcomes are not equally likely. Equal likelihood is a condition you must check, not an assumption you can make.'),
    warn('<b>Probability is not a promise.</b> If a fair coin has landed heads five times in a row, the chance of heads next is still {1/2}. The coin has no memory. Also, a probability can never be below 0 or above 1: if you get {7/5}, you have counted something wrongly.'),
    key('Probability = counting, then dividing. Count the outcomes you want, count all the (equally likely) outcomes, and write the fraction. When events happen in sequence and do not affect each other, multiply their probabilities.'),
    mcq('Maya says: "A die lands on 6 or not on 6, so the probability of a 6 is {1/2}." What is wrong?', ['Nothing, it is 1/2.', 'The two outcomes "6" and "not 6" are not equally likely. 1 outcome is a 6 and 5 are not, so the probability is {1/6}.', 'Dice cannot be analyzed with probability.'], 1, 'Count equally likely outcomes: 1, 2, 3, 4, 5, 6. Only 1 of 6 is a six. "6 or not 6" are two events, but not two equally likely outcomes.', 'Spot the mistake'),
    recap([['probability', 'a number from 0 (impossible) to 1 (certain)'], ['event', 'a set of outcomes you care about'], ['complement', 'the event "not A"'], ['independent', 'one result does not change the other\'s chance']], [['Probability', 'good outcomes ÷ all outcomes'], ['Complement', 'P(not A) = 1 − P(A)'], ['Independent events', 'P(A then B) = P(A) × P(B)']]),
  ],

  practice: [
    num('p1', 'A fair six-sided die is rolled. What is the probability of rolling a prime number? (Give a fraction in lowest terms.)', '1/2', {
      h: ['List the primes from 1 to 6. Is 1 prime?'],
      s: 'The primes are 2, 3 and 5: 3 outcomes out of 6. {3/6} = {1/2}.',
      w: [['2/3', 'You included 1 or 4. 1 is not prime and 4 = 2 × 2 is not prime.'], ['1/3', 'There are three primes (2, 3, 5), not two.']],
    }),
    num('p2', 'A bag has 4 red and 6 blue marbles. What is the probability that a marble picked at random is not red?', '3/5', {
      h: ['Count the marbles that are not red.'],
      s: '6 blue marbles out of 10 in all: {6/10} = {3/5}. (Or 1 − {4/10} = {6/10}.)',
      w: [['2/5', 'That is the probability of red. The question asks for not red.']],
    }),
    num('p3', 'Two fair dice are rolled. What is the probability that the sum is 8?', '5/36', {
      h: ['How many outcomes in total?', 'List the pairs that sum to 8.'],
      s: 'There are 36 outcomes. The sum is 8 for (2,6), (3,5), (4,4), (5,3), (6,2): 5 outcomes. P = {5/36}.',
      w: [['3/36', 'You counted (2,6), (3,5), (4,4) only. (6,2) and (5,3) are also different outcomes.'], ['1/6', 'That is the probability of sum 7. Count again for sum 8.']],
    }),
    num('p4', 'A fair coin is flipped 3 times. What is the probability of getting all heads?', '1/8', {
      h: ['Each flip has 2 outcomes. How many outcomes for 3 flips?', 'Or multiply the chances of each flip.'],
      s: 'There are 2 × 2 × 2 = 8 equally likely outcomes, and only HHH is all heads. Or {1/2} × {1/2} × {1/2} = {1/8}.',
      w: [['1/6', 'Three flips have 2 × 2 × 2 = 8 outcomes, not 6.'], ['1/4', 'That is the probability of two heads in two flips. A third flip halves it again.']],
    }),
    num('p5', 'A number is picked at random from 1 to 30. What is the probability that it is a multiple of 4 or a multiple of 6 (or both)?', '1/3', {
      h: ['Count multiples of 4 and multiples of 6, then fix the double counting.', 'Multiples of both are multiples of 12.'],
      s: 'Multiples of 4: 7. Multiples of 6: 5. Multiples of 12: 2. Total 7 + 5 − 2 = 10. P = {10/30} = {1/3}.',
      w: [['7/30', 'That counts only the multiples of 4. Multiples of 6 that are not multiples of 4 count too.'], ['2/5', 'That is 12/30, which counts 12 and 24 twice.']],
    }),
    num('p6', 'A bag has 3 red and 2 blue marbles. Two marbles are drawn one after the other without putting the first back. What is the probability both are red?', '3/10', {
      h: ['After a red is removed, how many marbles are left, and how many are red?', 'Multiply the two chances.'],
      s: 'First red: {3/5}. Then 2 red out of 4 left: {2/4}. {3/5} × {2/4} = {6/20} = {3/10}.',
      w: [['9/25', 'That would be right if the first marble were put back. Without putting it back, the second draw is from 4 marbles, 2 of them red.'], ['3/5', 'That is only the chance of the first marble being red.']],
    }),
    num('p7', 'A bag has 3 red and 5 blue marbles. How many more red marbles must be added so that the probability of picking red becomes {2/3}?', 7, {
      h: ['After adding x red marbles there are 3 + x red out of 8 + x.', 'Try x = 7. Or note that blue marbles are then 1 out of every 3, so 5 blue is one third of the bag.'],
      s: 'The 5 blue marbles never change. For red to be {2/3} of the bag, blue must be {1/3}, so the bag has 15 marbles. That is 3 + x red + 5 blue = 15, giving x = 7. Check: {10/15} = {2/3}.',
      w: [['5', 'With 5 more red marbles it is {8/13}, not {2/3}.'], ['10', '10 is the number of red marbles in the end. The question asks how many to add to the 3 already there.']],
    }),
  ],

  challenge: [
    chain('The marble bag', 'A bag holds 4 red, 3 green and 5 yellow marbles.', [
      num('c1a', 'How many marbles are in the bag?', 12, { h: ['Add the three colors.'], s: '4 + 3 + 5 = 12.' }),
      num('c1b', 'What is the probability that a marble drawn at random is not yellow? Give a fraction in lowest terms.', '7/12', { h: ['Count the non-yellow marbles, or use 1 − P(yellow).'], s: '4 + 3 = 7 non-yellow out of 12: {7/12}.', w: [['5/12', 'That is the probability of yellow. The question asks for not yellow.']] }),
      num('c1c', 'You draw a marble, look, put it back, and draw again. What is the probability both are red?', '1/9', { h: ['Each draw has the same chances because you put the marble back.'], s: 'P(red) = {4/12} = {1/3}. Both red: {1/3} × {1/3} = {1/9}.', w: [['1/3', 'That is the probability for one draw. For both draws multiply the two chances.']] }),
    ], 'The idea: count outcomes for one step, use the complement for "not", and multiply the probabilities of separate steps.'),
    chain('Dice sums', 'Two fair dice are rolled.', [
      num('c2a', 'How many equally likely outcomes are there?', 36, { h: ['6 choices for each die.'], s: '6 × 6 = 36.' }),
      num('c2b', 'What is the probability the sum is exactly 7? Give a fraction in lowest terms.', '1/6', { h: ['There are 6 pairs that add to 7.'], s: '{6/36} = {1/6}.' }),
      num('c2c', 'What is the probability that the sum is a prime number? (The possible sums are 2 to 12.)', '5/12', { h: ['Prime sums: 2, 3, 5, 7, 11. How many outcomes make each? 1, 2, 4, 6, 2.'], s: '1 + 2 + 4 + 6 + 2 = 15 outcomes. {15/36} = {5/12}.', w: [['5/11', 'There are 36 equally likely outcomes, not 11 sums. The sums are not equally likely.']] }),
    ], 'The idea: the sums 2 to 12 are NOT equally likely (7 is the most common). Always count the 36 equally likely pairs.'),
    mc('c3', 'Find the error. Omar says: "Either I win the school raffle or I do not, so my chance of winning is 1 out of 2." What is wrong with the reasoning?', ['Winning and losing are not equally likely: with 200 tickets sold, one ticket wins only 1 out of 200.', 'Nothing, it is 1/2.', 'Raffles cannot be won.', 'The chance is 2 out of 1.'], 0, {
      s: 'Probability counts equally likely outcomes. Each ticket is equally likely to be drawn, so one ticket out of 200 has a {1/200} chance.',
      w: [[1, 'Two possible results does not mean two equally likely results.'], [3, 'A probability can never be more than 1.']],
    }),
  ],

  quiz: [
    tpl('marble', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(1, 8), t = a + b + c, [x, y, z] = r.shuffle(['red', 'blue', 'green', 'yellow', 'purple', 'orange']).slice(0, 3), not = r.bool();
      return N('A bag contains ' + a + ' ' + x + ', ' + b + ' ' + y + ' and ' + c + ' ' + z + ' marbles. One is drawn at random. What is the probability it is ' + (not ? 'not ' : '') + x + '? (Fraction in lowest terms.)', fr(not ? t - a : a, t), { s: (not ? (t - a) : a) + ' favorable out of ' + t + ' marbles, which reduces to ' + fr(not ? t - a : a, t) + '.', w: W(fr(not ? t - a : a, t), [[fr(not ? a : t - a, t), not ? 'That is the probability of ' + x + ', not of "not ' + x + '".' : 'That is the probability of "not ' + x + '".']].concat(not ? [] : [[fr(a, t - a), 'The denominator must be all the marbles, not only the others.']]).filter((w) => w[0] !== fr(not ? t - a : a, t))) });
    }),
    tpl('die', (r) => {
      const n = r.int(8, 30), kind = r.pick([['a multiple of 3', (v) => v % 3 === 0], ['a multiple of 4', (v) => v % 4 === 0], ['a prime number', isPrime], ['a perfect square', (v) => Number.isInteger(Math.sqrt(v))], ['greater than ' + Math.floor(n * 0.6), (v) => v > Math.floor(n * 0.6)], ['even', (v) => v % 2 === 0]]);
      let c = 0; for (let v = 1; v <= n; v++) if (kind[1](v)) c++;
      return N('A fair die has ' + n + ' faces numbered 1 to ' + n + '. What is the probability that a roll shows a number that is ' + kind[0] + '? (Fraction in lowest terms; give 0 if impossible.)', fr(c, n), { s: c + ' of the ' + n + ' faces qualify: ' + fr(c, n) + '.', w: W(fr(c, n), [[fr(c, n - c || 1), 'The denominator is all the faces, ' + n + ', not only the ones that fail.']]) });
    }),
    tpl('twodice', (r) => {
      const t = r.int(3, 11), kind = r.pick(['eq', 'ge', 'le']); let c = 0; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) { const s = i + j; if (kind === 'eq' ? s === t : kind === 'ge' ? s >= t : s <= t) c++; }
      const w = kind === 'eq' ? 'exactly ' + t : kind === 'ge' ? 'at least ' + t : 'at most ' + t;
      return N('Two fair six-sided dice are rolled. What is the probability that the sum is ' + w + '? (Lowest terms.)', fr(c, 36), { s: c + ' of the 36 outcomes qualify: ' + fr(c, 36) + '.', w: W(fr(c, 36), [[fr(1, 11), 'The 11 possible sums are not equally likely, so count out of the 36 equally likely pairs instead.']].filter(() => c !== 36 / 11)) });
    }),
    tpl('compl', (r) => {
      const b = r.int(5, 24), a = r.int(1, b - 1), nm = name(r), ev = r.pick(['wins the game', 'catches the bus', 'finds a parking spot', 'rolls the lucky number']);
      return N('The probability that ' + nm + ' ' + ev + ' is ' + a + '/' + b + '. What is the probability that ' + nm + ' does not? (Lowest terms.)', fr(b - a, b), { s: '1 − ' + a + '/' + b + ' = ' + (b - a) + '/' + b + ', which reduces to ' + fr(b - a, b) + '.', w: W(fr(b - a, b), [[fr(a, b), 'That is the probability that it does happen. Subtract it from 1.'], [fr(1, b - a), 'The complement is (total − favorable) out of the total.']].filter((w) => w[0] !== fr(b - a, b))) });
    }),
    tpl('repl', (r) => {
      const a = r.int(2, 6), b = r.int(2, 6), t = a + b, cl = r.shuffle(['red', 'blue', 'green', 'white']).slice(0, 2), ans = fr(a * b, t * t);
      return N('A bag has ' + a + ' ' + cl[0] + ' and ' + b + ' ' + cl[1] + ' marbles. You draw one, note the color, put it back, and draw again. What is the probability the first is ' + cl[0] + ' and the second is ' + cl[1] + '? (Lowest terms.)', ans, { s: 'P = ' + a + '/' + t + ' × ' + b + '/' + t + ' = ' + a * b + '/' + t * t + ', which reduces to ' + ans + '.', w: W(ans, [[fr(a * b, t * (t - 1)), 'You put the marble back, so the second draw is from all ' + t + ' marbles again.']]) });
    }),
    tpl('norepl', (r) => {
      const a = r.int(2, 7), b = r.int(2, 7), t = a + b, ans = fr(a * (a - 1), t * (t - 1)), cl = r.shuffle(['red', 'blue', 'green', 'white']).slice(0, 2);
      return N('A bag has ' + a + ' ' + cl[0] + ' and ' + b + ' ' + cl[1] + ' marbles. You take two marbles out one after the other and do not put either back. What is the probability both are ' + cl[0] + '? (Lowest terms.)', ans, { s: 'First: ' + a + '/' + t + '. Second: ' + (a - 1) + '/' + (t - 1) + '. Multiply: ' + a * (a - 1) + '/' + t * (t - 1) + ' = ' + ans + '.', w: W(ans, [[fr(a * a, t * t), 'The first marble is not put back, so the second draw has one fewer marble of that color and one fewer in total.']]) });
    }),
    tpl('coins', (r) => {
      const n = r.int(3, 10), k = r.int(0, n), c = ch(n, k), ans = fr(c, Math.pow(2, n));
      return N('A fair coin is flipped ' + n + ' times. What is the probability of getting exactly ' + k + ' head' + (k === 1 ? '' : 's') + '? (Lowest terms.)', ans, { s: 'There are 2^' + n + ' = ' + Math.pow(2, n) + ' equally likely outcomes. The number with exactly ' + k + ' head' + (k === 1 ? '' : 's') + ' is ' + c + '. P = ' + ans + '.', w: W(ans, [[fr(1, Math.pow(2, n)), 'That is the chance of one particular sequence. Several sequences have the right number of heads.']].filter((w) => w[0] !== ans)) });
    }),
    tpl('expect', (r) => {
      const b = r.pick([4, 5, 6, 8, 10, 12]), a = r.int(1, b - 1), times = b * r.int(2, 30);
      return N('A spinner lands on blue with probability ' + a + '/' + b + '. If it is spun ' + times + ' times, about how many times would you expect blue?', times / b * a, { s: 'Expected count = ' + a + '/' + b + ' × ' + times + ' = ' + (times / b * a) + '.', w: W(times / b * a, [[a * times, 'Multiply by the fraction ' + a + '/' + b + ', which means multiply by ' + a + ' and divide by ' + b + '.']]) });
    }),
  ],
});
