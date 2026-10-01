import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const sum = (a) => a.reduce((x, y) => x + y, 0);
const sortedNums = (a) => a.slice().sort((x, y) => x - y);

export default lesson({
  id: 'pre-13-1-mean-median-mode-range',
  title: 'Mean, median, mode and range',
  blurb: 'Four ways to describe a pile of numbers: the fair share, the middle, the most common, and the spread.',
  concepts: ['mean', 'median', 'mode', 'range'],

  tryFirst: [
    num('t1', 'Five friends have 4, 7, 7, 10 and 12 stickers. They pour all the stickers into one pile and then deal them out so everyone gets exactly the same number. How many does each friend get?', 8, {
      h: ['First find how many stickers there are in the whole pile.', 'Then split that pile into 5 equal shares.'],
      s: '4 + 7 + 7 + 10 + 12 = 40 stickers. 40 ÷ 5 = 8 each.',
      w: [['7', 'The number 7 shows up twice, but the fair share depends on the total pile, not on which number repeats. Add everything and split five ways.']],
    }),
    num('t2', 'Mia scored 70, 80 and 90 on three tests, so her average is 80. What must she score on a fourth test to raise her average to 85?', 100, {
      h: ['If the average of 4 tests is 85, what must the total of the 4 tests be?', 'Subtract what she already has.'],
      s: 'Four tests averaging 85 total 4 × 85 = 340. She has 70 + 80 + 90 = 240 so far. She needs 340 − 240 = 100.',
      w: [['85', 'A fourth score of 85 would not be enough: the first three average 80, so they pull the average down. Think about the total points needed.'], ['90', 'Check it: 70 + 80 + 90 + 90 = 330, and 330 ÷ 4 is only 82.5.']],
    }),
  ],

  learn: [
    p('A <b>data set</b> is a list of numbers. Often we want one number that describes the whole list. There are several, and each answers a different question.'),
    p('<b>The mean</b> is the "fair share" number. Imagine pooling everything and dealing it out evenly. In the stickers puzzle the mean was 8: the lumpy list 4, 7, 7, 10, 12 got leveled out into 8, 8, 8, 8, 8.'),
    rule('<b>Mean</b> = (sum of all the values) ÷ (how many values). Add first, then divide.'),
    rule('<b>Median</b> = the middle value after you <b>sort the list</b> from least to greatest. If there are two middle values (an even count), the median is halfway between them.'),
    rule('<b>Mode</b> = the value that appears most often. A list can have two modes, or none if nothing repeats. <b>Range</b> = greatest − least: it tells you how spread out the data is.'),
    widget('dataPlot', { data: [3, 4, 4, 5, 6, 7, 9], addable: true }),
    p('Try the picture: add the extra value and drag it far to the right. Watch the mean (yellow triangle) chase it while the median (blue line) barely moves. Remember that.'),
    ex('Finding all four', ['Data: 9, 4, 7, 4, 11, 5. Sort first: 4, 4, 5, 7, 9, 11.', 'Mean: 4 + 4 + 5 + 7 + 9 + 11 = 40, and 40 ÷ 6 = {20/3}, about 6.67.', 'Median: there are 6 values, so the middle two are 5 and 7. Halfway between them is 6.', 'Mode: 4 appears twice, nothing else repeats, so the mode is 4.', 'Range: 11 − 4 = 7.']),
    tbl(['Statistic', 'Question it answers', 'Needs sorting?'], [['Mean', 'What is the fair share?', 'No'], ['Median', 'What is the middle value?', 'Yes, always'], ['Mode', 'What is most common?', 'Helps to'], ['Range', 'How spread out is it?', 'Helps to']], 'Four descriptions of the same list'),
    warn('<b>Watch out.</b> The median of 3, 9, 5, 8, 6 is <i>not</i> 5, even though 5 sits in the middle of the list as written. Sort first: 3, 5, 6, 8, 9. The median is 6.'),
    mcq('Leo says: "The mean of 10, 20 and 60 is 20, because 20 is the middle number." What went wrong?', ['Nothing, 20 is the mean.', 'He found the median instead. The mean is (10 + 20 + 60) ÷ 3 = 30.', 'He should have divided by 2.'], 1, '20 is the middle value, which is the median. The mean pools all 90 and shares it among 3: 30. The big value 60 drags the mean up.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find the mean of 6, 9, 12, 5 and 8.', 8, {
      h: ['Add the five numbers.', 'Divide the total by 5.'],
      s: '6 + 9 + 12 + 5 + 8 = 40, and 40 ÷ 5 = 8.',
      w: [['40', 'That is the total. The mean divides the total by how many values there are.']],
    }),
    num('p2', 'Find the median of 14, 3, 9, 21, 7, 12.', 10.5, {
      h: ['Sort the list first.', 'With 6 values, the median is halfway between the 3rd and 4th.'],
      s: 'Sorted: 3, 7, 9, 12, 14, 21. The middle two are 9 and 12, and halfway between is 10.5.',
      w: [['15', 'You took the middle two of the list in its original order (9 and 21). Sort first.'], ['9', 'With an even count there are two middle values. Average them.'], ['12', 'With an even count there are two middle values. Average them.']],
    }),
    num('p3', 'Shoe sizes in a class: 7, 8, 8, 9, 7, 8, 10, 8, 9. What is the mode?', 8, {
      h: ['Tally how many times each size appears.'],
      s: '8 appears four times, 7 twice, 9 twice and 10 once. The mode is 8.',
      w: [['4', 'That is how many times the mode appears. The mode is the value itself.']],
    }),
    num('p4', 'Heights in cm: 152, 163, 148, 171, 159. What is the range?', 23, {
      h: ['Find the greatest and least.'],
      s: '171 − 148 = 23.',
      w: [['171', 'That is the greatest. The range is greatest minus least.'], ['19', 'That is 171 − 152, which skips the shortest height of 148.']],
    }),
    num('p5', 'Five numbers have a mean of 13. Four of them are 10, 14, 9 and 15. What is the fifth?', 17, {
      h: ['The five numbers must total 5 × 13.', 'Subtract the four you know.'],
      s: 'Total needed: 5 × 13 = 65. Known: 10 + 14 + 9 + 15 = 48. The fifth is 65 − 48 = 17.',
      w: [['13', 'If the missing number were the mean itself, the other four would already have to average 13. They do not.']],
    }),
    num('p6', 'Six numbers have a mean of 9. When a seventh number is added, the mean of all seven becomes 10. What is the seventh number?', 16, {
      h: ['Find the total of the first six, then the total of all seven.', 'The seventh number is the difference of the totals.'],
      s: 'Six numbers: 6 × 9 = 54. Seven numbers: 7 × 10 = 70. The new number is 70 − 54 = 16.',
      w: [['10', 'The new mean is 10, but the new number must be bigger to lift the mean of all seven. Compare the totals.'], ['1', 'The mean went up by 1, but the new value has to make up that increase for all seven numbers. Compare totals.']],
    }),
    num('p7', 'The list 6, 8, x, 12 has a median of 9.5. What is x?', 11, {
      h: ['Where must x sit in the sorted list for the middle two to average 9.5?', 'Try x = 11 and sort.'],
      s: 'If x is between 8 and 12 the middle two are 8 and x, so (8 + x) ÷ 2 = 9.5, which gives x = 11. Check: 6, 8, 11, 12 has middle pair 8 and 11, median 9.5. (Putting x elsewhere gives a median of at most 8, or exactly 10, never 9.5.)',
      w: [['9.5', 'The median is the average of the middle two values, not itself a member of the list. Work out which two are in the middle.'], ['10', 'Check: 6, 8, 10, 12 has median 9, not 9.5.']],
    }),
  ],

  challenge: [
    chain('Dev\'s quizzes', 'Dev scored 72, 85, 90 and 77 on his first four quizzes.', [
      num('c1a', 'What is his mean score so far?', 81, { h: ['Add them, then divide by 4.'], s: '72 + 85 + 90 + 77 = 324, and 324 ÷ 4 = 81.' }),
      num('c1b', 'What must he score on quiz 5 to bring his mean up to exactly 82?', 86, { h: ['Five quizzes at a mean of 82 total how much?'], s: '5 × 82 = 410. He has 324, so he needs 410 − 324 = 86.' }),
      num('c1c', 'Quizzes are out of 100. What is the greatest mean he could possibly have after quiz 5?', 84.8, { h: ['Give him the best possible fifth score.'], s: '(324 + 100) ÷ 5 = 424 ÷ 5 = 84.8.', w: [['100', 'That is the best single score, not the best mean. Divide the new total by 5.']] }),
    ], 'The idea: the mean is tied to the total. To hit a target mean, find the total you need, then see what is missing.'),
    chain('Four mystery numbers', 'Four whole numbers a ≤ b ≤ c ≤ d have a mean of 7, a median of 6, and a mode of 5 (the only repeated value).', [
      num('c2a', 'What is the sum of the four numbers?', 28, { h: ['Mean times how many.'], s: '4 × 7 = 28.' }),
      num('c2b', 'The median is 6, so what is b + c?', 12, { h: ['The median of four values is the average of the middle two.'], s: '(b + c) ÷ 2 = 6, so b + c = 12.' }),
      num('c2c', 'The mode is 5, so 5 appears at least twice. Those two 5s must be a and b. What is the largest number d?', 11, { h: ['If a = b = 5 then c = 12 − 5.', 'Then use the total of 28.'], s: 'a = b = 5, so c = 12 − 5 = 7. Then d = 28 − 5 − 5 − 7 = 11. The list 5, 5, 7, 11 works.', w: [['7', 'c is 7. The largest number d takes whatever is left of the total.']] }),
    ], 'The idea: each clue is a small equation. Turn the mean into a total, the median into a sum of two numbers, and the puzzle falls apart piece by piece.'),
    mc('c3', 'Find the error. Mia says: "For the data 3, 9, 5, 8, 6 the median is 5, because 5 is the middle number in the list." What is her mistake?', ['She did not sort the list first. Sorted it is 3, 5, 6, 8, 9, so the median is 6.', 'She should have averaged 3 and 9.', 'There is no mistake.', 'The median is the most common value.'], 0, {
      s: 'The median is the middle after sorting. Sorted: 3, 5, 6, 8, 9. The middle is 6.',
      w: [[1, 'Averaging two values is only for an even count. There are 5 values here, so one value is the median.'], [3, 'The most common value is the mode. The median is the middle one when sorted.']],
    }),
  ],

  quiz: [
    tpl('mean', (r) => {
      const n = r.int(4, 6), a = Array.from({ length: n }, () => r.int(5, 40));
      a[n - 1] += (n - (sum(a) % n)) % n;
      const m = sum(a) / n;
      return N('Find the mean of ' + a.join(', ') + '.', m, { s: 'The total is ' + sum(a) + '. Divide by ' + n + ': ' + m + '.', w: W(m, [[sum(a), 'That is the total. Divide it by ' + n + ', the number of values.']]) });
    }),
    tpl('medodd', (r) => {
      const n = r.pick([5, 7]), a = r.distinct(n, 3, 60), s = sortedNums(a), med = s[(n - 1) / 2];
      return N('What is the median of ' + a.join(', ') + '?', med, { s: 'Sorted: ' + s.join(', ') + '. The middle one is ' + med + '.', w: W(med, [[a[(n - 1) / 2], 'You took the middle of the list as written. Sort it first.']]) });
    }),
    tpl('medeven', (r) => {
      const n = r.pick([4, 6, 8]), a = r.distinct(n, 2, 70), s = sortedNums(a), x = s[n / 2 - 1], y = s[n / 2], med = (x + y) / 2;
      return N(name(r) + ' timed ' + n + ' laps, in seconds: ' + a.join(', ') + '. What is the median lap time?', med, { s: 'Sorted: ' + s.join(', ') + '. The middle two are ' + x + ' and ' + y + ', and halfway between them is ' + med + '.', w: W(med, [[x, 'There are two middle values. The median is halfway between ' + x + ' and ' + y + '.'], [y, 'There are two middle values. The median is halfway between ' + x + ' and ' + y + '.']]) });
    }),
    tpl('missing', (r) => {
      const k = r.int(3, 5), a = Array.from({ length: k }, () => r.int(40, 95));
      let x = r.int(30, 95); x += ((k + 1) - ((sum(a) + x) % (k + 1))) % (k + 1);
      const mean = (sum(a) + x) / (k + 1);
      return N(name(r) + ' has ' + k + ' test scores: ' + a.join(', ') + '. What score on one more test gives a mean of exactly ' + mean + '?', x, { s: (k + 1) + ' × ' + mean + ' = ' + (k + 1) * mean + ' is the total needed. ' + (k + 1) * mean + ' − ' + sum(a) + ' = ' + x + '.', w: W(x, [[mean, 'A score equal to the target mean only works if the first scores already average it. Find the total needed instead.']]) });
    }),
    tpl('range', (r) => {
      const n = r.int(5, 8), a = r.distinct(n, 40, 99), what = r.pick(['daily high temperatures (°F)', 'heights (cm) of seedlings', 'points scored in games', 'minutes spent on homework']);
      const rg = Math.max(...a) - Math.min(...a);
      return N('Here are some ' + what + ': ' + a.join(', ') + '. What is the range?', rg, { s: Math.max(...a) + ' − ' + Math.min(...a) + ' = ' + rg + '.', w: W(rg, [[Math.max(...a), 'That is the greatest value. The range is greatest minus least.']]) });
    }),
    tpl('modes', (r) => {
      const [x, y, ...rest] = r.distinct(6, 1, 30);
      const a = r.shuffle([x, x, x, y, y, y, rest[0], rest[1], rest[2], rest[3]]);
      return S('Find every mode of ' + a.join(', ') + '. Give them separated by a comma.', x + ',' + y, { s: x + ' and ' + y + ' each appear 3 times, and every other value appears once. Both are modes.', w: [[String(x), 'Right so far, but ' + y + ' appears just as often. A list can have more than one mode.'], [String(y), 'Right so far, but ' + x + ' appears just as often. A list can have more than one mode.']] });
    }),
    tpl('newval', (r) => {
      const n = r.int(3, 8), m = r.int(10, 40);
      let v = r.int(5, 80); v += ((n + 1) - ((n * m + v) % (n + 1))) % (n + 1);
      const nm = (n * m + v) / (n + 1);
      return N('The mean of ' + n + ' numbers is ' + m + '. A new number, ' + v + ', joins the list. What is the mean of all ' + (n + 1) + ' numbers?', nm, { s: 'Old total: ' + n + ' × ' + m + ' = ' + n * m + '. New total: ' + n * m + ' + ' + v + ' = ' + (n * m + v) + '. Divide by ' + (n + 1) + ': ' + nm + '.', w: W(nm, [[(m + v) / 2, 'You averaged the old mean and the new number. The old numbers count ' + n + ' times, so use totals.']]) });
    }),
    tpl('classes', (r) => {
      const x = r.int(2, 9), y = r.int(2, 9), a = r.int(60, 94);
      const ok = []; for (let b = 55; b <= 99; b++) if ((x * a + y * b) % (x + y) === 0) ok.push(b);
      const b = ok.length ? r.pick(ok) : a;
      const c = (x * a + y * b) / (x + y);
      return N('One group of ' + x + ' students averaged ' + a + ' on a test. Another group of ' + y + ' students averaged ' + b + '. What is the mean score of all ' + (x + y) + ' students together?', c, { s: 'Totals: ' + x * a + ' and ' + y * b + ', so ' + (x * a + y * b) + ' points for ' + (x + y) + ' students: ' + c + '.', w: W(c, [[(a + b) / 2, 'You averaged the two averages. The bigger group should count more, so go back to the totals.']]) });
    }),
  ],
});
