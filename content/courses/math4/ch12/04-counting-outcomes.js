import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, twoNames } from '../../../../src/content/dsl.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const toPair = (x) => String(x).split('/').map(Number).concat(String(x).includes('/') ? [] : [1]);
const same = (x, y) => fr(...toPair(x)) === fr(...toPair(y));
const wrong = (ans, list) => list.filter((z) => !same(String(z[0]), ans));
const PAIRS = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PAIRS.push([a, b]);
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const nCoins = (n) => { const o = []; for (let m = 0; m < (1 << n); m++) { let h = 0; for (let i = 0; i < n; i++) if (m & (1 << i)) h++; o.push(h); } return o; };
const EVENTS = [
  ['the sum is even', ([a, b]) => (a + b) % 2 === 0],
  ['the sum is odd', ([a, b]) => (a + b) % 2 === 1],
  ['the sum is 7', ([a, b]) => a + b === 7],
  ['the two numbers match', ([a, b]) => a === b],
  ['the sum is 8 or more', ([a, b]) => a + b >= 8],
  ['the sum is 6 or less', ([a, b]) => a + b <= 6],
  ['the sum is prime', ([a, b]) => isPrime(a + b)],
  ['both numbers are odd', ([a, b]) => a % 2 === 1 && b % 2 === 1],
  ['the sum is 11 or 12', ([a, b]) => a + b >= 11],
  ['the sum is 2, 3 or 4', ([a, b]) => a + b <= 4],
];

export default lesson({
  id: 'm4-12-4-counting-outcomes',
  title: 'Counting outcomes',
  blurb: 'Use tables, trees and the multiplication principle to count outcomes, find probabilities of "at least one", and test whether a game is fair.',
  concepts: ['multiplication-principle', 'outcome-tables', 'at-least-one', 'fair-games'],

  tryFirst: [
    num('t1', 'Ava picks a shirt and pants at random. She has 3 shirts and 4 pairs of pants. What is the probability that she picks her blue shirt and her jeans? Give a fraction.', '1/12', {
      h: ['How many different outfits are there?', 'How many of them are blue shirt with jeans?'],
      s: 'There are 3 × 4 = 12 outfits, all equally likely. Only 1 is blue shirt with jeans. The probability is {1/12}.',
      w: [['1/7', 'You added 3 + 4. Each shirt goes with each pair of pants, so multiply.'], ['1/3', 'That is the chance of the blue shirt alone. You also need the jeans.']],
    }),
    num('t2', 'A spinner has 4 equal slices numbered 1 to 4. It is spun twice. What is the probability that the two numbers add up to 5? Give a fraction in simplest form.', '1/4', {
      h: ['How many outcomes are there for two spins?', 'List the pairs that add to 5: (1,4), ...'],
      s: 'There are 4 × 4 = 16 outcomes. The pairs with sum 5 are (1,4), (2,3), (3,2), (4,1). That is 4 of 16. {4/16} = {1/4}.',
      w: [['1/8', 'You missed pairs. Both orders count: (1,4) and (4,1) are different outcomes.'], ['4/8', 'There are 16 outcomes in all, not 8.']],
    }),
  ],

  learn: [
    p('Counting outcomes carefully is the heart of probability. This lesson uses three tools: a <b>tree</b>, a <b>table</b>, and the <b>multiplication principle</b>.'),
    rule('<b>Multiplication principle.</b> If one stage has 3 choices and the next has 2 choices, there are 3 × 2 = 6 outcomes in all. For three stages, multiply all three counts.'),
    widget('countingTree', { a: 3, b: 2, c: 0, labels: ['shirts', 'pants'] }),
    p('Each path from the left to a yellow dot is one outfit. If every outfit is equally likely, the probability of one particular outfit is {1/6}.'),
    ex('An outcome table', ['A spinner has 1, 2, 3. A second spinner has 1, 2, 3, 4. Both are spun. What is the probability that the sum is 5?', 'Make a table with the first spinner down the side and the second across the top. It has 3 × 4 = 12 cells.', 'The cells with sum 5 are (1,4), (2,3), (3,2). That is 3 cells.', 'P = {3/12} = {1/4}.']),
    tbl(['1st \\ 2nd', '1', '2', '3', '4'], [['1', '2', '3', '4', '5'], ['2', '3', '4', '5', '6'], ['3', '4', '5', '6', '7']], 'The sums for the example'),
    rule('<b>At least one.</b> Counting "at least one" directly is slow. Count the opposite, "none", and subtract. P(at least one) = 1 − P(none).'),
    ex('At least one head', ['A coin is flipped 3 times. What is the probability of at least one head?', 'There are 2 × 2 × 2 = 8 outcomes.', 'The only outcome with no heads is TTT. So P(none) = {1/8}.', 'P(at least one head) = 1 − {1/8} = {7/8}.']),
    rule('<b>Fair games.</b> A game is fair if both players have the same chance to win. Count the outcomes where each player wins. If the counts are equal, the game is fair.'),
    warn('<b>Count outcomes, not totals.</b> Three coins can show 0, 1, 2 or 3 heads. That is 4 results, but they are not equally likely: there is 1 way for 0 heads and 3 ways for 1 head. List all 8 outcomes.'),
    mcq('Maya says: "Two dice. P(at least one 6) = {1/6} + {1/6} = {1/3}." What is wrong?', ['Nothing is wrong.', 'The outcome (6,6) is counted twice. The correct count is 11 of 36, so the probability is {11/36}.', 'The two probabilities should be multiplied.'], 1, 'Count the opposite: no 6 on either die is 5 × 5 = 25 outcomes. So at least one 6 is 36 − 25 = 11 outcomes, which is {11/36}. Adding {1/6} + {1/6} counts (6,6) twice.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Spinner A has 4 equal slices numbered 1 to 4. Spinner B has 5 equal slices numbered 1 to 5. Both are spun. What is the probability that the sum is 5? Give a fraction in simplest form.', '1/5', {
      h: ['There are 4 × 5 outcomes. List the pairs with sum 5.'],
      s: 'There are 20 outcomes. Sum 5: (1,4), (2,3), (3,2), (4,1). That is 4 of 20. {4/20} = {1/5}.',
      w: [['4/9', 'The total is 4 × 5 = 20, not 4 + 5.'], ['1/4', 'The total is 20 outcomes. 4 of them have sum 5.']],
    }),
    num('p2', 'A fair coin is flipped 4 times. What is the probability of at least one head? Give a fraction.', '15/16', {
      h: ['Count the opposite: the outcomes with no heads.', 'How many outcomes are there for 4 flips?'],
      s: 'There are 2 × 2 × 2 × 2 = 16 outcomes. Only TTTT has no heads. So at least one head is 15 of 16: {15/16}.',
      w: [['1/16', 'That is the probability of no heads at all.'], ['3/4', 'There are 16 outcomes in all. Count the ones with no heads.']],
    }),
    mc('p3', 'Which game is fair?', ['Two coins are flipped. Ava wins on HH. Ben wins on any other result.', 'Two coins are flipped. Ava wins if the coins match. Ben wins if they differ.', 'A die is rolled. Ava wins on a 6. Ben wins on 1, 2 or 3.', 'Two dice are rolled. Ava wins on the sum 7. Ben wins on the sum 8.'], 1, {
      h: ['For each game, count the outcomes for each player.'],
      s: 'Two coins: HH and TT match (2 outcomes), HT and TH differ (2 outcomes). That is 2 against 2, so fair. The others: 1 against 3; 1 against 3; 6 against 5.',
      w: [[0, 'Ava has 1 outcome and Ben has 3.'], [2, 'Ava has 1 number and Ben has 3.'], [3, 'The sum 7 has 6 outcomes and the sum 8 has 5. Close, but not equal.']],
    }),
    num('p4', 'A password is one letter (A, B or C) followed by one digit (1, 2, 3 or 4), both chosen at random. What is the probability that the password is B3 or C1? Give a fraction in simplest form.', '1/6', {
      h: ['How many different passwords are there?', 'Two passwords are wanted.'],
      s: 'There are 3 × 4 = 12 passwords. Two of them, B3 and C1, are wanted. {2/12} = {1/6}.',
      w: [['1/12', 'That is the chance of one particular password. Two are wanted.'], ['2/7', 'The total is 3 × 4 = 12, not 3 + 4.']],
    }),
    num('p5', 'Two fair dice are rolled. What is the probability that at least one of them shows a 6? Give a fraction.', '11/36', {
      h: ['Count the opposite: neither die shows a 6. Each die has 5 faces that are not 6.', 'Outcomes with no 6 at all: 5 × 5.'],
      s: 'There are 36 outcomes. With no 6 on either die: 5 × 5 = 25. So at least one 6: 36 − 25 = 11. {11/36}.',
      w: [['1/3', 'Adding {1/6} + {1/6} counts the outcome (6,6) twice.'], ['10/36', 'You missed (6,6). Both dice can show a 6.']],
    }),
    num('p6', 'Two fair dice are rolled. What is the probability that the two numbers differ by exactly 2? Give a fraction in simplest form.', '2/9', {
      h: ['List the pairs where one number is 2 more than the other: (1,3), (2,4), ...', 'Count both orders.'],
      s: 'The pairs are (1,3), (2,4), (3,5), (4,6) and the reverse pairs (3,1), (4,2), (5,3), (6,4). That is 8 of 36. {8/36} = {2/9}.',
      w: [['4/36', 'You counted only one order. (1,3) and (3,1) are different outcomes.'], ['1/9', 'You counted only one order and then simplified. Count each pair twice.']],
    }),
    num('p7', 'A family has 3 children. Each child is equally likely to be a boy or a girl. What is the probability that exactly 2 are girls? Give a fraction.', '3/8', {
      h: ['This is like flipping 3 coins. How many outcomes are there?', 'List the outcomes with exactly two girls: GGB, ...'],
      s: 'There are 2 × 2 × 2 = 8 outcomes. Exactly two girls: GGB, GBG, BGG. That is 3 of 8. {3/8}.',
      w: [['1/3', 'The outcomes are not "0, 1, 2 or 3 girls". They are the 8 ordered lists.'], ['1/4', 'You missed an arrangement. The boy can be first, second or third.']],
    }),
  ],

  challenge: [
    chain('Pizza night', 'A pizza is made by choosing one crust (thin or thick), one cheese (mozzarella, cheddar or goat) and one topping (ham, olives, peppers or mushrooms) at random. All choices are equally likely.', [
      num('c1a', 'How many different pizzas are possible?', 24, { h: ['Multiply the number of choices at each stage.'], s: '2 × 3 × 4 = 24.' }),
      num('c1b', 'What is the probability of a thin crust with cheddar? Give a fraction in simplest form.', '1/6', { h: ['With thin crust and cheddar chosen, how many toppings are left to choose from?'], s: 'The crust and cheese are fixed, and any of the 4 toppings works. That is 4 pizzas out of 24: {4/24} = {1/6}.' }),
      num('c1c', 'What is the probability that the topping is not olives? Give a fraction in simplest form.', '3/4', { h: ['3 of the 4 toppings are fine.'], s: 'The topping can be ham, peppers or mushrooms. That is 3 of 4 toppings, so {3/4}. The crust and cheese do not change this.' }),
    ], 'The idea: when some stages are fixed, count only what is left. Other stages may not matter.'),
    chain('A fair game?', 'Two fair dice are rolled. Ava wins if the sum is a prime number. Ben wins otherwise.', [
      num('c2a', 'How many of the 36 outcomes have a prime sum?', 15, { h: ['The prime sums are 2, 3, 5, 7, 11. Count the outcomes for each: 1, 2, 4, 6, 2.'], s: 'Sum 2: 1 outcome. Sum 3: 2. Sum 5: 4. Sum 7: 6. Sum 11: 2. Total 1 + 2 + 4 + 6 + 2 = 15.' }),
      num('c2b', 'What is the probability that Ava wins? Give a fraction in simplest form.', '5/12', { h: ['Use your answer from the last part.'], s: '{15/36} = {5/12}.' }),
      num('c2c', 'To make the game fair, Ava needs to win on more outcomes. How many more of the 36 outcomes must be added to her wins?', 3, { h: ['A fair game gives each player half the outcomes.'], s: 'Fair means 18 outcomes each. Ava has 15, so she needs 3 more.' }),
    ], 'The idea: to fix an unfair game, move outcomes from one player to the other until the counts match.'),
    mc('c3', 'Find the error. Dev says: "Three coins can show 0, 1, 2 or 3 heads. That is 4 results, so P(exactly 1 head) = {1/4}." Which reply is correct?', ['Dev is right.', 'The 4 results are not equally likely. List all 8 outcomes: 3 of them have exactly one head, so the probability is {3/8}.', 'The probability is {1/2}.', 'The probability is {1/8}.'], 1, {
      s: 'The equally likely outcomes are the 8 ordered lists. Exactly one head: HTT, THT, TTH. That is 3 of 8.',
      w: [[0, '"1 head" has 3 ways and "0 heads" has 1 way. They are not equally likely.'], [3, '{1/8} is the chance of one particular list, such as HTT.']],
    }),
  ],

  quiz: [
    tpl('spin2', (r) => {
      const a = r.int(3, 6), b = r.int(3, 7); const kind = r.int(0, 2); const nm = name(r);
      let ev, c;
      if (kind === 0) { const s = r.int(3, a + b - 1); ev = 'the sum is ' + s; c = (() => { let k = 0; for (let x = 1; x <= a; x++) for (let y = 1; y <= b; y++) if (x + y === s) k++; return k; })(); }
      else if (kind === 1) { ev = 'the two numbers are the same'; c = Math.min(a, b); }
      else { const s = r.int(4, a + b - 1); ev = 'the sum is at least ' + s; c = (() => { let k = 0; for (let x = 1; x <= a; x++) for (let y = 1; y <= b; y++) if (x + y >= s) k++; return k; })(); }
      const ans = fr(c, a * b);
      return N(nm + ' spins two spinners. The first has ' + a + ' equal slices numbered 1 to ' + a + '. The second has ' + b + ' equal slices numbered 1 to ' + b + '. What is the probability that ' + ev + '? Give a fraction in simplest form.', ans, { s: 'There are ' + a + ' × ' + b + ' = ' + (a * b) + ' outcomes. ' + c + ' of them make "' + ev + '". {' + c + '/' + (a * b) + '}' + (ans !== c + '/' + (a * b) ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(c, a + b), 'The total number of outcomes is ' + a + ' × ' + b + ', not ' + a + ' + ' + b + '.']]) });
    }),
    tpl('atleast', (r) => {
      const kind = r.int(0, 2); const nm = name(r);
      if (kind === 0) { const n = r.int(2, 6); const ans = fr((1 << n) - 1, 1 << n); return N(nm + ' flips a fair coin ' + n + ' times. What is the probability of at least one ' + r.pick(['head', 'tail']) + '? Give a fraction.', ans, { s: 'There are ' + (1 << n) + ' outcomes. Exactly 1 has none. So 1 − {1/' + (1 << n) + '} = {' + ans + '}.', w: wrong(ans, [[fr(1, 1 << n), 'That is the probability of none at all. At least one is the opposite.']]) }); }
      if (kind === 1) { const n = r.int(2, 3); const t = Math.pow(6, n), no = Math.pow(5, n); const ans = fr(t - no, t); return N(nm + ' rolls ' + n + ' fair dice. What is the probability that at least one shows a 6? Give a fraction in simplest form.', ans, { s: 'There are ' + t + ' outcomes. With no 6 on any die: 5' + (n === 2 ? ' × 5' : ' × 5 × 5') + ' = ' + no + '. At least one 6: ' + t + ' − ' + no + ' = ' + (t - no) + '. {' + (t - no) + '/' + t + '}' + (ans !== (t - no) + '/' + t ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(n, 6), 'Adding {1/6} each time counts outcomes with several 6s more than once.']]) }); }
      const k = r.int(1, 3); const set = r.shuffle([1, 2, 3, 4, 5, 6]).slice(0, k).sort(); const c = PAIRS.filter(([x, y]) => set.includes(x) || set.includes(y)).length; const ans = fr(c, 36);
      return N(nm + ' rolls two fair dice. What is the probability that at least one die shows ' + (k === 1 ? 'a ' + set[0] : 'one of the numbers ' + set.join(', ')) + '? Give a fraction in simplest form.', ans, { s: 'Count the opposite: neither die shows ' + (k === 1 ? 'a ' + set[0] : 'one of those numbers') + '. Each die has ' + (6 - k) + ' other faces. ' + (6 - k) + ' × ' + (6 - k) + ' = ' + ((6 - k) * (6 - k)) + '. At least one: 36 − ' + ((6 - k) * (6 - k)) + ' = ' + c + '. {' + c + '/36}' + (ans !== c + '/36' ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(k * 2, 6), 'Adding the two dice separately counts some outcomes twice.']]) });
    }),
    tpl('fair', (r) => {
      for (let tries = 0; tries < 200; tries++) {
        const i = r.int(0, EVENTS.length - 1), j = r.int(0, EVENTS.length - 1); if (i === j) continue;
        const A = PAIRS.filter(EVENTS[i][1]), B = PAIRS.filter(EVENTS[j][1]);
        if (A.some(([x, y]) => EVENTS[j][1]([x, y]))) continue;
        const ca = A.length, cb = B.length; const [P, Q] = twoNames(r);
        const right = ca === cb ? 'The game is fair.' : ca > cb ? 'The game favors ' + P + '.' : 'The game favors ' + Q + '.';
        const all = ['The game is fair.', 'The game favors ' + P + '.', 'The game favors ' + Q + '.'];
        return choice(r, 'Two fair dice are rolled. ' + P + ' wins if ' + EVENTS[i][0] + '. ' + Q + ' wins if ' + EVENTS[j][0] + '. Otherwise nobody wins and the dice are rolled again. Which is true?', right, all.filter((z) => z !== right), { s: P + ' wins on ' + ca + ' of the 36 outcomes and ' + Q + ' wins on ' + cb + '. ' + (ca === cb ? 'The counts are equal.' : 'The one with more outcomes is favored.') });
      }
      throw new Error('no fair game');
    }),
    tpl('outfit', (r) => {
      const s = r.int(2, 5), pn = r.int(2, 5), h = r.int(2, 4); const nm = name(r); const kind = r.int(0, 2);
      if (kind === 0) { const ans = fr(1, s * pn); return N(nm + ' picks a shirt and a pair of pants at random from ' + s + ' shirts and ' + pn + ' pairs of pants. What is the probability of picking the red shirt and the black pants? Give a fraction.', ans, { s: 'There are ' + s + ' × ' + pn + ' = ' + (s * pn) + ' outfits. Only one is the red shirt with the black pants: {' + ans + '}.', w: wrong(ans, [[fr(1, s + pn), 'Multiply to count the outfits: ' + s + ' × ' + pn + '.']]) }); }
      if (kind === 1) { const ans = fr(1, s * pn * h); return N(nm + ' picks one of ' + s + ' shirts, one of ' + pn + ' pairs of pants and one of ' + h + ' hats at random. What is the probability of one particular outfit of all three? Give a fraction.', ans, { s: 'There are ' + s + ' × ' + pn + ' × ' + h + ' = ' + (s * pn * h) + ' outfits. Only one is wanted: {' + ans + '}.', w: wrong(ans, [[fr(1, s + pn + h), 'Multiply the choices at each stage to count the outfits.']]) }); }
      const c = (s - 1) * (pn - 1); const ans = fr(c, s * pn);
      return N(nm + ' picks a shirt and pants at random from ' + s + ' shirts and ' + pn + ' pairs of pants. What is the probability that the red shirt is NOT chosen and the black pants are NOT chosen? Give a fraction in simplest form.', ans, { s: 'There are ' + (s * pn) + ' outfits. Without the red shirt there are ' + (s - 1) + ' shirts, and without the black pants ' + (pn - 1) + ' pants. That is ' + (s - 1) + ' × ' + (pn - 1) + ' = ' + c + ' outfits. {' + c + '/' + (s * pn) + '}' + (ans !== c + '/' + (s * pn) ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr((s - 1) + (pn - 1), s * pn), 'Multiply the remaining choices, do not add them.']]) });
    }),
    tpl('kids', (r) => {
      for (;;) {
        const n = r.int(3, 6), k = r.int(0, n); const mode = r.pick(['exactly', 'exactly', 'at least', 'at most']); const word = r.pick(['girls', 'boys']);
        const cs = nCoins(n); const c = cs.filter((x) => (mode === 'exactly' ? x === k : mode === 'at least' ? x >= k : x <= k)).length;
        if (c === 0 || c === cs.length) continue;
        const ans = fr(c, 1 << n);
        return N('A family has ' + n + ' children. Each child is equally likely to be a boy or a girl. What is the probability that there are ' + mode + ' ' + k + ' ' + (k === 1 ? word.slice(0, -1) : word) + '? Give a fraction in simplest form.', ans, { s: 'This is like ' + n + ' coin flips: ' + (1 << n) + ' equally likely outcomes. ' + c + ' of them ' + (c === 1 ? 'fits' : 'fit') + '. {' + c + '/' + (1 << n) + '}' + (ans !== c + '/' + (1 << n) ? ' = {' + ans + '}' : '') + '.', w: wrong(ans, [[fr(1, n + 1), 'The numbers of girls are not equally likely. Count the ' + (1 << n) + ' ordered outcomes.']]) });
      }
    }),
    tpl('digits', (r) => {
      const kind = r.int(0, 2); const nm = name(r);
      if (kind === 0) { const s = r.int(5, 14); let c = 0; for (let x = 0; x <= 9; x++) for (let y = 0; y <= 9; y++) if (x + y === s) c++; const ans = fr(c, 100); return N(nm + ' picks two digits, each chosen at random from 0 to 9 (the same digit may come up twice). What is the probability that they add up to ' + s + '? Give a fraction in simplest form.', ans, { s: 'There are 10 × 10 = 100 outcomes. ' + c + ' of them add up to ' + s + '. {' + c + '/100}' + (ans !== c + '/100' ? ' = {' + ans + '}' : '') + '.' }); }
      if (kind === 1) { const m = r.int(2, 5); let c = 0; for (let x = 0; x <= 9; x++) for (let y = 0; y <= 9; y++) if (x > y + m - 1) c++; const ans = fr(c, 100); return N(nm + ' picks two digits, each chosen at random from 0 to 9 (the same digit may come up twice). What is the probability that the first digit is bigger than the second by at least ' + m + '? Give a fraction in simplest form.', ans, { s: 'There are 100 outcomes. Count the pairs where first − second is ' + m + ' or more: ' + c + '. {' + c + '/100}' + (ans !== c + '/100' ? ' = {' + ans + '}' : '') + '.' }); }
      const letters = r.pick([3, 4, 5, 6]); const vow = r.int(1, Math.min(2, letters - 1)); const k = r.int(2, 7); const dg = 10 - k; const c = vow * dg; const ans = fr(c, letters * 10);
      return N(nm + ' makes a code from one letter and one digit. The letter is chosen at random from ' + letters + ' letters, ' + vow + ' of which are vowels. The digit is chosen at random from 0 to 9. What is the probability that the letter is a vowel and the digit is ' + k + ' or more? Give a fraction in simplest form.', ans, { s: 'There are ' + letters + ' × 10 = ' + (letters * 10) + ' codes. Vowel and digit ' + k + ' or more: ' + vow + ' × ' + dg + ' = ' + c + '. {' + c + '/' + (letters * 10) + '}' + (ans !== c + '/' + (letters * 10) ? ' = {' + ans + '}' : '') + '.' });
    }),
  ],
});
