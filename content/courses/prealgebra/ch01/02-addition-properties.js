import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
// keep only wrong answers that really differ from the right one (and from each other)
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };

export default lesson({
  id: 'pre-1-2-addition-properties',
  title: 'Addition properties',
  blurb: 'Order and grouping do not matter in a sum. That freedom is how you add long lists in your head.',
  concepts: ['commutative', 'associative', 'identity', 'additive-inverse'],

  tryFirst: [
    num('t1', 'Find 47 + 38 + 53 + 62 without writing anything down in columns. Can you do it in under ten seconds?', 200, {
      h: ['Look for two numbers that fit together nicely.', '47 + 53 is a friendly pair. What about the other two?'],
      s: '47 + 53 = 100 and 38 + 62 = 100. Together: 200.',
      w: [['190', 'Close, but one of the pairs is off. Check 38 + 62 again.']],
    }),
    num('t2', 'Find the sum 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10. Look for a trick instead of adding one at a time.', 55, {
      h: ['Pair the first number with the last one.', '1 + 10, 2 + 9, 3 + 8 ... How many pairs are there, and what does each pair add to?'],
      s: 'Pairs 1+10, 2+9, 3+8, 4+7, 5+6 each make 11. There are 5 pairs, so 5 × 11 = 55.',
      w: [['110', 'You counted the pairs as 10, but each pair uses two numbers. There are only 5 pairs.']],
    }),
  ],

  learn: [
    p('Adding is the most basic thing you do with numbers, and it has a few rules that feel too obvious to mention. They are worth naming because they let you <i>rearrange</i> a sum however you like, and a good rearrangement can turn a nasty calculation into an easy one. A <b>sum</b> is the result of adding. The numbers being added are called <b>addends</b> or <b>terms</b>.'),
    def('commutative property', 'Order does not matter when you add: a + b = b + a. The word comes from "commute", which means to swap places. Walking 3 steps right and then 5 steps left ends at the same spot as walking 5 steps left and then 3 steps right.'),
    widget('numberLineWalk', { a: 3, b: -5 }),
    p('Use the controls above. Try start = 3 and add = −5, then swap them: start = −5 and add = 3. The arrows are different, but the endpoint is the same.'),
    def('associative property', 'Grouping does not matter when you add three or more numbers: (a + b) + c = a + (b + c). Brackets mean "do this first", and for a sum it never matters which pair you add first. That is why we can write 4 + 9 + 6 with no brackets at all.'),
    ex('Making tens', ['Find 18 + 47 + 2 + 3.', 'Do not go left to right. Hunt for pairs that make a round number.', '18 + 2 = 20 and 47 + 3 = 50.', 'Regroup: (18 + 2) + (47 + 3) = 20 + 50 = 70.']),
    def('additive identity', 'The number 0. Adding it changes nothing: a + 0 = a. An identity is a number that leaves every other number exactly as it was.'),
    def('additive inverse', 'The number you add to a to get back to the identity 0. For a it is −a, the opposite of a. So a + (−a) = 0. The additive inverse of 15 is −15, and the additive inverse of −7 is 7.'),
    rule('<b>Identity and inverse.</b> Adding 0 changes nothing: a + 0 = a. Every number has an opposite that cancels it: a + (−a) = 0.'),
    key('Commutative and associative together mean that a sum can be <b>reordered and regrouped freely</b>. The skill is to look before you add: find opposites that cancel, and pairs that make 10, 100 or 1000.'),
    ex('Cancelling with negatives', ['Find −58 + 27 + 58.', 'Swap the order so the opposites sit together: −58 + 58 + 27.', 'Those two cancel to 0, leaving 0 + 27 = 27.', 'No arithmetic on 58 was needed at all.']),
    ex('Pairing from both ends', ['Find 1 + 2 + 3 + … + 20.', 'Pair the first number with the last, the second with the second to last, and so on: 1 + 20, 2 + 19, 3 + 18, …, 10 + 11.', 'Every pair makes 21, and twenty numbers make 10 pairs.', 'The sum is 10 × 21 = 210.']),
    formula('Sum of 1 to n', 'n × (n + 1) ÷ 2', 'n is the last number in the list. There are n numbers, and each pair of ends adds to n + 1. For n = 100 this gives 100 × 101 ÷ 2 = 5050. It also works when n is odd.'),
    ex('Alternating signs', ['Find −1 + 2 + (−3) + 4 + … + (−59) + 60.', 'Group neighbours: (−1 + 2) = 1, (−3 + 4) = 1, and so on up to (−59 + 60) = 1.', 'There are 60 numbers, so 30 groups, and every group equals 1.', 'The total is 30.']),
    tbl(['Property', 'In symbols', 'Example'], [['Commutative', 'a + b = b + a', '9 + 4 = 4 + 9'], ['Associative', '(a + b) + c = a + (b + c)', '(7 + 5) + 5 = 7 + (5 + 5)'], ['Identity', 'a + 0 = a', '−12 + 0 = −12'], ['Inverse', 'a + (−a) = 0', '15 + (−15) = 0']], 'The four addition properties'),
    tip('Before adding a long list, scan it for three things: <b>opposites</b> (like −46 and 46), <b>pairs that make a round number</b> (like 38 and 62), and <b>runs that repeat a pattern</b> (like +1, −1, +1, −1). Mark them, combine them first, and add what is left.'),
    tip('To check a rearranged sum, add the numbers in a different order. If the two totals match, you probably did not drop a number. If they differ, one of the regroupings lost or changed a term.'),
    warn('<b>Watch out.</b> These freedoms belong to <i>addition</i>. Subtraction does not get them: 10 − 3 is not 3 − 10, and (10 − 4) − 3 is not 10 − (4 − 3). The next lessons show how to turn subtraction into addition so the freedom comes back. Also remember that an additive inverse is not always negative: the inverse of −7 is +7.'),
    mcq('Priya says: "Addition is commutative, so 12 − 5 = 5 − 12." What went wrong?', ['Nothing, the rule works for any operation.', 'The commutative property is about addition only. 12 − 5 is 7 but 5 − 12 is −7.', 'She should have used the associative property instead.'], 1, 'Swapping the order is allowed in a sum, not in a difference. 12 − 5 = 7 while 5 − 12 = −7, which are opposites, not equal.', 'Spot the mistake'),
    recap([['commutative', 'swapping the order of a sum changes nothing'], ['associative', 'regrouping a sum changes nothing'], ['additive identity', '0, since a + 0 = a'], ['additive inverse', '−a, since a + (−a) = 0']], [['Commutative', 'a + b = b + a'], ['Associative', '(a + b) + c = a + (b + c)'], ['Inverse', 'a + (−a) = 0'], ['Sum of 1 to n', 'n × (n + 1) ÷ 2']]),
  ],

  practice: [
    num('p1', 'Find 68 + 29 + 32 + 71.', 200, {
      h: ['Which two numbers make a multiple of 10 together?', '68 + 32 and 29 + 71.'],
      s: '68 + 32 = 100 and 29 + 71 = 100. The total is 200.',
      w: [['190', 'Check your pairs. 68 + 32 is exactly 100 and 29 + 71 is exactly 100.']],
    }),
    mc('p2', 'Which equation is an example of the <i>associative</i> property?', ['6 + 9 = 9 + 6', '(6 + 9) + 4 = 6 + (9 + 4)', '6 + 0 = 6', '6 + (−6) = 0'], 1, {
      h: ['Associative is about regrouping: the numbers stay in the same order but the brackets move.'],
      s: 'Only the second one keeps 6, 9, 4 in order and moves the brackets.',
      w: [[0, 'That swaps the order of two numbers. That is the commutative property.'], [2, 'Adding 0 is the identity property.'], [3, 'Cancelling with an opposite is the inverse property.']],
    }),
    num('p3', 'Find −46 + 18 + 46.', 18, {
      h: ['Swap things around so that −46 and 46 are next to each other.'],
      s: '−46 + 46 = 0, so what is left is 18.',
      w: [['-18', 'The −46 and 46 cancel each other. The 18 is untouched and stays positive.'], ['-10', 'Do not combine −46 with 18 first. Look for the cancelling pair.']],
    }),
    num('p4', 'Find 99 + 98 + 97 + 3 + 2 + 1.', 300, {
      h: ['Pair 99 with 1.', 'Each pair makes 100. How many pairs?'],
      s: '99 + 1, 98 + 2, 97 + 3 are three pairs of 100. Total 300.',
      w: [['297', 'You may have added only 99 + 98 + 97. Pair each big number with a small one.']],
    }),
    num('p5', 'What number should replace the ? to make this true: 37 + ? = 8 + 37 + 15', 23, {
      h: ['The 37 appears on both sides. What does that tell you about ? ?', 'Rearrange the right side to 37 + 8 + 15.'],
      s: 'The right side equals 37 + (8 + 15) = 37 + 23, so ? = 23.',
      w: [['8', 'The right side has both 8 and 15 besides the 37, so ? must stand for both of them together.'], ['15', 'The right side has both 8 and 15 besides the 37, so ? must stand for both of them together.']],
    }),
    num('p6', 'A frog starts at 0 on a number line and hops these amounts in order: +6, −9, +4, −6, +9, −4. Where does it end up?', 0, {
      h: ['Find the hops that are opposites of each other.', 'Regroup: (+6 − 6) + (−9 + 9) + (+4 − 4).'],
      s: 'The hops cancel in three pairs: +6 and −6, −9 and +9, +4 and −4. The frog ends at 0.',
      w: [['6', 'Adding left to right gives 6, −3, 1, −5, 4, 0. Watch the signs; the six hops cancel in pairs.']],
    }),
    num('p7', 'Find −1 + 2 + −3 + 4 + −5 + 6 + ... + −99 + 100. (The pattern continues; the signs alternate and the last number is 100.)', 50, {
      h: ['Group the terms in pairs: (−1 + 2), (−3 + 4), ...', 'What does each pair equal? How many pairs are there?'],
      s: 'Each pair like −1 + 2 or −99 + 100 equals 1. The numbers 1 to 100 make 50 pairs, so the total is 50.',
      w: [['100', 'Each pair makes 1, but two numbers share a pair. There are 50 pairs, not 100.'], ['-50', 'Each pair has the larger number positive, so each pair is +1.']],
    }),
  ],

  challenge: [
    chain('Pairing power', 'The trick from the very first problem, pushed further.', [
      num('c1a', 'In the list 1, 2, 3, ..., 20, pair the first with the last, the second with the second-to-last, and so on. How many pairs are there?', 10, { h: ['Twenty numbers, two per pair.'], s: '20 ÷ 2 = 10 pairs.' }),
      num('c1b', 'What does each pair add to?', 21, { h: ['1 + 20 is the first pair.'], s: '1 + 20 = 21, 2 + 19 = 21, and so on.' }),
      num('c1c', 'So what is 1 + 2 + 3 + ... + 20?', 210, { h: ['Number of pairs times the sum of a pair.'], s: '10 × 21 = 210.' }),
    ], 'The idea: pair the ends of a list. Every pair has the same sum, and the number of pairs is half the length of the list.'),
    chain('Three secret numbers', 'Three numbers A, B and C satisfy A + B = 30, B + C = 45 and A + C = 39.', [
      num('c2a', 'Add the three equations together. What is the total of the three left sides, written as 2 × (A + B + C)?', 114, { h: ['30 + 45 + 39. Each letter appears twice.'], s: '30 + 45 + 39 = 114, and the left sides use each of A, B, C twice, so 2 × (A + B + C) = 114.' }),
      num('c2b', 'What is A + B + C?', 57, { h: ['Half of 114.'], s: '114 ÷ 2 = 57.' }),
      num('c2c', 'Use A + B = 30 to find C.', 27, { h: ['A + B + C is 57 and A + B is 30.'], s: 'C = 57 − 30 = 27.' }),
    ], 'The idea: rearranging a sum lets you add equations so every letter appears the same number of times. Then one number answers a whole puzzle.'),
    mc('c3', 'Find the error. Leo computes −8 + 5 + 8 as follows: "Swap to 5 + 8 + −8 = 13 + −8 = 5." His answer is right, but he says "that proves addition is associative". Is his statement good?', ['Yes: any rearrangement is the associative property.', 'No. Swapping order uses the commutative property. Associative is about which numbers you add first, with the order unchanged.', 'No. Rearranging a sum is never allowed.', 'Yes, but only when negatives are involved.'], 1, {
      s: 'Commutative changes the order. Associative changes the grouping. Leo used both: swapping, then adding 5 + 8 first.',
      w: [[0, 'Two different ideas: order (commutative) and grouping (associative).'], [2, 'Rearranging sums is allowed. That is exactly what the properties give you.']],
    }),
  ],

  quiz: [
    tpl('pairs', (r) => {
      const t = 10 * r.int(5, 25), a = r.int(11, t - 11), b = r.int(11, t - 11);
      const parts = r.shuffle([a, t - a, b, t - b]);
      return N('Find ' + parts.join(' + ') + '.', 2 * t, { s: 'Pair up the numbers that make ' + t + ': ' + a + ' + ' + (t - a) + ' and ' + b + ' + ' + (t - b) + '. Two pairs of ' + t + ' make ' + 2 * t + '.' });
    }),
    tpl('cancel', (r) => {
      const n = r.int(12, 99), k = r.nz(-40, 40);
      const arr = r.shuffle([-n, n, k]);
      const s = arr.map((x, i) => (i === 0 ? m(x) : x < 0 ? '+ (' + m(x) + ')' : '+ ' + x)).join(' ');
      return N('Find ' + s + '.', k, { s: m(n) + ' and ' + m(-n) + ' are opposites and cancel to 0. What remains is ' + m(k) + '.', w: wr(k, [[-k, 'The ' + m(k) + ' was never touched. Only the opposite pair cancels.']]) });
    }),
    tpl('missing', (r) => {
      const [a, b, c] = r.distinct(3, 4, 70);
      return N('What number replaces the ? to make this true: ? + ' + a + ' = ' + b + ' + ' + a + ' + ' + c, b + c, { s: 'Rearranging the right side gives ' + a + ' + ' + b + ' + ' + c + ', so ? = ' + b + ' + ' + c + ' = ' + (b + c) + '.', w: wr(b + c, [[b, 'The right side has two extra numbers besides ' + a + ', so ? must account for both.'], [c, 'The right side has two extra numbers besides ' + a + ', so ? must account for both.']]) });
    }),
    tpl('range', (r) => {
      const a = r.int(1, 40), len = 2 * r.int(3, 20), b = a + len - 1;
      return N('Find the sum of every whole number from ' + a + ' to ' + b + ' (' + a + ' + ' + (a + 1) + ' + ... + ' + b + ').', ((a + b) * len) / 2, { s: 'There are ' + len + ' numbers, so ' + len / 2 + ' pairs. Each pair adds to ' + (a + b) + '. Total ' + len / 2 + ' × ' + (a + b) + ' = ' + ((a + b) * len) / 2 + '.', w: wr(((a + b) * len) / 2, [[(a + b) * len, 'Each pair uses two numbers, so the number of pairs is half the length of the list.']]) });
    }),
    tpl('name', (r) => {
      const a = r.int(2, 60), b = r.int(2, 60), c = r.int(2, 60);
      const items = [
        ['commutative', a + ' + ' + b + ' = ' + b + ' + ' + a],
        ['associative', '(' + a + ' + ' + b + ') + ' + c + ' = ' + a + ' + (' + b + ' + ' + c + ')'],
        ['identity', m(-a) + ' + 0 = ' + m(-a)],
        ['inverse', a + ' + (' + m(-a) + ') = 0'],
      ];
      const [key, st] = r.pick(items);
      const names = { commutative: 'Commutative property', associative: 'Associative property', identity: 'Identity property of 0', inverse: 'Inverse property' };
      return choice(r, 'Which property of addition does this show? ' + st, names[key], Object.keys(names).filter((k) => k !== key).map((k) => names[k]), { s: 'Order swapped: commutative. Brackets moved: associative. Adding 0: identity. Adding the opposite to get 0: inverse.' });
    }),
    tpl('hops', (r) => {
      const s = r.int(-20, 20), [a, b] = r.distinct(2, 2, 15), c = r.nz(-12, 12);
      const moves = r.shuffle([a, b, c, -a, -b]);
      const nm = name(r);
      const txt = moves.map((x) => (x < 0 ? 'down ' + -x : 'up ' + x)).join(', ');
      return N(nm + ' starts at ' + m(s) + ' on a number line and moves in this order: ' + txt + '. Where does ' + nm + ' end up?', s + c, { s: 'Moves of ' + a + ' and ' + b + ' are each cancelled by their opposite. Only ' + (c < 0 ? 'down ' + -c : 'up ' + c) + ' is left: ' + m(s) + (c < 0 ? ' − ' + -c : ' + ' + c) + ' = ' + m(s + c) + '.' });
    }),
    tpl('alt', (r) => {
      const n = r.int(6, 60);
      return N('Find −1 + 2 + −3 + 4 + ... + −' + (2 * n - 1) + ' + ' + 2 * n + ', where the signs keep alternating.', n, { s: 'Each pair (−1 + 2), (−3 + 4), ... equals 1, and there are ' + n + ' pairs. The total is ' + n + '.', w: wr(n, [[2 * n, 'There are ' + n + ' pairs, each worth 1. Not ' + 2 * n + '.']]) });
    }),
    tpl('threesum', (r) => {
      const [A, B, C] = r.distinct(3, 3, 60);
      return N('Three numbers satisfy A + B = ' + (A + B) + ', B + C = ' + (B + C) + ' and A + C = ' + (A + C) + '. What is A + B + C?', A + B + C, { s: 'Add the three equations: each letter appears twice, so 2 × (A + B + C) = ' + 2 * (A + B + C) + '. Half of that is ' + (A + B + C) + '.', w: wr(A + B + C, [[2 * (A + B + C), 'That is the total of the three given sums. Each letter was counted twice, so halve it.']]) });
    }),
  ],
});
