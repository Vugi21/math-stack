import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, mcq, chain } from '../../../../src/content/dsl.js';

const wr = (a, l) => l.filter(([x]) => Number(x) !== Number(a));
const zs1 = (n) => n + ' zero' + (n === 1 ? '' : 's');
const tz = (n) => { let c = 0; while (n > 0 && n % 10 === 0) { n /= 10; c++; } return c; };
const fives = (n) => { let c = 0; for (let k = 5; k <= n; k *= 5) c += Math.floor(n / k); return c; };
const smallestK = (a, z) => { for (let k = 1; ; k++) if ((a * k) % 10 ** z === 0) return k; };

export default lesson({
  id: 'm4-2-4-ones-zeros-and-tens',
  title: 'Ones, zeros and tens',
  blurb: 'Multiplying by 0, 1, 10 and 100, and counting the zeros at the end of a product.',
  concepts: ['multiplication', 'zero', 'place-value', 'trailing-zeros'],

  tryFirst: [
    num('t1', 'What is 400 × 30? Think about how many 100s and how many 10s you are multiplying.', 12000, {
      h: ['Multiply the non-zero parts first: 4 × 3.', 'Then count the zeros in both numbers.'],
      s: '4 × 3 = 12. The numbers have 2 zeros and 1 zero, 3 zeros in all. So 12 with three zeros: 12,000.',
      w: [['1200', 'Count all the zeros. 400 has two, 30 has one. That is three zeros after the 12.'], ['120000', 'Count again: 400 has 2 zeros and 30 has 1. That is 3 zeros, not 4.']],
    }),
    num('t2', 'What is 25 × 8 × 5? Do 25 × 8 first.', 1000, {
      h: ['25 × 8 = 200.', 'Then multiply by 5.'],
      s: '25 × 8 = 200. 200 × 5 = 1000.',
      w: [['200', 'You stopped after two numbers. Multiply by 5 too.'], ['10000', 'Check: 200 × 5 = 1000.']],
    }),
  ],

  learn: [
    p('Three numbers behave in a special way when you multiply. They are 0, 1 and 10.'),
    rule('<b>Zero and one.</b> Any number times 0 is 0. Any number times 1 is itself. No other numbers do this.'),
    rule('<b>Times 10.</b> Multiplying by 10 moves every digit one place to the left and puts a 0 in the ones place. 10 × 10 = 100, so ×100 moves digits two places. 36 × 100 = 3600.'),
    p('This is not "adding a zero". It is a shift in place value. Each digit becomes worth ten times as much.'),
    ex('Zeros in the factors: 600 × 50', ['Ignore the zeros: 6 × 5 = 30.', 'Count the zeros you ignored: two in 600 and one in 50, three in all.', 'Put them back: 30 followed by three zeros is 30,000.']),
    warn('<b>Watch for a zero that is already there.</b> 6 × 5 already ends in a zero: 30. So 600 × 50 has four zeros at the end, not three. The product is 30,000 with four zeros.'),
    p('Some products end in zeros even if the factors do not. Look at 25 × 4 = 100. Neither 25 nor 4 ends in 0.'),
    rule('<b>Where zeros come from.</b> Every 10 in a product gives one zero. And 10 = 2 × 5. So each pair of one 2 and one 5 hiding in the factors makes one zero at the end.'),
    ex('Count zeros: 15 × 16 × 25', ['15 = 3 × 5. 16 = 2 × 2 × 2 × 2. 25 = 5 × 5.', 'The product has three 5s and four 2s.', 'Pair them: three pairs of (2, 5). That gives three zeros.', 'Check: 15 × 16 = 240. 240 × 25 = 6000. Three zeros.']),
    mcq('Sam says: "15 × 16 × 25. Only 15 × 16 = 240 gives a zero, and 25 has no zeros, so the product has one zero at the end." What went wrong?', ['Nothing. One zero is right.', 'The 25 pairs with the 4s hidden in 240 to make more tens. 240 × 25 = 6000, which has three zeros.', 'He should have counted the zeros in 15.'], 1, '25 = 5 × 5 and 240 has plenty of 2s. Each 5 can pair with a 2. The real answer is 6000 with three zeros.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'Find 600 × 50.', 30000, {
      h: ['6 × 5 = 30. Then count the zeros.'],
      s: '6 × 5 = 30. Three zeros come back: 30,000.',
      w: [['3000', '6 × 5 = 30 already has a zero. Three more zeros follow it: 30,000.'], ['300000', 'There are three zeros in all, not four.']],
    }),
    num('p2', 'How many zeros are at the end of 25 × 8 × 5 × 4?', 3, {
      h: ['Multiply it out in steps: 25 × 8 = 200.', '200 × 5 = 1000, then × 4.'],
      s: '25 × 8 × 5 = 1000. Times 4 is 4000. It ends in three zeros.',
      w: [['4', 'Count the zeros in 4000: there are three. The 4 is a digit, not a zero.'], ['2', 'The product is 4000. Count its zeros again.']],
    }),
    num('p3', 'How many zeros are at the end of 15 × 14 × 20?', 2, {
      h: ['15 × 14 = 210. Then multiply by 20.'],
      s: '210 × 20 = 4200. It ends in two zeros.',
      w: [['1', 'The 20 gives one zero, and 210 gives another.'], ['3', 'Write the product out: 4200 has two zeros.']],
    }),
    num('p4', 'How many zeros are at the end of 5 × 10 × 15 × 20 × 25?', 3, {
      h: ['Multiply step by step: 5 × 10 = 50, × 15 = 750.', 'Keep going.'],
      s: '5 × 10 × 15 × 20 × 25 = 375,000. It ends in three zeros.',
      w: [['2', 'You only counted the zeros in 10 and 20. The 5s and 2s inside the other factors make more.'], ['5', 'Not every factor adds a zero. Multiply it out: 375,000.']],
    }),
    num('p5', 'By what smallest whole number must 36 be multiplied so that the product ends in three zeros?', 250, {
      h: ['36 = 2 × 2 × 3 × 3. How many 2s does it have?', 'Three zeros need three 2s and three 5s.'],
      s: '36 has two 2s and no 5s. We need three 5s and one more 2. That is 5 × 5 × 5 × 2 = 250. Check: 36 × 250 = 9000.',
      w: [['125', '36 × 125 = 4500. It has only two zeros because there are not enough 2s.'], ['1000', 'That works but is not the smallest.']],
    }),
    num('p6', 'N × 100 = 70 × 50. What is N?', 35, {
      h: ['What is 70 × 50?', 'Then undo the ×100.'],
      s: '70 × 50 = 3500. N × 100 = 3500, so N = 35.',
      w: [['350', '70 × 50 = 3500. Dividing by 100 gives 35.']],
    }),
    num('p7', 'How many zeros are at the end of 1 × 2 × 3 × 4 × 5 × 6 × 7 × 8 × 9 × 10?', 2, {
      h: ['Which factors hide a 5? Which hide a 2?', 'Both 5 and 10 hide a 5.'],
      s: 'The product is 3,628,800. The 5s are in 5 and 10, so there are two 5s. There are many 2s. So two zeros.',
      w: [['1', 'The factor 5 gives a zero with a 2, and the factor 10 gives one more.'], ['3', 'Only two 5s are in the list, so only two zeros are possible.']],
    }),
  ],

  challenge: [
    chain('Long products', 'Multiply all the whole numbers from 1 up to a given number. Count the zeros at the end. You cannot multiply it all out, so count the 5s.', [
      num('c1a', 'How many zeros are at the end of 1 × 2 × 3 × ... × 14?', 2, { h: ['Which numbers up to 14 contain a 5?', 'There are always enough 2s.'], s: 'The numbers 5 and 10 each contain one 5. That is two 5s, so two zeros.' }),
      num('c1b', 'How many zeros are at the end of 1 × 2 × 3 × ... × 20?', 4, { h: ['5, 10, 15 and 20 each hide a 5.'], s: 'Four numbers (5, 10, 15, 20) each contain one 5. So four zeros.' }),
      num('c1c', 'How many zeros are at the end of 1 × 2 × 3 × ... × 25?', 6, { h: ['25 = 5 × 5. It counts twice.'], s: '5, 10, 15 and 20 give four 5s. 25 = 5 × 5 gives two more. Six 5s, so six zeros.' }),
    ], 'The idea: there are always more 2s than 5s, so the 5s decide how many zeros appear. The number 25 hides two 5s.'),
    chain('Making zeros', 'Multiply 18 by some whole number to make a product with zeros at the end. 18 = 2 × 3 × 3, so it has one 2 and no 5s.', [
      num('c2a', 'What is the smallest number to multiply 18 by so the product ends in at least one zero?', 5, { h: ['One 2 is already there. What is missing?'], s: 'We need a 5 to pair with the 2. 18 × 5 = 90.' }),
      num('c2b', 'What is the smallest number to multiply 18 by so the product ends in at least two zeros?', 50, { h: ['Two zeros need two 2s and two 5s. You have one 2.'], s: 'We need two 5s and one more 2: 5 × 5 × 2 = 50. 18 × 50 = 900.' }),
      num('c2c', 'What is the smallest number to multiply 18 by so the product ends in at least four zeros?', 5000, { h: ['You need four 2s and four 5s. How many 2s are missing?'], s: 'We have one 2, so three more 2s are needed, and four 5s. 2 × 2 × 2 × 5 × 5 × 5 × 5 = 5000. 18 × 5000 = 90,000.' }),
    ], 'The idea: to get n zeros you need n twos and n fives. Check what the number already has, and add what is missing.'),
    mc('c3', 'Find the error. Tara says: "To multiply 35 by 100, add two zeros. So 35 × 100 = 35,00." Which statement is best?', ['She is right.', 'She should have written 3500. The digits 3 and 5 move two places left and two zeros fill the empty places.', 'She should add three zeros.', 'Multiplying by 100 adds 100 to the number.'], 1, {
      s: '35 × 100 = 3500. The 3 and 5 move two places to the left. The empty places are filled with zeros.',
      w: [[3, 'Multiplying by 100 does not add. It makes every digit worth 100 times more.'], [2, 'Three zeros would multiply by 1000.']],
    }),
  ],

  quiz: [
    tpl('shift', (r) => {
      const a = r.int(2, 9), b = r.int(2, 9), za = r.int(1, 3), zb = r.int(1, 3);
      const A = a * 10 ** za, B = b * 10 ** zb;
      return N('Find ' + A + ' × ' + B + '.', A * B, { s: a + ' × ' + b + ' = ' + a * b + ', then ' + zs1(za + zb) + ' come back: ' + A * B + '.', w: wr(A * B, [[a * b * 10 ** Math.max(za, zb), 'Count the zeros in both numbers and add them.'], [A * B * 10, 'Count again: ' + zs1(za) + ' plus ' + zs1(zb) + '.']]) });
    }),
    tpl('zeros', (r) => {
      const f = [r.int(2, 30), r.int(2, 30), r.int(2, 30)];
      const v = f[0] * f[1] * f[2];
      return N('How many zeros are at the end of ' + f.join(' × ') + '?', tz(v), { s: 'The product is ' + v + '. It ends in ' + tz(v) + ' zero' + (tz(v) === 1 ? '' : 's') + '.', w: wr(tz(v), [[f.filter((x) => x % 10 === 0).length, 'Zeros also come from hidden pairs of 2 and 5. Multiply it out.']]) });
    }),
    tpl('smallestK', (r) => {
      const a = r.pick([12, 18, 24, 36, 14, 6, 16, 20, 28, 15, 35, 22, 8, 9, 30]), z = r.int(1, 3);
      const k = smallestK(a, z);
      return N('What is the smallest whole number you can multiply ' + a + ' by to get a product that ends in at least ' + z + ' zero' + (z === 1 ? '' : 's') + '?', k, { s: a + ' × ' + k + ' = ' + a * k + ', which ends in ' + z + ' or more zeros. No smaller number works.', w: wr(k, [[10 ** z, 'That works, but it is not the smallest. Count the 2s and 5s that ' + a + ' already has.']]) });
    }),
    tpl('factorialZeros', (r) => {
      const n = r.int(10, 60);
      return N('How many zeros are at the end of 1 × 2 × 3 × ... × ' + n + '?', fives(n), { s: 'Count the 5s hidden in the factors' + (n >= 25 ? ', with 25' + (n >= 50 ? ' and 50' : '') + ' counting twice' : '') + '. There are ' + fives(n) + ' fives, so ' + fives(n) + ' zeros.', w: wr(fives(n), [[Math.floor(n / 5), 'Numbers like 25 and 50 hide two 5s each. Count those twice.'], [Math.floor(n / 10), 'Every multiple of 5 hides a 5, not only the multiples of 10.']]) });
    }),
    tpl('most', (r) => {
      let pairs = null;
      for (let t = 0; t < 60 && !pairs; t++) {
        const ps = [0, 1, 2, 3].map(() => [r.int(2, 40), r.int(2, 40)]);
        const zs = ps.map(([x, y]) => tz(x * y));
        const mx = Math.max(...zs);
        const names = new Set(ps.map(([x, y]) => x * y));
        if (zs.filter((z) => z === mx).length === 1 && mx > 0 && names.size === 4) pairs = ps;
      }
      if (!pairs) pairs = [[25, 16], [15, 13], [12, 7], [11, 9]];
      const zs = pairs.map(([x, y]) => tz(x * y)), best = zs.indexOf(Math.max(...zs));
      const txt = (pr) => pr[0] + ' × ' + pr[1];
      return choice(r, 'Which product has the most zeros at the end?', txt(pairs[best]), pairs.filter((_, i) => i !== best).map((pr) => [txt(pr), 'Multiply it out: ' + pr[0] * pr[1] + ' has ' + tz(pr[0] * pr[1]) + ' zero' + (tz(pr[0] * pr[1]) === 1 ? '' : 's') + '.']), { s: 'The product ' + pairs[best][0] * pairs[best][1] + ' ends in ' + zs1(zs[best]) + ', more than the others.' });
    }),
    tpl('findN', (r) => {
      const n = r.int(2, 99), z = r.int(1, 4), m = r.int(2, 9);
      const rhs = n * m * 10 ** z;
      return N('N × ' + m * 10 ** z + ' = ' + rhs + '. What is N?', n, { s: rhs + ' ÷ ' + m * 10 ** z + ' = ' + n + '.', w: wr(n, [[n * 10, 'Check by multiplying N × ' + m * 10 ** z + '.'], [Math.max(1, Math.floor(n / 10)), 'Check by multiplying N × ' + m * 10 ** z + '.']]) });
    }),
    tpl('digits', (r) => {
      const a = r.int(2, 9), z = r.int(1, 6), b = r.int(2, 9), y = r.int(1, 6);
      const v = a * 10 ** z * b * 10 ** y;
      return N('How many digits does ' + a * 10 ** z + ' × ' + b * 10 ** y + ' have?', String(v).length, { s: 'The product is ' + v + ', which has ' + String(v).length + ' digits.', w: wr(String(v).length, [[z + y + 1, 'Check whether ' + a + ' × ' + b + ' = ' + a * b + ' has one digit or two.'], [z + y + 2, 'Check whether ' + a + ' × ' + b + ' = ' + a * b + ' has one digit or two.']]) });
    }),
  ],
});
