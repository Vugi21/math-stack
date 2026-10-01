import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const sum = (a) => a.reduce((x, y) => x + y, 0);
const sortedNums = (a) => a.slice().sort((x, y) => x - y);

export default lesson({
  id: 'pre-13-2-outliers-and-misleading-averages',
  title: 'Outliers and misleading averages',
  blurb: 'One extreme value can bend the mean. Learn which average to trust, and how headlines use the wrong one.',
  concepts: ['outliers', 'mean-vs-median', 'misleading-statistics'],

  tryFirst: [
    num('t1', 'Five houses on Elm Street cost 200, 210, 220, 230 and 240 (all in thousands of dollars). Then someone builds a mansion on the street worth 1000 (thousand). What is the mean price of all six houses, in thousands?', 350, {
      h: ['Add all six prices.', 'Divide by 6.'],
      s: '200 + 210 + 220 + 230 + 240 = 1100. Add the mansion: 2100. Then 2100 ÷ 6 = 350.',
      w: [['220', 'That was the median of the original five houses. Add all six prices and divide by 6.']],
    }),
    num('t2', 'Same six houses (200, 210, 220, 230, 240, 1000 thousand). What is the median price, in thousands? Then think: which number, the mean or the median, describes a "typical" house on that street?', 225, {
      h: ['Sort the six prices. The mansion goes at the end.', 'Six values, so average the 3rd and 4th.'],
      s: 'The 3rd and 4th prices are 220 and 230, so the median is 225. No house costs anywhere near 350: the mansion dragged the mean up. The median describes a typical house much better.',
      w: [['350', 'That is the mean. The median is the middle of the sorted list.']],
    }),
  ],

  learn: [
    p('An <b>outlier</b> is a value that sits far away from the rest of the data. A mansion on a street of ordinary houses, a 3-minute lap in a race of 60-second laps, a typo that gives 450 instead of 45: all outliers.'),
    widget('dataPlot', { data: [4, 5, 5, 6, 6, 7, 8], lo: 0, hi: 30, extra: 28, addable: true }),
    p('In the picture, add the extra value and slide it all the way to 28. The mean races toward it. The median hardly moves. That is the whole story of this lesson.'),
    rule('<b>The mean is pulled by outliers; the median is not.</b> The mean uses the size of every value. The median only cares about the order. So for lopsided data with an extreme value, the median is the better description of "typical".'),
    ex('Seeing the pull', ['Salaries (thousands): 30, 32, 35, 36, 37 and a boss at 250.', 'Mean: (30 + 32 + 35 + 36 + 37 + 250) ÷ 6 = 420 ÷ 6 = 70.', 'Median: the middle two of the sorted list are 35 and 36, so 35.5.', 'Nobody except the boss earns anything near 70. The mean is a "fair share" of the payroll, not a typical paycheck.']),
    p('The mean is still the right tool when you really do want the fair share: splitting a bill, finding total cost, predicting the total of many items. The median is better to describe a typical individual in skewed data. The <b>mode</b> is best for "which one is most popular?", like which shoe size to stock.'),
    tbl(['Situation', 'Best choice', 'Why'], [['Typical house price with one mansion', 'Median', 'Ignores the extreme value'], ['Which shoe size to order most of', 'Mode', 'Most common size'], ['Share a pizza bill evenly', 'Mean', 'Fair share of the total'], ['How uneven are the temperatures', 'Range', 'Greatest minus least']], 'Choosing the right statistic'),
    warn('<b>Watch out for "average".</b> In a news story "the average" could mean mean, median or mode, and whoever wrote it picked the one that supports their point. A company saying "average pay is 70 thousand" (mean) and a worker saying "typical pay is 35 thousand" (median) can both be telling the truth.'),
    p('Another trap: you cannot average averages carelessly. If you drive 60 miles at 30 mph and then 60 miles back at 60 mph, your average speed is <i>not</i> 45 mph, because you spent more time driving slowly. Always go back to totals: total distance ÷ total time.'),
    mcq('A town reports: "The average income rose from 40 to 55 thousand, so everyone is richer." Which is the best reply?', ['It is true: if the mean rose, every person gained.', 'A single very rich newcomer could lift the mean while most people earn the same. We would need the median, or the data.', 'The mean can never go up.'], 1, 'Rises in the mean can come from an outlier. Everyone could be flat while one person earns a fortune. The median would reveal what a typical person earns.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Which value is the outlier? Data: 4, 5, 5, 6, 40.', 40, {
      h: ['Which number is far away from the others?'],
      s: 'Four values are between 4 and 6, and 40 is far from all of them.',
      w: [['4', 'The smallest is not automatically the outlier. 4 is right next to 5 and 6.']],
    }),
    num('p2', 'Find the mean of 4, 5, 5, 6 and 40.', 12, {
      h: ['Add and divide by 5.'],
      s: '4 + 5 + 5 + 6 + 40 = 60 and 60 ÷ 5 = 12. Notice that 12 is bigger than four of the five values!',
      w: [['5', 'That is the median or mode. The mean adds all values and divides by 5.']],
    }),
    num('p3', 'Find the median of 4, 5, 5, 6 and 40.', 5, {
      h: ['The list is already sorted. Which one is in the middle?'],
      s: 'The middle of five values is the 3rd one: 5. Compare with the mean of 12: the outlier barely affected the median.',
      w: [['12', 'That is the mean, which the 40 pulled up. The median is the 3rd value in sorted order.']],
    }),
    mc('p4', 'A company has 9 employees paid about 30 thousand and an owner paid 400 thousand. To make the pay look great to a job applicant, which "average" would a recruiter quote?', ['The median', 'The mean', 'The mode', 'The range'], 1, {
      h: ['Which average does the owner\'s huge pay drag upward?'],
      s: 'The mean (about 67) is pulled way up by the owner. The median and mode are about 30. A recruiter who wants a big number quotes the mean.',
      w: [[0, 'The median stays near 30, since it ignores how large the owner\'s pay is. It would look less impressive.'], [3, 'The range is huge, but it is not an "average" of anything.']],
    }),
    num('p5', 'Scores: 70, 72, 75, 78 and 5 (someone left the quiz early). What is the mean of just the four real scores?', 73.75, {
      h: ['Leave out the 5.', 'Add 70 + 72 + 75 + 78, then divide by 4.'],
      s: '70 + 72 + 75 + 78 = 295. And 295 ÷ 4 = 73.75.',
      w: [['60', 'That includes the 5, which drags the mean way down. Leave the outlier out.']],
    }),
    num('p6', 'The values 10, 12, 14 and 16 are on a list. A fifth value x is added, and now the mean of the five values is 20. What is x?', 48, {
      h: ['Five values with mean 20 have a total of...?', 'The first four add to 52.'],
      s: '5 × 20 = 100. The first four total 52. So x = 100 − 52 = 48.',
      w: [['20', 'The new value must be much larger than 20 to pull the mean up from 13 to 20. Use totals.']],
    }),
    num('p7', 'Five families each have a whole number of children (zero is allowed). The mean is 3 children and the median is 2. What is the greatest number of children any one family could have?', 11, {
      h: ['The five numbers total 15. To make one huge, make the others as small as possible.', 'With a median of 2, the middle one is 2, and the two after it are at least 2.'],
      s: 'Sorted a ≤ b ≤ c ≤ d ≤ e with total 15 and c = 2. To make e biggest, take a = b = 0 and d = 2 (it cannot be less than c). Then e = 15 − 0 − 0 − 2 − 2 = 11.',
      w: [['13', 'That would make d = 0, which is impossible since d must be at least the median, 2.'], ['15', 'The other four families cannot all have 0, because the median must be 2.']],
    }),
  ],

  challenge: [
    chain('Pocket money', 'Ten students report their weekly pocket money (dollars): 5, 6, 6, 7, 7, 8, 8, 9, 9 and 35.', [
      num('c1a', 'What is the mean?', 10, { h: ['The total of the nine small values is 65.'], s: '65 + 35 = 100. And 100 ÷ 10 = 10.' }),
      num('c1b', 'What is the median?', 7.5, { h: ['Average the 5th and 6th values.'], s: 'The 5th and 6th values are 7 and 8, so the median is 7.5.' }),
      num('c1c', 'How many of the ten students have less than the mean?', 9, { h: ['Compare each value to 10.'], s: 'Only the 35 is above 10. The other nine are all below the mean of 10.', w: [['1', 'That is how many are above the mean. Nine are below.']] }),
    ], 'The idea: the mean was above nine of the ten students, so it does not describe a typical student. When one outlier shifts the mean this much, the median is more honest.'),
    chain('The round trip', 'A truck drives 120 miles to a town at 40 mph, then drives the same 120 miles back at 60 mph.', [
      num('c2a', 'How many hours does the trip there take?', 3, { h: ['Time = distance ÷ speed.'], s: '120 ÷ 40 = 3 hours.' }),
      num('c2b', 'How many hours does the trip back take?', 2, { h: ['Same idea with the faster speed.'], s: '120 ÷ 60 = 2 hours.' }),
      num('c2c', 'What is the truck\'s average speed for the whole round trip, in mph?', 48, { h: ['Average speed = total distance ÷ total time.'], s: 'Total distance 240 miles, total time 5 hours: 240 ÷ 5 = 48 mph.', w: [['50', 'That is the mean of 40 and 60. But the truck spent more time at the slower speed, so the true average is lower. Use total distance ÷ total time.']] }),
    ], 'The idea: when a rate holds for different lengths of time, you cannot just average the rates. Go back to totals.'),
    mc('c3', 'Find the error. A newspaper says: "The mean home price in Oakdale rose from 300 thousand to 350 thousand, so every Oakdale home became more valuable." What is wrong with that conclusion?', ['Nothing, if the mean went up then every value went up.', 'One expensive new home (an outlier) could raise the mean while the other homes stayed exactly the same price.', 'The mean can only rise if the median rises.', 'Home prices cannot have a mean.'], 1, {
      s: 'Suppose 9 homes stay at 300 and a single new 800 home is added... the mean moves up without any home gaining value. The mean alone cannot prove what happened to each home.',
      w: [[0, 'A rise in the mean tells you about the total, not about every individual value.'], [2, 'The median can stay completely put while the mean climbs; that is what outliers do.']],
    }),
  ],

  quiz: [
    tpl('meanout', (r) => {
      const k = r.int(4, 6), a = Array.from({ length: k }, () => r.int(8, 20));
      a[k - 1] += (k - (sum(a) % k)) % k;
      let o = r.int(60, 150); o += ((k + 1) - ((sum(a) + o) % (k + 1))) % (k + 1);
      const all = r.shuffle(a.concat([o])), m = (sum(a) + o) / (k + 1);
      return N('Weekly savings (dollars) of ' + (k + 1) + ' students: ' + all.join(', ') + '. What is the mean?', m, { s: 'The total is ' + (sum(a) + o) + ', and ' + (sum(a) + o) + ' ÷ ' + (k + 1) + ' = ' + m + '.', w: W(m, [[sortedNums(a)[Math.floor(k / 2)], 'That is close to a median, not the mean. Add everything and divide by ' + (k + 1) + '.']]) });
    }),
    tpl('medout', (r) => {
      const k = r.pick([4, 6]), a = r.distinct(k, 8, 30), o = r.int(90, 200), all = r.shuffle(a.concat([o])), s = sortedNums(all), med = s[(s.length - 1) / 2];
      return N('Here are ' + (k + 1) + ' commute times in minutes: ' + all.join(', ') + '. What is the median?', med, { s: 'Sorted: ' + s.join(', ') + '. The middle one is ' + med + '.', w: W(med, [[Math.round(sum(all) / all.length), 'That is near the mean, which the large value pulls up. The median is the middle of the sorted list.']]) });
    }),
    tpl('drop', (r) => {
      const k = r.int(4, 6), a = Array.from({ length: k }, () => r.int(10, 25));
      a[k - 1] += (k - (sum(a) % k)) % k;
      let o = r.int(60, 160); o += ((k + 1) - ((sum(a) + o) % (k + 1))) % (k + 1);
      const m1 = (sum(a) + o) / (k + 1), m0 = sum(a) / k, d = m1 - m0;
      return N('The mean of ' + k + ' values is ' + m0 + '. Then an outlier of ' + o + ' joins the list. By how much does the mean go up?', d, { s: 'New mean: (' + k + ' × ' + m0 + ' + ' + o + ') ÷ ' + (k + 1) + ' = ' + m1 + '. Change: ' + m1 + ' − ' + m0 + ' = ' + d + '.', w: W(d, [[o - m0, 'That is how far the outlier is from the old mean. The mean moves only a share of that, divided among all the values.']]) });
    }),
    tpl('which', (r) => {
      const scen = [
        ['Ten houses in a street cost about the same, but one mansion costs far more. Which statistic best shows a typical house price?', 'Median', ['Mean', 'Range']],
        ['A shoe shop wants to know which size to stock the most of. Which statistic helps most?', 'Mode', ['Mean', 'Range']],
        ['Four friends pool their money and want to share it exactly equally. Which statistic tells each friend\'s share?', 'Mean', ['Mode', 'Range']],
        ['A weather reporter wants to say how far apart the hottest and coldest days of the week were. Which statistic is that?', 'Range', ['Mean', 'Mode']],
        ['A class has one student who scored 0 because they were absent. Which statistic is least affected by that 0?', 'Median', ['Mean', 'Range']],
      ];
      const [q, right, wr] = r.pick(scen), n = r.int(5, 12), v = r.int(20, 90);
      return choice(r, name(r) + ' collected ' + n + ' data values around ' + v + ' for a project. ' + q, right, wr, { s: right + ' is the statistic that answers this kind of question.' });
    }),
    tpl('speed', (r) => {
      const pairs = [[20, 30], [30, 60], [40, 60], [60, 90], [30, 45], [60, 120], [50, 75], [40, 120]];
      const [a, b] = r.pick(pairs), L = a * b / (function g(x, y) { return y ? g(y, x % y) : x; })(a, b), d = L * r.int(1, 3);
      const avg = 2 * d / (d / a + d / b);
      return N(name(r) + ' bikes ' + d + ' km out at ' + a + ' km/h and the same ' + d + ' km back at ' + b + ' km/h. What is the average speed for the whole round trip, in km/h?', avg, { s: 'Time out: ' + d / a + ' h. Time back: ' + d / b + ' h. Distance ' + 2 * d + ' km in ' + (d / a + d / b) + ' h: ' + avg + ' km/h.', w: W(avg, [[(a + b) / 2, 'That averages the two speeds, which ignores that more time was spent going slowly. Use total distance ÷ total time.']]) });
    }),
    tpl('change', (r) => {
      const n = r.int(4, 9), m = r.int(20, 60), k = r.int(1, 5), u = r.int(5, 40), v = u + k * n;
      return N('The mean of ' + n + ' numbers is ' + m + '. One of them, ' + u + ', is changed to ' + v + '. What is the new mean?', m + k, { s: 'The total grows by ' + (v - u) + '. Shared among ' + n + ' numbers that is ' + k + ' more each: ' + (m + k) + '.', w: W(m + k, [[m + v - u, 'The whole total grew by ' + (v - u) + ', but it is shared among ' + n + ' values. Divide the change by ' + n + '.']]) });
    }),
    tpl('addmed', (r) => {
      const n = r.pick([5, 7, 9]), a = r.distinct(n, 10, 60), s = sortedNums(a), o = r.int(200, 400), x = s[(n - 1) / 2], y = s[(n + 1) / 2], med = (x + y) / 2;
      return N('A list is ' + a.join(', ') + '. Then a huge value, ' + o + ', is added to it. What is the new median?', med, { s: 'Now there are ' + (n + 1) + ' values and ' + o + ' is the largest. The middle two of the sorted list are ' + x + ' and ' + y + ', so the median is ' + med + '.', w: W(med, [[x, 'There are now an even number of values, so average the two middle ones.']]) });
    }),
    tpl('find', (r) => {
      const k = r.int(5, 8), a = r.distinct(k, 20, 45), o = r.pick([r.int(90, 150), r.int(1, 5)]), all = r.shuffle(a.concat([o]));
      return N('One value in this list is an outlier: ' + all.join(', ') + '. What is it?', o, { s: 'Every other number is between 20 and 45, and ' + o + ' is far from them.', w: W(o, [[Math.max(...a), 'That value fits in with the rest. Look for the one that is far from all the others.']]) });
    }),
  ],
});
