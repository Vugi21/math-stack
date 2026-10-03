import { lesson, num, set, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, add, sub, eq, fmt, fm, fmMixed, gcd, lcm } from '../../../../src/content/dsl.js';

const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';
const MIS = 'You added the tops and added the bottoms. The pieces are different sizes, so first cut them into the same size.';

export default lesson({
  id: 'm4-8-2-adding-fractions',
  title: 'Adding fractions',
  blurb: 'Add pieces of the same size. When the sizes differ, cut both into a common size first.',
  concepts: ['fractions', 'adding-fractions', 'common-denominator'],

  tryFirst: [
    num('t1', 'Maya has {2/5} of a pizza. Her brother has {4/5} of an identical pizza. Together, how many fifths of a pizza do they have?', 6, {
      h: ['Each piece is one fifth. How many pieces are there altogether?'],
      s: '2 fifths and 4 fifths make 6 fifths. They have 6 pieces, each one fifth of a pizza.',
      w: [['10', 'The size of the pieces stays "fifths". You count the pieces: 2 + 4.']],
    }),
    num('t2', 'A recipe uses {1/2} cup of milk and {1/3} cup of water. How many sixths of a cup is that in all?', 5, {
      h: ['How many sixths are in one half? How many in one third?'],
      s: '{1/2} = {3/6} and {1/3} = {2/6}. In all: 3 + 2 = 5 sixths of a cup.',
      w: [['2', 'Halves and thirds are different sizes. Change both into sixths before you count.']],
    }),
  ],

  learn: [
    p('Adding fractions is counting pieces. 3 fifths plus 4 fifths is 7 fifths, just as 3 apples plus 4 apples is 7 apples. The piece size does not change.'),
    widget('commonDenominator', { a: 2, b: 7, c: 3, d: 7, mode: 'add' }),
    rule('<b>Same bottoms.</b> Add the tops. Keep the bottom. {2/7} + {3/7} = {5/7}.'),
    p('Different bottoms are different piece sizes. You cannot count halves and thirds together. First cut both into the same size piece.'),
    widget('commonDenominator', { a: 1, b: 2, c: 1, d: 3, mode: 'add' }),
    rule('<b>Different bottoms.</b> Find a number that both bottoms go into. This is a <b>common multiple</b>. Change both fractions to that bottom. Then add the tops.'),
    ex('Add {1/4} + {5/6}', ['Multiples of 6 are 6, 12, 18. The number 12 is also a multiple of 4. Use twelfths.', '{1/4} = {3/12} because 4 × 3 = 12 and 1 × 3 = 3.', '{5/6} = {10/12} because 6 × 2 = 12 and 5 × 2 = 10.', '{3/12} + {10/12} = {13/12}.']),
    p('A sum can be more than 1. {13/12} means 13 pieces when 12 pieces make a whole. That is one whole and {1/12} more.'),
    ex('Any common multiple works', ['Add {1/6} + {1/4} using 24ths instead of 12ths.', '{1/6} = {4/24} and {1/4} = {6/24}.', '{4/24} + {6/24} = {10/24}.', 'Divide top and bottom by 2: {5/12}. The smallest common multiple gives {5/12} at once.']),
    warn('<b>Watch out.</b> Do not add the bottoms. {1/2} + {1/3} is not {2/5}. Two fifths is smaller than one half, so adding more cannot make it smaller.'),
    mcq('Ben says "{2/5} + {3/10} = {5/15}". How can you tell at once that he is wrong?', ['The sum must be at least {2/5}, but {5/15} = {1/3} is smaller than {2/5}. He added the bottoms.', 'The answer must be a whole number.', 'He should have multiplied the tops.'], 0, 'Adding something to {2/5} cannot give a smaller number. {5/15} = {1/3}, which is less than {2/5}. Correct: {2/5} = {4/10}, and {4/10} + {3/10} = {7/10}.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find {5/12} + {11/12}.', '4/3', { mixed: true,
      h: ['The bottoms are the same. Add the tops.', '16 twelfths is more than one whole.'],
      s: '5 + 11 = 16, so {16/12}. Divide top and bottom by 4: {4/3}, which is 1 and {1/3}.',
      w: [['16/24', 'Keep the bottom the same when the pieces are the same size. Do not add the bottoms.']] }),
    num('p2', 'Find {1/6} + {1/4}.', '5/12', {
      h: ['Find a number that both 6 and 4 go into.'],
      s: '{1/6} = {2/12} and {1/4} = {3/12}. {2/12} + {3/12} = {5/12}.',
      w: [['2/10', MIS]] }),
    num('p3', 'Find {3/8} + {5/12}.', '19/24', {
      h: ['Multiples of 8 are 8, 16, 24. Does 12 go into 24?'],
      s: '{3/8} = {9/24} and {5/12} = {10/24}. 9 + 10 = 19, so {19/24}.',
      w: [['8/20', MIS]] }),
    num('p4', 'Find {2/3} + {3/4}.', '17/12', { mixed: true,
      h: ['Use twelfths.', 'The answer is more than 1. That is fine.'],
      s: '{2/3} = {8/12} and {3/4} = {9/12}. 8 + 9 = 17, so {17/12}. That is 1 and {5/12}.',
      w: [['5/7', MIS]] }),
    num('p5', 'Leo reads for {1/2} hour, then plays piano for {1/3} hour, then walks for {1/4} hour. How many hours is that in all?', '13/12', { mixed: true,
      h: ['Find a bottom that 2, 3 and 4 all go into.'],
      s: 'Use twelfths: {1/2} = {6/12}, {1/3} = {4/12}, {1/4} = {3/12}. 6 + 4 + 3 = 13, so {13/12} hours, which is a little more than one hour.',
      w: [['3/9', MIS]] }),
    num('p6', 'What number can you add to {1/2} to get {11/12}?', '5/12', {
      h: ['Write {1/2} in twelfths.', 'How many more twelfths do you need to reach 11 twelfths?'],
      s: '{1/2} = {6/12}. We need 11 twelfths, so we need 11 − 6 = 5 more twelfths: {5/12}.',
      w: [['10/12', 'Check it: {1/2} + {10/12} is more than 1. You want the total to be {11/12}.'], ['9/10', 'Check it: {1/2} + {9/10} is more than 1.']] }),
    num('p7', 'Add {1/2} + {1/4} + {1/8} + {1/16}. How much more do you need to reach 1?', '1/16', {
      h: ['Write everything in sixteenths.', '{1/2} = {8/16}.'],
      s: 'In sixteenths: 8 + 4 + 2 + 1 = 15, so the sum is {15/16}. One more sixteenth makes 1. Each piece is half of what was left.',
      w: [['15/16', 'That is the sum. The question asks how much MORE you need to reach 1.']] }),
    set('p8', 'Two different unit fractions add up to {5/6}. A unit fraction has top 1. What are the two fractions? Type them separated by a comma, like 1/7,1/9.', '1/2,1/3', {
      h: ['One of the two must be at least {5/12}, because two equal halves of {5/6} are {5/12} each.', 'Which unit fractions are at least {5/12}? Try {1/2} first.'],
      s: '{1/2} + {1/3} = {3/6} + {2/6} = {5/6}. No other pair of unit fractions works.',
      }),
  ],

  challenge: [
    chain('Trail mix', 'Dev makes trail mix. He pours in {1/3} cup of nuts, {1/4} cup of raisins and {1/6} cup of seeds.', [
      num('c1a', 'How many cups are the nuts and raisins together?', '7/12', { h: ['Use twelfths.'], s: '{1/3} = {4/12} and {1/4} = {3/12}. 4 + 3 = 7, so {7/12} cup.' }),
      num('c1b', 'How many cups is the whole mix? Give it in simplest form.', '3/4', { h: ['Add {1/6} = {2/12} to your last answer.'], s: '{7/12} + {2/12} = {9/12} = {3/4} cup.' }),
      num('c1c', 'His measuring cup holds 1 cup. How much more mix would fill it?', '1/4', { h: ['How far is {3/4} from 1?'], s: '1 = {4/4}. {4/4} − {3/4} = {1/4} cup.' }),
    ], 'The idea: put every amount into the same size piece (twelfths here), count the pieces, and then ask what is missing from a whole.'),
    chain('Fractions that make one', 'Fractions can fit together to make exactly 1, like pieces of a puzzle.', [
      num('c2a', 'Find {1/2} + {1/3}.', '5/6', { h: ['Use sixths.'], s: '{3/6} + {2/6} = {5/6}.' }),
      num('c2b', 'What unit fraction must you add to {5/6} to make exactly 1?', '1/6', { h: ['How many sixths make a whole?'], s: '{6/6} − {5/6} = {1/6}. So {1/2} + {1/3} + {1/6} = 1.' }),
      num('c2c', '{1/2} + {1/4} + {1/5} + ☐ = 1. What unit fraction goes in the box?', '1/20', { h: ['Use twentieths.', '{1/2} = {10/20}.'], s: '{10/20} + {5/20} + {4/20} = {19/20}. One more twentieth makes 1.' }),
    ], 'The idea: to find a missing piece, change everything to the same size, add what you have, and see how many pieces are missing from a whole.'),
    mc('c3', 'Find the error. Priya says "{3/4} + {2/3} = {5/7}". Which statement explains the mistake?', ['She added the tops and added the bottoms. Correct: {9/12} + {8/12} = {17/12}.', 'She should have multiplied the tops: {6/12}.', 'The answer is right, since 3 + 2 = 5 and 4 + 3 = 7.', 'She should have subtracted the fractions.'], 0, {
      s: '{5/7} is less than 1, but {3/4} + {2/3} is more than {3/4} + {1/2}, which is already over 1. Use twelfths: {9/12} + {8/12} = {17/12}.',
      w: [[2, '{5/7} is less than 1. But each of {3/4} and {2/3} is more than {1/2}, so together they are more than 1.']],
    }),
  ],

  quiz: [
    tpl('same', (r) => {
      const d = r.int(5, 16), a = r.int(1, d - 1), b = r.int(1, d - 1), ans = R(a + b, d);
      return N('Find ' + F(a, d) + ' + ' + F(b, d) + '.', fmt(ans), { mixed: true, s: a + ' + ' + b + ' = ' + (a + b) + ', so ' + F(a + b, d) + (ans.d !== d ? ' = ' + fmMixed(ans) : '') + '.', w: W(ans, [[R(a + b, 2 * d), 'Do not add the bottoms. The pieces are the same size.']]) });
    }),
    tpl('multiple', (r) => {
      const b = r.int(2, 6), k = r.int(2, 4), d = b * k, a = r.int(1, b - 1), c = r.int(1, d - 1), ans = add(R(a, b), R(c, d));
      return N('Find ' + F(a, b) + ' + ' + F(c, d) + '.', fmt(ans), { mixed: true, s: F(a, b) + ' = ' + F(a * k, d) + '. Then ' + F(a * k, d) + ' + ' + F(c, d) + ' = ' + F(a * k + c, d) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[R(a + c, b + d), 'Do not add the bottoms. Change the first fraction into ' + d + 'ths.']]) });
    }),
    tpl('coprime', (r) => {
      const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 7], [2, 7], [4, 7], [5, 8], [3, 8]];
      const [b, d] = r.pick(pairs);
      let a = r.int(1, b - 1), c = r.int(1, d - 1);
      const ans = add(R(a, b), R(c, d)), L = b * d;
      return N('Find ' + F(a, b) + ' + ' + F(c, d) + '.', fmt(ans), { mixed: true, s: 'Use ' + L + 'ths: ' + F(a * d, L) + ' + ' + F(c * b, L) + ' = ' + F(a * d + c * b, L) + (ans.d !== L ? ' = ' + fmMixed(ans) : '') + '.', w: W(ans, [[R(a + c, b + d), 'Do not add the bottoms. Use a common bottom first.']]) });
    }),
    tpl('three', (r) => {
      const sets = [[2, 3, 6], [2, 4, 8], [3, 4, 12], [2, 3, 4], [3, 6, 12], [4, 6, 12], [2, 5, 10], [2, 4, 5]];
      const ds = r.pick(sets), ns = ds.map((d) => r.int(1, d - 1));
      const ans = ns.reduce((acc, n, i) => add(acc, R(n, ds[i])), R(0));
      return N('Find ' + ds.map((d, i) => F(ns[i], d)).join(' + ') + '.', fmt(ans), { mixed: true, s: 'Use the least common multiple of ' + ds.join(', ') + ', which is ' + ds.reduce(lcm) + '. The sum is ' + fmMixed(ans) + '.', w: W(ans, [[R(ns[0] + ns[1] + ns[2], ds[0] + ds[1] + ds[2]), 'Do not add the bottoms. Use one common bottom for all three.']]) });
    }),
    tpl('missing', (r) => {
      const pairs = [[2, 3], [3, 4], [4, 5], [3, 5], [2, 5], [5, 6], [4, 6], [6, 8]];
      const [b, d] = r.pick(pairs);
      const a = r.int(1, b - 1), c = r.int(1, d - 1), tot = add(R(a, b), R(c, d));
      return N(F(a, b) + ' + ☐ = ' + fmMixed(tot) + '. What fraction goes in the box?', fmt(R(c, d)), { s: 'The total is ' + fm(tot) + '. Take away ' + F(a, b) + ' using ' + lcm(b, d) + 'ths. What is left is ' + F(c, d) + '.', w: W(R(c, d), [[add(R(a, b), tot), 'You added instead of finding the missing part. The box plus ' + F(a, b) + ' must equal the total.']]) });
    }),
    tpl('story', (r) => {
      const [b, d] = r.pick([[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [6, 8]]);
      const a = r.int(1, b - 1), c = r.int(1, d - 1), ans = add(R(a, b), R(c, d));
      const who = r.pick(['Nico', 'Rosa', 'Omar', 'Tara']);
      const [unit, one, two] = r.pick([['km', 'walks to the library', 'then walks on to the park'], ['hour', 'does homework', 'then reads'], ['meter', 'cuts one ribbon', 'then cuts another']]);
      const q = unit === 'km' ? who + ' walks ' + F(a, b) + ' km to the library, then ' + F(c, d) + ' km on to the park. How many kilometers is that in all?' : unit === 'hour' ? who + ' does homework for ' + F(a, b) + ' hour, then reads for ' + F(c, d) + ' hour. How many hours is that in all?' : who + ' cuts a ribbon ' + F(a, b) + ' meter long, then another ' + F(c, d) + ' meter long. What is the total length in meters?';
      return N(q, fmt(ans), { mixed: true, s: 'Add ' + F(a, b) + ' + ' + F(c, d) + ' using ' + lcm(b, d) + 'ths. The total is ' + fmMixed(ans) + '.', w: W(ans, [[R(a + c, b + d), 'Do not add the bottoms. Use a common bottom first.']]) });
    }),
    tpl('tomake', (r) => {
      const pairs = [[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [6, 8], [2, 4], [3, 6]];
      let b, d, a, c, s;
      for (let t = 0; t < 100; t++) {
        [b, d] = r.pick(pairs); a = r.int(1, b - 1); c = r.int(1, d - 1); s = add(R(a, b), R(c, d));
        if (s.n < s.d) break;
      }
      if (!(s.n < s.d)) { a = 1; b = 2; c = 1; d = 3; s = add(R(a, b), R(c, d)); }
      const ans = sub(R(1), s);
      return N('How much must be added to ' + F(a, b) + ' + ' + F(c, d) + ' to make exactly 1?', fmt(ans), { s: F(a, b) + ' + ' + F(c, d) + ' = ' + fm(s) + '. To reach 1 we need ' + fm(ans) + ' more.', w: W(ans, [[s, 'That is the sum you already have. The question asks how much MORE is needed.']]) });
    }),
    tpl('units', (r) => {
      const a = r.int(2, 9), b = a + r.int(1, 4), ans = add(R(1, a), R(1, b));
      return N('Find ' + F(1, a) + ' + ' + F(1, b) + '.', fmt(ans), { s: 'Use ' + a * b + 'ths: ' + F(b, a * b) + ' + ' + F(a, a * b) + ' = ' + F(a + b, a * b) + (gcd(a + b, a * b) > 1 ? ' = ' + fm(ans) : '') + '.', w: W(ans, [[R(2, a + b), 'Do not add the bottoms. Unit fractions are different sizes.']]) });
    }),
  ],
});
