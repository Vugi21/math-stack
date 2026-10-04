import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';
import { dec } from '../../../../src/widgets/decimals.js';

const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
/** round k thousandths to `keep` decimal places (0 to 2), halves round up. Returns an integer in units of 10^-keep. */
const tr = (k) => dec(k, 3).replace(/0+$/, '').replace(/\.$/, '');
const roundTo = (k, keep) => { const u = 10 ** (3 - keep); return Math.floor((k + u / 2) / u); };

export default lesson({
  id: 'm4-11-3-comparing-decimals',
  title: 'Comparing decimals',
  blurb: 'Which is bigger? Trailing zeros, numbers in between, and rounding to the nearest tenth or hundredth.',
  concepts: ['decimals', 'comparing', 'rounding'],

  tryFirst: [
    num('t1', 'Which board is longer: one that is 0.8 m long, or one that is 0.75 m long? Give the length of the longer board.', '0.8', {
      h: ['Write 0.8 with two places after the point.', 'Compare 80 hundredths with 75 hundredths.'],
      s: '0.8 = 0.80, which is 80 hundredths. 0.75 is 75 hundredths. 80 is more than 75, so the 0.8 m board is longer.',
      w: [['0.75', 'More digits does not mean bigger. 0.8 is 80 hundredths, which is more than 75 hundredths.']],
    }),
    num('t2', 'How many decimals with exactly two places after the point are strictly between 0.3 and 0.4?', 9, {
      h: ['Write 0.3 as 0.30 and 0.4 as 0.40.', 'List the decimals from 0.31 up.'],
      s: 'The numbers are 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39. That is 9 numbers.',
      w: [['10', 'The ends 0.30 and 0.40 are not strictly between. Count only the numbers in the middle.'], ['8', 'Count again. Start at 0.31 and end at 0.39.']],
    }),
  ],

  learn: [
    p('To compare whole numbers, look at the digits from the left. The first place where they differ decides. Decimals work the same way, but you must line up the places first.'),
    rule('<b>Compare place by place.</b> Start at the left. Compare the ones, then the tenths, then the hundredths, then the thousandths. The first place where the digits differ decides which number is bigger.'),
    ex('Which is bigger: 0.45 or 0.4?', ['Ones: 0 and 0. Same.', 'Tenths: 4 and 4. Same.', 'Hundredths: 5 and (nothing). Nothing means 0.', '5 is more than 0, so 0.45 > 0.4.']),
    def('trailing zero', 'A zero at the far right end of a decimal. It does not change the value: 0.4 = 0.40 = 0.400.'),
    rule('<b>Trailing zeros.</b> A zero on the far right of a decimal does not change its value. Add zeros to give two decimals the same number of places, and compare.'),
    tbl(['Number', 'Same with 3 places', 'In thousandths'], [['0.8', '0.800', '800'], ['0.72', '0.720', '720'], ['0.702', '0.702', '702'], ['0.08', '0.080', '80']], 'Writing in thousandths makes comparing easy'),
    p('Comparing with the same number of places is like comparing whole numbers: 800 > 720 > 702 > 80. So 0.8 > 0.72 > 0.702 > 0.08.'),
    key('A longer decimal is <b>not</b> a bigger decimal. 0.3 has one digit and 0.25 has two, but 0.3 = 0.30 is bigger than 0.25.'),
    rule('<b>Between two decimals.</b> There is always another decimal in between. Add one more place. Between 0.3 and 0.4 you find 0.31 to 0.39. Between 0.31 and 0.32 you find 0.311 to 0.319.'),
    def('rounding', 'Choosing the nearest number with fewer places. We round to the nearest tenth, hundredth, and so on.'),
    p('To round 7.382 to the nearest tenth, ask: is it closer to 7.3 or to 7.4? Look at the next digit, the hundredths digit. If it is 5 or more, round up. If it is 4 or less, stay. Here the next digit is 8, so 7.382 rounds up to 7.4.'),
    widget('roundingLine', { v: 7382, place: 1 }),
    ex('Rounding to the nearest hundredth', ['Round 5.678 to the nearest hundredth.', 'The hundredths digit is 7. Look at the next digit, the thousandths: 8.', '8 is 5 or more, so round the 7 up to 8.', '5.678 rounds to 5.68.']),
    tip('To compare quickly, write both numbers with the same number of places by adding trailing zeros. Then ignore the point and compare them as whole numbers: 0.4 and 0.35 become 0.40 and 0.35, so 40 against 35.'),
    warn('<b>Watch out.</b> 0.3 is not smaller than 0.25. A longer decimal is not a bigger decimal. And 0.06 is smaller than 0.1, even though 6 is bigger than 1.'),
    mcq('Ben says: "0.35 is greater than 0.4, because 35 is greater than 4." What is wrong?', ['Nothing, he is right.', 'The two decimals have different numbers of places. Written as 0.35 and 0.40, we compare 35 and 40 hundredths, and 40 is more.', 'He should compare only the first digits, 3 and 4, so the numbers are equal.'], 1, '0.40 has 4 tenths and 0.35 has only 3 tenths. The tenths digit decides: 0.4 is greater.', 'Spot the mistake'),
    recap([['compare', 'go place by place from the left'], ['trailing zero', 'a zero at the right end, does not change the value'], ['rounding', 'nearest number with fewer places; 5 or more rounds up']], [['Equal decimals', '0.4 = 0.40 = 0.400']]),
  ],

  practice: [
    mc('p1', 'Which is the greatest?', ['0.45', '0.5', '0.405', '0.054'], 1, {
      h: ['Write each with 3 places after the point.'],
      s: 'In thousandths: 450, 500, 405, 54. The greatest is 500, which is 0.5.',
      w: [[0, '0.45 = 0.450. Compare it with 0.500.'], [2, '0.405 has the longest string of digits, but it is only 405 thousandths.']],
    }),
    num('p2', 'Which is smaller: 0.09 or 0.1? Give the smaller number.', '0.09', {
      h: ['Write 0.1 as 0.10.'],
      s: '0.1 = 0.10, which is 10 hundredths. 0.09 is only 9 hundredths. The smaller is 0.09.',
      w: [['0.1', '0.1 is 10 hundredths. That is more than 9 hundredths.']],
    }),
    num('p3', 'How many decimals with exactly three places after the point are strictly between 0.2 and 0.203?', 2, {
      h: ['Write 0.2 as 0.200.'],
      s: 'The decimals are 0.201 and 0.202. That is 2.',
      w: [['3', 'The ends are not counted. 0.200 and 0.203 are not between themselves.'], ['0', 'There are some: think in thousandths. 200 and 203 have 201 and 202 between them.']],
    }),
    num('p4', 'Round 3.846 to the nearest tenth.', '3.8', {
      h: ['The tenths digit is 8. Look at the next digit.'],
      s: 'The next digit is 4, which is less than 5. Stay at 3.8.',
      w: [['3.9', 'The next digit is 4, so you do not round up.'], ['3.85', 'That rounds to the nearest hundredth. The question asks for the nearest tenth.']],
    }),
    num('p5', 'Round 0.95 to the nearest tenth.', 1, {
      h: ['0.95 is exactly halfway between 0.9 and 1.0. Halves round up.'],
      s: 'The hundredths digit is 5, so round up. 0.9 becomes 1.0. The answer is 1 (or 1.0).',
      w: [['0.9', 'The next digit is 5. A 5 rounds up.'], ['0.10', 'Rounding up 0.9 by a tenth gives 1.0, not 0.10.']],
    }),
    num('p6', 'A decimal with two places rounds to 4.3 when rounded to the nearest tenth. What is the smallest such number?', '4.25', {
      h: ['Which hundredths numbers round up to 4.3?', 'The cut-off is a hundredths digit of 5.'],
      s: 'Numbers from 4.25 up to 4.34 round to 4.3. The smallest is 4.25.',
      w: [['4.3', '4.30 is in the group, but 4.25 is smaller and also rounds to 4.3.'], ['4.24', '4.24 rounds down to 4.2.']],
    }),
    num('p7', 'How many decimals with exactly one place after the point are strictly between 0.09 and 0.5?', 4, {
      h: ['The one-place decimals are 0.1, 0.2, 0.3, and so on.'],
      s: '0.1, 0.2, 0.3 and 0.4 are between 0.09 and 0.5. 0.5 is not strictly between. That is 4.',
      w: [['5', '0.5 is the end, so it is not counted.'], ['3', 'Do not forget 0.1. It is bigger than 0.09.']],
    }),
    num('p8', 'Use the digits 3, 5 and 8 once each to make a decimal 0._ _ _ that is as close to 0.5 as possible. What is it?', '0.538', {
      h: ['The tenths digit should be 5.', 'Then make the rest as small as you can.'],
      s: 'A tenths digit of 5 gives a number from 0.5 to 0.6. Using 3 next makes it 0.538 (38 thousandths above 0.5). The alternative 0.583 is farther.',
      w: [['0.583', 'That is 0.083 above 0.5. Try the smaller digit first.'], ['0.358', 'That is 0.142 below 0.5.']],
    }),
  ],

  challenge: [
    chain('Digit cards', 'You have cards 2, 6 and 9. You make a number in the form _._ _ using each card once.', [
      num('c1a', 'What is the greatest number you can make?', '9.62', { h: ['Put the biggest digit in the ones place.'], s: 'The ones place matters most, then tenths, then hundredths. Greatest: 9.62.' }),
      num('c1b', 'What is the smallest number you can make?', '2.69', { h: ['Put the smallest digit first.'], s: 'Smallest ones digit is 2, then 6, then 9: 2.69.' }),
      num('c1c', 'Round the greatest number to the nearest whole number.', 10, { h: ['9.62 is between 9 and 10. Is it past halfway?'], s: '9.62 has tenths digit 6, which is 5 or more, so round up to 10.' }),
    ], 'The idea: the leftmost place has the biggest effect. To make the greatest number, give the greatest digit to the leftmost place.'),
    chain('Race times', 'Four runners have times in seconds: 12.4, 12.04, 12.35 and 12.304.', [
      num('c2a', 'Which time is the smallest (the fastest)?', '12.04', { h: ['Write all with 3 places.'], s: 'In thousandths: 12400, 12040, 12350, 12304. The smallest is 12.040.' }),
      num('c2b', 'Which time is the greatest (the slowest)?', '12.4', { h: ['Same method.'], s: '12.400 is the greatest.' }),
      num('c2c', 'How many of the four times are less than 12.35?', 2, { h: ['12.35 itself is not less than 12.35.'], s: '12.04 and 12.304 are less than 12.350. The others are 12.4 (greater) and 12.35 (equal). So 2.' }),
    ], 'The idea: first give all numbers the same number of places. Then compare them as whole numbers.'),
    mc('c3', 'Find the error. Omar says: "0.7 is less than 0.65, because 7 is less than 65." What is the best correction?', ['0.7 = 0.70 and 0.65, so compare 70 with 65 hundredths. 0.7 is greater.', 'Omar is right.', 'The two numbers are equal.', 'You cannot compare these.'], 0, {
      s: '70 hundredths is more than 65 hundredths. So 0.7 > 0.65.',
      w: [[1, 'Write both with two places: 0.70 and 0.65.'], [2, '0.70 and 0.65 are not equal.']],
    }),
  ],

  quiz: [
    tpl('largest', (r) => {
      const ks = r.distinct(4, 5, 900);
      const max = Math.max(...ks);
      return choice(r, 'Which is the greatest?', tr(max), ks.filter((k) => k !== max).map(tr), { s: 'Written with 3 places: ' + ks.map((k) => dec(k, 3)).join(', ') + '. The greatest is ' + dec(max, 3) + '.' });
    }),
    tpl('smallest', (r) => {
      const ks = r.distinct(4, 5, 900);
      const min = Math.min(...ks);
      return choice(r, 'Which is the smallest?', tr(min), ks.filter((k) => k !== min).map(tr), { s: 'Written with 3 places: ' + ks.map((k) => dec(k, 3)).join(', ') + '. The smallest is ' + dec(min, 3) + '.' });
    }),
    tpl('between', (r) => {
      const a = r.int(1, 8), places = r.pick([2, 3]);
      const lo = a * 10 ** (places - 1), hi = lo + 10 ** (places - 1);
      const gapLo = r.int(0, 2), gapHi = r.int(4, 8);
      const x = lo + gapLo, y = lo + gapHi;
      return N('How many decimals with exactly ' + places + ' places after the point are strictly between ' + dec(x, places) + ' and ' + dec(y, places) + '?', y - x - 1, { s: 'Count the ' + places + '-place decimals from ' + dec(x + 1, places) + (y - x - 1 === 1 ? '' : ' to ' + dec(y - 1, places)) + ': ' + (y - x - 1) + '.', w: W(y - x - 1, [[y - x + 1, 'Do not count the two ends. "Strictly between" leaves them out.']]) });
    }),
    tpl('tenth', (r) => {
      const k = r.int(101, 9899);
      const ans = dec(roundTo(k, 1), 1);
      return N('Round ' + dec(k, 3) + ' to the nearest tenth.', ans, { s: 'Look at the hundredths digit: ' + (Math.floor(k / 10) % 10) + '. ' + ((Math.floor(k / 10) % 10) >= 5 ? 'It is 5 or more, so round up' : 'It is less than 5, so stay') + ': ' + ans + '.', w: W(ans, [[dec(roundTo(k, 2), 2), 'That rounds to the hundredths. The question asks for the nearest tenth.']]) });
    }),
    tpl('hundredth', (r) => {
      const k = r.int(1001, 49999);
      const ans = dec(roundTo(k, 2), 2);
      return N('Round ' + dec(k, 3) + ' to the nearest hundredth.', ans, { s: 'Look at the thousandths digit: ' + (k % 10) + '. ' + (k % 10 >= 5 ? 'Round up' : 'Stay') + ': ' + ans + '.', w: W(ans, [[dec(roundTo(k, 1), 1), 'That rounds to the tenths. Keep two places after the point.']]) });
    }),
    tpl('whole', (r) => {
      const k = r.int(11, 999);
      const ans = Math.floor((k + 5) / 10);
      return N('Round ' + dec(k, 1) + ' to the nearest whole number.', ans, { s: 'Look at the tenths digit: ' + (k % 10) + '. ' + (k % 10 >= 5 ? 'Round up' : 'Stay') + ': ' + ans + '.' });
    }),
    tpl('closer', (r) => {
      const t = r.int(10, 80), m = r.pick([2, 3, 4, 6, 7, 8]);
      const x = t * 10 + m;
      const lo = dec(t * 10, 2), hi = dec(t * 10 + 10, 2);
      const closer = m >= 5 ? hi : lo;
      return choice(r, 'Is ' + dec(x, 2) + ' closer to ' + lo + ' or to ' + hi + '? Choose the closer one.', closer, [m >= 5 ? lo : hi, 'They are equally close'], { s: dec(x, 2) + ' is ' + m + ' hundredths past ' + lo + ' and ' + (10 - m) + ' hundredths short of ' + hi + '. It is closer to ' + closer + '.' });
    }),
    tpl('next', (r) => {
      const k = r.int(101, 9989), places = r.pick([2, 3]);
      const kk = places === 3 ? k : Math.floor(k / 10) + 1;
      return N('What is the smallest number with exactly ' + places + ' places after the point that is greater than ' + dec(kk, places) + '?', dec(kk + 1, places), { s: 'Add one unit in the last place: ' + dec(kk + 1, places) + '.' });
    }),
  ],
});
