import { describe, it, expect, vi } from 'vitest';
import { emptyState, mergeState } from '../src/store/state.js';
import { Store } from '../src/store/store.js';
import { LocalBackend, SupabaseBackend } from '../src/store/backends.js';

const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };

describe('mergeState', () => {
  it('keeps the union of progress from two devices', () => {
    const a = emptyState(); a.lessons.L = { tryFirst: { t1: 5 }, practice: { p1: 7 }, challenge: {}, quiz: { best: 3, passed: false, tries: 1 } };
    const b = emptyState(); b.lessons.L = { tryFirst: { t2: 6 }, practice: { p1: 9 }, challenge: { c0: 1 }, quiz: { best: 5, passed: true, tries: 2 } };
    a.seen.k1 = 1; b.seen.k2 = 2; a.days['2026-10-01'] = { n: 3, c: 2 }; b.days['2026-10-01'] = { n: 5, c: 1 };
    const m = mergeState(a, b);
    expect(Object.keys(m.lessons.L.tryFirst).sort()).toEqual(['t1', 't2']);
    expect(m.lessons.L.practice.p1).toBe(9);
    expect(m.lessons.L.quiz).toMatchObject({ best: 5, passed: true, tries: 2 });
    expect(Object.keys(m.seen).sort()).toEqual(['k1', 'k2']);
    expect(m.days['2026-10-01']).toEqual({ n: 5, c: 2 });
  });
  it('is commutative and idempotent', () => {
    const a = emptyState(); a.lessons.X = { tryFirst: { a: 1 }, practice: {}, challenge: {}, quiz: { best: 2, passed: false, tries: 1 } }; a.resume = { lid: 'X', tab: 'learn', t: 5 };
    const b = emptyState(); b.lessons.Y = { tryFirst: { b: 2 }, practice: {}, challenge: {}, quiz: { best: 0, passed: false, tries: 0 } }; b.resume = { lid: 'Y', tab: 'try', t: 9 };
    const ab = mergeState(a, b), ba = mergeState(b, a);
    expect(ab).toEqual(ba);
    expect(mergeState(ab, ab)).toEqual(ab);
    expect(ab.resume.lid).toBe('Y');
  });
  it('keeps the newer in-progress quiz draft', () => {
    const a = emptyState(); a.drafts.q = { items: [], vals: ['1'], t: 1 };
    const b = emptyState(); b.drafts.q = { items: [], vals: ['1', '2'], t: 2 };
    expect(mergeState(a, b).drafts.q.vals).toEqual(['1', '2']);
  });
});

describe('Store with the local backend', () => {
  it('saves every answer and a restart restores everything', async () => {
    const ls = mem();
    let s = await new Store(new LocalBackend('u1', ls)).init();
    s.markStep('L1', 'practice', 'p1');
    s.recordAttempt({ problem_key: 'L1/p1', lesson_id: 'L1', kind: 'practice', correct: true, answer: '3', hints_used: 1, ms: 1200, tid: null });
    s.setResume('L1', 'practice');
    s.setDraft('L1', { items: [{ lid: 'L1', tid: 'a', seed: 3 }], vals: ['5'], done: false });
    s.finishLessonQuiz('L1', 5, 4);
    await s.flushNow();
    const again = await new Store(new LocalBackend('u1', ls)).init();
    expect(again.isStepDone('L1', 'practice', 'p1')).toBe(true);
    expect(again.s.seen['L1/p1']).toBeGreaterThan(0);
    expect(again.s.resume).toMatchObject({ lid: 'L1', tab: 'practice' });
    expect(again.getDraft('L1').vals).toEqual(['5']);
    expect(again.lessonQuiz('L1')).toMatchObject({ passed: true, best: 5 });
    expect(again.s.review.L1).toBeTruthy();
    expect((await again.getAttempts()).length).toBe(1);
  });
  it('tracks missed templates and clears them when fixed', async () => {
    const s = await new Store(new LocalBackend('u2', mem())).init();
    s.recordAttempt({ problem_key: 'L/t#a', lesson_id: 'L', kind: 'quiz', correct: false, tid: 't' });
    expect(s.s.missed['L/t']).toBeGreaterThan(0);
    await new Promise((r) => setTimeout(r, 3));
    s.recordAttempt({ problem_key: 'L/t#b', lesson_id: 'L', kind: 'quiz', correct: true, tid: 't' });
    expect(s.s.fixed['L/t']).toBeGreaterThanOrEqual(s.s.missed['L/t']);
  });
});

function fakeClient({ failing = false } = {}) {
  const db = { state: null, attempts: [] };
  const api = {
    db, failing,
    from: (table) => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => (api.failing ? { error: new Error('offline') } : { data: db.state ? { state: db.state } : null, error: null }) }) }),
      upsert: async (row) => { if (api.failing) return { error: new Error('offline') }; db.state = row.state; return { error: null }; },
      insert: async (row) => { if (api.failing) return { error: new Error('offline') }; db.attempts.push(row); return { error: null }; },
    }),
  };
  return api;
}

describe('SupabaseBackend offline outbox', () => {
  it('queues while offline and delivers everything when the connection returns', async () => {
    const ls = mem(); const client = fakeClient({ failing: true });
    const store = await new Store(new SupabaseBackend(client, 'u9', { ls })).init();
    store.markStep('L', 'tryFirst', 't1');
    store.recordAttempt({ problem_key: 'L/t1', lesson_id: 'L', kind: 'try', correct: true, answer: '2' });
    await store.flushNow();
    expect(client.db.attempts.length).toBe(0);
    expect(JSON.parse(ls.getItem('pc:outbox:u9')).length).toBeGreaterThan(0);

    client.failing = false;
    await store.b.flush();
    expect(client.db.attempts.length).toBe(1);
    expect(client.db.state.lessons.L.tryFirst.t1).toBeGreaterThan(0);
    expect(JSON.parse(ls.getItem('pc:outbox:u9')).length).toBe(0);
  });
  it('merges remote progress from another device on load', async () => {
    const client = fakeClient();
    const remote = emptyState(); remote.lessons.R = { tryFirst: { z: 1 }, practice: {}, challenge: {}, quiz: { best: 4, passed: true, tries: 1 } };
    client.db.state = remote;
    const store = await new Store(new SupabaseBackend(client, 'u3', { ls: mem() })).init();
    expect(store.lessonQuiz('R').passed).toBe(true);
    store.markStep('L', 'practice', 'p1');
    await store.flushNow();
    expect(client.db.state.lessons.R.quiz.passed).toBe(true);
    expect(client.db.state.lessons.L.practice.p1).toBeGreaterThan(0);
  });
});
