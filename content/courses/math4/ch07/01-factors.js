import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const divs = (n) => { const o = []; for (let i = 1; i <= n; i++) if (n % i === 0) o.push(i); return o; };
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a / gcd(a, b)) * b;
const sum = (a) => a.reduce((x, y) => x + y, 0);
const keep = (list, ans) => list.filter((x) => String(x[0]) !== String(ans));

export default lesson({
  id: 'm4-7-1-factors',
  title: 'Factors',
  blurb: 'Factor pairs, listing every factor, counting factors, and the difference between factors and multiples.',
  concepts: ['factors', 'multiples', 'common-factors'],

  tryFirst: [
    num('t1', 'List the factors of 36 in your head or on paper. How many factors does 36 have?', 9, {
      h: ['A factor of 36 divides 36 with nothing left over. 1 and 36 are the first pair.', 'Try 2, 3, 4, 5, 6 in turn. Each hit gives a partner.'],
      s: '1×36, 2×18, 3×12, 4×9, 6×6. That gives 1, 2, 3, 4, 6, 9, 12, 18, 36. Since 6×6 uses 6 only once, there are 9 factors.',
      w: [['10', 'Check 6. It pairs with itself, so it is only one factor, not two.'], ['8', 'You may have missed a pair. Test every number from 1 to 6.']],
    }),
    num('t2', 'Twenty-four chairs are put in equal rows, with no chair left over. A row can have 1 chair. How many different row lengths are possible?', 8, {
      h: ['A row length has to divide 24 exactly.'],
      s: 'The row lengths are the factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. That is 8.',
      w: [['4', 'That counts only the pairs. Each pair gives two different row lengths, such as 3 rows of 8 or 8 rows of 3 chairs.']],
    }),
  ],

  learn: [
    p('A <b>factor</b> of a number divides it exactly. There is nothing left over. 6 is a factor of 30 because 30 ÷ 6 = 5.'),
    p('Factors come in pairs. If 6 × 5 = 30, then both 6 and 5 are factors of 30.'),
    ex('List every factor of 40', ['Start at 1. 1 × 40 = 40. That pair is 1 and 40.', 'Try 2: 2 × 20 = 40. Pair 2 and 20.', 'Try 3: it does not work. Try 4: 4 × 10 = 40. Pair 4 and 10.', 'Try 5: 5 × 8 = 40. Pair 5 and 8.', 'Try 6 and 7: no. Next is 8, and we already have 8. Stop.', 'Factors: 1, 2, 4, 5, 8, 10, 20, 40. That is 8 factors.']),
    rule('<b>When to stop.</b> Test 1, 2, 3, and so on. Stop when the number you test is already in your list. After that you only see old pairs again.'),
    p('A <b>multiple</b> of a number is what you get when you count by that number. The multiples of 6 are 6, 12, 18, 24, and so on. They go on forever.'),
    tbl(['', 'Factors of 12', 'Multiples of 12'], [['Examples', '1, 2, 3, 4, 6, 12', '12, 24, 36, 48, …'], ['How many?', 'Only a few', 'Never stop'], ['Size', 'Never bigger than 12', 'Never smaller than 12']], 'Factors are small. Multiples are big.'),
    warn('<b>Watch out.</b> 3 is a factor of 12, but 3 is not a multiple of 12. "Factor" goes down to small numbers. "Multiple" goes up to big ones.'),
    p('A <b>common factor</b> of two numbers divides both. A <b>common multiple</b> is a number on both lists of multiples. The widget shows both for two numbers.'),
    widget('lcmGcd', { a: 12, b: 18 }),
    rule('<b>Squares.</b> A number like 36 = 6 × 6 has a pair that is one number twice. So its factors come in pairs plus one extra in the middle. A square number has an odd number of factors. Every other number has an even number.'),
    mcq('Dana says: "The factors of 20 are 1, 2, 4, 5, 10, 20, and also 40, because 20 × 2 = 40." What is wrong?', ['Nothing, 40 is a factor of 20.', '40 is a multiple of 20. A factor of 20 can never be bigger than 20.', '20 has no factor 2.'], 1, '20 ÷ 40 is not a whole number, so 40 does not divide 20. 40 is a multiple of 20, not a factor.', 'Spot the mistake'),
  ],

  practice: [
    set('p1', 'List all the factors of 30. Separate them with commas.', '1,2,3,5,6,10,15,30', {
      h: ['Find the pairs: 1 × 30, 2 × 15, and so on.', 'Test 4. Test 5. Test 6.'],
      s: '1×30, 2×15, 3×10, 5×6. Factors: 1, 2, 3, 5, 6, 10, 15, 30.',
      w: [['1,2,3,5,6,10,15', 'You are missing 30. Every number is a factor of itself.'], ['1,2,3,5,10,15,30', 'You are missing 6. 5 × 6 = 30.']],
    }),
    num('p2', 'How many factors does 48 have?', 10, {
      h: ['Pairs: 1×48, 2×24, 3×16, ...', 'Keep going until the numbers meet.'],
      s: '1×48, 2×24, 3×16, 4×12, 6×8. Five pairs make 10 factors.',
      w: [['8', 'You stopped early. 4 × 12 and 6 × 8 are pairs too.'], ['5', 'You counted pairs. Each pair has two factors.']],
    }),
    num('p3', 'Which number below 50 has the most factors? (Hint: one of 24, 36, 48 does.)', 48, {
      h: ['Count the factors of each one.', '36 has 9. How many do 24 and 48 have?'],
      s: '24 has 8 factors, 36 has 9, and 48 has 10. So 48.',
      w: [['36', '36 has 9 factors but 48 has 10. Count 48 again: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.']],
    }),
    num('p4', 'How many numbers are factors of both 24 and 36?', 6, {
      h: ['List the factors of each, then find the numbers in both lists.'],
      s: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Common: 1, 2, 3, 4, 6, 12. That is 6.',
      w: [['12', '12 is the biggest common factor. The question asks how many there are.']],
    }),
    num('p5', 'I am between 25 and 40. Both 4 and 6 are factors of me. What number am I?', 36, {
      h: ['I am a multiple of 4 and a multiple of 6.', 'Multiples of 4: 28, 32, 36. Which of these is also a multiple of 6?'],
      s: 'Multiples of 4 between 25 and 40 are 28, 32, 36. Only 36 = 6 × 6 is a multiple of 6.',
      w: [['24', '24 is a multiple of both, but it is not between 25 and 40.']],
    }),
    num('p6', 'What is the smallest number that has exactly 5 factors?', 16, {
      h: ['5 is an odd number of factors. What kind of number has an odd number of factors?', 'Try the squares: 4, 9, 16, 25. How many factors does each have?'],
      s: 'Only squares have an odd number of factors. 4 has 3 factors, 9 has 3, and 16 has 1, 2, 4, 8, 16. That is 5. So 16.',
      w: [['12', '12 has 6 factors, not 5.'], ['9', '9 has only 3 factors: 1, 3, 9.'], ['25', '25 has only 3 factors: 1, 5, 25.']],
    }),
    mc('p7', 'Which statement is true?', ['Every factor of 18 is also a multiple of 18.', 'Every multiple of 18 is also a multiple of 9.', 'Every multiple of 9 is also a multiple of 18.', 'Every factor of 18 is also a factor of 9.'], 1, {
      h: ['18 = 2 × 9. Count by 18s and see what you land on.'],
      s: 'Multiples of 18 are 18, 36, 54. Each is also a multiple of 9. But 9 itself is a multiple of 9 and not of 18.',
      w: [[2, '9 is a multiple of 9. Is it a multiple of 18?'], [0, '3 is a factor of 18. Is 3 a multiple of 18?']],
    }),
  ],

  challenge: [
    chain('Tile rectangles', 'You have 36 square tiles. You build a rectangle with all of them. A 4 by 9 rectangle and a 9 by 4 rectangle count as the same rectangle.', [
      num('c1a', 'How many different rectangles can you build?', 5, { h: ['Each rectangle is a factor pair of 36.'], s: '1×36, 2×18, 3×12, 4×9, 6×6. That is 5.' }),
      num('c1b', 'The distance around a rectangle is its perimeter. Which rectangle has the smallest perimeter? Give the perimeter.', 24, { h: ['The perimeter is 2 times (length + width).', 'Compare the sums 1+36, 2+18, 3+12, 4+9, 6+6.'], s: '6 + 6 = 12 is the smallest sum, so the perimeter is 2 × 12 = 24.' }),
      num('c1c', 'Which rectangle has the largest perimeter? Give the perimeter.', 74, { h: ['Which pair has the biggest sum?'], s: '1 + 36 = 37. The perimeter is 2 × 37 = 74.' }),
    ], 'The idea: the factor pair that is closest together makes the most square-like shape, and it has the shortest border.'),
    chain('The mystery number', 'The number n is a factor of 72 and a multiple of 6. It is also greater than 12.', [
      num('c2a', 'How many multiples of 6 are factors of 72?', 6, { h: ['List the factors of 72. Which are multiples of 6?'], s: 'Factors of 72: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. Multiples of 6: 6, 12, 18, 24, 36, 72. That is 6.' }),
      num('c2b', 'How many of these are greater than 12?', 4, { h: ['Cross out 6 and 12.'], s: 'The numbers are 18, 24, 36, 72. That is 4.' }),
      num('c2c', 'Now you learn that n is not a multiple of 9. What is n?', 24, { h: ['Which of 18, 24, 36, 72 are multiples of 9?'], s: '18, 36 and 72 are multiples of 9. Only 24 is left, so n = 24.' }),
    ], 'The idea: write down every possibility first, then use each clue to cross some out.'),
    mc('c3', 'Find the error. Lena says: "45 has 4 factors: 1, 5, 9, 45. I found 1 × 45 and 5 × 9, and that is all." What went wrong?', ['Nothing. 45 has exactly 4 factors.', 'She skipped 3 × 15. 45 has 6 factors.', 'She counted 45 twice. 45 has 3 factors.', 'Odd numbers have no factor pairs.'], 1, {
      s: 'She did not test 3. 3 × 15 = 45, so 3 and 15 are factors too. The factors are 1, 3, 5, 9, 15, 45: six of them.',
      w: [[0, 'Test 3. Does 3 go into 45?'], [2, '45 is not a square, so its factors come in whole pairs.']],
    }),
  ],

  quiz: [
    tpl('count', (r) => {
      const n = r.pick([24, 30, 36, 40, 42, 48, 54, 56, 60, 64, 66, 72, 80, 84, 90, 96, 100, 108, 120]) + r.pick([0, 0, 0, 4, 6, 10, 12]) * (r.bool() ? 1 : 0);
      const d = divs(n);
      return N('How many factors does ' + n + ' have?', d.length, { s: 'The factors are ' + d.join(', ') + '. That is ' + d.length + '.', w: keep([[d.length / 2, 'You counted the pairs. Each pair has two factors.'], [d.length - 1, 'Did you leave out 1 or ' + n + '? Both are factors.']], d.length) });
    }),
    tpl('sumf', (r) => {
      const n = r.int(10, 60);
      const d = divs(n);
      return N('Add up all the factors of ' + n + '. What is the sum?', sum(d), { s: d.join(' + ') + ' = ' + sum(d) + '.', w: keep([[sum(d) - n, 'You left out ' + n + ' itself. It is a factor too.'], [sum(d) - 1, 'You left out 1. It is a factor too.']], sum(d)) });
    }),
    tpl('second', (r) => {
      const n = r.int(12, 150);
      const d = divs(n);
      if (d.length < 3) return N('What is the largest factor of ' + n + ' that is smaller than ' + n + '?', 1, { s: 'Only 1 and ' + n + ' divide ' + n + '. So 1.' });
      const v = d[d.length - 2];
      return N('What is the largest factor of ' + n + ' that is smaller than ' + n + '?', v, { s: 'The factors are ' + d.join(', ') + '. The one before ' + n + ' is ' + v + '.', w: keep([[n, 'It has to be smaller than ' + n + '.']], v) });
    }),
    tpl('common', (r) => {
      const g = r.pick([2, 3, 4, 5, 6]);
      const a = g * r.int(2, 9), b = g * r.int(2, 9);
      const c = divs(a).filter((x) => b % x === 0);
      return N('How many numbers are factors of both ' + a + ' and ' + b + '?', c.length, { s: 'Common factors: ' + c.join(', ') + '. That is ' + c.length + '.', w: keep([[Math.max(...c), 'That is the biggest common factor. The question asks how many.']], c.length) });
    }),
    tpl('lcm', (r) => {
      const a = r.int(3, 12), b = r.int(3, 12);
      if (a === b) return N('What is the smallest number that is a multiple of both 4 and 6?', 12, { s: '4, 8, 12 and 6, 12. The first match is 12.' });
      const L = lcm(a, b);
      return N('What is the smallest number that is a multiple of both ' + a + ' and ' + b + '?', L, { s: 'Count by ' + Math.max(a, b) + ' until you hit a multiple of ' + Math.min(a, b) + '. The first is ' + L + '.', w: keep([[a * b, 'That is a common multiple, but is there a smaller one?']], L) });
    }),
    tpl('rect', (r) => {
      const n = r.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 48, 60, 64, 72]);
      const k = Math.ceil(divs(n).length / 2);
      const who = name(r);
      return N(who + ' makes rectangles from ' + n + ' square tiles, using all of them. A rectangle and the same rectangle turned sideways count as one. How many different rectangles are possible?', k, { s: 'Count the factor pairs of ' + n + ': there are ' + k + '.', w: keep([[divs(n).length, 'A rectangle and its turned copy are the same shape. Count pairs, not factors.']], k) });
    }),
    tpl('notfactor', (r) => {
      const n = r.pick([24, 36, 48, 60, 72, 90, 120]);
      const d = divs(n);
      const bad = [];
      for (let x = 5; x < n; x++) if (n % x) bad.push(x);
      const w = bad[r.int(0, bad.length - 1)];
      const rights = r.shuffle(d.filter((x) => x > 1 && x < n)).slice(0, 3);
      return choice(r, 'Which of these is NOT a factor of ' + n + '?', String(w), rights.map(String), { s: n + ' ÷ ' + w + ' leaves a remainder, so ' + w + ' is not a factor.' });
    }),
    tpl('evenf', (r) => {
      const n = r.int(20, 140);
      const d = divs(n).filter((x) => x % 2 === 0);
      return N('How many of the factors of ' + n + ' are even numbers?', d.length, { s: 'Even factors of ' + n + ': ' + d.join(', ') + '. That is ' + d.length + '.', w: keep([[divs(n).length, 'That counts all the factors. Only count the even ones.']], d.length) });
    }),
  ],
});
