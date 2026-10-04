import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => String(x[0]) !== String(ans));
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const fr = (a, b) => { const g = gcd(a, b) || 1; return b / g === 1 ? String(a / g) : (a / g) + '/' + (b / g); };
const modpow = (b, e, m) => { let r = 1; for (let i = 0; i < e; i++) r = (r * b) % m; return r; };

export default lesson({
  id: 'pre-15-1-find-a-pattern',
  title: 'Find a pattern',
  blurb: 'Try small cases, build a table, spot the rule, then test it. The most powerful trick in all of math.',
  concepts: ['patterns', 'sequences', 'problem-solving'],

  tryFirst: [
    num('t1', 'A row of triangles is built from matchsticks. One triangle uses 3 sticks. Two triangles side by side (sharing the middle stick) use 5 sticks. Three triangles use 7 sticks. How many sticks does a row of 20 triangles need?', 41, {
      h: ['Draw or write the counts for 1, 2, 3, 4 triangles. How much does each new triangle add?', 'The first triangle costs 3 sticks. After that?'],
      s: 'Each extra triangle adds 2 sticks (two new sides, the third side is shared). The first uses 3, and 19 more add 19 × 2 = 38. Total 3 + 38 = 41.',
      w: [['40', 'The first triangle takes 3 sticks, not 2: 3 + 19 × 2 = 41. Check against 1 triangle (3) and 2 triangles (5).'], ['60', 'Triangles in a row share sticks, so you do not need 3 each.']],
    }),
    num('t2', 'Add the first 15 odd numbers: 1 + 3 + 5 + ... (15 numbers in all). What is the total?', 225, {
      h: ['Try the first few sums: 1, 1+3, 1+3+5, 1+3+5+7. Do the totals look familiar?', 'What is the pattern of the totals?'],
      s: 'The sums are 1, 4, 9, 16, ... which are perfect squares: the sum of the first n odd numbers is n × n. For n = 15 that is 225.',
      w: [['120', 'That is the sum 1 + 2 + ... + 15. Odd numbers give a different pattern: 1, 4, 9, 16, ...'], ['29', '29 is the 15th odd number, not the sum of all of them.']],
    }),
  ],

  learn: [
    p('When a problem asks about something huge ("the 1000th term", "a figure made of 50 triangles"), you do not want to build it. The mathematician\'s move is: <b>do small cases, find the pattern, then predict the big case.</b> This lesson shows how to do that carefully, and how to avoid being fooled by a pattern that stops working.'),
    def('sequence', 'A list of numbers in a definite order. Each number in the list is a <b>term</b>. The first term, second term, and n-th term are written in order of position.'),
    def('common difference', 'The amount added at each step of a sequence such as 4, 7, 10, 13. Here the difference is 3. Subtracting each term from the next one shows the differences.'),
    rule('<b>The pattern method.</b> (1) Work out the answer for n = 1, 2, 3, 4, ... carefully. (2) Put them in a table. (3) Look at differences, ratios, or a familiar sequence. (4) State the rule. (5) <b>Test it</b> on a case you did not use. (6) Use it for the big case.'),
    tbl(['Tables in a row (n)', '1', '2', '3', '4', '5'], [['Seats', '4', '6', '8', '10', '12']], 'Each new table adds 2 seats'),
    ex('From table to rule', ['Square tables are pushed together in a row, end to end. The seats go 4, 6, 8, 10, 12: each step adds 2.', 'So for n tables: 4 + 2 × (n − 1), which simplifies to 2n + 2.', 'Test with n = 5: 2 × 5 + 2 = 12. It matches the table.', 'For 100 tables: 2 × 100 + 2 = 202 seats.']),
    p('It helps to ask <i>why</i> the pattern works. Each new table is joined to the end of the row and brings one seat on each long side, so it adds only 2 seats, not 4. The two end seats stay at the two ends. A rule that you can explain is much safer than one you only noticed.'),
    formula('Arithmetic sequence', 'n-th term = a + (n − 1) × d', 'A list that starts at a and adds d each step. The n-th term is the start plus one fewer than n jumps of size d, because the first term needs no jump.'),
    ex('Finding a far term', ['The sequence 7, 11, 15, 19, ... adds 4 each time. What is the 30th term?', 'Start a = 7 and difference d = 4.', '30th term = 7 + 29 × 4 = 7 + 116 = 123.', 'Check the rule on the 3rd term: 7 + 2 × 4 = 15. Correct.']),
    tip('The "n − 1" is the usual stumbling block. Test your rule on n = 1: it must give the first term. If your rule gives a + d for n = 1, you have one jump too many.'),
    ex('Gauss\'s pairing trick', ['Add 1 + 2 + 3 + ... + 100.', 'Write it forwards and backwards: 1 + 100 = 101, 2 + 99 = 101, ... every pair makes 101.', 'There are 100 numbers, so 50 pairs: 50 × 101 = 5050.', 'Same idea for any evenly spaced list: sum = (first + last) × (how many) ÷ 2.']),
    formula('Sum of an evenly spaced list', '(first + last) × (how many) ÷ 2', 'Works for any list with a constant difference. Count the terms first, with last − first divided by the difference, plus 1.'),
    ex('A sum with a different start', ['Add 5 + 8 + 11 + ... + 50.', 'The difference is 3, so the number of terms is (50 − 5) ÷ 3 + 1 = 15 + 1 = 16.', 'Sum = (5 + 50) × 16 ÷ 2 = 55 × 8 = 440.']),
    p('<b>When the difference is not constant.</b> Look at the differences of the differences. For the dot triangles 1, 3, 6, 10, the differences are 2, 3, 4, so they grow by 1 each time. The next difference is 5, giving 15, then 6, giving 21. The 10th triangle is 1 + 2 + ... + 10 = 55 dots.'),
    p('<b>Cycles.</b> Some patterns repeat. The last digit of powers of 3 goes 3, 9, 7, 1, 3, 9, 7, 1, ... It repeats every 4 steps. To find the last digit of 3^[50], ask where 50 falls in the cycle: 50 ÷ 4 leaves remainder 2, so it is the second item of the cycle: 9. A remainder of 0 means the <i>last</i> item of the cycle.'),
    tbl(['Power of 3', '3^[1]', '3^[2]', '3^[3]', '3^[4]', '3^[5]', '3^[6]', '3^[7]', '3^[8]'], [['Last digit', '3', '9', '7', '1', '3', '9', '7', '1']], 'A cycle of length 4'),
    warn('<b>A pattern is a guess until you test it.</b> Points on a circle joined by all chords split it into regions. For 1, 2, 3, 4, 5 points the counts are 1, 2, 4, 8, 16: looks like doubling! But with 6 points the count is 31, not 32. Always test with one more case, and ask <i>why</i> the pattern should continue.'),
    warn('<b>Off by one.</b> "The 50th term" is 49 jumps from the first, not 50. And the number of terms from 5 to 50 in steps of 3 is one more than the number of jumps.'),
    key('A pattern earns trust in three steps: it fits <b>every</b> case you computed, it predicts a new case correctly, and you can explain <b>why</b> it continues.'),
    mcq('Ben sees the list 1, 2, 4, 7, ... and says: "It doubles, so next is 8." What is the problem?', ['Nothing, the next term is 8.', '1, 2, 4 fits doubling, but 7 does not. The differences are 1, 2, 3, so the next difference is 4 and the next term is 11.', 'The next term is 14.'], 1, 'Check the pattern against every term you have, not just the first few. Differences 1, 2, 3 are a better fit, giving 1, 2, 4, 7, 11, 16, ...', 'Spot the mistake'),
    recap([['sequence', 'an ordered list of terms'], ['common difference', 'the amount added at each step'], ['cycle', 'a pattern that repeats; use the remainder to find the position'], ['test case', 'a case you did not use to find the rule']], [['n-th term', 'a + (n − 1) × d'], ['Sum of an evenly spaced list', '(first + last) × (how many) ÷ 2']]),
  ],

  practice: [
    num('p1', 'The list 5, 8, 11, 14, ... continues by adding 3 each time. What is the 50th term?', 152, {
      h: ['The first term is 5. How many jumps of 3 take you to the 50th term?'],
      s: 'From the 1st to the 50th term is 49 jumps of 3: 5 + 49 × 3 = 5 + 147 = 152.',
      w: [['155', 'That is 50 jumps. The 1st term is already in place, so there are only 49 jumps to the 50th.'], ['150', 'Start from 5, not 0: 5 + 49 × 3.']],
    }),
    mc('p2', 'The letters ABCDE repeat forever: ABCDEABCDEABCDE... Which letter is the 100th?', ['A', 'C', 'E', 'D'], 2, {
      h: ['The pattern repeats every 5 letters. What is 100 ÷ 5?', 'If the position is an exact multiple of 5, it is the last letter of the block.'],
      s: '100 is a multiple of 5, so the 100th letter finishes a block. That is E.',
      w: [[0, 'The 101st letter would be A. Position 100 is the end of the 20th block.'], [1, 'Check: positions 3, 8, 13, ... are C. Position 100 is not one of them.']],
    }),
    num('p3', 'What is the last digit of 7^50? (The last digits of 7, 7×7, 7×7×7, ... go 7, 9, 3, 1, then repeat.)', 9, {
      h: ['The cycle has length 4. What is the remainder when 50 is divided by 4?', 'Remainder 2 means the 2nd item of the cycle.'],
      s: '50 ÷ 4 = 12 remainder 2, so 7^50 ends like 7^2 = 49. Last digit 9.',
      w: [['1', 'You treated the remainder 2 as if it were a full cycle. Remainder 2 means the second item of 7, 9, 3, 1.'], ['7', 'That is the first item. Remainder 2 gives the second.']],
    }),
    num('p4', 'Find 1 + 2 + 3 + ... + 60.', 1830, {
      h: ['Pair up: 1 + 60, 2 + 59, ...', 'How many pairs, and what does each pair make?'],
      s: 'Each pair adds to 61, and there are 30 pairs: 30 × 61 = 1830.',
      w: [['3660', 'That is 60 × 61, which counts each pair twice. Divide by 2.'], ['1800', '30 × 60 misses that each pair adds to 61, not 60.']],
    }),
    num('p5', 'How many squares of any size (1×1, 2×2, ...) can be traced along the lines of a 5 by 5 grid of unit squares?', 55, {
      h: ['Count squares of each size: size 1, size 2, ... Try a 2×2 grid first (5 squares) and 3×3 (14).', 'Squares of side k fit in (6 − k) × (6 − k) positions.'],
      s: 'Side 1: 25. Side 2: 16. Side 3: 9. Side 4: 4. Side 5: 1. Total 25 + 16 + 9 + 4 + 1 = 55.',
      w: [['25', 'That counts only the unit squares. Bigger squares count too.']],
    }),
    num('p6', 'Find the sum {1/(1×2)} + {1/(2×3)} + {1/(3×4)} + ... + {1/(9×10)}. Compute the first few partial sums and look for a pattern.', '9/10', {
      h: ['Add the first two terms: {1/2} + {1/6}. Then the first three.', 'The sums go {1/2}, {2/3}, {3/4}, ...'],
      s: 'Partial sums: {1/2}, {2/3}, {3/4}, {4/5}: after n terms the sum is {n/(n+1)}. With 9 terms: {9/10}. (Why: each fraction {1/(k(k+1))} = {1/k} − {1/(k+1)}, so almost everything cancels.)',
      w: [['1', 'The sum gets close to 1 but never reaches it. After 9 terms it is 9/10.'], ['10/9', 'The sum is less than 1: each partial sum is n over n + 1.']],
    }),
    num('p7', 'Whole numbers are written in rows: row 1 is 1; row 2 is 2, 3; row 3 is 4, 5, 6; row 4 is 7, 8, 9, 10; and so on, with one more number in each row. What is the first number in row 20?', 191, {
      h: ['How many numbers are in rows 1 through 19 together?', 'Row 20 starts right after that.'],
      s: 'Rows 1 to 19 contain 1 + 2 + ... + 19 = 190 numbers, so they end at 190. Row 20 starts at 191.',
      w: [['190', 'That is the last number of row 19. Row 20 starts one later.'], ['210', 'That is the last number of row 20 (1 + 2 + ... + 20). The first number of row 20 comes right after the end of row 19.']],
    }),
  ],

  challenge: [
    chain('Matchstick squares', 'A row of n squares is made of matchsticks, with neighbors sharing a stick. One square uses 4 sticks, two squares use 7, three squares use 10.', [
      num('c1a', 'How many sticks do 5 squares use?', 16, { h: ['Each new square adds 3.'], s: '4, 7, 10, 13, 16.' }),
      num('c1b', 'How many sticks do 30 squares use?', 91, { h: ['4 + 29 × 3.'], s: '4 + 29 × 3 = 91.' }),
      num('c1c', 'You have exactly 100 sticks. How many squares can you build in one row?', 33, { h: ['The rule is 3n + 1 sticks for n squares.'], s: '3n + 1 = 100 gives n = 33.', w: [['34', '34 squares need 3 × 34 + 1 = 103 sticks, more than you have.']] }),
    ], 'The idea: first find the count for the first few cases, then the rule "3n + 1". Once you have the rule you can go forwards (how many sticks?) or backwards (how many squares?).'),
    chain('Last digits', 'The last digits of powers of 2 cycle: 2, 4, 8, 6, 2, 4, 8, 6, ... The last digits of powers of 3 cycle: 3, 9, 7, 1, 3, 9, 7, 1, ...', [
      num('c2a', 'What is the last digit of 2^10?', 4, { h: ['10 ÷ 4 leaves remainder 2.'], s: 'Remainder 2: the 2nd item of 2, 4, 8, 6, which is 4. (Indeed 2^10 = 1024.)' }),
      num('c2b', 'What is the last digit of 3^25?', 3, { h: ['25 ÷ 4 leaves remainder 1.'], s: 'Remainder 1: the 1st item of 3, 9, 7, 1: 3.' }),
      num('c2c', 'What is the last digit of 2^20 + 3^20?', 7, { h: ['Remainder 0 means the last item of the cycle.', 'Find each last digit, add them, keep only the last digit.'], s: '2^20 ends in 6 (the 4th item), and 3^20 ends in 1. 6 + 1 = 7.', w: [['9', 'Remainder 0 means the end of the cycle (6 for powers of 2, 1 for powers of 3), not the start.']] }),
    ], 'The idea: when something cycles, only the position in the cycle matters. Find it with a remainder (a remainder of 0 means the last item).'),
    mc('c3', 'Find the error. Mia says: "The sums 1, 1+2, 1+2+3, 1+2+3+4 are 1, 3, 6, 10. The differences 2, 3, 4 grow by 1, so the 5th sum is 10 + 5 = 15, and the 50th sum must be 50 × 3 = 150, because it grows by about 3 each time." What is her mistake?', ['The sums keep growing faster (the difference rises by 1 each time), so there is no fixed "3 each time". The rule is n(n+1)÷2, which gives 1275 for n = 50.', 'Nothing, 150 is right.', 'The 50th sum is 50 × 50 = 2500.', 'The sums stop growing after 15.'], 0, {
      s: 'Differences 2, 3, 4, 5, ... keep increasing, so the sum is not growing by a constant amount. The pattern is n(n+1)÷2: for n = 50, 50 × 51 ÷ 2 = 1275.',
      w: [[1, 'The growth keeps speeding up. Test it: the 10th sum is 55, but "3 per term" would predict 30.'], [2, 'That is n squared; this pattern is n(n+1)÷2.']],
    }),
  ],

  quiz: [
    tpl('nth', (r) => {
      const a = r.int(-5, 30), d = r.int(2, 12), n = r.int(15, 200), v = a + (n - 1) * d, m = (x) => (x < 0 ? '−' + Math.abs(x) : String(x));
      return N('A list starts ' + [a, a + d, a + 2 * d, a + 3 * d].map(m).join(', ') + ', ... and each term is ' + d + ' more than the one before. What is term number ' + n + '?', v, { s: 'There are ' + (n - 1) + ' jumps of ' + d + ' from the first term: ' + m(a) + ' + ' + (n - 1) + ' × ' + d + ' = ' + m(v) + '.', w: W(v, [[a + n * d, 'That uses ' + n + ' jumps. From term 1 to term ' + n + ' there are ' + (n - 1) + ' jumps.']]) });
    }),
    tpl('cycle', (r) => {
      const L = r.int(3, 6), blk = Array.from({ length: L }, () => r.int(1, 9)), P = r.int(30, 400), d = blk[(P - 1) % L], tot = Math.floor(P / L) * blk.reduce((a, b) => a + b, 0) + blk.slice(0, P % L).reduce((a, b) => a + b, 0), sumQ = r.bool();
      return N('The digits ' + blk.join('') + ' are written over and over: ' + blk.join('') + blk.join('') + blk.join('') + '... ' + (sumQ ? 'What is the sum of the first ' + P + ' digits?' : 'What is digit number ' + P + '?'), sumQ ? tot : d, { s: sumQ ? P + ' ÷ ' + L + ' = ' + Math.floor(P / L) + ' full blocks (each sums to ' + blk.reduce((a, b) => a + b, 0) + ') plus ' + (P % L) + ' extra digits: ' + tot + '.' : P + ' ÷ ' + L + ' leaves remainder ' + (P % L) + ', so it is position ' + (P % L || L) + ' in the block: ' + d + '.', w: [] });
    }),
    tpl('lastdig', (r) => {
      const b = r.pick([2, 3, 4, 7, 8, 9, 12, 13, 17, 19]), n = r.int(20, 160), v = modpow(b, n, 10);
      return N('What is the last digit of ' + b + '^[' + n + ']? (Find the cycle of last digits first.)', v, { s: 'The last digits of powers of ' + b + ' repeat in a cycle. Using the position of ' + n + ' in the cycle gives ' + v + '.', w: W(v, [[b % 10, 'The last digit of the base is only the answer for the first power. Find where ' + n + ' falls in the cycle.']]) });
    }),
    tpl('gauss', (r) => {
      const a = r.int(1, 20), d = r.int(1, 9), k = r.int(10, 80), last = a + (k - 1) * d, v = (k * (a + last)) / 2;
      return N('Find the sum ' + a + ' + ' + (a + d) + ' + ' + (a + 2 * d) + ' + ... + ' + last + ', where each term is ' + d + ' more than the one before.', v, { s: 'There are ' + k + ' terms. Pair first and last: ' + a + ' + ' + last + ' = ' + (a + last) + '. Sum = (first + last) × (number of terms) ÷ 2 = ' + (a + last) + ' × ' + k + ' ÷ 2 = ' + (k * (a + last)) / 2 + '.', w: W(v, [[k * (a + last), 'That counts every pair twice. Divide by 2.']]) });
    }),
    tpl('squares', (r) => {
      const m = r.int(2, 12), n = r.int(2, 12); let t = 0; for (let k = 1; k <= Math.min(m, n); k++) t += (m - k + 1) * (n - k + 1);
      return N('How many squares of any size can be traced along the lines of a grid of ' + m + ' by ' + n + ' unit squares?', t, { s: 'For each side length k from 1 to ' + Math.min(m, n) + ', there are (' + m + ' − k + 1) × (' + n + ' − k + 1) positions. Adding them gives ' + t + '.', w: W(t, [[m * n, 'That counts only the unit squares. Count squares of all sizes.']]) });
    }),
    tpl('sticks', (r) => {
      const sh = r.pick([['triangles', 3, 2], ['squares', 4, 3], ['pentagons', 5, 4], ['hexagons', 6, 5]]), n = r.int(10, 100), back = r.bool(), tot = sh[1] + (n - 1) * sh[2];
      return N(back ? 'A row of ' + sh[0] + ' is built from sticks, neighbors sharing a side. One uses ' + sh[1] + ' sticks, two use ' + (sh[1] + sh[2]) + ', three use ' + (sh[1] + 2 * sh[2]) + '. With exactly ' + tot + ' sticks, how many can be built?' : 'A row of ' + sh[0] + ' is built from sticks, neighbors sharing a side. One uses ' + sh[1] + ' sticks, two use ' + (sh[1] + sh[2]) + ', three use ' + (sh[1] + 2 * sh[2]) + '. How many sticks for ' + n + '?', back ? n : tot, { s: 'Each extra shape adds ' + sh[2] + ' sticks. Total for n shapes: ' + sh[1] + ' + ' + sh[2] + ' × (n − 1)' + (back ? ', which equals ' + tot + ' at n = ' + n + '.' : ' = ' + tot + '.'), w: [] });
    }),
    tpl('rows', (r) => {
      const R = r.int(8, 60), kind = r.pick(['first', 'last', 'sum']), first = (R * (R - 1)) / 2 + 1, last = (R * (R + 1)) / 2, sm = (R * (first + last)) / 2;
      const v = kind === 'first' ? first : kind === 'last' ? last : sm;
      return N('Whole numbers are written in rows: row 1 is 1; row 2 is 2, 3; row 3 is 4, 5, 6; row 4 is 7, 8, 9, 10; each row has one more number than the one before. What is the ' + (kind === 'first' ? 'first number' : kind === 'last' ? 'last number' : 'sum of all the numbers') + ' in row ' + R + '?', v, { s: 'Rows 1 to ' + (R - 1) + ' hold ' + (R * (R - 1)) / 2 + ' numbers, so row ' + R + ' runs from ' + first + ' to ' + last + (kind === 'sum' ? ', with sum ' + R + ' × (' + first + ' + ' + last + ') ÷ 2 = ' + sm : '') + '.', w: kind === 'first' ? [[last, 'That is the last number of the row. The first number comes right after the end of the previous row.']] : [] });
    }),
    tpl('telescope', (r) => {
      const a = r.int(1, 8), n = r.int(a + 3, 60), ans = fr(n + 1 - a, a * (n + 1));
      return N('Find ' + '{1/(' + a + '×' + (a + 1) + ')} + {1/(' + (a + 1) + '×' + (a + 2) + ')} + ... + {1/(' + n + '×' + (n + 1) + ')}. (Lowest terms. Hint: {1/(k(k+1))} = {1/k} − {1/(k+1)}.)', ans, { s: 'Each term is {1/k} − {1/(k+1)}, so the sum collapses to {1/' + a + '} − {1/' + (n + 1) + '} = ' + ans + '.', w: W(ans, [[fr(1, a * (n + 1)), 'The first and last pieces left after cancelling are {1/' + a + '} and {1/' + (n + 1) + '}. Subtract, do not multiply.']]) });
    }),
  ],
});
