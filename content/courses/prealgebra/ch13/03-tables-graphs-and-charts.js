import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const sum = (a) => a.reduce((x, y) => x + y, 0);
const FRUIT = ['apples', 'pears', 'plums', 'oranges', 'bananas', 'peaches', 'melons'];

export default lesson({
  id: 'pre-13-3-tables-graphs-and-charts',
  title: 'Tables, graphs and charts',
  blurb: 'Read bar graphs, line graphs, pie charts and frequency tables, and spot graphs that bend the truth.',
  concepts: ['tables', 'bar-graph', 'line-graph', 'pie-chart', 'frequency-table'],

  tryFirst: [
    num('t1', 'Forty students voted for a favorite pet: dog 16, cat 12, fish 8, other 4. A pie chart is drawn for the vote. How many degrees is the "dog" slice?', 144, {
      h: ['A whole pie is 360 degrees. What fraction of the students chose dog?', 'Take that fraction of 360.'],
      s: 'Dog is 16 out of 40, which is {2/5} of the votes. {2/5} of 360 is 144 degrees.',
      w: [['16', 'That is the number of students. A slice is measured in degrees: take the same fraction of 360.']],
    }),
    num('t2', 'A plant is measured every day. Day 0: 4 cm. Day 1: 7 cm. Day 2: 10 cm. Day 3: 13 cm. If the pattern in the table keeps going, how tall is it on day 10?', 34, {
      h: ['How much does the plant gain each day?', 'Start from 4 and add that gain 10 times.'],
      s: 'It grows 3 cm each day. After 10 days it has gained 30 cm, so 4 + 30 = 34 cm.',
      w: [['30', 'That is how much it grew. It started at 4 cm, so add that.'], ['37', 'Day 11 would be 37. Day 0 is the start, so day 10 has only 10 days of growth.']],
    }),
  ],

  learn: [
    p('Numbers become easier to understand when we organize them. A <b>table</b> lists values exactly. A graph or chart turns them into a picture so patterns jump out. Each kind has a job, and choosing the right one is half of understanding data.'),
    def('frequency', 'How many times a value occurs in the data. A <b>frequency table</b> lists each value next to its frequency, which gives a compact way to hold a long list.'),
    tbl(['Kind', 'Best for', 'How to read it'], [['Bar graph', 'Comparing separate categories', 'Taller bar means a bigger count'], ['Line graph', 'Change over time', 'Slope up means rising, flat means steady'], ['Pie chart', 'Parts of a whole', 'Slice size = share of the 360° circle'], ['Dot plot / frequency table', 'How often each value occurs', 'Count the dots or read the frequency']], 'Choosing a picture'),
    formula('Pie chart slice', 'angle = (k ÷ N) × 360°', 'k is the size of the group and N is the total. The slices of a pie always add to 360° and the percentages to 100%.'),
    rule('<b>Parts of a whole add to the whole.</b> Pie slices add to 360°, percentages add to 100%, and the frequencies in a table add to the number of items.'),
    ex('Reading a pie chart', ['A budget of 480 dollars has a slice of 90°.', '90° out of 360° is {1/4} of the circle.', 'So that category got {1/4} of 480 = 120 dollars.']),
    ex('Drawing a pie slice', ['In a poll of 24 students, 9 chose soccer. How many degrees is the soccer slice?', 'The share is 9 ÷ 24 = {3/8}.', '{3/8} of 360° = 135°. As a percentage, that is 37.5% of the circle.']),
    p('<b>Line graphs</b> show how a quantity changes over time. Each point is a reading, and the line joins neighbors. A steep rise means fast growth and a flat stretch means no change. For readings 8, 10, 15, 14, 19, the changes between neighbors are +2, +5, −1, +5, so the greatest rise is 5.'),
    tbl(['Pets at home', 'Students'], [['0', '5'], ['1', '8'], ['2', '4'], ['3', '3']], 'Frequency table for 20 students'),
    ex('Mean, median and mode from a frequency table', ['Total students: 5 + 8 + 4 + 3 = 20.', 'Total pets: 0×5 + 1×8 + 2×4 + 3×3 = 0 + 8 + 8 + 9 = 25.', 'Mean = 25 ÷ 20 = 1.25 pets per student.', 'The mode is 1 (the biggest frequency). The median is the average of the 10th and 11th students: both have 1, so the median is 1.']),
    widget('dataPlot', { data: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3], addable: false, lo: 0, hi: 4 }),
    p('This dot plot is the same data as the frequency table. Every dot is one student. The yellow triangle is the mean you just computed.'),
    def('two-way table', 'A table with rows for one category and columns for another, so that each group can be counted in two ways at once. The row totals and column totals both add to the grand total.'),
    ex('Filling a two-way table', ['A class has 30 students: 17 girls and 13 boys. 20 ride the bus, and 9 of the riders are girls. How many boys do not ride the bus?', 'Boys who ride: 20 − 9 = 11.', 'Boys who do not ride: 13 − 11 = 2.', 'Check the grid: girls who ride 9, girls who walk 8, boys who ride 11, boys who walk 2. The four add to 30.']),
    warn('<b>Graphs can mislead.</b> If the vertical axis of a bar graph starts at 90 instead of 0, bars for 95 and 100 look like heights 5 and 10: one bar looks twice as big, but the real difference is about 5%. Always check where the axis starts and what each step means.'),
    tip('<b>Read a graph in four steps.</b> Title (what is shown), axis labels and units (what each direction means), scale (where it starts and how big each step is), then the data. Many mistakes come from skipping straight to the data.'),
    tip('<b>Sanity checks.</b> Pie slices must add to 360° and a frequency table must add to the number of items. If the frequencies do not total the count you expected, a row is missing or miscounted.'),
    key('A good chart shows the data <b>honestly</b>. Bars start at zero, steps are even, and the picture matches the numbers. Whenever a picture seems dramatic, go back to the actual values.'),
    mcq('A bar graph\'s axis begins at 50. One bar reads 60 and another reads 80. Maya says: "The second bar is three times as tall as the first on the page, so the real value is three times as big." What is the mistake?', ['None, she is right.', 'The axis is cut off at 50, so the drawn heights are 10 and 30 (three times as tall), but the real values 60 and 80 differ by only a third. The picture exaggerates.', 'The values cannot be compared on a bar graph.'], 1, 'Drawn heights are 60 − 50 = 10 and 80 − 50 = 30: the bar looks 3 times as tall. The real values compare as 80 to 60, which is only {4/3}. Cutting off the axis exaggerates differences.', 'Spot the mistake'),
    recap([['frequency', 'how many times a value occurs'], ['pie chart', 'parts of a whole, 360° in total'], ['line graph', 'change over time'], ['two-way table', 'counts by two categories at once']], [['Pie slice angle', '(k ÷ N) × 360°'], ['Mean from frequencies', 'sum of (value × frequency) ÷ total count']]),
  ],

  practice: [
    num('p1', 'Monthly sales were: Jan 12, Feb 18, Mar 15, Apr 21, May 9. What were the total sales for the five months?', 75, {
      h: ['Add all five.'],
      s: '12 + 18 + 15 + 21 + 9 = 75.',
      w: [['21', 'That is the best month. The question asks for the total of all five.']],
    }),
    num('p2', 'In a survey of 60 students, 15 chose pizza. How many degrees should the pizza slice have in a pie chart?', 90, {
      h: ['What fraction of 60 is 15?', 'Take that fraction of 360.'],
      s: '15 ÷ 60 = {1/4}, and {1/4} of 360 is 90 degrees.',
      w: [['25', 'That is the percent. Degrees come from the fraction of 360.'], ['15', 'That is the count. Convert the share to an angle out of 360.']],
    }),
    num('p3', 'Temperatures: 6 am 52°, 9 am 58°, noon 66°, 3 pm 71°, 6 pm 64°. Between two consecutive readings, what was the greatest rise?', 8, {
      h: ['Find the change for each pair of neighbors.', 'Falls do not count as rises.'],
      s: 'Changes: +6, +8, +5, −7. The biggest rise is 8 degrees (9 am to noon).',
      w: [['19', 'That is the rise from the first to the last-but-one reading. The question asks about neighbors only.'], ['7', 'That is a fall (71 to 64), not a rise.']],
    }),
    num('p4', 'Goals scored per game: 0 goals in 3 games, 1 goal in 4 games, 2 goals in 2 games, 3 goals in 1 game. What is the mean number of goals per game?', 1.1, {
      h: ['First total the goals: 0×3 + 1×4 + ...', 'Then divide by the number of games.'],
      s: 'Games: 3 + 4 + 2 + 1 = 10. Goals: 0 + 4 + 4 + 3 = 11. Mean = 11 ÷ 10 = 1.1.',
      w: [['1.5', 'That averages the four goal values 0, 1, 2, 3 and ignores how often each happened.'], ['11', 'That is the total goals. Divide by the 10 games.']],
    }),
    num('p5', 'A bar graph\'s vertical axis starts at 90. Bar A is for 95 and bar B is for 100. As drawn, how many times as tall as bar A is bar B?', 2, {
      h: ['The drawn height is measured from the start of the axis.', 'Bar A is 5 above the start and bar B is...?'],
      s: 'Bar A is drawn 95 − 90 = 5 tall and bar B is 100 − 90 = 10 tall. B looks twice as tall, though the real sales differ by about 5%.',
      w: [['1.05', 'That is the true ratio of 100 to 95. The question asks how it looks on the graph, measuring from 90.']],
    }),
    num('p6', 'A class has 50 students, 30 of them girls. 22 students ride the bus, and 14 of the bus riders are girls. How many boys do not ride the bus?', 12, {
      h: ['How many boys are there? How many boys ride the bus?', 'Subtract.'],
      s: 'Boys: 50 − 30 = 20. Boys on the bus: 22 − 14 = 8. Boys not on the bus: 20 − 8 = 12.',
      w: [['28', 'That is the number of students not riding the bus (50 − 22). The question asks only about boys.'], ['8', 'That is the boys who do ride the bus.']],
    }),
    num('p7', 'A pie chart has three slices: A, B and C. Slice C is 120°. Slice B is three times as big as slice A. How many degrees is slice A?', 60, {
      h: ['How many degrees are left for A and B together?', 'Slices A and B split that in a 1 : 3 ratio, so A is one of four equal parts.'],
      s: '360 − 120 = 240 degrees for A and B. A is 1 part and B is 3 parts, 4 parts in all, so each part is 240 ÷ 4 = 60. A = 60°.',
      w: [['80', 'That would split the 240 into 3 parts. A and B together are 1 + 3 = 4 parts.'], ['90', 'Check: A = 90 would make B = 270, too big. A + B must be 240.']],
    }),
  ],

  challenge: [
    chain('Siblings survey', 'Thirty students were asked how many siblings they have. The frequency table: 0 siblings: 6 students, 1 sibling: 12 students, 2 siblings: ?, 3 siblings: 4 students.', [
      num('c1a', 'How many students have 2 siblings?', 8, { h: ['The four counts must total 30.'], s: '6 + 12 + 4 = 22, so 30 − 22 = 8.' }),
      num('c1b', 'What is the mean number of siblings?', '4/3', { h: ['Total siblings: 0×6 + 1×12 + 2×8 + 3×4.'], s: '0 + 12 + 16 + 12 = 40 siblings, and 40 ÷ 30 = {4/3}.', w: [['1.5', 'That averages the four sibling counts and forgets that some counts happen to more students. Total the siblings and divide by 30.']] }),
      num('c1c', 'What is the median number of siblings?', 1, { h: ['With 30 students, the median is between the 15th and 16th, in order.', 'The first 6 students have 0; the next 12 have 1, so students 7 to 18 have 1.'], s: 'Students 7 through 18 all have 1 sibling, so the 15th and 16th both have 1. The median is 1.' }),
    ], 'The idea: a frequency table is a long sorted list in disguise. Count down to the middle position, or multiply value × frequency to total.'),
    chain('The budget pie', 'A family spends 720 dollars a month: rent 50%, food 25%, fun 15%, and the rest is savings.', [
      num('c2a', 'What percent is savings?', 10, { h: ['The percents add to 100.'], s: '100 − 50 − 25 − 15 = 10.' }),
      num('c2b', 'How many dollars go to food?', 180, { h: ['25% is one quarter.'], s: '720 ÷ 4 = 180.' }),
      num('c2c', 'In a pie chart, how many degrees together do the rent and food slices cover?', 270, { h: ['Rent plus food is what percent?', '75% of 360.'], s: '50% + 25% = 75%, and 75% of 360° = 270°. (That is three quarters of the circle.)', w: [['75', 'That is the percent. The question asks for degrees out of 360.']] }),
    ], 'The idea: percent, fraction and angle are three names for the same share. Percent × 360 gives the angle; percent × total gives the amount.'),
    mc('c3', 'Find the error. A store posts a bar graph where the vertical axis starts at 80. Its sales bar is 3 times as tall as last year\'s. The caption says: "Our sales tripled!" Sales were 83 last year and 89 this year. What is wrong?', ['The drawn heights are 3 and 9, but real sales rose only from 83 to 89, about 7%. The cut axis exaggerates the change.', 'Nothing, tripled bars mean tripled sales.', 'Bar graphs must always start at 100.', 'The sales must have fallen.'], 0, {
      s: 'Heights drawn: 83 − 80 = 3 and 89 − 80 = 9. The bar looks 3 times as tall, but 89 is only a little more than 83.',
      w: [[1, 'Bar height is only proportional to value when the axis starts at 0. Here it starts at 80.'], [2, 'Axes should start at 0 for bar graphs, but 100 is not special.']],
    }),
  ],

  quiz: [
    tpl('pie', (r) => {
      const N0 = r.pick([20, 24, 30, 36, 40, 45, 60, 72, 90]), k = r.int(2, Math.floor(N0 / 2)), d = k * 360 / N0, what = r.pick(['chose soccer', 'walk to school', 'prefer tea', 'own a bike', 'like math best']);
      return N('Of ' + N0 + ' students surveyed, ' + k + ' ' + what + '. In a pie chart, how many degrees is that slice?', d, { s: k + '/' + N0 + ' of 360° = ' + d + '°.', w: W(d, [[k, 'That is the count. Convert the fraction ' + k + '/' + N0 + ' into degrees out of 360.']]) });
    }),
    tpl('pieback', (r) => {
      const N0 = r.pick([20, 24, 30, 36, 40, 45, 60, 72, 90]), k = r.int(2, Math.floor(N0 / 2)), d = k * 360 / N0;
      return N('A pie chart shows how ' + N0 + ' people answered a poll. The slice for "yes" is ' + d + '°. How many people said yes?', k, { s: d + '° is ' + d + '/360 of the circle, and that fraction of ' + N0 + ' is ' + k + '.', w: W(k, [[d, 'That is the angle. Find what fraction of the circle it is and take that fraction of ' + N0 + '.']]) });
    }),
    tpl('freqmean', (r) => {
      const T = r.pick([10, 20, 25, 40, 50]);
      const c0 = r.int(1, Math.floor(T / 4)), c1 = r.int(1, Math.floor(T / 3)), c2 = r.int(1, Math.floor(T / 3)), c3 = T - c0 - c1 - c2, cs = [c0, c1, c2, c3];
      if (c3 < 1) return N('How many values are in a list of ' + T + ' values?', T, { s: 'It says ' + T + '.' });
      const tot = cs.reduce((a, c, i) => a + c * i, 0), mean = tot / T;
      return N('Frequency table of books read last month: 0 books: ' + c0 + ' students, 1 book: ' + c1 + ' students, 2 books: ' + c2 + ' students, 3 books: ' + c3 + ' students. What is the mean number of books per student?', mean, { s: 'Students: ' + T + '. Books: 0×' + c0 + ' + 1×' + c1 + ' + 2×' + c2 + ' + 3×' + c3 + ' = ' + tot + '. Mean: ' + tot + ' ÷ ' + T + ' = ' + mean + '.', w: W(mean, [[1.5, 'That averages 0, 1, 2 and 3 as if each happened equally often. Weight each value by its frequency.'], [tot, 'That is the total number of books. Divide by the number of students.']]) });
    }),
    tpl('freqmed', (r) => {
      const T = r.pick([15, 16, 20, 21, 24, 25]), a = r.int(2, Math.floor(T / 3)), b = r.int(2, Math.floor(T / 3)), c = r.int(2, Math.floor(T / 3)), d = T - a - b - c;
      if (d < 1) return N('How many students are surveyed if ' + T + ' are?', T, { s: T + '.' });
      const cs = [a, b, c, d], list = []; cs.forEach((k, i) => { for (let j = 0; j < k; j++) list.push(i + 1); });
      const med = T % 2 ? list[(T - 1) / 2] : (list[T / 2 - 1] + list[T / 2]) / 2;
      return N('A class rated a movie from 1 to 4 stars. Frequencies: 1 star: ' + a + ', 2 stars: ' + b + ', 3 stars: ' + c + ', 4 stars: ' + d + '. What is the median rating?', med, { s: 'There are ' + T + ' ratings. Counting through the sorted list the ' + (T % 2 ? 'middle one' : 'middle two') + ' give a median of ' + med + '.', w: W(med, [[2.5, 'That is the median of the four rating values 1, 2, 3, 4 themselves. Count through the sorted ratings using the frequencies.']]) });
    }),
    tpl('rise', (r) => {
      const t = [r.int(40, 55)]; for (let i = 0; i < 5; i++) t.push(t[i] + r.int(-6, 9));
      const ch = t.slice(1).map((v, i) => v - t[i]), best = Math.max(...ch);
      return N('A line graph of hourly temperatures (°F) has the readings ' + t.join(', ') + '. What is the largest rise between two neighboring readings? (If there is no rise, give the smallest fall as 0 or less.)', best, { s: 'Changes: ' + ch.map((c) => (c < 0 ? '−' + Math.abs(c) : '+' + c)).join(', ') + '. The largest is ' + best + '.', w: W(best, [[Math.max(...t) - Math.min(...t), 'That compares the highest and lowest readings, which may not be neighbors. Look only at consecutive pairs.']]) });
    }),
    tpl('twoway', (r) => {
      const T = r.int(30, 80), g = r.int(Math.floor(T / 3), Math.floor(T / 2)), boys = T - g, bb = r.int(1, boys - 1), gb = r.int(1, g - 1), bus = bb + gb;
      return N('A class has ' + T + ' students, ' + g + ' of them girls. ' + bus + ' students ride the bus, and ' + gb + ' of those riders are girls. How many boys do not ride the bus?', boys - bb, { s: 'Boys: ' + T + ' − ' + g + ' = ' + boys + '. Boys on the bus: ' + bus + ' − ' + gb + ' = ' + bb + '. Boys walking: ' + boys + ' − ' + bb + ' = ' + (boys - bb) + '.', w: W(boys - bb, [[T - bus, 'That counts everyone who does not ride, boys and girls. Only boys are asked about.'], [bb, 'That is the boys who do ride the bus.']]) });
    }),
    tpl('axis', (r) => {
      const B = r.int(20, 90), h1 = r.int(1, 4), k = r.int(2, 5), a = B + h1, b = B + h1 * k, f = r.pick(['sales', 'votes', 'visitors']);
      return N('A bar graph of ' + f + ' has a vertical axis that starts at ' + B + ' instead of 0. One bar shows ' + a + ' and another shows ' + b + '. As drawn, how many times as tall is the second bar as the first?', k, { s: 'Drawn heights: ' + a + ' − ' + B + ' = ' + h1 + ' and ' + b + ' − ' + B + ' = ' + h1 * k + '. Ratio: ' + k + '.' });
    }),
    tpl('scale', (r) => {
      const k = r.pick([5, 10, 20, 25, 50]), a = r.int(4, 12), b = r.int(1, a - 1), [f, g] = r.distinct(2, 0, FRUIT.length - 1).map((i) => FRUIT[i]);
      return N('In a bar graph each square of bar length stands for ' + k + ' fruits. The bar for ' + f + ' is ' + a + ' squares long and the bar for ' + g + ' is ' + b + ' squares long. How many more ' + f + ' than ' + g + ' are there?', k * (a - b), { s: (a - b) + ' squares more, and each square is ' + k + ', so ' + k * (a - b) + '.', w: W(k * (a - b), [[a - b, 'That is the difference in squares. Each square stands for ' + k + ' fruits.']]) });
    }),
  ],
});
