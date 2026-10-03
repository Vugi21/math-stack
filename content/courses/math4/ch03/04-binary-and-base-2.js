import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => String(x) !== String(a));
const bin = (n) => n.toString(2);
const pop = (n) => bin(n).split('').filter((c) => c === '1').length;

export default lesson({
  id: 'm4-3-4-binary-and-base-2',
  title: 'Binary and base 2',
  blurb: 'Write numbers with only 0 and 1, using place values 1, 2, 4, 8 and so on.',
  concepts: ['binary', 'place-value', 'powers-of-two', 'doubling'],

  tryFirst: [
    num('t1', 'You have weights of 1, 2, 4 and 8 grams. You want to balance exactly 11 grams, using each weight at most once. How many weights do you use?', 3, {
      h: ['Start with the biggest weight that is not too heavy.', '8 grams leaves 3 grams to go.'],
      s: '8 + 2 + 1 = 11. That uses three weights.',
      w: [['4', 'Check: 8 + 2 + 1 = 11 uses only three weights. Is there a reason to use the 4?'], ['2', 'Two weights from 1, 2, 4, 8 cannot add to 11.']],
    }),
    num('t2', 'You have weights of 1, 2 and 4 grams. Using each at most once, how many different positive totals can you make?', 7, {
      h: ['List them: 1, 2, 3 (1+2), 4, ...'],
      s: 'The totals are 1, 2, 3, 4, 5, 6 and 7. Every whole number from 1 to 7 can be made. That is 7 totals.',
      w: [['3', 'You can also combine weights. 1 + 2 = 3, 1 + 4 = 5, and so on.'], ['8', 'Zero grams is not a positive total, and 8 is more than all three weights together.']],
    }),
  ],

  learn: [
    p('Our usual number system is <b>base 10</b>. It uses ten digits, and each place is worth 10 times the place to its right: 1, 10, 100, 1000.'),
    p('<b>Base 2</b> uses only two digits, 0 and 1. Each place is worth 2 times the place to its right. The place values are 1, 2, 4, 8, 16, 32, ... These are the powers of 2.'),
    widget('baseTwo', { bits: 6, value: 13 }),
    p('Use the switches. A 1 means "use this place value". A 0 means "skip it". The number is the sum of the place values that are on.'),
    ex('Base 2 to base 10: 1011_[2]', ['The places from the right are 1, 2, 4, 8.', 'The digits 1, 0, 1, 1 read from the left mean 8 on, 4 off, 2 on, 1 on.', '8 + 2 + 1 = 11.', 'So 1011_[2] = 11.']),
    ex('Base 10 to base 2: 45', ['The largest place value that fits in 45 is 32. Use it. 45 − 32 = 13.', 'Next 16 is too big (0). Then 8 fits: 13 − 8 = 5.', 'Then 4 fits: 5 − 4 = 1. Then 2 is too big (0). Then 1 fits.', 'Digits for 32, 16, 8, 4, 2, 1: 1, 0, 1, 1, 0, 1. So 45 = 101101_[2].']),
    tbl(['Base 10', '0', '1', '2', '3', '4', '5', '6', '7', '8'], [['Base 2', '0', '1', '10', '11', '100', '101', '110', '111', '1000']], 'Counting in base 2'),
    rule('<b>Add 1.</b> In base 2, 1 + 1 = 10. You carry whenever a place reaches 2. So 111_[2] + 1 = 1000_[2]. Doubling a number just adds a 0 at the end: 101_[2] (5) doubled is 1010_[2] (10).'),
    warn('<b>10 in base 2 is two, not ten.</b> Always check which base a numeral is written in. The numeral 10 means "one group of the second place value". In base 2 that is 2.'),
    mcq('Hiro says: "In base 2, 111 + 1 = 112." What is the mistake?', ['Nothing. 112 is correct.', 'The digit 2 does not exist in base 2. Each time a place reaches 2 you carry. 111_[2] + 1 = 1000_[2], which is 8.', '111 + 1 = 110.'], 1, 'The last place has 1 + 1 = 2, which is written 10: write 0 and carry 1. The carry ripples through every place. The result is 1000_[2] = 8.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'What is 1101_[2] in base 10?', 13, {
      h: ['Place values from the right: 1, 2, 4, 8.'],
      s: '1101_[2] = 8 + 4 + 0 + 1 = 13.',
      w: [['1101', 'That is the same digits read in base 10. Use the place values 1, 2, 4, 8.'], ['3', 'That adds the digits 1 + 1 + 0 + 1. The place values are 8, 4, 2, 1.']],
    }),
    num('p2', 'Write 19 in base 2.', 10011, {
      h: ['The largest place value that fits is 16.', '19 − 16 = 3.'],
      s: '19 = 16 + 2 + 1. Digits for 16, 8, 4, 2, 1: 1, 0, 0, 1, 1. So 10011.',
      w: [['11001', 'The digits are reversed. The largest place value goes first.'], ['1011', 'Check the places. 8 + 2 + 1 = 11, not 19.']],
    }),
    num('p3', 'Add in base 2: 1011_[2] + 110_[2]. Write your answer in base 2.', 10001, {
      h: ['1011_[2] is 11 and 110_[2] is 6.', 'Or add column by column, carrying when a place reaches 2.'],
      s: '11 + 6 = 17. 17 = 16 + 1, which is 10001_[2]. Column by column: 1 + 0 = 1; 1 + 1 = 10, write 0 carry 1; 0 + 1 + 1 = 10, write 0 carry 1; 1 + 0 + 1 = 10, write 0 carry 1; then the carry 1 goes in front.',
      w: [['1121', 'The digit 2 does not exist in base 2. When a place reaches 2, carry.'], ['17', '17 is the answer in base 10. Write it in base 2.']],
    }),
    num('p4', 'How many digits does 100 need when written in base 2?', 7, {
      h: ['The place values go 1, 2, 4, 8, 16, 32, 64, 128.', 'Which is the biggest one that fits in 100?'],
      s: '64 fits in 100 but 128 does not. The digits cover 64 down to 1, which is 7 places. 100 = 1100100_[2].',
      w: [['6', 'The 64 place is the 7th place: 1, 2, 4, 8, 16, 32, 64.'], ['8', '128 is bigger than 100, so you do not need that place.']],
    }),
    num('p5', 'Double 10110_[2] and write the answer in base 2.', 101100, {
      h: ['What does doubling do to place values? Think of what happens in base 10 when you multiply by 10.'],
      s: 'Every digit moves one place left, so a 0 is added at the end: 101100_[2]. (22 doubled is 44.)',
      w: [['10111', 'Adding a 1 at the end would add 1, not double.'], ['44', '44 is the answer in base 10. Write it in base 2.']],
    }),
    num('p6', 'What is the largest number you can write with six digits in base 2? Give it in base 10.', 63, {
      h: ['The largest six-digit numeral is 111111_[2].', 'Add 1 to it: what do you get?'],
      s: '111111_[2] + 1 = 1000000_[2] = 64. So the largest is 64 − 1 = 63.',
      w: [['64', '64 needs seven digits: 1000000_[2].'], ['32', '32 is the biggest place value, but you can also use the smaller places.']],
    }),
    mc('p7', 'A number is written in base 2 and its last digit is 0. Which is always true about the number?', ['It is even.', 'It is odd.', 'It is a multiple of 4.', 'It is a multiple of 3.'], 0, {
      h: ['The last place is worth 1. All the other places are worth 2, 4, 8, ...'],
      s: 'Every place except the last is worth an even number. If the last digit is 0, the number is a sum of even numbers, so it is even.',
      w: [[2, 'Try 110_[2] = 6. It ends in 0 but is not a multiple of 4.'], [1, 'The 1s place contributes 0, and all other places are even.'], [3, 'Try 100_[2] = 4. It ends in 0 but is not a multiple of 3.']],
    }),
    num('p8', 'You have weights 1, 2, 4, 8 and 16 grams. What is the fewest weights that balance 27 grams exactly?', 4, {
      h: ['Write 27 in base 2.'],
      s: '27 = 16 + 8 + 2 + 1, which is 11011_[2]. Four weights.',
      w: [['5', 'You do not need the 4: 16 + 8 + 2 + 1 = 27 uses four.'], ['3', 'Three weights from 1, 2, 4, 8, 16 cannot make 27.']],
    }),
  ],

  challenge: [
    chain('Counting up', 'Look at what happens when you add 1 in base 2.', [
      num('c1a', 'Add 1 to 111_[2]. Write the answer in base 2.', 1000, { h: ['Each 1 + 1 makes 10: write 0, carry 1.'], s: 'The carry ripples all the way: 1000.' }),
      num('c1b', 'What is 100000_[2] in base 10?', 32, { h: ['Which place is the 1 in?'], s: 'The places are 1, 2, 4, 8, 16, 32. The 1 is in the sixth place, which is worth 32.' }),
      num('c1c', 'What is the largest number you can write with eight digits in base 2? Give it in base 10.', 255, { h: ['Add 1 to the largest eight-digit numeral: you get 100000000_[2].', '100000000_[2] = 2^[8].'], s: '2^[8] = 256, so the largest is 256 − 1 = 255.' }),
    ], 'The idea: a numeral of n ones plus 1 becomes a 1 followed by n zeros, which is 2^[n]. So n ones is 2^[n] − 1.'),
    chain('Fingers', 'You can count on your fingers in base 2. A finger that is up is a 1. A finger that is down is a 0. Each finger has a place value, starting with 1 for the thumb.', [
      num('c2a', 'How many different finger patterns can one hand make? (All fingers down counts as one pattern.)', 32, { h: ['Each finger has 2 choices, up or down.', 'Multiply 2 five times.'], s: '2 × 2 × 2 × 2 × 2 = 32 patterns.' }),
      num('c2b', 'What is the largest number one hand can show?', 31, { h: ['All five fingers up. The place values are 1, 2, 4, 8, 16.'], s: '1 + 2 + 4 + 8 + 16 = 31.' }),
      num('c2c', 'What is the largest number two hands (ten fingers) can show?', 1023, { h: ['Ten places. The largest is one less than 2^[10].'], s: '2^[10] = 1024, so the largest number is 1023.' }),
    ], 'The idea: n switches can make 2^[n] patterns, and they count from 0 up to 2^[n] − 1.'),
    mc('c3', 'Find the error. Nico says: "1100_[2] means 1 + 1 + 0 + 0, which is 2." What is wrong?', ['He added the digits. Each digit must be multiplied by its place value: 8 + 4 = 12.', 'He should have got 1100.', 'Nothing, 2 is correct.', 'He should have got 4.'], 0, {
      s: 'The places are 8, 4, 2, 1. The digits 1, 1, 0, 0 mean 8 + 4 = 12.',
      w: [[2, 'Sum the place values, not the digits. 8 + 4 = 12.'], [3, 'That counts only one of the two 1s. Both the 8 and the 4 are on.']],
    }),
  ],

  quiz: [
    tpl('toTen', (r) => {
      const k = r.int(4, 8), n = r.int(2 ** (k - 1), 2 ** k - 1);
      return N('What is ' + bin(n) + '_[2] in base 10?', n, { s: 'Add the place values of the 1s. The total is ' + n + '.', w: wr(n, [[pop(n), 'That counts the 1s. Add their place values instead.']]) });
    }),
    tpl('toTwo', (r) => {
      const n = r.int(5, 200);
      const rev = Number(bin(n).split('').reverse().join(''));
      return N('Write ' + n + ' in base 2.', bin(n), { s: 'Subtract the largest place value that fits, again and again. ' + n + ' = ' + bin(n) + '_[2].', w: wr(bin(n), [[rev, 'The digits are in the wrong order. The biggest place value goes on the left.'], [n, 'That is the number in base 10.']]) });
    }),
    tpl('add', (r) => {
      const a = r.int(3, 40), b = r.int(3, 40);
      return N('Add in base 2: ' + bin(a) + '_[2] + ' + bin(b) + '_[2]. Write your answer in base 2.', bin(a + b), { s: bin(a) + '_[2] is ' + a + ' and ' + bin(b) + '_[2] is ' + b + '. The sum ' + (a + b) + ' is ' + bin(a + b) + '_[2].', w: wr(bin(a + b), [[a + b, 'That is the sum in base 10. Write it in base 2.'], [Number(bin(a)) + Number(bin(b)), 'The digit 2 does not exist in base 2. Carry whenever a place reaches 2.']]) });
    }),
    tpl('double', (r) => {
      const n = r.int(3, 80);
      return N('Double the base 2 number ' + bin(n) + '_[2]. Write your answer in base 2.', bin(2 * n), { s: 'Doubling moves each digit one place to the left, so add a 0 at the end: ' + bin(2 * n) + '.', w: wr(bin(2 * n), [[2 * n, 'That is the doubled number in base 10. Write it in base 2.']]) });
    }),
    tpl('digits', (r) => {
      const n = r.int(10, 3000);
      const len = bin(n).length;
      return N('How many digits does ' + n + ' need in base 2?', len, { s: 'The biggest place value that fits in ' + n + ' is 2^[' + (len - 1) + '] = ' + 2 ** (len - 1) + '. That makes ' + len + ' digits.', w: wr(len, [[len - 1, 'Count the places 1, 2, 4, ... up to the largest that fits, including the 1.'], [len + 1, 'The next place value, ' + 2 ** len + ', is already too big.']]) });
    }),
    tpl('weights', (r) => {
      const n = r.int(5, 255);
      return N('You have one weight each of 1, 2, 4, 8, 16, 32, 64 and 128 grams. What is the fewest weights that balance exactly ' + n + ' grams?', pop(n), { s: n + ' in base 2 is ' + bin(n) + '. The number of 1s is ' + pop(n) + '.', w: wr(pop(n), [[bin(n).length, 'You do not use every place. Count only the 1s.']]) });
    }),
    tpl('maxK', (r) => {
      const k = r.int(3, 16), cnt = r.bool();
      if (cnt) return N('How many different patterns can ' + k + ' switches make, if each switch is on or off? (All off counts as one pattern.)', 2 ** k, { s: 'Each switch has 2 choices, so ' + k + ' switches give 2^[' + k + '] = ' + 2 ** k + ' patterns.', w: wr(2 ** k, [[2 * k, 'Each new switch doubles the number of patterns. It does not just add 2.'], [2 ** k - 1, 'That is the largest number the switches can show. The all-off pattern counts as a pattern too.']]) });
      return N('What is the largest number you can write with ' + k + ' digits in base 2? Give it in base 10.', 2 ** k - 1, { s: 'Adding 1 to ' + k + ' ones makes 2^[' + k + '] = ' + 2 ** k + '. So the largest is ' + (2 ** k - 1) + '.', w: wr(2 ** k - 1, [[2 ** k, 'That needs one more digit. The largest with ' + k + ' digits is one less.'], [2 * k, 'Powers of 2 grow much faster than that.']]) });
    }),
    tpl('nextBin', (r) => {
      const n = r.int(3, 120);
      return N('Add 1 to the base 2 number ' + bin(n) + '_[2]. Write your answer in base 2.', bin(n + 1), { s: 'Carry whenever a place reaches 2. The answer is ' + bin(n + 1) + '.', w: wr(bin(n + 1), [[Number(bin(n)) + 1, 'If the last digit is already 1, then 1 + 1 = 10 and you must carry.']]) });
    }),
  ],
});
