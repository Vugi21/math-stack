import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, lcm } from '../../../../src/content/dsl.js';

const countMult = (k, lo, hi) => { let c = 0; for (let x = lo; x <= hi; x++) if (x % k === 0) c++; return c; };

export default lesson({
  id: 'pre-3-1-multiples-and-divisibility',
  title: 'Multiples and divisibility',
  blurb: 'What it means for one number to go into another, how to count multiples fast, and why sums of multiples stay multiples.',
  concepts: ['multiples', 'divisors', 'divisibility'],

  tryFirst: [
    num('t1', 'Two buses leave the station together at 8:00. Bus A comes back every 6 minutes and Bus B comes back every 8 minutes. How many minutes after 8:00 are they next at the station at the same moment?', 24, {
      h: ['List the times Bus A is at the station: 6, 12, 18, ...', 'Now list Bus B: 8, 16, ... and look for the first time on both lists.'],
      s: 'Bus A: 6, 12, 18, 24. Bus B: 8, 16, 24. The first shared time is 24 minutes.',
      w: [['48', '48 is a shared time too, but not the first one. Keep looking: 24 appears on both lists.'], ['14', 'Adding 6 + 8 does not work: they need to land on the same minute, and each bus keeps its own rhythm.']],
    }),
    num('t2', 'How many multiples of 7 are there from 1 to 100?', 14, {
      h: ['7, 14, 21, ... Where does the list pass 100?', '7 × 14 = 98. What is 7 × 15?'],
      s: 'The multiples are 7 × 1, 7 × 2, ..., 7 × 14 = 98. The next one, 105, is past 100. So 14.',
      w: [['15', '7 × 15 = 105, which is bigger than 100.'], ['98', 'That is the last multiple, 7 × 14, not how many there are. The count is the 14.']],
    }),
  ],

  learn: [
    p('A <b>multiple</b> of 6 is what you land on when you skip count by 6: 6, 12, 18, 24, … Every multiple is 6 times a whole number. We also say 6 <b>divides</b> 24, or that 24 is <b>divisible</b> by 6, meaning that 24 ÷ 6 comes out as a whole number with nothing left over. The number 6 is then called a <b>divisor</b> (or <b>factor</b>) of 24.'),
    widget('lcmGcd', { a: 6, b: 8 }),
    rule('<b>Multiple and divisor are the two ends of one fact.</b> 24 = 6 × 4 tells us: 24 is a multiple of 6 (and of 4), and 6 and 4 are divisors of 24.'),
    ex('Counting multiples without listing them', ['How many multiples of 9 are there up to 200?', 'The multiples are 9 × 1, 9 × 2, 9 × 3, …, so the question is how many times 9 fits in 200.', '200 ÷ 9 = 22 with remainder 2 (9 × 22 = 198).', 'So there are 22 multiples of 9 up to 200. The remainder is leftover, it does not make another multiple.']),
    ex('A trick: sums of multiples stay multiples', ['Suppose 35 and 56 are both multiples of 7.', 'Then 35 + 56 = 7 × 5 + 7 × 8 = 7 × (5 + 8) = 7 × 13, still a multiple of 7: 91.', 'The same holds for differences: 56 − 35 = 7 × 3 = 21.', 'This means that if you add a multiple of 7 to any number, you do not change its remainder when divided by 7.']),
    tbl(['Number', 'First six multiples'], [['3', '3, 6, 9, 12, 15, 18'], ['4', '4, 8, 12, 16, 20, 24'], ['12', '12, 24, 36, 48, 60, 72']], 'Multiples of 12 also show up in the lists for 3 and 4'),
    warn('<b>Watch out.</b> Mixing up the direction. 24 is a <i>multiple</i> of 6, and 6 is a <i>divisor</i> of 24; it is not true that 24 is a divisor of 6. Divisors are never bigger than the number (for positive numbers), while multiples are never smaller.'),
    mcq('Priya says "24 is a divisor of 8, because 8 goes into 24 three times." What is wrong?', ['Nothing, she is right.', 'It is the other way round: 8 divides 24, so 8 is a divisor of 24 and 24 is a multiple of 8. A divisor of 8 cannot be bigger than 8.', 'A divisor has to be odd.'], 1, 'Divisors of a number are at most that number. 24 is a multiple of 8; 8 is a divisor of 24.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is the 12th multiple of 9?', 108, {
      h: ['The 12th multiple of 9 is 9 × 12.'],
      s: '9 × 12 = 108.',
      w: [['21', 'That is 9 + 12. The 12th multiple is 12 times 9.']],
    }),
    num('p2', 'How many multiples of 8 are there from 1 to 200?', 25, {
      h: ['How many times does 8 fit in 200?'],
      s: '200 ÷ 8 = 25 exactly, so 8 × 25 = 200 is the last one. There are 25.',
      w: [['24', '8 × 25 = 200 is itself one of the multiples, since the range includes 200.'], ['192', 'That is the 24th multiple, not the count.']],
    }),
    mc('p3', 'Which of these numbers is a multiple of both 4 and 6?', ['8', '18', '24', '30'], 2, {
      h: ['Test each number against 4 and against 6.'],
      s: '24 = 4 × 6 = 6 × 4 works for both. 8 is not a multiple of 6, 18 is not a multiple of 4, and 30 is not a multiple of 4.',
      w: [[3, '30 = 6 × 5 but 30 ÷ 4 leaves a remainder of 2.'], [1, '18 is 6 × 3, but 4 does not go into 18.']],
    }),
    num('p4', 'What is the smallest multiple of 12 that is greater than 500?', 504, {
      h: ['500 ÷ 12 is about 41.', '12 × 41 = 492. What comes after?'],
      s: '12 × 41 = 492 is under 500, and 12 × 42 = 504 is over. So 504.',
      w: [['492', 'That is just below 500, and we need one above it.']],
    }),
    num('p5', 'A number N leaves remainder 3 when divided by 7. What remainder does N + 21 leave when divided by 7?', 3, {
      h: ['21 is a multiple of 7. What does adding a multiple of 7 do to the remainder?', 'Try an example: N = 10. Then N + 21 = 31.'],
      s: 'Adding 21 = 7 × 3 adds exactly three whole groups of 7 and leaves the remainder alone. Example: 10 → 31, both have remainder 3.',
      w: [['24', '24 is N + 21 if N = 3, but a remainder must be smaller than 7.'], ['0', 'Only if the remainder was 0 to start with. Adding a multiple of 7 does not change the remainder.']],
    }),
    num('p6', 'How many whole numbers from 1 to 100 are multiples of 3 <i>or</i> multiples of 5 (or both)?', 47, {
      h: ['There are 33 multiples of 3 and 20 multiples of 5. But some numbers are in both lists.', 'The ones in both lists are multiples of 15.'],
      s: '33 multiples of 3 plus 20 multiples of 5 is 53, but multiples of 15 (there are 6) were counted twice. 53 − 6 = 47.',
      w: [['53', 'Numbers like 15, 30 and 45 appear in both lists and were counted twice. Subtract the 6 of them.']],
    }),
    num('p7', 'Among the numbers from 1 to 48, how many are multiples of 6 but are <i>not</i> multiples of 4?', 4, {
      h: ['List the multiples of 6 up to 48: there are 8.', 'Cross out the ones divisible by 4.'],
      s: 'Multiples of 6: 6, 12, 18, 24, 30, 36, 42, 48. Of those, 12, 24, 36, 48 are multiples of 4. The remaining four are 6, 18, 30, 42.',
      w: [['8', 'You counted all multiples of 6. Remove the ones that are also multiples of 4.'], ['12', 'Check the range: 1 to 48 only.']],
    }),
  ],

  challenge: [
    chain('Blinking lights', 'Light A blinks every 4 seconds and light B blinks every 6 seconds. They both blink at second 0.', [
      num('c1a', 'After how many seconds do they next blink together?', 12, { h: ['Find the first number in both lists: 4, 8, 12, ... and 6, 12, ...'], s: '12 is the first multiple of both 4 and 6.', w: [['24', 'That is a shared time, but not the first.']] }),
      num('c1b', 'Counting seconds 1 through 60, how many times do they blink at the same moment?', 5, { h: ['They coincide at every multiple of 12.'], s: '12, 24, 36, 48, 60: that is 5.', w: [['4', 'Second 60 counts: it is 12 × 5.']] }),
      num('c1c', 'Counting seconds 1 through 60, at how many different seconds is <i>at least one</i> light blinking?', 20, { h: ['A blinks 15 times, B blinks 10 times.', 'The coincidences were counted twice.'], s: 'A: 60 ÷ 4 = 15 blinks. B: 60 ÷ 6 = 10 blinks. Shared seconds: 5. So 15 + 10 − 5 = 20 seconds.', w: [['25', 'That counts the 5 shared seconds twice.']] }),
    ], 'The idea: when two lists overlap, adding their sizes double counts the overlap. Subtract it once.'),
    chain('Skip counting past 100', 'Let us look at the multiples of 9 near 100.', [
      num('c2a', 'What is the smallest multiple of 9 greater than 100?', 108, { h: ['9 × 11 = 99.'], s: '9 × 11 = 99, so 9 × 12 = 108.', w: [['99', '99 is smaller than 100.']] }),
      num('c2b', 'What is the largest multiple of 9 less than 200?', 198, { h: ['200 ÷ 9 is about 22.'], s: '9 × 22 = 198.', w: [['207', '9 × 23 = 207 is more than 200.']] }),
      num('c2c', 'How many multiples of 9 are there from 100 to 200?', 11, { h: ['They are 9 × 12, 9 × 13, up to 9 × 22.', 'How many numbers from 12 to 22 inclusive?'], s: 'From 9 × 12 to 9 × 22: the multipliers 12 to 22 are 22 − 12 + 1 = 11 numbers.', w: [['10', 'Count both ends: 12 up to 22 inclusive is 11 numbers.']] }),
    ], 'The idea: counting inclusive from the 12th to the 22nd takes 22 − 12 + 1 steps, one more than the difference.'),
    mc('c3', 'Find the error. Omar says: "Since 7 and 14 are both multiples of 7, and 7 + 14 = 21, the number 21 is NOT a multiple of 7, because it is not in the list 7, 14." What is wrong?', ['The list keeps going: 7, 14, 21, 28, ... so 21 is the next multiple, and a sum of multiples is always a multiple.', 'Nothing is wrong.', 'Sums are never multiples.', '21 is a multiple of 14.'], 0, {
      s: '21 = 7 × 3. The list of multiples never stops, and the sum of two multiples of 7 is always a multiple of 7.',
      w: [[1, '21 = 7 × 3, so it is a multiple.'], [3, '21 ÷ 14 is not a whole number.']],
    }),
  ],

  quiz: [
    tpl('nth', (r) => { const k = r.int(6, 29), n = r.int(7, 30); return N('What is the ' + n + 'th multiple of ' + k + '?', k * n, { s: k + ' × ' + n + ' = ' + k * n + '.', w: [[k + n, 'The ' + n + 'th multiple is ' + n + ' times ' + k + ', not a sum.']] }); }),
    tpl('count', (r) => { const k = r.int(3, 19), hi = r.int(60, 400); const c = countMult(k, 1, hi); return N('How many multiples of ' + k + ' are there from 1 to ' + hi + '?', c, { s: hi + ' ÷ ' + k + ' = ' + Math.floor(hi / k) + ' (whole part), so ' + c + ' multiples.', w: [[c + 1, 'The leftover remainder does not make a new multiple.']] }); }),
    tpl('next', (r) => { const k = r.int(6, 29), n = r.int(100, 900); const v = (Math.floor(n / k) + 1) * k; return N('What is the smallest multiple of ' + k + ' that is bigger than ' + n + '?', v, { s: Math.floor(n / k) + ' × ' + k + ' = ' + Math.floor(n / k) * k + ' is not above ' + n + ', so take the next one: ' + v + '.', w: [[Math.floor(n / k) * k, 'That one is at or below ' + n + '; we need the first one above.']] }); }),
    tpl('both', (r) => { const a = r.int(2, 9), b = r.int(2, 9); const t = lcm(a, b); const range = []; let v = 1; const nums = new Set(); nums.add(t * r.int(1, 4)); let guard = 0; while (nums.size < 4 && guard++ < 200) { const x = r.int(10, 150); if (!(x % a === 0 && x % b === 0)) nums.add(x); } const arr = [...nums]; const right = arr[0]; return choice(r, 'Which of these numbers is a multiple of both ' + a + ' and ' + b + '?', String(right), arr.slice(1).map(String), { s: right + ' is a multiple of ' + a + ' and of ' + b + '. The others fail at least one test.' }); }),
    tpl('inout', (r) => { const a = r.pick([2, 3, 4, 5, 6, 7]), b = r.pick([3, 5, 7, 8, 9, 11]); if (a === b) return N('How many numbers from 1 to 60 are multiples of 4 or 5?', countMult(4, 1, 60) + countMult(5, 1, 60) - countMult(20, 1, 60), { s: 'Add, then subtract the multiples of 20 that were counted twice.' }); const hi = r.int(60, 200); let c = 0; for (let x = 1; x <= hi; x++) if (x % a === 0 || x % b === 0) c++; return N('How many numbers from 1 to ' + hi + ' are multiples of ' + a + ' or ' + b + ' (or both)?', c, { s: countMult(a, 1, hi) + ' + ' + countMult(b, 1, hi) + ' − ' + countMult(lcm(a, b), 1, hi) + ' (the overlap, multiples of ' + lcm(a, b) + ') = ' + c + '.', w: [[countMult(a, 1, hi) + countMult(b, 1, hi), 'The numbers that are multiples of both were counted twice. Subtract them.']] }); }),
    tpl('rem', (r) => { const d = r.int(4, 13), rr = r.int(1, d - 1), k = r.int(1, 9), m = r.int(1, d - 1); const N0 = d * r.int(3, 20) + rr; const v = (N0 + m) % d; return N(name(r) + ' has ' + N0 + ' stickers. Then a friend gives them ' + m + ' more. When all of them are split into groups of ' + d + ', how many stickers are left over?', v, { s: N0 + ' leaves remainder ' + rr + ' (since ' + N0 + ' = ' + d + ' × ' + Math.floor(N0 / d) + ' + ' + rr + '). Adding ' + m + ' gives remainder ' + (rr + m) + (rr + m >= d ? ', which wraps around to ' + v : '') + '.' }); }),
    tpl('lights', (r) => { const a = r.int(3, 9); let b = r.int(3, 9); while (b === a) b = r.int(3, 9); const t = lcm(a, b); return N('One drum beats every ' + a + ' seconds and another every ' + b + ' seconds. They both beat at second 0. After how many seconds do they next beat together?', t, { s: 'Find the first number on both lists of multiples: ' + t + '.', w: a * b === t ? [] : [[a * b, 'That is a shared time but not the first. Look for a smaller one on both lists.']] }); }),
  ],
});
