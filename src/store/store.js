// The Store is what the UI talks to. It keeps the state in memory and writes every change through the backend.
import { emptyState, mergeState, lessonRec, chapterRec, schedule, dayKey } from './state.js';

export class Store {
  constructor(backend, { contentVersion = 'dev' } = {}) {
    this.b = backend; this.s = emptyState(); this.listeners = new Set(); this.status = 'saved'; this.timer = null; this.contentVersion = contentVersion;
  }
  async init() {
    const loaded = await this.b.load();
    this.s = mergeState(emptyState(), loaded || emptyState());
    this.notify();
    return this;
  }
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  notify() { this.listeners.forEach((f) => f(this)); }
  setStatus(st) { this.status = st; this.notify(); }

  touch() {
    this.s.updated = Date.now();
    this.notify();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flushNow(), 250);
  }
  async flushNow() { clearTimeout(this.timer); this.timer = null; return this.b.saveState(this.s); }

  // ---- progress ----
  isStepDone(lid, group, key) { return !!this.s.lessons[lid]?.[group]?.[key]; }
  markStep(lid, group, key) {
    const r = lessonRec(this.s, lid);
    if (!r[group][key]) { r[group][key] = Date.now(); this.touch(); }
  }
  lessonQuiz(lid) { return this.s.lessons[lid]?.quiz || { best: 0, passed: false, tries: 0 }; }
  chapterRes(cid) { return this.s.chapters[cid] || { best: 0, passed: false, tries: 0 }; }

  finishLessonQuiz(lid, score, pass) {
    const q = lessonRec(this.s, lid).quiz;
    q.tries = (q.tries || 0) + 1; q.best = Math.max(q.best || 0, score);
    const newly = !q.passed && score >= pass;
    if (score >= pass) { q.passed = true; if (!q.passedAt) q.passedAt = Date.now(); }
    if (newly && !this.s.review[lid]) this.s.review[lid] = schedule(null, true, Date.now());
    this.touch();
    return newly;
  }
  finishChapterTest(cid, score, pass) {
    const c = chapterRec(this.s, cid);
    c.tries = (c.tries || 0) + 1; c.best = Math.max(c.best || 0, score);
    const newly = !c.passed && score >= pass;
    if (score >= pass) c.passed = true;
    this.touch();
    return newly;
  }

  // ---- resume, drafts, review ----
  setResume(lid, tab) { this.s.resume = { lid, tab, t: Date.now() }; this.touch(); }
  getDraft(id) { return this.s.drafts[id] || null; }
  setDraft(id, draft) { this.s.drafts[id] = { ...draft, t: Date.now() }; this.touch(); }
  clearDraft(id) { delete this.s.drafts[id]; this.touch(); }
  markUsed(lid, tid) { this.s.used[lid + '/' + tid] = Date.now(); }
  reviewResult(lid, correct) { this.s.review[lid] = schedule(this.s.review[lid], correct, Date.now()); this.touch(); }

  // ---- attempts ----
  /** One row per answer checked. Also updates "seen", "missed" and the daily activity count. */
  recordAttempt(a) {
    const now = Date.now();
    this.s.seen[a.problem_key] = now;
    if (a.tid) {
      const k = a.lesson_id + '/' + a.tid;
      if (a.correct) this.s.fixed[k] = now; else this.s.missed[k] = now;
    }
    const d = (this.s.days[dayKey(now)] = this.s.days[dayKey(now)] || { n: 0, c: 0 });
    d.n++; if (a.correct) d.c++;
    const { tid, ...row } = a;
    this.b.logAttempt({ ...row, content_version: this.contentVersion, created_at: new Date(now).toISOString() });
    this.touch();
  }
  getAttempts(limit) { return this.b.getAttempts(limit); }
  async resetAll() { this.s = emptyState(); if (this.b.reset) await this.b.reset(); await this.flushNow(); this.notify(); }
}
