import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const wr = (ans, list) => {
  const seen = new Set([ans]);
  return list.filter(([a]) => { if (seen.has(a) || a < 0) return false; seen.add(a); return true; });
};
const pr = (n) => (n * (n - 1)) / 2;

export default lesson({
  id: 'm4-4-5-counting-pairs',
  title: 'Counting pairs',
  blurb: 'Handshakes and tournaments: find how many pairs a group makes, and why the answer is n(n−1)/2.',
  concepts: ['pairs', 'handshakes', 'combinations'],

  tryFirst: [
    num('t1', 'Four friends meet. Every two friends shake hands once. How many handshakes are there in all?', 6, {
      h: ['Call them A, B, C, D. List the handshakes that involve A.', 'Then list the new ones that involve B but not A.'],
      s: 'A shakes with B, C, D (3). B shakes with C, D (2 new). C shakes with D (1 new). 3 + 2 + 1 = 6.',
      w: [['12', 'Shaking with B and B shaking with A is the same handshake. You counted every handshake twice.'], ['4', 'Each friend shakes hands with more than one person.']],
    }),
    num('t2', 'Five teams are in a league. Every team plays every other team exactly once. How many games are played?', 10, {
      h: ['Each team plays 4 games. But a game involves two teams.'],
      s: 'Each of the 5 teams plays 4 games, which is 20 team-games. A game has 2 teams, so 20 ÷ 2 = 10 games.',
      w: [['20', 'Each game was counted from both teams. Divide by 2.'], ['25', 'A team does not play itself. Each team plays 4 others.']],
    }),
  ],

  learn: [
    p('A <b>pair</b> is two things picked from a group. Here the order does not matter: the pair Ana and Ben is the same as Ben and Ana. A handshake is a pair of people.'),
    tbl(['People', 'Handshakes'], [['2', '1'], ['3', '3'], ['4', '6'], ['5', '10'], ['6', '15']], 'Count them, one new person at a time'),
    p('Look at the pattern. Going from 3 people to 4 people adds 3 handshakes. The new person shakes hands with all 3 people already there. From 4 to 5 adds 4. From 5 to 6 adds 5.'),
    rule('<b>Adding people.</b> With n people there are 1 + 2 + 3 + … + (n − 1) handshakes. The last person to arrive shakes with the (n − 1) people before.'),
    p('Here is a faster way. Each of n people shakes hands with n − 1 others. That is n × (n − 1) counted this way. But every handshake was counted twice, once from each person.'),
    widget('arrangements', { n: 6, k: 2, nlabel: 'people', klabel: 'people in the order' }),
    rule('<b>Pairs from a group.</b> The number of pairs among n different things is <b>n × (n − 1) ÷ 2</b>. The product n × (n − 1) counts <i>ordered</i> pairs, where (Ana, Ben) and (Ben, Ana) differ. Divide by 2 for pairs.'),
    ex('A tournament', ['8 teams, every team plays every other once.', 'Each team plays 7 games. 8 × 7 = 56 team-games.', 'Each game has 2 teams, so divide by 2.', '56 ÷ 2 = 28 games.', 'Check with adding: 7 + 6 + 5 + 4 + 3 + 2 + 1 = 28.']),
    warn('<b>Watch out.</b> If order matters, do not divide. A class picks a president and a vice president from 6 students. Ana as president and Ben as VP is different from Ben as president and Ana as VP. That is 6 × 5 = 30, not 15.'),
    mcq('Kai says: "9 teams each play each other once, so 9 × 8 = 72 games." What is wrong?', ['Nothing. 72 is right.', 'He counted every game twice, once from each team. The answer is 72 ÷ 2 = 36.', 'He should have used 9 + 8 = 17.'], 1, 'Each game has two teams. In 9 × 8, the game "team A plays team B" is counted from A and again from B. Divide by 2: 36 games.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'At a party of 7 people, every two people shake hands once. How many handshakes are there?', 21, {
      h: ['Each person shakes 6 hands. But each handshake was counted twice.'],
      s: '7 × 6 = 42, divided by 2 is 21.',
      w: [['42', 'Each handshake involves two people. You counted every one twice.'], ['49', 'A person does not shake their own hand.']],
    }),
    num('p2', '10 teams play in a league. Every team plays every other team twice, once at home and once away. How many games are there?', 90, {
      h: ['First count the games if each pair plays once.'],
      s: 'Once each: 10 × 9 ÷ 2 = 45. Twice: 45 × 2 = 90.',
      w: [['45', 'That is only one game per pair. Each pair plays twice.']],
    }),
    num('p3', 'There were 45 handshakes at a party. Everyone shook hands with everyone else once. How many people were there?', 10, {
      h: ['Use the table of pair counts: 3, 6, 10, 15, 21, 28, 36, 45.', 'Find 45 in that list. How many people go with it?'],
      s: 'The counts go 1, 3, 6, 10, 15, 21, 28, 36, 45 for 2, 3, 4, … people. 45 is the 9th count, which goes with 10 people. Check: 10 × 9 ÷ 2 = 45.',
      w: [['9', 'It is the 9th number in the list, but the list starts with 2 people. 9 people make 36 handshakes.']],
    }),
    num('p4', 'Two different numbers are picked from 1, 2, 3, 4, 5, 6. How many pairs have an even sum?', 6, {
      h: ['A sum is even when both numbers are even, or both are odd.', 'There are 3 even numbers and 3 odd numbers.'],
      s: 'Two evens: 2 + 4, 2 + 6, 4 + 6: 3 pairs. Two odds: 1 + 3, 1 + 5, 3 + 5: 3 pairs. 3 + 3 = 6.',
      w: [['15', 'That counts every pair. Some pairs have an odd sum.'], ['3', 'Count the pairs of odd numbers, too.']],
    }),
    num('p5', 'A class of 6 picks a president and a different vice president. How many different choices are there?', 30, {
      h: ['The jobs are different, so order matters.'],
      s: '6 choices for president, 5 for vice president. 6 × 5 = 30.',
      w: [['15', 'That is the number of pairs. Here Ana as president and Ben as VP is different from Ben as president and Ana as VP.']],
    }),
    num('p6', 'A hexagon has 6 corners. A diagonal joins two corners that are not next to each other. How many diagonals does it have?', 9, {
      h: ['How many segments join any two of the 6 corners?', 'Some of those segments are sides, not diagonals.'],
      s: 'All pairs of corners: 6 × 5 ÷ 2 = 15. 6 of the pairs are neighbors (the sides). 15 − 6 = 9.',
      w: [['15', 'That includes the 6 sides of the hexagon.'], ['18', 'Each corner has 3 diagonals, but each diagonal has two corners. Divide 18 by 2.']],
    }),
    num('p7', 'At a party, everyone shook hands with everyone except for 3 pairs of people, who did not shake. There were 42 handshakes. How many people were at the party?', 10, {
      h: ['If everyone had shaken, there would be 42 + 3 handshakes.'],
      s: 'If every pair had shaken, there would be 42 + 3 = 45 handshakes. 45 handshakes means 10 people.',
      w: [['9', '9 people make only 36 pairs, which is fewer than 42.'], ['11', '11 people make 55 pairs. That is 13 more than 42, not 3.']],
    }),
    num('p8', 'A group has 5 boys and 4 girls. How many pairs have two boys or two girls?', 16, {
      h: ['Count pairs of boys. Then pairs of girls. Add them.'],
      s: 'Boy pairs: 5 × 4 ÷ 2 = 10. Girl pairs: 4 × 3 ÷ 2 = 6. 10 + 6 = 16.',
      w: [['36', 'That is all pairs in the group of 9, including boy-girl pairs.'], ['20', 'That is the number of boy-girl pairs, 5 × 4.']],
    }),
  ],

  challenge: [
    chain('The league', '8 teams play in a league. Every team plays every other team once.', [
      num('c1a', 'How many games are played?', 28, { h: ['8 × 7 ÷ 2'], s: '8 × 7 ÷ 2 = 28.', w: [['56', 'Each game was counted from both teams.']] }),
      num('c1b', 'Now every team plays every other team twice. How many games?', 56, { h: ['Double the first answer.'], s: '28 × 2 = 56.' }),
      num('c1c', 'Games are played 4 at a time, one hour each. What is the least number of hours for all 56 games?', 14, { h: ['How many rounds of 4 games?'], s: '56 ÷ 4 = 14 hours.', w: [['56', 'Four games are played in each hour.']] }),
    ], 'The idea: n × (n − 1) counts ordered pairs, which is a league where each pair plays twice (home and away). Half of it is the one-game-each count.'),
    chain('One more guest', 'Guests arrive at a party one at a time. Each new guest shakes hands with everyone already there.', [
      num('c2a', 'After 6 guests have arrived, how many handshakes have happened in all?', 15, { h: ['The 2nd guest adds 1, the 3rd adds 2, and so on.'], s: '1 + 2 + 3 + 4 + 5 = 15.' }),
      num('c2b', 'A 7th guest arrives. How many handshakes are added, and how many in all?  Give the total.', 21, { h: ['The 7th guest shakes hands with 6 people.'], s: '15 + 6 = 21.', w: [['6', 'That is the new handshakes. The question asks for the total.']] }),
      num('c2c', 'Use the pattern to find the total for 12 guests.', 66, { h: ['1 + 2 + 3 + … + 11. Or 12 × 11 ÷ 2.'], s: '1 + 2 + … + 11 = 66. Check: 12 × 11 ÷ 2 = 66.', w: [['132', 'That is 12 × 11. Each handshake is counted twice in that.']] }),
    ], 'The idea: adding guests one by one gives 1 + 2 + … + (n − 1). Counting from each person gives n × (n − 1) ÷ 2. They are the same number.'),
    mc('c3', 'Find the error. A club has 12 members. Nico says: "To choose a captain and a helper, there are 12 × 11 ÷ 2 = 66 ways." Which best describes the mistake?', ['The jobs are different, so order matters. The count is 12 × 11 = 132, with no division.', 'He should have used 12 + 11 = 23.', 'The correct count is 12 × 12 = 144.', 'Nothing is wrong.'], 0, {
      s: 'A captain and a helper are different jobs. "Ana is captain, Ben is helper" differs from "Ben is captain, Ana is helper". Divide by 2 only when order does not matter.',
      w: [[1, 'The two jobs happen one after another, so multiply.'], [2, 'The captain cannot also be the helper, so the helper has 11 choices.'], [3, 'Dividing by 2 treats the two orders as the same. Here they differ.']],
    }),
  ],

  quiz: [
    tpl('shake', (r) => {
      const n = r.int(4, 30), what = r.pick(['people at a party shake hands', 'players in a chess club play one game', 'children in a class trade cards']), noun = what.indexOf('shake') > 0 ? 'handshakes' : what.indexOf('play') > 0 ? 'games' : 'trades';
      return N(n + ' ' + what + ' with each other person once. How many ' + noun + ' happen?', pr(n), { s: n + ' × ' + (n - 1) + ' = ' + n * (n - 1) + ' counts each twice. ' + n * (n - 1) + ' ÷ 2 = ' + pr(n) + '.', w: wr(pr(n), [[n * (n - 1), 'Each pair was counted twice. Divide by 2.']]) });
    }),
    tpl('double', (r) => {
      const n = r.int(4, 14), w = r.pick(['teams are in a league', 'chess players are in a club', 'clubs are in a school league']);
      return N(n + ' ' + w + '. Each plays every other one twice. How many games are played?', n * (n - 1), { s: 'One game per pair: ' + pr(n) + '. Twice: ' + n * (n - 1) + '.', w: wr(n * (n - 1), [[pr(n), 'Each pair plays twice.']]) });
    }),
    tpl('findn', (r) => {
      const n = r.int(5, 40), w = r.pick(['handshakes happened. Everyone shook hands with everyone else once.', 'games were played. Every player played every other player once.', 'high-fives happened. Every two people high-fived exactly once.']);
      return N(pr(n) + ' ' + w + ' How many people were there?', n, { s: n + ' people make ' + n + ' × ' + (n - 1) + ' ÷ 2 = ' + pr(n) + ' handshakes.', w: wr(n, [[n - 1, 'The pair counts start at 1 for 2 people. Check n × (n − 1) ÷ 2.'], [n + 1, 'Check ' + (n + 1) + ' people: that makes ' + pr(n + 1) + ' handshakes.']]) });
    }),
    tpl('missing', (r) => {
      const n = r.int(5, 20), k = r.int(1, 5);
      return N('At a party of ' + n + ' people everyone shakes hands with everyone, except for ' + k + (k === 1 ? ' pair who do' : ' pairs who do') + ' not. How many handshakes happen?', pr(n) - k, { s: 'All pairs: ' + pr(n) + '. Take away ' + k + ': ' + (pr(n) - k) + '.', w: wr(pr(n) - k, [[pr(n), 'Remember the pairs who do not shake.']]) });
    }),
    tpl('boygirl', (r) => {
      const a = r.int(3, 9), b = r.int(3, 9);
      const same = pr(a) + pr(b);
      return N('A group has ' + a + ' boys and ' + b + ' girls. How many pairs are two boys or two girls?', same, { s: 'Boy pairs: ' + pr(a) + '. Girl pairs: ' + pr(b) + '. Total ' + same + '.', w: wr(same, [[a * b, 'That is the number of boy-girl pairs.'], [pr(a + b), 'That counts every pair, including boy-girl pairs.']]) });
    }),
    tpl('diag', (r) => {
      const n = r.int(5, 40), ans = (n * (n - 3)) / 2;
      return N('A shape has ' + n + ' corners. A diagonal joins two corners that are not neighbors. How many diagonals does it have?', ans, { s: 'All pairs: ' + pr(n) + '. Sides: ' + n + '. Diagonals: ' + pr(n) + ' − ' + n + ' = ' + ans + '.', w: wr(ans, [[pr(n), 'That includes the ' + n + ' sides.']]) });
    }),
    tpl('officers', (r) => {
      const n = r.int(5, 40), who = r.pick(['children', 'players', 'students']);
      return N('A club of ' + n + ' ' + who + ' picks a captain and a different helper. How many choices are there?', n * (n - 1), { s: 'The jobs are different. ' + n + ' choices for captain, ' + (n - 1) + ' for helper: ' + n * (n - 1) + '.', w: wr(n * (n - 1), [[pr(n), 'The jobs differ, so do not divide by 2.']]) });
    }),
    tpl('gamehours', (r) => {
      const n = r.int(6, 24), f = r.pick([2, 3, 4, 5]);
      const g = pr(n);
      if (g % f) return N('A league has ' + n + ' teams. Every team plays each other team once. How many games?', g, { s: n + ' × ' + (n - 1) + ' ÷ 2 = ' + g + '.' });
      return N('A league has ' + n + ' teams. Every team plays each other team once. ' + f + ' games are played at a time. How many rounds are needed?', g / f, { s: 'Games: ' + g + '. Rounds: ' + g + ' ÷ ' + f + ' = ' + g / f + '.', w: wr(g / f, [[g, 'Several games are played in each round.']]) });
    }),
  ],
});
