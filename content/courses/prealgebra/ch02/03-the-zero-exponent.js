import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const pw = (b, e) => Math.pow(b, e);
const W = (v, a, msg) => (v === a ? [] : [[v, msg]]);

export default lesson({
  id: 'pre-2-3-the-zero-exponent',
  title: 'The zero exponent',
  blurb: 'What can it mean to multiply a number by itself zero times? Three different arguments all land on the same answer: 1.',
  concepts: ['exponents', 'zero-exponent'],

  tryFirst: [
    num('t1', 'Look at this pattern: 2<sup>4</sup> = 16, 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2. What would be a sensible value for 2<sup>0</sup> if the pattern keeps going?', 1, {
      h: ['How does each number relate to the one before it?', 'Each one is half of the previous.'],
      s: 'Each step down divides by 2: 16, 8, 4, 2, and half of 2 is 1. So 2<sup>0</sup> should be 1.',
      w: [['0', 'Going down by one in the exponent halves the value; it does not subtract. Half of 2 is 1.']],
    }),
    num('t2', 'What is 3<sup>4</sup> ÷ 3<sup>4</sup>?', 1, {
      h: ['Anything divided by itself is...?', 'You do not need to work out 3<sup>4</sup> at all.'],
      s: 'Any number (not zero) divided by itself is 1.',
      w: [['0', 'Dividing a number by itself gives 1, not 0. 6 ÷ 6 = 1.']],
    }),
  ],

  learn: [
    p('We know b<sup>n</sup> means "n copies of b multiplied together". But what could <b>zero</b> copies mean? We cannot just skip the question, because exponents will be everywhere later. So mathematicians looked for the one value that keeps all the other rules working. It turns out there is exactly one.'),
    widget('negExponent', { b: 2 }),
    def('zero exponent', 'For any base b that is not zero, b<sup>0</sup> = 1. So 5<sup>0</sup> = 1, 100<sup>0</sup> = 1 and (−7)<sup>0</sup> = 1. The base does not matter, as long as it is not 0.'),
    rule('<b>The zero exponent.</b> For any base b that is not zero, b<sup>0</sup> = 1. This is the only value that keeps the other exponent rules working.'),
    formula('Zero exponent', 'b<sup>0</sup> = 1  (b ≠ 0)', 'b is any nonzero number. The value 0<sup>0</sup> is left out here, because there are good arguments for different answers.'),
    p('There are three separate reasons to believe this. Each one shows that the rule is not a trick but the only choice that fits.'),
    ex('Reason 1: the pattern', ['Powers of 10: 10<sup>3</sup> = 1000, 10<sup>2</sup> = 100, 10<sup>1</sup> = 10.', 'Each time the exponent drops by 1, the value is divided by 10.', 'The next one down: 10 ÷ 10 = 1. So 10<sup>0</sup> = 1.']),
    formula('Dividing powers', 'b<sup>m</sup> ÷ b<sup>n</sup> = b<sup>m − n</sup>', 'm and n count the copies in the top and the bottom. Cancelling the common factors leaves m − n copies (for now, take m at least as big as n). The base b is not 0.'),
    ex('Reason 2: dividing a power by itself', ['Take 5<sup>3</sup> ÷ 5<sup>3</sup>. Anything (not 0) divided by itself is 1.', 'But also: cancel three 5s from the top and three from the bottom. Nothing is left, and 3 − 3 = 0 copies are left.', 'So 5<sup>0</sup> must be 1, or the rule "subtract exponents when dividing" would break.']),
    def('empty product', 'When you add up no numbers at all, the total is 0, because 0 is the starting point for adding. When you multiply no numbers at all, you are left with the starting point for multiplying, which is 1. So "zero copies of b" gives 1, whatever b is. This is Reason 3.'),
    ex('Using the rule', ['Find 4<sup>0</sup> + 4<sup>1</sup> + 4<sup>2</sup>.', '4<sup>0</sup> = 1, 4<sup>1</sup> = 4, 4<sup>2</sup> = 16.', 'The sum is 1 + 4 + 16 = 21.']),
    ex('Solving for a base', ['A positive whole number n satisfies n<sup>0</sup> + n<sup>1</sup> + n<sup>2</sup> = 31. What is n?', 'n<sup>0</sup> = 1, so the sum is 1 + n + n<sup>2</sup>. Try small values: n = 3 gives 1 + 3 + 9 = 13, and n = 4 gives 1 + 4 + 16 = 21.', 'n = 5 gives 1 + 5 + 25 = 31.', 'Therefore n = 5. Larger values of n give larger sums, so no other n works.']),
    tbl(['Expression', 'Meaning', 'Value'], [['7<sup>0</sup>', 'zero sevens multiplied', '1'], ['7<sup>1</sup>', 'one seven', '7'], ['1<sup>7</sup>', 'seven ones multiplied', '1'], ['0<sup>7</sup>', 'seven zeros multiplied', '0']], 'Four lookalikes that are not the same'),
    key('The zero exponent is <b>1</b>, and the reason is not a coincidence: it is the only value that keeps the pattern of dividing by the base, the rule for subtracting exponents, and the empty product all true at once.'),
    tip('If you meet a long expression with a zero exponent, replace that power by 1 immediately. For example, 3 × 5<sup>0</sup> = 3 × 1 = 3, and 8<sup>0</sup> + 8<sup>0</sup> = 2.'),
    tip('To test whether you remember the rule, use the pattern: write 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2 and keep halving. The next value, 1, is 2<sup>0</sup>. Halving again will give {1/2}, which the next lesson explains.'),
    warn('<b>Watch out.</b> b<sup>0</sup> is <i>not</i> 0 and it is <i>not</i> b. Also 3 × 5<sup>0</sup> is 3 × 1 = 3: the exponent 0 only touches the 5. And 0<sup>7</sup> is 0, while 7<sup>0</sup> is 1: swapping base and exponent changes the answer.'),
    mcq('Ben says "9<sup>0</sup> = 0, because there are no nines." What is the right answer, and why?', ['0, he is right.', '1. With no nines to multiply, we are left with the starting value for multiplying, which is 1; and 9<sup>3</sup> ÷ 9<sup>3</sup> = 9<sup>0</sup> has to be 1.', '9, because the base stays when the exponent is gone.'], 1, 'The empty product is 1. Also 9<sup>3</sup> ÷ 9<sup>3</sup> = 1 and it equals 9<sup>3−3</sup> = 9<sup>0</sup>. Zero would break that.', 'Spot the mistake'),
    recap([['zero exponent', 'b<sup>0</sup> = 1 for any b that is not 0'], ['empty product', 'multiplying no numbers gives 1'], ['0<sup>0</sup>', 'not defined in this course']], [['Zero exponent', 'b<sup>0</sup> = 1'], ['Dividing powers', 'b<sup>m</sup> ÷ b<sup>n</sup> = b<sup>m − n</sup>']]),
  ],

  practice: [
    num('p1', 'What is 17<sup>0</sup>?', 1, {
      h: ['Does the base matter?'],
      s: 'Any nonzero base to the power 0 is 1.',
      w: [['0', 'Zero copies multiplied is the empty product, which is 1.'], ['17', 'The base does not stay. Zero copies of 17 gives the empty product: 1.']],
    }),
    num('p2', 'Find 4<sup>0</sup> + 4<sup>1</sup> + 4<sup>2</sup>.', 21, {
      h: ['Evaluate each power: 4<sup>0</sup>, 4<sup>1</sup>, 4<sup>2</sup>.'],
      s: '1 + 4 + 16 = 21.',
      w: [['20', 'You treated 4<sup>0</sup> as 0. It is 1.'], ['12', 'That is 4 + 4 + 4. These are different powers: 1, 4 and 16.']],
    }),
    num('p3', 'Find 6<sup>7</sup> ÷ 6<sup>5</sup>.', 36, {
      h: ['Cancel five 6s from top and bottom. What is left on top?'],
      s: 'Seven 6s over five 6s: five cancel, leaving 6 × 6 = 6<sup>2</sup> = 36.',
      w: [['6', 'Two 6s remain, not one: 7 − 5 = 2.'], ['1', 'Only when the exponents are equal does everything cancel. Here two 6s are left.']],
    }),
    num('p4', 'How many of these four numbers equal 1? 1<sup>9</sup>, 9<sup>1</sup>, 9<sup>0</sup>, 0<sup>9</sup>', 2, {
      h: ['Do each one. 0<sup>9</sup> means nine zeros multiplied.'],
      s: '1<sup>9</sup> = 1, 9<sup>1</sup> = 9, 9<sup>0</sup> = 1, 0<sup>9</sup> = 0. Two of them are 1.',
      w: [['1', 'Two numbers hide a 1: one is a power of 1, the other has exponent 0.'], ['3', '9<sup>1</sup> is 9, and 0<sup>9</sup> is 0. Check each.']],
    }),
    num('p5', 'A positive whole number n satisfies n<sup>0</sup> + n<sup>1</sup> = 11. What is n?', 10, {
      h: ['n<sup>0</sup> is 1 no matter what n is.', 'Then 1 + n = 11.'],
      s: 'n<sup>0</sup> = 1, so 1 + n = 11 and n = 10.',
      w: [['11', 'n<sup>0</sup> is 1, not 0, so n + 1 = 11 gives n = 10.']],
    }),
    mc('p6', 'Which of these is <b>not</b> equal to 1?', ['25<sup>0</sup>', '(3<sup>5</sup>)<sup>0</sup>', '3 × 5<sup>0</sup>', '8<sup>3</sup> ÷ 8<sup>3</sup>'], 2, {
      h: ['In 3 × 5<sup>0</sup>, which number gets the exponent?'],
      s: 'The exponent 0 only touches the 5, so 3 × 5<sup>0</sup> = 3 × 1 = 3. The others are all 1.',
      w: [[1, '3<sup>5</sup> is a nonzero number, and any nonzero number to the 0 is 1.'], [3, 'Something divided by itself is 1.']],
    }),
    num('p7', 'Evaluate 2<sup>0</sup> + 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup>, then use the pattern to see something surprising: it is a power of 2. Which one? Give its value.', 8, {
      h: ['1 + 1 + 2 + 4.'],
      s: '1 + 1 + 2 + 4 = 8 = 2<sup>3</sup>. Adding all the previous powers of 2 (starting with 2<sup>0</sup>) plus one more 1 always lands on the next power.',
      w: [['7', 'There are two terms equal to 2<sup>0</sup> = 1, not just one.']],
    }),
  ],

  challenge: [
    chain('Dividing powers of ten', 'Let us explore how dividing powers behaves.', [
      num('c1a', 'What is 10<sup>5</sup> ÷ 10<sup>2</sup>?', 1000, { h: ['Cancel two 10s from the top.'], s: '10<sup>5</sup> ÷ 10<sup>2</sup> = 10<sup>3</sup> = 1000.', w: [['10', 'Three 10s are left, not one. 5 − 2 = 3.']] }),
      num('c1b', 'What is 10<sup>4</sup> ÷ 10<sup>4</sup>?', 1, { h: ['Cancel all four.'], s: 'Everything cancels, leaving 1, which is 10<sup>0</sup>.' }),
      num('c1c', 'For which exponent k is 10<sup>7</sup> ÷ 10<sup>k</sup> equal to 1?', 7, { h: ['You need everything to cancel.'], s: 'k must be 7, so all seven 10s on top are cancelled.', w: [['0', 'If k = 0 the bottom is 1, and the quotient is 10<sup>7</sup>.']] }),
    ], 'The idea: dividing b<sup>m</sup> by b<sup>n</sup> leaves m − n copies. When m = n nothing is left, which is the zero exponent.'),
    chain('Number detective', 'Use n<sup>0</sup> = 1 to crack these.', [
      num('c2a', 'What is 3<sup>0</sup> + 3<sup>2</sup>?', 10, { h: ['1 + 9.'], s: '1 + 9 = 10.' }),
      num('c2b', 'A positive whole number n has n<sup>0</sup> + n<sup>2</sup> = 17. What is n?', 4, { h: ['n<sup>2</sup> must be 16.'], s: '1 + n<sup>2</sup> = 17, so n<sup>2</sup> = 16 and n = 4.', w: [['16', '16 is n<sup>2</sup>. Ask what number is squared.']] }),
      num('c2c', 'A positive whole number n has n<sup>0</sup> + n<sup>1</sup> + n<sup>2</sup> = 7. What is n?', 2, { h: ['Try n = 2, then n = 3.'], s: 'For n = 2: 1 + 2 + 4 = 7. So n = 2.', w: [['3', 'For n = 3 the total is 1 + 3 + 9 = 13.']] }),
    ], 'The idea: n<sup>0</sup> always contributes exactly 1, so the unknown only lives in the other terms.'),
    mc('c3', 'Find the error. Dev computes 5 × 2<sup>0</sup> and writes "= 10<sup>0</sup> = 1". What went wrong?', ['He multiplied 5 × 2 first, but the exponent belongs only to the 2: 5 × 1 = 5.', 'Nothing, 5 × 2 = 10 and 10<sup>0</sup> = 1.', 'He should have got 0 since 2<sup>0</sup> = 0.', 'The answer is 2<sup>0</sup> = 1 and the 5 disappears.'], 0, {
      s: 'The exponent applies only to its own base. 2<sup>0</sup> = 1 first, then 5 × 1 = 5.',
      w: [[1, 'The exponent sticks to the 2 alone, so you cannot multiply 5 × 2 first.'], [2, '2<sup>0</sup> is 1, not 0.']],
    }),
  ],

  quiz: [
    tpl('zero', (r) => { const b = r.int(2, 99); return N('What is ' + b + '<sup>0</sup>?', 1, { s: 'Any nonzero base to the 0 power is 1.', w: [[0, 'Zero copies multiplied gives 1 (the empty product), not 0.'], [b, 'The base does not stay. Zero copies gives 1.']] }); }),
    tpl('sumpow', (r) => { const b = r.int(2, 12), k = r.int(2, 4); let v = 0, t = []; for (let i = 0; i <= k; i++) { v += pw(b, i); t.push(b + '<sup>' + i + '</sup>'); } return N('Find ' + t.join(' + ') + '.', v, { s: 'The terms are ' + Array.from({ length: k + 1 }, (_, i) => pw(b, i)).join(' + ') + ' = ' + v + '.', w: [[v - 1, 'The first term is ' + b + '<sup>0</sup> = 1, not 0.']] }); }),
    tpl('quot', (r) => { const b = r.int(2, 9), n = r.int(1, 4), d = r.int(2, 4); return N('Find ' + b + '<sup>' + (n + d) + '</sup> ÷ ' + b + '<sup>' + n + '</sup>.', pw(b, d), { s: 'Cancel ' + n + (n === 1 ? ' copy of ' : ' copies of ') + b + ', leaving ' + d + ': ' + b + '<sup>' + d + '</sup> = ' + pw(b, d) + '.', w: W(b * d, pw(b, d), 'The exponent counts copies: ' + b + ' is multiplied by itself ' + d + ' times.') }); }),
    tpl('ones', (r) => {
      const a = r.int(2, 9), c = r.int(2, 9), d = r.int(2, 9), e = r.int(2, 9);
      const all = [[a + '<sup>0</sup>', 1], [c + '<sup>1</sup>', c], ['1<sup>' + d + '</sup>', 1], ['0<sup>' + e + '</sup>', 0], [d + '<sup>' + e + '</sup> ÷ ' + d + '<sup>' + e + '</sup>', 1], [a + ' × ' + c + '<sup>0</sup>', a]];
      const pick = r.shuffle(all).slice(0, 4);
      const ans = pick.filter((x) => x[1] === 1).length;
      return N('How many of these four numbers are equal to 1? ' + pick.map((x) => x[0]).join(' ; '), ans, { s: 'Evaluate each: ' + pick.map((x) => x[1]).join(', ') + '. Exactly ' + ans + ' of them are 1.' });
    }),
    tpl('solve', (r) => { const k = r.int(2, 80); return N('A positive whole number n satisfies n<sup>0</sup> + n<sup>1</sup> = ' + (k + 1) + '. What is n?', k, { s: 'n<sup>0</sup> = 1, so 1 + n = ' + (k + 1) + ' and n = ' + k + '.', w: [[k + 1, 'n<sup>0</sup> is 1, not 0, so n is one less than ' + (k + 1) + '.']] }); }),
    tpl('mult', (r) => { const a = r.int(2, 30), b = r.int(2, 12), pwr = r.int(1, 3); return N('Find ' + a + ' × ' + b + '<sup>0</sup> + ' + b + '<sup>' + pwr + '</sup>.', a + pw(b, pwr), { s: b + '<sup>0</sup> = 1, so ' + a + ' × 1 + ' + pw(b, pwr) + ' = ' + (a + pw(b, pwr)) + '.', w: [[1 + pw(b, pwr), 'The ' + a + ' was dropped. Only the ' + b + ' gets the exponent.']] }); }),
    tpl('mcz', (r) => { const b = r.int(2, 40), m = r.int(2, 9); return choice(r, 'Which of these equals (' + b + '<sup>' + m + '</sup>)<sup>0</sup>?', '1', ['0', String(b), String(pw(b, m))], { s: 'A nonzero number to the zero power is 1, even when that number is itself a power.' }); }),
  ],
});
