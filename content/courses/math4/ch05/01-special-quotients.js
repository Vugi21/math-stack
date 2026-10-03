import { lesson, num, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const c = (n) => n.toLocaleString('en-US');
// keep only wrong answers that are whole numbers, different from the right answer and from each other
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([v]) => { if (!Number.isInteger(v) || v < 0 || seen.has(String(v))) return false; seen.add(String(v)); return true; }); };

export default lesson({
  id: 'm4-5-1-special-quotients',
  title: 'Special quotients',
  blurb: 'Dividing by 1, dividing 0, dividing a number by itself, and why no one may divide by 0.',
  concepts: ['division', 'fact-families', 'zero'],

  tryFirst: [
    num('t1', 'A shelf holds 0 books. Ava shares the books equally among 5 friends. How many books does each friend get?', 0, {
      h: ['Nothing is there to share. What does each person get?'],
      s: 'There are no books, so every friend gets 0. This is 0 ÷ 5 = 0.',
      w: [['5', 'There are 5 friends, but that is not how many books each gets. There are no books at all.']],
    }),
    num('t2', 'Dev thinks of a number that is not 0. He divides it by itself. He divides the result by 1. Then he adds 8. What number does he end with?', 9, {
      h: ['Try it with a real number first, like 20.', '20 ÷ 20 = 1. Then keep going.'],
      s: 'Any number except 0 divided by itself is 1. Then 1 ÷ 1 = 1. Then 1 + 8 = 9.',
      w: [['8', 'You forgot the 1. A number divided by itself is 1, and 1 + 8 = 9.']],
    }),
  ],

  learn: [
    p('Division has two meanings. Take 12 ÷ 3 = 4.'),
    p('<b>Sharing.</b> Share 12 things equally among 3 people. Each person gets 4. <b>Grouping.</b> Put 12 things into groups of 3. You make 4 groups. Both ways give the same answer.'),
    widget('arrayModel', { r: 3, c1: 4, c2: 2 }),
    p('The dots above make 3 equal rows. This shows 18 ÷ 3 = 6, because each row has 4 + 2 = 6 dots. It also shows 18 ÷ 6 = 3, because the dots make 6 columns of 3.'),
    p('A <b>fact family</b> is a group of facts that use the same three numbers. 3 × 6 = 18 and 6 × 3 = 18. Also 18 ÷ 3 = 6 and 18 ÷ 6 = 3. Every division fact comes from a multiplication fact.'),
    rule('<b>Three special quotients.</b> Dividing by 1 changes nothing: 9 ÷ 1 = 9. A number (not 0) divided by itself is 1: 9 ÷ 9 = 1. Dividing 0 by a number (not 0) gives 0: 0 ÷ 9 = 0.'),
    ex('Why 0 ÷ 9 = 0', ['Use the fact family idea. 0 ÷ 9 = ? means ? × 9 = 0.', 'Only 0 works: 0 × 9 = 0.', 'Share 0 things among 9 people. Everyone gets 0. Same answer.']),
    rule('<b>You cannot divide by 0.</b> Try 12 ÷ 0 = ?. That would mean ? × 0 = 12. But any number times 0 is 0, never 12. So no number works. We say 12 ÷ 0 has <i>no answer</i>: it is not allowed.'),
    p('What about 0 ÷ 0? That would mean ? × 0 = 0. Now every number works: 1 × 0 = 0 and 7 × 0 = 0. There is no single answer. So 0 ÷ 0 has no answer too.'),
    tbl(['Division', 'Answer', 'Reason'], [['25 ÷ 1', '25', '25 × 1 = 25'], ['25 ÷ 25', '1', '1 × 25 = 25'], ['0 ÷ 25', '0', '0 × 25 = 0'], ['25 ÷ 0', 'no answer', 'no ? makes ? × 0 = 25']], 'Four quotients with 25 and 0'),
    warn('<b>Watch out.</b> 0 ÷ 5 and 5 ÷ 0 look alike, but they are very different. 0 ÷ 5 = 0 is fine. 5 ÷ 0 cannot be done.'),
    mcq('Leo says: "8 ÷ 0 = 0, because there is nothing to share it with." What is wrong?', ['Nothing, he is right.', 'If 8 ÷ 0 = 0, then 0 × 0 would have to be 8. But 0 × 0 = 0. No number works, so 8 ÷ 0 cannot be done.', '8 ÷ 0 = 8, because dividing by 0 changes nothing.'], 1, 'Check any division with multiplication. If 8 ÷ 0 were 0, then 0 × 0 would be 8. It is not. The same check fails for every possible answer.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 4,000 ÷ 1 + 0 ÷ 4,000 + 4,000 ÷ 4,000.', 4001, {
      h: ['Do each division on its own. Then add.'],
      s: '4,000 ÷ 1 = 4,000. 0 ÷ 4,000 = 0. 4,000 ÷ 4,000 = 1. The sum is 4,001.',
      w: [['4000', 'You missed 4,000 ÷ 4,000. A number divided by itself is 1, so add that 1.'], ['8000', 'Only 4,000 ÷ 1 gives 4,000. The other two quotients are 0 and 1.']],
    }),
    mc('p2', 'Which of these CANNOT be done?', ['0 ÷ 9', '9 ÷ 9', '9 ÷ 0', '9 ÷ 1'], 2, {
      h: ['Test each one with multiplication. For 9 ÷ 0 = ?, we would need ? × 0 = 9.'],
      s: '9 ÷ 0 would need a number that times 0 gives 9. There is none. The other three are 0, 1 and 9.',
      w: [[0, '0 ÷ 9 = 0 is fine, because 0 × 9 = 0. The problem is when 0 is the one you divide BY.']],
    }),
    num('p3', 'Find the missing number: 36 ÷ ? = 36.', 1, {
      h: ['Which divisor leaves a number unchanged?'],
      s: 'Dividing by 1 changes nothing. 36 ÷ 1 = 36.',
      w: [['36', '36 ÷ 36 is 1, not 36. Which number can you divide by to keep 36?'], ['0', 'We cannot divide by 0 at all.']],
    }),
    num('p4', 'There are 54 eggs. They are packed 6 to a box. Then 3 full boxes are sold. How many full boxes are left?', 6, {
      h: ['First find how many boxes the eggs fill.'],
      s: '54 ÷ 6 = 9 boxes. 9 − 3 = 6 boxes are left.',
      w: [['9', 'That is the number of boxes before any are sold. Take away the 3 sold.'], ['51', 'You subtracted 3 eggs. Three whole boxes were sold, and a box holds 6 eggs.']],
    }),
    num('p5', '24 stickers are shared equally among 4 children. Each child gives 2 stickers away. All the stickers that remain are put into bags of 4. How many bags is that?', 4, {
      h: ['Each child starts with 24 ÷ 4 stickers.', 'Find the number that remain in total, then group them.'],
      s: 'Each child gets 6. After giving 2 away, each has 4. That is 4 × 4 = 16 stickers in all. 16 ÷ 4 = 4 bags.',
      w: [['6', 'That is how many each child got at first. They gave 2 away, and then the stickers were grouped.'], ['5', 'You took away only 4 stickers in all. Four children each give away 2, which is 8 stickers.']],
    }),
    num('p6', 'Two numbers a and b are both more than 0. a ÷ b = 1, and a + b = 18. What is a?', 9, {
      h: ['If a ÷ b = 1, what does that tell you about a and b?', 'They must be equal.'],
      s: 'A number divided by another gives 1 only when they are the same. So a = b, and a + b = 18 means a = 9.',
      w: [['18', '18 is the sum a + b. Since a and b are equal, each is half of 18.'], ['1', '1 is the quotient, not the number a.']],
    }),
    num('p7', 'A number n is divided by 1. The result is the same as 144 ÷ n. What is n? (Try some numbers.)', 12, {
      h: ['n ÷ 1 is just n. So we need n to equal 144 ÷ n.', 'Which number times itself is 144?'],
      s: 'n ÷ 1 = n, so n = 144 ÷ n. That means n × n = 144. Since 12 × 12 = 144, n = 12.',
      w: [['144', 'If n = 144, then 144 ÷ n = 1, which is not 144.'], ['1', 'If n = 1, then 144 ÷ 1 = 144, which is not 1.']],
    }),
  ],

  challenge: [
    chain('The coin trays', 'Mia has 48 coins. She puts them in trays that hold 8 coins each.', [
      num('c1a', 'How many trays does she fill?', 6, { h: ['48 ÷ 8.'], s: '48 ÷ 8 = 6 trays.' }),
      num('c1b', 'She gives 2 trays away. She puts all the coins that remain into trays that hold only 1 coin. How many trays is that?', 32, { h: ['How many coins are left?', 'Dividing by 1 changes nothing.'], s: '4 trays of 8 are left, which is 32 coins. 32 ÷ 1 = 32 trays.' }),
      num('c1c', 'Suppose one huge tray could hold all 32 coins. How many trays would she need?', 1, { h: ['Think: 32 ÷ 32.'], s: '32 ÷ 32 = 1 tray.' }),
    ], 'The idea: the bigger each group is, the fewer groups you make. Groups of 1 make as many groups as there are things. One group that holds everything makes just 1.'),
    chain('Mystery numbers', 'Let x be a number that is not 0. Let y = x ÷ x and z = 0 ÷ x.', [
      num('c2a', 'What is y?', 1, { h: ['A number divided by itself.'], s: 'x ÷ x = 1, so y = 1.' }),
      num('c2b', 'What is y + z?', 1, { h: ['What is 0 ÷ x?'], s: 'z = 0 ÷ x = 0, so y + z = 1 + 0 = 1.' }),
      num('c2c', 'A number w is divided by y. The answer is 7 × (z + 5). What is w?', 35, { h: ['y = 1, z = 0. So w ÷ 1 = 7 × 5.'], s: 'z + 5 = 5, and 7 × 5 = 35. Since w ÷ 1 = 35, w = 35.' }),
    ], 'The idea: you may not know x, but you can still know x ÷ x. It is 1 for every x except 0.'),
    mc('c3', 'Find the error. Ben says: "5 × 0 = 0 is a multiplication fact, so its fact family has 5 ÷ 0 = 0 in it."', ['He is right. Every multiplication fact makes two division facts.', 'The fact family of 5 × 0 = 0 gives 0 ÷ 5 = 0. It does not give 5 ÷ 0, because no number times 0 makes 5.', 'The fact family has no division facts at all.', 'He should have written 5 ÷ 0 = 5.'], 1, {
      s: 'Fact families with 0 are special. From 5 × 0 = 0 we may write 0 ÷ 5 = 0. The other division fact, 0 ÷ 0 = 5, is not true, because 0 ÷ 0 has no single answer. So only one division fact is allowed.',
      w: [[0, 'Dividing by 0 is never allowed. Check: what number times 0 gives 5?'], [3, '5 ÷ 0 cannot equal anything, not even 5.']],
    }),
  ],

  quiz: [
    tpl('mixed', (r) => {
      const n = r.int(12, 9999), m = r.int(2, 999), k = r.int(2, 500);
      const a = n + 1;
      return N('Find ' + c(n) + ' ÷ 1 + 0 ÷ ' + c(m) + ' + ' + c(k) + ' ÷ ' + c(k) + '.', a, { s: c(n) + ' + 0 + 1 = ' + c(a) + '.', w: wr(a, [[n, 'Do not forget ' + c(k) + ' ÷ ' + c(k) + '. It is 1.'], [n + k, 'A number divided by itself is 1, not the number itself.']]) });
    }),
    tpl('blank', (r) => {
      const n = r.int(2, 999), f = r.int(0, 2);
      if (f === 0) return N(c(n) + ' ÷ ? = ' + c(n) + '. Find the missing number.', 1, { s: 'Dividing by 1 changes nothing.', w: wr(1, [[n, c(n) + ' ÷ ' + c(n) + ' = 1, not ' + c(n) + '.']]) });
      if (f === 1) return N(c(n) + ' ÷ ? = 1. Find the missing number.', n, { s: 'A number divided by itself is 1, so the missing number is ' + c(n) + '.', w: wr(n, [[1, c(n) + ' ÷ 1 = ' + c(n) + ', not 1.']]) });
      return N('? ÷ ' + c(n) + ' = 0. Find the missing number.', 0, { s: '0 divided by any number (except 0) is 0.', w: wr(0, [[1, '1 ÷ ' + c(n) + ' is not 0. Only 0 ÷ ' + c(n) + ' is 0.'], [n, c(n) + ' ÷ ' + c(n) + ' = 1.']]) });
    }),
    tpl('boxes', (r) => {
      const per = r.int(3, 9), boxes = r.int(6, 15), sold = r.int(2, 5), total = per * boxes;
      return N(c(total) + ' eggs are packed ' + per + ' to a box. Then ' + sold + ' full boxes are sold. How many full boxes are left?', boxes - sold, { s: c(total) + ' ÷ ' + per + ' = ' + boxes + ' boxes. ' + boxes + ' − ' + sold + ' = ' + (boxes - sold) + '.', w: wr(boxes - sold, [[boxes, 'Take away the boxes that were sold.'], [total - sold, 'The ' + sold + ' sold boxes hold ' + per + ' eggs each, and we are counting boxes.']]) });
    }),
    tpl('equal', (r) => {
      const a = r.int(2, 60);
      return N('Two numbers a and b are both more than 0. a ÷ b = 1 and a + b = ' + 2 * a + '. What is a?', a, { s: 'a ÷ b = 1 means a = b. So each is half of ' + 2 * a + ', which is ' + a + '.', w: wr(a, [[2 * a, 'That is a + b. Since a = b, a is half of it.'], [1, 'That is the quotient, not a.']]) });
    }),
    tpl('self', (r) => {
      const n = r.int(3, 60);
      return N('n ÷ 1 gives the same number as ' + c(n * n) + ' ÷ n. What is n?', n, { s: 'n ÷ 1 = n, so n × n = ' + c(n * n) + '. That means n = ' + n + '.', w: wr(n, [[n * n, 'If n = ' + c(n * n) + ', then ' + c(n * n) + ' ÷ n is just 1.'], [1, 'If n = 1, then ' + c(n * n) + ' ÷ n would be ' + c(n * n) + ', not 1.']]) });
    }),
    tpl('family', (r) => {
      const [x, y] = r.distinct(2, 3, 12), z = x * y;
      return choice(r, x + ' × ' + y + ' = ' + z + '. Which division fact is in the same fact family?', z + ' ÷ ' + x + ' = ' + y, [[x + ' ÷ ' + z + ' = ' + y, 'In a fact family the product is divided. The biggest number comes first.'], [z + ' ÷ ' + y + ' = ' + y, 'Check: ' + y + ' × ' + y + ' is not ' + z + '.'], [y + ' ÷ ' + z + ' = ' + x, 'The product ' + z + ' is the number you divide.']], { s: 'The product ' + z + ' is divided by one of the factors. ' + z + ' ÷ ' + x + ' = ' + y + '.' });
    }),
    tpl('cannot', (r) => {
      const n = r.int(2, 99), k = r.int(2, 99);
      const right = n + ' ÷ 0';
      return choice(r, 'Which of these cannot be done?', right, [[k + ' ÷ ' + k, k + ' ÷ ' + k + ' = 1.'], ['0 ÷ ' + n, '0 ÷ ' + n + ' = 0, because 0 × ' + n + ' = 0.'], [n + 1 + k + ' ÷ 1', 'Dividing by 1 is always fine.']], { s: 'Dividing by 0 is never possible. No number times 0 gives ' + n + '.' });
    }),
  ],
});
