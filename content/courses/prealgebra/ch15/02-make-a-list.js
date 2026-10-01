import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const W = (ans, list) => list.filter((x) => String(x[0]) !== String(ans));
const parts = (n, k) => { // partitions of n into parts each at most k
  const w = new Array(n + 1).fill(0); w[0] = 1;
  for (let c = 1; c <= k; c++) for (let i = c; i <= n; i++) w[i] += w[i - c];
  return w[n];
};
const digs = (n) => String(n).split('').map(Number);

export default lesson({
  id: 'pre-15-2-make-a-list',
  title: 'Make an organized list',
  blurb: 'When you must find every possibility, do not guess: build a systematic list that cannot skip or repeat anything.',
  concepts: ['systematic-listing', 'problem-solving'],

  tryFirst: [
    num('t1', 'How many different two-digit numbers have digits that multiply to 12? (For example 26 works, since 2 × 6 = 12.)', 4, {
      h: ['Case by the tens digit, 1 through 9. What must the units digit be?', 'A digit cannot be bigger than 9.'],
      s: 'Tens digit 1 would need units 12: impossible. Tens 2: units 6 → 26. Tens 3: 4 → 34. Tens 4: 3 → 43. Tens 6: 2 → 62. Tens 5 and 7, 8, 9 do not divide 12. So 26, 34, 43, 62: 4 numbers.',
      w: [['2', 'Both 26 and 62 count, and so do 34 and 43. The order of the digits gives different numbers.'], ['6', 'Check each number you listed: 2×6, 3×4, 4×3, 6×2 are the only ones. 12×1 is not allowed because 12 is not a digit.']],
    }),
    num('t2', 'How many different ways can you write 6 as a sum of positive whole numbers when order does not matter? (6 on its own counts as one way, and 5 + 1 is the same as 1 + 5.)', 11, {
      h: ['Organize by the biggest number in the sum: start with 6, then 5, then 4, ...', 'Within each, list the rest from big to small so you never repeat.'],
      s: '6; 5+1; 4+2, 4+1+1; 3+3, 3+2+1, 3+1+1+1; 2+2+2, 2+2+1+1, 2+1+1+1+1; 1+1+1+1+1+1. That is 1 + 1 + 2 + 3 + 3 + 1 = 11.',
      w: [['10', 'You probably missed one. Organizing by the largest part: biggest 3 has three ways (3+3, 3+2+1, 3+1+1+1), biggest 2 has three ways.'], ['12', 'Check for duplicates: 4 + 2 and 2 + 4 are the same way.']],
    }),
  ],

  learn: [
    p('Some questions say "find all" or "how many different". There is no shortcut formula, and guessing loses items. The skill is to build a <b>systematic list</b>: an organized list in which each possibility has exactly one place.'),
    rule('<b>The listing method.</b> (1) Pick an <b>order</b> for the list (smallest to largest, alphabetical, by first item). (2) Sort into <b>cases</b> by the first item or the biggest item. (3) Inside each case, again list in order. (4) Check: nothing repeated, nothing missed. (5) Count.'),
    ex('Sums of 5', ['Write 5 as a sum of positive whole numbers, order ignored. Sort by the biggest number.', 'Biggest 5: 5.', 'Biggest 4: 4+1.', 'Biggest 3: 3+2, 3+1+1.', 'Biggest 2: 2+2+1, 2+1+1+1.', 'Biggest 1: 1+1+1+1+1.', 'Total: 1 + 1 + 2 + 2 + 1 = 7 ways.']),
    p('Writing each sum from big to small is the trick that stops duplicates: 3+2 is on the list, so 2+3 never needs to be.'),
    tbl(['Factor pairs of 36', 'Product'], [['1 × 36', '36'], ['2 × 18', '36'], ['3 × 12', '36'], ['4 × 9', '36'], ['6 × 6', '36']], 'Smallest factor first: stop when the pairs meet'),
    p('For factor pairs, march up from 1 and stop at the square root. After 6 the pairs would repeat in reverse (9 × 4, 12 × 3, ...). A tidy list also tells you when to stop.'),
    ex('Three digits that multiply to 8', ['How many 3-digit numbers have digits that multiply to 8?', 'First find the sets of digits: {1, 1, 8}, {1, 2, 4}, {2, 2, 2}. (Digits cannot be 0, or the product would be 0.)', '{1, 1, 8} can be arranged 118, 181, 811: 3 numbers.', '{1, 2, 4} has 6 arrangements: 124, 142, 214, 241, 412, 421.', '{2, 2, 2} gives 222: 1 number.', 'Total 3 + 6 + 1 = 10.']),
    warn('<b>Order matters in the list, not always in the answer.</b> Decide first whether 3+2 and 2+3 are the same thing. In "sums" they usually are; in "numbers" (like 118 and 181) they are not. Read what the problem counts before you start listing.'),
    widget('arrangements', { n: 3, k: 3, nlabel: 'distinct digits', klabel: 'places' }),
    p('When all the digits in a set are different, the number of ways to arrange them is 3 × 2 × 1 = 6 (as in the picture). When two digits are the same, like 1, 1, 8, there are fewer, because swapping the two 1s changes nothing: only 3 arrangements.'),
    mcq('Leo lists the ways to write 4 as a sum (order ignored): 4, 3+1, 1+3, 2+2, 2+1+1, 1+2+1, 1+1+2, 1+1+1+1. "That is 8 ways." What is wrong?', ['Nothing, 8 is right.', 'Order does not matter, so 3+1 and 1+3 are the same way, and so are the three arrangements of 2+1+1. There are only 5 ways.', 'He missed the sums 5+(−1).'], 1, 'Listing from biggest to smallest keeps one version of each: 4, 3+1, 2+2, 2+1+1, 1+1+1+1. That is 5.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'In how many different ways can 5 be written as a sum of positive whole numbers if order does not matter? (5 itself counts as one way.)', 7, {
      h: ['List by the largest number in the sum.'],
      s: '5; 4+1; 3+2; 3+1+1; 2+2+1; 2+1+1+1; 1+1+1+1+1. That is 7.',
      w: [['5', 'You may have stopped early. Look at the sums whose largest part is 3, and 2.'], ['16', 'That counts different orders as different ways. Here 3 + 2 and 2 + 3 are the same.']],
    }),
    num('p2', 'How many pairs of positive whole numbers (a, b) with a ≤ b have a × b = 36?', 5, {
      h: ['Start with a = 1 and go up until a is bigger than b.'],
      s: '1×36, 2×18, 3×12, 4×9, 6×6. After 6 the pairs repeat. 5 pairs.',
      w: [['9', '9 is the number of divisors of 36. The pairs (a, b) with a ≤ b pair them up, giving 5.']],
    }),
    num('p3', 'How many different sets of three different digits from 1 to 9 add up to 10?', 4, {
      h: ['List them in increasing order, smallest digit first.', 'The smallest digit 1 pairs with two digits that add to 9.'],
      s: '{1,2,7}, {1,3,6}, {1,4,5}, {2,3,5}. With smallest digit 3 the others would be at least 4 and 5, which sum too high. 4 sets.',
      w: [['3', 'You may have missed {2,3,5}, which has no 1.'], ['5', 'Check each set: the digits must be different and add to exactly 10.']],
    }),
    num('p4', 'A rectangle has whole-number sides and a perimeter of 24. How many different areas are possible?', 6, {
      h: ['The two different sides add to 12. List the possible pairs.', 'Find the area of each.'],
      s: 'Sides a + b = 12: (1,11), (2,10), (3,9), (4,8), (5,7), (6,6). Areas 11, 20, 27, 32, 35, 36: all different. 6 areas.',
      w: [['11', 'That counts every possible side length of a rectangle, but rectangles come as pairs. List (1,11), (2,10), ...'], ['12', '(1,11) and (11,1) are the same rectangle turned. Count it once.']],
    }),
    num('p5', 'In how many ways can you make exactly 25 cents using exactly 7 coins, each a penny (1¢), nickel (5¢) or dime (10¢)?', 1, {
      h: ['Try cases by the number of dimes: 0, 1, or 2.', 'For each, check whether the leftover coins can fill the remaining value.'],
      s: '0 dimes: 7 coins of 1¢ and 5¢ total at most 35 and must hit 25: 4 nickels + ... x+y=7, x+5y=25 gives y = 4.5, no. 1 dime: 15¢ from 6 coins: x+y=6, x+5y=15 gives y = 2.25, no. 2 dimes: 5¢ from 5 coins: 5 pennies, works. 3 dimes is 30¢, too much. Exactly 1 way: 2 dimes + 5 pennies.',
      w: [['0', 'Look at 2 dimes: that leaves 5¢ with 5 coins, which is five pennies.'], ['2', 'Check each case: only one of the cases gives a whole number of coins.']],
    }),
    num('p6', 'How many three-digit numbers have digits that multiply to 8?', 10, {
      h: ['First find the sets of three digits (1 to 9) with product 8.', 'Then count the arrangements of each set. Be careful with repeated digits.'],
      s: 'Sets: {1,1,8} gives 118, 181, 811 (3). {1,2,4} gives 6 numbers. {2,2,2} gives 222 (1). Total 10.',
      w: [['6', 'That counts only {1,2,4}. Also look at {1,1,8} and {2,2,2}.'], ['12', '{1,1,8} has only 3 arrangements, not 6, since the two 1s are identical.']],
    }),
    num('p7', 'A three-digit palindrome reads the same forwards and backwards, like 232 or 909. How many three-digit palindromes are divisible by 3?', 30, {
      h: ['A palindrome is aba. Its digit sum is 2a + b. When is that a multiple of 3?', 'For each first digit a from 1 to 9, list which middle digits b work.'],
      s: '2a + b divisible by 3 means b leaves the same remainder as a when divided by 3. For a = 3, 6, 9 (remainder 0): b in {0,3,6,9}, 4 choices each: 12. For a = 1, 4, 7 (remainder 1): b in {1,4,7}, 3 choices each: 9. For a = 2, 5, 8 (remainder 2): b in {2,5,8}, 3 choices each: 9. Total 12 + 9 + 9 = 30.',
      w: [['90', 'That is the number of all three-digit palindromes. Only some are divisible by 3.'], ['33', 'Check the cases by remainder: each a gives 3 or 4 good middle digits, and there are 9 values of a.']],
    }),
  ],

  challenge: [
    chain('Sums of 7', 'Write 7 as a sum of positive whole numbers, with order ignored. Sort the list by how many parts it has.', [
      num('c1a', 'How many ways use exactly 2 parts?', 3, { h: ['6+1, 5+2, 4+3...'], s: '6+1, 5+2, 4+3: 3 ways.' }),
      num('c1b', 'How many ways use exactly 3 parts?', 4, { h: ['Biggest part 5: 5+1+1. Biggest part 4: 4+2+1. Biggest part 3: 3+3+1, 3+2+2.'], s: '5+1+1, 4+2+1, 3+3+1, 3+2+2: 4 ways.' }),
      num('c1c', 'In total, how many ways to write 7 this way (any number of parts, 7 on its own included)?', 15, { h: ['Parts: 1 → 1 way; 2 → 3; 3 → 4; then 4, 5, 6, 7 parts.', 'List the 4-part ways carefully, biggest part first (4+1+1+1, ...). 5 parts has 2 ways; 6 parts and 7 parts have 1 each.'], s: 'Number of parts 1 to 7: 1, 3, 4, 3, 2, 1, 1. Total 15.', w: [['14', 'One case was missed. With 4 parts there are three ways: 4+1+1+1, 3+2+1+1, 2+2+2+1.']] }),
    ], 'The idea: sorting by the number of parts is another way to organize the list. Each case is short enough to complete, and the cases add up to the total.'),
    chain('Digits puzzle', 'A secret number has three digits, all nonzero, whose product is 24.', [
      num('c2a', 'How many different sets of three digits have product 24? (A set like {2, 2, 6} counts once.)', 4, { h: ['Smallest digit first: 1, then 2, then 3...'], s: '{1,3,8}, {1,4,6}, {2,2,6}, {2,3,4}: 4 sets.' }),
      num('c2b', 'The digits also add to 9. How many of those sets work?', 1, { h: ['Add the digits in each set: 12, 11, 10, 9.'], s: '{1,3,8} sums to 12, {1,4,6} to 11, {2,2,6} to 10, {2,3,4} to 9. Only {2,3,4}.' }),
      num('c2c', 'What is the smallest number that can be made from those digits?', 234, { h: ['Put the smallest digit first.'], s: 'Smallest first: 234.', w: [['432', 'That is the largest. The smallest has the smallest digit in the hundreds place.']] }),
    ], 'The idea: list candidates by sets first, then use extra clues to throw sets out. Each clue prunes the list.'),
    mc('c3', 'Find the error. Ava counts the factor pairs of 20: "1×20, 2×10, 4×5, 5×4, 10×2, 20×1: six pairs." If the pair (4, 5) is the same as (5, 4), how many pairs are there?', ['3 pairs: she listed each pair twice.', '6 pairs, she is right.', '10 pairs.', '2 pairs.'], 0, {
      s: 'Writing the smaller factor first gives 1×20, 2×10, 4×5. After the pairs meet, everything repeats in reverse. 3 pairs.',
      w: [[1, 'The pairs after 4×5 are reversed copies of the earlier ones.'], [2, 'That is more than she wrote. Duplicates reduce the count, they do not raise it.']],
    }),
  ],

  quiz: [
    tpl('partition', (r) => {
      const n = r.int(6, 12), k = r.int(2, Math.min(n, 7)), c = parts(n, k);
      return N('In how many ways can ' + n + ' be written as a sum of positive whole numbers, with order ignored, if no number in the sum is bigger than ' + k + '? (A single number counts as a sum if it fits.)', c, { s: 'List by the biggest number used, from ' + k + ' down to 1, and complete each case. The total is ' + c + '.', w: W(c, [[c - 1, 'One case is usually missed. Check the cases with the biggest part ' + k + ', then ' + (k - 1) + ', and so on.']]) });
    }),
    tpl('pairs', (r) => {
      const n = r.int(12, 300); let c = 0; for (let a = 1; a * a <= n; a++) if (n % a === 0) c++;
      let d = 0; for (let a = 1; a <= n; a++) if (n % a === 0) d++;
      return N('How many pairs of positive whole numbers (a, b) with a ≤ b have a × b = ' + n + '?', c, { s: 'Test a = 1, 2, 3, ... up to the square root of ' + n + ': ' + c + ' values of a work.', w: W(c, [[d, 'That counts every divisor. Each pair uses two of them, so go only up to the square root.']]) });
    }),
    tpl('digprod', (r) => {
      const len = r.pick([3, 3, 4]), P = r.pick([4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 24, 27, 28, 30, 32, 36, 40, 42, 48, 54, 56, 60, 64, 72]), lo = len === 3 ? 100 : 1000, hi = len === 3 ? 999 : 9999; let c = 0; for (let i = lo; i <= hi; i++) if (digs(i).reduce((a, b) => a * b, 1) === P) c++;
      return N('How many ' + len + '-digit numbers have digits that multiply to ' + P + '?', c, { s: 'Find the sets of digits with that product, then count the arrangements of each (fewer when a digit repeats). Total ' + c + '.', w: W(c, [[c + 3, 'Check repeated digits: a set with a repeated digit has fewer arrangements.']]) });
    }),
    tpl('sets', (r) => {
      const k = r.int(2, 4), S0 = r.int(k * (k + 1) / 2 + 2, 9 * k - k * (k - 1) / 2); let c = 0;
      const rec = (start, left, sum) => { if (left === 0) { if (sum === S0) c++; return; } for (let d = start; d <= 9; d++) rec(d + 1, left - 1, sum + d); }; rec(1, k, 0);
      if (!c) return N('How many ways are there to choose 1 digit from 1 to 1?', 1, { s: '1.' });
      return N('How many sets of ' + k + ' different digits from 1 to 9 add up to ' + S0 + '?', c, { s: 'List the sets with the smallest digit first, and stop when the digits get too big. There are ' + c + '.', w: W(c, [[c + 1, 'Check that each set uses different digits and adds to exactly ' + S0 + '.']]) });
    }),
    tpl('rect', (r) => {
      const half = r.int(5, 40), per = half * 2, kind = r.pick(['count', 'area']);
      const cnt = Math.floor(half / 2), mx = Math.floor(half / 2) * Math.ceil(half / 2);
      return N(kind === 'count' ? 'How many different rectangles have whole-number sides and a perimeter of ' + per + '? (A rectangle turned sideways is the same rectangle.)' : 'A rectangle has whole-number sides and a perimeter of ' + per + '. What is the largest area it can have?', kind === 'count' ? cnt : mx, { s: 'The sides add to ' + half + '. List (1, ' + (half - 1) + '), (2, ' + (half - 2) + '), ... up to the middle. ' + (kind === 'count' ? cnt + ' pairs.' : 'The area is biggest when the sides are as equal as possible: ' + Math.floor(half / 2) + ' × ' + Math.ceil(half / 2) + ' = ' + mx + '.'), w: kind === 'count' ? W(cnt, [[half - 1, 'A rectangle with sides (a, b) is the same as (b, a). Count only the first half of the list.']]) : [] });
    }),
    tpl('pal', (r) => {
      const len = r.pick([3, 4, 5]), m = r.int(2, 13), lo = Math.pow(10, len - 1), hi = Math.pow(10, len) - 1; let c = 0;
      for (let i = lo; i <= hi; i++) { const s = String(i); if (s === s.split('').reverse().join('') && digs(i).reduce((a, b) => a + b, 0) % m === 0) c++; }
      return N('A palindrome reads the same forwards and backwards. How many ' + len + '-digit palindromes have a digit sum that is a multiple of ' + m + '?', c, { s: 'Choose the outer digits and the middle one(s); list which choices make the digit sum a multiple of ' + m + '. The total is ' + c + '.', w: W(c, [[c + 1, 'Check the first digit: it cannot be 0.']]) });
    }),
    tpl('coins', (r) => {
      let T, k, c = 0;
      for (let tries = 0; tries < 30 && !c; tries++) {
        T = r.int(20, 99); k = r.int(4, 14); c = 0;
        for (let q = 0; q <= 3; q++) for (let d = 0; d <= 9; d++) for (let nk = 0; nk <= 20; nk++) { const pn = k - q - d - nk; if (pn >= 0 && q * 25 + d * 10 + nk * 5 + pn === T) c++; }
      }
      if (!c) { T = 30; k = 3; c = 1; }
      return N('In how many ways can you make exactly ' + T + ' cents using exactly ' + k + ' coins, each a penny, nickel, dime or quarter?', c, { s: 'Case by the number of quarters, then dimes, then nickels; the pennies fill in the rest, and the coin count must work out. There are ' + c + ' ways.', w: W(c, [[c + 1, 'Check that the number of coins is exactly ' + k + ' in each way you listed.']]) });
    }),
  ],
});
