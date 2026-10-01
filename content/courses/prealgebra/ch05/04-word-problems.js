import { lesson, num, expr, mc, N, E, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, twoNames } from '../../../../src/content/dsl.js';
import { exprEquiv } from '../../../../src/engine/expr.js';

const m = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
const val = (v) => { const [n, d] = String(v).split('/'); return d ? Number(n) / Number(d) : Number(n); };
const same = (a, v) => { try { return exprEquiv(String(a), String(v)); } catch { return false; } };
const NN = (q, a, o = {}) => N(q, a, { ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });
const EE = (q, a, o = {}) => E(q, a, { ...o, w: (o.w || []).filter((x) => !same(a, x[0])) });
void val;

export default lesson({
  id: 'pre-5-4-word-problems',
  title: 'Word problems',
  blurb: 'Turn a story into an equation: name the unknown, build expressions, solve, and check against the story.',
  concepts: ['translating-words', 'equations', 'consecutive-integers', 'modeling'],

  tryFirst: [
    num('t1', 'Mia has 5 more stickers than twice the number Jo has. Mia has 21 stickers. How many does Jo have?', 8, {
      h: ['Undo the story: Mia\'s 21 is "5 more than twice Jo\'s".', 'Take away the 5, then halve.'],
      s: '21 − 5 = 16 is twice Jo\'s number, so Jo has 8. Check: 2 × 8 + 5 = 21.',
      w: [['10', 'Do not halve first: Mia\'s 21 includes the extra 5. Subtract 5, then halve.'], ['16', 'That is twice Jo\'s stickers. Halve it.']],
    }),
    num('t2', 'Three consecutive whole numbers add up to 51. What is the smallest of them?', 16, {
      h: ['Consecutive means they go up by 1: n, n + 1, n + 2.', 'The middle one is the average.'],
      s: 'The middle number is 51 ÷ 3 = 17, so the numbers are 16, 17, 18. The smallest is 16.',
      w: [['17', 'That is the middle number. Subtract 1 to get the smallest.'], ['18', 'That is the largest number. The question asks for the smallest.']],
    }),
  ],

  learn: [
    p('A word problem is an equation wearing a costume. The skill is the <b>translation</b>: pick a letter for the unknown, write the story in math pieces, and find which two pieces are equal. Then solve and, crucially, check the answer against the <i>story</i>, not just the algebra.'),
    tbl(['Words', 'Math'], [['5 more than n', 'n + 5'], ['5 less than n', 'n − 5'], ['twice n, decreased by 3', '2n − 3'], ['3 times the sum of n and 4', '3(n + 4)'], ['n is split equally among 6', 'n ÷ 6']], 'A small phrasebook'),
    warn('<b>"Less than" flips the order.</b> "5 less than n" is n − 5, not 5 − n. If n = 12, five less than twelve is 7. "5 less than n" starts with n and takes 5 away.'),
    rule('<b>Four steps.</b> (1) Say what the letter means, with units: "Let x = the number of child tickets". (2) Write every other quantity using x. (3) Find the sentence that says two things are equal and write the equation. (4) Solve, then check in the original story.'),
    ex('Consecutive integers', ['Four consecutive integers add up to 90. Find them.', 'Let n be the smallest. They are n, n + 1, n + 2, n + 3.', 'Sum: 4n + 6 = 90, so 4n = 84 and n = 21.', 'The integers are 21, 22, 23, 24. Check: 21 + 22 + 23 + 24 = 90.']),
    ex('Two kinds of tickets', ['12 tickets are sold. Adult tickets cost $8, child tickets cost $5, and the total is $78. How many child tickets?', 'Let c be the child tickets. Adults are 12 − c.', 'Money: 5c + 8(12 − c) = 78, so 5c + 96 − 8c = 78.', '96 − 3c = 78, so 3c = 18 and c = 6. Check: 6 children ($30) and 6 adults ($48) make $78.']),
    rule('<b>One unknown, many descriptions.</b> If the second quantity is described through the first ("the adults are 12 minus the children"), use only one letter. Two letters can work too, but one letter turns the problem into an equation you already know how to solve.'),
    mcq('Priya says "4 less than 3 times n" is 4 − 3n. What is the error?', ['None; that is how the words read.', 'The words say start with 3n and take away 4, so the expression is 3n − 4. Test n = 5: 3 times 5 is 15 and 4 less is 11, but 4 − 15 is −11.', 'It should be 3(n − 4).'], 1, '"Less than" tells you what to subtract, and the thing it is subtracted from comes first in the math.', 'Spot the mistake'),
  ],

  practice: [
    expr('p1', 'Write an expression for "6 less than 4 times n".', '4n-6', {
      h: ['Start with 4 times n. Then take away 6.'],
      s: '4 times n is 4n; 6 less than that is 4n − 6.',
      w: [['6-4n', 'You reversed it. "6 less than" something means subtract 6 from that something.'], ['4(n-6)', 'The 6 is subtracted after multiplying, not before.']],
    }),
    num('p2', 'Three times a number, decreased by 7, is 41. What is the number?', 16, {
      h: ['Write 3n − 7 = 41.'],
      s: '3n = 48, so n = 16. Check: 3 × 16 − 7 = 41.',
      w: [['34/3', '"Decreased by 7" means you subtracted 7, so undo it by adding 7.'], ['48', 'That is 3n. Divide by 3 to find n.']],
    }),
    num('p3', 'Four consecutive integers add to 90. What is the largest of them?', 24, {
      h: ['Let the smallest be n: n + (n + 1) + (n + 2) + (n + 3) = 90.'],
      s: '4n + 6 = 90, so n = 21. The numbers are 21, 22, 23, 24 and the largest is 24.',
      w: [['21', 'That is the smallest. The largest is 3 more.'], ['22', 'Count again: the largest of four consecutive integers is the smallest plus 3.']],
    }),
    num('p4', 'Priya is 4 times as old as her sister. In 6 years Priya will be twice as old as her sister will be then. How old is Priya now?', 12, {
      h: ['Let the sister be x now. Priya is 4x now.', 'In 6 years: 4x + 6 = 2(x + 6).'],
      s: '4x + 6 = 2x + 12 so 2x = 6 and x = 3. Priya is 4 × 3 = 12. In 6 years: 18 and 9. Yes, twice.',
      w: [['3', 'That is the sister\'s age. Priya is 4 times that.'], ['6', 'Re-read: Priya is 4 times as old now.']],
    }),
    num('p5', 'A movie theatre sells 20 tickets for $190. Adult tickets cost $12 and child tickets cost $7. How many adult tickets were sold?', 10, {
      h: ['Let a be adults. Children are 20 − a.', '12a + 7(20 − a) = 190.'],
      s: '12a + 140 − 7a = 190, so 5a = 50 and a = 10. Check: 120 + 70 = 190.',
      w: [['50', 'That is 5a. Divide by 5.'], ['5', 'Check: 5 adults and 15 children cost 60 + 105 = 165, not 190.']],
    }),
    num('p6', 'A 65 cm ribbon is cut into 3 pieces. The second piece is 5 cm longer than the first, and the third is twice as long as the first. How long is the longest piece?', 30, {
      h: ['Call the first piece x. The others are x + 5 and 2x.', 'x + (x + 5) + 2x = 65.'],
      s: '4x + 5 = 65, so x = 15. The pieces are 15, 20 and 30 cm. The longest is 30.',
      w: [['15', 'That is the first (shortest) piece. The longest is twice that.'], ['20', 'That is the middle piece. Which one is twice the first?']],
    }),
    num('p7', 'Two cyclists start 90 km apart and ride towards each other, one at 12 km/h and the other at 18 km/h. After how many hours do they meet?', 3, {
      h: ['Every hour the gap shrinks by 12 + 18 km.'],
      s: 'Together they close 30 km each hour, so 90 ÷ 30 = 3 hours.',
      w: [['5', 'That is 90 ÷ 18, using only one rider. Both are closing the gap.'], ['15/2', 'That is 90 ÷ 12, using only one rider. Both are closing the gap.']],
    }),
  ],

  challenge: [
    chain('School trip', 'A bus company charges a $120 booking fee plus $9 for each student on the trip.', [
      expr('c1a', 'Write the total cost for n students.', '9n+120', { h: ['Fee once, $9 each.'], s: '9n + 120.' }),
      num('c1b', 'The school paid $354. How many students went?', 26, { h: ['9n + 120 = 354.'], s: '9n = 234 and n = 26.' }),
      num('c1c', 'A second company charges $200 booking plus $5 per student. For how many students do the two companies cost the same?', 20, { h: ['9n + 120 = 5n + 200.'], s: '4n = 80, so n = 20.' }),
    ], 'The idea: each company gives an expression. Setting the expressions equal finds where the prices cross.'),
    chain('Coin jar', 'A jar holds 22 coins, all nickels (5 cents) or dimes (10 cents). Their total value is 155 cents.', [
      expr('c2a', 'If there are n nickels, write the total value in cents in simplest form.', '220-5n', { simplify: true, h: ['Dimes are 22 − n.'], s: '5n + 10(22 − n) = 5n + 220 − 10n = 220 − 5n.' }),
      num('c2b', 'How many nickels are there?', 13, { h: ['220 − 5n = 155.'], s: '5n = 65, so n = 13.' }),
      num('c2c', 'How many more nickels than dimes?', 4, { h: ['Dimes: 22 − 13.'], s: 'There are 9 dimes and 13 nickels: 4 more nickels.' }),
    ], 'The idea: when the two kinds add to a known total, call one n and the other (total − n).'),
    mc('c3', 'Find the error. Leo is 3 times as old as Zoe, and their ages add to 48. Ben writes: 3x + x = 48, so x = 12, and says "Leo is 12". What is wrong?', ['He answered with x, but x was Zoe\'s age. Leo is 3 × 12 = 36.', 'The equation should be 3x = 48.', 'Nothing is wrong.', 'The ages cannot add to 48.'], 0, {
      s: 'x = 12 is Zoe. Leo is 36, and 12 + 36 = 48.',
      w: [[1, 'That would make Leo alone 48. The 48 is the total of both.'], [2, 'Check: 12 and 12 do not satisfy "3 times as old".']],
    }),
  ],

  quiz: [
    tpl('consec', (r) => {
      const k = r.int(3, 6), n = r.int(5, 60), s = k * n + (k * (k - 1)) / 2;
      const askLast = r.bool();
      return NN(k + ' consecutive integers add up to ' + s + '. What is the ' + (askLast ? 'largest' : 'smallest') + '?', askLast ? n + k - 1 : n, { s: 'With smallest n the sum is ' + k + 'n + ' + (k * (k - 1)) / 2 + ' = ' + s + ', so n = ' + n + '. The integers run from ' + n + ' to ' + (n + k - 1) + '.', w: [[askLast ? n : n + k - 1, 'You found the other end. Re-read which one is asked.']] });
    }),
    tpl('tickets', (r) => {
      const a = r.int(8, 20), b = r.int(3, a - 2), nA = r.int(3, 15), nC = r.int(3, 15), tot = nA + nC, money = a * nA + b * nC;
      const askA = r.bool();
      const [n1, n2] = twoNames(r);
      return NN(n1 + ' and ' + n2 + ' sell ' + tot + ' tickets, some at $' + a + ' and the rest at $' + b + ', for $' + money + ' in all. How many $' + (askA ? a : b) + ' tickets were sold?', askA ? nA : nC, { s: 'Let c be the number of $' + b + ' tickets: ' + b + 'c + ' + a + '(' + tot + ' − c) = ' + money + '. This gives ' + (a - b) + 'c = ' + (a * tot - money) + ', so c = ' + nC + ' and the $' + a + ' tickets number ' + nA + '.', w: [[askA ? nC : nA, 'That is the other kind of ticket.']] });
    }),
    tpl('translate', (r) => {
      const a = r.int(2, 9), b = r.int(2, 15), k = r.int(0, 3);
      const forms = [
        [b + ' less than ' + a + ' times n', a + 'n-' + b, b + '-' + a + 'n', 'less than means subtract ' + b + ' from ' + a + 'n.'],
        [b + ' more than ' + a + ' times n', a + 'n+' + b, a + '(n+' + b + ')', 'the ' + b + ' is added after multiplying.'],
        [a + ' times the sum of n and ' + b, a + '(n+' + b + ')', a + 'n+' + b, 'the multiplier applies to the whole sum.'],
        [a + ' times the difference of n and ' + b + ' (n first)', a + '(n-' + b + ')', a + 'n-' + b, 'the multiplier applies to the whole difference.'],
      ][k];
      return EE('Write an expression: ' + forms[0] + '.', forms[1], { s: 'In symbols: ' + forms[1].replace('-', ' − ').replace('+', ' + ') + ' because ' + forms[3], w: [[forms[2], 'Check the order and which part is multiplied: ' + forms[3]]] });
    }),
    tpl('ages', (r) => {
      const x = r.int(4, 20), d = r.int(20, 32), S = 2 * x + d;
      const [a, b] = twoNames(r);
      return NN(a + ' is ' + d + ' years older than ' + b + '. Their ages add up to ' + S + '. How old is ' + a + '?', x + d, { s: 'Let ' + b + ' be x. Then 2x + ' + d + ' = ' + S + ', so x = ' + x + ' and ' + a + ' is ' + (x + d) + '.', w: [[x, 'That is ' + b + '\'s age. ' + a + ' is ' + d + ' years older.']] });
    }),
    tpl('meet', (r) => {
      const v1 = r.int(4, 15), v2 = r.int(4, 15), t = r.int(2, 9), d = (v1 + v2) * t;
      return NN('Two trains leave stations ' + d + ' km apart at the same time and travel towards each other at ' + v1 + ' km/h and ' + v2 + ' km/h. After how many hours do they meet?', t, { s: 'Together they cover ' + (v1 + v2) + ' km each hour. ' + d + ' ÷ ' + (v1 + v2) + ' = ' + t + ' hours.', w: [[d + '/' + v1, 'That uses only one train. Their speeds add when they travel towards each other.']] });
    }),
    tpl('pieces', (r) => {
      const x = r.int(5, 30), a = r.int(2, 9), k = r.int(2, 4), tot = x + (x + a) + k * x;
      const which = r.int(0, 2);
      const ans = [x, x + a, k * x][which], nm = ['shortest', 'middle-sized', 'longest'][which];
      return NN('A rope of ' + tot + ' cm is cut into three pieces. The second piece is ' + a + ' cm longer than the first, and the third is ' + k + ' times as long as the first. How long is the ' + (which === 0 ? 'first' : which === 1 ? 'second' : 'third') + ' piece?', ans, { s: 'Let the first be x: x + (x + ' + a + ') + ' + k + 'x = ' + tot + '. So ' + (k + 2) + 'x + ' + a + ' = ' + tot + ' and x = ' + x + '. The pieces are ' + x + ', ' + (x + a) + ' and ' + k * x + '.', w: [[x, 'x is only the first piece. Check which piece is asked.']] });
    }),
    tpl('rate', (r) => {
      const f1 = r.int(10, 50), r1 = r.int(3, 12), n = r.int(3, 25), cost = f1 + r1 * n;
      const who = name(r);
      return NN(who + ' hired a guide who charges a $' + f1 + ' fee plus $' + r1 + ' per hour. The bill was $' + cost + '. How many hours did the guide work?', n, { s: r1 + 'h + ' + f1 + ' = ' + cost + ', so ' + r1 + 'h = ' + (cost - f1) + ' and h = ' + n + '.', w: [[cost - f1, 'That is the total hourly charge. Divide it by the hourly rate to get the hours.']] });
    }),
  ],
});
