import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

export default lesson({
  id: 'pre-10-1-angles',
  title: 'Angles',
  blurb: 'Measure turning: right angles, straight lines, full circles, and the angle pairs that always add up the same.',
  concepts: ['angles', 'complementary', 'supplementary', 'vertical-angles'],

  tryFirst: [
    num('t1', 'You face north and turn clockwise a quarter of the way around a full circle, then turn another quarter the same way. Through how many degrees have you turned in total? (A full circle is 360 degrees.)', 180, {
      h: ['A quarter of 360 is...?', 'Two quarters make a half turn.'],
      s: 'A quarter turn is 360 ÷ 4 = 90 degrees. Two of them are 180 degrees: you now face south.',
      w: [['90', 'That is one quarter turn. You turned twice.']],
    }),
    num('t2', 'A straight line is a half turn, or 180 degrees. Another line leans on it and makes one angle of 125 degrees on one side. What is the angle on the other side?', 55, {
      h: ['Together the two angles fill the straight line.'],
      s: 'The two angles together make a straight line: 180 − 125 = 55 degrees.',
      w: [['235', 'You added 125 to 110, or similar. The two angles on a straight line add to 180, so subtract 125 from 180.']],
    }),
  ],

  learn: [
    p('An <b>angle</b> measures how much you turn. Two rays that start at the same point form an angle, and the size of the angle tells how far one ray has turned away from the other. Angles describe corners, slopes, directions and the shapes of every polygon, so the facts in this lesson are used for the rest of geometry.'),
    def('angle', 'The amount of turning between two rays that share an endpoint. The shared endpoint is the <b>vertex</b>, and the rays are the <b>arms</b>. We measure angles in <b>degrees</b>, written with the sign °.'),
    def('degree', 'The unit of angle. One full turn is 360°, because the circle was divided into 360 equal parts long ago. A half turn is 180°, which is a straight line. A quarter turn is 90°, the corner of a sheet of paper, called a <b>right angle</b>.'),
    widget('angleExplorer', { a: 50 }),
    tbl(['Name', 'Size'], [['acute', 'less than 90°'], ['right', 'exactly 90°'], ['obtuse', 'more than 90° and less than 180°'], ['straight', 'exactly 180°'], ['reflex', 'more than 180° and less than 360°']], 'Naming angles by size'),
    def('complementary angles', 'Two angles whose sizes add to 90°. Each one is the <b>complement</b> of the other.'),
    def('supplementary angles', 'Two angles whose sizes add to 180°. Each one is the <b>supplement</b> of the other.'),
    formula('Complement and supplement', 'complement of a = 90° − a        supplement of a = 180° − a', 'The complement of 35° is 55°, and the supplement of 35° is 145°. The angles do not have to touch each other, only their sizes matter.'),
    tip('<b>C comes before S</b> in the alphabet, just as 90 comes before 180. Complementary goes with 90°, supplementary with 180°.'),
    ex('Angles on a straight line', ['Three angles sit side by side on a straight line. Two of them are 40° and 75°.', 'The three together make a straight line: 180°.', 'Third angle = 180 − 40 − 75 = 65°.', 'Check: 40 + 75 + 65 = 180.']),
    key('Three totals cover most angle problems: <b>90°</b> in a right angle, <b>180°</b> on a straight line, and <b>360°</b> all the way around a point. When an angle is missing, decide which total applies and subtract the angles you know.'),
    rule('<b>Vertical angles.</b> When two straight lines cross, they make four angles. The two that sit opposite each other (vertical angles) are always equal. Neighbours add to 180°. Around the crossing point all four add to 360°.'),
    p('<b>Why are vertical angles equal?</b> Call the four angles a, b, a\' and b\' going around. Each neighbour pair sits on a straight line, so a + b = 180° and also b + a\' = 180°. The same b is in both, so a and a\' must be equal.'),
    ex('Using algebra with angle facts', ['An angle is 30° bigger than its complement. How large is the angle?', 'Let the angle be a. Its complement is 90 − a. So a = (90 − a) + 30.', 'Then a = 120 − a, so 2a = 120 and a = 60.', 'Check: the complement is 30°, and 60 is 30 more than 30. Also 60 + 30 = 90.']),
    ex('Two crossing lines', ['Two lines cross and one angle is 54°. Find the other three.', 'The opposite angle is also 54°.', 'The neighbours are 180 − 54 = 126°, and there are two of them.', 'Check: 54 + 54 + 126 + 126 = 360.']),
    warn('<b>Watch out.</b> Do not mix up complementary (90°) and supplementary (180°). Also, an angle of 90° or more has no complement, since the complement would be zero or negative. And a 38° angle has a 142° partner on a straight line, not a 52° one.'),
    mcq('Ben says: "Two angles that add to 180° must be next to each other." Is he right?', ['Yes, supplementary angles always touch.', 'No. Two angles can be supplementary without touching, such as 110° and 70° in different places. Neighbours on a line are supplementary, but supplementary only describes the sum.', 'No, supplementary angles add to 90°.'], 1, 'Supplementary describes the sum 180°, not the position. The opposite is true: angles on a straight line are always supplementary.', 'Spot the mistake'),
    recap([['angle', 'turning between two rays at a vertex'], ['right / straight / full turn', '90° / 180° / 360°'], ['complementary', 'two angles adding to 90°'], ['supplementary', 'two angles adding to 180°'], ['vertical angles', 'opposite angles at a crossing; equal']], [['Complement', '90° − a'], ['Supplement', '180° − a'], ['Angles around a point', '360°']]),
  ],

  practice: [
    num('p1', 'What is the complement of 28°?', 62, {
      h: ['Complementary angles add to 90°.'],
      s: '90 − 28 = 62.',
      w: [['152', 'That is the supplement (180 − 28). The complement uses 90.']],
    }),
    num('p2', 'What is the supplement of 28°?', 152, {
      h: ['Supplementary angles add to 180°.'],
      s: '180 − 28 = 152.',
      w: [['62', 'That is the complement (90 − 28). The supplement uses 180.']],
    }),
    num('p3', 'Two lines cross. One of the four angles is 38°. What is the largest of the four angles?', 142, {
      h: ['The opposite angle is also 38°. Neighbours add to 180°.'],
      s: 'Two angles are 38° (opposite). The other two are 180 − 38 = 142° each. Check: 38 + 38 + 142 + 142 = 360.',
      w: [['38', 'Opposite angles are equal, but the two other angles are bigger.'], ['322', '360 − 38 is not an angle in the picture. Neighbours add to 180.']],
    }),
    num('p4', 'An angle is 3 times its own complement. How big is the angle in degrees?', 67.5, {
      h: ['Let the complement be c. Then the angle is 3c, and c + 3c = 90.'],
      s: 'c + 3c = 90 gives 4c = 90, so c = 22.5. The angle is 3 × 22.5 = 67.5°.',
      w: [['30', '30° and its complement 60° is the other way round: the complement is twice the angle there. Here the angle is the bigger one.'], ['22.5', 'That is the complement. You want the angle that is 3 times as big.']],
    }),
    num('p5', 'Four angles meet at a point and fill the whole turn. Three of them are 100°, 85° and 70°. What is the fourth?', 105, {
      h: ['Around a point the angles add to 360°.'],
      s: '100 + 85 + 70 = 255. Then 360 − 255 = 105.',
      w: [['75', 'That is 255 − 180. Around a point the total is 360, not 180, and you subtract the three angles from the total.'], ['255', 'That is the sum of the three. Subtract it from 360.']],
    }),
    num('p6', 'At 4:00 exactly on a clock, what is the smaller angle between the hour hand and the minute hand, in degrees?', 120, {
      h: ['The 12 numbers split the circle into equal steps. How many degrees between neighbouring numbers?', 'At 4:00 the hands point at 12 and at 4.'],
      s: 'Each hour step is 360 ÷ 12 = 30°. From 12 to 4 is 4 steps: 4 × 30 = 120°.',
      w: [['240', 'That is the larger angle going the other way. The smaller one is 120.'], ['4', 'The 4 counts steps. Each step is 30°.']],
    }),
    num('p7', 'At 3:30, how many degrees apart are the hour hand and the minute hand? (Hint: the hour hand has moved half way from 3 to 4.)', 75, {
      h: ['The minute hand points at 6. The hour hand is half way between 3 and 4.', 'From the 3 to the 6 is 90°, but the hour hand is already 15° past the 3.'],
      s: 'The hour hand is at 3 and a half: 3 × 30 + 15 = 105° from the 12. The minute hand is at 6: 180°. The gap is 180 − 105 = 75°.',
      w: [['90', 'That treats the hour hand as sitting exactly on 3. At 3:30 it has moved half way toward 4.'], ['105', 'That is the hour hand position from the 12, not the gap to the minute hand.']],
    }),
  ],

  challenge: [
    chain('Bisecting', 'A straight line has a ray leaning on it, making an angle of 70° on the left. A second ray cuts the other, larger angle exactly in half.', [
      num('c1a', 'How big is the larger angle on the line?', 110, { h: ['Supplement of 70°.'], s: '180 − 70 = 110°.' }),
      num('c1b', 'How big is each half after the second ray cuts it in half?', 55, { h: ['Half of 110°.'], s: '110 ÷ 2 = 55°.' }),
      num('c1c', 'What is the angle between the first ray (the one that made 70° on the left) and the second ray?', 55, { h: ['The halves are 55° each: one lies between the first ray and the second ray.'], s: 'The first ray starts the large angle and the second ray splits it, so they are one half apart: 55°.' }),
    ], 'The idea: splitting an angle in two just divides it. Always work out what the whole angle is first.'),
    chain('Clock sweep', 'The minute hand turns 360° each hour; the hour hand turns 30° each hour.', [
      num('c2a', 'How many degrees does the minute hand turn in 1 minute?', 6, { h: ['360 ÷ 60.'], s: '360 ÷ 60 = 6° per minute.' }),
      num('c2b', 'How many degrees does the hour hand turn in 1 minute? (Give a decimal.)', 0.5, { h: ['It turns 30° in 60 minutes.'], s: '30 ÷ 60 = 0.5° per minute.' }),
      num('c2c', 'At 12:00 the hands are together. At what minute past 12 (a whole number) do they first line up again, rounded down? (The minute hand gains 5.5° on the hour hand every minute. They line up again when it has gained 360°.)', 65, { h: ['360 ÷ 5.5 = 65.45...', 'Round down.'], s: '360 ÷ 5.5 ≈ 65.45, so after 65 minutes and a bit: the hands meet again around 1:05 and a half.' }),
    ], 'The idea: two things turning at different speeds line up when the faster one gains a full turn. The hands meet 11 times in 12 hours, not 12.'),
    mc('c3', 'Find the error. Ava says: "Two lines cross and make a 50° angle. So the angle next to it is also 50° because they are on the same line." What is wrong?', ['Neighbouring angles on a straight line add to 180°, so the angle next to it is 130°. The angle opposite is the one that is also 50°.', 'Ava is right: neighbours are equal.', 'The angle next to it is 40°, because they add to 90°.', 'You cannot find the angle next to it.'], 0, {
      s: 'Neighbours share a straight line, so 50 + angle = 180 and the angle is 130°. Equal angles are the OPPOSITE (vertical) ones.',
      w: [[1, 'Neighbours add to 180°; opposite angles are equal.'], [2, '90 is for complementary angles (a right angle). A straight line is 180°.']],
    }),
  ],

  quiz: [
    tpl('comp', (r) => {
      const a = r.int(3, 87), sup = r.bool();
      return sup
        ? N('What is the supplement of ' + (90 + a) + '°?', 90 - a, { s: '180 − ' + (90 + a) + ' = ' + (90 - a) + '.', w: [[90 - a === 0 ? 1 : -a, 'Supplementary angles add to 180°, so subtract from 180.']] })
        : N('What is the complement of ' + a + '°?', 90 - a, { s: '90 − ' + a + ' = ' + (90 - a) + '.', w: [[180 - a, 'That is the supplement. Complementary angles add to 90°.']] });
    }),
    tpl('supp', (r) => {
      const a = r.int(5, 175);
      return N('Two angles on a straight line are next to each other. One is ' + a + '°. What is the other?', 180 - a, { s: '180 − ' + a + ' = ' + (180 - a) + '.', w: [[360 - a, 'A straight line is 180°, not 360°.']] });
    }),
    tpl('mult', (r) => {
      const k = r.pick([2, 3, 4, 5, 8, 9, 14, 17, 29]), nm = name(r), comp = r.bool();
      const tot = comp ? 90 : 180;
      if ((tot * k) % (k + 1)) return N(nm + ' draws an angle that is 2 times its complement. How many degrees is it?', 60, { s: 'x + x/2 = 90 leads to 60.' });
      const a = (tot * k) / (k + 1);
      return N(nm + ' draws an angle that is ' + k + ' times as big as its ' + (comp ? 'complement' : 'supplement') + '. How many degrees is the angle?', a, { s: 'If the other angle is c, the angle is ' + k + 'c, and c + ' + k + 'c = ' + tot + '. So c = ' + tot / (k + 1) + ' and the angle is ' + a + '°.', w: [[tot / (k + 1), 'That is the smaller one. The angle you want is ' + k + ' times as big.']] });
    }),
    tpl('vert', (r) => {
      const x = r.int(4, 30), p1 = r.int(2, 5), p2 = p1 + r.int(1, 4), d = r.int(5, 40);
      const b = p2 * x - d - p1 * x; if (b <= 0 || p2 * x - d >= 180) return N('Vertical angles are (2x + 10)° and (3x)°. Find x.', 10, { s: '2x + 10 = 3x gives x = 10.' });
      return N('Two lines cross. A pair of vertical angles measure (' + p1 + 'x + ' + b + ')° and (' + p2 + 'x − ' + d + ')°. Find x.', x, { s: 'Vertical angles are equal: ' + p1 + 'x + ' + b + ' = ' + p2 + 'x − ' + d + ', so ' + (b + d) + ' = ' + (p2 - p1) + 'x and x = ' + x + '.', w: [[p1 * x + b, 'That is the angle, not x.']] });
    }),
    tpl('point', (r) => {
      const n = r.int(3, 5), parts = []; let left = 360;
      for (let i = 0; i < n; i++) { const v = r.int(30, 100); parts.push(v); }
      const sum = parts.reduce((s, v) => s + v, 0);
      if (sum >= 330) { parts.length = 0; parts.push(90, 80, 60); }
      const t = parts.reduce((s, v) => s + v, 0);
      return N('Angles meet at a point and fill the whole turn: ' + parts.map((v) => v + '°').join(', ') + ' and one more. How big is the last angle?', 360 - t, { s: parts.join(' + ') + ' = ' + t + ', and 360 − ' + t + ' = ' + (360 - t) + '.', w: 180 - t > 0 && 180 - t !== 360 - t ? [[180 - t, 'The whole turn is 360°, not 180°.']] : [] });
    }),
    tpl('split', (r) => {
      const t = r.pick([3, 4, 5, 6, 9, 10, 12, 15, 18]);
      const a = r.int(1, t - 1);
      const lo = Math.min(a, t - a), hi = Math.max(a, t - a);
      if (lo === hi) return N('A ray leans on a straight line so that the two angles are in the ratio 1 : 2. How big is the smaller angle?', 60, { s: '1 + 2 = 3 parts, 180 ÷ 3 = 60.' });
      const u = 180 / t;
      return N('A ray leans on a straight line. The two angles it makes are in the ratio ' + lo + ' : ' + hi + '. How big is the smaller angle, in degrees?', lo * u, { s: 'There are ' + t + ' parts in 180°, so one part is ' + u + '°. The smaller angle is ' + lo + ' × ' + u + ' = ' + lo * u + '°.', w: [[hi * u, 'That is the larger angle.'], [u, 'That is one part. The smaller angle has ' + lo + ' of them.']].filter((x) => x[0] !== lo * u) });
    }),
    tpl('clock', (r) => {
      const h = r.int(1, 12), m = r.pick([0, 10, 20, 30, 40, 50]);
      const hh = (h % 12) * 30 + m / 2, mm = m * 6;
      const d = Math.abs(hh - mm), a = Math.min(d, 360 - d);
      return N('What is the smaller angle between the hour hand and the minute hand at ' + h + ':' + (m === 0 ? '00' : m) + '? (The hour hand keeps creeping: it moves 0.5° each minute.)', a, { s: 'Hour hand: ' + hh + '° from the 12. Minute hand: ' + mm + '°. Gap ' + d + '°, smaller side ' + a + '°.', w: [[360 - a, 'That is the larger way round. Give the smaller angle.']].filter((x) => x[0] !== a) });
    }),
  ],
});
