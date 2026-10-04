import { lesson, num, ratio, mc, N, RT, choice, tpl, p, rule, warn, ex, tbl, widget, mcq, chain, name, gcd, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const fx = (x) => String(Math.round(x * 1e6) / 1e6);
const wr = (right, arr) => arr.filter(([a]) => Math.abs(Number(a) - Number(right)) > 1e-9).map(([a, m]) => [fx(a), m]);
const coprimePair = (r, lo, hi) => { let a, b; do { a = r.int(lo, hi); b = r.int(lo, hi); } while (a === b || gcd(a, b) !== 1); return [a, b]; };

export default lesson({
  id: 'pre-7-1-ratio',
  title: 'What a ratio says',
  blurb: 'Comparing amounts by multiplying, not adding: ratios, equivalent ratios, and part-to-part versus part-to-whole.',
  concepts: ['ratio', 'equivalent-ratios', 'part-to-whole'],

  tryFirst: [
    num('t1', 'A fruit punch uses 3 cups of cranberry juice for every 5 cups of ginger ale. How many cups of ginger ale go with 12 cups of cranberry juice?', 20, {
      h: ['12 cups of cranberry is how many "3-cup batches"?', 'Each batch brings 5 cups of ginger ale.'],
      s: '12 ÷ 3 = 4 batches. Each batch has 5 cups of ginger ale, so 4 × 5 = 20 cups.',
      w: [['9', 'Adding the same amount to both parts (12 − 3 = 9 more) changes the taste. Batches multiply: 4 batches of 5.'], ['4', 'That is the number of batches. Each batch has 5 cups of ginger ale, so multiply by 5.']],
    }),
    ratio('t2', 'On a school trip 12 students walk and 18 take the bus. Write the ratio walkers : bus riders in lowest terms.', '2:3', {
      h: ['Is there a number that divides both 12 and 18?', 'Divide both by the biggest such number.'],
      s: 'Both are multiples of 6: 12 ÷ 6 = 2 and 18 ÷ 6 = 3. The ratio is 2 : 3.',
      w: [['3:2', 'Order matters. The question asked for walkers first, then bus riders.']],
    }),
  ],

  learn: [
    p('A <b>ratio</b> compares two amounts by asking "how many of this for each that?" We write "3 to 5" as <b>3 : 5</b>. Ratios are about <i>multiplying</i>: if you make the punch twice as big, every part doubles.'),
    def('ratio', 'A comparison of two quantities of the same kind by division. The ratio a : b says that for every a units of the first quantity there are b units of the second. It can also be written as the fraction {a/b} (with b not zero).'),
    def('equivalent ratios', 'Ratios that describe the same comparison, such as 3 : 5, 6 : 10 and 9 : 15. Each one is the previous one scaled up by multiplying both parts by the same number.'),
    widget('ratioTable', { a: 3, b: 5, k: 2 }),
    rule('<b>Equivalent ratios.</b> Multiply or divide <i>both</i> parts by the same non-zero number and the ratio is unchanged. 3 : 5 = 6 : 10 = 9 : 15. To write a ratio in <b>lowest terms</b>, divide both parts by their greatest common factor.'),
    ex('Lowest terms', ['Write 24 : 36 in lowest terms.', 'The greatest common factor of 24 and 36 is 12.', '24 ÷ 12 = 2 and 36 ÷ 12 = 3, so 24 : 36 = 2 : 3.', 'Check: 2 : 3 scaled by 12 gives back 24 : 36.']),
    ex('Scaling a recipe', ['Pancake mix: 2 cups flour for 3 cups milk. How much milk goes with 10 cups of flour?', '10 cups is 5 batches of 2 cups, because 10 ÷ 2 = 5.', 'Milk: 5 batches of 3 cups = 15 cups.', 'Check: 10 : 15 divided by 5 gives 2 : 3. ✓']),
    ex('Ratios with decimals and units', ['Write 1.5 m to 60 cm as a ratio in lowest terms.', 'The units must match first: 1.5 m = 150 cm. The ratio is 150 : 60.', 'The greatest common factor of 150 and 60 is 30, so 150 : 60 = 5 : 2.', 'If you left the units different you would get 1.5 : 60 = 1 : 40, which is wrong.']),
    rule('<b>Part-to-part and part-to-whole.</b> "Boys : girls = 3 : 4" compares part to part. The whole group has 3 + 4 = 7 parts, so boys are {3/7} of the class and girls are {4/7}. Adding the parts is what turns a part-to-part ratio into a fraction of the whole.'),
    formula('Part as a fraction of the whole', 'fraction for the first part = {a/a + b}', 'In the ratio a : b the whole is a + b parts. So the first part is {a/a + b} of the whole and the second is {b/a + b}. For 3 : 4 these are {3/7} and {4/7}.'),
    ex('Sharing by a ratio', ['Red : blue marbles is 3 : 4 and there are 35 marbles in all.', 'One batch is 3 + 4 = 7 marbles. 35 ÷ 7 = 5 batches.', 'Red: 3 × 5 = 15. Blue: 4 × 5 = 20. Check: 15 + 20 = 35. ✓']),
    tbl(['Say it as', 'Ratio', 'Meaning'], [['red to blue', '3 : 4', 'for every 3 red there are 4 blue'], ['blue to red', '4 : 3', 'the order flips with the words'], ['red to all', '3 : 7', 'part to whole'], ['red as a fraction', '{3/7}', 'same idea, written as a fraction']], 'The order of a ratio follows the order of the words'),
    warn('<b>Watch out: adding is not scaling.</b> If punch is 3 : 5 and you add 4 cups to each part you get 7 : 9, a different taste. Ratios stay the same only when you <i>multiply or divide</i> both parts by the same number. Also, units must match: 30 cm to 2 m is 30 : 200, not 30 : 2.'),
    warn('<b>Watch out: order matters.</b> "Girls to boys" and "boys to girls" are different ratios. If there are 8 girls and 12 boys, girls : boys = 2 : 3 but boys : girls = 3 : 2. Read which quantity is named first and write it first.'),
    tip('<b>Make a quick ratio table.</b> Write the original ratio as the first column and keep adding columns by the same multiplier: 3 : 5, 6 : 10, 9 : 15, 12 : 20. To find a missing number, look for the column that has the number you were given. And to test whether two ratios are equal, reduce both to lowest terms and compare.'),
    key('A ratio is about <b>multiplying</b>, not adding. Equal ratios come from multiplying or dividing both parts by the same number. To share a total, add the parts, find the value of one part, and multiply.'),
    mcq('Priya says: "3 : 5 is the same as 5 : 7, because I added 2 to each part." What is wrong?', ['Nothing, adding the same number keeps a ratio.', 'Adding changes the ratio. Only multiplying or dividing both parts by the same number keeps it. 3 : 5 = 6 : 10, but 5 : 7 is different.', '5 : 7 can never equal any other ratio.'], 1, '3 : 5 is {3/5} = 0.6, but 5 : 7 is about 0.71. If it were the same, scaling up the recipe would break the taste.', 'Spot the mistake'),
    recap([['ratio', 'a comparison a : b of two like quantities'], ['equivalent ratios', 'same comparison; multiply or divide both parts by one number'], ['lowest terms', 'divide both parts by their greatest common factor'], ['part-to-whole', 'add the parts to get the whole']], [['Equivalent', 'a : b = ka : kb'], ['First part of whole', '{a/a + b}'], ['Sharing a total', 'total ÷ (a + b) = one part']]),
  ],

  practice: [
    ratio('p1', 'A bag has 15 red and 25 blue marbles. Write red : blue in lowest terms.', '3:5', {
      h: ['What number divides both 15 and 25?'], s: 'Divide both by 5: 15 ÷ 5 = 3 and 25 ÷ 5 = 5. The ratio is 3 : 5.',
      w: [['5:3', 'You flipped it. Red comes first in the question, so red goes first.']],
    }),
    num('p2', 'Cats to dogs at a shelter is 3 : 5. There are 40 animals, all cats or dogs. How many are dogs?', 25, {
      h: ['How many parts are there in total?', 'Find the size of one part, then take 5 of them.'], s: '3 + 5 = 8 parts. 40 ÷ 8 = 5 animals per part. Dogs: 5 × 5 = 25.',
      w: [['15', 'That is the number of cats (3 parts). The dogs are 5 parts.'], ['8', 'That is the number of parts. Divide 40 by 8 to get the size of one part first.']],
    }),
    num('p3', 'The ratio of boys to girls in a band is 4 : 7. There are 28 girls. How many boys are there?', 16, {
      h: ['28 girls is how many batches of 7?'], s: '28 ÷ 7 = 4 batches. Boys: 4 × 4 = 16.',
      w: [['25', 'You added 21 to the boys because the girls went up by 21. The parts should be scaled by multiplying, not by adding.'], ['11', 'That is 4 + 7, the total number of parts. Count batches: 28 ÷ 7.']],
    }),
    ratio('p4', 'A tree is 40 cm tall and its stake is 1 m tall. Write tree : stake as a ratio.', '2:5', {
      h: ['The two lengths must be in the same unit first.'], s: '1 m = 100 cm, so the ratio is 40 : 100. Dividing both by 20 gives 2 : 5.',
      w: [['40:1', 'The units differ: cm versus m. Change 1 m to 100 cm first.']],
    }),
    mc('p5', 'Which ratio is equivalent to 6 : 9?', ['2 : 3', '8 : 11', '3 : 6', '9 : 6'], 0, {
      h: ['Divide both parts by the same number.'], s: 'Divide 6 and 9 by 3 to get 2 : 3.',
      w: [[1, '8 : 11 comes from adding 2 to each part. Adding does not keep a ratio.'], [3, 'That is 9 : 6, the flipped ratio. Order matters.']],
    }),
    num('p6', 'At a shelter the ratio of cats to dogs is 3 : 4. Then 6 more dogs arrive and nothing else changes, and now the ratio is 3 : 5. How many cats are there?', 18, {
      h: ['Cats stay at 3 parts. Dogs went from 4 parts to 5 parts.', 'So 6 dogs equal how many parts?'], s: 'Cats stay 3 parts. Dogs grew by 1 part (4 to 5 parts), and that growth is 6 dogs. So one part is 6 animals and the cats are 3 × 6 = 18.',
      w: [['6', 'That is the size of one part. The cats are 3 parts.'], ['24', 'That was the number of dogs before. Cats are 3 parts of 6.']],
    }),
    num('p7', 'Red to blue marbles is 3 : 7 and there are only red and blue. What fraction of the marbles are red? Give it as a fraction.', '3/10', {
      h: ['Fraction of the whole means part over total parts.'], s: 'The whole is 3 + 7 = 10 parts, red is 3 of them: {3/10}.',
      w: [['3/7', 'That compares red to blue, not red to everything. The denominator is the whole: 3 + 7.']],
    }),
  ],

  challenge: [
    chain('Paint mixing', 'Green paint is made from blue and yellow in the ratio 2 : 3.', [
      num('c1a', 'A batch is 15 litres in total. How many litres of blue?', 6, { h: ['2 + 3 = 5 parts in all.'], s: '15 ÷ 5 = 3 L per part. Blue is 2 parts: 6 L.' }),
      num('c1b', 'To make 40 litres, how many litres of yellow?', 24, { h: ['40 ÷ 5 gives one part.'], s: '40 ÷ 5 = 8 L per part. Yellow is 3 parts: 24 L.' }),
      num('c1c', 'You only have 18 litres of blue. What is the largest total amount of green paint you can make?', 45, { h: ['18 litres is how many 2-part groups?'], s: 'Blue is 2 parts, so one part is 9 L. The whole is 5 parts: 45 L.' }),
    ], 'The idea: find the size of one part and everything else follows. The part you know decides the size of the batch.'),
    chain('Wins and losses', 'A team has won and lost games in the ratio 5 : 3 and never tied. It has played 40 games.', [
      num('c2a', 'How many wins?', 25, { h: ['5 + 3 = 8 parts of 40 games.'], s: '40 ÷ 8 = 5 games per part. Wins: 5 × 5 = 25.' }),
      num('c2b', 'How many losses?', 15, { h: ['Losses are 3 parts.'], s: '3 × 5 = 15.' }),
      num('c2c', 'If the team wins x more games in a row and no more losses, wins : losses becomes 3 : 1. What is x?', 20, { h: ['Losses stay at 15. For 3 : 1 the wins must be 3 times the losses.'], s: 'Wins must be 3 × 15 = 45. They have 25, so x = 20.' }),
    ], 'The idea: something that does not change (the losses) can anchor a new ratio.'),
    mc('c3', 'Find the error. Omar says: "Juice : water is 2 : 3, so I can make 12 : 13 by adding 10 to each part." Which statement is correct?', ['He is right: adding the same amount to both parts keeps the ratio.', 'He is wrong. 2 : 3 scales by multiplying; 12 : 18 is the ratio 6 batches would give.', 'He is wrong, because 12 : 13 is smaller than 2 : 3.', 'Ratios cannot be scaled.'], 1, {
      s: 'Multiply both parts by 6: 2 × 6 = 12 and 3 × 6 = 18. Adding 10 gives 12 : 13, which is a much weaker juice.',
      w: [[0, 'Check it: 2 : 3 means juice is {2/3} of the water; 12 : 13 means almost equal amounts. Different taste.'], [2, 'Size is not the issue. Multiplying also makes bigger numbers. The issue is adding.']],
    }),
  ],

  quiz: [
    tpl('simplify', (r) => {
      const [a, b] = coprimePair(r, 1, 12), k = r.int(2, 12);
      const [x, y] = r.pick([['red marbles', 'green marbles'], ['guitars', 'drums'], ['dogs', 'cats'], ['dollar coins', 'quarters'], ['maple trees', 'oak trees'], ['goals', 'misses']]);
      return RT('A box has ' + a * k + ' ' + x + ' and ' + b * k + ' ' + y + '. Write the ratio of ' + x + ' to ' + y + ' in lowest terms.', a + ':' + b, { s: 'Divide both by ' + k + ': ' + a + ' : ' + b + '.', w: [[b + ':' + a, 'The order follows the words in the question: ' + x + ' first.']] });
    }),
    tpl('scale', (r) => {
      const [a, b] = coprimePair(r, 2, 9), k = r.int(2, 9);
      const [x, y] = r.pick([['cups of mango', 'cups of yogurt'], ['scoops of cocoa', 'scoops of milk powder'], ['parts blue paint', 'parts white paint'], ['cups of rice', 'cups of water']]);
      return N('A recipe uses ' + a + ' ' + x + ' for every ' + b + ' ' + y + '. How many ' + y + ' go with ' + a * k + ' ' + x + '?', b * k, { s: a * k + ' ÷ ' + a + ' = ' + k + ' batches. ' + k + ' × ' + b + ' = ' + b * k + '.', w: wr(b * k, [[a * k + (b - a), 'You added the same difference. Ratios scale by multiplying: count batches of ' + a + '.'], [k, 'That is the number of batches. Each batch has ' + b + ' of the second ingredient.']]) });
    }),
    tpl('whole', (r) => {
      const [a, b] = coprimePair(r, 1, 9), k = r.int(2, 14), n = name(r);
      const which = r.bool();
      const q = n + ' mixes red and yellow in the ratio ' + a + ' : ' + b + ' to make ' + (a + b) * k + ' mL of orange. How many mL of ' + (which ? 'yellow' : 'red') + '?';
      const ans = (which ? b : a) * k;
      return N(q, ans, { s: (a + b) + ' parts in all. ' + (a + b) * k + ' ÷ ' + (a + b) + ' = ' + k + ' mL per part. ' + (which ? 'Yellow' : 'Red') + ' is ' + (which ? b : a) + ' parts: ' + ans + ' mL.', w: wr(ans, [[(which ? a : b) * k, 'That is the other colour. Check which one the question asks for.'], [k, 'That is one part. Multiply by the number of parts for the colour you want.']]) });
    }),
    tpl('fraction', (r) => {
      const [a, b] = coprimePair(r, 1, 9);
      const which = r.bool();
      const part = which ? a : b;
      const [x, y] = r.pick([['red', 'blue'], ['boys', 'girls'], ['wins', 'losses'], ['dogs', 'cats']]);
      const [nx, ny] = which ? [x, y] : [y, x];
      return N('The ratio ' + x + ' : ' + y + ' is ' + a + ' : ' + b + '. What fraction of the whole group are ' + nx + '? Give a fraction.', part + '/' + (a + b), { s: 'The whole is ' + a + ' + ' + b + ' = ' + (a + b) + ' parts, and ' + nx + ' are ' + part + ' of them.', w: [[part + '/' + (which ? b : a), 'That compares ' + nx + ' to ' + ny + '. For a fraction of the whole, the bottom is the total number of parts.']] });
    }),
    tpl('given', (r) => {
      const [a, b] = coprimePair(r, 2, 8), k = r.int(2, 12);
      const [x, y] = r.pick([['boys', 'girls'], ['adults', 'children'], ['violins', 'cellos']]);
      return N('The ratio of ' + x + ' to ' + y + ' in an orchestra is ' + a + ' : ' + b + '. There are ' + a * k + ' ' + x + '. How many players are there in all?', (a + b) * k, { s: a * k + ' ÷ ' + a + ' = ' + k + ' per part. ' + (a + b) + ' parts in all: ' + (a + b) * k + '.', w: wr((a + b) * k, [[b * k, 'That is only the ' + y + '. The total includes both groups.']]) });
    }),
    tpl('units', (r) => {
      const t = r.int(0, 2);
      const a = r.int(1, 9), b = r.int(2, 9);
      if (t === 0) return RT('A hike lasts ' + a * 10 + ' minutes and the break lasts ' + b + ' hours. Write the ratio of hike time to break time.', a * 10 + ':' + b * 60, { s: b + ' hours = ' + b * 60 + ' minutes, so the ratio is ' + a * 10 + ' : ' + b * 60 + ' (any equal form is fine).', w: [[a * 10 + ':' + b, 'The units must match. Change the hours to minutes first.']] });
      if (t === 1) return RT('A shelf is ' + a * 5 + ' cm tall and a door is ' + b + ' m tall. Write shelf height : door height.', a * 5 + ':' + b * 100, { s: b + ' m = ' + b * 100 + ' cm. So ' + a * 5 + ' : ' + b * 100 + '.', w: [[a * 5 + ':' + b, 'cm and m are different units. Convert the metres to centimetres first.']] });
      return RT('A rope is ' + a * 50 + ' g and a bag is ' + b + ' kg. Write the ratio rope : bag.', a * 50 + ':' + b * 1000, { s: b + ' kg = ' + b * 1000 + ' g, so ' + a * 50 + ' : ' + b * 1000 + '.', w: [[a * 50 + ':' + b, 'Match the units first: kilograms to grams.']] });
    }),
    tpl('equiv', (r) => {
      const [a, b] = coprimePair(r, 2, 9), k = r.int(2, 6);
      const right = a * k + ' : ' + b * k;
      const wrongs = [[(a + k) + ' : ' + (b + k), 'Adding ' + k + ' to both parts is not scaling.'], [b * k + ' : ' + a * k, 'That is the flipped ratio.'], [a * k + ' : ' + (b * k + 1), 'Close, but the second part was not multiplied by the same number.']];
      return choice(r, 'Which ratio is equivalent to ' + a + ' : ' + b + '?', right, wrongs, { s: 'Multiply both parts by ' + k + ': ' + right + '.' });
    }),
  ],
});
