import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const wr = (ans, list) => {
  const seen = new Set([ans]);
  return list.filter(([a]) => { if (seen.has(a) || a < 0) return false; seen.add(a); return true; });
};
const PL = ['children', 'players', 'dancers', 'students', 'musicians', 'guests'];
const f = (n) => (n <= 1 ? 1 : n * f(n - 1));

export default lesson({
  id: 'm4-4-4-factorials',
  title: 'Lining things up',
  blurb: 'Count the ways to arrange different things in a row, and see how quickly the answers grow.',
  concepts: ['factorial', 'arrangements', 'permutations'],

  tryFirst: [
    num('t1', 'Three friends stand in a line for a photo. How many different orders can they stand in?', 6, {
      h: ['Call them A, B and C. List the orders that start with A.', 'Each friend can be first. How many orders start with each?'],
      s: 'Starting with A: ABC, ACB. Same for B and C. 3 × 2 = 6 orders.',
      w: [['3', 'There are 3 choices for first place, but each leaves several ways to finish the line.'], ['9', 'After the first person is picked, only 2 friends are left, not 3.']],
    }),
    num('t2', 'Four runners finish a race. There are no ties. How many different finishing orders are possible?', 24, {
      h: ['How many runners can come first? Then how many can come second?'],
      s: '4 choices for first, then 3 for second, then 2 for third, then 1 for last. 4 × 3 × 2 × 1 = 24.',
      w: [['16', 'After one runner finishes, that runner cannot finish again. The choices shrink.'], ['12', 'You stopped early. The last two places also have choices: 2, then 1.']],
    }),
  ],

  learn: [
    p('To line up different things, fill the places one at a time. Each place has one fewer choice than the one before, since the used things are gone.'),
    widget('arrangements', { n: 5, k: 5, nlabel: 'people', klabel: 'places in line' }),
    rule('<b>Factorial.</b> The number of ways to line up n different things is n × (n − 1) × (n − 2) × … × 2 × 1. We call this <b>n!</b> and read it "n factorial". For example 4! = 4 × 3 × 2 × 1 = 24.'),
    tbl(['n', '1', '2', '3', '4', '5', '6', '7', '8'], [['n!', '1', '2', '6', '24', '120', '720', '5040', '40320']], 'The first factorials'),
    p('Each factorial is the one before, times n. So 6! = 6 × 5!. This also means 7! ÷ 5! = 7 × 6 = 42, because the 5! cancels.'),
    ex('A rule about one person', ['5 kids line up. Mia must be first.', 'Mia has 1 choice for first place.', 'The other 4 kids fill the other 4 places in 4! = 24 ways.', 'So there are 1 × 24 = 24 lines.']),
    ex('Two kids who must stand together', ['5 kids line up. Dev and Eli must stand next to each other.', 'Glue Dev and Eli into one block. Now there are 4 things to line up: the block and 3 kids.', '4! = 24 ways to line up the 4 things.', 'Inside the block, Dev and Eli can swap: 2 ways.', '24 × 2 = 48 lines.']),
    rule('<b>"Not together" is "all" minus "together".</b> For Dev and Eli not next to each other: 5! − 48 = 120 − 48 = 72.'),
    warn('<b>Watch out.</b> Factorials grow very quickly. 10! is already 3,628,800. Do not guess. Multiply it out, or cancel before multiplying.'),
    mcq('Sam says: "4 kids line up, and Ann and Bo must be together. 4! × 2 = 48." What is wrong?', ['Nothing. 48 is right.', 'Gluing Ann and Bo leaves 3 things to line up, not 4. The answer is 3! × 2 = 12.', 'He should add 24 + 2.'], 1, 'Ann and Bo form 1 block. With the other 2 kids that is 3 things: 3! = 6 orders. The block can face 2 ways: 6 × 2 = 12.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'How many ways can 6 different books be placed in a row on a shelf?', 720, {
      h: ['6 choices for the first spot, then 5.'],
      s: '6! = 6 × 5 × 4 × 3 × 2 × 1 = 720.',
      w: [['36', 'You multiplied 6 × 6. After one book is used, 5 are left.'], ['21', 'That is 6 + 5 + 4 + 3 + 2 + 1. The choices multiply.']],
    }),
    num('p2', 'What is 7! ÷ 5!?', 42, {
      h: ['Write out 7! and 5!. A lot cancels.'],
      s: '7! = 7 × 6 × 5!. So 7! ÷ 5! = 7 × 6 = 42.',
      w: [['2', 'That is 7 − 5. Cancel the common factors 5 × 4 × 3 × 2 × 1 instead.']],
    }),
    num('p3', '5 children line up. Mia must be first. How many lines are possible?', 24, {
      h: ['Mia has just 1 choice. Who fills the other places?'],
      s: 'The other 4 children can line up in 4! = 24 ways.',
      w: [['120', 'That lets Mia stand anywhere. She must be first.']],
    }),
    num('p4', '5 children line up. Mia and Leo must stand next to each other. How many lines are possible?', 48, {
      h: ['Glue Mia and Leo into one block.', 'Then they can swap places inside the block.'],
      s: 'The block and 3 children make 4 things: 4! = 24. Mia and Leo can swap: 24 × 2 = 48.',
      w: [['24', 'Mia and Leo can stand in either order inside the block.'], ['120', 'That ignores the rule.']],
    }),
    num('p5', '6 children line up. Dev and Eli must NOT stand next to each other. How many lines are possible?', 480, {
      h: ['All lines minus the lines where Dev and Eli are together.'],
      s: 'All lines: 6! = 720. Together: 5! × 2 = 240. Not together: 720 − 240 = 480.',
      w: [['240', 'That is the number of lines where they ARE together.'], ['720', 'That ignores the rule.']],
    }),
    num('p6', '4 boys and 3 girls line up. All the boys must be in front of all the girls. How many lines are possible?', 144, {
      h: ['The boys take the first 4 places. In how many orders?', 'Then the girls take the last 3.'],
      s: 'Boys: 4! = 24 orders. Girls: 3! = 6 orders. 24 × 6 = 144.',
      w: [['5040', 'That lets the boys and girls mix. The boys must come first.'], ['30', 'You added 24 + 6. The two parts happen together, so multiply.']],
    }),
    num('p7', '4 boys and 4 girls line up so that boys and girls take turns, starting with a boy. How many lines are possible?', 576, {
      h: ['The places for boys are fixed: 1st, 3rd, 5th, 7th.', 'Boys can fill their places in 4! ways.'],
      s: 'Boys: 4! = 24. Girls: 4! = 24. 24 × 24 = 576.',
      w: [['1152', 'That doubles it, as if a girl could start. The line must start with a boy.'], ['40320', 'That ignores the rule.']],
    }),
    num('p8', 'How many times as big as 6! is 8!?', 56, {
      h: ['8! = 8 × 7 × 6!.'],
      s: '8! = 8 × 7 × 6!, so 8! is 8 × 7 = 56 times as big.',
      w: [['2', 'The difference in the numbers 8 and 6 is not the ratio. Each extra factor multiplies.']],
    }),
  ],

  challenge: [
    chain('The bench', '5 people sit in a row on a bench: Ava, Ben, Chloe, Dev and Kira.', [
      num('c1a', 'How many ways can all 5 sit?', 120, { h: ['5 choices, then 4.'], s: '5! = 120.' }),
      num('c1b', 'Ben and Kira must sit at the two ends. How many ways?', 12, { h: ['They can swap ends. Then 3 people fill the middle.'], s: 'Ben and Kira: 2 ways to take the ends. The other 3 in the middle: 3! = 6. 2 × 6 = 12.', w: [['6', 'Ben and Kira can swap ends.']] }),
      num('c1c', 'Ben and Kira must NOT sit next to each other. How many ways?', 72, { h: ['Total minus the ways where they are together.'], s: 'Together: 4! × 2 = 48. Not together: 120 − 48 = 72.', w: [['48', 'That counts where they ARE together.']] }),
    ], 'The idea: two ways to count the same rule. Count the allowed lines directly, or count all lines and remove the lines that break the rule.'),
    chain('The race', '6 runners race. There are no ties.', [
      num('c2a', 'How many different finishing orders are there?', 720, { h: ['6!'], s: '6! = 720.' }),
      num('c2b', 'In how many orders does Priya finish first or second?', 240, { h: ['Priya has 2 choices of place. Then the other 5 fill the rest.'], s: '2 places for Priya × 5! = 2 × 120 = 240.', w: [['120', 'Priya can be second, too.']] }),
      num('c2c', 'In how many orders does Priya finish ahead of Omar?', 360, { h: ['Take any order. Swap the places of Priya and Omar. What happens?'], s: 'Swapping Priya and Omar turns each order with Priya ahead into one with Omar ahead, and the other way round. So exactly half of the 720 orders have Priya ahead: 360.', w: [['240', 'This does not use the symmetry between Priya and Omar.']] }),
    ], 'The idea: when two things are equally likely to be in either order, exactly half of all arrangements have each order.'),
    mc('c3', 'Find the error. Ana says: "8 is double 4, so 8! is double 4!. Since 4! = 24, 8! = 48." Which is the best correction?', ['8! = 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 40320. Doubling n does not double n!.', '8! = 24 + 24 + 2 = 50.', 'Ana is right.', '8! = 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36.'], 0, {
      s: 'A factorial multiplies all whole numbers down to 1. 4! = 24 but 8! = 40320, which is 1680 times as big, not 2 times.',
      w: [[1, 'There is no such rule. Write out the 8 factors and multiply.'], [2, '8! has 8 factors. 48 is only 4! × 2.'], [3, 'That adds. A factorial multiplies.']],
    }),
  ],

  quiz: [
    tpl('fact', (r) => {
      const n = r.int(3, 9), what = r.pick(['books on a shelf', 'children in a line', 'flags on a pole', 'runners in a race']);
      return N('In how many different orders can ' + n + ' different ' + what + ' be arranged? (no ties)', f(n), { s: n + '! = ' + Array.from({ length: n }, (_, i) => n - i).join(' × ') + ' = ' + f(n) + '.', w: wr(f(n), [[n * n, 'After one is used there is one fewer choice.'], [f(n) / n, 'You stopped one factor early.']]) });
    }),
    tpl('divide', (r) => {
      const n = r.int(5, 14), k = r.int(2, 4), m = n - k;
      let ans = 1; for (let i = 0; i < k; i++) ans *= n - i;
      return N('What is ' + n + '! ÷ ' + m + '!?', ans, { s: n + '! = ' + Array.from({ length: k }, (_, i) => n - i).join(' × ') + ' × ' + m + '!. So the answer is ' + Array.from({ length: k }, (_, i) => n - i).join(' × ') + ' = ' + ans + '.', w: wr(ans, [[n - m, 'Cancel the shared factors. The answer is a product.']]) });
    }),
    tpl('first', (r) => {
      const n = r.int(4, 9), pl = r.pick(PL);
      return N(n + ' ' + pl + ' line up. One particular one must be first. How many lines are possible?', f(n - 1), { s: 'The other ' + (n - 1) + ' ' + pl + ' can line up in ' + (n - 1) + '! = ' + f(n - 1) + ' ways.', w: wr(f(n - 1), [[f(n), 'That lets the chosen one stand anywhere.']]) });
    }),
    tpl('together', (r) => {
      const n = r.int(4, 9), pl = r.pick(PL);
      return N(n + ' ' + pl + ' line up. Two of them must stand next to each other. How many lines are possible?', 2 * f(n - 1), { s: 'Glue them into one block. ' + (n - 1) + ' things line up in ' + (n - 1) + '! = ' + f(n - 1) + ' ways. The two can swap: ' + 2 * f(n - 1) + '.', w: wr(2 * f(n - 1), [[f(n - 1), 'The two can stand in either order inside the block.'], [f(n), 'That ignores the rule.']]) });
    }),
    tpl('apart', (r) => {
      const n = r.int(4, 9), pl = r.pick(PL);
      return N(n + ' ' + pl + ' line up. Two of them must NOT stand next to each other. How many lines are possible?', f(n) - 2 * f(n - 1), { s: 'All: ' + n + '! = ' + f(n) + '. Together: 2 × ' + (n - 1) + '! = ' + 2 * f(n - 1) + '. Difference ' + (f(n) - 2 * f(n - 1)) + '.', w: wr(f(n) - 2 * f(n - 1), [[2 * f(n - 1), 'That is the count where they ARE next to each other.']]) });
    }),
    tpl('groups', (r) => {
      const a = r.int(2, 6), b = r.int(2, 6);
      return N(a + ' boys and ' + b + ' girls line up. All the boys must be in front of all the girls. How many lines are possible?', f(a) * f(b), { s: 'Boys: ' + a + '! = ' + f(a) + '. Girls: ' + b + '! = ' + f(b) + '. Multiply: ' + f(a) * f(b) + '.', w: wr(f(a) * f(b), [[f(a) + f(b), 'Both groups are arranged, so multiply.'], [f(a + b), 'That lets boys and girls mix.']]) });
    }),
    tpl('alternate', (r) => {
      const n = r.int(2, 6), pl = r.pick([['boys', 'girls'], ['men', 'women'], ['cats', 'dogs'], ['red flags', 'blue flags'], ['math books', 'art books']]);
      return N(n + ' ' + pl[0] + ' and ' + n + ' ' + pl[1] + ' line up so that they alternate, starting with one from the first group. How many lines are possible?', f(n) * f(n), { s: pl[0].charAt(0).toUpperCase() + pl[0].slice(1) + ' in their places: ' + n + '! = ' + f(n) + '. ' + pl[1] + ': ' + n + '! = ' + f(n) + '. ' + f(n) + ' × ' + f(n) + ' = ' + f(n) * f(n) + '.', w: wr(f(n) * f(n), [[2 * f(n) * f(n), 'The line must start with one from the first group, so there is only one pattern.'], [f(2 * n), 'That ignores the alternating rule.']]) });
    }),
    tpl('between', (r) => {
      const n = r.int(4, 8), pl = r.pick(PL);
      return N(n + ' ' + pl + ' line up. One of them, Quinn, must NOT be first. How many lines are possible?', f(n) - f(n - 1), { s: 'All lines: ' + f(n) + '. Lines with Quinn first: ' + f(n - 1) + '. Difference ' + (f(n) - f(n - 1)) + '.', w: wr(f(n) - f(n - 1), [[f(n - 1), 'That is the count where Quinn IS first.']]) });
    }),
  ],
});
