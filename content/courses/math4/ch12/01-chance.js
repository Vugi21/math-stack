import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, text } from '../../../../src/content/dsl.js';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const COL = ['red', 'blue', 'green', 'yellow', 'white', 'black'];

export default lesson({
  id: 'm4-12-1-chance',
  title: 'Chance',
  blurb: 'Describe how likely things are: certain, impossible, likely, unlikely, equally likely. Compare chances and decide if a game is fair.',
  concepts: ['likelihood', 'equally-likely', 'fair-games'],

  tryFirst: [
    mc('t1', 'A bag holds 1 red marble and 9 blue marbles. You pick one without looking. Which sentence is true?', ['Picking red is certain.', 'Picking blue is likely, and picking red is unlikely.', 'Red and blue are equally likely.', 'Picking blue is impossible.'], 1, {
      h: ['Count how many marbles are red and how many are blue.', 'Is red possible? Is it likely?'],
      s: 'There are 9 blue marbles and 1 red marble. Blue will come out most of the time, so it is likely. Red can happen, but only 1 time in 10, so it is unlikely.',
      w: [[0, 'Certain means it must happen. A blue marble could come out.'], [2, 'There are 9 blue and 1 red. They are not equal.'], [3, 'Impossible means it cannot happen. There are blue marbles in the bag.']],
    }),
    num('t2', 'A bag has 4 red marbles and 10 blue marbles. How many red marbles must you add so that red and blue are equally likely?', 6, {
      h: ['Equally likely means the bag has the same number of each color.', 'How many more red marbles does it need to match the blue?'],
      s: 'You need as many red marbles as blue. 10 − 4 = 6 more red marbles.',
      w: [['14', 'That is how many marbles there are now. Count how many more red ones you need.'], ['4', 'You do not add as many as there are red already. Add enough to match the 10 blue.']],
    }),
  ],

  learn: [
    p('Some things <b>must</b> happen. Some <b>cannot</b> happen. Many things fall in between. Words help us say how likely something is.'),
    tbl(['Word', 'Meaning', 'Example'], [['Certain', 'It must happen.', 'A bag of only red marbles: you pick red.'], ['Impossible', 'It cannot happen.', 'The same bag: you pick blue.'], ['Likely', 'It will probably happen.', '9 red and 1 blue: you pick red.'], ['Unlikely', 'It probably will not happen.', '9 red and 1 blue: you pick blue.'], ['Equally likely', 'Same chance each.', '5 red and 5 blue: red or blue.']], 'Chance words'),
    rule('<b>Equally likely.</b> Two results are equally likely when each has the same number of ways to happen. For a bag, count marbles of each color. For a spinner, count equal slices.'),
    widget('spinner', { s0: 4, s1: 2, s2: 0 }),
    p('The spinner has 6 equal slices. Four are blue and two are yellow. Blue is more likely than yellow, but yellow still can happen. Spin 20 times and watch. The tally will not match exactly.'),
    ex('Which bag is better for red?', ['Bag A has 3 red marbles out of 5. Bag B has 4 red marbles out of 7.', 'A bag with more red marbles is not always better. The bag sizes are different.', 'Compare the fractions: {3/5} and {4/7}. Use 35 as the bottom number.', '{3/5} = {21/35} and {4/7} = {20/35}.', '21 is more than 20, so Bag A gives the better chance.']),
    rule('<b>Fair.</b> A game is fair if every player has the same chance to win. In a fair game with two players, each player wins on half of the equally likely results.'),
    warn('<b>Two choices are not always 50-50.</b> "I win or I lose" are two results, but they are not equally likely when one has more ways. A spinner with 5 red slices and 1 blue slice lands on red or blue, but not 50-50.'),
    mcq('Ben says: "A bag has 2 red marbles and 6 blue ones. Picking red or blue are the only two results, so each has the same chance." What is wrong?', ['Nothing is wrong.', 'Blue has 6 ways to come out and red has only 2. The results are not equally likely.', 'Marbles cannot be compared.'], 1, 'Count the ways. Blue can come out 6 ways. Red can come out only 2 ways. More ways means more likely.', 'Spot the mistake'),
  ],

  practice: [
    mc('p1', 'A spinner has 8 equal slices: 7 are red and 1 is blue. Which sentence is NOT true?', ['Red is likely.', 'Blue is unlikely.', 'Landing on blue is impossible.', 'Landing on red is more likely than blue.'], 2, {
      h: ['Impossible means it cannot happen. Is there a blue slice?'],
      s: 'There is a blue slice, so blue can happen. It is unlikely, but not impossible.',
      w: [[0, 'That sentence is true. Red has 7 of the 8 slices.'], [3, 'That sentence is true. 7 slices beat 1 slice.']],
    }),
    num('p2', 'A bag has 3 red marbles and 9 blue marbles. How many blue marbles must be taken out so that red and blue are equally likely?', 6, {
      h: ['Equally likely means the same count of each color.', 'How many blue marbles are there more than red?'],
      s: 'Red has 3. Blue should also have 3. 9 − 3 = 6 blue marbles must come out.',
      w: [['3', 'That is how many are left. How many must come out?'], ['12', 'That is the total. Count only the blue ones you must remove.']],
    }),
    mc('p3', 'Bag A has 2 red marbles out of 5. Bag B has 3 red marbles out of 8. Bag C has 5 red marbles out of 12. Which bag gives the best chance of picking red?', ['Bag A', 'Bag B', 'Bag C', 'They are all equally good.'], 2, {
      h: ['Compare the fractions {2/5}, {3/8} and {5/12}. Use the common bottom number 120.'],
      s: '{2/5} = {48/120}, {3/8} = {45/120}, {5/12} = {50/120}. Bag C has the largest.',
      w: [[0, 'Bag A is {48/120}. Bag C is {50/120}, which is more.'], [1, 'Bag B is the smallest of the three.'], [3, 'The fractions are different when written with the same bottom number.']],
    }),
    num('p4', 'A fair die is rolled. Ava wins if the number is a multiple of 3. Ben wins if it is not. How many more numbers would have to count as wins for Ava to make the game fair?', 1, {
      h: ['List the multiples of 3 on a die. How many numbers does Ava have?', 'A fair game needs 3 numbers for each player.'],
      s: 'Ava wins on 3 and 6, which is 2 numbers. Ben wins on 1, 2, 4 and 5, which is 4 numbers. A fair game gives each player 3 numbers. Ava needs 1 more.',
      w: [['2', 'Ava already has 2 numbers. She needs 3 in all.'], ['0', 'Ava has 2 numbers and Ben has 4. That is not fair.']],
    }),
    mc('p5', 'Twenty tickets are numbered 1 to 20 and one is drawn. Which is more likely?', ['A multiple of 3', 'A multiple of 4', 'Both are equally likely'], 0, {
      h: ['List the multiples of 3 up to 20. Then the multiples of 4.'],
      s: 'Multiples of 3: 3, 6, 9, 12, 15, 18, which is 6 tickets. Multiples of 4: 4, 8, 12, 16, 20, which is 5 tickets. 6 is more than 5.',
      w: [[1, 'Multiples of 4 are 4, 8, 12, 16, 20. That is only 5 tickets.'], [2, 'Count each list. The counts are 6 and 5.']],
    }),
    num('p6', 'A bag holds 12 marbles, red, blue and green. Red is twice as likely as blue. Green is three times as likely as blue. How many red marbles are in the bag?', 4, {
      h: ['If there are b blue marbles, how many red? How many green?', 'Add them all up and set the total equal to 12.'],
      s: 'Blue is b. Red is 2 × b and green is 3 × b. The total is b + 2b + 3b = 6b = 12, so b = 2. Red is 2 × 2 = 4.',
      w: [['2', 'That is the number of blue marbles. Red is twice as many.'], ['6', 'That is the number of green marbles.']],
    }),
    mc('p7', 'A bag has 5 red marbles and 5 blue marbles. You take out one red marble and do not put it back. Now you pick one more marble. What is true?', ['Red is more likely.', 'Blue is more likely.', 'Red and blue are equally likely.'], 1, {
      h: ['Count the marbles left of each color.'],
      s: 'The bag now has 4 red and 5 blue. Blue has more marbles, so blue is more likely.',
      w: [[0, 'Red lost a marble. There are 4 red and 5 blue now.'], [2, 'After one red is gone, the counts are 4 red and 5 blue.']],
    }),
  ],

  challenge: [
    chain('Two bags', 'Bag A has 3 red marbles and 7 blue marbles. Bag B has 6 red marbles and 9 blue marbles. You want to pick red.', [
      num('c1a', 'What fraction of Bag A is red? Give the answer in simplest form.', '3/10', { h: ['How many marbles are in Bag A?'], s: 'There are 3 + 7 = 10 marbles and 3 are red: {3/10}.' }),
      num('c1b', 'What fraction of Bag B is red? Give the answer in simplest form.', '2/5', { h: ['Bag B has 15 marbles.'], s: '6 red out of 15 is {6/15}, which is {2/5} in simplest form.' }),
      num('c1c', 'How many red marbles must you add to Bag A so that Bag A gives a better chance of red than Bag B? Give the smallest number.', 2, { h: ['Try adding 1 red marble: Bag A becomes 4 red out of 11. Compare with {2/5}.', 'Try 2 red marbles.'], s: 'Adding 1 gives {4/11}, which is a little less than {2/5} ({20/55} against {22/55}). Adding 2 gives {5/12}, and {5/12} = {25/60} is more than {2/5} = {24/60}. So the smallest number is 2.' }),
    ], 'The idea: to compare chances, compare the fractions. Bigger fraction means more likely.'),
    chain('The spinner game', 'A spinner has 12 equal slices: 5 red, 4 blue and 3 green. Ava wins on red. Ben wins on blue or green.', [
      num('c2a', 'On how many slices does Ben win?', 7, { h: ['Add the blue and green slices.'], s: '4 + 3 = 7 slices.' }),
      text('c2b', 'Who is more likely to win, Ava or Ben?', ['Ben'], { h: ['Compare 5 slices with 7 slices.'], s: 'Ben has 7 slices and Ava has 5, so Ben is more likely to win.' }),
      num('c2c', 'Ava wants to make the game fair by repainting some of Ben\'s slices red. How many must she repaint?', 1, { h: ['A fair game gives each player 6 slices.'], s: 'Each player should have 6 slices. Ava has 5, so she needs 1 more. Repaint 1 of Ben\'s slices red.' }),
    ], 'The idea: a game is fair when both players have the same number of the equally likely results.'),
    mc('c3', 'Find the error. Mia says: "A bag has 3 red, 2 blue and 1 green marble. There are 3 colors, so each color is equally likely." Which reply is correct?', ['Mia is right.', 'The colors have different numbers of marbles: red has 3 ways, blue 2, green 1. They are not equally likely.', 'Green is the most likely.', 'Red is impossible.'], 1, {
      s: 'Equally likely needs the same number of marbles of each color. Here the counts are 3, 2 and 1.',
      w: [[0, 'Count the marbles of each color. They are not the same.'], [2, 'Green has only 1 marble. It is the least likely.']],
    }),
  ],

  quiz: [
    tpl('most', (r) => {
      const cs = r.shuffle(COL).slice(0, 3); const n = r.distinct(3, 1, 9);
      const top = n.indexOf(Math.max(...n));
      return choice(r, 'A bag has ' + n.map((k, i) => k + ' ' + cs[i]).join(', ').replace(/, ([^,]*)$/, ' and $1') + ' marbles. You pick one without looking. Which color are you most likely to pick?', cs[top], cs.filter((_, i) => i !== top), { s: cs[top] + ' has the most marbles (' + n[top] + '), so it is the most likely.' });
    }),
    tpl('equalize', (r) => {
      const a = r.int(2, 9), b = a + r.int(2, 12); const cs = r.shuffle(COL).slice(0, 2); const add = r.bool();
      return add ? N('A bag has ' + a + ' ' + cs[0] + ' marbles and ' + b + ' ' + cs[1] + ' marbles. How many ' + cs[0] + ' marbles must be added so that both colors are equally likely?', b - a, { s: 'Equally likely means the same number of each. ' + b + ' − ' + a + ' = ' + (b - a) + '.', w: [[a + b, 'That is the total. Count how many more of ' + cs[0] + ' you need.']].filter((z) => z[0] !== b - a) })
        : N('A bag has ' + a + ' ' + cs[0] + ' marbles and ' + b + ' ' + cs[1] + ' marbles. How many ' + cs[1] + ' marbles must be taken out so that both colors are equally likely?', b - a, { s: 'Equally likely means the same number of each. ' + b + ' − ' + a + ' = ' + (b - a) + '.', w: [[a, 'That is how many are left. How many must come out?']].filter((z) => z[0] !== b - a) });
    }),
    tpl('bags', (r) => {
      for (;;) {
        const t1 = r.int(4, 12), t2 = r.int(4, 12), a = r.int(1, t1 - 1), b = r.int(1, t2 - 1);
        if (t1 === t2) continue;
        const x = a * t2, y = b * t1; const ans = x > y ? 'Bag A' : x < y ? 'Bag B' : 'They are equally good.';
        return choice(r, 'Bag A has ' + a + ' red marbles out of ' + t1 + '. Bag B has ' + b + ' red marbles out of ' + t2 + '. Which bag gives the better chance of picking red?', ans, ['Bag A', 'Bag B', 'They are equally good.'].filter((z) => z !== ans), { s: 'Compare {' + a + '/' + t1 + '} and {' + b + '/' + t2 + '}. Over the common bottom number ' + (t1 * t2) + ': {' + x + '/' + (t1 * t2) + '} and {' + y + '/' + (t1 * t2) + '}. ' + (x === y ? 'They are equal.' : ans + ' is larger.') });
      }
    }),
    tpl('word', (r) => {
      const cs = r.shuffle(COL).slice(0, 2); const t = r.pick([2, 4, 6, 8, 10]);
      const kind = r.int(0, 4);
      const n1 = kind === 0 ? 0 : kind === 1 ? t : kind === 2 ? t / 2 : kind === 3 ? r.int(Math.floor(t / 2) + 1, t - 1) : r.int(1, Math.ceil(t / 2) - 1);
      const right = n1 === 0 ? 'impossible' : n1 === t ? 'certain' : n1 * 2 === t ? 'equally likely as the other color' : n1 * 2 > t ? 'likely' : 'unlikely';
      const all = ['impossible', 'certain', 'likely', 'unlikely', 'equally likely as the other color'];
      const mb = (k, c) => k + ' ' + c + (k === 1 ? ' marble' : ' marbles');
      const bag = n1 === t ? mb(t, cs[0]) : n1 === 0 ? mb(t, cs[1]) : mb(n1, cs[0]) + ' and ' + mb(t - n1, cs[1]);
      return choice(r, 'A bag holds ' + bag + '. You pick one without looking. Picking a ' + cs[0] + ' marble is...', right, all.filter((z) => z !== right).slice(0, 3), { s: 'Count the ' + cs[0] + ' marbles: ' + n1 + ' out of ' + t + '. That makes it ' + right + '.' });
    }),
    tpl('fair', (r) => {
      const n = r.pick([6, 8, 10, 12]); const a = r.int(1, n - 1);
      const who = r.pick([['Ava', 'Ben'], ['Dev', 'Elena'], ['Kira', 'Leo']]);
      const right = a * 2 === n ? 'The game is fair.' : a * 2 > n ? 'The game favors ' + who[0] + '.' : 'The game favors ' + who[1] + '.';
      const all = ['The game is fair.', 'The game favors ' + who[0] + '.', 'The game favors ' + who[1] + '.'];
      return choice(r, 'A spinner has ' + n + ' equal slices. ' + who[0] + ' wins on ' + a + ' of the slices. ' + who[1] + ' wins on the other ' + (n - a) + (n - a === 1 ? ' slice' : ' slices') + '. Which is true?', right, all.filter((z) => z !== right), { s: who[0] + ' has ' + a + (a === 1 ? ' slice' : ' slices') + ' and ' + who[1] + ' has ' + (n - a) + (n - a === 1 ? ' slice' : ' slices') + '. ' + (a * 2 === n ? 'They are the same, so it is fair.' : 'The one with more slices is favored.') });
    }),
    tpl('times', (r) => {
      const b = r.int(2, 6), k = r.int(2, 4), m = r.int(2, 4); const cs = r.shuffle(COL).slice(0, 3); const T = b * (1 + k + m); const pick = r.int(0, 1);
      return N('A bag has ' + T + ' marbles: ' + cs[0] + ', ' + cs[1] + ' and ' + cs[2] + '. A ' + cs[1] + ' marble is ' + k + ' times as likely as a ' + cs[0] + ' marble. A ' + cs[2] + ' marble is ' + m + ' times as likely as a ' + cs[0] + ' marble. How many ' + cs[pick === 0 ? 1 : 2] + ' marbles are in the bag?', pick === 0 ? k * b : m * b, { s: 'If there are ' + b + ' ' + cs[0] + ' marbles, then ' + (k * b) + ' ' + cs[1] + ' and ' + (m * b) + ' ' + cs[2] + '. Check: ' + b + ' + ' + (k * b) + ' + ' + (m * b) + ' = ' + T + '. So the answer is ' + (pick === 0 ? k * b : m * b) + '.' });
    }),
    tpl('nextpick', (r) => {
      const a = r.int(3, 9), b = r.int(3, 9); const cs = r.shuffle(COL).slice(0, 2); const out = r.int(0, 1);
      const na = a - (out === 0 ? 1 : 0), nb = b - (out === 1 ? 1 : 0);
      const right = na > nb ? cs[0] + ' is more likely.' : na < nb ? cs[1] + ' is more likely.' : 'They are equally likely.';
      const all = [cs[0] + ' is more likely.', cs[1] + ' is more likely.', 'They are equally likely.'];
      return choice(r, 'A bag has ' + a + ' ' + cs[0] + ' marbles and ' + b + ' ' + cs[1] + ' marbles. You take out one ' + cs[out] + ' marble and do not put it back. You pick another marble. Which is true?', right, all.filter((z) => z !== right), { s: 'Now there are ' + na + ' ' + cs[0] + ' and ' + nb + ' ' + cs[1] + '. ' + (na === nb ? 'The counts are equal.' : 'The color with more marbles is more likely.') });
    }),
  ],
});
