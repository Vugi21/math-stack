import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));

export default lesson({
  id: 'm4-3-2-order-of-operations',
  title: 'Order of operations',
  blurb: 'The agreed order for doing operations, and how parentheses change an answer.',
  concepts: ['order-of-operations', 'parentheses', 'exponents'],

  tryFirst: [
    num('t1', 'Find 2 + 3 × 4. Think about what you should do first.', 14, {
      h: ['Picture 2 apples and 3 bags with 4 apples each.'],
      s: 'Multiplication comes before addition. 3 × 4 = 12, then 2 + 12 = 14.',
      w: [['20', 'That adds first: (2 + 3) × 4. The agreed rule does multiplication first.']],
    }),
    num('t2', 'Find 24 ÷ 4 × 2. Work from left to right.', 12, {
      h: ['Do 24 ÷ 4 first.'],
      s: '24 ÷ 4 = 6. Then 6 × 2 = 12.',
      w: [['3', 'You did 4 × 2 first. Multiplication and division share a level, so go from left to right.']],
    }),
  ],

  learn: [
    p('A long expression can be read in different ways. 3 + 2 × 5 could mean 25 or 13. To make sure everyone gets the same answer, we agree on an order.'),
    def('expression', 'A group of numbers and operation signs that stands for one value, like 3 + 2 × 4. Working out the value is called <b>evaluating</b> it.'),
    def('parentheses', 'The curved brackets ( ). Whatever is inside them is worked out first, as if it were one number.'),
    rule('<b>The order.</b> (1) Parentheses first, working from the inside out. (2) Then exponents. (3) Then multiplication and division, from left to right. (4) Then addition and subtraction, from left to right.'),
    tbl(['Step', 'Do these', 'Direction'], [['1', 'parentheses ( )', 'innermost first'], ['2', 'exponents', ''], ['3', '× and ÷ together', 'left to right'], ['4', '+ and − together', 'left to right']], 'Multiplication and division share a step. So do addition and subtraction.'),
    ex('A full example: 3 + 2 × (7 − 5)^[2]', ['Parentheses: 7 − 5 = 2. The expression is 3 + 2 × 2^[2].', 'Exponents: 2^[2] = 4. Now it is 3 + 2 × 4.', 'Multiplication: 2 × 4 = 8. Now it is 3 + 8.', 'Addition: 11.']),
    tip('<b>One step at a time.</b> Rewrite the whole expression after each step, with only that step done. Never try to do two steps in one jump. Most mistakes come from skipping the rewriting.'),
    rule('<b>An exponent only touches the number just before it.</b> In 2 × 3^[2], square the 3 first: 2 × 9 = 18. In (2 × 3)^[2] the parentheses make the 6 the base: 36.'),
    ex('Nested parentheses: 2 × (3 + (10 − 4) ÷ 2)', ['Innermost parentheses: 10 − 4 = 6. Now it is 2 × (3 + 6 ÷ 2).', 'Inside the outer parentheses, divide first: 6 ÷ 2 = 3. Now it is 2 × (3 + 3).', 'Add: 3 + 3 = 6. Now it is 2 × 6.', 'Multiply: 12.']),
    ex('Left to right: 48 ÷ 6 × 2 + 3^[2] − 4', ['Exponent first: 3^[2] = 9. Now it is 48 ÷ 6 × 2 + 9 − 4.', 'Multiplication and division from the left: 48 ÷ 6 = 8, then 8 × 2 = 16. Now it is 16 + 9 − 4.', 'Addition and subtraction from the left: 16 + 9 = 25, then 25 − 4 = 21.']),
    warn('<b>Left to right matters.</b> 40 ÷ 5 × 2 is 8 × 2 = 16, not 40 ÷ 10 = 4. And 10 − 3 + 2 = 9, not 5. Multiplication does not beat division, and addition does not beat subtraction.'),
    key('Two operations on the same step are done in the order they appear, from left to right. Only a different step changes who goes first.'),
    p('Parentheses let you change the order on purpose. 3 + 2 × 5 = 13, but (3 + 2) × 5 = 25. Inserting parentheses is a good way to hit a target number.'),
    tip('<b>A memory aid.</b> Many people remember the order as "PEMDAS": Parentheses, Exponents, Multiplication and Division, Addition and Subtraction. Take care: the letters M and D are one step, and so are A and S. Neither letter wins just by coming first.'),
    mcq('Tara says: "36 ÷ 6 × 3 = 36 ÷ 18 = 2, because multiplication comes first." What is wrong?', ['Nothing. 2 is correct.', 'Multiplication and division share a level, so go left to right: 36 ÷ 6 = 6, then 6 × 3 = 18.', 'She should have added first.'], 1, 'Multiplication does not come before division. They are done in the order they appear, from left to right. The answer is 18.', 'Spot the mistake'),
    recap([['expression', 'numbers and signs standing for one value'], ['parentheses', 'work out what is inside first'], ['evaluate', 'work out the value of an expression']], [['Order', 'parentheses, exponents, × and ÷, + and −'], ['Same step', 'go left to right']]),
  ],

  practice: [
    num('p1', 'Find 5 + 4 × 3^[2].', 41, {
      h: ['Exponent first, then multiplication, then addition.'],
      s: '3^[2] = 9. 4 × 9 = 36. 5 + 36 = 41.',
      w: [['81', 'That adds 5 + 4 first. Do the exponent and multiplication before addition.'], ['29', '3^[2] means 3 × 3 = 9, not 3 × 2 = 6.']],
    }),
    num('p2', 'Find 48 ÷ 6 ÷ 2.', 4, {
      h: ['Left to right.'],
      s: '48 ÷ 6 = 8. 8 ÷ 2 = 4.',
      w: [['16', 'That is 48 ÷ (6 ÷ 2). Divisions go left to right.']],
    }),
    num('p3', 'Find (7 + 5) × 2^[3] − 10.', 86, {
      h: ['Parentheses: 12. Exponent: 8.'],
      s: '7 + 5 = 12 and 2^[3] = 8. 12 × 8 = 96. 96 − 10 = 86.',
      w: [['62', '2^[3] means 2 × 2 × 2 = 8, not 2 × 3 = 6.'], ['106', 'You need to subtract 10, not add it.']],
    }),
    num('p4', 'Find 100 − 4 × (3 + 2)^[2].', 0, {
      h: ['Parentheses first: 3 + 2 = 5.', 'Then the exponent.'],
      s: '3 + 2 = 5. 5^[2] = 25. 4 × 25 = 100. 100 − 100 = 0.',
      w: [['2400', 'That subtracts 100 − 4 first. Multiplication comes before subtraction.']],
    }),
    mc('p5', 'Which placement of one pair of parentheses makes 3 + 4 × 5 − 2 equal 33?', ['3 + 4 × (5 − 2)', '(3 + 4) × 5 − 2', '3 + (4 × 5) − 2', '(3 + 4 × 5) − 2'], 1, {
      h: ['Without parentheses, 3 + 4 × 5 − 2 = 21.', 'To reach 33, you need something bigger multiplied by 5.'],
      s: '(3 + 4) × 5 − 2 = 7 × 5 − 2 = 33. The others are 15, 21 and 21.',
      w: [[0, '3 + 4 × 3 = 15.'], [2, 'Multiplication was already first, so this changes nothing: 21.'], [3, 'This also changes nothing: 21.']],
    }),
    num('p6', 'What exponent goes in the box to make 2^[□] + 3 × 4 = 20 true?', 3, {
      h: ['3 × 4 = 12. What must 2^[□] be?'],
      s: '3 × 4 = 12. 20 − 12 = 8. 2^[3] = 8, so the box is 3.',
      w: [['8', '8 is the value of the power. The box is the exponent.'], ['4', '2^[4] = 16, and 16 + 12 = 28.']],
    }),
    num('p7', 'Find 8 + 4 ÷ 2 × 3 − 1.', 13, {
      h: ['Divide and multiply first, left to right: 4 ÷ 2 × 3.'],
      s: '4 ÷ 2 = 2. 2 × 3 = 6. Then 8 + 6 − 1 = 13.',
      w: [['17', 'You added 8 + 4 first. Division and multiplication come before addition.'], ['14', 'Do not forget to subtract the 1.']],
    }),
    num('p8', 'Find 2 + 3 × 4^[2].', 50, {
      h: ['Exponent, then multiplication, then addition.'],
      s: '4^[2] = 16. 3 × 16 = 48. 2 + 48 = 50.',
      w: [['80', 'That adds 2 + 3 first. Multiplication goes before addition.'], ['196', 'That squares (2 + 3 × 4). The exponent belongs only to the 4.']],
    }),
  ],

  challenge: [
    chain('Parentheses everywhere', 'Take the expression 2 + 3 × 4 + 5. You may put parentheses anywhere you like.', [
      num('c1a', 'What is the value with no parentheses?', 19, { h: ['Multiply first: 3 × 4.'], s: '3 × 4 = 12. 2 + 12 + 5 = 19.' }),
      num('c1b', 'What is the greatest value you can get with parentheses?', 45, { h: ['To make the multiplication big, you want big sums on both sides of it.'], s: '(2 + 3) × (4 + 5) = 5 × 9 = 45. No other placement gives more.' }),
      num('c1c', 'How many different values can you get, counting 19? (Different parentheses can give the same value.)', 4, { h: ['Try (2+3)×4+5, 2+3×(4+5), and (2+3)×(4+5).', 'Some placements change nothing.'], s: 'The values are 19, 25 [(2+3)×4+5], 29 [2+3×(4+5)] and 45. That is four.' }),
    ], 'The idea: parentheses decide which sums happen before a multiplication. Placements that surround a multiplication on its own change nothing.'),
    chain('Squares and sums', 'People often think (a + b)^[2] is the same as a^[2] + b^[2]. Test it.', [
      num('c2a', 'Find 3^[2] + 4^[2].', 25, { h: ['9 and 16.'], s: '9 + 16 = 25.' }),
      num('c2b', 'Find (3 + 4)^[2].', 49, { h: ['Add first, then square.'], s: '3 + 4 = 7. 7^[2] = 49.' }),
      num('c2c', 'What is the difference between your last two answers?', 24, { h: ['49 − 25.', 'Compare with 2 × 3 × 4.'], s: '49 − 25 = 24, which is exactly 2 × 3 × 4. A square of side 7 splits into a 3-by-3 square, a 4-by-4 square, and two 3-by-4 rectangles.' }),
    ], 'The idea: (a + b)^[2] is not a^[2] + b^[2]. The missing amount is 2 × a × b, the two rectangles.'),
    mc('c3', 'Find the error. Sam says: "12 − 4 + 3 = 12 − 7 = 5, because I should add before I subtract." What went wrong?', ['Addition and subtraction share a level, so go left to right: 12 − 4 = 8, then 8 + 3 = 11.', 'He should have multiplied: 12 − 4 × 3 = 0.', 'The answer 5 is correct.', 'He should have multiplied.'], 0, {
      s: 'Left to right: 12 − 4 = 8, 8 + 3 = 11. (Adding first is only fine if you put parentheses in the right spot: 12 − (4 + 3) = 5.)',
      w: [[2, 'Without parentheses, + and − go left to right.'], [1, 'There is no multiplication in this problem, so nothing is multiplied.']],
    }),
  ],

  quiz: [
    tpl('addMulPow', (r) => {
      const a = r.int(1, 20), b = r.int(2, 9), c = r.int(2, 5);
      const v = a + b * c * c;
      return N('Find ' + a + ' + ' + b + ' × ' + c + '^[2].', v, { s: c + '^[2] = ' + c * c + '. ' + b + ' × ' + c * c + ' = ' + b * c * c + '. ' + a + ' + ' + b * c * c + ' = ' + v + '.', w: wr(v, [[(a + b) * c * c, 'Multiplication comes before addition.'], [a + (b * c) ** 2, 'The exponent goes only with ' + c + ', not with ' + b + '.']]) });
    }),
    tpl('divMul', (r) => {
      const b = r.int(2, 9), k = r.int(2, 9), c = r.int(2, 9);
      const a = b * k;
      const wrongs = a % (b * c) === 0 ? [[a / (b * c), 'Go left to right: divide first, then multiply.']] : [];
      return N('Find ' + a + ' ÷ ' + b + ' × ' + c + '.', k * c, { s: a + ' ÷ ' + b + ' = ' + k + '. ' + k + ' × ' + c + ' = ' + k * c + '.', w: wr(k * c, wrongs) });
    }),
    tpl('parens', (r) => {
      const a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 9), d = r.int(1, Math.min(20, (a + b) * c - 1));
      const v = (a + b) * c - d;
      return N('Find (' + a + ' + ' + b + ') × ' + c + ' − ' + d + '.', v, { s: a + ' + ' + b + ' = ' + (a + b) + '. ' + (a + b) + ' × ' + c + ' = ' + (a + b) * c + '. Minus ' + d + ' is ' + v + '.', w: wr(v, [[a + b * c - d, 'The parentheses make you add first.'], [(a + b) * (c - d), 'Subtract only after multiplying.']]) });
    }),
    tpl('mix', (r) => {
      const b = r.int(2, 9), c = r.int(2, 9), a = b * c + r.int(5, 40), e = r.int(2, 6), k = r.int(2, 9);
      const d = e * k;
      const v = a - b * c + d / e;
      return N('Find ' + a + ' − ' + b + ' × ' + c + ' + ' + d + ' ÷ ' + e + '.', v, { s: b + ' × ' + c + ' = ' + b * c + ' and ' + d + ' ÷ ' + e + ' = ' + k + '. ' + a + ' − ' + b * c + ' + ' + k + ' = ' + v + '.', w: wr(v, [[(a - b) * c + k, 'Multiplication happens before subtraction.']]) });
    }),
    tpl('placeParens', (r) => {
      let a, b, c, d, A, B, C, ok = false;
      for (let t = 0; t < 60 && !ok; t++) {
        a = r.int(2, 9); b = r.int(2, 9); c = r.int(3, 9); d = r.int(1, c - 1);
        A = (a + b) * c - d; B = a + b * (c - d); C = a + b * c - d;
        ok = new Set([A, B, C]).size === 3;
      }
      if (!ok) { a = 3; b = 4; c = 5; d = 2; A = 33; B = 15; C = 21; }
      const useA = r.bool(), target = useA ? A : B;
      const tA = '(' + a + ' + ' + b + ') × ' + c + ' − ' + d, tB = a + ' + ' + b + ' × (' + c + ' − ' + d + ')', tC = a + ' + ' + b + ' × ' + c + ' − ' + d, tD = '(' + a + ' + ' + b + ' × ' + c + ') − ' + d;
      const right = useA ? tA : tB, other = useA ? tB : tA, ov = useA ? B : A;
      return choice(r, 'Which makes ' + a + ' + ' + b + ' × ' + c + ' − ' + d + ' equal ' + target + ', by adding parentheses?', right, [
        [other, 'That gives ' + ov + '.'], [tC, 'With no parentheses the value is ' + C + '.'], [tD, 'These parentheses change nothing. The value is ' + C + '.'],
      ], { s: right + ' = ' + target + '.' });
    }),
    tpl('expTrap', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9);
      return N('Find ' + a + ' × ' + b + '^[2].', a * b * b, { s: b + '^[2] = ' + b * b + '. ' + a + ' × ' + b * b + ' = ' + a * b * b + '.', w: wr(a * b * b, [[(a * b) ** 2, 'The exponent belongs only to ' + b + '.']]) });
    }),
    tpl('missing', (r) => {
      const a = r.int(2, 30), k = r.int(2, 9), c = r.int(2, 9);
      return N(a + ' + □ × ' + c + ' = ' + (a + k * c) + '. What number goes in the box?', k, { s: (a + k * c) + ' − ' + a + ' = ' + k * c + ', and ' + k * c + ' ÷ ' + c + ' = ' + k + '.', w: wr(k, [[k * c, 'That is the result of □ × ' + c + '. Divide by ' + c + ' to find the box.']]) });
    }),
  ],
});
