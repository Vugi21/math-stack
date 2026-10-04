import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const g = (a, b) => { while (b) { [a, b] = [b, a % b]; } return a; };

export default lesson({
  id: 'pre-9-1-squares-to-roots',
  title: 'From squares back to roots',
  blurb: 'A square root undoes a square. Learn to run the machine backwards, and see why it hands back one answer, not two.',
  concepts: ['square-root', 'perfect-squares', 'inverse-operations'],

  tryFirst: [
    num('t1', 'A square tile floor has an area of 169 square feet. How long is one side of the floor, in feet?', 13, {
      h: ['Area of a square is side × side. Which number times itself gives 169?', 'It is between 10 and 15.'],
      s: '13 × 13 = 169, so each side is 13 feet.',
      w: [['84.5', 'You halved 169. But area is side × side, not side × 2.']],
    }),
    num('t2', 'I think of a number, multiply it by itself, then add 5. I end up with 54. What number did I think of? (Give the positive one.)', 7, {
      h: ['Undo the last step first. What was the number before 5 was added?'],
      s: 'Take away the 5: 49. Now which number times itself is 49? 7.',
      w: [['49', '49 is what you had after multiplying. The question asks for the number before it was multiplied by itself.']],
    }),
  ],

  learn: [
    p('Squaring a number means multiplying it by itself: 6^[2] = 36. Picture a square of tiles with 6 tiles on each side. It holds 36 tiles in all. A <b>square root</b> goes the other way. Someone hands you the 36 tiles and asks, "how long is the side?" The answer is sqrt[36] = 6.'),
    def('perfect square', 'A number you get by squaring a whole number: 1, 4, 9, 16, 25, 36, … Its square root is a whole number.'),
    def('square root', 'The square root of N, written sqrt[N], is the <b>non-negative</b> number that gives N when multiplied by itself. The symbol √ is called the radical sign, and the number under it is the radicand.'),
    widget('squareRoot', { n: 7 }),
    formula('Squares and roots undo each other', 'sqrt[k^[2]] = k      sqrt[N] × sqrt[N] = N', 'The first holds when k is not negative. The second holds for any N that is 0 or positive. For example sqrt[49] = 7 and sqrt[49] × sqrt[49] = 49.'),
    rule('<b>Roots and products.</b> The root of a product is the product of the roots: sqrt[a × b] = sqrt[a] × sqrt[b] for a, b ≥ 0. The root of a fraction works the same way (with b &gt; 0): sqrt[{a/b}] = {sqrt[a]/sqrt[b]}.'),
    tbl(['Number k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], [['k^[2]', '1', '4', '9', '16', '25', '36', '49', '64', '81', '100', '121', '144', '169', '196', '225']], 'The perfect squares you should know on sight'),
    tip('<b>Learn the squares in a row.</b> Each square is the one before plus the next odd number: 9 + 7 = 16, 16 + 9 = 25, 25 + 11 = 36. If you forget 13^[2], start from 12^[2] = 144 and add 25 to get 169.'),
    ex('Roots of fractions and products', ['Find sqrt[{9/16}]. Ask: what fraction times itself gives {9/16}?', 'Top: 3 × 3 = 9. Bottom: 4 × 4 = 16. So sqrt[{9/16}] = {3/4}.', 'Find sqrt[4 × 25]. First 4 × 25 = 100, and sqrt[100] = 10.', 'Notice sqrt[4] × sqrt[25] = 2 × 5 = 10 as well. For a product, you may take the roots separately.']),
    key('The root sign works like a pair of brackets. Everything under the bar is calculated <b>first</b>, and the root is taken <b>last</b>. So sqrt[100 − 36] means sqrt[64], not "sqrt[100] − 36".'),
    ex('Work inside, then root', ['Find sqrt[13^[2] − 12^[2]].', 'Squares first: 13^[2] = 169 and 12^[2] = 144.', 'Subtract under the root: 169 − 144 = 25.', 'Take the root: sqrt[25] = 5.']),
    p('<b>Why only one answer?</b> The equation x^[2] = 25 has two solutions, 5 and −5, because (−5) × (−5) = 25 too. But the symbol sqrt[25] is a promise to give just the non-negative one: sqrt[25] = 5. If you want both, write "x = 5 or x = −5". Also, no number multiplied by itself gives a negative result, so sqrt[−4] is not a number you can find on the number line.'),
    warn('<b>Watch out.</b> A root does not split over addition. sqrt[9 + 16] = sqrt[25] = 5, but sqrt[9] + sqrt[16] = 3 + 4 = 7. Roots and products get along, roots and sums (or differences) do not.'),
    mcq('Dev says: "sqrt[25 + 144] must be 5 + 12 = 17." What is wrong?', ['Nothing, adding roots is fine.', 'He split the root over an addition. First compute 25 + 144 = 169, then sqrt[169] = 13.', 'sqrt[169] is not a whole number.'], 1, 'Work inside the root first: 25 + 144 = 169 and sqrt[169] = 13. Splitting a root across plus (or minus) gives a different answer.', 'Spot the mistake'),
    p('<b>A quick test for perfect squares.</b> A number that ends in 2, 3, 7 or 8 is never a perfect square, because no square ends that way. The only possible last digits are 0, 1, 4, 5, 6 and 9. This test can rule a number out but cannot prove it is a square: 24 ends in 4 and is not a perfect square.'),
    recap([['perfect square', 'the square of a whole number'], ['square root', 'the non-negative number that squares to N'], ['radicand', 'the number under the root sign']], [['Root undoes square', 'sqrt[k^[2]] = k for k ≥ 0'], ['Root of a product', 'sqrt[a × b] = sqrt[a] × sqrt[b]'], ['Root of a sum', 'sqrt[a + b] is NOT sqrt[a] + sqrt[b]']]),
  ],

  practice: [
    num('p1', 'Find sqrt[196] − sqrt[81].', 5, {
      h: ['Do each root separately, then subtract.'],
      s: 'sqrt[196] = 14 and sqrt[81] = 9, so 14 − 9 = 5.',
      w: [['115', 'You subtracted inside first: 196 − 81 = 115. The roots are separate terms, so find each root, then subtract.'], ['-5', 'Check the order: 14 − 9 is positive.']],
    }),
    num('p2', 'Find sqrt[100 + 44] (add inside the root first).', 12, {
      h: ['Compute 100 + 44 under the root, then take the root.'],
      s: '100 + 44 = 144 and sqrt[144] = 12.',
      w: [['10', 'Do not take the root of just one part. Add 100 + 44 first.'], ['54', 'That is sqrt[100] + 44: you took the root of only the 100. The root covers the whole sum, so add inside first: 144.']],
    }),
    num('p3', 'Find sqrt[{49/121}] as a fraction.', '7/11', {
      h: ['Take the root of the top and of the bottom.'],
      s: 'sqrt[49] = 7, sqrt[121] = 11, so the answer is 7/11.',
      w: [['49/11', 'You only took the root of the bottom. Take it on both top and bottom.'], ['7/121', 'You only took the root of the top. Take it on both parts.']],
    }),
    set('p4', 'Which numbers x satisfy x^[2] = 64? Give both, separated by a comma.', '8,-8', {
      h: ['Is there a negative number that squares to 64?'],
      s: '8 × 8 = 64 and (−8) × (−8) = 64, so x = 8 or x = −8.',
      w: [['8', 'There is another one. A negative times a negative is positive.']],
    }),
    num('p5', 'A square garden has a perimeter of 52 meters. What is its area, in square meters?', 169, {
      h: ['Perimeter is 4 sides. Find one side first.'],
      s: 'Side = 52 ÷ 4 = 13 m. Area = 13 × 13 = 169.',
      w: [['13', 'That is the side length. The question asks for the area.'], ['52', 'That is the perimeter you started with. Find the side, then square it.']],
    }),
    num('p6', 'How many perfect squares are strictly between 100 and 1000?', 21, {
      h: ['The squares are 11^[2], 12^[2], and so on. Where does the list stop?', '30^[2] = 900. What is 31^[2]?', 'Count the integers from 11 to 31.'],
      s: '11^[2] = 121 is the first square above 100. 31^[2] = 961 is the last below 1000 (32^[2] = 1024 is too big). Counting 11 up to 31 gives 21 squares.',
      w: [['22', 'Check the ends: 10^[2] = 100 is not strictly between, and 32^[2] = 1024 is over 1000. Count 11 through 31.'], ['20', 'Counting 11 to 31 includes both ends: 31 − 11 + 1 = 21.']],
    }),
    num('p7', 'What is the smallest positive whole number I can multiply 18 by to get a perfect square?', 2, {
      h: ['Write 18 as 2 × 3 × 3. A perfect square needs each prime in pairs.'],
      s: '18 = 2 × 3^[2]. The 3s already pair up, but the single 2 needs a partner. 18 × 2 = 36 = 6^[2].',
      w: [['3', '18 × 3 = 54, not a square. The extra prime is 2, not 3.'], ['6', '18 × 6 = 108, not a square. Pair up the lone 2 only.']],
    }),
  ],

  challenge: [
    chain('The square puzzle', 'A square has a side of 12 cm. A second square has exactly four times the area of the first.', [
      num('c1a', 'What is the area of the first square, in square cm?', 144, { h: ['Side times side.'], s: '12 × 12 = 144.' }),
      num('c1b', 'What is the area of the second square?', 576, { h: ['Four times the first area.'], s: '4 × 144 = 576.' }),
      num('c1c', 'What is the side length of the second square, in cm?', 24, { h: ['Which number times itself is 576? It ends in 4, so try numbers ending in 2 or 8.'], s: '24 × 24 = 576. Four times the area gave exactly twice the side.' }),
    ], 'The idea: quadrupling an area only doubles the side, because the side gets multiplied by itself. Roots shrink growth: 4 times the area means sqrt[4] = 2 times the side.'),
    chain('Between the squares', 'Look at the whole numbers n from 1 to 100.', [
      num('c2a', 'How many perfect squares are there from 1 to 100 (including both)?', 10, { h: ['1^[2] up to 10^[2].'], s: '1, 4, 9, ..., 100: ten of them.' }),
      num('c2b', 'How many of the numbers from 1 to 100 are NOT perfect squares?', 90, { h: ['Subtract the squares from 100.'], s: '100 − 10 = 90.' }),
      num('c2c', 'How many whole numbers are strictly between 49 and 64 (neither end counted)?', 14, { h: ['List 50 up to 63, or compute 64 − 49 − 1.'], s: '64 − 49 − 1 = 14. The gaps between consecutive squares grow: that is why square roots of non-squares are common.' }),
    ], 'The idea: squares get farther apart (the gap after k^[2] is 2k + 1), so most numbers are not perfect squares.'),
    mc('c3', 'Find the error. Ava writes: "sqrt[16] = 4 or −4, because both square to 16." Which is the best correction?', ['The symbol sqrt[16] means only the non-negative root, 4. The equation x^[2] = 16 has both 4 and −4.', 'Ava is right: sqrt[16] is ±4.', 'sqrt[16] is 8, because 16 ÷ 2 = 8.', 'sqrt[16] is −4 only.'], 0, {
      s: 'The radical sign asks for the principal (non-negative) root. Solving x^[2] = 16 gives two answers, but sqrt[16] itself is just 4.',
      w: [[1, 'Careful: x^[2] = 16 has two solutions, but the symbol sqrt[16] names one number, 4.'], [2, 'Halving is not rooting. 8 × 8 = 64, not 16.']],
    }),
  ],

  quiz: [
    tpl('root', (r) => {
      const k = r.int(3, 30);
      return N('Find sqrt[' + (k * k) + '].', k, { s: k + ' × ' + k + ' = ' + (k * k) + '.', w: [[k * k / 2, 'Halving does not undo a square. Which number times itself gives ' + (k * k) + '?']] });
    }),
    tpl('frac', (r) => {
      let a, b; do { a = r.int(1, 12); b = r.int(2, 13); } while (a === b || g(a, b) !== 1);
      return N('Find sqrt[{' + (a * a) + '/' + (b * b) + '}] as a fraction.', a + '/' + b, { s: 'Root of the top is ' + a + ' and root of the bottom is ' + b + '.' });
    }),
    tpl('area', (r) => {
      const k = r.int(3, 40), mode = r.int(0, 1);
      return mode
        ? N('A square has an area of ' + (k * k) + ' square cm. What is its perimeter in cm?', 4 * k, { s: 'Side = ' + k + ', so perimeter = 4 × ' + k + ' = ' + (4 * k) + '.', w: [[k, 'That is the side. The perimeter is 4 sides.']] })
        : N('A square has a perimeter of ' + (4 * k) + ' cm. What is its area in square cm?', k * k, { s: 'Side = ' + k + ', so area = ' + k + ' × ' + k + ' = ' + (k * k) + '.', w: [[16 * k * k, 'Squaring the perimeter is not the area. Find one side first (perimeter ÷ 4).']] });
    }),
    tpl('mix', (r) => {
      const a = r.int(3, 20), b = r.int(2, 14), c = r.int(1, 30);
      const sub = r.bool();
      return N('Find sqrt[' + (a * a) + '] ' + (sub ? '−' : '+') + ' sqrt[' + (b * b) + '] ' + (sub ? '−' : '+') + ' ' + c + '. If it is negative, give it as a negative number.', sub ? a - b - c : a + b + c, { s: a + (sub ? ' − ' : ' + ') + b + (sub ? ' − ' : ' + ') + c + ' = ' + (sub ? a - b - c : a + b + c) + '.' });
    }),
    tpl('both', (r) => {
      const k = r.int(2, 40);
      return S('Which numbers x satisfy x^[2] = ' + (k * k) + '? Give both, separated by a comma.', k + ',-' + k, { s: 'x = ' + k + ' or x = −' + k + '.' });
    }),
    tpl('count', (r) => {
      const a = r.int(2, 12), b = r.int(a + 3, a + 30);
      const lo = a * a, hi = b * b;
      return N('How many perfect squares are strictly between ' + lo + ' and ' + hi + '?', b - a - 1, { s: 'The squares are ' + (a + 1) + '^[2] up to ' + (b - 1) + '^[2]. That is ' + (b - a - 1) + ' numbers.', w: [[b - a, 'The two ends are not counted, so subtract one more.'], [b - a + 1, 'Both ends are excluded, so you would count fewer than that.']] });
    }),
    tpl('pair', (r) => {
      const s = r.pick([2, 3, 5, 6, 7, 10, 11]), k = r.int(2, 7);
      return N('What is the smallest positive whole number you can multiply ' + (s * k * k) + ' by to get a perfect square?', s, { s: s * k * k + ' = ' + s + ' × ' + k + '^[2]. The ' + k + 's pair up already, only the ' + s + ' needs a partner.', w: k === s ? [] : [[k, 'That is the root part that is already paired. The leftover factor is the ' + s + '.']] });
    }),
    tpl('which', (r) => {
      const k = r.int(5, 40);
      return choice(r, 'Which of these is a perfect square?', String(k * k), [[String(k * k + 2), 'Squares leave gaps: the next one after ' + k * k + ' is ' + (k + 1) * (k + 1) + '.'], String(k * k - 1), String(k * k + k)], { s: k + ' × ' + k + ' = ' + k * k + '. The others fall in the gaps between squares.' });
    }),
  ],
});
