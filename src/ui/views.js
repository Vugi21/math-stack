// Chapter tests and the Daily Mix.
import { h } from './dom.js';
import { quizView } from './quiz.js';
import { makeRng } from '../engine/rng.js';
import { buildDraft, entriesFor } from '../engine/select.js';
import { dueLessons } from '../engine/review.js';
import { CHAPTER_PASS, CHAPTER_SIZE, MIX_SIZE } from './progress.js';

export function chapterTestView(app, ch) {
  const { store, course, navigate } = app;
  const cap = Math.max(2, Math.ceil(CHAPTER_SIZE / ch.lessons.length));
  const nextCh = course.chapters[course.chapters.indexOf(ch) + 1];
  return h('div', {},
    h('div', { class: 'top' }, h('button', { class: 'btn ghost small', type: 'button', onclick: () => navigate('/') }, '← All lessons'), h('span', { class: 'eyebrow', style: 'margin:0' }, 'Chapter ' + ch.n)),
    h('h1', {}, 'Chapter ' + ch.n + ' test'), h('p', { class: 'lede' }, ch.title),
    h('section', { class: 'sheet' }, quizView({
      store, index: course, draftId: 'chapter:' + ch.id, kind: 'chapter', pass: CHAPTER_PASS,
      intro: CHAPTER_SIZE + ' mixed questions from across the chapter, no hints. Pass with ' + CHAPTER_PASS + '. Every attempt draws new questions.',
      startLabel: 'Start the test',
      build: () => buildDraft(entriesFor(ch.lessons), CHAPTER_SIZE, store.s, makeRng(Date.now() >>> 0), cap),
      onFinish: (r) => { store.finishChapterTest(ch.id, r.score, CHAPTER_PASS); },
      resultText: (sc, t, passed) => (passed ? 'Chapter passed.' : 'Not yet. You need ' + CHAPTER_PASS + '. Revisit the lessons you missed and try a new set.'),
      afterButtons: (passed) => [passed && nextCh ? h('button', { class: 'btn', type: 'button', onclick: () => navigate('/lesson/' + nextCh.lessons[0].id + '/try') }, 'Start Chapter ' + nextCh.n + ' →') : null],
    })));
}

export function reviewView(app) {
  const { store, course, navigate } = app;
  const now = Date.now();
  const due = dueLessons(store.s.review, now).filter((id) => course.lessonById[id]);
  const mastered = course.lessons.filter((l) => store.s.lessons[l.id]?.quiz?.passed);
  const pool = due.length ? due.map((id) => course.lessonById[id]) : mastered;
  return h('div', {},
    h('div', { class: 'top' }, h('button', { class: 'btn ghost small', type: 'button', onclick: () => navigate('/') }, '← All lessons')),
    h('h1', {}, 'Daily Mix'),
    h('p', { class: 'lede' }, due.length ? due.length + (due.length === 1 ? ' lesson is' : ' lessons are') + ' due. Ideas come back after 1, 3, 7, 14 and 30 days, always with new numbers.' : mastered.length ? 'Nothing is due today. You can still run a mixed practice from lessons you have mastered.' : 'Master a lesson first. Its ideas will then come back here for review.'),
    h('section', { class: 'sheet' }, quizView({
      store, index: course, draftId: 'mix', kind: 'review', pass: 0,
      intro: MIX_SIZE + ' questions drawn from ' + (due.length ? 'lessons that are due' : 'lessons you have mastered') + '. No hints.',
      startLabel: 'Start the mix', emptyMessage: 'Master a lesson first, then come back.',
      build: () => (pool.length ? buildDraft(entriesFor(pool), MIX_SIZE, store.s, makeRng(Date.now() >>> 0), 2) : []),
      onFinish: (r) => {
        const per = {};
        r.items.forEach(({ p, ok }) => { per[p.lessonId] = (per[p.lessonId] ?? true) && ok; });
        Object.entries(per).forEach(([lid, ok]) => { if (store.s.review[lid]) store.reviewResult(lid, ok); });
      },
      resultText: (sc, t) => (sc === t ? 'Perfect. Those ideas move to a longer interval.' : 'Anything you missed comes back tomorrow.'),
    })));
}
