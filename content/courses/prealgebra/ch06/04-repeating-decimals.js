import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, fmt, gcd } from '../../../../src/content/dsl.js';

const OV = (s) => '<span style="text-decoration:overline">' + s + '</span>';
/** digits of n/d by long division with exact integer arithmetic; period = length of the repeating block (0 if it stops) */
function digitsOf(n, d, count) {
  let r = n % d; const out = [];
  for (let i = 0; i < count; i++) { r *= 10; out.push(Math.floor(r / d)); r %= d; }
  return out;
}
function period(n, d) {
  let r = n % d; const seen = new Map(); let i = 0;
  while (r !== 0) { if (seen.has(r)) return i - seen.get(r); seen.set(r, i); r = (r * 10) % d; i++; }
  return 0;
}
const stops = (n, d) => period(n, d) === 0;

export default lesson({
  id: 'pre-6-4-repeating-decimals',
  title: 'Repeating decimals',
  blurb: 'Why some fractions never finish as decimals, how to spot the loop, and how to turn a repeating decimal back into a fraction.',
  concepts: ['repeating-decimals', 'long-division', 'fractions'],

  tryFirst: [
    num('t1', 'Divide 1 by 3 by long division and keep going: 0.3333… Think about the pattern. What is the digit in the 10th place after the decimal point of 1/3?', 3, {
      h: ['Each step of the division leaves the same remainder.', 'Every digit is the same.'],
      s: '1 ÷ 3: each time the remainder is 1, you bring down a 0 to make 10, and 10 ÷ 3 = 3 remainder 1. The digit is always 3, including the 10th.',
      w: [['1', 'The 1 is the remainder, not a digit of the answer. Each digit of the answer is 3.']],
    }),
    num('t2', 'The fraction 1/7 is 0.142857142857142857… and the block 142857 repeats forever. What is the 20th digit after the decimal point?', 4, {
      h: ['The block has 6 digits. Where in the block is the 20th digit?', '20 = 6 + 6 + 6 + 2.'],
      s: 'Three full blocks use 18 digits. The 19th is 1 and the 20th is 4.',
      w: [['7', '7 is the 6th digit, the 18th, the 24th. The 20th is 2 places after the 18th.'], ['2', 'You may have counted the 3rd place of the block. After 18 digits (3 blocks) the 19th is 1 and the 20th is 4.']],
    }),
  ],

  learn: [
    p('Divide 1 by 3 and you get 0.3333… forever. Nothing is wrong with the division: 1 ÷ 3 simply never ends. A decimal that goes on forever with a block of digits repeating is a <b>repeating decimal</b>. We write the block with a bar: 1/3 = 0.' + OV('3') + ', and 1/7 = 0.' + OV('142857') + '.'),
    widget('repeatingDecimal', { n: 1, d: 7 }),
    p('<b>Why does it loop?</b> In long division, each step leaves a remainder smaller than the divisor. If the divisor is 7, the only remainders are 0, 1, 2, 3, 4, 5, 6. A remainder of 0 means the division stops. Any other remainder, once it comes back, makes the digits repeat, because the next step depends only on the remainder. With 7 possible remainders, a loop must appear within 6 steps. That is the pigeonhole idea.'),
    rule('<b>Every fraction is either a terminating decimal or a repeating decimal.</b> It terminates exactly when its lowest-terms denominator has only the prime factors 2 and 5. Otherwise it repeats, and the block is at most (denominator − 1) digits long.'),
    ex('Find the block for 5/11', ['5 ÷ 11: 50 ÷ 11 = 4 remainder 6.', '60 ÷ 11 = 5 remainder 5. The remainder 5 is the same as the starting remainder, so the loop begins.', 'Digits: 4, 5, 4, 5, … So 5/11 = 0.' + OV('45') + '.', 'The block has 2 digits, much shorter than the maximum of 10.']),
    rule('<b>Repeating decimal to fraction.</b> Call the number x. Multiply by a power of 10 that slides one whole block past the point, and subtract so the endless tails cancel. A block of k digits uses 10^k.'),
    ex('Turn 0.' + OV('27') + ' into a fraction', ['Let x = 0.272727…', 'The block has 2 digits, so 100x = 27.272727…', 'Subtract: 100x − x = 27.2727… − 0.2727… = 27, so 99x = 27.', 'x = {27/99} = {3/11}. Check: 3 ÷ 11 = 0.2727…']),
    ex('A decimal that starts with a non-repeating part', ['Turn 0.41' + OV('6') + ' (0.41666…) into a fraction.', 'Let x = 0.41666… Then 100x = 41.666… and 1000x = 416.666…', 'Subtract: 1000x − 100x = 416.666… − 41.666… = 375.', '900x = 375, so x = {375/900} = {5/12}.']),
    warn('<b>Watch out.</b> 0.67 is not the same number as 0.' + OV('6') + '. The calculator shows 0.6666667 because it has to stop and round. The true value of {2/3} is 0.' + OV('6') + ', forever. Rounded decimals are only close; fractions are exact.'),
    p('<b>A surprise.</b> Let x = 0.' + OV('9') + ' (0.9999…). Then 10x = 9.999…, and 10x − x = 9, so 9x = 9 and x = 1. It is not "almost 1" but exactly 1. There is no number you can fit between 0.999… and 1, and that is what "equal" means.'),
    mcq('Pia says "0.' + OV('12') + ' = {12/100} because the block is 12." What is the right answer?', ['She is right.', '{12/99}, because a block of 2 digits uses 99 in the denominator (100x − x = 12 gives 99x = 12).', '{12/90}.'], 1, '100x = 12.1212…, so 100x − x = 12 and 99x = 12, x = {12/99} = {4/33}. The fraction {12/100} = 0.12 stops; 0.1212… keeps going.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is the 10th digit after the decimal point of 1/6 = 0.1666…?', 6, {
      h: ['Only the first digit is different. Everything after is 6.'],
      s: '1/6 = 0.1' + OV('6') + '. Digit 1 is 1 and every digit from the 2nd onward is 6, including the 10th.',
      w: [['1', 'Only the first digit is 1; the loop starts at the second digit.']],
    }),
    num('p2', '2/11 = 0.181818… What is the 25th digit after the decimal point?', 1, {
      h: ['The block 18 has length 2. Odd places are 1 and even places are 8.'],
      s: 'Odd-numbered places hold 1 and even-numbered places hold 8. 25 is odd, so the digit is 1.',
      w: [['8', '8 is in the even places (2nd, 4th, …). 25 is odd.']],
    }),
    num('p3', 'Write 0.' + OV('5') + ' (0.5555…) as a fraction.', '5/9', {
      h: ['x = 0.555…, then 10x = 5.555… Subtract.'],
      s: '10x − x = 5, so 9x = 5 and x = {5/9}.',
      w: [['1/2', '0.5 is {1/2}, but 0.5555… is slightly more than 0.5.'], ['5/10', 'That is 0.5 exactly. The decimal keeps going, so use 10x − x.']],
    }),
    num('p4', 'Write 0.' + OV('45') + ' (0.454545…) as a fraction in lowest terms.', '5/11', {
      h: ['The block has 2 digits, so multiply by 100.'],
      s: '100x − x = 45, 99x = 45, x = {45/99} = {5/11}.',
      w: [['9/20', '45/100 = 9/20 is 0.45 exactly. This decimal keeps repeating; use 99 as the denominator.']],
    }),
    mc('p5', 'Which of these fractions is NOT a terminating decimal?', ['{6/15}', '{9/24}', '{5/12}', '{7/35}'], 2, {
      h: ['Reduce every fraction before you judge it.'],
      s: '{6/15} = {2/5}, {9/24} = {3/8}, {7/35} = {1/5}; all terminate. {5/12} is already reduced and 12 = 4 × 3 has a 3, so it repeats: 0.41666…',
      w: [[0, '{6/15} reduces to {2/5} = 0.4, which stops.'], [1, '{9/24} reduces to {3/8} = 0.375, which stops.'], [3, '{7/35} reduces to {1/5} = 0.2, which stops.']],
    }),
    num('p6', 'Use the shift trick on x = 0.' + OV('9') + ' (0.9999…). What number is x exactly?', 1, {
      h: ['10x = 9.999… Subtract x from it.'],
      s: '10x − x = 9, so 9x = 9 and x = 1. (Another way: 0.333… = {1/3} and 3 × 0.333… = 0.999… = 3 × {1/3} = 1.)',
      w: [['0.9', 'That is 0.9 with a single 9, which is less than 1. Here the nines never stop.'], ['9/10', 'That is 0.9 with a single 9. Use 10x − x = 9.']],
    }),
    num('p7', 'When you divide 1 by 13 by long division, the digits of the answer repeat. How many digits are in the repeating block?', 6, {
      h: ['Keep dividing and track the remainders: 1, 10, 9, 12, 3, 4, … until a remainder returns.', 'The block is as long as the number of steps before the first remainder repeats.'],
      s: 'Remainders: 1 → 10 → 9 → 12 → 3 → 4 → 1. Six steps and the 1 is back. 1/13 = 0.' + OV('076923') + '. The block has 6 digits.',
      w: [['12', 'There are 12 possible remainders, but the loop returns to 1 sooner, after 6 steps.']],
    }),
  ],

  challenge: [
    chain('Sevenths', 'Here is 1/7 = 0.' + OV('142857') + '. All the other sevenths come from the same six digits in a different order.', [
      num('c1a', 'Multiply 142857 × 3.', 428571, { h: ['142857 × 3 = 300000 + 120000 + 6000 + 2400 + 150 + 21, or just multiply carefully.'], s: '142857 × 3 = 428571.' }),
      num('c1b', 'So 3/7 = 0.428571428571… What is the 5th digit after the decimal point?', 7, { h: ['Count 4, 2, 8, 5, 7.'], s: 'Digits: 4, 2, 8, 5, 7, 1. The 5th is 7.' }),
      num('c1c', 'Round 3/7 to the nearest thousandth.', '0.429', { h: ['3/7 = 0.4285714… Look at the digit after the thousandths place.'], s: 'The digits are 0.428 then 5, so round up to 0.429.' }),
    ], 'The idea: 1/7 stores the pattern for every seventh. Multiplying the block rotates the digits, because the remainders just visit the same six values in a different order.'),
    chain('The shift trick at work', 'Let x = 0.' + OV('18') + '.', [
      num('c2a', 'What is 100x − x?', 18, { h: ['100x = 18.1818… and x = 0.1818…'], s: '18.1818… − 0.1818… = 18.' }),
      num('c2b', 'Write x as a fraction in lowest terms.', '2/11', { h: ['99x = 18.'], s: 'x = {18/99} = {2/11}.' }),
      num('c2c', 'Now let y = 0.' + OV('81') + ' (0.8181…). Find x + y.', 1, { h: ['y = {81/99}. Add the fractions.'], s: '{18/99} + {81/99} = {99/99} = 1. Check: 0.1818… + 0.8181… = 0.9999… = 1.' }),
    ], 'The idea: the digit pairs 18 and 81 add up to 99, and 99 repeated gives 0.9999… which is exactly 1.'),
    mc('c3', 'Find the error. Sam writes: "{1/3} = 0.33, so 3 × {1/3} = 0.99, which means 1 is not equal to 0.99." What is the best correction?', ['0.33 is only a rounded or cut-off version. The exact decimal is 0.3333… and 3 × 0.3333… = 0.9999… = 1.', 'He is right: 1 and 0.99 are different, so {1/3} × 3 is not 1.', 'Division by 3 always loses digits, so fractions cannot be added.', '0.33 is {1/3} exactly.'], 0, {
      s: 'The decimal 0.33 stops after two digits, so it is not {1/3}. The real {1/3} has an endless string of 3s.',
      w: [[1, 'Three thirds make exactly 1. If 0.99 were exact the numbers would not agree. The error is stopping the 3s too soon.']],
    }),
  ],

  quiz: [
    tpl('digit', (r) => {
      const d = r.pick([3, 6, 7, 9, 11, 12, 13, 15, 22, 27, 33]);
      let n = r.int(1, d - 1); while (stops(n, d)) n = r.int(1, d - 1);
      const pos = r.int(10, 90);
      const dg = digitsOf(n, d, pos)[pos - 1];
      const pp = period(n, d);
      return N('What is the digit in position ' + pos + ' after the decimal point of {' + n + '/' + d + '}?', dg, { s: 'Long division of ' + n + ' by ' + d + ' gives digits ' + digitsOf(n, d, Math.min(pos, 12)).join('') + '…; the block repeats every ' + pp + ' digits (after any lead-in digits). Position ' + pos + ' holds ' + dg + '.' });
    }),
    tpl('pure', (r) => {
      const len = r.int(1, 2), k = len === 1 ? r.int(1, 8) : r.int(10, 98);
      const den = len === 1 ? 9 : 99, x = R(k, den);
      const w = len === 1 ? [[k + '/10', 'That is the stopped decimal 0.' + k + '. A single repeated digit uses 9 as the denominator.']] : [[k + '/100', 'That is the stopped decimal 0.' + k + '. A block of two digits uses 99.']];
      return N('Write 0.' + OV(String(k)) + ' as a fraction in lowest terms.', fmt(x), { s: 'Multiply by ' + (len === 1 ? 10 : 100) + ' and subtract: ' + den + 'x = ' + k + ', so x = {' + k + '/' + den + '}' + (x.n === k ? '.' : ' = {' + x.n + '/' + x.d + '}.'), w });
    }),
    tpl('mixed', (r) => {
      const a = r.int(1, 9), b = r.int(1, 9);
      const x = R(9 * a + b, 90);
      return N('Write 0.' + a + OV(String(b)) + ' as a fraction in lowest terms.', fmt(x), { s: 'Let x = 0.' + a + b + b + b + '… Then 100x − 10x = ' + a + b + '.' + b + '… − ' + a + '.' + b + '… = ' + (10 * a + b - a) + ', so 90x = ' + (9 * a + b) + ', x = {' + (9 * a + b) + '/90}' + (gcd(9 * a + b, 90) > 1 ? ' = {' + x.n + '/' + x.d + '}.' : '.'), w: [[a + b + '/90', 'Subtract the lead-in digit: 100x − 10x leaves (' + a + b + ' − ' + a + '), not ' + a + b + '.']] });
    }),
    tpl('howmany', (r) => {
      const pool = [[1, 2], [3, 8], [5, 12], [7, 15], [4, 9], [9, 20], [11, 30], [13, 40], [2, 11], [17, 50], [5, 6], [3, 7], [14, 35], [9, 25], [7, 16], [1, 12], [8, 15], [21, 28], [3, 13], [19, 40]];
      const fr = r.shuffle(pool).slice(0, 4);
      const c = fr.filter(([n, d]) => stops(n, d)).length;
      return N('How many of these four fractions are terminating decimals? ' + fr.map(([n, d]) => '{' + n + '/' + d + '}').join(', ') + '. (Reduce each first.)', c, { s: 'Reduce, then check for factors other than 2 and 5 in the bottom. ' + c + ' of them stop.', w: [[c === 4 ? 3 : c + 1, 'Check each one again after reducing. A factor of 3, 7, 11 or 13 in the reduced denominator means the decimal repeats.']] });
    }),
    tpl('period', (r) => {
      const d = r.pick([3, 7, 9, 11, 13, 21, 27, 33, 37, 41]);
      let n = r.int(1, d - 1); while (stops(n, d)) n = r.int(1, d - 1);
      const pp = period(n, d);
      return N('How many digits are in the repeating block of the decimal for {' + n + '/' + d + '}? (Do the long division and watch for a remainder to come back.)', pp, { s: 'The remainders return to an earlier value after ' + pp + ' steps, so the block has ' + pp + ' digit' + (pp > 1 ? 's' : '') + '.' });
    }),
    tpl('sum', (r) => {
      const a = r.int(1, 8), b = r.int(1, 8), t = r.bool();
      if (t) { const x = R(a + b, 9); return N('Find 0.' + OV(String(a)) + ' + 0.' + OV(String(b)) + ' and write the answer as a fraction in lowest terms.', fmt(x), { s: '0.' + a + a + '… is {' + a + '/9} and 0.' + b + b + '… is {' + b + '/9}. Their sum is {' + (a + b) + '/9}' + (x.d === 9 && x.n === a + b ? '.' : x.d === 1 ? ' = ' + x.n + '.' : ' = ' + '{' + x.n + '/' + x.d + '}.') }); }
      const x = R(a * 3, 9);
      return N('Find 3 × 0.' + OV(String(a)) + ' and write the answer as a fraction in lowest terms (a whole number is fine).', fmt(x), { s: '0.' + a + a + '… = {' + a + '/9}, and 3 × {' + a + '/9} = {' + 3 * a + '/9}' + (x.d === 1 ? ' = ' + x.n + '.' : ' = {' + x.n + '/' + x.d + '}.') });
    }),
    tpl('equals', (r) => {
      let ab = r.int(1, 98); while (ab % 11 === 0) ab = r.int(1, 98);
      const s2 = String(ab).padStart(2, '0'), rev = s2[1] + s2[0];
      const rp = (t) => '0.' + t + t + t + '…';
      return choice(r, 'Which decimal is exactly equal to {' + ab + '/99}? (A string of dots means the block keeps repeating.)', rp(s2), [['0.' + s2, 'That stops after two digits. A two-digit block that repeats forever gives a denominator of 99.'], ['0.0' + s2 + s2 + '…', 'The extra zero in front makes it ten times smaller.'], [rp(rev), 'The digits are reversed. Check which block you get from ' + ab + ' ÷ 99.']], { s: '99x = ' + ab + ' came from 100x − x, with x = 0.' + s2 + s2 + '…, so the block is ' + s2 + '.' });
    }),
  ],
});
