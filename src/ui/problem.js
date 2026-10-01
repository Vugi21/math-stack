// One problem on screen: question, answer box (or choices), Check, Hint ladder, Show solution, feedback.
// Every check is recorded as an attempt so progress and mistakes are saved the moment they happen.
import { h, mh, nextId } from './dom.js';
import { M, ansMarkup } from '../engine/format.js';
import { judge, BAD_INPUT_HELP } from '../engine/judge.js';

/**
 * ctx: {store, lessonId, kind, group?, pid?, label, index, done, onCorrect(), onResult(res)}
 *   group/pid: where to mark the step done (try/practice/challenge). Omit for quiz items.
 */
export function problemEl(p, ctx) {
  const { store, lessonId, kind } = ctx;
  const started = Date.now();
  let hintsUsed = 0, hi = 0, done = !!ctx.done;
  const type = p.type || 'num';
  const hints = h('div', { class: 'hints' });
  const sol = h('div', { class: 'solbox' });
  const fb = h('p', { class: 'fb', role: 'status', 'aria-live': 'polite' });
  let getVal, inputEl = null, choiceEls = [];

  const showSol = () => { sol.replaceChildren(h('p', { class: 'sol', html: '<b>How it works</b>' + M(p.sol || 'Check the answer above.') })); };

  const record = (res, answer) => {
    const key = p.key || (lessonId + '/' + (p.id || ctx.pid));
    let tag = null;
    if (res.status === 'near' && res.wrongIdx >= 0) tag = key.split('#')[0] + ':w' + res.wrongIdx;
    store.recordAttempt({
      problem_key: key, lesson_id: lessonId, kind, correct: res.status === 'ok', answer: String(answer).slice(0, 200),
      hints_used: hintsUsed, ms: Math.min(Date.now() - started, 36e5), mistake_tag: tag, tid: p.tid || null,
    });
  };

  const handle = (res, answer) => {
    if (res.status === 'empty') { fb.className = 'fb no'; fb.textContent = type === 'mc' ? 'Choose an answer first.' : 'Type an answer first.'; return; }
    if (res.status === 'bad') { fb.className = 'fb no'; fb.textContent = BAD_INPUT_HELP[type] || 'That does not look like an answer.'; return; }
    record(res, answer);
    if (res.status === 'ok') {
      fb.className = 'fb ok'; fb.innerHTML = 'Correct.' + (res.tip ? ' ' + M(res.tip) : '');
      inputEl?.classList.add('ok');
      showSol();
      if (!done) { done = true; ctx.onCorrect && ctx.onCorrect(res); }
    } else {
      inputEl?.classList.add('no');
      fb.className = 'fb no';
      fb.innerHTML = res.status === 'near' ? M(res.msg) : 'Not quite. Check your work, or take a hint.';
    }
    ctx.onResult && ctx.onResult(res);
  };

  let controls;
  if (type === 'mc') {
    let chosen = null;
    choiceEls = p.opts.map((o, i) => h('button', { class: 'opt', type: 'button', html: M(o), onclick: () => {
      if (done) return;
      chosen = i;
      const res = judge(p, i);
      choiceEls.forEach((b, j) => b.classList.toggle('no', j === i && res.status !== 'ok'));
      if (res.status === 'ok') choiceEls[i].classList.add('ok');
      handle(res, p.opts[i]);
    } }));
    getVal = () => chosen;
    controls = h('div', { class: 'choices' }, choiceEls);
  } else {
    inputEl = h('input', { class: 'ans', id: nextId('in'), type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Your answer' });
    getVal = () => inputEl.value;
    const check = () => { inputEl.classList.remove('ok', 'no'); handle(judge(p, inputEl.value), inputEl.value); };
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    controls = h('div', { class: 'row' }, inputEl, h('button', { class: 'btn', type: 'button', onclick: check }, 'Check'));
  }

  const row2 = [];
  const hintList = p.hints || [];
  if (!ctx.noHints && hintList.length) {
    const hb = h('button', { class: 'btn ghost small', type: 'button', onclick: () => {
      if (hi < hintList.length) { hints.append(h('p', { class: 'hint', html: '<b>Hint ' + (hi + 1) + '</b>' + M(hintList[hi]) })); hi++; hintsUsed++; }
      if (hi >= hintList.length) { hb.disabled = true; hb.textContent = 'No more hints'; }
    } }, 'Hint');
    row2.push(hb);
  }
  if (!ctx.noSolution) row2.push(h('button', { class: 'btn ghost small', type: 'button', onclick: showSol }, 'Show solution'));

  const el = h('div', { class: 'prob' },
    ctx.label ? h('span', { class: 'plabel' }, ctx.label + (ctx.index !== undefined ? ' ' + (ctx.index + 1) : '')) : null,
    mh('p', { class: 'q' }, p.q),
    controls,
    row2.length ? h('div', { class: 'row' }, row2) : null,
    fb, hints, sol);
  if (done) { showSol(); if (type === 'mc' && p.ok !== undefined) choiceEls[p.ok]?.classList.add('ok'); }
  el.getValue = getVal;
  return el;
}

export { ansMarkup };
