import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const wr = (ans, list) => {
  const seen = new Set([ans]);
  return list.filter(([a]) => { if (seen.has(a) || a < 0) return false; seen.add(a); return true; });
};

export default lesson({
  id: 'm4-4-2-choices',
  title: 'Making choices',
  blurb: 'Count outfits, menus and codes by multiplying the number of choices, even when there are rules.',
  concepts: ['multiplication-principle', 'tree-diagram', 'restrictions'],

  tryFirst: [
    num('t1', 'An outfit is one shirt and one pair of pants. You have 3 shirts and 4 pairs of pants. How many different outfits can you make?', 12, {
      h: ['Pick one shirt. How many outfits use that shirt?', 'There are 3 shirts. Each one has the same number of outfits.'],
      s: 'Each shirt goes with 4 pairs of pants. 3 shirts × 4 pants = 12 outfits.',
      w: [['7', 'You added. Every shirt can go with every pair of pants, so the choices multiply.']],
    }),
    num('t2', 'A lock has a code of 3 digits. Each digit is from 0 to 9. A digit may repeat. How many codes are possible?', 1000, {
      h: ['How many choices for the first digit? For the second? For the third?'],
      s: 'Each of the 3 digits has 10 choices. 10 × 10 × 10 = 1000. These are the codes 000 to 999.',
      w: [['30', 'You added 10 + 10 + 10. A choice for each digit multiplies.'], ['999', 'The code 000 counts as a code, too. The codes run from 000 to 999.']],
    }),
  ],

  learn: [
    p('Suppose you make a choice in steps. Each step has some options. A <b>tree diagram</b> shows every path. Each path from left to right is one complete outcome.'),
    def('outcome', 'One complete result of all the steps. A shirt and a hat together make one outcome, such as "red shirt, blue hat".'),
    def('tree diagram', 'A picture that shows every choice as a branch. Each path from the left edge to the right edge is one outcome.'),
    widget('countingTree', { a: 3, b: 2, labels: ['shirts', 'hats'] }),
    rule('<b>The multiplication principle.</b> If step 1 has a choices and step 2 has b choices (whatever you picked first), then there are <b>a × b</b> outcomes. With more steps, keep multiplying.'),
    formula('Multiplication principle', 'outcomes = a × b × c × …', 'Each letter is the number of options at one step. In the tree above, 3 shirts and 2 hats give 3 × 2 = 6 outfits.'),
    ex('A dinner menu', ['A dinner has 1 soup, 1 main dish and 1 dessert.', 'There are 3 soups, 5 main dishes and 2 desserts.', 'Steps: 3 × 5 × 2 = 30 dinners.', 'Check with a tree: 3 branches, each splits into 5, each of those splits into 2.']),
    p('Sometimes there is a rule. A rule changes how many options a step has. Count the options <i>after</i> the earlier steps are done.'),
    ex('A code with no repeats', ['A 3-digit code uses digits 0 to 9, and no digit may repeat.', 'First digit: 10 choices.', 'Second digit: 9 choices, since one digit is used.', 'Third digit: 8 choices.', '10 × 9 × 8 = 720 codes.']),
    key('Ask the same question at every step: "How many options are left <i>now</i>?" Then multiply the answers.'),
    rule('<b>Fill the strict slot first.</b> If one slot has a restriction, fill that slot before the others. Example: how many even 3-digit numbers? The ones digit must be 0, 2, 4, 6 or 8. The first digit cannot be 0. Pick the digit with the strictest rule first.'),
    ex('Even 3-digit numbers', ['Ones digit: 5 choices (0, 2, 4, 6, 8).', 'Hundreds digit: 9 choices (1 to 9).', 'Tens digit: 10 choices.', '9 × 10 × 5 = 450 even numbers.']),
    tip('If a number cannot start with 0, count that slot as 9 choices, not 10. Write the number of choices over each slot before multiplying. A mistake is easy to spot that way.'),
    warn('<b>Watch out.</b> Multiply when you do <i>one thing and then another</i>. Add when you pick <i>one thing or another</i>. A dessert that is cake or pie has 2 + 2 options. It is not 2 × 2.'),
    mcq('Eli counts 4-digit numbers with no repeated digit as 9 × 9 × 9 × 9 = 6561. What went wrong?', ['Nothing. 6561 is right.', 'Each new digit must differ from the digits already used, so the number of choices keeps dropping. The answer is 9 × 9 × 8 × 7 = 4536.', 'The first digit should have 10 choices.'], 1, 'The first digit has 9 choices (not 0). The second digit can be 0, so it has 9 choices left. The third has 8 choices left. The fourth has 7 choices left. 9 × 9 × 8 × 7 = 4536.', 'Spot the mistake'),
    recap([['outcome', 'one complete result of all the steps'], ['tree diagram', 'a picture of every path through the steps'], ['multiplication principle', 'multiply the options at each step'], ['strict slot', 'the slot with a restriction; fill it first']], [['Multiplication principle', 'a × b × c × …'], ['No repeats, 3 slots from 10', '10 × 9 × 8']]),
  ],

  practice: [
    num('p1', 'A lunch is 1 sandwich, 1 side and 1 drink. There are 4 sandwiches, 3 sides and 2 drinks. How many different lunches are there?', 24, {
      h: ['One choice at a time.'],
      s: '4 × 3 × 2 = 24 lunches.',
      w: [['9', 'You added the options. Every combination is a different lunch, so multiply.']],
    }),
    num('p2', 'A code is 2 capital letters (A to Z) followed by 1 digit (0 to 9). Repeats are allowed. How many codes are there?', 6760, {
      h: ['26 choices for each letter.'],
      s: '26 × 26 × 10 = 676 × 10 = 6760.',
      w: [['62', 'You added 26 + 26 + 10. Each slot multiplies.'], ['676', 'You forgot the digit. It has 10 choices.']],
    }),
    num('p3', 'A 4-digit code uses digits 0 to 9, and no digit may repeat. How many codes are possible?', 5040, {
      h: ['The first digit has 10 choices. How many does the second have?'],
      s: '10 × 9 × 8 × 7 = 5040.',
      w: [['10000', 'That allows repeated digits. Here each digit is used at most once.']],
    }),
    num('p4', 'How many 3-digit numbers have all odd digits? (The odd digits are 1, 3, 5, 7, 9.)', 125, {
      h: ['How many choices for each digit?'],
      s: 'Each of the 3 digits has 5 choices. 5 × 5 × 5 = 125.',
      w: [['15', 'You added. Each digit is a separate choice, so multiply.'], ['450', 'That counts even numbers. Here every digit must be odd.']],
    }),
    num('p5', 'Each digit of a 3-digit code is 1, 2 or 3. Repeats are allowed. How many codes have at least one digit that is 3?', 19, {
      h: ['Count all the codes first.', 'Count the codes with no 3 at all. Take those away.'],
      s: 'All codes: 3 × 3 × 3 = 27. Codes with no 3 use only 1 and 2: 2 × 2 × 2 = 8. 27 − 8 = 19.',
      w: [['27', 'That counts all the codes, including ones with no 3.'], ['8', 'That is the number of codes with no 3. Take it away from all the codes.']],
    }),
    num('p6', 'There are 4 shirts, 3 pairs of pants and 2 hats. The red shirt never goes with the green pants. How many outfits (shirt, pants and hat) are allowed?', 22, {
      h: ['First count every outfit, as if there were no rule.', 'How many outfits use the red shirt and the green pants together?'],
      s: 'All outfits: 4 × 3 × 2 = 24. Bad outfits: 1 red shirt × 1 green pants × 2 hats = 2. Allowed: 24 − 2 = 22.',
      w: [['24', 'That ignores the rule.'], ['20', 'The bad outfits include the 2 hat choices, not 4. Count them as 1 × 1 × 2.']],
    }),
    num('p7', 'Three towns are joined by roads. There are 3 roads from Alder to Birch and 4 roads from Birch to Cedar. Maya drives from Alder to Cedar and back by Birch. She never uses the same road twice. How many different round trips can she make?', 72, {
      h: ['On the way there: 3 choices, then 4 choices.', 'On the way back, one road in each pair is already used.'],
      s: 'Alder to Birch: 3. Birch to Cedar: 4. Cedar to Birch: 3 (one is used). Birch to Alder: 2 (one is used). 3 × 4 × 3 × 2 = 72.',
      w: [['144', 'On the way back, the road you used going out is not allowed.'], ['12', 'That counts only the way there.']],
    }),
    num('p8', 'How many 4-digit numbers are there with all four digits different and an even ones digit? (The first digit cannot be 0.)', 2296, {
      h: ['Split into two cases: the ones digit is 0, or the ones digit is 2, 4, 6 or 8.', 'If the ones digit is 0, the other digits come from 1 to 9. If it is 2, 4, 6 or 8, the first digit has fewer choices.'],
      s: 'Ones digit 0: first digit 9 choices, then 8, then 7: 504. Ones digit is 2, 4, 6 or 8 (4 ways): first digit is any of 1 to 9 except the ones digit, so 8 choices. Then 8 left for the hundreds, 7 for the tens. 4 × 8 × 8 × 7 = 1792. Total 504 + 1792 = 2296.',
      w: [['2520', 'That counts 5 even digits for the ones place and 9 × 8 × 7 for the rest, but 0 cannot be first. Split into cases.']],
    }),
  ],

  challenge: [
    chain('The ice cream cart', 'The cart has 5 flavors and 3 kinds of cone. A cone holds scoops of different flavors.', [
      num('c1a', 'How many different one-scoop cones can you order?', 15, { h: ['Pick a cone, then a flavor.'], s: '3 × 5 = 15.', w: [['8', 'Cones and flavors multiply, they do not add.']] }),
      num('c1b', 'Now a cone has two scoops of different flavors, a top scoop and a bottom scoop. Chocolate on top is different from chocolate on the bottom. How many cones?', 60, { h: ['After the bottom flavor, how many flavors are left for the top?'], s: '3 cones × 5 bottom flavors × 4 top flavors = 60.', w: [['75', 'The two scoops must be different, so the top has only 4 choices.']] }),
      num('c1c', 'A customer says: "I do not care which flavor is on top." Two cones with the same two flavors in different order count as one. How many different cones are there now?', 30, { h: ['Each pair of flavors was counted twice in the last part. Why?'], s: 'Every pair of flavors appeared in two orders, so each was counted twice. 60 ÷ 2 = 30.', w: [['60', 'Swapping the scoops now does not make a new cone.']] }),
    ], 'The idea: when order does not matter, a count that treats order as different counts every outcome twice (or more). Divide by the number of orders.'),
    chain('Numbers from digits', 'We make numbers from the digits 0 to 9.', [
      num('c2a', 'How many 2-digit numbers have two different digits?', 81, { h: ['The tens digit cannot be 0. How many choices does the ones digit have after that?'], s: 'Tens digit: 9 choices (1 to 9). Ones digit: 9 choices (any digit except the tens digit, and 0 is allowed). 9 × 9 = 81.', w: [['90', 'That counts numbers like 11 and 22 with repeated digits.']] }),
      num('c2b', 'How many 3-digit numbers have all digits different?', 648, { h: ['9 choices, then 9, then 8.'], s: 'Hundreds: 9. Tens: 9 (0 allowed, not the hundreds digit). Ones: 8. 9 × 9 × 8 = 648.', w: [['720', 'That is 10 × 9 × 8, which would let the first digit be 0.']] }),
      num('c2c', 'How many of those 648 numbers are even?', 328, { h: ['Split: the ones digit is 0, or it is 2, 4, 6, 8.'], s: 'Ones digit 0: hundreds 9, tens 8: 72. Ones digit 2, 4, 6 or 8 (4 ways): hundreds 8 choices (not 0, not the ones digit), tens 8 choices. 4 × 64 = 256. Total 72 + 256 = 328.', w: [['324', 'That is half of 648, but more of these numbers are even than odd. Split into cases and count each one.']] }),
    ], 'The idea: when a rule touches two slots, split into cases so each case has a clean count.'),
    mc('c3', 'Find the error. Nico says: "Odd 3-digit numbers with all different digits: ones digit has 5 choices, tens has 9, hundreds has 8. So 5 × 9 × 8 = 360." Which is the best correction?', ['He should pick the ones digit first (5), then the hundreds digit (8, since it cannot be 0 or the ones digit), then the tens digit (8). 5 × 8 × 8 = 320.', 'The answer 360 is right.', 'He should add 5 + 9 + 8.', 'He should use 10 × 9 × 8 = 720.'], 0, {
      s: 'Ones: 5 odd digits. Hundreds: the digits 1 to 9, minus the one used for the ones place = 8. Tens: 10 digits, minus the 2 used = 8. 5 × 8 × 8 = 320. Nico gave the tens digit 9 choices, but 2 digits are already used, so only 8 are left.',
      w: [[1, 'Check the hundreds digit: it cannot be 0 and it cannot equal the ones digit. Re-count the choices for each place.'], [2, 'Steps multiply.'], [3, 'That ignores that numbers must be odd and cannot begin with 0.']],
    }),
  ],

  quiz: [
    tpl('outfit', (r) => {
      const a = r.int(2, 8), b = r.int(2, 8), c = r.int(2, 6);
      const items = r.pick([['shirts', 'pairs of pants', 'hats'], ['sandwiches', 'soups', 'drinks'], ['flavors', 'cones', 'toppings']]);
      return N('A choice has one of each: ' + a + ' ' + items[0] + ', ' + b + ' ' + items[1] + ' and ' + c + ' ' + items[2] + '. How many different choices are there?', a * b * c, { s: a + ' × ' + b + ' × ' + c + ' = ' + (a * b * c) + '.', w: wr(a * b * c, [[a + b + c, 'Choices for each item multiply. They do not add.']]) });
    }),
    tpl('code', (r) => {
      const L = r.int(2, 5), m = r.int(3, 9), thing = r.pick(['A code has', 'A password has', 'A locker label has']);
      const ans = Math.pow(m, L);
      return N(thing + ' ' + L + ' places. Each place can hold any of ' + m + ' symbols, and symbols may repeat. How many are possible?', ans, { s: m + ' choices for each of ' + L + ' places: ' + Array(L).fill(m).join(' × ') + ' = ' + ans + '.', w: wr(ans, [[m * L, 'Each place multiplies by ' + m + '. You added instead.']]) });
    }),
    tpl('norepeat', (r) => {
      const n = r.int(6, 12), L = r.int(2, 5);
      let ans = 1; for (let i = 0; i < L; i++) ans *= n - i;
      return N('A code has ' + L + ' different symbols chosen from ' + n + ' symbols, and no symbol is used twice. How many codes are there?', ans, { s: Array.from({ length: L }, (_, i) => n - i).join(' × ') + ' = ' + ans + '.', w: wr(ans, [[Math.pow(n, L), 'That allows repeats. Each place has one fewer choice.']]) });
    }),
    tpl('even', (r) => {
      const L = r.int(2, 5), m = r.int(3, 9);
      let c = 0;
      for (let i = Math.pow(10, L - 1); i < Math.pow(10, L); i++) { const t = String(i); if (i % 2 === 0 && t.split('').every((x) => Number(x) < m)) c++; }
      const ev = Math.ceil(m / 2);
      return N('How many ' + L + '-digit numbers are even and use only the digits 0 to ' + (m - 1) + '? (The first digit cannot be 0. Digits may repeat.)', c, { s: 'First digit: ' + (m - 1) + ' choices. ' + (L > 2 ? 'Middle digits: ' + m + ' choices each. ' : '') + 'Ones digit: ' + ev + ' even choices. Product ' + c + '.', w: wr(c, [[m * Math.pow(m, L - 2) * ev, 'The first digit cannot be 0.']]) });
    }),
    tpl('atleast', (r) => {
      const m = r.int(3, 6), L = r.int(3, 4), k = r.int(1, m);
      const ans = Math.pow(m, L) - Math.pow(m - 1, L);
      return N('Each digit of a ' + L + '-digit code is one of 1 to ' + m + '. Repeats are allowed. How many codes have at least one digit equal to ' + k + '?', ans, { s: 'All codes: ' + m + '^[' + L + '] = ' + Math.pow(m, L) + '. Codes with no ' + k + ': ' + (m - 1) + '^[' + L + '] = ' + Math.pow(m - 1, L) + '. Difference ' + ans + '.', w: wr(ans, [[Math.pow(m - 1, L), 'That is the count with no ' + k + '. Subtract it from the total.']]) });
    }),
    tpl('rule', (r) => {
      const a = r.int(3, 7), b = r.int(2, 5), c = r.int(2, 5), bad = r.int(1, 2);
      const all = a * b * c, banned = bad * c;
      return N('You have ' + a + ' shirts, ' + b + ' pants and ' + c + ' hats. ' + bad + (bad === 1 ? ' shirt does' : ' shirts do') + ' not go with one particular pair of pants. How many outfits are allowed?', all - banned, { s: 'All: ' + all + '. Not allowed: ' + bad + ' × 1 × ' + c + ' = ' + banned + '. ' + all + ' − ' + banned + ' = ' + (all - banned) + '.', w: wr(all - banned, [[all, 'This ignores the rule.']]) });
    }),
    tpl('menu', (r) => {
      const a = r.int(2, 5), b = r.int(2, 5), c = r.int(2, 5), d = r.int(2, 5);
      const ans = a * b + c * d;
      return N('A cafe offers a breakfast of ' + a + ' egg styles with ' + b + ' kinds of toast, OR a bowl of ' + c + ' cereals with ' + d + ' kinds of milk. How many different orders are there?', ans, { s: 'First kind: ' + a + ' × ' + b + ' = ' + (a * b) + '. Second kind: ' + c + ' × ' + d + ' = ' + (c * d) + '. Either one: ' + ans + '.', w: wr(ans, [[a * b * c * d, 'You pick one kind OR the other. Add the two counts.']]) });
    }),
    tpl('oddnums', (r) => {
      const L = r.int(2, 4), m = r.int(6, 10), odd = r.bool();
      let c = 0;
      for (let i = Math.pow(10, L - 1); i < Math.pow(10, L); i++) { const t = String(i); if (i % 2 === (odd ? 1 : 0) && new Set(t).size === L && t.split('').every((x) => Number(x) < m)) c++; }
      return N('How many ' + L + '-digit ' + (odd ? 'odd' : 'even') + ' numbers have all different digits, all from 0 to ' + (m - 1) + '?', c, { s: 'Pick the ones digit first, then the first digit (not 0 and not the ones digit), then the middle digits. Total ' + c + '.', w: wr(c, [[c + 1, 'Pick the strict slots first: the ones digit and the first digit.'], [c - 1, 'Recheck how many choices the first digit has after the ones digit is picked.']]) });
    }),
  ],
});
