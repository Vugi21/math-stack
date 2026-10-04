import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// reduced answer string for n/d (sign carried on the top)
const fr = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; };
// display of a fraction (n over d) with a proper minus sign
const tx = (n, d) => (n < 0 ? '−' : '') + '{' + Math.abs(n) + '/' + d + '}';
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };
// a reduced positive fraction n/d, n != d, both 2..14
const pair = (r) => { for (;;) { const n = r.int(1, 14), d = r.int(2, 14); if (gcd(n, d) === 1 && n !== d) return [n, d]; } };

export default lesson({
  id: 'pre-1-6-reciprocals',
  title: 'Reciprocals',
  blurb: 'The number that multiplies with x to make 1. It is to multiplication what the opposite is to addition.',
  concepts: ['reciprocal', 'multiplicative-inverse'],

  tryFirst: [
    num('t1', 'What number can you multiply by 4 to get exactly 1?', '1/4', {
      h: ['You need a number smaller than 1. Cut 1 into 4 equal pieces.', '4 copies of what make 1?'],
      s: 'Four quarters make a whole: 4 × {1/4} = 1. So the number is 1/4.',
      w: [['4', '4 × 4 is 16. You need something that shrinks 4 down to 1.'], ['-4', 'Multiplying 4 by a negative gives a negative result, not 1.']],
    }),
    num('t2', 'What number can you multiply by 2/3 to get exactly 1?', '3/2', {
      h: ['2/3 is two parts out of three. What would you multiply by to cancel the 3 on the bottom and the 2 on the top?', 'Try (2/3) × (3/2) and multiply the tops and the bottoms.'],
      s: '{2/3} × {3/2} = {6/6} = 1. Flip the fraction.',
      w: [['2/3', 'That is the same number. (2/3) × (2/3) = 4/9, not 1.'], ['-2/3', 'Negative times positive is negative, so it cannot make 1.']],
    }),
  ],

  learn: [
    p('Addition has opposites: a number plus its opposite is 0. Multiplication has something similar, but the target is 1 instead of 0. For almost every number there is a partner that multiplies with it to make exactly 1.'),
    def('reciprocal', 'The reciprocal of a number a is the number that makes a × (reciprocal) = 1. It is written {1/a}. Another name for it is the <b>multiplicative inverse</b>, because it plays the same role for multiplication that the opposite plays for addition.'),
    formula('Reciprocal of a fraction', '{a/b} and {b/a}', 'Flip the fraction: the reciprocal of {3/5} is {5/3}, because {3/5} × {5/3} = {15/15} = 1. Here a and b are not 0. A whole number n is the fraction {n/1}, so its reciprocal is {1/n}.'),
    widget('fractionDivide', { a: 1, b: 1, c: 3, d: 4 }),
    p('The picture asks: how many pieces of size {3/4} fit into 1? The answer, {4/3}, is exactly the reciprocal of {3/4}. Move the sliders and see the pattern: the reciprocal tells you how many of a piece fit into 1.'),
    ex('Finding reciprocals', ['The reciprocal of 7 is {1/7}, since 7 = {7/1} and we flip it.', 'The reciprocal of {2/9} is {9/2}.', 'The reciprocal of 0.5 = {1/2} is 2, and the reciprocal of 0.25 = {1/4} is 4.', 'Check each one by multiplying: the product must be 1.']),
    def('unit fraction', 'A fraction with 1 on top, such as {1/2}, {1/7} or {1/100}. The reciprocal of a whole number n is the unit fraction {1/n}, and the reciprocal of a unit fraction is a whole number.'),
    rule('<b>Signs stay.</b> A number and its reciprocal have the same sign. The reciprocal of −4 is −{1/4}, because (−4) × (−{1/4}) = 1. A negative times a positive would give a negative, never 1.'),
    rule('<b>Size flips.</b> If a positive number is bigger than 1, its reciprocal is between 0 and 1. If it is between 0 and 1, its reciprocal is bigger than 1. For example 8 has reciprocal {1/8}, and {1/8} has reciprocal 8.'),
    rule('<b>Two special facts.</b> 0 has no reciprocal, since 0 times anything is 0 and can never be 1. And 1 and −1 are their own reciprocals; they are the only two numbers with that property. Taking the reciprocal twice always returns you to the start.'),
    ex('Going backwards', ['The reciprocal of a number is −{7/3}. What is the number?', 'Taking the reciprocal twice returns you to the start, so take the reciprocal of −{7/3}.', 'Flip, and keep the sign: −{3/7}.', 'Check: −{3/7} × (−{7/3}) = 1.']),
    ex('Cancelling with reciprocals', ['Find {4/9} × {7/5} × {9/4}.', 'Swap the order so a pair of reciprocals meet: {4/9} × {9/4} × {7/5}.', 'The first two multiply to 1, leaving 1 × {7/5} = {7/5}.']),
    rule('<b>Reciprocal of a product.</b> The reciprocal of a × b is (reciprocal of a) × (reciprocal of b). Flip each factor. The reciprocal of {2/3} × {5/7} is {3/2} × {7/5} = {21/10}.'),
    tbl(['Number', 'Reciprocal', 'Check: product'], [['8', '{1/8}', '1'], ['{4/5}', '{5/4}', '1'], ['−{3/2}', '−{2/3}', '1'], ['0', 'none', '0']], 'Reciprocal pairs'),
    key('The reciprocal is the number you <b>multiply by to get 1</b>. It keeps the sign, it flips the size, and 0 does not have one. This one idea will turn division into multiplication in the next lesson.'),
    tip('The quickest test for a reciprocal pair is the product: multiply the two numbers and see if you get 1. Use it every time, especially with decimals and negatives.'),
    tip('To flip a decimal, first write it as a fraction: 0.2 = {1/5}, so its reciprocal is 5. Notice that a reciprocal pair multiplies to 1, so you can also read it as "how many of this fit into 1".'),
    warn('<b>Watch out.</b> Reciprocal is not the same as opposite. The opposite of 4 is −4 (you ADD to get 0). The reciprocal of 4 is {1/4} (you MULTIPLY to get 1). Do not change the sign when you flip: the reciprocal of −{3/5} is −{5/3}.'),
    mcq('Leo says "The reciprocal of −3 is 3, because a reciprocal flips the sign." What is wrong?', ['Nothing, Leo is right.', 'Flipping the sign gives the opposite. The reciprocal of −3 is −{1/3} since (−3) × (−{1/3}) = 1.', 'Negative numbers have no reciprocal.'], 1, 'Check: (−3) × 3 = −9, not 1. The reciprocal keeps the sign and flips the fraction: −{1/3}.', 'Spot the mistake'),
    recap([['reciprocal', 'the number that multiplies with a to give 1'], ['multiplicative inverse', 'another name for the reciprocal'], ['no reciprocal', '0 has none'], ['self-reciprocal', '1 and −1']], [['Reciprocal pair', 'a × {1/a} = 1'], ['Flip a fraction', '{a/b} → {b/a}']]),
  ],

  practice: [
    num('p1', 'Find the reciprocal of {3/5}.', '5/3', {
      h: ['Flip it.'],
      s: '{3/5} × {5/3} = 1, so the reciprocal is {5/3}.',
      w: [['-3/5', 'That is the opposite, not the reciprocal.'], ['3/5', 'That is the original number.']],
    }),
    num('p2', 'Find the reciprocal of −4.', '-1/4', {
      h: ['Write −4 as −{4/1}, and flip it. What happens to the sign?'],
      s: 'The reciprocal is −{1/4}, since (−4) × (−{1/4}) = 1.',
      w: [['1/4', 'Check: (−4) × {1/4} = −1, not 1. The reciprocal keeps the sign.'], ['4', 'That is the opposite. Reciprocal means "multiplies with it to make 1".'], ['-4', 'That is the number itself.']],
    }),
    mc('p3', 'Which of these numbers is its own reciprocal?', ['0', '{1/2}', '−1', '2'], 2, {
      h: ['You need a number x with x × x = 1.'],
      s: '(−1) × (−1) = 1, so −1 is its own reciprocal.',
      w: [[0, '0 times anything is 0. It has no reciprocal at all.'], [1, 'The reciprocal of {1/2} is 2, which is different.'], [3, 'The reciprocal of 2 is {1/2}.']],
    }),
    num('p4', 'Find {3/7} × {5/9} × {7/3}.', '5/9', {
      h: ['Rearrange so that two of the fractions are next to each other and cancel.'],
      s: '{3/7} × {7/3} = 1, so the total is 1 × {5/9} = {5/9}.',
      w: [['1', 'Only {3/7} and {7/3} are reciprocals. {5/9} stays.']],
    }),
    num('p5', 'What is the reciprocal of 0.25?', 4, {
      h: ['0.25 is the same as {1/4}.'],
      s: '0.25 = {1/4} and its reciprocal is 4.',
      w: [['1/4', 'That is 0.25 itself, not its reciprocal.'], ['0.25', 'That is the number you started with.']],
    }),
    num('p6', 'The reciprocal of a number is −{7/3}. What is the number?', '-3/7', {
      h: ['Reciprocals come in pairs. If A is the reciprocal of B, then B is the reciprocal of A.'],
      s: 'Take the reciprocal again: −{3/7}.',
      w: [['3/7', 'Check the sign: a number and its reciprocal have the same sign.'], ['-7/3', 'That is the reciprocal you were given. Flip it to go back.']],
    }),
    mc('p7', 'x is a number bigger than 1, for example 8 or 100. What can you say about the reciprocal of x?', ['It is bigger than 1 too.', 'It is between 0 and 1.', 'It is negative.', 'It equals x.'], 1, {
      h: ['The reciprocal of 8 is {1/8}. And of 100?'],
      s: 'Big numbers have tiny reciprocals. The reciprocal of a number bigger than 1 is a positive number smaller than 1.',
      w: [[0, 'The reciprocal of 8 is {1/8}, which is less than 1.'], [2, 'The reciprocal keeps the sign, and x is positive.']],
    }),
    num('p8', 'How many different numbers are equal to their own reciprocal?', 2, {
      h: ['x × x = 1. Which numbers work? Think of positive AND negative.'],
      s: '1 × 1 = 1 and (−1) × (−1) = 1. These are the only two.',
      w: [['1', 'The number −1 also multiplies by itself to give 1.'], ['3', 'Test 0: it has no reciprocal. So there is no third number.']],
    }),
  ],

  challenge: [
    chain('Flip, flip, flip', 'Start with the number {2/5} and keep taking reciprocals.', [
      num('c1a', 'What is the reciprocal of {2/5}?', '5/2', { h: ['Flip it.'], s: '{5/2}.' }),
      num('c1b', 'Take the reciprocal of that new number. What do you get?', '2/5', { h: ['Flip again.'], s: 'Back to {2/5}.', w: [['5/2', 'That is the answer to the first part. Flip it once more.']] }),
      num('c1c', 'You take the reciprocal 7 times in a row, starting from {3/8}. What is the final number?', '8/3', { h: ['Look at what happens after 1 flip, 2 flips, 3 flips.'], s: 'An odd number of flips ends on the flipped fraction: {8/3}.', w: [['3/8', 'Odd means you end flipped. Two flips restore the original, and 7 is odd.']] }),
    ], 'The idea: taking the reciprocal twice undoes itself. With an even number of flips you are back home; with an odd number you are flipped.'),
    chain('Reciprocal of a product', 'Let a = {2/3} and b = {9/4}.', [
      num('c2a', 'Find a × b.', '3/2', { h: ['Multiply the tops and the bottoms, then simplify.'], s: '{18/12} = {3/2}.' }),
      num('c2b', 'Find the reciprocal of a × b.', '2/3', { h: ['Flip the answer to the last part.'], s: 'The reciprocal of {3/2} is {2/3}.' }),
      num('c2c', 'Now multiply the reciprocal of a by the reciprocal of b: {3/2} × {4/9}. What do you get?', '2/3', { h: ['Multiply tops and bottoms.'], s: '{12/18} = {2/3}. The same as the last part.' }),
    ], 'The idea: the reciprocal of a product is the product of the reciprocals. So you can flip each factor separately.'),
    mc('c3', 'Find the error. Priya says: "The reciprocal of {1/2} + {1/3} is 2 + 3 = 5, because I flipped each fraction." Why is this wrong?', ['She flipped a sum. Flipping works factor by factor in a product but not term by term in a sum. {1/2} + {1/3} = {5/6}, so the reciprocal is {6/5}.', 'The answer is right.', 'She should have used the opposite instead.', 'Sums have no reciprocal.'], 0, {
      s: 'Check: {1/2} + {1/3} = {5/6}. Its reciprocal is {6/5}, not 5.',
      w: [[1, 'Test it: 5 × {5/6} is not 1.'], [3, 'Any nonzero number has a reciprocal, including a sum.']],
    }),
  ],

  quiz: [
    tpl('flipfrac', (r) => {
      const [n, d] = pair(r);
      return N('Find the reciprocal of ' + tx(n, d) + '.', fr(d, n), { s: 'Flip it: ' + tx(d, n) + '.', w: wr(fr(d, n), [[fr(-d, n), 'The reciprocal keeps the sign of the original number.'], [fr(-n, d), 'That is the opposite. The reciprocal flips the fraction.']]) });
    }),
    tpl('flipneg', (r) => {
      const [n, d] = pair(r);
      return N('Find the reciprocal of −' + tx(n, d) + '.', fr(-d, n), { s: 'Flip it and keep the minus sign: ' + tx(-d, n) + '. Check: the product of the two is positive 1.', w: wr(fr(-d, n), [[fr(d, n), 'A negative number times a positive number is negative, never 1. Keep the sign.']]) });
    }),
    tpl('flipint', (r) => {
      const k = r.nz(-40, 40);
      if (Math.abs(k) === 1) return N('Find the reciprocal of ' + m(k * 7) + '.', fr(1, k * 7), { s: tx(1, Math.abs(k * 7)) + ' with the sign of ' + m(k * 7) + '.' });
      return N('Find the reciprocal of ' + m(k) + '.', fr(1, k), { s: 'Write ' + m(k) + ' as ' + m(k) + '/1 and flip it, keeping the sign: ' + (k < 0 ? '−' : '') + '{1/' + Math.abs(k) + '}.', w: wr(fr(1, k), [[-k, 'That is the opposite of ' + m(k) + '.'], [fr(-1, k), 'The reciprocal keeps the sign of the original number.']]) });
    }),
    tpl('cancel', (r) => {
      const [a, b] = pair(r), [c, d] = pair(r);
      return N('Find ' + tx(a, b) + ' × ' + tx(c, d) + ' × ' + tx(d, c) + '.', fr(a, b), { s: tx(c, d) + ' × ' + tx(d, c) + ' = 1, so the product is ' + tx(a, b) + ' (' + fr(a, b) + ').', w: wr(fr(a, b), [[1, 'Only the last two fractions cancel to 1. The first one stays.']]) });
    }),
    tpl('recipprod', (r) => {
      const [a, b] = pair(r), [c, d] = pair(r);
      return N('Find the reciprocal of ' + tx(a, b) + ' × ' + tx(c, d) + '.', fr(b * d, a * c), { s: 'The product is ' + tx(a * c, b * d) + ', so its reciprocal is ' + tx(b * d, a * c) + '. In reduced form: ' + fr(b * d, a * c) + '.', w: wr(fr(b * d, a * c), [[fr(a * c, b * d), 'That is the product. You still have to take its reciprocal.'], [fr(b, a), 'Flip the whole product, not just the first factor.']]) });
    }),
    tpl('noreciprocal', (r) => {
      const others = r.distinct(3, -9, 9).filter((x) => x !== 0).slice(0, 3);
      const vals = others.length === 3 ? others : [2, -5, 7];
      return choice(r, 'Which of these numbers does NOT have a reciprocal?', '0', vals.map(m), { s: '0 times anything is 0, so nothing can multiply with 0 to give 1.' });
    }),
    tpl('flips', (r) => {
      const [n, d] = pair(r), k = r.int(2, 11), neg = r.bool();
      const sg = neg ? -1 : 1;
      const out = k % 2 === 0 ? fr(sg * n, d) : fr(sg * d, n);
      return N('Start with ' + tx(sg * n, d) + '. Take its reciprocal, then the reciprocal of that, and keep going until you have taken ' + k + ' reciprocals in total. What number do you end with?', out, { s: 'Two flips undo each other. ' + k + ' is ' + (k % 2 ? 'odd, so you finish flipped' : 'even, so you finish where you started') + ': ' + out + '.', w: wr(out, [[k % 2 === 0 ? fr(sg * d, n) : fr(sg * n, d), 'Count the flips: ' + k + ' is ' + (k % 2 ? 'odd' : 'even') + '.']]) });
    }),
    tpl('scoops', (r) => {
      const [n, d] = pair(r);
      return N('A scoop holds ' + tx(n, d) + ' of a cup. How many scoops make exactly 1 cup? (A fraction of a scoop is fine.)', fr(d, n), { s: 'You need the number x with x × ' + tx(n, d) + ' = 1. That is the reciprocal: ' + tx(d, n) + '.', w: wr(fr(d, n), [[fr(n, d), 'That is the size of one scoop, not the number of scoops.']]) });
    }),
  ],
});
