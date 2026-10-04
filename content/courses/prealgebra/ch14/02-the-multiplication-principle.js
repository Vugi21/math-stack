import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, twoNames, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const fall = (n, k) => { let t = 1; for (let i = 0; i < k; i++) t *= n - i; return t; };
const fact = (n) => fall(n, n);

export default lesson({
  id: 'pre-14-2-the-multiplication-principle',
  title: 'The multiplication principle',
  blurb: 'When you make choices one after another, the number of ways multiplies. Tree diagrams, slots, and arrangements.',
  concepts: ['multiplication-principle', 'tree-diagram', 'permutations', 'factorial'],

  tryFirst: [
    num('t1', 'You have 4 shirts and 3 pairs of pants. Every shirt can be worn with every pair of pants. How many different shirt-and-pants outfits can you make?', 12, {
      h: ['Take one shirt. How many outfits can you make using that shirt?', 'Now do the same for each of the other shirts.'],
      s: 'Each shirt goes with 3 pants, so 3 outfits per shirt. With 4 shirts: 4 × 3 = 12 outfits.',
      w: [['7', 'You added. But each shirt pairs with each pair of pants, so the choices multiply.']],
    }),
    num('t2', 'A bike lock has 3 dials, and each dial shows a digit from 0 to 9. How many different codes are possible?', 1000, {
      h: ['How many choices for the first dial? For the second? The third?', 'Does picking the first digit change the choices for the second?'],
      s: '10 choices for each dial, and the dials do not affect each other: 10 × 10 × 10 = 1000. (The codes are 000 to 999, exactly 1000 numbers.)',
      w: [['30', 'That adds the choices. Each combination is a full code with a digit from every dial, so multiply.']],
    }),
  ],

  learn: [
    p('Imagine you build something by making choices one after another: pick a shirt, then pick pants, then pick a hat. The question "how many different outfits?" can be answered without listing a single one. All you need is the number of choices at each stage.'),
    def('outcome', 'One complete result of a sequence of choices, such as the outfit (red shirt, blue pants, no hat).'),
    def('tree diagram', 'A picture that draws every possible outcome as a path from the start (the root) to the end of a branch (a leaf). Each stage of choosing splits every path into new branches.'),
    widget('countingTree', { a: 3, b: 2, c: 0, labels: ['shirts', 'pants', 'hats (0 = none)'] }),
    formula('Multiplication principle', 'a × b × c × ...', 'If you make choices in a row, with a ways to make the first choice, b ways for the second (no matter what the first was), c ways for the third, and so on, the total number of outcomes is the product of these numbers.'),
    p('Why does it work? Each branch of the tree splits into the same number of new branches. Adding a stage replicates the whole tree once for every leaf. Replicating a number of times is multiplication: 3 shirts, each with 2 pants, gives 3 × 2 = 6 paths, and each of those is split again by the hat choice.'),
    key('The count at each stage may depend on <i>earlier choices being used up</i>, but it must not depend on <i>which</i> earlier choice you made. "4 letters are left" is fine whichever letter was used first.'),
    ex('Slots method', ['How many 3-letter "words" can be made from A, B, C, D, E if no letter is used twice?', 'Draw 3 slots: ___ ___ ___.', 'First slot: 5 choices. Second: one letter is used up, so 4. Third: 3.', '5 × 4 × 3 = 60.']),
    widget('arrangements', { n: 5, k: 3, nlabel: 'letters', klabel: 'slots' }),
    tip('Draw one slot for each choice and write the number of options under it. Multiply at the end. Slots turn a vague problem into a short row of numbers.'),
    def('factorial', 'For a whole number n, <b>n factorial</b>, written n!, is n × (n − 1) × ... × 2 × 1. It counts the ways to put n different things in a row.'),
    tbl(['n', '1', '2', '3', '4', '5', '6', '7'], [['n!', '1', '2', '6', '24', '120', '720', '5040']], 'Factorials grow very fast'),
    ex('Arranging in a line', ['In how many orders can 4 different books stand on a shelf?', 'Four slots: 4 choices, then 3, then 2, then 1.', '4 × 3 × 2 × 1 = 4! = 24 orders.']),
    rule('<b>Arranging in a line.</b> The number of ways to put n different things in a row is n!. Fill the first place in n ways, the next in n − 1 ways, and so on down to 1.'),
    p('<b>Restrictions: fill the fussy slot first.</b> If a rule limits one slot, count that slot first, then fill the rest. If you fill the easy slots first, you may not know how many options remain for the fussy one.'),
    ex('Even three-digit numbers', ['How many 3-digit whole numbers are even?', 'The last digit must be 0, 2, 4, 6 or 8: 5 choices.', 'The first digit cannot be 0 (or it would not be a 3-digit number): 9 choices. The middle digit can be anything: 10 choices.', 'Total: 9 × 10 × 5 = 450.']),
    ex('Odd numbers, no repeated digit', ['How many 3-digit numbers have all different digits and are odd, using only the digits 1 to 5?', 'Fussy slot first: the last digit is 1, 3 or 5: 3 choices.', 'The first digit: any of the remaining 4 digits. The middle digit: any of the remaining 3.', '3 × 4 × 3 = 36.']),
    warn('<b>Add or multiply?</b> Multiply when you do one thing <i>and then</i> another. Add when you do one thing <i>or</i> another (separate cases). With 3 soups and 4 salads, choosing a soup <i>and</i> a salad is 3 × 4 = 12; choosing a soup <i>or</i> a salad is 3 + 4 = 7.'),
    warn('<b>Do not forget the used-up options.</b> If the problem says "no repeats", the number of choices shrinks at every slot: 5 × 4 × 3, not 5 × 5 × 5. If repeats are allowed, it is 5 × 5 × 5 = 125.'),
    mcq('A menu has 3 starters and 4 mains. Dev says "I can pick a starter and a main in 3 + 4 = 7 ways." What is wrong?', ['Nothing, 7 is right.', 'Choosing both is a pair, so the choices multiply: 3 × 4 = 12.', 'He should have subtracted: 4 − 3 = 1.'], 1, 'Each of the 3 starters can go with each of the 4 mains. Picking a starter and a main is a two-stage choice, so 3 × 4 = 12.', 'Spot the mistake'),
    recap([['outcome', 'one complete result of the choices'], ['tree diagram', 'every outcome drawn as a path'], ['factorial', 'n! = n × (n − 1) × ... × 1, the number of ways to line up n things'], ['fussy slot', 'a slot with a restriction; fill it first']], [['Multiplication principle', 'a × b × c × ...'], ['Arrangements in a line', 'n!']]),
  ],

  practice: [
    num('p1', 'A sandwich shop offers 5 breads, 4 fillings and 3 sauces. A sandwich has one of each. How many different sandwiches are possible?', 60, {
      h: ['Multiply the number of choices at each stage.'],
      s: '5 × 4 × 3 = 60.',
      w: [['12', 'That adds the choices. Each sandwich takes one of each, so multiply.']],
    }),
    num('p2', 'How many three-digit numbers have all of their digits odd?', 125, {
      h: ['Which digits are odd? How many?', 'Is 0 a problem here?'],
      s: 'The odd digits are 1, 3, 5, 7, 9: five choices for each of the three places. 5 × 5 × 5 = 125.',
      w: [['450', 'That is how many three-digit numbers are even (9 × 10 × 5). You need all three digits odd.']],
    }),
    num('p3', 'Five runners race. In how many different ways can the gold, silver and bronze medals be awarded?', 60, {
      h: ['Gold: how many runners could win? Then silver? Then bronze?'],
      s: 'Gold: 5 possible. Silver: 4 left. Bronze: 3 left. 5 × 4 × 3 = 60.',
      w: [['125', 'A runner cannot win two medals, so the choices shrink: 5 × 4 × 3, not 5 × 5 × 5.'], ['10', 'That counts only the groups of 3 runners, ignoring who gets which medal. Order matters here.']],
    }),
    num('p4', 'In how many different orders can 5 different books be lined up on a shelf?', 120, {
      h: ['This is 5 slots with 5 books.'],
      s: '5 × 4 × 3 × 2 × 1 = 120.',
      w: [['25', 'After each book is placed there is one fewer to choose. 5 × 4 × 3 × 2 × 1.']],
    }),
    num('p5', 'How many three-digit numbers have no repeated digit?', 648, {
      h: ['The first digit cannot be 0. How many choices?', 'The second digit can be 0 but cannot match the first.'],
      s: 'First digit: 9 choices (1–9). Second: 10 digits minus the one used = 9 (0 is allowed now). Third: 8. 9 × 9 × 8 = 648.',
      w: [['720', 'That allows 0 as the first digit: 10 × 9 × 8. A three-digit number cannot start with 0.'], ['729', 'That lets digits repeat. No repeats: the third digit has only 8 choices.']],
    }),
    num('p6', 'How many four-digit numbers are even?', 4500, {
      h: ['Begin with the last digit: which digits make the number even?', 'Then the first digit, which cannot be 0.'],
      s: 'First: 9 (1–9). Second: 10. Third: 10. Last: 5 (0, 2, 4, 6, 8). 9 × 10 × 10 × 5 = 4500.',
      w: [['5000', 'That lets the first digit be 0. 10 × 10 × 10 × 5 includes numbers like 0124, which are not four-digit numbers.']],
    }),
    num('p7', 'How many positive whole-number divisors does 360 have? (360 = 2×2×2×3×3×5.)', 24, {
      h: ['A divisor uses some number of the 2s (0 to 3 of them), some of the 3s, some of the 5s.', 'Count the choices for each prime and multiply.'],
      s: 'Each divisor is 2^a × 3^b × 5^c with a from 0 to 3 (4 choices), b from 0 to 2 (3 choices), c from 0 to 1 (2 choices). 4 × 3 × 2 = 24 divisors.',
      w: [['6', 'That is only the number of prime factors counted with repeats (3 + 2 + 1). Each prime has "how many to include" choices, and the choices multiply.'], ['12', 'Check the exponents again: the 2s give 4 choices (use none, one, two or all three).']],
    }),
  ],

  challenge: [
    chain('Passwords', 'A password has four digits from 0 to 9.', [
      num('c1a', 'How many passwords are possible if digits may repeat?', 10000, { h: ['Four independent choices of 10.'], s: '10 × 10 × 10 × 10 = 10 000.' }),
      num('c1b', 'How many are possible if no digit may repeat?', 5040, { h: ['10, then 9, then 8, then 7.'], s: '10 × 9 × 8 × 7 = 5040.' }),
      num('c1c', 'No digit may repeat, and the first digit cannot be 0. How many?', 4536, { h: ['The first digit has 9 choices, then the rest can use 0.'], s: '9 × 9 × 8 × 7 = 4536.', w: [['5040', 'That lets the first digit be 0. Remove those: 9 × 9 × 8 × 7.']] }),
    ], 'The idea: tackle one slot at a time, and count the slot with a restriction first. Each earlier choice uses up an option for the later ones.'),
    chain('Six in a row', 'Six friends, including Ana and Bo, line up for a photo.', [
      num('c2a', 'How many different line-ups are there?', 720, { h: ['6 slots, and no one repeats.'], s: '6! = 720.' }),
      num('c2b', 'How many have Ana and Bo standing next to each other? (Treat the pair as one block: there are 5 things to arrange, and the block can be AB or BA.)', 240, { h: ['5 things in a row: 5!. Then multiply by the 2 orders inside the block.'], s: '5! × 2 = 120 × 2 = 240.' }),
      num('c2c', 'How many have Ana and Bo NOT next to each other?', 480, { h: ['Subtract the "together" line-ups from all line-ups.'], s: '720 − 240 = 480.', w: [['240', 'That is the number with them together. The question asks for the ones where they are apart.']] }),
    ], 'The idea: "not together" is easiest as total minus "together". Gluing two things into one block simplifies the counting.'),
    mc('c3', 'Find the error. Hiro says: "A 4-digit number cannot have a repeated digit, so there are 10 × 9 × 8 × 7 = 5040 of them." What is wrong?', ['That count includes numbers starting with 0, which are not four-digit numbers. The right count is 9 × 9 × 8 × 7 = 4536.', 'He should have used 10 × 10 × 10 × 10.', 'He should have added 10 + 9 + 8 + 7.', 'There is no mistake.'], 0, {
      s: 'The first digit has only 9 choices. Then 9, 8, 7 for the others: 4536.',
      w: [[1, 'That allows repeats, which the problem forbids.'], [2, 'Choices in a row multiply; they do not add.']],
    }),
  ],

  quiz: [
    tpl('outfit', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 6), [x, y, z] = r.pick([['shirts', 'pants', 'hats'], ['breads', 'fillings', 'sauces'], ['flavors', 'cones', 'toppings'], ['screens', 'cases', 'chargers']]);
      return N(name(r) + ' can choose from ' + a + ' ' + x + ', ' + b + ' ' + y + ' and ' + c + ' ' + z + ', one of each. How many combinations are there?', a * b * c, { s: a + ' × ' + b + ' × ' + c + ' = ' + a * b * c + '.', w: [[a + b + c, 'You added. The choices are made one after another, so multiply.']] });
    }),
    tpl('code', (r) => {
      const k = r.int(3, 26), L = r.int(1, 3), D = r.int(1, 3), tot = Math.pow(k, L) * Math.pow(10, D);
      return N('A code is ' + L + ' letter' + (L > 1 ? 's' : '') + ' followed by ' + D + ' digit' + (D > 1 ? 's' : '') + '. The letters can be any of the first ' + k + ' letters of the alphabet, repeats allowed, and digits are 0–9. How many codes?', tot, { s: k + (L > 1 ? '^' + L : '') + ' × 10' + (D > 1 ? '^' + D : '') + ' = ' + tot + '.', w: W(tot, [[k * L + 10 * D, 'You added. Each position is a choice that multiplies.']]) });
    }),
    tpl('podium', (r) => {
      const n = r.int(5, 20), kk = r.int(2, 4), tk = fall(n, kk), who = r.pick(['members of a club', 'students on a team', 'finalists in a talent show']);
      const label = ['', '', 'a first place and a second place', 'gold, silver and bronze medals', 'gold, silver, bronze and a fourth-place ribbon'][kk];
      return N(n + ' ' + who + ' compete for ' + label + '. Nobody wins more than one prize. In how many ways can the prizes be awarded?', tk, { s: Array.from({ length: kk }, (_, i) => n - i).join(' × ') + ' = ' + tk + '.', w: W(tk, [[Math.pow(n, kk), 'Nobody can win two prizes, so the choices shrink by one each time.']]) });
    }),
    tpl('distinctdig', (r) => {
      const s = r.int(4, 8), digs = r.distinct(s, 0, 9).sort((a, b) => a - b), d = r.int(3, Math.min(5, s)), has0 = digs.includes(0);
      const t = (s - (has0 ? 1 : 0)) * fall(s - 1, d - 1);
      return N('Using the digits ' + digs.join(', ') + ' with no digit used twice, how many ' + d + '-digit numbers can be made? (No leading zero.)', t, { s: 'First digit: ' + (s - (has0 ? 1 : 0)) + ' choices. Then ' + Array.from({ length: d - 1 }, (_, i) => s - 1 - i).join(', ') + ' for the rest: ' + t + '.', w: W(t, [[fall(s, d), 'That lets 0 go first (or ignores that the first digit has fewer choices). Fix the first digit first.']].filter(() => has0)) });
    }),
    tpl('digitset', (r) => {
      const s = r.int(3, 8), digs = r.distinct(s, 0, 9).sort((a, b) => a - b), d = r.int(3, 5), has0 = digs.includes(0);
      const t = (s - (has0 ? 1 : 0)) * Math.pow(s, d - 1);
      return N('Using only the digits ' + digs.join(', ') + ', with repeats allowed, how many ' + d + '-digit numbers can be made? (No leading zero.)', t, { s: 'First digit: ' + (s - (has0 ? 1 : 0)) + ' choices. Each of the other ' + (d - 1) + ': ' + s + '. Total ' + t + '.', w: W(t, [[Math.pow(s, d), 'A number cannot start with 0.']].filter(() => has0)) });
    }),
    tpl('together', (r) => {
      const n = r.int(4, 7), [a, b] = twoNames(r), t = fact(n - 1) * 2;
      return N(n + ' friends, including ' + a + ' and ' + b + ', line up in a row. In how many line-ups do ' + a + ' and ' + b + ' stand next to each other?', t, { s: 'Treat the pair as one block: ' + (n - 1) + '! arrangements, times 2 orders inside the block: ' + t + '.', w: W(t, [[fact(n), 'That counts every line-up, including those where the two stand apart.'], [fact(n - 1), 'You counted the block in one order. Do not forget the pair can swap places.']]) });
    }),
    tpl('divisors', (r) => {
      const ps = r.shuffle([2, 3, 5, 7]).slice(0, r.int(2, 3)), es = ps.map(() => r.int(1, 4)), n = ps.reduce((a, p, i) => a * Math.pow(p, es[i]), 1), t = es.reduce((a, e) => a * (e + 1), 1);
      return N('How many positive divisors does ' + n + ' have? (Hint: it is ' + ps.map((p, i) => p + (es[i] > 1 ? '^[' + es[i] + ']' : '')).join(' × ') + '.)', t, { s: 'Each prime gives (exponent + 1) choices: ' + es.map((e) => e + 1).join(' × ') + ' = ' + t + '.', w: W(t, [[es.reduce((a, b) => a + b, 0), 'That adds the exponents. Each prime offers (exponent + 1) choices and they multiply.']]) });
    }),
    tpl('mix', (r) => {
      const s = r.int(2, 5), m = r.int(3, 7), d = r.int(2, 5), t = m * (s + d);
      return N('A diner offers ' + s + ' soups, ' + m + ' mains and ' + d + ' desserts. A lunch deal is one main plus either a soup or a dessert (not both). How many different deals are there?', t, { s: 'Soup or dessert: ' + s + ' + ' + d + ' = ' + (s + d) + ' ways. Then a main: ' + m + ' × ' + (s + d) + ' = ' + t + '.', w: W(t, [[s * m * d, 'Not both: the soup and dessert choices are alternatives, so add them first, then multiply by the mains.']]) });
    }),
  ],
});
