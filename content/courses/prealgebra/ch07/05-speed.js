import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);

export default lesson({
  id: 'pre-7-5-speed',
  title: 'Speed, distance, and time',
  blurb: 'distance = speed × time in all three forms, average speed over a whole trip, and speeds that meet or catch up.',
  concepts: ['speed', 'rate', 'average-speed'],

  tryFirst: [
    num('t1', 'A GO train travels at 90 km/h for 2 hours. How many kilometres does it cover?', 180, {
      h: ['90 km each hour, for 2 hours.'], s: '90 × 2 = 180 km.',
      w: [['45', 'That divides. Each hour adds another 90 km, so multiply.']],
    }),
    num('t2', 'A cyclist rides 36 km in the first 3 hours and then 24 km in the next 1 hour. What is her average speed over the whole ride, in km/h?', 15, {
      h: ['Add the distances and add the times.'], s: 'Total distance 60 km, total time 4 hours. 60 ÷ 4 = 15 km/h.',
      w: [['18', 'That is the average of 12 and 24. The slower speed lasted longer, so it counts for more.'], ['12', 'That is the speed of the first part only. Use the whole trip.']],
    }),
  ],

  learn: [
    p('<b>Speed</b> is a rate: how far you go in one unit of time. 60 km/h means 60 km each hour. Distance, speed, and time are tied together by a single idea.'),
    def('speed', 'The distance travelled per unit of time: speed = distance ÷ time. It is a rate, and its unit is a distance unit over a time unit, such as km/h or m/s.'),
    def('average speed', 'The total distance divided by the total time, for the whole trip. It is the one constant speed that would cover the same distance in the same time.'),
    widget('rateModel', { r: 60, t: 3, per: 'hour', what: 'km' }),
    formula('Distance, speed, time', 'd = s × t', 'd is distance, s is speed, t is time. Rearranged: s = d ÷ t and t = d ÷ s. The units must agree: km/h goes with hours, m/s goes with seconds.'),
    rule('<b>distance = speed × time.</b> Rearranged: speed = distance ÷ time, and time = distance ÷ speed. The units must agree: km/h with hours, m/s with seconds.'),
    ex('Finding speed', ['A runner covers 400 m in 50 s. What is her speed in m/s, and in km/h?', 'Speed = 400 ÷ 50 = 8 m/s.', 'In one hour there are 3600 s, so she would cover 8 × 3600 = 28 800 m = 28.8 km.', 'So 8 m/s = 28.8 km/h.']),
    ex('Finding time', ['A bike path is 40 km long. Dev cycles at 16 km/h. How long does he take?', 'time = distance ÷ speed = 40 ÷ 16 = 2.5 hours.', '2.5 hours is 2 hours 30 minutes.']),
    rule('<b>Average speed = total distance ÷ total time.</b> It is not the average of the speeds. A slow part that lasts longer drags the average down more.'),
    ex('Two halves of a trip', ['Drive 120 km at 60 km/h, then 120 km at 40 km/h. Average speed?', 'First part: 120 ÷ 60 = 2 hours. Second part: 120 ÷ 40 = 3 hours.', 'Total: 240 km in 5 hours = 48 km/h.', 'The average of 60 and 40 would be 50, which is too high: you spent longer going slowly.']),
    ex('Changing km/h to m/s', ['Convert 72 km/h to m/s.', '72 km = 72 000 m. 1 hour = 3600 s.', '72 000 ÷ 3600 = 20 m/s.', 'Shortcut: divide km/h by 3.6 to get m/s.']),
    tbl(['Quantity', 'Common units', 'Convert'], [['speed', 'km/h, m/s, mi/h', 'km/h ÷ 3.6 = m/s;  m/s × 3.6 = km/h'], ['time', 'h, min, s', '15 min = 0.25 h;  45 min = 0.75 h;  20 min = {1/3} h'], ['distance', 'km, m, mi', '1 km = 1000 m']], 'Keep the units in agreement'),
    ex('Catching up', ['Ava leaves at 10 km/h. One hour later Ben leaves and rides 15 km/h along the same road.', 'When Ben starts, Ava is 10 km ahead.', 'Each hour Ben gains 15 − 10 = 5 km, so he closes 10 km in 2 hours.']),
    ex('Moving toward each other', ['Two towns are 120 km apart. Two cars leave at the same time and drive toward each other at 50 km/h and 70 km/h. When do they meet?', 'The gap closes at 50 + 70 = 120 km per hour, because both cars shrink the gap.', 'Time = 120 ÷ 120 = 1 hour.', 'Check: one car travels 50 km and the other 70 km, which together make 120 km.']),
    warn('<b>Watch out.</b> Never average the speeds of two stages unless the stages took the <i>same time</i>. If the stages cover the same <i>distance</i>, the slower speed lasts longer and the true average is lower.'),
    warn('<b>Watch out: decimal hours are not minutes.</b> 2.5 hours means 2 hours 30 minutes, not 2 hours 50 minutes. To change the decimal part of an hour to minutes, multiply it by 60: 0.25 h × 60 = 15 min.'),
    tip('<b>Change the units before you calculate.</b> If speed is in km/h and time is given in minutes, convert minutes to hours first (30 min = 0.5 h). As a quick check, a result in "km/h × h" must come out as km. If the units do not combine to the unit you want, something needs converting.'),
    key('Speed is <b>distance per time</b>. All three questions use one relationship, d = s × t, so write it down and solve for what is missing. For a whole trip, average speed is <b>total distance ÷ total time</b>, never the plain average of the speeds.'),
    mcq('Lia drives to a cabin at 20 km/h and returns the same way at 30 km/h. She says her average speed is 25 km/h. What is wrong?', ['Nothing, (20 + 30) ÷ 2 = 25.', 'She spent more time at the slow speed. With 60 km each way: 3 h + 2 h = 5 h for 120 km, so 24 km/h.', 'The average should be 50 km/h.'], 1, 'Average speed is total distance over total time. The slow leg took longer, so it weighs more.', 'Spot the mistake'),
    recap([['speed', 'distance per unit of time'], ['average speed', 'total distance ÷ total time'], ['closing speed', 'add the speeds when moving toward each other; subtract when chasing in the same direction']], [['Distance', 'd = s × t'], ['Speed', 's = d ÷ t'], ['Time', 't = d ÷ s'], ['km/h to m/s', 'divide by 3.6']]),
  ],

  practice: [
    num('p1', 'A bus moves at 72 km/h for 2.5 hours. How many km does it go?', 180, { h: ['distance = speed × time.'], s: '72 × 2.5 = 180 km.', w: [['28.8', 'You divided 72 by 2.5. Multiply speed by time to get distance.']] }),
    num('p2', 'A train covers 150 km in 2 hours 30 minutes. What is its average speed in km/h?', 60, { h: ['Change 2 h 30 min to hours.'], s: '2 h 30 min = 2.5 h. 150 ÷ 2.5 = 60 km/h.', w: [['75', 'You divided by 2 hours and ignored the 30 minutes. Use 2.5 hours.'], ['50', 'That uses 3 hours. 2 h 30 min is 2.5 hours.']] }),
    num('p3', 'How many hours does it take to cycle 45 km at 18 km/h?', 2.5, { h: ['time = distance ÷ speed.'], s: '45 ÷ 18 = 2.5 hours.', w: [['810', 'That multiplies. To find time, divide distance by speed.']] }),
    num('p4', 'Change 54 km/h to metres per second.', 15, { h: ['54 km = 54 000 m. 1 h = 3600 s.'], s: '54 000 ÷ 3600 = 15 m/s.', w: [['194.4', 'You multiplied by 3.6. Going from km/h to m/s divides by 3.6.']] }),
    num('p5', 'A car drives 60 km at 60 km/h, then 60 km at 30 km/h. What is its average speed for the whole trip, in km/h?', 40, { h: ['Find the time for each part.'], s: '1 h + 2 h = 3 h for 120 km: 40 km/h.', w: [['45', 'That averages the two speeds. The slow part took twice as long, so it counts more.']] }),
    num('p6', 'Ava rides at 12 km/h. One hour after she leaves, Ben starts from the same place and follows at 18 km/h. How many hours after Ben starts does he catch Ava?', 2, {
      h: ['How far ahead is Ava when Ben starts?', 'How much does the gap shrink each hour?'], s: 'The gap is 12 km. Ben gains 6 km each hour. 12 ÷ 6 = 2 hours.',
      w: [['1', 'That is the head start in hours. Ben gains only 6 km per hour on a 12 km gap.'], ['3', 'That is how long Ava has been riding, not how long Ben rides.']],
    }),
    num('p7', 'Two friends are 15 km apart on a straight trail. They walk toward each other, one at 4 km/h and the other at 6 km/h. After how many hours do they meet?', 1.5, { h: ['How fast does the gap close each hour?'], s: 'The gap closes at 4 + 6 = 10 km per hour. 15 ÷ 10 = 1.5 hours.', w: [['3.75', 'You used only one speed. Walking toward each other, the speeds add.'], ['2', 'That uses a combined speed of 7.5. The gap closes at 4 + 6 = 10 km/h.']] }),
  ],

  challenge: [
    chain('Toronto to Ottawa', 'A 450 km drive. The first 3 hours are at 90 km/h. The rest is at 60 km/h.', [
      num('c1a', 'How far is covered in the first 3 hours?', 270, { h: ['distance = speed × time.'], s: '90 × 3 = 270 km.' }),
      num('c1b', 'How many hours does the rest of the drive take?', 3, { h: ['450 − 270 km remain, at 60 km/h.'], s: '180 km ÷ 60 = 3 hours.' }),
      num('c1c', 'What is the average speed for the whole trip, in km/h?', 75, { h: ['Total distance over total time.'], s: '450 km in 6 hours: 75 km/h.' }),
    ], 'The idea: average speed always comes from total distance and total time. The two speeds 90 and 60 average to 75 here only because the two stages lasted equally long.'),
    chain('Two laps', 'A runner does a 240 m stretch twice. The first time at 4 m/s, the second at 12 m/s.', [
      num('c2a', 'How many seconds does the first stretch take?', 60, { h: ['time = distance ÷ speed.'], s: '240 ÷ 4 = 60 s.' }),
      num('c2b', 'How many seconds does the second take?', 20, { h: ['240 ÷ 12.'], s: '240 ÷ 12 = 20 s.' }),
      num('c2c', 'What is the average speed over both stretches, in m/s?', 6, { h: ['Total distance 480 m. Total time is 80 s.'], s: '480 ÷ 80 = 6 m/s, not 8 (the plain average of 4 and 12).' }),
    ], 'The idea: with equal distances, the slow stretch takes longer and pulls the average toward the slow speed.'),
    mc('c3', 'Find the error. Tara bikes 20 km at 10 km/h and then 20 km at 20 km/h. She says: "My average is 15 km/h." Which is right?', ['She is right.', 'The trip takes 2 h + 1 h = 3 h for 40 km, so the average is about 13.3 km/h.', 'The average is 30 km/h.', 'The average is 10 km/h.'], 1, {
      s: 'Total distance 40 km, total time 3 hours, average 40 ÷ 3 = 13 1/3 km/h.',
      w: [[0, 'She averaged the speeds. But she spent twice as long at the slow speed.'], [3, 'That ignores the faster part entirely. Total distance over total time.']],
    }),
  ],

  quiz: [
    tpl('distance', (r) => {
      const s = 2 * r.int(10, 60), t = r.pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6]);
      const v = r.pick(['A train', 'A bus', 'A cyclist', 'A ferry']);
      return N(v + ' travels at ' + s + ' km/h for ' + t + ' hours. How many km does it cover?', s * t, { s: s + ' × ' + t + ' = ' + s * t + ' km.', w: wr(s * t, [[s / t, 'To find distance multiply speed by time.']]) });
    }),
    tpl('speed', (r) => {
      const s = r.int(8, 80), t = r.pick([2, 3, 4, 5, 6, 8]);
      if (r.bool()) return N('A car covers ' + s * t + ' km in ' + t + ' hours. What is its average speed in km/h?', s, { s: s * t + ' ÷ ' + t + ' = ' + s + ' km/h.', w: wr(s, [[s * t * t, 'Speed is distance divided by time, not multiplied.']]) });
      const s2 = 2 * r.int(10, 50);
      return N('A van covers ' + s2 * 2.5 + ' km in 2 hours 30 minutes. What is its average speed in km/h?', s2, { s: '2 h 30 min = 2.5 h. ' + s2 * 2.5 + ' ÷ 2.5 = ' + s2 + ' km/h.', w: wr(s2, [[s2 * 2.5 / 2, 'You used 2 hours. The trip lasted 2.5 hours.']]) });
    }),
    tpl('time', (r) => {
      if (r.bool()) { const s = r.int(2, 10) * 6, t = r.pick([1.5, 2, 2.5, 3, 3.5, 4]); return N('How many hours does it take to travel ' + s * t + ' km at ' + s + ' km/h?', t, { s: s * t + ' ÷ ' + s + ' = ' + t + ' hours.', w: wr(t, [[s * t * s, 'Time is distance divided by speed.']]) }); }
      const k = r.int(1, 10) * 12, m = r.int(1, 11) * 5;
      return N('A runner goes ' + (k * m) / 60 + ' km at ' + k + ' km/h. How many minutes does that take?', m, { s: (k * m) / 60 + ' ÷ ' + k + ' = ' + fx(m / 60) + ' h, which is ' + m + ' minutes.', w: wr(m, [[m / 60, 'That is the time in hours. The question asks for minutes, so multiply by 60.']]) });
    }),
    tpl('convert', (r) => {
      if (r.bool()) { const m = r.int(1, 8) * 18; return N('Convert ' + m + ' km/h to m/s.', m / 3.6, { s: m + ' km/h = ' + m * 1000 + ' m per 3600 s = ' + fx(m / 3.6) + ' m/s.', w: wr(m / 3.6, [[m * 3.6, 'm/s are smaller numbers than km/h. Divide by 3.6.']]) }); }
      const v = r.int(2, 40) * 5; return N('Convert ' + v + ' m/s to km/h.', fx(v * 3.6), { s: v + ' m/s is ' + v * 3600 + ' m per hour = ' + fx(v * 3.6) + ' km/h.', w: wr(v * 3.6, [[v / 3.6, 'km/h numbers are bigger than m/s numbers. Multiply by 3.6.']]) });
    }),
    tpl('average', (r) => {
      const [x, y] = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 2], [3, 1], [4, 1]]), c = r.int(1, 4);
      const s1 = x * (x + y) * c, s2 = y * (x + y) * c, avg = 2 * x * y * c, d = (s1 * s2) / gcd(s1, s2) * r.int(1, 2);
      return N('A car drives ' + d + ' km at ' + s1 + ' km/h and then another ' + d + ' km at ' + s2 + ' km/h. What is its average speed for the whole trip, in km/h?', avg, { s: 'Times: ' + d / s1 + ' h and ' + d / s2 + ' h. Total ' + 2 * d + ' km in ' + (d / s1 + d / s2) + ' h = ' + avg + ' km/h.', w: wr(avg, [[(s1 + s2) / 2, 'That is the plain average of the two speeds. Use total distance over total time.']]) });
    }),
    tpl('meet', (r) => {
      const a = r.int(3, 9), b = r.int(2, 9), t = r.int(2, 8), n = name(r);
      if (r.bool()) return N('Two cyclists start ' + t * (a + b) + ' km apart and ride toward each other at ' + a + ' km/h and ' + b + ' km/h. After how many hours do they meet?', t, { s: 'The gap closes at ' + a + ' + ' + b + ' = ' + (a + b) + ' km/h. ' + t * (a + b) + ' ÷ ' + (a + b) + ' = ' + t + ' hours.', w: wr(t, [[(t * (a + b)) / a, 'You used one speed only. Moving toward each other, the speeds add.']]) });
      const sl = a, f = a + r.int(1, 6);
      return N(n + ' walks at ' + sl + ' km/h and is ' + t * (f - sl) + ' km ahead when a friend starts walking after ' + n + ' at ' + f + ' km/h. How many hours until the friend catches up?', t, { s: 'The gap closes at ' + f + ' − ' + sl + ' = ' + (f - sl) + ' km/h. ' + t * (f - sl) + ' ÷ ' + (f - sl) + ' = ' + t + ' hours.', w: wr(t, [[(t * (f - sl)) / (f + sl), 'Going the same direction, you subtract the speeds, not add.']]) });
    }),
    tpl('fastest', (r) => {
      const [a, b, c] = [r.int(20, 80), r.int(5, 25), r.int(3, 15)];
      const v = [a, b * 3.6, c * 4];
      if (new Set(v.map(fx)).size < 3) return N('How many metres in 1 km?', 1000, { s: '1 km = 1000 m.' });
      const t = [a + ' km/h', b + ' m/s', c + ' km in 15 minutes'];
      const best = v.indexOf(Math.max(...v));
      return choice(r, 'Which is the fastest speed?', t[best], t.filter((_, i) => i !== best).map((x) => [x, 'Convert all the speeds to km/h before comparing. The bare numbers are in different units.']), { s: 'In km/h: ' + a + ', ' + fx(b * 3.6) + ', ' + c * 4 + '. The biggest is ' + t[best] + '.' });
    }),
    tpl('pace', (r) => {
      const m = r.pick([2, 3, 4, 5, 6, 10, 12, 15, 20, 30]), name1 = name(r);
      return N(name1 + ' runs each kilometre in ' + m + ' minutes. What is that speed in km/h?', 60 / m, { s: 'In 60 minutes the runner covers 60 ÷ ' + m + ' = ' + 60 / m + ' km.', w: wr(60 / m, [[m * 60, 'Speed in km/h is how many km fit in one hour: 60 ÷ ' + m + '.']]) });
    }),
  ],
});
