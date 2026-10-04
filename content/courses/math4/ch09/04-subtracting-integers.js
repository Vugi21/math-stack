import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const par = (n) => (n < 0 ? '(' + m(n) + ')' : String(n));
const keep = (list, ans) => list.filter((x, i) => String(x[0]) !== String(ans) && list.findIndex((y) => String(y[0]) === String(x[0])) === i);

export default lesson({
  id: 'm4-9-4-subtracting-integers',
  title: 'Subtracting integers',
  blurb: 'Subtraction as the distance between two numbers, as adding the opposite, and as a change in temperature.',
  concepts: ['integers', 'subtraction', 'opposites'],

  tryFirst: [
    num('t1', 'At 6 a.m. the temperature is −3 degrees. At noon it is 9 degrees. By how many degrees did it rise?', 12, {
      h: ['Draw a thermometer. How far is it from −3 up to 0? And from 0 to 9?'],
      s: '3 degrees to reach 0, then 9 more. The rise is 12 degrees.',
      w: [['6', 'You subtracted 9 − 3. The start is below zero, so the climb crosses zero. Add the two parts.']],
    }),
    num('t2', 'Start at 5 on the number line. Move 8 steps to the left. Where do you land?', -3, {
      h: ['5 steps bring you to 0.'],
      s: '5 steps to reach 0, then 3 more to the left. You land on −3.',
      w: [['3', 'You pass zero, so you end on the left side.']],
    }),
  ],

  learn: [
    p('Subtraction answers the question: how far, and in which direction, from the second number to the first? With integers, the answer can be negative, and we can even subtract a negative number. The key is to turn every subtraction into an addition.'),
    def('difference', 'The answer to a subtraction, found by taking the second number away from the first. It also tells how far apart two numbers are, with a direction.'),
    ex('6 − 9', ['Start at 9. Where do you need to go to reach 6?', 'You go 3 steps to the left.', 'Left means negative, so 6 − 9 = −3.']),
    p('Subtraction can also be thought of as the <b>difference</b> in height between two points. If a hill is 30 m high and a valley is −25 m, the hill is 55 m higher.'),
    def('opposite', 'The number on the other side of zero at the same distance. The opposite of 5 is −5, and the opposite of −3 is 3.'),
    formula('Subtract by adding the opposite', 'a − b = a + (−b)', 'Replace the subtraction by adding the opposite of the second number. 5 − 8 = 5 + (−8) = −3. And 5 − (−8) = 5 + 8 = 13.'),
    rule('<b>Subtracting means adding the opposite.</b> a − b = a + (−b). So 5 − 8 = 5 + (−8) = −3. And 5 − (−8) = 5 + 8 = 13.'),
    widget('numberLineWalk', { a: 4, b: -3, mode: 'sub' }),
    p('The widget shows a start a and a number b to subtract. Subtracting a negative moves you to the right. Try b = −3. The arrow goes right 3.'),
    key('Subtracting a negative number is the same as <b>adding a positive</b>. Taking away a debt makes you richer.'),
    ex('Why is 6 − (−4) = 10?', ['Make 6 positive counters. We want to take away 4 negative counters, but there are none.', 'Add 4 zero pairs: 4 positives and 4 negatives. The total is still 6.', 'Now take away the 4 negatives. 10 positives remain.', 'So 6 − (−4) = 10.']),
    tbl(['Subtract', 'Same as adding', 'Example'], [['a positive', 'a negative', '3 − 5 = 3 + (−5) = −2'], ['a negative', 'a positive', '3 − (−5) = 3 + 5 = 8']], 'Flip the sign of the second number'),
    ex('Two more', ['−2 − 5 = −2 + (−5) = −7. Both are negative, so add the sizes.', '−3 − (−8) = −3 + 8. The sizes are 3 and 8, and 8 is positive, so the answer is 8 − 3 = 5.', 'Check the second one on the line: from −3, go right 8. You land at 5.']),
    rule('<b>Temperature change.</b> change = new − old. From 4 degrees to −5 degrees the change is −5 − 4 = −9: a fall of 9.'),
    tip('Before you calculate, rewrite the problem with only plus signs. Write 3 − (−5) as 3 + 5, and write 3 − 5 as 3 + (−5). Two minus signs side by side become a plus.'),
    warn('<b>Watch out.</b> Order matters. 3 − 8 = −5 but 8 − 3 = 5. They are opposites. Subtraction is not the same both ways.'),
    mcq('Lee says: "4 − (−3) = 1, because 4 − 3 = 1 and the negative sign just stays." What is wrong?', ['Nothing. He is right.', 'Subtracting −3 is the same as adding 3. So 4 − (−3) = 4 + 3 = 7.', '4 − (−3) = −7.'], 1, 'Take away a debt of 3 and you are 3 richer. 4 − (−3) = 7.', 'Spot the mistake'),
    recap([['difference', 'answer to a subtraction'], ['opposite', 'same distance from 0, other side']], [['Subtract', 'a − b = a + (−b)'], ['Subtract a negative', 'a − (−b) = a + b'], ['Change', 'new − old']]),
  ],

  practice: [
    num('p1', 'Find 7 − 10.', -3, {
      h: ['How far, and which way, from 10 to 7?'],
      s: '10 to 7 is 3 steps to the left. 7 − 10 = −3.',
      w: [['3', 'You went in the wrong direction. 7 is less than 10.']],
    }),
    num('p2', 'Find −4 − 6.', -10, {
      h: ['Subtracting 6 is the same as adding −6.'],
      s: '−4 + (−6) = −10.',
      w: [['2', 'Both are going left. Add the sizes.'], ['10', 'The answer is below zero.']],
    }),
    num('p3', 'Find −4 − (−9).', 5, {
      h: ['Subtracting −9 is the same as adding 9.'],
      s: '−4 + 9 = 5.',
      w: [['-13', 'Subtracting a negative moves you right, not left.'], ['-5', 'Subtract −9 means add 9. Start at −4 and go right.']],
    }),
    num('p4', 'Find 12 − (−5).', 17, {
      h: ['What is the opposite of −5?'],
      s: '12 − (−5) = 12 + 5 = 17.',
      w: [['7', 'You subtracted 5 instead of adding it.']],
    }),
    num('p5', 'The temperature falls from 3 degrees to −7 degrees. What is the change in temperature (new − old)? Give a negative number for a fall.', -10, {
      h: ['new − old = −7 − 3.'],
      s: '−7 − 3 = −10. It fell 10 degrees.',
      w: [['10', 'The change is a fall, so use a negative number.'], ['-4', '3 and 7 are on opposite sides of zero. Add the distances.']],
    }),
    num('p6', 'a − b = 6. What is b − a?', -6, {
      h: ['The two differences are opposites.'],
      s: 'Swapping the order flips the sign. b − a = −6.',
      w: [['6', 'b − a is the opposite of a − b.']],
    }),
    num('p7', 'Pick a from −5, −2, 3. Pick b from −4, 1, 6. What is the largest value of a − b?', 7, {
      h: ['To make a − b large, make a big and b small.'],
      s: 'Biggest a is 3. Smallest b is −4. 3 − (−4) = 7.',
      w: [['-1', 'You used the smallest a. For the largest answer, a should be as large as possible.'], ['-11', 'That is the smallest value of a − b, not the largest.']],
    }),
    mc('p8', 'Which expression equals 3 − (−4)?', ['3 + 4', '3 − 4', '−3 + 4', '−3 − 4'], 0, {
      h: ['Subtracting a negative means adding its opposite.'],
      s: '3 − (−4) = 3 + 4 = 7.',
      w: [[1, 'That is 3 − 4 = −1, not the same.'], [2, 'The first number stays 3.']],
    }),
  ],

  challenge: [
    chain('Hill and valley', 'A hill is 40 meters above sea level. A valley floor is 20 meters below sea level. Use height numbers: 40 and −20.', [
      num('c1a', 'How many meters higher is the hill than the valley floor?', 60, { h: ['Compute 40 − (−20).'], s: '40 − (−20) = 60.' }),
      num('c1b', 'A lake fills the valley and its surface rises 15 meters. What is the height of the water surface?', -5, { h: ['−20 + 15.'], s: '−20 + 15 = −5 meters.' }),
      num('c1c', 'How many meters is the hill above the lake surface now?', 45, { h: ['40 − (−5).'], s: '40 − (−5) = 45.' }),
    ], 'The idea: the difference in height between two places is high − low, even when the low one is below zero.'),
    chain('Hidden numbers', 'Find x in each equation. Use the number line or the "add the opposite" idea.', [
      num('c2a', 'x − (−5) = 2. What is x?', -3, { h: ['x + 5 = 2. What plus 5 is 2?'], s: 'x + 5 = 2, so x = −3.' }),
      num('c2b', '4 − x = 11. What is x?', -7, { h: ['4 minus what gives 11? It must be a negative.'], s: '4 − (−7) = 4 + 7 = 11. So x = −7.' }),
      num('c2c', '−9 − x = 3. What is x?', -12, { h: ['−9 + (the opposite of x) = 3. How far is −9 from 3?'], s: 'The opposite of x must be 12, so x = −12. Check: −9 − (−12) = −9 + 12 = 3.' }),
    ], 'The idea: rewrite each subtraction as an addition of the opposite. Then ask what number completes it.'),
    mc('c3', 'Find the error. Ana says: "The temperature went from −6 to 2, so the change is −6 − 2 = −8." What is wrong?', ['Nothing, the change is −8.', 'Change is new − old, so the change is 2 − (−6) = 8. The temperature rose.', 'The change is 4.', 'The change is −4.'], 1, {
      s: 'It went from −6 up to 2. 6 steps to zero and 2 more is 8. It rose 8 degrees.',
      w: [[0, 'The temperature went up, so the change is positive.']],
    }),
  ],

  quiz: [
    tpl('diff', (r) => {
      const a = r.nz(-40, 40), b = r.nz(-40, 40);
      return N('Find ' + par(a) + ' − ' + par(b) + '.', a - b, { s: par(a) + ' − ' + par(b) + ' = ' + par(a) + ' + ' + par(-b) + ' = ' + m(a - b) + '.', w: keep([[a + b, 'You added. Subtracting ' + m(b) + ' means adding its opposite, ' + m(-b) + '.'], [b - a, 'The order is reversed. This is ' + m(b) + ' − ' + par(a) + '.'], [-(a + b), 'Subtracting changes the sign of the second number only.']], a - b) });
    }),
    tpl('change', (r) => {
      const a = r.int(-25, 25), b = r.int(-25, 25);
      if (a === b) return N('The temperature goes from 5 to 5. What is the change?', 0, { s: 'No change.' });
      return N('The temperature goes from ' + m(a) + ' to ' + m(b) + ' degrees. What is the change? (new − old; use a negative number for a fall.)', b - a, { s: m(b) + ' − ' + par(a) + ' = ' + m(b - a) + '.', w: keep([[a - b, 'Change is new − old, not old − new.']], b - a) });
    }),
    tpl('height', (r) => {
      const hi = r.int(5, 60), lo = r.int(-60, -5);
      return N('A bird is at height ' + hi + ' meters. A fish is at height ' + m(lo) + ' meters (below the surface). How many meters above the fish is the bird?', hi - lo, { s: hi + ' − ' + par(lo) + ' = ' + (hi - lo) + '.', w: keep([[hi + lo, 'Subtract the lower height: ' + hi + ' − ' + par(lo) + '.']], hi - lo) });
    }),
    tpl('missing', (r) => {
      const a = r.nz(-30, 30), b = r.nz(-30, 30);
      const t = a - b;
      return N(par(a) + ' − x = ' + m(t) + '. What is x?', b, { s: 'We need ' + par(a) + ' − x = ' + m(t) + '. The number that works is x = ' + m(b) + '. Check: ' + par(a) + ' − ' + par(b) + ' = ' + m(t) + '.', w: keep([[a + t, 'Check by putting your x into the equation.'], [t - a, 'Check by putting your x into the equation.']], b) });
    }),
    tpl('maxdiff', (r) => {
      const A = r.distinct(3, -20, 20), B = r.distinct(3, -20, 20);
      const v = Math.max(...A) - Math.min(...B);
      return N('Pick a from ' + A.map(m).join(', ') + ' and b from ' + B.map(m).join(', ') + '. What is the largest possible value of a − b?', v, { s: 'Take the biggest a, ' + m(Math.max(...A)) + ', and the smallest b, ' + m(Math.min(...B)) + ': ' + m(v) + '.', w: keep([[Math.min(...A) - Math.max(...B), 'That is the smallest value. You want the largest.']], v) });
    }),
    tpl('three', (r) => {
      const a = r.nz(-20, 20), b = r.nz(-20, 20), c = r.nz(-20, 20);
      return N('Find ' + par(a) + ' − ' + par(b) + ' − ' + par(c) + '.', a - b - c, { s: par(a) + ' − ' + par(b) + ' = ' + m(a - b) + '. Then ' + par(a - b) + ' − ' + par(c) + ' = ' + m(a - b - c) + '.' });
    }),
    tpl('dist', (r) => {
      const a = r.int(-40, 40), b = r.int(-40, 40);
      if (a === b) return N('How far apart are 3 and −3 on the number line?', 6, { s: '3 + 3 = 6.' });
      return N('How far apart are ' + m(a) + ' and ' + m(b) + ' on the number line?', Math.abs(a - b), { s: 'The larger minus the smaller: ' + m(Math.max(a, b)) + ' − ' + par(Math.min(a, b)) + ' = ' + Math.abs(a - b) + '.' });
    }),
  ],
});
