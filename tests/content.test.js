// Content quality gate. Runs on every pull request. A lesson cannot merge unless every answer key,
// every wrong-answer message, every generator and every widget passes. See docs/AUTHORING.md for the bar.
import { describe, it, expect } from 'vitest';
import { courses } from '../src/content/index.js';
import { judge } from '../src/engine/judge.js';
import { parseNum } from '../src/engine/parse.js';
import { ansToInput, plain } from '../src/engine/format.js';
import { instantiate } from '../src/engine/select.js';
import { WIDGETS } from '../src/widgets/index.js';
import { chainKeys } from '../src/ui/progress.js';

const STRICT = !!process.env.STRICT;
const MIN = { tryFirst: 2, practice: 6, chains: 2, chainParts: 3, mcq: 1, quiz: 6, learn: 6, distinctPerTemplate: 25 };
const TYPES = ['num', 'expr', 'text', 'ratio', 'set', 'mc'];
const SEEDS = 250;

const bad = (s) => /undefined|NaN|\[object|Infinity/.test(s);
const braces = (s) => (s.match(/\{/g) || []).length === (s.match(/\}/g) || []).length;

function checkText(label, s, errs) {
  if (typeof s !== 'string' || !s.trim()) { errs.push(label + ': empty text'); return; }
  if (bad(s)) errs.push(label + ': contains undefined/NaN: ' + s.slice(0, 80));
  if (!braces(s)) errs.push(label + ': unbalanced braces: ' + s.slice(0, 80));
  if (/<script/i.test(s)) errs.push(label + ': script tag');
}

/** Everything that must be true of one concrete problem. */
export function checkProblem(p, label, errs, { needHints = true } = {}) {
  const type = p.type || 'num';
  if (!TYPES.includes(type)) { errs.push(label + ': unknown type ' + type); return; }
  checkText(label + ' question', p.q, errs);
  if (!p.sol) errs.push(label + ': missing solution'); else checkText(label + ' solution', p.sol, errs);
  if (needHints && !(p.hints && p.hints.length)) errs.push(label + ': needs at least one hint');
  (p.hints || []).forEach((h, i) => checkText(label + ' hint ' + (i + 1), h, errs));
  if (type === 'mc') {
    if (!Array.isArray(p.opts) || p.opts.length < 3) { errs.push(label + ': needs 3+ options'); return; }
    if (new Set(p.opts.map(plain)).size !== p.opts.length) errs.push(label + ': duplicate options');
    if (!(p.ok >= 0 && p.ok < p.opts.length)) { errs.push(label + ': bad ok index'); return; }
    p.opts.forEach((o, i) => checkText(label + ' option ' + i, o, errs));
    for (const w of p.wrong || []) {
      if (!(w[0] >= 0 && w[0] < p.opts.length) || w[0] === p.ok) errs.push(label + ': bad wrong index ' + w[0]);
      checkText(label + ' wrong msg', w[1], errs);
    }
    return;
  }
  let res;
  try { res = judge(p, ansToInput(p)); } catch (e) { errs.push(label + ': answer key fails: ' + e.message); return; }
  if (res.status !== 'ok') errs.push(label + ': own answer not accepted (' + JSON.stringify(p.ans) + ' -> ' + res.status + ')');
  if (type === 'num' && !parseNum(String(p.ans))) errs.push(label + ': answer is not a number: ' + p.ans);
  for (const w of p.wrong || []) {
    checkText(label + ' wrong msg', w[1], errs);
    let r;
    try { r = judge(p, String(w[0])); } catch (e) { errs.push(label + ': wrong answer ' + w[0] + ' breaks judge'); continue; }
    if (r.status === 'ok') errs.push(label + ': wrong-answer entry "' + w[0] + '" is actually correct');
    else if (r.status !== 'near') errs.push(label + ': wrong-answer entry "' + w[0] + '" not recognised (' + r.status + ')');
  }
}

const seenQuestions = new Map();

for (const course of courses) {
  describe('course ' + course.id, () => {
    it('has unique lesson ids and numbered chapters', () => {
      const ids = course.lessons.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
      course.chapters.forEach((c, i) => expect(c.n).toBe(i + 1));
    });
    if (STRICT) it('every chapter has lessons', () => { course.chapters.forEach((c) => expect(c.lessons.length, 'chapter ' + c.n + ' is empty').toBeGreaterThan(0)); });

    for (const l of course.lessons) {
      it(l.id, () => {
        const E = [];
        if (!/^[a-z0-9]+-\d+-\d+-[a-z0-9-]+$/.test(l.id)) E.push('id must look like pre-4-1-what-is-a-fraction');
        const base = l.file.split('/').pop().replace('.js', '');
        if (!l.id.endsWith(base.replace(/^\d+-/, ''))) E.push('id should end with the file name slug (' + base + ')');
        checkText('title', l.title, E); checkText('blurb', l.blurb, E);
        if (!l.concepts.length) E.push('needs at least one concept tag');

        // fixed problems
        const ids = new Set();
        for (const [group, min] of [['tryFirst', MIN.tryFirst], ['practice', MIN.practice]]) {
          if (l[group].length < min) E.push(group + ': needs at least ' + min + ' problems (has ' + l[group].length + ')');
          for (const p of l[group]) {
            if (!p.id || ids.has(p.id)) E.push(group + ': missing or duplicate id ' + p.id);
            ids.add(p.id);
            checkProblem(p, group + '/' + p.id, E);
            const q = course.id + '|' + plain(p.q);
            if (seenQuestions.has(q)) E.push(group + '/' + p.id + ': same question as ' + seenQuestions.get(q)); else seenQuestions.set(q, l.id + ' ' + group + '/' + p.id);
          }
        }

        // learn
        if (l.learn.length < MIN.learn) E.push('learn: needs at least ' + MIN.learn + ' blocks');
        if (!l.learn.some((b) => b.t === 'rule')) E.push('learn: needs a rule box');
        if (!l.learn.some((b) => b.t === 'warn' || b.t === 'mc')) E.push('learn: needs a watch-out box or a spot-the-mistake question');
        // Reading depth: every lesson must teach properly, not just show a rule box.
        {
          const n = (t) => l.learn.filter((b) => b.t === t).length;
          if (l.learn.length < 10) E.push('depth: needs at least 10 learn blocks');
          if (n('def') < 2) E.push('depth: needs 2+ definitions');
          if (n('key') < 1) E.push('depth: needs a key idea');
          if (n('tip') < 1) E.push('depth: needs a tip');
          if (n('recap') !== 1 || l.learn[l.learn.length - 1].t !== 'recap') E.push('depth: needs exactly one recap, as the last block');
          if (l.learn.filter((b) => b.t === 'ex').length < 2) E.push('depth: needs 2+ worked examples');
        }
        l.learn.forEach((b, i) => {
          if (['p', 'rule', 'warn', 'key', 'tip'].includes(b.t)) checkText('learn[' + i + ']', b.html, E);
          if (b.t === 'def') { checkText('learn[' + i + '] term', b.term, E); checkText('learn[' + i + ']', b.html, E); }
          if (b.t === 'formula') { checkText('learn[' + i + '] formula name', b.name, E); checkText('learn[' + i + '] formula', b.expr, E); }
          if (b.t === 'recap') { if (!b.terms.length && !b.formulas.length) E.push('learn[' + i + ']: empty recap'); b.terms.concat(b.formulas).forEach(([a, c], k) => { checkText('learn[' + i + '] recap ' + k + ' a', a, E); checkText('learn[' + i + '] recap ' + k + ' b', c, E); }); }
          if (b.t === 'ex') { checkText('learn[' + i + '] title', b.title, E); b.steps.forEach((s, k) => checkText('learn[' + i + '] step ' + k, s, E)); }
          if (b.t === 'tbl') b.rows.forEach((r) => { if (r.length !== b.head.length) E.push('learn[' + i + ']: table row width mismatch'); });
          if (b.t === 'mc') {
            checkText('learn[' + i + '] question', b.q, E);
            if (!(b.ok >= 0 && b.ok < b.opts.length)) E.push('learn[' + i + ']: bad mc ok index');
            if (b.opts.length < 3) E.push('learn[' + i + ']: mc needs 3+ options');
          }
          if (!['p', 'rule', 'warn', 'ex', 'tbl', 'mc', 'widget', 'def', 'key', 'formula', 'tip', 'recap'].includes(b.t)) E.push('learn[' + i + ']: unknown block type ' + b.t);
          if (b.t === 'widget') {
            if (!WIDGETS[b.kind]) E.push('learn[' + i + ']: unknown widget ' + b.kind);
            else { try { const el = WIDGETS[b.kind](b.opts || {}); if (!el || !el.querySelector('.readout')) E.push('widget ' + b.kind + ' rendered nothing'); } catch (e) { E.push('widget ' + b.kind + ' threw: ' + e.message); } }
          }
        });

        // challenge
        const chains = l.challenge.filter((x) => x.kind === 'chain'), mcqs = l.challenge.filter((x) => x.kind !== 'chain');
        if (chains.length < MIN.chains) E.push('challenge: needs at least ' + MIN.chains + ' chains');
        if (mcqs.length < MIN.mcq) E.push('challenge: needs at least ' + MIN.mcq + ' find-the-error question');
        chains.forEach((c, n) => {
          checkText('chain ' + n + ' intro', c.intro, E); checkText('chain ' + n + ' close', c.close, E);
          if (c.parts.length < MIN.chainParts) E.push('chain ' + n + ': needs ' + MIN.chainParts + '+ parts');
          c.parts.forEach((p, k) => checkProblem(p, 'chain ' + n + ' part ' + (k + 1), E));
        });
        mcqs.forEach((m, i) => { checkText('challenge mc ' + i, m.q, E); if (!(m.ok >= 0 && m.ok < m.opts.length)) E.push('challenge mc ' + i + ': bad ok'); });
        if (chainKeys(l).length !== chains.reduce((a, c) => a + c.parts.length, 0)) E.push('chain key mismatch');

        // generators
        if (l.quiz.length < MIN.quiz) E.push('quiz: needs at least ' + MIN.quiz + ' templates (has ' + l.quiz.length + ')');
        const tids = new Set();
        for (const t of l.quiz) {
          if (!t.id || tids.has(t.id) || ids.has(t.id)) E.push('quiz: missing or duplicate template id ' + t.id);
          tids.add(t.id);
          const keys = new Set(), errs2 = [];
          for (let s = 1; s <= SEEDS; s++) {
            let p;
            try { p = instantiate(l.id, t, s * 7919 + 13); } catch (e) { errs2.push('seed ' + s + ' threw: ' + e.message); break; }
            keys.add(p.key);
            const before = errs2.length;
            checkProblem(p, 'template ' + t.id + ' seed ' + s, errs2, { needHints: false });
            if (errs2.length > before && errs2.length > 3) break;
          }
          E.push(...errs2.slice(0, 4));
          if (keys.size < MIN.distinctPerTemplate && !errs2.length) E.push('template ' + t.id + ' makes only ' + keys.size + ' distinct problems in ' + SEEDS + ' seeds (need ' + MIN.distinctPerTemplate + '+)');
        }
        expect(E, '\n' + E.join('\n')).toEqual([]);
      });
    }
  });
}

describe('engine guarantees used by the content', () => {
  it('a course exists', () => { expect(courses.length).toBeGreaterThan(0); });
});
