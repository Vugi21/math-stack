import { lesson, num, set, mc, N, S, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name } from '../../../../src/content/dsl.js';

const SF = [2, 3, 5, 6, 7, 10, 11, 13]; // square-free radicands
const rad = (a, b) => (a === 1 ? '' : a) + 'sqrt[' + b + ']';

export default lesson({
  id: 'pre-9-3-simplifying-and-root-arithmetic',
  title: 'Simplifying and combining roots',
  blurb: 'Pull perfect squares out of a root, then add, multiply and divide roots with confidence.',
  concepts: ['radicals', 'simplifying-roots', 'root-arithmetic'],

  tryFirst: [
    num('t1', 'Compute sqrt[4] × sqrt[9], and then compute sqrt[4 × 9]. What is the common value?', 6, {
      h: ['Do the roots first in the left one: 2 × 3.', 'In the right one multiply under the root first: sqrt[36].'],
      s: 'sqrt[4] × sqrt[9] = 2 × 3 = 6, and sqrt[36] = 6. They agree.',
      w: [['13', 'That is 4 + 9, adding the numbers under the roots. Take each root first (2 and 3), then multiply them.']],
    }),
    num('t2', 'Is sqrt[50] longer or shorter than 7? Answer with the whole number that is closest to sqrt[50].', 7, {
      h: ['7 × 7 = 49.'],
      s: '7 × 7 = 49, nearly 50. So sqrt[50] is just a little more than 7. We will soon see sqrt[50] = 5 sqrt[2] exactly.',
      w: [['5', 'That is the coefficient in the exact form, but 5 × 5 = 25, not 50. Which whole number squares to something near 50?']],
    }),
  ],

  learn: [
    p('Since 4 × 9 = 36, we found that sqrt[4] × sqrt[9] = sqrt[36]. That is no accident. It is a rule you can use in both directions.'),
    rule('<b>Product rule.</b> sqrt[a] × sqrt[b] = sqrt[a × b] for non-negative a and b. Read it backwards to split a root: sqrt[a × b] = sqrt[a] × sqrt[b].'),
    ex('Simplifying sqrt[72]', ['We want a perfect square hiding inside 72. Try 36: 72 = 36 × 2.', 'Split: sqrt[72] = sqrt[36] × sqrt[2] = 6 × sqrt[2].', 'We write 6sqrt[2], meaning "6 times the root of 2". Nothing under the root is left with a square factor.', 'Check: 6sqrt[2] squared is 36 × 2 = 72. Yes.']),
    widget('factorTree', { n: 72 }),
    p('<b>The pairs trick.</b> The factor tree above gives 72 = 2 × 2 × 2 × 3 × 3. Every <i>pair</i> of equal primes steps out of the root as one copy. The pair of 3s becomes a 3 outside, and the pair of 2s becomes a 2 outside, leaving a single 2 inside: 3 × 2 = 6 outside, 2 inside. So sqrt[72] = 6sqrt[2].'),
    rule('<b>Simplest form.</b> Write sqrt[N] as a·sqrt[b] where b has no perfect-square factor (other than 1). Use the biggest perfect square factor, or keep pulling pairs out until none are left.'),
    p('<b>Adding roots.</b> 3sqrt[2] + 5sqrt[2] works like 3 apples + 5 apples: the "apple" is sqrt[2], so the total is 8sqrt[2]. Only <i>like</i> roots combine. sqrt[8] + sqrt[2] looks stuck until you simplify: 2sqrt[2] + sqrt[2] = 3sqrt[2].'),
    ex('Combining after simplifying', ['Find sqrt[18] + sqrt[50].', 'sqrt[18] = sqrt[9 × 2] = 3sqrt[2].', 'sqrt[50] = sqrt[25 × 2] = 5sqrt[2].', 'Add the like roots: 3sqrt[2] + 5sqrt[2] = 8sqrt[2].']),
    rule('<b>Division and squaring.</b> sqrt[a] ÷ sqrt[b] = sqrt[a ÷ b]. And (sqrt[a])^[2] = a, so (3sqrt[5])^[2] = 3^[2] × 5 = 45.'),
    warn('<b>Watch out.</b> sqrt[a] + sqrt[b] is NOT sqrt[a + b], and 3sqrt[2] + 5sqrt[3] cannot be combined into one term. Different roots are different "fruits". Also 3sqrt[2] is 3 × sqrt[2], not sqrt[6].'),
    mcq('Elena simplifies sqrt[48] and writes 4sqrt[3] ... then Ben writes 2sqrt[12]. Both are true (check by squaring!). Which one is in simplest form?', ['2sqrt[12], because 12 is smaller than 48.', '4sqrt[3], because 3 has no perfect-square factor, while 12 still hides a 4.', 'Both are simplest form.'], 1, 'sqrt[12] = 2sqrt[3], so 2sqrt[12] = 4sqrt[3]. Ben stopped one step early. Simplest form means nothing under the root can be pulled out.', 'Spot the mistake'),
  ],

  practice: [
    num('p1', 'sqrt[200] = a·sqrt[2] in simplest form. What is a?', 10, {
      h: ['200 = 100 × 2.'],
      s: 'sqrt[200] = sqrt[100] × sqrt[2] = 10sqrt[2], so a = 10.',
      w: [['20', 'Check by squaring: 20 × 20 = 400, not 200. Use 200 = 100 × 2 and sqrt[100] = 10.'], ['100', 'You pulled out the 100 itself. Take its square root: 10.']],
    }),
    num('p2', 'sqrt[75] = a·sqrt[b] in simplest form. What is a + b?', 8, {
      h: ['75 = 25 × 3.', 'Find a and b, then add.'],
      s: 'sqrt[75] = sqrt[25] × sqrt[3] = 5sqrt[3]. a = 5, b = 3, so a + b = 8.',
      w: [['28', 'You added 25 and 3. After pulling out 25, it becomes 5 outside.'], ['15', 'That is 5 × 3. The question asks for a + b.']],
    }),
    num('p3', 'sqrt[12] + sqrt[27] = k·sqrt[3]. Find k.', 5, {
      h: ['Simplify each: 12 = 4 × 3 and 27 = 9 × 3.'],
      s: 'sqrt[12] = 2sqrt[3] and sqrt[27] = 3sqrt[3]. Together 5sqrt[3], so k = 5.',
      w: [['39', 'You added under the root. Simplify each root first, then add the coefficients.'], ['4', 'That is 2 + 2, or a miscount. 27 = 9 × 3 gives 3sqrt[3], not 2.']],
    }),
    num('p4', 'Find sqrt[8] × sqrt[18].', 12, {
      h: ['Multiply under the root: 8 × 18 = 144.'],
      s: 'sqrt[8] × sqrt[18] = sqrt[144] = 12.',
      w: [['26', 'That adds 8 + 18. The problem multiplies the roots: multiply under one root.'], ['144', 'You multiplied but forgot the root. Take sqrt[144].']],
    }),
    num('p5', 'Find (4sqrt[3])^[2].', 48, {
      h: ['Square the 4 and square the root separately.'],
      s: '(4sqrt[3])^[2] = 4^[2] × (sqrt[3])^[2] = 16 × 3 = 48.',
      w: [['12', 'You squared the root only (3) and then multiplied by 4. The 4 gets squared too.'], ['19', 'That is 16 + 3. Squaring a product squares each factor, and we multiply: 16 × 3.'], ['144', 'That squares the 3 under the root as well. But (sqrt[3])^[2] is just 3, so it is 16 × 3.']],
    }),
    num('p6', 'Find sqrt[{98/2}].', 7, {
      h: ['Divide first: 98 ÷ 2.', 'Or write sqrt[98] ÷ sqrt[2] and simplify.'],
      s: '98 ÷ 2 = 49 and sqrt[49] = 7. (Also sqrt[98] = 7sqrt[2], and 7sqrt[2] ÷ sqrt[2] = 7.)',
      w: [['49', 'You divided but did not take the root.'], ['4.9', 'Divide under the root, then take the root of 49.']],
    }),
    num('p7', 'The side of a square is 3sqrt[5] cm. What is the area of the square, in square cm?', 45, {
      h: ['Area is side squared. Use (3sqrt[5])^[2].'],
      s: '(3sqrt[5])^[2] = 9 × 5 = 45 square cm.',
      w: [['15', 'That is 3 × 5. Squaring gives 3 × 3 × 5.'], ['3', 'The root disappears when squared, but the coefficient 3 is squared too.']],
    }),
  ],

  challenge: [
    chain('A root that fits', 'The expression sqrt[n] is a whole number for some n and not for others. Think about n = 2 × 2 × 3 × 3 × 5.', [
      num('c1a', 'What is n for the factor list 2 × 2 × 3 × 3 × 5?', 180, { h: ['Multiply: 4 × 9 × 5.'], s: '4 × 9 × 5 = 180.' }),
      num('c1b', 'sqrt[180] = a·sqrt[b] in simplest form. What is a?', 6, { h: ['Pair up the 2s and the 3s. Each pair gives one factor outside.'], s: 'One 2 and one 3 come out: a = 2 × 3 = 6.' }),
      num('c1c', 'What is b? (It is also the smallest positive number you can multiply 180 by to get a perfect square.)', 5, { h: ['The lone factor stays inside the root.'], s: 'b = 5. Multiply 180 by 5 to get 900 = 30^[2].' }),
    ], 'The idea: the leftover (unpaired) primes are exactly what remains inside the root. They are also what you must multiply by to make a perfect square.'),
    chain('Sticks and squares', 'Two squares have areas 8 and 18 square cm.', [
      num('c2a', 'Write the side of the first square as k·sqrt[2]. What is k?', 2, { h: ['sqrt[8] = sqrt[4 × 2].'], s: 'sqrt[8] = 2sqrt[2].' }),
      num('c2b', 'Write the side of the second square as m·sqrt[2]. What is m?', 3, { h: ['sqrt[18] = sqrt[9 × 2].'], s: 'sqrt[18] = 3sqrt[2].' }),
      num('c2c', 'The two squares are placed side by side along a line. The total length of the two bottom edges is t·sqrt[2]. What is t?', 5, { h: ['Add the coefficients.'], s: '2sqrt[2] + 3sqrt[2] = 5sqrt[2]. Notice 5sqrt[2] = sqrt[50], the side of a square of area 50, not 8 + 18 = 26.' }),
    ], 'The idea: sides add, areas do not. 2 + 3 = 5 for the roots (like roots add), while the area of a square with side 5sqrt[2] is 50, not 26.'),
    mc('c3', 'Find the error. Maya writes: sqrt[9 + 16] = sqrt[9] + sqrt[16] = 3 + 4 = 7. Which best describes the mistake?', ['She split the root over addition. 9 + 16 = 25 and sqrt[25] = 5. Only products split.', 'She should have gotten 25.', 'There is no mistake: sqrt[25] = 7.', 'She mixed up 9 and 16.'], 0, {
      s: 'sqrt[a × b] = sqrt[a] × sqrt[b], but sqrt[a + b] is not sqrt[a] + sqrt[b]. Here 9 + 16 = 25 and sqrt[25] = 5.',
      w: [[1, '25 is what is under the root. After the root it is 5.'], [2, '7 × 7 = 49, not 25.']],
    }),
  ],

  quiz: [
    tpl('coef', (r) => {
      const a = r.int(2, 12), b = r.pick(SF);
      return N('sqrt[' + a * a * b + '] can be written as a·sqrt[b] with b as small as possible. What is a?', a, { s: a * a * b + ' = ' + a * a + ' × ' + b + ', so the root is ' + a + 'sqrt[' + b + '].', w: [[a * a, 'You pulled out ' + a * a + ' itself. Take its square root.']] });
    }),
    tpl('radi', (r) => {
      const a = r.int(2, 10), b = r.pick(SF);
      return N('Write sqrt[' + a * a * b + '] as a·sqrt[b] with b as small as possible. What is b?', b, { s: a * a * b + ' = ' + a * a + ' × ' + b + ', so b = ' + b + '.', w: [[a * a * b, 'That is the original number. Pull the square factor out first.']] });
    }),
    tpl('form', (r) => {
      const a = r.int(2, 9), b = r.pick(SF);
      const right = rad(a, b);
      const w2 = rad(b, a), w3 = rad(a * a, b), w4 = 'sqrt[' + a * b + ']';
      const wr = [w2 === right ? rad(a + 1, b) : w2, w3, w4];
      return choice(r, 'Which is sqrt[' + a * a * b + '] in simplest form?', right, wr, { s: a * a * b + ' = ' + a * a + ' × ' + b + ', so sqrt[' + a * a * b + '] = ' + right + '.' });
    }),
    tpl('prod', (r) => {
      const s = r.pick([2, 3, 5, 6, 7]), u = r.int(1, 5), v = r.int(1, 5);
      const A = s * u * u, B = s * v * v;
      return N('Find sqrt[' + A + '] × sqrt[' + B + '].', s * u * v, { s: 'Multiply under the root: ' + A + ' × ' + B + ' = ' + A * B + '. sqrt[' + A * B + '] = ' + s * u * v + '.', w: [[A + B, 'That adds the numbers under the roots. Multiply them, then take the root.'], [A * B, 'You multiplied but did not take the root.']].filter((x) => x[0] !== s * u * v) });
    }),
    tpl('like', (r) => {
      const s = r.pick(SF), a = r.int(2, 12), b = r.int(2, 12), c = r.int(1, 9);
      return N(a + 'sqrt[' + s + '] + ' + b + 'sqrt[' + s + '] − ' + c + 'sqrt[' + s + '] = k·sqrt[' + s + ']. Find k. (Negative is possible.)', a + b - c, { s: 'Like terms: ' + a + ' + ' + b + ' − ' + c + ' = ' + (a + b - c) + '.', w: [[a + b + c, 'The last one is subtracted.']] });
    }),
    tpl('div', (r) => {
      const m = r.int(2, 14), k = r.int(2, 12);
      return N('Find sqrt[' + m * k * k + '] ÷ sqrt[' + m + '].', k, { s: 'Divide under the root: ' + m * k * k + ' ÷ ' + m + ' = ' + k * k + '. sqrt[' + k * k + '] = ' + k + '.', w: [[k * k, 'Do not forget the root after dividing.']] });
    }),
    tpl('sq', (r) => {
      const a = r.int(2, 9), s = r.pick(SF);
      return N('Find (' + a + 'sqrt[' + s + '])^[2].', a * a * s, { s: a + '^[2] × ' + s + ' = ' + a * a * s + '.', w: [[a * s, 'The coefficient is squared too: ' + a + ' × ' + a + '.'], [a * a + s, 'Squaring multiplies: it is ' + a + '^[2] × ' + s + '.']] });
    }),
    tpl('sum', (r) => {
      const s = r.pick([2, 3, 5, 6, 7]), u = r.int(2, 7);
      let v; do { v = r.int(2, 7); } while (v === u);
      return N('Simplify sqrt[' + u * u * s + '] + sqrt[' + v * v * s + '] to k·sqrt[' + s + ']. Find k.', u + v, { s: 'sqrt[' + u * u * s + '] = ' + u + 'sqrt[' + s + '] and sqrt[' + v * v * s + '] = ' + v + 'sqrt[' + s + ']. Total ' + (u + v) + 'sqrt[' + s + '].', w: [[u * u + v * v, 'Add the roots, not the squares: ' + u + ' + ' + v + '.']] });
    }),
  ],
});
