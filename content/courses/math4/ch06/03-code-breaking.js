import { lesson, text, num, mc, N, T, choice, tpl, p, rule, warn, ex, widget, mcq, chain, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const count = (all, cl) => all.filter((s) => cl.every((k) => k.f(s))).length;
function minimal(all, pool, r) {
  let cl = [];
  for (const c of r.shuffle(pool)) { cl.push(c); if (count(all, cl) === 1) break; }
  if (count(all, cl) !== 1) return null;
  for (let i = cl.length - 1; i >= 0; i--) { const t = cl.filter((_, k) => k !== i); if (count(all, t) === 1) cl = t; }
  return cl;
}
const DIGS = '123456789'.split('');
const allCodes = (L) => { let a = ['']; for (let i = 0; i < L; i++) a = a.flatMap((q) => DIGS.filter((d) => !q.includes(d)).map((d) => q + d)); return a; };
const CODES = { 3: allCodes(3), 4: allCodes(4) };
const fb = (g, c) => { let rp = 0, cm = 0; for (let i = 0; i < g.length; i++) { if (g[i] === c[i]) rp++; if (c.includes(g[i])) cm++; } return [rp, cm - rp]; };
const W = ['no', 'one', 'two', 'three', 'four'];
const fbText = (g, rp, wp) => {
  const bits = [];
  if (rp) bits.push(W[rp] + (rp === 1 ? ' digit is' : ' digits are') + ' right and in the right ' + (rp === 1 ? 'place' : 'places'));
  if (wp) bits.push(W[wp] + (wp === 1 ? ' digit is' : ' digits are') + ' right but in the wrong ' + (wp === 1 ? 'place' : 'places'));
  return 'Guess ' + g + ': ' + (bits.length ? bits.join(', and ') : 'no digit is in the code') + '.';
};
function codePuzzle(r, L) {
  const all = CODES[L];
  for (let tries = 0; tries < 30; tries++) {
    const code = r.pick(all);
    const pool = r.shuffle(all).slice(0, 160).filter((g) => g !== code).map((g) => { const [rp, wp] = fb(g, code); return { t: fbText(g, rp, wp), f: (x) => { const q = fb(g, x); return q[0] === rp && q[1] === wp; } }; });
    const cl = minimal(all, pool, r);
    if (cl && cl.length <= (L === 3 ? 5 : 6)) return { code, cl };
  }
  throw new Error('no code puzzle');
}
const digitSum = (v) => String(v).split('').reduce((a, d) => a + Number(d), 0);
const LET = 'ABCDEFGHJKLMNPRSTWXYZ'.split('');

export default lesson({
  id: 'm4-6-3-code-breaking',
  title: 'Code breaking',
  blurb: 'Find a secret code from clues about right digits and right places. Then solve number puzzles with missing digits.',
  concepts: ['codes', 'deduction', 'cryptarithms'],

  tryFirst: [
    num('t1', 'A secret code has 3 different digits, from 1 to 9. Guess 491: no digit is in the code. Guess 576: two digits are right and in the right place. Guess 186: two digits are right and in the right place. What is the code?', 586, {
      h: ['Guess 491 tells you three digits that are not in the code.', 'In 576 and in 186, two digits are right. Which digit appears in both guesses?'],
      s: 'Guess 491 rules out 4, 9 and 1. In guess 186, the 1 is out, so the 8 and the 6 are both right, in the second and third places. In guess 576, the 6 is right at the third place. The 7 cannot go in the second place, because the 8 is there. So the 5 is the other right digit, in the first place. The code is 586.',
      w: [['576', 'That is a guess, not the code. It has only two digits right.'], ['186', 'The 1 cannot be in the code. Guess 491 has no digit in the code.']],
    }),
    num('t2', 'I am thinking of a two-digit number. Its digits add up to 10. It is a multiple of 4. It is larger than 50. What is it?', 64, {
      h: ['List the two-digit numbers whose digits add to 10.', 'Cross out those that are not multiples of 4.'],
      s: 'Digits adding to 10: 19, 28, 37, 46, 55, 64, 73, 82, 91. Larger than 50 leaves 55, 64, 73, 82, 91. Only 64 is a multiple of 4 (64 = 4 × 16).',
      w: [['28', '28 is a multiple of 4 with digits adding to 10, but it is not larger than 50.'], ['82', '82 is not a multiple of 4. 80 is, and 84 is.']],
    }),
  ],

  learn: [
    p('A <b>code</b> is a short string of digits. You cannot see it. You make a <b>guess</b>, and you get a clue about how well the guess matches. In this lesson the digits in a code are all different.'),
    def('code', 'A hidden list of digits in a fixed order, such as 735. The order matters: 735 and 357 are different codes.'),
    def('clue', 'The answer you get for a guess. It says how many digits are right and in the right place, and how many are right but in the wrong place.'),
    rule('<b>Two kinds of clue.</b> <i>Right and in the right place:</i> the digit is in the code and in the same spot. <i>Right but in the wrong place:</i> the digit is in the code, but in a different spot.'),
    ex('Reading a clue', ['The code is 735. Guess 758.', '7 is in the same spot in both: right place.', '5 is in the code, but it is third in the code and second in the guess: wrong place.', '8 is not in the code at all.', 'The clue says: one digit right and in the right place, and one digit right but in the wrong place.']),
    p('Keep track of each spot with a grid. Each row is a spot in the code. Each column is a digit. Put ✗ when a digit cannot go there. Put ✓ when it must.'),
    widget('logicGrid', { rows: ['1st digit', '2nd digit', '3rd digit'], cols: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], partial: true }),
    tip('A clue that says "no digit is right" is the most useful one. Cross those digits out of every spot at the start. Then the other clues have fewer digits to choose from.'),
    rule('<b>Test every clue.</b> A possible code must agree with all the clues at once. To check a candidate code, imitate the guesser: compare it with each guess and count. If one count is off, cross out the candidate.'),
    ex('Solving a code', ['The code has 3 different digits from 1 to 9. Guess 123: no digit is right. Guess 456: one digit is right and in the right place. Guess 748: two digits are right and in the right place.', 'The digits 1, 2 and 3 are not in the code.', 'Suppose 4 is in the code. In guess 456 only one digit is right, so 4 would be that digit, and it would have to be in the first spot. But then in guess 748 the 4 is in the wrong place, and that guess shows no wrong-place digit. So 4 is not in the code.', 'In 748, two of the three digits are right and in place, and 4 is not one of them. So the code is 7 _ 8.', 'In 456, the 4 and the 6 are not in their places, since the code starts with 7 and ends with 8. So the right digit is 5, in the middle.', 'The code is 758. Check: 758 against 456 gives one right place (the 5). 758 against 748 gives two (7 and 8). 758 against 123 gives none.']),
    warn('<b>"Wrong place" is not "not in the code".</b> A digit that is right but in the wrong place is in the code. It just has to move to another spot.'),
    ex('Missing digits', ['Fill in the boxes: 2□ + □7 = 91.', 'Start with the ones place. □ + 7 must end in 1. So the first box is 4, and 4 + 7 = 11. Write 1, carry 1.', 'Now the tens place. 2 + □ + 1 (carried) must make 9. So 2 + 6 + 1 = 9, and the second box is 6.', 'Check: 24 + 67 = 91.']),
    rule('<b>Missing-digit sums.</b> Work from the right. Solve the ones place, remember what you carry, then do the tens place.'),
    key('Never guess blindly. Use each clue to cross out digits or spots, and test the survivors against every clue.'),
    mcq('Ben says: "Guess 246: one digit is right and in the right place. So the code starts with 2." What is wrong?', ['Nothing is wrong.', 'The clue does not say which digit it is. It could be 2 in the first spot, 4 in the second, or 6 in the third.', 'The first digit of a code is always 1.'], 1, 'One of the three digits is right and in its own spot, but you do not know which one. You need other clues to decide.', 'Spot the mistake'),
    recap([['code', 'a hidden list of digits in order'], ['right place', 'right digit, same spot'], ['wrong place', 'right digit, different spot'], ['candidate', 'a possible code you are testing']], [['Missing-digit sums', 'work from the right and carry']]),
  ],

  practice: [
    num('p1', 'A secret code has 3 different digits. Guess 851: no digit is in the code. Guess 692: no digit is in the code. Guess 148: one digit is right but in the wrong place. Guess 716: one digit is right and in the right place. What is the code?', 734, {
      h: ['Cross out all the digits in the first two guesses.', 'In guess 148, which digit is left? Where can it not be?'],
      s: 'The first two guesses remove 8, 5, 1, 6, 9, 2. Guess 148 then leaves only the 4, so 4 is in the code but not in the second spot. Guess 716: only 7 is left, so 7 is in the first spot. The digit 4 is not second, so it is third. The code is 734: the remaining digit 3 is second.',
      w: [['743', 'Check guess 148: the 4 is in the second spot there. The clue says the 4 is in a different spot.'], ['374', 'Guess 716 says the 7 is right and in the right place. That means the 7 is first.']],
    }),
    num('p2', 'A secret code has 4 different digits. Guess 3951: two digits are right but in the wrong places. Guess 6574: one digit is right and in the right place, and one digit is right but in the wrong place. Guess 9873: two digits are right but in the wrong places. Guess 5278: two digits are right but in the wrong places. Guess 5687: one digit is right and in the right place, and two digits are right but in the wrong places. What is the code?', 6385, {
      h: ['Guess 5687 has three right digits. Guess 6574 has two right digits. Which digits do they share?', 'Try 6 in the first spot. Then test the other guesses.'],
      s: 'Test the code 6385 against every guess. 3951: 3 and 5 are in the code, both in wrong places. 6574: 6 is right and in place, 5 is right but in the wrong place. 9873: 8 and 3 are right, in wrong places. 5278: 5 and 8 are right, in wrong places. 5687: 8 is right and in place, and 5 and 6 are in the wrong places. The code is 6385.',
      w: [['3586', 'Test this code on every guess, one after another. It breaks one of the clues.'], ['6358', 'Test this code on every guess, one after another. It breaks one of the clues.']],
    }),
    num('p3', 'A and B are digits, and AB means the two-digit number with digits A and B. If AB + BA = 121, what is A + B? Careful: there may be more than one pair of digits.', 11, {
      h: ['Try A = 5, B = 6. What do you get? Try A = 4, B = 7.', 'Write AB + BA using tens and ones: (10 × A + B) + (10 × B + A). How many A\'s and B\'s are there?'],
      s: 'AB + BA = 11 × A + 11 × B = 11 × (A + B). So 11 × (A + B) = 121, and A + B = 11. Many pairs work (2 and 9, 3 and 8, 4 and 7, and so on). The sum is always 11.',
      w: [['121', 'That is the total. The question asks for A + B.'], ['22', 'A and B are single digits, so A + B is at most 18. Divide 121 by 11.']],
    }),
    num('p4', 'I am thinking of a whole number from 1 to 100. It is a multiple of 7. Its digits add up to 10. It is larger than 50. What is it?', 91, {
      h: ['List multiples of 7 up to 100.', 'Which of them have digits that add to 10?'],
      s: 'Multiples of 7 with digit sum 10: 28 and 91. Larger than 50 leaves 91.',
      w: [['28', '28 is a multiple of 7 with digit sum 10, but it is not larger than 50.']],
    }),
    num('p5', 'How many two-digit numbers have digits that add up to 9?', 9, {
      h: ['List them by the tens digit: 1, 2, 3, ... What is the units digit each time?', 'Do not forget 90.'],
      s: 'The tens digit can be 1 to 9. The units digit is 9 minus the tens digit: 18, 27, 36, 45, 54, 63, 72, 81, 90. That is 9 numbers.',
      w: [['8', 'You missed one. Count 90, where the units digit is 0.'], ['10', 'The tens digit cannot be 0 in a two-digit number, so there are only 9.']],
    }),
    num('p6', 'Each letter stands for a digit. The same letter is the same digit, and different letters are different digits. AB + AB + AB = CBB. What is A + B + C?', 15, {
      h: ['Look at the ones place. B + B + B ends in B. Which digits do that?', 'The three numbers add to a three-digit number starting with C. Try B = 5.'],
      s: 'Three times B must end in B. That happens for B = 0 or B = 5. Try 5: AB is A5, and 3 × (A5) = CBB = C55. Then 3 × 85 = 255 gives A = 8, C = 2. The sum is 8 + 5 + 2 = 15. (B = 0 would need 3 × A0 = C00, and no digits A and C other than 0 do that.)',
      w: [['255', 'That is the sum of the numbers. Add the three digits A, B and C.']],
    }),
    mc('p7', 'The secret code has 3 different digits. Guess 472 gets this clue: one digit is right and in the right place, and one digit is right but in the wrong place. Which of these could be the code?', ['479', '247', '742', '174'], 3, {
      h: ['Check each option against the guess 472. Count right places and wrong places.'],
      s: 'The clue means exactly two of the digits 4, 7, 2 are in the code. 479 has 4 and 7, both in the right places. 247 and 742 have all of 4, 7, 2. Code 174 has 7 and 4. The guess 472 has 7 in the second place, and so does 174. The 4 is first in the guess but third in the code. That is one right place and one wrong place.',
      w: [[0, 'Both the 4 and the 7 are in the right places here, so that is two right places.'], [1, 'All three digits of 247 are in the guess. The clue allows only two right digits.'], [2, 'All three digits of 742 are in the guess. The clue allows only two right digits.']],
    }),
  ],

  challenge: [
    chain('The three-digit lock', 'A lock has a code of 3 different digits. Guess 784: no digit is in the code. Guess 376: one digit is right and in the right place, and one digit is right but in the wrong place. Guess 312: two digits are right and in the right place.', [
      num('c1a', 'Which digit of guess 376 is not in the code?', 7, { h: ['Look at guess 784. Which digits does it rule out?'], s: 'Guess 784 has no digit in the code, so 7 is out. The clue for 376 says two digits are right, so 3 and 6 are in the code.' }),
      num('c1b', 'What is the first digit of the code?', 3, { h: ['3 and 6 are in the code. Is 6 in guess 312?', 'Guess 312 has two right digits. One of them must be the 3.'], s: 'The digits 3 and 6 are in the code. Guess 312 does not contain 6, so its two right digits are 3 and one of 1, 2. Both are in place, so 3 is the first digit.' }),
      num('c1c', 'What is the code?', 362, { h: ['Guess 376 has one digit in place and one in the wrong place. The 3 is in place. So where does 6 go?'], s: 'In 376 the 3 is in the right place, so 6 must be in a wrong place. 6 is third in the guess, so it is not third in the code. It is second. The third digit is 2, from guess 312. The code is 362.' }),
    ], 'The idea: use a guess with no right digits first. Every digit it names is out, and the rest of the clues get easier.'),
    chain('Column by column', 'Fill in the missing digits: 5A + B9 = 143. A and B are single digits.', [
      num('c2a', 'Look at the ones place. A + 9 ends in 3. What is A?', 4, { h: ['Which number ending in 3 can be made by adding 9 to a single digit?'], s: 'A + 9 = 13 gives A = 4.' }),
      num('c2b', 'How much do you carry from the ones place to the tens place?', 1, { h: ['4 + 9 = 13. Write the 3. What is left over?'], s: '4 + 9 = 13. Write 3 and carry 1.' }),
      num('c2c', 'What is B?', 8, { h: ['Tens place: 5 + B + the carry equals 14.'], s: '5 + B + 1 = 14, so B = 8. Check: 54 + 89 = 143.' }),
    ], 'The idea: always start at the ones place. What you carry tells you what the next place must be.'),
    mc('c3', 'Find the error. Mia says: "Guess 135 has one digit right but in the wrong place. So the code must contain 1, 3 and 5." Which reply is correct?', ['Mia is right.', 'Only one of the digits 1, 3, 5 is in the code. Mia thinks all three are.', 'The code cannot contain 1, 3 or 5.', 'The guess is too short to give a clue.'], 1, {
      s: 'The clue says one digit is right. So exactly one of 1, 3, 5 is in the code, and it is not in the spot where it appears in the guess.',
      w: [[0, 'Read the clue again: it says ONE digit is right.'], [2, 'One digit is right, so one of them is in the code.']],
    }),
  ],

  quiz: [
    tpl('code3', (r) => {
      const { code, cl } = codePuzzle(r, 3);
      return N('A secret code has 3 different digits from 1 to 9. ' + cl.map((c) => c.t).join(' ') + ' What is the code?', code, { s: 'Cross out digits and places that break a clue. Only ' + code + ' fits all the guesses.' });
    }),
    tpl('code4', (r) => {
      const { code, cl } = codePuzzle(r, 4);
      return N('A secret code has 4 different digits from 1 to 9. ' + cl.map((c) => c.t).join(' ') + ' What is the code?', code, { s: 'Cross out digits and places that break a clue. Only ' + code + ' fits all the guesses.' });
    }),
    tpl('codemid', (r) => {
      const { code, cl } = codePuzzle(r, 3);
      const k = r.int(0, 2); const place = ['first', 'middle', 'last'][k];
      return N('A secret code has 3 different digits from 1 to 9. ' + cl.map((c) => c.t).join(' ') + ' What is the ' + place + ' digit of the code?', Number(code[k]), { s: 'The only code that fits all the guesses is ' + code + '. Its ' + place + ' digit is ' + code[k] + '.' });
    }),
    tpl('secret', (r) => {
      const X = r.int(12, 98); const all = []; for (let i = 10; i <= 99; i++) all.push(i);
      const pool = [];
      for (const m of [2, 3, 4, 5, 6, 7, 8, 9]) pool.push(X % m === 0 ? { t: 'It is a multiple of ' + m + '.', f: (v) => v % m === 0 } : { t: 'It is not a multiple of ' + m + '.', f: (v) => v % m !== 0 });
      pool.push({ t: 'Its digits add up to ' + digitSum(X) + '.', f: (v) => digitSum(v) === digitSum(X) });
      const prod = (v) => Math.floor(v / 10) * (v % 10);
      pool.push({ t: 'Its digits multiply to ' + prod(X) + '.', f: (v) => prod(v) === prod(X) });
      const t = Math.floor(X / 10), u = X % 10;
      if (t > u) pool.push({ t: 'Its tens digit is bigger than its units digit.', f: (v) => Math.floor(v / 10) > v % 10 });
      if (t < u) pool.push({ t: 'Its units digit is bigger than its tens digit.', f: (v) => Math.floor(v / 10) < v % 10 });
      for (const a of [r.int(10, X - 1), r.int(10, X - 1)].filter((a) => a < X)) pool.push({ t: 'It is larger than ' + a + '.', f: (v) => v > a });
      for (const b of [X + r.int(1, 15), X + r.int(1, 15)].filter((b) => b <= 100)) pool.push({ t: 'It is smaller than ' + b + '.', f: (v) => v < b });
      const cl = minimal(all, pool.filter((c) => c.f(X)), r);
      return N('I am thinking of a two-digit number. ' + cl.map((c) => c.t).join(' ') + ' What is it?', X, { s: 'List the numbers that fit the first clue, then cross out the ones that break the others. Only ' + X + ' is left.' });
    }),
    tpl('boxes', (r) => {
      for (let tries = 0; tries < 200; tries++) {
        const a = r.int(1, 9), b = r.int(0, 9), c = r.int(1, 9), d = r.int(0, 9); const S = 10 * a + b + 10 * c + d;
        const show = [a, b, c, d]; const hide = [r.int(0, 1), r.int(2, 3)];
        let sols = 0;
        for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) {
          const v = show.slice(); v[hide[0]] = x; v[hide[1]] = y;
          if ((hide.includes(0) && v[0] === 0) || (hide.includes(2) && v[2] === 0)) continue;
          if (10 * v[0] + v[1] + 10 * v[2] + v[3] === S) sols++;
        }
        if (sols !== 1) continue;
        const s = show.map((v, i) => (hide.includes(i) ? '□' : String(v)));
        const missing = show[hide[0]] + show[hide[1]];
        return N('Fill in the missing digits so that the sum is right: ' + s[0] + s[1] + ' + ' + s[2] + s[3] + ' = ' + S + '. What is the sum of the two missing digits?', missing, { s: 'Work from the ones place, then the tens place. The missing digits are ' + show[hide[0]] + ' and ' + show[hide[1]] + ': ' + a + '' + b + ' + ' + c + '' + d + ' = ' + S + '.' });
      }
      throw new Error('no boxes puzzle');
    }),
    tpl('letters', (r) => {
      const forms = [
        [(A, B, C) => A + B + ' + ' + B + C + ' + ' + C + A, (a, b, c) => 10 * a + b + 10 * b + c + 10 * c + a],
        [(A, B, C) => A + B + ' × ' + C, (a, b, c) => (10 * a + b) * c],
        [(A, B, C) => A + B + C + ' − ' + C + B + A, (a, b, c) => 100 * a + 10 * b + c - (100 * c + 10 * b + a)],
        [(A, B, C) => A + B + ' + ' + B + A + ' + ' + C, (a, b, c) => 11 * (a + b) + c],
        [(A, B, C) => A + B + ' × ' + A + ' + ' + C, (a, b, c) => (10 * a + b) * a + c],
      ];
      for (let tries = 0; tries < 300; tries++) {
        const f = r.pick(forms); const ls = r.shuffle(LET).slice(0, 3); const hid = r.shuffle(DIGS).slice(0, 3).map(Number);
        const val = f[1](...hid); if (val <= 0) continue;
        let sols = 0;
        for (let a = 1; a < 10; a++) for (let b = 1; b < 10; b++) for (let c = 1; c < 10; c++) if (a !== b && b !== c && a !== c && f[1](a, b, c) === val) sols++;
        if (sols !== 1) continue;
        const k = r.int(0, 2);
        return N('Each letter is a different digit from 1 to 9, and the same letter is always the same digit. ' + f[0](...ls) + ' = ' + val + '. What digit is ' + ls[k] + '?', hid[k], { s: 'Only one choice of digits works: ' + ls.map((l, i) => l + ' = ' + hid[i]).join(', ') + '. Check: ' + f[0](...hid.map(String)) + ' = ' + val + '.' });
      }
      throw new Error('no letters puzzle');
    }),
    tpl('howmany', (r) => {
      const S = r.int(7, 13), kind = r.pick(['odd', 'even', 'multiple of 3', 'multiple of 4']);
      const test = { odd: (v) => v % 2 === 1, even: (v) => v % 2 === 0, 'multiple of 3': (v) => v % 3 === 0, 'multiple of 4': (v) => v % 4 === 0 }[kind];
      let c = 0; for (let v = 10; v <= 99; v++) if (digitSum(v) === S && test(v)) c++;
      return N('How many two-digit numbers have digits that add up to ' + S + ' and are ' + (kind.startsWith('multiple') ? 'a ' : '') + kind + '?', c, { s: 'List the numbers with digit sum ' + S + ', then keep the ones that are ' + (kind.startsWith('multiple') ? 'a ' : '') + kind + '. There are ' + c + '.' });
    }),
  ],
});
