import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, add, cmp, fmt } from '../../../../src/content/dsl.js';

const D = (k, places) => {
  const neg = k < 0, s = String(Math.abs(k)).padStart(places + 1, '0');
  return (neg ? '-' : '') + (places ? s.slice(0, s.length - places) + '.' + s.slice(s.length - places) : s);
};
const P10 = (n) => Math.pow(10, n);
/** exact decimal string of a terminating rational (denominator only 2s and 5s), or null */
const toDec = (x) => { for (let q = 0; q <= 8; q++) if ((x.n * P10(q)) % x.d === 0) return D((x.n * P10(q)) / x.d, q); return null; };
const terminates = (x) => toDec(x) !== null;
const F = (x) => '{' + x.n + '/' + x.d + '}';

export default lesson({
  id: 'pre-6-3-decimals-and-fractions',
  title: 'Decimals and fractions',
  blurb: 'Convert both ways, know which fractions end as decimals, and compare numbers written in different forms.',
  concepts: ['decimals', 'fractions', 'conversion', 'terminating-decimals'],

  tryFirst: [
    num('t1', 'Write 0.75 as a fraction in lowest terms.', '3/4', {
      h: ['Read 0.75 aloud: seventy-five hundredths. Write that as a fraction.', 'Then divide top and bottom by the same number.'],
      s: '0.75 is 75 hundredths, {75/100}. Dividing top and bottom by 25 gives {3/4}.',
      w: [['75/10', '75/10 is 7.5. Hundredths means the denominator is 100.']],
    }),
    num('t2', 'You know that 1/4 = 0.25. Use that fact, not long division, to write 3/4 as a decimal.', '0.75', {
      h: ['3/4 means three pieces, each of size 1/4.'],
      s: '3 × 0.25 = 0.75.',
      w: [['0.34', 'The 3 and the 4 are not digits to put on either side of the point. 3/4 is three copies of 1/4, and 1/4 = 0.25.']],
    }),
  ],

  learn: [
    p('A decimal <i>is</i> a fraction in disguise. The places after the point are tenths, hundredths, thousandths. So 0.37 means 37 hundredths, and 0.6 means 6 tenths. Reading a decimal aloud tells you its fraction: "thirty-seven hundredths" is {37/100}.'),
    rule('<b>Decimal to fraction.</b> Read the decimal as tenths, hundredths or thousandths, write it over 10, 100 or 1000, then reduce. 0.64 = {64/100} = {16/25}. 0.125 = {125/1000} = {1/8}.'),
    ex('Count the places carefully', ['Write 0.0125 as a fraction.', 'The last digit is in the ten-thousandths place (4 places), so the denominator is 10 000.', '0.0125 = {125/10000}.', 'Divide top and bottom by 125: {1/80}.', 'Notice 0.125 is {1/8}; the extra zero makes the number 10 times smaller, so it is {1/80}.']),
    rule('<b>Fraction to decimal.</b> A fraction is a division: {3/8} means 3 ÷ 8. Divide the top by the bottom: 3 ÷ 8 = 0.375. Or scale the denominator up to 10, 100 or 1000: {3/20} = {15/100} = 0.15.'),
    widget('repeatingDecimal', { n: 3, d: 8 }),
    p('<b>Which fractions give decimals that stop?</b> A decimal that stops is a fraction over a power of ten, and 10, 100, 1000… are built only from 2s and 5s (10 = 2·5, 100 = 2²·5²). So a fraction in lowest terms stops exactly when its denominator has no prime factor other than 2 and 5. {7/40} stops (40 = 2³·5). {5/12} does not (12 has a 3).'),
    rule('<b>Test:</b> reduce the fraction first, then look at the denominator. Only 2s and 5s means it terminates. Any other prime factor means it repeats forever.'),
    tbl(['Fraction', 'Decimal', 'Memory hook'], [['{1/2}', '0.5', 'half'], ['{1/4}', '0.25', 'a quarter of a dollar'], ['{1/5}', '0.2', 'five fifths in 1.0'], ['{1/8}', '0.125', 'half of 0.25'], ['{1/10}', '0.1', 'a tenth'], ['{1/20}', '0.05', 'half of 0.1']], 'Benchmarks to know cold'),
    warn('<b>Watch out.</b> {1/8} is 0.125, not 0.18. The bottom number is not a string of digits to put after the point. And 0.5 and 0.05 are different: 0.05 is {5/100} = {1/20}, tiny next to {1/2}.'),
    ex('Compare {3/8} and 0.4', ['Turn both into the same form. {3/8} = 0.375.', 'Compare 0.375 and 0.400 digit by digit: 3 tenths < 4 tenths.', 'So 0.4 is larger.', 'Or use fractions: 0.4 = {2/5} = {16/40} and {3/8} = {15/40}.']),
    mcq('Ben says "{1/8} = 0.18 because it is 1 and 8." What should he do?', ['Nothing, he is right.', 'Divide: 1 ÷ 8 = 0.125. Or notice {1/8} is half of {1/4} = 0.25.', 'Write 0.8 instead, because the bottom is 8.'], 1, '{1/8} is one piece when 1 is cut into 8, so it is small: 0.125. 0.18 is close but not equal.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Write 0.64 as a fraction in lowest terms.', '16/25', {
      h: ['64 hundredths. Then divide top and bottom by 4.'],
      s: '0.64 = {64/100} = {16/25}.',
      w: [['64/10', 'Two decimal places means hundredths, so the denominator is 100.']],
    }),
    num('p2', 'Write {3/20} as a decimal.', '0.15', {
      h: ['Multiply top and bottom by 5 to get a denominator of 100.'],
      s: '{3/20} = {15/100} = 0.15.',
      w: [['0.015', '15/100 has two decimal places: 0.15.'], ['0.3', 'You used the 3 from the top but ignored the 20. Make the denominator 100: multiply top and bottom by 5.']],
    }),
    num('p3', 'Write 2 3/8 as a decimal.', '2.375', {
      h: ['The whole 2 stays. For {3/8}, divide 3 by 8, or use {1/8} = 0.125.'],
      s: '{3/8} = 3 × 0.125 = 0.375, so 2 3/8 = 2.375.',
      w: [['2.38', 'You rounded. The exact value is 2.375.']],
    }),
    mc('p4', 'Which is the largest?', ['0.6', '{5/8}', '0.58', '{3/5}'], 1, {
      h: ['Turn each into a decimal. {5/8} = 5 × 0.125.'],
      s: '{5/8} = 0.625, {3/5} = 0.6, so 0.625 is the largest.',
      w: [[0, '0.6 equals {3/5}, which is smaller than {5/8} = 0.625.'], [3, '{3/5} = 0.6, a bit less than {5/8} = 0.625.']],
    }),
    num('p5', 'Write 0.0125 as a fraction in lowest terms.', '1/80', {
      h: ['Four decimal places: the denominator is 10 000.'],
      s: '0.0125 = {125/10000} = {1/80}.',
      w: [['1/8', '0.125 is {1/8}, but 0.0125 has an extra zero, so it is ten times smaller.']],
    }),
    num('p6', 'Of the fractions {1/12}, {2/12}, {3/12}, …, {12/12} (twelve fractions in all), how many are terminating decimals?', '4', {
      h: ['Reduce each one. 12 = 4 × 3, so you need the 3 to cancel.', 'Which numerators are multiples of 3?'],
      s: 'A reduced denominator with only 2s and 5s is needed, so the factor 3 in 12 must cancel. That happens for 3, 6, 9, 12: {3/12} = {1/4}, {6/12} = {1/2}, {9/12} = {3/4}, {12/12} = 1. So 4 fractions.',
      w: [['3', 'Do not forget {12/12}. It reduces to 1, which terminates.'], ['8', 'Those are the ones that repeat. Count the terminating ones.']],
    }),
    num('p7', 'Tara answered 17 of 20 questions correctly. Write her score as a decimal.', '0.85', {
      h: ['17 out of 20 is {17/20}. Scale the denominator to 100.'],
      s: '{17/20} = {85/100} = 0.85.',
      w: [['0.17', '{17/20} is not {17/100}. Multiply top and bottom by 5 to move to hundredths.']],
    }),
    num('p8', 'Find 0.3 + {1/4} and give the answer as a decimal.', '0.55', {
      h: ['Write {1/4} as a decimal first.'],
      s: '{1/4} = 0.25, so 0.3 + 0.25 = 0.55.',
      w: [['0.7', 'You treated {1/4} as 0.4. A quarter is 0.25.']],
    }),
  ],

  challenge: [
    chain('Sixteenths', 'Start with {1/16}, which is hard to remember, and build a family from it.', [
      num('c1a', 'Write {1/16} as a decimal. (Halve {1/8} = 0.125.)', '0.0625', { h: ['Half of 0.125.'], s: 'Half of 0.125 is 0.0625.' }),
      num('c1b', 'Use part (a) to write {7/16} as a decimal.', '0.4375', { h: ['7 copies of 0.0625.'], s: '7 × 0.0625 = 0.4375.' }),
      num('c1c', 'What is {7/16} + 0.0625?', '0.5', { h: ['That is {7/16} + {1/16}.'], s: '{7/16} + {1/16} = {8/16} = {1/2} = 0.5.' }),
    ], 'The idea: once you know a unit fraction as a decimal, every multiple of it follows by simple multiplication.'),
    chain('In between', 'Find a fraction strictly between {1/5} and {1/4}.', [
      num('c2a', 'Write {1/5} with a denominator of 40. What is the new numerator?', 8, { h: ['40 ÷ 5 = 8, so multiply top and bottom by 8.'], s: '{1/5} = {8/40}.' }),
      num('c2b', 'Write {1/4} with a denominator of 40. What is the numerator?', 10, { h: ['40 ÷ 4 = 10.'], s: '{1/4} = {10/40}.' }),
      num('c2c', 'The fraction in between is {9/40}. Write it as a decimal.', '0.225', { h: ['9 × {1/40}, and {1/40} = 0.025.'], s: '{9/40} = {225/1000} = 0.225, between 0.2 and 0.25.' }),
    ], 'The idea: a common denominator turns "between" into a counting question. If there is no whole number between the numerators, scale up again.'),
    mc('c3', 'Find the error. Mia says "{3/7} must be a terminating decimal, because 3 and 7 are small numbers and the division will finish soon." Which is the best reply?', ['{3/7} is already in lowest terms and 7 is not made of 2s and 5s, so it repeats forever.', 'She is right, 3 ÷ 7 = 0.43.', 'It terminates only if you write it as 0.428.', 'No fraction ever repeats.'], 0, {
      s: 'The decimal for {3/7} is 0.428571428571…, repeating. Small numbers do not guarantee termination; the prime factors of the denominator do.',
      w: [[1, '0.43 is only {3/7} rounded to two places. The true decimal never ends.']],
    }),
  ],

  quiz: [
    tpl('d2f', (r) => {
      const pl = r.int(1, 3), k = r.int(1, P10(pl) - 1);
      const x = R(k, P10(pl));
      return N('Write ' + D(k, pl) + ' as a fraction in lowest terms.', fmt(x), { s: D(k, pl) + ' = {' + k + '/' + P10(pl) + '}' + (x.n === k ? '.' : ' = ' + F(x) + '.'), w: [[k + '/' + P10(pl - 1), 'Count the decimal places. ' + pl + ' places means a denominator of ' + P10(pl) + '.']] });
    }),
    tpl('f2d', (r) => {
      const d = r.pick([2, 4, 5, 8, 10, 16, 20, 25, 40, 50]), n = r.int(1, d - 1);
      const x = R(n, d);
      return N('Write {' + n + '/' + d + '} as a decimal.', toDec(x), { s: 'Divide ' + n + ' by ' + d + ' (or scale the denominator to a power of 10): ' + toDec(x) + '.', w: [[n + '.' + d, 'The bottom number is a divisor, not digits to put after the point.']] });
    }),
    tpl('mixed', (r) => {
      const w = r.int(1, 12), d = r.pick([2, 4, 5, 8, 20, 25]), n = r.int(1, d - 1);
      const x = add(R(w), R(n, d));
      return N('Write ' + w + ' {' + n + '/' + d + '} as a decimal.', toDec(x), { s: 'The whole part ' + w + ' stays. {' + n + '/' + d + '} = ' + toDec(R(n, d)) + '. So ' + toDec(x) + '.', w: [[w + '.' + n, 'The fractional part is a division, ' + n + ' ÷ ' + d + ', not digits after the point.']] });
    }),
    tpl('cmp', (r) => {
      const d = r.pick([2, 4, 5, 8, 10, 20, 25, 50]), n = r.int(1, d - 1);
      const x = R(n, d);
      const exact = r.bool(0.25) && (n * 100) % d === 0;
      const hund = exact ? (n * 100) / d : Math.max(1, Math.min(99, Math.round((n * 100) / d) + r.int(-9, 9)));
      const c = cmp(x, R(hund, 100));
      const fr = '{' + n + '/' + d + '}', de = D(hund, 2);
      const right = c > 0 ? fr : c < 0 ? de : 'They are equal';
      return choice(r, 'Which is greater, ' + fr + ' or ' + de + '?', right, [c > 0 ? de : fr, c === 0 ? fr : 'They are equal', 'It cannot be told without a calculator'].filter((v, i, a) => v !== right && a.indexOf(v) === i).slice(0, 3), { s: fr + ' = ' + toDec(x) + '. Compare ' + toDec(x) + ' with ' + de + ': ' + (c > 0 ? fr + ' is larger.' : c < 0 ? de + ' is larger.' : 'they are the same number.') });
    }),
    tpl('score', (r) => {
      const d = r.pick([4, 5, 8, 20, 25, 40, 50]), n = r.int(1, d - 1), who = name(r);
      const x = R(n, d);
      return N(who + ' got ' + n + ' out of ' + d + ' questions right. Write the fraction of questions correct as a decimal.', toDec(x), { s: '{' + n + '/' + d + '} = ' + toDec(x) + '.', w: [[D(n, 2), 'The score is out of ' + d + ', not out of 100. Divide ' + n + ' by ' + d + '.']] });
    }),
    tpl('thou', (r) => {
      const k = r.int(1, 99);
      const x = R(k, 1000);
      return N('Write 0.0' + String(k).padStart(2, '0') + ' as a fraction in lowest terms.', fmt(x), { s: '0.0' + String(k).padStart(2, '0') + ' has three decimal places: {' + k + '/1000} = ' + F(x) + '.', w: [[k + '/100', 'Three decimal places means thousandths, not hundredths.']] });
    }),
    tpl('stop', (r) => {
      const d = r.int(6, 60), n = r.int(1, d - 1), x = R(n, d), t = terminates(x);
      return choice(r, 'Does {' + n + '/' + d + '} give a decimal that stops, or one that repeats forever?', t ? 'It stops' : 'It repeats forever', [t ? 'It repeats forever' : 'It stops', 'It depends only on the top number'].map((o) => [o, o === 'It depends only on the top number' ? 'The reduced bottom number decides, not the top alone.' : (t ? 'Reduce first: ' + F(x) + ' has only 2s and 5s in its denominator.' : 'Reduce first: ' + F(x) + ' has another prime factor in its denominator.')]), { s: 'Reduce to ' + F(x) + '. ' + (t ? 'The denominator has only 2s and 5s, so it stops.' : 'The denominator has a prime factor other than 2 or 5, so it repeats.') });
    }),
    tpl('sum', (r) => {
      const d = r.pick([2, 4, 5, 8, 20, 25]), n = r.int(1, d - 1), pl = r.int(1, 2), k = r.int(1, P10(pl) - 1);
      const x = add(R(k, P10(pl)), R(n, d));
      return N('Find ' + D(k, pl) + ' + {' + n + '/' + d + '} and write the answer as a decimal.', toDec(x), { s: '{' + n + '/' + d + '} = ' + toDec(R(n, d)) + ', so ' + D(k, pl) + ' + ' + toDec(R(n, d)) + ' = ' + toDec(x) + '.' });
    }),
  ],
});
