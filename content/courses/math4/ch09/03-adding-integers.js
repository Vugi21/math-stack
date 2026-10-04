import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(' + m(n) + ')' : String(n));
const keep = (list, ans) => list.filter((x, i) => String(x[0]) !== String(ans) && list.findIndex((y) => String(y[0]) === String(x[0])) === i);

export default lesson({
  id: 'm4-9-3-adding-integers',
  title: 'Adding integers',
  blurb: 'Add positive and negative numbers with the number line and with counters. Zero pairs make the rule clear.',
  concepts: ['integers', 'addition', 'zero-pairs'],

  tryFirst: [
    num('t1', 'A bag has 7 counters worth +1 each and 10 counters worth −1 each. One + counter and one − counter cancel to make 0. What is the total value of the bag?', -3, {
      h: ['Pair each + counter with a − counter. Each pair is worth 0.', 'How many − counters have no partner?'],
      s: '7 pairs cancel. 10 − 7 = 3 negative counters are left over. The total is −3.',
      w: [['3', 'The leftover counters are the negative ones, so the total is negative.'], ['17', 'The counters cancel in pairs. They do not add up in size.']],
    }),
    num('t2', 'Start at −5 on the number line. Move 8 steps to the right. Where do you stop?', 3, {
      h: ['5 steps bring you to 0.'],
      s: '5 steps reach 0 and 3 steps remain. You stop on 3.',
      w: [['-3', 'You pass zero and end on the right side.'], ['13', 'The start is 5 left of 0. Part of the move is used to get to 0.']],
    }),
  ],

  learn: [
    p('Adding integers is about moving on the number line, or about combining counters that cancel. Once you see why the rules work, you will not need to memorize them. To add a positive number, move right on the number line. To add a negative number, move left.'),
    widget('numberLineWalk', { a: 3, b: -5 }),
    def('zero pair', 'One positive counter (+1) and one negative counter (−1) together. They add to 0, so they cancel each other.'),
    p('Here is another picture. A <b>+</b> counter is worth 1. A <b>−</b> counter is worth −1. A + and a − together make a <b>zero pair</b>. They add to 0, so they cancel.'),
    ex('−6 + 4 with counters', ['Put down 6 negative counters and 4 positive counters.', 'Make zero pairs: 4 pairs use up all the positives.', '2 negative counters have no partner.', 'The total is −2.']),
    def('sum', 'The answer to an addition. A sum can be positive, negative or zero.'),
    rule('<b>Same signs.</b> Add the sizes. Keep the sign. −4 + (−3) = −7. Both groups are negative, so you have 7 negatives.'),
    rule('<b>Different signs.</b> Subtract the smaller size from the larger size. The answer has the sign of the number with the larger size. −9 + 5: 9 − 5 = 4, and 9 is negative, so −4.'),
    formula('Opposites add to zero', 'a + (−a) = 0', 'A number plus its opposite is 0. 8 + (−8) = 0.'),
    key('When the signs are different, the two numbers work against each other. The bigger size wins, and what is left over has its sign.'),
    ex('Different signs: 12 + (−15)', ['The sizes are 12 and 15. Subtract the smaller from the larger: 15 − 12 = 3.', 'The larger size, 15, belongs to a negative number. So the answer is negative.', '12 + (−15) = −3.', 'Check on the line: start at 12 and move 15 left. You pass 0 and land at −3.']),
    ex('Three numbers: −7 + 4 + (−9)', ['Go from left to right. −7 + 4 = −3.', 'Then −3 + (−9) = −12.', 'Check with counters: 7 + 9 = 16 negatives, 4 positives. 16 − 4 = 12 negatives left. So −12.']),
    tip('Always estimate the sign first. Ask: which side has more? Then find the size. Adding a positive can never move you left, and adding a negative can never move you right.'),
    warn('<b>Watch out.</b> −9 + 4 is not −13. Adding a positive makes the number bigger, so the answer is to the right of −9. It is −5.'),
    mcq('Lena says: "−6 + 9 = −3, because the answer always keeps the sign of the first number." What is wrong?', ['Nothing. She is right.', 'The sign comes from the number with the larger size. 9 is larger and positive, so the answer is 3.', '−6 + 9 = −15.'], 1, '9 positives cancel 6 negatives with 3 positives left over. −6 + 9 = 3.', 'Spot the mistake'),
    recap([['zero pair', 'a positive and a negative counter that cancel'], ['sum', 'answer to an addition'], ['same signs', 'add sizes, keep the sign'], ['different signs', 'subtract sizes, keep the sign of the larger']], [['Opposites', 'a + (−a) = 0'], ['Adding a negative', 'move left']]),
  ],

  practice: [
    num('p1', 'Find −8 + 5.', -3, {
      h: ['8 negatives, 5 positives. How many pairs?'],
      s: '5 zero pairs. 3 negatives are left. The answer is −3.',
      w: [['3', 'The larger size, 8, is negative. So the answer is negative.'], ['-13', 'The 5 is positive. It cancels part of the 8.']],
    }),
    num('p2', 'Find −6 + (−9).', -15, {
      h: ['Same signs: add the sizes.'],
      s: '6 + 9 = 15. Both are negative, so −15.',
      w: [['-3', 'Same signs means they pile up. Add the sizes.'], ['15', 'The answer keeps the negative sign.']],
    }),
    num('p3', 'What number do you add to −7 to get 0?', 7, {
      h: ['Zero pairs: what cancels −7?'],
      s: 'The opposite of −7 is 7. −7 + 7 = 0.',
      w: [['-7', '−7 + (−7) = −14.']],
    }),
    num('p4', 'Find −14 + 9.', -5, {
      h: ['14 − 9 = 5. Which sign does the larger size have?'],
      s: 'The larger size is 14, which is negative. The answer is −5.',
      w: [['5', '14 is the larger size and it is negative.'], ['-23', 'The 9 is positive, so it cancels part of the 14.']],
    }),
    num('p5', 'Start at −3. Hop right 7. Then hop left 12. Where do you stop?', -8, {
      h: ['Do the hops one at a time.'],
      s: '−3 + 7 = 4. Then 4 − 12 = −8.',
      w: [['-5', 'You started at −3, not 0. Begin the first hop from −3.'], ['8', 'The final hop crosses zero to the left side.']],
    }),
    num('p6', 'Two integers add to −4. One of them is 9. What is the other?', -13, {
      h: ['9 + ? = −4. How far is 9 from −4?'],
      s: 'From 9 down to −4 is 13 steps left. The other number is −13. Check: 9 + (−13) = −4.',
      w: [['5', '9 + 5 = 14, not −4.'], ['13', '9 + 13 = 22.']],
    }),
    num('p7', 'Choose two different integers from −3, −2, −1, 0, 1, 2, 3. How many pairs have a sum of 0? (The pair −2 and 2 is the same as 2 and −2.)', 3, {
      h: ['Which pairs are opposites?', 'Two different numbers, so 0 with 0 does not count.'],
      s: '−3 and 3, −2 and 2, −1 and 1. That is 3 pairs.',
      w: [['4', '0 and 0 are the same number. The numbers must be different.'], ['7', 'Count pairs, not numbers.']],
    }),
    mc('p8', 'Which sum is the smallest?', ['−5 + 2', '−4 + (−3)', '1 + (−6)', '−9 + 4'], 1, {
      h: ['Work out each sum. The smallest is farthest left.'],
      s: '−5 + 2 = −3, −4 + (−3) = −7, 1 + (−6) = −5, −9 + 4 = −5. The smallest is −7.',
      w: [[0, 'That one is −3. Find something farther left.'], [3, 'That is −5. Try the sum with two negatives.']],
    }),
  ],

  challenge: [
    chain('Score board', 'In a game, a player scores +9, then −14, then −6, then +11, then −8 in five rounds. The total starts at 0.', [
      num('c1a', 'What is the total after three rounds?', -11, { h: ['9 + (−14) = −5. Then add −6.'], s: '9 + (−14) = −5. −5 + (−6) = −11.' }),
      num('c1b', 'What is the total after all five rounds?', -8, { h: ['Start from −11 and add 11 and then −8.'], s: '−11 + 11 = 0. 0 + (−8) = −8.' }),
      num('c1c', 'What must the sixth round score be so that the final total is +5?', 13, { h: ['How far is −8 from 5?'], s: 'From −8 up to 0 is 8, then 5 more. 13.' }),
    ], 'The idea: keep a running total. To reach a target, count the distance on the number line.'),
    chain('Pairs that add to −7', 'We look for pairs of integers (a, b) whose sum is −7.', [
      num('c2a', 'How many pairs of negative integers a and b have a sum of −7? (Order does not matter, so −1 and −6 is the same as −6 and −1.)', 3, { h: ['Think of splitting 7: 1 + 6, 2 + 5, 3 + 4.'], s: '(−1, −6), (−2, −5), (−3, −4). That is 3.' }),
      num('c2b', 'Now one number is positive, from 1 to 5, and the other is negative. They add to −7. How many pairs are there?', 5, { h: ['For each positive number p, the other is −7 − p.'], s: 'p = 1 gives −8, p = 2 gives −9, and so on up to p = 5 giving −12. That is 5 pairs.' }),
      num('c2c', 'Of the pairs in the last part, what is the negative number that is farthest from zero?', -12, { h: ['The bigger the positive number, the more negative the other must be.'], s: 'With p = 5 the other is −12.' }),
    ], 'The idea: when you know one number and the sum, the other number is fixed. Use the number line to find it.'),
    mc('c3', 'Find the error. Sam says: "−7 + 3 = −10, because I added 7 and 3 and kept the minus." Which is the best reply?', ['He is right.', 'The 3 is positive and cancels 3 of the 7 negatives. The answer is −4.', 'The answer is 4.', 'The answer is 10.'], 1, {
      s: '7 negatives and 3 positives make 3 zero pairs. 4 negatives are left: −4.',
      w: [[2, 'The larger size is 7 and it is negative.']],
    }),
  ],

  quiz: [
    tpl('two', (r) => {
      const a = r.nz(-40, 40), b = r.nz(-40, 40);
      return N('Find ' + par(a) + ' + ' + par(b) + '.', a + b, { s: (Math.sign(a) === Math.sign(b) ? 'Same signs: add the sizes, ' + Math.abs(a) + ' + ' + Math.abs(b) + ' = ' + (Math.abs(a) + Math.abs(b)) + ', and keep the sign.' : 'Different signs: ' + Math.max(Math.abs(a), Math.abs(b)) + ' − ' + Math.min(Math.abs(a), Math.abs(b)) + ' = ' + Math.abs(a + b) + '. ' + (Math.abs(a) === Math.abs(b) ? 'The two numbers are opposites.' : 'The larger size is ' + (Math.abs(a) > Math.abs(b) ? par(a) : par(b)) + '.')) + ' Answer: ' + m(a + b) + '.', w: keep(Math.sign(a) === Math.sign(b) ? [[-(a + b), 'Both numbers are ' + (a < 0 ? 'negative, so the answer is negative.' : 'positive, so the answer is positive.')]] : [[-(a + b), 'Check the sign. The sign comes from the number with the larger size.'], [Math.abs(a) + Math.abs(b), 'Only add the sizes when both signs are the same.']], a + b) });
    }),
    tpl('three', (r) => {
      const a = r.nz(-25, 25), b = r.nz(-25, 25), c = r.nz(-25, 25);
      return N('Find ' + par(a) + ' + ' + par(b) + ' + ' + par(c) + '.', a + b + c, { s: par(a) + ' + ' + par(b) + ' = ' + m(a + b) + '. Then ' + par(a + b) + ' + ' + par(c) + ' = ' + m(a + b + c) + '.' });
    }),
    tpl('missing', (r) => {
      const a = r.nz(-30, 30), t = r.nz(-30, 30);
      return N('What number can you add to ' + par(a) + ' to get ' + par(t) + '?', t - a, { s: 'Count the move from ' + m(a) + ' to ' + m(t) + ': it is ' + m(t - a) + '. Check: ' + par(a) + ' + ' + par(t - a) + ' = ' + m(t) + '.', w: keep([[a + t, 'Check your answer by adding it to ' + m(a) + '.'], [t, 'Adding ' + m(t) + ' to ' + m(a) + ' would not give ' + m(t) + '.']], t - a) });
    }),
    tpl('counters', (r) => {
      const pos = r.int(3, 30), neg = r.int(3, 30);
      if (pos === neg) return N('A bag has 12 positive counters and 12 negative counters. What is the total value?', 0, { s: '12 zero pairs make 0.' });
      return N('A bag has ' + pos + ' positive counters and ' + neg + ' negative counters. Each is worth 1 or −1. What is the total value?', pos - neg, { s: 'Make ' + Math.min(pos, neg) + ' zero pairs. ' + Math.abs(pos - neg) + (Math.abs(pos - neg) === 1 ? ' counter is' : ' counters are') + ' left over, so ' + m(pos - neg) + '.' });
    }),
    tpl('temp', (r) => {
      const t = r.int(-20, 5), a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 15);
      return N('At 6 a.m. it is ' + m(t) + ' degrees. By 9 it is ' + a + ' degrees warmer. By noon it is ' + b + ' degrees warmer again. By 6 p.m. it falls ' + c + ' degrees. What is the 6 p.m. temperature?', t + a + b - c, { s: m(t) + ' + ' + a + ' + ' + b + ' − ' + c + ' = ' + m(t + a + b - c) + '.', w: keep([[t + a + b + c, 'The last change is a fall. It goes down.']], t + a + b - c) });
    }),
    tpl('sumknown', (r) => {
      const x = r.nz(-30, 30), s = r.nz(-30, 30);
      return N('Two integers add to ' + m(s) + '. One of them is ' + m(x) + '. What is the other?', s - x, { s: m(s) + ' − ' + par(x) + ' = ' + m(s - x) + '. Check: ' + par(x) + ' + ' + par(s - x) + ' = ' + m(s) + '.', w: keep([[s + x, 'Check by adding your answer to ' + m(x) + '.']], s - x) });
    }),
    tpl('hops', (r) => {
      const s = r.int(-15, 15), a = r.int(2, 20), b = r.int(2, 20);
      return N('Start at ' + m(s) + '. Hop ' + a + ' to the right, then ' + b + ' to the left. Where do you stop?', s + a - b, { s: m(s) + ' + ' + a + ' = ' + m(s + a) + '. Then ' + m(s + a) + ' − ' + b + ' = ' + m(s + a - b) + '.' });
    }),
  ],
});
