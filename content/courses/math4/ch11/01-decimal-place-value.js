import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, eq } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';
import { dec } from '../../../../src/widgets/decimals.js';

const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
const digits = (k, places) => dec(k, places).replace('.', '').split('').map(Number);

export default lesson({
  id: 'm4-11-1-decimal-place-value',
  title: 'Decimal place value',
  blurb: 'Tenths, hundredths, and thousandths: how digits to the right of the point work.',
  concepts: ['decimals', 'place-value', 'expanded-form'],

  tryFirst: [
    num('t1', 'A metre stick is cut into 10 equal parts. A piece of tape covers 7 of the parts. How many metres does the tape cover? Write it as a decimal.', '0.7', {
      h: ['Each part is one tenth of a metre.', 'The tape covers 7 tenths.'],
      s: '7 tenths of a metre is {7/10} metre, which is written 0.7.',
      w: [['0.07', 'That is 7 hundredths. Each part here is one tenth, not one hundredth.'], ['7', 'That is 7 whole metres. The tape covers only part of one metre.']],
    }),
    num('t2', 'A square is cut into 100 equal small squares. 23 of them are shaded. Write the shaded part of the square as a decimal.', '0.23', {
      h: ['Each small square is one hundredth of the big square.', '23 hundredths is the same as {23/100}.'],
      s: '23 out of 100 equal squares is {23/100}, which is written 0.23.',
      w: [['2.3', 'That is more than 2 whole squares. The shaded part is less than 1 whole square.'], ['0.023', 'That is 23 thousandths. Each small square is one hundredth.']],
    }),
  ],

  learn: [
    p('Our number system uses <b>place value</b>. Each place is worth 10 times the place on its right. Going left, a place gets 10 times bigger. Going right, it gets 10 times smaller.'),
    p('The <b>decimal point</b> separates whole numbers from parts of a whole. Right after the point is the tenths place. Tenths come from cutting 1 into 10 equal parts.'),
    tbl(['Place', 'Value', 'As a fraction'], [['tens', '10', '—'], ['ones', '1', '—'], ['tenths', '0.1', '{1/10}'], ['hundredths', '0.01', '{1/100}'], ['thousandths', '0.001', '{1/1000}']], 'Places around the decimal point'),
    rule('<b>Reading digits.</b> The digits to the right of the point name tenths, then hundredths, then thousandths. So 4.372 has 4 ones, 3 tenths, 7 hundredths and 2 thousandths.'),
    widget('decimalGrid', { a: 30, b: 4 }),
    p('The big square is 1 whole. It has 100 small squares, each worth 0.01. A full column of 10 squares is 0.1. Shade 3 columns and 4 more squares. That is 0.3 + 0.04 = 0.34.'),
    rule('<b>Decimals are fractions.</b> The number of digits after the point tells the bottom of the fraction. One digit means tenths. Two digits means hundredths. Three digits means thousandths. 0.37 = {37/100}. 0.205 = {205/1000}.'),
    ex('Expanded form', ['Write 5.304 in expanded form.', 'The 5 is in the ones place: 5.', 'The 3 is in the tenths place: 0.3, which is {3/10}.', 'The 0 is in the hundredths place: nothing.', 'The 4 is in the thousandths place: 0.004.', 'So 5.304 = 5 + 0.3 + 0.004. The zero keeps the 4 in the thousandths place.']),
    warn('<b>Watch out.</b> 0.5 and 0.05 are different. 0.5 is five tenths. 0.05 is five hundredths, which is ten times smaller. A zero right after the point pushes the digits one place to the right.'),
    mcq('Maya writes thirty-five thousandths as 0.35. What is wrong?', ['Nothing, she is right.', '0.35 is thirty-five hundredths. Thirty-five thousandths needs three digits after the point: 0.035.', 'She should write 0.350.'], 1, '0.035 = {35/1000}. Thousandths need three places, so a zero goes in the tenths place. 0.35 and 0.350 are the same number, and it is thirty-five hundredths.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Write {7/100} as a decimal.', '0.07', {
      h: ['Hundredths need two digits after the point.'],
      s: '7 hundredths: the 7 goes in the hundredths place, so the tenths place is 0. The decimal is 0.07.',
      w: [['0.7', 'That is 7 tenths. Hundredths need two places after the point.'], ['7.00', 'That is 7 wholes. The fraction {7/100} is less than 1.']],
    }),
    num('p2', 'What digit is in the hundredths place of 3.862?', 6, {
      h: ['The first digit after the point is tenths. The second is hundredths.'],
      s: 'After the point: 8 is tenths, 6 is hundredths, 2 is thousandths.',
      w: [['8', 'That is the tenths digit. Hundredths is the second place after the point.'], ['2', 'That is the thousandths digit. Hundredths is the second place.']],
    }),
    num('p3', 'Write 5 + {3/10} + {4/1000} as a decimal.', '5.304', {
      h: ['Put each digit in its own place. Which place is empty?'],
      s: '5 ones, 3 tenths, 0 hundredths, 4 thousandths: 5.304.',
      w: [['5.34', 'That puts the 4 in the hundredths place. {4/1000} is in the thousandths place, so a 0 goes between.'], ['5.0304', 'There is only one empty place, the hundredths.']],
    }),
    num('p4', 'How many tenths are in 2.5?', 25, {
      h: ['There are 10 tenths in each whole.'],
      s: '2 wholes have 2 × 10 = 20 tenths. Plus 5 more tenths: 25 tenths.',
      w: [['5', 'That counts only the tenths digit. The 2 wholes also contain tenths.'], ['2.5', 'That is the number itself. Count how many pieces of size 0.1 make it.']],
    }),
    num('p5', 'How many times as big as 0.04 is 0.4?', 10, {
      h: ['How many hundredths make 0.4?'],
      s: '0.4 is 40 hundredths and 0.04 is 4 hundredths. 40 is 10 times 4.',
      w: [['100', 'The digits shift by one place, which is a factor of 10, not 100.'], ['1', 'The digit 4 appears in both, but in different places.']],
    }),
    num('p6', 'What is {1/10} of 0.37?', '0.037', {
      h: ['A tenth of a number moves each digit one place to the right.'],
      s: 'Each digit moves one place right: 3 tenths becomes 3 hundredths, 7 hundredths becomes 7 thousandths. The answer is 0.037.',
      w: [['3.7', 'That is 10 times 0.37. A tenth of it is smaller.'], ['0.37', 'That is the same number. We need a tenth of it.']],
    }),
    num('p7', 'Use each of the digits 2, 5 and 7 once to fill in the pattern _.__ so the number is as close to 5 as possible. What number is it?', '5.27', {
      h: ['Which digit should be the ones digit to be near 5?', 'Then make the part after the point as small as possible.'],
      s: 'The ones digit should be 5. The decimal part should be as small as possible: 0.27. So the number is 5.27. It is 0.27 away from 5.',
      w: [['5.72', 'That is 0.72 above 5. Try putting the smaller digit in the tenths place.'], ['2.57', 'That is 2.43 below 5. A ones digit of 5 lands much closer.']],
    }),
    num('p8', 'A decimal 0.abc has digits a, b and c. The digits add up to 12. The middle digit b is 4. The first digit a is 2 more than the last digit c. What is the decimal?', '0.543', {
      h: ['a + c = 12 − 4.', 'a is c plus 2.'],
      s: 'a + c = 8 and a = c + 2. So c + 2 + c = 8, 2c = 6, c = 3, a = 5. The decimal is 0.543.',
      w: [['0.444', 'These digits add to 12, but a is not 2 more than c.'], ['0.345', 'These digits add to 12, but a must be the larger.']],
    }),
  ],

  challenge: [
    chain('The mystery number', 'I am a number with a 7 in the ones place, a 3 in the tenths place, a 0 in the hundredths place and a 5 in the thousandths place.', [
      num('c1a', 'Write my number as a decimal.', '7.305', { h: ['Put each digit in its place. The hundredths digit is 0.'], s: '7 ones, 3 tenths, 0 hundredths, 5 thousandths: 7.305.' }),
      num('c1b', 'Add 2 hundredths to me. What decimal am I now?', '7.325', { h: ['Only the hundredths digit changes.'], s: '0 hundredths + 2 hundredths = 2 hundredths: 7.325.' }),
      num('c1c', 'From 7.325, take away 1 tenth. What decimal is that?', '7.225', { h: ['Take 1 from the tenths digit.'], s: '3 tenths − 1 tenth = 2 tenths: 7.225.' }),
    ], 'The idea: adding or taking away one unit of a place only changes that digit, as long as you do not pass 9 or 0.'),
    chain('Shifting digits', 'Start with the number 4.5.', [
      num('c2a', 'What is 4.5 × 100?', 450, { h: ['Multiplying by 10 moves each digit one place left.'], s: 'Two places left: 4.5 becomes 450.' }),
      num('c2b', 'What is 4.5 ÷ 10?', '0.45', { h: ['Dividing by 10 moves each digit one place right.'], s: 'One place right: 4.5 becomes 0.45.' }),
      num('c2c', 'How many times as big as 0.045 is 4.5?', 100, { h: ['How many places do the digits shift?'], s: 'The 4 in 0.045 is in the hundredths place. In 4.5 the 4 is in the ones place. That is a shift of 2 places, so 4.5 is 100 times as big.' }),
    ], 'The idea: each place shift is a factor of 10. Shifting two places is a factor of 100.'),
    mc('c3', 'Find the error. Omar says: "0.3 + 0.04 = 0.7 because 3 + 4 = 7." What is wrong?', ['The 3 is in the tenths place and the 4 is in the hundredths place. 0.3 + 0.04 = 0.34.', 'The sum should be 0.07.', 'Omar is correct.', 'The sum should be 7.'], 0, {
      s: '0.3 is 30 hundredths and 0.04 is 4 hundredths. Together they are 34 hundredths: 0.34.',
      w: [[1, 'Think of 0.3 as 30 hundredths. Adding 4 hundredths gives more than 30 hundredths, so the sum is more than 0.3.'], [2, 'Different places cannot be added digit by digit. Rewrite both in hundredths.']],
    }),
  ],

  quiz: [
    tpl('tofrac', (r) => {
      const places = r.pick([1, 2, 3]), k = r.int(1, 10 ** places - 1);
      const den = 10 ** places;
      return N('Write {' + k + '/' + den + '} as a decimal.', dec(k, places), { s: 'The bottom is ' + den + ', so there ' + (places > 1 ? 'are ' + places + ' digits' : 'is 1 digit') + ' after the point: ' + dec(k, places) + '.', w: W(dec(k, places), [[dec(k, places + 1), 'You used too many places. ' + den + ' means ' + places + ' digit' + (places > 1 ? 's' : '') + ' after the point.'], [dec(k, Math.max(1, places - 1)), 'You used too few places. ' + den + ' means ' + places + ' digit' + (places > 1 ? 's' : '') + ' after the point.']]) });
    }),
    tpl('digit', (r) => {
      const k = r.int(1000, 99999), place = r.pick([1, 2, 3]);
      const ds = digits(k, 3), names = ['tenths', 'hundredths', 'thousandths'];
      const shown = dec(k, 3);
      const ans = ds[ds.length - 3 + place - 1];
      return N('What digit is in the ' + names[place - 1] + ' place of ' + shown + '?', ans, { s: 'After the point the places are tenths, hundredths, thousandths. In ' + shown + ' the digit in the ' + names[place - 1] + ' place is ' + ans + '.' });
    }),
    tpl('value', (r) => {
      const k = r.int(1000, 99999), place = r.pick([1, 2, 3]);
      const ds = digits(k, 3);
      ds[ds.length - 3 + place - 1] = ds[ds.length - 3 + place - 1] || r.int(1, 9);
      const d = ds[ds.length - 3 + place - 1];
      const k2 = Number(ds.join(''));
      return N('What is the value of the ' + d + ' in the ' + ['tenths', 'hundredths', 'thousandths'][place - 1] + ' place of ' + dec(k2, 3) + '? Write it as a decimal.', dec(d, place), { s: 'A digit ' + d + ' in the ' + ['tenths', 'hundredths', 'thousandths'][place - 1] + ' place is worth ' + dec(d, place) + '.' });
    }),
    tpl('expanded', (r) => {
      const w = r.int(1, 9), a = r.int(1, 9), c = r.int(1, 9);
      const k = w * 1000 + a * 100 + c;
      return N('Write ' + w + ' + ' + dec(a, 1) + ' + ' + dec(c, 3) + ' as one decimal.', dec(k, 3), { s: 'Ones: ' + w + '. Tenths: ' + a + '. Hundredths: 0. Thousandths: ' + c + '. So ' + dec(k, 3) + '.', w: W(dec(k, 3), [[w + '.' + a + c, 'The ' + c + ' belongs in the thousandths place. Put a 0 in the hundredths place.']]) });
    }),
    tpl('howmany', (r) => {
      const unit = r.pick([1, 2]), k = r.int(11, 99);
      const total = dec(k, unit), name_ = unit === 1 ? 'tenths' : 'hundredths';
      return N('How many ' + name_ + ' are in ' + total + '?', k, { s: total + ' is ' + k + ' ' + name_ + '.', w: W(k, [[k % 10, 'That is only the last digit. Count every ' + name_.slice(0, -1) + ' in the whole number.']]) });
    }),
    tpl('times', (r) => {
      const k = r.int(11, 999), up = r.bool(), s = r.pick([1, 2]);
      const places = 3;
      const startK = k;
      if (up) {
        return N('What is ' + dec(startK, places) + ' × ' + 10 ** s + '?', dec(startK, places - s), { s: 'Multiplying by ' + 10 ** s + ' moves each digit ' + s + ' place' + (s > 1 ? 's' : '') + ' left: ' + dec(startK, places - s) + '.', w: W(dec(startK, places - s), [[dec(startK, places + s), 'Multiplying makes the number bigger. Move the digits left.']]) });
      }
      return N('What is ' + dec(startK, 1) + ' ÷ ' + 10 ** s + '?', dec(startK, 1 + s), { s: 'Dividing by ' + 10 ** s + ' moves each digit ' + s + ' place' + (s > 1 ? 's' : '') + ' right: ' + dec(startK, 1 + s) + '.', w: W(dec(startK, 1 + s), [[dec(startK, Math.max(0, 1 - s)), 'Dividing makes the number smaller. Move the digits right.']]) });
    }),
    tpl('between', (r) => {
      const a = r.int(1, 8), b = r.int(1, 9), c = r.int(0, 9);
      const lo = a * 100 + b * 10 + c;
      const ans = r.pick([lo + 1, lo + 10]);
      return N('Which decimal is ' + (ans === lo + 1 ? '0.001' : '0.01') + ' more than ' + dec(lo, 3) + '?', dec(ans, 3), { s: 'Add one unit of that place: ' + dec(ans, 3) + '.' });
    }),
  ],
});
