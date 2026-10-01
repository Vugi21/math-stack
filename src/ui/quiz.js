// A timed-free, no-hints test: lesson mastery quiz, chapter test and the daily mix all use this screen.
// The set of questions and the typed answers are saved as the student goes, so a closed tab loses nothing.
import { h, mh } from './dom.js';
import { M, ansMarkup } from '../engine/format.js';
import { judge, BAD_INPUT_HELP } from '../engine/judge.js';
import { hydrate } from '../engine/select.js';

/**
 * opts: {store, index, draftId, kind, intro, startLabel, pass, build(), onFinish(result), emptyMessage}
 * result: {score, total, passed, items:[{p, ok}]}
 */
export function quizView(opts) {
  const { store, index, draftId, kind } = opts;
  const root = h('div', { class: 'quizroot' });

  const render = () => {
    root.replaceChildren();
    const draft = store.getDraft(draftId);
    if (!draft) return root.append(...intro());
    const items = draft.items.map((d) => hydrate(index, d)).filter(Boolean);
    if (!items.length) { store.clearDraft(draftId); return render(); }
    root.append(...(draft.done ? results(draft, items) : taking(draft, items)));
  };

  const intro = () => {
    const out = [mh('p', { class: 'note' }, opts.intro)];
    out.push(h('div', {}, h('button', { class: 'btn', type: 'button', onclick: start }, opts.startLabel || 'Start')));
    return out;
  };

  const start = () => {
    const descs = opts.build();
    if (!descs.length) { root.replaceChildren(mh('p', { class: 'note' }, opts.emptyMessage || 'Nothing to practice yet.')); return; }
    descs.forEach((d) => store.markUsed(d.lid, d.tid));
    store.setDraft(draftId, { items: descs, vals: [], done: false, score: 0 });
    render();
  };

  const taking = (draft, items) => {
    const inputs = [];
    const save = () => store.setDraft(draftId, { ...draft, vals: draft.vals });
    const boxes = items.map((p, k) => {
      let control;
      if (p.type === 'mc') {
        const btns = p.opts.map((o, i) => h('button', { class: 'opt' + (draft.vals[k] === i ? ' sel' : ''), type: 'button', html: M(o), onclick: () => {
          draft.vals[k] = i; btns.forEach((b, j) => b.classList.toggle('sel', j === i)); save();
        } }));
        control = h('div', { class: 'choices' }, btns); inputs.push(null);
      } else {
        const inp = h('input', { class: 'ans', id: 'q-' + draftId + '-' + k, type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Answer to question ' + (k + 1), value: draft.vals[k] || '' });
        inp.addEventListener('input', () => { draft.vals[k] = inp.value; save(); });
        inputs.push(inp); control = h('div', { class: 'row' }, inp);
      }
      return h('div', { class: 'qitem' }, h('span', { class: 'plabel' }, 'Question ' + (k + 1) + ' of ' + items.length), mh('p', { class: 'q' }, p.q), control);
    });
    const submit = h('button', { class: 'btn', type: 'button', onclick: () => finish(draft, items) }, 'Submit');
    return [h('p', { class: 'note' }, 'No hints. Your answers are saved as you type, so you can close this and come back.'), ...boxes, h('div', { class: 'row' }, submit)];
  };

  const finish = (draft, items) => {
    let score = 0;
    const results = items.map((p, k) => {
      const res = judge(p, draft.vals[k] ?? '');
      const ok = res.status === 'ok';
      if (ok) score++;
      store.recordAttempt({
        problem_key: p.key, lesson_id: p.lessonId, kind, correct: ok, answer: String(p.type === 'mc' ? (p.opts[draft.vals[k]] ?? '') : (draft.vals[k] ?? '')).slice(0, 200),
        hints_used: 0, ms: null, mistake_tag: null, tid: p.tid,
      });
      return { p, ok };
    });
    draft.done = true; draft.score = score; draft.total = items.length;
    store.setDraft(draftId, draft);
    const passed = opts.pass ? score >= opts.pass : true;
    opts.onFinish && opts.onFinish({ score, total: items.length, passed, items: results });
    render();
  };

  const results = (draft, items) => {
    const passed = opts.pass ? draft.score >= opts.pass : true;
    const out = items.map((p, k) => {
      const res = judge(p, draft.vals[k] ?? '');
      const ok = res.status === 'ok';
      const given = p.type === 'mc' ? (p.opts[draft.vals[k]] ?? '(no answer)') : (draft.vals[k] || '(no answer)');
      return h('div', { class: 'qitem' }, h('span', { class: 'plabel' }, 'Question ' + (k + 1)), mh('p', { class: 'q' }, p.q),
        h('p', { class: 'fb ' + (ok ? 'ok' : 'no') }, ok ? 'Correct.' : 'You answered ' + given + '. The answer is ' + '', ok ? null : h('span', { html: M(ansMarkup(p)) + '.' })),
        ok ? null : mh('p', { class: 'sol' }, '<b>How it works</b>' + (p.sol || '')));
    });
    const again = h('button', { class: passed && opts.pass ? 'btn ghost' : 'btn', type: 'button', onclick: () => { store.clearDraft(draftId); render(); start(); } }, kind === 'review' ? 'Another mix' : 'Try a new set');
    out.push(h('div', { class: 'score' + (passed && opts.pass ? ' pass' : '') },
      h('p', { class: 'big' }, draft.score + ' / ' + items.length),
      h('p', {}, opts.resultText ? opts.resultText(draft.score, items.length, passed) : ''),
      h('div', { class: 'row' }, opts.afterButtons ? opts.afterButtons(passed) : null, again)));
    return out;
  };

  render();
  return root;
}
