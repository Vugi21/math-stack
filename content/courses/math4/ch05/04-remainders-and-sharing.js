import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const c = (n) => n.toLocaleString('en-US');
const wr = (ans, list) => { const seen = new Set([String(ans)]); return list.filter(([v]) => { if (!Number.isInteger(v) || v < 0 || seen.has(String(v))) return false; seen.add(String(v)); return true; }); };
const divisors = (n) => { const o = []; for (let i = 1; i <= n; i++) if (n % i === 0) o.push(i); return o; };
const who = (r) => r.pick(['Ava', 'Ben', 'Chloe', 'Dev', 'Elena', 'Farid', 'Grace', 'Hiro', 'Isla', 'Leo']);

export default lesson({
  id: 'm4-5-4-remainders-and-sharing',
  title: 'Remainders and sharing',
  blurb: 'Quotient and remainder, how big a remainder can be, and what to do with the leftovers in a story.',
  concepts: ['remainder', 'division', 'division-algorithm'],

  tryFirst: [
    num('t1', '17 apples are put into bags of 5. How many apples are left over after as many full bags as possible are filled?', 2, {
      h: ['Fill bags of 5 one at a time: 5, 10, 15...'],
      s: '3 full bags use 15 apples. 17 − 15 = 2 apples are left over.',
      w: [['3', '3 is the number of full bags. The question asks how many apples are left.']],
    }),
    num('t2', '23 children go on a trip. A van seats 6 children. How many vans are needed so that everyone has a seat?', 4, {
      h: ['3 vans seat 18 children. Is that enough?'],
      s: '3 vans seat 18, so 5 children have no seat. A fourth van is needed: 4 vans.',
      w: [['3', '3 vans seat only 18 children. 5 children would be left standing.']],
    }),
  ],

  learn: [
    p('Not every number divides evenly. Take 23 ÷ 5. Put 23 things in groups of 5. You make 4 full groups, and 3 things are left. We write 23 ÷ 5 = 4 R 3.'),
    def('quotient and remainder', 'The <b>quotient</b> is 4: the number of full groups. The <b>remainder</b> is 3: what is left over. The <b>dividend</b> is 23 and the <b>divisor</b> is 5.'),
    def('divides evenly', 'A division divides evenly when the remainder is 0. Then the dividend is a multiple of the divisor.'),
    rule('<b>The remainder is always smaller than the divisor.</b> If you divide by 5, the remainder can only be 0, 1, 2, 3 or 4. If 5 or more are left over, you can make another group.'),
    tbl(['Divide by', 'Possible remainders'], [['2', '0, 1'], ['5', '0, 1, 2, 3, 4'], ['9', '0, 1, 2, 3, 4, 5, 6, 7, 8']], 'The remainder is always less than the divisor'),
    formula('The division check', 'dividend = divisor × quotient + remainder', 'For 23 ÷ 5: 5 × 4 + 3 = 23.'),
    ex('What to do with the remainder', ['23 cookies, boxes hold 5. 23 ÷ 5 = 4 R 3.', 'How many boxes do we need for all the cookies? Round up: 5 boxes. The last box is not full.', 'How many full boxes? Drop the remainder: 4 boxes.', '23 cookies shared among 5 friends? Each gets 4. The 3 left over are not shared out. The answer to "how many each" is the quotient, 4.']),
    key('The question in the story tells you what to do with the remainder. "How many are needed to hold everything?" means round up. "How many full?" or "how many each?" means use the quotient. "How many are left?" means use the remainder.'),
    ex('Running backwards', ['A number divided by 7 gives quotient 12 and remainder 5. What is the number?', 'Use the check: 7 × 12 + 5.', '7 × 12 = 84. 84 + 5 = 89. The number is 89.']),
    tip('Count in multiples of the divisor until the next one would be too big. For 83 ÷ 9: 9, 18, …, 72, 81. The last one that fits is 81 = 9 × 9, and 83 − 81 = 2. So 9 R 2.'),
    warn('<b>Watch out.</b> If your remainder is as big as the divisor, or bigger, you stopped too early. 50 ÷ 6 = 7 R 8 is wrong, because 8 is more than 6. Make one more group: 8 R 2.'),
    mcq('Dev says: "83 ÷ 9 = 8 R 11, because 9 × 8 = 72 and 83 − 72 = 11." What is wrong?', ['Nothing. 9 × 8 + 11 = 83.', 'The remainder 11 is bigger than 9, so there is room for one more group of 9. The right answer is 9 R 2.', 'The remainder should be 72.'], 1, 'The check 9 × 8 + 11 = 83 works, but a remainder must be smaller than the divisor. Another 9 fits in 11: 83 ÷ 9 = 9 R 2, and 9 × 9 + 2 = 83.', 'Spot the mistake'),
    recap([['quotient', 'the number of full groups'], ['remainder', 'what is left over; smaller than the divisor'], ['divides evenly', 'the remainder is 0']], [['Check', 'dividend = divisor × quotient + remainder'], ['Remainders for ÷ 7', '0 to 6']]),
  ],

  practice: [
    num('p1', 'What is the remainder when 59 is divided by 8?', 3, { h: ['8 × 7 = 56. How far is 56 from 59?'], s: '8 × 7 = 56 and 59 − 56 = 3.', w: [['7', '7 is the quotient. The remainder is what is left over.'], ['4', 'Check: 8 × 7 = 56, and 59 − 56 = 3.']] }),
    num('p2', 'What is the largest remainder you can get when dividing any number by 13?', 12, { h: ['A remainder must be smaller than the divisor.'], s: 'A remainder of 13 would make one more group. So the largest is 12.', w: [['13', 'With 13 left over you could make another group of 13.'], ['14', 'The remainder must be smaller than the divisor.']] }),
    num('p3', 'A number is divided by 9. The quotient is 14 and the remainder is 5. What is the number?', 131, { h: ['dividend = divisor × quotient + remainder'], s: '9 × 14 = 126. 126 + 5 = 131.', w: [['126', 'You forgot to add the remainder.'], ['19', 'You added the quotient and the remainder. Multiply the divisor and the quotient first.']] }),
    num('p4', '130 people wait for a ferry. The ferry carries 25 people on each trip. How many trips are needed to carry everyone?', 6, { h: ['130 ÷ 25 = 5 R 5.', 'What happens to the 5 who are left?'], s: '5 trips carry 125 people. 5 people are still waiting, so a sixth trip is needed.', w: [['5', 'After 5 trips, 5 people are still waiting.']] }),
    num('p5', 'What is the smallest number greater than 50 that leaves remainder 6 when divided by 7?', 55, { h: ['Numbers with remainder 6 are 6, 13, 20, 27, ...', 'They are 7 apart.'], s: 'The numbers are 6, 13, 20, 27, 34, 41, 48, 55. 48 is below 50, so the answer is 55.', w: [['48', '48 is not greater than 50.'], ['56', '56 is a multiple of 7, so its remainder is 0.']] }),
    num('p6', 'A number leaves remainder 5 when divided by 8. The number is doubled. What remainder does the doubled number leave when divided by 8?', 2, { h: ['Try a real number, like 13 (13 = 8 + 5).', '13 doubled is 26. 26 ÷ 8 = ?'], s: 'Try 13: doubled it is 26. 26 = 3 × 8 + 2, so the remainder is 2. The same happens for 21 (doubled 42 = 5 × 8 + 2).', w: [['10', 'A remainder must be smaller than 8. 10 is 8 + 2, so another group of 8 forms.'], ['5', 'Test with a number: 13 doubled is 26, and 26 ÷ 8 leaves 2.']] }),
    num('p7', 'When 100 is divided by a number, the remainder is 4. How many different numbers could it have been divided by?', 8, { h: ['100 − 4 = 96 must divide exactly.', 'The divisor must be bigger than 4. Why?'], s: 'The divisor must divide 96 exactly, and be bigger than 4. The divisors of 96 are 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96. Without 1 to 4 that leaves 8.', w: [['12', 'That counts 1, 2, 3 and 4 as well. But a remainder of 4 needs a divisor bigger than 4.'], ['7', 'You may have missed 96 itself: 100 ÷ 96 leaves 4.']] }),
  ],

  challenge: [
    chain('The sticker sheets', 'Kira has 100 stickers. A sheet holds 8 stickers.', [
      num('c1a', 'How many sheets can she fill completely?', 12, { h: ['100 ÷ 8.'], s: '8 × 12 = 96, so 12 full sheets.' }),
      num('c1b', 'How many stickers are left over?', 4, { h: ['100 − 96.'], s: '100 − 96 = 4 stickers.' }),
      num('c1c', 'How many more stickers would she need so that every sticker fits on a full sheet?', 4, { h: ['She has 4 on the last sheet. The sheet holds 8.'], s: 'The last sheet has 4 stickers and holds 8. She needs 8 − 4 = 4 more.' }),
    ], 'The idea: the remainder tells you what is left over. The divisor minus the remainder tells you how many more you need to finish the next group.'),
    chain('Two remainder clues', 'A number is less than 30. It leaves remainder 3 when divided by 5, and remainder 2 when divided by 4.', [
      num('c2a', 'What is the smallest number greater than 10 that leaves remainder 3 when divided by 5?', 13, { h: ['Numbers with remainder 3: 3, 8, 13...'], s: '3, 8, 13. The first one over 10 is 13.' }),
      num('c2b', 'What is the number?', 18, { h: ['List the numbers with remainder 3 by 5 (under 30): 3, 8, 13, 18, 23, 28.', 'Which of them leaves remainder 2 by 4?'], s: '18 = 4 × 4 + 2. Check the others: 3, 8, 13, 23, 28 give remainders 3, 0, 1, 3, 0. So 18.' }),
      num('c2c', 'What is the next number after 18 that has both properties?', 38, { h: ['The clues repeat every 5 × 4 = 20.'], s: 'The pattern repeats every 20. 18 + 20 = 38.' }),
    ], 'The idea: remainder patterns repeat. Adding the divisor to a number gives the same remainder.'),
    mc('c3', 'Find the error. Nico says: "When you divide by 6 there are 7 possible remainders: 0, 1, 2, 3, 4, 5 and 6." What is wrong?', ['Nothing. 0 to 6 is 7 numbers.', 'A remainder of 6 is not possible, because 6 left over makes another group of 6. The remainders are 0 to 5, so there are 6 of them.', 'Remainder 0 is not allowed.', 'There are 5 possible remainders, 1 to 5.'], 1, {
      s: 'If 6 are left over, they form one more full group. So the remainder is smaller than 6. The possible remainders are 0, 1, 2, 3, 4, 5.',
      w: [[0, 'Counting 0 to 6 is right, but 6 itself cannot be a remainder when dividing by 6.'], [2, '0 is allowed. It means the division was exact.'], [3, '0 is a possible remainder: it means nothing is left over.']],
    }),
  ],

  quiz: [
    tpl('rem', (r) => {
      const d = r.int(3, 12), q = r.int(5, 60), rm = r.int(0, d - 1), n = d * q + rm;
      const askR = r.bool();
      return N('What is the ' + (askR ? 'remainder' : 'quotient') + ' when ' + c(n) + ' is divided by ' + d + '?', askR ? rm : q, { s: d + ' × ' + q + ' = ' + c(d * q) + ' and ' + c(n) + ' − ' + c(d * q) + ' = ' + rm + '. So ' + c(n) + ' ÷ ' + d + ' = ' + q + ' R ' + rm + '.', w: wr(askR ? rm : q, askR ? [[q, 'That is the quotient. The remainder is what is left over.']] : [[rm, 'That is the remainder. The quotient is the number of full groups.']]) });
    }),
    tpl('back', (r) => {
      const d = r.int(3, 15), q = r.int(5, 70), rm = r.int(1, d - 1), n = d * q + rm;
      return N('A number divided by ' + d + ' has quotient ' + q + ' and remainder ' + rm + '. What is the number?', n, { s: d + ' × ' + q + ' + ' + rm + ' = ' + c(d * q) + ' + ' + rm + ' = ' + c(n) + '.', w: wr(n, [[d * q, 'Add the remainder too.'], [d + q + rm, 'Multiply the divisor and the quotient first.']]) });
    }),
    tpl('roundup', (r) => {
      const cap = r.int(4, 30), trips = r.int(3, 20), rm = r.int(1, cap - 1), total = cap * trips + rm;
      return N(c(total) + ' people wait. Each bus carries ' + cap + ' people. How many buses are needed so that everyone rides?', trips + 1, { s: c(total) + ' ÷ ' + cap + ' = ' + trips + ' R ' + rm + '. The ' + rm + ' left over ' + (rm === 1 ? 'needs' : 'need') + ' one more bus: ' + (trips + 1) + '.', w: wr(trips + 1, [[trips, rm + (rm === 1 ? ' person would be left behind.' : ' people would be left behind.')]]) });
    }),
    tpl('share', (r) => {
      const k = r.int(3, 9), each = r.int(4, 40), rm = r.int(1, k - 1), total = k * each + rm, n = who(r);
      const left = r.bool();
      return N(n + ' shares ' + total + ' sweets equally among ' + k + ' friends. ' + (left ? 'How many sweets are left over?' : 'How many sweets does each friend get?'), left ? rm : each, { s: total + ' ÷ ' + k + ' = ' + each + ' R ' + rm + '.', w: wr(left ? rm : each, left ? [[each, 'That is how many each friend gets.']] : [[rm, 'That is how many are left over.'], [each + 1, 'The extra sweets cannot be split evenly, so each gets the quotient.']]) });
    }),
    tpl('largest', (r) => {
      const d = r.int(4, 99);
      return N('What is the largest remainder you can get when you divide a number by ' + d + '?', d - 1, { s: 'A remainder must be smaller than the divisor. The largest is ' + (d - 1) + '.', w: wr(d - 1, [[d, 'With ' + d + ' left, another group of ' + d + ' forms.'], [d + 1, 'The remainder must be smaller than the divisor.']]) });
    }),
    tpl('double', (r) => {
      const d = r.int(5, 15), rm = r.int(2, d - 1), k = r.int(2, 4), ans = (k * rm) % d;
      return N('A number leaves remainder ' + rm + ' when divided by ' + d + '. It is multiplied by ' + k + '. What remainder does the new number leave when divided by ' + d + '?', ans, { s: 'Try ' + (d + rm) + ': times ' + k + ' is ' + k * (d + rm) + '. ' + k * (d + rm) + ' leaves remainder ' + ans + '. The remainder of ' + (k * rm) + ' ÷ ' + d + ' is ' + ans + '.', w: wr(ans, [[k * rm, 'If this is as big as ' + d + ' or more, make more groups of ' + d + '.'], [rm, 'Test with a real number, like ' + (d + rm) + '.']]) });
    }),
    tpl('howmany', (r) => {
      const m = r.pick([48, 60, 72, 84, 90, 96, 108, 120, 126, 144, 180]), rm = r.int(2, 8), n = m + rm;
      const cnt = divisors(m).filter((x) => x > rm).length;
      return N('When ' + n + ' is divided by a whole number, the remainder is ' + rm + '. How many different whole numbers could it be divided by?', cnt, { s: n + ' − ' + rm + ' = ' + m + ' must divide exactly, and the divisor must be bigger than ' + rm + '. That gives ' + cnt + ' divisors.', w: wr(cnt, [[divisors(m).length, 'That counts divisors that are too small. The divisor must be bigger than ' + rm + '.']]) });
    }),
    tpl('smallestrem', (r) => {
      const d = r.int(5, 15), rm = r.int(1, d - 1), low = r.int(5, 12) * 10;
      let a = low + 1; while (a % d !== rm) a++;
      return N('What is the smallest number greater than ' + low + ' that leaves remainder ' + rm + ' when divided by ' + d + '?', a, { s: 'Numbers with this remainder are ' + d + ' apart. The first one above ' + low + ' is ' + a + '.', w: wr(a, [[a - d, 'That is not greater than ' + low + '.'], [a + d, 'There is a smaller one that works.']]) });
    }),
  ],
});
