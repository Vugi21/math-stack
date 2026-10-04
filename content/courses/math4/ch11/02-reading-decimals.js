import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';
import { dec } from '../../../../src/widgets/decimals.js';

const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'm4-11-2-reading-decimals',
  title: 'Reading decimals',
  blurb: 'Say and write decimals, then use them for money, measurements and the number line.',
  concepts: ['decimals', 'money', 'measurement', 'number-line'],

  tryFirst: [
    num('t1', 'A pencil is 12 cm and 7 mm long. There are 10 mm in 1 cm. How long is the pencil in centimetres? Write a decimal.', '12.7', {
      h: ['Each millimetre is one tenth of a centimetre.', '7 mm is 7 tenths of a centimetre.'],
      s: '7 mm = 0.7 cm. The pencil is 12 + 0.7 = 12.7 cm long.',
      w: [['12.07', 'That is 7 hundredths. A millimetre is one tenth of a centimetre, not one hundredth.'], ['19', 'You added 12 and 7. Millimetres are smaller than centimetres.']],
    }),
    num('t2', 'A bike ride is 4.25 km. There are 1000 metres in 1 km. How many metres is the ride?', 4250, {
      h: ['4 km is 4000 m.', '0.25 km is a quarter of a kilometre.'],
      s: '4 km = 4000 m. 0.25 km = 250 m, because a quarter of 1000 is 250. The total is 4250 m.',
      w: [['425', 'That multiplies by 100. Each kilometre is 1000 metres.'], ['4025', 'That treats 25 as 25 metres. 0.25 km is 250 m.']],
    }),
  ],

  learn: [
    p('To read a decimal, say the whole part. Say "and" for the point. Then say the digits after the point as one number, and finish with the name of the last place.'),
    tbl(['Decimal', 'How to say it'], [['3.4', 'three and four tenths'], ['3.04', 'three and four hundredths'], ['0.047', 'forty-seven thousandths'], ['12.508', 'twelve and five hundred eight thousandths']], 'Reading decimals'),
    rule('<b>The last digit names the place.</b> 0.047 ends in the thousandths place. So it is "forty-seven thousandths" and equals {47/1000}.'),
    key('Reading the digits one by one, like "three point zero four", does not show the size of the number. "Three and four hundredths" does.'),
    def('place name', 'The word that tells what the last digit is worth: tenths, hundredths or thousandths. It is the last word you say when you read the decimal.'),
    def('hundredth', 'One of 100 equal parts of a whole. It is written 0.01 or {1/100}. A cent is one hundredth of a dollar.'),
    p('<b>Money</b> is a decimal. One dollar is 100 cents, so one cent is one hundredth of a dollar. $3.45 is 3 dollars and 45 hundredths of a dollar. A dime is 0.10 dollars. A penny is 0.01 dollars.'),
    ex('Counting coins', ['I have 5 dollar bills, 4 dimes and 6 pennies. How many dollars?', 'Dimes are tenths of a dollar: 4 dimes = 0.4.', 'Pennies are hundredths: 6 pennies = 0.06.', 'Total: 5 + 0.4 + 0.06 = 5.46 dollars.']),
    p('<b>Measurements</b> use decimals too. A millimetre is a tenth of a centimetre. A centimetre is a hundredth of a metre. A metre is a thousandth of a kilometre.'),
    formula('Metric units as decimals', '1 cm = 0.01 m   1 mm = 0.001 m   1 m = 0.001 km', 'So 2 m 48 cm is 2.48 m. And 3 km 40 m is 3.040 km, because 40 m is 40 thousandths of a km.'),
    ex('Changing units', ['Write 4 m 7 cm in metres.', '7 cm is 7 hundredths of a metre: 0.07 m.', 'So 4 m 7 cm = 4.07 m. The zero is needed. 4.7 m would be 4 m 70 cm.']),
    widget('roundingLine', { v: 3846, place: 1 }),
    p('The number line above zooms in. Between 3.8 and 3.9 there are 10 equal steps. Each step is 0.01. A point on the 6th mark after 3.8 is at 3.86.'),
    rule('<b>Zooming in.</b> Between two neighbouring tenths, cut the gap into 10 steps of one hundredth. Between two neighbouring hundredths, cut into 10 steps of one thousandth.'),
    tip('For money, always write two places after the point: $3.40, not $3.4. For measurements, ask which place the unit is: centimetres are hundredths of a metre, so two places.'),
    warn('<b>Watch out.</b> $3.4 is three dollars and <i>forty</i> cents, not three dollars and four cents. Money needs two places after the point, so write $3.40. Four cents is $3.04.'),
    mcq('Ben says: "Three and four hundredths is 3.4." What is wrong?', ['Nothing, he is right.', 'Four hundredths has two digits after the point, and the first is a zero. The number is 3.04.', 'It should be 34.'], 1, '3.4 is three and four tenths. Four hundredths is 0.04, so the number is 3.04.', 'Spot the mistake'),
    recap([['say the point as "and"', '3.04 is three and four hundredths'], ['last digit', 'names the place you say at the end'], ['cent', 'one hundredth of a dollar'], ['millimetre', 'one thousandth of a metre']], [['Centimetres to metres', '1 cm = 0.01 m'], ['Millimetres to metres', '1 mm = 0.001 m']]),
  ],

  practice: [
    num('p1', 'Write "forty-two and six hundredths" as a decimal.', '42.06', {
      h: ['Hundredths need two places after the point.'],
      s: '42 for the whole part. Six hundredths is 0.06. Together: 42.06.',
      w: [['42.6', 'That is forty-two and six tenths. Hundredths need a zero in the tenths place.'], ['42.006', 'That is six thousandths. Hundredths need two places.']],
    }),
    num('p2', 'Write "nine thousandths" as a decimal.', '0.009', {
      h: ['Thousandths need three places after the point.'],
      s: 'Nine thousandths is {9/1000}. Three places: 0.009.',
      w: [['0.9', 'That is nine tenths.'], ['0.09', 'That is nine hundredths. Thousandths need one more place.']],
    }),
    num('p3', 'A toy costs $4.07. How many cents is that?', 407, {
      h: ['4 dollars is 400 cents.', '0.07 dollars is 7 cents.'],
      s: '$4.07 is 4 dollars and 7 cents. 400 + 7 = 407 cents.',
      w: [['47', 'That drops the zero. $4.07 is not $4.70.'], ['4070', 'There are 100 cents in a dollar, not 1000.']],
    }),
    num('p4', 'The number line from 0.3 to 0.4 is cut into 10 equal steps. A point is on the 7th mark after 0.3. What number is it?', '0.37', {
      h: ['Each step is one hundredth.'],
      s: 'Each step is 0.01. 7 steps after 0.3 is 0.3 + 0.07 = 0.37.',
      w: [['0.307', 'Each step is one hundredth, not one thousandth.'], ['0.73', 'You swapped the digits. The point is just after 0.3.']],
    }),
    num('p5', 'A rope is 2 m and 35 cm long. How many metres is that? Write a decimal.', '2.35', {
      h: ['35 cm is 35 hundredths of a metre.'],
      s: '1 cm = 0.01 m, so 35 cm = 0.35 m. Total: 2.35 m.',
      w: [['2.035', 'That is 35 thousandths. Each cm is a hundredth of a metre.'], ['2.5', 'Thirty-five hundredths is not five tenths. Write it with two places.']],
    }),
    num('p6', 'I have 7 dollar bills, 3 dimes and 8 pennies. How many dollars do I have? Write a decimal.', '7.38', {
      h: ['Dimes are tenths. Pennies are hundredths.'],
      s: '7 + 0.3 + 0.08 = 7.38.',
      w: [['7.308', 'Pennies are hundredths, not thousandths.'], ['18', 'You added 7 + 3 + 8, but the coins are worth different amounts.']],
    }),
    num('p7', 'What decimal is exactly halfway between 0.4 and 0.5?', '0.45', {
      h: ['Zoom in: cut the gap from 0.4 to 0.5 into 10 steps. Halfway is step 5.'],
      s: 'The steps are hundredths. 5 steps after 0.4 is 0.45.',
      w: [['0.5', 'That is the right end of the gap, not the middle.'], ['0.405', 'That is 5 thousandths after 0.4. Halfway is 5 hundredths.']],
    }),
    num('p8', 'A number line from 1.2 to 1.3 has marks for each hundredth. A point is 6 marks before 1.3. What number is it?', '1.24', {
      h: ['The marks between are 1.21, 1.22, and so on. Count back from 1.3.'],
      s: '1.3 is 1.30. 6 hundredths before is 1.30 − 0.06 = 1.24.',
      w: [['1.36', 'That is 6 marks after 1.3. The point is before it.'], ['1.26', 'That counts 6 marks forward from 1.2. The question counts backward from 1.3.']],
    }),
  ],

  challenge: [
    chain('Reading a ruler', 'A ruler is marked in centimetres, with a small mark for every millimetre. Line A ends at the 6th small mark after 14 cm.', [
      num('c1a', 'How long is line A in centimetres?', '14.6', { h: ['The 6th small mark is 6 millimetres.'], s: '6 mm = 0.6 cm. The line is 14.6 cm.' }),
      num('c1b', 'Line B is 9 mm longer than line A. How long is line B in centimetres?', '15.5', { h: ['9 mm is 0.9 cm.'], s: '14.6 + 0.9 = 15.5 cm. (6 mm + 9 mm = 15 mm = 1 cm 5 mm.)' }),
      num('c1c', 'How many millimetres long is line B?', 155, { h: ['15.5 cm has 15 whole cm and 5 mm.'], s: '15 cm = 150 mm. Plus 5 mm: 155 mm.' }),
    ], 'The idea: a millimetre is one tenth of a centimetre. Moving between mm and cm is moving the decimal point one place.'),
    chain('The coin jar', 'A jar holds 13 quarters. A quarter is worth 0.25 dollars.', [
      num('c2a', 'How many dollars are in the jar? Write a decimal.', '3.25', { h: ['4 quarters make 1 dollar.'], s: '13 quarters = 3 dollars (12 quarters) plus one quarter. 3 + 0.25 = 3.25 dollars.' }),
      num('c2b', 'Now 17 dimes are added. How many dollars are in the jar? Write a decimal.', '4.95', { h: ['17 dimes is 170 cents.'], s: '17 dimes = 1.70 dollars. 3.25 + 1.70 = 4.95.' }),
      num('c2c', 'How many more cents are needed to reach 10 dollars?', 505, { h: ['Subtract 4.95 from 10, then change to cents.'], s: '10 − 4.95 = 5.05 dollars = 505 cents.' }),
    ], 'The idea: change everything to the same unit (all cents or all dollars) before you compare or combine.'),
    mc('c3', 'Find the error. Mia reads a measurement: "A rope is 3 m 4 cm, which is 3.4 m." Which is the best correction?', ['4 cm is 4 hundredths of a metre, so the rope is 3.04 m.', 'The rope is 34 m.', 'The rope is 3.004 m.', 'Mia is right.'], 0, {
      s: '1 cm = 0.01 m. 4 cm = 0.04 m. The rope is 3.04 m. The number 3.4 m would be 3 m 40 cm.',
      w: [[2, 'A centimetre is a hundredth of a metre, not a thousandth. A millimetre is a thousandth.'], [3, '3.4 m is 3 m 40 cm.']],
    }),
  ],

  quiz: [
    tpl('words', (r) => {
      const w = r.int(0, 60), places = r.pick([1, 2, 3]), k = r.int(1, 10 ** places - 1);
      const names = ['tenths', 'hundredths', 'thousandths'];
      const q = (w ? 'Write "' + w + ' and ' + k + ' ' + names[places - 1] + '" as a decimal.' : 'Write "' + k + ' ' + names[places - 1] + '" as a decimal.');
      const v = dec(w * 10 ** places + k, places);
      return N(q, v, { s: 'The last place is ' + names[places - 1] + ', so there are ' + places + ' digit' + (places > 1 ? 's' : '') + ' after the point: ' + v + '.', w: W(v, [[dec(w * 10 ** (places + 1) + k, places + 1), 'That uses one place too many. The place name tells you how many digits go after the point.']]) });
    }),
    tpl('cents', (r) => {
      const d = r.int(1, 30), c = r.int(1, 99), cents = d * 100 + c;
      return N('A book costs $' + dec(cents, 2) + '. How many cents is that?', cents, { s: d + (d === 1 ? ' dollar' : ' dollars') + ' is ' + d * 100 + ' cents. Plus ' + c + (c === 1 ? ' cent' : ' cents') + ' is ' + cents + '.' });
    }),
    tpl('coins', (r) => {
      const d = r.int(1, 15), di = r.int(1, 9), pe = r.int(1, 9);
      const v = dec(d * 100 + di * 10 + pe, 2);
      return N('I have ' + d + (d === 1 ? ' dollar bill, ' : ' dollar bills, ') + di + (di === 1 ? ' dime and ' : ' dimes and ') + pe + (pe === 1 ? ' penny' : ' pennies') + '. How many dollars is that? Write a decimal.', v, { s: 'Dimes are tenths: ' + dec(di, 1) + '. Pennies are hundredths: ' + dec(pe, 2) + '. Total: ' + v + '.', w: W(v, [[dec(d * 1000 + di * 100 + pe, 3), 'Pennies are hundredths of a dollar, not thousandths.']]) });
    }),
    tpl('metres', (r) => {
      const m = r.int(1, 20), cm = r.int(1, 99);
      return N('A board is ' + m + ' m and ' + cm + ' cm long. How many metres is that? Write a decimal.', dec(m * 100 + cm, 2), { s: cm + ' cm = ' + dec(cm, 2) + ' m. Total: ' + dec(m * 100 + cm, 2) + ' m.', w: W(dec(m * 100 + cm, 2), [[dec(m * 1000 + cm, 3), 'A centimetre is a hundredth of a metre, not a thousandth.']]) });
    }),
    tpl('km', (r) => {
      const km = r.int(1, 12), m = r.int(1, 999);
      return N('A trail is ' + km + ' km and ' + m + ' m long. How many km is that? Write a decimal.', dec(km * 1000 + m, 3), { s: m + ' m = ' + dec(m, 3) + ' km. Total: ' + dec(km * 1000 + m, 3) + ' km.', w: W(dec(km * 1000 + m, 3), [[dec(km * 100 + m, 2), 'A metre is one thousandth of a kilometre. Use three places.']]) });
    }),
    tpl('step', (r) => {
      const t = r.int(10, 89), s = r.int(1, 9), k = t * 10 + s;
      return N('A number line goes from ' + dec(t, 2) + ' to ' + dec(t + 1, 2) + ', with 10 equal steps. A point is on the ' + s + (s === 1 ? 'st' : s === 2 ? 'nd' : s === 3 ? 'rd' : 'th') + ' mark after ' + dec(t, 2) + '. What number is it?', dec(k, 3), { s: 'Each step is 0.001. ' + s + (s === 1 ? ' step after ' : ' steps after ') + dec(t, 2) + ' is ' + dec(k, 3) + '.', w: W(dec(k, 3), [[dec(t + s, 2), 'Each step is one thousandth, not one hundredth. There are three places after the point.']]) });
    }),
    tpl('half', (r) => {
      const a = r.int(1, 90);
      return N('What decimal is exactly halfway between ' + dec(a, 1) + ' and ' + dec(a + 1, 1) + '?', dec(a * 10 + 5, 2), { s: 'Cut the gap into 10 steps of one hundredth. Halfway is 5 steps: ' + dec(a * 10 + 5, 2) + '.' });
    }),
    tpl('mm', (r) => {
      const c = r.int(1, 40), t = r.int(1, 9), who = name(r);
      return N(who + '\'s pencil is ' + dec(c * 10 + t, 1) + ' cm long. How many millimetres is that?', c * 10 + t, { s: 'Each tenth of a centimetre is 1 mm. ' + dec(c * 10 + t, 1) + ' cm is ' + c * 10 + t + ' tenths of a cm, so ' + (c * 10 + t) + ' mm.', w: W(c * 10 + t, [[c * 100 + t * 10, 'There are 10 mm in a cm, not 100.']]) });
    }),
  ],
});
