import { describe, it, expect } from 'vitest';
import { parseNum, isUnreduced } from '../src/engine/parse.js';
import { exprEquiv, compileExpr } from '../src/engine/expr.js';
import { judge } from '../src/engine/judge.js';
import { R, fmt, fm, fmMixed } from '../src/engine/rational.js';
import { makeRng } from '../src/engine/rng.js';
import { instantiate, freshSeed, buildDraft } from '../src/engine/select.js';
import { schedule, DAY, streak, dayKey } from '../src/engine/review.js';
import { M, plain } from '../src/engine/format.js';

const v = (s) => { const r = parseNum(s); return r ? fmt(r) : null; };

describe('parseNum', () => {
  it('reads the forms a student would type', () => {
    expect(v('3/4')).toBe('3/4');
    expect(v(' 6 / 8 ')).toBe('3/4');
    expect(v('2 3/4')).toBe('11/4');
    expect(v('-2 3/4')).toBe('-11/4');
    expect(v('0.75')).toBe('3/4');
    expect(v('.5')).toBe('1/2');
    expect(v('1,000')).toBe('1000');
    expect(v('$5')).toBe('5');
    expect(v('25%')).toBe('25');
    expect(v('90°')).toBe('90');
    expect(v('x = 5')).toBe('5');
    expect(v('12 cm')).toBe('12');
    expect(v('9 square units')).toBe('9');
    expect(v('20 m^2')).toBe('20');
    expect(v('−7')).toBe('-7');
  });
  it('rejects things that are not plain numbers', () => {
    for (const bad of ['abc', '3/0', '', '1/', '1 2', '--3', '2x', '3//4', '1.2.3']) expect(parseNum(bad)).toBeNull();
  });
  it('does not accept long rounded decimals as exact', () => {
    expect(eqStr(parseNum('0.333'), '1/3')).toBe(false);
  });
  it('flags unreduced fractions', () => { expect(isUnreduced('6/8')).toBe(true); expect(isUnreduced('3/4')).toBe(false); expect(isUnreduced('4/1')).toBe(false); });
});
const eqStr = (r, s) => r && fmt(r) === s;

describe('expressions', () => {
  it('treats equal expressions as equal', () => {
    expect(exprEquiv('3x+4x', '7x')).toBe(true);
    expect(exprEquiv('2(x+3)', '2x+6')).toBe(true);
    expect(exprEquiv('(x+1)(x-1)', 'x^2-1')).toBe(true);
    expect(exprEquiv('x/2+x/2', 'x')).toBe(true);
    expect(exprEquiv('sqrt(50)', '5sqrt(2)')).toBe(true);
    expect(exprEquiv('2xy', 'y*x*2')).toBe(true);
  });
  it('separates different expressions', () => {
    expect(exprEquiv('3x+4', '7x')).toBe(false);
    expect(exprEquiv('x^2', '2x')).toBe(false);
    expect(exprEquiv('x+1', 'x+2')).toBe(false);
  });
  it('rejects malformed input safely', () => {
    for (const bad of ['2 3', '(x', 'x +', '3 $ 4', 'alert(1)']) {
      let threw = false; try { compileExpr(bad); } catch { threw = true; }
      if (bad !== 'alert(1)') expect(threw).toBe(true);
    }
  });
});

describe('judge', () => {
  const p = { type: 'num', ans: '3/4', wrong: [['4/3', 'flipped']] };
  it('num: ok, unreduced tip, near, no, bad, empty', () => {
    expect(judge(p, '3/4').status).toBe('ok');
    const j = judge(p, '6/8'); expect(j.status).toBe('ok'); expect(j.tip).toMatch(/simplifies to 3\/4/);
    expect(judge(p, '0.75').status).toBe('ok');
    expect(judge(p, '4/3')).toMatchObject({ status: 'near', msg: 'flipped' });
    expect(judge(p, '1/2').status).toBe('no');
    expect(judge(p, 'abc').status).toBe('bad');
    expect(judge(p, '  ').status).toBe('empty');
  });
  it('expr with simplify', () => {
    const e = { type: 'expr', ans: '7x', simplify: true };
    expect(judge(e, '7x').status).toBe('ok');
    expect(judge(e, '3x+4x').status).toBe('near');
    expect(judge(e, '8x').status).toBe('no');
  });
  it('text, ratio, set, mc', () => {
    expect(judge({ type: 'text', ans: ['no solution', 'none'] }, 'No solution.').status).toBe('ok');
    expect(judge({ type: 'text', ans: ['no solution', 'none'] }, 'NONE').status).toBe('ok');
    expect(judge({ type: 'ratio', ans: '3:4' }, '6:8').status).toBe('ok');
    expect(judge({ type: 'ratio', ans: '3:4' }, '3 to 4').status).toBe('ok');
    expect(judge({ type: 'ratio', ans: '3:4' }, '4:3').status).toBe('no');
    expect(judge({ type: 'ratio', ans: '2:3:5' }, '4:6:10').status).toBe('ok');
    expect(judge({ type: 'set', ans: '2,3,5' }, '5, 3 and 2').status).toBe('ok');
    expect(judge({ type: 'set', ans: '2,3,5' }, '2,3').status).toBe('no');
    const mc = { type: 'mc', opts: ['a', 'b', 'c'], ok: 1, wrong: [[2, 'not c']] };
    expect(judge(mc, 1).status).toBe('ok');
    expect(judge(mc, 2)).toMatchObject({ status: 'near', msg: 'not c' });
    expect(judge(mc, 0).status).toBe('no');
  });
});

describe('formatting', () => {
  it('rational formatting', () => {
    expect(fm(R(-3, 4))).toBe('−{3/4}');
    expect(fmMixed(R(11, 4))).toBe('2 {3/4}');
    expect(fm(R(6, 3))).toBe('2');
  });
  it('markup', () => {
    expect(M('{1/2}')).toContain('class="fr"');
    expect(M('x^[2]')).toBe('x<sup>2</sup>');
    expect(M('sqrt[50]')).toContain('class="rad"');
    expect(plain('{1/2} + x^[2]')).toBe('(1/2) + x^2');
  });
});

describe('seeded generators never repeat', () => {
  const tpl = { id: 't', make: (rng) => ({ q: 'What is ' + rng.int(1, 40) + ' + ' + rng.int(1, 40) + '?', ans: '1' }) };
  it('same seed gives the same problem', () => {
    expect(instantiate('L', tpl, 7).key).toBe(instantiate('L', tpl, 7).key);
    expect(instantiate('L', tpl, 7).q).toBe(instantiate('L', tpl, 7).q);
  });
  it('fresh seeds avoid everything already seen', () => {
    const seen = {}; const rng = makeRng(42);
    for (let i = 0; i < 300; i++) {
      const seed = freshSeed('L', tpl, seen, rng);
      const k = instantiate('L', tpl, seed).key;
      expect(seen[k]).toBeUndefined();
      seen[k] = 1;
    }
  });
});

describe('quiz drafts', () => {
  const mk = (id) => ({ id, make: (rng) => ({ q: id + ' ' + rng.int(1, 1e6), ans: '1' }) });
  const entries = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((id) => ({ lessonId: 'L', tpl: mk(id) }));
  const base = () => ({ seen: {}, used: {}, missed: {}, fixed: {} });
  it('uses distinct templates and rotates the least recently used', () => {
    const st = base(); const rng = makeRng(1);
    const d1 = buildDraft(entries, 5, st, rng);
    expect(new Set(d1.map((x) => x.tid)).size).toBe(5);
    d1.forEach((x) => { st.used['L/' + x.tid] = Date.now(); });
    const d2 = buildDraft(entries, 5, st, rng);
    const unusedFirst = entries.map((e) => e.tpl.id).filter((id) => !d1.some((x) => x.tid === id));
    unusedFirst.forEach((id) => expect(d2.some((x) => x.tid === id)).toBe(true));
  });
  it('brings back a missed template first', () => {
    const st = base(); st.used['L/a'] = 0;
    entries.forEach((e) => { st.used['L/' + e.tpl.id] = 5; });
    st.missed['L/h'] = 10;
    const d = buildDraft(entries, 3, st, makeRng(3));
    expect(d.some((x) => x.tid === 'h')).toBe(true);
  });
  it('caps items per lesson for chapter tests', () => {
    const mixed = [...entries, ...entries.map((e) => ({ lessonId: 'M', tpl: e.tpl }))];
    const d = buildDraft(mixed, 6, base(), makeRng(5), 3);
    expect(d.filter((x) => x.lid === 'L').length).toBeLessThanOrEqual(3);
    expect(d.filter((x) => x.lid === 'M').length).toBeLessThanOrEqual(3);
  });
});

describe('spaced review', () => {
  it('moves forward on success and resets on a miss', () => {
    const t0 = 1_000_000;
    let e = schedule(null, true, t0); expect(e.box).toBe(0); expect(e.due).toBe(t0 + DAY);
    e = schedule(e, true, t0 + DAY); expect(e.box).toBe(1); expect(e.due).toBe(t0 + DAY + 3 * DAY);
    e = schedule(e, false, t0 + 5 * DAY); expect(e.box).toBe(0);
    for (let i = 0; i < 10; i++) e = schedule(e, true, t0);
    expect(e.box).toBe(4);
  });
  it('counts a streak of consecutive days', () => {
    const now = Date.UTC(2026, 9, 10, 15);
    const days = {}; for (let i = 0; i < 4; i++) days[dayKey(now - i * DAY)] = { n: 1, c: 1 };
    expect(streak(days, now)).toBe(4);
    delete days[dayKey(now)];
    expect(streak(days, now)).toBe(3);
  });
});
