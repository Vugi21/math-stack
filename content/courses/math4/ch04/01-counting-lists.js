import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain, name, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

// keep only wrong answers that differ from the right one (and from each other)
const wr = (ans, list) => {
  const seen = new Set([ans]);
  return list.filter(([a]) => { if (seen.has(a) || a < 0) return false; seen.add(a); return true; });
};
const hasDigit = (n, d) => String(n).includes(String(d));

export default lesson({
  id: 'm4-4-1-counting-lists',
  title: 'Counting lists',
  blurb: 'List things in order, count a range without listing it, and never count the same thing twice.',
  concepts: ['counting', 'systematic-listing', 'fence-post'],

  tryFirst: [
    num('t1', 'How many whole numbers are there from 17 to 41, counting both 17 and 41?', 25, {
      h: ['Try a small case first: how many numbers from 3 to 6?', 'From 3 to 6 you get 3, 4, 5, 6. That is 4 numbers, not 6 − 3.'],
      s: '41 − 17 = 24 steps. The first number needs no step, so there are 24 + 1 = 25 numbers.',
      w: [['24', 'That is the number of steps between them. Count the starting number too.']],
    }),
    num('t2', 'A straight fence is 20 meters long. There is a post at each end and one every 4 meters. How many posts are there?', 6, {
      h: ['Draw the fence. Put a post at 0, then 4, then 8.'],
      s: 'Posts stand at 0, 4, 8, 12, 16 and 20 meters. That is 6 posts. There are 5 gaps, but 6 posts.',
      w: [['5', 'That counts the gaps between posts. The post at the very start is one more.']],
    }),
  ],

  learn: [
    p('Counting means finding <i>how many</i>. When there are only a few things, the safest method is to list them all. A good list follows a plan, so that nothing is missed and nothing is written twice.'),
    def('systematic list', 'A list made by following a fixed order, such as smallest first or one tens digit at a time. Because of the order, you can see when you have found everything.'),
    ex('Listing with a plan', ['How many 2-digit numbers have digits that add to 5?', 'Go in order by the tens digit.', 'Tens digit 1: 14. Tens digit 2: 23. Tens digit 3: 32. Tens digit 4: 41. Tens digit 5: 50.', 'Tens digit 6 would need a negative ones digit. So stop.', 'There are 5 numbers: 14, 23, 32, 41, 50.']),
    p('The plan was: <b>start with the smallest tens digit, then move up one step at a time</b>. A list in order shows a pattern, and a pattern tells you when you are done.'),
    tip('Before you list anything, decide the order. Say it out loud: "tens digit first, then ones digit." A list with no order is how numbers get skipped.'),
    def('inclusive range', 'A range of whole numbers that includes both the first and the last number. "From 20 to 60" counts 20 and 60 as well.'),
    formula('Counting a range', 'count = last − first + 1', 'Subtracting counts the steps between the numbers. Add 1 so that the starting number is counted too. From 20 to 60: 60 − 20 + 1 = 41 numbers.'),
    rule('<b>Counting a skip pattern.</b> For 5, 9, 13, …, 45 the numbers go up by 4. Find the number of steps: (45 − 5) ÷ 4 = 10. Add 1 for the first number. There are 11 numbers.'),
    p('A <b>fence post</b> problem is the same idea. A straight fence with 7 gaps has 8 posts, because posts and gaps differ by 1 when the fence has two ends. Counting steps and counting numbers differ by 1 for the same reason.'),
    tbl(['Fence', 'Gaps', 'Posts'], [['straight, two ends', '7', '8'], ['a closed loop (a square yard)', '8', '8']], 'A loop has no ends, so no extra post'),
    ex('Do not count twice', ['How many numbers from 1 to 40 have the digit 3?', 'Ones digit 3: 3, 13, 23, 33. That is 4 numbers.', 'Tens digit 3: 30, 31, …, 39. That is 10 numbers.', '33 is in both lists. Counting 4 + 10 would count it twice.', '4 + 10 − 1 = 13 numbers.']),
    key('Count carefully in two ways: use an ordered list so nothing is missed, and take out anything that appears in two lists so nothing is counted twice.'),
    warn('<b>Watch out.</b> When two lists share a member, adding the lists counts the shared member twice. Find the shared members and take them out once.'),
    mcq('Lena counts the numbers from 20 to 60 as 60 − 20 = 40. What is wrong?', ['Nothing. 40 is right.', 'She did not count the number 20 itself. The answer is 41.', 'She should have added 60 + 20.'], 1, 'Subtracting counts steps. There are 40 steps from 20 to 60, so 41 numbers, because the start is also counted.', 'Spot the mistake'),
    recap([['systematic list', 'a list in a fixed order, so nothing is missed'], ['inclusive range', 'counts both the first and the last number'], ['fence post', 'a straight fence has one more post than gaps'], ['overlap', 'something in two lists, which must be counted once']], [['Counting a range', 'last − first + 1'], ['Skip pattern', '(last − first) ÷ step + 1']]),
  ],

  practice: [
    num('p1', 'How many multiples of 6 are there from 1 to 100?', 16, {
      h: ['The multiples are 6, 12, 18, … Each is 6 times a counting number.', 'What is the biggest multiple of 6 that is at most 100?'],
      s: 'The multiples are 6 × 1, 6 × 2, …, 6 × 16 = 96. The next one, 102, is too big. So 16.',
      w: [['17', '6 × 17 = 102 is more than 100. Check where the list stops.'], ['100', 'That counts every number. Only every sixth number is a multiple of 6.']],
    }),
    num('p2', 'How many numbers are in this list? 3, 7, 11, 15, …, 99', 25, {
      h: ['The numbers go up by 4. How many steps from 3 to 99?', 'Number of steps, then add one for the first number.'],
      s: '(99 − 3) ÷ 4 = 24 steps. Add 1 for the first number. There are 25 numbers.',
      w: [['24', 'That is the number of steps. Count the first number too.'], ['96', 'That is 99 − 3. Divide by the step size 4, then add 1.']],
    }),
    num('p3', 'A path has 13 lamps, one at each end. The lamps are spaced 5 meters apart. How long is the path, in meters?', 60, {
      h: ['How many gaps are there between 13 lamps?'],
      s: '13 lamps make 12 gaps. 12 × 5 = 60 meters.',
      w: [['65', 'That uses 13 gaps. With two ends there is one fewer gap than lamps.']],
    }),
    num('p4', 'A book has pages numbered 1 to 120. How many digits are printed in all the page numbers?', 252, {
      h: ['Split by size: 1-digit pages, 2-digit pages, 3-digit pages.', 'Pages 1 to 9 print 9 digits. How many pages are 2-digit?'],
      s: 'Pages 1 to 9: 9 digits. Pages 10 to 99: 90 pages, 2 digits each, 180 digits. Pages 100 to 120: 21 pages, 3 digits each, 63 digits. 9 + 180 + 63 = 252.',
      w: [['240', 'That treats every page as 2 digits. Pages 1 to 9 have 1 digit and pages 100 to 120 have 3.'], ['360', 'That treats every page as 3 digits. Most pages are shorter than that.']],
    }),
    num('p5', 'How many 3-digit numbers have digits that add to 4? (The first digit cannot be 0.)', 10, {
      h: ['Go by the first digit. First digit 4: only 400.', 'First digit 3: the other two digits add to 1.'],
      s: 'First digit 1: 103, 112, 121, 130. First digit 2: 202, 211, 220. First digit 3: 301, 310. First digit 4: 400. That is 4 + 3 + 2 + 1 = 10.',
      w: [['9', 'You missed one. List by first digit and check each group.'], ['6', 'That leaves out a whole group. Check every first digit from 1 to 4.']],
    }),
    num('p6', 'How many ways can you make exactly 30 cents using nickels (5 cents), dimes (10 cents) and quarters (25 cents)? You may use as many of each as you like.', 5, {
      h: ['Start with the biggest coin. Can you use a quarter?', 'Then try the dime counts: 3 dimes, 2 dimes, 1 dime, 0 dimes.'],
      s: 'With a quarter: 25 + 5. Without a quarter: 3 dimes; 2 dimes and 2 nickels; 1 dime and 4 nickels; 6 nickels. That is 5 ways.',
      w: [['4', 'You missed one. Check the quarter case and each number of dimes.'], ['6', 'One of your ways repeats or is not 30 cents. Add up each one.']],
    }),
    num('p7', 'How many rectangles of any size can you find on a grid made of 2 rows and 3 columns of small squares? Count squares too.', 18, {
      h: ['Sort by shape: 1 by 1, 1 by 2, 1 by 3, 2 by 1, 2 by 2, 2 by 3.', 'There are 6 small squares. How many 1-by-2 rectangles fit in a row of 3?'],
      s: 'Write each size as (columns by rows): 1 by 1 is 6, 2 by 1 is 4, 3 by 1 is 2, 1 by 2 is 3, 2 by 2 is 2, 3 by 2 is 1. Total 6 + 4 + 2 + 3 + 2 + 1 = 18.',
      w: [['6', 'That counts only the smallest squares.'], ['12', 'Some sizes are missing. Include the long thin rectangles and the whole grid.']],
    }),
    num('p8', 'How many whole numbers from 1 to 60 have at least one digit 5?', 15, {
      h: ['Ones digit 5 first: 5, 15, …', 'Then the tens digit 5. Which number is in both lists?'],
      s: 'Ones digit 5: 5, 15, 25, 35, 45, 55 is 6 numbers. Tens digit 5: 50 to 59 is 10 numbers. 55 is in both. 6 + 10 − 1 = 15.',
      w: [['16', '55 appears in both lists. You counted it twice.'], ['6', 'That counts only the ones digit. The fifties have a 5 too.']],
    }),
  ],

  challenge: [
    chain('House numbers', 'A painter paints the numbers 1, 2, 3, …, 100 on 100 houses, one number on each house.', [
      num('c1a', 'How many of the house numbers contain at least one digit 8?', 19, { h: ['Ones digit 8: 8, 18, …, 98. Tens digit 8: 80 to 89.', 'One number is in both lists.'], s: 'Ones digit 8: 10 numbers. Tens digit 8: 10 numbers. 88 is in both. 10 + 10 − 1 = 19.', w: [['20', '88 has two 8s but it is only one house.']] }),
      num('c1b', 'How many times does the painter paint the digit 8? (88 uses it twice.)', 20, { h: ['Count 8s by place. How many numbers have 8 in the ones place? In the tens place?'], s: '10 houses have an 8 in the ones place. 10 houses have an 8 in the tens place. Each 8 is painted once: 10 + 10 = 20.', w: [['19', 'That counts houses. The question counts painted 8s, and 88 has two.']] }),
      num('c1c', 'How many digits does the painter paint in total?', 192, { h: ['1 to 9: 1 digit each. 10 to 99: 2 digits each. 100: 3 digits.'], s: '9 + 90 × 2 + 3 = 9 + 180 + 3 = 192.', w: [['200', 'The numbers do not all have 2 digits.']] }),
    ], 'The idea: houses and digits are different things. First decide what you are counting, then count each one once.'),
    chain('The fence', 'A fence is 30 meters long. It has a post at each end and a post every 2 meters.', [
      num('c2a', 'How many posts are there?', 16, { h: ['Count the gaps first.'], s: '30 ÷ 2 = 15 gaps. Posts: 15 + 1 = 16.', w: [['15', 'That is the number of gaps. Add the last post.']] }),
      num('c2b', 'Each gap gets 3 horizontal rails. How many rails in all?', 45, { h: ['Rails go in the gaps, not on the posts.'], s: '15 gaps × 3 rails = 45 rails.', w: [['48', 'Rails sit in gaps. There are 15 gaps, not 16.']] }),
      num('c2c', 'Now the same 2-meter spacing goes around a square yard whose 4 sides are each 10 meters. How many posts?', 20, { h: ['A loop has no ends. How many gaps of 2 meters fit in 40 meters?'], s: 'The distance around is 40 meters. 40 ÷ 2 = 20 gaps. In a loop, posts and gaps match, so 20 posts.', w: [['21', 'On a loop the last gap ends at the first post. No extra post is needed.']] }),
    ], 'The idea: on a line with two ends, posts = gaps + 1. On a closed loop, posts = gaps.'),
    mc('c3', 'Find the error. Dana wants the numbers from 1 to 50 that are multiples of 3 or have a digit 3, and she writes "16 + 14 = 30". Which of these best explains the likely problem?', ['She counted numbers that are multiples of 3 and also contain a 3 two times.', 'Multiples of 3 can never contain a 3.', 'She should have multiplied 16 × 14.', 'Nothing is wrong, since 16 + 14 is right.'], 0, {
      s: 'Numbers like 3, 30, 33, 36 and 39 are in both lists. Adding the lists counts each of them twice.',
      w: [[1, 'Look at 3, 30 and 33. They are multiples of 3 and have a digit 3.'], [2, 'Multiplying would not count anything. Overlaps need to be taken out.'], [3, 'Some numbers are in both lists, so the sum is too big.']],
    }),
  ],

  quiz: [
    tpl('range', (r) => {
      const a = r.int(5, 60), b = a + r.int(12, 70);
      return N('How many whole numbers are there from ' + a + ' to ' + b + ', counting both ends?', b - a + 1, { s: b + ' − ' + a + ' = ' + (b - a) + ', and one more for the first number: ' + (b - a + 1) + '.', w: wr(b - a + 1, [[b - a, 'That counts the steps. The first number counts too.']]) });
    }),
    tpl('skip', (r) => {
      const d = r.int(2, 9), a = r.int(1, 12), n = r.int(8, 40), last = a + d * (n - 1);
      return N('How many numbers are in this list? ' + a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', …, ' + last, n, { s: '(' + last + ' − ' + a + ') ÷ ' + d + ' = ' + (n - 1) + ' steps. One more for the first number: ' + n + '.', w: wr(n, [[n - 1, 'That is the number of steps. Add one for the first number.'], [n + 1, 'You added one too many. The steps plus one is the whole count.']]) });
    }),
    tpl('fence', (r) => {
      const d = r.pick([2, 3, 4, 5, 6]), g = r.int(6, 25), L = d * g;
      if (r.bool()) return N('A straight fence is ' + L + ' meters long. It has a post at each end and one every ' + d + ' meters. How many posts?', g + 1, { s: L + ' ÷ ' + d + ' = ' + g + ' gaps, so ' + (g + 1) + ' posts.', w: wr(g + 1, [[g, 'That is the number of gaps. A fence with two ends has one more post.']]) });
      return N('A fence has a post at each end. There are ' + (g + 1) + ' posts spaced ' + d + ' meters apart. How long is the fence, in meters?', L, { s: (g + 1) + ' posts make ' + g + ' gaps. ' + g + ' × ' + d + ' = ' + L + '.', w: wr(L, [[L + d, 'That uses one gap too many. Posts minus one is the number of gaps.']]) });
    }),
    tpl('multiples', (r) => {
      const k = r.int(3, 12), n = r.int(40, 150), c = Math.floor(n / k);
      return N('How many multiples of ' + k + ' are there from 1 to ' + n + '?', c, { s: k + ' × ' + c + ' = ' + (k * c) + ' is the biggest one that fits, and ' + k + ' × ' + (c + 1) + ' is too big. So ' + c + '.', w: wr(c, [[c + 1, 'The next multiple is more than ' + n + '.']]) });
    }),
    tpl('pages', (r) => {
      const n = r.int(12, 99);
      return N('A book has pages numbered 1 to ' + n + '. How many digits are printed in all the page numbers?', 9 + 2 * (n - 9), { s: 'Pages 1 to 9 use 9 digits. Pages 10 to ' + n + ' are ' + (n - 9) + ' pages with 2 digits each: ' + (2 * (n - 9)) + '. Total ' + (9 + 2 * (n - 9)) + '.', w: wr(9 + 2 * (n - 9), [[2 * n, 'Pages 1 to 9 have only 1 digit.']]) });
    }),
    tpl('hasdigit', (r) => {
      const N0 = r.int(30, 99), d = r.int(1, Math.floor(N0 / 10) < 9 ? Math.floor(N0 / 10) : 9);
      let c = 0, ones = 0, tens = 0;
      for (let i = 1; i <= N0; i++) { if (hasDigit(i, d)) c++; if (i % 10 === d) ones++; if (Math.floor(i / 10) === d) tens++; }
      return N('How many whole numbers from 1 to ' + N0 + ' have at least one digit ' + d + '?', c, { s: 'Ones digit ' + d + ': ' + ones + ' number' + (ones === 1 ? '' : 's') + '. Tens digit ' + d + ': ' + tens + ' number' + (tens === 1 ? '' : 's') + '. The number ' + d + d + (N0 >= d * 11 ? ' is in both lists, so take it out once. ' : ' is out of range. ') + 'Total ' + c + '.', w: wr(c, [[ones + tens, 'Check for a number that is in both lists.']]) });
    }),
    tpl('digitsum', (r) => {
      const two = r.bool(), nz = r.bool(), s = two ? r.int(4, 12) : r.int(4, 12);
      const lo = two ? 10 : 100, hi = two ? 99 : 999;
      let c = 0;
      for (let i = lo; i <= hi; i++) { const ds = String(i).split('').map(Number); if (ds.reduce((x, y) => x + y, 0) === s && (!nz || ds.every((x) => x > 0))) c++; }
      return N('How many ' + (two ? '2' : '3') + '-digit numbers have digits that add to ' + s + (nz ? ', with no digit equal to 0' : '') + '?', c, { s: 'List by the first digit, and for each one list the other digits that finish the sum. Total ' + c + '.', w: wr(c, [[c - 1, 'You missed one. Check each first digit carefully.'], [c + 1, 'One of your numbers does not fit the rules, or is listed twice.']]) });
    }),
    tpl('coins', (r) => {
      const set = r.pick([[5, 10, 25], [5, 10, 20], [2, 5, 10], [1, 5, 10]]);
      const amt = r.pick(set[0] === 1 ? [12, 15, 16, 18, 20, 22, 25, 30] : set[0] === 2 ? [12, 14, 15, 16, 18, 20, 24, 30] : [30, 35, 40, 45, 50, 55, 60]);
      let c = 0;
      for (let x = 0; x * set[2] <= amt; x++) for (let y = 0; x * set[2] + y * set[1] <= amt; y++) if ((amt - x * set[2] - y * set[1]) % set[0] === 0) c++;
      return N('How many ways can you make exactly ' + amt + ' cents with coins worth ' + set[0] + ', ' + set[1] + ' and ' + set[2] + ' cents? Use as many of each as you like.', c, { s: 'Go by the number of ' + set[2] + '-cent coins, then the ' + set[1] + '-cent coins. The ' + set[0] + '-cent coins fill the rest. Total ' + c + ' ways.', w: wr(c, [[c - 1, 'You missed a way. Go through the biggest coin first, then the middle one.'], [c + 1, 'One of your ways repeats or does not add up to ' + amt + '.']]) });
    }),
  ],
});
