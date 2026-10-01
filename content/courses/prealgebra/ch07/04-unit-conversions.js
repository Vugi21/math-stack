import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, fmt } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);
const d1 = (i) => fx(i / 10);

export default lesson({
  id: 'pre-7-4-unit-conversions',
  title: 'Converting units',
  blurb: 'Change units by multiplying by a fraction that equals 1, and see why square units change by the square of the factor.',
  concepts: ['unit-conversion', 'metric', 'unit-fractions'],

  tryFirst: [
    num('t1', 'A Toronto streetcar route is 12 km long. How many metres is that?', 12000, {
      h: ['How many metres in one kilometre?'], s: '1 km = 1000 m, so 12 km = 12 × 1000 = 12 000 m.',
      w: [['12', 'That is the number of kilometres. Each one is 1000 metres.'], ['0.012', 'Metres are a smaller unit than kilometres, so there should be more of them, not fewer.']],
    }),
    num('t2', 'You have 2 litres of juice. How many glasses of 250 mL can you fill?', 8, {
      h: ['How many mL are in 2 L?'], s: '2 L = 2000 mL. 2000 ÷ 250 = 8 glasses.',
      w: [['500', '500 is not a count of glasses. Change the litres to mL first, then see how many 250s fit.'], ['0.008', 'Convert to the same unit first, then divide: 2000 mL ÷ 250 mL.']],
    }),
  ],

  learn: [
    p('Changing units does not change how big something is. 3 m and 300 cm are the same length, written in different units. A <b>conversion</b> is just multiplying by 1 in a clever costume.'),
    tbl(['Length', 'Mass, volume, and long lengths', 'Time'], [['1 km = 1000 m', '1 kg = 1000 g', '1 h = 60 min'], ['1 m = 100 cm', '1 L = 1000 mL', '1 min = 60 s'], ['1 cm = 10 mm', '1 yd = 3 ft', '1 day = 24 h'], ['1 ft = 12 in', '1 mi = 5280 ft', '1 week = 7 days']], 'Facts worth knowing'),
    widget('rateModel', { r: 100, t: 3, per: 'metre', what: 'cm' }),
    rule('<b>Unit fractions.</b> Since 1 m = 100 cm, the fractions {100 cm/1 m} and {1 m/100 cm} both equal 1. To convert, multiply by the one that cancels the unit you have and leaves the unit you want. 3 m × {100 cm/1 m} = 300 cm.'),
    ex('Chaining conversions', ['How many seconds are in 2 hours?', '2 h × {60 min/1 h} = 120 min. The hours cancel.', '120 min × {60 s/1 min} = 7200 s. The minutes cancel.', 'So 2 hours = 7200 seconds.']),
    rule('<b>Sanity check.</b> A smaller unit means a bigger number (cm instead of m), and a bigger unit means a smaller number (km instead of m). If your answer goes the wrong way, flip the fraction.'),
    ex('Square units', ['A square is 2 m on each side. What is its area in cm²?', 'Convert first: 2 m = 200 cm.', 'Area = 200 × 200 = 40 000 cm².', 'Notice 1 m² = 100 × 100 = 10 000 cm², not 100 cm². Areas change by the square of the length factor.']),
    warn('<b>Watch out.</b> Do not multiply or divide by habit. "Divide by 1000 to go from km to m" is wrong: 3 km is 3000 m. Ask first which unit is smaller, then decide whether the number should grow or shrink.'),
    mcq('Sam says: "1 m is 100 cm, so 1 m² is 100 cm²." What is wrong?', ['Nothing, the factor is 100.', 'A square metre is 100 cm by 100 cm, which is 10 000 cm².', 'A square metre is 1000 cm².'], 1, 'Area multiplies two lengths, so the conversion factor gets used twice: 100 × 100.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Write 3.5 km in metres.', 3500, { h: ['Metres are smaller, so expect a bigger number.'], s: '3.5 × 1000 = 3500 m.', w: [['0.0035', 'You divided. Going to a smaller unit makes the number bigger.'], ['350', 'That is 3.5 × 100. A kilometre is 1000 m.']] }),
    num('p2', 'A shelf is 450 cm long. How many metres is that?', 4.5, { h: ['100 cm make 1 m.'], s: '450 ÷ 100 = 4.5 m.', w: [['45000', 'You multiplied. Metres are bigger than centimetres, so the number gets smaller.'], ['45', 'That divides by 10. There are 100 cm in a metre.']] }),
    num('p3', 'How many inches are in 2 yards and 1 foot?', 84, { h: ['1 yd = 36 in and 1 ft = 12 in.'], s: '2 yd = 72 in. 1 ft = 12 in. Total 84 in.', w: [['25', 'That is 2 × 12 + 1: you used 12 in for a yard and 1 in for the foot. 1 yd = 36 in and 1 ft = 12 in.'], ['37', 'That is 36 + 1: one yard in inches plus the foot counted as 1 inch. Convert all of it: 2 × 36 + 12.']] }),
    num('p4', 'How many hours is 5400 seconds?', 1.5, { h: ['First change seconds to minutes.'], s: '5400 ÷ 60 = 90 min. 90 ÷ 60 = 1.5 hours.', w: [['90', 'That is minutes. Divide by 60 once more.'], ['0.025', 'You divided by 60 three times. Seconds to hours needs only two: 5400 ÷ 3600 = 1.5.']] }),
    num('p5', 'A 2.4 kg bag of rice is shared into portions of 150 g. How many portions?', 16, { h: ['Turn 2.4 kg into grams.'], s: '2.4 kg = 2400 g. 2400 ÷ 150 = 16.', w: [['0.016', 'You did not convert kg to g first; compare in the same unit.'], ['2400', 'That is the bag in grams, not the number of portions.']] }),
    num('p6', 'A square courtyard is 2 m on each side. What is its area in square centimetres?', 40000, {
      h: ['Convert the side length first.'], s: '2 m = 200 cm. Area = 200 × 200 = 40 000 cm².',
      w: [['400', 'That multiplies 4 m² by 100. Area factors are squared: 100 × 100 = 10 000 per square metre.'], ['4', 'That is the area in m², not cm².']],
    }),
    num('p7', 'How many seconds are in one day?', 86400, { h: ['Chain: day to hours to minutes to seconds.'], s: '24 × 60 = 1440 min. 1440 × 60 = 86 400 s.', w: [['1440', 'That is the number of minutes in a day. One more step to seconds.']] }),
  ],

  challenge: [
    chain('The waterfront run', 'A charity run along the waterfront is 5 km long.', [
      num('c1a', 'How many metres is the run?', 5000, { h: ['1 km = 1000 m.'], s: '5 × 1000 = 5000 m.' }),
      num('c1b', 'The track around the park is 400 m. How many laps equal the run? (A decimal is fine.)', 12.5, { h: ['5000 ÷ 400.'], s: '5000 ÷ 400 = 12.5 laps.' }),
      num('c1c', 'Jo runs one lap every 2 minutes. How many minutes does the 5 km take her?', 25, { h: ['Laps times minutes per lap.'], s: '12.5 × 2 = 25 minutes.' }),
    ], 'The idea: convert to a common unit first, then do ordinary arithmetic.'),
    chain('Cubes and litres', 'A 1 litre milk carton holds the same amount as a cube that is 10 cm on each edge.', [
      num('c2a', 'How many cm³ is one litre?', 1000, { h: ['Volume of a cube: edge × edge × edge.'], s: '10 × 10 × 10 = 1000 cm³.' }),
      num('c2b', 'A cube 1 m on each edge is 100 cm on each edge. How many cm³ is it?', 1000000, { h: ['100 × 100 × 100.'], s: '100 × 100 × 100 = 1 000 000 cm³.' }),
      num('c2c', 'So how many litres fit in a 1 m cube?', 1000, { h: ['How many 1000s fit in a million?'], s: '1 000 000 ÷ 1000 = 1000 litres.' }),
    ], 'The idea: volume units change by the cube of the length factor. A cubic metre is 100 × 100 × 100 cubic centimetres.'),
    mc('c3', 'Find the error. Nia says: "To change 3 km to metres, I divide by 1000, so 3 km = 0.003 m." Which is right?', ['She is right.', 'Metres are a smaller unit, so the number gets bigger: 3 × 1000 = 3000 m.', '3 km is 30 m.', '3 km is 300 m.'], 1, {
      s: 'A kilometre is 1000 metres, so 3 kilometres is 3000 metres.',
      w: [[0, 'Check by feeling: 0.003 m is about the width of a pencil lead, not a 3 km walk.'], [3, 'That uses 100 instead of 1000. There are 1000 m in a km.']],
    }),
  ],

  quiz: [
    tpl('metric', (r) => {
      const U = [['km', 'm', 1000], ['m', 'cm', 100], ['cm', 'mm', 10], ['kg', 'g', 1000], ['L', 'mL', 1000]];
      const [big, small, f] = r.pick(U), i = 10 * r.int(1, 19) + r.int(1, 9);
      if (r.bool()) return N('Write ' + d1(i) + ' ' + big + ' in ' + small + '.', (i * f) / 10, { s: d1(i) + ' × ' + f + ' = ' + (i * f) / 10 + ' ' + small + '.', w: wr((i * f) / 10, [[i / 10 / f, 'Going to a smaller unit makes the number bigger. Multiply by ' + f + '.']]) });
      return N('Write ' + (i * f) / 10 + ' ' + small + ' in ' + big + '.', d1(i), { s: (i * f) / 10 + ' ÷ ' + f + ' = ' + d1(i) + ' ' + big + '.', w: wr(d1(i), [[(i * f) / 10 * f, 'Going to a bigger unit makes the number smaller. Divide by ' + f + '.']]) });
    }),
    tpl('imperial', (r) => {
      const t = r.int(0, 2), a = r.int(2, 30);
      if (t === 0) return N('How many inches are in ' + a + ' feet?', a * 12, { s: a + ' × 12 = ' + a * 12 + '.', w: wr(a * 12, [[a / 12, 'Inches are smaller than feet, so there are more inches.']]) });
      if (t === 1) return N('How many feet are in ' + a + ' yards?', a * 3, { s: a + ' × 3 = ' + a * 3 + '.', w: wr(a * 3, [[a / 3, 'Feet are smaller than yards, so there are more of them.']]) });
      return N('How many inches are in ' + a + ' yards?', a * 36, { s: 'Each yard is 3 ft = 36 in. ' + a + ' × 36 = ' + a * 36 + '.', w: wr(a * 36, [[a * 12, 'That treats a yard as 12 in. A yard is 3 feet, so 36 in.'], [a * 3, 'That gives feet. One more step to inches.']]) });
    }),
    tpl('time', (r) => {
      const t = r.int(0, 3), a = r.int(2, 12), b = r.int(1, 59);
      if (t === 0) return N('How many minutes are in ' + a + ' hours and ' + b + ' minutes?', a * 60 + b, { s: a + ' × 60 + ' + b + ' = ' + (a * 60 + b) + '.', w: wr(a * 60 + b, [[a + b, 'Each hour is 60 minutes. Convert the hours first.']]) });
      if (t === 1) return N('How many seconds are in ' + a + ' minutes?', a * 60, { s: a + ' × 60 = ' + a * 60 + '.' });
      if (t === 2) return N('How many hours are in ' + a + ' days?', a * 24, { s: a + ' × 24 = ' + a * 24 + '.' });
      return N('How many seconds are in ' + a + ' hours?', a * 3600, { s: a + ' × 60 × 60 = ' + a * 3600 + '.', w: wr(a * 3600, [[a * 60, 'That is minutes. Multiply by 60 once more.']]) });
    }),
    tpl('portions', (r) => {
      const P = r.pick([50, 100, 125, 200, 250, 500]);
      let n; do { n = r.int(4, 30); } while ((n * P) % 100 !== 0);
      const it = r.pick([['bag of flour', 'portions'], ['jar of honey', 'servings'], ['bag of rice', 'portions']]);
      return N('A ' + fx(n * P / 1000) + ' kg ' + it[0] + ' is split into ' + P + ' g ' + it[1] + '. How many ' + it[1] + ' are there?', n, { s: fx(n * P / 1000) + ' kg = ' + n * P + ' g. ' + n * P + ' ÷ ' + P + ' = ' + n + '.', w: wr(n, [[n * P / 1000 / P, 'Change the kilograms to grams before dividing.']]) });
    }),
    tpl('area', (r) => {
      const a = r.int(2, 12), b = r.int(2, 12);
      if (r.bool()) return N('A rectangular rug is ' + a + ' m long and ' + b + ' m wide. What is its area in cm²?', a * b * 10000, { s: a + ' m = ' + a * 100 + ' cm and ' + b + ' m = ' + b * 100 + ' cm. Area = ' + a * 100 + ' × ' + b * 100 + ' = ' + a * b * 10000 + ' cm².', w: wr(a * b * 10000, [[a * b * 100, 'You used the length factor 100 once. Area uses it twice: 100 × 100 = 10 000.']]) });
      return N('A floor tile is ' + a * 10 + ' cm by ' + b * 10 + ' cm. What is its area in cm²?', a * b * 100, { s: a * 10 + ' × ' + b * 10 + ' = ' + a * b * 100 + ' cm².' });
    }),
    tpl('longest', (r) => {
      const vals = r.distinct(3, 2, 60);
      const types = r.shuffle([['m', 100], ['cm', 1], ['mm', 0.1]]);
      const opts = types.map(([u, f], i) => ({ txt: vals[i] * (u === 'cm' ? 10 : u === 'mm' ? 100 : 1) + ' ' + u, cm: vals[i] * (u === 'cm' ? 10 : u === 'mm' ? 100 : 1) * f }));
      const best = opts.reduce((x, y) => (y.cm > x.cm ? y : x));
      if (new Set(opts.map((o) => o.cm)).size < 3) return N('How many cm in 1 m?', 100, { s: '1 m = 100 cm.' });
      return choice(r, 'Which length is the longest?', best.txt, opts.filter((o) => o !== best).map((o) => [o.txt, 'Convert everything to centimetres before comparing. Do not compare the bare numbers.']), { s: 'In centimetres: ' + opts.map((o) => o.txt + ' = ' + fx(o.cm) + ' cm').join(', ') + '. The longest is ' + best.txt + '.' });
    }),
    tpl('pieces', (r) => {
      const b = r.pick([20, 25, 40, 50, 30, 15]);
      let n; do { n = r.int(4, 24); } while ((n * b) % 10 !== 0);
      return N('A ' + fx(n * b / 100) + ' m ribbon is cut into pieces of ' + b + ' cm each. How many pieces are there?', n, { s: fx(n * b / 100) + ' m = ' + n * b + ' cm. ' + n * b + ' ÷ ' + b + ' = ' + n + ' pieces.', w: wr(n, [[n * b / 100 / b, 'Change metres to centimetres first so both lengths use the same unit.']]) });
    }),
    tpl('fraction', (r) => {
      if (r.bool()) { const m = r.pick([5, 10, 15, 20, 25, 30, 40, 45, 50]), c = r.int(0, 2); const f = R(m, 60); return N('What fraction of an hour is ' + m + ' minutes' + (c ? ' of homework' : '') + '? Give a fraction.', fmt(f), { s: m + ' minutes out of 60: {' + m + '/60} = ' + fmt(f) + '.', w: [[String(m), 'A fraction of an hour compares to 60 minutes. Write {' + m + '/60}.']] }); }
      const h = r.int(1, 23); const f = R(h, 24);
      return N('What fraction of a day is ' + h + ' hours? Give a fraction.', fmt(f), { s: h + ' hours out of 24: {' + h + '/24} = ' + fmt(f) + '.', w: [[String(h), 'A day has 24 hours. Write {' + h + '/24}.']] });
    }),
  ],
});
