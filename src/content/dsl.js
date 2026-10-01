// Authoring helpers. A lesson file is a plain object built from these.
//
//   Problems:  num / expr / text / ratio / set / mc   (id, question, answer, options)
//   options:   h: hints[]   w: [[wrongAnswer, message], ...]   s: solution   (plus unit, mixed, simplify, tag)
//   Blocks:    p / rule / warn / ex / tbl / widget / mcq
//   Challenge: chain(title, intro, parts[], close)
//   Quiz:      tpl(id, rng => problem)   at least 6 per lesson. Use N()/E()/... inside to build the problem.
export * from '../engine/rational.js';
export { M } from '../engine/format.js';

const fin = (type, id, q, ans, o = {}) => {
  const { h, w, s, ...rest } = o;
  return { id, type, q, ans, hints: h || [], wrong: w || [], sol: s || '', ...rest };
};
export const num = (id, q, ans, o) => fin('num', id, q, String(ans), o);
export const expr = (id, q, ans, o) => fin('expr', id, q, String(ans), o);
export const text = (id, q, ans, o) => fin('text', id, q, ans, o);
export const ratio = (id, q, ans, o) => fin('ratio', id, q, String(ans), o);
export const set = (id, q, ans, o) => fin('set', id, q, String(ans), o);
/** opts: choice texts. ok: index of the right one. w: [[index, message], ...] */
export const mc = (id, q, opts, ok, o = {}) => ({ ...fin('mc', id, q, undefined, o), opts, ok });

// Inside generators there is no fixed id. The template id is used.
export const N = (q, ans, o) => num(null, q, ans, o);
export const E = (q, ans, o) => expr(null, q, ans, o);
export const T = (q, ans, o) => text(null, q, ans, o);
export const RT = (q, ans, o) => ratio(null, q, ans, o);
export const S = (q, ans, o) => set(null, q, ans, o);

/**
 * A multiple-choice question for a generator. The right answer and the wrong ones are shuffled
 * with the generator's own rng, so the same seed always gives the same order.
 * wrongs: [text] or [[text, message]]
 */
export function choice(rng, q, right, wrongs, o = {}) {
  const items = [[right, null, true], ...wrongs.map((w) => (Array.isArray(w) ? [w[0], w[1], false] : [w, null, false]))];
  const order = rng.shuffle(items);
  const ok = order.findIndex((x) => x[2]);
  const wrong = [];
  order.forEach((x, i) => { if (!x[2] && x[1]) wrong.push([i, x[1]]); });
  const { h, s, ...rest } = o;
  return { type: 'mc', q, opts: order.map((x) => x[0]), ok, wrong, hints: h || [], sol: s || '', ...rest };
}

export const tpl = (id, make, meta = {}) => ({ id, make, ...meta });

export const p = (html) => ({ t: 'p', html });
export const rule = (html) => ({ t: 'rule', html });
export const warn = (html) => ({ t: 'warn', html });
/** worked example: a title and an ordered list of steps */
export const ex = (title, steps) => ({ t: 'ex', title, steps });
/** table: head is an array of column titles, rows is an array of arrays (markup allowed) */
export const tbl = (head, rows, cap) => ({ t: 'tbl', head, rows, cap });
export const widget = (kind, opts = {}) => ({ t: 'widget', kind, opts });
export const mcq = (q, opts, ok, why, label) => ({ t: 'mc', kind: 'mc', q, opts, ok, why, label });
export const chain = (title, intro, parts, close) => ({ kind: 'chain', title, intro, parts, close });

export const lesson = (def) => ({ concepts: [], tryFirst: [], learn: [], practice: [], challenge: [], quiz: [], ...def });
export const chapter = (def) => def;

// ---- small helpers used by many generators ----
export const NAMES = ['Ava', 'Ben', 'Chloe', 'Dev', 'Elena', 'Farid', 'Grace', 'Hiro', 'Isla', 'Jonas', 'Kira', 'Leo', 'Maya', 'Nico', 'Omar', 'Priya', 'Quinn', 'Rosa', 'Sam', 'Tara'];
export const name = (rng) => rng.pick(NAMES);
export const twoNames = (rng) => { const [a, b] = rng.distinct(2, 0, NAMES.length - 1); return [NAMES[a], NAMES[b]]; };
export const money = (n) => '$' + n;
