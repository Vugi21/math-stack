import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

// exact decimal string for the integer k scaled by 10^places
const D = (k, places) => {
  const neg = k < 0, s = String(Math.abs(k)).padStart(places + 1, '0');
  return (neg ? '-' : '') + (places ? s.slice(0, s.length - places) + '.' + s.slice(s.length - places) : s);
};
const P10 = (n) => Math.pow(10, n);

export default lesson({
  id: 'pre-6-1-decimal-arithmetic',
  title: 'Decimal arithmetic',
  blurb: 'Add, subtract, multiply and divide decimals by thinking in tenths and hundredths, not by memorising where the point goes.',
  concepts: ['decimals', 'place-value', 'decimal-operations'],

  tryFirst: [
    num('t1', 'A ribbon is 2.5 m long. Ava cuts off 0.75 m. How many metres are left?', '1.75', {
      h: ['Write 2.5 as 2.50 so both numbers have hundredths.', '250 hundredths minus 75 hundredths.'],
      s: '2.50 − 0.75: in hundredths that is 250 − 75 = 175 hundredths, which is 1.75 m.',
      w: [['2.25', 'That is 2.5 − 0.25. Make sure you take away all of 0.75, not just 0.25.'], ['1.25', 'Check your borrowing. 250 − 75 is 175, not 125.']],
    }),
    num('t2', 'Before you calculate, decide: will 0.3 × 0.3 be bigger than 0.3 or smaller than 0.3? Then find the product.', '0.09', {
      h: ['0.3 is 3 tenths. Taking 3 tenths of something gives a part of it, so the answer is smaller.', 'Try 3 × 3 = 9, then decide what size of piece 9 is.'],
      s: 'A tenth of a tenth is a hundredth, so 3 tenths × 3 tenths = 9 hundredths = 0.09. It is smaller than 0.3, as predicted.',
      w: [['0.9', 'You did 3 × 3 = 9 but did not place the point. Tenths times tenths gives hundredths, so the 9 must sit in the hundredths place.']],
    }),
  ],

  learn: [
    p('A decimal is just a fraction with a denominator of 10, 100, 1000, … written in place value. 0.7 is 7 tenths. 0.07 is 7 hundredths. 0.35 is 35 hundredths, which is the same as 3 tenths and 5 hundredths. <b>Every decimal calculation is a calculation with tenths, hundredths or thousandths.</b> That one idea explains all the rules about where the point goes.'),
    def('decimal', 'A number written with a decimal point. The digits to the right of the point count pieces of a whole: tenths, then hundredths, then thousandths, and so on. 4.25 means 4 ones, 2 tenths and 5 hundredths, which equals 4 + {25/100}.'),
    def('place value', 'The value a digit has because of where it sits. Each place is <b>ten times</b> the place to its right and <b>one tenth</b> of the place to its left. That is true on both sides of the decimal point.'),
    tbl(['Number', 'Ones', 'Tenths', 'Hundredths', 'Thousandths', 'Written as a fraction'], [['5.304', '5', '3', '0', '4', '5 + {304/1000}'], ['0.07', '0', '0', '7', '', '{7/100}'], ['0.35', '0', '3', '5', '', '{35/100}']], 'Reading digits by place (an empty cell means that place is not written)'),
    widget('decimalGrid', { a: 35, b: 48 }),
    tip('<b>Trailing zeros do not change a decimal; zeros after the point and before a digit do.</b> 2.5 = 2.50 = 2.500, so you may add zeros on the right to line up places. But 2.05 is not 2.5: the zero in 2.05 holds the tenths place open. To compare 0.3 and 0.29, write 0.30 and 0.29: 30 hundredths is more than 29 hundredths, so 0.3 is larger even though it has fewer digits.'),
    rule('<b>Add and subtract: line up the decimal points.</b> The point lines up so that tenths sit over tenths and hundredths over hundredths. You can only add pieces of the same size. Fill empty places with zeros if it helps: 2.5 = 2.50.'),
    ex('Adding with different lengths', ['Find 12.4 + 0.375 + 3.', 'Line up the points and fill with zeros: 12.400, 0.375, 3.000.', 'In thousandths: 12 400 + 375 + 3 000 = 15 775.', 'So the sum is 15.775. A whole number such as 3 has its point at the far right: 3 = 3.0 = 3.000.']),
    ex('Subtracting from a whole number', ['Find 7 − 2.38.', 'Write 7 as 7.00 so every place has a digit.', 'In hundredths: 700 − 238 = 462.', 'So the answer is 4.62. Check: 4.62 + 2.38 = 7.00.']),
    p('<b>Multiplying.</b> A tenth of a tenth is a hundredth, so tenths × tenths gives hundredths. Hundredths × tenths gives thousandths. In general you can ignore the points, multiply the whole numbers, and then give the answer as many decimal places as the two factors had <i>together</i>.'),
    formula('Decimal places in a product', 'places(a × b) = places(a) + places(b)', 'Count the digits after the point in each factor and add. Do this <i>before</i> you drop any zeros at the end of the answer.'),
    ex('Multiply 0.6 × 0.07', ['Ignore the points: 6 × 7 = 42.', '0.6 has 1 place and 0.07 has 2 places. Together that is 3 places.', 'Put 42 into 3 places: 0.042.', 'Sense check: 0.6 is a bit more than half and 0.07 is small, so about 0.04 is believable.']),
    ex('A product that ends in zero', ['Find 0.25 × 1.6.', 'Ignore the points: 25 × 16 = 400.', 'Places: 2 + 1 = 3, so the answer is 0.400.', 'Drop the trailing zeros: 0.4. Check with fractions: a quarter of 1.6 is 0.4.']),
    rule('<b>Multiply:</b> count the decimal places in both factors and add them. The product has that many places. <b>Divide:</b> multiply the divisor and the dividend by the same power of 10 until the divisor is a whole number. That does not change the answer, because both numbers grow by the same factor.'),
    ex('Divide 3.6 ÷ 0.12', ['Shift both numbers 2 places right: 3.6 becomes 360 and 0.12 becomes 12.', '360 ÷ 12 = 30.', 'So 3.6 ÷ 0.12 = 30. Check: 30 × 0.12 = 3.6.', 'In words: how many 12-hundredths fit in 3 and 6 tenths? Thirty of them.']),
    ex('Shifting needs an extra zero', ['Find 7.5 ÷ 0.05.', 'The divisor 0.05 needs 2 places to become whole, so shift both numbers 2 places.', '7.5 becomes 750 (write a zero to fill the empty place) and 0.05 becomes 5.', '750 ÷ 5 = 150. Check: 150 × 0.05 = 7.5.']),
    tbl(['Move', 'Example', 'What happens'], [['× 10', '4.37 × 10 = 43.7', 'every digit moves one place left (it gets 10 times bigger)'], ['÷ 100', '52.8 ÷ 100 = 0.528', 'every digit moves two places right'], ['× 0.1', '52.8 × 0.1 = 5.28', 'same as ÷ 10: a tenth of it']], 'Powers of ten shift the digits, not the point'),
    warn('<b>Watch out.</b> When you multiply, you do <i>not</i> line the points up. Lining up is only for adding and subtracting. And multiplying by a number smaller than 1 makes the answer smaller; dividing by a number smaller than 1 makes it bigger. 6 ÷ 0.5 = 12, because there are twelve halves in 6.'),
    warn('<b>Watch out: shift both numbers, not just one.</b> To compute 4.8 ÷ 0.4, shifting only the divisor gives 4.8 ÷ 4, which is a different problem. Shift both: 48 ÷ 4 = 12. The shift must be the same for the dividend and the divisor.'),
    tip('<b>Estimate first.</b> Round each number to one easy digit and compute. 4.2 × 0.3 is about 4 × 0.3 = 1.2, so the answer must be near 1.2, not 12 or 0.12. An estimate catches almost every misplaced point.'),
    key('Decimals are tenths, hundredths and thousandths. Add and subtract by <b>lining up the points</b>. Multiply by <b>counting places</b> in both factors. Divide by <b>shifting both numbers</b> until the divisor is whole. Then estimate to check where the point belongs.'),
    mcq('Dev says "4.2 × 0.3 = 12.6 because 42 × 3 = 126 and the point goes after the first two digits." What is wrong?', ['Nothing: he is right.', 'The factors have 1 + 1 = 2 decimal places, so the product is 1.26, not 12.6.', 'You must line up the decimal points first, so it is 4.20 × 0.30 = 12.6.'], 1, 'He got the digits right (126) but placed the point wrongly. 4.2 and 0.3 each have one place, so the answer has two: 1.26. Check by estimating: 4 × 0.3 is about 1.2.', 'Spot the mistake'),
    recap([['decimal', 'a fraction over 10, 100, 1000, … written with a point'], ['place value', 'each place is 10 times the place on its right'], ['trailing zero', 'a zero at the far right after the point; it can be added or removed'], ['shifting', 'multiplying both numbers by the same power of 10, which keeps a quotient unchanged']], [['Add / subtract', 'line up the decimal points'], ['Multiply', 'places(a × b) = places(a) + places(b)'], ['Divide', 'shift both numbers until the divisor is whole']]),
  ],

  practice: [
    num('p1', 'Find 6.4 + 0.97.', '7.37', {
      h: ['Write 6.4 as 6.40, then add hundredths: 640 + 97.'],
      s: '6.40 + 0.97 = 7.37 (640 + 97 = 737 hundredths).',
      w: [['1.61', 'You added 64 + 97 as if both were in the same place. 6.4 has tenths, 0.97 has hundredths: line up the points.']],
    }),
    num('p2', 'Find 12 − 4.38.', '7.62', {
      h: ['12 = 12.00. In hundredths: 1200 − 438.'],
      s: '1200 − 438 = 762 hundredths = 7.62. Check: 7.62 + 4.38 = 12.00.',
      w: [['8.38', 'You subtracted 12 − 4 and then just glued on .38. But 12.00 − 0.38 needs a borrow: the hundredths part is being taken away, not kept.']],
    }),
    num('p3', 'Find 0.4 × 0.06.', '0.024', {
      h: ['4 × 6 = 24. Now count decimal places in the factors: 1 and 2.'],
      s: '4 × 6 = 24 and the factors have 1 + 2 = 3 places in all, so the answer is 0.024.',
      w: [['0.24', 'The factors have 3 decimal places together (one in 0.4, two in 0.06). The product needs 3 places.'], ['0.0024', 'That is one place too many. 1 + 2 = 3 places, not 4.']],
    }),
    num('p4', 'Find 7.2 ÷ 0.9.', '8', {
      h: ['Shift both numbers one place right so the divisor is whole.'],
      s: 'Multiply both by 10: 72 ÷ 9 = 8. Check: 8 × 0.9 = 7.2.',
      w: [['0.8', 'Dividing by a number smaller than 1 makes the answer bigger than 7.2, so 0.8 is far too small. Shift both numbers one place and use 72 ÷ 9.'], ['80', 'Shifting both numbers right gives 72 ÷ 9, and 72 ÷ 9 = 8. Do not shift again.']],
    }),
    mc('p5', 'Without computing exactly, which is closest to 8.4 × 0.5?', ['42', '4.2', '0.42', '16.8'], 1, {
      h: ['Multiplying by 0.5 means taking half.'],
      s: 'Half of 8.4 is 4.2.',
      w: [[0, 'You got the digits (42) but not the size. Half of 8.4 is a bit more than 4.'], [3, 'That doubles instead of halving. Multiplying by 0.5 takes half.']],
    }),
    num('p6', 'Use the four digits 2, 3, 4, 5, each exactly once, to make two numbers of the form _._ (a digit, a point, a digit), such as 2.3 and 4.5. What is the smallest possible sum of the two numbers?', '5.9', {
      h: ['A digit in the ones place is worth 10 times a digit in the tenths place.', 'Which two digits should go in the ones places to keep the sum small?'],
      s: 'Put the small digits 2 and 3 in the ones places and 4 and 5 in the tenths places: 2.4 + 3.5 = 5.9. (2.5 + 3.4 = 5.9 as well.) Any other arrangement puts a bigger digit in a ones place and costs more.',
      w: [['6.8', 'That is 2.3 + 4.5. A 4 or 5 in the ones place is worth 4 or 5 whole units. Move them to the tenths place.']],
    }),
    num('p7', 'A runner jogs a lap of 0.4 km, 6.5 times. How many kilometres is that?', '2.6', {
      h: ['65 × 4 = 260. Count the decimal places: 1 + 1.'],
      s: '0.4 × 6.5: 4 × 65 = 260 with 2 places gives 2.60 = 2.6 km. Check: 6 laps is 2.4 km and half a lap is 0.2 km.',
      w: [['26', 'You forgot the decimal places. The two factors have 2 places together.'], ['0.26', 'Two places puts the point in 2.60, not 0.26. Check by estimating: 6.5 laps of a bit under half a kilometre.']],
    }),
    num('p8', 'How many 0.08-litre cups can be filled from a 2.4-litre jug?', '30', {
      h: ['This is 2.4 ÷ 0.08. Shift both two places.'],
      s: '2.4 ÷ 0.08 = 240 ÷ 8 = 30 cups.',
      w: [['3', 'Shift both numbers two places, not one: 2.4 becomes 240 and 0.08 becomes 8.'], ['0.03', 'That is 0.08 ÷ 2.4. The question asks how many small cups fit in the big jug.']],
    }),
  ],

  challenge: [
    chain('The garden', 'A rectangular garden is 3.2 m long and 1.5 m wide.', [
      num('c1a', 'What is its area in square metres?', '4.8', { h: ['32 × 15 = 480, then place the point: 1 + 1 places.'], s: '3.2 × 1.5 = 4.80 = 4.8 square metres.' }),
      num('c1b', 'Fencing goes all the way around. What length of fence is needed, in metres?', '9.4', { h: ['Perimeter is 2 × (length + width).'], s: '2 × (3.2 + 1.5) = 2 × 4.7 = 9.4 m.' }),
      num('c1c', 'Fence costs $2.50 per metre. How many dollars for the whole fence?', '23.5', { h: ['9.4 × 2.5: try 9.4 × 2 and then half of 9.4.'], s: '9.4 × 2.5 = 18.8 + 4.7 = 23.5, so $23.50.' }),
    ], 'The idea: each step reuses the last answer. Keep track of what each number means (area, length, cost) so you know which operation to use.'),
    chain('Shift both', 'Dividing by a decimal can be turned into dividing by a whole number. Try this pattern.', [
      num('c2a', 'Find 4.5 ÷ 0.05.', '90', { h: ['Shift both numbers 2 places: 450 ÷ 5.'], s: '450 ÷ 5 = 90.' }),
      num('c2b', 'Find 0.45 ÷ 0.05.', '9', { h: ['Shift both 2 places: 45 ÷ 5.'], s: '45 ÷ 5 = 9.' }),
      num('c2c', 'Find 0.045 ÷ 0.05.', '0.9', { h: ['Shift both 3 places: 45 ÷ 50.'], s: '45 ÷ 50 = 0.9. Each time the dividend lost a place, the answer got 10 times smaller.' }),
    ], 'The idea: when the divisor stays the same, making the dividend 10 times smaller makes the quotient 10 times smaller. Shifting both numbers together never changes a quotient.'),
    mc('c3', 'Find the error. Tess says: "0.5 × 0.5 = 2.5, because 5 × 5 = 25 and I put the point in the middle." What is the best correction?', ['0.5 means half, and half of a half is a quarter. The product has 2 decimal places, so 0.25.', 'It is right: 25 with the point in the middle is 2.5.', 'It should be 0.025, because there are 3 digits.', 'It should be 25, because the point does not matter in multiplication.'], 0, {
      s: 'Half of a half is a quarter, 0.25. Two factors with one place each give a product with two places.',
      w: [[1, 'Half of 0.5 cannot be bigger than 0.5. Test your answer for size.'], [2, 'The factors have 1 + 1 = 2 places, not 3.']],
    }),
  ],

  quiz: [
    tpl('add', (r) => {
      const px = r.int(1, 2), py = r.pick([1, 2, 3].filter((v) => v !== px));
      const x = r.int(11, 999), y = r.int(11, 999), P = Math.max(px, py);
      const sum = x * P10(P - px) + y * P10(P - py);
      return N('Find ' + D(x, px) + ' + ' + D(y, py) + '.', D(sum, P), { s: 'Line up the points: ' + D(x * P10(P - px), P) + ' + ' + D(y * P10(P - py), P) + ' = ' + D(sum, P) + '.', w: [[D(x + y, P), 'You added the digits as if the places matched. Line up the decimal points first.']] });
    }),
    tpl('sub', (r) => {
      const W = r.int(5, 90), dk = r.int(101, 999);
      const ans = W * 100 - dk;
      const wrong = (W - Math.floor(dk / 100)) * 100 + (dk % 100);
      const w = dk % 100 ? [[D(wrong, 2), 'You subtracted the whole parts and kept the decimal part. Write the whole number with .00 and borrow.']] : [];
      return N('Find ' + W + ' − ' + D(dk, 2) + '.', D(ans, 2), { s: W + ' = ' + W + '.00, so in hundredths ' + (W * 100) + ' − ' + dk + ' = ' + ans + ', which is ' + D(ans, 2) + '.', w });
    }),
    tpl('mul', (r) => {
      const px = r.int(1, 2), py = r.int(1, 2), x = r.int(2, 99), y = r.int(2, 99);
      const prod = x * y;
      return N('Find ' + D(x, px) + ' × ' + D(y, py) + '.', D(prod, px + py), { s: x + ' × ' + y + ' = ' + prod + ', and the factors have ' + px + ' + ' + py + ' = ' + (px + py) + ' decimal places, so the answer is ' + D(prod, px + py) + '.', w: [[D(prod, Math.max(px, py)), 'Add the decimal places of the two factors: ' + px + ' + ' + py + ' = ' + (px + py) + ', not just the larger one.']] });
    }),
    tpl('div', (r) => {
      const d = r.int(2, 9), q = r.int(3, 60);
      if (r.bool()) {
        const pd = r.int(1, 2);
        return N('Find ' + D(d * q, pd) + ' ÷ ' + D(d, pd) + '.', q, { s: 'Shift both ' + pd + ' place' + (pd > 1 ? 's' : '') + ' right: ' + (d * q) + ' ÷ ' + d + ' = ' + q + '.', w: [[D(q, pd), 'Both numbers have ' + pd + ' decimal places. They cancel out, so the answer is a whole number.']] });
      }
      return N('Find ' + D(d * q, 2) + ' ÷ ' + d + '.', D(q, 2), { s: (d * q) + ' hundredths ÷ ' + d + ' = ' + q + ' hundredths = ' + D(q, 2) + '.', w: [[D(q, 1), 'The dividend is in hundredths, so the quotient is in hundredths: ' + D(q, 2) + '.']] });
    }),
    tpl('shift', (r) => {
      const a = r.int(11, 99), b = r.int(2, 9);
      return choice(r, 'Which calculation has exactly the same answer as ' + D(a, 2) + ' ÷ ' + D(b, 2) + '?', a + ' ÷ ' + b, [[D(a, 1) + ' ÷ ' + b, 'You moved only the dividend. Shifting must be done to both numbers.'], [a + ' ÷ ' + D(b, 1), 'Both numbers must move the same number of places, so the divisor must become whole.'], [D(a, 3) + ' ÷ ' + b, 'That shifts the dividend the wrong way.']], { s: 'Shift both two places right: ' + a + ' ÷ ' + b + '.' });
    }),
    tpl('smaller', (r) => {
      const n = r.int(3, 40), k = r.int(2, 9), k2 = r.int(2, 9);
      return choice(r, 'Without calculating, which of these is smaller than ' + n + '?', n + ' × 0.' + k, [[n + ' × 1.' + k, 'Multiplying by a number bigger than 1 makes it bigger.'], [n + ' ÷ 0.' + k, 'Dividing by a number smaller than 1 makes it bigger. How many tenths fit in ' + n + '?'], [n + ' + 0.' + k2, 'Adding a positive amount makes it bigger.']], { s: 'Multiplying by a number less than 1 (like 0.' + k + ') shrinks it; the other choices all grow.' });
    }),
    tpl('word', (r) => {
      const x = r.int(12, 98), y = r.int(12, 98), who = name(r);
      const item = r.pick(['apples', 'cheese', 'rice', 'grapes', 'flour']);
      return N(who + ' buys ' + D(y, 1) + ' kg of ' + item + ' at $' + D(x, 1) + ' per kg. What is the total cost in dollars? (Give it exactly, even if it has more than 2 decimal places.)', D(x * y, 2), { s: D(x, 1) + ' × ' + D(y, 1) + ': ' + x + ' × ' + y + ' = ' + (x * y) + ' with 2 places is ' + D(x * y, 2) + '.', w: [[D(x * y, 1), 'Each factor has one decimal place, so the product has two.']] });
    }),
  ],
});
