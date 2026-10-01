import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => String(x[0]) !== String(ans));

export default lesson({
  id: 'pre-15-4-work-backwards',
  title: 'Work backwards',
  blurb: 'When you know how a story ends, start at the end and undo each step in reverse order. Also how to win games from the last move.',
  concepts: ['working-backwards', 'inverse-operations', 'problem-solving'],

  tryFirst: [
    num('t1', 'I think of a number. I multiply it by 3, subtract 7, and divide by 2. The result is 10. What was my number?', 9, {
      h: ['Start from 10 and undo the steps in the opposite order.', 'Undo "divide by 2" first.'],
      s: 'Undo divide by 2: 10 × 2 = 20. Undo subtract 7: 20 + 7 = 27. Undo multiply by 3: 27 ÷ 3 = 9. Check forwards: 9 × 3 = 27, 27 − 7 = 20, 20 ÷ 2 = 10.',
      w: [['11.5', 'You ran the same steps forward on 10 (× 3, − 7, ÷ 2). To go back, undo the steps from last to first, using the opposite operation each time.'], ['5', 'That divides 10 by 2 only. The steps must all be undone, last to first.']],
    }),
    num('t2', 'A patch of water lilies doubles in area every day. On day 20 it covers the entire pond. On which day did it cover exactly one quarter of the pond?', 18, {
      h: ['If today it is the whole pond, what was it one day earlier?', 'Go back one more day.'],
      s: 'Doubling each day means one day earlier it was half as big. Day 19: half the pond. Day 18: one quarter.',
      w: [['5', 'That divides 20 by 4. But the patch halves each day when you go backwards, so one quarter is two days before the end.'], ['10', 'On day 10 the patch is far smaller. Count backwards from 20 by halving.']],
    }),
  ],

  learn: [
    p('Sometimes you know the <i>ending</i> of a story and need to find the <i>beginning</i>. If you try to guess the start and test forward, you waste time. The better idea: start at the end and walk the story <b>backwards</b>.'),
    rule('<b>Working backwards.</b> (1) List the steps in order. (2) Start from the final result. (3) Undo the <b>last</b> step first, then the one before it, and so on, using the opposite (inverse) operation each time. (4) Check by running the story forwards.'),
    tbl(['Forward step', 'Undo it by'], [['add 5', 'subtract 5'], ['subtract 5', 'add 5'], ['multiply by 4', 'divide by 4'], ['divide by 4', 'multiply by 4'], ['take away half', 'double what is left'], ['spend {1/3} of it', 'what remains is {2/3}: multiply by {3/2}']], 'Inverse operations'),
    ex('A number machine', ['A machine does: add 8, multiply by 5, subtract 12. Out comes 53. What went in?', 'Undo subtract 12: 53 + 12 = 65.', 'Undo multiply by 5: 65 ÷ 5 = 13.', 'Undo add 8: 13 − 8 = 5.', 'Check: 5 + 8 = 13, 13 × 5 = 65, 65 − 12 = 53. ✓']),
    ex('Half plus one', ['A bakery sells half its loaves plus 1 each morning. After three mornings it has 0 left. How many at the start?', 'End: 0. On day 3, after selling, 0 were left. Before day 3: if half plus 1 is everything, the stock was 2.', 'Before day 2: it sold half plus 1 and had 2 left, so half minus 1 is 2, so half is 3, so the stock was 6.', 'Before day 1: half minus 1 is 6, so half is 7, so the stock was 14.']),
    p('<b>Games.</b> Working backwards also wins games. Suppose two players take turns removing 1, 2 or 3 stones from a pile, and whoever takes the last stone wins. Work back from the end: if it is your turn with 1, 2 or 3 stones, you win. With 4 stones, whatever you take (1, 2, 3) leaves 3, 2 or 1 for your opponent, who wins. So 4 is a <i>losing</i> position. With 5, 6 or 7 you take 1, 2 or 3 to leave 4. With 8, whatever you take leaves 5, 6, 7: losing again. <b>The losing piles are 4, 8, 12, ...: the multiples of 4.</b>'),
    ex('Winning the game', ['A pile has 30 stones and you go first. Aim to leave a multiple of 4.', '30 ÷ 4 leaves remainder 2, so take 2 and leave 28.', 'Whatever your opponent takes (1, 2, or 3), you take enough to make the pair add to 4, and leave 24, 20, ..., 4, 0.']),
    warn('<b>Undo in reverse order, and watch for squares.</b> If the story says "square it, then add 5", you must subtract 5 <i>first</i>, then take a square root. Also remember that a square root might give a positive or negative answer: check the problem for hints like "positive number".'),
    mcq('Ben: "I think of a number, multiply by 3 and add 4. I get 25. So I do 25 × 3 = 75, then 75 − 4 = 71." What is wrong?', ['Nothing, 71 is right.', 'He multiplied by 3 when he should have undone the multiplication by dividing by 3, and he should undo "add 4" first: (25 − 4) ÷ 3 = 7.', 'He should have added 4 and then divided by 3.'], 1, 'To undo "multiply by 3, then add 4": first subtract 4 (21), then divide by 3 (7). Check: 7 × 3 + 4 = 25.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'I think of a number, add 8, multiply by 5, then subtract 12. The result is 53. What was my number?', 5, {
      h: ['Undo the last step first: add 12.'],
      s: '53 + 12 = 65, 65 ÷ 5 = 13, 13 − 8 = 5. Check: (5 + 8) × 5 − 12 = 53.',
      w: [['13', 'That is the number after the first step. You still need to undo "add 8".'], ['0.2', 'You subtracted 12 instead of adding it. Undoing "subtract 12" means adding 12.']],
    }),
    num('p2', 'Leo spends half of his savings at the fair, then gives his sister 6 dollars, then spends one third of what remains on snacks. He has 12 dollars left. How many dollars did he start with?', 48, {
      h: ['After the snacks he has 12, which is two thirds of what he had before. Work out what he had before the snacks.', 'Then add back the 6, and finally double.'],
      s: 'After spending {1/3}, he has {2/3} left = 12, so before the snacks he had 18. Before giving his sister 6 he had 24. Before spending half at the fair he had 48.',
      w: [['24', '24 is what he had before the sister got 6 dollars. Undo the first step too: the half he spent at the fair.'], ['36', 'If he had spent a third of 36 on snacks he would have 24 left, not 12. Undoing spending one third means multiplying what is left by {3/2}.']],
    }),
    num('p3', 'A colony of bacteria triples every hour. After 6 hours there are 2187 bacteria. How many were there at the start?', 3, {
      h: ['Divide by 3 for each hour, going back.', 'Or: how many threes multiplied together give 2187 ÷ the start?'],
      s: 'Going back 6 hours: 2187 ÷ 3 = 729, ÷ 3 = 243, ÷ 3 = 81, ÷ 3 = 27, ÷ 3 = 9, ÷ 3 = 3. The start was 3.',
      w: [['729', '729 is the count 1 hour before the end. Go back all 6 hours.'], ['364.5', 'You divided by the number of hours (6). Each hour multiplies by 3, so undo it by dividing by 3, once for each of the 6 hours.']],
    }),
    num('p4', 'Two players take turns removing 1, 2 or 3 stones from a pile of 30. Whoever removes the last stone wins. You go first. How many stones should you take to guarantee a win?', 2, {
      h: ['Work back from the end: which pile sizes are losing for the player to move?', 'You want to leave your opponent a losing pile. Multiples of 4 are losing.'],
      s: 'Losing piles (for the player about to move) are 4, 8, 12, ... Leave 28 by taking 2. Then reply to each opponent move so that the pile drops by 4 per round.',
      w: [['1', 'Taking 1 leaves 29, which is not a multiple of 4.'], ['3', 'Taking 3 leaves 27, which is not a multiple of 4.']],
    }),
    num('p5', 'A shopkeeper sells half of his apples plus half an apple to the first customer, then half of what remains plus half an apple to the second customer, then half of what remains plus half an apple to the third customer. No apple is cut and he has none left. How many apples did he have at the start?', 7, {
      h: ['After the third customer: 0. What did he have before the third customer, if half plus half an apple was everything?', 'Double and add: if x is what is left after a customer, the stock before was 2(x + {1/2}) = 2x + 1.'],
      s: 'Before customer 3: he had 1 (half of 1 plus half is 1). Before customer 2: 2 × 1 + 1 = 3. Before customer 1: 2 × 3 + 1 = 7. Check: 7 → sell 4 (leaves 3) → sell 2 (leaves 1) → sell 1 (leaves 0).',
      w: [['6', 'Check forward: 6 apples → sells 3.5, which is not a whole number.'], ['8', 'Check forward: half of 8 plus half is 4.5, not a whole number.']],
    }),
    num('p6', 'I think of a positive number, square it, add 5, and double the result. I get 108. What was my number?', 7, {
      h: ['Undo the doubling, then the add 5, then the square.'],
      s: '108 ÷ 2 = 54. 54 − 5 = 49. The positive number whose square is 49 is 7. Check: 7² = 49, 49 + 5 = 54, 54 × 2 = 108.',
      w: [['54', 'You undid only the doubling. Continue: subtract 5, then take the square root.'], ['49', '49 is the square, not the number itself. Take the square root.']],
    }),
    num('p7', 'Ana, Ben and Cy play three rounds. In round 1 Ana loses and must give each of the others as much money as each of them already has (doubling theirs). In round 2 Ben loses and does the same for Ana and Cy. In round 3 Cy loses and does the same for Ana and Ben. At the end each of them has 16 dollars. How many dollars did Ana start with?', 26, {
      h: ['The total money never changes: 48 dollars. Start from 16, 16, 16.', 'In round 3, Ana and Ben doubled. What did they have before?'],
      s: 'End: A 16, B 16, C 16. Before round 3 (Cy lost, Ana and Ben doubled): A 8, B 8, C 32. Before round 2 (Ben lost, Ana and Cy doubled): A 4, C 16, B 28. Before round 1 (Ana lost, Ben and Cy doubled): B 14, C 8, A 26. Ana started with 26. (Check the total: 26 + 14 + 8 = 48.)',
      w: [['8', 'You stopped too early. Work back through all three rounds, last round first.'], ['16', '16 is what everyone ends with. Undo the three rounds, starting from the last one.']],
    }),
  ],

  challenge: [
    chain('The stone game', 'Two players take turns removing 1, 2 or 3 stones from a pile. Whoever removes the last stone wins.', [
      num('c1a', 'The pile has 21 stones and you go first. How many stones do you take to guarantee a win?', 1, { h: ['Leave a multiple of 4.'], s: '21 − 1 = 20, a multiple of 4.' }),
      num('c1b', 'You take 1, leaving 20. Your opponent takes 2, leaving 18. How many do you take?', 2, { h: ['Leave a multiple of 4 again.'], s: '18 − 2 = 16.', w: [['1', '18 − 1 = 17 is not a multiple of 4.']] }),
      set('c1c', 'Which pile sizes from 1 to 20 are LOSING for the player about to move (with best play by the opponent)? Give them separated by commas.', '4,8,12,16,20', { h: ['If the pile is 1, 2 or 3 you win at once. What about 4?'], s: 'Any pile that is a multiple of 4: whatever you take, the opponent can restore a multiple of 4. So 4, 8, 12, 16, 20.', w: [['4', 'Four is one of them, but 8, 12, 16 and 20 also lose for the player about to move.']] }),
    ], 'The idea: start from the end of the game. 1, 2, 3 stones are wins; 4 is a loss; then 5, 6, 7 are wins because you can leave 4. The losing positions repeat every 4.'),
    chain('Doubling game', 'Three players each end with 16 dollars after three rounds in which the round\'s loser doubles the money of the other two (Ana loses round 1, Ben round 2, Cy round 3).', [
      num('c2a', 'How many dollars are there in total among the three players?', 48, { h: ['Each ends with 16.'], s: 'The total never changes: 16 × 3 = 48.' }),
      num('c2b', 'Just before round 3, how many dollars did Cy have?', 32, { h: ['In round 3 Ana and Ben doubled to 16 each, so they had 8 each before. The total is 48.'], s: 'Ana 8, Ben 8, so Cy had 48 − 16 = 32.' }),
      num('c2c', 'How many dollars did Ben have at the very start?', 14, { h: ['Before round 2: Ana 4, Cy 16, Ben 28. Now undo round 1, where Ben and Cy doubled.'], s: 'Before round 2, Ben had 28. In round 1 Ben doubled his money, so before round 1 he had 14.', w: [['28', '28 is what Ben had before round 2. In round 1 he also doubled his money, so undo that too.']] }),
    ], 'The idea: the total is constant and the loser of each round is the one who pays. Undo one round at a time, from the last round to the first.'),
    mc('c3', 'Find the error. "I think of a number, square it, then add 5. The result is 41. So the number is (41 − 5) ÷ 2 = 18." What went wrong?', ['The last step is "add 5", so subtract 5 first (36). The opposite of squaring is the square root, not division by 2: the number is 6.', 'Nothing, the answer is 18.', 'He should have added 5 to 41.', 'The number is 41 − 36 = 5.'], 0, {
      s: '41 − 5 = 36, and the number whose square is 36 is 6 (or −6 if negative numbers are allowed). Check: 6² + 5 = 41.',
      w: [[1, 'Check: 18² = 324, far larger than 41.'], [2, 'Adding 5 undoes subtracting 5, but the story added 5, so undo it by subtracting.']],
    }),
  ],

  quiz: [
    tpl('machine', (r) => {
      let x = r.int(2, 30); const start = x, steps = [], k = r.int(3, 4);
      for (let i = 0; i < k; i++) {
        const t = r.pick(['add', 'sub', 'mul', 'div']);
        if (t === 'add') { const a = r.int(2, 15); steps.push(['add ' + a, 'subtract ' + a]); x += a; }
        else if (t === 'sub') { if (x > 2) { const a = r.int(2, Math.min(15, x - 1)); steps.push(['subtract ' + a, 'add ' + a]); x -= a; } else { const a = r.int(2, 9); steps.push(['add ' + a, 'subtract ' + a]); x += a; } }
        else if (t === 'mul') { const m = r.int(2, 6); steps.push(['multiply by ' + m, 'divide by ' + m]); x *= m; }
        else { const ds = [2, 3, 4, 5, 6].filter((d) => x > 0 && x % d === 0); if (ds.length) { const d = r.pick(ds); steps.push(['divide by ' + d, 'multiply by ' + d]); x /= d; } else { const a = r.int(2, 9); steps.push(['add ' + a, 'subtract ' + a]); x += a; } }
      }
      return N('I think of a number. I ' + steps.map((s) => s[0]).join(', then ') + '. The result is ' + x + '. What was my number?', start, { s: 'Undo the steps from last to first: ' + steps.slice().reverse().map((s) => s[1]).join(', then ') + '. Starting from ' + x + ' this gives ' + start + '.', w: [] });
    }),
    tpl('money', (r) => {
      const m = r.int(3, 30), j = r.int(1, m - 1), g = 3 * j, S0 = 6 * m, F = 2 * (m - j), nm = name(r);
      return N(nm + ' spends half of the money at a shop, then gives away ' + g + ' dollars, then spends one third of what remains on a snack. ' + F + ' dollars are left. How many dollars did ' + nm + ' start with?', S0, { s: 'After the snack: ' + F + ' is two thirds, so before the snack there were ' + (F * 3) / 2 + '. Before giving away ' + g + ': ' + ((F * 3) / 2 + g) + '. Before the shop: ' + S0 + '.', w: W(S0, [[(F * 3) / 2 + g, 'That is the amount before the gift. Also undo the first step, spending half.']]) });
    }),
    tpl('growth', (r) => {
      const f = r.int(2, 5), t = r.int(3, 7), s0 = r.int(1, 9), T = s0 * Math.pow(f, t), mode = r.bool();
      const k = r.int(1, t - 1), D = r.int(10, 40);
      return mode
        ? N('A population multiplies by ' + f + ' every day. After ' + t + ' days it is ' + T + '. How big was it at the start?', s0, { s: 'Divide by ' + f + ' for each of the ' + t + ' days going back: ' + T + ' ÷ ' + Math.pow(f, t) + ' = ' + s0 + '.', w: W(s0, [[T / f, 'That goes back only one day. Go back all ' + t + ' days.']]) })
        : N('Moss on a wall multiplies its area by ' + f + ' every week and covers the whole wall at the end of week ' + D + '. At the end of which week did it cover exactly 1/' + Math.pow(f, k) + ' of the wall?', D - k, { s: 'Each week back divides the area by ' + f + '. After ' + k + ' weeks back the area is 1/' + Math.pow(f, k) + ', so the week is ' + D + ' − ' + k + ' = ' + (D - k) + '.', w: W(D - k, [[Math.round(D / Math.pow(f, k)), 'You divided the week number. The area is divided by ' + f + ' each week, so go back ' + k + ' weeks.']]) });
    }),
    tpl('game', (r) => {
      const k = r.int(2, 6), P0 = r.int(k + 2, 60);
      if (P0 % (k + 1) === 0) return N('Two players take turns removing 1, 2 or 3 stones from a pile of 22. Whoever takes the last stone wins. You go first. How many do you take to guarantee a win?', 2, { s: '22 leaves remainder 2 when divided by 4. Take 2 to leave 20.', w: [] });
      const t = P0 % (k + 1);
      return N('Two players take turns removing between 1 and ' + k + ' stones from a pile of ' + P0 + '. Whoever takes the last stone wins. You go first. How many stones should you take to guarantee a win?', t, { s: 'Losing piles are multiples of ' + (k + 1) + '. ' + P0 + ' leaves remainder ' + t + ' when divided by ' + (k + 1) + ', so take ' + t + ' and leave ' + (P0 - t) + '.', w: W(t, [[1, 'Taking 1 does not leave a multiple of ' + (k + 1) + '.']]) });
    }),
    tpl('halfplus', (r) => {
      const k = r.int(1, 6), n = r.int(2, 7), S0 = (Math.pow(2, n + 1) - 2) * k;
      return N('A shop sells half of its eggs plus ' + k + ' more each hour, for ' + n + ' hours in a row. After the last sale there are no eggs left. How many eggs did the shop start with?', S0, { s: 'Work back: after the last hour 0. Each step back, the stock before was 2 × (stock after + ' + k + '). That gives ' + S0 + ' at the start.', w: W(S0, [[k * n * 2, 'The amounts double each step backwards, so the total grows much faster than this.']]) });
    }),
    tpl('snail', (r) => {
      const u = r.int(3, 9), s = r.int(1, u - 1), d = r.int(3, 15), depth = (d - 1) * (u - s) + u;
      return N('A snail climbs ' + u + ' cm each day and slips back ' + s + ' cm each night. On day ' + d + ' it reaches the top of a well (it does not slip back after it gets out). How deep is the well, in cm?', depth, { s: 'Work back from the last day: before day ' + d + ' began, it had made ' + (d - 1) + ' full days of net progress ' + (u - s) + ' cm each: ' + (d - 1) * (u - s) + '. Then it climbed the last ' + u + ' cm: ' + depth + '.', w: W(depth, [[d * (u - s), 'On the final day the snail does not slip back. Add a full day of climbing, ' + u + ', after ' + (d - 1) + ' days of net progress.']]) });
    }),
    tpl('square', (r) => {
      const x = r.int(2, 20), a = r.int(1, 30), m = r.int(2, 6), R = m * (x * x + a);
      return N('I think of a positive number, square it, add ' + a + ', and multiply by ' + m + '. I get ' + R + '. What was my number?', x, { s: R + ' ÷ ' + m + ' = ' + (x * x + a) + '. Subtract ' + a + ': ' + x * x + '. The positive square root is ' + x + '.', w: W(x, [[x * x, 'That is the square. Take the square root to find the original number.']]) });
    }),
  ],
});
