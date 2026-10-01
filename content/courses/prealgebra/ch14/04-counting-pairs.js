import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => Number(x[0]) !== Number(ans));
const c2 = (n) => (n * (n - 1)) / 2;
const c3 = (n) => (n * (n - 1) * (n - 2)) / 6;

export default lesson({
  id: 'pre-14-4-counting-pairs',
  title: 'Counting pairs and groups',
  blurb: 'Handshakes, round-robins and committees: when order does not matter, count the ordered ways and divide.',
  concepts: ['pairs', 'handshake-problem', 'combinations'],

  tryFirst: [
    num('t1', 'Six people meet at a party. Every two people shake hands exactly once. How many handshakes happen in total?', 15, {
      h: ['Take one person: how many hands do they shake? Do the same for each person, but notice a handshake involves two people.', 'Try smaller parties of 2, 3, 4 people to see a pattern.'],
      s: 'Each of the 6 people shakes 5 hands, giving 6 × 5 = 30 "hand-shakes". But each handshake belongs to two people, so it was counted twice. 30 ÷ 2 = 15.',
      w: [['30', 'That counts each handshake from both people\'s point of view. Each handshake was counted twice.'], ['36', 'A person does not shake their own hand, and each handshake is only one event.']],
    }),
    num('t2', 'From 5 friends you must choose 2 to come to the movies with you (just a pair, no special roles). How many different pairs can you pick?', 10, {
      h: ['If the two picks had different roles (first pick, second pick), how many ways would there be?', 'Is "Ana and Bo" the same group as "Bo and Ana"?'],
      s: 'Picking the first then the second: 5 × 4 = 20 ordered ways. But each pair was counted in both orders, so divide by 2: 10 pairs.',
      w: [['20', 'That treats "Ana then Bo" and "Bo then Ana" as different. A pair of friends is the same group in either order.']],
    }),
  ],

  learn: [
    p('Last lesson, <i>order mattered</i>: gold-then-silver is different from silver-then-gold. Sometimes order does not matter. A handshake between Ana and Bo is the same as a handshake between Bo and Ana. We are counting <b>groups</b>.'),
    rule('<b>The ordered-then-divide trick.</b> Count the ordered ways first (the multiplication principle). Each group was counted once for every order it can be written in. So divide by the number of orders.'),
    rule('<b>Pairs.</b> The number of ways to choose 2 things from n different things, ignoring order, is <b>n × (n − 1) ÷ 2</b>. This is also the number of handshakes among n people, and the number of games in a round robin where every two teams play once.'),
    widget('arrangements', { n: 6, k: 2, nlabel: 'people', klabel: 'in the pair' }),
    p('The picture shows the ordered count: 6 × 5 = 30. Every pair appears twice (Ana-Bo, Bo-Ana), so the number of pairs is 30 ÷ 2 = 15.'),
    tbl(['People n', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['Pairs', '1', '3', '6', '10', '15', '21', '28', '36', '45']], 'Each new person adds n−1 new pairs'),
    ex('Triples', ['How many ways to choose a group of 3 from 6 people?', 'Ordered picks: 6 × 5 × 4 = 120.', 'A group of 3 can be written in 3 × 2 × 1 = 6 orders.', '120 ÷ 6 = 20 groups.']),
    ex('Diagonals', ['How many diagonals does a hexagon have? (A diagonal joins two corners that are not neighbors.)', 'Pairs of corners: 6 × 5 ÷ 2 = 15 segments.', 'But 6 of those are the sides of the hexagon.', '15 − 6 = 9 diagonals.']),
    warn('<b>Order or no order?</b> Ask: "If I swap the two picks, do I get a different outcome?" President and vice-president: yes (n × (n−1)). A pair of co-captains: no (n × (n−1) ÷ 2). Reading the situation is the hard part of the problem.'),
    mcq('Ava counts handshakes among 5 people: "Each of 5 people shakes 4 hands, so 5 × 4 = 20." What did she forget?', ['Nothing, 20 is right.', 'Each handshake involves two people, so it was counted twice. The answer is 20 ÷ 2 = 10.', 'She should have added 5 + 4 = 9.'], 1, 'Counting each person\'s handshakes counts every handshake twice (once for each of the two people). Divide by 2: 10.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Eight people at a party each shake hands with every other person once. How many handshakes are there?', 28, {
      h: ['8 × 7, then divide by 2.'],
      s: '8 × 7 = 56 counts each handshake twice, so 56 ÷ 2 = 28.',
      w: [['56', 'That counts each handshake twice. Divide by 2.']],
    }),
    num('p2', 'In a tournament of 10 teams, every two teams play each other exactly once. How many games are played?', 45, {
      h: ['A game is a pair of teams.'],
      s: '10 × 9 ÷ 2 = 45.',
      w: [['90', 'That counts "A plays B" and "B plays A" as two different games. They are the same game.']],
    }),
    num('p3', 'A club of 8 members elects a president and a vice-president (two different people, and the jobs are different). In how many ways can this be done?', 56, {
      h: ['Does order matter here?'],
      s: 'The jobs are different, so order matters: 8 choices for president, 7 for vice-president: 8 × 7 = 56.',
      w: [['28', 'That would be right for choosing a pair with no roles. Here swapping the two people gives a different result.']],
    }),
    num('p4', 'How many different groups of 3 students can be chosen from 6 students?', 20, {
      h: ['Count the ordered picks, then divide by the number of orders of 3 people.'],
      s: '6 × 5 × 4 = 120 ordered picks. Each group of 3 appears in 3 × 2 × 1 = 6 orders. 120 ÷ 6 = 20.',
      w: [['120', 'That counts every order separately. Divide by the 6 orders of the 3 chosen students.'], ['60', 'Dividing by 2 only removes the order of two items. Three chosen students can be ordered 6 ways.']],
    }),
    num('p5', 'How many diagonals does a polygon with 8 sides have? (A diagonal joins two corners that are not neighbors.)', 20, {
      h: ['Count all segments between corners, then remove the sides.'],
      s: 'Pairs of corners: 8 × 7 ÷ 2 = 28. Remove the 8 sides: 28 − 8 = 20.',
      w: [['28', 'That includes the 8 sides of the polygon. A diagonal must join non-neighbors.']],
    }),
    num('p6', 'Seven points are marked on a page with no three on a straight line. How many different triangles have all three corners at marked points?', 35, {
      h: ['A triangle is a group of 3 points: order does not matter.'],
      s: '7 × 6 × 5 = 210 ordered picks, divided by 3 × 2 × 1 = 6 gives 35.',
      w: [['210', 'That counts the same triangle once for each order of its corners.'], ['21', 'That is the number of segments (pairs). A triangle needs 3 points.']],
    }),
    num('p7', 'At a party everyone shook hands with everyone else exactly once, and there were 66 handshakes in total. How many people were at the party?', 12, {
      h: ['The count for n people is n × (n−1) ÷ 2. So n × (n−1) must be 132.', 'Look for two consecutive whole numbers that multiply to 132.'],
      s: 'n × (n − 1) = 132. Since 12 × 11 = 132, n = 12.',
      w: [['66', 'That is the number of handshakes. Find the number of people n with n × (n−1) ÷ 2 = 66.'], ['11', 'Check: 11 people give 11 × 10 ÷ 2 = 55 handshakes, not 66.']],
    }),
  ],

  challenge: [
    chain('Club of seven', 'A club has 7 members.', [
      num('c1a', 'If every two members exchange one friendly message, how many messages are there?', 21, { h: ['7 × 6 ÷ 2.'], s: '42 ÷ 2 = 21.' }),
      num('c1b', 'In how many ways can the club pick a captain and a different vice-captain?', 42, { h: ['Order matters.'], s: '7 × 6 = 42.' }),
      num('c1c', 'In how many ways can it pick a committee of 3 (no roles)?', 35, { h: ['7 × 6 × 5, then divide by the number of orders of 3 people.'], s: '210 ÷ 6 = 35.' }),
    ], 'The idea: the same 7 people give 42 (ordered) or 21 (unordered pairs). Ordered ÷ (number of orders inside a group) gives the groups.'),
    chain('Mixed committee', 'A class has 5 boys and 4 girls. A committee of 3 will be chosen.', [
      num('c2a', 'How many different committees of 3 can be formed from all 9 students?', 84, { h: ['9 × 8 × 7 ÷ 6.'], s: '504 ÷ 6 = 84.' }),
      num('c2b', 'How many of those committees have only boys?', 10, { h: ['Choose 3 from 5 boys.'], s: '5 × 4 × 3 ÷ 6 = 10.' }),
      num('c2c', 'How many committees have at least one girl?', 74, { h: ['Subtract the all-boys committees from all committees.'], s: '84 − 10 = 74.', w: [['10', 'That is the number with no girls. The question asks for at least one girl.']] }),
    ], 'The idea: "at least one" is easiest by complement: total groups minus the groups with none.'),
    mc('c3', 'Find the error. Omar says: "A football league of 6 teams where every two teams play once has 6 × 5 = 30 games." What is wrong?', ['A game between A and B was counted twice (A–B and B–A). The correct count is 30 ÷ 2 = 15.', 'He should have added 6 + 5.', 'There is no mistake.', 'He should have divided by 6.'], 0, {
      s: 'A game is a pair of teams and order does not matter. 6 × 5 ÷ 2 = 15.',
      w: [[2, 'If each pair plays once, "A vs B" and "B vs A" are the same game.'], [1, 'Choices for pairs multiply, then we correct for order. Adding is not the right operation here.']],
    }),
  ],

  quiz: [
    tpl('shake', (r) => {
      const n = r.int(5, 40), q = r.pick([
        (k) => k + ' people at a party each shake hands with every other person exactly once. How many handshakes are there?',
        (k) => k + ' friends are in a group chat, and every two friends exchange exactly one private message. How many private messages are there?',
        (k) => k + ' chess players play in a tournament where every two players meet exactly once. How many games are played?',
        (k) => k + ' towns are to be joined so that every two towns have their own direct road. How many roads are needed?',
      ]);
      return N(q(n), c2(n), { s: n + ' × ' + (n - 1) + ' ÷ 2 = ' + c2(n) + '.', w: W(c2(n), [[n * (n - 1), 'That counts each pair twice. Divide by 2.']]) });
    }),
    tpl('back', (r) => {
      const n = r.int(6, 40), T = c2(n);
      return N('At a gathering every two people shook hands exactly once, for ' + T + ' handshakes in total. How many people were there?', n, { s: 'n × (n − 1) = ' + 2 * T + ', and ' + n + ' × ' + (n - 1) + ' = ' + 2 * T + ', so n = ' + n + '.', w: W(n, [[T, 'That is the number of handshakes. Find n with n × (n−1) ÷ 2 equal to it.'], [n - 1, 'Check: ' + (n - 1) + ' people give ' + c2(n - 1) + ' handshakes.']]) });
    }),
    tpl('ordered', (r) => {
      const n = r.int(4, 40);
      return N('A school club has ' + n + ' members. They elect a chair and a secretary, who must be different people. How many different ways can this be done?', n * (n - 1), { s: n + ' × ' + (n - 1) + ' = ' + n * (n - 1) + ' (order matters because the jobs differ).', w: [[c2(n), 'The two jobs are different, so swapping the people gives a different outcome. Do not divide by 2.']] });
    }),
    tpl('triple', (r) => {
      const n = r.int(5, 40);
      return N('How many ways can a committee of 3 be chosen from ' + n + ' people? (No roles.)', c3(n), { s: n + ' × ' + (n - 1) + ' × ' + (n - 2) + ' ÷ 6 = ' + c3(n) + '.', w: [[n * (n - 1) * (n - 2), 'That counts each committee 6 times (the number of orders of 3 people). Divide by 6.']] });
    }),
    tpl('diag', (r) => {
      const n = r.int(5, 40);
      return N('How many diagonals does a polygon with ' + n + ' sides have?', n * (n - 3) / 2, { s: 'Segments between corners: ' + c2(n) + '. Remove the ' + n + ' sides: ' + c2(n) + ' − ' + n + ' = ' + n * (n - 3) / 2 + '.', w: [[c2(n), 'That includes the polygon\'s sides. A diagonal joins corners that are not neighbors.']] });
    }),
    tpl('mixed', (r) => {
      const m = r.int(3, 10), g = r.int(2, 8), t = c3(m + g) - c3(m);
      return N('A group has ' + m + ' boys and ' + g + ' girls. How many committees of 3 contain at least one girl?', t, { s: 'All committees: ' + c3(m + g) + '. All-boy committees: ' + c3(m) + '. Difference: ' + t + '.', w: W(t, [[c3(m + g), 'That counts all committees. Remove those with no girls.']]) });
    }),
    tpl('home', (r) => {
      const n = r.int(4, 30);
      return N('A league has ' + n + ' teams. Every team plays every other team twice, once at home and once away. How many games does the league schedule?', n * (n - 1), { s: 'Each pair of teams plays 2 games: ' + c2(n) + ' × 2 = ' + n * (n - 1) + '.', w: [[c2(n), 'Each pair plays twice (home and away), so double the number of pairs.']] });
    }),
    tpl('evensum', (r) => {
      const n = r.int(6, 40), e = Math.floor(n / 2), o = n - e, t = c2(e) + c2(o);
      return N('How many pairs of different whole numbers from 1 to ' + n + ' have an even sum? (The pair 3 and 5 is the same pair as 5 and 3.)', t, { s: 'A sum is even when both numbers are even or both are odd. There are ' + e + ' even and ' + o + ' odd numbers: ' + c2(e) + ' + ' + c2(o) + ' = ' + t + '.', w: W(t, [[c2(n), 'That counts every pair. Only pairs with the same parity have an even sum.']]) });
    }),
  ],
});
