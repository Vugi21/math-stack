// Read-only helpers that turn the saved state into the numbers the screens show.
import { dueLessons } from '../engine/review.js';

export const QUIZ_PASS = 4;
export const QUIZ_SIZE = 5;
export const CHAPTER_PASS = 6;
export const CHAPTER_SIZE = 8;
export const MIX_SIZE = 8;

export const chainKeys = (l) => l.challenge.filter((x) => x.kind === 'chain').flatMap((c, n) => c.parts.map((_, k) => 'c' + n + '_' + k));

export function lessonProgress(state, l) {
  const r = state.lessons[l.id] || { tryFirst: {}, practice: {}, challenge: {}, quiz: { best: 0, passed: false, tries: 0 } };
  const ck = chainKeys(l);
  return {
    try: { done: l.tryFirst.filter((p) => r.tryFirst[p.id]).length, total: l.tryFirst.length },
    practice: { done: l.practice.filter((p) => r.practice[p.id]).length, total: l.practice.length },
    challenge: { done: ck.filter((k) => r.challenge[k]).length, total: ck.length },
    quiz: r.quiz,
    mastered: !!r.quiz.passed,
    started: l.tryFirst.some((p) => r.tryFirst[p.id]) || l.practice.some((p) => r.practice[p.id]) || r.quiz.tries > 0,
  };
}

export const isUnlocked = (course, state, l) => l.index === 0 || !!state.lessons[course.lessons[l.index - 1].id]?.quiz?.passed;

export function chapterProgress(course, state, ch) {
  const mastered = ch.lessons.filter((l) => state.lessons[l.id]?.quiz?.passed).length;
  return { mastered, total: ch.lessons.length, allMastered: mastered === ch.lessons.length, test: state.chapters[ch.id] || { best: 0, passed: false, tries: 0 } };
}

export function courseProgress(course, state) {
  const mastered = course.lessons.filter((l) => state.lessons[l.id]?.quiz?.passed).length;
  return { mastered, total: course.lessons.length, pct: course.lessons.length ? Math.round((100 * mastered) / course.lessons.length) : 0 };
}

/** where "Continue" should take the student */
export function nextUp(course, state) {
  const r = state.resume;
  if (r && course.lessonById[r.lid] && !state.lessons[r.lid]?.quiz?.passed) return { lid: r.lid, tab: r.tab, resumed: true };
  const l = course.lessons.find((x) => !state.lessons[x.id]?.quiz?.passed);
  return l ? { lid: l.id, tab: 'try', resumed: false } : null;
}

export const dueCount = (state, now = Date.now()) => dueLessons(state.review, now).length;
