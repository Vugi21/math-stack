import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const wr = (ans, list) => {
  const seen = new Set([ans]);
  return list.filter(([a]) => { if (seen.has(a) || a < 0) return false; seen.add(a); return true; });
};
const groups = [['play chess', 'play checkers', 'do not play checkers'], ['have a dog', 'have a cat', 'do not have a cat'], ['like tea', 'like juice', 'do not like juice'], ['ride a bike', 'ride a scooter', 'do not ride a scooter'], ['speak French', 'speak Spanish', 'do not speak Spanish'], ['sing in the choir', 'play in the band', 'do not play in the band']];

export default lesson({
  id: 'm4-4-3-venn-diagrams',
  title: 'Overlapping groups',
  blurb: 'Two groups can share members. Count the overlap once, find "neither", and fill in the missing parts.',
  concepts: ['venn-diagram', 'inclusion-exclusion', 'overlap'],

  tryFirst: [
    num('t1', 'In a class, 12 students swim and 9 students bike. 5 students do both. How many students do at least one of the two?', 16, {
      h: ['Add 12 and 9. Who got counted twice?'],
      s: '12 + 9 = 21 counts the 5 who do both two times. Take them out once: 21 − 5 = 16.',
      w: [['21', 'The 5 students who do both are in the swimming number and in the biking number. They were counted twice.']],
    }),
    num('t2', 'There are 30 kids. 18 have a dog, 14 have a cat, and 6 have both. How many have neither a dog nor a cat?', 4, {
      h: ['First find how many have at least one pet.', 'Take that away from 30.'],
      s: 'At least one pet: 18 + 14 − 6 = 26. Neither: 30 − 26 = 4.',
      w: [['-2', 'That is 30 − 18 − 14. It takes away the 6 who have both twice.'], ['12', 'That is 30 − 18, the kids with no dog. Some of them have a cat.']],
    }),
  ],

  learn: [
    p('A <b>Venn diagram</b> shows two groups as two overlapping circles. The middle part belongs to both groups. The area outside both circles is for everyone in neither group.'),
    widget('venn', { A: 'dog', B: 'cat', onlyA: 12, both: 6, onlyB: 8, neither: 4 }),
    p('The diagram has four parts: only dog, both, only cat, neither. The four parts never overlap. Every person is in exactly one part.'),
    rule('<b>The whole circle.</b> The number in a group counts the "only" part and the "both" part. If 18 have a dog and 6 of them also have a cat, then 12 have only a dog.'),
    rule('<b>At least one.</b> (number in the first group) + (number in the second group) − (number in both) = number in at least one group. Subtract the overlap, since adding the two groups counted it twice.'),
    ex('Finding the overlap', ['A club has 40 children. 25 play chess. 22 play checkers. 10 play neither.', 'At least one game: 40 − 10 = 30.', 'Add the two groups: 25 + 22 = 47.', '47 is 17 more than 30. Those 17 are the ones counted twice.', 'So 17 play both.']),
    ex('Exactly one', ['In the same club, how many play exactly one game?', 'Chess only: 25 − 17 = 8. Checkers only: 22 − 17 = 5.', '8 + 5 = 13 play exactly one game.', 'Check: 8 + 5 + 17 + 10 = 40.']),
    warn('<b>Watch out.</b> "Neither" means outside both circles. And "25 play chess" means 25 in the whole chess circle, not only the part that is chess alone.'),
    mcq('A group of 40 has 25 who like tea and 20 who like juice. Ana says: "25 + 20 = 45 is more than 40, so the numbers must be wrong." What do you think?', ['Ana is right. The numbers cannot be true.', 'The numbers can be true. At least 5 people like both, and they are counted in each number.', 'The numbers are true only if nobody likes both.'], 1, 'The overlap can make the sum bigger than the total. 45 − 40 = 5, so at least 5 like both. If some like neither, even more must like both.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'A group has 20 members who sing and 15 members who dance. 8 do both. How many members sing or dance?', 27, {
      h: ['Add, then fix the double count.'],
      s: '20 + 15 = 35. The 8 who do both were counted twice. 35 − 8 = 27.',
      w: [['35', 'Those who do both were counted in each group. Subtract them once.'], ['19', 'You subtracted too much. Only the overlap (8) is taken out once.']],
    }),
    num('p2', 'In a class of 28, 15 wear glasses, 12 have a backpack with a blue stripe, and 7 have both. How many have neither?', 8, {
      h: ['People in at least one group first.'],
      s: '15 + 12 − 7 = 20 are in at least one group. 28 − 20 = 8 are in neither.',
      w: [['1', 'That is 28 − 15 − 12. The 7 who are in both were taken away twice.'], ['13', 'That is 28 − 15. It leaves out the second group.']],
    }),
    num('p3', '18 children like apples. 7 of the apple lovers also like pears. How many like apples but not pears?', 11, {
      h: ['Draw two circles. The apple circle has an overlap part and an apple-only part.'],
      s: 'Apple-only = 18 − 7 = 11.',
      w: [['25', 'The 7 are already inside the 18. You should take them away, not add.']],
    }),
    num('p4', 'In a club of 40, 25 play soccer and 22 play chess. 10 play neither. How many play both?', 17, {
      h: ['How many play at least one?', 'Compare 25 + 22 with that number.'],
      s: 'At least one: 40 − 10 = 30. 25 + 22 = 47. The extra 47 − 30 = 17 are the ones counted twice, so 17 play both.',
      w: [['7', 'That is 47 − 40. The 10 who play neither are not in either circle.'], ['15', 'That is 40 − 25. It does not use the second group.']],
    }),
    num('p5', 'How many whole numbers from 1 to 30 are multiples of 2 or multiples of 3?', 20, {
      h: ['There are 15 multiples of 2 and 10 multiples of 3.', 'Multiples of both 2 and 3 are multiples of 6.'],
      s: 'Multiples of 2: 15. Multiples of 3: 10. Multiples of 6 (both): 5. 15 + 10 − 5 = 20.',
      w: [['25', 'Multiples of 6 are in both lists. Take them out once.'], ['5', 'That is only the overlap. The question asks for the whole union.']],
    }),
    num('p6', 'In a group of 25 people, 18 own a bike and 15 own a scooter. Everyone owns at least one. How many own both?', 8, {
      h: ['If nobody owns neither, then 18 + 15 is too big by how much?'],
      s: '18 + 15 = 33. There are only 25 people, so 33 − 25 = 8 were counted twice. 8 own both.',
      w: [['3', 'That is 18 − 15. It does not use the total of 25.']],
    }),
    num('p7', 'In a club of 36, 20 play chess and 24 play checkers. 4 play neither. How many play exactly one of the two games?', 20, {
      h: ['Find the number who play both first.', 'Then exactly one = at least one minus both.'],
      s: 'At least one: 36 − 4 = 32. Both: 20 + 24 − 32 = 12. Exactly one: 32 − 12 = 20.',
      w: [['32', 'That is everyone who plays at least one game, including those who play both.'], ['12', 'That is the number who play both.']],
    }),
    num('p8', 'In a group of 30, 22 own a bike and 17 own a scooter. What is the smallest number of people who could own both?', 9, {
      h: ['The overlap is smallest when nobody owns neither.'],
      s: 'If someone owns neither, even more must own both. So the smallest overlap has everyone owning at least one: 22 + 17 − 30 = 9.',
      w: [['0', 'The circles are too big to avoid each other. 22 + 17 is more than 30.'], ['5', 'That is 22 − 17. It does not use the total of 30.']],
    }),
  ],

  challenge: [
    chain('The school survey', '50 students were asked about two subjects. 30 like math. 26 like art. 12 like neither.', [
      num('c1a', 'How many students like at least one of the two subjects?', 38, { h: ['Take away the ones who like neither.'], s: '50 − 12 = 38.', w: [['56', 'That is 30 + 26, which counts the students who like both twice.']] }),
      num('c1b', 'How many like both math and art?', 18, { h: ['30 + 26 is 56. The true count of at least one is 38.'], s: '30 + 26 = 56. 56 − 38 = 18 were counted twice.', w: [['4', 'That is 30 − 26. The overlap is the extra in the sum.']] }),
      num('c1c', 'How many like exactly one subject?', 20, { h: ['Math only is 30 − 18. Art only is 26 − 18.'], s: 'Math only: 12. Art only: 8. 12 + 8 = 20.', w: [['38', 'That includes the students who like both.']] }),
    ], 'The idea: put the "both" part in the middle first. The other parts come from subtraction, and all four parts add to the total.'),
    chain('Multiples', 'We look at the whole numbers from 1 to 60.', [
      num('c2a', 'How many are multiples of 4?', 15, { h: ['4 × 15 = 60.'], s: '60 ÷ 4 = 15.' }),
      num('c2b', 'How many are multiples of 6?', 10, { h: ['6 × 10 = 60.'], s: '60 ÷ 6 = 10.' }),
      num('c2c', 'A number that is a multiple of 4 and a multiple of 6 is a multiple of 12. How many numbers from 1 to 60 are multiples of 4 or 6?', 20, { h: ['How many multiples of 12 are there?'], s: 'Multiples of 12: 5. 15 + 10 − 5 = 20.', w: [['25', 'The multiples of 12 are in both lists. Subtract them once.']] }),
    ], 'The idea: the overlap of "multiples of 4" and "multiples of 6" is the multiples of 12, the first number both of them divide into. Then subtract it once.'),
    mc('c3', 'Find the error. A class has 30 students. 18 like pizza, 16 like pasta and 6 like neither. Ben says: "18 + 16 + 6 = 40, which is more than 30. So the numbers cannot be true." Which statement is best?', ['Ben is right. The numbers cannot be true.', 'The numbers can be true. The 18 and 16 both include the students who like both. 10 students like both.', 'The numbers can be true only if 6 students like both.', 'Ben should add 18 + 16 and ignore the 6.'], 1, {
      s: 'At least one: 30 − 6 = 24. 18 + 16 = 34, so 34 − 24 = 10 students were counted twice. 10 like both. Pizza only is 8, pasta only is 6, and 8 + 6 + 10 + 6 = 30.',
      w: [[0, 'Ben treated the circles as if they did not overlap. People who like both are inside each count.'], [2, 'If only 6 liked both, at least one would be 18 + 16 − 6 = 28. Then neither would be 2, not 6.'], [3, 'The 6 who like neither are real. They are needed to find the overlap.']],
    }),
  ],

  quiz: [
    tpl('union', (r) => {
      const g = r.pick(groups), a = r.int(10, 40), b = r.int(10, 40), both = r.int(2, Math.min(a, b) - 3);
      return N(a + ' people ' + g[0] + ' and ' + b + ' people ' + g[1] + '. ' + both + ' do both. How many people do at least one?', a + b - both, { s: a + ' + ' + b + ' − ' + both + ' = ' + (a + b - both) + '.', w: wr(a + b - both, [[a + b, 'The ' + both + ' who do both were counted twice.']]) });
    }),
    tpl('neither', (r) => {
      const g = r.pick(groups), a = r.int(10, 30), b = r.int(10, 30), both = r.int(2, Math.min(a, b) - 3), nei = r.int(2, 12), tot = a + b - both + nei;
      return N('A group of ' + tot + ' people. ' + a + ' ' + g[0] + ', ' + b + ' ' + g[1] + ', and ' + both + ' do both. How many do neither?', nei, { s: 'At least one: ' + a + ' + ' + b + ' − ' + both + ' = ' + (a + b - both) + '. Neither: ' + tot + ' − ' + (a + b - both) + ' = ' + nei + '.', w: wr(nei, [[tot - a - b, 'That takes away the "both" group twice. Find the number in at least one first.']]) });
    }),
    tpl('findboth', (r) => {
      const g = r.pick(groups), both = r.int(3, 15), a = both + r.int(3, 20), b = both + r.int(3, 20), nei = r.int(1, 10), tot = a + b - both + nei;
      return N('A group of ' + tot + ' people. ' + a + ' ' + g[0] + ', ' + b + ' ' + g[1] + ', and ' + nei + ' do neither. How many do both?', both, { s: 'At least one: ' + tot + ' − ' + nei + ' = ' + (tot - nei) + '. ' + a + ' + ' + b + ' = ' + (a + b) + '. The extra ' + (a + b) + ' − ' + (tot - nei) + ' = ' + both + ' were counted twice.', w: wr(both, [[a + b - tot, 'People who do neither are outside both circles. Take them away first.']]) });
    }),
    tpl('only', (r) => {
      const g = r.pick(groups), both = r.int(3, 15), a = both + r.int(3, 20);
      return N(a + ' people ' + g[0] + '. ' + both + ' of those also ' + g[1] + '. How many of the ' + a + ' people ' + g[2] + '?', a - both, { s: a + ' − ' + both + ' = ' + (a - both) + '. The ' + both + ' are inside the ' + a + ' already.', w: wr(a - both, [[a + both, 'The ' + both + ' are already part of the ' + a + '. Take them out.']]) });
    }),
    tpl('exactlyone', (r) => {
      const g = r.pick(groups), both = r.int(3, 14), a = both + r.int(3, 18), b = both + r.int(3, 18);
      return N(a + ' people ' + g[0] + ' and ' + b + ' people ' + g[1] + '. ' + both + ' do both. How many do exactly one of the two?', a + b - 2 * both, { s: 'Only the first: ' + (a - both) + '. Only the second: ' + (b - both) + '. Total ' + (a + b - 2 * both) + '.', w: wr(a + b - 2 * both, [[a + b - both, 'That includes the ' + both + ' who do both.'], [a + b, 'Each person who does both is in the first group and in the second group. Take them out of both groups.']]) });
    }),
    tpl('multiples', (r) => {
      const [x, y] = r.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 6], [6, 8], [4, 10], [2, 7]]);
      const n = r.int(30, 120);
      let c = 0, cx = 0, cy = 0, cb = 0;
      for (let i = 1; i <= n; i++) { const A = i % x === 0, B = i % y === 0; if (A || B) c++; if (A) cx++; if (B) cy++; if (A && B) cb++; }
      return N('How many whole numbers from 1 to ' + n + ' are multiples of ' + x + ' or multiples of ' + y + '?', c, { s: 'Multiples of ' + x + ': ' + cx + '. Multiples of ' + y + ': ' + cy + '. Multiples of both: ' + cb + '. ' + cx + ' + ' + cy + ' − ' + cb + ' = ' + c + '.', w: wr(c, [[cx + cy, 'Numbers that are multiples of both were counted twice.']]) });
    }),
    tpl('smallest', (r) => {
      const tot = r.int(20, 50), a = r.int(Math.floor(tot / 2) + 2, tot - 2), b = r.int(Math.floor(tot / 2) + 2, tot - 2);
      const ans = Math.max(0, a + b - tot);
      return N('In a group of ' + tot + ' people, ' + a + ' ride a bike and ' + b + ' ride a scooter. What is the smallest number who could ride both?', ans, { s: 'Overlap is smallest when everyone rides something: ' + a + ' + ' + b + ' − ' + tot + ' = ' + ans + '.', w: wr(ans, [[Math.abs(a - b), 'The overlap must make the total fit into ' + tot + ' people.']]) });
    }),
    tpl('largest', (r) => {
      const a = r.int(8, 30), b = r.int(8, 30), tot = Math.max(a, b) + r.int(3, 15);
      return N('In a group of ' + tot + ' people, ' + a + ' ride a bike and ' + b + ' ride a scooter. What is the largest number who could ride both?', Math.min(a, b), { s: 'The overlap cannot be bigger than the smaller group. That is ' + Math.min(a, b) + ', and it is possible.', w: wr(Math.min(a, b), [[Math.max(a, b), 'The overlap cannot be bigger than the smaller group.'], [a + b - tot, 'That is the smallest possible overlap, not the largest.']]) });
    }),
  ],
});
