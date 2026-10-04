import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(' + m(n) + ')' : String(n));
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));
const sum = (a) => a.reduce((x, y) => x + y, 0);
// text for a signed list: first term plain, rest with + or −
const signed = (list) => list.map((x, i) => (i === 0 ? m(x) : (x < 0 ? ' − ' + Math.abs(x) : ' + ' + x))).join('');

export default lesson({
  id: 'm4-9-5-rearranging-sums',
  title: 'Rearranging sums',
  blurb: 'Reorder and group sums with negatives, pair terms to make zero, and handle long alternating sums.',
  concepts: ['integers', 'addition', 'patterns', 'zero-pairs'],

  tryFirst: [
    num('t1', 'Find −17 + 25 + 17 − 5. Look for a clever order.', 20, {
      h: ['Is there a pair that adds to zero?'],
      s: '−17 + 17 = 0. Then 25 − 5 = 20. The sum is 20.',
      w: [['-4', 'Keep every sign: −17, +25, +17, −5. Pair −17 with 17.'], ['0', 'Only one pair cancels. 25 − 5 is still left.']],
    }),
    num('t2', 'Find 1 − 2 + 3 − 4 + 5 − 6. Try pairing the terms.', -3, {
      h: ['What is 1 − 2? What is 3 − 4?'],
      s: '1 − 2 = −1, 3 − 4 = −1, 5 − 6 = −1. Three pairs make −3.',
      w: [['-1', 'There are three pairs, each worth −1.'], ['3', 'Each pair, like 1 − 2, is negative. Three pairs of −1 do not make 3.']],
    }),
  ],

  learn: [
    p('Adding in a different order gives the same sum. 3 + 8 + 5 = 5 + 3 + 8. This also works for negatives, if each number keeps its own sign. Knowing this lets you choose the order that makes the calculation easy.'),
    def('term', 'One number in a sum, together with the sign in front of it. In 10 − 4 + 6 the terms are 10, −4 and +6.'),
    formula('Order does not matter', 'a + b = b + a', 'This works for any integers, including negatives. The signs travel with the numbers.'),
    p('Think of 10 − 4 + 6 as the sum of three numbers: 10, −4, and +6. The minus sign belongs to the 4. When you move the 4, take the minus sign with it.'),
    ex('Reorder 10 − 4 + 6', ['The terms are 10, −4, +6.', 'Put them in any order. 10 + 6 − 4 = 12.', 'Also 6 + 10 − 4 = 12. And −4 + 10 + 6 = 12.', 'The sum is always 12.']),
    rule('<b>Rearranging.</b> A sum can be written in any order as long as each term keeps its sign. Group the positives together and the negatives together, or find pairs that cancel.'),
    def('cancel', 'Two terms cancel when they are opposites. Their sum is 0, so they can be crossed out. −23 and +23 cancel.'),
    ex('Find −23 + 14 + 23 − 9', ['Look for opposites: −23 and 23 make 0.', 'What is left: 14 − 9 = 5.', 'The sum is 5.']),
    ex('Group by sign: 18 − 7 − 3 + 12', ['Positive terms: 18 + 12 = 30.', 'Negative terms: −7 − 3 = −10.', 'Add the two groups: 30 + (−10) = 20.']),
    key('Each term <b>keeps its own sign</b> when it moves. Then group the terms that are easy to combine: opposites, or pairs that make tens.'),
    p('<b>Long alternating sums.</b> Sums like 1 − 2 + 3 − 4 + … are not hard if you make pairs.'),
    ex('1 − 2 + 3 − 4 + … + 59 − 60', ['Pair the terms: (1 − 2), (3 − 4), …, (59 − 60).', 'Each pair equals −1.', '60 terms make 30 pairs.', 'The sum is 30 × (−1) = −30.']),
    rule('<b>Odd number of terms.</b> If there is one term left over, add it after the pairs. 1 − 2 + 3 has one pair (1 − 2 = −1) and a leftover 3: −1 + 3 = 2.'),
    ex('1 − 2 + 3 − 4 + … − 20 + 21', ['The first 20 terms make 10 pairs. Each pair is −1, so they give −10.', 'The leftover term is +21.', '−10 + 21 = 11.']),
    tip('Count terms before you pair them. An even count pairs off completely. An odd count leaves one term over, and that term keeps its sign.'),
    warn('<b>Watch out.</b> 10 − 4 + 6 is not 10 − 6 + 4. If you swap 4 and 6 you must move their signs too: the correct swap is 10 + 6 − 4.'),
    widget('numberLineWalk', { a: 9, b: -9 }),
    mcq('Mia says: "10 − 4 + 6 = 10 − 6 + 4 because adding in any order gives the same sum." What is wrong?', ['Nothing. She is right.', 'The minus sign belongs to the 4, not to the place in the sum. 10 − 6 + 4 = 8 but 10 − 4 + 6 = 12.', 'Both equal 0.'], 1, 'Moving 4 and 6 changes which number is subtracted. Rearrange the terms with their signs: 10 + 6 − 4.', 'Spot the mistake'),
    recap([['term', 'a number in a sum with its sign'], ['cancel', 'opposites add to 0'], ['pair', 'group terms to make easy sums']], [['Order', 'a + b = b + a'], ['Alternating pairs', '(1 − 2) = −1, each pair']]),
  ],

  practice: [
    num('p1', 'Find 46 − 18 − 46 + 20.', 2, {
      h: ['Find a pair that cancels.'],
      s: '46 − 46 = 0. Then −18 + 20 = 2.',
      w: [['-2', '−18 + 20 is positive, because 20 is larger.'], ['0', 'After 46 − 46, −18 + 20 is left.']],
    }),
    num('p2', 'Find −5 + 12 − 9 + 5 − 12.', -9, {
      h: ['−5 and 5 cancel. 12 and −12 cancel.'],
      s: '−5 + 5 = 0 and 12 − 12 = 0. Only −9 remains.',
      w: [['9', 'The only number left over is −9, with its sign.']],
    }),
    num('p3', 'Find 1 − 2 + 3 − 4 + … + 19 − 20.', -10, {
      h: ['Make pairs (1 − 2), (3 − 4), … How many pairs?'],
      s: '20 terms make 10 pairs. Each pair is −1. The sum is −10.',
      w: [['-20', 'Each pair is −1, and there are 10 pairs.'], ['10', 'Each pair is negative.']],
    }),
    num('p4', 'Find 1 − 2 + 3 − 4 + … − 98 + 99.', 50, {
      h: ['The last term, 99, has no partner.', 'Pair up 1 to 98 first.'],
      s: '1 − 2 through 97 − 98 make 49 pairs, each −1: −49. Then add 99: 50.',
      w: [['-49', 'You forgot the last term +99.'], ['49', 'The pairs are negative: −49. Then add 99.']],
    }),
    num('p5', 'Find 100 − 99 + 98 − 97 + … + 2 − 1.', 50, {
      h: ['Pair (100 − 99), (98 − 97), …'],
      s: 'Each pair is +1. There are 50 pairs. The sum is 50.',
      w: [['-50', 'Each pair has the larger number first, so it is positive.'], ['100', 'There are 50 pairs, not 100.']],
    }),
    num('p6', 'Find the sum of all the integers from −10 to 8.', -19, {
      h: ['−8 to 8 cancel in pairs.', 'What is left over?'],
      s: 'The numbers −8 to 8 add to 0. Left over: −10 and −9. Sum: −19.',
      w: [['-18', 'Check the leftover numbers: −10 and −9.'], ['-9', 'There are two numbers left over.']],
    }),
    num('p7', 'What number goes in the box? 3 − 7 + □ − 5 = 0', 9, {
      h: ['First work out 3 − 7 − 5.'],
      s: '3 − 7 − 5 = −9. The box must be 9 so the total is 0.',
      w: [['-9', 'The box must cancel the −9.'], ['7', 'Work out 3 − 7 − 5 first.']],
    }),
    mc('p8', 'Which expression has the same value as 10 − 4 + 6?', ['10 − 6 + 4', '6 + 10 − 4', '4 − 10 + 6', '10 + 4 − 6'], 1, {
      h: ['The terms are 10, −4, and +6.'],
      s: '10 − 4 + 6 = 12. 6 + 10 − 4 is the same terms in another order, also 12.',
      w: [[0, 'That is 10, −6, +4, which is 8.'], [3, 'That has +4 and −6, which is 8.']],
    }),
  ],

  challenge: [
    chain('Swinging sums', 'These sums go up and down by one each time.', [
      num('c1a', 'Find 1 − 2 + 3 − 4 + … + 49 − 50.', -25, { h: ['25 pairs.'], s: '25 pairs of −1 make −25.' }),
      num('c1b', 'Find 1 − 2 + 3 − 4 + … − 50 + 51.', 26, { h: ['Pair (1 − 2), …, (49 − 50). The 51 has no partner.'], s: '25 pairs of −1 make −25. Add the leftover 51: 26.' }),
      num('c1c', 'Find 2 − 4 + 6 − 8 + … + 50 − 52.', -26, { h: ['Pair (2 − 4), (6 − 8), … Each pair is −2.', 'How many pairs?'], s: 'The numbers 2, 4, …, 52 are 26 numbers. That is 13 pairs of −2. The sum is −26.' }),
    ], 'The idea: pair the terms. Every pair has the same value, so multiply the pair value by the number of pairs.'),
    chain('Cancelling runs', 'We add runs of consecutive integers.', [
      num('c2a', 'What is the sum of the integers from −6 to 6?', 0, { h: ['Each number cancels its opposite.'], s: '−6 + 6, −5 + 5, …, −1 + 1, and 0. The sum is 0.' }),
      num('c2b', 'What is the sum of the integers from −6 to 10?', 34, { h: ['−6 to 6 cancel. What is left?'], s: '−6 to 6 add to 0. Left: 7 + 8 + 9 + 10 = 34.' }),
      num('c2c', 'What is the sum of the integers from −20 to 17?', -57, { h: ['−17 to 17 cancel. What is left on the negative side?'], s: '−17 to 17 add to 0. Left: −18 − 19 − 20 = −57.' }),
    ], 'The idea: opposites cancel. Find the numbers with no opposite and add only those.'),
    mc('c3', 'Find the error. Leo says: "1 − 2 + 3 − 4 + 5 − 6 + 7 has 7 terms, so there are 3 pairs worth −1, giving −3." Which is the best reply?', ['He is right.', 'He forgot the leftover +7. The sum is −3 + 7 = 4.', 'The sum is 3.', 'There are 4 pairs.'], 1, {
      s: 'Three pairs give −3. The 7 has no partner. −3 + 7 = 4.',
      w: [[0, 'There are 7 terms. 6 of them make pairs. The 7th still has to be added.']],
    }),
  ],

  quiz: [
    tpl('cancel', (r) => {
      const a = r.int(5, 60), b = r.int(2, 40), c = r.int(2, 40);
      const parts = r.shuffle([a, -a, b, -c]);
      const v = b - c;
      return N('Find ' + signed(parts) + '.', v, { s: 'The numbers ' + a + ' and ' + m(-a) + ' cancel. What is left: ' + m(b) + ' and ' + m(-c) + '. The sum is ' + m(v) + '.', w: keep([[b + c, 'Each number keeps its own sign.']], v) });
    }),
    tpl('alt', (r) => {
      const s = r.int(1, 30), k = r.int(3, 30);
      const terms = []; for (let i = 0; i < 2 * k; i++) terms.push(i % 2 ? -(s + i) : s + i);
      return N('Find ' + s + ' − ' + (s + 1) + ' + ' + (s + 2) + ' − ' + (s + 3) + ' + … + ' + (s + 2 * k - 2) + ' − ' + (s + 2 * k - 1) + '.', sum(terms), { s: 'There are ' + 2 * k + ' terms, which make ' + k + ' pairs. Each pair is −1. The sum is ' + m(-k) + '.', w: keep([[k, 'Each pair is negative, because the second number is larger.']], sum(terms)) });
    }),
    tpl('altodd', (r) => {
      const s = r.int(1, 20), k = r.int(3, 30);
      const terms = []; for (let i = 0; i < 2 * k + 1; i++) terms.push(i % 2 ? -(s + i) : s + i);
      return N('Find ' + s + ' − ' + (s + 1) + ' + ' + (s + 2) + ' − ' + (s + 3) + ' + … − ' + (s + 2 * k - 1) + ' + ' + (s + 2 * k) + '.', sum(terms), { s: 'The first ' + 2 * k + ' terms make ' + k + ' pairs worth −1: ' + m(-k) + '. Then add the last term, ' + (s + 2 * k) + ': ' + m(sum(terms)) + '.', w: keep([[-k, 'You left out the last term.']], sum(terms)) });
    }),
    tpl('down', (r) => {
      const k = r.int(5, 60);
      const n = 2 * k;
      const terms = []; for (let i = n; i >= 1; i--) terms.push((n - i) % 2 ? -i : i);
      return N('Find ' + n + ' − ' + (n - 1) + ' + ' + (n - 2) + ' − ' + (n - 3) + ' + … + 2 − 1.', sum(terms), { s: 'Pair them: each pair (like ' + n + ' − ' + (n - 1) + ') is +1, and there are ' + k + ' pairs. The sum is ' + k + '.' });
    }),
    tpl('run', (r) => {
      const a = r.int(3, 40), b = r.int(1, 40);
      const lo = -a, hi = b;
      const terms = []; for (let i = lo; i <= hi; i++) terms.push(i);
      return N('What is the sum of all the integers from ' + m(lo) + ' to ' + hi + '?', sum(terms), { s: 'The numbers from ' + m(-Math.min(a, b)) + ' to ' + Math.min(a, b) + ' cancel. ' + (a === b ? 'Nothing is left, so the sum is 0.' : a > b ? 'What is left is ' + (a === b + 1 ? m(-a) : m(-a) + ' to ' + m(-(b + 1))) + ', which adds to ' + m(sum(terms)) + '.' : 'What is left is ' + (b === a + 1 ? b : (a + 1) + ' to ' + b) + ', which adds to ' + m(sum(terms)) + '.') });
    }),
    tpl('box', (r) => {
      const a = r.nz(-30, 30), b = r.nz(-30, 30), c = r.nz(-30, 30), tgt = r.int(-10, 10);
      const box = tgt - a - b - c;
      return N(signed([a, b]) + ' + □' + (c < 0 ? ' − ' + Math.abs(c) : ' + ' + c) + ' = ' + m(tgt) + '. What number goes in the box?', box, { s: 'Without the box, ' + signed([a, b, c]) + ' = ' + m(a + b + c) + '. The box must make ' + m(tgt) + ': ' + m(box) + '.', w: keep([[-box, 'Check by putting your answer in the box.']], box) });
    }),
    tpl('same', (r) => {
      const a = r.int(10, 40), b = r.int(2, 9), c = r.int(10, 14);
      const v = a - b + c;
      const right = c + a - b;
      return choice(r, 'Which expression has the same value as ' + a + ' − ' + b + ' + ' + c + '?', c + ' + ' + a + ' − ' + b, [a + ' − ' + c + ' + ' + b, a + ' + ' + b + ' − ' + c, b + ' − ' + a + ' + ' + c].filter((x, i) => [a - c + b, a + b - c, b - a + c][i] !== v), { s: 'Keep the signs with their numbers: ' + a + ', −' + b + ', +' + c + '. ' + c + ' + ' + a + ' − ' + b + ' = ' + right + '.' });
    }),
  ],
});
