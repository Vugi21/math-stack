import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, add, sub, mul, eq, fmt, fm, fmMixed, gcd, lcm } from '../../../../src/content/dsl.js';

const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';
const MS = (w, n, d) => w + ' ' + F(n, d);
const mv = (w, n, d) => R(w * d + n, d);
const FORGOT = 'You forgot to put the extra whole from the fractions into the wholes.';

export default lesson({
  id: 'm4-8-4-adding-mixed-numbers',
  title: 'Adding mixed numbers',
  blurb: 'Add the wholes, add the fractions, and regroup when the fractions make a whole or more.',
  concepts: ['mixed-numbers', 'adding-fractions', 'regrouping'],

  tryFirst: [
    num('t1', 'A board is 2 {1/4} meters long. Another board is 3 {1/2} meters long. Laid end to end, how long are they?', '23/4', { mixed: true,
      h: ['Add the wholes. Then add the fractions.', '{1/2} is the same as {2/4}.'],
      s: '2 + 3 = 5 and {1/4} + {2/4} = {3/4}. Together: 5 {3/4} meters.',
      w: [['5 2/6', 'Do not add the bottoms. Fourths and halves need a common bottom.']] }),
    num('t2', 'Ava adds 1 {3/4} cups of flour and 2 {3/4} cups of flour. How many cups is that?', '9/2', { mixed: true,
      h: ['Add the wholes and the fractions separately.', 'The fractions add up to more than 1. What do you do with the extra whole?'],
      s: '1 + 2 = 3. {3/4} + {3/4} = {6/4} = 1 {1/2}. So 3 + 1 {1/2} = 4 {1/2} cups.',
      w: [['3 6/8', 'The pieces are the same size, fourths. Do not add the bottoms.']] }),
  ],

  learn: [
    p('To add mixed numbers, add the <b>wholes</b> and add the <b>fractions</b>. Then put the two answers together.'),
    ex('Add 2 {1/4} + 3 {1/2}', ['Wholes: 2 + 3 = 5.', 'Fractions: {1/4} + {1/2} = {1/4} + {2/4} = {3/4}.', 'Together: 5 {3/4}.']),
    p('Sometimes the fractions add up to 1 or more. Then you have extra wholes to move over.'),
    ex('Add 2 {3/4} + 1 {2/3}', ['Wholes: 2 + 1 = 3.', 'Fractions: {3/4} + {2/3} = {9/12} + {8/12} = {17/12}.', '{17/12} is 1 whole and {5/12} more.', 'So 3 + 1 {5/12} = 4 {5/12}.']),
    widget('commonDenominator', { a: 3, b: 4, c: 2, d: 3, mode: 'add' }),
    rule('<b>Regrouping.</b> When the fraction parts add up to a whole or more, take out the whole and add it to the whole numbers. {17/12} becomes 1 {5/12}, and the 1 joins the wholes.'),
    p('<b>Another way.</b> Change both numbers to improper fractions, add them, and change the answer back. This works well when the numbers are small. Adding by parts is usually quicker when the wholes are large.'),
    ex('Same problem, improper fractions', ['2 {3/4} = {11/4} and 1 {2/3} = {5/3}.', 'In twelfths: {33/12} + {20/12} = {53/12}.', '53 ÷ 12 = 4 remainder 5, so 4 {5/12}.', 'Same answer as before.']),
    warn('<b>Watch out.</b> Do not write 3 {17/12} as the answer. A mixed number should have a fraction part less than 1. Take out the whole: 3 + 1 {5/12} = 4 {5/12}.'),
    mcq('Ben says "1 {2/3} + 2 {3/4} = 3 {5/7}". Which statement explains his mistake?', ['He added the tops and added the bottoms. He should use twelfths: {8/12} + {9/12} = {17/12}, and the answer is 4 {5/12}.', 'He should have multiplied the wholes.', 'He is right.'], 0, 'The two fractions are each more than {1/2}, so together they are more than 1. Ben’s {5/7} is less than 1. That cannot be right.', 'Spot the mistake'),
    p('<b>Making a whole.</b> Look for fraction parts that fit together. In 4 {5/6} + 2 {1/6}, the two sixth-parts make exactly 1, so the answer is 4 + 2 + 1 = 7.'),
  ],

  practice: [
    num('p1', 'Find 2 {1/5} + 3 {2/5}.', '28/5', { mixed: true,
      h: ['Add the wholes. Then add the fractions.'],
      s: '2 + 3 = 5 and {1/5} + {2/5} = {3/5}. The answer is 5 {3/5}.',
      w: [['5 3/10', 'Do not add the bottoms when the pieces are the same size.']] }),
    num('p2', 'Find 4 {1/2} + 2 {1/3}.', '41/6', { mixed: true,
      h: ['Wholes: 4 + 2.', 'Use sixths for the fractions.'],
      s: '4 + 2 = 6 and {3/6} + {2/6} = {5/6}. The answer is 6 {5/6}.',
      w: [['6 2/5', 'Do not add the bottoms. Halves and thirds need sixths.']] }),
    num('p3', 'Find 3 {3/4} + 2 {3/4}.', '13/2', { mixed: true,
      h: ['The fractions together make more than 1.'],
      s: '3 + 2 = 5. {3/4} + {3/4} = {6/4} = 1 {1/2}. Then 5 + 1 {1/2} = 6 {1/2}.',
      w: [['5 1/2', FORGOT]] }),
    num('p4', 'Find 1 {5/6} + 2 {3/8}.', '101/24', { mixed: true,
      h: ['Use 24ths for the fractions.', '{5/6} = {20/24}.'],
      s: '1 + 2 = 3. {20/24} + {9/24} = {29/24} = 1 {5/24}. Then 3 + 1 {5/24} = 4 {5/24}.',
      w: [['3 5/24', FORGOT]] }),
    num('p5', 'A hallway needs three carpet strips: 2 {1/2} m, 1 {3/4} m and 2 {1/4} m. What is the total length in meters?', '13/2', { mixed: true,
      h: ['Add the wholes: 2 + 1 + 2.', 'Fractions: {1/2} + {3/4} + {1/4}. Look for fractions that fit together.'],
      s: 'Wholes: 5. Fractions: {3/4} + {1/4} = 1, and 1 + {1/2} = 1 {1/2}. Total: 5 + 1 {1/2} = 6 {1/2} m.',
      w: [['5 1/2', FORGOT]] }),
    num('p6', 'Two mixed numbers add up to exactly 6. One of them is 2 {5/8}. What is the other one?', '27/8', { mixed: true,
      h: ['How much more than 2 {5/8} is needed to reach 3?', 'Then you still need 3 more.'],
      s: '2 {5/8} plus {3/8} makes 3. Then 3 more makes 6. The other number is 3 {3/8}.',
      w: [['3 5/8', 'Check: 2 {5/8} + 3 {5/8} = 6 {1/4}, which is too much.']] }),
    num('p7', 'Two equal mixed numbers add up to 9 {1/3}. What is each one?', '14/3', { mixed: true,
      h: ['Half of 9 {1/3}. Halve the wholes and the fraction, but 9 is odd.', '9 {1/3} = 8 {4/3}.'],
      s: '9 {1/3} = 8 {4/3}. Half of 8 is 4 and half of {4/3} is {2/3}. Each number is 4 {2/3}. Check: 4 {2/3} + 4 {2/3} = 8 {4/3} = 9 {1/3}.',
      w: [['4 1/6', 'You halved only the fraction, {1/3}, and forgot to share the odd whole.']] }),
    num('p8', 'A bin holds 10 cups of rice. Rosa pours in 2 {3/4} cups, then 3 {2/3} cups, then 1 {5/6} cups. How many cups of room are left in the bin?', '7/4', { mixed: true,
      h: ['First find how many cups are poured in altogether.', 'Fractions in twelfths: {9/12} + {8/12} + {10/12}.'],
      s: 'Wholes: 2 + 3 + 1 = 6. Fractions: {27/12} = 2 {3/12} = 2 {1/4}. Poured in: 8 {1/4} cups. Room left: 10 − 8 {1/4} = 1 {3/4} cups.',
      w: [['8 1/4', 'That is how much was poured in. The question asks for the room that is left.']] }),
  ],

  challenge: [
    chain('The trail', 'A trail has three parts. They are 1 {3/4} km, 2 {2/3} km and 1 {5/6} km long.', [
      num('c1a', 'How long are the first two parts together?', '53/12', { mixed: true, h: ['Wholes: 1 + 2. Fractions in twelfths.'], s: '1 + 2 = 3 and {9/12} + {8/12} = {17/12} = 1 {5/12}. Total: 4 {5/12} km.' }),
      num('c1b', 'How long is the whole trail?', '25/4', { mixed: true, h: ['Add 1 {5/6} to your last answer. {5/6} = {10/12}.'], s: '4 {5/12} + 1 {10/12}: wholes 5, fractions {15/12} = 1 {3/12}. Total 6 {1/4} km.' }),
      num('c1c', 'Tamar walks the whole trail and back again. How far does she walk?', '25/2', { mixed: true, h: ['Two times the length of the trail. Add it to itself.'], s: '6 {1/4} + 6 {1/4}: wholes 12, fractions {2/4} = {1/2}. Total: 12 {1/2} km.' }),
    ], 'The idea: keep a running total. Add one part at a time, regroup when the fractions make a whole, and use the answer you already have.'),
    chain('Growing steps', 'Mia starts at 1 {1/4}. Each next number is 1 {5/6} more than the one before.', [
      num('c2a', 'What is the second number?', '37/12', { mixed: true, h: ['Add 1 {5/6} to 1 {1/4}. Use twelfths.'], s: 'Wholes: 2. Fractions: {3/12} + {10/12} = {13/12} = 1 {1/12}. Second number: 3 {1/12}.' }),
      num('c2b', 'What is the third number?', '59/12', { mixed: true, h: ['Add 1 {5/6} to 3 {1/12}.'], s: 'Wholes: 4. Fractions: {1/12} + {10/12} = {11/12}. Third number: 4 {11/12}.' }),
      num('c2c', 'What do the three numbers add up to?', '37/4', { mixed: true, h: ['Add 1 {1/4} + 3 {1/12} + 4 {11/12}.', 'Look for fractions that fit together: {1/12} and {11/12}.'], s: 'Wholes: 1 + 3 + 4 = 8. Fractions: {3/12} + {1/12} + {11/12} = {15/12} = 1 {1/4}. Total: 9 {1/4}.' }),
    ], 'The idea: when you add the same amount again and again, each new number is easy to find from the last one. Regroup as you go.'),
    mc('c3', 'Find the error. Nico says "3 {4/5} + 2 {4/5} = 5 {8/5}, so the answer is 5 {8/5}." What is the best correction?', ['{8/5} is more than a whole. Take out 1: {8/5} = 1 {3/5}, and the answer is 6 {3/5}.', 'The answer should be 5 {4/5}.', 'The answer should be 5 {8/10}.', 'Nico is right. 5 {8/5} is the answer.'], 0, {
      s: '3 + 2 = 5 and {4/5} + {4/5} = {8/5} = 1 {3/5}. So 5 + 1 {3/5} = 6 {3/5}.',
      w: [[1, 'That drops the second {4/5}. Both fraction parts must be added.'], [2, 'Do not add the bottoms. The pieces are the same size, fifths.'], [3, 'A mixed number should have a fraction part less than 1. Take out the extra whole.']],
    }),
  ],

  quiz: [
    tpl('noregroup', (r) => {
      const d = r.int(4, 12), w1 = r.int(1, 9), w2 = r.int(1, 9), a = r.int(1, Math.floor((d - 1) / 2)), b = r.int(1, d - 1 - a), ans = add(mv(w1, a, d), mv(w2, b, d));
      return N('Find ' + MS(w1, a, d) + ' + ' + MS(w2, b, d) + '.', fmt(ans), { mixed: true, s: 'Wholes: ' + (w1 + w2) + '. Fractions: ' + F(a, d) + ' + ' + F(b, d) + ' = ' + F(a + b, d) + '. Total: ' + fmMixed(ans) + '.', w: W(ans, [[R((w1 + w2) * 2 * d + a + b, 2 * d), 'The pieces are the same size. Do not add the bottoms.']]) });
    }),
    tpl('regroup', (r) => {
      const d = r.int(3, 12), w1 = r.int(1, 9), w2 = r.int(1, 9), a = r.int(Math.floor(d / 2) + 1, d - 1), b = r.int(d - a + 1, d - 1), ans = add(mv(w1, a, d), mv(w2, b, d));
      return N('Find ' + MS(w1, a, d) + ' + ' + MS(w2, b, d) + '.', fmt(ans), { mixed: true, s: 'Wholes: ' + (w1 + w2) + '. Fractions: ' + F(a, d) + ' + ' + F(b, d) + ' = ' + F(a + b, d) + ' = 1 ' + F(a + b - d, d) + '. Total: ' + (w1 + w2) + ' + 1 ' + F(a + b - d, d) + ' = ' + fmMixed(ans) + '.', w: W(ans, [[R((w1 + w2) * d + a + b - d, d), 'You forgot the extra whole from the fractions.']]) });
    }),
    tpl('unlike', (r) => {
      const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [2, 4], [3, 6], [4, 6], [5, 6], [6, 8], [3, 8], [4, 8]];
      const [b, d] = r.pick(pairs), w1 = r.int(1, 8), w2 = r.int(1, 8), a = r.int(1, b - 1), c = r.int(1, d - 1), ans = add(mv(w1, a, b), mv(w2, c, d));
      return N('Find ' + MS(w1, a, b) + ' + ' + MS(w2, c, d) + '.', fmt(ans), { mixed: true, s: 'Wholes: ' + (w1 + w2) + '. Fractions in ' + lcm(b, d) + 'ths: ' + F(a * (lcm(b, d) / b), lcm(b, d)) + ' + ' + F(c * (lcm(b, d) / d), lcm(b, d)) + '. Total: ' + fmMixed(ans) + '.', w: W(ans, [[R((w1 + w2) * (b + d) + a + c, b + d), 'Do not add the bottoms. Use a common bottom.']]) });
    }),
    tpl('story', (r) => {
      const [b, d] = r.pick([[2, 4], [2, 3], [3, 4], [4, 6], [2, 5]]), w1 = r.int(1, 6), w2 = r.int(1, 6), a = r.int(1, b - 1), c = r.int(1, d - 1), ans = add(mv(w1, a, b), mv(w2, c, d));
      const who = r.pick(['Elena', 'Farid', 'Grace', 'Hiro']);
      const q = r.pick([
        who + ' cuts two ribbons. One is ' + MS(w1, a, b) + ' meters long. The other is ' + MS(w2, c, d) + ' meters long. What is their total length in meters?',
        who + ' bikes ' + MS(w1, a, b) + ' km in the morning and ' + MS(w2, c, d) + ' km in the afternoon. How many kilometers is that in all?',
        who + ' bakes for ' + MS(w1, a, b) + ' hours, then cleans up for ' + MS(w2, c, d) + ' hours. How many hours is that in all?',
      ]);
      return N(q, fmt(ans), { mixed: true, s: 'Add the wholes: ' + (w1 + w2) + '. Add the fractions with a common bottom. The total is ' + fmMixed(ans) + '.', w: W(ans, [[R((w1 + w2) * (b + d) + a + c, b + d), 'Do not add the bottoms. Use a common bottom.']]) });
    }),
    tpl('three', (r) => {
      const ds = r.pick([[2, 4, 4], [2, 3, 6], [3, 6, 6], [4, 4, 2], [2, 2, 4], [3, 3, 6]]), ws = ds.map(() => r.int(1, 7)), ns = ds.map((d) => r.int(1, d - 1));
      const vals = ds.map((d, i) => mv(ws[i], ns[i], d)), ans = vals.reduce((x, y) => add(x, y));
      return N('Find ' + ds.map((d, i) => MS(ws[i], ns[i], d)).join(' + ') + '.', fmt(ans), { mixed: true, s: 'Wholes: ' + ws.reduce((x, y) => x + y) + '. Add the fraction parts with a common bottom, regroup if they pass 1. Total: ' + fmMixed(ans) + '.', w: W(ans, [[R(ws.reduce((x, y) => x + y), 1), 'You left out the fraction parts.']]) });
    }),
    tpl('toten', (r) => {
      const d = r.pick([3, 4, 5, 6, 8]), w1 = r.int(1, 4), w2 = r.int(1, 4), a = r.int(1, d - 1), c = r.int(1, d - 1), s = add(mv(w1, a, d), mv(w2, c, d)), ans = sub(R(10), s);
      return N('How much must be added to ' + MS(w1, a, d) + ' + ' + MS(w2, c, d) + ' to make exactly 10?', fmt(ans), { mixed: true, s: MS(w1, a, d) + ' + ' + MS(w2, c, d) + ' = ' + fmMixed(s) + '. From there to 10 is ' + fmMixed(ans) + '.', w: W(ans, [[s, 'That is the sum you already have. The question asks how much more to reach 10.']]) });
    }),
    tpl('equal', (r) => {
      const d = r.pick([2, 3, 4, 5, 6, 8]), w = r.int(1, 12), n = r.int(1, d - 1), x = mv(w, n, d), tot = add(x, x);
      return N('Two equal numbers add up to ' + fmMixed(tot) + '. What is each one?', fmt(x), { mixed: true, s: 'Half of ' + fmMixed(tot) + ' is ' + fmMixed(x) + '. Check: ' + fmMixed(x) + ' + ' + fmMixed(x) + ' = ' + fmMixed(tot) + '.', w: W(x, [[tot, 'That is the total. Each number is half of it.']]) });
    }),
    tpl('perimeter', (r) => {
      const d = r.pick([2, 4]), l = r.int(2, 9), w = r.int(1, 6), a = r.int(1, d - 1), c = r.int(1, d - 1), len = mv(l, a, d), wid = mv(w, c, d), ans = add(add(len, len), add(wid, wid));
      return N('A rectangle is ' + MS(l, a, d) + ' cm long and ' + MS(w, c, d) + ' cm wide. What is its perimeter in cm?', fmt(ans), { mixed: true, s: 'The perimeter is length + width + length + width. ' + fmMixed(len) + ' + ' + fmMixed(wid) + ' = ' + fmMixed(add(len, wid)) + '. Double it: ' + fmMixed(ans) + '.', w: W(ans, [[add(len, wid), 'That is only half of the way around. A rectangle has two lengths and two widths.']]) });
    }),
  ],
});
