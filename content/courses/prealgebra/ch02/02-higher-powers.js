import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const pw = (b, e) => Math.pow(b, e);
const W = (v, a, msg) => (v === a ? [] : [[v, msg]]);

export default lesson({
  id: 'pre-2-2-higher-powers',
  title: 'Higher powers',
  blurb: 'Cubes, powers of 2 and 10, and the big idea: an exponent counts copies of a factor, and it grows faster than you expect.',
  concepts: ['exponents', 'powers', 'exponential-growth'],

  tryFirst: [
    num('t1', 'A pond has 1 water lily on Monday. The number of lilies doubles every day. How many lilies are there on the following Sunday, 6 days later?', 64, {
      h: ['Write it day by day: 1, 2, 4, ...', 'Monday = 1. Tuesday = 2. How many doublings are there by Sunday?'],
      s: 'Doubling six times: 1, 2, 4, 8, 16, 32, 64. So 64 lilies.',
      w: [['12', 'You added 2 each day. Doubling multiplies by 2 each day: 1, 2, 4, 8, ...']],
    }),
    num('t2', 'A big cube is built from small unit cubes, 3 along each edge. How many small cubes are there in the whole thing?', 27, {
      h: ['Build one layer first: a 3 by 3 square.', 'How many layers?'],
      s: 'One layer is 3 × 3 = 9 cubes, and there are 3 layers: 9 × 3 = 27.',
      w: [['9', 'That is just one layer. The cube has 3 layers.']],
    }),
  ],

  learn: [
    p('Squaring multiplies two copies of a number. Why stop at two? An <b>exponent</b> tells you how many copies of the <b>base</b> to multiply together: 2<sup>5</sup> = 2 × 2 × 2 × 2 × 2 = 32. We say "2 to the fifth power". The exponent 3 has its own nickname, <b>cubed</b>, because 3<sup>3</sup> is the number of little cubes in a 3 by 3 by 3 cube.'),
    widget('exponentTiles', { b: 2, e: 3 }),
    def('power', 'An expression b<sup>n</sup> with a base b and a whole-number exponent n is called a <b>power</b>. It means n copies of b multiplied together. The exponent is not a multiplier: 5<sup>3</sup> = 5 × 5 × 5 = 125, never 5 × 3 = 15.'),
    rule('<b>Exponent = number of copies.</b> b<sup>n</sup> means n copies of b multiplied together. So 5<sup>3</sup> = 5 × 5 × 5 = 125, never 5 × 3.'),
    tbl(['Power', '2<sup>1</sup>', '2<sup>2</sup>', '2<sup>3</sup>', '2<sup>4</sup>', '2<sup>5</sup>', '2<sup>6</sup>', '2<sup>7</sup>', '2<sup>8</sup>', '2<sup>9</sup>', '2<sup>10</sup>'], [['Value', '2', '4', '8', '16', '32', '64', '128', '256', '512', '1024']], 'Powers of 2: each step doubles'),
    tbl(['n', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['n<sup>3</sup>', '1', '8', '27', '64', '125', '216', '343', '512', '729', '1000']], 'The first ten cubes'),
    def('powers of 10', '10<sup>1</sup> = 10, 10<sup>2</sup> = 100, 10<sup>3</sup> = 1000. The exponent is the number of zeros after the 1. That is why a million, 1,000,000, is 10<sup>6</sup>.'),
    p('Powers grow fast. Each step up in the exponent multiplies by the base again. Doubling 10 times already gives 1024, and doubling 20 times gives more than a million. This is why the exponent is useful: it keeps huge numbers short.'),
    ex('Multiplying powers by counting factors', ['What is 2<sup>3</sup> × 2<sup>4</sup>?', 'Write them out: (2 × 2 × 2) × (2 × 2 × 2 × 2).', 'Count the 2s: there are 3 + 4 = 7 of them.', 'So 2<sup>3</sup> × 2<sup>4</sup> = 2<sup>7</sup> = 128. Same base: <b>add</b> the exponents.']),
    formula('Product of powers', 'b<sup>m</sup> × b<sup>n</sup> = b<sup>m + n</sup>', 'The bases must be the same. m and n count the copies in each part, and together there are m + n copies.'),
    ex('A power of a power', ['What is (3<sup>2</sup>)<sup>3</sup>?', 'That is 3<sup>2</sup> × 3<sup>2</sup> × 3<sup>2</sup>: three copies of two 3s.', 'Count: 2 + 2 + 2 = 6 threes. So (3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup> = 729.']),
    formula('Power of a power', '(b<sup>m</sup>)<sup>n</sup> = b<sup>m × n</sup>', 'n copies of a group of m factors gives m × n factors in all.'),
    ex('Last digits repeat', ['What is the last digit of 2<sup>20</sup>?', 'The last digits of 2<sup>1</sup>, 2<sup>2</sup>, 2<sup>3</sup>, 2<sup>4</sup>, 2<sup>5</sup>, … are 2, 4, 8, 6, 2, 4, 8, 6, …', 'The pattern repeats every 4 steps, and 20 is a multiple of 4, so 2<sup>20</sup> ends the way 2<sup>4</sup> does.', 'The last digit is 6. (In fact 2<sup>20</sup> = 1,048,576.)']),
    ex('Doubling in a tournament', ['64 players enter a knockout event, and the loser of each game is out. How many rounds?', 'Each round halves the field: 64, 32, 16, 8, 4, 2, 1.', 'That is 6 halvings. This agrees with 2<sup>6</sup> = 64.', 'So 6 rounds are needed.']),
    key('An exponent counts <b>repeated multiplication</b>. When you multiply powers with the same base you <i>add</i> the exponents (count the factors), and when you raise a power to a power you <i>multiply</i> them. If you forget which, write the factors out.'),
    tip('Know the powers of 2 up to 2<sup>10</sup> = 1024 and the cubes up to 10<sup>3</sup>. To find the smallest n with 2<sup>n</sup> bigger than 1000, note 2<sup>10</sup> = 1024 is the first to pass 1000, so n = 10.'),
    tip('If an exponent rule feels uncertain, test it with small numbers. 2<sup>2</sup> × 2<sup>3</sup> = 4 × 8 = 32 = 2<sup>5</sup>, so exponents add. If you had multiplied them you would get 2<sup>6</sup> = 64, which is wrong.'),
    warn('<b>Watch out.</b> Three traps: 2<sup>3</sup> is 8, not 2 × 3 = 6. And 2<sup>3</sup> is not 3<sup>2</sup>: 8 versus 9. Finally, when multiplying 2<sup>3</sup> × 2<sup>4</sup> you add the exponents, you do not multiply the bases (the answer is not 4<sup>7</sup>). The rule needs the <i>same base</i>: in 2<sup>3</sup> × 3<sup>2</sup> = 8 × 9 = 72 the bases differ, so the exponents cannot be added.'),
    mcq('Ava says "2<sup>3</sup> × 2<sup>4</sup> = 2<sup>12</sup>, because 3 × 4 = 12." What is wrong?', ['Nothing, you multiply exponents.', 'There are 3 twos in the first part and 4 twos in the second, 7 twos in total, so it is 2<sup>7</sup>. The exponents are added.', 'The answer should be 4<sup>7</sup>.'], 1, 'Counting copies: 3 + 4 = 7 twos, so 2<sup>7</sup> = 128. (2<sup>12</sup> would be 4096, which is far too big.)', 'Spot the mistake'),
    recap([['power', 'b<sup>n</sup>: n copies of b multiplied'], ['cubed', 'raised to the power 3'], ['power of 10', '10<sup>n</sup> is a 1 followed by n zeros']], [['Product of powers', 'b<sup>m</sup> × b<sup>n</sup> = b<sup>m + n</sup>'], ['Power of a power', '(b<sup>m</sup>)<sup>n</sup> = b<sup>m × n</sup>']]),
  ],

  practice: [
    num('p1', 'What is 4<sup>3</sup>?', 64, {
      h: ['4<sup>3</sup> = 4 × 4 × 4.', '4 × 4 = 16, then times 4.'],
      s: '4 × 4 × 4 = 16 × 4 = 64.',
      w: [['12', 'That is 4 × 3. The exponent counts how many 4s you multiply: 4 × 4 × 4.'], ['81', 'That is 3<sup>4</sup>. The base is 4, and 4 is used 3 times.']],
    }),
    num('p2', 'Find 3<sup>2</sup> − 2<sup>3</sup>.', 1, {
      h: ['Work out each power separately.'],
      s: '3<sup>2</sup> = 9 and 2<sup>3</sup> = 8, so 9 − 8 = 1.',
      w: [['0', 'They look alike but are different: 3<sup>2</sup> = 3 × 3 = 9, and 2<sup>3</sup> = 2 × 2 × 2 = 8.']],
    }),
    num('p3', 'What is the value of 2<sup>5</sup> × 2<sup>3</sup>?', 256, {
      h: ['Count the total number of 2s being multiplied.'],
      s: '5 + 3 = 8 twos, so 2<sup>8</sup> = 256.',
      w: [['32768', 'That is 2<sup>15</sup>. You multiplied the exponents; you should have added them (5 + 3 = 8).'], ['1024', 'That is 2<sup>10</sup>. Count the twos: 5 + 3 = 8, not 10.']],
    }),
    num('p4', 'How many zeros are there in 10<sup>6</sup> when written as a whole number?', 6, {
      h: ['10<sup>2</sup> = 100 has 2 zeros. 10<sup>3</sup> = 1000 has 3.'],
      s: 'The exponent on 10 equals the number of zeros: 1,000,000 has 6 zeros.',
      w: [['7', 'The number 1,000,000 has seven digits, but only six of them are zeros.']],
    }),
    num('p5', 'What is the smallest whole number n for which 2<sup>n</sup> is bigger than 1000?', 10, {
      h: ['Use the table of powers of 2.', '2<sup>9</sup> = 512.'],
      s: '2<sup>9</sup> = 512 is too small, and 2<sup>10</sup> = 1024 passes 1000. So n = 10.',
      w: [['9', '2<sup>9</sup> = 512, which is not above 1000.'], ['500', 'n is the exponent, not the answer to the power. Try small exponents.']],
    }),
    mc('p6', 'Which is the greatest number?', ['2<sup>10</sup>', '10<sup>2</sup>', '3<sup>5</sup>', '5<sup>3</sup>'], 0, {
      h: ['Compute each one: 1024, 100, 243, 125.'],
      s: '2<sup>10</sup> = 1024, 10<sup>2</sup> = 100, 3<sup>5</sup> = 243, 5<sup>3</sup> = 125. The first is the greatest. Powers with a big exponent beat powers with a big base.',
      w: [[1, '10<sup>2</sup> = 10 × 10 = 100 only. Big bases do not always win.'], [2, '3<sup>5</sup> = 243, which is less than 2<sup>10</sup> = 1024.']],
    }),
    num('p7', 'A knockout tournament starts with 64 players. In every round each player plays one game and the loser is out. How many rounds are needed to find the champion?', 6, {
      h: ['After each round, how many players are left?', '64, 32, 16, ...'],
      s: 'Each round halves the field: 64, 32, 16, 8, 4, 2, 1. That is 6 rounds, matching 2<sup>6</sup> = 64.',
      w: [['32', '32 is how many games are played in the first round. We want the number of rounds.'], ['63', 'That is the total number of games, not rounds.']],
    }),
    num('p8', 'What is the last digit (units digit) of 2<sup>20</sup>?', 6, {
      h: ['Write the last digits of 2<sup>1</sup>, 2<sup>2</sup>, 2<sup>3</sup>, 2<sup>4</sup>, 2<sup>5</sup>, ... and look for a cycle.'],
      s: 'The last digits go 2, 4, 8, 6, then repeat every 4 steps. 20 is a multiple of 4, so it matches 2<sup>4</sup> and ends in 6.',
      w: [['2', 'The cycle has length 4: 2, 4, 8, 6. 20 is a multiple of 4, which lands on the 4th entry.'], ['0', 'Powers of 2 are never multiples of 10, so they never end in 0.']],
    }),
  ],

  challenge: [
    chain('The chain letter', 'You email a joke to 3 friends (round 1). Each of them emails it to 3 new people (round 2), and so on. Everybody receives it only once.', [
      num('c1a', 'How many people receive it in round 4?', 81, { h: ['Round 1 is 3. Round 2 is 3 × 3.'], s: 'Round n has 3<sup>n</sup> new people. Round 4: 3<sup>4</sup> = 81.' }),
      num('c1b', 'How many people have received it altogether after round 4?', 120, { h: ['Add up rounds 1 to 4: 3, 9, 27, 81.'], s: '3 + 9 + 27 + 81 = 120.', w: [['81', 'That is only the round 4 people. Add all four rounds.']] }),
      num('c1c', 'In which round does the number of new people in that single round first pass 1000?', 7, { h: ['3<sup>6</sup> = 729. What is the next power?'], s: '3<sup>6</sup> = 729 is under 1000, and 3<sup>7</sup> = 2187 is over. Round 7.', w: [['6', '3<sup>6</sup> = 729, which has not passed 1000 yet.']] }),
    ], 'The idea: repeated multiplying outruns repeated adding. A small base like 3 gets past a thousand in only seven steps.'),
    chain('One number, many faces', 'The number 64 can be written as a power in several ways.', [
      num('c2a', 'What is 2<sup>6</sup>?', 64, { h: ['Use the table of powers of 2.'], s: '2<sup>6</sup> = 64.' }),
      num('c2b', 'What is 8<sup>2</sup>?', 64, { h: ['8 × 8.'], s: '8 × 8 = 64.' }),
      num('c2c', 'Complete: 64 = ?<sup>3</sup>. What is the base?', 4, { h: ['Which number times itself three times gives 64?'], s: '4 × 4 × 4 = 64, so the base is 4.', w: [['21', 'That is 64 ÷ 3 (about). The base is multiplied three times.']] }),
    ], 'The idea: a number can be a square, a cube and a sixth power at once. 64 is 8<sup>2</sup>, 4<sup>3</sup> and 2<sup>6</sup>.'),
    mc('c3', 'Find the error. Sam writes: "5<sup>3</sup> = 15 because 5 × 3 = 15." What is the best correction?', ['5<sup>3</sup> = 5 × 5 × 5 = 125, because the exponent says how many 5s are multiplied.', '5<sup>3</sup> = 8, because you add.', '5<sup>3</sup> = 15 is right if you write it as 5 + 5 + 5.', '5<sup>3</sup> = 53.'], 0, {
      s: 'Three copies of 5 multiplied together: 5 × 5 × 5 = 25 × 5 = 125.',
      w: [[1, '5 + 3 = 8 is another wrong operation. Exponents mean repeated multiplication.'], [2, 'The sum 5 + 5 + 5 is 3 × 5, which is a different thing from 5<sup>3</sup>.']],
    }),
  ],

  quiz: [
    tpl('pow', (r) => { const e = r.int(2, 5), b = r.int(2, e > 3 ? 7 : 12); return N('What is ' + b + '<sup>' + e + '</sup>?', pw(b, e), { s: 'Multiply ' + e + ' copies of ' + b + ' to get ' + pw(b, e) + '.', w: W(b * e, pw(b, e), 'The exponent counts copies: ' + b + ' is multiplied by itself ' + e + ' times, not by ' + e + '.') }); }),
    tpl('swap', (r) => { let a = r.int(2, 8), b = r.int(2, 8); while (a === b) b = r.int(2, 8); const v = pw(a, b) - pw(b, a); return N('Find ' + a + '<sup>' + b + '</sup> − ' + b + '<sup>' + a + '</sup>. (Answer may be negative.)', v, { s: pw(a, b) + ' − ' + pw(b, a) + ' = ' + v + '.' }); }),
    tpl('zeros', (r) => { const n = r.int(3, 15); const ask = r.bool(); return N(ask ? 'How many zeros does 10<sup>' + n + '</sup> have when written out as a whole number?' : 'A number is a 1 followed by ' + n + ' zeros. What exponent k makes it equal to 10<sup>k</sup>?', n, { s: 'The exponent on 10 equals the number of zeros: ' + n + '.', w: [[n + 1, 'The whole number has ' + (n + 1) + ' digits, but the zeros are ' + n + ' of them.']] }); }),
    tpl('doubling', (r) => { const s = r.int(1, 9), k = r.int(3, 9), who = name(r); return N(who + ' has ' + s + ' ' + (s === 1 ? 'bacterium' : 'bacteria') + ' in a dish. The count doubles every hour. How many are there after ' + k + ' hours?', s * pw(2, k), { s: s + ' × 2<sup>' + k + '</sup> = ' + s + ' × ' + pw(2, k) + ' = ' + s * pw(2, k) + '.', w: [[s + 2 * k, 'That adds 2 each hour. Doubling multiplies by 2 each hour.']] }); }),
    tpl('combine', (r) => { const b = r.pick([2, 3, 5, 10]); const m = r.int(2, 4), n = r.int(2, 4); return N('Find the value of ' + b + '<sup>' + m + '</sup> × ' + b + '<sup>' + n + '</sup>.', pw(b, m + n), { s: m + ' + ' + n + ' = ' + (m + n) + ' copies of ' + b + ', so ' + b + '<sup>' + (m + n) + '</sup> = ' + pw(b, m + n) + '.', w: W(pw(b, m * n), pw(b, m + n), 'You multiplied the exponents. Same base: add them, because you are counting copies.') }); }),
    tpl('powpow', (r) => { const b = r.pick([2, 3, 5, 10]); const m = r.int(2, 4), n = r.int(2, 4); return N('Find the value of (' + b + '<sup>' + m + '</sup>)<sup>' + n + '</sup>.', pw(b, m * n), { s: n + ' copies of ' + b + '<sup>' + m + '</sup> is ' + m + ' × ' + n + ' = ' + (m * n) + ' copies of ' + b + ': ' + pw(b, m * n) + '.', w: W(pw(b, m + n), pw(b, m * n), 'That adds the exponents, which is for multiplying powers. A power of a power multiplies them.') }); }),
    tpl('smallestn', (r) => { const k = r.int(2, 6) * 1000 + r.int(0, 9) * 7; let n = 0; while (pw(2, n) <= k) n++; return N('What is the smallest whole number n for which 2<sup>n</sup> is greater than ' + k + '?', n, { s: '2<sup>' + (n - 1) + '</sup> = ' + pw(2, n - 1) + ' is not above ' + k + ', but 2<sup>' + n + '</sup> = ' + pw(2, n) + ' is.', w: [[n - 1, '2<sup>' + (n - 1) + '</sup> = ' + pw(2, n - 1) + ' is not bigger than ' + k + '.']] }); }),
    tpl('cubes', (r) => { const k = r.int(3, 60); return N('A solid cube is built from unit cubes, ' + k + ' along every edge. How many unit cubes are in it?', pw(k, 3), { s: k + ' × ' + k + ' × ' + k + ' = ' + pw(k, 3) + '.', w: [[k * k, 'That is one layer only. There are ' + k + ' layers.'], [3 * k, 'The count is ' + k + '<sup>3</sup>, three copies multiplied, not 3 × ' + k + '.']] }); }),
  ],
});
