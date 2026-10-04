import { lesson, num, mc, N, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, R, eq, mul, gcd, fmt, fm, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';
import { parseNum } from '../../../../src/engine/parse.js';

const F = (n, d) => '{' + n + '/' + d + '}';
const toV = (a) => (a && typeof a === 'object' ? a : parseNum(String(a)));
const W = (ans, list) => { const seen = [toV(ans)]; return list.filter(([a]) => { const v = toV(a); if (!v || seen.some((x) => eq(x, v))) return false; seen.push(v); return true; }); };
const coprime = (a, b) => gcd(a, b) === 1;
const phi = (m) => { let c = 0; for (let n = 1; n < m; n++) if (coprime(n, m)) c++; return c; };

export default lesson({
  id: 'pre-4-5-simplest-form',
  title: 'Simplest form',
  blurb: 'Same amount, smaller numbers: equivalent fractions, greatest common factors, and why every fraction has one simplest name.',
  concepts: ['fractions', 'simplifying-fractions', 'gcf'],

  tryFirst: [
    num('t1', 'A pizza is cut into 24 equal slices and you eat 18 of them. If instead the pizza were cut into only a few big slices, you would eat 3 of them. How many big slices make the whole pizza?', 4, {
      h: ['18 small slices are grouped into 3 big slices. How many small slices are in one big slice?'],
      s: 'Each big slice is 18 ÷ 3 = 6 small slices. 24 ÷ 6 = 4 big slices. So {18/24} = {3/4}.',
      w: [['6', 'That is the number of small slices in one big slice. How many big slices make the whole?'], ['3', 'That is how many big slices you eat. The question asks how many make the whole pizza.']],
    }),
    num('t2', 'What is the largest whole number that divides evenly into both 28 and 42?', 14, {
      h: ['List the factors of 28, then check which divide 42.'],
      s: 'Factors of 28: 1, 2, 4, 7, 14, 28. Of these, 14 divides 42 (42 = 3 × 14) and 28 does not. So 14.',
      w: [['7', '7 divides both, but a larger number does too. Check 14.'], ['2', '2 divides both, but it is far from the largest. Try bigger factors of 28.']],
    }),
  ],

  learn: [
    p(`{6/8}, {3/4} and {12/16} are three names for the same point on the number line. We prefer the name with the smallest numbers, because it is the easiest to read, compare and calculate with. That name is the <b>simplest form</b> (also called <b>lowest terms</b>).`),
    def('simplest form', `A fraction is in simplest form (lowest terms) when its top and bottom have no common factor except 1. {3/4} is in simplest form. {6/8} is not, because 2 divides both 6 and 8.`),
    def('greatest common factor (GCF)', `The largest whole number that divides evenly into both numbers. The GCF of 28 and 42 is 14. Another name for it is the greatest common divisor (GCD), which you met in Chapter 3.`),
    widget('simplifyFraction', { n: 12, d: 18 }),
    rule(`<b>Simplifying.</b> Divide the top and the bottom by the same nonzero number. The value does not change, because you are grouping pieces into bigger pieces (for example, 3 small slices become 1 big slice) and the whole is grouped the same way.`),
    formula('Simplifying a fraction', `{a/b} = {(a ÷ g)/(b ÷ g)}`, `Here g is the greatest common factor of a and b. After dividing by the GCF, the new top and bottom have no common factor left, so the result is in simplest form.`),
    ex('Using the GCF', [`Simplify {36/48}.`, `Factors of 36 and 48: the biggest number that divides both is 12.`, `36 ÷ 12 = 3 and 48 ÷ 12 = 4.`, `{36/48} = {3/4}. Nothing divides both 3 and 4, so we are done.`]),
    ex('Taking small steps', [`Simplify {84/126} when you do not see the GCF.`, `Both are even: divide by 2 to get {42/63}.`, `Both are multiples of 3: divide by 3 to get {14/21}.`, `Both are multiples of 7: divide by 7 to get {2/3}. Stop when no common factor remains.`]),
    tbl(['Divisible by', 'Test'], [['2', 'last digit is even'], ['3', 'digits add to a multiple of 3'], ['5', 'last digit is 0 or 5'], ['9', 'digits add to a multiple of 9'], ['10', 'last digit is 0']], 'Quick tests for common factors'),
    tip(`Do not worry if your first division is not by the GCF. Divide by any common factor you can see (2, 3, 5), and repeat until the top and bottom share nothing. You end at the same simplest form either way. To find the GCF directly, use prime factorizations: for 84 = 2 × 2 × 3 × 7 and 126 = 2 × 3 × 3 × 7, the shared primes are 2 × 3 × 7 = 42.`),
    key(`<b>Every fraction has exactly one simplest form.</b> If the top and the bottom have no common factor, you cannot make the pieces any bigger. Every fraction in the family {1/2}, {2/4}, {3/6}, ... simplifies to the same {1/2}, so you can test whether two fractions are equal by simplifying both.`),
    ex('Cancelling inside a product', [`Simplify {(15 × 28)/(35 × 18)} without multiplying everything out.`, `Write every number as primes: 15 = 3 × 5, 28 = 2 × 2 × 7, 35 = 5 × 7, 18 = 2 × 3 × 3.`, `Top: 3 × 5 × 2 × 2 × 7. Bottom: 5 × 7 × 2 × 3 × 3. Cancel 2 × 3 × 5 × 7 from both.`, `What is left is 2 on the top and 3 on the bottom: {2/3}. Check: 420 ÷ 630 = {2/3}. ✓`]),
    warn(`<b>Watch out.</b> You can only cancel <i>factors</i> (things multiplied), never <i>terms</i> (things added). In {(3 + 9)/(3 + 15)} the 3s are not factors of the top and bottom, so you cannot cancel them. Add first: {12/18} = {2/3}. Likewise, crossing out matching digits is not a method: it only works by luck.`),
    mcq(`Maya says: "{16/64} simplifies by crossing out the 6 in the top and in the bottom, giving {1/4}." The answer {1/4} happens to be right. Is her method OK?`, [`Yes, crossing out matching digits always works.`, `No. Digits are not factors. The method fails on almost all other fractions, like {12/24}. The correct reason is that 16 ÷ 16 = 1 and 64 ÷ 16 = 4.`, `Yes, but only if the fraction is less than 1.`], 1, `Crossing out digits gives {26/65} → {2/5}, which is correct, but {12/24} → {1/4} is wrong (it is {1/2}). A method that works only by luck is not a method.`, 'Spot the mistake'),
    recap([['simplest form', 'top and bottom share no common factor except 1'], ['GCF', 'the greatest number dividing both'], ['equivalent fractions', 'different names for the same amount'], ['cancel', 'divide a top and a bottom by a shared factor']], [['Simplifying', '{a/b} = {(a ÷ g)/(b ÷ g)}, g = GCF'], ['Equivalent', '{a/b} = {(a × k)/(b × k)}']]),
  ],

  practice: [
    num('p1', 'Write {24/60} in simplest form.', '2/5', {
      h: ['Find the GCF of 24 and 60.'],
      s: 'The GCF is 12. 24 ÷ 12 = 2 and 60 ÷ 12 = 5.'
    }),
    num('p2', 'Write {84/126} in simplest form.', '2/3', {
      h: ['Both are even, and both are multiples of 3 and of 7. Take it one step at a time.'],
      s: 'The GCF is 42. 84 ÷ 42 = 2 and 126 ÷ 42 = 3.'
    }),
    num('p3', 'What is the GCF of 72 and 108?', 36, {
      h: ['Divide both by 2 and by 3 repeatedly until nothing common is left, then multiply the divisors.'],
      s: '72 = 2 × 2 × 2 × 3 × 3 and 108 = 2 × 2 × 3 × 3 × 3. Common: 2 × 2 × 3 × 3 = 36.',
      w: [['12', '12 divides both, but 36 is bigger and also divides both.'], ['18', '18 divides both, but there is a bigger one. 72 ÷ 18 = 4 and 108 ÷ 18 = 6, which still share a 2.']],
    }),
    mc('p4', 'Which fraction is <b>not</b> in simplest form?', [F(21, 35), F(15, 28), F(9, 16), F(7, 12)], 0, {
      h: ['Look for a common factor greater than 1.'],
      s: '21 = 3 × 7 and 35 = 5 × 7. They share a 7: {21/35} = {3/5}. The others share no factor.',
      w: [[1, '15 = 3 × 5 and 28 = 4 × 7. No common factor, so it is already simplest.'], [2, '9 = 3 × 3 and 16 = 2^[4]. No common factor.']],
    }),
    num('p5', 'Simplify {(12 × 15)/(20 × 18)} without multiplying everything out first.', '1/2', {
      h: ['Cancel factors between the top and bottom: 12 and 18, then 15 and 20.'],
      s: '12 and 18 share 6: 12 → 2, 18 → 3. 15 and 20 share 5: 15 → 3, 20 → 4. Now {(2 × 3)/(4 × 3)} = {6/12} = {1/2}.'
    }),
    num('p6', 'For how many whole numbers n from 1 to 11 is {n/12} already in simplest form?', 4, {
      h: ['The fraction is simplest when n and 12 share no factor except 1. 12 = 2 × 2 × 3, so n must not be even or a multiple of 3.'],
      s: 'The numbers with no factor of 2 or 3 are 1, 5, 7 and 11. So 4 numbers.',
      w: [['6', 'That only avoids even numbers. But 3 and 9 share a factor of 3 with 12, so they simplify.'], ['8', 'That only avoids multiples of 3. But even numbers share a factor of 2 with 12.']],
    }),
    num('p7', 'Choose the smallest whole number n so that {n/45} simplifies to a fraction with denominator 3 (n must be at least 1).', 15, {
      h: ['{?/3} = {n/45}. How was 3 turned into 45?'],
      s: '45 = 3 × 15, so the top is 1 × 15 = 15 when the simplified top is 1. Then {15/45} = {1/3}.',
      w: [['1', 'n/45 must equal a fraction with bottom 3. The top 1 would give {1/45}.'], ['3', '{3/45} = {1/15}, not a fraction with denominator 3.']],
    }),
  ],

  challenge: [
    chain('Many names for {3/5}', 'The fractions {3/5}, {6/10}, {9/15}, ... all name the same number.', [
      num('c1a', 'What is the bottom of the fraction equal to {3/5} that has top 12?', 20, { h: ['3 times what is 12?'], s: '3 × 4 = 12, so the bottom is 5 × 4 = 20.' }),
      num('c1b', 'How many fractions equal to {3/5} have a bottom smaller than 30?', 5, { h: ['Bottoms are 5, 10, 15, ...'], s: 'Bottoms 5, 10, 15, 20, 25. That is 5 fractions.' }),
      num('c1c', 'One fraction equal to {3/5} has a top and bottom that add up to 56. What is its top?', 21, { h: ['The top is 3k and the bottom is 5k. So 8k = 56.'], s: '8k = 56 gives k = 7. The fraction is {21/35}. Its top is 21.', w: [['35', 'That is the bottom. We want the top.']] }),
    ], 'The idea: every fraction equal to {3/5} is {3k/5k}. Think of k as a "scale factor" that blows up or shrinks the whole family.'),
    chain('GCF detective', 'Take the fraction {48/180}.', [
      num('c2a', 'What is the GCF of 48 and 180?', 12, { h: ['48 = 2 × 2 × 2 × 2 × 3. 180 = 2 × 2 × 3 × 3 × 5.'], s: 'Common factors: 2 × 2 × 3 = 12.' }),
      num('c2b', 'Write {48/180} in simplest form.', '4/15', { h: ['Divide top and bottom by 12.'], s: '48 ÷ 12 = 4 and 180 ÷ 12 = 15.' }),
      num('c2c', 'A fraction equal to {4/15} has top plus bottom equal to 133. What is its top?', 28, { h: ['The top is 4k and the bottom is 15k.'], s: '19k = 133, so k = 7 and the top is 4 × 7 = 28.', w: [['105', 'That is the bottom. We want the top.']] }),
    ], 'The idea: the simplest form gives the "recipe" {4/15}, and all equal fractions are whole-number multiples of that recipe.'),
    mc('c3', 'Find the error. Ben simplifies {(4 + 6)/(4 + 10)} by cancelling the 4s and gets {6/10}, then {3/5}. What went wrong?', ['Nothing, the answer is right.', 'You can only cancel common factors, not terms that are added. The correct simplification is {10/14} = {5/7}.', 'He should have cancelled the 6 and the 10 to get {4/4}.', 'Fractions with sums cannot be simplified.'], 1, {
      s: 'Add first: 4 + 6 = 10 and 4 + 10 = 14. {10/14} = {5/7}. Cancel only when the top and bottom are products.',
      w: [[0, 'Add the top and the bottom first: {10/14}. Is that equal to {3/5}?']],
    }),
  ],

  quiz: [
    tpl('simplify', (r) => {
      let a, b; do { a = r.int(1, 14); b = r.int(2, 18); } while (a === b || !coprime(a, b));
      const g = r.int(2, 12);
      const ans = R(a, b);
      return N('Write ' + F(a * g, b * g) + ' in simplest form.', fmt(ans), { mixed: true, s: 'The GCF is ' + g + '. ' + a * g + ' ÷ ' + g + ' = ' + a + ' and ' + b * g + ' ÷ ' + g + ' = ' + b + ', so ' + fm(ans) + '.' });
    }),
    tpl('gcf', (r) => {
      let x, y; do { x = r.int(2, 9); y = r.int(2, 9); } while (x === y || !coprime(x, y));
      const g = r.int(2, 15);
      return N('What is the greatest common factor of ' + g * x + ' and ' + g * y + '?', g, { s: g * x + ' = ' + g + ' × ' + x + ' and ' + g * y + ' = ' + g + ' × ' + y + '. ' + x + ' and ' + y + ' share no factor, so the GCF is ' + g + '.', w: W(g, [[g * x * y, 'That is a common multiple, not a factor. A common factor must divide both numbers.']]) });
    }),
    tpl('notsimplest', (r) => {
      const g = r.int(2, 5);
      let a, b; do { a = r.int(1, 9); b = r.int(2, 11); } while (a >= b || !coprime(a, b));
      const wrongs = new Set();
      while (wrongs.size < 3) { const bb = r.int(3, 20), aa = r.int(1, bb - 1); if (coprime(aa, bb)) wrongs.add(F(aa, bb)); }
      const right = F(a * g, b * g);
      return choice(r, 'Which of these fractions is <b>not</b> in simplest form?', right, [...wrongs].map((x) => [x, 'The top and bottom have no common factor, so this one is already in simplest form.']), { s: right + ' has a common factor of ' + g + ', so it simplifies to ' + F(a, b) + '. The others have no common factor.' });
    }),
    tpl('count', (r) => {
      const m = r.int(6, 40);
      const k = phi(m);
      return N('For how many whole numbers n from 1 to ' + (m - 1) + ' is ' + F('n', m) + ' already in simplest form?', k, { s: 'Count the n from 1 to ' + (m - 1) + ' that share no factor with ' + m + '. There are ' + k + ' of them.', w: W(k, [[m - 1, 'Some n share a factor with ' + m + ' (for example multiples of its prime factors), so they simplify.']]) });
    }),
    tpl('sumsimp', (r) => {
      let a, b; do { a = r.int(1, 12); b = r.int(2, 15); } while (a >= b || !coprime(a, b));
      const g = r.int(2, 9);
      return N('Simplify ' + F(a * g, b * g) + '. What is the sum of the top and the bottom of the simplest form?', a + b, { s: F(a * g, b * g) + ' = ' + F(a, b) + ' (divide by ' + g + '). ' + a + ' + ' + b + ' = ' + (a + b) + '.', w: W(a + b, [[(a + b) * g, 'That adds the top and bottom <i>before</i> simplifying. Simplify first.']]) });
    }),
    tpl('blank', (r) => {
      const b = r.int(2, 9); let a; do { a = r.int(1, b + 3); } while (!coprime(a, b));
      const k = r.int(2, 9);
      return N('Fill in the missing bottom: ' + F(a, b) + ' = ' + F(a * k, '?') + '.', b * k, { s: 'The top went from ' + a + ' to ' + a * k + ', multiplied by ' + k + '. Do the same to the bottom: ' + b + ' × ' + k + ' = ' + b * k + '.', w: W(b * k, [[b + a * k - a, 'You added ' + (a * k - a) + ' to the bottom. Multiply both numbers by ' + k + ' instead.']]) });
    }),
    tpl('prodsimp', (r) => {
      const [p1, q1, r1, s1] = [r.int(2, 12), r.int(2, 12), r.int(2, 12), r.int(2, 12)];
      const ans = R(p1 * q1, r1 * s1);
      return N('Write ' + F(p1 + ' × ' + q1, r1 + ' × ' + s1) + ' in simplest form. (Cancel common factors before multiplying.)', fmt(ans), { mixed: true, s: 'Cancel common factors between the top and the bottom. ' + (p1 * q1) + '/' + (r1 * s1) + ' simplifies to ' + fm(ans) + '.' });
    }),
    tpl('word', (r) => {
      const g = r.int(2, 8); let a, b; do { a = r.int(1, 11); b = r.int(2, 14); } while (a >= b || !coprime(a, b));
      const who = name(r);
      const ans = R(a, b);
      return N('In ' + who + "'s class there are " + b * g + ' students and ' + a * g + ' of them have a pet. What fraction of the class has a pet? Give it in simplest form.', fmt(ans), { s: F(a * g, b * g) + ' simplifies by ' + g + ' to ' + fm(ans) + '.' });
    }),
  ],
});
