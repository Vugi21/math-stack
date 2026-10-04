import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));

export default lesson({
  id: 'm4-9-1-negative-numbers',
  title: 'Negative numbers',
  blurb: 'Numbers below zero: the number line, temperature, depth, money owed, and opposites.',
  concepts: ['integers', 'negative-numbers', 'opposites'],

  tryFirst: [
    num('t1', 'At night the temperature is 4 degrees below zero. By noon it has risen 9 degrees. What is the noon temperature in degrees?', 5, {
      h: ['Draw a thermometer. Start 4 below zero.', 'Rising 4 brings you to 0. How much of the 9 is left?'],
      s: 'Rise 4 to reach 0. Then 5 more. The noon temperature is 5 degrees.',
      w: [['13', 'You added 4 and 9. The starting point is below zero, so some of the climb is used getting back to 0.'], ['-5', 'The temperature ends above zero. Check how far it climbs.']],
    }),
    num('t2', 'A submarine is 30 meters below the surface of the sea. It rises 18 meters. How many meters below the surface is it now?', 12, {
      h: ['It was 30 below. Going up makes it less deep.'],
      s: '30 − 18 = 12 meters below the surface.',
      w: [['48', 'Rising makes the submarine less deep, not more.'], ['18', 'It was 30 below. It rose 18, so subtract.']],
    }),
  ],

  learn: [
    p('Some quantities go below zero. A freezer can be 10 degrees below zero. A diver can be 5 meters below sea level. A person can owe $20. We need numbers for these situations, and the number line gives us a way to picture them.'),
    def('negative number', 'A number less than zero. We write it with a minus sign: −10, −5, −20. It sits to the <b>left</b> of 0 on the number line.'),
    def('positive number', 'A number greater than zero. It sits to the <b>right</b> of 0. Zero itself is neither positive nor negative.'),
    def('integer', 'A whole number or its negative. The integers are …, −3, −2, −1, 0, 1, 2, 3, … Fractions such as {1/2} are not integers.'),
    widget('numberLineWalk', { a: 2, b: -5 }),
    p('On a number line, positive numbers go to the right of 0 and negative numbers to the left. The widget shows a start and a move. The dot lands where you end up.'),
    def('opposites', 'Two numbers that are the same distance from 0 on different sides. 6 and −6 are opposites. The opposite of 0 is 0.'),
    rule('<b>Opposites.</b> Two numbers are opposites if they are the same distance from 0 on different sides. 6 and −6 are opposites. The opposite of 0 is 0.'),
    key('A minus sign in front of a number tells you <b>which side of zero</b> it is on. The number itself tells you how many steps from zero.'),
    ex('Reading a thermometer', ['The temperature is −3. It falls 4 degrees.', 'Falling means moving down, to the left on the line.', '−3, then −4, −5, −6, −7. Four steps down.', 'The new temperature is −7.']),
    tbl(['Situation', 'Number'], [['10 degrees below zero', '−10'], ['Floor 3 below the ground floor', '−3'], ['A debt of $20', '−20'], ['15 meters above sea level', '15']], 'Everyday negatives'),
    ex('Writing situations as integers', ['A submarine is 40 meters below the surface. Write it as −40.', 'A hiker is 40 meters above the starting point. Write it as 40.', 'The opposite of −40 is 40. The opposite of 17 is −17.']),
    tip('Words give the sign. <b>Below, owe, lose, fall, down</b> point to negative. <b>Above, earn, gain, rise, up</b> point to positive. A thermometer turned on its side is the number line.'),
    warn('<b>Watch out.</b> −7 is not "bigger" than −2 just because 7 is bigger than 2. A bigger number in front of the minus sign means a longer way to the left. We compare numbers in the next lesson.'),
    mcq('Zed says: "The opposite of −5 is −5, because opposites of negative numbers stay negative." What is wrong?', ['Nothing. He is right.', 'The opposite of −5 is 5. It is the same distance from 0, on the other side.', 'The opposite of −5 is 0.'], 1, '−5 is 5 steps left of 0. Its opposite is 5 steps right of 0, which is 5.', 'Spot the mistake'),
    recap([['negative', 'less than 0; left of 0'], ['positive', 'greater than 0; right of 0'], ['integer', 'whole numbers and their negatives'], ['opposites', 'same distance from 0, other side']], [['Opposite of a', '−a'], ['Opposite of 0', '0']]),
  ],

  practice: [
    num('p1', 'How many integers are there from −6 to 4, counting both −6 and 4?', 11, {
      h: ['Count the negatives, zero, and the positives separately.'],
      s: 'Negatives: −6 to −1 is 6 numbers. Zero is 1. Positives 1 to 4 is 4 numbers. 6 + 1 + 4 = 11.',
      w: [['10', 'Did you leave out 0? It is an integer.'], ['9', 'Count carefully: 6 negatives, zero, and 4 positives.']],
    }),
    num('p2', 'What is the opposite of 14 − 20?', 6, {
      h: ['First work out 14 − 20. Is it negative?'],
      s: '14 − 20 = −6. The opposite of −6 is 6.',
      w: [['-6', 'That is 14 − 20 itself. The question asks for its opposite.']],
    }),
    num('p3', 'Start at 2 on the number line. Go 5 steps to the left. Where do you land?', -3, {
      h: ['2 steps get you to 0. How many more?'],
      s: '2 steps to reach 0, then 3 more to the left. You land on −3.',
      w: [['3', '2 − 5 is below zero. You pass 0 and end on the left side.'], ['-7', 'You started at 2, not 0. Two of the five steps are used up reaching 0.']],
    }),
    num('p4', 'At 6 a.m. the temperature is −8. It rises 3 degrees every hour. After how many hours is it first above 0?', 3, {
      h: ['Make a list: −8, −5, −2, ...'],
      s: '−8, −5, −2, 1. After 3 hours it reads 1, the first time above 0.',
      w: [['2', 'After 2 hours it is −2, which is still below zero.'], ['4', 'Check the third hour: −8 + 9 = 1.']],
    }),
    num('p5', 'Ana has $15 and owes her sister $22. If a debt counts as a negative amount, how much is she worth altogether?', -7, {
      h: ['Use the $15 to pay back part of the debt.'],
      s: 'She pays $15 of the $22. She still owes $7. So she is worth −7 dollars.',
      w: [['7', 'She still owes money, so the answer is below zero.'], ['-37', 'The $15 helps pay the debt. You do not add it to the debt.']],
    }),
    num('p6', 'Two numbers are opposites, and they are 14 apart on the number line. What is the larger of the two?', 7, {
      h: ['Opposites are the same distance from 0. Half of 14 is each distance.'],
      s: 'Each is 7 from 0. They are 7 and −7. The larger is 7.',
      w: [['14', '14 is the distance between them, not the distance from 0.'], ['-7', '−7 is the smaller one.']],
    }),
    num('p7', 'An elevator stops at every floor from −3 to 8, but there is no floor 0 in this building. How many floors does it stop at?', 11, {
      h: ['Count all the integers from −3 to 8 first.'],
      s: 'The integers from −3 to 8 are 3 + 1 + 8 = 12. Take away floor 0. That is 11.',
      w: [['12', 'The building has no floor 0. Take it away.'], ['10', 'Count again. There are 3 basement floors and 8 floors above ground.']],
    }),
    mc('p8', 'Which pair is NOT a pair of opposites?', ['4 and −4', '−9 and 9', '0 and 0', '−6 and −6'], 3, {
      h: ['Opposites are on different sides of 0 (except 0 itself).'],
      s: '−6 and −6 are the same number on the same side. The others are opposites.',
      w: [[2, '0 is its own opposite.']],
    }),
  ],

  challenge: [
    chain('Five cold days', 'The lowest temperatures on five days were −3, −7, 2, −1, and −5 degrees.', [
      num('c1a', 'On how many of the days was the low below zero?', 4, { h: ['Only one of the numbers is positive.'], s: '−3, −7, −1, −5 are below zero. That is 4.' }),
      num('c1b', 'What was the second coldest low? Give the number.', -5, { h: ['The coldest is farthest left on the line. Find the second farthest left.'], s: 'In order from coldest: −7, −5, −3, −1, 2. The second coldest was −5.' }),
      num('c1c', 'How many degrees apart are the coldest and the warmest lows?', 9, { h: ['−7 is 7 below zero. 2 is 2 above.'], s: '7 steps up to reach 0, then 2 more. 7 + 2 = 9.' }),
    ], 'The idea: the colder number is the one farther to the left. A gap across zero is the sum of the two distances from zero.'),
    chain('Mystery integers', 'Each clue describes one integer. Use the number line.', [
      num('c2a', 'A number is exactly 10 more than its opposite. What is the number?', 5, { h: ['The number and its opposite sit on opposite sides of 0.', 'The gap between them is 10.'], s: 'The two are 5 and −5. The gap is 10, and 5 is the larger. So 5.' }),
      num('c2b', 'A different number is exactly 14 less than its opposite. What is it?', -7, { h: ['It is the smaller one. Half of 14 is 7.'], s: 'The number is −7 and its opposite is 7. −7 is 14 less than 7.' }),
      num('c2c', 'A third number is exactly the same distance from 3 as from −9. What is it?', -3, { h: ['It is halfway between −9 and 3.', 'The distance from −9 to 3 is 12.'], s: 'Half of 12 is 6. From −9 go 6 to the right: −3.' }),
    ], 'The idea: "same distance from two numbers" means the halfway point between them.'),
    mc('c3', 'Find the error. Kim says: "There are 7 integers between −3 and 3, because −3, −2, −1, 0, 1, 2, 3 is 7 numbers." What is wrong?', ['Nothing, the list has 7 integers, and the question asks "between".', 'She counted −3 and 3 themselves. Between them there are 5 integers: −2, −1, 0, 1, 2.', 'She forgot 0.', 'There are 6 because 0 does not count.'], 1, {
      s: '"Between" does not include the endpoints. The integers are −2, −1, 0, 1, 2, so 5.',
      w: [[0, '"Between" leaves out the two end numbers, −3 and 3.'], [3, '0 is an integer and it is between −3 and 3.']],
    }),
  ],

  quiz: [
    tpl('count', (r) => {
      const a = r.int(2, 30), b = r.int(2, 30);
      return N('How many integers are there from ' + m(-a) + ' to ' + b + ', counting both ends?', a + b + 1, { s: a + ' negatives, zero, and ' + b + ' positives: ' + (a + b + 1) + '.', w: keep([[a + b, 'You left out 0.']], a + b + 1) });
    }),
    tpl('between', (r) => {
      const a = r.int(2, 30), b = r.int(2, 30);
      return N('How many integers are strictly between ' + m(-a) + ' and ' + b + '? (The end numbers do not count.)', a + b - 1, { s: 'From ' + m(-(a - 1)) + ' to ' + (b - 1) + ': ' + (a + b - 1) + '.', w: keep([[a + b + 1, 'The end numbers do not count.']], a + b - 1) });
    }),
    tpl('left', (r) => {
      const s = r.int(1, 15), k = r.int(s + 1, s + 25);
      return N('Start at ' + s + ' on the number line and take ' + k + ' steps to the left. Where do you land?', s - k, { s: s + (s === 1 ? ' step reaches 0, then ' : ' steps reach 0, then ') + (k - s) + ' more. You land on ' + m(s - k) + '.', w: keep([[k - s, 'You passed zero. The answer is on the left side.']], s - k) });
    }),
    tpl('debt', (r) => {
      const a = r.int(5, 40), b = r.int(a + 1, a + 40);
      return N(name(r) + ' has $' + a + ' and owes $' + b + '. If a debt counts as negative, what is the total in dollars?', a - b, { s: 'Use the $' + a + ' to pay part of the debt. $' + (b - a) + ' is still owed, so ' + m(a - b) + '.', w: keep([[b - a, 'The person still owes money. The result is below zero.']], a - b) });
    }),
    tpl('opp', (r) => {
      const a = r.int(5, 30), b = r.int(a + 1, a + 30);
      return N('What is the opposite of ' + a + ' − ' + b + '?', b - a, { s: a + ' − ' + b + ' = ' + m(a - b) + '. Its opposite is ' + (b - a) + '.', w: keep([[a - b, 'That is the number itself, not its opposite.']], b - a) });
    }),
    tpl('half', (r) => {
      const a = r.int(2, 30), k = r.int(1, 25);
      const lo = -a, hi = -a + 2 * k;
      return N('What number is exactly halfway between ' + m(lo) + ' and ' + m(hi) + '?', lo + k, { s: 'The gap is ' + 2 * k + '. Half of it is ' + k + '. ' + m(lo) + ' + ' + k + ' = ' + m(lo + k) + '.' });
    }),
    tpl('heat', (r) => {
      const t = r.int(3, 25), up = r.int(2, 40);
      return N('At dawn it is ' + t + ' degrees below zero. By afternoon it has risen ' + up + ' degrees. What is the reading? Use a negative number if it is below zero.', up - t, { s: m(-t) + ' + ' + up + ' = ' + m(up - t) + '.', w: keep([[t + up, 'Rising from below zero first brings you up to 0.'], [-(t + up), 'Rising moves the reading up, not down.']], up - t) });
    }),
    tpl('leftmost', (r) => {
      const vs = r.distinct(4, -40, 40);
      const lo = Math.min(...vs);
      return choice(r, 'Which of these numbers is farthest to the left on the number line?', m(lo), vs.filter((x) => x !== lo).map(m), { s: 'The smallest number is the one farthest left: ' + m(lo) + '.' });
    }),
  ],
});
