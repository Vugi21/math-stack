import { parseNum, isUnreduced } from './parse.js';
import { eq, mul, fmt, gcd } from './rational.js';
import { compileExpr, exprEquiv } from './expr.js';

/**
 * Problem types
 *   num    exact number. ans: "3/4"
 *   expr   algebra expression. ans: "7x+2". Add simplify:true to require a collapsed answer
 *   text   short words. ans: ["no solution","none"]
 *   ratio  ans: "3:4" (equivalent ratios accepted)
 *   set    ans: "2,3,5" (any order)
 *   mc     opts: [...], ok: index
 * wrong: [[answer, message], ...] gives a targeted message for a known mistake.
 */
export const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9/:.\-\s]/g, ' ').replace(/\.(?!\d)/g, ' ').replace(/\b(the|a|an|is|are)\b/g, ' ').replace(/\s+/g, ' ').trim();

function parseRatio(s) {
  const parts = String(s).trim().replace(/\s+to\s+/gi, ':').split(':');
  if (parts.length < 2) return null;
  const nums = parts.map((x) => parseNum(x.trim()));
  return nums.some((x) => !x) ? null : nums;
}
/** two ratios are equal when a_i * b_0 = b_i * a_0 for every position i */
function ratioEq(a, b) {
  if (a.length !== b.length || !a[0].n || !b[0].n) return false;
  return a.every((x, i) => eq(mul(x, b[0]), mul(b[i], a[0])));
}
function parseSet(s) {
  const parts = String(s).split(/[,;\s]+|\band\b/i).map((x) => x.trim()).filter(Boolean);
  if (!parts.length) return null;
  const nums = parts.map(parseNum);
  return nums.some((x) => !x) ? null : nums;
}
const setKey = (arr) => arr.map(fmt).sort().join('|');

export function judge(p, input) {
  const type = p.type || 'num';

  if (type === 'mc') {
    if (input === null || input === undefined || input === '') return { status: 'empty' };
    const idx = Number(input);
    if (idx === p.ok) return { status: 'ok' };
    const w = (p.wrong || []).find((x) => Number(x[0]) === idx);
    return w ? { status: 'near', msg: w[1], wrongIdx: (p.wrong || []).indexOf(w) } : { status: 'no' };
  }

  const raw = String(input ?? '').trim();
  if (!raw) return { status: 'empty' };

  if (type === 'num') {
    const v = parseNum(raw);
    if (!v) return { status: 'bad' };
    const A = parseNum(String(p.ans));
    if (!A) throw new Error('Problem has an unparseable answer: ' + p.ans);
    if (eq(v, A)) {
      const tip = isUnreduced(raw) ? raw.replace(/\s+/g, '') + ' is right. It simplifies to ' + fmt(A) + '.' : null;
      return { status: 'ok', tip };
    }
    const list = p.wrong || [];
    for (let i = 0; i < list.length; i++) {
      const W = parseNum(String(list[i][0]));
      if (W && eq(v, W)) return { status: 'near', msg: list[i][1], wrongIdx: i };
    }
    return { status: 'no' };
  }

  if (type === 'expr') {
    let mine;
    try { mine = compileExpr(raw); } catch { return { status: 'bad' }; }
    const A = compileExpr(String(p.ans));
    if (exprEquiv(mine, A)) {
      if (p.simplify && mine.ops > A.ops) return { status: 'near', msg: 'That is equal, but it is not simplified yet. Combine like terms.', wrongIdx: -1, partial: true };
      return { status: 'ok' };
    }
    const list = p.wrong || [];
    for (let i = 0; i < list.length; i++) {
      try { if (exprEquiv(mine, String(list[i][0]))) return { status: 'near', msg: list[i][1], wrongIdx: i }; } catch { /* skip bad key */ }
    }
    return { status: 'no' };
  }

  if (type === 'text') {
    const accepted = (Array.isArray(p.ans) ? p.ans : [p.ans]).map(norm);
    if (accepted.includes(norm(raw))) return { status: 'ok' };
    const list = p.wrong || [];
    for (let i = 0; i < list.length; i++) if (norm(list[i][0]) === norm(raw)) return { status: 'near', msg: list[i][1], wrongIdx: i };
    return { status: 'no' };
  }

  if (type === 'ratio') {
    const mine = parseRatio(raw);
    if (!mine) return { status: 'bad' };
    const A = parseRatio(p.ans);
    if (ratioEq(mine, A)) {
      const ints = mine.every((x) => x.d === 1);
      const g = ints ? mine.reduce((a, x) => gcd(a, x.n), 0) : 1;
      return { status: 'ok', tip: ints && g > 1 ? 'Right. In lowest terms it is ' + A.map(fmt).join(':') + '.' : null };
    }
    const list = p.wrong || [];
    for (let i = 0; i < list.length; i++) { const W = parseRatio(list[i][0]); if (W && ratioEq(mine, W)) return { status: 'near', msg: list[i][1], wrongIdx: i }; }
    return { status: 'no' };
  }

  if (type === 'set') {
    const mine = parseSet(raw);
    if (!mine) return { status: 'bad' };
    const A = parseSet(p.ans);
    if (setKey(mine) === setKey(A)) return { status: 'ok' };
    const list = p.wrong || [];
    for (let i = 0; i < list.length; i++) { const W = parseSet(list[i][0]); if (W && setKey(mine) === setKey(W)) return { status: 'near', msg: list[i][1], wrongIdx: i }; }
    return { status: 'no' };
  }

  throw new Error('Unknown problem type ' + type);
}

export const BAD_INPUT_HELP = {
  num: 'Type a number: a whole number, a fraction like 3/4, a mixed number like 2 3/4, or an exact decimal.',
  expr: 'Type an expression such as 3x + 2. Use * or just write 3x for multiplication, and ^ for powers.',
  ratio: 'Type a ratio like 3:4.',
  set: 'Type the numbers separated by commas, like 2, 3, 5.',
  text: 'Type a short answer.',
};
