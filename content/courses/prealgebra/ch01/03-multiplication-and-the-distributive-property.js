import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([a]) => { const k = String(a); if (seen.has(k)) return false; seen.add(k); return true; }); };

export default lesson({
  id: 'pre-1-3-multiplication-and-the-distributive-property',
  title: 'Multiplication and the distributive property',
  blurb: 'Rectangles of dots explain why products can be rearranged and split, and splitting is the best mental-math tool you will ever own.',
  concepts: ['commutative', 'associative', 'distributive', 'mental-math'],

  tryFirst: [
    num('t1', 'Compute 7 × 98 in your head. There is a quick way that does not involve 7 × 98 directly.', 686, {
      h: ['98 is very close to a round number.', '7 × 100 is easy. How much too much is that?'],
      s: '7 × 100 = 700, but 98 is 2 less than 100, so we took 7 × 2 = 14 too many. 700 − 14 = 686.',
      w: [['714', 'You went up instead of down. 98 is smaller than 100, so 7 × 98 is smaller than 700.'], ['696', 'You removed only 4 from 700. Removing 2 sevens takes away 14.']],
    }),
    num('t2', 'A rectangle of tiles has 6 rows. The left part of each row has 9 tiles and the right part has 11 tiles. How many tiles are there in all? Find two different ways to count.', 120, {
      h: ['One way: count the tiles in each part separately, then add the parts.', 'Another way: how long is each whole row?'],
      s: 'Each row has 9 + 11 = 20 tiles, and 6 × 20 = 120. Or 6 × 9 = 54 on the left and 6 × 11 = 66 on the right: 54 + 66 = 120. Both ways agree!',
    }),
  ],

  learn: [
    p('Multiplication counts rectangles. 4 × 6 means 4 rows of 6 dots. Turn your head sideways and you see 6 rows of 4: the same dots, so 4 × 6 = 6 × 4. The numbers being multiplied are called <b>factors</b>, and the result is the <b>product</b>.'),
    rule('<b>Commutative and associative.</b> Multiplication also allows swapping, a × b = b × a, and regrouping, (a × b) × c = a × (b × c). In a long product you may multiply in any order and any grouping, just as with a sum.'),
    ex('Choosing a friendly order', ['Find 25 × 17 × 4.', 'Left to right means 25 × 17 = 425, then × 4. That is slow.', 'Instead regroup: (25 × 4) × 17.', '25 × 4 = 100, and 100 × 17 = 1700. Easy.']),
    def('multiplicative identity', 'The number 1. Multiplying by it changes nothing: a × 1 = a.'),
    def('zero property', 'Multiplying by 0 wipes everything out: a × 0 = 0. If a product is 0, at least one of its factors must be 0.'),
    p('Now the big one. Split a rectangle of dots with a vertical line. The dots on each side can be counted separately and added, and the total does not change.'),
    widget('arrayModel', { r: 3, c1: 4, c2: 2 }),
    def('distributive property', 'Multiplication distributes over addition: a × (b + c) = a × b + a × c. Multiplying a sum is the same as multiplying each part and then adding. The rectangle of dots is the picture: one rectangle of width b + c is cut into two rectangles of widths b and c.'),
    formula('Distributive property', 'a × (b + c) = a × b + a × c', 'a is the multiplier. Read left to right it is <i>expanding</i>. Read right to left it is <b>factoring out</b> the common factor a.'),
    formula('Distributing over a difference', 'a × (b − c) = a × b − a × c', 'It works for subtraction too, when you can compute b − c. Use it when a number is just under a round number: 8 × 997 = 8 × 1000 − 8 × 3 = 8000 − 24 = 7976.'),
    ex('Splitting a hard product', ['Find 13 × 12.', 'Split 12 into 10 + 2: 13 × (10 + 2).', 'Distribute: 13 × 10 + 13 × 2 = 130 + 26.', 'The answer is 156.']),
    ex('Factoring out', ['Find 36 × 17 + 36 × 83.', 'Both terms have the 36. Pull it out: 36 × (17 + 83).', '17 + 83 = 100, so the answer is 36 × 100 = 3600.']),
    ex('Near a power of ten', ['Find 49 × 51.', 'Write 51 as 50 + 1: 49 × (50 + 1).', 'Distribute: 49 × 50 + 49 × 1 = 2450 + 49.', 'The answer is 2499.']),
    key('Distributing is how a hard multiplication becomes two easy ones. The same fact, read backwards, is how a long sum of products becomes one easy product. Look for a <b>common factor</b> or a <b>round number</b> nearby.'),
    tbl(['Property', 'In symbols', 'Example'], [['Commutative', 'a × b = b × a', '8 × 5 = 5 × 8'], ['Associative', '(a × b) × c = a × (b × c)', '(2 × 7) × 5 = 2 × (7 × 5)'], ['Identity', 'a × 1 = a', '47 × 1 = 47'], ['Zero', 'a × 0 = 0', '91 × 0 = 0'], ['Distributive', 'a × (b + c) = a × b + a × c', '6 × (10 + 3) = 60 + 18']], 'Multiplication properties'),
    tip('Learn the friendly pairs: <b>25 × 4 = 100</b> and <b>5 × 2 = 10</b>. In a product like 5 × 17 × 2 or 25 × 9 × 4, multiply the friendly pair first and the rest is easy.'),
    tip('Two checks for a split product: the pieces must add back to the original number (10 + 2 = 12), and <i>every</i> piece must be multiplied by the outside number. Estimating also helps: 6 × 53 is a bit more than 6 × 50 = 300, so 303 is too small to be right.'),
    warn('<b>Watch out.</b> Distribute over a <i>sum</i>, and multiply the outside number by <i>every</i> piece. 5 × (20 + 3) is 5 × 20 + 5 × 3, not 5 × 20 + 3. Also, a × (b × c) is NOT a × b × a × c. Distribution only splits sums.'),
    mcq('Ava computes 6 × 53 as 6 × 50 + 3 = 303. What is wrong?', ['Nothing. 6 × 53 = 303.', 'She multiplied only the 50 by 6. The 3 also needs to be multiplied: 6 × 50 + 6 × 3 = 318.', 'She should have added 6 and 53.'], 1, 'The 6 multiplies the whole number 53, which is 50 + 3. Both pieces get multiplied: 300 + 18 = 318.', 'Spot the mistake'),
    recap([['factor', 'a number being multiplied'], ['product', 'the result of multiplying'], ['multiplicative identity', '1, since a × 1 = a'], ['distributive property', 'multiplying a sum means multiplying each part'], ['factoring out', 'the distributive property read backwards']], [['Distributive', 'a × (b + c) = a × b + a × c'], ['Zero', 'a × 0 = 0'], ['Identity', 'a × 1 = a']]),
  ],

  practice: [
    num('p1', 'Find 25 × 17 × 4 using a smart order.', 1700, {
      h: ['Which two numbers multiply to something round?'],
      s: '25 × 4 = 100, and 100 × 17 = 1700.',
      w: [['425', 'That is only 25 × 17. You still have to multiply by 4.']],
    }),
    num('p2', 'Compute 8 × 997 by thinking of 997 as 1000 − 3.', 7976, {
      h: ['8 × 1000 is easy.', 'You took too many by 8 × 3.'],
      s: '8 × 1000 = 8000, minus 8 × 3 = 24: 8000 − 24 = 7976.',
      w: [['7997', 'You subtracted only 3. The 3 also gets multiplied by 8, giving 24.'], ['8024', 'The number 997 is less than 1000, so the answer is less than 8000.']],
    }),
    num('p3', 'Find 36 × 17 + 36 × 83.', 3600, {
      h: ['Notice the shared factor 36 and pull it out.'],
      s: '36 × (17 + 83) = 36 × 100 = 3600.',
      w: [['612', 'That is just 36 × 17. There is a second product to add.']],
    }),
    mc('p4', 'Which expression equals 5 × (20 + 3)?', ['5 × 20 + 3', '5 × 20 + 5 × 3', '5 × 20 × 5 × 3', '(5 + 20) × 3'], 1, {
      h: ['Each piece inside the brackets gets multiplied by 5.'],
      s: '5 × 20 + 5 × 3 = 100 + 15 = 115.',
      w: [[0, 'The 5 must multiply the 3 as well.'], [2, 'Distribution turns a product of a sum into a SUM of products, not a long product.']],
    }),
    num('p5', 'Find 15 × 24 by splitting 24 into 20 + 4.', 360, {
      h: ['15 × 20 is 300.'],
      s: '15 × 20 = 300 and 15 × 4 = 60. Total 360.',
      w: [['304', 'You multiplied 15 by 20 but only added the 4. Multiply 15 by 4 too.']],
    }),
    num('p6', 'Find 99 × 101. (Hint: it is not meant to be done by long multiplication.)', 9999, {
      h: ['Write 101 as 100 + 1.', 'Then 99 × 100 + 99 × 1.'],
      s: '99 × 101 = 99 × 100 + 99 × 1 = 9900 + 99 = 9999.',
      w: [['9900', 'That is 99 × 100. You still need the extra 99 × 1.']],
    }),
    num('p7', 'If a × 17 + a × 3 = 140, what is a?', 7, {
      h: ['Factor out a from the left side.', 'What does 17 + 3 equal?'],
      s: 'a × (17 + 3) = a × 20 = 140, so a = 7.',
      w: [['20', 'The 20 is what you get from 17 + 3. Then a × 20 = 140.'], ['8', 'Check: 8 × 20 = 160, not 140.']],
    }),
  ],

  challenge: [
    chain('One fact, many neighbours', 'Suppose you know that 18 × 25 = 450 and nothing else.', [
      num('c1a', 'What is 18 × 26?', 468, { h: ['26 is 25 + 1.'], s: '18 × 26 = 18 × 25 + 18 × 1 = 450 + 18 = 468.' }),
      num('c1b', 'What is 18 × 24?', 432, { h: ['24 is 25 − 1.'], s: '450 − 18 = 432.' }),
      num('c1c', 'What is 18 × 50?', 900, { h: ['50 is 2 × 25.'], s: '18 × 50 = 18 × (25 × 2) = 450 × 2 = 900.' }),
    ], 'The idea: one known product gives its neighbours. Adding one more copy of the number steps up; removing one steps down; doubling a factor doubles the product.'),
    chain('Halve and double', 'Here is a famous shortcut: halve one factor and double the other. The product does not change.', [
      num('c2a', '35 × 16 = 70 × ?', 8, { h: ['35 doubled is 70. What happens to 16?'], s: '35 × 16 = 35 × (2 × 8) = (35 × 2) × 8 = 70 × 8.' }),
      num('c2b', 'Compute 70 × 8.', 560, { h: ['7 × 8 = 56.'], s: '70 × 8 = 560.' }),
      num('c2c', 'Use the same trick to find 25 × 36. Fill in 25 × 36 = 100 × ? and give the number.', 9, { h: ['25 became 100, which is 4 times as big, so 36 must become 4 times smaller.'], s: '36 ÷ 4 = 9, so 25 × 36 = 100 × 9 = 900.' }),
    ], 'The idea: this works because of the associative property. Write 36 = 4 × 9, regroup (25 × 4) × 9, and you get 100 × 9.'),
    mc('c3', 'Find the error. Ben computes 7 × 53 = 7 × 50 + 3 = 353. Which describes the mistake?', ['He should have computed 7 × 50 + 7 × 3 = 371. The 7 must multiply both parts of 53.', 'The distributive property does not work with a 7.', 'He should have added 7 and 53.', 'He is right.'], 0, {
      s: '350 + 21 = 371.',
      w: [[3, 'Check 7 × 53 another way: 53 sevens is about 50 sevens (350) plus 3 more sevens (21), so 371.'], [2, 'This is a multiplication problem.']],
    }),
  ],

  quiz: [
    tpl('near100', (r) => {
      const a = r.int(3, 9), k = r.int(1, 6), up = r.bool(), b = up ? 100 + k : 100 - k;
      return N('Compute ' + (r.bool() ? a + ' × ' + b : b + ' × ' + a) + ' using a round number.', a * b, { s: a + ' × 100 = ' + a * 100 + ', then ' + (up ? 'add' : 'subtract') + ' ' + a + ' × ' + k + ' = ' + a * k + ': ' + a * b + '.', w: wr(a * b, [[up ? a * 100 + k : a * 100 - k, 'The ' + k + ' also has to be multiplied by ' + a + '.']]) });
    }),
    tpl('factor', (r) => {
      const a = r.int(12, 99), b = r.int(11, 89), t = 100 * r.int(1, 3), c = t - b;
      return N('Find ' + a + ' × ' + b + ' + ' + a + ' × ' + c + '.', a * t, { s: 'Factor out ' + a + ': ' + a + ' × (' + b + ' + ' + c + ') = ' + a + ' × ' + t + ' = ' + a * t + '.', w: wr(a * t, [[a * b, 'There is a second product to add as well.']]) });
    }),
    tpl('dots', (r) => {
      const rows = r.int(3, 12), c1 = r.int(2, 15), c2 = r.int(2, 15);
      return N(name(r) + ' arranges dots in ' + rows + ' rows. In every row there are ' + c1 + ' red dots followed by ' + c2 + ' blue dots. How many dots in all?', rows * (c1 + c2), { s: 'Each row has ' + (c1 + c2) + ' dots, so ' + rows + ' × ' + (c1 + c2) + ' = ' + rows * (c1 + c2) + '.', w: wr(rows * (c1 + c2), [[rows * c1 + c2, 'The ' + rows + ' rows each have blue dots too: ' + rows + ' × ' + c2 + ' of them.']]) });
    }),
    tpl('friendly', (r) => {
      const [x, y] = r.pick([[25, 4], [5, 20], [50, 2], [125, 8], [20, 5], [250, 4]]), z = r.int(3, 19);
      const arr = r.shuffle([x, y, z]);
      return N('Find ' + arr.join(' × ') + '.', x * y * z, { s: 'Pair ' + x + ' and ' + y + ' to make ' + x * y + ', then × ' + z + ' = ' + x * y * z + '.' });
    }),
    tpl('expand', (r) => {
      const a = r.int(3, 12), b = r.int(2, 9);
      let c = r.int(2, 9);
      if (c === a) c = a === 9 ? 8 : a + 1; // (a+b)×c would equal a×(b+c) when a = c
      return choice(r, 'Which expression is equal to ' + a + ' × (' + b + ' + ' + c + ')?', a + ' × ' + b + ' + ' + a + ' × ' + c, [[a + ' × ' + b + ' + ' + c, 'The ' + a + ' must multiply the ' + c + ' as well.'], [a + ' × ' + b + ' × ' + a + ' × ' + c, 'Distribution makes a sum of two products, not a product.'], ['(' + a + ' + ' + b + ') × ' + c, 'That regroups the numbers differently and gives another value.']], { s: 'Multiply the ' + a + ' by each piece in the brackets and add.' });
    }),
    tpl('unknown', (r) => {
      const a = r.int(3, 15), b = r.int(2, 30), c = r.int(2, 30);
      return N('What number replaces the ? so that ' + a + ' × ' + b + ' + ' + a + ' × ' + c + ' = ' + a + ' × ?', b + c, { s: 'Factor out ' + a + ': ' + a + ' × (' + b + ' + ' + c + '), so ? = ' + (b + c) + '.', w: wr(b + c, [[b * c, 'Factoring turns two products into one product with a SUM inside the brackets.']]) });
    }),
    tpl('nine', (r) => {
      const k = r.pick([9, 99, 999]), n = r.int(12, 98), sw = r.bool();
      return N('Find ' + (sw ? n + ' × ' + k + ' + ' + n : k + ' × ' + n + ' + ' + n) + '.', (k + 1) * n, { s: 'The extra ' + n + ' is one more copy of ' + n + ', so we get ' + (k + 1) + ' × ' + n + ' = ' + (k + 1) * n + '.', w: wr((k + 1) * n, [[k * n, 'Do not forget the extra ' + n + ' at the end.']]) });
    }),
    tpl('solve', (r) => {
      const a = r.int(3, 14), b = r.int(5, 40), c = r.int(5, 40);
      return N('If n × ' + b + ' + n × ' + c + ' = ' + a * (b + c) + ', what is n?', a, { s: 'n × (' + b + ' + ' + c + ') = n × ' + (b + c) + ' = ' + a * (b + c) + ', so n = ' + a + '.', w: wr(a, [[b + c, 'That is the sum inside the brackets. Divide the total by it to get n.']]) });
    }),
  ],
});
