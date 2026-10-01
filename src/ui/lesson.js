// The lesson player. Five steps: Try first, Learn, Practice, Challenge (optional), Mastery quiz.
import { h, mh } from './dom.js';
import { M } from '../engine/format.js';
import { problemEl } from './problem.js';
import { blockEl } from './blocks.js';
import { quizView } from './quiz.js';
import { makeRng } from '../engine/rng.js';
import { buildDraft, entriesFor } from '../engine/select.js';
import { lessonProgress, QUIZ_PASS, QUIZ_SIZE } from './progress.js';

export const TABS = [['try', 'Try first'], ['learn', 'Learn'], ['practice', 'Practice'], ['challenge', 'Challenge'], ['quiz', 'Mastery quiz']];

export function lessonView(app, lesson, tab) {
  const { store, course, navigate } = app;
  if (!TABS.some(([k]) => k === tab)) tab = 'try';
  store.setResume(lesson.id, tab);

  const tabDone = (k) => {
    const pr = lessonProgress(store.s, lesson);
    if (k === 'try') return pr.try.total > 0 && pr.try.done >= pr.try.total;
    if (k === 'practice') return pr.practice.total > 0 && pr.practice.done >= pr.practice.total;
    if (k === 'challenge') return pr.challenge.total > 0 && pr.challenge.done >= pr.challenge.total;
    if (k === 'quiz') return pr.mastered;
    return false;
  };
  const tabs = h('ul', { class: 'tabs' }, TABS.map(([k, name]) => h('li', {}, h('button', {
    class: 'tab' + (tabDone(k) ? ' done' : ''), type: 'button', 'aria-current': k === tab ? 'step' : null, 'data-tab': k,
    onclick: () => navigate('/lesson/' + lesson.id + '/' + k),
  }, name + (k === 'challenge' ? ' (optional)' : '')))));
  const refreshTabs = () => [...tabs.querySelectorAll('.tab')].forEach((b) => b.classList.toggle('done', tabDone(b.dataset.tab)));

  const sheet = h('section', { class: 'sheet' });
  const ctxFor = (group, kind) => (p, extra = {}) => ({
    store, lessonId: lesson.id, kind, label: extra.label, index: extra.index, pid: extra.pid || p.id, done: store.isStepDone(lesson.id, group, extra.pid || p.id),
    onCorrect: () => { store.markStep(lesson.id, group, extra.pid || p.id); refreshTabs(); extra.after && extra.after(); },
  });

  if (tab === 'try') {
    sheet.append(h('p', { class: 'note' }, 'Do these before reading anything. Getting them wrong is fine. The attempt is what makes the explanation stick.'));
    lesson.tryFirst.forEach((p, i) => sheet.append(problemEl(p, ctxFor('tryFirst', 'try')(p, { label: 'Try', index: i }))));
  } else if (tab === 'learn') {
    lesson.learn.forEach((b) => sheet.append(blockEl(b)));
  } else if (tab === 'practice') {
    sheet.append(h('p', { class: 'note' }, lesson.practice.length + ' problems. Use hints when you are stuck. A full solution appears after each correct answer.'));
    lesson.practice.forEach((p, i) => sheet.append(problemEl(p, ctxFor('practice', 'practice')(p, { label: 'Problem', index: i }))));
  } else if (tab === 'challenge') {
    sheet.append(...challengeEls(lesson, store, ctxFor('challenge', 'challenge')));
  } else {
    sheet.append(quizTab(app, lesson));
  }

  const idx = TABS.findIndex(([k]) => k === tab);
  const pager = h('div', { class: 'pager' },
    idx > 0 ? h('button', { class: 'btn ghost', type: 'button', onclick: () => navigate('/lesson/' + lesson.id + '/' + TABS[idx - 1][0]) }, '← ' + TABS[idx - 1][1]) : h('span'),
    idx < TABS.length - 1 ? h('button', { class: 'btn', type: 'button', onclick: () => navigate('/lesson/' + lesson.id + '/' + TABS[idx + 1][0]) }, TABS[idx + 1][1] + ' →') : h('span'));

  return h('div', {},
    h('div', { class: 'top' },
      h('button', { class: 'btn ghost small', type: 'button', onclick: () => navigate('/') }, '← All lessons'),
      h('span', { class: 'eyebrow', style: 'margin:0' }, 'Chapter ' + lesson.chapter.n + ' · ' + lesson.num)),
    h('h1', {}, lesson.title), lesson.blurb ? h('p', { class: 'lede' }, lesson.blurb) : null,
    tabs, sheet, pager);
}

function challengeEls(lesson, store, ctxFor) {
  const out = [h('p', { class: 'note' }, 'Optional and harder. Each chain unlocks one part at a time, and the last part uses the idea you found along the way. Challenges are not graded.')];
  let n = -1;
  lesson.challenge.forEach((it) => {
    if (it.kind !== 'chain') { out.push(blockEl(it)); return; }
    n++;
    const cn = n;
    const parts = h('div', { class: 'chparts' });
    const close = h('p', { class: 'rule idea', hidden: true, html: '' });
    close.innerHTML = M(it.close || '');
    const after = (k) => {
      if (k + 1 < it.parts.length) { if (parts.children.length <= k + 1) reveal(k + 1); }
      else if (it.close) close.hidden = false;
    };
    const reveal = (k) => {
      const pid = 'c' + cn + '_' + k;
      const p = it.parts[k];
      parts.append(problemEl(p, ctxFor(p, { label: 'Part', index: k, pid, after: () => after(k) })));
      if (store.isStepDone(lesson.id, 'challenge', pid)) after(k);
    };
    reveal(0);
    out.push(h('div', { class: 'chcard' }, h('span', { class: 'plabel' }, 'Challenge ' + (cn + 1)), h('h2', {}, it.title), mh('p', {}, it.intro), parts, close));
  });
  return out;
}

function quizTab(app, lesson) {
  const { store, course, navigate } = app;
  const last = lesson.index === course.lessons.length - 1;
  return quizView({
    store, index: course, draftId: lesson.id, kind: 'quiz', pass: QUIZ_PASS,
    intro: QUIZ_SIZE + ' questions, no hints. Get ' + QUIZ_PASS + ' right to master this lesson' + (last ? '' : ' and unlock the next one') + '. Every set is new, so a retake never repeats a question. Fractions in any equal form count as correct.',
    startLabel: 'Start the quiz',
    build: () => buildDraft(entriesFor([lesson]), QUIZ_SIZE, store.s, makeRng((Date.now() ^ (lesson.index * 7919)) >>> 0)),
    onFinish: (r) => { store.finishLessonQuiz(lesson.id, r.score, QUIZ_PASS); },
    resultText: (score, total, passed) => (passed ? (last ? 'Lesson mastered. That completes the course so far.' : 'Lesson mastered. The next lesson is unlocked, and this one will come back for review in a day.') : 'Not yet. You need ' + QUIZ_PASS + ' to pass. Read the explanations above, review the lesson, then try a fresh set.'),
    afterButtons: (passed) => [
      passed && !last ? h('button', { class: 'btn', type: 'button', onclick: () => navigate('/lesson/' + course.lessons[lesson.index + 1].id + '/try') }, 'Start next lesson →') : null,
      h('button', { class: 'btn ghost', type: 'button', onclick: () => navigate('/lesson/' + lesson.id + '/learn') }, 'Review the lesson'),
    ],
  });
}
