import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n)); // minus sign for display

export default lesson({
  id: 'pre-1-1-numbers-and-the-number-line',
  title: 'Numbers and the number line',
  blurb: 'Negatives, opposites, absolute value, and distance: the number line as a map you can measure on.',
  concepts: ['integers', 'number-line', 'absolute-value'],

  tryFirst: [
    num('t1', 'At dawn it is −7 degrees. By noon it has warmed up by 12 degrees. What is the noon temperature?', 5, {
      h: ['Sketch a thermometer. Start at −7 and climb.', 'Climbing 7 gets you to 0. How much of the 12 is left?'],
      s: 'Climb 7 to reach 0, then 5 more: the answer is 5.',
      w: [['-19', 'You moved the wrong way. Warming moves you up the number line, toward bigger numbers.']],
    }),
    num('t2', 'How many integers are strictly between −4 and 3? (Not counting −4 or 3 themselves.)', 6, {
      h: ['List them out from left to right.', 'Do not forget 0.'],
      s: 'The integers are −3, −2, −1, 0, 1, 2. That is 6 of them.',
      w: [['7', 'Careful: "strictly between" leaves out both ends, and 0 counts as one. Re-list them.'], ['5', 'Did you skip 0? It sits between the negatives and the positives and it counts.']],
    }),
  ],

  learn: [
    p('The <b>number line</b> puts every number at a spot. Right means bigger, left means smaller. The whole numbers and their negative twins make the <b>integers</b>: …, −3, −2, −1, 0, 1, 2, 3, …'),
    widget('numberLineWalk', { a: 3, b: -5 }),
    rule('<b>Opposites.</b> The opposite of a number sits the same distance from 0 on the other side. The opposite of 7 is −7, and the opposite of −7 is 7. Zero is its own opposite.'),
    p('<b>Absolute value</b> is a distance. |x| means "how far is x from 0?" Distance is never negative, so |−9| = 9 and |9| = 9.'),
    ex('Distance between two points', ['How far apart are −5 and 8?', 'Walk from −5 up to 0: that is 5 steps.', 'Walk from 0 up to 8: that is 8 more steps.', 'Total: 5 + 8 = 13. When the points are on opposite sides of 0, add the distances to 0.']),
    rule('<b>Bigger means to the right.</b> −2 is bigger than −9, because −2 is farther right. A negative number with a small absolute value is closer to 0, so it is the bigger one.'),
    tbl(['Number', 'Opposite', 'Absolute value'], [['6', '−6', '6'], ['−11', '11', '11'], ['0', '0', '0']], 'Three views of the same numbers'),
    warn('<b>Watch out.</b> |−5| is not −5 and it is not "minus the absolute value". It is just 5. The bars ask for a distance, and a distance is never negative.'),
    mcq('Maya says "−12 is greater than −3 because 12 is greater than 3." What is wrong?', ['Nothing, she is right.', 'She compared the sizes of the numbers, but −12 is farther left on the line, so it is smaller.', 'Negative numbers cannot be compared.'], 1, 'On the number line −12 is left of −3. Farther left means smaller. The absolute values compare 12 and 3, but the numbers themselves compare the other way.', 'Spot the mistake'),
  ],

  practice: [
    mc('p1', 'Which is the greatest?', ['−15', '−2', '−8', '−40'], 1, {
      h: ['Which one is farthest to the right?'],
      s: '−2 is the closest to 0 of these, so it is farthest right and greatest.',
      w: [[3, 'That one has the biggest absolute value, which makes it the smallest number.'], [0, '15 is big, but the minus sign flips it. Check which is nearest 0.']],
    }),
    num('p2', 'Find |−9| + |4|.', 13, {
      h: ['Do each absolute value first.'],
      s: '|−9| = 9 and |4| = 4, so 9 + 4 = 13.',
      w: [['-5', 'Absolute values come out positive before you add. |−9| is 9, not −9.'], ['-13', 'The bars make both parts positive. The total cannot be negative here.']],
    }),
    num('p3', 'What is the opposite of the opposite of −6?', -6, {
      h: ['Do it in two steps. The opposite of −6 is...?'],
      s: 'Opposite of −6 is 6. Opposite of 6 is −6. Flipping twice returns you to the start.',
      w: [['6', 'That is only one flip. You flip twice.']],
    }),
    num('p4', 'How far apart are −5 and 8 on the number line?', 13, {
      h: ['They are on opposite sides of 0. Add the two distances to 0.'],
      s: '5 steps to reach 0, then 8 more: 13.',
      w: [['3', 'You subtracted the sizes. When points are on opposite sides of 0 you add the distances.']],
    }),
    num('p5', 'How many integers x make |x| less than 3 true?', 5, {
      h: ['x can be negative too. Which integers are within 2 steps of 0?'],
      s: 'The integers are −2, −1, 0, 1, 2. That is 5 integers.',
      w: [['2', 'Only counted the positives. Negatives and 0 count too.'], ['3', 'Count both sides of 0, and include 0 itself.']],
    }),
    num('p6', 'What number is exactly halfway between −7 and 11?', 2, {
      h: ['First find the distance between them.', 'Walk half that distance from −7.'],
      s: 'The distance is 18. Half of it is 9. From −7, 9 steps up lands on 2.',
      w: [['4', 'That is 11 − 7, which is not half the distance. The distance from −7 to 11 is 11 + 7, because they are on opposite sides of 0.'], ['9', '9 is half the distance. Walk 9 steps from −7 to find the halfway point.']],
    }),
    num('p7', 'What is the smallest integer that is greater than −3.5?', -3, {
      h: ['Put −3.5 on the line, halfway between −4 and −3.'],
      s: 'Just to the right of −3.5 is −3. So −3.',
      w: [['-4', '−4 is to the left of −3.5, so it is smaller than −3.5, not larger.']],
    }),
  ],

  challenge: [
    chain('The elevator', 'A building has floors above and below the ground floor, which is floor 0. An elevator starts at floor −3 (a basement level).', [
      num('c1a', 'It rises 8 floors, then drops 5 floors. Which floor is it on?', 0, { h: ['Do the two moves in order.'], s: '−3 + 8 = 5, then 5 − 5 = 0.' }),
      num('c1b', 'From there, what single move would take it to floor −6?', -6, { h: ['Moves can be negative. Down 6 floors is a move of −6.'], s: 'From 0 down 6 floors is a move of −6.' }),
      num('c1c', 'Over the whole trip, from floor −3 to floor −6, how many floors did the elevator travel in total (adding every move, ignoring direction)?', 19, { h: ['Add the lengths of all three moves: 8, 5, and the last one.'], s: '8 + 5 + 6 = 19 floors of travel, even though it only ended 3 floors from where it began.' }),
    ], 'The idea: the net change and the total distance travelled are different questions. The net change cares about direction; distance never does.'),
    chain('Mystery number', 'I am thinking of an integer x.', [
      set('c2a', 'Its absolute value is 7. What could x be?', '7,-7', { h: ['Two points are 7 steps from 0.'], s: 'x = 7 or x = −7.' }),
      num('c2b', 'Now I tell you x is also less than the number −2. What is x?', -7, { h: ['Which of your two choices is left of −2?'], s: '−7 is left of −2, 7 is not. So x = −7.' }),
      num('c2c', 'How far is x from the number 5?', 12, { h: ['They are on opposite sides of 0.'], s: '7 steps to reach 0, then 5 more: 12.' }),
    ], 'The idea: |x| = 7 gives two answers, one on each side of 0. A second clue usually decides between them.'),
    mc('c3', 'Find the error. Ben says: "The distance from −4 to 9 is 9 − 4 = 5." Which best explains his mistake?', ['He should have added 9 and 4 because −4 and 9 are on opposite sides of 0, so the distance is 13.', 'The distance is 5; Ben is correct.', 'He should have used −9 − 4 = −13.', 'Distances between negative numbers cannot be found.'], 0, {
      s: '−4 is 4 steps left of 0 and 9 is 9 steps right. 4 + 9 = 13.',
      w: [[1, 'Count it on the line: 4 steps to reach 0 and 9 more. That is 13.'], [2, 'A distance cannot be negative. Think "steps", and count them.']],
    }),
  ],

  quiz: [
    tpl('dist', (r) => {
      const a = r.int(2, 30), b = r.int(2, 30);
      return N('How far apart are −' + a + ' and ' + b + ' on the number line?', a + b, { s: a + ' steps to 0 and ' + b + ' more: ' + (a + b) + '.', w: [[Math.abs(a - b) || a + b + 1, 'They sit on opposite sides of 0, so add the distances. Do not subtract.']] });
    }),
    tpl('abs', (r) => {
      const a = r.int(2, 40), b = r.int(2, 40);
      const sub = r.bool();
      const q = sub ? 'Find |−' + a + '| − |' + b + '|. If it comes out negative, give it as a negative number.' : 'Find |−' + a + '| + |−' + b + '|.';
      const v = sub ? a - b : a + b;
      return N(q, v, { s: sub ? a + ' − ' + b + ' = ' + v + '.' : a + ' + ' + b + ' = ' + v + '.' });
    }),
    tpl('between', (r) => {
      const a = r.int(2, 30), b = r.int(3, 30);
      return N('How many integers are strictly between −' + a + ' and ' + b + '?', a + b - 1, { s: 'From −' + (a - 1) + ' up to ' + (b - 1) + ': ' + (a - 1) + (a - 1 === 1 ? ' negative, 0, and ' : ' negatives, 0, and ') + (b - 1) + (b - 1 === 1 ? ' positive, so ' : ' positives, so ') + (a + b - 1) + '.', w: [[a + b + 1, 'The two end numbers are not counted. "Strictly between" leaves them out.']] });
    }),
    tpl('mid', (r) => {
      const a = r.int(-30, -1), k = r.int(1, 25);
      const b = a + 2 * k;
      return N('What number is exactly halfway between ' + m(a) + ' and ' + m(b) + '?', a + k, { s: 'The gap is ' + (2 * k) + '. Half of it is ' + k + '. From ' + m(a) + ' step up ' + k + ': ' + m(a + k) + '.' });
    }),
    tpl('smallest', (r) => {
      const vals = r.distinct(4, -60, 60).filter((x) => x !== 0);
      const vs = vals.length === 4 ? vals : [-3, -9, 4, 11];
      return choice(r, 'Which of these numbers is the least?', m(Math.min(...vs)), vs.filter((x) => x !== Math.min(...vs)).map(m), { s: 'The least number is the one farthest left on the number line: ' + m(Math.min(...vs)) + '.' });
    }),
    tpl('flip', (r) => {
      const n = r.nz(-50, 50), k = r.int(3, 9);
      const out = k % 2 === 0 ? n : -n;
      return N('Start with ' + m(n) + ' and take its opposite ' + k + ' times in a row. What do you get?', out, { s: 'Each flip changes the side. An even number of flips lands where you started, an odd number lands on the other side.', w: [[-out, 'Count the flips. An even number of flips puts you back on the starting side.']] });
    }),
    tpl('temp', (r) => {
      const t = r.int(-25, -2), up = r.int(3, 30);
      return N(name(r) + ' reads ' + m(t) + ' degrees in the morning. By afternoon it has risen ' + up + ' degrees. What is the afternoon reading?', t + up, { s: m(t) + ' + ' + up + ' = ' + m(t + up) + '.' });
    }),
    tpl('absvals', (r) => {
      const k = r.int(2, 60);
      return S('Which numbers x satisfy |x| = ' + k + '? Give both, separated by a comma.', k + ',-' + k, { s: 'Two points are ' + k + ' steps from 0: ' + k + ' and −' + k + '.' });
    }),
  ],
});
