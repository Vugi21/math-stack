import { lesson, text, num, mc, N, T, choice, tpl, p, rule, warn, ex, widget, mcq, chain, NAMES, def, key, formula, tip, recap } from '../../../../src/content/dsl.js';

const people = (r, n) => r.distinct(n, 0, NAMES.length - 1).map((i) => NAMES[i]);
const list = (a) => a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const IS = 'Each person is either a truth-teller or a liar. Truth-tellers always tell the truth. Liars always lie.';
/** every assignment (true = truth-teller) that agrees with all the statements */
function valid(n, st) {
  const out = [];
  for (let m = 0; m < (1 << n); m++) {
    const a = []; for (let i = 0; i < n; i++) a.push(!!(m & (1 << i)));
    if (st.every((s, i) => a[i] === s.f(a))) out.push(a);
  }
  return out;
}
/** a random statement by speaker i, among n people named ps */
function statement(r, ps, i, n) {
  const others = ps.map((_, j) => j).filter((j) => j !== i); const j = r.pick(others); const X = ps[j];
  const L = (a) => a.filter((v) => !v).length;
  const forms = [
    { t: X + ' is a truth-teller.', f: (a) => a[j] },
    { t: X + ' is a liar.', f: (a) => !a[j] },
    { t: X + ' and I are the same type.', f: (a) => a[j] === a[i] },
    { t: X + ' and I are different types.', f: (a) => a[j] !== a[i] },
  ];
  if (n === 2) forms.push({ t: 'We are both liars.', f: (a) => L(a) === 2 }, { t: 'At least one of us is a liar.', f: (a) => L(a) >= 1 }, { t: 'We are both truth-tellers.', f: (a) => L(a) === 0 });
  if (n === 3) {
    const k = r.pick(others.filter((x) => x !== j)); const Y = ps[k];
    forms.push({ t: 'All three of us are liars.', f: (a) => L(a) === 3 }, { t: 'Exactly one of us is a liar.', f: (a) => L(a) === 1 }, { t: 'At least one of us is a liar.', f: (a) => L(a) >= 1 },
      { t: X + ' and ' + Y + ' are both liars.', f: (a) => !a[j] && !a[k] }, { t: X + ' and ' + Y + ' are both truth-tellers.', f: (a) => a[j] && a[k] }, { t: 'At least one of ' + X + ' and ' + Y + ' is a liar.', f: (a) => !a[j] || !a[k] });
  }
  return r.pick(forms);
}
function puzzle(r, n, accept) {
  const ps = people(r, n);
  for (let tries = 0; tries < 600; tries++) {
    const st = ps.map((_, i) => statement(r, ps, i, n));
    const v = valid(n, st);
    if (v.length === 1 && (!accept || accept(v[0], st))) return { ps, st, sol: v[0], text: st.map((s, i) => ps[i] + ' says: "' + s.t + '"').join(' ') };
  }
  throw new Error('no puzzle');
}
const kind = (b) => (b ? 'a truth-teller' : 'a liar');

export default lesson({
  id: 'm4-6-4-truth-tellers-and-liars',
  title: 'Truth-tellers and liars',
  blurb: 'Some people always tell the truth and some always lie. Use what they say, and contradictions, to find out who is who.',
  concepts: ['truth-tellers-and-liars', 'contradiction', 'deduction'],

  tryFirst: [
    mc('t1', 'On an island, each person is a truth-teller (always tells the truth) or a liar (always lies). Ben says: "I am a truth-teller." What can you tell?', ['Ben is a truth-teller.', 'Ben is a liar.', 'We cannot tell which one Ben is.'], 2, {
      h: ['Suppose Ben is a truth-teller. Is his sentence true? Is it all right?', 'Now suppose Ben is a liar. Would he say that sentence?'],
      s: 'A truth-teller would say it, and it would be true. A liar would also say it, because it is a lie for him. Both are possible, so nothing is decided.',
      w: [[0, 'A liar would say this too. For a liar, the sentence is false, and liars say false things.'], [1, 'A truth-teller could say this too. For him the sentence is true.']],
    }),
    mc('t2', 'Each person is a truth-teller or a liar. Ava says: "We are both liars." Ben is the other person. What is Ben?', ['Ben is a truth-teller.', 'Ben is a liar.', 'We cannot tell what Ben is.'], 0, {
      h: ['Could Ava be a truth-teller? Then her sentence would be true.', 'So what must Ava be? Then what does her false sentence tell you about Ben?'],
      s: 'If Ava were a truth-teller, "we are both liars" would be true, so Ava would be a liar. That cannot be. So Ava is a liar. Her sentence is false, so they are not both liars. Ava is a liar, so Ben must not be one. Ben is a truth-teller.',
      w: [[1, 'If Ben were a liar, then "we are both liars" would be true. But Ava would be saying something true, and she is a liar.'], [2, 'Try the case where Ava is a truth-teller. It breaks down. That leaves only one case.']],
    }),
  ],

  learn: [
    p(IS + ' You cannot see which is which. You only hear what they say.'),
    def('truth-teller', 'A person who always tells the truth. Every sentence a truth-teller says is true.'),
    def('liar', 'A person who always lies. Every sentence a liar says is false. A liar does not mix true and false: the whole sentence is false.'),
    rule('<b>The two rules.</b> Everything a truth-teller says is true. Everything a liar says is false. A statement from a liar must be completely false.'),
    ex('Test one case', ['Eli says: "Dee is a truth-teller and I am a liar."', 'Suppose Eli is a truth-teller. Then his sentence is true, so Eli is a liar. That cannot be: a contradiction.', 'So Eli is a liar. His sentence is false. The part "I am a liar" is true, so the other part must be false.', 'So Dee is not a truth-teller. Dee is a liar.']),
    def('contradiction', 'Two things that cannot both be true at once, such as "Ben is a truth-teller" and "Ben is a liar".'),
    rule('<b>Contradiction.</b> Suppose something is true and follow it. If you reach something impossible, a contradiction, the thing you supposed was false. Then the other case must be true.'),
    p('Use a grid to keep track. One row for each person. Mark ✓ in "truth-teller" or in "liar". Several people can share a column, so each row has exactly one ✓.'),
    widget('logicGrid', { rows: ['Ava', 'Ben'], cols: ['truth-teller', 'liar'], partial: true }),
    tip('Start with a person and try "truth-teller". Follow what that forces. If you reach a contradiction, that person is a liar. If not, also try "liar", since a puzzle can only be trusted if you test both.'),
    key('To use a statement: if the speaker is a truth-teller, the statement is true. If the speaker is a liar, the <b>opposite</b> of the statement is true. Always turn the statement into a fact about the people.'),
    warn('<b>Careful with "both".</b> The opposite of "we are both liars" is not "we are both truth-tellers". It is "at least one of us is a truth-teller". A liar who says "Ben and I are both truth-tellers" tells you only that the two of them are not both truth-tellers.'),
    ex('A chain of statements', ['Dee: "Eli is a liar." Eli: "Fay is a truth-teller." Fay: "Dee and Eli are both liars."', 'Suppose Dee is a liar. Her sentence is false, so Eli is a truth-teller. Then Eli\'s sentence is true, so Fay is a truth-teller. Then Fay\'s sentence is true, so Dee and Eli are both liars. But Eli is a truth-teller. That is a contradiction.', 'So Dee is a truth-teller. Her sentence is true, so Eli is a liar.', 'Eli is a liar, so his sentence is false, and Fay is not a truth-teller. Fay is a liar. Check Fay: her sentence says Dee and Eli are both liars. That is false, since Dee is a truth-teller, and a liar must say something false.', 'Dee is a truth-teller, Eli is a liar, Fay is a liar. Always finish by checking every statement.']),
    mcq('Maya says: "A liar said \'Ben and I are both truth-tellers.\' So Ben is a liar." What is wrong?', ['Nothing is wrong.', 'The liar\'s sentence is false whatever Ben is, because the liar himself is not a truth-teller. Ben could be either.', 'Liars do not talk about other people.'], 1, 'The sentence needs both people to be truth-tellers. The speaker is a liar, so the sentence is already false. Ben may be a truth-teller or a liar. Nothing more can be told.', 'Spot the mistake'),
    recap([['truth-teller', 'always tells the truth'], ['liar', 'always lies; every sentence is false'], ['contradiction', 'two things that cannot both be true'], ['case test', 'suppose one case, follow it, and look for a contradiction']], []),
  ],

  practice: [
    mc('p1', 'Ava says: "Ben is a liar." Ben says: "Ava is a liar." Each person is a truth-teller or a liar. Which is true?', ['Both are truth-tellers.', 'Both are liars.', 'Exactly one of them is a liar, but we cannot tell which.', 'Ava is the liar.'], 2, {
      h: ['Try Ava as a truth-teller. Then what are Ben and his sentence?', 'Try Ava as a liar.'],
      s: 'If Ava is a truth-teller, Ben is a liar and his sentence is false: Ava is not a liar. That works. If Ava is a liar, Ben is a truth-teller, and his sentence is true: Ava is a liar. That works too. Either way exactly one is a liar.',
      w: [[0, 'If both were truth-tellers, Ava\'s sentence "Ben is a liar" would be false.'], [1, 'If both were liars, Ava\'s sentence "Ben is a liar" would be true.'], [3, 'It could also be Ben. Both cases work.']],
    }),
    text('p2', 'Each person is a truth-teller or a liar. Ava says: "At least one of us two is a liar." Who is the liar?', ['Ben'], {
      h: ['Suppose Ava is a liar. Is her sentence true or false?', 'So Ava is a truth-teller. What does her sentence say about Ben?'],
      s: 'If Ava were a liar, her sentence would be false, so nobody would be a liar. That contradicts Ava being a liar. So Ava is a truth-teller. Her sentence is true, so one of them is a liar. It is Ben.',
      w: [['Ava', 'Check her sentence. A liar could not say "at least one of us is a liar", because that would then be true.']],
    }),
    num('p3', 'Ava says: "Ben is a liar." Ben says: "Cy is a liar." Cy says: "Ava and Ben are both liars." How many of the three are liars?', 2, {
      h: ['Try Ben as a truth-teller. What does that make Cy and Ava?', 'Then check Cy\'s sentence.'],
      s: 'If Ben is a truth-teller, then Cy is a liar, and Ava is not a truth-teller (she says Ben is a liar), so Ava is a liar. Cy says "Ava and Ben are both liars". That is false because Ben is a truth-teller. A liar says it, so it works. If Ben were a liar, Ava would be a truth-teller and Cy would be a truth-teller, but Cy\'s sentence is false. So Ben is a truth-teller, and Ava and Cy are liars: 2.',
      w: [['1', 'Check again. Ava and Cy are both liars.'], ['3', 'Ben is a truth-teller. If Ben were a liar, Cy\'s sentence would have to be true.']],
    }),
    num('p4', 'Four people speak. Ava says: "Exactly 1 of us four is a liar." Ben says: "Exactly 2 of us four are liars." Cy says: "Exactly 3 of us four are liars." Dee says: "All 4 of us are liars." How many of the four are liars?', 3, {
      h: ['Can two of the sentences be true at the same time?', 'Could all four be liars? Check Dee\'s sentence.'],
      s: 'The four sentences disagree with each other, so at most one is true. If none were true, all four would be liars, and Dee\'s sentence would be true. So exactly one is true, and the other three speakers are liars. That is exactly 3 liars, and Cy\'s sentence is the true one.',
      w: [['4', 'If all four were liars, Dee\'s sentence "all 4 of us are liars" would be true, but she would be lying.'], ['1', 'If only one person were a liar, three would be truth-tellers. But at most one sentence can be true.']],
    }),
    text('p5', 'Ava says: "Ben is a liar." Ben says: "Cy and I are the same type." Cy says: "Ava is a liar." Each person is a truth-teller or a liar. Who is the liar?', ['Ava'], {
      h: ['Look at Ben. If Ben is a truth-teller, Cy is too. If Ben is a liar, what is Cy?', 'So what is Cy in both cases?'],
      s: 'If Ben is a truth-teller, Cy is the same type, a truth-teller. If Ben is a liar, Cy and Ben are different types, so Cy is a truth-teller. Either way Cy is a truth-teller. Cy says Ava is a liar, so Ava is a liar. Then Ava\'s sentence is false, so Ben is a truth-teller.',
      w: [['Ben', 'Ben is a truth-teller. Ava\'s sentence "Ben is a liar" is false, and she is the liar.'], ['Cy', 'Cy is a truth-teller in both cases.']],
    }),
    num('p6', 'Six people sit around a round table. Each person says: "The person on my left is a liar." Each is a truth-teller or a liar. How many of them are liars?', 3, {
      h: ['Start with one truth-teller. What is the person on his left? And the next one?', 'What happens after six steps around the table?'],
      s: 'A truth-teller says the left neighbor is a liar, so that neighbor is a liar. The liar\'s sentence is false, so his left neighbor is a truth-teller. The types alternate around the table: truth-teller, liar, truth-teller, liar, truth-teller, liar. Six is even, so it fits. 3 liars.',
      w: [['6', 'Not all can be liars: a liar says "the person on my left is a liar", which would then be true.'], ['0', 'If everyone told the truth, the sentences would all say that everyone is a liar.']],
    }),
    num('p7', 'Ava says: "Ben is a truth-teller." Ben says: "Ava is a truth-teller." Each is a truth-teller or a liar. In how many different ways can the two types be?', 2, {
      h: ['There are 4 ways to pick the two types. Test each one.', 'If Ava is a truth-teller, what is Ben?'],
      s: 'Both truth-tellers: each sentence is true. That works. Both liars: each sentence is false. That works. Ava a truth-teller and Ben a liar: Ava says "Ben is a truth-teller", which is false. That fails. The last way fails too. So 2 ways.',
      w: [['1', 'Both truth-tellers works. Check whether both liars works too.'], ['4', 'Test each of the four ways. Two of them break a sentence.']],
    }),
  ],

  challenge: [
    chain('Three statements', 'Each person is a truth-teller or a liar. Ava says: "Ben is a liar." Ben says: "Cy is a liar." Cy says: "Ava and I are the same type."', [
      text('c1a', 'Suppose Cy is a liar. Then Ava and Cy are different types. Is Ava a truth-teller? Answer yes or no.', ['yes'], { h: ['Cy is a liar, and Ava is of the other type.'], s: 'Different types from a liar means Ava is a truth-teller. Answer: yes.' }),
      text('c1b', 'Suppose Cy is a truth-teller. Then Ava and Cy are the same type. Is Ava a truth-teller? Answer yes or no.', ['yes'], { h: ['Cy is a truth-teller, and Ava is the same type.'], s: 'Same type as a truth-teller is a truth-teller. Answer: yes.' }),
      num('c1c', 'So Ava is a truth-teller in every case. How many liars are there among the three?', 1, { h: ['Ava is a truth-teller, so her sentence is true. What is Ben? Then Ben\'s sentence is false.'], s: 'Ava\'s sentence is true, so Ben is a liar. Ben\'s sentence "Cy is a liar" is false, so Cy is a truth-teller. Ava and Cy are truth-tellers and Ben is the only liar: 1.' }),
    ], 'The idea: when you cannot decide about one person, try both cases. If both cases agree about someone else, you have learned something.'),
    chain('Five people', 'Five people speak. The first says: "Exactly 1 of us five is a liar." The second says: "Exactly 2 of us are liars." The third says "Exactly 3", the fourth says "Exactly 4", the fifth says "Exactly 5."', [
      text('c2a', 'Can two of the five sentences both be true? Answer yes or no.', ['no'], { h: ['Exactly 1 and exactly 2 cannot be the number of liars at once.'], s: 'The number of liars is one number. Two different sentences cannot both be true. Answer: no.' }),
      text('c2b', 'Can all five of the speakers be liars? Answer yes or no.', ['no'], { h: ['If all five are liars, what is the number of liars? Whose sentence is then true?'], s: 'If all five are liars, the fifth sentence "exactly 5 are liars" is true. But the fifth speaker would then be telling the truth. Answer: no.' }),
      num('c2c', 'How many of the five are liars?', 4, { h: ['At most one sentence is true, and at least one is true. So how many truth-tellers?'], s: 'At most one is a truth-teller and not all are liars, so there is exactly one truth-teller and 4 liars. The fourth speaker, who says "exactly 4", is the truth-teller.' }),
    ], 'The idea: when the sentences clash, only one can be true. Count how many speakers that leaves.'),
    mc('c3', 'Find the error. Hiro says: "A person says \'Ben and I are both truth-tellers\' and is a liar. A liar says false things, so the opposite is true: Ben and the speaker are both liars." Which reply is correct?', ['Hiro is right.', 'The opposite of "both are truth-tellers" is "at least one is a liar". We already know the speaker is a liar, so Ben can be either.', 'Liars can say true things when they talk about others.', 'The speaker must be a truth-teller.'], 1, {
      s: 'Not both are truth-tellers is all we learn. The speaker is a liar, so that is already true. Nothing is learned about Ben.',
      w: [[0, 'Hiro changed "both truth-tellers" into "both liars". The opposite is only "not both truth-tellers".'], [2, 'By the rules, a liar never says anything true.']],
    }),
  ],

  quiz: [
    tpl('two', (r) => {
      const g = puzzle(r, 2); const [A, B] = g.ps; const combo = (a) => A + ' is ' + kind(a[0]) + ' and ' + B + ' is ' + kind(a[1]);
      const wrongs = [[true, true], [true, false], [false, true], [false, false]].filter((c) => c[0] !== g.sol[0] || c[1] !== g.sol[1]).map((c) => [combo(c), 'Test this case. One of the sentences comes out wrong.']);
      return choice(r, IS + ' ' + g.text + ' Which is true?', combo(g.sol), wrongs, { s: 'Test the four cases. Only one agrees with every sentence: ' + combo(g.sol) + '.' });
    }),
    tpl('threeCount', (r) => {
      const g = puzzle(r, 3); const k = g.sol.filter((v) => !v).length;
      return N(IS + ' ' + g.text + ' How many of the three are liars?', k, { s: 'Try each possibility for the types. Only one agrees with all three sentences: ' + g.ps.map((x, i) => x + ' is ' + kind(g.sol[i])).join(', ') + '. So there ' + (k === 1 ? 'is 1 liar' : 'are ' + k + ' liars') + '.' });
    }),
    tpl('threeWho', (r) => {
      const g = puzzle(r, 3); const i = r.int(0, 2); const X = g.ps[i];
      return choice(r, IS + ' ' + g.text + ' What is ' + X + '?', X + ' is ' + kind(g.sol[i]) + '.', [[X + ' is ' + kind(!g.sol[i]) + '.', 'Test that case. Some sentence comes out wrong.'], ['We cannot tell.', 'There is only one way the types can fit the sentences.']], { s: 'Try each possibility for the types. Only one agrees with all three sentences: ' + g.ps.map((x, j) => x + ' is ' + kind(g.sol[j])).join(', ') + '.' });
    }),
    tpl('circle', (r) => {
      const n = r.int(4, 7); const ps = people(r, n); const claims = []; for (let i = 0; i < n; i++) claims.push(r.bool(0.65) ? 'liar' : 'truth-teller');
      let ways = 0;
      for (let m = 0; m < (1 << n); m++) { const a = []; for (let i = 0; i < n; i++) a.push(!!(m & (1 << i))); if (a.every((v, i) => v === (claims[i] === 'liar' ? !a[(i + 1) % n] : a[(i + 1) % n]))) ways++; }
      return N(IS + ' ' + list(ps) + ' sit around a round table in this order, so ' + ps[n - 1] + ' sits next to ' + ps[0] + '. Each person speaks about the next person in the list, and the last speaks about the first. ' + ps.map((x, i) => x + ' says: "' + ps[(i + 1) % n] + ' is ' + (claims[i] === 'liar' ? 'a liar' : 'a truth-teller') + '."').join(' ') + ' In how many different ways can the types fit the sentences?', ways, { s: 'Pick the type of ' + ps[0] + ' and follow the sentences around the table. A truth-teller says what is so, and a liar says the opposite. Then check that the last sentence fits ' + ps[0] + '. Counting the successful starts gives ' + ways + '.' });
    }),
    tpl('exactly', (r) => {
      for (let tries = 0; tries < 300; tries++) {
        const n = r.int(4, 6); const ks = []; for (let i = 0; i < n; i++) ks.push(r.int(1, n)); const ps = people(r, n);
        const st = ks.map((k) => ({ f: (a) => a.filter((v) => !v).length === k }));
        const v = valid(n, st); if (v.length === 0) continue; const counts = new Set(v.map((a) => a.filter((x) => !x).length)); if (counts.size !== 1) continue;
        const L = [...counts][0];
        return N(IS + ' There are ' + n + ' people. ' + ps.map((x, i) => x + ' says: "Exactly ' + ks[i] + ' of us ' + (ks[i] === 1 ? 'is a liar' : 'are liars') + '."').join(' ') + ' How many of the ' + n + ' people are liars?', L, { s: 'If some number of the ' + n + ' people are liars, the truth-tellers are exactly the people who said "Exactly" that number. Try each number. Only ' + L + (L === 1 ? ' liar' : ' liars') + ' fits: ' + ks.filter((k) => k === L).length + ' ' + (ks.filter((k) => k === L).length === 1 ? 'person said' : 'people said') + ' "Exactly ' + L + '", and ' + n + ' − ' + L + ' = ' + (n - L) + '.' });
      }
      throw new Error('no exactly puzzle');
    }),
    tpl('negate', (r) => {
      const [A, B, C] = people(r, 3); const f = r.int(0, 3);
      const opts = ['both ' + B + ' and ' + C + ' are truth-tellers', 'both ' + B + ' and ' + C + ' are liars', 'at least one of ' + B + ' and ' + C + ' is a liar', 'at least one of ' + B + ' and ' + C + ' is a truth-teller'];
      const says = [B + ' and ' + C + ' are both truth-tellers', B + ' and ' + C + ' are both liars', 'at least one of ' + B + ' and ' + C + ' is a liar', B + ' or ' + C + ' (or both) is a truth-teller'];
      const rightIdx = [2, 3, 0, 1][f];
      const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1) + '.';
      return choice(r, A + ' is a liar. ' + A + ' says: "' + cap(says[f]) + '" Which must be true?', cap(opts[rightIdx]), opts.map((o, i) => [cap(o), 'Check the opposite of what ' + A + ' said. A liar\'s sentence is false.']).filter((_, i) => i !== rightIdx && !(f === 2 && i === 3) && !(f === 3 && i === 2)), { s: 'The sentence is false. What is the opposite of "' + says[f] + '"? It is: ' + opts[rightIdx] + '.' });
    }),
  ],
});
