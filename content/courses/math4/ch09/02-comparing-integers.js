import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));

export default lesson({
  id: 'm4-9-2-comparing-integers',
  title: 'Comparing integers',
  blurb: 'Which integer is greater, how to order them, and what distance from zero (absolute value) tells you.',
  concepts: ['integers', 'ordering', 'absolute-value'],

  tryFirst: [
    num('t1', 'Which is greater, −3 or −8? Give that number.', -3, {
      h: ['Picture the number line. Which one is farther to the right?', 'Think of temperatures: which is warmer, 3 below or 8 below?'],
      s: '−3 is only 3 below zero. −8 is 8 below. −3 is warmer, farther right, and greater.',
      w: [['-8', '−8 is farther left on the number line, so it is smaller.']],
    }),
    num('t2', 'How many integers x make −4 < x < 3 true? (The sign < means "is less than".)', 6, {
      h: ['x is bigger than −4 and smaller than 3. List the integers.'],
      s: 'The integers are −3, −2, −1, 0, 1, 2. That is 6.',
      w: [['8', 'The end numbers −4 and 3 do not count. Also check your count.'], ['7', 'Do not include −4 or 3.'], ['5', 'Zero counts. List them: −3, −2, −1, 0, 1, 2.']],
    }),
  ],

  learn: [
    p('On a number line, numbers get bigger as you go right. Numbers get smaller as you go left. This holds for negatives too. To compare two integers, always ask which one is farther to the right.'),
    def('greater than', 'A number is greater than another if it is farther to the right on the number line. We write 5 > 2. The other way round is less than, written 2 &lt; 5.'),
    rule('<b>Bigger means farther right.</b> −2 is greater than −9, because −2 is to the right of −9. We write −2 > −9, or −9 &lt; −2.'),
    p('The sign > points to the smaller number. It opens toward the larger one. 5 > 2 and −1 > −6.'),
    ex('Order from least to greatest: 3, −7, 0, −2, 5', ['Negatives are less than zero. Find the negatives: −7 and −2.', 'Which is smaller, −7 or −2? −7 is farther left. So −7 comes first.', 'Then −2, then 0, then the positives 3 and 5.', 'Answer: −7, −2, 0, 3, 5.']),
    def('absolute value', 'How far a number is from zero. We write |−7| = 7. It is a distance, so it is never negative.'),
    tbl(['Number', 'Distance from 0', 'Absolute value'], [['5', '5 steps', '|5| = 5'], ['−5', '5 steps', '|−5| = 5'], ['0', '0 steps', '|0| = 0']], 'Opposites have the same absolute value'),
    key('Every negative number is <b>less than</b> every positive number and less than 0. Among negatives, the one <b>closer to zero</b> is greater.'),
    rule('<b>Comparing two negatives.</b> The one closer to zero is greater. The one with the larger absolute value is smaller. −4 > −9 because |−4| = 4 is less than |−9| = 9.'),
    ex('Order from least to greatest: −12, −3, −8, −1', ['All four are negative. The one farthest from zero is the least.', 'Absolute values: 12, 3, 8, 1. The largest is 12, so −12 is least.', 'Then −8, then −3, then −1.', 'Answer: −12, −8, −3, −1.']),
    widget('numberLineWalk', { a: -6, b: 4 }),
    warn('<b>Watch out.</b> Absolute value and size are different things. |−9| is bigger than |−2|, but −9 is smaller than −2.'),
    tip('Think of temperatures. −15 degrees is colder than −4 degrees, so −15 &lt; −4. Colder means smaller. You can also picture owing money: owing $9 is worse than owing $2.'),
    mcq('Ivy says: "−9 > −2, because 9 is bigger than 2." What is wrong?', ['Nothing. She is right.', '−9 is 9 steps left of 0 and −2 is only 2 steps left. −9 is farther left, so −9 &lt; −2.', 'Negative numbers cannot be compared.'], 1, 'She compared the distances from 0. For negative numbers, a larger distance means a smaller number.', 'Spot the mistake'),
    recap([['greater than', 'farther right on the number line'], ['less than', 'farther left on the number line'], ['absolute value', 'distance from 0; never negative']], [['Two negatives', 'the one closer to 0 is greater'], ['Absolute value', '|−a| = |a|']]),
  ],

  practice: [
    mc('p1', 'Which of these numbers is the smallest?', ['−2', '−11', '4', '−7'], 1, {
      h: ['The smallest is farthest left.'],
      s: 'The negatives are −2, −11, −7. The farthest left is −11.',
      w: [[2, '4 is positive. It is the largest.'], [0, '−2 is the closest to 0 among the negatives, so it is the largest of them.']],
    }),
    num('p2', 'Write −5, 3, −9, 0, −1 from least to greatest. Which number is in the middle (third place)?', -1, {
      h: ['The order starts with −9.'],
      s: 'Order: −9, −5, −1, 0, 3. The middle one is −1.',
      w: [['0', 'Check the order. −1 comes before 0.'], ['-5', 'That is second. Count again.']],
    }),
    num('p3', 'Find |−12| − |5|.', 7, {
      h: ['Find each distance from 0, then subtract.'],
      s: '|−12| = 12 and |5| = 5. 12 − 5 = 7.',
      w: [['-17', 'Absolute values are not negative. |−12| is 12.']],
    }),
    num('p4', 'How many integers have an absolute value less than 6?', 11, {
      h: ['They are within 5 steps of 0. Count both sides.'],
      s: '−5, −4, −3, −2, −1, 0, 1, 2, 3, 4, 5. That is 11.',
      w: [['5', 'That counts one side only. Include the negatives and zero.'], ['10', 'Do not forget 0.'], ['13', '6 and −6 have absolute value 6, which is not less than 6.']],
    }),
    num('p5', 'How many integers x make −7 < x < −1 true?', 5, {
      h: ['List them: x is bigger than −7 and smaller than −1.'],
      s: '−6, −5, −4, −3, −2. That is 5.',
      w: [['7', 'The ends −7 and −1 are not allowed.'], ['6', 'The end numbers do not count.']],
    }),
    num('p6', 'x is an integer. x is greater than −6, and |x| = 6. What is x?', 6, {
      h: ['|x| = 6 gives two possibilities. Which is greater than −6?'],
      s: 'x could be 6 or −6. Only 6 is greater than −6.',
      w: [['-6', '−6 is not greater than itself.']],
    }),
    num('p7', 'What is the largest integer that is less than −4.5?', -5, {
      h: ['−4.5 sits halfway between −5 and −4. Which side is "less"?'],
      s: 'Less than means to the left. The first integer to the left of −4.5 is −5.',
      w: [['-4', '−4 is to the right of −4.5, so it is greater.']],
    }),
    mc('p8', 'Only one of these four statements about integers is true. Which one?', ['−9 > −2', '−3 < −8', '|−4| = −4', '−1 > −10'], 3, {
      h: ['Check each one on the number line.'],
      s: '−1 is to the right of −10, so −1 > −10. In the others, −9 < −2, −3 > −8, and |−4| = 4.',
      w: [[0, '−9 is left of −2.'], [1, '−3 is right of −8.'], [2, 'Absolute value is a distance. |−4| = 4.']],
    }),
  ],

  challenge: [
    chain('Within reach', 'A frog sits at −1 on the number line. It can jump to any integer that is at most 4 steps away from where it sits.', [
      num('c1a', 'How many integers can it reach (not counting the spot where it sits)?', 8, { h: ['It can go 4 steps left and 4 steps right.'], s: 'Left: −5 to −2 is 4 numbers. Right: 0 to 3 is 4 numbers. Total 8.' }),
      num('c1b', 'Of those 8 spots, how many are negative numbers?', 4, { h: ['The spots are −5, −4, −3, −2, 0, 1, 2, 3.'], s: '−5, −4, −3, −2. That is 4.' }),
      num('c1c', 'Of the 8 spots, how many have an absolute value less than 3?', 4, { h: ['Which spots are within 2 steps of 0?'], s: '−2, 0, 1, 2. That is 4.' }),
    ], 'The idea: write the reachable numbers in a row first. Then each question is just counting from the row.'),
    chain('Narrowing down', 'Integer n satisfies: |n| < 8, n > −5, and n is even.', [
      num('c2a', 'How many integers have |n| < 8?', 15, { h: ['They run from −7 to 7.'], s: '7 negatives, zero, 7 positives. 15.' }),
      num('c2b', 'How many of those are also greater than −5?', 12, { h: ['Drop −7, −6, −5.'], s: '15 − 3 = 12: they run from −4 to 7.' }),
      num('c2c', 'How many of those 12 are even?', 6, { h: ['List −4 to 7 and mark the even ones.'], s: '−4, −2, 0, 2, 4, 6. That is 6.' }),
    ], 'The idea: each clue removes numbers. Apply the clues one at a time.'),
    mc('c3', 'Find the error. Ben says: "−20 is greater than −3, because 20 is a bigger number than 3 and so −20 is a bigger debt." What is the best reply?', ['He is right.', 'A bigger debt means less money. −20 is smaller than −3.', '−3 and −20 are equal.', 'You cannot compare debts.'], 1, {
      s: 'Owing $20 is worse than owing $3. So −20 < −3.',
      w: [[0, 'A larger debt means a smaller number.']],
    }),
  ],

  quiz: [
    tpl('greater', (r) => {
      const [a, b] = r.distinct(2, -40, 40);
      const hi = Math.max(a, b);
      return choice(r, 'Which is greater, ' + m(a) + ' or ' + m(b) + '?', m(hi), [m(Math.min(a, b)), 'They are equal'], { s: 'The number farther right is greater: ' + m(hi) + '.' });
    }),
    tpl('between', (r) => {
      const a = r.int(-20, 5), len = r.int(3, 20);
      const b = a + len;
      return N('How many integers x make ' + m(a) + ' < x < ' + m(b) + ' true?', len - 1, { s: 'The end numbers do not count. From ' + m(a + 1) + ' to ' + m(b - 1) + ' is ' + (len - 1) + ' numbers.', w: keep([[len + 1, 'The end numbers are not allowed.']], len - 1) });
    }),
    tpl('absdiff', (r) => {
      const a = r.int(3, 60), b = r.int(3, 60);
      return N('Find |' + m(-a) + '| − |' + m(-b) + '|. If the answer is below zero, use a negative number.', a - b, { s: '|' + m(-a) + '| = ' + a + ' and |' + m(-b) + '| = ' + b + '. ' + a + ' − ' + b + ' = ' + m(a - b) + '.' });
    }),
    tpl('absless', (r) => {
      const k = r.int(2, 40);
      return N('How many integers have an absolute value less than ' + k + '?', 2 * k - 1, { s: 'They run from ' + m(-(k - 1)) + ' to ' + (k - 1) + ', which is ' + (2 * k - 1) + ' numbers.', w: keep([[k - 1, 'That counts only the positives. Include 0 and the negatives.'], [2 * k + 1, k + ' and ' + m(-k) + ' have absolute value ' + k + ', not less than ' + k + '.']], 2 * k - 1) });
    }),
    tpl('half', (r) => {
      const k = r.int(1, 30), a = r.int(1, 30);
      return N('What is the largest integer that is less than ' + m(-a) + '.' + 5 + '?', -(a + 1), { s: m(-a) + '.5 is between ' + m(-(a + 1)) + ' and ' + m(-a) + '. The integer to its left is ' + m(-(a + 1)) + '.', w: keep([[-a, m(-a) + ' is to the right of ' + m(-a) + '.5, so it is greater.']], -(a + 1)) });
    }),
    tpl('closest', (r) => {
      const vs = r.distinct(4, -30, 30).filter((x) => x !== 0);
      const best = vs.slice().sort((x, y) => Math.abs(x) - Math.abs(y) || x - y)[0];
      const tie = vs.filter((x) => Math.abs(x) === Math.abs(best)).length > 1;
      if (tie) return N('Which integer is the greater of ' + m(5) + ' and ' + m(-5) + '?', 5, { s: '5 is to the right.' });
      return choice(r, 'Which of these numbers is closest to zero?', m(best), vs.filter((x) => x !== best).map(m), { s: 'The smallest absolute value is |' + m(best) + '| = ' + Math.abs(best) + '.' });
    }),
    tpl('mid', (r) => {
      const vs = r.distinct(5, -30, 30);
      const sorted = vs.slice().sort((a, b) => a - b);
      return N('Put ' + vs.map(m).join(', ') + ' in order from least to greatest. Which number is in the middle?', sorted[2], { s: 'In order: ' + sorted.map(m).join(', ') + '. The middle is ' + m(sorted[2]) + '.' });
    }),
  ],
});
