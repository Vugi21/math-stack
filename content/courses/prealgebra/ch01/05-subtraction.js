import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(−' + Math.abs(n) + ')' : String(n));
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };

export default lesson({
  id: 'pre-1-5-subtraction',
  title: 'Subtraction',
  blurb: 'Subtracting is adding the opposite. That one idea gives subtraction back all the freedoms of addition.',
  concepts: ['subtraction', 'adding-the-opposite', 'signed-difference'],

  tryFirst: [
    num('t1', 'Use a number line to find 5 − (−3). Think about what "take away a negative" should do.', 8, {
      h: ['Compare 5 − 3 and 5 − (−3). Should they land on the same side of 5?', 'Subtracting 3 moves left. Subtracting −3 does the opposite.'],
      s: 'Subtracting 3 moves 3 steps left, so subtracting −3 moves 3 steps right: 5 + 3 = 8.',
      w: [['2', 'That is 5 − 3. Subtracting a negative does the opposite of subtracting a positive.'], ['-8', 'Starting at 5 and moving 3 steps can never reach −8.']],
    }),
    num('t2', 'Fill in the blank so the statement is true: 10 − 7 = 10 + ?', -7, {
      h: ['10 − 7 and 10 + something should give the same answer, 3.'],
      s: '10 + (−7) = 3 and 10 − 7 = 3. Subtracting 7 does the same as adding −7.',
      w: [['7', '10 + 7 = 17, which is not 3.']],
    }),
  ],

  learn: [
    p('Subtraction looks like a brand new operation, but it is secretly addition in disguise. Taking 7 away from 10 moves you 7 steps left. Adding −7 also moves you 7 steps left.'),
    rule('<b>Subtracting is adding the opposite.</b> a − b = a + (−b). To subtract a number, add its opposite.'),
    widget('numberLineWalk', { a: 5, b: -3, mode: 'sub' }),
    p('Slide the subtract control to a negative value above. Subtracting a negative moves you to the <i>right</i>, the opposite of what subtracting normally does.'),
    ex('Subtracting a negative', ['Find 5 − (−3).', 'Rewrite as adding the opposite: 5 + 3.', 'The opposite of −3 is 3.', 'Answer: 8.']),
    ex('Subtracting from a negative', ['Find −6 − 9.', 'Rewrite: −6 + (−9).', 'Both are on the left of 0, so they pile up: −15.']),
    rule('<b>A difference is a signed gap.</b> a − b tells you how far to move, and in which direction, to get from b to a. From −4 to 9 you move 9 − (−4) = 13 steps to the right. From 9 to −4 you move (−4) − 9 = −13.'),
    rule('<b>Opposite differences.</b> b − a is the opposite of a − b: −(a − b) = b − a. Subtraction is NOT commutative, but swapping just flips the sign.'),
    rule('<b>Minus in front of brackets.</b> a − (b + c) = a − b − c and a − (b − c) = a − b + c. The minus flips every term inside.'),
    ex('Brackets after a minus', ['Find 20 − (8 − 3).', 'The minus flips each term: 20 − 8 + 3.', '12 + 3 = 15.', 'Check by working inside first: 8 − 3 = 5 and 20 − 5 = 15.']),
    tbl(['Subtraction', 'Same as adding', 'Value'], [['9 − 4', '9 + (−4)', '5'], ['9 − (−4)', '9 + 4', '13'], ['−9 − 4', '−9 + (−4)', '−13'], ['−9 − (−4)', '−9 + 4', '−5']], 'Four sign cases'),
    warn('<b>Watch out.</b> 20 − (8 − 3) is not 20 − 8 − 3. The minus outside the bracket flips the 3 too. Also (10 − 4) − 3 and 10 − (4 − 3) differ: 3 and 9.'),
    mcq('Sam says: "5 − (−3) = 5 − 3 = 2." What did Sam do wrong?', ['Nothing, the double signs just disappear.', 'He ignored that the 3 is negative. Subtracting −3 is adding 3, so the answer is 8.', 'He should have got −8.'], 1, 'Subtracting a negative is adding its opposite: 5 − (−3) = 5 + 3 = 8.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 7 − (−5).', 12, {
      h: ['Subtracting a negative is adding the opposite.'],
      s: '7 − (−5) = 7 + 5 = 12.',
      w: [['2', 'That is 7 − 5. The 5 is negative here, so the minus and the minus combine.'], ['-12', 'Adding the opposite of −5 means adding 5, which makes 7 bigger.']],
    }),
    num('p2', 'Find −6 − 9.', -15, {
      h: ['Rewrite it as an addition.'],
      s: '−6 − 9 = −6 + (−9) = −15.',
      w: [['3', 'Both numbers push you left. Do not subtract their sizes.'], ['15', 'Starting at −6 and moving left cannot reach a positive number.']],
    }),
    num('p3', 'Find −3 − (−10).', 7, {
      h: ['Add the opposite of −10.'],
      s: '−3 + 10 = 7.',
      w: [['-13', 'You added −10 instead of subtracting it. Subtracting −10 is adding 10.'], ['-7', 'Start at −3 and move 10 to the right.']],
    }),
    mc('p4', 'Which expression is equal to 12 − (5 − 2)?', ['12 − 5 − 2', '12 − 5 + 2', '12 + 5 − 2', '12 + 5 + 2'], 1, {
      h: ['The minus outside flips each term in the bracket.', 'What does it do to 5? What does it do to −2?'],
      s: '12 − (5 − 2) = 12 − 5 + 2 = 9. Checking: 5 − 2 = 3 and 12 − 3 = 9.',
      w: [[0, 'That gives 5, but the true value is 9. The minus has to flip the −2 into +2.']],
    }),
    num('p5', 'Find 20 − (7 − (−4)).', 9, {
      h: ['Work on the inside bracket first.'],
      s: '7 − (−4) = 11, then 20 − 11 = 9.',
      w: [['17', 'You used 7 − 4 = 3 inside the bracket. The inside is 7 − (−4) = 11.'], ['31', 'The minus outside the bracket applies to the whole 11.']],
    }),
    num('p6', 'The temperature changes from 3 degrees to −8 degrees. Find "new minus old" to get the signed change.', -11, {
      h: ['New is −8 and old is 3.'],
      s: '−8 − 3 = −11. It dropped 11 degrees.',
      w: [['11', 'The temperature went down, so the signed change is negative.'], ['-5', 'Subtracting 3 from −8 moves you farther left, to −11.']],
    }),
    num('p7', 'If x − 7 = −3, what is 7 − x?', 3, {
      h: ['7 − x and x − 7 are opposites of each other.', 'You do not even need to find x.'],
      s: 'Swapping the order of a subtraction flips the sign. x − 7 = −3 means 7 − x = 3. (Also x = 4 and 7 − 4 = 3.)',
      w: [['-3', 'The two differences are opposites, not equal.'], ['4', 'That is x. The question asks about 7 − x.']],
    }),
    num('p8', 'Find 100 − 99 + 98 − 97 + 96 − 95 + ... + 2 − 1.', 50, {
      h: ['Group them in pairs: (100 − 99), (98 − 97), ...', 'What does each pair equal?'],
      s: 'Each pair equals 1. The numbers 1 to 100 form 50 pairs, so the total is 50.',
      w: [['100', 'Each pair of numbers contributes 1. There are 50 pairs, not 100.'], ['5050', 'That would be adding 1 through 100. Here every second number is subtracted.']],
    }),
  ],

  challenge: [
    chain('Direction matters', 'Points on a number line: P is at −7 and Q is at 5.', [
      num('c1a', 'How far, and which way, do you move to go from P to Q? Compute Q − P.', 12, { h: ['5 − (−7).'], s: '5 − (−7) = 5 + 7 = 12 steps to the right.', w: [['-2', 'Subtracting a negative means adding. 5 + 7.']] }),
      num('c1b', 'Now compute P − Q. What do you get?', -12, { h: ['Same two numbers, other order.'], s: '−7 − 5 = −12, the opposite of 12.', w: [['12', 'This is the move from Q back to P, a move to the left, so it is negative.']] }),
      num('c1c', 'Another point R is also 12 units from Q (but not the same as P). Where is R?', 17, { h: ['Two points are 12 away from Q: one on each side.'], s: 'One is Q − 12 = −7 (that is P). The other is Q + 12 = 17.', w: [['-7', 'That is P itself. Look on the other side of Q.']] }),
    ], 'The idea: the signed difference carries a direction. The distance between two points is the size of the difference, and it is the same whichever way you subtract.'),
    chain('Brackets after a minus', 'Compare these two ways of dealing with a minus sign.', [
      num('c2a', 'Compute 20 − (8 − 3) by working inside the bracket first.', 15, { h: ['8 − 3 first.'], s: '8 − 3 = 5, then 20 − 5 = 15.' }),
      num('c2b', 'Compute 20 − 8 − 3.', 9, { h: ['Left to right.'], s: '20 − 8 = 12, then 12 − 3 = 9.' }),
      num('c2c', 'So 20 − (8 − 3) = 20 − 8 + ?. What number goes in the blank?', 3, { h: ['You need to get from 12 to 15.'], s: '20 − 8 = 12 and 12 + 3 = 15. The minus flipped the −3 into +3.', w: [['-3', 'Check: 12 + (−3) = 9, not 15.']] }),
    ], 'The idea: a minus sign in front of a bracket flips every sign inside. That is just negation distributing, from the last lesson.'),
    mc('c3', 'Find the error. Priya writes: "7 − 2 + 3 = 7 − (2 + 3) = 2." Which describes the mistake?', ['She added the brackets for no reason; 7 − 2 + 3 = 8, and the bracket changes the value because the minus flips the 3 as well.', 'She is right.', 'She should have got −2.', 'She should have computed 7 − 2 − 3 = 2 instead, which is right.'], 0, {
      s: '7 − 2 + 3 = 5 + 3 = 8. Putting brackets around 2 + 3 would make the 3 get subtracted.',
      w: [[1, 'Check left to right: 7 − 2 = 5, 5 + 3 = 8.'], [2, 'Work left to right: 7 − 2 = 5 then + 3.']],
    }),
  ],

  quiz: [
    tpl('basic', (r) => {
      const a = r.nz(-30, 30), b = r.nz(-30, 30);
      return N('Find ' + m(a) + ' − ' + par(b) + '.', a - b, { s: 'Add the opposite: ' + m(a) + ' + ' + par(-b) + ' = ' + m(a - b) + '.', w: wr(a - b, [[a + b, 'Subtracting ' + par(b) + ' means adding ' + par(-b) + ', not adding ' + par(b) + '.'], [b - a, 'The order matters: it is first number minus second.']]) });
    }),
    tpl('bracket', (r) => {
      const a = r.nz(-20, 30), b = r.nz(-20, 20), c = r.nz(-20, 20);
      return N('Find ' + m(a) + ' − (' + m(b) + ' − ' + par(c) + ').', a - (b - c), { s: 'Inside: ' + m(b) + ' − ' + par(c) + ' = ' + m(b - c) + '. Then ' + m(a) + ' − ' + par(b - c) + ' = ' + m(a - (b - c)) + '.', w: wr(a - (b - c), [[a - b - c, 'The outside minus flips both terms in the bracket, including the one after the minus.']]) });
    }),
    tpl('change', (r) => {
      const x = r.int(-25, 25), y = r.int(-25, 25);
      if (x === y) return N(name(r) + ' has a score of ' + m(x) + ' in round one and ' + m(x + 7) + ' in round two. What is the change (round two minus round one)?', 7, { s: 'Round two minus round one is ' + m(x + 7) + ' − ' + par(x) + ' = 7.' });
      return N(name(r) + ' has a score of ' + m(x) + ' in round one and ' + m(y) + ' in round two. What is the change (round two minus round one)?', y - x, { s: 'New minus old: ' + m(y) + ' − ' + par(x) + ' = ' + m(y - x) + '.', w: wr(y - x, [[x - y, 'The change is new minus old, not old minus new.']]) });
    }),
    tpl('expandbracket', (r) => {
      const [a, b, c] = [r.int(2, 30), ...r.distinct(2, 2, 30)]; // b ≠ c so the wrong options really differ in value
      return choice(r, 'Which expression is equal to ' + a + ' − (' + b + ' − ' + c + ')?', a + ' − ' + b + ' + ' + c, [[a + ' − ' + b + ' − ' + c, 'The minus must flip the sign of the ' + c + ' too.'], [a + ' + ' + b + ' − ' + c, 'The minus flips the ' + b + ' as well.'], [a + ' + ' + b + ' + ' + c, 'The minus applies to both terms in the bracket.']], { s: 'Flip each term inside: ' + a + ' − ' + b + ' + ' + c + '.' });
    }),
    tpl('flipdiff', (r) => {
      const a = r.int(2, 30), b = r.nz(-40, 40);
      return N('If x − ' + a + ' = ' + m(b) + ', what is ' + a + ' − x? (You do not need x.)', -b, { s: a + ' − x is the opposite of x − ' + a + ', so it is ' + m(-b) + '.', w: wr(-b, [[b, 'Swapping the two numbers in a subtraction flips the sign of the answer.'], [a + b, 'That is x itself. The question asks for ' + a + ' − x.']]) });
    }),
    tpl('gap', (r) => {
      const a = r.nz(-40, 40), b = r.nz(-40, 40);
      if (a === b) return N('How far apart are ' + m(a) + ' and ' + m(a + 5) + ' on the number line?', 5, { s: 'The gap is 5.' });
      return N('How far apart are ' + m(a) + ' and ' + m(b) + ' on the number line? (Distance, so give a positive number.)', Math.abs(a - b), { s: '|' + m(a) + ' − ' + par(b) + '| = ' + Math.abs(a - b) + '.', w: wr(Math.abs(a - b), [[a - b, 'Distance is never negative. Take the size of the difference.'], [Math.abs(a) + Math.abs(b), 'Only add the distances to 0 when the points are on opposite sides of 0.']]) });
    }),
    tpl('altsub', (r) => {
      const n = 2 * r.int(5, 50);
      return N('Find ' + n + ' − ' + (n - 1) + ' + ' + (n - 2) + ' − ' + (n - 3) + ' + ... + 2 − 1.', n / 2, { s: 'Pair them: (' + n + ' − ' + (n - 1) + '), (' + (n - 2) + ' − ' + (n - 3) + '), ... each is 1, and there are ' + n / 2 + ' pairs.', w: wr(n / 2, [[n, 'There are ' + n / 2 + ' pairs, each worth 1.']]) });
    }),
    tpl('fill', (r) => {
      const a = r.nz(-30, 30), b = r.nz(-30, 30);
      return N('Fill in the blank: ' + m(a) + ' − ' + par(b) + ' = ' + m(a) + ' + ?', -b, { s: 'Subtracting ' + par(b) + ' equals adding its opposite, ' + m(-b) + '.', w: wr(-b, [[b, 'Subtracting a number is the same as adding its opposite, not the number itself.']]) });
    }),
  ],
});
