import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, widget, mcq, chain, R, add, sub, mul, eq, cmp, fmt, fm, fmMixed, tbl, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => {
  const seen = [];
  return list.filter(([v]) => { if (eq(v, ans) || seen.some((s) => eq(s, v))) return false; seen.push(v); return true; }).map(([v, m]) => [fmt(v), m]);
};
const F = (n, d) => '{' + n + '/' + d + '}';
const MS = (w, n, d) => w + ' ' + F(n, d);
const mv = (w, n, d) => R(w * d + n, d);

export default lesson({
  id: 'm4-8-6-fraction-mental-math',
  title: 'Fraction mental math',
  blurb: 'Look before you calculate: make wholes, compensate, spot patterns in sums, and estimate.',
  concepts: ['fractions', 'mental-math', 'estimation', 'patterns'],

  tryFirst: [
    num('t1', 'Find {3/7} + {2/5} + {4/7} + {3/5} without finding a common bottom for all four. What is the total?', 2, {
      h: ['Which two fractions have the same bottom? Which pairs fit together?', '{3/7} and {4/7} together make a whole.'],
      s: '{3/7} + {4/7} = {7/7} = 1. {2/5} + {3/5} = {5/5} = 1. The total is 1 + 1 = 2.',
      w: [['12/24', 'The pieces are different sizes. Pair the ones that match: sevenths with sevenths, fifths with fifths.']] }),
    num('t2', 'Find {1/2} + {1/4} + {1/8}. Can you tell the answer by thinking about how far each one is from 1?', '7/8', {
      h: ['Start with {1/2}. How far from 1? Then {1/4} covers half of the gap.'],
      s: '{1/2} leaves a gap of {1/2}. {1/4} fills half of that gap and leaves {1/4}. {1/8} fills half of that and leaves {1/8}. The sum is 1 − {1/8} = {7/8}.',
      w: [['3/14', 'Do not add the bottoms. Use eighths: {4/8} + {2/8} + {1/8}.']] }),
  ],

  learn: [
    p('Some fraction sums can be done in your head if you look first. Before you hunt for a common bottom, ask: does anything fit together? Good mental math is about noticing structure, not about working faster.'),
    def('compensate', 'To change a number to a nearby easy number, do the easy calculation, and then correct the answer by the amount you changed.'),
    def('benchmark fraction', 'An easy fraction to compare against: 0, {1/2} and 1. Rounding to a benchmark gives a quick estimate.'),
    formula('Fractions that make a whole', '{a/n} + {(n − a)/n} = 1', 'Two fractions with the same bottom whose tops add to the bottom make exactly 1. {3/8} + {5/8} = 1.'),
    rule('<b>Make wholes.</b> Two fractions with the same bottom whose tops add to the bottom make exactly 1. {3/8} + {5/8} = 1. The order of adding does not matter, so you can pair up the fractions that fit.'),
    ex('Pairing', ['Add {2/7} + {3/5} + {5/7} + {2/5}.', 'Swap the order: ({2/7} + {5/7}) + ({3/5} + {2/5}).', 'Each bracket is 1.', 'The total is 2.']),
    rule('<b>Compensate.</b> If a number is just under an easy number, change it to the easy number and then fix the answer. 3 {7/8} is {1/8} short of 4.'),
    ex('Compensating in an addition', ['Add 3 {7/8} + 2 {5/8}.', 'Add 4 instead of 3 {7/8}: 4 + 2 {5/8} = 6 {5/8}.', 'But you added {1/8} too much. Take it back: 6 {5/8} − {1/8}.', 'The answer is 6 {4/8} = 6 {1/2}.']),
    ex('Compensating in a subtraction', ['Find 7 {1/2} − 2 {7/8}.', 'Take away 3 instead of 2 {7/8}: 7 {1/2} − 3 = 4 {1/2}.', 'But you took away {1/8} too much. Give it back: 4 {1/2} + {1/8}.', 'The answer is 4 {5/8}.']),
    key('Look for <b>structure</b> before you calculate: pairs that make 1, numbers just under a whole, or sums where the middle parts cancel.'),
    p('<b>Halving sums.</b> Add {1/2} + {1/4} + {1/8} + {1/16}. Each new piece is half the gap that was left. The gap to 1 shrinks from {1/2} to {1/4} to {1/8} to {1/16}. The sum is 1 − {1/16} = {15/16}.'),
    widget('fractionExplorer', { n: 7, d: 8 }),
    rule('<b>Telescoping.</b> Some differences are easy: {1/2} − {1/3} = {1/6}. So {1/6} can be written as {1/2} − {1/3}. Likewise {1/12} = {1/3} − {1/4}. When you add them, the middle parts cancel: {1/6} + {1/12} = ({1/2} − {1/3}) + ({1/3} − {1/4}) = {1/2} − {1/4} = {1/4}.'),
    ex('A longer chain', ['Add {1/6} + {1/12} + {1/20}.', 'Look at the bottoms: 6 = 2 × 3, 12 = 3 × 4, 20 = 4 × 5. Each is two neighbors multiplied, and each fraction is a difference of two neighbors.', 'These are {1/6} = {1/2} − {1/3}, {1/12} = {1/3} − {1/4}, {1/20} = {1/4} − {1/5}.', 'Everything in the middle cancels. What is left is {1/2} − {1/5}.', 'The answer is {5/10} − {2/10} = {3/10}.']),
    p('<b>Estimating.</b> You can often tell roughly how big an answer is. Round each fraction to the nearest of 0, {1/2} or 1. {7/8} is near 1. {5/12} is near {1/2}. {1/9} is near 0.'),
    tip('Use an estimate to check an exact answer. If your exact answer is far from the estimate, look for a mistake, such as adding the bottoms.'),
    warn('<b>Watch out.</b> Pairing only works when the tops and bottoms fit exactly. {2/5} + {2/5} is not 1, and {1/3} + {1/4} cannot be paired. And an estimate is not an exact answer. Use it to check your work.'),
    mcq('Mia says "{1/2} + {1/3} + {1/4} + {1/5} is less than 1, because each of the four fractions is less than 1." What is wrong?', ['Each fraction is small, but they add up. {1/2} + {1/3} is already {5/6}, and {1/4} makes it more than 1.', 'Nothing. She is right.', 'The sum must be exactly 1.'], 0, '{1/2} + {1/3} = {5/6}. Adding {1/4} gives more than 1. The sum of all four is {77/60}. A sum of fractions less than 1 can be more than 1.', 'Spot the mistake'),
    recap([['compensate', 'use an easy nearby number, then correct'], ['benchmark', '0, {1/2} or 1, used for estimating'], ['telescoping', 'a sum where the middle terms cancel']], [['Make a whole', '{a/n} + {(n − a)/n} = 1'], ['Easy difference', '{1/2} − {1/3} = {1/6}']]),
  ],

  practice: [
    num('p1', 'Find {5/9} + {3/4} + {4/9} + {1/4}.', 2, {
      h: ['Which pairs make a whole?'],
      s: '{5/9} + {4/9} = 1 and {3/4} + {1/4} = 1. The total is 2.',
      w: [['1', 'You found only one of the two pairs. Both pairs make a whole.']] }),
    num('p2', 'Find {1/2} + {1/4} + {1/8} + {1/16} + {1/32}.', '31/32', {
      h: ['How far is the sum from 1 after each piece?'],
      s: 'After the last piece the gap to 1 is {1/32}. The sum is 1 − {1/32} = {31/32}.',
      w: [['1/32', 'That is the gap to 1. The sum is 1 minus that gap.']] }),
    num('p3', 'Find 5 {7/9} + 3 {8/9} in your head. Think of each as a bit less than a nicer number.', '29/3', { mixed: true,
      h: ['5 {7/9} is {2/9} short of 6. 3 {8/9} is {1/9} short of 4.'],
      s: '6 + 4 = 10. We added {2/9} + {1/9} = {3/9} too much. 10 − {3/9} = 9 {6/9} = 9 {2/3}.',
      w: [['10', 'You rounded up and did not take back the extra.'], ['9 1/3', 'The extra to take back is {3/9}. Take {3/9} from 10 and you get 9 {6/9}.']] }),
    num('p4', 'Find 8 {3/4} − 2 {7/8}. Take away 3, then fix it.', '47/8', { mixed: true,
      h: ['Take away 3 first. You took away {1/8} too much.'],
      s: '8 {3/4} − 3 = 5 {3/4}. Then give back {1/8}: 5 {6/8} + {1/8} = 5 {7/8}.',
      w: [['5 5/8', 'You took away {1/8} too much. Give it back. Do not take it away again.'], ['5 3/4', 'You forgot to give back the extra {1/8}.']] }),
    num('p5', 'Add {1/2} + {1/6} + {1/12} + {1/20} + {1/30}. Each one is a difference of two unit fractions.', '5/6', {
      h: ['{1/2} = 1 − {1/2}.', '{1/6} = {1/2} − {1/3}. What is {1/12}?', 'Most of the pieces cancel.'],
      s: '{1/2} = 1 − {1/2}, {1/6} = {1/2} − {1/3}, {1/12} = {1/3} − {1/4}, {1/20} = {1/4} − {1/5}, {1/30} = {1/5} − {1/6}. All the middle parts cancel. 1 − {1/6} = {5/6}.',
      w: [['1/6', 'That is what is left over below 1. The answer is 1 minus {1/6}.']] }),
    mc('p6', 'Without finding the exact sum, which is the closest to {11/12} + {6/11} + {1/8} + {7/8}?', ['1 {1/2}', '2', '2 {1/2}', '3 {1/2}'], 2, {
      h: ['Round each to 0, {1/2} or 1.', '{11/12} is near 1. {6/11} is near {1/2}.'],
      s: '{11/12} is about 1. {6/11} is about {1/2}. {1/8} is about 0. {7/8} is about 1. 1 + {1/2} + 0 + 1 = 2 {1/2}. The exact sum is about 2.46.',
      w: [[0, 'Check: {11/12} and {7/8} are both nearly 1, so the total is already almost 2.'], [1, '{11/12} + {7/8} is almost 2, and {6/11} is about {1/2}. So the total is more than 2.'], [3, 'The four fractions are each less than 1, and two of them are tiny or half. The total cannot be that big.']] }),
    num('p7', 'Find {1/12} + {2/12} + {3/12} + ... + {11/12}. Every fraction from {1/12} to {11/12} is added.', '11/2', { mixed: true,
      h: ['Pair the first with the last: {1/12} + {11/12}.', 'How many pairs are there?'],
      s: '{1/12} + {11/12} = 1, {2/12} + {10/12} = 1, and so on. There are 5 pairs, and {6/12} is left over alone. The total is 5 {1/2}.',
      w: [['5', 'The middle fraction, {6/12}, has no partner. Add it.'], ['6', 'There are only 5 pairs. The middle one, {6/12}, is only a half.']] }),
    num('p8', 'Find 1 + {1/2} + {1/4} + {1/8} + {1/16} + {1/32} + {1/64}. How far is the sum from 2?', '1/64', {
      h: ['After the first term, 1, the gap to 2 is 1.', 'Each new piece fills half of the gap that is left.'],
      s: 'The gap to 2 starts at 1. Adding {1/2} leaves {1/2}. Adding {1/4} leaves {1/4}. And so on. After adding {1/64} the gap is {1/64}.',
      w: [['2', 'That is the target. The question asks how far the sum is from 2.'], ['1/32', 'Each added piece halves the gap. After the last piece, {1/64}, the gap is {1/64}.']] }),
  ],

  challenge: [
    chain('Cutting rope in half again and again', 'A rope is 1 meter long. First cut off half of it. Then cut off half of what is left. Keep going: each cut takes half of the piece that remains.', [
      num('c1a', 'After 3 cuts, how many meters have been cut off in all?', '7/8', { h: ['The cuts are {1/2}, {1/4}, {1/8}.'], s: '{1/2} + {1/4} + {1/8} = {7/8} meter.' }),
      num('c1b', 'After 6 cuts, how many meters have been cut off in all?', '63/64', { h: ['What piece remains after each cut?', 'After 3 cuts {1/8} remains.'], s: 'After each cut the remaining piece is half as long. After 6 cuts it is {1/64} meter, so {63/64} meter was cut off.' }),
      num('c1c', 'After how many cuts is the remaining piece exactly {1/1024} meter long?', 10, { h: ['The remaining piece after n cuts has bottom 2, 4, 8, 16, ...', 'Double 1 until you reach 1024.'], s: '2 × 2 × 2 × ... Ten 2s multiply to 1024. So after 10 cuts the remaining piece is {1/1024} meter.' }),
    ], 'The idea: the sum of halves leaves a gap that halves every time. The cut-off part is always 1 minus the piece that remains.'),
    chain('A ladder of differences', 'Some unit fractions are the difference of two neighbors, like {1/6} = {1/2} − {1/3}.', [
      num('c2a', 'Find {1/3} − {1/4}.', '1/12', { h: ['Use twelfths.'], s: '{4/12} − {3/12} = {1/12}.' }),
      num('c2b', 'Find {1/6} + {1/12} without finding a common bottom. Use {1/6} = {1/2} − {1/3} and {1/12} = {1/3} − {1/4}.', '1/4', { h: ['Write both as differences and cancel the {1/3}.'], s: '({1/2} − {1/3}) + ({1/3} − {1/4}) = {1/2} − {1/4} = {1/4}.' }),
      num('c2c', 'Find {1/2} + {1/6} + {1/12} + {1/20} + {1/30} + {1/42} + {1/56} + {1/72} + {1/90}.', '9/10', { h: ['The bottoms are 1×2, 2×3, 3×4, ... up to 9×10.', 'Each is {1/n} − {1/(n+1)}. Think of what is left after all the middle parts cancel.'], s: 'The sum is (1 − {1/2}) + ({1/2} − {1/3}) + ... + ({1/9} − {1/10}). Only 1 − {1/10} is left: {9/10}.' }),
    ], 'The idea: when each piece is a difference of neighbors, the middle terms cancel like a folding telescope. Only the first and last survive.'),
    mc('c3', 'Find the error. Leo says "5 {7/8} + 2 {3/8}: 6 + 2 {3/8} = 8 {3/8}, so the answer is 8 {3/8}." What did he forget?', ['He rounded 5 {7/8} up to 6, so he added {1/8} too much. The answer is 8 {3/8} − {1/8} = 8 {2/8} = 8 {1/4}.', 'Nothing. Leo is right.', 'He should have rounded to 5.', 'He should have added the bottoms.'], 0, {
      s: '5 {7/8} + 2 {3/8}: wholes 7, fractions {10/8} = 1 {2/8}. Total 8 {2/8} = 8 {1/4}. Rounding up adds an extra {1/8}, which must come back off.',
      w: [[1, 'Check by regrouping: {7/8} + {3/8} = {10/8}, so the sum is 8 {1/4}, not 8 {3/8}.'], [2, 'You can round 5 {7/8} to 6, but you then have to fix the answer.']],
    }),
  ],

  quiz: [
    tpl('pairs', (r) => {
      const [d1, d2] = r.pick([[5, 7], [4, 9], [3, 8], [5, 6], [7, 9], [4, 11], [6, 7], [5, 8]]);
      const a = r.int(1, d1 - 1), b = r.int(1, d2 - 1);
      const dE = r.pick([2, 4]);
      const nE = r.int(1, dE - 1);
      const items = r.shuffle([F(a, d1), F(d1 - a, d1), F(b, d2), F(d2 - b, d2), F(nE, dE)]);
      const ans = add(R(2), R(nE, dE));
      return N('Find ' + items.join(' + ') + '. Look for pairs that make 1.', fmt(ans), { mixed: true, s: F(a, d1) + ' + ' + F(d1 - a, d1) + ' = 1 and ' + F(b, d2) + ' + ' + F(d2 - b, d2) + ' = 1. The leftover is ' + F(nE, dE) + '. Total: ' + fmMixed(ans) + '.', w: W(ans, [[R(2), 'You forgot the fraction that has no partner.']]) });
    }),
    tpl('halving', (r) => {
      const sd = r.int(2, 9), s0 = R(r.int(1, sd - 1), sd), n = r.int(4, 6);
      let terms = [], t = s0, tot = R(0);
      for (let i = 0; i < n; i++) { terms.push(fm(t)); tot = add(tot, t); t = mul(t, R(1, 2)); }
      return N('Add these fractions. Each one is half of the one before it: ' + terms.join(' + ') + '.', fmt(tot), { mixed: true, s: 'Each piece is half the one before. Added up, the sum is ' + fmMixed(tot) + '. It is just under ' + fm(mul(s0, R(2))) + ', the total if the halving never stopped.', w: W(tot, [[mul(s0, R(2)), 'That is where the halving would end up if it went on forever. The sum stops a little before that, by the size of the next piece.']]) });
    }),
    tpl('telescope', (r) => {
      const a = r.int(2, 10), len = r.int(3, 6), b = a + len - 1;
      const terms = [];
      for (let k = a; k <= b; k++) terms.push(F(1, k * (k + 1)));
      const ans = sub(R(1, a), R(1, b + 1));
      return N('Each bottom is two neighbors multiplied, like 3 × 4. Add: ' + terms.join(' + ') + '.', fmt(ans), { s: 'Each term is {1/n} − {1/(n+1)}. The middle parts cancel. What is left is ' + F(1, a) + ' − ' + F(1, b + 1) + ' = ' + fm(ans) + '.', w: W(ans, [[R(1, a), 'That is only the first part. The last part, ' + F(1, b + 1) + ', has to be taken away.']]) });
    }),
    tpl('compadd', (r) => {
      const d = r.int(5, 12), e1 = r.int(1, 2), e2 = r.int(1, 3), w1 = r.int(2, 7), w2 = r.int(2, 7);
      const x = mv(w1, d - e1, d), y = mv(w2, d - e2, d), ans = add(x, y);
      return N('Find ' + MS(w1, d - e1, d) + ' + ' + MS(w2, d - e2, d) + '.', fmt(ans), { mixed: true, s: 'Round up: ' + (w1 + 1) + ' + ' + (w2 + 1) + ' = ' + (w1 + w2 + 2) + '. You added ' + F(e1, d) + ' + ' + F(e2, d) + ' = ' + F(e1 + e2, d) + ' too much. The answer is ' + fmMixed(ans) + '.', w: W(ans, [[R(w1 + w2 + 2), 'You rounded both up. Take back the extra ' + F(e1 + e2, d) + '.']]) });
    }),
    tpl('compsub', (r) => {
      const d = r.int(4, 10), e = r.int(1, 3), w2 = r.int(1, 6), w1 = w2 + r.int(2, 6), n1 = r.int(1, d - 1);
      const x = mv(w1, n1, d), y = mv(w2, d - e, d), ans = sub(x, y);
      return N('Find ' + MS(w1, n1, d) + ' − ' + MS(w2, d - e, d) + '.', fmt(ans), { mixed: true, s: 'Take away ' + (w2 + 1) + ' instead. That is ' + F(e, d) + ' too much, so give ' + F(e, d) + ' back. The answer is ' + fmMixed(ans) + '.', w: W(ans, [[sub(x, R(w2 + 1)), 'You took away ' + F(e, d) + ' too much. Give it back.']]) });
    }),
    tpl('allfracs', (r) => {
      const d = r.int(6, 30), ans = R(d - 1, 2);
      return N('Add every fraction from ' + F(1, d) + ' up to ' + F(d - 1, d) + ': ' + F(1, d) + ' + ' + F(2, d) + ' + ' + F(3, d) + ' + ... + ' + F(d - 1, d) + '.', fmt(ans), { mixed: true, s: 'Pair the first with the last, and so on. Each pair makes 1. There are ' + (d - 1) + ' fractions, which is like ' + (d - 1) + '/2 pairs. The total is ' + fmMixed(ans) + '.', w: W(ans, [[R(d - 1), 'Each pair uses two fractions. The number of pairs is half the number of fractions.']]) });
    }),
    tpl('estimate', (r) => {
      let fr = null, tot = null;
      for (let t = 0; t < 400 && !fr; t++) {
        const list = [];
        for (let i = 0; i < 4; i++) { const d = r.int(5, 14); list.push([r.int(1, d - 1), d]); }
        const s = list.reduce((a, [n, d]) => add(a, R(n, d)), R(0));
        if (list.some(([n, d]) => Math.abs(n / d - 0.25) < 0.05 || Math.abs(n / d - 0.75) < 0.05)) continue;
        const rsum = list.reduce((a, [n, d]) => a + Math.round((n / d) * 2) / 2, 0);
        const v = s.n / s.d, near = Math.round(v * 2) / 2;
        if (Math.abs(v - near) <= 0.1 && near >= 2 && near <= 3.5 && rsum === near) { fr = list; tot = near; }
      }
      if (!fr) { fr = [[11, 12], [6, 11], [1, 8], [7, 8]]; tot = 2.5; }
      const label = (x) => (Number.isInteger(x) ? String(x) : Math.floor(x) + ' {1/2}');
      const opts = r.shuffle([tot - 1, tot - 0.5, tot + 0.5, tot + 1]).slice(0, 3);
      return choice(r, 'Which is closest to ' + fr.map(([n, d]) => F(n, d)).join(' + ') + '? Estimate, do not calculate it exactly.', label(tot), opts.map((x) => [label(x), 'Round each fraction to 0, {1/2} or 1 and add. That gets closer than this.']), { s: 'Round each fraction to the nearest of 0, {1/2} and 1. The exact sum is ' + (fr.reduce((a, [n, d]) => a + n / d, 0)).toFixed(2) + ', which is closest to ' + label(tot) + '.' });
    }),
    tpl('gap', (r) => {
      const n = r.int(2, 14), plus = r.bool();
      const ans = plus ? add(R(1, n), R(1, n + 1)) : sub(R(1, n), R(1, n + 1));
      return N('Find ' + F(1, n) + (plus ? ' + ' : ' − ') + F(1, n + 1) + '. The bottoms are neighbors, so look for a shortcut.', fmt(ans), { s: 'Use the bottom ' + n + ' × ' + (n + 1) + ' = ' + n * (n + 1) + ': ' + (plus ? F(n + 1, n * (n + 1)) + ' + ' + F(n, n * (n + 1)) + ' = ' + F(2 * n + 1, n * (n + 1)) : F(n + 1, n * (n + 1)) + ' − ' + F(n, n * (n + 1)) + ' = ' + F(1, n * (n + 1))) + (plus ? '.' : '. For neighbors, the difference is always one over the product.'), w: W(ans, [[R(plus ? 2 : 0, n + n + 1), 'Do not add the bottoms. Use a common bottom.']]) });
    }),
  ],
});
