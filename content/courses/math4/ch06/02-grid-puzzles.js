import { lesson, text, num, mc, N, T, choice, tpl, p, rule, warn, ex, widget, mcq, chain, NAMES } from '../../../../src/content/dsl.js';

const perms = (a) => (a.length <= 1 ? [a.slice()] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((q) => [x, ...q])));
const count = (all, cl) => all.filter((s) => cl.every((k) => k.f(s))).length;
function minimal(all, pool, r) {
  let cl = [];
  for (const c of r.shuffle(pool)) { cl.push(c); if (count(all, cl) === 1) break; }
  if (count(all, cl) !== 1) return null;
  for (let i = cl.length - 1; i >= 0; i--) { const t = cl.filter((_, k) => k !== i); if (count(all, t) === 1) cl = t; }
  return cl;
}
const people = (r, n) => r.distinct(n, 0, NAMES.length - 1).map((i) => NAMES[i]);
const list = (a) => a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

const CATS = {
  pet: { label: 'pet', items: ['cat', 'dog', 'fish', 'bird', 'rabbit'], pos: (x) => 'has the ' + x, neg: (x) => 'does not have the ' + x, ask: (n) => 'Which pet does ' + n + ' have?' },
  drink: { label: 'drink', items: ['milk', 'juice', 'tea', 'water', 'cocoa'], pos: (x) => 'drinks ' + x, neg: (x) => 'does not drink ' + x, ask: (n) => 'What does ' + n + ' drink?' },
  sport: { label: 'sport', items: ['soccer', 'tennis', 'golf', 'hockey', 'rugby'], pos: (x) => 'plays ' + x, neg: (x) => 'does not play ' + x, ask: (n) => 'Which sport does ' + n + ' play?' },
  snack: { label: 'snack', items: ['grapes', 'nuts', 'cheese', 'popcorn', 'raisins'], pos: (x) => 'eats ' + x, neg: (x) => 'does not eat ' + x, ask: (n) => 'What does ' + n + ' eat?' },
  door: { label: 'door color', items: ['red', 'blue', 'green', 'yellow', 'purple'], pos: (x) => 'lives behind the ' + x + ' door', neg: (x) => 'does not live behind the ' + x + ' door', ask: (n) => 'Which door does ' + n + ' live behind? (a color)' },
};
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Build a matching-grid puzzle: n people, several categories, clues that leave exactly one solution. */
function gridPuzzle(r, n, cats) {
  const ps = people(r, n);
  const items = cats.map((c) => r.shuffle(c.items).slice(0, n)); // items[c][k]
  const hid = cats.map(() => r.shuffle([...Array(n).keys()]));   // hid[c][i] = item index of person i
  const per = perms([...Array(n).keys()]);
  let all = [[]];
  for (let c = 0; c < cats.length; c++) all = all.flatMap((a) => per.map((pm) => [...a, pm]));
  const pool = [];
  for (let c = 0; c < cats.length; c++) {
    for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) {
      pool.push(hid[c][i] === k
        ? { t: ps[i] + ' ' + cats[c].pos(items[c][k]) + '.', f: (a) => a[c][i] === k }
        : { t: ps[i] + ' ' + cats[c].neg(items[c][k]) + '.', f: (a) => a[c][i] !== k });
    }
  }
  for (let c1 = 0; c1 < cats.length; c1++) for (let c2 = c1 + 1; c2 < cats.length; c2++) {
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) {
      const same = hid[c1].indexOf(x) === hid[c2].indexOf(y);
      const t = 'The person who ' + cats[c1].pos(items[c1][x]) + (same ? ' ' + cats[c2].pos(items[c2][y]) : ' ' + cats[c2].neg(items[c2][y])) + '.';
      pool.push({ t, f: same ? (a) => a[c1].indexOf(x) === a[c2].indexOf(y) : (a) => a[c1].indexOf(x) !== a[c2].indexOf(y) });
    }
  }
  const cl = minimal(all, pool, r);
  const intro = list(ps) + ' are friends. Each one has ' + list(cats.map((c, i) => 'a different ' + c.label + ' (' + items[i].join(', ') + ')')) + '.';
  return { ps, items, hid, cl, intro, text: intro + ' ' + cl.map((c) => c.t).join(' ') };
}
/** a puzzle plus a "who ...?" question whose answer is not simply stated in a clue */
function askWho(r, n, k) {
  for (let t = 0; t < 30; t++) {
    const cats = r.shuffle(Object.values(CATS)).slice(0, k); const g = gridPuzzle(r, n, cats);
    const opts = [];
    for (let c = 0; c < k; c++) for (let x = 0; x < n; x++) if (!g.cl.some((q) => q.t === g.ps[g.hid[c].indexOf(x)] + ' ' + cats[c].pos(g.items[c][x]) + '.')) opts.push([c, x]);
    if (opts.length) { const [c, x] = r.pick(opts); return { g, cats, c, k: x }; }
  }
  throw new Error('no who puzzle');
}
const summary = (g, cats) => g.ps.map((nm, i) => nm + ': ' + cats.map((c, k) => g.items[k][g.hid[k][i]]).join(', ')).join('. ') + '.';

export default lesson({
  id: 'm4-6-2-grid-puzzles',
  title: 'Grid puzzles',
  blurb: 'Match people to things with a grid. Mark what cannot be, find what must be, and make sure there is only one answer.',
  concepts: ['matching-grids', 'deduction', 'unique-solution'],

  tryFirst: [
    text('t1', 'Ava, Ben and Cy each have one pet (cat, dog, fish) and one drink (milk, juice, tea). All are different. Ava has the dog. The person with the fish drinks juice. Cy drinks neither tea nor juice. Who has the fish?', ['Ben'], {
      h: ['Cy drinks neither tea nor juice. What does Cy drink?', 'The fish owner drinks juice. Can that be Cy? Can it be Ava?'],
      s: 'Cy drinks neither tea nor juice, so Cy drinks milk. The fish owner drinks juice, so Cy does not have the fish. Ava has the dog. That leaves the fish for Ben, who drinks juice.',
      w: [['Cy', 'Cy drinks milk. The fish owner drinks juice, so it cannot be Cy.'], ['Ava', 'Ava has the dog.']],
    }),
    text('t2', 'Dee, Eli and Fay each play a different sport (soccer, tennis, swimming) and wear a different shirt (red, blue, green). The swimmer wears red. Fay wears blue. The tennis player wears blue. Dee does not play soccer. What color shirt does the soccer player wear?', ['green'], {
      h: ['Fay wears blue. Who plays tennis?', 'Dee does not play soccer. What sport is left for Dee?'],
      s: 'Fay wears blue and the tennis player wears blue, so Fay plays tennis. Dee does not play soccer, so Dee swims and wears red. Eli plays soccer and wears the last color, green.',
      w: [['red', 'Red is the swimmer\'s color. Work out who swims first.'], ['blue', 'Blue is the tennis player\'s color.']],
    }),
  ],

  learn: [
    p('Some puzzles match <b>three</b> kinds of things: people, pets, drinks. A <b>grid</b> keeps them straight. Each row is one thing. Each column is another. A ✓ means "these match". A ✗ means "these do not match".'),
    rule('<b>Grid rules.</b> Every row has exactly one ✓. Every column has exactly one ✓. When you place a ✓, put ✗ in the rest of its row and the rest of its column.'),
    widget('logicGrid', { rows: ['Gus', 'Hana', 'Ivan'], cols: ['red', 'blue', 'green'] }),
    p('Try it. Gus does not live behind the blue door. Ivan lives behind the green door. Mark ✓ for Ivan and green. Then fill in ✗ for the rest of its row and column.'),
    ex('Linking two columns', ['Three friends have a pet (cat, dog or bird) and a drink. Clue: the cat owner drinks tea. Clue: Hana has the dog. Clue: Gus does not drink tea.', 'Hana has the dog. So the cat belongs to Gus or Ivan.', 'Gus does not drink tea. The cat owner does. So the cat owner is not Gus.', 'The cat is Ivan\'s, and Ivan drinks tea.', 'Gus is left with the bird.']),
    rule('<b>A clue about two things.</b> "The cat owner drinks tea" does not name a person. It joins two columns. Use it as soon as you know who owns the cat or who drinks tea.'),
    warn('<b>Do not put a ✓ unless you must.</b> "Gus does not drink tea" gives you a ✗ and nothing else. A ✓ is only for a match that is forced. If two cells are still possible, keep thinking.'),
    p('A good puzzle has <b>exactly one solution</b>. If you can fill the grid in two different ways, a clue is missing. If no way works, you made a mistake. You can test a puzzle by counting how many ways survive the clues.'),
    mcq('The clue says "Ava does not own the cat." Zoe writes ✓ for Ava and dog. What is wrong?', ['Nothing. Ava must own the dog.', 'The clue only says that Ava does not have the cat. Ava could own the fish or the dog, so Zoe has no reason for ✓.', 'A grid can only hold ✗.'], 1, 'A "does not" clue rules out one cell. Other cells in the row are still possible. Put a ✓ only when every other cell in the row is ✗.', 'Spot the mistake'),
  ],

  practice: [
    text('p1', 'Gus, Hana and Ivan live behind a red, a blue and a green door. They have a cat, a dog and a bird. The dog owner lives behind the red door. Hana does not have the bird. Hana does not live behind the red door. Ivan does not live behind the red door. Who has the cat?', ['Hana'], {
      h: ['Who lives behind the red door? It cannot be Hana or Ivan.', 'Then look at Hana and the pets.'],
      s: 'Hana and Ivan do not live behind the red door, so Gus does. Gus has the dog. Hana does not have the bird, so Hana has the cat. Ivan has the bird.',
      w: [['Gus', 'Gus has the dog, because the dog owner lives behind the red door.'], ['Ivan', 'Hana does not have the bird, so the bird is Ivan\'s.']],
    }),
    text('p2', 'Ava, Ben, Cy and Dee each play a different sport (soccer, tennis, swimming, chess) and each eat a different snack (apple, grapes, cheese, nuts). The swimmer eats nuts. Ava eats grapes. The soccer player eats the apple. The tennis player does not eat grapes. Dee plays neither chess nor soccer. Ben eats neither nuts nor cheese. Cy does not play tennis. What snack does Dee eat?', ['cheese'], {
      h: ['Ava eats grapes. What can Ava play?', 'Ben eats neither nuts nor cheese. What does he eat?'],
      s: 'Ava eats grapes, so she is not the swimmer (nuts), the soccer player (apple) or the tennis player (not grapes). Ava plays chess. Ben eats the apple, so he plays soccer. Dee and Cy are left with swimming and tennis. Cy does not play tennis, so Cy swims and eats nuts. Dee plays tennis and eats cheese.',
      w: [['nuts', 'The swimmer eats nuts, and Cy is the swimmer.'], ['apple', 'The soccer player eats the apple, and that is Ben.']],
    }),
    mc('p3', 'Three children get a red, a blue and a green cup. Ava does not get red. Ben does not get blue. This leaves 3 different ways to hand out the cups. Which extra clue leaves exactly one way?', ['Cy does not get green.', 'Ben gets green.', 'Ava does not get green.', 'Cy does not get red.'], 1, {
      h: ['First list the 3 ways. Then test each extra clue.', 'The ways: (Ava blue, Ben red, Cy green), (Ava blue, Ben green, Cy red), (Ava green, Ben red, Cy blue).'],
      s: 'The three ways are: Ava blue, Ben red, Cy green; Ava blue, Ben green, Cy red; Ava green, Ben red, Cy blue. "Ben gets green" keeps only the second. The other clues each leave two ways.',
      w: [[0, 'That removes only the first way. Two ways are left.'], [2, 'That removes only the third way. Two ways are left.'], [3, 'That removes only the second way. Two ways are left.']],
    }),
    num('p4', 'Three children sit in three seats. Ava is not in seat 1. Ben is not in seat 2. Cy is not in seat 3. In how many different ways can they sit?', 2, {
      h: ['Try Ava in seat 2, then seat 3. See who can go where.', 'List every arrangement and cross out the ones that break a clue.'],
      s: 'Try Ava in seat 2. Ben cannot sit in seat 2, and if Ben takes seat 1 then Cy must take seat 3, which is not allowed. So Ben takes seat 3 and Cy seat 1. Now try Ava in seat 3. Ben cannot take seat 2, so Ben takes seat 1 and Cy takes seat 2. That is 2 ways.',
      w: [['3', 'Check all 6 seatings. Only 2 of them keep every child out of the named seat.'], ['1', 'There is one with Ava in seat 2 and one with Ava in seat 3.']],
    }),
    text('p5', 'Gus, Hana and Ivan live behind a red, a blue and a green door. They have a cat, a dog and a bird, and drink milk, juice and tea. The dog owner lives behind the red door. Hana does not have the bird. The person behind the green door drinks milk. The cat owner drinks tea. Hana does not live behind the red door. Ivan does not live behind the red door. Who drinks juice?', ['Gus'], {
      h: ['Who lives behind the red door? Then use the dog.', 'Hana has the cat, so she drinks tea. Can she live behind the green door?'],
      s: 'Gus lives behind the red door and has the dog. Hana has the cat (not the bird) and drinks tea. The green door person drinks milk, so it is not Hana. Hana is behind the blue door and Ivan behind the green door, drinking milk. Gus drinks the juice.',
      w: [['Hana', 'Hana has the cat, and the cat owner drinks tea.'], ['Ivan', 'Ivan lives behind the green door, and that person drinks milk.']],
    }),
    text('p6', 'Ava, Ben and Cy each give one gift to one of the other two. Each person gets exactly one gift. Nobody gives to themselves. Ava gives to the person who gives to Cy. Who gives to Ava?', ['Cy'], {
      h: ['There are only two ways for gifts to go around the three people. Draw arrows.', 'In one way, Ava gives to Ben and Ben gives to Cy. Does that match the clue?'],
      s: 'The gifts form a circle. Either Ava gives to Ben, Ben to Cy, Cy to Ava; or Ava gives to Cy, Cy to Ben, Ben to Ava. In the second circle, Ava gives to Cy. Then Cy would have to give to Cy, which is not allowed. That breaks the clue. In the first circle, Ava gives to Ben, and Ben gives to Cy. It fits. Cy gives to Ava.',
      w: [['Ben', 'Ben gives to Cy in the circle that fits.']],
    }),
    mc('p7', 'A puzzle grid has four rows (people) and four columns (pets). Three cells in the "fish" column are ✗. What must be true?', ['The fourth cell in the "fish" column is ✓.', 'The fourth cell in the "fish" column is ✗.', 'Nothing can be said.', 'The fish is not owned by anyone.'], 0, {
      h: ['Each pet belongs to exactly one person.'],
      s: 'The fish has an owner, and three people cannot be it. The fourth person must be the owner.',
      w: [[1, 'The fish has to belong to someone. Three people are out, so only one is left.'], [2, 'The column must contain exactly one ✓, so you can say where it is.']],
    }),
  ],

  challenge: [
    chain('Four seats, four snacks', 'Dev, Elena, Farid and Grace sit in seats 1 to 4 from left to right. Each eats a different snack: apple, grapes, cheese or nuts. Dev is in seat 1. Elena is next to Farid. The apple eater sits in seat 4. Grace is not next to Dev. The cheese eater sits directly left of the nut eater. Dev does not eat cheese.', [
      text('c1a', 'Who sits in seat 4?', ['Grace'], { h: ['Grace is not next to Dev, so Grace is not in seat 2.', 'Elena and Farid are neighbors. Where can two neighbors sit?'], s: 'Grace is not in seat 2. Elena and Farid must be neighbors. If they took seats 3 and 4, Grace would be in seat 2. So they take seats 2 and 3, and Grace is in seat 4.' }),
      text('c1b', 'What snack does Dev eat?', ['grapes'], { h: ['Seat 4 eats the apple. Cheese is directly left of nuts. Which seats can they take?'], s: 'The apple is in seat 4. Cheese and nuts are neighbors, so they take seats 1-2 or 2-3. Dev (seat 1) does not eat cheese, so they take seats 2-3. Dev eats grapes.' }),
      text('c1c', 'Elena sits left of Farid. Who eats the nuts?', ['Farid'], { h: ['Elena is in seat 2, Farid in seat 3. Nuts are in seat 3.'], s: 'Elena is in seat 2 and Farid in seat 3. Cheese is in seat 2 and nuts in seat 3. Farid eats the nuts.' }),
    ], 'The idea: the clues about seats are one puzzle and the clues about food are another. Solve one, then use it for the other.'),
    chain('Counting the ways', 'Three children, Ava, Ben and Cy, will sit in seats 1, 2 and 3.', [
      num('c2a', 'Ava is not in seat 1. How many different seatings are there?', 4, { h: ['Without any clue there are 6 seatings. How many have Ava in seat 1?'], s: 'There are 6 seatings. Two of them put Ava in seat 1 (Ben, Cy can swap). So 6 − 2 = 4.' }),
      num('c2b', 'Now Ben is not in seat 2 either. How many seatings are there?', 3, { h: ['List the 4 seatings from the last part. Cross out those with Ben in seat 2.'], s: 'The four seatings (Ava, Ben, Cy): (2,1,3), (2,3,1), (3,1,2), (3,2,1) written as seat numbers. Ben is in seat 2 in (3,2,1). That leaves 3.' }),
      num('c2c', 'Keep the earlier clues. Also, Cy is not in seat 3, and Ava is not in seat 2. Which seat does Ava take?', 3, { h: ['Look at the three seatings left. Which ones put Cy in seat 3 or Ava in seat 2?'], s: 'The three seatings are (2,1,3), (2,3,1), (3,1,2) for (Ava, Ben, Cy). Cy is in seat 3 in the first: out. Ava is in seat 2 in the first two: out. Only (3,1,2) is left. Ava takes seat 3.' }),
    ], 'The idea: every clue removes some possibilities. Count what is left after each clue, and stop when exactly one remains.'),
    mc('c3', 'Find the error. Hiro says: "Clue: the soccer player does not eat grapes. Clue: Ben eats grapes. So Ben plays soccer." What is wrong?', ['Hiro should have said Ben plays tennis.', 'The clues show that Ben does NOT play soccer, because the soccer player does not eat grapes.', 'Nothing is wrong.', 'The clues cannot be used together.'], 1, {
      s: 'The soccer player does not eat grapes. Ben eats grapes. So Ben is not the soccer player. Hiro used the clue backwards.',
      w: [[0, 'The clues do not say that. They only rule out soccer for Ben.'], [2, 'Read the first clue again: the soccer player does NOT eat grapes.']],
    }),
  ],

  quiz: [
    tpl('who3', (r) => {
      const { g, cats, c, k } = askWho(r, 3, 2);
      return T(g.text + ' Who ' + cats[c].pos(g.items[c][k]) + '?', [g.ps[g.hid[c].indexOf(k)]], { s: 'Mark each clue in a grid and cross out what cannot be. The full answer: ' + summary(g, cats) });
    }),
    tpl('who4', (r) => {
      const { g, cats, c, k } = askWho(r, 4, 2);
      return T(g.text + ' Who ' + cats[c].pos(g.items[c][k]) + '?', [g.ps[g.hid[c].indexOf(k)]], { s: 'Use the clues to cross out cells until each row and column has one ✓. The full answer: ' + summary(g, cats) });
    }),
    tpl('what3', (r) => {
      for (let t = 0; t < 30; t++) {
        const cats = r.shuffle(Object.values(CATS)).slice(0, 2); const g = gridPuzzle(r, 3, cats);
        const opts = []; for (let c = 0; c < 2; c++) for (let i = 0; i < 3; i++) if (!g.cl.some((x) => x.t === g.ps[i] + ' ' + cats[c].pos(g.items[c][g.hid[c][i]]) + '.')) opts.push([c, i]);
        if (!opts.length) continue;
        const [c, i] = r.pick(opts);
        return T(g.text + ' ' + cats[c].ask(g.ps[i]), [g.items[c][g.hid[c][i]]], { s: 'Full answer: ' + summary(g, cats) });
      }
      throw new Error('no what puzzle');
    }),
    tpl('three', (r) => {
      const { g, cats, c, k } = askWho(r, 3, 3);
      return T(g.text + ' Who ' + cats[c].pos(g.items[c][k]) + '?', [g.ps[g.hid[c].indexOf(k)]], { s: 'Solve one category at a time. The full answer: ' + summary(g, cats) });
    }),
    tpl('ways', (r) => {
      const n = r.pick([3, 4, 4]); const ps = people(r, n); const col = r.pick([['red', 'blue', 'green', 'yellow'], ['pizza', 'soup', 'salad', 'pasta'], ['math', 'art', 'music', 'gym']]).slice(0, n);
      const verb = col[0] === 'red' ? ['gets a', 'cup'] : col[0] === 'pizza' ? ['orders', ''] : ['has', 'class'];
      const k = r.int(2, n); let forb, total = 0;
      while (total === 0) { const who = r.distinct(k, 0, n - 1); forb = who.map((i) => [i, r.int(0, n - 1)]); total = perms([...Array(n).keys()]).filter((pm) => forb.every(([i, x]) => pm[i] !== x)).length; }
      const phr = (i, x) => ps[i] + ' does not ' + (verb[0] === 'gets a' ? 'get the ' + col[x] + ' cup' : verb[0] === 'orders' ? 'order the ' + col[x] : 'have ' + col[x] + ' first').replace(' first', '') + '.';
      const nm = verb[0] === 'gets a' ? 'cups' : verb[0] === 'orders' ? 'dishes' : 'classes';
      return N(list(ps) + ' each get a different one of these ' + nm + ': ' + list(col) + '. ' + forb.map(([i, x]) => phr(i, x)).join(' ') + ' In how many different ways can the ' + nm + ' be given out?', total, { s: 'List the ways and cross out the ones that break a clue. ' + total + ' ways are left.' });
    }),
    tpl('extra', (r) => {
      const ps = people(r, 3); const col = r.pick([['red', 'blue', 'green'], ['cat', 'dog', 'fish'], ['milk', 'juice', 'tea']]);
      const verb = col[0] === 'red' ? ['wears', 'does not wear'] : col[0] === 'cat' ? ['has the', 'does not have the'] : ['drinks', 'does not drink'];
      const sh = (i, x, pos) => ps[i] + ' ' + (pos ? verb[0] : verb[1]) + ' ' + col[x] + '.';
      const P3 = perms([0, 1, 2]);
      for (let tries = 0; tries < 200; tries++) {
        const f1 = [0, r.int(0, 2)], f2 = [1, r.int(0, 2)];
        if (f1[1] === f2[1]) continue;
        const base = P3.filter((pm) => pm[0] !== f1[1] && pm[1] !== f2[1]);
        const cands = [];
        for (let i = 0; i < 3; i++) for (let x = 0; x < 3; x++) { cands.push({ i, x, pos: true, c: base.filter((pm) => pm[i] === x).length }); cands.push({ i, x, pos: false, c: base.filter((pm) => pm[i] !== x).length }); }
        const good = cands.filter((c) => c.c === 1), bad = cands.filter((c) => c.c >= 2 && c.c < base.length);
        if (base.length < 3 || !good.length || bad.length < 3) continue;
        const g1 = r.pick(good); const bs = r.shuffle(bad).filter((b, idx, arr) => arr.findIndex((z) => sh(z.i, z.x, z.pos) === sh(b.i, b.x, b.pos)) === idx).slice(0, 3);
        if (bs.length < 3) continue;
        return choice(r, list(ps) + ' each get a different one of ' + list(col) + '. ' + sh(0, f1[1], false) + ' ' + sh(1, f2[1], false) + ' This leaves ' + base.length + ' ways. Which extra clue leaves exactly one way?', sh(g1.i, g1.x, g1.pos), bs.map((b) => [sh(b.i, b.x, b.pos), 'That clue still leaves ' + b.c + ' ways.']), { s: 'List the ' + base.length + ' ways and test each clue. Only "' + sh(g1.i, g1.x, g1.pos) + '" leaves exactly one.' });
      }
      throw new Error('no extra clue found');
    }),
  ],
});
