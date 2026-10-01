import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm } from '../../../../src/content/dsl.js';

const divs = (n) => { const o = []; for (let i = 1; i <= n; i++) if (n % i === 0) o.push(i); return o; };

export default lesson({
  id: 'pre-3-6-divisors-and-gcd',
  title: 'Divisors and GCD',
  blurb: 'Find every divisor of a number, count them from the prime recipe, and find the greatest number that divides two numbers at once.',
  concepts: ['divisors', 'gcd', 'prime-factorization'],

  tryFirst: [
    num('t1', 'How many different whole numbers divide 36 exactly? (Include 1 and 36.)', 9, {
      h: ['Look for pairs that multiply to 36: 1 × 36, 2 × 18, ...', 'A pair like 6 × 6 gives only one new number.'],
      s: 'The pairs are 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6. The divisors are 1, 2, 3, 4, 6, 9, 12, 18, 36: nine of them.',
      w: [['10', '6 × 6 is a pair where both numbers are the same, so it only gives one divisor, not two.'], ['8', 'Check your list: 1, 2, 3, 4, 6, 9, 12, 18, 36.']],
    }),
    num('t2', 'Two ribbons are 24 cm and 36 cm long. You cut each one into equal pieces with no ribbon left over, and all pieces from both ribbons must be the same length (a whole number of cm). What is the longest possible piece length?', 12, {
      h: ['The piece length must divide 24 and must divide 36.', 'List the divisors of each and find the biggest one that is on both lists.'],
      s: 'Divisors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Divisors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The largest on both lists is 12.',
      w: [['6', '6 works but there is a longer length that does too.'], ['72', '72 is a common multiple, but pieces cannot be longer than the ribbons.']],
    }),
  ],

  learn: [
    p('We have met <b>divisors</b> already: the numbers that divide a number exactly. Now we will find all of them without missing any, count them without listing them, and find the divisors two numbers share.'),
    widget('lcmGcd', { a: 24, b: 36 }),
    rule('<b>Divisors come in pairs.</b> If a × b = n, then both a and b divide n. To list all divisors of n, test 1, 2, 3, … and write each partner as you go. You can stop when you reach the square root, because after that the partners repeat.'),
    ex('Every divisor of 60', ['Test 1: 1 × 60. Test 2: 2 × 30. 3: 3 × 20. 4: 4 × 15. 5: 5 × 12. 6: 6 × 10.', 'Test 7: no. 8 is no. Stop: 8 × 8 = 64 is already past 60.', 'The divisors are 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60: twelve of them.']),
    ex('Counting divisors from the recipe', ['36 = 2<sup>2</sup> × 3<sup>2</sup>. A divisor uses 0, 1 or 2 twos and 0, 1 or 2 threes.', 'That is 3 choices for the twos and 3 for the threes: 3 × 3 = 9 divisors.', 'In general, add 1 to each exponent and multiply. For 60 = 2<sup>2</sup> × 3 × 5: (2 + 1)(1 + 1)(1 + 1) = 12. It matches.']),
    rule('<b>GCD.</b> The greatest common divisor of two numbers is the largest number that divides both. GCD(24, 36) = 12. Using prime recipes: for each prime take the <b>smaller</b> exponent. 24 = 2<sup>3</sup> × 3 and 36 = 2<sup>2</sup> × 3<sup>2</sup> give 2<sup>2</sup> × 3 = 12.'),
    p('Compare with LCM: for the LCM you take the <i>larger</i> exponent, for the GCD the <i>smaller</i> one. Together they use up every prime exactly as the two numbers do, which gives a neat check: <b>GCD × LCM = a × b</b>. For 24 and 36: 12 × 72 = 864 = 24 × 36.'),
    tbl(['Pair', 'GCD', 'LCM', 'Product of the pair'], [['24, 36', '12', '72', '864'], ['8, 15', '1', '120', '120'], ['18, 30', '6', '90', '540']], 'GCD times LCM equals the product of the two numbers'),
    p('If the GCD of two numbers is 1 they are called <b>coprime</b> (or relatively prime). 8 and 15 are coprime even though neither is prime. Later this gives a quick way to simplify fractions: divide top and bottom by their GCD.'),
    warn('<b>Watch out.</b> GCD and LCM sound alike. The GCD is a <i>divisor</i>, so it is never bigger than the smaller number. The LCM is a <i>multiple</i>, so it is never smaller than the bigger number. If your "GCD" is bigger than one of the numbers, you found a multiple.'),
    mcq('Maya says "GCD(12, 18) = 36." What is wrong?', ['Nothing, it is correct.', '36 is the LCM. The GCD must divide both numbers, so it cannot be bigger than 12. GCD(12, 18) = 6.', 'The GCD is 216.'], 1, 'Divisors of 12 and 18 in common: 1, 2, 3, 6. The greatest is 6. 36 is the smallest common multiple.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'How many divisors does 48 have?', 10, {
      h: ['48 = 2<sup>4</sup> × 3. Add one to each exponent and multiply.'],
      s: '(4 + 1)(1 + 1) = 5 × 2 = 10. The divisors: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.',
      w: [['8', 'Check the powers of 2: 2<sup>0</sup> to 2<sup>4</sup> is five choices.'], ['5', 'You counted only the choices for 2. The 3 gives a second choice.']],
    }),
    num('p2', 'Add up all the divisors of 28 except 28 itself.', 28, {
      h: ['Divisors of 28: 1, 2, 4, 7, 14, 28.'],
      s: '1 + 2 + 4 + 7 + 14 = 28. A number equal to the sum of its other divisors is called a perfect number.',
      w: [['56', 'That includes 28 itself. Leave it out.']],
    }),
    num('p3', 'Find GCD(42, 56).', 14, {
      h: ['42 = 2 × 3 × 7 and 56 = 2<sup>3</sup> × 7.', 'Take the smaller exponent of each prime.'],
      s: '2 × 7 = 14. Check: 42 = 14 × 3, 56 = 14 × 4.',
      w: [['168', '168 is the LCM. The GCD uses the smaller exponents.'], ['7', '7 divides both, but 14 does too and is larger.']],
    }),
    num('p4', 'Find GCD(17, 40).', 1, {
      h: ['17 is prime. Does 17 divide 40?'],
      s: '17 is prime, and 17 does not divide 40, so the only common divisor is 1.',
      w: [['680', '680 is the product (and LCM). The GCD of numbers sharing no factors is 1.']],
    }),
    num('p5', 'A floor is 84 cm by 126 cm. You want to cover it exactly with identical square tiles, as large as possible. How many tiles do you need?', 6, {
      h: ['The side of the tile must divide both 84 and 126.', 'The largest such side is the GCD.'],
      s: 'GCD(84, 126) = 42. The floor is 2 tiles by 3 tiles, so 6 tiles.',
      w: [['42', '42 is the side length of each tile. The question asks how many tiles.'], ['10584', 'That is the area in square cm, not the number of tiles.']],
    }),
    num('p6', 'What is the smallest positive number with exactly 6 divisors?', 12, {
      h: ['6 = 2 × 3 or 6 = 6 × 1. Which exponents give (a + 1)(b + 1) = 6?', 'Try 2<sup>2</sup> × 3 or list the divisors of small numbers.'],
      s: '12 has divisors 1, 2, 3, 4, 6, 12: six. Smaller numbers have fewer. (Number 6 has 4, 8 has 4, 10 has 4.)',
      w: [['18', '18 also has six divisors, but 12 is smaller.'], ['6', '6 has only 4 divisors: 1, 2, 3, 6.']],
    }),
    num('p7', 'Two numbers have GCD 6 and LCM 72. One of them is 18. What is the other?', 24, {
      h: ['GCD × LCM = product of the two numbers.', '6 × 72 = 432. Divide by 18.'],
      s: '6 × 72 = 432 and 432 ÷ 18 = 24. Check: GCD(18, 24) = 6 and LCM(18, 24) = 72.',
      w: [['12', '12 has GCD 6 with 18, but the LCM would be 36, not 72.'], ['432', '432 is the product of GCD and LCM; divide it by the number you already know.']],
    }),
    num('p8', 'A ribbon of 45 cm and a ribbon of 60 cm are each cut into pieces of the greatest possible equal length. How many pieces are there altogether?', 7, {
      h: ['The piece length is the GCD.'],
      s: 'GCD(45, 60) = 15. 45 ÷ 15 = 3 pieces and 60 ÷ 15 = 4 pieces: 7 in all.',
      w: [['15', '15 is the piece length, not the number of pieces.']],
    }),
  ],

  challenge: [
    chain('One hundred lockers', 'A hallway has 100 closed lockers numbered 1 to 100. Student 1 walks by and flips (opens if closed, closes if open) every locker. Student 2 flips every 2nd locker, student 3 every 3rd locker, and so on up to student 100.', [
      num('c1a', 'How many times is locker 12 flipped in total?', 6, { h: ['Locker 12 is flipped by student k when k divides 12.'], s: 'The divisors of 12 are 1, 2, 3, 4, 6, 12: six flips. Even, so it ends closed.' }),
      num('c1b', 'How many times is locker 36 flipped?', 9, { h: ['Count the divisors of 36.'], s: '36 has 9 divisors. An odd number of flips leaves the locker open.', w: [['10', 'The divisor 6 pairs with itself, so it only counts once.']] }),
      num('c1c', 'How many lockers are open at the end?', 10, { h: ['A locker is open when it is flipped an odd number of times. Divisors usually come in pairs; when is there a "lonely" divisor?', 'Which numbers have an odd number of divisors? Think: 36, 16, 25, ...'], s: 'Divisors pair up except when a × a = n. So an odd count happens exactly for perfect squares. The squares from 1 to 100 are 1, 4, 9, ..., 100: ten lockers.', w: [['100', 'Only perfect squares have an odd number of divisors.'], ['50', 'Only perfect squares end up open.']] }),
    ], 'The idea: divisors come in pairs, except for the square root, which pairs with itself. So only perfect squares have an odd number of divisors.'),
    chain('GCD and LCM together', 'Let us check the identity GCD × LCM = product, on 30 and 45.', [
      num('c2a', 'What is GCD(30, 45)?', 15, { h: ['30 = 2 × 3 × 5 and 45 = 3<sup>2</sup> × 5.'], s: '3 × 5 = 15.' }),
      num('c2b', 'What is 30 × 45?', 1350, { h: ['30 × 45 = 3 × 45 × 10.'], s: '135 × 10 = 1350.' }),
      num('c2c', 'Use these to find LCM(30, 45) without listing multiples.', 90, { h: ['GCD × LCM = 1350.'], s: 'LCM = 1350 ÷ 15 = 90. Check: 90 = 30 × 3 = 45 × 2.', w: [['15', '15 is the GCD. Divide the product by it to get the LCM.']] }),
    ], 'The idea: GCD takes the shared part and LCM takes everything; multiplied they use each prime exactly as the product does.'),
    mc('c3', 'Find the error. Ava says: "GCD(8, 12) = 24, because 24 is the smallest number that both 8 and 12 go into." What is wrong?', ['She found the LCM. The GCD is the greatest number that goes <i>into</i> both: 4.', 'Nothing, 24 is correct.', 'The GCD is 96, the product.', 'The GCD is 20, the sum.'], 0, {
      s: 'The smallest number both go into is the LCM = 24. The GCD is the largest divisor shared by 8 and 12, which is 4 (8 = 4 × 2, 12 = 4 × 3).',
      w: [[1, '24 is a multiple of 8 and 12, so it cannot be a divisor of them: a divisor is never bigger than the number.'], [2, '96 is the product, much bigger than either number.']],
    }),
  ],

  quiz: [
    tpl('ndiv', (r) => { const n = r.int(12, 150); const d = divs(n); return N('How many divisors does ' + n + ' have? (Count 1 and ' + n + ' too.)', d.length, { s: 'The divisors are ' + d.join(', ') + ': ' + d.length + ' of them.', w: [[d.length + 1, 'Be careful with divisors that pair with themselves (like 6 × 6): they count once.']].filter((x) => Math.sqrt(n) % 1 === 0) }); }),
    tpl('gcd2', (r) => { const g = r.int(2, 15), x = r.int(2, 9); let y = r.int(2, 9); while (y === x) y = r.int(2, 9); const a = g * x, b = g * y; const G = gcd(a, b); return N('Find GCD(' + a + ', ' + b + ').', G, { s: 'The largest number that divides both ' + a + ' and ' + b + ' is ' + G + '.', w: [[lcm(a, b), lcm(a, b) + ' is the LCM. The GCD must divide both numbers.']] }); }),
    tpl('sumd', (r) => { const n = r.int(10, 120); const d = divs(n); const s = d.reduce((a, x) => a + x, 0) - n; return N('Add all the divisors of ' + n + ' except ' + n + ' itself.', s, { s: 'The divisors are ' + d.join(', ') + '. Without ' + n + ' the sum is ' + s + '.', w: [[s + n, 'That includes ' + n + ' itself. Leave it out.']] }); }),
    tpl('ribbons', (r) => { const g = r.int(3, 20), x = r.int(2, 8); let y = r.int(2, 8); while (y === x || gcd(x, y) !== 1) y = r.int(2, 8); const a = g * x, b = g * y; return N(name(r) + ' has two ropes, ' + a + ' cm and ' + b + ' cm long. Both ropes are cut into equal pieces, all the same length, with nothing left over. What is the greatest possible length of a piece in cm?', g, { s: 'The longest piece is GCD(' + a + ', ' + b + ') = ' + g + '.' }); }),
    tpl('tiles', (r) => { const g = r.int(3, 15), x = r.int(2, 7); let y = r.int(2, 7); while (y === x || gcd(x, y) !== 1) y = r.int(2, 7); const a = g * x, b = g * y; return N('A rectangle measures ' + a + ' cm by ' + b + ' cm. It is covered exactly with identical square tiles, as large as possible. How many tiles are used?', x * y, { s: 'The tile side is GCD = ' + g + '. The rectangle is ' + x + ' tiles by ' + y + ' tiles, so ' + x * y + ' tiles.', w: [[g, g + ' is the side of each tile, not the number of tiles.']].filter((w) => w[0] !== x * y) }); }),
    tpl('othernum', (r) => { const g = r.int(2, 9); const x = r.pick([2, 3, 4, 5]); let y = r.pick([3, 5, 7, 8, 9]); while (y === x || gcd(x, y) !== 1) y = r.pick([3, 5, 7, 8, 9]); const a = g * x, b = g * y, Lv = g * x * y; return N('Two numbers have GCD ' + g + ' and LCM ' + Lv + '. One of them is ' + a + '. What is the other?', b, { s: 'GCD × LCM = product, so the other is ' + g + ' × ' + Lv + ' ÷ ' + a + ' = ' + b + '.', w: [[g * Lv, g + ' × ' + Lv + ' is the product of the two numbers. Divide it by ' + a + '.']] }); }),
    tpl('expcount', (r) => { const a = r.int(1, 5), b = r.int(0, 3), c = r.int(0, 2); const n = 2 ** a * 3 ** b * 5 ** c; const f = (a + 1) * (b + 1) * (c + 1); return N('How many divisors does ' + n + ' have? (Hint: write it with prime exponents.)', f, { s: n + ' = 2<sup>' + a + '</sup>' + (b ? ' × 3<sup>' + b + '</sup>' : '') + (c ? ' × 5<sup>' + c + '</sup>' : '') + '. Add 1 to each exponent and multiply: ' + (a + 1) + (b ? ' × ' + (b + 1) : '') + (c ? ' × ' + (c + 1) : '') + ' = ' + f + '.' }); }),
    tpl('coprime', (r) => { const pool = [8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 25, 27, 28, 35, 49, 11, 13]; const a = r.pick(pool); const co = pool.filter((x) => x !== a && gcd(x, a) === 1); const nonco = pool.filter((x) => x !== a && gcd(x, a) > 1); if (co.length < 1 || nonco.length < 3) return N('What is GCD(9, 16)?', 1, { s: 'No shared factors.' }); const right = r.pick(co); const wr = r.shuffle(nonco).slice(0, 3); return choice(r, 'Which number shares no common divisor larger than 1 with ' + a + '?', String(right), wr.map(String), { s: 'GCD(' + a + ', ' + right + ') = 1. Every other choice shares a factor with ' + a + '.' }); }),
  ],
});
