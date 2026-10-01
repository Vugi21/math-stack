import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const D = (k, places) => {
  const neg = k < 0, s = String(Math.abs(k)).padStart(places + 1, '0');
  return (neg ? '-' : '') + (places ? s.slice(0, s.length - places) + '.' + s.slice(s.length - places) : s);
};
const P10 = (n) => Math.pow(10, n);
const PLACE = ['whole number', 'tenth', 'hundredth', 'thousandth'];
/** round the integer k (scaled by 10^s) to p places, half up. Returns {up, down} integers scaled by 10^p */
const rnd = (k, s, p) => {
  const unit = P10(s - p), q = Math.floor(k / unit), rem = k - q * unit;
  return { down: q, up: q + (rem * 2 >= unit ? 1 : 0) };
};

export default lesson({
  id: 'pre-6-2-rounding',
  title: 'Rounding decimals',
  blurb: 'Rounding means picking the nearer neighbour on the number line. Learn the one-digit rule and why it works, and when to round at all.',
  concepts: ['rounding', 'estimation', 'place-value'],

  tryFirst: [
    num('t1', 'A fuel tank holds 7.46 litres. A gauge shows only tenths of a litre. What would the gauge show if it displays the nearest tenth?', '7.5', {
      h: ['7.46 lies between 7.4 and 7.5. Which is it closer to?', 'Compare 7.46 − 7.40 with 7.50 − 7.46.'],
      s: '7.46 is 0.06 above 7.4 but only 0.04 below 7.5. It is closer to 7.5.',
      w: [['7.4', 'That just chops off the 6. The 6 is more than halfway to the next tenth, so the number is closer to 7.5.']],
    }),
    num('t2', 'What is the largest number with one decimal place that still rounds down to 3 when rounded to the nearest whole number?', '3.4', {
      h: ['Which numbers round to 4?', 'Where is the halfway point between 3 and 4?'],
      s: 'Halfway between 3 and 4 is 3.5, and numbers from 3.5 up round to 4. The largest one-decimal number below 3.5 is 3.4.',
      w: [['3.5', '3.5 is exactly halfway and by the usual agreement it rounds up to 4.']],
    }),
  ],

  learn: [
    p('To <b>round</b> a number to a place (the nearest tenth, say) you find the two multiples of that place that trap your number, then choose the one that is closer. That is the whole idea: <b>rounding picks the nearer neighbour</b>. The rest is a shortcut for deciding which neighbour is nearer.'),
    widget('roundingLine', { v: 3846, place: 1 }),
    rule('<b>The one-digit rule.</b> Look at the digit just to the right of the place you are rounding to. If it is 5 or more, round up (add 1 to the rounding digit). If it is 4 or less, round down (keep the rounding digit). Then drop everything after it. Exactly halfway counts as up.'),
    ex('Round 6.2749 to the nearest hundredth', ['The hundredths digit is 7: 6.27… The neighbours are 6.27 and 6.28.', 'Look at the next digit, the 4 in the thousandths place. 4 is less than 5.', 'So we stay at 6.27.', 'Check: 6.2749 is 0.0049 above 6.27 but 0.0051 below 6.28. Close, but 6.27 wins.']),
    ex('A carry', ['Round 7.96 to the nearest tenth.', 'The tenths digit is 9. The next digit is 6, so round up: 9 + 1 = 10 tenths.', '10 tenths is 1 whole, so 7.9 + 0.1 = 8.0.', 'Write the zero: 8.0 tells the reader you rounded to the tenths place.']),
    warn('<b>Watch out: round once, from the original.</b> To round 4.349 to the nearest tenth, do not round to 4.35 and then to 4.4. Only the digit right next to the place matters: it is 4, so the answer is 4.3. Rounding in steps creates errors, because each step can push the number a little farther.'),
    p('<b>Why round at all?</b> Measurements are never exact, so reporting 7.4632 litres can be false precision. Rounding also makes estimates easy. To guess 4.87 × 6.12, think 5 × 6 = 30 and you already know the answer is near 30. The skill is picking a place that keeps the answer meaningful.'),
    tbl(['Number', 'Nearest whole', 'Nearest tenth', 'Nearest hundredth'], [['3.846', '4', '3.8', '3.85'], ['0.0449', '0', '0.0', '0.04'], ['12.5', '13', '12.5', '12.50']], 'The same number rounded to different places'),
    mcq('Isla rounds 2.449 to the nearest whole number like this: "2.449 becomes 2.45, which becomes 2.5, which becomes 3." What is the real answer and what went wrong?', ['3. She is right: rounding up repeatedly is fine.', '2. Only the tenths digit (4) matters for rounding to a whole number, and 4 means round down. She rounded in stages.', '2.5, because 2.449 is close to 2.45.'], 1, 'The number 2.449 is less than halfway (2.5) between 2 and 3, so it is closer to 2. The stage-by-stage rounding made it look like it passed halfway.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Round 38.462 to the nearest tenth.', '38.5', {
      h: ['Which digit decides? Look just to the right of the tenths place.'],
      s: 'The tenths digit is 4 and the next digit is 6, so round the 4 up to 5: 38.5.',
      w: [['38.4', 'You chopped off the rest. The deciding digit is 6, so the 4 rounds up.'], ['38.46', 'That is rounded to the hundredth, not the tenth.']],
    }),
    num('p2', 'Round 9.996 to the nearest hundredth.', '10', {
      h: ['The hundredths digit is 9 and the next digit is 6. What happens when 9 goes up?'],
      s: '9.99 + 0.01 = 10.00, so the answer is 10.00 (which is just 10).',
      w: [['9.99', 'You chopped. The next digit is 6, so round up, and that carries all the way.'], ['9.1', 'That is not close to 9.996. Check by thinking where the number sits.']],
    }),
    num('p3', 'Round 0.0449 to the nearest thousandth.', '0.045', {
      h: ['Thousandths place is the third digit after the point.'],
      s: '0.0449: the thousandths digit is 4, the next digit is 9, so round up to 0.045.',
      w: [['0.044', 'The next digit is 9, so the 4 must round up.'], ['0.04', 'That is the nearest hundredth. Keep three decimal places.']],
    }),
    mc('p4', 'Which of these does NOT round to 5.8 when rounded to the nearest tenth?', ['5.75', '5.79', '5.84', '5.85'], 3, {
      h: ['Numbers that round to 5.8 fill the gap from 5.75 up to just below 5.85.'],
      s: '5.85 is exactly halfway between 5.8 and 5.9, so it rounds up to 5.9. The others round to 5.8.',
      w: [[0, '5.75 is exactly halfway between 5.7 and 5.8, so it rounds up to 5.8. It does round to 5.8.']],
    }),
    num('p5', 'Estimate 4.87 × 6.12 by rounding each number to the nearest whole number first, then multiplying.', '30', {
      h: ['Is 4.87 closer to 4 or to 5?'],
      s: '4.87 rounds to 5 and 6.12 rounds to 6, and 5 × 6 = 30.',
      w: [['24', 'You rounded 4.87 down to 4. It is almost 5, so round up.']],
    }),
    num('p6', 'How many numbers with exactly three decimal places round to 2.4 when rounded to the nearest tenth?', '100', {
      h: ['Find the smallest and largest three-decimal numbers that round to 2.4.', 'The smallest is 2.350 (exactly halfway counts up).'],
      s: 'Every number from 2.350 up to 2.449 rounds to 2.4. 2.450 would round up to 2.5. From 350 to 449 thousandths is 100 numbers.',
      w: [['101', '2.450 is halfway to 2.5 and rounds up. It is not included.'], ['99', '2.350 is exactly halfway between 2.3 and 2.4, so it rounds up to 2.4 and counts. 350 to 449 is 100 numbers.']],
    }),
    num('p7', 'A gas pump shows $3.4589 per litre but the bill must use cents. Round the price to the nearest cent (give the answer in dollars).', '3.46', {
      h: ['A cent is a hundredth of a dollar.'],
      s: 'The hundredths digit is 5 and the next digit is 8, so round up to $3.46.',
      w: [['3.45', 'The next digit is 8, which is 5 or more, so the 5 rounds up.']],
    }),
  ],

  challenge: [
    chain('Rounding twice', 'Look at what happens when you round in stages. The number is 4.4449.', [
      num('c1a', 'Round 4.4449 to the nearest thousandth.', '4.445', { h: ['The next digit after the thousandths place is 9.'], s: '4.4449 → 4.445.' }),
      num('c1b', 'Now round your answer to part (a), 4.445, to the nearest hundredth.', '4.45', { h: ['4.445 is exactly halfway between 4.44 and 4.45.'], s: 'Halfway rounds up, so 4.45.' }),
      num('c1c', 'Round the original 4.4449 straight to the nearest hundredth. Does it match part (b)?', '4.44', { h: ['Look at the digit after the hundredths place in 4.4449: it is 4.'], s: 'The digit after the hundredths place is 4, so round down: 4.44. It does not match 4.45.' }),
    ], 'The idea: round once, and always from the original number. A first rounding can create a false "5" that was never there.'),
    chain('The mystery decimal', 'A number has exactly three decimal places and rounds to 0.68 when rounded to the nearest hundredth.', [
      num('c2a', 'What is the smallest it could be?', '0.675', { h: ['The halfway point below 0.68 is 0.675.'], s: '0.675 is halfway between 0.67 and 0.68 and rounds up to 0.68.' }),
      num('c2b', 'What is the largest it could be?', '0.684', { h: ['0.685 would round up to 0.69.'], s: '0.684 rounds down to 0.68; 0.685 rounds up to 0.69.' }),
      num('c2c', 'Both ends round to the same nearest tenth. What is it?', '0.7', { h: ['0.675 is closer to 0.7 than 0.6, and 0.684 is too.'], s: 'Everything from 0.675 to 0.684 is above the halfway point 0.65 and below 0.75, so every one rounds to 0.7.' }),
    ], 'The idea: each rounding place cuts the number line into intervals. A number must satisfy all the intervals at once, so clues about rounding give a range, not one answer.'),
    mc('c3', 'Find the error. Jo says: "0.05 rounded to the nearest tenth is 0.0, because 5 is the last digit and there is nothing after it to push it up." Which is the correct explanation?', ['0.05 is exactly halfway between 0.0 and 0.1, so by the rule it rounds up to 0.1.', 'Jo is right: 0.0.', 'It is 0.5, because the 5 moves up one place.', 'It cannot be rounded.'], 0, {
      s: 'The digit to the right of the tenths place is 5. Five or more rounds up, giving 0.1.',
      w: [[1, 'The digit right of the tenths place (the 5) is the one that decides, and 5 rounds up.'], [2, 'Rounding does not move digits to a different place; it changes the number only a little.']],
    }),
  ],

  quiz: [
    tpl('rnd', (r) => {
      const s = r.int(3, 4), k = r.int(1000, 99999), pl = r.int(0, Math.min(2, s - 1));
      const { down, up } = rnd(k, s, pl);
      const w = down !== up ? [[D(down, pl), 'You chopped the extra digits off. Look at the next digit: it is 5 or more, so round up.']] : [];
      return N('Round ' + D(k, s) + ' to the nearest ' + PLACE[pl] + '.', D(up, pl), { s: 'The deciding digit is the one just right of the ' + PLACE[pl] + ' place. Result: ' + D(up, pl) + '.', w });
    }),
    tpl('bill', (r) => {
      const T = r.int(10, 300), n = r.pick([3, 6, 7, 9]), who = name(r);
      const num0 = T * 100, q = Math.floor(num0 / n), rem = num0 - q * n, up = q + (rem * 2 >= n ? 1 : 0);
      const w = q !== up ? [[D(q, 2), 'You cut the extra digits off. Look at the next digit and round properly.']] : [];
      return N(who + ' and friends split a $' + T + ' bill equally among ' + n + ' people. How many dollars does each person pay, rounded to the nearest cent?', D(up, 2), { s: T + ' ÷ ' + n + ' = ' + D(q, 2) + '… and the next digit decides: ' + D(up, 2) + '.', w });
    }),
    tpl('est', (r) => {
      const a = r.int(105, 995), b = r.int(105, 995);
      const ra = rnd(a, 2, 0).up, rb = rnd(b, 2, 0).up;
      const fl = Math.floor(a / 100) * Math.floor(b / 100);
      const w = fl !== ra * rb ? [[fl, 'You chopped each number instead of rounding to the nearest whole number.']] : [];
      return N('Estimate ' + D(a, 2) + ' × ' + D(b, 2) + ' by rounding each factor to the nearest whole number first. What do you get?', ra * rb, { s: D(a, 2) + ' rounds to ' + ra + ' and ' + D(b, 2) + ' rounds to ' + rb + '; ' + ra + ' × ' + rb + ' = ' + ra * rb + '.', w });
    }),
    tpl('count', (r) => {
      const s = r.int(2, 3), pl = r.int(0, s - 1), t = r.int(2, 60);
      const cnt = P10(s - pl);
      return N('How many numbers with exactly ' + s + ' decimal places round to ' + D(t, pl) + ' when rounded to the nearest ' + PLACE[pl] + '? (The number must be positive and use all ' + s + ' decimal places, trailing zeros included.)', cnt, { s: 'They run from half a unit below to just under half a unit above, ' + cnt + ' numbers in a row.', w: [[cnt + 1, 'The top halfway point rounds up to the next value, so it is not included.']] });
    }),
    tpl('edge', (r) => {
      const t = r.int(3, 90), small = r.bool();
      const q = small ? 'What is the smallest number with two decimal places that rounds to ' + D(t, 1) + ' when rounded to the nearest tenth?' : 'What is the largest number with two decimal places that rounds to ' + D(t, 1) + ' when rounded to the nearest tenth?';
      return small
        ? N(q, D(t * 10 - 5, 2), { s: 'Halfway below ' + D(t, 1) + ' is ' + D(t * 10 - 5, 2) + ', and halfway rounds up.', w: [[D(t * 10 - 6, 2), 'That rounds down to the previous tenth. Exactly halfway rounds up.']] })
        : N(q, D(t * 10 + 4, 2), { s: 'Halfway above is ' + D(t * 10 + 5, 2) + ', which rounds up to the next tenth. One hundredth below is ' + D(t * 10 + 4, 2) + '.', w: [[D(t * 10 + 5, 2), 'That is exactly halfway above, so it rounds up to the next tenth.']] });
    }),
    tpl('which', (r) => {
      const t = r.int(3, 90), off = r.int(-4, 4);
      const right = D(t * 10 + off, 2);
      const wr = r.shuffle([5, 6, 7, 8, -6, -7, -8, -9]).slice(0, 3).map((o) => [D(t * 10 + o, 2), 'That rounds to the next tenth over (' + D(o > 0 ? t + 1 : t - 1, 1) + '), not ' + D(t, 1) + '.']);
      return choice(r, 'Which of these numbers rounds to ' + D(t, 1) + ' when rounded to the nearest tenth?', right, wr, { s: D(t * 10 + off, 2) + ' is within half a tenth of ' + D(t, 1) + ', so it rounds there.' });
    }),
    tpl('carry', (r) => {
      const a = r.int(1, 99), pl = r.int(1, 2);
      const k = (a + 1) * P10(pl + 1) - r.int(1, 4);
      const { up } = rnd(k, pl + 1, pl);
      return N('Round ' + D(k, pl + 1) + ' to the nearest ' + PLACE[pl] + '. (Watch for a carry.)', D(up, pl), { s: 'The digits ' + D(k, pl + 1) + ' round up past a run of 9s, and the carry moves left: ' + D(up, pl) + '.', w: [[D(Math.floor(k / 10), pl), 'The last digit is 5 or more so you must round up. Chopping gives a smaller number.']] });
    }),
  ],
});
