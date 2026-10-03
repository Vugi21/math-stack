import { lesson, text, num, mc, N, T, choice, tpl, p, rule, warn, ex, widget, mcq, chain, NAMES } from '../../../../src/content/dsl.js';

const perms = (a) => (a.length <= 1 ? [a.slice()] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((q) => [x, ...q])));
const count = (all, cl) => all.filter((s) => cl.every((k) => k.f(s))).length;
/** random clues (all true of the hidden answer) until exactly one candidate is left, then drop any clue that is not needed */
function minimal(all, pool, r) {
  let cl = [];
  for (const c of r.shuffle(pool)) { cl.push(c); if (count(all, cl) === 1) break; }
  if (count(all, cl) !== 1) return null;
  for (let i = cl.length - 1; i >= 0; i--) { const t = cl.filter((_, k) => k !== i); if (count(all, t) === 1) cl = t; }
  return cl;
}
const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];
const people = (r, n) => r.distinct(n, 0, NAMES.length - 1).map((i) => NAMES[i]);
const list = (a) => a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

export default lesson({
  id: 'm4-6-1-logic-puzzles',
  title: 'Logic puzzles',
  blurb: 'Solve puzzles by ruling things out, following if-then statements, and testing true and false claims.',
  concepts: ['deduction', 'elimination', 'if-then'],

  tryFirst: [
    text('t1', 'Three boxes stand in a row. They hold one red, one blue and one green ball. The red ball is not in the first box. The blue ball is in neither the first nor the second box. What color is in the first box?', ['green'], {
      h: ['Start with the blue ball. Which box can it be in?', 'Then place the red ball.'],
      s: 'The blue ball cannot be in box 1 or 2, so it is in box 3. Red is not in box 1, and box 3 is taken, so red is in box 2. Green is left for box 1.',
      w: [['red', 'The first clue says the red ball is not in the first box.'], ['blue', 'Blue cannot be in box 1 or box 2. It must be in box 3.']],
    }),
    text('t2', 'Ava, Ben and Cy each own one pet: a cat, a dog or a fish. All three pets are different. Ava is allergic to fur. Ben\'s pet does not bark. Who owns the dog?', ['Cy'], {
      h: ['Which pets have fur? Which pet is left for Ava?', 'Now Ben. Which pets are left, and which one does not bark?'],
      s: 'Ava cannot own a cat or a dog, because they have fur. So Ava owns the fish. Ben\'s pet does not bark, so it is not the dog. Ben owns the cat. Cy owns the dog.',
      w: [['Ben', 'Ben\'s pet does not bark. A dog barks.'], ['Ava', 'Ava is allergic to fur, and dogs have fur.']],
    }),
  ],

  learn: [
    p('A <b>clue</b> is a fact. <b>Deduction</b> means using clues to find something that <i>must</i> be true. You do not guess. You show that every other choice fails.'),
    rule('<b>Elimination.</b> When a choice breaks a clue, cross it out. When only one choice is left, it is the answer.'),
    ex('Who owns what?', ['Dev, Elena and Farid own a bike, a scooter and a skateboard. One each.', 'Clue 1: Dev does not own the bike. Clue 2: Elena owns neither the bike nor the scooter.', 'Elena has only one choice left: the skateboard.', 'Dev cannot have the bike. The skateboard is taken. So Dev owns the scooter.', 'Farid gets the bike.']),
    p('A grid keeps track for you. Each row is a person and each column is a thing. Click a cell once for ✗ (not a match). Click twice for ✓ (a match). Try this puzzle: Ava does not own the dog. Ben owns neither the dog nor the cat.'),
    widget('logicGrid', { rows: ['Ava', 'Ben', 'Cy'], cols: ['cat', 'dog', 'fish'] }),
    rule('<b>If-then.</b> "If P, then Q" says: whenever P is true, Q is true too. If you know P is true, Q is true. If you know Q is false, P must be false. If you know Q is true, you learn nothing about P.'),
    warn('<b>Do not turn it around.</b> "If it is a dog, then it has four legs." A table has four legs. That does not make it a dog. Knowing Q does not tell you P.'),
    ex('Exactly one is true', ['A card shows a number from 1 to 5. Three statements: (A) the number is even, (B) the number is more than 3, (C) the number is 1. Exactly one statement is true. Which number?', 'Test 2: A is true, B false, C false. One true. It works.', 'Test 4: A true, B true. Two true. It fails.', 'Test 5: only B is true. One true. It works too.', 'Test 1: only C. It works as well. Test 3: none. It fails.', 'The numbers 1, 2 and 5 all work. This puzzle needs one more clue. Real puzzles must have exactly one answer.']),
    mcq('Mia says: "If a number ends in 5, then it is a multiple of 5. The number 40 is a multiple of 5. So 40 ends in 5." What is wrong?', ['Nothing is wrong.', 'The rule only works one way. A multiple of 5 can end in 0.', 'Numbers that end in 5 are not multiples of 5.'], 1, 'The rule says: ends in 5, then multiple of 5. It does not say a multiple of 5 must end in 5. The number 40 is a multiple of 5 and ends in 0.', 'Spot the mistake'),
  ],

  practice: [
    text('p1', 'Five runners finished a race with no ties. Ava beat Ben. Cy beat Ava. Dev beat Cy. Ben beat Eli. Who finished fourth?', ['Ben'], {
      h: ['Put the runners in a line using the clues. Start with Dev.', 'Each clue connects two neighbors.'],
      s: 'Dev beat Cy, Cy beat Ava, Ava beat Ben, Ben beat Eli. The order is Dev, Cy, Ava, Ben, Eli. Fourth is Ben.',
      w: [['Ava', 'Ava was third. Count again: Dev, Cy, Ava, Ben, Eli.'], ['Eli', 'Eli was last, fifth.']],
    }),
    mc('p2', 'Every student who has a bike also has a helmet. Ben has a helmet. Which must be true?', ['Ben has a bike.', 'Ben does not have a bike.', 'We cannot tell whether Ben has a bike.', 'Ben has two helmets.'], 2, {
      h: ['The rule is "bike, then helmet". Which way does it go?', 'Could someone have a helmet and no bike?'],
      s: 'The rule starts from a bike. Ben\'s helmet does not tell us about a bike. Someone can own a helmet and no bike.',
      w: [[0, 'That turns the rule around. A helmet does not prove there is a bike.'], [1, 'You cannot be sure of that either. Ben might have both.']],
    }),
    num('p3', 'Here are three statements about a whole number N from 1 to 9. (A) N is more than 5. (B) N is even. (C) N is a multiple of 4. For how many values of N is exactly one statement true?', 3, {
      h: ['Test each number from 1 to 9. Count the true statements.', 'Make a short list: for each N, write which of A, B, C are true.'],
      s: 'N = 2: only B. N = 7: only A. N = 9: only A. The others give none (1, 3, 5), two (4, 6) or three (8). So 3 values.',
      w: [['4', 'You counted one number too many. Check 4, 6 and 8: each has more than one true statement.'], ['2', 'You missed one. Test every number from 1 to 9, odd numbers too.']],
    }),
    text('p4', 'Four children sit in seats 1, 2, 3 and 4 from left to right. They are Ava, Ben, Cy and Dee. Ben sits directly left of Ava. Cy sits in an end seat. Dee does not sit next to Ben. Dee is not in seat 4. Who sits in seat 3?', ['Dee'], {
      h: ['Ben and Ava are a pair: Ben, then Ava. Where can the pair go?', 'Try the pair in seats 1-2, 2-3 and 3-4.'],
      s: 'Try the pair Ben-Ava in each spot. In seats 2-3, Cy and Dee take seats 1 and 4. Dee cannot be in seat 4, so Dee is in seat 1, next to Ben. That breaks a clue. In seats 3-4, Cy must take seat 1, so Dee is in seat 2, next to Ben. That breaks a clue too. So the pair is in seats 1-2. Cy takes the end seat 4 and Dee takes seat 3. The order is Ben, Ava, Dee, Cy.',
      w: [['Cy', 'Cy is in an end seat, so seat 4. Seat 3 is not an end.'], ['Ava', 'Ava is in seat 2 in the only order that works.']],
    }),
    text('p5', 'Three boxes are labeled "Apples", "Oranges" and "Mixed". Every label is wrong. You take one fruit from the "Mixed" box and it is an apple. What does the box labeled "Apples" hold? Answer with one word: apples, oranges or mixed.', ['oranges', 'orange'], {
      h: ['The "Mixed" box is wrongly labeled. What does one apple tell you about it?', 'Now the "Oranges" box: it is not oranges. It is not the apple box either. What is left?'],
      s: 'The "Mixed" box is not mixed. It gave an apple, so it holds only apples. The "Oranges" box is not oranges and the apples are taken, so it is the mixed box. That leaves oranges for the box labeled "Apples".',
      w: [['mixed', 'The box labeled "Mixed" is the apple box. The "Oranges" box is the mixed one.'], ['apples', 'The label "Apples" is wrong. The apples are in the box marked "Mixed".']],
    }),
    num('p6', 'A three-digit number uses the digits 1, 2 and 3 once each. It is larger than 200. It is odd. Its tens digit is bigger than its hundreds digit. What is the number?', 231, {
      h: ['List all six numbers made from 1, 2, 3.', 'Cross out those that break a clue, one clue at a time.'],
      s: 'Larger than 200 leaves 213, 231, 312, 321. Odd leaves 213, 231, 321. Tens digit bigger than hundreds digit: 213 (1 is not bigger than 2) fails, 321 (2 is not bigger than 3) fails. Only 231 works.',
      w: [['213', 'Tens digit is 1, hundreds digit is 2. The tens digit must be bigger.'], ['321', 'Tens digit is 2 and hundreds digit is 3. The tens digit must be bigger.']],
    }),
    text('p7', 'Ava, Ben, Cy and Dee each own a different pet: cat, dog, fish or bird. Ben\'s pet has no fur and does not live in water. Dee\'s pet lives in water or has wings. Ava\'s pet has fur and does not bark. Who owns the dog?', ['Cy'], {
      h: ['Ben first: no fur and does not live in water. Which pet is that?', 'Then Dee: lives in water or has wings. One of those is taken.'],
      s: 'Ben has no fur and does not live in water, so Ben owns the bird. Dee lives in water or has wings. The bird is taken, so Dee owns the fish. Ava has fur and does not bark: the cat. Cy owns the dog.',
      w: [['Ava', 'Ava\'s pet does not bark. A dog barks.'], ['Dee', 'Dee\'s pet lives in water or has wings. A dog does neither.']],
    }),
  ],

  challenge: [
    chain('The relay', 'Five runners finished with no ties: Ana, Ben, Cy, Dee and Eli. Cy beat Ben. Ben beat Eli. Dee finished right after Eli. Ana finished right after Cy.', [
      text('c1a', 'Who finished first?', ['Cy'], { h: ['Who beat Ben? Who is ahead of everyone in that chain?'], s: 'Ben, Eli, Dee and Ana each finish behind someone: Cy, Ben, Eli and Cy. Only Cy has nobody ahead. Cy is first.' }),
      text('c1b', 'Who finished third?', ['Ben'], { h: ['Ana is directly behind Cy. So Ana is second.', 'Ben must come before Eli and Dee.'], s: 'Cy is first and Ana is second. Ben beat Eli, and Eli and Dee are side by side behind Ben. So Ben is third.' }),
      num('c1c', 'Add Eli\'s place to Dee\'s place. What do you get?', 9, { h: ['After Ben comes Eli, then Dee.'], s: 'The order is Cy, Ana, Ben, Eli, Dee. Eli is 4th and Dee is 5th: 4 + 5 = 9.' }),
    ], 'The idea: when clues link people in a chain, build the line first. Each new clue then fits into one spot.'),
    chain('Three signs', 'A treasure is in exactly one of three boxes: gold, silver or bronze. The gold box says "The treasure is in this box." The silver box says "The treasure is not in this box." The bronze box says "The treasure is not in the gold box." Exactly one sign is true.', [
      num('c2a', 'Suppose the treasure is in the gold box. How many signs are true?', 2, { h: ['Check each sign one by one.'], s: 'Gold sign: true. Silver sign: true (the treasure is not there). Bronze sign: false. That is two true signs, so the gold box fails.' }),
      num('c2b', 'Suppose the treasure is in the bronze box. How many signs are true?', 2, { h: ['The gold box is empty now.'], s: 'Gold sign: false. Silver sign: true. Bronze sign: true (the gold box is empty). Two true signs, so bronze fails.' }),
      text('c2c', 'Which box holds the treasure?', ['silver'], { h: ['Only one box is left to test.'], s: 'Silver: gold sign false, silver sign false, bronze sign true. Exactly one is true. It works.' }),
    ], 'The idea: when you cannot see how to start, test each possibility. Keep the one that fits every rule.'),
    mc('c3', 'Find the error. Dev says: "If it is raining, the grass is wet. The grass is wet. So it is raining." Which reply is correct?', ['Dev is right.', 'Dev turned the rule around. Sprinklers also make grass wet, so we cannot tell.', 'Dev is wrong, because the grass is dry.', 'If-then rules cannot be used with weather.'], 1, {
      s: 'The rule goes from rain to wet grass. Wet grass could have other causes, so it does not prove rain.',
      w: [[0, 'Check the direction. The rule starts with rain, not with wet grass.'], [2, 'The problem says the grass is wet.']],
    }),
  ],

  quiz: [
    tpl('order', (r) => {
      const n = r.pick([4, 5]); const ps = people(r, n);
      const pool = [];
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pool.push({ t: ps[i] + ' finished ahead of ' + ps[j] + '.', f: (s) => s.indexOf(ps[i]) < s.indexOf(ps[j]) });
      for (let i = 0; i + 1 < n; i++) pool.push({ t: ps[i + 1] + ' finished right after ' + ps[i] + '.', f: (s) => s.indexOf(ps[i + 1]) === s.indexOf(ps[i]) + 1 });
      const cl = minimal(perms(ps), pool, r);
      const k = r.int(1, n - 2);
      return T(list(ps.slice().sort()) + ' ran a race. There were no ties. ' + cl.map((c) => c.t).join(' ') + ' Who finished ' + ORD[k] + '?', [ps[k]], { s: 'Build the line from the clues: ' + ps.join(', ') + '. Place number ' + (k + 1) + ' is ' + ps[k] + '.' });
    }),
    tpl('owner', (r) => {
      const C = [
        { v: 'owns', nv: 'does not own', items: ['cat', 'dog', 'fish', 'rabbit'], intro: 'a pet' },
        { v: 'plays', nv: 'does not play', items: ['violin', 'drums', 'flute', 'piano'], intro: 'an instrument' },
        { v: 'eats', nv: 'does not eat', items: ['apple', 'pear', 'plum', 'peach'], intro: 'a fruit' },
        { v: 'wears', nv: 'does not wear', items: ['red hat', 'blue hat', 'green hat', 'gray hat'], intro: 'a hat' },
      ];
      const c = r.pick(C), n = r.pick([3, 3, 4]); const ps = people(r, n); const items = r.shuffle(c.items).slice(0, n);
      const sol = items.slice(); // person i has items[i]
      const all = perms(items);
      const pool = [];
      for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) if (k !== i) pool.push({ t: ps[i] + ' ' + c.nv + ' the ' + items[k] + '.', f: (s) => s[i] !== items[k] });
      const cl = minimal(all, pool, r);
      const q = r.int(0, n - 1);
      return T(list(ps) + ' each have ' + c.intro + '. All are different: the ' + list(items.slice().sort()) + '. ' + cl.map((x) => x.t).join(' ') + ' Who has the ' + items[q] + '?', [ps[q]], { s: 'Cross out choices that break a clue. The only match: ' + ps.map((x, i) => x + ' has the ' + sol[i]).join('; ') + '.' });
    }),
    tpl('ifthen', (r) => {
      const C = [
        ['is in the chess club', 'is not in the chess club', 'has a library card', 'does not have a library card'],
        ['lives on Pine Street', 'does not live on Pine Street', 'has a blue door', 'does not have a blue door'],
        ['is on the soccer team', 'is not on the soccer team', 'owns cleats', 'does not own cleats'],
        ['takes the bus', 'does not take the bus', 'gets up early', 'does not get up early'],
        ['has a pet bird', 'does not have a pet bird', 'owns a birdcage', 'does not own a birdcage'],
      ];
      const [P, nP, Q, nQ] = r.pick(C); const nm = r.pick(NAMES); const kind = r.int(0, 3);
      const rule = 'Rule: if a person ' + P + ', then that person ' + Q + '. ';
      const unk = (x) => 'We cannot tell whether ' + nm + ' ' + x + '.';
      if (kind === 0) return choice(r, rule + nm + ' ' + P + '. Which must be true?', nm + ' ' + Q + '.', [[nm + ' ' + nQ + '.', 'The rule says a person who ' + P + ' also has the second fact.'], unk(Q)], { s: 'The first part of the rule is true for ' + nm + ', so the second part must be true.' });
      if (kind === 1) return choice(r, rule + nm + ' ' + Q + '. Which must be true?', unk(P), [[nm + ' ' + P + '.', 'That turns the rule around. Others can also have the second fact.'], [nm + ' ' + nP + '.', 'The rule does not say that either.']], { s: 'The rule goes from the first fact to the second. Knowing the second does not decide the first.' });
      if (kind === 2) return choice(r, rule + nm + ' ' + nQ + '. Which must be true?', nm + ' ' + nP + '.', [[nm + ' ' + P + '.', 'If that were true, the rule would force the second fact. But it is false.'], unk(P)], { s: 'If the first fact were true for ' + nm + ', the second would follow. The second is false, so the first is false too.' });
      return choice(r, rule + nm + ' ' + nP + '. Which must be true?', unk(Q), [[nm + ' ' + nQ + '.', 'The rule says nothing about people who do not meet the first fact.'], [nm + ' ' + Q + '.', 'That is not forced. The rule only starts from the first fact.']], { s: 'The rule only speaks about people who meet the first fact.' });
    }),
    tpl('count', (r) => {
      const n = r.pick([9, 10, 12, 15, 16]);
      const pool = [['is even', (x) => x % 2 === 0], ['is odd', (x) => x % 2 === 1], ['is a multiple of 3', (x) => x % 3 === 0], ['is a multiple of 4', (x) => x % 4 === 0], ['is a multiple of 5', (x) => x % 5 === 0], ['is more than ' + r.int(3, 8), null], ['is less than ' + r.int(7, 12), null]];
      pool[5][1] = (x) => x > Number(pool[5][0].split(' ').pop()); pool[6][1] = (x) => x < Number(pool[6][0].split(' ').pop());
      const pick3 = r.shuffle(pool).slice(0, 3); const k = r.pick([1, 2]);
      let c = 0; for (let x = 1; x <= n; x++) if (pick3.filter((s) => s[1](x)).length === k) c++;
      return N('Three statements about a whole number N from 1 to ' + n + ': (A) N ' + pick3[0][0] + '. (B) N ' + pick3[1][0] + '. (C) N ' + pick3[2][0] + '. For how many values of N ' + (k === 1 ? 'is exactly 1 statement true?' : 'are exactly 2 statements true?'), c, { s: 'Test every number from 1 to ' + n + ' and count the true statements. ' + c + (c === 1 ? ' number has' : ' numbers have') + ' exactly ' + k + '.' });
    }),
    tpl('secret', (r) => {
      const X = r.int(12, 60); const all = []; for (let i = 1; i <= 60; i++) all.push(i);
      const pool = [];
      for (const m of [2, 3, 4, 5, 6, 7, 9]) pool.push(X % m === 0 ? { t: 'It is a multiple of ' + m + '.', f: (v) => v % m === 0 } : { t: 'It is not a multiple of ' + m + '.', f: (v) => v % m !== 0 });
      for (const a of [r.int(1, X - 1), r.int(1, X - 1)]) pool.push({ t: 'It is more than ' + a + '.', f: (v) => v > a });
      for (const b of [X + r.int(1, 12), X + r.int(1, 12)].filter((b) => b <= 61)) pool.push({ t: 'It is less than ' + b + '.', f: (v) => v < b });
      const ds = (v) => String(v).split('').reduce((a, d) => a + Number(d), 0);
      pool.push({ t: 'Its digits add to ' + ds(X) + '.', f: (v) => ds(v) === ds(X) });
      pool.push({ t: 'It ends in ' + (X % 10) + '.', f: (v) => v % 10 === X % 10 });
      const cl = minimal(all, pool.filter((c) => c.f(X)), r);
      return N('I am thinking of a whole number from 1 to 60. ' + cl.map((c) => c.t).join(' ') + ' What is my number?', X, { s: 'Cross out every number that breaks a clue. Only ' + X + ' is left.' });
    }),
    tpl('boxes', (r) => {
      const cols = r.shuffle(['red', 'blue', 'green', 'yellow']); const all = perms(['red', 'blue', 'green', 'yellow']);
      const pos = (s, c) => s.indexOf(c);
      const pool = [];
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (i !== j) {
        const a = cols[i], b = cols[j];
        if (pos(cols, a) < pos(cols, b)) pool.push({ t: 'The ' + a + ' ball is left of the ' + b + ' ball.', f: (s) => pos(s, a) < pos(s, b) });
        if (Math.abs(pos(cols, a) - pos(cols, b)) === 1 && i < j) pool.push({ t: 'The ' + a + ' ball is next to the ' + b + ' ball.', f: (s) => Math.abs(pos(s, a) - pos(s, b)) === 1 });
        if (Math.abs(pos(cols, a) - pos(cols, b)) !== 1 && i < j) pool.push({ t: 'The ' + a + ' ball is not next to the ' + b + ' ball.', f: (s) => Math.abs(pos(s, a) - pos(s, b)) !== 1 });
      }
      for (const c of cols) { const k = pos(cols, c); if (k === 0 || k === 3) pool.push({ t: 'The ' + c + ' ball is in an end box.', f: (s) => [0, 3].includes(pos(s, c)) }); else pool.push({ t: 'The ' + c + ' ball is not in an end box.', f: (s) => ![0, 3].includes(pos(s, c)) }); }
      const cl = minimal(all, pool, r); const k = r.int(0, 3);
      return T('Four balls (red, blue, green, yellow) sit in four boxes in a row, numbered 1 to 4 from the left. "Left of" means somewhere to the left, not always right beside. ' + cl.map((c) => c.t).join(' ') + ' What color is in box ' + (k + 1) + '?', [cols[k]], { s: 'The only order that fits every clue is ' + cols.join(', ') + '. Box ' + (k + 1) + ' holds ' + cols[k] + '.' });
    }),
  ],
});
