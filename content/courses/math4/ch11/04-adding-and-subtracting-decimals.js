import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';
import { dec } from '../../../../src/widgets/decimals.js';

const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };

export default lesson({
  id: 'm4-11-4-adding-and-subtracting-decimals',
  title: 'Adding and subtracting decimals',
  blurb: 'Line up the decimal points, regroup tenths and hundredths, and solve money and missing-digit puzzles.',
  concepts: ['decimals', 'addition', 'subtraction', 'money'],

  tryFirst: [
    num('t1', 'Ben has $3.45. He finds $2.80 on the street. How many dollars does he have now?', '6.25', {
      h: ['Add dollars to dollars and cents to cents.', '45 cents + 80 cents is more than a dollar.'],
      s: 'Dollars: 3 + 2 = 5. Cents: 45 + 80 = 125 cents = 1 dollar and 25 cents. Total: 6.25 dollars.',
      w: [['5.125', 'The cents added up to more than 100. Regroup 100 cents into 1 dollar.'], ['5.25', 'You forgot to carry the extra dollar from the cents.']],
    }),
    num('t2', 'A 1 metre ribbon has 0.37 m cut off. How many metres are left?', '0.63', {
      h: ['1 metre is 100 centimetres.', '0.37 m is 37 cm.'],
      s: '100 cm − 37 cm = 63 cm = 0.63 m.',
      w: [['0.73', 'That would be 0.27 cut off. Check: 0.73 + 0.37 = 1.10.'], ['0.67', 'Check by adding back: 0.67 + 0.37 = 1.04, not 1.']],
    }),
  ],

  learn: [
    p('To add or subtract decimals, the digits must have the same place value. Tenths with tenths, hundredths with hundredths. The way to do that is to <b>line up the decimal points</b>.'),
    rule('<b>Line up the points.</b> Write the numbers in a column with the decimal points exactly above one another. Fill empty places with zeros if it helps. Then add or subtract as with whole numbers, working from the right.'),
    def('regroup', 'To trade between places. Ten hundredths make one tenth. Ten tenths make one whole. We regroup when we carry in addition or borrow in subtraction.'),
    def('sum and difference', 'The <b>sum</b> is the answer to an addition. The <b>difference</b> is the answer to a subtraction.'),
    widget('decimalGrid', { a: 35, b: 48 }),
    p('The grid shows 0.35 + 0.48. That is 35 hundredths plus 48 hundredths. Together there are 83 hundredths: 0.83. Now try 0.75 + 0.48. That is 123 hundredths. Ten hundredths make one tenth and ten tenths make one whole, so we regroup: 123 hundredths is 1.23.'),
    key('Adding decimals is adding like units. 3 tenths + 4 tenths = 7 tenths, just as 3 apples + 4 apples = 7 apples. That is why the places must match.'),
    ex('Adding with regrouping', ['Find 5.6 + 3.75.', 'Write 5.6 as 5.60 so both have two places.', 'Hundredths: 0 + 5 = 5. Tenths: 6 + 7 = 13 tenths. Write 3 in the tenths place and carry 1 to the ones.', 'Ones: 5 + 3 + 1 = 9.', 'Answer: 9.35.']),
    ex('Subtracting from a whole number', ['Find 6 − 2.48.', 'Write 6 as 6.00.', 'Think: 6.00 is 600 hundredths. 248 hundredths taken away leaves 352 hundredths.', 'Answer: 3.52. Check: 3.52 + 2.48 = 6.00.']),
    rule('<b>Check by the opposite operation.</b> After subtracting, add the answer to the number you took away. You should get back to the start.'),
    p('<b>Money</b> uses two decimal places. $10 − $6.85 means 1000 cents − 685 cents = 315 cents = $3.15. Change from a purchase is a subtraction.'),
    tbl(['Problem', 'In hundredths', 'Answer'], [['0.6 + 0.07', '60 + 7', '0.67'], ['1.5 − 0.25', '150 − 25', '1.25'], ['3 − 0.01', '300 − 1', '2.99']], 'Changing to hundredths'),
    tip('If you are unsure, change everything to the smallest place and work with whole numbers. 1.5 − 0.25 is 150 hundredths − 25 hundredths = 125 hundredths = 1.25. Then estimate: 1.5 − 0.25 is a bit more than 1, so 1.25 makes sense.'),
    warn('<b>Watch out.</b> Do not line up the digits on the right. 3.4 + 2.25 is not 34 + 225. The 4 is in the tenths place and must be above the 2 in the tenths place of 2.25. Right answer: 5.65.'),
    mcq('Ava says: "3.4 + 2.25 = 2.59, because 34 + 225 = 259." What is wrong?', ['Nothing, she is right.', 'She lined up the digits on the right instead of the decimal points. 3.40 + 2.25 = 5.65.', 'She should have subtracted.'], 1, 'The 3.4 should be 3.40. Then 340 + 225 = 565 hundredths, which is 5.65. A sum of two numbers can never be smaller than either one.', 'Spot the mistake'),
    recap([['line up the points', 'same places go in the same column'], ['regroup', 'trade 10 of a small place for 1 of the next place'], ['check', 'add back after subtracting']], [['Tenths and hundredths', '10 hundredths = 1 tenth'], ['Money', '$1 = 100 cents']]),
  ],

  practice: [
    num('p1', 'Find 4.7 + 2.85.', '7.55', {
      h: ['Write 4.7 as 4.70.'],
      s: '470 + 285 = 755 hundredths = 7.55.',
      w: [['6.92', 'You lined up the right edges. Line up the decimal points: 4.70 + 2.85.'], ['6.55', 'You forgot to carry. 7 tenths + 8 tenths = 15 tenths, which is 1 whole and 5 tenths.']],
    }),
    num('p2', 'Find 10 − 3.46.', '6.54', {
      h: ['10 = 10.00.'],
      s: '1000 − 346 = 654 hundredths = 6.54. Check: 6.54 + 3.46 = 10.00.',
      w: [['7.54', 'You did not regroup. Check: 7.54 + 3.46 = 11.'], ['6.64', 'Check: 6.64 + 3.46 = 10.10, which is too big.']],
    }),
    num('p3', 'Mia pays for a $13.75 meal with a $20 bill. How many dollars of change does she get?', '6.25', {
      h: ['Change is 20 − 13.75.'],
      s: '2000 − 1375 = 625 cents = $6.25.',
      w: [['7.25', 'Add back to check: 7.25 + 13.75 = 21.'], ['6.75', 'Check: 6.75 + 13.75 = 20.50.']],
    }),
    num('p4', 'Find the missing digit: 3.☐4 + 1.57 = 4.91.', 3, {
      h: ['Subtract 1.57 from 4.91 to find the missing number.'],
      s: '4.91 − 1.57 = 3.34. The missing digit is 3.',
      w: [['4', 'Check: 3.44 + 1.57 = 5.01, not 4.91.'], ['2', 'Check: 3.24 + 1.57 = 4.81, not 4.91.']],
    }),
    num('p5', 'Find 0.7 + 0.07 + 0.007.', '0.777', {
      h: ['Use thousandths: 700 + 70 + 7.'],
      s: '700 + 70 + 7 = 777 thousandths = 0.777.',
      w: [['0.021', 'The three 7s are in different places, so add them as 700, 70 and 7 thousandths.']],
    }),
    num('p6', 'Two decimals add to 5.2. Their difference is 1.4. What is the larger one?', '3.3', {
      h: ['If you take the difference out, the two numbers become equal.', 'Take 1.4 off the sum and split the rest in half.'],
      s: 'Make the larger number 1.4 smaller and the two numbers become equal. Their sum is then 5.2 − 1.4 = 3.8, so each is 1.9. The larger is 1.9 + 1.4 = 3.3. Check: 3.3 + 1.9 = 5.2 and 3.3 − 1.9 = 1.4.',
      w: [['1.9', 'That is the smaller number. The question asks for the larger.'], ['3.8', 'That is the sum minus the difference. Split it into two equal parts first.']],
    }),
    num('p7', 'Three items cost $4.75, $2.90 and $6.30. You pay with a $20 bill. How many dollars of change?', '6.05', {
      h: ['Find the total cost first.'],
      s: '4.75 + 2.90 + 6.30 = 13.95. Then 20 − 13.95 = 6.05.',
      w: [['6.95', 'You may have missed a regroup. Check: 6.95 + 13.95 = 20.90.'], ['13.95', 'That is what the items cost. The question asks for the change.']],
    }),
    num('p8', 'A tank holds 12.5 litres. You pour out 3.75 litres, then pour in 1.6 litres. How many litres are in the tank?', '10.35', {
      h: ['Do the two steps in order.'],
      s: '12.50 − 3.75 = 8.75. Then 8.75 + 1.60 = 10.35 litres.',
      w: [['8.75', 'That is after the pouring out. There is a second step.'], ['17.85', 'You added both. Pouring out takes away.']],
    }),
  ],

  challenge: [
    chain('Three jugs', 'Jug A holds 2.75 litres. Jug B holds 0.9 litres less than Jug A. Jug C holds 1.25 litres more than A and B together.', [
      num('c1a', 'How many litres does Jug B hold?', '1.85', { h: ['Subtract 0.9 from 2.75.'], s: '2.75 − 0.90 = 1.85.' }),
      num('c1b', 'How many litres does Jug C hold?', '5.85', { h: ['First A and B together: 2.75 + 1.85.'], s: 'A + B = 4.60. Jug C = 4.60 + 1.25 = 5.85 litres.' }),
      num('c1c', 'How many litres do the three jugs hold altogether?', '10.45', { h: ['Add A, B and C.'], s: '2.75 + 1.85 + 5.85 = 10.45 litres. (A + B is 4.60, and 4.60 + 5.85 = 10.45.)' }),
    ], 'The idea: break a long problem into small steps, and write each result with the same number of places so you can line the points up.'),
    chain('Rows that add to 3.5', 'In a puzzle, every row of three numbers must add to 3.5.', [
      num('c2a', 'A row has 1.2, a missing number, and 0.7. What is the missing number?', '1.6', { h: ['Add the two known numbers first.'], s: '1.2 + 0.7 = 1.9. 3.5 − 1.9 = 1.6.' }),
      num('c2b', 'Another row has 2.05, 0.9 and a missing number. What is the missing number?', '0.55', { h: ['2.05 + 0.9 = 2.95.'], s: '3.5 − 2.95 = 0.55.' }),
      num('c2c', 'How much greater is 1.6 than 0.55?', '1.05', { h: ['Subtract with the points lined up.'], s: '1.60 − 0.55 = 1.05.' }),
    ], 'The idea: to find a missing part, subtract the known parts from the total. Then check by adding everything back.'),
    mc('c3', 'Find the error. Dev subtracts 5 − 2.37 and gets 3.37. Which is the best correction?', ['He wrote 5 as 5.00 and did not regroup. 5.00 − 2.37 = 2.63.', 'He is right, because 5 − 2 = 3.', 'The answer is 3.63.', 'The answer is 2.37.'], 0, {
      s: '5.00 − 2.37 = 2.63. Check by adding: 2.63 + 2.37 = 5.00. And 3.37 + 2.37 = 5.74, not 5.',
      w: [[1, 'Check by adding back: 3.37 + 2.37 is more than 5.'], [2, 'Check by adding back: 3.63 + 2.37 = 6.']],
    }),
  ],

  quiz: [
    tpl('add', (r) => {
      const a = r.int(100, 9999), b = r.int(100, 9999), pa = r.pick([1, 2]), pb = r.pick([1, 2]);
      const A = a * 10 ** (2 - pa), B = b * 10 ** (2 - pb), S = A + B;
      return N('Find ' + dec(a, pa) + ' + ' + dec(b, pb) + '.', dec(S, 2), { s: 'Line up the points: ' + dec(A, 2) + ' + ' + dec(B, 2) + ' = ' + dec(S, 2) + '.', w: W(dec(S, 2), [[dec(a + b, Math.max(pa, pb)), 'You lined up the right edges. Line up the decimal points.']]) });
    }),
    tpl('sub', (r) => {
      const A = r.int(500, 9999), B = r.int(100, A - 100), pa = r.pick([1, 2]), pb = r.pick([1, 2]);
      const Ah = A * 10 ** (2 - pa) , Bh = B * 10 ** (2 - pb);
      if (Ah <= Bh) return N('Find ' + dec(A, pa) + ' − 0.5.', dec(Ah - 50, 2), { s: dec(Ah, 2) + ' − 0.50 = ' + dec(Ah - 50, 2) + '.' });
      return N('Find ' + dec(A, pa) + ' − ' + dec(B, pb) + '.', dec(Ah - Bh, 2), { s: dec(Ah, 2) + ' − ' + dec(Bh, 2) + ' = ' + dec(Ah - Bh, 2) + '. Check: ' + dec(Ah - Bh, 2) + ' + ' + dec(Bh, 2) + ' = ' + dec(Ah, 2) + '.', w: pa === pb ? [] : W(dec(Ah - Bh, 2), [[dec(A - B, Math.max(pa, pb)), 'You lined up the right edges. Line up the decimal points.']]) });
    }),
    tpl('fromwhole', (r) => {
      const w = r.pick([1, 5, 10, 20, 50]), c = r.int(w === 1 ? 5 : 101, w * 100 - 1);
      return N('A snack costs $' + dec(c, 2) + '. You pay with $' + w + '. How many dollars of change?', dec(w * 100 - c, 2), { s: w + (w === 1 ? ' dollar = ' : ' dollars = ') + w * 100 + ' cents. ' + w * 100 + ' − ' + c + ' = ' + (w * 100 - c) + ' cents = $' + dec(w * 100 - c, 2) + '.', w: W(dec(w * 100 - c, 2), [[dec(c, 2), 'That is the price. The question asks for the change.']]) });
    }),
    tpl('three', (r) => {
      const a = r.int(100, 900), b = r.int(100, 900), c = r.int(100, 900);
      return N('Find ' + dec(a, 2) + ' + ' + dec(b, 2) + ' + ' + dec(c, 2) + '.', dec(a + b + c, 2), { s: dec(a, 2) + ' + ' + dec(b, 2) + ' = ' + dec(a + b, 2) + '. Then add ' + dec(c, 2) + ': ' + dec(a + b + c, 2) + '.' });
    }),
    tpl('digit', (r) => {
      const a = r.int(100, 899), b = r.int(100, 899), hide = r.int(0, 2);
      const sa = dec(a, 2);
      const digs = sa.replace('.', '').split('');
      const hidden = digs[hide];
      const shown = digs.map((d, i) => (i === hide ? '☐' : d));
      const shownStr = shown[0] + '.' + shown[1] + shown[2];
      return N('Find the missing digit: ' + shownStr + ' + ' + dec(b, 2) + ' = ' + dec(a + b, 2) + '.', Number(hidden), { s: dec(a + b, 2) + ' − ' + dec(b, 2) + ' = ' + sa + '. The missing digit is ' + hidden + '.' });
    }),
    tpl('twostep', (r) => {
      const a = r.int(500, 1500), b = r.int(100, 400), c = r.int(100, 400), who = name(r);
      return N(who + ' has $' + dec(a, 2) + ', spends $' + dec(b, 2) + ' on a book, then finds $' + dec(c, 2) + '. How many dollars does ' + who + ' have now?', dec(a - b + c, 2), { s: dec(a, 2) + ' − ' + dec(b, 2) + ' = ' + dec(a - b, 2) + '. Then + ' + dec(c, 2) + ' = ' + dec(a - b + c, 2) + '.', w: W(dec(a - b + c, 2), [[dec(a - b - c, 2), 'Finding money adds. Do not subtract the second amount.']]) });
    }),
    tpl('sumdiff', (r) => {
      const small = r.int(50, 400), d = r.int(10, 300);
      const large = small + d, sum = small + large;
      return N('Two decimals have a sum of ' + dec(sum, 2) + ' and a difference of ' + dec(d, 2) + '. What is the larger one?', dec(large, 2), { s: 'Take the difference off the sum: ' + dec(sum - d, 2) + ' is two equal smaller numbers, each ' + dec(small, 2) + '. The larger is ' + dec(small, 2) + ' + ' + dec(d, 2) + ' = ' + dec(large, 2) + '.', w: W(dec(large, 2), [[dec(small, 2), 'That is the smaller number. The question asks for the larger.']]) });
    }),
  ],
});
