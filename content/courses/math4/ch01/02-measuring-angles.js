import { lesson, num, mc, N, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const clockAngle = (h, m) => { const d = Math.abs(30 * (h % 12) + m / 2 - 6 * m); return Math.min(d, 360 - d); };
const t2 = (h, m) => h + ':' + String(m).padStart(2, '0');

export default lesson({
  id: 'm4-1-2-measuring-angles',
  title: 'Measuring angles',
  blurb: 'Read a protractor, add and subtract angles, and find the angle between the hands of a clock.',
  concepts: ['protractor', 'angle-addition', 'clock-angles'],

  tryFirst: [
    num('t1', 'Three angles sit side by side along a straight line. Two of them are 40° and 75°. How many degrees is the third angle?', 65, {
      h: ['Side by side on a straight line means they fill a half turn.', 'A half turn is 180°.'],
      s: '40 + 75 = 115. 180 − 115 = 65.',
      w: [['115', 'That is the sum of the two you know. The third angle is what is left of 180.']],
    }),
    num('t2', 'A clock minute hand starts at 3:00 and runs until 3:20. Through how many degrees does it turn?', 120, {
      h: ['One full hour is a full turn of 360°.', 'How much of an hour is 20 minutes?'],
      s: '20 minutes is one third of an hour. One third of 360° is 120°.',
      w: [['20', 'Minutes and degrees are different. One minute is 6 degrees.']],
    }),
  ],

  learn: [
    p('A <b>protractor</b> measures angles. It is a half circle with a scale from 0 to 180. Put the vertex at the center. Put one ray along the 0 line. Read where the other ray crosses the scale.'),
    widget('angleMeasure', { from: 0, to: 70 }),
    rule('<b>Rays not on zero.</b> If neither ray sits on 0, read both marks on the same scale. The angle is the bigger reading minus the smaller reading. Rays at 30 and 110 make an angle of 110 − 30 = 80°.'),
    warn('<b>Watch out.</b> A protractor has two scales. Always use the scale that starts at 0 on your ray. A quick check: an angle that looks smaller than a square corner must be less than 90.'),
    rule('<b>Angles add.</b> Angles that share a vertex and do not overlap add up. All around one point they make 360°. On one side of a straight line they make 180°. Two angles that make 90° together are <b>complementary</b>.'),
    ex('A missing angle', ['Four angles surround a point. Three are 100°, 80° and 120°. Find the fourth.', 'The four angles make a full turn: 360°.', '100 + 80 + 120 = 300.', '360 − 300 = 60°.']),
    p('A clock is a full circle with 12 numbers. From one number to the next is 360 ÷ 12 = 30°. The minute hand turns 360° in 60 minutes. That is 6° each minute. The hour hand turns 30° in 60 minutes. That is 0.5° each minute.'),
    tbl(['Hand', 'Turns in 1 hour', 'Turns in 1 minute'], [['minute hand', '360°', '6°'], ['hour hand', '30°', '0.5°']], 'The two hands'),
    ex('The angle at 2:30', ['The minute hand points at 6. That is 6 × 30 = 180° from 12.', 'The hour hand left 2 at 2:00. It has moved 30 minutes, which is 15°. It is at 2 × 30 + 15 = 75°.', 'The angle between the hands is 180 − 75 = 105°.']),
    mcq('Mia says: "At 3:30 the hour hand points exactly at 3 and the minute hand at 6, so the angle is 3 × 30 = 90°." What is wrong?', ['Nothing, 90° is right.', 'By 3:30 the hour hand has moved halfway toward the 4, so the angle is only 75°.', 'The angle is 180° because the minute hand points straight down.'], 1, 'The hour hand never sits still. At 3:30 it is halfway between 3 and 4: 105°. The minute hand is at 180°. The angle is 180 − 105 = 75°.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'On a protractor, one ray reads 35 and the other reads 120 on the same scale. What angle do they make?', 85, {
      h: ['Neither ray is on 0. Subtract the readings.'],
      s: '120 − 35 = 85°.',
      w: [['155', 'You added the readings. Subtract them to find the opening between the rays.'], ['120', 'That is only one ray. The other ray is not on 0, so subtract.']],
    }),
    num('p2', 'Four angles meet at one point. They are 90°, 110°, 75°, and one more. How many degrees is the last one?', 85, {
      h: ['Around a point is 360°.'],
      s: '90 + 110 + 75 = 275. 360 − 275 = 85°.',
      w: [['95', 'Check your subtraction. The three known angles add to 275, and 360 − 275 is not 95.'], ['275', 'That is the sum of the three known angles. Subtract it from 360.']],
    }),
    num('p3', 'Two angles lie side by side on a straight line. One is 4 times as big as the other. How many degrees is the smaller one?', 36, {
      h: ['Together they make 180°.', 'The smaller is 1 part. The bigger is 4 parts. How many parts in all?'],
      s: '1 + 4 = 5 parts make 180°. One part is 180 ÷ 5 = 36°.',
      w: [['144', 'That is the bigger angle. The question asks for the smaller one.'], ['45', 'Dividing 180 by 4 skips the smaller part. There are 5 equal parts in all.']],
    }),
    num('p4', 'The hour hand of a clock moves from the 12 to the 5. Through how many degrees does it turn?', 150, {
      h: ['Each number step is 30°.'],
      s: '5 steps × 30° = 150°.',
      w: [['120', 'The hand moves 5 steps from 12 to 5. Count 5 steps, not 4.']],
    }),
    num('p5', 'What is the smaller angle between the hands of a clock at 4:00?', 120, {
      h: ['The hands point at 12 and at 4.', 'Each number step is 30°.'],
      s: '4 steps × 30° = 120°. The other way around is 240°, so the smaller angle is 120°.',
      w: [['240', 'That is the large way around. The smaller angle is asked for.']],
    }),
    num('p6', 'What is the smaller angle between the clock hands at 3:30?', 75, {
      h: ['The minute hand is at 180° from the 12.', 'Find where the hour hand is. It has moved 30 minutes past 3.'],
      s: 'Hour hand: 3 × 30 + 15 = 105°. Minute hand: 180°. 180 − 105 = 75°.',
      w: [['90', 'The hour hand is not exactly on the 3. It has moved halfway to the 4.'], ['105', 'That is where the hour hand is. Subtract it from the minute hand, which is at 180.']],
    }),
    num('p7', 'Angle ABC is 90°. A ray BD sits inside it. Angle ABD is 20° more than angle DBC. How many degrees is angle DBC?', 35, {
      h: ['If you remove the extra 20°, the two parts are equal.', 'Share what is left equally.'],
      s: '90 − 20 = 70. Two equal parts make 70, so DBC = 35° and ABD = 55°. Check: 55 + 35 = 90.',
      w: [['55', 'That is angle ABD, the bigger part. The question asks for DBC.'], ['45', 'The two parts are not equal. ABD is 20° bigger.']],
    }),
    num('p8', 'How many degrees does the hour hand move in 40 minutes?', 20, {
      h: ['The hour hand moves 0.5° each minute.'],
      s: '40 × 0.5 = 20°.',
      w: [['240', 'That is how far the minute hand moves. The hour hand is much slower.']],
    }),
  ],

  challenge: [
    chain('Around the point', 'Four angles fit together around one point. One is 60° and one is 110°. The other two are equal to each other.', [
      num('c1a', 'How many degrees do the 60° and 110° angles make together?', 170, { h: ['Add them.'], s: '60 + 110 = 170.' }),
      num('c1b', 'How many degrees are left for the two equal angles together?', 190, { h: ['The full turn is 360°.'], s: '360 − 170 = 190.' }),
      num('c1c', 'How many degrees is each of the equal angles?', 95, { h: ['Split what is left into two equal parts.'], s: '190 ÷ 2 = 95.' }),
    ], 'The idea: use the total (360° around a point, 180° on a line), subtract what you know, then share what is left.'),
    chain('Hands at six', 'Look at the clock hands in the minutes after 6:00. Find the smaller angle each time.', [
      num('c2a', 'What is the angle between the hands at 6:00?', 180, { h: ['The hands point in opposite directions.'], s: 'One points at 12 and the other at 6: 180°.' }),
      num('c2b', 'What is the angle at 6:20? The minute hand is at 120°. The hour hand has moved 10° past the 6.', 70, { h: ['The 6 is at 180°. Where is the hour hand?'], s: 'Hour hand: 190°. Minute hand: 120°. 190 − 120 = 70°.' }),
      num('c2c', 'What is the angle at 6:40?', 40, { h: ['Minute hand: 40 × 6 = 240°.', 'Hour hand: 180° plus 20°.'], s: 'Hour hand: 200°. Minute hand: 240°. 240 − 200 = 40°.' }),
    ], 'The idea: put each hand at its spot on the 360° circle, then subtract. The hour hand drifts 0.5° each minute.'),
    mc('c3', 'Find the error. Jo says: "At 9:00 the hands make a right angle, so at 9:15 the angle is still a right angle because the hour hand stays on the 9."', ['Jo is right.', 'At 9:15 the minute hand is at the 3 and the hour hand has moved a little past the 9, so the angle is not 90.', 'At 9:15 the hands are on top of each other.', 'The angle at 9:15 is 180°.'], 1, {
      s: 'At 9:15 the minute hand is at 90°. The hour hand is at 270 + 7.5 = 277.5°. The angle is 187.5° one way, so 172.5° the other way. It is not 90°.',
      w: [[0, 'The hour hand moves all the time. At 9:15 it is 7.5° past the 9.'], [2, 'The minute hand is at the 3 and the hour hand is near the 9. They are far apart.']],
    }),
  ],

  quiz: [
    tpl('sub', (r) => {
      const a = r.int(1, 80), b = a + r.int(10, 90), nm = name(r);
      return N(nm + ' puts a protractor on an angle. One ray reads ' + a + ' and the other reads ' + b + ' on the same scale. How many degrees is the angle?', b - a, { s: b + ' − ' + a + ' = ' + (b - a) + '.', w: [[a + b, 'Subtract the two readings. Adding them gives nothing meaningful.']] });
    }),
    tpl('point', (r) => {
      const x = r.int(40, 120), y = r.int(40, 120), z = r.int(30, 100);
      return N('Four angles meet at a point. Three of them are ' + x + '°, ' + y + '° and ' + z + '°. How many degrees is the fourth?', 360 - x - y - z, { s: x + ' + ' + y + ' + ' + z + ' = ' + (x + y + z) + '. 360 − ' + (x + y + z) + ' = ' + (360 - x - y - z) + '.', w: [[180 - x - y - z, 'Around a point the total is 360°, not 180°.']] });
    }),
    tpl('line3', (r) => {
      const x = r.int(20, 80), y = r.int(20, 80), nm = name(r);
      return N(nm + ' draws three angles side by side on a straight line. Two are ' + x + '° and ' + y + '°. How big is the third?', 180 - x - y, { s: '180 − ' + x + ' − ' + y + ' = ' + (180 - x - y) + '.', w: [[360 - x - y, 'On a straight line the total is 180°, not 360°.']] });
    }),
    tpl('clock', (r) => {
      const h = r.int(1, 12), m = r.pick([0, 10, 20, 30, 40, 50]);
      const v = clockAngle(h, m);
      return N('What is the smaller angle between the hands of a clock at ' + t2(h, m) + '?', v, { s: 'Minute hand: ' + 6 * m + '°. Hour hand: ' + (30 * (h % 12) + m / 2) + '°. The smaller angle between them is ' + v + '°.', w: v === 180 || v === 0 ? [] : [[360 - v, 'That is the large way around. Take the smaller angle.']] });
    }),
    tpl('split', (r) => {
      const k = r.pick([2, 3, 4, 5, 8, 9, 11, 14, 17, 19]), whole = r.pick([180, 360]), nm = name(r);
      const small = whole / (k + 1);
      const where = whole === 180 ? 'two angles side by side on a straight line' : 'two angles that fill the whole turn around a point';
      return N(nm + ' draws ' + where + '. One is ' + k + ' times as big as' + ' the other. How many degrees is the smaller one?', small, { s: (k + 1) + ' equal parts make ' + whole + '°. ' + whole + ' ÷ ' + (k + 1) + ' = ' + small + '.', w: [[whole - small, 'That is the bigger angle. Give the smaller one.']] });
    }),
    tpl('hourhand', (r) => {
      const m = r.int(2, 60) * 2 % 120 || 10, which = r.bool();
      const v = which ? m / 2 : 6 * m;
      return N('How many degrees does the ' + (which ? 'hour' : 'minute') + ' hand of a clock turn in ' + m + ' minutes?', v, { s: (which ? m + ' × 0.5' : m + ' × 6') + ' = ' + v + '.', w: [[which ? 6 * m : m / 2, 'You swapped the two hands. The minute hand turns 6° a minute, the hour hand 0.5°.']] });
    }),
    tpl('diffsplit', (r) => {
      const d = r.int(2, 30) * 2, t = r.pick([90, 120, 150, 180]) , nm = name(r);
      const big = (t + d) / 2;
      return N(nm + ' splits a ' + t + '° angle into two parts with a ray. One part is ' + d + '° bigger than the other. How many degrees is the bigger part?', big, { s: t + ' − ' + d + ' = ' + (t - d) + ', halved is ' + (t - d) / 2 + ' (smaller). Bigger: ' + (t - d) / 2 + ' + ' + d + ' = ' + big + '.', w: [[(t - d) / 2, 'That is the smaller part. Give the bigger one.']] });
    }),
  ],
});
